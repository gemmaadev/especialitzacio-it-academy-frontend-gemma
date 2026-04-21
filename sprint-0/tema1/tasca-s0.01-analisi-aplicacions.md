### **Exercici pràctic 1: Anàlisi d'aplicacions** 

Anàlisi de 6 aplicacions web diferents de dues categories: webs comercials i aplicacions.

**GRUP 1:  WEBS COMERCIALS** 

1. **Amazon** 

| Criteri | Descripció  |
| :---- | :---- |
| Tipologia | Dinàmica (web d’ecommerce amb comportament parcial tipus SPA, amb càrrega asíncrona de continguts) |
| URL | [http://amazon.com/](http://amazon.com/) |
| Evidències tècniques | Utilitza JavaScript i peticions en segon pla per carregar informació (productes, recomanacions, preus) sense interrompre la navegació. |
| Comportament de navegació | Tens un cercador, recomanacions de productes i pots moure’t per la web sense que es torni a carregar tota la pàgina cada vegada. |
| Temps de càrrega | La càrrega inicial pot trigar una mica, però després es carrega per parts (lazy loading) per ser més ràpid. |
| Interacció amb servidor | Està constantment connectada al servidor mitjançant APIs, utilitza memòria cau i actualitza dades de forma contínua. |

2. **Blog personal WordPress**

| Criteri | Descripció  |
| :---- | :---- |
| Tipologia | Plataforma web dinàmica amb comportament tipus SPA en el panell d’administració, on la navegació interna es fa sense recàrregues completes de pàgina. |
| URL | [https://wordpress.com/](https://wordpress.com/es/) |
| Evidències tècniques | Utilitza JavaScript (React) i una API REST per carregar i actualitzar contingut de forma dinàmica, junt amb CDN per optimitzar el rendiment i la velocitat de càrrega. |
| Comportament de navegació | La navegació dins del panell és fluida, basada en un dashboard central amb menús laterals que permeten accedir a diferents seccions sense recarregar la pàgina. |
| Temps de càrrega | La càrrega inicial pot ser una mica més pesada, però després tot funciona ràpid perquè només es van actualitzant parts de la pantalla. |
| Interacció amb servidor | Està en comunicació constant amb el servidor mitjançant peticions asíncrones i API, actualitzant dades en temps real. |

3. **Portafoli estàtic**

| Criteri | Descripció  |
| :---- | :---- |
| Tipologia | Web estàtica (pot tenir petites interaccions amb JavaScript, però el contingut no canvia). |
| URL | [https://html5up.net/](https://html5up.net/)  |
| Evidències tècniques | Principalment està feta amb HTML i CSS. Pot incloure JavaScript molt bàsic per animacions o interaccions simples. No té backend ni base de dades. |
| Comportament de navegació | Navegació simple entre pàgines, amb algunes transicions suaus |
| Temps de càrrega | Molt ràpid, ja que els fitxers són lleugers i no hi ha processos complexos al servidor. |
| Interacció amb servidor | Molt baixa: només es descarreguen fitxers estàtics (HTML, CSS, imatges i algun JS). |

**GRUP 2:  APLICACIONS WEB**  

1. **Airbnb** 

| Criteri | Descripció  |
| :---- | :---- |
| Tipologia | SPA (Single Page Application) amb renderitzat híbrid (combina càrrega al servidor i al navegador). |
| URL | [https://www.airbnb.es/](https://www.airbnb.es/)  |
| Evidències tècniques | Utilitza JavaScript (React), API REST/GraphQL, autenticació d’usuaris i CDN per millorar la velocitat i el rendiment. |
| Comportament de navegació | La navegació és fluida, sense recàrregues completes de pàgina. Permet fer cerques, aplicar filtres i interactuar amb mapes de manera dinàmica. |
| Temps de càrrega | La càrrega inicial és mitjana, però després es carrega per parts (lazy loading) i la navegació és ràpida. |
| Interacció amb servidor | Fa moltes peticions a APIs per obtenir dades actualitzades en temps real (preus, disponibilitat i resultats de cerca). |

2. **Twitter** 

| Criteri | Descripció  |
| :---- | :---- |
| Tipologia | Web tipus SPA (Single Page Application), on la navegació es fa sense recarregar la pàgina. |
| URL | [https://x.com/](https://x.com/)  |
| Evidències tècniques | Utilitza JavaScript amb frameworks moderns, càrrega dinàmica de contingut, API, autenticació d’usuaris i actualització en temps real. |
| Comportament de navegació | La navegació és contínua i fluida, amb scroll infinit i un feed que s’actualitza automàticament sense recàrregues. |
| Temps de càrrega | Càrrega inicial moderada, després molt ràpida per navegació client-side (perquè tot es gestiona al navegador) |
| Interacció amb servidor | Fa peticions constants al servidor per obtenir dades actualitzades (timeline, notificacions i missatges) en temps real. |

   

3. **Pàgina de documentació de MDN**

| Criteri | Descripció  |
| :---- | :---- |
| Tipologia | Web dinàmica amb contingut principalment estàtic generat prèviament (SSG), amb petites interaccions amb JavaScript. |
| URL | [https://developer.mozilla.org/es/](https://developer.mozilla.org/es/)  |
| Evidències tècniques | HTML generat prèviament (renderitzat estàtic), JavaScript per interaccions puntuals, sistema de cerca interna, ús de CDN i contingut ben estructurat. |
| Comportament de navegació | Navegació entre pàgines amb recàrrega completa, menú lateral jeràrquic i sistema de cerca per trobar documentació. |
| Temps de càrrega | Ràpid, ja que el contingut està optimitzat i preconstruït, amb bon rendiment general. |
| Interacció amb servidor | Baixa: principalment es serveix contingut ja preparat i només hi ha consultes puntuals (com la cerca interna). |

 