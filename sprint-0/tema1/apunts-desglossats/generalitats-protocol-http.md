###### **Generalitats del protocol HTTP**

###### [*https://developer.mozilla.org/es/docs/Web/HTTP/Guides/Overview*](https://developer.mozilla.org/es/docs/Web/HTTP/Guides/Overview) 

###### *Resum de MDN sobre el funcionament del protocol HTTP.*

### **1\. Què és l'HTTP?**

El **Protocol de Transferència d'Hipertext (HTTP)** es el protocol de la capa d'aplicació que permet la comunicació i l'intercanvi de dades a la Web. Es basa en un model de **petició-resposta** entre un client i un servidor.

### **2\. Característiques principals**

* **Senzill i llegible:** Els missatges HTTP estan dissenyats per ser llegits i compresos per humans (especialment en versions anteriors a HTTP/2).  
* **Extensible:** Gràcies a les **capçaleres (headers)**, és fàcil afegir noves funcionalitats al protocol sense canviar-ne l'estructura base.  
* **Sense estat (Stateless):** L'HTTP no guarda dades entre dues peticions en una mateixa connexió. Per solucionar això i permetre "sessions" (com mantenir el carret de la compra), s'utilitzen les **Cookies**.  
* **Basat en connexions:** Normalment utilitza **TCP** com a protocol de transport per garantir que les dades arribin correctament i en ordre.

### **3\. Components d'un sistema basat en HTTP**

1. **El client:** Normalment el navegador web, que inicia la petició.  
2. **El servidor:** L'ordinador remot que allotja i serveix el document sol·licitat.  
3. **Proxies:** Servidors intermedis que realitzen funcions com memòria cau (cache), filtrat, balanceig de càrrega o autenticació.

### **4\. Què es pot controlar amb HTTP?**

El protocol no només serveix per transmetre fitxers, també gestiona aspectes clau com:

* **Caché:** Com s'emmagatzemen els documents localment per carregar-los més ràpid.  
* **Autenticació:** Control d'accés a pàgines protegides.  
* **Sessions:** L'ús de cookies per vincular diverses peticions seguides d'un mateix usuari.

### **5\. Flux d'una comunicació HTTP**

Quan el navegador vol una pàgina, segueix aquests passos:

1. **Obrir una connexió:** S'estableix una connexió TCP (o TLS si és HTTPS).  
2. **Enviar la petició:** El client envia un missatge amb un mètode (**GET, POST**), una ruta i capçaleres.  
3. **Rebre la resposta:** El servidor envia el **codi d'estat** (200, 404, etc.) i el contingut.  
4. **Tancar o reutilitzar:** La connexió es tanca o es manté oberta per demanar més elements (com imatges o scripts).

### **6\. Estructura dels missatges**

Tant les peticions com les respostes comparteixen una estructura similar:

* **Línia d'inici:** Indica què es demana (petició) o si hi ha hagut èxit (resposta).  
* **Capçaleres HTTP:** Metadades sobre el missatge (tipus de fitxer, mida, data).  
* **Línia buida:** Una línia en blanc que indica que les capçaleres han acabat.  
* **Cos (Body):** Les dades reals (el codi HTML, la imatge o les dades d'un formulari).

L'HTTP és l'"idioma" de la web. És un protocol extensible, no té memòria per si sol (per això usem cookies) i funciona mitjançant un intercanvi de missatges de text entre client i servidor.

