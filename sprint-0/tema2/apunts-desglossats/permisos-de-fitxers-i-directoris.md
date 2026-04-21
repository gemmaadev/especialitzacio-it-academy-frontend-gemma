**Permisos de fitxers i directoris: chmod, chown, notació octal (755, 644).**

## **Permisos de fitxers: qui pot fer què?**

Linux és un sistema multi-usuari, és a dir, diverses persones poden usar el mateix ordinador o servidor. Per controlar qui pot accedir a cada fitxer, Linux assigna **permisos** a cada fitxer i directori. Cada fitxer té tres conjunts de permisos: per al propietari (*owner*), per al grup (*group*) i per a tots els altres (*others*).

Cada conjunt té tres tipus d'accions possibles:

* **r** (*read*) — llegir el contingut  
* **w** (*write*) — modificar o esborrar  
* **x** (*execute*) — executar-lo com a programa (o, en el cas d'una carpeta, entrar-hi)

**Com es llegeix la notació `rwxr-xr-x`**

Quan fas `ls -l` al terminal, veus una línia com aquesta:

\-rwxr-xr-x  anna  staff  deploy.sh

El primer caràcter indica el tipus: `-` significa fitxer normal, `d` significa directori, `l` significa enllaç simbòlic. Després venen tres grups de tres lletres: el primer per al propietari, el segon per al grup, i el tercer per a tots els altres.

Llegint l'exemple de dalt:

* `rwx` → el propietari pot llegir, escriure i executar  
* `r-x` → el grup pot llegir i executar, però NO escriure  
* `r-x` → els altres, igual que el grup

Un guió `-` on hauria d'haver una lletra significa que aquell permís **no** està concedit.

**La notació octal: els números 755, 644...**

En lloc d'escriure `rwxr-xr-x`, es pot resumir tot amb tres números. Cada conjunt de permisos és la suma dels seus valors: lectura \= 4, escriptura \= 2, execució \= 1\. Sumes els que vols activar:

* `rwx` \= 4+2+1 \= **7**  
* `r-x` \= 4+0+1 \= **5**  
* `r--` \= 4+0+0 \= **4**  
* `---` \= 0+0+0 \= **0**

Amb tres xifres representes els tres grups (propietari, grup, altres). Per exemple, **755** vol dir: propietari té 7 (tot), grup té 5 (llegir+executar), altres té 5 (llegir+executar).

**Els dos valors més comuns: 755 i 644**

**755** significa que tu (el propietari) pots fer qualsevol cosa amb el fitxer o directori, i els altres usuaris poden llegir-lo i executar-lo però no modificar-lo. És adequat per a programes i directoris que vols fer públicament accessibles.

**644** significa que tu pots llegir i escriure el fitxer, i els altres usuaris només poden llegir-lo. És adequat per a fitxers de text públics. És el valor estàndard per a la majoria de fitxers HTML, CSS i de configuració.

chmod 755 la-meva-carpeta/    \# carpetes i scripts executables  
chmod 644 index.html          \# fitxers normals (HTML, CSS, txt...)

**`chmod`: canviar els permisos**

`chmod` (*change mode*) és l'ordre per modificar els permisos d'un fitxer o carpeta. Per establir permisos usant la notació numèrica, s'usa `chmod` seguit del valor i el nom del fitxer. Per exemple, `chmod 755 fitxer` estableix els permisos a `rwxr-xr-x`.

També pots usar la notació simbòlica, que és més llegible quan vols fer un canvi puntual:

chmod u+x script.sh       \# afegeix execució al propietari (u \= user)  
chmod g-w fitxer.txt      \# treu escriptura al grup (g \= group)  
chmod o-rwx secret.txt    \# treu tots els permisos als altres (o \= others)  
chmod a+r readme.md       \# afegeix lectura a tothom (a \= all)

Si vols aplicar el canvi a una carpeta i **tot el seu contingut**, uses `-R` (recursiu):

chmod \-R 755 projecte/

**`chown`: canviar el propietari**

`chown` (*change owner*) serveix per canviar qui és el propietari d'un fitxer. `chown sam fitxer.txt` canvia el propietari a `sam`. `chown sam:staff fitxer.txt` canvia el propietari a `sam` i el grup a `staff`. Amb `:staff` sense nom d'usuari, només es canvia el grup.

chown anna fitxer.txt            \# canvia el propietari  
chown anna:developers carpeta/   \# canvia propietari i grup  
chown \-R anna:staff projecte/    \# canvia tot recursivament

Normalment necessites `sudo` per executar `chown`, ja que canviar propietaris és una operació privilegiada.

**Resum visual ràpid**

| Valor | Significat | Ús típic |
| ----- | ----- | ----- |
| `755` | Propietari: tot / Grup+Altres: llegir+executar | Carpetes, scripts |
| `644` | Propietari: llegir+escriure / Grup+Altres: llegir | Fitxers HTML, CSS, text |
| `600` | Propietari: llegir+escriure / Ningú més | Fitxers privats, claus SSH |
| `700` | Propietari: tot / Ningú més | Carpetes privades |

El valor **777** (tothom pot fer tot) apareix en tutorials com a solució ràpida, però és peresós i sovint insegur. Si et trobes usant-lo, atura't i busca quina és la propietat i el grup correctes.

