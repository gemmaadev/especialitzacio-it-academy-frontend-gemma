**Quins beneficis ofereix OAuth 2.0 en comparació amb l'autenticació tradicional quan s'integren serveis de tercers? Descriu els rols i el flux principal del Authorization Code Grant.**

## **Què és OAuth 2.0 i per què existeix**

OAuth 2.0 és un framework obert d'autorització estàndard que permet a una aplicació sol·licitar accés delegat i segur a un recurs protegit en nom d'un usuari o, en alguns casos, en nom d'una identitat de màquina.

El problema que resol: l'autenticació tradicional amb tercers requeria compartir la contrasenya, cosa que és un risc de seguretat enorme.

| AUTENTICACIÓ TRADICIONAL amb tercers (problemàtica):  "Vols importar els teus contactes de Gmail?"  → L'app et demana el teu email i password de Google  → Tu li dones les teves credencials de Google a l'app\!  → L'app ara té accés complet al teu compte de Google  → Si l'app es fa malbé → totes les teves dades de Google exposades  → Per treure l'accés → has de canviar la teva contrasenya de GoogleOAUTH 2.0 (solució):  → Mai comparteixes les teves credencials de Google  → Tu (el propietari) autoritzes un accés limitat (scope)  → L'app obté un token d'accés limitat (únicament els permisos concedits)  → Per treure l'accés → revoques el token (sense canviar password) |
| :---- |

**Els beneficis principals d'OAuth 2.0**

1. **Mai comparteixes contrasenyes** — La credencial de Google/Facebook/GitHub mai abandona el servidor de l'Identity Provider. L'aplicació obté un token d'accés limitat.  
2. **Accés granular via Scopes** — Els scopes determinen quines dades vol accedir la teva aplicació. Si únicament necessites accés a dades bàsiques de perfil, no sol·licitis permisos per email o contactes. Evita sol·licitar permisos massa amplis que els usuaris podrien dubtar a concedir.  
3. **Revocació sense canviar contrasenya** — L'usuari pot revocar l'accés a una aplicació concreta des del seu panell de Google/GitHub sense afectar les altres aplicacions.  
4. **UX superior** — "Continua amb Google" en un clic en lloc d'un formulari de registre complet.  
5. **Responsabilitat de seguretat delegada** — Google/GitHub gestionen l'autenticació, 2FA, detecció d'activitat sospitosa. Tu no has de gestionar credencials dels usuaris.

**Els 4 rols d'OAuth 2.0**

Abans d'entendre els fluxos, necessites entendre els quatre rols que participen en cada interacció OAuth 2.0. 

* **Resource Owner:** l'usuari que posseeix les dades i concedeix permís per accedir-hi.   
* **Client**: l'aplicació que sol·licita l'accés.   
* **Authorization Server:** el servidor que autentica el Resource Owner i emet tokens d'accés.   
* **Google OAuth server, Auth0, Okta, o el teu propi identity provider.**

| 1\. RESOURCE OWNER (Propietari del Recurs)   → L'usuari final que fa clic a "Continua amb Google"   → Decideix quins permisos concedir2\. CLIENT (L'Aplicació)   → La teva aplicació NestJS que vol accés als recursos   → Té un client\_id i client\_secret registrats a Google   → Confidential client (pot guardar secrets, servidor backend)   vs. Public client (SPA, app mòbil, no pot guardar secrets)3\. AUTHORIZATION SERVER (Servidor d'Autorització)   → Google, GitHub, Facebook, Auth0, Okta...   → Autentica l'usuari i emet tokens   → Gestiona el consentiment de l'usuari (pantalla de permisos)4\. RESOURCE SERVER (Servidor de Recursos)   → L'API que conté els recursos protegits   → Google Profile API, GitHub API, etc.   → Accepta tokens d'accés per servir els recursos   → (En molts casos, Authorization Server i Resource Server      son el mateix servei o del mateix proveïdor) |
| :---- |

**El flux Authorization Code Grant: el flux estàndard**

L'Authorization Code grant representa el gold standard per a aplicacions orientades a usuaris que requereixen autenticació segura amb identity providers externs. Recomanat quan l'arquitectura de la teva aplicació inclou components frontend i backend.

FLUX COMPLET Authorization Code Grant:

| 1\. Usuari fa clic: "Continua amb Google"         ↓2\. NestJS redirigeix a Google:   GET https://accounts.google.com/o/oauth2/v2/auth     ?client\_id=CLIENT\_ID     \&redirect\_uri=https://api.exemple.com/auth/google/callback     \&response\_type=code       ← sol·licita un "code"     \&scope=openid profile email  ← permisos sol·licitats     \&state=RANDOM\_STRING      ← protecció CSRF         ↓3\. Google mostra la pantalla de login i consentiment   "L'app vol accedir a: el teu nom, email i foto de perfil"   \[Permetre\] \[Cancel·lar\]         ↓4\. Usuari aprova → Google redirigeix al callback:   GET https://api.exemple.com/auth/google/callback     ?code=AUTHORIZATION\_CODE   ← codi temporal (10 min, ús únic)     \&state=RANDOM\_STRING       ← verificar contra CSRF         ↓5\. NestJS (BACKEND) intercanvia el codi per tokens:   POST https://oauth2.googleapis.com/token     client\_id=CLIENT\_ID     client\_secret=CLIENT\_SECRET    ← secret mai exposa al frontend     code=AUTHORIZATION\_CODE     grant\_type=authorization\_code     redirect\_uri=https://api.exemple.com/auth/google/callback         ↓6\. Google respon amb tokens:   {     "access\_token": "ya29.xxx",    ← accés als recursos de Google     "id\_token": "eyJhbGci...",     ← JWT amb dades de l'usuari (OIDC)     "refresh\_token": "1//xxx",     ← renovar access token     "expires\_in": 3600   }         ↓7\. NestJS extreu el perfil de l'usuari:   \- Decodifica el id\_token (JWT de Google)   \- O crida: GET https://www.googleapis.com/oauth2/v2/userinfo   \- Obté: { id, email, name, picture }         ↓8\. NestJS: findOrCreate a la BD local   → Busca si existeix un usuari amb googleId \= profile.id   → Si no existeix → crea'l   → Genera el JWT propi de l'aplicació         ↓9\. NestJS envia el JWT propi al client   → Ara l'usuari pot usar l'app normalment |
| :---- |

Com que el Resource Owner únicament s'autentica amb el servidor d'autorització, les credencials del Resource Owner mai es comparteixen amb el client. 

El codi d'autorització proporciona importants beneficis de seguretat, com la capacitat d'autenticar el client, i la transmissió del token d'accés directament al client sense passar per l'user-agent del Resource Owner.

**Implementació amb NestJS i [Passport.js](http://Passport.js)**

| npm install @nestjs/passport passport passport-google-oauth20npm install @types/passport-google-oauth20 \--save-dev |
| :---- |

| // src/auth/strategies/google.strategy.tsimport { Injectable } from '@nestjs/common';import { PassportStrategy } from '@nestjs/passport';import { Strategy, VerifyCallback } from 'passport-google-oauth20';import { ConfigService } from '@nestjs/config';@Injectable()export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {  constructor(    private configService: ConfigService,    private authService: AuthService,  ) {    super({      clientID: configService.get('GOOGLE\_CLIENT\_ID'),      clientSecret: configService.get('GOOGLE\_CLIENT\_SECRET'),      callbackURL: configService.get('GOOGLE\_CALLBACK\_URL'),      // Scopes: quines dades volem de Google      scope: \['openid', 'profile', 'email'\],    });  }  // Passport crida aquest mètode amb les dades de Google  // Un cop l'intercanvi code → token ha tingut èxit  async validate(    accessToken: string,    refreshToken: string,    profile: any,    done: VerifyCallback,  ): Promise\<any\> {    const { id, displayName, emails, photos } \= profile;    // Trobar o crear l'usuari a la nostra BD    const usuari \= await this.authService.findOrCreateGoogleUser({      googleId: id,      nom: displayName,      email: emails\[0\].value,      avatar: photos\[0\].value,    });    // Passport adjuntarà aquest usuari a req.user    done(null, usuari);  }}// src/auth/auth.controller.ts@Controller('auth')export class AuthController {  constructor(private authService: AuthService) {}  // PAS 1: Redirigir a Google  @Get('google')  @UseGuards(AuthGuard('google'))  // ← Passport gestiona la redirecció  googleAuth() {    // Aquest mètode no s'executa mai:    // Passport intercepta la petició i redirigeix a Google  }  // PAS 2: Callback de Google  @Get('google/callback')  @UseGuards(AuthGuard('google'))  // ← Passport intercanvia el code  async googleCallback(@Request() req, @Res() res: Response) {    // req.user conté el que ha retornat GoogleStrategy.validate()    const { accessToken } \= await this.authService.login(req.user);    // Redirigir al frontend amb el token    res.redirect(\`https://app.exemple.com/oauth-callback?token=${accessToken}\`);    // ← En producció: usar HttpOnly cookie en lloc de query param\!  }}// src/auth/auth.service.ts@Injectable()export class AuthService {  constructor(    @InjectModel(Usuari.name) private usuariModel: Model\<UsuariDocument\>,    private jwtService: JwtService,  ) {}  // findOrCreate: el patró clau per a OAuth  async findOrCreateGoogleUser(googleProfile: {    googleId: string;    nom: string;    email: string;    avatar: string;  }): Promise\<Usuari\> {    // Buscar per googleId primer    let usuari \= await this.usuariModel.findOne({      googleId: googleProfile.googleId    });    if (\!usuari) {      // Comprovar si ja existeix amb el mateix email (login local previ)      usuari \= await this.usuariModel.findOne({ email: googleProfile.email });      if (usuari) {        // Vincular el compte Google al compte existent        usuari.googleId \= googleProfile.googleId;        await usuari.save();      } else {        // Crear un nou usuari        usuari \= await this.usuariModel.create({          googleId: googleProfile.googleId,          nom: googleProfile.nom,          email: googleProfile.email,          avatar: googleProfile.avatar,          rol: 'usuari',          // No s'emmagatzema password (autenticació via Google)        });      }    }    return usuari;  }  async login(usuari: Usuari) {    // Generar el JWT propi de l'aplicació    const payload \= { sub: usuari.\_id, email: usuari.email, rol: usuari.rol };    return { accessToken: this.jwtService.sign(payload) };  }} |
| :---- |

**OAuth 2.0 \+ OIDC: la distinció important**

Després d'un Authorization Code Grant OAuth 2.0 exitós, l'identity provider retorna un `id_token` al costat del `access_token`. Aquest `id_token` és un JWT que conté claims verificats de l'usuari.

| OAuth 2.0 → AUTORITZACIÓ  → "L'aplicació pot accedir als recursos de l'usuari"  → Emet: access\_token (accés a recursos)OpenID Connect (OIDC) → AUTENTICACIÓ (construït sobre OAuth 2.0)  → "L'usuari és autenticat i aquí teniu les seves dades"  → Emet: id\_token (JWT amb dades de l'usuari: sub, email, name...)  → Els proveïdors moderns (Google, GitHub) implementen OIDCEn la pràctica:  → Quan uses "Continua amb Google" estàs usant OIDC (OAuth 2.0 \+ autenticació)  → El id\_token conté: { sub: "googleId", email, name, picture }  → No necessites cridar l'API de Google per obtenir el perfil → ja és al token |
| :---- |

**OAuth 2.0 vs. Autenticació tradicional**

| Aspecte | Tradicional | OAuth 2.0 |
| ----- | ----- | ----- |
| **Credencials** | L'app guarda email \+ password | Mai veu la contrasenya |
| **Seguretat** | Un breach → totes les dades | Token limitat i revocable |
| **Permisos** | Tot o res | Scopes granulars |
| **Revocació** | Canviar la contrasenya | Revocar el token específic |
| **UX** | Formulari de registre complet | Un clic |
| **2FA** | Cal implementar-ho | Google/GitHub ho gestionen |
| **Responsabilitat** | L'app gestiona credencials | Delegada al Identity Provider |

