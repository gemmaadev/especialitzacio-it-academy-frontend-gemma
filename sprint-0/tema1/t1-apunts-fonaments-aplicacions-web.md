# **Apunts tema 1: Fonaments d'Aplicacions Web**

Pilars de com funciona la web moderna, des de l'arquitectura física fins a la lògica de programació i seguretat.

## **1\. Arquitectura client-servidor (com funciona web/internet)**

La web funciona mitjançant un model on les tasques es reparteixen entre els proveïdors de recursos (servidors) i els demandants (clients).

* **El client (Frontend):** És el dispositiu de l'usuari (ordinador, mòbil) i el seu navegador (Chrome, Firefox). S'encarrega de la interfície i la interacció.  
* **El servidor (Backend):** Un ordinador remot que emmagatzema dades, processa la lògica de negoci i respon a les peticions del client.  
* **L'API (Application Programming Interface):** Comunica el client amb el servidor. Defineix com s'han de demanar les dades.

Internet és la "carretera" per on viatja la informació. Com es troben client/servidor:

* **DNS (Domain Name System):** És la llibreta d'adreces. Tradueix el nom de domini (google.com) a l'**Adreça IP** (el número de telèfon únic del servidor).  
* **TCP/IP:** Són els protocols que regeixen la transmissió. El **TCP** s'encarrega que la informació es trossegi en **Paquets de dades** i que aquests arribin sencers i en l'ordre correcte.  
* **Recursos i renderització:** Un cop establerta la connexió, el servidor envia els fitxers (HTML, CSS, JS) que el navegador processa per "dibuixar" la web per a l'usuari.

**2\. Rols en el desenvolupament (front vs back)**

* **Front-end:** Es concentra en el que l'usuari veu. Tecnologies: HTML, CSS i JavaScript.  
* **Back-end:** Es concentra en el que l’usuari no veu: bases de dades, servidors i seguretat. Tecnologies: Node.js, Python, PHP, SQL.  
* **Full-stack:** Un perfil que té coneixements i capacitat per treballar en ambdues capes.

**3\. Protocol HTTP/HTTPS**  
És el llenguatge que fan servir el client i el servidor per parlar.

* **Peticions (Requests):** El client demana un recurs (exemple: GET /index.html).  
* **Respostes (Responses):** El servidor envia el recurs i un **codi d'estat**:  
  * **200:** OK (Tot correcte).  
  * **301:** Mogut permanentment (Redirecció).  
  * **404:** Not Found (No trobat).  
  * **500:** Internal Server Error (Error del servidor).  
* **HTTPS:** És la versió segura de HTTP. Encripta la comunicació perquè ningú pugui "escoltar" les dades (com contrasenyes o targetes).

**4\. Tipus d'aplicacions web**

| Tipus | Descripció |
| :---- | :---- |
| **Estàtiques** | Mostren el mateix contingut a tots els usuaris. Són fitxers HTML/CSS fixos. |
| **Dinàmiques** | El contingut canvia segons l'usuari o les dades (ex: Facebook, Amazon). |
| **SPA (Single Page App)** | L'aplicació carrega una sola vegada. Quan navegues, només canvien parts de la pàgina sense refrescar-la tota (ex: Gmail). |
| **PWA (Progressive Web App)** | Webs que semblen aplicacions mòbils: poden funcionar sense internet i enviar notificacions. |

**5\. Frameworks de clients** 

A mesura que les aplicacions web es tornen més complexes, gestionar el codi "a mà" (Vanilla JS) és difícil. Per això fem servir:

* **Llibreria (ex: React):** Un conjunt d'eines que tu utilitzes quan vols. Tu mantens el control del flux.  
* **Framework (ex: Angular, Vue):** Una estructura completa que t'obliga a treballar d'una manera concreta. El framework "mana" i crida el teu codi.

**Avantatges**: Permeten el desenvolupament basat en components (peces reutilitzables) i gestionen l'estat de l'aplicació de forma eficient mitjançant el Virtual DOM.

**6\. Altres conceptes de fonaments**

**El navegador i el DOM**  
El navegador no "llegeix" el codi tal qual, sinó que el transforma:

* **Motor de renderització:** El software que dibuixa la web (ex: Blink a Chrome, Gecko a Firefox).  
* **DOM (Document Object Model):** És l'estructura en arbre que crea el navegador a partir de l'HTML. JavaScript fa servir el DOM per modificar la pàgina en temps real.

**Accessibilitat, responsivitat i SEO**

* **Responsivitat:** La web s'adapta a qualsevol pantalla (mòbil, tablet, PC).  
* **Accessibilitat (WCAG):** Fer la web usable per a persones amb discapacitats (lectors de pantalla, contrast de colors).  
* **SEO (Search Engine Optimization):** Optimitzar la web perquè Google la trobi fàcilment.

**Conceptes tècnics i seguretat**

* **Llibreria vs Framework:** Una **llibreria** (ex: React) és una eina que tu crides; un **framework** (ex: Angular) és una estructura que et diu com has d'escriure el codi.  
* **CMS (Content Management System):** Gestors de contingut com WordPress que permeten crear webs sense programar des de zero.  
* **CORS (Cross-Origin Resource Sharing):** Un mecanisme de seguretat que controla qui pot demanar dades al teu servidor des d'un altre domini.  
* **XSS (Cross-Site Scripting):** Una vulnerabilitat on un atacant injecta codi maliciós a la teva web.

Quan investiguem els codis d'estat HTTP, recordar: els **2xx** són èxits, els **4xx** són culpa del client (tu t'has equivocat) i els **5xx** són culpa del servidor (la web ha caigut).  
