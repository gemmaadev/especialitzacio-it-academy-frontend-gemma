## **Shared Hosting, VPS i Serverless: comparativa completa**

**El context: per quèimporta triar bé l'allotjament**

La decisió de com i on desplegar una aplicació web no és únicament tècnica: afecta el cost, el rendiment, la seguretat, la capacitat de creixement i quant temps l'equip dedica a gestionar infraestructura en lloc de construir producte. No hi ha una opció universalment millor: cada model té el seu context ideal.

**Shared Hosting: l'opció econòmica per a projetes petits**

Shared hosting és una solució d'allotjament on múltiples llocs web comparteixen els recursos del mateix servidor, oferint avantatges econòmics, però aquesta economia pot venir a costa del rendiment.

La metàfora perfecta: shared hosting és com llogar una habitació en un apartament on comparteixes recursos comuns, aigua, electricitat i a vegades fins i tot el Wi-Fi, amb altres inquilins. En termes d'allotjament web, el teu lloc web comparteix un servidor físic i els seus recursos (CPU, RAM, emmagatzematge, amplada de banda) amb múltiples altres llocs web.

* **Avantatges:**

Shared hosting és sovint la opció més econòmica per allotjar un lloc web. El cost es reparteix entre múltiples usuaris, fent-lo econòmic per a particulars i petites empreses. La configuració és senzilla i el proveïdor s'encarrega del manteniment del servidor, les actualitzacions de seguretat i el suport tècnic. Preus habituals a partir de 2-5€/mes.

* **Desavantatges:**

El problema principal és l'**efecte veí sorollós**: si un altre lloc web del mateix servidor consumeix molts recursos (pic de trànsit, procés mal optimitzat), el teu lloc se'n ressent. El rendiment del teu lloc web pot veure's afectat per les activitats d'altres usuaris.

A més, les opcions de personalització i el control sobre el servidor són molt limitats. Pots instal·lar PHP, WordPress i poc més. No pots configurar el servidor, canviar la versió de Node.js o instal·lar dependències personalitzades.

* **Ideal per a:** 

Llocs estàtics, blogs personals, portfolis, webs corporatives senzilles amb trànsit baix i equips sense coneixements de sistemes.

**VPS: el punt mig entre control i cost**

Un Virtual Private Server (VPS) se situa entre el shared hosting i el hosting dedicat en termes de cost i rendiment. En un entorn VPS, un servidor físic es divideix en múltiples compartiments virtuals, cadascun funcionant com un servidor separat amb el seu propi sistema operatiu, recursos dedicats (CPU, RAM, emmagatzematge) i accés root complet.

La metàfora: VPS és com tenir el teu propi mini-apartament dins d'un edifici més gran: els teus recursos són privats, pots personalitzar la configuració i no et veuen afectat pels altres usuaris.

* **Avantatges:**

VPS proporciona més control i opcions de personalització comparades amb el shared hosting. Els usuaris tenen accés root al seu servidor virtual, permetent-los instal·lar aplicacions personalitzades, configurar paràmetres del servidor i implementar mesures de seguretat avançades adaptades a les seves necessitats específiques.

VPS ofereix recursos aïllats. Cada servidor virtual opera independentment dels altres en la mateixa màquina física, assegurant un rendiment i una estabilitat consistents.

Els preus habituals van de 5-50€/mes depenent dels recursos. DigitalOcean: els droplets bàsics comencen a 4€/mes per 1GB de RAM i 25GB d'SSD. AWS EC2: el preu sota demanda per a una instància t3.micro comença aproximadament a 8€/mes.

* **Desavantatges:**

VPS requereix coneixements tècnics intermedis o avançats si no és gestionat. El VPS gestionat redueix significativament la corba d'aprenentatge. Si uses un VPS no gestionat, hauràs de gestionar incidents de seguretat i configurar firewalls per protegir el servidor dels ciberatacs.

L'escalabilitat no és immediata: els recursos en un servidor VPS no són instantàniament escalables, cosa que significa que has de planificar amb setmanes o fins i tot mesos d'antelació si necesites augmentar o disminuir els recursos del servidor.

* **Ideal per a:** 

Aplicacions web amb trànsit estable i predictible, projectes que necessiten configuració personalitzada del servidor, botigues en línia de mida mitjana i equips amb coneixements de Linux i administració de sistemes.

**Serverless: paga únicament pel que uses**

Serverless hosting permet executar el teu codi sense provisionar ni gestionar servidors. El proveïdor cloud escala automàticament la infraestructura i únicament et cobra pel temps de còmput real que consumeix la teva aplicació.

El nom "serverless" és una mica enganyós: els servidors existeixen, però tu no els gestiones ni te'n preocupes. El model de cost és radicalment diferent: en lloc de pagar per un servidor que existeix les 24h del dia, pagues per execució de funcions individuals.

* **Avantatges:**

Serverless abstreu la gestió del servidor, el parcheo del SO i el manteniment del hardware. Això simplifica el desenvolupament i les operacions ja que el proveïdor cloud gestiona totes les tasques d'infraestructura. Allibera els equips de desenvolupament per centrar-se en el codi i les funcionalitats en lloc del manteniment del servidor.

Serverless excel·leix en aplicacions orientades a events. És molt adequat per a arquitectures de microserveis on els serveis individuals es disparen per events específics com crides a API o canvis a la base de dades. Cicles de desplegament més ràpids gràcies a la mínima necessitat de configuració d'infraestructura.

* **Desavantatges:**

**Cold starts** — quan una funció no s'ha usat durant un temps i s'executa de nou, hi ha un retard inicial (de 100ms a 1s) mentre el proveïdor arrenca el contenidor. Pot afectar l'experiència de l'usuari en aplicacions amb trànsit intermitent.

**Costos impredictibles** — amb l'arquitectura serverless és més fàcil perdre el control de les factures. En alguns casos, els usuaris fins i tot han reportat factures de centenars de milers per part de proveïdors cloud. Si el trànsit creix molt, pot ser molt més car que un VPS fix.

**Vendor lock-in** — el codi escrit per a AWS Lambda no funciona directament a Google Cloud Functions. Migrar pot ser costós.

* **Ideal per a:** 

APIs i microserveis amb trànsit variable o impredictible, funcions que s'executen en resposta a events (uploads, webhooks, notificacions), prototips i MVPs on la velocitat de mercat importa més que el cost, i aplicacions amb llargs períodes d'inactivitat.

**Plataformes modernes: el camí pràctic per a developers**

Per a la majoria de projectes de developers i equips petits, les plataformes modernes d'allotjament simplifiquen enormement el desplegament:

* **Vercel** — especialitzada en frameworks JavaScript (Next.js, React, Vue). Desplegament automàtic des de GitHub. Serverless per defecte. Pla gratuït molt generós per a projectes personals.  
* **Netlify** — similar a Vercel, excel·lent per a llocs estàtics i JAMstack. Functions serverless integrades. Desplegament continu des de Git.  
* **Railway / Render** — allotjament de servidors Node.js, Python, bases de dades. Menys configuració que un VPS, més control que Vercel.  
* **DigitalOcean App Platform** — VPS simplificat amb una interfície amigable. Bon punt mig entre control i facilitat d'ús.

**Comparativa directa**

|  | Shared Hosting | VPS | Serverless |
| ----- | ----- | ----- | ----- |
| **Cost** | Molt baix (2-10€/mes) | Mitjà (5-100€/mes) | Variable (0 a molt alt) |
| **Control** | Mínim | Alt (root access) | Mínim (gestiona el proveïdor) |
| **Escalabilitat** | Molt limitada | Manual i amb downtime | Automàtica i instantània |
| **Manteniment** | El proveïdor | Tu (o el proveïdor si gestionat) | El proveïdor |
| **Rendiment** | Variable (efecte veí) | Consistent i predictible | Variable (cold starts) |
| **Coneixements tècnics** | Baixos | Mitjans-alts | Baixos |
| **Ideal per a** | Blogs, portfolis, webs petites | Apps amb trànsit estable | Events, APIs, trànsit variable |
| **Cold starts** | No | No | Sí |
| **Exemples** | Hostinger, Bluehost | DigitalOcean, AWS EC2 | AWS Lambda, Vercel, Netlify |

**Com triar?**

La decisió entre serverless i VPS depèn de factors com els patrons de trànsit, l'arquitectura de l'aplicació, l'experiència del developer, el pressupost i les prioritats operatives. Per a moltes empreses, un enfocament híbrid que aprofita tant el serverless com el VPS pot proporcionar el millor dels dos móns, equilibrant cost, control i escalabilitat.

**Tria Shared Hosting si:** és la teva primera web, el trànsit és baix i predictible, no necessites configuració de servidor personalitzada i el pressupost és molt limitat.

**Tria VPS si:** necessites control sobre el servidor, tens trànsit estable, vols instal·lar dependències específiques o necesites bases de dades i processos de llarga durada.

**Tria Serverless si:** el trànsit és imprevisible o molt variable, vols zero manteniment d'infraestructura, estàs construint un prototip o MVP ràpidament, o tens funcions event-driven que no s'executen contínuament.