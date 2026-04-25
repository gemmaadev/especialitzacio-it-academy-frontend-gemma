## **Glossari de termes: Anàlisi funcional i diagramació lògica**

**Algorisme** — Conjunt d'instruccions ordenades, precises i finites per resoldre un problema o completar una tasca. Té sempre tres parts: entrada, procés i sortida. En programació, es defineix abans d'escriure codi.

**Algorisme computacional** — Algorisme que requereix un ordinador per executar-se. Contrari a l'algorisme no computacional, que es pot seguir sense cap màquina (com una recepta de cuina).

**Arquitectura d'informació** — L'organització i estructura del contingut d'un lloc web o aplicació, incloent com es categoritza, etiqueta i navega. El sitemap és la representació visual de l'arquitectura d'informació.

**Atribut (ERD)** — Propietat o característica d'una entitat en un diagrama ERD. Equival a una columna en una taula de base de dades. Per exemple, l'entitat "Usuari" pot tenir atributs com "nom", "correu" i "contrasenya".

**Avaluació heurística** — Mètode d'inspecció d'usabilitat on un o més experts revisen una interfície comparant-la amb les heurístiques de Nielsen per identificar problemes d'usabilitat sense necessitat de fer proves amb usuaris reals.

**Base de dades** — Sistema on es guarda la informació de manera persistent i organitzada. En el context d'un ERD, es representa com un conjunt d'entitats relacionades entre si.

**Bifurcació** — En un flux lògic o user flow, el punt on el camí es divideix en dos o més camins possibles depenent d'una condició o decisió. Es representa visualment amb un rombe.

**Carga cognitiva** — Esforç mental que requereix l'usuari per usar una interfície. Un bon disseny minimitza la càrrega cognitiva seguint principis com "reconeixement en lloc de record".

**Cas d'ús** — Descripció d'una interacció entre un actor (usuari o sistema extern) i el sistema per aconseguir un objectiu. Els diagrames de casos d'ús UML representen visualment aquestes interaccions.

**Clau primària (ERD)** — Atribut únic que identifica cada instància d'una entitat de manera inequívoca. Per exemple, l'ID d'un usuari. Cada entitat ha de tenir una clau primària.

**Clau forana (ERD)** — Atribut que estableix un vincle entre dues entitats. Per exemple, l'ID d'un usuari dins d'una taula de comandes indica a quin usuari pertany cada comanda.

**Code-first** — Enfocament de diagramació on el diagrama es genera a partir de text o codi, en lloc de dibuixar-lo manualment. Mermaid.js és l'exemple estàndard: escrius text i l'eina genera el diagrama automàticament.

**Dead end** — En un user flow, punt on l'usuari arriba a una situació sense cap camí possible per continuar o tornar enrere. Un dead end és sempre un error de disseny que cal eliminar.

**Decisió (rombe)** — Símbol en forma de rombe usat en fluxos lògics i user flows per representar un punt on s'ha de prendre una decisió. Sempre té dues o més sortides etiquetades (normalment Sí/No).

**Diagrama** — Representació visual d'un sistema, procés o estructura. En el context del desenvolupament web inclou fluxos lògics, sitemaps, user flows, UML i ERD.

**Diagrama d'activitat (UML)** — Tipus de diagrama UML similar a un flux lògic que mostra els passos d'un procés i com el control passa entre accions. Útil per representar algoritmes i processos de negoci.

**Diagrama de carrils** — Variant del diagrama de flux que separa les accions per responsable en "carrils" horitzontals o verticals. Molt útil per mostrar la comunicació entre frontend, backend i base de dades en el mateix diagrama.

**Diagrama de classes (UML)** — Tipus de diagrama UML que representa les classes d'un sistema, els seus atributs, mètodes i les relacions entre elles. Equivalent al "plànol" del codi.

**Diagrama de seqüència (UML)** — Tipus de diagrama UML que mostra com interactuen els components d'un sistema en ordre temporal. Ideal per representar el flux d'una funcionalitat concreta com un login o una compra.

**Draw.io** — Eina de diagramació visual gratuïta que funciona al navegador. Té plantilles per a UML, ERD, fluxos i sitemaps. No requereix compte per usar-la.

**Entitat (ERD)** — Objecte o concepte del món real que es vol emmagatzemar a la base de dades. Per exemple: Usuari, Producte, Comanda. En la base de dades es converteix en una taula.

**ERD (Entity-Relationship Diagram)** — Diagrama de relació entre entitats. Eina de modelatge per dissenyar l'estructura d'una base de dades, mostrant les entitats, els seus atributs i com es relacionen entre elles.

**Estat buit** — Situació en una interfície on no hi ha contingut per mostrar: cap resultat de cerca, cap element a la llista, cap notificació. Gestionar bé els estats buits és part de la usabilitat.

**Estat d'error** — En un user flow, el camí alternatiu que pren el sistema quan alguna cosa falla. Oblidar els estats d'error en el disseny és una de les causes principals de problemes d'UX.

**Excalidraw** — Eina de pissarra col·laborativa virtual gratuïta i open source. Genera diagrames amb estètica de dibuix a mà. Ideal per a esbossos ràpids, discussions tècniques i brainstorming sense pressió de presentació.

**Feedback del sistema** — Resposta que dona la interfície a l'usuari després d'una acció: un loader, un missatge de confirmació, un missatge d'error. La visibilitat de l'estat del sistema és la primera heurística de Nielsen.

**FigJam** — Pissarra col·laborativa integrada a l'ecosistema Figma. Pensada per a brainstorming, retrospectives i col·laboració en temps real en equip.

**Figma** — Eina de disseny UI/UX basada al núvol. Permet crear des de wireframes fins a prototips d'alta fidelitat. És l'eina de disseny d'interfícies més usada en la indústria.

**Flowmapp** — Eina especialitzada en la planificació UX de projectes web. Integra sitemaps, user flows i wireframes en un sol espai de treball. Gratuïta per a un projecte.

**Flux lògic** — Diagrama que representa visualment els passos que segueix un sistema per completar una tasca, mostrant accions, decisions i el camí del flux. Eina fonamental per entendre la comunicació entre frontend i backend.

**Fricció** — En UX, qualsevol element o pas en el recorregut de l'usuari que li genera confusió, hesitació o dificultat. Identificar i eliminar friccions és l'objectiu principal d'un user flow.

**Happy path** — El camí ideal en un user flow: l'usuari fa exactament el que s'espera, sense errors ni interrupcions. Sempre es dissenya primer, i després s'afegeixen els casos alternatius i errors.

**Heurística** — Regla general basada en l'experiència i l'observació que serveix per identificar i solucionar problemes sense necessitat de regles específiques. Les heurístiques de Nielsen son el conjunt estàndard de la indústria.

**Heurístiques de Nielsen** — Les deu regles generals d'usabilitat per al disseny d'interfícies publicades per Jakob Nielsen el 1994\. Continuen sent l'estàndard de referència per avaluar usabilitat en la indústria.

**Input** — Dades d'entrada que rep un algorisme o sistema per processar. En un formulari de login, el correu i la contrasenya són els inputs.

**Interaction Design Foundation (IxDF)** — Organització educativa online de referència en disseny UX. Publica articles, cursos i recursos sobre usabilitat, disseny d'interacció i experiència d'usuari.

**Jakob Nielsen** — Expert en usabilitat web i cofundador del Nielsen Norman Group. Autor de les 10 heurístiques d'usabilitat que es convertiren en l'estàndard de la indústria per avaluar interfícies d'usuari.

**Lucidchart** — Eina de diagramació visual online amb plantilles per a UML, ERD i fluxos. Té versió gratuïta limitada i és especialment popular en entorns empresarials per la col·laboració en temps real.

**Mapa d'empatia** — Eina de disseny UX que ajuda a comprendre millor un segment d'usuaris representant el que diuen, pensen, senten i fan. Complementa el user journey map.

**Mermaid.js** — Eina code-first que genera diagrames a partir de text amb sintaxi senzilla. S'integra amb Markdown, GitHub i VS Code. El diagrama viu al repositori com a text pla.

**Modelatge** — Procés de crear una representació abstracta d'un sistema o procés per facilitar-ne la comprensió i el disseny. UML i ERD són llenguatges de modelatge estàndard.

**Nielsen Norman Group (NN/g)** — Empresa de recerca en UX fundada per Jakob Nielsen i Don Norman. Publica estudis, directrius i recursos sobre usabilitat i disseny d'experiència d'usuari.

**Normalització** — En disseny de bases de dades, procés d'organitzar les dades per reduir la redundància i millorar la integritat. Un ERD ben dissenyat facilita la normalització.

**Output** — Resultat que produeix un algorisme o sistema després de processar els inputs. En un login, el token d'autenticació (o el missatge d'error) és l'output.

**Paral·lelogram** — Símbol usat en fluxos lògics per representar l'entrada o sortida de dades (informació que entra o surt del sistema).

**Persona** — Personatge fictici basat en investigació real que representa un segment d'usuaris. S'usa en el disseny UX per empatitzar amb les necessitats i motivacions dels usuaris reals.

**Petició / Request** — Missatge que envia el frontend al backend sol·licitant dades o una acció. En un flux lògic, cada petició és un pas del diagrama que connecta les dues capes.

**Prototip** — Versió preliminar d'un producte usada per validar dissenys i fluxos abans de la implementació final. Pot ser de baixa fidelitat (esbós en paper) o alta fidelitat (Figma interactiu).

**Punt de contacte** — En un user journey map, qualsevol moment d'interacció entre l'usuari i el producte o servei. Exemples: visitar la web, rebre un correu, trucar al suport.

**Punt d'entrada** — El primer punt on un usuari entra a un flux o sistema. Pot ser la pàgina principal, una landing page, un anunci o un link directe.

**Punt de fricció** — Veure *Fricció*.

**Rectangle** — Símbol usat en fluxos lògics i user flows per representar una acció o procés. El símbol més comú en qualsevol diagrama.

**Relació (ERD)** — Connexió entre dues entitats en un ERD. Pot ser d'un a un, d'un a molts, o de molts a molts. Defineix com es relacionen les taules a la base de dades.

**Rombe** — Símbol en forma de diamant usat en diagrames per representar un punt de decisió. Sempre té dues o més sortides etiquetades.

**Resposta / Response** — Missatge que retorna el backend al frontend com a resultat d'una petició. Pot ser una dada, una confirmació o un error.

**Sitemap** — Diagrama que representa l'estructura i jerarquia de les pàgines d'un lloc web. Mostra quines pàgines existeixen i com es connecten entre elles. Es crea en la fase inicial de planificació del projecte.

**Símbol** — Forma visual estandarditzada usada en diagrames per representar un tipus d'element. Usar símbols estàndard garanteix que tothom interpreta el diagrama de la mateixa manera.

**UML (Unified Modeling Language)** — Llenguatge de modelatge estàndard per visualitzar, especificar i documentar sistemes software. Inclou molts tipus de diagrames: de classes, de seqüència, d'activitat, de casos d'ús, entre d'altres.

**Usabilitat** — Mesura de com de fàcil, eficient i satisfactori és usar un producte digital. Un producte pot funcionar correctament tècnicament i alhora tenir una usabilitat molt baixa.

**User flow** — Diagrama que mapeja exactament els passos que segueix un usuari per completar una tasca concreta, des del punt d'entrada fins a la sortida. Inclou decisions, errors i feedback del sistema.

**User journey map** — Representació visual de l'experiència completa d'un usuari amb un producte, incloent emocions, motivacions i punts de fricció en cada etapa. Diferent del user flow, que és més tècnic i centrat en accions concretes.

**Wireframe** — Esquema de baixa fidelitat d'una pantalla o interfície. Representa l'estructura i el contingut sense colors, tipografies ni imatges finals. Pas intermedi entre el user flow i el disseny d'alta fidelitat.  
