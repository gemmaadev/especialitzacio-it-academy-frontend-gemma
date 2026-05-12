## **DIP, DI i IoC: La relació completa (Fowler)**

**Tres termes que es confonen**

Dependency Injection (Principi d'Inversió de Dependències (DIP)), Dependency Inversion (Injecció de Dependències (DI)) i Inversion of Control son tres termes que, tot i que estan relacionats, es confonen habitualment.

La jerarquia és clara i cal entendre-la bé:

IoC (Inversion of Control)  ← el principi més ampli  
        ↓  
  es pot implementar amb...  
        ↓  
DI (Dependency Injection)   ← el patró específic (nombrat per Fowler)  
        ↑  
  implementa el principi...  
        ↑  
DIP (Dependency Inversion)  ← el principi SOLID de Robert C. Martin

**IoC: el principi més ampli**

Amb inversion of control, el flux depèn del graf d'objectes que es construeix durant l'execució del programa. 

Tal flux dinàmic és possible gràcies a interaccions d'objectes que es defineixen a través d'abstraccions. Aquest binding en temps d'execució s'aconsegueix amb mecanismes com la dependency injection o un service locator.

En programació tradicional, el teu codi crea i controla totes les seves dependències. Amb IoC, aquest control s'inverteix: és un framework o contenidor extern qui gestiona el cicle de vida dels objectes i els proveeix quan cal.

**DI: el nom que va donar Fowler al patró**

Inversion of Control és un terme massa genèric i per tant la gent el troba confús. Com a resultat, amb molta discussió amb diversos advocates d'IoC, vam acordar el nom Dependency Injection. 

La idea bàsica de la Dependency Injection és tenir un objecte separat, un assembler, que popula un camp en la classe lister amb una implementació apropiada per a la interfície finder.

Dependency Injection és una tècnica de disseny de software en la qual la creació i el binding de les dependències es fa fora de la classe dependent. Posteriorment, aquestes dependències es proveeixen ja instanciades i llestes per usar, d'aquí el terme "injection"; en contrast amb la classe dependent havent d'instanciar les seves dependències internament i havent de saber com configurar-les, causant acoblament.

**Les tres formes de Dependency Injection (Fowler)**

Hi ha tres estils principals de dependency injection. Els noms que uso per a ells son Constructor Injection, Setter Injection, i Interface Injection.

**Constructor Injection** — la forma recomanada. Les dependències son explícites i obligatòries:

| interface BaseDeDades {  guardar\<T\>(entitat: T): Promise\<T\>;  trobarPerId\<T\>(id: number): Promise\<T | null\>;}interface ServeiEmail {  enviar(a: string, missatge: string): Promise\<void\>;}// Constructor Injection: dependències visibles i obligatòriesclass ServeiUsuari {  constructor(    private readonly db: BaseDeDades,     // ← injectat via constructor    private readonly mailer: ServeiEmail  // ← injectat via constructor  ) {}  async registrar(nom: string, email: string): Promise\<void\> {    const usuari \= { id: Date.now(), nom, email };    await this.db.guardar(usuari);    await this.mailer.enviar(email, \`Benvingut/da, ${nom}\!\`);  }}// Producció: injectem implementacions realsconst serveiProd \= new ServeiUsuari(  new MySQLDatabase(),  new SendGridMailer());// Testing: injectem mocksconst mockDB: BaseDeDades \= {  guardar: jest.fn().mockResolvedValue({ id: 1, nom: 'Anna' }),  trobarPerId: jest.fn()};const mockMailer: ServeiEmail \= { enviar: jest.fn() };const serveiTest \= new ServeiUsuari(mockDB, mockMailer); |
| :---- |

**Setter Injection** — les dependències son opcionals, es poden canviar en temps d'execució:

| class ServeiUsuari {  private db\!: BaseDeDades;  private mailer\!: ServeiEmail;  setDB(db: BaseDeDades): void { this.db \= db; }  setMailer(mailer: ServeiEmail): void { this.mailer \= mailer; }  async registrar(nom: string, email: string): Promise\<void\> {    // Risc: db o mailer podrien ser undefined\!    await this.db?.guardar({ nom, email });  }} |
| :---- |

**Interface Injection** — la classe declara quines dependències necessita via una interfície:

| // Menys comú en TypeScript, però possibleinterface NecessitaDB {  injectarDB(db: BaseDeDades): void;}class ServeiUsuari implements NecessitaDB {  private db\!: BaseDeDades;  injectarDB(db: BaseDeDades): void { this.db \= db; }} |
| :---- |

**DIP vs. DI: la distinció fonamental**

El Dependency Inversion Principle va ser concebut per Robert Martin. Dependency Injection és el nom encunyat per Martin Fowler el 2004\.

**DIP és el principi** (el *què vols*): els mòduls d'alt nivell no han de dependre dels de baix nivell; tots dos han de dependre d'abstraccions.

**DI és el patró** (el *com ho aconsegueixes*): les dependències es creen fora i s'injecten.

Pots tenir DI sense DIP (injectes una classe concreta, no una abstracció) i pots tenir DIP sense DI (crees la dependència internament però via una interfície). La combinació dels dos és el que dóna els màxims beneficis.

| // DI sense DIP: injectes una concreció (mal)class ServeiUsuari {  constructor(private db: MySQLDatabase) {}  // ← concreció, no abstracció}// DIP sense DI: uses l'abstracció però crees la dependència internament (millor però no complet)class ServeiUsuari {  private db: BaseDeDades \= new MySQLDatabase();  // ← usa interfície però acoblat}// DIP \+ DI: la combinació idealclass ServeiUsuari {  constructor(private db: BaseDeDades) {}  // ← abstracció \+ injecció externa} |
| :---- |

**Service Locator: l'alternativa a DI (i per què és inferior)**

Fowler descriu el Service Locator com l'altra manera d'implementar IoC. En lloc de rebre les dependències injectades, la classe les demana a un registre central.

La diferència clau és que amb un Service Locator cada usuari d'un servei té una dependència al locator. 

El locator pot amagar dependències d'altres implementacions, però necessites veure el locator. Amb dependency injection, pots simplement mirar el mecanisme d'injecció, com el constructor, i veure les dependències. 

Amb el service locator, has de cercar al codi font les crides al locator. Mentre fas testing, pots fàcilment proveir la implementació mock de les teves classes actuals en el patró DI.

| // Service Locator: la classe busca activament les dependènciesclass ServeiUsuari {  async registrar(nom: string, email: string): Promise\<void\> {    const db \= ServiceLocator.get\<BaseDeDades\>('BD');       // ← dependència oculta    const mailer \= ServiceLocator.get\<ServeiEmail\>('Mail'); // ← dependència oculta    await db.guardar({ nom, email });    await mailer.enviar(email, \`Hola ${nom}\!\`);  }}// Problema: les dependències son ocultes, el test és difícil// El test ha de configurar el ServiceLocator globalment |
| :---- |

**Per què son importants per a la testeabilitat**

Sense DIP \+ DI, testar és lent, fràgil o directament impossible per a codi que usa bases de dades, APIs o serveis externs:

| // ✅ Amb DI: tests aïllats, ràpids i deterministesdescribe('ServeiUsuari', () \=\> {  let servei: ServeiUsuari;  let mockDB: jest.Mocked\<BaseDeDades\>;  let mockMailer: jest.Mocked\<ServeiEmail\>;  beforeEach(() \=\> {    // Creem mocks tipats: TypeScript garanteix que implementen la interfície    mockDB \= { guardar: jest.fn(), trobarPerId: jest.fn() };    mockMailer \= { enviar: jest.fn() };    // Injectem mocks: zero infraestructura real    servei \= new ServeiUsuari(mockDB, mockMailer);  });  it('guarda l\\'usuari i envia email de benvinguda', async () \=\> {    mockDB.guardar.mockResolvedValue({ id: 1, nom: 'Anna', email: 'anna@e.com' });    mockMailer.enviar.mockResolvedValue(undefined);    await servei.registrar('Anna', 'anna@e.com');    expect(mockDB.guardar).toHaveBeenCalledWith(      expect.objectContaining({ nom: 'Anna', email: 'anna@e.com' })    );    expect(mockMailer.enviar).toHaveBeenCalledWith(      'anna@e.com', 'Benvingut/da, Anna\!'    );  });  it('NO envia email si la BD falla', async () \=\> {    mockDB.guardar.mockRejectedValue(new Error('Connexió perduda'));    await expect(servei.registrar('Anna', 'anna@e.com'))      .rejects.toThrow('Connexió perduda');    // Verificació crítica: si la BD falla, el mail no s'envia    expect(mockMailer.enviar).not.toHaveBeenCalled();  });  // ✅ Execució: \~5ms. Sense MySQL, sense SMTP, sense internet.}); |
| :---- |

**Per què són importants per a la mantenibilitat**

DI fa les dependències explícites: llegint el constructor saps exactament de quèdepèn la classe. No cal llegir tot el codi intern per descobrir-ho.

| // Llegint el constructor → entens tot el graf de dependènciesclass ProcessadorComandes {  constructor(    private stockService: ServeiStock,           // depèn de stock    private pagamentGateway: GatewayPagament,    // depèn de pagament    private emailService: ServeiEmail,           // depèn d'email    private logger: Logger                       // depèn del logger  ) {}}// Canviar de SendGrid a Mailchimp → zero canvis a ProcessadorComandes// Canviar de Stripe a PayPal → zero canvis a ProcessadorComandes// Canviar de MySQL a PostgreSQL → zero canvis a ProcessadorComandes |
| :---- |

**El diagrama conceptual** 

| PRINCIPIS                    PATRONS                   EINESDIP (SOLID)           →      DI (Dependency             →    IoC Container"Depèn                       Injection)                      (InversifyJS,d'abstraccions"              "Injecta des de fora"           Angular DI)      ↓                            ↓                               ↓INTERFÍCIE/ABSTRACCIÓ    Constructor | Setter | Interface     Gestió automàtica(el contracte)           Injection     Injection  Injection   del graf d'objectes |
| :---- |

Beneficis:

  ✅ Testeabilitat → injectes mocks fàcilment  
  ✅ Mantenibilitat → canvis aïllats, dependències explícites  
  ✅ Flexibilitat → canvies implementació sense tocar el consumidor  
  ✅ OCP complert → afegeixes nous plugins sense modificar el sistema

**Resum** 

| Concepte | Tipus | Definit per | Respon a |
| ----- | ----- | ----- | ----- |
| **IoC** | Principi ampli | Comunitat (1990s) | "Qui controla el flux?" |
| **DIP** | Principi SOLID | Robert C. Martin | "De quèhas de dependre?" |
| **DI** | Patró d'implementació | Martin Fowler (2004) | "Com reps les dependències?" |

