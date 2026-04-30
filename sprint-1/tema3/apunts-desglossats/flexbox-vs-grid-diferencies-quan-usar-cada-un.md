## **Flexbox vs. Grid: diferències i quan usar cada un**

**CSS Grid vs Flexbox**  
[https://css-tricks.com/css-grid-replace-flexbox/](https://css-tricks.com/css-grid-replace-flexbox/)  
Comparativa pràctica entre CSS Grid i Flexbox.

**CSS Grid Layout Guide**  
[https://css-tricks.com/complete-guide-css-grid-layout/](https://css-tricks.com/complete-guide-css-grid-layout/)  
Referència completa per utilitzar CSS Grid en projectes web.

**La pregunta fonamental: Grid substitueix Flexbox?**

No. Bé. Majoritàriament no. Grid pot fer coses que Flexbox no pot fer. Flexbox pot fer coses que Grid no pot fer. I poden treballar junts: un element de grid pot ser un contenidor flex, i un element flex pot ser un contenidor grid.

La diferència essencial la va expressar Rachel Andrew de manera molt clara: Flexbox és essencialment per a la disposició d'elements en una sola dimensió, en una fila O en una columna. Grid és per a la disposició d'elements en dues dimensions: files I columnes.

**La diferència clau: 1D vs. 2D**

**Flexbox** — pensa en una sola línia. Els elements flueixen en una direcció: horitzontal (flex-direction: row) o vertical (flex-direction: column). Pots permetre que s'ajustin en múltiples línies amb flex-wrap, però cada línia és independent de les altres. L'espai es distribueix fila per fila, no hi ha consciència de les columnes d'altres files.

**Grid** — pensa en una graella. Defineix alhora files i columnes i els elements s'ubiquen en cel·les concretes d'aquesta graella. Pot controlar la relació entre files i columnes simultàniament.

| /\* Flexbox: els elements flueixen en una fila \*/.nav {  display: flex;  justify-content: space-between;  align-items: center;  gap: 1rem;}/\* Grid: defineix files I columnes alhora \*/.page {  display: grid;  grid-template-columns: 250px 1fr;  grid-template-rows: auto 1fr auto;  grid-template-areas:    "sidebar header"    "sidebar main"    "sidebar footer";} |
| :---- |

**Quan és millor Grid que Flexbox**

Grid és específicament millor que Flexbox per a: fer layouts de pàgines senceres (és millor fins i tot considerant raons de rendiment de layout), fer graelles literals com X columnes amb Y separació entre elles, i requerir menys intervenció de media queries gràcies a funcionalitats com auto-fill, minmax() i repeat().

**Layout de pàgina completa** — quan necessites col·locar header, sidebar, main i footer en una estructura bidimensional, Grid és l'eina adequada. Pots definir tota l'estructura en un sol contenidor i cada element sap exactament on va.

**Graelles de targetes** — quan vols que les targetes s'alineïn tant horitzontalment com verticalment (que les files tinguin la mateixa alçada), Grid ho fa de manera nativa. Flexbox amb flex-wrap no garanteix l'alineació entre files.

**Layouts on l'estructura ve del contenidor** — Grid és contenidor-cèntric: el contenidor defineix l'estructura i els fills simplement s'hi col·loquen. Molt útil quan vols que el layout sigui predictible independentment del contingut.

**Quan és millor Flexbox que Grid**

Flexbox brilla quan el layout és inherentment lineal o quan el tamany dels elements ha de dependre del seu contingut:

**Navegació horitzontal** — elements en una fila que s'adapten al seu contingut. justify-content: space-between distribueix l'espai de manera molt intuïtiva.

**Alineació d'elements dins d'un component** — centrar un botó, alinear una icona amb text, distribuir elements d'una targeta verticalment. Flexbox és molt més natural per a això.

**Quan l'ordre dels elements ha de ser flexible** — flex-grow, flex-shrink i flex-basis permeten que els elements creixin i s'encongeiixin de manera proporcional, cosa que Grid no fa de manera tan fluida.

**Llistes i components d'una sola dimensió** — barres de navegació, grups de botons, breadcrumbs, tags... Tot el que és "una fila d'elements" és territori Flexbox.

| /\* ✅ Flexbox: navegació, alineació, components lineals \*/.navbar {  display: flex;  align-items: center;  justify-content: space-between;  gap: 1rem;}.card-footer {  display: flex;  justify-content: space-between;  align-items: center;}/\* ✅ Grid: layouts de pàgina, graelles, estructura bidimensional \*/.app-layout {  display: grid;  grid-template-columns: 240px 1fr;  grid-template-rows: 64px 1fr auto;  min-height: 100vh;}.card-grid {  display: grid;  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));  gap: 1.5rem;} |
| :---- |

**La zona grisa: quan tots dos serveixen**

Hi ha casos on tots dos funcionen, i la decisió depèn de la preferència i el context:

**Centrar un element** — display: flex; justify-content: center; align-items: center i display: grid; place-items: center fan exactament el mateix. Grid és lleugerament més concís.

**Columnes iguals** — Flexbox amb flex: 1 i Grid amb grid-template-columns: 1fr 1fr produeixen resultats similars. La diferència és que Grid alinea les files entre columnes i Flexbox no.

**Layout responsive simple** — tots dos suporten layouts d'una columna en mòbil i múltiples columnes en desktop, però Grid ho expressa de manera més declarativa.

**La combinació: Grid \+ Flexbox junts**

Un element de grid pot ser un contenidor flex, i un element flex pot ser un contenidor grid. Tots dos treballen molt bé conjuntament.

El patró més habitual és usar Grid per a l'estructura macro de la pàgina i Flexbox per als components interns:

| /\* Grid defineix l'estructura de la pàgina \*/.page {  display: grid;  grid-template-areas:    "header"    "main"    "footer";}/\* Flexbox s'usa dins de la capçalera \*/header {  grid-area: header;  display: flex;          /\* ← Flexbox dins d'un grid item \*/  align-items: center;  justify-content: space-between;}/\* Grid s'usa dins del main per a la graella de contingut \*/main {  grid-area: main;  display: grid;          /\* ← Grid dins d'un grid item \*/  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));  gap: 1rem;}/\* Flexbox per a l'interior de cada targeta \*/.card {  display: flex;          /\* ← Flexbox dins d'un grid item \*/  flex-direction: column;}.card-footer {  margin-top: auto;       /\* empeny el footer al fons \*/} |
| :---- |

**Resum:** 

| Situació | Eina |
| ----- | ----- |
| Layout de pàgina completa | Grid |
| Graella de targetes o ítems | Grid |
| Navbar / menú horitzontal | Flexbox |
| Centrar un element | Tots dos (place-items vs. justify-content \+ align-items) |
| Alineació icona \+ text | Flexbox |
| Columnes de mida igual | Tots dos (Grid és més explícit) |
| Elements que creixen/encongeixen | Flexbox (flex-grow, flex-shrink) |
| Responsive sense media queries | Grid (auto-fill \+ minmax) |
| Components interns de targeta | Flexbox |
| Estructura amb nom de zones | Grid (grid-template-areas) |
| Ordenació visual diferent del DOM | Tots dos (⚠️ cuidar accessibilitat) |

