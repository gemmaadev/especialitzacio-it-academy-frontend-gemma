## **Flux lògic: components bàsics i relació frontend-backend**

**Què és un flux de lògic?**  
[https://www.lucidchart.com/pages/es/que-es-un-diagrama-de-flujo](https://www.lucidchart.com/pages/es/que-es-un-diagrama-de-flujo)  
Guia bàsica per entendre i crear diagrames de flux.

**Exemples de fluxos i journeys amb Figma**  
[https://www.figma.com/community/file/1129569920411169134/user-flow-template-wireframe-flow](https://www.figma.com/community/file/1129569920411169134/user-flow-template-wireframe-flow)  
Plantilles de fluxos i recorreguts disponibles a Figma.

## **Què és un flux lògic?**

Un diagrama de flux és un diagrama que descriu un procés, sistema o algorisme informàtic. S'usa àmpliament per documentar, estudiar, planificar, millorar i comunicar processos que sovint són complexos, de manera clara i fàcil de comprendre.

En el context del desenvolupament web, un flux lògic és el mapa visual de com funciona una funcionalitat del sistema: quins passos segueix, qui fa cada cosa i quines decisions es prenen pel camí. Dibuixar-lo abans de programar t'obliga a pensar en tots els casos possibles, no només en el cas ideal en el qual tot funciona perfectament.

**Els components bàsics: la simbologia**

Hi ha cinc símbols principals que s'utilitzen en tots els diagrames de flux: l'oval indica l'inici o el final del procés, el rectangle indica un pas dins del procés, el símbol d'entrada/sortida mostra la informació que entra o surt del procés, les fletxes ressalten una ruta direccional, i el símbol del diamant indica on s'ha de prendre una decisió.

Desglossat per a un context web:

**Oval (terminal)** — marca on comença i on acaba el flux. Cada diagrama en té com a mínim dos.

**Rectangle (procés)** — una acció concreta que fa el sistema o l'usuari. Exemples: "l'usuari omple el formulari", "el servidor valida les dades", "es guarda a la base de dades".

**Rombe (decisió)** — una pregunta amb dues sortides: sí o no. Exemple: "les credencials són correctes?". És el punt on el flux es bifurca en dos camins.

**Paral·lelogram (entrada/sortida)** — dades que entren o surten. Exemple: "l'usuari introdueix el correu" o "es mostra el missatge d'error".

**Fletxes** — connecten tots els elements i indiquen l'ordre en el qual passen les coses.

**Frontend i backend: les dues parts del sistema**

Per entendre els fluxos lògics en aplicacions web, primer cal tenir clar el rol de cada part.

El **frontend** és tot el que veu i toca l'usuari: formularis, botons, pàgines, missatges. S'executa al navegador.

El **backend** és tot el que passa al servidor i que l'usuari no veu: lògica de negoci, validació de dades, connexió a la base de dades, seguretat. S'executa al servidor.

La **base de dades** és on es guarda la informació de manera persistent: usuaris, productes, comandes, etc.

En un flux lògic, cada capa té els seus propis rectangles. Veure les tres capes dibuixades juntes fa evident on acaba la responsabilitat del frontend i on comença la del backend.

**Com es comuniquen frontend i backend**

La comunicació entre les dues parts segueix sempre el mateix patró: el frontend fa una **petició** al backend, i el backend retorna una **resposta**. Cada vegada que hi ha una comunicació entre les dues capes, és un pas del diagrama.

Imagina el procés d'un login. L'usuari escriu el correu i la contrasenya (frontend) i clica "Entrar". El frontend envia les dades al backend. El backend comprova si l'usuari existeix a la base de dades i si la contrasenya és correcta. Si tot és correcte, retorna una resposta positiva. Si no, retorna un error. El frontend rep la resposta i o redirigeix l'usuari o mostra el missatge d'error.

El rombe de decisió és el punt clau d'aquest flux: "les credencials són correctes?" té dues sortides i el diagrama ha de contemplar les dues. Oblidar el camí de l'error és un dels errors més habituals quan no es dibuja el flux abans de programar.

**El diagrama de carrils: qui fa cada cosa**

El diagrama de carrils permet visualitzar com diferents entitats interactuen en diferents etapes, fins i tot simultàniament. Separa persones o equips quan cal mostrar diversos fluxos d'informació un al costat de l'altre.

En el context web, els carrils representen les capes del sistema. Un carril per a l'usuari, un per al frontend, un per al backend i un per a la base de dades. Cada rectangle es col·loca al carril corresponent a qui executa aquella acció, i les fletxes que creuen entre carrils representen les comunicacions entre capes.

Aquesta estructura és especialment útil per identificar responsabilitats: si un rectangle hauria d'estar en un carril però el poses en un altre, el diagrama evidencia immediatament la confusió de responsabilitats.

**Per a què serveix el flux lògic en el desenvolupament**

Els diagrames de flux poden demostrar com el codi està organitzat, visualitzar l'execució d'un codi dins d'un programa, mostrar l'estructura d'un lloc web o aplicació, i comprendre com els usuaris naveguen per un lloc web o programa.

En pràctica, dibuixar el flux lògic abans de programar t'ajuda a detectar passos que falten, a identificar decisions que no has contemplat i a comunicar el funcionament del sistema a persones que no llegeixen codi, com dissenyadors o clients. Un flux ben fet és la base per a qualsevol discussió tècnica en equip.

**Eines per crear fluxos lògics**

**Lucidchart** — eina online amb moltes plantilles, ideal per a diagrames professionals i col·laboració en equip. Té versió gratuïta.

**Draw.io (diagrams.net)** — completament gratuïta, funciona al navegador i es pot integrar amb Google Drive i VS Code.

**Figma** — molt popular entre dissenyadors, permet crear fluxos d'usuari combinats amb wireframes. Té plantilles de user flows ja preparades a la comunitat.

**Mermaid.js** — eina code-first que genera diagrames a partir de text. S'integra amb Markdown i GitHub, ideal per a documentació tècnica.

