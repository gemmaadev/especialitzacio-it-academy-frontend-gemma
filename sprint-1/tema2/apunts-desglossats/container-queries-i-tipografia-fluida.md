## **Container queries i tipografia fluida**

**Container Query Units and Fluid Typography**  
[https://moderncss.dev/container-query-units-and-fluid-typography/](https://moderncss.dev/container-query-units-and-fluid-typography/)  
Composicions més flexibles amb container queries i tipografia fluida.

**Tipografia fluida: el problema amb `vw`**

La tipografia fluida fa que la `font-size` s'adapti automàticament a l'espai disponible sense necessitat de múltiples media queries. El mètode tradicional usava la unitat `vw` (viewport width) dins de `clamp()`:

| .element {  font-size: clamp(1rem, 4vw \+ 1rem, 3rem);} |
| :---- |

Però la tipografia basada en viewport no funciona bé per a espais més estrets que flexionen independentment del viewport, com una graella de targetes. El problema és que la mida de la lletra respon a l'amplada del viewport complet, no al contenidor concret on viu l'element. Si tens un component que pot estar en una columna estreta o en una columna ampla, el `vw` no ho pot saber.

**Container Queries: respondre al contenidor, no al viewport**

Les container queries permeten definir regles per a elements que responen a l'espai disponible del seu contenidor ancestre. Això és diferent de les media queries, que només poden basar-se en el viewport. El benefici principal és crear regles de layout contextuals que s'adapten a l'espai realment disponible.

Per activar les container queries, el contenidor pare ha de declarar `container-type`:

| /\* Defineix el contenidor \*/.card-grid {  container-type: inline-size;  /\* "inline-size" \= l'eix horitzontal (per a l'escriptura occidental) \*/}/\* Estils que responen al contenidor \*/@container (inline-size \> 400px) {  .card {    display: flex;    flex-direction: row;  }} |
| :---- |

La raó d'usar "inline" en lloc de "width" ve del precedent establert per les propietats lògiques, que ajusten la seva orientació basant-se en el mode d'escriptura. "Inline" es refereix a la dimensió horitzontal per al mode d'escriptura actual.

**La unitat `cqi`: la clau de tot**

Officialment s'anomenen "container query length units". Igual que `1vw` equival a l'1% de l'amplada del viewport, `1cqi` equival a l'1% de la mida inline d'un contenidor. S'usa `cqi` per a tipografia fluida perquè volem que la mida estigui associada a l'eix horitzontal del mode d'escriptura.

Simplement substituint `vw` per `cqi`:

| /\* Contenidor pare \*/.wrapper {  container-type: inline-size;}/\* Tipografia que respon al contenidor, no al viewport \*/.element {  font-size: clamp(1rem, 4cqi, 3rem);  /\*           mínim  ideal  màxim \*/} |
| :---- |

Ara la tipografia s'adapta a l'amplada del contenidor. Si el mateix component és en una columna estreta o en una columna ampla, la lletra s'ajustarà de manera independent.

**Accessibilitat: zoom de text i `rem`**

Un tret interessant de canviar a `cqi` en lloc de `vw` és que per la seva pròpia naturalesa continuarà incrementant mentre la mida inline del contenidor augmenti durant el zoom. Sempre que `rem` s'usi com a unitat d'ancoratge per a la definició de `font-size`, els increments al 200% o més s'aconsegueixen de manera més consistent que amb els mètodes `vw`.

WCAG Success Criterion 1.4.4 (Resize Text) requereix que el text pugui arribar al 200% del seu tamany original. Els mètodes basats en viewport són propensos a restringir el creixement de la mida de la lletra. La inclusió d'un valor `rem` ajuda a prevenir problemes amb el redimensionament del text. Sense ell, el redimensionament basat en zoom amb `vw` sol fallar a l'intentar augmentar o es para fins a un valor de zoom molt alt.

**El sistema de "mixins" amb variables CSS**

L'objectiu és crear una regla genèrica que funcioni per a tots els nivells de títols, usant variables CSS com a paràmetres. Primer definim les mides base:

| /\* 1\. Tokens: les mides per a cada nivell \*/:root {  \--headline-1: 2.75rem;  \--headline-2: 2.35rem;  \--headline-3: 1.5rem;  \--headline-4: 1.15rem;}/\* 2\. Assignem la variable \--font-size a cada nivell \*/h1, .h1 {  \--font-size: var(--headline-1);  font-size: var(--headline-1);  /\* fallback sense container queries \*/}h2, .h2 {  \--font-size: var(--headline-2);  \--font-size-fluid: 4.5cqi;     /\* personalitzem la velocitat de canvi \*/  font-size: var(--headline-2);}h3, .h3 {  \--font-size: var(--headline-3);  \--font-size-fluid: 4.25cqi;  \--font-size-diff: 0.2;         /\* percentatge de reducció menor \*/  font-size: var(--headline-3);}h4, .h4 {  \--font-size: var(--headline-4);  \--font-size-fluid: 4cqi;  \--font-size-diff: 0.2;  font-size: var(--headline-4);} |
| :---- |

**El mixin: la regla universal de tipografia fluida**

Necessitem usar `@supports` per separar les mides fluides que usen container query units d'una mida de fallback. Si el navegador no entén la unitat container query, usarà el valor "initial" d'`1rem` en lloc del valor prèviament definit, eliminant tota la jerarquia tipogràfica de l'aplicació.

| /\* 3\. El mixin: s'aplica a tots els nivells via :is() \*/@supports (font-size: 1cqi) {  :is(h1, .h1, h2, .h2, h3, .h3, h4, .h4, .fluid-type) {    font-size: clamp(      /\* MÍNIM: màxim entre 1rem i (mida \- % de reducció) \*/      max(        1rem,        var(--font-size) \- var(--font-size) \* var(--font-size-diff, 0.3)      ),      /\* IDEAL: valor fluid en cqi \*/      var(--font-size-fluid, 5cqi),      /\* MÀXIM: la mida definida al token \*/      var(--font-size)    );    line-height: 1.1;    margin-block-end: 0.65em;  }} |
| :---- |

Desglossant la fórmula:

* **`max(1rem, var(--font-size) - var(--font-size) * 0.3)`** — el títol pot encongir-se un 30% del seu tamany màxim, però mai per sota d'`1rem`. `max()` garanteix el mínim absolut.  
* **`var(--font-size-fluid, 5cqi)`** — el valor ideal escala amb el contenidor. `5cqi` \= 5% de l'amplada del contenidor.  
* **`var(--font-size)`** — mai creixerà per sobre de la mida definida al token.

**Per a fallback entre navegadors**

Per alleujar els efectes del comportament de les propietats personalitzades, una opció alternativa seria definir el mixin usant `vw` i sobreescriure'l dins de `@supports`. No obtindràs resultats idèntics ja que el `font-size` serà relatiu al viewport en lloc dels contenidors individuals, però permet tenir alguna mesura de tipografia fluida.

| /\* Fallback per a navegadors sense container query units \*/:is(h1, .h1, h2, .h2, h3, .h3, h4, .h4, .fluid-type) {  font-size: clamp(    max(1rem, var(--font-size) \- var(--font-size) \* var(--font-size-diff, 0.3)),    var(--font-size-fluid-vw, 5vw),   /\* fallback amb vw \*/    var(--font-size)  );}/\* Override modern amb cqi quan és suportat \*/@supports (font-size: 1cqi) {  :is(h1, .h1, h2, .h2, h3, .h3, h4, .h4, .fluid-type) {    font-size: clamp(      max(1rem, var(--font-size) \- var(--font-size) \* var(--font-size-diff, 0.3)),      var(--font-size-fluid, 5cqi),      var(--font-size)    );  }} |
| :---- |

**Per a quina situació usar `cqi` vs. `vw`?**

| Situació | Unitat recomanada |
| ----- | ----- |
| Títols principals d'un article (sempre full-width) | `vw` és acceptable |
| Títols dins de targetes o components | `cqi` — respon al contenidor |
| Títols en sidebar estret | `cqi` — adapta al context |
| Tipografia de cos del text | `clamp()` amb `rem` i `cqi` |

**Resum** 

| /\* 1\. TOKENS: definir mides base \*/:root {  \--headline-1: 2.75rem;  \--headline-2: 2.35rem;  \--headline-3: 1.5rem;  \--headline-4: 1.15rem;}/\* 2\. CONTENIDOR: definir on s'apliquen les container queries \*/.wrapper, main, article, section {  container-type: inline-size;}/\* 3\. PER A CADA TÍTOL: assignar variables \*/h1 { \--font-size: var(--headline-1); font-size: var(--headline-1); }h2 { \--font-size: var(--headline-2); font-size: var(--headline-2); }h3 { \--font-size: var(--headline-3); font-size: var(--headline-3); }h4 { \--font-size: var(--headline-4); font-size: var(--headline-4); }/\* 4\. MIXIN: la regla universal fluid \*/@supports (font-size: 1cqi) {  :is(h1, h2, h3, h4, .fluid-type) {    font-size: clamp(      max(1rem, var(--font-size) \- var(--font-size) \* var(--font-size-diff, 0.3)),      var(--font-size-fluid, 5cqi),      var(--font-size)    );    line-height: 1.1;  }} |
| :---- |

