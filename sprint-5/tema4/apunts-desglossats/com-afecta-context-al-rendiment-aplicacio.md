## **Com afecta context al rendiment de l'aplicació**

**Context i Rendiment**  
\[[https://github.com/facebook/react/issues/15156\#issuecomment-474590693\](https://github.com/react/react/issues/15156\#issuecomment-474590693](https://github.com/facebook/react/issues/15156#issuecomment-474590693]\(https://github.com/react/react/issues/15156#issuecomment-474590693))  
Discussió de la comunitat de React sobre l’impacte en rendiment de l’ús de Context.

**La regla fonamental de Context i Re-renders**

Quan un valor de Context canvia, tots els components que consumeixen aquell context es re-renderitzen, fins i tot si únicament usen una petita porció del valor del context. Aquest efecte en cascada pot impactar severament el rendiment de l'aplicació.

| // El problema: UN sol context amb TOT l'estatinterface AppContext {  usuari: Usuari;          // canvia rarament (login/logout)  notificacions: number;   // canvia cada pocs segons\!  tema: string;            // canvia rarament (user preference)  carret: Item\[\];          // canvia sovint (afegir/eliminar)}const AppContext \= createContext\<AppContext | null\>(null);// Quan 'notificacions' canvia → TOTS els consumers re-renderitzen:// → ComponenteUsuari (usa 'usuari')     → RE-RENDER INNECESSARI ❌// → BotoTema (usa 'tema')               → RE-RENDER INNECESSARI ❌// → IconaCarret (usa 'carret')          → RE-RENDER INNECESSARI ❌// → BadgeNotificacions (usa 'notificacions') → re-render necessari ✅ |
| :---- |

**El problema: nou objecte en cada render**

Evita passar objectes mutables (com arrays o objectes) directament com a valors de context sense memoïtzació. Això pot portar a re-renders inesperats perquè React sempre veurà una nova identitat d'objecte fins i tot si el contingut de l'objecte no ha canviat.

| // ❌ MAL: nou objecte en cada render del Providerfunction AppProvider({ children }: { children: React.ReactNode }) {  const \[usuari, setUsuari\] \= useState(null);  const \[tema, setTema\] \= useState('clar');  return (    \<AppContext value={{ usuari, setUsuari, tema }}\>      {/\* ↑ Cada vegada que AppProvider re-renderitza          → nou objecte literal \`{}\` → nova referència          → TOTS els consumers re-renderitzen          (fins i tot si usuari i tema no han canviat\!) \*/}      {children}    \</AppContext\>  );}// ✅ BÉ: memoïtzar el valor del contextfunction AppProvider({ children }: { children: React.ReactNode }) {  const \[usuari, setUsuari\] \= useState(null);  const \[tema, setTema\] \= useState('clar');  const valor \= useMemo(    () \=\> ({ usuari, setUsuari, tema }),    \[usuari, tema\]    // ← únicament nou objecte quan 'usuari' o 'tema' canvien  );  return \<AppContext value={valor}\>{children}\</AppContext\>;} |
| :---- |

**Solució 1: Separar contexts per freqüència de canvi**

La solució més recomanada i efectiva: dividir el context gran en múltiples contexts petits, cadascun amb una freqüència de canvi diferent.

| // ✅ Contexts separats per freqüència de canvi// Context estable (canvia rarament):const UsuariContext \= createContext\<{ usuari: Usuari; setUsuari: (u: Usuari) \=\> void } | null\>(null);// Context semi-estable (canvia quan l'usuari ho fa manualment):const TemaContext \= createContext\<{ tema: string; setTema: (t: string) \=\> void } | null\>(null);// Context dinàmic (canvia sovint):const NotificacionsContext \= createContext\<{ count: number } | null\>(null);// Providers separats:function AppProviders({ children }: { children: React.ReactNode }) {  return (    \<UsuariProvider\>      \<TemaProvider\>        \<NotificacionsProvider\>          {children}        \</NotificacionsProvider\>      \</TemaProvider\>    \</UsuariProvider\>  );}// Resultat:// Quan 'notificacions' canvia → únicament els consumers de NotificacionsContext re-renderitzen// UsuariContext i TemaContext no canvien → els seus consumers NO re-renderitzen ✅ |
| :---- |

**Solució 2: `React.memo` per a components fills no consumers**

`React.memo` prevé re-renders d'un component a menys que les seves props canviïn. Ideal per a components freqüentment usats però rarament canviants.

| // PROBLEMA: components no consumers re-renderitzen per re-renders del parefunction Dashboard() {  const { notificacions } \= useContext(NotificacionsContext);  // Cada vegada que 'notificacions' canvia → Dashboard re-renderitza  // → TOTS els fills de Dashboard re-renderitzen (fins i tot els que no usen context)  return (    \<div\>      \<BadgeNotificacions count={notificacions} /\>      \<GràficVendes /\>       {/\* ← NO usa context però re-renderitza\! \*/}      \<TaulaProductes /\>     {/\* ← NO usa context però re-renderitza\! \*/}    \</div\>  );}// ✅ SOLUCIÓ: React.memo als fills que no necessiten re-renderitzarconst GràficVendes \= React.memo(function GràficVendes() {  // Rep les seves dades via props o el seu propi context  // React.memo evita el re-render si les props no canvien  return \<Chart /\>;});const TaulaProductes \= React.memo(function TaulaProductes({ productes }: Props) {  return \<Table data={productes} /\>;});// → Ara quan 'notificacions' canvia: únicament BadgeNotificacions re-renderitza ✅ |
| :---- |

**Solució 3: `useMemo` per a valors derivats del Context**

| // PROBLEMA: càlcul costós que es re-executa en cada re-renderfunction LlistaProductes() {  const { productes, filtres } \= useContext(ProductesContext);  // ❌ MAL: s'executa en CADA re-render del context  const productesFiltrats \= productes    .filter(p \=\> p.categoria \=== filtres.categoria)    .sort((a, b) \=\> a.preu \- b.preu);  return \<ul\>{productesFiltrats.map(p \=\> \<li key={p.id}\>{p.nom}\</li\>)}\</ul\>;}// ✅ BÉ: únicament recalcula quan les dependències canvienfunction LlistaProductes() {  const { productes, filtres } \= useContext(ProductesContext);  const productesFiltrats \= useMemo(    () \=\> productes      .filter(p \=\> p.categoria \=== filtres.categoria)      .sort((a, b) \=\> a.preu \- b.preu),    \[productes, filtres.categoria\]    // ← únicament recalcula quan 'productes' o 'filtres.categoria' canvien  );  return \<ul\>{productesFiltrats.map(p \=\> \<li key={p.id}\>{p.nom}\</li\>)}\</ul\>;} |
| :---- |

**Solució 4: Separar estat de Dispatch (patró avançat)**

| // Patró: dos contexts separats (estat i dispatch) per a useReducer// → Els components que únicament fan dispatch NO re-renderitzen quan l'estat canviaconst CarretEstatContext \= createContext\<CarretEstat | null\>(null);const CarretDispatchContext \= createContext\<React.Dispatch\<CarretAccio\> | null\>(null);function CarretProvider({ children }: { children: React.ReactNode }) {  const \[estat, dispatch\] \= useReducer(carretReducer, { items: \[\], total: 0 });  return (    \<CarretEstatContext value={estat}\>      \<CarretDispatchContext value={dispatch}\>        {children}      \</CarretDispatchContext\>    \</CarretEstatContext\>  );}// Component que LLEGEIX l'estat → re-renderitza quan estat canviafunction ResumeCarret() {  const { items, total } \= useContext(CarretEstatContext)\!;  return \<div\>{items.length} items \-- {total}€\</div\>;}// Component que únicament fa DISPATCH → mai re-renderitza per canvis d'estat\!const BotoAfegir \= React.memo(function BotoAfegir({ producte }: { producte: Producte }) {  const dispatch \= useContext(CarretDispatchContext)\!;  // dispatch és estable (el mateix objecte sempre) → React.memo funciona ✅  return (    \<button onClick={() \=\> dispatch({ type: 'AFEGIR', payload: producte })}\>      Afegir al carret    \</button\>  );}); |
| :---- |

**El React Compiler (React 19): la solució automàtica**

En aplicacions React, el rendiment impacta directament en la qualitat de l'experiència d'usuari. Quan es tracten llistes de dades grans o components renderitzats freqüentment, prevenir càlculs i re-renders innecessaris es torna crucial.

A partir de React 19, el React Compiler pot auto-memoïtzar components i valors automàticament, reduint la necessitat de `React.memo` i `useMemo` manuals. Però mentre el Compiler es consolida, les tècniques manuals segueixen sent rellevants.

**Mesura primer, optimitza després**

Com es diu, l'optimització prematura és l'arrel de tots els mals. Per favor, mesura abans d'optimitzar. Afegir memo a tots els components de l'aplicació simplement afegiria temps de desenvolupament i no ajudaria amb la millora de rendiment.

EINES PER MESURAR:  
  React DevTools Profiler → identifica quins components re-renderitzen  
  Chrome DevTools Performance → temps de CPU per render  
  React DevTools "Highlight updates" → veure re-renders en temps real

EL FLUX CORRECTE:  
  1\. Detecta lentitud real (no suposada)  
  2\. Perfila per identificar el component problemàtic  
  3\. Aplica l'optimització adequada (split context, memo, useMemo)  
  4\. Mesura de nou per verificar la millora

**Resum: quatre estratègies d'optimització**

| Estratègia | Quan aplicar | Com |
| ----- | ----- | ----- |
| **Separar contexts** | Context gran amb dades de freqüències molt diferents | Múltiples `createContext` per domini |
| **`React.memo`** | Fill que no usa el context però re-renderitza per el pare | Embolcallar el component fill |
| **`useMemo` al Provider** | Valor del context és un objecte creat al render | `useMemo(() => ({ ... }), [deps])` |
| **Estat \+ Dispatch separats** | Botó/acció que no necessita llegir l'estat | Dos contexts: un per estat, un per dispatch  |

La regla d'or:

  Context canvia → TOTS els consumers re-renderitzen  
  → Separar contexts per freqüència de canvi  
  → React.memo per a components fills no consumers  
  → useMemo per a valors objecte al Provider  
  → Mesura sempre abans d'optimitzar

