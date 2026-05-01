## **Cohesió i Acoblament en JavaScript**

**Cohesion and Coupling in JavaScript**  
[https://medium.com/@m-mdy-m/cohesion-and-coupling-in-javascript-0318f56d7ff2](https://medium.com/@m-mdy-m/cohesion-and-coupling-in-javascript-0318f56d7ff2)  
Article sobre cohesió i acoblament aplicats al desenvolupament amb JavaScript.

**Introducció: els dos pilars del bon disseny**

Cohesió i acoblament són dos principis fonamentals en el disseny orientat a objectes que juguen un paper crucial en la creació de sistemes de software robustos i mantenibles. En el disseny OO, aconseguir alta cohesió i baix acoblament és essencial per a construir sistemes escalables, mantenibles i extensibles.

La relació entre tots dos és inversament proporcional: alta cohesió sovint correlaciona amb baix acoblament, i viceversa. Són les dues cares de la mateixa moneda del bon disseny.

**Acoblament (Coupling): grau d'interdependència**

L'acoblament és el grau d'interdependència entre mòduls o classes de software. Mesura com d'estretament connectades estan dues rutines o mòduls. El baix acoblament sovint es considera un signe d'un sistema informàtic ben estructurat i un bon disseny, i combinat amb alta cohesió, suporta els objectius generals d'alta llegibilitat i mantenibilitat.

### **Baix Acoblament (el que volem)**

El baix acoblament implica interaccions mínimes entre components. S'aconsegueix limitant el coneixement que cada classe o mòdul té dels altres i assegurant que la comunicació es produeix a través d'interfícies ben definides. El baix acoblament facilita el manteniment, el testing i la reutilització del codi.

| // ✅ Baix acoblament: UserService no sap com funciona la DBclass UserService {  constructor(database, mailer) {  // rep les dependències des de fora    this.db \= database;    this.mailer \= mailer;  }  async registrar(usuari) {    await this.db.guardar(usuari);    await this.mailer.enviarBenvinguda(usuari.email);  }}// Pots canviar MySQL per MongoDB sense tocar UserServiceconst service \= new UserService(new MySQLDatabase(), new SendGridMailer()); |
| :---- |

### **Alt Acoblament (el que hem d'evitar)**

L'alt acoblament denota fortes dependències entre components. Quan un component depèn fortament dels detalls interns d'un altre, els canvis en un component poden cascadejar, afectant els altres i fent el sistema fràgil i difícil de mantenir.

| // ❌ Alt acoblament: UserService crea les seves pròpies dependènciesclass UserService {  constructor() {    this.db \= new MySQLDatabase();      // acoblament fort    this.mailer \= new SendGridMailer(); // acoblament fort  }}// Canviar la DB \= modificar UserService. Testar \= impossible sense BD real. |
| :---- |

**Tipus d'acoblament (del pitjor al millor)**

### **Content Coupling — el pitjor**

Content coupling ocorre quan un mòdul accedeix directament o modifica les dades internes o els detalls d'implementació d'un altre mòdul. És la forma d'acoblament més estreta. Qualsevol canvi en la implementació d'un mòdul pot requerir canvis corresponents en l'altre.

| // ❌ Content Coupling: accés directe a internals d'un altre mòdulclass CarretCompra {  calcularTotal(usuari) {    // Accedeix directament als internals de Usuari    return usuari.\_carretIntern.reduce((sum, p) \=\> sum \+ p.\_preu, 0);  }} |
| :---- |

### **Common Coupling — variables globals compartides**

Common coupling passa quan múltiples mòduls comparteixen les mateixes dades globals. Els canvis a les dades globals afecten tots els mòduls que les usen. Augmenta el risc d'efectes secundaris no desitjats i dificulta el debugging i el manteniment.

| // ❌ Common Coupling: variable global compartidalet estatGlobal \= { usuariActual: null, carret: \[\] };function login(usuari) { estatGlobal.usuariActual \= usuari; }function afegirProducte(p) { estatGlobal.carret.push(p); }// Si canvies l'estructura de estatGlobal → tot es trenca |
| :---- |

### **Data Coupling — el millor (el volem)**

Data coupling passa quan els mòduls es comuniquen passant dades, típicament a través de paràmetres. És un acoblament feble basat en passar dades. Els mòduls coneixen les dades dels altres, però no els seus detalls interns.

| // ✅ Data Coupling: comunicació via paràmetres ben definitsfunction calcularIVA(preu, percentatge \= 0.21) {  return preu \* percentatge;}function calcularTotal(productes) {  return productes.reduce((sum, p) \=\> sum \+ calcularIVA(p.preu), 0);}// Cada funció és independent i fàcil de testar per separat |
| :---- |

### **Temporal Coupling — ordre d'execució obligatori**

Temporal coupling passa quan el flux de control entre mòduls es basa en el timing o sincronització. Els mòduls són temporalment dependents entre ells: el mòdul A ha de ser cridat abans del mòdul B degut a restriccions de timing.

| // ❌ Temporal Coupling: l'ordre importa però no és explícitconst gestor \= new GestorSessio();gestor.configurar();   // OBLIGATORI cridar primergestor.iniciar();      // OBLIGATORI cridar segongestor.autenticar();   // Falla si no s'ha cridat configurar() i iniciar()// ✅ Solució: encapsular l'ordre en una sola cridaclass GestorSessio {  iniciarAmbConfiguracio() {    this.configurar();    this.iniciar();    this.autenticar();  }} |
| :---- |

**Cohesió (Cohesion): grau d'unitat interna**

La cohesió en programació de computadors es refereix al grau en el qual els elements dins d'un mòdul estan relacionats o van junts. En un sentit, és una mesura de la força de la relació entre els mètodes i dades d'una classe i algun propòsit o concepte unificador servit per aquella classe. Els mòduls amb alta cohesió tendeixen a ser preferibles, perquè l'alta cohesió s'associa amb trets desitjables del software incloent robustesa, fiabilitat, reutilitzabilitat i comprensibilitat.

### **Alta Cohesió (el que volem)**

La cohesió s'augmenta quan les funcionalitats d'una classe, accessibles a través dels seus mètodes, tenen similituds significatives o serveixen un propòsit unificat. Alta cohesió s'aconsegueix quan els mètodes dins d'una classe duen a terme un nombre limitat d'activitats estretament relacionades.

| // ✅ Alta Cohesió: AuthManager s'ocupa ÚNICAMENT de l'autenticacióclass AuthManager {  constructor() {    this.usuariActual \= null;    this.isAuthenticated \= false;  }  login(username, password) {    // Lògica d'autenticació    this.usuariActual \= { username };    this.isAuthenticated \= true;  }  logout() {    this.usuariActual \= null;    this.isAuthenticated \= false;  }  isLoggedIn() { return this.isAuthenticated; }  getCurrentUser() { return this.usuariActual; }  resetPassword(username, newPassword) { /\* ... \*/ }}// Tots els mètodes serveixen un únic propòsit: gestionar l'autenticació |
| :---- |

### 

### 

### **Baixa Cohesió (el que hem d'evitar)**

La baixa cohesió en programació ocorre quan els elements dins d'un mòdul manca d'un propòsit fort i unificat o tenen funcionalitats poc relacionades. Mòduls amb baixa cohesió tendeixen a contenir mètodes que realitzen un gran nombre d'activitats no relacionades.

| // ❌ Baixa Cohesió: UtilityFunctions fa massa coses sense relacióclass UtilityFunctions {  calcularAreaRectangle(length, width) { return length \* width; }  convertirAMajuscules(str) { return str.toUpperCase(); }  generarNombreAleatori(min, max) {    return Math.floor(Math.random() \* (max \- min \+ 1)) \+ min;  }  validarEmail(email) { return /\\S+@\\S+\\.\\S+/.test(email); }  formatarData(data) { return data.toISOString(); }  calcularIVA(preu) { return preu \* 0.21; }}// Per quèuna classe de geometria conté validació d'email?// ✅ Solució: separar en mòduls cohesionatsclass MatematiquesFigures {  calcularAreaRectangle(length, width) { return length \* width; }  calcularAreaCircle(radius) { return Math.PI \* radius \*\* 2; }}class ValidadorFormularis {  validarEmail(email) { return /\\S+@\\S+\\.\\S+/.test(email); }  validarTelefon(tel) { return /^\\d{9}$/.test(tel); }}class FormateadorDates {  formatarData(data) { return data.toISOString(); }  formatarPreu(preu) { return \`${preu.toFixed(2)}€\`; }} |
| :---- |

**Les conseqüències d'un mal disseny**

### **Problemes de l'alt acoblament**

L'alt acoblament porta a: un efecte onada de canvis (quan un mòdul es modifica, sovint requereix canvis en altres mòduls estretament acoblats, podent propagar-se per tot el sistema), dificultat en la reutilitzabilitat i el testing (els mòduls estretament acoblats són menys reutilitzables perquè estan lligats a contextos específics), i flexibilitat i escalabilitat reduïdes (l'alt acoblament limita la flexibilitat del sistema per acomodar canvis o adaptar-se a nous requisits).

### **Problemes de la baixa cohesió**

La baixa cohesió porta a: major complexitat del mòdul (mòduls amb baixa cohesió contenen una àmplia gamma de funcionalitats no relacionades, fent-los més difícils d'entendre i mantenir), menor mantenibilitat del sistema (canvis en una part del codebase poden tenir conseqüències no desitjades en altres parts), i reutilitzabilitat reduïda del mòdul (és menys probable que siguin reutilitzables en altres parts del sistema o en projectes diferents).

**Aplicació pràctica: refactoritzar cap al bon disseny**

| // ❌ MAL: baix acoblament I baixa cohesióclass GestorAplicacio {  constructor() {    this.db \= new MySQLDatabase();         // acoblament fort    this.mailer \= new GmailSMTP();         // acoblament fort  }  registrarUsuari(nom, email, password) {    // validació    if (\!email.includes('@')) throw new Error('Email invàlid');    // hash de contrasenya    const hash \= sha256(password);    // guardar a BD    this.db.execute(\`INSERT INTO users VALUES (${nom}, ${email}, ${hash})\`);    // enviar email    this.mailer.send(email, 'Benvinguda\!', \`Hola ${nom}\`);    // log    console.log(\`Usuari ${nom} registrat\`);  }}// ✅ BÉ: alta cohesió I baix acoblamentclass ValidadorUsuari {  validarEmail(email) {    if (\!email.includes('@')) throw new Error('Email invàlid');  }  validarPassword(password) {    if (password.length \< 8) throw new Error('Contrasenya massa curta');  }}class RepositoriUsuari {  constructor(db) { this.db \= db; }  async guardar(usuari) { await this.db.insert('users', usuari); }}class NotificadorUsuari {  constructor(mailer) { this.mailer \= mailer; }  async enviarBenvinguda(email, nom) {    await this.mailer.send(email, 'Benvinguda\!', \`Hola ${nom}\`);  }}class RegistreUsuariService {  constructor(validador, repositori, notificador) {    this.validador \= validador;    this.repositori \= repositori;    this.notificador \= notificador;  }  async registrar(nom, email, password) {    this.validador.validarEmail(email);    this.validador.validarPassword(password);    const usuari \= { nom, email, password: sha256(password) };    await this.repositori.guardar(usuari);    await this.notificador.enviarBenvinguda(email, nom);  }} |
| :---- |

**Resum**

|  | Cohesió | Acoblament |
| ----- | ----- | ----- |
| **Volem** | Alta | Baixa |
| **Significa** | Cada mòdul fa una cosa i la fa bé | Els mòduls depenen poc els uns dels altres |
| **Es trenca quan** | Un mòdul fa massa coses sense relació | Un mòdul accedeix als internals d'un altre |
| **Benefici** | Llegibilitat, reutilitzabilitat, testabilitat | Flexibilitat, mantenibilitat, escalabilitat |
| **Patró que ajuda** | SRP (Single Responsibility) | DIP (Dependency Injection) |
| **Detectar el problema** | "Per quèesta classe canvia per raons tan diverses?" | "Si canvio X, quantes altres classes he de canviar?" |

