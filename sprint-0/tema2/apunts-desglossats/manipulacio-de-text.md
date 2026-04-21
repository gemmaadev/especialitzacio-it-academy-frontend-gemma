**Manipulació de text: redirecció (\>, \>\>, pipes |), editors de terminal com nano o vim (bàsics).**

## **Com funciona la sortida d'una comanda**

Quan executes qualsevol comanda al terminal, el resultat s'envia per defecte a la pantalla. Tot programa té tres canals: STDIN (entrada estàndard, el que li arriba), STDOUT (sortida estàndard, el que imprimeix) i STDERR (sortida d'errors). La redirecció i les pipes et permeten controlar on va o d'on ve la informació d'aquests canals, en comptes d'acceptar sempre el comportament per defecte.

**Redirecció de sortida: `>` i `>>`**

L'operador `>` indica a la línia de comandes que volem que la sortida del programa es guardi en un fitxer en comptes d'imprimir-se a la pantalla.

ls \> llista.txt        \# guarda el resultat de ls al fitxer  
echo "hola" \> nota.txt \# escriu "hola" al fitxer

Atenció: si el fitxer no existeix, l'operador `>` el crea; si ja existeix, sobreescriu tot el contingut.

Per afegir contingut sense esborrar el que ja hi ha, s'usa `>>`:

L'operador `>>` afegeix la sortida al final del fitxer en lloc de substituir-ne el contingut.

echo "primera línia" \> notes.txt   \# crea el fitxer  
echo "segona línia" \>\> notes.txt   \# afegeix al final, no esborra

**El pipe `|`: encadenar comandes**

El pipe (la barra vertical `|`) és una de les idees més potents del terminal. Connecta directament la sortida estàndard d'una comanda amb l'entrada estàndard de la següent, deixant que les dades flueixin entre elles.

La filosofia és senzilla: cada comanda fa una sola cosa bé, i les pots combinar per aconseguir resultats complexos:

ls | grep ".txt"           \# llista fitxers i filtra els .txt  
cat error.log | grep "404" \# mostra només les línies amb "404"  
ls | wc \-l                 \# compta quants fitxers hi ha

Pots encadenar tantes comandes com vulguis, sempre que cada una llegeixi de l'entrada estàndard i escrigui a la sortida estàndard.

**Nano: l'editor senzill per a principiants**

Nano és l'editor de text més senzill i adequat per a principiants. A diferència d'altres editors, mostra les dreceres més comunes a la part inferior de la pantalla, i no té modes: quan obres un fitxer, pots començar a escriure directament.

Per obrir o crear un fitxer:

nano nom-fitxer.txt

Les dreceres principals (la `^` vol dir tecla `Ctrl`):

| Drecera | Acció |
| ----- | ----- |
| `Ctrl + O` | Guardar el fitxer (*write Out*) |
| `Ctrl + X` | Sortir de nano |
| `Ctrl + K` | Tallar una línia |
| `Ctrl + U` | Enganxar el que has tallat |
| `Ctrl + W` | Cercar text |
| `Ctrl + G` | Ajuda |

El flux normal és: edites → `Ctrl+O` per guardar → `Enter` per confirmar el nom → `Ctrl+X` per sortir.

**Vim: l'editor potent (però diferent)**

Vim és un editor ràpid i molt eficient, però té una particularitat que desconcerta tothom al principi: els **modes**. Funciona separant les accions d'editar text de les de navegar i gestionar el fitxer.

Els dos modes principals que has de conèixer:

El **mode normal** (o *command mode*) és el mode per defecte quan obres Vim. Aquí les tecles no escriuen text sinó que executen comandes. El **mode inserció** és on pots escriure text normalment; s'activa prement `i`.

El flux bàsic per editar un fitxer amb Vim:

vim nom-fitxer.txt   \# obre el fitxer (estàs en mode normal)  
i                    \# entres al mode inserció, ara pots escriure  
\[escrius el text\]  
Esc                  \# tornes al mode normal  
:wq                  \# guardes (w \= write) i surts (q \= quit)

Si vols sortir sense guardar res: `:q!` (el `!` força la sortida descartant canvis).

Les comandes de Vim que necessites saber per sobreviure:

| Comanda | Acció |
| ----- | ----- |
| `i` | Entrar al mode inserció |
| `Esc` | Tornar al mode normal |
| `:w` | Guardar |
| `:q` | Sortir |
| `:wq` | Guardar i sortir |
| `:q!` | Sortir sense guardar |

**Quin editor he d'utilizar?**

Nano és més senzill i és una bona opció per fer canvis ràpids en fitxers de configuració. Vim és molt més potent i configurable, però requereix aprendre la seva lògica de modes. Fins i tot qui prefereix Vim sovint recorre a Nano quan necessita fer una modificació simple i ràpida.

La recomanació pràctica: comença amb **nano** per a les tasques del dia a dia. Aprèn **vim** progressivament, perquè és l'editor que trobaràs instal·lat a pràcticament qualsevol servidor Linux, i saber sortir-ne (`:q!`) ja és imprescindible.

