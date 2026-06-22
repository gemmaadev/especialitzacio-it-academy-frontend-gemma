## **Glossari de termes — REST API amb NestJS i MongoDB**

**`@ApiProperty()`** — Decorador de `@nestjs/swagger` que exposa una propietat d'un DTO o entitat a la documentació de Swagger. Sense ell, la propietat és invisible a la UI de Swagger. Accepta opcions com `description`, `example`, `required`, `enum`, i `writeOnly` (útil per a passwords).

**`@ApiBearerAuth()`** — Decorador de Swagger que indica que un endpoint o controller requereix autenticació JWT. S'ha de configurar prèviament al `DocumentBuilder` amb `.addBearerAuth()` i passar el mateix nom de referència.

**`@ApiOperation()`** — Decorador de Swagger per a un mètode del controller. Proporciona `summary` (títol curt) i `description` (descripció llarga) que apareixen a la UI de Swagger.

**`@ApiTags()`** — Decorador de Swagger que agrupa tots els endpoints d'un controller sota una etiqueta. Permet organitzar la documentació per dominis (Usuaris, Productes, Comandes...).

**`@Body()`** — Decorador de NestJS que extreu el cos de la petició HTTP. S'usa als mètodes del controller per rebre el DTO: `crear(@Body() dto: CrearUsuariDto)`.

**`@Catch()`** — Decorador que s'aplica a un Exception Filter per indicar quins tipus d'excepcions ha de capturar. `@Catch()` sense arguments captura totes les excepcions.

**`@Controller()`** — Decorador que declara una classe com a controlador NestJS i defineix el prefix de ruta base. `@Controller('usuaris')` fa que tots els endpoints del controller comencin per `/usuaris`.

**`@Delete()`** — Decorador de mètode de NestJS que mapeja una funció a les peticions HTTP DELETE. Retorna habitualment `204 No Content`.

**DocumentBuilder** — Classe de `@nestjs/swagger` per construir la configuració del document OpenAPI. Proporciona mètodes encadenables: `.setTitle()`, `.setDescription()`, `.setVersion()`, `.addBearerAuth()`, `.addTag()`, `.addServer()`.

**DTO (Data Transfer Object)** — Classe TypeScript que defineix l'estructura i les regles de validació de les dades entrants a l'API. Diferent de l'entitat (que representa la BD): el DTO és el contracte d'entrada, l'entitat és el model de la BD. Decorats amb `class-validator` i `@ApiProperty`.

**Escalabilitat Horitzontal** — Capacitat d'afegir més instàncies del servidor (en lloc d'actualitzar la màquina existent) per gestionar més càrrega. Possible únicament amb APIs stateless: com qualsevol servidor pot processar qualsevol petició, un load balancer distribueix la càrrega lliurement.

**Exception Filter** — Component NestJS que captura les excepcions llançades durant el cicle petició-resposta i les transforma en respostes HTTP consistents. Implementa la interfície `ExceptionFilter`. Es registra globalment a `main.ts` amb `app.useGlobalFilters()`.

**`@Get()`** — Decorador de mètode de NestJS que mapeja una funció a les peticions HTTP GET. `@Get(':id')` captura un paràmetre de ruta.

**Guard** — Component NestJS que determina si una petició pot procedir o no. S'usa per a autenticació i autorització. Implementa la interfície `CanActivate`. El `JwtAuthGuard` verifica el token JWT de cada petició.

**`HttpException`** — Classe base de NestJS per a totes les excepcions HTTP. Accepta un missatge i un codi d'estat. Totes les excepcions integrades (`NotFoundException`, `BadRequestException`...) en hereten. Permet crear excepcions de domini pròpies.

**`HttpStatus`** — Enum de NestJS amb tots els codis d'estat HTTP: `HttpStatus.OK` (200), `HttpStatus.CREATED` (201), `HttpStatus.NO_CONTENT` (204), `HttpStatus.NOT_FOUND` (404), etc. Importat de `@nestjs/common`.

**`@Injectable()`** — Decorador que marca una classe com a provider injectable al sistema de DI de NestJS. Sense ell, la classe no pot ser injectada en altres components. S'aplica a tots els serveis, repositoris i guards.

**`@InjectModel()`** — Decorador de `@nestjs/mongoose` per injectar un Model de Mongoose a un servei. `@InjectModel(Usuari.name) private usuariModel: Model<UsuariDocument>` proporciona accés al model MongoDB tipat.

**Interceptor** — Component NestJS que s'executa abans i/o després del handler. S'usa per a transformació de respostes, logging, caching, o gestió de timeout. Implementa la interfície `NestInterceptor`.

**Idempotent** — Propietat d'una operació HTTP que produeix el mateix resultat independentment de quantes vegades s'executi. GET, PUT i DELETE son idempotents. POST i PATCH no ho son per definició.

**JWT (JSON Web Token)** — Estàndard per a tokens d'autenticació autocontinguts. Format: `header.payload.signature`. El payload conté la identitat de l'usuari (`sub`, `email`, `rol`, `exp`). El servidor pot verificar-lo sense consultar la BD (stateless). Enviat via `Authorization: Bearer <token>`.

**JwtAuthGuard** — Guard personalitzat de NestJS que verifica el JWT de cada petició. Extreu el token del header `Authorization`, el valida contra la clau secreta, i popula `req.user` amb el payload decodificat.

**JwtStrategy** — Classe que defineix com NestJS valida un JWT. Hereta de `PassportStrategy(Strategy)`. El mètode `validate()` rep el payload decodificat i retorna l'objecte que NestJS injecta a `req.user`.

**`lean()`** — Mètode de Mongoose que fa que les consultes retornin plain JavaScript objects en lloc de documents Mongoose complets. Molt més eficient en memòria i rendiment per a lectures.

**Load Balancer** — Component d'infraestructura que distribueix les peticions HTTP entre múltiples instàncies del servidor. Possible sense configuració especial gràcies al disseny stateless de REST+JWT.

**Middleware** — Funció que s'executa entre la petició i el handler del controller. En NestJS s'usa per a logging, CORS, compressió i autenticació bàsica. Equivalent al middleware d'Express.

**Model (Mongoose)** — La classe TypeScript que representa i permet interactuar amb una col·lecció de MongoDB. Proporciona mètodes com `find()`, `findById()`, `findByIdAndUpdate()`, `findByIdAndDelete()`, i `save()`.

**`@Module()`** — Decorador que defineix un mòdul NestJS. Accepta: `imports` (altres mòduls necessaris), `controllers` (gestors de peticions), `providers` (serveis injectables), i `exports` (providers que aquest mòdul exposa a altres).

**MongooseModule** — Mòdul de `@nestjs/mongoose` que gestiona la connexió a MongoDB i el registre de models. `MongooseModule.forRoot()` estableix la connexió global. `MongooseModule.forFeature()` registra un model en un mòdul específic.

**NestJS** — Framework TypeScript per a aplicacions Node.js al costat del servidor, inspirat en Angular. Construït sobre Express (per defecte) o Fastify. Proporciona arquitectura modular, DI integrada, decoradors, i suport integrat per a REST, GraphQL, WebSockets i microserveis.

**`NotFoundException`** — Excepció integrada de NestJS que genera una resposta HTTP 404\. La més usada als serveis quan un recurs no existeix a la BD: `throw new NotFoundException('Usuari no trobat')`.

**ObjectId** — Tipus d'identificador únic de MongoDB. Format de 12 bytes que inclou timestamp, identificador de procés i comptador. Equivalent a un UUID però optimitzat per a MongoDB. S'usa com `Types.ObjectId` en TypeScript/Mongoose.

**ODM (Object Data Modeling)** — L'equivalent a un ORM però per a bases de dades de documents (com MongoDB). Mongoose és l'ODM més popular per a MongoDB en Node.js. Proporciona esquemes, validació, hooks i un API tipat.

**OpenAPI** — L'especificació estàndard per descriure APIs RESTful en format JSON/YAML. NestJS genera l'especificació OpenAPI automàticament a partir dels decoradors. Disponible a `/api/docs-json` per a integració amb eines externes.

**OmitType** — Funció de `@nestjs/swagger` per crear un DTO nou que és còpia d'un altre però sense certs camps. `OmitType(CrearUsuariDto, ['password'])` → còpia sense el camp `password`. Preserva els decoradors `@ApiProperty` i `class-validator`.

**`@Param()`** — Decorador de NestJS que extreu un paràmetre de la ruta URL. `@Param('id') id: string` extreu l'`:id` de la ruta `@Get(':id')`.

**PartialType** — Funció de `@nestjs/swagger` (o `@nestjs/mapped-types`) per crear un DTO nou on tots els camps son opcionals. Imprescindible per als DTOs de PATCH. `ActualitzarUsuariDto extends PartialType(CrearUsuariDto)`.

**`@Patch()`** — Decorador de mètode de NestJS per a actualitzacions parcials (PATCH). A diferència de PUT, únicament actualitza els camps enviats.

**PickType** — Funció per crear un DTO nou amb únicament un subconjunt de camps d'un altre DTO. `PickType(CrearUsuariDto, ['email', 'password'])` → DTO amb únicament email i password.

**Pipe** — Component NestJS que transforma o valida les dades d'entrada. `ValidationPipe` és el pipe integrat més important: valida els DTOs i llança `BadRequestException` si falla. S'aplica globalment a `main.ts`.

**`populate()`** — Mètode de Mongoose que resol les referències a altres documents (equivalent a un JOIN en SQL). `findById(id).populate('categoriaId', 'nom')` substitueix l'`ObjectId` pel document complet de la categoria.

**`@Post()`** — Decorador de mètode de NestJS per a creació de recursos (POST). Retorna habitualment `201 Created`.

**Provider** — Terme genèric de NestJS per a qualsevol classe que pot ser injectada via DI. Inclou serveis, repositoris, factories, guards, etc. Tots es marquen amb `@Injectable()`.

**`@Prop()`** — Decorador de `@nestjs/mongoose` que defineix una propietat en un Schema de Mongoose. Accepta opcions com `required`, `unique`, `default`, `min`, `max`, `ref`, i `type`.

**`@Query()`** — Decorador de NestJS que extreu els query parameters de la URL. `@Query('pagina') pagina: number` extreu el valor de `?pagina=2`.

**Quality Gate** — Conjunt de condicions que el codi ha de satisfer. En el context de NestJS, relacionat amb la validació de les peticions i la consistència de les respostes d'error.

**REST (Representational State Transfer)** — Estil arquitectural definit per Roy Fielding el 2000\. No és un protocol sinó un conjunt de restriccions (stateless, interfície uniforme, client-servidor, cacheable, sistema per capes, code on demand) que, si es compleixen, produeixen un sistema escalable i mantenible.

**RESTful** — Una API que segueix els principis de REST. El terme més correcte per a les APIs que implementen REST.

**`@Schema()`** — Decorador de `@nestjs/mongoose` que marca una classe com a Schema de Mongoose. Accepta opcions com `timestamps: true` (afegeix `createdAt` i `updatedAt` automàticament) i `collection` (nom de la col·lecció a MongoDB).

**SchemaFactory** — Classe de `@nestjs/mongoose` per crear el Schema de Mongoose a partir de la classe decorada. `SchemaFactory.createForClass(Usuari)` genera el `Schema` de Mongoose a partir de la classe `Usuari`.

**Stateless** — Principi REST que obliga que cada petició HTTP contingui tota la informació necessària per ser processada. El servidor no guarda sessió entre peticions. Implementat mitjançant JWT: el token porta la identitat de l'usuari en cada petició.

**Swagger** — Conjunt d'eines per treballar amb l'especificació OpenAPI: Swagger UI (interfície interactiva), Swagger Editor, i Swagger Codegen. A NestJS, `@nestjs/swagger` genera la documentació automàticament a partir dels decoradors.

**SwaggerModule** — Classe de `@nestjs/swagger` que gestiona la generació del document OpenAPI i la configuració de la UI de Swagger. `SwaggerModule.createDocument()` genera el document, `SwaggerModule.setup()` l'exposa en una ruta.

**`timestamps: true`** — Opció del decorador `@Schema()` que fa que Mongoose afegeixi automàticament els camps `createdAt` i `updatedAt` a cada document, gestionats automàticament per Mongoose sense cap codi addicional.

**`transform: true`** — Opció del `ValidationPipe` que fa que NestJS transformi automàticament els valors del cos/query al tipus declarat al DTO. `"42"` (string de la URL) → `42` (number) si el DTO declara `@IsInt()`.

**`UnauthorizedException`** — Excepció de NestJS que genera una resposta HTTP 401\. S'usa quan el JWT és absent, invàlid o expirat. Diferent de `ForbiddenException` (403): 401 és "no sé qui ets", 403 és "sé qui ets però no pots".

**ValidationPipe** — El pipe de validació integrat de NestJS. Usa `class-validator` per validar els DTOs. Configurat globalment amb `app.useGlobalPipes()`. Les opcions clau: `whitelist` (elimina camps extres), `forbidNonWhitelisted` (error si hi ha camps extres), `transform` (converteix tipus automàticament).

**`whitelist: true`** — Opció del `ValidationPipe` que fa que NestJS elimini silenciosament les propietats del cos de la petició que no estan declarades al DTO. Defensa contra "mass assignment attacks": l'atacant no pot injectar camps com `rol: "admin"` si no estan al DTO.  
