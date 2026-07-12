**Com afecta la simulació d'interaccions completes (vs. events aïllats) la fiabilitat dels tests?**

## **El problema: el Browser fa molt més que disparar un sol event**

El problema amb `fireEvent` és que el browser normalment fa molt més que simplement disparar un event per una interacció. 

Quan un usuari clica un botó en un browser real, no únicament ocorre un event `click` — ocorre una **seqüència completa d'events**.

| INTERACCIÓ REAL DE L'USUARI quan clica un botó:  pointerover → pointerenter → mouseover → mouseenter  → pointermove → mousemove  → pointerdown → mousedown → focus  → pointerup → mouseup  → clickINTERACCIÓ REAL DE L'USUARI quan escriu en un input:  Per cada lletra: focus → keydown → keypress → input → keyup  → i si hi ha composició (accents, emojis): compositionstart → compositionupdate → compositionendfireEvent.click(button) → dispara ÚNICAMENT: clickuserEvent.click(button) → dispara TOTA la seqüència anterior |
| :---- |

**`fireEvent`: events aïllats de baix nivell**

`fireEvent` és un wrapper lleuger al voltant de l'API `dispatchEvent` de baix nivell del browser, que permet als developers disparar qualsevol event en qualsevol element. 

El problema és que el browser normalment fa molt més que disparar un sol event per una interacció.

| import { render, screen, fireEvent } from '@testing-library/react';// fireEvent: dispara ÚNICAMENT l'event especificattest('amb fireEvent: canvia el valor de l\\'input', () \=\> {  render(\<FormulariLogin /\>);  const input \= screen.getByLabelText('Email');  fireEvent.change(input, { target: { value: 'anna@e.com' } });  // → Dispara ÚNICAMENT onChange  // → NO dispara: focus, keydown, keypress, keyup  // → NO comprova si l'input és realment editable (podria estar disabled\!)  // → NO comprova si és visible  expect(input).toHaveValue('anna@e.com');  // ← El test passa, però hem evitat tota la validació real\!});// El problema CRÍTIC:test('fireEvent no detecta que el camp és disabled', () \=\> {  render(\<input disabled onChange={jest.fn()} /\>);  // fireEvent.change funcionarà fins i tot en un camp disabled\!  fireEvent.change(screen.getByRole('textbox'), {    target: { value: 'text' }  });  // → L'event s'ha disparat manualment  // → Un usuari REAL no podria fer-ho → test és un fals positiu\!}); |
| :---- |

**`userEvent`: interaccions completes i realistes**

`userEvent` és una biblioteca companion per a Testing Library que simula interaccions d'usuari disparant els events que ocorrerien si la interacció tingués lloc en un browser. 

`userEvent` simula interaccions completes, que poden disparar múltiples events i fer verificacions addicionals al llarg del camí.

| import userEvent from '@testing-library/user-event';import { render, screen } from '@testing-library/react';// userEvent: sempre inicialitzar amb setup() (v14+)test('amb userEvent: interacció completa i realista', async () \=\> {  const user \= userEvent.setup();  render(\<FormulariLogin /\>);  const input \= screen.getByLabelText('Email');  // userEvent.type: simula la seqüència COMPLETA de tecleig  await user.type(input, 'anna@e.com');  // Per cada caràcter dispara: focus → keydown → keypress → input → keyup  // A més verifica:  // → Que l'input és visible  // → Que l'input NO és disabled  // → Que l'input NO és read-only  // → Que l'input pot rebre focus  expect(input).toHaveValue('anna@e.com');});// userEvent detecta problemes que fireEvent no detectaria:test('userEvent detecta el camp disabled correctament', async () \=\> {  const user \= userEvent.setup();  render(\<input disabled /\>);  // userEvent.type fallarà si l'input és disabled → detecta el problema\!  await user.type(screen.getByRole('textbox'), 'text');  // → El test falla → el developer descobreix que el camp és disabled  // → fireEvent hauria deixat passar aquest bug silenciosament}); |
| :---- |

**El cas concret: Click amb focus**

Un dels casos més clars on la diferència importa:

| // Component que necessita focus ABANS de procesar el clickfunction BotoAmbFocus() {  const \[actiu, setActiu\] \= useState(false);  const \[enFocus, setEnFocus\] \= useState(false);  const handleClick \= () \=\> {    // Únicament processa el click si l'element té focus    if (enFocus) setActiu(true);  };  return (    \<button      onFocus={() \=\> setEnFocus(true)}      onBlur={() \=\> setEnFocus(false)}      onClick={handleClick}    \>      {actiu ? 'Actiu' : 'Inactiu'}    \</button\>  );}test('amb fireEvent → FALS NEGATIU: no detecta el problema real', () \=\> {  render(\<BotoAmbFocus /\>);  const boto \= screen.getByRole('button');  fireEvent.click(boto);  // → fireEvent dispara únicament click  // → NO dispara focus primer  // → enFocus segueix a false → handleClick no fa res  // → El test veurà 'Inactiu' i dirà "funciona" (però el bug és ocult\!)  expect(screen.getByText('Inactiu')).toBeInTheDocument();  // ← Test passa però no sabem si el botó funciona realment\!});test('amb userEvent → detecta el comportament REAL', async () \=\> {  const user \= userEvent.setup();  render(\<BotoAmbFocus /\>);  await user.click(screen.getByRole('button'));  // → userEvent dispara: mouseover → mousemove → mousedown → FOCUS → mouseup → click  // → onFocus s'activa → enFocus=true → handleClick funciona  // → El botó es marca com 'Actiu'  expect(screen.getByText('Actiu')).toBeInTheDocument();  // ← Test verificat correctament\!}); |
| :---- |

**L'exemple complet: formulari amb validació**

| // Component: formulari amb validació en temps realfunction FormulariRegistre() {  const \[email, setEmail\] \= useState('');  const \[errorEmail, setErrorEmail\] \= useState('');  const \[tocat, setTocat\] \= useState(false);  const validarEmail \= (valor: string) \=\> {    if (\!valor.includes('@')) setErrorEmail('Email invàlid');    else setErrorEmail('');  };  return (    \<form\>      \<label htmlFor="email"\>Email\</label\>      \<input        id="email"        value={email}        onChange={(e) \=\> { setEmail(e.target.value); validarEmail(e.target.value); }}        onFocus={() \=\> setTocat(true)}        onBlur={() \=\> validarEmail(email)}      /\>      {tocat && errorEmail && \<span role="alert"\>{errorEmail}\</span\>}      \<button type="submit" disabled={\!\!errorEmail}\>Registra\</button\>    \</form\>  );}// ❌ AMB fireEvent: test incomplet, no detecta comportaments realstest('fireEvent: validació d\\'email', () \=\> {  render(\<FormulariRegistre /\>);  // fireEvent.change: dispara onChange però NO dispara onFocus  fireEvent.change(screen.getByLabelText('Email'), {    target: { value: 'emailinvalid' }  });  // 'tocat' segueix a false perquè onFocus no s'ha disparat\!  // L'error no apareix tot i que l'email és invàlid  expect(screen.queryByRole('alert')).not.toBeInTheDocument();  // ← Test passa però el comportament real és incorrecte\!});// ✅ AMB userEvent: test complert i realistatest('userEvent: validació d\\'email completa', async () \=\> {  const user \= userEvent.setup();  render(\<FormulariRegistre /\>);  const inputEmail \= screen.getByLabelText('Email');  // 1\. L'usuari clica l'input (focus)  await user.click(inputEmail);  // → Dispara: focus → setTocat(true)  // 2\. L'usuari escriu un email invàlid (cada lletra dispara events)  await user.type(inputEmail, 'emailinvalid');  // → Cada tecla: keydown → keypress → input (onChange) → keyup  // 3\. L'usuari surt del camp (blur)  await user.tab();  // → Dispara: blur → validarEmail → setErrorEmail  // 4\. L'error hauria d'apareixer (com veuria l'usuari real)  expect(screen.getByRole('alert')).toHaveTextContent('Email invàlid');  expect(screen.getByRole('button', { name: /registra/i })).toBeDisabled();}); |
| :---- |

**`userEvent.setup()`: la inicialització correcta**

| // ✅ RECOMANAT: setup() abans del render (userEvent v14+)test('formulari complet', async () \=\> {  const user \= userEvent.setup();  // → Crea una instància que comparteix l'estat de la sessió d'usuari  // → Recomanat cridar ABANS del render  render(\<FormulariLogin /\>);  await user.type(screen.getByLabelText('Email'), 'anna@e.com');  await user.type(screen.getByLabelText('Password'), 'Contrasenya123\!');  await user.click(screen.getByRole('button', { name: /inicia sessió/i }));  expect(screen.getByText('Benvinguda, Anna\!')).toBeVisible();});// Funció helper per a múltiples tests:function setup(jsx: React.ReactElement) {  return {    user: userEvent.setup(),    ...render(jsx),  };}test('amb setup helper', async () \=\> {  const { user } \= setup(\<FormulariLogin /\>);  await user.click(screen.getByRole('button', { name: /inicia sessió/i }));  // ...}); |
| :---- |

**Quan usar `fireEvent` (els casos excepcionals)**

Hi ha, però, algunes interaccions d'usuari o aspectes que encara no estan implementats en userEvent. En aquests casos pots usar `fireEvent` per disparar els events concrets en els que el teu software es recolza.

| // ✅ fireEvent és adequat quan:// 1\. Necessites testejar un event específic SENSE els seus events adjacentsfireEvent.focus(input);// → Testejar únicament el comportament d'onFocus aïlladament// → Si usessis userEvent.click() obtindries focus \+ click \+ altres events// 2\. Events personalitzats (no coberts per userEvent)fireEvent(element, new CustomEvent('mysticalevent'));// 3\. Events de baix nivell molt específicsfireEvent.scroll(window, { target: { scrollY: 100 } });// 4\. Quan userEvent té problemes amb timers o async complexfireEvent.dragOver(dropZone, { dataTransfer: { types: \['text/plain'\] } });// La regla:// → userEvent SEMPRE que sigui possible// → fireEvent únicament en casos excepcionals molt específics |
| :---- |

**Resum**

| Aspecte | `fireEvent` | `userEvent` |
| ----- | ----- | ----- |
| **Events disparats** | UN sol event | Seqüència COMPLETA |
| **Comprova disabled** | ❌ No | ✅ Sí |
| **Comprova visible** | ❌ No | ✅ Sí |
| **Dispara focus** | ❌ No automàticament | ✅ Sí |
| **Simula tecleig** | Canvi directe | Keydown→keypress→input→keyup |
| **Realisme** | ❌ Baix | ✅ Alt |
| **Async** | Síncrono | Asíncron (await) |
| **Falsos positius** | ❌ Possible | ✅ Menys probable |
| **Fiabilitat tests** | ❌ Menor | ✅ Major |
| **Quan usar** | Casos excepcionals | Per defecte sempre |

  → Usa SEMPRE userEvent per defecte  
  → Usa fireEvent ÚNICAMENT per a casos molt específics on  
    userEvent no cobreix la funcionalitat necessària

El principi:  
  "Com més s'assembla la teva simulació a la interacció real  
   de l'usuari, més confiança et dona el test"  
  → fireEvent simula un event → confiança parcial  
  → userEvent simula la interacció completa → confiança real

