## **Drag and Drop en React: HTML API nativa i dnd-kit**

###### ***Drag and Drop API*** Documentació oficial de MDN sobre la API HTML Drag and Drop. [*https://developer.mozilla.org/en-US/docs/Web/API/HTML\_Drag\_and\_Drop\_API*](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

###### **React: Drag and Drop sense llibreries**

Tutorial de freeCodeCamp per afegir drag and drop a React sense dependències externes.  
[https://www.freecodecamp.org/news/reactjs-implement-drag-and-drop-feature-without-using-external-libraries-ad8994429f1a/](https://www.freecodecamp.org/news/reactjs-implement-drag-and-drop-feature-without-using-external-libraries-ad8994429f1a/)

###### ***dnd-kit***

Llibreria moderna i flexible per implementar funcionalitats de drag and drop.  
[https://dndkit.com/](https://dndkit.com/)

**Les tres aproximacions: quan usar cada una**

HTML Drag and Drop API nativa:  
  → Arrossegar fitxers des del SO al browser  
  → Casos simples sense requisits de mòbil/accessibilitat  
  → Quan no vols dependències externes

React sense llibreries (events DnD \+ useState):  
  → Aprenentatge i prototips  
  → Casos molt específics i controlats

dnd-kit (recomanat 2025-2026):  
  → La majoria de casos en producció  
  → Accessibilitat, mòbil, animacions, Kanban...

**La HTML Drag and Drop API Nativa**

Les interfícies HTML Drag and Drop permeten a les aplicacions usar funcionalitats de drag-and-drop als browsers. L'operació de DnD implica tres coses: l'element arrossegat, les dades a transferir, i la zona de drop.

### **Els 7 Events de DnD**

| Event | Quan s'activa | On s'activa |
| ----- | ----- | ----- |
| `dragstart` | L'element comença a ser arrossegat | **Element arrossegat** |
| `drag` | L'element s'està arrossegant (cada \~100ms) | **Element arrossegat** |
| `dragend` | L'operació de drag acaba | **Element arrossegat** |
| `dragenter` | Un element arrossegat entra en una zona | **Zona de drop** |
| `dragleave` | Un element arrossegat surt d'una zona | **Zona de drop** |
| `dragover` | Un element s'arrossega sobre la zona (\~100ms) | **Zona de drop** |
| `drop` | L'element s'allibera sobre la zona | **Zona de drop** |

### **El `DataTransfer`: com es transfereixen les dades**

No pots transferir objectes JavaScript directament. Les dades han de serialitzar-se a string i s'encapsulen en un objecte `DataTransfer`. L'únic moment per modificar el data store és dins del handler `dragstart`.

| // Implementació nativa de DnD en React amb TypeScriptfunction LlistaDnD() {  const \[items, setItems\] \= useState(\['Item 1', 'Item 2', 'Item 3'\]);  const \[draggingOver, setDraggingOver\] \= useState\<number | null\>(null);  // EVENT 1: dragstart → guardar les dades de l'element arrossegat  const handleDragStart \= (    e: React.DragEvent\<HTMLLIElement\>,    index: number  ) \=\> {    // DataTransfer: serialitzar les dades a string    e.dataTransfer.setData('text/plain', String(index));    e.dataTransfer.effectAllowed \= 'move';  };  // EVENT 2: dragover → OBLIGATORI cridar preventDefault() per permetre el drop  // Per defecte, els elements NO son drop targets → cal cancel·lar dragover  const handleDragOver \= (    e: React.DragEvent\<HTMLLIElement\>,    index: number  ) \=\> {    e.preventDefault();                  // ← ESSENCIAL: sense això, drop no funciona\!    e.dataTransfer.dropEffect \= 'move';    setDraggingOver(index);  };  // EVENT 3: dragleave → neteja visual  const handleDragLeave \= () \=\> {    setDraggingOver(null);  };  // EVENT 4: drop → llegir les dades i actualitzar l'estat  const handleDrop \= (    e: React.DragEvent\<HTMLLIElement\>,    targetIndex: number  ) \=\> {    e.preventDefault();    const sourceIndex \= Number(e.dataTransfer.getData('text/plain'));    if (sourceIndex \=== targetIndex) return;    // Reordenar els items    const nouItems \= \[...items\];    const \[removed\] \= nouItems.splice(sourceIndex, 1);    nouItems.splice(targetIndex, 0, removed);    setItems(nouItems);    setDraggingOver(null);  };  return (    \<ul\>      {items.map((item, index) \=\> (        \<li          key={item}          draggable                        // ← atribut HTML que habilita el drag          onDragStart={(e) \=\> handleDragStart(e, index)}          onDragOver={(e) \=\> handleDragOver(e, index)}          onDragLeave={handleDragLeave}          onDrop={(e) \=\> handleDrop(e, index)}          style={{            opacity: draggingOver \=== index ? 0.5 : 1,            border: draggingOver \=== index ? '2px dashed blue' : '1px solid gray',          }}        \>          {item}        \</li\>      ))}    \</ul\>  );} |
| :---- |

### **Limitacions de l'API Nativa**

L'API nativa de HTML5 drag and drop no ofereix el mateix nivell de feedback interactiu suau que altres biblioteques. No hi ha placeholder en viu de l'element arrossegat ni animacions de snapping. 

A més, no suporta touch events de mòbil, no pots estilitzar el "ghost" de l'element arrossegat, i té inconsistències entre browsers.

Limitacions crítiques de la HTML DnD API nativa:  
  ❌ No funciona en dispositius mòbils (touch events)  
  ❌ No pots personalitzar el "ghost" (previsualització)  
  ❌ No suporta scroll automàtic  
  ❌ Inconsistències entre browsers (especialment iOS Safari)  
  ❌ No té accessibilitat de teclat integrada  
  ❌ dragover s'activa massa sovint → problemes de rendiment

**dnd-kit: la solució moderna**

dnd-kit és un toolkit modern, lleuger, performant, accessible i extensible de drag and drop per a React escrit en TypeScript. 

Arquitectura en capes: un nucli framework-agnòstic (`@dnd-kit/core`, 10KB), un preset per a llistes ordenables (`@dnd-kit/sortable`), modificadors (`@dnd-kit/modifiers`) i accessibilitat (`@dnd-kit/accessibility`).

dnd-kit NO usa la HTML5 DnD API internament → usa "sensors" sintètics que controlen directament els events de pointer/mouse/touch/keyboard, cosa que li permet evitar totes les limitacions de l'API nativa.

| npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities |
| :---- |

### **Els conceptes fonamentals de dnd-kit**

| DndContext    → proveïdor que gestiona tot l'estat DnDSortableContext → contexte per a llistes ordenablesuseSortable   → hook per a cada element arrossegableDragOverlay   → el "ghost" que segueix el cursor (portal)Sensors       → detecten com comença el drag (mouse, touch, teclat)Collision detection → algoritme que decideix sobre quin element estàs |
| :---- |

### **Exemple complet: Llista Kanban Ordenable**

| import {  DndContext,  closestCenter,  KeyboardSensor,  PointerSensor,  useSensor,  useSensors,  DragEndEvent,} from '@dnd-kit/core';import {  arrayMove,  SortableContext,  sortableKeyboardCoordinates,  useSortable,  verticalListSortingStrategy,} from '@dnd-kit/sortable';import { CSS } from '@dnd-kit/utilities';// Component per a cada element ordenablefunction ItemOrdenable({ id, label }: { id: string; label: string }) {  const {    attributes,    // ← ARIA i data attributes    listeners,     // ← event handlers de drag    setNodeRef,    // ← ref per al DOM node    transform,     // ← posició actual durant el drag    transition,    // ← transició CSS    isDragging,    // ← si s'està arrossegant  } \= useSortable({ id });  const style \= {    transform: CSS.Transform.toString(transform),    transition,    opacity: isDragging ? 0.5 : 1,  };  return (    \<li      ref={setNodeRef}      style={style}      {...attributes}  // ← ARIA: role, aria-roledescription, tabIndex...      {...listeners}   // ← events: onPointerDown, onKeyDown...    \>      {label}    \</li\>  );}// Component pare amb el context DnDfunction LlistaKanban() {  const \[items, setItems\] \= useState(\[    { id: '1', label: 'Tasca 1' },    { id: '2', label: 'Tasca 2' },    { id: '3', label: 'Tasca 3' },  \]);  // Sensors: com detectem l'inici del drag  const sensors \= useSensors(    useSensor(PointerSensor),    // ← ratolí i touch    useSensor(KeyboardSensor, {  // ← teclat (accessibilitat\!)      coordinateGetter: sortableKeyboardCoordinates,    })  );  const handleDragEnd \= (event: DragEndEvent) \=\> {    const { active, over } \= event;    if (over && active.id \!== over.id) {      setItems((items) \=\> {        const oldIndex \= items.findIndex(i \=\> i.id \=== active.id);        const newIndex \= items.findIndex(i \=\> i.id \=== over.id);        // arrayMove: utilitat que reordena el array immutablement        return arrayMove(items, oldIndex, newIndex);      });    }  };  return (    \<DndContext      sensors={sensors}      collisionDetection={closestCenter}  // ← algoritme de col·lisió      onDragEnd={handleDragEnd}    \>      \<SortableContext        items={items.map(i \=\> i.id)}        strategy={verticalListSortingStrategy}      \>        \<ul\>          {items.map(item \=\> (            \<ItemOrdenable key={item.id} id={item.id} label={item.label} /\>          ))}        \</ul\>      \</SortableContext\>    \</DndContext\>  );} |
| :---- |

**Avantatges de dnd-kit sobre la HTML API Nativa**

dnd-kit proporciona suport fluid per a tots els dispositius. Mentre que HTML5 drag and drop té dificultats amb les interaccions mòbils, dnd-kit proporciona suport sense fricció en tots els dispositius. Gestiona automàticament events touch, mouse i teclat.

dnd-kit resol tots els problemes de l'API nativa:

  ✅ Touch devices (iOS, Android) → sensors de pointer  
  ✅ Teclat accessible → KeyboardSensor amb Space/Enter/fletxes  
  ✅ DragOverlay → ghost personalitzable via portal React  
  ✅ Scroll automàtic durant el drag  
  ✅ Cross-browser consistent  
  ✅ Animacions suaus (CSS transform, no layout thrash)  
  ✅ ARIA attributes automàtics → screen readers  
  ✅ 10KB core → bundle mínim  
  ✅ TypeScript natiu

### **El `DragOverlay`: el ghost personalitzable**

| // DragOverlay: renderitza el "ghost" en un portal React (fora del DOM normal)// → l'element original roman al seu lloc (no desapareix)// → pots estilitzar el ghost lliurementimport { DragOverlay } from '@dnd-kit/core';function LlistaAmb Overlay() {  const \[activeId, setActiveId\] \= useState\<string | null\>(null);  return (    \<DndContext      onDragStart={({ active }) \=\> setActiveId(active.id as string)}      onDragEnd={({ active, over }) \=\> {        setActiveId(null);        // reordenar...      }}    \>      \<SortableContext items={ids}\>        {items.map(item \=\> \<ItemOrdenable key={item.id} {...item} /\>)}      \</SortableContext\>      {/\* El ghost que segueix el cursor \*/}      \<DragOverlay\>        {activeId ? (          \<div style={{ transform: 'scale(1.05)', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}\>            {items.find(i \=\> i.id \=== activeId)?.label}          \</div\>        ) : null}      \</DragOverlay\>    \</DndContext\>  );} |
| :---- |

**Comparativa: HTML API Nativa vs. dnd-kit**

|  | HTML DnD API | dnd-kit |
| ----- | ----- | ----- |
| **Setup** | Mínim | Moderat |
| **Touch/Mòbil** | ❌ No suportat | ✅ Natiu |
| **Teclat (a11y)** | ❌ Manual | ✅ KeyboardSensor |
| **Ghost personalitzable** | ❌ Limitat | ✅ DragOverlay |
| **Animacions** | ❌ Bàsiques | ✅ CSS transform |
| **Browser compat.** | ⚠️ Inconsistent | ✅ Consistent |
| **TypeScript** | ⚠️ Parcial | ✅ Natiu |
| **Bundle** | 0KB | \~10KB core |
| **Fitxers des del SO** | ✅ | ❌ Usar react-dnd |
| **Ideal per a** | Fitxers, casos simples | Kanban, llistes, dashboards |

 → Arrossegar fitxers des del SO → HTML DnD API nativa  
 → Qualsevol altre cas (Kanban, ordenació de llistes,  
    reordenació de columnes) → dnd-kit  
