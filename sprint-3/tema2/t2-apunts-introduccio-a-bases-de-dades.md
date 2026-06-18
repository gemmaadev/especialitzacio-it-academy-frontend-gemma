## **Apunts T2 — Introducció a les bases de dades**

**1\. Disseny de bases de dades: del requisit a la taula**

El disseny d'una base de dades segueix tres etapes progressives. 

1. **Conceptual** (independent de la tecnologia): identifica entitats, atributs i relacions en un ERD llegible per qualsevol persona.   
2. **Lògic** (model relacional): converteix el ERD en taules amb claus primàries i foranes.  
3. **Físic** (SQL específic): defineix tipus de dades exactes, índexs i motor de BD.

La tècnica pràctica per traduir requisits: **substantius → entitats**, **descripcions → atributs**, **verbs → relacions**.

| Requisit: "Els usuaris fan comandes de productes"  → usuaris, comandes, productes    ← entitats (taules)  → "fan" (1 usuari → N comandes)   ← relació 1:N → FK a comandes  → "de" (N comandes ↔ M productes) ← relació N:M → taula intermèdia |
| :---- |

**Les tres cardinalitats:**

* **1:1** — poc freqüent. Un usuari té un perfil.  
* **1:N** — la més freqüent. Un client té moltes comandes.  
* **N:M** — requereix taula pivot. Una comanda conté molts productes, un producte apareix en moltes comandes.

**Entitat forta** — té PK pròpia, existeix sola (`Usuari`). **Entitat feble** — depèn d'una altra per existir (`LiniaComanda` depèn de `Comanda`).

**2\. Normalització: evitar anomalies**

Sense normalització apareixen tres anomalies: **inserció** (no pots afegir un producte sense una comanda), **actualització** (si un email apareix en 10.000 files, cal actualitzar 10.000 files), **eliminació** (eliminar l'única comanda d'un client esborra les dades del client).

**1FN** — valors atòmics, una clau primària. Elimina grups repetitius.

**2FN** — tot depèn de TOTA la PK composta. Elimina dependències parcials. `(comanda_id, producte_id) → preu` ✅ però `comanda_id → nom_client` ❌.

**3FN** — tot depèn DIRECTAMENT de la PK. Elimina dependències transitives. `empleat_id → dept_id → dept_nom` ❌, cal extreure departaments a una taula pròpia.

| \-- Resultat de la normalització: de 1 taula enorme a 5 taules ben estructuradesclients (id PK, nom, email UNIQUE)comandes (id PK, client\_id FK, estat, total, creat\_at)linies\_comanda (comanda\_id FK, producte\_id FK, quantitat, preu\_unitari)productes (id PK, nom, preu, cat\_id FK)categories (id PK, codi UNIQUE, nom) |
| :---- |

La desnormalització justificada: guardar `preu_unitari` a `linies_comanda` és intencional — el preu en el moment de la compra ha de persistir fins i tot si el producte canvia de preu.

**3\. Models no relacionals (NoSQL)**

NoSQL no és un reemplaçament de SQL sinó una eina diferent per a problemes diferents. "Not Only SQL": es poden usar els dos junts.

**Els quatre models:**

| Model | Motor | Estructura | Ideal per a |
| ----- | ----- | ----- | ----- |
| **Documental** | MongoDB | JSON/BSON | Catàlegs, CMS, MERN |
| **Clau-Valor** | Redis | key → value | Caché, sessions, cues |
| **Columnar** | Cassandra | Columnes per partició | IoT, sèries temporals |
| **Graf** | Neo4j | Nodes \+ arestes | Xarxes socials, recomanacions |

**Avantatges clau:** escalabilitat horitzontal (afegeixes servidors, no actualitzes la màquina), esquema dinàmic (insereixes documents amb camps nous sense ALTER TABLE, zero downtime), i velocitat en lectures/escriptures massives.

**El teorema CAP:** tota BD distribuïda escull 2 de 3 (Consistència, Disponibilitat, Tolerància a Particions). MySQL \= C+A, MongoDB \= C+P, Cassandra \= A+P.

**4\. SQL vs. NoSQL: la decisió**

| ESCULL SQL quan:  → Transaccions financeres o inventari (ACID crític)  → Dades amb relacions complexes predefinides  → Consultes analítiques riques (GROUP BY, JOINs, Window Functions)ESCULL NoSQL quan:  → Dades no estructurades o esquema que canvia sovint (MVP, startups)  → Escalabilitat horitzontal a milions d'usuaris  → Velocitat extrema (Redis: microsegons)  → Documents JSON naturals (MongoDB)La combinació habitual a producció:  PostgreSQL (dades principals) \+ Redis (caché \+ sessions) |
| :---- |

**5\. SGBD: MySQL, PostgreSQL, MongoDB, Redis**

* **MySQL (\#2 DB-Engines juny 2026, 856 pts)** — el cavall de batalla del web. ACID via InnoDB, ideal per a WordPress/PHP, gran ecosistema. Declivi gradual en nous projectes.  
* **PostgreSQL (\#4, 688 pts, ÚNIC en creixement \+7.58)** — el SGBD relacional preferit per a nous projectes el 2026\. JSONB per a dades semi-estructurades, PostGIS per a geoespacials, Window Functions, CTEs. Usat per Apple, Instagram, Reddit. La bretxa amb MySQL segueix reduint-se.  
* **MongoDB (\#5, 387 pts)** — líder indiscutible NoSQL. Documents BSON amb estructura anidada, esquema flexible, Aggregation Pipeline potent. Stack MERN (MongoDB, Express, React, Node.js). ACID complet afegit a versions recents.  
* **Redis (\#8, 150 pts)** — in-memory, operacions en microsegons. Estàndard de facto per a caché, sessions, rate limiting, pub/sub i cues lleugeres. Multilmodel: key-value, document, graf, search, time series, vector.

**6\. Esquema fix vs. dinàmic en l'evolució**

L'esquema fix (SQL) requereix migracions per a qualsevol canvi estructural. Visible, controlada, però `ALTER TABLE` en producció pot bloquejar la taula hores.

L'esquema dinàmic (NoSQL) permet inserir camps nous immediatament. Zero downtime. Però l'esquema es desplaça al codi de l'aplicació — el "problema de la múmia": dades de formats antics convivint amb formats nous que el codi ha de gestionar.

| // NoSQL: el codi ha de gestionar formats anticsfunction obtenirNomComplet(usuari) {  if (usuari.cognom1) return \`${usuari.prenom} ${usuari.cognom1}\`;  if (usuari.prenom)  return \`${usuari.prenom} ${usuari.cognom}\`;  return usuari.nom;  // ← format de fa 3 anys} |
| :---- |

**La tendència 2025-2026:** PostgreSQL \+ JSONB — el millor dels dos mons. Camp JSONB per a atributs variables, SQL per a dades relacionals crítiques, tot en un sol SGBD amb ACID complet.

**7\. MySQL 8.0: consultes SQL essencials**

| \-- CREATE TABLECREATE TABLE usuaris (  id       INT UNSIGNED AUTO\_INCREMENT PRIMARY KEY,  nom      VARCHAR(100) NOT NULL,  email    VARCHAR(255) NOT NULL UNIQUE,  creat\_at TIMESTAMP DEFAULT CURRENT\_TIMESTAMP) ENGINE\=InnoDB DEFAULT CHARSET\=utf8mb4;\-- CRUD bàsicINSERT INTO usuaris (nom, email) VALUES ('Anna', 'anna@e.com');SELECT nom, email FROM usuaris WHERE actiu \= TRUE ORDER BY nom LIMIT 10;UPDATE usuaris SET nom \= 'Anna García' WHERE id \= 1;DELETE FROM sessions WHERE caducat\_at \< NOW();\-- JOIN: combinar taulesSELECT u.nom, COUNT(c.id) AS comandesFROM usuaris uLEFT JOIN comandes c ON u.id \= c.usuari\_idGROUP BY u.idHAVING COUNT(c.id) \> 5;\-- Novetats MySQL 8.0\-- CTEs (WITH): consultes llegibles i reutilitzablesWITH clients\_vip AS (  SELECT usuari\_id, SUM(total) AS total\_acumulat  FROM comandes GROUP BY usuari\_id HAVING SUM(total) \> 1000)SELECT u.nom, cv.total\_acumulat FROM usuaris uJOIN clients\_vip cv ON u.id \= cv.usuari\_id;\-- EXPLAIN: analitzar rendimentEXPLAIN SELECT \* FROM productes WHERE categoria\_id \= 3;\-- Buscar "type: ALL" → full table scan → cal índex\! |
| :---- |

**8\. MongoDB: conceptes essencials**

| // CRUD en MongoDB (Node.js Driver)const { MongoClient } \= require('mongodb');// INSERTawait db.collection('productes').insertOne({  nom: 'Portàtil', preu: 899,  specs: { ram: '16GB', cpu: 'i7' }  // estructura anidada nativa});// READ: filtres i projeccionsconst producte \= await db.collection('productes').findOne(  { preu: { $lt: 1000 } },              // filtre: preu \< 1000  { projection: { nom: 1, preu: 1 } }  // projecció: únicament nom i preu);// AGGREGATION PIPELINE: anàlisi de dadesconst resultat \= await db.collection('comandes').aggregate(\[  { $match: { estat: 'completada' } },      // filtra  { $group: { \_id: '$categoria',            // agrupa      total: { $sum: '$import' } } },  { $sort: { total: \-1 } }                  // ordena\]).toArray(); |
| :---- |

**9\. DBaaS: els tres grans proveïdors**

* **AWS RDS** (2009, el veteran) — màxima flexibilitat i ecosistema. 6+ motors, integració profunda amb AWS (S3, Lambda, CloudWatch). Aurora: fork propietari 5x més ràpid. Reserved Instances: fins a 69% descompte.  
* **Google Cloud SQL** — simplicitat operacional, escalat a zero (serverless). AlloyDB: PostgreSQL \+ motor columnar analític 4-10x més ràpid. Cloud Spanner: únic SGBD relacional amb ACID \+ escalat horitzontal global.  
* **Azure SQL** — ecosistema Microsoft (.NET, Power BI, Azure DevOps). Cosmos DB: multi-model, distribució global, \<10ms latència. Elastic Pools per compartir recursos.  
* **Els compromisos del DBaaS:** avantatges (zero hardware, backups automàtics, HA/failover, patches, certificacions SOC2/HIPAA), desavantatges (cost creixent a escala, pèrdua de control sobre configuració avançada, finestres de manteniment programades, sobirania de dades GDPR).  
* **Vendor lock-in:** baix (Supabase, Railway — PostgreSQL estàndard) → mitjà (RDS, Atlas) → alt (Aurora, Spanner) → molt alt (Firebase, DynamoDB, Cosmos DB — APIs propietàries).

**10\. El DB-Engines Ranking: estat del mercat (juny 2026\)**

El rànquing de 434 sistemes revela les tendències clau: Oracle/MySQL/SQL Server dominen en nombres absoluts però estan en declivi. 

PostgreSQL és l'únic dels top 4 que creix (+7.58 punts). Databricks és el de major creixement (+52.91, de \#12 a \#7 en un any). 

MongoDB manté el lideratge NoSQL indiscutible. Redis és estàndard de facto per a caché.

Disseny  
  → Requisits → ERD (entitats, atributs, relacions, cardinalitat)  
  → Conceptual → Lògic → Físic  
  → Normalització: 1FN (atòmic) → 2FN (dep. total PK) → 3FN (no transitiu)

SGBD Relacionals (SQL)  
  → MySQL: web, WordPress, PHP, senzill  
  → PostgreSQL: modern, creixent, JSONB, analítica avançada  
  → Esquema fix \+ migracions versionades (Prisma, Flyway)

SGBD No Relacionals (NoSQL)  
  → MongoDB: documents JSON, stack MERN, esquema flexible  
  → Redis: in-memory, caché, sessions, microsegons  
  → Cassandra: IoT, big data, escriptures massives  
  → Escalabilitat horitzontal, consistència eventual, Teorema CAP

DBaaS  
  → AWS RDS, Google Cloud SQL, Azure SQL  
  → Compromisos: cost, control, seguretat, vendor lock-in  
  → Recomanació per a nous projectes: PostgreSQL (Supabase/Neon) \+ Redis

