**¿Quins són els beneficis dels interceptors d'Axios per a gestió centralitzada d'autenticació i errors?**

###### **Documentació oficial d'Axios** [https://axios.rest/pages/getting-started/first-steps](https://axios.rest/pages/getting-started/first-steps) 

Documentació oficial d’Axios, llibreria per fer sol·licituds HTTP de manera senzilla.

**Què són els interceptors i per què existeixen**

Els interceptors d'Axios son funcions que Axios crida per a cada petició o resposta. Essencialment, aquests interceptors et donen la capacitat d'executar el teu codi o modificar la petició/resposta abans que la petició s'enviï o abans que la promesa es retorni al codi client. Aquesta funcionalitat és particularment útil per a logging, autenticació, i gestió d'errors de manera uniforme en totes les crides a l'API.

La metàfora perfecta: els interceptors son **middleware HTTP** per a les peticions del frontend. Igual que el middleware d'Express s'executa per a cada petició al servidor, els interceptors d'Axios s'executen per a cada petició del client.

| Sense interceptors:                    Amb interceptors:  Component A → afegir token          Component A ─────────────────┐  Component B → afegir token          Component B ─────────────────┤ Interceptor  Component C → afegir token          Component C ─────────────────┘ Request  Component A → gestionar 401         (afegeix token a TOTES)  Component B → gestionar 401  Component C → gestionar 401         Si 401 → Interceptor Response  (lògica duplicada N vegades)        (gestiona per a TOTES) |
| :---- |

**La instància Axios: la base de tot**

Crear una instància Axios dedicada permet la configuració centralitzada, fent les crides a l'API més manejables i consistents. No necessitaràs repetir headers o la URL base per a cada petició. Totes les peticions passen automàticament pels interceptors.

| // api/client.ts \-- el punt central de totes les peticions HTTPimport axios from 'axios';const apiClient \= axios.create({  baseURL: import.meta.env.VITE\_API\_URL || 'http://localhost:3000/api',  timeout: 10\_000,  headers: {    'Content-Type': 'application/json',    'Accept': 'application/json',  },});export default apiClient; |
| :---- |

**Interceptor de Petició: injectar el token automàticament**

Abans d'abordar l'interceptor per a errors 401, afegim un interceptor per injectar el token d'accés a cada petició sortint. Això assegura que totes les peticions estiguin autenticades sense requerir gestió manual del token per a cada crida.

| // Interceptor de PETICIÓ: s'executa ABANS d'enviar cada peticióapiClient.interceptors.request.use(  (config) \=\> {    // Afegir el token d'autenticació a totes les peticions automàticament    const token \= localStorage.getItem('access-token');    if (token) {      config.headers.Authorization \= \`Bearer ${token}\`;    }    // Log de debugging (únicament en development)    if (import.meta.env.DEV) {      console.log(\`→ \[API\] ${config.method?.toUpperCase()} ${config.url}\`);    }    return config;  // ← OBLIGATORI: retornar la config modificada  },  (error) \=\> {    // Error en configurar la petició (rarament ocorre)    return Promise.reject(error);  }); |
| :---- |

**Interceptor de resposta: gestió centralitzada d'errors**

| // Interceptor de RESPOSTA: s'executa quan arriba cada respostaapiClient.interceptors.response.use(  // ← ÈXIT: la resposta té un codi 2xx  (response) \=\> {    if (import.meta.env.DEV) {      console.log(\`← \[API\] ${response.status} ${response.config.url}\`);    }    return response;  },  // ← ERROR: la resposta té un codi 4xx o 5xx (o error de xarxa)  (error) \=\> {    if (axios.isAxiosError(error) && error.response) {      switch (error.response.status) {        case 400:          // Error de validació: mostrar missatge específic del cos          console.warn('Dades invàlides:', error.response.data);          break;        case 401:          // No autoritzat: redirigir al login          localStorage.removeItem('access-token');          window.location.href \= '/login';          break;        case 403:          // Prohibit: mostrar pàgina de no autoritzat          window.location.href \= '/no-autoritzat';          break;        case 429:          // Rate limiting: mostrar missatge d'espera          mostrarToast('Massa peticions. Espera un moment.', 'warning');          break;        case 500:        case 502:        case 503:          // Errors del servidor: notificació global          mostrarToast('Error del servidor. Torna-ho a provar.', 'error');          break;      }    } else if (\!error.response) {      // Error de xarxa: sense resposta del servidor      mostrarToast('Sense connexió a internet.', 'error');    }    return Promise.reject(error);  // ← propaguem l'error al component  }); |
| :---- |

**El cas avançat: renovació automàtica del token (Refresh Token)**

Els interceptors poden detectar quan un token d'autenticació ha expirat. Abans de permetre que una petició fallida causi un error a l'aplicació, un interceptor pot intentar renovar el token i reintentar la petició original automàticament. Els usuaris romanen connectats sense recarregar la pàgina ni connectar-se de nou.

| // Variables per gestionar la renovació concurrentlet estaRenovant \= false;let peticionsPendents: Array\<{  resolve: (token: string) \=\> void;  reject: (error: unknown) \=\> void;}\> \= \[\];async function renovarAccessToken(): Promise\<string\> {  const refreshToken \= localStorage.getItem('refresh-token');  if (\!refreshToken) throw new Error('No hi ha refresh token');  // Usar axios directament (NO apiClient) per evitar interceptors en bucle  const { data } \= await axios.post(\`${import.meta.env.VITE\_API\_URL}/auth/refresh\`, {    refreshToken  });  localStorage.setItem('access-token', data.accessToken);  return data.accessToken;}apiClient.interceptors.response.use(  (response) \=\> response,  async (error) \=\> {    const configOriginal \= error.config;    // Únicament actuar en errors 401 que no siguin del propi endpoint de renovació    if (      error.response?.status \!== 401 ||      configOriginal.\_retry ||              // ← evitar bucle infinit      configOriginal.url?.includes('/auth/refresh')    ) {      return Promise.reject(error);    }    if (estaRenovant) {      // Ja hi ha una renovació en curs → encuar la petició      return new Promise\<string\>((resolve, reject) \=\> {        peticionsPendents.push({ resolve, reject });      }).then(token \=\> {        // Quan s'obté el nou token, reintenta aquesta petició        configOriginal.headers.Authorization \= \`Bearer ${token}\`;        return apiClient(configOriginal);      });    }    // Iniciar el procés de renovació    configOriginal.\_retry \= true;    estaRenovant \= true;    try {      const nouToken \= await renovarAccessToken();      // Processar totes les peticions que estaven en cua      peticionsPendents.forEach(({ resolve }) \=\> resolve(nouToken));      peticionsPendents \= \[\];      // Reintentar la petició original amb el nou token      configOriginal.headers.Authorization \= \`Bearer ${nouToken}\`;      return apiClient(configOriginal);    } catch (errorRenovacio) {      // La renovació ha fallat → tancar sessió      peticionsPendents.forEach(({ reject }) \=\> reject(errorRenovacio));      peticionsPendents \= \[\];      localStorage.clear();      window.location.href \= '/login';      return Promise.reject(errorRenovacio);    } finally {      estaRenovant \= false;    }  }); |
| :---- |

**Interceptors per a logging i monitoring**

| // Afegir metadades de timing a cada peticióapiClient.interceptors.request.use((config) \=\> {  config.metadata \= { tempsInici: Date.now() };  return config;});apiClient.interceptors.response.use(  (response) \=\> {    const durada \= Date.now() \- response.config.metadata?.tempsInici;    // Enviar mètriques al sistema de monitoring    analytics.track('api\_call', {      url: response.config.url,      metode: response.config.method,      status: response.status,      duradaMs: durada,    });    return response;  },  (error) \=\> {    const durada \= Date.now() \- error.config?.metadata?.tempsInici;    // Registrar els errors a un servei com Sentry    Sentry.captureException(error, {      extra: {        url: error.config?.url,        status: error.response?.status,        duradaMs: durada,      }    });    return Promise.reject(error);  }); |
| :---- |

**Eliminar interceptors quan no calen: `eject`**

| // Afegir un interceptor i guardar el seu IDconst idInterceptor \= apiClient.interceptors.request.use((config) \=\> {  config.headers\['X-Debug'\] \= 'true';  return config;});// Eliminar l'interceptor quan ja no calapiClient.interceptors.request.eject(idInterceptor); |
| :---- |

**El flux complet amb tots els interceptors**

| Component fa: await apiClient.get('/api/usuaris')        ↓\[Interceptor Petició \#1: Logging\]  → console.log("→ GET /api/usuaris")  → afegir timestamp        ↓\[Interceptor Petició \#2: Autenticació\]  → llegir token de localStorage  → config.headers.Authorization \= "Bearer eyJ..."        ↓HTTP GET /api/usuaris ──────────────────→ SERVIDOR                      ←────────────────── 401 Token expirat        ↓\[Interceptor Resposta: Error 401\]  → \_retry \= false? SÍ → iniciar renovació  → POST /auth/refresh → nou token  → reintentar: GET /api/usuaris amb nou token                      ←────────────────── 200 OK { data: \[...\] }        ↓\[Interceptor Resposta: Èxit\]  → logging de la durada  → enviar mètriques        ↓Component rep: { data: \[usuari1, usuari2, ...\] }(sense saber que hi ha hagut una renovació automàtica\!) |
| :---- |

## **Resum beneficis principals**

| Benefici | Sense interceptors | Amb interceptors |
| ----- | ----- | ----- |
| **Injectar el token** | `headers.Authorization` a cada crida | ✅ Automàtic en totes les peticions |
| **Renovació de token** | Lògica a cada component | ✅ Transparent, l'usuari no ho nota |
| **Errors 401/403** | Verificar a cada component | ✅ Redirecció global automàtica |
| **Errors de servidor** | Toast a cada component | ✅ Un sol lloc |
| **Logging** | `console.log` manual a cada crida | ✅ Centralitzat amb timing |
| **Principi DRY** | Codi duplicat N vegades | ✅ Una sola implementació |

