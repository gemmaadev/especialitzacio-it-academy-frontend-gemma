## **CSS Grid: Guia completa**

**CSS Grid Layout Guide**  
[https://css-tricks.com/complete-guide-css-grid-layout/](https://css-tricks.com/complete-guide-css-grid-layout/)  
Guia completa i de referència per maquetar amb CSS Grid.

**Introducció: per què Grid?**

CSS Grid Layout és un sistema de layout bidimensional basat en graella que, comparat amb qualsevol sistema de layout web del passat, canvia completament la manera en la qual dissenyem interfícies d'usuari. Primer vam usar taules, després floats, positioning i inline-block, però tots aquests mètodes eren essencialment hacks i deixaven fora funcionalitats importants com el centrat vertical. CSS Flexbox és molt bona eina però el seu flux unidireccional té casos d'ús diferents: tots dos treballen molt bé conjuntament.

La diferència clau: Flexbox és per a layouts **d'una dimensió** (una fila o una columna). Grid és per a layouts **de dues dimensions** (files i columnes alhora).

**Terminologia bàsica**

**Grid Container** — l'element sobre el qual s'aplica `display: grid`. És el pare directe de tots els grid items. **Grid Item** — els fills directes del grid container. **Grid Line** — les línies divisòries que formen l'estructura de la graella. Poden ser verticals (column grid lines) o horitzontals (row grid lines). **Grid Track** — l'espai entre dues grid lines adjacents. Pensa-hi com les columnes o files de la graella. **Grid Cell** — l'espai entre dues row lines i dues column lines adjacents. És la unitat mínima de la graella. **Grid Area** — l'espai total envoltat per quatre grid lines. Pot contenir qualsevol nombre de grid cells.

**Propietats del contenidor (pare)**

### **`display: grid`**

Activa el Grid Layout en el contenidor:

| .container {  display: grid;        /\* grid de nivell block \*/  /\* display: inline-grid; → grid de nivell inline \*/} |
| :---- |

**`grid-template-columns` i `grid-template-rows`**

Defineixen les columnes i files de la graella. Els valors representen la mida de cada track:

| .container {  grid-template-columns: 1fr 1fr 1fr;        /\* 3 columnes iguals \*/  grid-template-columns: 200px auto 1fr;     /\* fixe, auto, flexible \*/  grid-template-columns: repeat(3, 1fr);     /\* equivalent a 1fr 1fr 1fr \*/  grid-template-rows: 100px 200px;           /\* 2 files de mides fixes \*/} |
| :---- |

La unitat `fr` permet definir la mida d'un track com una fracció de l'espai lliure del contenidor. L'espai lliure es calcula *després* de qualsevol element no flexible. En aquest exemple la quantitat total d'espai lliure disponible per als `fr` no inclou els 50px: `grid-template-columns: 1fr 50px 1fr 1fr`.

**`grid-template-areas`**

Defineix una plantilla de graella referenciant els noms de les grid areas. Repetir el nom d'una grid area fa que el contingut s'estengui per aquelles cel·les. Un punt significa una cel·la buida. La sintaxi proporciona una visualització de l'estructura de la graella.

| .item-a { grid-area: header; }.item-b { grid-area: main; }.item-c { grid-area: sidebar; }.item-d { grid-area: footer; }.container {  display: grid;  grid-template-columns: 1fr 250px;  grid-template-areas:    "header  header"    "main    sidebar"    "footer  footer";} |
| :---- |

Cada fila de la declaració ha de tenir el mateix nombre de cel·les. Pots usar punts per a cel·les buides: `"main . sidebar"`.

**`gap`**

L'espai entre els elements de la graella. Només s'aplica *entre* elements, mai a les vores:

| .container {  gap: 20px;           /\* row i column gap iguals \*/  gap: 16px 24px;      /\* row-gap: 16px, column-gap: 24px \*/  row-gap: 16px;  column-gap: 24px;} |
| :---- |

**Alineació dels elements dins del contenidor**

**`justify-items`** alinea els grid items al llarg de l'eix inline (horitzontal). **`align-items`** alinea els grid items al llarg de l'eix block (vertical). Tots dos accepten els valors: `stretch` (per defecte), `start`, `end` i `center`.

| .container {  justify-items: center;  /\* centra horitzontalment dins de cada cel·la \*/  align-items: center;    /\* centra verticalment dins de cada cel·la \*/  place-items: center;    /\* shorthand: ambdós alhora \*/} |
| :---- |

La manera més ràpida de centrar un element en totes dues dimensions:

| .container {  display: grid;  place-items: center;} |
| :---- |

**Alineació de la graella dins del contenidor**

Quan la graella és més petita que el seu contenidor (per exemple, usant unitats fixes com `px`), pots alinear la graella completa:

**`justify-content`** alinea la graella al llarg de l'eix inline (horitzontal). **`align-content`** alinea la graella al llarg de l'eix block (vertical). Accepten els valors: `start`, `end`, `center`, `stretch`, `space-around`, `space-between` i `space-evenly`.

| .container {  justify-content: space-between;  align-content: center;  place-content: center space-between;  /\* shorthand \*/} |
| :---- |

**`grid-auto-flow`**

Controla com es col·loquen automàticament els elements que no han estat col·locats explícitament:

| .container {  grid-auto-flow: row;     /\* per defecte: omple per files \*/  grid-auto-flow: column;  /\* omple per columnes \*/  grid-auto-flow: dense;   /\* omple forats (⚠️ pot trencar l'ordre DOM) \*/} |
| :---- |

**Propietats dels elements fills (grid items)**

### **`grid-column` i `grid-row`**

Defineixen on comença i acaba un element dins de la graella, usant els números de les grid lines:

| .item {  grid-column: 1 / 3;    /\* des de la línia 1 fins la 3 (ocupa 2 columnes) \*/  grid-row: 1 / 2;       /\* des de la línia 1 fins la 2 (ocupa 1 fila) \*/  /\* Amb span: \*/  grid-column: 1 / span 2;   /\* comença a la línia 1 i ocupa 2 columnes \*/  grid-column: span 3;        /\* ocupa 3 columnes des de la posició actual \*/} |
| :---- |

**`grid-area`**

Assigna un element a una grid area nombrada (per usar amb `grid-template-areas`), o és un shorthand per `grid-row-start / grid-column-start / grid-row-end / grid-column-end`:

| .header  { grid-area: header; }.sidebar { grid-area: sidebar; }.main    { grid-area: main; }.footer  { grid-area: footer; } |
| :---- |

**`justify-self` i `align-self`**

Sobreescriuen l'alineació d'un element individual (equivalent als `justify-items` i `align-items` del contenidor però per a un sol element):

| .item {  justify-self: start | end | center | stretch;  align-self: start | end | center | stretch;  place-self: center;  /\* shorthand \*/} |
| :---- |

**Funcions i valors especials**

**`fr`** — fracció de l'espai lliure disponible. `1fr 2fr` significa que el segon element és el doble que el primer.

**`repeat()`** — evita la repetició: `repeat(4, 1fr)` és equivalent a `1fr 1fr 1fr 1fr`.

**`minmax(min, max)`** — defineix un rang de mida: `minmax(100px, 1fr)` significa "mínim 100px, màxim 1fr".

**`auto-fill` i `auto-fit`** — creen tantes columnes com càpiguen, útil per a layouts responsius sense media queries:

| .grid {  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));  /\* Crea tantes columnes de mínim 200px com càpiguen \*/} |
| :---- |

La diferència entre `auto-fill` i `auto-fit`: `auto-fill` manté les cel·les buides, `auto-fit` les col·lapsa i estira els elements per omplir l'espai.

**Exemple pràctic: layout Holy Grail**

El layout clàssic de header, main+sidebar, footer en poques línies:

| .page {  display: grid;  min-height: 100vh;  grid-template-columns: 250px 1fr;  grid-template-rows: auto 1fr auto;  grid-template-areas:    "header  header"    "sidebar main"    "footer  footer";  gap: 1rem;}.page-header  { grid-area: header; }.page-sidebar { grid-area: sidebar; }.page-main    { grid-area: main; }.page-footer  { grid-area: footer; }/\* Responsiu: col·lapsa a una sola columna en mòbil \*/@media (max-width: 48rem) {  .page {    grid-template-columns: 1fr;    grid-template-areas:      "header"      "main"      "sidebar"      "footer";  }} |
| :---- |

**Resum de propietats**

**Del contenidor:**

| Propietat | Fa... |
| ----- | ----- |
| `display: grid` | Activa el Grid |
| `grid-template-columns/rows` | Defineix les columnes i files |
| `grid-template-areas` | Nombra les àrees del layout |
| `gap` | Espai entre elements |
| `justify-items` | Alineació horitzontal dels fills |
| `align-items` | Alineació vertical dels fills |
| `justify-content` | Alineació horitzontal de la graella |
| `align-content` | Alineació vertical de la graella |
| `grid-auto-flow` | Direcció del placement automàtic |

**Dels elements fills:**

| Propietat | Fa... |
| ----- | ----- |
| `grid-column` | Columnes que ocupa (start / end) |
| `grid-row` | Files que ocupa (start / end) |
| `grid-area` | Assigna a una àrea nombrada |
| `justify-self` | Alineació horitzontal individual |
| `align-self` | Alineació vertical individual |

