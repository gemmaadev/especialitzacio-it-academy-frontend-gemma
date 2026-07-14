## **Tema 1 — Enrutament web amb React Router**

**1\. Com funciona l'enrutament en una SPA**

Una SPA (Single-Page Application) carrega únicament un fitxer HTML (`index.html`) i gestiona tota la navegació via JavaScript, sense sol·licitar noves pàgines al servidor.

| MPA (tradicional):          SPA (React Router):Clic → GET /productes →     Clic → pushState('/productes') →Servidor retorna HTML →     React renderitza \<Productes /\> →Recàrrega completa ❌       Sense recàrrega ✅ (10-50ms) |
| :---- |

El fonament tècnic és la **History API** del browser: tres mètodes i un event que fan possible el client-side routing.

| // Les dues operacions fonamentals:history.pushState(estat, '', '/productes');    // afegir entrada a l'historialhistory.replaceState(estat, '', '/login');     // substituir l'entrada actual// Detectar botons ← → del browser:window.addEventListener('popstate', (e) \=\> {  renderitzarRuta(window.location.pathname);});// Navegació per l'historial:history.back();    // ← equivalent al botó del browserhistory.forward(); // →history.go(\-2);    // ← dos passos enrere |
| :---- |

React Router és una capa d'abstracció sobre aquesta API: `<Link>` fa `preventDefault + pushState`, `useNavigate` fa `pushState` o `replaceState`, i un listener intern a `popstate` re-renderitza el component adequat.

**2\. Configuració de React Router**

| npm install react-router-dom |
| :---- |

| // La configuració moderna (v7/v8): createBrowserRouterimport { createBrowserRouter, RouterProvider } from 'react-router-dom';const router \= createBrowserRouter(\[  {    path: '/',    element: \<Layout /\>,    errorElement: \<ErrorPage /\>,     // ← 404 i errors    children: \[      { index: true, element: \<Home /\> },              // → /      { path: 'productes', element: \<Productes /\> },   // → /productes      { path: 'productes/:id', element: \<Detall /\> },  // → /productes/42      { path: '\*', element: \<NotFound /\> },             // → qualsevol altra    \],  },\]);function App() {  return \<RouterProvider router={router} /\>;} |
| :---- |

**Les tres estratègies de router:**

| createBrowserRouter()  // History API, URLs netes (/productes) → la més usadacreateHashRouter()     // URL amb hash (/\#/productes) → sense config de servidorcreateMemoryRouter()   // Historial en memòria → tests i React Native |
| :---- |

**3\. Navegació declarativa: `<Link>` i `<NavLink>`**

`<Link>` renderitza un `<a>` semàntic que intercepta el clic i usa `pushState` en lloc de fer una petició al servidor. Proporciona totes les funcionalitats natives: `Command+Click`, menú contextual, accessibilitat.

| // \<Link\>: navegació bàsica\<Link to="/productes"\>Productes\</Link\>\<Link to="/productes" state={{ origen: 'home' }}\>Productes\</Link\>\<Link to="/productes" replace\>Productes (sense historial)\</Link\>// \<NavLink\>: link amb estat actiu automàtic (per a menús de navegació)\<NavLink to="/productes" className={({ isActive }) \=\>  isActive ? 'nav-link actiu' : 'nav-link'}\>  Productes\</NavLink\>// → Quan URL \= /productes → classe 'actiu' aplicada automàticament// → 'end' prop per a coincidència exacta (necessari per a '/')// \<Navigate\>: redirecció declarativa dins del JSXfunction PàginaProtegida() {  const { autenticat } \= useAuth();  if (\!autenticat) return \<Navigate to="/login" replace /\>;  return \<ContingutProtegit /\>;} |
| :---- |

**4\. Navegació programàtica: `useNavigate`**

Per a navegació que depèn de lògica asíncrona o condicions en el codi.

| const navigate \= useNavigate();navigate('/dashboard');                         // navegar a una rutanavigate('/login', { replace: true });          // sense entrada a l'historialnavigate('/productes', { state: { id: 42 } }); // passar dadesnavigate(\-1);                                   // ← enrerenavigate(1);                                    // → endavantnavigate('?tab=ressenyes', { preventScrollReset: true }); // sense scroll reset |
| :---- |

| La regla:  L'usuari clica → \<Link\> o \<NavLink\> (declaratiu)  Condició al JSX → \<Navigate\> (declaratiu condicional)  Después d'una acció asíncrona (login, form) → useNavigate() (programàtic) |
| :---- |

**5\. Paràmetres d'URL: `useParams` i `useSearchParams`**

### **Paràmetres de ruta (`useParams`)**

| // Ruta: /productes/:categoriaId/items/:itemIdfunction DetalItem() {  const { categoriaId, itemId } \= useParams();  // URL /productes/esport/items/42 → { categoriaId: 'esport', itemId: '42' }  // ← SEMPRE strings, convertir si cal: Number(itemId)} |
| :---- |

### **Paràmetres de cerca (`useSearchParams`) — estat compartible**

| // Com useState però emmagatzema a la URL → compartible, persistent, historialconst \[searchParams, setSearchParams\] \= useSearchParams();const cerca \= searchParams.get('cerca') || '';const pàgina \= Number(searchParams.get('pàgina') || '1');const etiquetes \= searchParams.getAll('tag'); // → múltiples valors// Actualitzar preservant la resta de params:setSearchParams(prev \=\> {  prev.set('pàgina', '2');  return prev;});// URL: /productes?cerca=sabates\&pàgina=2\&tag=nike// La regla: "L'usuari hauria de poder compartir o marcar aquesta vista?"//   SÍ → useSearchParams   NO → useState |
| :---- |

**6\. Rutes de layout i `<Outlet>`**

`<Outlet>` és el placeholder on React Router injecta el component de la ruta filla activa. Elimina la duplicació de Header/Footer/Sidebar en cada pàgina.

| // Layout: elements compartits \+ Outletfunction AppLayout() {  return (    \<\>      \<Header /\>     {/\* ← únicament aquí, mai duplicat \*/}      \<Sidebar /\>      \<main\>        \<Outlet /\>   {/\* ← canvia amb cada ruta \*/}      \</main\>      \<Footer /\>    \</\>  );}// Múltiples layouts per a seccions diferents:const router \= createBrowserRouter(\[  { element: \<LayoutPublic /\>,    children: \[{ path: '/', element: \<Home /\> }\] },  { element: \<LayoutAuth /\>,      children: \[{ path: '/login', element: \<Login /\> }\] },  { path: '/dashboard', element: \<LayoutDashboard /\>, children: \[...\] },\]);// Layout sense path: guard d'autenticació comú per a totes les filles{  element: \<ProtectedRoute /\>,   // ← sense 'path', no afegeix segment a la URL  children: \[    { path: '/dashboard', element: \<Dashboard /\> },    { path: '/perfil', element: \<Perfil /\> },  \],}// Passar dades del layout als fills sense prop drilling:\<Outlet context={{ usuari, notificacions }} /\>// Al fill:const { usuari } \= useOutletContext\<DashboardContext\>(); |
| :---- |

**7\. Els hooks de React Router**

| Hook | Retorna | Quan usar |
| ----- | ----- | ----- |
| `useNavigate` | Funció `navigate()` | Navegació post-login, post-form |
| `useParams` | `{ id: string, ... }` | Paràmetres de ruta dinàmica (`:id`) |
| `useSearchParams` | `[params, setParams]` | Filtres, cerca, paginació, tabs |
| `useLocation` | Objecte `location` | `pathname`, `state`, `search`, `hash` |
| `useRouteError` | Error de la ruta | Components `errorElement` (404, errors) |
| `useOutletContext` | Context del layout pare | Dades del layout → fills sense prop drilling |
| `useLoaderData` | Dades del `loader` | Dades pre-carregades (v6.4+, sense `useEffect`) |
| `useNavigation` | Estat de navegació | Loading indicators globals, botons desactivats |

| // useLocation: informació completa de la URL actualconst location \= useLocation();location.pathname  // "/productes/42"location.search    // "?categoria=esport"location.state     // { missatge: 'Login correcte\!' }location.hash      // "\#oferta"// useRouteError: gestió d'errors i 404function ErrorPage() {  const error \= useRouteError();  if (isRouteErrorResponse(error)) {    return \<h1\>{error.status} {error.statusText}\</h1\>; // 404, 500...  }  return \<h1\>{error instanceof Error ? error.message : 'Error'}\</h1\>;} |
| :---- |

**8\. La history API: el fonament tècnic**

| // Les operacions que React Router usa internament:history.pushState({}, '', '/nova-ruta');    // afegir a l'historialhistory.replaceState({}, '', '/nova-ruta'); // substituir l'entrada actual// El que dispara re-renders en React Router:window.addEventListener('popstate', () \=\> {  // React Router re-renderitza el component de window.location.pathname});// React Router NO usa pushState/replaceState per als botons ← →// Únicament els detecta via 'popstate' |
| :---- |

**9\. La UX de la navegació sense recàrrega**

**Per quèimporta:** les recàrregues destrueixen l'estat (carret de compra, filtres, posició de scroll, dades en memòria). La navegació SPA preserva tot mentre únicament canvia el contingut necessari.

✅ Avantatges de la navegació SPA:  
  Velocitat instantània (10-50ms vs 500ms-3s)  
  Estat preservat (carret, filtres, scroll)  
  Transicions i animacions possibles  
  Historial del browser integrat (← → funcionen)  
  Missatges entre pàgines via location.state  
  URL com a estat compartible (useSearchParams)

⚠️ Limitació: requereix server fallback per a deep links  
  → El servidor ha de retornar index.html per a qualsevol URL

**Resum del tema** 

| History API (browser natiu)  pushState / replaceState → canviar URL sense recàrrega  popstate event → detectar ← →        ↓React Router (abstracció)  createBrowserRouter → configuració declarativa de rutes  \<RouterProvider\>    → proveïdor de context de routing        ↓NAVEGACIÓ:  Declarativa: \<Link\> → a semàntic \+ pushState               \<NavLink\> → Link \+ isActive automàtic               \<Navigate\> → redirecció condicional al JSX  Programàtica: useNavigate() → post-login, post-form, timers        ↓RUTES:  Estàtiques:  { path: '/sobre', element: \<Sobre /\> }  Dinàmiques:  { path: '/prod/:id', element: \<Detall /\> }  Índex:       { index: true, element: \<Home /\> }  Layout:      { element: \<Layout /\>, children: \[...\] }  ← Outlet  Protected:   { element: \<Guard /\>, children: \[...\] }   ← sense path  Error:       errorElement: \<ErrorPage /\>               ← 404 i errors        ↓PARÀMETRES:  useParams()        → :id, :slug (path params, obligatoris)  useSearchParams()  → ?cerca=x\&pàgina=2 (query params, opcionals, compartibles)        ↓HOOKS:  useLocation     → pathname, search, state, hash  useRouteError   → errorElement: gestió 404 i errors  useOutletContext → dades del layout als fills  useLoaderData   → dades pre-carregades pel loader  useNavigation   → estat loading/submitting global |
| :---- |

