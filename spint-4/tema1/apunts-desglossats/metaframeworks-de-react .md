**Quins son els metaframeworks de React i com milloren la programació?**

**The State of React Metaframeworks**  
[https://www.youtube.com/watch?v=JDDxR1a15Yo\&time\_continue=1\&source\_ve\_path=MjM4NTE\&embeds\_referring\_euri=https%3A%2F%2Fitacademy.barcelonactiva.cat%2F](https://www.youtube.com/watch?v=JDDxR1a15Yo&time_continue=1&source_ve_path=MjM4NTE&embeds_referring_euri=https%3A%2F%2Fitacademy.barcelonactiva.cat%2F)

 **1\. Definició**  

Un **metaframework** és una capa addicional construïda **sobre** React (que és només una llibreria per construir interfícies) que hi afegeix tot el que React, per si sol, no proporciona: encaminament (*routing*), renderitzat al servidor, obtenció de dades, optimització d'imatges, divisió de codi, i un sistema de fitxers convencional per organitzar-ho tot.

La distinció és clau: React no inclou routing, obtenció de dades, renderitzat al servidor, ni capacitats de backend per defecte; els desenvolupadors les munten amb llibreries de tercers. React dona una llibreria de renderitzat; Next.js (un metaframework) dona un framework de producció.

## **2\. Per què existeixen / quin problema resolen**

Imagina que vols construir una aplicació React "normal" (sense metaframework) que necessita carregar dades d'un blog:

| // React "pelat", sense metaframeworkfunction BlogPost() {  const \[post, setPost\] \= useState(null);  const \[loading, setLoading\] \= useState(true);  const { id } \= useParams();  useEffect(() \=\> {    fetch(\`/api/posts/${id}\`)      .then(res \=\> res.json())      .then(data \=\> setPost(data))      .finally(() \=\> setLoading(false));  }, \[id\]);  if (loading) return \<div\>Carregant...\</div\>;  return \<article\>{post.title}\</article\>;} |
| :---- |

Aquest patró té problemes pràctics reals: pantalla en blanc fins que el JS es carrega, una altra espera per a l'API, mal SEO, codis de frontend i backend separats, i codi repetitiu de loading state per tot arreu. A més, React, en pla pur, només funciona al navegador i sempre necessita una API de backend separada.

Els metaframeworks neixen precisament per resoldre aquest conjunt de problemes de cop, oferint la capacitat d'executar-se en un servidor Node.js, amb renderitzat previ, rutes basades en fitxers, i una manera integrada d'obtenir dades sense haver de muntar-ho tot manualment.

## **3\. El panorama actual (2026): qui són els jugadors principals**

El mapa ha canviat força respecte a fa uns anys. Aquests són els tres metaframeworks rellevants per a React avui:

### **Next.js — el líder de l'ecosistema**

Next.js aposta per React Server Components i una integració estreta amb Vercel. 

És el framework de React més ric en funcionalitats disponible: la versió 16 ha doblat l'aposta per React Server Components, ha introduït Cache Components, i ha integrat Turbopack com a bundler per defecte amb builds 2-5 vegades més ràpids.

| // Next.js: rutes basades en fitxers, Server Components per defecte// app/blog/\[id\]/page.jsasync function getPost(id) {  const res \= await fetch(\`https://api.example.com/posts/${id}\`);  return res.json();}export default async function BlogPost({ params }) {  const post \= await getPost(params.id); // S'executa al SERVIDOR, mai arriba al navegador  return \<article\>{post.title}\</article\>;} |
| :---- |

Els Server Components s'executen exclusivament al servidor: poden accedir a bases de dades i APIs directament, mai envien el seu JavaScript al navegador, i redueixen la mida del bundle. Són ideals per a obtenció de dades i contingut no interactiu.

### **React Router v7 (l'antic Remix) — web standards i progressive enhancement**

Aquí hi ha el canvi més important a conèixer: React Router v7 va absorbir tots els patrons principals de Remix —loaders, actions, nested routing, server rendering. Si estàs usant Remix v2 avui, el camí d'actualització recomanat és React Router v7 en "framework mode". Essencialment és Remix renombrat i fusionat amb el router que ja impulsa milions d'apps React.

El model mental és refrescantment senzill: cada ruta té un loader (entrada de dades), una action (mutacions) i un component (UI). No hi ha distinció entre Server Component i Client Component, no calen directives de caching per aprendre — només patrons estàndard de Request/Response.

| // React Router v7 (framework mode): loader \+ action \+ componentexport async function loader({ params }) {  const post \= await db.posts.findById(params.id); // dades carregades al servidor  return post;}export async function action({ request }) {  const formData \= await request.formData();  await db.comments.create(formData); // mutació via formulari  return redirect(\`/blog/${params.id}\`);}export default function BlogPost({ loaderData }) {  return \<article\>{loaderData.title}\</article\>;} |
| :---- |

Progressive enhancement: els formularis funcionen sense JavaScript. El servidor gestiona els enviaments de formularis via HTTP estàndard, i JavaScript millora l'experiència (estats pendents, UI optimista) quan està disponible. 

Això no és només una característica d'accessibilitat: vol dir que la funcionalitat principal de la teva app mai es trenca per errors de JavaScript.

**Nota:** hi ha un "Remix 3" en desenvolupament, però és un projecte completament separat que forca Preact per substituir React del tot — no hi ha camí de migració des de Remix v2, i si estàs compromès amb l'ecosistema React, Remix 3 no és el teu framework. Quan parlem de "Remix" avui, ens referim als patrons que ara viuen a React Router v7.

### **TanStack Start — l'opció emergent**

Creat per Tanner Linsley (la ment darrere de TanStack Query i TanStack Router), TanStack Start és un framework full-stack de React actualment en Release Candidate. Encara no té l'adopció dels dos anteriors, però val la pena saber que existeix.

## 

## **4\. Com milloren concretament la programació**

**Routing integrat i basat en fitxers**: tant Next.js com el patró de Remix/React Router utilitzen rutes basades en el sistema de fitxers — creus fitxers dins d'un directori i aquests es converteixen automàticament en rutes, amb gestió de layouts niats. Aquests frameworks lliguen el routing amb l'obtenció de dades estretament, evitant problemes habituals com els "loading waterfalls" (caigudes en cascada de càrregues).

**Rendiment i SEO millorats sense esforç manual**: les aplicacions Next.js típicament aconsegueixen puntuacions de Largest Contentful Paint un 40-60% més ràpides que SPAs de React equivalents, perquè el contingut es pre-renderitza al servidor i les imatges s'optimitzen automàticament.

**Múltiples estratègies de renderitzat, sense haver-les de programar tu mateix**: Server-Side Rendering (pàgines generades al servidor en el moment de la petició), Static Site Generation (pàgines pre-renderitzades en temps de build), Incremental Static Regeneration (pàgines estàtiques que es poden actualitzar en segon pla sense un rebuild complet), i Client-Side Rendering per a actualitzacions dinàmiques i interactivitat — tot inclòs com a opcions configurables.

**Optimitzacions automàtiques**: divisió automàtica de codi, optimització d'imatges, optimització de fonts, i precàrrega funcionen sense necessitat de configuració.

## **5\. Avantatges i inconvenients**

**Avantatges:**

* **Productivitat**: els frameworks et donen un munt de bones pràctiques de sèrie —routing, SSR, code splitting, etc.— perquè no les hagis de reinventar  
* **Rendiment i SEO de fàbrica**, sense haver de configurar-ho manualment des de zero  
* **Ecosistema i suport empresarial sòlid**: el suport empresarial importa — el finançament de Vercel i la col·laboració amb l'equip de React donen estabilitat a llarg termini a Next.js  
* **Models mentals més simples en alguns casos**: React Router v7 redueix conceptes a aprendre (loaders/actions/components) en lloc de la complexitat de Server/Client Components de Next.js

**Inconvenients:**

* **Corba d'aprenentatge més pronunciada**: la corba d'aprenentatge de Next.js és més pronunciada que React pelat, sobretot amb conceptes com Server Components  
* **Possible vendor lock-in**: tot i que Next.js es desplega a qualsevol lloc, les característiques específiques de Vercel (Middleware, Edge, ISR) funcionen millor a la pròpia plataforma de Vercel  
* **Complexitat mental en equips no preparats**: si el teu equip lluita amb la complexitat, el model mental de l'App Router és pronunciat — si el teu equip es confon amb els límits de RSC o les capes de caching, la DX en patirà  
* **No sempre és la millor opció**: per a eines internes, dashboards administratius, SPAs complexes on els usuaris sempre estan autenticats, l'SEO no és una preocupació i React pelat (amb Vite \+ TanStack Query) pot ser preferible

## **6\. Errors comuns / mals entesos**

* **Pensar que Remix encara és un projecte independent actiu de la mateixa manera que abans.** Com hem vist, s'ha fusionat amb React Router v7; el "Remix 3" és un projecte diferent que ja no usa React.  
* **Creure que sempre cal un metaframework.** Per a aplicacions internes, darrere d'autenticació, sense necessitats d'SEO, React \+ Vite \+ TanStack Query \+ una API pròpia pot ser una opció més senzilla i igualment vàlida.  
* **Confondre React amb Next.js.** Són coses diferents: React és la llibreria de components; Next.js (com altres metaframeworks) hi afegeix tota la infraestructura de producció al voltant.  
* **Pensar que "metaframework" vol dir el mateix arreu.** Cada un té una filosofia diferent: Next.js aposta per React Server Components i integració amb Vercel; React Router aposta per estàndards web i progressive enhancement.

## **7\. Connexió amb altres conceptes del temari**

* Els metaframeworks construeixen directament sobre el **model basat en components**: les "pages" i "layouts" no són més que components React organitzats segons una convenció de fitxers  
* Els **React Server Components** de Next.js porten la idea de la **programació declarativa** un pas més enllà: declares quin component s'executa "al servidor" i quin "al client", i el framework s'encarrega de la resta  
* Connecten amb els **Hooks**: tots aquests frameworks introdueixen els seus propis Hooks especialitzats (per a navegació, per a obtenir dades de loaders, etc.), seguint exactament les mateixes regles dels Hooks que ja has après  
* Es relacionen amb el **DOM virtual i la reconciliation**: en el cas dels Server Components, una part de la feina de renderitzat ja no passa mai pel DOM virtual del navegador, perquè es resol completament al servidor abans d'arribar al client

## **8\. Preguntes de repàs** 

**1\. Quina diferència fonamental hi ha entre React i un metaframework com Next.js?**

React és una llibreria que només s'encarrega de construir i actualitzar interfícies (el model de components, el DOM virtual, etc.). Un metaframework hi afegeix tota la infraestructura que React no proporciona per si sol: routing, renderitzat al servidor, obtenció de dades integrada, optimitzacions automàtiques i una estructura de projecte convencional.

**2\. Què ha passat amb Remix, i per què és important saber-ho el 2026?**

Remix com a projecte independent ja no existeix: es va fusionar amb React Router v7, que ara inclou els seus patrons principals (loaders, actions, server rendering) en el que s'anomena "framework mode". Existeix un "Remix 3" separat, però ha deixat l'ecosistema React per fer servir Preact, així que no és rellevant per a qui treballa amb React.

**3\. Quins problemes pràctics resol un metaframework que React pelat no resol per si sol?**

Evita la pantalla en blanc inicial mentre es carrega el JavaScript, millora l'SEO gràcies al renderitzat al servidor, unifica el codi de frontend i backend en un mateix projecte, i elimina molt del codi repetitiu (com gestionar manualment estats de "carregant") gràcies a patrons integrats d'obtenció de dades.

**4\. Quina diferència de filosofia hi ha entre Next.js i React Router v7 (l'antic Remix)?**

Next.js aposta per React Server Components i una integració profunda amb la infraestructura de Vercel, amb un model més ric en funcionalitats però més complex d'aprendre. React Router v7 aposta per estàndards web (formularis, peticions HTTP) i progressive enhancement, amb un model mental més senzill: cada ruta té un loader, una action i un component, sense distincions de Server/Client Component.

**5\. És sempre necessari utilitzar un metaframework per construir una aplicació React?**

No. Per a aplicacions internes, eines administratives, o qualsevol cas on els usuaris sempre estiguin autenticats i l'SEO no sigui una prioritat, una configuració amb React \+ Vite \+ una llibreria de routing \+ TanStack Query (o similar) pot ser una opció vàlida i més senzilla, sense la complexitat afegida d'un metaframework complet.

 

