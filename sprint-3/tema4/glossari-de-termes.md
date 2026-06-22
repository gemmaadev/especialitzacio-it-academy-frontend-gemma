## **Glossari de termes — Backend as a Service (BaaS)**

**Appwrite** — Plataforma BaaS open source (llicència BSD 3-Clause) fundada el 2019\. Arquitectura de microserveis en Docker amb BD de documents pròpia (MariaDB per sota), autenticació multi-provider, Storage amb transformacions d'imatge natives, Functions multi-runtime (Node.js, Python, Ruby, PHP, Dart...) i Messaging integrat (push, email, SMS). El BaaS amb menor vendor lock-in: self-hosting en una comanda (`docker compose up -d`).

**Appwrite Sites** — Servei d'Appwrite per a allotjament de frontends (SPAs i SSR). Permet construir i desplegar tot el projecte (frontend i backend) des d'una sola plataforma, sense combinar serveis externs.

**Auth (Autenticació BaaS)** — Servei integrat a totes les plataformes BaaS que gestiona el registre, login i sessions d'usuaris. Suporta email/password, OAuth (Google, GitHub, Apple...), magic links, SMS, anònim i SAML (enterprise). Firebase, Supabase i Appwrite implementen auth com a servei independent que genera JWT per identificar l'usuari a les regles de seguretat.

**BaaS (Backend as a Service)** — Model de servei cloud on un proveïdor executa i gestiona els primitius comuns del backend (auth, BD, storage, funcions serverless) i els developers s'integren via SDKs i HTTP. El trade-off central: cedes control sobre runtime, esquema i semàntica de consultes a canvi de velocitat de desenvolupament, escalat gestionat i cost operacional mínim.

**BSD 3-Clause** — Llicència de software open source molt permissiva que usa Appwrite. Permet usar, modificar i distribuir el codi (fins i tot en productes comercials) sense restriccions significatives. Diferent de Apache 2.0 (Supabase) que requereix preservar atribucions de patents.

**Bucket** — Contenidor lògic d'emmagatzematge de fitxers en les plataformes BaaS. Equivalent als buckets de S3. A Supabase i Appwrite pots tenir múltiples buckets amb polítiques de seguretat independents.

**CEL (Common Expression Language)** — Llenguatge d'expressió basat en Go usat per les Firebase Security Rules. Permet escriure condicions de seguretat com `request.auth.uid == resource.data.autorId`. Propietari de Google i diferent de qualsevol estàndard SQL o altre sistema.

**Cloud Functions** — Funcions serverless de Firebase. S'executen en resposta a events HTTP, canvis a Firestore, events d'Auth, Storage, o Pub/Sub. Runtime disponible: Node.js i Python. Les funcions han de ser petites i independents: la lògica de negoci complexa no s'adapta bé a aquest model.

**Collection (Firestore)** — L'equivalent a una taula en Firestore de Firebase. Conté documents. Les col·leccions poden contenir subcoleccions aniuades (jerarquia de dades). No admet JOINs: les relacions s'implementen per embedding o referenciament.

**Deny by Default** — Principi de seguretat compartit per Firebase, Supabase i Appwrite: per defecte tot accés és denegat. Cal definir explícitament cada permís. Sense Security Rules / RLS policies / Permissions definides → zero accés des del client.

**Document (Firestore/Appwrite)** — La unitat bàsica d'emmagatzematge en bases de dades NoSQL. Equival a una fila en SQL però pot contenir objectes aniuats, arrays i subcoleccions. A Firestore l'esquema és completament lliure. A Appwrite els documents tenen atributs semi-definits (cal definir els camps però poden ser opcionals).

**Edge Functions (Supabase)** — Funcions serverless de Supabase basades en Deno TypeScript. S'executen en nodes distributed globals (edge computing) amb latència molt baixa. Accessibles via HTTP. Poden usar la service role key per a operacions que requereixen bypassar RLS.

**Embedding** — Estratègia de modelatge NoSQL on les dades relacionades s'emmagatzemen dins del mateix document pare. Evita consultes addicionals. Ideal quan les dades sempre s'accedeixen juntes. Contraposat al "referencing" (guardar l'ID del document relacionat, similar a FK).

**FCM (Firebase Cloud Messaging)** — Servei de notificacions push de Firebase per a aplicacions mòbils (iOS, Android) i web. Gratuït. Una de les raons principals per escollir Firebase per a apps mòbils. Appwrite inclou un servei equivalent (Messaging) que unifica push, email i SMS.

**Firebase** — Plataforma BaaS de Google llançada el 2011 (adquirida el 2014). Inclou Firestore (NoSQL), Realtime Database, Authentication, Cloud Functions, Storage, Hosting, Analytics, Crashlytics, FCM i Remote Config. No permet self-hosting. Vendor lock-in alt però ecosistema mòbil el millor del mercat. Potencia apps amb centenars de milions d'usuaris.

**Firebase Blaze** — Pla de pagament de Firebase (pay-as-you-go). Inclou tots els límits del pla gratuït Spark més la possibilitat de superar-los pagant per operació. Model de facturació per lectura/escriptura de Firestore que pot generar factures sorpresa en apps amb molt tràfic.

**Firebase Security Rules** — Sistema de seguretat de Firebase basat en CEL. Defineix qui pot llegir i escriure cada document de Firestore o Storage. Regles en fitxers `.rules` que es despleguen juntament amb el codi. `match /colecció/{docId} { allow read: if condició; }`.

**Firebase Spark** — Pla gratuït de Firebase. Límits principals: 1GB Firestore, 50K lectures/dia, 20K escriptures/dia, 10K MAUs, 5GB Storage, 125K invocacions de funcions/mes.

**Firestore** — La base de dades NoSQL documental de Firebase (de nova generació, substitueix Realtime Database). Emmagatzema dades en col·leccions de documents JSON. Esquema flexible, temps real natiu, suport offline, escala automàticament. No suporta JOINs ni consultes SQL.

**GoTrue** — El sistema d'autenticació open source que usa Supabase internament. Proporciona gestió d'usuaris, sessions JWT, OAuth, magic links i més. Construït per Netlify i adoptat per Supabase. Es pot usar com a servei independent.

**gRPC** — Protocol de comunicació d'alt rendiment usat en microserveis interns. No és una arquitectura BaaS però es menciona com a alternativa a REST per a comunicació backend-to-backend.

**HIPAA** — Health Insurance Portability and Accountability Act. Regulació dels EUA per a la privadesa de dades de salut. Requereix controls estrictes sobre qui accedeix a les dades. Firebase multi-tenant no garanteix compliment HIPAA. Appwrite self-hosted o backend propi son les opcions per a projectes que el requereixen.

**Lambda / Cloud Function** — Terme genèric per a funcions serverless. Firebase les anomena Cloud Functions, Supabase Edge Functions, Appwrite Functions. S'executen en resposta a events HTTP o triggers de la plataforma. Adequades per a lògica simple; la lògica complexa requereix un backend propi.

**Lock-in** — Veure *Vendor Lock-in*.

**MAU (Monthly Active User)** — Mètrica que compta els usuaris únics que s'autentiquen durant un mes. Usada per a la facturació d'Auth a totes les plataformes BaaS. Firebase Spark: 10K MAUs gratuïts. Supabase Free: 50K. Appwrite Free: 75K. Appwrite Pro: 3.5M.

**Magic Link** — Mètode d'autenticació passwordless on l'usuari rep un email amb un enllaç de login temporal. Suportat per Firebase, Supabase i Appwrite. L'alternativa moderna a email/password que millora la seguretat i la UX.

**Multi-tenant** — Arquitectura on múltiples clients (tenants) comparteixen la mateixa instància de la base de dades. En BaaS, el Row Level Security o les Security Rules asseguren l'aïllament de dades entre clients. Supabase via RLS és la millor opció per a SaaS multi-tenant.

**Offline-first** — Capacitat d'una aplicació de funcionar sense connexió a internet i sincronitzar els canvis quan recupera la connexió. Firebase (Firestore i Realtime Database) té el millor suport offline-first del mercat BaaS. Supabase i Appwrite no el suporten nativament.

**Pay-as-you-go** — Model de facturació on pagues únicament pel que uses, sense cost fix mensual. Firebase usa aquest model (per lectura/escriptura). Pot ser molt econòmic en ús baix però imprevisible en ús alt. Contraposat al model per instància de Supabase (cost fix mensual predictible).

**pg\_dump** — Utilitat de PostgreSQL per exportar tota la base de dades a un fitxer SQL. El "exit path" de Supabase: permet migrar totes les dades a qualsevol PostgreSQL amb una comanda. La portabilitat que Firebase no ofereix.

**pg\_vector** — Extensió de PostgreSQL inclosa a Supabase per emmagatzemar i cercar vectors d'embeddings (IA/ML). Permet implementar cerca semàntica i sistemes RAG directament sobre la BD de Supabase sense eines addicionals. Firebase i Appwrite no ho suporten nativament.

**Permission.read/write** — Mètodes de l'SDK d'Appwrite per definir permisos d'accés a documents i fitxers. `Permission.read(Role.any())` permet lectura pública. `Permission.write(Role.user(userId))` limita l'escriptura al propietari.

**Policy (RLS)** — Una regla de Row Level Security a PostgreSQL/Supabase. Defineix qui pot accedir a quines files d'una taula. Cada policy s'aplica a una operació específica (SELECT, INSERT, UPDATE, DELETE) i un rol (anon, authenticated). Les policies son clàusules WHERE implícites afegides automàticament per PostgreSQL.

**PostgREST** — Servidor web que genera automàticament una API REST des d'un esquema PostgreSQL. El component que Supabase usa per exposar la BD via HTTP sense escriure cap endpoint. Cada taula es converteix automàticament en un endpoint REST amb filtres, paginació i joins.

**Realtime Database** — La BD en temps real original de Firebase (predecessor de Firestore). Emmagatzema dades com un arbre JSON enorme. Menys recomanada per a nous projectes (Firestore és el successor). Ideal per a apps de xat i sincronització de dades simples.

**Referencing** — Estratègia de modelatge NoSQL (contraposada a embedding) on en lloc d'embedar un document dins d'un altre, es guarda l'ID del document relacionat. Equivalent a una clau forana (FK) en SQL. Requereix una consulta addicional per resoldre la referència (`populate` en Mongoose, `include` en Appwrite).

**Remote Config** — Servei exclusiu de Firebase que permet modificar el comportament de l'app sense fer un nou deploy. S'usa per a A/B testing, feature flags i personalització per segment d'usuaris.

**Role.any() / Role.users() / Role.team()** — Constructors de rols de l'SDK d'Appwrite per a la definició de permisos. `Role.any()` inclou usuaris no autenticats. `Role.users()` és qualsevol autenticat. `Role.user(id)` és un usuari específic. `Role.team(id)` és tots els membres d'un equip.

**Row Level Security (RLS)** — Característica nativa de PostgreSQL que filtra automàticament les files que cada usuari pot veure o modificar. Supabase el fa servir com a sistema de seguretat principal. Cal habilitar-lo explícitament (`ALTER TABLE taula ENABLE ROW LEVEL SECURITY`) i definir policies.

**Self-hosting** — Desplegar i gestionar la plataforma BaaS en la teva pròpia infraestructura (servidor propi, VPS, cloud privat). Firebase no permet self-hosting. Supabase ho permet però és complex. Appwrite és el líder en self-hosting: `docker compose up -d` i tens tota la plataforma funcionant en 5 minuts.

**Service Role Key** — Clau secreta de Supabase que bypassa completament el Row Level Security. Ha d'usar-se únicament al costat del servidor (mai al frontend). Permet operacions administratives sense restriccions de seguretat.

**Supabase** — Plataforma BaaS open source (Apache 2.0) construïda sobre PostgreSQL. Components principals: PostgREST (API), GoTrue (auth), Realtime (WebSockets via PG replication), Storage, Edge Functions (Deno), pg\_vector. Vendor lock-in baix: les dades son PostgreSQL estàndard i es poden exportar amb pg\_dump.

**Supabase Free** — Pla gratuït de Supabase. Límits: 500 MB BD, 50K MAUs, 1 GB Storage, 5 GB ample de banda, 500K invocacions Edge Functions. Projectes pausats automàticament si no hi ha activitat en 7 dies.

**Supabase Pro** — Pla de pagament de Supabase a $25/mes per projecte. Inclou 8 GB BD, 100K MAUs, 100 GB Storage, 250 GB ample de banda, backups diaris, sense pausa per inactivitat. El model predictible (cost fix) és la principal avantatge sobre Firebase.

**Supabase RLS** — Veure *Row Level Security*.

**Vendor Lock-in** — El grau de dependència que genera un proveïdor BaaS que dificulta la migració a un competidor o a un backend propi. Escala: Firebase (molt alt, NoSQL propietari \+ JWT Firebase) → Supabase (baix, PostgreSQL estàndard exportable) → Appwrite (molt baix, self-hosted natiu).

**WebSockets** — Protocol de comunicació bidireccional en temps real entre client i servidor. Appwrite usa WebSockets natius per a les seves subscripcions en temps real. Supabase també els usa per a Realtime (implementat sobre PostgreSQL logical replication).

**Whitelist/Allowlist** — En el context de seguretat BaaS, una llista de valors o operacions permeses explícitament. Firebase Rules, Supabase RLS i Appwrite Permissions operen amb el principi Deny by Default \+ allowlist explícita.

