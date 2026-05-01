### **Apunts T4 — JavaScript modern i bones pràctiques**

## **1\. ES6+: les bases del JavaScript modern**

### **`const`, `let` i l'adéu a `var`**

La regla és simple: usa `const` per defecte, `let` quan el valor canviarà, i mai `var`. La diferència fonamental és el **scope**: `var` té function scope (s'escapa dels blocs `if` i `for`), mentre que `let` i `const` tenen block scope (queden confinats al bloc `{}`).

L'altre problema de `var` és el **hoisting**: la declaració puja al capdamunt de la funció i s'inicialitza a `undefined`, permetent usar la variable abans de declarar-la sense error. `let` i `const` també fan hoisting però entren en la **TDZ (Temporal Dead Zone)**: accedir-hi abans de la declaració llança un `ReferenceError` explícit, molt més útil per detectar errors.

El cas del bucle és el més crític: `var` en un bucle crea una sola variable per a totes les iteracions (tots els `setTimeout` veuen el valor final), mentre que `let` crea un binding independent per a cada iteració.

**Funcions fletxa vs. funcions tradicionals**

Les funcions fletxa aporten sintaxi concisa i, el que és més important, no creen el seu propi `this`. El `this` d'una funció fletxa és el del context on es va definir, cosa que elimina els famosos bugs de `this` en callbacks.

La regla: usa funcions fletxa per a callbacks i mètodes d'arrays. Usa funcions tradicionals per a mètodes d'objectes i constructors.

| // Funció fletxa: retorn implícit si és una sola expressióconst doble \= x \=\> x \* 2;const suma \= (a, b) \=\> a \+ b;// Funcions d'arrays: territori natural de les fletxesconst parells \= \[1,2,3,4\].filter(n \=\> n % 2 \=== 0);const dobles \= \[1,2,3\].map(n \=\> n \* 2); |
| :---- |

**Desestructuració**

La desestructuració extreu valors d'objectes i arrays de manera elegent. Especialment útil per als paràmetres de funcions, les respostes d'APIs i els imports de mòduls.

| // Objectes: nom \= valor per defecteconst { nom, edat \= 18, adreca: { ciutat } } \= usuari;// Arrays: posició importa, pots saltar elementsconst \[primer, , tercer\] \= \['a', 'b', 'c'\];// Paràmetres de funciófunction mostrar({ nom, rol \= 'usuari' }) { } |
| :---- |

**2\. Mètodes immutables d'arrays**

Els arrays en JavaScript es passen per referència. Modificar un array directament (mutació) pot causar bugs en qualsevol lloc que tingui una referència al mateix array. La solució és usar mètodes que retornen un nou array sense tocar l'original.

**`map()`** — transforma cada element, retorna nou array de la mateixa longitud. **`filter()`** — elimina elements que no compleixen la condició, retorna nou array més curt. **`reduce()`** — acumula tots els elements en un sol valor (número, objecte, array).

| // Encadenar mètodes: cada un retorna un nou arrayconst resultat \= productes  .filter(p \=\> p.enStock)  .filter(p \=\> p.preu \< 1000)  .map(p \=\> ({ ...p, preusAmbIVA: p.preu \* 1.21 }))  .sort((a, b) \=\> a.preu \- b.preu);// productes original: intacte |
| :---- |

L'**operador spread** (`...`) permet crear còpies i combinar arrays sense mutació:

| Operació | ❌ Destructiu | ✅ Immutable |
| ----- | ----- | ----- |
| Afegir al final | `arr.push(elem)` | `[...arr, elem]` |
| Eliminar per id | `arr.splice(i, 1)` | `arr.filter(e => e.id !== id)` |
| Ordenar | `arr.sort()` | `[...arr].sort()` |

En React, la immutabilitat és obligatòria: modificar directament l'estat no provoca re-renderitzat.

**3\. Mòduls: `import` i `export`**

Sense mòduls, tots els scripts comparteixen el namespace global de `window`. Variables iguals en fitxers diferents es sobreescriuen silenciosament. Amb `type="module"`, cada fitxer té el seu propi scope privat.

**Named exports** — per a fitxers amb múltiples coses:

| export const PI \= 3.14;export function suma(a, b) { return a \+ b; }// importar: import { PI, suma } from './math.js' |
| :---- |

**Default export** — per a fitxers amb una responsabilitat:

| export default function Button({ text }) { return \<button\>{text}\</button\>; }// importar: import Button from './Button.jsx' |
| :---- |

**Barrel files** — un `index.js` que re-exporta tota una carpeta, proporcionant un punt d'entrada únic:

| // components/index.jsexport { default as Button } from './Button.jsx';export { default as Input } from './Input.jsx';// usar: import { Button, Input } from '../components'; |
| :---- |

Els mòduls habiliten el **tree-shaking**: Vite i Webpack eliminen del bundle final tot el codi exportat però no importat.

**4\. Asincronisme: async/await i try/catch**

JavaScript és single-threaded però no bloquejant. L'evolució: callbacks → Promises → async/await. `async/await` fa que el codi asíncron sembli síncron, molt més llegible.

| async function carregarPerfil(id) {  try {    const resposta \= await fetch(\`/api/usuaris/${id}\`);    if (\!resposta.ok) throw new Error(\`HTTP ${resposta.status}\`);    return await resposta.json();  } catch (error) {    console.error('Error:', error.message);    return null;  } finally {    ocultarLoader();  // sempre s'executa  }} |
| :---- |

Regles crítiques: sempre comprova `response.ok` (fetch no llança error per 404 o 500), mai deixis un `catch` buit, i usa `Promise.all` per a peticions independents en paral·lel:

| // En paral·lel: \~1s en lloc de \~3sconst \[usuari, productes\] \= await Promise.all(\[  fetch('/api/usuari').then(r \=\> r.json()),  fetch('/api/productes').then(r \=\> r.json()),\]); |
| :---- |

**5\. Event Delegation**

Afegir un listener a cada element d'una llista de 500 elements → 500 listeners en memòria. Si s'afegeixen elements dinàmicament → no tindran listeners.

La solució és l'event delegation: un sol listener al pare que usa `event.target` per identificar quin fill ha disparat l'event. Funciona gràcies al **bubbling**: els events pugen del fill al pare fins a `document`.

| const llista \= document.querySelector('\#llista');llista.addEventListener('click', function(event) {  // .closest() puja pel DOM fins trobar l'element  const boto \= event.target.closest('.btn-accio');  if (\!boto) return;  const accio \= boto.dataset.accio;  const fila \= boto.closest('tr');  const id \= fila.dataset.id;  gestorAccions\[accio\]?.(id);});// Elements afegits dinàmicament → funcionen automàticament |
| :---- |

Events que NO fan bubbling (i no es poden delegar): `focus`, `blur`, `mouseenter`, `mouseleave`, `scroll`. Alternativa: `focusin` i `focusout` sí fan bubbling.

**6\. Clean Code: codi net en JavaScript**

Les regles fonamentals adaptades de "Clean Code" de Robert C. Martin:

* **Noms descriptius** — el codi es llegeix més que s'escriu. `calcularPreuAmbIVA()` millor que `calc()`. `const MILLISECONDS_PER_DAY` millor que `86400000`.  
* **Una funció, una cosa** — si la funció necessita un comentari per explicar el que fa, és massa gran. Màxim 2 paràmetres; si necessites més, usa un objecte.  
* **No efectes secundaris** — una funció que modifica variables exteriors és impredictible i difícil de testar.  
* **Eliminar codi mort** — codi comentat, funcions que ningú crida, condicions que mai es compleixen. Git guarda l'historial: elimina amb confiança.  
* **Comentaris útils** — els bons comentaris expliquen el *per quèés*, no el *quèés*. Si el codi és tan clar que no necessita comentaris, millor.

**7\. Code Smells i com resoldre'ls**

Un code smell és un senyal que indica un problema de disseny, no necessàriament un bug. Les cinc categories de Refactoring Guru:

* **Bloaters** (codi massa gran): Long Method → Extract Method. Long Parameter List → Introduce Parameter Object. Magic Numbers → Named Constants.  
* **Dispensables** (codi innecessari): Duplicate Code → DRY (Don't Repeat Yourself). Dead Code → eliminar. Comentaris excessius → codi expressiu.  
* **Change Preventers** (difícil de modificar): Shotgun Surgery (un canvi requereix modificar molts llocs) → centralitzar la lògica. Divergent Change (una classe canvia per raons molt diverses) → Extract Class (SRP).  
* **Couplers** (acoblament excessiu): Feature Envy (una funció usa massa dades d'un altre objecte) → Move Method. Message Chains (`a.b.c.d.e`) → Optional Chaining \+ encapsular.  
* La **piràmide d'indentació** es resol amb Guard Clauses: valida al principi i surt aviat, deixant el happy path net i sense imbricació.

**8\. Fail Fast**

Detecta i reporta errors el més aviat possible, en lloc de deixar que el sistema continuï amb dades invàlides i falli molt més tard en un lloc no relacionat.

Les dues implementacions principals:

**Guard Clauses al principi de les funcions** — valida tots els inputs abans de fer res:

| function processar(comanda) {  if (\!comanda) throw new Error('Comanda requerida');  if (\!comanda.usuari) throw new Error('Usuari requerit');  if (comanda.total \<= 0) throw new Error('Total invàlid');  // Happy path sense indentació excessiva} |
| :---- |

**Validació de la configuració a l'inici** — l'aplicació no arrenca si manca una variable d'entorn crítica, en lloc de fallar misteriosament 10 minuts després.

**9\. SOLID, cohesió i acoblament**

**SOLID** és un acrònim de cinc principis: **S**ingle Responsibility (una classe/funció, una raó per canviar), **O**pen/Closed (obert per estendre, tancat per modificar), **L**iskov Substitution (les subclasses respecten el contracte del pare), **I**nterface Segregation (interfícies petites i específiques), **D**ependency Inversion (depèn d'abstraccions, no d'implementacions concretes — Dependency Injection).

* **Alta cohesió** — tots els mètodes d'una classe serveixen un propòsit únic i clarament relacionat. `AuthManager` gestiona autenticació i res més.  
* **Baix acoblament** — les classes depenen poc les unes de les altres. `UserService` rep la base de dades injectada en lloc de crear-la internament: es pot canviar MySQL per MongoDB sense tocar `UserService`.

La separació en capes — UI → Servei → Repositori → Infraestructura — és la implementació pràctica de SOLID en aplicacions web.

**10\. Patrons de disseny**

Els patrons de disseny són solucions provades a problemes recurrents. Es classifiquen en tres categories:

* **Creacionals** — com es creen els objectes. **Singleton**: garanteix una sola instància (configuració, logger). **Factory**: centralitza i aïlla la creació d'objectes, permetent afegir nous tipus sense modificar el codi existent.  
* **Estructurals** — com es relacionen els objectes. **Decorator**: afegeix comportament dinàmicament sense modificar la classe (logging, cache, validació). **Proxy**: controla l'accés a un objecte (validació, lazy loading).  
* **De comportament** — com es comuniquen els objectes. **Observer**: un objecte notifica automàticament tots els seus subscriptors quan canvia (base dels events, React state, Redux). **Strategy**: intercanvia algoritmes en temps d'execució sense modificar el codi client.

La regla d'or: no sobre-enginyeris. Afegeix un patró únicament quan resol un problema real, no per seguir el patró per se.

**El mapa del tema**

| JavaScript Modern (ES6+)  ├── const/let (block scope, TDZ)  ├── Funcions fletxa (this heretat)  ├── Desestructuració (objectes, arrays, paràmetres)  ├── Template literals  ├── Spread/Rest operator  └── Mètodes immutables (map, filter, reduce)Organització del Codi  ├── Mòduls (named, default, barrel files, dynamic imports)  └── Scope privat vs. global namespaceAsincronisme  ├── async/await  ├── try/catch/finally  └── Promise.all / Promise.allSettledDOM i Events  └── Event Delegation (event.target, .closest())Qualitat del Codi  ├── Clean Code (noms, funcions petites, no efectes secundaris)  ├── Code Smells \+ Refactoring  ├── Fail Fast (guard clauses, validació primerenca)  ├── Cohesió alta \+ Acoblament baix  ├── SOLID (5 principis)  └── Patrons (Singleton, Factory, Observer, Strategy, Decorator) |
| :---- |

