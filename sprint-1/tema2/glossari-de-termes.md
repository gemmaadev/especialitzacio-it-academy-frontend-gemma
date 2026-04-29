## **Glossari de termes:  maquetació d’aplicacions web**

**`accent-color`** — Propietat CSS moderna que aplica el color de marca als controls de formulari natius (checkboxes, radios, sliders, progress bars) sense necessitat de hacks. El navegador garanteix automàticament el contrast del checkmark sobre el color d'accent.

**`align-content`** — Propietat Flexbox/Grid que alinea les línies del contenidor quan hi ha espai extra a l'eix creuat. Només té efecte en contenidors amb múltiples línies (`flex-wrap: wrap`).

**`align-items`** — Propietat Flexbox/Grid que alinea tots els elements fills al llarg de l'eix creuat (vertical en `flex-direction: row`). Valors principals: `stretch`, `flex-start`, `flex-end`, `center`, `baseline`.

**`align-self`** — Versió individual de `align-items` que sobreescriu l'alineació d'un element fill concret respecte a l'eix creuat.

**`aria-describedby`** — Atribut ARIA que associa un element amb un text descriptiu addicional (pistes de format, informació complementària). El lector de pantalla el llegeix després del nom de l'element.

**`aria-expanded`** — Estat ARIA que indica si un element com un menú desplegable o un accordion està obert (`true`) o tancat (`false`). Cal actualitzar-lo via JavaScript quan l'estat canvia.

**`aria-hidden`** — Atribut ARIA que amaga un element completament de l'arbre d'accessibilitat. S'usa per a elements decoratius o redundants. `aria-hidden="true"` fa que els lectors de pantalla l'ignori totalment.

**`aria-label`** — Atribut ARIA que proporciona un nom accessible directament quan no hi ha text visible que el pugui donar. Usar quan no hi ha text visible disponible per referenciar.

**`aria-labelledby`** — Atribut ARIA que associa un element amb el text d'un altre element de la pàgina com a nom accessible. Prioritza sobre `aria-label` quan el text és visible.

**`aria-live`** — Atribut ARIA que indica als lectors de pantalla que han d'anunciar automàticament els canvis de contingut d'una regió. Valors: `polite` (quan l'usuari fa una pausa) i `assertive` (immediatament, interrumpint).

**`aria-required`** — Atribut ARIA que indica als lectors de pantalla que un camp de formulari és obligatori. Es combina amb la indicació visual (asterisc) però mai depèn exclusivament del color.

**Arbre d'accessibilitat** — Representació del DOM que el navegador construeix i exposa a les tecnologies d'assistència. Conté la informació sobre el rol, el nom, l'estat i les relacions de cada element. L'HTML semàntic produeix un arbre ric; el "div soup" produeix un arbre pla i inútil.

**`background-image`** — Propietat CSS per col·locar imatges decoratives via CSS. Com que no formen part del DOM, els lectors de pantalla les ignoren automàticament, eliminant la necessitat d'`alt=""`.

**`box-sizing: border-box`** — Canvia el model de capsa perquè el padding i el border s'incloguin dins de l'amplada i l'alçada declarades, en lloc d'afegir-s'hi. Fa el CSS de layout molt més predictible. Part essencial de qualsevol CSS reset modern.

**Breakpoint** — Punt en l'amplada del viewport on el layout canvia. S'expressa en `rem` en lloc de `px` per respectar les preferències de mida de lletra de l'usuari. Els breakpoints habituals: 48rem (768px), 64rem (1024px), 80rem (1280px).

**`calc()`** — Funció CSS que permet operacions matemàtiques entre unitats. Pot barrejar unitats diferents: `calc(100% - 2rem)`, `calc(var(--gap) * 2)`. S'usa per ajustar luminositat en colors HSL: `hsl(var(--h), var(--s), calc(var(--l) + 20%))`.

**`clamp(mínim, ideal, màxim)`** — Funció CSS que retorna el valor ideal si és entre els límits, el mínim si l'ideal és massa petit, i el màxim si és massa gran. S'usa per a tipografia fluid i espaiat adaptable sense media queries.

**`color-mix()`** — Funció CSS moderna que barreja dos colors en una proporció. Permet crear variants aclarides o enfosquides: `color-mix(in srgb, var(--brand) 70%, white)`.

**`container-type: inline-size`** — Declara un element com a contenidor de queries. Els seus fills poden usar `cqi` i `@container` per respondre a l'amplada del contenidor en lloc del viewport.

**`cqi`** — Unitat CSS equivalent a l'1% de la mida inline (horitzontal) del contenidor ancestre. Permet tipografia fluid que respon al contenidor concret, no al viewport global. Substitueix `vw` per a components que poden estar en contextos estrets.

**CSS Grid** — Sistema de layout bidimensional (files i columnes alhora). Ideal per a l'estructura general de pàgines, graelles de targetes i layouts complexos. Les propietats clau del contenidor: `grid-template-columns`, `grid-template-rows`, `grid-template-areas`, `gap`. Les dels fills: `grid-column`, `grid-row`, `grid-area`.

**CSS Reset** — Fitxer CSS que elimina o normalitza els estils per defecte dels navegadors. El reset modern mínim aplica `box-sizing: border-box`, elimina marges, assegura herència tipogràfica als formularis i mai elimina el focus outline.

**Design Token** — Variable CSS amb nom significatiu que emmagatzema una decisió de disseny: color, mida, espaiat, ombra... En lloc de valors màgics (`#3B82F6`) s'usa la variable (`var(--color-primary)`). Permet canvis globals en un sol lloc.

**Desktop-first** — Enfocament de maquetació on els estils base s'escriuen per a pantalla gran i s'usen `max-width` media queries per a les excepcions en pantalles petites. Genera més sobreescriptures i és menys eficient que mobile-first.

**Eix creuat (cross axis)** — L'eix perpendicular a l'eix principal en Flexbox. Si `flex-direction: row`, l'eix creuat és vertical. `align-items` controla l'alineació sobre aquest eix.

**Eix principal (main axis)** — L'eix al llarg del qual es col·loquen els elements en Flexbox. Per defecte és horitzontal (`flex-direction: row`). `justify-content` controla l'alineació sobre aquest eix.

**`<fieldset>` \+ `<legend>`** — Elements HTML per agrupar controls de formulari relacionats (especialment radio buttons i checkboxes) amb una etiqueta descriptiva del grup. El lector de pantalla llegeix la llegenda amb cada opció del grup.

**`flex`** — Shorthand per a `flex-grow`, `flex-shrink` i `flex-basis`. `flex: 1` significa "creix per omplir l'espai disponible". `flex: none` significa "no creixis ni t'encongeixis".

**`flex-basis`** — La mida inicial d'un element flex abans de distribuir l'espai restant. `auto` usa el width/height de l'element. `0` permet que `flex-grow` controli completament la mida.

**`flex-direction`** — Estableix l'eix principal de Flexbox. `row` (per defecte) \= horitzontal. `column` \= vertical. `row-reverse` i `column-reverse` inverteixen l'ordre visual.

**`flex-grow`** — Factor de creixement d'un element flex quan hi ha espai lliure al contenidor. `0` no creix. `1` creix per omplir l'espai. `2` creix el doble que els elements amb `flex-grow: 1`.

**`flex-shrink`** — Factor d'encongiment d'un element flex quan no hi ha prou espai. `1` (per defecte) permet encongir-se. `0` mai s'encongeix.

**`flex-wrap`** — Controla si els elements flex s'ajusten en múltiples línies quan no hi ha prou espai. `nowrap` (per defecte) força tots en una línia. `wrap` permet múltiples línies.

**Flexbox** — Sistema de layout CSS unidimensional. Ideal per a components i layouts on els elements s'organitzen en una fila o columna. El contenidor s'activa amb `display: flex`.

**`:focus`** — Pseudo-classe que s'aplica quan un element rep el focus, tant per ratolí com per teclat. Substituïda modernament per `:focus-visible` per a millor control.

**`:focus-visible`** — Pseudo-classe moderna que s'activa únicament quan el navegador determina que l'usuari usa el teclat, no el ratolí. Permet focus outline visible per a navegació per teclat sense que aparegui en clics de ratolí.

**`font: inherit`** — Regla essencial per als controls de formulari en CSS resets moderns. Fa que inputs, botons i textareas heretin la tipografia del document, corregint un comportament inconsistent dels navegadors.

**`gap`** — Propietat CSS que defineix l'espai entre elements en Flexbox i Grid. Aplica l'espai únicament entre elements, mai a les vores. Superior als marges manuals perquè no requereix pseudo-selectors per eliminar marges als extrems i s'adapta automàticament a `flex-direction`.

**Grid Area** — Zona nombrada en un grid definida amb `grid-area` als fills i referenciada amb `grid-template-areas` al contenidor. Permet layouts descriptius llegibles directament al CSS.

**`grid-template-areas`** — Propietat que defineix el layout nombrant les zones. Proporciona una visualització visual de l'estructura directament al CSS. Permet reordenar visualment sense canviar el DOM (benefici per a accessibilitat).

**HTML Semàntic** — Ús dels elements HTML que descriuen correctament el propòsit del contingut: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`. Millora l'accessibilitat, el SEO i la llegibilitat del codi.

**Heurístiques de Nielsen** — Les deu regles generals d'usabilitat estàndard de la indústria per avaluar interfícies. Les més relacionades amb la maquetació: visibilitat de l'estat del sistema, consistència, prevenció d'errors, focus visible i feedback del sistema.

**`justify-content`** — Propietat Flexbox/Grid que alinea els elements al llarg de l'eix principal. Valors principals: `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly`.

**`justify-items`** — Propietat Grid que alinea els elements fills horitzontalment dins de les seves cel·les. Valors: `stretch` (per defecte), `start`, `end`, `center`.

**Landmark** — Regió de la pàgina identificada semànticament que els lectors de pantalla usen per a la navegació ràpida. Els landmarks natius inclouen `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` i `<form>` (amb nom accessible).

**`light-dark(clar, fosc)`** — Funció CSS moderna que selecciona automàticament un dels dos valors basant-se en l'esquema de colors actiu. Requereix `color-scheme: light dark` a `:root`. Simplifica la implementació de temes.

**Live Region** — Àrea de la pàgina que s'actualitza dinàmicament i que el lector de pantalla ha d'anunciar automàticament. Es defineix amb `aria-live="polite"` o `role="alert"`.

**`margin-inline: auto`** — Manera moderna de centrar un element horitzontalment dins del seu contenidor. Equivalent modern de `margin: 0 auto` però compatible amb modes d'escriptura RTL.

**`max-width`** — En media queries, s'aplica quan el viewport és MENOR que el valor especificat. Característica del desktop-first: `@media (max-width: 768px)`.

**`min-width`** — En media queries, s'aplica quan el viewport és MAJOR que el valor especificat. Característica del mobile-first: `@media (min-width: 768px)`.

**`minmax(mínim, màxim)`** — Funció Grid que defineix un rang de mida per a les columnes o files. `minmax(200px, 1fr)` significa "mínim 200px, màxim 1fr". Essencial per a graelles responsives sense media queries.

**Mobile-first** — Enfocament de maquetació on els estils base s'escriuen per a pantalla petita i s'usen `min-width` media queries per a pantalles grans. Genera menys codi, millor rendiment en mòbil i és el recomanat per la indústria.

**Normalize.css** — Alternativa al CSS Reset que harmonitza les inconsistències entre navegadors sense eliminar els estils útils. Conserva els estils per defecte dels formularis i el focus visible.  
**`object-fit`** — Propietat CSS que controla com una imatge o vídeo s'ajusta dins del seu contenidor. `cover` omple el contenidor retallant si cal. `contain` mostra tota la imatge sense retallar.

**`order`** — Propietat Flexbox/Grid que canvia l'ordre visual d'un element. ⚠️ Canvia únicament l'ordre visual, no l'ordre del DOM: el teclat i els lectors de pantalla segueixen l'ordre del codi font.

**`place-items`** — Shorthand que combina `align-items` i `justify-items` en una sola declaració. `place-items: center` és la manera més ràpida de centrar en totes dues dimensions.

**`prefers-color-scheme`** — Media query CSS que detecta si l'usuari prefereix un tema clar o fosc a partir de la configuració del sistema operatiu. S'usa per aplicar automàticament el tema fosc.

**`prefers-reduced-motion`** — Media query CSS que detecta si l'usuari ha activat la preferència de reduir el moviment a causa de sensibilitat vestibular. Cal desactivar o reduir animacions quan és `reduce`.

**`rem`** — Unitat CSS relativa a la mida de lletra de l'element arrel (`<html>`). Per defecte `1rem = 16px`. S'usa per a breakpoints i tipografia perquè respecta les preferències d'accessibilitat de mida de lletra de l'usuari.

**`repeat(auto-fill, minmax())`** — Combinació de funcions Grid que crea automàticament tantes columnes com càpiguen al contenidor, sense necessitat de media queries. La solució moderna per a graelles de targetes responsives.

**`role="alert"`** — Rol ARIA que transforma un element en una live region assertiva. El contingut s'anuncia immediatament quan apareix. Usat per a missatges d'error de formularis.

**`role="group"`** — Rol ARIA equivalent funcional de `<fieldset>` per a grups de controls de text. Es combina amb `aria-labelledby` per identificar el grup als lectors de pantalla.

**Selector `:is()`** — Pseudo-classe CSS que agrupa selectors en una sola regla. Eleva l'especificitat al selector més alt de la llista. Simplifica CSS llarg: `:is(h1, h2, h3) { }`.

**Selector `:has()`** — Pseudo-classe CSS que permet seleccionar un element en funció dels seus fills. El "selector pare" que el CSS no tenia: `.card:has(img)` selecciona targetes que contenen imatge.

**Selector `:where()`** — Com `:is()` però amb especificitat zero. Permet agrupar selectors sense incrementar l'especificitat, facilitant que regles posteriors els sobreescriguin.

**`tabindex="0"`** — Afegeix un element a l'ordre natural de tabulació del teclat. S'usa per a elements interactius personalitzats que no reben focus per defecte (com divs que fan de botó).

**`tabindex="-1"`** — Elimina un element de l'ordre de tabulació però permet rebre focus programàticament via JavaScript. S'usa per a la gestió de focus en modals i components compostos.

**Token primitiu** — Nivell base dels design tokens: tots els valors possibles del sistema sense context d'ús. `--blue-600: #2563EB`. Mai s'usa directament al codi de components.

**Token semàntic** — Segon nivell dels design tokens: noms que descriuen el propòsit, apuntant als primitius. `--color-primary: var(--blue-600)`. S'usa arreu del codi. Canviar el tema \= canviar els tokens semàntics.

**Unitat `fr`** — Fracció de l'espai lliure disponible en un Grid. `1fr 2fr` significa que el segon element és el doble que el primer. L'espai es calcula després d'elements no flexibles.

**WCAG** — Web Content Accessibility Guidelines. Estàndard internacional d'accessibilitat web. Level AA és el target per a la majoria de projectes professionals: contrast mínim 4.5:1 per a text normal, teclat per a tot, text redimensionable fins al 200%.

**WAI-ARIA** — Web Accessibility Initiative — Accessible Rich Internet Applications. Conjunt d'atributs HTML (roles, propietats i estats) per millorar l'accessibilitat quan l'HTML natiu no és suficient. Regla número 1: usa sempre l'element HTML natiu si existeix.

**`vw`** — Unitat CSS equivalent a l'1% de l'amplada del viewport. S'usa per a tipografia fluid amb `clamp()`. Limitació: no respon a l'amplada del contenidor, sinó a la pantalla completa. Substituïda per `cqi` per a components en contextos variables.  
