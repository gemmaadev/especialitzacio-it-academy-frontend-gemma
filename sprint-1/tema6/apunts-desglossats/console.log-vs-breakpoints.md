## **`console.log` vs. Breakpoints: quan usar cada un**

**El dilema del developer**

Un mètode comú per debugar és inserir molts `console.log()` al codi per inspeccionar valors a mesura que el script s'executa. El mètode `console.log()` pot fer la feina, però els breakpoints ho poden fer més ràpidament.

`console.log` és la primera eina de debugging que la majoria de developers aprèn i l'última que molts deixen d'usar. Funciona, però la consola té moltes altres maneres de fer el debugging més ràpid i clar. I un cop t'has acostumat a DevTools de debò — breakpoints, el call stack, watch expressions — recorreràs al log menys sovint del que ho feies.

**`console.log`: la navalla suïssa del debugging ràpid**

### **Avantatges**

**Simplicitat**: els `console.log` són directes d'implementar i requereixen una configuració mínima, fent-los adequats per a tasques de debugging ràpides. 

**Flexibilitat**: pots registrar variables, propietats d'objectes, resultats de funcions i missatges personalitzats, proporcionant flexibilitat per debugar escenaris molt diferents. 

**Accessibilitat**: els console logs funcionen en tots els navegadors moderns i entorns de desenvolupament, fent-los universalment accessibles.

| // Usos pràctics i eficients de console.logconsole.log('valor:', variable);// Patró object shorthand: etiqueta automàticaconst { usuari, productes, total } \= estat;console.log({ usuari, productes, total });  // mostra nom i valor// console.table: perfecte per a arrays d'objectesconsole.table(productes);  // renderitza una taula navegable// console.group: agrupar logs relacionatsconsole.group('Petició API /usuaris');console.log('Request:', url);console.log('Resposta:', data);console.groupEnd();// console.time: mesurar rendimentconsole.time('càlcul');calcularTotal(productes);console.timeEnd('càlcul');  // → "càlcul: 2.3ms"// console.warn i console.error: diferenciar nivellsconsole.warn('⚠️ Dades incompletes');console.error('❌ Error crític'); |
| :---- |

### **Desavantatges**

* **Insight limitat**: els `console.log` proporcionen una visió limitada del flux d'execució i l'estat del codi comparat amb els breakpoints. Has de decidir **d'avançada** quines variables vols veure.  
* **Risc en producció**: quan fas `console.log()` en development, és fàcil oblidar que aquests statements poden sobreviure a producció. Sempre comprova que no queden logs en el codi que puges al repositori.

| // ❌ El problema clàssic: logs que arriben a producciófunction calcularDescompte(preu) {  console.log('Calculant descompte per:', preu);  // ← acaba a producció  return preu \* 0.9;} |
| :---- |

* **Temps perdut:** si el bug és profund, hauràs d'afegir logs, recarregar, veure el resultat, afegir més logs, tornar a recarregar... fins que arribes a la variable correcta. Amb un breakpoint, ho veus tot d'una.

**Breakpoints: el debugging professional**

### **Avantatges**

1. **Precisió**: els breakpoints proporcionen control precís sobre on i quan l'execució s'hauria de pausar, permetent investigar problemes de manera sistemàtica.   
2. **Inspecció**: els developers poden inspeccionar variables, objectes i call stacks directament dins de l'entorn de debugging.   
3. **Interactivitat**: les sessions de debugging són interactives, permetent avançar pel codi, executar statements i observar canvis dinàmicament.

La primera vegada que uses un debugger de debò en lloc de `console.log`, sembla una superpower. Pots veure totes les variables en scope sense decidir d'avançada quines vols imprimir. Pots avançar per condicionals i veure quina branca s'executa. Solucionar un bug complicat passa de minuts a segons.

| // El poder dels breakpoints: veus TOT sense decidir res d'avançada// Scope panel mentre estàs pausat://// Local://   preu: 99.99//   descompte: 0.1//   subtotal: "89.991"   ← un string\! aquí és el bug\!//   iva: 0.21//   total: NaN            ← resultat incorrecte//// I pots fer preguntes a la Console:\> typeof subtotal"string"  ← confirmació del bug |
| :---- |

### **Desavantatges**

* **Altament basat en GUI**: la zona de breakpoints es presenta amb controls gràfics, de manera que els developers han d'usar el ratolí sovint, cosa que pot ser contraproductiva per als developers que prefereixen el teclat. **Cal configuració prèvia**: has de posar els breakpoints amb atenció abans d'usar-los. El procés pot semblar menys productiu, raó per la qual molts developers prefereixen usar múltiples `console.log()`.  
* **No adequat per a producció**: els breakpoints no són adequats per debugar en entorns de producció. Tampoc funcionen per a errors intermitents que no pots reproduir fàcilment.

**El Logpoint: el millor dels dos mons**

Chrome DevTools ofereix una opció que combina els avantatges dels dos enfocaments: el **Logpoint**.

Un Logpoint registra un missatge a la consola quan l'execució arriba a una línia, **sense pausar** i **sense modificar el codi**. Clic dret a la línia → "Add logpoint" → escrius l'expressió:

| // El Logpoint substitueix aquest patró:console.log('usuari a línea 47:', usuari);// Amb un Logpoint, ho fas des de DevTools sense tocar el codi.// Quan acabes, simplement l'elimines des de DevTools.// No queden logs accidentals al codi. |
| :---- |

Els breakpoints condicionals eliminen la majoria dels patrons `if (x) console.log()`. Els Logpoints afegeixen logging sense tocar el codi font.

**Quan usar cada un?** 

**Usa `console.log` quan:**

* El problema és simple i saps exactament quina variable vols veure  
* Vols deixar traces permanents del flux d'execució (logs d'informació)  
* Estàs debugant codi asíncron amb múltiples promises on pausar trencaria el timing  
* Vols compartir informació de debugging amb un company per text  
* Treballes en un entorn on no tens accés a DevTools (Node.js al servidor sense inspector)

**Usa breakpoints quan:**

* No saps exactament on és el bug i necessites explorar  
* El bug implica múltiples variables i objectes complexos  
* Vols entendre el flux d'execució pas a pas (quina branca pren el codi?)  
* Estàs debugant closures o problemes de scope  
* Necessites modificar valors de variables en temps real per provar solucions

**Usa Logpoints quan:**

* Vols el comportament d'un `console.log` però sense modificar el codi  
* El problema és intermitent i no pots pausar l'execució

**Comparativa directa**

|  | `console.log` | Breakpoints | Logpoints |
| ----- | ----- | ----- | ----- |
| **Velocitat de setup** | Molt ràpida | Mitjana | Ràpida |
| **Modifica el codi** | Sí ⚠️ | No | No |
| **Risc producció** | Alt ⚠️ | Cap | Cap |
| **Variables visibles** | Únicament les que tries | Totes les del scope | Únicament les que tries |
| **Flux d'execució** | No | Sí (step by step) | No |
| **Interactivitat** | No | Sí (Console live) | No |
| **Errors intermitents** | Millor | Difícil | Millor |
| **Codi asíncron complex** | Millor | Pot trencar timing | Millor |
| **Ideal per a** | Verificació ràpida, logs | Investigació profunda | Log sense modificar codi |

La resposta real no és "l'un o l'altre": és **tots dos, en el moment correcte**. Comença amb `console.log` per confirmar ràpidament una hipòtesi simple. Si el bug és esquiu o complex, passa als breakpoints. I recorda sempre eliminar els `console.log` de debugging abans de fer el commit.

| // ✅ El patró professional// 1\. Hipòtesi ràpida → console.logconsole.log('tipus:', typeof valor);  // confirma en 2 segons// 2\. Bug complex → breakpoint \+ explorar el Scope// (no cal tocar el codi)// 3\. Quan has acabat → elimines els logs// (els breakpoints ja no estan al codi) |
| :---- |

