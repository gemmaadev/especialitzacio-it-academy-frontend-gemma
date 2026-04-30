## **Apunts tema 3: Frameworks i biblioteques d'estils en aplicacions web**

## **1\. CSS pur vs. Frameworks CSS**

Els frameworks CSS acceleren el desenvolupament proporcionant classes i components predefinits. 

* Els avantatges principals: velocitat de desenvolupament molt més alta, responsive out of the box, consistència visual entre membres de l'equip i ecosistema i documentació extensa.  
* Els desavantatges: corba d'aprenentatge de la seva sintaxi, risc de disseny genèric (especialment amb Bootstrap), dependència externa, i el perill de usar-los sense entendre el CSS subjacent.   
* La recomanació: aprèn CSS pur fins que et sentis còmoda i després adopta frameworks per millorar la productivitat, no per evitar aprendre.

**2\. Els tres grans frameworks: Tailwind, Bootstrap i Bulma**

1. **Bootstrap** — el veteran creat per Twitter (2011). Filosofia component-first: botons, modals, navbars i graelles llests per usar. Sintaxi llegible (`btn btn-primary`), JavaScript inclòs, fàcil per a principiants. Bundle gran (\~300kb), risc de "Bootstrap look" reconeixible. Ideal per a prototips ràpids, eines internes i developers de backend.  
2. **Tailwind CSS** — el líder actual (37% dels developers el 2025). Filosofia utility-first: classes de baix nivell combinables directament al HTML. Cap component predefinit, màxima personalització via `tailwind.config.js`, bundle mínim amb PurgeCSS (\~27kb). HTML verbós, corba d'aprenentatge de la seva sintaxi. Ideal per a productes únics, SaaS i projectes React/Next.js.  
3. **Bulma** — el punt mig modern basat en Flexbox. Filosofia simplista i llegible, classes semàntiques (`button is-primary`), CSS únicament sense JavaScript inclòs. Ideal quan ja tens un framework JS que gestiona la interactivitat i vols classes netes i llegibles.

**3\. CSS-in-JS: Styled Components i Emotion**

CSS-in-JS és l'enfocament on els estils viuen dins dels fitxers JavaScript, co-localitzats amb els components. Els estils s'escopegen automàticament al component (no hi ha conflictes globals), permeten estils dinàmics basats en props, i eliminen el CSS mort automàticament quan s'elimina el component.

**Styled Components** — crea components React nous amb estils integrats:

| const Button \= styled.button\`  background: ${props \=\> props.primary ? '\#3B82F6' : 'white'};  padding: 0.5rem 1.5rem;  &:hover { opacity: 0.9; }\`; |
| :---- |

**Emotion** — similar però amb dues APIs (`styled` i la prop `css`). Mida de bundle lleugerament menor, rendiment lleugerament millor.

**Quan NO usar CSS-in-JS:** aplicacions Next.js amb React Server Components (incompatibles perquè generen CSS en runtime), projectes on el rendiment és crític. Alternativa neta: **CSS Modules** (encapsulació sense cost de runtime).

**4\. Sistemes de Disseny i Storybook**

Un sistema de disseny és el repositori centralitzat que conté design tokens, biblioteca de components i documentació. Resol el problema de la inconsistència visual quan creix un equip o un producte. Les tres capes: tokens primitius (tots els valors possibles), tokens semàntics (el propòsit de cada valor) i tokens de component.

**Storybook** és l'eina estàndard de la indústria per construir i documentar sistemes de disseny. Permet desenvolupar cada component en aïllament sense arrencar tota l'aplicació, genera documentació automàtica a partir de les stories, i serveix com a font única de veritat per a developers, dissenyadors i QA. Cada story descriu un estat concret del component (`Default`, `Disabled`, `Loading`...). L'addon Controls genera un panell interactiu per modificar props en temps real.

Les eines complementàries: **Chromatic** per a visual regression testing, **Style Dictionary** per exportar tokens a múltiples plataformes, i **Figma \+ Storybook** per connectar disseny i codi.

**5\. Flexbox vs. Grid: quan usar cada un**

**La diferència fonamental:** Flexbox és per a layouts d'una dimensió (una fila OR una columna). Grid és per a layouts de dues dimensions (files AND columnes).

**Usa Flexbox per a:** navegació horitzontal, alineació d'elements dins de components (icona \+ text), grups de botons, llistes i qualsevol cosa que flueix en una sola direcció.

**Usa Grid per a:** layout de pàgina completa, graelles de targetes (on vols alineació vertical entre files), qualsevol layout on l'estructura ve del contenidor i no del contingut.

La combinació és el patró professional: Grid per a l'estructura macro de la pàgina i Flexbox per als components interns. Un element de grid pot ser un contenidor flex i viceversa.

| /\* Grid: estructura de pàgina \*/.page { display: grid; grid-template-areas: "header" "main" "footer"; }/\* Flexbox: component intern \*/header { display: flex; justify-content: space-between; align-items: center; } |
| :---- |

**6\. Preprocessadors: SASS/SCSS**

Els preprocessadors resolen les limitacions del CSS pur afegint variables, anidament, mixins, funcions i organització modular. SCSS és la sintaxi recomanada perquè és un superset de CSS: qualsevol CSS vàlid és SCSS vàlid.

Les funcionalitats clau: **variables** (`$color-primary: #3B82F6`), **anidament** per reflectir la jerarquia HTML, **mixins** per a blocs reutilitzables amb paràmetres, **funcions** per a càlculs i transformacions, i **parcials** (`_button.scss`) per a organització modular en fitxers separats.

L'estructura de carpetes recomanada: `abstracts/` (variables, mixins, funcions), `base/` (reset, tipografia), `components/` (un fitxer per component) i `layout/` (header, footer, grid).

La regla d'or de SASS Guidelines: **mantén SASS tan simple com puguis**. No construeixis sistemes pesats i complexos. Avita anidament de més de 3 nivells perquè genera selectors molt específics difícils de sobreescriure.

Avui dia amb CSS Custom Properties, container queries i `clamp()`, molts problemes que SASS resolia es poden resoldre en CSS pur. SASS segueix sent valuós principalment per la modularitat en fitxers, els mixins i la lògica condicional.

**7\. Metodologies CSS: BEM, OOCSS i SMACSS**

Les metodologies CSS proporcionen regles per escriure CSS escalable i mantenible en projectes grans. Resolen: cadenes de selectors profundes, especificitat incontrolable, CSS mort que ningú elimina i contaminació d'estils entre components.

* **BEM (Block, Element, Modifier)** — convenció de naming estricta: `bloc__element--modificador`. Cada classe té l'especificitat d'exactament una classe. Fa l'HTML més llegible perquè els noms comuniquen la relació entre elements. La millor opció per a equips grans amb molts components.  
* **OOCSS (Object-Oriented CSS)** — dos principis: separa estructura de skin (el layout d'un costat, els colors i fonts de l'altre), i separa contenidor de contingut (un component no depèn d'on és). Promou màxima reutilització.  
* **SMACSS** — organitza el CSS en cinc categories: Base (estils per defecte d'HTML), Layout (estructura de pàgina, prefix `l-`), Module (components reutilitzables), State (estats dinàmics, prefix `is-` o `has-`) i Theme (tematització). Ideal per a projectes grans amb molts developers.

Les tres metodologies es complementen i es poden combinar: SMACSS per a l'organització de fitxers, OOCSS per al principi de separació estructura/skin, i BEM per al naming dels components.

**8\. Optimització del Rendiment CSS**

El CSS és render-blocking per defecte: el navegador no pot pintar res fins que ha descarregat i processat tot el CSS. Les estratègies d'optimització per ordre d'impacte:

* **Eliminar CSS mort** — usar el Coverage de Chrome DevTools per identificar CSS no usat i PurgeCSS per eliminar-lo automàticament al build. Tailwind ho fa per defecte.  
* **Minificació i compressió** — els frameworks de build (Vite, webpack) minifiquen el CSS automàticament. Gzip o Brotli al servidor redueix fins al 80% la mida dels fitxers.  
* **Critical CSS** — extreure el CSS mínim per al contingut above-the-fold i incloure'l inline al `<head>`. Carregar la resta asíncronament amb `rel="preload"`.  
* **`content-visibility: auto`** — el navegador salta el renderitzat dels elements fora del viewport. Pot millorar el temps de càrrega inicial fins a un 40% en pàgines llargues.  
* **Animar únicament `transform` i `opacity`** — són accelerades per GPU i no causen reflow. Animar `width`, `height`, `top` o `margin` causa reflow en cada frame i és molt costós.  
* **Evitar `@import`** — carrega els fitxers CSS en seqüència en lloc de en paral·lel. Usar múltiples `<link>` al HTML en el seu lloc.  
* **Selectors simples** — preferir classes directes (`.nav-link`) sobre selectors descendents (`.header .nav ul li a`). La penalització de rendiment és petita però el codi és molt més mantenible.

**Esquema:**

| CSS pur  └── Frameworks (velocitat) vs. CSS pur (control)        ├── Bootstrap → component-first, ràpid, genèric        ├── Tailwind  → utility-first, flexible, modern        └── Bulma     → simplista, CSS-only, llegibleCSS en React  └── CSS-in-JS (runtime) vs. CSS Modules (build time)        ├── Styled Components → components amb estils        └── Emotion           → flexible, prop cssArquitectura  ├── SASS/SCSS → variables, mixins, modularitat  ├── BEM       → naming: bloc\_\_element--modificador  ├── OOCSS     → separar estructura de skin  └── SMACSS    → categoritzar: Base/Layout/Module/State/ThemeSistemes de disseny  ├── Tokens → primitius → semàntics → component  └── Storybook → component en aïllament \+ documentacióRendiment  ├── Eliminar CSS mort (PurgeCSS)  ├── Critical CSS inline  ├── content-visibility: auto  └── Animar només transform \+ opacity |
| :---- |

