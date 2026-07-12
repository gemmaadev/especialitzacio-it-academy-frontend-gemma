**Per què el testing centrat en l'usuari és més efectiu que testejar implementacions?**

La filosofia de React Testing Library es resumeix en un principi: "Com més s'assemblin els teus tests a la manera en que el teu software s'usa, més confiança et poden donar."

Vols escriure tests mantenibles que et donin alta confiança que els teus components funcionen per als teus usuaris, evitant incloure detalls d'implementació perquè els refactors (canvis a la implementació però no a la funcionalitat) no trenquin els teus tests.

**Què és "Testejar implementacions"**

Testejar implementacions significa verificar **com** el component fa la seva feina, no **quèfa** per a l'usuari. Son tests que accedeixen a l'estat intern, els noms de mètodes, l'estructura del component tree, o els noms de classes CSS.

| // ❌ TEST D'IMPLEMENTACIÓ: testa detalls internstest('el component té un estat "obert" a false per defecte', () \=\> {  const component \= shallow(\<Modal /\>);  expect(component.state('obert')).toBe(false);  // → Accedeix a l'estat intern del component  // → Si renomenem "obert" a "isVisible" → test trenca\!  // → L'usuari mai sap ni li importa el nom de la variable d'estat});test('el div té la classe CSS "active"', () \=\> {  const { container } \= render(\<Button active /\>);  expect(container.querySelector('.btn-active')).toBeInTheDocument();  // → Si canvies la classe CSS a "btn--active" (BEM) → test trenca\!  // → L'usuari no sap quina classe CSS té el botó});test('handleSubmit es crida quan es prem el botó', () \=\> {  const component \= shallow(\<Form /\>);  component.instance().handleSubmit();  // → Crida directament al mètode intern  // → Si renomenem el mètode → test trenca\!}); |
| :---- |

**Què és el "Testing centrat en l'usuari"**

El testing centrat en l'usuari és un enfocament on els tests es redacten per simular les interaccions i comportaments de l'usuari amb l'aplicació, en lloc de centrar-se en els detalls d'implementació interns dels components. L'objectiu és assegurar que els components es comporten com s'espera des de la perspectiva de l'usuari, conduint a tests més resilients als canvis de la implementació.

| // ✅ TEST CENTRAT EN L'USUARI: testa el que veu i fa l'usuariimport { render, screen } from '@testing-library/react';import userEvent from '@testing-library/user-event';test('el modal es tanca quan l\\'usuari clica "Tanca"', async () \=\> {  const user \= userEvent.setup();  render(\<Modal isOpen={true} /\>);  // L'usuari veu el contingut del modal  expect(screen.getByRole('dialog')).toBeInTheDocument();  // L'usuari clica el botó de tancar  await user.click(screen.getByRole('button', { name: /tanca/i }));  // L'usuari ja no veu el modal  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();  // → No importa si l'estat s'anomena "obert", "visible", o "isShown"  // → No importa si el botó té classe "btn-close" o "close-btn"  // → El test verifica el COMPORTAMENT, no la implementació}); |
| :---- |

**Per què els Tests d'implementació son problemàtics**

### **Problema 1: Trenquen en refactors que no canvien el comportament**

| // El component funciona igual per a l'usuari,// però has refactoritzat la implementació:// ABANS:const \[obert, setObert\] \= useState(false);  // ← nom de variable// DESPRÉS (refactor sense canvi de comportament):const \[isVisible, setIsVisible\] \= useState(false);  // ← nom canviat// ❌ Test d'implementació → TRENCA sense cap raó vàlidaexpect(component.state('obert')).toBe(false);// → L'usuari no ha notat cap canvi, però el test ha fallat\!// ✅ Test centrat en l'usuari → SEGUEIX PASSANTexpect(screen.queryByRole('dialog')).not.toBeInTheDocument();// → L'usuari no veu el modal → el test és correcte |
| :---- |

### **Problema 2: Falsos positius i falsos negatius**

És important usar assertions que la biblioteca jest-dom ofereix. 

Usar `.toBeInTheDocument()` podria donar-nos un fals positiu perquè el text podria estar amagat o transparent, cosa que significa que l'usuari no veu res. En aquest cas, hauríem d'usar `.toBeVisible()`.

| // ❌ Fals positiu: el test passa però l'usuari NO veu el contingutconst { container } \= render(\<Missatge ocult /\>);expect(container.querySelector('.missatge')).toBeInTheDocument();// → L'element existeix al DOM però pot tenir display:none\!// → El test passa, però l'usuari no veu res → FIS POSITIU// ✅ Test centrat en l'usuari: verifica el que realment veuexpect(screen.getByText('Hola\!')).toBeVisible();// → .toBeVisible() comprova que no és hidden, transparent, ni fora de pantalla |
| :---- |

**Les queries: la clau del testing centrat en l'usuari**

React Testing Library proporciona funcions de query que permeten seleccionar elements en els components React renderitzats usant criteris significatius des de la perspectiva de l'usuari. Exemples inclouen `getByLabelText`, `getByText`, `getAllByRole`, i més.

La prioritat de queries defineix la filosofia: de la query que millor representa com l'usuari percep la UI, a la menys recomanada:

| // PRIORITAT 1: Queries per Rol (ARIA role) → accessible i semànticscreen.getByRole('button', { name: /enviar/i })screen.getByRole('textbox', { name: /email/i })screen.getByRole('heading', { level: 1 })screen.getByRole('dialog')// → Reflecteix com els usuaris de lectors de pantalla accedeixen a la UI// PRIORITAT 2: Queries per Label → per a inputs de formularisscreen.getByLabelText('Nom d\\'usuari')// → Reflecteix com els usuaris visuals identifiquen camps de formulari// PRIORITAT 3: Queries per Text Visiblescreen.getByText(/confirmar/i)screen.getByText('Benvingut, Anna\!')// → El text que l'usuari llegeix// PRIORITAT 4: Queries per PlaceHolderscreen.getByPlaceholderText('Cerca productes...')// PRIORITAT 5: Queries per TestId (ÚLTIM RECURS)screen.getByTestId('submit-button')// ← Evitar: l'usuari no sap res dels data-testid\!// ← Usar únicament quan no hi ha altra opció accessible |
| :---- |

**La diferència en la pràctica: mateix component, dos enfocaments**

| // El component a testar:function Comptador() {  const \[count, setCount\] \= useState(0);  return (    \<div\>      \<p\>Clics: {count}\</p\>      \<button onClick={() \=\> setCount(c \=\> c \+ 1)}\>Incrementa\</button\>    \</div\>  );}// ❌ ENFOCAMENT D'IMPLEMENTACIÓ (com faria Enzyme):const wrapper \= shallow(\<Comptador /\>);expect(wrapper.state('count')).toBe(0);        // estat internwrapper.find('button').simulate('click');expect(wrapper.state('count')).toBe(1);        // estat intern// → Dependent de l'estat intern i d'Enzyme// ✅ ENFOCAMENT CENTRAT EN L'USUARI (React Testing Library):import { render, screen } from '@testing-library/react';import userEvent from '@testing-library/user-event';test('mostra el nombre de clics actualitzat', async () \=\> {  const user \= userEvent.setup();  render(\<Comptador /\>);  // L'usuari veu "Clics: 0" inicialment  expect(screen.getByText('Clics: 0')).toBeVisible();  // L'usuari clica el botó "Incrementa"  await user.click(screen.getByRole('button', { name: /incrementa/i }));  // L'usuari ara veu "Clics: 1"  expect(screen.getByText('Clics: 1')).toBeVisible();  // → Si refactoritzem "count" a "comptador" → test segueix passant\!  // → Si refactoritzem useState a useReducer → test segueix passant\!}); |
| :---- |

**Els avantatges concrets del testing centrat en l'usuari**

1. **Resilient als refactors** → Pots canviar la implementació (useState → useReducer, CSS classes, noms de variables) sense trencar els tests, sempre que el comportament visible sigui el mateix.  
2. **Detecta problemes reals** → Si un test falla, és perquè l'usuari hauria trobat un problema, no perquè has renomenat una variable interna.  
3. **Promou l'accessibilitat** → Les queries per rol (`getByRole`) incentiven l'ús d'HTML semàntic i atributs ARIA correctes. Si la query no troba l'element, pot ser perquè falta l'accessibilitat.  
4. **Tests com a documentació** → En centrar-se en com els usuaris interactuen amb els components, es creen tests que proporcionen confiança genuïna que l'aplicació funcionarà correctament per a usuaris reals.

**Resum**

| Aspecte | Tests d'Implementació | Tests Centrats en l'Usuari |
| ----- | ----- | ----- |
| **Enfocament** | Com funciona el codi | Quèveu i fa l'usuari |
| **Queries** | IDs interns, classNames, state | `getByRole`, `getByText`, `getByLabel` |
| **Resistència al refactor** | ❌ Trenquen sovint | ✅ Resilients |
| **Falsos positius** | ❌ Possibles | ✅ Menys probable |
| **Accessibilitat** | ❌ No la promou | ✅ Integrada |
| **Confiança** | ❌ Baixa (testa codi, no UX) | ✅ Alta (testa comportament real) |
| **Eina** | Enzyme, shallow render | React Testing Library \+ userEvent |

La regla d'or:  
  Si l'usuari no nota el canvi → el test no hauria de trencar.  
  Si l'usuari nota el canvi → el test hauria de trencar.

  Pregunta't sempre: "Sabria l'usuari que aquest detall ha canviat?"  
  → SÍ → pot ser un bon test  
  → NO → estàs testejant implementació

