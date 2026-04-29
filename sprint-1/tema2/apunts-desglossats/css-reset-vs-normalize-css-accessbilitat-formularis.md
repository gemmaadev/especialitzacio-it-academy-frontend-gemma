## **CSS Reset vs. Normalize.css: Impacte en l'Accessibilitat dels Formularis**

**El punt de partida: els formularis i els estils del navegador**

Els formularis són el cas on la diferència entre Reset i Normalize és més visible i on l'impacte en l'accessibilitat és més crític. Quan un navegador renderitza un `<input>`, un `<button>` o un `<select>`, aplica estils molt específics del sistema operatiu que garanteixen que l'element és recogneixible i accessible per defecte: mida mínima tàctil, focus visible, contrast integrat.

Els controls de formulari històricament resistien l'herència CSS. La font dels inputs i el line-height diferien entre motors i temes del sistema operatiu, motiu pel qual encara veus regles d'herència explícites en els baselines moderns. Normalize.css va guanyar en molts equips perquè pretenia preservar els defaults útils en lloc d'esborrar-ho tot.

**CSS Reset i els formularis: la pissarra en blanc pot ser perillosa**

Un CSS Reset agressiu esborrarà la majoria dels estils de formulari. El problema és que molts d'aquests estils no són merament estètics: comuniquen estat i accessibilitat.

| /\* ❌ Reset agressiu: efectes en formularis \*/\* {  all: unset;  /\* elimina padding, border, cursor, focus styles \*/}/\* El resultat: \*//\* \- Els botons perden el cursor pointer \*//\* \- Els inputs perden el border visible \*//\* \- El focus outline desapareix completament \*//\* \- Els checkboxes i radios perden l'aparença de control \*/ |
| :---- |

Un error arrel comú és usar `all: unset` en un botó, eliminant padding, border, cursor i focus styles. La solució és substituir-lo per regles específiques: definir background, border, padding i `cursor: pointer`, i mantenir el focus visible. No uses `all: unset` per a controls interactius tret que reimplementis l'accessibilitat deliberadament.

El perill més gran és el **focus outline**. Una violació massa comú és eliminar els outlines de `:focus` en links, botons i altres controls interactius. Sense proporcionar un estil `:focus` alternatiu, és immediatament una violació del WCAG Success Criterion 2.4.11: Focus Appearance.

| /\* ❌ MAI facis això \*/\* {  outline: none;  /\* elimina tota visibilitat del focus per teclat \*/} |
| :---- |

**Normalize.css i els formularis: correccions sense destrucció**

Normalize.css fa el contrari: corregeix les inconsistències sense eliminar els estils útils. Per als formularis específicament:

| /\* El que fa Normalize.css per als formularis \*//\* Herència de tipografia: un bug comú en tots els navegadors \*/button,input,optgroup,select,textarea {  font-family: inherit;  font-size: 100%;  line-height: 1.15;}/\* Elimina el margin en Firefox \*/button,select {  text-transform: none;}/\* Correccions de cursor \*/button,\[type="button"\],\[type="reset"\],\[type="submit"\] {  \-webkit-appearance: button;  cursor: pointer;} |
| :---- |

El resultat: els controls segueixen sent recogneixibles com a controls, hereten la tipografia del document, i el focus segueix sent visible.

**WCAG 2.1: els requisits de contrast que cal respectar**

WCAG 2.1 defineix els requisits de contrast sota els Success Criteria 1.4.3 (Level AA) i 1.4.6 (Level AAA). La mètrica clau és la ràtio de contrast: la relació matemàtica entre la lluminositat relativa de dos colors.

Els valors concrets:

| Tipus de text | WCAG AA (mínim) | WCAG AAA (recomanat) |
| ----- | ----- | ----- |
| Text normal | 4.5:1 | 7:1 |
| Text gran (+18pt o \+14pt bold) | 3:1 | 4.5:1 |
| Components UI (borders d'inputs, focus) | 3:1 | — |

Si uses els estils per defecte proporcionats pel navegador, llavors aquests requisits de contrast no s'apliquen. A causa del baix contrast per defecte, es recomana usar CSS per incrementar el contrast en text boxes i altres inputs de formulari.

Això significa que si uses un CSS Reset que elimina els estils del navegador, **ara ets responsable** de garantir que els teus estils compleixin els ràtios de WCAG. Normalize.css deixa els estils del navegador intactes on funcionen bé, de manera que és més fàcil mantenir el compliment.

**`accent-color`: la propietat moderna que substitueix els hacks**

Fins fa poc, estilitzar checkboxes i radio buttons requeria hacks complexos: amagar l'input natiu i crear un element visual fals amb CSS i ARIA. Ara, `accent-color` ho fa amb una sola línia:

| /\* ✅ Abans: hack complex per estilitzar un checkbox \*/input\[type="checkbox"\] {  appearance: none;  width: 20px;  height: 20px;  border: 2px solid \#3B82F6;  border-radius: 4px;  position: relative;}input\[type="checkbox"\]:checked::after {  content: "✓";  position: absolute;  /\* ...més codi... \*/}/\* ✅ Ara: una sola propietat \*/input\[type="checkbox"\] {  accent-color: \#3B82F6;} |
| :---- |

`accent-color` aplica el color de marca als controls del formulari que el navegador ja sap com renderitzar accessiblement: checkboxes, radio buttons, barres de progrés (`<progress>`) i sliders (`<input type="range">`). El navegador garanteix automàticament que el color del checkmark o la marca de selecció té contrast suficient sobre el color d'accent.

La propietat `accent-color-contrast` permet als developers ajustar dinàmicament els colors d'accent per millorar el contrast visual. Amb `accent-color-contrast`, els developers poden assegurar que el color d'accent aplicat automàticament té suficient contrast contra el seu fons, baixant la barrera d'entrada per al compliment d'accessibilitat.

**`:focus-visible`: el focus accessible sense sacrificar l'estètica**

L'altra propietat moderna essencial per a l'accessibilitat dels formularis és `:focus-visible`. Resol el problema clàssic: el focus outline molestava en els clics amb ratolí però era essencial per a la navegació per teclat.

| /\* ✅ Enfocament modern: focus visible per a teclat \*//\* Elimina el focus per a interaccions de ratolí \*/:focus:not(:focus-visible) {  outline: none;}/\* Focus visible i accessible per a teclat \*/:focus-visible {  outline: 3px solid var(--color-primary);  outline-offset: 3px;  /\* max() garanteix que el outline mai sigui menor d'1px \*/  outline-width: max(3px, 0.15em);} |
| :---- |

L'error arrel d'eliminació del focus global o de focus styles de baix contrast es soluciona eliminant `outline: none` globalment i usant `:focus-visible` amb un outline d'alt contrast. Testeja únicament amb teclat (Tab/Shift+Tab) en cada ruta important.

**El reset modern recomanat: híbrid accessible**

La solució actual de la indústria és un reset mínim que no toca els estils d'accessibilitat i aplica `accent-color` i `:focus-visible`:

| /\* ✅ Reset modern i accessible \*/\*, \*::before, \*::after {  box-sizing: border-box;  margin: 0;  padding: 0;}/\* Herència de tipografia als controls (com Normalize) \*/input, button, textarea, select {  font: inherit;}/\* Imatges responsives \*/img, picture, video, canvas, svg {  display: block;  max-width: 100%;}/\* Line-height accessible (WCAG recomana mínim 1.5) \*/body {  line-height: 1.5;  \-webkit-font-smoothing: antialiased;}/\* ✅ Accent color de marca \*/:root {  accent-color: \#3B82F6;}/\* ✅ Focus accessible per a navegació per teclat \*/:focus-visible {  outline: 3px solid currentColor;  outline-offset: 3px;}/\* ✅ MAI eliminar el focus sense substituir-lo \*//\* outline: none; → ❌ \*/ |
| :---- |

**Comparativa final: impacte en accessibilitat**

| Aspecte | CSS Reset agressiu | Normalize.css | Reset Modern |
| ----- | ----- | ----- | ----- |
| Focus outline | ❌ Eliminat | ✅ Conservat | ✅ Millorat amb `:focus-visible` |
| Herència tipogràfica als inputs | ❌ No | ✅ Sí | ✅ Sí (`font: inherit`) |
| Estils visuals dels controls | ❌ Eliminats | ✅ Conservats | ✅ Millorats amb `accent-color` |
| Cursor pointer als botons | ❌ Eliminat | ✅ Conservat | ✅ Conservat |
| Responsabilitat WCAG | Alta: has de reconstruir-ho tot | Baixa: el navegador ja compleix | Mitjana: has de definir accent i focus |
| Dark mode / High Contrast | ❌ Pot trencar-se | ✅ Respecta les preferències del sistema | ✅ `accent-color` s'adapta automàticament |

