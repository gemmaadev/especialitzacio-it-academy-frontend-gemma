**Resum general: Documentació Oficial de React (react.dev/learn)**

**Documentació Oficial de React**  
[https://react.dev/learn](https://react.dev/learn)  
Guia oficial per començar a aprendre React pas a pas

**Què és aquest recurs**

Aquesta és la guia oficial de React, escrita i mantinguda pel propi equip de React. És una introducció al 80% dels conceptes de React que faràs servir diàriament. 

És, amb diferència, **la font de referència més fiable** de tot el temari, perquè ve directament dels creadors de la llibreria.

## **Estructura i contingut**

La guia "Quick Start" cobreix, en ordre, exactament els blocs fonamentals que ja has anat treballant al llarg d'aquest Tema 1, però amb una visió pràctica i d'exemple ràpid en lloc de teoria profunda:

**1\. Crear i niar components** Les apps de React es fan amb components. Un component és una peça de la UI que té la seva pròpia lògica i aparença. Pot ser tan petit com un botó, o tan gran com una pàgina entera. Els components de React són funcions de JavaScript que retornen marcatge:

| function MyButton() {  return \<button\>I'm a button\</button\>;}export default function MyApp() {  return (    \<div\>      \<h1\>Welcome to my app\</h1\>      \<MyButton /\>    \</div\>  );} |
| :---- |

Fixa't que `<MyButton />` comença amb majúscula — així és com saps que és un component de React. Els noms de components de React han de començar sempre amb majúscula, mentre que les etiquetes HTML han de ser en minúscula. (Exactament la regla que ja vam veure en profunditat sobre JSX\!)

**2\. Escriure marcatge amb JSX** JSX és més estricte que l'HTML: has de tancar etiquetes com `<br />`, i el teu component no pot retornar múltiples etiquetes JSX — has d'embolicar-les en un pare compartit, com un `<div>...</div>` o un wrapper buit `<>...</>`.

**3\. Afegir estils** A React, especifiques una classe CSS amb `className`, que funciona igual que l'atribut HTML `class`.

**4\. Mostrar dades** Les claus {} et deixen "escapar cap a JavaScript" per incrustar una variable del teu codi i mostrar-la a l'usuari. La documentació també mostra com fer-ho dins d'atributs JSX, com `src={user.imageUrl}`.

**5\. Renderitzat condicional** A React no hi ha una sintaxi especial per escriure condicions. En lloc d'això, fas servir les mateixes tècniques que en JavaScript normal: `if/else`, l'operador ternari `?:`, o l'operador lògic `&&` (que ja vam veure en detall amb el seu "parany" del valor `0`).

**6\. Renderitzat de llistes** Et basaràs en característiques de JavaScript com el bucle `for` i la funció `map()` dels arrays per renderitzar llistes de components, sempre recordant la prop `key` perquè React la utilitza per saber què ha passat si més endavant insereixes, elimines o reordenes els elements — exactament el mecanisme de reconciliation que ja vam treballar en profunditat.

**7\. Respondre a esdeveniments** Pots respondre a esdeveniments declarant funcions de manejador d'esdeveniments dins dels teus components, com `onClick={handleClick}` — fixa't que no hi ha parèntesis al final: no has de CRIDAR la funció manejadora, només has de PASSAR-LA cap avall.

**8\. Actualitzar la pantalla amb estat** Sovint voldràs que el teu component "recordi" alguna informació i la mostri. Per fer-ho, afegeixes estat al teu component amb `useState`. Si renderitzes el mateix component múltiples vegades, cadascun obtindrà el seu propi estat — cada `<MyButton />` té el seu propi comptador independent.

**9\. Usar Hooks** Les funcions que comencen amb "use" s'anomenen Hooks. `useState` és un Hook integrat proporcionat per React. Els Hooks són més restrictius que altres funcions: només pots cridar Hooks a la part superior dels teus components (o altres Hooks) — exactament la regla que ja vam estudiar amb detall.

**10\. Compartir dades entre components ("lifting state up")** Aquest és el bloc més ric conceptualment de la guia: si necessites que diversos components comparteixin dades i s'actualitzin sempre junts, has de moure l'estat "cap amunt" des dels components individuals fins al component més proper que els contingui a tots.

| // L'estat viu al pare (MyApp), no als fillsexport default function MyApp() {  const \[count, setCount\] \= useState(0);  function handleClick() { setCount(count \+ 1); }  return (    \<div\>      \<MyButton count={count} onClick={handleClick} /\>      \<MyButton count={count} onClick={handleClick} /\>    \</div\>  );}function MyButton({ count, onClick }) {  return \<button onClick={onClick}\>Clicked {count} times\</button\>;} |
| :---- |

La informació que passes cap avall d'aquesta manera s'anomena props. Això s'anomena "lifting state up" (elevar l'estat): movent l'estat cap amunt, l'has compartit entre components.

 

