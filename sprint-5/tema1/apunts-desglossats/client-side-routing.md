## **Client-side routing i la history API del browser**

###### **Client-Side Routing** [https://developer.mozilla.org/en-US/docs/Web/API/History\_API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) Explicació de l’API de l’historial i com funciona el routing al costat del client.

**Què és la History API**

La History API proporciona accés a l'historial de sessió del browser a través de l'objecte global `history`. 

Exposa mètodes i propietats útils que permeten navegar endavant i enrere a través de l'historial de l'usuari, i manipular el contingut de la pila d'historial. 

Aquesta API és el fonament tècnic sobre el qual React Router construeix tot el seu sistema de routing.

| // L'objecte global 'history' és sempre accessible:console.log(window.history);// → History { length: 5, scrollRestoration: 'auto', state: null }console.log(history.length); // nombre d'entrades a la pila d'historial |
| :---- |

**La pila d'historial (History stack)**

El browser manté una pila d'entrades de l'historial per a cada pestanya. Cada cop que l'usuari navega a una nova pàgina, s'afegeix una nova entrada. L'usuari pot navegar cap a dalt i avall per aquesta pila amb els botons del browser.

| Pila d'historial (exemple):  ← Anterior    Actual    Posterior →  \[exemple.com\] \[/sobre\]  \[/contacte\]        ↑           ↑           ↑  índex \-1      índex 0     índex \+1                (posició                 actual) |
| :---- |

**Mètodes de navegació: `back()`, `forward()`, `go()`**

Per moure's cap enrere en l'historial, cal usar `back()`. Actua exactament com si l'usuari hagués clicat el botó Enrere de la barra d'eines del browser. De manera similar, pots moure't endavant (com si l'usuari hagués clicat el botó Endavant).

| // NAVEGACIÓ BÀSICA per l'historial existent:history.back();     // ← equivalent al botó "Enrere" del browserhistory.forward();  // → equivalent al botó "Endavant" del browser// NAVEGACIÓ per delta:history.go(\-1);  // ← un pas enrere (equivalent a back())history.go(1);   // → un pas endavant (equivalent a forward())history.go(\-3);  // ← tres passos enrerehistory.go(0);   // recàrrega la pàgina actual// LENGTH: nombre d'entrades a la pilaconsole.log(history.length); // → 5 (per exemple) |
| :---- |

**El cor del client-side routing: `pushState()` i `replaceState()`**

Aquests dos mètodes son els que fan possible el routing client-side. Permeten modificar la URL de la barra d'adreces **sense** que el browser faci cap petició al servidor.

### **`pushState()`: afegir una nova entrada a l'historial**

| // Signatura: history.pushState(estat, títol, url)//   estat: objecte JS arbitrari associat a l'entrada//   títol: ignorat per la majoria de browsers (passar '')//   url: la nova URL (ha de ser del mateix origen\!)// Exemple 1: navegar a /productes sense recàrregahistory.pushState({ pàgina: 'productes' }, '', '/productes');// → URL a la barra d'adreces: https://exemple.com/productes// → Cap petició al servidor\!// → El botó "Enrere" tornarà a la URL anterior ✅// Exemple 2: afegir paràmetres de cercahistory.pushState(null, '', '/productes?cerca=sabates\&pàgina=2');// → URL: https://exemple.com/productes?cerca=sabates\&pàgina=2// Exemple 3: pila d'historial resultanthistory.pushState({ page: 1 }, '', '?page=1');history.pushState({ page: 2 }, '', '?page=2');// Pila: \[inicial\] → \[?page=1\] → \[?page=2\] ← posició actual// history.back() → va a ?page=1// history.back() → va a \[inicial\] |
| :---- |

### **`replaceState()`: substituir l'entrada actual**

| // Signatura idèntica a pushState però NO afegeix una nova entradahistory.replaceState({ page: 3 }, '', '?page=3');// → URL canvia a ?page=3// → L'entrada ANTERIOR és substituïda (no afegida)// → El botó "Enrere" NO tornarà a la URL anterior d'aquest replace// CAS D'ÚS: redirect del servidor simulat// Exemple: after login → anar a dashboard sense que "Enrere" torni al loginhistory.pushState(null, '', '/dashboard');// vs.history.replaceState(null, '', '/dashboard');// ← replace: "Enrere" no torna a /login ✅ |
| :---- |

**L'Event `popstate`: detectar la navegació del browser**

L'event `popstate` s'activa quan l'usuari prem els botons Enrere o Endavant del browser. **Important:** `pushState` i `replaceState` NO disparen `popstate` — únicament la navegació per l'historial (botons del browser) ho fa.

| // Escoltant la navegació del browser:window.addEventListener('popstate', (event) \=\> {  // event.state conté l'objecte passat a pushState/replaceState  console.log('Nova URL:', document.location.href);  console.log('Estat:', JSON.stringify(event.state));  // Exemple de gestió manual del routing:  renderitzarRuta(document.location.pathname);});// Exemple complet del MDN:window.addEventListener('popstate', (event) \=\> {  alert(\`location: ${document.location}, state: ${JSON.stringify(event.state)}\`);});history.pushState({ page: 1 }, '', '?page=1');history.pushState({ page: 2 }, '', '?page=2');history.replaceState({ page: 3 }, '', '?page=3');history.back();// → Dispara popstate: location: example.com?page=1, state: {"page":1}history.back();// → Dispara popstate: location: example.com, state: nullhistory.go(2);// → Dispara popstate: location: example.com?page=3, state: {"page":3} |
| :---- |

**Com React Router usa la History API internament**

React Router construeix una capa d'abstracció sobre la History API nativa per fer-la cross-browser i integrar-la amb el model de renderitzat de React.

| // Internament, React Router:// 1\. Crea un objecte 'history' que embolcalla la History API// 2\. Intercepta tots els clics en \<Link\> i crida pushState// 3\. Escolta 'popstate' per detectar la navegació enrere/endavant// 4\. Cada canvi d'URL → React re-renderitza el component adequat// Equivalència entre React Router i la History API:// React Router          →  History API equivalentnavigate('/productes')   →  history.pushState({}, '', '/productes')navigate('/login', { replace: true }) → history.replaceState({}, '', '/login')navigate(\-1)             →  history.go(\-1)  // o history.back()navigate(1)              →  history.go(1)   // o history.forward()// L'event intern de React Router:// → Escolta 'popstate' → actualitza l'estat intern → React re-renderitza |
| :---- |

**Les tres estratègies de router i la history API**

| // 1\. BrowserRouter (History API) \-- URL netescreateBrowserRouter(\[...\])// Usa: pushState, replaceState, popstate// URLs: /productes, /sobre, /contacte// → Requereix configuració del servidor (fallback a index.html)// 2\. HashRouter \-- Compatible sense config de servidorcreateHashRouter(\[...\])// Usa: el hash (\#) de la URL// URLs: /\#/productes, /\#/sobre, /\#/contacte// → La part abans del \# va al servidor, la part del \# al client// → El servidor sempre rep la petició per /, la SPA llegeix el hash// → Funciona en GitHub Pages sense cap configuració// 3\. MemoryRouter \-- Sense URL real (tests i React Native)createMemoryRouter(\[...\])// NO usa la History API del browser// L'historial viu únicament en memòria JS// → La URL de la barra d'adreces mai canvia// → Per a tests amb Vitest/Jest i React Native |
| :---- |

**`window.location`: llegir la URL actual**

La History API treballa conjuntament amb `window.location` per llegir la URL actual.

| // window.location: l'objecte que descriu la URL actual// URL: https://exemple.com/productes/42?categoria=esport\#ofertawindow.location.href      // "https://exemple.com/productes/42?categoria=esport\#oferta"window.location.origin    // "https://exemple.com"window.location.pathname  // "/productes/42"window.location.search    // "?categoria=esport"window.location.hash      // "\#oferta"window.location.host      // "exemple.com"window.location.protocol  // "https:"// Equivalent en React Router:import { useLocation } from 'react-router-dom';const location \= useLocation();location.pathname  // "/productes/42"location.search    // "?categoria=esport"location.hash      // "\#oferta"// → useLocation() és l'abstracció React de window.location//   que es manté en sincronia amb la History API automàticament |
| :---- |

**Router manual sense biblioteca: per entendre els fonaments**

Implementació mínima per entendre com funciona un router client-side:

| // Router SPA mínim usant la History API directament// (Sense React Router \-- únicament per entendre els fonaments)function renderitzarRuta(pathname) {  const contingut \= document.getElementById('contingut');  if (pathname \=== '/') {    contingut.innerHTML \= '\<h1\>Home\</h1\>';  } else if (pathname \=== '/sobre') {    contingut.innerHTML \= '\<h1\>Sobre Nosaltres\</h1\>';  } else if (pathname \=== '/contacte') {    contingut.innerHTML \= '\<h1\>Contacte\</h1\>';  } else {    contingut.innerHTML \= '\<h1\>404 \- Pàgina no trobada\</h1\>';  }}// Interceptar clics als links (evitar recàrrega del browser)document.addEventListener('click', (e) \=\> {  const link \= e.target.closest('a\[data-spa\]');  if (\!link) return;  e.preventDefault();  // ← evitar que el browser faci la petició al servidor  const url \= link.getAttribute('href');  history.pushState(null, '', url);  // ← actualitzar la URL sense recàrrega  renderitzarRuta(url);              // ← renderitzar el contingut adequat});// Detectar navegació enrere/endavant del browserwindow.addEventListener('popstate', () \=\> {  renderitzarRuta(window.location.pathname);});// Renderitzar la ruta inicialrenderitzarRuta(window.location.pathname); |
| :---- |

**La connexió history API ↔ React Router**

HISTORY API (browser natiu):  
  pushState()     → afegir entrada a l'historial \+ canviar URL (sense recàrrega)  
  replaceState()  → substituir entrada actual \+ canviar URL (sense recàrrega)  
  go() / back() / forward() → navegar per l'historial  
  popstate event  → detectar botons enrere/endavant del browser

REACT ROUTER (abstracció sobre History API):  
  \<Link\>          → preventDefault \+ pushState \+ re-render React  
  navigate('/ruta')    → pushState \+ re-render React  
  navigate('/ruta', { replace: true }) → replaceState \+ re-render React  
  navigate(-1)         → history.back() \+ re-render React  
  useLocation()        → objecte Location sincronitzat amb window.location  
  createBrowserRouter  → usa pushState/replaceState/popstate  
  createHashRouter     → usa el hash (\#) en comptes de pushState  
  createMemoryRouter   → historial en memòria (sense History API)

La fórmula:  
  History API \+ event 'popstate' \+ React re-render \= React Router

