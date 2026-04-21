1. **Com funciona Internet?** 

**Internet** és una xarxa gegant d’ordinadors connectats entre si mitjançant cables o WiFi.  
Quan entres a una web, el teu **dispositiu envia una petició a un servidor a través del teu proveïdor d’Internet.**

Cada ordinador té una **“adreça” anomenada IP**, tot i que fem servir **noms** com google.com per no complicar-nos.

El **servidor rep la petició** i retorna la informació de la pàgina, i el navegador la interpreta i te la mostra en pantalla.

2. **Com funciona la web?** 

La **Web** és el que veus al **navegador** (pàgines, imatges, botons). Funciona perquè el navegador actua com a client i **demana coses a un servidor.**

Quan entres a una web, passa això: escrius una URL, el **navegador busca la IP real amb el DNS**, envia una **petició** i el **servidor li retorna arxius** (HTML, CSS, JS).

Aquests arxius **viatgen per Internet en petits “paquets”** fins al teu ordinador, on el navegador els reconstrueix com una pàgina.

Internet és la infraestructura (xarxa de xarxes), però la Web és només un dels serveis que funcionen a sobre.

3. **Front end vs Back end vs Full-stack**

El **frontend** és el que veus i utilitzes (botons, textos, disseny), és a dir, la part visual de la web.

El **backend** és el que no veus: guarda dades, processa informació i fa que tot funcioni al servidor.

El **full-stack** és la persona que sap fer les dues coses: frontend \+ backend.

4. **Protocol HTTP/HTTPS: peticions, respostes, codis d'estat**

El **HTTP** és el “**idioma**” que fan servir el navegador i el servidor per comunicar-se; **HTTPS** és el mateix però amb **xifrat (segur).**

Quan entres a una web, el **navegador envia una petició (request)** demanant informació. El **servidor respon amb una resposta (response)** amb el contingut o un missatge.

A la resposta hi ha un **codi d’estat** que diu què ha passat:

* 200 → tot OK  
* 404 → no trobat  
* 500 → error del servidor

Navegador demana → servidor respon → codi diu si ha anat bé o malament.

5. **Tipus d'aplicacions web: estàtiques vs dinàmiques, SPAs**  

Les webs **estàtiques** mostren sempre el mateix contingut. Per exemple, una landing d’empresa o un portfoli senzill (sempre igual per a tothom).

Les webs **dinàmiques** canvien segons l’usuari. Per exemple, Facebook o Amazon, on veus contingut diferent segons qui ets o què fas.

Les **SPA** no recarreguen la pàgina. Per exemple, Gmail, on tot canvia sense refrescar.

Una **PWA (Progressive Web App)** és una web que funciona gairebé com una app mòbil, la pots instal·lar, pot funcionar sense Internet i és més ràpida (Pinterest).

6. **Rol dels navegadors web: motor de renderització, compatibilitat amb estàndards (HTML/CSS/JS).**

El navegador és el que agafa el codi (HTML, CSS, JS) i el converteix en una **web que pots veure i tocar.**

Això h**o fa amb el motor de renderització**: llegeix el codi, el transforma en una estructura i “pinta” la pàgina a la pantalla.

Els **estàndards (HTML, CSS, JavaScript)** són com unes normes perquè totes les webs funcionin igual a tots els navegadors.

El **navegador s’encarrega de interpretar aquests estàndards correctament** perquè la web es vegi bé a Chrome, Safari, etc.

7. **Conceptes bàsics de responsivitat, accessibilitat (WCAG) i SEO.**

La **responsivitat** és que una web s’adapta a qualsevol pantalla (mòbil, tablet, ordinador) sense trencar-se ni perdre usabilitat.

**L’accessibilitat (WCAG)** és que la web la pugui utilitzar tothom, incloses persones amb discapacitats (lectors de pantalla, contrast correcte, navegació amb teclat).

El **SEO** és fer que la web aparegui més amunt a Google perquè estigui ben estructurada, tingui bon contingut i sigui fàcil d’entendre pels cercadors.

8. **Terminologia comuna: DOM, API, CMS, framework vs llibreria**

El **DOM (Document Object Model)** és com el navegador “veu” una pàgina: una estructura en forma d’arbre on cada element (text, botó, imatge) es pot modificar amb JavaScript.

Una **API** és un pont que permet que dues coses es comuniquin (per exemple, una web demanant dades a un servidor).

Un **CMS** és una eina per crear webs sense programar gaire, com WordPress.

Un **framework** és una estructura base que t’obliga a seguir unes regles per desenvolupar (ex: React en molts projectes).

Una **llibreria** és un conjunt de funcions que tu fas servir quan vols, sense tanta estructura rígida (també React es considera sovint en aquest punt depenent del context).

9. **Seguretat bàsica: HTTPS, Cross-Site Scripting (XSS), Cross-Origin Resource Sharing (CORS).**

**HTTPS** és la versió segura d’HTTP: xifra la informació perquè ningú la pugui llegir mentre viatja (com una conversa amb codi secret).

**XSS (Cross-Site Scripting)** és quan algú introdueix codi maliciós en una web per robar dades o manipular el que veus.

**CORS (Cross-Origin Resource Sharing)** és una regla de seguretat que controla quines webs poden demanar dades a altres webs, evitant accessos no autoritzats.

10. **Introducció als frameworks de client**

Un **framework de client** és un conjunt d’eines per construir la part visual d’una web (frontend) de manera més ordenada i eficient.

En lloc de programar-ho tot “a mà” amb HTML, CSS i JavaScript, el framework et dona una estructura ja preparada i s’encarrega d’actualitzar la pantalla quan canvien les dades.

Això evita haver de manipular el codi de la pàgina constantment i fa que projectes grans siguin més fàcils de gestionar.

Exemples típics són Angular o React.

