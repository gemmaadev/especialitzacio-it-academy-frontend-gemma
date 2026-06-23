**Glossari de termes — Tema 2: Composició de components, JSX i Props**

**camelCase (en JSX)** — Convenció d'escriptura per a atributs JSX que provenen d'HTML amb guions (`stroke-width` → `strokeWidth`). Necessària perquè els atributs JSX esdevenen claus d'objectes JavaScript, i els guions no són vàlids en noms de propietat. Excepció: `aria-*` i `data-*` mantenen els guions originals.

**children** — Prop especial que conté automàticament el contingut JSX niat entre l'etiqueta d'obertura i tancament d'un component (`<Card>contingut</Card>`). No es declara com un atribut explícit; React la genera i la passa automàticament, permetent patrons flexibles de composició.

**Component** — Funció de JavaScript que rep dades d'entrada (*props*) i retorna marcatge (JSX) descrivint com s'ha de veure una part de la UI. Pot ser tan petit com un botó o tan gran com una pàgina sencera ("components fins al final").

**Component fill** — Component que es renderitza dins d'un altre. Quan `Gallery` renderitza `Profile` al seu interior, `Profile` n'és el fill i `Gallery` el pare.

**Component pare** — Component que en renderitza un altre dins seu, establint així una relació jeràrquica. El pare és qui passa les props cap avall al fill.

**Dependency tree** — Arbre que modela les relacions d'importació entre mòduls (fitxers) JavaScript d'una app React. Cada node és un mòdul, cada branca una declaració `import`. L'utilitzen els bundlers (Webpack, Vite, Parcel) per decidir què incloure al paquet final de producció. Diferent del render tree.

**Destructuració (de props)** — Sintaxi de JavaScript per extreure propietats individuals de l'objecte `props` directament als paràmetres de la funció: `function Avatar({ person, size })`, en lloc de rebre `props` complet i accedir-hi amb `props.person`.

**Export amb nom** — Manera d'exportar múltiples valors des d'un mateix fitxer (`export function Profile() {}`). S'importa amb claus `{}` i el nom ha de coincidir exactament amb l'exportat. Un fitxer pot tenir-ne tants com calgui.

**Export per defecte** — Manera d'exportar un únic valor principal d'un fitxer (`export default function Gallery() {}`). Un fitxer només pot tenir-ne un; s'importa sense claus i amb qualsevol nom que es vulgui.

**`filter()`** — Mètode d'array de JavaScript que selecciona quins elements d'una col·lecció de dades han de mostrar-se, abans de transformar-los en JSX amb `map()`. `productes.filter(p => p.actiu)`.

**Fragment (`<>...</>`)** — Etiqueta buida que permet agrupar múltiples elements JSX sota un sol element arrel sense afegir cap node addicional al DOM real. La sintaxi curta no accepta `key`; per a això cal la sintaxi llarga `<Fragment key={...}>`.

**Immutabilitat de les props** — Principi pel qual un component mai ha de modificar directament les props que rep. Si necessita "canviar-les", ha de demanar al component pare que en passi unes de noves (típicament gestionant un estat amb `useState`).

**`interface` (TypeScript)** — Sintaxi alternativa a `type` per definir l'estructura d'un objecte. Recomanada sobretot per a definicions d'APIs públiques de llibreries, ja que permet extensió posterior via *declaration merging*.

**JSX** — Extensió de sintaxi de JavaScript que permet escriure marcatge semblant a HTML dins d'un fitxer `.js`. Uneix lògica i marcatge al mateix lloc (al component), evitant la desincronització del model clàssic HTML/CSS/JS separats. Es compila a crides de `React.createElement`.

**Key** — String o número que identifica de manera única i estable un element dins d'un array renderitzat amb `.map()`. Permet a React distingir elements entre renders independentment de la seva posició, optimitzant la reconciliation. Mai s'ha de generar al vol (`Math.random()`) ni basar-se en l'índex si la llista pot reordenar-se, inserir-se o eliminar-se elements.

**Leaf component** — Component sense fills, situat a la part inferior del render tree. Sol re-renderitzar-se amb freqüència, però el seu impacte en el rendiment és més localitzat que el d'un component top-level.

**`map()`** — Mètode d'array de JavaScript que transforma cada element d'una col·lecció de dades en un element JSX. `items.map(item => <li key={item.id}>{item.text}</li>)`.

**Prop drilling** — Problema que apareix quan cal passar una prop a través de molts nivells intermedis de l'arbre de components que no la necessiten directament, només per fer-la arribar a un component més profund.

**Props** — Objecte d'informació que un component pare passa a un component fill, equivalent als paràmetres d'una funció. Flueixen unidireccionalment (pare → fill) i són immutables. L'única manera de "comunicar" en sentit invers (fill → pare) és que el pare passi una funció com a prop.

**`React.FC` / `React.FunctionComponent`** — Tipus de TypeScript per anotar un component funcional sencer (`const App: React.FC<Props> = ...`). Encara funciona, però ja no és la pràctica recomanada actualment; es prefereix tipar només el paràmetre de props directament.

**`React.JSX.Element`** — Tipus de TypeScript que representa el valor de retorn exacte de `React.createElement`: un únic element JSX concret. Més restrictiu que `React.ReactNode`.

**`React.ReactNode`** — Tipus de TypeScript que representa qualsevol valor que un component React pugui retornar o rebre com a `children` (text, números, arrays, elements, `null`...). El tipus recomanat per a la prop `children`.

**Renderitzat condicional** — Tècnica per mostrar contingut diferent segons una condició lògica, utilitzant les eines normals de JavaScript: `if`/`else`, operador ternari (`? :`), o operador lògic `&&`. No existeix sintaxi especial pròpia de React per a això.

**Render tree** — Arbre que modela la relació pare-fill entre components React durant un render concret. Compost exclusivament per components (no inclou etiquetes HTML). Pot canviar de forma entre renders diferents a causa del renderitzat condicional.

**Root component** — Component des d'on arrenca una aplicació React (normalment `App`); és el primer que React renderitza i constitueix el node arrel del render tree.

**Top-level component** — Component proper al root component dins del render tree. El seu re-renderitzat afecta el rendiment de tots els components per sota seu; sol concentrar la complexitat principal de l'aplicació.

**`type` (TypeScript)** — Sintaxi recomanada per definir l'estructura de les props i l'estat dels components propis d'una aplicació, per consistència i perquè és més restrictiva que `interface`.

**Valor per defecte (de props)** — Valor que s'assigna a una prop mitjançant la sintaxi de destructuració (`{ size = 100 }`) quan aquesta no es passa explícitament. Només s'activa si la prop és `undefined`; **no** s'activa amb `0` o `null` explícits, ja que aquests són valors vàlids i diferents de l'absència de valor.

**`{}` (claus en JSX)** — Sintaxi que "obre una finestra" cap a JavaScript dins del marcatge JSX, permetent incrustar variables, expressions o crides de funcions tant en el contingut com en atributs. Només accepta expressions, no sentències com `if` o `for` directament.

