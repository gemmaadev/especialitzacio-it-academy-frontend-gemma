**¿Quins SDKs i mètodes d'integració ofereixen aquestes plataformes per a frameworks front-end com React, Vue o Angular?**

**La filosofia d'integració de cada plataforma**

Les tres plataformes proporcionen SDKs JavaScript/TypeScript que s'integren directament al codi del frontend. 

La diferència clau és el nivell de suport específic per a cada framework: 

- Firebase té l'ecosistema més madur (ReactFire, AngularFire, VueFire).   
- Supabase té el millor suport per a Next.js App Router.   
- Appwrite té el major nombre de SDKs per a plataformes (web, mòbil, backend).

**Firebase: SDKs i helpers per a cada framework**

### **Instal·lació i configuració base**

| npm install firebase |
| :---- |

| // src/lib/firebase.ts \-- configuració centralitzadaimport { initializeApp } from 'firebase/app';import { getFirestore } from 'firebase/firestore';import { getAuth } from 'firebase/auth';import { getStorage } from 'firebase/storage';const firebaseConfig \= {  apiKey: import.meta.env.VITE\_FIREBASE\_API\_KEY,  authDomain: import.meta.env.VITE\_FIREBASE\_AUTH\_DOMAIN,  projectId: import.meta.env.VITE\_FIREBASE\_PROJECT\_ID,  storageBucket: import.meta.env.VITE\_FIREBASE\_STORAGE\_BUCKET,  appId: import.meta.env.VITE\_FIREBASE\_APP\_ID,};export const app \= initializeApp(firebaseConfig);export const db \= getFirestore(app);export const auth \= getAuth(app);export const storage \= getStorage(app); |
| :---- |

### **ReactFire: hooks de React per a Firebase**

| npm install reactfire |
| :---- |

| // Proveïdors al root de l'aplicacióimport { FirebaseAppProvider, FirestoreProvider,         AuthProvider, useFirebaseApp } from 'reactfire';import { getFirestore } from 'firebase/firestore';import { getAuth } from 'firebase/auth';function AppProviders({ children }: { children: React.ReactNode }) {  const app \= useFirebaseApp();  return (    \<AuthProvider sdk={getAuth(app)}\>      \<FirestoreProvider sdk={getFirestore(app)}\>        {children}      \</FirestoreProvider\>    \</AuthProvider\>  );}export default function App() {  return (    \<FirebaseAppProvider firebaseConfig={firebaseConfig}\>      \<AppProviders\>        \<MyApp /\>      \</AppProviders\>    \</FirebaseAppProvider\>  );}// Ús als components amb hooks de ReactFireimport { useFirestoreCollection, useUser } from 'reactfire';import { collection, query, where } from 'firebase/firestore';function LlistaProductes() {  const { data: user } \= useUser();  // ← usuari autenticat reactiu  const { data: snap } \= useFirestoreCollection(    query(collection(db, 'productes'), where('actiu', '==', true))  );  return snap.docs.map(doc \=\> \<ProducteCard key={doc.id} {...doc.data()} /\>);} |
| :---- |

### **Sense ReactFire: hooks manuals (recomanat)**

| // hooks/useAuth.ts \-- hook manual d'autenticació Firebaseimport { useState, useEffect } from 'react';import { onAuthStateChanged, User } from 'firebase/auth';import { auth } from '@/lib/firebase';export function useAuth() {  const \[user, setUser\] \= useState\<User | null\>(null);  const \[loading, setLoading\] \= useState(true);  useEffect(() \=\> {    const unsubscribe \= onAuthStateChanged(auth, (user) \=\> {      setUser(user);      setLoading(false);    });    return unsubscribe;  // cleanup automàtic  }, \[\]);  return { user, loading, isAuthenticated: \!\!user };}// hooks/useFirestoreQuery.ts \-- hook per a consultes en temps realimport { useState, useEffect } from 'react';import { Query, onSnapshot, QuerySnapshot } from 'firebase/firestore';export function useFirestoreQuery\<T\>(q: Query) {  const \[dades, setDades\] \= useState\<T\[\]\>(\[\]);  const \[loading, setLoading\] \= useState(true);  useEffect(() \=\> {    const unsubscribe \= onSnapshot(q, (snap: QuerySnapshot) \=\> {      setDades(snap.docs.map(d \=\> ({ id: d.id, ...d.data() } as T)));      setLoading(false);    });    return unsubscribe;  }, \[\]);  return { dades, loading };} |
| :---- |

### **AngularFire i VueFire**

| \# Angularnpm install @angular/fireng add @angular/fire\# Vuenpm install vuefire firebase |
| :---- |

| // Vue 3 amb VueFireimport { createApp } from 'vue';import { VueFire, VueFireAuth } from 'vuefire';import App from './App.vue';const app \= createApp(App);app.use(VueFire, { firebaseApp: app, modules: \[VueFireAuth()\] });app.mount('\#app');// Al component Vue:import { useCollection, useCurrentUser } from 'vuefire';import { collection } from 'firebase/firestore';const usuari \= useCurrentUser();const productes \= useCollection(collection(db, 'productes'));// → reactiu automàticament\! |
| :---- |

**Supabase: SDK oficial amb excel·lent suport Next.js**

### **Instal·lació**

| npm install @supabase/supabase-js\# Per a Next.js (SSR/App Router):npm install @supabase/ssr |
| :---- |

### **Configuració base**

| // src/lib/supabase.tsimport { createClient } from '@supabase/supabase-js';import type { Database } from './database.types';  // ← tipos generats automàticament\!export const supabase \= createClient\<Database\>(  process.env.NEXT\_PUBLIC\_SUPABASE\_URL\!,  process.env.NEXT\_PUBLIC\_SUPABASE\_ANON\_KEY\!); |
| :---- |

### **Supabase \+ Next.js App Router (el millor suport)**

Supabase té millor integració per a Next.js App Router. El paquet `@supabase/ssr` proporciona utilitats per a server components, route handlers i middleware.

| // utils/supabase/server.ts \-- client per al servidorimport { createServerClient } from '@supabase/ssr';import { cookies } from 'next/headers';export function createClient() {  const cookieStore \= cookies();  return createServerClient(    process.env.NEXT\_PUBLIC\_SUPABASE\_URL\!,    process.env.NEXT\_PUBLIC\_SUPABASE\_ANON\_KEY\!,    { cookies: { getAll: () \=\> cookieStore.getAll() } }  );}// app/productes/page.tsx \-- React Server Componentexport default async function ProductesPage() {  const supabase \= createClient();  // Consulta directa al servidor (sense exposa dades al client\!)  const { data: productes } \= await supabase    .from('productes')    .select('\*')    .eq('publicat', true);  return \<LlistaProductes productes={productes ?? \[\]} /\>;}// middleware.ts \-- revalidar sessió automàticamentimport { createServerClient } from '@supabase/ssr';import { NextResponse } from 'next/server';export async function middleware(request: NextRequest) {  const supabase \= createServerClient(/\* ... \*/);  await supabase.auth.getUser();  // refresca el token si ha expirat  return NextResponse.next();} |
| :---- |

### **Supabase \+ React (client-side)**

| // Hook personalitzat per a autenticaciófunction useSupabaseAuth() {  const \[user, setUser\] \= useState(null);  useEffect(() \=\> {    supabase.auth.getUser().then(({ data: { user } }) \=\> setUser(user));    const { data: { subscription } } \= supabase.auth.onAuthStateChange(      (event, session) \=\> setUser(session?.user ?? null)    );    return () \=\> subscription.unsubscribe();  }, \[\]);  return user;}// Hook per a temps realfunction useLlistaProductes() {  const \[productes, setProductes\] \= useState(\[\]);  useEffect(() \=\> {    // Càrrega inicial    supabase.from('productes').select('\*')      .then(({ data }) \=\> setProductes(data ?? \[\]));    // Subscripció en temps real    const canal \= supabase      .channel('productes-canal')      .on('postgres\_changes',        { event: '\*', schema: 'public', table: 'productes' },        (payload) \=\> {          if (payload.eventType \=== 'INSERT')            setProductes(prev \=\> \[...prev, payload.new\]);          if (payload.eventType \=== 'DELETE')            setProductes(prev \=\> prev.filter(p \=\> p.id \!== payload.old.id));        }      )      .subscribe();    return () \=\> supabase.removeChannel(canal);  }, \[\]);  return productes;} |
| :---- |

### **Tipus TypeScript generats automàticament**

Una funcionalitat exclusiva de Supabase: pots generar tipus TypeScript automàticament des del teu esquema PostgreSQL, que proporciona autocompletat i validació de tipus per a les teves consultes.

| \# Generar tipus automàticament des de l'esquemanpx supabase gen types typescript \--project-id YOUR\_PROJECT\_ID \> src/lib/database.types.ts\# Ara el client és totalment tipat:const { data } \= await supabase.from('productes').select('nom, preu');// TypeScript sap exactament quins camps existeixen i quins tipus tenen\! |
| :---- |

**Appwrite: SDKs multi-plataforma**

### **Instal·lació**

| \# Web (React, Vue, Angular, Svelte, vanilla JS)npm install appwrite\# Node.js (servidor, SSR)npm install node-appwrite |
| :---- |

### **Configuració base**

| // src/lib/appwrite.tsimport { Client, Account, Databases, Storage } from 'appwrite';const client \= new Client()  .setEndpoint(import.meta.env.VITE\_APPWRITE\_ENDPOINT) // 'https://cloud.appwrite.io/v1'  .setProject(import.meta.env.VITE\_APPWRITE\_PROJECT\_ID);export const account \= new Account(client);export const databases \= new Databases(client);export const storage \= new Storage(client); |
| :---- |

### **Appwrite \+ React**

| // Autenticació amb Appwritefunction useAppwriteAuth() {  const \[user, setUser\] \= useState(null);  useEffect(() \=\> {    account.get()      .then(setUser)      .catch(() \=\> setUser(null));  }, \[\]);  const login \= async (email: string, password: string) \=\> {    await account.createEmailPasswordSession(email, password);    const user \= await account.get();    setUser(user);  };  const logout \= async () \=\> {    await account.deleteSession('current');    setUser(null);  };  return { user, login, logout };}// CRUD amb Appwrite Databasesfunction useLlistaProductes() {  const \[productes, setProductes\] \= useState(\[\]);  useEffect(() \=\> {    databases.listDocuments('DB\_ID', 'COLLECTION\_ID', \[      Query.equal('publicat', true),      Query.orderDesc('$createdAt'),      Query.limit(20),    \]).then(({ documents }) \=\> setProductes(documents));  }, \[\]);  return productes;}// Temps real amb AppwriteuseEffect(() \=\> {  const unsubscribe \= client.subscribe(    \`databases.DB\_ID.collections.COLLECTION\_ID.documents\`,    (response) \=\> {      if (response.events.includes('databases.\*.collections.\*.documents.\*.create')) {        setProductes(prev \=\> \[...prev, response.payload\]);      }    }  );  return () \=\> unsubscribe();}, \[\]); |
| :---- |

### **SDKs disponibles per plataforma**

| FIREBASE: Web (modular), Android, iOS, Unity, C++, FlutterSUPABASE: JavaScript/TypeScript, Python, Swift, Kotlin, Go, C\#, FlutterAPPWRITE:  Web, Node.js, PHP, Python, Ruby, Dart/Flutter,           Kotlin (Android), Swift (iOS), .NET, Deno |
| :---- |

**Comparativa d'integració**

| Aspecte | Firebase | Supabase | Appwrite |
| ----- | ----- | ----- | ----- |
| **SDK principal** | `firebase` | `@supabase/supabase-js` | `appwrite` |
| **Mida bundle** | \~100KB (modular) | \~65KB | \~60KB |
| **TypeScript** | ✅ Bàsic | ✅ Excellent (tipus generats) | ✅ Bo |
| **React hooks** | ReactFire / manuals | `@supabase/ssr` \+ manuals | Manuals |
| **Next.js App Router** | ✅ Bo | ✅ Excel·lent | ✅ Bo |
| **Vue** | VueFire | Manuals | Manuals |
| **Angular** | AngularFire | Manuals | Manuals |
| **Temps real** | onSnapshot (natiu) | canal subscriptions | client.subscribe |
| **Offline support** | ✅ Firebase offline | ❌ | ❌ |
| **REST API directa** | ❌ | ✅ PostgREST | ✅ REST \+ GraphQL |

