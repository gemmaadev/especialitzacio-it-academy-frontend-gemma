## **Clean Code JavaScript: Guia de Bones Pràctiques**

**JavaScript Clean Code Guidelines**   
[https://github.com/ryanmcdermott/clean-code-javascript](https://github.com/ryanmcdermott/clean-code-javascript)  
Bones pràctiques de codi net aplicades a JavaScript, amb exemples clars.

**Per què importa el codi net?**

La qualitat del codi es mesura pel nombre de vegades que dius "WTF?" mentre el llegeixes. El codi net no és el que funciona: és el que es pot llegir, reutilitzar i refactoritzar. Cada peça de codi comença com un primer esborrany. El que el fa net és el procés de revisar-lo i eliminar les imperfeccions.

**Variables: noms que s'expliquen sols**

**Usa noms significatius i pronunciables:**

| // ❌ Mal: críptic i impronunciableconst yyyymmdstr \= moment().format('YYYY/MM/DD');const l \= locations\[0\];// ✅ Bé: clar i llegibleconst dataActual \= moment().format('YYYY/MM/DD');const primeraCiutat \= locations\[0\]; |
| :---- |

**Usa el mateix vocabulari per al mateix concepte:**

| // ❌ Mal: tres noms per a la mateixa cosa confon l'equipgetUserInfo();getClientData();getCustomerRecord();// ✅ Bé: un sol nom consistentgetUser(); |
| :---- |

**Usa noms cercables, no valors màgics:**

| // ❌ Mal: qui sap per a quèserveix 86400000?setTimeout(blastOff, 86400000);// ✅ Bé: el nom explica el valorconst MILLISECONDS\_PER\_DAY \= 60 \* 60 \* 24 \* 1000;setTimeout(blastOff, MILLISECONDS\_PER\_DAY); |
| :---- |

**Usa variables explicatives:**

| // ❌ Mal: \[1\] i \[2\] no diuen ressaveCityZipCode(  address.match(cityZipCodeRegex)\[1\],  address.match(cityZipCodeRegex)\[2\]);// ✅ Bé: desestructurar amb noms descriptiusconst \[\_, city, zipCode\] \= address.match(cityZipCodeRegex) || \[\];saveCityZipCode(city, zipCode); |
| :---- |

**Evita el mapeig mental:**

| // ❌ Mal: l'variable d'una sola lletra s'oblida fàcilmentlocations.forEach(l \=\> {  // 50 línies de codi...  dispatch(l);  // ← quèés l?});// ✅ Bé: el nom és explícit en tot momentlocations.forEach(location \=\> {  // 50 línies de codi...  dispatch(location);}); |
| :---- |

**Evita el context redundant:**

| // ❌ Mal: Car.carMake → "cotxe.cotxeMarca" és redundantconst Car \= { carMake: 'Honda', carModel: 'Accord', carColor: 'Blue' };// ✅ Bé: el context ja el proporciona l'objecteconst Car \= { make: 'Honda', model: 'Accord', color: 'Blue' }; |
| :---- |

**Usa paràmetres per defecte en lloc de condicions:**

| // ❌ Mal: condicions per a valors per defectefunction createMicrobrewery(name) {  const breweryName \= name || 'Hipster Brew Co.';}// ✅ Bé: paràmetre per defecte directefunction createMicrobrewery(name \= 'Hipster Brew Co.') {  // ...} |
| :---- |

**Funcions: la regla del "fa una sola cosa"**

La regla més important en enginyeria de software: una funció hauria de fer una sola cosa. Quan una funció fa més d'una cosa, és més difícil de compondre, testar i entendre.

**Màxim 2 arguments, preferiblement 1:**

| // ❌ Mal: 4 arguments, difícil de recordar l'ordrefunction createMenu(title, body, buttonText, cancellable) { }createMenu('Foo', 'Bar', 'Baz', true);// ✅ Bé: un objecte amb desestructuraciófunction createMenu({ title, body, buttonText, cancellable }) { }createMenu({  title: 'Foo',  body: 'Bar',  buttonText: 'Baz',  cancellable: true}); |
| :---- |

**Una funció, una acció:**

| // ❌ Mal: fa dues coses (filtrar i enviar emails)function emailClients(clients) {  clients.forEach(client \=\> {    const clientRecord \= database.lookup(client);    if (clientRecord.isActive()) {      email(client);    }  });}// ✅ Bé: cada funció fa una cosafunction emailActiveClients(clients) {  clients.filter(isActiveClient).forEach(email);}function isActiveClient(client) {  return database.lookup(client).isActive();} |
| :---- |

**El nom de la funció ha de dir el que fa:**

| // ❌ Mal: addToDate no diu quèafegeixfunction addToDate(date, month) { }addToDate(date, 1);// ✅ Bé: el nom és completament explícitfunction addMonthToDate(month, date) { }addMonthToDate(1, date); |
| :---- |

**Un sol nivell d'abstracció per funció:**

| // ❌ Mal: barreja tres nivells d'abstracció en una sola funciófunction parseBetterJSAlternative(code) {  // tokenització  // parsing  // generació AST  // tot barrejat}// ✅ Bé: cada nivell d'abstracció és una funció separadafunction parseBetterJSAlternative(code) {  const tokens \= tokenize(code);       // nivell alt  const syntaxTree \= parse(tokens);    // nivell alt  syntaxTree.forEach(node \=\> { });}function tokenize(code) { /\* nivell baix \*/ }function parse(tokens) { /\* nivell baix \*/ } |
| :---- |

**No usar flags com a paràmetres:**

| // ❌ Mal: un flag com a paràmetre indica que fa dues cosesfunction createFile(name, temp) {  if (temp) {    fs.create(\`./temp/${name}\`);  } else {    fs.create(name);  }}// ✅ Bé: dues funcions amb noms descriptiusfunction createFile(name) { fs.create(name); }function createTempFile(name) { fs.create(\`./temp/${name}\`); } |
| :---- |

**Evitar efectes secundaris:**

| // ❌ Mal: la funció modifica una variable fora del seu scopelet nom \= 'Ryan McDermott';function splitIntoFirstAndLastName() {  nom \= nom.split(' ');  // ← efecte secundari: modifica variable externa}splitIntoFirstAndLastName();console.log(nom);  // \['Ryan', 'McDermott'\] ← sorpresa\!// ✅ Bé: la funció rep i retorna, no modifica res externfunction splitIntoFirstAndLastName(name) {  return name.split(' ');}const nom \= 'Ryan McDermott';const nouNom \= splitIntoFirstAndLastName(nom);console.log(nom);    // 'Ryan McDermott' ← intacteconsole.log(nouNom); // \['Ryan', 'McDermott'\] |
| :---- |

**No escriure en funcions globals (evitar la contaminació):**

| // ❌ Mal: modificar el prototype natiu contamina el globalArray.prototype.diff \= function diff(comparisonArray) {  const hash \= new Set(comparisonArray);  return this.filter(elem \=\> \!hash.has(elem));};// ✅ Bé: crear una classe que estén la funcionalitatclass SuperArray extends Array {  diff(comparisonArray) {    const hash \= new Set(comparisonArray);    return this.filter(elem \=\> \!hash.has(elem));  }} |
| :---- |

**Condicionals: simplificació**

**Usar condicionals explicatius:**

| // ❌ Mal: la condició no s'explicaif (fsm.state \=== 'fetching' && isEmpty(listNode)) { }// ✅ Bé: la variable explica el propòsitconst shouldShowSpinner \= fsm.state \=== 'fetching' && isEmpty(listNode);if (shouldShowSpinner) { } |
| :---- |

**Evitar la negació:**

| // ❌ Mal: el cervell treballa més per processar negacions doblesif (\!isDOMNodeNotPresent(node)) { }// ✅ Bé: condició positiva i claraif (isDOMNodePresent(node)) { } |
| :---- |

**Preferir polimorfisme als switch:**

| // ❌ Mal: cada nou tipus requereix modificar la funció (viola OCP)function makeAnimalSound(animal) {  switch (animal.type) {    case 'cow': return 'muu';    case 'dog': return 'guau';    case 'cat': return 'miau';  }}// ✅ Bé: cada classe implementa el seu propi comportamentclass Cow { makeSound() { return 'muu'; } }class Dog { makeSound() { return 'guau'; } }class Cat { makeSound() { return 'miau'; } }function makeAnimalSound(animal) {  return animal.makeSound();} |
| :---- |

**Testing: proves per a cada branca del codi**

Tenir tests és el que et dóna la confiança per refactoritzar. Sense tests, cada canvi és un salt al buit. Apunta al 100% de cobertura per a codi crític.

| // ❌ Mal: sense test, no saps si funcionafunction adder(a, b) { return a \+ b; }// ✅ Bé: test que documenta el comportament esperatimport assert from 'assert';describe('adder', () \=\> {  it('suma dos nombres positius', () \=\> {    assert.strictEqual(adder(2, 3), 5);  });  it('suma nombres negatius', () \=\> {    assert.strictEqual(adder(\-1, \-2), \-3);  });}); |
| :---- |

**Gestió d'errors: mai silencis**

| // ❌ Mal: catch buit, l'error desapareix silenciosamenttry {  funcionQuePodenFallar();} catch (error) {  console.log(error);  // millor que res, però insuficient}// ✅ Bé: gestionar l'error correctamenttry {  funcionQuePodenFallar();} catch (error) {  notifyUserOfError(error);   // avisar a l'usuari  reportErrorToService(error); // reportar al servei de monitoratge} |
| :---- |

**Comentaris: el codi s'ha d'explicar sol**

Usa comentaris únicament per a les coses que el codi no pot expressar per si sol. Els bons comentaris expliquen el **per quèés**, no el **quèés**.

| // ❌ Mal: el comentari diu el mateix que el codi// Incrementa i en 1i++;// ✅ Bé: el comentari explica el "per quèés"// Usem parseInt en lloc de parseFloat perquè les IDs sempre// son enters i parseFloat pot causar problemes amb notació científicaconst userId \= parseInt(req.params.id, 10);// ✅ Bé: comentar una decisió tècnica no òbvia// Hem de fer polling cada 500ms perquè l'API externa no suporta// websockets ni Server-Sent Events en el pla gratuïtsetInterval(syncData, 500); |
| :---- |

**Elimina el codi comentat:**

| // ❌ Mal: codi mort comentat que ningú elimina// doStuff();// const result \= calculateSomething(x, y);// if (result \> 0\) { }// ✅ Bé: elimina'l. Git guarda l'historial si cal recuperar-lo |
| :---- |

**Resum: les regles d'or**

| Regla | Principi |
| ----- | ----- |
| Noms descriptius i pronunciables | "El codi es llegeix més que s'escriu" |
| Un sol nivell d'abstracció per funció | SRP — cada funció fa una cosa |
| Màxim 2 paràmetres per funció | Usa un objecte si necessites més |
| No flags com a paràmetres | Indica que la funció fa dues coses |
| Evitar efectes secundaris | Les funcions pures són predictibles i testables |
| No modificar tipus natius | Contamines el scope global |
| Condicionals explicatius amb variables | El codi documenta la intenció |
| Tests per a codi crític | La confiança per refactoritzar |
| Catch mai buit | Errors silenciosos \= bugs invisibles |
| Eliminar codi mort | Git guarda l'historial |

