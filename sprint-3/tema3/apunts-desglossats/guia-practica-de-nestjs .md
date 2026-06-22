**Guia pràctica de NestJS** 

**NestJS Documentation**  
[https://docs.nestjs.com/](https://docs.nestjs.com/)  
Documentació oficial de NestJS, framework progressiu per a aplicacions Node.js.

**MongoDB (Mongoose) \- NestJS Docs**  
[https://docs.nestjs.com/recipes/mongodb](https://docs.nestjs.com/recipes/mongodb)  
Guia de NestJS per integrar MongoDB amb Mongoose en aplicacions.

**Validation \- NestJS Docs**  
[https://docs.nestjs.com/techniques/validation](https://docs.nestjs.com/techniques/validation)  
Documentació oficial per implementar validació de dades amb pipes i decoradors.

**OpenAPI (Swagger) \- NestJS Docs**  
Guia per documentar APIs NestJS amb Swagger i l’especificació OpenAPI.  
[https://docs.nestjs.com/openapi/introduction](https://docs.nestjs.com/openapi/introduction)

**Class Validator Documentation**  
Llibreria per validar objectes en TypeScript i JS amb decoradors senzills i flexibles.  
[https://github.com/typestack/class-validator](https://github.com/typestack/class-validator)

**Introducció a NestJS**  
Seminari introductori en castellà per aprendre els conceptes bàsics de NestJS.  
[https://ualmtorres.github.io/SeminarioNestJS/](https://ualmtorres.github.io/SeminarioNestJS/)

**Què cobreix el seminari**

NestJS és un framework per al desenvolupament d'aplicacions Node.js al costat del servidor. 

Es programa en TypeScript i proporciona una arquitectura a l'aplicació que permet el desenvolupament d'aplicacions més fàcils de mantenir. 

La seva arquitectura està bastant inspirada en Angular, cosa que facilita el treball a l'equip de desenvolupament en no haver d'usar dues formes de treball diferentes en el backend i el frontend.

**Creació i arrancada d'un projecte NestJS**

Creació del projecte:

| nest new tutorial-nest-jscd tutorial-nest-jsnpm run start:dev |
| :---- |

Això crea un projecte i l'executa al port 3000 en mode live reload.

| \# Estructura generada pel CLI:src/├── main.ts              ← punt d'entrada, arranca l'aplicació├── app.module.ts        ← mòdul arrel├── app.controller.ts    ← controlador de l'arrel└── app.service.ts       ← servei de l'arrel\# Comandes útils del CLI:nest generate module productes     \# → productes/productes.module.tsnest generate controller productes \# → productes/productes.controller.tsnest generate service productes    \# → productes/productes.service.tsnest generate resource productes   \# → tot d'una vegada (CRUD complet) |
| :---- |

**Controladors i serveis: el cor de NestJS**

Els serveis s'encarreguen d'abstraure la complexitat i la lògica del negoci en una classe a part. 

El CLI de NestJS afegeix el decorador `@Injectable` als serveis durant la seva creació. Aquests serveis es podran injectar en controladors o en altres serveis. 

El controlador s'encarrega, per una banda, d'escoltar les peticions que arriben a l'aplicació. 

Per altra banda, s'encarrega de preparar les respostes que proporciona l'aplicació.

| // app.service.ts \-- la lògica de negociimport { Injectable } from '@nestjs/common';@Injectable()  // ← permet que el servei pugui ser injectatexport class AppService {  getHello(): string {    return 'Hola Món\!';  }}// app.controller.ts \-- gestió de peticions HTTPimport { Controller, Get } from '@nestjs/common';import { AppService } from './app.service';@Controller()  // ← declara que és un controladorexport class AppController {  constructor(private readonly appService: AppService) {}  // ← DI  @Get()  getHello(): string {    return this.appService.getHello();  // ← delega al servei  }} |
| :---- |

**Implementació CRUD completa: exemple de llibres**

El seminari desenvolupa una API sobre bases de dades que implementa endpoints per a les operacions bàsiques: `find`, `findOne`, `create`, `update`, `delete`. 

Es comença creant un esquelet amb controladors i serveis funcionant en mode mock. Una vegada provada la connexió correcta entre ells, es substituiran els serveis per interactuar amb la base de dades.

| // llibres.controller.ts \-- tots els endpoints CRUD@Controller('llibres')export class LlibresController {  constructor(private readonly llibresService: LlibresService) {}  // GET /llibres  @Get()  trobarTots(@Query('ordre') ordre?: string) {    return this.llibresService.trobarTots(ordre);  }  // GET /llibres/:id  @Get(':id')  trobarPerId(@Param('id') id: string) {    return this.llibresService.trobarPerId(id);  }  // POST /llibres  @Post()  @HttpCode(HttpStatus.CREATED)  crear(@Body() crearLlibreDto: CrearLlibreDto) {    return this.llibresService.crear(crearLlibreDto);  }  // PATCH /llibres/:id  @Patch(':id')  actualitzar(@Param('id') id: string, @Body() dto: ActualitzarLlibreDto) {    return this.llibresService.actualitzar(id, dto);  }  // DELETE /llibres/:id  @Delete(':id')  @HttpCode(HttpStatus.NO\_CONTENT)  eliminar(@Param('id') id: string) {    return this.llibresService.eliminar(id);  }} |
| :---- |

**Tipat d'objectes: Interface, DTO i entity**

Un dels objectius del seminari és conèixer les diferències i utilitats de les entities dels ORM, les interfícies i els DTO (Data Transfer Objects).

| // 1\. INTERFÍCIE: defineix l'estructura del domini (sense validació)export interface Llibre {  id: string;  titol: string;  autor: string;  any: number;  pagines?: number;}// 2\. DTO: defineix i valida les dades entrants (amb class-validator)export class CrearLlibreDto {  @IsString() @IsNotEmpty() @ApiProperty({ example: 'El nom de la rosa' })  titol: string;  @IsString() @IsNotEmpty() @ApiProperty({ example: 'Umberto Eco' })  autor: string;  @IsInt() @Min(1000) @Max(2025) @ApiProperty({ example: 1980 })  any: number;  @IsOptional() @IsInt() @Min(1)  pagines?: number;}// 3\. DTO per a actualitzacions parcials (tots els camps opcionals)export class ActualitzarLlibreDto extends PartialType(CrearLlibreDto) {} |
| :---- |

**Autenticació JWT: control d'accés als endpoints**

La API implementa control d'accés als endpoints mitjançant JSON Web Tokens.

| // Configuració de JWT al mòdul d'autenticació@Module({  imports: \[    JwtModule.register({      secret: process.env.JWT\_SECRET,      signOptions: { expiresIn: '1h' },    }),  \],  controllers: \[AuthController\],  providers: \[AuthService, JwtStrategy\],  exports: \[JwtModule\],})export class AuthModule {}// Protegir endpoints amb el Guard@Controller('productes')@UseGuards(JwtAuthGuard)  // ← tots els endpoints del controller requereixen JWTexport class ProductesController {  // ...  // Endpoint públic (sense guard):  @Get('publics')  @SkipAuth()  // ← decorador personalitzat per a rutes públiques  obtenirProductesPublics() { ... }} |
| :---- |

**Connexió a la base de dades**

El seminari cobreix la connexió a bases de dades relacionals (MySQL i PostgreSQL) via ORM i el patró de repositori.

Per a MongoDB amb Mongoose (el nostre cas):

| // app.module.ts@Module({  imports: \[    MongooseModule.forRoot(process.env.MONGODB\_URI),    LlibresModule,  \],})export class AppModule {}// llibres.module.ts@Module({  imports: \[    MongooseModule.forFeature(\[      { name: Llibre.name, schema: LlibreSchema }    \]),  \],  controllers: \[LlibresController\],  providers: \[LlibresService\],})export class LlibresModule {} |
| :---- |

**Logging amb Winston**

El seminari mostra com registrar les operacions de l'aplicació en arxius de log usant Winston.

| npm install nest-winston winston winston-daily-rotate-file |
| :---- |

| // Logging estructurat per nivellsimport { Logger } from '@nestjs/common';@Injectable()export class LlibresService {  private readonly logger \= new Logger(LlibresService.name);  async trobarPerId(id: string) {    this.logger.log(\`Cercant llibre amb ID: ${id}\`);    try {      const llibre \= await this.llibreModel.findById(id);      if (\!llibre) {        this.logger.warn(\`Llibre ${id} no trobat\`);        throw new NotFoundException(\`Llibre ${id} no trobat\`);      }      return llibre;    } catch (error) {      this.logger.error(\`Error en trobarPerId: ${error.message}\`, error.stack);      throw error;    }  }} |
| :---- |

**Health Checks: estat de salut de l'API**

El seminari mostra com usar Terminus per exposar l'estat de salut de l'aplicació i els seus components.

| npm install @nestjs/terminus |
| :---- |

| // src/health/health.controller.ts@Controller('health')export class HealthController {  constructor(    private health: HealthCheckService,    private mongooseHealth: MongooseHealthIndicator,  ) {}  @Get()  @HealthCheck()  check() {    return this.health.check(\[      () \=\> this.mongooseHealth.pingCheck('mongodb'),    \]);  }}// GET /health → respon:// { "status": "ok", "info": { "mongodb": { "status": "up" } } }// o// { "status": "error", "error": { "mongodb": { "status": "down" } } } |
| :---- |

**Prefixos i versionament de l'API**

| // main.ts \-- configuració recomanada per a produccióasync function bootstrap() {  const app \= await NestFactory.create(AppModule);  // Prefix global: tots els endpoints comencen per /api  app.setGlobalPrefix('api');  // Opció 1: prefix amb versió  app.setGlobalPrefix('api/v1');  // Opció 2: versionament natiu de NestJS  app.enableVersioning({    type: VersioningType.URI,  // → /api/v1/...  });  await app.listen(process.env.PORT || 3000);} |
| :---- |

**Flux complet d'una aplicació NestJS (resum)**

| PETICIÓ HTTP         ↓\[main.ts\] → configura GlobalPrefix, GlobalPipes, CORS, Swagger         ↓\[AppModule\] → registra tots els feature modules         ↓\[Feature Module\] → conecta controller, service i schema         ↓\[Guard\] → verifica JWT (si l'endpoint és protegit)         ↓\[ValidationPipe\] → valida el DTO (400 si invàlid)         ↓\[Controller\] → extreu paràmetres (@Param, @Body, @Query)         ↓\[Service\] → lògica de negoci \+ Mongoose Model         ↓\[MongoDB\] → emmagatzema/recupera dades         ↓\[Exception Filter\] → formata errors de manera consistent         ↓RESPOSTA HTTP (JSON) |
| :---- |

