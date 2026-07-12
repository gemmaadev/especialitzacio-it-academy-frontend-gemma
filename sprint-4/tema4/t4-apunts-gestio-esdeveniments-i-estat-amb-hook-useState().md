## **Tema 4 — Gestió d'esdeveniments i de l'estat amb `useState`**

**1\. HTML vs. React: la gestió d'esdeveniments**

La diferència no és únicament de sintaxi: és una diferència filosòfica. HTML usa strings i un model imperatiu; React usa funcions i un model declaratiu.

| // HTML: string, minúscules, crida la funció\<button onclick="handleClick()"\>// React: funció, camelCase, referència (NO crida)\<button onClick={handleClick}\>   // ✅ passa la referència\<button onClick={handleClick()}\> // ❌ s'executa en RENDER\! |
| :---- |

Les diferències clau: els event handlers en React son declaratius (React gestiona el cicle de vida automàticament), el `return false` de HTML no funciona en React (cal `e.preventDefault()` explícit), i els handlers tenen accés directe a props i state pel closure. 

Els handlers son el lloc correcte per a **side effects** (fetch, localStorage, analytics): a diferència de les funcions de renderitzat que han de ser pures, els handlers no.

**2\. Synthetic events: l'abstracció de React**

React no adjunta listeners directament a cada element. Usa **Event Delegation**: un sol listener al `<div id="root">` que captura tots els events via bubbling. Quan un event arriba al root, React crea un **SyntheticEvent** — un wrapper normalitzat cross-browser.

| function Component() {  const handleClick \= (e: React.MouseEvent\<HTMLButtonElement\>) \=\> {    e.target          // element que ha disparat l'event    e.currentTarget   // element on s'ha adjuntat el handler    e.nativeEvent     // l'Event natiu del browser (si el necessites)    e.preventDefault()    e.stopPropagation()  };} |
| :---- |

**Event Pooling eliminat a React 17+**: ja no cal `e.persist()`. L'accés asíncron al SyntheticEvent és completament segur.

**3\. Tipar events amb TypeScript: els tres mètodes**

| // MÈTODE 1: Inline → TypeScript infereix automàticament (el més senzill)\<input onChange={(e) \=\> console.log(e.target.value)} /\>// MÈTODE 2: Anotació a la DRETA → tipus explícit del paràmetreconst handleChange \= (e: React.ChangeEvent\<HTMLInputElement\>): void \=\> {  console.log(e.target.value);};// MÈTODE 3: Anotació a l'ESQUERRA → tipus del handler completconst handleChange: React.ChangeEventHandler\<HTMLInputElement\> \= (e) \=\> {  console.log(e.target.value);}; |
| :---- |

Els tipus més usats: `React.MouseEvent<T>`, `React.ChangeEvent<T>`, `React.KeyboardEvent<T>`, `React.FormEvent<T>`, `React.DragEvent<T>`. 

El segon genèric `<T>` és l'element HTML (`HTMLInputElement`, `HTMLButtonElement`, `HTMLFormElement`...). 

**Nota React v19+:** `FormEvent` és deprecated → usar `SubmitEvent`.

**4\. `onClick={handleClick}` vs. `onClick={() => handleClick(id)}`**

La distinció fonamental: referència vs. wrapper.

| // Referència directa: React guarda la MATEIXA funció\<button onClick={handleClick}\>        // sense arguments// Funció anònima: crea una NOVA funció en cada render\<button onClick={() \=\> handleClick(id)}\>  // quan cal passar arguments |
| :---- |

La funció anònima és **necessària quan cal passar arguments**. L'impacte de rendiment és negligible en la majoria de casos. Únicament importa si el component fill usa `React.memo` → usar `useCallback` per estabilitzar la referència.

**5\. Propagació d'esdeveniments (Bubbling i Capturing)**

Els events es propaguen en tres fases: **capturing** (de dalt cap avall), **target** (l'element clicat), i **bubbling** (de baix cap amunt). El bubbling és el comportament per defecte i la base de l'Event Delegation de React.

| // e.target → l'element EXACTE que s'ha clicat// e.currentTarget → l'element ON s'ha adjuntat el handler// Aturar el bubbling: cas modal\<div className="overlay" onClick={onClose}\>  \<div className="content" onClick={(e) \=\> e.stopPropagation()}\>    {/\* clicar aquí NO tanca el modal \*/}  \</div\>\</div\>// Capturing (rarament necessari):\<div onClickCapture={handleCapture}\>  // s'executa ABANS dels fills |
| :---- |

`e.preventDefault()` ≠ `e.stopPropagation()`: el primer atura el comportament del browser (recàrrega del form, navegació d'un link); el segon atura que l'event arribi als pares. No son el mateix.

**6\. Accessibilitat en la gestió d'esdeveniments**

Tota la funcionalitat exposada a través d'un event de ratolí ha d'estar disponible també usant únicament el teclat. La regla fonamental: **HTML semàntic primer**.

| // ❌ div amb onClick → inaccessible per teclat\<div onClick={handleClick}\>Clic\</div\>// ✅ button → accessible per defecte\<button onClick={handleClick}\>Clic\</button\>// Tab per a focus, Enter i Espai per a activar → sense codi extra// Gestió de focus en modals:useEffect(() \=\> {  if (isOpen) {    modalRef.current?.focus();        // mou focus en obrir  } else {    previousFocusRef.current?.focus(); // restaura en tancar  }}, \[isOpen\]);// ARIA per a estats dinàmics:\<button aria-expanded={isOpen} aria-controls="menu"\>Menú\</button\>\<div aria-live="polite"\>{isLoading ? 'Carregant...' : ''}\</div\> |
| :---- |

Eina: `eslint-plugin-jsx-a11y` detecta problemes automàticament en temps de desenvolupament.

**7\. Què és l'Estat i el Hook `useState`**

L'estat és la **memòria** del component: dades que persisteixen entre renders i que, en canviar, provoquen que React actualitzi la UI. Les variables JavaScript normals es resetegen en cada render → no serveixen per a dades dinàmiques.

| const \[count, setCount\] \= useState(0);//     ↑ valor actual   ↑ funció setter  ↑ valor inicial (únicament 1er render) |
| :---- |

**El model mental clau — cada render és una Snapshot:**

| // count és CONGELAT per a tot el render actualfunction handleClick() {  setCount(count \+ 1);  // count \= 0 → 1  setCount(count \+ 1);  // count segueix sent 0\! → 1  setCount(count \+ 1);  // count segueix sent 0\! → 1  // Resultat: count \= 1, no 3\!  // ✅ Solució: funció updater per accedir al valor ANTERIOR  setCount(prev \=\> prev \+ 1);  // 0 → 1  setCount(prev \=\> prev \+ 1);  // 1 → 2  setCount(prev \=\> prev \+ 1);  // 2 → 3} |
| :---- |

Les **Regles de `useState`**: mai mutar l'estat directament (arrays → spread, objectes → spread); usar funció updater quan l'estat depèn del valor anterior; Hooks sempre al nivell superior del component (mai en condicionals o loops). 

**Batching**: múltiples setState en un sol event handler → un únic re-render (des de React 18 també en async).

**8\. State vs. Props: les Diferències**

Dues maneres d'accedir a dades, amb propòsits radicalment diferents.

| State:  → Dades que el component posseeix i pot canviar  → Local i privat per defecte  → Canviar → re-render del component  → "La memòria del component"Props:  → Dades que el pare passa al fill  → Immutables per al fill (read\-only)  → Canvi al pare → re-render del fill  → "Els arguments de la funció" |
| :---- |

| function CartItem({ nom, preu, onEliminar }) { // ← props: ve del pare  const \[quantitat, setQuantitat\] \= useState(1); // ← state: intern  // El fill NO pot canviar les props  // Per comunicar cap amunt → callback prop  return (    \<button onClick={() \=\> onEliminar(nom)}\>Eliminar\</button\>  );} |
| :---- |

**Lifting State Up**: quan dos components necessiten compartir el mateix estat, s'eleva al component pare comú i es passa com a prop als fills. El flux és sempre unidireccional: de pare a fill via props, de fill a pare via callbacks.

**9\. Drag and Drop: HTML API Nativa vs. dnd-kit**

La HTML DnD API nativa usa 7 events (`dragstart`, `drag`, `dragenter`, `dragleave`, `dragover`, `drop`, `dragend`) i l'objecte `DataTransfer` per serialitzar dades. El `e.preventDefault()` al handler `dragover` és **obligatori** per activar el drop.

| // Mínim necessari per a un drop target:\<div  onDragOver={(e) \=\> e.preventDefault()} // ← sense això, drop no funciona\!  onDrop={(e) \=\> {    const data \= e.dataTransfer.getData('text/plain');    // processar...  }}/\> |
| :---- |

**Limitacions crítiques de la HTML API nativa:** no funciona en mòbil (touch), no pots personalitzar el ghost, inconsistències entre browsers, sense accessibilitat de teclat.

**dnd-kit (recomanat 2025-2026):** resol tots els problemes de l'API nativa.

| // Setup mínim de dnd-kit (llista ordenable):\<DndContext sensors={sensors} onDragEnd={handleDragEnd}\>  \<SortableContext items={ids}\>    {items.map(item \=\> \<ItemOrdenable key={item.id} id={item.id} /\>)}  \</SortableContext\>\</DndContext\>// Cada item:const { attributes, listeners, setNodeRef, transform } \= useSortable({ id });\<li ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform) }}    {...attributes} {...listeners}\> |
| :---- |

Gestió d'Esdeveniments:  
  HTML vs. React → camelCase, referència (no crida), e.preventDefault()  
  Synthetic Events → wrapper cross-browser, Event Delegation al root  
  Tipar TypeScript → inline (inferit), dreta (explícit), esquerra (handler type)  
  onClick={fn} vs. onClick={() \=\> fn(id)} → referència vs. wrapper amb args  
  Accessibilitat → \<button\> primer, ARIA, focus management, jsx-a11y

Propagació:  
  Fases: capturing → target → bubbling  
  e.target vs. e.currentTarget  
  stopPropagation() → atura el bubbling (modal pattern)  
  preventDefault() → atura el browser (forms, links)

useState:  
  Memòria del component → persisteix entre renders  
  Snapshot: valor congelat per render → updater fn per al valor anterior  
  Regles: no mutar, updater fn, hooks al top level  
  Batching: múltiples setState → un sol render

State vs. Props:  
  State → propi, mutable, local  
  Props → del pare, immutable per al fill  
  Flux unidireccional → lifting state up \+ callbacks

Drag and Drop:  
  HTML API → dragstart/dragover/drop \+ DataTransfer, e.preventDefault() obligatori  
  Limitacions → no mòbil, no ghost, no teclat  
  dnd-kit → sensors sintètics, KeyboardSensor, DragOverlay, 10KB

