## **Disseny de bases de dades: Quines són les etapes del disseny (conceptual, lògic, físic) i com s'eviten anomalies?**

**Normalització de bases de dades (1FN a 3FN)**  
Explicació pas a pas dels processos de normalització fins a la 3a forma normal.  
[https://www.guru99.com/database-normalization.html](https://www.guru99.com/database-normalization.html) 

**Les tres etapes del disseny**

En la fase conceptual es crea un blueprint visual d'alt nivell de la base de dades, independent de qualsevol implementació de software específica. Això el fa fàcil d'entendre per a stakeholders no tècnics. 

Els dissenyadors typically usen models Entity-Relationship (ER) o diagrames UML per identificar entitats, mapejar relacions, i definir restriccions com les claus primàries.

### **Etapa 1: Disseny conceptual**

El "què existeix" sense preocupar-se de com s'implementarà. El resultat és un ERD (Diagrama Entitat-Relació) llegible per qualsevol persona, tècnica o no.

| DISSENY CONCEPTUAL: independent de la tecnologiaEntitats identificades:      Usuari, Comanda, Producte, CategoriaRelacions identificades:     Usuari fa Comandes                             Comanda conté Productes (N:M)                             Producte pertany a Categoria (1:N)Preguntes que respon:  → Quines coses existeixen al sistema?  → Com es relacionen?  → Quines restriccions hi ha? |
| :---- |

### **Etapa 2: Disseny lògic**

El "com s'estructuren les dades" en un model relacional, sense especificar cap SGBD concret. Les entitats es converteixen en taules, els atributs en columnes, les relacions en claus foranes.

| DISSENY LÒGIC: model relacional, independent de MySQL/PostgreSQLusuaris(id PK, nom, email UNIQUE, password, creat\_at)comandes(id PK, usuari\_id FK→usuaris, estat, total, creat\_at)productes(id PK, nom, preu, stock, categoria\_id FK→categories)categories(id PK, nom)comanda\_producte(comanda\_id FK→comandes, producte\_id FK→productes,                 quantitat, preu\_unitari)   ← taula intermèdia N:MPreguntes que respon:  → Quines taules hi haurà?  → Quines columnes tindrà cada taula?  → Quines claus primàries i foranes? |
| :---- |

### **Etapa 3: Disseny físic**

El "com s'implementa" en un SGBD concret (MySQL, PostgreSQL). Inclou decisions de rendiment: tipus de dades exactes, índexs, particionament.

| \-- DISSENY FÍSIC: SQL específic per a MySQL 8.0CREATE TABLE usuaris (  id         INT UNSIGNED AUTO\_INCREMENT PRIMARY KEY,  nom        VARCHAR(100)  NOT NULL,  email      VARCHAR(255)  NOT NULL UNIQUE,  password   CHAR(60)      NOT NULL,  \-- bcrypt sempre 60 caràcters  creat\_at   TIMESTAMP     DEFAULT CURRENT\_TIMESTAMP,  INDEX idx\_email (email)             \-- índex per a cerques freqüents) ENGINE\=InnoDB DEFAULT CHARSET\=utf8mb4;\-- DECIMAL(10,2): fins a 99.999.999,99 → correcte per a preus\-- FLOAT o DOUBLE: errors d'arrodoniment → MAI per a diners\!CREATE TABLE productes (  id           INT UNSIGNED AUTO\_INCREMENT PRIMARY KEY,  nom          VARCHAR(255)   NOT NULL,  preu         DECIMAL(10,2)  NOT NULL,  stock        INT UNSIGNED   NOT NULL DEFAULT 0,  categoria\_id INT UNSIGNED   NOT NULL,  FOREIGN KEY (categoria\_id) REFERENCES categories(id)    ON DELETE RESTRICT    ON UPDATE CASCADE) ENGINE\=InnoDB; |
| :---- |

**Les anomalies: el problema que resol la normalització**

Problemes com les anomalies d'inserció (registres incomplets no es poden afegir), anomalies d'actualització (canvis en un lloc no es reflecteixen a tot arreu), i anomalies d'eliminació (eliminar dades esborra accidentalment informació valuosa) ocorren sovint. La normalització elimina aquests problemes, assegurant la integritat de les dades, reduint la duplicació, i simplificant la gestió de la base de dades.

Imagina aquesta taula mal dissenyada que barreja tot:

| Taula COMANDA (❌ mal disseny \-- tot en una sola taula):| comanda\_id | client\_nom | client\_email    | producte\_nom | preu  | quantitat ||------------|------------|-----------------|--------------|-------|-----------|| 1          | Anna       | anna@e.com      | Portàtil     | 999   | 1         || 1          | Anna       | anna@e.com      | Ratolí       | 29    | 2         || 2          | Gemma      | gemma@e.com      | Portàtil     | 999   | 1         || 3          | Anna       | anna@e.com      | Teclat       | 79    | 1         | |
| :---- |

**Anomalia d'inserció** — No pots afegir un client nou sense que faci una comanda. No pots afegir un producte nou sense que algú el compri.

**Anomalia d'actualització** — Si l'Anna canvia el seu email, has d'actualitzar totes les files on apareix. Si t'oblides d'una, la BD queda inconsistent. Amb 10.000 comandes, 10.000 actualitzacions.

**Anomalia d'eliminació** — Si elimines la comanda 2 (l'única de Gema), perds totes les dades de Gema. Si elimines totes les comandes d'un producte, perds les dades del producte.

**La normalització: les tres formes normals**

La normalització és organitzada en una sèrie de formes normals 1NF, 2NF, i 3NF, cadascuna dissenyada per resoldre tipus específics d'anomalies de dades i problemes estructurals.

### **1FN (Primera Forma Normal): Valors Atòmics**

La 1FN assegura que la taula de la base de dades estigui organitzada de manera que cada columna contingui valors atòmics (indivisibles), i cada registre sigui únic. Això elimina els grups repetitius.

Regla: cada cel·la conté **un sol valor** (no llistes, no grups repetitius). Cada fila és única (té clau primària).

| ❌ Viola 1FN: múltiples valors en una columna| client\_id | nom  | telèfons               ||-----------|------|------------------------|| 1         | Anna | 600111222, 600333444   |  ← dos valors\!| 2         | Gema | 600555666              |✅ Compleix 1FN: un valor per cel·laTaula clients:              Taula client\_telefons:| id | nom  |              | client\_id | telefon    ||----|------|              |-----------|------------|| 1  | Anna |              | 1         | 600111222  || 2  | Gema |              | 1         | 600333444  |                           | 2         | 600555666  | |
| :---- |

### **2FN (Segona forma normal): Dependència total de la clau**

La 2FN elimina les dependències parcials. Una taula és en 2FN si cada atribut no clau depèn funcionalment de tota la clau primària, no únicament d'una part d'ella.

**Únicament aplica quan la clau primària és composta** (formada per múltiples columnes).

| ❌ Viola 2FN: clau composta (comanda\_id, producte\_id)   però nom\_client depèn únicament de comanda\_id| comanda\_id | producte\_id | nom\_client | preu ||------------|-------------|------------|------|| 1          | 101         | Anna       | 999  || 1          | 102         | Anna       | 29   |  ← nom\_client repetit\!| 2          | 101         | Gema       | 999  |nom\_client depèn de comanda\_id → dependència PARCIAL → viola 2FN✅ Compleix 2FN: separem les dadesTaula comandes:              Taula comanda\_producte:| id | nom\_client |          | comanda\_id | producte\_id | preu ||----|------------|          |------------|-------------|------|| 1  | Anna       |          | 1          | 101         | 999  || 2  | Gema       |          | 1          | 102         | 29   |                             | 2          | 101         | 999  | |
| :---- |

### **3FN (Tercera forma normal): Sense dependències transitives**

Una dependència transitiva significa que un atribut no clau depèn d'un altre atribut no clau. La 3FN elimina les dependències transitives.

Regla: els atributs no clau han de dependre **directament** de la clau primària, no d'un altre atribut no clau.

| ❌ Viola 3FN: dependència transitiva| empleat\_id | nom   | dept\_id | dept\_nom    ||------------|-------|---------|-------------|| 1          | Anna  | 10      | Engineering || 2          | Gema  | 10      | Engineering |  ← dept\_nom repetit\!| 3          | Marc  | 20      | Marketing   |dept\_nom depèn de dept\_id (que NO és la PK)→ empleat\_id → dept\_id → dept\_nom (transitiva\!)✅ Compleix 3FN: extraiem el departamentTaula empleats:                    Taula departaments:| id | nom  | dept\_id |            | id | nom         ||----|------|---------|            |----|-------------|| 1  | Anna | 10      |            | 10 | Engineering || 2  | Gema | 10      |            | 20 | Marketing   || 3  | Marc | 20      | |
| :---- |

**Les tres formes normals: el resum visual**

| DADA ORIGINAL (una taula enorme amb tot)         ↓1FN: Valors atòmics     → Elimina grups repetitius i llistes en una cel·la     → Cada fila és única (té PK)         ↓2FN: Dependència total de la clau (si PK composta)     → Elimina dependències parcials     → Cada atribut depèn de TOTA la clau primària         ↓3FN: Sense dependències transitives     → Elimina que un atribut no-clau depengui d'un altre no-clau     → Cada atribut depèn DIRECTAMENT de la PKResultat: múltiples taules ben estructurades,          connectades per claus foranes |
| :---- |

**Quan desnormalitzar: el cost del rendiment**

La normalització perfecta pot perjudicar el rendiment en aplicacions amb moltes lectures. De vegades és necessari **desnormalitzar** intencionalment:

| \-- Exemple: una comanda necessita saber el preu del producte\-- EN EL MOMENT DE LA COMPRA (no el preu actual)\-- ✅ La taula comanda\_producte guarda preu\_unitari\-- Fins i tot si el producte canvia de preu demà,\-- les comandes antigues mostren el preu correcteCREATE TABLE comanda\_producte (  comanda\_id   INT NOT NULL,  producte\_id  INT NOT NULL,  quantitat    INT NOT NULL,  preu\_unitari DECIMAL(10,2) NOT NULL,  \-- ← desnormalització justificada\!  PRIMARY KEY (comanda\_id, producte\_id)); |
| :---- |

La regla pràctica: normalitza fins a 3FN per defecte. Desnormalitza únicament quan tinguis evidència de problemes de rendiment.

