## **Glossari de termes: Frameworks i biblioteques d'estils**

**`@import`** — Regla CSS per importar fitxers externs dins d'un full d'estils. A evitar en producció perquè carrega els fitxers en seqüència (bloquejant) en lloc de en paral·lel. Substituir per múltiples `<link>` al HTML o per `@use` en SCSS.

**`@use`** — La manera moderna d'importar fitxers SCSS (substitut de `@import`). Crea un namespace per al mòdul importat, evitant col·lisions de noms.

**Above-the-fold** — El contingut visible al viewport sense fer scroll quan es carrega una pàgina. El CSS que renderitza aquest contingut és el que cal prioritzar com a Critical CSS.

**Atomic CSS** — Enfocament on cada classe CSS fa exactament una cosa (`m-4` per margin, `flex` per display). Tailwind CSS n'és l'exemple més popular. Filosofia oposada a la de Bootstrap.

**BEM (Block, Element, Modifier)** — Metodologia de naming CSS amb l'estructura `bloc__element--modificador`. Cada classe té sempre l'especificitat d'una sola classe. Fa el codi llegible i evita conflictes d'especificitat en equips grans.

**Bloc (BEM)** — L'embolcall exterior d'un component independent. Exemple: `.card`, `.nav`, `.button`.

**Bootstrap** — Framework CSS component-first creat per Twitter (2011). Proporciona components predissenyats (botons, modals, navbars, graella de 12 columnes) i JavaScript integrat. Ideal per a prototips ràpids i eines internes.

**Brotli** — Algorisme de compressió més eficient que Gzip, suportat per tots els navegadors moderns. Redueix fins al 80% la mida dels fitxers CSS en el servidor.

**Bulma** — Framework CSS modern basat en Flexbox, CSS únicament (sense JavaScript). Classes semàntiques i llegibles (`button is-primary`). Ideal quan el framework JavaScript ja gestiona la interactivitat.

**Bundle** — El fitxer CSS resultant de processar i combinar tots els estils del projecte durant el build. La seva mida afecta directament el temps de càrrega.

**`clamp(mínim, ideal, màxim)`** — Funció CSS que retorna el valor ideal si és dins dels límits. Usada per tipografia fluid i espaiat adaptable sense media queries.

**Component-first** — Filosofia de Bootstrap: proporcionar components complets i predissenyats que pots usar directament sense escriure CSS.

**`contain`** — Propietat CSS que indica al navegador que un element és independent del resto, permetent optimitzar el rendering. Valors: `layout`, `style`, `paint`, `size`.

**`content-visibility: auto`** — Propietat CSS que fa que el navegador salti el renderitzat dels elements fora del viewport. Pot millorar el temps de càrrega inicial fins a un 40% en pàgines llargues.

**Critical CSS** — El CSS mínim necessari per renderitzar el contingut visible sense fer scroll (above-the-fold). S'inclou inline al `<head>` per eliminar una petició HTTP addicional i accelerar el primer renderitzat.

**Critical Rendering Path** — La seqüència de passos que el navegador segueix per convertir HTML, CSS i JavaScript en píxels a la pantalla: DOM → CSSOM → Render Tree → Layout → Paint.

**CSS Modules** — Sistema que genera noms de classes únics en temps de build, proporcionant encapsulació sense el cost de runtime de CSS-in-JS. Compatible amb React Server Components.

**CSS-in-JS** — Enfocament on els estils es defineixen dins dels fitxers JavaScript, co-localitzats amb els components. Proporciona encapsulació automàtica i estils dinàmics basats en props.

**CSSOM (CSS Object Model)** — La representació en memòria de tots els estils CSS que el navegador construeix en paral·lel al DOM. El navegador necessita CSSOM complet abans de poder pintar res.

**Design System** — Repositori centralitzat que conté design tokens, biblioteca de components reutilitzables i documentació d'ús. Proporciona un llenguatge visual compartit per a tot l'equip.

**Design Token** — Variable amb nom significatiu que emmagatzema una decisió de disseny: color, mida, espaiat, ombra. S'organitzen en tres nivells: primitius, semàntics i de component.

**Element (BEM)** — Part d'un bloc que no té significat per si sola. S'escriu amb doble guió baix: `.card__title`, `.nav__item`.

**Emotion** — Biblioteca CSS-in-JS per a React amb dues APIs: `styled` (similar a Styled Components) i la prop `css`. Mida de bundle lleugerament menor que Styled Components.

**Flexbox** — Sistema CSS de layout unidimensional. Col·loca elements en una fila OR una columna. Ideal per a navegació, components interns i qualsevol layout d'una sola dimensió.

**`font-display: swap`** — Descriptor de `@font-face` que mostra el text amb la font del sistema mentre es descarrega la font web. Evita el FOIT (Flash of Invisible Text).

**`gap`** — Propietat CSS que defineix l'espai entre elements en Flexbox i Grid. Aplica espai únicament entre elements, mai a les vores. Superior als marges manuals.

**Grid** — Sistema CSS de layout bidimensional. Col·loca elements en files AND columnes simultàniament. Ideal per a l'estructura de pàgina, graelles de targetes i layouts complexos.

**`grid-template-areas`** — Propietat Grid que defineix el layout nombrant zones visualment al CSS. Llegible i explícit. Permet reordenar visualment sense canviar el DOM.

**Heurística KISS** — Keep It Simple Stupid. Principi fonamental de SASS Guidelines: Sass hauria de ser tan simple com sigui possible. No construeixis sistemes complexos quan una solució simple funciona.

**`justify-content`** — Propietat Flexbox/Grid que alinea els elements al llarg de l'eix principal. Valors principals: `flex-start`, `flex-end`, `center`, `space-between`, `space-evenly`.

**Lazy Loading (CSS)** — Tècnica per carregar CSS no crític de manera diferida, evitant que bloquegi el renderitzat inicial. S'implementa amb `rel="preload"` o carregant via JavaScript.

**LESS** — Preprocessador CSS basat en Node.js, competidor de SASS. Molt popular gràcies a Bootstrap (fins a la versió 4). Menys popular avui que SCSS.

**Material UI (MUI)** — Biblioteca de components React que implementa el Material Design de Google. Codi obert (MIT), altament personalitzable via `createTheme`. Ideal per a projectes React de qualsevol mida.

**Minificació** — Eliminació de tot l'espai en blanc, comentaris i caràcters innecessaris d'un fitxer CSS sense canviar el seu funcionament. Els frameworks de build (Vite, webpack) ho fan automàticament en producció.

**Mixin (SASS)** — Bloc de CSS reutilitzable amb possibles paràmetres, equivalent a una funció. Es defineix amb `@mixin` i s'usa amb `@include`.

**Modificador (BEM)** — Variant o estat d'un bloc o element. S'escriu amb doble guió: `.card--featured`, `.button--disabled`.

**OOCSS (Object-Oriented CSS)** — Metodologia basada en dos principis: separació d'estructura i skin (layout separat de colors i tipografia), i separació de contenidor i contingut (un component no depèn d'on és).  
**Parcial (SASS)** — Fitxer SCSS que comença amb guió baix (`_variables.scss`). No es compila per si sol: únicament s'inclou quan un altre fitxer el importa amb `@use`.

**`place-items`** — Shorthand CSS que combina `align-items` i `justify-items`. `place-items: center` centra en totes dues dimensions amb una sola declaració.

**PurgeCSS** — Eina que analitza tots els fitxers HTML i JavaScript del projecte i elimina automàticament les classes CSS que no hi apareixen. Tailwind CSS l'integra per defecte.

**`rel="preload"`** — Atribut HTML que indica al navegador que descarregui un recurs amb alta prioritat sense bloquejar el renderitzat. S'usa per carregar CSS no crític de manera asíncrona.

**Render-blocking** — El CSS és render-blocking per defecte: el navegador no pot pintar res fins que ha descarregat i processat tot el CSS. El Critical CSS i la càrrega asíncrona resolen aquest problema.

**Reflow** — Quan el navegador ha de recalcular la posició i mida de tots els elements afectats per un canvi d'estil. Molt costós en rendiment. Causa: canviar `width`, `height`, `margin`, `top`, `left`.

**Repaint** — Quan el navegador ha de repintar els píxels d'un element sense canviar el layout. Menys costós que el reflow. Causa: canviar `color`, `background`, `border-color`.

**SASS / SCSS** — Preprocessador CSS que afegeix variables, anidament, mixins, funcions i organització modular. SCSS és el format modern (superset de CSS). Sass és el format indented (sense claus ni punt i coma).

**SMACSS** — Scalable and Modular Architecture for CSS. Organitza el CSS en cinc categories: Base, Layout (prefix `l-`), Module, State (prefix `is-`/`has-`) i Theme.

**Specificity (Especificitat)** — Algoritme que determina quina regla CSS guanya quan múltiples regles apunten al mateix element. ID \> classe \> element. Les metodologies com BEM la mantenen sempre a un nivell de classe.

**Story (Storybook)** — Arxiu que descriu un estat concret d'un component: `Default`, `Disabled`, `Loading`, etc. Permet veure i provar cada variació de manera independent sense arrencar tota l'aplicació.

**Storybook** — Entorn de taller de frontend que permet construir, provar i documentar components de UI en aïllament. Estàndard de la indústria per a sistemes de disseny.

**Styled Components** — Biblioteca CSS-in-JS que crea components React nous amb estils integrats. Usa tagged template literals per escriure CSS pur dins de JavaScript.

**Tailwind CSS** — Framework CSS utility-first. Proporciona classes de baix nivell combinables directament al HTML (`flex`, `gap-4`, `text-sm`, `bg-blue-600`). Cap component predefinit. El més usat el 2025 (37% dels developers).

**ThemeProvider** — Component de React (de Styled Components, Emotion o Material UI) que proporciona un objecte de tema a tots els components fills via Context API.

**Token primitiu** — Primer nivell dels design tokens: tots els valors possibles sense context d'ús. Exemple: `--blue-600: #2563EB`. Mai s'usa directament al codi de components.

**Token semàntic** — Segon nivell dels design tokens: noms que descriuen el propòsit, apuntant als primitius. Exemple: `--color-primary: var(--blue-600)`. S'usa arreu del codi.

**Utility-first** — Filosofia de Tailwind CSS: proporcionar classes de baix nivell on cada classe fa exactament una cosa. Permet construir qualsevol disseny sense escriure CSS personalitzat.

 **Variable SASS** — Valor reutilitzable definit amb `$` que es resol en temps de compilació. `$color-primary: #3B82F6`. Diferent de les CSS Custom Properties (`var()`) que es resolen en temps d'execució.  
**`will-change`** — Propietat CSS que avisa el navegador de com es canviarà un element, permetent-li optimitzar per endavant. Usar únicament com a últim recurs per a animacions conegudes. Exemple: `will-change: transform`.  
