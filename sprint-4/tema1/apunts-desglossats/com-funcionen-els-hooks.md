**Com funcionen els Hooks, quines regles segueixen?**

**React Hooks: Documentació**  
Referència oficial dels Hooks de React i com utilitzar-los.  
[https://react.dev/reference/react](https://react.dev/reference/react)

# **1\. Definició**  

Els **Hooks** són una incorporació de React 16.8 que et permeten utilitzar estat i altres característiques de React sense escriure una classe. Els Hooks són funcions de JavaScript, però amb una particularitat important: representen un tipus especial de lògica de UI reutilitzable, amb restriccions sobre on es poden cridar.

En termes pràctics: són la manera moderna de "connectar-se" (d'aquí ve el nom *hook* \= ganxo) a funcionalitats internes de React —estat, cicle de vida, context, referències al DOM— des d'un component funcional, sense necessitat de convertir-lo en una classe.

| import { useState, useEffect } from 'react';function Counter() {  const \[count, setCount\] \= useState(0); // Hook d'estat  useEffect(() \=\> { // Hook d'efecte    document.title \= \`Comptador: ${count}\`;  }, \[count\]);  return \<button onClick={() \=\> setCount(count \+ 1)}\>{count}\</button\>;} |
| :---- |

## **2\. Per què existeixen / quin problema resolen**

Abans dels Hooks (React \< 16.8), si un component necessitava estat o accedir al cicle de vida (per exemple, executar codi quan es munta), **havia de ser obligatòriament una classe**:

| // Abans dels Hooks: calia una classe per tenir estatclass Counter extends React.Component {  constructor(props) {    super(props);    this.state \= { count: 0 };  }  componentDidMount() {    document.title \= \`Comptador: ${this.state.count}\`;  }  componentDidUpdate() {    document.title \= \`Comptador: ${this.state.count}\`;  }  render() {    return (      \<button onClick={() \=\> this.setState({ count: this.state.count \+ 1 })}\>        {this.state.count}      \</button\>    );  }} |
| :---- |

Això generava diversos problemes pràctics: codi més verbós, dificultat per **reutilitzar lògica d'estat** entre components (calien patrons complexos com els *Higher-Order Components* o *render props*), i el `this` de JavaScript, que sovint confonia els qui començaven (calia fer *bind* manualment dels mètodes, etc.).

Els Hooks resolen tot això permetent escriure la mateixa lògica amb funcions simples i reutilitzar-la fàcilment mitjançant **Hooks personalitzats** (que veurem al punt 5).

## **3\. Com funcionen per dins: el mecanisme de l'ordre**

Aquí hi ha el detall tècnic més important per entendre per què existeixen les regles que veurem després.

React necessita "recordar" l'estat de cada Hook entre un render i el següent. Per fer-ho, **no fa servir noms ni claus identificadores: fa servir l'ordre en què es criden els Hooks**.

Identifica l'ordre en què s'utilitzen els Hooks al render inicial; després, en renders subsegüents, React podrà preservar l'estat del teu component. Per exemple:

| function Form() {  // 1\. useState('Mary')  const \[name, setName\] \= useState('Mary');  // 2\. useEffect(persistForm)  useEffect(function persistForm() {    localStorage.setItem('formData', name);  });  // 3\. useState('Poppins')  const \[surname, setSurname\] \= useState('Poppins');  // 4\. useEffect(updateTitle)  useEffect(function updateTitle() {    document.title \= name \+ ' ' \+ surname;  });} |
| :---- |

Mentre l'ordre de les crides als Hooks sigui el mateix entre renders, React pot associar un estat local a cadascuna d'elles. 

React internament manté una llista (com un array) i, a cada render, va agafant l'element corresponent a la posició 1, 2, 3, 4... en l'ordre exacte en què els crides.

**Què passa si trenques aquest ordre?** Mira aquest cas:

| // 🔴 Trenquem la regla utilitzant un Hook dins d'una condicióif (name \!== '') {  useEffect(function persistForm() {    localStorage.setItem('formData', name);  });} |
| :---- |

La condició `name !== ''` és certa en el primer render, així que aquest Hook s'executa. Però en el següent render l'usuari podria buidar el formulari, fent la condició falsa. 

Ara que ens saltem aquest Hook durant el renderitzat, l'ordre de les crides canvia:

React no sabria què retornar per a la segona crida de `useState`. 

React esperava que la segona crida de Hook en aquest component correspongués a l'efecte `persistForm`, igual que en el render anterior, però ja no és així. 

A partir d'aquell punt, cada crida de Hook posterior a la que ens hem saltat es desplaçaria també una posició, provocant errors.

## **4\. Les regles dels Hooks (Rules of Hooks)**

Hi ha **dues regles fonamentals**, directament derivades del mecanisme que acabem de veure:

### **Regla 1: Només crida Hooks al nivell superior**

No criden Hooks dins de bucles, condicions o funcions niades. En lloc d'això, utilitza sempre els Hooks al nivell superior de la teva funció React, abans de qualsevol `return` anticipat. 

Seguint aquesta regla, t'assegures que els Hooks es criden en el mateix ordre cada vegada que el component es renderitza.

| // ❌ Incorrecte: Hook dins d'una condiciófunction BadComponent() {  if (condition) {    const \[state, setState\] \= useState(); // Hook en condició  }  return \<div\>Hola\</div\>;}// ❌ Incorrecte: Hook dins d'un buclefunction BadComponent2() {  for (let i \= 0; i \< 10; i++) {    useEffect(() \=\> {}); // Hook en bucle  }}// ✅ Correcte: Hook sempre al nivell superiorfunction GoodComponent() {  const \[count, setCount\] \= useState(0); // Sempre es crida, sense excepcions  if (condition) {    // La CONDICIÓ pot fer servir el resultat del Hook, sense problema    return \<div\>{count}\</div\>;  }  return \<div\>Hola\</div\>;} |
| :---- |

**Solució correcta si vols condicionar el comportament d'un efecte**: mou la condició **dins** del cos del Hook, no al voltant de la crida:

| // 👍 No trenquem la regla: la condició és DINS de l'efecteuseEffect(function persistForm() {  if (name \!== '') {    localStorage.setItem('formData', name);  }}); |
| :---- |

### **Regla 2: Només crida Hooks des de funcions React**

No criden Hooks des de funcions JavaScript normals. En lloc d'això, pots: cridar Hooks des de components de funció React, o cridar Hooks des de Hooks personalitzats.

| // ❌ Incorrecte: funció JavaScript normal, no és un component ni un Hookfunction calcularAlgo() {  const \[value\] \= useState(0); // Error\!  return value \* 2;}// ✅ Correcte: dins d'un componentfunction MyComponent() {  const \[value\] \= useState(0);  return \<div\>{value \* 2}\</div\>;}// ✅ Correcte: dins d'un Hook personalitzat (nom que comença per "use")function useDouble() {  const \[value\] \= useState(0);  return value \* 2;} |
| :---- |

Els Hooks personalitzats poden cridar altres Hooks (aquest és tot el seu propòsit). Això funciona perquè els Hooks personalitzats també se suposa que només es criden mentre un component de funció s'està renderitzant.

Els Hooks personalitzats han de començar amb "use": si crees els teus propis Hooks, assegura't que comencin amb la paraula "use" — aquesta és una convenció que ajuda altres desenvolupadors a entendre que es tracta d'un Hook, i és precisament el que permet que el linter detecti automàticament si segueixes les regles correctament.

### **Eina pràctica: el linter oficial**

Es proporciona un plugin de linter per fer complir aquestes regles automàticament:

| {  "plugins": \["react-hooks"\],  "rules": {    "react-hooks/rules-of-hooks": "error",    "react-hooks/exhaustive-deps": "warn"  }} |
| :---- |

A la pràctica del bootcamp, **gairebé sempre tindràs aquest linter activat per defecte** (Create React App, Vite amb plantilla React, Next.js...), així que normalment et detectarà l'error abans que arribi a ser un bug en producció.

**5\. Per què existeixen aquestes regles: els avantatges que aporten**

Les regles dels Hooks existeixen per assegurar que: el comportament de l'estat del component sigui predictible, els efectes només es disparin quan han de fer-ho, i el rendiment no es vegi afectat negativament per un ús incorrecte dels Hooks.

A més: seguint aquesta regla (la segona), t'assegures que tota la lògica amb estat d'un component sigui clarament visible des del seu codi font — és a dir, no hi ha estat "amagat" en funcions auxiliars allunyades del component que en depèn.

**Reutilització mitjançant Hooks personalitzats**: aquest és potser el major avantatge pràctic. Un Hook personalitzat et permet extraure lògica d'estat i compartir-la entre múltiples components, sense els problemes dels patrons antics (HOCs, render props):

| // Hook personalitzat: extreu lògica reutilitzablefunction useWindowWidth() {  const \[width, setWidth\] \= useState(window.innerWidth);  useEffect(() \=\> {    function handleResize() { setWidth(window.innerWidth); }    window.addEventListener('resize', handleResize);    return () \=\> window.removeEventListener('resize', handleResize);  }, \[\]);  return width;}// Reutilitzat en qualsevol component, sense duplicar codifunction Sidebar() {  const width \= useWindowWidth();  return \<div\>{width \< 768 ? 'Mòbil' : 'Escriptori'}\</div\>;}function Header() {  const width \= useWindowWidth(); // mateixa lògica, reutilitzada  return \<header\>{width}px d'ample\</header\>;} |
| :---- |

## **6\. Avantatges i inconvenients**

**Avantatges:**

* **Reutilització senzilla de lògica** sense les complicacions dels patrons antics (HOC, render props)  
* **Components més concisos**: no cal `this`, constructors, ni mètodes de cicle de vida separats per a la mateixa lògica  
* **Lògica relacionada agrupada**: pots tenir tota la lògica d'una funcionalitat junta (per exemple, dins d'un `useEffect`), enlloc d'escampada entre `componentDidMount`, `componentDidUpdate` i `componentWillUnmount`  
* **Linter automàtic** que detecta la majoria d'errors abans que es converteixin en bugs

**Inconvenients / matisos:**

* **Regles estrictes que cal internalitzar**: a diferència de "guies recomanades", trencar-les no és només una qüestió d'estil — si es trenquen, la teva app probablement tindrà bugs  
* **Corba d'aprenentatge inicial**: entendre per què no pots posar un Hook dins d'un `if` requereix comprendre el mecanisme intern de l'ordre, que no és evident a primera vista  
* **`useEffect` en particular té la seva pròpia complexitat** (array de dependències, funcions de neteja) que sovint genera bugs subtils si no es gestiona amb cura (per això existeix la regla complementària `exhaustive-deps`)

## **7\. Errors comuns / mals entesos**

* **Posar un Hook dins d'un `if`, `for`, o funció niada.** És l'error més comú i el que trenca directament el mecanisme d'ordre que hem explicat al punt 3\.  
* **Cridar un Hook des d'una funció auxiliar normal (no un component ni un altre Hook).** Per exemple, des d'un manejador d'esdeveniment passat com a callback que no és ell mateix un Hook ni un component.  
* **Oblidar-se que la condició es pot posar DINS del Hook.** Molta gent pensa que necessita evitar cridar el Hook condicionalment a base de no usar-lo del tot, quan la solució correcta sol ser moure la lògica condicional dins del cos de la funció callback del Hook (com vam veure amb `persistForm`).  
* **No instal·lar o ignorar els avisos del linter `eslint-plugin-react-hooks`.** Si el linter no està activat, és molt fàcil trencar les regles sense adonar-te'n fins que apareix un bug difícil de depurar.

## **8\. Nota sobre l'evolució recent**

Val la pena que sàpigues que l'ecosistema de regles al voltant dels Hooks ha crescut significativament més enllà de les dues regles clàssiques. 

El plugin oficial ja inclou regles addicionals relacionades amb el React Compiler, com `react-hooks/purity`, `react-hooks/immutability`, `react-hooks/set-state-in-render`, entre altres, pensades per preparar el codi per a optimitzacions automàtiques futures. 

Les **dues regles clàssiques** (top-level i només des de funcions React) són les fonamentals i les que has de dominar primer.

## **9\. Connexió amb altres conceptes del temari**

* Els Hooks són la **implementació pràctica** de tot el que hem vist sobre **funcions pures**: `useState` permet tenir estat sense trencar la puresa del component (l'estat es gestiona "per fora", de manera controlada), i `useEffect` és precisament el mecanisme oficial per aïllar efectes secundaris fora del cos pur del render  
* Connecten amb el **DOM virtual i la reconciliation**: cada crida a l'setter d'un `useState` és exactament el que dispara el cicle complet que vam veure (nou element → DOM virtual → diff → commit)  
* Es relacionen amb la **programació declarativa**: declares "aquest component té aquest estat" i "quan canviï X, sincronitza Y", sense escriure manualment els passos d'actualització  
* Preparen el terreny per als **metaframeworks** (Next.js, Remix), que sovint introdueixen els seus propis Hooks especialitzats (per exemple, per a *data fetching* o navegació) seguint exactament les mateixes regles que acabem de veure

## **10\. Preguntes de repàs (amb resposta)**

**1\. Per què React necessita que els Hooks es cridin sempre en el mateix ordre?**

Perquè React no identifica cada Hook per nom, sinó per la posició en què es crida durant el render. Si l'ordre canvia entre renders (per exemple, perquè un Hook estava dins d'un `if` que ara és fals), React assignarà l'estat equivocat a cada crida, provocant bugs greus i confusos.

**2\. Quines són les dues regles fonamentals dels Hooks?**

Primera: només cridar-los al nivell superior del component, mai dins de bucles, condicions o funcions niades. Segona: només cridar-los des de components de funció React o des d'altres Hooks personalitzats, mai des de funcions JavaScript normals.

**3\. Si vull que un efecte només s'executi sota certa condició, on he de posar aquesta condició?**

Dins del cos de la funció callback que li passes a `useEffect`, no al voltant de la crida al Hook. Així el Hook sempre es crida (mantenint l'ordre constant), però la lògica interna decideix si fer alguna cosa o no.

**4\. Per què els Hooks personalitzats han de començar pel prefix "use"?**

És una convenció que permet tant a altres desenvolupadors com a eines automàtiques (com el linter `eslint-plugin-react-hooks`) reconèixer que una funció és un Hook i, per tant, aplicar-hi correctament les regles (per exemple, comprovar que es crida des d'un lloc vàlid i en l'ordre correcte).

**5\. Quina eina pots utilitzar per detectar automàticament infraccions de les regles dels Hooks?**

El plugin oficial `eslint-plugin-react-hooks`, que afegeix les regles `react-hooks/rules-of-hooks` (detecta infraccions de les dues regles fonamentals) i `react-hooks/exhaustive-deps` (avisa si falten dependències a l'array de `useEffect` i altres Hooks similars).

 

