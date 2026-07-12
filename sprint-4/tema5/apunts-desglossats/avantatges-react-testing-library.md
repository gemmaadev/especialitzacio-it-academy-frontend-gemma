**Quins avantatges ofereix React Testing Library sobre altres biblioteques com Enzyme?**

La gran diferència entre les dues biblioteques és l'**enfocament del testing**. 

Amb Enzyme, tens accés als props, state i fills dels components React renderitzats. Pots llegir i establir l'estat per testejar el comportament del component depenent dels inputs, i com a resultat, els tests s'escriuen des de la perspectiva del developer. 

React Testing Library testa la UI des de "fora": treballa sobre els nodes DOM renderitzats, i per tant pots escriure tests que es comporten com l'usuari ho faria.

ENZYME:  
  Perspectiva del DEVELOPER  
  → "El component té un estat 'loading' a true?"  
  → "El mètode handleSubmit s'ha cridat?"  
  → Accés a props, state, instàncies, lifecycle methods

REACT TESTING LIBRARY:  
  Perspectiva de l'USUARI  
  → "L'usuari veu el spinner de càrrega?"  
  → "Quan l'usuari clica Enviar, apareix el missatge d'èxit?"  
  → Accés únicament al DOM renderitzat

**Enzyme és pràcticament abandonat**

React Testing Library és el guanyador clar el 2025\. Enzyme bàsicament no té manteniment i no suporta correctament les funcionalitats de React 18+. Enzyme va ser creat per Airbnb. L'última versió (v3.11) data de 2019, i no té suport oficial per a React 17, 18 ni 19\.

Enzyme:  
  Creat per: Airbnb  
  Última versió estable: 3.11 (2019)  
  Suport React 18: ❌ No oficial  
  Suport React 19: ❌ No  
  Manteniment: ❌ Pràcticament abandonat

React Testing Library:  
  Creat per: Kent C. Dodds  
  Versió actual: activa i mantinguda  
  Suport React 18: ✅ Complet  
  Suport React 19: ✅ Complet  
  Manteniment: ✅ Actiu

**Avantatge 1: No testa implementació → Tests resilients**

El principal problema amb Enzyme és que incentiva testejar detalls d'implementació que fan els tests fràgils.

| // ❌ ENZYME: accedeix a l'estat intern (implementació)import { shallow } from 'enzyme';test('el botó d\\'enviament es desactiva durant la càrrega', () \=\> {  const wrapper \= shallow(\<LoginForm /\>);  // Accedeix directament a l'estat intern\!  wrapper.setState({ loading: true });  // Comprova la prop interna del botó  expect(wrapper.find('button\[type="submit"\]').prop('disabled')).toBe(true);});// ❌ PROBLEMA: si refactoritzem://   \- "loading" → "isSubmitting"  → TEST TRENCA//   \- useState → useReducer       → TEST TRENCA//   \- shallow → no renderitza hooks de React 16.8+ correctament// ✅ RTL: testa el comportament visible per l'usuariimport { render, screen } from '@testing-library/react';import userEvent from '@testing-library/user-event';test('el botó d\\'enviament es desactiva durant la càrrega', async () \=\> {  const user \= userEvent.setup();  render(\<LoginForm /\>);  // L'usuari clica el botó d'enviament  await user.click(screen.getByRole('button', { name: /envia/i }));  // L'usuari veu el botó desactivat mentre es carrega  expect(screen.getByRole('button', { name: /enviant.../i }))    .toBeDisabled();  // → Si renomenem "loading" → TEST SEGUEIX PASSANT  // → Si canviem useState per useReducer → TEST SEGUEIX PASSANT}); |
| :---- |

**Avantatge 2: Shallow Rendering és un antipatró**

Enzyme és famós pel seu **shallow rendering**: renderitzar únicament el component sense els seus fills. RTL no té shallow rendering, i aquesta és una de les seves grans virtuts.

Quan uses shallow rendering, en realitat no estàs testejant el que veuen els usuaris. Els usuaris no interactuen amb components de React aïllats — interactuen amb l'aplicació completa renderitzada.

| // ❌ ENZYME shallow: renderitza el component SENSE els fillsconst wrapper \= shallow(\<UserCard /\>);// → Si UserCard renderitza \<Avatar /\> i \<UserInfo /\>, no es renderitzen// → El test verifica coses que l'usuari mai pot veure// Problema concret:shallow(\<UserCard userId="123" /\>);// Si UserCard té un bug en com passa props a Avatar,// el test de shallow NO el detecta\!// ✅ RTL: renderitza SEMPRE el component sencer (equivalent a mount d'Enzyme)render(\<UserCard userId="123" /\>);// → Tots els fills es renderitzen// → Si hi ha un bug en com Avatar rep les props → EL TEST HO DETECTA// → El que veiem al test és el que veu l'usuari |
| :---- |

RTL proporciona únicament una manera de renderitzar components React: `render`, equivalent al `mount` d'Enzyme. Quan usem React Testing Library, treballem sobre nodes DOM renderitzats, per tant podem escriure tests que es comporten com l'usuari ho faria.

**Avantatge 3: Queries accessibles per defecte**

RTL promou l'accessibilitat de manera natural a través de les seves queries. Si no pots trobar un element amb `getByRole` o `getByLabelText`, probablement el teu component no és accessible.

| // ❌ ENZYME: queries per a detalls d'implementaciówrapper.find('\[data-testid="email-input"\]');wrapper.find('.form-input');wrapper.find('input\[name="email"\]');// → Cap d'aquestes queries valida que el component sigui accessible// → Un input sense label passaria els tests però seria inaccessible// ✅ RTL: queries que reflecteixen com els usuaris (i lectors de pantalla) troben elementsscreen.getByLabelText('Adreça de correu electrònic');// → Funciona ÚNICAMENT si hi ha una \<label\> correctament associada// → Si no hi ha label → el test falla → el developer ha d'afegir accessibilitat// → Benefici doble: test \+ accessibilitatscreen.getByRole('button', { name: /inicia sessió/i });// → Funciona ÚNICAMENT si és un \<button\> semàntic (no un \<div onClick\>)// → Promou HTML semàntic automàticament |
| :---- |

**Avantatge 4: `userEvent` vs. `simulate`**

Enzyme usa `simulate()` per simular events. RTL usa `@testing-library/user-event` que simula interaccions completes i realistes.

| // ❌ ENZYME .simulate(): dispara l'event SyntheticEvent però NO simula//    el comportament real del browserwrapper.find('input').simulate('change', { target: { value: 'hola' } });// → Crida el handler directament amb un event simulat artificialment// → NO simula el comportament real de l'usuari// → No comprova si el camp és realment editable// → No comprova focus, blur, ni events intermedis// ✅ RTL userEvent: simula la interacció COMPLETA de l'usuariimport userEvent from '@testing-library/user-event';const user \= userEvent.setup();await user.type(screen.getByLabelText('Nom'), 'Anna');// → Simula: focus → keydown → keypress → input → keyup (per cada lletra)// → Comprova que l'element és visible i no disabled// → Simula el comportament real del browser// → Detecta problemes que simulate() no detectariaawait user.click(screen.getByRole('button', { name: /enviar/i }));// → Simula: mouseenter → mousemove → mousedown → focus → mouseup → click// → Detecta si el botó és realment clickable |
| :---- |

**Avantatge 5: API més simple i llegible**

L'API d'Enzyme és poderosa però complexa, amb una corba d'aprenentatge pronunciada. React Testing Library té una API més simple i intuïtiva que és més fàcil d'entendre, sent una millor opció per als nouvinguts.

| // ENZYME: sintaxi complexa i encadenadaconst wrapper \= mount(\<UserList users={users} /\>);wrapper.find('UserItem').first().find('button').simulate('click');expect(wrapper.find('UserItem').first().props().selected).toBe(true);wrapper.unmount(); // ← cal fer cleanup manual\!// RTL: sintaxi clara i llegiblerender(\<UserList users={users} /\>);const primerItem \= screen.getAllByRole('listitem')\[0\];await user.click(within(primerItem).getByRole('button'));expect(primerItem).toHaveClass('selected');// cleanup automàtic après cada test\! |
| :---- |

**Avantatge 6: Compatibilitat contínua amb React**

React Testing Library testa la UI des de "fora". Quan es publica una nova versió de React, no cal fer cap canvi al codi font de la biblioteca. Enzyme accedeix als internals de React, de manera que cada actualització major de React pot trencar Enzyme.

React 17 → Enzyme: necessita @wojtekmaj/enzyme-adapter-react-17 (no oficial)  
React 18 → Enzyme: no té adapter oficial, usa forked unofficial adapters  
React 19 → Enzyme: ❌ sense suport

React 17 → RTL: ✅ funciona  
React 18 → RTL: ✅ funciona  
React 19 → RTL: ✅ funciona

Concurrent Mode → Enzyme: ❌ incompatible  
Concurrent Mode → RTL: ✅ compatible  
Suspense        → Enzyme: ❌ problemes  
Suspense        → RTL: ✅ compatible

**Quan Enzyme ENCARA pot tenir sentit**

Enzyme pot ser rellevant en casos molt específics:

Enzyme encara útil quan:  
  → Codebase gran amb class components antics (pre-hooks)  
  → Tests escrits en Enzyme ja existents (migrar té cost)  
  → Necessites testejar lifecycle methods de class components  
    (componentDidMount, componentDidUpdate...)  
  → Tens tests que necessiten inspeccionar props de components fills  
    específics sense renderitzar la jerarquia completa

En TOTS els altres casos → RTL és la millor opció

**Resum**

| Aspecte | Enzyme | React Testing Library |
| ----- | ----- | ----- |
| **Filosofia** | Perspectiva del developer | Perspectiva de l'usuari |
| **Accés a estat intern** | ✅ `wrapper.state()` | ❌ No disponible |
| **Shallow rendering** | ✅ Disponible | ❌ No (sempre mount) |
| **Queries** | CSS selectors, noms de classe | Rol, label, text (accessibles) |
| **Simulació events** | `simulate()` (artificial) | `userEvent` (realista) |
| **Manteniment** | ❌ Abandonat (2019) | ✅ Actiu |
| **React 18/19** | ❌ No oficial | ✅ Complet |
| **Hooks** | ⚠️ Problemes | ✅ Natiu |
| **Concurrent Mode** | ❌ | ✅ |
| **Accessibilitat** | ❌ No promou | ✅ Integrada en queries |
| **API** | Complexa, encadenada | Simple, intuïtiva |
| **Resilència al refactor** | ❌ Baixa | ✅ Alta |

La conclusió 2025-2026:  
  Per a projectes nous: SEMPRE React Testing Library  
  Per a projectes amb Enzyme: migrar progressivament a RTL  
    → Comença pels tests més fràgils (els que trenquen sovint)  
    → Afegeix RTL per a components nous  
    → Elimina Enzyme gradualment

RTL és el guanyador clar:  
  ✅ Compatible amb totes les versions modernes de React  
  ✅ Tests resilients als refactors  
  ✅ Promou accessibilitat automàticament  
  ✅ Simula interaccions realistes  
  ✅ Comunitat activa i creixent

