**Comandes essencials de Git**

**`git init`**

Converteix una carpeta normal en un repositori de Git. Crea una carpeta oculta `.git` dins del projecte on Git guardarà tot l'historial. Només cal fer-ho **una vegada** per projecte, al principi.

git init

**`git status`**

Mostra l'estat actual del repositori: quins fitxers has modificat, quins estan preparats per al commit i quins no estan rastreats per Git. És la comanda que més usaràs per saber en quin punt estàs.

git status

Els estats que veuràs:

* **Untracked**: fitxer nou que Git no coneix encara  
* **Modified**: fitxer modificat però no preparat  
* **Staged**: preparat per al commit

**`git add`**

Prepara els fitxers que vols incloure al proper commit. Sense aquest pas, Git no guarda els canvis.

**git add fitxer.txt** afegeix un fitxer concret  
**git add .** afegeix TOTS els fitxers modificats  
**git add src/** afegeix tota una carpeta

**`git commit`**

Guarda una fotografia del codi en aquell moment amb un missatge descriptiu. Només guarda els fitxers que prèviament has fet `git add`.

git commit \-m "afegeix formulari de login"

El missatge ha d'explicar **què** has fet, no com. Exemples de bons missatges:

* `"afegeix validació del formulari"`  
* `"corregeix error al botó d'enviament"`  
* `"actualitza estils de la capçalera"`

**`git push`**

Puja els commits locals al repositori remot de GitHub perquè els altres els puguin veure i descarregar.

**git push** puja a la branca configurada per defecte  
**git push origin main** puja la branca main a GitHub  
**git push origin feature/login** puja una branca concreta

**`git pull`**

Baixa i incorpora els canvis que hi ha a GitHub al teu ordinador. Sempre fes `git pull` abans de posar-te a treballar per tenir el codi actualitzat.

**git pull** baixa i fusiona els canvis de la branca actual  
**git pull origin main** baixa i fusiona des de la branca main

**`git checkout`**

Serveix per dues coses: canviar de branca o crear-ne una de nova.

**git checkout main** canvia a la branca main  
**git checkout feature/login** canvia a una branca existent  
**git checkout \-b feature/registre** crea una branca nova i hi va

La `-b` vol dir "branch": crea la branca si no existeix.

**`git merge`**

Fusiona els canvis d'una branca a l'altra. Normalment et poses a la branca de destí i hi fusiones la branca d'origen.

**git checkout main** vas a la branca on vols incorporar els canvis  
**git merge feature/login** fusiones els canvis de feature/login a main

Si dues persones han modificat la mateixa línia, Git genera un **conflicte** i et demana que tries manualment quin canvi conservar.

**`git log`**

Mostra l'historial de commits del projecte: qui ha fet cada canvi, quan i amb quin missatge.

**git log** mostra l’historial complet (surt amb q)  
**git log \--oneline** mostra historial resumit, una línia per commit  
**git log \--oneline \-5**  mostra els últims 5 commits

**Pas a pas del meu dia a dia:**

**git pull** baixes els canvis dels companys  
**git checkout \-b feature/nova** crees la teva branca  
\[fas canvis al codi\]  
**git status** comproves l'estat  
**git add .** prepares els canvis  
**git commit \-m "missatge clar"** guardes els canvis  
**git push origin feature/nova** puges la branca a GitHub  
\[obres una Pull Request a GitHub\]

