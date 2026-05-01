## **Async/Await i Try/Catch: operacions asíncrones**

**El problema: el codi asíncron és difícil de llegir**

JavaScript és single-threaded: executa una cosa a la vegada. Però moltes operacions necessiten temps (crida a una API, llegir un fitxer, un temporitzador): no pots bloquejar tot el programa esperant. La solució ha evolucionat en tres etapes: callbacks → Promises → async/await.

**L'evolució: de callbacks a async/await**

**Callbacks: el "callback hell"**

| // Obtenir usuari → els seus posts → els comentaris del primer post// Cada operació depèn de l'anterior → indentat infernalobtenirUsuari(1, function(error, usuari) {  if (error) { gestorError(error); return; }  obtenirPosts(usuari.id, function(error, posts) {    if (error) { gestorError(error); return; }    obtenirComentaris(posts\[0\].id, function(error, comentaris) {      if (error) { gestorError(error); return; }      console.log(comentaris);   // ← finalment\!    });  });}); |
| :---- |

**Promises: millora, però encadenament complex**

| obtenirUsuari(1)  .then(usuari \=\> obtenirPosts(usuari.id))  .then(posts \=\> obtenirComentaris(posts\[0\].id))  .then(comentaris \=\> console.log(comentaris))  .catch(error \=\> gestorError(error)); |
| :---- |

**Async/Await: llegible com a codi síncron**

| async function carregarDades() {  const usuari \= await obtenirUsuari(1);  const posts \= await obtenirPosts(usuari.id);  const comentaris \= await obtenirComentaris(posts\[0\].id);  console.log(comentaris);} |
| :---- |

**`async` i `await`: com funcionen**

La paraula clau `async` davant d'una funció fa dues coses: permet usar `await` dins, i fa que la funció **sempre retorni una Promise** (fins i tot si retornes un valor simple).

`await` para l'execució de la funció `async` fins que la Promise es resol o es rebutja. El codi que ve **après** l'`await` és equivalent al `.then()` d'una Promise.

| // async sempre retorna una Promiseasync function getNumber() {  return 42;}getNumber().then(n \=\> console.log(n));  // 42// await espera la Promiseasync function exemple() {  const resultat \= await getNumber();  // espera fins que es resol  console.log(resultat);               // 42  console.log('Això s\\'executa DESPRÉS');}console.log('Això s\\'executa ABANS');exemple();// Output: 'Això s'executa ABANS', 42, 'Això s'executa DESPRÉS' |
| :---- |

**`try/catch`: capturar errors de manera llegible**

Async/await permet usar la sintaxi familiar `try/catch` i gestionar els errors exactament al punt on poden ocórrer. Pots tenir múltiples blocs `try/catch` per a diferents escenaris d'error, i la lògica de gestió d'errors és co-localitzada amb el codi que pot llançar l'error.

| async function obtenirProducte(id) {  try {    // Tot el que pot fallar va dins del try    const resposta \= await fetch(\`https://api.exemple.com/productes/${id}\`);    // ⚠️ fetch() no llança error per HTTP 404 o 500: cal comprovar response.ok    if (\!resposta.ok) {      throw new Error(\`Error HTTP: ${resposta.status}\`);    }    const producte \= await resposta.json();    return producte;  } catch (error) {    // Captura TOTS els errors: de xarxa, de JSON, de l'if de dalt...    console.error('Error obtenint producte:', error.message);    return null;  // valor de fallback  }} |
| :---- |

**El bloc `finally`: sempre s'executa**

`finally` s'executa tant si hi ha error com si no. Perfecte per a netejar recursos, ocultar loaders o tancar connexions:

| async function carregarUsuaris() {  mostrarLoader(true);  // mostrar spinner  try {    const resposta \= await fetch('/api/usuaris');    if (\!resposta.ok) throw new Error(\`Error: ${resposta.status}\`);    const dades \= await resposta.json();    mostrarUsuaris(dades);  } catch (error) {    mostrarMissatgeError('No s\\'han pogut carregar els usuaris');    console.error(error);  } finally {    mostrarLoader(false);  // ← SEMPRE s'executa, amb o sense error  }} |
| :---- |

**Crida a una API: el patró complet i professional**

| // Funció reutilitzable per a qualsevol crida a APIasync function fetchAPI(url, opcions \= {}) {  try {    const resposta \= await fetch(url, {      headers: { 'Content-Type': 'application/json' },      ...opcions    });    // fetch no llança error per respostes 4xx o 5xx    if (\!resposta.ok) {      throw new Error(\`HTTP ${resposta.status}: ${resposta.statusText}\`);    }    return await resposta.json();  } catch (error) {    // Diferenciar error de xarxa vs. error HTTP    if (error.name \=== 'TypeError') {      throw new Error('Error de xarxa: comprova la connexió');    }    throw error;  // rellançar per a qui cridi la funció  }}// Usar la funció reutilitzableasync function carregarProductes() {  try {    const productes \= await fetchAPI('/api/productes');    mostrarProductes(productes);  } catch (error) {    mostrarError(error.message);  }} |
| :---- |

**Peticions en paral·lel: `Promise.all`**

`await` en seqüència executa les peticions una darrere l'altra. Si les peticions no depenen les unes de les altres, cal executar-les en **paral·lel** amb `Promise.all`:

| // ❌ En seqüència: innecessàriament lent// Si cada crida triga 1s → total 3sasync function carregarDadesLent() {  const usuari   \= await fetch('/api/usuari');    // 1s  const productes \= await fetch('/api/productes'); // 1s més  const comandes  \= await fetch('/api/comandes');  // 1s més  // Total: \~3 segons}// ✅ En paral·lel: molt més ràpid// Les tres peticions s'envien alhora → total \~1sasync function carregarDadesRapid() {  try {    const \[usuari, productes, comandes\] \= await Promise.all(\[      fetch('/api/usuari').then(r \=\> r.json()),      fetch('/api/productes').then(r \=\> r.json()),      fetch('/api/comandes').then(r \=\> r.json()),    \]);    mostrarDashboard(usuari, productes, comandes);  } catch (error) {    // Si QUALSEVOL petició falla, arriba aquí    console.error('Una de les peticions ha fallat:', error);  }} |
| :---- |

Si vols que totes completin independentment (i gestionar cada error per separat), usa `Promise.allSettled`:

| const resultats \= await Promise.allSettled(\[  fetch('/api/usuari').then(r \=\> r.json()),  fetch('/api/productes').then(r \=\> r.json()),\]);resultats.forEach(resultat \=\> {  if (resultat.status \=== 'fulfilled') {    console.log('Èxit:', resultat.value);  } else {    console.error('Error:', resultat.reason);  }}); |
| :---- |

**Temporitzadors i async/await**

`setTimeout` no retorna una Promise de manera nativa, però pots envoltarlo fàcilment:

| // Wrapper que converteix setTimeout en una Promisefunction esperar(ms) {  return new Promise(resolve \=\> setTimeout(resolve, ms));}// Ara pots usar-lo amb awaitasync function exempleTemporitzador() {  console.log('Inici');  await esperar(2000);          // espera 2 segons de manera llegible  console.log('2 segons després');  await esperar(1000);  console.log('3 segons en total');}// Cas pràctic: retry amb espera creixent (exponential backoff)async function fetchAmbRetry(url, intents \= 3) {  for (let intent \= 1; intent \<= intents; intent++) {    try {      const resposta \= await fetch(url);      if (\!resposta.ok) throw new Error(\`HTTP ${resposta.status}\`);      return await resposta.json();    } catch (error) {      if (intent \=== intents) throw error;  // últim intent: llança l'error      const espera \= intent \* 1000;  // 1s, 2s, 3s...      console.warn(\`Intent ${intent} fallat. Reintentant en ${espera}ms...\`);      await esperar(espera);    }  }} |
| :---- |

**Errors comuns a evitar**

**Error 1: oblidar `await` dins del try**

| // ❌ MAL: return sense await → el try/catch NO captura l'errorasync function malament() {  try {    return fetch('/api/dades');  // ← falta await\!  } catch (error) {    // Mai s'executa si la Promise es rebutja  }}// ✅ BÉ: amb return awaitasync function bé() {  try {    return await fetch('/api/dades');  // ← await necessari  } catch (error) {    // Ara sí captura l'error  }} |
| :---- |

**Error 2: catch buit que embolcalla l'error**

| // ❌ MAL: catch buit → l'error desapareix en silenciasync function malament() {  try {    await operacioQuePodenFallar();  } catch (error) {    // No fem res\! L'error queda amagat  }}// ✅ BÉ: o gestiones l'error o el rellancesasync function bé() {  try {    await operacioQuePodenFallar();  } catch (error) {    console.error('Error:', error.message);    throw new Error('Operació fallida: ' \+ error.message);  // rellançar  }} |
| :---- |

**Error 3: no comprovar `response.ok`**

| // ❌ MAL: fetch no llança error per 404 o 500async function malament() {  const data \= await fetch('/api/res-inexistent');  const json \= await data.json();  // pot tenir un missatge d'error, no dades\!}// ✅ BÉ: sempre comprovar response.okasync function bé() {  const resposta \= await fetch('/api/res-inexistent');  if (\!resposta.ok) throw new Error(\`HTTP error: ${resposta.status}\`);  return await resposta.json();} |
| :---- |

**Resum: patrons clau**

| Situació | Solució |
| ----- | ----- |
| Operació asíncrona simple | `async function` \+ `await` |
| Gestionar errors | `try/catch` al voltant de l'`await` |
| Sempre netejar (loader, connexió) | `finally` |
| Múltiples peticions independents | `Promise.all` (paral·lel) |
| Peticions que poden fallar independentment | `Promise.allSettled` |
| Esperar un temps | `await esperar(ms)` amb wrapper de setTimeout |
| Reintentar si falla | Bucle `for` \+ `await` \+ `esperar()` |
| Errors HTTP (404, 500\) | Comprovar `response.ok` i llançar manualment |

