**Com afecta la separació de components en arxius a la mantenibilitat?**

**React: Components i Props**  
Guia oficial per entendre els conceptes bàsics de components i propietats a React.  
[https://react.dev/learn/your-first-component](https://react.dev/learn/your-first-component)

**Composició de Components**  
Guia de React per crear components més flexibles amb composició en lloc d’herència.  
[https://react.dev/learn/composition-vs-inheritance](https://react.dev/learn/composition-vs-inheritance)

# **1\. Definició** 

Separar components en arxius és el procés de moure components que abans vivien tots junts en un mateix fitxer (normalment `App.js`, el component arrel) cap a fitxers propis i independents, connectant-los després mitjançant `import` i `export`. 

La màgia dels components rau en la seva reusabilitat: pots crear components que estan composats per altres components. Però a mesura que en nies cada vegada més, sovint té sentit començar a dividir-los en fitxers diferents.

## **2\. Per què existeix / quin problema resol**

Imagina que tens tots els teus components dins d'un mateix fitxer `App.js`: `Header`, `Sidebar`, `ProductCard`, `Footer`, `Modal`... A mesura que l'aplicació creix, aquest fitxer es converteix en un document enorme i difícil de navegar.

El problema concret que això genera: una de les avantatges clau de React és la capacitat de trencar la teva UI en components reutilitzables, però a mesura que la teva app creix, gestionar aquests components en un sol fitxer es converteix ràpidament en un malson.

La separació en arxius resol això directament: açò farà que els teus components siguin més modulars i reutilitzables en altres fitxers. Açò et permet mantenir els teus fitxers fàcils d'escanejar i reutilitzar components en més llocs.

## **3\. Com funciona per dins: el procés de tres passos**

Pots moure un component en tres passos: crear un nou fitxer JS per posar-hi els components; exportar el teu component de funció des d'aquest fitxer (utilitzant export per defecte o exports amb nom); i importar-lo al fitxer on l'utilitzaràs (utilitzant la tècnica corresponent per importar exports per defecte o amb nom).

**Abans** — tot en `App.js`:

| function Profile() {  return \<img src="..." alt="Científica" /\>;}export default function Gallery() {  return (    \<section\>      \<h1\>Científiques destacades\</h1\>      \<Profile /\>      \<Profile /\>      \<Profile /\>    \</section\>  );} |
| :---- |

**Després** — separat en `Gallery.js`, i `App.js` simplement l'importa:

| // Gallery.jsfunction Profile() {  return \<img src="..." alt="Científica" /\>;}export default function Gallery() {  return (    \<section\>      \<h1\>Científiques destacades\</h1\>      \<Profile /\>      \<Profile /\>      \<Profile /\>    \</section\>  );} |
| :---- |

| // App.jsimport Gallery from './Gallery.js';export default function App() {  return \<Gallery /\>;} |
| :---- |

Aquests viuen actualment en un fitxer de component arrel, anomenat App.js en aquest exemple. 

Depenent de la teva configuració, el teu component arrel podria estar en un altre fitxer. 

Si fas servir un framework amb routing basat en fitxers, com Next.js, el teu component arrel serà diferent per a cada pàgina.

## **4\. `export default` vs `export` amb nom: la decisió que afecta la mantenibilitat**

Aquesta és la part tècnica més rellevant per entendre l'impacte en la mantenibilitat: hi ha dues maneres principals d'exportar valors amb JavaScript: exports per defecte i exports amb nom. 

Un fitxer no pot tenir més d'un export per defecte, però pot tenir tants exports amb nom com vulguis.

| // Export per defecte: un sol component per fitxerexport default function Gallery() { /\* ... \*/ }// Importació: pots posar-li QUALSEVOL nomimport Gallery from './Gallery.js';import QualsevolNom from './Gallery.js'; // també funcionaria\!// Export amb nom: múltiples components/valors per fitxerexport function Profile() { /\* ... \*/ }export function Avatar() { /\* ... \*/ }// Importació: el nom HA de coincidir exactament, amb claus {}import { Profile, Avatar } from './Components.js'; |
| :---- |

Com exportes el teu component dicta com l'has d'importar. Obtindràs un error si intentes importar un export per defecte de la mateixa manera que importaries un export amb nom. 

Aquesta diferència no és arbitrària: la gent sol utilitzar exports per defecte si el fitxer només exporta un component, i utilitza exports amb nom si exporta múltiples components i valors — la pràctica habitual recomanada és **un component per fitxer amb export per defecte**, exactament per facilitar la mantenibilitat.

## **5\. Com afecta concretament la mantenibilitat: els quatre beneficis clau**

**A) Modularitat i organització del codi** Les declaracions d'import i export permeten als desenvolupadors trencar la seva base de codi React en mòduls més petits i manejables. Açò ajuda els desenvolupadors a entendre les relacions entre diferents parts de l'aplicació i gestionar les dependències de manera efectiva.

**B) Reutilització real entre múltiples parts de l'app** Components, funcions i variables es poden exportar des d'un fitxer i importar-se a múltiples fitxers a través del projecte. Açò fomenta la reutilització de codi, reduint la redundància i millorant l'eficiència de desenvolupament.

**C) Encapsulació i separació de responsabilitats** Exportar entitats específiques des d'un fitxer permet una millor encapsulació de la funcionalitat. Els components i funcions d'utilitat es poden encapsular dins dels seus propis fitxers, promovent la separació de responsabilitats i millorant l'organització del codi.

**D) Visibilitat clara de les dependències** Les declaracions d'import proporcionen visibilitat clara de les dependències entre mòduls. Quan obres un fitxer i veus els seus `import`, saps immediatament de què depèn aquell component, sense haver de llegir tot el seu codi.

## **6\. Avantatges i inconvenients**

**Avantatges:**

* **Fitxers més petits i fàcils d'escanejar**, especialment important quan l'equip creix i diferents persones treballen en parts diferents de l'app  
* **Detecció ràpida de dependències**: mirant els `import` d'un fitxer, saps exactament què necessita per funcionar  
* **Reutilització sense duplicació**: un component es defineix una vegada al seu fitxer i s'importa arreu on calgui  
* **Col·laboració en equip més senzilla**: amb components en fitxers separats, és més fàcil que diferents persones treballin en components diferents sense conflictes de control de versions (menys *merge conflicts* en un mateix fitxer gigant)

**Inconvenients / matisos:**

* **Excés de fragmentació**: si separes en fitxers fins i tot components trivials que mai es reutilitzen i que sempre van junts, pots acabar amb desenes de fitxers minúsculs que dificulten seguir el flux general  
* **Gestió de dependències circulars**: les dependències circulars es poden gestionar reestructurant el codi per eliminar el bucle de dependència, utilitzant tècniques de càrrega diferida, o emprant patrons d'injecció de dependències — un problema que només apareix quan comences a separar en múltiples fitxers  
* **Cal triar bé entre export per defecte i amb nom**: barrejar-los sense criteri clar en un projecte pot generar confusió sobre com importar cada cosa

## **7\. Errors comuns / mals entesos**

* **Intentar importar un export per defecte com si fos un export amb nom (o viceversa).** Obtindràs un error si ho fas malament — recorda: per defecte sense claus `{}`, amb nom amb claus `{}` i el nom exacte.  
* **Tenir més d'un `export default` al mateix fitxer.** Un fitxer no pot tenir més d'un export per defecte; si necessites exportar múltiples coses, la resta han de ser exports amb nom.  
* **No seguir cap convenció consistent al projecte.** Una bona pràctica és ser consistent: mantenir un patró coherent d'exports i imports a tot el projecte, en lloc de barrejar estils sense criteri d'un fitxer a un altre.  
* **Crear dependències circulars sense adonar-se'n.** Quan `ComponentA.js` importa de `ComponentB.js`, i `ComponentB.js` alhora importa de `ComponentA.js`, es genera un cicle que pot provocar errors difícils de depurar.

## **8\. Connexió amb altres conceptes del temari**

* Aquest tema és la **continuació natural** del model basat en components (pregunta anterior): un cop entens per què dividir la UI en peces, el pas següent lògic és dividir-les també en fitxers  
* Connecta amb **Composition vs Inheritance**: la composició (`<Gallery><Profile /></Gallery>`) es manté exactament igual encara que `Profile` i `Gallery` visquin ara en fitxers diferents — separar en arxius no canvia com es composen els components, només **on viuen**  
* Anticipa l'organització de **props**: quan els components viuen en fitxers separats, és encara més important que la comunicació entre ells (via props) sigui clara, ja que no pots simplement "mirar amunt" al mateix fitxer per veure d'on ve una dada  
* Es relaciona amb els **metaframeworks** (Tema 1): el *routing basat en fitxers* de Next.js o React Router porta aquest principi un pas més enllà, on l'estructura mateixa de carpetes determina les rutes de l'aplicació

## **9\. Preguntes de repàs (amb resposta)**

**1\. Quins són els tres passos per moure un component a un fitxer propi?**

Crear un nou fitxer JavaScript, exportar el component des d'aquell fitxer (amb export per defecte o amb nom), i importar-lo al fitxer on es vulgui utilitzar, fent servir la sintaxi d'importació corresponent al tipus d'export triat.

**2\. Quina diferència hi ha entre un export per defecte i un export amb nom, i quan s'utilitza cadascun?**

Un fitxer pot tenir només un export per defecte, però tants exports amb nom com calgui. S'acostuma a usar export per defecte quan el fitxer només conté un component, i exports amb nom quan el fitxer exporta múltiples components o valors junts.

**3\. Per què separar components en fitxers diferents millora la mantenibilitat d'un projecte que creix?**

Perquè manté els fitxers petits i fàcils d'escanejar, fa explícites les dependències entre parts de l'aplicació (a través dels `import`), permet reutilitzar components en més llocs sense duplicar codi, i facilita que diferents membres d'un equip treballin en components diferents sense generar conflictes constants al mateix fitxer.

**4\. Què passa si intentes importar un export per defecte fent servir la sintaxi d'un export amb nom?**

Obtindràs un error. La sintaxi d'importació ha de coincidir exactament amb com es va exportar el component: sense claus i amb qualsevol nom per als exports per defecte, amb claus `{}` i el nom exacte per als exports amb nom.

**5\. Què és una dependència circular i per què pot aparèixer quan es separen components en fitxers?**

És una situació en què dos (o més) fitxers s'importen mútuament l'un a l'altre, creant un bucle de dependències. Pot aparèixer quan, en separar la lògica en múltiples fitxers, dos components acaben necessitant-se l'un a l'altre; es resol reestructurant el codi, utilitzant càrrega diferida, o aplicant patrons d'injecció de dependències.

 

