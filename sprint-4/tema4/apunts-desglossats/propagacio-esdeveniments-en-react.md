**Per què es propaguen els esdeveniments en el DOM i com afecta això als components React?**

###### **Propagació d'esdeveniments**

Article didàctic sobre el bubbling i capturing en la propagació d’esdeveniments.  
[https://javascript.info/bubbling-and-capturing](https://javascript.info/bubbling-and-capturing)

**Per què es propaguen els esdeveniments**

Quan un event ocorre en un element, primer s'executen els handlers d'aquell element, després els del seu pare, i així successivament fins a dalt de tot. El procés s'anomena "bubbling" perquè els events "pugen" des de l'element intern cap als pares, com una bombolla en l'aigua.

La propagació existeix per disseny: permet que elements pare gestionin events dels seus fills sense afegir listeners a cada element individualment. És la base de l'**Event Delegation**, el mecanisme que React usa internament.

**Les tres fases de la propagació**

L'estàndard DOM Events descriu 3 fases de propagació d'events:

| Clic a \<p\> dins de FORM \> DIV \> P:FASE 1 \-- CAPTURING (descens):  document → html → body → form → div → p  (de dalt cap avall, rarament usada)FASE 2 \-- TARGET:  p (l'element on ha ocorregut l'event)FASE 3 \-- BUBBLING (ascens):  p → div → form → body → html → document  (de baix cap amunt, la més usada) |
| :---- |

| document    │   html          ← CAPTURING (baixa)    │   body    │   form  ←────── handlers s'executen en l'ascens (BUBBLING)    │   div   ←────── handlers s'executen en l'ascens    │   \[p\]   ←────── 1\. TARGET: primer s'executa aquí |
| :---- |

**Bubbling: el comportament per defecte**

El principi de bubbling és simple: quan un event ocorre en un element, primer s'executen els handlers d'aquell element, després del seu pare, i així fins a dalt. Quasi tots els events fan bubbling (excepte `focus`, `blur`, `scroll`...).

| // Demostració de bubbling en React:function Toolbar() {  return (    \<div      className="toolbar"      onClick={() \=\> alert('Toolbar clicat\!')}  // ← s'executa 2on    \>      \<button        onClick={() \=\> alert('Botó clicat\!')}   // ← s'executa 1er      \>        Reprodueix      \</button\>    \</div\>  );}// Quan l'usuari clica el \<button\>:// 1\. Alert: "Botó clicat\!"     ← handler del button// 2\. Alert: "Toolbar clicat\!"  ← handler del div (bubbling\!)// Si clica directament el div:// 1\. Alert: "Toolbar clicat\!"  ← únicament el handler del div |
| :---- |

La documentació oficial de React ressalta: tots els events es propaguen en React excepte `onScroll`, que únicament funciona en el tag JSX al qual s'adjunta.

**`event.target` vs `event.currentTarget`**

L'element que ha originat l'event s'anomena element target. El handler d'un element pare pot sempre obtenir detalls sobre on ha ocorregut realment.

| function Formulari() {  const handleClickForm \= (e: React.MouseEvent\<HTMLFormElement\>) \=\> {    console.log('target:', e.target);         // l'element exacte clicat    console.log('currentTarget:', e.currentTarget); // el \<form\> (on està el handler)    // Si cliques el \<button\>:    // e.target → HTMLButtonElement (el botó)    // e.currentTarget → HTMLFormElement (el form, on està el handler)    // Si cliques directament el \<form\>:    // e.target \=== e.currentTarget → HTMLFormElement  };  return (    \<form onClick={handleClickForm}\>      \<input type="text" placeholder="Nom" /\>      \<button type="submit"\>Enviar\</button\>    \</form\>  );} |
| :---- |

**Aturar la propagació: `e.stopPropagation()`**

Si vols prevenir que un event arribi als components pare, has de cridar `e.stopPropagation()`.

| // Cas pràctic: modal que es tanca en clicar fora,// però NO quan es clica el contingut interiorfunction Modal({ isOpen, onClose }: { isOpen: boolean; onClose: () \=\> void }) {  if (\!isOpen) return null;  return (    // Overlay: clica fora → tanca el modal    \<div className="overlay" onClick={onClose}\>      {/\* Contingut: clica dins → NO tanca el modal \*/}      \<div        className="modal-content"        onClick={(e) \=\> e.stopPropagation()} // ← atura el bubbling aquí      \>        \<h2\>Títol del Modal\</h2\>        \<p\>Contingut del modal\</p\>        \<button onClick={onClose}\>Tanca\</button\>      \</div\>    \</div\>  );}// Sense stopPropagation: clicar qualsevol part del modal interior// faria bubbling fins a l'overlay i tancaria el modal\! |
| :---- |

**Alternativa a `stopPropagation`: passar handlers com a props**

La documentació de React recomana no aturar el bubbling sense una necessitat real perquè pot crear zones mortes per a analytics i altres listeners.

| // Alternativa recomanada: patró "handler com a prop"// En lloc d'aturar la propagació, permet que el fill executi la seva lògica// i DESPRÉS cridi el handler del parefunction Button({ onClick, children }: { onClick: () \=\> void; children: React.ReactNode }) {  return (    \<button      onClick={(e) \=\> {        e.stopPropagation();  // ← atura el bubbling        onClick();            // ← crida el handler del pare explícitament        // Aquí podries afegir lògica pròpia del botó: logging, animació...      }}    \>      {children}    \</button\>  );}function Toolbar() {  return (    \<div onClick={() \=\> console.log('toolbar clicat')}\>      \<Button onClick={() \=\> console.log('reproduint\!')}\>        Reprodueix      \</Button\>    \</div\>  );}// Avantatge: el flux és explícit i traçable// Sabem exactament quins handlers s'executen i en quin ordre |
| :---- |

**Capturing: la fase descendent (rarament usada)**

Normalment els handlers s'afegeixen a la fase de bubbling. Per capturar events en la fase de descens, s'afegeix `Capture` al nom de l'event en React:

| // Fase de capturing: útil per a analytics i routers// s'executa ABANS que els handlers normals dels elements fillsfunction App() {  return (    \<div      onClickCapture={(e) \=\> {        // S'executa PRIMER, fins i tot abans del handler del \<button\>        console.log('Captura a nivell div:', e.target);        // Útil per a: analytics, logging de totes les interaccions      }}    \>      \<button onClick={() \=\> console.log('Botó clicat')}\>        {/\* La seqüència és:            1\. onClickCapture del div (capturing)            2\. onClick del button (target)            3\. onClick del div si existís (bubbling)        \*/}        Clic      \</button\>    \</div\>  );} |
| :---- |

**Event Delegation en React: la connexió important**

El bubbling és la base de l'**Event Delegation**: en lloc d'afegir un listener a cada element d'una llista, afegim un sol listener al pare.

| // Sense Event Delegation: un handler per cada elementfunction LlistaIneficient({ items }: { items: Item\[\] }) {  return (    \<ul\>      {items.map(item \=\> (        // ← Cada \<li\> té el seu propi handler → N listeners        \<li key={item.id} onClick={() \=\> handleClick(item.id)}\>          {item.nom}        \</li\>      ))}    \</ul\>  );}// Amb Event Delegation: un sol handler al parefunction LlistaEficient({ items }: { items: Item\[\] }) {  const handleClick \= (e: React.MouseEvent\<HTMLUListElement\>) \=\> {    const li \= (e.target as HTMLElement).closest('li');    if (li) {      const id \= li.dataset.id;      console.log('Item clicat:', id);    }  };  return (    // ← Un sol handler al \<ul\> → captura els clicks de tots els \<li\>    \<ul onClick={handleClick}\>      {items.map(item \=\> (        \<li key={item.id} data-id={item.id}\>          {item.nom}        \</li\>      ))}    \</ul\>  );}// React ja usa Event Delegation internament:// adjunta un sol listener al root (\<div id="root"\>)// i gestiona tots els events des d'allà |
| :---- |

**`e.preventDefault()` vs `e.stopPropagation()`: la confusió freqüent**

No confonguis `e.stopPropagation()` i `e.preventDefault()`. Son útils però no relacionats.

| function FormulariLogin() {  const handleSubmit \= (e: React.FormEvent\<HTMLFormElement\>) \=\> {    e.preventDefault();    // ← prevé la RECÀRREGA DE PÀGINA del form                           // NO atura el bubbling de l'event submit    console.log('Formulari enviat\!');  };  const handleClick \= (e: React.MouseEvent\<HTMLButtonElement\>) \=\> {    e.stopPropagation();   // ← atura el BUBBLING cap al pare                           // NO prevé el comportament per defecte del navegador  };  return (    \<form onSubmit={handleSubmit}\>      \<input type="email" /\>      \<button type="submit" onClick={handleClick}\>        Enviar      \</button\>    \</form\>  );}// e.preventDefault()://   → Atura el comportament per defecte del NAVEGADOR//   → Links que no navegen, forms que no recarreguen la pàgina//   → NO afecta la propagació de l'event// e.stopPropagation()://   → Atura l'event perquè no arribi als pares//   → NO afecta el comportament per defecte del navegador// e.stopImmediatePropagation()://   → Atura el bubbling I impedeix que altres handlers del MATEIX element s'executin |
| :---- |

**Resum: la propagació en context React**

L'event ocorre a l'element fill  
         ↓  
FASE TARGET: handler del fill s'executa  
         ↓  
BUBBLING: l'event puja als pares  
  → Cada pare amb handler el detecta  
  → S'executen en ordre: fill → pare → avi...  
         ↓  
e.stopPropagation() → atura el bubbling  
e.preventDefault()  → atura el comportament del browser

React \+ Event Delegation:  
  → React adjunta UN SOL listener al \<div id="root"\>  
  → Quan un event fa bubbling fins al root, React el captura  
  → Crea un SyntheticEvent i el distribueix als handlers correctes  
  → Eficient: independent del nombre d'elements al DOM

Regles pràctiques:  
  → Bubbling és el comportament per defecte → no cal configurar res  
  → stopPropagation → usar amb moderació (pot crear "zones mortes")  
  → Alternativa: passar handlers com a props (patró recomanat per React)  
  → Capturing (onClickCapture) → rarament necessari (analytics, routers)

