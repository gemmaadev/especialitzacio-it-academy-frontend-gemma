**Què és l'estat en React i el Hook `useState`?**

## **Per què no podem usar variables normals**

Per entendre l'estat, cal entendre primer per quèuna variable JavaScript normal no funciona en React.

React fa un re-render cridant la funció del component, i amb cada crida de funció, la teva variable es reseteja cada vegada.

| // ❌ Variable normal: es reseteja en cada renderfunction Comptador() {  let count \= 0;  // ← es crea de nou en CADA render \= sempre 0\!  return (    \<div\>      \<h1\>{count}\</h1\>      \<button onClick={() \=\> {        count \= count \+ 1;       // ← modifica la variable local        console.log(count);      // "1" → es veu a la consola        // però el component NO es re-renderitza\!        // i si ho fes, count tornaria a ser 0      }}\>        \+1      \</button\>    \</div\>  );}// El problema: count canvia però la UI no s'actualitza// I si forcessim un re-render, count tornaria a 0 |
| :---- |

React necessita un mecanisme per **recordar** valors entre renders. Aquí entra `useState`.

**Què és l'estat**

Al cor de tota aplicació React dinàmica hi ha el concepte d'"estat". L'estat es pot considerar com qualsevol dada que determina la sortida o l'aparença d'un component.

En altres paraules, l'estat és la **memòria** d'un component: informació que el component recorda entre renders i que, quan canvia, provoca que React actualitzi la UI automàticament.

L'estat és:  
  → Dades que el component recorda entre renders  
  → Dades que, en canviar, provoquen un re-render  
  → Local i privat per defecte (cada component té el seu)  
  → Persistent mentre el component existeix al DOM  
  → Gestionat per React (fora de la funció del component)

**`useState`: la sintaxi i el que retorna**

`useState` retorna un array amb dos valors: l'estat actual i una funció per actualitzar-lo. El Hook pren un valor d'estat inicial com a argument i retorna un valor d'estat actualitzat quan es crida la funció setter.

| import { useState } from 'react';function Comptador() {  //    ↓ valor actual    ↓ funció per actualitzar  const \[count, setCount\] \= useState(0);  //                                  ↑ valor inicial (únicament el primer render)  return (    \<div\>      \<h1\>Comptador: {count}\</h1\>      \<button onClick={() \=\> setCount(count \+ 1)}\>+1\</button\>      \<button onClick={() \=\> setCount(count \- 1)}\>-1\</button\>      \<button onClick={() \=\> setCount(0)}\>Reset\</button\>    \</div\>  );}// La convenció: \[quelcom, setQuelcom\] → array destructuring// count    → el valor actual de l'estat en aquest render// setCount → la funció que actualitza l'estat i dispara un re-render |
| :---- |

Amb `useState`, React escopa el seu valor al closure extern, que és l'app React que conté tots els components. En altres paraules, quan uses `useState` React retorna un valor que s'emmagatzema FORA del component i per tant no canvia en cada render.

**Cada render és una snapshot**

El valor `count` és congelat per a tot el render. No és una variable mutable — és una instantània (snapshot) del que era l'estat quan va ocórrer aquest render. Si crides `setCount`, React planifica un nou render amb una nova snapshot. El `count` del render actual mai canvia.

| function Comptador() {  const \[count, setCount\] \= useState(0);  function handleClick() {    setCount(count \+ 1);  // count \= 0 → planifica render amb count \= 1    setCount(count \+ 1);  // count SEGUEIX sent 0\! → planifica render amb count \= 1    setCount(count \+ 1);  // count SEGUEIX sent 0\! → planifica render amb count \= 1    console.log(count);   // → 0\! La snapshot d'aquest render no ha canviat  }  // Resultat: el comptador arriba a 1, no a 3\!  // Les tres crides veuen la mateixa snapshot on count \= 0  // ✅ Solució: funció updater per accedir al valor ANTERIOR  function handleClickCorrect() {    setCount(prev \=\> prev \+ 1);  // prev \= 0 → 1    setCount(prev \=\> prev \+ 1);  // prev \= 1 → 2    setCount(prev \=\> prev \+ 1);  // prev \= 2 → 3    // Ara sí arriba a 3\!  }  return \<button onClick={handleClick}\>{count}\</button\>;} |
| :---- |

**Flux complet d'un update d'estat**

| 1\. Usuari clica el botó        ↓2\. S'executa l'event handler   → setCount(count \+ 1\) s'afegeix a la cua        ↓3\. React processa la cua (batching)   → Múltiples setState en un event handler → UN SOL re-render        ↓4\. React re-executa la funció del component   → El component rep el NOU valor d'estat        ↓5\. React compara el nou output amb el DOM (reconciliation)        ↓6\. React actualitza únicament les parts del DOM que han canviat        ↓7\. L'usuari veu la UI actualitzada |
| :---- |

No mutes la UI directament — canvies l'estat, i la UI flueix d'ell. Aquest model mental és crucial: no canvies la UI, canvies l'estat, i la UI en resulta.

**Tipar `useState` amb TypeScript**

| // TypeScript infereix el tipus automàticament des del valor inicialconst \[count, setCount\] \= useState(0);         // numberconst \[nom, setNom\] \= useState('');            // stringconst \[actiu, setActiu\] \= useState(false);     // boolean// Quan el tipus inicial és ambiguu → anotar explícitamentconst \[usuari, setUsuari\] \= useState\<Usuari | null\>(null);// ↑ Sense anotació, TypeScript inferiria 'null' → massa restrictiu// Arrays i objectesconst \[items, setItems\] \= useState\<string\[\]\>(\[\]);const \[config, setConfig\] \= useState\<Config\>({ tema: 'clar', idioma: 'ca' });// Interfícies personalitzadesinterface Producte {  id: string;  nom: string;  preu: number;}const \[producte, setProducte\] \= useState\<Producte | null\>(null);const \[productes, setProductes\] \= useState\<Producte\[\]\>(\[\]); |
| :---- |

**Tipus de dades que pot emmagatzemar `useState`**

A React, `useState` pot emmagatzemar qualsevol tipus de valor, mentre que l'estat en un component de classe es limita a ser un objecte. 

Això inclou tipus de dades primitius com string, number, i Boolean, així com tipus complexos com array, objecte i funció. Bàsicament, qualsevol cosa que es pugui emmagatzemar en una variable JavaScript es pot emmagatzemar en un estat gestionat per `useState`.

| // Tot tipus de valor és vàlid com a estatconst \[count, setCount\] \= useState(0);              // numberconst \[text, setText\] \= useState('hola');           // stringconst \[obert, setObert\] \= useState(false);          // booleanconst \[items, setItems\] \= useState(\['a', 'b'\]);     // arrayconst \[usuari, setUsuari\] \= useState({ nom: 'Anna' }); // objecteconst \[pas, setPas\] \= useState\<'login'|'register'|'forgot'\>('login'); // union type |
| :---- |

**Les regles fonamentals de `useState`**

### **Regla 1: Mai modificar l'estat directament**

| // ❌ MAL: mutació directa → React no detecta el canvi → NO re-renderitzaconst \[items, setItems\] \= useState(\['a', 'b', 'c'\]);items.push('d');           // ← mutació directa del arrayitems\[0\] \= 'nou valor';    // ← mutació directa// ✅ BÉ: crear un nou valor → React detecta el canvi → re-renderitzasetItems(\[...items, 'd'\]);                          // afegir al finalsetItems(items.filter(item \=\> item \!== 'b'));       // eliminar un elementsetItems(items.map(item \=\> item \=== 'a' ? 'nou' : item)); // actualitzar un element// ✅ BÉ: objectes → spread operatorconst \[user, setUser\] \= useState({ nom: 'Anna', edat: 25 });setUser({ ...user, edat: 26 });  // ← nou objecte amb edat actualitzada |
| :---- |

### **Regla 2: Funció updater quan l'estat depèn del valor anterior**

| // ❌ MAL: pot causar stale state si hi ha batchingsetCount(count \+ 1);// ✅ BÉ: funció updater → sempre usa el valor ACTUALsetCount(prev \=\> prev \+ 1);// Especialment important en:// → Múltiples updates consecutius// → Handlers asíncrons (setTimeout, fetch)// → Intervals |
| :---- |

### 

### **Regla 3: `useState` únicament a nivell superior del component**

Quan s'executa `useState`, l'estat del Hook actual es llegeix (o s'inicialitza durant el primer render), i llavors la variable canvia per apuntar al següent Hook. 

Per això és important mantenir sempre les crides als Hooks en el mateix ordre. En cas contrari, un valor pertanyent a una altra variable d'estat podria ser retornat.

| // ❌ MAL: Hook dins d'una condició → ordre canviablefunction Component({ loading }) {  if (\!loading) {    const \[data, setData\] \= useState(null); // ← Error\! Hook condicional  }}// ✅ BÉ: Hook sempre al nivell superiorfunction Component({ loading }) {  const \[data, setData\] \= useState(null); // ← sempre s'executa  if (loading) return \<Spinner /\>;  return \<div\>{data}\</div\>;} |
| :---- |

**Batching: múltiples updates, un sol render**

Múltiples crides a `setState` dins d'un sol event handler no disparen múltiples renders. React les agrupa en un sol render. Des de React 18 això també s'aplica a funcions asíncrones i `setTimeout`.

| function Formulari() {  const \[nom, setNom\] \= useState('');  const \[email, setEmail\] \= useState('');  function handleReset() {    setNom('');     // ← batched    setEmail('');   // ← batched → UN ÚNIC re-render, no dos\!  }  return (/\* ... \*/);} |
| :---- |

**Inicialització Lazy: per a càlculs costosos**

| // ❌ MAL: la funció s'executa en CADA renderconst \[data, setData\] \= useState(calcularDadesInicials()); // ← crida en render\!// ✅ BÉ: passar la funció (no el resultat) → s'executa únicament en el PRIMER renderconst \[data, setData\] \= useState(() \=\> calcularDadesInicials());// → Útil per: llegir localStorage, parsear JSON, calcular valors costososconst \[preferencies, setPreferencies\] \= useState(  () \=\> JSON.parse(localStorage.getItem('preferencies') ?? '{}')); |
| :---- |

**Resum de `useState`**

L'estat és la memòria del component:  
  → S'emmagatzema FORA de la funció del component (en React)  
  → Persisteix entre renders  
  → Quan canvia → dispara un nou render  
  → Immutable: mai modificar directament

Cada render és una snapshot:  
  → El valor de count és CONGELAT per a aquell render  
  → setCount NO canvia count en el render actual  
  → setCount planifica un NOU render amb el nou valor

El flux:  
  Usuari interactua → event handler → setState →  
  React processa (batching) → re-executa el component →  
  Nova snapshot → reconciliation → DOM actualitzat

Regles:  
  1\. Mai mutar l'estat directament (array/objecte)  
  2\. Usar funció updater (prev \=\> prev \+ 1\) quan cal l'anterior  
  3\. Hooks sempre al nivell superior (mai en condicionals/loops)  
  4\. El valor inicial s'usa únicament en el primer render

