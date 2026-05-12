## **Glossari de termes — POO i principis SOLID amb TypeScript**

**Abstracció** — Pilar de la POO que amaga la complexitat interna d'un objecte i exposa únicament la interfície pública necessària. Defineix el *quèfa* un objecte sense revelar el *comho fa*. En TypeScript s'implementa amb classes abstractes i interfícies.

**`abstract` (classe)** — Modificador que indica que una classe no es pot instanciar directament. Dissenyada per ser estesa per subclasses. Pot contenir mètodes concrets (implementats) i mètodes abstractes (sense implementació).

**`abstract` (mètode)** — Mètode declarat dins d'una classe abstracta sense cos d'implementació. Les subclasses no abstractes estan obligades a implementar-lo o TypeScript genera un error de compilació.

**Classe** — La plantilla o plànol que defineix les propietats i comportaments d'un objecte. No és un objecte en si: és la definició de com seran els objectes creats a partir d'ella. Es defineix amb la paraula clau `class`.

**Classe Abstracta** — Veure *`abstract` (classe)*.

**Classe Base / Superclasse / Pare** — La classe de la qual hereten les classes filles. Conté el comportament comú que es vol compartir. Les classes filles accedeixen als seus mètodes via `super`.

**Classe Concreta** — Classe que proporciona implementació completa per a tots els seus mètodes. A diferència de les classes abstractes, es pot instanciar directament amb `new`.

**Classe Derivada / Subclasse / Filla** — Classe que hereta d'una altra classe usant `extends`. Rep totes les propietats i mètodes de la classe pare i pot afegir-ne de nous o sobreescriure els existents.

**Cohesió** — El grau en el qual els elements d'una classe estan relacionats i serveixen un propòsit unificat. Alta cohesió significa que la classe fa una sola cosa i la fa bé. SOLID promou alta cohesió.

**Composició** — Alternativa a l'herència. Una classe "té un" altre objecte com a component en lloc d'"ésser un" subgènere d'aquella classe. Preferida per la seva flexibilitat i menor fragilitat: un `Cotxe` té un `Motor` en lloc d'heretar de `Motor`.

**Constructor** — Mètode especial d'una classe que s'executa automàticament quan es crea una nova instància amb `new`. Inicialitza les propietats de l'objecte. En TypeScript, la classe filla ha de cridar `super()` al constructor abans d'usar `this`.

**Constructor Injection** — La forma recomanada de Dependency Injection. Les dependències es passen com a paràmetres del constructor, fent-les explícites, obligatòries i fàcilment substituïbles per mocks als tests.

**Declaration Merging** — Funcionalitat exclusiva de les `interface` de TypeScript que permet declarar la mateixa interfície en múltiples llocs i TypeScript les fusiona automàticament. No disponible amb `type` ni classes abstractes.

**Dependency Injection (DI)** — Patró d'implementació nomenat per Martin Fowler (2004) on les dependències d'una classe es passen des de fora (via constructor, setter o mètode) en lloc de crear-les internament. Implementa el DIP en la pràctica.

**Dependency Inversion Principle (DIP)** — Cinquè principi SOLID (Robert C. Martin). Els mòduls d'alt nivell no han de dependre dels de baix nivell; tots dos han de dependre d'abstraccions. La interfície (l'abstracció) defineix l'arquitectura, no les implementacions concretes.

**Disseny Emergent** — Les quatre regles de Kent Beck (referenciades a Clean Code): (1) passa tots els tests, (2) no duplicació, (3) expressa la intenció del programador, (4) minimitza el nombre de classes i mètodes.

**Encapsulació** — Pilar de la POO que agrupa dades i els mètodes que les operen en una sola unitat (classe), restringint l'accés directe a les dades internes. Proporciona control sobre la integritat de les dades i prevé modificacions no autoritzades.

**`extends`** — Paraula clau TypeScript per a l'herència de classes: `class Gos extends Animal`. Una classe únicament pot estendre una sola classe (no herència múltiple). Les interfícies sí poden estendre múltiples interfícies.

**Factory Method** — Patró de disseny creacional relacionat amb OCP. Proporciona una interfície per crear objectes però deixa a les subclasses decidir quina classe instanciar. Permet afegir nous tipus d'objectes sense modificar el codi existent.

**Field (Camp)** — Propietat declarada directament a la classe. En TypeScript, els camps poden tenir modificadors d'accés, ser `readonly`, o tenir valors per defecte. Exemple: `private _saldo: number = 0`.

**Getter** — Mètode especial prefixat amb `get` que permet accedir a una propietat privada de manera controlada. Si existeix un `get` però no un `set`, la propietat és automàticament `readonly`.

**God Class** — Code smell: classe que fa massa coses i viola el SRP. Té múltiples responsabilitats, molts mètodes no relacionats i moltes raons per canviar. La solució és descomposar-la en classes petites i cohesives.

**Herència** — Pilar de la POO que permet que una classe (filla) adquireixi les propietats i mètodes d'una altra (pare). Promou la reutilització del codi. Segueix la relació "és un" (is-a): un Gos és un Animal. Usar `extends` en TypeScript.

**Hollywood Principle** — "No ens truquis, ja et trucarem nosaltres". La base de IoC: és el framework qui crida el teu codi, no al revés. Inverteix el flux de control respecte al codi procedimental tradicional.

**`implements`** — Paraula clau TypeScript per declarar que una classe complirà el contracte d'una interfície. Una classe pot implementar múltiples interfícies: `class X implements A, B, C`. Si la classe no implementa algun mètode, TypeScript genera un error.

**Instanciació** — El procés de crear un objecte (instància) a partir d'una classe usant la paraula clau `new`. `const gos = new Gos('Max')` crea una nova instància de la classe `Gos`.

**Interface Injection** — Una de les tres formes de Dependency Injection. La classe declara quines dependències necessita implementant una interfície específica. Menys comú que Constructor i Setter Injection.

**Interface Segregation Principle (ISP)** — Quart principi SOLID. Cap client hauria de ser forçat a dependre d'interfícies que no usa. Millor tenir moltes interfícies petites i específiques que una sola interfície d'ús general.

**Interfície** — Contracte pur que defineix quines propietats i mètodes ha de tenir un objecte, sense cap implementació. Desapareix completament en el JavaScript generat (zero cost). Suporta declaration merging i múltiple implementació (`implements A, B, C`).

**Inversió de Control (IoC)** — Principi ampli de disseny on el framework o contenidor gestiona el cicle de vida dels objectes i crida el codi de l'aplicació (Hollywood Principle). DI és el patró específic més comú per implementar IoC.

**IoC Container** — Eina que gestiona automàticament la creació i injecció de dependències. Elimina la necessitat de crear manualment el graf d'objectes. Exemple per a TypeScript: InversifyJS.

**Liskov Substitution Principle (LSP)** — Tercer principi SOLID (Barbara Liskov). Les subclasses han de poder substituir el tipus base sense alterar la correctesa del programa. Si una subclasse llança errors als mètodes heretats, viola el LSP.

**Method Injection** — Forma de Dependency Injection on la dependència es passa com a paràmetre d'un mètode concret. Útil quan la dependència varia per crida.

**Modificadors d'Accés** — Paraules clau que controlen la visibilitat dels membres d'una classe: `public` (accessible des de qualsevol lloc, per defecte), `private` (únicament la classe), `protected` (la classe i les subclasses).

**Mocking (en el context de DI)** — La capacitat de substituir dependències reals (BD, API, email) per versions falses en els tests, possible gràcies a DI i DIP. Si les dependències es creen internament (sense DI), el mocking és impossible o molt complex.

**`new`** — Operador JavaScript/TypeScript per instanciar una classe. Crida el constructor i retorna un nou objecte. Usar `new` dins d'una classe (en lloc de DI) crea acoblament fort i dificulta el testing.

**Objecte** — Una instància concreta d'una classe. Té el seu propi estat (valors de les propietats) independent d'altres instàncies de la mateixa classe. Combina dades i comportament en una sola unitat.

**OCP (Open/Closed Principle)** — Segon principi SOLID. Les entitats de software haurien d'estar obertes per a l'extensió però tancades per a la modificació. S'afegeix nova funcionalitat creant noves classes (obertes per estendre), sense modificar les existents (tancades per modificació).

**`override`** — Paraula clau TypeScript (recomanada) per declarar explícitament que un mètode sobreescriu el del pare. Activa errors de compilació si el mètode no existeix al pare. El setting `noImplicitOverride` força el seu ús.

**Overloading** — Múltiples signatures per al mateix mètode dins d'una classe. En TypeScript, cal una sola implementació compatible amb totes les signatures.

**Overriding** — Una subclasse sobreescriu un mètode heretat del pare amb una implementació diferent. El polimorfisme es basa en l'overriding.

**Parameter Property** — Sintaxi shorthand de TypeScript que declara i assigna propietats directament als paràmetres del constructor prefixant-los amb un modificador d'accés. Elimina la necessitat de declarar el camp i assignar-lo per separat.

**Pilar de la POO** — Cadascun dels quatre conceptes fonamentals que defineixen la programació orientada a objectes: Encapsulació, Herència, Polimorfisme i Abstracció.

**Polimorfisme** — Pilar de la POO que permet que objectes de classes diferents responguin de manera diferent a la mateixa crida de mètode. "Moltes formes" (del grec). La mateixa interfície, comportaments totalment diferents segons el tipus concret. Elimina les cadenes `if/else` o `switch` per tipus.

**`protected`** — Modificador d'accés que permet l'accés a un membre des de la classe pròpia i des de qualsevol subclasse que l'hereti. Diferent de `private` (únicament la classe) i `public` (qualsevol lloc).

**`public`** — Modificador d'accés per defecte. Permet l'accés al membre des de qualsevol lloc del codi. No cal especificar-lo explícitament.

**`readonly`** — Modificador que impedeix la reassignació d'una propietat un cop inicialitzada. Els camps `readonly` únicament es poden assignar al moment de la declaració o dins del constructor. Comparable a `const` però per a propietats de classe.

**Refactoring** — El procés de millorar l'estructura interna del codi sense canviar el seu comportament extern. Aplicar els principis SOLID és, en molts casos, un exercici de refactoring.

**Relació "és un" (is-a)** — La relació que justifica l'herència. Un Gos és un Animal, per tant té sentit que `Gos extends Animal`. Si la relació no és "és un", probablement la composició és més adequada.

**Relació "té un" (has-a)** — La relació que justifica la composició. Un Cotxe té un Motor. En lloc d'heretar, la classe conté l'altra com a propietat.

**`readonly`** — Veure *readonly*.

**Service Locator** — Alternativa al DI on la classe busca activament les dependències en un registre central. Inferirior a DI perquè les dependències son ocultes (no visibles al constructor), dificulta els tests i crea acoblament al locator.

**Setter Injection** — Forma de Dependency Injection on la dependència s'assigna via un mètode setter. Útil per a dependències opcionals o quan la dependència pot canviar en runtime. Menys robusta que Constructor Injection perquè la dependència pot ser `undefined`.

**Setter** — Mètode especial prefixat amb `set` que permet modificar una propietat privada de manera controlada, podent afegir validació o lògica addicional abans de l'assignació.

**SOLID** — Acrònim dels cinc principis de disseny orientat a objectes de Robert C. Martin: **S**ingle Responsibility, **O**pen/Closed, **L**iskov Substitution, **I**nterface Segregation, **D**ependency Inversion. Promouen codi mantenible, escalable, testable i desacoblat.

**SRP (Single Responsibility Principle)** — Primer principi SOLID. Una classe hauria de tenir una i únicament una raó per canviar. Equivalent a dir que una classe hauria de tenir únicament una responsabilitat. La senyal de violació: la classe "també fa..."

**`static`** — Modificador que indica que un membre pertany a la classe mateixa, no a les seves instàncies. S'accedeix via el nom de la classe, no via `this`. Útil per a funcions utilitàries (Utility Classes) i el patró Singleton.

**Strategy Pattern** — Patró de disseny que implementa directament l'OCP. Defineix una família d'algoritmes intercanviables encapsulats en classes separades. Permet canviar l'algoritme en runtime sense modificar el codi client.

**`super`** — Paraula clau per accedir al constructor i mètodes de la classe pare. A les subclasses, `super()` ha de ser cridat al constructor **abans** d'usar `this`. `super.metode()` crida el mètode del pare sense sobreescriure'l.

**Template Method** — Patró de disseny que encaixa perfectament amb les classes abstractes. La classe base defineix l'esquelet d'un algorisme en un mètode concret, i delega els passos variables a mètodes abstractes que implementen les subclasses.

**Tight Coupling (Acoblament Fort)** — Quan una classe depèn directament de la implementació concreta d'una altra (`new MySQLDatabase()` dins de la classe). Dificulta els tests i fa el codi fràgil als canvis. DIP i DI son la solució.

**Utility Class** — Classe que conté únicament mètodes `static` i no es pot instanciar (constructor privat). Útil per agrupar funcions d'utilitat relacionades. L'ús excessiu d'estàtics pot crear acoblament fort.

**Visibilitat** — Veure *Modificadors d'Accés*.

**`#` (Private Field natiu)** — Sintaxi ES2022 per a privacitat real en temps d'execució (no únicament en compilació com `private` de TypeScript). Un camp `#nom` és completament inaccessible fora de la classe fins i tot en el JavaScript generat.  
