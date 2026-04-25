## **Apunts tema 5: Anàlisi funcional i diagramació lògica**

**1\. Algorítmia: la base de tot**

Un algorisme és un conjunt d'instruccions ordenades, precises i finites per resoldre un problema. Té tres parts: **entrada** (les dades amb les quals treballa), **procés** (els passos que transformen les dades) i **sortida** (el resultat obtingut). En programació, l'algorisme sempre va **abans** del codi: primer penses la solució, després l'escrius.

Les característiques d'un bon algorisme: és seqüencial (s'executa en ordre), precís (sense ambigüitats), finit (té inici i fi) i definit (els mateixos inputs sempre donen els mateixos outputs). Exemples quotidians: una recepta de cuina, les instruccions d'un GPS, l'algorisme de Google que ordena resultats de cerca.

**2\. Flux lògic: el diagrama del sistema**

Un flux lògic representa visualment els passos que segueix un sistema per completar una tasca. És l'eina principal per entendre **com es comuniquen les parts del sistema** abans d'escriure codi.

Els símbols bàsics que cal conèixer: oval (inici/fi), rectangle (acció o procés), rombe (decisió: sí o no), paral·lelogram (entrada/sortida de dades) i fletxes (direcció del flux).

La comunicació entre frontend i backend segueix sempre el mateix patró: el frontend fa una **petició** (request) i el backend retorna una **resposta** (response). Dibuixar el flux t'obliga a pensar en tots els casos, no només en el "camí feliç" quan tot funciona perfectament. El rombe de decisió és el punt clau: cada bifurcació té dos camins i tots dos han d'estar representats.

**3\. Sitemap vs. User Journey Map**

El **sitemap** respon a: *quines pàgines existeixen i com s'organitzen?* És un diagrama d'estructura, com el plànol d'un edifici. Es fa a la fase inicial de planificació i és útil per a developers, arquitectes d'informació i clients.

El **user journey map** respon a: *com viu l'usuari el producte?* Inclou etapes, accions, emocions i friccions. Es fa a la fase d'anàlisi UX per detectar on s'encalla l'usuari o on abandona el procés.

La regla pràctica: el sitemap va primer (defineixes l'estructura) i el user journey map va després (valides que l'estructura té sentit per a l'usuari).

**4\. UML vs. ERD**

**UML** (Unified Modeling Language) modela tot el sistema software: classes, comportaments, seqüències, casos d'ús. S'usa per dissenyar la lògica de l'aplicació i la comunicació entre components. Hi ha molts tipus: diagrama de classes, de seqüència, d'activitat, de casos d'ús.

**ERD** (Entity-Relationship Diagram) modela únicament la base de dades: entitats (taules), atributs (columnes) i relacions entre taules (un a molts, molts a molts). Cada entitat serà una taula, cada atribut una columna.

En un projecte real uses els dos: UML per dissenyar el sistema complet i ERD específicament per dissenyar la base de dades.

**5\. User Flow: anticipar problemes d'experiència**

Un user flow mapeja exactament els passos que segueix un usuari per completar una tasca. Els elements clau que no poden faltar:

**Punt d'entrada**: d'on arriba l'usuari (homepage, anunci, email).   
**Happy path**: el camí ideal quan tot funciona.   
**Punts de decisió**: representats com a rombes, on el flux es bifurca.   
**Estats d'error**: el que passa quan alguna cosa falla (camp buit, pagament denegat, connexió perduda).   
**Feedback del sistema**: confirmacions, loaders, missatges d'error.   
**Punt de sortida**: on acaba satisfactòriament el flux.

Detectar punts de fricció al diagrama és molt més barat que detectar-los un cop el codi ja està escrit. En cada pas pregunta't: *i si l'usuari fa X, on va?*

**6\. Eines de diagramació**

**Eines visuals (arrossegar i soltar):**

Draw.io és completament gratuïta, funciona al navegador sense compte i té plantilles per a UML, ERD i fluxos. Ideal per a diagrames tècnics i presentacions a clients. Lucidchart és similar però amb més funcionalitats de col·laboració. Flowmapp està especialitzada en sitemaps i user flows integrats: tot en un sol lloc.

**Eines code-first:**

Mermaid.js genera diagrames a partir de text. S'integra amb Markdown, funciona a GitHub i VS Code. Els diagrames van al repositori com a text pla i s'actualitzen fàcilment. Ideal per a documentació tècnica que ha de viure amb el codi.

**Eines d'esbós ràpid:**

Excalidraw té estètica hand-drawn intencional: perfecta per a discussions tècniques i brainstorming. No cal compte, és gratuïta i open source.

**Ecosistema Figma:**

Figma per a wireframes i prototips d'alta fidelitat. FigJam per a brainstorming i col·laboració en temps real.

La regla pràctica: en fases inicials (exploració, reunions) usa eines visuals. En fases de desenvolupament (documentació al repo) usa Mermaid.

**7\. Bones pràctiques de documentació visual**

Un diagrama mal fet confon més que ajuda. 

Les regles fonamentals: 

1. Usa sempre els símbols estàndard  
2. Mantén el flux en una sola direcció (dalt a baix o esquerra a dreta)  
3. Etiqueta totes les bifurcacions dels rombes (Sí/No)  
4. Evita que les fletxes es creuin  
5. Usa la mateixa mida i espaiat per a tots els elements  
6. Si el diagrama és massa gran divideix-lo en diagrames més petits enllaçats.

El millor test: mostra el diagrama a algú que no el coneix i demana-li que expliqui el procés. Si s'encalla, el diagrama necessita millorar.

**8\. Usabilitat: les 10 Heurístiques de Nielsen**

Les heurístiques de Nielsen són les regles generals estàndard de la indústria per avaluar si una interfície és usable. No són lleis absolutes: són regles generals que t'ajuden a detectar problemes sistemàticament.

Les deu heurístiques resumides:

**1\. Visibilitat de l'estat del sistema**: l'usuari sempre ha de saber el que passa (loaders, confirmacions, indicadors de pas).

**2\. Correspondència amb el món real**: usa paraules i metàfores que l'usuari ja coneix, no argot tècnic intern.

**3\. Control i llibertat de l'usuari**: sempre ha d'haver-hi una sortida (desfer, cancel·lar, tornar).

**4\. Consistència i estàndards**: si alguna cosa significa X en una pantalla, ha de significar X a totes les pantalles.

**5\. Prevenció d'errors**: dissenya per evitar errors abans de produir-se, no per gestionar-los després.

**6\. Reconeixement en lloc de record**: mostra les opcions visibles; no obliguis l'usuari a recordar informació d'una pantalla anterior.

**7\. Flexibilitat i eficiència d'ús**: ofereix dreceres per a usuaris avançats sense complicar l'experiència dels novells.

**8\. Disseny estètic i minimalista**: tot element que no aporta valor distrau de l'important.

**9\. Ajudar a recuperar-se dels errors**: els missatges d'error han d'estar en llenguatge planer, explicar el problema i proposar una solució.

**10\. Ajuda i documentació**: si cal documentació, ha de ser fàcil de trobar, curta i centrada en la tasca.

**9\. Quan usar cada diagrama**

| Pregunta | Diagrama |
| ----- | ----- |
| Quines pàgines té el lloc i com es connecten? | Sitemap |
| Com viu l'usuari el producte emocionalment? | User Journey Map |
| Quins passos segueix l'usuari per fer X? | User Flow |
| Com funciona la lògica del sistema? | Flux lògic / UML |
| Com s'estructura la base de dades? | ERD |
| Quines classes existeixen i com es relacionen? | UML Class Diagram |
| Com interactuen els components en el temps? | UML Sequence Diagram |
| Quines accions pot fer cada tipus d'usuari? | UML Use Case Diagram |

**10\. El procés recomanat per a un projecte nou**

El flux de treball que integra tots els conceptes és el següent: 

1. Primer defineixes els **requisits** (què ha de fer el producte)  
2. Després crees el **sitemap** (quines pàgines existiran)  
3. Seguidament el **user flow** (com l'usuari les recorrerà)  
4. Després el **flux lògic** (com funciona la lògica del sistema internament)  
5. Paral·lelament l'**ERD** (com s'emmagatzemen les dades) i el **UML** si cal documentar arquitectura complexa  
6. Finalment apliques les **heurístiques de Nielsen** per revisar que la interfície és usable abans d'implementar-la.

