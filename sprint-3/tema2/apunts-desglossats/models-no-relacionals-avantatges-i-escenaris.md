## **Disseny de bases de dades: Quins avantatges ofereixen els models no relacionals (flexibilitat, escalabilitat horizontal) i en quins escenaris són més adequats?**

**Què és NoSQL i per què existeix**

Les bases de dades NoSQL son sistemes de gestió de bases de dades no relacionals que emmagatzemen i recuperen dades sense usar les estructures tradicionals de base de dades relacional basades en taules. 

Estan dissenyades per gestionar grans volums de dades no estructurades o semi-estructurades, oferint flexibilitat, escalabilitat, i alt rendiment per a tipus específics de models de dades i casos d'ús.

NoSQL no és "millor" que SQL ni és un reemplaçament: és una eina diferent per a problemes diferents. L'acrònim significa "Not Only SQL": es pot usar SQL i NoSQL junts.

**Avantatge 1: Escalabilitat horitzontal**

Les bases de dades NoSQL son escalables horitzontalment, el que significa que usen múltiples nodes en un clúster per gestionar càrregues de treball augmentades. Això permet als arquitectes de dades simplement escalar-les afegint servidors addicionals als clústers.

La diferència entre escalar verticalment i horitzontalment:

| ESCALABILITAT VERTICAL (SQL tradicional):  Servidor A: 4 CPU, 16 GB RAM      ↓  Servidor A: 16 CPU, 64 GB RAM  ← actualitzes la màquina existent      ↓  Servidor A: 32 CPU, 256 GB RAM ← arribes al límit físic \+ molt carESCALABILITAT HORITZONTAL (NoSQL):  Servidor A: 4 CPU, 16 GB RAM      ↓  Servidor A \+ Servidor B  ← afegeixes màquines noves      ↓  Servidor A \+ B \+ C \+ D   ← escales sense límit teòric  (sharding: cada servidor gestiona una part de les dades) |
| :---- |

Una de les limitacions d'algunes bases de dades SQL és com únicament poden escalar verticalment. Per exemple, si et quedes sense memòria per als teus datasets, hauràs d'actualitzar el hardware.

**Avantatge 2: Flexibilitat d'esquema**

Una base de dades NoSQL és millor per gestionar dades indeterminades, no relacionades, o que canvien ràpidament. És intuïtiva per als developers quan l'aplicació dicta l'esquema de la base de dades.

Les bases de dades NoSQL adopten models de dades flexibles, permetent l'emmagatzematge de dades dinàmic i sense esquema. Aquesta flexibilitat permet als developers inserir dades sense un esquema predefinit. 

Les bases de dades NoSQL son més útils en escenaris on les estructures de dades puguin estar indefinides o canviïn freqüentment.

| // MongoDB: cada document pot tenir estructura diferent// No cal ALTER TABLE, no cal definir camps prèviament// Usuari bàsic{ \_id: "u1", nom: "Anna", email: "anna@e.com" }// Usuari amb adreça (camp nou, no cal migrar els altres){ \_id: "u2", nom: "Gema", email: "gema@e.com",  adreca: { carrer: "Gran Via 1", ciutat: "Barcelona" } }// Usuari amb xarxes socials (estructura completament diferent){ \_id: "u3", nom: "Marc",  xarxesSocials: { twitter: "@marc", instagram: "@marc\_dev" },  preferencies: { idioma: "ca", tema: "fosc" } }// ✅ Tots convivien a la mateixa col·lecció sense errors// ❌ En SQL: caldria un ALTER TABLE per cada camp nou |
| :---- |

**Els quatre models de NoSQL**

### **1\. Base de dades documental (Document Store)**

Les bases de dades de documents emmagatzemen dades com a objectes JSON que son flexibles, semi-estructurats i jeràrquics en naturalesa.

| // MongoDB: documents JSON amb estructura anidada{  \_id: ObjectId("..."),  titol: "iPhone 15 Pro",  preu: 1199.99,  especificacions: {           // ← objecte anidat    processador: "A17 Pro",    emmagatzematge: \["128GB", "256GB", "512GB"\],  // ← array    colors: \["Titanium Black", "Titanium White"\]  },  ressenyes: \[                 // ← array de subdocuments    { autor: "Anna", puntuacio: 5, text: "Excel·lent\!" },    { autor: "Marc", puntuacio: 4, text: "Molt bo." }  \]}// En SQL: necessitaries 4 taules \+ múltiples JOINs per obtenir això |
| :---- |

**Casos d'ús:** catàlegs de productes, contingut de CMS, perfils d'usuari, aplicacions amb estructura variable.

### **2\. Clau-Valor (Key-Value Store)**

Les bases de dades clau-valor son altament particionables i permeten l'escalabilitat horitzontal a un nivell que altres tipus de bases de dades NoSQL no poden assolir. Una base de dades clau-valor emmagatzema dades com una col·lecció de parells clau-valor on la clau serveix com a identificador únic.

| // Redis: la seva estructura és extremament simple i ràpida"sessio:abc123" → { usuariId: 42, nom: "Anna", exp: 1719619200 }"producte:101:stock" → "47""ranking:global" → \["usuari\_1", "usuari\_2", "usuari\_3"\]// Operació de lectura: O(1) → temps constant, independentment de la mida |
| :---- |

**Casos d'ús:** caché, sessions d'usuari, cues de missatgeria, contadors en temps real, rankings.

### **3\. Columnar (Wide-Column Store)**

| // Cassandra: optimitzada per a escriptures massives i lectures per columna// Ideal per a sèries temporals i IoTClau de partició: sensor\_idColumnes: timestamp → temperatura, humitat, pressiósensor\_001:   2025-06-17 10:00:00 → { temp: 22.5, hum: 65, pres: 1013 }  2025-06-17 10:01:00 → { temp: 22.6, hum: 65, pres: 1013 }  2025-06-17 10:02:00 → { temp: 22.4, hum: 64, pres: 1012 } |
| :---- |

**Casos d'ús:** IoT, logs massius, sèries temporals, anàlisi de dades a gran escala.

### **4\. Graf (Graph Database)**

Emmagatzema nodes (entitats) i arestes (relacions) de manera nativa. Molt eficient per a xarxes de relacions complexes.

| // Neo4j: relacions com a ciutadans de primera classe(Anna)-\[:SEGUEIX\]-\>(Gema)(Anna)-\[:HA\_COMPRAT\]-\>(Portàtil)(Gema)-\[:HA\_COMPRAT\]-\>(Portàtil)(Portàtil)-\[:CATEGORIA\]-\>(Tecnologia)// Consulta: qui segueix Anna i ha comprat el mateix que ella?// → En SQL: JOINs recursives molt costosos// → En Graf: recorregut natiu del graf |
| :---- |

**Casos d'ús:** xarxes socials, sistemes de recomanació, detecció de frau, gestió de coneixement.

**Quan és adequat cada model**

Pots usar-la per a aplicacions que: necessiten esquemes flexibles que habilitin un desenvolupament més ràpid i iteratiu, prioritzen el rendiment sobre la consistència forta de les dades i el manteniment de relacions entre taules, requereixen escalabilitat horitzontal per sharding entre servidors.

ESCULL NoSQL QUAN:

✅ Les dades son no estructurades o semi-estructurades  
   Ex: logs d'aplicació, contingut de CMS, dades d'IoT

✅ L'esquema canviarà freqüentment durant el desenvolupament  
   Ex: MVP, startups, prototips ràpids

✅ Necessites escalar a milions d'usuaris horitzontalment  
   Ex: xarxes socials, aplicacions globals

✅ El rendiment de lectura/escriptura és crítica  
   Ex: sistemes de caché, sessions, temps real

✅ Les dades son jeràrquiques o anidades de manera natural  
   Ex: documents, catalègs de productes amb molts atributs

✅ Treballes amb big data o sèries temporals  
   Ex: analítica, IoT, logs massius

**El teorema CAP: la limitació de NoSQL**

Totes les bases de dades distribuïdes han d'escollir dos dels tres:

|         Consistència (C)        /       /      /Disponibilitat (A) ── Tolerància a Particions (P)SQL (tradicional):   escull C \+ A (no distribuïda de base)MongoDB:             escull C \+ P (prioritza consistència)Cassandra:           escull A \+ P (prioritza disponibilitat) |
| :---- |

En les bases de dades distribuïdes NoSQL, sovint s'opta per la consistència eventual: les dades acabaran sent consistents a tots els nodes, però pot haver-hi un petit retard. Acceptable per a la majoria de casos d'ús, però no per a transaccions financeres.

**SQL vs. NoSQL: la taula de decisió**

Les bases de dades relacionals son la millor opció si les teves dades son predictibles en termes de mida, estructura, i freqüència d'accés. Un model no relacional funciona millor per emmagatzemar dades que son flexibles en forma o mida, o que poden canviar en el futur.

| Factor | SQL (Relacional) | NoSQL (No Relacional) |
| ----- | ----- | ----- |
| **Estructura de dades** | Fixa, predefinida | Flexible, dinàmica |
| **Relacions** | Excel·lent (JOINs) | Limitada |
| **Escalabilitat** | Vertical (+ hardware) | Horitzontal (+ servidors) |
| **Consistència** | ACID (forta) | Eventual (feble/configurable) |
| **Volum de dades** | Milers-milions de files | Bilions de documents |
| **Velocitat d'escriptura** | Moderada | Molt alta |
| **Esquema** | Fix (migracions) | Flexible (sense migracions) |
| **Maduresa** | Alta (50+ anys) | Moderada (15-20 anys) |
| **Ideal per a** | ERP, financer, CRM | IoT, xarxes socials, caché |

