## **Glossari de termes — TypeScript: Tipat estàtic**

**`any`** — Tipus TypeScript que desactiva completament la comprovació de tipus. Una variable de tipus `any` pot ser qualsevol cosa i no produeix errors. Usar `any` és renunciar als beneficis de TypeScript. Usar `unknown` és l'alternativa segura.

**Anotació de tipus** — Declaració explícita del tipus d'una variable, paràmetre o valor de retorn usant el símbols `:`. `let nom: string`, `function saluda(x: string): void`. TypeScript pot inferir molts tipus automàticament, de manera que no cal anotar-ho tot.

**`as` (Type Assertion)** — Operador que força TypeScript a tractar un valor com un tipus concret, sobrepassant la inferència. `valor as string`. A usar amb moderació: si en uses molt, probablement el disseny de tipus és incorrecte.

**`boolean`** — Tipus primitiu de TypeScript. Valors possibles: `true` i `false`.

**Compilació** — El procés de transformar els fitxers `.ts` a fitxers `.js` usant el compilador `tsc`. TypeScript no existeix en temps d'execució: els tipus desapareixen completament en el JavaScript generat.

**`const` assertion (`as const`)** — Força TypeScript a inferir el tipus literal més estret possible. `const colors = ['vermell', 'blau'] as const` genera `readonly ['vermell', 'blau']` en lloc de `string[]`.

**Contracat de dades** — El propòsit principal d'una interfície: definir quines propietats i mètodes ha de tenir un objecte. Si un objecte compleix el contracte (té les propietats requerides amb els tipus correctes), TypeScript l'accepta.

**Declaration Merging** — Funcionalitat exclusiva de `interface` que permet declarar la mateixa interfície en múltiples llocs del codi i TypeScript les fusiona automàticament. Útil per estendre l'objecte global `Window` o els tipus d'Express.

**DefinitelyTyped** — Repositori GitHub col·laboratiu amb milers de fitxers `.d.ts` per a biblioteques JavaScript populars. Les definicions es publiquen a npm sota el prefix `@types/`. Exemple: `npm install @types/express --save-dev`.

**Discriminated Union** — Patró TypeScript on un union type comparteix una propietat literal (el "discriminant") que TypeScript usa per identificar quin tipus concret és. La base per modelar estats complexos de manera segura: `{ tipus: 'exit'; dades: T } | { tipus: 'error'; missatge: string }`.

**`.d.ts` (Declaration File)** — Fitxer que conté únicament informació de tipus sense codi executable. No genera cap `.js`. S'usa per proporcionar tipus a biblioteques JavaScript que no en tenen. TypeScript els cerca automàticament a `node_modules/@types/`.

**Error de compilació** — Error detectat per TypeScript abans d'executar el codi. El benefici central de TypeScript: bugs que en JavaScript pur apareixerien en producció, TypeScript els detecta mentre escrius.

**`extends` (interfície)** — Paraula clau per heretar propietats d'una altra interfície. `interface Empleat extends Persona` significa que `Empleat` té totes les propietats de `Persona` més les pròpies.

**`extends` (genèric)** — Restricció en un paràmetre de tipus genèric. `<T extends { length: number }>` significa que `T` pot ser qualsevol tipus que tingui la propietat `length`.

**Fitxer `.ts`** — Fitxer TypeScript d'implementació. Conté tipus i codi executable. Es compila a `.js`.

**Fitxer `.tsx`** — Equivalent a `.ts` però permet la sintaxi JSX. S'usa per a components React escrits en TypeScript.

**Genèric** — Paràmetre de tipus que actua com a marcador de posició per a un tipus que es concretarà en cada ús. Permet escriure funcions, interfícies i classes que funcionen per a múltiples tipus sense perdre seguretat de tipus. La sintaxi usa angle brackets: `<T>`. Per convenció: `T` (Type), `K` (Key), `V` (Value), `U` (segon tipus).

**`implements`** — Paraula clau per a classes. Declara que una classe complirà el contracte d'una interfície. Si la classe no implementa algun mètode o propietat de la interfície, TypeScript genera un error immediatament.

**`infer`** — Paraula clau avançada dins de tipus condicionals que permet extreure un tipus d'una estructura. Usada en utility types complexos. `ReturnType<T>` usa `infer` per extreure el tipus de retorn d'una funció.

**Inferència de tipus** — La capacitat de TypeScript de deduir el tipus d'una variable o expressió sense que cal anotar-lo. `let x = 'hola'` → TypeScript infere `string`. `const arr = [1, 2, 3]` → TypeScript infere `number[]`.

**Intersection Type (`&`)** — Combina múltiples tipus en un que té totes les propietats de tots. `Usuari & { permisos: string[] }` té totes les propietats d'`Usuari` més `permisos`. Diferent del union (`|`) que és "un o l'altre".

**`interface`** — Paraula clau per definir contractes de dades per a objectes. Suporta `extends`, declaration merging i `implements` en classes. Preferida sobre `type` per a formes d'objectes i APIs públiques.

**`keyof`** — Operador de tipus que retorna un union type de totes les claus d'un objecte. `keyof Usuari` → `'id' | 'nom' | 'email'`. Molt útil amb genèrics per a funcions que accedeixen a propietats d'objectes de manera segura.  
**Literal Type** — Un tipus que és un valor concret en lloc d'una categoria. `'exit'` és un tipus literal (no tota string, únicament la string "exit"). Molt usats en discriminated unions i per modelar estats finits.

**Module Augmentation** — Tècnica per afegir propietats a tipus d'una biblioteca existent sense modificar-la. Usant `declare global` o `declare module`, pots estendre els tipus de `Express.Request`, `Window`, etc.

**`never`** — Tipus que representa codi que mai s'executa o casos impossibles. Una funció que sempre llança un error retorna `never`. En switch exhaustius sobre discriminated unions, el cas `default` pot usar `never` per garantir que tots els casos estan gestionats.

**`noImplicitAny`** — Opció de `tsconfig.json` (activada per `strict: true`) que genera un error quan TypeScript infereix `any` implícitament. Obliga a declarar explícitament tots els tipus, eliminant les "caixes misterioses".

**`number`** — Tipus primitiu de TypeScript per a tots els números (enters i decimals). Equivalent al `number` de JavaScript.

**Opció `strict`** — La decisió de configuració més important del `tsconfig.json`. `"strict": true` activa totes les comprovacions rigoroses: `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes` i més. Tot projecte nou hauria de tenir-la activada.

**`outDir`** — Opció de `tsconfig.json` que especifica la carpeta on es genera el JavaScript compilat. Normalment `./dist`. Cal afegir-la al `.gitignore`.

**`Partial<T>`** — Utility Type que fa totes les propietats d'un tipus opcionals. `Partial<Usuari>` → `{ id?: number; nom?: string; email?: string }`. Útil per a funcions d'actualització parcial d'objectes.

**`Pick<T, K>`** — Utility Type que crea un tipus nou escollint un subconjunt de propietats. `Pick<Usuari, 'nom' | 'email'>` → `{ nom: string; email: string }`.

**Propietat opcional (`?`)** — Indica que una propietat pot no existir en un objecte. `email?: string` significa que `email` pot ser `string` o `undefined`. Diferent de `email: string | undefined` perquè amb `?` la propietat pot simplement no estar present.

**Propietat `readonly`** — Indica que una propietat no es pot modificar un cop assignada. `readonly id: number` genera un error de compilació si intentes canviar `id` després de la creació.

**`Promise<T>`** — Tipus genèric per a valors asíncrons. `Promise<Usuari>` indica que la funció és asíncrona i quan es resol retornarà un `Usuari`. S'usa amb `async/await`: `async function obtenirUsuari(): Promise<Usuari>`.

**`Record<K, V>`** — Utility Type per a objectes on les claus son de tipus `K` i els valors de tipus `V`. `Record<string, number>` → objecte amb qualsevol clau string i valors number. `Record<'admin' | 'editor', string[]>` → objecte amb exactament aquestes dues claus.

**`readonly`** — Modificador que impedeix la reassignació d'una propietat o element d'un array. `readonly id: number`, `readonly string[]`. TypeScript genera un error si s'intenta modificar.

**`ReturnType<T>`** — Utility Type que extreu el tipus de retorn d'una funció. `ReturnType<typeof meuaFuncio>` → el tipus que retorna `meuaFuncio`. Útil per crear tipus derivats de funcions existents.

**`rootDir`** — Opció de `tsconfig.json` que especifica la carpeta arrel dels fitxers `.ts`. Normalment `./src`. Treballa conjuntament amb `outDir` per mantenir l'estructura de carpetes al compilar.

**`sourceMap`** — Opció de `tsconfig.json` que genera fitxers `.map` que mapegen el JavaScript compilat amb el TypeScript original. Permet debugar el codi TypeScript original al navegador o Node.js en lloc del JavaScript generat.

**`strict`** — Veure *Opció `strict`*.

**`strictNullChecks`** — Opció de `tsconfig.json` (activada per `strict: true`) que fa que `null` i `undefined` siguin tipus distints que no son assignables a altres tipus. Elimina la classe completa de bugs de "cannot read property of null".

**`string`** — Tipus primitiu de TypeScript per a cadenes de text.

**Superset** — La relació de TypeScript amb JavaScript: tot JavaScript vàlid és TypeScript vàlid. TypeScript afegeix funcionalitats (el sistema de tipus) sense trencar la compatibilitat.

**`target`** — Opció de `tsconfig.json` que especifica la versió de JavaScript a la qual es compila. `"ES2022"` per a aplicacions modernes. Determina quines funcionalitats JavaScript estan disponibles sense polyfills.

**`tsc`** — El compilador oficial de TypeScript. `tsc` compila tots els fitxers, `tsc --watch` recompila en cada canvi, `tsc --noEmit` únicament comprova tipus sense generar fitxers.

**`tsconfig.json`** — El fitxer de configuració central de qualsevol projecte TypeScript. Defineix les opcions del compilador, quins fitxers compilar i quins excloure. Es genera amb `tsc --init`.

**Tuple** — Array de longitud fixa on cada posició té un tipus específic. `[string, number]` és una tupla de dos elements: primer un string, segon un number. Diferent d'un array `(string | number)[]` que és de longitud variable.

**`type`** — Paraula clau per crear àlies de tipus. Més flexible que `interface`: pot representar unions, interseccions, tuples, primitius i tipus complexos. No suporta declaration merging. Preferit sobre `interface` per a unions i composicions complexes.

**Type Guard** — Funció o expressió que estreny un union type a un tipus concret. Les guards integrades: `typeof`, `instanceof`, operador `in`. Les guards personalitzades usen el predicat `x is TipusConcret` com a tipus de retorn.

**Type Inference** — Veure *Inferència de tipus*.

**Type Narrowing** — Veure *Narrowing*.

**Union Type (`|`)** — Tipus que representa un valor que pot ser d'un tipus o d'un altre. `string | number` pot ser una string o un number. Cal usar narrowing per accedir a mètodes específics de cada tipus.

**`unknown`** — El tipus segur per a valors de tipus desconegut. Com `any`, accepta qualsevol valor. A diferència d'`any`, no permet usar el valor sense comprovar el tipus primer. L'alternativa correcta a `any` quan el tipus és genuïnament desconegut.

**`void`** — Tipus de retorn per a funcions que no retornen cap valor. `function log(x: string): void`. Diferent de `undefined`: `void` és la declaració intencional que la funció no té valor de retorn.

**`@types/nom`** — Convenció de nom dels paquets de DefinitelyTyped. `npm install @types/express --save-dev` instal·la les declaracions de tipus per a Express. TypeScript els detecta automàticament a `node_modules/@types/`.  
