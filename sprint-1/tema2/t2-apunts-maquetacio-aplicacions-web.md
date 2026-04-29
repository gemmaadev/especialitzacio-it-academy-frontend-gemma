## **Apunts tema 2: Maquetació d'aplicacions web**

**1\. Del disseny al codi: el procés**

Abans d'escriure cap línia de codi, cal analitzar el disseny fent cinc passades en ordre: de fora cap a dins, de dalt a baix, d'esquerra a dreta.

**Passada 1: Patrons de layout** — quines estructures de columnes, seccions i graelles es repeteixen. 

**Passada 2: Patrons d'elements** — botons, tipografies, components repetits. 

**Passada 3: Paleta de colors** — tots els colors amb els seus codis. 

**Passada 4: Estructura semàntica** — quins elements HTML correspondrien a cada secció (la base per a l'accessibilitat). 

**Passada 5: Tot la resta** — preguntes obertes, casos no definits i feina "amagada".

El resultat és una classificació de la feina en quatre categories: ja llest, necessita ajustos, nou-clar i nou-incert. Identificar la darrera categoria aviat evita problemes tardans.

**2\. HTML Semàntic**

Els elements semàntics comuniquen el propòsit del contingut tant a les persones com a les màquines. `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` i `<footer>` aporten significat que un `<div>` mai pot donar.

El benefici principal per a l'accessibilitat és que els lectors de pantalla usen aquests elements per crear regions navegables. L'usuari pot saltar directament al `<main>` o al `<nav>` sense llegir tot el contingut. Amb `<div>` per a tot, aquest salt és impossible.

La regla pràctica: usa `<div>` únicament quan necessites un contenidor per a estils o JavaScript i cap element semàntic descriu bé el contingut. En qualsevol altre cas, usa l'element que descriu la natura del contingut.

**3\. CSS Reset i Normalize**

Els navegadors apliquen estils per defecte propis que difereixen lleugerament entre ells. El CSS Reset elimina tots aquests estils (pissarra en blanc) i Normalize.css els harmonitza sense eliminar-los.

Per a projectes nous, la recomanació actual és un **reset mínim híbrid**: elimina els marges i aplica `box-sizing: border-box`, però conserva l'herència tipogràfica als controls de formulari (`font: inherit` per a inputs i botons) i no toca mai el focus outline. Qualsevol reset que elimini `outline: none` globalment és una violació directa de l'accessibilitat.

**4\. Flexbox**

Flexbox és per a layouts d'**una sola dimensió**: una fila o una columna.

Les propietats del contenidor: 

* `display: flex`  
* `flex-direction` (row o column)  
* `flex-wrap` (si s'ajusta en múltiples línies)  
* `justify-content` (alineació a l'eix principal)  
* `align-items` (alineació a l'eix creuat)   
* `gap` (espai entre elements sense problemes de marges).

Les propietats dels fills: 

* `flex-grow` (capacitat de créixer)  
* `flex-shrink` (capacitat d'encongir-se)  
* `flex-basis` (mida inicial) i el shorthand `flex` que combina els tres. 

La manera moderna de centrar perfectament: `display: flex` \+ `justify-content: center` \+ `align-items: center`.

**5\. CSS Grid**

Grid és per a layouts de **dues dimensions**: files i columnes alhora.

Les propietats clau: 

* `grid-template-columns` i `grid-template-rows` per definir la graella,   
* `grid-template-areas` per nombrar les zones (proporciona una visualització llegible del layout directament al CSS),   
* `gap` per a l'espaiat  
* `place-items: center` per a centrat en totes dues dimensions.

Per als fills: 

* `grid-column` i `grid-row` per col·locar elements en cel·les concretes  
* `grid-area` per assignar a una zona nombrada.

La combinació `repeat(auto-fill, minmax(300px, 1fr))` crea un grid responsiu sense cap media query: tantes columnes de mínim 300px com càpiguen, i la resta omplint l'espai disponible.

**6\. Mobile-First i Media Queries**

Mobile-first significa escriure els estils base per a mòbil i afegir modificacions per a pantalles grans amb `min-width`. Desktop-first és el contrari: estils base per a desktop i excepcions per a mòbil amb `max-width`.

La recomanació de la indústria és mobile-first per tres raons: el tràfic web és majoritàriament mòbil, genera menys sobreescriptures de CSS, i Google avalua la versió mòbil per al SEO.

Els breakpoints en `rem` en lloc de `px` respecten les preferències de mida de lletra de l'usuari. La conversió és senzilla: 768px ÷ 16px \= 48rem.

**7\. Menús i navegació**

Un menú accessible usa `<nav>` i `<ul>` com a base semàntica. 

Flexbox amb `gap` és la manera correcta d'espaiar els elements, perquè `gap` no afegeix espai a les vores (problema crònic dels marges manuals) i s'adapta automàticament quan `flex-direction` canvia de `row` a `column`.

**8\. Design Tokens i variables CSS**

Els design tokens són variables CSS amb nom significatiu que emmagatzemen decisions de disseny. En lloc de `#3B82F6` directament al codi, uses `var(--color-primary)`. Canvies el valor una vegada i s'actualitza a tot arreu.

S'organitzen en tres nivells: primitius (tots els valors possibles), semàntics (el propòsit de cada valor) i de component (específics d'un element). La nomenclatura ha de descriure el propòsit, no l'aparença: `--color-text-primary` és millor que `--color-gray-900`.

La funció `clamp(mínim, ideal, màxim)` combinada amb variables crea espaiat i tipografia fluid que s'adapta al viewport sense media queries.

**9\. Temes clar/fosc**

El sistema de temes es basa en redefinir els tokens semàntics a l'interior d'una media query `prefers-color-scheme: dark` o d'un atribut `data-theme`. Els tokens primitius no canvien mai: únicament canvien els valors que apunten a ells.

Regles per a colors accesibles en mode fosc: mai negre pur (`#000`) ni blanc pur (`#fff`) per evitar fatiga visual, text principal amb mínim 15:1 de contrast, i el color d'acció (normalment blau) ha de ser significativament més clar en fosc que en clar per mantenir el contrast mínim WCAG de 4.5:1.

La funció moderna `light-dark(clar, fosc)` simplifica la definició en una sola línia: `color: light-dark(#111827, #e5e5e5)`.

**10\. Accessibilitat: WCAG i ARIA**

Les WCAG estableixen tres nivells: A (mínim), AA (estàndard de la indústria, legalment defensable) i AAA (màxim, rarament assolible en tot un lloc). El target per a qualsevol projecte professional és el **Level AA**.

**HTML semàntic primer, ARIA com a complement.** La regla número 1 d'ARIA és que si existeix un element HTML natiu que fa el que necessites, l'has d'usar en lloc d'ARIA. `<button>` té focus, teclat i rol d'accessibilitat inclosos. Un `<div>` amb `role="button"` requereix que tu implementis tot això manualment.

Les tres coses que ARIA aporta: **roles** (el propòsit d'un element), **propietats** (informació adicional persistent com `aria-label`) i **estats** (informació dinàmica com `aria-expanded`).

Les live regions (`aria-live="polite"` o `role="alert"`) anuncien automàticament als lectors de pantalla quan el contingut canvia dinàmicament, com els missatges d'error o les notificacions.

**11\. Focus i navegació per teclat**

`:focus-visible` és la solució moderna: activa l'outline únicament quan l'usuari navega amb teclat, no en clics de ratolí. 

Mai eliminis `outline: none` sense proporcionar una alternativa: és una violació directa de WCAG 2.4.11.

Un focus accessible mínim:

:focus-visible {  
  outline: max(2px, 0.15em) solid var(--color-focus);  
  outline-offset: 3px;  
}

La gestió del focus en modals és crítica: quan s'obre un modal el focus ha d'entrar-hi, i quan es tanca ha de tornar a l'element que el va disparar.

**12\. Formularis accessibles**

Cada `<input>` necessita un `<label>` associat. Els grups de radio buttons i checkboxes necessiten `<fieldset>` \+ `<legend>`. 

Per a grups de camps de text, `role="group"` \+ `aria-labelledby` proporciona la semàntica equivalent.

La sintaxi Gherkin del tema anterior s'aplica aquí: cada estat del formulari (camp buit, error, èxit) és un escenari que cal provar i comunicar correctament tant visualment com programàticament.

**13\. Imatges accessibles**

Totes les imatges han de tenir l'atribut `alt`. Si la imatge és informativa, el `alt` descriu el contingut o la funció. Si és decorativa, `alt=""` (buit, sense espai) indica al lector de pantalla que la ignori. Sense `alt`, el lector llegirà el nom del fitxer.

Les imatges purament decoratives es poden col·locar via CSS (`background-image`) per eliminar-les completament de l'arbre d'accessibilitat.

**14\. Tipografia fluid i container queries**

La tipografia fluid amb `clamp()` i `vw` funciona bé per a títols principals però no per a components en columnes estretes.

La solució moderna usa la unitat `cqi` (1% de l'amplada del contenidor) combinada amb `container-type: inline-size` al contenidor pare.

.wrapper { container-type: inline-size; }  
h1 { font-size: clamp(1.5rem, 5cqi, 3rem); }

El resultat és tipografia que respon al seu contenidor específic, no al viewport global.

**15\. CSS Modern: propietats útils a saber**

`aspect-ratio` — proporcions sense el hack del padding. 

`object-fit: cover` — imatges responsives sense deformació. 

`margin-inline: auto` — centrar sense `width` explícita. 

`accent-color` — color de marca a checkboxes i radios sense hacks. 

`@property` — variables CSS amb tipus definit per poder-les animar. 

`@supports` — CSS condicional per a funcionalitats no suportades universalment. 

`:is()` — simplifica selectors complexos. 

`:has()` — selector que afecta el pare basant-se en el fill.

