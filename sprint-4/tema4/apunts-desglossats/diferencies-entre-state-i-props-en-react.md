**Quines son les diferències entre state i props en React?**

## **La distinció fonamental**

La diferència principal entre Props i State és que els props son una manera de passar dades o propietats d'un component a un altre, mentre que l'estat son les dades en temps real disponibles per usar únicament dins d'aquell component.

Resumit en una analogia:

Props → els ARGUMENTS d'una funció  
  → venen de fora (el pare les passa)  
  → el component fill no les pot canviar

State → les VARIABLES LOCALS d'una funció  
  → viven dins del component  
  → el component les pot canviar quan vulgui

**Props: dades que venen de fora**

Les props (abreviació de properties) permeten als components rebre dades dels seus components pare. Son immutables, el que significa que no poden canviar un cop passades. Això assegura un flux de dades unidireccional, mantenint els components predictibles.

| // El pare defineix i controla les propsfunction App() {  return (    \<CartItem      nom="Auriculars"     // ← prop: string      preu={199}           // ← prop: number      disponible={true}    // ← prop: boolean      onEliminar={() \=\> handleEliminar('auriculars')} // ← prop: funció callback    /\>  );}// El fill REP les props però NO les pot modificarfunction CartItem({ nom, preu, disponible, onEliminar }: CartItemProps) {  // ❌ Prohibit: mutar les props directament  // nom \= 'altre nom';  → Error conceptual, viola el flux de React  // preu++;             → Mai fer això  // ✅ Únicament llegir i usar les props  return (    \<div\>      \<h3\>{nom} \-- {preu}€\</h3\>      {\!disponible && \<span\>Sense estoc\</span\>}      \<button onClick={onEliminar}\>Eliminar\</button\>    \</div\>  );} |
| :---- |

### **Props poden ser qualsevol valor JavaScript**

| // Props accepten qualsevol tipus:\<Component  text="hola"                          // string  nombre={42}                          // number  actiu={true}                         // boolean  llista={\['a', 'b', 'c'\]}            // array  config={{ color: 'blau' }}           // objecte  onClic={() \=\> console.log('clic')}   // funció (callback)  icona={\<StarIcon /\>}                 // JSX (element React)\>  Contingut interior                   // children (prop especial)\</Component\> |
| :---- |

**State: dades que viuen dins del component**

L'estat és típicament usat per a dades que canvien amb el temps, com entrades de formularis, interaccions d'usuari, o dades d'API. Quan l'estat canvia, React re-renderitza el component per reflectir el nou estat.

| function CartItem({ nom, preu }: { nom: string; preu: number }) {  // State: dades internes que el component controla  const \[quantitat, setQuantitat\] \= useState(1);  const \[afegitAlCarro, setAfegitAlCarro\] \= useState(false);  return (    \<div\>      \<h3\>{nom} \-- {preu}€\</h3\>      {/\* ← prop: ve de fora \*/}      \<p\>Quantitat: {quantitat}\</p\>  {/\* ← state: viu aquí dins \*/}      \<button onClick={() \=\> setQuantitat(q \=\> q \+ 1)}\>+\</button\>      \<button onClick={() \=\> setQuantitat(q \=\> Math.max(1, q \- 1))}\>-\</button\>      \<button onClick={() \=\> setAfegitAlCarro(true)}\>        {afegitAlCarro ? 'Afegit\!' : 'Afegir al carro'}      \</button\>    \</div\>  );}// App.jsxfunction App() {  return \<CartItem nom="Auriculars" preu={199} /\>;}// → nom i preu: props (fixats pel pare)// → quantitat i afegitAlCarro: state (gestionats pel propi CartItem) |
| :---- |

**La propietat clau: Ownership (propietat)**

L'estat és data que un component posseeix i pot actualitzar amb el temps; les props son data que un component rep del seu pare i no li és permès mutar.

STATE:  
  → El component és el PROPIETARI  
  → Pot llegir-lo ✅  
  → Pot modificar-lo ✅ (via setState)  
  → Ningú de fora pot modificar-lo directament

PROPS:  
  → El PARE és el propietari  
  → El fill pot llegir-les ✅  
  → El fill NO pot modificar-les ❌  
  → Si el fill necessita "canviar" una prop → ha d'usar un callback

**El flux unidireccional: de pare a fill**

Un concepte important en React és que les dades flueixen cap avall des dels components pare als components fill. Els components fill no poden passar dades cap amunt als pares. Aquest flux de dades pare-fill s'habilita amb les props.

|        App (state: productes, carret)         │         ├── Props: productes={productes}         │         onAfegir={handleAfegir}         ↓     LlistaProductes         │         ├── Props: producte={producte}         │         onAfegir={onAfegir}         ↓       ProducteCard         │   ← NO pot enviar dades cap amunt directament         │   ← PERÒ pot cridar callbacks que el pare ha passat com a prop         └── onAfegir(producte.id)  ← el fill crida el callback del pare |
| :---- |

### **Com un fill "comunica" cap amunt: Callback Props**

Les props de callback son com els fills es comuniquen cap amunt — el fill invoca la funció, el pare actualitza el seu estat, i les noves props flueixen cap avall en el pròxim render.

| // El fill NO pot canviar les dades del pare directament// PERÒ pot cridar funcions que el pare ha passat com a propfunction Pare() {  const \[missatge, setMissatge\] \= useState('Inicial');  // El pare passa una funció que actualitza el seu PROPI estat  const handleActualitzar \= (nouMissatge: string) \=\> {    setMissatge(nouMissatge);  };  return (    \<div\>      \<p\>Missatge del pare: {missatge}\</p\>      {/\* Passa el callback al fill com a prop \*/}      \<Fill onActualitzar={handleActualitzar} /\>    \</div\>  );}function Fill({ onActualitzar }: { onActualitzar: (msg: string) \=\> void }) {  return (    \<button onClick={() \=\> onActualitzar('Hola des del fill\!')}\>      Actualitzar el pare    \</button\>    // ← El fill NO modifica res del pare directament    // ← Crida el callback → el PARE actualitza el SEU estat    // → les noves props flueixen cap avall automàticament  );} |
| :---- |

**Lifting State Up: l'estat compartit**

Quan dos components necessiten compartir el mateix estat, cal **elevar l'estat** al component pare comú més proper.

| // ❌ MAL: cada component té el seu propi estat → no sincronitzatsfunction Producte() {  const \[quantitat, setQuantitat\] \= useState(0);  return \<button onClick={() \=\> setQuantitat(q \=\> q \+ 1)}\>{quantitat}\</button\>;}function Resum() {  // Com sap Resum quantes unitats té Producte? → No pot\!}// ✅ BÉ: estat elevat al pare comúfunction App() {  const \[quantitat, setQuantitat\] \= useState(0); // ← estat al pare  return (    \<div\>      {/\* Passa l'estat com a prop \+ el setter com a callback \*/}      \<Producte quantitat={quantitat} onAfegir={() \=\> setQuantitat(q \=\> q \+ 1)} /\>      \<Resum total={quantitat} /\>  {/\* Resum sempre sincronitzat \*/}    \</div\>  );}function Producte({ quantitat, onAfegir }: { quantitat: number; onAfegir: () \=\> void }) {  return \<button onClick={onAfegir}\>{quantitat} al carro\</button\>;}function Resum({ total }: { total: number }) {  return \<p\>Total d'articles: {total}\</p\>;} |
| :---- |

**Quan usar State i quan usar Props**

Usa state per a valors que canvien amb el temps dins del component (com entrades de formulari, estats de toggle o comptadors). Usa props quan un component pare controla el valor, fins i tot si canvia, per mantenir una sola font de veritat.

| // DECISIÓ: state o prop?// → El valor canvia per interacció de l'usuari dins d'aquest component?//   SÍ → STATEconst \[obert, setObert\] \= useState(false);  // toggle d'un menúconst \[text, setText\] \= useState('');        // input de formulari// → El valor ve del pare i el pare el controla?//   SÍ → PROPfunction Button({ label, onClick, disabled }) { ... }// → El valor es pot calcular a partir d'altre state o props?//   SÍ → NI STATE NI PROP → variable derivada (computed)const total \= items.reduce((sum, item) \=\> sum \+ item.preu, 0);// ← NO crees useState(0) per al total → el calcules directament// Regla pràctica (de la comunitat React):// "Usa props fins que proven el contrari.//  Si necessites crear state, justifica-ho//  perquè afegeix complexitat i evita la memoització." |
| :---- |

**Tipar props i state amb TypeScript**

| // Tipar props: interfície o typeinterface ButtonProps {  label: string;  onClick: () \=\> void;  variant?: 'primary' | 'secondary' | 'danger';  // opcional amb ?  disabled?: boolean;}function Button({ label, onClick, variant \= 'primary', disabled \= false }: ButtonProps) {  return (    \<button      onClick={onClick}      disabled={disabled}      className={\`btn btn-${variant}\`}    \>      {label}    \</button\>  );}// Tipar state: inferit o explícitconst \[count, setCount\] \= useState(0);                    // inferit: numberconst \[usuari, setUsuari\] \= useState\<Usuari | null\>(null); // explícit: Usuari | nullconst \[items, setItems\] \= useState\<string\[\]\>(\[\]);          // explícit: array// Props especials: childreninterface CardProps {  title: string;  children: React.ReactNode;  // ← tipus per a tot el que pot ser JSX}function Card({ title, children }: CardProps) {  return \<div\>\<h2\>{title}\</h2\>{children}\</div\>;} |
| :---- |

**Taula comparativa**

| Característica | State | Props |
| ----- | ----- | ----- |
| **Origen** | Definit dins del component | Rebut del component pare |
| **Propietat** | El propi component | El component pare |
| **Mutabilitat** | ✅ Mutable (via setState) | ❌ Immutable per al fill |
| **Re-render** | ✅ Canviar → re-render | ✅ Canvi al pare → re-render |
| **Direcció** | Local al component | De pare a fill (unidireccional) |
| **Accés** | `const [val, setVal] = useState()` | `function Comp({ prop }) {}` |
| **Per a quès'usa** | Dades dinàmiques internes | Configuració, dades, callbacks |
| **Comunicació** | Intern | Pare → fill (props) / fill → pare (callbacks) |

  Props → "el que el món exterior li diu al component"  
  State → "el que el component recorda per si mateix"

El flux de React:  
  UI \= f(props, state)  
  → La UI és una funció de les props i l'estat  
  → Canvia qualsevol dels dos → React recalcula la UI