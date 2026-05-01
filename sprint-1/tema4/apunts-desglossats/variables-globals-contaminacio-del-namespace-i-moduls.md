### **Variables globals, contaminació del namespace i mòduls**

**El problema: tot al global scope amb \<script\> tradicionals**

Quan carregues JavaScript amb \<script\> tradicionals (sense type="module"), tots els fitxers comparteixen **el mateix namespace global**: l'objecte window al navegador. Cada variable, funció o classe que declares es converteix en una propietat de window i és accessible des de qualsevol altre script de la pàgina.

| \<\!-- L'ordre dels scripts importa molt \--\>\<script src="team-a.js"\>\</script\>\<script src="team-b.js"\>\</script\>\<script src="main.js"\>\</script\> |
| :---- |

| // team-a.js \-- el que escriu l'equip Afunction calcularPreu(producte) {  return producte.preu \* 1.21;  // preu amb IVA}var CONFIG \= { moneda: 'EUR', idioma: 'ca' }; |
| :---- |

| // team-b.js \-- el que escriu l'equip B (biblioteca externa)function calcularPreu(quantitat, unitPrice) {  return quantitat \* unitPrice;  // preu total sense IVA}var CONFIG \= { moneda: 'USD', idioma: 'en' };  // ← sobreescriu la de l'equip A\! |
| :---- |

| // main.js \-- el que crida el developer finalcalcularPreu({ preu: 100 });// Resultat inesperat\! L'equip B ha sobreescrit la funció de l'equip A// No hi ha cap error, simplement fa la cosa equivocada silenciosament |
| :---- |

**Els tres problemes principals del global scope**

### **1\. Col·lisió de noms (Name Collision)**

En JavaScript, si declares una variable o funció una segona vegada, simplement sobreescriu la que havies creat abans. JavaScript no llança cap error com ho fa C\# o Java si redefineixes una variable o una funció.

La contaminació del namespace global causa col·lisions de noms. Això és especialment cert en projectes grans on es poden estar usant diverses biblioteques JavaScript, tant de desenvolupament intern com de tercers.

| // jquery.js declara: var $ \= function() {...}// altra-biblioteca.js també declara: var $ \= function() {...}// La segona sobreescriu la primera completament, sense cap avís |
| :---- |

### **2\. Acoblament excessiu (Tight Coupling)**

Les variables globals poden crear dependències entre diferents parts del codi, fent-lo més difícil de mantenir i refactoritzar.

L'ús de globals pot causar acoblament implícit entre fitxers o variables. Quan escrivim codi, volem assegurar-nos que sigui tan modular i reutilitzable com sigui possible. Acoblar peces del codi pot portar a mals de cap importants quan intentes depurar per quèalguna cosa no funciona.

| // El problema de l'acoblament global:// fitxer-a.js modifica la variable globalwindow.usuariActual \= null;// fitxer-b.js depèn de la variable globalfunction carregarDashboard() {  if (window.usuariActual) {    // depèn de fitxer-a.js    mostrarDades();  }}// fitxer-c.js també la modificafunction tancarSessio() {  window.usuariActual \= null;   // pot trencar fitxer-b.js}// El resultat: un canvi en qualsevol fitxer pot trencar tots els altres// No pots reutilitzar cap fitxer de manera independent |
| :---- |

### **3\. Fuites de memòria i dificultat de testing**

A mesura que les variables perden scope, poden ser candidates per al garbage collection. Si estan en el scope global, no seran candidates per a la col·lecció fins que el namespace global perdi scope (és a dir, fins que es tanqui la pàgina).

| // Variables globals que mai s'alliberen de memòriavar dadesUsuari \= \[\];      // creix indefinidamentvar cache \= {};            // creix indefinidamentvar intervalsActius \= \[\];  // poden quedar zombies// A més, el testing és impossible sense emular tot el global scope |
| :---- |

**Les solucions pre-ES6: els patrons IIFE i Namespace**

Abans dels mòduls natius, els developers van inventar solucions hacky per simular l'encapsulació:

**IIFE (Immediately Invoked Function Expression)** — creava un scope privat envolcallant el codi en una funció que s'executava immediatament:

| // Solució manual: IIFE per crear scope privat(function() {  var privat \= 'ningú em pot tocar des de fora';  function funcionInterna() {}  // Exposem únicament el que cal al global  window.MevaApp \= {    funcionPublica: function() {}  };})();// Extern: únicament window.MevaApp és accessible// 'privat' i 'funcionInterna' no contaminen el global |
| :---- |

**Namespace pattern** — un sol objecte global que conté tot:

| // Un sol objecte global per a tota l'aplicacióvar MevaApp \= MevaApp || {};MevaApp.utils \= {  formatData: function(d) { return d.toISOString(); }};MevaApp.auth \= {  login: function(user, pass) { /\* ... \*/ },  logout: function() { /\* ... \*/ }};// Millor que moltes globals, però segueix sent un hack// i té problemes d'ordre de càrrega entre fitxers |
| :---- |

**La solució definitiva: ES6 Modules**

En el JavaScript tradicional, les variables declarades en el scope global són accessibles per tot el script, cosa que pot portar a conflictes. Amb el scope de mòdul, cada mòdul té el seu propi scope aïllat, reduint les possibilitats de tals conflictes.

Amb type="module", cada fitxer té el seu propi scope privat automàticament:

| // math.js \-- scope completament privat per defecteconst PI \= 3.14159;         // privat: no contamina el globalfunction calcularPreu(p) {  // privada: no contamina el global  return p \* 1.21;}export { calcularPreu };    // únicament exporta el que necessita// PI queda privada, mai accessible des de fora |
| :---- |

| // stats.js \-- pot tenir els seus propis PI i calcularPreu// sense cap conflicte amb math.jsconst PI \= 3.14159;         // PRIVADA a aquest mòdulfunction calcularPreu(a, b) { // PRIVADA, diferent de la de math.js  return a \* b;}export { calcularPreu };    // la seva pròpia versió exportada |
| :---- |

| // main.js \-- importa el que necessita, amb noms explícitsimport { calcularPreu as calcularPreuAmbIVA } from './math.js';import { calcularPreu as calcularPreuTotal } from './stats.js';// Cap conflicte\! Cada import té el seu propi nomcalcularPreuAmbIVA({ preu: 100 });  // 121calcularPreuTotal(5, 20);            // 100 |
| :---- |

**Comparació directa: scripts tradicionals vs. mòduls**

| \<\!-- ❌ Scripts tradicionals: tot al global, ordre crític \--\>\<script src="utils.js"\>\</script\>      \<\!-- declara: var helper \= ... \--\>\<script src="auth.js"\>\</script\>       \<\!-- declara: var helper \= ... sobreescriu\! \--\>\<script src="dashboard.js"\>\</script\>  \<\!-- usa: helper → quin? \--\>\<script src="main.js"\>\</script\>\<\!-- ✅ Mòduls: cada fitxer és independent \--\>\<script type="module" src="main.js"\>\</script\>\<\!-- main.js importa el que necessita explícitament \--\>\<\!-- L'ordre ja no importa \--\> |
| :---- |

| // ❌ Scripts tradicionals: dependències ocultes i acoblament fort// config.jsvar API\_URL \= 'https://api.exemple.com';  // global// api.jsfunction fetchData(endpoint) {  return fetch(API\_URL \+ endpoint);  // depèn del global silenciosament}// Si config.js no es carrega primer → ReferenceError// Si algú canvia API\_URL → api.js es trenca silenciosament// ✅ Mòduls: dependències explícites i desacoblament// config.jsexport const API\_URL \= 'https://api.exemple.com';// api.jsimport { API\_URL } from './config.js';  // dependència EXPLÍCITA i claraexport async function fetchData(endpoint) {  return fetch(API\_URL \+ endpoint);}// Si config.js no exporta API\_URL → error en temps de compilació (no d'execució\!) |
| :---- |

**Beneficis concrets dels mòduls per a l'escalabilitat**

* **Dependències explícites** — en un mòdul, pots veure exactament d'on ve cada cosa llegint les línies d'import. Amb scripts globals, les dependències estan amagades al codi.  
* **Tree-shaking** — els bundlers (Vite, Webpack) poden analitzar estàticament quins exports es fan servir i eliminar el codi mort del bundle final. Amb globals, és impossible saber si alguna cosa s'usa o no.  
* **Testing independent** — pots importar un mòdul en un fitxer de test sense necessitat de configurar tot el scope global. Cada mòdul és una unitat testable per si sola.  
* **Refactoring segur** — si canvies l'API d'un mòdul (renombres una funció exportada), els editors i eines com TypeScript et diran exactament quins fitxers cal actualitzar. Amb globals, els errors només apareixen en execució.

**Resum: scripts tradicionals vs. mòduls**

|  | Scripts \<script\> tradicionals | Mòduls type="module" |
| ----- | ----- | ----- |
| **Scope** | Global (compartit) | Privat per mòdul |
| **Conflictes de noms** | Molt probables en projectes grans | Impossibles entre mòduls |
| **Dependències** | Ocultes, basades en l'ordre | Explícites via import |
| **Acoblament** | Alt (tot depèn del global) | Baix (cada mòdul és independent) |
| **Testing** | Difícil (cal simular el global) | Fàcil (importar i testar) |
| **Tree-shaking** | Impossible | Suportat pels bundlers |
| **Detecció d'errors** | En execució (silenciosos) | En compilació (explícits) |
| **Reusabilitat** | Baixa | Alta |

