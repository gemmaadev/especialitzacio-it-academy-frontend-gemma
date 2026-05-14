## **ESLint Security Rules: `eslint-plugin-security`**

###### **ESLint Security Rules** [*https://github.com/eslint-community/eslint-plugin-security*](https://github.com/eslint-community/eslint-plugin-security) Plugin d’ESLint amb regles per millorar la seguretat del codi JavaScript.

**Què és i per quèexisteix**

L'`eslint-plugin-security` integra amb ESLint per detectar vulnerabilitats de seguretat comunes en codi JavaScript i Node.js. 

El plugin proporciona 14 regles de seguretat que identifiquen vectors d'atac potencials incloent injecció de codi, vulnerabilitats del sistema de fitxers, i patrons de codificació insegurs.

Aquest projecte ajuda a identificar hotspots de seguretat potencials, però troba molts falsos positius que necessiten revisió humana.

La idea central: és una eina **SAST** (Static Application Security Testing) que s'integra directament al flux de treball de l'editor i el CI/CD. Detecta patrons de codi insegurs mentre el developer escriu, no quan el codi ja és a producció.

**Instal·lació i configuració**

| npm install \--save-dev eslint-plugin-security |
| :---- |

**Configuració moderna (ESLint flat config, eslint.config.js):**

| // eslint.config.jsimport security from 'eslint-plugin-security';export default \[  security.configs.recommended,  // o configuració personalitzada:  {    plugins: { security },    rules: {      'security/detect-eval-with-expression': 'error',      'security/detect-unsafe-regex': 'error',      'security/detect-non-literal-fs-filename': 'warn',      'security/detect-object-injection': 'warn',    }  }\]; |
| :---- |

| Configuració legacy (.eslintrc.json):{  "plugins": \["security"\],  "extends": \["plugin:security/recommended"\]} |
| :---- |

Aquesta configuració habilita les 14 regles de seguretat amb nivell de severitat `warn`, tal com es defineix a l'objecte de configuració recomanat.

**Les 14 regles de seguretat: categories i exemples**

### **Categoria 1: Injecció de codi**

**`detect-eval-with-expression`** — la regla més crítica.

Detecta `eval(variable)` que pot permetre a un atacant executar codi arbitrari dins del procés.

| // ❌ Detectat per la regla: eval amb variableconst userInput \= req.body.code;eval(userInput);  // ← CRITICAL: Remote Code Execution\!// ❌ Detectat: Function constructor amb variableconst fn \= new Function(userInput);// ✅ Correcte: eval amb literal (no és vulnerable)eval('2 \+ 2');  // ← no marcat (constant, no variable) |
| :---- |

**`detect-non-literal-require`** — càrrega dinàmica de mòduls.

Detecta `require(variable)`, que pot permetre a un atacant carregar i executar codi arbitrari, o accedir a fitxers arbitraris del disc.

| // ❌ Detectat: require dinàmicconst module \= require(userInput);      // ← pot carregar qualsevol fitxer\!const plugin \= require('./plugins/' \+ pluginName);  // ← path traversal\!// ✅ Correcte: require amb literalconst express \= require('express'); |
| :---- |

**Categoria 2: Sistema de fitxers**

**`detect-non-literal-fs-filename`** — accés insegur al sistema de fitxers.

Detecta variable en l'argument de nom de fitxer de les crides `fs`, que pot permetre a un atacant accedir a qualsevol cosa al sistema.

| import fs from 'fs';// ❌ Detectat: nom de fitxer dinàmicconst filename \= req.query.file;fs.readFile(filename, 'utf8', callback);  // ← Path Traversal Attack\!// Atacant pot enviar: "../../../etc/passwd"// ✅ Correcte: nom de fitxer literal o validatconst allowedFiles \= \['config.json', 'data.json'\];if (\!allowedFiles.includes(req.query.file)) {  return res.status(400).send('Fitxer no permès');}fs.readFile(\`./data/${req.query.file}\`, 'utf8', callback); |
| :---- |

**Categoria 3: Expressions regulars perilloses**

**`detect-unsafe-regex`** — ReDoS (Regular Expression Denial of Service).

Localitza expressions regulars potencialment insegures, que poden trigar molt de temps en executar-se, bloquejant l'event loop.

| // ❌ Detectat: regex susceptible a ReDoS (backtracking catastròfic)const regex \= /^(a+)+$/;              // ← ReDoS: exp. quadràticaconst regex2 \= /(a|aa)+$/;            // ← ReDoS: backtracking excessiuconst regex3 \= /(\[a-zA-Z\]+)\*$/;       // ← ReDoS: nesteig// L'atacant envia: "aaaaaaaaaaaaaaaaaaaaaaab"// La regex triga minuts/hores → el servidor queda bloquejat// ✅ Correcte: regex sense backtracking catastròficconst regex \= /^\[a-zA-Z\]+$/; |
| :---- |

**`detect-non-literal-regexp`** — regex construïda dinàmicament.

Detecta `RegExp(variable)`, que pot permetre a un atacant fer DoS al servidor amb una expressió regular de llarga execució.

| // ❌ Detectat: RegExp amb variable d'usuariconst pattern \= req.query.search;const regex \= new RegExp(pattern);    // ← RegExp injection \+ ReDoS\!// ✅ Correcte: validar i escapar l'inputimport { escapeRegExp } from 'lodash';const safePattern \= escapeRegExp(req.query.search);const regex \= new RegExp(safePattern); |
| :---- |

**Categoria 4: Vulnerabilitats de Node.js**

**`detect-child-process`** — execució de comandes del sistema.

Detecta instàncies de `child_process` i crides `exec()` no literals.

| import { exec } from 'child\_process';// ❌ Detectat: execució de comanda amb variableexec(\`ls \-la ${req.body.directory}\`);  // ← Command Injection\!// Atacant pot enviar: "; rm \-rf /"// ✅ Correcte: usar execFile amb arguments separats (no exec)import { execFile } from 'child\_process';execFile('ls', \['-la', req.body.directory\], callback);// Els arguments s'escapen automàticament |
| :---- |

**`detect-pseudoRandomBytes`** — generació de nombres aleatoris feble.

| // ❌ Detectat: generador de nombres pseudoaleatoris no criptogràficimport crypto from 'crypto';const token \= crypto.pseudoRandomBytes(16);  // ← obsolet i feble// ✅ Correcte: generador criptogràficament segurconst token \= crypto.randomBytes(16); |
| :---- |

**`detect-buffer-noassert`** — accés a Buffer sense validació.

Detecta crides a `buffer` amb el flag `noAssert` activat.

| // ❌ Detectat: buffer sense validació de límitsconst buf \= Buffer.allocUnsafe(size);buf.readUInt32BE(offset, true);  // ← 'true' \= noAssert, pot llegir memòria arbitrària// ✅ Correcte: sense noAssertbuf.readUInt32BE(offset); |
| :---- |

**Categoria 5: Injecció en objectes**

**`detect-object-injection`** — prototype pollution.

| // ❌ Detectat: accés a propietat d'objecte amb clau de l'usuariconst obj \= {};const key \= req.body.key;const value \= obj\[key\];  // ← Prototype Pollution si key \= "\_\_proto\_\_"// Atacant pot enviar: key \= "\_\_proto\_\_", value \= {admin: true}// → afecta TOTS els objectes de l'aplicació\!// ✅ Correcte: validar la clau o usar Mapconst allowedKeys \= \['nom', 'email', 'edat'\];if (\!allowedKeys.includes(key)) {  throw new Error('Clau no permesa');}const value \= obj\[key\];// O usar Map que no té prototype:const map \= new Map();map.get(key);  // ← segur |
| :---- |

**Categoria 6: Template Engines i CSRF**

**`detect-disable-mustache-escape`**

Detecta `object.escapeMarkup = false`, que pot ser usat amb alguns template engines per deshabilitar l'escapament de les entitats HTML.

| // ❌ Detectat: deshabilita l'escapament HTML → XSSapp.set('view options', { escapeMarkup: false }); |
| :---- |

**`detect-no-csrf-before-method-override`**

Detecta la configuració del middleware CSRF d'Express abans del middleware `method-override`.

| // ❌ Ordre incorrecte: CSRF abans de method-override → bypassapp.use(csrf());app.use(methodOverride());// ✅ Ordre correcte:app.use(methodOverride());app.use(csrf()); |
| :---- |

**Categoria 7: Timing Attacks**

**`detect-possible-timing-attacks`** — comparació de strings insegura.

| // ❌ Detectat: comparació de secrets amb \==  (timing attack)if (req.body.token \== process.env.SECRET\_TOKEN) { }if (token \=== expectedToken) { }// La durada de la comparació revela quants caràcters coincideixen\!// ✅ Correcte: comparació en temps constantimport crypto from 'crypto';const isValid \= crypto.timingSafeEqual(  Buffer.from(token),  Buffer.from(expectedToken)); |
| :---- |

**`detect-bidi-characters`** — atacs Trojan Source.

Detecta atacs de trojan source que empren atacs unicode bidi per injectar codi maliciós.

| // ❌ Caràcters bidi invisibles que inverteixen l'ordre visual del codi// El que veu el developer: if (user.isAdmin) { /\* comentari \*/ }// El que executa el motor: if (user.isAdmin) { /\* codi maliciós amagat \*/ } |
| :---- |

**Integració al CI/CD: configuració recomanada**

| // package.json \-- scripts recomanats{  "scripts": {    "lint":          "eslint src/",    "lint:security": "eslint src/ \--rule 'security/\*: error'",    "lint:ci":       "eslint src/ \--max-warnings 0"  }} |
| :---- |

| \# .github/workflows/security.ymlname: Security Lintingon: \[pull\_request\]jobs:  security:    runs-on: ubuntu-latest    steps:      \- uses: actions/checkout@v4      \- run: npm ci      \- run: npm run lint:security      \# ← Si hi ha cap regla de seguretat → el pipeline falla |
| :---- |

**Resum: les 14 regles per categoria**

| Categoria | Regla | Vulnerabilitat detectada |
| ----- | ----- | ----- |
| **Injecció codi** | `detect-eval-with-expression` | Remote Code Execution via eval |
| **Injecció codi** | `detect-non-literal-require` | Càrrega arbitrària de mòduls |
| **Sistema fitxers** | `detect-non-literal-fs-filename` | Path Traversal |
| **Regex** | `detect-unsafe-regex` | ReDoS (Denial of Service) |
| **Regex** | `detect-non-literal-regexp` | RegExp injection \+ ReDoS |
| **Node.js** | `detect-child-process` | Command Injection |
| **Node.js** | `detect-pseudoRandomBytes` | Aleatorietat criptogràfica feble |
| **Node.js** | `detect-buffer-noassert` | Lectura de memòria arbitrària |
| **Objectes** | `detect-object-injection` | Prototype Pollution |
| **Templates** | `detect-disable-mustache-escape` | XSS via template engine |
| **CSRF** | `detect-no-csrf-before-method-override` | CSRF bypass |
| **Timing** | `detect-possible-timing-attacks` | Timing Attack en comparació |
| **Bidi** | `detect-bidi-characters` | Trojan Source Attack |
| **Buffer** | `detect-new-buffer` | Buffer insegur sense mida |

