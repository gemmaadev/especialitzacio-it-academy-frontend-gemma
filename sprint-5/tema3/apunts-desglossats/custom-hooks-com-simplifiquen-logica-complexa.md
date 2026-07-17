## **Com els hooks personalitzats simplifiquen la lògica complexa?**

**Hooks personalitzats**  
[https://react.dev/learn/reusing-logic-with-custom-hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)  
Documentació oficial sobre com reutilitzar lògica creant hooks personalitzats.

**Lògica que desitjaries que existís**

React inclou hooks integrats com `useState`, `useContext` i `useEffect`. 

De vegades, voldràs que hi hagués un hook per a un propòsit més específic: per exemple, per fer fetch de dades, per mantenir el seguiment de si l'usuari és online, o per connectar-se a una sala de xat. Potser no trobaràs aquests hooks a React, però pots crear els teus propis.

La clau: quan extreus lògica en Custom Hooks, pots amagar els detalls complexos de com tractes amb algun sistema extern o una API del browser. El codi dels teus components expressa la teva intenció, no la implementació.

**Regla fonamental: el prefix `use`**

Els noms dels hooks han de començar per `use` seguit d'una lletra majúscula. Aquesta convenció garanteix que sempre pots mirar un component i saber on es pot "amagar" el seu estat, Effects, i altres característiques de React.

| // ✅ Custom Hooks: comencen per 'use'useOnlineStatus()useChatRoom(options)useData(url)useWindowSize()useFormInput(initialValue)// ✅ Funcions regulars: NO comencen per 'use' si no criden HooksgetSorted(items)      // ← funció pura, no usa hooksformatDate(date)      // ← funció pura, no usa hooks// La diferència importa:// → getSorted() → pots cridar-la condicionalment// → useOnlineStatus() → MAI en condicionals (regla dels Hooks) |
| :---- |

**El problema que resolen: duplicació de lògica**

| // ❌ SENSE Custom Hook: la mateixa lògica duplicada en dos componentsfunction StatusBar() {  const \[isOnline, setIsOnline\] \= useState(true);  useEffect(() \=\> {    const on \= () \=\> setIsOnline(true);    const off \= () \=\> setIsOnline(false);    window.addEventListener('online', on);    window.addEventListener('offline', off);    return () \=\> {      window.removeEventListener('online', on);      window.removeEventListener('offline', off);    };  }, \[\]);  return \<h1\>{isOnline ? '✅ Online' : '❌ Desconnectat'}\</h1\>;}function SaveButton() {  // ← EXACTAMENT la mateixa lògica duplicada\!  const \[isOnline, setIsOnline\] \= useState(true);  useEffect(() \=\> {    const on \= () \=\> setIsOnline(true);    const off \= () \=\> setIsOnline(false);    window.addEventListener('online', on);    window.addEventListener('offline', off);    return () \=\> {      window.removeEventListener('online', on);      window.removeEventListener('offline', off);    };  }, \[\]);  return \<button disabled={\!isOnline}\>    {isOnline ? 'Desar' : 'Reconnectant...'}  \</button\>;}// ✅ AMB Custom Hook: lògica extreta i compartidafunction useOnlineStatus() {  const \[isOnline, setIsOnline\] \= useState(true);  useEffect(() \=\> {    const on \= () \=\> setIsOnline(true);    const off \= () \=\> setIsOnline(false);    window.addEventListener('online', on);    window.addEventListener('offline', off);    return () \=\> {      window.removeEventListener('online', on);      window.removeEventListener('offline', off);    };  }, \[\]);  return isOnline;}// Ara els dos components son declaratius i nets:function StatusBar() {  const isOnline \= useOnlineStatus(); // ← la lògica viu aquí  return \<h1\>{isOnline ? '✅ Online' : '❌ Desconnectat'}\</h1\>;}function SaveButton() {  const isOnline \= useOnlineStatus(); // ← la mateixa lògica  return \<button disabled={\!isOnline}\>    {isOnline ? 'Desar' : 'Reconnectant...'}  \</button\>;} |
| :---- |

El codi dins dels components descriu **quèvolen fer** (usar l'estat online\!) en lloc de **com fer-ho** (subscrivint-se als events del browser).

**Els custom hooks comparteixen LÒGICA, no ESTAT**

Aquesta distinció és crítica. Cada crida a un Hook és completament independent de tota altra crida al mateix Hook.

| function StatusBar() {  const isOnline \= useOnlineStatus();  // → té el SEU PROPI useState i useEffect}function SaveButton() {  const isOnline \= useOnlineStatus();  // → té el SEU PROPI useState i useEffect (independent\!)}// Funciona de la MATEIXA manera que si haguessis escrit:function StatusBar() {  const \[isOnline, setIsOnline\] \= useState(true);  // ← propi  useEffect(() \=\> { /\* ... \*/ }, \[\]);               // ← propi}function SaveButton() {  const \[isOnline, setIsOnline\] \= useState(true);  // ← propi, independent\!  useEffect(() \=\> { /\* ... \*/ }, \[\]);               // ← propi, independent\!}// → Estan sincronitzats perquè ambdós s'actualitzen des del MATEIX event extern// → NO perquè comparteixin la mateixa variable d'estat |
| :---- |

**Exemple complet: `useData` per a Data Fetching**

La documentació oficial mostra com múltiples `useEffect` repetitius es poden simplificar:

| // ❌ SENSE Custom Hook: dos useEffect similars en un componentfunction ShippingForm({ country }: { country: string }) {  const \[cities, setCities\] \= useState(null);  useEffect(() \=\> {    let ignore \= false;    fetch(\`/api/cities?country=${country}\`)      .then(r \=\> r.json())      .then(data \=\> { if (\!ignore) setCities(data); });    return () \=\> { ignore \= true; };  }, \[country\]);  const \[city, setCity\] \= useState(null);  const \[areas, setAreas\] \= useState(null);  useEffect(() \=\> {    if (city) {      let ignore \= false;      fetch(\`/api/areas?city=${city}\`)        .then(r \=\> r.json())        .then(data \=\> { if (\!ignore) setAreas(data); });      return () \=\> { ignore \= true; };    }  }, \[city\]);  // ...}// ✅ AMB Custom Hook: la lògica de fetch s'extreu i es reutilitzafunction useData\<T\>(url: string | null) {  const \[dades, setDades\] \= useState\<T | null\>(null);  useEffect(() \=\> {    if (\!url) return;    let ignore \= false;    fetch(url)      .then(r \=\> r.json())      .then(d \=\> { if (\!ignore) setDades(d); });    return () \=\> { ignore \= true; };  }, \[url\]);  return dades;}// Component molt més net i declaratiu:function ShippingForm({ country }: { country: string }) {  const cities \= useData\<City\[\]\>(\`/api/cities?country=${country}\`);  const \[city, setCity\] \= useState\<string | null\>(null);  const areas \= useData\<Area\[\]\>(city ? \`/api/areas?city=${city}\` : null);  // ...}// → Extreure un Custom Hook fa explícit el flux de dades:// → url entra → dades surten |
| :---- |

**Passar valors reactius entre Hooks**

Els Custom Hooks re-s'executen en cada re-render del component. Això significa que sempre reben els últims props i estat.

| // Les props passen a través de la cadena de hooksfunction ChatRoom({ roomId }: { roomId: string }) {  const \[serverUrl, setServerUrl\] \= useState('https://localhost:1234');  // serverUrl i roomId son valors reactius → passen al hook  useChatRoom({    roomId: roomId,       // ← reactiu: re-executa l'efecte quan canvia    serverUrl: serverUrl, // ← reactiu: re-executa l'efecte quan canvia  });  return \<input value={serverUrl} onChange={e \=\> setServerUrl(e.target.value)} /\>;}// El Custom Hook usa els valors actualitzatsfunction useChatRoom({ serverUrl, roomId }: { serverUrl: string; roomId: string }) {  useEffect(() \=\> {    const connexio \= createConnection({ serverUrl, roomId });    connexio.connect();    return () \=\> connexio.disconnect();  }, \[serverUrl, roomId\]); // ← deps actualitzades → l'efecte es re-executa}// → Quan roomId canvia → useChatRoom detecta el canvi → desconnecta → reconnecta// → El component no sap COM funciona, únicament QUIN efecte vol |
| :---- |

**Passar Event Handlers a Custom Hooks**

| // Problema: si el component passa un callback al hook, cal evitar re-execucionsfunction useChatRoom({ serverUrl, roomId, onMessage }: Options) {  // ✅ useEffectEvent evita que 'onMessage' sigui una dependència  // → el hook no es re-executa cada vegada que el component re-renderitza  const onMissatge \= useEffectEvent(onMessage); // React 19.2 (estable)  useEffect(() \=\> {    const connexio \= createConnection({ serverUrl, roomId });    connexio.connect();    connexio.on('message', (msg) \=\> onMissatge(msg));    return () \=\> connexio.disconnect();  }, \[serverUrl, roomId\]); // ← 'onMessage' NO és dependència gràcies a useEffectEvent}// Ús: el component pot passar qualsevol funció sense causar re-connexionsfunction ChatRoom({ roomId }: { roomId: string }) {  const \[serverUrl, setServerUrl\] \= useState('https://localhost:1234');  useChatRoom({    roomId,    serverUrl,    onMessage(msg) {      // Aquesta funció canvia en cada render però NO causa re-connexió      mostrarNotificacio(\`Nou missatge: ${msg}\`);    },  });} |
| :---- |

**Quan extreure un Custom Hook**

Sempre que escriguis un Effect, considera si seria més clar embolcallar-lo en un Custom Hook. No necessites extreure un Custom Hook per a cada petit fragment de codi duplicat. Alguna duplicació és acceptable.

| // ✅ Extreure: quan la mateixa lògica es repeteix en múltiples components// ✅ Extreure: quan l'Effect és complex i amaga els detalls al consumidor// ✅ Extreure: per facilitar la migració futura a noves APIs de React// 🔴 EVITAR: Custom Hooks de "lifecycle" que emulen patrons de classesfunction useMount(fn: () \=\> void) {  useEffect(() \=\> { fn(); }, \[\]); // ← problemàtic: 'fn' hauria d'estar a les deps}// → No s'adapta bé al paradigma de React// → El linter no pot detectar dependencies mancants// → useMount(fn) oculta dependències importants// ✅ Millor: efectes específics i amb propòsit clarfunction useChatRoom(options) { ... }     // ← propòsit clarfunction useImpressionLog(event) { ... } // ← propòsit clar |
| :---- |

**Migració sense canviar components: el super-poder dels Custom Hooks**

Si embolcalles els Effects en Custom Hooks, pots millorar la implementació sense tocar cap component.

| // v1: implementació manual amb useState \+ useEffectexport function useOnlineStatus() {  const \[isOnline, setIsOnline\] \= useState(true);  useEffect(() \=\> {    const on \= () \=\> setIsOnline(true);    const off \= () \=\> setIsOnline(false);    window.addEventListener('online', on);    window.addEventListener('offline', off);    return () \=\> {      window.removeEventListener('online', on);      window.removeEventListener('offline', off);    };  }, \[\]);  return isOnline;}// v2: migrar a useSyncExternalStore (millor rendiment, SSR-compatible)// → Sense tocar cap component que usa useOnlineStatus\!export function useOnlineStatus() {  return useSyncExternalStore(    (callback) \=\> {      window.addEventListener('online', callback);      window.addEventListener('offline', callback);      return () \=\> {        window.removeEventListener('online', callback);        window.removeEventListener('offline', callback);      };    },    () \=\> navigator.onLine, // valor al client    () \=\> true              // valor al servidor (SSR)  );}// StatusBar i SaveButton → NO canvien res\! Segueixen usant:const isOnline \= useOnlineStatus(); |
| :---- |

**Resum: per què els Custom Hooks simplifiquen la lògica**

1\. ELIMINEN DUPLICACIÓ:  
   La mateixa lògica (fetch, subscripcions, timers) es defineix UNA sola vegada  
   i es reutilitza en tots els components que la necessitin

2\. FAN EL CODI DECLARATIU:  
   Els components diuen QUÈ volen → no COM funciona  
   useChatRoom(options) vs. tres useEffect complexos

3\. ENCAPSULEN COMPLEXITAT:  
   Els detalls d'implementació (cleanup, race conditions, AbortController)  
   queden amagats dins del hook → el component és net

4\. PERMETEN MIGRACIÓ SENSE DOLOR:  
   Canviar la implementació interna del hook  
   → cap dels seus consumers necessita actualitzar-se

5\. COMPARTEIXEN LÒGICA, NO ESTAT:  
   Cada component que crida el hook té el seu propi estat independent  
   → estan sincronitzats per la font externa, no per compartir variables

La regla:  
  Sempre que es mogui un Effect dins d'un component, considera  
  si tindria sentit extreure'l en un Custom Hook.  
  L'Effect ja en si és un "escape hatch" → el Hook el fa menys impactant.

