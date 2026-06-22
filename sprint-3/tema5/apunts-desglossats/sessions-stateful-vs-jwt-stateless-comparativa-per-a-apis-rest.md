**Diferència entre l'autenticació basada en sessions (stateful) i l'autenticació sense estat (stateless) amb JWTs. Quins són els seus avantatges i desavantatges respectius, especialment per a APIs REST?**

**La diferència fonamental: on viu l'estat**

L'autenticació stateful (sessions): el servidor emmagatzema un registre de la sessió. El client únicament guarda un identificador aleatori — un session ID. 

Quan el client fa una petició, el servidor cerca el registre de sessió per determinar qui és l'usuari. 

L'autenticació stateless (tokens JWT): el servidor no emmagatzema res. 

El client guarda un token autoverificable que conté la identitat i els claims de l'usuari. 

Quan el client fa una petició, el servidor verifica la signatura del token i extreu la identitat directament d'ell.

| SESSIONS (Stateful):  Client guarda: session\_id \= "s:7f8e9d0c1b2a3f4e5d6c7b8a"  Servidor guarda: sessions\["s:7f8e9d..."\] \= { userId: 42, rol: "admin" }  → El servidor ha de consultar l'emmagatzematge en CADA peticióJWT (Stateless):  Client guarda: eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0MiIsInJvbCI6ImFkbWluIn0.abc123  Servidor guarda: ← RES  → El servidor verifica la signatura criptogràfica i extreu les dades del token |
| :---- |

**Com funciona l'autenticació basada en Sessions**

Un sistema stateful és aquell on el servidor manté informació (estat) sobre el client a través de múltiples peticions. 

Això significa que el servidor pot recordar interaccions anteriors amb el client i proporcionar respostes basades en aquell context.

| Flux de Sessions:1\. Client: POST /login { email, password }           ↓2\. Servidor: verifica credencials → crea sessió   sessions\["abc123"\] \= { userId: 42, nom: "Anna", rol: "admin" }   Resposta: Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Strict           ↓3\. Client: GET /perfil → Cookie: sessionId=abc123           ↓4\. Servidor: cerca sessions\["abc123"\] → trobo userId=42             ← accés concedit \+ dades del perfil           ↓5\. Logout: DELETE sessions\["abc123"\] → sessió eliminada immediatament |
| :---- |

**Com funciona l'autenticació JWT (Stateless)**

A diferència de l'autenticació basada en sessions on l'emmagatzematge del servidor manté l'estat de l'usuari, els tokens JWT son completament autoverificables. 

El payload inclou claims estàndard com `iss` (issuer), `exp` (expiration), `iat` (issued at), i `sub` (subject), més claims personalitzats específics de l'aplicació.

| Flux JWT:1\. Client: POST /login { email, password }           ↓2\. Servidor: verifica credencials → genera JWT signat   Payload: { sub: "42", email: "anna@e.com", rol: "admin",              iat: 1719619200, exp: 1719622800 }   Resposta: { accessToken: "eyJhbGci..." }           ↓3\. Client: guarda el token (localStorage o HttpOnly Cookie)           ↓4\. Client: GET /perfil → Authorization: Bearer eyJhbGci...           ↓5\. Servidor: verifica la signatura criptogràfica ← SENSE consultar BD\!             extreu el payload → userId=42, rol=admin             ← accés concedit \+ dades del perfil           ↓6\. Logout: el client elimina el token local           → PERÒ el token segueix vàlid fins a expirar\! ← problema |
| :---- |

| // L'estructura d'un JWT: tres parts separades per punts// header.payload.signature// Header (algoritme):{ "alg": "HS256", "typ": "JWT" }// Payload (claims):{  "sub": "507f1f77bcf86cd799439011",  // userId  "email": "anna@e.com",  "rol": "admin",  "iat": 1719619200,   // issued at  "exp": 1719622800    // expira en 1 hora}// Signature: HMAC-SHA256(base64(header) \+ "." \+ base64(payload), secret)// → Si algú modifica el payload, la signatura no coincideix → token rebutjat |
| :---- |

**Avantatges i desavantatges: la comparativa completa**

### **Sessions (Stateful)**

L'autenticació stateful és menys escalable que la stateless perquè requereix que el servidor mantingui l'estat, la qual cosa pot convertir-se en un problema amb bases d'usuaris grans.

| AVANTATGES de Sessions:  ✅ Revocació immediata: DELETE sessions\[id\] → logout instantani  ✅ Control total: el servidor sap exactament qui té sessió activa  ✅ Seguretat contra XSS: session ID en HttpOnly cookie → JS no pot llegir-la  ✅ Dades sensibles al servidor: el client no veu res crític  ✅ Simplifica la detecció d'anomalies: veus les sessions actives  ✅ Ideal per a apps web tradicionals (single-domain)DESAVANTATGES de Sessions:  ❌ Escalabilitat: en múltiples servidors, tous els han de compartir     l'emmagatzematge de sessions (Redis, BD) → overhead  ❌ Sticky sessions: sense Redis compartit, l'usuari ha d'anar     sempre al MATEIX servidor → impossible escalar horitzontalment  ❌ Microserveis: cada servei ha de consultar el session store     → acoblament d'infraestructura  ❌ CSRF: les cookies s'envien automàticament → vulnerables a CSRF  ❌ Mòbil: les cookies son difícils de gestionar en apps natives |
| :---- |

### 

### **JWT (Stateless)**

La naturalesa stateless de JWT permet als serveis validar tokens independentment sense dependències externes. 

Els serveis únicament necessiten accés a claus públiques o secrets compartits per verificar l'autenticitat del token. 

Aquesta independència simplifica els pipelines de desplegament i redueix l'overhead de comunicació entre serveis.

| AVANTATGES de JWT:  ✅ Escalabilitat: qualsevol servidor pot verificar el token sense     consultar cap emmagatzematge centralitzat  ✅ Microserveis: un servei autenticat pot cridar altres serveis     simplement passant el JWT (sense session store compartit)  ✅ Cross-domain: funciona entre dominis (APIs públiques, SPAs, mòbil)  ✅ Rendiment: verificació criptogràfica sense I/O de BD  ✅ Autocontingut: el payload conté el rol i els claims necessaris  ✅ Estàndard: RFC 7519, suportat per tots els ecosistemesDESAVANTATGES de JWT:  ❌ Revocació difícil: un token robat és vàlid fins que expira     → necessites un token blacklist (que trenca el stateless\!)  ❌ Logout "fals": eliminar el token al client no el invalida     al servidor si no has implementat blacklisting  ❌ Payload exposat: Base64 no és encriptació → no posar dades sensibles  ❌ Mida: un JWT típic és 200-1000 bytes → s'envia a cada petició  ❌ Secret compromès: si la clau secreta es filtra → tots els tokens     es poden forjar |
| :---- |

**El problema de la revocació: la gran limitació del JWT**

En el moment que afegeixes logout, revocació de tokens, seguiment de dispositius, detecció d'anomalies, o controls de risc de compte, JWT deixa de ser completament stateless.

| Escenari: un usuari és fet fora de l'empresa  Sessió:  DELETE sessions\[userId\] → accés tallat IMMEDIATAMENT ✅  JWT:     el token segueix vàlid fins a expirar (pot ser 1 hora)           → l'ex-empleat pot seguir accedint durant 1 hora ❌Solució JWT: token blacklist (però trenca el stateless)  // Redis: emmagatzemar tokens revocats fins a la seva expiració  await redis.setEx(\`blacklist:${jti}\`, tokenTTL, '1');  // A cada petició, verificar si el token està blacklisted  const blacklisted \= await redis.get(\`blacklist:${token.jti}\`);  if (blacklisted) throw new UnauthorizedException('Token revocat'); |
| :---- |

**La solució pràctica: Access \+ Refresh Tokens**

La combinació més adoptada per a APIs REST modernes:

| ACCESS TOKEN:  → Vida curta (15 minuts \- 1 hora)  → Stateless (verificació criptogràfica)  → Si es roba: impacte limitat al temps de vidaREFRESH TOKEN:  → Vida llarga (7-30 dies)  → Guardat en BD/Redis → revocable immediatament  → Únicament s'usa per obtenir nous access tokensFlux complet:  Login → { accessToken (15 min), refreshToken (30 dies) }         ↓  Cada petició: accessToken al header Authorization         ↓  accessToken expira → client crida POST /auth/refresh amb refreshToken         ↓  Servidor: verifica refreshToken a la BD → nou accessToken (15 min)         ↓  Logout: elimina el refreshToken de la BD → revocació efectiva |
| :---- |

| // NestJS: implementació d'Access \+ Refresh Tokens@Injectable()export class AuthService {  async login(usuari: Usuari) {    const accessToken \= this.jwtService.sign(      { sub: usuari.\_id, email: usuari.email, rol: usuari.rol },      { expiresIn: '15m' }  // ← vida curta    );    const refreshToken \= this.jwtService.sign(      { sub: usuari.\_id },      { secret: process.env.REFRESH\_SECRET, expiresIn: '30d' }    );    // Guardar el refresh token hashejat a la BD (revocable)    await this.usuarisService.guardarRefreshToken(usuari.\_id, refreshToken);    return { accessToken, refreshToken };  }  async renovarToken(refreshToken: string) {    // Verificar el refresh token contra la BD    const payload \= this.jwtService.verify(refreshToken, {      secret: process.env.REFRESH\_SECRET    });    const usuari \= await this.usuarisService.trobarPerIdAmbRefreshToken(      payload.sub, refreshToken    );    if (\!usuari) throw new UnauthorizedException('Refresh token invàlid');    // Generar nou access token    return { accessToken: this.jwtService.sign({ sub: usuari.\_id, ... }) };  }} |
| :---- |

**La recomanació per a APIs REST**

Usa sessions per a apps web de domini únic; usa tokens per a APIs, mòbil, cross-domain i quan necessites escalat stateless.

APIs REST → JWT (stateless) és l'opció natural:  
  ✅ El principi REST de stateless s'alinea perfectament  
  ✅ Clients diversos: web, mòbil, altres serveis  
  ✅ Escalat horitzontal sense session store compartit  
  ✅ Microserveis: cada servei verifica el token independentment

Apps web tradicionals (mateix domini) → Sessions:  
  ✅ Revocació immediata (logout segur)  
  ✅ Menys XSS si s'usen HttpOnly cookies  
  ✅ Historial de sessions i gestió de dispositius

La millor pràctica 2026:  
  → JWT de vida curta (15-60 min) \+ Refresh Token a HttpOnly Cookie  
  → Mai guardar JWT a localStorage (vulnerable a XSS)  
  → JWT a HttpOnly Cookie amb SameSite=Strict (protegeix XSS i CSRF)

**Taula comparativa** 

| Aspecte | Sessions (Stateful) | JWT (Stateless) |
| ----- | ----- | ----- |
| **On viu l'estat** | Servidor (Redis/BD) | Client (token) |
| **Escalabilitat** | ⚠️ Requereix session store | ✅ Qualsevol servidor |
| **Revocació** | ✅ Immediata | ❌ Fins a expirar |
| **Microserveis** | ⚠️ Session store compartit | ✅ Token autoverificable |
| **CSRF** | ❌ Vulnerable (cookies) | ✅ Headers no afectats |
| **XSS** | ✅ HttpOnly cookie segura | ⚠️ localStorage és vulnerable |
| **Mòbil/Cross-domain** | ❌ Cookies problemàtiques | ✅ Authorization header |
| **REST (stateless)** | ❌ Viola el principi | ✅ Alineat amb REST |
| **Dades sensibles** | ✅ Al servidor | ❌ Payload llegible |
| **Ideal per a** | Apps web monolítiques | APIs REST, microserveis |

