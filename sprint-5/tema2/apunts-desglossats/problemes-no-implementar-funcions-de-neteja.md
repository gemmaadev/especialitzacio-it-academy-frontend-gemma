## **Problemes quan no s'implementen funcions de neteja en `useEffect`**

**Què és la funció de neteja i quan s'executa**

La funció de neteja és la funció retornada per `useEffect`. React l'executa en dos moments: quan el component es desmunta del DOM, i abans que l'efecte es torni a executar (quan les dependències canvien).

| useEffect(() \=\> {  // SETUP: s'executa en muntar o quan canvien les deps  const recurs \= crear();  return () \=\> {    // CLEANUP: s'executa en desmuntar O abans del proper setup    destruir(recurs);  };}, \[deps\]); |
| :---- |

La regla del polze és que l'usuari no hauria de poder distingir entre el setup cridat una vegada (com en producció) i una seqüència setup → cleanup → setup (com en development). Si hi ha un problema visible, la funció de cleanup té lògica que falta.

**Problema 1: Memory Leaks**

Una fuita de memòria ocorre quan un component crea recursos externs però no els allibera en desmuntar. Els recursos s'acumulen progressivament degradant el rendiment.

| // ❌ MAL: interval que mai s'aturafunction Rellotge() {  const \[hora, setHora\] \= useState(new Date());  useEffect(() \=\> {    setInterval(() \=\> setHora(new Date()), 1000);    // ← sense return → interval actiu per sempre    // L'usuari navega a una altra pàgina:    // → component desmuntat    // → interval SEGUEIX executant-se    // → setHora intenta actualitzar un component que no existeix    // → memòria mai alliberada  }, \[\]);}// ✅ BÉ: cleanup allibera el recursuseEffect(() \=\> {  const id \= setInterval(() \=\> setHora(new Date()), 1000);  return () \=\> clearInterval(id); // ← allibera la memòria}, \[\]); |
| :---- |

**Problema 2: El warning "Can't perform a React state update on an unmounted component"**

El warning més famós de React quan falta cleanup. Quan un efecte asíncron intenta actualitzar l'estat d'un component que ja no existeix al DOM.

| // ❌ Causa del warning:function DetalProducte({ id }: { id: string }) {  const \[producte, setProducte\] \= useState(null);  useEffect(() \=\> {    fetch(\`/api/productes/${id}\`)      .then(r \=\> r.json())      .then(data \=\> setProducte(data));      // ← L'usuari navega a una altra pàgina mentre el fetch va      // → component desmuntat      // → el fetch resolt → intenta setProducte → Warning\!  }, \[id\]);}// ✅ Solució amb flag 'ignore':useEffect(() \=\> {  let ignore \= false;  fetch(\`/api/productes/${id}\`)    .then(r \=\> r.json())    .then(data \=\> {      if (\!ignore) setProducte(data); // ← únicament si el component segueix muntat    });  return () \=\> { ignore \= true; }; // ← cleanup: ignora la resposta}, \[id\]);// ✅ Alternativa amb AbortController:useEffect(() \=\> {  const controller \= new AbortController();  fetch(\`/api/productes/${id}\`, { signal: controller.signal })    .then(r \=\> r.json())    .then(setProducte)    .catch(err \=\> { if (err.name \!== 'AbortError') throw err; });  return () \=\> controller.abort();}, \[id\]); |
| :---- |

**Problema 3: Event Listeners acumulats**

Sense cleanup, cada re-render o cada re-execució de l'efecte afegeix un nou listener sense eliminar l'anterior. El resultat: N listeners actius que s'executen N vegades per cada event.

| // ❌ MAL: listeners que s'acumulenfunction ComponenteAmb Bug() {  const \[count, setCount\] \= useState(0);  useEffect(() \=\> {    // Sense cleanup → cada vegada que count canvia:    // → s'afegeix un NOU listener    // → el listener anterior SEGUEIX actiu    // Després de 10 canvis: 10 listeners actius\!    window.addEventListener('keydown', (e) \=\> {      if (e.key \=== 'Escape') setCount(c \=\> c \- 1);    });  }, \[count\]); // ← s'executa cada vegada que count canvia}// ✅ BÉ: un sol listener actiu sempreuseEffect(() \=\> {  const handleKeyDown \= (e: KeyboardEvent) \=\> {    if (e.key \=== 'Escape') setCount(c \=\> c \- 1);  };  window.addEventListener('keydown', handleKeyDown);  return () \=\> window.removeEventListener('keydown', handleKeyDown);  // ← abans del proper setup: elimina l'antic → afegeix el nou}, \[\]); |
| :---- |

**Problema 4: Connexions que romanen obertes**

WebSockets, connexions de base de dades, connexions a servidors de xat — si no es tanquen en el cleanup, continuen consumint recursos tant al client com al servidor.

| // ❌ MAL: WebSocket obert per sempreuseEffect(() \=\> {  const socket \= new WebSocket('wss://exemple.com');  socket.onmessage \= (e) \=\> setMissatges(prev \=\> \[...prev, e.data\]);  // ← sense cleanup → socket obert fins que el browser tanca la pestanya  // Impacte al servidor: connexions zombi acumulades}, \[\]);// ✅ BÉ: tancar en desmuntaruseEffect(() \=\> {  const socket \= new WebSocket('wss://exemple.com');  socket.onmessage \= (e) \=\> setMissatges(prev \=\> \[...prev, e.data\]);  return () \=\> socket.close(); // ← allibera la connexió}, \[\]); |
| :---- |

**Problema 5: El doble render de StrictMode exposa els bugs**

En development, StrictMode executa un cicle extra setup → cleanup → setup. Si l'efecte no té cleanup correcte, el problema es manifesta immediatament.

| // ❌ Sense cleanup: StrictMode executa init() dues vegades → comportament incorrecteuseEffect(() \=\> {  Analytics.init(); // inicialitzar analítiques → no idempotent\!  // → StrictMode: Analytics.init() cridat 2 cops → dades duplicades o error}, \[\]);// ✅ Amb cleanup simètric: StrictMode safeuseEffect(() \=\> {  Analytics.init();  return () \=\> Analytics.cleanup(); // ← la seqüència init→cleanup→init és correcta}, \[\]); |
| :---- |

La regla de simetria: el cleanup ha d'espellar exactament el que fa el setup. Si el setup fa `connection.connect()`, el cleanup fa `connection.disconnect()`. Si el setup fa `observer.observe()`, el cleanup fa `observer.disconnect()`.

**La taula de Cleanup per cada tipus de recurs**

| Recurs creat | Cleanup necessari |
| ----- | ----- |
| `setInterval(fn, ms)` | `clearInterval(id)` |
| `setTimeout(fn, ms)` | `clearTimeout(id)` |
| `addEventListener(event, fn)` | `removeEventListener(event, fn)` (mateixa referència\!) |
| `new WebSocket(url)` | `socket.close()` |
| `new AbortController()` | `controller.abort()` |
| `store.subscribe(fn)` | `unsubscribe()` |
| `new IntersectionObserver(fn)` | `observer.disconnect()` |
| `new ResizeObserver(fn)` | `observer.disconnect()` |
| `fetch()` amb AbortController | `controller.abort()` |
| `animation.start()` | `animation.reset()` |

**Resum**

Sense cleanup → tres categories de problemes:

1\. MEMÒRIA: recursos que mai s'alliberen  
   → Intervals, timeouts, connexions, listeners acumulats  
   → Degradació progressiva del rendiment

2\. ERRORS: operacions sobre components desmuntats  
   → "Can't perform a React state update on an unmounted component"  
   → Race conditions en data fetching

3\. BUGS DE LÒGICA: efectes que s'executen més del compte  
   → N listeners per al mateix event  
   → Inicialitzacions duplicades en StrictMode

La regla:  
  Cleanup \= el mirall del setup  
  setup()   → crea un recurs  
  cleanup() → destrueix aquell recurs