**Sistemes de gestió de bases de dades (SGBD): Quins factors determinen l'elecció entre SGBD relacionals (MySQL, PostgreSQL) i no relacionals (MongoDB, Redis)?**

**Relational vs. Non-Relational Databases**  
[https://www.mongodb.com/resources/compare/relational-vs-non-relational-databases](https://www.mongodb.com/resources/compare/relational-vs-non-relational-databases)  
Article de MongoDB sobre les diferències entre models de bases de dades relacionals i no relacionals.

   
**El principi fonamental**

Les bases de dades relacionals emmagatzemen dades en format tabular com a files i columnes. Les relacions entre dades es defineixen usant múltiples taules. Les bases de dades no relacionals no segueixen una estructura rígida i son adequades per emmagatzemar grans quantitats de dades de tipus diferent en una sola vista.

La pregunta no és "quina és millor" sinó "quina s'adapta millor al problema concret". Els sistemes reals sovint usen més d'una: PostgreSQL per a dades principals \+ Redis per a caché \+ MongoDB per a contingut.

**MySQL: el cavall de batalla del web**

MySQL domina les càrregues de treball de WordPress i PHP. Si estàs desplegant WordPress, l'elecció ja està feta. MySQL roman dominant en nombres absoluts a causa de WordPress.

| \-- MySQL: sintaxi senzilla, velocitat alta en lectures simplesSELECT u.nom, COUNT(c.id) as total\_comandesFROM usuaris uLEFT JOIN comandes c ON u.id \= c.usuari\_idGROUP BY u.id; |
| :---- |

**Característiques clau:**

* ACID compliant (via motor InnoDB per defecte)  
* Excel·lent per a lectures simples i aplicacions web estàndard  
* Gran ecosistema: phpMyAdmin, Laragon, WordPress, Drupal  
* Més fàcil de configurar que PostgreSQL  
* Rendiment decreix en consultes molt complexes

**Casos d'ús ideals:** WordPress, Magento, aplicacions web amb PHP, sistemes de contingut, comerç electrònic de mida mitjana.

**PostgreSQL: el SGBD de nova generació**

Escull PostgreSQL si esperes consultes complexes, indexació avançada, funcionalitats SQL més riques, o vols una opció sòlida per defecte per a backends d'aplicacions modernes. PostgreSQL és el SGBD de més ràpid creixement entre projectes nous.

Com MySQL, PostgreSQL és completament ACID-compliant, assegurant que totes les transaccions de la base de dades es processen de manera fiable. Això és important per a aplicacions on la integritat de les dades és crucial, com sistemes bancaris o de salut.

| \-- PostgreSQL: funcionalitats avançades que MySQL no té\-- JSONB: documents JSON com a columna d'una taula relacionalSELECT p.nom, p.metadades-\>\>'color' as colorFROM productes pWHERE p.metadades @\> '{"disponible": true}';\-- Window Functions: anàlisi avançadaSELECT nom, salari,       RANK() OVER (PARTITION BY departament\_id ORDER BY salari DESC) as rankingFROM empleats;\-- PostGIS: dades geoespacialsSELECT nom FROM restaurantsWHERE ST\_DWithin(ubicacio, ST\_Point(2.173, 41.385), 1000);\-- → restaurants a menys d'1km de la Sagrada Família |
| :---- |

Estable en transaccions: compleix les regles ACID. Opcions personalitzades: permet usar JSONB, PostGIS, i els teus propis tipus de dades. Gestiona molts usuaris: MVCC permet múltiples usuaris sense conflicte. Usat per Apple, Instagram, Reddit, i sistemes de mapeig.

**Casos d'ús ideals:** sistemes financers, aplicacions amb consultes analítiques complexes, dades geoespacials, backends Node.js/Python/Go moderns, qualsevol cas on la integritat ACID és crítica.

**MongoDB: flexibilitat documental**

MongoDB és una base de dades de documents. Les dades s'emmagatzemen en col·leccions com a documents BSON, que son similars a JSON en estructura. Les dades es consideren no estructurades perquè una col·lecció pot contenir documents amb camps i tipus de dades diferents, permetent una alta flexibilitat.

| // MongoDB: estructura de dades natural per a aplicacions JavaScript// No cal JOIN: tot el que necessites és en un sol documentdb.productes.findOne({ \_id: ObjectId("...") })// Retorna:{  \_id: ObjectId("..."),  nom: "Portàtil ASUS",  preu: 899,  especificacions: {    ram: "16GB", cpu: "Intel i7", emmagatzematge: "512GB SSD"  },  imatges: \["url1.jpg", "url2.jpg"\],  valoracions: \[    { usuari: "Anna", puntuacio: 5, comentari: "Excel·lent\!" }  \]}// En SQL: 4-5 taules \+ JOINs complexos per obtenir el mateix |
| :---- |

Suport feble a les transaccions: el suport ACID complet va arribar en versions posteriors. Necessita memòria: els documents grans i els índexs usen més RAM. No és adequat per a joins: es pot fer però és més lent que SQL.

Les desplegaments de MongoDB tendeixen a ser o molt petits (prototips, projectes personals) o molt grans (arquitectures orientades a events amb milions de documents). El punt mig — aplicacions web de mida mitjana — és on MongoDB crea més fricció, perquè aquestes aplicacions eventualment necessiten joins i transaccions.

**Casos d'ús ideals:** catàlegs de productes amb atributs variables, CMS, dades IoT, prototips ràpids, stack MERN (MongoDB, Express, React, Node.js).

**Redis: velocitat en memòria**

Redis és un magatzem de dades en memòria de clau-valor de codi obert (BSD), que es pot usar com a base de dades, caché o message broker. És una base de dades NoSQL usada a GitHub, Pinterest i Snapchat.

Redis s'usa habitualment com a caché, magatzem de sessions, limitador de taxa (rate limiter), cua, o comptador en temps real. Pot persistir usant snapshots (RDB) o logging append-only (AOF). El millor per a: accelerar les lectures, reduir la càrrega de la BD, funcionalitats en temps real.

| // Redis en Node.js: operacions en microsegonsimport { createClient } from 'redis';const redis \= createClient();// Caché: evitar consultes repetides a la BDasync function obtenirProducte(id: string) {  const cache \= await redis.get(\`producte:${id}\`);  if (cache) return JSON.parse(cache);  // ← \< 1ms\!  const producte \= await db.query(\`SELECT \* FROM productes WHERE id \= ?\`, \[id\]);  await redis.setEx(\`producte:${id}\`, 3600, JSON.stringify(producte));  // TTL: 1h  return producte;  // ← primera vegada: 50ms, les següents: \<1ms}// Sessions: emmagatzemar sessió d'usuariawait redis.setEx(\`sessio:${sessionId}\`, 86400, JSON.stringify({ usuariId: 42 }));// Rate limiting: màxim 100 peticions per minutconst count \= await redis.incr(\`rateLimit:${ip}\`);if (count \=== 1) await redis.expire(\`rateLimit:${ip}\`, 60);if (count \> 100) return res.status(429).send('Too Many Requests');// Cua de tasques simplesawait redis.lPush('cua:emails', JSON.stringify({ a: 'anna@e.com', missatge: '...' })); |
| :---- |

**Casos d'ús ideals:** caché de consultes freqüents, sessions d'usuari, rate limiting, rankings en temps real, cues de missatgeria lleugeres, pub/sub.

**El Factor ACID: la decisió més important**

ACID significa Atomicity, Consistency, Isolation, and Durability. Atomicity: o es confirma la transacció completa o cap transacció. Consistency: manteniment de les restriccions d'integritat de dades. Isolation: les lectures i escriptures d'una transacció no es veuen afectades per una altra. Durability: els commits exitosos s'implementen permanentment.

NECESSITES ACID COMPLET?  
  → Sí (transaccions financeres, comandes, inventari) → MySQL o PostgreSQL

  Exemples on ACID és crític:  
  "Un pagament ha de: debitar el compte A I abonar el compte B.  
   Si qualsevol operació falla, cap de les dues s'ha de fer."

POTS ACCEPTAR CONSISTÈNCIA EVENTUAL?  
  → Sí (xarxes socials, analytics, IoT) → MongoDB, Cassandra

  Exemples on és acceptable:  
  "No passa res si el 'like' d'Instagram tarda 1 segon a   
   aparèixer a tots els servidors del món."

**Comparativa de les 4 eines**

| Factor | MySQL | PostgreSQL | MongoDB | Redis |
| ----- | ----- | ----- | ----- | ----- |
| **Tipus** | Relacional | Relacional | Documental | Clau-Valor |
| **ACID** | ✅ Complet | ✅ Complet | ⚠️ Limitat (millora) | ⚠️ Operació única |
| **Esquema** | Fix | Fix \+ JSONB flexible | Flexible | Cap |
| **Escalabilitat** | Vertical | Vertical \+ Sharding | Horitzontal | Horitzontal |
| **Velocitat** | Bona | Bona (complexa) | Molt bona | Excepcional |
| **Joins** | ✅ Excel·lent | ✅ Excel·lent | ❌ No natiu | ❌ No |
| **JSON nadiu** | ⚠️ Limitat | ✅ JSONB excel·lent | ✅ Natiu | ❌ No |
| **Persistència** | Disc | Disc | Disc | Memòria \+ Disc |
| **Cas d'ús** | Web, WordPress | Analítica, APIs | Catàlegs, CMS | Caché, Sessions |

**Diagrama de decisió**

Necessito transaccions ACID estrictes (financer, inventari)?  
  SÍ → MySQL o PostgreSQL  
       → Consultes complexes, anàlisi, geoespacial? → PostgreSQL  
       → Web simple, WordPress, PHP? → MySQL

Necessito escalar horitzontalment a milions de documents?  
  SÍ → Les dades son documents JSON naturals? → MongoDB  
       → Necessito escriptures massives i sèries temporals? → Cassandra

Necessito velocitat extrema en memòria?  
  SÍ → Sessions, caché, rate limiting? → Redis  
       → Cues i pub/sub? → Redis

Realitat: la majoria d'aplicacions web modernes usen:  
  PostgreSQL (o MySQL) \+ Redis  
  → BD principal: PostgreSQL per a les dades  
  → Redis per a caché, sessions i temps real  
