## **Tema 5 — Custom Hooks en React**

**1\. Què és un Custom Hook i Per Quèexisteix**

Un Custom Hook és una funció JavaScript que comença per `use` i encapsula lògica de React (useState, useEffect, altres hooks). No és un component — no retorna JSX. El component consumidor expressa **quèvol** sense saber **com funciona**.

La diferència fonamental:  
  Sense Custom Hook → el component sap COM funciona tot (fetch, cleanup, race conditions)  
  Amb Custom Hook   → el component declara QUÈ vol (dades d'usuaris, estat online)

**Les dues regles dels Hooks** (s'apliquen als Custom Hooks):

* Únicament cridar Hooks al nivell superior (mai en loops, condicions, o funcions aniuades)  
* Únicament cridar Hooks des de funcions React o altres Custom Hooks

**2\. Avantatges respecte a HOC i render props**

| Problema | HOC | Render Props | Custom Hook |
| ----- | ----- | ----- | ----- |
| **Wrapper Hell** | ❌ Crea N wrappers | ✅ No | ✅ No |
| **Colisió de Props** | ❌ Possible | ✅ Impossible | ✅ Impossible |
| **Origen de dades** | ❌ Opac | ✅ Explícit | ✅ Explícit |
| **Aniuament** | ❌ Profund | ❌ Callback hell | ✅ Lineal |
| **TypeScript** | ❌ Generics complexos | ✅ Acceptable | ✅ Excel·lent |
| **JSX** | ❌ N components extra | ❌ N components extra | ✅ Zero extra |

HOC segueix tenint sentit per a:  
  → Error Boundaries (no existeix hook equivalent)  
  → React.memo (el HOC més usat de React)  
  → forwardRef

Per a TOT EL RESTA → Custom Hook és la millor opció

**3\. Separació de preocupacions**

Els Custom Hooks son la frontera entre el component (QUÈ) i la lògica (COM). Un component ben dissenyat no hauria de tenir més de 2-3 useState i cap useEffect visible — tot ha d'estar al hook.

| // ❌ Component que barreja tot:function PàginaProductes() {  const \[productes, setProductes\] \= useState(\[\]);  const \[loading, setLoading\] \= useState(true);  const \[cerca, setCerca\] \= useState('');  useEffect(() \=\> { fetch('/api/productes').then(/\* ... \*/); }, \[cerca\]);  // \+ 40 línies de JSX}// ✅ Amb hooks separats per preocupació:function PàginaProductes() {  const { textCerca, setTextCerca } \= useCerca();     // preocupació: cerca  const { productes, loading } \= useProductes(textCerca); // preocupació: dades  const { afegir } \= useCarret();                     // preocupació: carret  return (/\* únicament JSX \*/);} |
| :---- |

**Les tres capes en un hook complex:**

Servei (pur, sense React): fetchProductes(), eliminarProducte()  
  ↓  
Hook de sincronització: useProductesAPI() → gestiona fetch \+ loading \+ error  
  ↓  
Hook de domini: useProductes() → lògica de negoci, dades derivades, accions  
  ↓  
Component: únicament JSX

**4\. Col·lecció de Custom Hooks essencials**

### **Gestió de dades**

| // useFetch: data fetching amb race condition preventionfunction useFetch\<T\>(url: string | null) {  const \[estat, setEstat\] \= useState({ dades: null, loading: true, error: null });  useEffect(() \=\> {    if (\!url) return;    let ignore \= false;    setEstat({ dades: null, loading: true, error: null });    fetch(url)      .then(r \=\> { if (\!r.ok) throw new Error(\`HTTP ${r.status}\`); return r.json(); })      .then(dades \=\> { if (\!ignore) setEstat({ dades, loading: false, error: null }); })      .catch(error \=\> { if (\!ignore) setEstat({ dades: null, loading: false, error }); });    return () \=\> { ignore \= true; };  }, \[url\]);  return estat;}// useLocalStorage: sincronització persistentfunction useLocalStorage\<T\>(clau: string, inicial: T) {  const \[valor, setValor\] \= useState\<T\>(() \=\> {    try { return JSON.parse(localStorage.getItem(clau) ?? 'null') ?? inicial; }    catch { return inicial; }  });  const set \= useCallback((v: T) \=\> {    setValor(v); localStorage.setItem(clau, JSON.stringify(v));  }, \[clau\]);  return \[valor, set\] as const;}// usePrevious: valor del render anteriorfunction usePrevious\<T\>(valor: T) {  const ref \= useRef\<T | undefined\>(undefined);  useEffect(() \=\> { ref.current \= valor; });  return ref.current;} |
| :---- |

### **Formularis i UX**

| // useDebounce: retardar actualitzacions (cercadors)function useDebounce\<T\>(valor: T, retard \= 300): T {  const \[v, setV\] \= useState(valor);  useEffect(() \=\> {    const t \= setTimeout(() \=\> setV(valor), retard);    return () \=\> clearTimeout(t);  }, \[valor, retard\]);  return v;}// useToggle: boolean amb API netafunction useToggle(inicial \= false) {  const \[valor, setValor\] \= useState(inicial);  return {    valor,    toggle: useCallback(() \=\> setValor(v \=\> \!v), \[\]),    activar: useCallback(() \=\> setValor(true), \[\]),    desactivar: useCallback(() \=\> setValor(false), \[\]),  };}// useCopyToClipboardfunction useCopyToClipboard() {  const \[copiat, setCopiat\] \= useState(false);  const copy \= useCallback(async (text: string) \=\> {    await navigator.clipboard.writeText(text);    setCopiat(true);    setTimeout(() \=\> setCopiat(false), 2000);  }, \[\]);  return { copy, copiat };} |
| :---- |

### **APIs del Navegador**

| // useWindowSize, useMediaQuery, useIntersectionObserver// useOnlineStatus, useClickAway, useIdle// → Veure apunts de reutilització per a implementacions completes |
| :---- |

**5\. Millors pràctiques de disseny**

NOMENCLATURA:  
  ✅ use \+ nom descriptiu del domini: useCercaProductes, useLoginForm  
  ✅ Booleans: is/has/can prefix → isLoading, hasError, canSubmit  
  ✅ Arrays: plural → items, errors, resultats

RESPONSABILITAT ÚNICA:  
  ✅ Un hook, una preocupació  
  ✅ Si és massa gran → dividir en hooks més petits i composar

API DE RETORN:  
  ✅ 2 valors → array (com useState): \[valor, setValor\]  
  ✅ 3+ valors → objecte: { dades, loading, error, refetch }  
  ❌ Mai arrays amb \> 2 elements

QUALITAT:  
  ✅ useCallback per a funcions retornades (referències estables)  
  ✅ useMemo per a valors computats costosos  
  ✅ Injectar dependències com a paràmetres (no hardcoding)  
  ✅ Cleanup de tots els efectes  
  ❌ Mai retornar JSX (seria un component, no un hook)  
  ❌ Mai usar hooks en condicions o loops

**6\. Composició: construir complexitat a partir de peces simples**

La composició de hooks permet crear lògica complexa combinant hooks simples. Cada hook afegeix una capa de processament.

| // PIPELINE: cada hook transforma el resultat del anterioruseFetch('/api/productes')                    // obtenir dades brutes  → useProductesNormalitzats()               // transformar estructura API  → useProductesFiltrats(filtres)            // aplicar filtres  → useProductesPaginats(filtres, perPàgina) // paginar resultats// COMPOSICIÓ HORITZONTAL: combinar hooks independentsfunction useCercaProductes() {  const \[cerca, setCerca\] \= useState('');  const \[categoria, setCategoria\] \= useLocalStorage('cat', 'tots'); // hook 1  const cercaRetardada \= useDebounce(cerca, 400);                    // hook 2  const url \= \`/api/productes?q=${cercaRetardada}\&cat=${categoria}\`;  const { dades: resultats, loading, error } \= useFetch(url);        // hook 3  const netejar \= useCallback(() \=\> { setCerca(''); setCategoria('tots'); }, \[\]);  return { cerca, setCerca, categoria, setCategoria, resultats, loading, error, netejar };} |
| :---- |

**7\. Testing de Custom Hooks**

| // renderHook: la eina principalimport { renderHook, act, waitFor } from '@testing-library/react';// Test síncron:test('useCounter incrementa correctament', () \=\> {  const { result } \= renderHook(() \=\> useCounter(0, { max: 10 }));  act(() \=\> { result.current.increment(); });  expect(result.current.count).toBe(1);});// Test asíncron:test('useFetch carrega les dades', async () \=\> {  vi.mocked(fetch).mockResolvedValue({ ok: true, json: async () \=\> \[{ id: 1 }\] } as Response);  const { result } \= renderHook(() \=\> useFetch('/api/test'));  await waitFor(() \=\> expect(result.current.loading).toBe(false));  expect(result.current.dades).toHaveLength(1);});// Test amb canvi de props:test('re-fetch quan canvia la URL', async () \=\> {  const { result, rerender } \= renderHook(    ({ url }) \=\> useFetch(url),    { initialProps: { url: '/api/v1' } }  );  await waitFor(() \=\> expect(result.current.loading).toBe(false));  rerender({ url: '/api/v2' });  await waitFor(() \=\> expect(result.current.loading).toBe(false));  expect(fetch).toHaveBeenCalledTimes(2);});// Test amb Context (wrapper):test('useAuth retorna l\\'usuari', () \=\> {  const wrapper \= ({ children }) \=\> \<AuthProvider\>{children}\</AuthProvider\>;  const { result } \= renderHook(() \=\> useAuth(), { wrapper });  expect(result.current.usuari).toBeDefined();});// Test Fail Fast:test('useAuth fora del Provider llança error', () \=\> {  expect(() \=\> renderHook(() \=\> useAuth())).toThrow('useAuth ha d\\'usar-se dins d\\'un \<AuthProvider\>');}); |
| :---- |

PER QUÈ Custom Hooks:

  → Elimina duplicació de lògica entre components  
  → Fa el component declaratiu (QUÈ, no COM)  
  → Testejable independentment del component  
  → Reutilitzable en qualsevol component

SUPERIORITAT SOBRE HOC I RENDER PROPS:  
  → Zero wrapper components (arbre pla)  
  → Zero colisió de props  
  → TypeScript natural i clar  
  → Composable sense callback hell

SEPARACIÓ DE PREOCUPACIONS:  
  Servei → lògica pura (fetch, transformació)  
  Hook → lògica stateful (useState, useEffect, derivació)  
  Component → únicament JSX

PATRONS DE COMPOSICIÓ:  
  Base → Domini → Feature → Component  
  Pipeline: cada hook transforma el del anterior  
  Horitzontal: combinar hooks independents

MILLORS PRÀCTIQUES:  
  use \+ nom descriptiu | SRP | Array vs Objecte  
  useCallback per funcions | useMemo per càlculs  
  Injecció de dependències | Cleanup obligatori  
  JSDoc \+ TypeScript complet

TESTING:  
  renderHook() → muntar el hook sense component  
  act() → embolcallar actualitzacions d'estat  
  waitFor() → esperar resolucions asíncrones  
  rerender() → canviar props del hook  
  wrapper → proporcionar Context als hooks que el necessiten

