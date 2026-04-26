**Priorització amb MoSCoW**  
[https://uifrommars.com/priorizacion-metodo-moscow/](https://uifrommars.com/priorizacion-metodo-moscow/)  
Mètode de priorització basat en must, should, could i won’t.

## **Taulers Kanban i Priorització MoSCoW**

**Què és Kanban?**

Kanban és un mètode de gestió àgil que usa taulers visuals per ajudar els equips a fer el seguiment del treball a través de les etapes de finalització. Construït sobre una filosofia de millora contínua, Kanban "tira" elements de treball d'un backlog de producte cap a un flux constant i manejable.

La paraula Kanban és japonesa i significa "tauler" o "cartell". Va ser creat per Taiichi Ohno a Toyota als anys 40 com a sistema de producció just-in-time, i dècades després els equips de software van adoptar la mateixa lògica per gestionar tasques en lloc de peces de cotxes.

**Els elements del tauler Kanban**

Cada peça de treball, ja sigui una tasca, una història d'usuari o un lliurament, existeix com una targeta al tauler. Cada targeta es mou a través de columnes que representen les etapes del flux de treball.

Les **columnes** representen els estats pels quals passa cada tasca. La configuració mínima és tres columnes: To Do (pendent), In Progress (en curs) i Done (fet). Però en un equip de desenvolupament real les columnes solen ser més específiques:

Backlog → Ready → Development → Code Review → QA Testing → Done

Les **targetes** representen cada tasca o història d'usuari. Les targetes han d'incloure prou context: persona assignada, data límit, nivell de prioritat i qualsevol bloqueig, de manera que qualsevol que miri el tauler pugui entendre l'estat del treball sense haver de preguntar res.

Les **swimlanes** són files horitzontals que separen tipus de treball. Per exemple: una fila per a noves funcionalitats, una altra per a bugs i una altra per a tasques tècniques.

**WIP Limits: el secret de l'eficiència**

Els WIP limits (Work In Progress limits) estableixen el nombre màxim de tasques que pot haver-hi en cada columna en un moment donat. Limitar el treball en curs fa més fàcil identificar ineficiències en el flux de treball de l'equip. Els colls d'ampolla en el pipeline de lliurament de l'equip es fan clarament visibles abans que la situació es torni greu.

Imagina que tens 3 developers i el límit de la columna "Code Review" és 2\. Quan ja hi ha 2 targetes esperant revisió, ningú pot moure una nova targeta a aquesta columna. En lloc d'agafar feina nova, els developers han d'ajudar a desbloquejar la revisió pendent. Això força a acabar les coses abans de començar-ne de noves.

Els equips que apliquen WIP limits milloren els temps de lliurament un 37%. Centrant-se en completar les tasques abans de començar-ne de noves, els equips milloren el rendiment, redueixen el canvi de context i lliuren resultats significativament millors.

Una guia pràctica per establir WIP limits: escala per la mida de l'equip. Permet dos o tres elements per membre de l'equip en una etapa. Per exemple, tres developers × dos elements cada un \= un WIP limit de sis.

**Backlog Management: el dipòsit de tot el treball pendent**

El backlog és on s'afegeixen les noves històries d'usuari per part de product owners, project managers i qualsevol persona que tingui veu en el que fa l'equip. El backlog ha de ser mantingut i prioritzat de manera consistent com una funció de Kanban.

El backlog no és una llista desordenada de desitjos: és una llista prioritzada on el que és més important apareix a dalt i el que és menys urgent apareix a baix. La persona responsable de mantenir-lo ordenat és el **Product Owner**.

Les pràctiques de backlog management inclouen: eliminar tasques que ja no tenen sentit, desglossar tasques massa grans en tasques més petites, re-prioritzar regularment a mesura que el projecte evoluciona, i assegurar que cada tasca tingui prou detall per poder-la executar.

**Priorització MoSCoW**

Tenir un backlog amb moltes tasques és normal, però com saps per on començar? Aquí entra el mètode **MoSCoW**. MoSCoW és un acrònim de "must-have", "should-have", "could-have" i "won't-have (this time)". La idea és que els elements es categoritzen al principi del projecte per clarificar el que és estrictament necessari, el que és desitjable i el que el projecte pot prescindir.

**Les quatre categories de MoSCoW**

**Must Have** — requisits crítics sense els quals el projecte no pot funcionar. Si no es compleixen, el projecte es considera un fracàs. Són no negociables. Exemples: el sistema de login, la passarel·la de pagament, la funcionalitat principal del producte.

**Should Have** — funcionalitats importants però no crítiques. Són elements d'alta prioritat que no són tan urgents com els Must Have. Es poden ajornar si cal però s'haurien d'incloure si els recursos ho permeten. Exemples: la funcionalitat de cerca, les notificacions per email, el filtre de resultats.

**Could Have** — funcionalitats desitjables que no afecten l'èxit global del projecte. Només s'inclouen si el temps i els recursos ho permeten sense impactar els elements prioritaris. Exemples: el canvi de tema de colors, la traducció a altres idiomes, animacions de la interfície.

**Won't Have (this time)** — funcionalitats que no s'implementaran en aquest cicle però que queden registrades per al futur. Definir clarament el que no s'inclourà ajuda a evitar el scope creep (l'expansió no controlada de l'abast del projecte). Exemples: funcionalitats de realitat virtual, integracions amb plataformes secundàries, reports avançats.

**Com aplicar MoSCoW en pràctica**

Una distribució recomanada de l'esforç és: els elements "Must" haurien d'ocupar entre el 50-60% de l'esforç. "Must \+ Should" combinats entre el 60-70%. El 20% del temps es reserva per als elements "Could" per permetre flexibilitat i innovació. L'esforç total per als elements crítics "Must \+ Should" no hauria de superar el 80% per gestionar reptes imprevistos.

El procés pas a pas: llista tots els requisits del backlog, reuneix els stakeholders per categoritzar-los junts, assigna cada element a una categoria debatent en equip, i revisa les prioritats regularment a mesura que el projecte avança.

El MVP (Minimum Viable Product) seria tots els epics marcats com a Must Have. Si fins i tot amb el MVP l'equip té massa feina per a la seva capacitat, pot tornar a aplicar MoSCoW per seleccionar quines funcionalitats concretes dins dels Must Have s'implementen primer.

**Exemple aplicat: app de comerç electrònic**

| Funcionalitat | MoSCoW | Motiu |
| ----- | ----- | ----- |
| Login i registre | Must Have | Sense accés no hi ha app |
| Catàleg de productes | Must Have | Funcionalitat principal |
| Passarel·la de pagament | Must Have | Sense pagament no hi ha negoci |
| Cerca de productes | Should Have | Important però pot esperar |
| Ressenyes d'usuaris | Should Have | Afegeix valor però no és crític |
| Filtre per colors | Could Have | Millora l'experiència però no és essencial |
| Llista de desitjos | Could Have | Desitjable si queda temps |
| Realitat augmentada | Won't Have | Fora de l'abast d'aquest cicle |

**Kanban vs. Scrum: la diferència clau**

Kanban i Scrum tots dos són frameworks àgils, però s'organitzen de manera diferent. En Scrum el treball es fa en sprints de durada fixa (1-4 setmanes) amb un conjunt de tasques compromeses per al sprint. En Kanban el flux és continu: no hi ha sprints, les tasques entren i surten del tauler de manera constant, i l'equip treballa al seu propi ritme sempre que respecti els WIP limits. Per a equips que comencen, Kanban sol ser més senzill d'implementar perquè requereix menys cerimònies i és més flexible.

