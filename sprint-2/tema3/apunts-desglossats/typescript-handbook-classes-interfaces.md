## **Classes i Interfícies a TypeScript: Guia del Handbook Oficial**

###### **TypeScript Handbook: Classes**

Documentació oficial de TypeScript sobre la definició i ús de classes.  
[https://www.typescriptlang.org/docs/handbook/classes.html](https://www.typescriptlang.org/docs/handbook/classes.html)

###### **TypeScript Handbook: Interfaces**

[https://www.typescriptlang.org/docs/handbook/interfaces.html](https://www.typescriptlang.org/docs/handbook/interfaces.html)  
Guia oficial de TypeScript per treballar amb interfícies i tipar contractes.

**Classes: la sintaxi essencial**

Hi ha tres modificadors principals de visibilitat en TypeScript: `public` (per defecte) permet l'accés al membre de classe des de qualsevol lloc, `private` únicament permet l'accés al membre de classe des de dins de la classe, i `protected` permet l'accés al membre de classe des d'ella mateixa i qualsevol classe que en hereti.

| class Persona {  // Camps: propietats de la instància  public nom: string;  private \_edat: number;  protected email: string;  readonly id: number;  constructor(nom: string, edat: number, email: string) {    this.nom \= nom;    this.\_edat \= edat;    this.email \= email;    this.id \= Date.now();  // readonly: únicament assignable al constructor  }  // Getter/Setter: accés controlat  get edat(): number { return this.\_edat; }  set edat(valor: number) {    if (valor \< 0) throw new Error('Edat invàlida');    this.\_edat \= valor;  }  // Mètode  saludar(): string {    return \`Hola, soc ${this.nom}\`;  }} |
| :---- |

**Parameter Properties: el shorthand del constructor**

TypeScript ofereix sintaxi especial per convertir un paràmetre del constructor en una propietat de classe amb el mateix nom i valor. Aquestes s'anomenen parameter properties i es creen prefixant un argument del constructor amb un dels modificadors de visibilitat public, private, protected o readonly.

| // ❌ Forma llarga: declara i assigna per separatclass Cotxe {  private marca: string;  protected model: string;  readonly any: number;  constructor(marca: string, model: string, any: number) {    this.marca \= marca;    this.model \= model;    this.any \= any;  }}// ✅ Parameter Properties: declara i assigna en una sola líniaclass Cotxe {  constructor(    private marca: string,      // ← declara i assigna automàticament    protected model: string,    // ← idem    readonly any: number        // ← idem  ) {}  // Totes les propietats ja estan disponibles: this.marca, this.model, this.any} |
| :---- |

**Herència: `extends` i `super`**

L'herència segueix la relació "és un" (is-a): un gos és un animal, per tant té sentit que Dog estengui Animal.

| class Animal {  constructor(protected nom: string) {}  moure(distancia: number \= 0): void {    console.log(\`${this.nom} s'ha mogut ${distancia}m\`);  }}class Serp extends Animal {  constructor(nom: string) {    super(nom);  // ← OBLIGATORI cridar super() abans de usar 'this'  }  // Override amb 'override' (recomanat: activa errors si el pare no existeix)  override moure(distancia: number \= 5): void {    console.log('Reptant...');    super.moure(distancia);  // ← crida el mètode del pare  }}class Cavall extends Animal {  override moure(distancia: number \= 45): void {    console.log('Galoppant...');    super.moure(distancia);  }}const serp \= new Serp('Kaa');const cavall \= new Cavall('Silver');serp.moure(10);   // "Reptant... Kaa s'ha mogut 10m"cavall.moure();   // "Galoppant... Silver s'ha mogut 45m" |
| :---- |

Per defecte la paraula clau `override` és opcional quan es sobreescriu un mètode, i únicament ajuda a prevenir sobreescriure accidentalment un mètode que no existeix. Usa el setting `noImplicitOverride` per forçar el seu ús.

**Classes abstractes**

Les classes abstractes no es poden instanciar directament, ja que no tenen tots els membres implementats.

Les classes abstractes s'usen en TypeScript principalment per a l'herència; proporcionen una manera de definir propietats i mètodes comuns que poden ser heretats per subclasses. Proporcionen una manera de crear una jerarquia de classes on la classe base abstracta proporciona una interfície compartida i funcionalitat comú per a les subclasses.

| abstract class Forma {  // Mètode concret: implementació real compartida per totes les subclasses  descriure(): string {    return \`Soc una forma amb àrea ${this.calcularArea().toFixed(2)}\`;  }  // Mètode abstracte: cada subclasse OBLIGATÒRIAMENT l'ha d'implementar  abstract calcularArea(): number;  abstract calcularPerimetre(): number;}class Cercle extends Forma {  constructor(private radi: number) { super(); }  calcularArea(): number { return Math.PI \* this.radi \*\* 2; }  calcularPerimetre(): number { return 2 \* Math.PI \* this.radi; }}class Quadrat extends Forma {  constructor(private costat: number) { super(); }  calcularArea(): number { return this.costat \*\* 2; }  calcularPerimetre(): number { return 4 \* this.costat; }}// const forma \= new Forma();  // ❌ Error: Cannot create an instance of an abstract classconst cercle \= new Cercle(5);console.log(cercle.descriure());  // ✅ usa el mètode concret del pare |
| :---- |

**Membres estàtics: `static`**

Els membres estàtics pertanyen a la classe mateixa, no a les seves instàncies. Son útils per a funcions utilitàries o dades compartides que no depenen de l'estat d'una instància.

| class Comptador {  private static \_instancies: number \= 0;  // compartida per TOTES les instàncies  constructor(public nom: string) {    Comptador.\_instancies++;  }  // Mètode estàtic: accessible sense instanciar  static obtenirTotal(): number {    return Comptador.\_instancies;  }  // Mètode d'instància: accessible via una instància concreta  saludar(): string {    return \`Soc ${this.nom}, instància \#${Comptador.\_instancies}\`;  }}const a \= new Comptador('Anna');const b \= new Comptador('Gema');console.log(Comptador.obtenirTotal()); // ← accés estàtic: 2console.log(a.saludar());              // ← accés via instància// Comptador.\_instancies  // ❌ Error: private |
| :---- |

**Generics en classes**

TypeScript permet classes genèriques amb paràmetres de tipus passats a la definició de la classe exterior. Normalment, els paràmetres de tipus de les classes genèriques s'accepten com a paràmetres del constructor, però també es poden passar a camps, mètodes i accessors.

| // Classe genèrica: funciona per a qualsevol tipus Tclass Repositori\<T extends { id: number }\> {  private elements: Map\<number, T\> \= new Map();  guardar(entitat: T): T {    this.elements.set(entitat.id, entitat);    return entitat;  }  trobarPerId(id: number): T | undefined {    return this.elements.get(id);  }  trobarTots(): T\[\] {    return Array.from(this.elements.values());  }  eliminar(id: number): boolean {    return this.elements.delete(id);  }}// Ús tipat completinterface Usuari { id: number; nom: string; email: string; }interface Producte { id: number; nom: string; preu: number; }const repoUsuaris \= new Repositori\<Usuari\>();const repoProductes \= new Repositori\<Producte\>();repoUsuaris.guardar({ id: 1, nom: 'Anna', email: 'anna@e.com' });const anna \= repoUsuaris.trobarPerId(1);anna?.nom;  // ✅ TypeScript sap que és Usuari |
| :---- |

**Interfícies i classes: `implements`**

Una sola classe TypeScript pot implementar múltiples interfícies, quelcom que es fa amb la paraula clau `implements`.

| interface Printable {  imprimir(): void;  obtenirContingut(): string;}interface Serialitzable {  aJSON(): string;  desJSON(json: string): void;}interface Loggable {  registrar(missatge: string): void;}// Implementació de múltiples interfíciesclass Document implements Printable, Serialitzable, Loggable {  private contingut: string;  private autor: string;  constructor(contingut: string, autor: string) {    this.contingut \= contingut;    this.autor \= autor;  }  // Implementació de Printable  imprimir(): void { console.log(this.obtenirContingut()); }  obtenirContingut(): string { return \`\[${this.autor}\]: ${this.contingut}\`; }  // Implementació de Serialitzable  aJSON(): string { return JSON.stringify({ contingut: this.contingut, autor: this.autor }); }  desJSON(json: string): void {    const dades \= JSON.parse(json);    this.contingut \= dades.contingut;    this.autor \= dades.autor;  }  // Implementació de Loggable  registrar(missatge: string): void { console.log(\`\[LOG\] ${missatge}\`); }  // Mètode propi (no a cap interfície)  obtenirAutor(): string { return this.autor; }} |
| :---- |

**Constructors privats i protegits**

Els constructors privats únicament poden ser cridats des de dins de la classe mateixa. Els constructors protegits son útils quan vols crear una classe base que no s'hauria d'instanciar directament però que pot ser estesa per subclasses.

| // Constructor privat: patró Singletonclass Configuracio {  private static instancia: Configuracio;  private readonly apiUrl: string;  private constructor() {         // ← private: ningú pot fer new Configuracio()    this.apiUrl \= process.env.API\_URL || 'http://localhost:3000';  }  static getInstance(): Configuracio {    if (\!Configuracio.instancia) {      Configuracio.instancia \= new Configuracio();    }    return Configuracio.instancia;  }  getApiUrl(): string { return this.apiUrl; }}const config \= Configuracio.getInstance();  // ✅ únic punt d'accés// new Configuracio();                      // ❌ Error: constructor is private |
| :---- |

**La referència ràpida de classes TypeScript**

| Concepte | Sintaxi | Descripció |
| ----- | ----- | ----- |
| Declaració | `class Nom { }` | Definir una classe |
| Constructor | `constructor(param: Tipus)` | Inicialitzar la instància |
| Parameter Property | `constructor(private x: Tipus)` | Shorthand declara+assigna |
| Camps | `private x: Tipus = valor` | Propietats de la instància |
| `readonly` | `readonly id: number` | Assignable únicament al constructor |
| Getters/Setters | `get x()` / `set x(v)` | Accés controlat |
| Herència | `class Filla extends Pare` | Heretar propietats i mètodes |
| `super()` | `super(arg)` | Cridar el constructor del pare |
| `override` | `override moure()` | Sobreescriure explícitament |
| Abstracta | `abstract class Nom` | No instanciable, té mètodes abstractes |
| Mètode abstracte | `abstract fer(): void` | Sense implementació, obligatori als fills |
| Estàtic | `static comptador: number` | Pertany a la classe, no a la instància |
| Implements | `class X implements I, J` | Complir múltiples contractes |
| Genèrica | `class Repo<T>` | Tipus flexible parametritzat |

