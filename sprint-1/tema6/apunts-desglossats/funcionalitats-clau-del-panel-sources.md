## **El Panell Sources de Chrome DevTools**

**Introducció: per què el panell Sources és la teva millor eina**

El panell Sources és on es fa la majoria del debugging. Inspeccionar el codi un cop s'ha pausat en un lloc específic és molt més productiu que executar `console.log(data)` i recarregar la pàgina una i altra vegada.

El panell Sources és el teu entorn principal de debugging. Un breakpoint pausa l'execució en una línia específica perquè puguis inspeccionar l'estat en temps d'execució: variables, el call stack, l'àmbit (scope), tot.

**Com obrir-lo:** `F12` (Windows/Linux) o `Cmd+Option+I` (Mac) → pestanya **Sources**.

**L'estructura del panell Sources**

El panell Sources té tres àrees:

* **Panell esquerre (File Navigator)** — l'arbre de fitxers de tots els scripts carregats per la pàgina. Pots navegar pels teus fitxers de projecte i obrir-los a l'editor central.  
* **Panell central (Code Editor)** — el codi del fitxer seleccionat. Aquí cliques a les línies per posar breakpoints i veus el codi executant-se.  
* **Panell dret (Debugger)** — les eines de debugging: Breakpoints, Call Stack, Scope, Watch i altres. Aquí passa tota la màgia quan l'execució es pausa.

**Breakpoints: pausar l'execució**

### **Breakpoint bàsic de línia**

El més simple: cliques el número de línia al codi i apareix un marcador blau. Cada vegada que l'execució arriba a aquella línia, es pausa i pots inspeccionar l'estat.

| function calcularTotal(productes) {  // Clic al número de línia → execució es pausa aquí  const subtotal \= productes.reduce((s, p) \=\> s \+ p.preu, 0);  return subtotal \* 1.21;} |
| :---- |

Hi ha tres maneres principals de pausar un script: un breakpoint, la sentència `debugger`, o un error (si DevTools és obert i el botó és "on").

La paraula clau `debugger` al codi fa exactament el mateix que un breakpoint de línia, però escrit directament al JavaScript:

| function buscarUsuari(id) {  debugger;  // ← pausa aquí quan DevTools és obert  return usuaris.find(u \=\> u.id \=== id);} |
| :---- |

Quan DevTools és obert, `debugger` actua com un breakpoint: l'execució es pausa en aquella línia i tens el debugger complet: variables en scope, el call stack, controls de step-over i step-into, la capacitat d'avaluar expressions contra l'estat actual. 

Quan DevTools és tancat, `debugger` no fa res. Elimina la línia `debugger` abans de fer commit.

**Breakpoints Condicionals: pausar únicament quan importa**

Usa un breakpoint condicional de línia quan vols aturar l'execució però únicament quan alguna condició és certa. Aquests breakpoints són útils quan vols saltar-te pauses que no són rellevants per al teu cas, especialment en un bucle.

**Com crear-lo:** clic dret al número de línia → "Add conditional breakpoint" → escrius una expressió JavaScript.

| // Exemples d'expressions per a breakpoints condicionals:// Pausar únicament quan l'usuari és undefineduserId \=== undefined// Pausar únicament a la 5a iteració d'un buclei \=== 4// Pausar únicament quan la resposta té errorresponse.status \>= 400// Pausar quan el preu supera un valorproducte.preu \> 1000// Pausar quan un objecte té una propietat específicausuari.rol \=== 'admin' |
| :---- |

Això és molt més útil que tenir `if (condition) console.log(...)` escampats per tot el codi.

**Logpoints: logging sense modificar el codi**

Una variant dels breakpoints condicionals. Clic dret → "Add logpoint" → escrius el missatge. Registra a la consola quan l'execució arriba a aquella línia, **sense pausar**:

| // El logpoint mostraria a la consola:// Producte: {nom: "Portàtil", preu: 999}\`Producte: ${JSON.stringify(producte)}\` |
| :---- |

**Altres tipus de breakpoints**

Més enllà dels breakpoints de línia: breakpoints condicionals per a bucles, logpoints per a logging sense pausa, DOM breakpoints per fer seguiment de canvis en elements, XHR breakpoints per a peticions de xarxa, i event listener breakpoints per traçar interaccions de l'usuari.

* **DOM breakpoints** — pausa quan un element del DOM és modificat. Clic dret sobre un element al panell Elements → "Break on" → tria: modificació d'atributs, eliminació del node o modificació del subàrbre.  
* **XHR/Fetch breakpoints** — pausa quan es fa una petició de xarxa que coincideix amb una URL. Molt útil per debugar quan i com l'app fa les crides a l'API.  
* **Event listener breakpoints** — pausa quan s'executa qualsevol listener d'un tipus d'event específic (click, keydown, etc.).  
* **Exception breakpoints** — al panell Breakpoints, activa "Pause on uncaught exceptions" per pausar automàticament quan es produeix un error. Amb "Pause on caught exceptions" actiu, pausa fins i tot en errors capturats per try/catch.

**Els controls de navegació quan estàs pausat**

Un cop pausat en un breakpoint, uses els botons de la barra superior per controlar l'execució:

* **Resume (F8)** — continua l'execució fins al proper breakpoint o fins al final.   
* **Step over (F10)** — executa la línia següent però si és una crida a funció, no hi entra: executa la funció i torna.   
* **Step into (F11)** — entra dins de la funció de la línia següent per debugar-la.   
* **Step out (Shift+F11)** — continua fins al final de la funció actual i torna al context que la va cridar.

**Call Stack: entendre d'on ve l'error**

El Call Stack mostra la cadena de crides niuades. En el moment actual, el debugger és dins d'una crida de funció. Si cliques un element de la pila (per exemple, "anonymous"), el debugger salta al codi corresponent i es poden examinar totes les seves variables.

Llegeix-lo de baix a dalt: el script global va cridar `displayArea`, que va cridar `calculateArea`, que va cridar `multiply`, on estem pausats ara. Clica qualsevol nom de funció al Call Stack per saltar a aquell punt del codi i veure les variables que estaven en scope quan aquella funció es va cridar. Això et permet traçar tota la cadena d'execució per trobar on va anar malament.

Call Stack (llegit de dalt a baix \= més recent primer):  
  multiply          ← estem aquí (més recent)  
  calculateArea  
  displayArea  
  (anonymous)       ← l'script global (menys recent)

**Per a codi asíncron:** usa el checkbox "Async call stack" al panell del call stack per veure la cadena de crides asíncrones que han portat al breakpoint actual.

**Watch Expressions: monitoritzar valors al llarg del temps**

El panell Watch mostra els valors actuals de qualsevol expressió. Pots clicar el "+" i introduir una expressió. El debugger mostrarà el seu valor, recalculant-lo automàticament durant l'execució. No es limita únicament a variables: pots emmagatzemar qualsevol expressió JavaScript vàlida al panell Watch.

Per exemple, pots afegir `typeof sum` com a watch expression per veure si una variable és del tipus correcte. DevTools mostra el resultat de l'expressió a la dreta dels dos punts. Gràcies a la watch expression, pots descobrir que `sum` s'està avaluant com a string quan hauria de ser un número.

| // Exemples de watch expressions útils:typeof usuari           // comprova el tipus → 'object', 'undefined'...usuari?.email           // accés segur a propietatproductes.length        // longitud d'un arrayJSON.stringify(estat)   // serialitzar un objecte per veure'l complettotalPreu \> 100         // avaluació de condició → true/falsenew Date().toISOString() // valor dinàmic que canvia en cada pas |
| :---- |

Clica "Add Expression" per crear una nova watch expression. Clica "Refresh" per actualitzar manualment els valors de totes les expressions. Els valors es renoven automàticament mentre passes pel codi pas a pas.

**La Console quan estàs pausat: la tècnica més poderosa**

La habilitat de debugging amb més impacte: pausar en un breakpoint, obrir la Console, i començar a interrogar l'estat en temps d'execució. Tens accés complet a totes les variables en scope:

| // Mentre estàs pausat dins d'una funció amb \`usuari\` en scope:\> usuari{ id: 42, nom: 'Anna', rol: 'admin' }\> usuari.rol \=== 'admin'true\> JSON.stringify(usuari, null, 2)'{\\n  "id": 42,\\n ...'// Modifica valors per provar branques alternatives\> usuari.rol \= 'viewer''viewer'// Ara continues → el codi executarà la branca de 'viewer' |
| :---- |

**Scope: veure totes les variables disponibles**

El panell Scope proporciona una de les informacions més útils quan es debugga JavaScript. Pots veure i editar les propietats locals, de closure i globals mentre l'app és pausada.

El panell Scope mostra tres nivells: **Local** (variables de la funció actual), **Closure** (variables de funcions externes capturades pel closure) i **Global** (variables globals com `window`).

**Resum: el flux complet de debugging amb Sources**

1\. Identifica on podria estar el bug  
         ↓  
2\. Posa un breakpoint (clic al número de línia)  
   o breakpoint condicional si és en un bucle  
         ↓  
3\. Reprodueix el comportament problemàtic  
         ↓  
4\. L'execució es pausa al breakpoint  
         ↓  
5\. Mira el Call Stack (d'on ve?)  
   Mira el Scope (quins valors hi ha?)  
   Usa Watch Expressions (expressions personalitzades)  
   Usa la Console (interroga l'estat lliurement)  
         ↓  
6\. Step Over / Step Into per avançar pas a pas  
         ↓  
7\. Quan trobes el problema, edita el codi  
   (o pren nota i edita a VS Code)  
         ↓  
8\. Resume per continuar l'execució

