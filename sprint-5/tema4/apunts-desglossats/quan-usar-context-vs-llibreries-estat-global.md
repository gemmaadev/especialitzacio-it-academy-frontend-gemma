## **Quan és apropiat utilitzar Context vs. una llibreria d'estat global?** 

**El panorama de la gestió d'estat el 2026**

| useState \+ props    → estat local, un sol componentCustom Hooks        → lògica stateful compartida entre componentsContext API         → estat global simple, 0 KB extraZustand             → estat global lleuger (\~3 KB), API senzillaJotai               → estat atòmic granular (\~3 KB)Redux Toolkit       → estat global complet (\~45 KB), enterpriseTanStack Query      → estat del servidor (no és gestió d'estat local\!) |
| :---- |

**Context API: els casos on és la resposta correcta**

Context és ideal quan les dades son **globals i estables**: canvien rarament i molts components les necessiten.

| // ✅ Context és perfecte per a:// 1\. Tema visualconst TemaContext \= createContext\<'clar' | 'fosc'\>('clar');// → Canvia rarament (quan l'usuari ho decideix)// → Molts components el llegeixen// 2\. Usuari autenticatconst AuthContext \= createContext\<{ usuari: Usuari | null; logout: () \=\> void } | null\>(null);// → Canvia rarament (login/logout)// → Accedible des de qualsevol lloc// 3\. Configuració i localització (i18n)const I18nContext \= createContext\<{ t: (key: string) \=\> string; locale: string } | null\>(null);// → Estable, global// 4\. Feature flagsconst FeatureFlagsContext \= createContext\<Record\<string, boolean\>\>({});// → Carregats una vegada, estables durant la sessió |
| :---- |

**Els senyals que context ja NO és suficient**

| ❌ Usar Context quan:  → L'estat canvia molt freqüentment (contador, dades en temps real)  → Necessites operacions asíncrones complexes amb loading/error state  → Vols debugging avançat (historial d'accions, time-travel)  → Múltiples features independent comparteixen parcialment l'estat  → Tens \> 10 peces d'estat global interconnectat  → El rendiment és crític i els re-renders son un problema |
| :---- |

**Zustand: l'alternativa lleugera (\~3 KB)**

Zustand és una solució d'estat global minimalista. Sense Providers, sense boilerplate, sense re-renders innecessaris.

| import { create } from 'zustand';// DEFINIR l'store (sense Provider, sense Context\!)interface CarretStore {  items: Item\[\];  total: number;  afegir: (item: Item) \=\> void;  eliminar: (id: string) \=\> void;  buidar: () \=\> void;}const useCarret \= create\<CarretStore\>((set, get) \=\> ({  items: \[\],  total: 0,  afegir: (item) \=\> set(state \=\> ({    items: \[...state.items, item\],    total: state.total \+ item.preu,  })),  eliminar: (id) \=\> set(state \=\> {    const item \= state.items.find(i \=\> i.id \=== id);    return {      items: state.items.filter(i \=\> i.id \!== id),      total: state.total \- (item?.preu ?? 0),    };  }),  buidar: () \=\> set({ items: \[\], total: 0 }),}));// ÚS: accedir únicament al que necessita el component// → Re-render quirúrgic: únicament quan el valor seleccionat canviafunction IconaCarret() {  const count \= useCarret(state \=\> state.items.length); // ← selector\!  return \<span\>{count} items\</span\>;}function BotoAfegir({ producte }: { producte: Producte }) {  const afegir \= useCarret(state \=\> state.afegir);  return \<button onClick={() \=\> afegir(producte)}\>Afegir\</button\>;}function ResumCarret() {  const { items, total, buidar } \= useCarret();  return (    \<div\>      \<p\>Total: {total}€\</p\>      \<button onClick={buidar}\>Buidar\</button\>    \</div\>  );}// → Sense cap Provider\!// → Re-renders quirúrgics via selectors (com Redux useSelector) |
| :---- |

**Jotai: Estat atòmic granular (\~3 KB)**

Jotai segueix un model d'àtoms: cada peça d'estat és un àtom independent. Ideal quan l'estat es pot descompondre en peces petites i independents.

| import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';// Definir àtoms individualsconst usuariAtom \= atom\<Usuari | null\>(null);const temaAtom \= atom\<'clar' | 'fosc'\>('clar');const itemsCarretAtom \= atom\<Item\[\]\>(\[\]);// Àtoms derivats (computed):const totalCarretAtom \= atom(  get \=\> get(itemsCarretAtom).reduce((sum, item) \=\> sum \+ item.preu, 0));// ÚS: cada component subscriu únicament als àtoms que necessitafunction BotoTema() {  const \[tema, setTema\] \= useAtom(temaAtom);  // → Únicament re-renderitza quan 'temaAtom' canvia  return \<button onClick={() \=\> setTema(t \=\> t \=== 'clar' ? 'fosc' : 'clar')}\>    {tema}  \</button\>;}function TotalCarret() {  const total \= useAtomValue(totalCarretAtom); // ← únicament lectura  return \<span\>{total}€\</span\>;}function AfegirAlCarret({ item }: { item: Item }) {  const setItems \= useSetAtom(itemsCarretAtom); // ← únicament escriptura  return \<button onClick={() \=\> setItems(prev \=\> \[...prev, item\])}\>    Afegir  \</button\>;}// → Granularitat màxima: cada component subscriu exactament el que necessita// → Zero re-renders innecessaris |
| :---- |

**Redux Toolkit: quan la complexitat ho justifica**

Redux segueix sent la millor opció per a aplicacions enterprise amb necessitats avançades.

| // Redux Toolkit brilla quan:// → Necessites time-travel debugging (reproduir bugs exactament)// → Operacions asíncrones complexes (createAsyncThunk)// → Middleware (logging, analytics, persistència)// → Equip gran amb arquitectura clara i convencions estrictesimport { createSlice, createAsyncThunk } from '@reduxjs/toolkit';// Async thunk: gestió automàtica de loading/success/errorconst fetchProductes \= createAsyncThunk('productes/fetch', async (filtres: Filtres) \=\> {  const resposta \= await fetch(\`/api/productes?${new URLSearchParams(filtres)}\`);  return resposta.json();});const productesSlice \= createSlice({  name: 'productes',  initialState: { items: \[\], loading: false, error: null },  reducers: { /\* accions síncrones \*/ },  extraReducers: builder \=\> {    builder      .addCase(fetchProductes.pending, state \=\> { state.loading \= true; })      .addCase(fetchProductes.fulfilled, (state, action) \=\> {        state.items \= action.payload;        state.loading \= false;      })      .addCase(fetchProductes.rejected, (state, action) \=\> {        state.error \= action.error.message;        state.loading \= false;      });  },}); |
| :---- |

| Criteri | Context | Zustand | Jotai | Redux Toolkit |
| ----- | ----- | ----- | ----- | ----- |
| **Bundle size** | ✅ 0 KB | ✅ \~3 KB | ✅ \~3 KB | ❌ \~45 KB |
| **Setup** | ✅ Mínim | ✅ Mínim | ✅ Mínim | ❌ Verbose |
| **Re-renders** | ❌ Tots consumers | ✅ Selectors | ✅ Atòmic | ✅ Selectors |
| **Async** | ❌ Manual | ✅ Inclòs | ✅ Inclòs | ✅ createAsyncThunk |
| **DevTools** | ❌ Limitat | ✅ Middleware | ✅ DevTools | ✅ Molt complet |
| **Time-travel debug** | ❌ | ❌ | ❌ | ✅ |
| **Sense Provider** | ❌ Cal Provider | ✅ | ✅ | ❌ Cal Provider |
| **Ideal per a** | Tema, Auth, i18n | MVPs, apps mitjanes | Apps granulars | Enterprise, equips grans |

**Quan migrar de context a una llibreria**

SENYAL 1: Re-renders excessius  
  → Fas servir useMemo, React.memo arreu per al context  
  → El profiler mostra \> 50 components re-renderitzant per un canvi puntual  
  → Migrar a Zustand: selectors quirúrgics gratuïts

SENYAL 2: Lògica asíncrona complexa en el Provider  
  → El Provider té useEffect \+ useState(loading) \+ useState(error) per tot  
  → Migrar a Redux Toolkit (createAsyncThunk) o TanStack Query

SENYAL 3: Debugging difícil  
  → "Qui va canviar aquest estat i quan?"  
  → Impossible reproduir bugs d'estat  
  → Migrar a Redux Toolkit (DevTools, time-travel, historial d'accions)

SENYAL 4: Múltiples contexts amb dependències creuades  
  → Context A depèn del Context B que depèn del Context C  
  → Migrar a Zustand o Redux (store únic, relacions explícites)

**El patró híbrid recomanat 2026**

| // La solució per a la majoria d'aplicacions reals:function App() {  return (    // Context: dades estables i globals (tema, auth, i18n)    \<TemaProvider\>      \<AuthProvider\>        \<I18nProvider\>          {/\* Zustand: estat dinàmic (carret, preferències UI) \*/}          {/\* (sense Provider\! l'store és global) \*/}          {/\* TanStack Query: estat del servidor (productes, usuaris, etc.) \*/}          \<QueryClientProvider client={queryClient}\>            \<Router\>              \<App /\>            \</Router\>          \</QueryClientProvider\>        \</I18nProvider\>      \</AuthProvider\>    \</TemaProvider\>  );}// Context API:   Tema, Auth, i18n (estable, global, 0 KB)// Zustand:       Carret, UI state (dinàmic, sense Provider)// TanStack Query: Dades del servidor (caché, refetch, mutations)// useState:      Estat local del component// Redux Toolkit: Únicament si l'equip ja el coneix i el projecte ho justifica |
| :---- |

**Com decidir?** 

Comença sempre amb la solució més senzilla:

  1\. useState → per a estat local del component  
  2\. useState \+ Props/Lifting State → si 2 components el necessiten  
  3\. Custom Hook → si la lògica es repeteix en múltiples components  
  4\. Context API → si molts components distants necessiten les mateixes dades  
                   i canvien rarament (tema, auth, i18n)  
  5\. Zustand → si Context causa re-renders o necessites lògica asíncrona  
  6\. Redux Toolkit → si el projecte és enterprise amb equip gran  
                     i necessites time-travel debugging i convencions estrictes

  No saltis al pas 6 si el pas 3 és suficient.

