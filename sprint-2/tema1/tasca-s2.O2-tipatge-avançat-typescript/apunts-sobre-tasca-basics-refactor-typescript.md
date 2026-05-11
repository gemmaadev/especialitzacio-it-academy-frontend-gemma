**Apunts tasca basics-refactor**

### **Què és TypeScript?**

TypeScript és JavaScript amb **sistema de tipus** — un superset de JavaScript que afegeix tipat estàtic. Això vol dir que pots detectar errors **abans d'executar el codi**, en el moment d'escriure'l.

El codi TypeScript es **compila** a JavaScript normal abans d'executar-se.

| // JavaScript \-- cap error fins que s'executaconst suma \= (a, b) \=\> a \+ b// TypeScript \-- error immediatament si passes stringsconst suma \= (a: number, b: number) \=\> a \+ bsuma("hola", "món") // ❌ error en compilació |
| :---- |

**1\. Tipus bàsics**

Els tipus bàsics descriuen el tipus de dada que pot tenir una variable:

| number    // → 1, 2, 3.14string    // → "hola"boolean   // → true / falsevoid      // → funció que no retorna resunknown   // → tipus desconegut null      // → valor nul explícit  undefined // → valor no definit |
| :---- |

**2\. Tipar paràmetres i variables**

Poses el tipus després del nom amb `:`:

| // Paràmetresconst fn \= (a: number, b: number) \=\> a \+ b// Variablesconst user: User \= { id: 1, name: "Anna" }// Tipus de retornconst fn \= (): string \=\> "hola" |
| :---- |

TypeScript pot **inferir** el tipus automàticament en molts casos:

| const nom \= "Anna"  // TypeScript sap que és string sense dir-ho |
| :---- |

**3\. Paràmetres opcionals `?`**

El ? indica que un valor pot no existir. El `?` indica que el valor pot ser `undefined`.

| // Propietat opcional en objecteconst fn \= (params: { first: string; last?: string }) \=\> { }// Paràmetre opcionalconst fn \= (first: string, last?: string) \=\> { } |
| :---- |

**4\. Interfícies**

Defineixen la **forma** d'un objecte — quines propietats ha de tenir i de quin tipus:

Defineixen l'estructura d'un objecte.

Les interfícies et garanteixen que tots els objectes d'un tipus tinguin la mateixa estructura.

| interface User {  id: number;  firstName: string;  lastName: string;}const user: User \= { id: 1, firstName: "Jen", lastName: "Simmons" } |
| :---- |

**5\. Union types `|`**

Restringeix un valor a opcions concretes. Permet que una variable pugui ser un de diversos tipus o valors. Molt útil per restringir els valors possibles d'una propietat.

| role: "admin" | "user" | "super-admin"amount: number | { amount: number } |
| :---- |

**6\. Arrays**

Dues maneres equivalents d'anotar arrays:

| posts: Post\[\]        // ← sintaxi curtaposts: Array\<Post\>   // ← sintaxi genèrica |
| :---- |

**7\. Tipus de retorn de funció**

Indica quin tipus retorna una funció:

| // Funció normalconst makeUser \= (): User \=\> {  return { id: 1, firstName: "Jen", lastName: "Simmons" }}// Si retorna un tipus incorrecte → errorconst makeUser \= (): User \=\> {  return "hola"  // ❌ error \-- retorna string, no User}// Funció que no retorna resconst log \= (): void \=\> {  console.log("hola")} |
| :---- |

#### **8\. Promeses**

Les funcions `async` **sempre** retornen una Promise. Has d'embolcallar el tipus amb `Promise<>`:

| // ❌ Error \-- async sempre retorna Promiseconst fetchUser \= async (): User \=\> { ... }// ✅ Correcteconst fetchUser \= async (): Promise\<User\> \=\> {  const data \= await fetch("...")  return data} |
| :---- |

`Promise<User>` significa: *"et prometo que quan acabi et donaré un User"*.

#### **9\. Set tipat**

Igual que `new Set()` però indicant el tipus dels elements:

| const guitarists \= new Set\<string\>()guitarists.add("Jimi Hendrix")  // ✅ és un stringguitarists.add(2)               // ❌ error \-- no és un string |
| :---- |

**10\. Herència amb `extends`**

Una interfície pot **heretar** propietats d'una altra — principi DRY (Don't Repeat Yourself):

`User` tindrà automàticament `id` \+ `firstName`.

| interface BaseEntity {  id: string;  // ← propietat compartida}interface User extends BaseEntity {  firstName: string;  // ← propietats pròpies}interface Post extends BaseEntity {  title: string;} |
| :---- |

**11\. Intersecció de tipus `&`**

Combina dos tipus en un — l'objecte ha de complir **tots dos**:

Diferència amb `extends`:

* `extends` → per interfícies  
* `&` → per combinar tipus existents

| type UserWithPosts \= User & { posts: Post\[\] }// → té totes les propietats de User \+ posts |
| :---- |

**12\. Utility Types**

TypeScript inclou tipus predefinits per manipular altres tipus:

**`Pick`** → tria propietats concretes:

| type MyType \= Pick\<User, "firstName" | "lastName"\>// → { firstName: string; lastName: string } |
| :---- |

**`Omit`** → elimina propietats concretes:

| type MyType \= Omit\<User, "id"\>// → { firstName: string; lastName: string } |
| :---- |

**`Record`** → objecte amb claus i valors tipats:

| const cache: Record\<string, string\> \= {}// clau: string, valor: string |
| :---- |

**`ReturnType`** → extreu el tipus de retorn d'una funció:

| type MyFuncReturn \= ReturnType\<typeof myFunc\> |
| :---- |

**13\. Set tipat**

| const guitarists \= new Set\<string\>()guitarists.add("Jimi Hendrix")  // ✅guitarists.add(2)               // ❌ error |
| :---- |

**14\. Type narrowing — `typeof` i `instanceof`**

Comprova el tipus en temps d'execució perquè TypeScript pugui usar-lo correctament:

**`typeof`** — per tipus primitius

**`instanceof`** — per objectes i classes

| // typeof \-- per tipus primitiusif (typeof amount \=== "number") { ... }// instanceof \-- per objectesif (e instanceof Error) {  e.message  // ✅ TypeScript sap que és un Error} |
| :---- |

**15\. Tipar funcions**

Quan passes una funció com a argument, has d'indicar el seu tipus:

| // Funció com a paràmetre(onFocusChange: (isFocused: boolean) \=\> void)// Funció async com a paràmetre(createUser: () \=\> Promise\<string\>)(getUser: (id: string) \=\> Promise\<User\>) |
| :---- |

(nomParam: tipusParam) \=\> tipusRetorn

**Resum general**

| Concepte | Sintaxi |
| ----- | ----- |
| Paràmetre tipat | `(a: number)` |
| Opcional | `(a?: string)` |
| Tipus de retorn | `(): User` |
| Async | `(): Promise<User>` |
| Array | `Post[]` o `Array<Post>` |
| Union | `"admin" | "user"` |
| Intersecció | `User & { posts: Post[] }` |
| Herència | `interface A extends B` |
| Pick | `Pick<User, "id">` |
| Omit | `Omit<User, "id">` |
| Record | `Record<string, string>` |
| ReturnType | `ReturnType<typeof fn>` |

 