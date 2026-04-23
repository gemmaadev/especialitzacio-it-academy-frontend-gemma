**Crear i gestionar repositoris remots, sincronització local-remot, issues, projects, milestones**

## **Repositori remot: la còpia al núvol**

Un repositori remot és la versió del teu projecte guardada a GitHub, accessible des de qualsevol ordinador. El teu ordinador té la còpia **local** i GitHub té la còpia **remota**. Sempre has de mantenir les dues sincronitzades.

**Crear un repositori nou a GitHub:**

1. Vas a github.com i cliques el botó `+` i "New repository"
2. Li poses un nom, tries si és públic o privat i cliques "Create repository"
3. GitHub et dona les comandes per connectar-lo amb el teu projecte local

**Connectar un projecte local existent amb GitHub:**

git remote add origin https://github.com/usuari/nom-repo.git  
git branch \-M main  
git push \-u origin main

La paraula `origin` és simplement el nom que li donem al repositori remot. Podria ser qualsevol nom, però `origin` és la convenció estàndard.

**Sincronització local-remot: push i pull**

La sincronització és el procés de mantenir la còpia local i la remota al dia. Hi ha dues direccions: pujar els teus canvis cap amunt i baixar els canvis d'altres cap avall.

**git push origin main** puja els teus commits locals a GitHub  
**git pull origin main** baixa els commits de GitHub al teu ordinador  
**git fetch** comprova si hi ha canvis a GitHub sense baixar-los

Sempre fes `git pull` abans de posar-te a treballar i `git push` quan acabis. Així evites conflictes amb la feina dels teus companys.

El flux típic del dia a dia és:

**git pull** per baixar els canvis dels companys  
\[treballes i fas canvis\]  
**git add .**  
**git commit \-m "missatge"**  
**git push** per pujar els teus canvis

**Issues: el sistema de tasques i errors**

Les Issues són la manera de fer un seguiment de tasques molt concretes associades a un projecte. Pots usar-les per reportar errors (_bugs_), demanar noves funcionalitats, o simplement anotar coses pendents de fer.

Cada issue té: un títol descriptiu, una descripció del problema o tasca, etiquetes (_labels_) com `bug`, `feature` o `documentation`, i una persona assignada per resoldre-la.

**Com crear una issue:**

1. Vas a la pestanya "Issues" del repositori a GitHub
2. Cliques "New issue"
3. Escrius el títol i la descripció
4. Opcionalment assignes etiquetes i una persona

Quan resoleu el problema, tanqueu la issue amb "Close issue". Pots tancar-la automàticament des d'un commit escrivint `Closes #15` al missatge del commit (on 15 és el número de la issue).

**Projects: el tauler visual de tasques**

GitHub Projects és una eina visual de gestió de flux de treball dissenyada per ajudar els equips a organitzar, fer seguiment i prioritzar tasques. Pensa-hi com una pissarra digital on pots mapejar el recorregut del teu projecte des de la idea fins a l'acabament.

Funciona com un tauler Kanban amb columnes. Per defecte té tres columnes: **To Do** (pendent), **In Progress** (en curs) i **Done** (fet). Cada issue o Pull Request és una targeta que va movent-se per les columnes a mesura que avança la feina.

**Com crear un Project:**

1. Vas al teu perfil o organització a GitHub i a la pestanya "Projects"
2. Cliques "New project" i tries una plantilla (recomanat: "Board")
3. Afegeixes les issues existents com a targetes al tauler

És especialment útil quan treballes en equip: tothom pot veure d'un cop d'ull en quin estat està cada tasca i qui l'està fent.

**Milestones: els objectius amb data límit**

Els milestones serveixen per fer un seguiment del progrés en grups d'issues o Pull Requests d'un repositori. Un milestone és com un objectiu amb data: "Per al dia 15 han d'estar tancades totes aquestes issues".

Per exemple, pots crear un milestone anomenat "Versió 1.0" amb data límit el 30 d'abril, i assignar-hi totes les issues que cal resoldre per tenir la primera versió llesta. GitHub mostra automàticament el percentatge de progrés a mesura que vas tancant issues.

**Com crear un milestone:**

1. Vas a la pestanya "Issues" → "Milestones"
2. Cliques "New Milestone"
3. Li poses nom, descripció i data límit opcional
4. Quan crees o edites una issue, l'assignes al milestone corresponent

**Com s'encaixa tot**

La relació entre les eines és la següent: els **milestones** defineixen els objectius generals (el "que cal fer per quan"), les **issues** són les tasques concretes per assolir-los (el "que cal fer"), i els **projects** mostren l'estat de tot visualment (el "en quin punt estem").

Quan resoleu una issue i feu el commit i la Pull Request corresponents, tanqueu la issue, s'actualitza el progrés del milestone i la targeta del Project es mou a "Done" automàticament.

| Eina             | Per a què serveix                  | Analogia                |
| ---------------- | ---------------------------------- | ----------------------- |
| Repositori remot | Còpia del codi al núvol            | Google Drive del codi   |
| push / pull      | Sincronitzar local ↔ remot         | Pujar/baixar fitxers    |
| Issue            | Tasca o error concret              | Post-it de cosa pendent |
| Project          | Tauler visual de totes les tasques | Tauler Kanban           |
| Milestone        | Objectiu amb data límit            | Fita del projecte       |

##
