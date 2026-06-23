**Quines són les diferències clau entre programació imperativa i declarativa?**

## **1\. Definició**  

* **Programació imperativa**: descrius **pas a pas, exactament com** s'ha d'aconseguir un resultat. Li dones a l'ordinador una recepta detallada d'ordres seqüencials: "fes això, després allò, després comprova si...".  
* **Programació declarativa**: descrius **què** vols obtenir, no com aconseguir-ho. Deixes que sigui el sistema (en el nostre cas, React) qui decideixi els passos concrets per arribar-hi.

Una metàfora útil: si vols demanar un cafè, l'estil **imperatiu** seria donar instruccions detallades al barista ("agafa la cafetera, posa'n dues culleradetes, escalfa l'aigua a 90 graus, aboca-la lentament..."). 

L'estil **declaratiu** seria simplement dir "vull un cafè amb llet" i confiar que el barista sap com fer-ho.

## **2\. Per què existeix / quina diferència aporta a React**

Abans de React, manipular interfícies amb JavaScript pur (o jQuery) era típicament imperatiu: calia buscar manualment cada node del DOM i decidir, pas a pas, què calia canviar-hi.

| // Estil IMPERATIU (JavaScript / jQuery vanilla)// Li diem EXACTAMENT què fer, pas a pasconst button \= document.createElement('button');button.textContent \= 'Comprar';button.className \= 'btn-primary';button.addEventListener('click', () \=\> {  alert('Comprat\!');});document.getElementById('app').appendChild(button);// Si l'estat canvia, hem de RECORDAR anar a buscar// el node concret i actualitzar-lo manualment:button.textContent \= 'Comprant...';button.disabled \= true; |
| :---- |

| // Estil DECLARATIU (React / JSX)// Diem QUÈ ha de mostrar-se, no com construir-ho pas a pasfunction BuyButton({ isLoading, onBuy }) {  return (    \<button className="btn-primary" disabled={isLoading} onClick={onBuy}\>      {isLoading ? 'Comprant...' : 'Comprar'}    \</button\>  );} |
| :---- |

En el segon cas, **mai escrius "agafa el botó i canvia el text"**. Simplement declares: "si `isLoading` és cert, el text ha de ser X; si no, ha de ser Y". 

React s'encarrega de la part mecànica (buscar el node, actualitzar-lo, fer-ho eficientment via el DOM virtual i la reconciliation que ja hem vist).

Aquesta és precisament la promesa de React que vam veure al tema del DOM virtual: React proporciona una API declarativa perquè no t'hagis de preocupar exactament de què canvia en cada actualització.

## **3\. Com es manifesta dins de React**

La declarativitat de React apareix en diversos nivells:

**A nivell de UI (JSX):** descrius l'estructura final desitjada, no els passos per construir-la.

| // Declaratiu: "si hi ha usuaris, mostra'ls; si no, mostra un missatge"function UserList({ users }) {  return (    \<ul\>      {users.length \> 0        ? users.map(u \=\> \<li key={u.id}\>{u.name}\</li\>)        : \<li\>No hi ha usuaris\</li\>      }    \</ul\>  );} |
| :---- |

**A nivell d'estat:** amb `useState`, declares "aquesta dada existeix i té aquest valor inicial", no com gestionar-la manualment en memòria.

| const \[count, setCount\] \= useState(0);// No escrius la lògica de "com" s'emmagatzema o es notifica el canvi;// només declares QUÈ vols emmagatzemar i com vols actualitzar-ho |
| :---- |

**A nivell d'efectes (`useEffect`):** fins i tot aquí, que sembla més "procedimental", la filosofia és declarativa: declares **sota quines condicions** (array de dependències) cal executar un efecte, no quan exactament cridar-lo manualment.

| useEffect(() \=\> {  document.title \= \`${count} clics\`;}, \[count\]); // "Quan count canviï, sincronitza el títol" \-- no dius quan cridar-ho |
| :---- |

## **4\. Avantatges i inconvenients**

**Avantatges de la declarativitat:**

* **Predictibilitat**: el resultat depèn únicament de l'estat i les props actuals, no d'una seqüència d'operacions prèvies difícil de seguir  
* **Llegibilitat**: el codi descriu la intenció ("què vull veure"), no detalls d'implementació que distreuen de la lògica de negoci  
* **Menys errors de sincronització**: en imperatiu, és fàcil oblidar-se d'actualitzar una part de la UI quan canvia una dada; en declaratiu, la UI sempre es deriva automàticament de l'estat  
* **Més fàcil de testejar**: si el resultat només depèn de l'entrada (estat/props), pots provar el component amb diferents valors sense simular tota una seqüència de passos

**Inconvenients / matisos:**

* **Menys control fi sobre "com" es fa la feina** per sota: si necessites optimitzar un cas molt concret, has de confiar en les eines que React et dona (memoization, `key`, etc.) en lloc de controlar-ho manualment  
* **Corba d'aprenentatge inicial**: per a algú acostumat a manipular el DOM directament, pensar "en declaratiu" (pensar en estats i resultats derivats, no en passos) requereix un canvi de mentalitat  
* **No tot és 100% declaratiu a React**: coses com `useEffect` o referències (`useRef`) sovint amaguen lògica més imperativa per sota (interactuar amb APIs externes, mesurar elements del DOM, etc.) — React és declaratiu a la superfície, però permet "baixar" a l'imperatiu quan cal

## **5\. Errors comuns / mals entesos**

* **Pensar que declaratiu vol dir "sense lògica".** Encara hi ha lògica (condicionals, mapes, càlculs), però s'expressa com a part de la descripció del resultat final, no com una seqüència d'ordres que modifiquen un estat extern pas a pas.  
* **Manipular el DOM directament dins de React (per exemple amb `document.getElementById`).** Això trenca el model declaratiu: estàs barrejant un enfocament imperatiu dins d'un sistema pensat per ser declaratiu, i pots crear inconsistències amb el que React creu que hi ha al DOM.  
* **Confondre "declaratiu" amb "automàtic sense cap configuració".** Encara cal declarar correctament les dependències (com a `useEffect`) o les claus (com `key` en llistes); declaratiu no vol dir que React endevini les teves intencions sense pistes.  
* **Creure que tot a React és pur i declaratiu.** Els Hooks com `useRef` o l'ús directe d'APIs del navegador (`localStorage`, temporitzadors, peticions de xarxa) introdueixen necessàriament un component imperatiu — React no elimina la programació imperativa, la limita i l'aïlla en punts concrets i controlats.

## **6\. Connexió amb altres conceptes del temari**

* Lliga directament amb el que ja has vist del **DOM virtual i la reconciliation**: la declarativitat és la "cara visible" que veus com a programador; el diffing i Fiber són la maquinària imperativa interna que fa possible mantenir aquesta promesa sense sacrificar rendiment  
* Prepara el terreny per a **JSX i `React.createElement`**: JSX és la sintaxi que permet escriure aquesta descripció declarativa d'una manera llegible, similar a HTML  
* Connecta amb les **funcions pures**: una funció pura és, per definició, més fàcil d'integrar en un model declaratiu, perquè el seu resultat depèn només de la seva entrada — exactament com volem que es comporti un component  
* És la base conceptual que justifica per què React recomana **composició enlloc d'herència**: la composició és una manera declarativa de descriure relacions entre components ("aquest component conté aquest altre"), mentre que l'herència sovint implica pensar en termes més procedimentals de "què fa cada classe pas a pas"

## **7\. Preguntes de repàs (amb resposta)**

**1\. Quina és la diferència fonamental entre imperatiu i declaratiu?**

L'imperatiu especifica **com** arribar a un resultat, pas a pas, amb instruccions seqüencials concretes. El declaratiu especifica **què** es vol obtenir, deixant que el sistema decideixi internament com fer-ho realitat.

**2\. Per què es diu que JSX és declaratiu?**

Perquè en JSX descrius l'estructura i l'aspecte final que ha de tenir la UI en funció de l'estat i les props actuals, sense escriure mai els passos concrets (crear node, assignar atributs, inserir-lo al DOM) que calen per construir-la realment. Aquesta feina mecànica la fa React per sota.

**3\. Posa un exemple de codi imperatiu i el seu equivalent declaratiu per mostrar/amagar un element.**

Imperatiu: `if (mostrar) { element.style.display = 'block'; } else { element.style.display = 'none'; }` — modifiques directament l'element. 

Declaratiu (React): `{mostrar && <div>Contingut</div>}` — declares que l'element existeix només si `mostrar` és cert; React decideix com reflectir-ho al DOM real.

**4\. És React 100% declaratiu? Per què sí o per què no?**

No del tot. La majoria del que escrius (JSX, estat, props) és declaratiu, però hi ha punts on cal sortir d'aquest model: per exemple, `useRef` per accedir directament a un node del DOM, o `useEffect` per sincronitzar-se amb sistemes externs (APIs, temporitzadors). 

React aïlla aquests punts imperatius en llocs controlats en lloc d'eliminar-los completament.

**5\. Per què el model declaratiu redueix els errors de sincronització de la UI?**

Perquè la interfície es deriva sempre i automàticament de l'estat actual, en lloc de dependre que el programador recordi actualitzar manualment cada part afectada quan canvia una dada. 

Com que no hi ha pas intermedi on et puguis "oblidar" d'una actualització, s'eliminen tota una categoria d'errors típics del codi imperatiu.

 

