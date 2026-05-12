## **Glossari de Termes — Proves i TDD en TypeScript**

**AAA (Arrange, Act, Assert)** — Patró d'estructura per a tests. Les tres seccions han d'estar clarament separades: Arrange (preparar l'estat i les dades), Act (executar la unitat sota test, normalment 1 línia), Assert (verificar el resultat esperat, normalment 1 línia). Garanteix que qualsevol lector entén el test sense esforç mental.

**Assertion** — La verificació final d'un test. Compara el valor obtingut amb el valor esperat. En Jest/Vitest s'escriu com `expect(valor).toBe(esperat)`. Si l'assertion falla, el test falla. Una sola assertion per test és l'ideal; mai usar bucles ni condicionals en les assertions.

**Behaviour Testing** — Testar el comportament extern observable d'una funció o component, no els seus detalls d'implementació interns. Si el test ha d'accedir a propietats privades o mètodes interns per verificar alguna cosa, és un senyal que s'estan testant els detalls d'implementació, no el comportament.

**Branch Coverage** — Mètrica de cobertura que mesura el percentatge de branques condicionals (`if/else`, `switch`) que han estat recorregudes pels tests. El valor objectiu recomanat és ≥75%. És la mètrica més difícil d'assolir perquè cada condició genera dos camins.

**Call Stack (tests)** — Quan un test falla, el stack trace mostra la cadena de crides que han portat a l'error. Llegir el call stack correctament és essencial per identificar ràpidament quin test ha fallat i per quina raó.

**CI/CD i Testing** — Les proves automatitzades s'integren al pipeline CI/CD per executar-se automàticament en cada Pull Request. Si algun test falla, la PR no es pot fusionar i el desplegament s'atura. Transforma els tests de xarxa de seguretat en gate de qualitat obligatori.

**Code Coverage** — Percentatge del codi de producció que els tests exerciten. Les quatre mètriques son: Statements, Branches, Functions i Lines. El 100% de cobertura no garanteix qualitat: un test que executa codi però no verifica el resultat pot tenir cobertura alta sense valor real.

**Con de Gelat (Ice Cream Cone)** — L'antipatró oposat a la piràmide de tests: molts tests manuals i E2E a dalt, i pocs tests unitaris a baix. Resulta en una suite lenta, fràgil i cara de mantenir. El CI/CD triga molts minuts i els developers deixen d'executar els tests localment.

**`describe`** — Bloc que agrupa tests relacionats en Jest i Vitest. Permet organitzar els tests per funció, component o cas d'ús. Es poden anidar per crear jerarquies. El text del `describe` forma la primera part del nom complet del test.

**Determinisme** — Propietat d'un test que garanteix que produeix sempre el mateix resultat per als mateixos inputs, independentment de quan s'executa o en quin ordre. Un test no determinista (flaky test) és pitjor que no tenir cap test.

**Documentació viva** — Els tests com a forma de documentació sempre actualitzada. A diferència dels comentaris, els tests fallen si el codi canvia i no s'actualitzen, garantint que sempre reflecteixen el comportament real del codi.

**E2E (End-to-End Testing)** — Tipus de test que simula un usuari real interactuant amb tota l'aplicació al navegador. Exercita el sistema complet: frontend, API, base de dades. Molt lents i fràgils, però proporcionen la major confiança. S'usen per als fluxos crítics del negoci (login, checkout). Eines: Playwright, Cypress.

**`expect()`** — La funció d'assertion de Jest i Vitest. Accepta el valor obtingut i s'encadena amb matchers com `.toBe()`, `.toEqual()`, `.toHaveBeenCalledWith()`, `.rejects.toThrow()`. És la peça fonamental de cada verificació.

**Fail Fast (en testing)** — Principi que aplica als tests: valida les precondicions al principi del test i surt immediatament si no es compleixen. Un test que falla per una raó inesperada en el mig és difícil de debugar; un test que falla al principi per una condició clara és fàcil de solucionar.

**False Negative** — Un test que hauria de fallar però passa. El cas més perillós en testing: dona una confiança falsa en codi que en realitat té bugs. Sol ocórrer quan el mock no reprodueix correctament el comportament de la dependència real.

**False Positive** — Un test que hauria de passar però falla. Irritant però no perillós: obliga a investigar però no deixa passar bugs a producció. Sol ocórrer en tests fràgils que depenen de l'ordre d'execució o de detalls d'implementació.

**Flaky Test** — Test que produeix resultats inconsistents: unes vegades passa i d'altres falla sense que el codi hagi canviat. Causes habituals: dependències temporals, tests no aïllats, race conditions en codi asíncron. Els tests fràgils son pitjors que no tenir tests perquè eroden la confiança en la suite.

**Function Coverage** — Mètrica de cobertura que mesura el percentatge de funcions que han estat cridades per almenys un test. El valor objectiu recomanat és ≥90%. Tota funció hauria de tenir almenys un test que la cridi.

**`globals: true` (Vitest/Jest)** — Opció de configuració que fa accessibles globalment les funcions `describe`, `it`, `expect`, `beforeEach`, etc. sense necessitat d'importar-les explícitament en cada fitxer de test.

**Happy Path** — El camí d'execució ideal on tot funciona correctament. Els tests del happy path verifiquen que el codi produeix el resultat correcte quan s'usa de manera normal. Han d'acompanyar-se sempre de tests de casos límit i casos d'error.

**Hook** — Funció especial que s'executa en moments concrets del cicle de vida dels tests. `beforeAll` (una vegada abans de tots els tests del describe), `beforeEach` (abans de cada test), `afterEach` (després de cada test), `afterAll` (una vegada després de tots).

**`it()` / `test()`** — Funció que defineix un test individual en Jest i Vitest. Les dues son equivalents. El text del primer paràmetre és el nom del test: ha de descriure clarament el comportament que prova, idealment seguint el patró "quan \[condició\] → llavors \[resultat\]".

**Integration Test** — Tipus de test que prova la col·laboració entre múltiples mòduls amb dependències reals (o quasi-reals). Captura errors que els tests unitaris no detecten: contractes d'API incorrectes, incompatibilitats d'esquema de BD, errors de comunicació entre serveis.

**Jest** — Framework de testing JavaScript creat per Meta. El més madur i popular per a Node.js i React. Inclou assertions, mocking i cobertura integrats. Per a TypeScript necessita `ts-jest` com a pre-processador. Compatible amb projectes legacy i moderns.

**`jest.clearAllMocks()`** — Neteja les crides registrades, les instàncies i els resultats de tots els mocks, però no elimina les implementacions definides. S'usa habitualment al `beforeEach` per garantir que cada test comença amb mocks nets.

**`jest.fn()`** — Crea una nova funció mock. Registra totes les crides, els arguments i els valors de retorn. Permet definir el valor de retorn amb `.mockReturnValue()` o `.mockResolvedValue()` per a funcions asíncrones.

**`jest.mock('modul')`** — Substitueix tot un mòdul per una versió mockada. Jest intercepta l'import i retorna la versió falsa en tot el fitxer de test. Cal cridar-lo fora dels blocs `describe`/`it` (s'eleva automàticament al principi del fitxer).

**`jest.mocked()`** — Helper de TypeScript que retorna el valor passat amb el tipus `jest.MockedFunction<T>`. Permet accedir als mètodes de mock amb tipat complet.

**`jest.spyOn(objecte, 'metode')`** — Crea un spy sobre un mètode existent d'un objecte. Per defecte crida la implementació real. Permet observar les crides sense substituir el comportament, o substituir-lo temporalment amb `.mockImplementation()`.

**`jest.resetAllMocks()`** — Neteja les crides registrades I elimina les implementacions definides. Més agressiu que `clearAllMocks`: els mocks tornen a comportar-se com `jest.fn()` pur.

**`jest.restoreAllMocks()`** — Restaura la implementació original dels mètodes sobre els quals s'ha usat `jest.spyOn()`. Necessari per no contaminar tests posteriors.

**LCOV** — Format estàndard per a dades de cobertura de codi. El fitxer `lcov.info` generat per Jest/Vitest pot ser llegit per VS Code Coverage Gutters, Codecov, i altres eines de CI/CD. Pronunciat "el-cov".

**Line Coverage** — Mètrica de cobertura que mesura el percentatge de línies de codi executades. Molt similar a Statements Coverage. El valor objectiu recomanat és ≥80%.

**Living Documentation** — Veure *Documentació Viva*.

**Logpoint** — En DevTools, equivalent a `console.log` però sense modificar el codi. En testing, no existeix equivalent directe, però els tests ben escrits eliminen la necessitat de logs per entendre el comportament.

**Matcher** — Les funcions que es combinen amb `expect()` per fer les assertions. Exemples: `.toBe()` (igualtat estricta), `.toEqual()` (igualtat profunda d'objectes), `.toBeTruthy()`, `.toContain()`, `.toHaveBeenCalledWith()`, `.rejects.toThrow()`, `.toBeCloseTo()` (nombres decimals).

**Mock** — Implementació falsa d'una dependència que s'usa als tests per aïllar la unitat sota test. Tècnicament, un mock retorna `null` o `undefined` per defecte i es verifica que ha estat cridat. En la pràctica, Jest usa el terme "mock" per a qualsevol substitut de dependència.

**Mocking** — La pràctica de substituir dependències externes (APIs, bases de dades, emails, temps) per versions falses i controlades durant els tests. Permet testar la lògica de manera aïllada, ràpida i determinista.

**Narrow Integration Test** — Subgrup dels tests d'integració que cobreix el codi en un servei que es comunica amb un servei separat, però usa test doubles per a les dependències externes. Abast similar als tests unitaris però cobreix la comunicació entre dues capes.

**Piràmide de Tests** — Metàfora de Martin Fowler que descriu la proporció ideal de tests: molts unitaris (base), menys d'integració (mig), pocs E2E (cim). La forma de la piràmide reflecteix la relació inversa entre velocitat, cost i confiança de cada nivell.

**Playwright** — Framework de Microsoft per a tests E2E. Suporta Chrome, Firefox i Safari. API moderna basada en `async/await`. Considerat el millor E2E runner el 2025 per la seva fiabilitat i el debugger de traces. Suporta TypeScript nativament.

**`Promise<void>` (tests async)** — Quan el test conté codi asíncron, la funció ha de ser `async` i usar `await` per esperar les assertions. Si no s'espera una Promise, el test pot passar incorrectament perquè Jest/Vitest no espera que la Promise es resolgui.

**Red-Green-Refactor** — El mantra TDD de Kent Beck. Vermell: escriu un test que falla (confirma que la funcionalitat no existeix). Verd: escriu el mínim codi per fer passar el test (pot ser hardcoded). Refactor: millora el codi sense canviar el comportament (els tests continuen passant).

**Regressió** — Bug on una funcionalitat que funcionava correctament deixa de funcionar a causa d'un canvi posterior. Les proves automatitzades prevenen regressions: cada test existent és una trampa que detecta si un canvi nou trenca alguna cosa.

**Proves de Regressió** — Tests escrits per verificar que una funcionalitat segueix funcionant després d'un canvi. La millor pràctica és escriure el test que reprodueix el bug ABANS d'arreglar-lo, seguint el cicle TDD.

**Snapshot Testing** — Tècnica que captura la sortida d'un component o funció i la compara amb una "fotografia" guardada prèviament. Útil per detectar canvis inesperats, però fràgil i difícil de mantenir en components grans.

**Spy** — Variant del mock que observa el comportament d'una funció sense substituir-ne la implementació per defecte. Registra quantes vegades s'ha cridat, amb quins arguments i quins valors ha retornat. En Jest: `jest.spyOn()`.

**Statement Coverage** — Mètrica de cobertura que mesura el percentatge de statements executables del codi que han estat exercitats. El valor objectiu recomanat és ≥80%.

**Stub** — Variant del mock que proporciona respostes predefinides a crides de funcions sense executar la lògica real. Útil per simular condicions específiques o escenaris d'error difícils de reproduir de manera natural.

**TDD (Test-Driven Development)** — Metodologia de desenvolupament de software on els tests s'escriuen ABANS del codi de producció. Inventada per Kent Beck. Les dues regles fonamentals: escriu codi nou únicament si un test automatitzat ha fallat, i elimina la duplicació. Objectiu: "Clean code that works."

**Test Double** — Terme genèric per a qualsevol substitut d'una dependència real en un test (inclou mocks, stubs, spies i fakes). Terme encunyat per Gerard Meszaros en analogia al "doble" cinematogràfic.

**Test Suite** — El conjunt complet de tots els tests d'un projecte o mòdul. Una suite ben construïda dona confiança per fer canvis al codi.

**`toHaveBeenCalledWith()`** — Matcher de Jest/Vitest que verifica que un mock o spy ha estat cridat amb arguments específics. Molt útil per verificar que una funció s'ha cridat amb els paràmetres correctes sense comprovar detalls d'implementació.

**`ts-jest`** — Pre-processador TypeScript per a Jest. Transforma els fitxers `.ts` a JavaScript que Jest pot executar. Requereix configuració al `jest.config.ts`. Alternativa: usar Babel amb `@babel/preset-typescript`.

**Unit Test** — Test que prova una sola funció, mètode o classe completament aïllada de les seves dependències. Execució en mil·lisegons, determinista, independent d'altres tests. Son la base de la piràmide: la majoria de tests del projecte haurien de ser unitaris.

**Vitest** — Framework de testing modern creat per l'equip de Vite. Suporta TypeScript i ESM nativament (sense configuració). API compatible amb Jest (quasi drop-in replacement). Molt més ràpid que Jest en projectes Vite gràcies a HMR. Recomanat per a projectes moderns.

**`vitest --ui`** — Interfície gràfica de Vitest al navegador que mostra els tests en temps real, permet filtrar, i visualitza la cobertura de codi de manera interactiva.

**Watch Mode** — Mode d'execució de Jest/Vitest on els tests es re-executen automàticament cada vegada que un fitxer canvia. Proporciona feedback immediat mentre escrius codi. `npm run test:watch` per a Jest o simplement `vitest` per a Vitest.

**White Box Testing** — Testar coneixent els detalls interns de la implementació. L'oposat és Black Box Testing. En testing modern es prefereix el Black Box: testar el comportament extern, no com funciona internament, per crear tests més robustos al refactoring.

