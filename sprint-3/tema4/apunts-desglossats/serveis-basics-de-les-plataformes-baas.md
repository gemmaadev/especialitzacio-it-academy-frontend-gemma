**¿Quins serveis bàsics ofereixen les plataformes BaaS (auth, base de dades, emmagatzematge, funcions)?**

**El paquet estàndard: què ofereix un BaaS**

Totes les plataformes BaaS ofereixen un conjunt de primitius comuns: autenticació, base de dades, emmagatzematge de fitxers, i funcions serverless. 

La diferència és com els implementen, quines extensions ofereixen, i quin grau de flexibilitat donen al developer.

**Servei 1: Autenticació**

### **Firebase Authentication**

Firebase Authentication proporciona suport per a múltiples mètodes de login. L'autenticació de Firebase funciona estretament amb les Security Rules de Firebase. 

El control d'accés viu prop de les dades, facilitant l'aplicació de les polítiques.

| // Firebase Auth SDK al frontendimport { getAuth, signInWithEmailAndPassword,         signInWithPopup, GoogleAuthProvider,         createUserWithEmailAndPassword } from 'firebase/auth';const auth \= getAuth();// Email/passwordawait signInWithEmailAndPassword(auth, email, password);// OAuth (Google, GitHub, Facebook, Apple, Twitter, Microsoft...)const provider \= new GoogleAuthProvider();await signInWithPopup(auth, provider);// Listeners d'estat d'autenticacióonAuthStateChanged(auth, (user) \=\> {  if (user) console.log('UID:', user.uid);  else console.log('No autenticat');}); |
| :---- |

**Mètodes d'autenticació Firebase:** email/password, número de telèfon (SMS), Google, Facebook, Twitter, GitHub, Apple, Microsoft, Yahoo, anònim, custom tokens.

### **Supabase Auth (GoTrue)**

Supabase usa JWT tokens i polítiques basades en rols. El Row-level Security permet control per fila, no únicament per taula.

| // Supabase Auth SDKimport { createClient } from '@supabase/supabase-js';const supabase \= createClient(URL, ANON\_KEY);// Registre i loginconst { data, error } \= await supabase.auth.signUp({ email, password });const { data, error } \= await supabase.auth.signInWithPassword({ email, password });// OAuthawait supabase.auth.signInWithOAuth({ provider: 'google' });// Magic Link (passwordless)await supabase.auth.signInWithOtp({ email });// Listener d'estatsupabase.auth.onAuthStateChange((event, session) \=\> {  console.log(event, session?.user);});// Obtenir l'usuari actualconst { data: { user } } \= await supabase.auth.getUser(); |
| :---- |

**Mètodes d'autenticació Supabase:** email/password, magic link, OAuth (20+ providers), telèfon (SMS), SAML (enterprise), anònim.

### **Appwrite Auth**

| // Appwrite Auth SDKimport { Client, Account, ID } from 'appwrite';const client \= new Client()  .setEndpoint('https://cloud.appwrite.io/v1')  .setProject(PROJECT\_ID);const account \= new Account(client);// Registreawait account.create(ID.unique(), email, password, nom);// Login email/passwordawait account.createEmailPasswordSession(email, password);// OAuth (Google, GitHub, Facebook, etc.)account.createOAuth2Session('google',  'https://app.com/success',  'https://app.com/failure');// Obtenir sessió actualconst user \= await account.get(); |
| :---- |

**Mètodes d'autenticació Appwrite:** email/password, magic link, OAuth (30+ providers), telèfon (SMS), JWT, anònim, SAML, equips (Teams).

**Servei 2: Base de dades**

### **Firebase Firestore (NoSQL)**

| import { getFirestore, collection, doc,         addDoc, getDoc, updateDoc, deleteDoc,         query, where, onSnapshot } from 'firebase/firestore';const db \= getFirestore();// CREATEconst docRef \= await addDoc(collection(db, 'posts'), {  titol: 'Primer post',  autorId: user.uid,  creatAt: serverTimestamp()});// READ per IDconst snap \= await getDoc(doc(db, 'posts', docRef.id));if (snap.exists()) console.log(snap.data());// READ amb filtresconst q \= query(  collection(db, 'posts'),  where('autorId', '==', user.uid),  orderBy('creatAt', 'desc'),  limit(10));const querySnap \= await getDocs(q);// TEMPS REAL: subscripció en temps realconst unsubscribe \= onSnapshot(q, (snapshot) \=\> {  snapshot.forEach((doc) \=\> console.log(doc.data()));});// → s'actualitza automàticament quan canvien les dades\!// UPDATEawait updateDoc(doc(db, 'posts', id), { titol: 'Nou títol' });// DELETEawait deleteDoc(doc(db, 'posts', id)); |
| :---- |

### **Supabase Database (PostgreSQL)**

| // Supabase: SQL a través del client JavaScript// L'API auto-generada per PostgREST reflecteix l'esquema SQL// CREATEconst { data, error } \= await supabase  .from('posts')  .insert({ titol: 'Post', autor\_id: user.id })  .select()  .single();// READ amb filtres i relacions (JOIN)const { data } \= await supabase  .from('posts')  .select(\`    id, titol, creat\_at,    autor:usuaris(nom, avatar\_url),    comentaris(count)  \`)  .eq('publicat', true)  .order('creat\_at', { ascending: false })  .range(0, 9);  // paginació// TEMPS REALconst canal \= supabase  .channel('posts-canal')  .on('postgres\_changes',    { event: '\*', schema: 'public', table: 'posts' },    (payload) \=\> console.log('Canvi:', payload)  )  .subscribe();// UPDATEawait supabase.from('posts')  .update({ titol: 'Nou títol' })  .eq('id', id);// DELETEawait supabase.from('posts').delete().eq('id', id);// SQL directe (per a consultes complexes)const { data } \= await supabase.rpc('func\_personalitzada', { param: valor }); |
| :---- |

### **Appwrite Databases**

| import { Databases, Query } from 'appwrite';const databases \= new Databases(client);// CREATEconst doc \= await databases.createDocument(  'DB\_ID', 'COLLECTION\_ID', ID.unique(),  { titol: 'Post', contingut: '...' },  \[Permission.read(Role.any()), Permission.write(Role.user(userId))\]);// READ amb filtresconst { documents } \= await databases.listDocuments(  'DB\_ID', 'COLLECTION\_ID',  \[    Query.equal('publicat', true),    Query.orderDesc('$createdAt'),    Query.limit(10),    Query.offset(0),  \]);// UPDATEawait databases.updateDocument('DB\_ID', 'COLLECTION\_ID', id, { titol: 'Nou' });// DELETEawait databases.deleteDocument('DB\_ID', 'COLLECTION\_ID', id); |
| :---- |

**Servei 3: Emmagatzematge de fitxers**

### **Firebase Storage**

| import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';const storage \= getStorage();// Pujar un fitxerconst fitxerRef \= ref(storage, \`avatars/${user.uid}/foto.jpg\`);const snapshot \= await uploadBytes(fitxerRef, file);const url \= await getDownloadURL(snapshot.ref);// → URL pública o protegida per Security Rules// Eliminarawait deleteObject(fitxerRef); |
| :---- |

### **Supabase Storage**

| // Supabase Storage: buckets amb polítiques RLS integradesconst { data, error } \= await supabase.storage  .from('avatars')  .upload(\`${user.id}/foto.jpg\`, file, {    cacheControl: '3600',    upsert: true  });// Obtenir URL públicaconst { data: { publicUrl } } \= supabase.storage  .from('avatars')  .getPublicUrl(\`${user.id}/foto.jpg\`);// URL signada (accés temporal)const { data: { signedUrl } } \= await supabase.storage  .from('privat')  .createSignedUrl('document.pdf', 3600);  // vàlida 1 hora |
| :---- |

### **Appwrite Storage**

| import { Storage, InputFile } from 'appwrite';const storage \= new Storage(client);// Pujar fitxerconst file \= await storage.createFile(  'BUCKET\_ID', ID.unique(), document.getElementById('input').files\[0\],  \[Permission.read(Role.any())\]);// Obtenir URL de previsualització (amb transformacions\!)const url \= storage.getFilePreview(  'BUCKET\_ID', file.$id,  800, 600,  // amplada, alçada  'center',  // crop  80         // qualitat JPEG);// ← Appwrite suporta transformacions d'imatge natives\! |
| :---- |

**Servei 4: Funcions serverless**

| Característica | Firebase Functions | Supabase Edge Functions | Appwrite Functions |
| ----- | ----- | ----- | ----- |
| **Runtime** | Node.js, Python | Deno (TypeScript) | Node.js, Python, Ruby, PHP, Dart... |
| **Triggers** | HTTP, DB, Auth, Storage... | HTTP | HTTP, Events (DB, Auth...) |
| **Deploy** | Firebase CLI | Supabase CLI | Appwrite CLI o consola |
| **Cold start** | Moderat | Molt baix (Edge) | Moderat |
| **Pla gratuït** | 125K invocacions/mes | 500K invocacions/mes | 750K execucions/mes |

| // Supabase Edge Function (Deno TypeScript)// supabase/functions/salutacio/index.tsimport { serve } from 'https://deno.land/std@0.168.0/http/server.ts';import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';serve(async (req: Request) \=\> {  const supabase \= createClient(    Deno.env.get('SUPABASE\_URL')\!,    Deno.env.get('SUPABASE\_SERVICE\_ROLE\_KEY')\!  );  const { nom } \= await req.json();  return new Response(    JSON.stringify({ missatge: \`Hola, ${nom}\!\` }),    { headers: { 'Content-Type': 'application/json' } }  );}); |
| :---- |

**Servei 5: Temps real (Realtime)**

Les tres plataformes suporten dades en temps real però amb implementacions molt diferentes:

Firebase Realtime/Firestore:  
  → Temps real dissenyat des del principi  
  → Listeners directes als documents/col·leccions  
  → Suport offline-first natiu (sincronitza quan recupera connexió)  
  → La millor opció per a apps de xat, col·laboració

Supabase Realtime:  
  → Basat en PostgreSQL logical replication  
  → Subscripcions a canvis de taules específiques  
  → Broadcast i Presence (per a apps multi-usuari en temps real)  
  → No té suport offline natiu com Firebase

Appwrite Realtime:  
  → WebSockets natius  
  → Subscripcions a events de BD, auth, storage, funcions  
  → Notificacions en temps real multi-event

**Servei exclusiu per plataforma**

Firebase:  
  → Analytics (Google Analytics integrat)  
  → Crashlytics (crash reporting d'apps)  
  → FCM (Firebase Cloud Messaging \= push notifications mòbil)  
  → Remote Config (configuració dinàmica sense deploy)  
  → A/B Testing integrat  
  → ML Kit (machine learning al dispositiu)

Supabase:  
  → pg\_vector (cerca vectorial per a IA)  
  → PostGIS (dades geoespacials)  
  → Database Branching (entorns de previsualització)  
  → pg\_cron (tasques programades dins la BD)  
  → MCP Server (integració amb agents d'IA)

Appwrite:  
  → Messaging (push, email, SMS integrats en un sol servei)  
  → Sites (hosting de SPAs i SSR)  
  → Marketplace d'integrations  
  → Transformacions d'imatge natives (resize, crop, format)

**Resum** 

| Servei | Firebase | Supabase | Appwrite |
| ----- | ----- | ----- | ----- |
| **Auth** | ✅ Molt completa | ✅ Completa | ✅ Completa |
| **Base de dades** | Firestore (NoSQL) | PostgreSQL (SQL) | Documents (semi-estructura) |
| **Storage** | ✅ | ✅ | ✅ \+ transformacions |
| **Funcions** | ✅ Node.js/Python | ✅ Deno TS | ✅ Multi-runtime |
| **Temps real** | ✅ Millor del mercat | ✅ Bo | ✅ Bo |
| **Push notifications** | ✅ FCM | ⚠️ Limitat | ✅ Integrat |
| **Analytics** | ✅ Google Analytics | ❌ | ❌ |
| **IA / Vectors** | ⚠️ Limitat | ✅ pg\_vector | ❌ |
| **Self-host** | ❌ | ✅ Complex | ✅ Docker simple |

