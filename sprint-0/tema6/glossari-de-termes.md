## **Glossari de termes: Organització i metodologia**

**Acceptance Criteria** — Veure *Criteris d'acceptació*.

**Agile** — Filosofia de desenvolupament de software basada en quatre valors i dotze principis que prioritzen la col·laboració, l'adaptació al canvi i el lliurament incremental de valor. No és una metodologia concreta sinó un marc general del qual deriven frameworks com Scrum, Kanban o XP.

**Backlog** — Llista prioritzada de tot el treball pendent d'un projecte. Conté històries d'usuari, tasques tècniques i correccions d'errors ordenades per prioritat. El Product Owner és responsable de mantenir-lo actualitzat i ben prioritzat.

**Background (Gherkin)** — Paraula clau de Gherkin que defineix passos comuns a tots els escenaris d'un Feature. S'executa automàticament abans de cada escenari per evitar repeticions.

**BDD (Behavior-Driven Development)** — Metodologia de desenvolupament que emfatitza la col·laboració entre developers, testers i stakeholders de negoci per descriure el comportament del sistema en llenguatge natural. Gherkin és el llenguatge usat en BDD.

**Bloqueig** — Qualsevol impediment que atura o ralentitza el progrés d'una tasca. S'ha de comunicar immediatament a l'equip, normalment durant el daily standup.

**Ceremonies** — Les reunions formals d'un framework Àgil. En Scrum inclou el Sprint Planning, Daily Standup, Sprint Review i Sprint Retrospective.

**CI/CD** — Integració Contínua i Desplegament Continu. Pràctica de verificar i desplegar el codi automàticament cada vegada que es fa un canvi. La CI detecta errors aviat, el CD automatitza el lliurament al servidor.

**Code Review** — Revisió del codi d'un company abans d'acceptar una Pull Request. Comprova la correcció, la qualitat i el compliment dels estàndards del projecte. Ha de comentar el codi, no la persona.

**Collective Code Ownership** — Pràctica d'XP on tot el codi és responsabilitat de tot l'equip. Qualsevol developer pot modificar qualsevol part del codebase. Elimina colls d'ampolla i distribueix el coneixement.

**Continuous Integration** — Pràctica d'XP que consisteix a integrar el codi al repositori principal moltes vegades al dia. Com més s'espera per integrar, més gran és el conflicte i el cost de resoldre'l.

**Could Have** — Tercera categoria de MoSCoW. Funcionalitats desitjables que es poden incloure si queda temps i recursos sense impactar els elements prioritaris. Representa aproximadament el 20% de l'esforç.

**Criteris d'acceptació** — Condicions concretes i verificables que han de complir-se perquè una història d'usuari es consideri completada. Defineixen el que significa "acabat" de manera inequívoca per a tot l'equip.

**Cucumber** — Eina de testing que executa escenaris escrits en Gherkin i els transforma en tests automatitzats. Suporta múltiples llenguatges de programació i és l'eina de referència per a BDD.

**Daily Standup** — Reunió diària de 15 minuts on cada membre de l'equip respon tres preguntes: "Què vaig fer ahir?", "Què faré avui?" i "Tinc algun bloqueig?". L'objectiu és sincronitzar l'equip i detectar impediments ràpidament.

**Definition of Done (DoD)** — Llista de criteris que ha de complir qualsevol tasca per considerar-se completada. Normalment inclou: codi revisat, tests passant, documentació actualitzada i desplegament a l'entorn de proves.

**Definition of Workflow** — En Kanban, el document que defineix les etapes per les quals passa el treball, els límits WIP i les condicions per passar d'una etapa a la següent.

**Deployment** — Veure *Desplegament*.

**Desplegament** — Fase de l'SDLC on el producte passa de l'entorn de desenvolupament al servidor real accessible pels usuaris. Pot fer-se per fases (beta) o de manera contínua (CD).

**DevOps** — Cultura i pràctica que integra el desenvolupament (Dev) i les operacions (Ops) en un cicle continu. Tots els processos (planificació, codificació, proves, desplegament, monitoratge) es mantenen durant tot el cicle de vida del producte.

**Driver** — En pair programming, la persona que té el teclat i escriu el codi. Es centra en els detalls tàctics: sintaxi, implementació del pas actual, correcció d'errors immediats. Ha de pensar en veu alta mentre codifica.

**DSDM** — Dynamic Systems Development Method. Framework àgil on es va originar el mètode MoSCoW. Fixa el temps, el cost i la qualitat, i negocia les funcionalitats.

**Epic** — Funcionalitat gran que agrupa moltes històries d'usuari relacionades. Massa gran per completar-se en un sol sprint, es divideix en històries més petites. Per exemple: "Sistema d'autenticació" és un epic que conté les històries de login, registre i recuperació de contrasenya.

**Estimació** — Procés de calcular l'esforç necessari per completar una tasca o história. En Agile s'usa en unitats relatives (story points) en lloc d'hores, per reflectir la incertesa inherent.

**Extreme Programming (XP)** — Metodologia àgil creada per Kent Beck que implementa Agile a través de pràctiques concretes d'enginyeria: pair programming, TDD, refactoring, integració contínua, planning game i propietat col·lectiva del codi.

**Feature** — En Gherkin, paraula clau que agrupa escenaris relacionats amb una mateixa funcionalitat. En el context de projectes, una funcionalitat concreta que aporta valor a l'usuari.

**Fibonacci** — Seqüència numèrica (1, 2, 3, 5, 8, 13, 21...) usada per estimar story points en Agile. La distància creixent entre els números reflecteix la incertesa: com més gran és una tasca, menys precisa és l'estimació.

**Flux de treball** — La seqüència d'etapes per les quals passa una tasca des que comença fins que s'entrega. En Kanban, es visualitza com a columnes en un tauler.

**Given** — Primera paraula clau del format Gherkin. Estableix el context inicial i les precondicions d'un escenari de prova. En català: "Donat".

**Gherkin** — Llenguatge específic de domini (DSL) usat en BDD per escriure escenaris de prova en text pla llegible per tothom. Usa paraules clau com Given, When, Then, And i But.

**Green** — Segon pas del cicle TDD. Escriure el mínim codi possible per fer passar el test que estava fallant.

**Happy path** — El camí ideal en un user flow o escenari de prova: tot funciona perfectament i l'usuari completa l'acció sense errors. S'ha de dissenyar primer, però mai és l'únic camí a considerar.

**Historia d'usuari** — Descripció d'una funcionalitat des de la perspectiva de l'usuari final amb l'estructura "Com a \[rol\], vull \[acció\] per tal que \[valor\]". Unitat bàsica de treball en Agile.

**Increment** — En Scrum, el producte funcional i potencialment lliurable que resulta de cada sprint. Ha de complir la Definition of Done i representar un avenç real respecte a la versió anterior.

**INVEST** — Acrònim que defineix les sis qualitats d'una bona història d'usuari: Independent, Negotiable, Valuable, Estimable, Small i Testable.

**Iteració** — Cicle de desenvolupament curt i repetitiu (típicament 1-4 setmanes) al final del qual es lliura un increment de software funcional. Sinònim de sprint en Scrum.

**Kanban** — Metodologia àgil de gestió visual del flux de treball. Usa un tauler amb columnes per representar les etapes del procés i targetes per representar les tasques. El seu principi fonamental és limitar el treball en curs (WIP limits).

**Kent Beck** — Developer i autor que va crear Extreme Programming (XP) i és un dels signants del Manifest Àgil. Considerat un dels pares de les metodologies àgils modernes.

**Lliurament incremental** — Pràctica d'entregar versions funcionals del producte de manera freqüent i regular, en lloc d'esperar a tenir tot el projecte completat. Permet obtenir feedback primerenc i corregir el rumb si cal.

**Manifest Àgil** — Document publicat el 2001 per 17 developers que defineix els quatre valors i dotze principis fonamentals del desenvolupament àgil. La base filosòfica de totes les metodologies àgils.

**Manteniment** — Última fase de l'SDLC. El software no "s'acaba" quan es desplegà: evoluciona constantment amb correccions d'errors, millores de rendiment i noves funcionalitats.

**MoSCoW** — Mètode de priorització de requisits que classifica cada element en quatre categories: Must Have, Should Have, Could Have i Won't Have. Creat per Dai Clegg el 1994\.

**Must Have** — Primera i més prioritària categoria de MoSCoW. Elements imprescindibles sense els quals el projecte no pot funcionar o no té sentit. Formen el MVP. Han d'ocupar el 50-60% de l'esforç.

**MVP (Minimum Viable Product)** — Versió mínima del producte que inclou únicament les funcionalitats Must Have i que pot ser lliurada als usuaris per obtenir feedback real.

**Navigator** — En pair programming, la persona que no té el teclat. Es centra en la visió global: revisa el codi que s'escriu, detecta errors, pensa en els propers passos i anticipa problemes. No dicta al driver, sinó que guia i pregunta.

**Pair Programming** — Pràctica d'XP on dos developers treballen junts en una sola estació de treball. Un és el driver (escriu el codi) i l'altre el navigator (revisa i guia). Intercanvien rols cada 15-30 minuts.

**Ping-Pong** — Estil de pair programming combinat amb TDD. Un developer escriu el test, l'altre escriu el codi per fer-lo passar, i s'alternen continuament.

**Planning Game** — Pràctica d'XP. Reunió de planificació que ocorre una vegada per iteració on el client i l'equip defineixen, estimen i assignen les tasques del proper cicle.

**Planning Poker** — Tècnica de estimació col·laborativa on tots els membres de l'equip trien en secret el seu valor de story points per a una tasca, els mostren alhora i debaten fins a arribar a un consens.

**Product Owner** — Rol responsable de gestionar i prioritzar el backlog del producte. Representa els interessos del client i dels usuaris davant l'equip de desenvolupament.

**Red** — Primer pas del cicle TDD. Escriure un test que falla perquè el codi que ha de provar encara no existeix.

**Refactor** — Tercer pas del cicle TDD i pràctica d'XP. Millorar l'estructura interna del codi sense canviar el seu comportament extern. Es fa contínuament i sempre amb els tests passant.

**Requisit** — Descripció d'una capacitat o condició que el sistema ha de complir. Pot ser funcional (el que fa el sistema) o no funcional (com ho fa: rendiment, seguretat, usabilitat).

**Retrospectiva** — Reunió al final de cada sprint on l'equip reflexiona sobre com ha treballat i identifica millores per al proper cicle. Respon a: "Què ha anat bé?", "Què ha anat malament?" i "Què milloraríem?".

**Scenario** — En Gherkin, paraula clau que descriu un cas de prova concret. Representa un camí específic a través d'una funcionalitat.

**Scenario Outline** — En Gherkin, plantilla que permet executar el mateix escenari múltiples vegades amb conjunts de dades diferents. Va acompanyada d'una taula d'Examples.

**Scope Creep** — Expansió no controlada de l'abast d'un projecte quan es van afegint funcionalitats no planificades sense ajustar els recursos o terminis. MoSCoW i el backlog ben gestionat ajuden a prevenir-lo.

**SDLC** — Software Development Life Cycle. El cicle de vida complet del desenvolupament de software, des de la planificació fins al manteniment. Les set fases sempre existeixen però l'ordre i la manera d'executar-les varia segons la metodologia.

**Should Have** — Segona categoria de MoSCoW. Funcionalitats importants però no crítiques. S'haurien d'incloure però es poden ajornar si cal per protegir els Must Have.

**Sprint** — Cicle de treball de durada fixa (normalment 1-4 setmanes) al final del qual l'equip lliura un increment de software funcional. Terme propi de Scrum.

**Sprint Planning** — Reunió al principi de cada sprint on l'equip selecciona les històries del backlog, les desglossa en tasques i les estima.

**Sprint Review** — Reunió al final del sprint on l'equip presenta el software funcional lliurat al client o stakeholders per obtenir feedback.

**Stakeholder** — Qualsevol persona o organització que té interès en el resultat del projecte: clients, usuaris finals, directius, inversors, etc.

**Story Points** — Unitat relativa d'estimació de l'esforç en Agile. No representa hores sinó una combinació de complexitat, incertesa i esforç. S'usa la seqüència de Fibonacci.

**TDD (Test-Driven Development)** — Pràctica d'XP on els tests s'escriuen abans que el codi. El cicle és: Red (test falla) → Green (codi mínim per passar el test) → Refactor (millorar el codi). Garanteix que tot el codi té tests i millora el disseny.

**TDD Cycle** — Veure *TDD*.

**Then** — Tercera paraula clau del format Gherkin. Defineix el resultat esperat i verificable d'un escenari. En català: "Llavors".

**Timebox** — Període de temps fix dins del qual s'ha de completar una tasca o sprint. En Agile, el temps és fix i les funcionalitats es negocien, en contrast amb el projecte tradicional on les funcionalitats són fixes i el temps és variable.

**Velocity** — Quantitat de story points que un equip completa de mitjana per sprint. S'usa per planificar sprints futurs basant-se en el rendiment passat.

**Waterfall** — Model de desenvolupament lineal i seqüencial on cada fase s'ha de completar completament abans de passar a la següent. Tot es defineix al principi i s'entrega al final. Útil per a projectes amb requisits molt estables, però poc adequat per a la majoria de projectes web actuals.

**When** — Segona paraula clau del format Gherkin. Descriu l'acció o l'esdeveniment que desencadena l'escenari. En català: "Quan".

**WIP (Work In Progress)** — El treball que l'equip té en curs en un moment donat. En Kanban, limitar el WIP és un dels principis fonamentals per millorar el flux i detectar colls d'ampolla.

**WIP Limit** — Nombre màxim de tasques permeses simultàniament en una columna del tauler Kanban. Quan s'arriba al límit, l'equip ha d'acabar les tasques existents abans d'agafar-ne de noves.

**Won't Have** — Quarta i menys prioritària categoria de MoSCoW. Funcionalitats que no s'implementaran en aquest cicle. Es documenten per evitar que es reintrodueixin informalment i per gestionar les expectatives dels stakeholders.

