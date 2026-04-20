## **Tipus d'Aplicacions Web**

[https://developer.mozilla.org/en-US/docs/Web/Progressive\_web\_apps/Guides/What\_is\_a\_progressive\_web\_app](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app)   
[https://fp.uoc.fje.edu/ca/estudis/blog-fp/quins-tipus-daplicacions-web-existeixen](https://fp.uoc.fje.edu/ca/estudis/blog-fp/quins-tipus-daplicacions-web-existeixen)

Segons la seva arquitectura i funcionalitat, podem classificar les aplicacions en quatre grans grups:

### **A. Aplicacions estàtiques**

Són les més senzilles. El servidor envia fitxers HTML, CSS i imatges tal qual estan emmagatzemats.

* **Característica:** El contingut no canvia segons l'usuari (ex: un currículum online o una web de presentació).  
* **Avantatge:** Molt ràpides de carregar i barates d'allotjar.

### **B. Aplicacions dinàmiques**

El contingut es genera en temps real. El servidor consulta una base de dades abans d'enviar la resposta.

* **Exemple:** Un diari digital o una xarxa social on cada usuari veu contingut diferent.  
* **Tecnologies:** PHP, Python, Node.js connectats a bases de dades (SQL/NoSQL).

### **SPA (Single-Page Applications)**

Són aplicacions que carreguen una sola pàgina HTML i, a partir d'aquí, actualitzen el contingut dinàmicament mitjançant JavaScript sense recarregar tot el navegador.

* **Experiència:** Molt fluida, semblant a una aplicació de l'escriptori.  
* **Exemples:** Gmail, Netflix o Facebook.

**PWA (Progressive Web Apps)**

Una PWA no és una tecnologia nova, sinó una web que utilitza capacitats modernes del navegador per oferir una experiència d'**aplicació nativa** (mòbil).

**Característiques clau segons MDN:**

1. **Instal·lables:** Es poden afegir a la pantalla d'inici del mòbil o a l'escriptori sense passar per l'App Store/Play Store.  
2. **Funcionament Offline:** Gràcies als **Service Workers** (scripts que corren en segon pla), poden funcionar sense connexió a Internet o amb xarxes molt lentes.  
3. **Segures:** Obligatòriament han de funcionar sota **HTTPS**.  
4. **Capacitats natives:** Poden enviar **notificacions push** i accedir a hardware (càmera, GPS, etc.).  
5. **Progressives:** Funcionen a qualsevol navegador, però les funcionalitats extra (com l'accés offline) només s'activen si el navegador les suporta.

**Taula comparativa ràpida**

| Tipus | Es pot instal·lar? | Funciona offline? | Refresca la pàgina? |
| :---- | :---- | :---- | :---- |
| **Estàtica** | No | No | Sí |
| **Dinàmica** | No | No | Sí |
| **SPA** | No (normalment) | No | No |
| **PWA** | **Sí** | **Sí** | Depèn (solen ser SPAs) |

La clau de les **PWA** és el **Service Worker**, que actua com un proxy entre la xarxa i el navegador per guardar dades en memòria cau.

 

