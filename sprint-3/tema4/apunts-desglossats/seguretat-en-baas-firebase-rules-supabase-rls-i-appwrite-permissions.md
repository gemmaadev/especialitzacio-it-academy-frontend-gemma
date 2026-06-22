**¿Com implementen les diferents plataformes BaaS la seguretat (Firebase Security Rules, Supabase RLS, Appwrite Permissions)?**

**Seguretat**  
[https://firebase.google.com/docs/rules?hl=es-419](https://firebase.google.com/docs/rules?hl=es-419)  
[https://supabase.com/docs/guides/database/postgres/row-level-security](https://supabase.com/docs/guides/database/postgres/row-level-security)  
Bones pràctiques de seguretat per Firebase i Supabase.

### **El principi comú: seguretat per defecte tancada**

Les tres plataformes parteixen del mateix principi: **per defecte, tot és privat**. Cal definir explícitament quines operacions son permeses. 

La diferència és com ho expressen: Firebase usa un llenguatge propi basat en CEL, Supabase usa SQL natiu de PostgreSQL, i Appwrite usa permisos declaratius per rol.

### **Firebase Security Rules**

Firebase Security Rules estan entre les teves dades i els usuaris maliciosos. 

Pots escriure regles simples o complexes que protegeixin les dades de la teva app al nivell de granularitat que el teu cas requereixi. 

Les Security Rules de Cloud Firestore i Cloud Storage usen un llenguatge basat en el Common Expression Language (CEL), que es construeix sobre CEL amb declaracions `match` i `allow` que suporten accés concedit condicionalment.

#### **Estructura bàsica**

| // firestore.rulesrules\_version \= '2';service cloud.firestore {  match /databases/{database}/documents {    // match /col·lecció/{docId} → patró de ruta    match /usuaris/{userId} {      // allow \<operació\>: if \<condició\>      allow read: if request.auth \!= null;      allow write: if request.auth \!= null && request.auth.uid \== userId;    }    // Totes les altres col·leccions → negat per defecte  }} |
| :---- |

#### **Les variables clau de Firebase Rules**

La variable `auth` conté informació d'autenticació per al client que sol·licita dades. Si l'usuari que sol·licita accés no ha iniciat sessió, la variable `auth` és `null`.

| // Variables disponibles a les condicions:request.auth.uid          // UID de l'usuari autenticatrequest.auth.token        // JWT complet de l'usuarirequest.auth.token.email  // email de l'usuarirequest.auth \!= null      // l'usuari ha iniciat sessió?resource.data             // dades del document existentrequest.resource.data     // dades que s'intenten escriure |
| :---- |

#### **Exemples pràctics de Firebase Rules**

| rules\_version \= '2';service cloud.firestore {  match /databases/{database}/documents {    // Regla 1: Perfils \-- lectura pública, escriptura únicament del propietari    match /perfils/{userId} {      allow read: if true;  // qualsevol pot llegir      allow create: if request.auth \!= null;  // autenticat per crear      allow update, delete: if request.auth \!= null                            && request.auth.uid \== userId;  // propietari    }    // Regla 2: Posts \-- lectura si publicat, escriptura del propietari    match /posts/{postId} {      allow read: if resource.data.publicat \== true               || request.auth.uid \== resource.data.autorId;      allow create: if request.auth \!= null                   && request.resource.data.autorId \== request.auth.uid;      allow update: if request.auth.uid \== resource.data.autorId;      allow delete: if request.auth.uid \== resource.data.autorId;    }    // Regla 3: Admin \-- custom claims al token JWT    match /configuracio/{doc} {      allow read, write: if request.auth \!= null                        && request.auth.token.admin \== true;      // ← 'admin' és un custom claim definit des del servidor    }    // Regla 4: Funcions reutilitzables    function estaAutenticat() {      return request.auth \!= null;    }    function esPropietari(userId) {      return estaAutenticat() && request.auth.uid \== userId;    }    match /comandes/{userId}/historial/{comandaId} {      allow read: if esPropietari(userId);      allow write: if false;  // ningú pot escriure directament    }    // Regla 5: Subcol·leccions amb wildcard recursiu    match /equips/{equipId}/{document\=\*\*} {      allow read, write: if request.auth.uid in        get(/databases/$(database)/documents/equips/$(equipId)).data.membres;      // ← consulta un altre document per verificar la pertinença    }  }} |
| :---- |

#### **Limitacions importants de Firebase Rules**

Les Security Rules de Firebase poden utilitzar el mètode `get()` per consultar altres documents, però cada `get()` compta com a lectura facturable. Les funcions únicament poden contenir una sola declaració `return` i no poden contenir lògica addicional.

**Supabase RLS (Row Level Security)**

Supabase usa RLS nativament com a primitiu de PostgreSQL. Quan necessites regles d'autorització granulars, res supera el Row Level Security de PostgreSQL. RLS **SEMPRE** ha d'estar habilitat en qualsevol taula emmagatzemada en un schema exposat.

La clau: les policies son com clàusules `WHERE` implícites que PostgreSQL afegeix automàticament a cada consulta.

#### 

#### **Habilitar RLS i crear policies**

| \-- Pas 1: Habilitar RLS a la taulaALTER TABLE perfils ENABLE ROW LEVEL SECURITY;\-- Sense policies: cap accés via API (tot tancat)\-- Amb policies: accés controlat per cada regla |
| :---- |

#### **Les funcions helper de Supabase**

| auth.uid()    \-- retorna l'UUID de l'usuari autenticat (null si no autenticat)auth.jwt()    \-- retorna el JWT complet de l'usuari |
| :---- |

Cal tenir en compte que `auth.uid()` retorna `null` quan es fa una petició sense un usuari autenticat. Pots pensar en les policies com afegir una clàusula `WHERE` a cada consulta. 

Una policy com `USING (auth.uid() = user_id)` es traduiria a `SELECT * FROM taula WHERE auth.uid() = taula.user_id`.

#### **Els rols de Supabase**

Supabase mapeja cada petició a un dels rols: `anon` (petició no autenticada) i `authenticated` (petició autenticada). Aquests son Rols de PostgreSQL reals.

| \-- El rol 'anon': usuari no autenticat\-- El rol 'authenticated': usuari autenticat (té JWT vàlid)\-- El rol 'service\_role': bypass complet de RLS (mai al frontend\!) |
| :---- |

#### **Policies per a cada operació CRUD**

| \-- Exemples complets per a una taula de posts:CREATE TABLE posts (  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  autor\_id UUID REFERENCES auth.users(id),  titol TEXT NOT NULL,  contingut TEXT,  publicat BOOLEAN DEFAULT FALSE,  creat\_at TIMESTAMPTZ DEFAULT NOW());ALTER TABLE posts ENABLE ROW LEVEL SECURITY;\-- SELECT: llegir posts publicats (tothom) o propis (propietari)CREATE POLICY "Llegir posts publicats o propis"ON posts FOR SELECTTO authenticated, anon  \-- s'aplica als dos rolsUSING (  publicat \= TRUE                    \-- tothom veu els publicats  OR autor\_id \= auth.uid()           \-- o el propietari veu els seus);\-- INSERT: únicament autenticats i com a propietarisCREATE POLICY "Crear posts com a propietari"ON posts FOR INSERTTO authenticatedWITH CHECK (autor\_id \= auth.uid());  \-- WITH CHECK per a INSERT/UPDATE\-- UPDATE: únicament el propietari pot actualitzarCREATE POLICY "Actualitzar posts propis"ON posts FOR UPDATETO authenticatedUSING (autor\_id \= auth.uid())        \-- USING: verifica la fila existentWITH CHECK (autor\_id \= auth.uid());  \-- WITH CHECK: verifica la fila nova\-- DELETE: únicament el propietari pot eliminarCREATE POLICY "Eliminar posts propis"ON posts FOR DELETETO authenticatedUSING (autor\_id \= auth.uid()); |
| :---- |

#### **Policies avançades amb `auth.jwt()`**

| \-- Nota important:\-- raw\_user\_meta\_data → el USUARI pot modificar-la (no usar per autorització\!)\-- raw\_app\_meta\_data  → ÚNICAMENT el servidor pot modificar-la (segura per autoritzar)\-- Rol d'admin guardat a app\_metadata (segur):CREATE POLICY "Admins poden llegir tot"ON posts FOR SELECTTO authenticatedUSING (  (auth.jwt() \-\> 'app\_metadata' \-\>\> 'rol') \= 'admin'  OR autor\_id \= auth.uid());\-- Verificar pertinença a un equip:CREATE POLICY "Membres de l'equip"ON documents FOR SELECTTO authenticatedUSING (  equip\_id IN (    SELECT jsonb\_array\_elements\_text(      auth.jwt() \-\> 'app\_metadata' \-\> 'equips'    )::UUID  )); |
| :---- |

#### **Service Role: bypass de RLS**

Supabase proporciona claus "Service" especials, que es poden usar per bypassar RLS. **Aquestes mai s'han d'usar al navegador ni exposar als clients**, però son útils per a tasques administratives.

| // ❌ MAI al frontend: la service key bypassa totes les policies\!const supabaseAdmin \= createClient(URL, SERVICE\_ROLE\_KEY);// ✅ Únicament al backend (servidor de confiança):// Operacions administratives, scripts de migració, etc. |
| :---- |

### **Appwrite Permissions**

| Appwrite usa un sistema de permisos declaratius per rol. Els permisos s'assignen directament a cada recurs (document, fitxer, col·lecció) en el moment de la creació o actualització.import { Permission, Role } from 'appwrite';// Crear un document amb permisos específicsconst document \= await databases.createDocument(  'DB\_ID',  'COLLECTION\_ID',  ID.unique(),  { titol: 'Post', contingut: '...' },  \[    // Qualsevol pot llegir    Permission.read(Role.any()),    // Únicament l'usuari propietari pot actualitzar i eliminar    Permission.update(Role.user(userId)),    Permission.delete(Role.user(userId)),    // Un equip específic pot llegir    Permission.read(Role.team('editors')),    // Usuaris autenticats poden crear    Permission.create(Role.users()),  \]);// Rols disponibles a Appwrite:Role.any()          // qualsevol (inclou no autenticats)Role.users()        // qualsevol usuari autenticatRole.user(userId)   // un usuari específic per IDRole.team(teamId)   // tots els membres d'un equipRole.team(teamId, 'rol')  // membres amb un rol específic dins l'equipRole.guests()       // únicament usuaris NO autenticats |
| :---- |

### **Comparativa dels tres sistemes**

| Aspecte | Firebase Rules | Supabase RLS | Appwrite Permissions |
| ----- | ----- | ----- | ----- |
| **Tecnologia** | CEL (Custom) | SQL natiu (PostgreSQL) | Declaratiu (SDK) |
| **On s'aplica** | Client-side \+ server | BD (PostgreSQL) | Servidor Appwrite |
| **Granularitat** | Document/col·lecció | Fila/operació | Document/fitxer |
| **Corba d'aprenentatge** | Alta (CEL \+ paths) | Moderada (SQL) | Baixa |
| **Portabilitat** | ❌ Propietari Firebase | ✅ PostgreSQL estàndard | ✅ Appwrite SDK |
| **Consultes externes** | `get()` (facturable) | `JOIN` SQL | No disponible |
| **Bypass admin** | Admin SDK | Service Role key | API Key del servidor |
| **Errors silenciosos** | Risc alt | Risc moderat | Risc baix |

**La regla d'or dels tres sistemes**

| Firebase:  per defecte TOT NEGAT → cal allow explícitSupabase:  RLS habilitat \+ cap policy → TOT NEGAT via API           (la service key bypassa RLS → mai al frontend\!)Appwrite:  sense permisos → únicament el creador té accésEls tres sistemes comparteixen el principi "Deny by Default":  → Si no hi ha una regla que permeti → accés denegat  → Millor massa restrictiu que massa permissiu  → Testar sempre amb usuaris sense privilegis |
| :---- |

