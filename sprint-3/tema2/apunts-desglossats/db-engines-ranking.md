## **DB-Engines Ranking: Context i popularitat dels SGBD (juny 2026\)**

###### **DB-Engines Ranking**

Rànquing actualitzat de popularitat de sistemes de bases de dades, SQL i NoSQL.  
[https://db-engines.com/en/ranking](https://db-engines.com/en/ranking) 

**Què és i com funciona el rànquing**

El DB-Engines Ranking classifica els sistemes de gestió de bases de dades segons la seva popularitat. El rànquing s'actualitza mensualment. Inclou 434 sistemes en el rànquing de juny de 2026 i el proporciona Redgate Software.

La puntuació combina: mencions als motors de cerca, freqüència de discussions als fòrums tècnics (Stack Overflow, DBA Stack Exchange), anuncis de feina, i activitat a les xarxes professionals. No mesura usuaris actius ni instal·lacions: mesura **presència i interès al món tècnic**.

**El Top 10 de Juny 2026**

| Rang | SGBD | Model | Puntuació | Tendència (1 any) |
| ----- | ----- | ----- | ----- | ----- |
| **\#1** | Oracle | Relacional | 1140.04 | ↓ \-90.35 |
| **\#2** | MySQL | Relacional | 856.29 | ↓ \-97.29 |
| **\#3** | Microsoft SQL Server | Relacional | 698.04 | ↓ \-78.71 |
| **\#4** | PostgreSQL | Relacional | 688.23 | ↑ **\+7.58** |
| **\#5** | MongoDB | Documental | 387.97 | ↓ \-14.87 |
| **\#6** | Snowflake | Relacional | 214.57 | ↑ \+40.09 |
| **\#7** | Databricks | Multi-model | 157.58 | ↑ **\+52.91** |
| **\#8** | Redis | Clau-Valor | 150.02 | ↓ \-1.70 |
| **\#9** | IBM Db2 | Relacional | 113.53 | ↓ \-11.60 |
| **\#10** | Apache Cassandra | Wide Column | 102.97 | ↓ \-5.30 |

**Les tendències clau que revela el rànquing**

### **PostgreSQL: l'únic gran que creix**

Dels quatre primers (Oracle, MySQL, SQL Server, PostgreSQL), PostgreSQL és l'únic que ha pujat en l'últim any (+7.58 punts), mentre que els altres tres han caigut significativament.

Aquesta tendència confirma el que la comunitat de developers viu: PostgreSQL és el SGBD relacional preferit per a nous projectes el 2025-2026. Les raons: codi obert (zero llicències), funcionalitats avançades (JSONB, PostGIS, vectors), suport excel·lent de tots els proveïdors cloud, i el creixement de plataformes com Supabase i Neon basades en PostgreSQL.

### **Databricks: el creixement més espectacular**

Databricks ha pujat del rang \#12 (juny 2025\) al \#7 (juny 2026), amb un increment de \+52.91 punts en un any, el creixement més gran entre els top 20\.

Databricks reflecteix la consolidació de les plataformes lakehouse (Data Lake \+ Data Warehouse) i la fusió entre analítica i IA. No és una base de dades tradicional: és una plataforma d'analítica i ML massivament adoptada per empreses.

### **Snowflake: el data warehouse modern**

Snowflake ocupa el \#6 amb 214.57 punts i ha crescut \+40.09 en l'últim any. El seu model serverless de pagament per ús i la separació d'emmagatzematge i còmput l'han fet molt popular per a analítica al cloud.

**Context per a cada SGBD que coneixem**

### **Oracle (\#1, 1140 punts)**

Dominant però en declivi (-90 punts en un any). Hegemònic en entorns corporatius i governamentals grans, però poc rellevant per a aplicacions web modernes a causa del cost de les llicències.

### **MySQL (\#2, 856 punts)**

Segueix sent molt popular gràcies a WordPress (que alimenta el 43% de la web) i l'ecosistema PHP. El declivi (-97 punts) reflecteix la migració gradual de nous projectes cap a PostgreSQL.

### **PostgreSQL (\#4, 688 punts)**

L'únic dels quatre primers amb tendència positiva (+7.58 punts en un any). La bretxa amb MySQL (168 punts) segueix reduint-se. Si la tendència continua, PostgreSQL podria superar MySQL en 3-5 anys.

### **MongoDB (\#5, 387 punts)**

Manté el lideratge indiscutible del segment NoSQL, molt per davant de la competència. Tot i el lleuger declivi, segueix sent la primera opció per a documents JSON i el stack MERN.

### **Redis (\#8, 150 punts)**

Redis lidera el segment key-value i s'ha posicionat com a multi-model (key-value, document, graf, search, time series, vector). Pràcticament estàndard de facto per a caché i sessions en aplicacions web modernes.

### **Apache Cassandra (\#10, 102 punts)**

El referent per a big data amb escriptures massives i distribució global. Usat per Netflix, Apple i Instagram per gestionar bilions de registres.

**El Top 20 complet: el panorama general**

| Rang | SGBD | Tendència notable |
| ----- | ----- | ----- |
| \#11 | SQLite | L'única BD realment embedded |
| \#12 | Elasticsearch | Referent en cerca de text complet |
| \#13 | MariaDB | Fork de MySQL, popular en self-hosted |
| \#14 | Azure SQL Database | ↑ Pujant (de \#17 a \#14 en 1 any) |
| \#17 | Microsoft Access | Sorprenentment present, uso corporatiu |
| \#18 | Amazon DynamoDB | ↓ Baixant (de \#15 a \#18) |
| \#19 | Google BigQuery | Estable, data warehouse de GCP |
| \#20 | Neo4j | Referent indiscutible en bases de dades de graf |
| \#26 | ClickHouse | ↑ Creixent ràpidament, analítica en temps real |

**Les categories de SGBD presents al rànquing**

El DB-Engines organitza els 434 sistemes en categories: Relacional, Key-value stores, Document stores, Time Series, Graph DBMS, Search engines, Vector DBMS, Wide column stores, Columnar, i Multi-Model DBMS, entre d'altres.

Una tendència important: molts SGBD s'han tornat **multi-model**. Redis, MongoDB, PostgreSQL, i Oracle suporten múltiples paradigmes en una sola plataforma, reduint la necessitat d'usar sistemes separats.

**Resum: què ens diu el rànquing per a un developer el 2026**

Per a aplicacions web modernes (nova aplicació avui):  
  → PostgreSQL: la primera opció (creixent, open source, ric en funcionalitats)  
  → MySQL: si el projecte usa WordPress o PHP legacy  
  → MongoDB: si les dades son documents JSON naturals  
  → Redis: com a complement (caché, sessions, temps real) — quasi sempre

Per a analítica i big data:  
  → Snowflake o BigQuery: data warehouse al cloud  
  → Databricks: plataformes de dades i ML a gran escala  
  → ClickHouse: analítica en temps real (tendència emergent)

Per a casos especials:  
  → Cassandra: escriptures massives, distribució global  
  → Neo4j: relacions complexes (xarxes socials, recomanacions)  
  → Elasticsearch: cerca de text complet  
  → SQLite: apps mòbils, embeddida, tests

La conclusió del rànquing:  
  Els relacionals segueixen dominant (\#1-4 i \#6 son relacionals)  
  PostgreSQL és el SGBD amb millor futur entre els relacionals  
  NoSQL complementa, no substitueix

