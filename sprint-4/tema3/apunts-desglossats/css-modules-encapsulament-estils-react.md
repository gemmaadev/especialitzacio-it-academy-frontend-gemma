**Com milloren els CSS Modules l'encapsulament d'estils?**

**Guia Completa de CSS Modules**  
Repositori oficial i guia completa per a l’ús de CSS Modules.  
[https://github.com/css-modules/css-modules](https://github.com/css-modules/css-modules)

## **Què és un CSS Module**

Un CSS Module és un fitxer CSS on tots els noms de classe i d'animació son encapsulats localment per defecte. S'escriuen com a fitxers CSS normals però el bundler (Webpack, Vite) transforma els noms de classe en identificadors únics en temps de build.

| /\* Button.module.css \*/.button {  background-color: \#007bff;  color: white;  padding: 10px 20px;}.primary {  background-color: \#0056b3;} |
| :---- |

| // Button.jsx \-- importació com a objecteimport styles from './Button.module.css';function Button({ primary, children }) {  return (    \<button className={\`${styles.button} ${primary ? styles.primary : ''}\`}\>      {children}    \</button\>  );} |
| :---- |

**El mecanisme: com funciona l'encapsulament**

CSS Modules genera noms de classe estàtics únics en temps de build, resultant en fitxers CSS més petits i optimitzats. Tots els noms de classe s'escopen automàticament a un component específic, usant noms únics que eviten la cascada no desitjada.

| Tu escrius:        .button { color: white; }El browser veu:    .Button\_button\_\_xK9mP { color: white; }                         ↑         ↑        ↑                    Nom fitxer  Nom classe  Hash únic |
| :---- |

Dos components poden tenir una classe `.button` sense cap conflicte:

| ComponentA\_button\_\_abc123 { ... }  ← Button AComponentB\_button\_\_xyz789 { ... }  ← Button B |
| :---- |

**Avantatge 1: Encapsulament automàtic sense configuració extra**

En CSS Modules, les classes CSS son localment encapsulades per defecte, el que significa que els estils definits en un mòdul no son accessibles en un altre tret que s'importin explícitament. 

Aquest encapsulament s'aconsegueix en temps de build a través de Webpack, Vite o d'altres bundlers que processen els fitxers CSS i generen noms de classe únics.

| /\* ❌ CSS Tradicional: risc de col·lisió global \*/.title { font-size: 24px; }  /\* Header.css \*/.title { font-size: 18px; }  /\* Card.css → sobreescriu Header\! \*//\* ✅ CSS Modules: cada .title és independent \*//\* Header.module.css → Header\_title\_\_abc123 \*//\* Card.module.css   → Card\_title\_\_xyz789 \*/ |
| :---- |

**Avantatge 2: Sintaxi CSS estàndard (zero corba d'aprenentatge)**

Usen sintaxi CSS estàndard, el que significa que els developers no necessiten aprendre nova sintaxi. També funcionen bé amb preprocessadors CSS com SASS, fent la integració en projectes existents directa.

| /\* Button.module.css \-- CSS pur que ja coneixes \*/.button {  padding: 10px 20px;  border-radius: 4px;  transition: background-color 0.3s;}.button:hover {  opacity: 0.9;}.button:disabled {  cursor: not-allowed;  opacity: 0.5;}/\* Amb SASS si el projecte ho usa \*/.button {  &:hover { opacity: 0.9; }  &:disabled { cursor: not-allowed; }} |
| :---- |

**Avantatge 3: Composició (`composes`) — reutilitzar estils**

CSS Modules té una funcionalitat nativa única: `composes`. Permet heretar estils d'una altra classe sense duplicar codi:

| /\* styles.module.css \*/.base {  font-family: Arial, sans-serif;  padding: 10px;  border-radius: 4px;}.primary {  composes: base;     /\* ← hereda tots els estils de .base \*/  background: \#007bff;  color: white;}.danger {  composes: base;     /\* ← també hereda .base \*/  background: \#dc3545;  color: white;} |
| :---- |

| // Al component:\<button className={styles.primary}\>Primari\</button\>\<button className={styles.danger}\>Perill\</button\> |
| :---- |

**Avantatge 4: Rendiment superior a CSS-in-JS**

Com que CSS Modules genera noms de classe estàtics en temps de build, poden ser més performants que solucions dinàmiques com CSS-in-JS. 

Els estils es processen en temps de build, resultant en fitxers CSS més petits i optimitzats. 

CSS Modules evita la necessitat que JavaScript parsegi i apliqui estils en runtime, el que pot millorar la velocitat de la pàgina.

| CSS Modules:                    CSS-in-JS (styled-components):  ✅ Processat en BUILD time      ❌ Generat en RUNTIME (JS)  ✅ Fitxer .css cacheïble        ❌ Embeds en el bundle JS  ✅ Zero JS per a estils bàsics  ❌ Overhead de parsing JS  ✅ LCP/SEO no afectat           ❌ Pot afectar LCP sense SSR |
| :---- |

**CSS Modules a React: el patró complet**

| // components/Card/Card.module.css.card {  border: 1px solid \#e0e0e0;  border-radius: 8px;  padding: 16px;  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);}.header {  font-size: 20px;  font-weight: bold;  margin-bottom: 8px;}.body {  color: \#666;  line-height: 1.5;}/\* Variant: card destacada \*/.featured {  composes: card;  border-color: \#007bff;  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);}// components/Card/Card.jsximport styles from './Card.module.css';import clsx from 'clsx';  // utilitat per combinar classesfunction Card({ title, children, featured \= false }) {  return (    \<div className={clsx(styles.card, { \[styles.featured\]: featured })}\>      \<h2 className={styles.header}\>{title}\</h2\>      \<div className={styles.body}\>{children}\</div\>    \</div\>  );}// Ús:\<Card title="Normal"\>Contingut normal\</Card\>\<Card title="Destacat" featured\>Contingut destacat\</Card\> |
| :---- |

**Estils globals dins de CSS Modules: `:global`**

Quan necessites estils globals (per a biblioteques de tercers, per exemple):

| /\* styles.module.css \*//\* Encapsulat (per defecte) \*/.container { padding: 16px; }/\* Global \-- s'aplica a tot l'arbre DOM \*/:global(.react-datepicker) {  font-family: inherit;}:global(body) {  margin: 0;} |
| :---- |

**Limitació principal: sense estils dinàmics basats en props**

Aquí CSS Modules perd davant CSS-in-JS. La solució habitual és combinar CSS Modules amb variables CSS:

| /\* Button.module.css \*/.button {  background-color: var(--btn-color, \#007bff);  /\* ← variable CSS \*/  color: var(--btn-text-color, white);} |
| :---- |

| // Estils "dinàmics" passant variables CSS via style inlinefunction Button({ color, children }) {  return (    \<button      className={styles.button}      style={{ '--btn-color': color }}  /\* ← variable CSS via style \*/    \>      {children}    \</button\>  );} |
| :---- |

**Comparativa CSS Modules vs. les alternatives**

|  | CSS Tradicional | CSS Modules | CSS-in-JS |
| ----- | ----- | ----- | ----- |
| **Encapsulament** | ❌ Global | ✅ Automàtic | ✅ Automàtic |
| **Sintaxi** | CSS pur | CSS pur | CSS en JS |
| **Rendiment** | ✅ Màxim | ✅ Molt bo | ⚠️ Overhead |
| **Estils dinàmics** | ⚠️ Manual | ⚠️ Limitat | ✅ Natiu |
| **Corba aprenentatge** | Cap | Mínima | Moderada |
| **Dead code** | ❌ Manual | ⚠️ Parcial | ✅ Automàtic |
| **SEO/LCP** | ✅ | ✅ | ⚠️ Sense SSR |
| **Theming** | Variables CSS | Variables CSS | ✅ Integrat |

CSS Modules és ideal quan:

  ✅ Vols encapsulament sense overhead de CSS-in-JS  
  ✅ Treballes amb SASS/SCSS en un projecte existent  
  ✅ El rendiment i el SEO son prioritaris  
  ✅ L'equip prefereix CSS pur sobre CSS en JavaScript  
  ✅ Aplicació gran amb molts components i risc de conflictes

