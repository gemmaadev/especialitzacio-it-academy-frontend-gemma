## **El Build Process en aplicacions web modernes**

**Per què existeix el build process?**

Les biblioteques com React, Vue i Svelte són fantàstiques per programar, però el navegador no pot entendre el codi escrit en aquests frameworks frontend, i aquí és on entren les eines de build de JavaScript. Les eines de build ajuden a automatitzar tasques optimitzant el codi, agrupant assets i millorant el rendiment de l'aplicació.

En el dia a dia de desenvolupament escrius JSX, TypeScript, SCSS, imports de mòduls ES6 i moltes altres coses que el navegador no entén directament. El build process transforma tot això en HTML, CSS i JavaScript que qualsevol navegador pot executar, optimitzat i comprimit per ser el més lleuger possible.

**Què fa exactament el build process**

El build process és una cadena d'operacions que transformen el codi font en el producte final per a producció:

* **Transpilació** — converteix TypeScript a JavaScript, JSX a JavaScript pur, i sintaxi ES6+ a versions compatibles amb navegadors antics. Eines com Babel i esbuild s'encarreguen d'això.  
* **Bundling** — combina tots els fitxers JavaScript, CSS i altres assets en un nombre mínim de fitxers per reduir les peticions HTTP. Un projecte amb 200 fitxers .js es pot convertir en 2-3 fitxers optimitzats.  
* **Tree-shaking** — elimina el codi mort o no usat del bundle. Webpack adopta una tècnica d'eliminació de codi mort que automàticament elimina el codi no usat del bundle. Si importes únicament filter d'una biblioteca, el bundle no inclou tot el rest.  
* **Minificació** — elimina espais en blanc, comentaris i acurta noms de variables per reduir la mida final dels fitxers.  
* **Code splitting** — divideix el bundle en trossos més petits que es carreguen sota demanda. La pàgina inicial carrega menys codi, accelerant el temps de càrrega.  
* **Optimització d'assets** — comprimeix imatges, processa CSS (autoprefixer, purge), genera hashes per al cache busting.

**Webpack: el veterà configurable**

Webpack és un potent module bundler per a aplicacions JavaScript. Processa els teus fitxers JavaScript i les seves dependències, els agrupa en un sol fitxer (o uns pocs fitxers), i els optimitza per al navegador. Webpack ha estat l'eina de referència per a molts developers durant diversos anys, gràcies a la seva flexibilitat i extensiu ecosistema de plugins.

Webpack processa el codi creant un dependency graph, começant des d'un punt d'entrada (normalment el fitxer JavaScript principal). Recorre tots els imports, transforma assets usant loaders (per exemple, per TypeScript o Sass), i aplica optimitzacions com minificació o code splitting.

**Com funciona durant el desenvolupament:** Webpack processa tots els fitxers i genera el bundle complet cada vegada que hi ha un canvi. Pot ser lent en projectes grans.

| Configuració bàsica:// webpack.config.jsmodule.exports \= {  entry: './src/index.js',     // punt d'entrada  output: {    path: path.resolve(\_\_dirname, 'dist'),    filename: 'bundle.\[contenthash\].js'  // hash per cache busting  },  module: {    rules: \[      // Loader per a TypeScript      { test: /\\.tsx?$/, use: 'ts-loader' },      // Loader per a CSS      { test: /\\.css$/, use: \['style-loader', 'css-loader'\] },      // Loader per a imatges      { test: /\\.(png|jpg)$/, type: 'asset/resource' }    \]  },  plugins: \[    new HtmlWebpackPlugin({ template: './src/index.html' })  \]}; |
| :---- |

**Punts forts:** Webpack és el ganivet suís: versàtil, provat en batalla i infinitament configurable. El seu ecosistema de plugins permet als equips configurar gairebé cada aspecte del build output, des dels límits dels chunks fins a passos d'optimització personalitzats. Webpack domina quan cal un ajust fi.

**Vite: la nova generació**

Vite és una eina de build de frontend ràpida i moderna que accelera el rendiment web adreçant les deficiències del procés de bundling tradicional.

Vite (pronunciat "vit") és una eina de tooling de frontend de nova generació desenvolupada per Evan You (creador de Vue.js). Se centra en el desenvolupament ràpid i la configuració mínima usant mòduls ES natius. El resultat és una experiència de desenvolupament definida per un inici del servidor quasi instantani i un Hot Module Replacement (HMR) extremadament ràpid.

**La diferència fonamental amb Webpack:**

Vite aprofita les capacitats natives del navegador, particularment els mòduls ES. En lloc de fer bundling durant el desenvolupament, Vite serveix els fitxers directament com a mòduls ES natius. Cada vegada que el navegador necessita un fitxer, Vite el transforma i el serveix on demand. Això elimina la necessitat de bundling i habilita temps d'inici més ràpids i millor cacheabilitat.

**En producció**, Vite usa **Rollup** per generar builds optimitzats. Tot i que en dev no fa bundling, en producció sí genera un bundle optimitzat.

**Configuració mínima:**

| // vite.config.jsimport { defineConfig } from 'vite';import react from '@vitejs/plugin-react';export default defineConfig({  plugins: \[react()\],  build: {    outDir: 'dist',    sourcemap: true,  }}); |
| :---- |

**El HMR de Vite:** HMR fa el seguiment dels canvis d'estat a l'aplicació i afegeix i/o elimina mòduls mentre l'aplicació s'executa sense provocar una recàrrega completa. El que això significa per als developers és que pots veure els canvis que fas al teu codi instantàniament al navegador mentre estàs programant.

**La diferència de velocitat: per quèimporta**

La diferència en temps de build de producció entre Vite (2-7 segons) i Webpack (11-24 segons) s'acumula en reduccions significatives de cost d'infraestructura i millores de throughput del pipeline. Per a projectes en plataformes CI cloud amb facturació per minut, es veuran estalvis de cost directes.

Un exemple concret: Shopify va migrar diverses de les seves aplicacions d'eines internes de Webpack a Vite i va reportar reduccions en el temps d'inici del servidor de desenvolupament d'aproximadament 12 segons a menys de 800 mil·lisegons.

**L'estat del mercat el 2026**

Angular 17+ va migrar el seu sistema de build de Webpack a Vite amb esbuild. SolidStart és natiu de Vite des del llançament inicial. Remix 2.x va adoptar Vite com a objectiu de compilació, substituint el seu compilador personalitzat. El propi React no inclou una eina de build, però Create React App (basat en Webpack) és efectivament obsolet des de 2024, i la documentació oficial de React ara recomana Vite o Next.js per a nous projectes.

Vite s'està convertint ràpidament en l'estàndard per als nous projectes de frontend. Frameworks com SvelteKit, Vue 3, i fins i tot les plantilles d'inici de React ara envien amb Vite. Webpack segueix dominant en configuracions empresarials, però Vite està guanyant en termes de DX (Developer Experience).

**Com crear un projecte amb Vite**

| \# Crear un nou projecte React amb Vitenpm create vite@latest el-meu-projecte \-- \--template react\# Navegar al projectecd el-meu-projecte\# Instal·lar dependènciesnpm install\# Iniciar el servidor de desenvolupament (instantani\!)npm run dev\# Build per a producció (genera la carpeta /dist)npm run build\# Previsualitzar el build de producciónpm run preview |
| :---- |

L'estructura de carpetes resultant:

| el-meu-projecte/├── public/          \# fitxers estàtics (no processats)├── src/             \# codi font│   ├── main.jsx     \# punt d'entrada│   └── App.jsx├── dist/            \# build de producció (generat per npm run build)├── vite.config.js   \# configuració├── index.html       \# template HTML└── package.json |
| :---- |

**Comparativa directa**

|  | Webpack | Vite |
| ----- | ----- | ----- |
| **Creat el** | 2012 | 2020 |
| **Filosofia** | Bundle-first (tot el codi) | ESM-first (serveix directament) |
| **Temps d'inici dev** | Lent (11-24s) | Instantani (\<800ms) |
| **HMR** | Lent (reconstrueix tot) | Instantani (actualitza el mòdul) |
| **Build producció** | Webpack | Rollup (via Vite) |
| **Configuració** | Extensa i complexa | Mínima i intuïtiva |
| **Ecosistema** | Molt madur (12 anys) | En creixement ràpid |
| **Tree-shaking** | Sí | Sí (millor via Rollup) |
| **Frameworks** | Tots | Tots (optimitzat per moderns) |
| **Ideal per a** | Projectes legacy, empreses grans | Projectes nous, frameworks moderns |

