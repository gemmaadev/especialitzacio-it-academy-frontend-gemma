## **Design Tokens: les variables del sistema de disseny**

**Què és un Design Token?**

Els design tokens són els elements més petits i indivisibles d'un sistema de disseny, que representen decisions de disseny individuals com a dades. Funcionen com entitats amb nom que emmagatzemen atributs visuals específics com colors, tipografia (incloent famílies de fonts, mides i pesos), unitats d'espaiat, radis de vora, amplades de traç, i molt més. Pensa en ells com un glossari per a l'estil visual d'un sistema de disseny.

En paraules molt senzilles: un design token és una variable amb un nom significatiu que emmagatzema un valor de disseny. En lloc d'escriure `#3B82F6` directament al CSS, escrius `var(--color-primary)`. En lloc de `16px`, escrius `var(--spacing-md)`. El nom és significatiu i compartit entre dissenyadors i developers.

En lloc que els dissenyadors especifiquin valors concrets (per exemple, el codi hexadecimal `#6c0c00`) i els developers els hard-codegin, tots dos fan referència a un nom de token significatiu (per exemple, `color-text-error`). Aquest token es resol al valor apropiat per a la plataforma objectiu.

**El problema que resolen: els "valors màgics"**

Els design tokens contrasten directament amb els "valors màgics". Un valor màgic fa referència a qualsevol valor arbitrari usat en el disseny, sovint per estètica, sense cap consideració cap al llenguatge de disseny més ampli de l'empresa.

Sense tokens, el codi pot quedar ple de valors màgics com `padding: 13px`, `color: #2d7bf4`, `font-size: 14px` dispersos arreu de desenes de fitxers. Si en algun moment cal canviar el color blau principal de la marca, hauràs de buscar i substituir manualment cada instància. Amb tokens, canvies el valor una sola vegada i el canvi es propaga a tot el projecte automàticament.

**Els tres nivells de tokens**

Els design tokens s'organitzen en tres nivells: tokens primitius (valors crus), tokens semàntics (referències específiques d'ús) i tokens de component (personalització per component per a tematització).

**Tokens primitius (o globals)** — els valors bruts del sistema. Defineixen totes les opcions possibles, però no indiquen on s'han d'usar:

![](imatges/tokens-primitius.png)

**Tokens semàntics** — donen context d'ús. Referencien els tokens primitius però amb noms que indiquen la seva funció:

![](imatges/tokens-semantics.png)

**Tokens de component** — específics d'un component concret:

![](imatges/tokens-component.png)

**Tokens de color**

El color és la manera més ràpida amb la qual el cervell processa la identitat de marca. Cada color ha de tenir valors definits per a digital (hex, RGB) i impressió (CMYK, Pantone). No deixar-ho a la interpretació.

Un sistema de colors ben estructurat amb tokens:

![](imatges/tokens-color.png)

La clau és nomenar els tokens semàntics per **propòsit** (per exemple, `color-text-primary`) i no per **aparença** (per exemple, `color-gray-900`). Si canvies el color del text de gris a negre, el nom `color-text-primary` segueix sent vàlid, però `color-gray-900` deixa de tenir sentit.

**Tokens de tipografia**

Els tokens de tipografia especifiquen propietats relacionades amb el text. Inclouen famílies de fonts, mides de font, alçades de línia, espaiat entre lletres i pesos de font.

![](imatges/tokens-tipografia.png)

**Tokens d'espaiat**

Els tokens primitius d'espaiat inclouen tots els valors de padding, margin i spacing entre elements. En lloc d'usar valors arbitraris, s'usa una escala predefinida que garanteix coherència visual.

La majoria de sistemes d'espaiat usen una base de **8px** (o 4px per als valors més petits). Tota la resta de valors són múltiples d'aquesta base:

![](imatges/tokens-espaiat.png)

**Altres tipus de tokens**

A més de colors, tipografia i espaiat, els tokens poden cobrir: border radius (arrodoniment de cantonades), shadows (ombres), breakpoints (punts de trencament per al disseny responsiu), durades (timing d'animacions i transicions) i opacity.

![](imatges/altres-tipus-tokens.png)

**Com s'implementen al codi**

Els design tokens són independents de plataforma. Típicament es defineixen i emmagatzemen en formats neutres i llegibles per màquines com JSON, i es transformen per aplicar-se de manera consistent a diverses plataformes, incloent web (CSS, Sass, JS), mòbil natiu (iOS, Android), i potencialment d'altres.

Per al web, la manera més habitual és crear un fitxer `tokens.css` o `variables.css` a l'arrel del projecte:

![](imatges/com-s-implementa-al-codi.png)

I importar-lo al fitxer principal:

![](imatges/impotar-al-fitxer-principal.png)

**Design Tokens i tematització (Dark Mode)**

Canviar només el valor del token del tema cascada a través de tot el sistema, afectant tots els elements que el referencien directament o indirectament. Per exemple, per crear un tema fosc, només caldria canviar el token `theme.bg.surface` a un valor fosc de referència com "colors.black", i totes les superfícies i targetes s'actualitzarien automàticament.

![](imatges/design-tokens-i-tematitzacio.png)

**Resum**

| Sense tokens | Amb tokens |
| ----- | ----- |
| Valors màgics dispersos pel codi | Una sola font de veritat |
| Canviar el color \= buscar i substituir manualment | Canviar el valor del token \= actualització global |
| Designers i developers parlen idiomes diferents | Vocabulari compartit |
| Difícil de mantenir i escalar | Fàcil d'actualitzar i tematitzar |
| Impossible de fer dark mode sense molt esforç | Dark mode amb dues línies de CSS |










