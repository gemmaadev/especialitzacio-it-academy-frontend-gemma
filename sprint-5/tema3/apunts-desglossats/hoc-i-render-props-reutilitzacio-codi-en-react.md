## **Com contribueixen els HOC i Render Props a la reutilització de codi?**

**Dos patrons pre-hooks per a reutilitzar lògica**

Abans de React Hooks (pre-2019), compartir lògica entre components era un repte. Els dos patrons que van solucionar-ho son HOC i Render Props. 

Avui, els Custom Hooks han substituït molts dels seus casos d'ús, però HOC i Render Props segueixen sent rellevants en codebases grans i en casos específics.

**HOC (Higher-Order Component): funcions que retornen components**

Concretament, un Higher-Order Component és una funció que pren un component i retorna un nou component. 

Mentre que un component transforma props en UI, un HOC compon el component original embolcallant-lo en un component contenidor. Un HOC és una funció pura sense efectes secundaris.

| higherOrderComponent(WrappedComponent) → EnhancedComponentLa mateixa idea que les Higher-Order Functions en JavaScript:\[1,2,3\].map(fn)     → map pren una funció i retorna un nou arraywithAuth(Component) → withAuth pren un component i retorna un nou component |
| :---- |

### **HOC bàsic: la plantilla**

| // Convenció: el nom comença per 'with'function withNomDelComportament\<P extends object\>(  WrappedComponent: React.ComponentType\<P\>) {  // El HOC retorna un NOU component  function ComponentMillorat(props: P) {    // → afegeix comportament, lògica, props...    return \<WrappedComponent {...props} /\>;    //                        ↑ passa TOTES les props originals\!  }  // Nom per a DevTools (molt recomanat)  ComponentMillorat.displayName \=    \`withNom(${WrappedComponent.displayName || WrappedComponent.name})\`;  return ComponentMillorat;} |
| :---- |

### **Exemple 1: HOC d'autenticació**

| // Cas d'ús clàssic: protegir rutes/componentsinterface WithAuthProps {  usuari: Usuari;}function withAuth\<P extends WithAuthProps\>(  WrappedComponent: React.ComponentType\<P\>) {  return function WithAuth(props: Omit\<P, keyof WithAuthProps\>) {    const { usuari, carregant } \= useAuth();    if (carregant) return \<Spinner /\>;    if (\!usuari) return \<Navigate to="/login" replace /\>;    // L'usuari autenticat es passa automàticament com a prop    return \<WrappedComponent {...(props as P)} usuari={usuari} /\>;  };}// Component originalfunction PàginaPanel({ usuari }: WithAuthProps) {  return \<h1\>Benvingut, {usuari.nom}\!\</h1\>;}// Component millorat: protegit per autenticacióconst PàginaPanelProtegida \= withAuth(PàginaPanel);// → PàginaPanelProtegida mai renderitza sense un usuari autenticat// → Sense repetir la lògica d'auth a cada component |
| :---- |

### **Exemple 2: HOC de Loading State**

| // HOC que afegeix estat de càrrega a qualsevol componentinterface WithLoadingProps {  isLoading: boolean;}function withLoading\<P extends object\>(  WrappedComponent: React.ComponentType\<P\>) {  return function WithLoading({ isLoading, ...props }: P & WithLoadingProps) {    if (isLoading) return \<Spinner /\>;    return \<WrappedComponent {...(props as P)} /\>;  };}// Aplicar a qualsevol component:const LlistaAmbLoading \= withLoading(LlistaProductes);const TaulaAmbLoading \= withLoading(TaulaUsuaris);const GràficAmbLoading \= withLoading(GràficVendes);// Ús:\<LlistaAmbLoading isLoading={carregant} productes={productes} /\>\<TaulaAmbLoading isLoading={carregant} usuaris={usuaris} /\> |
| :---- |

### **Exemple 3: HOC de Feature Flags**

| // HOC per a A/B testing i feature flagsfunction withFeatureFlag\<P extends object\>(  flagKey: string,  TractamentNou: React.ComponentType\<P\>,  TractamentAntic: React.ComponentType\<P\>,) {  return function WithFeatureFlag(props: P) {    const actiu \= useFlag(flagKey);    return actiu ? \<TractamentNou {...props} /\> : \<TractamentAntic {...props} /\>;  };}// Ús:export const PàginaPreu \= withFeatureFlag(  'pricing\_redesign\_2025',  PàginePreuNova,  PàginaPrueAntica,);// → Canviar el flag → canvia tota la pàgina sense tocar els components |
| :---- |

**Render Props: passar una funció com a prop**

El patró Render Props consisteix a passar una funció com a prop a un component, i aquest component crida aquella funció per renderitzar el seu contingut. La funció rep dades o comportament del component pare i retorna JSX.

| // Estructura bàsica: el component passa la lògica via prop de funció\<ComponentAmb\_Lògica  render={(dades) \=\> \<UIQueUsaLesDades dades={dades} /\>}/\>// O via la prop especial 'children' (children-as-function):\<ComponentAmb\_Lògica\>  {(dades) \=\> \<UIQueUsaLesDades dades={dades} /\>}\</ComponentAmb\_Lògica\> |
| :---- |

### **Exemple 1: Render prop de posició del ratolí**

| // Component que encapsula la lògica de tracking del ratolíinterface MousePosition { x: number; y: number; }interface MouseTrackerProps {  children: (posicio: MousePosition) \=\> React.ReactNode;  // ↑ children és una FUNCIÓ que rep les dades i retorna JSX}function MouseTracker({ children }: MouseTrackerProps) {  const \[posicio, setPosicio\] \= useState\<MousePosition\>({ x: 0, y: 0 });  return (    \<div      style={{ height: '100vh' }}      onMouseMove={e \=\> setPosicio({ x: e.clientX, y: e.clientY })}    \>      {/\* Crida la funció children amb les dades disponibles \*/}      {children(posicio)}    \</div\>  );}// Ús: el component extern decideix COM renderitzar les dades\<MouseTracker\>  {({ x, y }) \=\> (    \<div\>      \<h1\>Posició del ratolí: {x}, {y}\</h1\>    \</div\>  )}\</MouseTracker\>// Reutilitzar la mateixa lògica amb UI diferent:\<MouseTracker\>  {({ x, y }) \=\> \<Cursor posicioX={x} posicioY={y} /\>}\</MouseTracker\> |
| :---- |

### **Exemple 2: Render prop de Data Fetching**

| // Component que encapsula la lògica de fetchinterface FetcherProps\<T\> {  url: string;  children: (estat: { dades: T | null; loading: boolean; error: Error | null }) \=\> React.ReactNode;}function Fetcher\<T\>({ url, children }: FetcherProps\<T\>) {  const \[dades, setDades\] \= useState\<T | null\>(null);  const \[loading, setLoading\] \= useState(true);  const \[error, setError\] \= useState\<Error | null\>(null);  useEffect(() \=\> {    let ignore \= false;    fetch(url)      .then(r \=\> r.json())      .then(d \=\> { if (\!ignore) { setDades(d); setLoading(false); } })      .catch(e \=\> { if (\!ignore) { setError(e); setLoading(false); } });    return () \=\> { ignore \= true; };  }, \[url\]);  // Delega la renderització a la funció children  return \<\>{children({ dades, loading, error })}\</\>;}// Ús: la lògica de fetch es reutilitza, la UI és flexible\<Fetcher\<Producte\[\]\> url="/api/productes"\>  {({ dades, loading, error }) \=\> {    if (loading) return \<Spinner /\>;    if (error) return \<MissatgeError error={error} /\>;    return \<LlistaProductes productes={dades\!} /\>;  }}\</Fetcher\>// Reutilitzar amb una altra URL i una altra UI:\<Fetcher\<Usuari\[\]\> url="/api/usuaris"\>  {({ dades, loading }) \=\>    loading ? \<Skeleton /\> : \<TaulaUsuaris usuaris={dades\!} /\>  }\</Fetcher\> |
| :---- |

**Composició de HOCs**

Els HOCs es poden compondre per afegir múltiples comportaments:

| // Composició manual (de dins cap a fora):const ComponentMillorat \= withAuth(withLoading(withLogger(Component)));// → L'ordre importa: withAuth s'aplica primer (el més extern)// Funció compose per a llegibilitat:const compose \= (...fns: Function\[\]) \=\> (x: any) \=\>  fns.reduceRight((v, f) \=\> f(v), x);const ComponentMillorat \= compose(  withAuth,  withLoading,  withLogger,)(Component); |
| :---- |

**HOC vs. Render Props vs. Custom Hooks: quan usar cada un**

Les docs oficials de React son clares: "En la majoria de casos, els Hooks substituiran els HOC". Un HOC té un overhead (component extra, indirecta extra) que únicament val la pena quan la reutilització és real.

| ✅ HOC → quan:  → Vols embolcallar MOLTS components amb el mateix comportament (auth, logging)  → Necessites compondre comportaments en el punt d'importació (no dins el component)  → Treballes en codebases legacy o amb biblioteques que esperen components  → React.memo (és el HOC més usat de React\!)✅ Render Props → quan:  → Vols compartir lògica PERÒ deixar total flexibilitat de renderitzat al consumidor  → Necessites injectar dades a components de tercers sense HOC  → El component ha de renderitzar en múltiples llocs amb UI diferent✅ Custom Hooks (recomanat 2025-2026) → quan:  → Vols compartir lògica stateful entre components  → La lògica no implica canviar el renderitzat del component consumidor  → Vols evitar la "wrapper hell" dels HOCs aniuats  → TypeScript és molt més simple (sense generics complexos)// La mateixa lògica: HOC vs Custom Hook// HOC:const PàgineProtegida \= withAuth(PàginaDashboard);// Custom Hook (equivalent, més simple):function PàginaDashboard() {  const { usuari } \= useAuth(); // ← idèntica lògica, més llegible  if (\!usuari) return \<Navigate to="/login" /\>;  return \<h1\>Benvingut, {usuari.nom}\!\</h1\>;} |
| :---- |

**Resum: HOC vs. Render Props**

|  | HOC | Render Props |
| ----- | ----- | ----- |
| **Com funciona** | Funció que retorna un component | Prop de funció que retorna JSX |
| **Lògica compartida** | ✅ Embolcalla el component | ✅ La passa via funció |
| **Flexibilitat UI** | ❌ UI fixada pel HOC | ✅ El consumidor decideix la UI |
| **Composició** | ✅ Fàcil (compose/pipe) | ⚠️ Aniuat → llegibilitat baixa |
| **TypeScript** | ⚠️ Generics complexos | ✅ Més senzill |
| **DevTools** | ⚠️ Wrapper hell | ✅ Clar |
| **Alternativa modern** | Custom Hook | Custom Hook |
| **Quan preferir** | Auth, logging, memoïtzació | UI flexible, components tercers |

