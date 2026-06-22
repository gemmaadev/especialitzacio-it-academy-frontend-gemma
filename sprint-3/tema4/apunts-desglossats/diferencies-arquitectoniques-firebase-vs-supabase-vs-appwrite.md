**Quines són les principals diferències arquitectòniques entre Firebase (NoSQL), Supabase (PostgreSQL) i Appwrite (mixed)?**

**Comparatives**  
[https://blog.logrocket.com/firebase-vs-supabase-vs-appwrite/](https://blog.logrocket.com/firebase-vs-supabase-vs-appwrite/)  
[https://www.smashingmagazine.com/2023/02/baas-comparison-firebase-supabase-appwrite/](https://www.smashingmagazine.com/2023/02/baas-comparison-firebase-supabase-appwrite/)  
Articles comparatius per triar entre Firebase, Supabase i Appwrite.

## **La diferència fonamental: el model de dades**

La major diferència és el model de dades. Supabase està construït sobre SQL i el pensament relacional. Firebase està construït al voltant de patrons NoSQL i el disseny basat en documents.

Firebase  → NoSQL (Firestore: document-collection)  
Supabase  → SQL (PostgreSQL: taules, JOINs, RLS)  
Appwrite  → Mixed (BD de documents propi \+ suport a dades relacionals)

**Firebase: l'ecosistema madur de Google**

Firebase (de Google) ha estat un BaaS de referència durant gairebé una dècada. Proporciona un conjunt complet de serveis: bases de dades en temps real, Firestore, autenticació, hosting, cloud functions i analítiques. Millor per a: startups, aplicacions mobile-first i equips que volen una manera ràpida de prototipar amb l'ecosistema de Google.

**Arquitectura:**

| Firebase / Google Cloud├── Firestore              ← BD NoSQL de documents (coleccions / documents)├── Realtime Database      ← JSON en temps real (llegacy, menys usat)├── Authentication         ← OAuth, email/password, phone, anònim├── Cloud Storage          ← fitxers (integrat amb Google Cloud Storage)├── Cloud Functions        ← Node.js / Python (serverless)├── Firebase Hosting       ← CDN per al frontend estàtic├── Analytics \+ Crashlytics ← métriques i crash reporting└── FCM                    ← push notifications (mòbil) |
| :---- |

**El model de dades de Firestore (NoSQL):**

| // Firestore: col·leccions → documents → subcoleccions// /usuaris/{userId}/comandes/{orderId}// Estructura de document Firestore:{  "nom": "Anna García",  "email": "anna@e.com",  "creatAt": Timestamp,  "preferencies": {           // ← objecte anidat natiu    "idioma": "ca",    "tema": "fosc"  }}// Les consultes son limitades (sense JOINs):// ✅ db.collection('usuaris').where('actiu', '==', true)// ❌ No pots fer JOINs entre col·leccions nativamente// ❌ No pots fer consultes complexes com GROUP BY |
| :---- |

**Avantatges**: totalment gestionat (no cal self-host), Firestore (NoSQL) i Realtime Database per a emmagatzematge de dades flexible, analítiques integrades, crash reporting i push notifications, integracions potents de Machine Learning (ML Kit), documentació excel·lent i integració amb Google Cloud. 

**Desavantatges**: vendor lock-in (dependent de Google Cloud), car a escala per la facturació de lectures/escriptures de Firestore, cap opció de self-hosting, suport SQL limitat.

**Supabase: Firebase però amb PostgreSQL**

Supabase es posiciona com una alternativa open-source a Firebase, alimentada per PostgreSQL. Ofereix autenticació, APIs, subscripcions en temps real i edge functions, sense renunciar a SQL. 

Millor per a: developers que volen la velocitat de Firebase amb la flexibilitat i fiabilitat de Postgres.

**Arquitectura:**

| Supabase (open source)├── PostgreSQL             ← la BD central (SQL complet, JOINs, RLS)├── PostgREST              ← API REST auto-generada des de l'esquema SQL├── Realtime               ← subscripcions via PostgreSQL logical replication├── GoTrue                 ← autenticació (OAuth, email, phone)├── Storage                ← fitxers (amb polítiques RLS integrades)├── Edge Functions         ← Deno TypeScript (serverless)└── pg\_vector              ← extensió per a embeddings i cerca vectorial (IA) |
| :---- |

**El model de dades (SQL \+ PostgREST):**

| \-- Supabase: SQL estàndard de PostgreSQLCREATE TABLE usuaris (  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  nom TEXT NOT NULL,  email TEXT UNIQUE NOT NULL,  creat\_at TIMESTAMPTZ DEFAULT NOW());CREATE TABLE comandes (  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  usuari\_id UUID REFERENCES usuaris(id),  total DECIMAL(10,2),  estat TEXT CHECK (estat IN ('pendent', 'completada', 'cancel·lada')));\-- JOINs complets:SELECT u.nom, COUNT(c.id) as total\_comandesFROM usuaris uLEFT JOIN comandes c ON u.id \= c.usuari\_idGROUP BY u.id; |
| :---- |

| // API del client Supabase: equivalent a SQL però en JavaScriptconst { data, error } \= await supabase  .from('usuaris')  .select(\`\*, comandes(id, total, estat)\`)  // ← JOIN implícit\!  .eq('actiu', true)  .order('creat\_at', { ascending: false }); |
| :---- |

Supabase es centra en PostgreSQL: fluxos de treball SQL-first, Row Level Security i Edge Functions (TypeScript). 

Pots fer self-host, però la complexitat operacional és més alta que les configuracions BaaS d'una sola consola; algunes funcionalitats difereixen entre el cloud i els tiers self-hosted.

**Appwrite: el BaaS open source centrat en developers**

Appwrite té llicència BSD 3-Clause, s'entrega com una única plataforma (autenticació, bases de dades, emmagatzematge, funcions, missatgeria, temps real, llocs), i s'orienta a equips que volen cloud gestionat o self-host amb portabilitat a nivell d'API i menys DSL específic del proveïdor que les stacks de només Firestore.

**Arquitectura:**

Appwrite (open source, BSD 3-Clause)

| ├── Databases              ← BD de documents propi (MariaDB per sota)│                            \+ suport a relacions entre col·leccions├── Auth                   ← OAuth, email, phone, anònim, SAML├── Storage                ← fitxers amb transformacions (resize, crop)├── Functions              ← multi-runtime (Node.js, Python, Ruby, PHP, etc.)├── Messaging              ← push, email, SMS integrats├── Realtime               ← WebSockets natius└── Self-host              ← Docker Compose (una comanda per instal·lar) |
| :---- |

**El model de dades (documents amb atributs definits):**

| // Appwrite: BD de documents però amb esquema definit (atributs)// Diferent de Firestore (esquema lliure): cal definir els atributs// Crear una col·lecció via SDK o consolaconst collection \= await databases.createCollection(  'DB\_ID', 'COLLECTION\_ID', 'usuaris');// Definir els atributs (semi-estructurat)await databases.createStringAttribute('DB\_ID', 'COLLECTION\_ID', 'nom', 255, true);await databases.createEmailAttribute('DB\_ID', 'COLLECTION\_ID', 'email', true);// Crear un documentconst doc \= await databases.createDocument('DB\_ID', 'COLLECTION\_ID', ID.unique(), {  nom: 'Anna García',  email: 'anna@e.com'});// Consultesconst docs \= await databases.listDocuments('DB\_ID', 'COLLECTION\_ID', \[  Query.equal('actiu', true),  Query.orderDesc('$createdAt'),  Query.limit(10)\]); |
| :---- |

El conjunt de funcionalitats de Appwrite és similar a Supabase: base de dades, autenticació, emmagatzematge, funcions i temps real, amb un patró similar de client SDK. 

El discurs és que obtens funcionalitats similars a Supabase amb l'opció d'executar-lo a la infraestructura que tu controles.

**La comparativa arquitectònica completa**

| Característica | Firebase | Supabase | Appwrite |
| ----- | ----- | ----- | ----- |
| **BD** | Firestore (NoSQL doc.) | PostgreSQL (SQL) | Documents (MariaDB) |
| **Esquema** | Lliure (sense schema) | Definit (SQL DDL) | Semi-definit (atributs) |
| **JOINs** | ❌ No natiu | ✅ SQL complet | ⚠️ Relacions bàsiques |
| **Temps real** | ✅ Natiu i madur | ✅ via Postgres repl. | ✅ WebSockets |
| **Auth** | ✅ Molt completa | ✅ GoTrue | ✅ Multi-provider |
| **Funcions** | Cloud Functions | Edge Functions (Deno) | Multi-runtime |
| **Missatgeria** | ✅ FCM (push) | ⚠️ Limitat | ✅ Push \+ Email \+ SMS |
| **Self-host** | ❌ Impossible | ✅ Complex | ✅ Docker simple |
| **Open source** | ❌ Propietari | ✅ Apache 2.0 | ✅ BSD 3-Clause |
| **Vendor lock-in** | 🔴 Alt (Google) | 🟡 Baix (PG estàndard) | 🟢 Molt baix |
| **Maduresa** | ✅ Molt alta | 🟡 Creixent | 🟡 Creixent |
| **Mobile SDKs** | ✅ Excel·lent | 🟡 Bo | 🟡 Bo |
| **Ideal per a** | Mobile-first, MVPs | SaaS, SQL, analytics | Self-hosted, privadesa |

**La pregunta clau: NoSQL vs. SQL en el context BaaS**

Un error que veig sovint és equips que escullen Firebase perquè sembla més ràpid en la primera setmana, i després s'adonen sis mesos més tard que el seu producte en realitat es comporta com una aplicació SQL. El cost no és únicament la migració. És també el temps perdut treballant al voltant d'un model de dades que ja no s'adapta al producte.

Escull Firebase (NoSQL) quan:  
  → App de xat, col·laboració en temps real  
  → Dades no estructurades o que canvien molt  
  → App mòbil amb suport offline-first  
  → Equip ja en l'ecosistema Google Cloud

Escull Supabase (SQL) quan:  
  → Aplicació SaaS amb dades relacionals complexes  
  → Necessites JOINs, transaccions, vistes SQL  
  → Vols reportes i analítiques des de la BD  
  → Prioritzes la portabilitat (PostgreSQL estàndard)

Escull Appwrite (mixed) quan:  
  → Vols self-hosted per a control total o privadesa de dades  
  → Equip que no vol vendor lock-in  
  → Necessites missatgeria integrada (push, email, SMS)  
  → Projectes on la llicència open source és important

