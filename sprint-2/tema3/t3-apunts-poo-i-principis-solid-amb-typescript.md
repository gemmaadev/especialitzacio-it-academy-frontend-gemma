## **Apunts T3 — Programació Orientada a Objectes i Principis SOLID amb TypeScript**

**1\. Conceptes base: classe, objecte i instanciació**

La POO organitza el codi al voltant d'**objectes** que combinen dades (propietats) i comportaments (mètodes). 

L'objectiu principal és unir les dades i les funcions que operen sobre elles de manera que cap altra part del codi pugui accedir a aquestes dades excepte aquella funció.

* **Classe** — la plantilla.   
* **Objecte** — una instància concreta.   
* **Instanciació** — el procés de crear un objecte amb `new`.

TypeScript afegeix type safety a les classes: modificadors d'accés, `readonly`, generics i `implements` que el compilador verifica en temps de compilació.

**2\. Els quatre pilars de la POO**

### **Encapsulació**

Restringeix l'accés directe a les dades internes, exposant únicament el que és necessari a través d'una interfície pública controlada.

```typescript
class CompteBancari {
  private _saldo: number = 0;      // privat: no modificable directament
  readonly titular: string;        // immutable un cop creat

  constructor(titular: string) { this.titular = titular; }

  get saldo(): number { return this._saldo; }  // accés controlat de lectura

  ingressar(quantitat: number): void {
    if (quantitat <= 0) throw new Error('Quantitat invàlida');
    this._saldo += quantitat;
  }
}
// compte._saldo = -9999;  // ❌ Error: _saldo is private
```

**Modificadors d'accés:** `public` (per defecte, accessible des de qualsevol lloc), `private` (únicament la classe), `protected` (la classe i subclasses), `readonly` (assignable únicament al constructor).

**Parameter Properties** — shorthand que declara i assigna en una sola línia:

```typescript
class Producte {
  constructor(
    private nom: string,     // ← declara i assigna automàticament
    readonly preu: number,   // ← idem
    protected stock: number  // ← idem
  ) {}
}
```

**Herència**

Permet que una classe fill hereti propietats i mètodes d'una classe pare, promovent la reutilització del codi.

```typescript
class Animal {
  constructor(protected nom: string) {}
  moure(dist: number): void { console.log(`${this.nom} s'ha mogut ${dist}m`); }
}

class Gos extends Animal {
  constructor(nom: string, private raca: string) {
    super(nom);  // ← OBLIGATORI cridar super() primer
  }

  override moure(dist: number): void {  // 'override' explícit recomanat
    console.log('Corrent...');
    super.moure(dist);   // ← crida el mètode del pare
  }

  bordar(): void { console.log(`${this.nom} diu: Guau!`); }
}
```

**Polimorfisme**

La mateixa interfície, comportaments totalment diferents depenent del tipus concret. Elimina els `switch/if-else` per tipus.

```typescript
interface FormaPagament {
  processar(quantitat: number): Promise<boolean>;
  descripcio(): string;
}

class Targeta implements FormaPagament {
  async processar(q: number) { return true; }
  descripcio() { return 'Targeta de crèdit'; }
}

class PayPal implements FormaPagament {
  async processar(q: number) { return true; }
  descripcio() { return 'PayPal'; }
}

// La mateixa funció funciona amb qualsevol implementació
async function cobrar(metode: FormaPagament, total: number) {
  await metode.processar(total);  // ← polimorfisme: quin metode? no importa
}
```
**Abstracció**

Amaga la complexitat interna, exposant únicament la interfície senzilla necessària. En TypeScript: classes abstractes \+ interfícies.

```typescript
abstract class NotificacioBase {
  // Mètode concret: lògica compartida per totes les subclasses
  async notificar(destinatari: string, missatge: string): Promise<void> {
    console.log(`[${new Date().toISOString()}] Enviant a ${destinatari}...`);
    await this.enviar(destinatari, missatge);  // ← delega al mètode abstracte
  }

  // Mètode abstracte: cada subclasse defineix el "com"
  abstract enviar(destinatari: string, missatge: string): Promise<void>;
}

class NotificacioEmail extends NotificacioBase {
  async enviar(dest: string, msg: string): Promise<void> {
    // lògica SMTP complexa amagada aquí
  }
}
// new NotificacioBase();  // ❌ Cannot create an instance of an abstract class
```

**3\. Interfícies vs. Classes abstractes**

Imagina nivells de realitat: interfícies/types \= el menys real (defineix el 'quèés'). Classes abstractes \= punt mig (pot definir part del 'com', però no es pot crear). Classes concretes \= completament real, defineix el 'com'.

```typescript
// Interfície: contracte pur, zero JavaScript generat, múltiple implements
interface Repositori<T> {
  guardar(entitat: T): Promise<T>;
  trobarPerId(id: number): Promise<T | null>;
}

// Classe abstracta: contracte + implementació parcial
abstract class ServeiBase {
  protected readonly logger = new Logger();

  abstract processar(): Promise<void>;  // les subclasses l'implementen

  // Mètode concret: shared entre totes les subclasses
  registrar(msg: string): void { this.logger.log(msg); }
}
```

 |  | Interfície | Classe Abstracta |
| ----- | ----- | ----- |
| Implementació | ❌ Cap | ✅ Parcial |
| Múltiple herència | ✅ `implements A, B, C` | ❌ `extends` únicament una |
| JavaScript generat | ❌ Cap (desapareix) | ✅ Codi real |
| Constructor | ❌ | ✅ |
| Modificadors d'accés | ❌ Tot públic | ✅ `private`, `protected` |
| Ideal per a | Contractes purs, DIP, APIs | Comportament compartit, Template Method |
 

**Regla:** quan necessites un contracte opta per interfície; quan necessites definir comportament comú opta per classe abstracta.

**4\. Els cinc principis SOLID**

### **S — Single Responsibility Principle**

Una classe hauria de tenir una i únicament una raó per canviar.

```typescript
// ❌ Una classe fa tres coses → tres raons per canviar
class GestorUsuari {
  guardarBD(u: Usuari) { }
  enviarEmail(email: string) { }
  generarInforme(usuaris: Usuari[]) { }
}

// ✅ Cada classe fa una sola cosa
class RepositoriUsuari { guardar(u: Usuari): Promise<Usuari> { } }
class NotificadorUsuari { enviarBenvinguda(email: string): Promise<void> { } }
class InformeUsuaris { generar(usuaris: Usuari[]): string { } }
```

**O — Open/Closed Principle**

Obert per a l'extensió, tancat per a la modificació.

```typescript
// ❌ Cada nou tipus → modificar el codi existent
class Descompte {
  calcular(preu: number, tipus: string) {
    if (tipus === 'premium') return preu * 0.9;
    if (tipus === 'gold') return preu * 0.8;
    // Afegir 'platinum' → modificar aquí → risc regressions
  }
}

// ✅ Nous tipus → noves classes, codi existent intacte
interface EstrategiaDescompte { calcular(preu: number): number; }
class DescomptePremium implements EstrategiaDescompte { calcular(p: number) { return p * 0.9; } }
class DescompteGold implements EstrategiaDescompte { calcular(p: number) { return p * 0.8; } }
class DescomptePlatinum implements EstrategiaDescompte { calcular(p: number) { return p * 0.7; } }
// Afegir nous tipus → zero canvis al codi existent
```

**L — Liskov Substitution Principle**

Les subclasses han de poder substituir el tipus base sense trencar el comportament.

```typescript
// ❌ LSP violat: Pingui trenca el contracte d'Ocell
class Ocell { volar(): void { } }
class Pingui extends Ocell {
  volar(): void { throw new Error('No puc volar!'); }  // ← trenca el contracte
}

// ✅ LSP respectat: separa les capacitats en interfícies específiques
interface Volador { volar(): void; }
interface Nedador { nedar(): void; }
class Aliga implements Volador { volar() { console.log('Volant!'); } }
class Pingui implements Nedador { nedar() { console.log('Nedant!'); } }
```

**I — Interface Segregation Principle**

Interfícies petites i específiques. Cap client forçat a dependre d'interfícies que no usa.

```typescript
// ❌ Interfície "mega": les classes implementen mètodes que no necessiten
interface Treballador {
  treballar(): void; menjar(): void; dormir(): void; programar(): void;
}

// ✅ Interfícies petites i específiques
interface Treballable { treballar(): void; }
interface Programable { programar(): void; }
interface Mengeable { menjar(): void; }

class HumaDev implements Treballable, Programable, Mengeable {
  treballar() { } programar() { } menjar() { }
}
class Robot implements Treballable, Programable {
  treballar() { } programar() { }
  // No implementa menjar() → completament correcte
}
```

**D — Dependency Inversion Principle**

Els mòduls d'alt nivell no han de dependre dels de baix nivell. Tots dos han de dependre d'abstraccions.

```typescript
// ❌ DIP violat: ServeiUsuari depèn directament de MySQL
class ServeiUsuari {
  private db = new MySQLDatabase();  // acoblament fort → no testable
}

// ✅ DIP + DI: tots dos depenen de l'abstracció
interface BaseDeDades { guardar<T>(e: T): Promise<T>; }

class ServeiUsuari {
  constructor(private db: BaseDeDades) {}  // ← rep la dependència injectada
  async registrar(u: Usuari): Promise<void> { await this.db.guardar(u); }
}

// Producció: implementació real
const servei = new ServeiUsuari(new MySQLDatabase());
// Testing: mock → zero infraestructura real
const serveiTest = new ServeiUsuari({ guardar: jest.fn() });
```

**5\. DIP vs. DI vs. IoC: la distinció de Fowler**

Martin Fowler va nomenar el patró Dependency Injection el 2004 per diferenciar-lo del terme més genèric Inversion of Control.

* **IoC** — el principi ampli: "el framework crida el teu codi, no al revés" (Hollywood Principle).  
* **DIP** — el principi SOLID de Robert C. Martin: depèn d'abstraccions, no d'implementacions.  
* **DI** — el patró d'implementació (Fowler): les dependències es passen des de fora, no es creen internament. La idea bàsica és tenir un objecte separat, un assembler, que popula els camps amb la implementació apropiada.

Les tres formes de DI: **Constructor Injection** (recomanada: dependències explícites i obligatòries), **Setter Injection** (dependències opcionals, canviables en runtime) i **Interface Injection** (menys comú).

```typescript
// Les tres formes de DI
// Constructor: les dependències son visibles i obligatòries
class A { constructor(private dep: InterficieDep) {} }

// Setter: opcional
class B { private dep!: InterficieDep; setDep(d: InterficieDep) { this.dep = d; } }

// Method: per crida específica
class C { fer(dep: InterficieDep): void { dep.acció(); } }
```

**Service Locator** — l'alternativa inferior a DI. La classe cerca activament les dependències. Fowler: la diferència clau és que amb un Service Locator cada usuari d'un servei té una dependència al locator. Amb DI, pots simplement mirar el constructor i veure les dependències.

**6\. Beneficis SOLID a llarg termini**

* **Mantenibilitat** — els canvis en un mòdul tenen impacte mínim en altres mòduls. Canviar de MySQL a PostgreSQL afecta únicament la implementació concreta, mai el codi de negoci.  
* **Escalabilitat** — afegir nous tipus de pagament, notificació o persistència significa únicament noves classes. El sistema existent resta intacte gràcies a OCP.  
* **Testeabilitat** — DIP \+ DI permeten injectar mocks. Tests en mil·lisegons sense bases de dades ni SMTP reals.  
* **Reducció del Deute Tècnic** — un estudi real a ASML va aplicar refactoring SOLID sobre 5.000 fitxers per pagar 20 anys de deute tècnic arquitectural.  
* **Col·laboració en equip** — SOLID dóna un vocabulari comú: "Això viola el SRP". Les revisions de codi es tornen objectives.

**7\. Composició vs. Herència**

**Composició** ("té un") sovint és preferible a l'herència ("és un"). Un cotxe no hereta d'un motor: té un motor. La composició és més flexible i menys fràgil.

```typescript
// Herència: fràgil si la jerarquia és profunda
class VehicleEscola extends Cotxe extends Vehicle {}  // ← cadena fràgil

// Composició: flexible i desacoblada
class Cotxe {
  constructor(
    private motor: Motor,   // "té un" Motor
    private gps: GPS        // "té un" GPS
  ) {}
  arrancar() { this.motor.arrancar(); }
  navegar(dest: string) { this.gps.navegarA(dest); }
}
```

**8\. Clean Code aplicat a Classes (Robert C. Martin)**

Les classes haurien de ser petites i adherir-se al SRP. Una classe amb múltiples responsabilitats sovint és massa gran i s'hauria de refactoritzar. El nom de la classe hauria de reflectir les seves responsabilitats.

Organització interna recomanada: constants estàtiques públiques → variables estàtiques privades → variables d'instància privades → constructor → mètodes públics → mètodes privats (detalls al final).

Per gestionar el canvi, s'haurien d'utilitzar interfícies i classes abstractes per minimitzar dependències directes en implementacions concretes.

**El mapa del tema**

```html
POO en TypeScript  
  ├── Classe, Objecte, Instanciació  
  ├── Encapsulació (private, protected, readonly, getters/setters)  
  ├── Herència (extends, super, override)  
  ├── Polimorfisme (interfície → múltiples implementacions)  
  └── Abstracció (abstract class \+ interfícies)

Eines TypeScript per a POO  
  ├── Modificadors d'accés (public, private, protected, readonly)  
  ├── Parameter Properties (shorthand constructor)  
  ├── Classes abstractes (implements Template Method)  
  ├── Interfícies (contracte pur, zero JavaScript generat)  
  ├── Generics en classes (\<T\>)  
  └── Static members (pertanyen a la classe, no a la instància)

Principis SOLID  
  ├── SRP → una classe, una raó per canviar  
  ├── OCP → estendre sense modificar (Strategy Pattern)  
  ├── LSP → subclasses intercanviables (no trenquen el contracte)  
  ├── ISP → interfícies petites i específiques  
  └── DIP → depèn d'abstraccions \+ DI via constructor

Fowler: IoC → DIP → DI (Constructor | Setter | Method Injection)
```

