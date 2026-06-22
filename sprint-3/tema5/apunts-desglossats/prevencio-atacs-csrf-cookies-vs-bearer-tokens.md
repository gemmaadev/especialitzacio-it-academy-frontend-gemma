**Com es poden prevenir els atacs CSRF en aplicacions basades en cookies? I com es gestionen en APIs basades en tokens (tokens Bearer)?**

## **Què és un atac CSRF i com funciona**

En aquesta defensa, quan el servidor serveix una pàgina, embeds un valor imprevisible a la pàgina, anomenat CSRF token. 

Quan la pàgina legítima envia la petició que canvia l'estat al servidor, inclou el CSRF token a la petició HTTP. 

El servidor pot llavors verificar el valor del token i executar la petició únicament si coincideix. Com que un atacant no pot endevinar el valor del token, no pot emetre una falsificació exitosa.

| Anatomia d'un atac CSRF:1\. L'usuari fa login a banc.com → navegador guarda cookie de sessió   Cookie: sessio=abc123; HttpOnly2\. L'usuari visita evil.com (sense saber-ho)3\. evil.com conté codi maliciós:   \<form action="https://banc.com/transferencia" method="POST"\>     \<input name="compte" value="COMPTE\_ATACANT"\>     \<input name="import" value="10000"\>   \</form\>   \<script\>document.forms\[0\].submit()\</script\>4\. El navegador envia automàticament la cookie de sessió a banc.com\!   POST https://banc.com/transferencia   Cookie: sessio=abc123  ← el navegador l'inclou automàticament\!   compte=COMPTE\_ATACANT\&import=100005\. banc.com creu que l'usuari ha enviat la petició → transferència executada\!El problema fonamental:  → El navegador envia les cookies automàticament a TOTS els dominis  → El servidor no pot distingir la petició legítima de la maliciosa |
| :---- |

**Les tres defenses contra CSRF en aplicacions basades en cookies**

### **Defensa 1: SameSite Cookie Attribute**

L'atribut SameSite de cookie proporciona alguna protecció contra atacs CSRF. No és una defensa completa, i és millor considerar-la com un complement a un dels altres mètodes. 

Aquest atribut controla quan un navegador pot incloure la cookie en una petició cross-site. Té tres valors possibles: None, Lax i Strict.

| // Configuració de cookies amb SameSite a NestJS/Express// SameSite=Strict: màxima proteccióresponse.cookie('session-token', token, {  httpOnly: true,      // ← no accessible per JavaScript  secure: true,        // ← únicament HTTPS  sameSite: 'strict',  // ← cookie NO s'envia en cap petició cross-site  maxAge: 15 \* 60 \* 1000,  // 15 minuts});// SameSite=Lax: equilibri seguretat-usabilitat (default modern)response.cookie('session-token', token, {  httpOnly: true,  secure: true,  sameSite: 'lax',    // ← cookie s'envia en navegació top-level (GET)                      //   NO s'envia en POST/PUT/DELETE cross-site});// SameSite=None: necessari per a cross-site explícit (OAuth, iframes)response.cookie('session-token', token, {  httpOnly: true,  secure: true,        // ← OBLIGATORI quan sameSite=none  sameSite: 'none',   // ← s'envia sempre (el menys segur)}); |
| :---- |

Comparativa dels valors SameSite:

|                       Strict    Lax       NoneNavegació directa     ✅        ✅        ✅Link des d'altra web  ❌        ✅        ✅POST cross-site form  ❌        ❌        ✅GET cross-site form   ❌        ❌        ✅fetch/XHR cross-site  ❌        ❌        ✅→ Strict: el més segur però el login des d'un email extern torna a demanar credencials→ Lax: el millor equilibri per a la majoria d'aplicacions web modernes |
| :---- |

### **Defensa 2: Synchronizer Token Pattern (CSRF Token)**

El software stateful hauria d'usar el patró de synchronizer token. Si el framework no té protecció CSRF integrada, afegiu CSRF tokens a totes les peticions que canvien l'estat (peticions que causen accions al lloc) i valideu-los al backend.

| // NestJS: implementació CSRF Token// npm install csurf (o @dr.pogodin/react-csrf-provider per a SPAs)// Flux:// 1\. Servidor genera un token únic per sessió// 2\. El token s'inclou al formulari HTML o a una cookie llegible per JS// 3\. Cada petició de mutació (POST/PUT/DELETE) ha d'incloure el token// 4\. El servidor verifica que el token és vàlid// Exemple simplificat amb NestJS:@Injectable()export class CsrfMiddleware implements NestMiddleware {  use(req: Request, res: Response, next: NextFunction) {    if (\['POST', 'PUT', 'PATCH', 'DELETE'\].includes(req.method)) {      const tokenHeader \= req.headers\['x-csrf-token'\];      const tokenSessio \= req.session?.csrfToken;      if (\!tokenHeader || tokenHeader \!== tokenSessio) {        throw new ForbiddenException('CSRF token invàlid');      }    }    next();  }}// Al frontend: afegir el token a cada petició de mutació// El token es llegeix d'una cookie NO-httpOnly (llegible per JS)const csrfToken \= getCookie('csrf-token');await axios.post('/api/transferencia', data, {  headers: { 'X-CSRF-Token': csrfToken }}); |
| :---- |

### 

### **Defensa 3: Verificació de l'origin/Referer Header**

| // Verificar que la petició prové del domini correcte@Injectable()export class OriginCheckMiddleware implements NestMiddleware {  private readonly origensPermesos \= \['https://app.exemple.com'\];  use(req: Request, res: Response, next: NextFunction) {    const origen \= req.headers.origin || req.headers.referer;    if (origen) {      const url \= new URL(origen);      if (\!this.origensPermesos.includes(url.origin)) {        throw new ForbiddenException('Origen no autoritzat');      }    }    next();  }} |
| :---- |

**APIs amb Bearer Tokens: per què son naturalment resistents a CSRF**

Si el target requereix una capçalera no-cookie (per exemple, `Authorization: Bearer <token>`) enviada per JavaScript del costat client, l'atacant no pot establir aquesta capçalera des d'un simple formulari o imatge — això redueix el risc de CSRF.

Per què els Bearer Tokens eviten CSRF:

| CSRF funciona perquè:  → El navegador envia cookies AUTOMÀTICAMENT sense que JS ho faci  → Un formulari maliciós pot enviar una petició amb les cookies adjuntesBearer Tokens NO es poden enviar automàticament perquè:  → El token està a localStorage o en memòria JS  → Cal que JavaScript llegeixi el token i l'afegeixi al header manualment  → Un formulari HTML \<form\> no pot afegir headers personalitzats  → Un atacant cross-site no pot llegir el token (Same-Origin Policy)// El formulari maliciós de evil.com:\<form action="https://api.exemple.com/transferencia" method="POST"\>  \<input name="import" value="10000"\>\</form\>\<script\>document.forms\[0\].submit()\</script\>// La petició que s'envia:POST https://api.exemple.com/transferencia// ← NO conté Authorization: Bearer ... perquè JS d'evil.com//   no pot llegir el token de app.exemple.com (Same-Origin Policy)// → El servidor retorna 401 Unauthorized → atac fallat\! |
| :---- |

**La trampa: JWT en Cookie (el pitjor dels dos mons sense SameSite)**

| // ❌ PERILLÓS: JWT en cookie sense SameSite correcteresponse.cookie('access-token', jwt, {  httpOnly: true,  // sameSite: NO configurat → default és 'none' en browsers antics  // → vulnerable a CSRF igual que les sessions\!});// ✅ CORRECTE: JWT en cookie amb protecció adequadaresponse.cookie('access-token', jwt, {  httpOnly: true,      // ← protegit contra XSS  secure: true,  sameSite: 'strict',  // ← protegit contra CSRF});// La combinació òptima per a SPAs el 2025-2026:// Access token: HttpOnly Cookie \+ SameSite=Strict (protecció XSS \+ CSRF)// CSRF token: Cookie NO-httpOnly llegible per JS (o header personalitzat) |
| :---- |

**L'atribut SameSite: el detall del subdomini**

L'atribut SameSite Cookie pot usar-se per a cookies de sessió però aneu amb compte de NO establir una cookie específicament per a un domini. 

Aquesta acció introdueix una vulnerabilitat de seguretat perquè tots els subdominis d'aquell domini compartiran la cookie, i és particularment un problema si un subdomini té un CNAME a dominis no sota el vostre control.

| Exemple de risc de subdomini:  → Cookie establerta per: .exemple.com (amb punt inicial → tots els subdominis)  → blog.exemple.com (blog extern, control de tercers) pot llegir la cookie\!  → ← Vulnerabilitat de seguretat\!✅ CORRECTE: establir la cookie per al domini exacte  → Cookie per: api.exemple.com (sense punt inicial)  → Únicament api.exemple.com la rep i l'envia |
| :---- |

## **Defenses CSRF per tipus d'aplicació**

| Tipus d'aplicació | Mecanisme d'auth | Risc CSRF | Defensa principal |
| ----- | ----- | ----- | ----- |
| **Web tradicional** | Cookie de sessió | 🔴 Alt | SameSite=Lax/Strict \+ CSRF Token |
| **SPA amb Cookie** | JWT en HttpOnly Cookie | 🟡 Moderat | SameSite=Strict \+ Verificació origen |
| **SPA amb localStorage** | Bearer Token al header | 🟢 Baix | Same-Origin Policy ho evita |
| **API REST pública** | Bearer Token (OAuth) | 🟢 Baix | El header no s'envia automàticament |
| **Mòbil** | Bearer Token | 🟢 Baix | Les apps no apliquen les cookies de navegador |

| Recomanació final per a APIs NestJS REST:  1\. Usar Bearer Token (Authorization: Bearer)     → Naturalment immune a CSRF     → Guardar a HttpOnly Cookie amb SameSite=Strict per a màxima seguretat  2\. Configurar CORS estrictament     → Únicament permetre orígens de confiança  3\. No acceptar peticions d'autenticació via paràmetre URL     → els tokens a la URL apareixen als logs\!  4\. Si uses cookies → SameSite=Strict sempre |
| :---- |

