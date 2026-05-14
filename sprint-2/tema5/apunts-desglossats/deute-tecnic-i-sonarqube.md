## **Deute tècnic i SonarQube: quantificació i gestió**

**Measuring Code Maintainability with SonarQube**  
[https://www.sonarsource.com/resources/white-papers/measuring-maintainability.html](https://www.sonarsource.com/resources/white-papers/measuring-maintainability.html)  
White paper sobre com SonarQube mesura i millora la mantenibilitat del codi.

**SonarQube Documentation**  
[https://docs.sonarsource.com/](https://docs.sonarsource.com/)  
Documentació oficial de SonarQube per mesurar qualitat, seguretat i mantenibilitat del codi.

**Què és el deute tècnic**

El deute tècnic es refereix al cost del treball addicional causat per escollir una solució fàcil i ràpida en lloc d'un enfocament millor que hauria pres més temps. 

Com el deute financer, el deute tècnic acumula interessos amb el temps, cosa que significa que com més temps roman sense ser adreçat, més temps i recursos requerirà per resoldre'l.

La metàfora financera és perfecta: si demanes diners prestats (escrius codi ràpid però dolent), pots moure't ràpid ara, però cada dia que passa pagues interessos (el codi és més difícil de modificar, els bugs tarden més a trobar-se, els nous developers triguen més a entendre-ho). Eventualment, els interessos superen el capital.

El deute tècnic pot manifestar-se en diverses formes, des de bugs i documentació obsoleta fins a necessitats complexes de refactorització o fins i tot en les decisions arquitecturals preses a l'inici del projecte.

**Les categories de deute tècnic que identifica SonarQube**

SonarQube mesura tres categories principals, cadascuna amb la seva pròpia qualificació:

* **Mantenibilitat (Code Smells)** — el codi que funciona però és difícil de mantenir. Mètodes massa llargs, complexitat ciclomàtica alta, duplicació, noms poc descriptius.  
* **Fiabilitat (Bugs)** — codi que podria o ja causaria un comportament incorrecte en runtime.  
* **Seguretat (Vulnerabilitats i Security Hotspots)** — codi que podria ser explotat per atacants.

**Com SonarQube quantifica el deute tècnic**

### **El Technical Debt: temps en minuts**

El deute tècnic és la suma dels costos de remediació dels problemes de mantenibilitat. El cost de remediació d'un problema és l'esforç (en minuts) avaluat per solucionar el problema. Es pren de l'esforç assignat a la regla que ha generat el problema. S'assumeix una jornada de 8 hores quan el deute tècnic es mostra en dies.

En pràctica: cada regla de SonarQube té un "temps de remediació" associat. Un mètode massa llarg pot ser 30 minuts. Una variable no usada pot ser 5 minuts. SonarQube suma tots aquests temps i et diu: "el teu projecte té 14h 30min de deute tècnic".

### **El Technical Debt Ratio: el percentatge de salut**

La fórmula del Technical Debt Ratio és:

**sqale\_debt\_ratio \= deute tècnic / (cost de desenvolupar una línia de codi × nombre de línies de codi)**

On el cost per defecte de desenvolupar una línia de codi és de 30 minuts.

Exemple pràctic:  
  Projecte de 10.000 línies de codi  
  Cost de desenvolupament: 10.000 × 30 min \= 5.000 hores  
  Deute tècnic detectat: 250 hores

  Technical Debt Ratio \= 250 / 5.000 \= 5% → Rating A

### **La SQALE Rating: la nota de mantenibilitat**

La graella de qualificació de mantenibilitat per defecte (sqale\_rating) és: A \= 0-5%, B \= 6-10%, C \= 11-20%, D \= 21-50%, E \= 51-100+%

Alternativament: si el cost de remediació pendent és ≤5% del temps que ja s'ha invertit en l'aplicació, la qualificació és A.

**Les mètriques de qualificació: A-E per a cada dimensió**

SonarQube dona una qualificació de A a E per a cada categoria:

**Fiabilitat (Bugs):**

A \= 0 bugs, B \= almenys un bug menor, C \= almenys un bug major, D \= almenys un bug crític, E \= almenys un bug bloquejador.

**Seguretat (Vulnerabilitats):**

A \= 0 vulnerabilitats, B \= almenys una vulnerabilitat menor, C \= almenys una vulnerabilitat major, D \= almenys una vulnerabilitat crítica, E \= almenys una vulnerabilitat bloquejadora.

Exemple d'informe SonarQube:

| ┌─────────────────────────────────────────┐│  Projecte: e-commerce-frontend              │├────────────────┬────────────────────────┤│ Fiabilitat     │ B  (2 bugs menors)         ││ Seguretat      │ A  (0 vulnerabilitats)     ││ Mantenibilitat │ C  (8h deute tècnic)       ││ Cobertura      │ 72.3%                      ││ Duplicació     │ 4.1%                       │├────────────────┴────────────────────────┤│ Quality Gate   │ ❌ FAILED                  ││ Raó: cobertura nova \< 80%                   │└─────────────────────────────────────────┘ |
| :---- |

**Els Code Smells: el principal contributor al deute**

Els code smells son els símptomes del deute tècnic en el codi. SonarQube en detecta centenars de tipus:

| // Code Smell: complexitat ciclomàtica excessiva// SonarQube: "Refactor this function to reduce its CCC from 15 to 10"function processarPagament(metode, quantitat, usuari, opcions, config) {  if (\!usuari) { ... }            // \+1  if (quantitat \<= 0) { ... }     // \+1  if (metode \=== 'targeta') { ... } // \+1  // ... 12 decisions més}// Code Smell: mètode massa llarg// SonarQube: "Refactor this method to have no more than 75 lines"function inicialitzarAplicacio() {  // 200 línies de codi...}// Code Smell: paràmetres en excés// SonarQube: "This function has 8 parameters, reduce it to 7 or fewer"function crearUsuari(nom, email, edat, adreca, telefon, rol, empresa, departament) { }// Code Smell: codi duplicat// SonarQube: "X lines of code are duplicated at Y" |
| :---- |

**El Quality Gate: la porta d'entrada a producció**

El Quality Gate és el conjunt de condicions que el codi ha de passar per poder ser considerat "acceptable". Si falla, el codi no hauria de desplegarse.

| \# Quality Gate per defecte de SonarQube ("Sonar way")\# Condicions sobre el codi NOU (no l'existent):\- coverage \>= 80%              \# cobertura de tests del codi nou\- duplicated\_lines\_density \< 3% \# menys del 3% de línies duplicades\- maintainability\_rating \<= A   \# deute tècnic nou ≤ 5%\- reliability\_rating \<= A       \# 0 bugs nous\- security\_rating \<= A          \# 0 vulnerabilitats noves\- security\_hotspots\_reviewed \>= 100% \# tots els hotspots revisats |
| :---- |

El Quality Gate és la integració perfecta amb CI/CD: cada PR s'analitza, i si falla el Quality Gate, la PR es bloqueja automàticament.

**La quantificació del deute: el principal i els interessos**

La quantificació del deute tècnic implica considerar el seu principal, els interessos, i la probabilitat que aquells interessos s'acumulin amb el temps. 

El principal del deute tècnic es refereix al cost immediat de resoldre els problemes identificats dins de la codebase. Els interessos sobre el deute tècnic representen el cost addicional incorregut amb el temps si el deute no s'adreça. 

Això es pot manifestar com a productivitat decreixent, costos de manteniment incrementats, o oportunitats de negoci perdudes.

Exemple de quantificació de deute:

Principal (cost de solucionar ara):  
  50 code smells × 2 hores × 60€/hora \= 6.000€

Interessos (cost de no solucionar):  
  \- Cada bug introduït costa 3h de debugging \= 180€  
  \- Si apareix 1 bug/setmana per la complexitat del codi:  
    180€ × 52 setmanes \= 9.360€/any

Retorn de la inversió:  
  Solucionar el deute: 6.000€  
  vs. No solucionar-lo: 9.360€/any  
  → Es recupera en 8 mesos

**SonarQube: les mètriques completes que mesura**

SonarQube avalua el codi basant-se en estadístiques de problemes detectats de seguretat, mantenibilitat i fiabilitat; cobertura de tests; complexitats ciclomàtica i cognitiva; nivell de revisió de seguretat basat en estadístiques de security hotspots revisats; línies i blocs duplicats; i mida del codi (nombre de diversos elements de codi).

Resum de totes les mètriques de SonarQube:

SEGURETAT  
  └── Vulnerabilitats (A-E)  
  └── Security Hotspots (% revisats)  
  └── Security Rating

FIABILITAT  
  └── Bugs (A-E)  
  └── Esforç de remediació (hores)

MANTENIBILITAT  
  └── Code Smells (nombre)  
  └── Deute Tècnic (hores)  
  └── Technical Debt Ratio (%)  
  └── SQALE Rating (A-E)

COBERTURA  
  └── Line Coverage (%)  
  └── Branch Coverage (%)

DUPLICACIÓ  
  └── Duplicated Lines Density (%)  
  └── Duplicated Blocks

COMPLEXITAT  
  └── Cyclomatic Complexity (per funció)  
  └── Cognitive Complexity (per funció)

MIDA  
  └── Lines of Code  
  └── Number of Files, Classes, Functions

**Resum: el flux de SonarQube en el dia a dia**

Developer fa push/PR  
         ↓  
SonarQube s'executa automàticament al CI/CD  
         ↓  
Analitza el codi nou:  
  → Bugs, Vulnerabilitats, Code Smells nous  
  → Cobertura del codi nou  
  → Duplicació nova  
         ↓  
Compara amb el Quality Gate  
         ↓  
✅ PASSA → PR pot fusionar-se  
❌ FALLA → PR bloquejada, developer rep notificació  
  → "2 bugs crítics nous al codi nou"  
  → "Cobertura del 68%, mínim 80%"  
  → "Deute tècnic nou: 3h 20min"  
         ↓  
Developer consulta l'informe detallat:  
  → Línia exacta del problema  
  → Explicació del per quèés un problema  
  → Temps estimat de remediació  
  → Suggeriment de com solucionar-ho

