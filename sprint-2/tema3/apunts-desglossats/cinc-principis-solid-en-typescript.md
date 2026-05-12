## **Els cinc principis SOLID en TypeScript**

**SOLID Principles**  
[https://www.google.com/search?q=https://www.tutorialspoint.com/solid-principles/index.html](https://www.google.com/search?q=https://www.tutorialspoint.com/solid-principles/index.htm)  
Explicació introductòria dels cinc principis SOLID aplicats al disseny orientat a objectes.

**Introducció: per què SOLID**

SOLID és un conjunt de cinc principis que estableixen un conjunt de bones pràctiques per desenvolupar software que és robust, adaptable, i fàcil de mantenir i estendre a mesura que els projectes evolucionen.

Aquests principis donen a tots un vocabulari compartit: "Això viola el SRP", "Injectem aquesta dependència". Les revisions de codi es tornen objectives i col·laboratives. Amb el temps, l'equip acumula menys deute tècnic.

**S — Single Responsibility Principle (SRP)**

Una classe hauria de tenir una i únicament una raó per canviar.

**L'analogia:** un cuiner que cuina, renta els plats, atén les taules, porta la comptabilitat i fa la compra. Si canvies el menú, el sistema de comptabilitat, o la distribució de taules, tots els canvis afecten la mateixa persona. L'equivalent en codi és una "god class" que fa massa coses.

Els red flags del SRP que detectaràs en code review: classes que barrejen HTTP handlers, lògica de negoci i accés a dades en un sol fitxer, conflictes freqüents al voltant de classes "god" grans, i mètodes amb comentaris com "també fa..."

| // ❌ Viola SRP: GestorUsuari té tres raons per canviarclass GestorUsuari {  guardarBD(usuari: Usuari) { /\* accés a dades \*/ }  enviarEmailBenvinguda(email: string) { /\* comunicació \*/ }  generarInforme(usuaris: Usuari\[\]) { /\* presentació \*/ }}// ✅ Respecta SRP: cada classe té una sola responsabilitatclass RepositoriUsuari {  guardar(usuari: Usuari): Promise\<Usuari\> { /\* únicament accés a dades \*/ }}class NotificadorUsuari {  enviarBenvinguda(email: string): Promise\<void\> { /\* únicament emails \*/ }}class InformeUsuaris {  generar(usuaris: Usuari\[\]): string { /\* únicament presentació \*/ }} |
| :---- |

**O — Open/Closed Principle (OCP)**

Les entitats de software (classes, mòduls, funcions) haurien d'estar obertes per a l'extensió, però tancades per a la modificació. Adherir-se al OCP ajuda a mantenir una codebase estable i extensible.

**L'analogia:** una presa elèctrica. El disseny de la presa no canvia quan afegeixes un nou dispositiu (una làmpada, un carregador, un ordinador). El dispositiu s'adapta a la presa, no al revés.

Afegir un nou mètode de pagament és simplement afegir una nova classe. El sistema existent queda sense tocar — aquesta és l'essència del OCP. S'aconsegueix via polimorfisme i injecció de dependències, habilitant extensió flexible sense modificació arriscada.

| // ❌ Viola OCP: cada nou tipus requereix modificar el codi existentclass CalculadorDesconte {  calcular(preu: number, tipusClient: string): number {    if (tipusClient \=== 'premium') return preu \* 0.9;    if (tipusClient \=== 'gold') return preu \* 0.8;    if (tipusClient \=== 'vip') return preu \* 0.7;    // Afegir 'platinum' → modificar aquesta classe → risc de regressions    return preu;  }}// ✅ Respecta OCP: nous tipus s'afegeixen sense tocar el codi existentinterface EstrategiaDesconte {  calcular(preu: number): number;}class DescontePremium implements EstrategiaDesconte {  calcular(preu: number): number { return preu \* 0.9; }}class DesconteGold implements EstrategiaDesconte {  calcular(preu: number): number { return preu \* 0.8; }}// Nou tipus Platinum → nova classe, zero canvis al codi existentclass DescontePlatinum implements EstrategiaDesconte {  calcular(preu: number): number { return preu \* 0.7; }}class CalculadorDesconte {  calcular(preu: number, estrategia: EstrategiaDesconte): number {    return estrategia.calcular(preu);  // obert per extensió, tancat per modificació  }} |
| :---- |

**L — Liskov Substitution Principle (LSP)**

Els objectes en un programa haurien de poder ser substituïts per instàncies dels seus subtipus sense alterar la correctesa d'aquell programa.

**L'analogia:** si esperes un vehicle per anar a la feina, un cotxe, una moto o una bicicleta haurien de funcionar. Si et donen un submarí, el contracte s'ha trencat: no pots anar per la carretera. Un subclasse no pot "trencar el contracte" del pare.

No tots els ocells poden volar, com demostra la classe Penguin. En forçar Penguin a implementar el mètode fly i llançar una excepció, violem el Principi de Substitució de Liskov. Com que un pingüí és un ocell, esperem que es comporti com qualsevol altre ocell, però cridar fly provoca una excepció, trencant el comportament esperat del programa.

| // ❌ Viola LSP: Pingui no pot substituir Ocell sense trencar el comportamentclass Ocell {  volar(): void { console.log('Volant\!'); }}class Pingui extends Ocell {  volar(): void {    throw new Error('Els pingüins no poden volar\!');  // ← trenca el contracte\!  }}function ferVolarOcell(ocell: Ocell) {  ocell.volar();  // amb Pingui → excepció inesperada\!}// ✅ Respecta LSP: separa les capacitats en interfícies específiquesinterface Animal {  moure(): void;}interface Volador {  volar(): void;}class Aliga implements Animal, Volador {  moure(): void { console.log("Camino"); }  volar(): void { console.log("Volant a gran alçada\!"); }}class Pingui implements Animal {  moure(): void { console.log("Caminant torpement"); }  nedar(): void { console.log("Nedant\!"); }  // No implementa Volador → completament correcte}// Cada classe substitueix les interfícies que implementa sense sorpreses |
| :---- |

Els símptomes de problemes amb el LSP inclouen subclasses que llancen `NotImplemented`, codi client que comprova `instanceof` abans de cridar un mètode, i overrides que debiliten les precondicions o estrany les poscondicions.

**I — Interface Segregation Principle (ISP)**

Cap client hauria de ser forçat a dependre d'interfícies que no usa. Essencialment, és millor tenir moltes interfícies petites i específiques que una sola interfície d'ús general. Promou l'alta cohesió i el baix acoblament.

**L'analogia:** una navalla suïssa amb 20 eines vs. eines especialitzades. Si únicament necessites un ganivet, no hauries d'estar obligat a portar sempre les 19 eines que no uses.

| // ❌ Viola ISP: una sola interfície "mega" que força implementar totinterface Treballador {  treballar(): void;  menjar(): void;  dormir(): void;  programar(): void;  gestionar(): void;}// Un robot pot treballar però no menjar ni dormir: forçat a implementar// mètodes buits o a llançar errors → viola ISP// ✅ Respecta ISP: interfícies petites i específiques per necessitatinterface Treballable {  treballar(): void;}interface Mengeable {  menjar(): void;}interface Programable {  programar(): void;}interface Gestionable {  gestionar(): void;}// Cada classe implementa únicament el que pot fer realmentclass HumaDeveloper implements Treballable, Mengeable, Programable {  treballar(): void { console.log('Treballant...'); }  menjar(): void { console.log('Menjant...'); }  programar(): void { console.log('Programant TypeScript\!'); }}class Robot implements Treballable, Programable {  treballar(): void { console.log('Executant tasques...'); }  programar(): void { console.log('Executant codi...'); }  // No implementa menjar() → correcte\! Els robots no mengen}class Manager implements Treballable, Mengeable, Gestionable {  treballar(): void { console.log('Gestionant l\\'equip...'); }  menjar(): void { console.log('Dinar de negocis...'); }  gestionar(): void { console.log('Revisant PRs...'); }} |
| :---- |

**D — Dependency Inversion Principle (DIP)**

Els mòduls d'alt nivell no haurien de dependre dels mòduls de baix nivell; tots dos haurien de dependre d'abstraccions. Les abstraccions no haurien de dependre dels detalls; els detalls haurien de dependre de les abstraccions.

**L'analogia:** la presa elèctrica de nou. La làmpada (mòdul d'alt nivell) no depèn directament de com genera l'electricitat la central (mòdul de baix nivell). Tots dos depenen del contracte de la presa (l'abstracció: 220V, forma estàndard). Pots canviar la central elèctrica (nuclear, solar, eòlica) sense canviar la làmpada.

En el primer exemple, la classe PasswordReminder depèn directament de la classe MySQLConnection, la qual cosa viola el DIP. En el segon exemple, tant PasswordReminder com MySQLConnection depenen de la interfície DBConnection, que és una abstracció.

| // ❌ Viola DIP: ServeiUsuari depèn directament de MySQL i SendGridclass ServeiUsuari {  private db \= new MySQLDatabase();        // acoblament fort  private mailer \= new SendGridMailer();   // acoblament fort  async registrar(usuari: Usuari): Promise\<void\> {    await this.db.guardar(usuari);    await this.mailer.enviarBenvinguda(usuari.email);    // Per canviar la BD → modificar ServeiUsuari. Per testar → necessites MySQL real\!  }}// ✅ Respecta DIP: tots dos depenen d'abstraccions (interfícies)interface BaseDeDades {  guardar(entitat: object): Promise\<void\>;  trobarPerId(id: number): Promise\<object | null\>;}interface ServeiEmail {  enviarBenvinguda(email: string): Promise\<void\>;}// Mòdul d'alt nivell: depèn d'abstraccions, no d'implementacions concretesclass ServeiUsuari {  constructor(    private db: BaseDeDades,        // rep la dependència injectada    private mailer: ServeiEmail     // rep la dependència injectada  ) {}  async registrar(usuari: Usuari): Promise\<void\> {    await this.db.guardar(usuari);    await this.mailer.enviarBenvinguda(usuari.email);  }}// Mòduls de baix nivell: implementen les abstraccionsclass MySQLDatabase implements BaseDeDades {  async guardar(entitat: object): Promise\<void\> { /\* MySQL \*/ }  async trobarPerId(id: number): Promise\<object | null\> { /\* MySQL \*/ }}class PostgreSQLDatabase implements BaseDeDades {  async guardar(entitat: object): Promise\<void\> { /\* PostgreSQL \*/ }  async trobarPerId(id: number): Promise\<object | null\> { /\* PostgreSQL \*/ }}class SendGridMailer implements ServeiEmail {  async enviarBenvinguda(email: string): Promise\<void\> { /\* SendGrid \*/ }}// Producció: injecta les dependències realsconst servei \= new ServeiUsuari(new MySQLDatabase(), new SendGridMailer());// Tests: injecta mocks → zero dependències externes\!const mockDB: BaseDeDades \= { guardar: jest.fn(), trobarPerId: jest.fn() };const mockMailer: ServeiEmail \= { enviarBenvinguda: jest.fn() };const serveiTest \= new ServeiUsuari(mockDB, mockMailer); |
| :---- |

**La relació entre els cinc principis**

Depenent d'abstraccions (DIP), pots substituir fàcilment diferents implementacions concretes, permetent-te estendre funcionalitat (OCP) sense alterar la lògica central que depèn d'aquelles abstraccions. OCP és un objectiu de disseny, i DIP és un patró potent per aconseguir aquell objectiu.

SRP → cada classe fa una cosa → més fàcil de testar i mantenir  
  ↓  
OCP → s'extén amb noves classes → no es modifica el codi existent  
  ↓  
LSP → les subclasses son intercanviables → polimorfisme fiable  
  ↓  
ISP → interfícies petites → les classes implementen únicament el que necessiten  
  ↓  
DIP → dependències injectades via interfícies → testable i desacoblat

**Resum**  

| Principi | En una frase | Senyal de violació |
| :---- | ----- | ----- |
| **SRP** | Una classe, una raó per canviar | "Aquesta classe també fa..." |
| **OCP** | Extèn sense modificar | Switch statement amb nous cases |
| **LSP** | Les subclasses no trenquen el contracte | `instanceof` per saber el tipus real |
| **ISP** | Interfícies petites i específiques | Mètodes buids o que llancen errors |
| **DIP** | Depèn d'abstraccions, no d'implementacions | `new MySQLDatabase()` dins d'una classe |

