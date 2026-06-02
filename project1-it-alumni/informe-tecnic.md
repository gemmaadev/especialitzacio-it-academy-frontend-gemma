# 📋 Informe Tècnic — IT Academy Alumni Platform
### Decisions i aprenentatges clau del projecte

---

## ÍNDEX

1. [Iniciar un projecte des de 0](#1-iniciar-un-projecte-des-de-0)
2. [Git Flow i comandes Git](#2-git-flow-i-comandes-git)
3. [HTML semàntic i accessibilitat](#3-html-semàntic-i-accessibilitat)
4. [CSS — Estils i responsive design](#4-css--estils-i-responsive-design)
5. [Connexions a API i renderitzat](#5-connexions-a-api-i-renderitzat)
6. [Filtres](#6-filtres)
7. [Vitest i Testing](#7-vitest-i-testing)
8. [Modularització i separació de responsabilitats](#8-modularització-i-separació-de-responsabilitats)
9. [SPA Router](#9-spa-router)

---

## 1. INICIAR UN PROJECTE DES DE 0

### Comandes d'inici

```bash
mkdir nom-projecte
cd nom-projecte
npm create vite@latest .
npm install
npm run dev
```

### Què fa cada comanda?

| Comanda | Què fa |
|---------|--------|
| `npm create vite@latest .` | Crea l'estructura base del projecte amb Vite |
| `npm install` | Descarrega totes les dependències del `package.json` |
| `npm run dev` | Inicia el servidor local (localhost:5173) |
| `npm run build` | Compila el projecte per a producció |

### Decisió: Per què Vite i no Create React App?

Vite és molt més ràpid i lleuger. Com que aquest projecte és Vanilla TypeScript (sense React), Vite és l'eina ideal.

### Neteja inicial del projecte

Vite crea fitxers de demostració que no necessitem. Es van eliminar:
- `App.tsx`, `App.css`, contingut de `main.ts`, `assets/`

I es va deixar l'estructura neta:
```
src/
├── main.ts        ← punt d'entrada
└── vite-env.d.ts  ← tipus de Vite
index.html         ← HTML principal
```

---

## 2. GIT FLOW I COMANDES GIT

### Concepte clau: Git Flow

Git Flow és una estratègia per organitzar el codi en branques. Permet treballar en funcionalitats noves sense trencar el codi estable.

```
main     → codi estable, desplegat a producció
develop  → integració de totes les features
feature/ → una branca per cada funcionalitat nova
```

### Flux complet pas a pas

```bash
# 1. Sempre parteix de develop actualitzat
git checkout develop
git pull origin develop

# 2. Crea la branca de la nova funcionalitat
git checkout -b feature/networking

# 3. Treballes i vas fent commits
git add src/pages/networking.html
git commit -m "feat: add networking page HTML structure"
git push origin feature/networking

# 4. Quan acabes → PR a GitHub de feature → develop
# 5. Merge i eliminar la branca a GitHub

# 6. Tornar a develop i netejar local
git checkout develop
git pull origin develop
git branch -d feature/networking
```

### Convencions de commits

Els commits segueixen el format `tipus: descripció`:

| Prefix | Quan usar-lo |
|--------|-------------|
| `feat:` | Nova funcionalitat |
| `fix:` | Correcció d'error |
| `style:` | Canvis visuals CSS |
| `refactor:` | Reorganització sense canviar funcionalitat |
| `chore:` | Manteniment, organització de fitxers |
| `docs:` | Documentació (README...) |
| `test:` | Tests |

### Comandes útils

```bash
git status              # veure fitxers modificats
git log --oneline       # historial de commits resumit
git branch -a           # veure totes les branques (local i remotes)
git stash               # guardar canvis temporalment
git stash pop           # recuperar canvis guardats
```

---

## 3. HTML SEMÀNTIC I ACCESSIBILITAT

### Per què HTML semàntic?

Les etiquetes semàntiques indiquen el **significat** del contingut, no només l'aparença. Ajuden:
- Als lectors de pantalla (accessibilitat)
- Als motors de cerca (SEO)
- Als altres developers que llegeixen el codi

### Etiquetes semàntiques usades

```html
<main>      → contingut principal de la pàgina
<header>    → capçalera
<footer>    → peu de pàgina
<nav>       → navegació
<section>   → secció amb significat propi (té heading)
<article>   → contingut independent (targeta d'alumne)
<search>    → zona de cerca
<ul><li>    → llistes d'elements relacionats
```

### Accessibilitat

```html
<!-- Labels sempre vinculats als inputs -->
<label for="email">Email</label>
<input id="email" type="email" />

<!-- Ocultar visualment però accessible per lectors de pantalla -->
<label class="visually-hidden">Cerca alumnes</label>

<!-- Imatges decoratives → alt buit -->
<img src="/icon-search.svg" alt="" />

<!-- Imatges informatives → alt descriptiu -->
<img src="/avatar.jpg" alt="Foto de perfil de John Doe" />

<!-- Botons amb només icona → aria-label obligatori -->
<button aria-label="Tancar el menú">
  <img src="/icon-close.svg" alt="" />
</button>

<!-- Seccions múltiples → diferenciar-les -->
<section aria-label="Beneficis de la plataforma">
<section aria-labelledby="reviews-heading">
  <h2 id="reviews-heading">Testimonis</h2>
```

### aria-label: quan es posa i quan no

**ES POSA** quan l'element no té text visible que el descrigui:
- Botons amb icona
- Seccions sense heading visible
- Formularis sense títol

**NO ES POSA** quan ja hi ha text visible:
```html
<button>Apunta't ja</button>  ← el text ja descriu el botó ✅
<a href="/login">Inicia sessió</a>  ← el text ja descriu el link ✅
```

### aria-live i aria-busy

```html
<!-- aria-live: avisa el lector de pantalla quan el contingut canvia -->
<section aria-live="polite">
  <!-- Quan TypeScript injecta les dades, el lector de pantalla ho anuncia -->
</section>

<!-- aria-busy: indica que s'estan carregant dades -->
<section aria-busy="true">  ← carregant
<section aria-busy="false"> ← carregat
```

---

## 4. CSS — Estils i responsive design

### Variables CSS

Les variables permeten reutilitzar valors i canviar-los fàcilment:

```css
/* variables.css */
:root {
  --color-primary: #ce0a86;
  --color-white: #ffffff;
  --color-input-bg: #f5f5f5;
  --radius-md: 10px;
  --font-family-base: "Source Sans 3", sans-serif;
}

/* Ús a qualsevol fitxer CSS */
background-color: var(--color-primary);
border-radius: var(--radius-md);
```

### Reset CSS

El reset elimina els estils per defecte dels navegadors per partir d'una base consistent:

```css
*, *::before, *::after {
  box-sizing: border-box;  /* el padding no augmenta la mida */
  margin: 0;
  padding: 0;
}
```

### Mobile First

**Concepte clau:** primer escrius els estils per a mòbil, i després adaptes per a pantalles més grans amb media queries.

```css
/* BASE → mòbil */
.home-cards {
  grid-template-columns: 1fr 1fr;  /* 2 columnes en mòbil */
}

/* TABLET I DESKTOP → a partir de 768px */
@media (width >= 768px) {
  .home-cards {
    grid-template-columns: repeat(3, 1fr);  /* 3 columnes en desktop */
  }
}
```

### Classes utilitàries

```css
/* Accessible però invisible visualment */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}

/* Amaga completament */
.hidden { display: none !important; }

/* Mòbil i desktop */
.only-mobile { display: flex !important; }
.only-desk   { display: none !important; }

@media (width >= 768px) {
  .only-mobile { display: none !important; }
  .only-desk   { display: flex !important; }
}
```

### Flexbox vs Grid

```css
/* FLEXBOX → elements en una sola direcció (fila o columna) */
.navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;  /* espai entre elements */
  align-items: center;             /* centrar verticalment */
  gap: 1rem;                       /* espai entre fills */
}

/* GRID → graelles de dues dimensions */
.alumni-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);  /* 4 columnes iguals */
  gap: 1.5rem;
}

/* GRID auto-adaptatiu (sense media queries) */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

---

## 5. CONNEXIONS A API I RENDERITZAT

### Concepte fonamental: Què és una API?

Imagina una API com un **cambrer d'un restaurant**:
- Tu (el frontend) ets el client que demana el menjar
- L'API és el cambrer que va a la cuina i torna amb el que has demanat
- La cuina (backend/base de dades) és on s'emmagatzemen les dades reals

En aquest projecte usem **My JSON Server** com a API mock — és una API real a internet però amb dades que hem creat nosaltres.

### El flux complet, pas a pas

```
1. L'usuari obre la pàgina de networking
2. TypeScript fa una petició HTTP GET a l'API
3. L'API retorna un JSON amb els alumnes
4. TypeScript processa el JSON
5. TypeScript genera HTML amb les dades
6. TypeScript injecta l'HTML al DOM
7. L'usuari veu les targetes d'alumnes
```

### Pas 1: Definir la interfície TypeScript

Abans de fer cap crida, definim l'**estructura de les dades** que esperem rebre. Això és TypeScript — ens ajuda a detectar errors si les dades no tenen el format esperat.

```typescript
// src/types/alumni.ts
export interface Alumni {
  id: number;        // número únic
  firstName: string; // text
  lastName: string;  // text
  position: string;  // text
  company: string;   // text
  classOf: number;   // any de graduació
  location: string;  // text
}
```

**Per què és important?** Si l'API canvia i deixa de retornar `firstName`, TypeScript ens avisarà amb un error. Sense interfície, el bug podria passar desapercebut.

### Pas 2: El servei — fer la crida a l'API

El servei és el fitxer que **únicament** s'encarrega de comunicar-se amb l'API. No renderitza res, no modifica el DOM — només obté dades.

```typescript
// src/apiServices/networking/getAlumnis.ts
import type { Alumni } from "../../types/alumni";

const API_URL = "https://my-json-server.typicode.com/gemmaadev/it-academy-alumni-api/alumni";

export const getAlumnis = async (
  onError: (error: Error | unknown) => void  // funció de callback per gestionar errors
): Promise<Alumni[]> => {

  try {
    // 1. Fem la petició HTTP
    const response = await fetch(API_URL);

    // 2. Comprovem que la resposta és correcta (status 200)
    if (!response.ok) {
      throw new Error("Error al carregar els alumnes");
    }

    // 3. Convertim la resposta a JSON i la tipem com Alumni[]
    const alumni: Alumni[] = await response.json();

    // 4. Retornem les dades
    return alumni;

  } catch (error) {
    // Si qualsevol cosa falla, cridem la funció d'error
    onError(error);
    throw error; // rellancem l'error perquè el cridador també el pugui gestionar
  }
};
```

**Conceptes clau:**
- `async/await` → permet esperar respostes asíncrones sense bloquejar el navegador
- `fetch()` → fa la petició HTTP a la URL
- `response.ok` → comprova que el servidor ha respost correctament (status 200-299)
- `response.json()` → converteix la resposta de text a objecte JavaScript
- `Promise<Alumni[]>` → indica que la funció retornarà, en el futur, un array d'Alumni

**Per què el callback `onError`?**

Per evitar dependències circulars. En lloc d'importar `renderError` des del servei (que crearia un cercle d'imports), passem la funció com a paràmetre:

```typescript
// ❌ MAL — dependència circular
import { renderError } from "../../logic/networking"; // networking importa getAlumnis i getAlumnis importa networking!

// ✅ BÉ — callback com a paràmetre
export const getAlumnis = async (onError: (error: Error | unknown) => void) => { ... }

// I al cridar-la:
await getAlumnis((error) => renderError(error, "alumni-error"));
```

### Pas 3: Les funcions de renderitzat

Renderitzar significa **convertir dades en HTML visible**. Cada secció de la pàgina té la seva pròpia funció de renderitzat.

```typescript
// Variable global que guarda els alumnes per poder filtrar-los
let allAlumnis: Alumni[] = [];

function renderAlumni(alumnis: Alumni[]): void {
  // 1. Busca el contenidor al DOM
  const grid = document.getElementById("alumni-grid");
  if (!grid) return; // si no existeix, sortim

  // 2. Amaga l'estat "buit" per si estava visible
  document.getElementById("alumni-empty")?.setAttribute("hidden", "");

  // 3. Si no hi ha alumnes, mostra el missatge d'estat buit
  if (alumnis.length === 0) {
    document.getElementById("alumni-empty")?.removeAttribute("hidden");
    grid.innerHTML = "";
    return;
  }

  // 4. Genera l'HTML per a cada alumne i l'injecta
  grid.innerHTML = alumnis
    .map((alumni) => `
      <li class="alumni-card">
        <div class="alumni-card-info">
          <h3 class="alumni-card-name">${alumni.firstName} ${alumni.lastName}</h3>
          <p class="only-mobile">Class of ${alumni.classOf}</p>
          <p>${alumni.position} at ${alumni.company}</p>
          <p class="only-desk">${alumni.location}</p>
        </div>
        <img 
          src="https://ui-avatars.com/api/?name=${alumni.firstName}+${alumni.lastName}&background=ce0a86&color=fff&size=128"
          alt="${alumni.firstName} ${alumni.lastName}"
          class="alumni-card-photo only-mobile"
        />
        <button type="button" class="btn btn-primary only-desk">Message</button>
      </li>
    `)
    .join(""); // uneix tots els strings sense separadors
}
```

**Conceptes clau:**
- `document.getElementById()` → busca un element al DOM per id
- `innerHTML` → injecta HTML com a string dins d'un element
- `.map()` → transforma cada element de l'array en un string HTML
- `.join("")` → uneix tots els strings en un de sol
- Template literals (`` ` ` ``) → permeten escriure HTML multilínia amb variables `${}`

### Pas 4: Gestió d'estats

Quan fem una crida a una API, hi ha **4 estats possibles** que hem de gestionar:

```
🔄 Loading  → la petició s'està processant
✅ Success  → les dades han arribat correctament
❌ Error    → alguna cosa ha fallat
📭 Empty    → la petició ha funcionat però no hi ha dades
```

A l'HTML preparem els elements per a cada estat (tots amagats per defecte amb `hidden`):

```html
<ul id="alumni-grid"></ul>
<p id="alumni-loading" hidden>Carregant...</p>
<p id="alumni-error" hidden>Error carregant dades.</p>
<p id="alumni-empty" hidden>No s'han trobat alumnes.</p>
```

I TypeScript els mostra/amaga segons el moment:

```typescript
const getAllAlumnisAndRender = async () => {
  const loadingEl = document.getElementById("alumni-loading");
  const section = document.querySelector('[aria-labelledby="alumni-heading"]');

  // 🔄 LOADING: mostrem l'indicador de càrrega
  loadingEl?.removeAttribute("hidden");
  section?.setAttribute("aria-busy", "true");

  try {
    const alumnis = await getAlumnis((error) => renderError(error, "alumni-error"));
    allAlumnis = alumnis; // guardem per poder filtrar

    // ✅ SUCCESS: amaguem loading i renderitzem
    loadingEl?.setAttribute("hidden", "");
    section?.setAttribute("aria-busy", "false");
    renderAlumni(alumnis);

  } catch (error) {
    // ❌ ERROR: amaguem loading i mostrem error
    loadingEl?.setAttribute("hidden", "");
    section?.setAttribute("aria-busy", "false");
    renderError(error, "alumni-error");
  }
};
```

### Pas 5: La funció d'error genèrica

En lloc de tenir una funció d'error diferent per a cada secció, fem una sola funció que accepta l'id de l'element on mostrar l'error:

```typescript
export function renderError(
  error: Error | unknown,
  elementId: string = "alumni-error"  // valor per defecte
): void {
  const errorElement = document.getElementById(elementId);
  if (!errorElement) return;

  errorElement.textContent = (error as Error).message;
  errorElement.removeAttribute("hidden");
}

// Ús:
renderError(error, "alumni-error");    // error d'alumnes
renderError(error, "activity-error"); // error d'activitat
renderError(error, "jobs-error");      // error de feines
```

### Pas 6: El page setup

Cada pàgina té una funció `setup` que s'executa quan el router navega a aquella pàgina. Orquestra tot el que ha de passar:

```typescript
export async function setupNetworkingPage(): Promise<void> {
  setupHeader("networking");         // configura el header
  setupFooter("networking");         // configura el footer
  await getAllAlumnisAndRender();     // carrega i renderitza alumnes
  await getAllActivityAndRender();    // carrega i renderitza activitat
  await getAllSuggestionsAndRender(); // carrega i renderitza suggerències
  setupSearch();                      // activa la cerca
}
```

---

## 6. FILTRES

### Per què guardem les dades en una variable global?

Quan fem el fetch, les dades arriben una sola vegada. Si cada vegada que l'usuari escriu féssim un fetch nou, seria molt lent i consumiria moltes peticions a l'API.

La solució: **guardem les dades un cop i filtrem localment**.

```typescript
let allAlumnis: Alumni[] = []; // array global, accessible per totes les funcions

// Quan arriben les dades, les guardem
const alumnis = await getAlumnis(...);
allAlumnis = alumnis; // ← guardem a la "nevera"

// Quan l'usuari filtra, busquem a la "nevera" — no a l'API
const filtered = filterAlumnis(query, allAlumnis);
```

### La funció de filtratge (funció pura)

Una **funció pura** és aquella que:
- Rep uns paràmetres
- Retorna un resultat
- No modifica res extern (no toca el DOM, no fa fetch)

Això la fa fàcil de testejar.

```typescript
export function filterAlumnis(query: string, alumnis: Alumni[]): Alumni[] {
  // Si no hi ha query, retorna tots
  if (!query.trim()) return alumnis;

  return alumnis.filter((alumni) =>
    // Concatenem tots els camps cercables en un string
    `${alumni.firstName} ${alumni.lastName} ${alumni.position} ${alumni.location}`
      .toLowerCase()           // convertim a minúscules per no distingir majúscules
      .includes(query.toLowerCase()) // comprovem si conté la query
  );
}
```

**Per exemple:**
- Query: `"john"` → busca en `"john doe ceo san francisco"` → ✅ troba
- Query: `"ceo"` → busca en `"sarah smith marketing director new york"` → ❌ no troba

### Filtres combinats (múltiples filtres alhora)

Per a la borsa de treball, tenim tres filtres que s'apliquen simultàniament:

```typescript
function filterJobs(query: string, industry: string, experience: string): Job[] {
  return allJobs.filter((job) => {
    // Cada condició és independent
    const matchesQuery = `${job.title} ${job.company}`
      .toLowerCase()
      .includes(query.toLowerCase());

    // Si industry és "" (All), passa sempre
    const matchesIndustry = industry === "" || job.industry === industry;

    // Si experience és "" (All), passa sempre
    const matchesExperience = experience === "" || job.experienceLevel === experience;

    // Ha de complir les TRES condicions alhora
    return matchesQuery && matchesIndustry && matchesExperience;
  });
}
```

### Escoltar canvis en temps real

```typescript
function setupSearch(): void {
  const input = document.getElementById("alumni-search") as HTMLInputElement;
  if (!input) return;

  // "input" s'activa cada vegada que l'usuari escriu una lletra
  input.addEventListener("input", () => {
    const filtered = filterAlumnis(input.value, allAlumnis);
    renderAlumni(filtered); // re-renderitza amb els resultats filtrats
  });
}

function setupFilters(): void {
  const industrySelect = document.getElementById("industry-filter") as HTMLSelectElement;
  const experienceSelect = document.getElementById("experience-filter") as HTMLSelectElement;
  const searchInput = document.getElementById("jobs-search") as HTMLInputElement;

  const applyFilters = () => {
    const filtered = filterJobs(
      searchInput?.value || "",
      industrySelect?.value || "",
      experienceSelect?.value || ""
    );
    renderJobs(filtered);
  };

  // Escoltem canvis a tots tres elements
  searchInput?.addEventListener("input", applyFilters);
  industrySelect?.addEventListener("change", applyFilters);
  experienceSelect?.addEventListener("change", applyFilters);
}
```

---

## 7. VITEST I TESTING

### Per què fem tests?

Els tests comproven que les funcions fan el que han de fer. Si en el futur modifiquem la funció `filterAlumnis`, els tests ens avisaran si hem trencat alguna cosa.

**Regla d'or:** els tests han de ser independents de l'API, del DOM i de qualsevol factor extern. Per això usem **mocks**.

### Instal·lació

```bash
npm install -D vitest
```

```json
// package.json
"scripts": {
  "test": "vitest"
}
```

### Mocks de dades

En lloc d'usar les dades reals de l'API (que podrien canviar o estar no disponibles), creem dades de prova **controlades i predictibles**:

```typescript
// src/tests/mocks/alumni.mock.ts
import type { Alumni } from "../../types/alumni";

export const mockAlumni: Alumni[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    position: "CEO",
    company: "TechSolutions",
    classOf: 2010,
    location: "San Francisco",
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Smith",
    position: "Marketing Director",
    company: "GreenWave",
    classOf: 2015,
    location: "New York",
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    position: "CEO",
    company: "Tech Solutions",
    classOf: 2014,
    location: "Boston",
  },
];
```

**Per què 3 alumnes i no 8?** Amb 3 tenim suficient diversitat per testejar tots els escenaris i el test és més llegible.

### Estructura d'un test: Given / When / Then

Segueix el patró Gherkin:
- **Given** (donat) → la situació inicial
- **When** (quan) → l'acció que es fa
- **Then** (llavors) → el resultat esperat

```typescript
// src/tests/networking.test.ts
import { describe, it, expect } from "vitest";
import { filterAlumnis } from "../logic/networking";
import { mockAlumni } from "./mocks/alumni.mock";

describe("filterAlumnis", () => {

  // Test 1: cerca per nom
  it("should return alumni whose first name contains the query", () => {
    // Given → tenim els mocks
    // When → filtrem per "John"
    const result = filterAlumnis("John", mockAlumni);
    // Then → esperem 1 resultat amb firstName "John"
    expect(result).toHaveLength(1);
    expect(result[0].firstName).toBe("John");
  });

  // Test 2: sense resultats
  it("should return empty array when no alumni match", () => {
    const result = filterAlumnis("zzzzz", mockAlumni);
    expect(result).toHaveLength(0);
  });

  // Test 3: cerca per posició
  it("should return alumni with matching position", () => {
    const result = filterAlumnis("CEO", mockAlumni);
    expect(result).toHaveLength(2); // John i Alice són CEO
    expect(result.every(a => a.position.toLowerCase().includes("ceo"))).toBe(true);
  });

  // Test 4: cerca per ubicació
  it("should return alumni located in New York", () => {
    const result = filterAlumnis("New York", mockAlumni);
    expect(result).toHaveLength(1);
    expect(result[0].location).toBe("New York");
  });

  // Test 5: insensible a majúscules
  it("should be case insensitive", () => {
    const result = filterAlumnis("JOHN", mockAlumni);
    expect(result).toHaveLength(1);
  });

  // Test 6: query buida retorna tots
  it("should return all alumni when query is empty", () => {
    const result = filterAlumnis("", mockAlumni);
    expect(result).toHaveLength(mockAlumni.length);
  });

});
```

### Assertions més comunes

```typescript
expect(result).toHaveLength(1);          // comprova longitud
expect(result[0].firstName).toBe("John"); // comprova valor exacte
expect(result).toEqual([...]);            // comprova objecte complet
expect(result.length).toBeGreaterThan(0); // comprova que és > 0
expect(fn).toThrow();                     // comprova que llança error
expect(value).toBeTruthy();              // comprova que és truthy
expect(value).toBeFalsy();               // comprova que és falsy
```

### Gherkin (.feature)

Els fitxers `.feature` descriuen el comportament en llenguatge natural. Serveixen com a documentació viva del projecte:

```gherkin
# src/tests/networking.feature

Feature: Alumni Search
  As an alumni
  I want to search for other members
  So that I can connect with profiles with common interests

  Background:
    Given I am on the networking page
    And the alumni list has loaded successfully

  Scenario: Search by first name
    When I type "John" in the search field
    Then I see alumni whose name contains "John"
    And the results update in real time

  Scenario: No results found
    When I type "zzzzz" in the search field
    Then I see the message "No s'han trobat alumnes"
    And the alumni grid is empty

  Scenario: Clear search
    Given I have typed "John" in the search field
    When I clear the search field
    Then I see all alumni again
```

### Executar tests

```bash
npm run test           # mode watch (s'executa cada vegada que guardes)
npm run test -- --run  # executa una sola vegada i surt
```

---

## 8. MODULARITZACIÓ I SEPARACIÓ DE RESPONSABILITATS

### Principi fonamental

**Cada fitxer ha de tenir una sola responsabilitat.**

Si un fitxer fa massa coses, és difícil de mantenir, testejar i entendre.

### Estructura del projecte i per què

```
src/
├── apiServices/       → NOMÉS crides HTTP a l'API externa
│   ├── networking/
│   │   ├── getAlumnis.ts    → fetch d'alumnes
│   │   └── getActivity.ts   → fetch d'activitat
│   └── jobs/
│       └── getJobs.ts       → fetch de feines
│
├── logic/             → NOMÉS lògica de cada pàgina
│   ├── networking.ts  → render, filtres i setup de networking
│   ├── job-opportunities.ts
│   ├── header.ts      → gestió del header
│   ├── footer.ts      → gestió del footer
│   └── bottom-nav.ts  → gestió del bottom nav
│
├── types/             → NOMÉS interfícies TypeScript
│   ├── alumni.ts
│   ├── job.ts
│   └── activity.ts
│
├── components/        → NOMÉS HTML compartit entre pàgines
│   ├── header.html
│   ├── footer.html
│   └── bottom-nav.html
│
├── pages/             → NOMÉS HTML de cada pàgina
│   ├── home.html
│   ├── networking.html
│   └── job-opportunities.html
│
├── styles/            → NOMÉS CSS
│   ├── variables.css
│   ├── global.css
│   ├── buttons.css
│   └── networking.css
│
└── tests/             → NOMÉS tests
    ├── networking.test.ts
    ├── networking.feature
    └── mocks/
        └── alumni.mock.ts
```

### Evitar dependències circulars

Una **dependència circular** és quan el fitxer A importa el fitxer B i el fitxer B importa el fitxer A. Causa errors difícils de detectar.

```
❌ CIRCULAR:
networking.ts → importa → getAlumnis.ts
getAlumnis.ts → importa → networking.ts  ← CERCLE!
```

**Solució: passar funcions com a paràmetres (callback)**

```typescript
// En lloc d'importar renderError al servei...
// ❌ MAL
import { renderError } from "../../logic/networking";

// ✅ BÉ — la funció es passa com a paràmetre
export const getAlumnis = async (
  onError: (error: Error | unknown) => void
): Promise<Alumni[]> => {
  // Si hi ha error, cridem la funció que ens han passat
  onError(error);
}

// I al cridar-la, passem renderError
await getAlumnis((error) => renderError(error, "alumni-error"));
```

### Components reutilitzables CSS

En lloc de repetir estils, creem classes globals reutilitzables:

```css
/* buttons.css — disponible a totes les pàgines */
.btn { display: inline-flex; padding: 0.75rem 1.5rem; ... }
.btn-primary { background: var(--color-primary); color: white; }
.btn-secondary { border: 1px solid var(--color-primary); color: var(--color-primary); }
.btn-gradient { background: var(--background-gradient); color: white; }
```

```html
<!-- Ús a qualsevol pàgina -->
<button class="btn btn-primary">Apply Now</button>
<a class="btn btn-secondary" href="/networking">Explore</a>
```

---

## 9. SPA ROUTER

### Concepte: SPA vs Web tradicional

**Web tradicional:** cada vegada que cliques un link, el navegador carrega una pàgina nova completa. Lent i amb parpelleig.

**SPA (Single Page Application):** el navegador carrega una sola vegada. La navegació és gestionada per JavaScript — només canvia el contingut del `#app`, no tota la pàgina.

### Com funciona el nostre router

```
1. L'usuari clica <a href="/networking">
2. El router intercepta el click (event.preventDefault())
3. Actualitza la URL sense recarregar (history.pushState)
4. Fa fetch del fitxer networking.html
5. Injecta el HTML al #app
6. Executa setupNetworkingPage()
7. L'usuari veu la pàgina de networking
```

### Flux en codi

```typescript
// router.ts

// 1. Interceptar clicks als links
document.addEventListener("click", (event) => {
  const link = (event.target as HTMLElement).closest("a");
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href || href.startsWith("http") || href.startsWith("#")) return;

  event.preventDefault(); // evita la recàrrega
  navigate(href);          // navegació SPA
});

// 2. Navegar a una ruta
async function navigate(path: string): Promise<void> {
  const route = findRoute(path);

  // Actualitza la URL
  window.history.pushState({}, "", path);

  // Carrega el HTML
  await loadPage(route.file, route);
}

// 3. Carregar el HTML i executar el setup
async function loadPage(filePath: string, route: Route): Promise<void> {
  const response = await fetch(filePath);
  const html = await response.text();

  document.getElementById("app")!.innerHTML = html;

  // Executa el setup de la pàgina
  if (route.script && window.pageSetups[route.script]) {
    window.pageSetups[route.script]();
  }

  // Actualitza el header i bottom-nav
  setupHeader(route.script || "");
  setupBottomNav(route.script || "");
}
```

### window.pageSetups

Un objecte global que registra les funcions de setup de cada pàgina:

```typescript
// main.ts
window.pageSetups = {
  home: setupHomePage,
  networking: setupNetworkingPage,
  "job-opportunities": setupJobOpportunitiesPage,
  login: setupLoginPage,
  "splash-page": setupSplashPage,
};
```

Quan el router navega a `/networking`, busca `window.pageSetups["networking"]` i l'executa.

### Redirecció per device

A la pantalla inicial, redirigim segons si és mòbil o desktop:

```typescript
const isMobile = window.innerWidth < 768;

if (window.location.pathname === "/") {
  window.location.replace(isMobile ? "/splash-page" : "/home");
}
```

---

## RESUM DE CONCEPTES CLAU

| Concepte | Què és | Per a qué serveix |
|----------|--------|-------------------|
| `async/await` | Sintaxi per esperar promeses | Fer crides a API sense bloquejar |
| `fetch()` | Funció nativa del navegador | Fer peticions HTTP |
| `Promise<T>` | Valor que arribarà en el futur | Tipar funcions asíncrones |
| `innerHTML` | Propietat del DOM | Injectar HTML dinàmicament |
| `.map()` | Mètode d'array | Transformar cada element |
| `.filter()` | Mètode d'array | Filtrar elements per condició |
| `.join("")` | Mètode d'array | Unir strings |
| `getElementById` | Mètode del DOM | Buscar element per id |
| `addEventListener` | Mètode del DOM | Escoltar events |
| `hidden` | Atribut HTML | Amagar element |
| `aria-busy` | Atribut ARIA | Indicar que s'estan carregant dades |
| `interface` | TypeScript | Definir l'estructura d'un objecte |
| `export/import` | ES Modules | Compartir codi entre fitxers |

---

*Informe elaborat a partir del projecte IT Academy Alumni Platform · Gemma Maeso*
