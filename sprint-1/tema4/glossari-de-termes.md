## **Glossari de termes — JavaScript modern i bones pràctiques**

**Abstract Factory** — Variant del patró Factory que crea famílies d'objectes relacionats. Per exemple, una `UIFactory` que crea botons i modals en l'estil de Material UI o Bootstrap, intercanviables sense modificar el codi client.

**Async/Await** — Sintaxi de JavaScript que fa que el codi asíncron sembli síncron i llegible. `async` davant d'una funció fa que retorni sempre una Promise. `await` dins d'una funció `async` atura l'execució fins que la Promise es resol.

**Acoblament (Coupling)** — Grau d'interdependència entre mòduls o classes. Baix acoblament significa que els mòduls depenen poc els uns dels altres i es poden modificar independentment. Alt acoblament fa el codi fràgil: un canvi en un mòdul trenca els altres.

**Barrel File** — Fitxer `index.js` que re-exporta tot el contingut d'una carpeta, proporcionant un punt d'entrada únic. Permet `import { Button, Input } from '../components'` en lloc d'un import per cada fitxer.

**Block Scope** — Àmbit de visibilitat limitat al bloc `{}` on es declara una variable. `let` i `const` tenen block scope. `var` no.

**Bubbling** — Mecanisme pel qual un event disparat en un element fill "puja" automàticament per tots els seus elements pare fins a `document`. La base tècnica de l'event delegation.

**Callback** — Funció passada com a argument a una altra funció per ser executada més tard. L'enfocament original per gestionar l'asincronisme, substituït per Promises i `async/await` per evitar el "callback hell".

**Callback Hell** — Patró d'indentat profund i il·legible que resulta d'encadenar múltiples callbacks. La principal motivació per crear les Promises i `async/await`.

**Clean Code** — Filosofia de programació que prioritza la llegibilitat, la mantenibilitat i la reutilitzabilitat del codi. Basada en el llibre de Robert C. Martin. Principis clau: noms descriptius, funcions petites, una responsabilitat per funció, sense efectes secundaris.

**Closure** — Funció que recorda les variables del seu scope exterior fins i tot quan s'executa fora d'aquell scope. La base del patró Module i de molts patrons de JavaScript.

**Code Smell** — Senyal en el codi que indica un problema de disseny. No és necessàriament un bug, però suggereix que el codi serà difícil de mantenir. Exemples: Long Method, Duplicate Code, Magic Numbers.

**Cohesió (Cohesion)** — Grau en el qual els elements d'un mòdul o classe estan relacionats i serveixen un propòsit comú. Alta cohesió: tots els mètodes d'una classe serveixen un sol propòsit. Baixa cohesió: la classe fa massa coses sense relació.

**`const`** — Declaració de variable de block scope que no es pot reassignar. La convenció és usar-la per defecte. No vol dir immutable: les propietats d'objectes i arrays declarats amb `const` sí es poden modificar.

**Dead Code** — Codi que mai s'executa: funcions que ningú crida, variables que mai s'usen, condicions que mai es compleixen. S'ha d'eliminar: Git guarda l'historial si cal recuperar-lo.

**Default Export** — Exportació principal d'un mòdul, sense nom explícit. Cada mòdul pot tenir un sol default export. En importar-lo pots posar-li qualsevol nom: `import QualsevolNom from './modul.js'`.

**Decorator (patró)** — Patró estructural que afegeix comportament a un objecte o funció dinàmicament, sense modificar la classe original. En JavaScript s'implementa habitualment com a Higher-Order Function que embolcalla la funció original.

**Dependency Injection (DIP)** — Principi SOLID on les dependències s'injecten des de fora en lloc de crear-les internament. `constructor(db, mailer)` en lloc de `this.db = new MySQLDatabase()`. Fa el codi testable i desacoblat.

**Desestructuració** — Sintaxi ES6 per extreure valors d'objectes o arrays i assignar-los a variables. Suporta valors per defecte, renombrament i desestructuració anidada. Molt útil als paràmetres de funcions.

**DRY (Don't Repeat Yourself)** — Principi de disseny: cada peça de coneixement ha d'existir una sola vegada al codi. Si canvies una còpia i oblides l'altra, introdueixes un bug. Solució: Extract Method.

**Early Return** — Veure *Guard Clauses*.

**Event Delegation** — Tècnica que posa un sol listener al pare en lloc de listeners individuals a cada fill. Usa `event.target` per identificar quin element ha disparat l'event. Aprofita el bubbling. Funciona automàticament per a elements afegits dinàmicament.

**`event.target`** — Propietat de l'objecte event que fa referència a l'element exacte on l'usuari ha fet l'acció, independentment de quin element té el listener.

**`event.currentTarget`** — L'element que té el listener registrat. En event delegation, és el contenidor pare, mentre que `event.target` és el fill que ha disparat l'event.

**Factory (patró)** — Patró creacional que centralitza i aïlla la lògica de creació d'objectes. El codi client no sap quina classe exacta s'instancia. Permet afegir nous tipus sense modificar el codi existent.

**Fail Fast** — Estratègia de disseny que detecta i reporta errors el més aviat possible, en lloc de deixar que el sistema continuï amb dades invàlides. S'implementa principalment amb Guard Clauses i validació al punt d'entrada.

**Fail Silently** — L'oposat de Fail Fast. El sistema rep una entrada invàlida, no reporta cap error, i continua executant-se. El bug apareix molt lluny de la seva causa real, dificultant el debugging.

**`filter()`** — Mètode immutable d'array que retorna un nou array amb els elements que superen un test. No modifica l'original. Alternativa a `splice()` per eliminar elements.

**`finally`** — Bloc de codi que s'executa sempre, tant si `try` ha tingut èxit com si `catch` ha capturat un error. Ideal per netejar recursos, ocultar loaders o tancar connexions.

**Function Scope** — Àmbit de visibilitat de les variables `var`: visibles dins de tota la funció però no fora. Contrasta amb el block scope de `let` i `const`.

**Gap Analysis** — Veure *Code Smell*.

**Guard Clause** — Condició de validació al principi d'una funció que retorna (o llança un error) immediatament si alguna precondició no es compleix. Elimina la "piràmide de la mort" i deixa el happy path clar i pla.

**Happy Path** — El camí d'execució ideal, on tot funciona correctament i l'usuari fa exactament el que s'espera. El codi net deixa el happy path al nivell principal, sense imbricació excessiva.

**Hoisting** — Comportament de JavaScript on les declaracions de variables i funcions "pugen" al capdamunt del seu scope durant la fase de compilació. `var` fa hoisting i s'inicialitza a `undefined`. `let` i `const` fan hoisting però entren a la TDZ.

**Higher-Order Function (HOF)** — Funció que accepta altres funcions com a paràmetres o retorna una funció. `map`, `filter`, `reduce` i el patró Decorator en són exemples.

**Immutabilitat** — Pràctica de no modificar les dades existents sinó crear-ne de noves. Essencial en React (l'estat no es modifica directament) i en programació funcional. S'implementa amb `map`, `filter`, `reduce` i spread.

**`import`** — Paraula clau per importar exports d'un altre mòdul. Named imports van entre claus `{ }`. Default imports no. Es poden combinar: `import Default, { named } from './modul.js'`.

**Interface Segregation Principle (ISP)** — Principi SOLID que diu que les classes no s'han de forçar a implementar interfícies que no usen. En JavaScript es tradueix en dissenyar APIs petites i enfocades, preferint la composició sobre la herència.

---

**KISS (Keep It Simple, Stupid)** — Principi de disseny: la solució més simple és generalment la millor. Directament relacionat amb evitar la sobre-enginyeria i afegir abstraccions únicament quan es justifiquen.

**`let`** — Declaració de variable de block scope que es pot reassignar. Usar quan el valor canviarà (comptadors, acumuladors, valors temporals).

**Liskov Substitution Principle (LSP)** — Principi SOLID que diu que les subclasses han de poder substituir el tipus base sense trencar el comportament. En JavaScript: quan estens una classe, els mètodes sobreescrits han de respectar el contracte original.

**Long Method** — Code smell: funció que fa massa coses. Solució: Extract Method, dividir en funcions petites amb noms descriptius.

**`map()`** — Mètode immutable d'array que transforma cada element i retorna un nou array de la mateixa longitud. No modifica l'original. L'alternativa immutable al bucle `for` amb mutació.

**Magic Number** — Code smell: valor numèric literal dispersat pel codi sense nom ni explicació. Solució: substituir per una constant nomenada (`const MILLISECONDS_PER_DAY = 86400000`).

**Mòdul** — Fitxer JavaScript amb scope privat propi. Tot el que declara és privat per defecte; únicament s'exposa el que s'exporta explícitament. Elimina la contaminació del namespace global.

**Named Export** — Exportació d'un mòdul amb nom explícit. Un mòdul pot tenir múltiples named exports. S'importa amb claus: `import { suma, resta } from './math.js'`.

**Namespace Pollution** — Contaminació del scope global quan múltiples scripts afegeixen variables a `window`. Causa col·lisions de noms silencioses. Els mòduls ES6 eliminen completament aquest problema.

**Observer (patró)** — Patró de comportament on un objecte (Subject) manté una llista de subscriptors (Observers) i els notifica automàticament quan canvia el seu estat. La base dels sistemes d'events, el DOM, React state i Redux.

**Open/Closed Principle (OCP)** — Principi SOLID: el codi hauria d'estar obert per a l'extensió però tancat per a la modificació. S'afegeix nova funcionalitat creant codi nou, no modificant l'existent. El patró Strategy l'implementa directament.

**Optional Chaining (`?.`)** — Operador ES2020 que accedeix a propietats anidades de manera segura. Si alguna propietat de la cadena és `null` o `undefined`, retorna `undefined` en lloc de llançar un error. `usuari?.adreca?.ciutat`.

**Promise** — Objecte que representa una operació asíncrona que pot estar pendent, resolta o rebutjada. La base de `async/await`. `Promise.all` executa múltiples Promises en paral·lel.

**`Promise.all`** — Executa múltiples Promises simultàniament i retorna una Promise que es resol quan totes han acabat. Si qualsevol falla, tot falla.

**`Promise.allSettled`** — Com `Promise.all` però espera que totes acabin independentment de si tenen èxit o falla. Retorna l'estat de cadascuna.

**Proxy (patró)** — Patró estructural que proporciona un intermediari que controla l'accés a un objecte. Permet interceptar operacions (get, set, delete) per afegir validació, logging o lazy loading.

**`reduce()`** — Mètode immutable d'array que acumula tots els elements en un sol valor. Pot produir un número, un objecte, un array o qualsevol altre tipus. El mètode més potent i flexible dels tres.

**Refactoring** — Procés de millorar l'estructura interna del codi sense canviar el seu comportament extern. S'ha de fer amb tests que verifiquin que res s'ha trencat.

**Rest Operator (`...`)** — Recull els arguments restants d'una funció o els elements restants d'una desestructuració en un array: `function fn(primer, ...resta)`.

**Scope** — L'àmbit on una variable és accessible. JavaScript té tres nivells: global, function (var) i block (let/const). Els mòduls afegeixen el module scope.

**Shotgun Surgery** — Code smell: un canvi petit requereix modificar molts fitxers o funcions disperses. Indica que la lògica que hauria d'estar junta està escampada. Solució: centralitzar.

**Single Responsibility Principle (SRP)** — Principi SOLID: una classe o funció ha de tenir una sola raó per canviar. És el principi que més impacte té en la mantenibilitat del codi.

**Singleton (patró)** — Patró creacional que garanteix que una classe té únicament una instància i proporciona un punt d'accés global. Útil per a configuració, logger o connexions compartides.

**SOLID** — Acrònim dels cinc principis de disseny orientat a objectes: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation i Dependency Inversion.

**Spread Operator (`...`)** — Expandeix un array o objecte en elements individuals. Usat per crear còpies, combinar arrays i passar arguments: `[...arr1, ...arr2]`, `{ ...obj, nouCamp: valor }`.

**Strategy (patró)** — Patró de comportament que permet intercanviar algoritmes en temps d'execució sense modificar el codi client. Implementa directament l'Open/Closed Principle.

**TDZ (Temporal Dead Zone)** — Zona temporal entre el hoisting i la declaració de `let` i `const` on la variable existeix però és inaccessible. Accedir-hi dins la TDZ llança un `ReferenceError` explícit.

**Template Literals** — Strings delimitades per backticks (`` ` ``) que permeten interpolació d'expressions amb `${}` i strings multilínia sense escapar.

**Tree-shaking** — Optimització dels bundlers (Vite, Webpack) que elimina del bundle final el codi exportat però no importat. Requereix mòduls ES6 per funcionar.

**`try/catch/finally`** — Estructura per gestionar errors en JavaScript. `try` intenta executar el codi. `catch` captura qualsevol error. `finally` s'executa sempre, independentment del resultat.

**`var`** — Forma antiga de declarar variables a JavaScript. Function scoped, fa hoisting, és redeclarable i no té TDZ. Mai s'ha d'usar en codi modern.

**YAGNI (You Aren't Gonna Need It)** — Principi: no implementis funcionalitats que no necessites ara. Afegeix abstraccions únicament quan tens almenys dos casos d'ús reals que se'n beneficien. Directament relacionat amb evitar la sobre-enginyeria.  
**`?.` (Optional Chaining)** — Veure *Optional Chaining*.

**`??` (Nullish Coalescing)** — Operador que retorna el valor de la dreta únicament si el valor de l'esquerra és `null` o `undefined` (no si és `0`, `''` o `false`). `const port = config.port ?? 3000`.

