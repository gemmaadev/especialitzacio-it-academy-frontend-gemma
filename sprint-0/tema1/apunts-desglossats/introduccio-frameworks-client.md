## **Introducció als frameworks de client**

[https://developer.mozilla.org/en-US/docs/Learn\_web\_development/Core/Frameworks\_libraries/Introduction](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/Introduction)  
Explicació bàsica sobre els frameworks i llibreries web al costat del client.

Per crear interfícies d'usuari (UI) complexes, els desenvolupadors utilitzen eines que faciliten la feina i fan el codi més fàcil de mantenir.

### **Diferència entre llibreria i framework**

Encara que sovint s'usen com a sinònims, hi ha una diferència clau basada en la **inversió de control**:

* **Llibreria (Library):** És una col·lecció de funcions que tu crides quan les necessites. Tu tens el control del flux de l'aplicació. (Exemple: **React**).  
* **Framework:** És una estructura completa ("un marc de treball"). Ell et diu on i com has d'escriure el codi, i el framework és qui crida el teu codi quan cal. (Exemple: **Angular**).

### **Per què fer-los servir?**

Els motius principals són:

1. **Gestió de l'Estat (State Management):** Faciliten que la interfície s'actualitzi automàticament quan les dades canvien (per exemple, quan un usuari rep un missatge nou).  
2. **Desenvolupament basat en components:** Permeten dividir la web en peces petites i reutilitzables (com un botó, una barra de navegació o una fitxa de producte).  
3. **Declarativitat:** En lloc de dir-li al navegador pas a pas com canviar el DOM (imperatiu), li dius com vols que es vegi la web (declaratiu) i el framework s'encarrega de la resta.

### **Els "tres grans" frameworks**

Actualment, el mercat està dominat per aquestes tres opcions:

* **React:** Creat per Meta (Facebook). Tècnicament és una llibreria, però té un ecosistema tan gran que actua com a framework. És el més popular.  
* **Angular:** Creat per Google. És un framework complet ("batteries-included") que inclou tot el necessari per a aplicacions de gran escala.  
* **Vue.js:** Creat per Evan You. Molt popular per la seva facilitat d'aprenentatge i flexibilitat.

### 

### 

### **Conceptes clau** 

* **Virtual DOM:** Una còpia lleugera del DOM real que el framework utilitza per calcular els canvis més ràpidament abans d'actualitzar la pantalla.  
* **Routing:** Gestió de la navegació entre diferents seccions de la web sense recarregar la pàgina (essencial per a les **SPA**).  
* **Build Tools (Eines de construcció):** Programes (com Vite o Webpack) que agafen tot el codi del framework i el "comprimeixen" perquè el navegador el pugui entendre eficientment.

