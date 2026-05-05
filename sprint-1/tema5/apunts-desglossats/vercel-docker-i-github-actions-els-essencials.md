## **Vercel, Docker i GitHub Actions: els essencials**

**Vercel Documentation**  
[https://vercel.com/docs](https://vercel.com/docs)  
Documentació oficial de Vercel per desplegar aplicacions modernes.

###### **Docker Getting Started**

[https://docs.docker.com/get-started/](https://docs.docker.com/get-started/)  
Guia oficial per començar amb Docker i contenidors.

###### **GitHub Actions Guide**

[https://docs.github.com/es/actions/tutorials](https://docs.github.com/es/actions/tutorials)  
Tutorials oficials de GitHub Actions per configurar fluxos de treball.

**Vercel: desplegar en un clic**

Vercel és la plataforma de desplegament de referència per a frameworks moderns de JavaScript. El seu model es basa en connectar el repositori de GitHub i deixar que Vercel gestioni la resta: detecta el framework automàticament, executa el build i desplega.

**El flux bàsic:**

| \# Opció 1: via interfície web\# 1\. Vas a vercel.com → "Add New Project"\# 2\. Importes el teu repositori de GitHub\# 3\. Vercel detecta automàticament Vite, Next.js, React...\# 4\. Configura Build Command i Output Directory\# 5\. Cliques "Deploy"\# Opció 2: via CLInpm install \-g vercelvercel          \# desplega des de la terminalvercel \--prod   \# desplega a producció |
| :---- |

**Frameworks suportats natívement:** Next.js (el seu framework natiu), SvelteKit, Nuxt, Remix, Astro, Vite, React, Express, NestJS i molts més.

**Les funcionalitats clau que cal conèixer:**

**Preview Deployments** — cada Pull Request genera automàticament una URL de previsualització única. Pots veure els canvis en viu abans de fusionar. Ideal per a code reviews que inclouen canvis visuals.

**Variables d'entorn** — vas a Settings → Environment Variables i defines les claus per a cada entorn (Development, Preview, Production). Mai les poses al codi.

**Domini personalitzat** — a Settings → Domains connectes el teu domini (comprat a Namecheap, GoDaddy, etc.) i Vercel configura el certificat SSL automàticament.

**Fix essencial per a SPAs amb routing:**

| // vercel.json \-- a l'arrel del projecte{  "rewrites": \[{ "source": "/(.\*)", "destination": "/" }\]} |
| :---- |

Sense aquest fitxer, les rutes com `/about` donen 404 perquè Vercel intenta trobar el fitxer `/about/index.html` que no existeix. El rewrite redirigeix totes les peticions al `index.html` i deixa que React Router o Vue Router gestionin la navegació.

**Docker: el contenidor essencial**

Docker empaqueta el codi, les dependències i la configuració en un contenidor que s'executa de manera idèntica en qualsevol màquina. El problema "funciona en local però falla a producció" desapareix.

**Els tres conceptes fonamentals:**

**Image** — la plantilla de sola lectura que defineix com serà el contenidor. Com una classe en OOP. Es construeix a partir d'un `Dockerfile`.

**Container** — la instància en execució d'una image. Com un objecte creat a partir d'una classe. Pots tenir múltiples contenidors d'una sola image.

**Dockerfile** — el fitxer de recepta que defineix com construir la image.

**El Dockerfile mínim per a una app Node.js:**

| \# Partim d'una image base oficial de NodeFROM node:20\-alpine\# Directori de treball dins del contenidorWORKDIR /app\# Copiem primer el package.json per aprofitar el cacheCOPY package\*.json ./RUN npm ci\# Copiem el codi fontCOPY . .\# Build de produccióRUN npm run build\# El port que exposa l'aplicacióEXPOSE 3000\# La comanda que arrenca l'appCMD \["node", "server.js"\] |
| :---- |

**Les comandes essencials:**

| \# Construir la imagedocker build \-t nom-app .\# Executar el contenidordocker run \-p 3000:3000 nom-app\# \-p 3000:3000 → mapeja el port local al del contenidor\# Llistar contenidors en execuciódocker ps\# Aturar un contenidordocker stop ID\_CONTENIDOR\# Llistar les images localsdocker images |
| :---- |

**Docker Compose: múltiples serveis junts:**

| \# docker-compose.ymlversion: '3.8'services:  web:    build: .    ports:      \- "3000:3000"    environment:      \- DATABASE\_URL=postgresql://postgres:password@db:5432/myapp    depends\_on:      \- db  db:    image: postgres:16-alpine    environment:      \- POSTGRES\_PASSWORD=password      \- POSTGRES\_DB=myapp    volumes:      \- postgres\_data:/var/lib/postgresql/datavolumes:  postgres\_data: |
| :---- |

| docker compose up      \# arrenca tots els serveisdocker compose down    \# atura i elimina els contenidorsdocker compose logs    \# veure logs de tots els serveis |
| :---- |

**GitHub Actions: automatitzar el pipeline**

GitHub Actions executa workflows automàticament quan fas push, obres una PR o altres events. El workflow s'escriu en YAML a `.github/workflows/`.

**El workflow mínim per a un projecte frontend:**

| \# .github/workflows/ci.ymlname: CI Pipelineon:  push:    branches: \[main\]  pull\_request:    branches: \[main\]jobs:  test-and-build:    runs-on: ubuntu-latest    steps:      \# 1\. Descarregar el codi      \- name: Checkout        uses: actions/checkout@v4      \# 2\. Configurar Node.js      \- name: Setup Node.js        uses: actions/setup-node@v4        with:          node-version: '20'          cache: 'npm'      \# 3\. Instal·lar dependències (exactament com el lockfile)      \- name: Install dependencies        run: npm ci      \# 4\. Passar el linter      \- name: Lint        run: npm run lint      \# 5\. Executar tests      \- name: Test        run: npm test      \# 6\. Build de producció      \- name: Build        run: npm run build |
| :---- |

**Secrets: mai credentials al YAML**

Les claus d'API, tokens i contrasenyes van a Settings → Secrets and variables → Actions del repositori. Al YAML s'accedeix amb la sintaxi `${{ secrets.NOM_SECRET }}`:

| \- name: Deploy to production  env:    VERCEL\_TOKEN: ${{ secrets.VERCEL\_TOKEN }}  run: npx vercel \--prod \--token $VERCEL\_TOKEN |
| :---- |

**La lògica de `needs`: encadenar jobs**

| jobs:  test:    runs-on: ubuntu-latest    steps:      \- run: npm test  build:    needs: test          \# ← únicament si test passa    runs-on: ubuntu-latest    steps:      \- run: npm run build  deploy:    needs: build         \# ← únicament si build passa    if: github.ref \== 'refs/heads/main'  \# ← únicament en main    runs-on: ubuntu-latest    steps:      \- run: npx vercel \--prod |
| :---- |

**Com s'encaixen les tres eines**

| Escrius codi en local        ↓git push → GitHub        ↓GitHub Actions s'activa  → Executa tests ✅  → Fa el build ✅        ↓Si tot passa i és la branca main:  → Vercel desplegament automàtic  o  → Docker image publicada a Docker Hub  o  → Servidor actualitzat via SSH        ↓🚀 Aplicació en producció |
| :---- |

Les tres eines juntes formen el pipeline complet: **GitHub** com a repositori i trigger, **GitHub Actions** com a automatitzador del CI/CD, **Vercel** com a plataforma de desplegament de frontend, i **Docker** per assegurar consistència d'entorns o per desplegar backends.

