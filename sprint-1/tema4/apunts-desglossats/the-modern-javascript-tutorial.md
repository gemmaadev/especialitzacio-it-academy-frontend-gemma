## **The Modern JavaScript Tutorial: javascript.info**

**The Modern JavaScript Tutorial**  
[https://javascript.info/](https://javascript.info/)  
Guia completa i moderna per aprendre JavaScript des de zero fins a temes avançats.

**Què és javascript.info?**

javascript.info és una de les millors referències de JavaScript modernes disponibles gratuïtament. Cobreix el llenguatge des de zero fins a temes avançats amb explicacions simples però detallades. S'actualitza regularment (última actualització: abril 2026\) i té traduccions a 14 idiomes.

El tutorial s'organitza en tres parts: el llenguatge JavaScript, les APIs del navegador i articles temàtics addicionals.

**Part 1: El Llenguatge JavaScript**

### **Fonaments**

Els fonaments cobreixen les bases del llenguatge: variables i tipus de dades, operadors, estructures de control (`if`, `switch`, bucles `while` i `for`), funcions bàsiques i funcions fletxa. Inclou el mode estricte (`"use strict"`), que és la configuració recomanada per a tot el codi modern.

### **Qualitat de Codi**

La secció de qualitat de codi cobreix estil de programació, comentaris, depuració al navegador i testing automatitzat amb Mocha. Inclou l'article "Ninja Code": un recull satíric de males pràctiques per aprendre per contraexemple.

### **Objectes**

Cobreix la mecànica dels objectes en profunditat: referències i còpies, el context `this` en mètodes, constructors amb `new`, encadenament opcional `?.` i conversions d'objecte a primitiu.

### **Tipus de Dades**

Cobreix en profunditat tots els tipus: números, strings, arrays i els seus mètodes, iterables, `Map` i `Set`, `WeakMap` i `WeakSet`, desestructuració, dates i JSON. Especialment útil la secció d'`Object.keys`, `values` i `entries`.

### 

### **Funcions Avançades**

Cobreix temes fonamentals per entendre com funciona JavaScript per dins: recursió i pila d'execució, rest i spread (`...`), **closures i scope**, el comportament de `var`, l'objecte global, temporitzadors (`setTimeout` i `setInterval`) i binding de funcions.

### **Classes i prototips**

Explica la herència prototípica (com funciona JavaScript per sota de les classes), la sintaxi de classes, herència, propietats i mètodes estàtics, propietats privades (`#`), `instanceof` i mixins.

### **Gestió d'errors**

Cobreix `try/catch/finally`, l'objecte `Error` natiu i com crear errors personalitzats estenent la classe `Error`.

### **Promeses i async/await**

Cobreix tot el cicle de l'asincronisme: callbacks i el problema del "callback hell", Promise bàsic, encadenament de Promises, gestió d'errors, la API completa de Promise (`Promise.all`, `Promise.race`, `Promise.allSettled`, `Promise.any`), i finalment `async/await`.

### **Mòduls**

Cobreix la introducció als mòduls ES6, `export` i `import` (named i default), i els dynamic imports per a lazy loading.

**Part 2: Browser — Document, Events, Interfaces**

### **Document i DOM**

Cobreix com el navegador representa la pàgina: l'entorn del navegador, l'arbre DOM, navegació pel DOM, selecció d'elements (`querySelector`, `getElementById`...), propietats dels nodes, atributs, modificació del document, estils i classes, mides i scroll.

### **Events**

Cobreix la introducció als events del navegador, **bubbling i capturing**, **event delegation**, accions per defecte del navegador i dispatch d'events personalitzats. Essencial per entendre la interactivitat web.

### **UI Events**

Cobreix events de ratolí, moviment del ratolí, drag & drop, pointer events, events de teclat i scroll.

### **Formularis**

Cobreix propietats i mètodes de formularis, focus/blur, events de canvi i input, i l'event submit.

### **Càrrega de Recursos**

Cobreix `DOMContentLoaded`, `load`, scripts asíncrons i diferits (`async` i `defer`), i càrrega de recursos.

### **Miscel·lània del Navegador**

Cobreix Mutation Observer, Selection i Range, i l'event loop amb microtasques i macrotasques.

**Part 3: Articles addicionals**

### **Peticions de xarxa**

La secció de xarxa és molt completa: Fetch API, FormData, progress de descàrregues, abort de peticions, CORS, URL objects, WebSocket i Server Sent Events.

### **Emmagatzematge al navegador**

Cobreix cookies, localStorage, sessionStorage i IndexedDB.

### **Animacions CSS i JavaScript**

Cobreix transicions, animacions Bezier, animacions JavaScript i animació amb requestAnimationFrame.

### **Web components**

Cobreix elements personalitzats (Custom Elements), Shadow DOM i templates HTML.

### **Expressions regulars**

Una secció completa sobre regex en JavaScript: patrons, flags, classes de caràcters, ancoratges, quantificadors, grups i lookaheads.

**Per a cada tema del bootcamp: on trobar-ho**

| Tema del Bootcamp | Secció a javascript.info |
| ----- | ----- |
| `const`/`let`/`var`, scope, hoisting | Variables → Variable scope, closure → The old "var" |
| Funcions fletxa | Arrow functions basics → Arrow functions revisited |
| Desestructuració | Destructuring assignment |
| Template literals | Strings |
| `map`, `filter`, `reduce` | Array methods |
| Spread i rest `...` | Rest parameters and spread syntax |
| Mòduls (`import`/`export`) | Modules |
| Promises | Promise (tot el bloc de Promises, async/await) |
| `async`/`await` | Async/await |
| `try`/`catch` | Error handling |
| Events i bubbling | Introduction to Events |
| Event delegation | Event delegation |
| DOM | Document (tot el bloc) |
| Fetch API | Network requests → Fetch |
| Closures | Variable scope, closure |
| Classes i OOP | Classes |
| Patrons (Observer, Factory) | Classes → Mixins |

