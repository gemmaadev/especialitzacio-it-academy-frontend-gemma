## **Apunts tema 5: Desplegament d'aplicacions web**

## **1\. Per què cal desplegar: entorns i riscos**

Tenir una aplicació funcionant en local no és suficient. Cal que sigui accessible online per als usuaris reals. 

Però desplegar directament a producció sense entorns de prova intermitjos és arriscat: canvis no provats poden introduir errors que afecten usuaris reals, les migracions de base de dades poden corrompre dades, i les vulnerabilitats de seguretat arriben sense filtres.

**Els tres entorns estàndard:**

* **Development** — l'entorn local de cada developer. Canvis freqüents, dades de test, sense restriccions.  
* **Staging** — rèplica de producció però sense usuaris reals. L'últim filtre: si falla aquí, no arriba a producció. Usa dades anominitzades però realistes.  
* **Production** — el sistema en viu. Usuaris reals, dades reals, màxima estabilitat i seguretat. Cap canvi arriba aquí sense passar per staging.

La regla: el flux sempre és `dev → staging → producció`. Mai s'atura directament a producció tret d'emergències crítiques.

**2\. Models d'Hosting: Shared, VPS i Serverless**

* **Shared Hosting** — múltiples llocs web comparteixen el mateix servidor físic. El més econòmic (2-10€/mes), però sense control sobre el servidor i amb risc de l'efecte veí sorollós. Ideal per a blogs, portfolis i llocs de baix tràfic. No suporta Node.js personalitzat ni configuració de servidor.  
* **VPS (Virtual Private Server)** — servidor virtual amb recursos dedicats. El propietari té accés root, pot instal·lar qualsevol cosa, configurar Nginx, gestionar la base de dades. Preu de 5-100€/mes. Requereix coneixements de Linux. Ideal per a aplicacions amb tràfic estable i equips amb coneixements de sistemes.  
* **Serverless** — el proveïdor cloud gestiona tota la infraestructura. Pagues únicament per execució de funcions, no per servidor actiu. Escalabilitat automàtica i instantània. El problema: cold starts (retard inicial quan una funció no s'ha usat), costos imprevisibles si el tràfic puja molt, i vendor lock-in. Ideal per a APIs event-driven, funcions que s'executen sota demanda i tràfic variable.

Per a la majoria de projectes de frontend moderns, les plataformes com **Vercel** o **Netlify** abstreu totes aquestes decisions: serverless per defecte, zero configuració de servidor, SSL automàtic.

**3\. SSL i HTTPS: per qué és obligatori**

SSL/TLS xifra totes les comunicacions entre el servidor i l'usuari. Sense SSL, les dades viatgen en text pla i qualsevol intermediari les pot llegir. Amb HTTPS, les dades són il·legibles per a tercers.

Els motius per tenir-lo sempre: seguretat (contrasenyes i dades protegides), confiança (els navegadors mostren "No segur" sense SSL), SEO (Google penalitza els llocs sense HTTPS) i rendiment (HTTP/2 únicament funciona sobre HTTPS).

**Let's Encrypt** és l'Autoritat de Certificació gratuïta que ha democratitzat SSL. Emet certificats DV (Domain Validation) gratuïts, automàtics i renovables. En un VPS s'obté amb Certbot en dues comandes:

| sudo apt install certbot python3-certbot-nginxsudo certbot \--nginx \-d exemple.com \-d www.exemple.com |
| :---- |

Certbot configura Nginx automàticament i programa la renovació automàtica cada 60 dies. En plataformes com Vercel, Netlify o Render, el SSL es configura automàticament quan connectes el domini: zero configuració.

**4\. El Build Process: de codi font a producció**

El build process transforma el codi font (JSX, TypeScript, SCSS, imports ES6) en HTML, CSS i JavaScript que el navegador pot executar. Les operacions principals: transpilació (TypeScript → JavaScript, JSX → JS), bundling (combina centenars de fitxers en pocs), tree-shaking (elimina codi no usat), minificació (elimina espais i acurta noms) i code splitting (carrega codi sota demanda).

**Webpack** — el veterà (2012). Bundle-first: processa tot el codi i genera el bundle. Molt configurable via loaders i plugins. Lent en projectes grans però amb ecosistema madur. Estàndard en projectes legacy i Next.js.

**Vite** — el modern (2020). ESM-first en development: no fa bundling, serveix els fitxers directament al navegador usant mòduls ES natius. Inici instantani i HMR molt ràpid. En producció usa Rollup per generar builds optimitzats. L'estàndard actual per a projectes nous amb React, Vue o Svelte.

| npm run dev      \# servidor de desarrollo (Vite: instantani)npm run build    \# genera la carpeta /dist per a producciónpm run preview  \# previsualitza el build localment |
| :---- |

**5\. Pipeline CI/CD: testeig, construcció i desplegament**

CI/CD automatitza el procés de verificar i lliurar el codi. CI (Integració Contínua) executa tests i checks en cada push. CD (Desplegament Continu) desplega automàticament si tots els checks passen.

**GitHub Actions** és l'eina estàndard: workflows en YAML a `.github/workflows/`, s'activen amb events (push, PR), executen jobs en màquines virtuals de GitHub i l'ús bàsic és gratuït.

| name: CI/CD Pipelineon:  push:    branches: \[main\]  pull\_request:    branches: \[main\]jobs:  test:    runs-on: ubuntu-latest    steps:      \- uses: actions/checkout@v4      \- uses: actions/setup-node@v4        with: { node-version: '20', cache: 'npm' }      \- run: npm ci      \- run: npm run lint      \- run: npm test  build:    needs: test          \# únicament si test passa    runs-on: ubuntu-latest    steps:      \- uses: actions/checkout@v4      \- uses: actions/setup-node@v4        with: { node-version: '20', cache: 'npm' }      \- run: npm ci      \- run: npm run build  deploy:    needs: build                                      \# únicament si build passa    if: github.ref \== 'refs/heads/main'              \# únicament en main    runs-on: ubuntu-latest    steps:      \- uses: actions/checkout@v4      \- run: npx vercel \--prod        env:          VERCEL\_TOKEN: ${{ secrets.VERCEL\_TOKEN }}  \# mai al codi |
| :---- |

El principi clau: els jobs s'encadenen amb `needs`. Si test falla, build no s'executa. Si build falla, deploy no s'executa. És impossible desplegar codi trencat.

**6\. Docker: consistència garantida**

Docker empaqueta el codi, les dependències i la configuració en un contenidor. La promesa: el contenidor que funciona en local funciona idènticament a producció.

**El Dockerfile essencial:**

| FROM node:20\-alpineWORKDIR /appCOPY package\*.json ./RUN npm ciCOPY . .RUN npm run buildEXPOSE 3000CMD \["node", "server.js"\] |
| :---- |

**Les comandes bàsiques:**

| docker build \-t nom-app .        \# construir la imagedocker run \-p 3000:3000 nom-app  \# executar el contenidordocker ps                        \# llistar contenidors actiusdocker compose up                \# arrencar múltiples serveisdocker compose down              \# aturar tot |
| :---- |

**Docker Compose** és la clau per al desenvolupament local: en un fitxer `docker-compose.yml` defineixes l'app, la base de dades i la caché. 

Amb `docker compose up` tens tot funcionant en pocs segons, sense instal·lar PostgreSQL ni Redis localment. El benefici més gran: qualsevol persona de l'equip pot executar l'entorn complet amb una sola comanda.

**7\. Plataformes de desplegament: quina triar**

**Per a frontend (estàtic o SPA):**

* **Vercel** — la millor opció per a Next.js, React, Vite. Desplegament automàtic des de GitHub, preview deployments per a cada PR, serverless functions integrades, SSL automàtic. Pla gratuït generós. Fix necessari per a SPAs: crear `vercel.json` amb rewrites.  
* **Netlify** — equivalent a Vercel. Drag-and-drop per a desplegaments ràpids, funcions serverless, formularis gestionats. Excel·lent per a JAMstack.  
* **GitHub Pages** — completament gratuït, integrat amb GitHub. Únicament per a llocs estàtics. Perfecte per a portfolis i documentació.  
* **Cloudflare Pages** — CDN global de Cloudflare. Excel·lent rendiment internacional.

**Per a backends i full-stack:**

* **Render** — l'alternativa moderna a Heroku. Suporta Node.js, Python, Docker, PostgreSQL. Tier gratuït (amb cold start).  
* **Railway** — molt senzill de configurar. Backends i bases de dades. Preu basat en ús real.  
* **Fly.io** — contenidors Docker en múltiples regions. Baxa latència global.

**Per a infraestructura empresarial:**

* **AWS, Azure, Google Cloud** — màxim control i escalabilitat. Alta corba d'aprenentatge. Per a equips grans amb necessitats específiques.

**8\. Errors comuns i com prevenir-los**

* **Dependències mancants** — el servidor no té instal·lats els paquets. Solució: usar `npm ci` (instal·la exactament el que indica el lockfile), verificar que `node_modules/` no estigui al repositori però `package-lock.json` sí, i comprovar que els paquets necessaris per al build estan a `dependencies` i no a `devDependencies`.  
* **Variables d'entorn no configurades** — l'app llegeix `undefined` en lloc de les claus d'API. Solució: aplicar Fail Fast validant totes les variables crítiques a l'inici de l'app, mantenir un `.env.example` al repositori (sense valors reals) com a documentació, i configurar les variables reals a la plataforma de desplegament o als Secrets de GitHub Actions.  
* **Errors de permisos (EACCES)** — l'usuari no té permisos per escriure en directoris del servidor o per obrir ports inferiors a 1024\. Solució: mai usar `sudo` amb npm, usar NVM per gestionar Node.js, posar l'app en un port alt (3000, 8080\) i usar Nginx com a reverse proxy per al port 80\.

**9\. Verificacions post-desplegament**

Quan el desplegament acaba, cal verificar que tot funciona correctament:

**Health check** — petició a un endpoint que verifica que el servidor respon:

| // Endpoint mínim de health checkapp.get('/health', (req, res) \=\> {  res.json({ status: 'ok', timestamp: new Date().toISOString() });}); |
| :---- |

**Checklist post-desplegament:** verificar que la URL de producció carrega correctament, que el certificat SSL és vàlid (cadenat verd), que les variables d'entorn estan configurades (l'app es connecta a la BD), que els logs no mostren errors crítics, i que les funcionalitats principals funcionen (login, carret, etc.).

**El flux complet del desplegament professional**

| Developer escriu codi en local          ↓git push → GitHub          ↓GitHub Actions s'activa automàticament  ├── Lint (ESLint)  ├── Tests unitaris  └── Build de producció          ↓ Si tot passa ✅Desplegament (Vercel / Render / Docker)          ↓Verificació post-desplegament  ├── Health check endpoint  ├── Verificar SSL  └── Testar funcionalitats crítiques          ↓🚀 Aplicació en producció per als usuaris |
| :---- |

**Resum** 

| Situació | Recomanació |
| ----- | ----- |
| Portfolio / lloc estàtic | GitHub Pages (gratuït) |
| SPA React/Vue/Vite | Vercel o Netlify (gratuït) |
| Backend Node.js / API | Render o Railway |
| Full-stack amb BD | Render \+ PostgreSQL |
| Necessita consistència d'entorns | Docker \+ Docker Compose |
| Automatitzar tests i desplegament | GitHub Actions |
| HTTPS gratuït en VPS | Certbot \+ Let's Encrypt |
| Entorn de proves complet | Dev → Staging → Producció |

