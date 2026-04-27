## **Frames, Auto Layout, Components i Variants a Figma**

**Frames: el contenidor de tot**

Un frame a Figma és el contenidor bàsic on viu el disseny. A diferència d'un grup simple, un frame té propietats pròpies: mida, fons, corners arrodonits, overflow i molt més. Pensa en un frame com l'equivalent d'un `<div>` en HTML: tot a Figma viu dins d'un frame.

Els frames s'usen per a moltes coses: per representar una pantalla sencera (una pàgina mòbil o de desktop), per crear seccions d'una interfície, o com a contenidor d'un component. En Figma, els frames són la base de l'Auto Layout. Un frame estàndard té posicionament fix per als seus fills. Un frame amb Auto Layout, en canvi, actua com un contenidor intel·ligent on els fills s'organitzen automàticament seguint regles de layout.

Es crea un frame prement `F` o seleccionant l'eina de frame a la barra d'eines, i escolles la mida directament al canvas o seleccionant un preset de dispositiu (iPhone, iPad, Desktop...).

**Auto Layout: el flexbox de Figma**

Auto Layout ajuda a organitzar, disposar i espaiar els elements de disseny de manera que s'ajustin automàticament a mesura que fas canvis, estalviant-te temps i fent els teus dissenys responsius i adaptables.

Auto Layout és una propietat de Figma que permet als frames redimensionar-se i reposicionar automàticament els seus continguts basant-se en regles definides. Pensa-hi com un CSS flexbox traduït a una interfície visual. Defineixes l'espaiat, l'alineació i la direcció, i Figma s'ocupa dels càlculs a mesura que el contingut canvia.

**Com activar-lo:** selecciona un frame o un grup d'elements i prem `Shift + A`, o clica el `+` al costat d'"Auto layout" al panell dret.

Les propietats principals que pots controlar:

**Direcció** — horitzontal (els elements s'ordenen en fila) o vertical (els elements s'ordenen en columna). Equivalent a `flex-direction` en CSS.

**Padding** — l'espai interior entre el contenidor i els seus fills. Pots controlar els quatre costats independentment.

**Gap** — l'espai entre els elements fills. Equivalent a `gap` en CSS Flexbox.

**Alineació** — com s'alineen els fills dins del contenidor: a l'esquerra, al centre, a la dreta, al top, al centre vertical o al fons.

**Comportament de redimensionament** — aquí és on viu la màgia:

Un frame pare pot tenir una amplada o alçada fixa (Fixed), o pot estar configurat per "abraçar" (Hug) els seus fills de manera que creixi o s'encongeixi a mesura que aquests canvien. L'amplada o alçada d'un element fill pot ser Fixed, pot estar configurada per omplir (Fill) el frame pare, o si conté els seus propis fills, pot estar configurada per Hug.

Un exemple pràctic: un botó ben fet amb Auto Layout té el text com a fill i el frame del botó en mode "Hug contents". Si canvies el text de "Enviar" a "Enviar formulari de contacte", el botó s'eixampla automàticament sense que hagis de redimensionar res manualment.

Pots combinar diferents opcions de redimensionament per personalitzar com es comporta un element. Per exemple, imagina una notificació d'app. Per assegurar-te que el frame de la notificació manté una amplada consistent mentre acomoda un missatge més llarg, pots configurar l'amplada com a Fixed i l'alçada com a Hug contents.

**Nesting d'Auto Layout: crear layouts complexos**

El veritable poder de la responsivitat de l'Auto Layout emergeix quan es combinen comportaments de redimensionament entre frames d'Auto Layout niuats. El niuament permet col·locar una capa dins d'una altra, com posar un botó dins d'un component, o una forma dins d'un frame. Niuar un frame d'Auto Layout dins d'un altre permet combinar opcions horitzontals, verticals i de graella per crear interfícies complexes.

Un exemple real: una llista de notificacions. El frame exterior és un Auto Layout vertical (les notificacions s'apilen en columna). Cada notificació és un Auto Layout horitzontal (icona \+ text en fila). Si afegeixes una notificació nova, la llista creix automàticament. Si el text d'una notificació és molt llarg, s'adapta sense trencar el layout.

**Components: build once, use everywhere**

Els components solucionen un problema: eliminar la duplicació manual. Quan necessites actualitzar alguna cosa, la actualitzes una vegada, i totes les instàncies s'actualitzen automàticament.

**Component principal (Main Component)** — l'element mestre. Quan edites el component principal, tots els seus usos arreu del projecte s'actualitzen automàticament. Es representa amb un rombe de quatre punts a la cantonada.

**Instàncies (Instances)** — les còpies del component principal que uses a les teves pantalles. Es poden fer overrides locals (canviar el text, les icones) sense afectar el component principal ni les altres instàncies.

Per crear un component: selecciona els elements que vols convertir i prem `Ctrl+Alt+K` (Windows) o `Cmd+Option+K` (Mac).

La distinció crítica que molts dissenyadors no capten: no tot hauria de ser un component. Si alguna cosa s'usa una sola vegada, és un frame. Si s'usa dues vegades però canvia dràsticament entre usos, pot seguir sent un frame. Els components són per a coses que es repeteixen amb variacions menors.

La convenció de noms usa barres inclinades per crear jerarquia: `Button/Primary/Default`, `Button/Primary/Hover`, `Button/Secondary/Default`. Això crea una estructura d'arbre al panell d'assets que facilita trobar el component correcte ràpidament.

**Variants: tots els estats d'un component en un sol lloc**

A mesura que crees components i construeixes el teu sistema de disseny, trobaràs la necessitat de components similars entre ells, amb només lleugeres diferències. Per exemple: podries tenir múltiples components per a botons, amb components separats per a diversos estats i mides, i modes clar i fosc. Les variants permeten agrupar i organitzar components similars en un sol contenidor. Això simplifica la biblioteca de components i facilita a tothom trobar el que necessita.

Les propietats de variant i els seus valors permeten definir els atributs de les teves variants. Per exemple: les propietats d'un component botó podrien ser la mida, l'estat o el color. Els valors són les diferents opcions disponibles per a cada propietat. Per exemple: la propietat d'estat podria tenir els valors default, hover, pressed i disabled.

Un exemple complet d'un sistema de variants per a un botó:

Propietat: Mida → Small / Medium / Large  
Propietat: Estat → Default / Hover / Pressed / Disabled  
Propietat: Tipus → Primary / Secondary / Ghost

Combinant les tres propietats s'obtenen totes les possibles versions del botó organitzades en un sol component set. Quan uses el botó a una pantalla, simplement selecciones la combinació de propietats que necessites des del panell dret.

**Com s'encaixen tots quatre conceptes**

Auto Layout deixa que els elements s'apilonin dins de frames que es comporten com a contenidors flexibles. Pots controlar la direcció, el padding, l'espaiat, l'alineació i el corner radius sense capes addicionals. A mesura que els components es redimensionen, els seus continguts s'adapten automàticament.

El flux de treball professional a Figma segueix aquesta seqüència: primer crees els **frames** com a contenidors bàsics, apliques **Auto Layout** per fer-los responsius, converteixes els elements repetibles en **Components** per poder reutilitzar-los, i defineixes les **Variants** per gestionar tots els estats i versions de cada component en un sol lloc.

**Resum pràctic**

| Concepte | Per a què serveix | Drecera |
| ----- | ----- | ----- |
| **Frame** | Contenidor de disseny amb propietats pròpies | `F` |
| **Auto Layout** | Fa que el frame s'adapti automàticament al contingut | `Shift + A` |
| **Component** | Element reutilitzable: edita'l una vegada, s'actualitza a tot arreu | `Cmd+Option+K` |
| **Variants** | Agrupa tots els estats d'un component en un sol lloc | Via menú o panell |
| **Instància** | Còpia d'un component que pots personalitzar localment | Arrossegar des d'Assets |

