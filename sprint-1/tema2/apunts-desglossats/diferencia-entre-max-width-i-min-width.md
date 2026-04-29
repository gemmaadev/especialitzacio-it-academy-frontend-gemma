## **`max-width` vs. `min-width` en Media Queries**

**Què és una media query?**

Una media query és una condició CSS que aplica estils únicament quan es compleix un cert criteri: normalment la mida de la pantalla. Amb elles pots fer que el mateix element es vegi diferent en mòbil, tauleta i desktop. La sintaxi bàsica és:

@media (condició) {  
  /\* estils que s'apliquen quan es compleix la condició \*/  
}

**`max-width`: enfocament desktop-first**

Una media query amb `max-width` activa els estils per a pantalles petites quan l'amplada del viewport és menor que un cert nombre de píxels. És l'amplada màxima abans que els estils deixin d'aplicar-se.

El que realment significa `@media (max-width: 768px)` és: **"si la pantalla és de 768px o menys, aplica això"**.

| /\* Estils per defecte → desktop \*/.container {  width: 70%;}/\* Quan la pantalla és petita (mòbil) → sobreescriu \*/@media (max-width: 768px) {  .container {    width: 90%;  }} |
| :---- |

Amb `max-width`, escrius primer el disseny de desktop i després afegeixes excepcions per als casos on la pantalla és petita. Si un disseny es construeix primer per a desktop, llavors tot el CSS per a la versió desktop ja està escrit, i ha de ser sobreescrit amb més CSS per a les versions petites.

**`min-width`: enfocament mobile-first**

Una media query amb `min-width` activa els estils per a pantalles grans quan el viewport és major que el nombre de píxels definit. És l'amplada mínima abans que els estils comencin a aplicar-se.

El que realment significa `@media (min-width: 768px)` és: **"si la pantalla és de 768px o més, aplica això"**.

| /\* Estils per defecte → mòbil \*/.container {  width: 90%;}/\* Quan la pantalla és gran (desktop) → afegeix o modifica \*/@media (min-width: 768px) {  .container {    width: 70%;  }} |
| :---- |

Un enfocament mobile-first significa que els estils s'apliquen primer als dispositius mòbils. Els estils avançats i les sobreescriptures per a pantalles més grans s'afegeixen llavors al full d'estils via media queries. Aquest enfocament usa media queries amb `min-width`.

**La diferència fonamental: quin és el "per defecte"**

La diferència clau no és tècnica sinó estratègica: **quin disseny escrius primer**.

Amb l'enfocament desktop-first, si tens un viewport gran i vols mostrar 5 elements per fila en una galeria, hauràs de restaurar les propietats per defecte per als viewports petits la major part del temps. Amb min-width, estalvies línies de codi i complexitat mental.

| /\* ❌ Desktop-first (max-width): has de "desfer" estils \*/.menu {  display: flex;        /\* desktop: horitzontal \*/  flex-direction: row;}@media (max-width: 768px) {  .menu {    flex-direction: column;  /\* mòbil: has de sobreescriure \*/  }}/\* ✅ Mobile-first (min-width): afegeixes, no desdeixes \*/.menu {  display: flex;  flex-direction: column;  /\* mòbil: base \*/}@media (min-width: 768px) {  .menu {    flex-direction: row;   /\* desktop: afegim l'excepció \*/  }} |
| :---- |

**Per què mobile-first és la recomanació de la indústria**

El 2025, la majoria del tràfic web ve de dispositius mòbils. Dissenyar mobile-first significa que si el CSS falla o no carrega, l'usuari mòbil segueix veient una pàgina funcional. La cosa bonica del mobile-first és que, quan els estils de desktop fallen, el teu lloc segueix semblant bé amb els estils mòbils aplicats. No pots dir el mateix dels estils de desktop en un smartphone.

A més, els mòbils carreguen més ràpid el CSS mobile-first perquè no han de descarregar ni processar estils de desktop que no usaran.

**Breakpoints estàndard habituals**

| /\* Mobile-first: els estils base són per a mòbil \*//\* Tauletes i amunt \*/@media (min-width: 768px) { ... }/\* Laptop i amunt \*/@media (min-width: 1024px) { ... }/\* Desktop gran i amunt \*/@media (min-width: 1280px) { ... } |
| :---- |

**El contenidor: 90% en mòbil i 70% en desktop amb `rem`**

Ara apliquem tot això a l'exemple concret. Primer, per què `rem` i no `px`?

`rem` (root em) és una unitat relativa a la mida de lletra de l'element `<html>`. Per defecte, `1rem = 16px`. La gran avantatge és que si l'usuari canvia la mida de lletra del navegador per accessibilitat, tot l'escalat es respecta automàticament. `px` és una unitat fixa que no respecta les preferències de l'usuari.

La implementació del contenidor responsive:

| /\* Variables CSS per als breakpoints en rem \*//\* 768px ÷ 16px \= 48rem \*//\* 1024px ÷ 16px \= 64rem \*/.container {  /\* Mòbil (base, mobile-first) \*/  width: 90%;  margin-inline: auto;   /\* centra el contenidor \*/  /\* Evita que creixi infinitament en pantalles molt grans \*/  max-width: 75rem;      /\* 1200px \*/}/\* Desktop: a partir de 48rem (768px) \*/@media (min-width: 48rem) {  .container {    width: 70%;  }} |
| :---- |

La propietat `margin-inline: auto` és l'equivalent modern de `margin: 0 auto` per centrar el contenidor horitzontalment. Funciona tant en mòbil com en desktop.

**Exemple complet en context real**

| \<main class\="container"\>  \<h1\>Títol de la pàgina\</h1\>  \<p\>Contingut de la pàgina...\</p\>\</main\>/\* Reset mínim \*/\*, \*::before, \*::after {  box-sizing: border-box;  margin: 0;  padding: 0;}/\* Contenidor responsive \*/.container {  width: 90%;             /\* mòbil: 90% de la pantalla \*/  margin-inline: auto;    /\* centrat \*/  max-width: 75rem;       /\* mai més ample que 1200px \*/  padding-inline: 1rem;   /\* petit padding lateral \*/}/\* Desktop \*/@media (min-width: 48rem) {  .container {    width: 70%;           /\* desktop: 70% de la pantalla \*/  }} |
| :---- |

**Resum visual**

|  | `max-width` | `min-width` |
| ----- | ----- | ----- |
| Significa | "Si la pantalla és MENOR que X" | "Si la pantalla és MAJOR que X" |
| Estils base | Desktop | Mòbil |
| Enfocament | Desktop-first | Mobile-first ✅ |
| Recomanació | Projectes legacy | Projectes nous |
| Ordre d'escriptura | Gran → petit | Petit → gran |

