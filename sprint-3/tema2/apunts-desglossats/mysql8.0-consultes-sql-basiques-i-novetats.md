## **MySQL 8.0: Consultes SQL Bàsiques i Novetats**

###### **MySQL 8.0 Reference Manual** [https://dev.mysql.com/doc/refman/8.0/en/](https://dev.mysql.com/doc/refman/8.0/en/) Manual de referència oficial per a MySQL 8.0, amb sintaxi i guies completes.

**Què és MySQL 8.0**

El MySQL Reference Manual documenta MySQL 8.0 a través de la versió 8.0.46. MySQL és la base de dades open source més popular del món per a aplicacions web. MySQL 8.0 inclou més de 300 funcionalitats noves: Window functions, Common Table Expressions (CTEs), suport millorat per a JSON, GIS Geography, millores en fiabilitat amb DDL atòmic, i millores significatives en observabilitat.

**Les operacions CRUD en MySQL 8.0**

### **CREATE: Crear taules i inserir dades**

| \-- Crear la base de dadesCREATE DATABASE botiga CHARACTER SET utf8mb4 COLLATE utf8mb4\_unicode\_ci;USE botiga;\-- Crear una taulaCREATE TABLE usuaris (  id         INT UNSIGNED AUTO\_INCREMENT PRIMARY KEY,  nom        VARCHAR(100)  NOT NULL,  email      VARCHAR(255)  NOT NULL UNIQUE,  password   CHAR(60)      NOT NULL,         \-- bcrypt sempre 60 caràcters  actiu      BOOLEAN       NOT NULL DEFAULT TRUE,  creat\_at   TIMESTAMP     DEFAULT CURRENT\_TIMESTAMP,  INDEX idx\_email (email)                    \-- índex per cerques per email) ENGINE\=InnoDB DEFAULT CHARSET\=utf8mb4;\-- INSERT: inserir una filaINSERT INTO usuaris (nom, email, password)VALUES ('Anna García', 'anna@exemple.com', '$2b$10$hash...');\-- INSERT múltiple: inserir diverses files alhora (més eficient)INSERT INTO usuaris (nom, email, password) VALUES  ('Gema Puig',  'gema@exemple.com',  '$2b$10$hash2...'),  ('Marc Torres', 'marc@exemple.com', '$2b$10$hash3...');\-- INSERT ... ON DUPLICATE KEY UPDATE: inserir o actualitzar si ja existeixINSERT INTO configuracio (clau, valor)VALUES ('tema', 'fosc')ON DUPLICATE KEY UPDATE valor \= VALUES(valor); |
| :---- |

**READ: Consultar dades amb SELECT**

MySQL ofereix suport complet per a operadors i funcions en el SELECT list i en la clàusula WHERE. Suport complet per a les clàusules GROUP BY i ORDER BY. Suport per a funcions de grup: COUNT(), AVG(), STD(), SUM(), MAX(), MIN(), i GROUP\_CONCAT().

| \-- SELECT bàsic amb filtreSELECT id, nom, emailFROM usuarisWHERE actiu \= TRUEORDER BY nom ASCLIMIT 10 OFFSET 20;   \-- paginació: pàgina 3 de 10 resultats per pàgina\-- SELECT amb funcions agregadesSELECT  COUNT(\*)          AS total\_usuaris,  COUNT(actiu)      AS usuaris\_actius,  MAX(creat\_at)     AS ultim\_registreFROM usuaris;\-- SELECT amb LIKE per a cerques de textSELECT nom, emailFROM usuarisWHERE nom LIKE 'A%'          \-- comença per "A"   OR email LIKE '%@gmail%'; \-- conté "@gmail"\-- SELECT amb IN per a múltiples valorsSELECT \* FROM productesWHERE categoria\_id IN (1, 3, 5)  AND preu BETWEEN 50 AND 200; |
| :---- |

**Els JOINs: combinar taules**

| MySQL suporta la sintaxi JOIN per a la part de les table\_references en sentències SELECT i en sentències DELETE i UPDATE de múltiples taules. En MySQL, JOIN, CROSS JOIN, i INNER JOIN son equivalents sintàctics.\-- INNER JOIN: únics resultats que existeixen en les dues taulesSELECT  c.id          AS comanda\_id,  u.nom         AS client,  c.total,  c.estat,  c.creat\_atFROM comandes cINNER JOIN usuaris u ON c.usuari\_id \= u.idWHERE c.estat \= 'completada'ORDER BY c.creat\_at DESC;\-- LEFT JOIN: tots els usuaris, fins i tot els que no han fet cap comandaSELECT  u.nom,  u.email,  COUNT(c.id) AS total\_comandes,  COALESCE(SUM(c.total), 0) AS total\_gastatFROM usuaris uLEFT JOIN comandes c ON u.id \= c.usuari\_idGROUP BY u.id, u.nom, u.emailORDER BY total\_gastat DESC;\-- JOIN múltiple: tres taulesSELECT  u.nom            AS client,  p.nom            AS producte,  cp.quantitat,  cp.preu\_unitari,  (cp.quantitat \* cp.preu\_unitari) AS subtotalFROM comandes cINNER JOIN usuaris u         ON c.usuari\_id \= u.idINNER JOIN comanda\_producte cp ON c.id \= cp.comanda\_idINNER JOIN productes p       ON cp.producte\_id \= p.idWHERE c.id \= 42; |
| :---- |

**UPDATE i DELETE: modificar i eliminar dades**

| \-- UPDATE: actualitzar files específiquesUPDATE usuarisSET  nom   \= 'Anna García Puig',  email \= 'anna.nova@exemple.com'WHERE id \= 1;\-- UPDATE múltiple: actualitzar molts registres amb condicióUPDATE productesSET preu \= preu \* 0.9           \-- aplicar 10% de descompteWHERE categoria\_id \= 3  AND stock \> 50;\-- DELETE: eliminar files específiques (SEMPRE usar WHERE\!)DELETE FROM sessionsWHERE caducat\_at \< NOW();       \-- netejar sessions expirades\-- TRUNCATE: eliminar TOTES les files (molt més ràpid que DELETE sense WHERE)\-- Atenció: no es pot fer rollback de TRUNCATE\!TRUNCATE TABLE logs\_temporals; |
| :---- |

**Consultes avançades: GROUP BY, HAVING i Subqueries**

| \-- GROUP BY \+ HAVING: agrupar i filtrar grupsSELECT  categoria\_id,  COUNT(\*)         AS total\_productes,  AVG(preu)        AS preu\_mitja,  MIN(preu)        AS preu\_minim,  MAX(preu)        AS preu\_maximFROM productesWHERE actiu \= TRUEGROUP BY categoria\_idHAVING COUNT(\*) \> 5        \-- únics categories amb més de 5 productesORDER BY preu\_mitja DESC;\-- Subquery: consulta dins d'una consultaSELECT nom, emailFROM usuarisWHERE id IN (  SELECT DISTINCT usuari\_id  FROM comandes  WHERE total \> 500    AND creat\_at \>= '2025-01-01');\-- EXISTS: subquery d'existència (sovint més ràpid que IN)SELECT p.nom, p.preuFROM productes pWHERE EXISTS (  SELECT 1 FROM comanda\_producte cp  WHERE cp.producte\_id \= p.id); |
| :---- |

**Novetats de MySQL 8.0: les més rellevants**

### **Common Table Expressions (CTEs) — WITH**

MySQL 8.0 inclou CTEs, tant no recursives com recursives. Els CTEs no recursives es poden explicar com a "derived tables millorades" ja que permeten que la derived table sigui referenciada més d'una vegada.

| \-- CTE: simplifica consultes complexes i reutilitza resultats intermedisWITH comandes\_importants AS (  SELECT usuari\_id, SUM(total) AS total\_acumulat  FROM comandes  WHERE estat \= 'completada'  GROUP BY usuari\_id  HAVING SUM(total) \> 1000)SELECT u.nom, u.email, ci.total\_acumulatFROM usuaris uINNER JOIN comandes\_importants ci ON u.id \= ci.usuari\_idORDER BY ci.total\_acumulat DESC; |
| :---- |

### **Window functions**

MySQL 8.0 introdueix Window Functions, que permeten càlculs analítics sense GROUP BY.

| \-- RANK(): rang per total de comandesSELECT  nom,  total\_comandes,  RANK() OVER (ORDER BY total\_comandes DESC) AS posicio\_rankingFROM (  SELECT u.nom, COUNT(c.id) AS total\_comandes  FROM usuaris u  LEFT JOIN comandes c ON u.id \= c.usuari\_id  GROUP BY u.id, u.nom) totals; |
| :---- |

### **EXPLAIN: optimitzar consultes**

La sentència EXPLAIN proporciona informació sobre com MySQL executa les sentències. Funciona amb SELECT, DELETE, INSERT, REPLACE i UPDATE.

| \-- EXPLAIN: analitzar el pla d'execució d'una consultaEXPLAIN SELECT u.nom, COUNT(c.id)FROM usuaris uLEFT JOIN comandes c ON u.id \= c.usuari\_idGROUP BY u.id;\-- Cercar "type: ALL" (full table scan) → necessita índex\!\-- Cercar "key: NULL" → no usa cap índex → problema de rendiment\-- EXPLAIN ANALYZE (MySQL 8.0.18+): temps real d'execucióEXPLAIN ANALYZE SELECT \* FROM productes WHERE categoria\_id \= 3; |
| :---- |

**Les funcions SQL més útils en MySQL 8.0**

| \-- Funcions de textSELECT CONCAT(nom, ' ', cognom)    AS nom\_complet FROM usuaris;SELECT UPPER(email)                AS email\_majusc FROM usuaris;SELECT LENGTH(descripcio)          AS longitud FROM productes;SELECT SUBSTRING(nom, 1, 10)       AS nom\_curt FROM productes;\-- Funcions de data/horaSELECT NOW()                       AS ara;SELECT CURDATE()                   AS avui;SELECT DATE\_FORMAT(creat\_at, '%d/%m/%Y') AS data\_formatada FROM comandes;SELECT DATEDIFF(NOW(), creat\_at)   AS dies\_desde\_creacio FROM usuaris;\-- Funcions numèriques i de controlSELECT ROUND(preu, 2)              FROM productes;SELECT COALESCE(telefon, 'No informat') AS telefon FROM usuaris;  \-- NULL → valor per defecteSELECT IF(stock \> 0, 'Disponible', 'Esgotat') AS disponibilitat FROM productes; |
| :---- |

**Resum: referència ràpida SQL MySQL 8.0**

| Operació | Sentència | Codi resposta |
| ----- | ----- | ----- |
| Crear taula | `CREATE TABLE` | — |
| Inserir | `INSERT INTO ... VALUES` | Files afectades |
| Llegir | `SELECT ... FROM ... WHERE` | Result set |
| Actualitzar | `UPDATE ... SET ... WHERE` | Files afectades |
| Eliminar | `DELETE FROM ... WHERE` | Files afectades |
| Combinar taules | `INNER / LEFT / RIGHT JOIN` | Result set combinat |
| Agrupar | `GROUP BY ... HAVING` | Grups agregats |
| Analitzar | `EXPLAIN` | Pla d'execució |

