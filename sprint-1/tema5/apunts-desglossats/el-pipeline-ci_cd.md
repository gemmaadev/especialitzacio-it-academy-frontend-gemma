## **El Pipeline CI/CD: flux de testeig, construcció i desplegament**

**Què és un pipeline CI/CD?**

CI/CD és una pràctica de desenvolupament de software que automatitza la integració de canvis de codi (CI) i el lliurament d'actualitzacions de software (CD). Aquesta aproximació minimitza els errors, accelera els llançaments i assegura la consistència.

CI significa Integració Contínua. Suposa que ets un equip de cinc persones construint un projecte. En aquest escenari, tens un repositori central a GitHub on tothom puja el seu codi. CI significa combinar canvis de codi de múltiples developers en un projecte de manera fluida i ràpida.

La diferència entre CI i CD: si el desplegament es fa manualment (per algun humà), CD significa Continuous Delivery. Si el desplegament es fa automàticament sense intervenció humana, CD significa Continuous Deployment.

**Les quatre etapes del pipeline**

CI/CD implica principalment diverses etapes com construcció, testeig, staging i desplegament.

### **Etapa 1: Trigger (l'event que ho activa)**

Tot comença quan algú fa una acció al repositori. Pots configurar el workflow de CI/CD per executar-se quan ocorre un event a GitHub (per exemple, quan es puja codi nou al repositori), en un horari programat, o quan ocorre un event extern.

Els triggers més habituals: push a `main`, obertura d'una Pull Request, o un tag de versió nova.

### **Etapa 2: Integració i testeig**

La integració contínua és una pràctica de software que requereix pujar codi freqüentment a un repositori compartit. Pujar codi més sovint detecta errors aviat i redueix la quantitat de codi que un developer ha de debugar quan cerca la font d'un error. Les proves poden incloure linters de codi (que comproven el format), comprovacions de seguretat, cobertura de codi, tests funcionals i altres comprovacions personalitzades.

GitHub executa els tests de CI i proporciona els resultats de cada test a la Pull Request, de manera que pots veure si el canvi a la teva branca introdueix un error. Quan tots els tests de CI en un workflow passen, els canvis que has pujat estan llestos per ser revisats per un membre de l'equip o fusionats.

### **Etapa 3: Construcció (Build)**

La fase de build és on el codi i les seves dependències es compilen en un executable únic. Aquesta és la primera fase de la Integració Contínua, i és desencadenada per un event com pujar codi al repositori.

En el context d'una aplicació web moderna: s'executa `npm run build`, Vite o Webpack processen el codi, es genera la carpeta `dist/` amb els fitxers optimitzats, i es guarda com a **artifact** per a l'etapa de desplegament.

### **Etapa 4: Desplegament**

Aquí l'aplicació és automàticament desplegada als usuaris finals.

El desplegament pot anar a staging primer (per a validació) i després a producció, o directament a producció si tots els tests han passat.

**GitHub Actions: el pipeline en un fitxer YAML**

GitHub Actions és un servei o funcionalitat de la plataforma GitHub que permet als developers crear els seus propis workflows de CI/CD directament a GitHub. No es necessiten servidors addicionals ni hosting. Tot viu dins del teu repositori GitHub sota una carpeta especial (.github/workflows).

Els components clau:

**Runner**: un servidor de GitHub que executa les teves tasques. Executa el que s'ha definit al workflow. **Job**: una col·lecció de steps que s'executen en el mateix runner. **Workflow**: una sèrie de jobs definits en un fitxer YAML, que es disparen quan ocorre un event.

Un job és un conjunt de steps en un workflow que s'executa en el mateix runner. Cada step és o bé un script de shell que s'executarà, o una action que correrà. Els steps s'executen en ordre i depenen els uns dels altres. Pots configurar les dependències d'un job amb altres jobs; per defecte, els jobs no tenen dependències i corren en paral·lel.

**El pipeline complet: exemple pràctic**

| \# .github/workflows/ci-cd.ymlname: CI/CD Pipeline\# Quan s'executa: quan hi ha un push a main o s'obre una PRon:  push:    branches: \[main\]  pull\_request:    branches: \[main\]jobs:  \# \---- ETAPA 1: TESTS (s'executen en paral·lel) \----  lint:    name: Linting    runs-on: ubuntu-latest    steps:      \- name: Descarregar codi        uses: actions/checkout@v4      \- name: Configurar Node.js        uses: actions/setup-node@v4        with:          node-version: '20'          cache: 'npm'      \- name: Instal·lar dependències        run: npm ci      \- name: Executar ESLint        run: npm run lint  test:    name: Tests unitaris    runs-on: ubuntu-latest    steps:      \- uses: actions/checkout@v4      \- uses: actions/setup-node@v4        with:          node-version: '20'          cache: 'npm'      \- run: npm ci      \- run: npm test      \- run: npm run test:coverage  \# \---- ETAPA 2: BUILD \----  \# Depèn de lint i test: si fallen, el build no s'executa  build:    name: Construcció    runs-on: ubuntu-latest    needs: \[lint, test\]         \# ← espera que lint i test acabin bé    steps:      \- uses: actions/checkout@v4      \- uses: actions/setup-node@v4        with:          node-version: '20'          cache: 'npm'      \- run: npm ci      \- run: npm run build      \# genera la carpeta /dist      \# Guardar el resultat com a artifact      \- name: Pujar artifact del build        uses: actions/upload-artifact@v4        with:          name: dist          path: dist/  \# \---- ETAPA 3: DESPLEGAMENT \----  \# Únicament s'executa quan hi ha push a main (no en PRs)  deploy:    name: Desplegament a producció    runs-on: ubuntu-latest    needs: build                \# ← espera que el build acabi bé    if: github.ref \== 'refs/heads/main'  \# ← únicament en main    steps:      \- name: Descarregar artifact del build        uses: actions/download-artifact@v4        with:          name: dist          path: dist/      \- name: Desplegar a Vercel        run: npx vercel \--prod        env:          VERCEL\_TOKEN: ${{ secrets.VERCEL\_TOKEN }} |
| :---- |

**El flux visual del pipeline**

| Developer fa push / obre PR           ↓GitHub detecta l'event           ↓S'activa el workflow           ↓┌──────────┬────────────┐│  LINT    │  TESTS     │  ← En paral·lel (va més ràpid)│ ESLint   │ unitaris   ││ Prettier │ integració │└──────────┴────────────┘           ↓ Tots passen? ✅        BUILD   (npm run build)   genera /dist           ↓ Build ok? ✅       DESPLEGAMENT  (únicament si és main)           ↓  🚀 Aplicació en producció |
| :---- |

**Mai credentials al codi**

Si no vols exposar les teves contrasenyes o informació sensible directament, pots usar secrets. Sota la pestanya de configuració del repositori, pots donar aquests secrets com a parells clau-valor. Quan executes el workflow, els valors d'aquestes claus (com VERCEL\_TOKEN, EC2\_HOST, etc.) s'agafen d'allà. Si has programat cap aplicació de backend, és com el fitxer `.env` on escrius informació sensible.

| \# ❌ MAI: credentials directament al YAML (visibles a tothom)\- run: curl \-X POST https://api.vercel.com/v1/deployments  env:    TOKEN: 'abc123secrettoken'\# ✅ Secrets del repositori (Settings → Secrets → Actions)\- run: curl \-X POST https://api.vercel.com/v1/deployments  env:    TOKEN: ${{ secrets.VERCEL\_TOKEN }}  \# ← encriptat per GitHub |
| :---- |

**CI vs CD: el resum definitiu**

|  | CI (Integració Contínua) | CD (Desplegament Continu) |
| ----- | ----- | ----- |
| **Quan s'executa** | En cada commit o PR | Quan CI passa (en main) |
| **Quèfa** | Lint, tests, comprovacions | Build \+ desplegament |
| **Objectiu** | Detectar errors aviat | Lliurar valor als usuaris automàticament |
| **Temps típic** | 1-5 minuts | 2-10 minuts |
| **Bloqueja** | La fusió de la PR | Res (o desplegament a producció) |
| **Si falla** | La PR no es pot fusionar | El desplegament s'atura |

