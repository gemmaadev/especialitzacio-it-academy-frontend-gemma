## **Extreme Programming (XP)**

###### **Extreme Programming (XP)** [*https://asana.com/es/resources/extreme-programming-xp*](https://asana.com/es/resources/extreme-programming-xp) Explicació d’XP, metodologia àgil basada en bones pràctiques de programació.

**Què és XP?**

Extreme Programming (XP) és una metodologia àgil de desenvolupament de software creada per Kent Beck a finals dels anys 90\. XP és l'equivalent al hyperloop en el desenvolupament de software: ràpid, eficient i dissenyat per a l'era moderna. Si Agile és la filosofia general, XP és una implementació molt concreta d'aquesta filosofia centrada en les **pràctiques d'enginyeria**: com s'escriu el codi, com es treballa en equip i com es garanteix la qualitat en cada pas.

XP és ideal per a entorns d'alta incertesa i canvi constant: startups, nous productes o mercats amb requisits ambigus. Equips que busquen qualitat a velocitat: TDD, CI i refactorització redueixen defectes i retreball, habilitant un ritme sostenible i entrega predictible.

**Pair Programming: dues persones, un sol codi**

El Pair Programming és un mètode de programació en el qual el codi es produeix per dues persones programant juntes en una sola tasca. Un programador té el control de l'estació de treball i pensa principalment en el codi en detall. L'altre programador està més centrat en la imatge global i revisa contínuament el codi que produeix el primer. Els programadors intercanvien rols cada cert temps.

Les parelles no són fixes: els programadors canvien de parella freqüentment, de manera que tothom sap el que fa tothom, i tots es mantenen familiaritzats amb tot el sistema, fins i tot les parts fora del seu àmbit d'habilitats.

El resultat és doble: el codi té menys errors (hi ha sempre dos parells d'ulls) i el coneixement es distribueix per tot l'equip. Si una persona marxa del projecte, no s'emporta el coneixement amb ella.

**Test-Driven Development (TDD): primer el test, després el codi**

TDD és com tenir una xarxa de seguretat sota un equilibrista. Els developers asseguren que cada funcionalitat funciona com s'espera escrivint els tests abans del codi real.

El cicle de TDD es repeteix constantment en tres passos:

**Red** → Escrius un test que falla perquè el codi encara no existeix. **Green** → Escrius el mínim codi possible per fer passar el test. **Refactor** → Millores el codi sense canviar el seu comportament.

Dins de XP, els tests unitaris s'escriuen abans que el codi eventual. Aquest enfocament pretén estimular el programador a pensar en les condicions en les quals el seu codi podria fallar. XP diu que el programador ha acabat amb un cert fragment de codi quan no pot pensar en cap altra condició en la qual el codi pugui fallar.

**Refactoring: millorar el codi sense canviar el que fa**

El refactoring és el procés de reestructurar el codi existent sense canviar el seu comportament extern. Ajuda a millorar la qualitat i el manteniment del codi.

La refactorització tracta d'eliminar redundàncies, eliminar funcions innecessàries, augmentar la coherència del codi i alhora desacoblar elements. Mantén el teu codi net i simple, de manera que puguis entendre'l i modificar-lo fàcilment quan calgui.

El refactoring no és "arreglar bugs" ni afegir funcionalitats noves: és millorar l'estructura interna del codi existent. Es fa contínuament, en petit, i sempre amb els tests passant per assegurar que no has trencat res.

**Continuous Integration: integrar moltes vegades al dia**

Els developers sempre mantenen el sistema completament integrat. Els equips XP porten el desenvolupament iteratiu a un altre nivell perquè fan commit del codi múltiples vegades al dia.

La lògica és senzilla: com més temps passes sense integrar el teu codi amb el de la resta de l'equip, més gran serà el conflicte quan ho facis. Integrant diverses vegades al dia, els conflictes es detecten immediatament i quan són petits i fàcils de resoldre.

Si no integres ràpidament, la probabilitat de conflictes augmenta i el cost de la integració puja estrepitosament.

**Planning Game: planificar en col·laboració amb el client**

El Planning Game és el principal procés de planificació dins de XP. És una reunió que ocorre una vegada per iteració, típicament una vegada a la setmana.

Al final del planning game, els developers planifiquen la propera iteració i release, assignant tasques per a cadascuna. Segons XP, el client final ha de participar plenament en el desenvolupament. El client ha d'estar present tot el temps per respondre preguntes de l'equip, establir prioritats i resoldre disputes si és necessari.

El Planning Game té tres fases: **exploració** (els requisits es tradueixen en tasques), **compromís** (les tasques s'assignen i s'estimen) i **direcció** (les tasques s'executen i el resultat es compara amb la user story original).

**Collective Code Ownership: el codi és de tot l'equip**

En XP, no hi ha propietat individual del codi. En canvi, tot l'equip és responsable del codebase. Aquest enfocament assegura que tots els membres de l'equip tinguin un sentit de propietat i responsabilitat cap al codi.

Qualsevol developer pot millorar qualsevol part del codebase, reduint colls d'ampolla i sitges.

Això és possible gràcies a la combinació de pair programming (tothom ha treballat en totes les parts) i els tests automatitzats (qualsevol pot modificar codi sabent que si trenca alguna cosa els tests li diran immediatament).

**Com es reforcen les pràctiques entre elles**

El que fa XP especialment potent és que les pràctiques no funcionen de manera aïllada: es reforcen mútuament. Amb la propietat col·lectiva, pots fer canvis allà on siguin necessaris. Amb estàndards de codificació, no has de reformatar abans de refactoritzar. Amb pair programming, tens el coratge d'afrontar una refactorització difícil. Amb un disseny simple, la refactorització és més fàcil. Amb tests, és menys probable que trenques alguna cosa sense saber-ho. Amb la integració contínua, si accidentalment trenques alguna cosa, o si la teva refactorització entra en conflicte amb la feina d'algú altre, ho saps en poques hores.

**Resum de les pràctiques clau**

| Pràctica | Idea central | Benefici principal |
| ----- | ----- | ----- |
| Pair Programming | Dos developers, un codi | Menys errors, coneixement compartit |
| TDD | Test primer, codi després | Disseny millor, menys bugs |
| Refactoring | Millorar sense canviar el comportament | Codi net i mantenible |
| Continuous Integration | Integrar moltes vegades al dia | Detectar conflictes aviat |
| Planning Game | Planificar amb el client cada iteració | Prioritats clares, entregas alineades |
| Collective Code Ownership | El codi és de tot l'equip | Menys colls d'ampolla, més flexibilitat |

