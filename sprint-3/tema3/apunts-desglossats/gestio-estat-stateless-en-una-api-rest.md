**Analitza: Com gestionar l'estat (stateless) en una API REST i per què és important?**

**Què és "stateless" i per quèés un principi fonamental**

Statelessness significa que cada petició conté tot el que el servidor necessita per satisfer-la; cap context de sessió ocult viu al backend. Si emmagatzemes un objecte d'usuari a la memòria després del login, has trencat el contracte i has fet l'escalat horitzontal més difícil. 

El principi és no negociable en arquitectures cloud-native i és una pràctica fonamental en el disseny REST.

Statelessness assegura que cada petició del client conté tota la informació que el servidor necessita per processar-la, sense que el servidor retingui cap dada de sessió ni estat entre peticions. 

És una restricció REST clau i és suportada naturalment pel protocol HTTP, que és inherentment stateless.

**Stateful vs. Stateless: la diferència pràctica**

| STATEFUL (sessions al servidor) \-- ❌ anti-patró REST:  1\. Client fa POST /login → Servidor crea sessió → guarda a memòria     sessio\["sess-abc123"\] \= { usuariId: 42, rol: "admin" }  2\. Client fa GET /perfil amb Cookie: sess-abc123     → Servidor busca la sessió a memòria     → Si el servidor és diferent al del login → sessió no existeix\! ❌Problemes:  → El client ha d'anar sempre al MATEIX servidor (sticky sessions)  → Si el servidor cau → totes les sessions perden-se  → Cada servidor ha de compartir memòria → Redis compartit obligatori  → Escalat horitzontal molt complicatSTATELESS (JWT al client) \-- ✅ patró REST correcte:  1\. Client fa POST /login → Servidor valida → retorna JWT  2\. Client fa GET /perfil amb Authorization: Bearer \<jwt\>     → QUALSEVOL servidor pot validar el JWT (és autoverificable)     → Cap consulta a base de dades de sessions necessària     → Escalat horitzontal trivial |
| :---- |

**Els 4 beneficis del Stateless en una API REST**

### **Benefici 1: Escalabilitat Horitzontal**

Com que no s'emmagatzema cap dada de sessió al servidor, és més fàcil escalar l'API horitzontalment. Qualsevol instància del servidor pot processar qualsevol petició, fent-ho ideal per a sistemes cloud o distribuïts.

| Stateful (sticky sessions):          Stateless (JWT):  Client A → sempre Servidor 1         Client A → Servidor 1 o 2 o 3  Client B → sempre Servidor 2         Client B → Servidor 1 o 2 o 3  ← no pots moure clients              ← pots afegir/eliminar servidors    entre servidors                      sense impacte als clients |
| :---- |

### **Benefici 2: Tolerància a Fallades**

Si una instància del servidor falla, les peticions en vol fallen però no es perd cap estat persistent. Els clients poden reintenta contra qualsevol altra instància.

### **Benefici 3: Rendiment i Cacheabilitat**

Les APIs stateless típicament ofereixen millor rendiment perquè no hi ha sobrecàrrega en mantenir i accedir a dades de sessió. Com que cada petició és independent, hi ha menys complexitat en gestionar múltiples clients o peticions concurrents.

### **Benefici 4: Simplicitat**

Eliminar la gestió de sessions del servidor elimina tota una categoria de bugs relacionats amb l'expiració de sessions, la sincronització, i l'emmagatzematge.

**JWT: la implementació stateless de l'autenticació**

En lloc de l'autenticació basada en sessions, les APIs han de basar-se en l'autenticació basada en tokens, com JWT o tokens OAuth. Aquests tokens s'envien amb cada petició, permetent al servidor autenticar usuaris sense emmagatzemar dades de sessió.

| // L'estructura d'un JWT: header.payload.signature// eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0MiJ9.abc123signature// El payload conté la informació d'autenticació:{  "sub": "507f1f77bcf86cd799439011",  // userId (MongoDB ObjectId)  "email": "anna@exemple.com",  "rol": "admin",  "iat": 1719619200,                  // issued at (Unix timestamp)  "exp": 1719622800                   // expira en 1 hora}// El JWT és autoverificable:// El servidor únicament necessita la clau secreta per validar-lo// Sense cap consulta a la base de dades\! |
| :---- |

### **Implementació JWT en NestJS**

| // npm install @nestjs/jwt @nestjs/passport passport passport-jwt// src/auth/auth.module.ts@Module({  imports: \[    JwtModule.registerAsync({      imports: \[ConfigModule\],      useFactory: (config: ConfigService) \=\> ({        secret: config.get\<string\>('JWT\_SECRET'),        signOptions: { expiresIn: '1h' },      }),      inject: \[ConfigService\],    }),    UsuarisModule,  \],  providers: \[AuthService, JwtStrategy\],  controllers: \[AuthController\],  exports: \[AuthService\],})export class AuthModule {}// src/auth/auth.service.ts@Injectable()export class AuthService {  constructor(    private jwtService: JwtService,    private usuarisService: UsuarisService,  ) {}  async login(loginDto: LoginDto) {    const usuari \= await this.validarUsuari(loginDto.email, loginDto.password);    if (\!usuari) {      throw new UnauthorizedException('Credencials incorrectes');    }    // El payload va emmagatzemat AL TOKEN (no al servidor)    const payload \= {      sub: usuari.\_id,      email: usuari.email,      rol: usuari.rol,    };    return {      accessToken: this.jwtService.sign(payload),      // El client guarda aquest token i l'envia a CADA petició    };  }  private async validarUsuari(email: string, password: string) {    const usuari \= await this.usuarisService.trobarPerEmail(email);    if (usuari && await bcrypt.compare(password, usuari.password)) {      return usuari;    }    return null;  }}// src/auth/jwt.strategy.ts \-- validació stateless del token@Injectable()export class JwtStrategy extends PassportStrategy(Strategy) {  constructor(config: ConfigService) {    super({      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),      secretOrKey: config.get\<string\>('JWT\_SECRET'),    });  }  // Això s'executa DESPRÉS de validar la signatura del JWT  // La informació ve del token, NO d'una consulta a la BD  async validate(payload: any) {    return {      userId: payload.sub,      email: payload.email,      rol: payload.rol,    };  }} |
| :---- |

**Guards: protegir endpoints de manera stateless**

| // src/auth/jwt-auth.guard.tsimport { Injectable } from '@nestjs/common';import { AuthGuard } from '@nestjs/passport';@Injectable()export class JwtAuthGuard extends AuthGuard('jwt') {}// Ús als controllers: protegir endpoints específics@Controller('api/usuaris')export class UsuarisController {  @UseGuards(JwtAuthGuard)  // ← requereix JWT vàlid  @Get('perfil')  obtenirPerfil(@Request() req) {    // req.user conté el payload del JWT (sense consulta a BD)    return req.user;  }  @UseGuards(JwtAuthGuard)  @Get()  trobarTots() { ... }  // Endpoint públic: sense guard  @Post('registre')  registrar(@Body() dto: RegistreDto) { ... }}// Alternativa: Guard global per a TOTA l'aplicació// main.ts:app.useGlobalGuards(new JwtAuthGuard());// → Tots els endpoints requereixen JWT excepte els marcats amb @Public() |
| :---- |

**On emmagatzemar l'estat: la responsabilitat del client**

Si una aplicació necessita mantenir l'estat de l'usuari — com un carret de la compra o el progrés d'un formulari pas a pas — hauria d'emmagatzemar aquell estat al costat client. 

Les opcions inclouen: emmagatzematge al navegador (localStorage, sessionStorage, cookies), i incloure informació relacionada amb l'estat en cada petició (query parameters, capçaleres de petició).

| // El client guarda l'estat localment:// localStorage.setItem('token', accessToken);// Cada petició inclou el token (Axios interceptor):apiClient.interceptors.request.use((config) \=\> {  const token \= localStorage.getItem('token');  if (token) config.headers.Authorization \= \`Bearer ${token}\`;  return config;});// El carret de la compra: emmagatzemat al client o a la BD// ❌ Estateful (servidor): sessio\["cart"\] \= \[...\] → problema d'escalabilitat// ✅ Stateless (token o BD): cada petició envia el carritoId//    GET /api/comanda?carritoId=abc123//    O: emmagatzemar el carret a MongoDB i referenciar-lo per userId al JWT |
| :---- |

**El cas especial: estat de transaccions a la BD**

Alguns fluxos de treball, com les transaccions en múltiples passos o el processament de pagaments, poden requerir el seguiment de l'estat. 

En aquests casos, les APIs stateless poden implementar operacions amb estat a nivell de base de dades o usar tokens temporals que persisteixen durant una sola transacció.

| // Flux de pagament en múltiples passos: estat a la BD, no al servidor// Pas 1: crear la intenció de pagament (guarda estat a MongoDB)async crearIntencioPagament(userId: string, total: number) {  const intencio \= await this.intencioModel.create({    userId,    total,    estat: 'pendent',        // ← estat guardat a la BD    tokenTransaccio: uuid(), // ← token per a la sessió de pagament    expiresAt: new Date(Date.now() \+ 30 \* 60 \* 1000) // 30 minuts  });  return { tokenTransaccio: intencio.tokenTransaccio };}// Pas 2: confirmar el pagament (el client envia el token)async confirmarPagament(tokenTransaccio: string, dadesTargeta: any) {  const intencio \= await this.intencioModel.findOne({    tokenTransaccio,    expiresAt: { $gt: new Date() }  // no expirat  });  if (\!intencio) throw new BadRequestException('Token invàlid o expirat');  // processar...  await intencio.updateOne({ estat: 'completat' });}// → L'estat és a MongoDB, no a la memòria del servidor// → Qualsevol instància del servidor pot gestionar el pas 2 |
| :---- |

**Resum: les regles del Stateless en una API REST**

| Principi | Implementació |
| ----- | ----- |
| **Cada petició és autocontinguda** | El JWT porta la identitat de l'usuari |
| **Cap sessió al servidor** | Autenticació via JWT, no cookies de sessió |
| **L'estat és responsabilitat del client** | localStorage, cookies, state management |
| **L'estat persistent va a la BD** | MongoDB, no memòria del servidor |
| **Qualsevol servidor pot respondre** | Escalat horitzontal sense sticky sessions |
| **Si el servidor cau, no es perd estat** | El client reintenta contra qualsevol instància |

