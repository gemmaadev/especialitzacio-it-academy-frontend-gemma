**Sistemes de gestió de bases de dades (SGBD): Com afecta l'esquema fix vs. dinàmic en l'evolució d'una aplicació?**

## **La diferència fonamental**

En SQL, dissenyes l'esquema primer: taules, camps, relacions, tipus de dades i restriccions. Llavors construeixes l'aplicació al voltant d'aquesta estructura fixa. 

En NoSQL, l'esquema és flexible i el refines amb el temps a mesura que s'afegeixen funcionalitats. Això permet un desenvolupament més ràpid, però també porta reptes.

**Esquema Fix (SQL): control i consistència**

En bases de dades relacionals, tot canvi d'estructura requereix una **migració**: un script SQL que altera la base de dades existent.

| \-- ESTAT INICIAL: la taula usuaris a la v1 de l'aplicacióCREATE TABLE usuaris (  id       INT PRIMARY KEY AUTO\_INCREMENT,  nom      VARCHAR(100) NOT NULL,  email    VARCHAR(255) NOT NULL UNIQUE,  password VARCHAR(255) NOT NULL);\-- 3 MESOS DESPRÉS: la v2 necessita l'avatar i la bio\-- Cal una MIGRACIÓ explícita:ALTER TABLE usuaris  ADD COLUMN avatar\_url  VARCHAR(500) NULL,  ADD COLUMN bio         TEXT         NULL,  ADD COLUMN verifcat    BOOLEAN      NOT NULL DEFAULT FALSE;\-- 6 MESOS DESPRÉS: la v3 necessita les preferènciesALTER TABLE usuaris  ADD COLUMN preferencies JSON NULL;\-- → en PostgreSQL, podem usar JSONB per a camps semi-estructurats\-- Si la taula té 10 milions de files, l'ALTER TABLE pot tardar hores\-- i BLOQUEJAR la taula (downtime\!) → problema greu en producció |
| :---- |

En la pràctica, els canvis d'esquema complexos sovint requereixen que l'aplicació estigui fora de línia o bloquejar les taules de la base de dades, com l'actualització de Wikipedia que va mantenir un bloqueig d'escriptura durant 22 hores.

**Les migracions: la solució organitzada**

La pràctica estàndard és usar una eina de migracions que versiona els canvis d'esquema igual que Git versiona el codi:

| projecte/  migrations/    001\_crear\_taula\_usuaris.sql    002\_afegir\_avatar\_i\_bio.sql    003\_afegir\_preferencies.sql    ← cada migració és irreversible (idealment)    004\_crear\_taula\_seguidors.sql |
| :---- |

| \-- 001\_crear\_taula\_usuaris.sqlCREATE TABLE usuaris (...);\-- 002\_afegir\_avatar\_i\_bio.sqlALTER TABLE usuaris  ADD COLUMN avatar\_url VARCHAR(500) NULL,  ADD COLUMN bio TEXT NULL;\-- Eines populars de migracions:\-- Flyway (Java), Liquibase (Java/Node), Prisma Migrate (TypeScript),\-- Knex.js (Node.js), Sequelize (Node.js), Django migrations (Python) |
| :---- |

| // Prisma (TypeScript): la migació es genera automàticament// Modificas el schema.prisma:model Usuari {  id        Int     @id @default(autoincrement())  nom       String  email     String  @unique  avatarUrl String?   // ← camp nou  bio       String?   // ← camp nou}// npx prisma migrate dev \--name afegir\_avatar\_bio// → genera automàticament el SQL i l'executa |
| :---- |

**Esquema dinàmic (NoSQL): flexibilitat i velocitat**

Les bases de dades NoSQL permeten als developers modificar l'esquema al vol, acomodant nous tipus de dades i estructures sense downtime. 

NoSQL pot emmagatzemar dades no estructurades o semi-estructurades, com JSON, XML, o fitxers binaris, fent-lo ideal per a aplicacions amb formats de dades diversos.

| // MongoDB: no cal migrar, simplement insereixes amb el nou camp// Usuaris existents (sense avatarUrl):{ \_id: ObjectId("..."), nom: "Anna", email: "anna@e.com" }// Nous usuaris (amb avatarUrl):{ \_id: ObjectId("..."), nom: "Gema", email: "gema@e.com", avatarUrl: "https://..." }// Tots dos convivien a la mateixa col·lecció sense cap error// → zero downtime, zero migració, deployment immediat// Però... ara el codi ha de gestionar els dos casos:async function obtenirPerfil(userId: string) {  const usuari \= await db.collection('usuaris').findOne({ \_id: userId });  return {    nom: usuari.nom,    avatarUrl: usuari.avatarUrl || null,  // ← pot ser undefined en usuaris antics\!    bio: usuari.bio || '',                 // ← pot ser undefined\!  };} |
| :---- |

La manca d'un esquema fix permet als developers iterar ràpidament en el model de dades i adaptar-se més fàcilment als canvis en els requisits de l'aplicació. 

L'esquema pot evolucionar amb el temps sense necessitat de modificar totes les dades existents. Nous camps es poden afegir als documents sense afectar els documents existents.

**El problema ocult del NoSQL: l'Esquema Implícit**

Un factor important és que un sistema de base de dades NoSQL no fa complir un esquema global, però el codi de l'aplicació inevitablement ha de fer suposicions sobre l'estructura de les dades emmagatzemades. Com que l'esquema es declara implícitament dins del codi de l'aplicació, les evidències de canvis d'esquema es poden observar analitzant l'historial de canvis del codi.

El NoSQL no elimina l'esquema: l'esquema es trasllada de la base de dades al codi de l'aplicació.

| // El "problema de la múmia": dades de fa 3 anys amb format antic// Versió 1 (2022): estructura simple{ nom: "Anna Garcia" }// Versió 2 (2023): separem nom i cognom{ prenom: "Anna", cognom: "Garcia" }// Versió 3 (2024): afegim segon cognom{ prenom: "Anna", cognom1: "Garcia", cognom2: "Puig" }// 2025: el codi ha de gestionar els 3 formats simultàniament\!function obtenirNomComplet(usuari) {  if (usuari.cognom1) return \`${usuari.prenom} ${usuari.cognom1} ${usuari.cognom2 || ''}\`;  if (usuari.prenom)  return \`${usuari.prenom} ${usuari.cognom}\`;  return usuari.nom;  // ← format antic de 2022}// El codi es complica progressivament → deute tècnic ocult |
| :---- |

**Estratègies per a l'evolució de l'esquema**

### **SQL: Migracions Zero-Downtime**

| \-- El patró "expand-contract" per a migracions sense downtime:\-- FASE 1 (Deploy 1): Afegir el camp nou (sense eliminar l'antic)ALTER TABLE usuaris ADD COLUMN nom\_complet VARCHAR(200) NULL;\-- FASE 2 (Backfill): Poblar el camp nou en segon pla (sense bloquejar)UPDATE usuaris SET nom\_complet \= CONCAT(nom, ' ', cognom)WHERE nom\_complet IS NULLLIMIT 1000;  \-- ← en lots per no bloquejar la taula\-- FASE 3 (Deploy 2): El codi usa el camp nou\-- FASE 4 (Cleanup): Eliminar el camp antic quan tot va béALTER TABLE usuaris DROP COLUMN nom;ALTER TABLE usuaris DROP COLUMN cognom; |
| :---- |

### **NoSQL: Lazy Migration (migració diferida)**

| // En MongoDB, la migració passa en temps d'execució, document a documentasync function obtenirUsuari(id) {  const usuari \= await db.collection('usuaris').findOne({ \_id: id });  // Si el document és el format antic, migrar-lo ara  if (\!usuari.versio || usuari.versio \< 2) {    const actualitzat \= {      ...usuari,      prenom: usuari.nom?.split(' ')\[0\],      cognom: usuari.nom?.split(' ').slice(1).join(' '),      versio: 2    };    await db.collection('usuaris').replaceOne({ \_id: id }, actualitzat);    return actualitzat;  }  return usuari;}// → La migració es fa de manera "lazy" quan l'usuari fa login// → No cal script de migració massiva, però els documents antics//    persisteixen fins que l'usuari torni a accedir |
| :---- |

**Comparativa: fix vs. dinàmic en l'evolució**

| Aspecte | Esquema Fix (SQL) | Esquema Dinàmic (NoSQL) |
| ----- | ----- | ----- |
| **Afegir un camp nou** | ALTER TABLE \+ migració | Simplement inserir el camp |
| **Eliminar un camp** | ALTER TABLE \+ migrar dades | No cal, s'ignora el camp vell |
| **Canviar un tipus** | Complex, pot requerir downtime | Pot haver dades inconsistents |
| **Consistència** | Garantida per la BD | Responsabilitat del codi |
| **Velocitat iteració** | Més lenta (cal pensar l'esquema) | Molt ràpida (MVP, prototips) |
| **Dades heterogènies** | Difícil (NULL o taules extra) | Natural |
| **Deute tècnic** | Visible (migracions) | Ocult (al codi) |
| **Rollback** | Complex però controlat | Molt difícil |

**El punt d'inflexió: PostgreSQL amb JSONB**

Una tendència creixent: usar PostgreSQL amb columnes JSONB per obtenir el millor dels dos mons.

| \-- PostgreSQL: camp JSONB per a dades flexibles dins d'una taula relacionalCREATE TABLE productes (  id           SERIAL PRIMARY KEY,  nom          VARCHAR(255) NOT NULL,  \-- ← camp fix, validat per la BD  preu         DECIMAL(10,2) NOT NULL, \-- ← camp fix, ACID complet  metadades    JSONB                   \-- ← camp flexible, sense esquema);\-- Inserir amb metadades variables per categoriaINSERT INTO productes (nom, preu, metadades) VALUES  ('Portàtil ASUS', 899, '{"ram": "16GB", "cpu": "i7", "pes": "1.5kg"}'),  ('Samarreta', 29,  '{"talla": "M", "color": "blau", "material": "cotó"}');\-- Cercar dins del JSONBSELECT nom FROM productesWHERE metadades-\>\>'ram' \= '16GB';\-- Indexar un camp JSONB per a cerques ràpidesCREATE INDEX idx\_productes\_metadades ON productes USING GIN(metadades); |
| :---- |

La tendència és impulsada pel suport JSON de PostgreSQL: equips que haurien escollit MongoDB per a esquemes flexibles troben que les columnes JSONB de PostgreSQL els donen la mateixa flexibilitat sense renunciar a SQL i les transaccions.

