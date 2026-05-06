## **Automatització de tasques amb npm Scripts**

**Què és un npm script i per quèexisteix**

Els npm scripts són comandes personalitzades definides a la secció `scripts` del fitxer `package.json` que automatitzen tasques com construir, testejar i desplegar aplicacions. Simplifiquen fluxos de treball complexos i milloren la col·laboració dins l'equip perquè tothom executa les mateixes comandes de la mateixa manera.

Un benefici important és que no calen eines de build addicionals: els npm scripts estan integrats a Node.js, de manera que no cal instal·lar Grunt, Gulp ni cap altra eina de build. Qualsevol binari instal·lat a `node_modules/.bin` és accessible directament als scripts sense haver d'especificar la ruta completa.

**L'estructura bàsica**

| // package.json{  "name": "el-meu-projecte",  "scripts": {    "start":   "node server.js",    "dev":     "vite",    "build":   "vite build",    "test":    "jest",    "lint":    "eslint src/"  }} |
| :---- |

| npm start         \# shorthand (sense 'run'): únicament per start, test i stopnpm test          \# shorthandnpm run dev       \# comanda personalitzada: sempre cal 'run'npm run buildnpm run lint |
| :---- |

**Scripts de debugging**

El script `debug` més útil és el que arrenca Node.js amb el flag d'inspecció que Chrome DevTools pot connectar:

| {  "scripts": {    "debug":       "node \--inspect src/index.js",    "debug:break": "node \--inspect-brk src/index.js"  }} |
| :---- |

La diferència entre els dos: `--inspect` arrenca el servidor normalment i el debugger pot connectar-se en qualsevol moment. `--inspect-brk` pausa l'execució a la primera línia i espera que el debugger es connecti abans de continuar. Útil quan el bug passa a l'inici de l'aplicació.

Un cop executat `npm run debug`, obres Chrome → `chrome://inspect` → "Open dedicated DevTools for Node" i tens el panell Sources complet per debugar el servidor Node.js, amb breakpoints, call stack i tot.

**Scripts de testing habituals**

| {  "scripts": {    "test":          "jest",    "test:watch":    "jest \--watch",    "test:coverage": "jest \--coverage",    "test:ci":       "jest \--ci \--coverage \--watchAll=false"  }} |
| :---- |

`test:watch` re-executa els tests automàticament quan canvia el codi. Molt útil durant el desenvolupament: fas un canvi, guardes el fitxer, i veus immediatament si has trencat algun test.

`test:ci` és la versió per al pipeline CI/CD: no entra en mode interactiu (--watchAll=false), genera el report de cobertura i retorna un codi d'error si algun test falla, cosa que atura el pipeline.

**Scripts de linting i format**

| {  "scripts": {    "lint":       "eslint src/ \--ext .js,.jsx,.ts,.tsx",    "lint:fix":   "eslint src/ \--ext .js,.jsx,.ts,.tsx \--fix",    "format":     "prettier \--write src/",    "format:check": "prettier \--check src/"  }} |
| :---- |

La separació entre `lint` i `lint:fix` és important. El script sense `:fix` únicament informa d'errors (ideal per al CI/CD que ha de fallar si hi ha problemes). El script amb `:fix` corregeix automàticament els errors que es poden corregir. En el CI/CD s'executa `lint` per verificar; en development s'executa `lint:fix` per corregir.

**Encadenar scripts: `&&` vs. `&`**

| {  "scripts": {    "ci":     "npm run lint && npm test && npm run build",    "check":  "npm run lint & npm run format:check"  }} |
| :---- |

`&&` és l'execució seqüencial: cada script s'executa únicament si l'anterior ha tingut èxit (codi de sortida 0). Si `lint` falla, els tests no s'executen. És el comportament correcte per al CI/CD: no té sentit construir si el codi té errors.

`&` és l'execució en paral·lel en sistemes Unix: els dos scripts s'executen simultàniament. Útil quan les tasques son independents i vols estalviar temps.

**Hooks `pre` i `post`: executar scripts automàticament**

Qualsevol script pot tenir un hook `pre` (s'executa **abans**) i un `post` (s'executa **després**). NPM els detecta automàticament per nom:

| {  "scripts": {    "pretest":  "npm run lint",    "test":     "jest",    "posttest": "echo 'Tests completats\!'",    "prebuild": "npm run clean",    "build":    "vite build",    "postbuild": "npm run analyze",    "clean":    "rm \-rf dist/",    "analyze":  "source-map-explorer dist/assets/\*.js"  }} |
| :---- |

Quan executes `npm test`, l'ordre automàtic és: `pretest` (lint) → `test` (jest) → `posttest` (missatge). Si `pretest` falla, `test` no s'executa. Útil per garantir que el codi sempre es lint-eja abans de testejar.

Els hooks `pre` i `post` scripts son sensibles al codi de sortida: si el teu script `pretest` surt amb un codi de sortida diferent de zero, NPM s'aturarà immediatament i no executarà `test` ni `posttest`.

**El sistema de scripts complet d'un projecte real**

| {  "scripts": {    "start":          "node dist/server.js",    "dev":            "vite",    "debug":          "node \--inspect src/server.js",    "debug:break":    "node \--inspect-brk src/server.js",    "build":          "vite build",    "prebuild":       "npm run lint && npm test",    "build:analyze":  "npm run build && npx source-map-explorer dist/\*\*/\*.js",    "test":           "jest",    "test:watch":     "jest \--watch",    "test:coverage":  "jest \--coverage",    "test:ci":        "jest \--ci \--coverage \--watchAll=false",    "lint":           "eslint src/ \--ext .js,.jsx",    "lint:fix":       "eslint src/ \--ext .js,.jsx \--fix",    "format":         "prettier \--write src/",    "clean":          "rm \-rf dist/ coverage/",    "ci":             "npm run lint && npm run test:ci && npm run build"  }} |
| :---- |

**Passar arguments als scripts**

Pots passar arguments addicionals als scripts usant `--` (doble guió) seguit dels arguments. Tot el que afegeixes après `--` es passa com a string a la comanda especificada:

| \# Passar arguments a jestnpm test \-- \--verbose               \# jest \--verbosenpm test \-- \--testPathPattern=auth  \# únicament tests que contenen "auth"npm test \-- \--watch                 \# equivalent a npm run test:watch\# Passar arguments a eslintnpm run lint \-- \--quiet             \# únicament errors, sense warnings |
| :---- |

**Variables d'entorn als scripts**

Pots passar variables d'entorn directament als scripts:

| {  "scripts": {    "dev":        "vite",    "dev:prod":   "NODE\_ENV=production vite",    "start":      "NODE\_ENV=production node server.js",    "test":       "NODE\_ENV=test jest",    "debug":      "NODE\_ENV=development node \--inspect src/index.js"  }} |
| :---- |

| // Variables de configuració via el camp "config"{  "config": {    "port": "3000",    "host": "localhost"  },  "scripts": {    "start": "node server.js \--port $npm\_package\_config\_port"  }} |
| :---- |

**Resum: la convenció de noms recomanada**

Una convenció clara fa que tothom de l'equip sàpiga el que fa cada script sense llegir el codi:

| Script | Propòsit |
| ----- | ----- |
| `npm start` | Arrenca l'app en producció |
| `npm run dev` | Arrenca el servidor de development |
| `npm test` | Executa els tests una vegada |
| `npm run test:watch` | Tests en mode watch |
| `npm run test:ci` | Tests per al pipeline CI/CD |
| `npm run lint` | Comprova l'estil del codi |
| `npm run lint:fix` | Corregeix errors d'estil |
| `npm run build` | Build de producció |
| `npm run clean` | Elimina fitxers generats |
| `npm run debug` | Arrenca amb el debugger connectat |
| `npm run ci` | Pipeline complet (lint \+ test \+ build) |

