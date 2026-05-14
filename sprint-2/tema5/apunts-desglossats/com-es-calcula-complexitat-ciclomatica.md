**¿Com es calcula la Complexitat Ciclomàtica i quins valors es consideren acceptables, preocupants o perillosos?**

**Understanding Cyclomatic Complexity**  
[https://www.perforce.com/blog/qac/what-cyclomatic-complexity](https://www.perforce.com/blog/qac/what-cyclomatic-complexity)  
Article que explica la complexitat ciclomàtica i el seu impacte en la qualitat del codi.

**Què és la complexitat ciclomàtica**

La complexitat ciclomàtica (CYC) és una mètrica de software usada per determinar la complexitat d'un programa. La complexitat ciclomàtica és un recompte del nombre de decisions en el codi font. Com més alt és el recompte, més complex és el codi.

Va ser introduïda per Thomas J. McCabe Sr. al seu paper de 1976 "A Complexity Measure", publicat a IEEE Transactions on Software Engineering, i es coneix per això com la **Mètrica de McCabe**.

La complexitat ciclomàtica es pot usar de dues maneres: per limitar la complexitat del codi, i per determinar el nombre de casos de test necessaris.

**La fórmula matemàtica**

Usa la fórmula següent per calcular la complexitat ciclomàtica:

**CYC \= E – N \+ 2P**

On: P \= nombre de parts desconnectades del graf de flux, E \= nombre d'arestes (transferències de control), N \= nombre de nodes (grup seqüencial de statements).

Però hi ha una manera molt més pràctica per al dia a dia:

**CYC \= Nombre de decisions \+ 1**

On "decisions" son: `if`, `else if`, `while`, `for`, `for...of`, `for...in`, `case` (en switch), `catch`, l'operador ternari `? :`, i els operadors lògics `&&` i `||` dins de condicionals.

**Com calcular-la en la pràctica: el mètode ràpid**

La manera més senzilla: **compta les paraules clau de decisió i afegeix 1**.

| // Exemple 1: Funció simplefunction calcularDescompte(preu: number, esPremium: boolean): number {  if (esPremium) {              // \+1 decisió    return preu \* 0.9;  }  return preu;}// Decisions: 1 → CYC \= 1 \+ 1 \= 2 |
| :---- |

| // Exemple 2: Funció moderadament complexafunction classificarClient(  edat: number,  ingressos: number,  teHistorial: boolean): string {  if (edat \< 18) {                        // \+1    return 'menor';  }  if (ingressos \> 50000) {                // \+1    if (teHistorial) {                    // \+1      return 'premium';    }    return 'estandard-alt';  }  if (ingressos \> 25000 && teHistorial) { // \+1 (if) \+ 1 (&&)    return 'estandard-mig';  }  return 'basic';}// Decisions: 5 → CYC \= 5 \+ 1 \= 6 |
| :---- |

| // Exemple 3: Funció molt complexa (codi problemàtic)function processarPagament(  metode: string,  quantitat: number,  usuari: Usuari,  opcions: Opcions): Resultat {  if (\!usuari) {                          // \+1    throw new Error('Usuari requerit');  }  if (quantitat \<= 0) {                   // \+1    return { error: 'Quantitat invàlida' };  }  if (metode \=== 'targeta') {             // \+1    if (opcions.guardaTargeta) {          // \+1      if (usuari.targetes.length \< 5) {  // \+1        guardarTargeta(usuari, opcions);      }    }    return processarTargeta(quantitat, opcions);  } else if (metode \=== 'paypal') {       // \+1    if (usuari.paypalVerificat) {         // \+1      return processarPaypal(quantitat);    }    return { error: 'PayPal no verificat' };  } else if (metode \=== 'transferencia') {// \+1    if (quantitat \> 10000) {             // \+1      if (\!opcions.verificacioExtra) {   // \+1        return { error: 'Verificació requerida' };      }    }    return processarTransferencia(quantitat);  }  return { error: 'Mètode desconegut' };}// Decisions: 10 → CYC \= 10 \+ 1 \= 11 ← zona de risc\! |
| :---- |

**L'operador booleà: una subtilesa important**

Les decisions binàries — com les instruccions `if` i `while` — afegeixen 1 a la complexitat. Els operadors booleans poden afegir un o res a la complexitat. Per exemple, se n'afegirà un si un operador booleà es troba dins d'una instrucció condicional.

| // Sense operadors booleans: CYC \= 1 \+ 1 \= 2if (esActiu) { }// Amb operador &&: CYC \= 2 \+ 1 \= 3if (esActiu && tePermisos) { }// Amb dos operadors: CYC \= 3 \+ 1 \= 4if (esActiu && tePermisos || esAdmin) { } |
| :---- |

**Els valors de referència: acceptable, preocupant, perillós**

Per la teoria pura: el nivell 1-4 es considera fàcil de testar, el 5-7 és acceptable, el 8-10 considera refactoritzar per facilitar el testing, i l'11+ refactoritza ara perquè el testing serà dolorós.

El límit de 10 per a la complexitat ciclomàtica és un bon punt de partida: "El límit precís a usar, no obstant, es manté una mica controvertit. El límit original de 10 proposat per McCabe té evidència de suport significativa, però límits de fins a 15 s'han usat amb èxit."

NIST recomana un valor màxim de complexitat ciclomàtica de 10 per funció. Molts equips usen això com a gate dur en els pipelines CI/CD, rebutjant pull requests que introdueixen funcions amb puntuacions de complexitat elevades per sobre del llindar.

ESCALA DE VALORS (McCabe \+ NIST):

  1-4   ✅ EXCEL·LENT  
         Codi simple i clar. Fàcil de testar, mantenir i entendre.  
         1 funció \= 1-4 tests per a cobertura completa.

  5-7   ✅ ACCEPTABLE  
         Complexitat moderada. Codi mantenible.  
         Requeria atenció en code review.

  8-10  ⚠️  PREOCUPANT  
         Considera refactoritzar. Difícil de testar completament.  
         10 és el límit recomanat per NIST i McCabe.

  11-15 🔴 ALT RISC  
         Refactoritza aviat. El testing és dolorós i costós.  
         Alta probabilitat de bugs ocults.  
         Candidat prioritari per a revisió.

  15-20 🔴🔴 MOLT ALT RISC  
         Codi difícilment mantenible. Probables violacions del SRP.  
         Cada canvi és un risc.

  \>20   💀 CRÍTIC  
         Necessita refactoring urgent. Visual Studio emet un warning  
         automàtic. Testing gairebé impossible amb cobertura completa.  
         Alta probabilitat de deute tècnic sever.

**La connexió amb el testing: per què importa**

La puntuació de complexitat correspon directament al nombre mínim de casos de test necessaris per a la cobertura completa de branques. Una funció amb una complexitat de 10 requereix almenys 10 casos de test diferenciats per exercitar tots els possibles camins d'execució.

Això té implicacions directes en el cost del testing:

Funció amb CYC \= 2  → mínim 2 tests → senzill de cobrir  
Funció amb CYC \= 5  → mínim 5 tests → manejable  
Funció amb CYC \= 10 → mínim 10 tests → complex però factible  
Funció amb CYC \= 25 → mínim 25 tests → probable que no s'escriguin mai

Si els tests no s'escriuen → els camins no testejats contenen bugs ocults

**Estratègies per reduir la complexitat ciclomàtica**

Estratègies per reduir la complexitat ciclomàtica inclouen escriure funcions més petites i eliminar el codi duplicat.

**Estratègia 1: Extreu funcions petites (Extract Function)**

| // ❌ CYC \= 8: fa massa cosesfunction processarComanda(comanda: Comanda, usuari: Usuari) {  if (\!usuari) throw new Error('Usuari requerit');       // \+1  if (\!comanda.productes.length) return null;              // \+1  if (usuari.premium) {                                    // \+1    if (comanda.total \> 100) {                            // \+1      comanda.total \*= 0.9;    }  }  if (comanda.total \> 0) {                                // \+1    if (comanda.pagament \=== 'targeta') {                  // \+1      if (\!usuari.targetes.length) return null;            // \+1    }  }  return guardar(comanda);}// ✅ CYC \= 2 per funció: responsabilitats separadesfunction validarComanda(comanda: Comanda, usuari: Usuari): boolean {  return \!\!usuari && comanda.productes.length \> 0;         // CYC \= 2}function aplicarDescompte(comanda: Comanda, usuari: Usuari): Comanda {  if (usuari.premium && comanda.total \> 100) {             // CYC \= 2 (&&)    return { ...comanda, total: comanda.total \* 0.9 };  }  return comanda;} |
| :---- |

**Estratègia 2: Substitueix condicionals per polimorfisme**

| // ❌ switch amb molts cases → CYC creixentfunction calcularDescompte(tipusClient: string, preu: number) {  switch (tipusClient) {    case 'premium': return preu \* 0.9;    // \+1    case 'gold': return preu \* 0.8;       // \+1    case 'vip': return preu \* 0.7;        // \+1    default: return preu;  }}// ✅ Polimorfisme → cada classe té CYC \= 1interface EstrategiaDescompte { calcular(preu: number): number; }class DescomptePremium implements EstrategiaDescompte { calcular(p: number) { return p \* 0.9; } }class DescompteGold implements EstrategiaDescompte { calcular(p: number) { return p \* 0.8; } } |
| :---- |

**Com mesurar-la automàticament**

| \# ESLint: regla integrada per a TypeScript/JavaScript\# .eslintrc.json{  "rules": {    "complexity": \["error", 10\]  // error si CYC \> 10  }}\# SonarQube: la detecta automàticament per a tots els mètodes\# Reporta funcions per sobre del llindar configurat (per defecte: 10\)\# VS Code: extensió CodeMetrics o SonarLint\# Mostra la complexitat inline mentre escrius |
| :---- |

**Resum: taula de referència ràpida**

| CYC | Nivell | Acció recomanada |
| ----- | ----- | ----- |
| 1-4 | ✅ Excel·lent | Cap acció necessària |
| 5-7 | ✅ Acceptable | Vigilar en code review |
| 8-10 | ⚠️ Preocupant | Considera refactoritzar |
| 11-15 | 🔴 Alt risc | Refactoritza aviat |
| 15-20 | 🔴🔴 Molt alt | Refactoring urgent |
| \>20 | 💀 Crític | Bloquejar PR, refactoring obligatori |

