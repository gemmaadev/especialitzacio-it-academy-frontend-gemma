## **Genèrics en TypeScript: Reutilització amb seguretat de tipus**

**El problema que resolen els genèrics**

Imagina que vols escriure una funció que retorna el primer element d'un array. Sense genèrics, tens dues opcions dolentes:

| // Opció A: escriure una funció per a cada tipus (no escalable)function primerString(arr: string\[\]): string { return arr\[0\]; }function primerNumber(arr: number\[\]): number { return arr\[0\]; }function primerBoolean(arr: boolean\[\]): boolean { return arr\[0\]; }// → Codi duplicat per a cada tipus possible// Opció B: usar 'any' (perd tota la seguretat de tipus)function primer(arr: any\[\]): any { return arr\[0\]; }const resultat \= primer(\['Anna', 'Gema'\]); // → tipus 'any'resultat.toUpperCase(); // ✅ funcionaresultat.toFixed(2);    // ✅ TypeScript no diu res... però falla en execució\! |
| :---- |

Mentre usar `any` és certament genèric en el sentit que fa que la funció accepti qualsevol tipus, perdem la informació sobre quin era aquell tipus quan la funció retorna. Si passem un número, l'única informació que tenim és que qualsevol tipus podria ser retornat.

Els genèrics resolen exactament aquest problema: **una sola implementació que funciona per a múltiples tipus sense perdre la informació de tipus**.

**La sintaxi bàsica: el paràmetre de tipus `<T>`**

Els genèrics apareixen en el codi TypeScript dins d'angle brackets, en el format `<T>`, on `T` representa un tipus passat. `<T>` es pot llegir com "un genèric de tipus T". En aquest cas, `T` opera de la mateixa manera que els paràmetres funcionen en les funcions, com a marcadors de posició per a un tipus que es declararà quan es crei una instància de l'estructura.

| // La funció genèrica: T és el paràmetre de tipusfunction primer\<T\>(arr: T\[\]): T {  return arr\[0\];}// TypeScript infere el tipus automàticamentconst primerNom \= primer(\['Anna', 'Gema', 'Marc'\]);  // → stringconst primerNum  \= primer(\[10, 20, 30\]);              // → numberconst primerUser \= primer(\[{ id: 1, nom: 'Anna' }\]); // → { id: number, nom: string }primerNom.toUpperCase();   // ✅ TypeScript sap que és stringprimerNum.toFixed(2);      // ✅ TypeScript sap que és number// primerNom.toFixed(2);   // ❌ Error: 'toFixed' no existeix en 'string' |
| :---- |

Per convenció, els programadors normalment usen una sola lletra per nombrar un tipus genèric. Aquesta convenció ajuda a comunicar immediatament als que llegeixen el codi que un tipus genèric no requereix un tipus específic. Les convencions més comunes: `T` per al primer tipus, `K` per a Key, `V` per a Value, `U` per a un segon tipus genèric.

**Múltiples paràmetres de tipus**

| // Funció amb dos tipus genèricsfunction parella\<T, U\>(primer: T, segon: U): \[T, U\] {  return \[primer, segon\];}const result \= parella('Hola', 42);  // → \[string, number\]const result2 \= parella(true, { id: 1 });  // → \[boolean, { id: number }\]// Funció que obté una propietat d'un objecte de manera segura// K extends keyof T garanteix que la clau existeix a l'objectefunction obtenirPropietat\<T, K extends keyof T\>(objecte: T, clau: K): T\[K\] {  return objecte\[clau\];}const usuari \= { nom: 'Anna', edat: 25, actiu: true };const nom \= obtenirPropietat(usuari, 'nom');    // → stringconst edat \= obtenirPropietat(usuari, 'edat');  // → number// obtenirPropietat(usuari, 'inexistent');       // ❌ Error en compilació\! |
| :---- |

**Restriccions amb `extends`: limitar els tipus acceptats**

Sovint vols que el genèric accepti qualsevol tipus, però no absolutament qualsevol: necessita tenir certes propietats.

De vegades vols restringir els tipus que es poden usar amb els genèrics. TypeScript et permet especificar restriccions en els paràmetres de tipus usant la paraula clau `extends`. En l'exemple, la funció `loggingIdentity` pren un paràmetre de tipus `T` que ha d'estendre la interfície `Lengthwise`, que assegura que `arg` té una propietat `length`. Aquesta restricció permet accedir a la propietat `length` sense causar un error de compilació.

| // Sense restricció: TypeScript no sap que T té .lengthfunction mostrarLongitud\<T\>(element: T): void {  console.log(element.length);  // ❌ Error: 'length' no existeix en 'T'}// Amb restricció: T ha de tenir la propietat 'length'interface AmbLongitud {  length: number;}function mostrarLongitud\<T extends AmbLongitud\>(element: T): T {  console.log(element.length);  // ✅ TypeScript sap que existeix  return element;}mostrarLongitud('Hola');        // ✅ strings tenen lengthmostrarLongitud(\[1, 2, 3\]);     // ✅ arrays tenen length// mostrarLongitud(42);         // ❌ Error: number no té length |
| :---- |

**Genèrics en interfícies: estructures reutilitzables**

Quan construeixes APIs, els genèrics fan que les teves funcions i interfícies siguin reutilitzables i type-safe, especialment per a respostes d'API que comparteixen la mateixa estructura però contenen tipus de dades diferents.

| // Una sola interfície per a totes les respostes de l'APIinterface RespotaAPI\<T\> {  data: T;  status: 'success' | 'error';  message?: string;  paginacio?: { pagina: number; total: number };}// Reutilitzem la mateixa interfície per a qualsevol tipus de dadesinterface Usuari { id: number; nom: string; email: string; }interface Producte { id: number; nom: string; preu: number; }const respostaUsuaris: RespotaAPI\<Usuari\[\]\> \= {  data: \[{ id: 1, nom: 'Anna', email: 'anna@e.com' }\],  status: 'success'};const respostaProductes: RespotaAPI\<Producte\> \= {  data: { id: 1, nom: 'Portàtil', preu: 999 },  status: 'success',  message: 'Producte trobat'}; |
| :---- |

**Genèrics en funcions asíncrones: tipar el fetch**

El cas d'ús més comú en el dia a dia:

| // Funció genèrica per a qualsevol crida a l'APIasync function fetchData\<T\>(url: string): Promise\<T\> {  const resposta \= await fetch(url);  if (\!resposta.ok) {    throw new Error(\`HTTP error: ${resposta.status}\`);  }  return resposta.json() as Promise\<T\>;}// Ús: especifiques el tipus que esperes rebreconst usuaris \= await fetchData\<Usuari\[\]\>('/api/usuaris');// usuaris → Usuari\[\] → autocompletat complet\!usuaris\[0\].nom;   // ✅ TypeScript sap que existeixconst producte \= await fetchData\<Producte\>('/api/productes/1');producte.preu;    // ✅ TypeScript sap que és number |
| :---- |

**Genèrics en classes: estructures de dades reutilitzables**

| // Una pila (stack) que funciona per a qualsevol tipusclass Pila\<T\> {  private elements: T\[\] \= \[\];  afegir(element: T): void {    this.elements.push(element);  }  treure(): T | undefined {    return this.elements.pop();  }  veure(): T | undefined {    return this.elements\[this.elements.length \- 1\];  }  get mida(): number {    return this.elements.length;  }}// La mateixa classe per a nombresconst pilaNumeros \= new Pila\<number\>();pilaNumeros.afegir(1);pilaNumeros.afegir(2);const n \= pilaNumeros.treure();  // → number// I per a objectesconst pilaUsuaris \= new Pila\<Usuari\>();pilaUsuaris.afegir({ id: 1, nom: 'Anna', email: 'anna@e.com' }); |
| :---- |

**Genèrics en components React**

En React, estem familiaritzats amb el concepte de components com a funcions que prenen props i retornen elements JSX. Però quèsi volem crear un component que pot treballar amb tipus de dades diferents, com strings, números o objectes personalitzats? Com podem assegurar que el nostre component és type-safe i prou flexible per acomodar tipus de dades diferents?

| // Component genèric de llista que funciona per a qualsevol tipusinterface PropsLlista\<T\> {  elements: T\[\];  renderElement: (element: T) \=\> React.ReactNode;  keyExtractor: (element: T) \=\> string | number;}function Llista\<T\>({ elements, renderElement, keyExtractor }: PropsLlista\<T\>) {  return (    \<ul\>      {elements.map(element \=\> (        \<li key={keyExtractor(element)}\>          {renderElement(element)}        \</li\>      ))}    \</ul\>  );}// Reutilitzem el component amb qualsevol tipus de dades\<Llista\<Usuari\>  elements={usuaris}  keyExtractor={u \=\> u.id}  renderElement={u \=\> \<span\>{u.nom} \- {u.email}\</span\>}/\>\<Llista\<Producte\>  elements={productes}  keyExtractor={p \=\> p.id}  renderElement={p \=\> \<span\>{p.nom}: {p.preu}€\</span\>}/\> |
| :---- |

**Valors per defecte en genèrics**

| // Si no s'especifica el tipus, usa 'string' per defecteinterface Contenidor\<T \= string\> {  valor: T;  etiqueta: string;}const a: Contenidor \= { valor: 'Hola', etiqueta: 'Text' };        // T \= stringconst b: Contenidor\<number\> \= { valor: 42, etiqueta: 'Número' };  // T \= number |
| :---- |

**Quan usar genèrics i quan no**

Usa genèrics quan: la funció o classe ha de treballar amb múltiples tipus, vols que TypeScript infereixi i faci complir els tipus, i necessites flexibilitat sense perdre la seguretat de tipus. Evita'ls quan: el tipus sempre és el mateix, usar `any` és suficient, o quan fa el codi innecessàriament complex.

| // ❌ No cal genèric: el tipus sempre és el mateixfunction saludar\<T extends string\>(nom: T): string {  return \`Hola, ${nom}\!\`;}// ✅ Millor:function saludar(nom: string): string {  return \`Hola, ${nom}\!\`;}// ✅ Genèric justificat: el tipus varia en cada úsfunction primerElement\<T\>(arr: T\[\]): T | undefined {  return arr\[0\];} |
| :---- |

**Resum: els problemes que resolen els genèrics**

| Problema sense genèrics | Solució amb genèrics |
| ----- | ----- |
| Codi duplicat per a cada tipus | Una sola implementació per a tots els tipus |
| Usar `any` perd la seguretat de tipus | `<T>` manté la seguretat mentre és flexible |
| No saps el tipus de retorn d'una funció | TypeScript infere el tipus automàticament |
| Interfícies d'API duplicades | Una sola interfície `RespotaAPI<T>` reutilitzable |
| Components React inflexibles | Components genèrics per a qualsevol tipus de dades |

