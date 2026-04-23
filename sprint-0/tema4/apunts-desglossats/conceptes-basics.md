**Conceptes bàsics: commit, repository, branch, merge, clone**

## **Repositori (repository)**

Un repositori és la carpeta del teu projecte però, a més dels fitxers, guarda tot l'historial de canvis que has fet des del principi. És com un Google Drive del codi però molt més potent.

Hi ha dos tipus: el **repositori local** (al teu ordinador) i el **repositori remot** (a GitHub, al núvol). Normalment treballes al local i puges els canvis al remot.

**git init** per crear un repositori local nou a la carpeta actual  
**git clone URL** per descarregar un repositori remot al meu ordinador

## **Commit**

Un commit és una fotografia del codi en un moment concret. Cada vegada que fas un commit, Git guarda l'estat actual dels fitxers i afegeix una nota descriptiva de què has fet. L'historial de commits és com un diari del projecte.

Un bon missatge de commit ha de descriure **què** has fet: `"afegeix formulari de login"` és millor que `"canvis"`.

**git add .** prepara els fitxers per al commit  
**git commit \-m "missatge clar"** guarda els canvis amb descripció  
**git log** per veure l'historial de commits

El flux sempre és: fas canvis → `git add` → `git commit`. Sense `git add` primer, el commit no inclou els canvis.

## **Branch (branca)**

Una branca és una línia de treball independent. Imagina que el teu projecte és un arbre: la branca principal (`main`) és el tronc, i pots crear branques noves per treballar en funcionalitats sense tocar el codi principal fins que estigui llest.

Això és molt útil quan treballes en equip: cada persona treballa a la seva branca i no interfereix amb la feina dels altres.

**git branch** és per veure totes les branques  
**git checkout \-b nom-nova-branca** és per crear una branca nova i anar-hi  
**git checkout main** és per tornar a la branca principal  
**git branch \-d nom-branca** és per eliminar una branca

Per convenció, la branca principal s'anomena `main`. Les branques noves solen tenir noms descriptius com `feature/login` o `fix/error-formulari`.

## **Merge (fusió)**

El merge és el procés de fusionar els canvis d'una branca a una altra. Quan has acabat de treballar a la teva branca i tot funciona, fas un merge per incorporar els canvis a la branca principal.

**git checkout main** és per quan vas a la branca on vols incorporar els canvis  
**git merge nom-branca** quan fusiones els canvis de l'altra branca

De vegades el merge genera un **conflicte**: passa quan dues persones han modificat la mateixa línia de codi. Git no sap quin canvi és el correcte i et demana que ho decideixis tu manualment. VS Code t'ajuda a resoldre'ls visualment mostrant les dues versions i deixant-te triar.

## **Clone**

Clonar és descarregar una còpia completa d'un repositori remot (de GitHub) al teu ordinador. No és simplement baixar els fitxers: el clone descarrega també tot l'historial de commits, totes les branques i tota la configuració del repositori.

git clone https://github.com/usuari/nom-repositori.git

Això crea una carpeta nova al teu ordinador amb tot el projecte a punt per treballar. Normalment és el primer que fas quan t'incorpores a un projecte nou o vols treballar amb el codi d'algú altre.

## **Pas a pas**

1\. **git clone URL** per descarregar el projecte (només el primer dia)

2\. **git checkout \-b nova-func** per crear una branca per la teva feina

3\. \[fas canvis al codi\]

4\. **git add .** quan prepares els canvis

5\. **git commit \-m "missatge"** quan guardes els canvis

6\. **git push origin nova-func** quan puges la branca a GitHub

7\. \[fas una Pull Request a GitHub per fusionar\]

8\. **git checkout main** quan tornes a la branca principal

9\. **git pull** per quan baixes els últims canvis

| Concepte   | Analogia senzilla                  |
| ---------- | ---------------------------------- |
| Repositori | Carpeta del projecte amb historial |
| Commit     | Fotografia del codi en un moment   |
| Branch     | Còpia de treball independent       |
| Merge      | Fusionar dues versions del codi    |
| Clone      | Descarregar tot el repositori      |
