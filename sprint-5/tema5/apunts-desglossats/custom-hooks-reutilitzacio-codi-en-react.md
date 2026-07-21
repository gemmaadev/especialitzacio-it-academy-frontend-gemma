**Com els Custom Hooks milloren la reutilització de codi en React?**

**Documentació Oficial de React: Custom Hooks**  
[https://react.dev/learn/reusing-logic-with-custom-hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)  
Guia oficial sobre com reutilitzar lògica creant hooks personalitzats.

## **Custom hooks com a "APIs de comportament"**

Els Custom Hooks no son components — son funcions JavaScript que encapsulen lògica de React (useState, useEffect, altres hooks) i l'exposen amb una API neta. El component consumidor expressa **quèvol** sense saber **com funciona**.

| // Sense Custom Hook: el component sap com funciona totfunction Producte({ id }: { id: string }) {  const \[producte, setProducte\] \= useState\<Producte | null\>(null);  const \[loading, setLoading\] \= useState(true);  const \[error, setError\] \= useState\<Error | null\>(null);  useEffect(() \=\> {    let ignore \= false;    fetch(\`/api/productes/${id}\`)      .then(r \=\> { if (\!r.ok) throw new Error('Error'); return r.json(); })      .then(d \=\> { if (\!ignore) { setProducte(d); setLoading(false); } })      .catch(e \=\> { if (\!ignore) { setError(e); setLoading(false); } });    return () \=\> { ignore \= true; };  }, \[id\]);  if (loading) return \<Spinner /\>;  if (error) return \<Error missatge={error.message} /\>;  return \<h1\>{producte?.nom}\</h1\>;}// Amb Custom Hook: el component expressa la intenciófunction Producte({ id }: { id: string }) {  const { dades: producte, loading, error } \= useFetch\<Producte\>(\`/api/productes/${id}\`);  if (loading) return \<Spinner /\>;  if (error) return \<Error missatge={error.message} /\>;  return \<h1\>{producte?.nom}\</h1\>;}// → El component no sap res de fetch, ignore flags, ni cleanup |
| :---- |

**Categoria 1: Hooks de gestió de dades**

### **`useFetch`: data fetching amb estat complet**

| // src/hooks/useFetch.tsinterface FetchEstat\<T\> {  dades: T | null;  loading: boolean;  error: Error | null;}function useFetch\<T\>(url: string): FetchEstat\<T\> {  const \[estat, setEstat\] \= useState\<FetchEstat\<T\>\>({    dades: null,    loading: true,    error: null,  });  useEffect(() \=\> {    let ignore \= false;    setEstat({ dades: null, loading: true, error: null });    fetch(url)      .then(r \=\> { if (\!r.ok) throw new Error(\`HTTP ${r.status}\`); return r.json(); })      .then(dades \=\> { if (\!ignore) setEstat({ dades, loading: false, error: null }); })      .catch(error \=\> { if (\!ignore) setEstat({ dades: null, loading: false, error }); });    return () \=\> { ignore \= true; };  }, \[url\]);  return estat;}// Ús:const { dades, loading, error } \= useFetch\<Usuari\[\]\>('/api/usuaris');const { dades: producte } \= useFetch\<Producte\>(\`/api/productes/${id}\`); |
| :---- |

### **`useLocalStorage`: sincronització persistent**

`useLocalStorage` emmagatzema, recupera, i sincronitza dades des de l'API localStorage del browser.

| function useLocalStorage\<T\>(clau: string, valorInicial: T) {  const \[valor, setValor\] \= useState\<T\>(() \=\> {    try {      const item \= localStorage.getItem(clau);      return item ? JSON.parse(item) : valorInicial;    } catch {      return valorInicial;    }  });  const setValorPersistent \= (nouValor: T | ((prev: T) \=\> T)) \=\> {    const valorADesar \= nouValor instanceof Function ? nouValor(valor) : nouValor;    setValor(valorADesar);    localStorage.setItem(clau, JSON.stringify(valorADesar));  };  return \[valor, setValorPersistent\] as const;}// Ús: exactament com useState però persistent\!const \[tema, setTema\] \= useLocalStorage('tema', 'clar');const \[carret, setCarret\] \= useLocalStorage\<Item\[\]\>('carret', \[\]); |
| :---- |

### **`usePrevious`: valor anterior d'una variable**

`usePrevious` rastreja el valor anterior d'una variable.

| function usePrevious\<T\>(valor: T): T | undefined {  const ref \= useRef\<T | undefined\>(undefined);  useEffect(() \=\> {    ref.current \= valor; // ← s'actualitza DESPRÉS del render  });  return ref.current; // ← retorna el valor del render ANTERIOR}// Ús: detectar canvis, animacions, compararfunction AnimacioComptador({ count }: { count: number }) {  const countAnterior \= usePrevious(count);  const puja \= count \> (countAnterior ?? 0);  return (    \<span className={puja ? 'puja' : 'baixa'}\>      {count}    \</span\>  );} |
| :---- |

**Categoria 2: Hooks per a formularis**

### **`useFormInput`: input controlat reutilitzable**

| // Encapsula el patró value \+ onChangefunction useFormInput(valorInicial: string \= '') {  const \[valor, setValor\] \= useState(valorInicial);  const \[tocat, setTocat\] \= useState(false);  const props \= {    value: valor,    onChange: (e: React.ChangeEvent\<HTMLInputElement | HTMLTextAreaElement\>) \=\>      setValor(e.target.value),    onBlur: () \=\> setTocat(true),  };  const reset \= () \=\> { setValor(valorInicial); setTocat(false); };  return { valor, tocat, props, reset };}// Ús: sense repetir el patró value/onChange per cada campfunction FormulariRegistre() {  const nom \= useFormInput('');  const email \= useFormInput('');  const password \= useFormInput('');  const handleSubmit \= (e: React.FormEvent) \=\> {    e.preventDefault();    registrar({ nom: nom.valor, email: email.valor, password: password.valor });    nom.reset(); email.reset(); password.reset();  };  return (    \<form onSubmit={handleSubmit}\>      \<input {...nom.props} placeholder="Nom" /\>      \<input {...email.props} type\="email" placeholder="Email" /\>      \<input {...password.props} type\="password" placeholder="Contrasenya" /\>      \<button type\="submit"\>Registrar\</button\>    \</form\>  );} |
| :---- |

### **`useDebounce`: retardar actualitzacions**

`useDebounce` retarda l'execució d'una funció o actualització d'estat.

| function useDebounce\<T\>(valor: T, retard: number \= 300): T {  const \[valorRetardat, setValorRetardat\] \= useState(valor);  useEffect(() \=\> {    const timer \= setTimeout(() \=\> setValorRetardat(valor), retard);    return () \=\> clearTimeout(timer);    // ← cleanup: cancel·la el timer si el valor canvia abans del retard  }, \[valor, retard\]);  return valorRetardat;}// Ús: cercador que no fa fetch en cada teclafunction CercadorProductes() {  const \[cerca, setCerca\] \= useState('');  const cercaRetardada \= useDebounce(cerca, 400);  // → cerca s'actualitza en cada tecla (per a la UI)  // → cercaRetardada s'actualitza únicament 400ms DESPRÉS de l'última tecla (per al fetch)  const { dades } \= useFetch\<Producte\[\]\>(    \`/api/productes?q=${cercaRetardada}\`,  );  return (    \<\>      \<input value={cerca} onChange={e \=\> setCerca(e.target.value)} /\>      \<LlistaProductes productes={dades ?? \[\]} /\>    \</\>  );} |
| :---- |

**Categoria 3: Hooks per a APIs del navegador**

### **`useWindowSize`: dimensions de la finestra**

`useWindowSize` rastreia les dimensions de la finestra del browser.

| function useWindowSize() {  const \[mida, setMida\] \= useState({    amplada: window.innerWidth,    alçada: window.innerHeight,  });  useEffect(() \=\> {    const handleResize \= () \=\>      setMida({ amplada: window.innerWidth, alçada: window.innerHeight });    window.addEventListener('resize', handleResize);    return () \=\> window.removeEventListener('resize', handleResize);  }, \[\]);  return mida;}// Ús: layouts responsius basats en JS (quan CSS no és suficient)function Layout() {  const { amplada } \= useWindowSize();  return amplada \> 768 ? \<DesktopLayout /\> : \<MobileLayout /\>;} |
| :---- |

### **`useMediaQuery`: subscripció a media queries**

`useMediaQuery` subscriu i respon a canvis en les media queries.

| function useMediaQuery(query: string): boolean {  const \[coincideix, setCoincideix\] \= useState(    () \=\> window.matchMedia(query).matches  );  useEffect(() \=\> {    const media \= window.matchMedia(query);    const handleChange \= (e: MediaQueryListEvent) \=\> setCoincideix(e.matches);    media.addEventListener('change', handleChange);    return () \=\> media.removeEventListener('change', handleChange);  }, \[query\]);  return coincideix;}// Ús: exactament com CSS media queries però en JSfunction Component() {  const esMobil \= useMediaQuery('(max-width: 768px)');  const prefereixFosc \= useMediaQuery('(prefers-color-scheme: dark)');  const teHover \= useMediaQuery('(hover: hover)');  return \<div\>{esMobil ? 'Mòbil' : 'Desktop'}\</div\>;} |
| :---- |

### **`useIntersectionObserver`: visibilitat al viewport**

`useIntersectionObserver` rastreia i gestiona la visibilitat d'elements DOM dins del viewport.

| function useIntersectionObserver(  ref: React.RefObject\<Element\>,  opcions: IntersectionObserverInit \= {}): boolean {  const \[esVisible, setEsVisible\] \= useState(false);  useEffect(() \=\> {    if (\!ref.current) return;    const observer \= new IntersectionObserver(      (\[entry\]) \=\> setEsVisible(entry.isIntersecting),      opcions    );    observer.observe(ref.current);    return () \=\> observer.disconnect();  }, \[ref, opcions.threshold, opcions.root, opcions.rootMargin\]);  return esVisible;}// Ús: lazy loading d'imatges, animacions on-scrollfunction ImatgePerçosa({ src, alt }: { src: string; alt: string }) {  const ref \= useRef\<HTMLDivElement\>(null);  const esVisible \= useIntersectionObserver(ref, { threshold: 0.1 });  return (    \<div ref={ref}\>      {esVisible ? (        \<img src={src} alt={alt} /\>    // ← carrega únicament quan és visible      ) : (        \<div className="placeholder" /\>      )}    \</div\>  );} |
| :---- |

### **`useToggle` i `useClickAway`**

| // useToggle: boolean amb API netafunction useToggle(valorInicial: boolean \= false) {  const \[valor, setValor\] \= useState(valorInicial);  const toggle \= useCallback(() \=\> setValor(v \=\> \!v), \[\]);  const activar \= useCallback(() \=\> setValor(true), \[\]);  const desactivar \= useCallback(() \=\> setValor(false), \[\]);  return { valor, toggle, activar, desactivar };}// Ús:const { valor: obert, toggle, desactivar } \= useToggle(false);\<button onClick={toggle}\>Menú\</button\>{obert && \<Dropdown onClose={desactivar} /\>} |
| :---- |

`useClickAway` detecta clics fora d'un element i dispara un callback.

| function useClickAway\<T extends HTMLElement\>(callback: () \=\> void) {  const ref \= useRef\<T\>(null);  useEffect(() \=\> {    const handleClick \= (e: MouseEvent) \=\> {      if (ref.current && \!ref.current.contains(e.target as Node)) {        callback();      }    };    document.addEventListener('mousedown', handleClick);    return () \=\> document.removeEventListener('mousedown', handleClick);  }, \[callback\]);  return ref;}// Ús: tancar modals i dropdowns en clicar forafunction Dropdown() {  const \[obert, setObert\] \= useState(true);  const ref \= useClickAway\<HTMLDivElement\>(() \=\> setObert(false));  return obert ? \<div ref={ref}\>Contingut del dropdown\</div\> : null;} |
| :---- |

**La biblioteca `usehooks.com`: el catàleg de referència**

La col·lecció de hooks moderns i server-safe de l'equip d'ui.dev, instal·lable via `npm i @uidotdev/usehooks`.

| GESTIÓ DE DADES:        useFetch, useLocalStorage, useSessionStorage,                        usePrevious, useHistoryStateFORMULARIS / UX:        useDebounce, useThrottle, useCopyToClipboard,                        useToggle, useCounterBROWSER APIs:           useWindowSize, useWindowScroll, useMediaQuery,                        useNetworkState, useGeolocation, useBattery,                        useOrientation, usePreferredLanguageDOM:                    useIntersectionObserver, useClickAway, useMeasure,                        useHover, useMouse, useLockBodyScrollUTILITATS:              useInterval, useTimeout, useEventListener,                        useScript, useDocumentTitle, useLogger |
| :---- |

**En resum, per què els Custom Hooks milloren la reutilització?**

1\. ELIMINEN DUPLICACIÓ:  
   La mateixa lògica definida UNA vegada, usada en qualsevol lloc

2\. FAN EL CODI DECLARATIU:  
   useFetch('/api/productes') vs. useEffect \+ useState x3

3\. ENCAPSULEN COMPLEXITAT:  
   ignore flags, cleanup, AbortController → ocults dins el hook

4\. COMPOSABLES:  
   useDebounce(cercaRetardada) \+ useFetch(url) → dos hooks compostos

5\. TESTEJABLES PER SEPARAT:  
   renderHook(() \=\> useFetch('/api')) → sense component

6\. API CLARA:  
   { dades, loading, error } → contracte explícit i tipat

