**DBaaS: Quins compromisos implica delegar la gestió de bases de dades a un proveïdor cloud (cost, control, seguretat)?**

## **Què és un DBaaS**

Com qualsevol altra oferta "as a service", DBaaS és una plataforma per allotjar les teves dades usant el motor de base de dades de la teva elecció. 

Amb un servei de base de dades allotjat, tot el que necessites — infraestructura, emmagatzematge, software de base de dades, llicències (quan requerides), replicació, failover, i automatització de backups — estan inclosos com a part de la quota de subscripció.

En altres paraules: contractes a un proveïdor perquè gestioni la infraestructura mentre tu et centres en el codi de l'aplicació.

**El que el DBaaS gestiona per tu (vs. self-hosted)**

La diferència major entre DBaaS i desplegaments autoges­tionats és la quantitat d'administració de backend que requereix temps. El gràfic explica el que els equips han de continuar gestionant i el que poden esperar que gestioni un venedor DBaaS.

| SELF-HOSTED (servidor propi o VPS):        DBaaS (AWS RDS, Atlas, etc.):Tu gestiones:                               Tu gestiones:  ✗ Hardware físic                            ✓ El teu esquema i dades  ✗ Sistema operatiu i patches               ✓ Usuaris i permisos de BD  ✗ Instal·lació del SGBD                    ✓ Les teves aplicacions  ✗ Configuració i optimització  ✗ Backups i verificació de backups         El proveïdor gestiona:  ✗ Replicació i alta disponibilitat          ✗ Infraestructura  ✗ Failover automàtic                       ✗ Patches de seguretat  ✗ Monitoratge i alertes                    ✗ Backups automàtics  ✗ Escalat vertical/horitzontal             ✗ Replicació multi-zona  ✗ Seguretat a nivell de servidor           ✗ Failover automàtic  ✗ Certificats SSL                          ✗ Escalat automàtic                                             ✗ Monitoratge |
| :---- |

**Compromís 1: Cost**

### **Avantatge inicial: sense inversió en infraestructura**

La tecnologia DBaaS estalvia recursos valuosos en la configuració i gestió de sistemes de bases de dades i l'entorn IT. La tecnologia redueix el temps dedicat al procediment de setmanes i dies a qüestió de minuts.

No cal comprar servidors, contractar administradors de BD (DBAs), ni gestionar la infraestructura. Perfecte per a startups i equips petits.

### **El perill: els costos creixents a escala**

La factura augmentarà a mesura que creixi l'ús del sistema de base de dades. Les organitzacions clients s'han de preparar per a això, especialment si l'ús supera les expectatives. A més, tot i vincular la gestió de costos al vendor lock-in, cal tenir en compte que, mentre la majoria de vendors DBaaS no cobren per carregar dades al seu servei, pot haver-hi càrrecs significatius per migrar les dades fora a un altre magatzem.

| Exemple de costos reals (AWS RDS PostgreSQL):SMALL (dev/staging):  db.t3.micro: \~$15/mes  20GB SSD: \~$2.40/mes  → Total: \~$17/mesMEDIUM (producció petita):  db.t3.medium: \~$60/mes  100GB SSD: \~$12/mes  Multi-AZ (alta disponibilitat): x2 \= \~$144/mes  → Total: \~$156/mesLARGE (producció gran):  db.r6g.2xlarge: \~$700/mes  1TB SSD: \~$120/mes  Multi-AZ: x2 \= \~$1640/mes  Backup: \~$25/mes  → Total: \~$1.685/mes→ Un servidor dedicat equivalent podria costar $200-500/mes  però requereix un DBA i gestió contínua |
| :---- |

Per a la mateixa mida de recursos, pots trobar serveis DBaaS per a MongoDB que van de $500 a $3.000. Per tant, el cost hauria de ser únicament un dels diversos criteris de decisió.

**Compromís 2: Control**

### **Pèrdua de control operacional**

Hi ha manca de control físic quan un client opta per una solució DBaaS. En cas que un client vulgui actualitzar el seu servei amb productes de seguretat millorats, per exemple, el client no tindrà cap control sobre els mateixos. Pot obrir un tiquet de petició amb el proveïdor cloud. No hi ha cap mètode perquè el client implementi serveis addicionals que vulgui però que no ofereixi el proveïdor cloud.

Exemples pràctics de limitació de control:

| ✗ No pots instal·lar extensions de PostgreSQL no aprovades pel proveïdor✗ No pots accedir directament al sistema de fitxers✗ No pots modificar paràmetres del kernel (per exemple, shared\_buffers en AWS RDS)✗ Versions disponibles depenen del proveïdor (no sempre la més nova)✗ Finestres de manteniment programades (possible downtime breu)✗ Límits en el nombre de connexions simultànies✗ No pots fer alguns tipus d'optimitzacions avançades |
| :---- |

### **Avantatge: el control que sí mantens**

Tot i les limitacions, mantens el control de l'important:

| \-- Continues controlant:\-- ✓ L'esquema de la teva BD\-- ✓ Els usuaris i permisos\-- ✓ Les consultes i índexs\-- ✓ La lògica de negoci\-- ✓ Quan i com fas migracions\-- Exemple: crear usuari amb permisos limitats a AWS RDSCREATE USER app\_user WITH PASSWORD 'contrasenya\_segura';GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app\_user;GRANT USAGE ON SCHEMA public TO app\_user;\-- L'administrador AWS (superuser) segueix existint, però no el veus ni el controles |
| :---- |

**Compromís 3: Seguretat**

### **Avantatges de seguretat del DBaaS**

Els grans proveïdors inverteixen enormement en seguretat:

| AWS RDS / Aurora:  ✓ Xifrat en repòs: AES-256 via AWS KMS  ✓ Xifrat en trànsit: SSL/TLS obligatori  ✓ VPC: base de dades en xarxa privada virtual  ✓ Security Groups: firewall a nivell de xarxa  ✓ IAM Authentication: accés via rols de AWS  ✓ Audit logging: totes les operacions registrades  ✓ Patches de seguretat: automàtics i en finestres definides  ✓ Certificacions: SOC 1/2/3, PCI DSS, HIPAA, ISO 27001MongoDB Atlas:  ✓ Xifrat end-to-end  ✓ LDAP / SSO integration  ✓ IP Whitelist  ✓ Client-side field level encryption  ✓ SOC 2 Type 2, ISO 27001, PCI DSS |
| :---- |

### **Riscos de seguretat del DBaaS**

Les dades emmagatzemades fora de les instal·lacions pròpies poden estar exposades a un major risc. La majoria de vendors DBaaS tenen una ciberseguretat forta, però les teves dades poden tenir problemes de sobirania de dades o control d'accés. És possible que no tinguis control total per complir amb marcs de seguretat com HIPAA i GDPR.

Riscos de seguretat a considerar:

1\. Sobirania de dades  
   → On s'emmagatzemen físicament les dades?  
   → GDPR exigeix que les dades d'usuaris europeus romanguin a la UE  
   → Solució: especificar la regió al crear la instància  
               ex: AWS eu-west-1 (Irlanda) o eu-central-1 (Frankfurt)

2\. Multi-tenancy  
   → Comparteixis infraestructura física amb altres clients  
   → El proveïdor aïlla els recursos, però és un risc teòric  
   → Solució: instàncies dedicades (més car)

3\. Accés del proveïdor  
   → En teoria, el personal del proveïdor podria accedir a les dades  
   → Solució: xifrat client-side (les dades xifrades abans d'arribar al proveïdor)

4\. Configuració incorrecta  
   → El risc \#1 real: bases de dades obertes a internet per error  
   → Solució: sempre desplegament en VPC privada, mai IP pública

**Compromís 4: Vendor Lock-in**

Avalua com d'estretament el servei està acoblat a un sol proveïdor cloud. Les plataformes que suportenHosting gestionat de PostgreSQL o MySQL estàndard, sense extensions propietàries, faciliten la migració o operació a través de múltiples proveïdors de bases de dades cloud.

Escala de lock-in (de menor a major):

BAIX LOCK-IN:  
  Render, Railway, Supabase (PostgreSQL estàndard)  
  → Migrar és: pg\_dump → pg\_restore a un altre servidor  
  → Cost de migració: hores

MEDI LOCK-IN:  
  AWS RDS (MySQL/PostgreSQL), MongoDB Atlas  
  → Usa motors estàndard però integra amb serveis del proveïdor  
  → Cost de migració: dies (migrar les integracions associades)

ALT LOCK-IN:  
  AWS Aurora (fork propietari de MySQL/PostgreSQL)  
  Google AlloyDB (fork de PostgreSQL)  
  Azure Cosmos DB  
  → Extensions propietàries que no funcionen en altres proveïdors  
  → Cost de migració: setmanes/mesos \+ risc alt

MOLT ALT LOCK-IN:  
  Firebase Firestore  
  DynamoDB  
  → APIs completament propietàries  
  → Migrar requereix reescriure totes les crides a la BD

**Els principals DBaaS i els seus perfils**

| Servei | Motor | Preu Inicial | Ideal per a |
| ----- | ----- | ----- | ----- |
| **AWS RDS** | MySQL, PostgreSQL, Oracle, SQL Server | \~$15/mes | Empreses, producció seriosa |
| **AWS Aurora** | MySQL/PG compatible (propietari) | \~$60/mes | Alt rendiment, AWS-native |
| **MongoDB Atlas** | MongoDB | Gratuït (M0) → \~$57/mes | Startups, stacks MERN |
| **Firebase** | Firestore (NoSQL propietari) | Gratuït → pay-per-use | Prototips, apps mòbils |
| **Supabase** | PostgreSQL | Gratuït → \~$25/mes | Alternativa open source a Firebase |
| **PlanetScale** | MySQL compatible | Gratuït → \~$39/mes | Branching de BD, serverless |
| **Neon** | PostgreSQL serverless | Gratuït → \~$19/mes | Serverless, Next.js |
| **Railway** | MySQL, PostgreSQL, MongoDB, Redis | \~$5/mes | Developers, staging |

**DBaaS vs. Self-Hosted**

ESCULL DBaaS quan:  
  ✓ Startup o equip petit (no tens DBA dedicat)  
  ✓ Necessites anar ràpid al mercat  
  ✓ La teva càrrega de treball és variable o impredictible  
  ✓ L'alta disponibilitat i els backups son crítics i no tens experiència  
  ✓ El teu pressupost d'infraestructura és limitat (pagues per ús)  
  ✓ Compliment normatiu (SOC2, HIPAA): el proveïdor ja té les certificacions

ESCULL Self-Hosted quan:  
  ✓ Tens un equip de SRE/DBA dedicat  
  ✓ Dades molt sensibles que no poden sortir del teu control  
  ✓ Requisits de configuració molt específics que DBaaS no permet  
  ✓ Escala gran on el cost del DBaaS supera clarament el cost del DBA  
  ✓ Restriccions regulatòries que impedeixen el cloud públic  
  ✓ Vols evitar completament el vendor lock-in

