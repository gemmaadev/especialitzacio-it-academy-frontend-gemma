## **REST API: Principis, Disseny i Bones Pràctiques**

###### **REST API Tutorial** Tutorial introductori sobre els principis i bones pràctiques de les API REST. [*https://restfulapi.net/*](https://restfulapi.net/)

###### **Best Practices for REST API Design** Article de Stack Overflow Blog amb bones pràctiques per dissenyar API REST escalables. [*https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/*](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/) 

**Què és REST**

REST és un acrònim de REpresentational State Transfer i un estil arquitectural per a sistemes hipermèdia distribuïts. Roy Fielding el va presentar per primera vegada el 2000 en la seva famosa dissertació. 

Des de llavors, s'ha convertit en un dels enfocaments més àmpliament usats per construir APIs web. REST no és un protocol ni un estàndard, és un estil arquitectural. Durant la fase de desenvolupament, els developers de l'API poden implementar REST de diverses maneres. 

Una API Web que s'ajusta a l'estil arquitectural REST s'anomena REST API (o RESTful API).

**Els 6 principis guia de REST**

REST es basa en unes restriccions i principis que promouen la simplicitat, escalabilitat i statelessness en el disseny. Els sis principis guia o restriccions de l'arquitectura RESTful son:

**1\. Interfície Uniforme** — Aplicant el principi de generalitat a la interfície dels components, podem simplificar l'arquitectura general del sistema i millorar la visibilitat de les interaccions. En paraules simples, REST defineix una interfície consistent i uniforme per a les interaccions entre clients i servidors. Per exemple, les APIs REST basades en HTTP fan ús dels mètodes HTTP estàndard (GET, POST, PUT, DELETE, etc.) i els URIs per identificar recursos.

**2\. Client-Servidor** — El patró de disseny client-servidor imposa la separació de responsabilitats, que ajuda els components client i servidor a evolucionar independentment. En separar les preocupacions de la interfície d'usuari (client) de les preocupacions d'emmagatzematge de dades (servidor), millorem la portabilitat de la interfície d'usuari a través de múltiples plataformes i millorem l'escalabilitat simplificant els components del servidor.

**3\. Stateless** — El statelessness obliga que cada petició del client al servidor ha de contenir tota la informació necessària per entendre i completar la petició. El servidor no pot aprofitar cap informació de context emmagatzemada prèviament. Per aquesta raó, l'aplicació client ha de mantenir completament l'estat de sessió.

**4\. Cacheable** — La resposta ha d'indicar si és cacheable o no. Si és cacheable, el client pot reutilitzar la dada durant un període especificat.

**5\. Sistema per Capes** — Cada component únicament veu la capa immediata amb la qual interactua. Permet balancejadors de càrrega, CDNs i proxies transparents per al client.

**6\. Code on Demand (opcional)** — El servidor pot enviar codi executable al client (applets, scripts).

**Els Recursos REST: el concepte central**

La clau de l'abstracció d'informació a REST és el recurs. Qualsevol informació que puguem nomenar pot ser un recurs. L'estat del recurs en un moment particular es coneix com la representació del recurs. Les representacions del recurs consisteixen en: les dades, les metadades que descriuen les dades, i els enllaços hipermèdia que poden ajudar els clients a transitar al proper estat desitjat.

**Nomenament d'URLs: les regles fonamentals**

La convecció REST és que les URLs identifiquen **recursos** (substantius), i els mètodes HTTP identifiquen **accions** (verbs).

| ✅ URLs correctes (substantius, plural, en minúscules):GET    /api/usuaris             → obtenir tots els usuarisGET    /api/usuaris/42          → obtenir l'usuari amb ID 42POST   /api/usuaris             → crear un nou usuariPUT    /api/usuaris/42          → actualitzar completament l'usuari 42PATCH  /api/usuaris/42          → actualitzar parcialment l'usuari 42DELETE /api/usuaris/42          → eliminar l'usuari 42GET    /api/usuaris/42/comandes → comandes de l'usuari 42❌ URLs incorrectes (verbs a la URL, no RESTful):GET    /api/obtenirUsuarisPOST   /api/crearUsuariDELETE /api/eliminarUsuari/42GET    /api/getUser/42 |
| :---- |

**Els mètodes HTTP: semàntica correcta**

| Mètode | Acció | Idempotent? | Cos? | Resposta |
| ----- | ----- | ----- | ----- | ----- |
| **GET** | Obtenir | ✅ Sí | ❌ No | 200 \+ dades |
| **POST** | Crear | ❌ No | ✅ Sí | 201 \+ nou recurs |
| **PUT** | Substituir complet | ✅ Sí | ✅ Sí | 200 \+ recurs actualitzat |
| **PATCH** | Actualitzar parcial | ❌ No | ✅ Sí | 200 \+ recurs actualitzat |
| **DELETE** | Eliminar | ✅ Sí | ❌ No | 204 (sense cos) |

**Idempotent** significa que fer la mateixa petició N vegades produeix el mateix resultat que fer-la 1 vegada. PUT és idempotent (posar el mateix estat sempre dona el mateix resultat), POST no (cada crida crea un nou recurs).

**Les bones pràctiques de disseny REST (Stack Overflow Blog)**

### **1\. Retornar JSON (no XML)**

La majoria d'APIs modernes retornen JSON. Cal indicar-ho als headers:

| // ✅ Sempre incloure Content-Type a les respostesresponse.headers\['Content-Type'\] \= 'application/json';// ✅ Axios: envia i rep JSON automàticamentconst { data } \= await axios.get\<Usuari\[\]\>('/api/usuaris');// header Accept: application/json → enviat automàticament per Axios |
| :---- |

### **2\. Usar substantius en plural per a les col·leccions**

| ✅ /api/articles      (plural)✅ /api/usuaris✅ /api/comandes❌ /api/article       (singular)❌ /api/getUser       (verb) |
| :---- |

### 

### **3\. Aniuament per a relacions: màxim 2-3 nivells**

| ✅ /api/articles/12/comentaris          (2 nivells: correcte)✅ /api/usuaris/5/comandes              (2 nivells: correcte)⚠️ /api/articles/12/comentaris/3/respostes  (3 nivells: acceptable)❌ /api/a/b/c/d/e/f                     (massa profund: complex) |
| :---- |

### **4\. Gestió d'errors descriptiva**

| // ❌ Missatge d'error genèric i poc útil{ "error": "Error" }// ✅ Missatge d'error descriptiu i accionable{  "status": 400,  "error": "Bad Request",  "message": "El camp 'email' no té un format vàlid",  "timestamp": "2025-06-17T10:30:00Z",  "path": "/api/usuaris",  "errors": \[    { "camp": "email", "missatge": "Format invàlid" },    { "camp": "edat", "missatge": "Ha de ser un número positiu" }  \]} |
| :---- |

### **5\. Filtrar, ordenar i paginar via query params**

| GET /api/articles?estat=publicat\&autor=anna\&ordre=data\&page=2\&limit=10 |
| :---- |

| // Axios: gestió de query params amb l'opció 'params'const { data } \= await axios.get\<RespostaPaginada\<Article\>\>('/api/articles', {  params: {    estat: 'publicat',    autor: 'anna',    ordre: 'data',    page: 2,    limit: 10,  }}); |
| :---- |

### 

### **6\. Versionament de l'API**

| ✅ Via URL (el més comú i explícit):  https://api.exemple.com/v1/usuaris  https://api.exemple.com/v2/usuaris✅ Via header (menys visible però més "pur"):  Accept: application/vnd.exemple.v2+json❌ Sense versió: canvis trenquen tots els clients existents |
| :---- |

### **7\. Usar HTTPS sempre**

Totes les comunicacions han d'anar xifrades. Una API que usa HTTP en lloc de HTTPS exposa els tokens d'autenticació, les dades dels usuaris i qualsevol informació sensible a atacs de xarxa.

**Exemple complet: API RESTful de productes**

| // L'API seguint els principis REST// Axios al frontend, Express al backend (estructura de referència)// ─────────────── LLEGIR ───────────────// GET tots els productes amb filtre i paginacióconst productes \= await axios.get\<RespostaPaginada\<Producte\>\>('/api/v1/productes', {  params: { categoria: 'tecnologia', page: 1, limit: 20, ordre: 'preu' }});// → 200 OK \+ { dades: \[...\], paginacio: { total: 150, pagines: 8 } }// GET un producte concretconst producte \= await axios.get\<Producte\>('/api/v1/productes/42');// → 200 OK \+ { id: 42, nom: "Portàtil", preu: 999 }// → 404 Not Found si no existeix// ─────────────── CREAR ───────────────const nouProducte \= await axios.post\<Producte\>('/api/v1/productes', {  nom: 'Teclat Mecànic',  preu: 89.99,  categoriaId: 3,});// → 201 Created \+ { id: 99, nom: "Teclat Mecànic", ... }// → 400 Bad Request si falten camps obligatoris// ─────────────── ACTUALITZAR ───────────────// PUT: substitueix completament l'objecteawait axios.put('/api/v1/productes/42', {  nom: 'Portàtil Pro', preu: 1199, categoriaId: 3});// → 200 OK \+ objecte complet actualitzat// PATCH: actualitza únicament els camps enviatsawait axios.patch('/api/v1/productes/42', { preu: 899 });// → 200 OK \+ objecte complet amb el preu actualitzat// ─────────────── ELIMINAR ───────────────await axios.delete('/api/v1/productes/42');// → 204 No Content (sense cos de resposta)// → 404 Not Found si no existeix// ─────────────── RELACIÓ NIUADA ───────────────// Ressenyes d'un producte concretconst ressenyes \= await axios.get('/api/v1/productes/42/ressenyes');// → 200 OK \+ array de ressenyes del producte 42 |
| :---- |

**Resum: les regles d'or d'una API RESTful**

| Aspecte | Regla |
| ----- | ----- |
| **URLs** | Substantius en plural, minúscules, sense verbs |
| **Mètodes** | GET llegeix, POST crea, PUT/PATCH actualitza, DELETE elimina |
| **Respostes** | JSON sempre, amb `Content-Type: application/json` |
| **Codis HTTP** | 200/201/204 per a èxit, 4xx per a errors del client, 5xx per al servidor |
| **Errors** | Descriptius, amb missatge accionable i `timestamp` |
| **Paginació** | Sempre per a col·leccions: `?page=1&limit=20` |
| **Versió** | Sempre: `/api/v1/recurs` |
| **Seguretat** | HTTPS obligatori, autenticació per token (JWT, OAuth) |
| **Stateless** | Cada petició porta tota la informació necessària |

