## **20 Plataformes de desplegament: guia comparativa**

**20 Sites to Deploy Applications**  
[https://dev.to/joselatines/sites-to-deploy-any-application-paidfree-alternatives-3em8](https://dev.to/joselatines/sites-to-deploy-any-application-paidfree-alternatives-3em8)  
Comparativa de plataformes gratuïtes i de pagament per desplegar aplicacions.

**Per qué hi ha tantes plataformes?**

En el món de la tecnologia en ràpida evolució, desplegar aplicacions de manera eficient i segura és un aspecte crucial del recorregut de qualsevol developer. Amb una gran quantitat de plataformes de desplegament disponibles, cadascuna adreçant necessitats i preferències específiques, triar la correcta marca la diferència en velocitat, cost i mantenibilitat.

Cada plataforma té el seu públic objectiu: algunes estan optimitzades per a llocs estàtics, d'altres per a backends complets, i d'altres per a la infraestructura cloud empresarial.

**Les grans clouds: infraestructura empresarial**

* **AWS (Amazon Web Services)** — la plataforma cloud dominant amb serveis que van des de computació virtual fins a machine learning. De pagament. Ideal per a grans empreses que necessiten control total sobre la infraestructura. Corba d'aprenentatge alta però infinitament configurable.  
* **Microsoft Azure** — plataforma de computació cloud completa amb serveis que van des de la computació virtual fins als anàlisis. És la solució de referència per als desplegaments de nivell empresarial. Molt integrada amb l'ecosistema Microsoft (Active Directory, SQL Server, .NET).  
* **Google Cloud** — coneguda per la seva infraestructura robusta i escalable, ideal per a aplicacions de gran escala. Proporciona una varietat de serveis incloent computació, emmagatzematge i machine learning. Especialment potent per a projectes que necessiten BigQuery o serveis de ML.  
* **Oracle Cloud** — proporciona un conjunt complet de serveis cloud incloent computació, emmagatzematge i bases de dades, atenent als requisits de nivell empresarial. Molt orientat a empreses amb sistemes Oracle existents.

**Plataformes per a developers (Frontend)**

* **Vercel** — plataforma popular per desplegar aplicacions web, oferint funcionalitats com funcions serverless i CI/CD automàtic. És la favorita per a frameworks d'aplicacions web. La millor opció per a Next.js (creat pel mateix equip), React i qualsevol framework JavaScript modern. Desplegament automàtic des de GitHub amb preview deployments per a cada PR.  
* **Netlify** — és la plataforma popular per allotjar llocs web estàtics i aplicacions JAMstack. S'integra perfectament amb sistemes de control de versions com Git. És la favorita per a llocs web dinàmics. Molt similar a Vercel, amb drag-and-drop com a diferencial per a desplegaments ràpids.  
* **GitHub Pages** — proporciona una manera senzilla d'allotjar llocs web estàtics directament des del teu repositori de GitHub. És una excel·lent opció per a projectes de codi obert i llocs web personals. Completament gratuïta i perfecta per a portfolis i documentació.  
* **Cloudflare Pages** — ofereix serveis de CDN global, convertint-la en una excel·lent opció per a desplegaments de llocs web ràpids i segurs. Una de les millors opcions per a rendiment global gràcies a la xarxa CDN de Cloudflare en més de 200 ciutats.

**Plataformes per a backends i full-stack**

* **Heroku** — conegut per la seva simplicitat, és una plataforma cloud que permet als developers construir, desplegar i escalar aplicacions sense esforç. Suporta múltiples llenguatges de programació. Recomanat per a llocs web dinàmics. Va ser durant anys la referència per als backends Node.js i Ruby on Rails. Va eliminar el tier gratuït el 2022, cosa que va empènyer molts developers cap a alternatives.  
* **Render.com** — plataforma cloud que automatitza el desplegament i l'escalat d'aplicacions. Es considera l'alternativa moderna a Heroku: suporta servidors Node.js, Python, Ruby, bases de dades PostgreSQL i contenidors Docker. Té tier gratuït (amb limitació: el servidor s'adorm sense tràfic).  
* **Railway.app** — se centra en simplificar el procés de desplegament per als developers. Suporta diversos frameworks i llenguatges. Molt popular per la seva simplicitat: en pocs minuts tens un servidor Node.js o una base de dades PostgreSQL funcionant. Preu basat en ús real, sense plans mensuals fixos.  
* **Fly.io** — és una plataforma que permet als developers desplegar aplicacions globalment amb baixa latència. Està construïda per gestionar aplicacions modernes i distribuïdes. Especialitzada en executar aplicacions Docker en múltiples regions simultàniament. Bona opció per a APIs que necessiten baixa latència a tot el món.

**Plataformes especialitzades**

* **Firebase** — Firebase, propietat de Google, és una plataforma de desenvolupament d'aplicacions mòbils i web. Ofereix base de dades en temps real, autenticació i serveis d'allotjament, convertint-la en una solució integral per al desenvolupament d'apps. Backend-as-a-Service: no cal gestionar servidors. Ideal per a apps que necessiten auth, base de dades en temps real i hosting en un sol lloc.  
* **Supabase.io** — és una alternativa de codi obert a Firebase, proporcionant base de dades en temps real i serveis d'autenticació per a aplicacions web i mòbils. Proporciona PostgreSQL, autenticació, storage i APIs automàtiques. Molt popular entre developers de React i Next.js com a backend sense servidor.  
* **PythonAnywhere** — és una plataforma per allotjar i executar scripts i apps web de Python. És particularment útil per als developers Python que busquen una solució de desplegament senzilla.  
* **Replit.com** — és un IDE online i plataforma col·laborativa que permet als developers escriure, compartir i desplegar codi en múltiples llenguatges. Molt usat en educació i per a prototips ràpids. Permet programar i desplegar directament des del navegador.  
* **Streamlit Sharing** — és una plataforma per desplegar apps de Streamlit sense esforç. Està pensada per a científics de dades i enginyers que treballen en aplicacions centrades en dades.  
* **Fleek** — és una plataforma d'allotjament descentralitzada construïda sobre IPFS (InterPlanetary File System). Permet als developers desplegar i allotjar llocs web sense dependre de servidors tradicionals.

**Com triar: el diagrama de decisió**

| Quin tipus d'aplicació tens?         │         ├── Llocs estàtics (HTML/CSS/JS)         │         │         │         ├── Portfolio / docs → GitHub Pages (gratis)         │         ├── SPA React/Vue/Vite → Netlify o Vercel (gratis)         │         └── Alta velocitat global → Cloudflare Pages         │         ├── Aplicació full-stack (frontend \+ backend \+ BD)         │         │         │         ├── Equip petit / MVP → Railway o Render         │         ├── Empresa gran → AWS, Azure o Google Cloud         │         └── Prototip ràpid → Heroku (de pagament)         │         ├── Backend com a servei (sense gestionar servidor)         │         │         │         ├── Auth \+ BD \+ APIs automàtiques → Supabase         │         └── Temps real \+ mòbil → Firebase         │         └── Específic per a Python → PythonAnywhere |
| :---- |

**Taula resum de les principals plataformes**

| Plataforma | Tipus | Cost | Ideal per a |
| ----- | ----- | ----- | ----- |
| **Vercel** | Frontend/Serverless | Free \+ Paid | Next.js, React, frameworks |
| **Netlify** | Frontend/Serverless | Free \+ Paid | SPAs, JAMstack |
| **GitHub Pages** | Estàtic | Gratuït | Portfolis, docs |
| **Cloudflare Pages** | Estàtic/CDN | Free \+ Paid | Llocs amb tràfic global |
| **Render** | Full-stack | Free \+ Paid | Node.js, backends |
| **Railway** | Full-stack | Free \+ Paid | Backends, bases de dades |
| **Fly.io** | Contenidors | Free \+ Paid | Apps Docker global |
| **Firebase** | BaaS | Free \+ Paid | Apps mòbils, temps real |
| **Supabase** | BaaS | Free \+ Paid | Alternativa Firebase open source |
| **AWS** | Cloud | De pagament | Empresa, infraestructura complexa |
| **Azure** | Cloud | De pagament | Empresa ecosistema Microsoft |
| **Google Cloud** | Cloud | De pagament | ML, Big Data, gran escala |

