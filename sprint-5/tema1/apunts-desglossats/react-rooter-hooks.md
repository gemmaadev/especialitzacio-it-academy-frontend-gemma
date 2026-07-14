## **Hooks de react router: referència i exemples**

###### **React Router Hooks** [https://reactrouter.com/api/hooks/useNavigate](https://reactrouter.com/api/hooks/useNavigate)  Referència dels hooks més utilitzats de React Router com useNavigate.

**Els hooks de React Router: la finestra als internals del router**

Els hooks de React Router proporcionen accés a l'estat intern del router des de qualsevol component funcional de l'aplicació. Son la manera modern de comunicar-se amb el router, substituint les props `match`, `location` i `history` que s'injectaven en versions anteriors.

| // Tots els hooks s'importen des de 'react-router-dom' (o 'react-router' v8+)import {  useNavigate, useParams, useSearchParams,  useLocation, useRouteError, useOutletContext,  useLoaderData, useNavigation} from 'react-router-dom'; |
| :---- |

**Hook 1: `useNavigate` — Navegació programàtica**

Retorna una funció que permet navegar programàticament en el browser en resposta a interaccions de l'usuari o efectes. Sovint és millor usar `redirect` en funcions `action`/`loader` que aquest hook.

| import { useNavigate } from 'react-router-dom';function Component() {  const navigate \= useNavigate();  // CASOS D'ÚS:  // 1\. Navegar a una ruta  navigate('/productes');  navigate('/productes?categoria=esport');  // 2\. Navegar amb objecte To (totes les propietats son opcionals)  navigate(    { pathname: '/productes', search: '?categoria=esport', hash: '\#oferta' },    { state: { missatge: 'Benvingut\!' } }  );  // → L'estat és accessible a la nova pàgina via useLocation().state  // 3\. Navegar per l'historial (delta)  navigate(\-1);   // ← enrere (tancar modals, tornar enrere)  navigate(1);    // → endavant (wizards multi-pas)  navigate(\-2);   // ← 2 passos enrere  // 4\. Replace: substituir l'entrada actual de l'historial  navigate('/login', { replace: true });  // → El botó "enrere" no tornarà a la pàgina anterior  // → Equivalent a un redirect del servidor  // 5\. Prevenir el reset de scroll  navigate('?tab=ressenyes', { preventScrollReset: true });  // → Útil per a tabs en el mig d'una pàgina (no fa scroll al top)  // 6\. ViewTransition (React Router v7+)  navigate('/productes', { viewTransition: true });  // → Activa document.startViewTransition per a animacions natives}// CAS D'ÚS REAL: formulari post-loginfunction LoginForm() {  const navigate \= useNavigate();  const location \= useLocation();  const destí \= location.state?.from?.pathname || '/dashboard';  const handleSubmit \= async (e: React.FormEvent) \=\> {    e.preventDefault();    await login(credencials);    navigate(destí, { replace: true });  };} |
| :---- |

**Hook 2: `useParams` — Paràmetres de ruta dinàmica**

Retorna un objecte de parells clau/valor dels paràmetres dinàmics de la URL actual.

| import { useParams } from 'react-router-dom';// Ruta definida: /productes/:categoriaId/items/:itemIdfunction DetalItem() {  const { categoriaId, itemId } \= useParams();  // URL /productes/esport/items/42:  // → categoriaId \= "esport"  // → itemId \= "42"  // IMPORTANT: els paràmetres son sempre strings\!  const idNumeric \= Number(itemId);   // conversió necessària si cal número  // Tipar amb TypeScript:  const params \= useParams\<{ categoriaId: string; itemId: string }\>();  return \<h1\>Categoria: {categoriaId} \-- Item: {itemId}\</h1\>;} |
| :---- |

**Hook 3: `useSearchParams` — Paràmetres de cerca (Query string)**

Permet llegir i modificar els paràmetres de cerca de la URL actual. Funciona com `useState` però amb la URL com a emmagatzematge.

| import { useSearchParams } from 'react-router-dom';function CatalegProductes() {  const \[searchParams, setSearchParams\] \= useSearchParams();  // LLEGIR  const cerca \= searchParams.get('cerca') || '';  const pàgina \= Number(searchParams.get('pàgina') || '1');  const etiquetes \= searchParams.getAll('tag'); // múltiples valors  // ACTUALITZAR (preservant altres params):  const actualitzarCerca \= (valor: string) \=\> {    setSearchParams(prev \=\> {      valor ? prev.set('cerca', valor) : prev.delete('cerca');      prev.set('pàgina', '1');      return prev;    });  };  // ACTUALITZAR amb replace (sense afegir a l'historial):  setSearchParams({ tab: 'ressenyes' }, { replace: true });  // URL resultant: /productes?cerca=sabates\&pàgina=2\&tag=nike\&tag=esport} |
| :---- |

**Hook 4: `useLocation` — Informació de la URL actual**

Retorna l'objecte de location actual amb totes les parts de la URL i l'estat de navegació.

| import { useLocation } from 'react-router-dom';function Component() {  const location \= useLocation();  // location conté:  location.pathname  // "/productes/42" ← la ruta  location.search    // "?categoria=esport" ← la query string  location.hash      // "\#oferta" ← el hash  location.state     // { missatge: 'Login correcte\!' } ← estat passat via navigate  location.key       // identificador únic d'aquesta entrada de l'historial  // CAS D'ÚS: llegir missatge passat des del login  const missatge \= location.state?.missatge;  // CAS D'ÚS: guardar l'URL actual per redirigir après el login  const { pathname } \= useLocation();  return \<Navigate to="/login" state={{ from: pathname }} /\>;  // CAS D'ÚS: executar codi quan canvia la ruta  useEffect(() \=\> {    console.log('Ruta canviada a:', location.pathname);    analytics.trackPage(location.pathname);  }, \[location.pathname\]);} |
| :---- |

**Hook 5: `useRouteError` — Errors de ruta**

Retorna l'error llançat per la ruta actual, disponible dins dels components `errorElement`.

| import { useRouteError, isRouteErrorResponse } from 'react-router-dom';function ErrorPage() {  const error \= useRouteError();  // Diferenciar errors HTTP de React Router d'errors genèrics de JavaScript  if (isRouteErrorResponse(error)) {    // Error de React Router (404, 500, etc.)    return (      \<div\>        \<h1\>{error.status} {error.statusText}\</h1\>        \<p\>{error.data}\</p\>      \</div\>    );  }  // Error genèric de JavaScript (throw new Error('...'))  if (error instanceof Error) {    return (      \<div\>        \<h1\>Error inesperat\</h1\>        \<p\>{error.message}\</p\>      \</div\>    );  }  return \<h1\>Error desconegut\</h1\>;}// Configuració: errorElement s'usa quan la ruta o el loader llança un errorconst router \= createBrowserRouter(\[{  path: '/',  element: \<Layout /\>,  errorElement: \<ErrorPage /\>,  // ← captura errors de tota la subárbre}\]); |
| :---- |

**Hook 6: `useOutletContext` — Dades del layout al fill**

Permet a les rutes filles accedir a les dades passades pel layout pare via `<Outlet context={...}>`.

| import { Outlet, useOutletContext } from 'react-router-dom';// Tipus compartit (recomanat):interface DashboardContext {  usuari: Usuari;  notificacions: Notificació\[\];}// Layout (pare): passa contextfunction DashboardLayout() {  const { usuari } \= useAuth();  const \[notificacions\] \= useState\<Notificació\[\]\>(\[\]);  return (    \<div\>      \<Sidebar /\>      \<Outlet context={{ usuari, notificacions } satisfies DashboardContext} /\>    \</div\>  );}// Component fill: accedeix al context del layoutfunction PàginaPerfil() {  const { usuari, notificacions } \= useOutletContext\<DashboardContext\>();  return \<h1\>Benvingut, {usuari.nom}\! ({notificacions.length} notificacions)\</h1\>;} |
| :---- |

**Hook 7: `useLoaderData` — Dades del loader de la ruta**

Accedeix a les dades retornades per la funció `loader` de la ruta actual. Les dades estan disponibles quan el component es renderitza (sense estat de càrrega\!).

| import { useLoaderData } from 'react-router-dom';// Configuració: loader que carrega dades ABANS de renderitzarconst router \= createBrowserRouter(\[{  path: '/productes/:id',  loader: async ({ params }) \=\> {    const resposta \= await fetch(\`/api/productes/${params.id}\`);    if (\!resposta.ok) throw new Response('Not Found', { status: 404 });    return resposta.json();  // ← React Router espera que el loader resolgui  },  element: \<DetalProducte /\>,}\]);// Component: dades ja disponibles, sense useEffect ni estat de càrregafunction DetalProducte() {  const producte \= useLoaderData() as Producte;  // → Quan el component renderitza, 'producte' ja té les dades  // → Sense useState('loading'), sense useEffect, sense flash de contingut buit  return \<h1\>{producte.nom} \-- {producte.preu}€\</h1\>;} |
| :---- |

**Hook 8: `useNavigation` — Estat de la navegació en curs**

Proporciona informació sobre la navegació actual: si s'està carregant una nova ruta o enviant un formulari.

| import { useNavigation } from 'react-router-dom';function GlobalLoadingIndicator() {  const navigation \= useNavigation();  // navigation.state: 'idle' | 'loading' | 'submitting'  // 'idle'       → sense navegació en curs  // 'loading'    → s'està carregant una nova ruta (loader en execució)  // 'submitting' → s'està enviant un formulari (action en execució)  return (    \<div\>      {navigation.state \!== 'idle' && (        \<div className="barra-progres-global" /\>        // → Feedback visual mentre el loader de la nova ruta s'executa      )}    \</div\>  );}// CAS D'ÚS: desactivar botó d'enviament mentre es processafunction Formulari() {  const navigation \= useNavigation();  const isSubmitting \= navigation.state \=== 'submitting';  return (    \<form method="post"\>      \<input name="nom" /\>      \<button type\="submit" disabled={isSubmitting}\>        {isSubmitting ? 'Enviant...' : 'Enviar'}      \</button\>    \</form\>  );} |
| :---- |

**Resum** 

| Hook | Retorna | Quan usar |
| ----- | ----- | ----- |
| `useNavigate` | Funció `navigate()` | Navegació programàtica (post-login, post-form) |
| `useParams` | Objecte amb params de ruta | Llegir `:id`, `:slug`, etc. de la URL |
| `useSearchParams` | `[params, setParams]` | Filtres, paginació, cerca compartibles |
| `useLocation` | Objecte `location` | `pathname`, `search`, `state`, `hash` |
| `useRouteError` | Error de la ruta | Components `errorElement` per a 404 i errors |
| `useOutletContext` | Context del layout pare | Passar dades del layout als fills |
| `useLoaderData` | Dades del `loader` | Dades pre-carregades sense useEffect |
| `useNavigation` | Estat de navegació | Loading indicators globals, desactivar botons |

  Navegació programàtica  → useNavigate()  
  Llegir paràmetres ruta  → useParams()  
  Filtres/cerca/paginació → useSearchParams()  
  URL completa / state    → useLocation()  
  Errors 404              → useRouteError() \+ errorElement  
  Dades del layout        → useOutletContext()  
  Dades pre-carregades    → useLoaderData() (v6.4+)  
  Loading global          → useNavigation()

