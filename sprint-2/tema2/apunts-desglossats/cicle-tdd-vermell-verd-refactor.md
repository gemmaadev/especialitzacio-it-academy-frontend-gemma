## **El cicle TDD: vermell, verd, refactor**

**Introducció: per què un cicle?**

TDD viu i mor per un ritme de tres passos anomenat Red-Green-Refactor. És enganyosament simple, però cada paraula importa.

La idea fonamental és invertir l'ordre de treball habitual. En el desenvolupament tradicional: escrius codi → comprobes si funciona → potser escrius tests. 

En TDD: escrius un test → el veus fallar → escrius el codi mínim → el veus passar → millores el codi. El test és la brúixola que guia la implementació.

Cada un dels passos del cicle TDD té un propòsit. 

El pas vermell et fa pensar en el disseny dels contractes per als teus mòduls, classes i funcions. Mentre escrius els tests, estàs pensant en com el teu nou codi serà consumit. 

El pas verd és sobre fer funcionar el codi i fer passar els tests. 

El pas de refactorització és sobre fer el codi ben enginyeriat.

**Fase 1: Vermell — Escriu el test que falla**

La fase vermella és sempre el punt de partida del cicle Red-Green-Refactor. El propòsit d'aquesta fase és escriure un test que informa la implementació d'una funcionalitat. El test únicament passarà quan les seves expectatives es compleixin.

Escriu un test que descriu un únic comportament que el teu codi encara no té. Executa'l. Ha de fallar. Si passa immediatament, o bé la funcionalitat ja existeix o bé el test és trencat. Un test que passa abans de qualsevol implementació és una senyal d'alarma, no un semàfor verd.

El test que falla confirma dues coses: que el test és vàlid i que la funcionalitat que descriu realment no existeix encara.

| // FASE VERMELLA: Escrivim el test PRIMER// La funció calcularIVA no existeix encaraimport { calcularIVA } from './preus';  // ← aquest import fallaràdescribe('calcularIVA', () \=\> {  it('aplica el 21% d\\'IVA a un preu base', () \=\> {    const resultat \= calcularIVA(100);    expect(resultat).toBe(121);  });});// Executem: npm test// ❌ VERMELL: Cannot find module './preus'// ← Perfecte\! El test falla perquè la funció no existeix |
| :---- |

La regla del vermell: **no escriguis cap línia de codi de producció sense un test que falli primer**. Cada nova funcionalitat comença aquí.

**Fase 2: Verd — Escriu el mínim codi per passar el test**

Un cop tenim un test que falla, el següent pas és escriure la quantitat mínima de codi necessari per fer-lo passar. Aquest pas es refereix com la fase "Green", ja que ara estem centrats en fer passar els tests.

No codi net. No codi intel·ligent. El mínim. Seriosament, retorna un valor codificat si és tot el que fa falta. El punt de la fase verd no és impressionar ningú — és confirmar que el teu test funciona i que pots passar a fer-lo funcionar correctament.

| // FASE VERDA: Escrivim el MÍNIM codi per passar el test// preus.tsexport function calcularIVA(preuBase: number): number {  return 121;  // ← valor hardcoded\! (és vàlid en fase verda)}// Executem: npm test// ✅ VERD: calcularIVA \> aplica el 21% d'IVA a un preu base ✓ |
| :---- |

La fase verda deliberadament permet solucions "trampa". Perquè? Perquè el valor hardcoded ens dirà que necessitem més tests per forçar una implementació real.

| // Afegim un segon test per forçar la implementació realit('aplica el 21% d\\'IVA a 50€', () \=\> {  const resultat \= calcularIVA(50);  expect(resultat).toBe(60.5);  // 50 \* 1.21});// Ara el hardcode ❌ VERMELL: received 121, expected 60.5// Hem de generalitzar la solució:export function calcularIVA(preuBase: number): number {  return preuBase \* 1.21;  // ✅ implementació real} |
| :---- |

**Fase 3: Refactor — Millora el codi sense canviar el comportament**

Aconseguint un test que passa, el pas final és refactoritzar el codi. Això significa netejar el codi, millorar la seva estructura, o optimitzar-lo sense alterar la seva funcionalitat. 

L'objectiu és millorar la qualitat del codi mentre s'assegura que tots els tests continuen passant. 

Com sabràs si introdueixes canvis que trenquen res? Els tests que vas crear en el pas verd fallaran\!

| // FASE REFACTOR: Millorem el codi (els tests ja passen)// Versió verd (funciona però no és clara):export function calcularIVA(preuBase: number): number {  return preuBase \* 1.21;}// Versió refactoritzada (millor llegibilitat):const IVA\_GENERAL \= 0.21;export function calcularIVA(preuBase: number): number {  return preuBase \* (1 \+ IVA\_GENERAL);}// Executem: npm test// ✅ VERD: tots els tests continuen passant// El comportament no ha canviat, però el codi és millor |
| :---- |

Coses que es fan al refactor: extreure constants amb noms significatius, simplificar expressions complexes, eliminar duplicació de codi, millorar els noms de variables i funcions, i aplicar patrons de disseny si escau.

**El cicle complet: construir una calculadora de preus**

Vegem el cicle complet aplicat a un exemple real:

| // \============ ITERACIÓ 1 \============// VERMELL: test que descriu el comportamentit('calcula el total sense descompte', () \=\> {  const preu \= calcularPreu(100, 0);  expect(preu.subtotal).toBe(100);  expect(preu.iva).toBe(21);  expect(preu.total).toBe(121);});// ❌ calcularPreu no existeix// VERD: implementació mínimaexport function calcularPreu(base: number, descompte: number) {  return { subtotal: 100, iva: 21, total: 121 };  // hardcode}// ✅ passa (però és una trampa)// \============ ITERACIÓ 2 \============// VERMELL: forcem la generalitzacióit('calcula el total amb un preu diferent', () \=\> {  const preu \= calcularPreu(200, 0);  expect(preu.total).toBe(242);});// ❌ received 121, expected 242// VERD: implementació realexport function calcularPreu(base: number, descompte: number) {  const subtotal \= base;  const iva \= subtotal \* 0.21;  const total \= subtotal \+ iva;  return { subtotal, iva, total };}// ✅ tots els tests passen// \============ ITERACIÓ 3 \============// VERMELL: afegim el descompteit('aplica el descompte al subtotal', () \=\> {  const preu \= calcularPreu(100, 10);  // 10% de descompte  expect(preu.subtotal).toBe(90);  expect(preu.total).toBeCloseTo(108.9);});// ❌ subtotal és 100, no 90// VERD: afegim la lògica del descompteexport function calcularPreu(base: number, descomptePercent: number) {  const subtotal \= base \* (1 \- descomptePercent / 100);  const iva \= subtotal \* 0.21;  const total \= subtotal \+ iva;  return { subtotal, iva, total };}// ✅ tots els tests passen// REFACTOR: extraiem les constants i millorem la llegibilitatconst IVA\_RATE \= 0.21;interface ResultatPreu {  subtotal: number;  iva: number;  total: number;}export function calcularPreu(  base: number,  descomptePercent: number \= 0): ResultatPreu {  const subtotal \= base \* (1 \- descomptePercent / 100);  const iva \= subtotal \* IVA\_RATE;  const total \= subtotal \+ iva;  return { subtotal, iva, total };}// ✅ tots els tests continuen passant |
| :---- |

**Els errors més comuns al cicle TDD**

* **Error 1: Escriure múltiples tests alhora.** Solució: estrictament un test a la vegada. Escriu un test, fes-lo verd, refactoritza, i llavors escriu el següent. El cicle és per test, no per funcionalitat.  
* **Error 2: Saltar-se el vermell.** Si implementes codi sense haver vist fallar el test primer, no saps si el test és vàlid. Un test que mai has vist en vermell pot ser un test que no prova res.  
* **Error 3: Saltar-se el refactor.** La fase de refactor no és opcional. Sense ella, el codi passa els tests però s'acumula deute tècnic progressivament.  
* **Error 4: Fer massa a la fase verda.** La fase verda demana el mínim codi per passar el test, no la implementació completa. Implementar massa d'un cop elimina la guia iterativa que proporciona TDD.

**El cicle visualitzat**

|       ┌─────────────────────────────────────┐       │                                      │       ▼                                      │  🔴 VERMELL                                  │  Escriu un test que                          │  descriu un comportament                     │  que no existeix. Executa'l.                 │  Ha de fallar.                               │       │                                      │       ▼                                      │  🟢 VERD                                     │  Escriu el mínim codi                        │  per fer passar el test.                     │  No et preocupis per la qualitat.            │       │                                      │       ▼                                      │  🔵 REFACTOR                                 │  Millora el codi sense canviar               │  el comportament. Els tests                  │  han de seguir passant.                      │       │                                      │       └───────────────────────────────────┘              Repeteix per a la              propera funcionalitat |
| :---- |

