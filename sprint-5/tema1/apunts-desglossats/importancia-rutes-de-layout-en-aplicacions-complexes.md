## **Per què son importants les rutes de layout en aplicacions complexes**

**El problema que resolen: la duplicació de layout**

Sense rutes de layout, cada component de pàgina hauria d'incloure el header, sidebar i footer per si sol. Això crea una duplicació massiva i un manteniment molt difícil.

| // ❌ SENSE rutes de layout: duplicació a cada pàginafunction PàginaHome() {  return (    \<\>      \<Header /\>      {/\* ← duplicat \*/}      \<Sidebar /\>     {/\* ← duplicat \*/}      \<main\>Contingut Home\</main\>      \<Footer /\>      {/\* ← duplicat \*/}    \</\>  );}function PàginaProductes() {  return (    \<\>      \<Header /\>      {/\* ← duplicat \*/}      \<Sidebar /\>     {/\* ← duplicat \*/}      \<main\>Contingut Productes\</main\>      \<Footer /\>      {/\* ← duplicat \*/}    \</\>  );}// → Si cal canviar el Header → has de tocar TOTES les pàgines// → Si tens 30 pàgines → 30 llocs on actualitzar// ✅ AMB rutes de layout: cada element únicament una vegadafunction Layout() {  return (    \<\>      \<Header /\>      {/\* ← únicament aquí \*/}      \<Sidebar /\>     {/\* ← únicament aquí \*/}      \<main\>        \<Outlet /\>    {/\* ← el contingut específic de cada ruta \*/}      \</main\>      \<Footer /\>      {/\* ← únicament aquí \*/}    \</\>  );}// → Canviar el Header → únicament al component Layout → tot actualitzat ✅ |
| :---- |

**`<Outlet>`: el component clau**

`<Outlet>` és el component de React Router que actua com a placeholder on s'injecten les rutes filles. Les rutes de layout han de contenir un component `<Outlet>`, o les rutes filles no tindran on renderitzar i no mostraran res.

| import { Outlet, NavLink } from 'react-router-dom';function AppLayout() {  return (    \<div className="app"\>      \<header\>        \<nav\>          \<NavLink to="/" end\>Home\</NavLink\>          \<NavLink to="/productes"\>Productes\</NavLink\>          \<NavLink to="/about"\>Sobre nosaltres\</NavLink\>        \</nav\>      \</header\>      \<main\>        \<Outlet /\>        {/\*          ↑ Aquí React Router injecta el component de la ruta filla activa:          → URL "/"          → renderitza \<Home /\>          → URL "/productes" → renderitza \<Productes /\>          → URL "/about"     → renderitza \<About /\>          El Header i Footer mai es re-renderitzen (rendiment millor\!)        \*/}      \</main\>      \<footer\>(c) 2026 La meva app\</footer\>    \</div\>  );} |
| :---- |

**Configuració de rutes de layout**

| import { createBrowserRouter, RouterProvider } from 'react-router-dom';const router \= createBrowserRouter(\[  {    path: '/',    element: \<AppLayout /\>,      // ← el layout pare    errorElement: \<ErrorPage /\>, // ← gestiona errors de totes les filles    children: \[                  // ← rutes filles injectades via \<Outlet\>      { index: true, element: \<Home /\> },         // → /      { path: 'productes', element: \<Productes /\> }, // → /productes      { path: 'productes/:id', element: \<DetalProducte /\> }, // → /productes/42      { path: 'about', element: \<About /\> },      // → /about    \],  },\]);function App() {  return \<RouterProvider router={router} /\>;} |
| :---- |

**Múltiples layouts per a seccions diferents**

Una aplicació real té sovint seccions amb layouts completament diferents: pàgines públiques, dashboard d'admin, àrea de client, etc.

| const router \= createBrowserRouter(\[  // Layout pública (header simple, sense sidebar)  {    element: \<LayoutPublic /\>,    children: \[      { path: '/', element: \<Landing /\> },      { path: '/preus', element: \<Preus /\> },      { path: '/blog', element: \<Blog /\> },      { path: '/blog/:slug', element: \<Article /\> },    \],  },  // Layout autenticació (sense header ni footer, centrat)  {    element: \<LayoutAuth /\>,    children: \[      { path: '/login', element: \<Login /\> },      { path: '/registre', element: \<Registre /\> },      { path: '/recuperar-contrasenya', element: \<RecuperarContrasenya /\> },    \],  },  // Layout Dashboard (sidebar \+ header complex)  {    path: '/dashboard',    element: \<LayoutDashboard /\>,    children: \[      { index: true, element: \<DashboardHome /\> },      { path: 'productes', element: \<GestioProductes /\> },      { path: 'usuaris', element: \<GestioUsuaris /\> },      { path: 'configuració', element: \<Configuració /\> },    \],  },\]); |
| :---- |

**Layout routes sense segment d'URL**

Una funcionalitat poderosa de React Router: pots crear una ruta de layout que **no afegeix cap segment a la URL**. Les rutes de layout creen un nou nivell d'anidament per als seus fills, però no afegeixen cap segment a la URL.

| // Ruta de layout sense path: agrupa rutes sota un layout// sense canviar les URLsconst router \= createBrowserRouter(\[  {    // ← Sense 'path': no afegeix cap segment a la URL    element: \<LayoutProtegit /\>,  // ← verifica autenticació    children: \[      { path: '/dashboard', element: \<Dashboard /\> },   // → /dashboard      { path: '/perfil', element: \<Perfil /\> },          // → /perfil      { path: '/configuració', element: \<Config /\> },    // → /configuració      // → Totes protegides, sense el /protegit/ a la URL\!    \],  },  { path: '/login', element: \<Login /\> },  // → /login (pública)\]);// El LayoutProtegit: verifica auth via \<Outlet\>function LayoutProtegit() {  const { estaAutenticat } \= useAuth();  if (\!estaAutenticat) {    return \<Navigate to="/login" replace /\>;  }  return \<Outlet /\>;   // ← si autenticat: renderitza la ruta filla} |
| :---- |

**Nested layouts: layouts dins de layouts**

Les aplicacions complexes necessiten múltiples nivells de layout. Els layouts aniuats permeten tenir un layout global (header/footer) i un layout específic de secció (sidebar de dashboard) de manera neta.

| const router \= createBrowserRouter(\[  {    path: '/',    element: \<LayoutGlobal /\>,      // Header \+ Footer globals    children: \[      { index: true, element: \<Home /\> },      {        path: 'dashboard',        element: \<LayoutDashboard /\>, // Sidebar del dashboard        children: \[          { index: true, element: \<Resum /\> },          {            path: 'usuaris',            element: \<LayoutUsuaris /\>, // Sub-tabs d'usuaris            children: \[              { index: true, element: \<LlistaUsuaris /\> },              { path: ':id', element: \<DetalUsuari /\> },              { path: ':id/editar', element: \<EditarUsuari /\> },            \],          },        \],      },    \],  },\]);// LayoutGlobal: header \+ footerfunction LayoutGlobal() {  return (    \<div\>      \<Header /\>      \<Outlet /\>  {/\* ← injecta LayoutDashboard o Home \*/}      \<Footer /\>    \</div\>  );}// LayoutDashboard: sidebar específic del dashboardfunction LayoutDashboard() {  return (    \<div className="dashboard"\>      \<Sidebar\>        \<NavLink to="/dashboard" end\>Resum\</NavLink\>        \<NavLink to="/dashboard/usuaris"\>Usuaris\</NavLink\>      \</Sidebar\>      \<main\>        \<Outlet /\>  {/\* ← injecta Resum, LayoutUsuaris, etc. \*/}      \</main\>    \</div\>  );} |
| :---- |

**Passar dades del layout a les rutes filles: `useOutletContext`**

`<Outlet>` té un prop `context` que permet passar dades a les rutes filles sense prop drilling ni Context API.

| import { Outlet, useOutletContext } from 'react-router-dom';// Component pare (layout): passa dades via contextfunction DashboardLayout() {  const { usuari } \= useAuth();  const \[notificacions, setNotificacions\] \= useState(\[\]);  return (    \<div\>      \<Sidebar /\>      \<main\>        {/\* Passar dades a totes les rutes filles \*/}        \<Outlet context={{ usuari, notificacions, setNotificacions }} /\>      \</main\>    \</div\>  );}// Component fill: accedir al context del layout parefunction PàginaPerfil() {  const { usuari } \= useOutletContext\<{    usuari: Usuari;    notificacions: Notificació\[\];    setNotificacions: React.Dispatch\<React.SetStateAction\<Notificació\[\]\>\>;  }\>();  return \<h1\>Hola, {usuari.nom}\!\</h1\>;} |
| :---- |

**Layout de ruta protegida: el patró més usat**

La combinació de rutes de layout sense path \+ verificació d'autenticació és el patró estàndard per a rutes protegides.

| // ProtectedRoute: layout sense path que actua de guardfunction ProtectedRoute() {  const { isAuthenticated, isLoading } \= useAuth();  const location \= useLocation();  if (isLoading) return \<LoadingScreen /\>;  if (\!isAuthenticated) {    // Preservar la URL original per redirigir après el login    return \<Navigate to="/login" state={{ from: location }} replace /\>;  }  return \<Outlet /\>;  // ← si autenticat: renderitza el fill}// Configuració de rutes: eleganta i claraconst router \= createBrowserRouter(\[  // Rutes públiques  { path: '/login', element: \<Login /\> },  { path: '/registre', element: \<Registre /\> },  // Rutes protegides (agrupades sota el layout guard)  {    element: \<ProtectedRoute /\>,  // ← guard comú per a totes les filles    children: \[      {        path: '/dashboard',        element: \<DashboardLayout /\>,        children: \[          { index: true, element: \<Resum /\> },          { path: 'productes', element: \<Productes /\> },          { path: 'configuració', element: \<Config /\> },        \],      },      { path: '/perfil', element: \<Perfil /\> },    \],  },\]);// Al login, redirigir a la URL originalfunction Login() {  const navigate \= useNavigate();  const location \= useLocation();  const destí \= location.state?.from?.pathname || '/dashboard';  const handleLogin \= async () \=\> {    await iniciarSessio();    navigate(destí, { replace: true }); // ← torna on l'usuari volia anar  };} |
| :---- |

**Resum: per què son importants les rutes de layout**

| PROBLEMA → SOLUCIÓ AMB RUTES DE LAYOUT:Duplicació de codi    → Layout compartit via Outlet: escriu Header/Footer una sola vegadaManteniment difícil  → Canviar el layout → únicament al component LayoutMúltiples seccions   → Múltiples layouts per a àrees (public, auth, dashboard)Rutes protegides     → Layout Guard (sense path) com a wrapper d'autenticacióDades compartides    → useOutletContext per a dades del layout a les fillesLayouts aniuats      → Outlet dins d'Outlet per a seccions amb sub-layoutARQUITECTURA TÍPICA D'UNA APP REAL:  LayoutGlobal (Header \+ Footer)    ↓ \<Outlet\>    LayoutPublic (Landing, Blog, Preus)    LayoutAuth (Login, Registre) → sense Header/Footer    ProtectedRoute (guard)      ↓ \<Outlet\>      LayoutDashboard (Sidebar admin)        ↓ \<Outlet\>        PàginesAdmin (Resum, Usuaris, Config...) |
| :---- |

