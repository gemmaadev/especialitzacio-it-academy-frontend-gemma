## **CSS-in-JS vs. CSS tradicional: avantatges i desavantatges**

**Què és CSS-in-JS**

CSS-in-JS és un enfocament per estilitzar aplicacions web de manera dinàmica on els estils CSS es composen usant JavaScript en lloc de fitxers CSS tradicionals. 

Aquest enfocament va guanyar popularitat dins la comunitat React i ha estat adoptat per altres frameworks i biblioteques frontend.

Les biblioteques més populars son **styled-components** i **Emotion**.

**El problema principal del CSS tradicional**

El canvi de paradigma més gran és el **scoping**. El CSS tradicional aboca tot en un espai de noms global, creant un "Far West d'estils" on les classes poden xocar i sobreescriure's entre elles. 

CSS-in-JS genera noms de classe únics automàticament, de manera que els estils del teu botó no trencaran accidentalment la teva navegació.

| /\* CSS tradicional: risc de col·lisió \*/.button { color: red; }        /\* Component A \*/.button { color: blue; }       /\* Component B → sobreescriu el primer\! \*/ |
| :---- |

**Avantatge 1: Estils encapsulats per component**

Els estils s'escopen automàticament al component, eliminant el risc de conflictes CSS globals.

| // styled-components: els estils viuen AMB el componentimport styled from 'styled-components';const Button \= styled.button\`  background-color: \#007bff;  color: white;  padding: 10px 20px;  border-radius: 4px;  &:hover {    background-color: \#0056b3;  }\`;// Ús: exactament com un component React\<Button\>Fes clic aquí\</Button\> |
| :---- |

Quan elimines un component, els seus estils desapareixen amb ell. No hi ha més "CSS zombi" que infla el teu codebase.

**Avantatge 2: Estils dinàmics basats en props i estat**

Aquesta és la raó principal per escollir CSS-in-JS sobre CSS Modules.

Un dels avantatges més grans és que styled-components permet ajustar el component dinàmicament usant props. Amb CSS tradicional, hauries d'injectar un className diferent per a cada estil diferent.

| // Estils dinàmics basats en props: impossible amb CSS purconst Button \= styled.button\`  background-color: ${props \=\> props.primary ? '\#007bff' : 'white'};  color: ${props \=\> props.primary ? 'white' : '\#007bff'};  font-size: ${props \=\> props.large ? '18px' : '14px'};\`;// Ús:\<Button primary\>Primari\</Button\>\<Button\>Secundari\</Button\>\<Button primary large\>Gran i Primari\</Button\>// Exemple amb estat del component:const Input \= styled.input\`  border-color: ${props \=\> props.hasError ? 'red' : '\#ccc'};  box-shadow: ${props \=\> props.hasError ? '0 0 4px red' : 'none'};\`; |
| :---- |

**Avantatge 3: Co-localització de codi**

Els estils s'escriuen en el mateix fitxer que el component, cosa que pot millorar la llegibilitat i el manteniment, especialment en components petits.

| CSS tradicional:  components/    Button.jsx    ← lògica del component    Button.css    ← estils en un fitxer separat    Button.test.jsstyled-components:  components/    Button.jsx    ← lògica \+ estils en UN SOL fitxer    Button.test.js |
| :---- |

Ja no has de saltar entre fitxers per entendre com es veu i com funciona un component.

**Avantatge 4: Theming integrat**

Moltes biblioteques CSS-in-JS ofereixen suport de theming integrat, facilitant el canvi entre temes.

| // ThemeProvider de styled-componentsimport { ThemeProvider } from 'styled-components';const temaClar \= { primary: '\#007bff', background: '\#fff', text: '\#000' };const temaFosc \= { primary: '\#4dabf7', background: '\#1a1a1a', text: '\#fff' };const Button \= styled.button\`  background: ${props \=\> props.theme.primary};  color: ${props \=\> props.theme.text};  background-color: ${props \=\> props.theme.background};\`;// L'arbre sencer de components accedeix al temafunction App() {  const \[fosc, setFosc\] \= useState(false);  return (    \<ThemeProvider theme={fosc ? temaFosc : temaClar}\>      \<Button\>Botó amb tema\</Button\>    \</ThemeProvider\>  );} |
| :---- |

**Avantatge 5: Eliminació de codi mort (Dead Code Elimination)**

Els estils no usats no inflen el teu bundle. L'enfocament centrat en components s'alinea perfectament amb la filosofia de React.

Amb CSS tradicional, és difícil saber quins estils ja no s'usen. Amb CSS-in-JS, si el component s'elimina, els seus estils desapareixen automàticament.

**Els desavantatges: quan CSS-in-JS NO és la millor opció**

CSS-in-JS pot portar a un major bundle size a causa de la generació d'estils en runtime, especialment en apps molt grans. La generació d'estils en runtime pot afectar el rendiment, especialment quan es renderitzen molts components.

Perquè styled-components genera estils en runtime dins de JavaScript, pot haver un retard en aplicar els estils fins que l'execució de JavaScript s'ha completat. Això pot impactar negativament el Largest Contentful Paint (LCP) i d'altres mètriques de rendiment, afectant potencialment el SEO.

Desavantatges:  
  ❌ Bundle size més gran (la biblioteca \+ els estils generats)  
  ❌ Overhead en runtime (JavaScript ha de generar els estils)  
  ❌ LCP i SEO potencialment afectats (sense SSR)  
  ❌ Corba d'aprenentatge per a developers de CSS pur  
  ❌ Debugging menys intuïtiu (noms de classe generats: "sc-bdVfzM")

**Comparativa ràpida: Quan usar cada enfocament**

| Criteri | CSS Tradicional | CSS-in-JS |
| ----- | ----- | ----- |
| **Estils dinàmics** | ❌ Difícil | ✅ Natiu |
| **Encapsulament** | ❌ Global | ✅ Per component |
| **Rendiment** | ✅ Millor (sense runtime) | ⚠️ Overhead de JS |
| **Theming** | ⚠️ Manual (variables CSS) | ✅ Integrat |
| **Caching del navegador** | ✅ Fitxers CSS separats | ❌ Dins del JS |
| **SEO** | ✅ Millor | ⚠️ Requereix SSR |
| **Familiaritat** | ✅ Conegut per tots | ⚠️ Corba d'aprenentatge |
| **Dead code** | ❌ S'acumula | ✅ Auto-eliminat |

Usa CSS-in-JS quan:  
  ✅ Necessites estils molt dinàmics (basat en props/estat)  
  ✅ Vols theming integrat i canvi de temes en temps real  
  ✅ Projecte gran on l'encapsulament és crític  
  ✅ Equip acostumat a pensar en components

Usa CSS tradicional / CSS Modules quan:  
  ✅ SEO és crític (pàgines de contingut, landing pages)  
  ✅ Rendiment màxim és prioritari  
  ✅ Equip amb fort coneixement de CSS pur  
  ✅ Aplicació principalment estàtica (pocs estils dinàmics)

