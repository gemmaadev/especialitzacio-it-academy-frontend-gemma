## **Per què és crític l'escaneig de dependències**

**El problema: l'aplicació moderna no és el que sembla**

Una aplicació web moderna sembla ser el codi que escriu l'equip. La realitat és molt diferent. El 96% de les aplicacions usen paquets de tercers, i el 80% del codi en la cadena de subministrament del software prové de paquets de tercers.

Quan instal·les un paquet npm, no instal·les únicament aquell paquet. Quan un client instal·la un paquet npm, implícitament confia en fins a 80 altres paquets (de mitjana), molts dels quals es deuen a dependències transitives (dependències de dependències). 

Més d'un terç de les últimes versions de paquets a npm estan exposades a vulnerabilitats a través de les seves dependències transitives.

**Les xifres que ho fan urgent**

Un informe de 2024 va trobar que el 84% de les codebases contenien almenys una vulnerabilitat d'open source coneguda, i el 74% tenien vulnerabilitats d'alt risc — un increment pronunciat respecte a l'any anterior. Un de cada vuit downloads de components open source ara conté un problema de seguretat conegut.

Un estudi recent va trobar que el 91% de les codebases contenien components open source que tenien 10 o més versions desactualitzades.

**El vector principal: els atacs a la cadena de subministrament**

Incidents d'alt perfil com Log4Shell (CVE-2021-44228) el desembre de 2021 i atacs que involucraven paquets npm maliciosos van explotar la confiança que les organitzacions dipositen en el codi extern. 

Els atacs de supply chain exploten aquesta confiança a través de múltiples vectors: els atacants publiquen paquets amb noms similars a biblioteques populars (typosquatting) i els developers instal·len accidentalment paquets maliciosos a causa de errors tipogràfics.

Un exemple real i recent: el 8 de setembre de 2025, un dels incidents de supply chain npm més grans de la història recent es va produir. 

Biblioteques populars com `debug` i `chalk` juntament amb 16 altres utilitats van ser segrestades i pujades a npm amb codi maliciós dirigit a carteres de criptomonedes i transaccions blockchain. 

Aquests paquets col·lectivament tenen milers de milions de descàrregues setmanals, cosa que fa que aquest compromís sigui tant ampli com profund.

Aquesta atac mostra com un sol compte de mantenedor compromès pot cascadejar per tot l'ecosistema: aquestes biblioteques son dependències transitives, cosa que significa que s'empaquetin en innombrables projectes sense la intervenció directa del developer.

**Les dependències transitives: el risc invisible**

El problema de les dependències transitives és que el developer mai les veu directament. El teu `package.json` pot tenir 30 dependències directes, però el teu projecte pot tenir 500 paquets en total quan s'inclouen les dependències de les dependències.

Quan el popular paquet "lodash" va estar infectat amb una vulnerabilitat d'alta gravetat, més de 4 milions de projectes open-source van estar exposats a un possible atac.

| El teu package.json:"express": "^4.18.0"          ↓express depèn de:  body-parser, debug, finalhandler, fresh, merge-descriptors...          ↓Cada un d'ells té les seves pròpies dependències          ↓Resultat: instal·les 1 paquet, obtens \~100 paquetsSi qualsevol de les 100 té una vulnerabilitat → el teu projecte és vulnerableSi un atacant compromet qualsevol dels 100 → el teu codi s'executa malware |
| :---- |

**Els quatre tipus de risc de dependències**

1. **Vulnerabilitats conegudes (CVEs)** — errors de seguretat documentats en biblioteques existents. Apareixen al National Vulnerability Database (NVD). Exemples: Log4Shell, Heartbleed. Identificats per un codi CVE-YYYY-NNNNN.  
2. **Paquets obsolets** — biblioteques que no s'actualitzen, que han assolit el final de vida (EOL) o que estan 10+ versions endarrerides. Sovint contenen vulnerabilitats no parcheades i incompatibilitats creixents.  
3. **Typosquatting** — paquets maliciosos amb noms similars a biblioteques populars. `requets` vs `requests`, `lodahs` vs `lodash`. Aprofiten els errors tipogràfics dels developers.  
4. **Dependency Confusion** — un atacant publica un paquet públic amb el mateix nom que un paquet privat intern de l'organització. El gestor de paquets pot descarregar el maliciós en lloc de l'intern.

**Per què l'escaneig manual no és suficient**

Intentar gestionar les dependències manualment és com intentar actualitzar un catàleg de fitxes en una biblioteca que afegeix 10.000 nous llibres cada dia. Podries començar amb bones intencions, però estaràs enterrat sota les fitxes d'índex a l'hora del dinar.

L'escaneig automatitzat de dependències aborda aquest repte amb: detecció contínua de vulnerabilitats (en lloc d'avaluacions puntuals, les eines automatitzades monitoren constantment les dependències per vulnerabilitats descobertes recentment) i capacitat de resposta ràpida (quan es descobreixen vulnerabilitats, els equips poden ser notificats immediatament, en lloc d'esperar revisions manuals periòdiques).

**La bona notícia: la majoria de vulnerabilitats es poden corregir**

El 96% de les vulnerabilitats conegudes tenien una correcció existent disponible. La majoria de vulnerabilitats es corregeixen simplement actualitzant a una versió més segura.

Això fa que l'escaneig de dependències sigui una inversió d'alt retorn: detectar i actualitzar una biblioteca vulnerable pot costar minuts. Gestionar una bretxa de seguretat causada per aquella biblioteca pot costar dies o setmanes.

**La integració al pipeline: el lloc on ha d'estar**

L'escaneig efectiu s'integra en tot el cicle de vida del desenvolupament, des de l'IDE i els pipelines CI/CD fins als registres de contenidors i els entorns de runtime.

| Dev escriu codi → npm install      ↓Escaneig a l'IDE (extensió de VS Code)      ↓git push → CI/CD pipeline      ↓OWASP Dependency-Check / Snyk / npm audit s'executa      ↓Si hi ha vulnerabilitats crítiques → la PR es bloqueja      ↓Deploy a producció únicament si l'escaneig passa      ↓Monitoratge continu → alerta si apareixen nous CVEs |
| :---- |

**Les eines principals d'escaneig**

**`npm audit`** — integrat directament a npm. Analitza el `package-lock.json` contra la base de dades de vulnerabilitats de npm. Zero configuració necessària.

| npm audit              \# mostra vulnerabilitatsnpm audit fix          \# corregeix automàticamentnpm audit fix \--force  \# corregeix fins i tot amb breaking changes (cuidado\!)npm audit \--json       \# sortida en JSON per a CI/CD |
| :---- |

**OWASP Dependency-Check** — eina de codi obert que analitza les dependències contra la National Vulnerability Database (NVD). Genera informes HTML, XML i JSON. Configurable per a CI/CD.

**Snyk** — servei comercial (amb plan gratuït) amb una base de dades de vulnerabilitats pròpia que sovint supera la NVD en actualitat i cobertura. Integra correccions automàtiques i PRs.

**Dependabot** — integrat a GitHub. Obre PRs automàticament per actualitzar dependències vulnerables. Zero configuració addicional per a repositoris de GitHub.

**Resum: per què és crític**

| Motiu | Dades |
| ----- | ----- |
| La majoria de codi és de tercers | 80% del codi prové de dependencies |
| Les vulnerabilitats son omnipresents | 84% de codebases afectades |
| Les correccions existeixen | 96% de vulnerabilitats tenen fix disponible |
| Els atacs son actius i creixents | \+650% d'atacs a supply chain el 2021 |
| Les dependències transitives son invisibles | \~80 paquets per cada 1 instal·lat |
| La detecció manual és impossible | 91% de codebases amb components 10+ versions endarrere |

