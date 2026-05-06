## **Estratègies per identificar l'origen de "Cannot read property X of null"**

**Entendre l'error exactament**

L'error `TypeError: Cannot read properties of null (reading 'X')` és un dels més freqüents en JavaScript. El missatge és completament literal: estàs intentant accedir a la propietat `X` d'una variable que val `null`. En JavaScript, `null` i `undefined` no tenen propietats, de manera que qualsevol intent d'accedir-hi llança aquest error.

La distinció important: si l'error diu `of null` la variable té el valor `null` explícit. Si diu `of undefined` la variable mai s'ha assignat o no existeix. Les solucions són pràcticament les mateixes però les causes poden ser lleugerament diferent.

**Estratègia 1: Llegir el stack trace i anar directament a la línia**

El primer pas sempre és llegir l'error sencer a la consola. No el primer missatge: el stack trace complet.

TypeError: Cannot read properties of null (reading 'textContent')  
    at actualitzarUI (app.js:47:18)          ← línia 47, columna 18  
    at processarResposta (app.js:32:5)  
    at fetch.then (api.js:15:3)

Llegit de dalt a baix: la funció `actualitzarUI` a la línia 47 del fitxer `app.js` ha intentat accedir a `.textContent` d'alguna cosa que era `null`. `actualitzarUI` va ser cridada des de `processarResposta`.

Usa les eines de debugging del navegador: posa un breakpoint a la línia anterior a l'error. Quan l'execució es pausi, posa el cursor sobre la variable o inspecciona-la al panell "Scope" per veure el seu valor. Un cop sàpigues quina variable és `null`, pots aplicar la solució adequada.

**Estratègia 2: Identificar quina variable és null**

A la línia indicada pel stack trace, identifica totes les variables que s'usen. La que és `null` és la culpable.

| // Error a la línia 47:document.querySelector('\#total').textContent \= resultat;//       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ → pot ser null |
| :---- |

Quan tens una cadena com `a.b.c`, qualsevol element de la cadena pot ser `null`:

| // Error: Cannot read properties of null (reading 'nom')// A quina línia exacta?const nom \= usuari.perfil.nom;//          ^^^^^^ → usuari podria ser null?//                 ^^^^^^ → perfil podria ser null? |
| :---- |

**La tècnica del console.log progressiu:**

| // Afegeix console.log per a cada pas de la cadenaconsole.log('usuari:', usuari);                // → null? undefined? objecte?console.log('usuari.perfil:', usuari?.perfil); // → null? objecte?console.log('nom:', usuari?.perfil?.nom);       // → el valor final |
| :---- |

**Estratègia 3: Les tres causes principals i com identificar-les**

### **Causa A: Element del DOM que no existeix**

La causa més freqüent. `document.querySelector()` retorna `null` si el selector no troba cap element.

| // ❌ Problema: l'element no existeix al DOMconst boto \= document.querySelector('\#boto-enviar');// Si l'HTML té id="boton-enviar" (en castellà), boto \=== nullboto.addEventListener('click', enviar);// → TypeError: Cannot read properties of null (reading 'addEventListener') |
| :---- |

**Com diagnosticar-ho:**

| // 1\. A la consola del navegador, prova el selector manualment:document.querySelector('\#boto-enviar')// → null (no troba res) ← aquí tens el problema// 2\. Comprova l'HTML: hi ha un error tipogràfic al id?// 3\. Comprova si l'element existeix realment al DOM |
| :---- |

**Les raons per les quals un element pot ser null:**

* L'id té un error tipogràfic (`#boto-enviar` vs `#boton-enviar`)  
* L'element no existeix a la pàgina  
* El JavaScript s'executa **abans** que l'HTML estigui carregat

La solució més comuna és embolicar el codi JavaScript dins d'un event listener `DOMContentLoaded` o col·locar el tag `<script>` al final del `<body>`.

| \<\!-- ❌ Script al HEAD: l'HTML no ha carregat quan s'executa \--\>\<head\>  \<script src="app.js"\>\</script\>  \<\!-- querySelector retorna null\! \--\>\</head\>\<body\>  \<button id="boto-enviar"\>Enviar\</button\>\</body\>\<\!-- ✅ Opció 1: script al final del body \--\>\<body\>  \<button id="boto-enviar"\>Enviar\</button\>  \<script src="app.js"\>\</script\>  \<\!-- l'HTML ja existeix ✅ \--\>\</body\> |
| :---- |

| // ✅ Opció 2: esperar DOMContentLoadeddocument.addEventListener('DOMContentLoaded', function() {  const boto \= document.querySelector('\#boto-enviar');  if (boto) {    boto.addEventListener('click', enviar);  }}); |
| :---- |

**Causa B: Dades de l'API que no han carregat encara (race condition)**

El JavaScript és asíncron. El component intenta accedir a les dades abans que hagin arribat de l'API.

| // ❌ Problema: race conditionlet usuari \= null;  // inicialment nullasync function carregarUsuari() {  usuari \= await fetch('/api/usuari').then(r \=\> r.json());}carregarUsuari();  // crida asíncrona → no espera\!// Això s'executa IMMEDIATAMENT, abans que l'API responguiconsole.log(usuari.nom);  // → TypeError: null.nom |
| :---- |

**Com diagnosticar-ho:** afegeix un `console.log` just abans de l'error i veuràs `null` en lloc de les dades esperades.

| // ✅ Solució: esperar les dadesasync function carregarUsuari() {  const usuari \= await fetch('/api/usuari').then(r \=\> r.json());  // Ara sí pots usar usuari perquè ja ha arribat  mostrarPerfil(usuari);}// O en React: comprova l'estat de càrregafunction Component({ usuariId }) {  const \[usuari, setUsuari\] \= useState(null);  if (\!usuari) return \<div\>Carregant...\</div\>;  // guard clause  return \<div\>{usuari.nom}\</div\>;               // aquí ja existeix} |
| :---- |

**Causa C: Resposta de l'API diferent de l'esperada**

L'API retorna `null`, un array buit o un format diferent del que esperes.

| // ❌ Problema: l'API pot retornar null si l'usuari no existeixconst resposta \= await fetch('/api/usuari/99999');const usuari \= await resposta.json();  // → null (id no existeix)console.log(usuari.nom);  // → TypeError: Cannot read properties of null |
| :---- |

**Com diagnosticar-ho:** afegeix un `console.log` de la resposta crua just after the fetch:

| const resposta \= await resposta.json();console.log('Resposta API:', resposta);  // → null, {}, \[\], o dades? |
| :---- |

**Estratègia 4: El patró de protecció sistemàtica**

Un cop has identificat la causa, apliques la protecció adequada:

**Optional Chaining `?.`** — la solució més elegant per a propietats anidades:

| // Accés segur a qualsevol profunditatconst carrer \= usuari?.adreca?.carrer;  // undefined si qualsevol part és nullconst longitud \= llista?.length ?? 0;   // 0 si llista és null/undefined |
| :---- |

**Guard clause amb early return:**

| // ✅ Sortida ràpida si les dades no estan llestesfunction mostrarPerfil(usuari) {  if (\!usuari) {    console.warn('usuari és null o undefined');    return;  }  // A partir d'aquí, usuari sempre existeix  document.querySelector('\#nom').textContent \= usuari.nom;} |
| :---- |

**Comprovació explícita de l'element DOM:**

| // ✅ Comprova sempre que l'element existeixfunction actualitzarTotal(valor) {  const element \= document.querySelector('\#total');  if (\!element) {    console.error('Element \#total no trobat al DOM');    return;  }  element.textContent \= valor;} |
| :---- |

**Flux complet d'investigació**

| Error: Cannot read properties of null (reading 'nom')         ↓1\. Llegir el stack trace → identificar fitxer i línia         ↓2\. Anar a aquella línia al codi   → Quines variables s'usen?   → Quina pot ser null?         ↓3\. Afegir console.log just before per confirmar   console.log('variable:', variable)  → null         ↓4\. Preguntar: d'on ve aquesta variable?   ├── Selector DOM (\#id) → el selector troba res?   │   → F12 → Console → provar el selector manualment   ├── Dades de l'API → han carregat?   │   → console.log just after the fetch   └── Propietat d'un objecte → l'objecte existeix?       → console.log l'objecte pare         ↓5\. Aplicar la protecció adequada:   ├── DOM: DOMContentLoaded \+ comprovació if(element)   ├── API async: await correcte \+ guard clause   └── Propietat: Optional Chaining ?. |
| :---- |

**Com evitar-lo de forma preventiva**

| // ✅ Fail Fast \+ Optional Chaining: la combinació perfecta// Per a elements DOM: sempre comprova si existeixconst element \= document.querySelector('\#meu-element');if (\!element) throw new Error('Element \#meu-element no trobat');// Per a dades de l'API: usa valors per defecteconst { nom \= '', email \= '' } \= usuari ?? {};// Per a propietats anidades: optional chainingconst pais \= usuari?.adreca?.pais ?? 'Desconegut';// Per a arrays que poden ser null: coalescència nul·laconst productes \= resposta?.productes ?? \[\];productes.forEach(p \=\> console.log(p.nom)); |
| :---- |

