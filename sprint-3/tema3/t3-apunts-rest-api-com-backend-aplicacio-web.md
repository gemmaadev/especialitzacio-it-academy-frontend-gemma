## **Apunts T3 — REST API com a Backend: NestJS i MongoDB**

**1\. Els principis fonamentals de REST**

REST (Representational State Transfer) és un estil arquitectural definit per Roy Fielding el 2000, no un protocol. Una API que segueix les seves restriccions s'anomena RESTful. 

Els 6 principis:

* **Interfície Uniforme** — URLs identifiquen recursos (substantius), mètodes HTTP identifiquen accions (verbs).   
* **Client-Servidor** — separació de responsabilitats, evolució independent.   
* **Stateless** — cada petició és autocontinguda, el servidor no guarda sessió.   
* **Cacheable** — les respostes indiquen si es poden fer caché.   
* **Sistema per Capes** — intermediaris transparents (proxies, gateways, load balancers).   
* **Code on Demand** — opcional, el servidor pot enviar codi executable.

Diferències respecte a alternatives: 

REST usa múltiples endpoints i HTTP estàndard → senzill i madur.   
GraphQL usa un sol endpoint i el client especifica quines dades vol → elimina over/under-fetching.   
gRPC usa Protocol Buffers binaris i HTTP/2 → molt més ràpid per a microserveis interns.  
SOAP usa XML i és un protocol estricte → legacy empresarial.

**2\. Verbs HTTP i CRUD**

Les URLs son substantius (recursos), els mètodes HTTP son els verbs (accions):

GET    /api/usuaris          → llegir tots (200 OK)  
GET    /api/usuaris/42       → llegir un (200 / 404\)  
POST   /api/usuaris          → crear nou (201 Created)  
PUT    /api/usuaris/42       → substituir complet (200 OK)  
PATCH  /api/usuaris/42       → actualitzar parcial (200 OK)  
DELETE /api/usuaris/42       → eliminar (204 No Content)

Les propietats clau: **Safe** (GET no modifica l'estat) i **Idempotent** (GET, PUT, DELETE: el mateix resultat si es crida N vegades). 

POST no és idempotent (crea un nou recurs cada vegada). PATCH tampoc (depèn de la implementació).

**3\. L'arquitectura de NestJS: mòduls, controladors i serveis**

NestJS és un framework TypeScript per a Node.js (sobre Express o Fastify) amb arquitectura modular inspirada en Angular. Els tres pilars:

* **Mòdul** — la unitat organitzativa. Agrupa controladors i serveis relacionats. El mòdul arrel (`AppModule`) connecta tots els feature modules.  
* **Controlador** — gestiona les peticions HTTP i retorna respostes. Conté la lògica de rutes. No conté lògica de negoci.  
* **Servei (Provider)** — conté la lògica de negoci i les operacions a la BD. Marcat amb `@Injectable()`, injectat via constructor (DI).

| // El cicle complet en tres fitxers:@Module({ imports: \[MongooseModule.forFeature(\[...\])\],          controllers: \[UsuarisController\],          providers: \[UsuarisService\] })export class UsuarisModule {}@Controller('usuaris')export class UsuarisController {  constructor(private readonly usuarisService: UsuarisService) {}  @Get(':id')  trobarPerId(@Param('id') id: string) {    return this.usuarisService.trobarPerId(id);  // delega al service  }}@Injectable()export class UsuarisService {  constructor(@InjectModel(Usuari.name) private usuariModel: Model\<UsuariDocument\>) {}  async trobarPerId(id: string) {    const usuari \= await this.usuariModel.findById(id);    if (\!usuari) throw new NotFoundException(\`Usuari ${id} no trobat\`);    return usuari;  }} |
| :---- |

Relació amb MVC: Controller \= Controller, Service \= Model (lògica), JSON Response \= View.

**4\. Validació: DTOs i ValidationPipe**

El 60% de les bretxes de seguretat sorgeixen d'una gestió incorrecta dels inputs. La regla fonamental: mai confiar en el client. El frontend valida per UX, el backend revalida absolutament tot.

**DTO (Data Transfer Object)** — classe TypeScript que defineix l'estructura i les regles de validació de les dades entrants.

| // npm install class-validator class-transformerexport class CrearUsuariDto {  @IsString() @IsNotEmpty() @MaxLength(100)  nom: string;  @IsEmail()  email: string;  @IsString() @MinLength(8)  password: string;  @IsOptional() @IsEnum(\['usuari', 'editor', 'admin'\])  rol?: string \= 'usuari';}// main.ts \-- ValidationPipe globalapp.useGlobalPipes(new ValidationPipe({  whitelist: true,              // elimina camps no declarats al DTO  forbidNonWhitelisted: true,   // error si hi ha camps extres  transform: true,              // "42" (string) → 42 (number) automàticament})); |
| :---- |

DTOs derivats sense repetir codi: `PartialType` (tots opcionals → PATCH), `PickType` (subconjunt de camps), `OmitType` (exclou camps específics).

**5\. MongoDB i Mongoose amb NestJS**

MongoDB és la BD ideal per al stack MERN/MEAN: documents JSON naturals, esquema flexible, escalabilitat horitzontal. Mongoose és el ODM (Object Data Modeling) que proporciona esquemes, validació i hooks.

| // Schema amb decoradors NestJS@Schema({ timestamps: true })export class Producte {  @Prop({ required: true }) nom: string;  @Prop({ required: true, min: 0 }) preu: number;  @Prop({ default: true }) actiu: boolean;  @Prop({ type: Types.ObjectId, ref: 'Categoria' }) categoriaId: Types.ObjectId;  @Prop({ type: \[{ color: String, stock: Number }\] }) variants: any\[\];}export const ProducteSchema \= SchemaFactory.createForClass(Producte);// CRUD al serviceasync trobarTots(): Promise\<Producte\[\]\> {  return this.producteModel.find({ actiu: true })    .populate('categoriaId', 'nom')  // ← JOIN equivalent    .lean().exec();}async crear(dto: CrearProducteDto) {  return new this.producteModel(dto).save();}async actualitzar(id: string, dto: ActualitzarProducteDto) {  const doc \= await this.producteModel    .findByIdAndUpdate(id, { $set: dto }, { new: true }).exec();  if (\!doc) throw new NotFoundException(\`Producte ${id} no trobat\`);  return doc;} |
| :---- |

**6\. Stateless: gestió de l'estat amb JWT**

REST és stateless: el servidor no guarda sessió. Cada petició ha de ser autocontinguda. La implementació estàndard és JWT.

| STATEFUL (sessions): Client → Servidor guarda sessió a memòria  → Problema: l'usuari ha d'anar sempre al MATEIX servidor  → Impossible escalar horitzontalmentSTATELESS (JWT): Client guarda el token, el envia a CADA petició  → Qualsevol servidor pot validar el JWT (és autoverificable)  → Escalat horitzontal trivial → afegir servidors sense impacte |
| :---- |

| // Interceptor d'Axios al frontend: injectar JWT automàticamentapiClient.interceptors.request.use((config) \=\> {  const token \= localStorage.getItem('access-token');  if (token) config.headers.Authorization \= \`Bearer ${token}\`;  return config;});// JwtStrategy a NestJS: validació statelessasync validate(payload: any) {  return { userId: payload.sub, email: payload.email, rol: payload.rol };  // ← informació ve del TOKEN, NO d'una consulta a la BD}// Guard per protegir endpoints@UseGuards(JwtAuthGuard)@Get('perfil')obtenirPerfil(@Request() req) { return req.user; } |
| :---- |

**7\. Gestió d'errors i excepcions**

NestJS té una capa integrada d'excepcions. Les excepcions HTTP integrades: `BadRequestException` (400), `UnauthorizedException` (401), `ForbiddenException` (403), `NotFoundException` (404), `ConflictException` (409), `InternalServerErrorException` (500).

| // Exception Filter Global: respostes d'error consistents@Catch()export class GlobalExceptionFilter implements ExceptionFilter {  private readonly logger \= new Logger(GlobalExceptionFilter.name);  catch(exception: unknown, host: ArgumentsHost) {    const ctx \= host.switchToHttp();    const response \= ctx.getResponse\<Response\>();    const request \= ctx.getRequest\<Request\>();    const status \= exception instanceof HttpException      ? exception.getStatus() : HttpStatus.INTERNAL\_SERVER\_ERROR;    const message \= exception instanceof HttpException      ? exception.getResponse() : 'Error intern del servidor';    // Log diferent per 5xx (errors nostres) vs 4xx (errors del client)    status \>= 500      ? this.logger.error(\`${request.method} ${request.url} → ${status}\`, ...)      : this.logger.warn(\`${request.method} ${request.url} → ${status}\`);    response.status(status).json({      statusCode: status,      timestamp: new Date().toISOString(),      path: request.url,      method: request.method,      message,    });  }}// main.ts:app.useGlobalFilters(new GlobalExceptionFilter()); |
| :---- |

Regles d'or: mai exposar stack traces en producció, crear excepcions de domini pròpies (`UsuariNoTrobatException extends NotFoundException`), gestionar errors específics de MongoDB (CastError → 400, codi 11000 → 409).

**8\. Swagger / OpenAPI: Autodocumentació**

Swagger genera automàticament documentació interactiva de l'API a partir dels decoradors del codi, sempre sincronitzada amb la implementació.

| // main.ts \-- configuracióconst config \= new DocumentBuilder()  .setTitle('API Botiga').setDescription('...').setVersion('1.0')  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT-auth')  .addTag('Usuaris').addTag('Productes').build();const document \= SwaggerModule.createDocument(app, config);SwaggerModule.setup('api/v1/docs', app, document, {  swaggerOptions: { persistAuthorization: true }});// → Disponible a: http://localhost:3000/api/v1/docs// Decoradors als DTOsexport class CrearUsuariDto {  @ApiProperty({ description: 'Nom complet', example: 'Anna García' })  @IsString() nom: string;}// Decoradors als Controllers@ApiTags('Usuaris')@ApiBearerAuth('JWT-auth')@Controller('usuaris')export class UsuarisController {  @ApiOperation({ summary: 'Crear nou usuari' })  @ApiCreatedResponse({ type: Usuari })  @ApiBadRequestResponse({ description: 'Dades invàlides' })  @Post() crear(@Body() dto: CrearUsuariDto) { ... }} |
| :---- |

**9\. El flux complet d'una petició**

| POST /api/v1/usuaris \+ JWT \+ Body: { nom, email, password }         ↓\[main.ts\] → GlobalPrefix, ValidationPipe, CORS, Swagger         ↓\[AppModule\] → connecta UsuarisModule         ↓\[JwtAuthGuard\] → verifica JWT → 401 si invàlid         ↓\[ValidationPipe\] → valida CrearUsuariDto → 400 si invàlid  (whitelist elimina camps extres, transform converteix tipus)         ↓\[UsuarisController.crear(@Body() dto)\]         ↓\[UsuarisService.crear(dto)\]  → comprova email duplicat → 409 si existeix  → new this.usuariModel(dto).save() → guarda a MongoDB         ↓\[GlobalExceptionFilter\] → si error → resposta consistent         ↓201 Created \+ { \_id, nom, email, rol, createdAt } |
| :---- |

**El mapa del tema**

REST:  
  → 6 principis (Stateless, Interfície Uniforme, Client-Servidor...)  
  → Verbs HTTP \+ CRUD: GET/POST/PUT/PATCH/DELETE  
  → REST vs GraphQL vs gRPC vs SOAP

NestJS Architecture:  
  → Module (organitza) → Controller (rutes) → Service (negoci)  
  → Dependency Injection via constructor  
  → CLI: nest g resource productes

Validació:  
  → DTO \+ class-validator (@IsString, @IsEmail, @MinLength...)  
  → ValidationPipe global (whitelist, forbidNonWhitelisted, transform)  
  → PartialType / PickType / OmitType per derivar DTOs

MongoDB \+ Mongoose:  
  → @Schema, @Prop, SchemaFactory  
  → CRUD: findById, find, findByIdAndUpdate, findByIdAndDelete  
  → populate (JOIN), lean (plain objects), aggregation pipeline

Stateless \+ JWT:  
  → Cada petició autocontinguda → escalat horitzontal trivial  
  → JWT: header.payload.signature → autoverificable  
  → JwtAuthGuard protegeix endpoints

Gestió d'Errors:  
  → Excepcions integrades (NotFoundException, ConflictException...)  
  → GlobalExceptionFilter → respostes consistents  
  → Log: error per 5xx, warn per 4xx

Swagger:  
  → npm install @nestjs/swagger swagger-ui-express  
  → DocumentBuilder \+ SwaggerModule.setup()  
  → @ApiTags, @ApiOperation, @ApiProperty, @ApiBearerAuth  
  → Disponible a /api/v1/docs

