## **Glossari de termes — Eines i estratègies de resolució de problemes**

**Abstracció** — Procés cognitiu d'ignorar els detalls irrellevants per centrar-se únicament en els aspectes que importan per resoldre el problema. En debugging: quan trobes `Cannot read properties of undefined`, el codi irrellevant s'ignora i únicament t'importa la variable que és `undefined` i d'on ve.

**Algorisme** — Seqüència de passos definits i ordenats per resoldre un problema concret. La transformació d'un problema vague ("el carret no calcula bé el total") en passos algorísmics el converteix en verificable i depurable.

**Bottom-Up (Performance panel)** — Pestanya del panell inferior del Performance que mostra totes les funcions ordenables per Self Time o Total Time. Busca funcions amb Self Time alt que no son visibles al coll de la pila del flame chart: son les que realment causen el bottleneck.

**Breakpoint** — Punt de pausa definit en una línia de codi que atura l'execució quan el navegador l'arriba. Permet inspeccionar totes les variables en scope, el call stack i el flux d'execució sense modificar el codi.

**Breakpoint Condicional** — Variant del breakpoint que únicament atura l'execució quan una expressió JavaScript es compleix. Substitueix el patró `if (condicio) console.log(...)`. Clic dret al número de línia → "Add conditional breakpoint".

**Breakpoint d'Excepció** — Activa la pausa automàtica quan el codi llança un error no capturat o capturat per try/catch. Ideal per trobar l'origen exacte d'un error sense saber on mirar.

**Breakpoint de DOM** — Pausa l'execució quan un element específic del DOM és modificat, eliminat o quan els seus atributs canvien. Clic dret sobre l'element al panell Elements → "Break on". Útil quan "alguna cosa modifica l'element i no sé quèés".

**Breakpoint de XHR/Fetch** — Pausa l'execució quan l'aplicació fa una petició de xarxa que coincideix amb una URL especificada. Per inspeccionar les dades enviades a una API abans que surti la petició.

**Call Stack** — La pila de crides: la seqüència de funcions que s'han cridat per arribar al punt d'execució actual. Es llegeix de dalt a baix (la més recent primera). Clicant qualsevol frame al panell Sources pots veure les variables que existien en aquell punt.

**CLS (Cumulative Layout Shift)** — Core Web Vital que mesura els desplaçaments visuals inesperats durant la càrrega de la pàgina. Objectiu: ≤0.1. Causa típica: imatges sense `width` i `height` definits, o contingut que s'insereix sobre contingut existent.

**Closure** — Funció que recorda i accedeix a les variables del seu scope exterior. Al panell Scope de DevTools apareix com a categoria "Closure" mostrant les variables capturades.

**Cold Start** — El retard inicial quan una funció serverless no s'ha usat durant un temps. No relacionat directament amb debugging però impacta en les mesures del Network panel.

**`console.error()`** — Registra un missatge a la consola amb estil d'error (fons vermell). Apareix filtrat sota "Errors" a la Console.

**`console.group()`** — Agrupa logs relacionats en un bloc col·lapsable a la consola. Molt útil per a logging estructurat d'operacions complexes.

**`console.log()`** — El mètode de debugging més bàsic: registra valors a la consola. Avantatge: ràpid i universal. Desavantatge: modifica el codi, risc d'arribar a producció, no mostra totes les variables en scope.

**`console.table()`** — Renderitza un array d'objectes com a taula navegable a la consola. Molt superior a `console.log()` per inspeccionar llistes de dades.

**`console.time()` / `console.timeEnd()`** — Mesura el temps transcorregut entre les dues crides. Útil per a profiling ràpid sense obrir el panell Performance.

**`console.warn()`** — Registra un avís a la consola amb estil de warning (fons groc).

**Content Download** — La fase final del timing d'una petició al Network panel: el temps descarregant el cos de la resposta. Un valor molt alt indica que el recurs és gran o l'amplada de banda és escassa.

**Core Web Vitals** — El conjunt de tres mètriques de rendiment que Google usa com a factor de posicionament en els resultats de cerca: LCP, INP i CLS. Mesuren respectivament la velocitat de càrrega, la interactivitat i l'estabilitat visual.

**`debugger`** — Paraula clau JavaScript que funciona com un breakpoint quan DevTools és obert. Quan DevTools és tancat, s'ignora completament. Cal eliminar-la abans de fer commit.

**Descomposició** — Estratègia de dividir un problema complex en subproblemes més petits i manejables, cadascun resoluble per separat. La tècnica fonamental del pensament computacional aplicada al debugging.

**DevTools** — Conjunt d'eines de debugging integrades als navegadors moderns (Chrome, Firefox, Edge). Inclou múltiples panells: Elements, Console, Sources, Network, Performance, Application i Lighthouse.

**Device Mode** — Funcionalitat de Chrome DevTools que simula dispositius mòbils amb dimensions de pantalla, densitat de píxels i condicions de xarxa específiques. `Ctrl+Shift+M` per activar.

**DOM Breakpoint** — Veure *Breakpoint de DOM*.

**Early Return** — Veure *Guard Clause*.

**Efecte Heisenbug** — Bug que desapareix quan intentes observar-lo: afegir un `console.log` o un breakpoint canvia el timing prou com per ocultar el problema. Especialment freqüent en codi asíncron amb race conditions.

**Error de lògica** — El codi és sintàcticament vàlid però produeix un resultat incorrecte. No genera cap missatge d'error a la consola. El tipus de bug més difícil de trobar.

**Error de sintaxi** — El codi no és JavaScript vàlid: parèntesis que falten, cometes mal aparellades, paraules reservades usades com a variables. El navegador ho detecta immediatament i no executa cap línia.

**`event.target`** — Propietat de l'objecte event que referencia l'element exacte on l'usuari ha interaccionat. Diferent de `event.currentTarget` que referencia l'element que té el listener.

**Exception Breakpoint** — Veure *Breakpoint d'Excepció*.

**FCP (First Contentful Paint)** — Mètrica que mesura quan el primer text, imatge o element visible es renderitza a la pantalla. No és una Core Web Vital però influeix directament en el LCP.

**Flame Chart / Flame Graph** — Visualització del panell Performance que mostra l'estat de la pila de crides JavaScript en cada mil·lisegon. L'eix X és el temps, l'eix Y és la pila. Les barres **amples** indiquen funcions lentes. Les barres **estretes** pero **profundes** no son necessàriament problemàtiques.

**`filter` (Network)** — Funcionalitat del Network panel per mostrar únicament les peticions que coincideixen amb un tipus (`JS`, `CSS`, `XHR`...) o text específic a la URL. Indispensable per navegar en pàgines amb moltes peticions.

**`git bisect`** — Comanda Git que implementa una cerca binària per trobar el commit exacte que va introduir un bug. Amb 100 commits, necessites únicament \~7 proves per trobar el culpable. Extremament útil per a regressions.

**`git blame`** — Mostra qui ha escrit cada línia d'un fitxer i en quin commit. Útil per entendre el context d'un codi i saber a qui preguntar.

**Guard Clause** — Comprovació de validació al principi d'una funció que retorna (o llança un error) immediatament si una precondició no es compleix. Elimina la "piràmide de la mort" i deixa el happy path clar.

**Happy Path** — El flux d'execució ideal on tot funciona correctament i sense errors. El debugging busca on el codi surt del happy path.

**Heisenbug** — Veure *Efecte Heisenbug*.

**Hook (`pre`/`post`)** — Script npm que s'executa automàticament abans (`pre`) o després (`post`) d'un altre script. `pretest` s'executa sempre abans de `npm test`. Si el hook falla, el script principal no s'executa.

**INP (Interaction to Next Paint)** — Core Web Vital que mesura el temps des que l'usuari interactua amb la pàgina fins que es veu el resultat visual. Reemplaça FID des del març 2024\. Objectiu: ≤200ms. No mesurable per Lighthouse (requereix input real d'usuari).

**LCP (Largest Contentful Paint)** — Core Web Vital que mesura quan l'element principal visible (imatge gran, bloc de text) es renderitza completament. Objectiu: ≤2.5s. Pes del 25% en la puntuació de Lighthouse.

**Layout Thrashing** — Patró de codi que alterna lectures i escriptures al DOM, forçant el navegador a recalcular el layout en cada cicle. Visible al flame chart com a blocs "Recalculate Style" i "Layout" repetits.

**Lighthouse** — Eina automatitzada de Google integrada a Chrome DevTools que audita pàgines web en cinc categories: Performance, Accessibility, Best Practices, SEO i PWA. Genera dades de laboratori (simulació), no dades de camp reals.

**Live Expression** — Funcionalitat de la Console de DevTools que monitoritza una expressió JavaScript en temps real, actualitzant-se automàticament sense estar pausat en un breakpoint.

**Logpoint** — Variant del breakpoint que registra un missatge a la consola sense pausar l'execució. Equivalent a `console.log` però sense modificar el codi. Clic dret al número de línia → "Add logpoint".

**Long Task** — Tasca del fil principal que dura més de 50ms. Bloqueja el navegador i fa que la interfície sembli lenta o no respongui als inputs. Apareix marcada en vermell al flame chart del panell Performance.

**Minificació** — Eliminació d'espais en blanc, comentaris i reducció de noms de variables per reduir la mida dels fitxers de producció. El codi minificat dificulta el debugging sense source maps.

**`npm audit`** — Comanda que analitza les dependències del projecte i reporta vulnerabilitats de seguretat conegudes.

**`npm ci`** — Instal·la exactament les versions especificades al `package-lock.json`. Determinista i recomanada per a entorns CI/CD, en lloc de `npm install`.

**`npm outdated`** — Mostra la llista de paquets instal·lats que tenen versions més noves disponibles.

**npm Scripts** — Comandes definides a la secció `scripts` del `package.json` que automatitzen tasques de development: build, test, lint, debug... S'executen amb `npm run <nom>`.

**Null Coalescing (`??`)** — Operador que retorna el valor de la dreta únicament si el valor de l'esquerra és `null` o `undefined`. Diferent de `||` que s'activa per qualsevol valor falsy.

**Optional Chaining (`?.`)** — Operador que accedeix a propietats anidades de manera segura. Si qualsevol part de la cadena és `null` o `undefined`, retorna `undefined` en lloc de llançar un `TypeError`. `usuari?.adreca?.ciutat`.

**Panell Application** — Panell de DevTools per inspeccionar i editar l'estat persistent de l'aplicació: `localStorage`, `sessionStorage`, `IndexedDB`, cookies, service workers i cache.

**Panell Elements** — Panell de DevTools que mostra el DOM renderitzat i els estils CSS associats. Permet editar HTML i CSS en temps real, simular estats CSS i posar DOM breakpoints.

**Panell Network** — Panell de DevTools que registra totes les peticions HTTP de la pàgina amb timing detallat (Waterfall). Mostra headers, cos de la petició i resposta, mida i estat de cada recurs.

**Panell Performance** — Panell de DevTools que grava i visualitza tota l'activitat del navegador: JavaScript (groc), Layout/Style (morat), Rendering (verd). Inclou el flame chart per identificar bottlenecks.

**Panell Sources** — Panell de DevTools per inspeccionar fitxers, posar breakpoints, depurar JavaScript i editar codi (Live Edit). El panell de debugging principal.

**`package-lock.json`** — Fitxer que registra les versions exactes de totes les dependències instal·lades. Cal pujar-lo al repositori per garantir que tots els membres de l'equip i el CI/CD usen les mateixes versions.

**`RangeError`** — Error que ocorre quan un valor está fora del rang permès per una funció. La causa més freqüent és la recursió infinita sense cas base: `Maximum call stack size exceeded`.

**Race Condition** — Error asíncron on el resultat depèn de l'ordre d'execució d'operacions que no estan sincronitzades. El codi intenta accedir a dades que encara no han carregat de l'API.

**`ReferenceError`** — Error que ocorre quan intentes usar una variable que no existeix en el scope actual. Causes: errada tipogràfica, variable fora del seu bloc `{}`, usar `let`/`const` abans de declarar-les (TDZ).

**Scope** — L'àmbit on una variable és accessible. Al panell Scope de DevTools es mostren tres nivells: Local (funció actual), Closure (funcions exteriors capturades) i Global (`window`).

**Self Time** — El temps que una funció ha trigat ella sola, sense comptar les funcions que ha cridat. Un Self Time alt indica que aquella funció és la que realment fa el treball costós. Visible al Bottom-Up del Performance panel.

**Source Map** — Fitxer que mapeja el codi minificat o transpirat (TypeScript, JSX) amb el codi font original. Permet posar breakpoints i veure el codi original al panell Sources en lloc del codi processat.

**Stack Trace** — La llista de funcions en la pila d'execució en el moment de l'error. Llegida de dalt a baix (la funció més recent primer), indica exactament on ha fallat el codi i quines funcions l'han cridat.

**`SyntaxError`** — Error de sintaxi: el codi no és JavaScript vàlid. Detectat immediatament pel motor JavaScript, impedeix que s'executi cap línia. ESLint el detecta mentre escrius.

**TBT (Total Blocking Time)** — Mètrica de Lighthouse: suma del temps que el fil principal ha estat bloquejat per Long Tasks (\>50ms) entre el FCP i el TTI. Pes del 30% en la puntuació de Performance. És el proxy de laboratori per a INP.

**TDZ (Temporal Dead Zone)** — La zona temporal entre el hoisting i la declaració de `let` i `const` on la variable existeix però és inaccessible. Accedir-hi llança un `ReferenceError: Cannot access 'X' before initialization`.

**Throttling** — Simulació de connexions de xarxa lentes o CPUs menys potents al panell Network o Performance. Revela problemes que únicament apareixen en condicions reals d'usuaris amb dispositius o connexions limitades.

**Total Time** — El temps total d'una funció incloent totes les funcions que ha cridat. Diferent del Self Time. Visible al Bottom-Up del Performance panel.

**TTFB (Time to First Byte)** — El temps des que el navegador envia la petició fins que rep el primer byte de la resposta del servidor. Un TTFB alt indica un servidor lent, sense CDN o amb consultes de base de dades costoses.

**`TypeError`** — Error que ocorre quan una operació es fa sobre un valor del tipus incorrecte. Les variants més freqüents: `Cannot read properties of null/undefined` i `X is not a function`.

**Variable d'entorn** — Valor de configuració que l'aplicació llegeix en temps d'execució via `process.env.NOM`. En scripts npm, es pot passar directament: `NODE_ENV=production node server.js`.

**Watch Expression** — Expressió JavaScript monitoritzada al panell de debugging de DevTools. Es recalcula automàticament a cada pas del codi durant el debugging. Permet monitoritzar `typeof variable`, condicions o qualsevol expressió personalitzada.

**Waterfall (Network)** — La visualització gràfica del timing de cada petició HTTP al panell Network. La part lleugera de cada barra és el TTFB (espera), la part fosca és el Content Download. Mostra visualment les dependències i els colls d'ampolla de càrrega.

**XHR Breakpoint** — Veure *Breakpoint de XHR/Fetch*.

