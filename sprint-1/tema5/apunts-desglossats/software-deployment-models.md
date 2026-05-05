## **Models de desplegament de software**

**Software Deployment Models**  
[https://www.freecodecamp.org/news/software-deployment-models/](https://www.freecodecamp.org/news/software-deployment-models/)  
Guia de FreeCodeCamp sobre els models de desplegament de software i les seves diferències.

**Introducció: per què existeixen models tan diversos?**

El codi d'una aplicació es pot desplegar de moltes maneres, depenent de les necessitats de rendiment, escalabilitat, complexitat i els recursos disponibles. Entendre els models de desplegament és fonamental per prendre decisions arquitecturals correctes: no hi ha un model únic millor per a tots els casos.

**1\. Arquitectura Client/Servidor**

Les arquitectures client/servidor són un tipus d'arquitectura de computació distribuïda en la qual les tasques de còmput es divideixen entre dos tipus de màquines: clients i servidors. 

Un client és un dispositiu o programa que sol·licita serveis o recursos d'un servidor. 

Un servidor és un dispositiu o programa que proporciona serveis o recursos als clients. 

La interacció entre clients i servidors es basa típicament en un model petició-resposta: un client envia una petició a un servidor per una xarxa, i el servidor processa la petició i envia una resposta de tornada.

Exemples quotidians: quan el teu navegador demana una pàgina web (client) al servidor d'Apache o Nginx (servidor), quan una app mòbil demana dades a una API REST, o quan el teu client de correu demana els missatges al servidor IMAP.

L'arquitectura client/servidor proporciona diversos avantatges: escalabilitat (els servidors es poden afegir o eliminar de la xarxa a mesura que canvia la demanda) i centralització (centralitzant els recursos als servidors, és més fàcil gestionar i controlar l'accés a aquells recursos i aplicar polítiques de seguretat).

**2\. Thin Client vs. Fat Client**

En una arquitectura thin client, la màquina client és responsable únicament de la capa de presentació, mentre que la lògica de l'aplicació i el processament de dades es gestionen al costat del servidor. 

Els thin clients típicament tenen poca potència de processament i memòria, i depenen molt de la connectivitat de xarxa per funcionar. Quan un usuari interactua amb un thin client, l'input s'envia per la xarxa al servidor, que processa la petició i envia de tornada les dades necessàries al client per mostrar.

Exemples: Chromebooks, terminals de punt de venda, kioscos d'informació. Avenantges: menys hardware, més fàcil de gestionar. Desavantatge: depèn completament de la xarxa.

En canvi, en una arquitectura fat client, la màquina client és responsable tant de la capa de presentació com de la lògica de l'aplicació. La màquina client típicament té més potència de processament i memòria, i pot executar codi i processar dades localment. 

Quan un usuari interactua amb un fat client, la màquina client processa l'input i executa el codi i el processament de dades necessaris localment, sense dependre del servidor per a cada petició.

Exemples: aplicacions d'escriptori com VS Code, Photoshop o aplicacions de jocs. Avantatge: millor rendiment i resiliència a problemes de xarxa. Desavantatge: cal instal·lar i actualitzar en cada dispositiu.

**3\. Arquitectura Monolítica vs. Microserveis**

### **Monolítica**

En una arquitectura monolítica, tota l'aplicació es construeix com una unitat única i autosuficient. Tota la funcionalitat, des de l'accés a dades fins a la interfície d'usuari, s'agrupa en una sola base de codi i es desplega com una unitat única. Els monolits típicament són més fàcils de desenvolupar i desplegar, però poden tornar-se difícils de mantenir a mesura que la base de codi creix en mida i complexitat.

En una arquitectura monolítica, tots els components de l'aplicació estan estretament acoblats, cosa que significa que els canvis en un component poden tenir un efecte en cascada per tot el sistema. Això pot fer difícil escalar o modificar components específics de l'aplicació sense afectar tot el sistema.

Una aplicació monolítica típica: un servidor Node.js que gestiona les rutes, la lògica de negoci, la base de dades i el renderitzat de les vistes, tot en el mateix procés.

**Quan usar monolítica:** projectes nous i petits, equips petits, MVPs i prototips. És molt més senzilla d'implementar, debugar i desplegar que els microserveis.

### **Microserveis**

En una arquitectura de microserveis, l'aplicació es divideix en serveis més petits i independents que es comuniquen entre ells per una xarxa. Cada servei està dissenyat per realitzar una tasca o conjunt de tasques específics, i es pot desenvolupar i desplegar independentment dels altres serveis. Els microserveis poden ser més complexos de desenvolupar i desplegar, però ofereixen major flexibilitat i escalabilitat, ja que cada servei es pot escalar independentment per gestionar càrregues de treball canviants.

Les arquitectures de microserveis fan ús de funcionalitats poc acoblades, cosa que significa que els canvis en un servei tenen un impacte mínim en els altres serveis. Això fa més fàcil modificar o escalar components específics de l'aplicació sense afectar tot el sistema.

Un exemple pràctic: Netflix usa microserveis. El servei de recomanació, el de pagaments, el de catàleg i el de streaming són serveis independents que es poden actualitzar i escalar per separat.

**Quan usar microserveis:** aplicacions grans amb equips múltiples, quan serveis específics necessiten escalar independentment, o quan parts de l'aplicació necessiten tecnologies molt diverses.

**4\. Aplicacions Web (Web Apps)**

Les aplicacions web són aplicacions de software a les quals s'accedeix a través d'un navegador web per una xarxa com Internet. El propòsit de les aplicacions web és proporcionar als usuaris una manera convenient i accessible de realitzar diverses tasques i accedir a serveis per la web. 

Les aplicacions web es construeixen típicament usant tecnologies de desenvolupament web com HTML, CSS i JavaScript, i es poden allotjar en un servidor web que es comunica amb els navegadors del costat del client usant protocols web com HTTP i HTTPS.

Les webs tradicionals segueixen el model de server-side rendering: el servidor genera el HTML complet per a cada petició. Les aplicacions web modernes sovint usen JavaScript per fer-les més interactives.

**5\. Single Page Applications (SPAs)**

Una SPA és una aplicació web que carrega una sola pàgina HTML i actualitza dinàmicament el contingut en aquella pàgina a mesura que l'usuari interactua amb ella. Això contrasta amb les aplicacions web tradicionals, que requereixen una recàrrega completa de la pàgina cada vegada que l'usuari interactua amb l'aplicació.

En una SPA, el HTML, CSS i JavaScript inicials es descarreguen al navegador del costat del client, i les interaccions posteriors amb l'aplicació es gestionen a través de peticions asíncrones a l'API del costat del servidor.

 El servidor retorna dades en un format lleuger, com JSON, que el JavaScript del costat del client usa per actualitzar el contingut de la pàgina sense refrescar la pàgina sencera. Les SPAs s'acostumen a construir usant frameworks i biblioteques modernes de JavaScript, com React, Angular i Vue.js.

**Avantatges de les SPAs:** temps de càrrega més ràpids en navegació, millor experiència d'usuari (sense parpelleig de recàrrega), menys càrrega al servidor.

**Desavantatges:** SEO inicialment més complex (el contingut es genera al client), estat de l'aplicació més complex de gestionar, temps de primera càrrega més llarg.

**6\. APIs (Application Programming Interfaces)**

Una API és un conjunt de regles, protocols i eines que els developers usen per construir aplicacions de software. 

El propòsit d'una API és habilitar la comunicació i integració entre diferents aplicacions de software, permetent-los intercanviar dades i funcionalitat. 

En altres paraules, les APIs són una eina per exposar de manera segura i eficient funcionalitat de còmput i dades a xarxes públiques.

**Els tipus d'APIs principals:**

* Les **APIs obertes (públiques)** són accessibles als developers fora de l'organització que posseeix l'API, i sovint no requereixen cap autenticació per accedir-hi.   
* Les **APIs internes (privades)** estan destinades a l'ús dins d'una organització i no són accessibles als developers externs.  
* Les **APIs compostes** combinen funcionalitat de múltiples APIs en una sola interfície, simplificant el procés de desenvolupament.   
* Les **APIs REST** usen el protocol HTTP per accedir i manipular dades, i s'usen àmpliament per construir aplicacions web i mòbils. REST significa Representational State Transfer.   
* Les **APIs SOAP**, on SOAP significa Simple Object Access Protocol, usen el protocol SOAP per intercanviar dades entre sistemes, i s'usen communament per a aplicacions de nivell empresarial, tot i que avui dia SOAP és molt menys popular que REST.

**Resum comparatiu dels models**

| Model | Processament | Ideal per a |
| ----- | ----- | ----- |
| **Client/Servidor** | Dividit entre client i servidor | La majoria d'aplicacions web |
| **Thin Client** | Al servidor | Kioscos, terminals, gestió centralitzada |
| **Fat Client** | Al client | Apps d'escriptori, jocs |
| **Monolítica** | Un sol procés servidor | MVPs, equips petits, projectes simples |
| **Microserveis** | Múltiples serveis independents | Apps grans, equips múltiples |
| **SPA** | Navegador (JavaScript) | Apps interactives, React/Vue/Angular |
| **API REST** | Servidor (dades JSON) | Backend per a SPAs i apps mòbils |

