## **Programació Orientada a Objectes (POO): Conceptes Fonamentals**

###### **Object-Oriented Programming**

[https://en.wikipedia.org/wiki/Object-oriented\_programming](https://en.wikipedia.org/wiki/Object-oriented_programming)   
Article enciclopèdic que descriu els conceptes fonamentals de la programació orientada a objectes.

**Què és la POO i per què existeix**

Com el nom suggereix, la Programació Orientada a Objectes fa referència a llenguatges que usen objectes en programació. 

La programació orientada a objectes té com a objectiu implementar entitats del món real com herència, encapsulació, polimorfisme, etc. en programació. L'objectiu principal de la POO és unir les dades i les funcions que operen sobre elles de manera que cap altra part del codi pugui accedir a aquestes dades excepte aquella funció.

La POO va sorgir com a resposta als problemes del codi procedimental: en projectes grans, les dades i les funcions que les manipulen estaven separades i disperses. La POO organitza el codi en unitats coherents que combinen dades i comportament.

La POO pot ser moltes coses depenent de la perspectiva: la POO és un paradigma —en el sentit més ampli, defineix una col·lecció d'idees sobre com escriure millor codi que pot incloure els principis SOLID, DDD (domain-driven design), i molt més.

**Els conceptes bàsics: classe, objecte i instanciació**

**Classe** — la plantilla o plànol que defineix les propietats i comportaments. No és un objecte en si: és la definició de com serà un objecte.

**Objecte** — una instància concreta d'una classe. Si `Cotxe` és la classe, el teu cotxe blau aparcant al carrer és un objecte.

**Instanciació** — el procés de crear un objecte a partir d'una classe.

| // Classe: la plantillaclass Cotxe {  // Propietats: les dades de l'objecte  marca: string;  model: string;  velocitat: number \= 0;  // Constructor: inicialitza l'objecte  constructor(marca: string, model: string) {    this.marca \= marca;    this.model \= model;  }  // Mètodes: els comportaments de l'objecte  accelerar(increment: number): void {    this.velocitat \+= increment;    console.log(\`${this.marca} ${this.model}: ${this.velocitat} km/h\`);  }  frenar(): void {    this.velocitat \= 0;  }}// Instanciació: crear objectes a partir de la classeconst cotxeAnna \= new Cotxe('Toyota', 'Corolla');  // objecte 1const cotxeGema \= new Cotxe('Honda', 'Civic');      // objecte 2cotxeAnna.accelerar(60);  // Toyota Corolla: 60 km/hcotxeGema.accelerar(80);  // Honda Civic: 80 km/h// Cada objecte manté el seu propi estat independent |
| :---- |

**Pilar 1: Encapsulació**

L'encapsulació és com posar un cadenat a la caixa on s'emmagatzemen les teves dades i únicament donar accés a través d'una clau controlada (mètodes getter i setter). 

Permet amagar els detalls interns d'un objecte i únicament exposar el que és necessari al món exterior. Protegeix les teves dades d'accés i canvis no autoritzats.

L'encapsulació és el procés d'embolicar dades i mètodes en una sola unitat, normalment una classe, i restringir l'accés directe a les dades. Actua com un escut protector que impedeix que les dades siguin accedides directament des de fora de la classe.

| class CompteBancari {  private \_saldo: number \= 0;   // privat: no accessible directament  private \_iban: string;  constructor(iban: string, saldoInicial: number \= 0\) {    this.\_iban \= iban;    this.\_saldo \= saldoInicial;  }  // Getter: accés controlat de lectura  get saldo(): number { return this.\_saldo; }  // Mètodes públics: la interfície controlada  ingressar(quantitat: number): void {    if (quantitat \<= 0) throw new Error('Quantitat invàlida');    this.\_saldo \+= quantitat;  }  retirar(quantitat: number): void {    if (quantitat \> this.\_saldo) throw new Error('Saldo insuficient');    this.\_saldo \-= quantitat;  }}const compte \= new CompteBancari('ES12345', 1000);compte.ingressar(500);console.log(compte.saldo);    // ✅ 1500 (via getter)// compte.\_saldo \= \-9999;     // ❌ Error: \_saldo is private |
| :---- |

**Modificadors d'accés en TypeScript:**

| Modificador | Accessible des de | Descripcio |
| ----- | ----- | ----- |
| `public` | Qualsevol lloc | Per defecte |
| `private` | Únicament la classe | Dades internes |
| `protected` | La classe i subclasses | Per a herència |
| `readonly` | Lectura únicament | No modificable |

**Pilar 2: Herència**

L'herència és un principi fonamental de la POO que promou la reutilització del codi i manté una estructura jeràrquica organitzada. En essència, permet a una classe (el "fill" o "subclasse") heretar els atributs i mètodes d'una altra classe (el "pare" o "superclasse").

Usant l'herència, ens permet construir sobre el treball previ sense reinventar la roda.

| // Superclasse (pare): comportament comúclass Animal {  protected nom: string;  protected edat: number;  constructor(nom: string, edat: number) {    this.nom \= nom;    this.edat \= edat;  }  // Mètode concret: heretat per tots els fills  menjar(): void {    console.log(\`${this.nom} està menjant...\`);  }  // Mètode que els fills poden sobreescriure  ferSoroll(): void {    console.log(\`${this.nom} fa un soroll genèric\`);  }  descripcio(): string {    return \`${this.nom} (${this.edat} anys)\`;  }}// Subclasse (fill): hereta i especialitzaclass Gos extends Animal {  private raca: string;  constructor(nom: string, edat: number, raca: string) {    super(nom, edat);   // ← crida el constructor del pare    this.raca \= raca;  }  // Override: sobreescriu el mètode del pare  ferSoroll(): void {    console.log(\`${this.nom} fa: Guau\! Guau\!\`);  }  // Mètode propi de Gos  buscarOssos(): void {    console.log(\`${this.nom} busca ossos\!\`);  }}class Gat extends Animal {  ferSoroll(): void {    console.log(\`${this.nom} fa: Miau\!\`);  }}const max \= new Gos('Max', 3, 'Golden Retriever');max.menjar();        // heretat d'Animal → "Max està menjant..."max.ferSoroll();     // override → "Max fa: Guau\! Guau\!"max.buscarOssos();   // propi de Gos → "Max busca ossos\!"// instanceof: verificar la jerarquiaconsole.log(max instanceof Gos);    // trueconsole.log(max instanceof Animal); // true (és també un Animal) |
| :---- |

**Pilar 3: Polimorfisme**

El polimorfisme és la capacitat de realitzar moltes coses de moltes maneres. 

La paraula Polimorfisme prové de dues paraules gregues: poly i morphs. "Poly" significa moltes, i "Morphs" significa formes. Per tant, polimorfisme significa moltes formes. 

Les funcions es comporten diferentment basant-se en la implementació real.

Polimorfisme d'interfície: classes diferents poden implementar la mateixa interfície o heretar de la mateixa classe abstracta i proporcionar implementacions diferents per als mètodes de la interfície.

| // Una interfície, moltes implementacionsinterface FormaGeometrica {  calcularArea(): number;  calcularPerimetre(): number;  descripcio(): string;}class Cercle implements FormaGeometrica {  constructor(private radi: number) {}  calcularArea(): number { return Math.PI \* this.radi \*\* 2; }  calcularPerimetre(): number { return 2 \* Math.PI \* this.radi; }  descripcio(): string { return \`Cercle de radi ${this.radi}\`; }}class Rectangle implements FormaGeometrica {  constructor(private amplada: number, private alcada: number) {}  calcularArea(): number { return this.amplada \* this.alcada; }  calcularPerimetre(): number { return 2 \* (this.amplada \+ this.alcada); }  descripcio(): string {    return \`Rectangle ${this.amplada}×${this.alcada}\`;  }}class Triangle implements FormaGeometrica {  constructor(private base: number, private alcada: number, private hipotenusa: number) {}  calcularArea(): number { return (this.base \* this.alcada) / 2; }  calcularPerimetre(): number { return this.base \+ this.alcada \+ this.hipotenusa; }  descripcio(): string { return \`Triangle de base ${this.base}\`; }}// La mateixa funció funciona amb qualsevol FormaGeometrica → polimorfismefunction mostrarInfoForma(forma: FormaGeometrica): void {  console.log(forma.descripcio());  console.log(\`  Àrea: ${forma.calcularArea().toFixed(2)}\`);  console.log(\`  Perímetre: ${forma.calcularPerimetre().toFixed(2)}\`);}const formes: FormaGeometrica\[\] \= \[  new Cercle(5),  new Rectangle(4, 6),  new Triangle(3, 4, 5),\];// La mateixa cridada, comportaments totalment diferents → polimorfismeformes.forEach(mostrarInfoForma); |
| :---- |

**Pilar 4: Abstracció**

L'abstracció crea una "barrera" entre una unitat de codi (normalment una classe) i la resta del codi del sistema. Pren una operació complexa i exposa una interfície pública senzilla perquè el cridant la gestioni. L'abstracció permet als programadors centrar-se en el quèfa un objecte en lloc del comho fa.

En TypeScript, l'abstracció es realitza amb **classes abstractes** (que defineixen estructura amb implementació parcial) i **interfícies** (que defineixen únicament el contracte):

| // Classe abstracta: no es pot instanciar directamentabstract class BaseDeDadesConnector {  // Mètode concret: implementació compartida per totes les BD  protected registrarOperacio(operacio: string): void {    console.log(\`\[${new Date().toISOString()}\] ${operacio}\`);  }  // Mètodes abstractes: cada subclasse defineix la seva implementació  abstract connectar(): Promise\<void\>;  abstract executarQuery\<T\>(sql: string, params?: unknown\[\]): Promise\<T\[\]\>;  abstract tancar(): Promise\<void\>;  // Template Method: algorisme fix que delega els passos abstractes  async executarAmbLog\<T\>(sql: string, params?: unknown\[\]): Promise\<T\[\]\> {    this.registrarOperacio(\`Executant: ${sql}\`);  // concret    const resultat \= await this.executarQuery\<T\>(sql, params);  // abstracte    this.registrarOperacio(\`Completat: ${resultat.length} files\`);  // concret    return resultat;  }}// Implementacions concretesclass MySQLConnector extends BaseDeDadesConnector {  async connectar(): Promise\<void\> { /\* connexió MySQL \*/ }  async executarQuery\<T\>(sql: string): Promise\<T\[\]\> { /\* execució MySQL \*/ return \[\]; }  async tancar(): Promise\<void\> { /\* tancament MySQL \*/ }}class PostgreSQLConnector extends BaseDeDadesConnector {  async connectar(): Promise\<void\> { /\* connexió PostgreSQL \*/ }  async executarQuery\<T\>(sql: string): Promise\<T\[\]\> { /\* execució PostgreSQL \*/ return \[\]; }  async tancar(): Promise\<void\> { /\* tancament PostgreSQL \*/ }} |
| :---- |

**Conceptes addicionals: composició i herència múltiple**

**Composició vs. Herència** — la composició ("té un") és sovint preferible a l'herència ("és un"). Un cotxe no hereta d'un motor; té un motor. La composició és més flexible i menys fràgil que la herència profunda.

| // Composició: classes simples combinades en classes més complexesclass Motor {  private cv: number;  constructor(cv: number) { this.cv \= cv; }  arrancar(): void { console.log(\`Motor de ${this.cv} CV arrancat\`); }}class GPS {  navegarA(destí: string): void { console.log(\`Navegant a ${destí}\`); }}class Cotxe {  private motor: Motor;        // "té un" Motor (composició)  private gps: GPS;            // "té un" GPS (composició)  constructor(cv: number) {    this.motor \= new Motor(cv);    this.gps \= new GPS();  }  arrancar(): void { this.motor.arrancar(); }  navegar(destí: string): void { this.gps.navegarA(destí); }} |
| :---- |

**Herència múltiple via interfícies** — TypeScript no permet extends de múltiples classes però sí implementar múltiples interfícies:

| interface Volador { volar(): void; }interface Nedador { nedar(): void; }// Implementa múltiples comportaments sense herència múltipleclass Anec implements Volador, Nedador {  volar(): void { console.log('L\\'anec vola\!'); }  nedar(): void { console.log('L\\'anec neda\!'); }} |
| :---- |

**Overloading vs. Overriding**

| Concepte | Definició | On passa |
| ----- | ----- | ----- |
| **Overriding** | Una subclasse sobreescriu un mètode del pare | En herència (extends) |
| **Overloading** | Múltiples signatures per al mateix mètode | En la mateixa classe |

| // Overriding: subclasse modifica el comportament del pareclass Animal { ferSoroll(): void { console.log('...'); } }class Gos extends Animal {  ferSoroll(): void { console.log('Guau\!'); }  // ← override}// Overloading en TypeScript (via signatures múltiples)class Calculadora {  sumar(a: number, b: number): number;  sumar(a: string, b: string): string;  sumar(a: number | string, b: number | string): number | string {    if (typeof a \=== 'number' && typeof b \=== 'number') return a \+ b;    return \`${a}${b}\`;  }} |
| :---- |

**Per què POO en TypeScript específicament**

TypeScript aporta una capa addicional de seguretat a la POO: les interfícies garanteixen que les classes compleixen els contractes en temps de compilació (no en execució), els modificadors d'accés son verificats pel compilador, i els genèrics permeten components POO reutilitzables mantenint la seguretat de tipus. 

TypeScript és, en essència, el que JavaScript hauria d'haver estat per a la programació orientada a objectes de grans sistemes.

