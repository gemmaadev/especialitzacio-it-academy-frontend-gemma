## **Glossari de termes — Gestió de l'estat global amb React Context**

**`AppProviders`** — Component que compon tots els Providers de l'aplicació en un sol lloc. Col·locat a `src/providers/AppProviders.tsx`. S'usa a `main.tsx` per embolcallar tota l'aplicació. L'ordre dels Providers importa: els Providers superiors poden injectar dades als inferiors.

**Àtom (Jotai)** — La unitat mínima d'estat en Jotai. Cada àtom és una peça independent d'estat global: `const temaAtom = atom<'clar'|'fosc'>('clar')`. Els components se subscriuen únicament als àtoms que necessiten → zero re-renders innecessaris. Alternativa granular a Context per a estat molt dinàmic.

**`createContext`** — Funció de React per crear un context. `createContext<Tipus | undefined>(undefined)`. El valor per defecte (`undefined`) és important: permet detectar quan un component s'usa fora del Provider gràcies al Custom Hook. No s'ha d'usar el valor per defecte com a alternativa al Provider: la detecció d'errors és més valuosa.

**Consumer** — Qualsevol component que usa `useContext` per llegir el valor d'un Context. Tots els consumers d'un Context es re-renderitzen quan el valor del Context canvia, independentment de quina part del valor usen. Per minimitzar consumers innecessaris: separar contexts i usar `React.memo`.

**Context** — Mecanisme de React per passar dades profundament a través de l'arbre de components sense prop drilling. No és un sistema de gestió d'estat per si sol — és un sistema d'injecció de dependències. L'estat real viu en un component React (via `useState` o `useReducer`). Context únicament el distribueix.

**Context Local** — Context que únicament abasta una sub-secció de l'arbre, no tota l'aplicació. Ideal per a features autocontingudes com Wizards, Accordions, o formularis multi-pas. Millora la reutilització: la feature amb el seu Provider és transportable com a unitat.

**Dispatch** — La funció retornada per `useReducer` per enviar accions al reducer. `dispatch({ type: 'AFEGIR', payload: item })`. Té una referència estable (no canvia entre renders) → ideal per separar en un Context independent. Components que únicament fan dispatch no necessiten re-renderitzar quan l'estat canvia.

**Discriminated Union** — Tipus de TypeScript per a les accions d'un reducer. `type Accio = | { type: 'AFEGIR'; payload: Item } | { type: 'ELIMINAR'; payload: string }`. Garanteix que el `payload` estigui correctament tipat per a cada tipus d'acció. TypeScript avisa si el switch no cobreix tots els casos.

**Efecte en cascada (re-renders)** — El fenomen on un canvi en un Context dispara re-renders en cadena a través de tots els components consumers, fins i tot si el component únicament usa una part petita del context. Principal problema de rendiment de Context. Solució: separar contexts per freqüència de canvi.

**Estat Atòmic** — Model de gestió d'estat on cada peça d'estat és independent (un àtom). Implementat per Jotai. Permet subscripcions molt granulars: el component únicament re-renderitza quan el seu àtom específic canvia. Alternativa a Context \+ `useReducer` per a estats molt dinàmics.

**Estat d'Entorn** — Terme per a les dades globals que canvien rarament i son necessàries arreu: tema, idioma, usuari autenticat, feature flags. Context és ideal per a l'estat d'entorn. Contraposat a l'"estat de domini" (carret, productes, comandes) que canvia sovint i pot necessitar Zustand o Redux.

**Estat de Domini** — Dades de l'aplicació que canvien sovint i contenen lògica de negoci: carret de compra, llista de productes filtrats, historial de comandes. Context pot ser insuficient per a l'estat de domini per problemes de rendiment. Zustand o Redux Toolkit son millors opcions.

**Fail Fast** — Principi de detecció d'errors que estableix que és millor fallar immediatament amb un error clar que fallar silenciosament més tard. Aplicat als Custom Hooks: `if (context === undefined) throw new Error('useAuth ha d\'usar-se dins d\'un <AuthProvider>')`. L'error apareix en development en el component problemàtic, no en un component fill amb un error críptic.

**Freqüència de Canvi** — El criteri principal per decidir si separar un context. Dades que canvien molt sovint (notificacions, posició del cursor) i dades que canvien rarament (tema, usuari) haurien de ser en contexts separats. Barrejar-les fa que canvis freqüents disparin re-renders en components que únicament usen les dades estables.

**`initialState`** — El segon argument de `useReducer`. Defineix l'estat inicial del reducer. Pot ser un valor directe o una funció d'inicialització lazy (tercer argument) per a càlculs costosos: `useReducer(reducer, null, () => calcularEstatInicial())`.

**Jotai** — Biblioteca d'estat global atòmic (\~3 KB) per a React. Cada peça d'estat és un àtom independent: `const itemsAtom = atom<Item[]>([])`. No requereix Provider (opcional). Re-renders quirúrgics: els components únicament re-renderitzen quan el seu àtom canvia. Alternativa granular a Context per a estat molt dinàmic.

**`localStorage` (en Context)** — API del browser per persistir l'estat entre sessions. Combinat amb `useState` al Provider: `useState(() => localStorage.getItem('tema') ?? 'clar')` (inicialització lazy). S'actualitza en el setter o en un `useEffect`. Útil per a preferències de l'usuari (tema, idioma).

**Memoïtzació del Valor de Context** — Tècnica per evitar que el Provider crei un nou objecte en cada render, cosa que dispararia re-renders innecessaris en tots els consumers. `const valor = useMemo(() => ({ usuari, login }), [usuari])`. El valor únicament canvia quan les dependències canvien.

**`null` vs `undefined` com a Valor per Defecte** — En `createContext`, usar `undefined` com a valor per defecte (no `null`) permet al Custom Hook detectar quan el component s'usa fora del Provider: `if (context === undefined) throw new Error(...)`. `null` tindria un significat semàntic diferent (usuari no autenticat, per exemple).

**`Object.is`** — La comparació que React usa per determinar si el valor d'un Context ha canviat. Igual que `===` però amb dos casos especials. Per tant, un objecte `{}` sempre és diferent d'un altre objecte `{}` (referència diferent), fins i tot si el contingut és idèntic. Motiu pel qual cal `useMemo` per al valor del Provider.

**Patró Provider** — Arquitectura on un component Provider encapsula l'estat i les funcions per manipular-lo, i els components fills accedeixen via Context sense prop drilling. Implementat amb `createContext` \+ component Provider \+ Custom Hook consumer. Separa la font de veritat de l'estat de la seva presentació.

**Prop Drilling** — L'antipatró on es passa una prop a través de múltiples components intermedis que no la necessiten únicament per arribar al component que sí la usa. Simptoma: components amb props que passen avall sense usar-les. Solució: Context, component composition, o lifting state al component comú correcte.

**Provider** — Component de React que proporciona un valor de Context a tots els components fills. `<AuthContext value={valor}>{children}</AuthContext>`. Tots els components dins del Provider (a qualsevol profunditat) poden llegir el valor via `useContext`. Múltiples Providers del mateix Context es poden aniuar (el més proper guanya).

**`React.memo`** — HOC que evita re-renders innecessaris d'un component si les seves props no han canviat. Complementa Context: si un component és fill d'un consumer però no usa el context directament, `React.memo` evita que re-renderitzi quan el context canvia. Especialment útil quan el dispatch és la prop (dispatch és estable → memo funciona).

**Reducer** — Funció pura que rep l'estat actual i una acció, i retorna el nou estat. `(estat, accio) => nouEstat`. És pura: no modifica l'estat directament (immutabilitat), no té efectes secundaris, i donats els mateixos inputs sempre retorna el mateix output. Per tant és testejable sense React.

**Re-render Cascada** — Veure *Efecte en Cascada*.

**Referència Estable** — Una referència JavaScript que no canvia entre renders. `dispatch` de `useReducer` és sempre la mateixa referència. Les funcions creades dins del render no son estables (nova referència cada render). `useCallback` i `useMemo` permeten crear referències estables per a funcions i valors.

**Selector** — En Zustand i Redux: funció que extreu una part específica de l'estat. `useCarret(state => state.items.length)`. El component únisament re-renderitza quan el valor retornat pel selector canvia, no quan qualsevol part de l'estat canvia. Equivalent funcional a separar contexts per granularitat.

**Separació Estat/Dispatch** — Patró avançat on l'estat i la funció dispatch de `useReducer` es proporcionen en contexts separats. Components que únicament fan dispatch (botons d'afegir al carret) mai re-renderitzen quan l'estat canvia, perquè dispatch és estable. Optimització de rendiment important per a contexts amb molts consumers d'escriptura.

**`setState` Funcional** — Passar una funció al setter de `useState` en lloc d'un valor directe: `setCount(prev => prev + 1)`. Garanteix que s'usa el valor més actual de l'estat (evita stale closures). Important dins dels Providers quan la nova valors depèn de l'anterior.

**Teleportar Dades** — Metàfora de la documentació oficial de React per descriure com Context permet que les dades "saltin" directament al component que les necessita sense passar per intermediaris. "Wouldn't it be great if there were a way to teleport data to the components in the tree that need it?"

**Transició Atòmica** — Una actualització d'estat on múltiples camps es modifiquen simultàniament com una sola operació. Garanteix que l'estat mai queda en un estat inconsistent (per exemple, loading=false i error=null alhora quan hi hauria d'haver un error). `useReducer` garanteix transicions atòmiques; múltiples `useState` no.

**`useCallback`** — Hook de React per memoïtzar funcions i evitar que canviïn de referència en cada render. Útil per a funcions passades com a valor de Context: `const login = useCallback(async (creds) => { ... }, [])`. Sense `useCallback`, la funció seria una nova referència en cada render del Provider, disparant re-renders en tots els consumers.

**`useContext`** — Hook de React per consumir el valor d'un Context. `const valor = useContext(MeuContext)`. Ha d'usar-se dins d'un component funcional (no en loops ni condicionals). Si el component es troba dins d'un Provider, rep el valor del Provider. Si no, rep el valor per defecte de `createContext`.

**`useReducer`** — Hook de React per gestionar estat complex seguint el patró reducer. `const [estat, dispatch] = useReducer(reducer, estatInicial)`. Millor que múltiples `useState` quan: l'estat té múltiples camps interconnectats, les transicions son atòmiques, o la lògica ha de ser testejable per separat.

**Valor per Defecte de Context** — El valor que `useContext` retorna quan el component no té cap Provider al seu arbre pare. Definit al `createContext(valorPerDefecte)`. Recomanació: usar `undefined` per permetre la detecció d'errors al Custom Hook. Usar un valor real únicament quan té sentit usar el Context sense Provider (cas molt rar).

**Wrapper de Test** — Patró per facilitar el testing de components que depenen de Context. `function renderAmbContext(ui, opcions)` que embolcalla el component amb els Providers necessaris. Evita la duplicació de setup als tests i garanteix que els tests reflecteixen l'ús real de l'aplicació.

**Zustand** — Biblioteca d'estat global minimalista (\~3 KB) sense Provider, sense boilerplate. L'store es defineix amb `create()` i s'accedeix via hooks amb selectors quirúrgics. Ideal quan Context causa massa re-renders o quan es necessita estat global dinàmic sense la complexitat de Redux. Compatible amb React Compiler i SSR.  
