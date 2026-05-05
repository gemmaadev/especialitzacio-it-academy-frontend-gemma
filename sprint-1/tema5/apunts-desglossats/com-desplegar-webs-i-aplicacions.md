## **Com desplegar webs i aplicacions: Guia de plataformes**

**How to Deploy Your Websites and Apps**  
[https://www.freecodecamp.org/news/how-to-deploy-websites-and-applications/](https://www.freecodecamp.org/news/how-to-deploy-websites-and-applications/)  
Estratègies senzilles i pràctiques per desplegar webs i aplicacions.

**Per què cal desplegar?**

Desplegar la teva aplicació és un aspecte clau del desenvolupament de software. Típicament, tenir una app al teu sistema local no és suficient: necessita ser accessible online. Per tant, triar un pla d'allotjament i desplegament adequat és vital. La clau per prendre la decisió correcta rau en entendre l'objectiu de la teva aplicació.

Si has construït una app, hi ha diverses raons per les quals podries voler o necessitar desplegar-la: demostra professionalitat i credibilitat als usuaris, incrementa l'accessibilitat de l'aplicació a un públic més ampli, habilita la interacció i el feedback dels usuaris, facilita l'anàlisi de dades i proporciona insights per a la presa de decisions informades, i identifica àrees de millora en l'aplicació.

**Què cal considerar en triar una plataforma**

Hi ha diversos factors a tenir en compte quan se selecciona una plataforma d'allotjament: el propòsit (considera les tecnologies que has usat per construir-la i quanta capacitat d'emmagatzematge necessita la plataforma), la interfície (una bona interfície és essencial: busca un panell de control que et permeti administrar el teu lloc web fàcilment), les ressenyes (llegeix quèdiuen altres clients), la seguretat (és essencial tenir les mesures de seguretat correctes per protegir el teu lloc i les dades) i el suport (sempre hauries de tenir algú per ajudar-te quan ho necessitis).

**Plataforma 1: GitHub Pages**

GitHub Pages és un servei d'allotjament senzill i gratuït. Pots usar-lo per allotjar pàgines web estàtiques o documentació. Pots publicar el teu lloc usant GitHub Pages enviant el teu codi a un compte de GitHub i configurant un repositori.

**Com funciona:** el codi pujat a GitHub s'activa des de Settings → Pages → seleccionar la branca `main`. GitHub genera automàticament una URL del tipus `usuari.github.io/repositori`.

**Avantatges:**

GitHub Pages és simple de configurar. És gratuït. El sistema de control de versions de GitHub fa que sigui senzill fer seguiment dels canvis i treballar amb d'altres. GitHub Pages actualitza el codi del teu lloc web quan hi fas canvis. Ofereix col·laboració en projectes amb altres developers i assegura el teu lloc web a través del xifratge HTTPS.

**Limitacions:** únicament per a llocs estàtics (HTML, CSS, JS). No suporta backend amb Node.js, bases de dades ni lògica de servidor.

**Ideal per a:** portfolis, documentació de projectes, llocs estàtics senzills, pàgines de demostració del bootcamp.

**Plataforma 2: Netlify**

Netlify s'integra amb repositoris Git i funciona bé amb pàgines web estàtiques i aplicacions d'una sola pàgina (SPAs). Netlify té dues maneres d'allotjar el teu projecte: drag-and-drop i important el codi font des del repositori al lloc.

La funcionalitat de drag-and-drop és especialment pràctica per a desplegaments ràpids: simplement arrossegues la carpeta `dist/` al panell de Netlify i el lloc és accessible en pocs segons.

**Com funciona (via GitHub):** connectes el teu compte de GitHub, selecciones el repositori, configures el Build Command (`npm run build`) i el Publish Directory (`dist`). A partir d'aquí, cada push a `main` desplega automàticament la nova versió.

**Avantatges clau:** desplegament continu automàtic des de Git, preview deployments (cada Pull Request genera una URL de previsualització), funcions serverless integrades, certificat SSL gratuït automàtic i CDN global.

**Ideal per a:** llocs estàtics i SPAs construïdes amb React, Vue o Vite. La millor opció per a projectes de frontend del bootcamp.

**Plataforma 3: Vercel**

Vercel és una plataforma d'allotjament i desplegament especialitzada en aplicacions web modernes. És particularment adequada per a aplicacions d'una sola pàgina, operacions serverless i llocs web estàtics. S'integra amb frameworks populars com Next.js i Gatsby.js, fent els desplegaments ràpids i senzills.

**Avantatges:**

Vercel ofereix eines per al treball en equip efectiu, control d'accés i desplegaments cooperatius. Simplifica el lliurament de les teves apps web. Permet compartir i revisar els canvis abans que entrin en producció mitjançant els Preview Deployments. Garanteix un gran rendiment fins i tot amb un gran nombre de persones usant-lo.

**Fix per a SPAs amb routing:** quan desplego una SPA a Vercel, les rutes com `/about` poden donar 404 perquè Vercel intenta trobar el fitxer `/about/index.html` que no existeix. La solució:

| // vercel.json a l'arrel del projecte{  "rewrites": \[{ "source": "/(.\*)", "destination": "/" }\]} |
| :---- |

Això redirigeix totes les peticions al `index.html` i deixa que el router de React/Vue gestioni la navegació.

**Limitacions:** Vercel és ideal per a projectes petits i mitjanament grans, però pot no ser la millor opció per a aplicacions de gran escala amb necessitats complexes de backend.

**Ideal per a:** projectes React, Next.js i Vite. La primera opció per a deployments de frontend professionals.

**Plataforma 4: Render**

Render proporciona una interfície per a la publicació ràpida i senzilla de contingut web estàtic. Suporta una àmplia gamma de llenguatges de programació, frameworks i bases de dades, i lliura una varietat de funcionalitats integrades que milloren l'experiència d'allotjament.

A diferència de GitHub Pages, Netlify i Vercel (especialitzades en frontend), Render pot allotjar backends complets: servidors Node.js, APIs, bases de dades PostgreSQL i aplicacions Docker. És una alternativa accessible a un VPS per a projectes full-stack.

**Avantatges:**

Render té un tier gratuït per allotjar llocs web estàtics bàsics. Proporciona una estructura de preus flexible que assegura transparència i eficiència de costos. Facilita el desplegament amb una interfície i connexió amb les eines i plataformes de desenvolupament estàndard. Té bon suport d'atenció al client.

**Limitacions:** Per a aplicacions més complexes o grans, hi ha un pla de pagament. Cal entendre l'estructura de preus relacionada amb l'ús. El tier gratuït "adorm" el servidor si no rep tràfic durant un temps, causant lentitud en la primera petició.

**Ideal per a:** backends Node.js/Express, APIs, projectes full-stack que necessiten servidor i base de dades.

**Plataforma 5: Surge**

Surge és una plataforma i eina amigable que facilita i agilitza el desplegament de llocs web estàtics online. Desplegar els teus fitxers estàtics a surge.sh és fàcil usant la interfície de línia de comandes (CLI). Aquesta CLI simplifica el procés d'allotjar i distribuir els teus projectes online.

**Com funciona:** dues comandes a la terminal i el lloc és en producció:

| npm install \-g surge   \# instal·lar surge globalmentsurge                  \# desplegar la carpeta actual |
| :---- |

Avantatges: és fàcil d'usar, té desplegament ràpid, permet usar el teu domini personalitzat, proporciona certificats SSL gratuïts i és adequada per a SPAs.

**Ideal per a:** desplegaments ràpids sense configuració, demos puntuals i prototips. Especialment útil quan no vols crear un compte en cap plataforma.

**Taula comparativa: quina plataforma triar**

|  | GitHub Pages | Netlify | Vercel | Render | Surge |
| ----- | ----- | ----- | ----- | ----- | ----- |
| **Cost** | Gratuït | Gratuït (límits) | Gratuït (límits) | Gratuït (límits) | Gratuït |
| **Tipus** | Estàtic | Estàtic \+ SSR | Estàtic \+ SSR | Full-stack | Estàtic |
| **Backend** | ❌ | Funcions serverless | Funcions serverless | ✅ Node.js complet | ❌ |
| **CI/CD automàtic** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Preview deployments** | ❌ | ✅ | ✅ | ✅ | ❌ |
| **Facilitat** | Mitjana | Alta | Alta | Mitjana | Molt alta |
| **Ideal per a** | Portfolis, docs | SPAs, React | Next.js, React | APIs, backend | Demo ràpida |

##  

**Frontend estàtic o SPA (React/Vue/Vite):** usa **Netlify** o **Vercel**. Connectes el repositori de GitHub, configures el build command i ja. Cada push a `main` desplega automàticament.

**Portfolio personal:** usa **GitHub Pages**. És completament gratuït, integrat amb el teu perfil de GitHub i perfecte per mostrar projectes a entrevistadors.

**Projecte full-stack amb backend:** usa **Render**. Pots desplegar el servidor Node.js, la base de dades PostgreSQL i el frontend en una sola plataforma.

