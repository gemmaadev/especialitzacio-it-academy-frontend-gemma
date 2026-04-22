**Com s'integra el control de versions (Git) dins de l'entorn de VS Code?**

## **Git integrat a VS Code**

Git és el sistema de control de versions més usat al món: permet guardar l'historial de tots els canvis que fas al codi, col·laborar amb altres persones i revertir errors. VS Code incorpora Git de manera nativa, sense necessitat d'instal·lar cap extensió addicional. Pots fer pràcticament totes les operacions de Git des d'una interfície visual, sense escriure cap comanda al terminal.

Per accedir al panell de Git, cliques la icona que sembla una branca a la barra lateral esquerra, o prems Ctrl+Shift+G. Si tens canvis pendents, apareixerà un número a la icona indicant quants fitxers han canviat.

**El panell Source Control: veure els canvis**

El panell Source Control mostra els fitxers que estàs editant i el seu estat respecte a Git. L'estat apareix a la dreta del nom del fitxer: M per a modificat, D per a eliminat, U per a no rastreat (nou), i A per a afegit. Els fitxers s'agrupen en dues seccions: Changes per a fitxers modificats però no preparats, i Staged Changes per als fitxers que s'inclouran al proper commit.

Quan cliques sobre un fitxer modificat, VS Code obre el **diff editor**: una vista en dues columnes que mostra el que tenies abans (en vermell) i el que tens ara (en verd). Molt útil per revisar exactament quines línies has canviat abans de guardar.

**El flux bàsic: stage, commit, push**

El procés de guardar canvis a Git té tres passos, i VS Code facilita tots tres visualment.

**1\. Stage** (preparar): selecciones quins fitxers vols incloure al commit. Fas clic al \+ que apareix al costat de cada fitxer, o al botó "Stage All Changes" per afegir-los tots. Els fitxers passen de la secció "Changes" a "Staged Changes".

**2\. Commit** (guardar): escrius el missatge descriptiu al camp "Message" a la part superior del panell i cliques Commit. Els teus canvis queden guardats a l'historial local de Git.

**3\. Push** (pujar): el Push puja els teus commits locals al repositori remot perquè altres puguin accedir als teus canvis. Ho fas des del menú ... del panell o des de la barra d'estat inferior.

**Pull i Sync: rebre canvis de l'equip**

El Pull descarrega els commits del remot i els fusiona a la teva branca actual. El Sync combina les operacions de pull i push: primer baixa els canvis del remot i després puja els teus commits locals.

A la barra d'estat inferior de VS Code sempre veus el nom de la branca actual i els indicadors de quants commits tens per pujar i quants per baixar. Clicar aquí fa el Sync directament.

**Branques: treballar en paral·lel**

Per crear una nova branca, clica el nom de la branca actual a la barra d'estat, selecciona "Create New Branch" i introdueix un nom. Per canviar de branca, clica el nom i selecciona'n una altra de la llista.

Les branques permeten treballar en una nova funcionalitat sense afectar el codi principal. Un cop acabada la feina, es fusiona (*merge*) la branca amb la principal.

**Conflictes de fusió: quan dos canvis xoquen**

Quan dues persones modifiquen la mateixa línia de codi, Git no sap quin canvi és el correcte i genera un conflicte. Quan sorgeix un conflicte de fusió, les seccions en conflicte dels fitxers s'il·luminen a l'editor amb opcions clares: "Accept Current Change" per quedar-te els teus canvis, "Accept Incoming Change" per agafar els canvis de l'altra branca, "Accept Both Changes" per fusionar-los, i "Compare Changes" per veure un diff i decidir.

Un cop resolts tots els conflictes, guardes el fitxer, el fas stage i fas commit per completar la fusió.

**La barra d'estat: informació sempre visible**

A la part inferior de VS Code, la barra d'estat mostra en tot moment el nom de la branca on ets i els indicadors de commits pendents. És el lloc on veuràs d'un cop d'ull si tens canvis per pujar o baixar, i des d'on pots canviar de branca ràpidament sense obrir el panell complet.

**Resum de les accions principals**

| Acció | On es fa a VS Code |
| ----- | ----- |
| Veure canvis | Panell Source Control (Ctrl+Shift+G) |
| Stage de fitxers | Botó \+ al costat del fitxer |
| Commit | Camp de text \+ botó Commit |
| Push | Menú ... → Push, o barra d'estat |
| Pull | Menú ... → Pull, o barra d'estat |
| Crear branca | Clic al nom de branca → Create New Branch |
| Canviar branca | Clic al nom de branca → seleccionar |
| Resoldre conflictes | Editor de conflictes integrat |

