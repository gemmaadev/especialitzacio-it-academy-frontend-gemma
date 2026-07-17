## **Apunts T3 — Patrons de disseny i arquitectura en React**

**1\. El patró Container/Presenter**

La separació fonamental entre **qui gestiona les dades** i **qui les mostra**. Basada en el model Presentation-Domain-Data de Martin Fowler: reduir l'àmbit d'atenció permetent pensar en els tres temes de manera independent.

CONTAINER (component intel·ligent):  
  → Fetch, estat, lògica de negoci  
  → Passa dades al Presenter via props

PRESENTER (component pur):  
  → Únicament JSX i estils  
  → Reutilitzable, testejable sense xarxa

| // VERSIÓ MODERNA: Custom Hook (Container) \+ Component pla (Presenter)function useUsuaris() {   // ← el "Container" modern  const \[usuaris, setUsuaris\] \= useState\<Usuari\[\]\>(\[\]);  useEffect(() \=\> {    fetch('/api/usuaris').then(r \=\> r.json()).then(setUsuaris);  }, \[\]);  return { usuaris };}function LlistaUsuaris() {   // ← el "Presenter"  const { usuaris } \= useUsuaris();  return \<ul\>{usuaris.map(u \=\> \<UserItem key={u.id} user={u} /\>)}\</ul\>;} |
| :---- |

**Tres beneficis clau:** reduir l'àmbit d'atenció (cada peça té una sola preocupació), substitució d'implementations (múltiples UI sobre la mateixa lògica), i testabilitat (el Presenter és testejable sense mocks de xarxa).

**2\. HOC i render props**

Dos patrons pre-hooks per reutilitzar lògica entre components. Avui els Custom Hooks els substitueixen en la majoria de casos, però segueixen presents en codebases existents.

### 

### 

### **HOC (Higher-Order Component)**

Una funció que pren un component i retorna un component millorat. Convenció: el nom comença per `with`.

| // Estructura basefunction withComportament\<P extends object\>(WrappedComponent: React.ComponentType\<P\>) {  return function Enhanced(props: P) {    // afegir lògica, props, comportament...    return \<WrappedComponent {...props} /\>;  };}// Casos d'ús principals:const PàginaProtegida \= withAuth(PàginaDashboard);        // autenticacióconst LlistaAmbLoading \= withLoading(LlistaProductes);    // loading stateconst PàginaPreu \= withFeatureFlag('flag', Nou, Antic);   // A/B testing |
| :---- |

### **Render Props**

Un component que passa dades via una funció `children` (o qualsevol altra prop de funció). El consumidor decideix com renderitzar.

| // El component encapsula la lògica, el consumidor decideix la UIfunction MouseTracker({ children }: { children: (pos: {x:number; y:number}) \=\> React.ReactNode }) {  const \[pos, setPos\] \= useState({ x: 0, y: 0 });  return (    \<div onMouseMove={e \=\> setPos({ x: e.clientX, y: e.clientY })}\>      {children(pos)}   {/\* ← crida la funció amb les dades \*/}    \</div\>  );}// Ús: UI totalment flexible\<MouseTracker\>{({ x, y }) \=\> \<Cursor posX={x} posY={y} /\>}\</MouseTracker\> |
| :---- |

**Regla 2025-2026:** Custom Hooks per a lògica stateful. HOC quan cal embolcallar molts components en el punt d'importació. Render Props quan cal màxima flexibilitat de renderitzat.

**3\. Context API vs. Redux**

La distinció fonamental: Context API és un mecanisme de pas de dades (no un sistema de gestió d'estat complet). Redux és un sistema complet amb store centralitzat, middleware i DevTools.

Context API → 0 KB, integrat a React  
  → Ideal: tema, usuari autenticat, idioma (dades estables, \< 5 peces)  
  → Problema: tots els consumers re-renderitzen quan qualsevol valor canvia

Redux Toolkit → \~45 KB  
  → Ideal: estat complex, \> 10 peces, operacions async, debugging avançat  
  → Avantatge: selectors quirúrgics (únicament re-renderitza qui usa el valor canviat)

| // Context API: els tres passos// 1\. Crearconst TemaContext \= createContext\<TemaContextType | null\>(null);// 2\. Proporcionar\<TemaContext value={{ tema, canviarTema }}\>{children}\</TemaContext\>// 3\. Consumirconst { tema } \= useContext(TemaContext)\!;// Redux Toolkit: slice \+ store \+ selectorconst carretSlice \= createSlice({  name: 'carret',  initialState: { items: \[\] },  reducers: {    afegir(state, action) { state.items.push(action.payload); },  },});const items \= useSelector(state \=\> state.carret.items); // ← re-render quirúrgic |
| :---- |

**El patró híbrid (recomanat 2026):** Context per a "estat d'entorn" (tema, auth, locale) \+ Redux per a "estat de domini" (negoci, dades complexes, real-time).

**4\. Custom Hooks**

Funcions JavaScript que comencen per `use` i encapsulen lògica stateful reutilitzable. El patró modern que substitueix HOC i Render Props per a la majoria de casos.

**Regla clau:** els Custom Hooks comparteixen **lògica**, no **estat**. Cada component que crida el hook té el seu propi estat independent.

| // Encapsulen complexitat darrere una API declarativa:function useOnlineStatus() {  const \[isOnline, setIsOnline\] \= useState(true);  useEffect(() \=\> {    const on \= () \=\> setIsOnline(true);    const off \= () \=\> setIsOnline(false);    window.addEventListener('online', on);    window.addEventListener('offline', off);    return () \=\> {      window.removeEventListener('online', on);      window.removeEventListener('offline', off);    };  }, \[\]);  return isOnline;}// El component és completament declaratiu:function SaveButton() {  const isOnline \= useOnlineStatus(); // ← NO sap com funciona internament  return \<button disabled={\!isOnline}\>Desar\</button\>;} |
| :---- |

| // Super-poder: migrar la implementació sense tocar cap component// v1: useState \+ useEffect// v2: useSyncExternalStore (més robust)// → SaveButton i StatusBar no canvien absolutament res |
| :---- |

**5\. Principis SOLID en React**

| Principi | En React | Exemple clau |
| ----- | ----- | ----- |
| **SRP** | Un component/hook fa una cosa | Extreure `useUsers`, `getActiveUsers`, `UserItem` |
| **OCP** | Extensible via `children`/render props | `<Header>{children}</Header>` sense modificar Header |
| **LSP** | Extends props nadius | `type Props = InputHTMLAttributes<HTMLInputElement>` |
| **ISP** | Props mínimes necessàries | `<Thumbnail coverUrl={url}>` en lloc de `video={video}` |
| **DIP** | Injectar lògica via props | `<LoginForm onSubmit={fn}>` desacoblat de `api` |

| // SRP: cada peça una responsabilitatconst useActiveUsers \= () \=\> { /\* fetch \+ filter \*/ };const UserItem \= ({ user }) \=\> { /\* renderitzat \*/ };const ActiveUsersList \= () \=\> {  const { activeUsers } \= useActiveUsers();  return \<ul\>{activeUsers.map(u \=\> \<UserItem key={u.id} user={u} /\>)}\</ul\>;};// OCP: extensible sense modificarconst Header \= ({ children }) \=\> (  \<header\>\<Logo /\>\<Actions\>{children}\</Actions\>\</header\>);// Cada pàgina afegeix el seu contingut sense tocar Header// ISP: props mínimes\<Thumbnail coverUrl={video.coverUrl} /\>  // ✅\<Thumbnail video={video} /\>              // ❌ depèn de massa// DIP: abstracció via callback\<LoginForm onSubmit={(email, pass) \=\> api.login(email, pass)} /\> |
| :---- |

**6\. Arquitectura en capes**

La separació Presentació → Lògica → Dades aplicada a l'estructura del projecte.

| src/  components/    ← PRESENTACIÓ (JSX pur)  hooks/         ← LÒGICA (Custom Hooks, Business Logic)  services/      ← DADES (fetch, API, store)  types/         ← Compartit entre capesDependències: components → hooks → services (mai al revés) |
| :---- |

**Els cinc beneficis:** àmbit d'atenció reduït, substitució d'implementations, testabilitat per capes, paral·lelisme en el desenvolupament, i manteniment centralitzat.

**7\. Compound Components**

Components que treballen junts compartint estat implícitament via Context, sense prop drilling. L'analogia nativa: `<select>` i `<option>`.

| // Context compartit entre sub-componentsconst TabsContext \= createContext\<TabsContextType | null\>(null);// Component pare: gestiona l'estatconst Tabs \= ({ defaultValue, children }) \=\> {  const \[activeTab, setActiveTab\] \= useState(defaultValue);  return (    \<TabsContext value={{ activeTab, setActiveTab }}\>      \<div\>{children}\</div\>    \</TabsContext\>  );};// Sub-components: consumeixen l'estat implícitamentconst Tab \= ({ value, children }) \=\> {  const { activeTab, setActiveTab } \= useContext(TabsContext)\!;  return (    \<button aria-selected={activeTab \=== value} onClick={() \=\> setActiveTab(value)}\>      {children}    \</button\>  );};Tabs.List \= TabsList;Tabs.Tab \= Tab;Tabs.Panel \= TabPanel;// API flexible: el consumidor controla l'estructura\<Tabs defaultValue="perfil"\>  \<Tabs.List\>    \<Tabs.Tab value="perfil"\>Perfil\</Tabs.Tab\>    \<Tabs.Tab value="config"\>Config \<Badge count={3} /\>\</Tabs.Tab\>  \</Tabs.List\>  \<Tabs.Panel value="perfil"\>\<FormulariPerfil /\>\</Tabs.Panel\>\</Tabs\> |
| :---- |

**8\. Patrons de Props i JSX (reactpatterns.com)**

| // Destructuring: semprefunction Component({ nom, ...restProps }) { }// JSX Spread: passar props genèriques a elements nadiusfunction Input({ label, ...restProps }: { label: string } & InputHTMLAttributes\<HTMLInputElement\>) {  return \<\>\<label\>{label}\</label\>\<input {...restProps} /\>\</\>;}// Merge className correcte (ordre importa\!):function Btn({ className, ...props }) {  return \<button className={cn('btn', className)} {...props} /\>;}// Proxy Component: garantir atributs consistentsconst Button \= (props: ButtonHTMLAttributes\<HTMLButtonElement\>) \=\>  \<button type="button" {...props} /\>;// Controlled Input: React com a font de veritatconst \[valor, setValor\] \= useState('');\<input value={valor} onChange={e \=\> setValor(e.target.value)} /\>// State Hoisting: estat al pare comúfunction Pare() {  const \[cerca, setCerca\] \= useState('');  return \<InputCerca valor={cerca} onChange={setCerca} /\>;} |
| :---- |

## 

PATRONS DE SEPARACIÓ:  
  Container/Presenter → UI vs. Lògica (Custom Hook \+ Component pla)  
  Arquitectura en Capes → components/ \+ hooks/ \+ services/

PATRONS DE REUTILITZACIÓ:  
  Custom Hooks → lògica stateful compartida (el patró modern)  
  HOC → embolcallar components en el punt d'importació  
  Render Props → lògica compartida \+ UI totalment flexible

GESTIÓ D'ESTAT GLOBAL:  
  Context API → dades estables, \< 5 peces, 0 KB extra  
  Redux Toolkit → \> 10 peces, async, debugging, enterprise  
  Híbrid → Context (entorn) \+ Redux (domini)

PRINCIPIS SOLID:  
  SRP → una responsabilitat per component/hook  
  OCP → extensible via children (sense modificar)  
  LSP → extendre props nadius (InputHTMLAttributes)  
  ISP → props mínimes (no passar l'objecte sencer)  
  DIP → injectar lògica via callbacks (no imports directes)

PATRONS DE COMPOSICIÓ:  
  Compound Components → context implícit (Tabs, Accordion, Select)  
  Proxy Component → garantir atributs consistents (Button, Input)  
  Style Component → centralitzar estils (PrimaryBtn, DangerBtn)  
  Layout Component → estructura visual pura

PATRONS DE PROPS:  
  Destructuring → llegibilitat  
  JSX Spread → passar props genèriques  
  Merge className → combinar estils sense perdre cap  
  Controlled Input → React com a font de veritat  
  State Hoisting → estat al pare comú, fill pur

