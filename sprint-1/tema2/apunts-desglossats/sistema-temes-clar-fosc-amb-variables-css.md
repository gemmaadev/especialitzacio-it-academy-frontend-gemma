## **Sistema de temes clar/fosc amb variables CSS i accessibilitat**

**Arquitectura del sistema: tokens semàntics per nivells**

La clau d'un sistema de temes ben fet és separar les decisions en dos nivells. Primer els **tokens primitius** (els valors en brut: tots els colors possibles), i després els **tokens semàntics** (el que significa cada color: fons, text, acció...). Quan canvies de tema, només canvien els tokens semàntics, i tot el codi que els usa s'actualitza automàticament.

El patró recomanat és: valors per defecte en `:root` per al tema clar, i `prefers-color-scheme: dark` per sobreescriure'ls al tema fosc. Els tokens semàntics (com `--text` o `--bg`) fan que el canvi de tema sigui automàtic a tot arreu.

**El sistema complet de tokens amb `prefers-color-scheme`**

| /\* \================================================   TOKENS PRIMITIUS: tots els valors possibles   No s'usen directament al codi de components   \================================================ \*/:root {  /\* Escala de blaus de marca \*/  \--blue-100: \#dbeafe;  \--blue-300: \#93c5fd;  \--blue-500: \#3b82f6;  \--blue-600: \#2563eb;  \--blue-700: \#1d4ed8;  \--blue-900: \#1e3a8a;  /\* Escala de grisos \*/  \--gray-50:  \#f9fafb;  \--gray-100: \#f3f4f6;  \--gray-200: \#e5e7eb;  \--gray-700: \#374151;  \--gray-800: \#1f2937;  \--gray-900: \#111827;  \--gray-950: \#030712;  /\* Colors d'estat \*/  \--green-500: \#22c55e;  \--red-500:   \#ef4444;  \--yellow-400: \#facc15;}/\* \================================================   TOKENS SEMÀNTICS: tema clar (per defecte)   Cada token descriu el SEU PROPÒSIT, no el seu color   \================================================ \*/:root {  /\* Fons \*/  \--color-bg-page:       var(--gray-50);  \--color-bg-surface:    \#ffffff;  \--color-bg-subtle:     var(--gray-100);  /\* Text \*/  \--color-text-primary:   var(--gray-900);   /\* 16.1:1 sobre blanc ✅ \*/  \--color-text-secondary: var(--gray-700);   /\* 10.7:1 sobre blanc ✅ \*/  \--color-text-disabled:  var(--gray-200);  /\* Acció (botons, links...) \*/  \--color-action-primary:       var(--blue-600);  /\* 4.5:1 sobre blanc ✅ WCAG AA \*/  \--color-action-primary-hover: var(--blue-700);  \--color-action-text:          \#ffffff;  /\* Borders \*/  \--color-border:        var(--gray-200);  \--color-border-strong: var(--gray-700);  /\* Focus: visible en TOTS els temes \*/  \--color-focus: var(--blue-600);  /\* Estat \*/  \--color-success: var(--green-500);  \--color-error:   var(--red-500);  \--color-warning: var(--yellow-400);  /\* Espaiat fluid \*/  \--gap-sm: clamp(0.5rem, 2vw, 1rem);  \--gap-md: clamp(1rem,   3vw, 2rem);  \--gap-lg: clamp(1.5rem, 5vw, 3rem);}/\* \================================================   TEMA FOSC: sobreescriu els tokens semàntics   Els tokens primitius no canvien mai   \================================================ \*/@media (prefers-color-scheme: dark) {  :root {    /\* Fons \*/    \--color-bg-page:    var(--gray-950);  /\* No pur negre: evita fatiga ocular \*/    \--color-bg-surface: var(--gray-900);    \--color-bg-subtle:  var(--gray-800);    /\* Text \*/    \--color-text-primary:   \#e5e5e5;     /\* 15.3:1 sobre \#0a0a0a ✅ \*/    \--color-text-secondary: var(--gray-200); /\* suficient contrast ✅ \*/    \--color-text-disabled:  var(--gray-700);    /\* Acció: el blau ha de ser més clar en fosc per mantenir contrast \*/    \--color-action-primary:       var(--blue-300);  /\* 7.2:1 sobre gris fosc ✅ \*/    \--color-action-primary-hover: var(--blue-100);    \--color-action-text:          var(--gray-900);    /\* Borders \*/    \--color-border:        var(--gray-700);    \--color-border-strong: var(--gray-200);    /\* Focus: ha de ser visible sobre fons fosc \*/    \--color-focus: var(--blue-300);  /\* Més clar per contrastar sobre fosc \*/  }} |
| :---- |

**`calc()` per ajustar luminositat: les limitacions reals**

`calc()` opera sobre números i unitats, però **no pot modificar directament components de color com la luminositat** en formats `hex` o `rgb`. Per ajustar luminositat dinàmicament en CSS pur, les opcions modernes són:

**Opció 1: `color-mix()` (suport modern)** — permet barrejar un color amb blanc o negre per aclarir o enfosquir:

| :root {  \--brand: \#3b82f6;  /\* Versió aclarida: barreja 30% de blanc \*/  \--brand-light: color-mix(in srgb, var(--brand) 70%, white);  /\* Versió enfosquida: barreja 30% de negre \*/  \--brand-dark: color-mix(in srgb, var(--brand) 70%, black);  /\* Per al hover: barreja amb negre per enfosquir lleugerament \*/  \--brand-hover: color-mix(in srgb, var(--brand) 85%, black);} |
| :---- |

**Opció 2: `calc()` amb colors HSL** — en format HSL, la luminositat és un número, i `calc()` sí que pot operar-hi:

| :root {  /\* Definim les components del color de marca separadament \*/  \--brand-h: 217;      /\* Hue: to de color \*/  \--brand-s: 91%;      /\* Saturation: saturació \*/  \--brand-l: 60%;      /\* Lightness: luminositat base \*/  /\* El color base \*/  \--brand: hsl(var(--brand-h), var(--brand-s), var(--brand-l));  /\* Variants calculades amb calc() sobre la luminositat \*/  \--brand-lighter: hsl(    var(--brand-h),    var(--brand-s),    calc(var(--brand-l) \+ 20%)   /\* \+20% luminositat \*/  );  \--brand-darker: hsl(    var(--brand-h),    var(--brand-s),    calc(var(--brand-l) \- 15%)   /\* \-15% luminositat \*/  );  \--brand-hover: hsl(    var(--brand-h),    var(--brand-s),    calc(var(--brand-l) \- 10%)  );}/\* En tema fosc: augmentem la luminositat per mantenir contrast \*/@media (prefers-color-scheme: dark) {  :root {    \--brand-l: 75%;  /\* Més lluminós en fosc per contrastar sobre fons fosc \*/    /\* \--brand, \--brand-lighter, \--brand-darker es recalculen automàticament \*/  }} |
| :---- |

**La funció `light-dark()`: la manera moderna**

La funció `light-dark()` accepta dos colors i retorna un color o una imatge basant-se en l'esquema de colors actiu, sense necessitat d'una media feature `prefers-color-scheme`. Per habilitar el suport de la funció `light-dark()`, `color-scheme` ha de tenir un valor de `light dark`, normalment establert a la pseudo-classe `:root`.

| :root {  color-scheme: light dark;  /\* Habilita light-dark() \*/}body {  /\* Definim els dos valors inline: clar primer, fosc segon \*/  background-color: light-dark(\#ffffff, \#0a0a0a);  color:            light-dark(\#111827, \#e5e5e5);}a {  /\* Link accessible en tots dos temes \*/  color: light-dark(\#2563eb, \#93c5fd);} |
| :---- |

**`:focus-visible`: focus accessible sense sacrificar l'estètica**

`:focus-visible` resol un problema clàssic de UX i accessibilitat: el focus outline era necessari per a la navegació per teclat, però molts dissenyadors el eliminaven perquè apareixia en tots els clics de ratolí (incloent els clics normals en botons), cosa que es considerava visualment molesta.

El toggle de dark mode ha de ser accessible per teclat i correctament etiquetat. Usa `:focus-visible` per a l'outline de focus.

`:focus-visible` és intel·ligent: s'activa **únicament** quan el navegador determina que l'usuari probablement s'ha mogut amb el teclat, no amb el ratolí. Concretament:

* ✅ S'activa quan l'usuari prem `Tab` per moure's entre elements  
* ✅ S'activa quan l'usuari usa les tecles de fletxa en un menú  
* ✅ S'activa quan l'element rep focus programàticament  
* ❌ No s'activa en clics normals de ratolí

| /\* \================================================   SISTEMA DE FOCUS ACCESSIBLE   \================================================ \*//\* 1\. Mai eliminis el focus sense substituir-lo \*//\* outline: none; → ❌ SEMPRE és una violació WCAG \*//\* 2\. Elimina l'outline molest per a interaccions de ratolí \*/:focus:not(:focus-visible) {  outline: none;}/\* 3\. Focus visible i d'alt contrast per a navegació per teclat \*/:focus-visible {  /\* outline-width usa max() per garantir mínim 2px sempre \*/  outline: max(2px, 0.15em) solid var(--color-focus);  outline-offset: 3px;  /\* Border-radius per als botons rodons \*/  border-radius: inherit;}/\* 4\. Botons: afegim box-shadow per a més visibilitat \*/button:focus-visible {  outline: 2px solid var(--color-focus);  outline-offset: 2px;  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-focus) 30%, transparent);}/\* 5\. Links: outline sense outline per als que ja tenen subratllat \*/a:focus-visible {  outline: 2px solid var(--color-focus);  outline-offset: 2px;  border-radius: 2px;}/\* 6\. El botó de canvi de tema ha de tenir focus molt visible \*/\#theme-toggle:focus-visible {  outline: 3px solid var(--color-focus);  outline-offset: 4px;} |
| :---- |

---

## **El fragment complet: toggle de tema accessible**

| \<button  id="theme-toggle"  aria-label="Canviar a tema fosc"  aria-pressed="false"\>  \<span aria-hidden="true"\>🌙\</span\>\</button\> |
| :---- |

| /\* Variables del sistema \*/:root {  color-scheme: light dark;  \--color-bg-page:    light-dark(\#f9fafb, \#030712);  \--color-bg-surface: light-dark(\#ffffff, \#111827);  \--color-text:       light-dark(\#111827, \#e5e5e5);  \--color-action:     light-dark(\#2563eb, \#93c5fd);  \--color-focus:      light-dark(\#2563eb, \#93c5fd);  \--color-border:     light-dark(\#e5e7eb, \#374151);}/\* Aplicació global \*/body {  background-color: var(--color-bg-page);  color: var(--color-text);  /\* Transició suau, respectant prefers-reduced-motion \*/  transition: background-color 0.2s, color 0.2s;}@media (prefers-reduced-motion: reduce) {  body { transition: none; }}/\* Focus accessible \*/:focus:not(:focus-visible) { outline: none; }:focus-visible {  outline: max(2px, 0.15em) solid var(--color-focus);  outline-offset: 3px;}/\* Tema fosc manual via data-theme \*/\[data-theme="dark"\] {  \--color-bg-page:    \#030712;  \--color-bg-surface: \#111827;  \--color-text:       \#e5e5e5;  \--color-action:     \#93c5fd;  \--color-focus:      \#93c5fd;  \--color-border:     \#374151;}// Toggle accessible: respecta sistema, permet override manualconst toggle \= document.getElementById('theme-toggle');const html \= document.documentElement;// Llegeix preferència guardada o sistemaconst saved \= localStorage.getItem('theme');const prefersDark \= window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark \= saved ? saved \=== 'dark' : prefersDark;function applyTheme(dark) {  html.setAttribute('data-theme', dark ? 'dark' : 'light');  toggle.setAttribute('aria-label', \`Canviar a tema ${dark ? 'clar' : 'fosc'}\`);  toggle.setAttribute('aria-pressed', dark ? 'true' : 'false');}applyTheme(isDark);toggle.addEventListener('click', () \=\> {  const current \= html.getAttribute('data-theme') \=== 'dark';  const next \= \!current;  localStorage.setItem('theme', next ? 'dark' : 'light');  applyTheme(next);}); |
| :---- |

**Taula de resum** 

| Regla | Per quèimporta |
| ----- | ----- |
| Mai negre pur (`#000000`) en fosc ni blanc pur en clar | Pot causar fatiga visual i migranya |
| Text principal mínim 4.5:1 de contrast | WCAG AA obligatori |
| El color d'acció ha de canviar entre temes | El blau `#2563eb` té contrast en clar però no en fosc |
| `--color-focus` sempre visible en tots dos temes | Focus invisible \= teclat inutilitzable |
| Mai `outline: none` global | Violació directa de WCAG 2.4.11 |
| `:focus-visible` en lloc de `:focus` | Elimina el focus molest del ratolí sense trencar accessibilitat |
| `prefers-reduced-motion` per a les transicions | Les animacions de tema poden causar mareig |
| `data-theme` per al toggle manual | L'usuari pot tenir preferència diferent al sistema |

