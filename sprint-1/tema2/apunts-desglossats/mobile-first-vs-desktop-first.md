## **Mobile-First vs. Desktop-First: diferències i quan usar cada enfocament**

**What is Mobile First Design?** [https://www.geeksforgeeks.org/websites-apps/mobile-first-design/](https://www.geeksforgeeks.org/websites-apps/mobile-first-design/)   
Principis i avantatges del disseny “mobile-first”.

**El context: per què importa l'ordre en el que dissenyes**

Quan crees un lloc web responsiu, has de decidir per a quin dispositiu dissenyes primer. No és una decisió estètica sinó estratègica: afecta com escrius el CSS, com estructures el contingut i quina experiència prioritzes.

Mobile-first design és una manera de crear webs que es centra a fer-los funcionar bé en smartphones i tauletes abans de dissenyar per a ordinadors. Aquesta aproximació és important perquè la majoria de persones ara usen els seus dispositius mòbils per navegar per internet.

**Mobile-First: dissenyar per a la restricció**

Mobile-first design és un enfocament on dissenyes el teu lloc web per a dispositius mòbils primer i llavors per a desktops. Quan els productes es dissenyen pensant en dispositius mòbils, es garanteix que siguin intuïtius i fàcils d'usar.

En termes de CSS, mobile-first significa que els estils base (sense cap media query) s'escriuen per a pantalles petites, i s'usen **`min-width`** per afegir estils per a pantalles més grans:

| /\* Estils base: mòbil \*/.container {  width: 90%;  padding: 1rem;}.menu {  flex-direction: column;}/\* A partir de tauleta \*/@media (min-width: 48rem) {  .container { width: 80%; }  .menu { flex-direction: row; }}/\* A partir de desktop \*/@media (min-width: 64rem) {  .container { width: 70%; }} |
| :---- |

La filosofia és: començas amb el mínim necessari i **afegeixes** complejitat a mesura que la pantalla creix.

**Desktop-First: dissenyar per a l'amplitud**

Desktop-first és l'enfocament tradicional: començas amb un disseny ric per a pantalles grans i **reduïes** o simplifiques per a pantalles petites. S'usen **`max-width`** per aplicar excepcions als dispositius petits:

| /\* Estils base: desktop \*/.container {  width: 70%;  display: grid;  grid-template-columns: 1fr 1fr 1fr;}/\* A partir de tauleta cap avall \*/@media (max-width: 48rem) {  .container {    grid-template-columns: 1fr 1fr;  }}/\* A partir de mòbil cap avall \*/@media (max-width: 30rem) {  .container {    width: 90%;    grid-template-columns: 1fr;  }} |
| :---- |

La filosofia és: començas amb tota la riquesa visual i **elimines** o adaptes per a pantalles petites.

**Les diferències clau**

**Ordre d'escriptura del CSS.** En mobile-first escrius els estils simples primer i afegeixes complexitat. En desktop-first escrius els estils complexos primer i els simplifiques. La primera manera genera menys sobreescriptures i menys codi en total.

**Rendiment en mòbil.** Un mòbil que carrega una web mobile-first descarrega i processa menys CSS, perquè els estils de desktop mai s'activen. En desktop-first, el mòbil ha de descarregar tots els estils de desktop i llavors aplicar les excepcions per sobreescriure'ls.

**Prioritat de contingut.** Amb l'espai limitat de les pantalles petites, cal assegurar-se que els elements més importants siguin visibles primer. Això ajuda els usuaris a trobar ràpidament el que busquen. Mobile-first t'obliga a prendre decisions de jerarquia de contingut des del principi, cosa que resulta en dissenys més enfocats.

**SEO.** Mobile-first millora el posicionament SEO del lloc web, fent-lo més probable que aparegui en els resultats de cerca i atraient més visitants. Google usa l'indexació mobile-first, és a dir, avalua principalment la versió mòbil del teu lloc per decidir la posició en els resultats de cerca.

**El procés mobile-first pas a pas**

El procés de disseny mobile-first implica diversos passos clau: comensar creant wireframes per al layout centrant-se en el contingut i el mòbil, compilar tots els elements que es volen incloure, prioritzar els elements de contingut per mostrar els més importants de manera efectiva, dissenyar primer un wireframe mòbil i usar-lo com a model per expandir-lo a breakpoints més grans.

Altres consideracions específiques per a mòbil:

Els dits són més amples que els cursors del ratolí, per tant cal assegurar-se que els elements interactius siguin prou grans per tocar-los fàcilment. A més, els hovers afegeixen interactivitat però no funcionen en dispositius mòbils, per tant cal dissenyar interaccions que no depenguin dels efectes hover per assegurar la funcionalitat en tots els dispositius.

**Quan usar cada enfocament**

**Usa mobile-first quan:**

* Comences un projecte nou des de zero  
* La majoria del teu públic usa mòbil  
* Vols el millor rendiment possible en dispositius petits  
* És la recomanació estàndard de la indústria actual

**Usa desktop-first quan:**

* Treballes en un projecte existent ja dissenyat per a desktop  
* El teu públic és majoritàriament d'escriptori (aplicacions empresarials internes, dashboards complexos)  
* Adaptes un disseny ja existent sense poder-lo reescriure des de zero

**Resum comparatiu**

|  | Mobile-First | Desktop-First |
| ----- | ----- | ----- |
| **Estils base per a...** | Mòbil | Desktop |
| **Media query usada** | `min-width` | `max-width` |
| **Filosofia** | Afegeixes complexitat | Reduïs complexitat |
| **Rendiment mòbil** | Millor | Pitjor |
| **SEO** | Millor | Pitjor |
| **Contingut** | Prioritzat i enfocat | Pot ser sobrecarregat |
| **Recomanació** | Projectes nous ✅ | Projectes legacy |
| **Cascada CSS** | Menys sobreescriptures | Moltes sobreescriptures |

