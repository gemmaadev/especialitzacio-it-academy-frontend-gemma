## **Per què és important mantenir les funcions de renderitzat pures**

**Què és una funció pura**

Una funció es considera pura si compleix dues regles estrictes: donats els mateixos inputs, sempre retorna el mateix output (sense cap aleatòrietat ni influència externa), i no produeix cap efecte secundari observable (no modifica cap estat extern, no realitza operacions I/O com peticions de xarxa o manipulació del DOM, ni canvia els seus arguments).

En el context de React, això significa:

| // ✅ COMPONENT PUR: mateixos props → mateix JSXfunction Salutació({ nom }: { nom: string }) {  return \<h1\>Hola, {nom}\!\</h1\>;  // → Sempre retorna el mateix resultat per al mateix 'nom'  // → No modifica res extern  // → No fa fetch, no escriu al DOM, no modifica variables globals}// ❌ COMPONENT IMPUR: accedeix a una variable externa que pot canviarlet tempsActual \= new Date().getHours();function Banner({ nom }: { nom: string }) {  const isPM \= tempsActual \> 11;  // ← llegeix una variable externa\!  return \<p\>Hola {nom}, és {isPM ? 'PM' : 'AM'}\</p\>;  // → Dos renders amb el mateix 'nom' poden donar resultats diferents\!} |
| :---- |

**La regla de React: el renderitzat ha de ser una funció pura**

El component ha de ser una funció pura dels seus props i estat. Una funció pura és aquella que, donats els mateixos inputs, sempre retorna el mateix output i no fa res més.

| // La fórmula de React:// UI \= f(props, state)// → El component és una funció determinista de les seves entrades// → Mateixos props \+ mateixa state → mateix JSX retornat// ✅ PUR: únicsament llegeix props i statefunction Producte({ nom, preu, descompte }: ProducteProps) {  const preuFinal \= preu \* (1 \- descompte);  // ← càlcul local  return (    \<div\>      \<h2\>{nom}\</h2\>      \<p\>{preuFinal.toFixed(2)}€\</p\>    \</div\>  );}// → Mateixos props → sempre el mateix output ✅ |
| :---- |

**Per què és important: les raons fonamentals**

### **Raó 1: predictibilitat i debugging**

Els components purs son predictibles, cosa que facilita el debugging. Quan un component és pur, entendre el seu comportament és senzill: mires els inputs (props, state) i saps exactament quin output produirà.

| // DEBUGGING AMB COMPONENT PUR: trivial// Si el output és incorrecte → els inputs son incorrectes// No cal pensar en "quina variable global ha canviat"// DEBUGGING AMB COMPONENT IMPUR: molt difícilfunction PriceDisplay() {  return \<p\>{window.currentPrice}\</p\>;  // → Si el preu mostrat és incorrecte:  //   Quan s'ha modificat window.currentPrice?  //   Quin altre component l'ha canviat?  //   En quin ordre s'han executat els renders?  // → Impossible rastrear sense molta feina} |
| :---- |

### **Raó 2: Rendiment i memoïtzació**

Els components purs son cacheables, cosa que permet a React optimitzar el renderitzat (és a dir, saltar-se renders quan els inputs no han canviat).

| // React pot saltar-se el re-render si les props no han canviatconst ProducteCard \= React.memo(function ProducteCard({ producte }: Props) {  return \<div\>{producte.nom}\</div\>;});// → React.memo ÚNICAMENT funciona correctament amb components purs// → Si el component llegeix variables externes, React.memo pot//   retornar una versió desactualitzada del component\!// React Compiler (React 19+):// Purity is the precondition for the React Compiler to auto-optimize.// Just by writing pure code, performance benefits follow.// → El compilador pot automemoïtzar components purs sense configuració |
| :---- |

### **Raó 3: Concurrent mode i React Server Components**

React pot optimitzar el renderitzat pausant i reprenent el cicle de render sense problemes perquè els components purs no depenen d'efectes secundaris.

| // Concurrent Mode (React 18+):// React pot INTERROMPRE el render d'un component i reprendre'l més tard// Si el component és impur → interrupcions → bugs\!// ❌ IMPUR: problemàtic amb Concurrent Modelet ordre \= 0;function LlistaItem({ text }: { text: string }) {  ordre++;  // ← modifica variable externa durant el render\!  return \<li data-ordre={ordre}\>{text}\</li\>;  // → Si React interromp i recomença el render: ordre serà incorrecte\!  // → React pot cridar el component 2x amb Concurrent Mode}// ✅ PUR: segur amb Concurrent Modefunction LlistaItem({ text, index }: { text: string; index: number }) {  return \<li data-ordre={index}\>{text}\</li\>;  // → No importa quantes vegades React el cridi: sempre el mateix resultat} |
| :---- |

### **Raó 4: StrictMode detecta impureses**

El doble renderitzat de StrictMode en mode de desenvolupament és una revisió de salut que detecta components impurs. Si ets pur, no hi ha cap problema.

| // StrictMode crida el component DOS cops en development per detectar impuresesfunction App() {  return (    \<React.StrictMode\>      \<MyApp /\>    \</React.StrictMode\>  );}// ❌ IMPUR: StrictMode ho delatalet comptador \= 0;function Counter() {  comptador++;  // ← modifica variable externa  return \<p\>Render \#{comptador}\</p\>;  // → StrictMode: crida el component 2 cops  // → Primera crida: comptador \= 1 → mostra "\#1"  // → Segona crida: comptador \= 2 → mostra "\#2"  // → Resultat inconsistent → StrictMode ho detecta ✅// ✅ PUR: StrictMode no afectafunction Counter({ count }: { count: number }) {  return \<p\>Render \#{count}\</p\>;  // → StrictMode crida el component 2 cops → mateix output les dues vegades ✅} |
| :---- |

### **Raó 5: Testabilitat**

Com que els components purs son predictibles i no tenen efectes secundaris, son més fàcils de testar. Pots provar directament l'output basant-te en els props d'entrada sense preocupar-te pels canvis d'estat externs.

| // TEST D'UN COMPONENT PUR: trivialtest('Salutació mostra el nom correctament', () \=\> {  render(\<Salutació nom="Anna" /\>);  expect(screen.getByText('Hola, Anna\!')).toBeInTheDocument();  // → No cal setup d'estat global, no cal mock de variables externes});// TEST D'UN COMPONENT IMPUR: complex i fràgiltest('PriceDisplay mostra el preu', () \=\> {  window.currentPrice \= 42;  // ← cal configurar variables globals\!  render(\<PriceDisplay /\>);  expect(screen.getByText('42€')).toBeInTheDocument();  window.currentPrice \= undefined;  // ← cal netejar\!  // → El test depèn de l'estat global → fràgil i difícil de mantenir}); |
| :---- |

**Les violacions comunes de la puretat**

| // ❌ VIOLACIÓ 1: Modificar variables externes durant el renderlet llista \= \[\];function ProducteItem({ producte }) {  llista.push(producte);  // ← IMPUR: modifica variable externa\!  return \<li\>{producte.nom}\</li\>;}// ❌ VIOLACIÓ 2: Llegir valors que canvien (no idempotents)function TimestampDisplay() {  return \<p\>{new Date().toISOString()}\</p\>;  // → Cada render retorna un valor diferent\!  // → Solució: passar el timestamp com a prop}// ❌ VIOLACIÓ 3: Fer operacions I/O directament al renderfunction DadesUsuari({ userId }) {  fetch(\`/api/usuaris/${userId}\`);  // ← IMPUR: side effect al render\!  return \<div\>...\</div\>;}// ❌ VIOLACIÓ 4: Modificar propsfunction ComponentImpur({ items }) {  items.push({ id: 'nou' });  // ← IMPUR: mutació dels props\!  return \<ul\>{items.map(...)}\</ul\>;}// ✅ SOLUCIONS CORRECTES:// Variables locals creades DURANT el render: estan bé\!function ProducteItem({ producte }) {  const etiquetes \= producte.etiquetes.filter(e \=\> e.activa); // ← variable local ✅  return \<li\>{producte.nom}: {etiquetes.join(', ')}\</li\>;}// Efectes secundaris → useEffect o event handlers:function DadesUsuari({ userId }) {  const \[dades, setDades\] \= useState(null);  useEffect(() \=\> {    fetch(\`/api/usuaris/${userId}\`).then(r \=\> r.json()).then(setDades);  }, \[userId\]);  // ← l'efecte va al useEffect, el render roman pur ✅  return \<div\>{dades?.nom}\</div\>;} |
| :---- |

**On SÍ es permès tenir efectes secundaris**

Fes els efectes secundaris en event handlers o Effects, no al cos del render.

| // ✅ Event handlers: poden tenir side effectsfunction Formulari() {  const handleSubmit \= async (e) \=\> {    e.preventDefault();    await fetch('/api/dades', { method: 'POST' });  // ← OK en handlers ✅    analytics.track('formulari\_enviat');              // ← OK en handlers ✅  };  return \<form onSubmit={handleSubmit}\>...\</form\>;}// ✅ useEffect: per a efectes que necessiten sincronitzar amb sistemes externsfunction Títol({ títol }) {  useEffect(() \=\> {    document.title \= títol;  // ← OK en useEffect ✅  }, \[títol\]);  return \<h1\>{títol}\</h1\>;}// La regla:// Render (JSX retornat) → PUR, sense efectes// Event handlers        → poden tenir efectes// useEffect             → per a efectes de sincronització |
| :---- |

La clau és gestionar els efectes secundaris de manera efectiva i predictible. React proporciona el hook `useEffect` específicament per gestionar efectes secundaris en components funcionals. 

En encapsular els efectes secundaris dins de `useEffect`, podem separar-los de la lògica pura de renderitzat dels components, fent el codi més fàcil d'entendre, testar i depurar.

Per què mantenir el render pur:

  → Predictibilitat: mateixos inputs → mateix output → debugging fàcil  
  → Rendiment: React.memo, React Compiler, skip renders innecessaris  
  → Concurrent Mode: React pot interrompre i reprendre renders sense bugs  
  → StrictMode: detecta automàticament impureses en development  
  → Testabilitat: tests sense setup d'estat global

On van els efectes secundaris:  
  → Event handlers (onClick, onSubmit)  
  → useEffect (sincronització amb sistemes externs)  
  → Loaders de React Router (data fetching)

MAI al cos de la funció de renderitzat

