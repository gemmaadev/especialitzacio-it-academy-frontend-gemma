**Per què és fonamental distingir entre autenticació i autorització? Proporciona exemples de situacions on la confusió pot portar a problemes de seguretat.**

L'autenticació és el procés de verificar la identitat d'un usuari. L'autorització determina a quins recursos o accions pot accedir un usuari autenticat.

Resumit en dues preguntes:

| Autenticació → "Qui ets?"  → Verificació d'identitat  → Comprovació de credencials (email \+ password, JWT, OAuth)  → Resultat: saps qui és l'usuari (o que no s'ha identificat)Autorització  → "Quèpots fer?"  → Verificació de permisos  → Comprovació de rols, claims, propietat del recurs  → Resultat: accés concedit o denegat a un recurs específic |
| :---- |

L'autorització és ortogonal i independent de l'autenticació. No obstant, l'autorització requereix un mecanisme d'autenticació. L'autorització sempre succeeix DESPRÉS de l'autenticació.

**L'ordre obligatori: primer autenticació, després autorització**

| Petició HTTP     ↓\[Autenticació\] → Qui ets?  → Comprova el JWT o les credencials  → Si invàlid → 401 Unauthorized (no sé qui ets)     ↓\[Autorització\] → Quèpots fer?  → Comprova el rol de l'usuari identificat  → Si sense permisos → 403 Forbidden (sé qui ets, però no pots)     ↓\[Handler\] → Executa la lògica de negoci |
| :---- |

Els codis HTTP ho reflecteixen:

| 401 Unauthorized → error d'AUTENTICACIÓ  (el nom és confús: significa "no autenticat" en realitat)  → No has presentat credencials vàlides403 Forbidden → error d'AUTORITZACIÓ  → Estàs autenticat però no tens permisos per a aquest recurs |
| :---- |

**Exemples concrets de la confusió i els seus riscos**

### **Exemple 1: confondre autenticació amb autorització → IDOR**

El risc clàssic: verificar que l'usuari ha iniciat sessió (autenticació) però no verificar que té dret sobre el recurs concret (autorització).

| // ❌ INCORRECTE: únicament verifica autenticació@Get(':id')@UseGuards(JwtAuthGuard)  // ← únicament comprova que té JWT vàlidasync obtenirComanda(@Param('id') id: string) {  return this.comandesService.trobarPerId(id);  // Qualsevol usuari autenticat pot veure QUALSEVOL comanda\!  // L'usuari A pot accedir a les comandes de l'usuari B  // → Insecure Direct Object Reference (IDOR)}// ✅ CORRECTE: verifica autenticació I autorització@Get(':id')@UseGuards(JwtAuthGuard)async obtenirComanda(  @Param('id') id: string,  @Request() req  // ← l'usuari autenticat del JWT) {  const comanda \= await this.comandesService.trobarPerId(id);  // Autorització: el recurs pertany a l'usuari autenticat?  if (comanda.usuariId \!== req.user.userId && req.user.rol \!== 'admin') {    throw new ForbiddenException('No tens permisos per veure aquesta comanda');  }  return comanda;} |
| :---- |

### **Exemple 2: confondre autorització amb autenticació → Escalada de Privilegis**

Autenticar l'usuari correctament però no verificar el rol adequadament:

| // ❌ INCORRECTE: comprova autenticació però no el rol@Delete(':id')@UseGuards(JwtAuthGuard)  // ← únicament comprova JWT, no el rol\!async eliminarUsuari(@Param('id') id: string) {  return this.usuarisService.eliminar(id);  // Qualsevol usuari autenticat (fins i tot 'usuari' normal)  // pot eliminar qualsevol compte\!  // → Escalada de Privilegis (Privilege Escalation)}// ✅ CORRECTE: autenticació \+ autorització per rol@Delete(':id')@UseGuards(JwtAuthGuard, RolesGuard)  // ← dos guards: autenticació \+ autorització@Roles('admin')                        // ← únicament adminsasync eliminarUsuari(@Param('id') id: string) {  return this.usuarisService.eliminar(id);} |
| :---- |

### **Exemple 3: JWT vàlid ≠ accés autoritzat**

Un JWT vàlid únicament confirma la identitat. No confirma els permisos sobre un recurs específic:

| // El JWT conté:{  "sub": "userId\_123",  "email": "anna@e.com",  "rol": "usuari",  // ← rol de lectura  "exp": 1719622800}// L'usuari presenta un JWT vàlid → autenticat ✅// Intenta fer: DELETE /api/usuaris/456 (un altre usuari)// → Autenticat? SÍ// → Autoritzat? NO (rol 'usuari' no pot eliminar comptes)// → Resposta correcta: 403 Forbidden |
| :---- |

**La implementació en NestJS: Guards separats per a cada concepte**

L'autenticació i l'autorització s'implementen a través de Guards en NestJS, que s'executen després del middleware però abans dels interceptors. 

Els Guards tenen accés al ExecutionContext i poden determinar si una petició ha de ser gestionada basant-se en l'estat d'autenticació i les regles d'autorització.

| // Guard d'AUTENTICACIÓ: verifica el JWT@Injectable()export class JwtAuthGuard extends AuthGuard('jwt') {  // Passport verifica el token i popula req.user  // → respon "qui ets?" (401 si invàlid)}// Guard d'AUTORITZACIÓ: verifica el rol@Injectable()export class RolesGuard implements CanActivate {  constructor(private reflector: Reflector) {}  canActivate(context: ExecutionContext): boolean {    const rolsRequerits \= this.reflector.getAllAndOverride\<string\[\]\>('roles', \[      context.getHandler(),      context.getClass(),    \]);    if (\!rolsRequerits) return true;  // sense restricció de rol    const { user } \= context.switchToHttp().getRequest();    // user ve de JwtAuthGuard (ja autenticat)    // → respon "quèpots fer?" (403 si sense permisos)    return rolsRequerits.includes(user.rol);  }}// Decorador per a definir els rols requeritsexport const Roles \= (...rols: string\[\]) \=\> SetMetadata('roles', rols);// Ús complet al controller: els dos guards en ordre@Controller('admin')@UseGuards(JwtAuthGuard, RolesGuard)  // ← ordre importa\! Auth primerexport class AdminController {  @Delete('usuaris/:id')  @Roles('admin')  // ← únicament admins  eliminarUsuari(@Param('id') id: string) {    return this.usuarisService.eliminar(id);  }  @Get('estadistiques')  @Roles('admin', 'supervisor')  // ← admins i supervisors  veurEstadistiques() {    return this.statsService.obtenirEstadistiques();  }} |
| :---- |

**Diferències**

| Aspecte | Autenticació | Autorització |
| ----- | ----- | ----- |
| **Pregunta** | Qui ets? | Què pots fer? |
| **Propòsit** | Verificar identitat | Gestionar permisos |
| **Quan** | Primer pas | Després de l'autenticació |
| **Error HTTP** | 401 Unauthorized | 403 Forbidden |
| **Basada en** | Credencials (JWT, password) | Rols, claims, propietat |
| **NestJS** | JwtAuthGuard | RolesGuard \+ @Roles() |
| **Exemple OK** | JWT vàlid presentat | Rol 'admin' verificat |
| **Exemple KO** | JWT expirat o invàlid | Rol 'usuari' intentant acció admin |

