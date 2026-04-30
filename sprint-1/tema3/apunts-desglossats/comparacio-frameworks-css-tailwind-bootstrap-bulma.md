## **Comparació de Frameworks CSS: Tailwind, Bootstrap i Bulma**

**Tailwind CSS Documentation**  
[https://tailwindcss.com/](https://tailwindcss.com/)  
Documentació oficial de Tailwind CSS, un framework basat en utilitats.

**Bootstrap Documentation**  
[https://getbootstrap.com/](https://getbootstrap.com/)  
Guia oficial de Bootstrap, framework popular per a front-end responsive.

**Per què existeixen tres frameworks tan diferents?**

Cada framework va néixer per resoldre un problema concret i reflecteix una filosofia diferent sobre com s'hauria d'escriure el CSS. Bootstrap segueix una filosofia de disseny basat en components, proporcionant una àmplia gamma de components predissenyats que es poden integrar fàcilment en projectes. Bulma adopta un enfocament de framework CSS modern que emfatitza la simplicitat i la responsivitat. Tailwind CSS abraça una filosofia utility-first, on els developers usen classes utilitàries petites i reutilitzables per construir dissenys personalitzats directament en el markup.

**Bootstrap: el veteran dels components**

Bootstrap és un dels frameworks web CSS de llarga durada que encara s'usa. Va ser creat i publicat en codi obert per Twitter el 2011\. El seu propòsit principal és garantir que les aplicacions web siguin adaptables i adequades per a dispositius mòbils. És un framework més madur i ben establert amb una gran quantitat de components prefabricats i documentació exhaustiva.

**Filosofia** — Component-first. Proporciona botons, formularis, modals, navbars i graelles ja fets i polits. La idea és "porta el teu contingut i nosaltres posem l'estètica".

**Sintaxi** — Classes descriptives i semàntiques que descriuen el component o el comportament:

\<\!-- Bootstrap: llegible i directe \--\>  
\<button class="btn btn-primary btn-lg"\>  
  Enviar  
\</button\>

\<div class="container"\>  
  \<div class="row"\>  
    \<div class="col-md-8"\>Contingut principal\</div\>  
    \<div class="col-md-4"\>Sidebar\</div\>  
  \</div\>  
\</div\>

**Personalització** — Bootstrap ofereix personalització a través de variables i mixins de SASS, permetent sobreescriure els estils per defecte i crear un aspecte únic. No obstant, la personalització extensiva pot requerir un coneixement més profund de l'estructura del framework.

**Punt feble** — Bootstrap té una mida de bundle CSS i JS força gran. Això pot tenir un impacte en la velocitat i el rendiment del lloc web, particularment en xarxes lentes. A més, si depens massa dels estils integrats, el lloc web podria acabar semblant-se a molts altres, donant el reconeixible "Bootstrap look".

**Tailwind CSS: el rei de la personalització**

Tailwind CSS és el framework CSS més usat el 2025, amb el 37% dels developers usant-lo activament segons l'enquesta State of CSS. Tailwind és un framework utility-first que va canviar com la majoria de developers pensen sobre escriure CSS. En lloc d'usar components predissenyats, composes la UI combinant classes utilitàries petites directament dins del HTML.

**Filosofia** — Utility-first. No hi ha components predefinits. En canvi, proporciona classes de baix nivell per a cada propietat CSS imaginable. Cada classe fa exactament una cosa.

**Sintaxi** — Classes curtes i funcionals directament a l'HTML:

\<\!-- Tailwind: explícit però dens \--\>  
\<button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"\>  
  Enviar  
\</button\>

\<div class="max-w-7xl mx-auto px-4"\>  
  \<div class="flex gap-8"\>  
    \<main class="flex-1"\>Contingut principal\</main\>  
    \<aside class="w-64"\>Sidebar\</aside\>  
  \</div\>  
\</div\>

**Personalització** — Tailwind proporciona capacitats de personalització inigualables a través del seu fitxer de configuració, on els developers poden definir els seus design tokens com colors, espaiat i breakpoints. Això permet un sistema de disseny altament personalitzat que pot evolucionar amb el projecte.

**Rendiment** — Tailwind CSS té una mida de fitxer relativament petita (aproximadament 27kb) comparada amb la de Bootstrap (prop de 300kb). A més, la mida global del projecte Tailwind es pot reduir encara més usant PurgeCSS, que elimina les classes CSS no usades.

**Punt feble** — Per a projectes grans, el markup pot tornar-se verbós i difícil de llegir degut a l'aplicació directa d'estils en HTML a través de classes utilitàries. A més, té una corba d'aprenentatge més pronunciada per als developers acostumats a frameworks tradicionals.

**Bulma: el punt mig modern**

Bulma és un framework CSS modern de codi obert construït principalment amb Sass i un sistema Flexbox. Ofereix columnes modulars per a un desenvolupament fàcil i ve amb una paleta de colors predefinida per proporcionar un ampli nombre d'opcions de disseny.

**Filosofia** — Els principis de disseny de Bulma se centren en la simplicitat, la llegibilitat i la flexibilitat, convertint-lo en una gran opció per als developers que prefereixen un framework lleuger i senzill. Es troba entre Bootstrap (molts components) i Tailwind (màxima flexibilitat).

**Sintaxi** — Classes semàntiques i descriptives, llegibles i sense JavaScript:

\<\!-- Bulma: net i llegible \--\>  
\<button class="button is-primary is-large"\>  
  Enviar  
\</button\>

\<div class="container"\>  
  \<div class="columns"\>  
    \<div class="column is-8"\>Contingut principal\</div\>  
    \<div class="column is-4"\>Sidebar\</div\>  
  \</div\>  
\</div\>

**Diferencial clau** — A diferència de Bootstrap, Bulma és únicament CSS. No inclou JavaScript ni jQuery integrats. Afegir una funcionalitat bàsica que requereix JavaScript, com un toggle, requereix escriure un script personalitzat. Això és un avantatge per als projectes que ja usen un framework JavaScript com Vue o React.

**Personalització** — Bulma proporciona una mica més de flexibilitat per a la personalització comparada amb Bootstrap. A més, la seva estructura modular proporciona més control sobre projectes individuals. Permet importar únicament els mòduls necessaris per a les funcionalitats desitjades, ometent els que no són necessaris.

**Punt feble** — Té una comunitat i ecosistema més petits que Bootstrap i Tailwind. La biblioteca de components predissenyats de Bulma pot resultar en fitxers CSS més grans, cosa que podria afectar el rendiment, particularment si només s'usa una part de les funcionalitats del framework.

**Comparativa directa**

|  | Bootstrap | Tailwind | Bulma |
| ----- | ----- | ----- | ----- |
| **Filosofia** | Component-first | Utility-first | Flexbox-first, simplista |
| **Creat per** | Twitter (2011) | Adam Wathan (2017) | Jeremy Thomas (2016) |
| **JavaScript** | Inclòs | No inclòs | No inclòs |
| **Mida bundle** | \~300kb | \~27kb (+ purge) | \~200kb (sense purge) |
| **Corba d'aprenentatge** | Baixa | Mitjana-alta | Baixa-mitjana |
| **Personalització** | Limitada (SASS) | Total (config.js) | Alta (SASS modular) |
| **HTML resultant** | Net | Verbose | Net |
| **Risc de disseny genèric** | Alt | Baix | Mitjà |
| **Popularitat 2025** | 21.6% devs | 37% devs | \~5% devs |
| **Millor per a...** | Prototips ràpids, backends, principiants | Productes únics, SaaS, React/Next.js | Projectes CSS-only, equips petits |

**Casos d'ús ideals**

**Usa Bootstrap quan:**

* Necessites un prototip o MVP funcional en poc temps  
* Treballes en una eina interna, admin panel o dashboard corporatiu  
* L'equip té developers de backend que no volen pensar molt en CSS  
* El teu equip és mixt en experiència CSS o estàs construint alguna cosa convencional com un panell d'administració o un lloc corporatiu.

**Usa Tailwind quan:**

* Vols control total, un disseny únic, i no t'importa invertir un o dos dies aprenent el sistema de classes. És l'estàndard de la indústria per a UIs de productes moderns.  
* Treballes amb React, Next.js, Vue o qualsevol framework modern  
* El projecte és un SaaS, una landing page o un producte amb identitat visual pròpia

**Usa Bulma quan:**

* Vols alguna cosa neta, lleugera i únicament CSS — especialment si ja tens un framework JavaScript que gestiona la interactivitat.  
* Prefereixes classes semàntiques llegibles sobre "utility soup"  
* El projecte és un lloc intern d'empresa amb molta feina de formularis i taules CRUD

**La tendència el 2025**

Tailwind encapçala els rànquings del framework segons l'enquesta State of CSS 2025, i la resta del camp s'està redistribuint ràpidament. Tailwind CSS v4.0 llançada el gener de 2025 executa builds completes fins a 5 vegades més ràpidament que v3, amb builds incrementals més de 100 vegades més ràpides. 

Bootstrap segueix sent sòlid però perd terreny gradualment entre els developers més joves. Bulma és una opció de nínxol apreciada per la seva llegibilitat i senzillesa.

