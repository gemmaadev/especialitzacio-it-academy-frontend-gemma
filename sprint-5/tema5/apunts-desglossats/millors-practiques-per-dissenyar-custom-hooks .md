**Quines són les millors pràctiques per dissenyar Custom Hooks efectius?**

**Pràctica 1: Nomenclatura clara i convencions**

El prefix `use` és una convenció àmpliament adoptada a la comunitat React. No és arbitrari: és incrustada en el disseny de React i té implicacions pràctiques. 

Distingeix els custom hooks de les funcions regulars de JavaScript. Aquesta distinció és crucial perquè els hooks tenen regles específiques que les funcions regulars no tenen.

| // ✅ Nomenclatura que comunica la intenció:useWindowSize()          // llegeix mida de la finestra (lectura)useOnlineStatus()        // llegeix estat de connexió (lectura)useLocalStorage(key, val) // sincronitza amb localStorage (sincronització)useContacteSubmit()      // gestiona l'enviament d'un formulari (acció)useProductes(filtres)    // obté i gestiona productes (domini)// Convencions de noms per als valors retornats:// Boooleans: prefix is, has, canconst { isLoading, hasError, canSubmit } \= useForm();// Arrays: pluralconst { items, errors } \= useFormFields();// Callbacks/Handlers: prefix handle o nom de verbconst { handleSubmit, handleReset, actualitzar, eliminar } \= useProductes();// ❌ Noms que no comuniquen res:useData()    // ← quines dades?useHelper()  // ← quin helper?useStuff()   // ← evident antipatró |
| :---- |

**Pràctica 2: Una sola responsabilitat**

Agrupa la lògica relacionada per mantenir el teu custom hook enfocat en una sola responsabilitat. Evita fer els teus hooks massa complexos.

| // ❌ MAL: hook que fa massa cosesfunction useProductesPàgina() {  // Responsabilitat 1: fetch de productes  const \[productes, setProductes\] \= useState(\[\]);  // Responsabilitat 2: paginació  const \[pàgina, setPàgina\] \= useState(1);  // Responsabilitat 3: filtres  const \[filtres, setFiltres\] \= useState({});  // Responsabilitat 4: carret de compra  const \[carret, setCarret\] \= useState(\[\]);  // Responsabilitat 5: preferències d'usuari  const \[preferencies, setPreferencies\] \= useState({});  // → Impossible reutilitzar únicament la paginació en un altre lloc  // → Impossible testar únicament els filtres}// ✅ BÉ: responsabilitats separades, composablesfunction useProductes(filtres: Filtres) { /\* fetch \*/ }function usePaginació(totalItems: number, perPàgina \= 10\) { /\* paginació \*/ }function useFiltres(inicial: Filtres) { /\* gestió de filtres \*/ }function useCarret() { /\* carret de compra \*/ }// Composar quan cal:function PàginaProductes() {  const { filtres, setFiltre } \= useFiltres({ categoria: 'tots' });  const { productes, loading } \= useProductes(filtres);  const { pàgina, anarAPàgina, productesPàgina } \= usePaginació(productes);  const { afegir } \= useCarret();  // → Cada hook és independent i testejable per separat} |
| :---- |

**Pràctica 3: API de retorn clara — Array vs. Objecte**

La decisió sobre el format de retorn impacta directament la usabilitat del hook.

| // ARRAY → quan el hook retorna exactament 2 valors (com useState)// Avantatge: l'usuari pot nomenar els valors com vulguifunction useToggle(inicial \= false): \[boolean, () \=\> void\] {  const \[valor, setValor\] \= useState(inicial);  return \[valor, () \=\> setValor(v \=\> \!v)\];}// Ús: noms personalitzatsconst \[modalObert, toggleModal\] \= useToggle(false);const \[menúObert, toggleMenú\] \= useToggle(false);// OBJECTE → quan el hook retorna 3+ valors o valors opcionals// Avantatge: desestructurar únicament el que es necessita, noms explícitsfunction useFetch\<T\>(url: string) {  return { dades, loading, error, refetch };}// Ús: desestructurar únicament el necessariconst { dades: productes, loading } \= useFetch\<Producte\[\]\>('/api/productes');const { error } \= useFetch('/api/health');  // ← únicament error// REGLA PRÀCTICA:// → 2 valors de la mateixa "família" → array (com useState)// → 3+ valors o valors opcionals → objecte// → Mai arrays amb més de 2 elements (impossible recordar l'ordre) |
| :---- |

**Pràctica 4: Injecció de dependències — no hardcoding**

Dissenya els teus custom hooks perquè siguin flexibles i acceptin les dependències necessàries com a arguments. 

Això permet als components que usen el hook proporcionar les seves dependències específiques, promovent la reutilització. Evita hardcoding de dependències dins dels teus custom hooks.

| // ❌ MAL: dependència hardcodejadafunction useProductes() {  useEffect(() \=\> {    fetch('/api/productes')  // ← URL fixada al hook      .then(r \=\> r.json())      .then(setProductes);  }, \[\]);}// ❌ MAL: servei concret importat directamentimport { producteService } from '../services/productes';function useProductes() {  useEffect(() \=\> {    producteService.getAll().then(setProductes); // ← acoblat al servei  }, \[\]);}// ✅ BÉ: URL com a paràmetre (injecció simple)function useFetch\<T\>(url: string) {  useEffect(() \=\> {    fetch(url).then(r \=\> r.json()).then(setDades);  }, \[url\]);}// ✅ BÉ: funció fetcher injectada (màxima flexibilitat)function useProductes(fetcher \= () \=\> fetch('/api/productes').then(r \=\> r.json())) {  useEffect(() \=\> {    fetcher().then(setProductes);  }, \[\]);}// Ús en producció:const { productes } \= useProductes();// Ús en tests: injectar un mock sense modificar el hookconst { productes } \= useProductes(() \=\> Promise.resolve(productesMock)); |
| :---- |

**Pràctica 5: Valors de retorn estables (memoïtzació)**

| // ❌ MAL: funcions noves en cada render → trenca React.memo dels fillsfunction useCarret() {  const \[items, setItems\] \= useState\<Item\[\]\>(\[\]);  // Noves funcions en cada render\!  const afegir \= (item: Item) \=\> setItems(prev \=\> \[...prev, item\]);  const eliminar \= (id: string) \=\> setItems(prev \=\> prev.filter(i \=\> i.id \!== id));  return { items, afegir, eliminar };}// ✅ BÉ: useCallback per a referències establesfunction useCarret() {  const \[items, setItems\] \= useState\<Item\[\]\>(\[\]);  const afegir \= useCallback((item: Item) \=\> {    setItems(prev \=\> \[...prev, item\]);  }, \[\]); // ← \[\] perquè usa funció updater (no captura 'items')  const eliminar \= useCallback((id: string) \=\> {    setItems(prev \=\> prev.filter(i \=\> i.id \!== id));  }, \[\]);  const total \= useMemo(    () \=\> items.reduce((s, i) \=\> s \+ i.preu, 0),    \[items\]  );  return { items, total, afegir, eliminar };}// → afegir i eliminar son la mateixa referència entre renders// → React.memo dels fills funciona correctament |
| :---- |

**Pràctica 6: Sempre retornar valors útils (no void)**

| // ❌ MAL: hook que no retorna res → poc reutilitzablefunction useDocumentTitle(títol: string) {  useEffect(() \=\> {    document.title \= títol;    return () \=\> { document.title \= 'App'; };  }, \[títol\]);  // → Qui usa aquest hook no pot fer res amb ell}// ✅ BÉ: retornar estat i controls útilsfunction useDocumentTitle(títolInicial: string) {  const \[títol, setTítol\] \= useState(títolInicial);  useEffect(() \=\> {    const títolAntic \= document.title;    document.title \= títol;    return () \=\> { document.title \= títolAntic; };  }, \[títol\]);  return { títol, setTítol }; // ← el consumer pot llegir i canviar el títol}// ✅ BÉ: retornar funció de cleanup/reset si és útilfunction useEventListener\<T extends Event\>(  event: string,  handler: (e: T) \=\> void,  element: HTMLElement | Window \= window) {  useEffect(() \=\> {    element.addEventListener(event, handler as EventListener);    return () \=\> element.removeEventListener(event, handler as EventListener);  }, \[event, handler, element\]);  // Retornar una funció per forçar el re-attach si cal  const reattach \= useCallback(() \=\> {    element.removeEventListener(event, handler as EventListener);    element.addEventListener(event, handler as EventListener);  }, \[event, handler, element\]);  return { reattach };} |
| :---- |

**Pràctica 7: No retornar JSX**

Els custom hooks no haurien de contenir lògica de renderitzat. Han de contenir únicament lògica. No han de retornar JSX ni gestionar el renderitzat directament.

| // ❌ MAL: hook que retorna JSX (és un component, no un hook)function useSpinner(loading: boolean) {  if (loading) return \<div className="spinner" /\>; // ← JSX en un hook\!  return null;}// ✅ BÉ: hook que retorna dades, component que renderitzafunction useLoading() {  const \[loading, setLoading\] \= useState(false);  const \[error, setError\] \= useState\<Error | null\>(null);  return { loading, error, setLoading, setError };}// El component decideix com mostrar l'estat de càrregafunction MyComponent() {  const { loading, error } \= useLoading();  if (loading) return \<Spinner /\>;     // ← JSX al component ✅  if (error) return \<Error /\>;         // ← JSX al component ✅  return \<Contingut /\>;} |
| :---- |

**Pràctica 8: Documentar amb JSDoc i TypeScript**

| /\*\* \* Hook per gestionar l'estat de connexió a internet. \* Se subscriu als events 'online' i 'offline' del browser. \* \* @returns {boolean} \`true\` si l'usuari té connexió a internet \* \* @example \* \`\`\`tsx \* function StatusBar() { \*   const isOnline \= useOnlineStatus(); \*   return \<span\>{isOnline ? '🟢 Connectat' : '🔴 Offline'}\</span\>; \* } \* \`\`\` \*/function useOnlineStatus(): boolean {  const \[isOnline, setIsOnline\] \= useState(navigator.onLine);  useEffect(() \=\> {    const on \= () \=\> setIsOnline(true);    const off \= () \=\> setIsOnline(false);    window.addEventListener('online', on);    window.addEventListener('offline', off);    return () \=\> {      window.removeEventListener('online', on);      window.removeEventListener('offline', off);    };  }, \[\]);  return isOnline;} |
| :---- |

**El checklist de disseny**

✅ Nomenclatura:  
   Comença per 'use' \+ nom descriptiu del domini  
   Booleans: is/has/can prefix  
   Arrays: plural

✅ Responsabilitat:  
   Un sol propòsit (SRP)  
   Si és massa gran → dividir en hooks més petits

✅ API de retorn:  
   2 valors → array (com useState)  
   3+ valors → objecte (desestructurar el que cal)  
   Mai arrays amb \> 2 elements

✅ Flexibilitat:  
   Paràmetres per a les dependències (no hardcoding)  
   Valors per defecte raonables

✅ Rendiment:  
   useCallback per a funcions retornades  
   useMemo per a valors computats costosos

✅ Puresa:  
   Sense JSX al retorn  
   Cleanup de tots els efectes  
   Compatibles amb StrictMode (setup → cleanup → setup)

✅ Documentació:  
   JSDoc amb @param, @returns, @example  
   TypeScript complet (generics si cal)

