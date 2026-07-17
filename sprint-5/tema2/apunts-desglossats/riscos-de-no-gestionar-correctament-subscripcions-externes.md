## **Quins són els riscos de no gestionar correctament les subscripcions externes?** 

La regla és clara: si crees una subscripció, timer, event listener o connexió, **l'has de netejar**. Sense excepcions. La funció de cleanup retornada per `useEffect` s'executa quan el component es desmunta, o abans que l'efecte es torni a executar.

| useEffect(() \=\> {  // Setup: crear el recurs  const subscripcio \= crearSubscripcio();  return () \=\> {    // Cleanup: destruir el recurs    subscripcio.cancel();  };}, \[dependències\]); |
| :---- |

**Risc 1: Memory Leaks — Fuites de memòria**

Una fuita de memòria ocorre quan una aplicació manté referències a objectes que ja no son necessaris, impedint que el motor JavaScript pugui reclamar aquella memòria. 

En apps React, ocorre típicament quan un component crea efectes secundaris externs (timers, subscripcions, peticions de xarxa, nodes del DOM, connexions WebSocket, etc.) però no els atura o desconnecta quan el component es desmunta.

| // ❌ FUITA DE MEMÒRIA: timer no netejarfunction Rellotge() {  const \[hora, setHora\] \= useState(new Date());  useEffect(() \=\> {    const id \= setInterval(() \=\> {      setHora(new Date());  // ← es crida indefinidament\!    }, 1000);    // ← sense return cleanup → el timer continua après desmuntar  }, \[\]);  // → L'usuari navega a una altra pàgina → component desmuntat  // → El timer SEGUEIX executant-se  // → setHora crida setState en un component desmuntat → warning \+ leak  return \<p\>{hora.toLocaleTimeString()}\</p\>;}// ✅ CORRECTE: netejar el timeruseEffect(() \=\> {  const id \= setInterval(() \=\> setHora(new Date()), 1000);  return () \=\> clearInterval(id);  // ← cleanup: el timer s'atura}, \[\]); |
| :---- |

**Risc 2: Event Listeners que s'acumulen**

Els event listeners poden causar fuites de memòria quan romanen adjuntats a objectes globals com `window`, `document`, o nodes del DOM. Si no es eliminen correctament, aquests listeners mantenen l'estat i les funcions del component en memòria.

| // ❌ MOLT MAL: cada re-render afegeix un NOU listener\!function ComponenteWindowResize() {  const \[amplada, setAmplada\] \= useState(window.innerWidth);  useEffect(() \=\> {    // Sense cleanup → cada vegada que el component re-renderitza    // i les dependències canvien, s'afegeix un listener addicional    window.addEventListener('resize', () \=\> setAmplada(window.innerWidth));  }); // ← sense dependency array\! → s'executa en CADA render  // Resultat: 10 renders → 10 listeners acumulats\!  return \<p\>Amplada: {amplada}px\</p\>;}// ✅ CORRECTE: mateixa referència per afegir i eliminarfunction ComponenteWindowResize() {  const \[amplada, setAmplada\] \= useState(window.innerWidth);  useEffect(() \=\> {    // La referència ha de ser LA MATEIXA per a addEventListener i removeEventListener    const handleResize \= () \=\> setAmplada(window.innerWidth);    window.addEventListener('resize', handleResize);    return () \=\> window.removeEventListener('resize', handleResize);    // ← cleanup elimina EXACTAMENT el listener afegit  }, \[\]); // ← \[\] → s'afegeix únicament una vegada  return \<p\>Amplada: {amplada}px\</p\>;} |
| :---- |

**Risc 3: connexions WebSocket obertes**

La causa d'un problema real en producció: desenes de subscripcions WebSocket no netejades consumint 2GB de memòria. Aixo passa més sovint del que els developers s'adonen.

| // ❌ MAL: WebSocket roman obert après desmuntarfunction XatComponent() {  const \[missatges, setMissatges\] \= useState(\[\]);  useEffect(() \=\> {    const socket \= new WebSocket('wss://exemple.com/xat');    socket.onmessage \= (event) \=\> {      setMissatges(prev \=\> \[...prev, event.data\]);      // ← setMissatges cridat en component desmuntat → bug i leak\!    };    // ← sense return → el WebSocket roman obert\!    // L'usuari navega a una altra pàgina → el socket segueix rebent missatges    // → intenta actualitzar l'estat d'un component que no existeix  }, \[\]);}// ✅ CORRECTE: tancar el WebSocket en el cleanupfunction XatComponent() {  const \[missatges, setMissatges\] \= useState(\[\]);  useEffect(() \=\> {    const socket \= new WebSocket('wss://exemple.com/xat');    socket.onmessage \= (event) \=\> {      setMissatges(prev \=\> \[...prev, event.data\]);    };    return () \=\> socket.close();  // ← cleanup: tanca la connexió  }, \[\]);  return \<ul\>{missatges.map((m, i) \=\> \<li key={i}\>{m}\</li\>)}\</ul\>;} |
| :---- |

**Risc 4: Peticions Fetch que actualitzen estat en component desmuntat**

Sense cleanup, navegar fora causa que el response handler cridi `setData` en el component ja desmuntat. Aixo genera el famós warning de React: "Can't perform a React state update on an unmounted component".

| // ❌ MAL: fetch sense cancel·laciófunction DetalProducte({ id }: { id: string }) {  const \[producte, setProducte\] \= useState(null);  useEffect(() \=\> {    fetch(\`/api/productes/${id}\`)      .then(r \=\> r.json())      .then(setProducte); // ← si el component es desmunta mentre el fetch va...      // Warning: "Can't perform a React state update on an unmounted component"  }, \[id\]);}// ✅ CORRECTE: AbortController per cancel·lar el fetchfunction DetalProducte({ id }: { id: string }) {  const \[producte, setProducte\] \= useState(null);  useEffect(() \=\> {    const controller \= new AbortController();    fetch(\`/api/productes/${id}\`, { signal: controller.signal })      .then(r \=\> r.json())      .then(setProducte)      .catch(err \=\> {        if (err.name \!== 'AbortError') throw err; // ignorar la cancel·lació      });    return () \=\> controller.abort(); // ← cleanup: cancel·la la petició  }, \[id\]);} |
| :---- |

**Risc 5: Subscripcions a biblioteques externes**

| // Moltes biblioteques (Redux, Zustand, RxJS, Apollo) usen subscripcions.// Sempre dessubscriure't en el cleanup.// ❌ MAL: subscripció a Zustand sense cleanupuseEffect(() \=\> {  const unsubscribe \= useStore.subscribe(state \=\> {    setDades(state.dades);  });  // ← sense return → subscripció activa per sempre\!}, \[\]);// ✅ CORRECTE: dessubscripció en cleanupuseEffect(() \=\> {  const unsubscribe \= useStore.subscribe(state \=\> {    setDades(state.dades);  });  return () \=\> unsubscribe(); // ← cleanup}, \[\]);// ❌ MAL: subscripció Apollo GraphQL sense cleanupuseEffect(() \=\> {  const sub \= apolloClient.subscribe({ query: MY\_SUBSCRIPTION })    .subscribe({ next: data \=\> setDades(data) });  // ← sense cleanup → subscripció activa per sempre}, \[\]);// ✅ CORRECTE:useEffect(() \=\> {  const sub \= apolloClient.subscribe({ query: MY\_SUBSCRIPTION })    .subscribe({ next: data \=\> setDades(data) });  return () \=\> sub.unsubscribe(); // ← cleanup}, \[\]); |
| :---- |

**Com detectar fuites de memòria**

Usar Chrome DevTools i React Developer Tools per monitorar l'ús de memòria i detectar objectes retinguts proporciona una manera pràctica d'identificar i corregir fuites d'hora, mantenint l'aplicació eficient i estable.

EINES PER DETECTAR MEMORY LEAKS:

1\. Chrome DevTools → Memory tab  
   → "Take Heap Snapshot" → navegar → "Take Heap Snapshot" de nou  
   → Comparar: si la memòria creix → possible leak

2\. React DevTools Profiler  
   → Monitorar re-renders innecessaris post-desmuntatge

3\. StrictMode en development  
   → Munta i desmunta components dues vegades  
   → Si apareix el warning → tens un cleanup que falta

4\. ESLint \+ eslint-plugin-react-hooks  
   → "exhaustive-deps" → detecta dependencies mancants  
   → Catches many issues before they reach production  
**La funció Cleanup: com funciona**

Una funció de cleanup en `useEffect` és un mecanisme per netejar els efectes secundaris configurats en el setup. 

És essencialment una manera de realitzar qualsevol neteja necessària per evitar fuites de memòria o comportaments no desitjats quan el component es desmunta o abans que l'efecte s'executi de nou.

| useEffect(() \=\> {  // SETUP: s'executa quan el component es munta o les dependències canvien  const subscripcio \= external.subscribe(callback);  return () \=\> {    // CLEANUP: s'executa:    // 1\. Quan el component ES DESMUNTA    // 2\. Abans que l'efecte ES TORNI A EXECUTAR (si les deps canvien)    subscripcio.unsubscribe();  };}, \[deps\]);// CICLE COMPLET:// Component munta → setup()// deps canvien → cleanup() → setup()// Component desmunta → cleanup() |
| :---- |

**Les subscripcions que SEMPRE necessiten Cleanup**

| Subscripció | Setup | Cleanup |
| ----- | ----- | ----- |
| **Interval/Timeout** | `setInterval()` / `setTimeout()` | `clearInterval()` / `clearTimeout()` |
| **Event listener** | `addEventListener()` | `removeEventListener()` (mateixa referència) |
| **WebSocket** | `new WebSocket()` | `socket.close()` |
| **Fetch** | `fetch(url, { signal })` | `controller.abort()` |
| **Zustand/Redux** | `store.subscribe()` | `unsubscribe()` |
| **Apollo/RxJS** | `.subscribe()` | `.unsubscribe()` |
| **IntersectionObserver** | `observer.observe()` | `observer.disconnect()` |
| **ResizeObserver** | `observer.observe()` | `observer.disconnect()` |

La regla mnemotècnica:

  "Si crees un recurs → retorna una funció que el destrueixi"

  useEffect(() \=\> {  
    const recurs \= crear();       // setup  
    return () \=\> destruir(recurs); // cleanup  
  }, \[deps\]);

