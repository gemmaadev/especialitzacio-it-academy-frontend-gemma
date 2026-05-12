### **Apunts T8 — Fonaments de proves i TDD en TypeScript**

## **1\. Per què provar: els avantatges de les proves automatitzades**

El testing automatitzat transforma la manera de desenvolupar. En lloc de descobrir bugs quan un usuari els reporta, els descobreixes mentre escrius el codi. El cost d'un bug creix exponencialment: 5 minuts si el detecta el test, hores si el detecta en staging, dies si arriba a producció.

1. **Detecció primerenca** — cada test és una trampa per a bugs futurs. Un canvi nou que trenca alguna cosa existent falla immediatament al CI/CD, no quan un usuari clica.  
2. **Confiança per refactoritzar** — sense tests, canviar codi existent és arriscat. Amb tests, refactoritzar és segur: executes la suite i saps immediatament si has trencat alguna cosa.  
3. **Documentació viva** — els tests expliquen quèfa el codi sempre actualitzats, a diferència dels comentaris que es desactualitzen. Un test ben escrit és la millor especificació d'una funció.  
4. **Millor disseny** — el codi difícil de testar és codi mal dissenyat. Si necessites instanciar 10 objectes per provar una funció, és senyal que la funció fa massa coses.

**2\. La piràmide de tests: quants de cada tipus**

La piràmide de Martin Fowler i Ham Vocke defineix la proporció correcta de cada tipus de test:

|         /E2E\\          ← 10% \-- pocs, lents, molt valor per a l'usuari       /──────\\      / Integr.\\       ← 20% \-- alguns, velocitat mitja     /──────────\\    /  Unitaris  \\     ← 70% \-- molts, ràpids, base de tot   /\_\_\_\_\_\_\_\_\_\_\_\_\_\_\\ |
| :---- |

L'antipatró és el **con de gelat**: massa tests manuals i E2E a dalt, pocs unitaris a baix. Resulta en una suite lenta, fràgil i cara de mantenir.

**3\. Tests Unitaris: la base**

Un test unitari prova **una sola funció o classe completament aïllada** de les seves dependències. Les dependències externes s'imiten (mock). Resultat: execució en mil·lisegons, determinista, independent.

| // Estructura AAA: Arrange → Act → Assertdescribe('calcularDescompte', () \=\> {  it('quan l\\'usuari és premium, aplica un 10% de descompte', () \=\> {    // Arrange    const preu \= 100;    const usuari \= { premium: true };    // Act    const resultat \= calcularDescompte(preu, usuari);    // Assert    expect(resultat).toBe(90);  });  it('quan l\\'usuari no és premium, no aplica descompte', () \=\> {    expect(calcularDescompte(100, { premium: false })).toBe(100);  });}); |
| :---- |

El patró **AAA** (Arrange, Act, Assert) garanteix que el lector entén el test sense esforç mental. Seguir-lo fa que cada test tingui una estructura clara i consistent.

**4\. Tests d'Integració: múltiples components junts**

Un test d'integració prova la **col·laboració entre múltiples mòduls** amb dependències reals (o quasi-reals): el controlador HTTP \+ el servei \+ la base de dades de test.

| describe('POST /api/usuaris', () \=\> {  it('crea un usuari i el guarda a la base de dades', async () \=\> {    // Arrange: base de dades de test real (no mock)    const db \= await crearBDTest();    const app \= crearApp(db);    // Act    const resposta \= await request(app)      .post('/api/usuaris')      .send({ nom: 'Anna', email: 'anna@e.com' })      .expect(201);    // Assert: comprova la resposta I l'estat de la BD    expect(resposta.body.id).toBeDefined();    const aBD \= await db.usuaris.trobarPerId(resposta.body.id);    expect(aBD?.email).toBe('anna@e.com');    await db.netejar();  });}); |
| :---- |

Els tests d'integració capturen problemes que els unitaris no detecten: contractes d'API incorrectes, incompatibilitats d'esquema de base de dades, errors de comunicació entre serveis.

**5\. Tests E2E: des de l'usuari fins al servidor**

Un test E2E simula un usuari real al navegador. Executa l'acció com si fos un humà: visita la pàgina, omple formularis, clica botons, verifica el resultat visual.

| // Playwright: simulació completa al navegadortest('l\\'usuari pot iniciar sessió i veure el dashboard', async ({ page }) \=\> {  await page.goto('/login');  await page.fill('\[name="email"\]', 'anna@exemple.com');  await page.fill('\[name="password"\]', 'contrasenya123');  await page.click('\[data-testid="login-btn"\]');  await expect(page).toHaveURL('/dashboard');  await expect(page.locator('\[data-testid="benvinguda"\]'))    .toContainText('Anna');}); |
| :---- |

Son el nivell amb més valor per a l'usuari però el més lent i fràgil. Usa'ls únicament per als fluxos crítics del negoci (login, checkout, pagament).

**6\. Mocking: aïllar dependències externes**

El mocking substitueix dependències reals (APIs, bases de dades, emails) per versions falses i controlades en els tests unitaris. Sense mocking, un test unitari que fa una petició HTTP real triga segon, pot fallar per connexió i no és determinista.

**Les tres eines de Jest/Vitest:**

| // jest.fn(): crear una funció mock des de zeroconst mockEnviarEmail \= jest.fn().mockResolvedValue(undefined);expect(mockEnviarEmail).toHaveBeenCalledWith('anna@e.com', 'Benvinguda\!');expect(mockEnviarEmail).toHaveBeenCalledTimes(1);// jest.mock(): imitar un mòdul completjest.mock('./servei-email', () \=\> ({  enviarEmail: jest.fn().mockResolvedValue(undefined)}));// jest.spyOn(): observar un mètode existent sense substituir-loconst spy \= jest.spyOn(math, 'suma');calcular(2, 3);  // crida la funció REALexpect(spy).toHaveBeenCalledWith(2, 3); |
| :---- |

**Regla fonamental:** imita únicament el que cal per aïllar la unitat. Pregunta't: "Uso el mock per testar funcionalitat que apareix als requisits?" Si no, és testing de detalls d'implementació, no de comportament.

Neteja els mocks entre tests: `jest.clearAllMocks()` al `beforeEach`.

**7\. El Cicle TDD: Vermell → Verd → Refactor**

Kent Beck va sintetitzar el TDD en dues regles: escriu codi nou únicament si un test automatitzat ha fallat, i elimina la duplicació. El cicle Red-Green-Refactor és el ritme del TDD.

* **Vermell** — escriu un test que descriu un comportament que no existeix. Ha de fallar. Si passa immediatament, el test és inútil o la funcionalitat ja existia.  
* **Verd** — escriu el **mínim codi** per fer passar el test. Pots retornar una constant hardcodada. L'objectiu és tenir la barra verda, no codi perfecte.  
* **Refactor** — millora el codi sense canviar el comportament. Els tests han de seguir passant. Aquí és on el codi passa de "funciona" a "funciona bé".

| // ITERACIÓ 1// Vermell: test que fallait('suma dos nombres', () \=\> { expect(suma(2, 3)).toBe(5); });// ❌ suma no existeix// Verd: mínim codiconst suma \= (a: number, b: number) \=\> 5;  // hardcode acceptable\!// ✅ test passa// Iteració 2: nou test força la generalitzacióit('suma 10 i 20', () \=\> { expect(suma(10, 20)).toBe(30); });// ❌ 5 \!== 30 → cal implementar la suma real// Verd real:const suma \= (a: number, b: number): number \=\> a \+ b;// ✅ tots els tests passen// Refactor: extraiem el tipus si cal, millorem noms |
| :---- |

**Errors comuns:** escriure múltiples tests alhora (un a la vegada), saltar el vermell (confirma que el test és vàlid), saltar el refactor (es crea deute tècnic).

**8\. Configurar Jest i Vitest amb TypeScript**

La decisió prèvia: projecte **Vite** → **Vitest** (natiu, zero config). Projecte **Node.js** o hereu → **Jest** (amb `ts-jest`). L'API és pràcticament idèntica en tots dos.

**Jest amb TypeScript:**

| npm install \--save-dev jest typescript ts-jest @types/jest |
| :---- |

| // jest.config.tsexport default {  preset: 'ts-jest',  testEnvironment: 'node',  // o 'jsdom' per a frontend  collectCoverageFrom: \['src/\*\*/\*.ts', '\!src/\*\*/\*.d.ts'\],}; |
| :---- |

**Vitest (projecte Vite existent):**

| npm install \--save-dev vitest @vitest/coverage-v8 |
| :---- |

| // vite.config.ts \-- afegir la secció test/// \<reference types="vitest" /\>export default defineConfig({  test: {    globals: true,    environment: 'jsdom',    coverage: { provider: 'v8', reporter: \['text', 'html', 'lcov'\] },  },}); |
| :---- |

**Scripts essencials:**

| {  "test": "vitest",  "test:run": "vitest run",  "test:coverage": "vitest run \--coverage",  "test:ui": "vitest \--ui"} |
| :---- |

**9\. Cobertura de codi (Code Coverage)**

La cobertura mesura quin percentatge del codi executen els tests. No garanteix que el codi sigui correcte: garanteix que s'ha executat. És una mètrica orientativa, no un objectiu en si.

**Les quatre mètriques:**

| Mètrica | Mesura | Objectiu recomanat |
| ----- | ----- | ----- |
| **Statements** | Línies executives executades | ≥ 80% |
| **Branches** | Camins `if/else/switch` | ≥ 75% |
| **Functions** | Funcions cridades | ≥ 90% |
| **Lines** | Línies de codi | ≥ 80% |

**Generar l'informe:**

| npm run test:coverage\# → genera coverage/index.html (obert al navegador)\# → genera coverage/lcov.info (per a VS Code Coverage Gutters) |
| :---- |

L'informe HTML mostra línies en verd (cobertes), roig (no cobertes) i groc (branca parcialment coberta). El CI/CD pot bloquejar PRs si la cobertura baixa d'un llindar configurat.

**10\. Proves de regressió**

Una regressió és quan un canvi nou trenca alguna cosa que funcionava. Les proves automatitzades prevenen regressions: cada test existent és una trampa per a futures regressions.

La regla: **cada bug arreglat ha de tenir un test que el reprodueixi, escrit ABANS d'arreglar el bug**.

| // 1\. Bug reportat: "el carret duplica el preu amb descompte"// 2\. Escriu el test que reprodueix el bug (VERMELL)it('NO duplica el preu quan hi ha descompte', () \=\> {  const preu \= calcularTotal({ preu: 100, descompte: 10 });  expect(preu).toBe(90);  // ← falla perquè el bug existeix});// 3\. Arregla el bug fins que el test passa (VERD)// 4\. El test queda per sempre → la regressió és impossible |
| :---- |

En el pipeline CI/CD, tots els tests s'executen en cada PR. Si algun falla, la PR no es pot fusionar. Si torna el bug, el test falla immediatament.

**11\. Bones pràctiques (goldbergyoni)**

* **Noms descriptius** — el nom del test ha de dir quèprova i quin resultat espera: `'quan l'usuari és premium, llavors aplica un 10% de descompte'`.  
* **Tests independents** — cap test pot dependre d'un altre. Cada test crea el seu propi estat i el neteja quan acaba.  
* **Testa comportament, no implementació** — no comprobis detalls interns (`_camp`, mètodes privats). Comproba el resultat observable externament.  
* **Assertions declaratives** — usa `expect(x).toBe(y)`, no bucles ni condicionals als tests.  
* **Dades realistes** — usa inputs del món real, no "Foo". Els bugs apareixen amb inputs reals.

**El mapa del tema**

Per quètesting?  
  → Detecció primerenca · Confiança · Documentació viva · Millor disseny

La Piràmide (Fowler)  
  → 70% Unitaris · 20% Integració · 10% E2E

El cicle TDD (Kent Beck)  
  → Vermell (test falla) → Verd (mínim codi) → Refactor (millora)

Les eines  
  → Jest (Node.js, legacy) / Vitest (Vite, modern)  
  → jest.fn() / jest.mock() / jest.spyOn() per a mocking  
  → Playwright per a E2E

La qualitat  
  → Patró AAA · Noms descriptius · Tests independents  
  → Code Coverage (80%+ statements) · Proves de regressió al CI/CD

