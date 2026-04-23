**Git Hooks: scripts per automatitzar accions abans/després d’esdeveniments (p.e., pre-commit)**

## **Què és un Git Hook?**

Un Git Hook és un **script que s'executa automàticament** quan fas certes accions amb Git, com ara un commit, un push o un merge. Imagina'ls com alarmes automàtiques: "cada vegada que intentes fer un commit, executa primer aquesta comprovació".

Els Git Hooks són scripts guardats al directori `.git/hooks` que s'executen en esdeveniments específics de Git. Implementar-los pot ajudar a agilitzar el procés de desenvolupament: assegurar que tot el codi compleix les directrius de l'equip abans de fer el commit, executar tests automàticament, o enviar notificacions sobre canvis al codi.

**On viuen els hooks?**

Tots els hooks es guarden a la carpeta oculta `.git/hooks` del teu repositori. Si hi entres, veuràs fitxers amb l'extensió `.sample`: són exemples que Git proporciona però que no s'executen fins que els actives.

ls .git/hooks

fitxers que veuria a dins: 

pre-commit.sample  
commit-msg.sample  
pre-push.sample  
post-merge.sample  
...

Per activar un hook, simplement li **treus l'extensió `.sample`** i el fas executable:

**mv** .git/hooks/pre-commit.sample .git/hooks/pre-commit  
**chmod** \+x .git/hooks/pre-commit

A partir d'aquí, s'executarà automàticament cada vegada que facis `git commit`.

**Tipus de hooks: abans i després**

Hi ha dos grans grups: els **pre-** (s'executen abans de l'acció i la poden bloquejar) i els **post-** (s'executen després i només notifiquen).

Tots els hooks `pre-` permeten alterar l'acció que està a punt de passar. Els hooks `post-` s'usen únicament per a notificacions.

Els més habituals que trobaràs:

| Hook | Quan s'executa | Ús típic |
| ----- | ----- | ----- |
| `pre-commit` | Abans de guardar el commit | Comprovar format del codi, passar el linter |
| `commit-msg` | Quan escrius el missatge | Validar que el missatge segueix el format correcte |
| `pre-push` | Abans de pujar a GitHub | Executar els tests |
| `post-commit` | Just després del commit | Notificacions, generar documentació |
| `post-merge` | Després d'un merge | Actualitzar dependències (`npm install`) |

**El hook més important: `pre-commit`**

El script `pre-commit` s'executa cada vegada que fas `git commit`, abans que Git demani el missatge del commit o generi el commit. Pots usar-lo per inspeccionar el codi que estàs a punt de guardar. Si el script surt amb un codi d'error diferent de zero, tot el commit s'avorta.

Un exemple senzill de `pre-commit` que comprova que no hi ha errors d'ESLint:

**\#\!/bin/sh** Executa ESLint abans de cada commit  
**npx eslint .**

Si ESLint troba errors, el codi de sortida és diferent de 0 i Git cancel·la el commit automàticament

Si ESLint troba errors, el commit no es fa. Hauràs de corregir els errors primer. Aquesta és la gràcia: **és impossible fer un commit amb codi mal formatat**.

**Husky: la manera fàcil de gestionar hooks amb Node.js**

El problema dels hooks natius de Git és que **no es pugen a GitHub** (la carpeta `.git` és local). Si un company clona el repositori, no tindrà els teus hooks. La solució per a projectes JavaScript és **Husky**, una eina que gestiona els hooks i els guarda al projecte perquè tothom els tingui.

**npm install \--save-dev husky** instal·la Husky  
**npx husky init** configura Husky al projecte

Husky crea una carpeta `.husky/` al repositori (aquesta sí que va a Git) amb els scripts dels hooks. Un exemple de `.husky/pre-commit`:

\#\!/bin/sh  
npx eslint .  
npx prettier \--check .

Ara quan qualsevol membre de l'equip cloni el projecte i instal·li les dependències amb `npm install`, tindrà automàticament els mateixos hooks que tu.

**lint-staged: no revisar tot el codi cada vegada**

Executar ESLint sobre **tots** els fitxers del projecte en cada commit pot ser molt lent. La solució és **lint-staged**: una eina que executa els checks únicament sobre els fitxers que has modificat i que estan preparats per al commit (*staged*).

npm install \--save-dev lint-staged

Configuració al `package.json`:

{  
  "lint-staged": {  
    "\*.js": \["eslint \--fix", "prettier \--write"\],  
    "\*.css": \["prettier \--write"\]  
  }  
}

I al hook de Husky simplement crideràs `lint-staged`:

\#\!/bin/sh  
npx lint-staged

Ara cada commit només revisa els fitxers que has tocat, no tot el projecte.

**Com saltar-se un hook (en casos excepcionals)**

De vegades necessites fer un commit ràpid sense passar per tots els checks (per exemple, un commit provisional mentre proves alguna cosa). Pots saltar-te els hooks amb el flag `--no-verify`:

git commit \-m "WIP: prova temporal" \--no-verify

Això saltarà tots els Git hooks que tinguis configurats al repositori. Usa-ho amb moderació i mai per pujar codi definitiu.

**Resum: per què usar hooks?**

Sense hooks, la qualitat del codi depèn de la memòria i la disciplina de cada persona. Amb hooks, les comprovacions passen **automàticament i sempre**, sense que ningú hagi de recordar-ho. El resultat és un repositori on és estructuralment impossible pujar codi sense format, amb errors de linting o sense passar els tests bàsics.

