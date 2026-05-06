## **Comandes essencials de Git i NPM per al dia a dia**

**NPM: Gestió de Dependències**

### **Inicialitzar i configurar un projecte**

| npm init          \# crea package.json pas a pas (fa preguntes)npm init \-y       \# crea package.json amb valors per defecte (sense preguntes) |
| :---- |

### **Instal·lar dependències**

| \# Instal·lar totes les dependències del package.jsonnpm install       \# (o npm i)\# Instal·lar exactament les versions del package-lock.json (per a CI/CD)npm ci            \# determinista: garanteix el mateix resultat sempre\# Instal·lar un paquet nounpm install express           \# → afegit a "dependencies"npm install jest \--save-dev   \# → afegit a "devDependencies" (no va a producció)npm install \-g nodemon        \# → instal·lació global (accessible arreu)\# Instal·lar una versió específicanpm install react@18.2.0 |
| :---- |

Per evitar diferències en les dependències instal·lades en entorns diferents i per generar els mateixos resultats en cada entorn, hauries d'usar el fitxer `package-lock.json` per instal·lar dependències. Idealment, aquest fitxer hauria d'estar al control de versions juntament amb el `package.json`.

### **Eliminar i actualitzar paquets**

| npm uninstall express           \# elimina el paquet i l'elimina del package.jsonnpm update                      \# actualitza tots els paquets (dins del rang del package.json)npm update express              \# actualitza un paquet concretnpm outdated                    \# llista els paquets desactualitzats |
| :---- |

### **Inspeccionar dependències instal·lades**

| npm list                  \# arbre complet de dependènciesnpm list \--depth=0        \# únicament les dependències directes (sense les seves deps)npm list \--global         \# paquets instal·lats globalmentnpm list nompaquet        \# comprova si un paquet específic és instal·lat |
| :---- |

### **Seguretat: detectar vulnerabilitats**

| npm audit                 \# mostra les vulnerabilitats conegudes de les dependenciesnpm audit fix             \# intenta corregir les vulnerabilitats automàticamentnpm audit fix \--force     \# forçar correccions (pot trencar coses, usar amb precaució) |
| :---- |

La comanda `npm audit` s'usa per identificar vulnerabilitats de seguretat conegudes en les dependències del projecte.

**NPM: Scripts i Automatització**

Al fitxer `package.json` pots definir scripts personalitzats que executen comandes específiques.

| // package.json \-- exemples de scripts{  "scripts": {    "start":    "node index.js",    "dev":      "vite",    "build":    "vite build",    "preview":  "vite preview",    "test":     "jest",    "test:watch": "jest \--watch",    "test:coverage": "jest \--coverage",    "lint":     "eslint src/",    "lint:fix": "eslint src/ \--fix",    "format":   "prettier \--write src/"  }} |
| :---- |

| npm run dev             \# arrenca el servidor de developmentnpm run build           \# fa el build de producciónpm test                \# executa els tests (shorthand, sense "run")npm run test:watch      \# tests en mode watch (re-executa quan canvia codi)npm run test:coverage   \# tests amb informe de coberturanpm run lint            \# comprova errors d'estilnpm run lint:fix        \# corregeix errors d'estil automàticament |
| :---- |

### **Passar arguments als scripts**

| \# \-- separa els arguments del npm dels arguments del scriptnpm test \-- \--verbose              \# passa \--verbose a jestnpm run build \-- \--mode production \# passa l'argument al bundler |
| :---- |

**Git: el flux essencial del dia a dia**

### **Inicialitzar i connectar**

| git init                          \# converteix una carpeta en repositori Gitgit clone URL                     \# clona un repositori remotgit remote add origin URL         \# connecta un repositori local al remotgit remote \-v                     \# mostra els remots configurats |
| :---- |

### **Estat i historial**

| git status                        \# mostra l'estat dels fitxers (modified, staged, untracked)git log                           \# historial complet de commitsgit log \--oneline                 \# historial complet, una línia per commitgit log \--oneline \-10             \# els darrers 10 commitsgit diff                          \# canvis no preparats (unstaged)git diff \--staged                 \# canvis preparats per al commit (staged) |
| :---- |

### **El flux bàsic de treball**

| git pull                          \# baixa i integra els canvis del remotgit checkout \-b feature/nova      \# crea una branca nova i hi va\# \[fas canvis al codi\]git add .                         \# prepara tots els canvis per al commitgit add fitxer.js                 \# prepara un fitxer concretgit commit \-m "feat: descripció"  \# crea el commit amb missatge descriptiugit push origin feature/nova      \# puja la branca al remot |
| :---- |

### **Branques**

| git branch                        \# llista les branques localsgit branch \-a                     \# llista totes les branques (locals i remotes)git checkout main                 \# canvia a la branca maingit checkout \-b nom-branca        \# crea i canvia a una branca novagit merge nom-branca              \# fusiona una branca a l'actualgit branch \-d nom-branca          \# elimina una branca local (si ja ha estat fusionada)git push origin \--delete branca   \# elimina una branca al remot |
| :---- |

### **Desfer canvis**

| git restore fitxer.js             \# descarta canvis no preparats d'un fitxergit restore \--staged fitxer.js    \# elimina un fitxer de l'àrea staging (sense eliminar canvis)git revert HEAD                   \# crea un nou commit que desfà l'últim commitgit reset \--soft HEAD\~1           \# desfà l'últim commit però conserva els canvis stagedgit reset \--hard HEAD\~1           \# desfà l'últim commit i descarta els canvis (⚠️ irreversible) |
| :---- |

### 

### **Debugging amb Git**

| git bisect start                  \# inicia la cerca binària del commit problemàticgit bisect bad                    \# marca el commit actual com a dolentgit bisect good v1.0.0            \# marca un commit antic com a bogit bisect reset                  \# acaba la sessió de bisectgit blame fitxer.js               \# mostra qui ha escrit cada línia del fitxergit log \-S "text buscat"          \# cerca tots els commits que han afegit o eliminat un textgit log \--all \--grep="paraula"    \# cerca commits per missatgegit stash                         \# guarda els canvis temporalment (sense commit)git stash pop                     \# recupera els canvis guardats |
| :---- |

Per trobar el commit que va introduir un bug, usa `git bisect`. Fa una cerca binària a través de l'historial de commits, comprovant commits entre un commit "bo" i un de "dolent" per trobar el problema.

**La combinació Git \+ NPM en el flux de treball**

| \# Clonar un projecte i posar-lo en marxagit clone https://github.com/usuari/projecte.gitcd projectenpm ci                    \# instal·la les dependències exactes del lockfilenpm run dev               \# arrenca el servidor de development\# Treballar en una nova funcionalitatgit checkout \-b feature/login\# \[escriu codi\]npm run lint              \# comprova l'estilnpm test                  \# executa els testsnpm run build             \# verifica que el build funcionagit add .git commit \-m "feat: afegeix formulari de login"git push origin feature/login |
| :---- |

**Taula resum de les comandes més importants**

| Comanda | Fa... |
| ----- | ----- |
| `npm ci` | Instal·la exactament les versions del lockfile (per a CI/CD) |
| `npm install paquet` | Instal·la i afegeix a `dependencies` |
| `npm install paquet --save-dev` | Instal·la i afegeix a `devDependencies` |
| `npm outdated` | Llista paquets desactualitzats |
| `npm audit` | Detecta vulnerabilitats de seguretat |
| `npm run test` | Executa els tests |
| `npm run lint` | Comprova l'estil del codi |
| `git status` | Mostra l'estat del repositori |
| `git log --oneline` | Historial de commits resumit |
| `git checkout -b` | Crea i canvia a una branca nova |
| `git stash` | Guarda canvis temporalment |
| `git bisect` | Troba el commit que va introduir un bug |
| `git blame` | Mostra qui ha escrit cada línia |

 

