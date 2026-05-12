## **Configurar Jest i Vitest amb TypeScript**

**Jest Documentation**  
Framework de testing en JS amb enfocament senzill i ràpid per a projectes React i Node.  
[https://jestjs.io/](https://jestjs.io/)

**Vitest Documentation**  
Eina de testing ultraràpida, compatible amb Vite i enfocada al desenvolupament modern en JS.  
[https://vitest.dev/](https://vitest.dev/)

**Jest vs. Vitest: la decisió prèvia**

Jest no ve amb un pre-processador integrat. Hauràs d'instal·lar-ne un i dir-li que l'usi. Per a TypeScript, normalment serà `ts-jest`. Vitest no necessita configuració per a la majoria de projectes moderns. Suporta TypeScript i ESM de sèrie. Ve inclòs amb Vite.

La regla pràctica: si el projecte usa **Vite** (React, Vue, Svelte moderns) → **Vitest**. Si és un projecte **Node.js** o hereu → **Jest**. L'API és gairebé idèntica: `describe`, `it`, `expect`, `beforeEach`... funcionen igual en tots dos.

**Configuració de Jest amb TypeScript**

### **Instal·lació**

| npm install \--save-dev jest typescript ts-jest @types/jest |
| :---- |

* `jest` — el framework de testing  
* `ts-jest` — el pre-processador que transforma TypeScript a JavaScript per a Jest  
* `@types/jest` — les definicions de tipus per a `describe`, `it`, `expect`...

### **`jest.config.ts`**

| // jest.config.tsimport type { Config } from 'jest';const config: Config \= {  preset: 'ts-jest',         // usa ts-jest per compilar TypeScript  testEnvironment: 'node',   // o 'jsdom' per a tests de frontend/DOM  roots: \['\<rootDir\>/src'\],  // on buscar els tests  testMatch: \[    '\*\*/\_\_tests\_\_/\*\*/\*.ts',  // fitxers dins d'una carpeta \_\_tests\_\_    '\*\*/\*.test.ts',           // fitxers amb extensió .test.ts    '\*\*/\*.spec.ts',           // fitxers amb extensió .spec.ts  \],  moduleNameMapper: {    // Si uses path aliases al tsconfig (ex: @/components/...)    '^@/(.\*)$': '\<rootDir\>/src/$1',  },  coverageDirectory: 'coverage',  collectCoverageFrom: \['src/\*\*/\*.ts', '\!src/\*\*/\*.d.ts'\],};export default config; |
| :---- |

### **Ajustar `tsconfig.json` per a Jest**

| {  "compilerOptions": {    "target": "ES2022",    "module": "CommonJS",     // ← Jest usa CommonJS per defecte    "strict": true,    "esModuleInterop": true,    "skipLibCheck": true,    "types": \["jest"\]         // ← inclou els tipus de Jest globalment  },  "include": \["src", "jest.config.ts"\]} |
| :---- |

### **Scripts al `package.json`**

| {  "scripts": {    "test":          "jest",    "test:watch":    "jest \--watch",    "test:coverage": "jest \--coverage",    "test:ci":       "jest \--ci \--coverage \--watchAll=false"  }} |
| :---- |

### **Estructura de fitxers amb Jest**

| src/├── utils/│   ├── calculs.ts│   └── calculs.test.ts      ← test al costat del fitxer├── services/│   ├── usuari.service.ts│   └── \_\_tests\_\_/           ← o en carpeta \_\_tests\_\_│       └── usuari.service.test.ts |
| :---- |

**Configuració de Vitest amb TypeScript**

Vitest brilla quan es combina amb Vite, ja que simplifica enormement la configuració del projecte i fa que les coses funcionin molt més suaument.

### **Instal·lació (projecte Vite existent)**

| npm install \--save-dev vitest\# Per a tests de frontend amb DOM:npm install \--save-dev jsdom @testing-library/jest-dom |
| :---- |

### **Afegir Vitest a `vite.config.ts`**

| /// \<reference types="vitest" /\>  // ← necessari per a TSimport { defineConfig } from 'vite';import react from '@vitejs/plugin-react';export default defineConfig({  plugins: \[react()\],  test: {    globals: true,              // desc, it, expect disponibles sense import    environment: 'jsdom',       // simula el DOM del navegador    setupFiles: \['src/tests/setup.ts'\],  // fitxer d'inicialització    include: \['src/\*\*/\*.{test,spec}.{ts,tsx}'\],    coverage: {      reporter: \['text', 'html'\],      include: \['src/\*\*/\*.ts'\],    },  },}); |
| :---- |

### **Alternativa: fitxer `vitest.config.ts` separat**

| // vitest.config.ts (si vols separar config de Vite i Vitest)import { defineConfig } from 'vitest/config';export default defineConfig({  test: {    globals: true,    environment: 'jsdom',    setupFiles: \['src/tests/setup.ts'\],  },}); |
| :---- |

### **`tsconfig.json` per a Vitest**

| {  "compilerOptions": {    "target": "ES2020",    "module": "ESNext",         // ← Vitest usa ESM natiu    "moduleResolution": "bundler",    "strict": true,    "jsx": "react-jsx",    "types": \["vitest/globals"\] // ← inclou els tipus de Vitest globalment  },  "include": \["src"\]} |
| :---- |

### **Scripts al `package.json`**

| {  "scripts": {    "test":          "vitest",    "test:run":      "vitest run",         // executa una sola vegada (per a CI)    "test:coverage": "vitest run \--coverage",    "test:ui":       "vitest \--ui"         // interfície gràfica al navegador  }} |
| :---- |

**El primer test: idèntic en tots dos frameworks**

Un cop configurats, l'API de tests és pràcticament la mateixa:

| // src/utils/calculs.test.ts (funciona tant per Jest com Vitest)// Si globals: true, no cal importar res// Si no, cal: import { describe, it, expect } from 'vitest'// o: import { describe, it, expect } from '@jest/globals'describe('calcularIVA', () \=\> {  it('aplica el 21% sobre el preu base', () \=\> {    const resultat \= calcularIVA(100);    expect(resultat).toBe(121);  });  it('retorna 0 per a un preu de 0', () \=\> {    expect(calcularIVA(0)).toBe(0);  });  it('accepta decimals correctament', () \=\> {    expect(calcularIVA(10.50)).toBeCloseTo(12.705);  });});// La funció que testegemfunction calcularIVA(preu: number): number {  return preu \* 1.21;} |
| :---- |

**Per a React: afegir React Testing Library**

| \# Per a Vitest \+ Reactnpm install \--save-dev @testing-library/react @testing-library/user-event @testing-library/jest-dom\# Per a Jest \+ Reactnpm install \--save-dev @testing-library/react @testing-library/user-event @testing-library/jest-dom babel-jest |
| :---- |

**Fitxer de setup comú:**

| // src/tests/setup.tsimport '@testing-library/jest-dom';  // afegeix matchers com .toBeInTheDocument() |
| :---- |

**Test d'un component React:**

| // src/components/Boto.test.tsximport { render, screen } from '@testing-library/react';import userEvent from '@testing-library/user-event';import { Boto } from './Boto';describe('Boto', () \=\> {  it('mostra el text correctament', () \=\> {    render(\<Boto\>Enviar\</Boto\>);    expect(screen.getByText('Enviar')).toBeInTheDocument();  });  it('crida onClick quan es clica', async () \=\> {    const mockClick \= vi.fn();  // vi.fn() en Vitest / jest.fn() en Jest    render(\<Boto onClick={mockClick}\>Enviar\</Boto\>);    await userEvent.click(screen.getByText('Enviar'));    expect(mockClick).toHaveBeenCalledTimes(1);  });}); |
| :---- |

**Comparativa final: Jest vs. Vitest**

|  | Jest | Vitest |
| ----- | ----- | ----- |
| **Velocitat** | Bona | Molt millor (Vite HMR) |
| **TypeScript** | Cal `ts-jest` | Integrat de sèrie |
| **ESM** | Complicat | Natiu |
| **Configuració** | Fitxer `jest.config.ts` | Al `vite.config.ts` |
| **API** | Original | Compatible Jest (quasi idèntica) |
| **Maduresa** | Molt madura (Meta) | Creixent ràpidament (Vite team) |
| **Ideal per a** | Node.js, projectes legacy | Projectes Vite/React/Vue moderns |
| **UI** | No integrada | `vitest --ui` |

