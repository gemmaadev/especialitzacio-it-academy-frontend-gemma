## **Quins avantatges ofereix React Router sobre la gestió manual d'URLs?**

**React Router Tutorial**  
[https://reactrouter.com/main/start/tutorial](https://reactrouter.com/main/start/tutorial)   
Tutorial pas a pas per començar a utilitzar React Router en projectes nous.

**Què implicaria gestionar URLs manualment**

Per entendre el valor de React Router, cal veure com seria una SPA sense ell. La gestió manual d'URLs implica implementar des de zero totes les funcionalitats que React Router proporciona.

| // ❌ GESTIÓ MANUAL: el que caldria implementar sense React Routerfunction AppManual() {  const \[rutaActual, setRutaActual\] \= useState(window.location.pathname);  // 1\. Escolt de canvis de URL (enrere/endavant del browser)  useEffect(() \=\> {    const handlePopstate \= () \=\> setRutaActual(window.location.pathname);    window.addEventListener('popstate', handlePopstate);    return () \=\> window.removeEventListener('popstate', handlePopstate);  }, \[\]);  // 2\. Funció de navegació manual  const navega \= (path: string) \=\> {    window.history.pushState({}, '', path);    setRutaActual(path);  };  // 3\. Matching manual de rutes (sense paràmetres dinàmics\!)  const renderitzarPàgina \= () \=\> {    if (rutaActual \=== '/') return \<Home /\>;    if (rutaActual \=== '/productes') return \<Productes /\>;    if (rutaActual \=== '/about') return \<About /\>;    // ¿I /productes/42? ¿I /productes/abc? Caldria regex\!    // ¿I /admin/usuaris/5/editar? Caldria molt més codi...    return \<NotFound /\>;  };  return (    \<div\>      {/\* 4\. Links manuals (tots\!) \*/}      \<button onClick={() \=\> navega('/')}\>Home\</button\>      \<button onClick={() \=\> navega('/productes')}\>Productes\</button\>      {renderitzarPàgina()}    \</div\>  );}// → Centenars de línies per a funcionalitats bàsiques// → Sense rutes dinàmiques, nested routes, ni guards// → Sense gestió d'errors 404 genèrica |
| :---- |

**Avantatge 1: enrutament declaratiu i llegible**

React Router funciona de manera declarativa, la qual cosa significa que si demanem dues rutes diferents rebrem dos components si la URL coincideix. Encaixa perfectament amb els principis de React gràcies a la seva naturalesa declarativa.

| // ✅ REACT ROUTER: declaratiu i llegibleimport { createBrowserRouter, RouterProvider } from 'react-router-dom';const router \= createBrowserRouter(\[  {    path: '/',    element: \<Layout /\>,    errorElement: \<ErrorPage /\>,    // ← 404 i errors: una sola línia    children: \[      { index: true, element: \<Home /\> },      { path: 'productes', element: \<Productes /\> },      { path: 'productes/:id', element: \<DetalProducte /\> }, // ← dinàmic\!      { path: 'admin', element: \<Admin /\>,        children: \[                             // ← nested routes          { path: 'usuaris', element: \<Usuaris /\> },          { path: 'usuaris/:userId/editar', element: \<EditarUsuari /\> },        \]      },    \],  },\]);// Tota la configuració de rutes en UN sol lloc → llegible i mantenible |
| :---- |

**Avantatge 2: rutes dinàmiques i extracció de paràmetres**

Implementar rutes dinàmiques (`/productes/:id`) manualment requereix expressions regulars complexes. React Router ho resol amb un hook.

| // ❌ MANUAL: regex complexa per a paràmetres dinàmicsconst extreurePàginaProducte \= (path: string) \=\> {  const match \= path.match(/^\\/productes\\/(\[^/\]+)$/);  if (match) {    const id \= match\[1\];    return \<DetalProducte id={id} /\>;  }  // I si necessitem /productes/:categoria/:id? Més regex\!  const matchNested \= path.match(/^\\/productes\\/(\[^/\]+)\\/(\[^/\]+)$/);  // ...i així successivament per cada patró};// ✅ REACT ROUTER: useParams extreu els paràmetres automàticamentfunction DetalProducte() {  const { id } \= useParams();  // React Router ja ha extret 'id' de la URL /productes/42 → id \= "42"  // Funciona per a /productes/:id, /productes/:cat/:id, etc.  return \<div\>Producte: {id}\</div\>;} |
| :---- |

**Avantatge 3: `<Link>` i `<NavLink>` vs. botons manuals**

El component `<Link>` de React Router no és únicament un botó que crida `pushState`. Proporciona funcionalitats crítiques automàticament.

| // ❌ MANUAL: perd beneficis crucials\<button onClick={() \=\> navega('/productes')}\>Productes\</button\>// Problemes:// → No funciona amb Command+Click (obrir en nova pestanya)// → No és accessible (no és un \<a\> semànticament)// → Screen readers no anuncien que és un link// → No apareix a "Copiar adreça de l'enllaç"// → No es prefetcha automàticament// ✅ REACT ROUTER \<Link\>: semàntic i complet\<Link to="/productes"\>Productes\</Link\>// Renderitza un \<a href="/productes"\> real → totes les funcionalitats natives// → Command+Click → nova pestanya ✅// → Accessible per a screen readers ✅// → Apareix al menú contextual del browser ✅// → SEO: els crawlers el segueixen ✅// ✅ REACT ROUTER \<NavLink\>: link amb estat actiu automàtic\<NavLink  to="/productes"  className={({ isActive }) \=\> isActive ? 'actiu' : ''}\>  Productes\</NavLink\>// isActive → true quan la URL coincideix amb /productes// → Estilitzar el link actiu al menú de navegació sense cap lògica extra |
| :---- |

**Avantatge 4: navegació programàtica amb `useNavigate`**

| // ❌ MANUAL: pushState \+ actualitzar estat \+ gestionar errorsconst navega \= (path: string) \=\> {  window.history.pushState({}, '', path);  setRutaActual(path); // cal actualitzar manualment l'estat\!  // I si necessitem navegar "enrere"? history.go(-1) \+ actualitzar estat};// ✅ REACT ROUTER: useNavigate integrat amb tot el sistemaimport { useNavigate } from 'react-router-dom';function FormulariLogin() {  const navigate \= useNavigate();  const handleSubmit \= async (e) \=\> {    e.preventDefault();    await login(credencials);    navigate('/dashboard');          // navegar a una ruta    navigate(\-1);                    // enrere (com el botó del browser)    navigate('/login', { replace: true }); // substituir (sense historial)    navigate('/productes', {      state: { missatge: 'Login correcte\!' } // passar dades a la nova pàgina    });  };} |
| :---- |

**Avantatge 5: Nested Routes i Layouts compartits**

Un dels avantatges més grans: compartir layouts sense duplicació de codi.

| // ❌ MANUAL: duplicar el layout a cada "pàgina"const renderitzar \= () \=\> {  // Cal incloure Header i Sidebar manualment a cada cas\!  if (ruta \=== '/') return (    \<\>\<Header /\>\<Sidebar /\>\<Home /\>\</\>  );  if (ruta \=== '/productes') return (    \<\>\<Header /\>\<Sidebar /\>\<Productes /\>\</\>   // Duplicació\!  );  if (ruta \=== '/about') return (    \<\>\<Header /\>\<Sidebar /\>\<About /\>\</\>       // Duplicació\!  );};// ✅ REACT ROUTER: nested routes \+ Outlet eliminen la duplicaciófunction Layout() {  return (    \<\>      \<Header /\>         {/\* ← renderitzat UNA SOLA vegada \*/}      \<Sidebar /\>        {/\* ← renderitzat UNA SOLA vegada \*/}      \<main\>        \<Outlet /\>       {/\* ← aquí apareix la ruta filla activa \*/}      \</main\>    \</\>  );}// Les rutes filles s'injecten via \<Outlet /\> automàticament:{ path: '/', element: \<Layout /\>, children: \[  { index: true, element: \<Home /\> },       // → \<Outlet /\> mostra \<Home /\>  { path: 'productes', element: \<Productes /\> }, // → \<Outlet /\> mostra \<Productes /\>  { path: 'about', element: \<About /\> },    // → \<Outlet /\> mostra \<About /\>\]} |
| :---- |

**Avantatge 6: Gestió d'errors i 404 integrada**

| // ❌ MANUAL: cal gestionar errors a cada ruta individualmentconst renderitzar \= () \=\> {  try {    if (ruta \=== '/') return \<Home /\>;    // ... totes les rutes    return \<NotFound /\>; // cal recordar de posar-ho sempre\!  } catch (error) {    return \<ErrorGeneral error={error} /\>;  }};// ✅ REACT ROUTER: errorElement gestiona errors i 404 automàticamentconst router \= createBrowserRouter(\[  {    path: '/',    element: \<Layout /\>,    errorElement: \<ErrorPage /\>,  // ← captura 404 i errors de tota la subárbre    children: \[      { path: 'productes/:id', element: \<DetalProducte /\>,        errorElement: \<ErrorProducte /\> }  // ← error específic per a la ruta    \],  },\]);// useRouteError: accedir a l'error des del component d'errorimport { useRouteError } from 'react-router-dom';function ErrorPage() {  const error \= useRouteError();  return error.status \=== 404    ? \<h1\>Pàgina no trobada\</h1\>    : \<h1\>Error: {error.message}\</h1\>;} |
| :---- |

**Avantatge 7: Search Params i estat en URL**

| // ❌ MANUAL: parsejar i actualitzar query strings manualmentconst params \= new URLSearchParams(window.location.search);const pàgina \= Number(params.get('pàgina')) || 1;// Per actualitzar: reconstruir la query string manualmentconst actualitzarPàgina \= (nova) \=\> {  params.set('pàgina', String(nova));  window.history.pushState({}, '', \`?${params.toString()}\`);  setRutaActual(window.location.pathname \+ window.location.search);};// ✅ REACT ROUTER: useSearchParams com a useState de la URLimport { useSearchParams } from 'react-router-dom';function LlistaProductes() {  const \[searchParams, setSearchParams\] \= useSearchParams();  const pàgina \= Number(searchParams.get('pàgina')) || 1;  const cerca \= searchParams.get('cerca') || '';  return (    \<\>      \<input        value={cerca}        onChange={e \=\> setSearchParams({ cerca: e.target.value, pàgina: '1' })}      /\>      \<button onClick={() \=\> setSearchParams({ pàgina: String(pàgina \+ 1) })}\>        Pàgina {pàgina \+ 1}      \</button\>    \</\>  );  // URL resultant: /productes?cerca=camisa\&pàgina=2  // → Compartible, marcable, navegació amb enrere/endavant\!} |
| :---- |

La gestió d'estat basada en URL amb React Router DOM proporciona: vistes compartibles (els usuaris poden copiar, compartir i guardar URLs que representen estats específics de l'aplicació), integració amb l'historial del browser (navegació perfecta amb els botons enrere/endavant) i compatibilitat amb SSR.

**Avantatge 8: Data Loading integrat (React Router v7+)**

React Router v7, llançat el 2024, introdueix loaders i actions a nivell de ruta com la manera preferida de fer fetch de dades i gestionar mutacions. Aquest patró millora la consistència, simplifica la gestió d'estat i s'alinea bé amb SSR i streaming rendering.

| // Carregant dades ABANS de renderitzar la ruta (sense useEffect\!)const router \= createBrowserRouter(\[  {    path: 'productes/:id',    loader: async ({ params }) \=\> {      const producte \= await fetch(\`/api/productes/${params.id}\`);      if (\!producte.ok) throw new Response('Not Found', { status: 404 });      return producte.json();    },    element: \<DetalProducte /\>,  },\]);// Al component: accedir a les dades ja carregadesimport { useLoaderData } from 'react-router-dom';function DetalProducte() {  const producte \= useLoaderData(); // ← ja carregat, sense loading state\!  return \<h1\>{producte.nom}\</h1\>;} |
| :---- |

**Manual vs. React Router**

| Funcionalitat | Manual | React Router |
| ----- | ----- | ----- |
| **Configuració de rutes** | Switch/if-else | Configuració declarativa |
| **Paràmetres dinàmics** | Regex manual | `useParams()` automàtic |
| **Links semàntics** | `<button>` \+ pushState | `<Link>` i `<NavLink>` |
| **Link actiu** | Lògica manual | `<NavLink isActive>` |
| **Navegació programàtica** | `pushState()` \+ estat | `useNavigate()` |
| **Layouts compartits** | Duplicació de codi | Nested routes \+ `<Outlet>` |
| **Errors 404** | Manual a cada ruta | `errorElement` global |
| **Search params** | URLSearchParams manual | `useSearchParams()` |
| **Data loading** | `useEffect` \+ estat | `loader` integrat |
| **Historial del browser** | `popstate` listener | Automàtic |
| **Accessibilitat** | Manual | `<Link>` \= `<a>` semàntic |

Conclusió:

  Gestió manual → centenars de línies de codi de plumbing  
  React Router → declaratiu, semàntic, accessible i mantenible

  React Router s'ha establert com l'estàndard per a l'enrutament  
  en SPAs de React, amb més de 35.000 stars a GitHub,  
  \+500 contributors i 3,5 milions de dependents.

