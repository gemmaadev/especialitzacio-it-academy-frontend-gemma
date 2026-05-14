## **Glossari de Termes — Seguretat automatitzada i mètriques de qualitat**

**Air-gapped** — Entorn completament aïllat de la xarxa externa. Cap dada surt de l'organització. Necessari per a sectors regulats (defensa, sanitat, finances). En el context de la seguretat de dependències, alguns escàners com Tabnine suport desplegament air-gapped per garantir que el codi propietari no surti mai del perímetre de l'empresa.

**Anàlisi Estàtica** — Veure *SAST*.

**Anàlisi Dinàmica** — Veure *DAST*.

**Backtracking Catastròfic** — El fenomen on una expressió regular amb certs patrons (quantificadors imbricats com `(a+)+`) pot trigar un temps exponencial en avaluar-se amb inputs específics. La base dels atacs ReDoS. Detectat per `eslint-plugin-security` amb la regla `detect-unsafe-regex`.

**Broken Access Control (A01:2025)** — El risc \#1 de l'OWASP Top 10:2025. Ocorre quan l'aplicació no verifica adequadament si l'usuari autenticat té permís per accedir a un recurs específic. Exemple: poder accedir a les dades d'altri canviant un ID a la URL sense cap verificació al servidor.

**Cadena de Subministrament (Supply Chain)** — El conjunt de processos, eines, biblioteques i dependències necessaris per construir i distribuir software. Un atac a la cadena de subministrament compromet un component upstream (una dependència o una eina de build) per afectar totes les aplicacions que en depenen.

**CCC (Code Cognitive Complexity)** — Veure *Complexitat Cognitiva*.

**CVSS (Common Vulnerability Scoring System)** — Sistema estàndard per quantificar la gravetat d'una vulnerabilitat en una puntuació del 0 al 10\. CVSS 0-3.9: Baix, 4.0-6.9: Mig, 7.0-8.9: Alt, 9.0-10: Crític. Els escàners de dependències (`npm audit`, Snyk) usen CVSS per prioritzar les vulnerabilitats.

**CVE (Common Vulnerabilities and Exposures)** — Identificador únic i estàndard per a cada vulnerabilitat de seguretat coneguda. Format: CVE-ANY-NNNNN (per exemple, CVE-2021-44228 per a Log4Shell). Els escàners de dependències comparen les biblioteques instal·lades contra la base de dades de CVEs.

**CWE (Common Weakness Enumeration)** — Llista de categories de debilitats de software. Diferent dels CVEs (que son vulnerabilitats concretes en productes concrets), els CWEs son categories genèriques: CWE-89 (SQL Injection), CWE-79 (XSS), CWE-22 (Path Traversal). L'OWASP Top 10 agrupa CWEs en categories.

**CYC** — Veure *Complexitat Ciclomàtica*.

**DAST (Dynamic Application Security Testing)** — Tècnica de testing de seguretat de "caixa negra" que ataca l'aplicació en execució des de fora, simulant un atacant extern. No necessita accés al codi font. Detecta misconfiguracions, vulnerabilitats de sessió, i comportaments insegurs de runtime. Eina principal: OWASP ZAP. Moment d'ús: staging i producció.

**Deute Tècnic** — El cost del treball addicional causat per escollir solucions ràpides en lloc de les correctes. Com el deute financer, acumula interessos: com més temps sense adreçar, més car és corregir-lo. SonarQube el quantifica en temps (hores/dies) i com a percentatge del cost total de desenvolupament.

**Density de Duplicació** — El percentatge de línies de codi que son idèntiques a altres parts del codi. SonarQube mesura aquesta mètrica i emet code smells per blocs duplicats de 10+ línies. El Quality Gate "Sonar Way" estableix el màxim en un 3% al codi nou.

**Dependency Confusion** — Atac on un actor maliciós publica un paquet públic a npm amb el mateix nom que un paquet privat intern d'una organització. El gestor de paquets pot descarregar el maliciós en lloc de l'intern legítim.

**Dependabot** — Eina integrada a GitHub que escaneja automàticament les dependències del projecte i obre Pull Requests per actualitzar les biblioteques vulnerables o obsoletes. Funciona en segon pla sense configuració addicional per als repositoris de GitHub.

**`detect-eval-with-expression`** — La regla de seguretat més crítica de `eslint-plugin-security`. Detecta l'ús de `eval(variable)` on la variable conté input extern. Pot permetre Remote Code Execution: l'atacant envia codi JavaScript maliciós que el servidor executa directament.

**`detect-non-literal-fs-filename`** — Regla de `eslint-plugin-security` que detecta l'ús de variables (en lloc de literals) com a arguments de nom de fitxer en crides al mòdul `fs`. Vulnerable a atacs de Path Traversal: `fs.readFile(req.query.file)` permet a l'atacant llegir `/etc/passwd`.

**`detect-unsafe-regex`** — Regla de `eslint-plugin-security` que detecta expressions regulars susceptibles d'atacs ReDoS per backtracking catastròfic.

**ESLint Security Plugin (`eslint-plugin-security`)** — Plugin de la comunitat ESLint que proporciona 14 regles de seguretat per a JavaScript i Node.js. S'executa en temps de compilació (SAST) i detecta vectors d'atac comuns: injecció de codi, path traversal, ReDoS, command injection i prototype pollution.

**Failing Open** — Antipatró de seguretat on el sistema concedeix accés quan es produeix un error, en lloc de denegar-lo. El comportament correcte és "Failing Closed" (denegar en cas de dubte). Categoria A10:2025 de l'OWASP Top 10:2025.

**False Positive** — Alerta de seguretat o code smell reportat per una eina que no correspon a una vulnerabilitat real. `eslint-plugin-security` admet explícitament que genera molts falsos positius que requereixen revisió humana. Cal equilibrar la sensibilitat de les eines per evitar "alert fatigue".

**FOSS (Free and Open Source Software)** — Software de codi obert i lliure. La majoria de les dependències en un projecte web modern son FOSS. Avantatge: qualsevol pot auditar el codi. Risc: qualsevol pot publicar una actualització maliciosa si compromet el compte del mantenidor.

**IAST (Interactive Application Security Testing)** — Tècnica que combina elements de SAST i DAST. Instruments la instrumentació de l'aplicació en runtime per obtenir tant la visibilitat del codi com el comportament dinàmic. Terme mig entre caixa blanca i caixa negra.

**IDOR (Insecure Direct Object Reference)** — Vulnerabilitat on l'aplicació exposa referències directes a objectes interns (IDs de BD, noms de fitxers) sense verificar l'autorització. Exemple: `/api/factures/1234` accessible sense verificar si l'usuari autenticat és el propietari de la factura 1234\.

**Linting de Seguretat** — L'aplicació d'un linter (com ESLint) amb regles de seguretat per detectar patrons de codi potencialment vulnerables en temps de desenvolupament, abans de l'execució.

**Licències de Software** — Les condicions legals sota les quals es distribueix una biblioteca. Rellevant en seguretat de dependències: algunes llicències (GPL, AGPL) poden imposar obligacions legals. Snyk i altres eines detecten incompatibilitats de llicències a més de vulnerabilitats.

**Mantenibilitat** — La facilitat amb la qual el codi pot ser entès, modificat, i estès. SonarQube la mesura com una de les tres dimensions principals (juntament amb Seguretat i Fiabilitat). La mantenibilitat baixa és la causa principal del deute tècnic.

**Mètrica de McCabe** — Veure *Complexitat Ciclomàtica*. Nomenada en honor de Thomas J. McCabe Sr. que la va proposar el 1976 al paper "A Complexity Measure" a IEEE Transactions on Software Engineering.

**Misconfiguration (A02:2025)** — Vulnerabilitat causada per una configuració incorrecta del servidor, framework, o plataforma: credencials per defecte, capçaleres HTTP de seguretat absents, CORS mal configurat, missatges d'error verbosos. Ha pujat al \#2 al Top 10:2025 degut a la complexitat dels entorns cloud.

**NVD (National Vulnerability Database)** — Base de dades pública dels Estats Units mantinguda pel NIST que conté tots els CVEs amb metadades de gravetat (CVSS), descripció i referències. OWASP Dependency-Check consulta la NVD per detectar vulnerabilitats en les dependències.

**`npm audit`** — Comanda integrada a npm que analitza el `package-lock.json` del projecte i compara les versions instal·lades contra la base de dades de vulnerabilitats de npm. Zero configuració necessària. Part obligatòria del pipeline CI/CD.

**OWASP (Open Web Application Security Project)** — Organització sense ànim de lucre dedicada a la millora de la seguretat del software. Publica el Top 10, eines com Dependency-Check i ZAP, i guies de bones pràctiques. La referència estàndard de la indústria per a la seguretat d'aplicacions web.

**OWASP Dependency-Check** — Eina open source d'OWASP que analitza les dependències d'un projecte (Java, Node.js, .NET, etc.) contra la National Vulnerability Database (NVD) i genera informes HTML, XML i JSON amb les vulnerabilitats detectades i les correccions disponibles.

**OWASP Top 10** — La llista oficial dels deu riscos de seguretat web més crítics, publicada cada 3-4 anys per OWASP. La versió 2025 (publicada el novembre de 2025\) es basa en l'anàlisi de 175.000+ registres CVE. Globalment reconegut com l'estàndard de referència per a la seguretat de les aplicacions web.

**OWASP ZAP (Zed Attack Proxy)** — Eina DAST open source d'OWASP. Actua com a proxy entre el navegador i l'aplicació, interceptant i modificant les peticions per detectar vulnerabilitats. La principal eina DAST gratuïta de la indústria.

**Package Hallucination** — Quan un model de IA suggereix instal·lar una biblioteca npm que no existeix. Un 19.7% dels paquets suggerits per LLMs son fictcis. Risc de seguretat: un atacant pot publicar un paquet maliciós amb el nom exacte suggerit.

**Path Traversal** — Atac on un input maliciós conté seqüències de ruta com `../` que permeten accedir a fitxers fora del directori esperat. `req.query.file = "../../etc/passwd"` pot llegir fitxers de sistema si no es valida l'input.

**Prototype Pollution** — Vulnerabilitat específica de JavaScript. Si un objecte s'usa com a diccionari amb claus controlades per l'usuari (`obj[key] = value`), un atacant pot injectar la clau `__proto__` per modificar el prototip base de tots els objectes JavaScript de l'aplicació.

**Quality Gate** — El conjunt de condicions que el codi ha de satisfer per ser considerat acceptable per a un desplegament. Si una PR falla el Quality Gate de SonarQube, el pipeline CI/CD la bloqueja automàticament. El "Sonar Way" és el Quality Gate per defecte.

**Quality Profile** — El conjunt de regles d'anàlisi activades en SonarQube per a un llenguatge. Cada organització pot personalitzar quines regles s'apliquen i amb quina severitat. Diferent del Quality Gate (que defineix les condicions de pas/fallada).

**Rating A-E (SonarQube)** — La qualificació que SonarQube assigna a cada dimensió del codi. A és excel·lent, E és crític. Es calcula independentment per a Seguretat (basada en vulnerabilitats), Fiabilitat (basada en bugs) i Mantenibilitat (basada en el Technical Debt Ratio). El Quality Gate "Sonar Way" exigeix Rating A per al codi nou en les tres dimensions.

**ReDoS (Regular Expression Denial of Service)** — Atac de denegació de servei que explota expressions regulars amb backtracking catastròfic. L'atacant envia un input especialment dissenyat que fa que la regex trigui un temps exponencial a avaluar-se, bloquejant el fil principal de Node.js.

**Remediació** — El procés de corregir una vulnerabilitat o un codi problemàtic. SonarQube assigna un "cost de remediació" (en minuts) a cada code smell, la suma dels quals forma el Technical Debt.

**SAST (Static Application Security Testing)** — Tècnica de testing de seguretat de "caixa blanca" que analitza el codi font sense executar l'aplicació. Detecta vulnerabilitats al codi en la fase de desenvolupament, quan son més barates de corregir. Eines: SonarQube, ESLint Security Plugin, Semgrep. Moment d'ús: cada commit/PR.

**SDLC (Software Development Life Cycle)** — El cicle de vida complet del desenvolupament de software: disseny, codificació, testing, desplegament i manteniment. La seguretat ha d'integrar-se en cada fase del SDLC ("Shift Left") en lloc d'afegir-se únicament al final.

**Security Hotspot** — Codi que potencialment té implicacions de seguretat i requereix revisió humana per determinar si és realment vulnerable. En SonarQube, diferent d'una "Vulnerabilitat" (confirmada): un Hotspot és un avís que necessita revisió. El Quality Gate exigeix que el 100% dels Hotspots siguin revisats.

**Semgrep** — Eina SAST open source que permet escriure regles personalitzades per detectar patrons de codi inseguros. Molt popular com a alternativa o complement a SonarQube per a equips que necessiten regles específiques del domini.

**"Shift Left"** — La filosofia d'integrar la seguretat i la qualitat en les etapes més primerenques del SDLC (al costat esquerre de la línia de temps). "Shift Left" en seguretat significa detectar vulnerabilitats mentre el developer escriu el codi (IDE), no quan l'aplicació ja és a producció.

**Snyk** — Servei comercial (amb plan gratuït) d'escaneig de dependències amb una base de dades de vulnerabilitats pròpia que sovint supera la NVD en actualitat i cobertura. Integra correccions automàtiques i PRs. Detecta vulnerabilitats, llicències problemàtiques i paquets maliciosos.

**"Sonar Way"** — El Quality Gate predefinit i recomanat de SonarQube. Activat per defecte, de només lectura. Focalitzat en el codi nou: exigeix 0 nous bugs, 0 noves vulnerabilitats, Maintainability Rating A (≤5% Technical Debt Ratio), cobertura ≥80% i duplicació \<3% en el codi nou.

**SonarQube** — Plataforma open source (amb editions comercials) per a l'anàlisi contínua de qualitat de codi. Integra SAST, detecció de code smells, mesura de cobertura, i quantificació del deute tècnic. Genera qualificacions A-E per a Seguretat, Fiabilitat i Mantenibilitat. S'integra al CI/CD via el Quality Gate.

**SonarLint** — L'extensió per a IDEs (VS Code, IntelliJ, etc.) que porta les regles de SonarQube directament a l'editor, mostrant problemes mentre escrius sense necessitat d'executar una anàlisi completa.

**SQL Injection (A04:2025)** — Vulnerabilitat on input d'usuari no sanititzat s'insereix directament a una query SQL, permetent a l'atacant modificar la query i accedir o modificar dades no autoritzades. `SELECT * FROM users WHERE id = ${userId}` és vulnerable; `SELECT * FROM users WHERE id = ?` amb paràmetre separat no ho és.

**SQALE (Software Quality Assessment based on Lifecycle Expectations)** — El model de mesura del deute tècnic que usa SonarQube. Defineix el Technical Debt Ratio i la Maintainability Rating A-E basant-se en la relació entre el cost de remediació i el cost de desenvolupament.

**Supply Chain Failures (A03:2025)** — Nova categoria a l'OWASP Top 10:2025. Inclou vulnerabilitats introduïdes a través de dependències compromeses, eines de build, o actualitzacions malicioses. Va més enllà d'usar components obsolets: inclou canvis maliciosos en codi de tercers i pipelines CI/CD compromesos.

**TBT** — Veure *Technical Debt Ratio*.

**Technical Debt Ratio** — La fórmula de SonarQube per calcular la Maintainability Rating: `cost_remediació / (cost_per_línia × nombre_línies)`. El cost per defecte per línia és 0.06 dies. Un ratio del 0-5% dona Rating A; \>50% dona Rating E.

**Timing Attack** — Atac que mesura el temps que triga una operació per inferir informació secreta. En la comparació de tokens o contrasenyes, la funció `===` de JavaScript és vulnerable perquè s'atura en el primer caràcter diferent, revelant quants caràcters son correctes. La solució: `crypto.timingSafeEqual()`.

**Trivy** — Escàner open source de vulnerabilitats per a contenidors Docker, imatges, i fitxers de configuració. Complementa els escàners de dependències com npm audit per cobrir la capa d'infraestructura (sistema operatiu del contenidor, configuració Kubernetes, etc.).

**Trojan Source** — Atac que utilitza caràcters Unicode de control bidi (Right-to-Left) per fer que el codi sembli diferent del que realment és quan es llegeix en un editor. El codi pot semblar inofensiu per un code reviewer però executar lògica maliciosa. Detectat per la regla `detect-bidi-characters` de `eslint-plugin-security`.

**Typosquatting** — Tàctica d'atac on es publiquen paquets npm amb noms similars a biblioteques populars, aprofitant els errors tipogràfics dels developers: `requets` en lloc de `requests`, `lodahs` en lloc de `lodash`. Mitigació: verificar els noms dels paquets amb atenció i usar escàners de dependències.

**Vulnerabilitat** — En el context de SonarQube, un problema de seguretat confirmat al codi que pot ser explotat directament. Diferent d'un Security Hotspot (que necessita revisió per confirmar si és vulnerable). Les vulnerabilitats contribueixen directament al Security Rating.

**XSS (Cross-Site Scripting)** — Atac d'injecció on codi JavaScript maliciós s'insereix en pàgines web visualitzades per altres usuaris. `element.innerHTML = userInput` és vulnerable; `element.textContent = userInput` no ho és (escapa automàticament). Detectat per `eslint-plugin-security` i DAST.

**Zero-Day** — Una vulnerabilitat de seguretat descoberta recentment que els fabricants del software encara no han tingut temps de corregir (zero dies per a la correcció). Els escàners de dependències no poden detectar zero-days perquè no hi ha CVE assignat. Requereix monitoratge actiu i actualitzacions ràpides quan apareix un CVE nou.  
