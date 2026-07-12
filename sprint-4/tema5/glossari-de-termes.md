## **Glossari de termes — Test de components en React**

**`act()`** — Utilitat de React per assegurar que totes les actualitzacions d'estat i efectes secundaris s'han processat abans de fer assertions. React Testing Library embolcalla automàticament les seves operacions en `act()`. Quan veus el warning "not wrapped in act(...)", significa que una actualització d'estat ocorre fora del control de RTL → normalment es resol usant `await` amb `waitFor` o `findBy*`.

**`afterEach` / `afterAll`** — Hooks de Vitest/Jest que s'executen après de cada test o de tots els tests d'un `describe`. Útils per a cleanup manual, eliminar mocks, o netejar efectes secundaris. RTL fa cleanup automàtic del DOM après cada test, però `afterEach` és necessari per a mocks i spies.

**`arrayMove`** — Utilitat de `@dnd-kit/sortable` que reordena un array immutablement. Pren l'array original, l'índex d'origen i l'índex de destí i retorna un nou array reordenat. Cal mockejar-la en tests que mocken dnd-kit per verificar que la lògica de reordenació és correcta.

**Assertions** — Les comprovacions que fan els tests: `expect(valor).toBe(...)`, `expect(element).toBeVisible()`, etc. Les assertions de `@testing-library/jest-dom` (`toBeInTheDocument`, `toBeVisible`, `toBeDisabled`, `toHaveValue`, `toHaveTextContent`) son especialment útils perquè reflecteixen el que l'usuari percep.

**`beforeEach` / `beforeAll`** — Hooks de Vitest/Jest que s'executen abans de cada test o de tots els tests d'un `describe`. Útils per a configuració compartida: inicialitzar mocks, renderitzar components comuns, configurar l'entorn. Cal tenir cura de no compartir massa estat entre tests → millor que cada test sigui independent.

**Cold Start** — El temps que triga el test runner en arrencar des de zero i executar tots els tests. Vitest 4: \~38 segons per a una suite gran. Jest 30: \~214 segons. La diferència prové de l'ús d'esbuild (Vitest) vs Babel (Jest) per a la transformació de TypeScript.

**`coverage`** — Mètrica que indica quin percentatge del codi és executat pels tests. Vitest suporta dos providers: V8 (més ràpid, recomanat) i Istanbul (més detallat). `vitest run --coverage` genera un informe. Les mètriques principals son: `statements` (instruccions), `branches` (branques condicionals), `functions` (funcions) i `lines` (línies). Una alta cobertura no garanteix bons tests — és possible tenir 100% de cobertura amb tests que no verifiquen res útil.

**`describe`** — Funció de Vitest/Jest per agrupar tests relacionats. Permet una estructura jeràrquica: `describe('Component', () => { describe('quan l\'usuari clica', () => { test(...) }) })`. Comparteix `beforeEach`/`afterEach` dins del seu àmbit.

**`DragEndEvent`** — Tipus de dnd-kit que descriu l'objecte rebut pel handler `onDragEnd`. Conté `active` (l'element que s'ha arrossegat, amb el seu `id`) i `over` (l'element sobre el qual s'ha alliberat, `null` si no hi ha zona de drop vàlida). La lògica de reordenació viu dins del handler `onDragEnd`.

**E2E (End-to-End)** — Tests que executen el flux complet de l'aplicació en un browser real (Playwright, Cypress). Imprescindibles per a testar DnD amb interaccions de pointer realistes, ja que `getBoundingClientRect()` funciona correctament en un browser real. Son els tests més lents i cars però els que donen més confiança per a fluxos crítics.

**Enzyme** — Biblioteca de testing per a React creada per Airbnb. Pràcticament abandonada desde 2019 (última versió 3.11). No suporta React 18/19 ni Concurrent Mode. Enfocada en testejar implementació (accés a `state`, `props`, lifecycle methods). Substituïda per React Testing Library en qualsevol projecte modern.

**Falsos negatius** — Tests que fallen quan el codi és correcte. Ocorren quan els tests son massa acoblats a la implementació: renomenar una variable (refactor vàlid) trenca el test sense que el comportament hagi canviat. Frequents amb Enzyme i `shallow rendering`.

**Falsos positius** — Tests que passen quan el codi té bugs. El cas clàssic: `fireEvent.change(disabledInput, { target: { value: 'text' } })` → el test passa perquè `fireEvent` dispara l'event directament, però l'usuari real no podria escriure en un camp disabled. `userEvent.type()` evita aquest problema.

**`findBy*`** — Queries asíncrones de RTL que retornen una Promise. `findByRole`, `findByText`... Útils quan l'element apareix asíncronament (après d'un fetch, un setTimeout, o una actualització d'estat). Equivalents a `waitFor(() => getBy*())` però més concises.

**`fireEvent`** — API de baix nivell de RTL que dispara un únic DOM event directament via `dispatchEvent`. `fireEvent.click(element)` dispara únicament l'event `click`, sense els events anteriors (mousedown, focus, etc.) que ocorrerien en un browser real. Usar `userEvent` per defecte i `fireEvent` únicament en casos molt específics.

**`findByRole`** — Query asíncrona de RTL per a elements per rol ARIA. Equivalent asíncrona de `getByRole`. Útil per a elements que apareixen asíncronament: `await screen.findByRole('dialog')` espera fins que el diàleg aparegui al DOM.

**`getBoundingClientRect()`** — Mètode del DOM que retorna la posició i dimensions d'un element. JSDOM retorna sempre `{ x:0, y:0, width:0, height:0 }`. dnd-kit el usa per a la detecció de col·lisió → cal mockejar-lo en tests de DnD: `Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', { value: () => ({...}) })`.

**`getBy*` vs `queryBy*` vs `findBy*`** — Les tres famílies de queries de RTL. `getBy*` lança excepció si l'element no existeix (per a elements que han d'existir). `queryBy*` retorna `null` si no existeix (per a assertions negatives: `expect(screen.queryByRole('dialog')).not.toBeInTheDocument()`). `findBy*` és asíncrona, espera fins que l'element aparegui.

**`getByLabelText`** — Query de RTL que troba un input per la seva `<label>` associada. Funciona únicament si hi ha una label correctament associada (`htmlFor` o `aria-label`). Si la query falla, el developer sap que cal afegir accessibilitat al formulari → doble benefici: test \+ a11y.

**`getByRole`** — La query prioritària de RTL. Troba elements per el seu rol ARIA semàntic (`button`, `textbox`, `dialog`, `heading`, `listitem`...). `screen.getByRole('button', { name: /enviar/i })` és la manera recomanada de trobar botons. Promou HTML semàntic: si la query no troba l'element, probablement l'element no és accessible.

**`getByTestId`** — Query de RTL que busca elements per l'atribut `data-testid`. L'última opció recomanada, a usar únicament quan no hi ha alternativa accessible. L'usuari no veu ni sap res dels `data-testid` → usar-los implica testejar implementació.

**`getByText`** — Query de RTL que busca elements pel seu text visible. Útil per a contingut estàtic: `screen.getByText('Benvinguda, Anna!')`. Usar `/regex/i` per a matching insensible a majúscules i text parcial.

**`globals: true`** — Opció de configuració de Vitest que fa `describe`, `test`, `it`, `expect`, `beforeEach`, `afterEach`, etc. disponibles globalment sense necessitat d'importar-los explícitament. Equivalent al comportament per defecte de Jest.

**HMR-aware Watch Mode** — La funcionalitat de Vitest que usa el Hot Module Replacement de Vite per identificar exactament quins tests estan afectats per un canvi de fitxer. Quan modifiques `Button.tsx`, Vitest re-executa únicament `Button.test.tsx` (i qualsevol test que importi Button), no tota la suite. Resultat: re-execucions en \~0.3 segons.

**Integration Test** — Test que verifica la interacció entre múltiples components o entre un component i les seves dependències. En el context de DnD: testejar el component `LlistaKanban` amb dnd-kit mocked → verifica que el component comunica correctament amb el handler `onDragEnd` però sense executar la física del DnD real.

**JSDOM** — Implementació en JavaScript pur de les APIs del DOM del browser. Usat per Vitest i Jest com a entorn de test (`environment: 'jsdom'`). Limitacions importants: no implementa `getBoundingClientRect()` (retorna zeros), no calcula layout real, no suporta animacions CSS. Per a tests que necessiten un browser real → usar Playwright (E2E).

**`KeyboardSensor`** — Sensor de dnd-kit que detecta l'inici del drag via teclat (Espai per aixecar, fletxes per moure, Espai/Enter per alliberar, Escape per cancel·lar). La millor opció per a tests de DnD perquè no depèn de coordenades ni de `getBoundingClientRect()` → molt més fàcil de simular en JSDOM amb `userEvent.keyboard()`.  
**Lògica pura (Pure Logic)** — Funcions que no depenen del DOM, del DnD, ni de React: únicament reben dades i retornen dades. Testejar la lògica pura és el nivell de testing més ràpid, més fiable i més fàcil. En el context de DnD: `reordenarItems(items, idOrigen, idDesti)` és lògica pura separada de la UI → testejable sense cap mock ni render.

**`mock` / `vi.mock()`** — Mecanisme per substituir dependències externes per implementacions controlades durant els tests. `vi.mock('@dnd-kit/core', () => ({ DndContext: ({ children }) => <>{children}</> }))` substitueix tota la biblioteca dnd-kit per components simples durant els tests. Permet testejar el component de manera aïllada de la complexitat del DnD.

**`vi.fn()`** — Funció de Vitest per crear una funció mock. Equivalent a `jest.fn()`. Registra totes les crides rebudes. Útil per verificar que un handler s'ha cridat: `expect(mockFn).toHaveBeenCalledOnce()`, `expect(mockFn).toHaveBeenCalledWith('argument')`.

**`vi.spyOn()`** — Funció de Vitest que "espia" un mètode existent d'un objecte sense substituir-lo completament. `vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({...})` substitueix `getBoundingClientRect` per a un test específic. Equivalent a `jest.spyOn()`.

**`onDragEnd`** — Handler principal de dnd-kit que s'executa quan l'usuari allibera l'element arrossegat. Rep `{ active, over }` on `active.id` és l'element arrossegat i `over.id` és l'element sobre el qual s'ha alliberat. Si `over` és `null`, l'element s'ha alliberat fora de qualsevol zona vàlida. La lògica de reordenació (`arrayMove`) viu aquí.

**`pointerDown/pointerMove/pointerUp`** — Els events de pointer que dnd-kit escolta internament (en lloc dels events `dragstart/dragover/drop` de l'HTML5 DnD API nativa). Per a simular un drag amb dnd-kit en tests: `fireEvent.pointerDown(element)` → `fireEvent.pointerMove(document, {clientX: ..., clientY: ...})` → `fireEvent.pointerUp(document)`. Cal moure's \> 5px per activar el `PointerSensor` per defecte.

**`PointerSensor`** — Sensor de dnd-kit que detecta l'inici del drag via events de pointer (ratolí i touch). Requereix un moviment mínim de 5px per activar el drag (evita drags accidentals). El sensor per defecte per a producció, però difícil de simular en JSDOM perquè necessita coordenades reals.

**`queryBy*`** — Família de queries de RTL que retornen `null` en lloc de llançar excepció si l'element no existeix. Usar per a assertions negatives: `expect(screen.queryByRole('dialog')).not.toBeInTheDocument()`. Mai usar per a elements que haurien d'existir (usar `getBy*` per obtenir errors descriptius si fallen).

**React Testing Library (RTL)** — Biblioteca de testing per a React creada per Kent C. Dodds. Construïda sobre DOM Testing Library. Enfocament: testejar components des de la perspectiva de l'usuari, no dels detalls d'implementació. Proporciona queries (`getByRole`, `getByText`...), renders (`render`) i assertions (`toBeVisible`, `toBeInTheDocument`...). Compatible amb totes les versions modernes de React (17, 18, 19, Concurrent Mode).

**`render()`** — Funció de RTL que renderitza un component React en un DOM simulat (JSDOM). Retorna utilitats com `getByRole`, `queryByText`... però la manera recomanada és usar l'objecte global `screen`. Fa cleanup automàtic del DOM après cada test.

**`screen`** — Objecte de RTL que proporciona accés a les queries sobre el DOM renderitzat. `screen.getByRole(...)`, `screen.findByText(...)`, etc. La manera recomanada de accedir als elements. Alternativa a usar les queries retornades per `render()` directament, ja que `screen` sempre opera sobre l'últim render.

**Shallow Rendering** — Funcionalitat d'Enzyme que renderitza un component sense els seus components fills. Permet testejar un component de manera aïllada. RTL no té shallow rendering: sempre renderitza la jerarquia completa (equivalent al `mount` d'Enzyme). La falta de shallow rendering en RTL és una decisió de disseny, no una limitació: els tests han de reflectir el que veu l'usuari, que sempre inclou els fills.

**`setupFiles`** — Opció de configuració de Vitest que especifica fitxers que s'executen abans de cada fitxer de test. `setupFiles: ['./src/setupTests.ts']` és el lloc on s'importa `@testing-library/jest-dom` per afegir matchers personalitzats a `expect`.

**`SortableContext`** — Component de dnd-kit que proporciona el context de sorting als elements fills. Rep la llista d'IDs dels items i l'estratègia (`verticalListSortingStrategy`, `horizontalListSortingStrategy`). En tests mocats, se sol substituir per un fragment transparent: `SortableContext: ({ children }) => <>{children}</>`.

**Testing Piramide** — El model que descriu la distribució ideal de tests: molts tests unitaris (ràpids, barats, aïllats), menys tests d'integració (moderats), pocs tests E2E (lents, cars, complets). En el context de DnD: tests unitaris per a la lògica de reordenació, tests d'integració per al component (amb mocks), tests E2E per al flux complet de DnD.

**Test unitari** — Test que verifica una unitat de codi de manera aïllada, sense dependències externes. En React testing: testejar una funció pura (`reordenarItems`) sense render, DOM, ni DnD. Son els tests més ràpids (mil·lisegons), més estables, i els que millor cobreixen casos límit.

**`toBeDisabled()`** — Matcher de `@testing-library/jest-dom` que verifica que un element té l'atribut `disabled`. Útil per a verificar estats de botons durant carregues o validacions de formularis.

**`toBeInTheDocument()`** — Matcher de `@testing-library/jest-dom` que verifica que un element existeix al DOM. Atenció: un element pot estar `toBeInTheDocument()` però no `toBeVisible()` si té `display:none` o `opacity:0`. Preferir `toBeVisible()` per a assertions sobre el que l'usuari veu realment.

**`toBeVisible()`** — Matcher de `@testing-library/jest-dom` preferit sobre `toBeInTheDocument()`. Verifica que l'element és visible per a l'usuari: no té `display:none`, ni `visibility:hidden`, ni `opacity:0`, ni cap ancestre amagat. Evita falsos positius on l'element existeix al DOM però l'usuari no el veu.

**`toHaveBeenCalledOnce()`** — Matcher de Vitest (equivalent: `toHaveBeenCalledTimes(1)`) que verifica que una funció mock s'ha cridat exactament una vegada. Útil per a verificar que callbacks i handlers s'executen el nombre correcte de cops.

**`toHaveBeenCalledWith()`** — Matcher de Vitest/Jest que verifica els arguments amb els quals s'ha cridat una funció mock. `expect(mockFn).toHaveBeenCalledWith('argument1', 42)`. Essencial per a verificar que els handlers de DnD reben els IDs correctes.

**`toHaveValue()`** — Matcher de `@testing-library/jest-dom` que verifica el valor d'un input, select o textarea. `expect(screen.getByLabelText('Email')).toHaveValue('anna@e.com')`. Usar en lloc de `expect(input.value).toBe(...)` per a millor llegibilitat.

**`userEvent`** — Biblioteca companion de RTL (`@testing-library/user-event`) que simula interaccions d'usuari disparant la seqüència completa d'events que ocorrerien en un browser real. `user.type()` dispara focus \+ keydown \+ keypress \+ input \+ keyup per cada lletra. `user.click()` dispara la seqüència completa de pointer events. Sempre inicialitzar amb `userEvent.setup()` i usar `await`.

**`userEvent.keyboard()`** — Mètode de userEvent per simular pulsacions de teclat. `await user.keyboard(' ')` → Espai (per iniciar el drag en KeyboardSensor). `await user.keyboard('{ArrowDown}')` → fletxa avall. `await user.keyboard('{Escape}')` → Escape. La manera recomanada de testar DnD via teclat en JSDOM.

**`userEvent.setup()`** — Funció que crea una instància de userEvent que comparteix l'estat de la sessió d'usuari entre interaccions. Recomanat cridar-la ABANS del `render()`. `const user = userEvent.setup()`. A partir de userEvent v14, és la manera preferida (en lloc de cridar directament `userEvent.click()` sense setup).

**`userEvent.tab()`** — Simula la pulsació de la tecla Tab, movent el focus al següent element focusable. Útil per testejar que el focus es mou correctament i per disparar events `blur` en inputs (necessari per a validació `onBlur` en formularis).

**`userEvent.type()`** — Simula el tecleig de text en un element, disparant la seqüència completa d'events per cada caràcter (focus, keydown, keypress, input, keyup). `await user.type(input, 'hola')` → 4 cicles d'events, un per lletra. Detecta si l'input és disabled o readonly → evita falsos positius.

**V8 Coverage** — El provider de cobertura de codi recomanat per a Vitest. Més ràpid que Istanbul perquè usa la cobertura nativa de Node.js/V8. Configurat amb `coverage: { provider: 'v8' }` al `vite.config.ts`. Genera reports en múltiples formats: `text` (consola), `html` (navegable), `lcov` (per a CI).

**`vi` (Vitest)** — L'objecte global de Vitest equivalent a `jest` en Jest. Proporciona `vi.fn()`, `vi.mock()`, `vi.spyOn()`, `vi.useFakeTimers()`, `vi.clearAllMocks()`, etc. La única diferència significativa respecte a Jest: el prefix `vi.` en lloc de `jest.`.

**Vitest** — Test runner modern construït sobre Vite. Lançat el 2021 per l'equip de Vite. TypeScript i ESM natius (sense Babel), watch mode intel·ligent basat en el graph de mòduls de Vite, una sola pipeline compartida amb el projecte, API quasi idèntica a Jest. Default per a projectes Vite \+ React el 2026\.

**`vitest --ui`** — Dashboard visual web exclusiu de Vitest que mostra l'estat de tots els tests, permet re-executar-los individualment, i mostra la cobertura de manera interactiva. No té equivalent en Jest.

**`waitFor()`** — Utilitat de RTL que espera fins que una condició es compleixi, re-executant la callback repetidament. `await waitFor(() => expect(screen.getByText('Resultat')).toBeVisible())`. Útil quan una actualització és asíncrona i no pots usar `findBy*` directament. Configurar amb `timeout` per a operacions lentes.

**Watch Mode** — Mode de Vitest que re-executa automàticament els tests afectats per canvis de fitxers. `vitest` (sense arguments) inicia el watch mode. Usa el graph de mòduls de Vite per identificar exactament quins tests re-executar → 0.3 segons per re-execució vs 8.4 de Jest.

**`within()`** — Utilitat de RTL per fer queries dins d'un element específic. `within(screen.getByRole('listitem')).getByRole('button')` → cerca un botó dins d'un `listitem` específic. Útil per a llistes on hi ha múltiples elements similars (Kanban boards, taules).

