**Quins són els estàndards de mantenibilitat que SonarQube aplica per avaluar la qualitat del codi?**

**La filosofia central: "Clean as You Code"**

El Quality Gate "Sonar way" és el Quality Gate recomanat per al codi nou, ajudant a aconseguir codi d'alta qualitat. Proporcionat per Sonar, activat per defecte, i de només lectura. Aquest Quality Gate se centra a mantenir estàndards d'alta qualitat per al codi nou, en lloc de gastar molt d'esforç en la remediació del codi antic.

El principi fonamental de SonarQube és "Clean as You Code": el focus principal és el codi nou (les línies afegides o modificades recentment), no l'acumulació de deute tècnic existent. L'objectiu és prevenir que el deute creixi, no necessàriament eliminar-lo d'un cop.

SonarQube calcula dos valors o qualificacions per a la majoria de mètriques: una per al codi global i una per al codi nou. El codi global és tot el codi analitzat en el projecte o branca. El codi nou és el codi que ha estat recentment afegit o modificat. 

Per exemple: el codi global pot obtenir una A per a la qualificació de mantenibilitat, mentre que el codi nou introdueix més deute tècnic i obté una B.

**Les mètriques de mantenibilitat: el que SonarQube mesura**

SonarQube avalua el codi basant-se en: estadístiques de problemes detectats de seguretat, mantenibilitat i fiabilitat, cobertura de tests, complexitats ciclomàtica i cognitiva, nivell de revisió de seguretat basat en estadístiques de hotspots revisats, línies i blocs duplicats, i mida del codi (nombre de diversos elements de codi).

### **Complexitat Ciclomàtica**

La complexitat ciclomàtica és una mètrica quantitativa usada per calcular el nombre de camins a través del codi. 

L'analitzador calcula la puntuació d'aquesta mètrica per a una funció donada incrementant el comptador de complexitat ciclomàtica de la funció per u cada vegada que el flux de control de la funció es divideix resultant en una nova branca condicional. Cada funció té una complexitat mínima de 1\.

### **Complexitat Cognitiva: la innovació de SonarQube**

La Complexitat Cognitiva, inventada per Sonar, va ser dissenyada específicament per reflectir com els developers experimenten la complexitat del codi quan el llegeixen i entenen. 

En lloc de dependre purament de models matemàtics, se centra en com les estructures de control, l'imbricació, i el flux afecten la càrrega mental d'un lector, produint puntuacions que s'alineen més estretament amb com els developers perceben el manteniment d'un mètode o funció.

La diferència pràctica entre les dues:

| // Exemple: mateixa lògica, puntuació diferent// Versió A: using ternary chains// Ciclomàtica \= 4, Cognitiva \= 1 (fàcil de llegir)const resultat \= a ? 'a' : b ? 'b' : c ? 'c' : 'd';// Versió B: using nested ifs// Ciclomàtica \= 4, Cognitiva \= 7 (difícil de llegir per la imbricació)function obtenirResultat() {  if (a) {                  // \+1 cicl, \+1 cogn    return 'a';  } else {                  // \+0 cicl, \+1 cogn (else després d'if)    if (b) {                // \+1 cicl, \+2 cogn (+1 nesting)      return 'b';    } else {                // \+0 cicl, \+1 cogn      if (c) {              // \+1 cicl, \+3 cogn (+2 nesting)        return 'c';      }      return 'd';    }  }}// SonarQube prefereix la versió A perquè és cognitivament més simple |
| :---- |

Els llindars estàndard que aplica la comunitat: La Complexitat Cognitiva del mètode és superior a 20\. Quan supera 20, SonarQube emet un code smell i quantifica el temps de remediació.

**El Technical Debt Ratio: la fórmula de la qualificació**

La fórmula del Technical Debt Ratio és: Remediation cost / Development cost, que es pot reformular com: Remediation cost / (Cost to develop 1 line of code × Number of lines of code). El valor del cost per defecte de desenvolupar una línia de codi és 0.06 dies.

Exemple de càlcul:  
  Projecte: 10.000 línies de codi  
  Cost de desenvolupament: 10.000 × 0.06 dies \= 600 dies-dev  
  Deute detectat (code smells): 30 dies de remediació

  Technical Debt Ratio \= 30 / 600 \= 5% → Rating A ✅

La graella de qualificació SQALE (Maintainability Rating):

| A \= 0-5%    ✅ Excel·lent \-- deute molt baixB \= 6-10%   ✅ Bo \-- acceptable per a la majoria de projectesC \= 11-20%  ⚠️ Moderat \-- necessita atencióD \= 21-50%  🔴 Alt \-- refactoring necessariE \= 51%+    💀 Crític \-- deute sever, risc alt |
| :---- |

**Els Code Smells: els indicadors de deute de mantenibilitat**

El deute tècnic és la suma dels costos de remediació dels problemes de mantenibilitat. El cost de remediació d'un problema és l'esforç (en minuts) avaluat per solucionar el problema. S'assumeix una jornada de 8 hores quan el deute tècnic es mostra en dies.

Els code smells principals que SonarQube detecta i els seus temps de remediació típics:

| Code Smell                              Remediació──────────────────────────────────────────────────Complexitat cognitiva \> 15              60 minFunció massa llarga (\>75 línies)        30 minMassa paràmetres (\>7)                   20 minCodi duplicat (\>10 línies)              15 minVariable no usada                       5 minComentari TODO/FIXME                    5 minNom de variable massa curt              5 minReturn statement múltiple               10 min |
| :---- |

**El "Sonar Way" Quality Gate: l'estàndard predefinit**

El Quality Gate "Sonar way" se centra en el codi nou. Les condicions son: cap nou bug introduït (Reliability rating és A). Cap nova vulnerabilitat introduïda (Security rating és A). Maintainability Rating és pitjor que A.

| \# "Sonar way" Quality Gate \-- condicions sobre el codi NOU:Fiabilitat:  reliability\_rating \<= A     \# 0 nous bugsSeguretat:  security\_rating \<= A        \# 0 noves vulnerabilitats  security\_hotspots\_reviewed \>= 100%  \# tots revisatsMantenibilitat:  maintainability\_rating \<= A  \# Technical Debt Ratio ≤ 5%Cobertura:  coverage \>= 80%              \# configurable per equipDuplicació:  duplicated\_lines\_density \< 3%  \# configurable |
| :---- |

Combinant llindars de cobertura amb regles sobre complexitat, duplicació, i code smells, SonarQube assegura que el codi nou compleix un estàndard acordat abans de progressar pel pipeline. Això impulsa la mantenibilitat des del principi i manté els equips enfocats en el codi nou — si un canvi falla el gate per tests que falten o mala mantenibilitat, s'ha de corregir immediatament en lloc de convertir-se en el deute tècnic de demà.

**Les dues mètriques per a cada dimensió: global vs. codi nou**

La majoria de mètriques es computen per al codi global i per al codi nou perquè l'abast és diferent. Per exemple: el codi global pot obtenir una A per a la qualificació de mantenibilitat, mentre que el codi nou introdueix més deute tècnic i obté una B per a la qualificació de mantenibilitat.

| Dashboard de SonarQube \-- vista dual:                  CODI GLOBAL    CODI NOU (última PR)                  ───────────    ───────────────────Mantenibilitat:      B               C  ← ⚠️ alerta\!Fiabilitat:          A               ASeguretat:           A               ACobertura:         74.3%           65.2%  ← per sota del 80%Quality Gate:  ❌ FAILEDRaons:  → Codi nou: Maintainability C (Technical Debt Ratio 14%)  → Codi nou: Cobertura 65.2% \< 80% mínim |
| :---- |

**Els estàndards recomanats per la comunitat**

Si el Quality Gate compleix qualsevol de les condicions llistades, fallarà: (1) Complexitat Cognitiva del mètode superior a 20, (2) Maintainability Rating al codi nou inferior a B, (3) Cobertura al codi nou inferior al 70%.

La recomanació és usar condicions de valors diferencials en lloc de valors absoluts. `Línies de codi superior a 1000` és inapropiat. Evitar targets d'optimització únics — llindars alts com `95% de cobertura de tests unitaris` o `Duplicació inferior al 2%` poden induir codi brossa dels developers per complir els objectius.

**La integració al CI/CD: el flux complet**  
Developer fa push a una PR  
         ↓  
SonarQube s'executa automàticament  
         ↓  
Analitza el codi NOU de la PR:  
  → Code Smells nous (complexitat cognitiva, duplicació, etc.)  
  → Cobertura del codi nou  
  → Bugs i vulnerabilitats nous  
         ↓  
Calcula el Technical Debt Ratio per al codi nou  
  → Remediació\_cost / Development\_cost  
         ↓  
Compara amb el Quality Gate configurat  
         ↓  
  ✅ PASSA → PR pot fusionar-se  
             Developer veu "Quality Gate: Passed"  
         ↓  
  ❌ FALLA → PR bloquejada  
             Developer veu:  
             "Maintainability Rating: C (11% Technical Debt Ratio)"  
             "Motiu: 2 funcions amb complexitat cognitiva \> 20"  
             "Correcció estimada: 2h 30min"

**Resum: els estàndards de mantenibilitat de SonarQube**

| Mètrica | Mesura | Llindar "Sonar Way" |
| ----- | ----- | ----- |
| **Technical Debt Ratio** | % del cost de remediació vs. desenvolupament | ≤ 5% (Rating A) |
| **Complexitat Cognitiva** | Dificultat de llegir el flux de control | ≤ 15-20 per funció |
| **Complexitat Ciclomàtica** | Nombre de camins d'execució | ≤ 10 per funció |
| **Code Smells** | Nombre de problemes de mantenibilitat | 0 nous al codi nou |
| **Cobertura** | % de línies testejades | ≥ 80% al codi nou |
| **Duplicació** | % de línies duplicades | \< 3% al codi nou |
| **Maintainability Rating** | A-E basat en Technical Debt Ratio | A al codi nou |

