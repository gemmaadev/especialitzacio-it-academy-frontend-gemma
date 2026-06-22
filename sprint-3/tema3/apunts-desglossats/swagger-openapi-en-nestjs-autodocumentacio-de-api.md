**Com pot ajudar l'autodocumentació amb Swagger en el desenvolupament i consum d'APIs, i com s'integra amb NestJS?**

## **Què és OpenAPI i Swagger**

L'especificació OpenAPI és un format de definició agnòstic al llenguatge usat per descriure APIs RESTful. Nest proporciona un mòdul dedicat que permet generar aquesta especificació aprofitant els decoradors.

**OpenAPI** és l'estàndard (l'especificació). **Swagger** és el conjunt d'eines que treballen amb OpenAPI: Swagger UI (la interfície interactiva), Swagger Editor, i Swagger Codegen. En NestJS, `@nestjs/swagger` genera automàticament l'especificació OpenAPI a partir dels decoradors del codi.

**Per què Swagger és indispensable**

En integrar Swagger a la nostra aplicació NestJS, obtenim un conjunt de beneficis que van més enllà del simple testing. 

Swagger serveix com a eina poderosa per a millorar la col·laboració entre developers. El seu playground interactiu facilita als developers explorar i testar endpoints d'API. 

Un dels trets destacats és la generació automàtica de documentació d'API. Això significa que l'especificació de l'API sempre està sincronitzada amb el codi, reduint el risc de documentació obsoleta o inexacta.

| SENSE Swagger:                        AMB Swagger:  Frontend pregunta: "Quins camps     Frontend visita /api-docs  accepta el POST /api/usuaris?"      → veu el formulari interactiu                                       → veu els camps requerits/opcionals  Backend escriu un doc en Confluence → pot provar l'endpoint directament  → el doc queda obsolet en 2 setmanes  → pèrdua de temps i malentesos     → documentació sempre actualitzada |
| :---- |

**Instal·lació i configuració inicial**

| npm install @nestjs/swagger swagger-ui-express |
| :---- |

| // src/main.ts \-- configuració completa de Swaggerimport { NestFactory } from '@nestjs/core';import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';import { ValidationPipe } from '@nestjs/common';import { AppModule } from './app.module';async function bootstrap() {  const app \= await NestFactory.create(AppModule);  app.setGlobalPrefix('api/v1');  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));  // Configuració del document OpenAPI  const config \= new DocumentBuilder()    .setTitle('API de Botiga Online')    .setDescription('API REST per a gestió de productes, usuaris i comandes')    .setVersion('1.0')    .addTag('Usuaris', 'Gestió d\\'usuaris i autenticació')    .addTag('Productes', 'Catàleg de productes')    .addTag('Comandes', 'Gestió de comandes')    .addBearerAuth(           // ← afegeix l'input per al token JWT      {        type: 'http',        scheme: 'bearer',        bearerFormat: 'JWT',        name: 'JWT',        description: 'Introdueix el token JWT',        in: 'header',      },      'JWT-auth',             // ← nom de referència per a @ApiBearerAuth()    )    .addServer('http://localhost:3000', 'Servidor Local')    .addServer('https://api.exemple.com', 'Producció')    .build();  const document \= SwaggerModule.createDocument(app, config);  // Swagger disponible a: http://localhost:3000/api/v1/docs  SwaggerModule.setup('api/v1/docs', app, document, {    swaggerOptions: {      persistAuthorization: true,  // ← manté el token entre recàrregues      tagsSorter: 'alpha',         // ordena les tags alfabèticament      operationsSorter: 'alpha',   // ordena les operacions    },    customSiteTitle: 'Documentació API Botiga',  });  await app.listen(3000);  console.log('Swagger UI: http://localhost:3000/api/v1/docs');  console.log('OpenAPI JSON: http://localhost:3000/api/v1/docs-json');}bootstrap(); |
| :---- |

**Decoradors als DTOs: documentar l'estructura de dades**

Per fer les propietats de classe visibles al `SwaggerModule`, cal anotar-les amb el decorador `@ApiProperty()`.

| // src/usuaris/dto/crear-usuari.dto.tsimport { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';enum RolUsuari { USUARI \= 'usuari', EDITOR \= 'editor', ADMIN \= 'admin' }export class CrearUsuariDto {  @ApiProperty({    description: 'Nom complet de l\\'usuari',    example: 'Anna García Puig',    minLength: 2,    maxLength: 100,  })  @IsString()  nom: string;  @ApiProperty({    description: 'Adreça de correu electrònic',    example: 'anna@exemple.com',    format: 'email',  })  @IsEmail()  email: string;  @ApiProperty({    description: 'Contrasenya (mínim 8 caràcters)',    example: 'contrasenya123\!',    minLength: 8,    writeOnly: true,  // ← no apareix a les respostes (bona pràctica\!)  })  @IsString()  @MinLength(8)  password: string;  @ApiPropertyOptional({    description: 'Rol de l\\'usuari al sistema',    enum: RolUsuari,    default: RolUsuari.USUARI,    example: RolUsuari.USUARI,  })  @IsOptional()  @IsEnum(RolUsuari)  rol?: RolUsuari \= RolUsuari.USUARI;} |
| :---- |

**Decoradors als controladors: documentar els endpoints**

NestJS integra OpenAPI a través de `@nestjs/swagger`, que proporciona decoradors i utilitats per generar documentació OpenAPI automàticament.

| // src/usuaris/usuaris.controller.tsimport {  ApiTags, ApiOperation, ApiResponse, ApiBearerAuth,  ApiParam, ApiQuery, ApiNotFoundResponse,  ApiBadRequestResponse, ApiCreatedResponse,  ApiUnauthorizedResponse, ApiBody} from '@nestjs/swagger';@ApiTags('Usuaris')                    // agrupa els endpoints sota "Usuaris"@ApiBearerAuth('JWT-auth')            // requereix JWT per a tot el controller@Controller('usuaris')export class UsuarisController {  constructor(private readonly usuarisService: UsuarisService) {}  @Get()  @ApiOperation({    summary: 'Obtenir tots els usuaris',    description: 'Retorna una llista paginada d\\'usuaris. Requereix autenticació JWT.',  })  @ApiQuery({ name: 'pagina', required: false, type: Number, example: 1 })  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })  @ApiQuery({ name: 'actiu', required: false, type: Boolean })  @ApiResponse({    status: 200,    description: 'Llista d\\'usuaris obtinguda correctament',    type: \[Usuari\],  // ← array de Usuari  })  @ApiUnauthorizedResponse({ description: 'Token JWT absent o invàlid' })  trobarTots(@Query() filtre: FiltreUsuarisDto) {    return this.usuarisService.trobarTots(filtre);  }  @Get(':id')  @ApiOperation({ summary: 'Obtenir usuari per ID' })  @ApiParam({    name: 'id',    description: 'MongoDB ObjectId de l\\'usuari',    example: '507f1f77bcf86cd799439011',  })  @ApiResponse({ status: 200, description: 'Usuari trobat', type: Usuari })  @ApiNotFoundResponse({ description: 'Usuari no trobat' })  @ApiBadRequestResponse({ description: 'Format d\\'ID invàlid' })  trobarPerId(@Param('id') id: string) {    return this.usuarisService.trobarPerId(id);  }  @Post()  @HttpCode(HttpStatus.CREATED)  @ApiOperation({ summary: 'Crear nou usuari' })  @ApiCreatedResponse({    description: 'Usuari creat correctament',    type: Usuari,  })  @ApiBadRequestResponse({ description: 'Dades de validació incorrectes' })  @ApiResponse({    status: 409,    description: 'L\\'email ja existeix',  })  crear(@Body() crearUsuariDto: CrearUsuariDto) {    return this.usuarisService.crear(crearUsuariDto);  }  @Delete(':id')  @HttpCode(HttpStatus.NO\_CONTENT)  @ApiOperation({ summary: 'Eliminar usuari (Soft delete)' })  @ApiResponse({ status: 204, description: 'Usuari eliminat' })  @ApiNotFoundResponse({ description: 'Usuari no trobat' })  eliminar(@Param('id') id: string) {    return this.usuarisService.eliminar(id);  }} |
| :---- |

**Documentar el model de resposta amb `@Schema`**

| // src/usuaris/entities/usuari.entity.ts// (entitat de resposta \-- diferent del Schema de Mongoose)import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';export class Usuari {  @ApiProperty({    description: 'MongoDB ObjectId',    example: '507f1f77bcf86cd799439011',  })  \_id: string;  @ApiProperty({ example: 'Anna García' })  nom: string;  @ApiProperty({ example: 'anna@exemple.com' })  email: string;  @ApiProperty({ enum: \['usuari', 'editor', 'admin'\], example: 'usuari' })  rol: string;  @ApiProperty({ example: true })  actiu: boolean;  @ApiProperty({ example: '2025-06-17T10:30:00.000Z' })  createdAt: Date;  // No incloure el password a la resposta\!} |
| :---- |

**El CLI Plugin: menys boilerplate**

El plugin afegeix els decoradors apropiats al vol basant-se en l'Abstract Syntax Tree. Així no has de lluitar amb decoradors `@ApiProperty` escampats per tot el codi.

| // nest-cli.json \-- activar el plugin de Swagger{  "collection": "@nestjs/schematics",  "sourceRoot": "src",  "compilerOptions": {    "plugins": \[      {        "name": "@nestjs/swagger",        "options": {          "classValidatorShim": true,    // infereix de class-validator          "introspectComments": true     // usa comentaris JSDoc com a descriptions        }      }    \]  }} |
| :---- |

Amb el plugin activat, molts `@ApiProperty` es generen automàticament des dels tipus TypeScript i els decoradors de `class-validator`.

**Provar l'API des de Swagger UI**

Una vegada configurat, Swagger UI permet:

| http://localhost:3000/api/v1/docs1\. Veure tots els endpoints organitzats per tag2\. Expandir cada endpoint → veure paràmetres, cos i respostes possibles3\. Prémer "Try it out" → introduir dades → "Execute"4\. Veure la petició curl equivalent5\. Veure la resposta real de l'APIAutenticació JWT a Swagger UI:  → "Authorize" → introduir el token → tots els endpoints protegits funcionen |
| :---- |

**Resum: els decoradors Swagger més importants**

| Decorador | On usar | Descripció |
| ----- | ----- | ----- |
| `@ApiTags('nom')` | Controller | Agrupa endpoints en un grup |
| `@ApiOperation({summary})` | Mètode | Títol i descripció de l'endpoint |
| `@ApiProperty()` | DTO / Entitat | Documenta una propietat |
| `@ApiPropertyOptional()` | DTO / Entitat | Propietat opcional |
| `@ApiParam()` | Mètode | Documenta un paràmetre de ruta |
| `@ApiQuery()` | Mètode | Documenta un query parameter |
| `@ApiResponse()` | Mètode | Documenta una resposta per codi |
| `@ApiCreatedResponse()` | Mètode | Resposta 201 amb tipus |
| `@ApiNotFoundResponse()` | Mètode | Resposta 404 |
| `@ApiBadRequestResponse()` | Mètode | Resposta 400 |
| `@ApiBearerAuth()` | Controller/Mètode | Indica que requereix JWT |

