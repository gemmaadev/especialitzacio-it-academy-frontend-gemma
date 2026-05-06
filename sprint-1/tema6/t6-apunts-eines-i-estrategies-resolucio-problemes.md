## **Apunts tema 6: Eines i estratègies de resolució de problemes**

## **1\. Pensament computacional: descomposició i abstracció**

La base de qualsevol debugging eficient és un procés mental estructurat. Quan un sistema falla, no llegeixes tot el codi d'un cop: el divideixes.

**Descomposició** — divideix el problema gran en subproblemes manejables. "El login no funciona" no és un problema: és un símptoma. El problema real pot ser al frontend (les dades no s'envien), al backend (la validació falla), a la base de dades (l'usuari no existeix) o a la comparació de contrasenyes. Cada capa és un subproblema independent.

**Abstracció** — ignora el codi irrellevant. Quan debugues Cannot read properties of undefined (reading 'nom'), no necessites llegir tota l'aplicació: únicament has de trobar on s'espera un objecte i on arriba undefined. Tot el que no té relació amb aquella variable és irrellevant en aquell moment.

El procés combinat: reformula el problema en paraules precises → descompon en capes → aïlla la capa que falla → dins d'aquella capa, aïlla la funció → formula una hipòtesi → prova → ajusta.

**De problema real a passos algorísmics:** un algoritme és simplement els passos necessaris per resoldre un problema. "Mostrar el total del carret aplicant IVA" es converteix en: calcular subtotal (suma de preu × quantitat de cada producte), aplicar descompte si existeix, calcular l'IVA sobre el subtotal descomptat, retornar el total formatat. Cada pas és una funció, cada funció és verificable.

**2\. Chrome DevTools: el kit complet de debugging**

**Com obrir:** F12, Ctrl+Shift+I (Win) o Cmd+Option+I (Mac). Ctrl+Shift+J va directament a la Console.

* **Elements** — inspeccionar i editar el DOM i el CSS en temps real. Simula estats CSS com :hover i :focus. Els DOM breakpoints (clic dret → Break on) pausan l'execució quan un element del DOM canvia, per trobar "quèestà modificant aquest element".  
* **Console** — intèrpret JavaScript complet. console.table() per a arrays d'objectes, console.group() per agrupar logs, console.time() per mesurar rendiment, el shorthand d'objecte console.log({ variable }) per veure nom i valor automàticament.  
* **Sources** — el cor del debugging. Breakpoints, call stack, scope panel i watch expressions. Blackboxing per amagar biblioteques externes del call stack. Workspace per guardar edicions directament al disc.  
* **Network** — totes les peticions HTTP amb timing detallat. Detecta recursos lents, respostes incorrectes i recursos sense compressió.  
* **Performance** — flame graph per a bottlenecks de JavaScript. Lighthouse integrat per a auditories de rendiment.  
* **Application** — inspecció de localStorage, sessionStorage, cookies i service workers.

**3\. El Panell Sources: Debugging Professional**

### **Breakpoints**

* **Bàsic** — clic al número de línia. L'execució es pausa allà.  
* **Condicional** — clic dret → "Add conditional breakpoint". Posa una expressió JavaScript: únicament pausa si es compleix. Molt millor que if (condicio) console.log(...).  
* **Logpoint** — com un breakpoint condicional però sense pausar: únicament registra a la consola. Equivalent a console.log sense tocar el codi.  
* **DOM breakpoint** — pausa quan un element del DOM canvia: molt útil quan no saps quèestà modificant un element.  
* **XHR/Fetch breakpoint** — pausa quan s'envia una petició de xarxa que coincideix amb una URL.  
* **Exception breakpoint** — pausa automàticament quan es produeix un error no capturat.

### **Controls de navegació (quan estàs pausat)**

F8 Resume, F10 Step Over (executa la línia sense entrar a la funció), F11 Step Into (entra dins la funció), Shift+F11 Step Out (surt de la funció actual).

### **Inspeccionar variables**

Cinc maneres simultànies: valors **inline** al costat del codi, **hover** sobre qualsevol variable, panell **Scope** (Local, Closure, Global), **Watch Expressions** per a expressions personalitzades que es recalculen en cada step, i la **Console** en temps real on pots escriure qualsevol expressió JavaScript mentre estàs pausat.

**4\. Errors comuns de JavaScript**

**La regla fonamental:** llegeix sempre el stack trace complet. El missatge diu el tipus d'error, la descripció, el fitxer i la línia exacta.

* **SyntaxError** — el codi no és JavaScript vàlid. Parèntesi que falta, cometes mal aparellades, paraula reservada usada com a variable. El navegador el detecta immediatament, no executa res. ESLint el detecta mentre escrius.  
* **ReferenceError: X is not defined** — intentes usar una variable que no existeix en el scope actual. Causes: errada tipogràfica en el nom, variable fora del seu bloc {}, usar let o const abans de declarar-les (TDZ).  
* **TypeError: Cannot read properties of null/undefined** — l'error més freqüent. Tres causes habituals: l'element del DOM no existeix (querySelector retorna null), les dades de l'API no han carregat (race condition), o la propietat d'un objecte és undefined. Solució: Optional Chaining ?., guard clauses, DOMContentLoaded.  
* **TypeError: X is not a function** — crides .map() sobre un objecte, o una propietat que és un string en lloc d'una funció. Comprova typeof variable per verificar el tipus.  
* **RangeError** — valor fora del rang permès. El cas més freqüent: recursió infinita sense cas base (Maximum call stack size exceeded).

**5\. console.log vs. Breakpoints vs. Logpoints**

|  | console.log | Breakpoints | Logpoints |
| ----- | ----- | ----- | ----- |
| Modifica el codi | Sí ⚠️ | No | No |
| Risc en producció | Alt ⚠️ | Cap | Cap |
| Variables visibles | Les que tries | Totes del scope | Les que tries |
| Interactivitat | No | Sí | No |
| Ideal per a | Verificació ràpida | Investigació profunda | Log sense modificar codi |

**La regla pràctica:** comença amb console.log per confirmar una hipòtesi simple. Si el bug és complex o esquiu, passa als breakpoints: veus totes les variables en scope sense decidir res d'avançada. Usa Logpoints quan vols el millor dels dos mons. Elimina sempre els console.log de debugging abans del commit.

**6\. Errors Intermitents: com capturar-los**

Els bugs intermitents son els més difícils perquè desapareixen quan intentes observar-los (l'efecte Heisenbug). Quatre estratègies:

**Logging estructurat** — instrumenta el codi per capturar tot el context quan l'error apareix naturalment: timestamp, URL, estat de l'app, stack trace. window.addEventListener('error', ...) i window.addEventListener('unhandledrejection', ...) capturen errors globals.

**Entorn controlat** — simula les condicions que provoquen l'error: throttling de xarxa (Chrome DevTools → Network → Slow 3G), múltiples peticions simultànies per forçar race conditions, repetir el flux problemàtic 50-100 cops amb un script automatitzat.

**git bisect** — cerca binària per trobar el commit exacte que va introduir el bug. Amb 100 commits, trobes el culpable en 7 proves.

**Proxy pattern** — usa new Proxy() per monitorar canvis d'estat i registrar automàticament d'on venen.

**7\. Flame Graph de Performance: identificar codi lent**

**Com gravar:** obre en mode incògnit, Performance → Record → realitza l'acció lenta → Stop.

**Llegir el flame chart:** l'eix X és el temps, l'eix Y és la pila de crides. Les barres **amples** son funcions cares, independentment de la seva alçada. Les Long Tasks (\>50ms) apareixen en vermell i bloquen el fil principal.

**Les pestanyes del panell inferior:**

* **Summary** — resum amb temps total i Self Time  
* **Bottom-Up** — functions ordenades per Self Time. Busca funcions amb Self Time alt que no son visibles al coll de la pila  
* **Call Tree** — l'arbre de crides en format textual

**Self Time vs. Total Time:** Self Time és el temps de la funció sense les que crida. Total Time inclou totes les funcions cridades. Una funció amb Self Time alt és la que realment fa el treball costós.

**8\. Panel Network: optimitzar la càrrega**

El Network panel registra totes les peticions HTTP amb timing detallat organitzat en el Waterfall.

**Llegir el Waterfall:** la part lleugera de cada barra és el temps esperant (TTFB), la part fosca és el temps descarregant. TTFB alt → servidor lent. Content Download llarg → recurs massa gran o sense compressió.

**El que cal buscar:** peticions en vermell (errors), recursos larger-than:1M, capçaleres Content-Encoding absents (sense compressió), Cache-Control absent (sense caché), Long Tasks de xarxa en cascada.

**Disable Cache** — activa per simular la primera visita. **Throttling** — simula connexions lentes per revelar problemes ocults.

**9\. Lighthouse i Core Web Vitals**

Lighthouse genera puntuacions de 0-100 en cinc categories. La de Performance es basa en:

* **LCP (Largest Contentful Paint)** — el major element visible triga a carregar. Objectiu: ≤2.5s. Pes: 25%.  
* **TBT (Total Blocking Time)** — temps total que el fil principal ha estat bloquejat per tasques llargues (\>50ms). És el proxy de laboratori per a INP. Pes: 30% (el més alt).  
* **CLS (Cumulative Layout Shift)** — desplaçaments visuals inesperats. Objectiu: ≤0.1. Pes: 25%.  
* **INP (Interaction to Next Paint)** — reemplaça FID des del març 2024\. No el mesura Lighthouse (requereix input real) però TBT és el seu proxy.

La distinció clau: Lighthouse és dades de laboratori (simulació). Google usa dades de camp reals (CrUX) per als rankings. Una puntuació de 100 a Lighthouse no garanteix passar les Core Web Vitals en el món real.

**10\. npm Scripts i Automatització**

La secció scripts del package.json és el centre de control de totes les tasques del projecte.

**Els shorthands** sense run: npm start, npm test, npm stop.

**Hooks pre/post** — s'executen automàticament: pretest s'executa SEMPRE abans de npm test. Si falla, test no s'executa.

**Encadenar scripts:** && per a execució seqüencial (s'atura si falla algun pas), & per a paral·lel (Unix), npm-run-all per a compatibilitat multiplataforma.

**El script de debugging** essencial:

| "debug":       "node \--inspect src/index.js","debug:break": "node \--inspect-brk src/index.js" |
| :---- |

\--inspect arrenca i el debugger pot connectar-se. \--inspect-brk pausa a la primera línia i espera.

**Quina eina per a cada problema**

| Tinc un error o un problema de rendiment?         │         ├── Error a la consola?         │     └── Llegir stack trace → anar a la línia → Sources o console.log         │         ├── El codi fa una cosa incorrecta sense error?         │     └── Sources → Breakpoint → inspeccionar Scope \+ Call Stack         │         ├── Una petició falla o torna dades incorrectes?         │     └── Network panel → clic sobre la petició → Headers \+ Response         │         ├── La pàgina és lenta?         │     └── Performance → Record → Flame chart → Long Tasks         │         ├── La pàgina pesa massa o carrega lentament?         │     └── Network → Size \+ Timing → Lighthouse → Opportunities         │         └── Error intermitent que no puc reproduir?               └── Logging estructurat → entorn controlat → git bisect |
| :---- |

