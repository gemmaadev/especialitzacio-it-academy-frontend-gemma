## **Interfícies i tipus en TypeScript: Contractes de dades**

**Què és una interfície: el concepte de contracte**

En TypeScript, una interfície defineix un contracte que un objecte ha d'adherir. Conté declaracions de propietats, mètodes i events sense implementació, fent-la una eina versàtil per definir l'estructura dels objectes.

El concepte de "contracte" és fonamental: quan dius que una funció accepta un `Usuari`, qualsevol objecte que tingui les propietats correctes (nom, email, edat) complirà el contracte, independentment de com s'hagi creat. TypeScript no comprova si un objecte és d'una "classe" concreta sinó si té la "forma" correcta (structural typing).

| // Definim el contracte: quèha de tenir un Usuariinterface Usuari {  id: number;  nom: string;  email: string;}// Qualsevol objecte amb aquestes propietats compleix el contracteconst anna: Usuari \= { id: 1, nom: 'Anna', email: 'anna@e.com' };const objecteQualsevol \= { id: 2, nom: 'Gema', email: 'g@e.com', edat: 25 };// Aquest últim també compleix el contracte perquè TÉ les propietats requerides// (les propietats extra no son problema) |
| :---- |

**Les funcionalitats clau de les interfícies**

### **Propietats opcionals i readonly**

Les interfícies poden incloure propietats opcionals, indicades per un `?` després del nom de la propietat. Les propietats marcades com `readonly` no es poden modificar després de la creació de l'objecte, cosa que ajuda a mantenir la immutabilitat i la integritat de les dades.

| interface Producte {  readonly id: number;      // no es pot modificar un cop creat  nom: string;  preu: number;  descripcio?: string;      // propietat opcional: pot no existir  categoria?: string;       // propietat opcional}const producte: Producte \= { id: 1, nom: 'Portàtil', preu: 999 };// descripcio i categoria son opcionals: l'objecte és vàlid sense elles// producte.id \= 2;  // ❌ Error: cannot assign to 'id' because it is readonlyproducte.preu \= 899;  // ✅ preu no és readonly |
| :---- |

### **Propietats de funció a les interfícies**

| interface GestorAutenticacio {  login(email: string, password: string): Promise\<Usuari\>;  logout(): void;  isAuthenticated(): boolean;}// Qualsevol objecte o classe que implementi aquestes funcions compleix el contracte |
| :---- |

### **Interfícies per a funcions**

| // Definir la signatura d'una funció com a contracteinterface FuncioSuma {  (a: number, b: number): number;}const sumar: FuncioSuma \= (x, y) \=\> x \+ y;const restar: FuncioSuma \= (x, y) \=\> x \- y;// Tots dos compleixen el contracte: accepten dos números i retornen un número |
| :---- |

**Estendre interfícies: herència de contractes**

Les interfícies suportan declaration merging i extends, fent-les excel·lents per a l'extensibilitat.

| // Interfície baseinterface Persona {  nom: string;  edat: number;}// Interfície que hereta i afegeix propietatsinterface Empleat extends Persona {  empresa: string;  sou: number;}// Pots estendre múltiples interfícies alhorainterface Director extends Empleat, Persona {  equip: string\[\];}const director: Director \= {  nom: 'Anna',          // de Persona  edat: 35,             // de Persona  empresa: 'Acme',      // d'Empleat  sou: 60000,           // d'Empleat  equip: \['Gema', 'Marc'\] // de Director}; |
| :---- |

### **Declaration Merging: característica única de les interfícies**

Les interfícies poden ser extenses després de la seva declaració inicial, cosa impossible amb els tipus. Aquesta funcionalitat s'anomena "declaration merging".

| // Pots declarar la mateixa interfície en llocs separats del codi// TypeScript les fusiona automàticamentinterface Finestra {  amplada: number;}interface Finestra {        // ← mateixa interfície, declaració addicionall  alcada: number;}// El resultat és una sola interfície amb totes les propietatsconst finestra: Finestra \= { amplada: 1920, alcada: 1080 };// Cas pràctic: estendre l'objecte global Window del navegadorinterface Window {  myAnalytics: { track: (event: string) \=\> void };}// Ara TypeScript sap que window.myAnalytics existeix |
| :---- |

**`type`: l'alternativa flexible**

`type` és una funcionalitat de TypeScript usada per definir àlies per a types primitius, unions, interseccions, tuples i formes d'objecte. `interface` és típicament usada per definir l'estructura d'un objecte, suporta declaration merging i és preferida per definir APIs públiques o contractes de classe.

**El que `type` pot fer i `interface` no:**

| // Union types: un valor pot ser d'un tipus O un altretype ID \= string | number;type Estat \= 'carregant' | 'completat' | 'error';// Intersection types: combina dos tipus en untype AdminUsuari \= Usuari & { permisos: string\[\] };// Tuples: array de longitud i tipus fixostype Coordenades \= \[number, number\];type Resultat \= \[boolean, string | null\];// Tipus condicionats i mapeats (avançat)type Opcional\<T\> \= { \[K in keyof T\]?: T\[K\] }; |
| :---- |

**Implementar interfícies en classes**

Les interfícies s'utilitzen millor amb les classes per aplicar una estructura consistent i garantir el compliment del contracte.

| interface Repositori\<T\> {  trobarPerId(id: number): Promise\<T | null\>;  guardar(entitat: T): Promise\<T\>;  eliminar(id: number): Promise\<void\>;}// La classe PROMET complir el contracte de Repositori\<Usuari\>class RepositoriUsuari implements Repositori\<Usuari\> {  async trobarPerId(id: number): Promise\<Usuari | null\> {    const resposta \= await fetch(\`/api/usuaris/${id}\`);    return resposta.ok ? resposta.json() : null;  }  async guardar(usuari: Usuari): Promise\<Usuari\> {    const resposta \= await fetch('/api/usuaris', {      method: 'POST',      body: JSON.stringify(usuari)    });    return resposta.json();  }  async eliminar(id: number): Promise\<void\> {    await fetch(\`/api/usuaris/${id}\`, { method: 'DELETE' });  }}// Si la classe no implementa algun mètode del contracte → error immediatament |
| :---- |

**Interfícies per a respostes d'API: el cas d'ús més freqüent**

Una de les aplicacions més valuoses de les interfícies és tipar les respostes d'una API. Sense TypeScript, no saps quèretorna una crida `fetch`. Amb interfícies, el teu editor sap exactament quines propietats existeixen:

| // Definim l'estructura exacta que retorna l'APIinterface RespotaAPI\<T\> {  data: T;  status: 'success' | 'error';  message?: string;  paginacio?: {    pagina: number;    total: number;    perPagina: number;  };}interface Producte {  id: number;  nom: string;  preu: number;  enStock: boolean;}// La funció promet retornar exactament aquest formatasync function obtenirProductes(): Promise\<RespotaAPI\<Producte\[\]\>\> {  const res \= await fetch('/api/productes');  return res.json();}// Ara tenim autocompletat complet:const resposta \= await obtenirProductes();resposta.data           // → Producte\[\]resposta.data\[0\].nom    // → stringresposta.paginacio?.total  // → number | undefined |
| :---- |

**`interface` vs `type`: quan usar cada un**

Usa `interface` per definir formes d'objectes per a classes, crear APIs públiques, quan puguis necessitar declaration merging, i treballant amb patrons orientats a objectes. Usa `type` quan necessites unions o interseccions, treballant amb primitius, creant composicions de tipus complexes, o usant funcionalitats avançades de TypeScript.

| // ✅ interface: per a formes d'objectes i contractes de classeinterface Props {         // conveni en React: Props de components  titol: string;  onclick: () \=\> void;}interface IRepositori\<T\> {  // contractes per a classes  trobar(id: number): T;}// ✅ type: per a unions, primitius i composicions complexestype ID \= string | number;type Estat \= 'actiu' | 'inactiu' | 'pendent';type PropsOpcionals \= Partial\<Props\>;type ClausDe \= keyof Props; |
| :---- |

**Resum comparatiu**

| Funcionalitat | `interface` | `type` |
| ----- | ----- | ----- |
| Formes d'objectes | ✅ | ✅ |
| Union types (`A | B`) | ❌ | ✅ |
| Intersection (`A & B`) | Via `extends` | Via `&` |
| Tuples | ❌ | ✅ |
| Tipus primitius | ❌ | ✅ |
| Declaration merging | ✅ | ❌ |
| `extends` | ✅ Natural | Via `&` |
| `implements` en classes | ✅ Idiomatic | ✅ (si és objecte) |
| Tipus condicionats | ❌ | ✅ |
| Ideal per a | Objectes, classes, APIs | Unions, primitius, complexos |

