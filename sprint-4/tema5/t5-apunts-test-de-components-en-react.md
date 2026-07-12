## **Apunts tema 5 — Test de components en React**

**1\. Testing centrat en l'usuari**

El principi fonamental de tot el tema: **"Com més s'assemblin els teus tests a la manera en que el teu software s'usa, més confiança et poden donar."**

Existeixen dues aproximacions radicalment oposades:

TESTING D'IMPLEMENTACIÓ (evitar):  
  → "El component té l'estat 'loading' a true?"  
  → Accedeix a state intern, mètodes privats, noms de classes CSS  
  → Test trenca quan refactorizes (renomenar variable, useState→useReducer)  
  → Fals positius: el test passa però l'usuari pot tenir un bug

TESTING CENTRAT EN L'USUARI (recomanat):  
  → "L'usuari veu el spinner de càrrega?"  
  → Accedeix únicament al DOM renderitzat, com veu l'usuari  
  → Test resilient: si refactorizes sense canviar comportament → segueix passant  
  → Alta confiança: si el test falla, l'usuari ha trobat un problema real

La prioritat de queries reflecteix la filosofia, de major a menor recomanació: 

`getByRole` (rol ARIA)  
`getByLabelText` (per a forms)  
`getByText` (text visible)  
`getByPlaceholderText`  
i com a últim recurs `getByTestId`. 

Usar `getByTestId` indica que probablement estem testejant implementació.

**2\. Vitest: el test runner modern per a Vite**

En un món on Vite és el bundler estàndard, tenir dues pipelines separades (Vite per a dev/build, Jest per a tests) no té sentit. 

Vitest usa el `vite.config.ts` existent, compartint plugins, path aliases i la pipeline de TypeScript.

**Numbers reals (Vitest 4 vs Jest 30, suite gran):**

Cold start:    Vitest 38s  vs  Jest 214s  → 5.6x més ràpid  
Watch mode:    Vitest 0.3s vs  Jest 8.4s  → 28x més ràpid  
Memòria:       Vitest 57% menys pic de memòria

La velocitat prové de tres fonts: esbuild en lloc de Babel (sense compilació lenta de TypeScript), watch mode intel·ligent (re-executa únicament els tests afectats per un canvi via el graph de mòduls de Vite), i un pool de workers més eficient.

| // vite.config.ts \-- una sola pipeline per a totexport default defineConfig({  plugins: \[react()\],  test: {    globals: true,           // describe/test/expect globals sense imports    environment: 'jsdom',    // simula el DOM del browser    setupFiles: \['./src/setupTests.ts'\],    coverage: { provider: 'v8' },  },});// src/setupTests.tsimport '@testing-library/jest-dom'; // matchers: toBeVisible, toBeInTheDocument... |
| :---- |

L'API és quasi idèntica a Jest: `describe`, `test`, `expect`, `beforeEach`, `afterEach` son iguals. 

L'única diferència: `jest.` → `vi.` (`jest.fn()` → `vi.fn()`, `jest.mock()` → `vi.mock()`). 

El 2026, Vitest supera Jest en satisfacció (State of JS 2024\) i Angular 21 l'ha adoptat com a default.

**3\. React Testing Library: per què és superior a Enzyme**

Enzyme va ser creat per Airbnb el 2014\. La seva última versió estable data de 2019\. No suporta React 18 ni 19, ni Concurrent Mode. **Enzyme és pràcticament abandonat.**

RTL testa la UI des de "fora": treballa sobre nodes DOM renderitzats i per tant els tests es comporten com l'usuari ho faria. 

Quan es publica una nova versió de React, no cal fer cap canvi al codi font de la biblioteca — Enzyme, en accedir als internals de React, trenca en cada actualització major.

| // ❌ ENZYME: testa implementació, es trenca amb refactorsconst wrapper \= shallow(\<LoginForm /\>);wrapper.setState({ loading: true });         // ← accés a estat internexpect(wrapper.state('loading')).toBe(true); // ← si renomenem → TRENCA// ✅ RTL: testa comportament visible per l'usuarirender(\<LoginForm /\>);await user.click(screen.getByRole('button', { name: /envia/i }));expect(screen.getByRole('button', { name: /enviant.../i })).toBeDisabled();// ← si renomenem 'loading' a 'isSubmitting' → SEGUEIX PASSANT |
| :---- |

Avantatges concrets de RTL: no hi ha shallow rendering (sempre renderitza el component sencer → detecta bugs en la jerarquia), les queries per rol incentiven HTML semàntic i accessibilitat, i el cleanup és automàtic après cada test.

**4\. `userEvent` vs. `fireEvent`: interaccions completes vs. events aïllats**

`fireEvent` dispara UN sol event directament. `userEvent` simula la seqüència **completa** d'events que ocorreria en un browser real.

| // Un click real en un browser:// pointerover → mouseenter → mousemove → mousedown → focus → mouseup → clickfireEvent.click(boto);   // dispara ÚNICAMENT: clickawait user.click(boto);  // dispara TOTA la seqüència anterior// La diferència crítica:fireEvent.change(input, { target: { value: 'text' } });// → Funciona fins i tot si l'input és disabled → FALS POSITIU\!await user.type(input, 'text');// → Falla si l'input és disabled → detecta el bug correctament\!// → Per cada lletra: focus → keydown → keypress → input → keyup |
| :---- |

| // Patró recomanat: sempre userEvent.setup() abans del rendertest('formulari funciona correctament', async () \=\> {  const user \= userEvent.setup();  // ← sempre setup() primer  render(\<FormulariLogin /\>);  await user.type(screen.getByLabelText('Email'), 'anna@e.com');  await user.type(screen.getByLabelText('Password'), 'Contrasenya123\!');  await user.click(screen.getByRole('button', { name: /inicia sessió/i }));  expect(screen.getByText('Benvinguda\!')).toBeVisible();  // ← toBeVisible() en lloc de toBeInTheDocument() → evita falsos positius  //   (un element pot existir al DOM però estar hidden)}); |
| :---- |

`fireEvent` únicament quan cal un event molt específic aïlladament o quan `userEvent` no cobreix el cas.

**5\. Testing de DnD: els desafiaments i les solucions**

DnD és especialment difícil de testar per tres raons fonamentals:

PROBLEMA 1: JSDOM no implementa geometria del DOM  
  → getBoundingClientRect() → sempre { 0,0,0,0 }  
  → dnd-kit usa rects per a detecció de col·lisió → no funciona  
  SOLUCIÓ: mock de getBoundingClientRect al setupTests

PROBLEMA 2: dnd-kit usa sensors sintètics (NO HTML5 DnD API)  
  → dragstart/dragover/drop natives NO funcionen  
  → Cal simular: pointerdown → pointermove → pointerup  
  SOLUCIÓ: fireEvent amb pointer events específics

PROBLEMA 3: Seqüència d'events complexa i propensa a errors  
  → Mínims de moviment (5px per activar PointerSensor)  
  → Timing i ordre específics  
  SOLUCIÓ: usar KeyboardSensor per als tests (molt més simple)

**L'estratègia per nivells:**

| // NIVELL 1 (MILLOR): Testejar la lògica pura per separat// Sense DOM, sense DnD, sense mocks → ràpid i fiableexport function reordenarItems(items, idOrigen, idDesti) {  const iO \= items.findIndex(i \=\> i.id \=== idOrigen);  const iD \= items.findIndex(i \=\> i.id \=== idDesti);  const nous \= \[...items\];  const \[removed\] \= nous.splice(iO, 1);  nous.splice(iD, 0, removed);  return nous;}test('reordena correctament', () \=\> {  const resultat \= reordenarItems(    \[{ id: '1' }, { id: '2' }, { id: '3' }\], '1', '2'  );  expect(resultat.map(i \=\> i.id)).toEqual(\['2', '1', '3'\]);});// NIVELL 2: Mock de dnd-kit per a tests d'integració del componentvi.mock('@dnd-kit/core', () \=\> ({  DndContext: ({ children }: any) \=\> \<\>{children}\</\>,  useSensor: vi.fn(),  useSensors: vi.fn(() \=\> \[\]),}));vi.mock('@dnd-kit/sortable', () \=\> ({  SortableContext: ({ children }: any) \=\> \<\>{children}\</\>,  useSortable: () \=\> ({    attributes: {}, listeners: {},    setNodeRef: vi.fn(), transform: null, isDragging: false,  }),  arrayMove: (arr: any\[\], from: number, to: number) \=\> {    const r \= \[...arr\]; const \[x\] \= r.splice(from, 1); r.splice(to, 0, x); return r;  },  verticalListSortingStrategy: vi.fn(),}));// NIVELL 3: Tests via teclat (KeyboardSensor → accessible i testejable)await user.keyboard(' ');        // aixecar l'elementawait user.keyboard('{ArrowDown}'); // moure avallawait user.keyboard(' ');        // alliberar// NIVELL 4: E2E amb Playwright (browser real → getBoundingClientRect funciona)// Reservar per als camins DnD crítics |
| :---- |

**El stack recomanat 2025-2026**

| npm install \--save-dev vitest @vitest/uinpm install \--save-dev @testing-library/reactnpm install \--save-dev @testing-library/user-eventnpm install \--save-dev @testing-library/jest-domnpm install \--save-dev jsdom |
| :---- |

| // Anatomia d'un bon test:import { describe, test, expect, vi } from 'vitest';import { render, screen } from '@testing-library/react';import userEvent from '@testing-library/user-event';describe('Component', () \=\> {  test('descripció des de la perspectiva de l\\'usuari', async () \=\> {    // 1\. ARRANGE: preparar    const user \= userEvent.setup();    const onAccio \= vi.fn();    render(\<Component onAccio={onAccio} /\>);    // 2\. ACT: interactuar com l'usuari    await user.click(screen.getByRole('button', { name: /acció/i }));    // 3\. ASSERT: verificar el que l'usuari veuria    expect(screen.getByText('Resultat')).toBeVisible();    expect(onAccio).toHaveBeenCalledOnce();  });}); |
| :---- |

Filosofia: Testing centrat en l'usuari  
  → "Com s'usa el software, no com s'implementa"  
  → Queries: getByRole \> getByLabelText \> getByText \> getByTestId (últim recurs)  
  → Tests resilients als refactors → alta confiança

Vitest vs Jest:  
  → 5.6x més ràpid en cold start, 28x en watch mode  
  → Una sola pipeline: comparteix vite.config.ts  
  → TypeScript i ESM natius (sense Babel/ts-jest)  
  → API quasi idèntica: jest.fn() → vi.fn()  
  → Default per a projectes Vite \+ React el 2026

RTL vs Enzyme:  
  → Enzyme: abandonat (2019), no suporta React 18/19  
  → RTL: actiu, compatible amb totes les versions de React  
  → RTL no té shallow render → testa la jerarquia completa  
  → Queries per rol → promou accessibilitat automàticament

userEvent vs fireEvent:  
  → fireEvent: un sol event (artificial, fals positius possibles)  
  → userEvent: seqüència completa (realista, detecta bugs reals)  
  → Usar sempre userEvent.setup() → await user.click/type/keyboard  
  → fireEvent únicament per a casos molt excepcionals

Testing de DnD:  
  → JSDOM no implementa getBoundingClientRect → mock necessari  
  → dnd-kit usa pointer events (no HTML5 DnD API)  
  → Estratègia: separar lògica de reordenació → testejar-la sola (més fiable)  
  → KeyboardSensor per a tests d'integració (accessible i fàcil de simular)  
  → Mock de dnd-kit per a tests del component aïlladament  
  → E2E (Playwright) per a tests de DnD complets amb browser real

