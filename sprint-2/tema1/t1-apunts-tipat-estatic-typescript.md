## **Apunts tema 1 — Tipat Estàtic: TypeScript**

## **1\. Què és TypeScript i per què existeix**

TypeScript és un superset de JavaScript: qualsevol codi JavaScript vàlid és codi TypeScript vàlid. La diferència fonamental és que TypeScript afegeix un sistema de tipus estàtic que el compilador verifica **abans** d'executar el codi. El resultat de compilar TypeScript és JavaScript pur, que és el que executa el navegador o Node.js.

Va ser creat per Microsoft per resoldre un problema real: a mesura que les aplicacions JavaScript creixien en complexitat i nombre de developers, els bugs causats pel tipat dinàmic es multiplicaven. Sense tipus, una variable és una "caixa misteriosa" que pot contenir qualsevol cosa, i ningú sap quèretorna una funció sense llegir la implementació sencera.

Els quatre beneficis principals: **detecció d'errors en compilació** (no en producció), **autocompletat intel·ligent** a l'editor, **codi auto-documentat** (la signatura d'una funció explica quèfa), i **refactorització segura** (el compilador et diu exactament quècal canviar).

**2\. La sintaxi bàsica: anotar tipus**

```typescript
// Variables
let nom: string = 'Anna';
let edat: number = 25;
let actiu: boolean = true;
let llista: number[] = [1, 2, 3];
let tupla: [string, number] = ['Anna', 25];

// TypeScript infere el tipus quan pot (no cal anotar sempre)
let inferit = 'Hola';  // → string automàticament

// Funcions: tipus dels paràmetres i del retorn
function saluda(nom: string): string {
  return `Hola, ${nom}!`;
}

// Funcions amb async: retorn tipat
async function obtenirUsuari(id: number): Promise<Usuari> {
  const res = await fetch(`/api/usuaris/${id}`);
  return res.json();
}

// Objectes inline
function mostrarPerfil(usuari: { nom: string; edat: number }): void {
  console.log(`${usuari.nom}, ${usuari.edat} anys`);
}
```

**3\. Interfícies: contractes de dades**

Una interfície defineix el contracte que un objecte ha de complir. No és una classe ni genera codi JavaScript: és purament una definició de forma que desapareix en compilació.

```typescript
interface Usuari {
  readonly id: number;    // no modificable un cop creat
  nom: string;
  email: string;
  edat?: number;          // propietat opcional
}

// Estendre interfícies
interface Empleat extends Usuari {
  empresa: string;
  sou: number;
}

// Implementar en classes
class RepositoriUsuari implements Repositori<Usuari> {
  async trobarPerId(id: number): Promise<Usuari | null> { /* ... */ }
  async guardar(usuari: Usuari): Promise<Usuari> { /* ... */ }
}
```

**`type` vs `interface`** — usa `interface` per a formes d'objectes i contractes de classe (suporta `extends` i declaration merging). Usa `type` per a unions (`string | number`), interseccions (`Tipus1 & Tipus2`), tuples i tipus primitius.

**4\. Union, Intersection i Utility Types**

```typescript
// Union: un tipus O l'altre
type ID = string | number;
type Estat = 'carregant' | 'exit' | 'error';

// Intersection: combina tots dos tipus
type AdminUsuari = Usuari & { permisos: string[] };

// Utility Types: modificar tipus existents
type ActualitzacioUsuari = Partial<Usuari>;     // totes les propietats opcionals
type PerfilPublic = Pick<Usuari, 'nom' | 'email'>; // escollir propietats
type UsuariSenseId = Omit<Usuari, 'id'>;         // excloure propietats
type UsuariImmutable = Readonly<Usuari>;          // tot readonly
type RolMap = Record<'admin' | 'editor', string[]>; // objecte tipat
```

**5\. Type Narrowing: estrenyer unions en temps d'execució**

Quan una variable és d'un union type, TypeScript no sap quin tipus concret és. El narrowing és el procés de restringir el tipus dins d'un bloc condicional:

```typescript
function processar(valor: string | number) {
  if (typeof valor === 'string') {
    valor.toUpperCase();  // ← TypeScript: string
  } else {
    valor.toFixed(2);     // ← TypeScript: number
  }
}

// Discriminated Union: el patró més potent per a estats
type EstatAPI =
  | { tipus: 'carregant' }
  | { tipus: 'exit'; dades: Usuari[] }
  | { tipus: 'error'; missatge: string };

function renderitzar(estat: EstatAPI) {
  switch (estat.tipus) {
    case 'exit': return estat.dades;       // TypeScript sap que és l'exit
    case 'error': return estat.missatge;   // TypeScript sap que és l'error
  }
}
```

**6\. Genèrics: reutilitzar amb seguretat de tipus**

Els genèrics permeten escriure una sola implementació que funciona per a múltiples tipus, sense perdre la informació del tipus ni recórrer a `any`.

```typescript
// Funció genèrica: T és un marcador de posició que es concreta en cada ús
function primer<T>(arr: T[]): T | undefined {
  return arr[0];
}

const nom = primer(['Anna', 'Gema']);  // → string (inferit)
const num = primer([10, 20, 30]);      // → number (inferit)

// Genèric amb restricció
function obtenirLongitud<T extends { length: number }>(x: T): number {
  return x.length;  // TypeScript sap que T té .length
}

// Interfície genèrica per a totes les respostes de l'API
interface RespotaAPI<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

async function fetchData<T>(url: string): Promise<RespotaAPI<T>> {
  const res = await fetch(url);
  return res.json();
}

// Ús tipat complet
const usuaris = await fetchData<Usuari[]>('/api/usuaris');
usuaris.data[0].nom;  // ✅ autocompletat complet
```

**7\. Configuració: `tsconfig.json`**

El fitxer `tsconfig.json` és el centre de control del compilador TypeScript. Sense ell, TypeScript usa valors per defecte que probablement no s'ajusten al projecte.

```bash
tsc --init   # genera un tsconfig.json amb valors per defecte comentats
```

**Les decisions clau:**

```json
{
  "compilerOptions": {
    "target": "ES2022",        // versió JS de sortida
    "module": "ESNext",        // format dels imports/exports
    "strict": true,            // activa TOTES les comprovacions rigoroses ← IMPRESCINDIBLE
    "outDir": "./dist",        // on va el JavaScript compilat
    "rootDir": "./src",        // on estan els fitxers .ts
    "sourceMap": true,         // permet debugar el .ts original
    "esModuleInterop": true,   // compatibilitat d'imports CommonJS
    "skipLibCheck": true,      // no comprova .d.ts de biblioteques terceres
    "jsx": "react-jsx"         // per a projectes React
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

`"strict": true` és la decisió més important. Activa automàticament: `noImplicitAny` (obliga a declarar els tipus), `strictNullChecks` (`null` i `undefined` son tipus propis i cal gestionar-los explícitament), i altres comprovacions que garanteixen el màxim de seguretat.

**8\. Integrar biblioteques JavaScript sense tipat**

Quan una biblioteca JS no inclou fitxers `.d.ts`, TypeScript llança l'error `TS7016: Could not find a declaration file`. El flux de solucions:

```bash
# 1. Primer intent: buscar @types a DefinitelyTyped
npm install @types/express --save-dev
npm install @types/lodash --save-dev
npm install @types/jest --save-dev

# 2. Si no hi ha @types: escriure un fitxer de declaració propi
# src/declarations.d.ts
declare module 'nom-biblioteca-sense-tipus' {
  export function fer(x: number): string;
}

# 3. Solució ràpida (silencia l'error, sense tipus real):
# src/declarations.d.ts
declare module 'nom-biblioteca-sense-tipus';
```

**DefinitelyTyped** és el repositori col·laboratiu de GitHub amb milers de fitxers `.d.ts` mantinguts per la comunitat. Quan instal·les `@types/nom`, TypeScript el detecta automàticament a `node_modules/@types/`.

**Module Augmentation** — quan vols afegir propietats a tipus existents d'una biblioteca:

```typescript
// src/types/express.d.ts
declare global {
  namespace Express {
    interface Request {
      usuariAutenticat?: Usuari;  // propietat personalitzada a req
    }
  }
}
```

**9\. `any` vs `unknown` vs `never`**

| Tipus | Comportament | Quan usar |
| ----- | ----- | ----- |
| `any` | Desactiva tota comprovació de tipus | Únicament com a últim recurs en migracions |
| `unknown` | Tipus desconegut però segur: cal comprovar abans d'usar | Quan no saps el tipus però vols seguretat |
| `never` | Codi que mai s'executa | Exhaustivitat en switch/union, funcions que sempre llancen |

```typescript
// unknown: força la comprovació
let dades: unknown = obtenirDadesExteriors();
// dades.nom;  // ❌ Error: cal comprovar primer
if (typeof dades === 'string') {
  dades.toUpperCase();  // ✅ ara és segur
}

// never: cas exhaustiu en discriminated union
function assertNeverArriba(x: never): never {
  throw new Error(`Cas no gestionat: ${x}`);
}
```

**10\. El flux de treball TypeScript en un projecte**

```bash
1. Instal·lar i configurar
   npm install typescript --save-dev
   npx tsc --init
   Editar tsconfig.json → "strict": true
          ↓
2. Escriure codi .ts amb tipus
   Definir interfícies per a estructures de dades
   Anotar les funcions amb tipus de paràmetres i retorn
   Usar genèrics per a components reutilitzables
          ↓
3. L'editor detecta errors en temps real
   VS Code + TypeScript → subratllats vermells mentre escrius
   No cal executar res: els errors apareixen al vol
          ↓
4. Compilar per a producció
   npx tsc          → genera JavaScript a dist/
   npx tsc --watch  → recompila automàticament en cada canvi
          ↓
5. Per a frameworks amb bundler (Vite, Next.js):
   "noEmit": true   → TypeScript únicament comprova, Vite compila
   npx tsc --noEmit → verificació de tipus sense generar fitxers
   ```

**Resum**

**Usa `const` per defecte i atura `var`.** Igualment, en TypeScript usa `interface` per a objectes i `type` per a unions i composicions.

**`strict: true` sempre.** Un projecte TypeScript sense mode estricte perd la meitat dels beneficis.

**No abusis de `any`.** Cada `any` és un forat en la seguretat de tipus. Si no saps el tipus, usa `unknown`.

**Deixa que TypeScript infereixi.** No cal anotar cada variable. Anota els paràmetres de les funcions i els retorns explícits, i deixa que TypeScript infereixi la resta.

**DefinitelyTyped per a biblioteques.** Quan instal·les una biblioteca, comprova si existeix `@types/nom`. Si no, crea un fitxer `.d.ts` mínim.

