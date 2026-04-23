## **Apunts tema 4: Sistemes de Control de Versions \- Git/GitHub**

## **1\. Necessitat del control de versions**

El control de versions és un sistema que guarda l'historial complet de tots els canvis que fas al codi, qui els ha fet i quan. Sense ell, col·laborar en equip és caòtic: fitxers sobreescrits, feina perduda i sense manera de saber qui ha canviat què.

Els tres grans avantatges són l'**historial de canvis** (pots veure com ha evolucionat el projecte i revertir errors), la **col·laboració** (diverses persones treballen al mateix projecte sense interferir-se) i la **resolució de conflictes** (quan dues persones modifiquen la mateixa línia, Git ho detecta i et permet decidir quina versió conservar).

**2\. Conceptes bàsics**

**Repositori** — la carpeta del projecte amb tot l'historial de canvis inclòs. Pot ser local (al teu ordinador) o remot (a GitHub).

**Commit** — una fotografia del codi en un moment concret, amb un missatge descriptiu de què s'ha fet.

**Branch** — una línia de treball independent. Permet treballar en una funcionalitat sense tocar el codi principal.

**Merge** — fusionar els canvis d'una branca a una altra.

**Clone** — descarregar una còpia completa d'un repositori remot al teu ordinador, incloent tot l'historial.

**3\. Comandes essencials**  
git init converteix una carpeta en repositori  
git status  veure l'estat dels fitxers  
git add .  preparar tots els canvis  
git commit \-m "missatge" guardar els canvis amb descripció  
git push origin main pujar commits a GitHub  
git pull baixar canvis de GitHub  
git checkout \-b feature/nova crear una branca nova i anar-hi  
git merge feature/nova fusionar una branca a l'actual  
git log \--oneline veure l'historial resumit

El flux del dia a dia sempre és: `git pull` → fas canvis → `git add .` → `git commit` → `git push`.

**4\. Repositoris remots i sincronització**

El repositori **local** és la còpia al teu ordinador. El repositori **remot** és la còpia a GitHub. Has de mantenir les dues sincronitzades.

`git push` puja els teus commits locals a GitHub.   
`git pull` baixa els commits de GitHub al teu ordinador.   
Fer `git pull` sempre abans de posar-te a treballar i `git push` quan acabis.  
`origin` és simplement el nom que li donem al repositori remot. És la convenció estàndard.

**5\. Issues, Projects i Milestones**

**Issues** — tasques o errors concrets del projecte. Cada issue té un títol, descripció i etiquetes. Es tanquen quan es resolen. Pots tancar-les automàticament des d'un commit escrivint `Closes #15` al missatge.

**Projects** — tauler visual tipus Kanban amb columnes To Do, In Progress i Done. Cada issue és una targeta que es mou per les columnes a mesura que avança la feina.

**Milestones** — objectius amb data límit. Agrupen issues relacionades i mostren el percentatge de progrés a mesura que es van tancant.

**6\. Estratègies de branques**

**main** — el codi estable i en producció. Mai es fa commit directament aquí.

**develop** — branca d'integració on s'ajunten totes les funcionalitats abans d'anar a main.

**feature/xxx** — una branca per cada funcionalitat nova. Neix de develop i hi torna quan s'acaba. Han de tenir noms descriptius: `feature/login`, `fix/error-boto`.

**hotfix/xxx** — correcció urgent d'un error en producció. Neix de main directament i s'ha de fusionar tant a main com a develop.

Per a projectes petits s'usa **GitHub Flow**: no hi ha develop, les feature branches neixen de main i hi tornen directament.

**7\. Tags: marcar versions**

Un tag és una etiqueta que poses en un commit per marcar que aquella és una versió important. Segueixen el format **Semantic Versioning**: `MAJOR.MINOR.PATCH`.

* `1.0.0` → primera versió estable  
* `1.1.0` → nova funcionalitat afegida  
* `1.1.1` → correcció d'un error petit

git tag v1.0.0 crea un tag al commit actual  
git push origin \--tags puja tots els tags a GitHub

**8\. Git Hooks**

Els Git Hooks són scripts que s'executen automàticament quan fas certes accions amb Git. Es guarden a `.git/hooks/`.

Els més importants són el `pre-commit` (s'executa abans de cada commit, pot bloquejar-lo si hi ha errors) i el `pre-push` (s'executa abans de pujar, útil per passar els tests).

Per a projectes JavaScript, **Husky** és l'eina estàndard per gestionar hooks. Els guarda a una carpeta `.husky/` que sí va a Git, de manera que tot l'equip els té. **lint-staged** complementa Husky executant els checks només sobre els fitxers modificats, no sobre tot el projecte.

**9\. Protocols per a treball en equip**

**Pull Requests** — proposta formal de canvis. En lloc de fusionar directament a main, obres una PR que algun company ha de revisar i aprovar. Cap codi arriba a producció sense revisió.

**Code Reviews** — la revisió que fa un company de la teva PR. Comprova que el codi fa el que diu, busca errors i proposa millores. El resultat pot ser aprovació, aprovació amb comentaris o sol·licitud de canvis.

**Forking Workflow** — protocol per contribuir a repositoris aliens. Fas un fork (còpia al teu compte), treballes a la teva còpia i obres una PR cap al repositori original. S'usa molt en projectes de codi obert.

**10\. GitHub Actions: CI/CD**

GitHub Actions és un sistema d'automatització integrat a GitHub. Quan passes un cert event (push, PR...) s'activa un **workflow** que executa tasques automàticament.

**CI (Integració Contínua)** — cada vegada que puges codi, s'executen els tests automàticament per detectar errors.

**CD (Desplegament Continu)** — si el codi passa els tests, es desplega al servidor automàticament.

Els workflows es guarden a `.github/workflows/` en fitxers `.yml`. Estan formats per events (quan s'activen), jobs (conjunts de tasques) i steps (cada tasca individual). Un job de desplegament pot configurar-se per executar-se només si el job de tests ha passat, fent impossible desplegar codi trencat.

**Resum del flux complet de treball en equip**  
1\. git pull per actualitzar el codi  
2\. git checkout \-b feature/nova per crear la teva branca  
3\. \[treballes i fas commits\]  
4\. git push origin feature/nova per pujar la branca  
5\. Obres una Pull Request a GitHub  
6\. Un company fa la Code Review  
7\. S'aprova i es fusiona a develop/main  
8\. GitHub Actions executa els tests automàticament  
9\. Si tot passa, es desplega a producció  
10\. git branch \-d feature/nova per esborrar la branca local

