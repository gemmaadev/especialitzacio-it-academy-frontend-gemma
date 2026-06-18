## **SQL vs. NoSQL: diferències, avantatges i casos d'ús**

###### **SQL vs NoSQL Differences** [*https://www.mongodb.com/resources/basics/databases/nosql-explained/nosql-vs-sql*](https://www.mongodb.com/resources/basics/databases/nosql-explained/nosql-vs-sql)  Comparació entre bases de dades SQL tradicionals i NoSQL, amb avantatges i casos d’ús.

###### **Què és SQL i què són les bases de dades relacionals**

###### SQL, que significa Structured Query Language, és un llenguatge de programació específic de domini usat habitualment per a tasques com inserir, actualitzar, consultar i eliminar dades dins d'una base de dades. SQL també s'usa per crear i modificar esquemes de bases de dades, i definir paràmetres d'accés i administració.

###### Les bases de dades relacionals (RDBMSs) emmagatzemen dades dins de files i columnes que s'usen per formar taules. Una relació entre dues taules (o més) es pot crear usant una clau forana. Aquestes claus foranes mantenen relacions predefinides que existeixen entre les taules.

###### Les bases de dades relacionals es creen i gestionen usant un esquema fix. Un esquema fix significa que totes les dades ingressades a la base de dades han d'estar precisament alineades amb estàndards de formatació predefinits, cosa que limita els tipus d'estructures de dades que les bases de dades relacionals poden emmagatzemar. 

###### Les bases de dades relacionals no poden processar dades no estructurades però són excel·lents per a suportar informació transaccional o financera que inclou dades estructurades.

###### **Els principals SGBD SQL**

###### Exemples de bases de dades SQL inclouen:

* ###### Oracle (un dels sistemes de bases de dades empresarials més usats del món),

* ###### MySQL (open-source, conegut per facilitat d'ús i fiabilitat)

* ###### PostgreSQL (open-source, conegut per les seves capacitats avançades que estenen les habilitats de SQL, ACID-compliant)

* ###### Microsoft SQL Server (MSSQL, usat en entorns empresarials grans per a processament de transaccions d'alt volum)

* ###### SQLite (serverless i autocontingut, sense configuració, incorporat dins de l'aplicació).

###### **Què és NoSQL**

###### NoSQL, que significa Not only SQL, és un enfocament de sistema de gestió de bases de dades usat per ingressar, emmagatzemar i recuperar dades no estructurades i semi-estructurades dins d'una base de dades. 

###### Les dades que no es poden analitzar a través de bases de dades relacionals tradicionals poden romandre en el seu format natiu i ser ingressades en una base de dades NoSQL. 

###### Es diu NoSQL per emfatitzar que aquestes bases de dades poden gestionar models de dades no tabulars i no relacionals, a més de suportar llenguatges de consulta similars a SQL.

###### **Les diferències clau: SQL vs. NoSQL**

###### **SQL (Relacional):                    NoSQL (No Relacional):**

######   Dades estructurades                  	Dades no estructurades / semi-estr.

######   Esquema fix predefinit               	Esquema flexible / dinàmic

######   Taules, files i columnes             	Documents, clau-valor, columnar, graf

######   JOINs per a relacions                	Embedding o referencing

######   ACID transaccional                  	Consistència eventual (generalment)

######   Escalabilitat vertical               	Escalabilitat horitzontal

######   SQL com a llenguatge estàndard     APIs i llenguatges variats

######   Maduresa \> 50 anys                   	\~15-20 anys

###### **Casos d'ús: quan usar cada paradigma**

###### **SQL és ideal per a:**

###### ✅ Dades financeres i transaccionals (requereixen ACID)

###### ✅ Sistemes ERP, CRM, inventari

###### ✅ Dades amb relacions complexes i predefinides

###### ✅ Aplicacions que requereixen consultes analítiques riques

###### ✅ Quan la integritat de les dades és crítica

###### ✅ Equips familiars amb SQL estàndard

###### **NoSQL és ideal per a:**

###### ✅ Aplicacions web i mòbils a gran escala

###### ✅ Dades no estructurades: logs, sensors IoT, dades socials

###### ✅ Catàlegs de productes amb atributs variables

###### ✅ Prototipatge ràpid (esquema flexible)

###### ✅ Caché i sessions (Redis)

###### ✅ Contingut gestionat per CMS

###### ✅ Quan l'escalabilitat horitzontal és prioritària

###### **La tendència actual: els dos mons convergeixen**

###### És important notar que altres tipus de bases de dades també poden establir relacions entre peces de dades. 

###### En el cas de bases de dades tabulars normalitzades (SQL o relacionals), aquestes relacions s'expressen usant claus foranes o taules d'intersecció. 

###### En el cas de sistemes de gestió de bases de dades com MongoDB (NoSQL), aquestes relacions s'estableixen per embedding o referencing de dades.

###### La tendència real del mercat el 2025-2026 és la convergència: PostgreSQL amb JSONB ofereix flexibilitat NoSQL amb garanties SQL. MongoDB ha afegit suport ACID complet. El debat "SQL vs. NoSQL" ha evolucionat a "quina eina per a quin cas".

###### 

