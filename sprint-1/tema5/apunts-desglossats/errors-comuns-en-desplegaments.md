## **Errors més comuns en desplegaments**

**Per què fallen els desplegaments?**

Un desplegament és el moment on totes les suposicions sobre l'entorn es posen a prova. El codi funcionava perfectament en local, però producció és un servidor diferent, amb un sistema operatiu diferent, potser amb una versió de Node.js diferent, sense les variables d'entorn del fitxer `.env` local, i amb restriccions de permisos que no existien en local. Conèixer les categories d'error més freqüents permet diagnosticar i solucionar els problemes ràpidament en lloc de perdre hores a les fosques.

**Error 1: Dependències mancants**

### **La causa**

Les dependències mancants ocorren quan el servidor de producció no té instal·lades les mateixes biblioteques que uses en local. La causa més freqüent: pujar `node_modules/` al `.gitignore` (correcte) però oblidar executar `npm install` al servidor, o tenir dependències en `devDependencies` que necessites en producció.

| \# Error típic a la consolaError: Cannot find module 'express'Error: Cannot find module '@/components/Button'Module not found: Error: Can't resolve 'lodash' |
| :---- |

### **Les variants del problema**

**`devDependencies` en producció** — quan executes `npm install --production` (o `NODE_ENV=production`), npm únicament instal·la les `dependencies`, no les `devDependencies`. Si necessites una biblioteca en el build de producció, ha d'estar a `dependencies`, no a `devDependencies`.

| {  "dependencies": {    "express": "^4.18.0",      // ✅ instal·lat en producció    "react": "^18.0.0"         // ✅ instal·lat en producció  },  "devDependencies": {    "eslint": "^8.0.0",        // ❌ NO instal·lat en producció    "vite": "^5.0.0"           // ⚠️ necessari per al build\!  }} |
| :---- |

**Versions incompatibles** — el `package.json` especifica `"node": ">=18"` però el servidor té Node 16\. O una dependència requereix una versió específica d'una biblioteca que xoca amb una altra.

**`package-lock.json` no pujat al repositori** — sense el lockfile, `npm install` pot instal·lar versions lleugerament diferents de les que funcionaven en local.

### **La solució**

| \# En producció: sempre usar npm ci (instal·la exactament el que diu el lockfile)npm ci                    \# instal·la les dependències exactes del lockfilenpm ci \--omit=dev         \# idem però sense devDependencies\# Verificar la versió de Node al servidornode \--version\# Verificar quines dependències estan instal·ladesnpm list \--depth=0 |
| :---- |

**Error 2: Variables d'entorn no configurades**

### **La causa**

Les variables d'entorn són valors externs que l'aplicació llegeix en temps d'execució: credencials de base de dades, claus d'API, URLs de serveis, etc. En local, les tens en un fitxer `.env`. En producció, el fitxer `.env` **no existeix ni ha d'existir** (és un risc de seguretat pujar-lo al repositori). Si ningú ha configurat les variables al servidor, l'aplicació les llegeix com `undefined`.

| // L'error clàssic en Node.jsconst dbUrl \= process.env.DATABASE\_URL;  // → undefinedconst connection \= conectar(dbUrl);       // → falla silenciosament o amb error críptic// Error al iniciar l'app a producció:// Error: connect ECONNREFUSED undefined:5432// TypeError: Cannot read property 'split' of undefined |
| :---- |

La variant més perillosa és quan l'aplicació arrenca sense error però usa valors `undefined` que causen comportaments estranys més endavant.

### **Aplicar Fail Fast: detectar variables mancants a l'inici**

La millor pràctica és validar totes les variables d'entorn necessàries quan l'aplicació arrenca, i aturar-la immediatament si en manca alguna:

| // config.js \-- valida la configuració a l'inicifunction validarConfiguracio() {  const requerides \= \[    'DATABASE\_URL',    'JWT\_SECRET',    'STRIPE\_API\_KEY',    'REDIS\_URL',  \];  const mancants \= requerides.filter(variable \=\> \!process.env\[variable\]);  if (mancants.length \> 0) {    console.error('❌ Variables d\\'entorn mancants:');    mancants.forEach(v \=\> console.error(\`   \- ${v}\`));    console.error('Comprova la configuració del servidor o el fitxer .env');    process.exit(1);   // ← atura l'app immediatament  }  return {    dbUrl: process.env.DATABASE\_URL,    jwtSecret: process.env.JWT\_SECRET,    stripeKey: process.env.STRIPE\_API\_KEY,  };}export const config \= validarConfiguracio(); |
| :---- |

### **On configurar les variables en producció**

| \# En un servidor Linux (VPS): afegir al fitxer .env del servidor\# o configurar com a variables del sistema\# Vercel: Settings → Environment Variables (interfície web)\# Netlify: Site settings → Environment variables\# Railway: Variables tab del projecte\# En un pipeline CI/CD (GitHub Actions):\# Settings del repositori → Secrets and variables → Actions\# I al YAML del workflow:env:  DATABASE\_URL: ${{ secrets.DATABASE\_URL }}  JWT\_SECRET: ${{ secrets.JWT\_SECRET }} |
| :---- |

### **El `.env.example`: documentar les variables necessàries**

Una bona pràctica és mantenir un fitxer `.env.example` al repositori (sense valors reals) que documenta totes les variables que l'aplicació necessita:

| \# .env.example (pujat al repositori)DATABASE\_URL=postgresql://user:password@host:5432/dbnameJWT\_SECRET=un-secret-molt-llarg-i-aleatoriSTRIPE\_API\_KEY=sk\_live\_...REDIS\_URL=redis://localhost:6379NEXT\_PUBLIC\_API\_URL=https://api.exemple.com |
| :---- |

| \# .env (mai pujat al repositori → afegir al .gitignore)DATABASE\_URL=postgresql://anna:abc123@localhost:5432/myapp\_devJWT\_SECRET=dev-secret-no-usar-en-produccio |
| :---- |

**Error 3: Problemes de permisos (EACCES / EPERM)**

### **La causa**

L'error EACCES ocorre quan una operació intenta accedir a un fitxer o recurs sense els permisos necessaris. És freqüent quan s'intenta llegir o modificar fitxers protegits, instal·lar paquets globals en directoris restringits, o executar servidors en ports inferiors a 1024\.

| \# Errors de permisos típicsError: EACCES: permission denied, access '/usr/local/lib/node\_modules'Error: EACCES: permission denied, open '/var/log/app.log'Error: EACCES: permission denied, bind 0.0.0.0:80listen EACCES: permission denied 0.0.0.0:80 |
| :---- |

### **Les tres variants principals**

**Permisos en instal·lació de paquets globals** — l'error EACCES de npm ocorre quan npm intenta instal·lar paquets globals en un directori que requereix permisos elevats. Això passa freqüentment quan Node.js o npm es van instal·lar amb privilegis de root.

| \# ❌ Mai usar sudo amb npm (crea problemes de permisos posteriors)sudo npm install \-g vite\# ✅ Solució: configurar npm per usar un directori de l'usuarinpm config set prefix \~/.npm-globalecho 'export PATH=\~/.npm-global/bin:$PATH' \>\> \~/.bashrcsource \~/.bashrcnpm install \-g vite   \# ara funciona sense sudo |
| :---- |

**Ports privilegiats (inferiors a 1024\)** — en Linux, únicament root pot obrir ports com el 80 (HTTP) o el 443 (HTTPS). L'aplicació Node.js ha d'escoltaar en un port alt (3000, 8080\) i usar un reverse proxy (Nginx) que redirigeixi el trànsit:

| \# ❌ Falla: Node.js no pot obrir el port 80 sense rootapp.listen(80);  \# → Error: EACCES: permission denied\# ✅ Solució: app en port alt \+ Nginx com a reverse proxyapp.listen(3000);   \# Node.js escolta al 3000\# Nginx redirigeix del port 80 al 3000:\# location / { proxy\_pass http://localhost:3000; } |
| :---- |

**Permisos de fitxers i carpetes** — l'usuari que executa l'aplicació al servidor no té permisos per escriure als logs, pujar fitxers o accedir a recursos:

| \# Veure permisos d'un directorils \-la /var/www/myapp/\# Canviar el propietari al usuari de l'appsudo chown \-R www-data:www-data /var/www/myapp/uploads/\# Donar permisos d'escripturachmod 755 /var/www/myapp/chmod 644 /var/www/myapp/config.json |
| :---- |

**Error 4: Incompatibilitat de versions**

El servidor de producció pot tenir una versió diferent de Node.js, Python o qualsevol runtime. El codi que usa sintaxi ES2022 fallarà en Node 14\.

| \# Comprovar la versió de Node al servidornode \--version\# Especificar la versió requerida al package.json{  "engines": {    "node": "\>=20.0.0"  }}\# Usar .nvmrc per fixar la versió del projecteecho "20" \> .nvmrcnvm use   \# usa automàticament la versió del .nvmrc |
| :---- |

**Error 5: Fitxers de build no generats**

L'aplicació intenta servir la carpeta `dist/` però ningú ha executat `npm run build` al servidor:

| \# Error típicError: ENOENT: no such file or directory, '/app/dist/index.html'\# Solució: incloure el build al pipeline CI/CDnpm run build    \# sempre abans del desplegament\# O verificar que el Dockerfile inclou el buildRUN npm run build |
| :---- |

**El Checklist de desplegament**

Abans de desplegar a producció, verificar:

| Comprovació | Comanda |
| ----- | ----- |
| Dependències instal·lades | `npm ci` |
| Build generat | `npm run build` |
| Variables d'entorn configurades | `printenv | grep APP_` |
| Tests passant | `npm test` |
| Permisos de carpetes | `ls -la /var/www/app/` |
| Port disponible | `netstat -tlnp | grep 3000` |
| Versió de Node correcta | `node --version` |
| Logs accessibles | `tail -f /var/log/app.log` |

