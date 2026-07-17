## **Com afecten els efectes secundaris al rendiment i predictibilitat de React**

**Què és un efecte secundari en React**

Els efectes secundaris son operacions que afecten alguna cosa fora de l'àmbit de la funció que s'executa. En React, inclouen: data fetching, subscripcions, manipulació del DOM, timers, event listeners, i qualsevol operació I/O. 

No son part de l'output de renderitzat del component i s'han de gestionar fora de la fase de renderitzat.

**Impacte 1: Re-renders innecessaris**

El primer impacte en el rendiment és quan els efectes disparen re-renders que no calen.

| // ❌ MAL: efecte que dispara re-renders en cadenafunction ComponenteProblematic() {  const \[dades, setDades\] \= useState(\[\]);  const \[filtrades, setFiltrades\] \= useState(\[\]);  useEffect(() \=\> {    fetch('/api/dades').then(r \=\> r.json()).then(setDades);  }, \[\]);  // ❌ Segon efecte innecessari → re-render addicional\!  useEffect(() \=\> {    setFiltrades(dades.filter(d \=\> d.actiu));    // → Quan 'dades' canvia → aquest efecte s'executa    // → setFiltrades → nou re-render    // → Total: 3 renders (inicial \+ dades \+ filtrades)  }, \[dades\]);  return \<Llista items={filtrades} /\>;}// ✅ BÉ: càlcul derivat durant el render (sense efecte)function ComponenteOptimitzat() {  const \[dades, setDades\] \= useState(\[\]);  // Calcular directament durant el render → ZERO re-renders addicionals  const filtrades \= dades.filter(d \=\> d.actiu);  useEffect(() \=\> {    fetch('/api/dades').then(r \=\> r.json()).then(setDades);  }, \[\]);  return \<Llista items={filtrades} /\>;}// → Total: 2 renders (inicial \+ dades) → un render menys |
| :---- |

**Impacte 2: El Stale Closure — el bug silenciós**

El problema del stale closure és real i desagradable: el teu efecte captura silenciosament valors desactualitzats i els segueix usant per sempre. I el pitjor? Sovint "funciona" fins que deixa de fer-ho.

| // ❌ STALE CLOSURE: l'efecte "recorda" el valor anticfunction Comptador() {  const \[count, setCount\] \= useState(0);  useEffect(() \=\> {    const timer \= setInterval(() \=\> {      // 'count' sempre és 0 aquí\! (stale closure)      console.log('count actual:', count); // → sempre "0"      setCount(count \+ 1);  // → sempre passa de 0 a 1\!    }, 1000);    return () \=\> clearInterval(timer);  }, \[\]); // ← \[\] significa "no s'actualitza mai" → count congelat a 0  return \<p\>{count}\</p\>;  // → UI mostra 1 sempre (no incrementa\!)} |
| :---- |

El per què tècnic: React crea l'efecte una vegada, durant el primer render, i aquell efecte és permanent amb el valor de 'count' del primer render. La UI de React mostra el present. Les closures recorden el passat. Les dependency arrays decideixen quan es posen al dia.

| // ✅ SOLUCIÓ 1: incloure 'count' a les dependenciesuseEffect(() \=\> {  const timer \= setInterval(() \=\> {    setCount(count \+ 1); // → ara 'count' és el valor actual  }, 1000);  return () \=\> clearInterval(timer);}, \[count\]); // ← recrea el timer quan count canvia (ineficient però correcte)// ✅ SOLUCIÓ 2 (millor): funció updater per no necessitar 'count'useEffect(() \=\> {  const timer \= setInterval(() \=\> {    setCount(prev \=\> prev \+ 1); // ← no captura 'count' → sempre correcte  }, 1000);  return () \=\> clearInterval(timer);}, \[\]); // ← \[\] segur perquè no capturem 'count' |
| :---- |

**Impacte 3: Race conditions en data fetching**

Dues canvis d'estat ràpids, dues peticions, la resposta incorrecta guanya — UI inconsistent.

| // ❌ RACE CONDITION: la resposta més lenta pot arribar últimafunction ProducteDetall({ id }: { id: string }) {  const \[producte, setProducte\] \= useState(null);  useEffect(() \=\> {    // Petició 1: id="42" → sol·licitud triga 500ms    // Petició 2: id="99" → sol·licitud triga 100ms    // → Petició 2 arriba primer (seta producte 99\)    // → Petició 1 arriba després (sobreescriu amb producte 42\!)    // → L'usuari veu el producte 42 però la URL diu 99\!    fetch(\`/api/productes/${id}\`)      .then(r \=\> r.json())      .then(setProducte); // ← no hi ha cancel·lació\!  }, \[id\]);  return \<div\>{producte?.nom}\</div\>;}// ✅ SOLUCIÓ: cancel·lació via AbortControllerfunction ProducteDetall({ id }: { id: string }) {  const \[producte, setProducte\] \= useState(null);  useEffect(() \=\> {    const controller \= new AbortController(); // ← cancel·lació    fetch(\`/api/productes/${id}\`, { signal: controller.signal })      .then(r \=\> r.json())      .then(setProducte)      .catch(err \=\> {        if (err.name \!== 'AbortError') throw err; // ← ignorar cancel·lació      });    return () \=\> controller.abort(); // ← cancel·la la petició anterior\!    // → Quan 'id' canvia: cancel·la la petició antiga → sense race condition  }, \[id\]);} |
| :---- |

**Impacte 4: Bucles d'efectes infinits**

Un dels problemes de predictibilitat més comuns: has de controlar les dependències acuradament — llista únicament les variables que han de disparar l'efecte quan canvien.

| // ❌ BUCLE INFINIT: l'efecte es crida a si mateixfunction ComponenteBucle() {  const \[dades, setDades\] \= useState(\[\]);  useEffect(() \=\> {    fetch('/api/dades')      .then(r \=\> r.json())      .then(setDades); // → setDades → re-render → efecte s'executa → fetch...  }); // ← sense dependency array → s'executa en CADA render\!  return \<div\>{dades.length}\</div\>;}// ❌ BUCLE INFINIT: objecte nou en cada render com a dependènciafunction ComponenteObjecte() {  const config \= { limit: 10 }; // ← nou objecte en cada render\!  useEffect(() \=\> {    fetch(\`/api/dades?limit=${config.limit}\`);  }, \[config\]); // ← config canvia cada render (referència diferent) → bucle\!}// ✅ CORRECCIONS:useEffect(() \=\> { /\* fetch \*/ }, \[\]); // ← únicament en el primer renderuseEffect(() \=\> { /\* fetch \*/ }, \[id\]); // ← quan 'id' canvia// O per a objectes: extreure el valor primitiuconst limit \= 10; // primitiu: comparat per valor, no per referènciauseEffect(() \=\> { fetch(\`/api?limit=${limit}\`); }, \[limit\]); |
| :---- |

**Impacte 5: Efectes innecessaris — quan NO usar `useEffect`**

Molts efectes existeixen per hàbit, no per necessitat. Un cop comences a qüestionar cada un, la codebase es torna més simple i predictible.

| // ❌ MAL: useEffect per a càlcul derivat (innecessari)function LlistaProductes({ productes, filtreActiu }) {  const \[filtrats, setFiltrats\] \= useState(\[\]);  useEffect(() \=\> {    setFiltrats(productes.filter(p \=\> p.categoria \=== filtreActiu));  }, \[productes, filtreActiu\]);  // → Dispara un re-render addicional innecessari  return \<Llista items={filtrats} /\>;}// ✅ BÉ: calcular directament durant el renderfunction LlistaProductes({ productes, filtreActiu }) {  // Calculat durant el render → zero efectes, zero renders addicionals  const filtrats \= productes.filter(p \=\> p.categoria \=== filtreActiu);  return \<Llista items={filtrats} /\>;}// Regla: "Si pots calcular-ho durant el render → fes-ho durant el render"// useEffect és per SINCRONITZACIÓ amb sistemes EXTERNS, no per derivar estat |
| :---- |

**L'execució doble de StrictMode: detectant problemes**

StrictMode s'usa per detectar problemes potencials en el teu codi que poden causar comportament inesperat. 

En activar StrictMode, React realitza comprovacions i advertències addicionals en els teus components, com ara re-renderitzar components o executar Effects una vegada extra, per ajudar a identificar problemes relacionats amb el renderitzat impur o la neteja d'efectes que falta.

| // StrictMode en development executa els efectes DOS cops:// 1r: munta el component → executa l'efecte → executa el cleanup// 2n: torna a muntar → executa l'efecte de nou// ❌ EFECTE QUE FALLA AMB STRICTMODE → té un bug real\!function ComponenteAmb Bug() {  useEffect(() \=\> {    window.myPlugin.init(); // init no és idempotent\!    return () \=\> {}; // cleanup buit → no desfà l'init    // → StrictMode: init() cridat 2 cops → comportament incorrecte  }, \[\]);}// ✅ EFECTE CORRECTE: el cleanup desfà exactament el que fa el setupfunction ComponenteCorrecte() {  useEffect(() \=\> {    const subscripcio \= window.myPlugin.subscribe(handleEvent);    return () \=\> subscripcio.unsubscribe(); // ← desfà exactament el subscribe    // → StrictMode: subscribe → unsubscribe → subscribe → un sol estat final ✅  }, \[\]);} |
| :---- |

**Les dependències: la clau del comportament**

El `dependencyArray` determina quan React ha de tornar a cridar el callback. Omet-lo per executar en cada render, passa `[]` per executar una vegada, o llista valors específics per executar únicament quan canvien.

| useEffect(() \=\> { /\* efecte \*/ });// → Sense dependency array: s'executa CADA render → rarament el que volsuseEffect(() \=\> { /\* efecte \*/ }, \[\]);// → Array buit: s'executa ÚNICAMENT en el primer render (muntatge)useEffect(() \=\> { /\* efecte \*/ }, \[userId, filtres\]);// → Amb dependències: s'executa quan 'userId' O 'filtres' canvien |
| :---- |

**Resum**

| Problema | Causa | Solució |
| ----- | ----- | ----- |
| **Re-renders innecessaris** | `useEffect` per a càlculs derivats | Calcular durant el render directament |
| **Stale closure** | Dependències incorrectes (mancants) | Funció updater `prev => prev + 1` o afegir dependències |
| **Race conditions** | Fetch sense cancel·lació | `AbortController` \+ cleanup |
| **Bucle infinit** | Sense dependency array o objecte nou | `[]` o dependències primitives |
| **Efectes innecessaris** | Hàbit, no necessitat | Qüestionar cada `useEffect`  |

La regla fonamental:

  useEffect és per SINCRONITZAR amb sistemes EXTERNS  
  (BD, APIs, DOM, subscripcions, timers)  
  → Si no hi ha un sistema extern involucrat →  
    probablement no necessites useEffect

