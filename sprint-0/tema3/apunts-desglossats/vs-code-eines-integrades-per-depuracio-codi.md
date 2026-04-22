**Quines eines integrades de VS Code són essencials per a la depuració de codi (breakpoints, watch expressions)?**

## **Eines de depuració integrades a VS Code**

Depurar (*debugging*) és el procés de trobar i corregir errors al codi. La manera més bàsica de fer-ho és afegir `console.log()` per tot arreu per veure els valors de les variables, però VS Code ofereix eines molt més potents que et permeten aturar el codi en qualsevol punt i inspeccionar exactament el que passa, sense modificar res.

Per accedir al depurador, cliques a la icona del triangle amb el bug a la barra lateral esquerra (`Ctrl+Shift+D`), o simplement prems `F5` per iniciar una sessió de depuració.

**Breakpoints: atura el codi on vulguis**

Un breakpoint (punt de parada) és una marca que li dius al depurador: *"atura l'execució aquí"*. Els breakpoints són ubicacions al codi on vols que l'execució es posi en pausa, de manera que puguis inspeccionar l'estat de les variables, la pila de crides i la sortida.

Per posar un breakpoint simplement fas clic al marge esquerre de la línia on vols aturar-te. Apareixerà un punt vermell. Quan el codi arribi a aquella línia, s'aturarà i podràs examinar tot.

VS Code també ofereix **breakpoints condicionals**, que només aturen l'execució si es compleix una condició concreta. Per posar-ne un, fes clic dret sobre un breakpoint existent, selecciona "Edit Breakpoint" i introdueix la condició. El depurador pausarà l'execució únicament quan la condició sigui certa. Això és molt útil dins de bucles: en lloc d'aturar-te en cada iteració, pots dir-li que s'aturi només quan una variable tingui un valor concret.

**Controls d'execució: moure's pel codi**

Un cop aturat en un breakpoint, tens controls per avançar pas a pas:

| Acció | Tecla | Fa... |
| ----- | ----- | ----- |
| Continue | `F5` | Continua fins al següent breakpoint |
| Step Over | `F10` | Executa la línia actual sense entrar a les funcions |
| Step Into | `F11` | Entra dins de la funció cridada |
| Step Out | `Shift+F11` | Surt de la funció actual |
| Stop | `Shift+F5` | Atura la sessió de depuració |

**Variables: veure els valors en temps real**

Durant una sessió de depuració, pots inspeccionar variables i expressions a la secció VARIABLES del panell Run and Debug, o simplement passant el ratolí per sobre d'una variable al codi. Els valors es mostren relatius al frame seleccionat de la pila de crides.

A més, pots canviar el valor d'una variable mentre depures: clic dret sobre ella i "Set Value". Útil per provar com reaccionaria el codi amb un valor diferent sense haver de modificar el fitxer.

**Watch Expressions: vigilar variables específiques**

Les watch expressions permeten monitorar variables o expressions específiques mentre avances pel codi. Per afegir-ne una, obres el panell de depuració, cliques la icona `+` a la secció "WATCH" i introdueixes l'expressió que vols vigilar.

La diferència amb el panell de Variables és que aquí pots escriure **expressions** personalitzades, no només noms de variables. Per exemple: `usuari.edat > 18`, `llista.length`, o `preu * 1.21`. El valor s'actualitza automàticament cada vegada que avances un pas.

**Call Stack: entendre el camí fins a l'error**

La vista de Call Stack mostra la seqüència de crides a funcions que ha portat fins al punt actual d'execució del programa. Aquesta vista és molt valuosa per entendre el flux d'execució i identificar on les coses han anat malament.

Imagina que tens una funció A que crida B, que crida C, i C és on hi ha l'error. La Call Stack et mostra exactament aquesta cadena, de baix a dalt, i pots clicar a qualsevol nivell per veure l'estat de les variables en aquell moment.

**Debug Console: provar expressions al vol**

La Debug Console permet veure i interactuar amb la sortida del codi que s'executa al depurador. Pots evaluar expressions i executar comandes en el context del programa pausat.

És com tenir una consola de JavaScript interactiva però amb accés a totes les variables de la sessió actual. Pots escriure qualsevol expressió i veure el resultat immediatament, sense modificar el codi.

