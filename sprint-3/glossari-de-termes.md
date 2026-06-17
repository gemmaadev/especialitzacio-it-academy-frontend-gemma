## **Glossari de termes — Connexió a APIs: Fetch i Axios**

**AbortController** — API nativa del navegador per cancel·lar peticions HTTP en curs. Es crea una instància, es passa el seu `signal` a la petició (`fetch(url, { signal })` o `axios.get(url, { signal })`), i es crida `controller.abort()` per cancel·lar. Essencial per cancel·lar peticions en `useEffect` cleanup i en cercadors en temps real.

**`Access-Control-Allow-Origin`** — Capçalera HTTP de resposta que indica quins orígens poden accedir al recurs. `*` permet qualsevol origen (insegur en producció). La configuració correcta especifica orígens concrets: `Access-Control-Allow-Origin: https://app.exemple.com`.

**`async/await`** — Sintaxi de JavaScript per gestionar operacions asíncrones de manera llegible. `await` pausa l'execució de la funció `async` fins que la Promise es resol. Substitueix els `.then()` encadenats i fa el codi asíncron llegible com si fos síncron.

**Autenticació Bearer** — Esquema d'autenticació HTTP on el token s'envia a la capçalera `Authorization: Bearer <token>`. El mètode estàndard per enviar JWTs a les crides API. Mai enviar el token a la URL (apareixeria als logs).

**`axios.create()`** — Mètode per crear una instància Axios amb configuració reutilitzable: `baseURL`, `timeout`, `headers` per defecte. Totes les peticions creades des d'aquesta instància hereten la configuració. El punt central de totes les crides HTTP d'un projecte.

**`axios.isAxiosError()`** — Type guard de TypeScript que verifica si un error és un `AxiosError`. Permet accedir a `error.response`, `error.request` i `error.config` amb tipat complet. Usar sempre dins dels blocs `catch` per gestionar errors d'Axios.

**`axios.isCancel()`** — Verifica si un error és causat per la cancel·lació d'una petició (via `AbortController`). Permet ignorar els errors de cancel·lació en els blocs `catch` sense tractar-los com a errors reals.

**`baseURL`** — Propietat de configuració d'Axios que estableix la URL base per a totes les peticions de la instància. Evita repetir la URL del servidor a cada crida. Exemple: `baseURL: 'https://api.exemple.com/v1'`.

**Bearer Token** — Veure *Autenticació Bearer*.

**Bundle size** — La mida del codi JavaScript que es descarrega al navegador. Fetch contribueix 0 KB (natiu), Axios \~13 KB. Rellevant per al rendiment inicial de la pàgina, especialment en dispositius mòbils o connexions lentes.

**Cancel·lació de peticions** — Mecanisme per interrompre una petició HTTP en curs. Útil quan el component es desmunta, quan l'usuari canvia de pàgina, o en cercadors en temps real on les peticions anteriors son irrellevants quan l'usuari continua escrivint.

**Client-Servidor** — Principi REST que separa les responsabilitats: el client gestiona la interfície d'usuari, el servidor gestiona les dades i la lògica de negoci. Permeten evolucionar independentment sense trencar el contracte entre ells.

**`Content-Security-Policy (CSP)`** — Capçalera HTTP que limita els recursos que el navegador pot carregar i executar. Defensa principal contra XSS: `Content-Security-Policy: default-src 'self'; script-src 'self'` impedeix que scripts externs s'executin.

**`Content-Type`** — Capçalera HTTP que indica el format del cos de la petició o resposta. Per a APIs REST: `application/json`. Axios l'afegeix automàticament per a objectes JSON. Fetch requereix especificar-la manualment.

**Cookie HttpOnly** — Cookie que no és accessible via JavaScript (`document.cookie` retorna buit). Resistents a atacs XSS perquè un script injectat no pot llegir-les. La manera més segura de guardar tokens de refresc.

**CORS (Cross-Origin Resource Sharing)** — Mecanisme basat en capçaleres HTTP que permet o bloqueja peticions entre dominis. El navegador envia una petició `OPTIONS` (preflight) per verificar que el servidor permet la petició real. Un error CORS es produeix quan el servidor no inclou les capçaleres CORS correctes.

**CSRF (Cross-Site Request Forgery)** — Atac que força un usuari autenticat a executar accions no desitjades en una aplicació en la qual té sessió oberta. Mitigat amb `SameSite=Strict` a les cookies, CSRF tokens, i capçaleres personalitzades.

**Custom Hook** — Funció React reutilitzable que encapsula lògica de state i efectes. `useFetch`, `usePaginacio`, `useDebounce` son exemples de custom hooks per centralitzar la lògica de crides API i evitar repetir codi en cada component.

**Debounce** — Tècnica que retarda l'execució d'una funció fins que l'usuari para d'interactuar. En cercadors: esperar 300-400ms que l'usuari pari d'escriure abans d'enviar la petició. Evita una crida HTTP per cada tecla premuda.

**DELETE** — Mètode HTTP per eliminar un recurs. Idempotent: cridar-lo múltiples vegades sobre el mateix recurs dona el mateix resultat. Retorna habitualment `204 No Content` sense cos de resposta.

**DOMPurify** — Biblioteca JavaScript que sanititza HTML per prevenir XSS. `DOMPurify.sanitize(html)` elimina scripts maliciosos d'un string HTML abans d'inserir-lo al DOM. Necessari quan cal renderitzar HTML generat per usuaris.

**Edge Computing** — Paradigma de computació on el codi s'executa en servidors distribuïts prop dels usuaris (Cloudflare Workers, Vercel Edge). Restriccions estrictes de mida de bundle: Fetch natiu és la millor opció, Axios pot ser massa gran.

**Error Boundary** — Component React que captura errors de JavaScript en l'arbre de components fills i mostra una UI de fallback. Evita que un error en un component trenqui tota l'aplicació.

**Estat Discriminat** — Patró TypeScript per modelar els estats d'una crida API com un únic camp `status` amb valors literals: `'inactiu' | 'carregant' | 'exit' | 'error'`. Evita combinacions impossibles com `carregant: true` i `dades: [...]` alhora.

**Exponential Backoff** — Estratègia de reintent que augmenta progressivament el temps d'espera entre intents: 1s, 2s, 4s, 8s... Combinada amb un jitter aleatori per evitar que tots els clients reinentin simultàniament. Ideal per a errors 5xx.

**Failing Closed** — Principi de seguretat: quan es produeix un error en verificar l'autenticació, denegar l'accés per defecte. L'oposat és "Failing Open" (concedir accés en cas d'error), que és un antipatró de seguretat greu.

**Fetch API** — API nativa del navegador (i Node.js v18+) per fer peticions HTTP. Basada en Promises. Únicament llança errors per fallades de xarxa, no per codis HTTP 4xx/5xx. Requereix parseig manual del JSON i verificació manual de `response.ok`.

**GET** — Mètode HTTP per obtenir un recurs. Idempotent i segur (no modifica l'estat del servidor). No té cos de petició. Retorna 200 OK amb el recurs sol·licitat. S'usa per a totes les operacions de lectura.

**HTTP (HyperText Transfer Protocol)** — Protocol de comunicació entre clients i servidors. Cada interacció consta d'una petició (mètode \+ URL \+ headers \+ body) i una resposta (codi d'estat \+ headers \+ body). La capa de transport de les APIs REST.

**HTTPS** — HTTP sobre TLS (Transport Layer Security). Xifra tota la comunicació client-servidor. Obligatori per a qualsevol API en producció. Sense HTTPS, tokens, credencials i dades viatgen en text pla.

**Header (Capçalera HTTP)** — Metadades adjuntes a la petició o resposta HTTP. `Authorization` per a autenticació, `Content-Type` per al format del cos, `Accept` per al format de resposta desitjat, `X-Requested-With` per a identificar peticions AJAX.

**Idempotent** — Propietat d'una operació que produeix el mateix resultat independentment de quantes vegades s'executi. GET, PUT i DELETE son idempotents. POST i PATCH no ho son. Rellevant per a decidir si reintentar una petició fallida.

**Infinite Scroll** — Alternativa a la paginació clàssica on nous elements carreguen automàticament quan l'usuari arriba al final de la llista. Implementat amb `IntersectionObserver`: quan l'últim element entra al viewport, es carrega la pàgina següent.

**Interceptor** — Funció que Axios executa per a cada petició o resposta, permetent modificar-les o reaccionar-hi de manera global. Els interceptors de petició afegeixen tokens d'autenticació. Els de resposta gestionen errors 401, 403, 500 de manera centralitzada.

**JSON (JavaScript Object Notation)** — Format d'intercanvi de dades lleuger i llegible. El format estàndard de les APIs REST modernes. Axios el serialitza i deserialitza automàticament. Fetch requereix `JSON.stringify()` per al cos i `.json()` per a la resposta.

**JWT (JSON Web Token)** — Token d'autenticació format per tres parts codificades en Base64: header (algorisme), payload (dades de l'usuari i expiració), i signatura. S'envia via `Authorization: Bearer <jwt>`. No guardar informació sensible al payload (és llegible sense la clau secreta).

**`ky`** — Biblioteca HTTP lleugera (\~4 KB) construïda sobre Fetch natiu. Alternativa a Axios quan es vol una API similar (hooks, gestió d'errors automàtica) sense la mida del bundle d'Axios.

**Latència** — El temps que triga una petició HTTP a completar-se, incloent DNS, handshake TCP/TLS, temps de processament del servidor i transmissió de dades. Les peticions paral·leles (`Promise.all`) maximitzen l'aprofitament de la latència.

**Memory Leak** — En React: quan un component desmuntat intenta actualitzar el seu estat (per exemple, quan arriba una resposta d'una petició HTTP iniciada abans de desmuntar-se). Es prevé cancel·lant les peticions al `useEffect` cleanup.  
**`ofetch`** — Biblioteca HTTP lleugera usada internament per Nuxt 3\. Alternativa moderna a Axios construïda sobre Fetch natiu, amb millors defaults i gestió d'errors.

**Optimistic UI** — Tècnica UX que actualitza la interfície immediatament (com si la petició hagués tingut èxit) i reverteix si l'API retorna un error. Proporciona una sensació de resposta immediata per a accions com likes, toggles, o reordenació d'elements.

**`params`** — Opció de configuració d'Axios per enviar query parameters. Axios serialitza l'objecte automàticament i l'afegeix a la URL amb l'encoding correcte. Alternativa a la interpolació manual de strings (que requereix gestionar l'encoding manualment).

**PATCH** — Mètode HTTP per actualitzar parcialment un recurs (únicament els camps enviats). Diferent de PUT (que substitueix el recurs complet). Retorna 200 OK amb el recurs actualitzat.

**Peticions Concurrents** — Múltiples peticions HTTP que s'executen simultàniament sense esperar-se les unes a les altres. Implementades amb `Promise.all`. Redueixen el temps total quan les peticions son independents.

**Peticions Seqüencials** — Peticions HTTP que s'executen una rere l'altra, normalment perquè el resultat d'una és necessari per formular la següent. Implementades amb `await` encadenats o `for...of`.

**Política del Mateix Origen** — Regla de seguretat del navegador que impedeix que un script d'un origen (`protocol + domini + port`) faci peticions a un origen diferent. CORS és el mecanisme per relaxar aquesta restricció de manera controlada.

**POST** — Mètode HTTP per crear un nou recurs o enviar dades al servidor. No idempotent (cada crida pot crear un nou recurs). Retorna 201 Created amb el nou recurs i el header `Location` apuntant a la URL del recurs creat.

**Preflight** — Petició HTTP `OPTIONS` que el navegador envia automàticament abans d'una petició cross-origin "no simple" (amb mètodes com PUT, DELETE, o headers com `Authorization`). Verifica que el servidor permet la petició real.

**`Promise`** — Objecte JavaScript que representa el resultat eventual d'una operació asíncrona. Pot estar en tres estats: pending (esperant), fulfilled (resolta amb èxit), o rejected (rebutjada amb error). La base de `async/await`.

**`Promise.all`** — Executa múltiples Promises en paral·lel. Es resol quan TOTES s'han resolt (amb l'array de resultats en el mateix ordre). Es rebutja immediatament si QUALSEVOL Promise falla (comportament "tot o res").

**`Promise.allSettled`** — Com `Promise.all` però continua fins que TOTES les Promises s'han establert (resolved o rejected). Retorna un array d'objectes `{ status: 'fulfilled' | 'rejected', value | reason }`. Ideal quan algunes peticions son opcionals.

**`Promise.any`** — Es resol amb el resultat de la primera Promise que tingui èxit. Si TOTES fallen, llança `AggregateError`. Útil per implementar fallbacks entre múltiples fonts de dades.

**`Promise.race`** — Es resol (o rebutja) amb el resultat de la primera Promise que s'estableixi, independentment del resultat. Útil per implementar timeouts: qui guanya la carrera, la petició o el timeout?

**PUT** — Mètode HTTP per substituir completament un recurs existent. Idempotent: enviar el mateix PUT dues vegades dona el mateix resultat. Cal enviar la representació completa del recurs, no únicament els camps modificats.

**Query Parameters** — Parells clau-valor afegits a la URL després del `?`. Permeten filtrar, paginar, ordenar i cercar sense modificar el cos de la petició. Exemple: `/api/productes?page=2&limit=10&cerca=portàtil`.

**Race Condition** — Situació on el resultat depèn de l'ordre d'execució d'operacions asíncrones. En crides API: si es fan dues peticions ràpidament, la resposta de la primera pot arribar després de la segona, mostrant dades incorrectes. La cancel·lació de peticions o els camps `requestId` ho eviten.

**Rate Limiting** — Limitació del nombre de peticions que un client pot fer en un període de temps. El servidor retorna `429 Too Many Requests` amb un header `Retry-After` indicant quants segons esperar. Al frontend: gestionar amb backoff i missatge a l'usuari.

**Refresh Token** — Token de llarga durada (dies/setmanes) usat exclusivament per obtenir nous access tokens. Ha de guardar-se en una HttpOnly Cookie. Quan l'access token expira (401), l'interceptor crida l'endpoint de renovació amb el refresh token.

**`response.ok`** — Propietat booleana de la resposta de Fetch que és `true` per a codis 200-299 i `false` per a qualsevol altre codi. Cal verificar-la manualment perquè Fetch no llança errors per codis 4xx/5xx.

**REST (Representational State Transfer)** — Estil arquitectural per a sistemes distribuïts definit per Roy Fielding el 2000\. Principis: interfície uniforme, client-servidor, stateless, cacheable, sistema per capes. Una API que segueix aquests principis s'anomena RESTful.

**`SameSite`** — Atribut de les cookies que controla quan s'envien en peticions cross-site. `Strict`: únicament en navegació directa. `Lax`: en navegació directa i navegació top-level. `None`: sempre (requereix `Secure`). `SameSite=Strict` és la principal defensa contra CSRF.

**Skeleton Loader** — Element UI que imita l'estructura del contingut que carregarà, mostrant "ossos" grisos animats. Superior al spinner perquè orienta l'usuari sobre quèapareixerà i redueix el "temps de càrrega percebut".

**Stateless** — Principi REST que obliga que cada petició ha de contenir tota la informació necessària per ser processada. El servidor no guarda estat entre peticions. Per això s'envia el token d'autenticació en cada petició.

**`timeout`** — Temps màxim que Axios esperarà una resposta abans de llançar un error. Configurable en una línia: `timeout: 5000` (5 segons). Fetch requereix una implementació manual amb `AbortController` i `setTimeout`.

**Token d'Accés (Access Token)** — Token de curta durada (minuts/hores) enviat a cada petició via `Authorization: Bearer`. Quan expira (resposta 401), l'interceptor l'ha de renovar automàticament usant el refresh token.

**`URLSearchParams`** — API nativa de JavaScript per construir i manipular query strings de manera segura, gestionant automàticament l'encoding dels caràcters especials. Alternativa a la interpolació manual de strings a les URLs.

**`validateStatus`** — Opció d'Axios per personalitzar quins codis d'estat es consideren errors. Per defecte, qualsevol codi fora de 2xx genera un error. `validateStatus: () => true` fa que Axios mai llanci errors per codis HTTP (comportament similar a Fetch).

**XSS (Cross-Site Scripting)** — Atac d'injecció on scripts maliciosos s'executen en el context d'una web legítima. L'objectiu principal en APIs: robar tokens d'autenticació. Mitigació: `textContent` en lloc d'`innerHTML`, DOMPurify per a HTML, CSP, i HttpOnly cookies per als tokens.

**`X-Requested-With`** — Capçalera personalitzada enviada per les biblioteques AJAX (inclòs Axios). El navegador no pot afegir capçaleres personalitzades en peticions CSRF simples, de manera que la seva presència pot usar-se com a indicador que la petició ve d'una font legítima.  
