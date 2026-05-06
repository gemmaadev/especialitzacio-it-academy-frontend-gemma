## **Mapatge d'errors comuns de JavaScript**

**Com llegir un error de JavaScript**

Abans de mapar els errors, cal entendre l'estructura d'un missatge d'error. Un missatge d'error típic com `Uncaught TypeError: Cannot read properties of undefined (reading 'name') at getUserProfile (app.js:25:15)` et diu: el tipus d'error (TypeError), el missatge descriptiu (estem intentant accedir a la propietat `.name` sobre `undefined`), la funció on ha ocorregut (`getUserProfile`), i la línia i columna exactes (línia 25, columna 15 del fitxer app.js). 

Això et diu exactament on mirar: dins de `getUserProfile` a la línia 25, comprova l'objecte del qual intentes accedir `.name`. Probablement és `undefined`.

**`SyntaxError`: el codi no és JavaScript vàlid**

Quan l'intèrpret de JavaScript analitza el codi, pot llançar un `SyntaxError` quan es troba amb codi que no segueix les especificacions del llenguatge. Si això passa, el codi aturarà l'execució completament i rebràs un missatge sobre la sintaxi.

Un `SyntaxError` és el menys perillós perquè impedeix que el codi s'executi i el navegador l'indica amb una línia exacta.

**Causa 1: claudàtors, parèntesis o comes que falten**

| // ❌ Error: missing ) after argument listfunction calcular(a, b {   // falta el )  return a \+ b;}// ❌ Error: Unexpected token ','const array \= \[1, 2, 3,\];  // alguns entorns no accepten trailing commaconst obj \= {nom: "Anna",}  // idem// ❌ Error al cridar una funciócalcular(5, 3;              // falta el ) |
| :---- |

**Causa 2: cometes mal aparellades**

| // ❌ Error: Invalid or unexpected tokenconst missatge \= "Hola món';   // obert amb " tancat amb 'const path \= 'C:\\Users\\anna';  // la \\ escapa la ' → string no tancada |
| :---- |

**Causa 3: paraules reservades com a noms de variables**

| // ❌ Error: Unexpected token 'import'const import \= factoryFn();   // 'import' és paraula reservada// ❌ Error: Unexpected token 'class'const class \= "frontend";     // 'class' és paraula reservada |
| :---- |

**Solució:** el `SyntaxError` sempre indica la línia. Busca la línia indicada i mira si falta un parèntesi, una clau, una coma o una cometa. ESLint i el linter del VS Code detecten la majoria de `SyntaxError` mentre escrius.

**`ReferenceError`: la variable no existeix en aquest scope**

Un `ReferenceError` ocorre quan intentes accedir a una variable que no has creat encara. També ocorre quan crides una variable abans d'inicialitzar-la.

Els `ReferenceError` ocorren quan intentes usar una variable que no ha estat declarada en el scope actual. És com intentar gastar diners d'un compte que no has obert encara.

**Causa 1: errada tipogràfica en el nom**

| // ❌ ReferenceError: sammmy is not definedlet sammy \= 'A Shark dreaming of the cloud.';console.log(sammmy);  // tres 'm' en lloc de dues// ❌ ReferenceError: usename is not definedconst userName \= "John";console.log(usename);  // falta la 'r' |
| :---- |

**Causa 2: variable fora del seu scope**

| // ❌ ReferenceError: secret is not definedfunction meuFunc() {  const secret \= 123;  // block scope}console.log(secret);  // no és accessible fora de la funció// ❌ ReferenceError: i is not defined (si usen let)for (let i \= 0; i \< 3; i++) { }console.log(i);  // 'i' no existeix fora del for |
| :---- |

**Causa 3: variable no declarada**

| // ❌ ReferenceError: bar is not definedfunction foo() {  console.log(bar);  // 'bar' no s'ha declarat mai}// ❌ ReferenceError: event is not defined (en Firefox)button.onclick \= function() {  console.log(event);  // 'event' no es passa explícitament};// ✅ Solució: passar event com a paràmetrebutton.addEventListener('click', function(event) {  console.log(event);  // correcte}); |
| :---- |

**Causa 4: usar `let` o `const` abans de declarar-los (TDZ)**

| // ❌ ReferenceError: Cannot access 'color' before initializationconsole.log(color);  // està en la TDZ (Temporal Dead Zone)let color \= 'blau'; |
| :---- |

**Solució:** comprova el nom, comprova que la variable s'ha declarat en el scope on intentes accedir-hi, i sempre declara les variables abans d'usar-les.

**`TypeError`: operació en un tipus incorrecte**

Un `TypeError` ocorre quan el valor d'una funció o una variable és d'un tipus inesperat.

És l'error més freqüent en JavaScript i té moltes variants.

**Causa 1: cridar quelcom que no és una funció**

| // ❌ TypeError: sharks.map is not a functionconst sharks \= { shark1: 'sammy', shark2: 'shelly' };sharks.map(shark \=\> shark);  // .map() és d'arrays, no d'objectes// ❌ TypeError: user.greet is not a functionconst user \= { nom: "Bob", greet: "Hola\!" };  // greet és un stringuser.greet();  // intentes cridar-lo com a funció// ❌ TypeError: this.getAttribute is not a function// quan uses arrow function en un event listenerbutton.addEventListener('click', () \=\> {  this.getAttribute('name');  // 'this' en fletxa no és l'element}); |
| :---- |

**Causa 2: Cannot read properties of null/undefined**

Probablement el `TypeError` més comú de tots.

| // ❌ TypeError: Cannot read properties of undefined (reading 'nom')let usuari;           // undefined per defecteconsole.log(usuari.nom);  // 'undefined' no té propietats// ❌ TypeError: Cannot read properties of null (reading 'textContent')const element \= document.querySelector('\#no-existeix');  // retorna nullelement.textContent \= 'Hola';  // null no té propietats// ✅ Solució: Optional Chainingconsole.log(usuari?.nom);           // undefined (sense error)element?.textContent \= 'Hola';      // no fa res si és null |
| :---- |

**Causa 3: iterar sobre quelcom que no és iterable**

| // ❌ TypeError: number is not iterablelet numero \= 123;for (let n of numero) { }  // els números no son iterables// ❌ TypeError: productes.filter is not a function// quan productes arriba com a 'undefined' de l'APIconst productes \= undefined;productes.filter(p \=\> p.preu \> 100);  // undefined no té .filter() |
| :---- |

**Causa 4: reassignar una constant**

| // ❌ TypeError: Assignment to constant variableconst PI \= 3.14;PI \= 3.14159;  // les constants no es poden reassignar |
| :---- |

**Solució:** comprova el tipus de la variable (`typeof variable`), verifica que els objectes i arrays no siguin `null` o `undefined` abans d'accedir a les seves propietats, i usa Optional Chaining (`?.`) per accedir a propietats anidades.

**`RangeError`: valor fora del rang permès**

Els `RangeError` ocorren quan intentes passar un valor com a argument a una funció que no permet un rang que inclou aquell valor.

| // ❌ RangeError: Maximum call stack size exceeded// (recursió infinita sense cas base)function infinita() {  return infinita();  // mai para\!}infinita();// ❌ RangeError: Invalid array lengthconst arr \= new Array(\-1);   // longitud negativaconst arr2 \= new Array(4294967296);  // massa gran// ❌ RangeError: toFixed() digits argument must be between 0 and 100(1.5).toFixed(200); |
| :---- |

**Taula de diagnòstic ràpid**

| Error | Pregunta clau | Causa més freqüent |
| ----- | ----- | ----- |
| `SyntaxError` | El codi és vàlid JavaScript? | Parèntesis/clau que falta, cometes mal aparellades |
| `ReferenceError: X is not defined` | He declarat X? Estic en el scope correcte? | Errada tipogràfica, variable fora de scope, TDZ |
| `TypeError: X is not a function` | X és realment una funció? | Crida a propietat que no és funció, `.map()` sobre objecte |
| `TypeError: Cannot read properties of undefined` | La variable és undefined? | Variable no inicialitzada, resposta API buida, element DOM null |
| `TypeError: Cannot read properties of null` | El selector troba l'element? | `querySelector` retorna null, element no existeix al DOM |
| `TypeError: X is not iterable` | X és un array o iterable? | Itera sobre `undefined`, `null` o un objecte sense `[Symbol.iterator]` |
| `RangeError: Maximum call stack` | Hi ha recursió infinita? | Funció recursiva sense cas base |

**La regla per a "Cannot read property X of null/undefined"**

L'error tipus `Uncaught TypeError: Cannot read properties of undefined (reading 'name')` indica que estem intentant accedir a la propietat `.name` sobre `undefined`. Comproveu l'objecte el `.name` del qual intenteu accedir: probablement és `undefined`.

El patró d'investigació és sempre el mateix:

| // Error: Cannot read properties of undefined (reading 'email')// a la línia: console.log(usuari.email)// Pas 1: qui és 'usuari' en aquell punt?console.log(usuari);  // → undefined// Pas 2: d'on ve 'usuari'?// → ve d'una petició a l'API que no ha carregat encara// Pas 3: solució// Opció A: Optional Chainingconsole.log(usuari?.email);// Opció B: valor per defecteconst email \= usuari?.email ?? 'No disponible';// Opció C: guard clauseif (\!usuari) return;console.log(usuari.email); |
| :---- |

