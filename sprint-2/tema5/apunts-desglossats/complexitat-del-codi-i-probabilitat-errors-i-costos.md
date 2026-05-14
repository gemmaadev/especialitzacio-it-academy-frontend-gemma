## **Com influeix la complexitat del codi en la probabilitat d'errors i costos de manteniment?**

**La relació fonamental: complexitat → bugs → cost**

La recerca mostra una correlació forta entre complexitat i densitat de defectes, fent aquesta mètrica valuosa per identificar mòduls que poden requerir escrutini addicional durant les revisions de codi i el testing. 

Les funcions amb complexitat alta son significativament més propenses a contenir defectes que les de complexitat baixa. Cada punt de decisió addicional al codi és una altra oportunitat per a que alguna cosa vagi malament.

La cadena de causalitat és directa:

Complexitat alta  
       ↓  
Més camins d'execució → més possibilitats de bugs ocults  
       ↓  
Més tests necessaris → testing menys complet en la pràctica  
       ↓  
Bugs a producció → cost exponencial de correcció  
       ↓  
Codi difícil de modificar → manteniment costós  
       ↓  
Developers amb por de tocar el codi → deute tècnic creixent

**L'evidència empírica: estudis que ho demostren**

Basili et al. (1986) va conduir un estudi que va trobar una associació forta entre la complexitat estructural d'un programa i el nombre de defectes. 

Aquest estudi va suggerir que nivells alts de complexitat del codi incrementen la probabilitat d'errors de codificació i fan que sigui difícil localitzar i reparar defectes. De manera similar, Nagappan et al. (2006) també va trobar que la complexitat del codi era un predictor significatiu de bugs.

Estudiant dades relacionades amb sistemes operatius (Windows, Debian Linux i Linux Kernel), va concloure que la complexitat del software impacta directament els costos de manteniment. Per tant, els esforços de mesura i control de la complexitat d'un sistema estan justificats.

La recerca mostra consistentment una correlació positiva entre l'alta complexitat del codi i el nombre de defectes del software.

**L'impacte en el testing: cobertura impossible en la pràctica**

La complexitat ciclomàtica correlaciona directament amb el nombre de casos de test necessaris per a la cobertura funcional. 

Una puntuació de complexitat alta indica més camins a través del codi, cadascun dels quals probablement necessita ser testejat per assegurar que l'aplicació funciona com s'espera.

El problema real és matemàtic:

Funció amb CYC \= 2:  
  → 2 tests per a cobertura completa → factible

Funció amb CYC \= 10:  
  → 10 tests per a cobertura completa → complex però possible

Funció amb CYC \= 25:  
  → 25 tests per a cobertura completa → en la pràctica, no s'escriuen  
  → els camins no testejats contenen bugs ocults

El resultat pràctic:  
  En funcions molt complexes, la cobertura de tests és baixa  
  → hi ha camins d'execució que mai s'han testejat  
  → els bugs en aquells camins van a producció

Alta complexitat ciclomàtica sovint requereix casos de test extensos per aconseguir alta cobertura de codi, fent que les dues mètriques estiguin estretament relacionades. Assegurar alta cobertura en àrees d'alta complexitat pot ajudar a reduir el risc de defectes.

**L'impacte en el cost de manteniment**

Segons la recerca de la indústria, el manteniment representa fins al 80% del cost total del desenvolupament de software. 

La complexitat del codi impacta directament aquell cost. La bona notícia és que entenent i gestionant la complexitat ciclomàtica, es pot millorar la mantenibilitat, reduir bugs, i oferir software més fiable.

| Distribució típica del cost del software:Fase              Sense gestió     Amb gestió de complexitat                  de complexitat─────────────────────────────────────────────────────────────Desenvolupament   20%              25%  (lleugerament més car)Testing           15%              20%  (més tests, menys bugs)Manteniment       65% ←──────────  55%  (menys deute tècnic)─────────────────────────────────────────────────────────────Total cicle vida  \+30% de cost     ReferènciaConclusió: invertir en baixa complexitat durant el devestalvia molt més en manteniment a llarg termini |
| :---- |

**L'impacte cognitiu: el "cervell del developer"**

Les funcions complexes demanden més esforç mental per entendre completament. Quan els developers han de seguir nombrosos camins de decisió i canvis d'estat, la seva càrrega cognitiva augmenta significativament, incrementant la probabilitat d'introduir bugs durant el manteniment. 

Això també ralentitza el cycle time causant aprehensió en el pickup time, i allargant el procés de code review.

El fenomen és real i documentat: un developer que s'enfronta a una funció de 300 línies amb 20 nivells d'imbricació no pot tenir tot el context en la memòria de treball simultàniament. Qualsevol modificació és un risc perquè algunes branques seran invisibles mentalment.

| // La diferència en càrrega cognitiva:// ❌ Funció complexa: el developer ha de seguir 8+ camins mentalmentfunction processarComanda(comanda: Comanda, usuari: Usuari, config: Config) {  if (\!usuari) {    if (config.modeAnònim) {      if (comanda.total \< config.limitAnònim) {        // ...      } else {        // ...      }    } else {      // ...    }  } else if (usuari.premium) {    if (comanda.total \> 100) {      // ...    } else {      // ...    }  }  // ...}// ✅ Funcions simples: cada una és fàcil de raonarfunction validarAccesComanda(usuari: Usuari | null, config: Config): boolean {  if (\!usuari) return config.modeAnònim;     // CYC \= 2  return true;}function calcularDescompte(usuari: Usuari, total: number): number {  if (usuari.premium && total \> 100) return total \* 0.9;  // CYC \= 2  return total;} |
| :---- |

**La relació entre complexitat i densitat de defectes**

Hi ha sovint una correlació entre complexitat ciclomàtica i densitat de defectes; a mesura que augmenta la complexitat, la probabilitat de defectes també pot augmentar perquè el codi més complex tendeix a tenir més errors.

Les dades de la recerca mostren un patró consistent:

| Densitat de defectes per CYC (dades empíriques):CYC 1-5:    densitat de defectes baixa     ████░░░░░░ \~20%CYC 6-10:   densitat moderada              ██████░░░░ \~40%CYC 11-20:  densitat alta                  ████████░░ \~60%CYC \> 20:   densitat molt alta             ██████████ \~80%Interpretació:Els mòduls amb CYC \> 20 generen aproximadament 4xmés bugs que els mòduls amb CYC \< 5\. |
| :---- |

**L'efecte "bola de neu": com creix el deute**

Hot spots en un sistema de software es poden identificar usant mètriques de complexitat, amb la probabilitat més alta de generar defectes i costos addicionals en el futur. D'aquesta manera, s'assegura que es minimitzen els riscos de defectes que apareixen en les fases finals dels projectes, implicant costos inesperats.

El problema és que la complexitat té tendència a créixer de manera autònoma:

Inici del projecte:  
  Funció simple, CYC \= 3 → fàcil d'entendre i modificar

3 mesos després:  
  S'afegeix un cas especial → CYC \= 5

6 mesos:  
  S'afegeix una excepció per al client A → CYC \= 8

12 mesos:  
  S'afegeix la integració amb el sistema B → CYC \= 15 ← zona de risc

18 mesos:  
  Ningú entén completament la funció  
  Els canvis introdueixen bugs nous  
  Els developers l'eviten → circumstan amb workarounds  
  → CYC \= 25 → crisi de manteniment

**Estratègies per trencar el cicle**

* **Refactoritza quan el CYC supera 10\.** No esperes que sigui "el moment adequat": el cost de refactoritzar creix exponencialment amb el temps.  
* **El "Boy Scout Rule" de Robert Martin**: deixa el codi una mica millor del que el vas trobar. Si tocs una funció, extreu una subfunció si la complexitat és alta.  
* **Mesura automàticament** al CI/CD. Si el CYC d'una PR supera el llindar configurat, la PR s'ha de justificar o refactoritzar.  
* **Escriu el test abans (TDD)**. Si la funció és difícil de testar, és senyal que és massa complexa. El dolor de testar és el feedback que necessites.

**Resum: la cadena de causalitat completa**

| Factor | Impacte mesurable |
| ----- | ----- |
| **CYC \> 10** | Densitat de bugs 2-4x superior |
| **CYC \> 15** | Testing complert pràcticament impossible |
| **CYC \> 20** | Cada modificació introdueix bugs nous |
| **Manteniment** | Fins al 80% del cost total del software |
| **Complexitat** | Correlació directa amb el cost de manteniment |
| **Càrrega cognitiva** | Alta complexitat → errors en modificació |

