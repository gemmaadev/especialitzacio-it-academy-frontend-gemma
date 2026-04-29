## **Modern CSS: Solucions per a problemes antics**

**Modern CSS Solutions for Old CSS Problems**  
Patrons i solucions modernes per problemes CSS comuns.  
[https://moderncss.dev/](https://moderncss.dev/)

**Què és Modern CSS Solutions?**

Modern CSS Solutions és una sèrie creada per Stephanie Eckles que explora com les capacitats modernes de CSS resolen problemes que abans requerien hacks, JavaScript o solucions complicades. Cada article és una solució pràctica i directament aplicable, organitzada per temes: accessibilitat, layout, tipografia, components, formularis i molt més.

**Les 12 actualitzacions CSS d'una línia**

Un dels articles més útils de la sèrie és "12 Modern CSS One-Line Upgrades": propietats modernes que milloren el codi amb una sola línia:

| /\* 1\. aspect-ratio: proporcions sense hacks de padding \*/.video {  aspect-ratio: 16 / 9;   /\* adéu al padding-top: 56.25% hack \*/}/\* 2\. object-fit: imatges responsives sense deformació \*/img {  object-fit: cover;  width: 100%;  height: 300px;}/\* 3\. margin-inline: auto: centrar sense width explícita \*/.container {  margin-inline: auto;    /\* equivalent modern de margin: 0 auto \*/}/\* 4\. text-underline-offset: millora visual dels links \*/a {  text-underline-offset: 0.3em;}/\* 5\. outline-offset: focus visible elegant \*/:focus-visible {  outline-offset: 4px;}/\* 6\. overscroll-behavior: scroll contained \*/.modal {  overscroll-behavior: contain;  /\* evita que el scroll passi al body \*/} |
| :---- |

**Funcions matemàtiques CSS: `calc()`, `clamp()`, `min()`, `max()`**

Les quatre funcions matemàtiques CSS millor suportades permeten usos pràctics i inesperats, com dins de gradients i funcions de color i en combinació amb propietats personalizades CSS.

**`calc()`** — Operacions matemàtiques:

| .element {  width: calc(100% \- 2rem);          /\* ample total menys padding \*/  font-size: calc(1rem \+ 0.5vw);     /\* tipografia que escala amb el viewport \*/  margin-top: calc(var(--gap) \* 2);  /\* múltiple d'un token \*/} |
| :---- |

**`clamp(mínim, preferit, màxim)`** — El valor creix entre límits:

| :root {  \--font-size-body:  clamp(1rem, 2.5vw, 1.5rem);    /\* 16px → 24px \*/  \--spacing-section: clamp(2rem, 8vw, 6rem);         /\* 32px → 96px \*/  \--width-content:   clamp(20rem, 90%, 75rem);       /\* responsive sense media query \*/} |
| :---- |

**`min()` i `max()`** — Tria el valor mínim o màxim entre opcions:

| .element {  width: min(100%, 600px);      /\* mai més ample de 600px, però responsive \*/  font-size: max(1rem, 2vw);   /\* mai menor d'1rem \*/  padding: max(1rem, 5%);      /\* padding generós en desktop, mínim en mòbil \*/} |
| :---- |

**`@property`: variables CSS amb tipus**

`@property` permet escriure CSS més segur, habilitant la definició de tipus per a propietats personalitzades. Aprèn per quèels valors de fallback tradicionals poden fallar, i com les funcions de `@property` milloren la resiliència de les definicions de propietats personalitzades.

| /\* ✅ Variable CSS amb tipus definit \*/@property \--progress {  syntax: '\<percentage\>';     /\* defineix el tipus: percentatge \*/  initial-value: 0%;          /\* valor inicial per defecte \*/  inherits: false;            /\* no hereta del pare \*/}/\* El benefici: pots animar la variable directament \*/.progress-bar {  \--progress: 0%;  background: conic-gradient(blue var(--progress), lightgray 0);  transition: \--progress 0.3s ease;  /\* animable perquè té tipus\! \*/}.progress-bar.loaded {  \--progress: 75%;} |
| :---- |

Sense `@property`, les variables CSS no es poden animar directament perquè el navegador no sap de quin tipus són.

**Tipografia fluid i escala tipogràfica**

| /\* Escala tipogràfica fluid amb clamp() \*/:root {  \--text-sm:   clamp(0.875rem, 1.5vw, 1rem);  \--text-base: clamp(1rem,     2vw,   1.25rem);  \--text-lg:   clamp(1.25rem,  2.5vw, 1.5rem);  \--text-xl:   clamp(1.5rem,   3vw,   2rem);  \--text-2xl:  clamp(2rem,     5vw,   3rem);  \--text-3xl:  clamp(2.5rem,   7vw,   4.5rem);} |
| :---- |

Les container query units permeten crear tipografia veritablement responsiva, independentment del context, aplicada via "mixins" amb propietats personalitzades.

**Espaiat contextual i intrinsic web design**

Aprèn a coexistir amb la impredictibilitat usant tècniques d'espaiat adaptatiu i contextual. Construeixes un conjunt inicial de propietats personalitzades per a gap, margin i padding.

| :root {  /\* Espaiat fluid basat en viewport \*/  \--space-xs:  clamp(0.25rem, 1vw,  0.5rem);  \--space-sm:  clamp(0.5rem,  2vw,  1rem);  \--space-md:  clamp(1rem,    3vw,  2rem);  \--space-lg:  clamp(1.5rem,  5vw,  3rem);  \--space-xl:  clamp(2rem,    8vw,  5rem);}/\* Aplicació contextual \*/.section {  padding-block: var(--space-xl);    /\* padding vertical fluid \*/}.card {  padding: var(--space-md);  gap: var(--space-sm);} |
| :---- |

**Solucions de layout modernes**

**Footer sempre al fons** (sense `position: absolute` hacks):

| /\* Amb Flexbox \*/body {  display: flex;  flex-direction: column;  min-height: 100vh;}main { flex: 1; }  /\* ocupa tot l'espai disponible \*/footer { }         /\* queda automàticament al fons \*//\* Amb Grid \*/body {  display: grid;  grid-template-rows: auto 1fr auto;  min-height: 100vh;} |
| :---- |

**Grid responsiu sense media queries:** 

| /\* Les columnes s'ajusten automàticament \*/.grid {  display: grid;  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));  gap: var(--space-md);} |
| :---- |

**Elements d'igual alçada** (el problema clàssic dels floats resolt):

| .cards {  display: flex;          /\* tots els fills tenen la mateixa alçada \*/  flex-wrap: wrap;  gap: 1rem;}.card { flex: 1 1 300px; }  /\* creix, s'encongeix, mínim 300px \*/ |
| :---- |

**Accessibilitat amb CSS modern**

El CSS modern proporciona capacitats que podem aprofitar per fer layouts més accessiblement inclusius per a usuaris de totes les capacitats en qualsevol dispositiu.

**Focus accessible i visible:**

| /\* Mai eliminar el focus sense substituir-lo \*/:focus-visible {  outline: max(2px, 0.15em) solid currentColor;  outline-offset: 0.25em;}/\* Botons amb focus molt visible \*/button:focus-visible {  outline: 2px solid var(--color-focus);  outline-offset: 3px;} |
| :---- |

**Respectar les preferències de moviment:**

| /\* Animació per defecte \*/.element {  transition: transform 0.3s ease;}/\* Eliminar animació per a usuaris sensibles \*/@media (prefers-reduced-motion: reduce) {  .element {    transition: none;  }} |
| :---- |

**Ocultar visualment però mantenir per als lectors de pantalla:**

| /\* La classe visually-hidden clàssica modernitzada \*/.visually-hidden {  clip: rect(0 0 0 0);  clip-path: inset(50%);  height: 1px;  overflow: hidden;  position: absolute;  white-space: nowrap;  width: 1px;} |
| :---- |

**Formularis accessibles i personalitzats**

**Inputs i textareas amb contrast adequat:**

| input, textarea {  /\* Herència tipogràfica: essencial per accessibilitat \*/  font: inherit;  /\* Border visible: mínim 3:1 de contrast \*/  border: 2px solid var(--color-border);  border-radius: 4px;  padding: 0.5em 0.75em;  /\* Accent-color per a checkboxes i radios \*/  accent-color: var(--color-primary);}input:focus-visible {  outline: 2px solid var(--color-focus);  outline-offset: 2px;  border-color: var(--color-focus);} |
| :---- |

**Selectors avançats útils**

| /\* :is() \-- simplifica selectors complexos \*/:is(h1, h2, h3, h4) {  line-height: 1.2;}/\* :where() \-- com :is() però amb especificitat zero \*/:where(ul, ol) {  list-style: none;  padding: 0;}/\* :has() \-- selector pare (el "has a child" selector) \*/.card:has(img) {  padding-top: 0;         /\* targeta amb imatge sense padding superior \*/}form:has(input:invalid) {  border-color: red;      /\* formulari amb errors \*/}/\* :focus-within \-- el contenidor quan un fill té focus \*/.form-group:focus-within label {  color: var(--color-primary);} |
| :---- |

**Les tres maneres d'afegir borders**

En CSS, de vegades un `border` no és realment un `border`. Hem de cobrir les diferències entre `border`, `outline` i `box-shadow` i quan triar cada un.

| /\* border: forma part de la box model, ocupa espai \*/.element { border: 2px solid blue; }/\* outline: no ocupa espai, va fora de la box model \*//\* Perfecte per al focus perquè no desplaça elements \*/.element:focus { outline: 2px solid blue; }/\* box-shadow: no ocupa espai, es pot apilar \*//\* Permet múltiples "borders" a la vegada \*/.element {  box-shadow:    0 0 0 2px blue,       /\* border interior \*/    0 0 0 4px white,      /\* separació \*/    0 0 0 6px navy;       /\* border exterior \*/} |
| :---- |

**Resum:** 

| Problema antic | Solució moderna |
| ----- | ----- |
| Padding hack per `aspect-ratio` | `aspect-ratio: 16/9` |
| `margin: 0 auto` amb `width` | `margin-inline: auto` |
| Tipografia amb múltiples media queries | `clamp()` per tipografia fluid |
| Footer flotant | `min-height: 100vh` \+ `flex: 1` al main |
| Columns iguals amb floats | `display: flex` o `grid` |
| Grid de 12 columnes | `auto-fill` \+ `minmax()` sense media queries |
| Variables no animables | `@property` amb tipus definit |
| Checkbox personalitzat complex | `accent-color` |
| Focus outline eliminat | `:focus-visible` amb outline de contrast |
| Animació per a tothom | `prefers-reduced-motion` |

