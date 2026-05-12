## **Els 4 pilars de la POO en TypeScript**

**Per què existeix la Programació Orientada a Objectes**

Les quatre principals de la programació orientada a objectes (abstracció, herència, encapsulació i polimorfisme) son funcionalitats que, si s'usen correctament, poden ajudar-nos a escriure codi més testable, flexible i mantenible.

La POO organitza el codi al voltant d'**objectes** que combinen dades (propietats) i comportaments (mètodes). En lloc d'escriure funcions disperses que operen sobre dades separades, la POO agrupa tot allò que pertany junt en una sola unitat coherent.

**Pilar 1: Encapsulació**

Encapsulació és la pràctica d'agafar dades (atributs) i els mètodes que operen sobre aquelles dades dins d'una sola unitat (classe), mentre es restringeix l'accés directe a alguns dels components de l'objecte. 

Pensa en l'encapsulació com el tauler de control d'un cotxe. No necessites saber com funciona el motor internament: simplement uses el volant, els pedals i els controls. La complexitat s'encapsula darrere d'una interfície simple.

Usant l'encapsulació, les dades internes d'una classe (atributs) i els mètodes es poden ocultar de la interferència exterior, accessibles únicament a través de mètodes coneguts com a getters (accessors) i setters (mutadors). Aquest mecanisme proporciona control sobre la integritat de les dades i prevé modificacions no autoritzades.

TypeScript proporciona els modificadors d'accés `private`, `protected` i `public`, i el camp `#` per a privacitat real en temps d'execució:

| class CompteBancari {  // Propietats privades: només accessibles des de dins la classe  private \_saldo: number \= 0;  private \_numeroConta: string;  readonly titular: string;  // readonly: no es pot modificar un cop creat  constructor(titular: string, numeroConta: string) {    this.titular \= titular;    this.\_numeroConta \= numeroConta;  }  // Getter: accés controlat al saldo (only read)  get saldo(): number {    return this.\_saldo;  }  // Mètodes públics: la interfície amb el món exterior  ingressar(quantitat: number): void {    if (quantitat \<= 0) throw new Error('La quantitat ha de ser positiva');    this.\_saldo \+= quantitat;    console.log(\`Ingrés de ${quantitat}€. Nou saldo: ${this.\_saldo}€\`);  }  retirar(quantitat: number): void {    if (quantitat \> this.\_saldo) throw new Error('Saldo insuficient');    this.\_saldo \-= quantitat;  }  // Mètode privat: detall d'implementació intern, no exposat  private \#calcularComissio(quantitat: number): number {    return quantitat \* 0.001;  }}const compte \= new CompteBancari('Anna García', 'ES1234567890');compte.ingressar(1000);console.log(compte.saldo);        // ✅ 1000 (via getter)// compte.\_saldo \= \-9999;         // ❌ Error: \_saldo is private// compte.\#calcularComissio(100); // ❌ Error: camp privat |
| :---- |

**Pilar 2: Herència**

L'herència deixa que un objecte adquireixi les propietats i mètodes d'un altre objecte. El benefici principal és la reutilitzabilitat. Sabem que de vegades múltiples llocs necessiten fer la mateixa cosa, i han de fer-ho tot igual excepte per una petita part. Aquest és un problema que l'herència pot resoldre. Quan usem herència, intentem fer que el pare i el fill tinguin alta cohesió.

| // Classe base (pare)abstract class Vehicle {  protected velocitat: number \= 0;  constructor(    protected marca: string,    protected model: string,    protected anyFabricacio: number  ) {}  // Mètode compartit per tots els vehicles  accelerar(increment: number): void {    this.velocitat \+= increment;    console.log(\`${this.marca} ${this.model}: ${this.velocitat} km/h\`);  }  frenar(): void {    this.velocitat \= 0;  }  // Mètode abstracte: cada vehicle l'implementa al seu manera  abstract descripcio(): string;}// Classe filla (fill) \-- hereta Vehicle i afegeix comportament propiclass Cotxe extends Vehicle {  private nombrePortes: number;  constructor(marca: string, model: string, any: number, portes: number) {    super(marca, model, any);  // ← crida el constructor del pare    this.nombrePortes \= portes;  }  // Implementa el mètode abstracte del pare  descripcio(): string {    return \`${this.marca} ${this.model} (${this.anyFabricacio}), ${this.nombrePortes} portes\`;  }  // Mètode específic de Cotxe  obriMaleter(): void {    console.log('Maleter obert');  }}class Moto extends Vehicle {  descripcio(): string {    return \`Moto ${this.marca} ${this.model} (${this.anyFabricacio})\`;  }}const cotxe \= new Cotxe('Toyota', 'Corolla', 2023, 4);cotxe.accelerar(60);     // heretat de Vehicle → "Toyota Corolla: 60 km/h"cotxe.obriMaleter();     // específic de Cotxe → "Maleter obert"console.log(cotxe.descripcio()); |
| :---- |

Intenta mantenir les teves cadenes d'herència netes i sensates. Pots acabar fàcilment codificant un antipatró quan uses l'herència (anomenat l'antipatró de la Base Fràgil). 

Això passa on els teus prototips base es consideren "fràgils" perquè fas un canvi "segur" a l'objecte base i llavors comences a trencar tots els teus fills.

**Pilar 3: Polimorfisme**

El polimorfisme significa "la condició d'ocórrer en diverses formes diferents." Aquell és exactament de quèes preocupa el quart i últim pilar: tipus en la mateixa cadena d'herència que poden fer coses diferents. El veritable poder del polimorfisme és compartir comportaments, i permetre overrides personalitzades.

Regla pràctica: els switch statements (condicionals) es poden refactoritzar a polimorfisme. La majoria de vegades, si estem tractant amb tres o més condicionals en un bloc particular (i esperem afegir-ne més condicions), podria ser una bona idea refactoritzar a polimorfisme.

| // Polimorfisme en acció: la mateixa interfície, comportaments diferentsinterface FormaPagament {  processar(quantitat: number): Promise\<boolean\>;  descripcio(): string;}class Targeta implements FormaPagament {  constructor(private numeroTargeta: string) {}  async processar(quantitat: number): Promise\<boolean\> {    console.log(\`Processant ${quantitat}€ per targeta ${this.numeroTargeta}\`);    // lògica real de targeta...    return true;  }  descripcio(): string { return \`Targeta de crèdit (${this.numeroTargeta.slice(-4)})\`; }}class PayPal implements FormaPagament {  constructor(private email: string) {}  async processar(quantitat: number): Promise\<boolean\> {    console.log(\`Processant ${quantitat}€ via PayPal (${this.email})\`);    // lògica real de PayPal...    return true;  }  descripcio(): string { return \`PayPal (${this.email})\`; }}class Transferencia implements FormaPagament {  constructor(private iban: string) {}  async processar(quantitat: number): Promise\<boolean\> {    console.log(\`Processant ${quantitat}€ via transferència a ${this.iban}\`);    return true;  }  descripcio(): string { return \`Transferència bancària (${this.iban})\`; }}// La funció treballa amb qualsevol FormaPagament sense saber quin tipus ésasync function processarComanda(  quantitat: number,  metodePagament: FormaPagament  // ← polimorfisme: accepta qualsevol implementació): Promise\<void\> {  console.log(\`Processant comanda de ${quantitat}€\`);  const exit \= await metodePagament.processar(quantitat);  if (exit) {    console.log(\`✅ Pagament completat via ${metodePagament.descripcio()}\`);  }}// La mateixa funció funciona amb qualsevol mètode de pagamentawait processarComanda(99.99, new Targeta('4111111111111111'));await processarComanda(49.99, new PayPal('anna@exemple.com'));await processarComanda(199.99, new Transferencia('ES1234567890'));// ✅ Afegir un nou mètode de pagament NO requereix canviar processarComanda |
| :---- |

**Pilar 4: Abstracció**

L'abstracció ens deixa centrar-nos selectivament en l'alt nivell i la manera abstracta els detalls de baix nivell. El principi central és l'abstracció. Sense ella, els altres no podrien existir.

L'abstracció és el procés d'amagar els detalls d'implementació i mostrar únicament les funcionalitats essencials d'un objecte. Abstracció defineix el quèfa un objecte (la interfície), Encapsulació protegeix el comho fa (els detalls d'implementació).

En TypeScript, l'abstracció s'implementa amb **classes abstractes** (que defineixen estructura però no implementació completa) i **interfícies** (que defineixen únicament el contracte):

| // Abstracció via classe abstracta: defineix el "quèfar" però no el "comfer-ho"abstract class SistemaNotificacions {  // Mètode abstracte: les subclasses OBLIGATÒRIAMENT l'han d'implementar  abstract enviar(destinatari: string, missatge: string): Promise\<void\>;  // Mètode concret compartit: la lògica comú a totes les notificacions  async notificar(destinatari: string, missatge: string): Promise\<void\> {    console.log(\`\[${new Date().toISOString()}\] Enviant a ${destinatari}...\`);    await this.enviar(destinatari, missatge);  // cada subclasse implementa com    console.log('✅ Notificació enviada');  }}// Cada implementació concreta amaga la seva complexitat internaclass NotificacioEmail extends SistemaNotificacions {  async enviar(destinatari: string, missatge: string): Promise\<void\> {    // Aquí podria estar la configuració de SMTP, headers HTTP, reintentos...    // Tot amagat darrere de la interfície simple    console.log(\`📧 Email → ${destinatari}: ${missatge}\`);  }}class NotificacioSMS extends SistemaNotificacions {  async enviar(destinatari: string, missatge: string): Promise\<void\> {    // Aquí podria estar l'API de Twilio, la gestió de crèdits...    console.log(\`📱 SMS → ${destinatari}: ${missatge}\`);  }}// L'usuari de la classe únicament coneix el mètode "notificar"// No sap res de com funciona internamentconst email \= new NotificacioEmail();await email.notificar('anna@e.com', 'Comanda confirmada\!');const sms \= new NotificacioSMS();await sms.notificar('+34600000000', 'El teu paquet ha sortit\!'); |
| :---- |

**Com s'interrelacionen els quatre pilars**

Abstracció defineix el quèfa un objecte (la interfície). Encapsulació protegeix el comho fa (els detalls d'implementació). Herència habilita la reutilització de codi a través de jerarquies de classes. Polimorfisme permet diferents implementacions de la mateixa interfície.

| ABSTRACCIÓ                    ENCAPSULACIÓ"Quèfa?"                      "Amaga com ho fa"Interfície pública simple  →  Dades privades protegides        ↓                             ↓    HERÈNCIA                   POLIMORFISME"Reutilitza el codi"          "Comportament flexible"Classe filla hereta pare  →   Mateixa crida, resultats diferents |
| :---- |

