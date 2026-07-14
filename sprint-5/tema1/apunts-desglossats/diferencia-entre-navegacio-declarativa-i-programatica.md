## **Navegació declarativa vs. programàtica en React Router**

**La distinció fonamental**

La navegació en React Router es pot fer de dues maneres que reflecteixen dues filosofies: la declarativa (especifiques **quèvols** en el JSX) i la programàtica (imperative: dius **com fer-ho** amb codi JavaScript).

| DECLARATIVA → "El JSX descriu quan i on navegar"  L'usuari interactua amb un element UI → navegació automàtica  Exemples: \<Link\>, \<NavLink\>, \<Navigate\>PROGRAMÀTICA → "El codi JavaScript decideix quan navegar"  La lògica del codi decideix quan i on navegar  Exemples: useNavigate() hook → navigate('/ruta') |
| :---- |

React Router s'alinea amb la filosofia de React: declaratiu per defecte, imperatiu quan cal. 

La documentació oficial recomana usar `<Link>` o `<NavLink>` per a la navegació normal, ja que proporcionen una millor experiència d'usuari per defecte (events de teclat, etiquetes d'accessibilitat, "obrir en nova finestra", menús contextuals amb botó dret, etc.). 

Reserva l'ús de `useNavigate` per a situacions on l'usuari no interactua però necessites navegar.

**Navegació declarativa: `<Link>` i `<NavLink>`**

### **`<Link>`: el component de navegació bàsic**

`<Link>` és el component de navegació declaratiu bàsic de React Router. 

Proporciona una manera declarativa de crear links que naveguen a rutes diferents dins de l'aplicació sense disparar una recàrrega completa de pàgina. 

Renderitza una etiqueta `<a>` amb la ruta de destí especificada.

| import { Link } from 'react-router-dom';// Navegació bàsica\<Link to="/productes"\>Productes\</Link\>// → Renderitza: \<a href="/productes"\>Productes\</a\>// → Clic → React Router intercepta → navega sense recàrrega// Navegació relativa (relativa a la ruta actual)\<Link to="detall"\>Veure detall\</Link\>  // → /ruta-actual/detall// Passar estat a la nova pàgina\<Link  to="/productes"  state={{ origen: 'landing-page' }}   // → accessible via useLocation().state\>  Veure productes\</Link\>// Substituir l'entrada de l'historial (sense afegir al "enrere")\<Link to="/login" replace\>Tornar al login\</Link\>// Obrir en nova pestanya (comportament natiu de \<a\>)\<Link to="/politica-privadesa" target="\_blank" rel="noopener noreferrer"\>  Política de privadesa\</Link\>// ← Funciona automàticament\! Command+Click també funciona |
| :---- |

### **`<NavLink>`: link amb estat actiu**

`<NavLink>` és per a links de navegació que necessiten renderitzar un estat actiu. Quan un `NavLink` és actiu, automàticament tindrà el nom de classe `.active` per a un estilitzat fàcil amb CSS.

| import { NavLink } from 'react-router-dom';// Estilitzat bàsic: la classe 'active' s'afegeix automàticament\<NavLink to="/productes"\>Productes\</NavLink\>// → Si URL és /productes → \<a class\="active" href="/productes"\>Productes\</a\>// → Si URL és altra → \<a href="/productes"\>Productes\</a\>// Estilitzat personalitzat via className (callback)\<NavLink  to="/productes"  className={({ isActive, isPending }) \=\>    isActive ? 'nav-link nav-link--actiu' :    isPending ? 'nav-link nav-link--carregant' :    'nav-link'  }\>  Productes\</NavLink\>// Estilitzat via style (callback)\<NavLink  to="/messages"  style={({ isActive }) \=\> ({    fontWeight: isActive ? 'bold' : 'normal',    color: isActive ? '\#007bff' : '\#333',  })}\>  Missatges\</NavLink\>// La prop 'end': controla la coincidència exacta// Sense 'end': \<NavLink to="/"\> sempre seria actiu (/ coincideix amb tot)\<NavLink to="/" end\>Home\</NavLink\>// → 'end' fa que únicament sigui actiu quan la URL és exactament "/"// Exemple d'ús complet en un menú de navegació:function Navbar() {  return (    \<nav\>      \<NavLink to="/" end\>Home\</NavLink\>      \<NavLink to="/productes"\>Productes\</NavLink\>      \<NavLink to="/blog"\>Blog\</NavLink\>      \<NavLink to="/contacte"\>Contacte\</NavLink\>    \</nav\>  );} |
| :---- |

### **`<Navigate>`: redirecció declarativa dins del JSX**

`<Navigate>` permet la navegació programàtica dins de l'aplicació i permet als developers disparar la navegació de manera imperativa basant-se en certes condicions o events, en lloc de la interacció de l'usuari com els clics.

| import { Navigate } from 'react-router-dom';// Redirecció basada en condicions dins del JSXfunction PàginaProtegida() {  const { estaAutenticat } \= useAuth();  // Si no autenticat → redirigir declarativament  if (\!estaAutenticat) {    return \<Navigate to="/login" replace /\>;    // → replace: true per evitar el bucle enrere → login → enrere → login  }  return \<ContingutProtegit /\>;}// Ruta d'índex que redirigeixconst router \= createBrowserRouter(\[  {    path: '/dashboard',    element: \<Dashboard /\>,    children: \[      { index: true, element: \<Navigate to="resum" replace /\> },      { path: 'resum', element: \<Resum /\> },      { path: 'estadistiques', element: \<Estadistiques /\> },    \],  },\]);// → /dashboard → redirigeix automàticament a /dashboard/resum |
| :---- |

**Navegació programàtica: `useNavigate`**

`useNavigate` és un hook que proporciona navegació programàtica dins de components funcionals. 

Retorna una funció `navigate` que pots cridar de manera imperativa (per exemple, en event handlers, après crides a APIs, o en resposta a accions de l'usuari) per disparar la navegació.

| import { useNavigate } from 'react-router-dom';function FormulariLogin() {  const navigate \= useNavigate();  const handleSubmit \= async (e: React.FormEvent) \=\> {    e.preventDefault();    try {      await iniciarSessio(credencials);      // ← Navegació PROGRAMÀTICA: decidida per la lògica del codi      navigate('/dashboard');    } catch (error) {      navigate('/error', { state: { missatge: error.message } });    }  };  return \<form onSubmit={handleSubmit}\>...\</form\>;} |
| :---- |

### **Les opcions de `navigate()`**

| const navigate \= useNavigate();// Navegar a una rutanavigate('/productes');// Navegar amb opcionsnavigate('/productes', {  replace: true,          // ← substituir l'entrada de l'historial (sense "enrere")  state: { id: 42 },     // ← passar dades a la nova pàgina});// Navegació relativanavigate('detall');       // → ruta relativa a l'actual// Navegació per delta (historial)navigate(\-1);             // ← equivalent al botó "enrere" del browsernavigate(1);              // → equivalent al botó "endavant"navigate(\-3);             // ← 3 passos enrere// Sense scroll reset (per a tabs i filtres)navigate('?tab=configuracio', { preventScrollReset: true });// → útil quan el canvi de ruta és petit i no cal tornar al top// Amb ViewTransition API (React Router v7+)navigate('/productes', { viewTransition: true });// → activa document.startViewTransition per a animacions natives del browser |
| :---- |

**Casos d'ús: quan usar cada aproximació**

La documentació oficial estableix la regla clara: per a la navegació normal, és millor usar `Link` o `NavLink`. Reserva l'ús de `useNavigate` per a situacions on l'usuari no interactua però necessites navegar.

| // ✅ DECLARATIVA (\<Link\>, \<NavLink\>) → per a:// 1\. Menús de navegació\<nav\>  \<NavLink to="/"\>Home\</NavLink\>  \<NavLink to="/productes"\>Productes\</NavLink\>\</nav\>// 2\. Links dins del contingut\<p\>  Consulta la nostra \<Link to="/politica-privadesa"\>política de privadesa\</Link\>\</p\>// 3\. Botons "Veure detall" en llistes{productes.map(p \=\> (  \<Link key={p.id} to={\`/productes/${p.id}\`}\>    \<ProducteCard producte={p} /\>  \</Link\>))}// 4\. Breadcrumbs\<nav aria-label="breadcrumb"\>  \<Link to="/"\>Home\</Link\> / \<Link to="/productes"\>Productes\</Link\> / {nom}\</nav\>// ✅ PROGRAMÀTICA (useNavigate) → per a:// 1\. Après un enviament de formulariconst handleSubmit \= async () \=\> {  await crearProducte(dades);  navigate('/productes', { state: { missatge: 'Producte creat\!' } });};// 2\. Après una acció completada (login, logout, pagament)const handleLogin \= async () \=\> {  await login();  navigate(usuari.esAdmin ? '/admin' : '/dashboard');};// 3\. Redireccions basades en lògicaconst handleCompra \= async () \=\> {  const resultat \= await procesarPagament();  if (resultat.ok) navigate('/confirmacio');  else navigate('/error-pagament');};// 4\. Temporitzadors i UI basada en tempsuseEffect(() \=\> {  const timer \= setTimeout(() \=\> navigate('/'), 5000);  return () \=\> clearTimeout(timer);}, \[\]);// → Redirigir a home après 5 segons (pàgina 404 o d'error)// 5\. Navegació enrere/endavant programàtica\<button onClick={() \=\> navigate(-1)}\>← Tornar\</button\> |
| :---- |

**La diferència entre `<Navigate>` i `useNavigate`**

Tots dos permeten navegació programàtica però des de dos paradigmes:

| // \<Navigate\>: declaratiu, dins del JSX// → Clar i llegible, segueix el model React// → Navega IMMEDIATAMENT en renderitzar (quan la condició és true)function RoutaProtegida({ children }) {  const { autenticat } \= useAuth();  if (\!autenticat) return \<Navigate to="/login" replace /\>;  return children;}// useNavigate: imperatiu, dins d'un event handler o effect// → Més flexible, pot navegar en qualsevol moment// → Navega quan CRIDES la funciófunction RoutaProtegida({ children }) {  const navigate \= useNavigate();  const { autenticat } \= useAuth();  useEffect(() \=\> {    if (\!autenticat) navigate('/login', { replace: true });  }, \[autenticat, navigate\]);  return autenticat ? children : null;}// La diferència pràctica:// \<Navigate\> → és clar en el JSX que "quan renderitzes sense auth → vas a /login"// useNavigate → cal seguir el trail: useEffect → condició → navigate// → \<Navigate\> és més llegible per a redireccions basades en condicions del render// → useNavigate és necessari per a navegació després d'accions asíncrones |
| :---- |

**Taula comparativa**

|  | `<Link>` | `<NavLink>` | `<Navigate>` | `useNavigate` |
| ----- | ----- | ----- | ----- | ----- |
| **Tipus** | Declaratiu | Declaratiu | Declaratiu | Programàtic |
| **On viu** | JSX | JSX | JSX | Event handler / Effect |
| **Quan navega** | L'usuari clica | L'usuari clica | En renderitzar | Quan cridem `navigate()` |
| **Estat actiu** | ❌ | ✅ `isActive` | ❌ | ❌ |
| **Ideal per a** | Links, menús | Menús de nav | Redireccions condicionals | Post-form, post-login |
| **Accessibilitat** | ✅ `<a>` natiu | ✅ `<a>` natiu | N/A | Depèn de l'element |

  "L'usuari clica per navegar?"  
    SÍ → \<Link\> o \<NavLink\> (declaratiu)

  "La navegació depèn d'una condició al JSX?"  
    SÍ → \<Navigate\> (declaratiu condicional)

  "La navegació passa DESPRÉS d'una acció asíncrona o lògica?"  
    SÍ → useNavigate() (programàtic)

