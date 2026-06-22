## **Apunts T5 — Autenticació i autorització en aplicacions web amb NestJS i MongoDB**

**1\. Autenticació vs. Autorització: la distinció fonamental**

Dues preguntes completament diferents que es responen en ordre estricte:

| Autenticació → "Qui ets?"  → Verificació d'identitat (JWT, credencials, OAuth)  → Error: 401 Unauthorized (nom confús: significa "no autenticat")Autorització → "Quèpots fer?"  → Verificació de permisos (rols, propietat del recurs)  → Error: 403 Forbidden  → SEMPRE després de l'autenticació |
| :---- |

La confusió entre les dues genera vulnerabilitats crítiques: 

un sistema que únicament verifica autenticació però no autorització permet **IDOR** (Insecure Direct Object Reference) — l'usuari A accedeix als recursos de l'usuari B simplement canviant l'ID a la URL. 

I la confusió inversa genera **Privilege Escalation** — un usuari normal s'auto-promou a admin.

**2\. Sessions (Stateful) vs. JWT (Stateless)**

La decisió arquitectural més important per a una API REST:

| Sessions: el servidor RECORDA  → Emmagatzema sessió a Redis/BD  → Client guarda únicament un session ID (cookie)  → Revocació IMMEDIATA (DELETE sessions\[id\])  → Problemes: sticky sessions, no escala horitzontalmentJWT: el servidor NO recorda res  → Client guarda un token autocontingut  → Cada servidor pot verificar la signatura criptogràfica  → Escalat horitzontal trivial (qualsevol servidor pot respondre)  → Problema: revocació difícil (token vàlid fins que expira) |
| :---- |

**REST és naturalment stateless → JWT és l'opció correcta per a APIs REST.**

La solució pràctica per a la revocació: **Access Token de vida curta (15 min) \+ Refresh Token a la BD (30 dies)**. L'access token expira sol. El refresh token és revocable immediatament.

**3\. JWT: Estructura i vulnerabilitats**

| eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MiIsInJvbCI6ImFkbWluIn0.abc123      Header                    Payload                    Signatura   (algoritme)            (claims de l'usuari)       (verificació d'integritat) |
| :---- |

El payload és **Base64, no xifrat** → qualsevol el pot llegir. Mai posar passwords, targetes, ni dades sensibles.

Les cinc vulnerabilitats principals i les seves mitigacions:

| Vulnerabilitat | Com s'explota | Mitigació |
| ----- | ----- | ----- |
| **`alg: none`** | Elimina la signatura | Whitelist explícita: `algorithms: ['HS256']` |
| **Algorithm confusion** | Canvia RS256→HS256, usa clau pública com a secret | El servidor decideix l'algoritme, no el token |
| **Secret feble** | Brute force offline amb hashcat | Secret aleatori ≥256 bits |
| **Payload exposat** | Llegir dades sensibles del token | Únicament dades públiques al payload |
| **Revocació** | Token robat segueix vàlid | Access token curt \+ Refresh token rotation |

| // Configuració segura a NestJS:JwtModule.register({  secret: process.env.JWT\_SECRET,  // ← ≥256 bits aleatoris  signOptions: {    algorithm: 'HS256',   // ← explícit    expiresIn: '15m',     // ← vida curta  },  verifyOptions: {    algorithms: \['HS256'\], // ← whitelist estricta, mai 'none'  },}); |
| :---- |

**4\. OAuth 2.0: autenticació delegada**

OAuth 2.0 resol el problema de compartir contrasenyes amb tercers. Els quatre rols:

| Resource Owner → l'usuari (fa clic a "Continua amb Google")Client         → la teva app NestJSAuthorization Server → Google/GitHub/FacebookResource Server → l'API de Google (perfil, email...) |
| :---- |

El flux **Authorization Code Grant** (el gold standard):

| 1\. App → redirigeix a Google amb client\_id i scopes2\. Usuari → s'autentica a Google i aprova els permisos3\. Google → retorna un codi temporal (10 min, ús únic) al callback4\. App (backend) → intercanvia codi \+ client\_secret per tokens5\. Google → retorna access\_token \+ id\_token (JWT amb perfil)6\. App → findOrCreate l'usuari a la BD local7\. App → emet el seu propi JWT intern |
| :---- |

| // NestJS \+ Passport: Google OAuth@Injectable()export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {  constructor() {    super({      clientID: process.env.GOOGLE\_CLIENT\_ID,      clientSecret: process.env.GOOGLE\_CLIENT\_SECRET,      callbackURL: process.env.GOOGLE\_CALLBACK\_URL,      scope: \['openid', 'profile', 'email'\],    });  }  async validate(accessToken, refreshToken, profile, done) {    const usuari \= await this.authService.findOrCreateGoogleUser({      googleId: profile.id,      email: profile.emails\[0\].value,      nom: profile.displayName,    });    done(null, usuari);  }} |
| :---- |

**5\. bcrypt: hashing segur de contrasenyes**

Per quèno es guarden contrasenyes en text pla: les BD es filtren. Amb text pla → accés immediat a tots els comptes, credential stuffing a altres serveis, zero opció de recuperació.

Per quèno es pot usar MD5/SHA-256 per a contrasenyes: son algorismes ràpids (200 bilions de hashes/segon amb GPU moderna). "password123" es trenca en 14 segons.

**bcrypt és lent per disseny** \+ genera un salt únic automàticament:

| Cost 12 (recomanació OWASP 2024-2026):  → 2^12 \= 4.096 rounds de Blowfish key setup  → \~250ms per hash  → Atacant: \~4 hashes/segon → "password123" trigaria 800 anysHash bcrypt resultant (60 caràcters, autoverificable):$2b$12$R9h/cIPz0gi.URNNX3kh2O... ↑   ↑  ↑──────────────────────↑versió cost  salt+hash (auto-verificable, no cal guardar el salt apart) |
| :---- |

| // NestJS: registre i login@Injectable()export class AuthService {  private readonly SALT\_ROUNDS \= 12;  async registrar(dto: RegistreDto) {    const hash \= await bcrypt.hash(dto.password, this.SALT\_ROUNDS);    return this.usuariModel.create({ ...dto, password: hash });  }  async validarUsuari(email: string, password: string) {    const usuari \= await this.usuariModel.findOne({ email }).select('+password');    if (\!usuari) return null;    const coincideix \= await bcrypt.compare(password, usuari.password);    return coincideix ? usuari : null;  }} |
| :---- |

**6\. CSRF: atac i defensa**

CSRF explota que el navegador envia cookies automàticament a qualsevol domini:

1\. Usuari autenticat a banc.com (té cookie de sessió)  
2\. Visita evil.com → formulari oculte fa POST a banc.com  
3\. El navegador adjunta la cookie automàticament  
4\. banc.com executa la transferència\!

**Les tres defenses:**

**`SameSite` Cookie Attribute** — la defensa més senzilla i efectiva:

| SameSite=Strict → cookie MAI s'envia en peticions cross-siteSameSite=Lax    → s'envia en navegació top-level (GET), NO en POST/PUT/DELETESameSite=None   → s'envia sempre (requereix Secure) |
| :---- |

**CSRF Token** — valor imprevisible al formulari, verificat al servidor.

**Bearer Token** — les APIs amb `Authorization: Bearer` son **naturalment immune** a CSRF perquè el navegador no pot afegir headers personalitzats automàticament. Evil.com no pot llegir el token (Same-Origin Policy).

| // JWT en cookie: combinar les dues proteccionsresponse.cookie('access-token', jwt, {  httpOnly: true,     // ← protecció XSS (JS no pot llegir-la)  secure: true,       // ← únicament HTTPS  sameSite: 'strict', // ← protecció CSRF}); |
| :---- |

**7\. Guards de NestJS: el principi de mínim privilegi**

Els Guards determinen si una petició pot accedir a un route handler. S'executen DESPRÉS del middleware però ABANS dels interceptors i pipes.

| // El flux de Guards en ordre:Petició → \[JwtAuthGuard\] → \[RolsGuard\] → \[PropietatGuard\] → Handler           "Qui ets?"      "Tens rol?"    "És el teu recurs?"           401 si no        403 si no      403 si no |
| :---- |

**Implementació completa RBAC:**

| // 1\. Enum de rolsenum Rol { USUARI \= 'usuari', EDITOR \= 'editor', ADMIN \= 'admin' }// 2\. Decorador personalitzatexport const Rols \= (...rols: Rol\[\]) \=\> SetMetadata('rols', rols);export const Public \= () \=\> SetMetadata('isPublic', true);// 3\. Guard d'autorització per rol@Injectable()export class RolsGuard implements CanActivate {  constructor(private reflector: Reflector) {}  canActivate(context: ExecutionContext): boolean {    const rolsRequerits \= this.reflector.getAllAndOverride\<Rol\[\]\>('rols', \[      context.getHandler(),  // ← prioritat: mètode      context.getClass(),    // ← fallback: controller    \]);    if (\!rolsRequerits) return true;    const { user } \= context.switchToHttp().getRequest();    return rolsRequerits.some(rol \=\> user.rol \=== rol);    // false → NestJS llança 403 automàticament  }}// 4\. Aplicació al controller@Controller('api')@UseGuards(JwtAuthGuard, RolsGuard)export class ApiController {  @Get() @Public()                         // qualsevol  llistar() {}  @Post() @Rols(Rol.EDITOR, Rol.ADMIN)    // editors i admins  crear() {}  @Delete(':id') @Rols(Rol.ADMIN)         // únicament admins  eliminar() {}} |
| :---- |

**Resum el tema:** 

Autenticació vs. Autorització  
  → Auth: qui ets (401) / Authz: quèpots fer (403)  
  → Sempre en ordre: primer auth, després authz

Sessions vs. JWT  
  → Sessions: stateful, revocació immediata, no escala  
  → JWT: stateless, escala, difícil revocar  
  → Solució: Access Token (15min) \+ Refresh Token (BD, revocable)

JWT Vulnerabilitats  
  → alg:none, algorithm confusion, secret feble  
  → Payload llegible → mai dades sensibles  
  → Mitigació: whitelist algoritme, secret fort, vida curta

OAuth 2.0  
  → Mai compartir contrasenyes amb tercers  
  → Authorization Code Grant: el flux estàndard  
  → NestJS: Passport \+ GoogleStrategy  
  → findOrCreate \+ JWT propi de l'aplicació

bcrypt  
  → Lent per disseny (cost 12 \= \~250ms)  
  → Salt únic automàtic → immune a rainbow tables  
  → Sempre bcrypt.compare(), mai \===  
  → Guardar hash a BD, mai contrasenya

CSRF  
  → Cookies → vulnerables (navegador envia automàticament)  
  → Bearer Token → immune per Same-Origin Policy  
  → Defensa cookies: SameSite=Strict \+ CSRF Token

Guards NestJS  
  → CanActivate → true (continua) o false/excepció (403)  
  → Reflector \+ SetMetadata → metadades declaratives  
  → JwtAuthGuard (auth) → RolsGuard (rols) → PropietatGuard (recurs)  
  → Principi mínim privilegi: @Public, @Rols(EDITOR), @Rols(ADMIN)

