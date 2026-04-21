**Estructura del sistema de fitxers Linux: directoris arrel (/), rutes absolutes i relatives**

[https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Dealing_with_files](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Dealing_with_files)  
Guia de MDN sobre la gestió de fitxers en entorns de desenvolupament.

### **El sistema de fitxers: com s'organitzen els arxius**

Imagina el sistema de fitxers com un arbre capgirat. A dalt de tot hi ha l'arrel, i d'allà pengen totes les carpetes i arxius del sistema. En Linux, aquest punt d'origen s'escriu com `/` (una barra inclinada cap endavant) i rep el nom de **directori arrel** o _root_. Tot l'ordinador, des dels programes fins als teus documents, viu dins d'aquest arbre.

Dins del directori arrel existeixen carpetes amb noms estàndard que sempre trobaràs en qualsevol sistema Linux: `/home` (on estan les carpetes personals dels usuaris), `/etc` (configuració del sistema), `/var` (dades variables com logs), etc. No cal memoritzar-les totes ara, però saber que existeix aquesta estructura t'ajuda a no perdre't.

**Rutes absolutes: la direcció completa**

Una **ruta absoluta** és com l'adreça postal completa d'un arxiu. Comença sempre des de `/` i descriu el camí exacte per arribar-hi, sense importar on et trobes en aquest moment. Per exemple:

`/home/anna/projectes/web/index.html`

Això vol dir: des de l'arrel (`/`), entra a `home`, després a `anna`, després a `projectes`, després a `web`, i allà trobaràs `index.html`. Sempre funciona igual, des de qualsevol lloc.

**Rutes relatives: el camí des d'on ets tu**

Una **ruta relativa** no comença des de l'arrel, sinó des de la carpeta on et trobes en aquell moment (anomenada _directori de treball actual_). Són més curtes i molt útils quan treballes dins d'un projecte.

Per referenciar un arxiu dins d'una subcarpeta, s'escriu el nom de la carpeta davant, seguit d'una barra: `subcarpeta/imatge.jpg`. Si l'arxiu és a la mateixa carpeta que tu, simplement escrius el nom directament: `imatge.jpg`.

Si necessites pujar un nivell (anar a la carpeta pare), s'utilitzen dos punts: `../`. Per exemple, si `index.html` és dins d'una subcarpeta i `imatge.png` és a la carpeta de sobre, la referiràs com `../imatge.png`. Pots combinar-ho tantes vegades com calgui: `../../altra-carpeta/arxiu.txt`.

**Estructura recomanada d'un projecte web**

Un lloc web típic conté un arxiu `index.html` (la pàgina principal), una carpeta `images` per a les imatges, una carpeta `styles` per als arxius CSS, i una carpeta `scripts` per al JavaScript. Mantenir aquesta estructura des del principi t'estalviarà molts problemes.

Cada projecte hauria de tenir la seva pròpia carpeta principal, anomenada **directori arrel del projecte** (_root directory_). Quan pujes el lloc a un servidor, el navegador buscarà els arxius des d'aquesta carpeta arrel.

**Bones pràctiques amb noms d'arxius**

És recomanable escriure els noms de carpetes i arxius en minúscules, sense espais, i separant les paraules amb guions: per exemple `el-meu-arxiu.html` en lloc de `el meu arxiu.html`. Això evita problemes de compatibilitat entre sistemes operatius i servidors.

Una nota important: el sistema de fitxers de Windows utilitza barres cap enrere (`\`), però en HTML i en entorns web sempre s'han d'usar barres cap endavant (`/`), fins i tot si desenvolupes des de Windows.
