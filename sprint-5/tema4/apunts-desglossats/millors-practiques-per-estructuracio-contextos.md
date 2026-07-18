## **Quines són les millors pràctiques per a l'estructuració de contextos?** 

**1\. El patró complet: Context \+ Provider \+ Custom Hook**

La millor pràctica fonamental de Kent C. Dodds: mai exposar el context directament. Sempre embolcallar-lo en un Provider i un Custom Hook.

| // src/context/auth.context.tsx// ✅ ESTRUCTURA COMPLETA RECOMANADA:// 1\. Interfície TypeScript clarainterface AuthContextType {  usuari: Usuari | null;  login: (creds: Credencials) \=\> Promise\<void\>;  logout: () \=\> void;  isAdmin: boolean;}// 2\. Context PRIVAT (no s'exporta\!)const AuthContext \= createContext\<AuthContextType | undefined\>(undefined);// 3\. Provider PÚBLIC (s'exporta)export function AuthProvider({ children }: { children: React.ReactNode }) {  const \[usuari, setUsuari\] \= useState\<Usuari | null\>(null);  const login \= async (creds: Credencials) \=\> {    const u \= await authService.login(creds);    setUsuari(u);  };  const logout \= () \=\> { authService.logout(); setUsuari(null); };  // useMemo per evitar nou objecte en cada render  const valor \= useMemo(    () \=\> ({ usuari, login, logout, isAdmin: usuari?.rol \=== 'admin' }),    \[usuari\]  );  return \<AuthContext value={valor}\>{children}\</AuthContext\>;}// 4\. Custom Hook PÚBLIC amb error clar (Fail Fast)export function useAuth() {  const context \= useContext(AuthContext);  if (context \=== undefined) {    throw new Error('useAuth ha d\\'usar-se dins d\\'un \<AuthProvider\>');  }  return context;}// ← ÚNICAMENT s'exporta AuthProvider i useAuth// ← AuthContext roman privat → l'API és neta i controlada |
| :---- |

**2\. Context \+ `useReducer`: per a estat complex**

Quan l'estat del context té múltiples camps interconnectats, `useReducer` és millor que múltiples `useState`.

| // src/context/carret.context.tsx// Tipat complet de l'estat i les accionsinterface CarretEstat {  items: ItemCarret\[\];  total: number;  obert: boolean;}type CarretAccio \=  | { type: 'AFEGIR'; payload: Item }  | { type: 'ELIMINAR'; payload: string }  | { type: 'ACTUALITZAR\_QUANTITAT'; payload: { id: string; quantitat: number } }  | { type: 'BUIDAR' }  | { type: 'TOGGLE\_CARRET' };// Reducer: lògica de negoci pura i testejable per separatfunction carretReducer(estat: CarretEstat, accio: CarretAccio): CarretEstat {  switch (accio.type) {    case 'AFEGIR': {      const existeix \= estat.items.find(i \=\> i.id \=== accio.payload.id);      const items \= existeix        ? estat.items.map(i \=\>            i.id \=== accio.payload.id              ? { ...i, quantitat: i.quantitat \+ 1 }              : i          )        : \[...estat.items, { ...accio.payload, quantitat: 1 }\];      return {        ...estat,        items,        total: items.reduce((s, i) \=\> s \+ i.preu \* i.quantitat, 0),      };    }    case 'ELIMINAR': {      const items \= estat.items.filter(i \=\> i.id \!== accio.payload);      return {        ...estat,        items,        total: items.reduce((s, i) \=\> s \+ i.preu \* i.quantitat, 0),      };    }    case 'BUIDAR':      return { items: \[\], total: 0, obert: false };    case 'TOGGLE\_CARRET':      return { ...estat, obert: \!estat.obert };    default:      return estat;  }}// Dos contexts separats: estat i dispatch// → Components que únicament fan dispatch NO re-renderitzen quan l'estat canviaconst CarretEstatContext \= createContext\<CarretEstat | undefined\>(undefined);const CarretDispatchContext \= createContext\<React.Dispatch\<CarretAccio\> | undefined\>(undefined);export function CarretProvider({ children }: { children: React.ReactNode }) {  const \[estat, dispatch\] \= useReducer(carretReducer, {    items: \[\],    total: 0,    obert: false,  });  return (    \<CarretEstatContext value={estat}\>      \<CarretDispatchContext value={dispatch}\>        {children}      \</CarretDispatchContext\>    \</CarretEstatContext\>  );}// Dos hooks: un per a lectura, un per a escripturaexport function useCarretEstat() {  const context \= useContext(CarretEstatContext);  if (\!context) throw new Error('useCarretEstat ha d\\'usar-se dins de \<CarretProvider\>');  return context;}export function useCarretDispatch() {  const context \= useContext(CarretDispatchContext);  if (\!context) throw new Error('useCarretDispatch ha d\\'usar-se dins de \<CarretProvider\>');  return context;}// Hook combinat per a components que necessiten les dues cosesexport function useCarret() {  return {    ...useCarretEstat(),    dispatch: useCarretDispatch(),  };} |
| :---- |

**3\. El Provider Pattern: composar tots els providers**

| // src/providers/AppProviders.tsx// Un sol component que compon tots els providers en l'ordre correcteexport function AppProviders({ children }: { children: React.ReactNode }) {  return (    \<AuthProvider\>           {/\* ← primer: altres providers poden necessitar auth \*/}      \<TemaProvider\>         {/\* ← segon: tema pot dependre del usuari \*/}        \<I18nProvider\>          \<CarretProvider\>            {children}          \</CarretProvider\>        \</I18nProvider\>      \</TemaProvider\>    \</AuthProvider\>  );}// src/main.tsxReactDOM.createRoot(document.getElementById('root')\!).render(  \<React.StrictMode\>    \<AppProviders\>      \<RouterProvider router={router} /\>    \</AppProviders\>  \</React.StrictMode\>); |
| :---- |

**4\. Estructura de fitxers recomanada**

| src/  context/                      ← cada fitxer \= un domini    auth.context.tsx            → AuthProvider \+ useAuth    tema.context.tsx            → TemaProvider \+ useTema    carret.context.tsx          → CarretProvider \+ useCarret \+ useCarretDispatch    notificacions.context.tsx   → NotificacionsProvider \+ useNotificacions    index.ts                    → re-exporta tots els hooks i providers  providers/    AppProviders.tsx            → compon tots els providers  types/    context.types.ts            → interfícies compartides entre contexts |
| :---- |

| // src/context/index.ts \-- punt d'entrada únicexport { AuthProvider, useAuth } from './auth.context';export { TemaProvider, useTema } from './tema.context';export { CarretProvider, useCarret, useCarretDispatch } from './carret.context';// Ús als components: import net i consistentimport { useAuth, useTema } from '@/context'; |
| :---- |

**5\. Context local per a sub-arbres**

No tot el context ha de ser global. Una feature complexa pot tenir el seu propi context local.

| // Context d'àmbit limitat: únicament per al Wizard de Checkoutinterface WizardContextType {  pas: number;  dades: Partial\<DadesComanda\>;  anarAlPas: (pas: number) \=\> void;  actualitzar: (dades: Partial\<DadesComanda\>) \=\> void;  completar: () \=\> void;}const WizardContext \= createContext\<WizardContextType | undefined\>(undefined);export function useWizard() {  const ctx \= useContext(WizardContext);  if (\!ctx) throw new Error('useWizard ha d\\'usar-se dins de \<CheckoutWizard\>');  return ctx;}export function CheckoutWizard() {  const \[pas, setPas\] \= useState(0);  const \[dades, setDades\] \= useState\<Partial\<DadesComanda\>\>({});  const navigate \= useNavigate();  const valor \= useMemo(() \=\> ({    pas,    dades,    anarAlPas: setPas,    actualitzar: (noves: Partial\<DadesComanda\>) \=\>      setDades(prev \=\> ({ ...prev, ...noves })),    completar: async () \=\> {      await crearComanda(dades);      navigate('/confirmació');    },  }), \[pas, dades, navigate\]);  return (    \<WizardContext value={valor}\>      \<StepIndicator pas={pas} total={3} /\>      {pas \=== 0 && \<PasDireccio /\>}      {pas \=== 1 && \<PasPagament /\>}      {pas \=== 2 && \<PasResum /\>}    \</WizardContext\>  );}// Sub-components del Wizard: reutilitzables i autocontingutsfunction PasDireccio() {  const { dades, actualitzar, anarAlPas } \= useWizard();  // ← Sap exactament en quin context viu gràcies al Fail Fast del hook  return (    \<form onSubmit={() \=\> anarAlPas(1)}\>      \<input value={dades.carrer || ''}             onChange={e \=\> actualitzar({ carrer: e.target.value })} /\>      \<button type\="submit"\>Continuar\</button\>    \</form\>  );} |
| :---- |

**6\. Testing de components amb Context**

Una de les millors pràctiques: crear wrappers de test que proporcionen els contexts necessaris.

| // src/test-utils/render-with-context.tsximport { render } from '@testing-library/react';interface RenderOptions {  usuariMock?: Usuari;  tema?: 'clar' | 'fosc';}// Wrapper que proporciona tots els contexts necessaris per als testsfunction TestProviders({  children,  usuariMock \= null,  tema \= 'clar',}: { children: React.ReactNode } & RenderOptions) {  return (    \<AuthProvider initialUsuari={usuariMock}\>      \<TemaProvider initialTema={tema}\>        {children}      \</TemaProvider\>    \</AuthProvider\>  );}// Funció de render personalitzadaexport function renderAmbContext(ui: React.ReactElement, opcions: RenderOptions \= {}) {  return render(ui, {    wrapper: ({ children }) \=\> (      \<TestProviders {...opcions}\>{children}\</TestProviders\>    ),  });}// Ús als tests: net i sense boilerplate repetittest('mostra el nom de l\\'usuari autenticat', () \=\> {  const usuariMock \= { id: '1', nom: 'Anna', rol: 'admin' };  renderAmbContext(\<Header /\>, { usuariMock });  expect(screen.getByText('Anna')).toBeInTheDocument();});test('aplica la classe de tema fosc', () \=\> {  renderAmbContext(\<App /\>, { tema: 'fosc' });  expect(document.documentElement).toHaveClass('dark');}); |
| :---- |

**Checklist de bones pràctiques**

✅ Cada context en el seu propi fitxer (un domini, un fitxer)  
✅ Context PRIVAT → Provider \+ Custom Hook PÚBLICS  
✅ Custom Hook amb error clar (Fail Fast)  
✅ useMemo al Provider per evitar nous objectes en cada render  
✅ Separar contexts per freqüència de canvi  
✅ useReducer per a estat complex (\> 2-3 camps interconnectats)  
✅ Separar estat i dispatch en contexts independents quan cal  
✅ Context local per a features autocontingudes (Wizard, Accordion)  
✅ AppProviders per a composar tots els providers  
✅ Test wrapper que proporciona contexts als tests

❌ NO exportar el context directament (usar el custom hook)  
❌ NO un sol context enorme amb tot l'estat global  
❌ NO passar objectes literals com a valor sense useMemo  
❌ NO abusar del context per a estat local del component  
❌ NO saltar a context quan props o lifting state és suficient

