## **Glossari de termes — Autenticació i autorització amb NestJS i MongoDB**

**Access Token** — Token JWT de vida curta (15 minuts a 1 hora) que el client envia a cada petició via `Authorization: Bearer`. Permet accedir als recursos protegits. La seva curta durada limita la finestra d'atac si és robat. Es renova automàticament usant el Refresh Token quan expira.

**Algorithm Confusion Attack** — Atac JWT on l'atacant canvia el camp `alg` del header de RS256 (asimètric) a HS256 (simètric) i signa el token usant la clau pública del servidor com a secret HMAC. El servidor vulnerable accepta el token perquè les matemàtiques quadren. Mitigació: el servidor sempre imposa l'algoritme via whitelist (`algorithms: ['RS256']`), mai llegit del header del token.

**`alg: none` Attack** — Atac JWT on l'atacant estableix l'algoritme a `none` i elimina la signatura. Les biblioteques vulnerables accepten el token sense cap verificació criptogràfica. Mitigació: whitelist explícita d'algoritmes que mai inclou `none`.

**Atac de Força Bruta (Brute Force)** — Intent sistemàtic de totes les combinacions possibles de contrasenyes fins a trobar la correcta. Els algorismes ràpids com MD5 son especialment vulnerables (200 bilions d'intents/segon). bcrypt els fa pràcticament inviables reduint-los a \~4 intents/segon.

**Autorització** — El procés de determinar quèpot fer un usuari ja autenticat. Respon a la pregunta "Quèpots fer?". Sempre succeeix després de l'autenticació. Error associat: `403 Forbidden`. Implementada a NestJS via Guards com `RolsGuard`.

**Autenticació** — El procés de verificar la identitat d'un usuari. Respon a la pregunta "Qui ets?". Comprova credencials (email/password, JWT, OAuth). Error associat: `401 Unauthorized`. Implementada a NestJS via `JwtAuthGuard` i Passport strategies.

**Authorization Code Grant** — El flux OAuth 2.0 estàndard i més segur per a aplicacions web. Implica una redirecció a l'Identity Provider, obtenció d'un codi temporal (10 minuts, ús únic), i intercanvi backend del codi per tokens. El client\_secret mai abandona el servidor. Gold standard per a integrar "Continua amb Google/GitHub".

**bcrypt** — Algorisme de hashing específicament dissenyat per a contrasenyes. Lent per disseny (key stretching), genera un salt únic per a cada hash, i té un work factor configurable que es pot incrementar amb el temps. Produeix un hash de 60 caràcters que inclou la versió, el cost factor, el salt i el hash resultant. Recomanació OWASP: cost factor 12 (\~250ms/hash).

**Bearer Token** — Esquema d'autenticació HTTP on el token s'envia a la capçalera `Authorization: Bearer <token>`. La possessió del token és suficient per a l'accés. Naturalment immune a CSRF perquè el navegador no pot afegir capçaleres personalitzades automàticament. Mai guardar a `localStorage` (vulnerable a XSS); preferir HttpOnly Cookie.

**`CanActivate`** — Interfície de NestJS que tot Guard ha d'implementar. Defineix el mètode `canActivate(context: ExecutionContext): boolean | Promise<boolean>`. Retornar `true` permet la petició continuar; retornar `false` o llançar una excepció genera una resposta `403 Forbidden` automàtica.

**Claims** — Parells clau-valor dins del payload d'un JWT que contenen informació sobre l'usuari. Claims estàndard: `sub` (subject/userId), `iat` (issued at), `exp` (expiration), `iss` (issuer), `aud` (audience). Claims personalitzats: `rol`, `email`, `permisos`. El payload és llegible per qualsevol que tingui el token (Base64, no xifrat).

**CORS (Cross-Origin Resource Sharing)** — Mecanisme de seguretat del navegador que controla quines orígens poden accedir a l'API. Configurat al servidor. Complementa la protecció CSRF però no la substitueix.

**Credential Stuffing** — Atac automatitzat que prova credencials robades d'una filtració contra altres serveis, aprofitant la reutilització de contrasenyes. Raó per la qual emmagatzemar contrasenyes en text pla és catastròfic: una filtració compromet les comptes de l'usuari a molts altres serveis.

**CSRF (Cross-Site Request Forgery)** — Atac que força un usuari autenticat a executar accions no desitjades en una aplicació on té sessió activa. Explota que el navegador envia cookies automàticament. Mitigat amb `SameSite=Strict`, CSRF tokens, o usant Bearer Token (immune per Same-Origin Policy).

**CSRF Token** — Valor imprevisible generat pel servidor, embeds a la pàgina o retornat en cookie llegible per JS. El frontend l'inclou a cada petició de mutació (POST/PUT/DELETE). El servidor verifica que coincideix. Un atacant cross-site no pot llegir el token (Same-Origin Policy).

**Decorador `@Public()`** — Decorador personalitzat de NestJS creat amb `SetMetadata('isPublic', true)` que marca una ruta com a pública. El `JwtAuthGuard` el detecta via `Reflector` i permet la petició sense verificar cap JWT.

**Decorador `@Rols()`** — Decorador personalitzat de NestJS creat amb `SetMetadata('rols', rols)` que especifica quins rols poden accedir a una ruta o controller. El `RolsGuard` el llegeix via `Reflector.getAllAndOverride()` per verificar el rol de l'usuari autenticat.

**Deny by Default** — Principi de seguretat que estableix que per defecte tot accés és denegat. Cal definir explícitament cada permís. Els Guards de NestJS implementen aquest principi: si un Guard retorna `false`, la petició és denegada.

**`ExecutionContext`** — Objecte que NestJS proporciona als Guards i Interceptors amb informació sobre la petició actual. Permet accedir al tipus de context (HTTP, WebSocket, gRPC) i a objectes com `Request`, `Response` i `params`.

**`exp` (Expiration)** — Claim estàndard JWT que indica quan expira el token (Unix timestamp). NestJS/Passport verifica automàticament que `exp > now()`. Token expirat → `TokenExpiredError` → 401 Unauthorized.

**findOrCreate** — Patró d'implementació per a OAuth: buscar l'usuari per `googleId/githubId`; si existeix, retornar-lo; si no, crear-lo. Permet vincular comptes OAuth a comptes locals existents (mateixa email).

**`ForbiddenException`** — Excepció de NestJS que genera una resposta HTTP 403\. Llançada automàticament quan un Guard retorna `false`, o manualment quan l'usuari no té permisos per a un recurs específic.

**Guard** — Classe NestJS que implementa `CanActivate` i determina si una petició pot accedir al route handler. S'executa DESPRÉS del middleware però ABANS dels interceptors i pipes. Responsable d'autenticació (`JwtAuthGuard`) i autorització (`RolsGuard`, `PropietatGuard`).

**Hash** — Resultat d'aplicar una funció criptogràfica unidireccional a un input. Propietats: determinista, unidireccional (no es pot revertir), sensible (un canvi mínim → hash completament diferent), longitud fixa. Per a contrasenyes, el hash és el que s'emmagatzema a la BD, mai la contrasenya original.

**HttpOnly Cookie** — Cookie que no és accessible per JavaScript (`document.cookie` retorna buit). Resistents a atacs XSS perquè un script injectat no pot llegir el contingut. La manera recomanada d'emmagatzemar tokens d'autenticació quan s'usa l'arquitectura de cookie.

**IDOR (Insecure Direct Object Reference)** — Vulnerabilitat que ocorre quan un sistema permet accedir a un recurs únicament verificant l'autenticació però no l'autorització sobre el recurs específic. L'usuari A accedeix als recursos de l'usuari B canviant l'ID a la URL. Requereix un `PropietatGuard` per a la mitigació.

**Identity Provider (IdP)** — Servei que autentica els usuaris i emet tokens en el context d'OAuth 2.0. Google, GitHub, Facebook, Auth0 son exemples. El servidor d'autorització del flux OAuth.

**`id_token`** — JWT estàndard d'OpenID Connect (OIDC) que conté les dades del perfil de l'usuari (`sub`, `email`, `name`, `picture`). Retornat pel servidor d'autorització juntament amb l'`access_token` en el flux OAuth. Permet conèixer el perfil sense una crida addicional a l'API de perfil.

**`iat` (Issued At)** — Claim estàndard JWT que indica quan es va emetre el token (Unix timestamp). Útil per verificar que el token no és massa antic o per invalidar tokens emesos abans d'un canvi de contrasenya.

**JTI (JWT ID)** — Claim opcional (`jti`) que proporciona un identificador únic per a cada token JWT. Permet implementar una blacklist de tokens revocats en Redis: `redis.setEx('blacklist:${jti}', ttl, '1')`. Necessari per a la revocació individual de tokens sense invalidar tots els tokens de l'usuari.

**JWT (JSON Web Token)** — Estàndard (RFC 7519\) per a tokens d'autenticació autoverificables. Format: `header.payload.signature` (Base64URL). El payload conté claims. La signatura permet verificar la integritat sense consultar cap BD. No xifra el payload (únicament codifica en Base64).

**JwtAuthGuard** — Guard personalitzat de NestJS que hereta de `AuthGuard('jwt')` de Passport. Extreu el JWT del header `Authorization: Bearer`, verifica la signatura i expira, i pobla `req.user` amb el payload decodificat. Retorna 401 si el token és absent, invàlid o expirat.

**JwtStrategy** — Classe NestJS que hereta de `PassportStrategy(Strategy)` i defineix com verificar un JWT. El mètode `validate()` rep el payload decodificat i retorna l'objecte que NestJS injecta a `req.user`. La verificació de la signatura és automàtica de Passport.

**Key Stretching** — Tècnica que aplica repetidament una funció criptogràfica per alentir el procés de hashing. bcrypt usa key stretching via múltiples rounds de Blowfish key setup. Fa els atacs de força bruta molt més costosos computacionalment.

**Least Privilege** — Veure *Principi de Mínim Privilegi*.

**`mfa`/2FA (Multi-Factor Authentication)** — Autenticació en dues o més etapes: alguna cosa que saps (password), alguna cosa que tens (smartphone), alguna cosa que ets (biometria). OAuth delega aquesta responsabilitat a l'Identity Provider (Google/GitHub gestionen el 2FA).

**OAuth 2.0** — Framework obert d'autorització (RFC 6749\) que permet a una aplicació accedir a recursos d'un usuari en un servei de tercers sense rebre les seves credencials. Defineix quatre rols (Resource Owner, Client, Authorization Server, Resource Server) i múltiples fluxos (Grant Types).

**OIDC (OpenID Connect)** — Capa d'identitat construïda sobre OAuth 2.0. Afegeix autenticació estàndard d'usuaris a les capacitats d'autorització d'OAuth. Emet un `id_token` JWT amb les dades del perfil de l'usuari. Google, GitHub i la majoria d'IdPs moderns implementen OIDC.

**Passport.js** — Middleware d'autenticació per a Node.js. NestJS l'integra via `@nestjs/passport`. Cada "Estratègia" (JwtStrategy, GoogleStrategy, LocalStrategy) defineix com verificar una credencial específica. Adjunta l'usuari verificat a `req.user`.

**Payload (JWT)** — La segona part del JWT, codificada en Base64URL. Conté els claims de l'usuari (`sub`, `rol`, `exp`...). **No és xifrat**: qualsevol amb el token pot decodificar el payload. Mai posar contrasenyes, secrets, ni dades personals sensibles.

**Pepper** — Secret extern a la BD barrejat amb la contrasenya abans del hashing bcrypt. Emmagatzemat a les variables d'entorn (no a la BD). Si la BD es filtra però el pepper no, els hashes son inútils per als atacants. Incrementa la defensa en profunditat.

**Principi de Mínim Privilegi** — Principi de seguretat que estableix que cada usuari ha de tenir únicament els permisos mínims necessaris per a la seva tasca. A NestJS: `@Public()` per a rutes obertes, `@Rols(EDITOR)` per a editors, `@Rols(ADMIN)` per a admins, `PropietatGuard` per a recursos propis.

**Privilege Escalation** — Vulnerabilitat on un usuari obté permisos superiors als que li corresponen. Típicament causa de confondre autenticació amb autorització: verificar que l'usuari té un JWT vàlid però no verificar el seu rol.

**Rainbow Table** — Taula precalculada de hash → contrasenya per a atacs de diccionari ràpids. El salt de bcrypt (únic per a cada hash) les fa completament inútils perquè caldria una taula separada per a cada possible salt.

**RBAC (Role-Based Access Control)** — Mecanisme de control d'accés on els permisos estan associats a rols (admin, editor, usuari) i els usuaris s'assignen a rols. Implementat a NestJS amb el decorador `@Rols()` i el `RolsGuard`.

**Refresh Token** — Token de vida llarga (7-30 dies) guardat a la BD i usat únicament per obtenir nous Access Tokens quan expiren. Revocable immediatament eliminant-lo de la BD. Mai s'envia a l'API, únicament a l'endpoint `/auth/refresh`.

**Reflector** — Servei de NestJS que permet als Guards llegir les metadades adjuntades als handlers via decoradors com `SetMetadata`. `reflector.getAllAndOverride('rols', [handler, controller])` llegeix els rols requerits donant prioritat al mètode sobre el controller.

**RolesGuard** — Guard personalitzat de NestJS que implementa RBAC. Usa el `Reflector` per llegir els rols requerits del decorador `@Rols()`, i verifica que l'usuari autenticat (pobat per `JwtAuthGuard`) té el rol adequat. Retorna 403 si el rol és insuficient.

**Salt** — Valor aleatori únic generat per a cada contrasenya i afegit a ella abans del hashing. Assegura que dues contrasenyes idèntiques produeixen hashes completament diferents. bcrypt genera el salt automàticament i el guarda dins del hash resultant (no cal columna separada a la BD).

**Salt Rounds (Cost Factor)** — El factor de cost de bcrypt que determina quants rounds de Blowfish key setup es realitzen (2^rounds). Recomanació OWASP 2024-2026: cost 12 (\~250ms/hash). S'ha d'incrementar periòdicament a mesura que el hardware millora.

**Same-Origin Policy** — Política de seguretat del navegador que impedeix que JavaScript d'un origen llegeixi dades d'un origen diferent. Fa que les APIs amb Bearer Token siguin naturalment immune a CSRF: un script maliciós a `evil.com` no pot llegir el token de `app.exemple.com`.

**`SameSite`** — Atribut de cookie que controla quan el navegador l'envia en peticions cross-site. `Strict`: mai en cross-site (màxima seguretat). `Lax`: en navegació top-level GET (equilibri). `None`: sempre (requereix Secure). Principal defensa CSRF per a apps basades en cookies.

**`select: false`** — Opció de Mongoose que exclou un camp de les consultes per defecte. S'usa per al camp `password` del Schema d'usuari: `@Prop({ select: false })`. Per incloure'l cal: `model.findOne({ email }).select('+password')`.

**Signatura JWT** — La tercera part del JWT. HMAC-SHA256(base64(header) \+ "." \+ base64(payload), secret). Garanteix la integritat: si algú modifica el payload, la signatura no coincideix i el servidor rebutja el token. No xifra, únicament garanteix integritat.

**Stateful** — Model d'autenticació on el servidor emmagatzema l'estat de la sessió. Requereix consultar l'emmagatzematge (Redis/BD) en cada petició. Permet revocació immediata però dificulta l'escalat horitzontal. Sessions tradicionals.

**Stateless** — Model d'autenticació on el servidor no emmagatzema cap estat. El client porta tota la informació al token (JWT). Qualsevol servidor pot verificar el token sense I/O. Escalat horitzontal trivial. Principi fonamental de REST.

**Token Blacklist** — Estructura de dades (típicament Redis) que emmagatzema els JTIs dels tokens revocats fins a la seva expiració. Permet la revocació individual de JWT a costa de consultar Redis en cada petició (trenca parcialment el stateless).

**Token Refresh Rotation** — Estratègia on cada ús del Refresh Token genera un nou Refresh Token i invalida l'anterior. Si el token antic es torna a usar → alarma de robatori → revocar totes les sessions. La defensa més robusta contra el robatori de refresh tokens.

**`UnauthorizedException`** — Excepció de NestJS que genera una resposta HTTP 401\. S'usa quan el JWT és absent, invàlid, expirat, o les credencials son incorrectes. El nom és confús: significa "no autenticat" (no "no autoritzat").

**Work Factor** — Veure *Salt Rounds*.

**XSS (Cross-Site Scripting)** — Atac d'injecció on scripts maliciosos s'executen en el navegador de la víctima. En autenticació: pot robar tokens de `localStorage`. Mitigació per a tokens: usar HttpOnly Cookie (JavaScript no pot llegir-la) i Content Security Policy (CSP).

**72 Bytes (Límit bcrypt)** — bcrypt únicament processa els primers 72 bytes de la contrasenya. Els caràcters multibyte (emoji, CJK) poden fer que una contrasenya "llarga" sigui truncada silenciosament. Solució per a frases de pas llargues: pre-hashear amb SHA-256 (sempre 64 bytes) abans de passar a bcrypt.