## **Riscos de Desplegar directament a producció**

**Què és un entorn i per quèen calen diversos?**

Un entorn és un espai construït i adaptat per servir un conjunt específic d'interessos. En el context del desplegament, l'interès és assegurar que el codi o l'aplicació es construeix i es desplega amb el màxim estàndard possible.

Quan construeixes una aplicació per a milers o milions de persones, cada developer no pot simplement construir en la seva màquina local, pujar a GitHub i desplegar directament a producció. El que obtens d'això és codi conflictiu i entorns de producció no estandarditzats, cosa que inevitablement porta a un producte terrible, una mala reputació i una base de clients en declivi.

**Els tres entorns estàndard**

El procés de desenvolupament de software implica diferents entorns que permeten construir, provar i desplegar aplicacions de manera eficient. Els tres entorns principals són Development, Staging i Production, cadascun servint un propòsit específic per assegurar la qualitat i l'estabilitat del software abans del seu llançament final.

* **Development (Dev)** — on els programadors escriuen, proven i modifiquen el codi de l'aplicació. És un entorn flexible que permet canvis freqüents sense afectar els usuaris finals. Únicament els developers hi tenen accés, on usen eines de debugging i tests unitaris per assegurar que el codi funciona correctament. S'usen dades simulades o de test per evitar riscos a les dades reals.  
* **Staging** — actua com una rèplica de l'entorn de producció. Aquí es realitzen proves extensives amb dades controlades. La seva funció principal és assegurar que el software funciona correctament abans de ser llançat a producció. És l'últim filtre: si passa per staging, pot passar a producció.  
* **Production (Prod)** — és l'entorn en viu on els usuaris finals interactuen amb l'aplicació. Ha de ser ràpid, segur i fiable perquè impacta directament els teus usuaris. Qualsevol error en producció pot impactar directament l'experiència d'usuari i la reputació de l'empresa. La seguretat és un aspecte clau d'aquest entorn ja que s'hi gestionen dades reals.

**Els riscos de desplegar directament a producció**

### **1\. Regressions i errors funcionals immediats**

Els canvis no provats poden introduir defectes funcionals que afecten els usuaris finals immediatament. Fins i tot el codi aparentment trivial pot trencar integracions, lògica de build o fluxos d'UI.

Sense un entorn de proves, no tens manera de saber si el teu canvi trenca alguna funcionalitat existent. En producció, aquests errors els descobreixen els usuaris reals, no l'equip de desenvolupament.

### **2\. Pèrdua i corrupció de dades**

Canvis d'esquema, migracions o bugs de lògica poden corrompre dades de producció. Si permets que el software continuï funcionant després que un error ocorri, pot entrar en un estat invàlid i, el que és més important, guardar aquell estat a la base de dades. Això porta a un problema més gran: la corrupció de dades, que no es pot resoldre simplement reiniciant l'aplicació.

Una migració de base de dades mal provada pot deixar dades d'usuaris corruptes o perdudes. Aquest és probablement el risc més greu: a diferència d'un error de codi que es pot revertir, la pèrdua de dades pot ser irreversible.

### **3\. Vulnerabilitats de seguretat**

En teoria, els bugs majors i les vulnerabilitats de software haurien de descobrir-se abans que el codi arribi a producció, però rarament és el cas per a sistemes de software complexos. Les organitzacions han de dissenyar i implementar sistemes de seguretat de xarxa i dades que assumeixin l'existència de vulnerabilitats.

Sense proves de seguretat en un entorn controlat, una vulnerabilitat pot exposar dades d'usuaris reals. A staging es poden fer penetration tests sense risc.

### **4\. El problema "works in staging, fails in production"**

Les discrepàncies en especificacions de hardware, versions de software o configuracions poden portar a escenaris de "funciona en staging, falla en producció". Aquesta manca de paritat sovint resulta en bugs no detectats, problemes de rendiment i vulnerabilitats de seguretat que únicament apareixen després del desplegament.

Si no tens staging, no tens on detectar les diferències entre l'entorn de desenvolupament i producció.

### **5\. Impacte directe en la reputació i el negoci**

La fiabilitat assegura que el software no falla davant dels clients. Mantenir la velocitat: els developers poden treballar en noves funcionalitats sense interrompre el sistema en viu. La seguretat manté les dades sensibles segures mentre es prova.

Una caiguda de producció durant hores punta significa clients frustrats, vendes perdudes i dany reputacional. El cost de restaurar la confiança dels usuaris és molt més alt que el cost d'implementar un entorn de staging.

**La taula comparativa dels entorns**

L'objectiu és garantir que l'aplicació funcioni de manera fiable abans d'arribar als clients.

|  | Development | Staging | Production |
| ----- | ----- | ----- | ----- |
| **Propòsit** | Escriure i provar codi | Validació final | Usuaris reals en viu |
| **Dades** | Falses / de test | Realistes / anonimitzades | Reals |
| **Qui hi accedeix** | Developers, QA | QA, Stakeholders | Usuaris finals |
| **Nivell de risc** | Baix | Mitjà | Alt |
| **Estabilitat** | Baixa (canvis freqüents) | Alta | Màxima |
| **Seguretat** | Mínima | Mitjana | Màxima |

**Quan s'accepta desplegar directament a producció**

Les organitzacions de vegades accepten canvis directes a producció en: emergències per a incidents actius on la mitigació immediata és necessària i els entorns inferiors no satisfarien la necessitat prou ràpid (fins i tot llavors, el canvi hauria de ser mínim, documentat i seguit d'un camí provat), i equips molt petits on l'overhead dels entorns és prohibitiu i el risc és baix (tot i així és aconsellable mantenir còpies de seguretat i passos de verificació mínims).

**Les bones pràctiques per gestionar entorns**

Usa control de versions (com Git) per gestionar canvis entre entorns. Automatitza els desplegaments usant pipelines CI/CD (GitHub Actions, GitLab CI, etc.). Usa variables d'entorn per gestionar diferències de configuració (per exemple, URLs de base de dades). Protegeix producció amb monitoratge, còpies de seguretat i accés limitat.

La paritat d'entorns emfatitza la necessitat d'entorns de staging i producció pràcticament idèntics, des de configuracions fins a protocols de seguretat. La paritat facilita desplegaments predictibles i assegura que l'entorn de staging reflecteix directament l'entorn de producció, donant suport a un testing i debugging més precisos. Els developers poden confiar que el seu codi es comportarà de la mateixa manera en producció que en staging.

