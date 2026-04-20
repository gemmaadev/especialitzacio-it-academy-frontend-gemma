# **Com funciona Internet?**

[https://developer.mozilla.org/es/docs/Learn\_web\_development/Howto/Web\_mechanics/How\_does\_the\_Internet\_work](https://developer.mozilla.org/es/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work)   
Introducció senzilla al funcionament de la xarxa d’Internet.

Aquest article de MDN explica la infraestructura física i lògica que hi ha darrere de la xarxa global.

### **1\. Què és Internet?**

Internet és la infraestructura física que permet connectar ordinadors entre si. A diferència del Web (que és un servei que corre sobre Internet), Internet és la xarxa de xarxes que serveix de base per a molts serveis (correu electrònic, web, transferència de fitxers, etc.).

### **2\. Com es connecten els ordinadors?**

* **Xarxa simple:** Quan dos ordinadors s'han de comunicar, es poden connectar directament (per cable o Wi-Fi).  
* **Xarxa amb commutador (Switch):** Per connectar molts ordinadors entre si sense que el nombre de cables sigui infinit, s'utilitza un **router** o encaminador, que actua com un nexe d'unió.  
* **Xarxa de xarxes:** Un router es pot connectar a un altre router, creant una teranyina cada vegada més gran.

### **3\. El paper dels ISPs i els Mòdems**

Per connectar la teva xarxa local a la resta del món:

* **Mòdem:** Dispositiu que converteix la informació de la teva xarxa en senyals que poden viatjar per les infraestructures telefòniques o de fibra òptica.  
* **ISP (Proveïdor de Serveis d'Internet):** És l'empresa (com Telefónica, Orange, etc.) que gestiona routers especials que connecten la teva llar amb altres ISPs de tot el món.

### **4\. Com es troben els ordinadors? (Adreces IP)**

Cada dispositiu connectat a Internet té una adreça única anomenada **adreça IP** (per exemple, 192.168.1.1 o 172.217.7.14). És com l'adreça postal d'una casa i serveix perquè les dades sàpiguen on han d'anar.

### **5\. El Sistema de Noms de Domini (DNS)**

Com que les adreces IP són difícils de recordar per als humans, s'utilitzen els **noms de domini** (com google.com).

* El **DNS** és un servei que actua com una agenda telefònica: quan tu escrius un domini, el DNS el "tradueix" a la IP real del servidor per poder establir la connexió.

### **Resum del camí d'una dada:**

1. Escrius una adreça al navegador.  
2. El teu ordinador envia la petició al **router**.  
3. El router la passa al **mòdem**, que l'envia al teu **ISP**.  
4. L'ISP consulta el **DNS** per saber a quina IP ha d'anar.  
5. La petició viatja a través de la infraestructura global de routers fins a arribar al servidor de destí.  
6. El servidor respon i el camí es fa a la inversa fins al teu dispositiu.

