## **CSS-in-JS: Styled Components i Emotion**

**Què és CSS-in-JS?**

CSS-in-JS és un enfocament de styling on escrius els estils directament dins dels fitxers JavaScript, co-localitzats amb els components que estilitzen. En lloc de tenir un fitxer `Button.css` separat, el component `Button.jsx` conté tant la lògica com els estils.

CSS-in-JS permet co-localitzar els estils amb els components, reduint la filtració de CSS global i assegurant que els estils estan fortament acoblats amb la lògica que condueix el component. Els estils s'escopegen automàticament al component, eliminant el risc de conflictes de CSS globals.

El problema que resol és real: en aplicacions grans amb molts fitxers CSS, és difícil saber quin CSS afecta quin component, els noms de classes xoquen entre ells, i eliminar CSS mort és quasi impossible. CSS-in-JS elimina aquests problemes generant noms de classes únics automàticament.

**Styled Components: el clàssic**

Styled Components és la biblioteca CSS-in-JS més coneguda. La idea és crear **components React nous** que porten els seus estils integrats:

| import styled from 'styled-components';// Crees un component nou que ja porta els estilsconst Button \= styled.button\`  background-color: ${props \=\> props.primary ? '\#3B82F6' : 'white'};  color: ${props \=\> props.primary ? 'white' : '\#3B82F6'};  padding: 0.5rem 1.5rem;  border-radius: 6px;  border: 2px solid \#3B82F6;  cursor: pointer;  &:hover {    background-color: \#2563EB;    color: white;  }  @media (max-width: 768px) {    width: 100%;  }\`;// Ús: com qualsevol component Reactfunction App() {  return (    \<\>      \<Button\>Secundari\</Button\>      \<Button primary\>Primari\</Button\>    \</\>  );} |
| :---- |

El major avantatge de styled-components és que pots estilitzar qualsevol component usant aquesta biblioteca sempre que accepti una prop `className`. La integració amb el sistema de props de React permet l'estilització dinàmica basada en props del component, la qual cosa millora l'experiència del developer.

**Tematització amb ThemeProvider:**

| import { ThemeProvider } from 'styled-components';const theme \= {  colors: {    primary: '\#3B82F6',    secondary: '\#10B981',    text: '\#111827',  },  spacing: {    sm: '0.5rem',    md: '1rem',    lg: '2rem',  }};// Tots els components fills accedeixen al tema via propsconst Title \= styled.h1\`  color: ${props \=\> props.theme.colors.primary};  margin-bottom: ${props \=\> props.theme.spacing.md};\`;function App() {  return (    \<ThemeProvider theme={theme}\>      \<Title\>Títol accessible al tema\</Title\>    \</ThemeProvider\>  );} |
| :---- |

**Emotion: la alternativa flexible**

Emotion és una biblioteca CSS-in-JS performant i flexible. Permet estilitzar aplicacions ràpidament amb estils en format string o objecte. Té una composició predictible per evitar problemes d'especificitat CSS. Amb source maps i etiquetes, Emotion té una gran experiència de developer i un gran rendiment amb emmagatzematge en caché intensiu en producció.

Emotion ofereix **dues APIs** principals:

**`styled` API** — idèntica a Styled Components:

| import styled from '@emotion/styled';const Card \= styled.div\`  border-radius: 8px;  padding: 1.5rem;  box-shadow: 0 4px 6px rgba(0,0,0,0.1);  background: white;\`; |
| :---- |

**`css` prop** — la manera única d'Emotion: aplica estils directament sobre elements existents:

| import { css } from '@emotion/react';// Estils com a template literalconst buttonStyles \= css\`  background: \#3B82F6;  color: white;  padding: 0.5rem 1rem;\`;// Estils com a objecte (més afí a JavaScript)const cardStyles \= css({  borderRadius: '8px',  padding: '1.5rem',  backgroundColor: 'white',});function Component() {  return (    \<\>      \<button css={buttonStyles}\>Clic\</button\>      \<div css={cardStyles}\>Targeta\</div\>    \</\>  );} |
| :---- |

El major avantatge d'Emotion és el seu fàcil maneig dels estils d'objecte per escriure CSS. A diferència de Styled Components, on el developer ha de crear noms únics per a components diferents, les tasques de naming a Emotion són molt més simples, ja que depenen de l'aplicació de la prop CSS.

**Styled Components vs. Emotion: les diferències reals**

La mida del bundle és una consideració important. Aquí, Emotion té un lleuger avantatge, amb una mida de biblioteca core més petita. Quant al rendiment, tots dos han estat optimitzats al màxim, i en la majoria d'escenaris del món real seria difícil notar una diferència. La comunitat i l'ecosistema d'ambdues biblioteques és gran, activa i amb molts plugins i eines.

|  | Styled Components | Emotion |
| ----- | ----- | ----- |
| **API principal** | `styled.element` | `styled` \+ `css` prop |
| **Sintaxi d'estils** | Template literals | Template literals \+ objectes |
| **Mida bundle** | Lleugerament més gran | Més petit |
| **Rendiment** | Molt bo | Lleugerament millor |
| **Tematització** | ThemeProvider | ThemeProvider |
| **SSR** | Sí (ServerStyleSheet) | Sí (zero configuració) |
| **Corba d'aprenentatge** | Baixa | Mitjana (dues APIs) |
| **Flexibilitat** | Alta | Molt alta |
| **Framework** | React principalment | React \+ agnòstic |

**Avantatges del CSS-in-JS en general**

**Encapsulació real** — els estils s'escopegen automàticament al component, eliminant el risc de conflictes de CSS globals. Això és especialment útil en aplicacions grans on molts developers treballen simultàniament.

**Estils dinàmics basats en props** — Pots canviar qualsevol propietat CSS basant-te en l'estat del component sense classes condicionals:

| // Adaptar el color basant-se en una propconst Alert \= styled.div\`  background: ${props \=\> ({    error: '\#FEE2E2',    warning: '\#FEF3C7',    success: '\#D1FAE5',  })\[props.type\]};\`; |
| :---- |

**Eliminació automàtica de CSS mort** — Quan elimines un component, els seus estils desapareixen automàticament. Cap fitxer CSS orfe.

**Co-localització** — L'estil viu al mateix lloc que el component. Molt més fàcil de mantenir i entendre en projectes grans.

**Desavantatges del CSS-in-JS**

**Rendiment en runtime** — En aplicacions grans, és important ser conscient dels costos potencials de rendiment amb la generació de CSS en runtime. En la majoria dels casos, CSS-in-JS proporcionarà una experiència de developer racionalitzada i una codebase mantenible. El CSS es genera a JavaScript i s'injecta al DOM, cosa que afegeix treball al navegador.

**Incompatibilitat amb Server Components de React** — Tant Styled Components com Emotion generen CSS en el client (runtime). Això és incompatible amb els React Server Components (RSC) de Next.js 13+, que s'executen al servidor on no hi ha accés al DOM. Per a projectes Next.js moderns, Tailwind és una alternativa millor.

**Debugging** — Malgrat les millores, debugar CSS generat per JavaScript al DevTools del navegador segueix sent menys intuïtiu que veure noms de classes explícits.

**Quan usar CSS-in-JS**

**Escenaris on té sentit:**

* Aplicacions React grans amb molts components reutilitzables  
* Biblioteques de components o design systems que es distribueixen com a paquets npm  
* Quan els estils canvien freqüentment basant-se en l'estat o les props del component  
* Equips on els developers de JavaScript es senten incòmodes gestionant fitxers CSS separats  
* Projectes amb tematització complexa i múltiples themes

**Escenaris on NO és la millor opció:**

* Aplicacions Next.js que usen React Server Components (usa Tailwind o CSS Modules)  
* Projectes on el rendiment és crític i cada kilobyte compta  
* Equips petits amb pocs components on la complejitat afegida no es justifica  
* Quan l'equip ja usa Tailwind i funciona bé

**L'alternativa moderna: CSS Modules**

Una alternativa a CSS-in-JS i a les classes globals és CSS Modules. CSS stylesheets tradicionals depenen de noms de classes globals, cosa que significa que has d'anar amb compte de no usar noms que entrin en conflicte els uns amb els altres o amb biblioteques de tercers.

CSS Modules proporciona encapsulació sense el cost del runtime JavaScript:

| /\* Button.module.css \*/.button {  background: \#3B82F6;  color: white;  padding: 0.5rem 1rem;}.primary { background: \#2563EB; } |
| :---- |

| // Button.jsximport styles from './Button.module.css';function Button({ primary }) {  return (    \<button className={\`${styles.button} ${primary ? styles.primary : ''}\`}\>      Clic    \</button\>  );} |
| :---- |

CSS Modules genera noms de classes únics en temps de build, no en runtime, evitant el problema de rendiment de CSS-in-JS.

