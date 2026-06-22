**Quins són els principis fonamentals de REST (Representational State Transfer) i com es diferencien d'altres arquitectures?**

**Què és REST i d'on ve**

REST és un estil arquitectural ideat per Roy Fielding a la seva tesi doctoral del 2000\. La premissa bàsica és que els developers usen els mètodes HTTP estàndard (GET, POST, PUT, DELETE) per consultar i mutar recursos representats per URIs a Internet. 

REST és neutral quant al format de dades usat per estructurar la resposta: JSON és el format més popular, tot i que pots usar XML, CSV i fins i tot RSS.

REST no és un protocol ni un estàndard: és un **estil arquitectural** — un conjunt de restriccions que, si es compleixen, produeixen un sistema amb propietats desitjables (escalabilitat, visibilitat, fiabilitat).

**Els 6 Principis Fonamentals de REST**

### **Principi 1: Interfície Uniforme**

El que separa l'estil arquitectural REST d'altres estils basats en xarxa és l'èmfasi en una interacció uniforme amb un servidor donat independentment del tipus de dispositiu o aplicació.

La interfície uniforme es concreta en quatre sub-principis: identificació de recursos via URI, manipulació de recursos a través de representacions, missatges autodescriptius, i HATEOAS.

| URI com a identificador de recurs:  /api/usuaris        → la col·lecció d'usuaris  /api/usuaris/42     → l'usuari concret amb ID 42  /api/usuaris/42/comandes → les comandes de l'usuari 42No: /api/getUser?id=42 (verb a la URL → no RESTful)No: /api/deleteUsuari/42 (verb a la URL → no RESTful) |
| :---- |

### **Principi 2: Client-Servidor**

Les APIs RESTful usen una arquitectura client-servidor on el client envia la petició al servidor i el servidor actua sobre la petició i envia la resposta de tornada al client.

La separació de responsabilitats és la clau: el client gestiona la interfície d'usuari, el servidor gestiona les dades i la lògica de negoci. Poden evolucionar independentment sense trencar el contracte entre ells.

### **Principi 3: Stateless (Sense Estat)**

Les APIs RESTful son stateless. Això significa que la petició enviada pel client conté tota la informació per processar la petició amb èxit. Cap petició es recolza en cap altra petició per al seu processament.

El servidor no emmagatzema cap petició HTTP feta pel client i tracta cada petició com a nova. No s'emmagatzema cap historial al servidor i cada estat de sessió és completament al costat client, fent el client responsable de l'estat de l'aplicació.

| \-- CADA petició ha de ser autocontinguda:GET /api/comandes HTTP/1.1Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...   ← token a CADA peticióAccept: application/json\-- El servidor NO recorda que l'usuari va autenticar-se fa 5 minuts\-- El servidor NO té sessions persistents entre peticions\-- Tota la informació necessària va inclosa a la petició |
| :---- |

### **Principi 4: Cacheable**

Segons les restriccions de caché, les respostes de l'API fetes de manera implícita o explícita han de ser etiquetades com a cacheables o no cacheables. Si la resposta és cacheable, un client pot fer caché de qualsevol representació, donant el dret de reutilitzar les dades de resposta en el futur.

| \-- El servidor indica la política de caché a les capçaleres:HTTP/1.1 200 OKCache-Control: max-age=3600, public    ← cacheable durant 1 horaETag: "33a64df551425fcc55e"            ← versió del recurs\-- En la propera petició, el client pot enviar:If-None-Match: "33a64df551425fcc55e"\-- Si no ha canviat → servidor respon 304 Not Modified (estalvia ample de banda) |
| :---- |

### **Principi 5: Sistema per capes**

Les APIs REST estan dissenyades específicament per a sistemes de múltiples capes, permetent als developers afegir noves capes entre client i servidor sense haver de reconstruir tota l'estructura. La configuració del backend pot canviar sense afectar la comunicació client-servidor perquè hi ha una capa separada entre el backend i el client.

| Client → Load Balancer → API Gateway → Autenticació → NestJS API → MongoDB         (capa 1\)        (capa 2\)      (capa 3\)       (capa 4\)     (capa 5\) |
| :---- |

El client no sap quantes capes existeixen.  
Cada capa únicament interactua amb la capa immediata.

### **Principi 6: Code on Demand (opcional)**

El servidor pot enviar codi executable al client (JavaScript, applets). L'únic principi opcional. Rarament usat en APIs REST modernes.

**REST vs. Altres Arquitectures**

### **REST vs. SOAP**

SOAP (Simple Object Access Protocol) és un protocol per intercanviar informació estructurada en la implementació de serveis web. A diferència de REST, que és un estil arquitectural, SOAP és un protocol amb estàndards específics per a l'estructura dels missatges i el processament. 

SOAP es construeix al voltant de l'intercanvi de missatges basats en XML sobre una xarxa. Inclou un conjunt estricte de regles per al format dels missatges, gestió d'errors, i seguretat, fent-lo més rígid comparat amb REST.

| REST:                                SOAP:  Format: JSON (principalment)         Format: XML obligatòriament  Protocol: HTTP                       Protocol: HTTP, SMTP, TCP...  Estàndard: cap (és un estil)         Estàndard: WSDL obligatori  Missatges: lleugers                  Missatges: pesats (XML verbós)  Estat: stateless                     Estat: pot ser stateful  Seguretat: implementada per capes    Seguretat: WS-Security integrat  Ideal per a: APIs web modernes       Ideal per a: serveis bancaris legacy |
| :---- |

### **REST vs. GraphQL**

REST usa múltiples endpoints per a cada recurs, requerint crides HTTP separades per a tipus de dades diferents. 

GraphQL representa un canvi de paradigma respecte als enfocaments REST tradicionals. GraphQL permet als clients especificar exactament quines dades necessiten en una única petició.

| REST (múltiples endpoints):           GraphQL (un sol endpoint):  GET /api/usuaris/123                  POST /graphql  GET /api/usuaris/123/comandes         {  GET /api/usuaris/123/perfil             usuari(id: 123\) {  → 3 peticions HTTP                       nom  → pot retornar dades de més              comandes { total }    (over-fetching)                        perfil { avatar }                                         }                                       }                                      → 1 sola petició                                      → exactament les dades demanadesREST és millor per a:                GraphQL és millor per a:  APIs simples i documentades          Apps mòbils (ample de banda limitat)  Caché HTTP nativa                    Dades molt variades per client  Serveis independents                 Equips frontend autònoms  Ecosistema madur (OpenAPI)           Dades relacionades complexes |
| :---- |

### **REST vs. gRPC**

gRPC és un RPC (Remote Procedure Call) d'alt rendiment que funciona amb un format de serialització binari anomenat Protocol Buffers. 

Usa HTTP/2 per a màxim rendiment i funciona amb diversos llenguatges de programació.

| REST:                                gRPC:  Format: JSON (text)                  Format: Protocol Buffers (binari)  Protocol: HTTP/1.1                   Protocol: HTTP/2  Llegibilitat: alta (JSON)            Llegibilitat: baixa (binari)  Rendiment: bo                        Rendiment: molt alt (\~7x més ràpid)  Streaming: limitat                   Streaming: bidireccional natiu  Ideal per a: APIs públiques          Ideal per a: microserveis interns              web/mòbil                            temps real |
| :---- |

**Per què REST és l'elecció estàndard per a NestJS**

REST és adequat per a arquitectures de microserveis, on cada servei exposa funcionalitat a través d'APIs ben definides. La naturalesa stateless dels serveis RESTful fa que l'escalabilitat horitzontal sigui senzilla.

NestJS és un framework dissenyat específicament per construir APIs REST eficients i escalables (tot i que suporta GraphQL i WebSockets). Les raons per escollir REST per a una API NestJS:

✅ Simplicitat: HTTP estàndard, fàcil de consumir des de qualsevol client  
✅ Documentació: OpenAPI/Swagger generat automàticament amb decoradors  
✅ Caché: HTTP native caching funciona sense configuració addicional  
✅ Eines: Postman, Thunder Client, curl → tothom les coneix  
✅ Maduresa: milers de biblioteques i patrons establerts  
✅ Escalabilitat: stateless → afegir servidors és trivial

**Els 6 principis en una línia**

| Principi | Clau |
| ----- | ----- |
| **Interfície Uniforme** | URIs per a recursos, HTTP verbs per a accions |
| **Client-Servidor** | Separació de responsabilitats, evolució independent |
| **Stateless** | Cada petició és autocontinguda, sense sessió al servidor |
| **Cacheable** | Les respostes indiquen si es poden fer caché |
| **Sistema per Capes** | Intermediaris transparents (proxies, gateways, LBs) |
| **Code on Demand** | Opcional: el servidor pot enviar codi executable |

