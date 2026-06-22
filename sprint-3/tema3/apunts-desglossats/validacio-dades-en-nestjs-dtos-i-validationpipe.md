**Per què és important la validació de dades en una API? Quins riscos s'eviten? Com facilita NestJS aquesta validació amb DTOs i ValidationPipe?**

## **Per què és crítica la validació d'una API**

La validació de dades és essencial a NestJS. És una defensa clau contra bugs i intencions malicioses. Sense una validació correcta, la nostra aplicació podria ser vulnerable a atacs com SQL injection, cross-site scripting (XSS), i problemes de validació d'inputs.

Aproximadament el 60% de les bretxes d'aplicacions sorgeixen d'una gestió incorrecta dels inputs. Les aplicacions que usen eines de validació son un 40% menys propenses a trobar vulnerabilitats d'injecció.

La regla fonamental: **mai confiar en el client**. El frontend pot tenir validació per a UX, però el backend ha de revalidar absolutament tot el que arriba.

**Els riscos que evita la validació**

En el context d'una aplicació NestJS, la validació correcta de dades ajuda a mitigar riscos com: Atacs d'Injecció (validant i saneig d'input, pots prevenir SQL injection, NoSQL injection i altres tipus d'atacs d'injecció de codi), Inputs Invàlids (evitar errors i excepcions resultants de tipus de dades o formats inesperats), i Integritat de Dades (assegurar que les dades processades s'adhereixin a l'estructura i regles esperades, prevenint inconsistències).

| Sense validació:  POST /api/usuaris  { "email": "no-es-un-email", "edat": "quaranta", "rol": "admin" }  → Potencialment s'emmagatzema a la BD amb dades incorrectes  → L'atacant pot injectar-se rol "admin"  → Errors obscurs mesos desprésAmb validació (NestJS \+ ValidationPipe):  POST /api/usuaris  { "email": "no-es-un-email", "edat": "quaranta", "rol": "admin" }  → 400 Bad Request immediatament  {    "statusCode": 400,    "message": \[      "email must be an email",      "edat must be a number",      "rol must be one of the following values: usuari, editor"    \],    "error": "Bad Request"  }  → El codi de negoci mai veu les dades invàlides |
| :---- |

**Què són els DTOs (Data Transfer Objects)**

Els DTOs son una eina poderosa a NestJS que defineixen l'estructura de les dades que s'envien i reben per la teva API. Integrant decoradors de validació proporcionats per class-validator, pots fàcilment imposar regles per a cada propietat del teu DTO.

| // Instal·lació necessària// npm install class-validator class-transformer// src/usuaris/dto/crear-usuari.dto.tsimport {  IsString, IsEmail, IsNotEmpty, IsOptional,  MinLength, MaxLength, IsEnum, IsInt, Min, Max,  IsBoolean, IsArray, ValidateNested, IsUrl} from 'class-validator';import { Type } from 'class-transformer';import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';enum RolUsuari {  USUARI \= 'usuari',  EDITOR \= 'editor',  ADMIN \= 'admin',}export class CrearUsuariDto {  @ApiProperty({ description: 'Nom complet', example: 'Anna García' })  @IsString()  @IsNotEmpty()  @MinLength(2, { message: 'El nom ha de tenir almenys 2 caràcters' })  @MaxLength(100, { message: 'El nom no pot superar els 100 caràcters' })  nom: string;  @ApiProperty({ description: 'Adreça de correu', example: 'anna@exemple.com' })  @IsEmail({}, { message: 'Ha de ser un email vàlid' })  @IsNotEmpty()  email: string;  @ApiProperty({ description: 'Contrasenya (mínim 8 caràcters)' })  @IsString()  @MinLength(8, { message: 'La contrasenya ha de tenir almenys 8 caràcters' })  password: string;  @ApiPropertyOptional({ enum: RolUsuari, default: RolUsuari.USUARI })  @IsOptional()  @IsEnum(RolUsuari, { message: 'El rol ha de ser: usuari, editor o admin' })  rol?: RolUsuari \= RolUsuari.USUARI;  @ApiPropertyOptional({ description: 'Edat de l\\'usuari' })  @IsOptional()  @IsInt()  @Min(18, { message: 'Ha de ser major d\\'edat' })  @Max(120)  edat?: number;} |
| :---- |

**PartialType i PickType: DTOs derivats sense repetir codi**

| // src/usuaris/dto/actualitzar-usuari.dto.tsimport { PartialType, PickType, OmitType } from '@nestjs/swagger';import { CrearUsuariDto } from './crear-usuari.dto';// PartialType: tots els camps de CrearUsuariDto però opcionals// → ideal per a PATCH (actualització parcial)export class ActualitzarUsuariDto extends PartialType(CrearUsuariDto) {}// PickType: únicament camps específics del DTO originalexport class ActualitzarContrasenya extends PickType(CrearUsuariDto, \['password'\] as const) {}// OmitType: tots els camps EXCEPTE els especificatsexport class RegistrePublicDto extends OmitType(CrearUsuariDto, \['rol'\] as const) {}// → l'usuari no pot assignar-se el seu propi rol al registrar-se |
| :---- |

**El ValidationPipe: la peça que ho connecta tot**

`ValidationPipe` fa ús del poderós paquet `class-validator` i els seus decoradors de validació declaratius. 

El `ValidationPipe` proporciona un enfocament convenient per imposar regles de validació per a tots els payloads de clients entrants, on les regles específiques es declaren amb simples anotacions en declaracions de classe/DTO locals en cada mòdul.

| // src/main.ts \-- ValidationPipe global (recomanat)import { ValidationPipe } from '@nestjs/common';async function bootstrap() {  const app \= await NestFactory.create(AppModule);  app.useGlobalPipes(new ValidationPipe({    // Elimina propietats que no estan declarades al DTO    // Defensa contra mass assignment attacks    whitelist: true,    // Llança un error si s'envien propietats no declarades    // (en lloc d'ignorar-les silenciosament)    forbidNonWhitelisted: true,    // Transforma el payload al tipus declarat al DTO    // ex: "42" (string) → 42 (number) si el DTO declara number    transform: true,    // Desactiva missatges d'error detallats en producció    disableErrorMessages: process.env.NODE\_ENV \=== 'production',  }));  await app.listen(3000);} |
| :---- |

Implementant aquests pipes a nivell global, t'assegures que les dades de cada petició entrant passen per les mateixes regles de validació, garantint la integritat de les dades sense duplicar el codi de validació en cada route handler.

**Les opcions de whitelist i transform en detall**

| // WHITELIST: defensa contra mass assignment// L'atacant envia: { "nom": "Anna", "rol": "admin", "isAdmin": true }// Sense whitelist → tots els camps arriben al servei// Amb whitelist: true → únicament arriben els camps del DTO// TRANSFORM: conversió automàtica de tipus// El client envia a la URL: /api/usuaris?pagina=2\&limit=10// Sense transform → pagina és "2" (string), limit és "10" (string)// Amb transform: true → pagina és 2 (number), limit és 10 (number)export class FiltreDto {  @IsOptional()  @IsInt()  @Type(() \=\> Number)  // necessari per a query params  pagina?: number \= 1;  @IsOptional()  @IsInt()  @Max(100)  @Type(() \=\> Number)  limit?: number \= 10;  @IsOptional()  @IsString()  cerca?: string;}// Al controlador:@Get()trobarTots(@Query() filtre: FiltreDto) {  // filtre.pagina és number (no string) → transform ha funcionat  return this.service.trobarTots(filtre);} |
| :---- |

**Validació d'objectes aniuats**

Per a objectes aniuats dins d'un DTO, usa el decorador `@ValidateNested` per assegurar que els objectes aniuats es validen d'acord amb les seves pròpies regles.

| // DTO per a una adreça (objecte aniuat)export class AdrecaDto {  @IsString() @IsNotEmpty()  carrer: string;  @IsString() @IsNotEmpty()  ciutat: string;  @IsString() @Length(5, 5, { message: 'El codi postal ha de tenir 5 dígits' })  codiPostal: string;}// DTO principal amb objecte aniuatexport class CrearComandaDto {  @IsArray()  @IsString({ each: true })  // valida cada element de l'array  productesIds: string\[\];  @ValidateNested()      // ← indica que cal validar el nested object  @Type(() \=\> AdrecaDto) // ← necessari per a la transformació de tipus  adrecaEnviament: AdrecaDto;} |
| :---- |

**Decoradors de `class-validator` més usats**

| // Strings@IsString()           // ha de ser un string@IsNotEmpty()         // no pot ser buit@MinLength(n)         // longitud mínima@MaxLength(n)         // longitud màxima@Matches(/regex/)     // ha de coincidir amb l'expressió regular@IsEmail()            // format email vàlid@IsUrl()              // format URL vàlid// Números@IsNumber()           // ha de ser un número@IsInt()              // ha de ser un enter@Min(n)               // valor mínim@Max(n)               // valor màxim@IsPositive()         // ha de ser positiu@IsNegative()         // ha de ser negatiu// Booleans@IsBoolean()          // ha de ser boolean// Arrays@IsArray()            // ha de ser un array@ArrayMinSize(n)      // mínim n elements@ArrayMaxSize(n)      // màxim n elements@IsString({ each: true }) // cada element ha de ser string// Enums i valors especials@IsEnum(MeuEnum)      // ha de ser un dels valors de l'enum@IsIn(\['a', 'b'\])     // ha de ser un dels valors llistats@IsOptional()         // el camp és opcional (permet null/undefined)// Dates@IsDate()             // ha de ser una Date@IsDateString()       // ha de ser una string de data ISO 8601// Objectes aniuats@ValidateNested()     // valida recursivament l'objecte aniuat@Type(() \=\> ClasseDTO) // transforma el plain object a la classe indicada |
| :---- |

**El flux complet de validació**

| Client envia: POST /api/usuarisBody: { "nom": "", "email": "no-valida", "password": "123" }         ↓\[ValidationPipe s'activa\]  → Crea una instància de CrearUsuariDto  → Aplica els decoradors de class-validator  → Detecta errors:      nom: IsNotEmpty() FALLA (buit)      email: IsEmail() FALLA (format invàlid)      password: MinLength(8) FALLA (massa curt)         ↓\[Llança HttpException 400\]{  "statusCode": 400,  "message": \[    "nom should not be empty",    "email must be an email",    "password must be longer than or equal to 8 characters"  \],  "error": "Bad Request"}         ↓\[El controller i el service MAI s'executen\]← El código de negoci mai veu les dades invàlides |
| :---- |

