## **Mocking en tests: conceptes i aplicació**

**Què és el mocking i per què existeix**

Els mocks son implementacions falses d'objectes reals que pots usar als tests unitaris per simular comportaments o respostes específiques. Usant mocks, pots aïllar dependències, testar components individuals sense afectar la resta del sistema, i fer els tests més eficients i fiables.

El problema que resol: una funció que envia emails, fa peticions HTTP o llegeix de la base de dades no es pot testar de manera aïllada sense efectes secundaris. Si el test envia emails reals, falla per connexió o triga 3 segons, el test és inútil. El mocking substitueix aquelles dependències per versions falses i controlades.

**Els tres conceptes: Mock, Stub i Spy**

1. **Mocking** és quan substitueixes la implementació d'una funció, servei o altre element per una operació no-op, i retornes null o 0\. S'usa sovint per eliminar dependències externes com crides HTTP o l'enviament a un framework de logging.   
   Tècnicament, els mocks no fan cap càlcul ni retornen dades reals. Son la unitat més simple possible, i s'usen per reemplaçar efectes secundaris.   
2. **Stubbing** és com el mocking, però la funció de reemplaçament pot tenir una mica de lògica i pot retornar dades reals i útils. 

3. **Spying**, a diferència del mocking o l'stubbing, no reemplaça la implementació per defecte del codi. Generalment s'usa per verificar que un mètode és cridat amb els paràmetres correctes i el nombre de vegades correcte.

En la pràctica amb Jest, la distinció és sovint semàntica: `jest.fn()` pot fer-ho tot.

**`jest.fn()`: la funció mock bàsica**

Les funcions mock son també conegudes com a "espies" (spies), perquè et permeten espiar el comportament d'una funció que és cridada indirectament per algun altre codi, en lloc de únicament testar la sortida. Pots crear una funció mock amb `jest.fn()`. Si no es proporciona cap implementació, la funció mock retornarà `undefined` quan és invocada.

Usant funcions mock, podem saber: el nombre de crides que ha rebut, els valors dels arguments usats en cada invocació, el context o valor `this` en cada invocació, i com ha sortit la funció i quins valors s'han produït.

| // Crear una funció mock bàsicaconst mockEnviarEmail \= jest.fn();// Cridar-lamockEnviarEmail('anna@e.com', 'Benvinguda\!');mockEnviarEmail('gema@e.com', 'Confirmació');// Espiar el seu comportamentexpect(mockEnviarEmail).toHaveBeenCalledTimes(2);expect(mockEnviarEmail).toHaveBeenCalledWith('anna@e.com', 'Benvinguda\!');expect(mockEnviarEmail).toHaveBeenLastCalledWith('gema@e.com', 'Confirmació');// Definir un valor de retornconst mockCalcTotal \= jest.fn().mockReturnValue(100);expect(mockCalcTotal()).toBe(100);// Definir un valor de retorn per a una sola cridaconst mockAssinc \= jest.fn()  .mockResolvedValueOnce({ id: 1, nom: 'Anna' })  // primera crida  .mockRejectedValueOnce(new Error('API Error'));   // segona crida |
| :---- |

**`jest.mock()`: imitar un mòdul complet**

La manera més habitual de fer mocking: substituir tot un mòdul per una versió controlada:

| // servei-email.ts (el mòdul real)export async function enviarEmail(a: string, missatge: string): Promise\<void\> {  await fetch('/api/email', { method: 'POST', body: JSON.stringify({ a, missatge }) });}// usuari-service.ts (el que volem testar)import { enviarEmail } from './servei-email';export async function registrarUsuari(nom: string, email: string) {  // lògica de registre...  await enviarEmail(email, \`Benvingut/da, ${nom}\!\`);  // efecte secundari}// usuari-service.test.tsimport { registrarUsuari } from './usuari-service';import { enviarEmail } from './servei-email';// Substituïm el mòdul sencer per un mockjest.mock('./servei-email', () \=\> ({  enviarEmail: jest.fn().mockResolvedValue(undefined)}));describe('registrarUsuari', () \=\> {  it('envia un email de benvinguda en registrar-se', async () \=\> {    await registrarUsuari('Anna', 'anna@exemple.com');    // Verifiquem que el mock ha estat cridat correctament    expect(enviarEmail).toHaveBeenCalledWith(      'anna@exemple.com',      'Benvingut/da, Anna\!'    );    expect(enviarEmail).toHaveBeenCalledTimes(1);  });  it('no envia email si el registre falla', async () \=\> {    // Simula que el registre falla    // ...    expect(enviarEmail).not.toHaveBeenCalled();  });}); |
| :---- |

**`jest.spyOn()`: espiar sense substituir**

Per defecte, `jest.spyOn` també crida el mètode espiat. Això és un comportament diferent de la majoria d'altres biblioteques de test. Si vols sobreescriure la funció original, pots usar `jest.spyOn(objecte, nomMetode).mockImplementation(() => implementacioPersonalitzada)`.

| import \* as calculs from './calculs';describe('spyOn: observar sense substituir', () \=\> {  it('verifica que suma és cridada amb els arguments correctes', () \=\> {    const spySuma \= jest.spyOn(calculs, 'suma');    const resultat \= calculs.suma(2, 3);  // crida la funció REAL    expect(resultat).toBe(5);               // la funció real retorna 5    expect(spySuma).toHaveBeenCalledWith(2, 3); // però espionem la crida  });  it('amb mockImplementation: substitueix la implementació real', () \=\> {    const spy \= jest.spyOn(calculs, 'suma')      .mockImplementation(() \=\> 99);  // ara retorna 99 en lloc del resultat real    const resultat \= calculs.suma(2, 3);    expect(resultat).toBe(99);  // la funció real NO s'executa  });  afterEach(() \=\> {    jest.restoreAllMocks();  // restaura la implementació real  });}); |
| :---- |

**Situacions on el mocking és útil**

**1\. Crides HTTP i APIs externes:**

| // No volem fer peticions reals als testsglobal.fetch \= jest.fn().mockResolvedValue({  ok: true,  json: jest.fn().mockResolvedValue({ id: 1, nom: 'Anna' })});it('obté les dades de l\\'usuari', async () \=\> {  const usuari \= await obtenirUsuari(1);  expect(usuari.nom).toBe('Anna');  expect(fetch).toHaveBeenCalledWith('/api/usuaris/1');}); |
| :---- |

**2\. Temps i dates:**

| // El temps real fa els tests no-deterministesjest.spyOn(Date, 'now').mockReturnValue(1704067200000);  // 1 Jan 2024it('calcula la data de caducitat correctament', () \=\> {  const caducitat \= calcularCaducitat(30);  // 30 dies des d'ara  expect(caducitat).toEqual(new Date('2024-01-31'));}); |
| :---- |

**3\. Mòduls externs (nodemailer, stripe, etc.):**

| jest.mock('stripe', () \=\> ({  charges: {    create: jest.fn().mockResolvedValue({ id: 'ch\_test\_123', status: 'succeeded' })  }})); |
| :---- |

**4\. Simular errors i casos d'error:**

| it('gestiona correctament errors de la BD', async () \=\> {  mockRepositori.guardar.mockRejectedValueOnce(    new Error('Connexió a la BD perduda')  );  await expect(crearUsuari(dades)).rejects.toThrow('Connexió a la BD perduda');}); |
| :---- |

**TypeScript i mocking: tipar els mocks**

Escrivint tests en TypeScript? Usa el tipus `jest.Mocked` o el mètode helper `jest.mocked()` per tenir els mòduls mockats tipats.

| import { usuariService } from './usuari-service';jest.mock('./usuari-service');// Opció A: helper jest.mocked() (recomanada, TypeScript modern)const mockService \= jest.mocked(usuariService);mockService.trobarPerId.mockResolvedValue({ id: 1, nom: 'Anna' });// Opció B: type assertionconst mockService \= usuariService as jest.Mocked\<typeof usuariService\>;mockService.trobarPerId.mockResolvedValue({ id: 1, nom: 'Anna' }); |
| :---- |

**Netejar els mocks: `beforeEach` i `afterEach`**

Entre execucions de tests necessitem que els mocks/spies siguin resetejats per que les assertions no fallin a causa de crides antigues d'un test anterior.

| describe('test suite amb mocks', () \=\> {  beforeEach(() \=\> {    jest.clearAllMocks();    // neteja crides, instàncies i resultats    // jest.resetAllMocks(); // neteja \+ elimina la implementació    // jest.restoreAllMocks(); // restaura les implementacions originals (spyOn)  });  it('test A', () \=\> { /\* ... \*/ });  it('test B: no veu les crides de test A', () \=\> { /\* ... \*/ });}); |
| :---- |

**Quan NO usar mocking**

El mocking no és sempre la solució. Quan imites massa coses, els tests deixen de reflectir la realitat i pots tenir tests que passen però el codi real falla.

La regla: imita el que necessites per aïllar la unitat que estàs testejant. No imites el que forma part de la lògica que vols verificar. No imites funcions pures que no tenen efectes secundaris.

**Les tres eines de mocking en Jest**

| Eina | Quan usar | Substitueix la implementació? |
| ----- | ----- | ----- |
| `jest.fn()` | Crear un mock des de zero | Sí (no-op per defecte) |
| `jest.mock('modul')` | Imitar un mòdul complet | Sí (tot el mòdul) |
| `jest.spyOn(obj, 'metode')` | Observar/modificar un mètode existent | Opcional (per defecte no) |

