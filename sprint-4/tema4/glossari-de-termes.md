## **Glossari de termes — Gestió d'esdeveniments i `useState`**

**`arrayMove`** — Utilitat de `@dnd-kit/sortable` que reordena un array de manera immutable donats l'índex original i el nou índex. Retorna un nou array sense mutar l'original. `arrayMove(items, oldIndex, newIndex)`. Essencial en el handler `onDragEnd` de dnd-kit.

**`aria-controls`** — Atribut ARIA que associa un element interactiu amb l'element que controla. `aria-controls="menu-id"` indica al lector de pantalla que el botó controla el menú amb aquell ID. Usat conjuntament amb `aria-expanded` per a dropdowns i menús.

**`aria-expanded`** — Atribut ARIA que indica si un element col·lapsable (menú, acordió, dropdown) és obert o tancat. `aria-expanded={isOpen}` actualitza automàticament quan canvia l'estat. Llegit pels lectors de pantalla per anunciar l'estat.

**`aria-hidden`** — Atribut que amaga un element als lectors de pantalla. `<TrashIcon aria-hidden="true" />` evita que el lector llegeixi l'SVG/icona quan hi ha text alternatiu (`aria-label`) al botó pare.

**`aria-label`** — Atribut ARIA que proporciona un text descriptiu per a elements sense text visible. Essencial per a botons d'icona: `<button aria-label="Eliminar element"><TrashIcon /></button>`. Sense `aria-label`, el lector de pantalla no sap quina és la funció del botó.

**`aria-live`** — Atribut ARIA que indica a els lectors de pantalla que anunciïn els canvis dinàmics del contingut. `aria-live="polite"` espera que l'usuari acabi d'interactuar. `aria-live="assertive"` interromp immediatament (per a errors crítics).

**Batching** — Optimització de React que agrupa múltiples crides a `setState` dins d'un sol event handler en un únic re-render. Des de React 18, el batching s'aplica també a funcions asíncrones i `setTimeout`. Evita renders innecessaris quan s'actualitzen múltiples estats alhora.

**Bubbling** — La fase de propagació d'events on l'event puja des de l'element que el va generar fins a l'arrel del document. La fase per defecte en React: quan cliques un `<button>` dins d'un `<div>`, primer s'executa el handler del `<button>`, i després el del `<div>`. Quasi tots els events fan bubbling excepte `focus` i `blur`.

**`camelCase`** — Convenció d'escriptura que React usa per als noms dels events. `onclick` en HTML → `onClick` en React. `onchange` → `onChange`, `onmouseenter` → `onMouseEnter`, `ondragover` → `onDragOver`. Tots els event handlers en React segueixen aquest patró.

**Capturing** — La primera fase de propagació d'events: de dalt cap avall, des de l'arrel fins a l'element target. Rarament usada en React. S'accedeix amb el sufix `Capture` al nom de l'event: `onClickCapture`. Útil per a analytics i routers que necessiten interceptar events abans que els fills els processin.

**`ChangeEvent`** — Tipus de SyntheticEvent de React que representa el canvi de valor en un `<input>`, `<select>` o `<textarea>`. `React.ChangeEvent<HTMLInputElement>` proporciona accés a `e.target.value`, `e.target.checked` (checkboxes) i `e.target.files` (file inputs).

**`children`** — Prop especial de React que representa el contingut JSX aniuat dins d'un component. `<Card>Contingut</Card>` → el component `Card` rep `children` com a prop. Es tipa com `React.ReactNode` en TypeScript, que accepta qualsevol cosa que React pugui renderitzar.

**`className`** — La propietat de React equivalent a l'atribut `class` de HTML. S'usa `className` en lloc de `class` per evitar conflictes amb la paraula reservada `class` de JavaScript.

**Collision Detection** — Algoritme de dnd-kit que determina sobre quin element droppable s'està arrossegant l'element actiu. `closestCenter` (el més proper al centre) és el més comú. Alternatius: `closestCorners`, `rectIntersection`.

**`currentTarget`** — Propietat d'un event que fa referència a l'element on s'ha adjuntat el handler. A diferència de `target`, no canvia durant el bubbling: sempre apunta a l'element amb el listener. Útil per a Event Delegation on el handler és al pare però cal saber quin pare.

**DataTransfer** — Objecte disponible durant les operacions de Drag and Drop que conté les dades transferides. `e.dataTransfer.setData('text/plain', dades)` guarda dades al `dragstart`. `e.dataTransfer.getData('text/plain')` les llegeix al `drop`. Les dades han de serialitzar-se a string (no pots transferir objectes JS directament).

**`drag`** — Event de la HTML DnD API que s'activa periòdicament (\~cada 100ms) mentre un element s'està arrossegant. S'activa en l'**element arrossegat** (no en la zona de drop). Útil per a feedback visual durant el drag.

**`dragend`** — Event de la HTML DnD API que s'activa quan l'operació de drag acaba, independentment de si s'ha fet drop o no. S'activa en l'**element arrossegat**. Útil per a netejar l'estat visual.

**`dragenter`** — Event de la HTML DnD API que s'activa quan un element arrossegat entra en una zona de drop. S'activa en la **zona de drop**. Útil per a feedback visual que indica que la zona accepta el drop.

**`draggable`** — Atribut HTML que fa un element arrossegable. `draggable={true}` o simplement `draggable` en JSX. Per defecte, imatges i links son draggable. Tot el resta no ho és. Nota: fer un element draggable impedeix seleccionar text dins d'ell amb el ratolí.

**`dragleave`** — Event de la HTML DnD API que s'activa quan un element arrossegat surt d'una zona de drop. S'activa en la **zona de drop**. Útil per eliminar el feedback visual d'hover quan s'abandona la zona.

**`dragover`** — Event de la HTML DnD API que s'activa periòdicament mentre un element s'arrossega sobre una zona de drop. S'activa en la **zona de drop**. **Cridar `e.preventDefault()` aquí és OBLIGATORI** per permetre que el `drop` s'activi: per defecte els elements no accepten drops.

**`dragstart`** — Event de la HTML DnD API que s'activa quan l'usuari comença a arrossegar un element. S'activa en l'**element arrossegat**. És l'únic moment per modificar el DataTransfer: `e.dataTransfer.setData(...)`.

**`drop`** — Event de la HTML DnD API que s'activa quan l'element s'allibera sobre una zona de drop. S'activa en la **zona de drop**. És l'únic moment per llegir les dades del DataTransfer: `e.dataTransfer.getData(...)`. Cal cridar `e.preventDefault()` per evitar el comportament per defecte del browser.

**`DndContext`** — Component proveïdor principal de dnd-kit. Embolcalla tots els elements draggables i droppables. Gestiona tot l'estat intern del DnD. Rep els sensors, l'algoritme de collision detection, i els handlers d'events (`onDragStart`, `onDragEnd`, `onDragOver`, `onDragCancel`).

**`DragOverlay`** — Component de dnd-kit que renderitza el "ghost" de l'element arrossegat en un portal React fora de l'arbre normal del DOM. Permet personalitzar completament l'aparença durant el drag. L'element original roman al seu lloc (no desapareix). Accepta qualsevol JSX com a contingut.

**`e.preventDefault()`** — Mètode que atura el comportament per defecte del browser per a un event. En formularis: evita la recàrrega de la pàgina. En links: evita la navegació. En `dragover`: permet que `drop` funcioni. **No atura el bubbling**. A diferència del HTML, `return false` no funciona en React.

**`e.stopPropagation()`** — Mètode que atura la propagació de l'event cap als elements pare (atura el bubbling). Útil per a modals on clicar el contingut interior no hauria de tancar el modal. No atura el comportament per defecte del browser.

**`e.stopImmediatePropagation()`** — Igual que `stopPropagation()` però a més atura els altres handlers del **mateix element** que s'hagin registrat per al mateix event. Atura tant el bubbling com els listeners addicionals en l'element actual.

**Event Delegation** — Patró on en lloc d'afegir listeners a cada element fill, s'afegeix un sol listener al pare. Funciona gràcies al bubbling: l'event puja fins al pare on el listener el captura. React usa Event Delegation internament: adjunta un sol listener al `<div id="root">` i distribueix tots els events des d'allà.

**EventHandler (tipus TypeScript)** — Tipus proporcionat per `@types/react` per tipar handlers d'events complets. `React.ChangeEventHandler<HTMLInputElement>` és equivalent a `(e: React.ChangeEvent<HTMLInputElement>) => void`. Usat quan es tipa el handler a l'esquerra de l'assignació.

**`ExecutionContext`** — (Context de NestJS, no de React. Veure el Glossari T5.)

**Focus Management** — La gestió programàtica del focus del teclat. Crítica per a l'accessibilitat: en obrir un modal s'ha de moure el focus al modal, i en tancar-lo s'ha de restaurar a l'element que el tenia abans. Implementat amb `useRef` i `element.focus()`.

**Focus Trap** — Tècnica que manté el focus del teclat dins d'un modal o diàleg mentre és obert. L'usuari pot navegar amb Tab dins del modal però no pot "escapar" cap a elements del DOM exteriors. Essencial per a l'accessibilitat de modals.

**`FocusEvent`** — Tipus de SyntheticEvent de React que representa el focus o el blur d'un element. `React.FocusEvent<HTMLInputElement>`. Disponible via `onFocus` i `onBlur`. Proporciona accés a `e.relatedTarget` (l'element que perd o guanya el focus).

**`FormEvent`** — Tipus de SyntheticEvent de React per a events de formulari. Deprecated a React v19 → substituir per `SubmitEvent`. `React.FormEvent<HTMLFormElement>` era l'estàndard per tipar handlers `onSubmit`. Funciona però genera warning de deprecació en projectes React v19+.

**Handler** — Funció que s'executa en resposta a un event. En React, els handlers s'assignen com a props: `onClick={handler}`. Els handlers de React poden tenir side effects (fetch, setState, analytics), a diferència de les funcions de renderitzat que han de ser pures.

**Immutabilitat (d'estat)** — El principi que l'estat de React mai s'ha de mutar directament. Per a arrays: `setItems([...items, nouItem])` en lloc de `items.push(nouItem)`. Per a objectes: `setUser({ ...user, edat: 26 })` en lloc de `user.edat = 26`. La mutació directa no dispara re-renders perquè React no detecta el canvi.

**`jsx-a11y`** — Plugin d'ESLint (`eslint-plugin-jsx-a11y`) que detecta problemes d'accessibilitat en JSX en temps de desenvolupament. Regles clau: `click-events-have-key-events` (tot onClick necessita onKeyDown), `no-static-element-interactions` (divs amb events necessiten `role`), `interactive-supports-focus` (elements interactius han de ser focusables).

**`KeyboardEvent`** — Tipus de SyntheticEvent de React per a interaccions de teclat. `React.KeyboardEvent<HTMLInputElement>`. Proporciona `e.key` (el valor de la tecla: `'Enter'`, `'Escape'`, `'ArrowUp'`...), `e.code` (codi físic de la tecla), `e.ctrlKey`, `e.shiftKey`, `e.altKey`, `e.metaKey`.

**`KeyboardSensor`** — Sensor de dnd-kit que permet iniciar i controlar el drag usant el teclat. Configurat amb `sortableKeyboardCoordinates`. Permet que els usuaris de teclat i lectors de pantalla puguin reordenar elements: Espai per aixecar, fletxes per moure, Espai/Enter per deixar anar, Escape per cancel·lar.

**Lazy Initialization** — Tècnica per a calcular el valor inicial de `useState` únicament en el primer render. En lloc de `useState(calcularValor())` (s'executa en CADA render), usar `useState(() => calcularValor())` (únicament en el primer). Útil per a càlculs costosos o llegir localStorage.

**Lifting State Up** — Patró de React que consisteix en moure l'estat al component pare comú més proper quan dos components germà necessiten compartir les mateixes dades. El pare posseeix l'estat i el passa als fills via props. Els fills comuniquen canvis via callbacks.

**`listeners`** — Objecte retornat per `useSortable` de dnd-kit que conté tots els event handlers necessaris per al drag (`onPointerDown`, `onKeyDown`, etc.). S'aplica a l'element arrossegable amb spread: `{...listeners}`.

**`MouseEvent`** — Tipus de SyntheticEvent de React per a interaccions de ratolí. `React.MouseEvent<HTMLButtonElement>`. Proporciona `e.clientX/Y` (posició relativa al viewport), `e.pageX/Y` (posició relativa al document), `e.button` (quin botó del ratolí), `e.ctrlKey`, `e.shiftKey`.

**`nativeEvent`** — Propietat d'un SyntheticEvent que proporciona accés a l'event natiu original del browser. `e.nativeEvent` és un `MouseEvent`, `KeyboardEvent`, etc. natiu. Necessari quan cal accedir a APIs del browser no disponibles al SyntheticEvent (ex: `composedPath()`).

**`onDragEnd`** — Handler principal de dnd-kit, s'executa quan l'usuari allibera l'element arrossegat. Rep un objecte `DragEndEvent` amb `active` (l'element arrossegat) i `over` (l'element on s'ha deixat anar). Aquí s'actualitza l'estat amb la nova posició.

**`onSubmit`** — Handler de React per a l'enviament de formularis. Cal cridar `e.preventDefault()` per evitar la recàrrega de la pàgina. A React v19+, es tipa com `React.SubmitEventHandler<HTMLFormElement>` (substituint el deprecated `FormEvent`).

**`PointerSensor`** — Sensor de dnd-kit que detecta l'inici del drag via events de pointer (unifica mouse, touch i stylus). L'opció recomanada per a compatibilitat cross-device. Substitueix la necessitat de gestionar `mouse` i `touch` events per separat.

**Propagació** — El mecanisme pel qual els events del DOM viatgen a través de l'arbre d'elements. Té tres fases: **capturing** (descens des de l'arrel), **target** (l'element que ha generat l'event), i **bubbling** (ascens cap a l'arrel). React usa principalment la fase de bubbling.

**Props** — Abreviació de "properties". Dades que un component pare passa a un component fill. Son immutables per al fill (read-only). Permeten el flux de dades unidireccional (pare → fill). Accepten qualsevol tipus JavaScript: strings, números, arrays, objectes, funcions (callbacks), JSX.

**`React.memo`** — HOC (Higher Order Component) que evita re-renders innecessaris d'un component fill si les seves props no han canviat. Usa comparació per referència (`===`). Per tant, funcions anònimes passades com a prop (`onClick={() => fn(id)}`) trenquen l'optimització perquè creen una nova referència en cada render → usar `useCallback`.

**Re-render** — El procés de re-executar la funció del component i recalcular el JSX que retorna. Ocorre quan: canvia l'estat (`setState`), canvien les props del pare, o el context canvia. React compara el nou output amb el DOM via reconciliation i únicament actualitza les parts que han canviat.

**Roving TabIndex** — Tècnica d'accessibilitat per a grups d'elements (tabs, menús, llistes) on únicament UN element del grup té `tabIndex={0}` (accessible via Tab des de fora) i la resta `tabIndex={-1}` (no accessibles via Tab però sí via fletxes de teclat programàticament). Evita que l'usuari hagi de tabular per tots els elements.

**Sensor (dnd-kit)** — Abstracció de dnd-kit que defineix com es detecta l'inici d'una operació de drag. `PointerSensor` (ratolí i touch), `KeyboardSensor` (teclat), `MouseSensor` (únicament ratolí), `TouchSensor` (únicament touch). Es configuren amb `useSensors` i `useSensor`.

**Snapshot (estat React)** — El model mental clau de `useState`: cada render té una "fotografia" (snapshot) de l'estat en aquell moment. El valor de `count` és congelat per a tot el render. `setCount` no canvia `count` en el render actual, únicament planifica un nou render amb el nou valor.

**`SortableContext`** — Component de dnd-kit que proporciona el contexte per a llistes i grids ordenables. Rep la llista d'IDs dels items i l'estratègia de sorting (`verticalListSortingStrategy`, `horizontalListSortingStrategy`, `rectSortingStrategy`).

**`state`** — La memòria d'un component React. Dades que persisteixen entre renders i que, en canviar, disparen un re-render. Gestionat via `useState` (components funcionals). A diferència de les props, el component és el propietari del seu estat i pot modificar-lo.

**`SubmitEvent`** — El nou tipus de React v19+ per a l'event d'enviament de formularis. Substitueix el deprecated `FormEvent`. `React.SubmitEventHandler<HTMLFormElement>` o `(e: React.SubmitEvent) => void`.

**`SyntheticEvent`** — Wrapper cross-browser que React crea al voltant dels events natius del browser. Normalitza propietats i comportaments que varien entre browsers. Proporciona `e.target`, `e.currentTarget`, `e.preventDefault()`, `e.stopPropagation()`, i `e.nativeEvent`. Event Pooling eliminat a React 17+.

**`tabIndex`** — Atribut HTML que controla si un element pot rebre focus via Tab i l'ordre en el que ho fa. `tabIndex={0}`: l'element és focusable en l'ordre natural del DOM. `tabIndex={-1}`: focusable programàticament però no via Tab. Valors positius (`tabIndex={1}`) distorsionen l'ordre natural → evitar.

**`target`** — Propietat d'un event que fa referència a l'element que ha generat originalment l'event (el que s'ha clicat, l'input que ha canviat, etc.). No canvia durant el bubbling. `e.target.value` per a inputs, `e.target.checked` per a checkboxes, `e.target.dataset.id` per a atributs `data-*`.

**Type Assertion** — Sintaxi TypeScript per informar al compilador del tipus concret d'un valor quan TypeScript no el pot inferir. En el context de DnD i forms: `const target = e.target as typeof e.target & { email: { value: string } }`. Usar amb moderació: és una afirmació al compilador, no una verificació en runtime.

**`useCallback`** — Hook de React que memoïtza una funció, mantenint la mateixa referència entre renders tret que canviïn les dependències. Útil quan es passa un handler a un component fill amb `React.memo` per evitar re-renders innecessaris. `const fn = useCallback(() => handleClick(id), [id])`.

**`useDraggable`** — Hook de dnd-kit que fa un element arrossegable. Retorna `attributes`, `listeners`, `setNodeRef`, `transform` i `isDragging`. Alternativa de baix nivell a `useSortable` quan no es necessita la funcionalitat de reordenació.

**`useDroppable`** — Hook de dnd-kit que fa una zona de drop. Retorna `setNodeRef`, `isOver` (si un element s'está arrossegant sobre la zona) i `over` (l'element actiu sobre la zona). Complementa `useDraggable` per a implementacions DnD personalitzades.

**`useSensors`** — Hook de dnd-kit que combina múltiples sensors en un de sol. `useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, options))`. Cal configurar-los per a que dnd-kit sàpiga com detectar l'inici del drag.

**`useSortable`** — Hook de dnd-kit que combina `useDraggable` i `useDroppable` per a elements de llistes ordenables. Retorna `attributes`, `listeners`, `setNodeRef`, `transform`, `transition` i `isDragging`. La solució per a implementar Kanban, llistes ordenables i grids.

**`useState`** — Hook de React per afegir estat a components funcionals. Retorna un array `[valorActual, funcióSetter]`. El valor inicial s'usa únicament en el primer render. Crida al setter → React planifica un re-render amb el nou valor. Pot emmagatzemar qualsevol tipus: primitiu, array, objecte, funció.

**`WAI-ARIA`** — Web Accessibility Initiative Accessible Rich Internet Applications. Especificació del W3C que defineix atributs HTML adicionals (`role`, `aria-*`) per millorar l'accessibilitat de components dinàmics per als lectors de pantalla. dnd-kit inclou suport WAI-ARIA integrat via els `attributes` retornats per `useSortable`.  
