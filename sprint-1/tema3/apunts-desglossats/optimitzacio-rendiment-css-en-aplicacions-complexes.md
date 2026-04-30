## **Optimització del rendiment CSS en aplicacions complexes**

**Modern CSS Solutions**  
[https://moderncss.dev/](https://moderncss.dev/)  
Exemples per resoldre problemes comuns amb CSS modern.

**Styled Components Best Practices**  
[https://www.smashingmagazine.com/2020/07/styled-components-react/](https://www.smashingmagazine.com/2020/07/styled-components-react/)  
Bones pràctiques per estilitzar components en React.

**Per què el CSS afecta el rendiment?**

El Critical Rendering Path és la seqüència de passos que el navegador segueix per convertir l'HTML, el CSS i el JavaScript en píxels a la pantalla. El navegador crea el DOM a partir de l'HTML. Después crea el CSSOM (CSS Object Model) a partir del CSS. A continuació combina els dos per crear el Render Tree. Finalment calcula el layout i pinta els píxels.

El problema clau és que el CSS és **render-blocking** per defecte: el navegador assumeix que cada full d'estils especificat bloqueja el renderitzat. Fins que el navegador no ha descarregat i processat tot el CSS, no pot pintar res a la pantalla. Mostrar als usuaris una pàgina sense estils i repintar-la després que el CSS s'hagi analitzat seria una mala experiència d'usuari.

**1\. Critical CSS: mostrar contingut abans**

El Critical CSS és el mínim CSS necessari per renderitzar el contingut visible sense fer scroll (above-the-fold). La tècnica és: s'extreu el CSS crític, s'inclou inline al `<head>` i la resta es carrega de manera no bloquejant.

Identifica el CSS crític usant eines o eines de build per extreure el CSS necessari per al viewport inicial. Col·loca el CSS extret dins de tags `<style>` al `<head>` del HTML. Carrega la resta de manera no bloquejant usant tècniques com `<link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">`.

| \<head\>  \<\!-- CSS crític inline: es carrega immediament \--\>  \<style\>    body { font-family: 'Inter', sans-serif; margin: 0; }    .header { background: \#1e293b; color: white; padding: 1rem; }    .hero { min-height: 60vh; display: flex; align-items: center; }  \</style\>  \<\!-- Resta del CSS: carregat asíncronament (no bloqueja) \--\>  \<link    rel="preload"    href="styles.css"    as="style"    onload="this.onload=null;this.rel='stylesheet'"  /\>  \<noscript\>    \<link rel="stylesheet" href="styles.css"\>  \</noscript\>\</head\> |
| :---- |

Eines per generar Critical CSS automàticament: **Critical** (npm), **Critters** (usada per Angular i Next.js), o **PurgeCSS** combinada amb configuració de Vite/Webpack.

**2\. Eliminar CSS mort (Unused CSS)**

Amb el temps, els llocs web poden acumular CSS que ja no s'usa. Aquest codi mort afegeix pes innecessari als fulls d'estils. Usar l'eina de "Coverage" de Chrome DevTools o PurgeCSS per identificar i eliminar CSS no usat redueix la mida del fitxer i el temps de processament del navegador.

**Com detectar CSS no usat:**

1. Obre Chrome DevTools → `Ctrl+Shift+P` → escriu "Coverage"  
2. Prem el botó de gravació i navega per la pàgina  
3. El panell mostra en vermell el CSS que no s'ha aplicat

**PurgeCSS** analitza tots els fitxers HTML i JavaScript del projecte i elimina les classes CSS que no hi apareixen:

| // vite.config.jsimport { defineConfig } from 'vite'// PurgeCSS s'integra via plugin per a Vite |
| :---- |

**Tailwind** ja fa això automàticament en el build de producció: genera únicament el CSS de les classes que realment uses.

**3\. Minificació i compressió**

La minificació implica eliminar tot l'espai en blanc del fitxer que només existeix per a la llegibilitat humana, un cop el codi va a producció. Pots reduir els temps de càrrega considerablement minificant el CSS. La minificació generalment es fa com a part del procés de build (per exemple, la majoria de frameworks JavaScript minifiquen el codi quan crees un projecte per a desplegament).

La compressió **Gzip** o **Brotli** al servidor redueix encara més la mida. Un fitxer CSS de 100KB pot quedar en 20KB amb Brotli. Vite i la majoria de plataformes de hosting modernes (Vercel, Netlify) ho apliquen automàticament.

**4\. Selectors eficients**

En termes de rendiment dels selectors, els selectors menys específics són més ràpids que els més específics. Per exemple, `.foo {}` és més ràpid que `.bar .foo {}` perquè quan el navegador troba `.foo`, en el segon escenari, ha de pujar pel DOM per comprovar si `.foo` té un ancestre `.bar`. No obstant, si mesures el temps que triga a analitzar el CSS, t'asombraràs de la rapidesa dels navegadors. Mesura primer. Optimitza si cal. L'especificitat probablement no és el fruit més fàcil d'agafar.

Les optimitzacions que sí que valen la pena:

| /\* ❌ Selector complex i lent \*/div.wrapper \> ul.nav-list li.nav-item a.nav-link:hover { }/\* ✅ Classe simple i directa \*/.nav-link:hover { }/\* ❌ Selector universal innecessari \*/\* { box-sizing: border-box; }/\* ✅ Millor: aplicat a elements concrets \*/\*, \*::before, \*::after { box-sizing: border-box; } |
| :---- |

Evita el selector universal (`*`) i els selectors descendents quan sigui possible, ja que poden ser costosos en rendiment. Prefereix selectors de classe: són generalment més ràpids per al navegador que els selectors d'atribut o de pseudo-classe complexos.

**5\. CSS Containment: aïllar parts de la pàgina**

La propietat `contain` indica al navegador que un element és independent del resto, permetent-li optimitzar el rendering:

El CSS `will-change` permet avisar com es canviarà o animarà un element perquè el navegador pugui fer optimitzacions per endavant. Hauria d'usar-se únicament com a últim recurs per solucionar problemes de rendiment coneguts. No l'hauries d'aplicar a massa elements.

| /\* contain: diu al navegador que aquest element és independent \*/.card {  contain: layout style;   /\* el layout intern no afecta l'exterior \*/}/\* content-visibility: salta el rendering de contingut fora del viewport \*/.section--below-fold {  content-visibility: auto;  contain-intrinsic-size: 0 500px;  /\* alçada estimada per evitar layout shifts \*/}/\* will-change: únicament per a animacions conegudes \*/.animated-element {  will-change: transform;  /\* prepara el navegador per a l'animació \*/} |
| :---- |

`content-visibility: auto` és especialment potent: el navegador salta completament el renderitzat dels elements que no són visibles al viewport, cosa que pot millorar el temps de càrrega inicial fins a un 40% en pàgines llargues.

**6\. Evitar propietats CSS costoses**

Algunes propietats CSS requereixen molt més treball de renderitzat que altres:

| /\* ⚠️ Propietats costoses: causen repaint o reflow \*/.expensive {  box-shadow: 0 10px 30px rgba(0,0,0,0.3);  /\* costós, usar amb moderació \*/  filter: blur(10px);                         /\* molt costós \*/  backdrop-filter: blur(5px);                 /\* molt costós \*/}/\* ✅ Propietats barates: composited layers, no causen reflow \*/.cheap-animation {  transform: translateX(100px);  /\* accelerada per GPU, no causa reflow \*/  opacity: 0.5;                  /\* accelerada per GPU, no causa reflow \*/}/\* ❌ Mai animes propietats que causen reflow \*/.bad-animation {  transition: width 0.3s;     /\* causa reflow en cada frame \*/  transition: height 0.3s;    /\* causa reflow en cada frame \*/  transition: top 0.3s;       /\* causa reflow en cada frame \*/} |
| :---- |

La regla: anima únicament `transform` i `opacity`. Tot allò que canvia mides, posicions o flow del document (`width`, `height`, `margin`, `padding`, `top`, `left`) causa un **reflow** que és molt més costós.

**7\. Fonts web: carregar-les eficientment**

Usar `rel="preconnect"` per fer una connexió primerenca amb el proveïdor de fonts. Si saps que usaràs un conjunt específic de glifs, pots limitar el nombre de glifs que el navegador ha de descarregar creant un fitxer de font que únicament conté el subconjunt requerit. El descriptor `unicode-range` de `@font-face` permet especificar quan s'usa la font de subconjunt.

| \<\!-- Preconnect: estableix la connexió abans que calgui \--\>\<link rel="preconnect" href="https://fonts.googleapis.com"\>\<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin\>\<\!-- Preload: descarrega la font crítica amb alta prioritat \--\>\<link rel="preload" href="/fonts/inter-regular.woff2" as="font" type="font/woff2" crossorigin\> |
| :---- |

| /\* font-display: swap → mostra el text amb font del sistema mentre carrega \*/@font-face {  font-family: 'Inter';  src: url('/fonts/inter-regular.woff2') format('woff2');  font-display: swap;   /\* evita FOIT (Flash of Invisible Text) \*/} |
| :---- |

**8\. No usar `@import` per carregar CSS**

Usar la regla `@import` en CSS permet importar un fitxer CSS extern en un script CSS. A primera vista pot semblar una manera efectiva de carregar components i fonts més petits. No obstant, bloqueja el renderitzat i redueix la velocitat de la pàgina carregant cada fitxer extern importat separadament en lloc de carregar-lo en paral·lel amb tots els altres fitxers necessaris per renderitzar la pàgina. Crea també peticions HTTP innecessàries. En lloc d'això, pots usar múltiples tags `<link>` dins de l'HTML, que és més eficient i carrega els fitxers CSS en paral·lel.

| \<\!-- ❌ Evitar: @import és seqüencial, bloqueja el renderitzat \--\>\<style\>  @import url('base.css');  @import url('components.css');  @import url('layout.css');\</style\>\<\!-- ✅ Millor: múltiples \<link\> es carreguen en paral·lel \--\>\<link rel="stylesheet" href="base.css"\>\<link rel="stylesheet" href="components.css"\>\<link rel="stylesheet" href="layout.css"\> |
| :---- |

**Eines per mesurar i auditar**

* **Chrome DevTools Coverage** — detecta CSS no usat en temps real mentre navegues per la pàgina.  
* **Lighthouse** — genera una auditoria completa de rendiment, accessibilitat i SEO. Inclou recomanacions específiques de CSS com "Reduce unused CSS" o "Eliminate render-blocking resources".  
* **WebPageTest** — analitza el rendiment real des de múltiples ubicacions i dispositius, mostrant exactament com es carrega cada recurs CSS.

**Resum** 

| Optimització | Impacte | Complexitat |
| ----- | ----- | ----- |
| Eliminar CSS mort (PurgeCSS) | Alt | Baixa (automatitzable) |
| Minificació \+ compressió | Alt | Molt baixa (build automàtic) |
| Critical CSS inline | Alt | Mitjana |
| `content-visibility: auto` | Mitjà-alt | Baixa |
| Evitar `@import` | Mitjà | Molt baixa |
| Animar únicament `transform/opacity` | Mitjà | Baixa |
| Selectors simples | Baix | Baixa |
| `will-change` per a animacions | Baix | Baixa |

