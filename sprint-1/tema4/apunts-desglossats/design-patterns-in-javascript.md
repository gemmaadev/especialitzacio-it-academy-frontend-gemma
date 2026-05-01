## **Patrons de Disseny en JavaScript**

**Design Patterns in JavaScript**  
[https://dev.to/topefasasi/js-design-patterns-a-comprehensive-guide-h3m](https://dev.to/topefasasi/js-design-patterns-a-comprehensive-guide-h3m)  
Guia completa sobre patrons de disseny en JavaScript amb exemples.

**Què són els patrons de disseny?**

Els patrons de disseny ajuden els developers a escriure codi més net i mantenible proporcionant solucions provades a problemes comuns. En lloc de començar des de zero quan s'enfronta a un repte familiar, els developers poden aplicar un patró provat que altres han refinat durant anys. Els patrons de disseny serveixen també com a vocabulari comú entre developers. Quan menciones que un component usa el patró Observer, qualsevol developer experimentat entén immediatament la seva arquitectura i comportament.

Els patrons de disseny es classifiquen en tres categories principals: els patrons creacionals s'ocupen dels mecanismes de creació d'objectes, els patrons estructurals tracten la composició i les relacions entre objectes, i els patrons de comportament se centren en la comunicació entre objectes.

**1\. Patrons Creacionals: com es creen els objectes**

### **Singleton: una sola instància**

El patró Singleton assegura que una classe té únicament una instància i proporciona un punt d'accés global a aquella instància. És útil quan vols limitar el nombre d'instàncies d'una classe particular i assegurar que totes les parts de la teva aplicació comparteixen la mateixa instància.

Casos d'ús habituals: Singletons s'usen sovint per a logging, caching i gestió de configuracions.

| // Singleton amb classe ES6class ConfiguracioApp {  constructor() {    // Si ja existeix una instància, retorna-la    if (ConfiguracioApp.instancia) {      return ConfiguracioApp.instancia;    }    this.apiUrl \= 'https://api.exemple.com';    this.tema \= 'dark';    this.idioma \= 'ca';    ConfiguracioApp.instancia \= this;  // guarda la instància  }  static getInstance() {    return new ConfiguracioApp();  }}const config1 \= new ConfiguracioApp();const config2 \= new ConfiguracioApp();console.log(config1 \=== config2);  // true \-- mateixa instància\!config1.tema \= 'light';console.log(config2.tema);         // 'light' \-- és el mateix objecte// Singleton alternatiu amb IIFE (mòdul)const GestorSessio \= (() \=\> {  let instancia \= null;  function crear() {    return {      usuariActual: null,      iniciarSessio(usuari) { this.usuariActual \= usuari; },      tancarSessio() { this.usuariActual \= null; },    };  }  return {    getInstance() {      if (\!instancia) instancia \= crear();      return instancia;    }  };})(); |
| :---- |

**Factory: delegar la creació d'objectes**

El patró Factory proporciona una interfície per crear objectes mentre deixa a la implementació la decisió de quina classe instanciar. Manté la lògica de creació d'objectes separada del codi que els usa. Els patrons Factory brillen quan vols afegir nous tipus d'objectes sense canviar el codi existent, fent-los invaluables per a arquitectures escalables.

| // Factory Method: cada subclasse decideix com crear l'objecteclass Notificacio {  enviar(missatge) {    throw new Error('Cal implementar enviar()');  }}class NotificacioEmail extends Notificacio {  enviar(missatge) {    console.log(\`Email: ${missatge}\`);  }}class NotificacioSMS extends Notificacio {  enviar(missatge) {    console.log(\`SMS: ${missatge}\`);  }}class NotificacioPush extends Notificacio {  enviar(missatge) {    console.log(\`Push: ${missatge}\`);  }}// La Factory centralitza i aïlla la creacióclass NotificacioFactory {  static crear(tipus) {    const tipus\_map \= {      email: NotificacioEmail,      sms: NotificacioSMS,      push: NotificacioPush,    };    const Clase \= tipus\_map\[tipus\];    if (\!Clase) throw new Error(\`Tipus desconegut: ${tipus}\`);    return new Clase();  }}// El codi client no sap quina classe es creaconst notif \= NotificacioFactory.crear('email');notif.enviar('La teva comanda ha sortit\!');// Abstract Factory: família d'objectes relacionatsclass UIFactory {  crearBoto() { throw new Error('No implementat'); }  crearModal() { throw new Error('No implementat'); }}class MaterialUIFactory extends UIFactory {  crearBoto() { return new BotoMaterial(); }  crearModal() { return new ModalMaterial(); }}class BootstrapFactory extends UIFactory {  crearBoto() { return new BotoBootstrap(); }  crearModal() { return new ModalBootstrap(); }} |
| :---- |

**2\. Patrons estructurals: com es relacionen els objectes**

### **Decorator: afegir comportament dinàmicament**

El patró Decorator afegeix responsabilitats addicionals als objectes dinàmicament. Els Decorators proporcionen una alternativa flexible a la subclasse per estendre la funcionalitat. Els decoradors de funció són habituals en JavaScript per afegir logging, validació o caching a les funcions.

Si ets familiar amb React i els Higher Order Components (HOC), aquest enfocament probablement et sona. El patró Decorator és la base de molts patrons de components React.

| // Decorator com a Higher-Order Functionfunction ambLogging(fn) {  return function(...args) {    console.log(\`Cridant ${fn.name} amb:\`, args);    const resultat \= fn(...args);    console.log(\`${fn.name} ha retornat:\`, resultat);    return resultat;  };}function ambCache(fn) {  const cache \= new Map();  return function(...args) {    const clau \= JSON.stringify(args);    if (cache.has(clau)) {      console.log('Retornant des de cache');      return cache.get(clau);    }    const resultat \= fn(...args);    cache.set(clau, resultat);    return resultat;  };}// Funció originalfunction calcularTotal(productes) {  return productes.reduce((sum, p) \=\> sum \+ p.preu, 0);}// Decorar amb comportaments addicionals sense modificar la funció originalconst calcularTotalAmbLog \= ambLogging(calcularTotal);const calcularTotalAmbCache \= ambCache(ambLogging(calcularTotal)); |
| :---- |

### **Proxy: controlar l'accés a un objecte**

El patró Proxy proporciona un intermediari que controla l'accés a un altre objecte. Els Proxies poden interceptar i sobreescriure operacions com l'accés a propietats, l'assignació i l'eliminació. Són útils per a validació, lazy loading i implementació de sistemes reactius.

| // Proxy per a validació d'un objecte Usuariconst usuari \= {  nom: '',  edat: 0,  email: '',};const usuariValidat \= new Proxy(usuari, {  set(objecte, propietat, valor) {    if (propietat \=== 'edat') {      if (typeof valor \!== 'number' || valor \< 0 || valor \> 150) {        throw new Error(\`Edat invàlida: ${valor}\`);      }    }    if (propietat \=== 'email') {      if (\!valor.includes('@')) {        throw new Error(\`Email invàlid: ${valor}\`);      }    }    objecte\[propietat\] \= valor;    return true;  }});usuariValidat.nom \= 'Anna';    // ✅usuariValidat.edat \= 25;       // ✅// usuariValidat.edat \= \-5;   // ❌ Error: Edat invàlida// usuariValidat.email \= 'anna';  // ❌ Error: Email invàlid |
| :---- |

**3\. Patrons de comportament: com es comuniquen els objectes**

### **Observer: notificació automàtica de canvis**

El patró Observer defineix una dependència d'un a molts entre objectes de manera que quan un objecte canvia d'estat, tots els seus dependents són notificats i actualitzats automàticament. 

Aquest patró és fonamental per a la programació orientada a events i impulsa tot, des dels events del DOM fins a les biblioteques modernes de gestió d'estat. L'EventTarget de JavaScript i l'EventEmitter de Node.js estan construïts al voltant d'aquest patró.

| class EventEmitter {  constructor() {    this.events \= {};  }  on(event, callback) {    if (\!this.events\[event\]) this.events\[event\] \= \[\];    this.events\[event\].push(callback);    // Retorna funció per dessubscriure (neteja de memòria)    return () \=\> this.off(event, callback);  }  off(event, callback) {    this.events\[event\] \= this.events\[event\]      ?.filter(cb \=\> cb \!== callback) ?? \[\];  }  emit(event, data) {    this.events\[event\]?.forEach(cb \=\> cb(data));  }}// Cas pràctic: estat del carret de compraclass CarretCompra extends EventEmitter {  \#productes \= \[\];  afegir(producte) {    this.\#productes.push(producte);    this.emit('afegit', producte);    this.emit('actualitzat', this.resum());  }  eliminar(id) {    this.\#productes \= this.\#productes.filter(p \=\> p.id \!== id);    this.emit('eliminat', id);    this.emit('actualitzat', this.resum());  }  resum() {    return {      quantitat: this.\#productes.length,      total: this.\#productes.reduce((s, p) \=\> s \+ p.preu, 0),    };  }}const carret \= new CarretCompra();// Observers: reaccionen als canvis sense acoblamentconst dessubscriure \= carret.on('actualitzat', ({ quantitat, total }) \=\> {  document.querySelector('\#carret-total').textContent \= \`${total}€\`;  document.querySelector('\#carret-count').textContent \= quantitat;});carret.on('afegit', producte \=\> {  analytics.track('add\_to\_cart', producte);});carret.afegir({ id: 1, nom: 'Portàtil', preu: 999 });// Tots els observers s'actualitzen automàticament |
| :---- |

### **Strategy: intercanviar algoritmes**

Usa el patró Strategy per a algoritmes intercanviables: quan necessites comportaments flexibles que es poden canviar en temps d'execució. Permet escollir l'algoritme o estratègia adequada basant-se en el context, sense modificar el codi client.

| // Estratègies d'ordenació intercambiablesconst estrategiesOrdenacio \= {  preu: (a, b) \=\> a.preu \- b.preu,  nom: (a, b) \=\> a.nom.localeCompare(b.nom),  popularitat: (a, b) \=\> b.vendes \- a.vendes,};class CatalegProductes {  constructor(productes) {    this.productes \= productes;    this.estrategia \= estrategiesOrdenacio.preu;  }  setEstrategia(nom) {    if (\!estrategiesOrdenacio\[nom\])      throw new Error(\`Estratègia desconeguda: ${nom}\`);    this.estrategia \= estrategiesOrdenacio\[nom\];    return this;  }  ordenar() {    return \[...this.productes\].sort(this.estrategia);  }}const cataleg \= new CatalegProductes(productes);cataleg.setEstrategia('nom').ordenar();        // per nomcataleg.setEstrategia('popularitat').ordenar(); // per popularitat// Sense modificar cap línia de la lògica del catàleg |
| :---- |

**Combinar patrons: el sistema de logging**

Un exemple de combinar patrons: Observer \+ Singleton \+ Factory per a un sistema de logging. La Factory crea entrades de log, el Singleton assegura una sola instància del logger, i l'Observer notifica tots els handlers registrats.

| class EntradaLogFactory {  static crear(missatge, nivell) {    return { missatge, nivell, timestamp: new Date().toISOString() };  }}class Logger {  constructor() {    if (Logger.instancia) return Logger.instancia;    this.observers \= \[\];    Logger.instancia \= this;  }  static getInstance() { return new Logger(); }  adjuntar(observer) { this.observers.push(observer); }  log(missatge, nivell \= 'INFO') {    const entrada \= EntradaLogFactory.crear(missatge, nivell);    this.observers.forEach(obs \=\> obs.actualitzar(entrada));  }}class ConsoleObserver {  actualitzar({ nivell, missatge, timestamp }) {    console.log(\`\[${timestamp}\] \[${nivell}\] ${missatge}\`);  }}class FileObserver {  actualitzar(entrada) { /\* escriure al fitxer \*/ }}const logger \= Logger.getInstance();logger.adjuntar(new ConsoleObserver());logger.adjuntar(new FileObserver());logger.log('Sistema iniciat', 'INFO');logger.log('Error de connexió', 'ERROR'); |
| :---- |

**Quan usar cada patró**

Tria patrons basant-te en el teu problema: usa Singleton per a l'estat global, Factory per a la creació complexa d'objectes, Observer per a sistemes orientats a events, Strategy per a algoritmes intercanviables, Proxy per a validació o reactivitat, i Command per a funcionalitat undo/redo. Comença simple i afegeix patrons únicament quan resolen un problema real.

| Problema | Patró recomanat |
| ----- | ----- |
| Necessito exactament una instància d'una classe | Singleton |
| La creació d'objectes és complexa o variable | Factory |
| Vull notificar múltiples components de canvis | Observer |
| Necessito intercanviar algoritmes en temps d'execució | Strategy |
| Vull afegir comportament sense modificar la classe | Decorator |
| Necessito controlar l'accés a un objecte | Proxy |
| Vull desfer/refer accions | Command |

