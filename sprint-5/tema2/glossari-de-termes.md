## **Glossari de termes — Gestió d'efectes secundaris en React**

**AbortController** — API nativa del browser per cancel·lar operacions asíncrones com `fetch`. Es crea amb `new AbortController()`, es passa el `signal` a la petició (`fetch(url, { signal: controller.signal })`), i es cancel·la amb `controller.abort()` en el cleanup de `useEffect`. Les peticions cancel·lades llancen un error `AbortError` que s'ha d'ignorar explícitament. La manera recomanada per evitar race conditions i el warning de setState en components desmuntats.

**Batching** — Optimització de React que agrupa múltiples crides a `setState` en un sol re-render. Des de React 18, el batching s'aplica també a funcions asíncrones. Rellevant per als efectes: múltiples `setState` dins d'un `useEffect` produeixen un sol re-render.

**Bucle Infinit (useEffect)** — Situació on un `useEffect` s'executa contínuament sense aturar-se. Causes principals: ometre el dependency array (s'executa en cada render), usar un objecte o funció creats durant el render com a dependència (nova referència en cada render), o que l'efecte actualitzi un estat que és dependència d'ell mateix. Solució: dependency array correcte, dependències primitives, o crear objectes i funcions dins de l'efecte.

**Cleanup Function** — Funció retornada per la funció de setup de `useEffect`. React l'executa quan el component es desmunta i abans de cada re-execució de l'efecte (quan les dependències canvien). Ha de ser el mirall simètric del setup: si el setup crea un recurs, el cleanup el destrueix. Sense cleanup → memory leaks, event listeners acumulats, connexions obertes.

**Concurrent Mode** — Mode de renderitzat de React (React 18+) que permet interrompre, pausar i reprendre renders per prioritzar actualitzacions urgents. Requereix que els components siguin purs perquè React pot cridar la funció de render múltiples vegades sense renderitzar el resultat. Components impurs poden produir resultats incorrectes en Concurrent Mode.

**Custom Hook** — Funció JavaScript que comença per `use` i pot cridar altres hooks de React. El mecanisme per encapsular lògica de `useEffect` reutilitzable. Permet extreure la complexitat dels efectes darrere d'una API declarativa: `useWindowSize()`, `useOnlineStatus()`, `useKeyPress()`, `useIntersectionObserver()`. Cada component que crida el Custom Hook obté el seu propi estat i efectes aïllats.

**Dead Effect** — Terme informal per a un `useEffect` que existeix per hàbit o costum però no és necessari. Ocorre quan s'usa `useEffect` per a càlculs derivats (que es podrien fer durant el render), per a transformacions de dades, o per a lògica que hauria d'anar en un event handler. Eliminar dead effects simplifica el codi i elimina re-renders innecessaris.

**Dependency Array** — El segon argument opcional de `useEffect`. Array de valors reactius (props, state, variables de l'àmbit del component) que determinen quan l'efecte es re-executa. Tres comportaments: sense array (cada render), array buit `[]` (únicament en muntar i desmuntar), array amb valors (quan algun valor canvia). No pots "escollir" les dependències: tots els valors reactius usats dins l'efecte han de ser-hi.

**Determinisme** — Propietat d'una funció que garanteix que el mateix input sempre produeix el mateix output. Requisit fonamental per als components React. Una funció determinista no llegeix variables globals, no fa I/O, i no depèn del temps o de l'atzar.

**Effect** — En el context de React, qualsevol operació que afecta alguna cosa fora de l'àmbit del render actual del component. Inclou: fetch de dades, subscripcions, manipulació del DOM, timers, event listeners. Els effects van als event handlers o al `useEffect`, mai al cos de la funció de renderitzat.

**Effect Event (`useEffectEvent`)** — Hook estabilitzat a React 19.2 que permet llegir els valors més recents de props i estat des d'un efecte sense afegir-los com a dependències. Resol el problema del stale closure per a valors que vols llegir però no "reaccionar" a ells. Els Effect Events no son reactius i han de ser omesos de les dependències.

**Efecte Secundari (Side Effect)** — Operació que afecta alguna cosa fora de l'àmbit de la funció que s'executa. En React: data fetching, subscripcions a serveis externs, manipulació del DOM, timers (`setInterval`, `setTimeout`), event listeners del browser (`addEventListener`), connexions WebSocket. No son part de l'output de renderitzat i s'han de gestionar fora de la fase de renderitzat pura.

**Flag `ignore`** — Patró recomanat per la documentació oficial de React per evitar race conditions en data fetching amb `useEffect`. Una variable local `let ignore = false` que es posa a `true` en el cleanup. L'efecte comprova `if (!ignore)` abans d'actualitzar l'estat, ignorant respostes de peticions cancel·lades o obsoletes.

**Funció de Renderitzat** — La funció del component React que retorna JSX. Ha de ser pura: no pot tenir efectes secundaris, no pot modificar variables externes, ha de retornar el mateix output per als mateixos inputs. Tot el que "fa coses" (fetch, timers, listeners) va als event handlers o a `useEffect`, no aquí.

**Funció Pura** — Funció que compleix dues regles: donats els mateixos inputs sempre retorna el mateix output, i no produeix cap efecte secundari observable. En React, els components han de ser funcions pures: `f(props, state) → JSX`. Les funcions pures son predictibles, testejables, memoïtzables i compatibles amb Concurrent Mode.

**Funció Updater** — Forma de cridar `setState` passant una funció en lloc d'un valor: `setCount(prev => prev + 1)`. La funció rep el valor actual de l'estat com a argument. Útil dins de `useEffect` per evitar el stale closure: no cal capturar el valor actual de l'estat com a dependència perquè la funció updater sempre rep el valor més recent.

**`ignore` (flag)** — Veure *Flag `ignore`*.  
**Idempotència** — Propietat d'una operació que produeix el mateix resultat independentment de quantes vegades s'executi. Els efectes de React han de ser "quasi-idempotents": la seqüència `setup → cleanup → setup` ha de produir el mateix estat final que `setup` únicament. StrictMode verifica aquesta propietat executant el cicle extra en development.

**IntersectionObserver** — API del browser que notifica quan un element entra o surt del viewport. S'integra amb `useEffect`: `observer.observe(element)` en el setup, `observer.disconnect()` en el cleanup. Útil per a lazy loading d'imatges, animacions on-scroll, i infinite scroll.

**`let ignore`** — Veure *Flag `ignore`*.

**Memory Leak (Fuita de Memòria)** — Situació on una aplicació manté referències a objectes que ja no son necessaris, impedint que el garbage collector els alliberi. En React, ocorre quan un component crea recursos externs (timers, subscripcions, connexions) però no els destrueix en desmuntar. Els recursos s'acumulen progressivament degradant el rendiment fins que el browser tanca la pestanya.

**`MutationObserver`** — API del browser que detecta canvis en el DOM (afegir/eliminar nodes, canvis d'atributs). S'integra amb `useEffect` amb el patró setup/cleanup: `observer.observe(element, options)` i `observer.disconnect()`.

**`Object.is`** — Comparació que React usa per verificar si les dependències de `useEffect` han canviat. `Object.is(a, b)` és similar a `===` però amb dos casos especials: `Object.is(NaN, NaN) === true` i `Object.is(+0, -0) === false`. Important per entendre per quèels objectes i arrays com a dependències causen re-execucions: `{} !== {}` (nova referència en cada render).

**Puresa (Purity)** — Veure *Funció Pura*.

**Race Condition** — Bug asíncron on dues o més operacions concurrents produeixen un resultat incorrecte depenent de l'ordre en que finalitzen. En React: l'usuari canvia ràpidament un paràmetre (userId), dues peticions simultànies s'executen, la resposta de la petició antiga arriba després de la nova i sobreescriu l'estat. Solució: `AbortController` o flag `ignore`.

**React Compiler** — Compilador introduït a React 19 que pot auto-memoïtzar components i valors automàticament. Requereix que els components siguin purs com a condició prèvia: la puresa és la precondició per a l'auto-optimització del compilador. Escrivint codi pur, els beneficis de rendiment arriben automàticament.

**`ResizeObserver`** — API del browser que notifica quan canvia la mida d'un element específic (a diferència de `window.resize` que únicament detecta canvis de la finestra). S'integra amb `useEffect`: `observer.observe(element)` en el setup, `observer.disconnect()` en el cleanup.

**Setup Function** — La funció que s'executa quan `useEffect` s'activa. Conté la lògica per connectar amb el sistema extern (crear una subscripció, afegir un listener, iniciar un timer). Pot retornar opcionalment una cleanup function.

**Side Effect** — Veure *Efecte Secundari*.

**Stale Closure** — Bug subtil on una funció dins d'un `useEffect` captura i usa un valor desactualitzat (stale \= ranci) d'una variable d'àmbit exterior. Ocorre quan les dependències de l'efecte no inclouen tots els valors reactius que usa. El valor queda "congelat" al moment en que es va crear el closure. Solució: funció updater, `useRef` per a valors que canvien però no han de re-executar l'efecte, o `useEffectEvent` (React 19.2+).

**StrictMode** — Component de React (`<React.StrictMode>`) que en development activa comprovacions addicionals. Per als efectes: executa un cicle extra `setup → cleanup → setup` abans del setup real. Això exposa efectes que no implementen cleanup correctament. Sense efecte en producció.

**Timer (setInterval / setTimeout)** — APIs del browser per executar codi amb retard o repetidament. Son "sistemes externs" en el model de React: cal gestionar-los amb `useEffect`. Sempre requereixen cleanup: `clearInterval(id)` o `clearTimeout(id)`. Sense cleanup → el timer continua executant-se après que el component desmunta → memory leak i possibles actualitzacions d'estat en components desmuntats.

**`useEffect`** — Hook de React que permet sincronitzar un component amb un sistema extern. Signatura: `useEffect(setup, dependencies?)`. S'executa après que React ha actualitzat el DOM. No s'executa en el servidor (Server-Side Rendering). Retorna `undefined`. La porta d'entrada als efectes secundaris en components funcionals.

**`useEffectEvent`** — Hook estabilitzat a React 19.2 que permet llegir els últims props i estat des d'un Effect sense que siguin dependències. Resol el stale closure per a valors no-reactius: lògica de l'aplicació que necessita valors actuals però no hauria de re-executar l'efecte quan canvien.

**`useLayoutEffect`** — Variant de `useEffect` que s'executa de manera síncrona DESPRÉS que React actualitza el DOM però ABANS que el browser pinti la pantalla. Usar únicsament quan l'efecte fa mesures del DOM o modificacions visuals que causarien un parpelleig amb `useEffect` normal. Per a la gran majoria d'efectes, `useEffect` és l'opció correcta.

**`useRef`** — Hook de React que permet guardar un valor mutable que persisteix entre renders sense disparar re-renders. Útil en efectes per: guardar referències a recursos externs (timers, connexions), guardar el valor anterior d'una prop o estat, i accedir al valor actual sense afegir-lo com a dependència de l'efecte.

**Valor reactiu** — Qualsevol valor que pot canviar entre renders i que React ha de rastrejar: props, state, i variables i funcions declarades directament dins del component. Tots els valors reactius usats dins d'un `useEffect` han d'incloure's a la llista de dependències. Valors no reactius: constants fora del component, funcions definides fora del component.

**Warning "Can't perform a React state update on an unmounted component"** — Error clàssic de React quan un efecte asíncron (fetch, Promise, timeout) intenta actualitzar l'estat d'un component que ja s'ha desmuntat. Indica que falta una funció de cleanup. Solució: `AbortController.abort()` per a fetch, flag `ignore = true` per a promeses generals, `clearTimeout/clearInterval` per a timers.

**WebSocket** — Protocol de comunicació bidireccional en temps real. En React s'integra amb `useEffect`: `new WebSocket(url)` en el setup, `socket.close()` en el cleanup. Sense cleanup → la connexió roman oberta consumint recursos del client i del servidor fins que el browser tanca la pestanya.

