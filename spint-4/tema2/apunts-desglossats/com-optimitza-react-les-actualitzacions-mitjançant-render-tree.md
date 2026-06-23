**Com optimitza React les actualitzacions mitjançant el render tree?**

**Conditional Rendering**  
[https://react.dev/learn/conditional-rendering](https://react.dev/learn/conditional-rendering)  
Explicació sobre com renderitzar contingut segons condicions lògiques a React. 

# **Com optimitza React les actualitzacions mitjançant el render tree?**

## **1\. Definició** 

Un **render tree** és una representació de la relació niada entre components React al llarg d'un sol render. 

El node arrel d'un render tree és el component arrel de l'app — normalment `App`, i és el primer component que React renderitza. 

Cada fletxa de l'arbre apunta d'un component pare a un component fill.

Punt important a aclarir: no hi ha cap menció a les etiquetes HTML que renderitza cada component, perquè el render tree està composat únicament de components React — no és el mateix que el DOM virtual (que sí inclou els elements HTML).

## **2\. Per què existeix / quin problema resol**

React, i moltes altres llibreries de UI, modelen la UI com un arbre. Pensar en la teva app com un arbre és útil per entendre la relació entre components. Aquesta comprensió t'ajudarà a depurar conceptes futurs com el rendiment i la gestió d'estat.

La justificació de fons és la mateixa que en altres sistemes informàtics: els arbres són un model de relació entre elements, sovint utilitzats per modelar UI. 

Per exemple, els navegadors usen estructures d'arbre per modelar l'HTML (DOM) i el CSS (CSSOM). Les plataformes mòbils també usen arbres per representar la seva jerarquia de vistes.

Igual que els navegadors i les plataformes mòbils, React també utilitza estructures d'arbre per gestionar i modelar la relació entre components en una app React. 

Aquests arbres són eines útils per entendre com flueix la informació a través d'una app React i com optimitzar el renderitzat i la mida de l'app.

## **3\. Com funciona per dins: estructura i naturalesa dinàmica**

Un detall clau d'aquest tema, que el diferencia d'un arbre estàtic: els render trees representen la relació niada entre components React al llarg d'un sol render. 

Amb el renderitzat condicional, el render tree pot canviar entre renders diferents. Amb valors diferents de props, els components poden renderitzar fills diferents.

El render tree **no és una estructura fixa**, és una "fotografia" de com es relacionen els components **en un moment concret**, i pot canviar completament en el render següent depenent de condicions, props o estat.

Un exemple il·lustratiu d'aquesta naturalesa "viva" de l'arbre: React usa arbres per modelar les relacions entre components i mòduls. Un render tree de React és una representació de la relació pare i fill entre components.

## **4\. El benefici pràctic: identificar components "top-level" i "leaf"**

Aquí hi ha la part central de la pregunta — **com ajuda exactament el render tree a optimitzar les actualitzacions**:

Tot i que els render trees poden diferir entre passades de renderitzat, aquests arbres són generalment útils per identificar quins són els components de nivell superior (top-level) i els components fulla (leaf) en una app React.

Els components de nivell superior són els components més propers al component arrel i afecten el rendiment de renderitzat de tots els components que tenen a sota, i sovint contenen la major complexitat. 

Els components fulla estan a prop de la part inferior de l'arbre i no tenen components fills, i sovint es re-renderitzen freqüentment.

| App (top-level \-- afecta TOT el que hi ha a sota) └── PageLayout      ├── Sidebar (top-level relatiu d'aquesta branca)      │    └── NavLink (leaf \-- sense fills, es re-renderitza sovint)      └── PageContent           └── ArticleCard (leaf) |
| :---- |

**Per què aquesta distinció importa per al rendiment**: els render trees ajuden a identificar quins són els components de nivell superior i els components fulla. 

Els components de nivell superior afecten el rendiment de renderitzat de tots els components per sota seu, i els components fulla sovint es re-renderitzen freqüentment. Identificar-los és útil per entendre i depurar el rendiment del renderitzat.

A la pràctica: si un component **top-level** es re-renderitza innecessàriament, **arrossega amb ell tots els seus fills** (excepte si s'han aplicat optimitzacions com `React.memo`). 

En canvi, un component **leaf** que es re-renderitza sovint normalment té un impacte molt més localitzat, perquè no té fills que arrossegar.

## **5\. Render tree vs el component subjacent que realment es renderitza (`children`)**

Hi ha un matís subtil però important sobre com el render tree representa la composició: Copyright.js apareix sota App.js, però al render tree, Copyright (el component) apareix com un fill d'InspirationGenerator. 

Això és perquè InspirationGenerator accepta JSX com a children props, així que renderitza Copyright com un component fill, però no n'importa el mòdul.

Aquesta distinció connecta directament amb la prop `children` que ja vam treballar: el render tree reflecteix **on s'acaba renderitzant** un component (segons la jerarquia real de composició en temps d'execució), no **on s'ha importat** el seu fitxer.

## **6\. Render tree vs dependency tree (i per què no s'han de confondre)**

Existeix un segon tipus d'arbre, **diferent del render tree**, que sovint genera confusió: els dependency trees representen les dependències de mòduls en una app React. 

Els dependency trees els utilitzen les eines de build per empaquetar el codi necessari per desplegar una app.

Cada node és un mòdul de JavaScript (no un component). Cada branca és una declaració d'importació. El node arrel és el punt d'entrada de la teva app. 

Quan es construeix per a producció, el teu bundler (com Webpack, Vite, o Parcel) utilitza el dependency tree per determinar quins mòduls incloure al bundle final de JavaScript.

**Diferència clau a retenir**: el **render tree** modela la relació entre **components en temps d'execució** (útil per al rendiment); el **dependency tree** modela la relació entre **fitxers/mòduls** (útil per a la mida del bundle i el procés de build). 

L'exemple de `Copyright`/`InspirationGenerator` mostra precisament com poden diferir: el mateix component pot aparèixer en una posició diferent en cada arbre, segons si mires "qui el renderitza" (render tree) o "qui n'importa el fitxer" (dependency tree).

## **7\. Connexió amb la preservació d'estat segons la posició a l'arbre**

Aquí hi ha una aplicació pràctica molt important del render tree, relacionada amb el que veuràs sobre `useState`: React construeix render trees per a l'estructura de components de la teva UI. 

Quan dones estat a un component, podries pensar que l'estat "viu" dins del component, però en realitat **React manté l'estat lligat a la posició del component dins de l'arbre**, no al component en abstracte.

React mantindrà l'estat al voltant tant de temps com renderitzis el mateix component a la mateixa posició de l'arbre. 

Per això, si dos components diferents es renderitzen successivament a la **mateixa posició** de l'arbre (per exemple, en canviar de destinatari en un xat), l'estat es pot "filtrar" inesperadament d'un a l'altre, tret que s'utilitzi una `key` per forçar React a tractar-los com a entitats diferents — exactament la mateixa eina que ja vam veure al punt de les keys en llistes.

## **8\. Avantatges i inconvenients**

**Avantatges:**

* **Depuració de rendiment dirigida**: en identificar components top-level vs leaf, saps exactament on val la pena invertir esforç d'optimització (memoització, divisió en components més petits, etc.)  
* **Comprensió clara del flux de dades**: l'arbre fa explícita la jerarquia pare-fill que determina com flueixen les props  
* **Base conceptual per a optimitzacions avançades**: entendre l'arbre és el prerequisit per entendre eines com `React.memo`, `useMemo`, o per què una `key` força la recreació d'un subarbre sencer

**Inconvenients / matisos:**

* **No és un arbre fix**: amb renderitzat condicional, **canvia entre renders**, així que "el" render tree d'una app no és una cosa que es pugui memoritzar estàticament — cal pensar-lo de manera dinàmica  
* **Es pot confondre fàcilment amb el dependency tree** o amb el DOM virtual, ja que els tres són "arbres" relacionats amb React però serveixen propòsits diferents  
* **No mostra detalls d'implementació HTML**: si necessites depurar a nivell de DOM real, el render tree (que només conté components) no és l'eina adequada — caldria l'arbre del DOM real

## 

## **9\. Errors comuns / mals entesos**

* **Confondre el render tree amb el DOM virtual.** El render tree només conté **components React**; el DOM virtual conté l'estructura d'elements HTML resultant. Són conceptes relacionats però diferents nivells d'abstracció.  
* **Pensar que el render tree és sempre el mateix.** Com hem vist, amb renderitzat condicional o canvis de props, l'arbre **canvia de forma entre renders** — no és una estructura estàtica del codi font.  
* **Confondre la posició al render tree amb la ubicació del fitxer/import.** L'exemple de `Copyright` ho demostra clarament: un component pot importar-se des d'un fitxer i renderitzar-se com a fill d'un altre component completament diferent via `children`.  
* **No relacionar el render tree amb la preservació d'estat.** És fàcil oblidar que React lliga l'estat a la **posició a l'arbre**, no només "al component"; açò explica comportaments aparentment estranys quan es canvia quin component es renderitza a una posició concreta sense canviar la `key`.

## **10\. Connexió amb altres conceptes del temari**

* Connecta **directament** amb la **reconciliation** del Tema 1: el render tree és precisament l'estructura sobre la qual React aplica l'algorisme de diffing; entendre'n la forma ajuda a entendre per què certs canvis són cars (afectar un component top-level) i altres barats (un component leaf)  
* Es relaciona amb les **keys en llistes** (pregunta anterior d'aquest tema): la mateixa lògica de "posició a l'arbre determina identitat" que vam veure amb les keys s'aplica aquí a nivell més general, amb la preservació o pèrdua d'estat  
* Anticipa la **composició de components**: l'exemple `Copyright`/`InspirationGenerator` mostra com `children` fa que el render tree reflecteixi la composició real, no la jerarquia d'imports  
* Es relaciona amb els **metaframeworks** (Tema 1): el routing basat en fitxers de Next.js o React Router determina, en última instància, quin "tros" de l'arbre de renderitzat es munta per a cada ruta

## **11\. Preguntes de repàs (amb resposta)**

**1\. Què representa exactament un render tree, i què NO inclou?**

Representa la relació niada de pares i fills entre components React durant un render concret. No inclou les etiquetes HTML que cada component acaba renderitzant — està composat exclusivament de components, no d'elements del DOM.

**2\. Per què el render tree pot canviar entre diferents renders d'una mateixa aplicació?**

Perquè amb renderitzat condicional, un component pot renderitzar fills diferents segons els valors actuals de les seves props o el seu estat. Com que el render tree reflecteix exactament què s'ha renderitzat en aquell moment concret, la seva forma pot variar d'un render a un altre.

**3\. Quina diferència hi ha entre un component "top-level" i un component "leaf" dins del render tree, i per què és rellevant per al rendiment?**

Un component top-level està a prop de l'arrel i el seu re-renderitzat afecta tots els components per sota seu a l'arbre; sol concentrar més complexitat. Un component leaf no té fills i sol re-renderitzar-se amb més freqüència, però amb un impacte més localitzat. Distingir-los ajuda a saber on optimitzar amb més efecte.

**4\. Quina diferència hi ha entre el render tree i el dependency tree?**

El render tree modela la relació entre components tal com es renderitzen en temps d'execució (qui és fill de qui a la UI). El dependency tree modela la relació entre mòduls/fitxers de JavaScript segons les seves declaracions d'importació, i s'utilitza pels bundlers per decidir què incloure al paquet final de l'aplicació. Un component pot aparèixer en posicions diferents en cadascun d'aquests dos arbres.

**5\. Per què la posició d'un component dins del render tree afecta si conserva o perd el seu estat?**

Perquè React lliga l'estat a la posició concreta dins de l'arbre de renderitzat, no al component de manera abstracta. Si es renderitza un component diferent (o el mateix component amb dades diferents) exactament a la mateixa posició de l'arbre sense canviar la `key`, React pot reutilitzar incorrectament l'estat anterior; per evitar-ho, cal forçar una nova identitat amb una `key` diferent.

 

