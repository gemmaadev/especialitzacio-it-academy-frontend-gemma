## **Integrar TypeScript amb biblioteques JavaScript sense tipat**

**El problema: biblioteques sense tipus**

Quan importes una biblioteca JavaScript en un projecte TypeScript, el compilador busca informació sobre quines funcions i tipus exposa aquella biblioteca. TypeScript té dos tipus principals de fitxers: els `.ts` que son fitxers d'implementació que contenen tipus i codi executable, i els `.d.ts` que son fitxers de declaració que contenen únicament informació de tipus. Aquests fitxers no produeixen sortides `.js`; s'usen únicament per a la comprovació de tipus.

Quan una biblioteca JavaScript no inclou fitxers `.d.ts`, el compilador llaça l'error:

| Could not find a declaration file for module 'nom-biblioteca'.'.../node\_modules/nom-biblioteca/index.js' implicitly has an 'any' type.Try \`npm install @types/nom-biblioteca\` if it exists. |
| :---- |

**Com TypeScript busca els tipus: l'ordre de cerca**

La primera cosa que TypeScript fa és comprovar la declaració en els metadades del paquet. Si no hi ha cap camp "types" o "typings" al `package.json`, es verifica l'existència d'un fitxer `index.d.ts` a la carpeta arrel del paquet. Si tampoc existeix, TypeScript cerca `@types/nom-paquet`.

| npm install nom-biblioteca              ↓TypeScript busca en aquest ordre:  1\. package.json → camp "types" o "typings"  2\. node\_modules/nom-biblioteca/index.d.ts  3\. node\_modules/@types/nom-biblioteca/index.d.ts              ↓  Si cap existeix → Error TS7016 (amb strict mode)  Si existeix alguna → tipat complet disponible |
| :---- |

**Solució 1: DefinitelyTyped i el prefixe `@types`**

DefinitelyTyped és un repositori de GitHub que serveix com a centre central per a fitxers de declaració TypeScript per a diverses biblioteques i frameworks JavaScript. Els fitxers de declaració (`.d.ts`) proporcionen informació de tipus per al codi JavaScript existent, permetent a TypeScript entendre i proporcionar comprovació de tipus per a aquelles biblioteques.

TypeScript automàticament troba les definicions de tipus sota `node_modules/@types`, de manera que no cal cap altre pas per tenir aquests tipus disponibles en el programa.

| \# Biblioteques que inclouen els seus propis tipus (res a fer):npm install axios           \# axios porta els seus .d.ts integratsnpm install typescript      \# typescript porta els seus .d.ts integrats\# Biblioteques que necessiten @types separat:npm install expressnpm install @types/express \--save-devnpm install lodashnpm install @types/lodash \--save-devnpm install jestnpm install @types/jest \--save-dev |
| :---- |

Un cop instal·lat el paquet `@types`, TypeScript el detecta automàticament i tens autocompletat complet i comprovació de tipus:

| import express from 'express';import \_ from 'lodash';const app \= express();   // app: Express ← TypeScript sap el tipus\!app.get('/ruta', (req, res) \=\> {  res.json({ ok: true });  // req i res estan tipats});const ordenat \= \_.sortBy(\[3, 1, 2\]);  // TypeScript sap que retorna number\[\] |
| :---- |

**Solució 2: Fitxers de declaració propis (`.d.ts`)**

En el cas poc comú que una biblioteca no inclogui els seus propis tipus i no tingui una definició a DefinitelyTyped, pots escriure un fitxer de declaració tu mateix. Si vols silenciar els avisos sobre un mòdul en particular sense escriure un fitxer de declaració, pots declarar ràpidament el mòdul com a tipus `any` posant una declaració buida en un fitxer `.d.ts` del teu projecte.

**Opció A: Declaració mínima (silencia l'error, sense tipus real)**

| // src/declarations.d.ts// Dius a TypeScript "sé que existeix, tracta'l com any"declare module 'nom-biblioteca-sense-tipus'; |
| :---- |

**Opció B: Declaració completa (proporciona els teus propis tipus)**

| // src/declarations.d.tsdeclare module 'nom-biblioteca-sense-tipus' {  // Declares les funcions i tipus que exposa  export function calcularAlgoCosa(valor: number): string;  export function processarDades(dades: object\[\]): void;  export interface Opcions {    timeout?: number;    retries?: number;  }  // Exportació per defecte si la biblioteca usa module.exports  const biblioteca: {    init: (opcions?: Opcions) \=\> void;    destroy: () \=\> void;  };  export default biblioteca;} |
| :---- |

Assegura't que `tsconfig.json` inclou el fitxer de declaració:

| {  "include": \["src/\*\*/\*"\]  // src/declarations.d.ts s'inclou automàticament} |
| :---- |

**Solució 3: Module Augmentation — estendre tipus existents**

De vegades vols afegir propietats a tipus d'una biblioteca que ja té tipus. Per exemple, Express no inclou les propietats personalitzades que afegeixes a `req`:

| // src/types/express.d.tsimport { Usuari } from './models';// Augmenta el tipus Request d'Express sense modificar la bibliotecadeclare global {  namespace Express {    interface Request {      usuariAutenticat?: Usuari;  // la teva propietat personalitzada      sessioId?: string;    }  }}// Ara pots usar req.usuariAutenticat sense errors de tipus:app.get('/perfil', (req, res) \=\> {  if (req.usuariAutenticat) {    res.json(req.usuariAutenticat.nom);  // ✅ tipat correctament  }}); |
| :---- |

Un altre cas: estendre l'objecte `Window` del navegador:

| // src/types/window.d.tsinterface Window {  analytics: {    track: (event: string, propietats?: object) \=\> void;  };  \_\_APP\_CONFIG\_\_: {    apiUrl: string;    version: string;  };}// Ara funciona sense errors:window.analytics.track('page\_view');console.log(window.\_\_APP\_CONFIG\_\_.apiUrl); |
| :---- |

**Solució 4: `allowJs` — importar JavaScript directament**

Si tens codi JavaScript propi que no vols migrar a TypeScript, pots configurar TypeScript per acceptar-lo:

| // tsconfig.json{  "compilerOptions": {    "allowJs": true,       // permet importar fitxers .js    "checkJs": false       // no comprova els fitxers .js (opcional)  }} |
| :---- |

| // Pots importar fitxers .js directament (sense errors de compilació)import { meuUtils } from './legacy/utils.js'; |
| :---- |

**El tipus `any`: la solució d'últim recurs**

Quan res funciona i necessites continuar, pots fer un type assertion forçat. Usa-ho únicament quan no hi ha alternativa:

| // ❌ Evitar si és possibleconst result \= bibliotecaSenseTipus.ferAlgoCosa() as any;// ✅ Millor: wrapping tipat que isola el 'any'function wrappedFerAlgoCosa(): string {  // Aquí el 'any' és explícit i confinat a una sola funció  return (bibliotecaSenseTipus.ferAlgoCosa() as any) as string;}// El codi que usa el wrapper és completament tipatconst resultat: string \= wrappedFerAlgoCosa(); |
| :---- |

**El flux de decisió per a biblioteques sense tipus**

| 1\. Intentes importar una biblioteca JavaScript          ↓2\. TypeScript llaça TS7016?          │    SÍ   ↓                      NO ↓3\. Cerca @types:             La biblioteca inclou els seus propis types ✅   npm install @types/nom \--save-dev          │   @types existeix? ──────── SÍ → Instal·la i ja funciona ✅          │          NO ↓4\. Escriu un fitxer .d.ts   Opció A: declare module 'nom'; (silencia error, any implícit)   Opció B: declare module 'nom' { funcions tipades } (millor)          ↓5\. Si necessites estendre tipus d'una biblioteca → Module Augmentation |
| :---- |

**Resum: les quatre estratègies**

| Estratègia |             Quan usar | Seguretat de tipus  |
| ----- | :---- | ----- |
| **`@types/nom`** | Biblioteca popular (Express, Lodash, Jest) | Alta ✅ |
| **Biblioteca amb tipus integrats** | Biblioteques modernes (Axios, Zod) | Alta ✅ |
| **`.d.ts` propi complet** | Biblioteca sense `@types`, ús intensiu | Mitjana (la fas tu) |
| **`declare module 'nom'`** | Biblioteca poc usada, silenciar error ràpid | Baixa (any) |
| **Module Augmentation** | Estendre tipus existents (Express, Window) | Alta ✅ |
| **`allowJs: true`** | Fitxers JS propis que no migres | Baixa |

