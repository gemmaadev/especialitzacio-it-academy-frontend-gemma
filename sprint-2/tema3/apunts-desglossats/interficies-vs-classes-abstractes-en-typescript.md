## **Interfícies vs. Classes abstractes en TypeScript**

**La diferència fonamental: "Què fa" vs. "Com ho fa (parcialment)"**

Imagina nivells de realitat. Tindries: interfícies/types \= el menys real / teòric (defineix el 'quèés'). Classes abstractes \= punt mig (pot definir part del 'com', però no es pot crear). Classes concretes \= completament real, defineix el 'com'.

En TypeScript, tant les classes abstractes com les interfícies s'usen per dissenyar blueprints per a altres classes, però serveixen propòsits diferents. 

Una classe abstracta és una classe base que no es pot instanciar i pot incloure detalls d'implementació per als seus membres. 

Una interfície, però, és un contracte purament estructural: no conté detalls d'implementació sinó que defineix la sintaxi que qualsevol classe ha de seguir.

**Les Interfícies: el contracte pur**

A diferència de les classes, una interfície és una estructura virtual que únicament existeix dins del context de TypeScript. El compilador de TypeScript usa les interfícies únicament per a la comprovació de tipus. 

Un cop el teu codi es transpila al JavaScript objectiu, s'eliminarà de les seves interfícies. I mentre una classe pot definir una factoria o un singleton proporcionant inicialització a les seves propietats i implementació als seus mètodes, una interfície és simplement un contracte estructural que defineix quines propietats ha de tenir un objecte.

| // Una interfície defineix el contracte: quèha de tenir i poder ferinterface Repositori\<T\> {  trobarPerId(id: number): Promise\<T | null\>;  guardar(entitat: T): Promise\<T\>;  eliminar(id: number): Promise\<void\>;  trobarTots(): Promise\<T\[\]\>;}interface Serialitzable {  serialitzar(): string;  deserialitzar(data: string): void;}// Una classe pot implementar MÚLTIPLES interfíciesclass RepositoriUsuari implements Repositori\<Usuari\>, Serialitzable {  async trobarPerId(id: number): Promise\<Usuari | null\> {    return await db.usuaris.findById(id);  }  async guardar(usuari: Usuari): Promise\<Usuari\> {    return await db.usuaris.save(usuari);  }  async eliminar(id: number): Promise\<void\> {    await db.usuaris.delete(id);  }  async trobarTots(): Promise\<Usuari\[\]\> {    return await db.usuaris.findAll();  }  // De Serialitzable  serialitzar(): string {    return JSON.stringify(this);  }  deserialitzar(data: string): void {    Object.assign(this, JSON.parse(data));  }} |
| :---- |

**Les Classes Abstractes: el contracte amb implementació parcial**

Les classes abstractes son similars a les interfícies, però les usem per proporcionar comportament comú a les subclasses o implementar inversió de control usant el patró de disseny Template Method.

Les classes abstractes son ideals quan vols una base comuna de funcionalitat per a múltiples classes derivades mentre encara exigeixes mètodes específics.

| // Classe abstracta: defineix l'estructura I proporciona implementació parcialabstract class GestorFitxers {  // Propietats compartides per totes les subclasses  protected ruta: string;  private historial: string\[\] \= \[\];  constructor(ruta: string) {    this.ruta \= ruta;  }  // MÈTODES ABSTRACTES: cada subclasse OBLIGATÒRIAMENT els implementa  abstract llegir(): Promise\<string\>;  abstract escriure(contingut: string): Promise\<void\>;  abstract extensioSuportada(): string\[\];  // MÈTODE CONCRET: implementació real compartida per totes les subclasses  registrarAcces(accio: string): void {    const entrada \= \`\[${new Date().toISOString()}\] ${accio}: ${this.ruta}\`;    this.historial.push(entrada);    console.log(entrada);  }  // Template Method: defineix l'algorisme, delega els passos a les subclasses  async processarFitxer(): Promise\<string\> {    this.registrarAcces('Llegint');  // crida al mètode concret compartit    const contingut \= await this.llegir();  // crida al mètode abstracte    return contingut.trim().toUpperCase();  // lògica compartida de processat  }}// Subclasses que implementen els mètodes abstractesclass GestorJSON extends GestorFitxers {  async llegir(): Promise\<string\> {    // implementació específica per a JSON    return fs.readFile(this.ruta, 'utf-8');  }  async escriure(contingut: string): Promise\<void\> {    JSON.parse(contingut);  // valida que és JSON vàlid    await fs.writeFile(this.ruta, contingut);  }  extensioSuportada(): string\[\] { return \['.json'\]; }}class GestorCSV extends GestorFitxers {  async llegir(): Promise\<string\> {    return fs.readFile(this.ruta, 'utf-8');  }  async escriure(contingut: string): Promise\<void\> {    await fs.writeFile(this.ruta, contingut);  }  extensioSuportada(): string\[\] { return \['.csv', '.tsv'\]; }}// No es pot instanciar directament// const gestor \= new GestorFitxers('./fitxer'); // ❌ Error: cannot create instanceconst gestorJSON \= new GestorJSON('./dades.json');await gestorJSON.processarFitxer();  // usa registrarAcces \+ llegir() \+ lògica compartida |
| :---- |

**La diferència clau: herència única vs. múltiples implementacions**

Mentre una classe TypeScript pot estendre únicament una classe abstracta, pot implementar múltiples interfícies. Aquesta flexibilitat permet a les classes conformar-se a múltiples contractes, promovent la reutilització de codi i la modularitat.

| // ❌ Una classe NO pot estendre múltiples classes abstractesclass MevaClasse extends ClasseA, ClasseB { } // Error\!// ✅ Una classe SÍ pot implementar múltiples interfíciesclass MevaClasse implements InterficieA, InterficieB, InterficieC { }// ✅ Combinació: estendre una abstracta i implementar interfíciesabstract class ServeiBase {  abstract inicialitzar(): Promise\<void\>;  registrar(msg: string) { console.log(msg); }  // mètode concret compartit}interface CacheFriendly { invalidarCache(): void; }interface Monitoritzable { obtenirMetriques(): Metriques; }class ServeiUsuaris extends ServeiBase  implements CacheFriendly, Monitoritzable {  async inicialitzar(): Promise\<void\> { /\* ... \*/ }  invalidarCache(): void { /\* ... \*/ }  obtenirMetriques(): Metriques { return { /\* ... \*/ }; }} |
| :---- |

**Les diferències tècniques: JavaScript generat**

Una diferència important que afecta el rendiment: les interfícies desapareixen completament en el JavaScript generat, mentre que les classes abstractes generen codi JavaScript real.

| // TypeScriptinterface Animal { parlar(): void; }abstract class Criatura { abstract parlar(): void; }// JavaScript generat per l'interfície → res (zero cost)// JavaScript generat per la classe abstracta →var Criatura \= /\*\* @class \*/ (function () {  function Criatura() {}  return Criatura;}()); |
| :---- |

**Quan usar cada una: el diagrama de decisió**

Quan necessites un contracte, opta per una interfície (o un type en llenguatges tipats) però opta per una classe abstracta quan necessites definir comportament comú o generalitzar un algorisme usant el patró de disseny Template Method.

| Necessites definir una estructura (contracte)?        │        ├── El contracte pot ser aplicat per classes NO relacionades?        │     → Interfície ✅ (implementada per classes completament diferents)        │        ├── Necessites que una classe compleixi múltiples contractes?        │     → Interfícies ✅ (implements A, B, C)        │        ├── Hi ha lògica compartida que no vols repetir a cada subclasse?        │     → Classe Abstracta ✅ (mètodes concrets compartits)        │        ├── Vols aplicar el patró Template Method?        │     → Classe Abstracta ✅ (defineix l'algorisme, delega els passos)        │        └── Vols garantir zero cost en el JavaScript generat?              → Interfície ✅ (desapareix en compilació) |
| :---- |

**Comparativa** 

| Aspecte | Interfície | Classe Abstracta |
| ----- | ----- | ----- |
| **Implementació** | ❌ Cap (únicament contracte) | ✅ Parcial (mètodes concrets i abstractes) |
| **Instanciable** | ❌ No | ❌ No |
| **Herència múltiple** | ✅ `implements A, B, C` | ❌ `extends` únicament una |
| **Propietats amb valor** | ❌ No | ✅ Sí |
| **Constructor** | ❌ No | ✅ Sí |
| **Modificadors d'accés** | ❌ Tot públic | ✅ `private`, `protected`, `public` |
| **JavaScript generat** | ❌ Cap (desapareix) | ✅ Codi JavaScript real |
| **Declaration Merging** | ✅ Sí | ❌ No |
| **Ideal per a** | Contractes purs, APIs públiques, DIP | Comportament compartit, Template Method |

