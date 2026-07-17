## **Tema 2 — Gestió d'efectes secundaris en React**

**1\. Funcions de renderitzat pures** 

Un component React ha de ser una funció pura dels seus props i estat. La fórmula és `UI = f(props, state)`: mateixos inputs → mateix JSX retornat, sempre.

Una funció pura compleix dues regles: donats els mateixos inputs sempre retorna el mateix output, i no produeix cap efecte secundari observable (no modifica estat extern, no fa I/O, no canvia els seus arguments).

| // ✅ Component pur: únicament llegeix props, retorna JSXfunction Producte({ nom, preu }: ProducteProps) {  const preuFinal \= preu \* 0.9;  // ← variable LOCAL al render: acceptable  return \<div\>{nom}: {preuFinal}€\</div\>;}// ❌ Component impur: modifica variable externa durant el renderlet contador \= 0;function Item({ text }: { text: string }) {  contador++;  // ← IMPUR: side effect durant el render\!  return \<li data-index={contador}\>{text}\</li\>;} |
| :---- |

**Per què importa la puresa:**

* **Predictibilitat:** mateixos inputs → debugging trivial  
* **Rendiment:** `React.memo` i el React Compiler (v19+) únicament funcionen correctament amb components purs  
* **Concurrent Mode:** React pot interrompre i reprendre renders sense bugs  
* **StrictMode:** executa el render DOS cops en development — si el component és impur, els resultats diferiran

Els efectes secundaris van als event handlers (`onClick`, `onSubmit`) o a `useEffect`. **Mai al cos de la funció de renderitzat.**

**2\. Com afecten els efectes al rendiment i predictibilitat**

Els efectes mal gestionats causen quatre problemes principals:

**Re-renders innecessaris** — usar `useEffect` per a càlculs derivats que es podrien fer durant el render directament:

| // ❌ MAL: efecte innecessari → re-render addicionaluseEffect(() \=\> {  setFiltrats(dades.filter(d \=\> d.actiu)); // dispara un re-render extra\!}, \[dades\]);// ✅ BÉ: calcular durant el render (zero efectes, zero renders addicionals)const filtrats \= dades.filter(d \=\> d.actiu); |
| :---- |

**Stale Closure** — l'efecte "recorda" el valor de la variable en el moment que es va crear, no el valor actual:

| // ❌ count sempre és 0 dins l'interval (stale closure)useEffect(() \=\> {  setInterval(() \=\> setCount(count \+ 1), 1000); // count congelat a 0\!}, \[\]);// ✅ Funció updater: no captura 'count', sempre correcteuseEffect(() \=\> {  const id \= setInterval(() \=\> setCount(prev \=\> prev \+ 1), 1000);  return () \=\> clearInterval(id);}, \[\]); |
| :---- |

**Race Conditions** — dues peticions simultànies, la resposta incorrecta arriba última:

| // ✅ Solució: flag 'ignore' o AbortControlleruseEffect(() \=\> {  let ignore \= false;  fetch(\`/api/productes/${id}\`).then(r \=\> r.json())    .then(data \=\> { if (\!ignore) setProducte(data); });  return () \=\> { ignore \= true; };}, \[id\]); |
| :---- |

**Bucles infinits** — efecte sense dependency array, o objecte/funció nou en cada render com a dependència:

| // ❌ Bucle: s'executa en CADA renderuseEffect(() \=\> { fetch('/api'); }); // ← sense array\!// ❌ Bucle: objecte nou en cada renderconst config \= { limit: 10 }; // nova referència cada renderuseEffect(() \=\> { fetch('/api', config); }, \[config\]); // sempre diferent\!// ✅ Dependències primitives o crear l'objecte dins l'efecteuseEffect(() \=\> { fetch('/api'); }, \[\]); // únicament en muntar |
| :---- |

**3\. `useEffect`: Sincronització amb sistemes externs**

`useEffect` és un hook de React que permet sincronitzar un component amb un sistema extern. Un "sistema extern" és qualsevol peça de codi no controlada per React: timers, event listeners, WebSockets, APIs del DOM, biblioteques de tercers.

| // Signatura:useEffect(setup, dependencies?)// setup → funció amb la lògica → pot retornar un cleanup// deps  → array de valors reactius que disparen l'efecte// El cicle de vida:// Component munta       → setup()// Dependencies canvien  → cleanup(valors antics) → setup(valors nous)// Component desmunta    → cleanup() |
| :---- |

**Les dependency arrays:**

| useEffect(() \=\> { /\* cada render \*/ });          // ← rarament el que volsuseEffect(() \=\> { /\* únicament en muntar \*/ }, \[\]);useEffect(() \=\> { /\* quan dep canvia \*/ }, \[dep\]); |
| :---- |

**Casos d'ús principals:**

| // Event listeners del browseruseEffect(() \=\> {  const fn \= () \=\> setAmplada(window.innerWidth);  window.addEventListener('resize', fn);  return () \=\> window.removeEventListener('resize', fn);}, \[\]);// TimersuseEffect(() \=\> {  const id \= setInterval(() \=\> setHora(new Date()), 1000);  return () \=\> clearInterval(id);}, \[\]);// Data fetchinguseEffect(() \=\> {  const controller \= new AbortController();  fetch(\`/api/productes/${id}\`, { signal: controller.signal })    .then(r \=\> r.json()).then(setProducte)    .catch(err \=\> { if (err.name \!== 'AbortError') throw err; });  return () \=\> controller.abort();}, \[id\]);// APIs del DOM (IntersectionObserver, ResizeObserver)useEffect(() \=\> {  const observer \= new IntersectionObserver((\[entry\]) \=\>    setVisible(entry.isIntersecting)  );  observer.observe(ref.current\!);  return () \=\> observer.disconnect();}, \[\]);// WebSocketsuseEffect(() \=\> {  const socket \= new WebSocket('wss://exemple.com');  socket.onmessage \= e \=\> setMissatges(prev \=\> \[...prev, e.data\]);  return () \=\> socket.close();}, \[\]);// Sincronitzar document.titleuseEffect(() \=\> {  document.title \= \`${nom} | App\`;  return () \=\> { document.title \= 'App'; };}, \[nom\]); |
| :---- |

La regla: "Si no estàs connectant amb cap sistema extern → probablement no necessites un Effect."

**4\. Funcions de neteja (Cleanup): evitar Memory Leaks**

La funció de cleanup és la funció retornada per `useEffect`. S'executa en desmuntar el component i abans de cada re-execució de l'efecte. El cleanup ha de ser el mirall simètric del setup.

**Sense cleanup → tres categories de problemes:**

| MEMÒRIA:   recursos que mai s'alliberen (intervals, connexions, listeners acumulats)ERRORS:    setState en components desmuntats → warning de ReactBUGS:      efectes que s'executen més del compte (N listeners per al mateix event) |
| :---- |

**La taula de cleanup per cada recurs:**

| Recurs | Setup | Cleanup |
| ----- | ----- | ----- |
| Interval | `setInterval(fn, ms)` | `clearInterval(id)` |
| Timeout | `setTimeout(fn, ms)` | `clearTimeout(id)` |
| Event listener | `addEventListener(e, fn)` | `removeEventListener(e, fn)` |
| WebSocket | `new WebSocket(url)` | `socket.close()` |
| Fetch | `fetch(url, { signal })` | `controller.abort()` |
| Subscripció | `store.subscribe(fn)` | `unsubscribe()` |
| IntersectionObserver | `observer.observe(el)` | `observer.disconnect()` |
| ResizeObserver | `observer.observe(el)` | `observer.disconnect()` |

**StrictMode i cleanup:** en development, StrictMode executa `setup → cleanup → setup` per detectar cleanups que falten. Si l'efecte falla amb StrictMode → té un bug real que cal corregir.

**5\. Custom Hooks: encapsular la lògica d'efectes**

Quan trobes que escrius el mateix `useEffect` en múltiples components, és el moment d'extreure un Custom Hook. Els Custom Hooks amaguen la complexitat de l'efecte darrere d'una API neta i declarativa.

| // Custom Hook: useWindowSizefunction useWindowSize() {  const \[mida, setMida\] \= useState({    amplada: window.innerWidth,    alçada: window.innerHeight,  });  useEffect(() \=\> {    const fn \= () \=\> setMida({ amplada: window.innerWidth, alçada: window.innerHeight });    window.addEventListener('resize', fn);    return () \=\> window.removeEventListener('resize', fn);  }, \[\]);  return mida;}// Custom Hook: useOnlineStatusfunction useOnlineStatus() {  const \[online, setOnline\] \= useState(navigator.onLine);  useEffect(() \=\> {    const on \= () \=\> setOnline(true);    const off \= () \=\> setOnline(false);    window.addEventListener('online', on);    window.addEventListener('offline', off);    return () \=\> {      window.removeEventListener('online', on);      window.removeEventListener('offline', off);    };  }, \[\]);  return online;}// Ús al component: net i sense lògica visiblefunction Navbar() {  const { amplada } \= useWindowSize();  const online \= useOnlineStatus();  return \<nav\>{online ? '🟢' : '🔴'} {amplada}px\</nav\>;} |
| :---- |

**6\. Quan NO usar `useEffect`**

La documentació de React avisa: si no estàs sincronitzant amb cap sistema extern, probablement no necessites un Effect.

| // ❌ MAL: useEffect per a càlculs derivatsuseEffect(() \=\> {  setTotal(items.reduce((s, i) \=\> s \+ i.preu, 0));}, \[items\]);// ✅ BÉ: calcular durant el renderconst total \= items.reduce((s, i) \=\> s \+ i.preu, 0);// ❌ MAL: useEffect per a lògica que hauria d'anar en un event handleruseEffect(() \=\> {  if (formEnviat) {    navigate('/gracies');  }}, \[formEnviat\]);// ✅ BÉ: la navegació va al handler, no a l'efecteconst handleSubmit \= async () \=\> {  await enviarFormulari();  navigate('/gracies');}; |
| :---- |

**Resum:** 

RENDER PUR (la base):  
  → Mateixos inputs → mateix JSX → sense side effects  
  → Side effects → event handlers o useEffect  
  → NUNCA al cos del render

useEffect (la porta als sistemes externs):  
  → Signatura: useEffect(setup, deps?)  
  → Cicle: setup en muntar → cleanup+setup quan deps canvien → cleanup en desmuntar  
  → Dependency array: \[\] una vegada / \[dep\] quan dep canvia / sense array cada render

PROBLEMES COMUNS:  
  → Re-renders innecessaris   → calcular durant el render en lloc d'efecte  
  → Stale closure             → funció updater (prev \=\> prev \+ 1\)  
  → Race conditions           → AbortController o flag 'ignore'  
  → Bucles infinits           → dependency array correcte, primitives no objectes

CLEANUP (obligatori per a):  
  → Intervals/Timeouts        → clearInterval/clearTimeout  
  → Event listeners           → removeEventListener (mateixa referència\!)  
  → WebSockets                → socket.close()  
  → Fetch                     → AbortController.abort()  
  → Subscripcions             → unsubscribe()  
  → Observers                 → observer.disconnect()  
  Regla: cleanup \= mirall simètric del setup

CUSTOM HOOKS:  
  → Encapsular la lògica de useEffect darrere una API neta  
  → useWindowSize, useOnlineStatus, useKeyPress, useEsVisible...  
  → Reutilitzables i testejables

QUAN NO USAR useEffect:  
  → Càlculs derivats → durant el render  
  → Lògica post-acció → event handlers  
  → La pregunta clau: "Estàs sincronitzant amb un sistema extern?"  
    SÍ → useEffect   NO → probablement no el necessites

