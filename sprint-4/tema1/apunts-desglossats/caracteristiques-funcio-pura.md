**Quines són les característiques d'una funció pura (idempotència, sense efectes secundaris)?**

**Pure Functions in React**   
[https://react.dev/learn/keeping-components-pure](https://react.dev/learn/keeping-components-pure)   
Article sobre components funcionals purs i bones pràctiques a React.

## **1\. Definició** 

En ciència de la computació (i especialment al món de la programació funcional), una funció pura és una funció amb les característiques següents: es preocupa només dels seus propis assumptes (no canvia cap objecte o variable que existia abans de ser cridada), i donada la mateixa entrada, sempre retorna el mateix resultat.

Ja deus conèixer un exemple de funció pura: les fórmules matemàtiques. Pensa en la fórmula y \= 2x. Si x \= 2, llavors y \= 4\. Sempre. Si x \= 3, llavors y \= 6\. Sempre. Si x \= 3, y no serà de vegades 9, o \-1, o 2.5 depenent de l'hora del dia o de l'estat de la borsa.

React està dissenyat al voltant d'aquest concepte: React assumeix que cada component que escrius és una funció pura, el que vol dir que els teus components React han de retornar sempre el mateix JSX donades les mateixes entrades (props i estat).

## **2\. Les dues característiques fonamentals (desglossades)**

**A) Idempotència / "Es preocupa només dels seus propis assumptes" (sense efectes secundaris)**

Una funció pura **no modifica res que existís abans que es cridés**: no canvia variables externes, no toca el DOM directament, no modifica objectes que li han passat com a paràmetre.

| // ❌ IMPURA: modifica un array que ja existia abans de cridar la funciófunction addItem(cart, item) {  cart.push(item); // muta l'array original\!  return cart;}// ✅ PURA: crea un array NOU, no toca l'originalfunction addItem(cart, item) {  return \[...cart, item\];} |
| :---- |

**B) "Mateixa entrada, mateixa sortida" (determinisme)**

Donats els mateixos arguments, una funció pura **sempre** retorna exactament el mateix resultat, sense importar quantes vegades la cridis ni en quin moment ho facis.

| // ❌ IMPURA: el resultat depèn de quelcom extern a l'entrada (Math.random, Date.now...)function Greeting() {  const randomGuest \= Math.floor(Math.random() \* 10);  return \<h1\>Hola, convidat \#{randomGuest}\</h1\>;}// ✅ PURA: el resultat depèn EXCLUSIVAMENT de les props rebudesfunction Greeting({ guestNumber }) {  return \<h1\>Hola, convidat \#{guestNumber}\</h1\>;} |
| :---- |

## **3\. Com es manifesta dins de React: l'exemple clàssic**

La documentació oficial il·lustra aquest problema amb un cas molt didàctic: un component que va acumulant un comptador extern.

| // ❌ IMPUR: utilitza i modifica una variable externa al componentlet guest \= 0;function Cup() {  // Mala pràctica: canviar una variable que ja existia abans\!  guest \= guest \+ 1;  return \<h2\>Tassa de te per al convidat \#{guest}\</h2\>;}export default function TeaSet() {  return (    \<\>      \<Cup /\>      \<Cup /\>      \<Cup /\>    \</\>  );}// Resultat esperat: Convidat \#1, \#2, \#3// Resultat real amb Strict Mode: Convidat \#2, \#4, \#6 (\!) |
| :---- |

React ofereix un "Strict Mode" en el qual crida la funció de cada component dues vegades durant el desenvolupament. En cridar les funcions de component dues vegades, Strict Mode ajuda a trobar components que trenquen aquestes regles. 

Fixa't com l'exemple original mostrava "Convidat \#2", "Convidat \#4" i "Convidat \#6" en lloc de "Convidat \#1", "Convidat \#2" i "Convidat \#3" — la funció original era impura, i cridar-la dues vegades la va trencar.

| // ✅ PUR: cada Cup rep la seva pròpia dada com a prop, no toca res externfunction Cup({ guest }) {  return \<h2\>Tassa de te per al convidat \#{guest}\</h2\>;}export default function TeaSet() {  return (    \<\>      \<Cup guest={1} /\>      \<Cup guest={2} /\>      \<Cup guest={3} /\>    \</\>  );}// Funciona correctament SEMPRE, fins i tot si es crida dues vegades:// 1, 2, 3 \-- perquè cridar dues vegades una funció pura no canvia res |
| :---- |

La versió arreglada (pura) funciona encara que la funció es cridi dues vegades cada vegada. 

Les funcions pures només calculen, així que cridar-les dues vegades no canvia res — exactament igual que cridar double(2) dues vegades no canvia el que retorna, i resoldre y \= 2x dues vegades no canvia el valor de y.

## **4\. On han d'anar, doncs, els efectes secundaris?**

A React, els efectes secundaris normalment pertanyen dins dels manejadors d'esdeveniments (event handlers). 

Els event handlers són funcions que React executa quan fas alguna acció — per exemple, quan cliques un botó. 

Encara que els event handlers estan definits dins del teu component, no s'executen durant el renderitzat\! Per tant, els event handlers no necessiten ser purs.

| function BuyButton() {  function handleClick() {    // ✅ Correcte: això és un side-effect, però viu dins un event handler,    // no durant el render del component    fetch('/api/comprar', { method: 'POST' });    console.log('Compra registrada');  }  return \<button onClick={handleClick}\>Comprar\</button\>; // El render en si és pur} |
| :---- |

Si has esgotat totes les altres opcions i no pots trobar l'event handler adequat per al teu efecte secundari, encara pots adjuntar-lo al teu JSX retornat amb una crida a `useEffect` dins del teu component. 

Això li diu a React que l'executi més tard, després del renderitzat, quan els efectes secundaris estan permesos. Tot i això, aquest enfocament hauria de ser el teu últim recurs.

| // useEffect: últim recurs per a side-effects, NO la primera opciófunction Greet({ name }) {  const message \= \`Hola, ${name}\!\`; // Càlcul pur de l'output  useEffect(() \=\> {    document.title \= \`Salutacions a ${name}\`; // Side-effect, aïllat fora del render  }, \[name\]);  return \<div\>{message}\</div\>;} |
| :---- |

## **5\. El concepte relacionat: "almost-pure" components**

No tots els components reals poden ser 100% purs (per exemple, els que fan peticions de xarxa). 

Per a aquests casos existeix una categoria intermèdia útil: un component pur sempre renderitza els mateixos elements pels mateixos valors de props; un component "gairebé pur" sempre renderitza els mateixos elements pels mateixos valors de props, però pot produir un efecte secundari.

Un cas típic: un component que en muntar-se fa una petició de xarxa per obtenir informació (com el temps) és impur, perquè per a la mateixa entrada produeix sortides diferents — el que es renderitza depèn de la resposta del servidor. 

Aquest efecte secundari de la petició HTTP no es pot eliminar del tot, ja que obtenir dades del servidor és la responsabilitat directa del component. 

Tot i això, pots fer que renderitzi la mateixa sortida pels mateixos valors de props, aïllant l'efecte secundari en una crida de funció separada (com `fetch()`) — aquest tipus de component s'anomena "gairebé pur".

## **6\. Avantatges i inconvenients**

**Avantatges (per què val la pena escriure components purs):**

* Escrivint estrictament els teus components només com a funcions pures, pots evitar tota una classe d'errors confusos i comportaments impredictibles a mesura que el teu codi base creix  
* Les funcions pures no tenen efectes secundaris i no depenen d'estat global; la seva única font de veritat són els paràmetres — per això són predictibles i determinades, reutilitzables i senzilles de testejar  
* **Possibilitat d'executar-se en entorns diferents**: escriure funcions pures requereix certa disciplina i hàbit, però també desbloqueja oportunitats meravelloses: els teus components podrien executar-se en un entorn diferent — per exemple, al servidor\! (és exactament el que fa possible el Server-Side Rendering)  
* **Optimitzacions de rendiment automàtiques**: en saber que un component és pur, React (amb `React.memo` o `PureComponent`) pot saltar-se re-renderitzats innecessaris quan les props no han canviat

**Inconvenients / cost a assumir:**

* Requereix **disciplina conscient**: és fàcil "filtrar" lògica impura sense voler (per exemple, cridant `Math.random()` o `Date.now()` directament dins del render)  
* A vegades **és impossible ser 100% pur** (peticions de xarxa, lectura de `localStorage`...), i cal aprendre a aïllar correctament aquesta part impura en lloc d'eliminar-la del tot  
* Si abuses de `useEffect` per "arreglar" qualsevol impuresa enlloc de repensar el disseny, pots acabar amb codi més complex i difícil de seguir del que calia

## **7\. Errors comuns / mals entesos**

* **Pensar que "pur" vol dir "sense estat".** Un component pot tenir estat (via `useState`) i seguir sent pur: el que importa és que, donat el mateix valor d'estat i les mateixes props en un instant concret, el resultat renderitzat sigui sempre el mateix.  
* **Modificar variables o objectes que venen de fora del component durant el render.** És l'error més típic (com l'exemple de `guest = guest + 1`): sembla innocu, però trenca la garantia de puretat i provoca bugs subtils, especialment notoris amb Strict Mode.  
* **Posar efectes secundaris directament al cos del component, en lloc d'un event handler o `useEffect`.** Si el component fa càlculs que no apunten directament al valor de sortida, aquests càlculs s'anomenen efectes secundaris i no haurien de viure al cos principal del render.  
* **Creure que `useEffect` és la primera eina a fer servir per a qualsevol lògica "extra".** Com hem vist al punt 4, és literalment **l'últim recurs** recomanat oficialment, no la solució per defecte.

## **8\. Connexió amb altres conceptes del temari**

* Aquest tema connecta directament amb la **programació declarativa**: una funció pura és l'eina perfecta per a un model declaratiu, perquè et permet descriure "què s'ha de mostrar donades aquestes dades" sense preocupar-te de seqüències ni d'ordre d'execució  
* Es relaciona amb el **DOM virtual i la reconciliation**: la comparació eficient d'arbres (diffing) que vam veure només té sentit i és fiable si els components són purs — si el mateix component poguès retornar coses diferents sense que les props canviessin, l'optimització de React perdria tota la seva lògica  
* Anticipa els **Hooks**: `useState` introdueix l'estat d'una manera controlada perquè els components segueixin sent purs respecte a ell, i `useEffect` és precisament el mecanisme oficial per aïllar els efectes secundaris fora del cicle de render pur  
* Es relaciona amb **`React.memo`** i l'optimització de rendiment: només té sentit memoitzar un component (saltar-se re-renders) si saps que és pur — si no ho fos, memoitzar-lo podria amagar bugs greus en lloc d'optimitzar res

## **9\. Preguntes de repàs** 

**1\. Quines són les dues característiques que defineixen una funció pura?**

Que no modifica res que existia abans de ser cridada (sense efectes secundaris / "es preocupa dels seus propis assumptes") i que, donada la mateixa entrada, sempre retorna exactament la mateixa sortida (determinisme).

**2\. Per què Strict Mode de React crida els components dues vegades durant el desenvolupament?**

Precisament per detectar impureses: si un component és pur, cridar-lo dues vegades no canvia res en el resultat. Si és impur (per exemple, modifica una variable externa), cridar-lo dues vegades produirà resultats incorrectes o inesperats, exposant el bug abans que arribi a producció.

**3\. On haurien d'anar els efectes secundaris dins d'un component React, i quina és l'opció recomanada com a últim recurs?**

Idealment, dins d'event handlers (que només s'executen en resposta a una acció de l'usuari, no durant el render). Si això no és possible, l'últim recurs és `useEffect`, que executa el codi després del renderitzat, en un moment en què els efectes secundaris ja estan permesos.

**4\. Què diferencia un component "pur" d'un component "gairebé pur"?**

Un component pur sempre retorna els mateixos elements per als mateixos props, sense excepcions. Un component "gairebé pur" també retorna sempre el mateix per als mateixos props, però internament pot produir un efecte secundari (com una petició de xarxa) que s'aïlla correctament fora del càlcul de la sortida visual.

**5\. Per què la puretat dels components és important per al rendiment de React (per exemple, amb `React.memo`)?**

Perquè les optimitzacions com `React.memo` es basen en la premissa de "si les props no han canviat, no cal tornar a renderitzar". Aquesta premissa només és certa i segura si el component és pur: si depengués de quelcom extern a les seves props, saltar-se el re-render podria mostrar informació desactualitzada o incorrecta.

 

