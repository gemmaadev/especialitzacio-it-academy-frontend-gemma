**Com tradueix React el JSX a crides de funció (React.createElement)?**

######  **Understanding JSX** [https://legacy.reactjs.org/docs/jsx-in-depth.html](https://legacy.reactjs.org/docs/jsx-in-depth.html)  Explicació detallada de JSX i com funciona dins React.

## **1\. Definició**  

Fonamentalment, JSX només proporciona sucre sintàctic per a la funció `React.createElement(component, props, ...children)`. 

És a dir: JSX **no és un llenguatge nou** que el navegador entengui; és una manera més còmoda i llegible d'escriure crides a aquesta funció, que un compilador (Babel) tradueix abans que el codi s'executi.

| // El que escrius:\<MyButton color="blue" shadowSize={2}\>  Click Me\</MyButton\>// Es compila exactament en:React.createElement(  MyButton,  {color: 'blue', shadowSize: 2},  'Click Me') |
| :---- |

Pots provar com es converteix un fragment concret de JSX a JavaScript utilitzant el compilador en línia de Babel si vols veure-ho amb els teus propis exemples.

## **2\. Per què existeix / quin problema resol**

Sense JSX, hauries d'escriure tota la teva interfície directament amb crides niades a `React.createElement`, cosa que es torna ràpidament illegible amb estructures una mica complexes:

| // Sense JSX (com era React abans de JSX, o "React sense JSX")React.createElement('div', {className: 'sidebar'},  React.createElement('h1', null, 'Títol'),  React.createElement('p', null, 'Contingut')) |
| :---- |

| // Amb JSX: la mateixa estructura, però llegible com HTML\<div className="sidebar"\>  \<h1\>Títol\</h1\>  \<p\>Contingut\</p\>\</div\> |
| :---- |

JSX existeix per resoldre exactament aquest problema de llegibilitat: et permet **descriure la UI amb una sintaxi semblant a HTML** (connectant amb la declarativitat que ja hem vist), mentre per sota tot continua sent crides a funcions normals de JavaScript.

## **3\. Com funciona per dins: les regles de traducció**

**Element sense fills (self-closing):**

| \<div className="sidebar" /\> |
| :---- |

Es compila en: `React.createElement('div', {className: 'sidebar'})`

**Tipus de l'element — la regla de la majúscula:** La primera part d'una etiqueta JSX determina el tipus de l'element React. Aquí hi ha una regla estricta que cal entendre bé:

* Quan el tipus d'element comença amb minúscula, es refereix a un component natiu com `<div>` o `<span>`, i resulta en una cadena de text `'div'` o `'span'` passada a `React.createElement`  
* Els tipus que comencen amb majúscula com `<Foo />` es compilen a `React.createElement(Foo)` i corresponen a un component definit o importat al teu fitxer JavaScript

| // minúscula → string 'button' (etiqueta HTML nativa)\<button\>Clica'm\</button\>// → React.createElement('button', null, "Clica'm")// MAJÚSCULA → referència directa a la variable Button\<Button\>Clica'm\</Button\>// → React.createElement(Button, null, "Clica'm") |
| :---- |

Això no és estètica: és **funcionalment necessari**. 

Els tipus en majúscula indiquen que l'etiqueta JSX es refereix a un component React; aquestes etiquetes es compilen en una referència directa a la variable amb aquest nom, per tant si fas servir `<Foo />`, `Foo` ha d'estar dins de l'àmbit (scope).

**Exemple de l'error típic si t'oblides la majúscula:**

| // ❌ Incorrecte: React creu que \<hello /\> és una etiqueta HTML perquè no porta majúsculafunction hello(props) {  return \<div\>Hello {props.toWhat}\</div\>;}function HelloWorld() {  return \<hello toWhat="World" /\>; // No funcionarà com esperes}// ✅ Correcte: amb majúscula, React sap que és un componentfunction Hello(props) {  return \<div\>Hello {props.toWhat}\</div\>;}function HelloWorld() {  return \<Hello toWhat="World" /\>;} |
| :---- |

**React ha d'estar dins de l'àmbit (scope):** Com que JSX es compila en crides a `React.createElement`, la llibreria `React` també ha d'estar sempre dins de l'àmbit del teu codi JSX. 

Per això sempre veus aquest import, encara que sembli que mai cridis `React` directament:

| import React from 'react';import CustomButton from './CustomButton';function WarningButton() {  // El que realment passa per sota:  // return React.createElement(CustomButton, {color: 'red'}, null);  return \<CustomButton color="red" /\>;} |
| :---- |

Amb versions modernes de React (17+) i el "new JSX transform", aquest import explícit de `React` ja no és estrictament necessari gràcies a un transformador automàtic, però **el mecanisme de fons (compilar a crides de funció) és el mateix**.

**Notació amb punt:** També pots referir-te a un component React utilitzant notació amb punt dins de JSX, cosa convenient si tens un sol mòdul que exporta molts components React:

| const MyComponents \= {  DatePicker: function DatePicker(props) {    return \<div\>Imagina un selector de data {props.color} aquí.\</div\>;  }}function BlueDatePicker() {  return \<MyComponents.DatePicker color="blue" /\>;} |
| :---- |

**Triar el tipus en temps d'execució:** No pots utilitzar una expressió general com a tipus d'element React. Si vols fer-ho, simplement assigna-la primer a una variable en majúscula:

| const components \= { photo: PhotoStory, video: VideoStory };function Story(props) {  // ❌ Incorrecte: el tipus JSX no pot ser una expressió  // return \<components\[props.storyType\] story={props.story} /\>;  // ✅ Correcte: assignem primer a una variable amb majúscula  const SpecificStory \= components\[props.storyType\];  return \<SpecificStory story={props.story} /\>;} |
| :---- |

## **4\. Com es tradueixen les props i els fills**

**Expressions JavaScript com a props**, envoltades de `{}`: a `<MyComponent foo={1 + 2 + 3 + 4} />`, el valor de `props.foo` serà `10` perquè l'expressió s'avalua abans de generar la crida.

**Props per defecte a `true`**: si no passes cap valor per a una prop, per defecte val `true`. `<MyTextBox autocomplete />` equival a `<MyTextBox autocomplete={true} />`.

**Spread de props**: si ja tens `props` com a objecte i vols passar-lo en JSX, pots usar `...` com a sintaxi "spread" per passar tot l'objecte de props:

| const props \= {firstName: 'Ben', lastName: 'Hector'};return \<Greeting {...props} /\>;// Equivalent a: \<Greeting firstName="Ben" lastName="Hector" /\> |
| :---- |

**Els fills (`children`)**: en expressions JSX que contenen una etiqueta d'obertura i una de tancament, el contingut entre aquestes etiquetes es passa com una prop especial: `props.children`. Això vol dir que internament:

| \<MyComponent\>Hello world\!\</MyComponent\>// Es compila a:// React.createElement(MyComponent, null, 'Hello world\!')// I dins de MyComponent, props.children \=== 'Hello world\!' |
| :---- |

**Valors ignorats com a fills**: `false`, `null`, `undefined`, i `true` són fills vàlids, però simplement no es renderitzen. Això és el que fa possible el patró tan habitual de renderitzat condicional:

| \<div\>  {showHeader && \<Header /\>}  \<Content /\>\</div\> |
| :---- |

**Atenció al "0" trampós**: un valor "falsy" com el número `0` encara es renderitza per React, cosa que pot generar comportaments inesperats si `props.messages.length` és `0`:

| // ❌ Perill: si messages.length és 0, es renderitza literalment "0" a la pantalla\<div\>{props.messages.length && \<MessageList messages={props.messages} /\>}\</div\>// ✅ Correcte: assegura't que l'expressió abans de && sigui sempre booleana\<div\>{props.messages.length \> 0 && \<MessageList messages={props.messages} /\>}\</div\> |
| :---- |

## **5\. Avantatges i inconvenients**

**Avantatges:**

* **Llegibilitat**: estructures niades es veuen com a HTML, no com a crides de funció imbricades difícils de seguir  
* **Coherència visual amb el resultat final**: el que escrius s'assembla molt al que es renderitzarà, facilitant raonar sobre la UI  
* **Tot el poder de JavaScript disponible**: com que és sucre sintàctic sobre funcions normals, pots combinar JSX amb qualsevol expressió, variable o lògica de JS

**Inconvenients:**

* **Requereix un pas de compilació** (Babel o similar): JSX no s'executa directament al navegador, cal transformar-lo abans  
* **Regles sintàctiques estrictes que cal memoritzar**: la regla de majúscula/minúscula, que `if`/`for` no es poden usar directament dins de `{}` (només expressions), o el comportament del `0` "falsy" són trampes habituals per a qui comença  
* **Pot amagar la complexitat real**: com que sembla HTML, és fàcil oblidar que per sota hi ha sempre una crida de funció amb el cost que això implica (creació d'objectes, etc.)

## **6\. Errors comuns / mals entesos**

* **Pensar que JSX és HTML.** Sembla HTML, però és JavaScript amb sintaxi especial. Per això `className` enlloc de `class`, o per què dins de `{}` només pots posar **expressions**, no sentències com `if` o `for` directament.  
* **Oblidar la majúscula en components personalitzats.** Com hem vist, si tens un component que comença amb minúscula, has d'assignar-lo a una variable amb majúscula abans d'utilitzar-lo en JSX, perquè React interpretarà qualsevol etiqueta en minúscula com una etiqueta HTML nativa.  
* **Creure que pots ficar qualsevol expressió com a tipus JSX.** No pots escriure `<algunaVariable.tipus />` directament si no és una variable en majúscula assignada prèviament; cal el pas intermedi d'assignar-la a una constant capitalitzada.  
* **No adonar-se que el "0" es renderitza.** És un dels bugs més típics i sorprenents per a qui comença amb renderitzat condicional amb `&&`.

## **7\. Connexió amb altres conceptes del temari**

* Aquest tema és la **base sintàctica** del que ja hem vist sobre programació declarativa: JSX és precisament l'eina que permet escriure aquella descripció declarativa d'una manera llegible  
* Connecta amb el **DOM virtual i la reconciliation**: cada crida a `React.createElement` genera un `ReactElement`, que és exactament la unitat bàsica que vam veure que viu al DOM virtual i que React compara durant la reconciliation  
* Anticipa el tema de **components i props**: aquí ja veus com les props es passen internament com el segon argument de `React.createElement`, i com els fills es converteixen automàticament en `props.children`  
* Es relaciona directament amb **Composition vs Inheritance**: el fet que els fills JSX es passin com `props.children` és el mecanisme tècnic concret que fa possible la composició de components (un component "embolcalla" un altre passant-li children)

## **8\. Preguntes de repàs (amb resposta)**

**1\. En què es converteix realment el codi JSX abans d'executar-se?**

Es converteix en crides a la funció `React.createElement(tipus, props, ...children)`. JSX és només sucre sintàctic: una manera més llegible d'escriure aquestes crides, que un compilador com Babel tradueix automàticament.

**2\. Per què `<Hello />` funciona com a component però `<hello />` no?**

Perquè React utilitza la majúscula inicial per decidir si un tag és un component personalitzat (referència a una variable de l'àmbit) o una etiqueta HTML nativa (es passa com a string). `<hello />` es tracta com si fos una etiqueta HTML literal anomenada "hello", no com una crida al component que has definit.

**3\. Per què cal importar `React` encara que no l'utilitzis explícitament al teu codi JavaScript?**

Perquè, encara que el teu codi sembli no usar `React` directament, el JSX que escrius es compila per sota en crides a `React.createElement`. Si `React` no està dins de l'àmbit, aquestes crides fallarien en temps d'execució. (Nota: amb el "new JSX transform" de versions modernes, aquest requisit explícit ja no sempre cal, però el mecanisme de fons és el mateix.)

**4\. Com es tradueix el contingut entre l'etiqueta d'obertura i tancament d'un component JSX?**

Es passa com una prop especial anomenada `children`, que esdevé el tercer (o posteriors) arguments de la crida a `React.createElement`. Dins del component, hi accedeixes amb `props.children`.

**5\. Per què `{props.messages.length && <MessageList />}` pot causar un bug visual?**

Perquè si `messages.length` és `0`, JavaScript avalua tota l'expressió com `0` (no com `false`), i a diferència de `false`/`null`/`undefined`, el valor `0` **sí** es renderitza per React, mostrant literalment un "0" no desitjat a la pantalla. La solució és assegurar-se que l'expressió abans de `&&` sigui sempre estrictament booleana (per exemple, `length > 0`).

 

