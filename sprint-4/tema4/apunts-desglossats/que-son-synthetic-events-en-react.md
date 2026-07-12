**Què son els synthetic events en React?**

**Què és un Synthetic Event**

Quan gestiones un event en React, no estàs treballant directament amb l'objecte event natiu del browser. En lloc d'això, React embolcalla cada event en un `SyntheticEvent` — un wrapper cross-browser que normalitza les propietats i el comportament dels events en diferents browsers.

En altres paraules: és una **capa d'abstracció** entre el teu codi i el sistema d'events del browser.

**Per què existeix: el problema que resol**

Diferentes browsers han implementat històricament els events de maneres lleugerament diferents. Els Synthetic Events abstrauen aquestes diferències, de manera que pots escriure codi sense preocupar-te per les inconsistències.

| // PROBLEMA sense Synthetic Events (JavaScript vanilla):element.addEventListener('click', function(e) {  // e.which → deprecated en alguns browsers  // e.keyCode → inconsistent entre browsers  // e.target → pot ser diferent en IE vs Chrome  // focus/blur → es comporta diferent entre browsers});// SOLUCIÓ amb Synthetic Events de React:\<button onClick={(e) \=\> {  // e.target → sempre consistent entre tots els browsers  // e.currentTarget → sempre funciona  // e.preventDefault() → sempre funciona igual  // e.stopPropagation() → sempre funciona igual}}\> |
| :---- |

**Event Delegation: un sol listener per a tots els events**

React no vincula directament listeners d'events a cada element del DOM. En canvi, vincula tots els listeners d'events a un sol node arrel. Quan un usuari interactua amb la pàgina i dispara un event, l'event fa bubbling fins al node arrel, on React captura l'event i l'embolcalla com a synthetic event.

| Browser: L'usuari clica un \<button\>Sense Event Delegation:            Amb Event Delegation (React):  \<div\> → listener propi            \<div id="root"\> → UN SOL listener    \<ul\> → listener propi               ↑ React captura aquí tots els events      \<li\> → listener propi             ↑ i els distribuceix internament        \<button\> → listener propi  → N listeners \= N vegades memòria  → 1 listener \= molt menys memòria |
| :---- |

A partir de React 17, el sistema d'events va ser redissenyat. La delegació d'events va moure's des del nivell `document` al container arrel (el `<div id="root">`).

**Les propietats del SyntheticEvent**

Els teus event handlers rebran instàncies de `SyntheticEvent`, un wrapper cross-browser al voltant del event natiu del browser. Té la mateixa interfície que l'event natiu del browser, incloent `stopPropagation()` i `preventDefault()`, excepte que els events funcionen idènticament a tots els browsers.

| function Inspector() {  const handleClick \= (e: React.MouseEvent\<HTMLDivElement\>) \=\> {    // Propietats estàndard (normalitzades per React):    console.log(e.type);           // "click"    console.log(e.target);         // l'element que ha disparat el click    console.log(e.currentTarget);  // l'element on s'ha adjuntat el handler    console.log(e.bubbles);        // true/false    console.log(e.timeStamp);      // quan ha ocorregut l'event    console.log(e.isTrusted);      // si l'ha disparat l'usuari o codi    // L'event natiu del browser (si el necessites específicament):    console.log(e.nativeEvent);    // l'Event original del browser    // Mètodes disponibles:    e.preventDefault();            // prevé el comportament per defecte    e.stopPropagation();          // atura el bubbling    e.isPropagationStopped();      // comprova si s'ha aturat    e.isDefaultPrevented();        // comprova si s'ha previngut el default  };  return \<div onClick={handleClick}\>Clica'm\</div\>;} |
| :---- |

**Event pooling: la història i el present**

**Abans de React 17 (important de conèixer):**

React reutilitzava objectes d'events per reduir el consum de memòria i millorar el rendiment. Després que s'executi la funció handler, l'objecte synthetic event es retorna a un pool i pot ser reutilitzat per a un altre event.

| // ❌ React \< 17: accés asíncron causava problemesfunction handleClick(e) {  setTimeout(() \=\> {    console.log(e.target.value); // → null\! L'event ja estava en el pool  }, 1000);  // Solució a React \< 17:  e.persist(); // eliminava l'event del pool  setTimeout(() \=\> {    console.log(e.target.value); // ✅ funcionava gràcies a persist()  }, 1000);} |
| :---- |

**A partir de React 17 (el comportament actual):**

L'event pooling va ser eliminat a React 17, de manera que pots accedir a les propietats dels events en callbacks asíncrons sense necessitat de cridar `e.persist()`.

| // ✅ React 17+: accés asíncron completament segurfunction handleChange(e: React.ChangeEvent\<HTMLInputElement\>) {  const valor \= e.target.value;  // Ja no cal e.persist()\!  setTimeout(() \=\> {    console.log(e.target.value); // ✅ funciona perfectament    console.log(valor);          // ✅ també funciona  }, 1000);  // fetch, promeses, etc. → tot segur  fetch('/api/cercar', { body: JSON.stringify({ q: e.target.value }) });} |
| :---- |

**`e.target` vs. `e.currentTarget`: la diferència important**

Confondre `e.target` i `e.currentTarget` és un error comú. `e.target` és l'element que ha disparat l'event (el que s'ha clicat), mentre que `e.currentTarget` és l'element al qual s'ha adjuntat el handler.

| // Exemple pràctic de la diferència:function Llista() {  const handleClick \= (e: React.MouseEvent\<HTMLUListElement\>) \=\> {    // e.currentTarget → sempre el \<ul\> (on hem posat onClick)    // e.target → el \<li\> específic que s'ha clicat (pot ser un fill)    const ul \= e.currentTarget;   // HTMLUListElement → el \<ul\>    const li \= e.target as HTMLElement; // el \<li\> clicat    console.log('Handler a:', ul.tagName);    // "UL"    console.log('Element clicat:', li.tagName); // "LI"    console.log('Text del item:', li.textContent);  };  return (    \<ul onClick={handleClick}\>   {/\* ← handler al \<ul\> \*/}      \<li\>Item 1\</li\>      \<li\>Item 2\</li\>  {/\* ← clicar aquí: target=LI, currentTarget=UL \*/}      \<li\>Item 3\</li\>    \</ul\>  );} |
| :---- |

**`e.nativeEvent`: quan necessites l'event real**

Els synthetic events son diferents dels events natius del browser i no mapegen directament. Per exemple, en l'event `onMouseLeave`, `event.nativeEvent` apuntarà a un event `mouseout`.

| // Accedir a l'event natiu quan necessites propietats específiques del browserconst handleClick \= (e: React.MouseEvent\<HTMLElement\>) \=\> {  // L'API de SyntheticEvent (cross-browser, preferida):  console.log(e.clientX, e.clientY);  // L'event natiu (quan necessites alguna cosa específica del browser):  const native \= e.nativeEvent; // MouseEvent natiu del browser  console.log(native.composedPath()); // disponible al natiu, no al synthetic}; |
| :---- |

**Resum: Native Event vs. Synthetic Event**

|  | Native Event (browser) | Synthetic Event (React) |
| ----- | ----- | ----- |
| **Origen** | El browser directament | React el crea i embolcalla |
| **Compatibilitat** | Varia per browser | Igual en tots els browsers |
| **Event Delegation** | Listener per element | Un listener a l'arrel |
| **Pooling** | No aplica | Eliminat a React 17+ |
| **Accés asíncron** | Sempre possible | Possible a React 17+ |
| **API** | `event.nativeEvent` | `e.target`, `e.preventDefault()` |
| **Tipus TypeScript** | `MouseEvent`, `KeyboardEvent`... | `React.MouseEvent<T>`, `React.ChangeEvent<T>`... |

| El flux complet d'un event en React:Usuari clica un \<button\>        ↓Browser crea un Event natiu (MouseEvent)        ↓L'event fa bubbling fins al root (\<div id="root"\>)        ↓React captura l'event al root (Event Delegation)        ↓React crea un SyntheticEvent que embolcalla el natiu        ↓React el passa al teu onClick handler        ↓Tu treballes amb el SyntheticEvent (normalitzat, tipat)        ↓React neteja l'event (React 17+: sense pooling) |
| :---- |

