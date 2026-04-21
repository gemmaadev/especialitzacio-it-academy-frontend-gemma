**Variables d’entorn: PATH, ordres echo, export, fitxers de configuració (.bashrc, .profile).**

[https://dev.to/pizofreude/environment-variables-a-comprehensive-guide-34dg](https://dev.to/pizofreude/environment-variables-a-comprehensive-guide-34dg)   
Article complet sobre què són i com gestionar variables d'entorn.

[https://www3.ntu.edu.sg/home/ehchua/programming/howto/Environment\_Variables.html](https://www3.ntu.edu.sg/home/ehchua/programming/howto/Environment_Variables.html)  
Explicació sobre l'ús de variables d'entorn als principals sistemes operatius.

**Què és una variable d'entorn?**

Imagina una variable d'entorn com una nota adhesiva que el sistema operatiu guarda per a tots els programes. En Linux, les variables d'entorn són valors amb nom que el sistema manté i que les aplicacions llançades des del terminal poden llegir. Permeten personalitzar com funciona el sistema i el comportament dels programes: l'editor de text per defecte, la llengua del sistema, els directoris on buscar programes, etc.

Per veure el valor d'una variable, s'usa el símbol `$` davant del nom:

echo $HOME      \# mostra la teva carpeta personal  
echo $USER      \# mostra el teu nom d'usuari  
echo $SHELL     \# mostra quin intèrpret de comandes uses

Per llistar totes les variables d'entorn actives:

env             \# mostra totes les variables d'entorn

**Variables locals vs. variables d'entorn**

Aquí hi ha una distinció important que confon molta gent al principi. Hi ha dos tipus principals: les variables de shell (locals) i les variables d'entorn (globals). Les variables locals existeixen únicament a la sessió actual, mentre que les variables d'entorn s'exportan als processos fills i poden ser usades per programes i scripts.

NOM="anna"          \# variable local, només visible aquí  
export NOM="anna"   \# variable d'entorn, visible pels fills

Si crees una variable local i executes un script, aquell script no la veurà. Si la exportes amb `export`, sí que la veurà. La diferència és subtil però important quan escrius scripts.

**La variable `PATH`: on busca les comandes el sistema**

`PATH` és la variable d'entorn més important que has de conèixer. Quan escrius una comanda al terminal, el shell primer comprova si és una comanda interna. Si no ho és, busca un executable amb aquell nom a cadascun dels directoris llistats al `PATH`, en ordre, i executa el primer que troba. Si no troba res, retorna l'error `command not found`.

echo $PATH  
\# /usr/local/bin:/usr/bin:/bin:/usr/local/sbin

La variable `PATH` defineix el camí de cerca per executar comandes. Els diferents camins estan separats per dos punts (`:`). Quan instal·les un programa nou i el terminal diu que no el troba, normalment és perquè la seva carpeta no és al `PATH`.

Per afegir un directori al `PATH` temporalment (dura fins que tanques el terminal):

export PATH=$PATH:/home/anna/scripts

La part `$PATH` al principi significa "manté tot el que ja hi havia" i afegeix el nou directori al final. Mai escriguis `PATH=/nova/ruta` sense el `$PATH` o trencaràs tots els altres camins i el terminal deixarà de funcionar.

**`export`: crear i compartir variables**

`export` és la comanda que converteix una variable de shell en una variable d'entorn, fent-la accessible als processos fills llançats des d'aquell shell.

export EDITOR="nano"         \# defineix l'editor per defecte  
export JAVA\_HOME="/usr/lib/jvm/java-17"   \# ruta a Java  
export PATH=$PATH:$JAVA\_HOME/bin          \# afegeix Java al PATH

Les variables d'entorn creades d'aquesta manera només estan disponibles a la sessió actual. Si obres un terminal nou o tanques la sessió, es perden. Per fer-les permanents, cal escriure-les als fitxers de configuració.

**Els fitxers de configuració: `.bashrc` i `.profile`**

Per evitar de redefinir les variables cada vegada que obres el terminal, Linux llegeix automàticament uns fitxers especials quan s'inicia. `.bashrc` s'executa per a les shells interactives no-login (quan obres una finestra de terminal nova). `.profile` (o `.bash_profile`) s'executa per a les shells de login (quan entres via consola o SSH).

Ambdós fitxers es troben a la carpeta personal de l'usuari (`~`). Per editar-los:

nano \~/.bashrc

Un exemple de com queda un `.bashrc` típic amb personalitzacions:

\# Afegir una carpeta personal de scripts al PATH  
export PATH=$PATH:$HOME/bin

\# Definir l'editor per defecte  
export EDITOR="nano"

\# Alies útils (dreceres de comandes)  
alias ll="ls \-la"  
alias gs="git status"

Després d'editar el fitxer, els canvis no s'apliquen fins que obres un terminal nou. Si vols aplicar-los immediatament sense reiniciar, uses `source`:

source \~/.bashrc    \# recarrega el fitxer a la sessió actual

**Resum: temporalitat vs. permanència**

| Mètode | Dura fins... | Afecta |
| ----- | ----- | ----- |
| `VARIABLE=valor` | Tanca el terminal | Només la sessió actual |
| `export VARIABLE=valor` | Tanca el terminal | La sessió i els seus processos fills |
| Editar `~/.bashrc` | Sempre (permanent) | El teu usuari, totes les sessions |
| Editar `/etc/environment` | Sempre (permanent) | Tots els usuaris del sistema |

La recomanació per a la majoria d'usuaris és editar `~/.bashrc` per a modificacions personals del `PATH` i altres variables. És la manera més segura i no interfereix amb la configuració del sistema.

