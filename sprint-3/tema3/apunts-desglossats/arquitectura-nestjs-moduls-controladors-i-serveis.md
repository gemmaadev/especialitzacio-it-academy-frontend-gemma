**Com s'estructura un projecte NestJS? Explica el paper dels mòduls, controladors i serveis en l'arquitectura de NestJS i com es relacionen amb el patró MVC.**

**Què és NestJS i per què existeix**

Al seu nucli, NestJS: embolcalla una biblioteca de servidor HTTP madura (Express o Fastify), estandarditza l'arquitectura de l'aplicació al voltant de mòduls, controladors i providers, aprofita el sistema de tipus de TypeScript per a seguretat en temps de compilació i APIs clares, i ofereix suport integrat per a coses com validació, configuració i testing. 

En lloc d'assemblera middleware manualment, NestJS fomenta un enfocament declaratiu i per capes.

**L'estructura d'un projecte NestJS: visió general**

| projecte-nestjs/├── src/│   ├── main.ts                    ← punt d'entrada: arranca l'aplicació│   ├── app.module.ts              ← mòdul arrel (root module)│   ││   ├── usuaris/                   ← feature module (domini d'usuaris)│   │   ├── usuaris.module.ts      ← declara i connecta les peces│   │   ├── usuaris.controller.ts  ← gestiona les peticions HTTP│   │   ├── usuaris.service.ts     ← conté la lògica de negoci│   │   ├── schemas/│   │   │   └── usuari.schema.ts   ← Schema de Mongoose (MongoDB)│   │   └── dto/│   │       ├── crear-usuari.dto.ts│   │       └── actualitzar-usuari.dto.ts│   ││   └── productes/                 ← un altre feature module│       ├── productes.module.ts│       ├── productes.controller.ts│       └── productes.service.ts│├── test/                          ← tests e2e├── nest-cli.json├── tsconfig.json└── package.json |
| :---- |

| \# CLI de NestJS: generar l'estructura automàticamentnpm install \-g @nestjs/clinest new el-meu-projecte\# Generar un feature module completnest generate module usuaris    \# → usuaris/usuaris.module.tsnest generate controller usuaris \# → usuaris/usuaris.controller.tsnest generate service usuaris   \# → usuaris/usuaris.service.ts\# Shorthand: tot d'una vegadanest g resource usuaris  \# → mòdul \+ controlador \+ servei \+ DTOs \+ tests |
| :---- |

**El `main.ts`: el punt d'entrada**

| // src/main.tsimport { NestFactory } from '@nestjs/core';import { AppModule } from './app.module';import { ValidationPipe } from '@nestjs/common';async function bootstrap() {  const app \= await NestFactory.create(AppModule);  // Prefix global per a totes les rutes: /api/v1/...  app.setGlobalPrefix('api/v1');  // Pipe global de validació (s'aplica a tots els endpoints)  app.useGlobalPipes(new ValidationPipe({    whitelist: true,      // elimina propietats no declarades al DTO    forbidNonWhitelisted: true, // llança error si hi ha propietats extres    transform: true,      // transforma strings a number, boolean, etc.  }));  // CORS per a l'accés des del frontend  app.enableCors();  await app.listen(3000);  console.log(\`API corrent a: http://localhost:3000/api/v1\`);}bootstrap(); |
| :---- |

**Els mòduls: la unitat organitzativa**

El decorador `@Module` de NestJS s'usa per definir els metadades d'un mòdul. Els inputs del decorador `@Module` inclouen: Providers (l'esquelet del sistema de DI de NestJS), Controllers (gestors de peticions HTTP), Imports (altres mòduls necessaris), i Exports (providers que aquest mòdul exposa a altres mòduls).

| // src/usuaris/usuaris.module.tsimport { Module } from '@nestjs/common';import { MongooseModule } from '@nestjs/mongoose';import { UsuarisController } from './usuaris.controller';import { UsuarisService } from './usuaris.service';import { Usuari, UsuariSchema } from './schemas/usuari.schema';@Module({  imports: \[    // Importem el model de Mongoose per poder-lo injectar al service    MongooseModule.forFeature(\[{ name: Usuari.name, schema: UsuariSchema }\]),  \],  controllers: \[UsuarisController\],  // gestionen les peticions HTTP  providers: \[UsuarisService\],       // lògica de negoci, injectables  exports: \[UsuarisService\],         // exportem per si altres mòduls el necessiten})export class UsuarisModule {} |
| :---- |

| // src/app.module.ts \-- el mòdul arrel que connecta totimport { Module } from '@nestjs/common';import { MongooseModule } from '@nestjs/mongoose';import { ConfigModule } from '@nestjs/config';import { UsuarisModule } from './usuaris/usuaris.module';import { ProductesModule } from './productes/productes.module';@Module({  imports: \[    ConfigModule.forRoot({ isGlobal: true }),  // variables d'entorn globals    MongooseModule.forRoot(process.env.MONGODB\_URI),  // connexió a MongoDB    UsuarisModule,    ProductesModule,  \],})export class AppModule {} |
| :---- |

**Els controladors: gestió de peticions HTTP**

El decorador `@Controller()` de NestJS s'usa per definir i organitzar les rutes i la lògica de gestió de peticions en l'aplicació. 

Els controladors ajuden a separar la gestió de peticions HTTP de la lògica de negoci de l'aplicació, cosa que fa el codebase més modular i mantenible.

| // src/usuaris/usuaris.controller.tsimport {  Controller, Get, Post, Put, Patch, Delete,  Param, Body, Query, HttpCode, HttpStatus,  ParseMongoIdPipe} from '@nestjs/common';import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';import { UsuarisService } from './usuaris.service';import { CrearUsuariDto } from './dto/crear-usuari.dto';import { ActualitzarUsuariDto } from './dto/actualitzar-usuari.dto';@ApiTags('Usuaris')                       // grup de Swagger@Controller('usuaris')                    // ruta base: /api/v1/usuarisexport class UsuarisController {  // La dependència s'injecta via constructor (Dependency Injection)  constructor(private readonly usuarisService: UsuarisService) {}  @Get()  @ApiOperation({ summary: 'Obtenir tots els usuaris' })  @ApiResponse({ status: 200, description: 'Llista d\\'usuaris' })  trobarTots(@Query('actiu') actiu?: boolean) {    return this.usuarisService.trobarTots(actiu);  }  @Get(':id')  trobarPerId(@Param('id') id: string) {    return this.usuarisService.trobarPerId(id);    // → 200 OK o 404 Not Found (gestionat al service)  }  @Post()  @HttpCode(HttpStatus.CREATED)  // 201  crear(@Body() crearUsuariDto: CrearUsuariDto) {    return this.usuarisService.crear(crearUsuariDto);  }  @Patch(':id')  actualitzar(    @Param('id') id: string,    @Body() actualitzarUsuariDto: ActualitzarUsuariDto  ) {    return this.usuarisService.actualitzar(id, actualitzarUsuariDto);  }  @Delete(':id')  @HttpCode(HttpStatus.NO\_CONTENT)  // 204  eliminar(@Param('id') id: string) {    return this.usuarisService.eliminar(id);  }} |
| :---- |

**Els serveis / providers: la lògica de negoci**

`@Injectable()` és un decorador que adjunta metadades a la classe, senyalant que `CatsService` és una classe que pot ser gestionada pel contenidor IoC de Nest. 

Nest ve amb un contenidor d'inversió de control ("IoC") integrat que gestiona les relacions entre providers.

A NestJS, els serveis cobreixen principalment la lògica de negoci i les tasques de gestió de dades. Son part d'un codebase injectable i es poden usar en àrees més enllà d'on van ser inicialment implementats. 

Les classes i serveis han de mantenir-se sòlids i adherir-se al principi de responsabilitat única, ja que això millora la mantenibilitat i testabilitat del codi.

| // src/usuaris/usuaris.service.tsimport { Injectable, NotFoundException } from '@nestjs/common';import { InjectModel } from '@nestjs/mongoose';import { Model } from 'mongoose';import { Usuari, UsuariDocument } from './schemas/usuari.schema';import { CrearUsuariDto } from './dto/crear-usuari.dto';import { ActualitzarUsuariDto } from './dto/actualitzar-usuari.dto';@Injectable()  // ← marca la classe com a injectable (provider)export class UsuarisService {  constructor(    // Injectem el Model de Mongoose per interactuar amb MongoDB    @InjectModel(Usuari.name) private readonly usuariModel: Model\<UsuariDocument\>  ) {}  async trobarTots(actiu?: boolean): Promise\<Usuari\[\]\> {    const filtre \= actiu \!== undefined ? { actiu } : {};    return this.usuariModel.find(filtre).exec();  }  async trobarPerId(id: string): Promise\<Usuari\> {    const usuari \= await this.usuariModel.findById(id).exec();    if (\!usuari) {      throw new NotFoundException(\`Usuari amb ID ${id} no trobat\`);    }    return usuari;  }  async crear(crearUsuariDto: CrearUsuariDto): Promise\<Usuari\> {    const nouUsuari \= new this.usuariModel(crearUsuariDto);    return nouUsuari.save();  }  async actualitzar(id: string, dto: ActualitzarUsuariDto): Promise\<Usuari\> {    const actualitzat \= await this.usuariModel      .findByIdAndUpdate(id, dto, { new: true })  // new: true → retorna el doc actualitzat      .exec();    if (\!actualitzat) throw new NotFoundException(\`Usuari ${id} no trobat\`);    return actualitzat;  }  async eliminar(id: string): Promise\<void\> {    const resultat \= await this.usuariModel.findByIdAndDelete(id).exec();    if (\!resultat) throw new NotFoundException(\`Usuari ${id} no trobat\`);  }} |
| :---- |

**La relació amb el oatró MVC**

NestJS no implementa MVC de manera estricta (la V / View no existeix en una API REST pura), però la separació de responsabilitats és equivalent:

| MVC Clàssic:          NestJS API REST:        Responsabilitat─────────────────────────────────────────────────────────────Model          →      Schema \+ Model          Defineix l'estructura de dadesView           →      (JSON Response)         La resposta és la "vista" (JSON)Controller     →      Controller              Gestiona peticions HTTP, rutes                      Service                 Lògica de negoci (separat del controller)                      Module                  Unitat organitzativa (no té equiv. en MVC clàssic) |
| :---- |

**La injecció de dependències: com ho connecta tot**

Les dependències son serveis o objectes que una classe necessita per executar la seva funció. La Dependency Injection, o DI, és un patró de disseny en el qual una classe sol·licita dependències de fonts externes en lloc de crear-les.

| // NestJS gestiona la creació de les instàncies automàticament// Tu únicament declares les dependències al constructor:@Controller('usuaris')export class UsuarisController {  constructor(    private readonly usuarisService: UsuarisService,  // ← NestJS la crea i injecta    private readonly emailService: EmailService        // ← NestJS la crea i injecta  ) {    // No cal: new UsuarisService() ← NestJS ho fa per tu  }} |
| :---- |

El contenidor IoC de NestJS: detecta les dependències pel tipus TypeScript, crea les instàncies (Singleton per defecte), i les injecta automàticament.

**El flux complet d'una petició a NestJS**

| Client HTTP (Postman, Frontend)         ↓POST /api/v1/usuaris{ "nom": "Anna", "email": "anna@e.com", "password": "12345678" }         ↓\[Middleware\] → logging, CORS, compressió         ↓\[Guards\] → autenticació JWT (el pots afegir)         ↓\[Pipes\] → ValidationPipe → valida el DTO → 400 Bad Request si invalid         ↓\[Controller\] UsuarisController.crear(crearUsuariDto)         ↓\[Service\] UsuarisService.crear(crearUsuariDto)  → crea el document MongoDB  → valida regles de negoci  → retorna el nou usuari         ↓\[Interceptors\] → transformació de la resposta, logging         ↓\[Exception Filters\] → si hi ha error → 404, 400, 500...         ↓201 Created{ "\_id": "...", "nom": "Anna", "email": "anna@e.com" } |
| :---- |

