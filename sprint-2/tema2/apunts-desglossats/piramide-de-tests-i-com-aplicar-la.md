## **La piràmide de tests: l'article de Martin Fowler i Ham Vocke**

###### **The Practical Test Pyramid** [https://martinfowler.com/articles/practical-test-pyramid.html](https://martinfowler.com/articles/practical-test-pyramid.html)

Article de Martin Fowler que explica la piràmide de tests i com aplicar-la en projectes reals.

**L'origen i la metàfora**

La "Test Pyramid" (Piràmide de Tests) és una metàfora que ens diu com agrupar els tests de software en cubs de diferent granularitat. També dona una idea de quants tests hauríem de tenir en cada un d'aquests grups. 

Va ser introduïda per Mike Cohn al seu llibre "Succeeding with Agile" i desenvolupada per Martin Fowler. L'article "The Practical Test Pyramid" de Ham Vocke al blog de Fowler (2018) és el text de referència per aplicar-la en projectes reals.

L'essència de la piràmide és simple: hauries de tenir molts més tests d'alt nivell de Unitat que tests d'ample Stack executant-se a través d'una GUI. 

La forma de la piràmide correspon a quants de cada test hauria d'incloure una suite: molts tests unitaris, menys tests d'integració, i fins i tot menys tests end-to-end.

**La piràmide en context modern**

Malgrat que el concepte de la Piràmide de Tests ha estat al voltant durant una estona, els equips continuen lluitant per posar-la en pràctica correctament. 

L'article revisa el concepte original i mostra com posar-lo en pràctica, mostrant quins tipus de tests buscar en els diferents nivells.

|         ┌─────────────┐        │   UI / E2E   │  ← pocs, lents, fràgils        │              │     cost alt per test        ├─────────────┤        │  Integració  │  ← alguns, velocitat mitja        │  / Servei    │     cobreix "juntures"        ├─────────────┤        │    Unitaris  │  ← molts, ràpids, fiables        │              │     cost baix per test        └─────────────┘ |
| :---- |

**Capa 1: Tests Unitaris — la base**

Pots escriure tests unitaris per a totes les teves classes de codi de producció, independentment de la seva funcionalitat o de la capa de l'estructura interna a la qual pertanyen. Pots fer tests unitaris de controllers igual que pots fer tests unitaris de repositoris, classes de domini o lectors de fitxers.

Les característiques essencials dels tests unitaris a la piràmide: son molt ràpids (mil·lisegons), estan aïllats (sense dependències externes), son deterministes (el mateix resultat sempre), i cobreixen casos ideals i casos límit.

| // Test unitari típic: funció pura, sense dependènciesdescribe('calcularEnviament', () \=\> {  it('aplica enviament gratuït per a comandes superiors a 50€', () \=\> {    // Arrange    const totalComanda \= 75;    // Act    const costos \= calcularEnviament(totalComanda);    // Assert    expect(costos).toBe(0);  });  it('aplica tarifa estàndard per a comandes inferiors a 50€', () \=\> {    expect(calcularEnviament(30)).toBe(4.99);  });}); |
| :---- |

La regla de Vocke: si els teus tests unitaris son propers al codi de producció, es trencaran quan refactoritzis. Testa comportament, no implementació.

**Capa 2: Tests d'Integració i Servei — el mig**

El nivell d'integració és el que l'article anomena "Service Tests": validen la integració entre components, avaluant serveis en aïllament de la interfície d'usuari. Els tests de nivell servei omplen el buit entre els tests unitaris i els tests end-to-end.

Fowler distingeix dos subtipus d'integració:

* **Narrow Integration Tests** — cobreixen el codi en un servei que es comunica amb un servei separat. Usen test doubles i sovint tenen un abast similar als tests unitaris.  
* **Broad Integration Tests** — se centren a testar versions en viu de cada servei cobert. Això vol dir que els testers necessiten anar més enllà del codi que gestiona les interaccions i incloure accés substancial a l'entorn de test i a la xarxa per exercir camins de codi a través de tots els serveis.

| // Narrow Integration Test: testa el client HTTP de forma aïlladadescribe('WeatherClient', () \=\> {  it('obté el temps quan l\\'API respon correctament', async () \=\> {    // Arrange: mock del servidor extern    const mockServer \= nock('https://api.weather.com')      .get('/barcelona')      .reply(200, { temperatura: 22, descripcio: 'Assolellat' });    const client \= new WeatherClient();    // Act    const resultat \= await client.obtenirTemps('barcelona');    // Assert: comprova que el client parseja correctament la resposta    expect(resultat.temperatura).toBe(22);    expect(mockServer.isDone()).toBe(true);  // la petició s'ha fet  });}); |
| :---- |

**Capa 3: Tests End-to-End (UI) — el vèrtex**

Els tests E2E donen la major confiança quan cal decidir si el software funciona o no. Però son notòriament fràgils i sovint fallen per raons inesperades i imprevisibles. Molt sovint la seva fallada és un fals positiu. Com més sofisticada és la interfície d'usuari, més fràgils tendeixen a ser els tests.

Els tests que s'executen de punta a punta a través de la UI son: fràgils, costosos d'escriure, i que prenen molt de temps d'executar. Per tant, la piràmide argumenta que hauries de fer molt més testing automatitzat a través de tests unitaris que a través del testing basat en GUI tradicional.

| // Test E2E amb Playwright o Cypress: simula un usuari realdescribe('Flux de compra complet', () \=\> {  it('un usuari pot completar una compra', async () \=\> {    // Navega a la pàgina    await page.goto('/productes');    // Interactua com un usuari real    await page.click('\[data-testid="portàtil-afegir"\]');    await page.click('\[data-testid="veure-carret"\]');    await page.click('\[data-testid="checkout-btn"\]');    // Omple el formulari    await page.fill('\[name="email"\]', 'anna@exemple.com');    await page.fill('\[name="targeta"\]', '4111111111111111');    await page.click('\[data-testid="confirmar-comanda"\]');    // Verifica el resultat    await expect(page.locator('\[data-testid="confirmació"\]'))      .toBeVisible();  });}); |
| :---- |

**L'antipatró: el con de gelat**

L'oposat de la piràmide és el que la comunitat anomena el "ice cream cone" (con de gelat): molts tests manuals i E2E a dalt, i pocs tests unitaris a baix. Es produeix quan els equips confien massa en els tests d'interfície i manuals, i testen poc la lògica de negoci.

| ❌ Con de Gelat (antipatró):      ✅ Piràmide (correcte):      /Manual\\                           /E2E\\     /─────────\\                        /─────\\    /   E2E     \\                      /  Int  \\   /─────────────\\                    /─────────\\  / Integració    \\                  /  Unitaris  \\ /─────────────────\\                /\_\_\_\_\_\_\_\_\_\_\_\_\_\\/   Unitaris        \\ |
| :---- |

**Tests de Contracte: la capa que falta**

L'article introdueix els **Contract Tests** com una solució per al testing de microserveis: tests que verifiquen que el contracte entre un consumidor i un proveïdor d'API es respecta. Un test de contracte d'integració és un test al límit d'un servei extern que verifica que compleix el contracte esperat per un servei consumidor.

Els tests de contracte son especialment útils quan: el servei proveïdor i el consumidor el desenvolupen equips separats, no pots fer un broad integration test per problemes de velocitat o entorn, i vols detecció ràpida de trencaments d'API sense esperar als tests E2E.

**Els principis pràctics de l'article**

**"Si un test pot ser un test unitari, fes-lo unitari."** Si pots eliminar les dependències externes amb un mock i el test segueix sent significatiu, el test d'integració no afegeix valor.

**Tests nets per a tests clars.** Si has d'entrar al codi del test per entendre per quèfalla, el test no és prou informatiu. El nom i l'assertion haurien de dir-t'ho.

**Evita la duplicació entre capes.** Si ja tens tests unitaris que cobreixen un comportament, no el cobreixes de nou als tests d'integració. Cada test hauria de tenir un motiu únic per existir.

**La confiança és la mètrica real.** El propòsit de la piràmide no és arribar a uns percentatges concrets. L'objectiu és tenir confiança que el software funciona. Si uns pocs tests E2E ben escollits et donen la confiança que necessites, no calen centenars.

**Les proporcions recomanades**

| Capa | Proporció | Velocitat | Cost | Quan s'executa |
| ----- | ----- | ----- | ----- | ----- |
| **Unitaris** | \~70% | ms | Molt baix | En cada canvi (watch mode) |
| **Integració/Servei** | \~20% | s | Mitjà | En cada PR/push |
| **E2E/UI** | \~10% | min | Alt | Abans de cada deploy |

La distribució exacta depèn del projecte. El que importa és el principi: molts tests ràpids i econòmics com a base, pocs tests lents i costosos com a últim filtre.

