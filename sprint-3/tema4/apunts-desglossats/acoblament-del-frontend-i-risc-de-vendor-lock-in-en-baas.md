**Com afecta la tria de BaaS a l'acoblament del front-end i el risc de vendor lock-in?**

## **Problema central: l'acoblament és inevitable, la qüestió és quant**

Quan un frontend crida directament un BaaS, el codi de l'aplicació s'acobla a les APIs del proveïdor.

El risc clàssic de BaaS és que el codi del teu frontend sap massa sobre la implementació del backend. 

Prefereix magatzems de dades estàndard (PostgreSQL, MongoDB) i cores open-source quan sigui possible. 

Dissenya el teu model de domini d'una manera que no estigui estretament acoblada a les peculiaritats d'un proveïdor concret.

**Quan parlem d'acoblament: què significa concretament**

| MOLT ACOBLAT (Firebase):  // El frontend crida directament l'API de Firebase  import { collection, getDocs, where } from 'firebase/firestore';  const q \= query(collection(db, 'usuaris'), where('actiu', '==', true));  // → Si canvies de Firebase: reescriu TOT el data layer del frontendMODERADAMENT ACOBLAT (Supabase):  const { data } \= await supabase.from('usuaris').select('\*').eq('actiu', true);  // → Si canvies de Supabase a PostgreSQL propi: canvies l'SDK però  //   les dades (SQL estàndard) es poden moure amb pg\_dumpPOC ACOBLAT (abstraccions pròpies):  const usuaris \= await repositori.trobarActius();  // → El frontend no sap si darrere hi ha Firebase, Supabase o NestJS  //   → La capa de repositori aïlla el frontend del BaaS |
| :---- |

**L'escala de Vendor Lock-in: els quatre nivells**

### **Nivell 1: Lock-in Molt Alt — Firebase (Google)**

El vendor lock-in de Firebase és més alt que Supabase perquè el model de dades i el llenguatge de consulta de Firestore son propietaris. Migrar de Firebase significa reescriure la capa de dades, no únicament canviar una cadena de connexió.

| Per migrar de Firebase necessites:  1\. Exportar les dades de Firestore (format JSON/NoSQL)  2\. Transformar documents NoSQL → taules SQL (si vas a PostgreSQL)     → Pèrdua de subcoleccions, subcamps, timestamps especials  3\. Reescriure TOTES les crides a Firestore al frontend  4\. Substituir Firebase Auth per un altre sistema     → Els tokens JWT de Firebase no son compatibles amb altres auth     → Els usuaris han de tornar a registrar-se o migrar sessions  5\. Migrar Firebase Storage → S3, Supabase Storage, etc.  6\. Reescriure les Security Rules en el sistema de seguretat nou  Cost estimat: 3-6 mesos de developer per una app gran |
| :---- |

L'API propietaria i l'estructura de dades significa que el codi de la teva aplicació està estretament acoblat a la infraestructura de Google.

### **Nivell 2: Lock-in baix — Supabase**

Supabase no et tanca en Supabase. Com que és PostgreSQL estàndard, pots fer un `pg_dump` i portar la teva base de dades a qualsevol lloc — a AWS RDS, DigitalOcean, o el teu propi servidor bare-metal. Aquesta portabilitat és un punt de venda massiu per a CTOs.

| \# Migrar de Supabase a qualsevol PostgreSQL:pg\_dump \--host=db.xxx.supabase.co \--username=postgres \\        \--dbname=postgres \> backup.sql\# Restaurar a un altre PostgreSQL (AWS RDS, self-hosted, etc.)psql \--host=nou-servidor.aws.com \--username=postgres \\     \--dbname=mydb \< backup.sql |
| :---- |

L'SDK client (`@supabase/supabase-js`) és l'únic acoblament. Si fas self-host o migres, l'SDK segueix funcionant. Les dades son 100% portables.

### **Nivell 3: Lock-in molt baix — Appwrite**

Appwrite és dissenyat per executar-se als teus servidors. Full control, zero vendor lock-in. Suporta múltiples projectes en una sola instància. Cada projecte és aïllat amb bases de dades, usuaris i API keys separades.

| \# Instal·lar Appwrite self-hosted en 5 minuts:docker compose up \-d\# → La teva instància, les teves dades, zero dependència del proveïdor |
| :---- |

Appwrite té camins de migració de primera classe: importadors documentats des de Firebase, Supabase i Nhost, a més de self-hosted ↔ cloud. La sortida és part del producte.

**Com es manifesta el Lock-in al codi del frontend**

| // EXEMPLE: llegir una llista de posts des del frontend// ❌ Directament acoblat a Firebase (molt lock-in)import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';const q \= query(  collection(db, 'posts'),  where('publicat', '==', true),  orderBy('creatAt', 'desc'));const snap \= await getDocs(q);const posts \= snap.docs.map(d \=\> d.data());// ❌ Directament acoblat a Supabase (baix lock-in, però acoblat)const { data: posts } \= await supabase  .from('posts')  .select('\*')  .eq('publicat', true)  .order('creat\_at', { ascending: false });// ✅ Abstraccions: el frontend no sap quin BaaS hi ha darrere// repositoris/posts.repository.tsexport interface PostsRepository {  trobarPublicats(): Promise\<Post\[\]\>;}// implementacions/supabase-posts.repository.tsexport class SupabasePostsRepository implements PostsRepository {  async trobarPublicats() {    const { data } \= await supabase.from('posts').select('\*').eq('publicat', true);    return data ?? \[\];  }}// Al component React:const posts \= await postsRepository.trobarPublicats();// → Si demà canvies de BaaS: canvia únicament la implementació del repositori// → El component no necessita cap canvi |
| :---- |

**La paradoxa: SDKs del BaaS al frontend vs. API pròpia**

Un patró que molts equips adopten quan el lock-in es fa preocupant: en lloc de cridar el BaaS directament des del frontend, el frontend crida la seva pròpia API (NestJS, Express), i aquesta API crida el BaaS.

| Patró directe (màxim acoblament):  Frontend → \[SDK de Firebase/Supabase\] → BaaSPatró amb API pròpia (mínim acoblament):  Frontend → \[REST API pròpia\] → \[BaaS\]  → El frontend no sap que hi ha un BaaS darrere  → Molt més fàcil de migrar  → Però perds l'avantatge principal del BaaS: la velocitat de dev\!Patró híbrid (el millor equilibri):  Frontend → \[SDK BaaS\] per a CRUD simple i temps real  Frontend → \[API pròpia\] per a lògica de negoci complexa  → El BaaS s'usa per al que és bo (auth, CRUD, storage)  → La lògica crítica no depèn del BaaS |
| :---- |

**L'estratègia per minimitzar el lock-in**

### **1\. Encapsula les crides al BaaS en repositoris**

Definir interfícies independents del BaaS i implementar-les per a cada proveïdor. Si canvies de BaaS, únicament canvies la implementació.

### **2\. Usa el BaaS únicament per al que és estàndard**

Les operacions CRUD, l'autenticació i l'emmagatzematge son funcionalitats estàndard presents a tots els BaaS. La lògica de negoci específica va a Cloud Functions/Edge Functions o a un backend propi.

### **3\. Exporta les dades periòdicament**

| \# Supabase: pg\_dump setmanal automatitzat\# Firebase: exports a Google Cloud Storage\# Appwrite: Backup manual o self-hosted\# L'exit story: "Pots extreure totes les teves dades?"\# Firebase Auth → la propietat de tokens és difícil de migrar\# Supabase → pg\_dump és tot el que necessites\# Appwrite → migrar entre self-hosted i cloud és natiu |
| :---- |

### **4\. Avalua l'exit story ABANS de comprometre't**

Preguntes a respondre ABANS d'escollir un BaaS:

  1\. Puc extreure totes les dades fàcilment?  
     Firebase: sí però en format NoSQL → transformació necessària  
     Supabase: pg\_dump → qualsevol PostgreSQL  
     Appwrite: API d'export \+ self-host disponible

  2\. Els tokens d'autenticació es poden migrar?  
     Firebase: JWT propietari → usuaris han de re-autenticar-se  
     Supabase: JWT estàndard → migrable  
     Appwrite: sessions Appwrite → cal migrar

  3\. El codi de les Security Rules és reutilitzable?  
     Firebase Rules: CEL propietari → reescriptura total  
     Supabase RLS: SQL estàndard → portable a PostgreSQL propi  
     Appwrite Permisos: API pròpia → reescriptura

  4\. El cost s'escala predeciblement?  
     Firebase: per lectura/escriptura → pot sorprendre  
     Supabase: per instància → predictible  
     Appwrite: per operació (cloud) o gratuït (self-hosted)

**Resum: la taula de lock-in**

| Aspecte | Firebase | Supabase | Appwrite |
| ----- | ----- | ----- | ----- |
| **BD portable** | ❌ NoSQL propietari | ✅ PostgreSQL estàndard | ⚠️ API pròpia |
| **Auth portable** | ❌ JWT Firebase | ✅ JWT estàndard | ⚠️ Tokens Appwrite |
| **Self-host** | ❌ Impossible | ✅ Possible (complex) | ✅ Docker simple |
| **Open source** | ❌ Propietari | ✅ Apache 2.0 | ✅ BSD 3-Clause |
| **Exit story** | 🔴 Cara (mesos) | 🟢 Bona (pg\_dump) | 🟡 Moderada |
| **SDK acoblament** | 🔴 Alt | 🟡 Moderat | 🟡 Moderat |
| **Regles seguretat** | 🔴 Propietari (CEL) | 🟢 SQL estàndard | 🟡 API pròpia |
| **Recomanació** | MVPs, lock-in acceptable | Producció, SQL, portabilitat | Control total, privadesa |

