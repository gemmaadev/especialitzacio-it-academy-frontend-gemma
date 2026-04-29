## **CSS Flexbox: guia completa**

**CSS Flexbox Layout Guide**  
[https://css-tricks.com/snippets/css/a-guide-to-flexbox/](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)  
Referència pràctica per dominar el model Flexbox.

**Introducció: per a què serveix Flexbox?**

L'objectiu del Flexbox Layout (Flexible Box) és proporcionar una manera més eficient de distribuir, alinear i distribuir l'espai entre elements d'un contenidor, fins i tot quan la seva mida és desconeguda o dinàmica. La idea principal és donar al contenidor la capacitat d'alterar l'amplada, l'alçada i l'ordre dels seus elements fills per omplir millor l'espai disponible. El layout de flexbox és independent de la direcció, a diferència dels layouts regulars.

El layout Flexbox és més apropiat per als components d'una aplicació i layouts de petita escala, mentre que el layout Grid és per a layouts de major escala.

**Terminologia bàsica**

Flexbox es basa en "flex-flow directions". Els elements es distribueixen seguint l'**eix principal** (main axis, de main-start a main-end) o l'**eix creuat** (cross axis, de cross-start a cross-end). L'eix principal no és necessàriament horitzontal: depèn de la propietat `flex-direction`.

**Contenidor flex (flex container)** — l'element pare amb `display: flex`. **Elements flex (flex items)** — els fills directes del contenidor.

**Propietats del contenidor (pare)**

### **`display`**

Activa el context Flexbox per a tots els fills directes:

| .container {  display: flex;         /\* block-level flex \*/  display: inline-flex;  /\* inline-level flex \*/} |
| :---- |

**`flex-direction`**

Estableix l'eix principal, definint la direcció en la qual es col·loquen els elements dins del contenidor. Pensa en els elements com disposats principalment en files horitzontals o columnes verticals.

| .container {  flex-direction: row;            /\* per defecte: esquerra a dreta \*/  flex-direction: row-reverse;    /\* dreta a esquerra \*/  flex-direction: column;         /\* de dalt a baix \*/  flex-direction: column-reverse; /\* de baix a dalt \*/} |
| :---- |

**`flex-wrap`**

Per defecte, tots els elements flex intenten cabre en una sola línia. Pots canviar-ho i permetre que s'ajustin en múltiples línies.

| .container {  flex-wrap: nowrap;       /\* per defecte: tots en una línia \*/  flex-wrap: wrap;         /\* s'ajusta en múltiples línies, de dalt a baix \*/  flex-wrap: wrap-reverse; /\* s'ajusta en múltiples línies, de baix a dalt \*/} |
| :---- |

**`flex-flow`**

Shorthand per a `flex-direction` i `flex-wrap`:

| .container {  flex-flow: row nowrap;    /\* per defecte \*/  flex-flow: column wrap;   /\* columna amb wrapping \*/} |
| :---- |

**`justify-content`**

Defineix l'alineació al llarg de l'eix principal. Ajuda a distribuir l'espai lliure extra quan els elements flex arriben a la seva mida màxima.

| .container {  justify-content: flex-start;    /\* per defecte: al principi \*/  justify-content: flex-end;      /\* al final \*/  justify-content: center;        /\* centrat \*/  justify-content: space-between; /\* espai entre elements, sense vores \*/  justify-content: space-around;  /\* espai igual al voltant de cada element \*/  justify-content: space-evenly;  /\* espai igual entre elements i vores \*/} |
| :---- |

Els valors més segurs i ben suportats són `flex-start`, `flex-end` i `center`.

**`align-items`**

Defineix el comportament per defecte de com es distribueixen els elements al llarg de l'**eix creuat** a la línia actual. Pensa-hi com la versió de `justify-content` per a l'eix creuat.

| .container {  align-items: stretch;     /\* per defecte: s'estira per omplir \*/  align-items: flex-start;  /\* al principi de l'eix creuat \*/  align-items: flex-end;    /\* al final de l'eix creuat \*/  align-items: center;      /\* centrat a l'eix creuat \*/  align-items: baseline;    /\* alineats per la línia base del text \*/} |
| :---- |

**`align-content`**

Alinea les línies d'un contenidor flex quan hi ha espai extra a l'eix creuat, similar a com `justify-content` alinea elements individuals dins de l'eix principal. **Nota:** Aquesta propietat només té efecte en contenidors flex de múltiples línies, on `flex-wrap` és `wrap` o `wrap-reverse`.

| .container {  align-content: flex-start;   /\* línies al principi \*/  align-content: flex-end;     /\* línies al final \*/  align-content: center;       /\* línies al centre \*/  align-content: space-between;  align-content: space-around;  align-content: stretch;      /\* per defecte: s'estira \*/} |
| :---- |

**`gap`**

La propietat `gap` controla explícitament l'espai entre elements flex. Aplica l'espaiat *únicament entre elements*, no a les vores exteriors.

| .container {  display: flex;  gap: 10px;           /\* row i column gap iguals \*/  gap: 10px 20px;      /\* row-gap: 10px, column-gap: 20px \*/  row-gap: 10px;  column-gap: 20px;} |
| :---- |

**Propietats dels elements fills (flex items)**

### **`order`**

Per defecte, els elements flex es distribueixen en l'ordre del codi font. La propietat `order` controla l'ordre en el qual apareixen al contenidor.

| .item {  order: 0;   /\* per defecte \*/  order: \-1;  /\* apareix primer \*/  order: 2;   /\* apareix al final \*/} |
| :---- |

⚠️ Recorda que `order` canvia l'ordre visual però no l'ordre del DOM: impacta en l'accessibilitat per a lectors de pantalla i navegació per teclat.

**`flex-grow`**

Defineix la capacitat d'un element flex de créixer si és necessari. Accepta un valor sense unitats que serveix com a proporció. Si tots els elements tenen `flex-grow: 1`, l'espai restant es distribueix igualment. Si un fill té un valor de `2`, aquell fill ocupa el doble d'espai que els altres.

| .item {  flex-grow: 0;  /\* per defecte: no creix \*/  flex-grow: 1;  /\* creix per omplir l'espai disponible \*/  flex-grow: 2;  /\* creix el doble que els elements amb flex-grow: 1 \*/} |
| :---- |

**`flex-shrink`**

Defineix la capacitat d'un element flex d'encongir-se si és necessari:

| .item {  flex-shrink: 1;  /\* per defecte: es pot encongir \*/  flex-shrink: 0;  /\* no es pot encongir mai \*/} |
| :---- |

**`flex-basis`**

Defineix la mida per defecte d'un element abans que es distribueixi l'espai restant. Pot ser una longitud (`20%`, `5rem`) o la paraula clau `auto`, que significa "mira la meva propietat width o height".

| .item {  flex-basis: auto;    /\* per defecte \*/  flex-basis: 200px;   /\* mida inicial de 200px \*/  flex-basis: 0;       /\* l'espai addicional al voltant del contingut no es compta \*/} |
| :---- |

**`flex`**

Shorthand per a `flex-grow`, `flex-shrink` i `flex-basis` combinats. El segon i tercer paràmetres són opcionals. El per defecte és `0 1 auto`. **Es recomana usar aquest shorthand** en lloc de les propietats individuals. El shorthand estableix els altres valors de manera intel·ligent.

| .item {  flex: 0 1 auto;  /\* per defecte: no creix, pot encongir, mida automàtica \*/  flex: 1;         /\* creix i s'encongeix igualment, flex-basis: 0% \*/  flex: 1 1 200px; /\* creix, s'encongeix, mida inicial 200px \*/  flex: none;      /\* equivalent a 0 0 auto: ni creix ni s'encongeix \*/} |
| :---- |

**`align-self`**

Permet que l'alineació per defecte (o l'especificada per `align-items`) sigui sobreescrita per a elements flex individuals.

| .item {  align-self: auto;       /\* hereta de align-items del contenidor \*/  align-self: flex-start;  align-self: flex-end;  align-self: center;  align-self: baseline;  align-self: stretch;} |
| :---- |

**Casos d'ús habituals**

**Centrar perfectament un element** — la manera més senzilla:

| .contenidor {  display: flex;  justify-content: center;  align-items: center;} |
| :---- |

**Navbar horitzontal responsive:**

| nav {  display: flex;  justify-content: space-between;  align-items: center;  gap: 1rem;  flex-wrap: wrap;   /\* s'ajusta en mòbil \*/} |
| :---- |

**Columnes iguals que s'ajusten:**

| .columnes {  display: flex;  gap: 1rem;}.columna {  flex: 1;  /\* totes ocupen el mateix espai \*/} |
| :---- |

**Empènyer un element al final:**

| .header {  display: flex;  align-items: center;}.logo { flex: 1; }       /\* ocupa tot l'espai disponible \*/.cta-button { }          /\* queda al final automàticament \*/ |
| :---- |

**Resum de propietats**

**Del contenidor:**

| Propietat | Fa... |
| ----- | ----- |
| `display: flex` | Activa Flexbox |
| `flex-direction` | Direcció de l'eix principal |
| `flex-wrap` | Si s'ajusta en múltiples línies |
| `justify-content` | Alineació a l'eix principal |
| `align-items` | Alineació a l'eix creuat |
| `align-content` | Alineació de múltiples línies |
| `gap` | Espai entre elements |

**Dels elements fills:**

| Propietat | Fa... |
| ----- | ----- |
| `order` | Ordre visual (⚠️ afecta accessibilitat) |
| `flex-grow` | Capacitat de créixer |
| `flex-shrink` | Capacitat d'encongir-se |
| `flex-basis` | Mida inicial |
| `flex` | Shorthand dels tres anteriors |
| `align-self` | Alineació individual a l'eix creuat |

**Flexbox vs. Grid: quan usar cada un**

| Situació | Eina recomanada |
| ----- | ----- |
| Layout d'una sola dimensió (fila O columna) | Flexbox |
| Layout de dues dimensions (files I columnes) | Grid |
| Navbar, botons, llistes horitzontals | Flexbox |
| Layout de pàgina complet, galeries | Grid |
| Centrar un element | Flexbox o Grid (`place-items: center`) |
| Components petits i dinàmics | Flexbox |
| Estructura de pàgina amb àrees nombrades | Grid |

