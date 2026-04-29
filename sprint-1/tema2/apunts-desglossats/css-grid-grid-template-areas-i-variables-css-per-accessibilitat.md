## **CSS Grid, `grid-template-areas` i Variables CSS per a l'Accessibilitat**

**El problema dels mètodes tradicionals de layout**

CSS Grid és el primer mòdul CSS creat específicament per resoldre els problemes de layout. Primer vam usar taules, després floats, positioning i inline-block, però tots aquests mètodes eren essencialment hacks i deixaven fora funcionalitats importants. CSS Flexbox és una eina de layout molt bona però el seu flux unidireccional té casos d'ús diferents.

Els floats i el positioning absolut tenien un problema greu d'accessibilitat: **l'ordre visual i l'ordre del DOM estaven fortament acoblats**. Si volies un sidebar a l'esquerra visualment però el contingut principal abans en el DOM (per SEO i lectors de pantalla), havies de fer malabarismes amb marges negatius, clearfix i hacks de tot tipus.

"Source order independence" és un dels avantatges més grans de CSS Grid. Significa que ja no has de definir l'estructura de layout en HTML, cosa que sempre havia estat el cas amb floats i layouts basats en taules. Pots canviar la presentació visual del teu fitxer HTML usant les propietats d'ordering i de col·locació de Grid.

**`grid-template-areas`: el layout que s'explica sol**

`grid-template-areas` és la propietat de Grid que permet nombrar les zones del layout en el CSS amb una sintaxi visual que s'assembla al disseny real:

| .layout {  display: grid;  grid-template-columns: 250px 1fr;  grid-template-rows: auto 1fr auto;  grid-template-areas:    "header  header"    "sidebar content"    "footer  footer";}header  { grid-area: header; }aside   { grid-area: sidebar; }main    { grid-area: content; }footer  { grid-area: footer; } |
| :---- |

El CSS és llegible fins i tot sense veure el resultat: pots veure el layout directament en el codi. I la clau per a l'accessibilitat: **l'HTML pot estar en l'ordre lògic correcte** (header, main, aside, footer) mentre el CSS decideix on apareix visualment cada element.

**El benefici real per als lectors de pantalla**

Si reordenes coses visualment usant grid layout, no canviarà com els elements estan ordenats si el contingut és llegit per un lector de pantalla o un altre agent de veu. A més, la reordenació no canviarà l'ordre de tabulació. Això significa que algú navegant amb teclat podria estar tabulant pels enllaços del lloc i de sobte trobar-se saltant de la part superior a la part inferior del document a causa d'un element reordenat que és el següent en línia.

Amb `grid-template-areas` usada correctament, pots tenir:

| \<\!-- Ordre lògic al DOM: correcte per a lectors de pantalla i SEO \--\>\<div class="layout"\>  \<header\>Capçalera\</header\>  \<main\>Contingut principal\</main\>  \<\!-- Primer al DOM\! \--\>  \<aside\>Sidebar\</aside\>  \<footer\>Peu de pàgina\</footer\>\</div\> |
| :---- |

| /\* Grid col·loca el sidebar a l'esquerra visualment   sense afectar l'ordre del DOM \*/.layout {  display: grid;  grid-template-areas:    "header  header"    "sidebar main"    /\* Sidebar visual a l'esquerra \*/    "footer  footer";} |
| :---- |

El lector de pantalla llegirà: capçalera → contingut principal → sidebar → peu. L'ordre visual per a l'usuari amb visió: capçalera → sidebar (esquerra) \+ contingut (dreta) → peu. Tots dos correctes.

**Quan Grid pot crear problemes d'accessibilitat**

La propietat `order` i la col·locació de grid no afecten l'ordenació en mitjans no visuals com la parla. Igualment, reordenar elements de grid visualment no afecta l'ordre de traversal per defecte dels modes de navegació seqüencial com el ciclat pels enllaços. L'especificació adverteix als autors que no facin aquesta reordenació. Els autors han d'usar `order` i les propietats de col·locació de grid únicament per a reordenació visual, no lògica.

Les propietats que poden trencar l'accessibilitat si s'usen malament:

| /\* ⚠️ PERILL: grid-auto-flow: dense reordena visualment   de manera imprevisible \*/.galeria {  grid-auto-flow: dense; /\* Pot causar desconnexió visual/DOM \*/}/\* ⚠️ PERILL: order canvia l'ordre visual però no el del DOM \*/.sidebar { order: \-1; } /\* Sembla primer visualment, però no ho és al DOM \*/ |
| :---- |

La regla: si canvies l'ordre visual amb Grid, el DOM ha de reflectir el mateix ordre lògic. Si no pot ser, no usis les propietats de reordenació.

**Variables CSS \+ `clamp()` per a l'espaiat: accessibilitat i fluid design**

La funció `clamp(mínim, preferit, màxim)` permet definir valors que s'adapten al viewport sense media queries, sempre dins d'uns límits. Combinada amb variables CSS, crea un sistema d'espaiat fluid i consistent:

| :root {  /\* Espaiat fluid: creix proporcionalment amb la pantalla     però mai surt dels límits definits \*/  \--gap-sm:   clamp(0.5rem, 2vw, 1rem);     /\* 8px → 16px \*/  \--gap-md:   clamp(1rem,   3vw, 2rem);     /\* 16px → 32px \*/  \--gap-lg:   clamp(1.5rem, 5vw, 3rem);     /\* 24px → 48px \*/  \--gap-xl:   clamp(2rem,   8vw, 5rem);     /\* 32px → 80px \*/  /\* Mida de contingut \*/  \--max-width: clamp(20rem, 90%, 75rem);    /\* mínim 320px, màxim 1200px \*/} |
| :---- |

Per a l'accessibilitat, `clamp()` és important perquè:

**Respecta les preferències de l'usuari** — si l'usuari augmenta la mida de lletra del navegador, els valors en `rem` escalen proporcionalment. Amb `px` fixos no passaria.

**Evita el contingut massa compacte en mòbil** — el valor mínim de `clamp()` garanteix que mai hi haurà menys de `0.5rem` d'espai entre elements, evitant que les zones clicables siguin massa petites.

**Evita espais excessius en pantalles grans** — el valor màxim de `clamp()` garanteix que els espais no creixin indefinidament en ultra-wide monitors.

**L'exemple complet: layout accessible amb Grid \+ variables**

| \<\!-- HTML en ordre lògic: correcte per a lectors de pantalla \--\>\<div class="page-layout"\>  \<header class="site-header"\>    \<h1\>Títol del lloc\</h1\>    \<nav aria-label="Navegació principal"\>...\</nav\>  \</header\>  \<\!-- main PRIMER al DOM: prioritat de contingut per a lectors \--\>  \<main class="site-main" id="main-content"\>    \<h2\>Contingut principal\</h2\>    \<p\>...\</p\>  \</main\>  \<\!-- sidebar SEGON al DOM, visual a l'esquerra en desktop \--\>  \<aside class="site-sidebar" aria-labelledby="sidebar-title"\>    \<h2 id="sidebar-title"\>Contingut relacionat\</h2\>    \<nav aria-label="Navegació secundària"\>...\</nav\>  \</aside\>  \<footer class="site-footer"\>    \<p\>Peu de pàgina\</p\>  \</footer\>\</div\> |
| :---- |

**Comparació directa: floats vs. Grid per a accessibilitat**

| Aspecte | Floats / Position | CSS Grid |
| ----- | ----- | ----- |
| **Ordre DOM vs. visual** | Fortament acoblats | Desacoblats correctament |
| **Sidebar esquerra** | El sidebar ha d'anar primer al DOM | El `<main>` pot anar primer al DOM |
| **Espaiat consistent** | `margin` manual, difícil de mantenir | `gap` \+ variables CSS |
| **Clearfix** | Necessari i hackish | No existeix aquest problema |
| **Responsive** | Canviar el layout requereix canviar el DOM | Canviar el CSS és suficient |
| **Llegibilitat del CSS** | Difícil d'entendre | `grid-template-areas` s'explica sol |
| **Lectors de pantalla** | Depèn molt de l'ordre al DOM | Ordre DOM independent del visual |

Un layout de Grid hauria de significar que no necessitem canviar la font del nostre document per aconseguir el layout que volem. Per tant, el punt de partida de la teva pàgina hauria de ser un document font ben estructurat i accessible. Si en qualsevol moment del procés de disseny et trobes usant grid per relocalitzar la posició d'un element, considera si hauries de tornar al document i fer un canvi en l'ordre lògic.

Resumint: `grid-template-areas` és accessible quan el DOM ja té l'ordre lògic correcte i el CSS simplement decideix la disposició visual. El perill ve quan uses Grid per reordenar visualment sense considerar l'impacte en el teclat i els lectors de pantalla.