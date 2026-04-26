**Apunts tema 6: Organització i metodologia**

## **1\. SDLC: el cicle de vida del software**

L'SDLC (Software Development Life Cycle) és el mapa que segueix qualsevol projecte de software des que neix la idea fins que s'apaga. Té set fases que sempre existeixen, però l'ordre i la manera d'executar-les varia segons la metodologia escollida.

Les set fases: **Planificació** (val la pena fer-ho?), **Anàlisi de requisits** (què ha de fer?), **Disseny** (com es farà? aquí van els diagrames UML i ERD), **Implementació** (s'escriu el codi), **Proves** (funciona bé?), **Desplegament** (es posa en producció) i **Manteniment** (es corregeix i millora contínuament).

La clau: un error a la fase d'anàlisi es multiplica en totes les fases posteriors. Detectar un problema al paper és gratis; detectar-lo al codi ja desplegat és molt car.

**2\. Agile i el Manifest Àgil**

Agile és una filosofia de desenvolupament basada en quatre valors fonamentals: **individus i interaccions** per sobre de processos, **software funcionant** per sobre de documentació exhaustiva, **col·laboració amb el client** per sobre de negociació de contractes, i **resposta al canvi** per sobre de seguir un pla.

Els 12 principis giren al voltant de tres idees: entregar valor sovint, col·laborar constantment i adaptar-se al canvi.

**Agile vs. Waterfall:** Waterfall és lineal i seqüencial (tot es defineix al principi, s'entrega al final). Agile és iteratiu i incremental (cicles curts, lliuraments freqüents, canvis benvinguts). En la pràctica, la majoria de projectes web actuals usen Agile o híbrids.

**3\. Extreme Programming (XP)**

XP és una implementació concreta d'Agile centrada en les pràctiques d'enginyeria. Les sis pràctiques clau:

**Pair Programming** — dos developers, un sol codi. Un és el Driver (escriu, pensa tàcticament) i l'altre el Navigator (revisa, pensa estratègicament). Canvien de rol cada 15-30 minuts. Resultat: menys errors, coneixement compartit.

**TDD (Test-Driven Development)** — primer el test, després el codi. Cicle Red (test que falla) → Green (mínim codi per passar-lo) → Refactor (millorar el codi). Impossibilitat de lliurar codi sense tests.

**Refactoring** — millorar l'estructura del codi existent sense canviar el comportament. Es fa contínuament i sempre amb els tests passant.

**Continuous Integration** — integrar el codi moltes vegades al dia. Com més esperes per integrar, més gran és el conflicte. Detectar problemes aviat quan són petits i fàcils de resoldre.

**Planning Game** — planificació col·laborativa amb el client a cada iteració. Els requisits es tradueixen en tasques, s'estimen i s'assignen.

**Collective Code Ownership** — el codi és de tot l'equip. Qualsevol pot modificar qualsevol part. Elimina colls d'ampolla i distribueix el coneixement.

**4\. Històries d'usuari**

Una història d'usuari descriu una funcionalitat des de la perspectiva de l'usuari amb l'estructura **Rol \+ Acció \+ Valor**: "Com a \[rol\], vull \[acció\] per tal que \[valor\]."

Les sis qualitats d'una bona història (INVEST): **Independent**, **Negotiable**, **Valuable**, **Estimable**, **Small** (completable en un sprint) i **Testable** (té criteris d'acceptació clars).

La jerarquia: **Epic** (funcionalitat gran) → **Història** (funcionalitat concreta) → **Tasca** (pas tècnic). L'estimació es fa amb **story points** usant la seqüència de Fibonacci (1, 2, 3, 5, 8, 13...) en sessions de **Planning Poker**.

Errors comuns: missatge molt vague ("millorar el rendiment"), massa criteris d'acceptació (senyal que cal dividir la història), o historiar des de la perspectiva tècnica en lloc de l'usuari.

**5\. Criteris d'acceptació i Gherkin**

Els criteris d'acceptació defineixen les condicions concretes que han de complir-se per considerar una història acabada. Sense ells, "acabat" significa coses diferents per a cada persona de l'equip.

El format estàndard és **Gherkin** amb l'estructura **Given/When/Then** (Donat/Quan/Llavors):

Scenario: Successful login with valid credentials  
  Given the user is on the login page  
  When they enter valid credentials and click "Log In"  
  Then they are redirected to their dashboard

Les paraules clau: `Given` (context inicial), `When` (acció), `Then` (resultat esperat), `And` (condició addicional), `But` (excepció). El `Background` defineix passos comuns a tots els escenaris. El `Scenario Outline` executa el mateix escenari amb dades diferents usant una taula d'exemples.

Regla d'or: els criteris han de ser **testables i concrets**. "Ha de ser ràpid" és inútil. "Ha de respondre en menys de 200ms" és verificable.

**6\. Descomposició en tasques tècniques**

Una història d'usuari es transforma en tasques tècniques concretes durant el sprint planning. La diferència: la història parla des de la perspectiva de l'usuari, les tasques parlen des de la perspectiva del developer.

El procés: llegir la història i els criteris d'acceptació → pensar en totes les capes del sistema (frontend, backend, base de dades, tests, documentació) → verificar que tots els criteris queden coberts per alguna tasca → comprovar la Definition of Done.

El tall sempre ha de ser **vertical** (cada tasca travessa totes les capes per a una funcionalitat concreta) i no horitzontal (no "sprint 1: tota la base de dades"). Una bona tasca és completable en 1-2 dies, assignable a una sola persona i té un resultat clarament verificable.

**7\. Taulers Kanban i Backlog**

Kanban és un mètode de gestió visual del flux de treball. L'estructura bàsica té tres columnes (To Do, In Progress, Done) que es poden ampliar: `Backlog → Ready → Development → Code Review → QA → Done`.

Els **WIP Limits** (Work In Progress Limits) estableixen el màxim de tasques simultànies per columna. Quan una columna arriba al límit, l'equip ha d'acabar les tasques existents abans d'agafar-ne de noves. Força a acabar les coses abans de començar-ne, detecta colls d'ampolla i millora el flux. Una guia: 2-3 elements per membre de l'equip per columna.

El **backlog** és la llista prioritzada de tot el treball pendent. Ha de ser mantingut activament: eliminar tasques obsoletes, desglossar les masses grans, re-prioritzar regularment.

**8\. Priorització MoSCoW**

MoSCoW és el mètode estàndard per prioritzar el backlog. Classifica cada element en quatre categories:

**Must Have** — imprescindible. Sense això el producte no funciona o no té sentit. Forma el MVP. Ha d'ocupar el 50-60% de l'esforç.

**Should Have** — important però no crític. S'hauria d'incloure però es pot ajornar si cal.

**Could Have** — desitjable. S'inclou només si queda temps i recursos sense impactar els elements prioritaris. Reserva el 20% de l'esforç per a aquesta categoria.

**Won't Have (this time)** — fora de l'abast d'aquest cicle. Es documenta per al futur i evita el scope creep.

Regla pràctica: si tot és "Must Have", MoSCoW no funciona. Cal tenir valentia per decidir que hi ha coses que no s'implementaran ara.

**9\. Bones pràctiques de treball en equip**

**Commits** — petits, freqüents i amb missatges descriptius. Usa convencions: `feat:`, `fix:`, `docs:`, `refactor:`. Mai "canvis" o "arregla coses".

**Branques** — una per cada funcionalitat o correcció. Noms descriptius: `feature/login-form`, `fix/cart-total`. Elimina-les un cop fusionades. Mai treballis a `main`.

**Pull Requests** — petites, enfocades i ben documentades. Descriu el que has fet, per quèho has fet i com provar-ho. Adjunta captures si hi ha canvis visuals.

**Code Reviews** — comenta el codi, no la persona. Sigues constructiu i específic. Com a autor, no prenguis els comentaris de manera personal.

**Comunicació** — si portes més de 30 minuts encallada, demana ajuda. Documenta les decisions importants al README o wiki.

**Eines** — ESLint \+ Prettier a tots els projectes. `.gitignore` ben configurat: mai `node_modules/` ni `.env.local` al repositori. Documenta la versió de Node.js i les extensions recomanades de VS Code.

**10\. El flux complet d'un sprint**

1\. Sprint Planning  
   → Es revisa el backlog prioritzat amb MoSCoW  
   → Es seleccionen les històries per al sprint  
   → Cada història es desglossa en tasques tècniques  
   → S'estimen amb story points (Planning Poker)

2\. Durant el sprint (1-4 setmanes)  
   → Les tasques es mouen pel tauler Kanban  
   → Daily standup: què vas fer ahir / què faràs avui / tens bloquejos?  
   → Pair programming per a tasques complexes o formació  
   → TDD: test → codi → refactor  
   → Commits freqüents a la branca de feature  
   → Pull Request \+ Code Review quan la tasca està llesta

3\. Final del sprint  
   → Sprint Review: es mostra el que s'ha lliurat al client  
   → Sprint Retrospective: l'equip revisa com ha treballat i millora  
   → Tot el que no ha entrat torna al backlog prioritzat

**Quan usar cada eina**

| Situació | Eina / Pràctica |
| ----- | ----- |
| Prioritzar el backlog | MoSCoW |
| Gestionar el flux de treball | Tauler Kanban \+ WIP Limits |
| Definir una funcionalitat | Història d'usuari (Rol+Acció+Valor) |
| Validar que la funcionalitat és correcta | Criteris d'acceptació en Gherkin |
| Convertir la història en feina tècnica | Descomposició en tasques |
| Estimar l'esforç | Story Points \+ Planning Poker |
| Treballar en problemes complexos | Pair Programming |
| Garantir qualitat del codi | TDD \+ Code Review |
| Integrar el treball de l'equip | Continuous Integration |
| Millorar el codi existent | Refactoring |

