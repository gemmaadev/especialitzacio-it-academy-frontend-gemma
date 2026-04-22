## **Apunts tema 3: Eines de desenvolupament web** 

## **package.json vs package-lock.json**

**package.json** és el fitxer principal del projecte: conté el nom, la versió i la llista de dependències que necessites. L'edites tu manualment. Les versions que hi poses poden ser aproximades (`"^18.0.0"` vol dir "versió 18 o compatible").

**package-lock.json** el genera npm automàticament quan fas `npm install`. Guarda les versions **exactes** de tot el que s'ha instal·lat. No l'editis mai. Serveix perquè tots els membres de l'equip instal·lin exactament les mateixes versions. 

Tots dos han d'anar a Git. La carpeta `node_modules` mai va a Git.

**Node.js: arquitectura event-driven i non-blocking I/O**

Node.js usa un sol fil d'execució per a totes les peticions. Quan ha de fer alguna operació lenta (llegir un fitxer, consultar una base de dades), **no espera**: continua atenent altres peticions i torna quan la resposta arriba. Això s'anomena **non-blocking**. 

L'**Event Loop** és el mecanisme que gestiona tot això: rep peticions, les delega i segueix treballant. És com un cambrer que no espera a la cuina: anota la comanda i atén la taula següent.

**Node.js: característiques principals**

Node.js és un entorn d'execució que permet usar JavaScript fora del navegador, al servidor. Usa el motor **V8** de Google Chrome (el mateix que usa el navegador), que compila JavaScript a codi màquina molt ràpidament. npm és el seu gestor de paquets, amb més de dos milions de paquets disponibles. 

Les alternatives a npm són **Yarn** i **pnpm** (més ràpid i estalvia espai en disc guardant cada paquet una sola vegada).

**Gestionar dependències amb npm**  
npm init \-y                    \# crea el package.json  
npm install                    \# instal·la tot el que hi ha al package.json  
npm install express            \# instal·la un paquet (dependència de producció)  
npm install \--save-dev jest    \# instal·la com a dependència de desenvolupament  
npm uninstall express          \# elimina un paquet  
npm update                     \# actualitza els paquets  
npm run nom-script             \# executa un script del package.json

Els scripts al `package.json` automatitzen tasques: `"dev": "vite"`, `"test": "jest"`. S'executen amb `npm run dev`, `npm run test`, etc.

**Variables d'entorn a Vite**

Els fitxers `.env` configuren valors que canvien segons l'entorn. **Regla fonamental: només les variables amb prefix `VITE_`** arriben al codi del navegador. Les que no en tenen (com `DB_PASSWORD`) queden amagades per seguretat.

.env              → comú a tots els entorns  
.env.development  → quan executes npm run dev  
.env.production   → quan executes npm run build  
.env.local        → el teu ordinador personal (no va a Git)

Al codi s'accedeix amb `import.meta.env.VITE_NOM_VARIABLE`. Mai posis secrets (contrasenyes, claus privades d'API) a variables `VITE_` perquè qualsevol usuari les pot veure al navegador.

**Hot Module Replacement (HMR)**

Quan guardes un fitxer mentre programes, HMR actualitza **només aquell mòdul** al navegador sense recarregar tota la pàgina. Avantatges respecte a la recàrrega tradicional: no perds l'estat de l'aplicació (formularis plens, posició de scroll, pàgina actual), i els canvis es veuen en mil·lisegons. 

Els canvis de CSS s'apliquen especialment ràpid. HMR és exclusiu del mode de desenvolupament: no arriba als usuaris finals.

**Eines modernes (Vite) vs. enfocaments tradicionals (Webpack)**

Webpack processava i combinava **tot el codi** en un bundle abans d'iniciar el servidor. En projectes grans podia trigar 10-30 segons. 

Vite no fa bundle en desenvolupament: serveix els fitxers directament al navegador un per un, aprofitant que els navegadors moderns ja entenen els mòduls ES. 

El servidor arrenca en menys d'un segon sempre. Per a producció, tots dos generen fitxers optimitzats, però Vite és més senzill de configurar i requereix molt menys codi de configuració.

**Que és Vite i quins tipus d'aplicacions genera**

Vite és una eina de construcció i servidor de desenvolupament modern. 

Té dues funcions: en **desenvolupament** serveix el codi ràpidament amb HMR, i en **producció** construeix fitxers optimitzats. 

Es crea un projecte nou amb `npm create vite@latest nom-projecte` i permet escollir entre: Vanilla JS, React, Vue, Svelte, Solid i TypeScript. 

Les comandes bàsiques sempre són `npm run dev` (desenvolupament), `npm run build` (producció) i `npm run preview` (previsualitzar la versió de producció).

**Gestionar entorns (desenvolupament i producció)**

El mateix codi es comporta diferent segons l'entorn gràcies a les variables d'entorn. `npm run dev` carrega `.env.development`. `npm run build` carrega `.env.production`. Vite proporciona automàticament `import.meta.env.DEV` (true en dev) i `import.meta.env.PROD` (true en prod) sense que hagis de definir res. 

Útil per activar logs o eines de depuració només en desenvolupament. En plataformes de desplegament com Vercel o Netlify, les variables de producció es defineixen des del seu panell web, sense fitxers `.env`.

**Git integrat a VS Code**

El panell Source Control (`Ctrl+Shift+G`) permet fer totes les operacions de Git sense escriure comandes. 

El flux sempre és: **Stage** (botó `+` al costat del fitxer), **Commit** (escriu el missatge i clica Commit), **Push** (puja al servidor). 

Els estats dels fitxers: `M` \= modificat, `U` \= nou, `D` \= eliminat. Les branques es gestionen clicant el nom de branca a la barra d'estat inferior. 

Quan hi ha conflictes, VS Code mostra botons per triar quin canvi conservar.

**Depuració a VS Code**

Breakpoints: clic al marge esquerre d'una línia → punt vermell → el codi s'atura aquí. 

Controls: `F5` continua, `F10` avança línia a línia, `F11` entra dins una funció, `Shift+F5` atura la sessió. 

El panell **Variables** mostra tots els valors actuals. 

El panell **Watch** vigila expressions concretes que tu defines. 

La **Call Stack** mostra el camí de crides que ha fet el codi fins arribar al punt actual. La 

**Debug Console** permet escriure expressions i veure el resultat en temps real.

**Extensions essencials (ESLint, Prettier, GitLens)**

**ESLint** analitza el codi mentre escrius i subratlla errors i males pràctiques sense executar res. 

**Prettier** formata el codi automàticament quan guardes (activa "Format on Save" als settings). Tots dos es configuren amb fitxers `.eslintrc.json` i `.prettierrc` a l'arrel del projecte. 

**GitLens** afegeix al final de cada línia qui la va escriure i quan. Útil per entendre codi aliè i trobar l'origen dels canvis sense sortir de l'editor.

**GitHub Copilot i l'impacte de la IA**

Copilot suggereix codi mentre escrius (accepta amb `Tab`). `Ctrl+I` obre el chat en línia per modificar codi seleccionat. `Ctrl+Alt+I` obre el chat complet per preguntes i refactoritzacions. 

La IA ajuda amb: completar codi repetitiu, generar tests, explicar codi aliè, suggerir millores. 

**Limitació important**: el codi generat per IA conté més vulnerabilitats i errors que el codi humà. Sempre revisa el que genera. La IA és un assistent, no un substitut: tu prens les decisions finals. No l'uses per aprendre menys, usa-la per aprendre més ràpid.

**VS Code: interfície i dreceres**

| Acció | Windows/Linux | macOS |
| ----- | ----- | ----- |
| Command Palette | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| Obrir fitxer ràpid | `Ctrl+P` | `Cmd+P` |
| Terminal integrat | \`Ctrl+\`\` | \`Ctrl+\`\` |
| Comentar línia | `Ctrl+/` | `Cmd+/` |
| Moure línia amunt/avall | `Alt+↑↓` | `Option+↑↓` |
| Buscar a tot el projecte | `Ctrl+Shift+F` | `Cmd+Shift+F` |
| Formatar document | `Shift+Alt+F` | `Shift+Option+F` |
| Source Control (Git) | `Ctrl+Shift+G` | `Cmd+Shift+G` |
| Anar a definició | `F12` | `F12` |

