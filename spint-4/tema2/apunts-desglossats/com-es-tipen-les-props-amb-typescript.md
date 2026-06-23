**Com es tipen les props amb TypeScript?**

**Typing Component Props**  
Cheatsheet pràctic per tipar les propietats de components React amb TypeScript.  
[https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic\_type\_example/](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example/)

**1\. Definició**  

Tipar les props vol dir definir explícitament, amb la sintaxi de TypeScript, **quina forma ha de tenir l'objecte de props** que rep un component: quins camps té, de quin tipus és cada un, i quins són opcionals. 

En lloc de descobrir en temps d'execució que has passat un `string` on calia un `number`, l'editor i el compilador t'avisen **abans** que el codi s'executi.

| type AppProps \= {  message: string;};const App \= ({ message }: AppProps) \=\> \<div\>{message}\</div\>; |
| :---- |

## **2\. Per què existeix / quin problema resol**

Sense tipatge, un component rebut amb props incorrectes simplement falla en temps d'execució, o pitjor, **falla silenciosament** mostrant `undefined` o un comportament estrany sense cap error clar. 

Amb TypeScript, aquests errors es detecten **mentre escrius el codi**, abans de fer-lo córrer.

Aquesta connexió ve directament de tot el que ja vam veure sobre **props** al Tema 2: si les props són "l'únic argument" d'un component (com els paràmetres d'una funció), llavors tipar-les és exactament el mateix que tipar els paràmetres d'una funció en TypeScript — i aporta el mateix benefici de seguretat.

## **3\. Com funciona per dins: el ventall de tipus bàsics**

Aquí hi ha una llista de tipus de TypeScript que probablement faràs servir en una app React+TypeScript:

| type AppProps \= {  message: string;  count: number;  disabled: boolean;  /\*\* array d'un tipus\! \*/  names: string\[\];  /\*\* literals de string per especificar valors exactes, amb un union type per unir-los \*/  status: "waiting" | "success";  /\*\* un objecte amb propietats conegudes (però podria tenir-ne més en temps d'execució) \*/  obj: {    id: string;    title: string;  };  /\*\* array d'objectes\! (comú) \*/  objArr: {    id: string;    title: string;  }\[\];  /\*\* funció que no rep ni retorna res (MOLT COMÚ) \*/  onClick: () \=\> void;  /\*\* funció amb paràmetre nomenat (MOLT COMÚ) \*/  onChange: (id: number) \=\> void;  /\*\* sintaxi de tipus de funció que rep un event (MOLT COMÚ) \*/  onChange: (event: React.ChangeEvent\<HTMLInputElement\>) \=\> void;  /\*\* una prop opcional (MOLT COMÚ\!) \*/  optional?: OptionalType;  /\*\* quan passes cap avall la funció setter retornada per \`useState\` a un component fill \*/  setState: React.Dispatch\<React.SetStateAction\<number\>\>;}; |
| :---- |

Fixa't en el detall de l'**operador `?`** per a props opcionals (`optional?: OptionalType`) — connecta directament amb el que ja vam veure sobre valors per defecte de props.

## **4\. Com s'aplica el tipus al component: les diferents sintaxis**

Aquests es poden escriure com a funcions normals que reben un argument props i retornen un element JSX. Hi ha diverses maneres vàlides d'aplicar el tipus, ordenades de la més habitual a la menys recomanada avui dia:

| // 1\. La manera més senzilla: el tipus de retorn s'infereix automàticamentconst App \= ({ message }: AppProps) \=\> \<div\>{message}\</div\>;// 2\. Anotant explícitament el tipus de retorn (útil per detectar errors si retornes// accidentalment alguna cosa que no és JSX vàlid)const App \= ({ message }: AppProps): React.JSX.Element \=\> \<div\>{message}\</div\>;// 3\. Tipus inline, sense crear un type/interface separatconst App \= ({ message }: { message: string }) \=\> \<div\>{message}\</div\>;// 4\. Amb React.FunctionComponent (o el seu àlies React.FC)const App: React.FC\<AppProps\> \= ({ message }) \=\> \<div\>{message}\</div\>; |
| :---- |

Pots triar utilitzar `React.FunctionComponent` (o `React.FC`), si ho prefereixes. Amb els tipus més recents de React i TypeScript 5.1, és majoritàriament una qüestió d'estil.

**Important per al bootcamp**: el consens general avui dia és que `React.FunctionComponent` (o l'abreviatura `React.FC`) no és necessari. 

Si encara fas servir React 17 o TypeScript inferior a 5.1, fins i tot es desaconsella. 

**La recomanació actual és l'opció 1 o 2**: una funció normal amb el tipus de props anotat directament al paràmetre destructurat.

## **5\. `type` vs `interface`: quina sintaxi triar**

Aquesta és una decisió que et trobaràs sovint, i el cheatsheet hi dona una resposta directa: pots usar tant Types com Interfaces per tipar Props i State, així que sorgeix la pregunta — quin utilitzes?

Usa Interface fins que necessitis Type — és la regla curta. Però la recomanació pràctica per a components React és matisada: considera utilitzar `type` per a les Props i el State dels teus components React, per consistència i perquè és més restrictiu. 

Sempre utilitza `interface` per a la definició d'APIs públiques quan escrius una llibreria o definicions de tipus ambientals de tercers, ja que permet a un consumidor estendre-les via declaration merging si falten algunes definicions.

| // Recomanat per a components de la teva pròpia app:type ButtonProps \= {  label: string;  onClick: () \=\> void;};// Recomanat si estàs construint una llibreria que altres ampliaran:interface ButtonProps {  label: string;  onClick: () \=\> void;} |
| :---- |

Els Types són útils per a union types (per exemple, `type MyType = TypeA | TypeB`), mentre que les Interfaces són millors per declarar formes de diccionari i després fer `implement` o `extend`.

## **6\. Tipus útils específics de React: `children`, estils, events**

Quan un component accepta altres components com a props (composició), hi ha tipus específics de React que cal conèixer: 

`children?: React.ReactNode` és el millor tipus, accepta tot el que React pot renderitzar. 

`childrenElement: React.JSX.Element` és un únic element React. `style?: React.CSSProperties` per passar props d'estil. 

`onChange?: React.FormEventHandler<HTMLInputElement>` per a events de formulari.

| type CardProps \= {  children?: React.ReactNode; // accepta text, elements, arrays, null...  style?: React.CSSProperties;};function Card({ children, style }: CardProps) {  return \<div style={style}\>{children}\</div\>;} |
| :---- |

**Diferència clau entre `React.JSX.Element` i `React.ReactNode`**, una confusió molt habitual: 

`React.JSX.Element` és el valor de retorn de `React.createElement`, mentre que `React.ReactNode` és el conjunt de tots els possibles valors de retorn d'un component. 

En la pràctica: si vols acceptar **qualsevol cosa** renderitzable (text, número, array, `null`, un altre component...) com a `children`, usa `React.ReactNode`. 

Si necessites **exactament un element JSX concret**, usa `React.JSX.Element`.

## 

## **7\. El parany de l'`object`, `{}` i `Object`**

Aquesta és una confusió tècnica important que cal evitar: `object` no significa "qualsevol objecte" sinó "qualsevol tipus no primitiu", el que significa que representa qualsevol cosa que NO sigui `number`, `bigint`, `string`, `boolean`, `symbol`, `null` o `undefined`.

I encara més sorprenent: una interfície buida, `{}`, i `Object` representen tots "qualsevol valor no-nullish" — no "un objecte buit" com es podria pensar. Utilitzar aquests tipus és una font comuna de confusió i no es recomana:

| interface AnyNonNullishValue {}let value: AnyNonNullishValue;value \= 1;          // ✅ vàlid (encara que sembli estrany\!)value \= "foo";       // ✅ vàlidvalue \= { foo: "bar" }; // ✅ vàlidvalue \= undefined;  // ❌ errorvalue \= null;       // ❌ error |
| :---- |

**Conclusió pràctica**: evita `{}`, `Object` i, en general, `object` com a tipus de prop tret que realment vulguis dir "qualsevol valor que no sigui `null`/`undefined`" — gairebé mai és el que vols expressar.

## **8\. Avantatges i inconvenients**

**Avantatges:**

* **Detecció d'errors en temps de desenvolupament**, no en temps d'execució: l'editor t'avisa abans que el bug arribi a producció  
* **Autocompletat intel·ligent**: en escriure `props.`, l'editor et suggereix exactament els camps disponibles  
* **Documentació viva**: el tipus de les props és, en si mateix, una documentació sempre actualitzada de com s'ha d'usar un component  
* **Refactorització més segura**: si canvies el nom d'una prop, TypeScript marca immediatament tots els llocs on calia actualitzar-la

**Inconvenients / matisos:**

* **Verbositat afegida**: cal escriure i mantenir les definicions de tipus, que no calen en JavaScript pur  
* **Corba d'aprenentatge pròpia**: distingir `React.ReactNode` de `React.JSX.Element`, o `type` d'`interface`, requereix temps i pràctica  
* **Falsos sentiments de seguretat amb `any` o `object`**: usar-los malament (com hem vist amb `{}`) pot donar la sensació de seguretat de tipus sense oferir-la realment

## **9\. Errors comuns / mals entesos**

* **Usar `object`, `{}` o `Object` pensant que volen dir "un objecte amb qualsevol propietat".** Com hem vist, signifiquen "qualsevol valor no-nullish", inclosos números, strings i funcions — gairebé mai és la intenció real.  
* **Confondre `React.ReactNode` amb `React.JSX.Element`.** Si la prop `children` ha d'acceptar text pla, `null`, o arrays d'elements (el cas habitual), cal `React.ReactNode`; `React.JSX.Element` és més restrictiu i només accepta un element JSX concret.  
* **Seguir utilitzant `React.FC` per costum sense saber que ja no és la recomanació actual.** No és un error greu, però avui dia es prefereix la funció normal amb el tipus aplicat directament al paràmetre.  
* **Barrejar `type` i `interface` sense criteri dins del mateix projecte.** Tot i que ambdós funcionen, mantenir consistència (per exemple, `type` per a props de components propis) facilita la lectura del codi en equip.

## **10\. Connexió amb altres conceptes del temari**

* Aquest tema és l'aplicació pràctica directa de tot el que ja vam veure sobre **props**: tipar-les és simplement formalitzar, amb la sintaxi de TypeScript, l'estructura que ja existia implícitament en JavaScript  
* Connecta amb la **prop `children`** que vam veure al resum anterior: ara saps que el tipus correcte per acceptar-la de manera flexible és `React.ReactNode`  
* Es relaciona amb els **valors per defecte de props**: una prop opcional (`optional?: Type`) és el reflex exacte, a nivell de tipus, del que ja vam veure amb la destructuració `{ size = 100 }`  
* Anticipa el **tipatge dels Hooks**: el mateix patró de tipar paràmetres s'aplica a `useState<TipusDelEstat>()`, que veuràs en temes posteriors del bootcamp

## **11\. Preguntes de repàs (amb resposta)**

**1\. Quina diferència hi ha entre `React.JSX.Element` i `React.ReactNode`, i quan s'hauria d'utilitzar cadascun?**

`React.JSX.Element` és el tipus de retorn exacte de `React.createElement` — un únic element JSX concret. `React.ReactNode` és el conjunt de tots els possibles valors que un component pot retornar (text, números, arrays, `null`, elements...). Per a la prop `children`, gairebé sempre convé `React.ReactNode` perquè és més flexible i accepta més casos d'ús reals.

**2\. Per què `{}` o `Object` no s'haurien d'utilitzar per dir "un objecte buit" en TypeScript?**

Perquè en realitat representen "qualsevol valor que no sigui `null` ni `undefined`" — inclosos números, strings i funcions, no només objectes. Utilitzar-los amb la intenció d'expressar "un objecte sense propietats" és un error de comprensió molt habitual i pot amagar bugs de tipatge.

**3\. Quina és la recomanació actual sobre `React.FC` per tipar un component?**

El consens actual és que no és necessari; es prefereix una funció normal amb el tipus de les props anotat directament al paràmetre destructurat (`({ message }: AppProps) => ...`). `React.FC` encara funciona, però ja no és la pràctica recomanada per defecte.

**4\. Quan convé fer servir `type` i quan `interface` per tipar les props d'un component?**

Per a les props dels teus propis components d'aplicació, es recomana `type`, per consistència i perquè és més restrictiu. `interface` es reserva sobretot per a definicions d'APIs públiques de llibreries, on convé permetre que els consumidors les estenguin mitjançant declaration merging.

**5\. Com es tipa una prop opcional, i quina sintaxi de TypeScript ho indica?**

Afegint un signe d'interrogació `?` just després del nom de la propietat dins de la definició del tipus: `optional?: OptionalType`. Açò indica a TypeScript que la prop pot no estar present, sense generar un error, i normalment es combina amb un valor per defecte a la destructuració dels paràmetres del component.

 

