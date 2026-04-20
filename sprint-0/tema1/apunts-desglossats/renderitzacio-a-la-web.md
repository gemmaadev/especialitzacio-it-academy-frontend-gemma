###### **Renderització a la web**

[https://web.dev/articles/rendering-on-the-web?hl=es-419](https://web.dev/articles/rendering-on-the-web?hl=es-419)   
Article de Web.dev sobre els diferents mètodes de renderització web.

–

Com i on es genera el codi que l'usuari final veu? 

### **4\. Renderització a la Web (Rendering)**

La renderització és el procés de convertir el codi (HTML, JS, dades) en una pàgina web visual. Existeixen diferents estratègies segons on es generi aquest codi:

**SSR (Server-Side Rendering)**

* **Com funciona:** El servidor genera l'HTML complet per a cada petició. El navegador rep una pàgina ja "cuinada".  
* **Pros:** Molt ràpid per a la primera visualització i excel·lent per al SEO (Google ho llegeix fàcilment).  
* **Contres:** Cada clic pot requerir carregar una pàgina nova del servidor, cosa que pot ser lenta entre navegacions.

#### **CSR (Client-Side Rendering)**

* **Com funciona:** El servidor envia una pàgina HTML buida i un fitxer JavaScript gran. El navegador de l'usuari és qui executa el JS per "dibuixar" la web.  
* **Pros:** Un cop carregada, la navegació és instantània (típic de les **SPA**).  
* **Contres:** La càrrega inicial és lenta i pot ser un repte per al SEO si no es gestiona bé.

#### **Static Rendering (SSG \- Static Site Generation)**

* **Com funciona:** La web es renderitza en el moment de la programació (build time), no quan l'usuari la demana. Són fitxers HTML estàtics ja preparats.  
* **Pros:** El rendiment més ràpid de tots i molta seguretat.  
* **Contres:** No és ideal per a contingut que canvia cada minut (com una borsa de valors).

#### **Hydration (Hidratació)**

És una tècnica intermèdia: el servidor envia l'HTML ràpidament (SSR) per a la visualització, i després JavaScript "s'enganxa" a sobre per fer-la interactiva (CSR).

**Conceptes clau de rendiment (mètriques)**

Per saber si una renderització és bona, l'article es fixa en:

* **TTFB (Time to First Byte):** Temps que triga a arribar la primera dada del servidor.  
* **FCP (First Contentful Paint):** Quan l'usuari veu la primera cosa a la pantalla.  
* **TTI (Time to Interactive):** Quan la pàgina ja no només es veu, sinó que els botons ja funcionen.

No hi ha un mètode millor que un altre; depèn del projecte.

* Si és un **blog o diari**: Millor **SSR/Static** (prioritat al contingut).  
* Si és un **tauler de control o app complexa**: Millor **CSR** (prioritat a la interacció). 

+ Imagen [app-rendering-types.png](https://web.dev/articles/rendering-on-the-web?hl=es-419#conclusion) 