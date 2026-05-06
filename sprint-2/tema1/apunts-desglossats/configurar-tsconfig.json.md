## **Configurar `tsconfig.json`: les decisions clau**

**Què és i per què existeix**

El fitxer `tsconfig.json` és el fitxer de configuració central per a projectes TypeScript. Defineix les opcions del compilador TypeScript (`tsc`) per entendre l'estructura del projecte i com transformar els fitxers `.ts` en JavaScript. Permet especificar configuració a nivell de projecte, facilitant mantenir la consistència.

Sense un `tsconfig.json`, TypeScript usa valors per defecte que probablement no s'ajusten al projecte. Crear-lo és el primer pas obligatori de qualsevol projecte TypeScript. La manera més ràpida de generar-ne un amb valors sensats:

| tsc \--init |
| :---- |

**L'estructura bàsica**

| {  "compilerOptions": {    // aquí van totes les opcions del compilador  },  "include": \["src/\*\*/\*"\],     // quins fitxers compilar  "exclude": \["node\_modules", "dist"\]  // quins fitxers ignorar} |
| :---- |

**Decisió 1: `target` — per a quina versió de JavaScript compiles**

`target` especifica la versió de JavaScript objectiu per al JavaScript generat. Per assegurar màxima compatibilitat, estableix-la a la versió més baixa que el teu codi necessita per executar-se. `ESNext` permet apuntar a les últimes funcionalitats proposades suportades.

| {  "compilerOptions": {    "target": "ES2022"    // recomanat per a projectes moderns    // "target": "ES5"   // compatibilitat màxima amb navegadors antics    // "target": "ESNext" // les funcionalitats més noves (menys estable)  }} |
| :---- |

La regla pràctica: `es2022` és recomanat sobre `esnext` per a estabilitat. Per a projectes web moderns, `ES2022` o `ES2020` cobreix la majoria de casos sense problemes de compatibilitat.

**Decisió 2: `module` — com s'organitzen els imports**

`module` defineix el sistema de mòduls a usar (CommonJS, AMD, ES6...). La majoria de projectes moderns usaran ES6 o ESNext.

| {  "compilerOptions": {    // Per a Node.js:    "module": "CommonJS",    // require() / module.exports    "module": "NodeNext",    // ES Modules natius de Node.js (recomanat)    // Per a web (Vite, webpack):    "module": "ESNext",      // import / export natius    // Per a Next.js o projectes amb bundler:    "module": "preserve"     // preserva el format del fitxer original  }} |
| :---- |

**Decisió 3: `strict` — el nivell de rigorositat del tipat**

`strict: true` habilita tota la gamma de funcionalitats de comprovació de tipus, dissenyades per atrapar errors potencials i casos límit aviat. Aquesta flag és essencialment una drecera que habilita diverses altres opcions crítiques.

| {  "compilerOptions": {    "strict": true    // ← habilita totes les opcions de sota  }} |
| :---- |

El que `strict: true` activa internament:

**`noImplicitAny`** — Desallotja que les variables i paràmetres siguin assignats implícitament al tipus `any`. Forçat a definir tipus explícitament, reduint el risc de comportaments inesperats. 

**`strictNullChecks`** — Assegura que `null` i `undefined` es tracten com a tipus distints, fent el codi més predictible prevenint operacions accidentals sobre valors possiblement nuls o indefinits. 

**`strictFunctionTypes`** — Fa complir una comprovació més estricta dels tipus de funció. 

**`strictBindCallApply`** — Afegeix comprovacions de tipus per als mètodes `bind`, `call` i `apply`.

| // Amb "strict": false (comportament permissiu)function saluda(nom) {       // ← implícitament 'any', sense error  console.log(nom.toUpperCase());}saluda(null);  // Error en execució, però TypeScript no avisa\!// Amb "strict": true (comportament rigorós)function saluda(nom: string) {  // ← cal declarar el tipus  console.log(nom.toUpperCase());}saluda(null);// ❌ Error: Argument of type 'null' is not assignable to parameter of type 'string'// L'error apareix mentre escrius, no en producció |
| :---- |

La recomanació és sempre `"strict": true`. Qualsevol projecte nou hauria de començar amb el mode estricte activat.

**Decisió 4: `outDir` i `rootDir` — organització dels fitxers**

| {  "compilerOptions": {    "rootDir": "./src",   // on estan els fitxers .ts    "outDir": "./dist"    // on s'escriu el JavaScript compilat  }} |
| :---- |

Amb aquesta configuració: escrius TypeScript a `src/`, el compilador genera JavaScript a `dist/`, i `dist/` s'afegeix al `.gitignore` perquè és codi generat que no ha d'anar al repositori.

**Decisió 5: `sourceMap` — debugging del TypeScript original**

Els source maps mapen el teu TypeScript al JavaScript de sortida, fent el debugging amb eines com Chrome DevTools molt més fàcil. Sense source maps, el debugging és complicat perquè els errors traçen de tornada al JavaScript generat, no al codi TypeScript original.

| {  "compilerOptions": {    "sourceMap": true   // ← genera fitxers .map per al debugging  }} |
| :---- |

Amb source maps activats, quan hi ha un error a producció, el stack trace et porta directament a la línia del fitxer TypeScript original, no al JavaScript minificat generat.

**Decisió 6: `esModuleInterop` i `skipLibCheck`**

`esModuleInterop: true` i `skipLibCheck: true` son opcions de base recomanades per a tots els projectes.

| {  "compilerOptions": {    "esModuleInterop": true,    // Permet importar mòduls CommonJS amb la sintaxi de default import:    // import express from 'express'  (en lloc de import \* as express from 'express')    "skipLibCheck": true    // Salta la comprovació de tipus dels fitxers de declaració (.d.ts)    // de les biblioteques de tercers. Redueix el temps de compilació    // i evita errors de biblioteques mal tipades.  }} |
| :---- |

**Decisió 7: `jsx` — per a projectes React**

Si uses React, cal indicar-li a TypeScript com processar el JSX:

| {  "compilerOptions": {    "jsx": "react-jsx"    // "react-jsx": React 17\+ (import automàtic, recomanat)    // "react": React 16 (cal import React manualment)    // "preserve": deixa el JSX sense transformar (ho fa el bundler)  }} |
| :---- |

**Decisió 8: `include` i `exclude` — quins fitxers compila**

| {  "include": \[    "src/\*\*/\*"          // tots els fitxers .ts i .tsx dins de src/  \],  "exclude": \[    "node\_modules",     // mai compilar les dependencies    "dist",             // mai compilar el resultat compilat    "\*\*/\*.test.ts"      // excloure tests del build de producció  \]} |
| :---- |

**El `tsconfig.json` recomanat per a un projecte web modern**

| {  "compilerOptions": {    // Entorn    "target": "ES2022",    "lib": \["ES2022", "DOM", "DOM.Iterable"\],    // Mòduls (per a Vite / bundler)    "module": "ESNext",    "moduleResolution": "bundler",    // React / JSX    "jsx": "react-jsx",    // Rigorositat    "strict": true,    "noUnusedLocals": true,    "noUnusedParameters": true,    "noFallthroughCasesInSwitch": true,    // Output    "outDir": "./dist",    "sourceMap": true,    "noEmit": true,       // Vite fa la compilació real, TypeScript únicament comprova    // Compatibilitat    "esModuleInterop": true,    "skipLibCheck": true,    "resolveJsonModule": true,    "forceConsistentCasingInFileNames": true  },  "include": \["src/\*\*/\*"\],  "exclude": \["node\_modules", "dist"\]} |
| :---- |

**Estendre configuracions: `extends`**

Pots compartir configuracions comunes entre múltiples projectes estenent una `tsconfig.json` base. Ideal per a monorepos o per separar configuracions de dev/prod.

| // tsconfig.json (producció){  "extends": "./tsconfig.base.json",  "compilerOptions": {    "noUnusedLocals": true,    "noUnusedParameters": true  }}// tsconfig.dev.json (development, menys estricte){  "extends": "./tsconfig.base.json",  "compilerOptions": {    "noUnusedLocals": false  }} |
| :---- |

**Resum de les opcions més importants**

| Opció | Valor recomanat | Per a quèserveix |
| ----- | ----- | ----- |
| `strict` | `true` | Habilita totes les comprovacions rigoroses |
| `target` | `"ES2022"` | Versió de JavaScript de sortida |
| `module` | `"ESNext"` o `"NodeNext"` | Format dels mòduls |
| `outDir` | `"./dist"` | On va el JavaScript compilat |
| `sourceMap` | `true` | Debugging del TypeScript original |
| `esModuleInterop` | `true` | Compatibilitat d'imports CommonJS |
| `skipLibCheck` | `true` | Salta comprovació de biblioteques |
| `jsx` | `"react-jsx"` | Per a projectes React |
| `noUnusedLocals` | `true` | Error per variables no usades |

