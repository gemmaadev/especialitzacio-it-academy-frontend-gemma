## **Certificats SSL i Let's Encrypt**

**Què és SSL/TLS i per quèexisteix?**

SSL (Secure Sockets Layer) i TLS (Transport Layer Security) són protocols d'encriptació que protegeixen les dades en trànsit. TLS és el reemplaçament modern de SSL, però la gent encara diu "SSL" per referir-se a tots dos.

Quan visites un lloc web sense SSL, les dades viatgen en text pla entre el teu navegador i el servidor. Qualsevol persona que intercepti el trànsit (atac man-in-the-middle, xarxa WiFi pública, proveïdor d'internet) pot llegir exactament el que envies i reps: contrasenyes, dades de targetes de crèdit, missatges privats. HTTPS (HTTP \+ TLS) xifra tot el trànsit de manera que sigui il·legible per a qualsevol tercer.

**Què és un certificat SSL?**

Un certificat és un document digital que prova la identitat d'un servidor. Conté la clau pública del servidor i la seva identitat verificada per una Autoritat de Certificació (CA).

Una Autoritat de Certificació (CA) és una organització de confiança que verifica que el domini que dius que controles realment és teu i emet el certificat. Els navegadors confien en una llista de CAs reconegudes. Si el teu certificat és emès per una CA de la llista, el navegador mostra el cadenat verd. Si no, mostra un avís de "connexió no segura" que espanta els usuaris.

**Per quèimporta tenir SSL: els cinc motius clau**

1. **Seguretat i privacitat** — xifra totes les comunicacions entre el servidor i l'usuari. Contrasenyes, dades de pagament i informació personal viatgen de manera il·legible per a tercers.  
2. **Confiança dels usuaris** — no tenir SSL vol dir que els navegadors com Google Chrome mostraran un missatge d'avís en la cara dels teus visitants. Un avís de "connexió no segura" destrueix la confiança de manera immediata.  
3. **SEO** — Google ha confirmat que SSL és un factor important de posicionament en Google. Amb un lloc web protegit per SSL, pots usar el protocol HTTP/2, que permet que les pàgines carreguin més ràpid i siguin més eficients.  
4. **Requisit legal i normatiu** — per a llocs web que processen dades personals (RGPD a Europa), el xifratge és obligatori. Per a e-commerce amb pagaments, és un requisit de PCI-DSS.  
5. **HTTP/2 i rendiment** — la majoria de navegadors únicament suporten HTTP/2 sobre connexions HTTPS. HTTP/2 és molt més ràpid que HTTP/1.1 (multiplexació de peticions, compressió de capçaleres), per tant SSL millora paradoxalment el rendiment.

**Tipus de certificats SSL**

* **DV (Domain Validation)** — verifica únicament que controles el domini. És el tipus que emet Let's Encrypt. Per al 99% dels llocs web, el DV de Let's Encrypt és tot el que necessites. Proporciona el mateix xifratge que un certificat EV de 500€.  
* **OV (Organization Validation)** — verifica que l'organització és real i legítima. Inclou el nom de l'empresa al certificat. Per a empreses que volen donar més confiança als seus usuaris.  
* **EV (Extended Validation)** — verificació exhaustiva de l'empresa. Antigament mostrava la barra verda amb el nom de l'empresa. Adequat per a bancs i grans e-commerce.

Let's Encrypt ofereix certificats de Domain Validation (DV). No ofereix OV o EV principalment perquè no pot automatitzar l'emissió per a aquells tipus de certificats.

**Què és Let's Encrypt**

Let's Encrypt és una Autoritat de Certificació (CA) gratuïta, automatitzada i oberta, gestionada pel benefici públic. És un servei proporcionat per l'Internet Security Research Group (ISRG). Oferim a les persones els certificats digitals que necessiten per habilitar HTTPS per a llocs web, de manera gratuïta, de la manera més amigable possible.

Les característiques: gratuït (qualsevol que posseeixi un nom de domini pot usar Let's Encrypt per obtenir un certificat de confiança a cost zero), automàtic (el software executant-se en un servidor web pot interactuar amb Let's Encrypt per obtenir un certificat de manera senzilla, configurar-lo de manera segura i renovar-lo automàticament), segur (Let's Encrypt serveix com a plataforma per avançar en les millors pràctiques de seguretat TLS), transparent (tots els certificats emesos o revocats es registren públicament i estan disponibles per a qualsevol) i obert (el protocol d'emissió i renovació automàtica és un estàndard obert que altres poden adoptar).

**Com funciona Let's Encrypt: el procés ACME**

L'objectiu de Let's Encrypt i el protocol ACME és fer possible configurar un servidor HTTPS i obtenir automàticament certificats de confiança del navegador sense cap intervenció humana. Això s'aconsegueix executant un client ACME en un servidor web.

El procés té dos passos:

**Pas 1: Provar que controles el domini** — el client ACME prova a la CA que el servidor web controla un domini. La CA pot donar al client l'opció de: crear un arxiu en una ruta especificada a l'http del lloc, o crear un registre DNS específic. Un cop el client ha completat un d'aquests passos, la CA verifica que els reptes s'han satisfet.

**Pas 2: Obtenir el certificat** — un cop demostrat el control del domini, el client sol·licita el certificat i Let's Encrypt l'emet automàticament.

**Com obtenir el certificat: Certbot**

La primera pregunta a respondre per les persones que volen comenzar amb Let's Encrypt és: el meu proveïdor d'allotjament obtindrà i gestionarà els certificats de Let's Encrypt per a mi, o necessito executar un client ACME jo mateix? Per a moltes persones, el seu proveïdor d'allotjament s'encarregarà. Si el teu proveïdor gestiona els certificats per a tu, o passarà automàticament o hi haurà una opció de configuració que hauràs d'habilitar.

Si tens accés al servidor (VPS), **Certbot** és el client ACME recomanat:

\# 1\. Instal·lar Certbot (Ubuntu/Debian)  
sudo apt install certbot python3-certbot-nginx \-y

\# 2\. Obtenir i instal·lar el certificat (configura Nginx automàticament)  
sudo certbot \--nginx \-d exemple.com \-d www.exemple.com

\# 3\. Verificar la renovació automàtica  
sudo certbot renew \--dry-run

En un servidor web Linux, executar dos comandos és suficient per configurar el xifratge HTTPS i adquirir i instal·lar certificats en un termini de 20 a 30 segons.

**Renovació automàtica: la gran comoditat**

Els certificats per defecte de Let's Encrypt són vàlids per 90 dies. Es recomana renovar els certificats de 90 dies cada 60 dies.

Certbot configura un cron job o systemd timer automàticament. Els certificats es renoven 30 dies abans de la caducitat. No cal fer res manualment: el servidor es renueva sol.

**En plataformes modernes: zero configuració**

Si uses Vercel, Netlify, Railway o la majoria de plataformes modernes de desplegament, **el certificat SSL és automàtic i gratuït**. Connectes el teu domini i la plataforma configura HTTPS automàticament sense que hagis de tocar res.

**Limitacions de Let's Encrypt**

Let's Encrypt no ofereix cap garantia en cas de fuita de dades. Si el teu lloc web és un negoci que processa targetes de crèdit o transmet informació sensible (com un lloc d'e-commerce), o té una secció de login d'usuaris, hauries de considerar un certificat de pagament professional.

Els límits tècnics: màxim 50 certificats per domini per setmana, els certificats caduquen als 90 dies (però es renoven automàticament), i la clau privada sempre es genera i gestiona en els teus propis servidors, mai per Let's Encrypt.

**Resum**

| Aspecte | Sense SSL (HTTP) | Amb SSL (HTTPS) |
| ----- | ----- | ----- |
| **Dades en trànsit** | Text pla, llegible per tothom | Xifrades, il·legibles per tercers |
| **Navegadors** | Mostren "No segur" ⚠️ | Mostren el cadenat 🔒 |
| **SEO** | Penalitzat per Google | Factor positiu de posicionament |
| **HTTP/2** | No disponible | Disponible (millor rendiment) |
| **Confiança** | Baixa | Alta |
| **Let's Encrypt** | — | Gratuït, automàtic, renovat sol |

