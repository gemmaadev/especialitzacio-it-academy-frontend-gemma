## **Autoavaluació dels coneixements \- S0 Tema 1**

**Per què és important l'accessibilitat web?** 

L'accessibilitat és fonamental perquè garanteix que qualsevol persona, independentment de les seves capacitats físiques o cognitives, pugui navegar i consumir contingut a la xarxa sense barreres. Més enllà del compromís ètic i legal (normatives WCAG), una web accessible millora significativament l'experiència d'usuari per a tothom, facilita la indexació en els cercadors (millor SEO) i amplia l'abast de l'audiència a col·lectius que utilitzen tecnologies d'assistència com lectors de pantalla.

**Quins components formen part de l'arquitectura d'un navegador web?** 

La interfície d'usuari (elements visibles com la barra d'adreces), el motor de navegació (que comunica la interfície amb el motor de renderització) i el motor de renderització, encarregat de dibuixar l'HTML i CSS. També inclou l'intèrpret de JavaScript (com el motor V8), subsistemes de xarxa per gestionar les peticions HTTP, i una capa d'emmagatzematge de dades per a la memòria cau i la persistència local.

**Quines són les diferències entre front-end i back-end?** 

El front-end és la part visual i interactiva que s'executa en el navegador del client utilitzant HTML, CSS i JavaScript. En canvi, el back-end és la lògica interna que corre al servidor, gestionant bases de dades, la seguretat i el processament de la informació. Mentre el front-end se centra en l'experiència de l'usuari (UI/UX), el back-end garanteix que les dades es gestionin i s'enviïn correctament al client.

**Quins elements es poden controlar amb HTTP?** 

A través del protocol HTTP es poden controlar diversos aspectes de la comunicació web mitjançant les capçaleres (headers). Això inclou la gestió de la memòria cau (cache) per optimitzar la velocitat, el control d'autenticació per a zones restringides, i la negociació de contingut (com el format o l'idioma). També permet gestionar la seguretat mitjançant polítiques de CORS o redireccions segures (HTTPS), així com el manteniment d'estats d'usuari a través de l'enviament de cookies.

**Quins tipus d'emmagatzematge local suporta un navegador modern?** 

El LocalStorage, per guardar dades de forma permanent sense caducitat; el SessionStorage, que manté la informació només mentre la pestanya està oberta; i les Cookies, per a dades petites que s'han d'enviar al servidor. Per a volums de dades més grans o aplicacions PWA, s'utilitza IndexedDB (una base de dades estructurada) i la Cache API, que permet guardar fitxers complets per al seu ús sense connexió.

