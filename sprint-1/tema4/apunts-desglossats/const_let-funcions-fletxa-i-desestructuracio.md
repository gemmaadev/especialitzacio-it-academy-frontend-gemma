## **JavaScript Modern: `const`/`let`, funcions fletxa i desestructuració**

**El context: per què va canviar JavaScript?**

ES6 (ECMAScript 2015\) va ser la major actualització de JavaScript des de la seva creació. JavaScript ha canviat més en l'última dècada que en els vint anys anteriors. Quan va arribar ES6, les funcions fletxa, les classes, els mòduls, les promeses, la desestructuració i dotzenes d'altres funcionalitats van transformar JavaScript d'un llenguatge amb quirks coneguts en un llenguatge modern i potent.

**`var` i els seus problemes**

Abans d'ES6, `var` era l'única manera de declarar variables. El problema: `var` té **function scope**, no block scope. Això vol dir que una variable declarada dins d'un `if` o un `for` "s'escapa" cap a l'exterior:

| // var: el problema del scopefunction demoProblema() {  if (true) {    var escapada \= 'existeixo fora del bloc\!';  }  console.log(escapada);  // ✅ funciona... però no hauria}// var: es pot redeclarar sense error (causa bugs silenciosos)var nom \= 'Anna';var nom \= 'Gema';  // ✅ cap error\! Però sobreescriu la primeraconsole.log(nom);  // 'Gema'// var: hoisting (la variable puja al capdamunt de la funció)console.log(edat);  // undefined (no error, però tampoc el valor)var edat \= 25; |
| :---- |

**`const` i `let`: block scope**

L'antiga paraula clau `var` té function scope i permet la redeclaració, cosa que sovint porta a bugs. `let` i `const` introdueixen el block scope (`{...}`). `const` s'usa per a variables que mai s'han de reassignar: és la opció per defecte preferida. `let` s'usa per a variables el valor de les quals canviarà.

| // let i const: block scopefunction demoModern() {  if (true) {    let blockLet \= 'solo existo aquí';    const blockConst \= 'tampoco salgo';  }  // console.log(blockLet);   // ❌ ReferenceError  // console.log(blockConst); // ❌ ReferenceError}// const: no es pot reassignarconst API\_KEY \= 'a1b2c3d4';// API\_KEY \= 'autre';  // ❌ TypeError// Però atenció: const amb objectes i arraysconst usuari \= { nom: 'Anna', edat: 25 };usuari.edat \= 26;        // ✅ pots modificar propietatsusuari.ciutat \= 'BCN';   // ✅ pots afegir propietats// usuari \= {};          // ❌ però no pots reassignar la variable |
| :---- |

Usa `const` per defecte. Canvia a `let` únicament quan necessites reassignar. Mai uses `var`. Aquesta convenció fa el codi més fàcil d'entendre perquè la majoria de variables no haurien de canviar després de la inicialització.

**Funcions fletxa: sintaxi concisa i `this` heretat**

Les funcions fletxa proporcionen una sintaxi més concisa per a les expressions de funció i solucionen un problema important amb la paraula clau `this` en les funcions tradicionals.

**La sintaxi pas a pas:**

| // Funció tradicionalfunction suma(a, b) {  return a \+ b;}// Expressió de funció tradicionalconst suma \= function(a, b) {  return a \+ b;};// Funció fletxa equivalentconst suma \= (a, b) \=\> {  return a \+ b;};// Funció fletxa amb return implícit (una sola expressió)const suma \= (a, b) \=\> a \+ b;// Un sol paràmetre: no calen parèntesisconst doble \= x \=\> x \* 2;// Sense paràmetres: calen parèntesis buitsconst saluda \= () \=\> 'Hola món\!'; |
| :---- |

Els parèntesis es poden ometre si la funció té un sol paràmetre simple. Si té múltiples paràmetres, cap paràmetre, o paràmetres per defecte o desestructurats, els parèntesis al voltant de la llista de paràmetres són obligatoris.

**Quan usar funcions fletxa vs. funcions tradicionals:**

Usa funcions fletxa per a callbacks, mètodes d'arrays (`map`, `filter`, `reduce`) i funcions curtes en línia. Usa funcions tradicionals per a mètodes d'objectes, constructors i quan necessites el teu propi binding de `this`.

| // ✅ Perfecte per a mètodes d'arraysconst nombres \= \[1, 2, 3, 4, 5\];const parells \= nombres.filter(n \=\> n % 2 \=== 0);     // \[2, 4\]const dobles \= nombres.map(n \=\> n \* 2);                // \[2, 4, 6, 8, 10\]const total \= nombres.reduce((acc, n) \=\> acc \+ n, 0);  // 15// ❌ Evitar com a mètode d'objecte (this incorrecte)const persona \= {  nom: 'Anna',  saluda: () \=\> \`Hola, soc ${this.nom}\`  // this no apunta a persona\!};// ✅ Usar funció tradicional per a mètodesconst persona \= {  nom: 'Anna',  saluda() { return \`Hola, soc ${this.nom}\`; }  // this apunta a persona}; |
| :---- |

**Desestructuració: extreure dades elegantment**

La desestructuració és una manera convenient d'extreure múltiples valors d'estructures de dades (objectes o arrays) i assignar-los a variables. Simplifica el codi i redueix la redundància.

**Desestructuració d'objectes:**

| const usuari \= {  nom: 'Anna',  edat: 25,  ciutat: 'Barcelona',  rol: 'developer'};// Sense desestructuració (verbós)const nom \= usuari.nom;const edat \= usuari.edat;// Amb desestructuració (net i concís)const { nom, edat } \= usuari;console.log(nom);   // 'Anna'console.log(edat);  // 25// Canviar el nom de la variableconst { nom: nomUsuari, edat: edatUsuari } \= usuari;console.log(nomUsuari);  // 'Anna'// Valors per defecteconst { pais \= 'Espanya' } \= usuari;console.log(pais);  // 'Espanya' (no existia a l'objecte)// Desestructurar directament als paràmetres d'una funciófunction mostrarUsuari({ nom, edat, ciutat }) {  return \`${nom}, ${edat} anys, de ${ciutat}\`;}mostrarUsuari(usuari);  // 'Anna, 25 anys, de Barcelona' |
| :---- |

**Desestructuració d'arrays:**

| const colors \= \['vermell', 'verd', 'blau'\];// Sense desestructuracióconst primer \= colors\[0\];const segon \= colors\[1\];// Amb desestructuracióconst \[primer, segon, tercer\] \= colors;console.log(primer);  // 'vermell'// Saltar elementsconst \[, , tercer\] \= colors;console.log(tercer);  // 'blau'// Recollir la resta amb rest operatorconst \[cap, ...resta\] \= colors;console.log(cap);    // 'vermell'console.log(resta);  // \['verd', 'blau'\]// Intercanviar variables sense variable temporallet a \= 1, b \= 2;\[a, b\] \= \[b, a\];console.log(a, b);  // 2 1 |
| :---- |

**Template Literals: strings modernes**

Tot i que no és el tema principal dels apunts, és un canvi d'ES6 que va de la mà dels anteriors:

| const nom \= 'Anna';const edat \= 25;// Abans: concatenacióconst missatge \= 'Hola, ' \+ nom \+ '\! Tens ' \+ edat \+ ' anys.';// ES6: template literals amb backticksconst missatge \= \`Hola, ${nom}\! Tens ${edat} anys.\`;// Multi-línia sense escaparconst html \= \`  \<div class="card"\>    \<h2\>${nom}\</h2\>    \<p\>${edat} anys\</p\>  \</div\>\`;// Expressions dins de ${}const preu \= 19.99;const iva \= \`Preu amb IVA: ${(preu \* 1.21).toFixed(2)}€\`; |
| :---- |

**Resum** 

`const` per a valors de configuració i la majoria de variables. `let` per a quan el valor canviarà (comptadors de bucles, valors temporals reassignables). Evita `var` en JavaScript modern.

|  | `var` | `let` | `const` |
| ----- | ----- | ----- | ----- |
| **Scope** | Function | Block | Block |
| **Redeclarable** | Sí ⚠️ | No | No |
| **Reassignable** | Sí | Sí | No |
| **Hoisting** | Sí (undefined) | No (TDZ) | No (TDZ) |
| **Quan usar** | ❌ Mai | Valors que canvien | La majoria de casos |

