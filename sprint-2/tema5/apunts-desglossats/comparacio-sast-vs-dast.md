## **SAST (Static Application Security Testing) vs. DAST (Dynamic Application Security Testing): avantatges i limitacions de cada enfocament**

###### 

###### **SAST vs DAST: Differences and When to Use Them**

[https://www.blackduck.com/blog/sast-vs-dast-differences.html](https://www.blackduck.com/blog/sast-vs-dast-differences.html)  
Comparativa entre les tècniques de seguretat SAST i DAST i els seus usos recomanats.

**SAST i DAST**

Pensa en SAST com un arquitecte que examina els plànols d'un edifici abans que es construeixi, buscant defectes estructurals al disseny. 

DAST és com un equip de seguretat que intenta entrar a l'edifici un cop ja está construït i en funcionament, provant totes les portes i finestres.

Cap dels dos enfocaments és suficient per si sol. Necessites els dos.

**SAST: Static Application Security Testing**

### **Què és i com funciona**

SAST és un mètode de testing de "caixa blanca": l'eina té accés al codi font de l'aplicació que està testejant.

Examina el codi per identificar vulnerabilitats i debilitats del software, així com vulnerabilitats crítiques com les llistades a l'OWASP Top 10\. 

Com que SAST no requereix una aplicació en execució, ajuda els developers a identificar vulnerabilitats en les primeres etapes del desenvolupament, i a solucionar els problemes identificats sense trencar el build ni permetre que les vulnerabilitats arribin a producció.

| SAST: anàlisi sense execució                ↓Codi font .ts / .js / .java                ↓L'eina analitza el codi estàtic:  \- Patrons de vulnerabilitat coneguts  \- Fluxos de dades insegurs (taint analysis)  \- Secrets hardcodats  \- Injeccions SQL, XSS, etc.                ↓Informe: fitxer, línia, tipus de vulnerabilitat |
| :---- |

### **Les vulnerabilitats que detecta SAST**

| // SAST detecta: SQL Injection via taint analysisfunction buscarUsuari(id: string) {  const query \= \`SELECT \* FROM users WHERE id \= ${id}\`;  //             ↑ SAST marca: input extern no sanititzat en query SQL  return db.query(query);}// SAST detecta: secrets hardcodatsconst API\_KEY \= "sk-prod-abc123secretkey";//              ↑ SAST marca: credencial hardcodada al codi font// SAST detecta: XSS potencialelement.innerHTML \= userInput;//       ↑ SAST marca: input d'usuari assignat a innerHTML sense sanititzar |
| :---- |

### **Avantatges de SAST**

SAST pot ser integrat a l'IDE o al pipeline CI, ajudant els developers a detectar problemes d'hora — quan son més barats de solucionar.

Els escàners SAST realitzen escanejos ràpids i poden analitzar tota la codebase d'una aplicació en una durada menor. A més de proporcionar feedback instantani sobre les vulnerabilitats descobertes, les eines SAST s'integren sense problemes amb diverses eines de pipeline de desenvolupament sense impactar les funcionalitats principals.

En pràctica: SAST s'executa en cada `git push` i retorna resultats en minuts. Un developer veu l'error al seu IDE mentre escriu, igual que l'ESLint, però per a seguretat.

### **Limitacions de SAST**

SAST únicament pot identificar vulnerabilitats dins del codi font i no está dissenyat per descobrir problemes relacionats amb l'input de l'usuari. L'escaneig basat en patrons també pot portar a una quantitat aclaparadora de vulnerabilitats potencials, amb una majoria d'elles sent falsos positius.

SAST no pot avaluar problemes que únicament emergeixen quan l'aplicació s'executa, com els originats per configuracions del sistema, integracions externes, o interaccions dinàmiques.

**DAST: Dynamic Application Security Testing**

### **Què és i com funciona**

DAST escaneja aplicacions de software en execució en temps real contra fonts de vulnerabilitats principals per trobar vulnerabilitats de seguretat o debilitats obertes. 

Mentre SAST escaneja el codi de l'aplicació en repòs, DAST testa l'aplicació en execució i no té accés al seu codi font. 

Com que no té visibilitat en el codi font subjacent, DAST, sovint anomenat testing de caixa negra, simula la perspectiva d'un atacant extern.

| DAST: anàlisi de l'aplicació en execució                ↓Aplicació desplegada (staging/producció)                ↓L'eina ataca l'aplicació des de fora:  \- Envia payloads maliciosos a cada endpoint  \- Proba injeccions SQL, XSS, CSRF  \- Testa l'autenticació i les sessions  \- Proba configuracions incorrectes del servidor                ↓Informe: URL, paràmetre, tipus d'atac que funciona |
| :---- |

### **Les vulnerabilitats que detecta DAST i SAST no pot**

El 80% de les aplicacions web tenen una vulnerabilitat crítica que únicament es pot trobar amb un escaneig dinàmic.

DAST detecta (SAST no pot):

❶ Misconfiguracions del servidor  
   → Headers HTTP de seguretat absents (CSP, HSTS, X-Frame-Options)  
   → CORS mal configurat  
   → TLS amb versions obsoletes

❷ Problemes de gestió de sessions  
   → Tokens de sessió predibles  
   → Session fixation  
   → Logout que no invalida la sessió al servidor

❸ Vulnerabilitats de runtime  
   → Race conditions  
   → Timing attacks en autenticació  
   → Business logic vulnerabilities

❹ Autenticació i autorització reals  
   → Endpoints que bypassen l'autenticació en condicions específiques  
   → IDOR (Insecure Direct Object Reference) reals

### 

### **Avantatges de DAST**

La capacitat de DAST de testar aplicacions en el seu estat en execució ofereix insights únics sobre comportaments de runtime i vulnerabilitats específiques de l'entorn, que l'anàlisi estàtica podria passar per alt.

Això inclou el testing de misconfiguracions, vulnerabilitats de gestió d'autenticació i sessió, i problemes operatius que únicament es manifesten quan l'aplicació está viva.

Les eines DAST son agnòstiques tecnològicament perquè testen les aplicacions des de fora i examinen el seu comportament, no el seu codi font. 

Això permet als escanejos DAST cobrir qualsevol nombre d'aplicacions, independentment del tech stack, l'estat de desenvolupament, o la disponibilitat del codi font.

### **Limitacions de DAST**

DAST generalment es realitza en etapes posteriors del procés de desenvolupament, cosa que significa que les vulnerabilitats identificades poden requerir més temps i recursos per corregir-les en comparació amb els problemes detectats en etapes anteriors.

L'escaneig basat en patrons pot portar a una alta taxa de falsos positius, potencialment afegint feina innecessària per als equips de seguretat.

**IAST: el terme mig**

El Interactive Application Security Testing (IAST), de vegades anomenat testing de caixa gris, ocupa el terme mig entre l'anàlisi dinàmica i estàtica. Depenent del venedor i el producte, IAST pot ser una eina standalone que afegeix insights dinàmics a SAST o una manera d'afegir insights de codi font a DAST.

**Comparativa** 

| Aspecte | SAST | DAST |
| ----- | ----- | ----- |
| **Nom alternatiu** | White-box testing | Black-box testing |
| **Necessita codi font** | Sí | No |
| **Necessita app en execució** | No | Sí |
| **Quan s'usa** | Durant el desenvolupament | Pre-producció i producció |
| **Velocitat de feedback** | Molt ràpid (integra a IDE) | Lent (requereix app desplegada) |
| **Detecta** | SQL injection, XSS al codi, secrets hardcodats | Misconfiguracions, session flaws, runtime issues |
| **No detecta** | Runtime vulnerabilities, misconfiguracions | Vulnerabilitats en codi no assolible |
| **Falsos positius** | Alt (codi no executat pot ser marcat) | Alt (escaneig extern sense context) |
| **Independència tecnològica** | Depèn del llenguatge | Agnòstic |
| **Integració CI/CD** | Natural (cada commit) | Possible (staging pipeline) |

**Quan usar cadascun: el diagrama del SDLC**

Com a regla general, SAST funciona millor en el desenvolupament primerenc. El gran avantatge de DAST en el SDLC és que pot executar-se en múltiples etapes del teu pipeline, des de testing parcial en development fins a tests d'abast complet en staging i llavors testing de producció pels equips de seguretat.

| SDLC i seguretat:DISSENY     → Threat Modeling (manual)             ↓CODIFICACIÓ → SAST integrat a l'IDE ← millor moment per arreglar             ↓COMMIT/PR   → SAST al CI/CD pipeline             ↓BUILD       → SAST \+ Escaneig de dependències             ↓STAGING     → DAST ← simula l'entorn de producció             ↓PRODUCCIÓ   → DAST periòdic \+ monitoring continu |
| :---- |

**La conclusió: no és "o" sinó "i"**

SAST i DAST no son excloents mútuament — estan dissenyats per treballar junts. Cadascun descobreix tipus diferents de vulnerabilitats en etapes diferents del SDLC, fent ambdós essencials per a una cobertura de seguretat completa de l'aplicació. 

SAST detecta problemes al principi en el codi, mentre DAST testa com les apps es comporten en el món real.

La velocitat de noves revelacions continua accelerant-se, amb més de 23.000 nous CVEs revelats en la primera meitat de 2025 sol — un increment del 16% respecte al mateix període de l'any anterior. SAST i DAST ajuden a tancar aquesta bretxa habilitant escanejos freqüents i automatitzats per detectar vulnerabilitats explotables abans que siguin armades.

