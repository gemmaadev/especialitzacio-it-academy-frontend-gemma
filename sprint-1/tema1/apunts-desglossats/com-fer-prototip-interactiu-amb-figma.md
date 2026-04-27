**Prototip Interactiu a Figma**

**Guide to prototyping**  
[https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma](https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma)  
Documentació de Figma per crear prototips interactius.

**Què és un prototip a Figma?**

Les funcionalitats de prototipat de Figma et permeten crear fluxos interactius que exploren com un usuari pot interactuar amb els teus dissenys. Els prototips són una manera fantàstica de previsualitzar interaccions i fluxos d'usuari, compartir i iterar sobre idees, obtenir feedback de col·laboradors, provar interaccions amb usuaris, i presentar els teus dissenys als stakeholders.

La diferència clau respecte al mockup és la **interactivitat**: el mockup és estàtic (es veu però no es pot clicar), mentre que el prototip simula com funciona l'aplicació real. Pots clicar botons, navegar entre pantalles i veure transicions.

**Els conceptes clau: el glossari**

Abans de crear el prototip, cal entendre el vocabulari que usa Figma:

Un **hotspot** és on té lloc la interacció. Pot ser qualsevol objecte dins del frame original, com un link, un botó, una imatge o una icona. Les **connexions** són les fletxes blaves o "fideus" que connecten el hotspot amb la destinació. Un **flux** és la xarxa de frames connectats que formen un camí a través d'un prototip. El **punt d'inici** és el primer frame d'un flux. El **trigger** determina quin tipus d'interacció amb el hotspot farà avançar el prototip (tap, clic, hover...). La **destinació** és on acaba la transició i ha de ser un frame de nivell superior. L'**acció** defineix el tipus de progressió (navegar a un altre frame, obrir una URL externa...). L'**animació** determina com el prototip passa d'un frame a l'altre.

**El flux de treball pas a pas**

**Pas 1: Prepara les teves pantalles**

Necessites tenir els frames dissenyats que representaran les pantalles de la teva aplicació. Cada frame és una pantalla: login, pantalla principal, detall de producte, etc. Tots han de ser frames de nivell superior (directament al canvas, no niuats dins d'altres frames).

**Pas 2: Activa la pestanya Prototype**

Clica a la pestanya "Prototype" al panell dret de Figma (al costat de "Design"). Pots alternar ràpidament entre les dues pestanyes amb la drecera `Shift + E`.

**Pas 3: Crea connexions entre frames**

Per crear una connexió: selecciona el hotspot (el botó o element que l'usuari clicarà), clica la icona de connexió que apareix, arrossega-la fins al frame de destinació. Si no hi ha connexions existents, Figma convertirà el primer frame en el punt d'inici automàticament.

Un cop creada la connexió, apareix una fletxa blava entre els dos frames al canvas. Pots crear connexions des de múltiples elements al mateix frame de destinació alhora seleccionant tots els hotspots i arrossegant la icona de connexió.

**Pas 4: Configura la interacció**

Quan selecciones una connexió, al panell dret apareixeran les opcions de configuració:

El **trigger** determina com s'activa la interacció: pot ser un clic (On click), un hover (While hovering), un drag, o fins i tot un delay automàtic. L'**acció** defineix el que passa: navegar a un frame, tornar enrere, obrir un overlay... L'**animació** controla com es fa la transició: Instant (sense animació), Dissolve (fade), Move In/Out (la pantalla entra des d'una direcció), o Push (la pantalla empeny l'anterior). La **durada** controla el temps de l'animació (entre 1ms i 10 segons). L'**easing** afecta l'acceleració de l'animació per fer-la més natural (Ease In, Ease Out, Ease In and Out...).

**Pas 5: Configura les opcions del prototip**

A la pestanya Prototype, a la part superior del panell dret, pots configurar:

El **dispositiu** que es mostrarà quan presentis el prototip (iPhone, Android, Desktop...). El **color de fons** darrere del dispositiu. El **frame d'inici** del flux.

**Pas 6: Previsualitza i comparteix**

Prem el botó ▶ (Play) a la barra superior per obrir el prototip en mode presentació. Pots previsualitzar-lo directament al navegador o compartir l'enllaç amb qualsevol persona, fins i tot sense compte de Figma.

**Fluxos múltiples: organitzar experiències complexes**

Amb el prototipat de Figma, pots crear múltiples fluxos per al teu prototip en una sola pàgina per previsualitzar el recorregut i l'experiència completa de l'usuari. Per exemple: el teu prototip cobreix totes les possibles interaccions en un lloc de comerç electrònic. Dins del prototip, tens fluxos per crear un compte, afegir elements al carret i fer el checkout.

Per afegir un punt d'inici addicional a un frame: selecciona el frame, fes clic dret i selecciona "Add starting point", o fes clic al `+` a la secció "Flow starting point" del panell dret.

**Interaccions avançades**

**Overlays** — els overlays són frames que apareixen per sobre de la pantalla actual. Pots usar-los per crear tooltips, menús interactius, alertes o confirmacions. Per exemple: un modal de confirmació d'eliminació o un menú desplegable.

**Smart Animate** — és la interacció més potent de Figma. Si dues pantalles consecutives tenen elements amb el mateix nom de capa, Smart Animate anima automàticament la transició entre ells creant un efecte de moviment fluid. Ideal per a animacions de llistes que s'expandeixen, cartes que s'obren, o elements que es mouen a una nova posició.

**Overflow / Scroll** — l'overflow behavior permet definir com el prototip respon al scroll. Permet crear interaccions d'usuari més avançades, com carousels, galeries o mapes interactius.

**Consells pràctics**

**Nomena bé els teus frames** — els noms dels frames apareixeran a la barra de títol del prototip i faciliten la navegació quan tens moltes pantalles.

**Comença pel flux principal** — construeix primer el happy path (el camí principal sense errors) i després afegeix els fluxos alternatius.

**Usa components per als elements interactius** — si tens un botó com a component, pots afegir la interacció al component principal i es propagarà a totes les instàncies.

**Prova el prototip en mòbil** — pots veure els prototips en un dispositiu mòbil instal·lant l'app de Figma Mirror. Això és especialment útil per provar que les zones tàctils són prou grans i que els gestos funcionen correctament.

**Resum del flux complet**  
1\. Dissenya les pantalles com a frames al canvas  
2\. Activa la pestanya "Prototype" (Shift \+ E)  
3\. Selecciona un hotspot (botó, element clicable)  
4\. Arrossega la connexió al frame de destinació  
5\. Configura trigger, acció i animació  
6\. Repeteix per a totes les interaccions  
7\. Configura el dispositiu i el frame d'inici  
8\. Prem ▶ per previsualitzar  
9\. Comparteix l'enllaç per a feedback

**Glossari de termes del prototip**

| Terme | Significat |
| ----- | ----- |
| **Hotspot** | L'element clicable que inicia la interacció |
| **Connexió** | La fletxa blava entre dos frames |
| **Flux** | La seqüència de frames connectats |
| **Trigger** | Què activa la interacció (clic, hover...) |
| **Acció** | Què passa (navegar, obrir overlay...) |
| **Animació** | Com es fa la transició visual |
| **Smart Animate** | Animació automàtica entre elements iguals |
| **Overlay** | Frame que apareix per sobre de la pantalla actual |
| **Overflow** | Comportament del scroll |

