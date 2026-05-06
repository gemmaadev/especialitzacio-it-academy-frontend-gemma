## **Guia Oficial de npm Scripts**

###### **npm Scripts Guide**

[https://docs.npmjs.com/cli/v8/using-npm/scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts)  
Guia oficial per gestionar i executar scripts amb npm.

**Què son els npm scripts i per quèexisteixen**

La propietat "scripts" del teu fitxer package.json suporta un nombre d'scripts integrats, els seus events de cicle de vida predefinits, i scripts arbitraris. 

Tots es poden executar fent npm run-script \<stage\> o npm run \<stage\> per abreviar. Els scripts pre i post amb noms coincidents s'executaran també (per exemple, premyscript, myscript, postmyscript).

El gran avantatge: Si depens de mòduls que defineixen scripts executables, com suites de tests, aquells executables s'afegiran al PATH per executar els scripts. Per tant, si el teu package.json té una dependència, pots usar el seu script directament sense especificar la ruta completa.

**Els shorthands: scripts sense run**

Quatre scripts especials no necessiten la paraula run:

| npm start      \# equivalent a: npm run startnpm test       \# equivalent a: npm run test  (o npm t)npm stop       \# equivalent a: npm run stopnpm restart    \# equivalent a: npm run restart |
| :---- |

Tots els altres scripts personalitzats necessiten npm run:

| npm run devnpm run buildnpm run lintnpm run deploy |
| :---- |

**Els hooks pre i post: execució automàtica**

Tots els scripts suporten hooks pre i post. S'executen automàticament per npm abans (pre) i després (post) del script corresponent.

Per a cada npm script hi ha una versió pre i post que s'executarà si és definida. Això és útil quan vols forçar una comprovació de validació abans d'executar un script o injectar un comportament específic quan s'executa un script.

| {  "scripts": {    "pretest":  "npm run lint",     // ← s'executa ABANS de test    "test":     "jest",    "posttest": "npm run coverage", // ← s'executa DESPRÉS de test    "prebuild": "npm run clean",    // ← neteja abans de construir    "build":    "vite build",    "postbuild": "echo 'Build completat\!'",    "clean":    "rm \-rf dist/",    "coverage": "jest \--coverage",    "lint":     "eslint src/"  }} |
| :---- |

Si el script surt amb un codi diferent de 0, llavors això aturarà el procés. Els fitxers de script no han de ser necessàriament programes nodejs o fins i tot JavaScript. Simplement han de ser algun tipus de fitxer executable.

**Els scripts de cicle de vida predefinits de npm**

Alguns scripts de cicle de vida importants: prepack s'executa ABANS que un tarball sigui empaquetado (a npm pack, npm publish, i quan s'instal·len dependències git). postpack s'executa DESPRÉS que el tarball hagi estat generat. prepare s'executa abans de publish, i quan fas npm install en un repositori git local — ideal per compilar TypeScript o generar fitxers.

Els principals i quan s'activen automàticament:

| {  "scripts": {    "prepare":      "...", // Després de npm install, abans de npm publish    "prepublishOnly": "npm test && npm run build", // Únicament abans de publish    "preinstall":   "...", // Abans d'instal·lar el paquet    "postinstall":  "...", // Després d'instal·lar el paquet    "preuninstall": "...", // Abans de desinstal·lar    "preversion":   "npm test", // Abans de canviar la versió    "version":      "npm run build", // Quan es canvia la versió    "postversion":  "git push \--follow-tags" // Després de canviar la versió  }} |
| :---- |

**Variables d'entorn als scripts**

La clau "config" del package.json es sobreescriu a l'entorn si hi ha un paràmetre de config de \<nom\>\[@\<versió\>\]:\<clau\>. L'event de cicle de vida npm actual es posa al npm\_lifecycle\_event. Pots tenir un sol script usat per a parts diferents del procés que commuta basant-se en el que passa.

| {  "name": "el-meu-projecte",  "version": "1.0.0",  "config": {    "port": "3000",    "host": "localhost"  },  "scripts": {    "start":      "node server.js",    "start:dev":  "NODE\_ENV=development node server.js",    "start:prod": "NODE\_ENV=production node server.js",    "info":       "echo El projecte és $npm\_package\_name@$npm\_package\_version"  }} |
| :---- |

| \# Accedir a les variables de configuració des del codiprocess.env.npm\_package\_config\_port    // → "3000"process.env.npm\_package\_name           // → "el-meu-projecte"process.env.npm\_package\_version        // → "1.0.0"process.env.npm\_lifecycle\_event        // → "start" / "test" / etc. |
| :---- |

**Encadenar scripts: seqüencial i paral·lel**

| {  "scripts": {    // Seqüencial (&&): s'atura si falla algun pas    "ci": "npm run lint && npm run test:ci && npm run build",    // Paral·lel (&): tots alhora (únicament Unix)    "dev": "npm run server & npm run client",    // npm-run-all: multiplataforma (Windows \+ Unix)    "build": "run-s clean compile minify",  // seqüencial    "dev":   "run-p server client",          // paral·lel  }} |
| :---- |

| \# Instal·lar npm-run-all per compatibilitat entre plataformesnpm install npm-run-all \--save-dev |
| :---- |

Per a compatibilitat cross-platform, fent servir eines com cross-env, pots escriure scripts que s'adapten i s'executen sense problemes, tant en Unix, Windows o altres plataformes.

**Passar arguments als scripts**

Tot el que poses després de \-- es passa com a string a la comanda especificada.

| npm test \-- \--verbosenpm test \-- \--testPathPattern=authnpm run build \-- \--mode productionnpm run lint \-- \--fix |
| :---- |

**El sistema de scripts complet d'un projecte professional**

| {  "scripts": {    "start":           "node dist/server/index.js",    "dev":             "concurrently \\"npm run dev:server\\" \\"npm run dev:client\\"",    "dev:server":      "nodemon server/index.js",    "dev:client":      "vite",    "build":           "run-s build:clean build:client build:server",    "build:clean":     "rm \-rf dist",    "build:client":    "vite build",    "build:server":    "tsc \-p server/tsconfig.json",    "prebuild":        "npm run lint && npm run typecheck",    "test":            "jest",    "test:watch":      "jest \--watch",    "test:coverage":   "jest \--coverage",    "test:ci":         "jest \--ci \--coverage \--watchAll=false",    "pretest":         "npm run lint",    "lint":            "eslint . \--ext .ts,.tsx,.js,.jsx",    "lint:fix":        "npm run lint \-- \--fix",    "format":          "prettier \--write .",    "typecheck":       "tsc \--noEmit",    "validate":        "run-p lint typecheck test",    "ci":              "npm run lint && npm run test:ci && npm run build",    "prepare":         "husky install",    "debug":           "node \--inspect src/index.js",    "debug:break":     "node \--inspect-brk src/index.js"  },  "devDependencies": {    "concurrently":   "^8.0.0",    "npm-run-all":    "^4.1.5",    "cross-env":      "^7.0.0"  }} |
| :---- |

**Bones pràctiques recomanades**

Usa cross-env per a les variables d'entorn (compatibilitat multiplataforma). Documenta els scripts al README. Usa hooks pre/post per a setup i cleanup. Extreu la lògica complexa a fitxers de script separats.

No prefixis les teves comandes de script amb "sudo". Si es requereixen permisos de root per alguna raó, fallarà amb aquell error, i l'usuari farà sudo a la comanda npm en qüestió. No uses install si pots evitar-ho. Per a compilació, usa un fitxer .gyp, i per a qualsevol altra cosa usa prepublish. Gairebé mai hauries de necessitar definir explícitament un script install o preinstall.

**La taula de referència ràpida**

| Comanda | Quan s'executa |
| ----- | ----- |
| preinstall | Abans d'instal·lar el paquet |
| postinstall | Després d'instal·lar el paquet |
| prepare | Després de npm install, abans de publish |
| prepublishOnly | Únicament abans de npm publish |
| preversion | Abans de canviar la versió |
| version | En canviar la versió |
| postversion | Després de canviar la versió |
| pretest | Automàticament abans de npm test |
| posttest | Automàticament després de npm test |
| prebuild | Automàticament abans de npm run build |
| postbuild | Automàticament després de npm run build |
| pre\<NOM\> | Abans de qualsevol npm run \<NOM\> |
| post\<NOM\> | Després de qualsevol npm run \<NOM\> |

