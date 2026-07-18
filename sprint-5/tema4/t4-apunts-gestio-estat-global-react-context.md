## **Apunts T4 — Gestió de l'estat global amb React Context**

**1\. El Problema: Prop Drilling**

Quan les dades han de passar per components intermedis que no les usen, el codi es torna verbós, difícil de mantenir, i acoblat innecessàriament.

| App (té: usuari, tema)  ↓ passa usuari, tema com a props  Layout (no les usa, però les passa)    ↓ passa usuari, tema com a props    Sidebar (usa tema, però passa usuari)      ↓ passa usuari com a prop      UserMenu (finalment usa usuari\!) ← 3 nivells avall |
| :---- |

Context resol això "teleportant" les dades directament al component que les necessita, sense que els intermedis les hagin de conèixer. 

**Quan usar Context:** quan l'estat canvia rarament (tema, auth, i18n) i molts components distants el necessiten. Per a 1-2 nivells de profunditat, les props segueixen sent millors.

**2\. El patró complet: Context \+ Provider \+ Custom Hook**

El patró recomanat per Kent C. Dodds: mai exposar el context directament. Sempre tres peces.

| // 1\. CONTEXT → privat (no s'exporta)const AuthContext \= createContext\<AuthContextType | undefined\>(undefined);// 2\. PROVIDER → públic, gestiona l'estatexport function AuthProvider({ children }: { children: React.ReactNode }) {  const \[usuari, setUsuari\] \= useState\<Usuari | null\>(null);  const valor \= useMemo(    () \=\> ({ usuari, login, logout, isAdmin: usuari?.rol \=== 'admin' }),    \[usuari\]  );  // ← useMemo evita nou objecte en cada render → evita re-renders innecessaris  return \<AuthContext value={valor}\>{children}\</AuthContext\>;}// 3\. CUSTOM HOOK → públic, amb Fail Fastexport function useAuth() {  const ctx \= useContext(AuthContext);  if (ctx \=== undefined) {    throw new Error('useAuth ha d\\'usar-se dins d\\'un \<AuthProvider\>');    // ↑ Error clar i accionable en lloc de "Cannot read properties of undefined"  }  return ctx;} |
| :---- |

**3\. Context \+ `useState` vs. Context \+ `useReducer`**

| useState → per a estat simple (un valor, canvis independents)  → TemaProvider: useState\<'clar'|'fosc'\>  → AuthProvider: useState\<Usuari|null\>useReducer → per a estat complex (múltiples camps, transicions atòmiques)  → CarretProvider: items\[\], total, quantitats interconnectades  → WizardProvider: pas, dades multi-pas, errors, estat d'enviament |
| :---- |

| // Regla pràctica: si tens \> 3 useState interconnectats → useReducer// useReducer: la lògica de negoci en un reducer PUR (testejable sense React)type CarretAccio \=  | { type: 'AFEGIR'; payload: Item }  | { type: 'ELIMINAR'; payload: string }  | { type: 'BUIDAR' };function carretReducer(estat: CarretEstat, accio: CarretAccio): CarretEstat {  switch (accio.type) {    case 'AFEGIR':      const items \= \[...estat.items, accio.payload\];      return { items, total: items.reduce((s, i) \=\> s \+ i.preu, 0) };    case 'ELIMINAR':      const filtrats \= estat.items.filter(i \=\> i.id \!== accio.payload);      return { items: filtrats, total: filtrats.reduce((s, i) \=\> s \+ i.preu, 0) };    case 'BUIDAR':      return { items: \[\], total: 0 };    default:      return estat;  }}// Patró avançat: separar estat i dispatch en contexts independents// → Components que únicament fan dispatch NO re-renderitzen quan l'estat canviaconst CarretEstatContext \= createContext\<CarretEstat | undefined\>(undefined);const CarretDispatchContext \= createContext\<React.Dispatch\<CarretAccio\> | undefined\>(undefined);// Hook d'alt nivell que exposa accions semàntiques (millor DX)export function useCarret() {  const estat \= useCarretEstat();  const dispatch \= useCarretDispatch();  return {    ...estat,    afegir: (item: Item) \=\> dispatch({ type: 'AFEGIR', payload: item }),    eliminar: (id: string) \=\> dispatch({ type: 'ELIMINAR', payload: id }),    buidar: () \=\> dispatch({ type: 'BUIDAR' }),  };} |
| :---- |

**4\. Rendiment: el problema i les solucions**

**El problema fonamental:** quan un valor de Context canvia, TOTS els consumers re-renderitzen, fins i tot si únicament usen una petita part.

**Les quatre solucions:**

| // SOLUCIÓ 1: useMemo al Provider (evitar nou objecte en cada render)const valor \= useMemo(() \=\> ({ usuari, tema }), \[usuari, tema\]);\<AuthContext value={valor}\>{children}\</AuthContext\>// SOLUCIÓ 2: Separar contexts per freqüència de canvi\<UsuariContext value={usuari}\>       {/\* canvia rarament \*/}  \<NotificacionsContext value={count}\> {/\* canvia sovint \*/}    \<App /\>  \</NotificacionsContext\>\</UsuariContext\>// → Quan 'notificacions' canvia, 'usuari' consumers NO re-renderitzen// SOLUCIÓ 3: React.memo per a components no consumersconst GràficVendes \= React.memo(function GràficVendes() {  // No usa cap context però és fill d'un component que sí  // React.memo evita el re-render si les seves props no canvien  return \<Chart /\>;});// SOLUCIÓ 4: Separar estat i dispatch// dispatch és sempre la mateixa referència → els components que únicament// fan dispatch mai re-renderitzen per canvis d'estatconst BotoAfegir \= React.memo(({ item }) \=\> {  const dispatch \= useCarretDispatch();  return \<button onClick={() \=\> dispatch({ type: 'AFEGIR', payload: item })}\>    Afegir  \</button\>;}); |
| :---- |

**5\. Context vs. Llibreries d'estat global**

Context API:  
  → 0 KB, integrat, per a dades estables  
  → Ideal: tema, auth, i18n, feature flags  
  → Problema: tots els consumers re-renderitzen

Zustand (\~3 KB):  
  → Selectors quirúrgics sense Provider  
  → Ideal: carret, UI state dinàmic  
  → \`useCarret(state \=\> state.items.length)\` → re-render únicament quan count canvia

Redux Toolkit (\~45 KB):  
  → Time-travel debugging, middleware, enterprise  
  → Ideal: \> 10 peces d'estat, equips grans

Patró híbrid recomanat 2026:  
  Context → Tema, Auth, i18n (estable, 0 KB)  
  Zustand → Carret, UI state (dinàmic, 3 KB)  
  TanStack Query → Dades del servidor (caché, refetch)  
  useState → Estat local del component

**6\. Bones pràctiques per a l'estructuració**

ESTRUCTURA DE FITXERS:  
  src/  
    context/  
      auth.context.tsx     → AuthProvider \+ useAuth  
      tema.context.tsx     → TemaProvider \+ useTema  
      carret.context.tsx   → CarretProvider \+ useCarret  
      index.ts             → re-exporta tot  
    providers/  
      AppProviders.tsx     → compon tots els providers

API PÚBLICA:  
  ✅ Exportar: AuthProvider, useAuth  
  ❌ No exportar: AuthContext (roman privat)

BONES PRÀCTIQUES:  
  ✅ useMemo al valor del Provider  
  ✅ Custom Hook amb Fail Fast (error clar si falta Provider)  
  ✅ Separar contexts per freqüència de canvi  
  ✅ useReducer per a estat amb \> 3 camps interconnectats  
  ✅ Separar estat/dispatch per a rendiment òptim  
  ✅ Context local per a features autocontingudes (Wizard, Accordion)  
  ✅ Test wrapper que proporciona contexts als tests

  ❌ No passar objectes literals sense useMemo  
  ❌ No un sol context enorme amb tot l'estat global  
  ❌ No usar Context per a estat local del component  
  ❌ No saltar a Context quan props o lifting state és suficient

**Resum** 

PROBLEMA → SOLUCIÓ:  
  Prop Drilling → Context API (teleportar dades)  
  Props per 1-2 nivells → Seguir usant props (més explícit)  
  Component composition → children prop (sense Context)

IMPLEMENTACIÓ:  
  Tres peces: Context (privat) \+ Provider (públic) \+ Hook (públic)  
  useState → estat simple (tema, usuari)  
  useReducer → estat complex amb transicions atòmiques

RENDIMENT:  
  Context canvia → TOTS consumers re-renderitzen  
  Solució 1: useMemo al valor del Provider  
  Solució 2: Múltiples contexts per freqüència de canvi  
  Solució 3: React.memo per a fills no consumers  
  Solució 4: Separar estat/dispatch (components escritura no re-renderitzen)

QUAN SUPERAR Context:  
  Re-renders impossibles d'optimitzar → Zustand (selectors)  
  Async complex \+ logging → Redux Toolkit  
  Granularitat màxima → Jotai (àtoms)

PATRÓ HÍBRID 2026:  
  Context (tema, auth, i18n) \+  
  Zustand (carret, UI dinàmica) \+  
  TanStack Query (dades servidor) \+  
  useState (estat local)

ESTRUCTURACIÓ:  
  Un fitxer per domini → context/auth.context.tsx  
  AppProviders → composar tots els providers  
  Context local → per a features autocontingudes  
  Test wrapper → renderAmbContext() per als tests

