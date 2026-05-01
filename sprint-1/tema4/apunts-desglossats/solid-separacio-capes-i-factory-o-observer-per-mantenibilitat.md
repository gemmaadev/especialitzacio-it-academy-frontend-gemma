## **SOLID, Separació de capes i patrons de disseny**

**Què és SOLID i per a qui?**

SOLID és un conjunt de cinc principis de disseny orientat a objectes que ajuden els developers a escriure codi que és més fàcil de mantenir, provar i estendre a mesura que el projecte creix. Aplicar SOLID porta a una millor separació de responsabilitats, simplificant l'addició de funcionalitats o la correcció de bugs sense trencar la funcionalitat existent.

**S — Single Responsibility Principle (SRP)**

Una classe o funció hauria de tenir una sola responsabilitat, o una sola raó per canviar. Si una classe gestiona més d'una funcionalitat, actualitzar-ne una sense afectar les altres es torna complicat.

| // ❌ Viola SRP: una classe fa massa cosesclass Usuari {  constructor(nom, email) {    this.nom \= nom;    this.email \= email;  }  validarEmail() { /\* validació \*/ }  guardarABaseDeDades() { /\* persistència \*/ }  enviarEmailBenvinguda() { /\* comunicació \*/ }  generarPDF() { /\* presentació \*/ }}// ✅ Respecta SRP: cada classe té una responsabilitatclass Usuari {  constructor(nom, email) {    this.nom \= nom;    this.email \= email;  }}class ValidadorUsuari {  validarEmail(email) {    return /^\[^\\s@\]+@\[^\\s@\]+\\.\[^\\s@\]+$/.test(email);  }}class RepositoriUsuari {  async guardar(usuari) { /\* persistència \*/ }  async trobarPerId(id) { /\* recuperació \*/ }}class NotificadorUsuari {  async enviarBenvinguda(usuari) { /\* email \*/ }} |
| :---- |

**O — Open/Closed Principle (OCP)**

El principi Open/Closed dicta que el codi existent no s'hauria de modificar quan s'afegeix nova funcionalitat. En canvi, s'hauria d'estendre el seu comportament, típicament creant noves classes que implementen una interfície.

El patró **Strategy** implementa OCP perfectament:

| // ❌ Viola OCP: cada nou mètode de pagament modifica el codi existentclass ProcessadorPagament {  processar(pagament) {    if (pagament.tipus \=== 'targeta') {      // lògica de targeta    } else if (pagament.tipus \=== 'paypal') {      // lògica de paypal    } else if (pagament.tipus \=== 'crypto') {      // lògica de crypto \-- cal modificar aquesta classe\!    }  }}// ✅ Respecta OCP: nous mètodes s'afegeixen sense modificar el codi existentclass ProcessadorTargeta {  processar(pagament) { console.log(\`Cobrant ${pagament.total}€ per targeta\`); }}class ProcessadorPayPal {  processar(pagament) { console.log(\`Cobrant ${pagament.total}€ per PayPal\`); }}class ProcessadorCrypto {  processar(pagament) { console.log(\`Cobrant ${pagament.total} BTC\`); }}class ProcessadorPagament {  constructor(estrategia) {    this.estrategia \= estrategia;  // Dependency Injection  }  processar(pagament) {    this.estrategia.processar(pagament);  // delega a l'estratègia  }}// Afegir nous mètodes sense tocar codi existentconst processador \= new ProcessadorPagament(new ProcessadorPayPal());processador.processar({ total: 99.99 }); |
| :---- |

**L — Liskov Substitution Principle (LSP)**

Els subtipus han de poder substituir el tipus base sense trencar el comportament. Si un codi espera un objecte de tipus A, ha de funcionar igual amb qualsevol subclasse de A.

| // ❌ Viola LSP: Quadrat hereta Rectangle però trenca el seu comportamentclass Rectangle {  setWidth(w) { this.width \= w; }  setHeight(h) { this.height \= h; }  area() { return this.width \* this.height; }}class Square extends Rectangle {  setWidth(w) { this.width \= w; this.height \= w; }   // trenca el contracte\!  setHeight(h) { this.width \= h; this.height \= h; }  // trenca el contracte\!}// Amb Rectangle: area() \= 30 (5 \* 6 \= 30\)// Amb Square: area() \= 36 (6 \* 6 \= 36\) ← comportament diferent\!// ✅ Respecta LSP: classes independents sense herència forçadaclass Forma {  area() { throw new Error('Cal implementar area()'); }}class Rectangle extends Forma {  constructor(width, height) { super(); this.width \= width; this.height \= height; }  area() { return this.width \* this.height; }}class Square extends Forma {  constructor(costat) { super(); this.costat \= costat; }  area() { return this.costat \*\* 2; }} |
| :---- |

**I — Interface Segregation Principle (ISP)**

ISP suggereix que les classes no s'han de forçar a implementar interfícies que no usen. En JavaScript, sense interfícies formals, es segueix ISP dissenyant abstraccions petites i enfocades. Evita crear objectes amb APIs grans i tot-en-un: prefereix composició i separació de responsabilitats.

| // ❌ Viola ISP: una interfície massa granclass Dispositiu {  imprimir() { throw new Error('Not implemented'); }  escanejar() { throw new Error('Not implemented'); }  enviarFax() { throw new Error('Not implemented'); }}// Una impressora bàsica ha d'implementar TOTES les funcionsclass ImpressoraBasica extends Dispositiu {  imprimir() { console.log('Imprimint...'); }  escanejar() { throw new Error('No suportada'); }  // ← forçada\!  enviarFax() { throw new Error('No suportada'); }  // ← forçada\!}// ✅ Respecta ISP: interfícies petites i específiquesconst Imprimible \= { imprimir: () \=\> {} };const Escanejable \= { escanejar: () \=\> {} };const Faxable \= { enviarFax: () \=\> {} };// Composició: cada dispositiu agafa el que necessitaclass ImpressoraBasica {  imprimir() { console.log('Imprimint...'); }}class ImpressoraMultifuncio {  imprimir() { console.log('Imprimint...'); }  escanejar() { console.log('Escanejant...'); }  enviarFax() { console.log('Enviant fax...'); }} |
| :---- |

**D — Dependency Inversion Principle (DIP)**

DIP significa que els mòduls d'alt nivell no han de dependre dels mòduls de baix nivell; tots dos han de dependre d'abstraccions. En JavaScript, això s'aconsegueix mitjançant la injecció de dependències: passar serveis (DB, mailer) com a arguments en lloc de crear-los dins de la classe.

| // ❌ Viola DIP: UserService depèn directament de MySQLDatabaseclass UserService {  constructor() {    this.db \= new MySQLDatabase();  // acoblament fort\!  }  registrar(usuari) { this.db.guardar(usuari); }}// ✅ Respecta DIP: la dependència s'injecta des de foraclass UserService {  constructor(db, mailer) {  // Dependency Injection    this.db \= db;    this.mailer \= mailer;  }  async registrar(usuari) {    await this.db.guardar(usuari);      // funciona amb MySQL, MongoDB, SQLite...    await this.mailer.enviar(usuari);   // funciona amb SendGrid, Mailchimp...  }}// Producció: MySQL \+ SendGridconst service \= new UserService(new MySQLDatabase(), new SendGridMailer());// Testing: bases de dades i mailers simulatsconst serviceTest \= new UserService(new InMemoryDatabase(), new FakeMailer()); |
| :---- |

**Separació de capes**

Separar les responsabilitats en capes té molts avantatges: el codi és més modular i reutilitzable, les modificacions en una funció no afecten les altres, i cada funció es pot provar individualment.

| L'arquitectura en capes típica d'una aplicació web:UI / Presentació (components React, DOM)        ↓ ↑Capa de Servei / Casos d'Ús (lògica de negoci)        ↓ ↑Capa de Repositori (accés a dades)        ↓ ↑Capa d'Infraestructura (API externa, DB, Storage) |
| :---- |

| // infrastructure/api.js \-- detalls de la petició HTTPexport const apiClient \= {  async get(url) {    const res \= await fetch(url);    if (\!res.ok) throw new Error(\`HTTP ${res.status}\`);    return res.json();  }};// repositories/usuariRepository.js \-- accés a dadesimport { apiClient } from '../infrastructure/api.js';export const usuariRepository \= {  async trobarPerId: (id) \=\> apiClient.get(\`/api/usuaris/${id}\`),  async trobarTots: () \=\> apiClient.get('/api/usuaris'),};// services/usuariService.js \-- lògica de negociimport { usuariRepository } from '../repositories/usuariRepository.js';export const usuariService \= {  async obtenirPerfilComplet(id) {    const usuari \= await usuariRepository.trobarPerId(id);    if (\!usuari.actiu) throw new Error('Usuari inactiu');    return { ...usuari, nomComplet: \`${usuari.nom} ${usuari.cognom}\` };  }};// components/PerfilUsuari.jsx \-- UI (React)import { usuariService } from '../services/usuariService.js';function PerfilUsuari({ id }) {  // La UI no sap res de fetch, ni d'APIs, ni de la DB  const perfil \= await usuariService.obtenirPerfilComplet(id);  return \<div\>{perfil.nomComplet}\</div\>;} |
| :---- |

**El patró factory**

El patró Factory s'alinea amb SRP aïllant la creació d'objectes, permetent que les classes es concentrin en les seves responsabilitats principals.

Factory és útil quan la creació d'un objecte és complexa o quan el tipus exacte d'objecte a crear depèn d'una condició:

| // factory/notificacioFactory.jsclass EmailNotificacio {  enviar(missatge) { console.log(\`Email: ${missatge}\`); }}class SMSNotificacio {  enviar(missatge) { console.log(\`SMS: ${missatge}\`); }}class PushNotificacio {  enviar(missatge) { console.log(\`Push: ${missatge}\`); }}// La Factory centralitza la lògica de creacióclass NotificacioFactory {  static crear(tipus) {    const notificacions \= {      email: () \=\> new EmailNotificacio(),      sms: () \=\> new SMSNotificacio(),      push: () \=\> new PushNotificacio(),    };    const creador \= notificacions\[tipus\];    if (\!creador) throw new Error(\`Tipus desconegut: ${tipus}\`);    return creador();  }}// Ús: el codi client no sap quin objecte es creaconst notificacio \= NotificacioFactory.crear('email');notificacio.enviar('La teva comanda ha sortit\!'); |
| :---- |

**El patró observer**

Observer permet que objectes (observers) s'subscriguin a canvis d'un altre objecte (subject) sense que el subject hagi de conèixer els seus observers. El flux de control s'inverteix: en lloc que el subject cridi directament als seus dependents, els dependents s'inscriuen per rebre notificacions.

// Observer 2: actualitza el total visible

| // EventEmitter: implementació bàsica del patró Observerclass EventEmitter {  constructor() {    this.events \= {};  }  on(event, callback) {    if (\!this.events\[event\]) this.events\[event\] \= \[\];    this.events\[event\].push(callback);    return () \=\> this.off(event, callback);  // retorna funció per dessubscriure  }  off(event, callback) {    this.events\[event\] \= this.events\[event\]?.filter(cb \=\> cb \!== callback);  }  emit(event, data) {    this.events\[event\]?.forEach(cb \=\> cb(data));  }}// Cas pràctic: carret de compraclass CarretCompra extends EventEmitter {  constructor() {    super();    this.productes \= \[\];  }  afegirProducte(producte) {    this.productes.push(producte);    this.emit('producteAfegit', producte);      // notifica tots els observers    this.emit('totalActualitzat', this.total);  }  get total() {    return this.productes.reduce((sum, p) \=\> sum \+ p.preu, 0);  }}// Observers: cada un té la seva responsabilitatconst carret \= new CarretCompra();// Observer 1: actualitza la UI del comptadorcarret.on('producteAfegit', producte \=\> {  document.querySelector('\#comptador').textContent \= carret.productes.length;});// Observer 2: actualitza el total visiblecarret.on('totalActualitzat', total \=\> {  document.querySelector('\#total').textContent \= \`${total.toFixed(2)}€\`;});// Observer 3: envia analítiquescarret.on('producteAfegit', producte \=\> {  analytics.track('add\_to\_cart', { producteId: producte.id });});// Afegir producte → tots els observers s'actualitzen automàticamentcarret.afegirProducte({ id: 1, nom: 'Portàtil', preu: 999 }); |
| :---- |

**Com s'encaixa tot: l'aplicació completa**

| SOLID \+ Patrons \= Arquitectura mantenibleSRP → cada classe/funció fa una cosa  └── Separació de capes (UI / Servei / Repositori / Infraestructura)OCP → el codi existeix sense modificar-se  └── Patró Strategy (pagaments, notificacions)DIP → injecció de dependències  └── Patró Factory (creació d'objectes complexos)Observer → comunicació desacoblada entre capes  └── Events per sincronitzar UI amb estat |
| :---- |

**La regla pràctica: no sobre-enginyeris**

El major perill és sobre-enginyerir: dividir el codi en capes d'abstraccions que no serveixen cap propòsit. Quan cada funcionalitat genera una nova interfície o classe base, la complexitat explota i la mantenibilitat desapareix. Comença amb implementacions simples i introdueix abstraccions únicament quan tens almenys dos casos d'ús concrets que se'n beneficien.