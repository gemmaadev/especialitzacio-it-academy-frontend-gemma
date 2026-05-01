## **Mòduls JavaScript: import i export**

**El problema que resolen els mòduls**

Imagina que estàs construint un projecte gran i escrius tot en un sol fitxer. A mesura que el projecte creix, aquell fitxer es torna de 500, 1000, 2000+ línies. Sense mòduls, si tens dos fitxers JavaScript carregats en HTML, tots dos comparteixen el mateix scope global. Si file1.js i file2.js declaren una variable amb el mateix nom, entren en conflicte i causen bugs molt difícils de rastrejar.

Considera una aplicació simple que fa múltiples tasques. Si tota la lògica resideix en un fitxer, el codi es torna difícil de navegar. Les funcions poden solapar-se, les variables poden entrar en conflicte, i entendre les dependències es torna increïblement complex.

**Què és un mòdul?**

Els mòduls solucionen això: cada mòdul té el seu propi scope. Les variables dins d'un mòdul no són visibles per al món exterior tret que les exportis explícitament.

Un mòdul és simplement un fitxer JavaScript. La clau és que no comparteix el scope global amb els altres fitxers: tot el que defineix és privat per defecte. Únicament comparteix el que declara explícitament amb export.

**Named exports: exportar múltiples coses**

Les named exports permeten exportar múltiples valors des d'un sol fitxer. Quan les importes, has d'usar exactament el mateix nom.

| // math.js \-- un mòdul d'utilitats matemàtiquesexport const PI \= 3.14159;export function suma(a, b) {  return a \+ b;}export function resta(a, b) {  return a \- b;}export const multiplica \= (a, b) \=\> a \* b;// Alternativa: exportar tot al finalconst divideix \= (a, b) \=\> a / b;export { divideix }; |
| :---- |

| // main.js \-- importar el que necessitesimport { suma, resta, PI } from './math.js';console.log(suma(5, 3));   // 8console.log(PI);           // 3.14159// Reanomenar en la importació amb 'as'import { suma as sumar, multiplica as mul } from './math.js';console.log(sumar(2, 3));  // 5// Importar tot com a namespaceimport \* as Math from './math.js';console.log(Math.suma(1, 2));  // 3console.log(Math.PI);          // 3.14159 |
| :---- |

**Default export: l'export principal**

Hi ha dos tipus d'exports: named exports (diversos per mòdul) i default exports (un per mòdul).

El default export és per quan un mòdul té una sola responsabilitat principal. Quan l'importes, pots posar-li qualsevol nom.

| // logger.js \-- un mòdul amb una responsabilitat únicaexport default function log(missatge) {  console.log(\`\[LOG\] ${new Date().toISOString()}: ${missatge}\`);}// config.js \-- objecte de configuració per defecteexport default {  apiUrl: 'https://api.exemple.com',  timeout: 5000,  retries: 3};// Button.jsx \-- component React (el més habitual amb default)export default function Button({ text, onClick }) {  return \<button onClick={onClick}\>{text}\</button\>;} |
| :---- |

| // main.js \-- importar el default: sense claus i amb el nom que vulguisimport log from './logger.js';import configuracio from './config.js';import Button from './Button.jsx';log('Aplicació iniciada');  // \[LOG\] 2026-04-30: Aplicació iniciada |
| :---- |

**Combinar named i default al mateix fitxer**

| // utils.jsexport const versio \= '1.0.0';            // named exportexport const autor \= 'Anna García';       // named exportexport default function inicialitzar() {  // default export  console.log(\`App v${versio} iniciada per ${autor}\`);} |
| :---- |

| // main.js \-- la importació per defecte va ABANS de les clausimport inicialitzar, { versio, autor } from './utils.js';inicialitzar();         // App v1.0.0 iniciada per Anna Garcíaconsole.log(versio);   // 1.0.0 |
| :---- |

**Barrel files: un punt d'entrada centralitzat**

Un patró molt usat en projectes grans és el **barrel file** (index.js): un fitxer que re-exporta tot el que hi ha en una carpeta, proporcionant un punt d'entrada únic.

Un mòdul pot "rellançar" valors exportats d'altres mòduls sense la molèstia d'escriure dues declaracions d'import/export separades. Això és sovint útil en crear un sol mòdul que concentra diversos exports de diversos mòduls (normalment anomenat barrel module).

| components/├── Button.jsx├── Input.jsx├── Card.jsx└── index.js    ← barrel file |
| :---- |

| // components/index.js \-- re-exporta totexport { default as Button } from './Button.jsx';export { default as Input } from './Input.jsx';export { default as Card } from './Card.jsx'; |
| :---- |

| // Sense barrel file: moltes línies d'importimport Button from '../components/Button.jsx';import Input from '../components/Input.jsx';import Card from '../components/Card.jsx';// Amb barrel file: una sola líniaimport { Button, Input, Card } from '../components'; |
| :---- |

**Dynamic imports: càrrega sota demanda**

Els imports normals (import ... from) carreguen el mòdul en temps de compilació. Els **dynamic imports** (import()) el carreguen en temps d'execució, únicament quan cal:

| // ✅ Dynamic import: carrega el mòdul quan l'usuari el necessitaasync function carregarGrafic() {  const { default: Chart } \= await import('./Chart.js');  Chart.renderitzar();}// Exemple amb React: lazy loading de componentsimport { lazy, Suspense } from 'react';const PaginaAdmin \= lazy(() \=\> import('./PaginaAdmin.jsx'));function App() {  return (    \<Suspense fallback={\<div\>Carregant...\</div\>}\>      \<PaginaAdmin /\>    \</Suspense\>  );} |
| :---- |

Això millora el rendiment inicial: el codi d'PaginaAdmin no es descarrega fins que l'usuari hi navega.

**Per quin motiu els mòduls fan el codi escalable**

* **Encapsulació i scope privat** — cada mòdul té el seu propi scope, les variables no contaminen el global. Pots tenir una variable config en deu fitxers diferents i cap entrarà en conflicte amb les altres.  
* **Separació de responsabilitats** — cada fitxer té una responsabilitat clara. Els canvis en un mòdul no afecten parts no relacionades de l'aplicació.  
* **Reutilització** — una funció escrita en un mòdul es pot importar en qualsevol altre fitxer del projecte (o fins i tot en un projecte diferent si es publica a npm).  
* **Col·laboració en equip** — millora la col·laboració: els equips poden tenir mòduls propis (tu gestionas l'autenticació, jo gestiono l'API). Dos developers poden treballar simultàniament en fitxers diferents sense conflictes.  
* **Tree-shaking** — usa named exports perquè el codi no usat pugui ser eliminat quan es construeix el projecte. Evita importar biblioteques senceres quan únicament necessites una petita funció. Vite i Webpack analitzen les importacions i eliminen el codi que no s'usa del bundle final.

**Named vs. Default: quan usar cada un**

Consell professional: usa named exports per a biblioteques (API predictible), default per a mòduls d'un sol propòsit. Barrejar tots dos també funciona.

| Situació | Export recomanat |
| ----- | ----- |
| Fitxer amb múltiples utilitats (math, helpers) | Named exports |
| Component React (un per fitxer) | Default export |
| Configuració o objecte principal | Default export |
| Biblioteca de funcions reutilitzables | Named exports |
| Classe principal d'un mòdul | Default export |
| Constants i enums | Named exports |

**Com usar mòduls al navegador**

| \<\!-\- Cal type="module" perquè el navegador entengui import/export \--\>\<script type="module" src="main.js"\>\</script\> |
| :---- |

Sense type="module", el navegador no entendrà import i export i llançarà un error. Els mòduls automàticament estan en mode estricte. No cal escriure "use strict" manualment.

En projectes React, Vue o Vite, el bundler (Vite, Webpack) gestiona tota la compilació dels mòduls automàticament, de manera que no cal preocupar-se per afegir type="module" als scripts.

