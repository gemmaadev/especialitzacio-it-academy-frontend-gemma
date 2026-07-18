**Combinar Context amb hooks com useState i useReducer**

**useReducer vs useState per a Gestió Complexa**  
[https://react.dev/reference/react/useReducer](https://react.dev/reference/react/useReducer)  
Documentació oficial comparant useReducer i useState per gestionar estat complex.

## **`useState` vs. `useReducer` dins d'un Context**

La documentació oficial de React estableix la guia clara: `useReducer` és preferible quan la lògica de l'estat és complexa i implica múltiples sub-valors, o quan el proper estat depèn de l'anterior. `useState` és adequat per a estats simples i independents.

USAR useState quan:  
  → L'estat és un valor simple (string, boolean, number)  
  → Els canvis son independents entre si  
  → La lògica d'actualització és trivial

USAR useReducer quan:  
  → L'estat és un objecte amb múltiples camps  
  → Les actualitzacions son complexes o condicionades  
  → Necessites transicions d'estat que depenen de l'estat anterior  
  → Vols lògica de negoci testejable per separat  
  → Hi ha moltes accions possibles sobre el mateix estat

**Context \+ `useState`: el patró simple**

Per a estat global senzill: tema, idioma, o dades de l'usuari autenticat.

| // src/context/tema.context.tsx// useState és suficient: l'estat és un valor simpletype Tema \= 'clar' | 'fosc';interface TemaContextType {  tema: Tema;  toggleTema: () \=\> void;  setTema: (tema: Tema) \=\> void;}const TemaContext \= createContext\<TemaContextType | undefined\>(undefined);export function TemaProvider({ children }: { children: React.ReactNode }) {  // useState: perfecte per a un sol valor que canvia de manera simple  const \[tema, setTema\] \= useState\<Tema\>(() \=\> {    // Inicialització lazy: llegir de localStorage al primer render    return (localStorage.getItem('tema') as Tema) ?? 'clar';  });  const toggleTema \= () \=\> {    setTema(prev \=\> {      const nou \= prev \=== 'clar' ? 'fosc' : 'clar';      localStorage.setItem('tema', nou); // ← side effect al setter      return nou;    });  };  const handleSetTema \= (nouTema: Tema) \=\> {    localStorage.setItem('tema', nouTema);    setTema(nouTema);  };  // Efecte per sincronitzar amb el DOM  useEffect(() \=\> {    document.documentElement.dataset.tema \= tema;  }, \[tema\]);  const valor \= useMemo(    () \=\> ({ tema, toggleTema, setTema: handleSetTema }),    \[tema\]  );  return \<TemaContext value={valor}\>{children}\</TemaContext\>;}export function useTema() {  const ctx \= useContext(TemaContext);  if (\!ctx) throw new Error('useTema ha d\\'usar-se dins de \<TemaProvider\>');  return ctx;} |
| :---- |

**Context \+ `useReducer`: el patró per a estat complex**

Quan l'estat té múltiples camps interconnectats i transicions complexes.

### **La signatura de `useReducer`**

| const \[estat, dispatch\] \= useReducer(reducer, estatInicial, funcióInit?)//      ↑ estat actual   ↑ funció per disparar accions//                                ↑ (estat, accio) \=\> nouEstat//                                          ↑ estat inicial//                                                    ↑ inicialitzador lazy |
| :---- |

### **Exemple complet: Formulari multi-pas**

| // src/context/wizard.context.tsx// 1\. Definir l'estat i les accions amb TypeScriptinterface WizardEstat {  pas: number;  totPasos: number;  dades: {    nom?: string;    email?: string;    pla?: 'basic' | 'pro' | 'enterprise';    pagament?: { tipus: string; token: string };  };  errors: Record\<string, string\>;  completat: boolean;}// Discriminated Union per a les accions: TypeScript garanteix el tipattype WizardAccio \=  | { type: 'NEXT\_PAS' }  | { type: 'PREV\_PAS' }  | { type: 'ANAR\_AL\_PAS'; payload: number }  | { type: 'ACTUALITZAR\_DADES'; payload: Partial\<WizardEstat\['dades'\]\> }  | { type: 'SET\_ERROR'; payload: { camp: string; missatge: string } }  | { type: 'NETEJAR\_ERRORS' }  | { type: 'COMPLETAR' }  | { type: 'REINICIAR' };// 2\. El Reducer: lògica de negoci pura (testejable sense React\!)function wizardReducer(estat: WizardEstat, accio: WizardAccio): WizardEstat {  switch (accio.type) {    case 'NEXT\_PAS':      return {        ...estat,        pas: Math.min(estat.pas \+ 1, estat.totPasos \- 1),        errors: {},      };    case 'PREV\_PAS':      return {        ...estat,        pas: Math.max(estat.pas \- 1, 0),        errors: {},      };    case 'ANAR\_AL\_PAS':      return {        ...estat,        pas: Math.max(0, Math.min(accio.payload, estat.totPasos \- 1)),        errors: {},      };    case 'ACTUALITZAR\_DADES':      return {        ...estat,        dades: { ...estat.dades, ...accio.payload },      };    case 'SET\_ERROR':      return {        ...estat,        errors: {          ...estat.errors,          \[accio.payload.camp\]: accio.payload.missatge,        },      };    case 'NETEJAR\_ERRORS':      return { ...estat, errors: {} };    case 'COMPLETAR':      return { ...estat, completat: true, pas: estat.totPasos \- 1 };    case 'REINICIAR':      return estatInicial;    default:      // TypeScript: si tots els casos estan coberts, aquest mai s'executa      return estat;  }}const estatInicial: WizardEstat \= {  pas: 0,  totPasos: 4,  dades: {},  errors: {},  completat: false,};// 3\. Context: separar estat i dispatch per a rendiment òptimconst WizardEstatContext \= createContext\<WizardEstat | undefined\>(undefined);const WizardDispatchContext \= createContext\<React.Dispatch\<WizardAccio\> | undefined\>(undefined);export function WizardProvider({ children }: { children: React.ReactNode }) {  const \[estat, dispatch\] \= useReducer(wizardReducer, estatInicial);  return (    \<WizardEstatContext value={estat}\>      \<WizardDispatchContext value={dispatch}\>        {children}      \</WizardDispatchContext\>    \</WizardEstatContext\>  );}// 4\. Hooks específics per a cada cas d'úsexport function useWizardEstat() {  const ctx \= useContext(WizardEstatContext);  if (\!ctx) throw new Error('useWizardEstat ha d\\'usar-se dins de \<WizardProvider\>');  return ctx;}export function useWizardDispatch() {  const ctx \= useContext(WizardDispatchContext);  if (\!ctx) throw new Error('useWizardDispatch ha d\\'usar-se dins de \<WizardProvider\>');  return ctx;}// Hook d'alt nivell amb accions pre-construïdes (millor DX)export function useWizard() {  const estat \= useWizardEstat();  const dispatch \= useWizardDispatch();  return {    // Estat    pas: estat.pas,    totPasos: estat.totPasos,    dades: estat.dades,    errors: estat.errors,    completat: estat.completat,    esPrimerPas: estat.pas \=== 0,    esUltimPas: estat.pas \=== estat.totPasos \- 1,    // Accions semàntiques (oculten el dispatch\!)    seguent: () \=\> dispatch({ type: 'NEXT\_PAS' }),    anterior: () \=\> dispatch({ type: 'PREV\_PAS' }),    anarA: (pas: number) \=\> dispatch({ type: 'ANAR\_AL\_PAS', payload: pas }),    actualitzar: (dades: Partial\<WizardEstat\['dades'\]\>) \=\>      dispatch({ type: 'ACTUALITZAR\_DADES', payload: dades }),    setError: (camp: string, missatge: string) \=\>      dispatch({ type: 'SET\_ERROR', payload: { camp, missatge } }),    netejarErrors: () \=\> dispatch({ type: 'NETEJAR\_ERRORS' }),    completar: () \=\> dispatch({ type: 'COMPLETAR' }),    reiniciar: () \=\> dispatch({ type: 'REINICIAR' }),  };} |
| :---- |

### **Ús als components: completament net**

| // Components que únicament llegeixen l'estatfunction ProgressBar() {  const { pas, totPasos } \= useWizardEstat();  return (    \<div className="progress"\>      \<div style={{ width: \`${((pas \+ 1\) / totPasos) \* 100}%\` }} /\>      \<span\>Pas {pas \+ 1} de {totPasos}\</span\>    \</div\>  );}// Components que únicament fan dispatch (sense re-render per estat)const BotosSeguent \= React.memo(function BotosSeguent() {  const { seguent, anterior, esPrimerPas, esUltimPas } \= useWizard();  // dispatch és estable → React.memo funciona  return (    \<div\>      \<button onClick={anterior} disabled={esPrimerPas}\>← Anterior\</button\>      \<button onClick={seguent}\>{esUltimPas ? 'Completar' : 'Següent →'}\</button\>    \</div\>  );});// Components que llegeixen i modifiquen dades del formularifunction PasDadesPersonals() {  const { dades, errors, actualitzar, setError } \= useWizard();  const handleNomChange \= (e: React.ChangeEvent\<HTMLInputElement\>) \=\> {    actualitzar({ nom: e.target.value });    if (e.target.value) setError('nom', ''); // netejar error al escriure  };  return (    \<div\>      \<input        value={dades.nom ?? ''}        onChange={handleNomChange}        placeholder="Nom complet"      /\>      {errors.nom && \<span className="error"\>{errors.nom}\</span\>}    \</div\>  );} |
| :---- |

**Comparativa directa: `useState` vs. `useReducer` en Context**

| // El MATEIX problema resolt de dues maneres:// Gestionar un formulari de login amb loading i error// AMB useState: múltiples setters, lògica dispersafunction LoginProviderAmbState({ children }) {  const \[email, setEmail\] \= useState('');  const \[password, setPassword\] \= useState('');  const \[loading, setLoading\] \= useState(false);  const \[error, setError\] \= useState\<string | null\>(null);  const \[usuari, setUsuari\] \= useState\<Usuari | null\>(null);  const login \= async () \=\> {    setLoading(true);    setError(null);    try {      const u \= await authService.login(email, password);      setUsuari(u);      setLoading(false);    } catch (e) {      setError((e as Error).message);      setLoading(false);      // → Si hi ha un error: cal cridar setLoading(false) DUES vegades (success i error)      // → Risc d'oblidar-se d'actualitzar algun camp    }  };}// AMB useReducer: transicions d'estat atòmiques i segurestype LoginEstat \=  | { fase: 'idle'; email: string; password: string }  | { fase: 'loading'; email: string; password: string }  | { fase: 'error'; email: string; password: string; missatge: string }  | { fase: 'autenticat'; usuari: Usuari };type LoginAccio \=  | { type: 'SET\_EMAIL'; payload: string }  | { type: 'SET\_PASSWORD'; payload: string }  | { type: 'LOGIN\_START' }  | { type: 'LOGIN\_OK'; payload: Usuari }  | { type: 'LOGIN\_ERROR'; payload: string }  | { type: 'LOGOUT' };function loginReducer(estat: LoginEstat, accio: LoginAccio): LoginEstat {  switch (accio.type) {    case 'SET\_EMAIL':      return estat.fase \!== 'autenticat'        ? { ...estat, email: accio.payload }        : estat;    case 'LOGIN\_START':      return { ...estat, fase: 'loading' };    case 'LOGIN\_OK':      return { fase: 'autenticat', usuari: accio.payload };    case 'LOGIN\_ERROR':      return { ...estat, fase: 'error', missatge: accio.payload };    case 'LOGOUT':      return { fase: 'idle', email: '', password: '' };    default:      return estat;  }}// → Transicions atòmiques: no és possible tenir loading=false i error alhora// → La lògica viu al reducer: testejable sense React// → TypeScript: discriminated union garanteix que accedeixis únicament als//   camps disponibles en cada fase |
| :---- |

**Resum** 

Context \+ useState → estat simple i independent  
  → TemaProvider: useState\<'clar'|'fosc'\>  
  → AuthProvider: useState\<Usuari|null\>  
  → NotificacionsProvider: useState\<number\>

Context \+ useReducer → estat complex amb transicions  
  → CarretProvider: items\[\], total, quantitats  
  → WizardProvider: pas, dades de múltiples passos, errors  
  → FormulariProvider: valors, errors, estat d'enviament

La regla pràctica:  
  "Si el teu Provider té \> 3 useState i la lògica d'actualització  
   implica actualitzar múltiples camps alhora → migrar a useReducer"

Avantatge principal de useReducer en Context:  
  → El reducer és una funció pura → testejable sense render  
  → Les transicions son atòmiques (no hi ha estats inconsistents)  
  → Les accions son la "documentació" de quèpot passar  
  → Separar dispatch del estat → rendiment òptim

