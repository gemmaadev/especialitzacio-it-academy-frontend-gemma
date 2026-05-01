## **Code Smells: Detectar i solucionar codi de mala qualitat**

**Code Smells**  
[https://refactoring.guru/es/refactoring/smells](https://refactoring.guru/es/refactoring/smells)  
Guia de Refactoring Guru sobre "olors de codi" i com detectar-los.

**Què és un Code Smell?**

Un code smell és una senyal a la superfície del codi que indica un problema més profund. No és necessàriament un bug: el codi pot funcionar perfectament. Però indica que el disseny és dolent i pot causar problemes en el futur: dificultat per mantenir, afegir funcionalitats o trobar bugs.

Refactoring Guru organitza els code smells en cinc categories: 

* **Bloaters** (codi massa gran)  
* **Abusers OO** (mal ús de la OOP)  
* **Change Preventers** (codi difícil de modificar)  
* **Dispensables** (codi innecessari)   
* **Couplers** (acoblament excessiu)

**Categoria 1: Bloaters — Codi que creix massa**

### **Long Method: funcions massa llargues**

Una funció que fa massa coses és difícil d'entendre, testar i reutilitzar. Si has d'afegir un comentari per explicar un bloc de codi, és senyal que hauries d'extreure'l com a funció.

| // ❌ Long Method: fa massa coses alhorafunction procesarComanda(comanda) {  // Validar dades  if (\!comanda.usuari) throw new Error('Usuari requerit');  if (\!comanda.productes.length) throw new Error('Sense productes');  if (comanda.productes.some(p \=\> p.preu \<= 0)) throw new Error('Preu invàlid');  // Calcular total  let subtotal \= 0;  for (const p of comanda.productes) {    subtotal \+= p.preu \* p.quantitat;  }  const descompte \= comanda.usuari.premium ? subtotal \* 0.1 : 0;  const iva \= (subtotal \- descompte) \* 0.21;  const total \= subtotal \- descompte \+ iva;  // Enviar email  const missatge \= \`Comanda confirmada. Total: ${total}€\`;  enviarEmail(comanda.usuari.email, missatge);  // Guardar a la BD  guardarComanda({ ...comanda, total });}// ✅ Extract Method: cada responsabilitat té la seva funciófunction validarComanda(comanda) {  if (\!comanda.usuari) throw new Error('Usuari requerit');  if (\!comanda.productes.length) throw new Error('Sense productes');  if (comanda.productes.some(p \=\> p.preu \<= 0)) throw new Error('Preu invàlid');}function calcularTotal(productes, usuari) {  const subtotal \= productes.reduce((acc, p) \=\> acc \+ p.preu \* p.quantitat, 0);  const descompte \= usuari.premium ? subtotal \* 0.1 : 0;  return (subtotal \- descompte) \* 1.21;}function procesarComanda(comanda) {  validarComanda(comanda);  const total \= calcularTotal(comanda.productes, comanda.usuari);  enviarConfirmacio(comanda.usuari.email, total);  guardarComanda({ ...comanda, total });} |
| :---- |

**Long Parameter List: massa paràmetres**

Quan una funció té molts paràmetres és senyal que fa massa coses o que els paràmetres haurien d'agrupar-se.

| // ❌ Massa paràmetres: confús i fàcil equivocar l'ordrefunction crearUsuari(nom, cognom, email, edat, ciutat, pais, rol, actiu) {  // ...}crearUsuari('Anna', 'García', 'anna@e.com', 25, 'BCN', 'ES', 'admin', true);// Qui recorda l'ordre? Fàcil posar actiu on hauria d'anar rol// ✅ Introduce Parameter Object: agrupar en un objectefunction crearUsuari({ nom, cognom, email, edat, adreca, rol, actiu \= true }) {  // ...}crearUsuari({  nom: 'Anna',  cognom: 'García',  email: 'anna@exemple.com',  edat: 25,  adreca: { ciutat: 'Barcelona', pais: 'Espanya' },  rol: 'admin',});// Ara cada paràmetre té el seu nom i l'ordre no importa |
| :---- |

**Magic Numbers / Primitive Obsession: valors màgics**

Números o strings literals dispersos pel codi que no s'expliquen per si sols.

| // ❌ Magic Numbers: qui sap per a que serveix el 0.21 o el 500?function calcularEnviament(total, pes) {  if (total \> 50) return 0;  return pes \> 500 ? 8.99 : 4.99;}// ✅ Replace Magic Number with Symbolic Constantconst ENVIAMENT\_GRATUIT\_MINIM \= 50;   // eurosconst PES\_PESANT \= 500;               // gramsconst PREU\_ENVIAMENT\_PESANT \= 8.99;const PREU\_ENVIAMENT\_STANDARD \= 4.99;function calcularEnviament(total, pesGrams) {  if (total \> ENVIAMENT\_GRATUIT\_MINIM) return 0;  return pesGrams \> PES\_PESANT ? PREU\_ENVIAMENT\_PESANT : PREU\_ENVIAMENT\_STANDARD;} |
| :---- |

**Categoria 2: Dispensables — Codi innecessari**

### **Duplicate Code: codi duplicat (DRY)**

El principi DRY (Don't Repeat Yourself): cada peça de coneixement ha d'existir una sola vegada al codi. Si canvies una còpia i oblides l'altra, introdueixes un bug.

| // ❌ Codi duplicat en dues funcions similarsfunction mostrarErrorXarxa(missatge) {  const el \= document.createElement('div');  el.className \= 'alert alert-error';  el.textContent \= missatge;  document.body.appendChild(el);  setTimeout(() \=\> el.remove(), 3000);}function mostrarExit(missatge) {  const el \= document.createElement('div');  el.className \= 'alert alert-success';  el.textContent \= missatge;  document.body.appendChild(el);  setTimeout(() \=\> el.remove(), 3000);}// ✅ Extract Method: una sola funció parametritzadafunction mostrarAlerta(missatge, tipus \= 'info', durada \= 3000) {  const el \= document.createElement('div');  el.className \= \`alert alert-${tipus}\`;  el.textContent \= missatge;  document.body.appendChild(el);  setTimeout(() \=\> el.remove(), durada);}mostrarAlerta('Connexió perduda', 'error');mostrarAlerta('Guardat correctament', 'success'); |
| :---- |

**Dead Code: codi mort**

Codi que mai s'executa: funcions que ningú crida, variables que mai s'usen, condicions que mai es compleixen. Confon qui llegeix el codi i fa el projecte més difícil de mantenir.

| // ❌ Codi mort: funcions que ningú crida, condicions impossiblesfunction formatarData(data) {  // Codi vell que ja no s'usa  // if (data \=== null) return ''; // mai es crida amb null  // const vell \= format\_antic(data); // funció eliminada fa mesos  return new Intl.DateTimeFormat('ca').format(data);}// ✅ Solució: eliminar el codi mort sense por// Si cal recuperar-lo, existeix al control de versions (Git)function formatarData(data) {  return new Intl.DateTimeFormat('ca').format(data);} |
| :---- |

**Comments: comentaris excessius que expliquen el que el codi ja diu**

Els comentaris que expliquen el **"quèés"** en lloc del **"per quèés"** solen ser un senyal que el codi no és prou expressiu. La solució és escriure codi que s'expliqui sol.

| // ❌ Comentaris que expliquen el que el codi ja diu// Comprova si l'usuari és adultif (usuari.edat \>= 18) {  // Calcula el descompte del 10%  const desc \= total \* 0.1;  // Aplica el descompte al total  total \= total \- desc;}// ✅ Codi expressiu que s'explica solconst ES\_ADULT \= usuari.edat \>= 18;const DESCOMPTE\_ADULT \= 0.10;if (ES\_ADULT) {  total \*= (1 \- DESCOMPTE\_ADULT);}// ✅ Comentaris útils: expliquen el "per quèés", no el "quèés"// WCAG requereix contrast mínim 4.5:1 per a text normalconst CONTRAST\_MINIM \= 4.5; |
| :---- |

**Categoria 3: Change Preventers — Difícil de modificar**

### **Shotgun Surgery: un canvi afecta molts llocs**

Quan fer un canvi petit requereix modificar molts fitxers o funcions disperses. Indica que la lògica que hauria d'estar junta està escampada.

| // ❌ Shotgun Surgery: el format del preu apareix en 5 llocs// components/ProductCard.jsconst preu \= \`${amount.toFixed(2)}€\`;// components/CartItem.jsconst total \= \`${(price \* qty).toFixed(2)}€\`;// pages/Checkout.jsconst subtotal \= \`${value.toFixed(2)} euros\`;// utils/pdf.jsconst import \= amount.toFixed(2) \+ '€';// ✅ Solució: centralitzar la lògica en un lloc// utils/format.jsexport const formatPreu \= (amount, moneda \= 'EUR') \=\>  new Intl.NumberFormat('ca-ES', { style: 'currency', currency: moneda })    .format(amount);// Ara tots els llocs usen el mateix:import { formatPreu } from '../utils/format';const preu \= formatPreu(amount);  // '10,99 €' |
| :---- |

**Divergent Change: una classe canvia per raons molt diferents**

Si una mateixa classe o mòdul s'ha de modificar per raons molt diferents (afegir una nova funcionalitat de pagament I canviar el format de l'informe), és senyal que fa massa coses. Viola el Principi de Responsabilitat Única (SRP).

| // ❌ Una classe que fa massa coses (canvia per raons molt diverses)class GestorComandes {  calcularTotal(comanda) { /\* lògica de negoci \*/ }  guardarABaseDeDades(comanda) { /\* persistència \*/ }  enviarEmail(comanda) { /\* comunicació \*/ }  generarPDF(comanda) { /\* presentació \*/ }  validarComanda(comanda) { /\* validació \*/ }}// ✅ Extract Class: separar responsabilitatsclass CalculadorComanda {  calcularTotal(comanda) { /\* ... \*/ }  validarComanda(comanda) { /\* ... \*/ }}class RepositoriComanda {  guardar(comanda) { /\* ... \*/ }  trobarPerId(id) { /\* ... \*/ }}class NotificadorComanda {  enviarConfirmacio(comanda) { /\* ... \*/ }}class GeneradorDocuments {  generarPDF(comanda) { /\* ... \*/ }} |
| :---- |

**Categoria 4: Couplers — Acoblament excessiu**

### **Feature Envy: una funció utilitza massa dades d'un altre objecte**

Quan una funció accedeix contínuament a les propietats d'un altre objecte, probablement hauria d'estar en aquell objecte.

| // ❌ Feature Envy: calcularDescompte usa massa dades de Usuariclass Usuari {  constructor(nom, edat, subscripcio, compresAny) {    this.nom \= nom;    this.edat \= edat;    this.subscripcio \= subscripcio;    this.compresAny \= compresAny;  }}// Aquesta funció "enveja" les dades de Usuarifunction calcularDescompte(usuari, total) {  if (usuari.subscripcio \=== 'premium') return total \* 0.15;  if (usuari.edat \>= 65) return total \* 0.10;  if (usuari.compresAny \> 10) return total \* 0.05;  return 0;}// ✅ Move Method: moure la lògica on viuen les dadesclass Usuari {  constructor(nom, edat, subscripcio, compresAny) {    this.nom \= nom;    this.edat \= edat;    this.subscripcio \= subscripcio;    this.compresAny \= compresAny;  }  calcularDescompte(total) {    if (this.subscripcio \=== 'premium') return total \* 0.15;    if (this.edat \>= 65) return total \* 0.10;    if (this.compresAny \> 10) return total \* 0.05;    return 0;  }} |
| :---- |

**Message Chains: cadenes llargues d'accessos**

| // ❌ Message Chain: cada . és una dependènciaconst ciutat \= comanda.usuari.adreca.entregament.ciutat.nom;// Si qualsevol punt de la cadena és null → error en execució// Difícil de testar i de canviar// ✅ Optional Chaining \+ valor per defecteconst ciutat \= comanda?.usuari?.adreca?.entregament?.ciutat?.nom ?? 'No especificada';// ✅ O millor: encapsular l'accésclass Comanda {  getCiutatEntregament() {    return this.usuari?.adreca?.entregament?.ciutat?.nom ?? 'No especificada';  }} |
| :---- |

**Les regles d'or del codi net**

**Regla 1: Early Return (Guard Clauses)** — elimina nivells d'indentació retornant aviat.

| // ❌ Piràmide de la mortfunction procesarPagament(comanda) {  if (comanda) {    if (comanda.usuari) {      if (comanda.usuari.actiu) {        if (comanda.total \> 0) {          // lògica real aquí...        }      }    }  }}// ✅ Guard Clauses: surt aviat si les condicions no es compleixenfunction procesarPagament(comanda) {  if (\!comanda) return;  if (\!comanda.usuari) return;  if (\!comanda.usuari.actiu) throw new Error('Usuari inactiu');  if (comanda.total \<= 0) throw new Error('Total invàlid');  // lògica real sense indentació excessiva} |
| :---- |

**Regla 2: Noms descriptius** — el codi ha d'explicar-se sol sense comentaris.

| // ❌ Noms crípticsconst x \= u.filter(i \=\> i.a && \!i.d);// ✅ Noms descriptiusconst usuarisActiusSenseDeute \= usuaris.filter(  usuari \=\> usuari.actiu && \!usuari.teDeute); |
| :---- |

**Regla 3: Una funció, una responsabilitat** — una funció fa una sola cosa, i la fa bé.

**Taula resum**

| Code Smell | Categoria | Solució |
| ----- | ----- | ----- |
| Long Method | Bloater | Extract Method |
| Long Parameter List | Bloater | Introduce Parameter Object |
| Magic Numbers | Bloater | Replace with Named Constants |
| Duplicate Code | Dispensable | Extract Method \+ DRY |
| Dead Code | Dispensable | Eliminar (Git ho guarda) |
| Comentaris excessius | Dispensable | Codi expressiu |
| Shotgun Surgery | Change Preventer | Centralitzar lògica |
| Divergent Change | Change Preventer | Extract Class (SRP) |
| Feature Envy | Coupler | Move Method |
| Message Chains | Coupler | Optional Chaining \+ Encapsular |
| Piràmide d'indentació | OO Abuser | Guard Clauses |

