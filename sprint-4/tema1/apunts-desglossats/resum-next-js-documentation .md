**Next.js Documentatió**  
Documentació oficial del framework Next.js per React.  
[https://nextjs.org/docs](https://nextjs.org/docs)

**Remix Documentatió**  
Guia oficial per desenvolupar aplicacions amb Remix.  
[https://api.remix.run/](https://api.remix.run/)

# **Resum: Next.js Documentation (nextjs.org/docs)**

## **1\. Definició**  

És la documentació oficial de Next.js, mantinguda per Vercel. Next.js és un framework de React per construir aplicacions web full-stack. Utilitzes Components de React per construir interfícies d'usuari, i Next.js per a característiques i optimitzacions addicionals.

## **2\. Estructura de la documentació**

La documentació actual (versió 16.2.9) s'organitza en **tres seccions principals**: Getting Started (tutorials pas a pas per crear una nova aplicació i aprendre les característiques principals), Guides (tutorials sobre casos d'ús específics) i API Reference (referència tècnica detallada de cada característica).

## **3\. El detall més important: dos routers diferents**

Aquesta és la informació crítica que has de saber abans de tocar codi de Next.js: Next.js té dos routers diferents: l'App Router (el més nou, que suporta noves característiques de React com els Server Components) i el Pages Router (l'original, encara suportat i en millora contínua).

| // App Router (modern, recomanat per a projectes nous)app/  page.js          → ruta "/"  about/page.js    → ruta "/about"  blog/\[id\]/page.js → ruta "/blog/:id"// Pages Router (l'original, encara funciona)pages/  index.js         → ruta "/"  about.js         → ruta "/about"  blog/\[id\].js     → ruta "/blog/:id" |
| :---- |

Una diferència tècnica subtil però rellevant: l'App Router utilitza les versions canary de React, que inclouen tots els canvis estables de React 19 més característiques noves en validació, mentre que el Pages Router utilitza la versió de React instal·lada al package.json del teu projecte.

## **4\. Què cobreix concretament la documentació de l'App Router**

Dins de "Getting Started" trobaràs, en ordre lògic d'aprenentatge:

* **Instal·lació i estructura del projecte**  
* **Layouts i Pages** (com defineixes l'estructura visual i les rutes)  
* **Linking and Navigating** (navegació entre pàgines)  
* **Server and Client Components** — el concepte més nou i diferenciador respecte a React "pelat"  
* **Fetching Data / Mutating Data** — com obtenir i modificar dades  
* **Caching / Revalidating** — les estratègies d'emmagatzematge en caché  
* **Error Handling, CSS, Image/Font Optimization** — aspectes pràctics de producció

A "API Reference" trobaràs **funcions especialitzades** com `redirect`, `notFound`, `cookies`, `headers`, `useRouter`, `revalidatePath`, entre moltes altres — el "vocabulari" tècnic complet de Next.js.

## **5\. Coneixements previs recomanats**

La documentació assumeix certa familiaritat amb el desenvolupament web. Abans de començar, ajuda estar còmode amb HTML, CSS, JavaScript i React. Si necessites repassar React abans, la pròpia documentació recomana començar pel curs "React Foundations" — que complementaria perfectament tot el que ja hem treballat en aquest Tema 1\.

## **6\. Connexió amb el temari**

Aquesta documentació és l'aplicació pràctica directa del que vam veure sobre **metaframeworks**: aquí trobaràs amb detall tècnic real tot allò que vam descriure de manera general (Server Components, rutes basades en fitxers, estratègies de renderitzat SSR/SSG/ISR).

 

**Resum: React Router v7 — Framework Mode (l'hereu real de Remix)**

## **1\. Definició**  

React Router és un router multi-estratègia per a React. El pots usar al màxim com un framework de React complet, o de manera mínima, només com a llibreria de routing. 

Aquesta flexibilitat es concreta en **tres "modes"** d'ús diferents, i el que correspon al que abans coneixíem com "Remix" és el tercer, anomenat **Framework Mode**.

## **2\. Els tres modes (per entendre on s'encaixa Framework Mode)**

**Mode Declaratiu**: permet routing declaratiu senzill per a SPAs. Pots configurar rutes amb JSX, usar components integrats com `<Link>` i `<NavLink>`, niar rutes amb `<Outlet />`, i tens accés a hooks com `useNavigate` i `useLocation`. És el "React Router de sempre" que probablement ja coneixes.

**Mode Data**: movent la configuració de rutes fora del renderitzat de React, el Mode Data afegeix càrrega de dades, actions, estats pendents i més, amb APIs com `loader`, `action` i `useFetcher`.

**Mode Framework**: embolcalla el Mode Data amb un plugin de Vite per afegir l'experiència completa de React Router. És essencialment el Mode Data empaquetat i polit com un framework full-stack de React complet. A més dels beneficis del Mode Data, el Mode Framework afegeix millores com type-safety, configuració senzilla per a SPAs, SSR, o generació estàtica. Una addició important d'aquest mode és el routing basat en fitxers, que et permet definir rutes directament des del sistema de fitxers en lloc de configurar-les manualment.

El Mode Framework es posiciona com una alternativa a altres frameworks full-stack de React com Next.js i TanStack Start — exactament el rol que abans ocupava Remix.

## **3\. Com es configura (sintaxi pràctica)**

**Definició de rutes** (fitxer de configuració, en lloc de routing 100% basat en carpetes com Next.js):

| // app/routes.tsimport { index, route } from "@react-router/dev/routes";export default \[  index("./home.tsx"),  route("products/:pid", "./product.tsx"),\];Amb això tens accés a la Route Module API, amb params type-safe, loaderData, code splitting, estratègies SPA/SSR/SSG i més:// app/product.tsximport { Route } from "./+types/product.tsx";export async function loader({ params }: Route.LoaderArgs) {  let product \= await getProduct(params.pid);  return { product };}export default function Product({ loaderData }: Route.ComponentProps) {  return \<div\>{loaderData.product.name}\</div\>;} |
| :---- |

Fixa't en la similitud directa amb els exemples que ja vam veure de "Remix" al resum de metaframeworks: **loader** per carregar dades, component que rep `loaderData`. 

És literalment el mateix patró, ara sota el nom oficial de React Router.

## **4\. Avantatges del Framework Mode**

React Router 7 introdueix el Mode Framework, permetent-te construir aplicacions full-stack (incloent renderitzat al servidor) amb la mateixa API familiar, eliminant la necessitat d'un framework SSR addicional com Next.js.

**Beneficis concrets:** renderitzat al servidor (SSR), pre-renderitzat o generació de contingut estàtic, enviament de formularis al servidor, tècniques d'optimització com code-splitting i tree-shaking, i routing basat en fitxers.

Com que utilitzes una sola eina per a totes les teves necessitats, React Router 7 redueix la corba d'aprenentatge i et permet centrar-te en construir característiques, millorant la productivitat general.

## **5\. Avantatges i inconvenients (visió comparada dels modes)**

**Avantatges del Framework Mode:**

* Tot integrat: routing \+ dades \+ SSR en un sol paquet coherent  
* Type-safety i configuració senzilla per a SPAs, SSR o generació estàtica  
* No necessites afegir Next.js a sobre per tenir renderitzat al servidor

**Inconvenients / matisos:**

* Té una mica de corba d'aprenentatge abans de poder-ne treure profit, comparat amb el Mode Declaratiu  
* Si no necessites totes les seves característiques, probablement és millor solucionar alguns d'aquests problemes per tu mateix i treballar amb el Mode Declaratiu en lloc d'aprendre el Mode Data/Framework  
* Requereix Vite com a part de la cadena d'eines (és un plugin de Vite, no és independent del bundler com Remix 3 pretén ser)

## **6\. Requisits tècnics actuals**

React Router (la versió més recent) requereix Node 22+, Vite 7+, React 19+, i és exclusivament ESM. Pujar aquestes línies de base permet abraçar el millor d'aquestes eines i mantenir el nucli de React Router senzill.

## **7\. Errors comuns / mals entesos**

* **Confondre aquest "React Router v7 framework mode" amb el "Remix 3"** que vam veure abans. Són coses **totalment diferents**: aquest és l'hereu real per a projectes React (segueix usant React per sota); l'altre és un projecte separat que abandona React.  
* **Pensar que has d'usar sempre el Mode Framework.** Si només necessites routing bàsic per a una SPA, el Mode Declaratiu pot ser suficient i molt més senzill — no cal "pujar" de mode si no et cal la potència extra.  
* **Creure que necessites instal·lar paquets separats per a Remix.** Tot està inclòs en un sol paquet `react-router`, que conté totes les APIs necessàries per a routing, tant si construeixes una app client-side com una app full-stack.

 **8\. Preguntes de repàs**  

**1\. Quins són els tres modes de React Router v7, i quin correspon a "Remix"?**

Declaratiu (routing bàsic amb JSX i components com `<Link>`), Data (afegeix `loader`/`action` movent la configuració fora del render) i Framework (envolcalla el Mode Data amb un plugin de Vite per oferir l'experiència completa tipo framework, amb routing basat en fitxers i SSR). El Framework Mode és el que correspon al que abans s'anomenava Remix.

**2\. Per què NO has de buscar a api.remix.run per estudiar el "Remix" del bootcamp?**

Perquè aquell domini documenta ara "Remix 3", un projecte completament separat i experimental que substitueix React per un sistema de components propi, dissenyat per a un món "model-first" orientat a IA. No té relació amb el patró loader/action que el bootcamp probablement vol que coneguis.

**3\. Quina diferència principal hi ha entre el Mode Data i el Mode Framework?**

El Mode Data introdueix les APIs de càrrega de dades (`loader`, `action`) movent la configuració de rutes fora del renderitzat de React, però el desenvolupador encara munta l'arquitectura. El Mode Framework agafa aquesta base i hi afegeix una capa de framework complet: routing basat en fitxers, type-safety, i estratègies SSR/SSG/SPA llestes per usar, mitjançant un plugin de Vite.

**4\. Quins requisits tècnics necessites per usar la versió actual de React Router?**

Node 22 o superior, Vite 7 o superior, React 19 o superior, i un entorn exclusivament ESM (no CommonJS).

**5\. Per què el Mode Framework de React Router es compara directament amb Next.js?**

Perquè, igual que Next.js, permet construir aplicacions full-stack de React amb renderitzat al servidor, routing basat en fitxers i optimitzacions de càrrega, sense necessitat d'afegir cap framework addicional — oferint una alternativa completa dins del mateix ecosistema de React Router.

 

