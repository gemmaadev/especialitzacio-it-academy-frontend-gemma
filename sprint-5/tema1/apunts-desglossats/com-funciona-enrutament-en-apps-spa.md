## **Com funciona l'enrutament en aplicacions d'una sola pàgina (SPA)?**

**Documentació Oficial de React Router**  
[https://reactrouter.com/](https://reactrouter.com/)   
Guia oficial per aprendre a gestionar rutes i navegació amb React Router.

**Nested Routes**  
[https://reactrouter.com/main/start/concepts\#nested-routes](https://reactrouter.com/main/start/concepts#nested-routes)  
Explicació sobre com organitzar i utilitzar rutes imbricades amb React Router.

**La diferència fonamental: MPA vs. SPA**

Una SPA (Single-Page Application) és una aplicació web que carrega únicament un document HTML inicial i actualitza dinàmicament el contingut via JavaScript sense sol·licitar noves pàgines al servidor. 

Les SPAs carreguen una sola pàgina inicial i actualitzen dinàmicament el contingut mentre els usuaris naveguen, tot mantenint la URL actual.

| MPA (Multi-Page Application) \-- Tradicional:  Usuari clica "Sobre nosaltres"        ↓  Browser envia GET /about al servidor        ↓  Servidor retorna un NOU fitxer HTML complet        ↓  Browser destrueix la pàgina actual        ↓  Browser renderitza la nova pàgina des de zero  → Recàrrega completa, flash blanc, pèrdua d'estatSPA (Single-Page Application) \-- Modern:  Usuari clica "Sobre nosaltres"        ↓  JavaScript intercepta el clic        ↓  History API actualitza la URL (/about)        ↓  React renderitza el component About        ↓  El DOM s'actualitza únicament on cal  → Sense recàrrega, transició instantània, estat preservat |
| :---- |

**El fonament tècnic: la history API del browser**

L'enrutament client-side usa la History API del browser per actualitzar la barra d'adreces i l'estat de l'aplicació sense recarregar la pàgina. Aquesta API és el motor que fa possible les SPAs modernes.

| // La History API: les dues operacions fonamentals// 1\. pushState: afegeix una nova entrada a l'historial//    → El botó "Enrere" del browser funcionarà\!window.history.pushState(  { pàgina: 'about' },  // estat (objecte JS arbitrari)  '',                    // títol (ignorat per la majoria de browsers)  '/about'               // la nova URL (sense recàrrega\!));// 2\. replaceState: substitueix l'entrada actual (sense afegir historial)//    → "Enrere" NO porta a la URL anteriorwindow.history.replaceState({}, '', '/login');// 3\. Escolt de navegació (enrere/endavant del browser)window.addEventListener('popstate', (event) \=\> {  // S'executa quan l'usuari prem ⬅️ o ➡️  console.log('Nova URL:', window.location.pathname);  // → React Router re-renderitza el component adequat}); |
| :---- |

JavaScript pot canviar la URL sense recarregar la pàgina usant `window.history.pushState()`. 

Quan l'usuari actualitza o navega directament a `/profile`, el browser sol·licita la URL al servidor, que retorna el mateix `index.html`, i React Router llegeix la URL per mostrar la vista correcta.

**El cicle de vida complet d'una SPA**

| PRIMERA VISITA (única sol·licitud al servidor):  Browser → GET https://app.com/  Servidor → retorna index.html \+ bundle.js  React s'inicialitza i renderitza el component de la ruta /  → El servidor ÚNICAMENT s'implica en aquesta primera càrregaNAVEGACIÓ INTERNA (sense servidor):  Usuari clica \<Link to="/productes" /\>        ↓  React Router intercepta el clic (preventDefault())        ↓  history.pushState({}, '', '/productes')        ↓  React Router compara '/productes' amb les rutes definides        ↓  Renderitza \<PàginaProductes /\>        ↓  React actualitza únicament les parts del DOM que han canviat  → Zero sol·licituds al servidor per a la navegació\! |
| :---- |

En la primera visita, el browser descarrega un fitxer HTML mínim acompanyat d'un bundle JavaScript generat per Vite o Webpack. 

Aquest bundle conté tot el codi de l'aplicació: components d'interfície, lògica de navegació (routing client-side), gestió d'estat i crides a APIs.

**Com React Router implementa l'enrutament**

React Router usa la History API. `createBrowserHistory()` crea un objecte history que embolcalla la History API (`pushState`, `replaceState`, `popstate`). 

L'estat de React (`action`, `location`) fa seguiment de la URL actual i el tipus de navegació. `history.listen(setState)` subscriu als canvis d'historial perquè React sàpiga quan l'usuari prem Enrere o Endavant.

| // Configuració bàsica de React Router (versió moderna)import { createBrowserRouter, RouterProvider } from 'react-router-dom';const router \= createBrowserRouter(\[  {    path: '/',    element: \<Layout /\>,    children: \[      { index: true, element: \<Home /\> },      { path: 'productes', element: \<Productes /\> },      { path: 'productes/:id', element: \<DetalProducte /\> },      { path: '\*', element: \<NotFound /\> },    \],  },\]);function App() {  return \<RouterProvider router={router} /\>;}// Flux intern de React Router quan l'URL canvia:// 1\. Detecta el canvi (pushState o popstate)// 2\. Compara la nova URL amb les rutes definides// 3\. Determina quins components renderitzar// 4\. React actualitza el DOM (únicament les parts que canvien) |
| :---- |

**El problema del "Deep Link": SPA vs. Servidor**

Sorgeix un problema quan algú carrega un deep link directament al browser. El servidor ha de retornar el teu punt d'entrada SPA per a qualsevol ruta desconeguda, però seguir servint assets estàtics i APIs normalment.

| PROBLEMA:  Usuari comparteix l'URL: https://app.com/productes/42  El seu amic obre la URL directament en un browser nou        ↓  Browser → GET https://app.com/productes/42 → Servidor  Servidor: "No tinc cap fitxer a /productes/42" → 404\!  (El servidor NO coneix les rutes del frontend React\!)SOLUCIÓ: configurar el servidor per retornar sempre index.html  \# Vite (vite.config.ts):  \# En producció → Nginx/Apache  \# Nginx:  location / {    try\_files $uri $uri/ /index.html;    \# → Si no troba el fitxer → retorna index.html    \# → React Router llegeix /productes/42 i renderitza el component correcte  }  \# Node.js/Express:  app.get('\*', (req, res) \=\> {    res.sendFile(path.join(\_\_dirname, 'dist/index.html'));  }); |
| :---- |

**Tres estratègies d'enrutament: hash, history i memory**

| // 1\. BrowserRouter (History API) \-- EL MÉS USAT// URLs netes: /productes, /about// Requereix configuració del servidor (fallback a index.html)import { createBrowserRouter } from 'react-router-dom';// 2\. HashRouter \-- Sense configuració de servidor// URLs amb hash: /\#/productes, /\#/about// El servidor únicament veu '/', el \# és processat pel clientimport { createHashRouter } from 'react-router-dom';// → Útil per a GitHub Pages o hostings sense configuració de servidor// → SEO limitat (els crawlers ignoren el contingut després del \#)// 3\. MemoryRouter \-- Sense URL real (per a tests i React Native)// L'historial viu únicament a la memòria JS// La URL del browser no canviaimport { createMemoryRouter } from 'react-router-dom';// → Usat en tests amb Vitest/Jest// → React Native (no hi ha browser ni URL) |
| :---- |

**Avantatges i limitacions de l'enrutament SPA**

AVANTATGES:

  ✅ Navegació instantània (sense recàrrega de pàgina)  
  ✅ Transicions i animacions suaus entre rutes  
  ✅ Estat preservat entre navegació (carret de compra, etc.)  
  ✅ Una sola sol·licitud al servidor per a la càrrega inicial  
  ✅ Experiència similar a una aplicació nativa (desktop-like)  
  ✅ Suport offline potencial (Service Workers \+ PWA)

LIMITACIONS:

  ❌ SEO més complex (els crawlers veuen HTML buit inicialment)  
  ❌ Primera càrrega pot ser lenta (bundle JS gran)  
  ❌ Requereix JavaScript activat (sense JS → app no funciona)  
  ❌ Configuració de servidor necessària per als deep links  
  ❌ Gestió d'historial i focus per a accessibilitat (screenreaders)

Si la navegació passa d'una pàgina React a una altra usant server-side routing, el browser re-parsearia i re-renderitzaria tota la pàgina usant JavaScript, cosa que pot impactar severament el "time to interactive". 

A més, com que tens control total sobre la càrrega de nou contingut, pots aconseguir transicions CSS com cross-fades, modals emergents, tab sliders i molt més.

**El flux complet**

SPA amb React Router — Com funciona:

index.html (únic fitxer HTML):  
  \<div id="root"\>\</div\>  
  \<script src="bundle.js"\>\</script\>  ← tot el codi React aquí

bundle.js conté:  
  → Components React (Home, Productes, DetalProducte...)  
  → React Router (lògica d'enrutament)  
  → Tot el JavaScript de l'aplicació

Navegació interna:  
  Clic → React Router intercepta → pushState('/ruta') →  
  router compara URL amb rutes → renderitza component →  
  React actualitza el DOM → Zero sol·licituds al servidor ✅

Navegació directa (F5 o URL compartida):  
  Browser → GET /ruta → Servidor → index.html →  
  React Router llegeix window.location → renderitza component ✅  
  (Requereix que el servidor retorni sempre index.html)

L'essència:  
  "Single Page" \= UN sol document HTML  
  "Multiple views" \= components React que canvien amb la URL  
  La URL és simplement dades per a React Router

