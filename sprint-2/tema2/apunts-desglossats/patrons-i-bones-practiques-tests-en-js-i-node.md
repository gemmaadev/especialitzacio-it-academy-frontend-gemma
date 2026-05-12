## **Bones pràctiques de testing en JavaScript i Node.js**

###### **JavaScript and Node.js Testing Best Practices**

[https://github.com/goldbergyoni/javascript-testing-best-practices/tree/master](https://github.com/goldbergyoni/javascript-testing-best-practices/tree/master)  
Guia pràctica amb patrons i bones pràctiques per a tests en JS i Node.js.

**La guia de referència: goldbergyoni/javascript-testing-best-practices**

La guia de Yoni Goldberg és una referència exhaustiva i pràctica del sector, actualitzada regularment. 

Organitza les bones pràctiques en categories: tests unitaris, tests de backend, tests de frontend, mesures de qualitat i CI/CD. 

El seu lema central: els tests han de ser simples, curts, declaratius i independents.

**1\. El patró AAA: Arrange, Act, Assert**

Estructura els teus tests amb 3 seccions ben separades: Arrange, Act i Assert. Seguir aquesta estructura garanteix que el lector no gasta "CPU de cervell" entenent el pla del test.

El patró AAA és simple i proporciona una estructura uniforme per a tots els tests de la suite. Aquesta estructura uniforme és un dels seus majors avantatges: un cop t'hi acostumes, pots llegir i entendre els tests molt més fàcilment.

| describe('calcularDescompte', () \=\> {  it('aplica el 10% de descompte a usuaris premium', () \=\> {    // ARRANGE: preparar tot el necessari per al test    const preu \= 100;    const usuariPremium \= { nom: 'Anna', premium: true };    // ACT: executar la unitat sota test (normalment 1 línia)    const resultat \= calcularDescompte(preu, usuariPremium);    // ASSERT: verificar el resultat (normalment 1 línia)    expect(resultat).toBe(90);  });}); |
| :---- |

Si no segueixes el patró AAA, no sols passes hores entenent el codi principal, sinó que el que hauria de ser la part més simple del dia (testar) t'estira el cervell.

**2\. Noms descriptius dels tests: el patró "Quan → Llavors"**

El nom d'un test ha de dir immediatament: quina condició s'està testejant i quin resultat s'espera. El patró recomanat és `quan [condició] → llavors [resultat esperat]`.

| // ❌ Nom poc informatiuit('test de descompte', () \=\> { });it('hauria de ser premium', () \=\> { });// ✅ Patró "Quan... llavors..." (who \+ what \+ when)it('quan l\\'usuari és premium, llavors aplica un 10% de descompte', () \=\> { });it('quan el preu és negatiu, llavors llança un error de validació', () \=\> { });it('quan el servei de pagament no respon, llavors retorna el codi d\\'error 503', () \=\> { }); |
| :---- |

La descripció del test ha d'incloure: el context o premisses (quantum el client és premium), la unitat sota test (mètode `classifyCustomer`), i el resultat esperat (es classifica com a "premium"). Sense cap d'aquests, el test és parcial.

**3\. Testar comportaments externs, no implementació interna**

Testar els detalls d'implementació crea tests fràgils que fallen quan refactoritzem sense que el comportament canviï. La regla: testa únicamente les sortides i efectes visibles des de fora, no com la funció funciona internament.

Existeixen tres tipus d'assertions: 

* **Response** (el test invoca una acció i comprova la resposta),   
* **New State** (comprova que l'estat ha canviat correctament),   
* **External Calls** (comprova que s'ha cridat un servei extern). El tipus que cal evitar és el que comprova detalls d'implementació interns.

| // ❌ MAL: comprova un detall d'implementació internait('calcula el total del carret', () \=\> {  const carret \= new CarretCompra();  carret.afegir({ nom: 'Portàtil', preu: 999 });  // Comprovem un camp intern → fràgil  expect(carret.\_nombreDeclinats).toBe(0);  // ← detall intern\!  expect(carret.productesInterns.length).toBe(1);  // ← detall intern\!});// ✅ BÉ: comprova el comportament extern (el que veu l'usuari)it('quan s\\'afegeix un producte, el total reflecteix el seu preu', () \=\> {  // Arrange  const carret \= new CarretCompra();  const producte \= { nom: 'Portàtil', preu: 999 };  // Act  carret.afegir(producte);  // Assert: comprova el resultat observable externament  expect(carret.total()).toBe(999);  expect(carret.nombre()).toBe(1);}); |
| :---- |

**4\. Assertions declaratives, no imperatives**

Escriure els tests en un llenguatge declaratiu permet al lector entendre immediatament sense executar cap cicle de "CPU de cervell". 

Quan escrius codi imperatiu ple de lògica condicional, el lector es veu forçat a usar més cicles mentals.

| // ❌ Codi imperatiu als tests (massa complex de llegir)it('no guarda transaccions declinades', () \=\> {  const transferències \= obtenirTransferències();  let trobada \= false;  for (const t of transferències) {    if (t.id \=== declinada.id) {      trobada \= true;      break;    }  }  expect(trobada).toBe(false);});// ✅ Codi declaratiu (llegible immediatament)it('no guarda transaccions declinades', async () \=\> {  // Arrange  const transaccioDeclinada \= await crearTransaccio({ estat: 'declinada' });  // Act  const transferències \= await obtenirTotes();  // Assert: declaratiu, llegible en una línea  expect(transferències).not.toContainEqual(    expect.objectContaining({ id: transaccioDeclinada.id })  );}); |
| :---- |

**5\. Tests independents: no compartir estat entre tests**

Un test és un problema de 7-10 línies, un univers petit que no comparteix res amb els altres. Quan es manté independent, curt i declaratiu, és un delit llegir-lo per un lector ocasional.

| // ❌ MAL: tests que depenen de l'ordre d'execuciólet usuariCreat: Usuari;beforeAll(async () \=\> {  usuariCreat \= await crearUsuari({ nom: 'Anna' });});it('crea l\\'usuari correctament', () \=\> {  expect(usuariCreat).toBeDefined();  // depèn del beforeAll});it('pot actualitzar el nom', async () \=\> {  // depèn que el test anterior hagi creat l'usuari\!  await actualitzarUsuari(usuariCreat.id, { nom: 'Gema' });  expect(usuariCreat.nom).toBe('Gema');});// ✅ BÉ: cada test és autònomdescribe('gestió d\\'usuaris', () \=\> {  it('crea un usuari correctament', async () \=\> {    // Arrange: cada test crea el seu propi estat    const dades \= { nom: 'Anna', email: 'anna@e.com' };    // Act    const usuari \= await crearUsuari(dades);    // Assert    expect(usuari.id).toBeDefined();    expect(usuari.nom).toBe('Anna');  });  it('actualitza el nom d\\'un usuari existent', async () \=\> {    // Arrange: crea el seu propi usuari, no depèn d'un altre test    const usuari \= await crearUsuari({ nom: 'Anna', email: 'anna@e.com' });    // Act    await actualitzarUsuari(usuari.id, { nom: 'Gema' });    const actualitzat \= await obtenirUsuari(usuari.id);    // Assert    expect(actualitzat.nom).toBe('Gema');  });}); |
| :---- |

**6\. Quan usar mocks: la pregunta fonamental**

Abans d'usar mocks, fes-te una pregunta molt simple: l'estic usant per testar funcionalitat que apareix, o podria aparèixer, al document de requisits? Si no, és un "olor de testing de caixa blanca".

| // ✅ Mock justificat: el comportament forma part dels requisitsit('envia un email quan el pagament falla', async () \=\> {  // Arrange: stubbem el servei de pagament perquè retorni un error  jest.spyOn(serveiPagament, 'cobrar')    .mockRejectedValue(new Error('Connexió refusada'));  const mockEnviarEmail \= jest.spyOn(serveiEmail, 'enviar');  // Act  await processarComanda(comanda);  // Assert: comportament extern visible (apareix als requisits)  expect(mockEnviarEmail).toHaveBeenCalledWith(    expect.objectContaining({ assumpte: 'Error de pagament' })  );});// ❌ Mock NO justificat: detall d'implementacióit('usa la funció interna calculateVATAdd', () \=\> {  const spy \= jest.spyOn(servei, 'calculateVATAdd');  // ← detall intern\!  servei.calcularPreu(100);  expect(spy).toHaveBeenCalled();  // ← no és un requisit de negoci}); |
| :---- |

Únicament imita les dependències de menor nivell i les operacions d'E/S, com crides a bases de dades, crides a APIs o crides a altres serveis.

**7\. Testar les entrades de producció realistes**

Usa dades realistes en els tests. Els tests amb entrades com "Foo" passaran en development, però en producció fallaran quan un hacker passi un string com `"@3e2ddsf . ##' 1 fdsfds"`.

| // ❌ Dades poc realistesit('processa el nom d\\'usuari', () \=\> {  expect(validarNom('Foo')).toBe(true);  expect(validarNom('A')).toBe(false);});// ✅ Dades realistes que cobreixen casos límitit('accepta noms amb caràcters especials vàlids', () \=\> {  // Noms reals d'usuaris amb caràcters especials esperats  expect(validarNom('María José')).toBe(true);  expect(validarNom("O'Brien")).toBe(true);  expect(validarNom('Müller')).toBe(true);});it('rebutja entrades potencialment malicioses', () \=\> {  expect(validarNom('\<script\>alert("xss")\</script\>')).toBe(false);  expect(validarNom("'; DROP TABLE users; \--")).toBe(false);}); |
| :---- |

**8\. Testeja les 5 categories de sortida**

Quan el test dispara una acció (per exemple, una crida a l'API), una reacció ocorre. Les sortides o reaccions es poden classificar en 5 categories: 

1. **Response** (el resultat retornat directament)   
2. **New State** (l'estat que ha canviat)  
3. **External Calls** (crides a serveis externs)  
4. **Errors** (errors llançats en casos incorrectes)   
5. **Events/Metrics** (events i mètriques disparats)

| describe('processarComanda', () \=\> {  it('retorna la confirmació de la comanda', async () \=\> {    const confirmació \= await processarComanda(comanda);    expect(confirmació.id).toBeDefined();         // ← Categoria: Response  });  it('guarda la comanda a la base de dades', async () \=\> {    await processarComanda(comanda);    const guardada \= await db.comandes.trobar(comanda.id);    expect(guardada).not.toBeNull();              // ← Categoria: New State  });  it('notifica el servei d\\'inventari', async () \=\> {    const spyInventari \= jest.spyOn(serveiInventari, 'reduirEstoc');    await processarComanda(comanda);    expect(spyInventari).toHaveBeenCalled();      // ← Categoria: External Call  });  it('llança error si el pagament falla', async () \=\> {    jest.spyOn(serveiPagament, 'cobrar').mockRejectedValue(new Error());    await expect(processarComanda(comanda)).rejects.toThrow(); // ← Errors  });}); |
| :---- |

**Les regles d'or de goldbergyoni**

| Pràctica | Resum |
| ----- | ----- |
| **Patró AAA** | Arrange → Act → Assert en seccions separades |
| **Noms descriptius** | "Quan \[condició\] → llavors \[resultat\]" |
| **Comportament, no implementació** | Testa el quèfa, no el comfa |
| **Assertions declaratives** | `expect(x).toBe(y)`, no bucles ni condicionals |
| **Tests independents** | Cap test depèn d'un altre test |
| **Mocks justificats** | Únicamente si el comportament és un requisit |
| **Dades realistes** | Usa inputs del món real, no "Foo" |
| **5 categories de sortida** | Response, State, External, Errors, Events |

