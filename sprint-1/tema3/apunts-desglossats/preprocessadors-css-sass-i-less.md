## **Preprocessadors CSS: SASS i LESS**

**SASS Guidelines**   
[https://sass-guidelin.es/](https://sass-guidelin.es/)   
Guia de bones pràctiques per treballar amb SASS.

**Per què existeixen els preprocessadors?**

CSS, com tots sabem, no és el millor llenguatge del món. Tot i ser molt senzill d'aprendre, pot tornar-se força desordenat, especialment en projectes grans. És aquí on entra Sass, com a meta-llenguatge, per millorar la sintaxi del CSS proporcionant funcionalitats extra i eines útils. L'objectiu de Sass no és convertir el CSS en un llenguatge de programació complet; Sass únicament vol ajudar allà on el CSS falla.

El CSS pur és estàtic i repetitiu: no té variables (fins als Custom Properties), no permet reutilitzar blocs de codi, no permet anidament de selectors i no té manera de dividir els estils en fitxers modulars de manera nativa. Els preprocessadors resolen tots aquests problemes.

**SASS vs. SCSS vs. LESS: la confusió dels noms**

Hi ha força confusió respecte a la semàntica del nom Sass. Sass descriu tant el preprocessador com la seva pròpia sintaxi. Sass inicialment descrivia una sintaxi basada en la indentació. Aviat, els mantenedors de Sass van decidir tancar la bretxa entre Sass i CSS proporcionant una sintaxi compatible amb CSS anomenada SCSS (Sassy CSS). El lema és: si és CSS vàlid, és SCSS vàlid.

| /\* SCSS: sintaxi familiar, la més usada \*/.container {  max-width: 1200px;  margin: 0 auto;  .header {    font-size: 2rem;  }}/\* Sass (indented): sense claus ni punt i coma \*/.container  max-width: 1200px  margin: 0 auto  .header    font-size: 2rem |
| :---- |

**LESS** és el principal competidor de SASS, basat en Node.js. Era molt popular gràcies a Bootstrap (fins a la versió 4), però avui SCSS és l'opció dominant a la indústria.

**Les funcionalitats principals de SASS**

### **Variables**

Abans de les CSS Custom Properties, SASS va introduir les variables per primera vegada. Ara que existeix `var()` en CSS pur, les variables SASS segueixen sent útils en combinació:

| // Variables SASS: s'avaluen en temps de compilació$color-primary: \#3B82F6;$spacing-md: 1rem;$font-heading: 'Inter', sans-serif;.button {  background-color: $color-primary;  padding: $spacing-md;  font-family: $font-heading;}// Resultat compilat a CSS:// .button { background-color: \#3B82F6; padding: 1rem; ... } |
| :---- |

La diferència clau amb les CSS Custom Properties: les variables SASS desapareixen en la compilació (no existeixen al CSS final), mentre que `var()` existeix en temps d'execució i es pot canviar amb JavaScript.

**Anidament (Nesting)**

Permet reflectir la jerarquia HTML directament al CSS, eliminant la repetició de selectors:

| /\* ✅ SCSS: estructura clara i llegible \*/.nav {  display: flex;  gap: 1rem;  &\_\_item {         /\* & representa el selector pare: .nav\_\_item \*/    list-style: none;  }  &\_\_link {    color: $color-primary;    text-decoration: none;    &:hover {        /\* .nav\_\_link:hover \*/      text-decoration: underline;    }    &--active {      /\* .nav\_\_link--active \*/      font-weight: bold;    }  }}/\* CSS compilat equivalent: \*//\* .nav { display: flex; gap: 1rem; } \*//\* .nav\_\_item { list-style: none; } \*//\* .nav\_\_link { color: \#3B82F6; text-decoration: none; } \*//\* .nav\_\_link:hover { text-decoration: underline; } \*//\* .nav\_\_link--active { font-weight: bold; } \*/ |
| :---- |

⚠️ El principi clau és mantenir Sass tan simple com es pugui. El KISS (Keep It Simple Stupid) és fonamental aquí. No cal construir sistemes pesats i innecessàriament complexos que siguin completament impossibles de mantenir. Evita anidaments de més de 3 nivells perquè generen selectors molt específics i difícils de sobreescriure.

**Mixins**

Els mixins permeten definir blocs de CSS reutilitzables amb possibles paràmetres, equivalents a funcions:

| // Definició del mixin@mixin flex-center {  display: flex;  justify-content: center;  align-items: center;}@mixin responsive-text($min, $max) {  font-size: clamp($min, 3vw, $max);}@mixin focus-ring($color: \#3B82F6) {  &:focus-visible {    outline: 2px solid $color;    outline-offset: 3px;  }}// Ús.hero {  @include flex-center;  min-height: 100vh;}h1 {  @include responsive-text(1.5rem, 3rem);}.button {  @include focus-ring(\#10B981);} |
| :---- |

**Funcions i operacions**

SASS permet fer càlculs i definir funcions personalitzades:

| // Funció per convertir px a rem@function rem($px) {  @return \#{$px / 16}rem;}// Funció per a colors@function lighten-color($color, $amount) {  @return mix(white, $color, $amount);}.container {  max-width: rem(1200);    // → 75rem  padding: rem(16);        // → 1rem}.button-hover {  background: lighten-color(\#3B82F6, 20%);} |
| :---- |

**Parcials i `@use` / `@import`: organització modular**

Una de les funcionalitats més potents: dividir els estils en fitxers modulars i importar-los:

| scss/├── abstracts/│   ├── \_variables.scss     \# variables globals│   ├── \_mixins.scss        \# mixins reutilitzables│   └── \_functions.scss     \# funcions personalitzades├── base/│   ├── \_reset.scss         \# CSS reset│   └── \_typography.scss    \# estils de tipografia├── components/│   ├── \_button.scss│   ├── \_card.scss│   └── \_nav.scss├── layout/│   ├── \_header.scss│   └── \_footer.scss└── main.scss               \# fitxer d'entrada que importa tot |
| :---- |

| // main.scss@use 'abstracts/variables';@use 'abstracts/mixins';@use 'base/reset';@use 'base/typography';@use 'components/button';@use 'components/card';@use 'layout/header'; |
| :---- |

Els fitxers que comencen amb `_` (parcials) no es compilen per si sols: únicament s'inclouen quan un altre fitxer els importa.

**`@extend`: heretar estils**

`@extend` permet que un selector hereti tots els estils d'un altre:

| %button\-base {  padding: 0.5rem 1.5rem;  border-radius: 6px;  border: none;  cursor: pointer;  font-weight: 600;}.button-primary {  @extend %button-base;  background: \#3B82F6;  color: white;}.button-secondary {  @extend %button-base;  background: transparent;  border: 2px solid \#3B82F6;} |
| :---- |

⚠️ El `%` (placeholder selector) s'usa amb `@extend` per definir estils que no es compilen per si sols. Usa `@extend` amb moderació: pot generar selectrors complexos inesperats.

**SASS vs. CSS Variables modernes: quan usar cada un**

Avui dia, amb CSS Custom Properties (`var()`), container queries i `clamp()`, molts dels problemes que SASS resolia es poden resoldre en CSS pur. La pregunta és quan val la pena afegir la complexitat d'un preprocessador.

LESS, basat en Node.js, ha obtingut força popularitat gràcies a que el famós framework Bootstrap l'usava. Hi ha també Stylus, molt permissiu i flexible però lleugerament més difícil d'usar i amb una comunitat més petita.

| Funcionalitat | CSS Modern | SASS |
| ----- | ----- | ----- |
| Variables | `var(--color)` ✅ (runtime) | `$color` (compilació) |
| Anidament | ✅ (CSS Nesting) | ✅ (més suport) |
| Mixins | ❌ | ✅ |
| Funcions personalitzades | Limitades | ✅ |
| Organització en fitxers | ❌ | ✅ |
| Lògica (if/for/each) | ❌ | ✅ |
| Operacions matemàtiques | `calc()` (limitada) | ✅ completes |

**Bones pràctiques de SASS (basades en SASS Guidelines)**

El principi clau és mantenir Sass tan simple com es pugui. Sass hauria d'ajudar a on el CSS falla, no convertir-se en un sistema complex i difícil de mantenir. De vegades és millor repetir una mica per mantenir el codi mantenible, en lloc de construir un sistema pesat, innecessàriament complicat i impossible de mantenir perquè és excessivament complex. El pragmatisme supera la perfecció.

Les bones pràctiques principals:

* Indentació de 2 espais, línies de màxim 80 caràcters  
* Strings sempre entre cometes simples: `'valor'`  
* Variables amb noms semàntics, no per aparença  
* No anidament de més de 3 nivells  
* Mixins per a blocs reutilitzables amb paràmetres  
* Usa `@use` en lloc de l'antic `@import` (deprecated)  
* Organitza en la carpeta `abstracts/`, `base/`, `components/`, `layout/`

