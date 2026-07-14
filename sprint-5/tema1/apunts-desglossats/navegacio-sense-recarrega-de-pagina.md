**Com millora l'experiència d'usuari la navegació sense recàrrega de pàgina?** 

**Recàrrega completa vs. navegació SPA**

Per entendre la millora, cal veure el que passa en cada model quan l'usuari navega.

| NAVEGACIÓ TRADICIONAL (recàrrega completa):Usuari clica "Productes"      ↓Browser envia GET /productes al servidor      ↓ (\~200-800ms de latència de xarxa)Servidor retorna nou HTML complet      ↓Browser destrueix la pàgina actual (flash blanc)      ↓Browser parseja el nou HTML      ↓Browser descarrega i executa CSS i JS de nou      ↓Pàgina visible→ Total: 500ms \- 3 segons, flash blanc, estat perdutNAVEGACIÓ SPA (React Router):Usuari clica \<Link to="/productes" /\>      ↓React Router intercepta (preventDefault)      ↓history.pushState({}, '', '/productes')      ↓React renderitza \<Productes /\> (JS ja carregat)      ↓Virtual DOM calcula mínims canvis necessaris      ↓DOM actualitzat únicament on cal→ Total: 10-50ms, sense flash, estat preservat |
| :---- |

**Millora 1: Velocitat i percepció d'instantaneïtat**

La navegació client-side és dramàticament més ràpida perquè el JavaScript ja és al browser. No hi ha latència de xarxa per al canvi de pàgina, no hi ha re-parseig d'HTML, no hi ha re-execució de scripts.

| // La navegació és tan ràpida que podem afegir transicions animades// sense que semblin lentes \-- la pàgina ja és visibleimport { Link } from 'react-router-dom';// Simple: canvi instantani\<Link to="/productes"\>Productes\</Link\>// Amb transicions: possible perquè la UI és suficientment ràpidaimport { useLocation } from 'react-router-dom';function AppAmbTransicions() {  const location \= useLocation();  return (    // CSS transition quan canvia la clau (la ruta)    \<div      key={location.pathname}      style={{ animation: 'fadeIn 0.2s ease-in' }}    \>      \<Outlet /\>    \</div\>  );} |
| :---- |

**Millora 2: preservació de l'estat**

Una de les millores més importants però menys visibles: l'estat del component no es perd en navegar entre pàgines si el component pare roman muntat.

| // PROBLEMA AMB RECÀRREGA COMPLETA:// → L'usuari omple un carret de compra → navega a "Detall del producte"//   → Torna enrere → el carret s'ha buidat\!// → L'usuari fa scroll fins al producte 50 d'una llista//   → Clica per veure'n el detall → torna → scroll resetejat a dalt\!// ✅ AMB REACT ROUTER: l'estat es preserva mentre el component viufunction App() {  const \[carret, setCarret\] \= useState\<Producte\[\]\>(\[\]);  // → 'carret' existeix al component App, que mai es desmunta  // → Navegar entre pàgines NO destrueix l'App → carret sempre present  return (    \<div\>      \<Header carret={carret} /\>    {/\* ← actualitzat en temps real \*/}      \<Outlet /\>                    {/\* ← únicament el contingut canvia \*/}    \</div\>  );}// Exemple concret: scroll position preservat amb useReffunction LlistaProductes() {  const scrollRef \= useRef(0);  useEffect(() \=\> {    // Restaurar scroll quan tornem a aquesta pàgina    window.scrollTo(0, scrollRef.current);    return () \=\> {      scrollRef.current \= window.scrollY;    };  }, \[\]);} |
| :---- |

Si tens alguna cosa en la memòria de la teva app de React (estat de Redux, estat de components, context) que vols que sobrevieti, és perduda en una recàrrega completa, a menys que estigui persistida a localStorage o sessionStorage.

**Millora 3: Transicions i animacions suaus**

La navegació sense recàrrega permet construir transicions entre vistes que serien impossibles amb un model de pàgines tradicional.

| // Transicions de pàgina amb React Routerimport { useLocation } from 'react-router-dom';import { useEffect, useState } from 'react';function AnimatedRoutes() {  const location \= useLocation();  const \[displayLocation, setDisplayLocation\] \= useState(location);  const \[transitionStage, setTransitionStage\] \= useState('fadeIn');  useEffect(() \=\> {    if (location \!== displayLocation) {      setTransitionStage('fadeOut');    }  }, \[location, displayLocation\]);  return (    \<div      className={transitionStage}      onAnimationEnd={() \=\> {        if (transitionStage \=== 'fadeOut') {          setTransitionStage('fadeIn');          setDisplayLocation(location);        }      }}    \>      \<Routes location={displayLocation}\>        \<Route path="/" element={\<Home /\>} /\>        \<Route path="/productes" element={\<Productes /\>} /\>      \</Routes\>    \</div\>  );}// CSS:// .fadeIn  { animation: fadeIn 0.3s ease-in; }// .fadeOut { animation: fadeOut 0.3s ease-out; } |
| :---- |

**Millora 4: Navegació optimista i pending UI**

React Router v7 proporciona eines per mostrar feedback immediat a l'usuari mentre es carreguen les dades, sense bloquejar la UI.

| import { useNavigation, Link } from 'react-router-dom';function Navbar() {  const navigation \= useNavigation();  // navigation.state: 'idle' | 'loading' | 'submitting'  return (    \<nav\>      {/\* Indicador de càrrega global durant la navegació \*/}      {navigation.state \=== 'loading' && (        \<div className="barra-progres" /\>        // → L'usuari veu immediatament que la navegació ha començat        // → Sense la recàrrega completa (flash blanc \+ loading spinner del browser)      )}      \<Link to="/productes"\>Productes\</Link\>    \</nav\>  );}// Estat de loading per ruta específica amb loader:const router \= createBrowserRouter(\[{  path: '/productes/:id',  loader: async ({ params }) \=\> {    return fetch(\`/api/productes/${params.id}\`);  },  element: \<DetalProducte /\>,}\]);function DetalProducte() {  const producte \= useLoaderData(); // dades ja disponibles quan el component renderitza  // → Sense useEffect, sense useState('loading'), sense flash de contingut buit  return \<h1\>{producte.nom}\</h1\>;} |
| :---- |

**Millora 5: Estat compartible via URL**

Passar informació entre pàgines sense recàrrega és elegant amb `location.state` de React Router. Per a dades compartibles (que l'usuari pot marcar o compartir), `useSearchParams` integra l'estat a la URL.

| // PASSAR MISSATGES ENTRE PÀGINES (sense recàrrega, sense query params)// Útil per a: "Has iniciat sessió correctament", "Producte afegit al carret"// Pàgina d'origen: passar estat via navigateimport { useNavigate } from 'react-router-dom';function FormulariLogin() {  const navigate \= useNavigate();  const handleLogin \= async () \=\> {    await iniciarSessio();    navigate('/dashboard', {      state: { missatge: 'Benvingut de nou\!' }  // ← no apareix a la URL    });  };}// Pàgina de destí: rebre l'estatimport { useLocation } from 'react-router-dom';function Dashboard() {  const location \= useLocation();  const missatge \= location.state?.missatge;  return (    \<div\>      {missatge && (        \<div className="notificacio-exit"\>          {missatge}  {/\* ← "Benvingut de nou\!" \*/}        \</div\>      )}      {/\* contingut del dashboard \*/}    \</div\>  );}// ESTAT COMPARTIBLE VIA URL: paginació, filtres, cerca// → L'usuari pot copiar la URL i compartir l'estat exacte de la vistaimport { useSearchParams } from 'react-router-dom';function CatalegProductes() {  const \[searchParams, setSearchParams\] \= useSearchParams();  const categoria \= searchParams.get('categoria') || 'tots';  const pàgina \= Number(searchParams.get('pàgina')) || 1;  // URL: /productes?categoria=roba\&pàgina=3  // → L'usuari pot compartir exactament aquesta vista  // → El botó enrere du a la pàgina anterior de resultats (no a la pàgina anterior\!)  return (    \<div\>      \<select        value={categoria}        onChange={e \=\> setSearchParams({ categoria: e.target.value, pàgina: '1' })}      \>        \<option value="tots"\>Tots\</option\>        \<option value="roba"\>Roba\</option\>      \</select\>      {/\* resultats \*/}    \</div\>  );} |
| :---- |

La gestió d'estat basada en URL proporciona vistes compartibles (els usuaris poden copiar, compartir i guardar URLs que representen estats específics de l'aplicació) i integració amb l'historial del browser (navegació sense problemes usant els botons enrere/endavant).

**Millora 6: Historial del browser integrat**

La navegació sense recàrrega funciona perfectament amb els botons enrere i endavant del browser, la qual cosa és fonamental per a la UX.

| // L'historial del browser es gestiona automàticament:navigate('/productes');          // pushState → enrere funcionanavigate('/productes', { replace: true }); // replaceState → enrere NO va a /productesnavigate(\-1);                    // equivalent al botó ← del browsernavigate(1);                     // equivalent al botó → del browser// CAS D'ÚS: formulari d'edició// Quan l'usuari desa, volem que "enrere" no torni al formulari buitfunction FormulariEdicio() {  const navigate \= useNavigate();  const handleDesar \= async (dades) \=\> {    await desaCanvis(dades);    navigate('/productes', { replace: true });    // ← replace: true → l'historial no té el formulari d'edició    // → L'usuari prem "enrere" → va a /productes (no torna al formulari)  };} |
| :---- |

**Quan SÍ té sentit la recàrrega completa**

Hi ha casos excepcionals on la recàrrega completa (`window.location.href`) és la millor opció:

| // Casos on la recàrrega completa és preferible:// 1\. Logout: volem eliminar tot l'estat clientconst handleLogout \= () \=\> {  tancarSessio();  window.location.href \= '/login'; // ← recàrrega total: neteja Redux, Context, cache  // navigate('/login') preservaria l'estat → potencial fuita de dades\!};// 2\. Canvi d'entorn/tenant en apps multi-tenant// 3\. Quan la nova pàgina necessita dades fresques del servidor imperativament// 4\. Errors crítics on l'estat de l'app pot estar corromput// Per a TOTS els altres casos → \<Link\> o navigate() de React Router |
| :---- |

**Comparativa d'UX**

| Aspecte | Recàrrega Completa | React Router (SPA) |
| ----- | ----- | ----- |
| **Velocitat de transició** | 500ms \- 3 segons | 10-50ms |
| **Flash de pantalla blanca** | ❌ Sempre | ✅ Cap |
| **Estat preservat** | ❌ Perdut | ✅ Preservat |
| **Animacions entre pàgines** | ❌ Impossible | ✅ Total control |
| **Historial del browser** | ✅ Natiu | ✅ Integrat |
| **Carret de compra** | ❌ Es perd | ✅ Persistent |
| **Posició de scroll** | ❌ Reseteja | ✅ Controlable |
| **Missatges entre pàgines** | ⚠️ Cookies/server | ✅ `location.state` |
| **Indicador de càrrega** | ❌ Del browser | ✅ Personalitzat |
| **SEO** | ✅ Natiu | ⚠️ Requereix SSR |

La navegació sense recàrrega transforma la percepció del producte: d'un "lloc web" a una "aplicació".

  L'usuari percep:  
  → Respostes instantànies als seus clics  
  → Continuïtat (l'estat no desapareix)  
  → Control (enrere/endavant funcionen com s'espera)  
  → Professionalitat (sense flashes ni loading de pàgina)

