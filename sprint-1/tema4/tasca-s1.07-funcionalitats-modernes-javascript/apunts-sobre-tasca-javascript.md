**Apunts 01\_block-scoping.test.js** 

**Scope, `let` i `const`**  
El **scope** és simplement **on viu una variable**. Si intentes usar una variable fora del seu scope, dona error.

**Les 3 paraules clau**

Abans existia només `var`, que tenia molts problemes. Ara usem `let` i `const`:

* **`const`** → per valors que **no canvien**. Si intentes canviar-lo, dona error.  
* **`let`** → per valors que **sí canvien**. Es pot reasignar quan vulguis.  
* **`var`** → antiga i problemàtica. **No usar mai** en codi modern.

**El bloc `{}`**

Un bloc és tot el que va entre claus `{}`. Les `if`, `for`, funcions... tots creen blocs.

La regla és senzilla: **`let` i `const` no surten del bloc on han nascut.**

| {  let x \= 1;    // neix aquí dins}console.log(x); // ❌ error \-- x no existeix aquí fora |
| :---- |

Amb `var` això no passava, i causava molts bugs. Per això es va crear `let`.

**La diferència clau entre `let` i `const`**

`let` es pot **modificar** des d'un bloc interior si la variable és de l'exterior:

| let nom \= "Anna";     // exterior{  nom \= "Gemma";      // modifica l'exterior ✅}console.log(nom);     // "Gemma" |
| :---- |

`const` **no es pot modificar** mai, però pots crear una nova `const` amb el mateix nom en un bloc interior — seran dues variables independents:

| const d \= 5;          // exterior{  const d \= 10;       // nova variable, no té res a veure amb l'exterior ✅  console.log(d);     // 10}console.log(d);       // 5 |
| :---- |

Usa **`const`** sempre per defecte. Si en algun moment necessites canviar el valor, canvia-ho a **`let`**. Mai uses `var`. 

**Apunts 02\_arrow.test.js** 

## **Arrow Functions** 

## **Què és una arrow function?**

És una manera més curta d'escriure funcions. Fa exactament el mateix però amb menys codi:

| // Funció tradicionalfunction(a, b) {  return a \* b;}// Arrow function \-- mateixa cosa, menys codi(a, b) \=\> a \* b |
| :---- |

**Sintaxi**

**Un sol paràmetre** → no calen parèntesis:  
num \=\> num \* num

**Més d'un paràmetre** → calen parèntesis:  
(a, b) \=\> a \* b

**Una sola línia** → Si la funció fa **una sola cosa** →  usa la versió curta sense `{}`:  
no calen `{}` ni `return`:

EX1: (a, b) \=\> a \* b  
EX2: num \=\> num \* 2

**Més d'una línia** → Si la funció fa **diverses coses** → usa la versió llarga amb `{}` i `return`: calen `{}` i `return`:

EX1:   
(a, b) \=\> {  
  const resultat \= a \* b;  
  return resultat;  
}

EX2:  
num \=\> {   
	const doble \= num \* 2;   
	const triple \= num \* 3;  
	return doble \+ triple;   
}

**On s'usen molt — callbacks**

Les arrow functions són especialment útils dins de `.map()`, `.filter()`, `.sort()`:

| // Tradicional ❌ \-- més llargnums.map(function(num) {  return num \* num;}) |
| :---- |

| // Arrow function ✅ \-- més curtnums.map(num \=\> num \* num) |
| :---- |

**La diferència important — `this`**

Aquesta és la diferència clau entre funcions tradicionals i arrow functions.

**Funció tradicional** → té el seu propi `this`, que es perd quan s'anida dins d'una altra funció:

| const person \= {  name: "Aaron",  greetFriends: function(friends) {    return friends.map(function(friend) {      return this.name; // ❌ this no és person aquí\!    });  }} |
| :---- |

**Arrow function** → hereta el `this` del context on ha estat creada:

| const person \= {  name: "Aaron",  greetFriends: function(friends) {    return friends.map(friend \=\> {      return this.name; // ✅ this és person\!    });  }} |
| :---- |

Funció tradicional → this es perd dins d'altres funcions ❌  
Arrow function     → this es manté sempre ✅

**Què és una funció?**

Una funció és un **bloc de codi que fa una cosa** i que pots reutilitzar:

| function suma(a, b) {  return a \+ b;}suma(2, 3); // → 5suma(10, 5); // → 15 |
| :---- |

La defineixes una vegada i la crides quan vulguis.

**Què és una arrow function?**

És exactament el mateix però escrit de manera més curta:

| // Funció tradicionalfunction suma(a, b) {  return a \+ b;}// Arrow function \-- fa el mateixconst suma \= (a, b) \=\> a \+ b; |
| :---- |

Res més. És una altra manera d'escriure funcions.

**Què és `this`?**

`this` és una paraula que significa **"l'objecte on estic ara mateix"**.

| const persona \= {  nom: "Anna",  saluda: function() {    console.log(this.nom); // this \= persona → "Anna"  }}persona.saluda(); // → "Anna" |
| :---- |

El problema és que `this` es perd quan poses una funció dins d'una altra:

| const persona \= {  nom: "Anna",  saluda: function() {    \[1,2,3\].map(function() {      console.log(this.nom); // ❌ this ja no és persona\!    });  }} |
| :---- |

Les arrow functions solucionen això perquè **no tenen el seu propi `this`** i hereten el del pare:

| const persona \= {  nom: "Anna",  saluda: function() {    \[1,2,3\].map(() \=\> {      console.log(this.nom); // ✅ this segueix sent persona\!    });  }} |
| :---- |

**Resum**

* **Funció** → bloc de codi reutilitzable  
* **Arrow function** → funció escrita de manera més curta  
* **`this`** → "l'objecte on estic" — es perd en funcions tradicionals anidades, però no en arrow functions

**Apunts 03\_new-apis.test.js** 

**Noves APIs**

### **`.includes()` — buscar dins d'un string**

Comprova si un string conté un altre string. Retorna `true` o `false`:

| "Hola món".includes("món")  // → true"Hola món".includes("adeu") // → false |
| :---- |

Abans d'ES6 havies d'usar `.indexOf()` que era més complicat:

| // ❌ Anticsentence.indexOf("best") \!== \-1// ✅ Modernsentence.includes("best") |
| :---- |

**`.repeat()` — repetir un string**

Repeteix un string tantes vegades com li diguis:

| "abc".repeat(3) // → "abcabcabc""ha".repeat(4)  // → "hahahaha" |
| :---- |

**`Array.from()` — convertir a array**

Converteix qualsevol cosa que s'assembli a un array en un array real:

| const obj \= { length: 3, 0: "a", 1: "b", 2: "c" }Array.from(obj) // → \["a", "b", "c"\] |
| :---- |

És molt útil quan treballes amb el DOM — `document.querySelectorAll()` retorna un `NodeList` que no és un array real, i amb `Array.from()` el pots convertir.

**`.fill()` — omplir un array**

Omple un array amb un valor. Pots indicar des d'on fins on:

| new Array(5).fill(3)      // → \[3, 3, 3, 3, 3\]new Array(5).fill(3, 1)   // → \[, 3, 3, 3, 3\]  ← salta el primernew Array(5).fill(3, 1, 3) // → \[, 3, 3, , ,\]  ← del índex 1 al 3 |
| :---- |

**`Object.assign()` — fusionar objectes**

Copia les propietats d'un o més objectes dins d'un altre:

| Object.assign(destí, font1, font2, ...) |
| :---- |

Si hi ha la mateixa clau, **l'última guanya**:

| Object.assign({a:1}, {a:99}) // → {a: 99} |
| :---- |

**Important** — és una còpia **superficial**. Els objectes niuats no es fusionen, es sobreescriuen completament:

| const target  \= { a: { q: "r", m: \[4,5,6\] } }const source  \= { a: { b: "c", m: \[1,2,3\] } }Object.assign(target, source)// → { a: { b: "c", m: \[1,2,3\] } }// q desapareix\! ← no fusiona, sobreescriu |
| :---- |

**Apunts 04\_destructure.test.js** 

## **Destructuring**  

**Què és el destructuring?**

És una manera curta d'extreure valors d'objectes o arrays:

| // ❌ Manera antigaconst address \= getAddress();const city \= address.city;// ✅ Destructuringconst { city } \= getAddress(); |
| :---- |

**Destructuring d'objectes `{}`**

**Bàsic:**

| const { city, state, zip } \= getAddress(); |
| :---- |

**Propietat que no existeix → `undefined`:**

| const { address } \= getAddress(); // → undefined |
| :---- |

**Àlies — extreure amb un nom diferent:**

| const { city: c, state: s, zip: z } \= getAddress();// city no existeix, c sí |
| :---- |

**Niuat — entrar dins d'objectes dins d'objectes:**

| const { coords: { lat, long } } \= getAddress();// coords no existeix com a variable, lat i long sí |
| :---- |

**Destructuring d'arrays `[]`**

**Bàsic — extreu per posició:**

| const \[one, two\] \= \[1, 2, 3, 4, 5\];// one \= 1, two \= 2 |
| :---- |

**Saltar posicions — coma buida:**

| const \[one, , three\] \= \[1, 2, 3, 4, 5\];// one \= 1, three \= 3 (el 2 s'ignora) |
| :---- |

**Niuat — entrar dins d'arrays dins d'arrays:**

| // \[1, 2, \[3, 4, \[5, 6\]\]\]const \[one, , \[three, , \[, six\]\]\] \= getNestedNumbers();// one \= 1, three \= 3, six \= 6 |
| :---- |

**Diferència objectes vs arrays**

|  | Objectes | Arrays |
| ----- | ----- | ----- |
| Sintaxi | `{}` | `[]` |
| Extreu per | **nom** de la propietat | **posició** |
| Saltar elements | no cal | coma buida `, ,` |
| Àlies | `{ city: c }` | el nom és lliure |

Usa destructuring sempre que hagis d'extreure més d'una propietat d'un objecte o array — fa el codi molt més net i llegible. 

**Apunts 05\_template-literals.test.js** 

**Template literals**

### **Què és un template literal?**

És una manera moderna d'escriure strings usant **backticks** `` ` `` en lloc de cometes `"` o `'`. Permet inserir variables directament dins del text.

**1\. Interpolació — inserir variables**

| // ❌ Manera antiga"Hola " \+ nom \+ ", tens " \+ edat \+ " anys"// ✅ Template literal\`Hola ${nom}, tens ${edat} anys\` |
| :---- |

Dins de `${}` pots posar qualsevol expressió JavaScript:

| \`${person.name} has ${person.friends.length} friends\`\`${2 \+ 2} és el resultat\`\`${person.friends.join(", ")}\` // array a string amb comes i espai |
| :---- |

**2\. Strings multilínia**

Amb template literals pots escriure en múltiples línies directament — els salts de línia es respecten tal qual:

| // ❌ Manera antiga \-- calia \\n"línia 1\\nlínia 2\\nlínia 3"// ✅ Template literal \-- el salt de línia és automàtic\`línia 1línia 2línia 3\` |
| :---- |

⚠️ La indentació del codi **compta** — els espais formen part del string.

**3\. Escapar caràcters**

Dins d'un template literal, si necessites escriure un backtick, has d'escapar-lo amb `\`:

| \`This is \\\`escaped\\\` backticks\`// → "This is \`escaped\` backticks" |
| :---- |

Un salt de línia real dins del template és equivalent a `\n`:

| \`Hithere\!\`// → "Hi\\nthere\!" |
| :---- |

**4\. Tagged templates (Extra Credit)**

És una funció que processa un template literal. JavaScript divideix el template en parts fixes i variables i les passa a la funció:

| tagIt\`Hello ${noun}\! Are you feeling ${emotion} today?\`// JavaScript ho divideix en:// literalString \= \["Hello ", "\! Are you feeling ", " today?"\]// interpolatedParts \= \["World", "happy"\] |
| :---- |

Permet transformar el resultat final com vulguis. És avançat i poc comú.

**Resum**

|  | Manera antiga | Template literal |
| ----- | ----- | ----- |
| Variables | `"Hola " + nom` | `` `Hola ${nom}` `` |
| Multilínia | `"l1\nl2"` | `` `l1 \n l2` `` |
| Backtick | no cal escapar | `` \` `` |

**Apunts 06\_modules.test.js** 

## **Mòduls JavaScript**

El problema que solucionen

Imagina que tens tot el codi en un sol fitxer enorme. Els mòduls et permeten separar el codi en fitxers petits i connectar-los.

Export — "deixo que altri usi això"

Per poder usar algo d'un altre fitxer, primer ho has d'exportar:

| // Mathy.jsfunction sqrt(num) { return Math.sqrt(num) }function square(num) { return num \* num }export { sqrt, square }  // ← "publico" aquestes funcions |
| :---- |

Import — "vull usar algo d'un altre fitxer"

Importar TOT d'un fitxer:

| import \* as Mathy from '../common/Mathy'Mathy.sqrt(4)    // → 2Mathy.square(3)  // → 9 |
| :---- |

El `* as Mathy` significa "agafa-ho tot i posa-ho dins d'un objecte anomenat Mathy".

Importar NOMÉS el que necessites:  
import { sqrt, square } from '../common/Mathy'

| sqrt(4)    // → 2  (sense Mathy. al davant)square(3)  // → 9 |
| :---- |

Importar amb un nom diferent (àlies):

| import { sqrt as mySqrt } from '../common/Mathy'mySqrt(4)  // → 2sqrt(4)    // ❌ no existeix, ara es diu mySqrt |
| :---- |

node\_modules — llibreries externes

Quan importes sense `./` o `../`, JavaScript busca a `node_modules`:

| // El teu fitxerimport { add } from '../common/Mathy'  // ← fitxer teu// Llibreria externaimport lodash from 'lodash'  // ← busca a node\_modules automàticament |
| :---- |

Patró index.js

És molt comú tenir un `index.js` que agrupa exports de múltiples fitxers:

| // index.jsexport \* from './module1'  // re-exporta tot de module1export \* from './module2'  // re-exporta tot de module2 |
| :---- |

Així pots importar des d'un sol lloc:

| import \* as Tot from '../common'  // agafa tot de index.js |
| :---- |

En lloc d'haver d'importar fitxer per fitxer. 

Aquí ho veus en pràctica:

`module1.js` exporta `variable1` i `variable2`:

| export const variable1 \= 'Bob'export const variable2 \= 'Kent' |
| :---- |

`module2.js` exporta `variable3` i `variable4`:

| export const variable3 \= 222export const variable4 \= false |
| :---- |

`index.js` ho agrupa tot:

| export \* from './module1'export \* from './module2' |
| :---- |

I quan importes `IndexImport`:

| import \* as IndexImport from '../common' |
| :---- |

Obtens **tot** de cop:

| IndexImport.variable1  // → "Bob"IndexImport.variable2  // → "Kent"IndexImport.variable3  // → 222IndexImport.variable4  // → false |
| :---- |

**Apunts 07\_object-literal.test.js** 

## **Object Literal** 

## **Què és un object literal?**

És la manera de crear objectes directament amb `{}`:

| const persona \= {  nom: "Anna",  edat: 25} |
| :---- |

ES6 va afegir dues millores per escriure-los de manera més curta.

**1\. Shorthand — propietats amb el mateix nom**

Quan la **variable té el mateix nom que la propietat**, pots escriure-la una sola vegada:

const name \= "Godzilla"  
const power \= 1000

| // ❌ Manera antiga \-- repetitiu{ name: name, power: power }// ✅ Shorthand \-- més curt{ name, power } |
| :---- |

Les **funcions dins d'objectes** també tenen sintaxi curta:

| // ❌ Manera antiga{  attack: function(target) {    return \`${this.name} attacked ${target.name}\`  }}// ✅ Manera moderna{  attack(target) {    return \`${this.name} attacked ${target.name}\`  }} |
| :---- |

**2\. Propietats dinàmiques — nom calculat amb `[]`**

Pots usar una **expressió** com a nom de propietat posant-la entre `[]`:

| const type \= "twix"// ❌ Nom fix{ TWIX4: description }// ✅ Nom dinàmic \-- es calcula en temps d'execució{ \[type.toUpperCase() \+ type.length\]: description }// → { TWIX4: description } |
| :---- |

Útil quan el nom de la propietat no el saps fins que el programa s'executa.

**Resum**

|  | Antiga | Nova |
| ----- | ----- | ----- |
| Propietat | `{ name: name }` | `{ name }` |
| Funció | `{ fn: function() {} }` | `{ fn() {} }` |
| Nom dinàmic | no era possible | `{ [expressio]: valor }` |

**Apunts 08\_parameters.test.js** 

## **Paràmetres**  

**1\. Valors per defecte**

Quan un paràmetre és `undefined`, s'usa el valor per defecte:

| const getName \= (name \= "Mercury") \=\> namegetName("Aaron")    // → "Aaron"   ← usa el valor passatgetName()           // → "Mercury" ← usa el defectegetName(undefined)  // → "Mercury" ← undefined activa el defectegetName(null)       // → null      ← null NO activa el defecte\! |
| :---- |

**2\. Valors per defecte i `arguments`**

Els valors per defecte **no compten** com a arguments:

| const getName \= function(name \= "Mercury") {  return arguments.length;}getName("Aaron") // → 1 (ha passat 1 argument)getName()        // → 0 (no ha passat cap argument) |
| :---- |

⚠️ `arguments` no existeix dins de les **arrow functions** — usa funcions tradicionals si el necessites.

**3\. El valor per defecte pot ser una funció**

El valor per defecte **només s'executa quan és necessari**:

| const getName \= (name \= getDefault()) \=\> namegetName("Aaron") // → getDefault() NO s'executagetName()        // → getDefault() SÍ s'executa |
| :---- |

Útil per eficiència — si el valor per defecte és costós, no es calcula innecessàriament.

**4\. Rest params `...`**

Agafa tots els arguments que sobren en un **array real**:

| const resty \= (first, second, ...others) \=\> othersresty(1, 2)       // others \= \[\]     → length 0resty(1, 2, 3)    // others \= \[3\]    → length 1resty(1, 2, 3, 4) // others \= \[3, 4\] → length 2 |
| :---- |

**5\. Rest params vs `arguments`**

|  | `...rest` | `arguments` |
| ----- | ----- | ----- |
| Tipus | Array real ✅ | Objecte semblant a array ❌ |
| Té `.splice()` | ✅ | ❌ |
| Funciona en arrow functions | ✅ | ❌ |
| Compta paràmetres per defecte | ❌ | ✅ |

| const resty \= (...args) \=\> args        // array real ✅const argy \= function() { return arguments } // objecte ❌ |
| :---- |

**6\. Destructuring amb valor per defecte**

Pots combinar destructuring i valors per defecte:

| const myFunction \= ({   name \= "default",   age \= 0,   favoriteBand \= "unknown" } \= {}) \=\> { ... }myFunction()   // → usa {} per defecte, i cada propietat usa el seu defectemyFunction({}) // → objecte buit, cada propietat usa el seu defectemyFunction({ name: "Axel" }) // → name="Axel", age=0, favoriteBand="unknown" |
| :---- |

El `= {}` al final permet cridar la funció **sense cap argument**. 

**Apunts 09\_spread.test.js** 

## **Spread Operator** 

**Què és el spread operator?**

El `...` **expandeix** els elements d'un array o les propietats d'un objecte.

Imagina que tens una caixa amb coses dins — el spread **obre la caixa** i treu tot el contingut:

| const args \= \['a', 'b', 'c'\]// ❌ Sense spread \-- passa la caixa senceramyFunction(args)     // → a \= \['a','b','c'\], b \= undefined, c \= undefined// ✅ Amb spread \-- obre la caixamyFunction(...args)  // → a \= 'a', b \= 'b', c \= 'c' |
| :---- |

**3 usos principals**

**1\. Passar arguments a una funció:**

| const args \= \['a', 'b', 'c'\]myFunction(...args)  // equivalent a myFunction('a', 'b', 'c') |
| :---- |

**2\. Concatenar arrays:**

| const array1 \= \[1, 2, 3\]const array2 \= \[4, 5, 6\]// ❌ Antigaarray1.concat(array2)        // → \[1, 2, 3, 4, 5, 6\]// ✅ Spread\[...array1, ...array2\]       // → \[1, 2, 3, 4, 5, 6\] |
| :---- |

**3\. Fusionar objectes:**

| const obj1 \= { foo: "bar" }const obj2 \= { eggs: "spam" }// ✅ Spread{ ...obj1, ...obj2 }  // → { foo: "bar", eggs: "spam" } |
| :---- |

**Diferència arrays vs objectes**

| \[...array1, ...array2\]  // ← arrays → usa \[\]{ ...obj1, ...obj2 }    // ← objectes → usa {} |
| :---- |

**Spread vs Rest**

Semblen iguals però fan el contrari:

| // REST → agrupa arguments en un arrayconst resty \= (...args) \=\> argsresty(1, 2, 3)  // → \[1, 2, 3\]// SPREAD → expandeix un array en arguments separatsmyFunction(...args)  // → myFunction(1, 2, 3\) |
| :---- |

**Apunts 10\_class.test.js** 

## **Classes**

## **Què és una classe?**

És una **plantilla** per crear objectes. Defineix quines propietats i mètodes tindran els objectes creats a partir d'ella:

| class Animal {  constructor(name) {    this.name \= name;  }}const dog \= new Animal("Dog") // → { name: "Dog" } |
| :---- |

**Constructor**

S'executa automàticament quan crees un objecte amb `new`. Pot tenir valors per defecte:

| class Animal {  constructor(name \= "Honey Badger") {    this.name \= name;  }}new Animal()      // → name \= "Honey Badger"new Animal("Dog") // → name \= "Dog" |
| :---- |

**Mètodes d'instància**

Pertanyen a **cada objecte** creat amb `new`:

| class Animal {  constructor(name \= "Honey Badger") {    this.name \= name;  }  sayName() {    return \`My name is: ${this.name}\`  }}animal.sayName()  // ✅ funcionaAnimal.sayName()  // ❌ undefined |
| :---- |

**Mètodes estàtics**

Pertanyen a la **classe**, no a cada objecte:

| class Animal {  static create(name) {    return new Animal(name)  }}Animal.create("Dog")  // ✅ funcionaanimal.create()       // ❌ undefined |
| :---- |

Útils per crear fàbriques d'objectes o funcions utilitàries.

**Herència — `extends`**

Una classe pot heretar d'una altra:

| class Animal {  constructor(name \= "Honey Badger") {    this.name \= name;  }}class Dog extends Animal {  sayName() {    return \`My name is: ${this.name}\`  }}const dog \= new Dog("Fido")dog instanceof Dog    // → truedog instanceof Animal // → true ← Dog és un Animal\! |
| :---- |

El fill hereta tot del pare, però no a l'inrevés.

**Getters i Setters**

Permeten controlar com es llegeix i s'escriu una propietat:

| class Animal {  set name(newName) {    this.\_name \= newName        // guarda el valor  }  get name() {    return \`${this.\_name} type of animal\`  // retorna el valor modificat  }}animal.name \= "Dog"    // crida el setteranimal.name            // → "Dog type of animal" ← crida el getter |
| :---- |

El `_name` és una convenció per indicar que és una propietat "privada" interna.

**Resum**

| Element | Pertany a | Com s'accedeix |
| ----- | ----- | ----- |
| Constructor | Classe | `new Animal()` |
| Mètode normal | Instància | `animal.sayName()` |
| Mètode estàtic | Classe | `Animal.create()` |
| Getter/Setter | Instància | `animal.name` |

**Apunts 11\_set.test.js** 

## **Set** 

## **Què és un `Set`?**

És una col·lecció de valors **únics** — no permet duplicats. A diferència d'un array, si afegeixes un valor que ja existeix, simplement s'ignora:

| const mySet \= new Set()mySet.add(1)mySet.add(1)  // ← ignorat\!mySet.add(2)// → {1, 2}  només dos valors |
| :---- |

**Mètodes principals**

**Crear un Set:**

| const mySet \= new Set() |
| :---- |

**Afegir valors:**

| mySet.add(1)mySet.add("hola")mySet.add(true) |
| :---- |

**Comprovar si existeix:**

| mySet.has(1)  // → truemySet.has(4)  // → false |
| :---- |

**Diferència entre Set i Array**

|  | Array | Set |
| ----- | ----- | ----- |
| Duplicats | ✅ permet | ❌ no permet |
| Ordre | per índex | per inserció |
| Buscar element | `.includes()` | `.has()` |

**Cas d'ús típic**

Eliminar duplicats d'un array:

| const array \= \[1, 1, 2, 2, 3\]const unique \= \[...new Set(array)\]// → \[1, 2, 3\] |
| :---- |

**Apunts 12\_maps.test.js** 

## **Maps**  

**Què és un `Map`?**

És una col·lecció de parells **clau-valor** similar a un objecte, però amb dues diferències importants:

1. Les claus poden ser **qualsevol tipus** — no només strings  
2. No converteix les claus automàticament (**no fa coerció**)

**Mètodes principals**

| const myMap \= new Map() |
| :---- |

| myMap.set("name", "Aaron")  // afegeix clau-valormyMap.get("name")           // → "Aaron"myMap.has("name")           // → true |
| :---- |

**Crear amb valors directament:**

| const myMap \= new Map(\[\["name", "Aaron"\]\]) |
| :---- |

**Les claus poden ser qualsevol tipus**

| const user \= { name: "Aaron" }const value \= { twitter: "@js\_dev" }myMap.set(user, value)   // ← objecte com a clau ✅myMap.get(user)          // → { twitter: "@js\_dev" }myMap.has(user)          // → true |
| :---- |

Amb un objecte normal això no seria possible — les claus sempre serien strings.

**No fa coerció de claus**

| myMap.set(1, "Aaron")     // clau és el número 1myMap.get("1")            // → undefined ← "1" string ≠ 1 númeromyMap.get(1)              // → "Aaron" ✅ |
| :---- |

Un objecte normal convertiria `1` a `"1"` automàticament. El Map **no ho fa**.

**Diferència Map vs Objecte**

|  | Objecte |         Map |
| ----- | ----- | :---- |
| Tipus de clau | Solo strings | Qualsevol tipus |
| Coerció de claus | ✅ sí | ❌ no |
| Clau objecte | ❌ no | ✅ sí |

**Apunts 14\_promises.test.js** 

### **Què és una Promise?**

És una manera de gestionar operacions **asíncrones** — coses que no passen immediatament (peticions a un servidor, timeouts...).

Una Promise té tres estats:

* **Pending** → esperant el resultat  
* **Resolved** → ha funcionat ✅  
* **Rejected** → ha fallat ❌

**Com es crea**

| const pickApple \= (ripeness) \=\> {  return new Promise((resolve, reject) \=\> {    setTimeout(() \=\> {      if (ripeness \=== "ripe") {        resolve("ripe apple")  // ← tot bé      } else {        reject("unripe apple") // ← error      }    })  })} |
| :---- |

**Com es consumeix — `.then()` i `.catch()`**

`.then()` pot tenir **dos callbacks**:

* **1r** → s'executa si la promesa es **resol**  
* **2n** → s'executa si la promesa es **rebutja**

| pickApple("ripe")  .then(    (result) \=\> { /\* s'executa si resolt \*/ },    (error)  \=\> { /\* s'executa si rebutjat \*/ }  )  .catch((error) \=\> { /\* s'executa si hi ha error no capturat \*/ }) |
| :---- |

**Els 3 casos**

**Cas 1 — Promesa resolta:**

| pickApple("ripe")  // → resolve("ripe apple")  .then(    (result) \=\> { expect(result).toBe("ripe apple") }, // ✅ s'executa    (error)  \=\> { throw new Error("no s'executa") },   // ❌  )  .catch(() \=\> { throw new Error("no s'executa") })    // ❌ |
| :---- |

**Cas 2 — Promesa rebutjada amb string:**

| pickApple("unripe")  // → reject("unripe apple")  .then(    (result) \=\> { throw new Error("no s'executa") },   // ❌    (error)  \=\> { expect(error).toBe("unripe apple") } // ✅ s'executa  )  .catch(() \=\> { throw new Error("no s'executa") })    // ❌ ja capturat\! |
| :---- |

**Cas 3 — Promesa rebutjada amb Error:**

| pickApple()  // → reject(new Error("out of apples"))  .then(    (result) \=\> { throw new Error("no s'executa") },   // ❌  )  .catch((error) \=\> {    expect(error.message).toBe("out of apples")        // ✅ s'executa  }) |
| :---- |

**String vs Error object**

| reject("unripe apple")        // → stringexpect(error).toBe("unripe apple")  // ✅reject(new Error("out of apples"))  // → objecte Errorexpect(error.message).toBe("out of apples")  // ✅ cal accedir a .message |
| :---- |

**Flux visual**  
Promise  
  → resolve() → .then() 1r callback ✅  
  → reject()  → .then() 2n callback ✅ (si existeix)  
              → .catch() ✅ (si no hi ha 2n callback al .then())

**Apunts 15\_async-await.test.js** 

**Què és async/await?**

És una manera més **llegible** d'escriure promeses. En lloc de cadenes de `.then()` i `.catch()`, el codi sembla síncron (normal) però per dins segueix sent asíncron.

**`async` — marcar una funció com asíncrona**

| // Sense async \-- funció normalconst myFunction \= () \=\> { ... }// Amb async \-- funció asíncronaconst myFunction \= async () \=\> { ... } |
| :---- |

Una funció `async` sempre retorna una promesa automàticament.

**`await` — esperar el resultat**

`await` **para l'execució** fins que la promesa es resol:

| // ❌ Amb .then() \-- menys llegibledoAsync().then(result \=\> {  expect(result).toBe('resolved')})// ✅ Amb async/await \-- més llegibleconst result \= await doAsync()expect(result).toBe('resolved') |
| :---- |

⚠️ `await` només es pot usar dins d'una funció `async`

**Gestió d'errors — `try/catch`**

Equivalent al `.catch()` de les promeses:

| // ❌ Amb .catch()doAsync(true).catch(error \=\> {  expect(error).toBe('rejected')})// ✅ Amb try/catchtry {  await doAsync(true)  // → falla → va al catch} catch (error) {  expect(error).toBe('rejected')} |
| :---- |

**Comparativa completa**

| Promeses | Async/Await |
| ----- | ----- |
| `.then(result => {})` | `const result = await` |
| `.catch(error => {})` | `try {} catch(error) {}` |
| `return promise` | `await promise` |

**Resum**

| // Promesa resoltaasync () \=\> {  const result \= await doAsync()  // espera el resultat  // usa result aquí}// Promesa rebutjadaasync () \=\> {  try {    await doAsync(true)  } catch (error) {    // gestiona l'error aquí  }} |
| :---- |

**Apunts 17\_public-class-fields.test.js** 

## **Public Class Fields**

## **El problema**

Quan passes un mètode d'una classe com a callback, `this` es perd:

| class MyComponent {  handleClick() {    this.props.onClick() // ❌ this és undefined\!  }} |
| :---- |

**Solució antiga — `.bind(this)`**

| constructor() {  this.handleClick \= this.handleClick.bind(this) // 😢 feixuc} |
| :---- |

Has de fer-ho per **cada mètode** — és repetitiu i avorrit.

**Solució moderna — Public Class Field**

Defineix el mètode com una **arrow function** directament a la classe:

| class MyComponent {  // ❌ Mètode normal \-- this es pot perdre  handleClick({ target: { value } }) {    this.props.onClick(value)  }  // ✅ Public class field \-- this sempre correcte  handleClick \= ({ target: { value } }) \=\> {    this.props.onClick(value)  }} |
| :---- |

La diferència és el `=` i la `=>` — converteix el mètode en un camp de la classe amb una arrow function.

**Per què funciona?**

Les arrow functions **no tenen el seu propi `this`** — hereten el de la classe automàticament. Per tant `this` sempre serà la instància correcta.

**`jest.fn()`**

És una **funció mock** de Jest — una funció falsa que registra totes les vegades que s'ha cridat i amb quins arguments:

| const onClick \= jest.fn()onClick("hello")onClick("world")expect(onClick).toHaveBeenCalledTimes(2)       // → s'ha cridat 2 vegadesexpect(onClick).toHaveBeenCalledWith("hello")  // → s'ha cridat amb "hello" |
| :---- |

Útil per comprovar que una funció s'ha cridat correctament sense executar codi real.

**Resum**  
Mètode normal        → this es pot perdre ❌  
.bind(this)          → solució antiga, feixuga 😢  
handleClick \= () \=\>  → public class field, this sempre correcte ✅

**Apunts 26\_array-transformations.test.js** 

## **Array Transformations**  

**`.map()` — transformar cada element**

Retorna un **array nou** amb cada element transformat:

| \[1, 2, 3, 4\].map(num \=\> num \* num)// → \[1, 4, 9, 16\] |
| :---- |

L'array original **no es modifica**. Sempre retorna un array de la **mateixa longitud**.

**`.filter()` — filtrar elements**

Retorna un **array nou** només amb els elements que compleixen la condició:

| \[1, 2, 3, 4\].filter(num \=\> num % 2 \=== 0)// → \[2, 4\] |
| :---- |

**`.find()` — trobar el primer element**

Retorna el **primer element** que compleix la condició:

| \[1, 10, 8, 11\].find(num \=\> num \> 10)// → 11 |
| :---- |

A diferència de `.filter()`, retorna **un sol element**, no un array.

**`.reduce()` — acumular en un valor**

Redueix tot l'array a **un sol valor**:

| \[13, 7, 8, 21\].reduce((acc, num) \=\> acc \+ num, 0)// acc=0  \+ 13 \= 13// acc=13 \+ 7  \= 20// acc=20 \+ 8  \= 28// acc=28 \+ 21 \= 49// → 49 |
| :---- |

* `acc` → acumulador (el total fins ara)  
* `num` → element actual  
* `0` → valor inicial

**`.every()` — comprova si TOTS compleixen**

| \[11, 12, 13\].every(num \=\> num \> 10)  // → true  (tots \> 10\)\[8, 11, 12\].every(num \=\> num \> 10)   // → false (8 no \> 10\) |
| :---- |

**`.some()` — comprova si ALGUN compleix**

| \[8, 11, 12\].some(num \=\> num \> 10)  // → true  (11 i 12 \> 10\)\[1, 2, 3\].some(num \=\> num \> 10)    // → false (cap \> 10\) |
| :---- |

**Encadenar mètodes**

Pots combinar mètodes en una sola línia:

| numbers  .filter(num \=\> num \>= 10)   // \[10, 15, 17, 11, 12\]  .map(num \=\> num \* 2)        // \[20, 30, 34, 22, 24\]  .reduce((acc, num) \=\> acc \+ num, 0)  // → 130 |
| :---- |

**Resum**

| Mètode | Fa | Retorna |
| ----- | ----- | ----- |
| `.map()` | Transforma cada element | Array nou (mateixa longitud) |
| `.filter()` | Filtra elements | Array nou (menys elements) |
| `.find()` | Busca el primer element | Un element |
| `.reduce()` | Acumula en un valor | Un valor |
| `.every()` | Tots compleixen? | `true`/`false` |
| `.some()` | Algun compleix? | `true`/`false` |

**Apunts 27\_callbacks.test.js** 

## **Callbacks**  

**Què és un callback?**

És una **funció que passes com a argument** a una altra funció perquè s'executi en algun moment:

| // La funció rep un número i un callbackconst processNumber \= (number, callback) \=\> {  callback(number)  // ← executa el callback amb el número}processNumber(5, (num) \=\> console.log(num)) // → 5 |
| :---- |

**Callback bàsic**

| const processNumber \= (number, callback) \=\> {  callback(number)}La funció rep el callback i el crida amb el valor. |
| :---- |

**Callback amb retorn**

Si necessites el resultat del callback, has de fer `return`:

| // ❌ Sense return \-- result és undefinedconst calculator \= (n1, n2, callback) \=\> {  callback(n1, n2)}// ✅ Amb return \-- result és el valor calculatconst calculator \= (n1, n2, callback) \=\> {  return callback(n1, n2)}const result \= calculator(3, 4, (a, b) \=\> a \+ b) // → 7 |
| :---- |

**Callback asíncron**

Quan vols esperar abans d'executar el callback, uses `setTimeout`:

| const waitAndGreet \= (name, callback) \=\> {  setTimeout(() \=\> {    callback(name)  // ← s'executa després de 2 segons  }, 2000)} |
| :---- |

⚠️ El callback ha d'estar **dins** del `setTimeout`, no fora.

**Callback amb arrays**

Pots cridar un callback per cada element d'un array amb `.forEach()`:

| const processElements \= (elements, callback) \=\> {  elements.forEach(element \=\> callback(element))}processElements(\["a", "b", "c"\], el \=\> el.toUpperCase())// → "A", "B", "C" |
| :---- |

**Callbacks encadenats**

Pots encadenar callbacks per fer múltiples transformacions:

| double(5, (result1) \=\> {        // result1 \= 10  addTen(result1, (result2) \=\> { // result2 \= 20    finalResult \= result2  })}) |
| :---- |

Cada callback rep el resultat de l'anterior.

**`jest.fn()` — mock callback**

Per comprovar que un callback s'ha cridat correctament:

| const mockCallback \= jest.fn()processNumber(5, mockCallback)expect(mockCallback).toHaveBeenCalledWith(5)  // s'ha cridat amb 5?expect(mockCallback).toHaveBeenCalledTimes(1) // s'ha cridat 1 vegada? |
| :---- |

**Resum**  
Callback → funció passada com a argument  
return   → necessari si vols el resultat  
setTimeout \+ callback → operacions asíncrones  
forEach \+ callback → processar arrays  
Encadenats → resultat d'un és input del següent

**Apunts 16\_es2017.js** 

## **ES2016 i ES2017**  

**Operador d'exponenciació `**`**

Eleva un número a la potència d'un altre:

| // ❌ AntigaMath.pow(3, 2)  // → 9// ✅ Moderna3 \*\* 2  // → 93 \*\* 3  // → 27 |
| :---- |

**`.includes()` per arrays**

Comprova si un element existeix a l'array:

| // ❌ Antiga \-- confusaarray.indexOf(element) \!== \-1// ✅ Moderna \-- llegiblearray.includes(element)  // → true / false |
| :---- |

**ES2017**

**`.padStart()` — afegir caràcters a l'inici**

Omple el string per l'esquerra fins arribar a la longitud indicada:

| "Worlds Finest".padStart(17)// → "    Worlds Finest" (4 espais \+ 13 caràcters \= 17\)"5".padStart(3, "0")// → "005" |
| :---- |

**`.padEnd()` — afegir caràcters al final**

Igual que `.padStart()` però per la dreta:

| "Stronger Together".padEnd(27, "-123-123-1")// → "Stronger Together-123-123-1" |
| :---- |

**`Object.values()` — obtenir valors**

Retorna un array amb tots els **valors** de l'objecte:

| const obj \= { a: 1, b: 2, c: 3 }Object.values(obj)  // → \[1, 2, 3\] |
| :---- |

**`Object.entries()` — obtenir parells clau-valor**

Retorna un array de parells `[clau, valor]`:

| const obj \= { a: 1, b: 2 }Object.entries(obj)// → \[\["a", 1\], \["b", 2\]\] |
| :---- |

**Trailing commas**

Des d'ES2017 pots posar coma després de l'últim paràmetre — útil per a Git:

| function foo(  a,  b,  c,  // ← coma final ✅) {} |
| :---- |

⚠️ Els **rest params** (`...rest`) no poden tenir coma final:

| function bar(  a,  b,  ...rest   // ← sense coma ✅) {} |
| :---- |

**Resum Object methods**

| Object.keys(obj)    // → \["a", "b", "c"\]  clausObject.values(obj)  // → \[1, 2, 3\]        valorsObject.entries(obj) // → \[\["a",1\], ...\]   parells |
| :---- |

**Apunts 18\_symbols.js** 

## **Symbols** 

## **Què és un Symbol?**

És un tipus de dada **únic i immutable** introduït a ES6. Cada Symbol creat és diferent de tots els altres, fins i tot si tenen la mateixa descripció:

| Symbol("hola") \=== Symbol("hola") // → false\! sempre únics |
| :---- |

**Crear un Symbol**

| const symbol \= Symbol()                    // sense descripcióconst symbol \= Symbol("la meva etiqueta") // amb descripció |
| :---- |

La descripció és només una **etiqueta per humans** — no afecta el valor ni la unicitat.

**Convertir a string**

| const symbol \= Symbol("use the force")String(symbol)  // → "Symbol(use the force)" |
| :---- |

**Sempre únics**

| const s1 \= Symbol()const s2 \= Symbol()s1 \=== s2  // → falseconst s3 \= Symbol("igual")const s4 \= Symbol("igual")s3 \=== s4  // → false ← mateixa descripció però diferents\! |
| :---- |

**Symbols com a claus d'objectes**

Els Symbols es poden usar com a claus d'objectes amb `[]`:

| const symbol \= Symbol("metadata")const game \= {  name: "The Legend of Zelda",  \[symbol\]: { fans: "about a billion" }  // ← clau Symbol}game\[symbol\]  // → { fans: "about a billion" } |
| :---- |

**Symbols i JSON**

Els Symbols són **invisibles** per a `JSON.stringify` — no es serialitzen:

| JSON.stringify(game)// → {"name":"The Legend of Zelda"} ← el symbol no apareix\! |
| :---- |

Útil per guardar **metadades privades** en un objecte.

**Resum**

| Symbol()           → valor únicSymbol("etiqueta") → únic amb descripciós1 \=== s2          → sempre false\[symbol\]: valor    → clau privada a l'objecteJSON.stringify     → ignora els Symbols |
| :---- |

**Apunts 20\_generators.js** 

## **Generators**

## **Què és un generator?**

És una funció especial amb `*` que pot **pausar** la seva execució i reprendre-la després:

| function\* giveMeOddNumbers() {  yield 1  // ← pausa i retorna 1  yield 3  // ← pausa i retorna 3  yield 5  // ← pausa i retorna 5} |
| :---- |

**Com funciona**

Cada vegada que crides `.next()` avança al següent `yield`:

| const gen \= giveMeOddNumbers() |
| :---- |

| gen.next() // → { value: 1, done: false }gen.next() // → { value: 3, done: false }gen.next() // → { value: 5, done: false }gen.next() // → { value: undefined, done: true } ← acabat\! |
| :---- |

Cada `.next()` retorna un objecte amb:

* `value` → el valor del `yield`  
* `done` → `false` si queden yields, `true` si ha acabat

**Iterar amb `for...of`**

En lloc de cridar `.next()` manualment, pots usar `for...of`:

| for (let num of giveMeOddNumbers()) {  console.log(num) // → 1, 3, 5}S'atura automàticament quan done és true. |
| :---- |

**Generators vs Async/Await**  
Generator  → síncron, pausa amb yield  
Async/Await → asíncron, pausa amb await

Els generators **no són** asíncrons — s'executen línia per línia com el codi normal.

**Resum**

| function\* → declara un generatoryield     → pausa i retorna un valor.next()   → avança al següent yielddone      → true quan no queden yieldsfor...of  → itera tots els valors automàticament |
| :---- |

**Apunts 22\_proxies.js** 

## **Proxies** 

## **Què és un Proxy?**

És un **embolcall** al voltant d'un objecte que pot interceptar i modificar operacions com llegir, escriure o eliminar propietats:

| const proxy \= new Proxy(objecteOriginal, handler)//                      ↑                ↑//                  l'objecte        interceptors |
| :---- |

**Handler buit — sense interceptors**

| const proxy \= new Proxy(character, {}) |
| :---- |

El proxy és **referencialmente diferent** però té el **mateix contingut**:

| proxy \!== character  // ← objectes diferents en memòriaproxy \== character   // ← mateix contingut |
| :---- |

**Interceptors del handler**

**`get`** — intercepta les lectures:

| get(target, key) {  return target\[key\]} |
| :---- |

**`set`** — intercepta les assignacions:

| set(target, key, value) {  target\[key\] \= value  return true  // ← obligatori retornar true} |
| :---- |

**`deleteProperty`** — intercepta les eliminacions:

| deleteProperty(target, key) {  if (key.startsWith('\_')) {    return true  // ← simula eliminació però no la fa  }  delete target\[key\]  return true} |
| :---- |

**`apply`** — intercepta les crides a funcions:

| apply(target, thisArg, args) {  const result \= target.apply(thisArg, args)  return result  // ← pots modificar el resultat} |
| :---- |

**Casos d'ús**

**Protegir propietats:**

| // propietats que comencen amb \_ no es poden eliminardeleteProperty(target, key) {  if (key.startsWith('\_')) return true  delete target\[key\]  return true} |
| :---- |

**Índexs negatius en arrays:**

| get(target, key) {  const index \= Number(key)  if (index \< 0) return target\[target.length \+ index\]  return target\[key\]}// proxy\[-1\] → últim element |
| :---- |

**Filtrar informació sensible:**

| get(target, key) {  const index \= Number(key)  if (index \< 0) return target\[target.length \+ index\]  return target\[key\]}// proxy\[-1\] → últim element |
| :---- |

**Resum**

| new Proxy(obj, {})     → embolcall sense interceptorshandler.get            → intercepta lectureshandler.set            → intercepta assignacionshandler.deleteProperty → intercepta eliminacionshandler.apply          → intercepta crides a funcions |
| :---- |

**Apunts 23\_es2021.js** 

## ES2021 (ES12)

Noves funcionalitats introduïdes per millorar l'assignació lògica, la lectura de números i la gestió de promeses.

Operadors d'assignació lògica

Combinen un operador lògic (`&&`, `||`, `??`) amb l'assignació (`=`):

**`&&=` — Assignació AND lògica:**

Només assigna si el valor actual és **truthy**.

a &&= 'assigned'   
*// Si a és true, ara val 'assigned'*

**`||=` — Assignació OR lògica:**

Assigna si el valor actual és **falsy** (false, 0, "", null, undefined, NaN).

b ||= 'default'  
*// Si b és false o 0, ara val 'default'*

**`??=` — Assignació de nul·litat (Nullish):**

Assigna només si el valor actual és **null** o **undefined**.

c ??= 'fallback'  
*// Si c és null, ara val 'fallback'. Si fos 0, no canviaria.*

Separadors numèrics (`_`)

Milloren la llegibilitat visual de números grans sense canviar-ne el valor:

| const largeNumber \= 1\_000\_000// És exactament igual a 1000000 |
| :---- |

* Es poden fer servir amb decimals: `1_500.50`  
* No poden anar al principi ni al final del número.

`Promise.any()`

Gestiona un array de promeses i retorna la **primera que es resolgui correctament** (*fulfilled*):

| const result \= await Promise.any(promises) |
| :---- |

* **Ignora els errors:** Si una promesa falla, continua esperant la següent.  
* **Èxit:** Retorna el valor de la primera promesa que funcioni.  
* **Fracàs total:** Si totes les promeses fallen, llança un `AggregateError` (un error que conté tots els errors individuals).

Resum

`a &&= b`    → Assigna si `a` és **truthy**

`a ||= b`    → Assigna si `a` és **falsy**

`a ??= b`    → Assigna si `a` és **null/undefined**

`1_000` 	→ Millora la **llegibilitat**

`Promise.any` → Primera promesa **resolta amb èxit**

**Apunts 24\_es2022.js** 

## ES2022 (ES13)

Noves funcionalitats centrades en l'encapsulament de classes, la simplificació de l'accés a índexs i l'ús asíncron en mòduls.

### **Class Fields i mètodes privats (\#)**

Introdueix una manera nativa de protegir dades dins de les classes sense dependre de convencions (com l'ús d'un guió baix \_).

* Camps privats (\#propietat): Es declaren amb el prefix \#. Són totalment inaccessibles des de fora de la classe.  
* JavaScript


| class Person {  \#secret \= "secret"; // Camp privat} |
| :---- |

* **Mètodes privats (\#metode())**: Només poden ser cridats des de l'interior de la pròpia classe.  
* **Camps estàtics (static)**: Permeten definir propietats que pertanyen a la classe en sí, i no a les instàncies. Es criden amb Classe.propietat.

### **Mètode .at() per a indexació**

Una alternativa més neta als claudàtors \[\] per accedir a elements d'**Arrays** i **Strings**, especialment útil per comptar des del final.

* **Índexs positius**: Funcionen igual que \[i\].  
* **Índexs negatius**: Permeten accedir al final de la llista sense fer càlculs amb .length.  
  * .at(-1) → Últim element.  
  * .at(-2) → Penúltim element.  
* **Exemple**:

|    const array \= \[1, 2, 3, 4\];    array.at(\-1); // 4 |
| :---- |

**Top-level await**

| const result \= await Promise.resolve("Top-level await works\!"); expect(result).toBe("Top-level await works\!");}); |
| :---- |

Permet utilitzar la paraula clau \`await\` directament en el nivell superior (scope global) d'un mòdul, sense necessitat d'embolcallar-ho en una funció \`async\`.

* **Simplificació**: Ideal per carregar recursos, configurar bases de dades o importar mòduls de forma dinàmica abans que s'executi la resta del codi.  
* **Flux:** L'execució del mòdul s'atura fins que la promesa es resol.  
* **Requisit:** Només funciona en fitxers definits com a mòduls (ES Modules).

**Resum**

* privat  → Dades i mètodes realment ocults fora de la classe.  
* static → Propietat de la classe, no de l'objecte creat.  
* .at(-1) → Accés ràpid a l'últim element (Array o String).  
* await global → Adéu a les funcions \`async\` només per arrencar un fitxer.

**Apunts 25\_es2023.js** 

## ES2023 (ES14)

## 1\. Cerca en Arrays des del final (ES2023)

Fins ara, per trobar l'últim element que complís una condició, sovint havíem de fer un `.reverse()` de l'array, cosa que no era gaire eficient.

* **`findLast()`**: Recorre l'array de **dreta a esquerra** i retorna el **valor** del primer element que coincideix amb la condició.  
* **`findLastIndex()`**: Fa el mateix, però retorna la **posició (índex)** d'aquell element.

**Exemple:** A `[1, 2, 3, 4, 5]`, l'últim número parell és el `4` (índex `3`).

2\. Hashbang Grammar

El **Hashbang** (o Shebang) és el prefix `#!` que es posa al principi dels fitxers per indicar al sistema operatiu quin intèrpret ha de fer servir (ex: `#!/usr/bin/env node`).

* **Novetat:** Abans, si posaves això en un fitxer `.js`, el motor de JavaScript donava un error de sintaxi perquè no reconeixia els caràcters `#!`.  
* **ES2023:** Ara l'estàndard permet que el motor **ignori** aquesta primera línia, facilitant que els scripts de Node.js s'executin directament a la terminal sense errors.

3\. Symbol.prototype.description

Els **Symbols** són identificadors únics i privats. Quan els creem, podem posar-los una etiqueta o descripció opcional per identificar-los millor durant el "debugging".

* **Propietat `.description`**: És una forma directa d'accedir a aquest text descriptiu.  
* **Abans:** Havies de fer servir `.toString()` i manipular la cadena de text per extreure el nom. Ara és una propietat neta i llegible.

Resum

| Característica | Utilitat |
| :---- | :---- |
| **`findLast` / `Index`** | Trobar l'últim element sense haver de girar l'array. |
| **Hashbangs** | Compatibilitat oficial per a scripts executables en JS. |
| **`.description`** | Accés fàcil al nom descriptiu d'un `Symbol`. |

 

