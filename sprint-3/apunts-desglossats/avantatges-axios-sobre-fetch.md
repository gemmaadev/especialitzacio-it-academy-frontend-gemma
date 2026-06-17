**¿Quins avantatges ofereix Axios sobre Fetch en termes d'interceptors, cancel·lació de peticions i transformació automàtica de dades?**

**Documentació oficial de Fetch API**  
Guia de MDN per utilitzar la Fetch API en la realització de sol·licituds HTTP asíncrones.  
[https://developer.mozilla.org/en-US/docs/Web/API/Fetch\_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

**Documentació oficial d'Axios**  
Documentació oficial d’Axios, llibreria per fer sol·licituds HTTP de manera senzilla.  
[https://axios.rest/pages/getting-started/first-steps](https://axios.rest/pages/getting-started/first-steps)

**La diferència fonamental**

Fetch és una API integrada al navegador, disponible per defecte, sense instal·lació. Axios és una biblioteca de tercers basada en XMLHttpRequest que proporciona una API molt més rica.

La comparació no és "quina és millor", sinó "quina s'adapta millor a cada cas". Fetch és ideal per a tasques senzilles en aplicacions lleugeres. Axios és adequat per a aplicacions que requereixen funcionalitats avançades com cancel·lació de peticions, interceptors, i gestió d'errors complexa. Sovint és una bona elecció per a projectes més grans amb requisits més sofisticats.

**La sintaxi bàsica: el primer contrast**

| // FETCH: requereix doble await i parseig manual del JSONasync function obtenirUsuariFetch(id: number): Promise\<Usuari\> {  const resposta \= await fetch(\`/api/usuaris/${id}\`);  if (\!resposta.ok) {                    // ← cal verificar manualment\!    throw new Error(\`HTTP ${resposta.status}\`);  }  return resposta.json() as Promise\<Usuari\>; // ← parseig manual del JSON}// AXIOS: una sola crida, JSON parsejat automàticamentasync function obtenirUsuariAxios(id: number): Promise\<Usuari\> {  const { data } \= await axios.get\<Usuari\>(\`/api/usuaris/${id}\`);  return data;  // ← JSON ja parsejat, errors HTTP ja gestionats} |
| :---- |

**Avantatge 1: Transformació automàtica de dades (JSON)**

Axios realitza la transformació automàtica de les dades de petició i resposta de i cap a JSON, simplificant les interaccions amb APIs basades en JSON.

Axios automàticament transforma respostes JSON i simplifica la gestió d'errors. Fetch únicament rebutja una promesa quan hi ha un error de xarxa.

| // FETCH: has de serialitzar manualment el body i parseja manualment la respostaconst resposta \= await fetch('/api/usuaris', {  method: 'POST',  headers: { 'Content-Type': 'application/json' }, // ← cal especificar manualment  body: JSON.stringify({ nom: 'Anna', email: 'anna@e.com' }) // ← serialització manual});const dades \= await resposta.json(); // ← parseig manual// AXIOS: tot automàticconst { data } \= await axios.post\<Usuari\>('/api/usuaris', {  nom: 'Anna',  email: 'anna@e.com'  // ← l'objecte es serialitza automàticament a JSON  // ← el header Content-Type s'afegeix automàticament  // ← la resposta es parseja automàticament}); |
| :---- |

**Avantatge 2: Gestió d'errors HTTP automàtica**

Fetch únicament rebutja una promesa quan hi ha un error de xarxa. No rebutja errors HTTP (per exemple, 404 o 500). Els developers han de verificar manualment `response.ok` per gestionar errors HTTP. Axios, per altra banda, rebutja errors HTTP per defecte, fent la gestió d'errors més intuïtiva.

| // FETCH: error silent \-- un 404 no llança cap excepció\!try {  const resposta \= await fetch('/api/recurs-inexistent');  // ⚠️ AQUÍ NO ENTRA AL CATCH\! La resposta és vàlida per a Fetch  // resposta.ok \=== false, però la Promise s'ha resolt correctament  const dades \= await resposta.json(); // → pot retornar un missatge d'error} catch (error) {  // Únicament entra aquí si hi ha error de XARXA (offline, DNS, etc.)}// Per detectar errors HTTP, cal verificar manualment:const resposta \= await fetch('/api/usuaris/999');if (\!resposta.ok) {   // ← comprovació OBLIGATÒRIA amb Fetch  throw new Error(\`Error ${resposta.status}: ${resposta.statusText}\`);}// AXIOS: errors HTTP → automàticament al catchtry {  const { data } \= await axios.get('/api/recurs-inexistent');} catch (error) {  // ✅ Entra aquí per a 404, 500, 401, etc.  if (axios.isAxiosError(error)) {    console.error(error.response?.status);    // → 404    console.error(error.response?.data);      // → { message: "Not found" }  }} |
| :---- |

**Avantatge 3: Interceptors — el punt fort d'Axios**

Un dels avantatges clau d'Axios és la seva capacitat d'interceptar peticions HTTP. Els interceptors HTTP son útils quan necessites examinar o canviar peticions HTTP de la teva aplicació al servidor o viceversa (per exemple, logging, autenticació, o reintent d'una petició HTTP fallida). Amb interceptors, no hauràs d'escriure codi separat per a cada petició HTTP.

Els interceptors son middleware per a totes les peticions i respostes:

| import axios from 'axios';// Crear una instància d'Axios per al projecteconst apiClient \= axios.create({  baseURL: 'https://api.exemple.com',  timeout: 10000,  headers: { 'Accept': 'application/json' }});// INTERCEPTOR DE PETICIÓ: s'executa ABANS d'enviar cada peticióapiClient.interceptors.request.use(  (config) \=\> {    // Afegir el token d'autenticació automàticament a TOTES les peticions    const token \= localStorage.getItem('auth-token');    if (token) {      config.headers.Authorization \= \`Bearer ${token}\`;    }    // Log de debugging    console.log(\`\[API\] ${config.method?.toUpperCase()} ${config.url}\`);    return config;  },  (error) \=\> Promise.reject(error));// INTERCEPTOR DE RESPOSTA: s'executa quan arriba cada respostaapiClient.interceptors.response.use(  (response) \=\> {    // Transformació global de les dades (si l'API envolcalla en {data: {...}})    return response;  },  async (error) \=\> {    // Gestió centralitzada d'errors    if (error.response?.status \=== 401) {      // Token expirat → renovar automàticament i reintenta      await renovarToken();      return apiClient(error.config); // reintenta la petició original    }    if (error.response?.status \=== 403) {      window.location.href \= '/no-autoritzat';    }    if (error.response?.status \>= 500) {      mostrarNotificacioError('Error del servidor. Torna-ho a provar.');    }    return Promise.reject(error);  }); |
| :---- |

Els interceptors HTTP son útils quan vols establir una estratègia global de com gestionar peticions i respostes.

**Avantatge 4: Cancel·lació de peticions**

La capacitat de cancel·lar peticions pot ser vital en escenaris com inputs de cerca on les peticions poden necessitar ser cancel·lades i reiniciades freqüentment.

| // Cas d'ús: cerca en temps real// L'usuari escriu "re", "rea", "reac", "react"// No volem que les peticions anteriors arribin després de les noves// FETCH: cancel·lació manual amb AbortControllerlet controlador: AbortController | null \= null;function buscarFetch(query: string) {  if (controlador) {    controlador.abort();  // ← cancel·la la petició anterior  }  controlador \= new AbortController();  return fetch(\`/api/buscar?q=${query}\`, {    signal: controlador.signal  // ← connecta el controlador a la petició  });}// AXIOS: cancel·lació integrada i més llegiblelet cancelToken: AbortController | null \= null;async function buscarAxios(query: string) {  if (cancelToken) {    cancelToken.abort();  // ← cancel·la la petició anterior  }  cancelToken \= new AbortController();  try {    const { data } \= await axios.get('/api/buscar', {      params: { q: query },      signal: cancelToken.signal  // ← integrat directament    });    return data;  } catch (error) {    if (axios.isCancel(error)) {      console.log('Petició cancel·lada:', error.message);      // No propaguem l'error de cancel·lació      return null;    }    throw error;  }} |
| :---- |

**Avantatge 5: Timeout integrat**

La Fetch API no ofereix una manera directa d'establir un timeout. No obstant, pots usar els mecanismes `AbortController` i `AbortSignal` per cancel·lar manualment una petició després d'un cert temps.

| // FETCH: timeout manual (boilerplate necessari)async function fetchAmbTimeout(url: string, timeoutMs: number) {  const controller \= new AbortController();  const timeoutId \= setTimeout(() \=\> controller.abort(), timeoutMs);  try {    const resposta \= await fetch(url, { signal: controller.signal });    clearTimeout(timeoutId);    return resposta;  } catch (error) {    clearTimeout(timeoutId);    throw error;  }}// AXIOS: timeout en una sola línia de configuracióconst { data } \= await axios.get('/api/dades', {  timeout: 5000  // ← 5 segons, timeout automàtic});// Si triga més de 5s → error automàtic al catch |
| :---- |

**Avantatge 6: Instàncies amb configuració global**

Configura valors globals per defecte per a opcions de configuració comunes com la URL base, headers, o tokens d'autenticació. Això evita configuració repetitiva a cada petició i promou la consistència.

| // Configuració global reutilitzable per a tot el projecteconst apiClient \= axios.create({  baseURL: process.env.NEXT\_PUBLIC\_API\_URL,  timeout: 10000,  headers: {    'Content-Type': 'application/json',    'Accept': 'application/json',    'X-App-Version': '1.0.0'  }});// Totes les peticions usen la configuració globalconst usuaris \= await apiClient.get('/usuaris');     // → baseURL \+ /usuarisconst producte \= await apiClient.get('/productes/1'); // → baseURL \+ /productes/1 |
| :---- |

**Comparativa:** 

| Característica | Fetch | Axios |
| ----- | ----- | ----- |
| **Instal·lació** | Natiu (zero deps) | `npm install axios` |
| **Parseig JSON** | Manual (`res.json()`) | Automàtic |
| **Errors HTTP** | Cal verificar `res.ok` | Automàtic al catch |
| **Interceptors** | No (cal implementar) | ✅ Integrats |
| **Timeout** | Manual (AbortController) | ✅ Una línia |
| **Cancel·lació** | Manual (AbortController) | ✅ Integrada |
| **Configuració global** | No | ✅ `axios.create()` |
| **TypeScript** | Genèrics manuals | ✅ Millor suport |
| **Mida del bundle** | 0 KB (natiu) | \~13 KB |
| **Node.js** | v18+ nativament | ✅ Totes les versions |
| **Streaming** | ✅ Natiu | Limitat |
| **Ideal per a** | Projectes senzills | Aplicacions complexes |

**Quan usar cada un:**

Per a peticions bàsiques de dades, Fetch és típicament més adequat. En aplicacions enterprise, Axios ofereix avantatges distincts. Les seves funcionalitats integrades com interceptors, configuracions globals, i transformació automàtica de dades simplifiquen el manteniment del codi. 

Això fa Axios una millor opció per a aplicacions complexes on la gestió HTTP estructurada i consistent és crucial.

| Usa FETCH quan:  → Projecte petit o prototip ràpid  → Vols zero dependències externes  → Necessites streaming de respostes  → Les peticions son simples (GET, POST bàsic)  → App moderna (no cal suportar IE) Usa AXIOS quan:  → Aplicació gran amb moltes crides a APIs  → Necessites interceptors (autenticació global, retry)  → Vols gestió d'errors automàtica  → Necessites cancel·lació de peticions (cercadors, filtres)  → Necessites timeout fàcil de configurar  → Treballes amb TypeScript i vols millor DX |
| :---- |

