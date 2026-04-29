## **CSS Reset vs. Normalize.css**

**El problema de base: els navegadors no s'alineen**

Quan un navegador renderitza una pàgina HTML sense cap CSS, aplica els seus propis **estils per defecte** (user agent stylesheet). El problema és que cada navegador (Chrome, Firefox, Safari, Edge) té una versió lleugerament diferent d'aquests estils per defecte. Cada navegador té la seva pròpia opinió sobre quins han de ser els valors per defecte. En la pràctica, els navegadors moderns s'assemblen en un 99%, però el 1% de diferències pot conduir a sorpreses frustrants.

Exemples concrets de diferències: el `<body>` té un `margin: 8px` a Chrome que Firefox no té, els `<h1>` dins d'un `<article>` es renderitzen diferent segons el navegador, els inputs i botons hereten la font del document en alguns navegadors i en d'altres no.

**CSS Reset: la pissarra en blanc**

CSS Reset és la tècnica nuclear: elimina marges, paddings i estils de text de tota mena. Els elements HTML perden completament la seva diferenciació visual: el `<p>` ja no sembla un paràgraf, el `<h1>` ja no sembla una capçalera, el `<ul>` ja no és una llista amb punts.

El CSS Reset més famós és el d'Eric Meyer. La versió mínima que trobaràs molt freqüentment és:

| /\* CSS Reset mínim \*/\* {  margin: 0;  padding: 0;  box-sizing: border-box;}La versión completa d'Eric Meyer reseteja explícitament cada element HTML:html, body, div, span, h1, h2, h3, h4, h5, h6,p, blockquote, pre, a, em, strong, ul, ol, li,form, input, button, textarea, table, thead, tbody, tr, th, td {  margin: 0;  padding: 0;  border: 0;  font-size: 100%;  font: inherit;  vertical-align: baseline;} |
| :---- |

Les pàgines HTML estilades amb un reset ja no són molt llegibles ni accessibles; ara recau sobre el developer la responsabilitat d'implementar un disseny per afegir de nou aquelles capacitats. Aquest enfocament és bastant sever, però té els seus avantatges perquè elimina el problema del "whack-a-mole" del CSS. Converteix el web en una pissarra en blanc, de manera que el CSS que escrius és ara purament additiu.

**Normalize.css: arreglar sense eliminar**

Normalize.css és una alternativa menys extrema per fer els valors per defecte del navegador consistents. Proporciona consistència entre navegadors sense perdre completament els estils per defecte i treballant amb els estàndards CSS moderns.

Normalize.css intenta fer que els estils integrats del navegador siguin consistents entre navegadors. Elements com h1-h6 apareixeran en negreta, més grans i de manera consistent en tots els navegadors. Llavors tu afegeixes només la diferència en la decoració que el teu disseny necessita.

Normalize.css fa coses com: corregir el comportament estrany de `-webkit-text-size-adjust` a iOS, assegurar que els inputs i botons hereten la font del document, normalitzar l'aparença de la llista, corregir inconsistències en elements com `<sub>`, `<sup>`, `<abbr>`, i aplicar `box-sizing: border-box` globalment.

**La diferència fonamental en una taula**

|  | CSS Reset | Normalize.css |
| ----- | ----- | ----- |
| **Enfocament** | Elimina tots els estils | Normalitza les inconsistències |
| **Resultat inicial** | Pissarra en blanc total | Base consistent i llegible |
| **Accessibilitat** | La perds (has de reconstruir-la) | La manté |
| **Feina addicional** | Molta: cal redefinir-ho tot | Poca: ja té defaults útils |
| **Llegibilitat sense CSS** | Cap (tot igual) | Acceptable |
| **Control** | Total | Alt |
| **Creat per** | Eric Meyer | Nicolas Gallagher |

**L'opció moderna: un híbrid**

La idea és que vols les correccions de bugs i la solució de rareses del navegador que típicament formen part d'un fitxer normalize, més la pissarra neta de zero marges que és la feina d'un reset. Junts proporcionen la tela en blanc que els developers volen, i sense sorpreses del navegador. A diferència d'un reset pur, aquests fitxers híbrids sovint afegeixen alguns valors per defecte propis, com `box-sizing: border-box` o `img { max-width: 100% }` per fer les imatges més responsives.

Un exemple de reset modern i mínim que combina els dos enfocaments:

| /\* Reset modern mínim (enfocament híbrid) \*/\*, \*::before, \*::after {  box-sizing: border-box;  margin: 0;  padding: 0;}body {  min-height: 100vh;  line-height: 1.5;  \-webkit-font-smoothing: antialiased;}img, picture, video, canvas, svg {  display: block;  max-width: 100%;}input, button, textarea, select {  font: inherit;}h1, h2, h3, h4, h5, h6 {  overflow-wrap: break-word;} |
| :---- |

**Quina opció triaria per a un projecte nou?**

Per a la majoria de projectes nous, l'opció recomanada és el **reset modern mínim (híbrid)**. La raó és senzilla: els navegadors moderns ja s'assemblen molt entre si, de manera que no necessites la potència completa de Normalize.css. Però sí que vols eliminar el `margin: 8px` del body, aplicar `box-sizing: border-box` a tot (que fa que el CSS de layout sigui molt més intuïtiu) i assegurar que les imatges no surtin del seu contenidor.

Si uses un framework com **Tailwind CSS**, no cal fer res: ja inclou el seu propi reset (Preflight) que fa tota aquesta feina automàticament. Si uses **Material UI** o un altre sistema de components, tampoc cal: el sistema ja ho gestiona.

En termes d'un reset, la majoria dels resets disponibles fan massa. En terms de normalitzar, la recomanació és usar una biblioteca concisa i ben testada com `modern-normalize`. Per a un projecte React o Vite des de zero, la millor opció és un reset mínim de 10-15 línies escrit per tu o copiat de fonts com Josh W. Comeau's CSS Reset, que és modern, breu i molt ben raonat.

