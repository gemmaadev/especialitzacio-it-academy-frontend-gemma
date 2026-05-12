## **Proves unitàries, d'integració i End-to-End**

**La piràmide de testing: la guia visual**

El testing es representa sovint com una piràmide, on la base consisteix en tests unitaris, seguida de tests d'integració, i coronada pels tests E2E. 

La distribució recomanada és: 70% tests unitaris (feedback ràpid, captura errors de lògica aviat), 20% tests d'integració (verificar interaccions entre components) i 10% tests E2E (validar fluxos d'usuari crítics). 

|         /\\       /E2E\\          ← pocs, lents, molt valor per a l'usuari      /------\\     /Integrac.\\      ← alguns, velocitat mitjana    /------------\\   / Unitaris     \\   ← molts, ràpids, aïllats  /-----------------\\ |
| :---- |

Cada nivell de la piràmide captura un tipus diferent de bug. La pregunta no és quin usar sinó quanta quantitat de cada un. 

Els tests unitaris verifiquen que les funcions individuals funcionen. Els tests d'integració verifiquen que les funcions funcionen conjuntament. Els tests E2E verifiquen que els usuaris poden assolir els seus objectius.

**Tests unitaris: el component en aïllament**

El testing unitari verifica les parts més petites testejables d'una aplicació, com ara funcions o mètodes, de manera aïllada. Assegura que els blocs de construcció més petits d'una aplicació es comporten com és previst.

Un test unitari prova **una sola funció o classe** completament aïllada de les seves dependències (base de dades, API, altres mòduls). Les dependències s'**imiten** (mock) per eliminar variables externes. Cada test és independent i pot executar-se en qualsevol ordre.

**Característiques:** execució en mil·lisegons, sense dependències externes, resultat determinista (sempre el mateix resultat per als mateixos inputs).

| // La funció que volem testarfunction calcularDescompte(preu: number, usuari: { premium: boolean }): number {  if (usuari.premium) {    return preu \* 0.9;  // 10% de descompte  }  return preu;}// Tests unitaris: prova la funció en aïllamentdescribe('calcularDescompte', () \=\> {  it('aplica un 10% de descompte per a usuaris premium', () \=\> {    const resultat \= calcularDescompte(100, { premium: true });    expect(resultat).toBe(90);  });  it('no aplica descompte per a usuaris estàndard', () \=\> {    const resultat \= calcularDescompte(100, { premium: false });    expect(resultat).toBe(100);  });  it('aplica el descompte correctament amb preus decimals', () \=\> {    const resultat \= calcularDescompte(99.99, { premium: true });    expect(resultat).toBeCloseTo(89.99);  });}); |
| :---- |

**Quan usar:** per a tota la lògica de negoci (càlculs, validacions, transformacions de dades), algoritmes, utilitats i funcions pures. 

Si vols verificar què passarà quan crides la funció add amb un string en lloc d'un número, TypeScript pot servir-te molt millor usant comprovació de tipus estàtica. Cada nivell té els seus propis trade-offs.

**Tests d'Integració: múltiples components junts**

El testing d'integració verifica que dos o més components funcionen correctament junts. Mentre els tests unitaris aïllen funcions individuals, els tests d'integració comproven les connexions entre ells. 

Els tests d'integració verifiquen les "juntures" entre components: verificar contractes d'API incorrectes, incompatibilitats d'esquema de base de dades, o connexions de servei mal configurades.

Un test d'integració prova la **col·laboració entre múltiples mòduls** reals: el controlador HTTP \+ el servei \+ la base de dades de test. No s'imiten les dependències reals: s'usen les implementacions reals (o quasi-reals).

| // Test d'integració: comprova que l'endpoint i la base de dades funcionen juntsdescribe('POST /api/usuaris', () \=\> {  let app: Express;  let db: TestDatabase;  beforeEach(async () \=\> {    db \= await crearBaseDeDadesDeTest();  // BD real en memòria    app \= crearApp(db);  });  afterEach(async () \=\> {    await db.netejar();  });  it('crea un usuari i el guarda a la base de dades', async () \=\> {    const resposta \= await request(app)      .post('/api/usuaris')      .send({ nom: 'Anna', email: 'anna@exemple.com' })      .expect(201);    expect(resposta.body.id).toBeDefined();    expect(resposta.body.nom).toBe('Anna');    // Comprova que realment s'ha guardat a la BD    const usuariALaBD \= await db.usuaris.trobarPerId(resposta.body.id);    expect(usuariALaBD).not.toBeNull();    expect(usuariALaBD?.email).toBe('anna@exemple.com');  });  it('retorna 400 si el email és invàlid', async () \=\> {    await request(app)      .post('/api/usuaris')      .send({ nom: 'Gema', email: 'no-es-un-email' })      .expect(400);  });}); |
| :---- |

Els tests d'integració capturen problemes que els tests unitaris no detecten: contractes d'API incorrectes, incompatibilitats d'esquema de base de dades, o connexions de servei mal configurades. Un test d'integració invoca l'endpoint real de registre amb una base de dades real de test i verifica que tots els sistemes es coordinen correctament.

**Quan usar:** per a endpoints d'API, operacions de base de dades, interaccions entre serveis i qualsevol flux que involucri múltiples capes del sistema.

**Tests End-to-End (E2E): des de l'usuari fins al servidor**

El testing E2E valida fluxos d'usuari complets de principi a fi, exactament com un usuari real ho experimentaria. Mentre els tests d'integració comproven la comunicació entre components, els tests E2E verifiquen que tot el sistema funciona correctament a través de la interfície d'usuari real.

Els tests E2E son sobre provar la interacció de l'usuari final, però en lloc de contractar humans, s'usa una eina que simula els usuaris. 

Un runner de tests E2E executarà els tests contra tota l'aplicació usant la mateixa interfície que els usuaris finals. 

Per exemple, una aplicació web s'executa al navegador, de manera que el runner de tests E2E hauria d'interactuar amb l'aplicació usant un navegador, igual que un usuari real.

| // Test E2E amb Cypress o Playwright: simula un usuari real al navegadordescribe('Flux de login', () \=\> {  it('un usuari pot iniciar sessió i veure el seu perfil', () \=\> {    // Visita la pàgina de login (igual que un usuari real)    cy.visit('/login');    // Omple el formulari (igual que un usuari real)    cy.get('\[data-testid="email-input"\]').type('anna@exemple.com');    cy.get('\[data-testid="password-input"\]').type('contrasenya123');    cy.get('\[data-testid="login-button"\]').click();    // Verifica que ha funcionat (igual que un usuari real comprovaria)    cy.url().should('include', '/dashboard');    cy.get('\[data-testid="usuari-nom"\]').should('contain', 'Anna');    cy.get('\[data-testid="missatge-benvinguda"\]')      .should('be.visible')      .and('contain', 'Benvinguda de nou');  });  it('mostra un error si les credencials son incorrectes', () \=\> {    cy.visit('/login');    cy.get('\[data-testid="email-input"\]').type('anna@exemple.com');    cy.get('\[data-testid="password-input"\]').type('contrasenya-incorrecta');    cy.get('\[data-testid="login-button"\]').click();    cy.get('\[data-testid="error-missatge"\]')      .should('be.visible')      .and('contain', 'Email o contrasenya incorrectes');    cy.url().should('not.include', '/dashboard');  });}); |
| :---- |

Els bugs en producció rarament venen de funcions trencades. Venen d'interaccions inesperades: l'actualització de la biblioteca OAuth que va canviar el timing del refresc de tokens, la configuració CDN que serveix JavaScript antic als usuaris d'una regió específica. Els tests E2E exposen aquests conflictes perquè exerciten el flux de treball complet.

**Quan usar:** per als fluxos crítics del negoci (registre, login, checkout, pagament), per verificar que la integració de totes les capes funciona des de la perspectiva de l'usuari, i com a "smoke tests" just abans de cada desplegament.

**La distinció important: integració vs. E2E**

Sovint es confonen els tests d'integració i els E2E. Podem diferenciar-los fàcilment en que els E2E s'executen al navegador, a diferència dels d'integració.

|  | Unitaris | Integració | E2E |
| ----- | ----- | ----- | ----- |
| **Prova** | Una funció aïllada | Múltiples mòduls junts | Tot el sistema al navegador |
| **Velocitat** | Mil·lisegons | Segons | Desenes de segons |
| **Dependències** | Cap (tot imitat) | Reals o quasi-reals | Tota l'app funcionant |
| **Detecta** | Bugs de lògica | Bugs de comunicació | Bugs d'experiència |
| **Eines** | Jest, Vitest | Supertest, Jest | Cypress, Playwright |
| **Quantitat** | Molts (70%) | Alguns (20%) | Pocs (10%) |

**Què detecta cada nivell que els altres no detecten**

| Test unitari ✅ detecta:  → "La funció calcularDescompte retorna un valor incorrecte"Test d'integració ✅ detecta:  → "L'endpoint guarda correctament a la BD"  → "El format del JSON de l'API no coincideix amb el que espera el frontend"Test E2E ✅ detecta:  → "El botó de login no funciona a Safari"  → "El flux de checkout falla quan l'adreça de facturació és diferent de l'enviament"  → "La pàgina de confirmació carrega abans que el webhook de pagament confirmi" |
| :---- |

Cada tipus de test captura categories de bugs diferents. La pregunta no és quin usar sinó quanta quantitat de cada un.

