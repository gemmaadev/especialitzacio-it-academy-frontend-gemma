## **¿Quines són les vulnerabilitats més comunes en aplicacions web segons l'OWASP Top 10 i com les detecten les eines automatitzades?**

**OWASP Dependency-Check**  
[https://owasp.org/www-project-dependency-check/](https://owasp.org/www-project-dependency-check/)  
Eina OWASP per analitzar dependències i detectar vulnerabilitats conegudes.

**OWASP Top 10 Web Application Security Risks**  
[https://owasp.org/www-project-top-ten/](https://owasp.org/www-project-top-ten/)  
Llistat oficial d’OWASP amb els 10 riscos més crítics en aplicacions web.

**Què és l'OWASP i el seu Top 10**

El Top 10 de l'OWASP és un document d'estandardització de conscienciació per a developers i seguretat d'aplicacions web. Representa un ampli consens sobre els riscos de seguretat més crítics per a les aplicacions web. Globalment reconegut pels developers com el primer pas cap a una codificació més segura.

La versió més recent és l'OWASP Top Ten 2025, publicada el 6 de novembre de 2025, la vuitena edició, basada en l'anàlisi de més de 175.000 registres CVE i feedback de practicants de seguretat a tot el món.

**A01:2025 — Broken Access Control (Control d'Accés Trencat)**

El control d'accés trencat manté la seva posició al \#1 com el risc de seguretat d'aplicació més seriós; les dades contribuïdes indiquen que de mitjana el 3.73% de les aplicacions testejades tenien un o més dels 40 CWEs en aquesta categoria. El Server-Side Request Forgery (SSRF) ha estat incorporat en aquesta categoria per al 2025\.

| // ❌ Vulnerable: l'usuari pot accedir a dades d'altriapp.get('/api/usuaris/:id/perfil', (req, res) \=\> {  // No comprova si l'usuari autenticat pot veure aquest id\!  const perfil \= await db.obtenirPerfil(req.params.id);  res.json(perfil);});// ✅ Corregit: verificació d'autorització explícitaapp.get('/api/usuaris/:id/perfil', autenticat, async (req, res) \=\> {  if (req.usuari.id \!== parseInt(req.params.id) && \!req.usuari.esAdmin) {    return res.status(403).json({ error: 'Accés denegat' });  }  const perfil \= await db.obtenirPerfil(req.params.id);  res.json(perfil);}); |
| :---- |

**Detecció automatitzada:** DAST (OWASP ZAP, Burp Suite) — prova accedir a recursos canviant IDs. SAST — detecta endpoints sense middleware d'autenticació.

**A02:2025 — Security Misconfiguration (Configuració Incorrecta de Seguretat)**

La configuració incorrecta de seguretat puja del \#5 el 2021 al \#2 el 2025\. Les misconfiguracions son més prevalents en les dades d'aquest cicle. El 3.00% de les aplicacions testejades tenien un o més dels 16 CWEs en aquesta categoria.

Ocorre quan sistemes, aplicacions, o serveis es configuren de manera insegura, com ara amb credencials per defecte, funcionalitats innecessàries habilitades, o capçaleres de seguretat absents. Ha pujat en ranking degut a la complexitat dels entorns cloud.

| // ❌ Configuració per defecte inseguraconst app \= express();// → Sense helmet (capçaleres HTTP de seguretat)// → Error verbose que exposa la stack trace// ✅ Configuració seguraimport helmet from 'helmet';app.use(helmet());  // X-Frame-Options, CSP, HSTS, etc.app.use((err, req, res, next) \=\> {  console.error(err);  // log intern  res.status(500).json({ error: 'Error intern' });  // missatge genèric}); |
| :---- |

**Detecció automatitzada:** DAST analitza les capçaleres HTTP de resposta. SonarQube detecta stack traces exposades. Eines de configuració com Trivy analitzen contenidors Docker.

**A03:2025 — Software Supply Chain Failures (NOVA categoria)**

Nova categoria que adreça vulnerabilitats en tot el cicle de vida del software, incloent dependències compromeses, eines de build, o actualitzacions. Incidents d'alt perfil com SolarWinds destaquen els seus perills, malgrat la menor prevalença en tests.

Les fallades de la cadena de subministrament de software son interrupcions o compromisos en el procés de construir, distribuir, o actualitzar software. 

Això va més enllà d'usar simplement components obsolets — inclou canvis maliciosos en codi de tercers, pipelines CI/CD compromesos, i dependències obtingudes de fonts no confiables.

**Detecció automatitzada:** OWASP Dependency-Check i Snyk analitzen `package-lock.json`. `npm audit` comprova les vulnerabilitats conegudes. Dependabot obre PRs automàtiques per a actualitzacions.

**A04:2025 — Injection (Injecció)**

La injecció ocorre quan dades no confiables s'envien a un intèrpret (SQL, NoSQL, OS command, LDAP) com a part d'una consulta o comanda. Les dades hostils de l'atacant poden enganyar l'intèrpret per executar comandes no intencionades o accedir a dades sense autorització adequada.

| // ❌ SQL Injection: l'atacant pot enviar: id \= "1 OR 1=1"const query \= \`SELECT \* FROM usuaris WHERE id \= ${req.params.id}\`;db.query(query);// ❌ Command Injection:exec(\`convert ${req.body.filename} output.pdf\`);// Atacant envia: "file.jpg; rm \-rf /"// ✅ Parameterized queries: cap injecció possibleconst query \= 'SELECT \* FROM usuaris WHERE id \= ?';db.query(query, \[req.params.id\]);// ✅ Validació d'input amb allowlistconst filenameSafe \= /^\[a-zA-Z0-9\_-\]+\\.jpg$/.test(filename); |
| :---- |

**Detecció automatitzada:** SAST (SonarQube, Semgrep) detecta la construcció de queries per concatenació de strings. DAST envia payloads d'injecció a tots els endpoints.

**A05:2025 — Cryptographic Failures (Fallades Criptogràfiques)**

Ocorre quan dades sensibles es transmeten o emmagatzemen sense xifrat adequat, o amb algorismes criptogràfics obsolets o febles.

| // ❌ Falles criptogràfiques comunes:import crypto from 'crypto';// MD5 i SHA-1 son obsolets per a hashing de contrasenyesconst hash \= crypto.createHash('md5').update(password).digest('hex');// ❌ HTTP en lloc de HTTPS// ❌ Contrasenya emmagatzemada en text pla a la BD// ✅ bcrypt per a contrasenyes (algoritme dissenyat per a aquest ús)import bcrypt from 'bcrypt';const hash \= await bcrypt.hash(password, 12);  // 12 rounds \= salt adequat// ✅ HTTPS forçat amb HSTS headerapp.use(helmet.hsts({ maxAge: 31536000 })); |
| :---- |

**Detecció automatitzada:** SAST detecta l'ús d'algorismes obsolets (MD5, SHA-1, DES). SonarQube té regles específiques per a criptografia feble.

**A06:2025 — Vulnerable and Outdated Components**

Components com biblioteques, frameworks, i altres mòduls de software sovint s'executen amb els mateixos privilegis que l'aplicació. Si un component vulnerable és explotat, pot facilitar una pèrdua de dades sèria o el compromís del servidor.

**Detecció automatitzada:** Aquesta categoria és la que millor es detecta automàticament. `npm audit` comprova les versions instal·lades contra la base de dades de vulnerabilitats de npm. OWASP Dependency-Check compara contra la National Vulnerability Database (NVD). L'informe indica el CVE, la gravetat (CVSS score) i si existeix una versió corregida.

**A07:2025 — Identification and Authentication Failures**

Inclou funcions de l'aplicació relacionades amb la identitat, l'autenticació, i la gestió de sessions que sovint s'implementen incorrectament, cosa que permet als atacants comprometre contrasenyes, claus, o tokens de sessió, o explotar altres vulnerabilitats d'implementació per assumir la identitat d'altres usuaris.

| // ❌ Fallades comunes d'autenticació:// Permet contrasenyes febles sense cap validació// Tokens de sessió predictibles// No invalida la sessió en el logout al servidor// ✅ Protecció contra Brute Force:import rateLimit from 'express-rate-limit';const limiter \= rateLimit({  windowMs: 15 \* 60 \* 1000,  // 15 minuts  max: 5,                     // 5 intents màxim  message: 'Massa intents, torna-ho a provar en 15 minuts'});app.post('/login', limiter, autenticar); |
| :---- |

**Detecció automatitzada:** DAST prova atacs de força bruta i comprova si els tokens de sessió son predibles. SonarQube detecta tokens de sessió generats amb `Math.random()` en lloc de `crypto.randomBytes()`.

**A08:2025 — Software or Data Integrity Failures**

Les fallades d'integritat de software i dades es relacionen amb codi i infraestructura que no protegeix contra violacions d'integritat. 

Això inclou aplicacions que depenen de plugins, biblioteques, o mòduls de fonts no confiables, pipelines de desplegament insegurs, i funcionalitat d'auto-actualització que descarrega actualitzacions sense verificació d'integritat suficient.

**Detecció automatitzada:** Comprovar els checksums i signatures dels paquets. Usar `package-lock.json` i verificar-lo al CI/CD.

**A09:2025 — Security Logging and Alerting Failures**

El logging, monitoratge, i alertes de seguretat inadequats impedeix la detecció i resposta oportuna a atacs. Sense el logging adequat d'events de seguretat i mecanismes d'alertes efectius, els atacants poden seguir atacant sistemes, mantenir la persistència, i manipular o extreure dades sense ser detectats.

| // ❌ Logging inadequatapp.post('/login', async (req, res) \=\> {  const usuari \= await autenticar(req.body);  if (\!usuari) return res.status(401).json({ error: 'Error' });  // No hi ha cap log del login fallit\!  res.json({ token: generarToken(usuari) });});// ✅ Logging estructurat de seguretatapp.post('/login', async (req, res) \=\> {  const usuari \= await autenticar(req.body);  if (\!usuari) {    logger.warn('Intent login fallit', {      email: req.body.email,      ip: req.ip,      timestamp: new Date().toISOString()    });    return res.status(401).json({ error: 'Credencials incorrectes' });  }  logger.info('Login exitós', { usuariId: usuari.id, ip: req.ip });  res.json({ token: generarToken(usuari) });}); |
| :---- |

**A10:2025 — Mishandling of Exceptional Conditions (NOVA categoria)**

Nova categoria per al 2025\. Aquesta categoria conté 24 CWEs que se centren en la gestió incorrecta d'errors, errors lògics, "failing open" (concedir accés quan no s'hauria), i altres escenaris relacionats que sorgeixen de condicions anormals que els sistemes poden trobar.

| // ❌ "Failing open": concedeix accés quan l'autenticació fallaasync function verificarAdmin(req, res, next) {  try {    const token \= jwt.verify(req.headers.authorization, SECRET);    req.usuari \= token;    next();  } catch (error) {    // ❌ Failing open: si l'autenticació llança un error, continua\!    next();  }}// ✅ "Failing closed": nega accés en cas de dubteasync function verificarAdmin(req, res, next) {  try {    const token \= jwt.verify(req.headers.authorization, SECRET);    req.usuari \= token;    next();  } catch (error) {    // ✅ Nega sempre en cas d'error    res.status(401).json({ error: 'No autoritzat' });  }} |
| :---- |

**Resum: el Top 10:2025 i les eines de detecció**

| \# | Vulnerabilitat | Eina principal de detecció |
| ----- | ----- | ----- |
| A01 | Broken Access Control | DAST (ZAP, Burp) \+ Code Review |
| A02 | Security Misconfiguration | DAST headers \+ Trivy \+ SonarQube |
| A03 | Supply Chain Failures | OWASP Dependency-Check \+ npm audit |
| A04 | Injection | SAST (SonarQube, Semgrep) \+ DAST |
| A05 | Cryptographic Failures | SAST (detecció MD5, SHA-1, HTTP) |
| A06 | Vulnerable Components | npm audit \+ Snyk \+ Dependabot |
| A07 | Auth Failures | DAST \+ revisió manual \+ SAST |
| A08 | Integrity Failures | Verificació checksums \+ CI/CD review |
| A09 | Logging Failures | Revisió manual \+ SonarQube |
| A10 | Exceptional Conditions | SAST \+ Code Review \+ Tests |

