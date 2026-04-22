**De quina manera pot assistir GitHub Copilot en l'escriptura o refactorització de codi?**

## **GitHub Copilot: l'assistent d'IA per programar**

GitHub Copilot és una extensió de VS Code que integra intel·ligència artificial directament a l'editor. A diferència d'un cercador o d'un xatbot extern, Copilot viu dins del teu editor, coneix el context del teu codi i t'ajuda sense que hagis de sortir del que estàs fent. A diferència de les eines tradicionals d'autocompletar, Copilot entén el context del teu codi: analitza les funcions, variables i comentaris que has escrit per generar suggeriments significatius, de vegades completant mètodes sencers o fins i tot predient el proper pas lògic al teu projecte.

**Autocompletat intel·ligent: codi en temps real**

Copilot proporciona suggeriments de codi mentre escrius, des de completar una sola línia fins a implementar funcions senceres. Apareix com a text en gris (*ghost text*) que pots acceptar prement `Tab` o ignorar simplement continuant d'escriure.

El que el diferencia d'un autocompletar normal és que entén la **intenció**. Si escrius un comentari com `// funció que calcula el preu amb IVA`, Copilot proposa el codi de la funció completa. Si escrius el nom d'una funció i els seus paràmetres, proposa el cos. Aprèn del teu estil mentre treballes i adapta les seves propostes.

**Inline Chat: modificar codi sense sortir de l'editor**

L'Inline Chat és ideal per fer canvis petits i enfocats sense afectar la resta del codi: afegir gestió d'errors, refactoritzar funcions individuals o corregir bugs.

S'obre amb `Ctrl+I` (o `Cmd+I` al Mac) directament sobre el codi. Pots seleccionar un fragment i demanar coses com:

* *"Simplifica aquesta funció"*  
* *"Afegeix gestió d'errors"*  
* *"Canvia el nom de les variables perquè siguin més descriptives"*

Copilot mostra els canvis proposats directament al fitxer i tu decideixes si els acceptes o no.

**Copilot Chat: conversar sobre el codi**

El panell de Copilot Chat (`Ctrl+Alt+I`) és una finestra de conversa on pots fer preguntes en llenguatge natural sobre el codi. Pots seleccionar una funció o fragment de codi i preguntar "Explica'm què fa aquest codi". Copilot descriurà el propòsit, la lògica i el flux en un anglès planer, sovint desglossant-ho pas a pas.

Alguns usos habituals del Chat:

* *"Quins errors pot tenir aquest codi?"*  
* *"Com puc optimitzar aquest bucle?"*  
* *"Escriu tests unitaris per a aquesta funció"*  
* *"Explica'm per què aquest codi dona un error"*

**Refactorització: millorar codi existent**

La refactorització és el procés de reestructurar el codi existent sense canviar el seu comportament. Els beneficis inclouen millorar la llegibilitat, reduir la complexitat, facilitar el manteniment i permetre afegir noves funcionalitats més fàcilment.

Copilot ajuda amb diversos tipus de refactorització. Pots seleccionar una funció llarga i demanar-li que la divideixi en funcions més petites. Copilot pot ajudar a dividir blocs de codi complexos en unitats més petites i adequades per a la reutilització. També pot detectar codi repetit i suggerir com abstraure'l, o simplificar lògica massa complexa.

Com més específiques siguin les instruccions, millors seran els resultats. Per exemple: "Refactoritza la classe per eliminar estructures de lògica imbricada, fer el codi més concís i afegir comentaris on calgui".

**Limitacions importants a tenir en compte**

Tot i que Copilot pot fer moltes coses, és important recordar que tu ets el pilot, i per això es diu Copilot. És una eina potent, però té limitacions: depèn del context que li proporciones, de manera que el codi poc clar o mal documentat pot donar suggeriments menys efectius. A més, tot i que Copilot pot detectar molts problemes, no substitueix una revisió humana exhaustiva.

Sempre has de revisar el codi que genera Copilot abans d'acceptar-lo. Pot semblar correcte però tenir errors subtils, especialment en lògica de negoci específica o casos límit poc habituals. Copilot és un assistent, no un substitut del teu judici com a programador.

**Resum: quan usar cada eina**

| Situació | Eina de Copilot |
| ----- | ----- |
| Escrivint codi nou | Autocompletat (*ghost text*) |
| Modificar una funció concreta | Inline Chat (`Ctrl+I`) |
| Preguntes sobre el codi | Copilot Chat |
| Entendre codi aliè | Chat: *"Explica'm aquest codi"* |
| Refactoritzar | Chat o Inline Chat amb instruccions concretes |
| Generar tests | Chat: *"Escriu tests per a aquesta funció"* |

