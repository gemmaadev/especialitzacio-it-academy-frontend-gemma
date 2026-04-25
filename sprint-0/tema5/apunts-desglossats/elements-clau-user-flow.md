## **Elements clau d'un User Flow per anticipar problemes d'UX**

**Què és un User Flow i per què importa abans de codificar?**

Un user flow és un diagrama visual que mapeja el camí que segueix un usuari per un lloc web o aplicació per completar un objectiu específic. Mostra cada pas, pantalla i punt de decisió des del punt d'entrada fins a la sortida.

Identificar punts de fricció: els user flows destaquen els potencials punts d'hesitació en el recorregut de l'usuari, permetent simplificar proactivament l'experiència. Prevenir errors costosos: fer canvis en els user flows en fases inicials és significativament més ràpid i barat que alterar dissenys d'UI o codi durant la fase de desenvolupament.

**Element 1: Punt d'entrada**

Els entry points són els primers punts on els usuaris entren a una app o lloc web. Poden ser la pàgina principal, una landing page, o qualsevol pantalla on comença el recorregut de l'usuari.

Definir el punt d'entrada és important perquè l'usuari no sempre arriba per on tu esperes. Pot arribar des d'un anunci, d'un resultat de cerca, d'un email o d'un link directe a una pàgina interior. Cada punt d'entrada pot requerir un flux diferent.

**Element 2: El "Happy Path" primer**

Comença pel happy path (el camí feliç) i després afegeix punts de decisió i estats d'error de manera sistemàtica.

El "happy path" és el recorregut ideal: l'usuari fa exactament el que s'espera, sense errors ni interrupcions. Dibuixar-lo primer et dona l'estructura bàsica del flux. Un cop tens el camí principal, pots afegir tots els casos alternatius.

**Element 3: Punts de decisió**

Els punts de decisió són moments on un usuari pot anar en més d'una direcció. En un diagrama, es representen com a diamants. Un exemple comú: un usuari intenta fer el checkout però no ha iniciat sessió. El punt de decisió es bifurca en "iniciar sessió" o "continuar com a convidat". Mapar aquestes bifurcacions abans del disseny prevé llacunes que només apareixen més tard en el desenvolupament.

Cada diamant del diagrama és una pregunta que has de respondre: "i si l'usuari fa X, on va?". Oblidar una bifurcació és el que provoca dead ends (calaixos de sastre sense sortida) i fluxos trencats.

**Element 4: Estats d'error i casos alternatius**

Aquest és l'element que més sovint s'oblida i que més problemes causa durant el desenvolupament. Un user flow ben dissenyat elimina passos que no permeten a l'usuari continuar el seu recorregut, dead ends (la impossibilitat de tornar o canviar la seva elecció), gestió d'errors i missatges de validació, i la gestió d'estats buits (quan no hi ha informació: dades incompletes, cap resultat de cerca, etc.).

Per a cada punt de decisió has de preguntar-te: "i si la resposta és no?" o "i si hi ha un error?". Exemples: l'usuari introdueix una contrasenya incorrecta, el pagament és denegat, la connexió cau a meitat del procés.

**Element 5: Feedback del sistema a l'usuari**

Quan els usuaris fan una acció, esperen una resposta, visual, auditiva o textual. No cal que sigui cridanera. Fins i tot animacions subtils, microcopy o missatges de confirmació poden fer tota la diferència. El feedback construeix confiança. Sense el feedback adequat, els usuaris es tornen hesitants i expressen dubtes, cosa que pot portar a abandonar la tasca actual.

Al user flow, cada acció important hauria de tenir representat el feedback que rebrà l'usuari: un missatge de confirmació, un loader, un missatge d'error, una redirecció.

**Element 6: El punt de sortida**

El punt de sortida és on el flux acaba, ja sigui perquè l'usuari ha completat l'objectiu o perquè ha abandonat. Una pàgina de comanda confirmada és una sortida satisfactòria. Qualsevol abandonament anterior és un problema a investigar. Conèixer el punt de sortida previst t'ajuda a avaluar si el flux compleix la seva funció.

**Element 7: Accions de l'usuari vs. respostes del sistema**

Un user flow ben fet diferencia clarament el que fa l'usuari del que fa el sistema. L'usuari clica un botó (acció). El sistema valida les dades (resposta). L'usuari veu un missatge d'error (feedback). Barrejar els dos nivells en el mateix diagrama sense diferenciar-los és una font de confusió habitual.

**Com detectar punts de fricció al diagrama**

En cada etapa del flux, fes preguntes crítiques des de la perspectiva de l'usuari: Què vol aconseguir en aquesta pàgina? Quina informació necessita per sentir-se segur avançant? Quines són les seves possibles hesitacions, pors o dubtes?

Les senyals que indiquen fricció en un user flow són: passos que semblen redundants o innecessaris, punts de decisió amb més de dues opcions (massa complex), llocs on el flux "s'acaba" sense un camí clar, accions que no tenen un feedback associat, i estats d'error sense opció de recuperació.

**La regla pràctica: valida el flux abans de dissenyar**

Prova el flux amb 3-5 usuaris abans de construir les pantalles d'alta fidelitat. Recorre el flux tu mateixa primer, i després demana a algú que no conegui el producte que faci el mateix. Observa els moments on para, torna enrere o pren un camí inesperat. L'objectiu és detectar fricció i llacunes en la fase del diagrama, no després que s'hagi escrit el codi.

**Checklist d'un user flow complet**

| Element | Pregunta que respon |
| ----- | ----- |
| Punt d'entrada | D'on arriba l'usuari? |
| Happy path | Quin és el camí ideal? |
| Punts de decisió | On es bifurca el flux? |
| Estats d'error | Què passa si alguna cosa falla? |
| Feedback del sistema | L'usuari sap en quin punt és? |
| Casos alternatius | Quins camins no ideals existeixen? |
| Punt de sortida | On acaba satisfactòriament el flux? |

