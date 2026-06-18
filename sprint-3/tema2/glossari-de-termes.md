## **Glossari de termes — Introducció a les bases de dades**

**ACID** — Acrònim de les quatre propietats que garanteixen la fiabilitat de les transaccions en una base de dades: Atomicity (o tot o res), Consistency (la BD sempre passa d'un estat vàlid a un altre), Isolation (les transaccions concurrents no s'interfereixen), Durability (els canvis confirmats persisteixen fins i tot si el sistema falla). MySQL i PostgreSQL son ACID compliant. MongoDB ho és des de versions recents.

**Agregació (MongoDB)** — Mecanisme de MongoDB per processar i analitzar dades encadenant etapes (stages) en un pipeline: `$match` (filtrar), `$group` (agrupar), `$sort` (ordenar), `$project` (projeccions). Equivalent als `GROUP BY`, `HAVING` i Window Functions de SQL.

**AlloyDB** — Servei de Google Cloud compatible amb PostgreSQL però amb un motor columnar que accelera consultes analítiques 4-10x. Combina les garanties transaccionals d'un SGBD relacional amb la velocitat d'un data warehouse.

**Anomalia d'Actualització** — Error que ocorre quan una dada apareix en múltiples files i s'actualitza en algunes però no en totes, creant inconsistències. La normalització l'elimina guardant cada fet en un sol lloc.

**Anomalia d'Eliminació** — Error que ocorre quan eliminar un registre esborra accidentalment informació no relacionada. Exemple: si l'única comanda d'un client es guarda a la mateixa taula que les dades del client, eliminar la comanda esborra el client.

**Anomalia d'Inserció** — Error que ocorre quan no es pot inserir una dada parcial. Exemple: no es pot afegir un producte sense que algú el compri si el producte i la comanda son a la mateixa taula.

**Atribut** — Propietat que descriu una entitat. Es converteix en una columna (camp) a la taula. Exemples: `nom`, `email`, `preu`. Tipus especials: atribut clau (PK), derivat (calculat d'altres), compost (divisible en subatributs), multivaluat (múltiples valors → requereix taula separada).

**Atribut Derivat** — Atribut que es calcula a partir d'altres atributs. `edat` es pot derivar de `data_naixement`. Generalment no s'emmagatzema perquè pot quedar desactualitzat; es calcula en el moment de la consulta.

**Aurora (AWS)** — Fork propietari de MySQL/PostgreSQL creat per Amazon. Fins a 5x més ràpid que MySQL estàndard. Emmagatzematge distribuït que creix automàticament fins a 128TB. Alt grau de vendor lock-in: no és compatible 100% amb el motor original.

**BASE (Basically Available, Soft state, Eventually consistent)** — Alternativa al model ACID usada per molts sistemes NoSQL. Prioritza la disponibilitat sobre la consistència forta. Les dades acabaran sent consistents a tots els nodes però hi pot haver un retard.

**BSON (Binary JSON)** — Format d'emmagatzematge intern que usa MongoDB. Extensió de JSON que suporta tipus de dades addicionals (dates, ObjectId, binaris). Més eficient que JSON pur per a operacions de lectura/escriptura.

**Cardinalitat** — El tipus de relació numèrica entre dues entitats. Les tres possibilitats: 1:1 (un a un), 1:N (un a molts, la més freqüent) i N:M (molts a molts, requereix taula pivot).

**Cassandra (Apache)** — SGBD NoSQL de tipus columnar creat per Facebook. Optimitzat per a escriptures massives i distribució global (A+P del Teorema CAP). Usat per Netflix, Apple i Instagram. Ideal per a IoT, sèries temporals i logs massius.

**Clau Composta** — Clau primària formada per la combinació de dues o més columnes. S'usa a les taules pivot de relacions N:M. Exemple: `PRIMARY KEY (comanda_id, producte_id)`.

**Clau Forana (FK — Foreign Key)** — Columna que referencia la clau primària d'una altra taula. Implementa les relacions entre taules i garanteix la integritat referencial: no pots inserir un valor de FK que no existeixi a la taula referenciada.

**Clau Primària (PK — Primary Key)** — Columna o conjunt de columnes que identifica unívocament cada fila d'una taula. Ha de ser única, no nul·la i estable (no canviar mai). Habitualment un `INT AUTO_INCREMENT` o un `UUID`.

**Cloud Spanner** — Servei de Google Cloud únic al mercat: base de dades relacional amb SQL estàndard, ACID complet i escalabilitat horitzontal global. Resol el Teorema CAP d'una manera que cap altre SGBD ha aconseguit (usa rellotges atòmics).

**Consistència Eventual** — Model de consistència de molts sistemes NoSQL distribuïts. Les dades s'acaben propagant a tots els nodes del clúster, però hi pot haver un període breu on nodes diferents mostren versions diferents de les mateixes dades. Acceptable per a xarxes socials, no per a transaccions financeres.

**CTE (Common Table Expression)** — Funcionalitat de MySQL 8.0+ i PostgreSQL que permet definir subconsultes temporals amb nom usant `WITH`. Milloren la llegibilitat i permeten consultes recursives.

**CRUD** — Acrònim de les quatre operacions fonamentals sobre dades: Create (INSERT), Read (SELECT), Update (UPDATE), Delete (DELETE). La base de tota interacció amb una base de dades.

**DB-Engines Ranking** — Rànquing mensual de popularitat de 434 sistemes de gestió de bases de dades. Mesura mencions en motors de cerca, forums, anuncis de feina i xarxes professionals. No mesura usuaris actius. Referència estàndard per a l'estat del mercat.

**DBaaS (Database as a Service)** — Model de servei cloud on un proveïdor gestiona tota la infraestructura de la base de dades (hardware, software, backups, patches, alta disponibilitat) mentre el client es centra en l'esquema i el codi. Exemples: AWS RDS, MongoDB Atlas, Firebase, Supabase.

**Dependència Parcial** — Violació de la 2FN. Un atribut no clau depèn únicament d'una part de la clau primària composta. Exemple: `nom_client` depèn únicament de `comanda_id` d'una PK composta `(comanda_id, producte_id)`.

**Dependència Transitiva** — Violació de la 3FN. Un atribut no clau depèn d'un altre atribut no clau. Exemple: `empleat_id → dept_id → dept_nom`. `dept_nom` no depèn directament de `empleat_id` sinó de `dept_id`.

**Desnormalització** — El procés intencionat de violar les formes normals per millorar el rendiment de lectures. Justificada quan les consultes son molt freqüents i els JOINs son costosos. Exemple clàssic: guardar `preu_unitari` a `linies_comanda` per preservar el preu en el moment de la compra.

**Disseny Conceptual** — Primera etapa del disseny de BD. Crea un blueprint visual (ERD) independent de qualsevol tecnologia específica. Identifica entitats, atributs i relacions. Llegible per a qualsevol persona, tècnica o no.

**Disseny Físic** — Tercera etapa del disseny de BD. Implementa el model lògic en un SGBD concret (MySQL, PostgreSQL). Defineix tipus de dades exactes, índexs, particionament i configuració de rendiment.

**Disseny Lògic** — Segona etapa del disseny de BD. Converteix el model conceptual en un model relacional concret: taules, columnes, claus primàries i foranes. Independent del SGBD però ja en termes relacionals.

**Embedding (MongoDB)** — Estratègia de modelatge NoSQL on els documents relacionats s'emmagatzemen dins d'un sol document pare. Evita JOINs i millora el rendiment de lectura. Ideal quan les dades s'accedeixen sempre juntes i no cal consultar-les independentment.

**Engine InnoDB** — Motor d'emmagatzematge per defecte de MySQL que proporciona suport per a transaccions ACID, claus foranes, i row-level locking. L'alternativa, MyISAM, no suporta transaccions ni FK.

**Entitat** — Concepte del món real sobre el qual volem emmagatzemar informació. Es converteix en una taula al model relacional. Identificada pels substantius als requisits del sistema.

**Entitat Feble** — Entitat que no té clau primària pròpia i depèn d'una entitat forta per existir. Exemple: `LiniaComanda` depèn de `Comanda`. La seva clau es forma combinant la PK de l'entitat forta amb una clau parcial pròpia.

**Entitat Forta** — Entitat que té la seva pròpia clau primària i pot existir de manera independent. La majoria d'entitats d'un sistema son fortes. Exemple: `Usuari`, `Producte`, `Categoria`.

**ERD (Entity-Relationship Diagram)** — Diagrama que representa visualment les entitats, els seus atributs i les relacions entre elles. Resultat del disseny conceptual. Eina de comunicació entre developers i stakeholders no tècnics.

**Failover** — Procés automàtic on un sistema de bases de dades commuta a una rèplica secundària quan el node principal falla. Garanteix l'alta disponibilitat. Típicament en configuracions Multi-AZ als serveis DBaaS.

**Firebase Firestore** — BD NoSQL documental de Google, completament serverless i de pagament per ús. Molt popular per a aplicacions mòbils. Alt grau de vendor lock-in per la seva API propietària.

**Flyway / Liquibase / Prisma Migrate** — Eines de gestió de migracions de bases de dades. Versionen els canvis d'esquema com Git versiona el codi, permetent aplicar, revertir i rastrejar cada modificació de l'estructura de la BD.

**Forma Normal** — Cada un dels estàndards de disseny de bases de dades que eliminen un tipus específic d'anomalia. Les tres principals: 1FN (valors atòmics), 2FN (dependències totals), 3FN (sense dependències transitives).

**GROUP BY** — Clàusula SQL que agrupa files amb valors idèntics en un camp per aplicar funcions agregades: `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`. S'usa conjuntament amb `HAVING` per filtrar els grups.

**HAVING** — Clàusula SQL que filtra grups creats per `GROUP BY`. Equivalent al `WHERE` però per a grups. `WHERE` filtra files individuals, `HAVING` filtra grups agregats.

**Herència (SQL)** — Concepte on una taula fill hereta l'estructura d'una taula pare via clau forana. No és herència directa com a POO, sinó una relació 1:1 on la fila fill referencia la fila pare.

**Índex** — Estructura de dades addicional que accelera les cerques en una columna a costa d'espai d'emmagatzematge i velocitat d'escriptura. `EXPLAIN` en MySQL mostra si una consulta usa índex o fa un full table scan (molt lent).

**InnoDB** — Veure *Engine InnoDB*.

**JOIN** — Operació SQL que combina files de dues o més taules basant-se en una condició de relació. Tipus principals: `INNER JOIN` (únicament files que coincideixen en les dues taules), `LEFT JOIN` (totes les files de la taula esquerra, coincideixin o no), `RIGHT JOIN`, `FULL OUTER JOIN`.

**JSONB** — Tipus de dades de PostgreSQL que emmagatzema JSON en format binari optimitzat. Permet cerques, índexs i consultes dins del document JSON. Proporciona la flexibilitat de NoSQL amb les garanties ACID de PostgreSQL.

**Lazy Migration** — Estratègia de migració d'esquema en NoSQL. En lloc de migrar tots els documents d'un cop, la migració es fa "diferida": cada document s'actualitza al nou format quan s'accedeix per primera vegada.

**MariaDB** — Fork open source de MySQL creat quan Oracle va adquirir MySQL. Compatible amb MySQL però amb algunes extensions pròpies. Popular en entorns self-hosted. \#13 al DB-Engines Ranking juny 2026\.

**Migració (SQL)** — Script SQL que modifica l'estructura d'una base de dades existent (ALTER TABLE, CREATE TABLE, DROP COLUMN...). Ha de ser versionada, irreversible idealment, i executada de manera controlada.

**MongoDB** — SGBD NoSQL documental lider del mercat (\#5 DB-Engines juny 2026). Emmagatzema dades en documents BSON (JSON binari). Esquema flexible, Aggregation Pipeline potent, suport ACID multi-document des de la versió 4.0. Stack MERN.

**Motor de BD** — El component intern d'un SGBD que gestiona com s'emmagatzemen i recuperen les dades físicament. MySQL suporta múltiples motors: InnoDB (per defecte, ACID), MyISAM (llegacy, sense transaccions).

**Multi-AZ** — Configuració de bases de dades al cloud on la instància principal té una rèplica sincronitzada en una zona de disponibilitat diferent. Proporciona alta disponibilitat i failover automàtic. Dobla el cost al AWS RDS.

**Neo4j** — SGBD de bases de dades de graf lider del mercat (\#20 DB-Engines). Emmagatzema nodes (entitats) i arestes (relacions) de manera nativa. Molt eficient per a recorreguts de xarxa complexos. Ideal per a xarxes socials, sistemes de recomanació i detecció de frau.

**Normalització** — Procés de disseny que organitza les taules per eliminar la redundància i les anomalies de dades. S'aplica progressivament: primer s'assoleix la 1FN, després la 2FN, i finalment la 3FN.

**ObjectId** — Tipus d'identificador únic de MongoDB. Generat automàticament pel driver o el servidor. De 12 bytes: 4 bytes de timestamp \+ 5 bytes d'identificador del procés \+ 3 bytes de comptador. Equivalent a `AUTO_INCREMENT` en SQL però distribuïble.

**Particionament (Sharding)** — Tècnica per dividir les dades d'una BD gran entre múltiples servidors. Cada servidor gestiona un "shard" (fragment) de les dades. Implementa l'escalabilitat horitzontal en sistemes NoSQL com MongoDB i Cassandra.

**PostgreSQL** — SGBD relacional open source (\#4 DB-Engines juny 2026, l'únic dels top 4 amb tendència positiva). Funcionalitats avançades: JSONB, PostGIS, Window Functions, CTEs, índexs parcials. ACID compliant. Usat per Apple, Instagram, Reddit.

**Princple de Mínima Redundància** — Regla fonamental del disseny de BD: cada peça d'informació s'emmagatzema en un sol lloc. Si cal en dos llocs, s'usa una clau forana, no una còpia.

**Problema de la Múmia** — Situació en bases de dades NoSQL on conviuen documents de formats antics i nous (de diverses versions de l'aplicació). El codi ha de gestionar tots els formats simultàniament, creant deute tècnic ocult.

**Redis** — SGBD NoSQL clau-valor in-memory (\#8 DB-Engines juny 2026). Operacions en microsegons. Suporta múltiples estructures: strings, hashes, lists, sets, sorted sets, streams. Usat per GitHub, Pinterest, Snapchat. Pot persistir dades amb RDB (snapshots) o AOF (append-only file).

**Referencing (MongoDB)** — Estratègia de modelatge NoSQL on en lloc d'embedar un document dins d'un altre, es guarda l'`_id` del document relacionat (equivalent a una FK). Necessita dues consultes però és millor quan els documents relacionats son grans o s'accedeixen independentment.

**Registre** — Cada fila d'una taula relacional. Representa una instància concreta d'una entitat. Equivalent al "document" en MongoDB.

**Relació** — Connexió entre dues entitats basada en un verb dels requisits: "els usuaris **fan** comandes". Es tradueix en FK (per a 1:N) o en una taula pivot (per a N:M).

**Rènquing DB-Engines** — Veure *DB-Engines Ranking*.

**Sharding** — Veure *Particionament*.

**Snowflake** — Plataforma de data warehouse al cloud (\#6 DB-Engines juny 2026, en fort creixement). Model de pagament per ús, separació d'emmagatzematge i còmput. Usat principalment per a analítica i Business Intelligence, no per a OLTP.

**SQL (Structured Query Language)** — Llenguatge de programació específic de domini per a consultar i manipular bases de dades relacionals. Estàndard ISO. Les quatre operacions principals: SELECT, INSERT, UPDATE, DELETE. Addicionalment: DDL (CREATE, ALTER, DROP) i DCL (GRANT, REVOKE).

**SQLite** — SGBD relacional serverless i autocontingut. La BD és un sol fitxer. No requereix instal·lació ni servidor. Usat per a aplicacions mòbils (iOS, Android), navegadors (Chrome, Firefox) i testing.

**Supabase** — Plataforma DBaaS open source basada en PostgreSQL. Inclou autenticació, API REST auto-generada, emmagatzematge d'objectes i subscripcions en temps real. Alternativa popular a Firebase sense vendor lock-in.

**Taula** — Estructura fonamental d'una BD relacional. Organitzada en files (registres) i columnes (camps). Cada taula representa una entitat del domini. Equivalent a la "col·lecció" en MongoDB.

**Taula Pivot (Junction Table)** — Taula intermèdia que implementa una relació N:M. Conté dues claus foranes (una a cada taula relacionada) i pot tenir atributs addicionals de la relació (`quantitat`, `preu_unitari`).

**Teorema CAP** — Propietat fonamental de sistemes distribuïts: cap sistema pot garantir simultàniament Consistència, Disponibilitat i Tolerància a Particions de xarxa. Tota BD distribuïda ha d'escollir dos dels tres. MySQL \= C+A, MongoDB \= C+P, Cassandra \= A+P.

**Transacció** — Conjunt d'operacions que s'executen com una unitat atòmica: o totes s'apliquen o cap. `BEGIN TRANSACTION` ... `COMMIT` (o `ROLLBACK` si falla). Garanteix ACID en operacions críticament dependents.

**Vendor Lock-in** — El grau de dependència que crea un proveïdor cloud per dificultar la migració a un competidor. Escala: Supabase/Railway (baix) → RDS/Atlas (mig) → Aurora/Spanner (alt) → Firebase/DynamoDB/Cosmos DB (molt alt, APIs propietàries).

**Window Function** — Funcionalitat de MySQL 8.0+ i PostgreSQL per a càlculs analítics sobre conjunts de files relacionades sense col·lapsar les files en grups. `RANK()`, `ROW_NUMBER()`, `LAG()`, `LEAD()`. Permeten rankings i anàlisis de sèries temporals directament en SQL.  
