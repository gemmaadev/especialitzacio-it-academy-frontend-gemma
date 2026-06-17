###### **Seguretat en crides API del Frontend: OWASP Cheat Sheets**

###### **Security Best Practices for Frontend API Calls**

Cheat Sheet d’OWASP amb recomanacions de seguretat per crides API al frontend.  
[https://cheatsheetseries.owasp.org/cheatsheets/HTML5\_Security\_Cheat\_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)

**HTTPS: el mínim no negociable**

HTTPS ha d'usar-se a tot arreu. La REST API no ha d'acceptar connexions no xifrades.

| // ✅ Instància Axios sempre amb HTTPSconst apiClient \= axios.create({  baseURL: 'https://api.exemple.com',  // ← sempre HTTPS});// ✅ Forçar HTTPS al servidor amb HSTS"Strict-Transport-Security: max-age=31536000; includeSubDomains"// → el navegador recordarà usar HTTPS durant 1 any// → si algú intenta HTTP, el navegador el converteix a HTTPS automàticament// ❌ Mai usar HTTP en producció:const client \= axios.create({ baseURL: 'http://api.exemple.com' });// → totes les dades (inclosos tokens i passwords) viatgen en text pla |
| :---- |

**Control d'Accés: JWT i API Keys**

A menys que l'API REST sigui completament pública, tota la comunicació de la REST API hauria de ser autenticada. Les peticions no autenticades haurien de resultar en un codi d'error HTTP 401 (Unauthorized).

### **JWT al Frontend**

No guardes informació sensible en tokens JWT. Els tokens JWT haurien de tenir una data d'expiració adequada (recomanat: menys d'1 hora). Implementa la renovació de tokens amb refresh tokens que tinguin un temps de vida més llarg.

| // ✅ JWT injectat automàticament en totes les peticions via interceptorapiClient.interceptors.request.use((config) \=\> {  const token \= obtenirTokenSegur();  // ← mai de localStorage si és crític  if (token) {    config.headers.Authorization \= \`Bearer ${token}\`;  }  return config;});// On guardar el JWT:// ❌ localStorage → accessible per JavaScript → vulnerable a XSS//    localStorage.setItem('token', jwt);// ✅ HttpOnly Cookie → JavaScript NO pot llegir-la → resistent a XSS//    El servidor estableix: Set-Cookie: token=JWT; HttpOnly; Secure; SameSite=Strict//    El navegador l'envia automàticament a cada petició// ✅ Memory (variable en JavaScript) → no persistit → perd-se en recarregar//    Útil per a tokens de molt curta duradalet tokenEnMemoria: string | null \= null; |
| :---- |

### **API Keys al Frontend**

No incloguis l'API key o password de la base de dades en el codi font. Les API keys haurien de tenir privilegis mínims per a la funcionalitat que permeten.

| // ❌ MAI: API key visible al codi del navegadorconst STRIPE\_KEY \= 'sk\_live\_abc123realkey';  // qualsevol pot llegir-la\!// ✅ CORRECTE: les claus secretes al backend// El frontend crida al seu propi backendconst { data } \= await apiClient.post('/api/pagament/crear-intencio', {  amount: 100});// → el backend (Node.js) té la sk\_live\_ i crida Stripe internament// ✅ Per a claus públiques (ex: Stripe publishable key): sí al frontend// Les claus "publishable" estan dissenyades per ser públiquesconst stripe \= Stripe(import.meta.env.VITE\_STRIPE\_PK);  // pk\_live\_abc (no sk\_live\_\!) |
| :---- |

**Validació d'Input: mai confiar en el frontend**

Tota la validació d'inputs hauria de fer-se al backend. Valida tots els paràmetres d'entrada, inclosos el cos de la petició, la cadena de consulta, i les capçaleres.

| // El frontend valida per UX (feedback immediat), però el backend SEMPRE revalida// La regla: el backend mai pot confiar en el frontend// ✅ Al frontend: validació per UX amb Zodimport { z } from 'zod';const esquemaUsuari \= z.object({  nom: z.string().min(2).max(50),  email: z.string().email(),  edat: z.number().int().min(18).max(120),});const resultat \= esquemaUsuari.safeParse(dadesFormulari);if (\!resultat.success) {  mostrarErrors(resultat.error.flatten());  return;  // ← no enviem la petició si la validació falla}// ✅ La petició va al backend, que revalida tot independentmentconst { data } \= await apiClient.post('/api/usuaris', resultat.data); |
| :---- |

**Capçaleres de seguretat HTTP: la defensa en profunditat**

Les API REST haurien d'usar capçaleres HTTP per millorar la seguretat. Inclou sempre les capçaleres de seguretat apropiades en les respostes.

| // Les capçaleres de seguretat les configura el SERVIDOR, però el frontend// pot verificar que hi son i que son correctes (DevTools → Network → Headers)// Capçaleres que hauria de retornar qualsevol API segura:const CAPÇALERES\_SEGURETAT\_ESPERADES \= {  // Content Security Policy: limita les fonts de scripts, imatges, etc.  'Content-Security-Policy': "default-src 'self'; script-src 'self'",  // Evita clickjacking (la pàgina dins d'un iframe maliciós)  'X-Frame-Options': 'DENY',  // Evita MIME sniffing  'X-Content-Type-Options': 'nosniff',  // Força HTTPS durant 1 any (HSTS)  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',  // Controla la informació d'origen enviada  'Referrer-Policy': 'strict-origin-when-cross-origin',  // Desactiva funcionalitats del navegador no necessàries  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',}; |
| :---- |

**CORS: configuració correcta des del frontend**

Les REST APIs no han de tenir una configuració CORS de llista blanca que inclogui tots els orígens via `*`. Configura CORS explícitament per als orígens autoritzats.

| // El frontend NO configura CORS (ho fa el servidor)// Però el frontend pot diagnosticar errors CORS:// Error típic a la consola:// "Access to XMLHttpRequest at 'https://api.exemple.com/usuaris' from origin//  'https://app.exemple.com' has been blocked by CORS policy"// Causes habituals des del frontend:// 1\. L'URL del servidor no coincideix exactament (http vs https, port, subdomini)// 2\. La petició usa un header personalitzat que el servidor no permet// 3\. El servidor no ha configurat CORS per a aquest origen// Diagnòstic: mirar la consola i el Network tab de DevTools// La petició OPTIONS (preflight) ha de retornar les capçaleres CORS correctes:// Access-Control-Allow-Origin: https://app.exemple.com// Access-Control-Allow-Methods: GET, POST, PUT, DELETE// Access-Control-Allow-Headers: Authorization, Content-Type |
| :---- |

**Informació sensible en peticions HTTP**

No enviïs informació sensible en URLs: les URLs son accessibles als logs del servidor, als logs del navegador, i al historial. No enviïs credencials en paràmetres de la URL.

| // ❌ MAL: token a la URL → apareix als logs, historial, etc.await axios.get(\`/api/documents?token=${authToken}\`);// URL: /api/documents?token=eyJhbGciOiJSUzI1NiJ9...  ← visible als logs\!// ✅ BÉ: token a la capçalera Authorizationawait apiClient.get('/api/documents', {  headers: { Authorization: \`Bearer ${authToken}\` }});// ❌ MAL: password a la URL en loginawait axios.get(\`/api/login?password=contrasenya123\`);// ✅ BÉ: credencials al cos de la petició (POST \+ HTTPS)await axios.post('/api/login', {  email: 'anna@e.com',  password: 'contrasenya123'  // ← xifrat per HTTPS, no a la URL}); |
| :---- |

**Gestió segura d'errors: no filtrar informació**

Gestiona els errors de manera apropiada. Les APIs REST haurien de respondre als errors amb missatges d'error genèrics. Els missatges d'error de debug haurien d'estar desactivats en producció.

| // ❌ MAL: l'API retorna informació interna en l'error// { error: "SELECT \* FROM users WHERE id='1'": syntax error at position 35" }// → revela l'estructura de la BD\!// ✅ BÉ: missatge genèric al client, detall al log intern del servidor// Resposta al frontend: { status: 500, message: "Error intern. Ref: ERR-2025-001" }// Log intern: "SQL Error: syntax error... \[context complet per al developer\]"// Al frontend: interceptar i mostrar missatges segursapiClient.interceptors.response.use(  res \=\> res,  (error) \=\> {    const missatgePublic \= error.response?.data?.message      || 'S\\'ha produït un error. Torna-ho a provar.';    // ← mai mostrar el stack trace o detalls tècnics a l'usuari    mostrarToast(missatgePublic, 'error');    return Promise.reject(error);  }); |
| :---- |

**LocalStorage vs. Cookies: on guardar els tokens**

| LocalStorage:  ✅ Fàcil d'usar  ❌ Accessible via JavaScript  ❌ Vulnerable a XSS: un script injectat pot robar el token  ❌ No s'envia automàticament (cal afegir-lo als headers)HttpOnly Cookies:  ✅ NO accessible via JavaScript (XSS no pot llegir-la)  ✅ S'envia automàticament a cada petició al domini  ✅ Protecció addicional amb Secure i SameSite  ❌ Vulnerable a CSRF (mitigar amb SameSite=Strict)  ❌ Limitada a 4KB per cookieRecomanació OWASP:  → Per a SPAs amb APIs cross-origin: tokens en memòria \+ refresh token en HttpOnly Cookie  → Per a apps tradicionals: HttpOnly Cookie amb SameSite=Strict  → Evitar localStorage per a informació crítica d'autenticació |
| :---- |

**La checklist de seguretat per a crides API al Frontend**

| ✅ Comunicació  □ Totes les crides usen HTTPS  □ La URL base de l'API client usa https://  □ No hi ha API keys secretes al codi del frontend✅ Autenticació  □ El token s'envia via Authorization header, no URL  □ Els tokens JWT expiren en \< 1 hora  □ Refresh tokens en HttpOnly Cookie  □ La renovació automàtica gestiona errors 401✅ Dades  □ Validació d'input al frontend per UX  □ Mai confiar únicamente en la validació del frontend  □ No informació sensible a les URLs  □ Missatges d'error genèrics (sense detalls tècnics)✅ Capçaleres (verificar al Network tab)  □ Content-Security-Policy present  □ X-Frame-Options: DENY  □ X-Content-Type-Options: nosniff  □ Strict-Transport-Security present✅ CORS  □ No Access-Control-Allow-Origin: \* en producció  □ Llista blanca d'orígens explícita al servidor |
| :---- |

