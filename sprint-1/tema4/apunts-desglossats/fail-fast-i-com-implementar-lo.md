## **L'estratègia Fail Fast**

**Què és Fail Fast?**

Fail fast suggereix que si un error o problema es produirà, és millor detectar-lo el més aviat possible. Les entrades impròpies o invàlides a un sistema o mètodes individuals són una font comuna de problemes. De vegades, aquests problemes es persisteixen, resultant en dades corruptes o invàlides difícils d'aïllar i corregir. El principi Fail Fast ajuda a reduir el bucle de feedback quan entren inputs problemàtics.

L'oposat del Fail Fast és el **Fail Silently**: el sistema rep una entrada invàlida, no reporta cap error, continua executant-se amb dades incorrectes i el bug apareix molt lluny de la seva causa real. Detectar el bug en aquell punt és molt més difícil i car que si hagués fallat immediatament.

**Per què implementar-lo**

Bugs es detecten abans, es reprodueixen més fàcilment i es corregeixen més ràpidament. El programari s'estabilitza més ràpidament. Menys bugs i defectes arriben a producció, portant a un programari de major qualitat. El cost dels errors es redueix: com més triga a aparèixer un bug, més temps costa i més car és reparar-lo.

Si un programa escrit amb el principi Fail Fast segueix en execució, probablement està fent la seva feina correctament. A més, si permetes que el software continuï funcionant després que un error ocorri, pot entrar en un estat invàlid i, el que és més important, guardar aquell estat a la base de dades. Això porta a un problema més gran: la corrupció de dades, que no es pot resoldre simplement reiniciant l'aplicació.

**La implementació principal: Guard Clauses**

L'enfocament Fail Fast emfatitza comprovar i gestionar errors aviat al codi, permetent que la lògica principal (el "happy path") es mantingui clara. Això contrasta amb la indentació profunda, que pot obscurir el propòsit principal del codi.

| // ❌ Fail Silently: el codi continua amb dades invàlidesfunction procesarPagament(comanda) {  if (comanda) {    if (comanda.usuari) {      if (comanda.total \> 0) {        // happy path enterrat sota tres nivells d'indentació        cobrarTarjeta(comanda.total);        guardarComanda(comanda);      }      // si total \<= 0: no passa res, silenciosament    }    // si no hi ha usuari: no passa res, silenciosament  }  // si no hi ha comanda: no passa res, silenciosament}// ✅ Fail Fast amb Guard Clausesfunction procesarPagament(comanda) {  // Validació al principi: surt immediatament si alguna cosa va malament  if (\!comanda) throw new Error('Comanda requerida');  if (\!comanda.usuari) throw new Error('Usuari requerit a la comanda');  if (\!comanda.usuari.actiu) throw new Error('Usuari inactiu');  if (comanda.total \<= 0) throw new Error(\`Total invàlid: ${comanda.total}\`);  // Happy path: clar, pla, sense indentació excessiva  cobrarTarjeta(comanda.total);  guardarComanda(comanda);} |
| :---- |

**Validació al punt d'entrada**

En arquitectures client-servidor, Fail Fast comprova la petició del client just a l'arribada, abans de processar-la o redirigir-la a components interns, retornant un error si la petició falla (paràmetres incorrectes...). El codi Fail Fast decreix l'entropia interna del programari i redueix l'esforç de depuració.

La regla: valida les dades **on entren al sistema**, no al mig de la lògica de negoci.

| // ❌ Validació tardana: el problema es descobreix al finalasync function crearUsuari(dades) {  const hashedPassword \= await bcrypt.hash(dades.password, 10);  const token \= generarToken(dades.email);  const missatgeBenvinguda \= preparaMissatge(dades.nom);  // Aquí, després de tota la feina, descobrim que el email era invàlid  if (\!dades.email.includes('@')) throw new Error('Email invàlid');  await guardarUsuari({ ...dades, hashedPassword, token });  await enviarEmail(dades.email, missatgeBenvinguda);}// ✅ Fail Fast: valida tot al principiasync function crearUsuari(dades) {  // Tota la validació al punt d'entrada  if (\!dades.nom?.trim()) throw new Error('Nom requerit');  if (\!dades.email?.includes('@')) throw new Error('Email invàlid');  if (\!dades.password || dades.password.length \< 8)    throw new Error('Contrasenya mínima de 8 caràcters');  // Ara podem executar la lògica sabent que les dades són vàlides  const hashedPassword \= await bcrypt.hash(dades.password, 10);  const token \= generarToken(dades.email);  const missatgeBenvinguda \= preparaMissatge(dades.nom);  await guardarUsuari({ ...dades, hashedPassword, token });  await enviarEmail(dades.email, missatgeBenvinguda);} |
| :---- |

**Funcions de validació reutilitzables**

Per a aplicacions reals, és útil crear un petit sistema de validació reutilitzable que centralitzi les regles:

| // validators.js \-- biblioteca de validators reutilitzablesexport const validators \= {  requerit: (valor, camp) \=\> {    if (valor \=== null || valor \=== undefined || valor \=== '')      throw new Error(\`${camp} és requerit\`);  },  email: (valor) \=\> {    const regex \= /^\[^\\s@\]+@\[^\\s@\]+\\.\[^\\s@\]+$/;    if (\!regex.test(valor)) throw new Error(\`Email invàlid: ${valor}\`);  },  longitudMinima: (valor, min, camp) \=\> {    if (valor.length \< min)      throw new Error(\`${camp} ha de tenir almenys ${min} caràcters\`);  },  nombrePositiu: (valor, camp) \=\> {    if (typeof valor \!== 'number' || valor \<= 0)      throw new Error(\`${camp} ha de ser un nombre positiu\`);  },  unaDelesOpcions: (valor, opcions, camp) \=\> {    if (\!opcions.includes(valor))      throw new Error(\`${camp} ha de ser un de: ${opcions.join(', ')}\`);  }};// Funció que acumula TOTS els errors i els llança juntsexport function validar(regles) {  const errors \= \[\];  for (const \[camp, validacio\] of Object.entries(regles)) {    try { validacio(); }    catch (e) { errors.push(e.message); }  }  if (errors.length) throw new Error(errors.join('\\n'));} |
| :---- |

| // Usar el sistema de validacióimport { validators, validar } from './validators.js';function crearProducte({ nom, preu, categoria, stock }) {  // Valida tot de cop i retorna tots els errors alhora  validar({    nom: () \=\> validators.requerit(nom, 'Nom'),    preu: () \=\> validators.nombrePositiu(preu, 'Preu'),    categoria: () \=\> validators.unaDelesOpcions(      categoria,      \['electrònica', 'roba', 'menjar'\],      'Categoria'    ),    stock: () \=\> validators.nombrePositiu(stock, 'Stock'),  });  // Si arriba aquí, les dades són vàlides  return guardarProducte({ nom, preu, categoria, stock });} |
| :---- |

**Fail Fast amb `async/await`: validar abans de les operacions costoses**

| // ✅ Fail Fast en operacions asíncrones: valida PRIMER, opera DESPRÉSasync function processarImatge(fitxer, usuariId) {  // Validacions síncrones primer (no costen res)  if (\!fitxer) throw new Error('Fitxer requerit');  if (\!fitxer.type.startsWith('image/'))    throw new Error(\`Tipus no suportat: ${fitxer.type}\`);  if (fitxer.size \> 5 \* 1024 \* 1024)    throw new Error('El fitxer supera els 5MB');  // Validació asíncrona abans de l'operació cara  const usuari \= await obtenirUsuari(usuariId);  if (\!usuari) throw new Error('Usuari no trobat');  if (\!usuari.potPujarImatges)    throw new Error('Usuari sense permisos per pujar imatges');  // Ara sí: operació costosa (pujar a S3, processar...)  const url \= await pujarAStorage(fitxer);  await guardarUrlImatge(usuariId, url);  return url;} |
| :---- |

**Fail Fast en la configuració de l'aplicació**

L'enfocament Fail Fast seria agafar tots els valors requerits i validar-los tots alhora a l'inici de l'aplicació. Si l'aplicació no pot inicialitzar correctament, és millor que falli immediatament amb un missatge clar que no pas que falli misteriosament 10 minuts després.

| // config.js \-- valida la configuració a l'inicifunction carregarConfiguracio() {  const requerits \= \[    'DATABASE\_URL',    'JWT\_SECRET',    'STRIPE\_API\_KEY',    'SENDGRID\_API\_KEY'  \];  const mancants \= requerits.filter(clau \=\> \!process.env\[clau\]);  if (mancants.length \> 0) {    // Fail Fast: l'app no arrenca si manca configuració crítica    throw new Error(      \`Variables d'entorn mancants:\\n${mancants.map(c \=\> \`  \- ${c}\`).join('\\n')}\\n\` \+      \`Comprova el fitxer .env\`    );  }  return {    dbUrl: process.env.DATABASE\_URL,    jwtSecret: process.env.JWT\_SECRET,    stripeKey: process.env.STRIPE\_API\_KEY,  };}// L'app s'atura immediatament amb un error clarexport const config \= carregarConfiguracio(); |
| :---- |

**Quan NO aplicar Fail Fast**

Incorporar el patró Fail Fast al teu programari pot afegir overhead i fins i tot fer les coses menys estables, de manera que cal aplicar-lo amb cura. Per als serveis nucli, optimitzar per a la recuperabilitat i la degradació elegant pot ser preferible a fallar al menor indici de problema. Les accions compensatòries com el caching i els reintents poden ajudar a emmascarar fallades transients.

**No apliquis Fail Fast quan:**

* L'error és transitori (connexió de xarxa inestable) → usa retry amb backoff  
* La funcionalitat és opcional (una widget del dashboard falla) → mostra l'error però continua  
* L'error afecta una part no crítica → degrada elegantment en lloc d'aturar tot

**Resum: les regles del Fail Fast**

| Regla | Per quèimporta |
| ----- | ----- |
| Valida al punt d'entrada | L'error apareix on el causen, no lluny |
| Guard clauses al principi | Happy path clar i sense indentació |
| Errors explícits amb context | "Email invàlid: anna" és millor que "Error" |
| Valida configuració a l'inici | L'app no arrenca amb config invàlida |
| Síncron primer, asíncron després | No facis operacions cares si la validació bàsica falla |
| Acumula tots els errors | L'usuari veu tots els problemes de cop, no d'un en un |

