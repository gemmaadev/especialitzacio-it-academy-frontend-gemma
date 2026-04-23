## **Glossari de termes — Git i GitHub**

**Branch (Branca)** — Línia de treball independent dins d'un repositori. Permet treballar en una funcionalitat sense afectar el codi principal. Cada branca té el seu propi historial de commits.

**CI (Integració Contínua)** — Pràctica d'executar tests automàticament cada vegada que es puja codi al repositori, per detectar errors el més aviat possible.

**CD (Desplegament Continu)** — Pràctica d'enviar automàticament el codi al servidor de producció quan passa tots els tests.

**CI/CD** — La combinació de Integració Contínua i Desplegament Continu. Sistema que automatitza tot el procés de verificar i desplegar codi.

**Clone** — Descarregar una còpia completa d'un repositori remot al teu ordinador, incloent tot l'historial de commits i totes les branques.

**Code Review** — Revisió del codi d'un company abans d'acceptar una Pull Request. Comprova que el codi és correcte, segueix els estàndards del projecte i no té errors.

**Commit** — Fotografia del codi en un moment concret, guardada a l'historial de Git. Cada commit té un missatge descriptiu, un autor, una data i un identificador únic (hash).

**Conflict (Conflicte)** — Situació que es produeix quan dues persones han modificat la mateixa línia del mateix fitxer. Git no pot decidir quin canvi és el correcte i demana que ho resolguis manualment.

**Develop** — Branca d'integració on es van ajuntant totes les funcionalitats abans de passar a main. És la branca activa del dia a dia en projectes que segueixen Gitflow.

**Event** — Acció que activa un workflow de GitHub Actions. Exemples: push, pull request, horari programat o activació manual.

**Feature Branch** — Branca creada per desenvolupar una funcionalitat concreta. Té un nom descriptiu com `feature/login` o `feature/formulari-contacte`. Neix de develop o main i hi torna quan s'acaba la feina.

**Fork** — Còpia completa d'un repositori aliè que queda al teu compte de GitHub. T'hi permet treballar lliurement sense afectar l'original. S'usa sobretot per contribuir a projectes de codi obert.

**Forking Workflow** — Protocol de treball en el qual cada contribuïdor treballa en el seu propi fork del repositori original i proposa canvis mitjançant Pull Requests.

**Git** — Sistema de control de versions distribuït. Eina que s'instal·la al teu ordinador i gestiona l'historial de canvis del codi localment.

**Git Blame** — Funcionalitat de Git que mostra qui és l'autor de cada línia d'un fitxer i en quin commit es va afegir.

**Git Hook** — Script que s'executa automàticament quan fas certes accions amb Git, com ara un commit o un push. Es guarden a la carpeta `.git/hooks/`.

**GitHub** — Plataforma web que allotja repositoris Git al núvol. Afegeix funcionalitats de col·laboració com Pull Requests, Issues, Projects i GitHub Actions.

**GitHub Actions** — Sistema d'automatització integrat a GitHub que permet executar workflows quan es produeixen events al repositori.

**GitHub Flow** — Estratègia de branques simplificada on les feature branches neixen directament de main i hi tornen. Sense branca develop. Recomanada per a equips petits.

**Gitflow** — Estratègia de branques estructurada amb branques main, develop, feature, release i hotfix. Adequada per a projectes amb versions definides.

**Hash** — Identificador únic d'un commit. És una cadena de caràcters alfanumèrics com `a3f8c21`. Permet referenciar un commit concret de manera inequívoca.

**Historial** — Registre de tots els commits fets al repositori, ordenats cronològicament. Es pot consultar amb `git log`.

**Hotfix Branch** — Branca creada per corregir un error urgent en producció. A diferència de les feature branches, neix directament de main i s'ha de fusionar tant a main com a develop.

**Husky** — Eina per a projectes JavaScript que gestiona Git Hooks i els guarda al repositori perquè tot l'equip els tingui automàticament en fer `npm install`.

**Issue** — Tasca, error o millora concreta registrada a GitHub. Té un títol, descripció, etiquetes i una persona assignada. Es tanca quan es resol.

**Job** — Conjunt de steps dins d'un workflow de GitHub Actions que s'executen en una mateixa màquina virtual.

**Label (Etiqueta)** — Categorització d'una Issue o Pull Request. Exemples habituals: `bug`, `feature`, `documentation`, `help wanted`.

**lint-staged** — Eina que complementa Husky executant els checks (linting, format...) únicament sobre els fitxers modificats que estan preparats per al commit, no sobre tot el projecte.

**Main** — Branca principal del repositori que conté el codi estable i en producció. Mai s'hi fa commit directament: tots els canvis arriben via Pull Request.

**Merge** — Fusionar els canvis d'una branca a una altra. Incorpora tots els commits de la branca origen a la branca destí.

**Milestone** — Objectiu amb data límit que agrupa Issues relacionades. Mostra el percentatge de progrés a mesura que es tanquen les issues associades.

**Origin** — Nom convencional que es dona al repositori remot principal. Quan fas `git push origin main`, estàs pujant a la branca main del repositori remot anomenat origin.

**Pre-commit** — Tipus de Git Hook que s'executa just abans de guardar un commit. Si el script retorna un error, el commit s'avorta. S'usa per passar linters o comprovar el format del codi.

**Pre-push** — Tipus de Git Hook que s'executa just abans de pujar commits a GitHub. S'usa habitualment per executar els tests i impedir pujar codi trencat.

**Pull** — Descarregar i incorporar els canvis del repositori remot al teu repositori local. Equival a fer fetch i merge en una sola comanda.

**Pull Request (PR)** — Proposta formal de canvis a GitHub. Demana que els canvis d'una branca siguin revisats i acceptats abans de fusionar-los a main o develop.

**Push** — Pujar els commits locals al repositori remot de GitHub perquè els altres membres de l'equip els puguin veure i descarregar.

**Repositori (Repository)** — Carpeta del projecte que conté tots els fitxers més l'historial complet de canvis gestionat per Git. Pot ser local o remot.

**Repositori local** — Còpia del repositori al teu ordinador. Aquí fas els canvis i els commits.

**Repositori remot** — Còpia del repositori allotjada a GitHub. És el punt central de sincronització per a tot l'equip.

**Revert** — Crear un nou commit que desfà els canvis d'un commit anterior, sense eliminar-lo de l'historial.

**Runner** — Màquina virtual que GitHub posa a disposició per executar els jobs d'un workflow de GitHub Actions. Pot ser Ubuntu, Windows o macOS.

**Semantic Versioning** — Convenció per numerar versions de software amb el format MAJOR.MINOR.PATCH. Per exemple: `2.1.3` on 2 és la versió major, 1 és una funcionalitat nova i 3 és una correcció d'error.

**Shebang** — La primera línia d'un script (`#!/bin/sh`) que indica al sistema operatiu quin programa ha d'usar per executar-lo. No és un comentari, tot i que comença per `#`.

**Source Control** — Sinònim de control de versions. A VS Code, el panell de Source Control és on gestiones les operacions de Git visualment.

**Stage / Staging** — Preparar fitxers per incloure'ls al proper commit. Es fa amb `git add`. Els fitxers preparats es troben a l'àrea staging o índex.

**Step** — Cada tasca individual dins d'un job de GitHub Actions. Pot ser una comanda de terminal o una action reutilitzable.

**Tag** — Etiqueta que marca un commit concret com una versió important del projecte. S'usa per marcar llançaments com `v1.0.0` o `v2.3.1`.

**Trigger** — Sinònim d'event a GitHub Actions. L'acció que dispara l'execució d'un workflow.

**Untracked** — Estat d'un fitxer nou que Git no ha registrat mai. Apareix a `git status` i cal fer `git add` per que Git el comenci a rastrejar.

**Workflow** — Procés automatitzat definit en un fitxer YAML a `.github/workflows/`. Conté els events que l'activen, els jobs i els steps que ha d'executar.

**YAML** — Format de fitxer de text usat per configurar els workflows de GitHub Actions. Usa indentació per estructurar la informació i és més llegible que JSON o XML.

