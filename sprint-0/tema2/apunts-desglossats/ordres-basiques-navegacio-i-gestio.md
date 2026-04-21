**Ordres bàsiques de navegació i gestió: ls, cd, pwd, mkdir, touch, cp, mv, rm, cat, grep**

[https://developer.mozilla.org/en-US/docs/Learn\_web\_development/Getting\_started/Environment\_setup/Command\_line](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)  
Curs ràpid de MDN per entendre i utilitzar la línia de comandes.

[https://cheatography.com/jonathan992/cheat-sheets/gnu-linux-command-spanish/](https://cheatography.com/jonathan992/cheat-sheets/gnu-linux-command-spanish/)  
Cheat sheet de ordres Linux \- Resum pràctic de comandes bàsiques per treballar a Linux.

**La línia de comandes: per què serveix?**

La línia de comandes (també anomenada terminal o shell) és una finestra on li dones instruccions a l'ordinador escrivint text. En lloc de fer clic amb el ratolí, escrius ordres. Al principi pot semblar intimidant, però és molt més potent i precisa que qualsevol interfície gràfica, i com a desenvolupador/a l'utilitzaràs constantment.

**Saber on ets: `pwd` i `ls`**

Abans de moure't, has de saber on ets. `pwd` imprimeix la ruta absoluta del directori de treball actual, és a dir, la carpeta on et trobes en aquell moment. Per exemple:

$ pwd  
/home/anna/projectes

Un cop saps on ets, voldràs veure el contingut. `ls` llista el contingut d'una carpeta, incloent fitxers i directoris. Simplement escriu `ls` i veuràs tot el que hi ha a la carpeta actual.

**Moure's per les carpetes: `cd`**

`cd` s'utilitza per canviar el directori de treball actual i permet navegar entre directoris. Funciona igual que les rutes relatives:

cd projectes          \# entra a la carpeta "projectes"  
cd ..                 \# puja un nivell (vas a la carpeta pare)  
cd \~/Documents        \# va directament a Documents des de qualsevol lloc  
cd                    \# sense res, torna directament a la carpeta de l'usuari

El símbol `~` és una drecera que representa sempre la teva carpeta personal.

**Crear carpetes i fitxers: `mkdir` i `touch`**

`mkdir` crea un nou directori dins del directori actual amb el nom que li indiques. Per exemple, `mkdir el-meu-projecte` crearà una nova carpeta anomenada `el-meu-projecte`.

`touch` crea un nou fitxer buit dins del directori actual. Per exemple, `touch index.html` crea un fitxer buit anomenat `index.html`. És útil per crear fitxers ràpidament sense obrir cap editor.

**Copiar i moure: `cp` i `mv`**

`cp` crea una còpia del fitxer en la ubicació que especifiques. Per exemple, `cp notes.txt notes-backup.txt` crea una còpia de `notes.txt` amb el nom `notes-backup.txt`.

`mv` mou un fitxer de la primera ubicació a la segona que indiques. Com que Linux no té una ordre específica per renombrar fitxers, també s'utilitza `mv` per canviar el nom d'un fitxer o carpeta. Si el destí és la mateixa carpeta però amb un nom diferent, simplement el renombra:

mv fitxer.txt fitxer-nou.txt       \# reanomena  
mv fitxer.txt ../altra-carpeta/    \# mou a una altra carpeta

**Esborrar: `rm`**

`rm` elimina el fitxer que especifiques. Per exemple, `rm notes.txt` esborra `notes.txt` de manera permanent. Aquí ve l'advertència més important que has de recordar: aquesta eliminació és permanent i no es pot desfer des de la paperera com faries amb la interfície gràfica.

Si vols esborrar una carpeta i tot el seu contingut, uses `rm -r nom-carpeta`. La `-r` vol dir *recursiu* (esborra tot el que hi ha dins). Usa-ho amb molta precaució.

**Veure el contingut d'un fitxer: `cat`**

`cat` mostra el contingut d'un fitxer i pot combinar múltiples fitxers. Simplement escriu `cat nom-fitxer.txt` i veuràs el text del fitxer directament al terminal. És perfecte per fitxers curts; si el fitxer és molt llarg, el text passarà ràpidament per la pantalla.

**Buscar dins de fitxers: `grep`**

`grep` és una de les ordres més potents per a un desenvolupador. S'utilitza per cercar patrons de text i filtrar resultats. La sintaxi bàsica és:

grep "paraula" fitxer.txt

Això mostrarà totes les línies del fitxer que continguin "paraula". També pots combinar-lo amb altres comandes usant el símbol `|` (pipe). Per exemple, pots usar `cat fitxer.txt | grep "error"` per buscar la paraula "error" dins del contingut d'un fitxer. Aquesta combinació d'ordres encadenades és molt habitual al terminal.

**Taula de resum**

| Ordre | Fa... | Exemple |
| ----- | ----- | ----- |
| `pwd` | On estic? | `pwd` |
| `ls` | Llistat de la carpeta | `ls` |
| `cd` | Canvia de carpeta | `cd projectes` |
| `mkdir` | Crea una carpeta | `mkdir src` |
| `touch` | Crea un fitxer buit | `touch index.html` |
| `cp` | Copia un fitxer | `cp a.txt b.txt` |
| `mv` | Mou o renombra | `mv a.txt nou-nom.txt` |
| `rm` | Esborra (permanent\!) | `rm fitxer.txt` |
| `cat` | Mostra contingut | `cat notes.txt` |
| `grep` | Cerca text | `grep "error" log.txt` |

