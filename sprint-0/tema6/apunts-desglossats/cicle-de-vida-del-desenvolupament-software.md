## **SDLC: Cicle de vida del desenvolupament de software**

**Cicle de vida del software**  
[https://www.viewnext.com/el-ciclo-sdlc-en-7-fases/](https://www.viewnext.com/el-ciclo-sdlc-en-7-fases/)  
Les 7 fases del cicle de vida del desenvolupament del programari (SDLC).

**Què és l'SDLC?**

El cicle de vida del desenvolupament de software (SDLC) és un procés rendible i eficient en termes de temps que els equips de desenvolupament usen per dissenyar i crear software d'alta qualitat. L'objectiu de l'SDLC és minimitzar els riscos del projecte mitjançant una planificació anticipada que permeti que el software compleixi les expectatives del client durant la fase de producció i posteriorment.

En paraules senzilles: és el mapa del camí que segueix qualsevol projecte de software des que neix la idea fins que el producte s'apaga definitivament. Sense aquest mapa, els equips treballen sense ordre, el codi s'acumula sense estructura i els projectes s'acaben entregant tard, per sobre del pressupost i ple d'errors.

**Les 7 fases de l'SDLC**

Les fases del cicle de vida del software inclouen la planificació, anàlisi, disseny, implementació, proves, desplegament i manteniment.

**Fase 1: Planificació**

La fase de planificació inclou normalment tasques com anàlisi de costos i beneficis, programació, estimació de recursos i assignació. Aquí es defineix l'abast del projecte, els objectius, el pressupost i els terminis. És la fase on es respon a la pregunta: *val la pena fer-ho i tenim el que necessitem per fer-ho?*

**Fase 2: Anàlisi de requisits**

L'equip de desenvolupament recopila requisits de diverses parts interessades, com clients, experts interns i externs, i directius, per crear un document d'especificacions amb els requisits del software. Aquí es defineix exactament **què** ha de fer el producte. És la fase més important: un error aquí es multiplica en totes les fases posteriors.

**Fase 3: Disseny**

En la fase de disseny, els enginyers de software analitzen els requisits i identifiquen les millors solucions per crear el software. Es defineix l'arquitectura del sistema, la base de dades (ERD), les interfícies (wireframes) i les decisions tècniques. Aquí és on s'usen tots els diagrames que hem après: UML, ERD, fluxos lògics.

**Fase 4: Implementació (Desenvolupament)**

En aquesta etapa es produeix la codificació real. En el software modern, aquest procés pot implicar la connexió de codi amb APIs i la integració de components de codi obert. Al finalitzar aquesta fase, ha d'haver-hi un software funcional llest per a proves. És la fase on s'escriu el codi seguint els dissenys de la fase anterior.

**Fase 5: Proves (Testing)**

Les proves són un pas crític de l'SDLC dirigit a identificar problemes funcionals o de seguretat en el codi. Es comprova que el software fa el que havia de fer, sense errors. Hi ha proves unitàries (cada peça individual), proves d'integració (les peces juntes) i proves d'acceptació (el client valida que és el que volia).

**Fase 6: Desplegament (Deployment)**

Els desenvolupadors poden implementar el software per fases, per exemple com una versió beta, en la qual un grup reduït d'usuaris prova una versió preliminar del software abans de llançar-lo al públic. És la fase on el producte passa de l'entorn de desenvolupament al servidor real on els usuaris hi accediran.

**Fase 7: Manteniment**

En la fase de manteniment, l'equip corregeix errors, resol problemes dels clients i administra els canvis fets en el software. A més, l'equip supervisa el rendiment general del sistema, la seguretat i l'experiència d'usuari per identificar noves maneres de millorar el software existent. El software no "s'acaba" quan es desplegà: evoluciona constantment.

**Els models d'SDLC: com s'organitzen les fases**

Les set fases sempre existeixen, però l'ordre i la manera d'executar-les varia segons el model escollit.

**Model Cascada (Waterfall)**

El model de cascada avança a través d'una seqüència de fases. Cada fase s'ha de completar abans de passar a la següent. És lineal i rígid: primer s'analitza tot, després es dissenya tot, després es desenvolupa tot... No es pot tornar enrere. Útil per a projectes amb requisits molt clars i estables, però poc adequat per a la majoria de projectes web actuals on els requisits canvien.

**Model Àgil**

El model àgil, com Scrum o Kanban, és un mètode de desenvolupament de software altament iteratiu i flexible. Els equips que usen aquest model col·laboren estretament i treballen en cicles curts anomenats sprints per oferir versions incrementals de software. En lloc de fer totes les fases una vegada, les fas moltes vegades en cicles curts. En cada cicle entregues una part funcional del producte. És el model dominant en la indústria actual.

**Model en Espiral**

El model en espiral inclou els enfocaments de prototip i iteratiu. Consta de quatre fases: planificació, avaluació de riscos, desenvolupament i avaluació, que els equips segueixen en iteracions fins a obtenir el producte de software desitjat. Especialment útil per a projectes grans i complexos on els riscos són difícils de definir al principi.

**DevOps**

DevOps aborda la rigidesa de l'SDLC fent que cada fase del procés de desenvolupament de software sigui contínua al llarg del projecte. En lloc de limitar-se a passos discrets, la planificació, la codificació, les proves, la implementació, el manteniment i la monitorització es mantenen durant tot el cicle de vida del producte. No és un model seqüencial sinó una cultura de col·laboració contínua entre l'equip de desenvolupament i l'equip d'operacions.

**Com s'integra l'SDLC amb les metodologies àgils**

L'SDLC no és inherentment àgil ni en cascada: és un marc que descriu les fases del desenvolupament de software. Àgil i cascada són dues metodologies distintes per executar l'SDLC. Pensa en l'SDLC com el "què" (les etapes del desenvolupament) i Àgil/Cascada com el "com" (la metodologia usada per executar-les).

En un projecte àgil, les set fases no desapareixen: es comprimeixen i es repeteixen en cada **sprint** (cicle de 1-4 setmanes). En cada sprint hi ha una mini-planificació, mini-disseny, mini-desenvolupament, mini-proves i mini-desplegament. El resultat és una versió funcional i incrementalment millorada del producte al final de cada sprint.

**Resum** 

| Fase | Pregunta que respon | Resultat |
| ----- | ----- | ----- |
| Planificació | Val la pena fer-ho? | Pla del projecte |
| Anàlisi | Què ha de fer? | Document de requisits |
| Disseny | Com es farà? | Arquitectura, UML, ERD |
| Implementació | Fem-ho | Codi funcional |
| Proves | Funciona bé? | Informe de bugs |
| Desplegament | Posem-ho en marxa | Producte en producció |
| Manteniment | Com el mantenim viu? | Actualitzacions i correccions |

