###### **Com funciona la web?**

###### [*https://developer.mozilla.org/es/docs/Learn\_web\_development/Getting\_started/Web\_standards/How\_the\_web\_works*](https://developer.mozilla.org/es/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works)

###### *Guia de MDN sobre els principis bàsics de funcionament de la web.*

La web funciona com un sistema de comunicació entre **clients** (el navegador) i **servidors** (on s’allotgen les webs). Quan entres a una pàgina, en realitat estàs demanant dades a un servidor, i el navegador les interpreta per mostrar-te el contingut.

## **Conceptes clau** 

* **Client**: el meu ordinador o mòbil \+ navegador (Chrome, Firefox…)  
* **Servidor**: on es guarden les webs  
* **Connexió a Internet**: el canal per on viatgen les dades  
* **TCP/IP**: conjunt de normes perquè les dades arribin correctament  
* **DNS**: tradueix noms com google.com a adreces IP  
* **HTTP**: el llenguatge amb què es comuniquen client i servidor  
* **Arxius web**:  
  * Codi: HTML, CSS, JavaScript  
  * Recursos: imatges, vídeos, PDFs…

  ### **1\. Clients i servidors**

La comunicació al web es basa en dos actors principals:

* **Clients:** Són els dispositius dels usuaris connectats a Internet (per exemple, el teu ordinador amb Wi-Fi o el teu mòbil amb dades) i el programari que hi corre, normalment un **navegador web** (Chrome, Firefox, Safari).  
* **Servidors:** Són ordinadors que emmagatzemen pàgines web, llocs web o aplicacions. Quan un client vol accedir a una pàgina, envia una petició al servidor i aquest li retorna el contingut.

  ### **2\. La "caixa d'eines" del web**

Perquè el client i el servidor es puguin comunicar, intervenen altres elements:

* **Connexió a Internet:** El camí físic o sense fils que permet enviar dades.  
* **TCP/IP:** Són protocols de comunicació que defineixen com han de viatjar les dades. És com el "mecanisme de transport" que assegura que la informació arribi al seu destí.  
* **DNS (Domain Name System):** És com una llibreta d'adreces. Quan escrius google.com, el navegador consulta el DNS per trobar l'adreça real (IP) del servidor on està allotjada la web (per exemple, 172.217.7.14).  
* **HTTP (HyperText Transfer Protocol):** El llenguatge que fan servir el client i el servidor per parlar entre ells i demanar/enviar fitxers.

  ### **3\. Què passa exactament quan escrius una URL?**

El procés segueix aquests passos:

1. El navegador va al servidor **DNS** i troba l'adreça IP real del servidor de la web.  
2. El navegador envia un **missatge de petició HTTP** al servidor demanant una còpia de la web.  
3. Si el servidor aprova la petició, envia un missatge "200 OK" i comença a transmetre els fitxers de la web en **paquets** petits de dades.  
4. El navegador rep els paquets, els torna a muntar i **renderitza** (interpreta) el codi HTML, CSS i JavaScript per mostrar-te la pàgina.

   ### **4\. Paquets de dades**

La informació no s'envia d'un sol cop. Es divideix en milers de fragments petits anomenats **paquets**. Això es fa per dues raons:

* **Fiabilitat:** Si un paquet es perd o es corromp, només s'ha de tornar a enviar aquest fragment i no tot el fitxer.  
* **Eficiència:** Diferents paquets poden viatjar per rutes diferents, evitant congestions a la xarxa.

  ### **5\. Ordre de càrrega dels fitxers**

Normalment, el primer que es rep és el fitxer **HTML**. Aquest fitxer conté referències a altres recursos (imatges, estils CSS, scripts de JavaScript). A mesura que el navegador llegeix l'HTML i troba aquestes referències, fa noves peticions al servidor per descarregar-les i completar la pàgina.

