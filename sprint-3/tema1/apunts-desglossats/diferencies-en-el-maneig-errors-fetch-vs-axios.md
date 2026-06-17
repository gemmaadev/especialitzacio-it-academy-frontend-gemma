**Diferències en el maneig d'errors entre Fetch (necessitat de verificar ok) i Axios (errors automàtics per a codis 4xx/5xx).**

**La diferència fonamental**

La diferència més important entre Axios i el Fetch natiu és com gestionen els errors HTTP. Fetch considera qualsevol petició HTTP completada com un èxit — incloent 404, 500, i 503\. Has de verificar manualment `response.ok` o `response.status` per detectar errors.

Axios considera qualsevol codi d'estat fora del rang 2xx com un error i rebutja la promesa. Fetch considera qualsevol resposta HTTP vàlida (fins i tot 4xx o 5xx) com un èxit i resol la promesa.

| FETCH:  Petició HTTP → resposta 404 → ✅ Promise resolved (no error\!)  Petició HTTP → error de xarxa → ❌ Promise rejectedAXIOS:  Petició HTTP → resposta 2xx → ✅ Promise resolved  Petició HTTP → resposta 4xx/5xx → ❌ Promise rejected (automàticament\!)  Petició HTTP → error de xarxa → ❌ Promise rejected |
| :---- |

**El perill de Fetch: errors silenciosos**

La funció `fetch()` llançarà automàticament un error per errors de xarxa però NO per errors HTTP com les respostes 4xx o 5xx. Per a errors HTTP podem comprovar la propietat `response.ok` per veure si la petició ha fallat i rebutjar la promesa nosaltres mateixos.

| // ❌ El "gotcha" clàssic de Fetch:async function obtenirUsuari(id: number) {  const resposta \= await fetch(\`/api/usuaris/${id}\`);  // Si l'ID no existeix, el servidor retorna 404  // PERÒ: fetch() NO llança cap error\!  // resposta.ok \=== false, resposta.status \=== 404  // La Promise s'ha resolt correctament  const dades \= await resposta.json();  // Aquí dades pot ser: { error: "Not found" }  // El component no sap que ha fallat\!  return dades;  // ← retorna les dades d'error silenciosament}// El resultat: la UI mostra "undefined" o dades incorrectes// en lloc d'un missatge d'error → bugs difícils de detectar |
| :---- |

**La solució correcta amb Fetch: verificació manual obligatòria**

En el codi de Fetch, comprovar si la resposta és correcta i llançar un error si no ho és. En contrast, Axios rebutja automàticament la promesa per qualsevol codi d'estat HTTP fora del rang 2xx, fent la gestió d'errors més senzilla.

| // ✅ Fetch amb gestió completa d'errors:async function obtenirUsuariFetch(id: number): Promise\<Usuari\> {  let resposta: Response;  try {    resposta \= await fetch(\`/api/usuaris/${id}\`);  } catch (error) {    // Únicament arriba aquí per errors de XARXA    // (sense connexió, DNS, timeout manual, etc.)    throw new Error('Error de xarxa: no s\\'ha pogut connectar al servidor');  }  // Cal verificar manualment cada vegada  if (\!resposta.ok) {    // Intentar llegir el missatge d'error del cos de la resposta    let missatgeError \= \`Error HTTP ${resposta.status}\`;    try {      const cosError \= await resposta.json();      missatgeError \= cosError.message || missatgeError;    } catch {      // El cos no és JSON, usem el missatge per defecte    }    throw new Error(missatgeError);  }  // Ara sí podem parsajar el cos com a resposta exitosa  return resposta.json() as Promise\<Usuari\>;} |
| :---- |

El problema amb aquest enfocament és el **boilerplate**: has d'escriure el mateix codi de verificació en cada crida `fetch`. Aquest enfocament significa que tots dos tipus de peticions fallides — errors de xarxa i errors HTTP — es poden gestionar en un sol bloc `catch()`.

**Axios: tot al `catch` automàticament**

| // ✅ Axios: gestió d'errors molt més netaasync function obtenirUsuariAxios(id: number): Promise\<Usuari\> {  try {    const { data } \= await axios.get\<Usuari\>(\`/api/usuaris/${id}\`);    return data;  // ← únicament s'executa amb respostes 2xx  } catch (error) {    // Entra aquí per QUALSEVOL error: 4xx, 5xx, errors de xarxa    // tot en un sol lloc    throw error;  }} |
| :---- |

**L'objecte d'error d'Axios: molt més ric**

Axios rebutja promeses per errors de xarxa i codis d'estat HTTP d'error (4xx, 5xx), fent la gestió d'errors més intuïtiva. Quan captures l'error a Axios, tens accés a `error.response` (per a errors HTTP), `error.request` (per a errors de xarxa), o `error.message` (per a altres errors.

| // L'estructura completa de l'error d'Axios:try {  await axios.get('/api/usuaris/999');} catch (error) {  if (axios.isAxiosError(error)) {    if (error.response) {      // ← el servidor ha respost amb un codi d'error      console.log(error.response.status);   // → 404      console.log(error.response.data);     // → { message: "Usuari no trobat" }      console.log(error.response.headers);  // → capçaleres de la resposta    } else if (error.request) {      // ← la petició s'ha enviat però no hi ha hagut resposta      // (timeout, servidor no disponible, error de xarxa)      console.log('Sense resposta del servidor');      console.log(error.request);    } else {      // ← error en configurar la petició (codi del developer)      console.log('Error de configuració:', error.message);    }    console.log(error.config);  // ← la configuració de la petició original  }} |
| :---- |

**Comparativa directa: el mateix error, dues aproximacions**

| // Escenari: servidor retorna 401 (no autoritzat)// URL: /api/perfil (sense token d'autenticació)// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━// FETCH: cal gestió explícita a cada crida// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━async function fetchPerfil() {  const res \= await fetch('/api/perfil');  // ← sense aquest bloc, el 401 passa desapercebut\!  if (res.status \=== 401) {    // redirigir al login    window.location.href \= '/login';    return;  }  if (\!res.ok) {    throw new Error(\`Error ${res.status}\`);  }  return res.json();}// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━// AXIOS: la gestió centralitzada als interceptors// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━// Configurat UNA SOLA VEZ per a totes les peticions:apiClient.interceptors.response.use(  (response) \=\> response,  (error) \=\> {    if (error.response?.status \=== 401) {      window.location.href \= '/login';  // ← gestionat automàticament    }    return Promise.reject(error);  });// Totes les peticions estan cobertes sense cap boilerplate addicional:async function axiosPerfil() {  const { data } \= await apiClient.get('/api/perfil');  // ← si hi ha 401, l'interceptor ho gestiona abans d'arribar aquí  return data;} |
| :---- |

**Personalitzar quan Axios llança errors: `validateStatus`**

Per defecte, Axios rebutja qualsevol codi fora del rang 2xx. Però pots canviar-ho:

Per a Axios, és dissenyat per defecte que si el codi d'estat de la resposta és ≥200 i \<300, la promesa serà rebutjada. Pots personalitzar aquest comportament amb la propietat `validateStatus`.

| // Personalitzar quins codis es consideren "error"const { data } \= await axios.get('/api/recurs', {  validateStatus: (status) \=\> {    // Únicament considerar error si és \>= 500    // (els 4xx es tracten com a resposta "normal")    return status \< 500;  }});// O per a casos molt específics: acceptar qualsevol codiconst { data, status } \= await axios.get('/api/recurs', {  validateStatus: () \=\> true  // mai llança error per codi HTTP});// Ara gestem el status manualment (com Fetch)if (status \=== 404) { /\* ... \*/ } |
| :---- |

**Cmparació**  

| Situació | Fetch | Axios |
| ----- | ----- | ----- |
| **Resposta 200 OK** | ✅ Resol | ✅ Resol |
| **Resposta 404 Not Found** | ✅ Resol (cal verificar `ok`) | ❌ Rebutja automàticament |
| **Resposta 401 Unauthorized** | ✅ Resol (cal verificar `ok`) | ❌ Rebutja automàticament |
| **Resposta 500 Server Error** | ✅ Resol (cal verificar `ok`) | ❌ Rebutja automàticament |
| **Error de xarxa** | ❌ Rebutja | ❌ Rebutja |
| **Dades de la resposta d'error** | `await res.json()` manual | `error.response.data` directe |
| **Codi d'estat de l'error** | `res.status` | `error.response.status` |
| **Centralitzar la gestió** | Cal wrapper manual | ✅ Interceptors |
| **TypeScript** | Tipat manual | `axios.isAxiosError()` |

**Recomanació** 

La gestió d'errors és on Axios i Fetch difereixen més significativament. Per a aplicacions grans, Axios proporciona avantatges distincts. Fetch únicament rebutja en errors de xarxa. Un 404 o 500 es resol correctament — has de verificar `response.ok` tu mateix cada vegada.

| Usa FETCH quan:  → Poques crides puntuals  → Vols zero dependències  → Ets conscient del patró i el recordes sempreUsa AXIOS quan:  → Moltes crides a l'API  → Necessites gestió d'errors centralitzada (interceptors)  → Treballes en equip (el patró de Fetch és fàcil d'oblidar)  → Vols que un 404 o 500 sempre sigui un error sense pensar-hi |
| :---- |

