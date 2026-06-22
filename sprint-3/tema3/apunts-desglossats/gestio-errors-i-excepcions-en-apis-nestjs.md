**Quines són les millors pràctiques per a la gestió d'errors i excepcions en APIs NestJS?**

## **La capa d'excepcions integrada de NestJS**

Per defecte, aquesta acció és realitzada per un filtre d'excepcions global integrat, que gestiona excepcions del tipus `HttpException` (i subclasses). 

Quan una excepció no és reconeguda (no és `HttpException` ni una classe que en hereti), el filtre d'excepcions integrat genera la resposta JSON per defecte: `{ "statusCode": 500, "message": "Internal server error" }`.

Nest proporciona una classe `HttpException` integrada, exposada del paquet `@nestjs/common`. Per a aplicacions API REST/GraphQL típiques, és millor pràctica enviar objectes de resposta HTTP estàndard quan ocorren certes condicions d'error.

**Les excepcions integrades de NestJS**

| // Totes disponibles a @nestjs/commonimport {  BadRequestException,        // 400 \-- dades invàlides  UnauthorizedException,      // 401 \-- no autenticat  ForbiddenException,         // 403 \-- sense permisos  NotFoundException,          // 404 \-- recurs no trobat  MethodNotAllowedException,  // 405 \-- mètode HTTP no permès  ConflictException,          // 409 \-- conflicte (duplicat, etc.)  UnprocessableEntityException, // 422 \-- entitat no processable  TooManyRequestsException,   // 429 \-- massa peticions  InternalServerErrorException, // 500 \-- error intern  ServiceUnavailableException, // 503 \-- servei no disponible} from '@nestjs/common';// Ús al service:@Injectable()export class UsuarisService {  async trobarPerId(id: string): Promise\<Usuari\> {    // Validar format MongoDB ObjectId    if (\!Types.ObjectId.isValid(id)) {      throw new BadRequestException(\`ID '${id}' no és un ObjectId vàlid\`);    }    const usuari \= await this.usuariModel.findById(id);    if (\!usuari) {      throw new NotFoundException(\`Usuari amb ID ${id} no trobat\`);    }    return usuari;  }  async crear(dto: CrearUsuariDto): Promise\<Usuari\> {    const existeix \= await this.usuariModel.findOne({ email: dto.email });    if (existeix) {      throw new ConflictException(\`Ja existeix un usuari amb l'email ${dto.email}\`);    }    return new this.usuariModel(dto).save();  }} |
| :---- |

**Excepcions personalitzades: més semàntica i context**

A NestJS pots heretar de `HttpException` i crear classes d'excepcions personalitzades. Quan crees una classe personalitzada, Nest identificarà l'excepció i realitzarà la gestió d'excepcions automàticament.

| // src/common/exceptions/negoci.exceptions.ts// Excepció per a recursos no trobats amb context de dominiexport class UsuariNoTrobatException extends NotFoundException {  constructor(id: string) {    super({      statusCode: 404,      error: 'Usuari No Trobat',      message: \`No existeix cap usuari amb l'identificador ${id}\`,      timestamp: new Date().toISOString(),    });  }}// Excepció per a conflictes de negociexport class EmailDuplicatException extends ConflictException {  constructor(email: string) {    super({      statusCode: 409,      error: 'Email Duplicat',      message: \`L'adreça ${email} ja està registrada\`,    });  }}// Excepció de validació de negoci (diferent de la de dades)export class EstocInsuficientException extends UnprocessableEntityException {  constructor(producteId: string, disponible: number) {    super({      statusCode: 422,      error: 'Estoc Insuficient',      message: \`El producte ${producteId} únicament té ${disponible} unitats disponibles\`,      disponible,    });  }}// Ús al service: codi molt més llegibleasync trobarPerId(id: string) {  const usuari \= await this.usuariModel.findById(id);  if (\!usuari) throw new UsuariNoTrobatException(id);  // ← semàntic i clar  return usuari;} |
| :---- |

**Exception Filters: control centralitzat de les respostes d'error**

NestJS proporciona una funcionalitat poderosa anomenada Exception Filters que centralitza la gestió d'errors. Els exception filters capturen les excepcions llançades des dels controladors, pipes, guards i interceptors, permetent processar els errors de manera consistent.

| // src/common/filters/global-exception.filter.tsimport {  ExceptionFilter, Catch, ArgumentsHost,  HttpException, HttpStatus, Logger} from '@nestjs/common';import { Request, Response } from 'express';@Catch()  // ← @Catch() sense arguments captura TOTES les excepcionsexport class GlobalExceptionFilter implements ExceptionFilter {  private readonly logger \= new Logger(GlobalExceptionFilter.name);  catch(exception: unknown, host: ArgumentsHost) {    const ctx \= host.switchToHttp();    const response \= ctx.getResponse\<Response\>();    const request \= ctx.getRequest\<Request\>();    // Determinar el codi d'estat i el missatge    let status \= HttpStatus.INTERNAL\_SERVER\_ERROR;    let message: string | object \= 'Error intern del servidor';    if (exception instanceof HttpException) {      status \= exception.getStatus();      message \= exception.getResponse();    } else if (exception instanceof Error) {      // Errors no HTTP (MongoDB, TypeScript, etc.)      message \= exception.message;    }    // Logging: diferent per a 5xx (errors nostres) vs 4xx (errors del client)    if (status \>= 500) {      this.logger.error(        \`\[${request.method}\] ${request.url} → ${status}\`,        exception instanceof Error ? exception.stack : String(exception)      );    } else {      this.logger.warn(        \`\[${request.method}\] ${request.url} → ${status}: ${JSON.stringify(message)}\`      );    }    // Resposta d'error consistent per a TOTS els endpoints    response.status(status).json({      statusCode: status,      timestamp: new Date().toISOString(),      path: request.url,      method: request.method,      message: typeof message \=== 'string'        ? message        : (message as any).message || message,      // En producció: no exposar detalls interns dels errors 500      ...(process.env.NODE\_ENV \!== 'production' && status \>= 500 && {        stack: exception instanceof Error ? exception.stack : undefined,      }),    });  }} |
| :---- |

**Registrar el filtre global i altres filtres específics**

| // src/main.ts \-- filtre global per a TOTA l'aplicacióasync function bootstrap() {  const app \= await NestFactory.create(AppModule);  app.useGlobalFilters(new GlobalExceptionFilter());  await app.listen(3000);}// Filtre específic per a errors de MongoDB (CastError, ValidationError, etc.)@Catch(Error)export class MongoExceptionFilter implements ExceptionFilter {  catch(exception: Error, host: ArgumentsHost) {    const ctx \= host.switchToHttp();    const response \= ctx.getResponse\<Response\>();    // Error de cast de MongoDB (ID mal format)    if (exception.name \=== 'CastError') {      return response.status(400).json({        statusCode: 400,        message: 'Format d\\'ID invàlid',        error: 'Bad Request',      });    }    // Error de duplicat de MongoDB (índex únic violat)    if ((exception as any).code \=== 11000) {      const camp \= Object.keys((exception as any).keyPattern)\[0\];      return response.status(409).json({        statusCode: 409,        message: \`El valor del camp '${camp}' ja existeix\`,        error: 'Conflict',      });    }    // Passar al filtre global per a la resta    throw exception;  }}// Aplicar al mòdul:@Module({  providers: \[    {      provide: APP\_FILTER,      useClass: MongoExceptionFilter,    },  \],})export class AppModule {} |
| :---- |

**Les respostes d'error: format consistent**

| // Format recomanat per a respostes d'error REST:// Consistent, predible i informativa per al client// 400 Bad Request (validació):{  "statusCode": 400,  "timestamp": "2025-06-17T10:30:00.000Z",  "path": "/api/usuaris",  "method": "POST",  "message": \["email must be an email", "password must be longer than 8 chars"\],  "error": "Bad Request"}// 404 Not Found:{  "statusCode": 404,  "timestamp": "2025-06-17T10:30:00.000Z",  "path": "/api/usuaris/999",  "method": "GET",  "message": "Usuari amb ID 999 no trobat",  "error": "Not Found"}// 409 Conflict:{  "statusCode": 409,  "timestamp": "2025-06-17T10:30:00.000Z",  "path": "/api/usuaris",  "method": "POST",  "message": "L'adreça anna@e.com ja està registrada",  "error": "Conflict"}// 500 Internal Server Error (en producció, sense detalls):{  "statusCode": 500,  "timestamp": "2025-06-17T10:30:00.000Z",  "path": "/api/productes",  "method": "GET",  "message": "Error intern del servidor"  // ← mai exposar stack traces en producció\!} |
| :---- |

**El flux de gestió d'errors**

| Client fa una petició         ↓\[Guards\] → si falla: UnauthorizedException o ForbiddenException         ↓\[Pipes / ValidationPipe\] → si falla: BadRequestException (400)         ↓\[Controller\] → crida el Service         ↓\[Service\] → llança NotFoundException, ConflictException, etc.         ↓\[Exception Filter\] → captura l'excepció  → determina el codi d'estat  → formata la resposta d'error consistent  → registra l'error (Logger)  → retorna la resposta JSON al client         ↓Client rep resposta d'error amb format consistent |
| :---- |

**Resum: millors pràctiques**

| Pràctica | Com implementar-ho |
| ----- | ----- |
| **Usa excepcions específiques** | `NotFoundException`, `ConflictException`, etc. en lloc de `HttpException` genèrica |
| **Excepcions de domini** | Crea classes pròpies que hereten d'`HttpException` |
| **Filtre global** | `app.useGlobalFilters()` per a una resposta consistent a tota l'app |
| **Format consistent** | `statusCode`, `timestamp`, `path`, `method`, `message` en tots els errors |
| **Logging diferenciat** | `logger.error()` per a 5xx, `logger.warn()` per a 4xx |
| **Errors MongoDB** | Filtre específic per a `CastError` (ID invàlid) i codi 11000 (duplicat) |
| **No exposar interns** | En producció, mai retornar stack traces ni detalls d'implementació al client |

