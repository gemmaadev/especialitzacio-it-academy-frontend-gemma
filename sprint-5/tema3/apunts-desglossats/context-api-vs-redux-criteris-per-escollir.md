## **Quins criteris determinen l'elecció entre Context API vs Redux?**

**Documentació Oficial de React Context**  
Guia oficial de React per compartir dades amb Context sense passar props manualment.  
[https://react.dev/learn/passing-data-deeply-with-context](https://react.dev/learn/passing-data-deeply-with-context)

**La distinció fonamental**

La cosa més important és que, a diferència de Redux, la Context API no és un sistema de gestió d'estat. 

En canvi, és un mecanisme d'injecció de dependències on gestiones un estat en un component React. Obtenim un sistema de gestió d'estat quan l'usem amb els hooks `useContext` i `useReducer`.

Context API:  
  → Mecanisme per passar dades profundament sense prop drilling  
  → L'estat viu en un component React normal (useState/useReducer)  
  → Integrada a React (0 KB addicionals)

Redux (Redux Toolkit):  
  → Sistema complet de gestió d'estat global  
  → Store centralitzat fora de React  
  → \+45 KB al bundle  
  → Middleware, DevTools, time-travel debugging

**Context API: com funciona en tres passos**

| // PAS 1: Crear el contextimport { createContext } from 'react';interface TemaContextType {  tema: 'clar' | 'fosc';  canviarTema: () \=\> void;}export const TemaContext \= createContext\<TemaContextType | null\>(null);// PAS 2: Proporcionar el context (Provider)function AppProvider({ children }: { children: React.ReactNode }) {  const \[tema, setTema\] \= useState\<'clar' | 'fosc'\>('clar');  const canviarTema \= () \=\>    setTema(prev \=\> prev \=== 'clar' ? 'fosc' : 'clar');  return (    \<TemaContext value={{ tema, canviarTema }}\>      {children}    \</TemaContext\>  );}// PAS 3: Consumir el context (en qualsevol component fill)function BotoTema() {  const { tema, canviarTema } \= useContext(TemaContext)\!;  return (    \<button onClick={canviarTema}\>      Mode {tema \=== 'clar' ? 'fosc' : 'clar'}    \</button\>  );}// → BotoTema accedeix a 'tema' sense que cap component intermedi li passi props |
| :---- |

**Redux Toolkit: com funciona**

| // 1\. Crear un slice (unitat de estat \+ lògica)import { createSlice, PayloadAction } from '@reduxjs/toolkit';interface CarretState { items: Item\[\]; total: number; }const carretSlice \= createSlice({  name: 'carret',  initialState: { items: \[\], total: 0 } as CarretState,  reducers: {    afegirItem(state, action: PayloadAction\<Item\>) {      state.items.push(action.payload); // ← Redux Toolkit permet "mutació" (usa Immer internament)      state.total \+= action.payload.preu;    },    eliminarItem(state, action: PayloadAction\<string\>) {      state.items \= state.items.filter(i \=\> i.id \!== action.payload);    },  },});// 2\. Configurar el storeimport { configureStore } from '@reduxjs/toolkit';const store \= configureStore({  reducer: { carret: carretSlice.reducer }});// 3\. Usar al componentfunction Carret() {  const items \= useSelector((state: RootState) \=\> state.carret.items);  const dispatch \= useDispatch();  return (    \<div\>      {items.map(item \=\> (        \<div key={item.id}\>          {item.nom}          \<button onClick={() \=\> dispatch(carretSlice.actions.eliminarItem(item.id))}\>            Eliminar          \</button\>        \</div\>      ))}    \</div\>  );} |
| :---- |

**Criteri 1: Complexitat i volum de l'estat**

Context API guanya per a solucions simples de prop drilling, aplicacions petites, i estat de tema/autenticació (0 KB de bundle vs 45 KB). 

Redux guanya per a aplicacions complexes amb actualitzacions d'estat freqüents, necessitat de middleware, depuració de time-travel, gestió de 10+ peces d'estat, o grans aplicacions enterprise.

Context API → quan:  
  → \< 5 peces d'estat global  
  → Estat que canvia poc (tema, idioma, usuari autenticat)  
  → App petita o mitjana  
  → Equip petit sense experiència en Redux

Redux → quan:  
  → 10+ peces d'estat global  
  → Lògica de negoci complexa (validacions, càlculs, transformacions)  
  → Molts reducers i slices interconnectats  
  → App enterprise o SaaS complex

**Criteri 2: Rendiment i re-renders**

El problema crític de Context: Context API causa re-renders innecessaris sense optimització, fent-la més lenta per a estat complex.

| // ❌ PROBLEMA Context: tot component que consumi el context es re-renderitza// quan QUALSEVOL part del context canviainterface AppContext {  usuari: Usuari;          // canvia rarament  notificacions: number;   // canvia cada segon\!  tema: string;            // canvia rarament}// Si 'notificacions' canvia → TOTS els consumers (usuari, tema) es re-renderitzen\!// → Impacte de rendiment en apps amb molts consumers// ✅ SOLUCIÓ Context: múltiples contexts per a dades amb freqüències de canvi diferent\<TemaContext\>        {/\* canvia rarament \*/}  \<UsuariContext\>    {/\* canvia rarament \*/}    \<NotificacionsContext\> {/\* canvia sovint \*/}      \<App /\>    \</NotificacionsContext\>  \</UsuariContext\>\</TemaContext\>// ✅ Redux amb selectors: re-renders quirúrgics// Únicament el component que usa 'notificacions' es re-renderitzaconst notificacions \= useSelector(state \=\> state.notificacions.count);// → Component re-renderitza ÚNICAMENT quan 'notificacions.count' canvia// → 'usuari' i 'tema' no es re-renderitzen// Nota 2026: el React Compiler (React 19\) redueix automàticament// els re-renders innecessaris de Context → la diferència de rendiment és menor |
| :---- |

**Criteri 3: Debugging i eines de desenvolupament**

Context API:  
  → Debugging via React DevTools (Component tree)  
  → No té historial d'accions  
  → Difícil rastrejar QUI va canviar l'estat i QUAN  
  → Sense time-travel debugging

Redux DevTools (molt superior):  
  → Historial complet de totes les accions dispatxades  
  → Time-travel: tornar a qualsevol punt anterior de l'estat  
  → Inspecció de l'estat en cada moment  
  → Replay d'accions per reproduir bugs  
  → Import/export de l'estat complet

En una migració real d'un dashboard fintech (2025):  
  → Redux va reduir un 40% els re-renders innecessaris  
  → Time-travel debugging va ser clau per a reproduir bugs complexos

**Criteri 4: operacions asíncrones**

| // Context API: cal gestionar async manualment (useEffect \+ useState)function AuthProvider({ children }) {  const \[usuari, setUsuari\] \= useState(null);  const \[loading, setLoading\] \= useState(true);  useEffect(() \=\> {    checkAuth().then(u \=\> { setUsuari(u); setLoading(false); });  }, \[\]);  // → Cal implementar loading, error, cancel·lació manualment}// Redux Toolkit: createAsyncThunk gestiona el cicle completconst fetchUsuari \= createAsyncThunk('auth/fetchUsuari', async (id: string) \=\> {  const resposta \= await fetch(\`/api/usuaris/${id}\`);  return resposta.json();});const authSlice \= createSlice({  name: 'auth',  initialState: { usuari: null, loading: false, error: null },  extraReducers: builder \=\> {    builder      .addCase(fetchUsuari.pending, state \=\> { state.loading \= true; })      .addCase(fetchUsuari.fulfilled, (state, action) \=\> {        state.usuari \= action.payload;        state.loading \= false;      })      .addCase(fetchUsuari.rejected, (state, action) \=\> {        state.error \= action.error.message;        state.loading \= false;      });  },});// → loading, success, error: gestionats automàticament pel toolkit |
| :---- |

**Els casos d'ús recomanats per la documentació React**

La documentació oficial de React identifica els casos on Context és útil: Theming (mode fosc/clar), Current Account (usuari autenticat), Routing (React Router l'usa internament), i Managing State (combinat amb `useReducer` per a estat complex).

Context API \- casos ideals (documentació React):  
  → Tema visual (dark/light mode)  
  → Usuari autenticat (login/logout)  
  → Idioma i localització (i18n)  
  → Preferències de la UI

Redux \- casos ideals:  
  → Carret de compra complex  
  → Gestió d'estat de formularis multi-pas  
  → Cache de dades de servidor (però TanStack Query ho fa millor)  
  → Estat compartit entre moltes features no relacionades  
  → Aplicació amb múltiples rols i permisos complexos

**El patró híbrid: la millor opció el 2026**

La recomanació és usar Context API per a l'"Estat d'Entorn" de baixa freqüència (temes, estat d'auth, locale) i Redux Toolkit per a l'"Estat de Domini" (dades de l'API, lògica de negoci complexa, streams en temps real).

| // Patró híbrid: Context per a UI, Redux per a dominifunction App() {  return (    \<Provider store={reduxStore}\>        {/\* Redux: carret, productes, comandes \*/}      \<TemaContext value={temaActual}\>   {/\* Context: tema visual \*/}        \<UsuariContext value={usuari}\>   {/\* Context: usuari autenticat \*/}          \<Router\>            \<AppRoutes /\>          \</Router\>        \</UsuariContext\>      \</TemaContext\>    \</Provider\>  );}// → Context per a dades simples i estables// → Redux per a lògica de negoci i estat complex |
| :---- |

**Context API vs. Redux**

| Criteri | Context API | Redux Toolkit |
| ----- | ----- | ----- |
| **Bundle size** | ✅ 0 KB (integrat) | ❌ \~45 KB |
| **Configuració** | ✅ Mínima | ❌ Més verbose |
| **Estat global \< 5 peces** | ✅ Ideal | ❌ Excessiu |
| **Estat global \> 10 peces** | ❌ Complex | ✅ Ideal |
| **Re-renders** | ❌ Tots els consumers | ✅ Selectors quirúrgics |
| **Debugging** | ❌ Limitat | ✅ DevTools excel·lents |
| **Operacions async** | ⚠️ Manual | ✅ createAsyncThunk |
| **Time-travel debugging** | ❌ No | ✅ Sí |
| **Equip gran** | ⚠️ Difícil convencions | ✅ Arquitectura clara |
| **App petita/MVP** | ✅ | ❌ Over-engineering |
| **App enterprise** | ⚠️ | ✅ |

