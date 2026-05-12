## **Informes de cobertura de codi (Code Coverage)**

**Què és la cobertura de codi**

La cobertura de codi de la teva aplicació és quin percentatge del codi està cobert actualment per tests unitaris. Quan executes els tests amb el flag `--coverage`, Jest (o Vitest) mira com d'bé s'està testejant el teu codi i crea un informe de cobertura.

La cobertura no mesura la qualitat dels tests, sinó la **quantitat de codi que els tests exerciten**. Un test que crida una funció però no verifica el resultat pot tenir un 100% de cobertura amb tests inútils. Per tant, la cobertura és una mètrica orientativa, no una garantia de qualitat.

**Les quatre mètriques de cobertura**

En l'informe de cobertura de Jest, trobaràs quatre tipus clau de cobertura: 

**Statements Coverage** mostra el percentatge de statements executables del codi que han estat testejats. Per exemple, si una funció té 10 statements i 8 han estat testejats, la cobertura de statements és un 80%. 

**Branches Coverage** mesura el percentatge de branques del codi, com les d'instruccions `if`, `else`, o `switch`.

Les quatre mètriques i què mesura cadascuna:

| function calcularDescompte(preu: number, usuari: { premium: boolean }): number {  // Statement coverage: ha s'executat aquesta línia?  const base \= preu;  // Branch coverage: s'han provat els dos camins (if i else)?  if (usuari.premium) {          // ← branca 1    return base \* 0.9;  } else {                        // ← branca 2    return base;  }}function calcularPreu(producte: Producte): number {  // Function coverage: s'ha cridat aquesta funció en algun test?  return producte.preu \* producte.quantitat;}// Line coverage: s'ha executat cadascuna d'aquestes línies?const config \= { iva: 0.21 };const total \= calcularPreu(producte) \* (1 \+ config.iva); |
| :---- |

| Mètrica | Mesura |
| ----- | ----- |
| **Statements** | Percentatge de statements executats |
| **Branches** | Percentatge de branques (`if`/`else`, `switch`) recorregudes |
| **Functions** | Percentatge de funcions que han estat cridades |
| **Lines** | Percentatge de línies de codi executades |

**Generar la cobertura amb Jest**

| \# Una sola execució amb informe a la terminalnpm test \-- \--coverage\# O si tens el script al package.json:npm run test:coverage |
| :---- |

La sortida a la terminal:

| \--------------------------|---------|----------|---------|---------|File                      | % Stmts | % Branch | % Funcs | % Lines |\--------------------------|---------|----------|---------|---------|All files                 |   85.71 |    66.67 |     100 |   85.71 | src/utils                |         |          |         |         |  calculs.ts              |   85.71 |    66.67 |     100 |   85.71 |\--------------------------|---------|----------|---------|---------| |
| :---- |

Quan mires la taula de resum, pot ser molt difícil determinar on et manca cobertura. També pots generar un informe de cobertura en HTML.

**Configuració al `jest.config.ts`:**

| import type { Config } from 'jest';const config: Config \= {  preset: 'ts-jest',  testEnvironment: 'node',  collectCoverage: true,  coverageDirectory: 'coverage',  coverageReporters: \['text', 'html', 'lcov'\],  // text: terminal, html: navegador  collectCoverageFrom: \[    'src/\*\*/\*.ts',        // inclou tots els fitxers .ts    '\!src/\*\*/\*.d.ts',     // exclou fitxers de declaració    '\!src/\*\*/\*.test.ts',  // exclou els propis tests    '\!src/index.ts',      // exclou el punt d'entrada si és necessari  \],  // Llindars mínims: el build falla si no s'assoleixen  coverageThreshold: {    global: {      statements: 80,      branches: 75,      functions: 90,      lines: 80,    },  },};export default config; |
| :---- |

**Generar la cobertura amb Vitest**

| \# Instal·lar el proveïdor de coberturanpm install \--save-dev @vitest/coverage-v8 |
| :---- |

Pots comprovar el teu informe de cobertura a Vitest UI i HTML reporter. Això està integrat amb els reporters de cobertura integrats amb sortida HTML.

**Configuració al `vite.config.ts`:**

| /// \<reference types="vitest" /\>import { defineConfig } from 'vite';export default defineConfig({  test: {    globals: true,    environment: 'jsdom',    coverage: {      provider: 'v8',                        // o 'istanbul'      reporter: \['text', 'html', 'lcov'\],    // formats de sortida      reportsDirectory: './coverage',      include: \['src/\*\*/\*.ts', 'src/\*\*/\*.tsx'\],      exclude: \['src/\*\*/\*.test.ts', 'src/\*\*/\*.spec.ts', 'src/\*\*/\*.d.ts'\],      // Llindars mínims      thresholds: {        statements: 80,        branches: 75,        functions: 90,        lines: 80,      },    },  },}); |
| :---- |

| \# Executar amb coberturanpm run test:coverage    \# equivalent a: vitest run \--coverage |
| :---- |

**Llegir l'informe HTML**

Obre el fitxer `lcov-report/index.html` a la carpeta de cobertura. Veuràs línies ressaltades en vermell. Aquestes son les línies que no estan cobertes pels tests unitaris.

L'estructura de la carpeta generada:

| coverage/├── index.html         ← pàgina principal amb resum per fitxer├── lcov.info          ← format LCOV per a eines externes (CI/CD, IDE)└── lcov-report/    ├── index.html     ← resum navegable    └── src/        └── utils/            └── calculs.ts.html  ← vista per fitxer amb línies colors |
| :---- |

Les línies en el HTML usen colors per comunicar la cobertura:

* **🟢 Verd** — línia executada pels tests  
* **🔴 Vermell** — línia mai executada  
* **🟡 Groc** — branca parcialment coberta (un camí de l'`if` sí, l'altre no)

**Integrar la cobertura al CI/CD**

La cobertura és especialment útil al pipeline CI/CD per garantir que el codi nou no redueix la cobertura existent:

| \# .github/workflows/ci.ymlname: Tests i Coberturaon:  push:    branches: \[main\]  pull\_request:    branches: \[main\]jobs:  test:    runs-on: ubuntu-latest    steps:      \- uses: actions/checkout@v4      \- uses: actions/setup-node@v4        with:          node-version: '20'          cache: 'npm'      \- run: npm ci      \- run: npm run test:coverage      \# Arxivar el report HTML com a artefacte descàrregable      \- uses: actions/upload-artifact@v4        if: always()        with:          name: coverage-report          path: coverage/ |
| :---- |

**La cobertura al VS Code: gutter indicators**

La majoria dels IDEs populars poden obrir informes de cobertura. VS Code i WebStorm suporten el format LCOV, de manera que assegura't que configures el teu test runner per generar informes de cobertura amb LCOV.

Amb l'extensió **Coverage Gutters** per a VS Code i el fitxer `lcov.info` generat, pots veure la cobertura directament a l'editor sense obrir cap fitxer HTML: línies verdes o vermelles apareixen al gutter esquerre mentre edites.

**La regla sobre el 100% de cobertura**

Una cobertura del 100% no garanteix que el codi sigui correcte: garanteix únicament que tots els camins s'han executat. Un test que no verifica res pot donar un 100% de cobertura amb zero valor real.

La distribució recomanada per a la majoria de projectes: apunta a un 80% de cobertura global com a objectiu inicial. El 100% és rarament assolible ni desitjable (dificulta el refactoring i pot crear tests fràgils). Centra la cobertura en la lògica de negoci crítica i en les funcions que han tingut bugs en el passat.

**Resum**

| \# Jest: executar amb coberturanpm test \-- \--coverage\# Vitest: executar amb coberturavitest run \--coverage\# Resultat generat:coverage/  index.html      ← obre al navegador per veure el detall  lcov.info       ← per a VS Code, CI/CD i Codecov |
| :---- |

| Mètrica | Quin % és bo? |
| ----- | ----- |
| **Statements** | ≥ 80% |
| **Branches** | ≥ 75% (les branques son difícils de cobrir totes) |
| **Functions** | ≥ 90% (tota funció hauria de tenir almenys un test) |
| **Lines** | ≥ 80% |

