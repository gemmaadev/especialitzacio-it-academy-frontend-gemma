## **Apunts T1 — Connexió a APIs des del Frontend: Fetch i Axios**

**1\. Fonaments: HTTP i RESTful APIs**

Una **API REST** (REpresentational State Transfer) és un estil arquitectural per a sistemes distribuïts definit per Roy Fielding el 2000\. 

No és un protocol sinó un conjunt de principis: interfície uniforme, client-servidor separat, stateless (cada petició porta tota la informació necessària), cacheable, sistema per capes, i opcionalment code-on-demand.

La convenció fonamental: les **URLs identifiquen recursos** (substantius), i els **mètodes HTTP identifiquen accions** (verbs).

| GET    /api/usuaris          → obtenir totsGET    /api/usuaris/42       → obtenir unPOST   /api/usuaris          → crear (201 Created)PUT    /api/usuaris/42       → substituir complet (200 OK)PATCH  /api/usuaris/42       → actualitzar parcial (200 OK)DELETE /api/usuaris/42       → eliminar (204 No Content) |
| :---- |

Els **codis d'estat HTTP** comuniquen el resultat: 

2xx (èxit), 

3xx (redirecció), 

4xx (error del client — no reintentar), 

5xx (error del servidor — sí reintentar amb backoff). 

Els més importants: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity, 429 Too Many Requests, 500 Internal Server Error.

**2\. Fetch vs. Axios: la diferència clau**

**Fetch** és natiu del navegador i Node.js v18+. Zero dependències, zero instal·lació, 0 KB de bundle. **Axios** és una biblioteca (\~13 KB) que proporciona una API molt més rica.

La diferència fonamental en la gestió d'errors:

| // FETCH: un 404 NO llança error\! Cal verificació manual obligatòriaconst resposta \= await fetch('/api/usuaris/999');if (\!resposta.ok) throw new Error(\`HTTP ${resposta.status}\`);  // ← OBLIGATORIconst dades \= await resposta.json();  // ← parseig manual// AXIOS: qualsevol 4xx/5xx va automàticament al catchtry {  const { data } \= await axios.get\<Usuari\>('/api/usuaris/999');} catch (error) {  if (axios.isAxiosError(error)) {    error.response?.status;   // → 404    error.response?.data;     // → { message: "Not found" }  }} |
| :---- |

**Avantatges d'Axios sobre Fetch:** transformació automàtica JSON (request i response), errors HTTP automàtics al `catch`, interceptors de petició/resposta, timeout en una línia (`timeout: 5000`), cancel·lació integrada, instàncies amb configuració global (`axios.create()`), millor suport TypeScript.

**Quan usar Fetch:** biblioteques npm (zero dependències), scripts simples, Edge Computing (Cloudflare Workers), streaming natiu, Next.js (que l'estén amb caching propi), projectes petits.

**Quan usar Axios:** aplicacions grans amb moltes crides, gestió centralitzada d'autenticació, interceptors, equips, TypeScript avançat.

**3\. La instància Axios: el punt central**

| // api/client.ts \-- totes les crides passen per aquíconst apiClient \= axios.create({  baseURL: import.meta.env.VITE\_API\_URL,  timeout: 10\_000,  headers: {    'Content-Type': 'application/json',    'Accept': 'application/json',  },}); |
| :---- |

**4\. Interceptors: autenticació i errors centralitzats**

Els interceptors son middleware per a totes les peticions/respostes. La lògica d'autenticació s'escriu una sola vegada:

| // Interceptor de PETICIÓ: afegir token automàticamentapiClient.interceptors.request.use((config) \=\> {  const token \= localStorage.getItem('access-token');  if (token) config.headers.Authorization \= \`Bearer ${token}\`;  return config;});// Interceptor de RESPOSTA: gestionar errors globalmentapiClient.interceptors.response.use(  (response) \=\> response,  async (error) \=\> {    switch (error.response?.status) {      case 401: await renovarTokenIReintentar(error); break;      case 403: window.location.href \= '/no-autoritzat'; break;      case 429: mostrarToast('Massa peticions. Espera.'); break;      case 500: mostrarToast('Error del servidor.'); break;    }    if (\!error.response) mostrarToast('Sense connexió.');    return Promise.reject(error);  }); |
| :---- |

**5\. Peticions asíncrones: seqüencial vs. paral·lel**

La distinció fonamental: les peticions seqüencials s'executen una rere l'altra (quan B depèn del resultat de A). Les paral·leles s'envien totes alhora quan son independents.

| // SEQÜENCIAL: B depèn d'Aconst usuari \= await axios.get(\`/api/usuaris/${id}\`);const dept \= await axios.get(\`/api/depts/${usuari.data.deptId}\`);// Temps: T\_usuari \+ T\_dept// PARAL·LEL: A, B i C son independentsconst \[perfil, comandes, notifs\] \= await Promise.all(\[  axios.get(\`/api/perfil/${id}\`),    // 300ms  axios.get(\`/api/comandes/${id}\`),  // 500ms  axios.get(\`/api/notifs/${id}\`),    // 200ms\]);// Temps: max(300, 500, 200\) \= 500ms → 2x més ràpid\! |
| :---- |

Les quatre eines per a escenaris complexos:

| Eina | Comportament | Quan usar |
| ----- | ----- | ----- |
| `Promise.all` | Tot o res — falla si qualsevol falla | Totes necessàries |
| `Promise.allSettled` | Continua encara que alguna falli | Algunes opcionals |
| `Promise.race` | El primer resultat (èxit o error) | Timeout, CDN fallback |
| `Promise.any` | El primer èxit | Múltiples fonts alternatives |

**6\. States de càrrega i error: UX correcta**

| // Estat discriminat: evita combinacions impossiblestype EstatAPI\<T\> \=  | { status: 'inactiu' }  | { status: 'carregant' }  | { status: 'exit'; dades: T }  | { status: 'error'; error: Error; potReintentar: boolean }; |
| :---- |

Bones pràctiques de UX: **skeleton loaders** en lloc de spinners per a la càrrega inicial (redueix el temps de càrrega percebut), **missatges d'error traduïts** (l'usuari entén quèha passat i quèpot fer), **Error Boundaries** per seccions independents (un error no trenca tota l'app), **retry amb exponential backoff** per a errors 5xx, **cancel·lar peticions** en `useEffect` cleanup per evitar memory leaks, i **Optimistic UI** per a accions que gairebé sempre surten bé.

**7\. Paginació i cerca amb Query Params**

| // Axios serialitza els params automàticamentconst { data } \= await apiClient.get('/api/productes', {  params: {    page: 2,    limit: 10,    cerca: 'portàtil',    categoria: 'tecnologia',    ordre: 'preu',  }  // URL: /api/productes?page=2\&limit=10\&cerca=port%C3%A0til&...}); |
| :---- |

**Debounce per a la cerca**: esperar que l'usuari pari d'escriure (300-400ms) abans d'enviar la petició. Evita una petició per cada tecla.

**Sincronitzar l'estat amb la URL** (`useSearchParams`): permet compartir l'enllaç i preservar l'estat en recarregar la pàgina.

**8\. Seguretat en Connexions Frontend-API**

### **CORS (Cross-Origin Resource Sharing)**

El navegador bloqueja peticions cross-origin sense les capçaleres correctes. El servidor ha de tenir una llista blanca d'orígens. `Access-Control-Allow-Origin: *` és insegur en producció.

### **XSS (Cross-Site Scripting)**

Scripts maliciosos injectats que roben tokens. Mitigació: usar `textContent` en lloc d'`innerHTML`, sanititzar HTML amb DOMPurify, Content Security Policy (CSP), i guardar tokens en HttpOnly cookies (no accessibles per JavaScript).

### **CSRF (Cross-Site Request Forgery)**

Peticions malicioses en nom de l'usuari. Mitigació: `SameSite=Strict` a les cookies, CSRF tokens, capçaleres personalitzades (`X-Requested-With`).

### **Secrets al frontend**

| // ❌ MAI: API keys secretes al codi del navegadorconst SK \= 'sk\_live\_abc123';  // qualsevol pot llegir-la\!// ✅ CORRECTE: el frontend crida el seu backend, el backend crida l'APIconst { data } \= await apiClient.post('/api/proxy/pagament', { amount: 100 }); |
| :---- |

### **Capçaleres HTTP de seguretat (configura el servidor, verifica al DevTools):**

| Content-Security-Policy: default-src 'self'Strict-Transport-Security: max-age=31536000X-Frame-Options: DENYX-Content-Type-Options: nosniff |
| :---- |

**9\. Els codis HTTP més importants per al Frontend**

| 2xx ÈXIT:  200 OK           → GET, PUT, PATCH exitosos  201 Created      → POST que crea un recurs  204 No Content   → DELETE (sense cos de resposta)4xx ERROR DEL CLIENT (no reintentar sense canviar la petició):  400 Bad Request  → validació fallida → mostrar errors de camp  401 Unauthorized → token absent/expirat → login  403 Forbidden    → autenticat però sense permisos → pàgina 403  404 Not Found    → recurs inexistent → pàgina 404  422 Unprocessable→ validació semàntica → errors de camp  429 Too Many     → rate limiting → esperar Retry-After5xx ERROR DEL SERVIDOR (reintentar amb exponential backoff):  500 Internal     → error genèric → notificació \+ retry  502 Bad Gateway  → proxy falla → retry  503 Unavailable  → sobrecàrrega/manteniment → retry \+ missatge |
| :---- |

**10\. El flux complet d'una connexió segura**

| Component React fa una crida a l'API         ↓\[Interceptor de petició\]  → Afegeix Bearer token al header Authorization  → Log de debugging (únicament en dev)         ↓HTTPS → el tràfic viatja xifrat         ↓Servidor: verifica CORS, autentica, processa         ↓\[Interceptor de resposta\]  → 2xx → dades al component ✅  → 401 → intent de renovar token → retry automàtic  → 403 → redirecció a pàgina d'error  → 4xx → propaga l'error al component  → 5xx → retry amb exponential backoff  → Xarxa → "Sense connexió" toast         ↓Component gestiona l'estat (carregant/exit/error)  → Skeleton loader mentre carrega  → Dades renderitzades en èxit  → Missatge descriptiu en error \+ botó de reintent |
| :---- |

