# **Com funciona el procés de reconciliation per actualitzar eficientment el DOM real?**

## **1\. Definició** 

La **reconciliation** és l'algorisme de React per comparar (fer un "diff") dos arbres del DOM i calcular el conjunt mínim d'operacions necessàries per actualitzar el DOM real. 

Dit de manera senzilla: és el "cervell" que decideix **què ha canviat** entre l'estat anterior i el nou de la interfície, abans que ningú toqui el navegador.

## **2\. Per què existeix / quin problema resol**

Quan canvia l'estat o les props d'un component, pots pensar en la funció `render()` com si creés un arbre d'elements React; en la propera actualització, aquesta mateixa funció retornarà un arbre diferent. 

El repte és: **com saber, de la manera més ràpida possible, quina és la diferència exacta entre l'arbre vell i el nou?**

Existeixen algorismes genèrics per resoldre aquest problema (transformar un arbre en un altre amb el mínim d'operacions), però els algorismes més avançats tenen una complexitat de l'ordre d'O(n³), on n és el nombre d'elements de l'arbre — amb 1.000 elements, caldrien al voltant de mil milions de comparacions, cosa massa cara.

Per evitar-ho, React implementa un algorisme heurístic d'ordre O(n), basat en dues assumpcions: 

1. Que dos elements de tipus diferents generaran arbres diferents  
2. Que el programador pot suggerir quins elements fill es mantenen estables entre renders mitjançant la prop `key`. 

A la pràctica, aquestes assumpcions són vàlides per a gairebé tots els casos d'ús reals.

## **3\. Com funciona per dins: l'algorisme de diffing**

El procés segueix una lògica clara, comparant arbre per arbre:

**Pas 1 — Comparar els elements arrel** Quan es comparen dos arbres, React primer compara els dos elements arrel. 

El comportament és diferent depenent del tipus d'aquests elements arrel. 

Quan els elements arrel tenen tipus diferents, React desmunta l'arbre vell completament i el construeix de zero — passar de `<a>` a `<img>`, o de `<Article>` a `<Comment>`, o de `<Button>` a `<div>`, sempre provoca una reconstrucció total.

**Pas 2 — Recórrer els fills** En lloc de comparar recursivament cada node (cosa lenta), React fa un recorregut en amplada (breadth-first) sobre els arbres del DOM virtual. 

Per defecte, en recórrer els fills d'un node del DOM, React simplement itera sobre les dues llistes de fills al mateix temps i genera una mutació cada cop que hi ha una diferència.

**Pas 3 — El paper crític de les `key`**

Aquí és on l'algorisme es pot tornar ineficient si no l'ajudes:

| // ✅ Funciona bé: afegir un element AL FINAL\<ul\>                    \<ul\>  \<li\>first\</li\>          \<li\>first\</li\>  \<li\>second\</li\>         \<li\>second\</li\>\</ul\>                     \<li\>third\</li\>   ← només s'insereix això                        \</ul\>// ❌ Sense \`key\`, afegir AL PRINCIPI és ineficient:\<ul\>                    \<ul\>  \<li\>Duke\</li\>            \<li\>Connecticut\</li\>  \<li\>Villanova\</li\>       \<li\>Duke\</li\>\</ul\>                      \<li\>Villanova\</li\>                        \</ul\>// React, sense pistes, MUTA cada fill un per un// en lloc d'adonar-se que només calia inserir "Connecticut" al principi |
| :---- |

Si s'implementa de manera naïf, inserir un element al principi té un rendiment pitjor; React mutarà cada fill en lloc d'adonar-se que podia mantenir intactes els subarbres "Duke" i "Villanova". 

Aquest és exactament el problema que soluciona la `key`: li dius a React "aquest element és el mateix d'abans, només ha canviat de posició", i així evita treball innecessari.

| // Sense key (mala pràctica): React no sap identificar els elements{items.map(item \=\> \<li\>{item.text}\</li\>)}// Amb key (bona pràctica): React reconeix cada element entre renders{items.map(item \=\> \<li key={item.id}\>{item.text}\</li\>)} |
| :---- |

## 

## **4\. L'evolució: de l'Stack Reconciler a Fiber**

L'algorisme descrit fins ara és la lògica conceptual del diffing, però **com s'executa per dins** ha canviat radicalment amb el temps.

**El problema de l'algorisme antic (Stack Reconciler):** en l'algorisme antic, React no podia separar les fases de reconciliation i de rendering. 

Com que JavaScript és un procés d'un sol fil i renderitza de manera síncrona, el problema del reconciler antic era que continuava renderitzant fins al final del fil principal i seguia el camí de travessia recursivament fins que la pila d'execució quedava buida. 

El fil principal no podia avortar ni pausar el processament per saltar a un render diferent en cas que apareguès una actualització d'alta prioritat — no hi havia cap manera de trencar la cadena de renderitzat en l'algorisme de pila. 

Resultat pràctic: animacions amb salts (*frame drops*) i interfícies que es notaven "encallades".

**La solució: React Fiber.** React Fiber és una reescriptura completament compatible amb l'anterior reconciler, anomenada Fiber Reconciler. 

Per "renderitzat incremental" entenem que pot dividir la feina de renderitzat en trossos separats i repartir-los entre diversos frames d'execució. 

A diferència de la implementació anterior (on React creava un arbre d'elements React immutables i el recorria recursivament), ara React crea un arbre de nodes fiber que poden mutar; com que els nodes fiber poden mutar, React no necessita recrear cada node en cada actualització — pot simplement clonar-lo i actualitzar-lo quan hi ha un canvi.

**Tres fases clarament separades:**

1. **Render/Reconciliation phase** — el reconciler fa la feina de calcular quines parts de l'arbre han canviat. Aquesta fase pot interrompre's i reprendre's  
2. **Commit phase** — el renderer utilitza aquesta informació per actualitzar realment l'aplicació renderitzada. Aquesta fase **no** es pot interrompre: cal que s'apliqui tota de cop per evitar inconsistències visuals  
3. **Scheduling** — determina quan s'ha de fer la feina, ja sigui per prioritat o per temps; la feina d'alta prioritat es programa abans que la de baixa prioritat

**La tècnica del "double buffering":** l'arbre actual (current tree) és el que es veu en pantalla; React no pot fer-hi canvis directament perquè podria provocar una UI inconsistent. 

En lloc d'això, React fa els canvis sobre un arbre "work in progress" i, al final de l'algorisme, simplement intercanvia els punters — l'arbre actual passa a ser el work-in-progress i viceversa. 

És la mateixa tècnica que feien servir els programadors de videojocs per evitar que diferents parts de la pantalla quedessin inconsistents entre elles.

| // Exemple pràctic de com aprofitar la interrompibilitat de Fiber:import { startTransition } from 'react';function SearchBox() {  const \[query, setQuery\] \= useState('');  function handleChange(e) {    setQuery(e.target.value); // ← actualització URGENT (l'input ha de respondre a l'instant)    startTransition(() \=\> {      setSearchResults(heavyFilterOperation(e.target.value)); // ← actualització NO urgent    });  }  return \<input value={query} onChange={handleChange} /\>;} |
| :---- |

Aquí veus en codi real el benefici de Fiber: l'escriptura a l'input mai es bloqueja, encara que el filtratge de resultats sigui costós, perquè React pot prioritzar la primera actualització i ajornar la segona.

## **5\. Avantatges i inconvenients**

**Avantatges:**

* **Eficiència**: passar d'O(n³) a O(n) fa que la comparació d'arbres grans sigui viable en temps real  
* **Interrompibilitat (amb Fiber)**: React Fiber va revolucionar el procés de reconciliation fent-lo asíncron, interrompible i molt més eficient  
* **Prioritzacíó de treball**: les actualitzacions urgents (com escriure en un input) no queden bloquejades per treball pesat de baixa prioritat  
* **Base per a funcionalitats modernes**: Concurrent Mode, Suspense i el *time slicing* (`startTransition`) només són possibles gràcies a aquesta arquitectura

**Inconvenients / limitacions a tenir en compte:**

* L'heurística O(n) **no és perfecta**: és una aproximació basada en assumpcions raonables, no la solució matemàticament òptima  
* Si no uses `key` correctament (per exemple, fent servir l'índex de l'array en llistes que es reordenen), pots **anul·lar el benefici** de l'algorisme i provocar mutacions DOM innecessàries, o fins i tot bugs visuals subtils  
* La complexitat interna de Fiber (fibers, work-in-progress tree, double buffering) és **invisible per al desenvolupador normal**, però entendre-la ajuda molt a depurar problemes de rendiment

## **6\. Errors comuns / mals entesos**

* **Usar l'índex de l'array com a `key`.** Sembla pràctic, però si la llista es reordena, s'hi insereixen o s'eliminen elements al mig, React pot confondre identitats i mutar el component equivocat (per exemple, mantenint l'estat d'un input al lloc equivocat). React fa servir les `key` per optimitzar el renderitzat de llistes i evitar operacions DOM innecessàries — però només funciona bé si la `key` és estable i única per element, no per posició.  
* **Confondre Virtual DOM amb reconciliation.** El Virtual DOM és **l'estructura de dades** (l'arbre d'objectes en memòria); la reconciliation és **l'algorisme** que compara dues versions d'aquesta estructura. Són conceptes relacionats però diferents.  
* **Pensar que "reconciliation" i "rendering" són el mateix pas.** El reconciler calcula quines parts han canviat; el renderer és qui després fa servir aquesta informació per actualitzar realment l'app renderitzada. Són fases separades expressament, perquè això és el que permet a React funcionar igual amb DOM, React Native, etc.  
* **Creure que Fiber elimina el cost de tocar el DOM real.** No l'elimina: el que fa és minimitzar-lo i repartir-lo de manera més intel·ligent en el temps.

## **7\. Connexió amb altres conceptes del temari**

* Aquest tema és la **continuació directa** de la pregunta anterior sobre el DOM virtual: el DOM virtual és l'estructura, la reconciliation és el procés que hi opera  
* Connecta directament amb els **Hooks**: cada vegada que crides `setState` o l'`setter` d'un `useState`, és el que dispara tot el cicle de reconciliation que hem descrit  
* Es relaciona amb la **programació declarativa**: React proporciona una API declarativa perquè no t'hagis de preocupar exactament de què canvia en cada actualització — la reconciliation és precisament la maquinària interna que fa possible aquesta promesa declarativa  
* Anticipa conceptes que veuràs més endavant a fons de React (Concurrent Mode, Suspense, `startTransition`), que són directament construïts sobre l'arquitectura Fiber

## **8\. Preguntes de repàs (amb resposta)**

**1\. Per què React no utilitza un algorisme de diffing matemàticament òptim?**

Perquè els algorismes generals per a aquest problema tenen una complexitat d'O(n³), inviable per a interfícies amb molts elements (mil milions de comparacions per a només 1.000 nodes). React opta per una heurística d'O(n) basada en dues assumpcions raonables sobre com es comporten les interfícies reals.

**2\. Quines són les dues assumpcions clau de l'heurística de React?**

Que dos elements de tipus diferents produiran sempre arbres diferents (per tant, ni s'intenta comparar-los en detall, es reconstrueixen de zero), i que el desenvolupador pot indicar amb la prop `key` quins elements d'una llista es mantenen estables entre renders.

**3\. Per què inserir un element al principi d'una llista sense `key` és ineficient?**

Perquè, sense una pista d'identitat, React compara els fills posició per posició. Si insereixes un element al principi, totes les posicions es desplacen, i React creu que **cada** element ha canviat, mutant-los tots en lloc d'adonar-se que només calia inserir-ne un de nou al davant.

**4\. Quina diferència hi ha entre l'Stack Reconciler antic i Fiber?**

L'Stack Reconciler era síncron i recursiu: un cop començava a renderitzar, no podia parar-se fins acabar tot el subarbre, encara que arribés una actualització més urgent. Fiber introdueix unitats de treball interrompibles, amb prioritats, que permeten pausar, reprendre o descartar treball segons calgui, sense bloquejar el fil principal.

**5\. Per què la fase de "commit" no es pot interrompre, a diferència de la fase de reconciliation?**

Perquè el commit és el moment en què els canvis s'apliquen realment al DOM visible per l'usuari. Si s'interrompés a mig camí, la interfície quedaria en un estat visual inconsistent (a mitges entre l'abans i el després), cosa que generaria errors visibles. Per això React separa clarament una fase preparatòria (interrompible) d'una fase d'aplicació final (atòmica).

 

