## **Event Delegation: Un sol listener per a centenars d'elements**

**El problema: un listener per element**

Imagina una llista de 500 productes, cadascun amb un botó "Afegir al carret". L'enfocament obvi és afegir un listener a cada botó:

| // ❌ Enfocament naïf: un listener per elementconst botons \= document.querySelectorAll('.btn-afegir');botons.forEach(boto \=\> {  boto.addEventListener('click', function() {    afegirAlCarret(this.dataset.id);  });}); |
| :---- |

Amb 500 productes → 500 listeners en memòria. Afegir event listeners a múltiples elements (per exemple, centenars d'ítems d'una llista) consumeix memòria i recursos de CPU. Un sol event listener al pare redueix l'ús de memòria i accelera l'execució.

El segon problema és pitjor: si afegeixes productes dinàmicament (via API), els nous elements **no tindran listeners**.

**Com funciona: event bubbling**

Abans d'entendre la delegació, cal entendre el **bubbling**. Quan cliques en un element, l'event no s'atura allà: "puja" pel DOM fins a arribar a `document`.

| Clic a \<button\> dins d'\<li\> dins d'\<ul\>  document    ↑  \<body\>    ↑  \<ul\>          ← si posem el listener aquí, el rep    ↑  \<li\>    ↑  \<button\>      ← on l'usuari ha fet clic (event.target) |
| :---- |

Event delegation és un patró de disseny en el qual un sol event listener s'adjunta a un element ancestre comú, en lloc d'adjuntar listeners a múltiples elements fills individuals. Aquest patró aprofita la propagació d'events, específicament la fase de "bubbling", on un event viatja cap amunt de la jerarquia DOM des de l'element objectiu fins a l'arrel.

**`event.target`: qui ha disparat l'event?**

La clau de tot és la propietat `event.target`: l'element exacte on l'usuari ha fet l'acció, independentment de quin element té el listener.

| document.querySelector('ul').addEventListener('click', function(event) {  // event.target → l'element exacte que ha rebut el clic  // event.currentTarget → l'element que té el listener (el \<ul\>)  console.log(event.target);         // \<li\> o \<button\> o el que s'hagi clicat  console.log(event.currentTarget);  // sempre el \<ul\> (qui té el listener)}); |
| :---- |

**La solució: event delegation**

| // ✅ Event delegation: un sol listener, centenars d'elementsconst llista \= document.querySelector('\#llista-productes');llista.addEventListener('click', function(event) {  // Comprovem si el clic ha estat en el botó que ens interessa  if (event.target.matches('.btn-afegir')) {    const id \= event.target.dataset.id;    afegirAlCarret(id);  }}); |
| :---- |

| \<\!-- L'HTML: els botons no necessiten listeners individuals \--\>\<ul id="llista-productes"\>  \<li\>    Portàtil    \<button class="btn-afegir" data-id="1"\>\+ Carret\</button\>  \</li\>  \<li\>    Ratolí    \<button class="btn-afegir" data-id="2"\>\+ Carret\</button\>  \</li\>  \<\!-- 498 elements més... tots funcionen amb el MATEIX listener \--\>\</ul\> |
| :---- |

**`event.target` amb estructures niuades**

El problema clàssic: quan el botó conté elements fills (icones, spans), el clic pot arribar del fill i no del botó:

| \<button class="btn-eliminar" data-id="5"\>  \<svg\>...\</svg\>       \<\!-- clicar la icona → event.target és el \<svg\>\! \--\>  \<span\>Eliminar\</span\>\</button\> |
| :---- |

| // ❌ Problema: si cliquen la icona, event.target és \<svg\>, no el \<button\>llista.addEventListener('click', function(event) {  if (event.target.matches('.btn-eliminar')) {  // falla si cliquen la icona\!    eliminar(event.target.dataset.id);  }});// ✅ Solució: .closest() puja pel DOM fins trobar l'element que volemllista.addEventListener('click', function(event) {  const boto \= event.target.closest('.btn-eliminar');  if (boto) {  // si .closest() no el troba, retorna null    eliminar(boto.dataset.id);  }}); |
| :---- |

`event.target.closest(selector)` busca l'ancestre més proper que coincideix amb el selector, incloent el propi element. Si l'usuari clica la icona dins del botó, `closest('.btn-eliminar')` trobarà el botó correctament.

**Elements dinàmics: el gran avantatge**

Si s'afegeixen nous elements al DOM dinàmicament (per exemple, via AJAX o JavaScript), hereten automàticament la gestió d'events sense necessitar nous event listeners.

| // ✅ El listener al pare gestiona elements que encara no existeixenconst contenidor \= document.querySelector('\#contenidor-tasques');// Un sol listenercontenidor.addEventListener('click', function(event) {  if (event.target.matches('.btn-eliminar')) {    event.target.closest('.tasca').remove();  }  if (event.target.matches('.btn-completar')) {    event.target.closest('.tasca').classList.toggle('completada');  }});// Afegir nova tasca dinàmicament → funciona sense cap listener addicional\!function afegirTasca(text) {  contenidor.insertAdjacentHTML('beforeend', \`    \<div class="tasca"\>      \<span\>${text}\</span\>      \<button class="btn-completar"\>✓\</button\>      \<button class="btn-eliminar"\>✗\</button\>    \</div\>  \`);}afegirTasca('Aprendre event delegation');  // ← funciona automàticament\! |
| :---- |

**Exemple complet: taula de dades interactiva**

Un cas molt comú: una taula amb accions per a cada fila (editar, eliminar, veure detalls):

    

| const taula \= document.querySelector('\#taula-usuaris');taula.addEventListener('click', function(event) {  // Busquem quin botó d'acció s'ha clicat  const accio \= event.target.closest('\[data-accio\]');  if (\!accio) return;  // si no és un botó d'acció, ignorar  const fila \= accio.closest('tr');  const idUsuari \= fila.dataset.id;  const tipusAccio \= accio.dataset.accio;  // Gestionar cada acció en un sol lloc  switch (tipusAccio) {    case 'editar':      obrirFormulariEdicio(idUsuari);      break;case 'eliminar':      confirmarEliminar(idUsuari);      break;    case 'detalls':      mostrarDetalls(idUsuari);      break;  }}); |
| :---- |

| \<table id="taula-usuaris"\>  \<tbody\>    \<tr data-id="1"\>      \<td\>Anna García\</td\>      \<td\>        \<button data-accio="editar"\>Editar\</button\>        \<button data-accio="eliminar"\>Eliminar\</button\>        \<button data-accio="detalls"\>Veure\</button\>      \</td\>    \</tr\>    \<\!-- 99 files més: zero listeners addicionals \--\>  \</tbody\>\</table\> |
| :---- |

**El patró "behavior": data-attributes com a configuració**

Podem usar event delegation per afegir "comportaments" als elements de manera declarativa, amb atributs especials. Un handler a nivell de document rastreja els events i, si l'event passa en un element amb l'atribut correcte, executa l'acció.

| // Un sol handler gestiona múltiples comportaments definits amb data-attributesdocument.addEventListener('click', function(event) {  // Comportament: confirmar acció  if (event.target.dataset.confirm) {    if (\!confirm(event.target.dataset.confirm)) {      event.preventDefault();    }  }  // Comportament: toggle d'elements  const toggleId \= event.target.dataset.toggleId;  if (toggleId) {    document.getElementById(toggleId).hidden ^= 1;  }  // Comportament: copiar text al porta-retalls  if (event.target.dataset.copy) {    navigator.clipboard.writeText(event.target.dataset.copy);    event.target.textContent \= '✓ Copiat\!';    setTimeout(() \=\> event.target.textContent \= 'Copiar', 2000);  }}); |
| :---- |

| \<\!-- Ara pots afegir comportaments sense JavaScript addicional \--\>\<button data-confirm="Segur que vols eliminar?"\>Eliminar\</button\>\<button data-toggle-id="menu-lateral"\>Menú\</button\>\<button data-copy="npm install react"\>npm install react\</button\> |
| :---- |

**Limitacions: events que no fan bubbling**

No tots els events es poden delegar perquè no fan bubbling. Els events que NO fan bubbling inclouen: `focus`, `blur`, `scroll`, `mouseenter`, `mouseleave`, `resize`, etc.

| // ❌ NO funciona: focus no fa bubblingdocument.addEventListener('focus', function(event) {  // mai s'executa per als inputs fills});// ✅ Solució: usar la versió amb capture o l'equivalent que sí bubbles// focusin i focusout sí fan bubbling (alternatives a focus/blur)document.addEventListener('focusin', function(event) {  if (event.target.matches('input')) {    event.target.classList.add('actiu');  }}); |
| :---- |

**Resum: quan usar event delegation**

Event delegation és ideal per a: llistes grans o contingut generat dinàmicament, gestió reutilitzable d'events per a molts elements, i gestionar interaccions de l'usuari eficientment. 

S'ha d'evitar quan: els events no fan bubbling (focus, blur, mouseenter), o quan cal una targeta precisa en elements amb comportaments molt diferentes.

|  | Listeners individuals | Event Delegation |
| ----- | ----- | ----- |
| **Listeners al DOM** | Un per element (500 \= 500 listeners) | Un al contenidor pare |
| **Memòria** | Alta | Mínima |
| **Elements dinàmics** | Cal afegir listener manualment | Funciona automàticament |
| **Neteja (removeEventListener)** | Cal netejar cada un | Un sol removeEventListener |
| **Codi** | Repetitiu i dispers | Centralitzat i mantenible |
| **Quan NO usar** | Elements molt específics | Events sense bubbling (focus, blur) |

