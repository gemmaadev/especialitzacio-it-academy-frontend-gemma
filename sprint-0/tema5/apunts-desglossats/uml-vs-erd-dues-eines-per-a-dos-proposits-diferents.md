## **UML vs. ERD: dues eines per a dos propòsits diferents**

**Lucidchart: Guia UML per a principiants**  
Exemples interactius de diagrames UML per principiants.  
[https://www.lucidchart.com/pages/examples/uml\_diagram\_tool](https://www.lucidchart.com/pages/examples/uml_diagram_tool)

**MySQL Oficial: Disseny de bases de dades amb ERD**  
Pràctic. Tutorial oficial per modelar bases de dades amb ERD a Workbench.  
[https://dev.mysql.com/doc/workbench/en/wb-erd-tutorial.html](https://dev.mysql.com/doc/workbench/en/wb-erd-tutorial.html)

**La diferència fonamental**

La diferència principal entre UML i ERD és que UML és un llenguatge usat per crear diagrames, mentre que els ERD són un tipus de diagrama concret. UML s'usa per planificar el desenvolupament de software i s'usa en molts tipus de diagrames per a propòsits diversos. Els diagrames ER no es centren en el software, sinó en el modelatge de bases de dades.

Dit d'una altra manera: **UML** descriu com funciona i com s'organitza tot el sistema. **ERD** descriu com s'emmagatzema la informació a la base de dades. Tots dos es fan servir en el disseny d'aplicacions, però en moments i per a propòsits molt diferents.

**Què és UML?**

Els diagrames UML (Unified Modeling Language) són representacions visuals estandarditzades usades per modelar l'estructura i el comportament de sistemes software. Ajuden els desenvolupadors, analistes i dissenyadors a entendre com interactuen els diferents components d'un sistema, fent que sistemes complexos siguin més fàcils de dissenyar i mantenir.

UML ajuda els enginyers de software a descriure i visualitzar un sistema, independentment del llenguatge de programació en el qual estigui codificat.

Els diagrames UML es divideixen en dos grans categories:

Els **diagrames estructurals** (com Class, Component i Deployment Diagrams) descriuen els aspectes estàtics del sistema (el que és). Els **diagrames de comportament** (com Use Case, Sequence, Activity i State Machine Diagrams) representen els aspectes dinàmics (com es comporta).

Els tipus de diagrames UML més habituals en el dia a dia d'un projecte web:

**Diagrama de classes** — mostra les classes del sistema, els seus atributs i com es relacionen entre elles. Equivalent al "plànol" del codi.

**Diagrama de seqüència** — mostra com interactuen els components en ordre temporal. Ideal per representar el flux d'una funcionalitat concreta, com un login o una compra.

**Diagrama de casos d'ús** — mostra quines accions pot fer cada tipus d'usuari amb el sistema. Molt útil per entendre requisits funcionals.

**Diagrama d'activitat** — similar a un flux lògic, mostra els passos i decisions d'un procés.

**Què és un ERD?**

Els diagrames ER (Entity-Relationship) són eines visuals usades en el disseny de bases de dades per representar l'estructura lògica de les dades i les relacions entre les diferents entitats. Formen la base per construir bases de dades relacionals, mapejant clarament com es guarden, organitzen i connecten les dades.

Un ERD consta de tres components principals: les **entitats** (representen objectes o conceptes del món real, com Client, Comanda o Producte), els **atributs** (defineixen les propietats d'una entitat, com Nom del Client o ID de Comanda) i les **relacions** (mostren com es connecten les entitats, com ara relacions d'un a molts o de molts a molts).

Pensant en termes de base de dades: cada entitat serà una taula, cada atribut serà una columna, i les relacions definiran com s'uneixen les taules entre elles.

**Quan usar cada un**

Essencialment, UML s'usa per dissenyar tot el sistema software mentre que ERD s'usa per dissenyar únicament la base de dades.

Usa **UML** quan necessites:

* Definir quines classes i objectes existiran al codi i com es relacionen  
* Mostrar el flux de comunicació entre el frontend i el backend  
* Documentar com funciona una funcionalitat pas a pas  
* Comunicar l'arquitectura del sistema a tot l'equip, incloent perfils no tècnics

Usa **ERD** quan necessites:

Dissenyar i estructurar bases de dades (identificar entitats, atributs i relacions per crear un esquema de base de dades), planificar l'emmagatzematge i la recuperació de dades (assegurar eficiència i mínima redundància), i documentar bases de dades existents (visualitzar com estan connectades les dades i com es relacionen les taules).

**La relació entre tots dos**

No és una elecció entre un o l'altre: en un projecte real usaràs tots dos. El UML et serveix per dissenyar el sistema complet i la lògica de l'aplicació. L'ERD et serveix per dissenyar específicament la part de la base de dades.

Molt sovint, UML és usat per desenvolupadors i arquitectes de software per a un disseny ampli i detallat del software, ja que UML descriu no només l'estructura d'un sistema sinó també el seu comportament. Els ERD, en canvi, estan més restringits en el seu ús, ja que s'usen únicament per dissenyar una base de dades i no mostren el comportament del sistema.

**Resum comparatiu**

|  | UML | ERD |
| ----- | ----- | ----- |
| Respon a... | Com funciona i s'organitza el sistema? | Com s'emmagatzemen les dades? |
| Àmbit | Tot el sistema software | La base de dades |
| Components | Classes, mètodes, actors, seqüències | Entitats, atributs, relacions |
| Tipus | Molts (classe, seqüència, activitat, casos d'ús...) | Un sol tipus de diagrama |
| Qui el usa | Developers, arquitectes, analistes | Developers, dissenyadors de BD |
| Fase del projecte | Anàlisi i disseny del sistema | Disseny de la base de dades |
| Eina recomanada | Lucidchart, Draw.io, Mermaid | MySQL Workbench, Lucidchart |

