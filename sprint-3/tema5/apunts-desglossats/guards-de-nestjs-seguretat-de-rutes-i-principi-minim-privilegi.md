**Paper dels Guards de NestJS en la seguretat de les rutes i com faciliten la implementació del principi de mínim privilegi**

**Què és un Guard i per què existeix**

Un Guard és una classe anotada amb el decorador `@Injectable()` que implementa la interfície `CanActivate`. 

Els Guards tenen una sola responsabilitat. Determinen si una petició donada serà gestionada pel route handler o no, depenent de certes condicions (com permisos, rols, ACLs, etc.) presents en temps d'execució. Això s'anomena sovint autorització.

L'autorització és un gran cas d'ús per als Guards perquè rutes específiques haurien d'estar disponibles únicament quan el que fa la crida (usualment un usuari autenticat específic) té permisos suficients.

| On s'executen els Guards en el cicle de vida de NestJS:Petició HTTP → Middleware → Guards → Interceptors → Pipes → Handler → Interceptors → Resposta                             ↑                        Aquí decidim si la petició continua o no                        Si Guard retorna false → 403 Forbidden automàticament |
| :---- |

**La Interfície `CanActivate`: el contracte del Guard**

| // Tot Guard implementa aquesta interfícieexport interface CanActivate {  canActivate(    context: ExecutionContext  ): boolean | Promise\<boolean\> | Observable\<boolean\>;}// → true: la petició continua al handler// → false: NestJS llança ForbiddenException (403) automàticament// → Pot ser síncron, asíncron (Promise) o reactiu (Observable) |
| :---- |

**Guard 1: JwtAuthGuard — Autenticació**

El primer Guard que s'executa: verifica que el JWT és vàlid i pobla `req.user`.

| // src/auth/guards/jwt-auth.guard.tsimport { Injectable, ExecutionContext } from '@nestjs/common';import { AuthGuard } from '@nestjs/passport';import { Reflector } from '@nestjs/core';import { IS\_PUBLIC\_KEY } from '../decorators/public.decorator';@Injectable()export class JwtAuthGuard extends AuthGuard('jwt') {  constructor(private reflector: Reflector) {    super();  }  canActivate(context: ExecutionContext) {    // Comprovar si la ruta és pública (@Public())    const isPublic \= this.reflector.getAllAndOverride\<boolean\>(IS\_PUBLIC\_KEY, \[      context.getHandler(),      context.getClass(),    \]);    // Si és pública → no requereix autenticació    if (isPublic) return true;    // Si no → Passport verifica el JWT (crida JwtStrategy.validate())    return super.canActivate(context);    // → Si el JWT és vàlid: req.user \= { userId, email, rol }    // → Si el JWT és invàlid/absent: 401 Unauthorized automàticament  }}// Decorador per marcar rutes públiquesexport const IS\_PUBLIC\_KEY \= 'isPublic';export const Public \= () \=\> SetMetadata(IS\_PUBLIC\_KEY, true); |
| :---- |

**Guard 2: RolesGuard — Autorització per Rol (RBAC)**

RBAC (Role-based access control) és un mecanisme de control d'accés neutre en polítiques definit al voltant de rols i privilegis. Es pot implementar un mecanisme RBAC molt bàsic usant Guards de Nest.

| // src/auth/enums/rol.enum.tsexport enum Rol {  USUARI \= 'usuari',  EDITOR \= 'editor',  ADMIN \= 'admin',}// src/auth/decorators/rols.decorator.ts// Decorador personalitzat que adjunta metadades al handlerexport const ROLS\_KEY \= 'rols';export const Rols \= (...rols: Rol\[\]) \=\> SetMetadata(ROLS\_KEY, rols);// src/auth/guards/rols.guard.tsimport { Injectable, CanActivate, ExecutionContext,         ForbiddenException } from '@nestjs/common';import { Reflector } from '@nestjs/core';@Injectable()export class RolsGuard implements CanActivate {  constructor(private reflector: Reflector) {}  canActivate(context: ExecutionContext): boolean {    // 1\. Llegir els rols requerits des de les metadades del decorador    // getAllAndOverride: el handler té prioritat sobre el controller    const rolsRequerits \= this.reflector.getAllAndOverride\<Rol\[\]\>(ROLS\_KEY, \[      context.getHandler(),   // ← prioritat alta: @Rols() al mètode      context.getClass(),     // ← prioritat baixa: @Rols() al controller    \]);    // 2\. Si no hi ha restricció de rols → accés lliure (per a autenticats)    if (\!rolsRequerits || rolsRequerits.length \=== 0) {      return true;    }    // 3\. Obtenir l'usuari autenticat (pobat per JwtAuthGuard)    const { user } \= context.switchToHttp().getRequest();    if (\!user) {      throw new ForbiddenException('Usuari no autenticat');    }    // 4\. Verificar si l'usuari té ALGUN dels rols requerits (lògica OR)    const teRol \= rolsRequerits.some((rol) \=\> user.rol \=== rol);    if (\!teRol) {      throw new ForbiddenException(        \`Accés denegat. Rols requerits: ${rolsRequerits.join(', ')}\`      );    }    return true;  }} |
| :---- |

**Guard 3: Guard de propietat — Autorització per recurs**

El mínim privilegi no és únicament sobre rols: un usuari únicament pot modificar els seus propis recursos.

| // src/auth/guards/propietat.guard.ts// Guard que verifica que l'usuari és el propietari del recurs@Injectable()export class PropietatGuard implements CanActivate {  constructor(    @InjectModel(Comanda.name) private comandaModel: Model\<ComandaDocument\>  ) {}  async canActivate(context: ExecutionContext): Promise\<boolean\> {    const request \= context.switchToHttp().getRequest();    const usuariId \= request.user.userId;    const comandaId \= request.params.id;    // Verificar que la comanda pertany a l'usuari autenticat    const comanda \= await this.comandaModel.findById(comandaId);    if (\!comanda) {      throw new NotFoundException(\`Comanda ${comandaId} no trobada\`);    }    // L'admin pot accedir a qualsevol comanda    if (request.user.rol \=== Rol.ADMIN) return true;    // L'usuari únicament pot accedir a les seves pròpies comandes    if (comanda.usuariId.toString() \!== usuariId) {      throw new ForbiddenException('No tens permisos per accedir a aquesta comanda');    }    return true;  }} |
| :---- |

**El `Reflector`: com els Guards llegeixen les metadades dels Decoradors**

El `Reflector` s'usa per obtenir els rols requerits des de les metadades del route handler. `getAllAndOverride` busca les metadades primer al handler i si no les troba al controller. Això permet que els decoradors del mètode sobreescriguin els del controller.

| // Com funciona la priorització de metadades:@Controller('usuaris')@Rols(Rol.ADMIN)         // ← metadades del controller: admin per a tots els endpointsexport class UsuarisController {  @Get()  // Hereta @Rols(Rol.ADMIN) del controller  trobarTots() { ... }  @Get('perfil')  @Rols(Rol.USUARI, Rol.ADMIN)  // ← sobreescriu: usuaris i admins  veurePerfil() { ... }  @Get('estadistiques')  // Hereta @Rols(Rol.ADMIN) del controller  vreEstadistiques() { ... }}// El Reflector amb getAllAndOverride:// → @Get('perfil') → troba Rols al handler → usa \[USUARI, ADMIN\]// → @Get() → NO troba Rols al handler → busca al controller → usa \[ADMIN\] |
| :---- |

**Aplicació dels guards: nivells de granularitat**

| // NIVELL 1: Global \-- s'aplica a TOTS els endpoints de l'app// main.tsapp.useGlobalGuards(  new JwtAuthGuard(reflector),  // ← autenticació a tot arreu  new RolsGuard(reflector),     // ← rols a tot arreu);// NIVELL 2: Controller \-- s'aplica a tots els endpoints del controller@Controller('admin')@UseGuards(JwtAuthGuard, RolsGuard)@Rols(Rol.ADMIN)export class AdminController { ... }// NIVELL 3: Mètode \-- s'aplica únicament a aquest endpoint@Controller('productes')@UseGuards(JwtAuthGuard)export class ProductesController {  @Get()  @Public()  // ← no requereix autenticació  trobarTots() { ... }  @Post()  @UseGuards(RolsGuard)  @Rols(Rol.EDITOR, Rol.ADMIN)  // ← únicament editors i admins  crear() { ... }  @Delete(':id')  @UseGuards(RolsGuard)  @Rols(Rol.ADMIN)  // ← únicament admins  eliminar() { ... }} |
| :---- |

**El principi de mínim privilegi implementat amb guards**

El principi de mínim privilegi diu: cada usuari ha de tenir únicament els permisos mínims necessaris per a la seva tasca. Els Guards de NestJS implementen aquest principi de manera declarativa:

| // El principi de mínim privilegi en acció:@Controller('api')@UseGuards(JwtAuthGuard, RolsGuard)  // ← autenticació obligatòria per defecteexport class ApiController {  // Qualsevol autenticat pot llegir  @Get('productes')  // Sense @Rols → únicament requereix autenticació  llistarProductes() { ... }  // Únicament editors i admins poden crear  @Post('productes')  @Rols(Rol.EDITOR, Rol.ADMIN)  crearProducte() { ... }  // Únicament admins poden eliminar  @Delete('productes/:id')  @Rols(Rol.ADMIN)  eliminarProducte() { ... }  // Qualsevol pot veure (públic)  @Get('productes/publics')  @Public()  veureCatalegPublic() { ... }  // L'usuari únicament veu les seves pròpies comandes  @Get('comandes/:id')  @UseGuards(PropietatGuard)  // ← guard de propietat  veureComanda() { ... }} |
| :---- |

**Guard avançat: policies guard amb CASL**

Per a sistemes de permisos molt granulars, NestJS recomana CASL:

| // CASL: "Can Anna delete this post?"// npm install @casl/ability @casl/mongoose// Definir les habilitats per rolexport function defineAbilitiesFor(usuari: Usuari) {  const { can, cannot, build } \= new AbilityBuilder(createMongoAbility);  if (usuari.rol \=== 'admin') {    can('manage', 'all');  // admins ho poden tot  } else if (usuari.rol \=== 'editor') {    can('read', 'Post');    can(\['create', 'update'\], 'Post', { autorId: usuari.\_id });  // ← únics posts seus    cannot('delete', 'Post');  } else {    can('read', 'Post', { publicat: true });  // únicament publicats  }  return build();}// Guard que usa CASL@Injectable()export class PoliciesGuard implements CanActivate {  async canActivate(context: ExecutionContext): Promise\<boolean\> {    const { user, params, body } \= context.switchToHttp().getRequest();    const ability \= defineAbilitiesFor(user);    // Verificar la política específica de la ruta    const policia \= this.reflector.get\<PolicyHandler\>('policy', context.getHandler());    return policia(ability);  }}// Ús declaratiu@Delete(':id')@CheckPolicies((ability) \=\> ability.can('delete', 'Post'))eliminarPost(@Param('id') id: string) { ... } |
| :---- |

**Resum: els nivells de protecció amb Guards**

| Petició HTTP     ↓\[JwtAuthGuard\] → "Qui ets?" → 401 si no autenticat     ↓\[RolsGuard\]    → "Tens el rol?" → 403 si rol insuficient     ↓\[PropietatGuard\] → "És el teu recurs?" → 403 si no és propietari     ↓\[ValidationPipe\] → "Les dades son vàlides?" → 400 si invàlides     ↓\[Handler\] → Executa la lògica de negociPrincipi de Mínim Privilegi:  → Endpoints públics: @Public() (sense autenticació)  → Endpoints autenticats: JwtAuthGuard (sense @Rols)  → Endpoints per rol: @Rols(Rol.EDITOR, Rol.ADMIN)  → Endpoints per propietat: PropietatGuard  → Endpoints crítics: @Rols(Rol.ADMIN) \+ confirmació addicional |
| :---- |

