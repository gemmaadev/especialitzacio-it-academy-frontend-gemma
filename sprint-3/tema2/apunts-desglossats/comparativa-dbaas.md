###### **Comparativa DBaaS: AWS RDS vs. Google Cloud SQL vs. Azure SQL**

###### **Comparativa DBaaS: AWS RDS vs. Google Cloud SQL**

Comparativa entre serveis de bases de dades al núvol d’AWS i Google Cloud.  
[https://docs.cloud.google.com/docs/get-started/aws-azure-gcp-service-comparison?hl=es](https://docs.cloud.google.com/docs/get-started/aws-azure-gcp-service-comparison?hl=es)

**El mapa dels tres grans proveïdors**

AWS ofereix el portfoli més complet amb Amazon RDS per a bases de dades relacionals, 

Aurora per a alta compatibilitat MySQL/PostgreSQL, i DynamoDB per a NoSQL. 

Google Cloud SQL ofereix MySQL, PostgreSQL i SQL Server gestionats. 

La seva oferta destacada és Cloud Spanner — un servei de BD relacional escalable horitzontalment que és únic al mercat. 

Azure SQL Database és el servei estrella de Microsoft per a càrregues de treball de SQL Server. 

Azure Cosmos DB és una BD distribuïda globalment i multi-model.

**AWS RDS: el veterà amb més opcions**

AWS RDS és el veterà, llançat el 2009, amb focus en configurabilitat i control. 

Tracta les bases de dades com a infraestructura — gestiones els tipus d'instàncies, els volums d'emmagatzematge i les configuracions de xarxa amb precisió granular.

**Motors suportats:** MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Db2.

**Serveis destacats dins de l'ecosistema AWS:**

Amazon RDS        → BD relacionals gestionades (motor estàndard)  
Amazon Aurora     → Fork propietari de MySQL/PostgreSQL, 5x més ràpid  
Amazon DynamoDB   → NoSQL clau-valor/document, serverless  
Amazon ElastiCache → Redis i Memcached gestionats (caché)  
Amazon Redshift   → Data warehouse columnar per a analítica

**Característiques principals:**

* Multi-AZ (Alta Disponibilitat): répliques en zones de disponibilitat separades  
* Read Replicas: fins a 5 rèpliques de lectura  
* Automated backups: fins a 35 dies de retenció  
* CloudWatch: monitoratge integrat  
* IAM Authentication: control d'accés via AWS IAM  
* Reserved Instances: fins a 69% de descompte amb compromís d'1-3 anys

**Preu orientatiu MySQL (US East):**

Per exemple, una instància db.t3.micro MySQL costa uns $0.017 per hora.

db.t3.micro (2 vCPU, 1 GB RAM):   \~$12/mes  ← development  
db.t3.medium (2 vCPU, 4 GB RAM):  \~$52/mes  ← staging  
db.r6g.large (2 vCPU, 16 GB RAM): \~$180/mes ← producció  
\+ Emmagatzematge SSD: \~$0.115/GB/mes  
\+ Multi-AZ: dobla el cost d'instància

**Google Cloud SQL: simplicitat i integració amb GCP**

Google Cloud SQL és un servei de bases de dades completament gestionat que facilita la configuració, el manteniment, la gestió i l'administració de les teves bases de dades relacionals PostgreSQL i MySQL al cloud. Google Cloud SQL ofereix alt rendiment, escalabilitat i comoditat.

**Motors suportats:** MySQL, PostgreSQL, SQL Server.

**Serveis destacats dins de l'ecosistema GCP:**

Cloud SQL       → BD relacionals gestionades (MySQL, PostgreSQL, SQL Server)  
Cloud Spanner   → BD relacional distribuïda globalment (ACID \+ escalat horitzontal)  
AlloyDB         → PostgreSQL compatible amb motor columnar analític (4-10x més ràpid)  
Firestore       → NoSQL documental serverless  
BigQuery        → Data warehouse serverless per a analítica massiva

**Característiques principals:**

Google Cloud SQL Serverless té l'escalat més agressiu (a zero amb cold starts de menys d'un segon) i facturació per segon. AlloyDB proporciona compatibilitat amb PostgreSQL amb un motor columnar que accelera les consultes analítiques 4-10x mentre manté compatibilitat total amb eines i drivers de PostgreSQL.

* Backups automàtics amb recuperació point-in-time  
* Alta disponibilitat amb failover automàtic  
* Integració directa amb BigQuery, Looker, Vertex AI  
* Cloud SQL Auth Proxy: connexions segures sense IP públiques  
* Manteniment automàtic (menys configuració manual que RDS)

**Preu orientatiu MySQL (us-central1):**

Les opcions d'entrada proporcionen el punt de partida més econòmic, amb Google Cloud SQL i AWS RDS oferint els preus més baixos. Google Cloud SQL HDD ofereix el preu d'emmagatzematge no inclòs més baix a $0.09/GB-mes.

db-f1-micro (shared vCPU, 0.6 GB): \~$7/mes   ← development  
db-n1-standard-1 (1 vCPU, 3.75 GB): \~$51/mes ← staging  
db-n1-highmem-2 (2 vCPU, 13 GB):  \~$150/mes  ← producció  
\+ SSD: $0.17/GB/mes | HDD: $0.09/GB/mes

**Azure SQL Database: l'opció Microsoft-centric**

**Motors suportats:** SQL Server, MySQL, PostgreSQL, MariaDB, Cosmos DB.

**Serveis destacats dins de l'ecosistema Azure:**

Azure SQL Database   → SQL Server gestionat (PaaS complet)  
Azure Database for PostgreSQL / MySQL → BD open source gestionades  
Azure Cosmos DB      → NoSQL multi-model, distribució global  
Azure Synapse        → Analítica \+ Data Warehouse integrats  
Azure Cache for Redis → Redis gestionat

**Característiques principals:**

* Millor integració amb ecosistema Microsoft: .NET, Power BI, Azure DevOps  
* Intelligent Query Processing: optimització automàtica de consultes  
* Geo-replication: rèpliques en múltiples regions  
* Elastic Pools: compartir recursos entre múltiples BDs (estalvi cost)  
* Azure Hybrid Benefit: descomptes si tens llicències SQL Server existents

L'emmagatzematge Business Critical d'Azure és significativament més car que altres opcions a $0.25/GB-mes.

**Comparativa directa: els tres serveis**

AWS RDS és el veterà amb focus en configurabilitat. Google Cloud SQL proporciona simplicitat gestionada excepcional. Azure Database ofereix integració estreta amb l'ecosistema de Microsoft.

| Factor | AWS RDS | Google Cloud SQL | Azure SQL |
| ----- | ----- | ----- | ----- |
| **Llançament** | 2009 (el més antic) | 2014 | 2010 |
| **Motors** | Més opcions (6+) | MySQL, PG, SQL Server | SQL Server, MySQL, PG |
| **Preu entrada** | \~$12/mes | \~$7/mes | \~$15/mes |
| **Emmagatzematge SSD** | $0.115/GB | $0.17/GB | Variable |
| **Alta disponibilitat** | Multi-AZ (+cost) | Automàtic integrat | Zones de disponibilitat |
| **Escalat** | Manual/programat | Automàtic \+ serverless | Serverless disponible |
| **Backups** | Fins a 35 dies | Fins a 365 dies | Fins a 35 dies |
| **Monitoratge** | CloudWatch | Cloud Monitoring | Azure Monitor |
| **Regions** | 33+ | 40+ | 60+ |
| **Lock-in** | Moderat (Aurora alt) | Moderat (Spanner alt) | Alt (Cosmos DB) |
| **Ideal per a** | Flexibilitat màxima | Simplicitat operacional | Ecosistema Microsoft |

**El servei més innovador de cada proveïdor: Aurora, AlloyDB i Cosmos DB**

**AWS Aurora** — Fork propietari de MySQL/PostgreSQL que pretén ser 5x més ràpid. Emmagatzematge distribuït que creix automàticament fins a 128TB. Alt lock-in amb AWS però rendiment excepcional.

**Google AlloyDB** — PostgreSQL totalment compatible però amb un motor columnar que accelera consultes analítiques 4-10x. Combina les qualitats transaccionals d'un SGBD relacional amb la velocitat d'un data warehouse.

**Azure Cosmos DB** — BD multi-model (document, clau-valor, graf, columnar) distribuïda globalment. Garantia de latència \<10ms en el 99è percentil. Ideal però amb lock-in molt alt (API propietària).

**El diagrama de decisió**

Ja uses molt AWS (S3, Lambda, EC2)?  
  SÍ → AWS RDS (integració natural, un sol proveïdor)  
       Necessites rendiment màxim? → Aurora  
       Necessites NoSQL? → DynamoDB \+ ElastiCache

Prioritzes simplicitat operacional i cost?  
  SÍ → Google Cloud SQL  
       Necessites analítica avançada? → AlloyDB o BigQuery  
       Necessites distribució global amb ACID? → Cloud Spanner

Treballes amb .NET, SQL Server, Power BI?  
  SÍ → Azure SQL Database (integració Microsoft nativa)  
       Necessites multi-model NoSQL global? → Cosmos DB

Vols evitar el vendor lock-in?  
  → Usa PostgreSQL estàndard en qualsevol dels tres  
  → Evita Aurora, Spanner i Cosmos DB (propietaris)  
  → Considera alternatives: Supabase, Neon, Railway

**La perspectiva per a un projecte nou en 2025-2026**

Per a la majoria de projectes web nous amb un equip petit:

**Google Cloud SQL o Supabase** (PostgreSQL) son les opcions recomanades per la seva simplicitat operacional, cost competitiu i zero lock-in. Supabase en concret ofereix PostgreSQL gestionat amb autenticació, API REST auto-generada i emmagatzematge d'objectes integrats, tot a un preu molt accessible per a startups i projectes personals.

**AWS RDS** és la millor opció quan ja estàs en l'ecosistema AWS o l'empresa té contractes Enterprise amb Amazon.

**Azure SQL** és la millor opció per a empreses amb infraestructura Microsoft existent (Active Directory, Office 365, .NET).

