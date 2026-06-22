**Investiga: Com s'utilitzen els verbs HTTP (GET, POST, PUT, DELETE, PATCH) per a operacions CRUD en una API REST?**

**La connexió fonamental: verbs → accions sobre recursos**

Els verbs HTTP (o mètodes, com s'anomenen formalment) comprenen una part important de la nostra restricció d'"interfície uniforme" i ens proporcionen la contrapart d'acció als recursos basats en substantius. 

Els verbs HTTP primaris o més usats son POST, GET, PUT, PATCH i DELETE. Aquests corresponen a les operacions de crear, llegir, actualitzar i eliminar (o CRUD), respectivament.

**Les dues propietats clau: Seguretat i Idempotència**

Els mètodes idempotents (GET, PUT, DELETE, HEAD, OPTIONS) produeixen el mateix resultat si es criden una o múltiples vegades. POST i PATCH no son ni segurs ni garantidament idempotents. 

**Safe** significa que el mètode no modifica l'estat del servidor. 

**Idempotent** significa que fer la mateixa petició múltiples vegades té el mateix efecte sobre l'estat del servidor que fer-la una sola vegada.

| Mètode | Safe | Idempotent | Té cos? |
| ----- | ----- | ----- | ----- |
| **GET** | ✅ Sí | ✅ Sí | ❌ No |
| **POST** | ❌ No | ❌ No | ✅ Sí |
| **PUT** | ❌ No | ✅ Sí | ✅ Sí |
| **PATCH** | ❌ No | ❌ No\* | ✅ Sí |
| **DELETE** | ❌ No | ✅ Sí | Opcional |

**GET — Read (Llegir)**

Usa les peticions GET per recuperar únicament la representació o informació del recurs, i no per modificar-lo de cap manera. 

Com que les peticions GET no canvien l'estat del recurs, es diuen mètodes segurs. Addicionalment, les APIs GET haurien de ser idempotents. 

Fer múltiples peticions idèntiques ha de produir el mateix resultat cada vegada fins que una altra API (POST o PUT) hagi canviat l'estat del recurs al servidor.

| // NestJS: controlador REST per a usuaris@Controller('api/usuaris')export class UsuarisController {  // GET /api/usuaris \-- col·lecció completa amb filtres opcionals  @Get()  @HttpCode(HttpStatus.OK)  // 200 per defecte  trobarTots(@Query() query: FiltreUsuarisDto) {    // /api/usuaris?actiu=true\&page=1\&limit=10    return this.usuarisService.trobarTots(query);  }  // GET /api/usuaris/42 \-- recurs individual  @Get(':id')  trobarPerId(@Param('id') id: string) {    return this.usuarisService.trobarPerId(id);    // → 200 OK \+ { id: 42, nom: "Anna", email: "anna@e.com" }    // → 404 Not Found si no existeix  }  // GET /api/usuaris/42/comandes \-- recurs relacionat (nested resource)  @Get(':id/comandes')  trobarComandesPerUsuari(@Param('id') id: string) {    return this.comandesService.trobarPerUsuari(id);  }} |
| :---- |

**POST — Create (Crear)**

El verb POST s'usa més sovint per crear un nou recurs. En particular, s'usa per crear recursos subordinats. En cas d'èxit, retornaria un HTTP 201 que indica la creació del recurs.

POST no és idempotent: fer la mateixa petició dues vegades crea dos recursos.

| // POST /api/usuaris \-- crear un nou usuari@Post()@HttpCode(HttpStatus.CREATED)  // 201 Createdasync crear(@Body() crearUsuariDto: CrearUsuariDto) {  const nouUsuari \= await this.usuarisService.crear(crearUsuariDto);  return nouUsuari;  // Resposta: 201 Created  // Body: { id: "6507f1f77bcf86cd79943901", nom: "Anna", email: "anna@e.com" }  // Header Location: /api/usuaris/6507f1f77bcf86cd79943901}// DTO per a la validació del cos de la peticióexport class CrearUsuariDto {  @IsString()  @IsNotEmpty()  @MaxLength(100)  nom: string;  @IsEmail()  email: string;  @IsString()  @MinLength(8)  password: string;} |
| :---- |

**PUT — Update/Replace (Substituir complet)**

PUT és sovint associat incorrectament amb ser una acció "d'editar". PUT està dissenyat per a actualitzacions idempotents on la petició conté la representació completa del recurs. 

Això significa que si fas PUT de les mateixes dades múltiples vegades, el recurs estarà en el mateix estat cada vegada. PUT és l'equivalent REST d'una operació upsert a una base de dades. 

Si el recurs existeix, s'actualitzarà. Si no existeix, es crearà.

| // PUT /api/usuaris/42 \-- substituir completament l'usuari 42@Put(':id')@HttpCode(HttpStatus.OK)actualitzar(  @Param('id') id: string,  @Body() actualitzarUsuariDto: ActualitzarUsuariDto) {  // Cal enviar TOTES les propietats del recurs, no únicament les que canvien  return this.usuarisService.substituir(id, actualitzarUsuariDto);  // → 200 OK \+ l'objecte complet actualitzat  // → 404 Not Found si no existeix}// Petició PUT correcta \-- inclou TOTS els camps:// { "nom": "Anna García", "email": "anna@e.com", "actiu": true, "rolId": 2 }// Petició PUT incorrecta \-- faltant camps → els omesos quedaran com null/default// { "nom": "Anna García" }  ← email i actiu es perdrien\! |
| :---- |

**PATCH — Partial Update (Actualitzar parcialment)**

PATCH s'usa per a capacitats de modificació. La petició PATCH únicament necessita contenir els canvis al recurs, no el recurs complet.

PUT s'usa per substituir completament un recurs amb les dades proporcionades al cos de la petició. 

PATCH, d'altra banda, s'usa per a actualitzacions parcials, aplicant únicament els canvis especificats al cos de la petició per modificar camps específics d'un recurs sense enviar la seva representació completa.

| // PATCH /api/usuaris/42 \-- actualitzar únicament els camps enviats@Patch(':id')@HttpCode(HttpStatus.OK)actualitzarParcialment(  @Param('id') id: string,  @Body() parcialDto: ActualitzarParcialUsuariDto) {  return this.usuarisService.actualitzarParcialment(id, parcialDto);}// DTO amb tots els camps opcionals (per a PATCH)export class ActualitzarParcialUsuariDto {  @IsOptional()  // ← tots els camps son opcionals en PATCH  @IsString()  nom?: string;  @IsOptional()  @IsEmail()  email?: string;  @IsOptional()  @IsBoolean()  actiu?: boolean;}// Peticions PATCH vàlides:// { "nom": "Anna García" }              → únicament canvia el nom// { "actiu": false }                    → únicament desactiva l'usuari// { "nom": "Anna", "email": "nova@e.com" } → canvia nom i email |
| :---- |

**DELETE — Delete (Eliminar)**

El mètode DELETE s'usa per eliminar un recurs especificat. Idempotent: múltiples peticions DELETE idèntiques haurien de tenir el mateix resultat — el recurs roman eliminat.

| // DELETE /api/usuaris/42 \-- eliminar l'usuari 42@Delete(':id')@HttpCode(HttpStatus.NO\_CONTENT)  // 204 No Content (sense cos de resposta)async eliminar(@Param('id') id: string) {  await this.usuarisService.eliminar(id);  // → 204 No Content (èxit, sense cos de resposta)  // → 404 Not Found si no existeix  // Nota: no retornar res en el cos → 204 No Content  // Alguns dissenys retornen 200 OK amb missatge → també acceptable}// Soft Delete: marcar com a eliminat sense esborrar de la BDasync eliminarSoft(id: string): Promise\<void\> {  const usuari \= await this.trobarPerId(id);  await this.usuariModel.findByIdAndUpdate(id, {    eliminatAt: new Date(),    actiu: false  });  // L'usuari segueix a la BD però amb eliminatAt \!= null} |
| :---- |

**La Taula CRUD completa per a l'API de Productes**

Les APIs REST han d'evitar verbals a les URLs. Les URLs son substantius, els mètodes HTTP son els verbs.

| URL                      | Mètode | Acció           | Resposta habitual─────────────────────────────────────────────────────────────────────────/api/productes           | GET    | Llistar tots    | 200 \+ array/api/productes?cat=3     | GET    | Llistar filtrats| 200 \+ array filtrat/api/productes/42        | GET    | Obtenir un      | 200 \+ objecte / 404/api/productes           | POST   | Crear nou       | 201 \+ objecte creat/api/productes/42        | PUT    | Substituir tot  | 200 \+ objecte / 404/api/productes/42        | PATCH  | Actualitz. parc.| 200 \+ objecte / 404/api/productes/42        | DELETE | Eliminar        | 204 / 404/api/productes/42/images | GET    | Imatg. del prod.| 200 \+ array/api/productes/42/images | POST   | Afegir imatge   | 201 \+ imatge |
| :---- |

**PUT vs. PATCH: la confusió més freqüent**

Error habitual: usar PUT per actualitzar un sol camp, enviant una representació incompleta del recurs. Solució: usar PATCH per a actualitzacions parcials. Usar PUT únicament quan tens el recurs de substitució complet.

| Escenari: l'usuari canvia únicament el seu nom de perfil.❌ PUT mal usat:PUT /api/usuaris/42{ "nom": "Anna García" }→ Problema: email, password, actiu... es posen a null o valors per defecte\!✅ PATCH correcte:PATCH /api/usuaris/42{ "nom": "Anna García" }→ Únicament el nom canvia, la resta de camps no es toquen.✅ PUT correcte:PUT /api/usuaris/42{ "nom": "Anna García", "email": "anna@e.com", "actiu": true, "rolId": 1 }→ Tot el recurs es substitueix amb tots els camps. |
| :---- |

**Errors comuns a evitar**

Error: usar POST per a totes les operacions, incloent lectures, actualitzacions i eliminacions. Solució: usar el mètode HTTP semànticament correcte. POST és únicament per a creació i operacions no idempotents.

| ❌ MAL DISSENY REST (verbos a la URL):POST /api/getUsuari/42POST /api/updateUsuari/42POST /api/deleteUsuari/42POST /api/activarUsuari/42✅ BON DISSENY REST (verbs HTTP \+ substantius a la URL):GET    /api/usuaris/42PATCH  /api/usuaris/42DELETE /api/usuaris/42PATCH  /api/usuaris/42  { "actiu": true } |
| :---- |

