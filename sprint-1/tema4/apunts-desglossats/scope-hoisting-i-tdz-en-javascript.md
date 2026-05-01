## **Abast (Scope), Hoisting i TDZ en JavaScript**

**Els tres tipus d'abast (scope)**

L'abast defineix on és accessible una variable. JavaScript té tres nivells:

* **Global scope** — variables accessibles des de qualsevol lloc del programa. Una variable declarada fora de qualsevol funció o bloc és global.  
* **Function scope** — variables declarades amb `var` dins d'una funció. Únicament visibles dins d'aquella funció, però visibles en qualsevol bloc intern (if, for, while...).  
* **Block scope** — variables declarades amb `let` i `const` dins d'un bloc `{}`. Únicament visibles dins d'aquell bloc concret.

| let global \= 'soc global';function demo() {  var funcional \= 'soc function-scoped';  if (true) {    var tambeFunc \= 'jo surto del bloc\!';  // var: ignora el bloc    let blocat \= 'jo quedo al bloc';       // let: block-scoped    const tamblocat \= 'jo també';          // const: block-scoped  }  console.log(funcional);   // ✅ 'soc function-scoped'  console.log(tambeFunc);   // ✅ 'jo surto del bloc\!' ← bug potencial  // console.log(blocat);   // ❌ ReferenceError} |
| :---- |

**Hoisting: el comportament de "pujar declarations"**

El hoisting és el comportament per defecte de JavaScript de moure totes les declaracions al capdamunt del seu abast actual durant la fase de compilació, abans de l'execució del codi. JavaScript únicament fa hoisting de declaracions, no d'inicialitzacions.

Cada variable JavaScript passa per fases distintes: Fase 1 (Creació/Hoisting), Fase 2 (Inicialització) i Fase 3 (Assignació). `var`, `let` i `const` gestionen aquestes fases de manera diferent.

**`var`: hoisted i inicialitzat a `undefined`**

| // El que escriusconsole.log(nom);  // undefined (no error\!)var nom \= 'Anna';console.log(nom);  // 'Anna'// Com ho interpreta JavaScript internamentvar nom;           // ← hoist: puja la declaracióconsole.log(nom);  // undefinednom \= 'Anna';      // l'assignació queda al seu llocconsole.log(nom);  // 'Anna' |
| :---- |

**Funcions declarades: hoisting complet**

| // Pots cridar una funció abans de declarar-lasaluda();  // ✅ 'Hola\!' \-- funciona per hoisting completfunction saluda() {  console.log('Hola\!');} |
| :---- |

**TDZ: Temporal Dead Zone**

`let` i `const` es fan hoisting però NO s'inicialitzen. La finestra de temps entre entrar a l'abast i l'execució de la declaració s'anomena Temporal Dead Zone (TDZ). Tocar-los en la TDZ llança un error. La TDZ és una funcionalitat, no un bug: converteix "usar abans de declarar" d'un silent `undefined` en un error sonor, cosa que captura moltes errades tipogràfiques i errors d'ordre.

| // let i const: TDZ en accióconsole.log(color);  // ❌ ReferenceError: Cannot access 'color' before initializationlet color \= 'blau';console.log(color);  // ✅ 'blau' \-- aquí ja ha sortit de la TDZ// Fins i tot typeof falla dins de la TDZconsole.log(typeof color);  // ❌ ReferenceError (var donaria 'undefined')let color \= 'blau'; |
| :---- |

La diferència principal entre la TDZ de `var`, `let` i `const` és quan acaba la seva TDZ. 

`var`: la TDZ acaba immediatament després del hoisting (s'inicialitza a `undefined`). 

`let` i `const`: la TDZ acaba quan JavaScript inicialitza completament la variable amb el valor especificat en la declaració.

**El cas del bucle: la diferència crítica entre `var` i `let`**

Les variables declarades amb `var` en un bucle accedeixen totes a la mateixa variable, mentre que `let` crea un nou binding per a cada iteració. Això és especialment important quan s'usa amb closures com els `setTimeout`.

| // var: problema clàssic amb closures en buclesfor (var i \= 0; i \< 3; i++) {  setTimeout(() \=\> console.log(i), 100);}// Resultat: 3, 3, 3 (totes les funcions apunten al mateix i)console.log(i);  // 3 (accessible fora del bucle\!)// let: cada iteració té el seu propi bindingfor (let j \= 0; j \< 3; j++) {  setTimeout(() \=\> console.log(j), 100);}// Resultat: 0, 1, 2 (cada funció té la seva còpia de j)// console.log(j);  // ❌ ReferenceError (j no existeix fora) |
| :---- |

**Desestructuració amb dades complexes: casos pràctics**

La desestructuració brilla especialment quan treballes amb respostes d'APIs, objectes anidats i arrays de dades.

**Cas 1: resposta d'una API**

| // Resposta típica d'una API RESTconst resposta \= {  status: 200,  data: {    usuari: {      id: 1,      nom: 'Anna',      email: 'anna@exemple.com',      adreca: {        carrer: 'Gran Via 123',        ciutat: 'Barcelona',        codiPostal: '08001'      },      rols: \['admin', 'editor'\]    }  }};// ❌ Sense desestructuració: verbós i difícil de llegirconst nomUsuari \= resposta.data.usuari.nom;const emailUsuari \= resposta.data.usuari.email;const ciutatUsuari \= resposta.data.usuari.adreca.ciutat;const primerRol \= resposta.data.usuari.rols\[0\];// ✅ Amb desestructuració anidadaconst {  data: {    usuari: {      nom,      email,      adreca: { ciutat, codiPostal },      rols: \[primerRol, segonRol\]    }  }} \= resposta;console.log(nom);       // 'Anna'console.log ciutat);    // 'Barcelona'console.log(primerRol); // 'admin' |
| :---- |

**Cas 2: paràmetres de funció**

| // ❌ Sense desestructuraciófunction mostrarProducte(producte) {  return \`${producte.nom} \- ${producte.preu}€ (${producte.categoria})\`;}// ✅ Amb desestructuració als paràmetresfunction mostrarProducte({ nom, preu, categoria, disponible \= true }) {  const estat \= disponible ? 'En stock' : 'Esgotat';  return \`${nom} \- ${preu}€ (${categoria}) \- ${estat}\`;}mostrarProducte({ nom: 'Portàtil', preu: 999, categoria: 'Tecnologia' });// 'Portàtil \- 999€ (Tecnologia) \- En stock' |
| :---- |

**Cas 3: retorn de múltiples valors**

| // Una funció que retorna múltiples valors via arrayfunction calcularEstadistiques(nombres) {  const suma \= nombres.reduce((a, b) \=\> a \+ b, 0);  const mitja \= suma / nombres.length;  const maxim \= Math.max(...nombres);  const minim \= Math.min(...nombres);  return \[suma, mitja, maxim, minim\];}// Desestructurar el resultat directamentconst \[suma, mitja, maxim, minim\] \= calcularEstadistiques(\[1, 2, 3, 4, 5\]);console.log(\`Suma: ${suma}, Mitja: ${mitja}\`);  // Suma: 15, Mitja: 3 |
| :---- |

**Cas 4: desestructurar en imports de React**

| // Sense desestructuracióimport React from 'react';const useState \= React.useState;const useEffect \= React.useEffect;// Amb desestructuracióimport { useState, useEffect } from 'react';// En un component Reactfunction Comptador() {  const \[compte, setCompte\] \= useState(0);  // Desestructurar props directament  return \<button onClick={() \=\> setCompte(compte \+ 1)}\>{compte}\</button\>;} |
| :---- |

**Cas 5: valors per defecte a la desestructuració**

| // Quan una clau pot no existirconst config \= {  host: 'localhost',  timeout: 5000  // 'port' no existeix};// ✅ Valors per defecte en la desestructuracióconst { host, port \= 3000, timeout, debug \= false } \= config;console.log(port);   // 3000 (valor per defecte)console.log(debug);  // false (valor per defecte) |
| :---- |

**Resum**

|  | `var` | `let` | `const` |
| ----- | ----- | ----- | ----- |
| **Scope** | Function | Block `{}` | Block `{}` |
| **Hoisting** | Sí (→ `undefined`) | Sí (→ TDZ) | Sí (→ TDZ) |
| **TDZ** | No | Sí (ReferenceError) | Sí (ReferenceError) |
| **Reassignable** | Sí | Sí | No |
| **Redeclarable** | Sí ⚠️ | No | No |
| **Loop binding** | Una variable | Una per iteració | Una per iteració |
| **Quan usar** | ❌ Mai | Valors que canvien | La majoria de casos |

