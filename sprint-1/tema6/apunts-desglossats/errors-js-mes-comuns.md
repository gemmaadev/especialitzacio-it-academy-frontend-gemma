###### **Troubleshooting JavaScript: Errors comuns i com solucionar-los**

###### 

###### **Troubleshooting JavaScript**

[https://developer.mozilla.org/en-US/docs/Learn\_web\_development/Core/Scripting/What\_went\_wrong\#types\_of\_error](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong#types_of_error)  
Errors més comuns de JavaScript i com solucionar-los amb exemples.

###### **Common JavaScript Errors**

[https://rollbar.com/blog/top-10-javascript-errors-from-1000-projects-and-how-to-avoid-them/](https://rollbar.com/blog/top-10-javascript-errors-from-1000-projects-and-how-to-avoid-them/)  
Top 10 errors de JS més freqüents i consells per evitar-los.

**Com llegir un missatge d'error: la primera habilitat**

Quan JavaScript llança un error, el missatge a la consola conté tota la informació necessària per trobar i resoldre el problema. El format és sempre: tipus d'error, missatge descriptiu, fitxer, línia i columna.

| Uncaught TypeError: Cannot read properties of undefined (reading 'nom')    at mostrarPerfil (app.js:47:18)     ← fitxer i línia    at carregar (main.js:12:5) |
| :---- |

Llegeix el stack trace de dalt a baix: l'error és a `app.js`, línia 47\. La funció `mostrarPerfil` va ser cridada des de `carregar` a `main.js`. Vés directament a aquella línia.

Sempre comença llegint el missatge d'error amb atenció, comprovant errors comuns com errades tipogràfiques, problemes de scope o tipus de dades incorrectes.

**Els dos tipus d'error: sintaxi vs. lògica**

* **Errors de sintaxi** — el codi no és JavaScript vàlid. El navegador els detecta immediatament i no executa cap línia. La consola indica la línia exacta. Causes habituals: parèntesis que falten, cometes mal aparellades, operadors incorrectes.  
* **Errors de lògica** — el codi és vàlid però fa alguna cosa diferent del que vols. Aquests son els més difícils de trobar perquè el navegador no dona cap error: el codi s'executa, però el resultat és incorrecte o apareix en el lloc equivocat.

| // Error de sintaxi: el navegador el detecta immediatamentfunction calcular(a, b {   // ← falta el )  return a \+ b;}// → SyntaxError: Unexpected token '{'// Error de lògica: el codi funciona però el resultat és incorrectefunction calcular(a, b) {  return a \- b;   // hauria de ser a \+ b, però no dona cap error}calcular(5, 3);   // → 2 (incorrecte, hauria de ser 8\) |
| :---- |

**Error 1: `Uncaught TypeError: Cannot read properties of undefined/null`**

Consistentment reportat com un dels errors JavaScript més comuns en entorns de development i producció. Ocorre quan el teu codi intenta accedir a una propietat o cridar un mètode sobre un valor que és `undefined` o `null`.

**Les tres causes principals:**

| // Causa A: variable declarada però no assignadalet persona;console.log(persona.nom);  // ❌ persona és undefined// Causa B: querySelector retorna null (element no existeix al DOM)const boto \= document.querySelector('\#boto-inexistent');boto.addEventListener('click', fn);  // ❌ boto és null// Causa C: dades de l'API que no han carregat (race condition)let usuari \= null;carregarUsuari();                  // asíncron, no esperaconsole.log(usuari.nom);           // ❌ usuari encara és null |
| :---- |

**Les solucions modernes:**

| // ✅ Optional Chaining: retorna undefined en lloc d'errorconsole.log(persona?.nom);boto?.addEventListener('click', fn);console.log(resposta?.dades?.usuari?.nom);// ✅ Guard clauseif (\!persona) return;console.log(persona.nom);// ✅ Valor per defecte amb Nullish Coalescingconst nom \= persona?.nom ?? 'Anònim';const llista \= resposta?.items ?? \[\];// ✅ DOMContentLoaded per a elements del DOMdocument.addEventListener('DOMContentLoaded', () \=\> {  const boto \= document.querySelector('\#boto');  if (boto) boto.addEventListener('click', fn);}); |
| :---- |

Tant `null` com `undefined` no tenen propietats que puguis accedir. Per tant, no pots usar accessors de propietats sobre ells ni desestructurar-los.

**Error 2: `TypeError: X is not a function`**

Ocorre en Chrome quan crides una funció indefinida. A mesura que les tècniques de codificació JavaScript s'han tornat més sofisticades, hi ha hagut un increment en la proliferació de scopes auto-referenciats dins de callbacks i closures, que son una font bastant comú d'aquesta confusió.

| // ❌ Crida un mètode d'arrays sobre un objecteconst sharks \= { shark1: 'sammy', shark2: 'shelly' };sharks.map(s \=\> s);  // ❌ map() és d'arrays, no d'objectes// → Uncaught TypeError: sharks.map is not a function// ❌ Propietat que és un string, no una funcióconst usuari \= { nom: 'Anna', saluda: 'Hola\!' };usuari.saluda();  // ❌ saluda és un string, no una funció// ❌ Error de this en event listenerfunction clearBoard() { alert("Cleared"); }document.addEventListener("click", function() {  this.clearBoard();  // ❌ 'this' és document, no window});// ✅ Solució per al this: funció guardada o .bind()document.addEventListener("click", function() {  clearBoard();              // ✅ referència directa  // o: this.clearBoard.bind(this)();}); |
| :---- |

**Error 3: `ReferenceError: X is not defined`**

El `ReferenceError` sovint está lligat a les teves variables i el scope. La variable `sammmy`, amb tres `m`s, no existeix i no està definida. Revisar el codi per a qualsevol errada ortogràfica pot ajudar a prevenir errors de variable indefinida.

| // ❌ Errada tipogràficalet sammy \= 'A Shark';console.log(sammmy);  // ❌ tres 'm'// → ReferenceError: sammmy is not defined// ❌ Variable fora del scopefunction sharkName() {  console.log(shark);  // ❌ usada abans de declarar  let shark \= 'sammy';}// → ReferenceError: Cannot access 'shark' before initialization// ❌ Event sense paràmetre en Firefoxbutton.onclick \= function() {  console.log(event);  // ❌ Firefox no afegeix 'event' automàticament};// ✅ Solució: passar event explícitamentbutton.addEventListener('click', function(event) {  console.log(event);  // ✅ funciona a tots els navegadors}); |
| :---- |

**Error 4: `SyntaxError: Unexpected token`**

| // ❌ Operador que faltaconst result \= value1 value2;   // falta l'operador entre els dos// → SyntaxError: Unexpected identifier 'value2'// ❌ Parèntesi que faltafunction sammy(animal) {  if(animal \== 'shark') { return 'cool'; }}sammy('shark';    // ← falta el )// → SyntaxError: missing ) after argument list// ❌ Cometes mal aparelladesconst msg \= "Hola món';   // obert amb " tancat amb '// → SyntaxError: Invalid or unexpected token |
| :---- |

Quan trobes un `SyntaxError: Unexpected token`, comprova el teu codi per operadors que falten o addicionals com el signe més (+).

**Error 5: `TypeError: Cannot set property of undefined`**

| // ❌ L'objecte no existeix i intentes assignar-hi una propietatlet test;test.value \= 5;   // ❌ test és undefined// → TypeError: Cannot set properties of undefined (setting 'value')// ❌ Molt freqüent amb querySelector que no troba l'elementdocument.querySelector('\#inexistent').innerHTML \= 'Hola';// → TypeError: Cannot set properties of null (setting 'innerHTML')// ✅ Comprova sempre que existeixconst el \= document.querySelector('\#meu-element');if (el) el.innerHTML \= 'Hola'; |
| :---- |

**La diferència entre `null` i `undefined`**

En JavaScript, `null` i `undefined` no son la mateixa cosa. `undefined` és habitualment una variable que no ha estat assignada, mentre que `null` vol dir que el valor és en blanc.

| let declarada;          // undefined: declarada però sense valorlet nul·la \= null;      // null: assignació intencional de "buit"typeof undefined  // → "undefined"typeof null       // → "object" (quirk famós de JavaScript)undefined \== null   // → true  (igualtat laxa)undefined \=== null  // → false (igualtat estricta: son tipus diferents) |
| :---- |

**Errors específics de navegador: missatges diferents per al mateix error**

Sí, els diferents navegadors poden tenir missatges d'error diferents per al mateix error lògic. Això és un problema comú per a IE en aplicacions web que empren JavaScript namespacing.

| Error real | Chrome | Firefox | Safari |
| ----- | ----- | ----- | ----- |
| Propietat de null | `Cannot read properties of null` | `null has no properties` | `undefined is not an object` |
| Funció indefinida | `X is not a function` | `X is not a function` | `X is not a function` |
| Variable no definida | `X is not defined` | `X is not defined` | `X is not defined` |

**El procés de troubleshooting en 5 passos**

| 1\. Llegeix l'error complet a la consola   → Quin tipus? (TypeError, ReferenceError, SyntaxError...)   → En quina línia i fitxer?         ↓2\. Vés a aquella línia del codi   → Quines variables s'usen?   → Quina podria tenir un valor inesperat?         ↓3\. Afegeix console.log just before per confirmar el valor   console.log('variable:', variable, typeof variable)         ↓4\. Entén per quèté aquell valor   → No s'ha inicialitzat? Race condition? Selector incorrecte?         ↓5\. Aplica la solució adequada   → Optional chaining (?.)   → Guard clause (if (\!x) return)   → DOMContentLoaded   → await correcte |
| :---- |

