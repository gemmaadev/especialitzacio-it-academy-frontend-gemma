## **Glossari de termes — Eines de Desenvolupament Web**

**npm** — Node Package Manager. El gestor de paquets que ve instal·lat amb Node.js. Serveix per instal·lar, actualitzar i eliminar llibreries del teu projecte.

**package.json** — Fitxer de configuració principal d'un projecte Node.js. Conté el nom del projecte, la versió i la llista de dependències que necessita. L'edites tu manualment.

**package-lock.json** — Fitxer generat automàticament per npm. Guarda les versions exactes de tots els paquets instal·lats. No s'edita mai manualment però sí ha d'anar a Git.

**node\_modules** — Carpeta on npm guarda físicament tots els paquets instal·lats. Mai s'ha de pujar a Git perquè és molt pesada i es pot regenerar sempre amb `npm install`.

**dependency** — Dependència. Una llibreria externa que el teu projecte necessita per funcionar. Es guarda a `dependencies` del `package.json`.

**devDependency** — Dependència de desenvolupament. Una eina que només necessites mentre programes (tests, linters...) però no en producció. S'instal·la amb `--save-dev` i es guarda a `devDependencies`.

**script** — Comanda personalitzada definida al `package.json` que pots executar amb `npm run nom`. Per exemple `npm run dev` o `npm run build`.

**Node.js** — Entorn d'execució que permet usar JavaScript fora del navegador, al servidor. Usa el motor V8 de Google Chrome.

**Motor V8** — El motor de JavaScript creat per Google per al Chrome. Compila el codi JavaScript directament a codi màquina, fent-lo molt ràpid. Node.js l'usa internament.

**Runtime** — Entorn d'execució. El conjunt d'eines i recursos que permeten executar un programa. Node.js és un runtime de JavaScript per al servidor.

**Event Loop** — Bucle d'esdeveniments. El mecanisme intern de Node.js que gestiona totes les peticions amb un sol fil d'execució. Rep peticions, les delega i segueix treballant sense esperar.

**Non-blocking I/O** — Entrada/sortida no bloquejant. Quan Node.js fa una operació lenta (llegir fitxer, consultar base de dades), no s'atura a esperar: continua fent altres coses i torna quan la resposta arriba.

**Callback** — Funció que s'executa quan una operació asíncrona ha acabat. És la manera tradicional de gestionar el non-blocking a Node.js.

**async/await** — Sintaxi moderna de JavaScript per gestionar operacions asíncrones de manera més llegible, sense callbacks encadenats.

**Vite** — Eina moderna de construcció i servidor de desenvolupament per a projectes web. És molt més ràpid que Webpack perquè no processa tot el codi de cop durant el desenvolupament.

**Webpack** — Eina de construcció tradicional que processa i combina tot el codi en un bundle abans d'iniciar el servidor. Més lent que Vite però amb un ecosistema molt madur.

**Bundle** — Fitxer (o conjunt de fitxers) resultant d'ajuntar i optimitzar tot el codi del projecte per enviar-lo al navegador.

**Bundler** — Eina que crea el bundle. Webpack i Vite en són exemples.

**Build** — El procés de construir la versió final del projecte, optimitzada per a producció. Es fa amb `npm run build`.

**ESM / ES Modules** — Sistema de mòduls natiu de JavaScript modern. Vite l'aprofita per servir fitxers directament al navegador sense necessitat de bundle durant el desenvolupament.

**Tree-shaking** — Eliminació automàtica del codi que no s'usa durant el procés de build. Redueix la mida dels fitxers finals.

**HMR (Hot Module Replacement)** — Mecanisme que actualitza al navegador únicament el mòdul que has canviat, sense recarregar tota la pàgina ni perdre l'estat de l'aplicació.

**Dev server** — Servidor de desenvolupament. S'executa localment mentre programes per veure els canvis al navegador en temps real.

**localhost** — Adreça que apunta al teu propi ordinador. Vite arrencat a `localhost:5173` vol dir que el servidor de desenvolupament funciona al teu ordinador al port 5173\.

**Variable d'entorn** — Valor de configuració extern al codi que pot canviar depenent de l'entorn on s'executa el programa (desenvolupament, producció...).

**.env** — Fitxer de text on es defineixen les variables d'entorn d'un projecte. Vite suporta `.env`, `.env.development`, `.env.production` i `.env.local`.

**prefix VITE\_** — Prefix obligatori que han de tenir les variables d'entorn de Vite perquè siguin accessibles al codi del navegador. Sense aquest prefix, la variable queda amagada.

**import.meta.env** — Objecte de JavaScript on Vite exposa les variables d'entorn al codi del frontend. Per exemple `import.meta.env.VITE_API_URL`.

**Entorn de desenvolupament** — El context on treballes mentre programes. Les eines mostren errors detallats i l'HMR funciona. S'activa amb `npm run dev`.

**Entorn de producció** — El context del servidor real on els usuaris accedeixen a l'aplicació. El codi es minifica i optimitza. S'activa amb `npm run build`.

**.gitignore** — Fitxer que indica a Git quins arxius i carpetes ha d'ignorar i no pujar al repositori. Sempre ha de contenir `node_modules/` i els fitxers `.env.local`.

**VS Code** — Visual Studio Code. L'editor de codi més popular del món, gratuït i de codi obert, creat per Microsoft.

**Command Palette** — La barra de cerca de comandes de VS Code. S'obre amb `Ctrl+Shift+P`. Permet accedir a qualsevol funcionalitat de l'editor escrivint-ne el nom.

**Activity Bar** — La columna d'icones a l'esquerra de VS Code. Dona accés ràpid a l'explorador de fitxers, Git, depurador i extensions.

**Side Bar** — El panell lateral que mostra el contingut de la vista seleccionada a l'Activity Bar (fitxers del projecte, canvis de Git, etc.).

**Panel** — La zona inferior de VS Code que conté el terminal integrat, els errors i els logs.

**Terminal integrat** — El terminal de comandes incorporat a VS Code. S'obre amb \`Ctrl+\`\` sense necessitat de canviar de finestra.

**Extensió** — Complement que afegeix funcionalitats a VS Code. S'instal·len des del Marketplace integrat.

**ESLint** — Eina que analitza el codi mentre escrius i detecta errors, males pràctiques i inconsistències sense executar-lo. Es configura amb `.eslintrc.json`.

**Linter** — Eina que analitza el codi estàticament per trobar errors i problemes sense executar-lo. ESLint és un linter per a JavaScript.

**Prettier** — Formata el codi automàticament seguint regles d'estil definides. S'activa "Format on Save" per aplicar-lo cada vegada que guardes. Es configura amb `.prettierrc`.

**GitLens** — Extensió de VS Code que mostra informació de Git directament a l'editor: qui va escriure cada línia, quan i en quin commit.

**Git Blame** — Funcionalitat de Git que mostra qui és l'autor de cada línia d'un fitxer i en quin commit es va afegir. GitLens el mostra en temps real.

**Breakpoint** — Punt de parada. Una marca que poses al codi perquè el depurador aturi l'execució en aquella línia i puguis inspeccionar l'estat del programa.

**Debugger** — Eina de depuració. Permet executar el codi pas a pas, inspeccionar variables i trobar l'origen dels errors.

**Call Stack** — Pila de crides. Mostra el camí de funcions que ha executat el codi per arribar al punt actual. Útil per entendre d'on ve un error.

**Watch Expression** — Expressió que vigilies durant una sessió de depuració. El seu valor s'actualitza automàticament a cada pas.

**Step Over (F10)** — Avança a la línia següent sense entrar dins de les funcions que s'hi criden.

**Step Into (F11)** — Entra dins de la funció que es crida a la línia actual per depurar-la per dins.

**GitHub Copilot** — Assistent d'IA integrat a VS Code que suggereix codi mentre escrius, explica codi aliè i ajuda a refactoritzar.

**Prompt** — La instrucció o pregunta que li fas a una IA perquè generi una resposta. Com més específic és el prompt, millor és el resultat.

**Refactorització** — Reestructurar el codi existent sense canviar el seu comportament, per fer-lo més llegible, senzill o fàcil de mantenir.

**Hallucination (al·lucinació)** — Quan una IA genera codi o informació que sembla correcta però és incorrecta o inexistent. Per això sempre cal revisar el que genera la IA.

