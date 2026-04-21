**Gestió de processos: ordres ps, kill, top, execució en segon pla (&, Ctrl+Z).**

## **Què és un procés?**

Cada vegada que executes una comanda, obres un programa o poses en marxa un servei, Linux crea un **procés**: una instància del programa en execució. Tot el que s'executa a l'ordinador és un procés: comandes simples, serveis, scripts en segon pla... absolutament tot. Cada procés té un identificador únic anomenat **PID** (*Process ID*), que és el número que uses per referir-t'hi des del terminal.

**`ps`: veure els processos en execució**

`ps` mostra una instantània de tots els programes i tasques que s'estan executant en aquell moment. És com una fotografia del sistema: no s'actualitza en temps real.

La forma més habitual d'usar-lo és `ps aux`, que mostra tots els processos del sistema amb detall:

ps aux

La sortida té diverses columnes. Les més importants:

| Columna | Significat |
| ----- | ----- |
| `PID` | Identificador únic del procés |
| `%CPU` | Percentatge de CPU que usa |
| `%MEM` | Percentatge de memòria que usa |
| `STAT` | Estat actual del procés |
| `COMMAND` | La comanda que va iniciar el procés |

La columna `STAT` indica l'estat del procés: `R` vol dir que s'està executant (*running*), `S` que està en repòs esperant alguna cosa (*sleeping*), `T` que està aturat (*stopped*), i `Z` que és un procés zombi que ha acabat però el sistema encara no ha alliberat.

Per buscar un procés concret, pots combinar `ps` amb `grep`:

ps aux | grep firefox    \# troba tots els processos de Firefox

**`top`: monitoratge en temps real**

Mentre `ps` fa una foto estàtica, `top` ofereix una vista contínuament actualitzada dels processos del sistema, ordenats per ús de CPU. És com el gestor de tasques visual de Linux, però al terminal.

top

Un cop dins, pots usar dreceres de teclat per interactuar:

| Tecla | Acció dins de `top` |
| ----- | ----- |
| `M` | Ordenar per ús de memòria |
| `P` | Ordenar per ús de CPU |
| `k` | Matar un procés (demana el PID) |
| `q` | Sortir de `top` |

**`kill`: aturar un procés**

`kill` envia "senyals" als processos per indicar-los el que han de fer. Per defecte, envia un senyal de terminació (TERM), que demana al procés que es tanqui de manera ordenada, com si li demanessis educadament que s'aturés.

kill 1234        \# demana al procés 1234 que es tanqui ordenadament  
kill \-9 1234     \# força el tancament immediat (últim recurs)

L'enfocament recomanat és intentar primer el SIGTERM (l'opció per defecte). Esperar uns segons, i si el procés continua, llavors usar `kill -9`. El `-9` és el senyal SIGKILL, que el kernel executa directament i que el procés no pot ignorar ni evitar, però no li dona oportunitat de netejar res.

Per saber el PID d'un procés, pots usar `ps aux | grep nom` o directament `pgrep nom`:

pgrep firefox     \# retorna el PID de Firefox directament

**Processos en primer pla i en segon pla**

Normalment quan executes una comanda, ocupa el terminal fins que acaba: no pots escriure res més. Això s'anomena execució en **primer pla** (*foreground*). Un procés en segon pla (*background*) s'executa sense bloquejar el terminal, deixant-te continuar treballant.

**Iniciar una comanda en segon pla amb `&`:**

Afegint `&` al final d'una comanda, s'executa directament en segon pla:

python script.py &    \# s'executa sense bloquejar el terminal

El terminal et mostrarà el número de feina i el PID: `[1] 4521`. Pots seguir usant el terminal normalment mentre el procés s'executa.

**Suspendre un procés amb `Ctrl+Z`:**

`Ctrl+Z` envia un senyal de suspensió al procés que s'executa en primer pla, pausant-lo immediatament. Si tries pausar el procés, podràs veure'l amb `ps`, però el seu estat serà `T` (aturat).

Un cop suspès, tens dues opcions:

bg %1    \# reprèn el procés en segon pla (background)  
fg %1    \# torna el procés al primer pla (foreground)

I per veure tots els processos que tens actius o suspesos a la sessió actual:

jobs     \# llista les feines actives i suspeses

**Resum del flux habitual**

El cicle típic que usaràs sovint és:

\[executes una comanda llarga\]  
Ctrl+Z            → la pauses  
bg %1             → la repens en segon pla  
jobs              → comproves que segueix activa  
fg %1             → la tornes al primer pla quan vulguis

I si un programa es penja i no respon:

ps aux | grep nom    → trobes el PID  
kill PID             → demanesques que es tanqui  
kill \-9 PID          → forçes el tancament si no respon

