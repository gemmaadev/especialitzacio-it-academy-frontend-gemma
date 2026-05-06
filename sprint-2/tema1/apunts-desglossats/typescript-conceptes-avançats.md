## **TypeScript: conceptes avançats de les eines de referència**

###### **TypeScript Official Handbook** [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/) Manual oficial de TypeScript amb guies, referències i exemples pràctics.

**TypeScript Deep Dive**  
[https://basarat.gitbook.io/typescript](https://basarat.gitbook.io/typescript)  
Llibre en línia gratuït amb una explicació exhaustiva de TypeScript per Basarat Ali Syed.

**TypeScript Config Cheat Sheet**  
[https://www.typescriptlang.org/tsconfig/](https://www.typescriptlang.org/tsconfig/)  
Resum de les opcions més útils de configuració tsconfig.json per a projectes TS.

**DefinitelyTyped Repo**  
[https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)  
Repositori col·laboratiu amb definicions de tipus per a biblioteques JavaScript populars.

**Inferència de Tipus: TypeScript pensa per tu**

Un dels aspectes més potents de TypeScript és que no cal anotar tots els tipus manualment. En la majoria de casos, no cal aprendre explícitament les regles de la inferència. Si estàs començant, prova d'usar menys anotacions de tipus del que creus — et sorprendrà la poca que necessites perquè TypeScript entengui completament el que fas.

| // TypeScript infereix el tipus automàticamentlet nom \= 'Anna';           // → inferit com stringlet edat \= 25;              // → inferit com numberlet actiu \= true;           // → inferit com booleanlet llista \= \[1, 2, 3\];    // → inferit com number\[\]// Inferència en funcions: el tipus de retorn es calculafunction sumar(a: number, b: number) {  return a \+ b;   // → retorn inferit com number}// Context typing: TypeScript infere el tipus del paràmetre pel contextconst noms \= \['Anna', 'Gemma'\];noms.forEach(nom \=\> {  // TypeScript sap que 'nom' és string per context  console.log(nom.toUpperCase());  // ✅ sense necessitat d'anotar el tipus}); |
| :---- |

Quan un tipus no s'especifica i no es pot inferir del context, TypeScript per defecte és `any`. Com que els valors `any` no es beneficien de la comprovació de tipus, normalment és desitjable evitar aquestes situacions. El flag de compilador `noImplicitAny` causarà que qualsevol `any` implícit es marqui com a error.

**Union Types: "un tipus O un altre"**

Les unions son per a relacions "o". Combinades amb type guards, donen una flexibilitat increïble sense sacrificar la seguretat de tipus.

| // Un valor pot ser d'un tipus O d'un altretype ID \= string | number;type Resultat \= 'exit' | 'error' | 'pendent';function processarID(id: string | number) {  // TypeScript no sap quin és: cal "estrenyir" el tipus  console.log(id.toUpperCase()); // ❌ Error: pot ser number  console.log(id.toFixed(2));    // ❌ Error: pot ser string  if (typeof id \=== 'string') {    console.log(id.toUpperCase()); // ✅ aquí TypeScript sap que és string  } else {    console.log(id.toFixed(2));    // ✅ aquí TypeScript sap que és number  }} |
| :---- |

**Type Narrowing: estrenyer el tipus en temps d'execució**

La narrowing TypeScript refina els union types usant checks com `typeof`, `in`, o guards personalitzades per habilitar l'accés segur a propietats i millorar la fiabilitat del codi.

Les tècniques de narrowing principals:

| // 1\. typeof: per a primitiusfunction mostrar(valor: string | number) {  if (typeof valor \=== 'string') {    console.log(valor.toUpperCase());  // ← TypeScript: string  } else {    console.log(valor.toFixed(2));     // ← TypeScript: number  }}// 2\. operador 'in': per a objectestype Gat \= { miolar: () \=\> void };type Gos \= { bordar: () \=\> void };function ferSoroll(animal: Gat | Gos) {  if ('miolar' in animal) {    animal.miolar();   // ← TypeScript: Gat  } else {    animal.bordar();   // ← TypeScript: Gos  }}// 3\. instanceof: per a classesif (error instanceof TypeError) {  console.log(error.message);  // ← TypeScript: TypeError} |
| :---- |

**Discriminated Unions: el patró més potent**

Un discriminated union usa una propietat literal compartida per diferenciar tipus d'objectes. En comprovar el camp `kind`, s'estreu el tipus a `Square` o `Circle`. Discriminated unions son útils per representar qualsevol tipus d'esquema de missatgeria en JavaScript, com quan s'envien missatges per xarxa o s'encoden mutacions en un framework de gestió d'estat.

| // Una propietat discriminant 'tipus' amb valor literaltype Carregant \= { tipus: 'carregant' };type Exit \= { tipus: 'exit'; dades: Usuari\[\] };type Error \= { tipus: 'error'; missatge: string };type EstatAPI \= Carregant | Exit | Error;function renderitzar(estat: EstatAPI) {  switch (estat.tipus) {    case 'carregant':      return \<Spinner /\>;    case 'exit':      return \<Llista dades={estat.dades} /\>;   // ← TypeScript: Exit    case 'error':      return \<Error text={estat.missatge} /\>;  // ← TypeScript: Error  }} |
| :---- |

**Utility Types: modificar tipus existents**

TypeScript inclou un conjunt de Utility Types que faciliten les transformacions de tipus comunes. Son tipus predefinits que modifiquen altres tipus:

| interface Usuari {  id: number;  nom: string;  email: string;  edat: number;}// Partial\<T\> \-- totes les propietats opcionalstype ActualitzacioUsuari \= Partial\<Usuari\>;// → { id?: number; nom?: string; email?: string; edat?: number }// Required\<T\> \-- totes les propietats obligatòriestype UsuariComplet \= Required\<Partial\<Usuari\>\>;// Readonly\<T\> \-- totes les propietats readonlytype UsuariImmutable \= Readonly\<Usuari\>;// Pick\<T, K\> \-- escollir propietats específiquestype PerfilPublic \= Pick\<Usuari, 'nom' | 'email'\>;// → { nom: string; email: string }// Omit\<T, K\> \-- excloure propietats específiquestype UsuariSenseId \= Omit\<Usuari, 'id'\>;// → { nom: string; email: string; edat: number }// Record\<K, V\> \-- objecte amb claus i valors tipatstype RolsPermissos \= Record\<'admin' | 'editor' | 'viewer', string\[\]\>;// → { admin: string\[\]; editor: string\[\]; viewer: string\[\] }// ReturnType\<T\> \-- extreure el tipus de retorn d'una funciófunction obtenirUsuari(): Usuari { /\* ... \*/ }type TipusUsuari \= ReturnType\<typeof obtenirUsuari\>;  // → Usuari |
| :---- |

**`unknown` vs `any` vs `never`**

`any` desactiva la seguretat, `unknown` força la narrowing, `never` representa casos impossibles.

| // any: desactiva tota comprovació de tipus (EVITAR)let qualsevol: any \= 'Hola';qualsevol.propietatInexistent;  // ✅ cap error (però falla en execució)// unknown: el tipus "no sé quèés" però segurlet desconegut: unknown \= obtenirDadesExteriors();// desconegut.nom;               // ❌ Error: cal comprovar primerif (typeof desconegut \=== 'string') {  desconegut.toUpperCase();      // ✅ ara TypeScript sap que és string}// never: codi que mai s'executa (cases exhaustius)function valorImpossible(x: never): never {  throw new Error(\`No hauria d'arribar aquí: ${x}\`);}type Color \= 'vermell' | 'blau';function processarColor(color: Color) {  switch (color) {    case 'vermell': return '\#FF0000';    case 'blau': return '\#0000FF';    default: return valorImpossible(color); // TypeScript garanteix exhaustivitat  }} |
| :---- |

**DefinitelyTyped: el repositori col·laboratiu**

DefinitelyTyped és un repositori a GitHub que serveix com a centre central per a fitxers de declaració TypeScript per a diverses biblioteques JavaScript. Inclou tipus per a biblioteques populars de frontend, frameworks de backend, utilitats de testing i molt més. Les definicions de DefinitelyTyped es publiquen automàticament a npm sota el scope `@types`.

El nom del paquet de tipus és sempre el mateix que el de la biblioteca subjacent:

| \# Biblioteca → paquet de tipus corresponentnpm install react              → npm install @types/react \--save-devnpm install express            → npm install @types/express \--save-devnpm install lodash             → npm install @types/lodash \--save-devnpm install jest               → npm install @types/jest \--save-devnpm install node               → npm install @types/node \--save-dev |
| :---- |

**Recursos de referència: on consultar**

* **TypeScript Official Handbook** (`typescriptlang.org/docs`) — La documentació oficial organitzada per temes: tipus bàsics, funcions, objectes, tipus avançats, genèrics. El millor punt de partida per a qualsevol dubte específic. Inclou un Playground interactiu per provar codi TypeScript directament al navegador.  
* **TypeScript Deep Dive** (`basarat.gitbook.io/typescript`) — Llibre en línia gratuït de Basarat Ali Syed. Cobreix TypeScript en profunditat amb nombrosos exemples pràctics. Excel·lent per als conceptes avançats com la inferència de tipus, els patrons de disseny i les bones pràctiques.  
* **TSConfig Reference** (`typescriptlang.org/tsconfig`) — Referència completa de totes les opcions de `tsconfig.json` amb exemples. El lloc on anar quan no entens el que fa una opció de configuració específica.  
* **DefinitelyTyped** (`github.com/DefinitelyTyped/DefinitelyTyped`) — El repositori GitHub amb milers de fitxers `.d.ts` mantinguts per la comunitat. Si necessites tipus per a una biblioteca JS popular, probablement ja estan aquí.

**Els conceptes clau del Handbook**

| Concepte | Sintaxi | Per a quèserveix |
| ----- | ----- | ----- |
| **Anotació de tipus** | `let x: string` | Declara el tipus d'una variable |
| **Inferència** | `let x = 'hola'` | TypeScript dedueix el tipus |
| **Union** | `string | number` | Un tipus O l'altre |
| **Intersection** | `Tipus1 & Tipus2` | Un tipus I l'altre |
| **Narrowing** | `typeof`, `in`, `instanceof` | Estrenyer union types |
| **Discriminated Union** | Propietat literal compartida | Gestionar estats complexos |
| **`unknown`** | `let x: unknown` | Tipus desconegut però segur |
| **`never`** | Cas exhaustiu | Codi impossible |
| **Utility Types** | `Partial<T>`, `Pick<T,K>`... | Transformar tipus existents |
| **`@types/nom`** | `npm install @types/nom` | Afegir tipus a biblioteques JS |

