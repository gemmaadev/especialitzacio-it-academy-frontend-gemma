**Quina diferència hi ha entre la gestió d'esdeveniments en HTML i en React?**

**Documentació d'Esdeveniments en React**  
[https://react.dev/learn/responding-to-events](https://react.dev/learn/responding-to-events)  
Guia oficial de React per gestionar esdeveniments en components.

 **La diferència fonamental: sintaxi i filosofia**

En HTML estàndard, els events s'afegeixen com a atributs amb strings. En React, els events s'afegeixen com a **props amb funcions** directament al JSX. La diferència no és únicament de sintaxi: reflecteix dues filosofies completament diferents.

**Diferència 1: Sintaxi dels noms dels events**

| \<\!-- HTML: minúscules, valor és un string \--\>\<button onclick="handleClick()"\>Clic\</button\>\<input onchange="handleChange()" /\>\<form onsubmit="handleSubmit()"\> |
| :---- |

| // React: camelCase, valor és una funció (no un string)\<button onClick={handleClick}\>Clic\</button\>\<input onChange={handleChange} /\>\<form onSubmit={handleSubmit}\> |
| :---- |

Tots els noms d'events en React usen camelCase: `onClick`, `onChange`, `onSubmit`, `onMouseEnter`, `onKeyDown`, `onFocus`, `onBlur`...

**Diferència 2: Passar la funció, NO cridar-la**

Aquesta és la confusió més freqüent i el pitfall que la documentació oficial de React ressalta explícitament:

| // ✅ CORRECTE: passes la funció com a referència\<button onClick={handleClick}\>     // React la cridarà quan l'usuari cliqui\<button onClick={() \=\> alert('\!')} // funció anònima passada com a referència// ❌ INCORRECTE: crides la funció immediatament en el renderitzat\!\<button onClick={handleClick()}\>   // s'executa en RENDER, no en clic\<button onClick={alert('\!')} \>     // s'executa en RENDER, no en clic |
| :---- |

La diferència és subtil però crítica. En el primer exemple (`handleClick`), React recorda la funció i la crida quan l'usuari clica. En el segon (`handleClick()`), el `()` dispara la funció immediatament durant el renderitzat, sense cap clic.

**Diferència 3: Event Listeners declaratius vs. imperatius**

| // HTML \+ JavaScript vanilla: imperatiu// Has d'accedir al DOM i afegir l'event listener manualmentconst boto \= document.getElementById('myBtn');boto.addEventListener('click', function() {  alert('Clic\!');});// Problema: has de gestionar tu el cicle de vida// → afegir el listener quan el component es munta// → eliminar-lo quan es desmunta (memory leaks\!) |
| :---- |

| // React: declaratiu// L'event handler és part del component, React gestiona el cicle de vidafunction Button() {  function handleClick() {    alert('Clic\!');  }  return \<button onClick={handleClick}\>Clic\</button\>;  // → React afegeix i elimina l'event listener automàticament  // → quan el component desapareix, el listener desapareix} |
| :---- |

**Diferència 4: Els Synthetic Events de React**

React no adjunta els event listeners directament a cada element del DOM. En lloc d'això, usa un sol event listener al nivell arrel del document (event delegation). 

Quan un event ocorre, React el captura i crea un **Synthetic Event**: un wrapper normalitzat que funciona igual a tots els navegadors.

| function Input() {  function handleChange(e) {    // 'e' és un SyntheticEvent de React, no l'Event natiu del browser    console.log(e.target.value);     // funciona igual en tots els browsers    console.log(e.nativeEvent);      // l'event natiu del browser (si el necessites)    // Propietats estàndard disponibles:    e.preventDefault();              // prevenir comportament per defecte    e.stopPropagation();             // aturar la propagació    e.target                         // element que ha disparat l'event    e.currentTarget                  // element on s'ha adjuntat el handler  }  return \<input onChange={handleChange} /\>;} |
| :---- |

**Diferència 5: Accés a props i state des del handler**

En HTML \+ JavaScript vanilla, les funcions d'event sovint necessiten accedir a variables globals o al DOM per obtenir context. En React, els handlers es declaren **dins del component** i tenen accés directe a totes les props i variables de l'àmbit del component.

| // React: accés directe a props i state des del handlerfunction AlertButton({ message, children }) {  return (    \<button onClick={() \=\> alert(message)}\>      {/\* El handler accedeix directament a la prop 'message' \*/}      {children}    \</button\>  );}// Ús:\<AlertButton message="S'està reproduint\!"\>Reprodueix\</AlertButton\>\<AlertButton message="S'està pujant\!"\>Puja imatge\</AlertButton\>// Cada botó mostra el SEU missatge sense cap referència al DOM |
| :---- |

**Diferència 6: Event Handlers com a props**

En HTML, no pots passar un event handler d'un element a un altre de manera declarativa. En React, els handlers son simplement funcions que es passen com a props:

| // React: els event handlers flueixen de pare a fill com qualsevol propfunction Button({ onClick, children }) {  // ← rep el handler com a prop  return (    \<button onClick={onClick}\>      {children}    \</button\>  );}function PlayButton({ movieName }) {  function handlePlayClick() {    alert(\`Reproduint ${movieName}\!\`);  }  return (    \<Button onClick={handlePlayClick}\>  {/\* ← passa el handler al fill \*/}      Reprodueix "{movieName}"    \</Button\>  );}// Convenció: les props d'event handler de components propis// comencen per 'on' \+ lletra majúscula\<Toolbar onPlayMovie={...} onUploadImage={...} /\> |
| :---- |

**Diferència 7: `e.preventDefault()` vs. `return false`**

En JavaScript vanilla, pots usar `return false` dins d'un handler inline per prevenir el comportament per defecte. En React, `return false` **no funciona**: cal usar sempre `e.preventDefault()` explícitament.

| \<\!-- HTML: 'return false' funciona en handlers inline \--\>\<form onsubmit="return false"\>  \<button\>Enviar\</button\>\</form\>// ❌ React: 'return false' NO prevé el comportament per defecte\<form onSubmit={() \=\> { return false; }}\>// ✅ React: cal usar explícitament e.preventDefault()\<form onSubmit={(e) \=\> {  e.preventDefault();  // ← necessari per evitar la recàrrega de la pàgina  alert('Enviat\!');}}\>  \<input /\>  \<button\>Enviar\</button\>\</form\> |
| :---- |

**Diferència 8: Side Effects en Event Handlers**

A diferència de les funcions de renderitzat que han de ser pures, els event handlers poden tenir efectes secundaris (side effects). Son el lloc ideal per modificar dades, fer crides a APIs, actualitzar l'estat:

| // Els event handlers NO necessiten ser purs// Son el lloc correcte per a side effectsfunction FormulariComanda() {  function handleEnviar(e) {    e.preventDefault();    // ✅ Side effects totalment vàlids en event handlers:    fetch('/api/comandes', { method: 'POST', body: JSON.stringify(dades) });    localStorage.setItem('ultimaComanda', JSON.stringify(dades));    analytics.track('comanda\_enviada');  }  return \<form onSubmit={handleEnviar}\>...\</form\>;} |
| :---- |

**Resum: la taula de diferències HTML vs. React**

| Aspecte | HTML | React |
| ----- | ----- | ----- |
| **Sintaxi** | `onclick="..."` (minúscules, string) | `onClick={...}` (camelCase, funció) |
| **Valor** | String amb codi JS | Referència a funció |
| **Event listeners** | Imperatius (`addEventListener`) | Declaratius (prop al JSX) |
| **Cicle de vida** | Manual (afegir/eliminar) | Automàtic (React ho gestiona) |
| **Event object** | Event natiu del browser | SyntheticEvent (normalitzat) |
| **`return false`** | Para propagació \+ default | ❌ No funciona en React |
| **`e.preventDefault()`** | Opcional (return false funciona) | ✅ Obligatori |
| **Accés al context** | Variables globals o DOM | Props i state directament |
| **Passar handlers** | No declarativament | Via props com qualsevol valor |

