## **Glossari de termes — Desplegament d'aplicacions**

**Artefacte (Artifact)** — El resultat d'un build: la carpeta `/dist` o el bundle comprimit llest per desplegar. En un pipeline CI/CD, el job de build genera l'artefacte i el job de desplegament l'usa.

**Build Command** — La comanda que genera el build de producció. Normalment `npm run build`. Cal especificar-la a la plataforma de desplegament per que sàpiga com transformar el codi font en fitxers estàtics.

**Build Process** — La cadena de transformacions que converteix el codi font (TypeScript, JSX, SCSS) en fitxers HTML, CSS i JavaScript optimitzats per al navegador. Inclou transpilació, bundling, tree-shaking, minificació i code splitting.

**Bundling** — Procés de combinar centenars de fitxers JavaScript i les seves dependències en un nombre reduït de fitxers per minimitzar les peticions HTTP i millorar el rendiment.

**Cache Busting** — Tècnica per evitar que els navegadors serveixin versions antigues del codi. Es fa afegint un hash únic al nom dels fitxers: `main.a3f8c21.js`. Quan el contingut canvia, el hash canvia i el navegador descarrega la versió nova.

**Certbot** — Eina oficial de Let's Encrypt per obtenir i renovar certificats SSL automàticament en servidors Linux. Dues comandes és suficient per configurar HTTPS complet en un VPS.

**CI (Continuous Integration)** — Pràctica d'integrar els canvis de codi freqüentment en un repositori compartit. En cada integració s'executen automàticament tests, linters i checks per detectar errors aviat.

**CD (Continuous Deployment)** — Extensió del CI que desplega automàticament el codi al servidor de producció quan passa tots els checks. Elimina la intervenció humana en el procés de desplegament.

**CI/CD Pipeline** — La seqüència automatitzada d'etapes que va des del push de codi fins al desplegament a producció: trigger → lint → tests → build → deploy. Implementada normalment amb GitHub Actions.

**Cloudflare Pages** — Plataforma de desplegament de llocs estàtics i SPAs amb CDN global de Cloudflare. Excel·lent per a rendiment internacional gràcies a la xarxa de servidors en més de 200 ciutats.

**Code Splitting** — Tècnica del build process que divideix el bundle en trossos més petits que es carreguen sota demanda. La pàgina inicial carrega menys codi, millorant el temps de primera càrrega.

**Cold Start** — El retard inicial que experimenta una funció serverless quan no ha estat usada recentment i el proveïdor ha d'arrencar un nou contenidor per atendre la petició. Pot durar entre 100ms i 1 segon.

**Contenidor (Container)** — La instància en execució d'una Docker Image. Entorn aïllat que conté tot el necessari per executar l'aplicació: codi, runtime, dependencies i configuració. Múltiples contenidors poden córrer simultàniament des d'una sola image.

**Deploy** — L'acte de publicar una versió del software en un entorn específic. Pot ser manual o automàtic (via CI/CD).

**Development Environment** — L'entorn local del developer. Permet canvis freqüents, usa dades de test i no afecta els usuaris reals.

**DNS (Domain Name System)** — El sistema que tradueix noms de domini llegibles per humans (`exemple.com`) en adreces IP numèriques que els servidors entenen. Quan connectes un domini a Vercel o Netlify, configures un registre DNS que apunta al servidor de la plataforma.

**Docker** — Plataforma de contenidors que empaqueta aplicacions amb totes les seves dependències i configuració en unitats portàtils i autocontingudes. Elimina el problema "funciona en la meva màquina però falla a producció".

**Docker Compose** — Eina per definir i executar aplicacions Docker multi-contenidor. Un fitxer `docker-compose.yml` descriu tots els serveis (app, base de dades, caché) i `docker compose up` els arrenca tots coordinadament.

**Docker Hub** — El registre públic d'images Docker. On es publiquen i descarreguen les images oficials (Node.js, PostgreSQL, Nginx) i les imatges pròpies.

**Dockerfile** — El fitxer de recepta que defineix com construir una Docker Image. Especifica la image base, les dependències a instal·lar, el codi a copiar i la comanda d'inici.

**Dominio Personalitzat** — URL pròpia en lloc de la URL generada per la plataforma (`el-meu-app.vercel.app` → `exemple.com`). Es configura afegint un registre DNS que apunta a la plataforma de desplegament.

**esbuild** — Bundler escrit en Go, extremadament ràpid. Vite l'usa internament per pre-processar les dependències durant el development, i com a base per al build de producció. Fins a 100x més ràpid que bundlers JavaScript tradicionals.

**Entorn (Environment)** — Configuració específica on s'executa l'aplicació: development, staging o production. Cada entorn pot tenir variables d'entorn, bases de dades i configuracions diferent.

**Environment Variables** — Variables externes que l'aplicació llegeix en temps d'execució: URLs de bases de dades, claus d'API, secrets... En local s'emmagatzemen al fitxer `.env`. En producció es configuren a la plataforma de desplegament o als Secrets de CI/CD. Mai s'han de pujar al repositori.

**Fail Fast** — Estratègia de detectar i reportar errors el més aviat possible. En desplegament: validar totes les variables d'entorn crítiques quan l'app arrenca i aturar-la immediatament si en manca alguna, en lloc de fallar misteriosament més endavant.

**Fat Client** — Arquitectura on el client (navegador o app) processa la lògica localment. Exemples: SPAs, aplicacions d'escriptori.

**GitHub Actions** — Plataforma CI/CD integrada a GitHub. Defineix workflows en fitxers YAML a `.github/workflows/`. S'activa amb events (push, PR) i executa jobs en màquines virtuals de GitHub. Pla gratuït generós per a repositoris públics.

**GitHub Pages** — Servei d'allotjament gratuït de GitHub per a llocs web estàtics. Ideal per a portfolis, documentació i pàgines de projectes. Únicament suporta contingut estàtic (HTML, CSS, JS).

**Health Check** — Endpoint de l'aplicació (`/health`) que retorna l'estat del sistema. S'usa per verificar que el desplegament ha anat bé i que el servidor respon correctament. Plataformes com Railway i Render l'usen per detectar automàticament si un servidor ha fallat.

**HMR (Hot Module Replacement)** — Funcionalitat del servidor de development que actualitza únicament el mòdul modificat al navegador sense recarregar tota la pàgina. Vite té el HMR més ràpid del mercat gràcies als ESM natius.

**HTTPS** — HTTP \+ TLS. El protocol estàndard per a comunicació web segura. El navegador xifra totes les dades enviades al servidor. Des de 2018, Google Chrome marca com a "No Segur" qualsevol lloc sense HTTPS.

**Image (Docker)** — La plantilla de sola lectura que defineix com serà un contenidor. Inclou el sistema operatiu base, el runtime (Node.js), les dependències i el codi. Es construeix a partir d'un Dockerfile i es pot compartir via Docker Hub.

**JAMstack** — Arquitectura web basada en JavaScript, APIs i Markup pregenerat. Els llocs JAMstack es generen en build time i es serveixen com a fitxers estàtics, sense servidor. Netlify i Vercel estan especialment optimitzades per a JAMstack.

**Job (GitHub Actions)** — Conjunt de steps dins d'un workflow que s'executen en la mateixa màquina virtual. Per defecte els jobs s'executen en paral·lel. La paraula clau `needs` permet encadenar-los en seqüència.

**Let's Encrypt** — Autoritat de Certificació gratuïta, automàtica i oberta del Internet Security Research Group (ISRG). Emet certificats SSL/TLS DV (Domain Validation) gratuïts. És l'estàndard per a HTTPS gratuït en servidors VPS.

**Minificació** — Eliminació de tot el que és innecessari per als humans però irrellevant per als ordinadors: espais en blanc, comentaris, noms llargs de variables. Redueix significativament la mida dels fitxers CSS i JavaScript.

**Microservices** — Arquitectura on l'aplicació es divideix en serveis petits i independents que es comuniquen per xarxa. Cada servei es pot desplegar i escalar de manera independent. Contraposat al monolític.

**Monolítica** — Arquitectura on tota l'aplicació és una unitat única: frontend, backend i lògica de negoci en un sol codi base. Més senzilla de desenvolupar i desplegar que els microserveis, però més difícil d'escalar selectivament.

**Netlify** — Plataforma de desplegament de llocs estàtics i SPAs. Integració automàtica amb Git, preview deployments, funcions serverless i CDN global. L'alternativa principal a Vercel per a projectes frontend.

**`npm ci`** — Comanda que instal·la exactament les dependències especificades al `package-lock.json`. Preferida en CI/CD sobre `npm install` perquè és determinista i falla si el lockfile no és consistent.

**Output Directory** — La carpeta que genera el build i que conté els fitxers llestos per desplegar. Normalment `dist/` per a Vite o `build/` per a Create React App. Cal especificar-la a la plataforma de desplegament.

**Pipeline** — La seqüència automatitzada d'etapes del CI/CD. Cada etapa s'executa únicament si l'anterior ha passat. Si un step falla, el pipeline s'atura i avisa l'equip.

**Preview Deployment** — Desplegament automàtic generat per a cada Pull Request o branca. Genera una URL única i temporal per revisar els canvis visuals i funcionals abans de fusionar. Funcionalitat clau de Vercel i Netlify.

**Production Environment** — L'entorn en viu on accedeixen els usuaris reals. Màxima estabilitat, seguretat i rendiment. Cap canvi hi arriba sense passar per testing i staging prèviament.

**Railway** — Plataforma de desplegament per a backends i bases de dades. Molt senzilla de configurar. Preu basat en ús real, sense plans mensuals fixes. Popular alternativa a Heroku i Render.

**Render** — Plataforma cloud que automatitza el desplegament d'aplicacions. Suporta Node.js, Python, Ruby, Docker i PostgreSQL. Considerada l'alternativa moderna a Heroku. Tier gratuït disponible.

**Reverse Proxy** — Servidor (normalment Nginx) que rep les peticions dels usuaris i les redirigeix a l'aplicació real. Permet executar Node.js en un port alt (3000) mentre els usuaris accedeixen pel port 80/443.

**Rollup** — Bundler JavaScript usat per Vite en els builds de producció. Especialment bo per a tree-shaking i generació de bundles lleugers.

**Runner (GitHub Actions)** — La màquina virtual de GitHub que executa els jobs del workflow. Normalment `ubuntu-latest`. GitHub en proporciona gratuïtament per a repositoris públics.

**Secret (GitHub Actions)** — Valor sensible (token, contrasenya, clau d'API) emmagatzemat de manera encriptada a la configuració del repositori. S'accedeix al YAML com `${{ secrets.NOM_SECRET }}`. Mai s'ha de posar al codi.

**Serverless** — Model d'execució on el codi s'executa en funcions que s'activen per events. El proveïdor gestiona tota la infraestructura. Pagues únicament per execució. Problemes: cold starts i costos imprevisibles en alt tràfic.

**Shared Hosting** — Múltiples llocs web comparteixen els recursos d'un sol servidor físic. El model més econòmic (2-10€/mes) però amb menys control i risc de l'efecte veí sorollós. Ideal per a llocs de baix tràfic.

**SPA (Single Page Application)** — Aplicació web que carrega una sola pàgina HTML i actualitza el contingut dinàmicament via JavaScript sense recarregar la pàgina. Requereix el fix de rewrites a Vercel per al routing del costat del client.

**SSL/TLS** — Protocols de xifrat que protegeixen les comunicacions entre navegador i servidor. TLS és la versió moderna de SSL. `HTTPS = HTTP + TLS`.

**Staging Environment** — Entorn que replica producció però sense usuaris reals. L'últim filtre de qualitat abans del desplegament a producció. Usa dades realistes però anonimitzades.

**Step (GitHub Actions)** — Cada tasca individual dins d'un job. Pot ser una acció predefinida (`uses: actions/checkout@v4`) o una comanda de shell (`run: npm test`).

**Thin Client** — Arquitectura on el client únicament gestiona la presentació i el servidor processa tota la lògica. Exemples: ChromeBooks, terminals de punt de venda.

**Tree-shaking** — Eliminació automàtica del codi no usat del bundle final. Si importes únciament `filter` d'una biblioteca, el bundle no inclou tot el codi restant. Vite i Rollup implementen tree-shaking de manera molt eficient.

**Transpilació** — Conversió de codi d'una versió o sintaxi a una altra. Typescript → JavaScript, JSX → JavaScript, ES2022 → ES5 per a navegadors antics. Les eines Babel i esbuild s'encarreguen d'això.

**Trigger (GitHub Actions)** — L'event que activa l'execució d'un workflow: un push, l'obertura d'una Pull Request, un horari programat o una activació manual.

**Variables d'Entorn** — Veure *Environment Variables*.

**Vercel** — Plataforma de desplegament especialitzada en frameworks JavaScript moderns (Next.js, React, Vite). Desplegament automàtic des de Git, preview deployments per a cada PR, SSL automàtic i funcions serverless. La primera opció per a projectes frontend professionals.

**Vercel.json** — Fitxer de configuració de Vercel a l'arrel del projecte. Essencial per a SPAs: defineix rewrites perquè el routing del costat del client funcioni correctament.

**VPS (Virtual Private Server)** — Servidor virtual amb recursos dedicats en un servidor físic compartit. Root access, control total de la configuració. Preu de 5-100€/mes. Ideal per a aplicacions amb tràfic estable que necessiten configuració personalitzada.

**Webpack** — Module bundler JavaScript creat el 2012\. Bundle-first: processa tot el codi i genera el bundle. Molt configurable via loaders i plugins. Ecosistema madur. Estàndard en projectes legacy i Next.js (que migra a Turbopack).

**Workflow (GitHub Actions)** — El procés automatitzat complet definit en un fitxer YAML a `.github/workflows/`. Conté els events que l'activen, els jobs i els steps que ha d'executar.

**`.env`** — Fitxer local que conté les variables d'entorn de development. Mai s'ha de pujar al repositori (afegir al `.gitignore`). Cal mantenir un `.env.example` amb els noms de les variables però sense valors reals.

**`.env.example`** — Fitxer que documenta totes les variables d'entorn necessàries per l'aplicació, sense valors reals. Es puja al repositori com a referència per als developers i per a la configuració del servidor de producció.

