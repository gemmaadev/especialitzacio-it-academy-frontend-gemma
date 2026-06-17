###### **Codis d'Estat HTTP: Referència Completa per a Developers**

###### **HTTP Status Codes Explained**

Referència completa de codis d’estat HTTP i el seu significat.  
[https://www.webfx.com/web-development/glossary/](https://www.webfx.com/web-development/glossary/) 

**Què són i per què importan**

Els codis d'estat HTTP son inclosos en cada resposta HTTP i comuniquen el resultat d'una petició. El primer dígit indica la classe de resposta, i els dos dígits següents proporcionen detall addicional.

En el context de Fetch i Axios: Fetch únicament llança error per codis 4xx/5xx si tu fas la verificació manual (`response.ok`). Axios llança errors automàticament per qualsevol codi fora del rang 2xx. Entendre els codis és essencial per gestionar cada cas correctament al frontend.

**1xx — Informacionals**

Els codis 1xx son respostes informacionals que indiquen que el servidor ha rebut la petició i continua processant-la.

| Codi | Nom | Significat pràctic |
| ----- | ----- | ----- |
| **100** | Continue | El servidor ha rebut les capçaleres i el client pot continuar |
| **101** | Switching Protocols | Transició a WebSockets |
| **103** | Early Hints | El servidor envia hints de links mentre prepara la resposta |

Els codis 1xx rarament es gestionen manualment des del frontend.

**2xx — Èxit: la petició ha funcionat**

Els codis 2xx signifiquen que la petició va ser rebuda, entesa i acceptada.

| // Els codis 2xx més importants per al frontend:// 200 OK \-- la resposta universal d'èxit// GET /api/usuaris → 200 \+ array d'usuarisconst { data } \= await axios.get('/api/usuaris');  // → data: Usuari\[\]// 201 Created \-- creat un nou recurs// POST /api/usuaris → 201 \+ el nou usuari amb IDconst { data, headers } \= await axios.post('/api/usuaris', { nom: 'Anna' });// headers.location → '/api/usuaris/42' (on trobar el nou recurs)// 204 No Content \-- èxit sense cos de resposta// DELETE /api/usuaris/1 → 204 (sense cos)await axios.delete('/api/usuaris/1');// ← no intentis llegir data, no hi ha res\!// 202 Accepted \-- acceptat però processant en segon pla// POST /api/exportar → 202 (l'exportació s'encua)// La resposta inclou sovint un ID per consultar l'estat posterior |
| :---- |

| Codi | Nom | Quan usar |
| ----- | ----- | ----- |
| **200** | OK | GET exitós, PUT/PATCH que retorna l'objecte |
| **201** | Created | POST que crea un nou recurs |
| **202** | Accepted | Operació asíncrona encuada |
| **204** | No Content | DELETE o PUT que no retorna cos |
| **206** | Partial Content | Descàrregues parcials (Range requests) |

**3xx — Redirecció**

Els codis 3xx indiquen que el client ha de prendre una acció addicional — típicament seguir una redirecció — per completar la petició.

Els navegadors gestionen les redireccions automàticament. Axios i Fetch les segueixen per defecte en el context del navegador.

| // 301 Moved Permanently: l'endpoint ha canviat de lloc per sempre// El navegador actualitza el bookmark automàticament// Axios segueix la redirecció de manera transparent// 302 Found (Temporary Redirect): redirecció temporal// Útil per a manteniment o login obligatori// 304 Not Modified: la caché és vàlida, no cal descarregar de nou// El servidor retorna 304 quan el client envia If-Modified-Since// i el recurs no ha canviat → estalvia ample de banda |
| :---- |

| Codi | Nom | Quan ocorre |
| :---- | ----- | ----- |
| **301** | Moved Permanently | Endpoint reubicat definitivament |
| **302** | Found | Redirecció temporal |
| **304** | Not Modified | Caché vàlida, no cal re-descarregar |
| **307** | Temporary Redirect | Com 302 però conserva el mètode HTTP |
| **308** | Permanent Redirect | Com 301 però conserva el mètode HTTP |

**4xx — Errors del client: el frontend ha enviat alguna cosa incorrecta**

Els codis 4xx indiquen errors del client — la petició era invàlida, no autoritzada, o malformada, i el client ha de modificar la petició abans de reintentar. Els errors 4xx no val la pena reintentar-los sense canviar la petició.

| // Gestió tipada dels errors 4xx més comuns:apiClient.interceptors.response.use(  res \=\> res,  (error: AxiosError) \=\> {    switch (error.response?.status) {      case 400: // Bad Request        // El cos de la petició és invàlid o té errors de validació        // Resposta típica: { errors: { camp: \['missatge'\] } }        const errors \= error.response.data as { errors: Record\<string, string\[\]\> };        mostrarErrorsValidacio(errors);        break;      case 401: // Unauthorized        // Token absent, expirat o invàlid        // Acció: redirigir al login o intentar renovar el token        redirigirAlLogin();        break;      case 403: // Forbidden        // Autenticat PERÒ sense permisos per a aquest recurs        // Diferent de 401: saps qui ets però no pots fer-ho        mostrarPaginaNoAutoritzat();        break;      case 404: // Not Found        // El recurs no existeix        // Acció: mostrar pàgina 404 o missatge específic        break;      case 409: // Conflict        // Conflicte d'estat: email ja registrat, edició concurrent        mostrarMissatge('Aquest email ja existeix');        break;      case 422: // Unprocessable Entity        // Sintaxi correcta però dades semànticament incorrectes        // Molt usat per a errors de validació en APIs REST modernes        break;      case 429: // Too Many Requests        // Rate limiting: massa peticions en poc temps        // La resposta inclou Retry-After: quants segons esperar        const retryAfter \= error.response.headers\['retry-after'\];        mostrarMissatge(\`Massa peticions. Torna-ho a provar en ${retryAfter}s\`);        break;    }    return Promise.reject(error);  }); |
| :---- |

| Codi | Nom | Causa habitual | Acció al frontend |
| ----- | ----- | ----- | ----- |
| **400** | Bad Request | JSON malformat, validació | Mostrar errors de validació |
| **401** | Unauthorized | Token absent/expirat | Redirigir al login |
| **403** | Forbidden | Sense permisos | Pàgina "No autoritzat" |
| **404** | Not Found | Recurs inexistent | Missatge o pàgina 404 |
| **405** | Method Not Allowed | GET on cal POST | Revisar el mètode HTTP |
| **409** | Conflict | Duplicat, concurrència | Mostrar conflicte |
| **410** | Gone | Eliminat permanentment | Com 404 però definitiu |
| **422** | Unprocessable Entity | Validació semàntica | Mostrar errors de camp |
| **429** | Too Many Requests | Rate limiting | Esperar i reintentar |

**5xx — Errors del Servidor: el problema és al backend**

Els codis 5xx indiquen errors del servidor. La petició semblava vàlida, però el servidor va trobar un problema en intentar-la processar. La distinció clau: els errors 5xx son transitoris i val la pena reintentar-los amb exponential backoff. Els errors 4xx no tindran èxit en el reintent tret que la petició canviï.

| // Els 5xx mereixen retry automàtic (a diferència dels 4xx)async function fetchAmbRetry\<T\>(url: string, maxIntents \= 3): Promise\<T\> {  for (let intent \= 0; intent \< maxIntents; intent++) {    try {      const { data } \= await apiClient.get\<T\>(url);      return data;    } catch (error) {      if (\!axios.isAxiosError(error)) throw error;      const status \= error.response?.status;      const esError5xx \= status && status \>= 500;      const esUltimIntent \= intent \=== maxIntents \- 1;      // ✅ 5xx: reintentar (problema transitori del servidor)      // ❌ 4xx: no reintentar (el client ha d'arreglar la petició)      if (\!esError5xx || esUltimIntent) throw error;      // Exponential backoff: 1s, 2s, 4s...      await new Promise(r \=\> setTimeout(r, 1000 \* Math.pow(2, intent)));    }  }  throw new Error('Màxim d\\'intents assolit');} |
| :---- |

| Codi | Nom | Causa habitual | Acció al frontend |
| ----- | ----- | ----- | ----- |
| **500** | Internal Server Error | Error genèric del servidor | Notificació \+ retry |
| **501** | Not Implemented | Endpoint no implementat | No reintentar |
| **502** | Bad Gateway | Proxy o CDN falla | Retry amb backoff |
| **503** | Service Unavailable | Servidor sobrecarregat / manteniment | Retry \+ missatge d'espera |
| **504** | Gateway Timeout | El backend no respon a temps | Retry amb backoff |

**La distinció crítica per al frontend: 401 vs 403**

401 i 403 son errors d'autenticació i autorització. Usa 401 quan l'usuari no s'ha autenticat (no saps qui és). Usa 403 quan l'usuari s'ha autenticat però no té permisos per a aquell recurs específic (saps qui és però no pot fer-ho).

| 401 Unauthorized → "Qui ets? No ho sé."  Acció: redirigir al login / renovar token403 Forbidden → "Sé qui ets, però no pots fer-ho."  Acció: mostrar pàgina 403 / amagar element UI |
| :---- |

**La regla dels reintents: 4xx vs 5xx**

Pensa en els reintents: els errors 5xx son típicament transitoris i val la pena reintentar-los amb exponential backoff. Els errors 4xx no tindran èxit en el reintent tret que la petició canviï. Usa 429 amb Retry-After per guiar els clients sobre quan reintentar peticions amb rate limiting.

| 4xx → El CLIENT ha de canviar alguna cosa → NO reintentar  400: arregla la validació  401: autentica't  403: obtén permisos  404: comprova la URL5xx → El SERVIDOR té un problema → SÍ reintentar (amb backoff)  500: error intern (transitori)  502: gateway falla (transitori)  503: manteniment (espera)  504: timeout (transitori) |
| :---- |

**Referència ràpida per a la gestió en Axios**

| // Mapa complet de codis → accions al frontendconst ACCIONS\_PER\_CODI: Record\<number, () \=\> void\> \= {  400: () \=\> mostrarErrorsValidacio(),  401: () \=\> redirigirAlLogin(),  403: () \=\> mostrarPaginaForbidden(),  404: () \=\> mostrarPagina404(),  409: () \=\> mostrarConflicte(),  422: () \=\> mostrarErrorsCamp(),  429: () \=\> mostrarRateLimit(),  500: () \=\> mostrarErrorServidor(),  502: () \=\> mostrarErrorGateway(),  503: () \=\> mostrarManteniment(),  504: () \=\> mostrarTimeout(),}; |
| :---- |

