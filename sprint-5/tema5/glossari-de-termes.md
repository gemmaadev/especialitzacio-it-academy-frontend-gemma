## **Glossari de termes — Custom Hooks en React**

**`act()`** — Utilitat de React Testing Library que embolcalla actualitzacions d'estat per garantir que s'han processat completament abans de fer assertions. Obligatori en tests de hooks quan es criden funcions que actualitzen l'estat: `act(() => { result.current.increment(); })`. Sense `act()`, les assertions poden executar-se abans que l'estat s'hagi actualitzat.

**API de Retorn** — L'objecte o array que retorna un Custom Hook. Convenció: array `[valor, setter]` per a 2 valors (com `useState`), objecte `{ dades, loading, error }` per a 3+ valors. Mai arrays amb més de 2 elements (impossible recordar l'ordre). L'API de retorn és el "contracte" del hook amb els seus consumidors.

**Awesome React Hooks** — Repositori col·laboratiu (`github.com/rehooks/awesome-react-hooks`) amb una llista curada de recursos, articles, tutorials i hooks de la comunitat React. Organitzat per categories: estat, navegador, formularis, utilitats.

**Batching** — Veure els glossaris anteriors. Rellevant per als Custom Hooks: múltiples crides a setters dins d'un event handler es processen en un sol re-render, independentment de si els setters estan dins del hook o al component.

**Behaviorial Testing** — Enfocament de testing que verifica el comportament observable d'un hook (quèfa) en lloc dels detalls d'implementació interns (com ho fa). "Després d'increment(), el count és 1" és behaviorial. "El hook crida useState internament" no ho és.

**`useCallback` en Custom Hooks** — Memoïtzació de funcions retornades pel hook per garantir referències estables entre renders. Essencial quan el hook retorna funcions que s'usaran com a props de components fills amb `React.memo`. `const afegir = useCallback((item) => setItems(prev => [...prev, item]), [])`.

**`useCopyToClipboard`** — Custom Hook que encapsula la `navigator.clipboard.writeText()` API amb estat de feedback. Retorna `{ copy, copiat }` on `copiat` és `true` durant 2 segons després de copiar. Exemple de hook que simplifica una API del navegador verbosa.

**`useCounter`** — Custom Hook que gestiona un comptador amb increment, decrement, reset i límits configurables. Retorna `{ count, increment, decrement, reset }`. Exemple de hook que encapsula lògica d'estat simple però amb una API rica.

**Custom Hook** — Funció JavaScript que comença per `use` i pot cridar hooks de React (useState, useEffect) i altres Custom Hooks. No retorna JSX. Encapsula lògica stateful reutilitzable. Comparteix **lògica**, no **estat**: cada component que crida el hook té el seu propi estat independent.

**Dead Code (en hooks)** — Lògica en un Custom Hook que mai s'executa o mai és usada pels consumidors. Indicatiu que el hook fa massa coses. Solució: dividir en hooks més petits i composar.

**Debounce** — Tècnica per retardar l'execució d'una funció fins que han passat X mil·lisegons des de l'última crida. `useDebounce(valor, 300)` retorna el valor actualitzat únicament 300ms després de l'última modificació. Útil per a cercadors: evita un fetch per cada tecla premuda.

**Dependency Injection (en hooks)** — Pràctica de passar les dependències com a paràmetres en lloc de hardcodejar-les. `useFetch(url)` en lloc de `useFetch()` amb URL fixada. `useProductes(() => mockFetch())` en lloc d'importar `fetch` directament. Permet reutilitzar el hook en contexts diferents i facilita el testing.

**`eslint-plugin-react-hooks`** — Plugin d'ESLint que verifica les Regles dels Hooks. La regla `react-hooks/rules-of-hooks` detecta hooks usats en condicions o loops. La regla `react-hooks/exhaustive-deps` detecta dependències mancants als dependency arrays. Funciona únicament per a funcions amb prefix `use`, d'aquí la importància de la convenció de nomenclatura.

**Fail Fast (en hooks)** — Patró on el Custom Hook detecta immediatament quan s'usa en un context incorrecte i llança un error clar. `if (!context) throw new Error('useAuth ha d\'usar-se dins d\'un <AuthProvider>')`. Millor que un `TypeError: Cannot read properties of undefined` críptic en un component fill.

**Hook de Base** — Un Custom Hook que encapsula una sola responsabilitat atòmica: `useWindowSize`, `useMediaQuery`, `useDebounce`. Els hooks de base son els blocs de construcció que es composen en hooks de domini i de feature. Han de ser simples, genèrics i altament reutilitzables.

**Hook de Domini** — Un Custom Hook que compon múltiples hooks de base per a un cas d'ús de negoci específic: `useResponsiveLayout` (composa `useWindowSize` \+ `useMediaQuery`). Conté lògica de negoci derivada de la composició.

**Hook de Feature** — El Custom Hook de més alt nivell que encapsula tota la lògica d'una feature: `useCercaProductes`, `useLoginForm`, `useCheckoutWizard`. Compon hooks de base i de domini. El component únicament usa el hook de feature i renderitza JSX.

**`initialProps`** — Opció de `renderHook` que especifica les props inicials del hook en tests. `renderHook(({ url }) => useFetch(url), { initialProps: { url: '/v1' } })`. Permet testar el comportament del hook amb props inicials específiques i usar `rerender()` per canviar-les.

**Injecció de Dependències** — Veure *Dependency Injection*.

**JSDoc** — Sistema de documentació inline per a JavaScript i TypeScript via comentaris `/** */`. Per als Custom Hooks: `@param` per als arguments, `@returns` per al valor de retorn, `@example` amb un exemple d'ús. Permet que els IDEs mostrin documentació i exemples en autocomplete.

**`useList`** — Custom Hook que gestiona un array amb operacions immutables: `push`, `removeAt`, `updateAt`, `clear`. Encapsula el patró de spread operator per evitar mutació directa. Retorna `{ list, push, removeAt, updateAt, clear }`.

**`useLocalStorage`** — Custom Hook que sincronitza `useState` amb `localStorage`. Inicialització lazy llegint de `localStorage`. El setter actualitza tant l'estat com `localStorage`. Tipat genèric `useLocalStorage<T>(clau, inicial)`. Persists entre sessions del browser.

**`useMemo` en Custom Hooks** — Memoïtzació de valors derivats computacionalment costosos dins d'un hook. `const filtrats = useMemo(() => items.filter(predicate), [items, predicate])`. Evita recalcular en cada render quan les dependències no han canviat.

**`useMediaQuery`** — Custom Hook que subscriu un component a canvis en una media query CSS. Usa `window.matchMedia()` internament. Retorna un boolean reactiu. `useMediaQuery('(max-width: 768px)')` → `true` en mòbil. Requereix cleanup de `removeEventListener`.

**`usePrevious`** — Custom Hook que retorna el valor de la variable en el render anterior. Implementat amb `useRef` (no `useState`) per no disparar re-renders. El `useEffect` s'executa DESPRÉS del render → `ref.current` conté el valor del render anterior. Útil per a animacions i comparacions.

**Nivell Superior** — La posició on s'han de cridar els Hooks: directament al cos d'un component funcional o Custom Hook, no dins de loops, condicions, funcions aniuades, o callbacks. Garanteix que l'ordre dels Hooks és consistent entre renders, cosa que React requereix per al seu sistema intern de rastreig.

**Nomenclatura de Custom Hooks** — Convenció establerta per React: el nom ha de començar per `use` seguit d'una lletra majúscula (`useOnlineStatus`, `useFetch`). El prefix `use` permet al linter verificar les Regles dels Hooks i indica als developers que la funció és un Hook amb regles especials.

**Pipeline de Transformació** — Patró de composició on cada hook transforma les dades del hook anterior: `useFetch` → `useNormalitzar` → `useFiltrar` → `usePaginar`. Cada pas té una responsabilitat clara. El component final usa únicament el hook de més alt nivell.

**Props Collision** — Bug on dos HOCs passen props amb el mateix nom al component embolcallat, sobreescrivint-se silenciosament. Un dels problemes principals dels HOC que els Custom Hooks resolen completament: els valors retornats pels hooks s'assignen a variables locals amb el nom que el developer escull.

**`rerender()`** — Funció retornada per `renderHook` que permet simular un canvi de props del hook en tests. `rerender({ url: '/nova-url' })` → dispara una re-execució del hook amb els nous paràmetres. Útil per testar que el hook reacciona correctament a canvis de les seves dependències.

**`renderHook()`** — Funció de `@testing-library/react` per montar un Custom Hook en un entorn de test sense necessitat d'un component real. Retorna `{ result, rerender, unmount }`. `result.current` conté el valor de retorn actual del hook. La eina estàndard per testar Custom Hooks de manera aïllada.

**`result.current`** — Propietat de l'objecte retornat per `renderHook` que conté el valor de retorn actual del hook. Canvia automàticament quan l'estat del hook s'actualitza. `expect(result.current.count).toBe(1)`. Cal accedir via `result.current` (no desestructurar) perquè la referència s'actualitzi entre acts.

**Referència Estable** — Una referència JavaScript que no canvia entre renders. Fonamental per als valors retornats pels Custom Hooks: si el hook retorna funcions sense `useCallback`, seran noves referències en cada render, trencant optimitzacions de `React.memo` als components fills.

**Regles dels Hooks** — Les dues regles que tots els Hooks (built-in i custom) han de seguir: (1) únicament cridar Hooks al nivell superior i (2) únicament cridar Hooks des de funcions React o Custom Hooks. Verificables automàticament amb `eslint-plugin-react-hooks`.

**Separació de Preocupacions** — El principi que cada peça de codi ha de tenir una sola responsabilitat. En React amb Custom Hooks: el **servei** gestiona les crides a l'API, el **hook** gestiona l'estat i els efectes, i el **component** gestiona únicament el JSX. Els Custom Hooks son la frontera entre "QUÈ mostrar" i "COM funciona".

**SRP (Single Responsibility Principle)** — Principi SOLID aplicat als Custom Hooks: cada hook ha de tenir una sola responsabilitat. Si un hook fa fetch, filtra, ordena I pagina → és candidat a ser dividit en `useFetch`, `useFiltrar`, `useOrdenar`, `usePaginar` composats.

**`useClickAway`** — Custom Hook que detecta clics fora d'un element i executa un callback. Útil per tancar modals i dropdowns en clicar fora. Retorna una `ref` per adjuntar a l'element. Usa `document.addEventListener('mousedown', handler)` amb cleanup.

**`useDebounce`** — Veure *Debounce*.

**`useEventListener`** — Custom Hook genèric per afegir event listeners amb cleanup automàtic. `useEventListener('resize', handler, window)`. Elimina la necessitat de gestionar manualment `addEventListener` i `removeEventListener` en cada component.

**`useFetch`** — Custom Hook per a data fetching que encapsula: estat de càrrega, estat d'error, flag `ignore` per evitar race conditions, i cleanup. Retorna `{ dades, loading, error }`. El pattern URL-driven permet reutilitzar-lo per a qualsevol endpoint.

**`useIdle`** — Custom Hook que detecta inactivitat de l'usuari durant un temps configurable. Escolta events `mousemove`, `keydown`, `click`, `scroll`. Retorna un boolean `isIdle`. Útil per a auto-logout, pausa d'animacions, o missatges de "seguiu aquí?".

**`useIntersectionObserver`** — Custom Hook que usa la `IntersectionObserver` API per detectar quan un element entra o surt del viewport. Retorna un boolean `esVisible`. Útil per a lazy loading d'imatges, animacions on-scroll, i infinite scroll.

**`useOnlineStatus`** — Custom Hook que subscriu el component als events `online` i `offline` del browser. Retorna un boolean reactiu. Exemple paradigmàtic de la documentació oficial per demostrar que els Custom Hooks comparteixen lògica (no estat) i que cadascú té el seu propi estat independent.

**`useToggle`** — Custom Hook per gestionar un valor boolean amb una API rica: `{ valor, toggle, activar, desactivar }`. Millor que `const [obert, setObert] = useState(false)` perquè encapsula els patrons d'ús comuns i evita repetir `setObert(v => !v)`.

**`useWindowSize`** — Custom Hook que rastreia les dimensions de la finestra del browser via `window.addEventListener('resize')`. Retorna `{ amplada, alçada }`. Requereix cleanup de `removeEventListener`. Útil per a layouts responsius basats en JS.

**Wrapper** — En el context de testing, un component React que proporciona els Providers de Context necessaris per al hook que s'està testant. `renderHook(() => useAuth(), { wrapper: AuthProvider })`. Sense wrapper, els hooks que depenen de Context fallarien amb el Fail Fast.

**Wrapper Hell** — Antipatró dels HOC on la composició de múltiples HOC crea un arbre profundament aniuat. `withAuth(withLoading(withTheme(Component)))` → 3 nivells extra al DevTools. Els Custom Hooks eliminen completament el wrapper hell perquè no afegeixen cap component al tree.

**`waitFor()`** — Funció de `@testing-library/react` que espera de manera asíncrona fins que la callback s'executa sense llançar errors. `await waitFor(() => expect(result.current.loading).toBe(false))`. Essencial per testar Custom Hooks que fan operacions asíncrones com fetch.  
