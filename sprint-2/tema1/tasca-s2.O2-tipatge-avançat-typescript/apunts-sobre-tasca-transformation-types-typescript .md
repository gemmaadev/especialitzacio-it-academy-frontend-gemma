## **Apunts tasca Transformation Types**  

**`ReturnType` — extreure el tipus de retorn**

Extreu automàticament el tipus que retorna una funció:

```typescript
const myFunc = () => "hello"

type MyFuncReturn = ReturnType<typeof myFunc>
// → string
```

Per a funcions **async** cal afegir `Awaited` per extreure el tipus de dins la Promise:

```typescript
const getUser = () => Promise.resolve({ id: "123", name: "John" })

type ReturnValue = Awaited<ReturnType<typeof getUser>>
// → { id: string; name: string }
// Sense Awaited → Promise<{ id: string; name: string }> ❌
```

**`Parameters` — extreure els paràmetres**

Extreu el tipus dels paràmetres d'una funció com a tupla:

```typescript
const makeQuery = (url: string, opts?: { method?: string }) => {}

type MakeQueryParameters = Parameters<typeof makeQuery>
// → [url: string, opts?: { method?: string }]
```

**`keyof` — obtenir les claus d'un objecte**

Extreu les claus d'un objecte com a union type:

```typescript
const obj = { vitest: "...", jest: "...", mocha: "..." }

type Keys = keyof typeof obj
// → "vitest" | "jest" | "mocha"
```

`keyof` necessita un **tipus** — per això cal `typeof` si tens un valor.

**Indexed Access Types — accedir a propietats de tipus**

Permet accedir al tipus d'una propietat concreta:

```typescript
const fakeData = { String: "hola", Int: 1, Boolean: true }

type StringType  = (typeof fakeData)["String"]   // → string
type IntType     = (typeof fakeData)["Int"]       // → number
type BooleanType = (typeof fakeData)["Boolean"]   // → boolean
```

Els parèntesis `()` asseguren que `typeof` s'aplica abans de l'accés.

**`as const` — valors literals exactes**

Sense `as const` TypeScript infereix tipus genèrics. Amb `as const` els valors són **literals exactes**:

```typescript
// Sense as const
const obj = { role: "admin" }
// → { role: string }  ← qualsevol string

// Amb as const
const obj = { role: "admin" } as const
// → { role: "admin" }  ← exactament "admin"
```

**Indexed Access amb arrays**

Per obtenir el tipus dels elements d'un array:

```typescript
const fruits = ["apple", "banana", "orange"] as const

// Índex concret
type First = (typeof fruits)[0]        // → "apple"

// Múltiples índexs
type AppleOrBanana = (typeof fruits)[0 | 1]  // → "apple" | "banana"

// Tots els elements
type Fruit = (typeof fruits)[number]   // → "apple" | "banana" | "orange"
```

`[number]` significa "qualsevol índex numèric" → retorna tots els elements com a union.

**Indexed Access amb objectes i `as const`**

Per obtenir tots els **valors** d'un objecte com a union:

```typescript
const map = {
  singleModule: "SINGLE_MODULE",
  multiModule: "MULTI_MODULE",
} as const

type Values = (typeof map)[keyof typeof map]
// → "SINGLE_MODULE" | "MULTI_MODULE"
```

Patró: `(typeof obj)[keyof typeof obj]` → tots els valors de l'objecte.

**Terminologia de tipus**

**Union simple** — valors literals:

```typescript
type B = "a" | "b" | "c"
```

**Discriminated Union** — objectes amb propietat discriminadora:

```typescript
type A =
  | { type: "a"; a: string }
  | { type: "b"; b: string }
// La propietat 'type' permet distingir cada membre
```

**Enum** — constants amb nom:

```typescript
enum C {
  A = "a",
  B = "b",
}
C.A  // → "a"
```

**`Extract` i `Exclude` — filtrar unions**

**`Extract`** → **tria** els membres que compleixen la condició:

```typescript
type Event = { type: "click" } | { type: "focus" } | { type: "keydown" }

Extract<Event, { type: "click" }>
// → { type: "click"; event: MouseEvent }
```

**`Exclude`** → **elimina** els membres que compleixen la condició:

```typescript
Exclude<Event, { type: "keydown" }>
// → { type: "click" } | { type: "focus" }
```

**Accedir al discriminador d'una union**

Accedeix a la propietat `type` de tots els membres alhora:

```typescript
type Event =
  | { type: "click"; event: MouseEvent }
  | { type: "focus"; event: FocusEvent }

type EventType = Event["type"]
// → "click" | "focus"
```

**Resum de patrons**

| Objectiu | Sintaxi |
| ----- | ----- |
| Tipus de retorn | `ReturnType<typeof fn>` |
| Tipus de retorn async | `Awaited<ReturnType<typeof fn>>` |
| Paràmetres | `Parameters<typeof fn>` |
| Claus d'objecte | `keyof typeof obj` |
| Valor d'una propietat | `(typeof obj)["propietat"]` |
| Tots els valors | `(typeof obj)[keyof typeof obj]` |
| Element d'array | `(typeof arr)[number]` |
| Filtrar union | `Extract<Union, Condicio>` |
| Excloure union | `Exclude<Union, Condicio>` |
| Discriminador | `Union["type"]` |

