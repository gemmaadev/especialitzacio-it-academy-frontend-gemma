## **Clean Code — Robert C. Martin: Conceptes Clau**

###### **Clean Code**

[https://www.google.com/search?q=https://www.oreilly.com/library/view/clean-code/9780132350884/](https://www.google.com/search?q=https://www.oreilly.com/library/view/clean-code/9780132350884/)  
Capítols sobre classes i principis de disseny.

**L'obra i el seu impacte**

Clean Code: A Handbook of Agile Software Craftsmanship de Robert C. Martin és probablement el més proper que un llibre de desenvolupament de software pot estar de ser un clàssic intemporal. 

Publicat el 2008, emfatitza escriure codi llegible, mantenible i elegant. El llibre cobreix diverses àrees clau de l'artesania del software i no és específic de cap llenguatge de programació en particular.

L'impacte del llibre en el món de la programació no té parangó. De sobte la qualitat del codi, la llegibilitat i la mantenibilitat estaven al focus dels developers.

**1\. Noms Significatius (Chapter 2\)**

Martin subratlla la importància de triar noms clars i que revelen la intenció per a variables, funcions i classes. Noms ben triats i expressius poden fer que el codi s'expliqui sol, reduir la necessitat de comentaris, i reduir el nombre de coses que cal recordar.

**Les regles principals de naming:**

* Tria noms descriptius i no ambigus.   
* Fes distincions significatives.   
* Usa noms pronunciables.   
* Usa noms cercables.   
* Substitueix els nombres màgics per constants amb nom.   
* Evita les codificacions.   
* No afegeixis prefixos ni informació de tipus.

| // ❌ Noms críptics i no pronunciablesconst d \= new Date();const gls \= users.filter(u \=\> u.a);function calc(p: number, q: number): number { return p \* q; }// ✅ Noms que revelen la intencióconst dataCreacio \= new Date();const usuarisActius \= usuaris.filter(u \=\> u.actiu);function calcularTotalComanda(preu: number, quantitat: number): number {  return preu \* quantitat;}// ❌ Noms sense context significantconst name \= 'Anna';         // "name" de quèexactament?const processIt \= true;// ✅ Noms amb context de dominiconst nomClient \= 'Anna';const processarPagamentAutomaticament \= true; |
| :---- |

**2\. Funcions (Chapter 3\)**

Emfatitza la importància de crear funcions petites, enfocades i d'una sola responsabilitat que son fàcils d'entendre, testar i mantenir.

Una funció ha de ser responsable d'una sola feina. Hauria de fer únicament una cosa. "Les funcions haurien de fer una cosa. Haurien de fer-la bé. Haurien de fer-la únicament." Per assegurar-nos que la nostra funció fa únicament una cosa, hem d'assegurar-nos que totes les expressions en la funció son al mateix nivell d'abstracció.

* Fes una sola cosa.   
* Usa noms descriptius.   
* Prefereix menys arguments.   
* No tinguis efectes secundaris.   
* No usis arguments de flag.   
* Divideix el mètode en diversos mètodes independents que puguin ser cridats des del client sense el flag.

| // ❌ Funció que fa massa coses (viola SRP)function processarComanda(  orderId: string,  userId: string,  sendEmail: boolean  // ← flag argument: senyal que fa dues coses\!): boolean {  const ordre \= db.getOrder(orderId);  if (\!ordre) return false;  const usuari \= db.getUser(userId);  const total \= ordre.items.reduce((sum, i) \=\> sum \+ i.preu, 0);  db.save({ ...ordre, total, processada: true });  if (sendEmail) {  // ← condició per al flag → dues responsabilitats    mailer.send(usuari.email, \`Comanda confirmada: ${total}€\`);  }  return true;}// ✅ Funcions petites i enfocades, un nivell d'abstracció cadascunafunction calcularTotalOrdre(items: Item\[\]): number {  return items.reduce((suma, item) \=\> suma \+ item.preu \* item.quantitat, 0);}function guardarOrdreProcessada(ordre: Ordre, total: number): Ordre {  return db.save({ ...ordre, total, processada: true });}function enviarConfirmacioOrdre(email: string, total: number): void {  mailer.enviar(email, \`Comanda confirmada: ${total}€\`);}// La funció d'alt nivell coordina les petitesasync function processarComanda(ordreId: string): Promise\<void\> {  const ordre \= await db.obtenirOrdre(ordreId);  const total \= calcularTotalOrdre(ordre.items);  const ordreGuardada \= await guardarOrdreProcessada(ordre, total);  await enviarConfirmacioOrdre(ordre.usuari.email, total);} |
| :---- |

**3\. Comentaris (Chapter 4\)**

Sempre intenta explicar-te en el codi. No siguis redundant. No afegeixis soroll obvi. No comentes el codi que elimines. Simplement elimina'l. Usa els comentaris com a explicació de la intenció. Usa'ls com a aclariment del codi. Usa'ls com a advertència de conseqüències.

El principi fonamental: el codi ha de ser tan expressiu que no necessiti comentaris. Un comentari que explica el *què és* és senyal que el codi no és prou clar. Els bons comentaris expliquen el *per què és*.

| // ❌ Comentari redundant: el codi ja ho diu// Incrementa i en 1i++;// ❌ Comentari com a excusa de codi mal escrit// Comprova si l'u és vàlid i no és null i que el nivell d'accés és majorif (u \!== null && u \!== undefined && u.nivell \> 2 && u.a \=== true) {}// ✅ Codi expressiu que no necessita comentariconst usuariActiuAmbPermisos \= usuari?.actiu && usuari.nivell \> NIVELL\_ADMIN;if (usuariActiuAmbPermisos) { }// ✅ Comentari legítim: explica el "per quèés" no obvi// Usem setTimeout de 0ms per forçar que el render s'acabi// abans de llegir l'altura de l'element (evitar layout thrashing)setTimeout(() \=\> { const alcada \= element.offsetHeight; }, 0);// ✅ Advertència de conseqüències// ⚠️ Aquesta operació és irreversible. Actualitza 50.000 registres.await migracio.executar(); |
| :---- |

**4\. Formatació (Chapter 5\)**

Cada grup de línies representa un pensament complet on els pensaments estan separats els uns dels altres amb línies en blanc. Cada línia en blanc identifica un concepte nou i separat. 

Els conceptes estretament relacionats haurien de mantenir-se verticalment propers els uns als altres i no separar-se en fitxers diferents tret que hi hagi una raó molt bona.

La metàfora del "Diari": el nom hauria de ser simple però explicatiu, les parts superiors del fitxer haurien de proporcionar conceptes i algoritmes d'alt nivell, i els detalls haurien de seguir més endavant en el text.

| // El fitxer llegit de dalt a baix: del concepte general als detalls// Primer: les funcions d'alt nivell (la "notícia del titular")class ServeiPagament {  async processarPagament(comanda: Comanda): Promise\<ResultatPagament\> {    await this.validarComanda(comanda);    const total \= this.calcularTotal(comanda);    return await this.cobrar(total, comanda.metodePagament);  }  // Línia en blanc → nou concepte  private async validarComanda(comanda: Comanda): Promise\<void\> {    if (\!comanda.productes.length) throw new Error('Comanda buida');    if (\!comanda.usuari) throw new Error('Usuari requerit');  }  // Línia en blanc → nou concepte  private calcularTotal(comanda: Comanda): number {    return comanda.productes.reduce((s, p) \=\> s \+ p.preu \* p.quantitat, 0);  }  // Detalls d'implementació al final del fitxer  private async cobrar(total: number, metode: MetodePagament): Promise\<ResultatPagament\> {    return this.gateway.processar(total, metode);  }} |
| :---- |

**5\. Classes (Chapter 10\)**

En codi net, s'ha de prestar atenció als nivells superiors d'organització del codi, particularment les classes. 

Una classe hauria de començar amb constants estàtiques públiques, variables estàtiques privades, i llavors variables d'instància privades, seguides de funcions públiques. 

Mantenir les funcions utilitàries privades i organitzar-les després de les funcions públiques ajuda a la llegibilitat.

Les classes haurien de ser petites, adherint-se al principi de tenir una responsabilitat o una raó per canviar, coneguda com el Single Responsibility Principle. 

Una classe amb múltiples responsabilitats sovint és massa gran i s'hauria de refactoritzar. El nom de la classe hauria de reflectir les seves responsabilitats.

| // ❌ Classe amb múltiples responsabilitatsclass GestorInforme {  generarContingut(dades: Dades): string { /\* genera text \*/ }  formatarHTML(contingut: string): string { /\* formata \*/ }  guardarFitxer(contingut: string, ruta: string): void { /\* E/S \*/ }  enviarPerEmail(ruta: string, destinatari: string): void { /\* xarxa \*/ }}// ✅ Classe organitzada: constants → variables → constructor → públics → privatsclass GeneradorInforme {  // 1\. Constants  private static readonly FORMAT\_DEFECTE \= 'html';  private static readonly EXTENSIO \= '.html';  // 2\. Variables d'instància privades  private readonly plantilla: Plantilla;  private readonly formateador: Formateador;  // 3\. Constructor  constructor(plantilla: Plantilla, formateador: Formateador) {    this.plantilla \= plantilla;    this.formateador \= formateador;  }  // 4\. Mètodes públics (la interfície)  generar(dades: DadesInforme): string {    const contingut \= this.crearContingut(dades);    return this.formateador.formatar(contingut);  }  // 5\. Mètodes privats (detalls d'implementació)  private crearContingut(dades: DadesInforme): string {    return this.plantilla.aplicar(dades);  }} |
| :---- |

Per gestionar el canvi de manera efectiva, s'haurien d'utilitzar interfícies i classes abstractes. Això minimitza les dependències directes en implementacions concretes i facilita el testing. 

Per exemple, crear una interfície StockExchange permet fer testing consistent sense ser afectat per la volatilitat de les dades del món real.

**6\. Gestió d'errors (Chapter 7\)**

Martin argumenta que els errors haurien de ser tractats com a ciutadans de primera classe en les codebases; mereixen un disseny clar i reflexiu. Un dels principis clau discutits és la separació de la gestió d'errors de la lògica de negoci.

La bona gestió d'excepcions usa excepcions no verificades i proporciona tant de context com sigui possible.

| // ❌ Gestió d'errors barrejada amb la lògica de negociasync function processarComanda(id: string) {  try {    const ordre \= await db.obtenirOrdre(id);    if (\!ordre) { console.log('no found'); return; }    const total \= ordre.items.reduce((s, i) \=\> s \+ i.preu, 0);    try {      await pagament.cobrar(total);    } catch (e) {      console.log('payment error');    }  } catch (e) {    console.log('db error');  }}// ✅ Errors separats de la lògica de negociclass OrdreNoTrobadaError extends Error {  constructor(id: string) {    super(\`Ordre ${id} no trobada\`);    this.name \= 'OrdreNoTrobadaError';  }}async function obtenirOrdreOFallar(id: string): Promise\<Ordre\> {  const ordre \= await db.obtenirOrdre(id);  if (\!ordre) throw new OrdreNoTrobadaError(id);  return ordre;}// La lògica de negoci és clara, sense soroll de gestió d'errorsasync function processarComanda(id: string): Promise\<void\> {  const ordre \= await obtenirOrdreOFallar(id);  // llança si no existeix  const total \= calcularTotal(ordre.items);  await pagament.cobrar(total);                  // llança si falla el pagament} |
| :---- |

**7\. Tests (Chapter 9): la regla F.I.R.S.T.**

Els bons tests unitaris haurien de ser FIRST (Fast, Independent, Repeatable, Self-validated, Timely).

| Lletra | Anglès | Significa |
| ----- | ----- | ----- |
| **F** | Fast | Tests ràpids: mil·lisegons, no minuts |
| **I** | Independent | Cap test depèn d'un altre |
| **R** | Repeatable | El mateix resultat sempre |
| **S** | Self-validated | Pass o Fail, no cal interpretació manual |
| **T** | Timely | Escrits al mateix temps que el codi |

**8\. Disseny emergent (Chapter 12): les quatre regles**

Si algú vol usar les classes que has escrit pot mirar la interfície de la classe, però és més probable que miri els usos anteriors. 

Per això la secció "Examples" de cada biblioteca de software és tan valuosa. Si no hi ha usos? Vol dir que no hi ha tests tampoc. Fer una ullada ràpida als tests et pot fer entendre immediatament el propòsit de la classe. Això fa el seu ús molt més fàcil.

Les quatre regles del disseny simple (per ordre de prioritat):

1. **Passa tots els tests** — el sistema ha de funcionar. Un sistema verificable porta a un disseny millor.   
2. **No duplicació** — DRY: cada peça de coneixement existeix una sola vegada.   
3. **Expressa la intenció del programador** — noms, patrons, i estructura han de comunicar clarament.   
4. **Minimitza el nombre de classes i mètodes** — no sobre-enginyeris.

**Resum: les regles d'or de Clean Code**

1. Classes petites.   
2. Responsabilitat única.   
3. Poques variables d'instància.   
4. La classe base no hauria de saber res sobre les seves derivades.   
5. Millor tenir moltes funcions que passar codi a una funció per seleccionar un comportament.   
6. Preferir funcions pures sense efectes secundaris.   
7. Evitar dependència lògica.   
8. Evitar condicionals negatius.

| Aspecte | Regla |
| ----- | ----- |
| **Noms** | Revelen la intenció, pronunciables, cercables |
| **Funcions** | Petites, una cosa, cap flag argument, cap efecte secundari |
| **Comentaris** | Expliquen el "per quèés", no el "quèés". Elimina el codi comentat |
| **Classes** | Petites, SRP, organitzades de general a específic |
| **Errors** | Separats de la lògica de negoci, amb context |
| **Tests** | FIRST: ràpids, independents, repetibles, auto-validats, a temps |

