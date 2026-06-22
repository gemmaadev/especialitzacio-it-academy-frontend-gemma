## **Apunts T4 — Backend as a service (BaaS)**

**1\. Què és i quins problemes resol el BaaS**

Un BaaS és un model on un proveïdor executa els primitius comuns del backend (autenticació, base de dades, emmagatzematge de fitxers, funcions serverless) i tu t'integres a través de SDKs i HTTP en lloc de provisionar, escalar i patchejar aquella infraestructura tu mateix.

Els tres problemes principals que resol:

1. **Temps de posada al mercat** — Un MVP funcional en 1-3 dies en lloc de 4-8 setmanes. Auth configurada en 30 minuts, BD amb CRUD funcional el dia 1, APIs auto-generades, desplegament gestionat.  
2. **Cost inicial i equip** — Plans gratuïts per a MVPs (Firebase Spark, Supabase Free, Appwrite Free). No cal developer backend dedicat ni administrador de sistemes. Un developer frontend pot construir un producte complet.  
3. **Complexitat operacional** — El proveïdor gestiona patches de seguretat, escalat automàtic, backups, alta disponibilitat, certificats SSL i monitoratge.

BaaS és ideal quan:  
  ✅ MVP / prova de concepte / startup en fase inicial  
  ✅ Equip petit (1-3 devs) sense backend expert  
  ✅ Funcionalitats estàndard (auth, CRUD, fitxers)  
  ✅ Temps de mercat és prioritari

Backend propi és millor quan:  
  ✅ Lògica de negoci molt complexa  
  ✅ Escala massiva (cost BaaS \> cost equip DevOps)  
  ✅ Compliance estricte (HIPAA, PCI-DSS)  
  ✅ Algoritmes propietaris crítics

**2\. Les tres plataformes: diferències arquitectòniques**

### **Firebase (Google) — NoSQL, madur, propietari**

Firebase usa Firestore com a BD NoSQL de documents (col·leccions → documents). Esquema lliure, sense JOINs natius, temps real molt madur. Inclou Analytics, Crashlytics, FCM (push notifications) i ML Kit. **No permet self-hosting**. Vendor lock-in alt per l'API i el model de dades propietaris.

| // Firestore: documents JSON aniuatsconst q \= query(collection(db, 'posts'), where('publicat', '==', true));const snap \= await getDocs(q);// Temps real:onSnapshot(q, (snap) \=\> snap.docs.map(d \=\> d.data())); |
| :---- |

### **Supabase — PostgreSQL, open source, SQL complet**

Supabase és construït sobre PostgreSQL estàndard amb PostgREST (API REST auto-generada), GoTrue (auth), Realtime (via PostgreSQL logical replication), Edge Functions (Deno TypeScript), i pg\_vector per a IA. Open source Apache 2.0. Self-hosting possible. **Vendor lock-in baix**: les dades es poden migrar amb `pg_dump`.

| // SQL complet \+ JOINs via SDKconst { data } \= await supabase  .from('posts')  .select('\*, autor:usuaris(nom), comentaris(count)')  .eq('publicat', true);// Tipus TypeScript generats automàticament des de l'esquema\!npx supabase gen types typescript \--project-id ID \> types.ts |
| :---- |

### **Appwrite — Documents, open source, self-hosted**

Appwrite usa una BD de documents pròpia (MariaDB per sota) amb atributs semi-definits. Multi-runtime Functions (Node.js, Python, Ruby, PHP, Dart...), Messaging integrat (push \+ email \+ SMS), WebSockets natius. Llicència BSD 3-Clause. **Self-hosting via Docker en 5 minuts**. Vendor lock-in molt baix.

| \# Instal·lar Appwrite self-hosted:docker compose up \-d  \# ← tota la plataforma en una comanda |
| :---- |

**3\. Seguretat: les tres aproximacions**

### **Firebase Security Rules (CEL)**

Llenguatge basat en CEL (Common Expression Language). Regles per defecte tancades: cal `allow` explícit per a cada operació.

| // firestore.rulesmatch /posts/{postId} {  allow read: if resource.data.publicat \== true              || request.auth.uid \== resource.data.autorId;  allow write: if request.auth \!= null               && request.auth.uid \== resource.data.autorId;} |
| :---- |

### **Supabase RLS (Row Level Security)**

Primitiu natiu de PostgreSQL. Les policies son clàusules `WHERE` implícites afegides a cada consulta. `USING` per a SELECT/UPDATE/DELETE, `WITH CHECK` per a INSERT/UPDATE.

| ALTER TABLE posts ENABLE ROW LEVEL SECURITY;\-- Llegir posts publicats o propis:CREATE POLICY "llegir posts"ON posts FOR SELECT TO authenticated, anonUSING (publicat \= TRUE OR autor\_id \= auth.uid());\-- Únicament el propietari escriu:CREATE POLICY "escriure posts propis"ON posts FOR INSERT TO authenticatedWITH CHECK (autor\_id \= auth.uid());\-- ⚠️ La service\_role KEY bypassa RLS → mai al frontend\! |
| :---- |

### **Appwrite Permissions**

Sistema declaratiu per rol assignat a cada document o fitxer.

| await databases.createDocument('DB\_ID', 'COL\_ID', ID.unique(), data, \[  Permission.read(Role.any()),            // qualsevol pot llegir  Permission.update(Role.user(userId)),   // únicament el propietari  Permission.delete(Role.user(userId)),  Permission.read(Role.team('editors')),  // membres de l'equip\]); |
| :---- |

**Regla d'or dels tres sistemes:** per defecte tot és privat (Deny by Default). Cal definir explícitament cada accés permès.

**4\. Serveis bàsics: el paquet estàndard**

| Servei | Firebase | Supabase | Appwrite |
| ----- | ----- | ----- | ----- |
| **Auth** | ✅ Molt completa | ✅ GoTrue | ✅ 30+ providers |
| **Base de dades** | Firestore NoSQL | PostgreSQL SQL | Documents semi-struct |
| **Storage** | ✅ | ✅ | ✅ \+ transformacions imatge |
| **Funcions** | Node.js/Python | Deno TypeScript | Multi-runtime |
| **Temps real** | ✅ Millor del mercat | ✅ PG replication | ✅ WebSockets |
| **Push notifications** | ✅ FCM | ⚠️ Limitat | ✅ Push+Email+SMS |
| **Analytics** | ✅ Google Analytics | ❌ | ❌ |
| **IA/Vectors** | ⚠️ | ✅ pg\_vector | ❌ |
| **Self-host** | ❌ | ✅ Complex | ✅ Docker simple |

**5\. Models de preu i plans gratuïts**

|  | Firebase Spark | Supabase Free | Appwrite Free |
| ----- | ----- | ----- | ----- |
| **BD** | 1 GB Firestore | 500 MB PostgreSQL | 500 MB |
| **MAUs** | 10.000 | 50.000 | 75.000 |
| **Storage** | 5 GB | 1 GB | 2 GB |
| **Funcions** | 125K inv/mes | 500K inv/mes | 750K exec/mes |
| **Pausa inactivitat** | ❌ No | ✅ 7 dies | ✅ 7 dies |
| **Projectes** | Il·limitats | 2 màxim | 2 màxim |

**Model de facturació en producció:** Firebase cobra per operació (lectures/escriptures) → imprevisible. Supabase cobra per instància ($25/mes Pro) → predictible. Appwrite Cloud $25/mes Pro (3.5M MAUs inclosos\!) o self-hosted (únicament pagues el servidor, \~$12-20/mes).

La trampa de Firebase: `auth.uid()` a 100K MAUs \= \~$495/mes. Supabase Pro: $25/mes inclou 100K MAUs. La diferència és enorme.

**6\. Vendor Lock-in i acoblament del frontend**

L'acoblament és inevitable, la qüestió és quant. Escala de lock-in:

| Firebase  🔴 Alt    → NoSQL propietari \+ JWT Firebase \+ CEL rules                     → Migrar: 3-6 mesos, reescriptura totalSupabase  🟡 Baix  → PostgreSQL estàndard                     → Migrar: pg\_dump → qualsevol PostgreSQLAppwrite  🟢 Molt  → Self-hosted natiu, Docker portable          baix      → Importadors de Firebase i Supabase inclosos |
| :---- |

La solució tècnica per a minimitzar el lock-in: **capa de repositori** que aïlla el frontend de l'SDK del BaaS.

| // ✅ Abstraure el BaaS darrere d'una interfícieexport interface PostsRepository {  trobarPublicats(): Promise\<Post\[\]\>;}// Si canvies de BaaS: canvia únicament la implementació// El component React no necessita cap canvi |
| :---- |

**7\. SDKs i integració amb React**

Tots tres proporcionen SDKs JavaScript/TypeScript amb suport per a React, Vue i Angular.

| // Firebase \+ React: hooks manuals (o ReactFire)useEffect(() \=\> {  const unsubscribe \= onAuthStateChanged(auth, setUser);  return unsubscribe;  // cleanup automàtic}, \[\]);// Supabase \+ React (millor suport Next.js App Router)// @supabase/ssr per a Server Components:const supabase \= createClient(); // server-sideconst { data } \= await supabase.from('posts').select('\*');// Supabase: tipus TypeScript auto-generats des de l'esquemanpx supabase gen types typescript → client totalment tipat// Appwrite \+ ReactuseEffect(() \=\> {  account.get().then(setUser).catch(() \=\> setUser(null));}, \[\]); |
| :---- |

**8\. Casos d'ús: BaaS vs. Backend propi**

**BaaS ideal per a:**

MVP / validació de producte    → qualsevol BaaS (prioritza velocitat)  
Xat i col·laboració temps real → Firebase (millor temps real)  
Apps mòbil (iOS/Android)       → Firebase (SDKs \+ FCM)  
Eines internes / dashboards    → Supabase (SQL \+ RLS per rols)  
SaaS petit multi-tenant        → Supabase (RLS per aïllament)  
Privadesa / regulació moderada → Appwrite self-hosted

**Backend propi millor per a:**

Lògica de negoci complexa      → Cloud Functions no son suficients  
Escala massiva (milions users) → cost BaaS \> equip DevOps  
HIPAA / PCI-DSS Nivell 1       → infraestructura totalment aïllada  
Algoritmes propietaris crítics → codi en infraestructura pròpia  
Latència extremament crítica   → optimitzacions impossibles en BaaS

**El patró híbrid** (el millor equilibri):

BaaS → auth, CRUD simple, storage, temps real  
Backend propi (NestJS) → lògica complexa, Stripe, webhooks, ML

**Resum del tema**

| BaaS \= proveïdor gestiona infraestructura, tu el codi  → Problema: temps, cost i complexitat del backend propiTres plataformes:  Firebase  → NoSQL, madur, Google, mobile-first, lock-in alt  Supabase  → PostgreSQL, SQL, open source, portable  Appwrite  → Documents, self-hosted Docker, lock-in mínimSeguretat (Deny by Default en tots tres):  Firebase  → Security Rules (CEL)  Supabase  → RLS (SQL natiu PostgreSQL)  Appwrite  → Permissions declaratius per rolServeis: auth \+ BD \+ storage \+ funcions \+ temps real  Diferencial Firebase: Analytics, FCM, offline-first  Diferencial Supabase: pg\_vector (IA), tipus TypeScript, Next.js SSR  Diferencial Appwrite: Messaging, transformacions imatge, self-hostedPreus:  Firebase: per operació → imprevisible a escala  Supabase: per instància → predictible  Appwrite: cloud per operació / self-hosted gratuïtLock-in: Firebase \> Supabase \> Appwrite (self-hosted)Casos d'ús:  BaaS     → MVP, startups, equips petits, temps real, mòbil  Backend  → lògica complexa, escala massiva, compliance crític  Híbrid   → BaaS per a primitius \+ backend per a lògica específica |
| :---- |

