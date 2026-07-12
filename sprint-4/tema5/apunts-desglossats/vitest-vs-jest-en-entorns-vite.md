**Com millora Vitest l'experiència de testing respecte a Jest en entorns Vite?**

## **El context: per què va néixer Vitest**

Jest va ser creat per Meta el 2014, abans que TypeScript, ESM i Vite existissin com a estàndards. 

Vitest va néixer el 2021 per resoldre les limitacions fonamentals de Jest en el món modern de JavaScript. 

Si la teva app és construïda amb Vite, tenir dues pipelines de configuració i manteniment separades (una per a Vite i una altra per a Jest) no està justificat. 

Amb Vitest defines la configuració per als entorns de dev, build i test com una sola pipeline, compartint els mateixos plugins i el mateix `vite.config.ts`.

El 2026, Vitest ha superat Jest en el rànquing de satisfacció de l'enquesta State of JS 2024, i Angular 21 ha adoptat Vitest com a test runner per defecte substituint Karma. Vitest ha crescut de menys de 4 milions de descàrregues setmanals el 2023 a més de 40 milions el 2026, mentre Jest es manté estable al voltant de 36 milions.

**Avantatge 1: Velocitat — els números reals**

Benchmarks publicats mostren que Vitest ofereix cold starts 5.6x més ràpids (38 segons vs 214 segons per a una suite gran) i watch mode 28x més ràpid (0.3 segons vs 8.4 segons) comparats amb Jest 30\. La diferència de memòria és del 57% menys de pic de memòria.

La velocitat prové de tres fonts:

| FONT 1: sense Babel  Jest → usa Babel o ts-jest per compilar TypeScript/JSX → overhead  Vitest → usa esbuild de Vite per stripping de tipus → instantFONT 2: Watch mode intel·ligent  Jest → re-executa per patrons de canvi de fitxer → lent a iniciar  Vitest → usa el graph de mòduls de Vite → sap EXACTAMENT quins           tests es veuen afectats per un canvi → re-executa únicament els necessarisFONT 3: Workers eficients  Vitest → pool de worker threads més eficient per a tests en paral·lel |
| :---- |

**Avantatge 2: Zero configuració per a TypeScript i ESM**

Jest va ser construït al voltant de CommonJS el 2014, de manera que el suport ESM requereix configuració extra. 

Fins i tot amb configuració, a vegades es troben errors `SyntaxError: Cannot use import statement outside a module` en afegir dependències ESM-only. 

Vitest és construït sobre ESM, de manera que no cal tractar amb flags experimentals, transformadors i configuració addicional. El teu entorn de test coincideix amb el teu entorn de build.

| // ❌ Jest \+ TypeScript \+ ESM: configuració complexa necessària// package.json{  "jest": {    "preset": "ts-jest",    "testEnvironment": "jsdom",    "transform": {      "^.+\\\\.(ts|tsx)$": "ts-jest"    },    "moduleNameMapper": {      "^@/(.\*)$": "\<rootDir\>/src/$1"  // ← path aliases manuals    },    "extensionsToTreatAsEsm": \[".ts"\],    "globals": {      "ts-jest": {        "useESM": true      }    }  }}// → Dependències addicionals: ts-jest, babel-jest, @babel/preset-typescript...// ✅ Vitest: la configuració existeix al vite.config.ts// vite.config.ts \-- la mateixa config del dev server, estesa per a tests\!import { defineConfig } from 'vite';import react from '@vitejs/plugin-react';export default defineConfig({  plugins: \[react()\],  resolve: {    alias: { '@': '/src' }  // ← path alias compartit: funciona al dev I als tests  },  test: {    environment: 'jsdom',    globals: true,    setupFiles: \['./src/setupTests.ts'\],  },});// → TypeScript, JSX, path aliases: tot funciona sense cap dependència extra |
| :---- |

**Avantatge 3: Una sola Pipeline — Config compartida**

Si la teva app principal és construïda amb Vite, usar Vitest és una decisió òbvia. Quan configures una app amb Vite, tens un `vite.config.ts` amb path aliases, configuració de TypeScript, etc. I pots usar aquesta mateixa config (amb petits ajustos) per als teus tests. Allò que funciona al teu test, la mateixa config s'usa per a l'app real, el que significa que estàs testejant un entorn molt realista.

| Jest (dues pipelines separades):  vite.config.ts  → configuració del dev server i build  jest.config.js  → configuració SEPARADA i duplicada per als tests  babel.config.js → transformació per a Jest  → Quan actualitzes un path alias a Vite → has d'actualitzar-lo    TAMBÉ al jest.config.js manualmentVitest (una sola pipeline):  vite.config.ts  → configura DEV \+ BUILD \+ TESTS  → Quan actualitzes un path alias → funciona automàticament als tests  → Plugins de Vite (SVG, MDX, etc.) funcionen als tests sense extra config |
| :---- |

**Avantatge 4: API compatible amb Jest → Migració fàcil**

Vitest ofereix compatibilitat amb la majoria de l'API de Jest i les biblioteques de l'ecosistema, de manera que en la majoria de projectes pot ser un substitut directe (drop-in replacement) per a Jest.

| // La majoria del codi de test és IDÈNTIC// L'única diferència: jest. → vi.// JEST:import { jest } from '@jest/globals';const mockFn \= jest.fn();jest.spyOn(object, 'method');jest.mock('./module');// VITEST: (mateixa sintaxi, diferent prefix)import { vi } from 'vitest';const mockFn \= vi.fn();vi.spyOn(object, 'method');vi.mock('./module');// describe, test, it, expect, beforeEach, afterEach...// → EXACTAMENT IGUALS en ambdós frameworks\! |
| :---- |

**Avantatge 5: Watch mode amb HMR**

El watch mode de Vitest usa el Hot Module Replacement de Vite per re-executar únicament els tests afectats per un canvi, sovint en menys d'un segon.

Flux de canvi en Watch Mode:

JEST:  
  Modifiques un fitxer → Jest recalcula quins tests re-executar  
  (basant-se en patrons de fitxer) → re-executa tot el test suite afectat  
  → 8.4 segons per a una suite gran

VITEST:  
  Modifiques un fitxer → Vite coneix el graph de mòduls complet →  
  sap EXACTAMENT quins tests importen aquest fitxer →  
  re-executa ÚNICAMENT aquells tests  
  → 0.3 segons per a la mateixa suite

En la pràctica:  
  → Vitest et dona feedback en menys d'un segon mentre escrius codi  
  → En lloc de batxejar les execucions dels tests, pots executar-los contínuament  
  → La sensació és similar a HMR en el navegador: instantani

**La configuració i instal·lació completes**

| \# En un projecte Vite \+ React existent:npm install \--save-dev vitest @testing-library/react @testing-library/user-eventnpm install \--save-dev @testing-library/jest-dom jsdom |
| :---- |

| // vite.config.tsimport { defineConfig } from 'vite';import react from '@vitejs/plugin-react';export default defineConfig({  plugins: \[react()\],  test: {    globals: true,          // → describe, test, expect globals (sense imports)    environment: 'jsdom',   // → simula el DOM del browser    setupFiles: \['./src/setupTests.ts'\],    coverage: {      provider: 'v8',       // → més ràpid que Istanbul      reporter: \['text', 'html'\],    },  },});// src/setupTests.tsimport '@testing-library/jest-dom';// → matchers addicionals: toBeInTheDocument, toBeVisible, toHaveValue... |
| :---- |

| // package.json \-- scripts{  "scripts": {    "test": "vitest",    "test:ui": "vitest \--ui",       // ← UI visual per als tests (exclusiu de Vitest\!)    "test:run": "vitest run",        // ← execució única (CI)    "coverage": "vitest run \--coverage"  }} |
| :---- |

| // Exemple de test amb Vitest \+ RTL (sintaxi idèntica a Jest)import { describe, test, expect } from 'vitest'; // ← o globals: trueimport { render, screen } from '@testing-library/react';import userEvent from '@testing-library/user-event';import Comptador from './Comptador';describe('Comptador', () \=\> {  test('incrementa el compte quan l\\'usuari clica el botó', async () \=\> {    const user \= userEvent.setup();    render(\<Comptador /\>);    expect(screen.getByText('Clics: 0')).toBeVisible();    await user.click(screen.getByRole('button', { name: /incrementa/i }));    expect(screen.getByText('Clics: 1')).toBeVisible();  });}); |
| :---- |

**Vitest UI: funcionalitat exclusiva**

Vitest 4 és estable i llest per a producció, amb snapshot support, APIs de mocking que reflecteixen Jest quasi exactament, browser mode estable (l'etiqueta experimental va ser eliminada al 4.0), `toMatchScreenshot()` per a regression visual, suport de Playwright Traces, i un coverage provider que usa Istanbul o V8.

| npm install \--save-dev @vitest/ui\# Vitest UI: una interfície web visual per als testsvitest \--ui\# → Obre un dashboard al browser amb:\#    \- Estat de tots els tests (pass/fail)\#    \- Arbre de tests navegable\#    \- Output dels tests\#    \- Cobertura visual\#    \- Re-execució de tests individuals\# → Exclusiu de Vitest, Jest no té equivalent |
| :---- |

**Quan usar Jest vs. Vitest el 2026**

✅ VITEST (recomanat per a projectes nous):  
  → Projecte Vite \+ React → decisió òbvia  
  → TypeScript-first  
  → Vols velocitat i DX moderna  
  → Projecte nou sense deute de configuració  
  → Nuxt, SvelteKit, Astro, Remix on Vite

✅ JEST (casos justificats):  
  → React Native (Vitest no suporta RN)  
  → Codebase gran i estable amb centenars de plugins Jest específics  
  → Equip amb molt coneixement i inversió en Jest  
  → Legacy webpack (no Vite)  
  → Quan la migració tindria risc alt

La realitat 2026:  
  Vitest supera Jest en satisfacció (State of JS 2024\)  
  Angular 21 ha adoptat Vitest per defecte  
  Per a projectes nous amb Vite → Vitest és l'elecció correcta

**Resum**

| Aspecte | Jest | Vitest |
| ----- | ----- | ----- |
| **Cold start** | \~214s (suite gran) | \~38s (**5.6x més ràpid**) |
| **Watch mode** | \~8.4s per re-execució | \~0.3s (**28x més ràpid**) |
| **Memòria** | Alta | 57% menys |
| **TypeScript** | ⚠️ Requereix ts-jest | ✅ Natiu (esbuild) |
| **ESM** | ⚠️ Flags experimentals | ✅ Natiu per defecte |
| **Config Vite** | ❌ Duplicada | ✅ Compartida |
| **Path aliases** | ❌ Configuració manual | ✅ Automàtic des de vite.config |
| **API** | Original Jest | ✅ Compatible Jest (vi.→jest.) |
| **Browser mode** | ❌ No | ✅ Via Playwright (v4.0) |
| **UI visual** | ❌ No | ✅ `@vitest/ui` |
| **React Native** | ✅ | ❌ No suportat |
| **Maduresa** | ✅ 11 anys | 🟡 3 anys (estable) |
| **2026 tendència** | ↔ Estable | ↑ Dominant |

