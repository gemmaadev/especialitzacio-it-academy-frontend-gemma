**Com influeix la gestió d'esdeveniments en l'accessibilitat d'una aplicació?**

## **Per què la gestió d'esdeveniments afecta l'accessibilitat**

Assegura't que tota la funcionalitat exposada a través d'un event de ratolí o punter també sigui accessible usant únicament el teclat. Dependre únicament del dispositiu punter portarà a molts casos on els usuaris de teclat no puguin usar la teva aplicació.

El 15% de la població mundial té alguna forma de discapacitat. La gestió incorrecta dels events és la causa principal d'inaccessibilitat en aplicacions React.

**El Problema \#1: `div` amb `onClick` en lloc de `<button>`**

El problema més freqüent i crític. Un `div` amb `onClick` no és accessible per teclat.

| // ❌ MAL: div amb onClick → inaccessible\<div onClick={handleClick}\>Clica'm\</div\>// Problemes:// → No rep focus amb Tab// → No s'activa amb Enter ni Espai// → Cap lector de pantalla sap que és interactiu// ✅ BÉ: element semàntic → accessible per defecte\<button onClick={handleClick}\>Clica'm\</button\>// Avantatges automàtics:// → Rep focus amb Tab// → S'activa amb Enter i Espai// → El lector de pantalla anuncia "botó"// ✅ ALTERNATIVA: si has d'usar un div (per estilitzat complex)\<div  role="button"        // ← indica als assistents que és un botó  tabIndex={0}         // ← permet rebre focus amb Tab  onClick={handleClick}  onKeyDown={(e) \=\> {    // ← afegeix navegació per teclat manualment    if (e.key \=== 'Enter' || e.key \=== ' ') {      e.preventDefault();      handleClick();    }  }}\>  Clica'm\</div\> |
| :---- |

**El principi: HTML semàntic primer**

Els elements natius com botons, enllaços i controls de formulari ja gestionen events de teclat com Enter i Espai, de manera que son naturalment accessibles.

| // La jerarquia de decisions:// 1er: Usar sempre l'element semàntic adequat\<button onClick={handleClick}\>Acció\</button\>     // per a accions\<a href="/ruta"\>Navegar\</a\>                      // per a navegació\<input onChange={handleChange} /\>                // per a inputs// 2on: Si cal un element no semàntic, afegir ARIA\<div role="button" tabIndex={0} onClick={...} onKeyDown={...}\>// 3er: La regla d'or:// Usa \<button\> per a accions i \<a\> per a navegació// MAI al revés, MAI un \<div\> per a interaccions sense ARIA |
| :---- |

**Gestió d'events de teclat per a components personalitzats**

La navegació per teclat és fonamental per a l'accessibilitat web. Els usuaris que depenen de teclats, lectors de pantalla o altres tecnologies assistives depenen de la gestió correcta del focus i dels handlers de tecles per interactuar amb la teva aplicació.

| // Exemple complet: Tabs accessibles amb navegació per teclatfunction TabPanel({ tabs }: { tabs: Tab\[\] }) {  const \[activeTab, setActiveTab\] \= useState(0);  const tabRefs \= useRef\<(HTMLButtonElement | null)\[\]\>(\[\]);  const handleKeyDown \= (e: React.KeyboardEvent, index: number) \=\> {    let newIndex \= index;    switch (e.key) {      case 'ArrowLeft':        e.preventDefault();        newIndex \= index \> 0 ? index \- 1 : tabs.length \- 1;        break;      case 'ArrowRight':        e.preventDefault();        newIndex \= index \< tabs.length \- 1 ? index \+ 1 : 0;        break;      case 'Home':        e.preventDefault();        newIndex \= 0;        break;      case 'End':        e.preventDefault();        newIndex \= tabs.length \- 1;        break;      default:        return;    }    setActiveTab(newIndex);    tabRefs.current\[newIndex\]?.focus();  // ← gestió de focus programàtica  };  return (    \<div\>      \<div role="tablist" aria-label="Seccions"\>        {tabs.map((tab, i) \=\> (          \<button            key={tab.id}            ref={el \=\> tabRefs.current\[i\] \= el}            role="tab"            aria-selected={i \=== activeTab}            aria-controls={\`panel-${tab.id}\`}            tabIndex={i \=== activeTab ? 0 : \-1}  // ← roving tabIndex            onClick={() \=\> setActiveTab(i)}            onKeyDown={(e) \=\> handleKeyDown(e, i)}          \>            {tab.label}          \</button\>        ))}      \</div\>      \<div        id={\`panel-${tabs\[activeTab\].id}\`}        role="tabpanel"        tabIndex={0}      \>        {tabs\[activeTab\].content}      \</div\>    \</div\>  );} |
| :---- |

**Focus Management: gestionar el focus programàticament**

La gestió del focus garanteix que els usuaris de teclat sàpiguen on son. Gestiona el focus per a modals, diàlegs i components dinàmics.

| // Modal accessible: focus trap \+ restauració del focusfunction Modal({ isOpen, onClose, children }: ModalProps) {  const modalRef \= useRef\<HTMLDivElement\>(null);  const previousFocusRef \= useRef\<HTMLElement | null\>(null);  useEffect(() \=\> {    if (isOpen) {      // Guardar l'element que tenia el focus abans d'obrir      previousFocusRef.current \= document.activeElement as HTMLElement;      // Moure el focus al modal quan s'obre      modalRef.current?.focus();    } else {      // Restaurar el focus on era quan el modal es tanca      previousFocusRef.current?.focus();    }  }, \[isOpen\]);  if (\!isOpen) return null;  return (    \<div      ref={modalRef}      role="dialog"      aria-modal="true"      aria-labelledby="modal-title"      tabIndex={-1}        // ← permet focus programàtic però no Tab navigation    \>      \<h2 id="modal-title"\>Títol del Modal\</h2\>      {children}      \<button onClick={onClose}\>Tanca\</button\>    \</div\>  );} |
| :---- |

**ARIA: atributs que fan interaccions dinàmiques accessibles**

`aria-expanded` anuncia l'estat obert/tancat. `aria-controls` associa el botó amb el menú. `role="menu"` i `"menuitem"` estructuren per a lectors de pantalla.

| // Dropdown accessible amb ARIAfunction Dropdown({ opcions }: { opcions: string\[\] }) {  const \[isOpen, setIsOpen\] \= useState(false);  return (    \<div\>      \<button        aria-expanded={isOpen}        // ← anuncia si és obert o tancat        aria-haspopup="listbox"       // ← indica que té un menú        aria-controls="opcions-llista"// ← associa amb la llista        onClick={() \=\> setIsOpen(\!isOpen)}        onKeyDown={(e) \=\> {          if (e.key \=== 'Escape') setIsOpen(false);        }}      \>        Selecciona una opció      \</button\>      {isOpen && (        \<ul          id="opcions-llista"          role="listbox"              // ← defineix com a llista de selecció          aria-label="Opcions disponibles"        \>          {opcions.map(opcio \=\> (            \<li              key={opcio}              role="option"           // ← cada element és una opció              aria-selected={false}              onClick={() \=\> {                // seleccionar l'opció                setIsOpen(false);              }}              onKeyDown={(e) \=\> {                if (e.key \=== 'Enter' || e.key \=== ' ') {                  // seleccionar amb teclat                  setIsOpen(false);                }              }}              tabIndex={0}            \>              {opcio}            \</li\>          ))}        \</ul\>      )}    \</div\>  );} |
| :---- |

**Botons amb Icones: el cas especial**

| // ❌ MAL: botó d'icona sense text accessible\<button onClick={handleDelete}\>  \<TrashIcon /\>  {/\* ← el lector de pantalla llegeix res o l'SVG path \*/}\</button\>// ✅ BÉ: aria-label per a botons d'icona\<button onClick={handleDelete} aria-label="Eliminar element"\>  \<TrashIcon aria-hidden="true" /\>  {/\* ← aria-hidden: la icona s'ignora \*/}\</button\>// ✅ MILLOR: text visible \+ icona\<button onClick={handleDelete}\>  \<TrashIcon aria-hidden="true" /\>  Eliminar\</button\> |
| :---- |

**`aria-live`: anunciar canvis dinàmics**

| // Notificacions i errors accessibles per a lectors de pantallafunction FormulariAmbErrors() {  const \[error, setError\] \= useState('');  const \[loading, setLoading\] \= useState(false);  return (    \<form onSubmit={handleSubmit}\>      {/\* ← aria-live: el lector de pantalla anuncia quan canvia el contingut \*/}      \<div aria-live="polite" aria-atomic="true"\>        {loading && \<span\>Carregant...\</span\>}      \</div\>      {/\* aria-live="assertive" per a errors crítics (interromp la lectura) \*/}      \<div role="alert" aria-live="assertive"\>        {error && \<span\>{error}\</span\>}      \</div\>      \<label htmlFor="email"\>Email\</label\>      \<input        id="email"        type="email"        aria-describedby="email-error"  // ← associa l'input amb l'error        aria-invalid={\!\!error}          // ← indica que l'input té error      /\>      {error && (        \<span id="email-error" role="alert"\>{error}\</span\>      )}      \<button type="submit"\>Enviar\</button\>    \</form\>  );} |
| :---- |

**La Regla `jsx-a11y`: detectar problemes automàticament**

| npm install \--save-dev eslint-plugin-jsx-a11y |
| :---- |

| // .eslintrc.json{  "plugins": \["jsx-a11y"\],  "extends": \["plugin:jsx-a11y/recommended"\],  "rules": {    "jsx-a11y/click-events-have-key-events": "error",    "jsx-a11y/no-static-element-interactions": "error",    "jsx-a11y/interactive-supports-focus": "error"  }}// → click-events-have-key-events: tot onClick ha de tenir onKeyDown/onKeyPress// → no-static-element-interactions: div/span no poden tenir events sense role// → interactive-supports-focus: elements interactius han de ser focusables |
| :---- |

**Resum: les regles d'accessibilitat per a events**

1\. USA ELEMENTS SEMÀNTICS:  
   \<button\> per a accions → click \+ Enter \+ Espai \+ focus gratis  
   \<a href\> per a navegació → comportament natiu del browser  
   \<input\> per a formularis → label, validació, anunci d'errors

2\. SI HAS D'USAR UN DIV:  
   \+ role="button"          ← diu als assistents quèés  
   \+ tabIndex={0}           ← permet rebre focus  
   \+ onKeyDown              ← afegeix navegació per teclat

3\. GESTIONA EL FOCUS:  
   Modals → moure focus en obrir, restaurar en tancar  
   Rutes → anunciar el canvi de pàgina  
   Contingut dinàmic → focus al nou contingut quan cal

4\. ARIA per a estats dinàmics:  
   aria-expanded → obert/tancat  
   aria-selected → seleccionat  
   aria-disabled → desactivat  
   aria-live    → anunciar canvis automàtics

5\. EVITA:  
   outline: none sense alternativa visual  
   tabIndex positius (distorsionen l'ordre de tab)  
   autoFocus (pot desorientar els usuaris)  
   Events únicament de ratolí (hover, onMouseEnter crítics)

