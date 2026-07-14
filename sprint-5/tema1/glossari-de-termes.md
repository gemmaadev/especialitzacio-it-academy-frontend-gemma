## **Glossari de termes — Enrutament web amb React Router**

**`back()`** — Mètode de la History API (`history.back()`) que navega un pas enrere en l'historial de sessió. Actua exactament com si l'usuari hagués clicat el botó Enrere de la barra d'eines del browser. Equivalent a `history.go(-1)`.

**BrowserRouter** — Router de React Router que usa la History API del browser per gestionar la navegació. Genera URLs netes sense hash (`/productes`, `/sobre`). Requereix que el servidor estigui configurat per retornar sempre `index.html` per a qualsevol ruta (fallback). La opció per defecte i més recomanada per a aplicacions web en producció.

**`children`** (rutes) — Array de rutes filles en la configuració de `createBrowserRouter`. Les rutes filles es renderitzen via `<Outlet>` al component pare. Permeten crear jerarquies de rutes i layouts compartits sense duplicació de codi.

**Client-Side Routing** — Model de routing on tota la navegació es gestiona al browser via JavaScript, sense sol·licitar noves pàgines al servidor. Basat en la History API (`pushState`, `replaceState`, `popstate`). React Router n'és la implementació estàndard per a React. Permet navegació instantània (10-50ms) sense recàrregues de pàgina.

**`createBrowserRouter`** — Funció de React Router que crea un router basat en la History API amb suport per a loaders, actions i error boundaries. L'API moderna recomanada a partir de React Router v6.4. Rep un array de configuració de rutes i retorna un objecte router que es passa a `<RouterProvider>`.

**`createHashRouter`** — Crea un router que usa el hash de la URL (`/#/productes`) en lloc de la History API. Funciona sense cap configuració de servidor (ideal per a GitHub Pages o hostings estàtics simples). Desavantatge: les URLs son menys netes i el SEO és limitat perquè els crawlers ignoren el contingut després del `#`.

**`createMemoryRouter`** — Crea un router que emmagatzema l'historial en memòria JavaScript sense usar la URL del browser. La URL de la barra d'adreces mai canvia. Usat principalment per a tests amb Vitest/Jest i per a React Native (on no hi ha browser ni URL real).

**Data Router** — Mode de React Router que unifica routing i data fetching. Les rutes poden tenir funcions `loader` (per carregar dades) i `action` (per processar formularis) associades. Les dades estan disponibles al component via `useLoaderData()` i `useActionData()` sense necessitat de `useEffect`. Introduït a React Router v6.4.

**Deep Link** — URL que apunta directament a una vista específica d'una SPA (per exemple, `https://app.com/productes/42`). El problema dels deep links: si l'usuari accedeix directament a aquesta URL, el servidor rep la petició i no té cap fitxer en aquella ruta. Solució: configurar el servidor per retornar sempre `index.html`, i React Router llegeix la URL per renderitzar el component correcte.

**Declarative Navigation** — Navegació especificada directament al JSX. L'usuari interactua amb un element UI (`<Link>`, `<NavLink>`) i la navegació succeeix automàticament. Contrastada amb la navegació programàtica on el codi JavaScript decideix quan navegar. React Router recomana la navegació declarativa per a la majoria de casos.

**Dynamic Route** — Ruta amb segments variables a l'URL. Definida amb dos punts (`:`) al path: `{ path: 'productes/:id' }`. El segment `:id` pot ser qualsevol valor i és accessible via `useParams()`. Útil per a pàgines de detall, perfils d'usuari, articles de blog, etc.

**`end`** (prop de NavLink) — Prop booleana de `<NavLink>` que força la coincidència exacta del path. Sense `end`, un `<NavLink to="/">` seria sempre actiu perquè `/` és prefix de totes les URLs. Amb `end`, únicament és actiu quan la URL és exactament `/`.

**`errorElement`** — Propietat de configuració de ruta de React Router que especifica el component a renderitzar quan la ruta o el seu loader llança un error. Captura errors de tota la subárbre de rutes. El component d'error pot accedir a l'error via `useRouteError()`.

**Fallback (servidor)** — Configuració del servidor que retorna sempre `index.html` per a qualsevol URL desconeguda. Essencial per a SPAs amb `BrowserRouter` perquè quan l'usuari accedeix directament a un deep link, el servidor no ha de saber res de les rutes de React Router. Exemple Nginx: `try_files $uri $uri/ /index.html`.

**`forward()`** — Mètode de la History API (`history.forward()`) que navega un pas endavant en l'historial. Equivalent a `history.go(1)`.

**`go()`** — Mètode de la History API que navega un nombre determinat de passos per l'historial. `history.go(-1)` \= enrere, `history.go(1)` \= endavant, `history.go(0)` \= recarregar. `history.go(-3)` \= tres passos enrere.

**Guard (Route Guard)** — Patró que usa una ruta de layout sense `path` per protegir un conjunt de rutes. El component Guard verifica condicions (autenticació, rols) i renderitza `<Outlet>` si les condicions es compleixen, o redirigeix en cas contrari. No afegeix cap segment a la URL.

**Hash Router** — Veure `createHashRouter`.

**HashRouter** — Component de React Router equivalent a `createHashRouter` per a la sintaxi de JSX antiga. Les URLs usen el hash: `https://exemple.com/#/productes`. L'ancla `#` significa que el browser mai envia la part posterior al servidor.

**History API** — API nativa del browser (accessible via `window.history`) que proporciona accés a l'historial de sessió de la pestanya actual. Exposa mètodes (`pushState`, `replaceState`, `back`, `forward`, `go`) i l'event `popstate`. La base tècnica sobre la qual es construeix tot el client-side routing modern. Disponible en tots els browsers des de 2015\.

**History Stack** — La pila d'entrades de navegació que el browser manté per a cada pestanya. Cada cop que l'usuari navega a una nova URL, s'afegeix una entrada. `pushState` afegeix una nova entrada. `replaceState` substitueix l'entrada actual. `back/forward/go` mouen el punter per la pila sense afegir entrades. `history.length` retorna el nombre total d'entrades.

**Index Route** — Ruta filla que es renderitza quan la URL coincideix exactament amb el path del pare (sense cap segment addicional). Definida amb `{ index: true, element: <Component /> }` en lloc de `{ path: '...' }`. Actua com el "default" d'un layout: quan no hi ha cap ruta filla específica activa, es mostra la ruta índex.

**`isRouteErrorResponse()`** — Funció de React Router que comprova si un error és una resposta HTTP de React Router (amb `status` i `statusText`) o un error genèric de JavaScript. Usada dins dels components `errorElement` per diferenciar errors 404, 500, etc. d'errors de lògica.

**`<Link>`** — Component de React Router per a navegació declarativa. Renderitza un element `<a href>` semàntic real al DOM, amb la diferència que intercepta el clic i usa `pushState` en lloc de fer una petició al servidor. Suporta `Command+Click` (nova pestanya), menú contextual del browser, i és accessible per a lectors de pantalla.

**`loader`** — Funció associada a una ruta de React Router (Data/Framework mode) que s'executa al servidor o client ABANS de renderitzar el component. Rep `{ params, request }`. Les dades retornades estan disponibles al component via `useLoaderData()`. Elimina la necessitat de `useEffect` \+ `useState('loading')` per a la càrrega inicial de dades.

**`location.state`** — Objecte JavaScript arbitrari associat a una entrada de l'historial, passat via `navigate('/ruta', { state: { missatge: 'Hola' } })` o `<Link state={{ dades }}>`. Accessible a la pàgina de destí via `useLocation().state`. No apareix a la URL i no persists en recàrregues de pàgina. Útil per a missatges de feedback (login exitós, producte afegit).

**Memory Router** — Veure `createMemoryRouter`.

**MPA (Multi-Page Application)** — Model tradicional d'aplicació web on cada navegació genera una petició al servidor que retorna un nou fitxer HTML complet. El browser destrueix la pàgina actual i renderitza la nova. Contraposat a SPA.

**`<Navigate>`** — Component de React Router per a redirecció declarativa dins del JSX. Es renderitza en el render del component, navegant immediatament a la ruta especificada. `<Navigate to="/login" replace />` és equivalent a `navigate('/login', { replace: true })` però en forma declarativa. Ideal per a protecció de rutes condicionals.

**`navigate()`** — Funció retornada per `useNavigate()` per a navegació programàtica. Accepta un path string (`navigate('/productes')`), un objecte To (`navigate({ pathname: '/productes', search: '?id=1' })`), o un delta numèric (`navigate(-1)` per anar enrere).

**`<NavLink>`** — Versió de `<Link>` que sap si és actiu (si la URL actual coincideix amb el seu `to`). Afegeix automàticament la classe `.active` quan és actiu. Accepta callbacks a `className`, `style` i `children` que reben `{ isActive, isPending }`. Indispensable per a menús de navegació que han de destacar l'opció activa.

**Nested Routes** — Rutes definides com a filles d'altres rutes en la configuració. Permeten que components pares comparteixin el seu layout amb els fills via `<Outlet>`. Creen una jerarquia de URLs (`/dashboard/usuaris` és filla de `/dashboard`). El component pare es renderitza una sola vegada; únicament la part del `<Outlet>` canvia.

**`Outlet`** — Component de React Router que actua com a placeholder dins d'un component de layout. React Router injecta aquí el component de la ruta filla activa. Sense `<Outlet>`, les rutes filles no es renderitzarien. Pot rebre un `context` prop per passar dades a les rutes filles: `<Outlet context={{ usuari }} />`.

**`params`** — Veure `useParams`.

**Path** — La part de la URL que identifica la ruta, sense el protocol ni el domini. `/productes`, `/productes/42`, `/dashboard/usuaris/5/editar`. En React Router, els segments dinàmics es marquen amb `:`: `/productes/:id`.

**`popstate`** — Event del browser que es dispara quan l'usuari navega per l'historial (botons Enrere/Endavant, o `history.go()`). **Important:** `pushState` i `replaceState` NO disparen `popstate`. React Router escolta aquest event per re-renderitzar el component adequat quan l'usuari prem els botons del browser.

**`preventScrollReset`** — Opció de `navigate()` i `setSearchParams()` que evita que la pàgina faci scroll al top del document après la navegació. Útil per a tabs o filtres al mig d'una pàgina: `navigate('?tab=ressenyes', { preventScrollReset: true })`.

**Programmatic Navigation** — Navegació disparada per codi JavaScript, no per una interacció directa de l'usuari en un link. Implementada via `useNavigate()`. Útil per a: redirecció post-login, navegació post-formulari, timers, condicions asíncrones.

**`pushState()`** — Mètode de la History API que afegeix una nova entrada a la pila d'historial i canvia la URL de la barra d'adreces **sense** fer cap petició al servidor ni recarregar la pàgina. Signatura: `history.pushState(estat, '', '/nova-url')`. El botó Enrere del browser tornarà a la URL anterior. La base del client-side routing.

**Query Parameters** — Veure `useSearchParams` i Search Params.  
**`redirect()`** — Funció de React Router per fer redireccions des de funcions `loader` o `action`. `return redirect('/login')` és l'equivalent server-side de `navigate('/login')`. Preferit sobre `useNavigate()` quan la redirecció depèn del resultat d'un loader.

**`replace`** — Opció de navegació que substitueix l'entrada actual de l'historial en lloc d'afegir-ne una de nova. `navigate('/ruta', { replace: true })` o `<Navigate to="/ruta" replace />`. El botó Enrere del browser NO tornarà a la URL anterior. Útil per: redireccions post-login, formularis d'edició, qualsevol flux on no vols que l'usuari pugui tornar enrere.

**`replaceState()`** — Mètode de la History API que modifica l'entrada actual de la pila d'historial sense afegir-ne una de nova. La URL canvia però el botó Enrere no hi torna. Equivalent a `pushState` però sense ampliar la pila.

**Route** — La unitat bàsica de configuració de React Router. Associa un pattern de URL (`path`) amb un component React (`element`) i opcionalment un `loader`, `action`, `errorElement`, i rutes `children`.

**`RouterProvider`** — Component de React Router que proveeix el context de routing a tots els components fills. Rep el router creat per `createBrowserRouter`. Ha d'embolcallar tota l'aplicació (o la part que necessita routing).

**`<ScrollRestoration>`** — Component de React Router (Data/Framework mode) que gestiona automàticament la posició de scroll entre navegacions. Restaura el scroll a la posició correcta quan l'usuari torna a una pàgina visitada anteriorment.

**Search Params** — Els paràmetres de cerca de la URL: la part après el `?`. Formats de parells clau-valor separats per `&`: `?cerca=sabates&categoria=esport&pàgina=2`. A React Router es gestionen via `useSearchParams()`. Son opcionals, compartibles (formen part de la URL), i s'integren amb l'historial del browser.

**Session History** — L'historial de navegació d'una pestanya del browser. Cada pestanya manté el seu propi historial independent. La History API proporciona accés a aquest historial via `window.history`.

**`setSearchParams()`** — Funció retornada pel hook `useSearchParams()` que actualitza els paràmetres de cerca de la URL. Accepta objectes, strings, arrays de tuples, `URLSearchParams`, i funcions callback (per actualitzar preservant els paràmetres existents). Cada actualització crea una nova entrada a l'historial (o substitueix l'actual si s'usa `replace: true`).

**SPA (Single-Page Application)** — Aplicació web que carrega un sol fitxer HTML i actualitza el contingut dinàmicament via JavaScript sense recàrregues de pàgina. El terme "single page" fa referència a un sol document HTML, no a un sol contingut: les SPAs poden tenir múltiples vistes i URLs. React amb React Router és l'exemple paradigmàtic.

**State (History API)** — Objecte JavaScript associat a una entrada de l'historial. Passat com a primer argument a `pushState` o `replaceState`. Accessible via `window.history.state` o via l'event `popstate`. React Router l'usa per emmagatzemar informació de navegació. En React Router, s'accedeix via `useLocation().state`.

**`To` object** — Objecte que `navigate()` accepta com a primer argument en lloc d'un string. Permet especificar separadament les parts de la URL: `{ pathname: '/productes', search: '?id=1', hash: '#oferta' }`. Totes les propietats son opcionals.

**`to`** — Prop de `<Link>` i `<NavLink>` que especifica la ruta de destí. Pot ser un string (`to="/productes"`) o un objecte To (`to={{ pathname: '/productes', search: '?id=1' }}`). Equivalent a l'`href` d'una etiqueta `<a>`.

**`URLSearchParams`** — Objecte natiu del browser per treballar amb query strings. Retornat per `useSearchParams()`. Mètodes principals: `.get('clau')` (retorna string o null), `.getAll('clau')` (retorna array), `.set('clau', 'valor')`, `.delete('clau')`, `.append('clau', 'valor')` (afegeix sense eliminar existents), `.has('clau')`, `.toString()`.

**`useLoaderData`** — Hook de React Router que retorna les dades carregades per la funció `loader` de la ruta actual. Les dades estan disponibles quan el component renderitza (sense loading state\!). Elimina el patró `useEffect + useState('loading')` per a la càrrega inicial de dades. Disponible a partir de React Router v6.4.

**`useLocation`** — Hook de React Router que retorna l'objecte `location` actual amb: `pathname` (la ruta), `search` (la query string), `hash` (l'ancla), `state` (dades passades via navigate), i `key` (identificador únic de l'entrada de l'historial). Útil per detectar canvis de ruta i llegir l'estat de navegació.

**`useMatch`** — Hook de React Router que retorna informació sobre si un pattern de ruta coincideix amb la URL actual. Retorna `null` si no coincideix o un objecte `PathMatch` amb els params si coincideix. Útil per a lògica condicional basada en la ruta activa.

**`useNavigate`** — Hook de React Router que retorna una funció `navigate()` per a navegació programàtica. S'usa dins de components funcionals quan la navegació depèn de lògica asíncrona o condicions del codi (post-login, post-formulari, timers). Per a navegació normal, preferir `<Link>` o `<NavLink>`.

**`useNavigation`** — Hook de React Router que retorna l'estat de la navegació en curs. `navigation.state` pot ser `'idle'` (sense navegació), `'loading'` (carregant una nova ruta) o `'submitting'` (enviant un formulari). Útil per a loading indicators globals i per desactivar botons mentre es processen accions.

**`useOutletContext`** — Hook de React Router que permet a les rutes filles accedir al context passat per el layout pare via `<Outlet context={valor}>`. Alternativa a prop drilling o Context API per a dades que el layout vol compartir amb tots els seus fills.

**`useParams`** — Hook de React Router que retorna un objecte amb els paràmetres dinàmics de la URL actual. Per a la ruta `/productes/:id/:slug`, retorna `{ id: '42', slug: 'nom-producte' }`. Els valors son sempre strings. Cal convertir tipus si es necessita un número: `Number(useParams().id)`.

**`useRouteError`** — Hook de React Router disponible únicament dins de components especificats com `errorElement`. Retorna l'error llançat per la ruta o el seu loader. Combinar amb `isRouteErrorResponse()` per diferenciar errors HTTP de React Router d'errors genèrics de JavaScript.

**`useSearchParams`** — Hook de React Router equivalent a `useState` però amb la URL com a emmagatzematge. Retorna `[searchParams, setSearchParams]`. `searchParams` és una instància de `URLSearchParams`. Ideal per a filtres, cerca i paginació que han de ser compartibles, persistents en recàrregues, i integrats amb el botó Enrere del browser.

**`viewTransition`** — Opció de `navigate()` (React Router v7+) que activa la View Transitions API del browser (`document.startViewTransition`). Permet animacions natives entre vistes durant la navegació, sense CSS personalitzat complex. Suportat en browsers moderns (Chrome 111+, Safari 18+).

**`window.history`** — L'objecte global del browser que proporciona accés a la History API. El mateix que `history` sense el prefix `window`. Propietats: `length` (nombre d'entrades), `state` (estat de l'entrada actual), `scrollRestoration`. Mètodes: `pushState()`, `replaceState()`, `back()`, `forward()`, `go()`.

**`window.location`** — L'objecte global del browser que descriu la URL actual. Propietats: `href` (URL completa), `pathname` (ruta), `search` (query string), `hash` (ancla), `origin`, `host`, `protocol`. `useLocation()` de React Router és l'abstracció React d'aquest objecte, sincronitzada amb la History API automàticament.

