**Quins desafiaments presenta el testing de DnD i com mitigar-los?**

## **Per què el DnD és especialment difícil de testar**

El DnD presenta reptes únics de testing que no existeixen en la majoria de components React: involucra seqüències complexes d'events coordinats, càlculs de geometria del DOM (coordenades, dimensions, posicions relatives), i sovint depèn d'APIs del browser que JSDOM (l'entorn de test) no implementa completament.

**Desafiament 1: JSDOM no implementa APIs de Geometria del DOM**

El primer i més fonamental problema: JSDOM, l'entorn del browser simulat que usen Vitest i Jest, no implementa les APIs de layout del DOM.

JSDOM NO implementa:  
  → getBoundingClientRect() → retorna sempre { x:0, y:0, width:0, height:0 }  
  → element.offsetLeft/offsetTop → sempre 0  
  → window.innerWidth/innerHeight → valors per defecte, no calculats  
  → scroll → no funciona realment

PROBLEMA CONCRET amb dnd-kit:  
  dnd-kit usa getBoundingClientRect() per calcular:  
  → La posició inicial de l'element arrossegat  
  → La posició de les zones de drop  
  → La detecció de col·lisió (quin element estem sobre)

  En JSDOM: tots els rects son { 0,0,0,0 }  
  → La detecció de col·lisió falla  
  → El drag no sap on és ni on va

| // MITIGACIÓ: mock de getBoundingClientRect per a tests de DnD// vitest.setup.ts o dins del test específic// Mock global per a tots els tests:Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {  value: () \=\> ({    x: 0, y: 0,    width: 100, height: 50,    top: 0, right: 100, bottom: 50, left: 0,    toJSON: () \=\> {}  })});// O mock específic per element dins del test:const mockRect \= (element: HTMLElement, rect: Partial\<DOMRect\>) \=\> {  jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({    x: 0, y: 0, width: 100, height: 50,    top: 0, right: 100, bottom: 50, left: 0,    toJSON: () \=\> {},    ...rect  } as DOMRect);}; |
| :---- |

**Desafiament 2: La seqüència d'events és complexa i difícil de replicar**

Un drag and drop real involucra desenes d'events en seqüència. Replicar-los manualment és propens a errors i fràgil.

Seqüència real d'un drag:  
  pointerdown (inici del drag)  
  → pointermove × N (moviment)  
  → pointerup (alliberar)

dnd-kit amb PointerSensor escolta:  
  → pointerdown: inicia el drag (amb un delay configurable)  
  → pointermove: mou l'element  
  → pointerup: finalitza el drag i dispara onDragEnd

Per simular amb fireEvent:  
  fireEvent.pointerDown(element, { clientX: 100, clientY: 200 });  
  fireEvent.pointerMove(document, { clientX: 200, clientY: 300 });  
  fireEvent.pointerUp(document);  
  // → Però dnd-kit té un activation constraint per defecte (5px de moviment mínim\!)  
  // → Cal moure's més de 5px per activar el drag

| // Funció helper per a simular un drag complet:async function simulaDrag(  origen: HTMLElement,  desti: HTMLElement) {  const origenRect \= origen.getBoundingClientRect();  const destiRect \= desti.getBoundingClientRect();  const origenPunt \= {    clientX: origenRect.left \+ origenRect.width / 2,    clientY: origenRect.top \+ origenRect.height / 2,  };  const destiPunt \= {    clientX: destiRect.left \+ destiRect.width / 2,    clientY: destiRect.top \+ destiRect.height / 2,  };  // Inici del drag  fireEvent.pointerDown(origen, { ...origenPunt, bubbles: true });  // Moviment (mínim 5px per activar el PointerSensor)  fireEvent.pointerMove(document, {    clientX: origenPunt.clientX \+ 10,    clientY: origenPunt.clientY \+ 10,    bubbles: true  });  // Arribar al destí  fireEvent.pointerMove(document, { ...destiPunt, bubbles: true });  // Alliberar  fireEvent.pointerUp(document, { ...destiPunt, bubbles: true });} |
| :---- |

**Desafiament 3: dnd-kit usa sensors sintètics (no HTML5 DnD API)**

dnd-kit usa sensors sintètics basats en pointer/mouse/touch events, NO l'HTML5 DnD API nativa. Això significa que les tècniques de testing de l'HTML5 DnD API (`dragstart`, `dragover`, `drop`) **no funcionen amb dnd-kit**.

| // ❌ Això NO funciona amb dnd-kit:fireEvent.dragStart(element);fireEvent.dragOver(dropZone);fireEvent.drop(dropZone);// → dnd-kit no escolta dragstart/dragover/drop natius// → dnd-kit usa pointerdown/pointermove/pointerup// ✅ Per a dnd-kit: usar pointer eventsfireEvent.pointerDown(element, { clientX: 0, clientY: 0 });fireEvent.pointerMove(document, { clientX: 0, clientY: 10 });fireEvent.pointerUp(document, { clientX: 0, clientY: 10 }); |
| :---- |

**Desafiament 4: El KeyboardSensor és la millor opció per a tests**

La solució pràctica recomanada per a testar dnd-kit és usar el **KeyboardSensor** en lloc del PointerSensor durant els tests. El teclat és molt més fàcil de simular i no depèn de coordenades ni de getBoundingClientRect.

| // vite.config.ts o vitest.setup.ts: configurar l'entorn de test// per usar el KeyboardSensor (accessible i testejable)// COMPONENT: configurar per acceptar keyboard en testsimport { KeyboardSensor, useSensors, useSensor } from '@dnd-kit/core';import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';function LlistaOrdenable({ items, onReorder }) {  const sensors \= useSensors(    useSensor(KeyboardSensor, {      coordinateGetter: sortableKeyboardCoordinates,    })  );  return (    \<DndContext sensors={sensors} onDragEnd={({ active, over }) \=\> {      if (over && active.id \!== over.id) {        onReorder(active.id, over.id);      }    }}\>      \<SortableContext items={items.map(i \=\> i.id)}\>        {items.map(item \=\> \<ItemOrdenable key={item.id} {...item} /\>)}      \</SortableContext\>    \</DndContext\>  );} |
| :---- |

| // TEST: simular DnD via teclat (molt més fiable en JSDOM)import { render, screen } from '@testing-library/react';import userEvent from '@testing-library/user-event';test('reordena items amb el teclat', async () \=\> {  const user \= userEvent.setup();  const items \= \[    { id: '1', label: 'Item A' },    { id: '2', label: 'Item B' },    { id: '3', label: 'Item C' },  \];  const handleReorder \= vi.fn();  render(\<LlistaOrdenable items={items} onReorder={handleReorder} /\>);  // 1\. Focus al primer item  const primerItem \= screen.getByText('Item A').closest('\[role="button"\]');  await user.click(primerItem\!);  // 2\. Espai per iniciar el drag (KeyboardSensor de dnd-kit)  await user.keyboard(' ');  // 3\. Fletxa avall per moure a la posició següent  await user.keyboard('{ArrowDown}');  // 4\. Espai per alliberar  await user.keyboard(' ');  // 5\. Verificar que s'ha cridat el handler de reordenació  expect(handleReorder).toHaveBeenCalledWith('1', '2');}); |
| :---- |

**La millor estratègia: Separar la lògica del DnD**

La solució més robusta i recomanada és **separar la lògica de reordenació de la lògica del DnD**. Testejar la lògica pura per separat, i testejar el DnD integrat d'una altra manera.

| // ✅ ESTRATÈGIA 1: Testejar la lògica pura per separat// (sense render, sense DnD, just la funció)// utils/reordenar.tsexport function reordenarItems\<T extends { id: string }\>(  items: T\[\],  idOrigen: string,  idDesti: string): T\[\] {  const indexOrigen \= items.findIndex(i \=\> i.id \=== idOrigen);  const indexDesti \= items.findIndex(i \=\> i.id \=== idDesti);  const nouItems \= \[...items\];  const \[removed\] \= nouItems.splice(indexOrigen, 1);  nouItems.splice(indexDesti, 0, removed);  return nouItems;}// reordenar.test.ts \-- test UNITARI pur, sense DnD, sense DOMimport { describe, test, expect } from 'vitest';import { reordenarItems } from './reordenar';describe('reordenarItems', () \=\> {  const items \= \[    { id: '1', nom: 'A' },    { id: '2', nom: 'B' },    { id: '3', nom: 'C' },  \];  test('mou el primer al segon lloc', () \=\> {    const resultat \= reordenarItems(items, '1', '2');    expect(resultat.map(i \=\> i.nom)).toEqual(\['B', 'A', 'C'\]);  });  test('mou l\\'últim al primer lloc', () \=\> {    const resultat \= reordenarItems(items, '3', '1');    expect(resultat.map(i \=\> i.nom)).toEqual(\['C', 'A', 'B'\]);  });  test('no canvia si origen i desti son iguals', () \=\> {    const resultat \= reordenarItems(items, '1', '1');    expect(resultat).toEqual(items);  });}); |
| :---- |

| // ✅ ESTRATÈGIA 2: Testejar el component mock-ejant el DnD// Testejar el component sense el DnD real// Mock de tot dnd-kit per a tests d'integració:vi.mock('@dnd-kit/core', () \=\> ({  DndContext: ({ children, onDragEnd }: any) \=\> (    \<div data-testid="dnd-context"         onDragEnd={onDragEnd}\>      {children}    \</div\>  ),  useSensor: vi.fn(),  useSensors: vi.fn(() \=\> \[\]),  // ... altres exports necessaris}));vi.mock('@dnd-kit/sortable', () \=\> ({  SortableContext: ({ children }: any) \=\> \<\>{children}\</\>,  useSortable: (args: any) \=\> ({    attributes: {},    listeners: {},    setNodeRef: vi.fn(),    transform: null,    transition: null,    isDragging: false,  }),  sortableKeyboardCoordinates: vi.fn(),  arrayMove: (arr: any\[\], from: number, to: number) \=\> {    const result \= \[...arr\];    const \[removed\] \= result.splice(from, 1);    result.splice(to, 0, removed);    return result;  },  verticalListSortingStrategy: vi.fn(),}));// Ara pots testejar el component sense el DnD real:test('el component renderitza tots els items', () \=\> {  const items \= \[    { id: '1', label: 'Item A' },    { id: '2', label: 'Item B' },  \];  render(\<LlistaOrdenable items={items} onReorder={vi.fn()} /\>);  expect(screen.getByText('Item A')).toBeInTheDocument();  expect(screen.getByText('Item B')).toBeInTheDocument();}); |
| :---- |

| // ✅ ESTRATÈGIA 3: Testejar el handler onDragEnd directament// Simular el que dnd-kit passaria a onDragEndtest('crida onReorder quan un drag acaba', () \=\> {  const handleReorder \= vi.fn();  const items \= \[    { id: 'a', label: 'A' },    { id: 'b', label: 'B' },    { id: 'c', label: 'C' },  \];  render(\<LlistaOrdenable items={items} onReorder={handleReorder} /\>);  // Simular directament l'event onDragEnd que dnd-kit emetria  const dndContext \= screen.getByTestId('dnd-context');  fireEvent(dndContext, new CustomEvent('DragEnd', {    detail: {      active: { id: 'a' },      over: { id: 'b' },    }  }));  // Verificar que la lògica s'ha executat  expect(handleReorder).toHaveBeenCalledWith('a', 'b');}); |
| :---- |

**Resum: les estratègies per nivells**

NIVELL 1: Tests UNITARIS de la lògica pura  
  → Testejar la funció de reordenació per separat  
  → Sense DOM, sense DnD, sense mocks complexos  
  → Els tests més ràpids i fiables  
  → Cobreix: casos límit, reordenació correcta, edge cases

NIVELL 2: Tests d'INTEGRACIÓ del component (amb mocks)  
  → Mock de dnd-kit per aïllar el component del DnD real  
  → Testejar: renderitzat correcte, crida als handlers  
  → Vitest vi.mock('@dnd-kit/core', ...)  
  → Cobreix: UI, comunicació amb el pare, accessibilitat

NIVELL 3: Tests de KEYBOARD DnD  
  → Usar KeyboardSensor (fàcil de simular en JSDOM)  
  → userEvent.keyboard(' ') \+ ArrowDown/Up \+ ' '  
  → Cobreix: accessibilitat de teclat, flux complet

NIVELL 4: Tests E2E (Playwright/Cypress)  
  → Browser real → getBoundingClientRect funciona\!  
  → Simular pointer events reals  
  → Cobreix: flux complet amb animations, touch devices  
  → Reservar per als camins crítics

REGLA GENERAL:  
  → No intentis replicar la física del DnD en JSDOM  
  → Separa la lògica del DnD de la UI  
  → Testa la lògica de negoci (reordenació) per separat  
  → Testa l'accessibilitat via teclat (KeyboardSensor)  
  → Deixa els tests de pointer/touch per als E2E

