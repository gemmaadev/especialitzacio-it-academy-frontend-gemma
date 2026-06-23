**Quin problema de rendiment resol el DOM virtual?**

**Virtual DOM Explained**  
[https://reactkungfu.com/2015/10/the-difference-between-virtual-dom-and-dom/](https://reactkungfu.com/2015/10/the-difference-between-virtual-dom-and-dom/)  
Article que explica la diferència entre el DOM i el Virtual DOM a React.

Et faig el resum seguint la mateixa estructura. Primer busco l'article que has enllaçat per assegurar-me que la informació és precisa i actual.Tinc el material. Aquí tens el resum complet:

## **1\. Definició**  

El **DOM virtual** és una abstracció del DOM HTML, lleugera i separada dels detalls d'implementació específics del navegador. 

Dit d'una altra manera: és **una còpia local i simplificada del DOM real que React manté en memòria**, on pot fer els seus càlculs sense necessitat de tocar el navegador directament.

Si el DOM ja és una abstracció del HTML (text → estructura en memòria), el DOM virtual és una abstracció d'una abstracció: una capa extra que React posa al mig per treballar-hi més ràpid.

## **2\. Per què existeix / quin problema resol**

El problema arrenca del propi DOM real. El DOM HTML sempre té estructura d'arbre, cosa que permet recórrer-lo amb relativa facilitat — però fàcil no vol dir ràpid. 

Els arbres DOM avui dia són enormes, i com que cada cop construïm més aplicacions dinàmiques (SPA), cal modificar l'arbre DOM constantment i molt — i això és un veritable problema de rendiment i de desenvolupament.

El motiu de fons és senzill: **manipular el DOM real és car**. Cada vegada que afegeixes, elimines o canvies un node, el navegador pot haver de recalcular estils, tornar a maquetar la pàgina (*reflow*) i repintar-la (*repaint*). 

Si ho fas un cop, no passa res. Si ho fas centenars de vegades per segon (per exemple, en una llista que es filtra mentre l'usuari escriu), l'aplicació es torna lenta.

Hi havia, a més, un segon problema relacionat amb com es treballava abans de React: amb tècniques a l'estil jQuery, calia buscar manualment cada node interessat en un esdeveniment i actualitzar-lo si calia, la qual cosa era difícil de gestionar (perdre's en el codi era fàcil i arriscat) i ineficient, perquè calia fer aquestes cerques manualment en lloc de saber d'avançada quins nodes calia actualitzar.

React soluciona la part de la **gestió del codi** amb la declarativitat (en lloc de dir "ves i busca aquest node i canvia-li això", simplement declares com hauria de veure's el component). 

Però això per si sol no resol el problema de rendiment — i aquí és exactament on entra en joc el DOM virtual.

## **3\. Com funciona per dins**

Aquí cal distingir dos conceptes clau que sovint es confonen:

* **`ReactElement`**: és el tipus primari de React — una representació virtual, lleugera, sense estat i immutable d'un element del DOM. Els ReactElements viuen al DOM virtual i en són els nodes bàsics; la seva immutabilitat els fa fàcils i ràpids de comparar i actualitzar — i aquest és precisament el motiu del gran rendiment de React.  
* **`ReactComponent`**: a diferència de l'element, és amb estat (stateful). Quan el seu estat canvia, es torna a renderitzar. Però els components no tenen accés directe al DOM virtual — es converteixen en elements per poder-hi entrar.

El flux complet és aquest:

1. L'estat d'un `ReactComponent` canvia (per exemple, amb `setState` o, en components funcionals moderns, amb `useState`)  
2. El component es converteix internament en un `ReactElement` nou  
3. Aquest nou element s'insereix al DOM virtual  
4. React **compara** (fa un *diff*) aquest nou DOM virtual amb la versió anterior — i això es fa més ràpid que si es fes directament sobre el DOM real  
5. Un cop React coneix les diferències, les converteix en codi de baix nivell (DOM HTML real) i només llavors s'executen els canvis sobre el DOM real, optimitzats per cada navegador

És important notar que, a nivell de sintaxi, gairebé no hi ha diferència visible: no hi ha una gran diferència entre el DOM "normal" i el virtual, raó per la qual el codi JSX de React pot semblar pràcticament HTML pur. 

Les úniques diferències pràctiques destacables són tres atributs que existeixen al DOM virtual però no al DOM real: `key`, `ref` i `dangerouslySetInnerHTML`.

| // 1\. L'estat canviafunction Timer() {  const \[seconds, setSeconds\] \= useState(0);  useEffect(() \=\> {    const interval \= setInterval(() \=\> {      setSeconds(s \=\> s \+ 1); // ← dispara una actualització d'estat    }, 1000);    return () \=\> clearInterval(interval);  }, \[\]);  // 2\. React crea un nou ReactElement amb el valor actualitzat  return \<div\>Segons transcorreguts: {seconds}\</div\>;}// 3-5. React compara el nou element amb l'anterior al DOM virtual,// detecta que NOMÉS ha canviat el text del compte enrere,// i actualitza únicament aquell node de text al DOM real \--// no torna a crear tot el \<div\> de zero |
| :---- |

## **4\. Avantatges i inconvenients**

**Avantatges:**

* **Rendiment**: comparar i actualitzar objectes en memòria (DOM virtual) és molt més ràpid que manipular directament el DOM real, que sovint implica recàlculs de l'estil i repintat del navegador  
* **Actualitzacions mínimes**: React identifica exactament què ha canviat i només toca el DOM real allà on cal, no tot el component sencer  
* **Abstracció del navegador**: el DOM virtual és independent del navegador concret; React s'encarrega de traduir-ho al codi optimitzat per a cadascun  
* **Productivitat per al programador**: no has de gestionar manualment quins nodes actualitzar; declares com hauria de veure's el component i React fa la feina de baix nivell

**Inconvenients (matisos que cal tenir presents):**

* El DOM virtual **no és gratuït**: crear i comparar objectes en memòria també consumeix recursos. Per a aplicacions molt petites amb poques actualitzacions, l'overhead pot no compensar  
* És **una capa més d'abstracció**, que afegeix complexitat conceptual (cal entendre el cicle render → diff → commit)  
* El rendiment final depèn de com s'usi: components mal dissenyats (que es re-renderitzen sense necessitat) poden anul·lar bona part del guany teòric

## **5\. Errors comuns / mals entesos**

* **Pensar que el DOM virtual és invenció de React.** No ho és: el DOM virtual no va ser inventat per React, però React l'utilitza i el proporciona de manera gratuïta. És un concepte/patró que altres llibreries també han implementat.  
* **Confondre "DOM virtual" amb "no hi ha DOM real".** El DOM real sempre hi és al final; el DOM virtual és només un pas intermedi per decidir *com* tocar-lo de manera eficient.  
* **Pensar que React mai toca el DOM real fins que cal.** És just el contrari: l'objectiu del DOM virtual és precisament minimitzar i optimitzar quan i com es toca el DOM real, no evitar-ho del tot.  
* **Confondre `ReactElement` amb `ReactComponent`.** L'element és la peça lleugera i immutable que viu al DOM virtual; el component és la unitat amb estat que tu escrius i que es converteix en elements per poder renderitzar-se.

## **6\. Connexió amb altres conceptes del temari**

* El **model basat en components** (tema anterior) és el que genera la necessitat del DOM virtual: com que l'app es divideix en moltes peces que es re-renderitzen sovint, calia un mecanisme eficient per no haver de refer tot el DOM real cada vegada  
* La **reconciliation** (pregunta següent del temari) és exactament l'algorisme de *diff* que hem mencionat al punt 3: el procés pel qual React decideix què ha canviat entre dos DOMs virtuals  
* La **programació declarativa amb JSX** és la cara visible d'aquest sistema: tu escrius "com hauria de veure's" el component i React s'encarrega de tota la feina de comparació i actualització per sota  
* Els **Hooks** com `useState` són el mecanisme modern que dispara tot aquest cicle: quan canvia l'estat, és quan es genera un nou element i comença el procés de comparació al DOM virtual

## **7\. Preguntes de repàs (amb resposta)**

**1\. Per què manipular directament el DOM real és un problema de rendiment en aplicacions dinàmiques?**

Perquè cada modificació pot obligar el navegador a recalcular estils, tornar a maquetar la pàgina i repintar-la. En una SPA on l'arbre DOM és gran i canvia constantment, fer-ho de manera directa i repetida és lent i costós computacionalment.

**2\. Quina diferència hi ha entre `ReactElement` i `ReactComponent`?**

El `ReactElement` és una representació immutable i sense estat d'un node del DOM virtual: lleuger, fàcil de comparar. El `ReactComponent` és amb estat (té memòria pròpia) però no té accés directe al DOM virtual; per poder-hi entrar, es converteix primer en un (o diversos) `ReactElement`.

**3\. Quins passos segueix React des que canvia l'estat d'un component fins que es veu el canvi a la pantalla?**

L'estat canvia → el component genera un nou `ReactElement` → aquest s'insereix al nou DOM virtual → React el compara (diff) amb la versió anterior del DOM virtual → es calculen les diferències mínimes → només aquestes diferències es tradueixen a operacions reals sobre el DOM del navegador.

**4\. El DOM virtual evita que React toqui mai el DOM real?**

No. El DOM virtual no substitueix el DOM real, sinó que ajuda a decidir *quins canvis mínims* cal aplicar-hi. Al final del procés, sempre hi ha una actualització real sobre el DOM del navegador; el que canvia és que aquesta actualització és més petita i eficient.

**5\. Per què la immutabilitat dels `ReactElement` és clau per al rendiment?**

Perquè un objecte immutable es pot comparar ràpidament (per exemple, comprovant referències o propietats concretes) sense haver de vigilar canvis incontrolats. Això fa que l'algorisme de comparació entre l'estat anterior i el nou del DOM virtual sigui ràpid i predictible, que és precisament el que dona a React el seu bon rendiment.

 

