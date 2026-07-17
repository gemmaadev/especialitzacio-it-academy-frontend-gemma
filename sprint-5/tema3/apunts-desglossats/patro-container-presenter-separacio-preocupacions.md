**Per què el patró container/presenter millora la separació de preocupacions?**

**Container/Presenter Pattern**  
Article de Martin Fowler sobre la separació de capes de presentació i lògica.  
[https://martinfowler.com/bliki/PresentationDomainDataLayering.html](https://martinfowler.com/bliki/PresentationDomainDataLayering.html)

## **Presentation-Domain-Data Layering**

Una de les maneres més comunes de modularitzar un programa ric en informació és separar-lo en tres capes àmplies: presentació (UI), lògica de domini (aka lògica de negoci), i accés a dades. 

El seu avantatge principal és que permet **reduir l'àmbit d'atenció**, permetent pensar en els tres temes de manera relativament independent.

El patró Container/Presenter aplica directament aquest principi al món dels components React.

**Què és el patró Container/Presenter**

El patró divideix cada funcionalitat en dos components amb responsabilitats ben delimitades:

CONTAINER (component intel·ligent):  
  → Sap D'ON venen les dades (fetch, Context, Redux, props)  
  → Gestiona l'estat i la lògica de negoci  
  → Passa dades al Presenter via props  
  → No renderitza UI pròpia (o mínima)  
  → Noms habituals: \*Container, \*Page, \*Controller

PRESENTER (component pur):  
  → Sap COM mostrar les dades  
  → Únicament rep props i retorna JSX  
  → Sense lògica de negoci ni efectes secundaris  
  → Altament reutilitzable  
  → Noms habituals: \*Card, \*List, \*View, \*Item

**Exemple: de barrejat a separat**

| // ❌ SENSE el patró: UI i lògica barrejades en un sol componentfunction LlistaUsuaris() {  const \[usuaris, setUsuaris\] \= useState(\[\]);  const \[loading, setLoading\] \= useState(true);  const \[error, setError\] \= useState\<Error | null\>(null);  useEffect(() \=\> {    fetch('/api/usuaris')      .then(r \=\> r.json())      .then(data \=\> { setUsuaris(data); setLoading(false); })      .catch(err \=\> { setError(err); setLoading(false); });  }, \[\]);  const handleEliminar \= async (id: string) \=\> {    await fetch(\`/api/usuaris/${id}\`, { method: 'DELETE' });    setUsuaris(prev \=\> prev.filter(u \=\> u.id \!== id));  };  if (loading) return \<div\>Carregant...\</div\>;  if (error) return \<div\>Error: {error.message}\</div\>;  return (    \<ul\>      {usuaris.map(u \=\> (        \<li key={u.id}\>          \<img src={u.avatar} alt={u.nom} /\>          \<span\>{u.nom}\</span\>          \<span\>{u.email}\</span\>          \<button onClick={() \=\> handleEliminar(u.id)}\>Eliminar\</button\>        \</li\>      ))}    \</ul\>  );}// Problemes:// → No pots reutilitzar la UI amb dades d'una altra font// → No pots testar la UI sense mockejar la xarxa// → No pots canviar la font de dades sense tocar la UI |
| :---- |

| // ✅ AMB el patró: responsabilitats separades// PRESENTER: component pur, únicament rep props i retorna JSXinterface UsuariItemProps {  usuari: Usuari;  onEliminar: (id: string) \=\> void;}function UsuariItem({ usuari, onEliminar }: UsuariItemProps) {  return (    \<li\>      \<img src={usuari.avatar} alt={usuari.nom} /\>      \<span\>{usuari.nom}\</span\>      \<span\>{usuari.email}\</span\>      \<button onClick={() \=\> onEliminar(usuari.id)}\>Eliminar\</button\>    \</li\>  );}interface LlistaUsuarisViewProps {  usuaris: Usuari\[\];  loading: boolean;  error: Error | null;  onEliminar: (id: string) \=\> void;}function LlistaUsuarisView({ usuaris, loading, error, onEliminar }: LlistaUsuarisViewProps) {  if (loading) return \<div\>Carregant...\</div\>;  if (error) return \<div\>Error: {error.message}\</div\>;  return (    \<ul\>      {usuaris.map(u \=\> (        \<UsuariItem key={u.id} usuari={u} onEliminar={onEliminar} /\>      ))}    \</ul\>  );}// CONTAINER: gestiona dades i lògica, passa-les al Presenterfunction LlistaUsuarisContainer() {  const \[usuaris, setUsuaris\] \= useState\<Usuari\[\]\>(\[\]);  const \[loading, setLoading\] \= useState(true);  const \[error, setError\] \= useState\<Error | null\>(null);  useEffect(() \=\> {    fetch('/api/usuaris')      .then(r \=\> r.json())      .then(data \=\> { setUsuaris(data); setLoading(false); })      .catch(err \=\> { setError(err); setLoading(false); });  }, \[\]);  const handleEliminar \= async (id: string) \=\> {    await fetch(\`/api/usuaris/${id}\`, { method: 'DELETE' });    setUsuaris(prev \=\> prev.filter(u \=\> u.id \!== id));  };  // El container únicament passa dades al Presenter  return (    \<LlistaUsuarisView      usuaris={usuaris}      loading={loading}      error={error}      onEliminar={handleEliminar}    /\>  );} |
| :---- |

**Per què millora la separació de preocupacions: les tres raons de Fowler**

### **Raó 1: Reduir l'Àmbit d'Atenció**

El seu avantatge principal és que permet reduir l'àmbit d'atenció permetent pensar en els tres temes relativament de manera independent. Quan treballo en codi de lògica de domini puc ignorar principalment la UI i tractar qualsevol interacció amb fonts de dades com un conjunt abstracte de funcions.

Quan treballo en LlistaUsuarisContainer:  
  → Penso únicament en: de on venen les dades? quan es refresca? com s'elimina?  
  → NO penso en: com es veu la llista? quins colors? quina mida de font?

Quan treballo en LlistaUsuarisView:  
  → Penso únicament en: com es mostra cada usuari? quin layout? quins estados visuals?  
  → NO penso en: de on vénen les dades? hi ha un fetch? hi ha caché?

### **Raó 2: Substitució de Implementations**

Aquesta separació permet construir múltiples presentacions sobre la mateixa lògica de domini sense duplicar-la. Múltiples presentacions podrien ser pàgines separades en una web app, tenir una web app més apps mòbil natives, o una API per a scripts.

| // El mateix container → múltiples presentacions\!function LlistaUsuarisContainer() {  const { usuaris, loading, error, handleEliminar } \= useUsuaris();  // Decidir quina vista usar segons el context  if (isMobile) {    return \<LlistaUsuarisMobileView ... /\>;  }  return \<LlistaUsuarisView ... /\>;}// O el mateix Presenter amb múltiples fonts de dades:\<LlistaUsuarisView usuaris={usuarisDeAPI} ... /\>    // dades reals\<LlistaUsuarisView usuaris={usuarisMock} ... /\>     // dades de test\<LlistaUsuarisView usuaris={usuarisStorybook} ... /\> // Storybook |
| :---- |

### **Raó 3: Testabilitat**

El codi UI és sovint difícil de testar, de manera que és bo posar tanta lògica com sigui possible en una capa de domini que és fàcilment testada sense haver de fer gimnàstica per accedir al programa a través d'una UI. 

Les fronteres del mòdul exposen costures que son bona oportunitat per als tests.

| // TEST del Presenter: sense mocks de xarxa, simple i ràpidtest('LlistaUsuarisView mostra tots els usuaris', () \=\> {  const usuarisMock \= \[    { id: '1', nom: 'Anna', email: 'anna@e.com', avatar: '...' },    { id: '2', nom: 'Marc', email: 'marc@e.com', avatar: '...' },  \];  const onEliminar \= vi.fn();  render(\<LlistaUsuarisView    usuaris={usuarisMock}    loading={false}    error={null}    onEliminar={onEliminar}  /\>);  expect(screen.getByText('Anna')).toBeInTheDocument();  expect(screen.getByText('Marc')).toBeInTheDocument();  await user.click(screen.getAllByRole('button', { name: /eliminar/i })\[0\]);  expect(onEliminar).toHaveBeenCalledWith('1');});// → Zero fetch, zero useEffect, zero mocks de xarxa// → El Presenter és una funció pura → tests trivials |
| :---- |

**Versió moderna: Custom Hooks com a containers**

Amb la introducció dels hooks, el patró ha evolucionat. El "Container" ja no ha de ser necessàriament un component — pot ser un Custom Hook que encapsula la lògica, i el component únicament fa de Presenter.

| // HOOK (substitut modern del Container):function useUsuaris() {  const \[usuaris, setUsuaris\] \= useState\<Usuari\[\]\>(\[\]);  const \[loading, setLoading\] \= useState(true);  const \[error, setError\] \= useState\<Error | null\>(null);  useEffect(() \=\> {    fetch('/api/usuaris')      .then(r \=\> r.json())      .then(data \=\> { setUsuaris(data); setLoading(false); })      .catch(err \=\> { setError(err); setLoading(false); });  }, \[\]);  const eliminar \= async (id: string) \=\> {    await fetch(\`/api/usuaris/${id}\`, { method: 'DELETE' });    setUsuaris(prev \=\> prev.filter(u \=\> u.id \!== id));  };  return { usuaris, loading, error, eliminar };}// COMPONENT (únicament presentació):function LlistaUsuaris() {  const { usuaris, loading, error, eliminar } \= useUsuaris();  if (loading) return \<Spinner /\>;  if (error) return \<Error missatge={error.message} /\>;  return (    \<ul\>      {usuaris.map(u \=\> (        \<UsuariItem key={u.id} usuari={u} onEliminar={eliminar} /\>      ))}    \</ul\>  );}// → La separació és igual de clara però en un sol component \+ hook// → El hook és testejable per separat// → El component és més net i llegible |
| :---- |

**Quan Aplicar el Patró i Quan No**

✅ APLICAR Container/Presenter quan:  
  → El component barreja fetch \+ UI \+ lògica de negoci  
  → La mateixa UI necessita mostrar dades de fonts diverses  
  → Vols testar la UI sense preocupar-te de la xarxa  
  → Vols reutilitzar la UI en Storybook o tests

❌ NO cal si:  
  → El component és petit i simple (\< 50 línies)  
  → La lògica mai canviarà ni la UI es reutilitzarà  
  → Pots usar un Custom Hook per separar lògica en lloc d'un component Container  
  → L'over-engineering afegeix complexitat sense benefici real

🔄 VERSIÓ MODERNA (recomanada 2025-2026):  
  Custom Hook (lògica) \+ Component pla (UI)  
  → Més simple que Container Component \+ Presenter Component  
  → Mateixos beneficis de separació  
  → Millor integració amb l'ecosistema de hooks

**Resum**

|  | Container | Presenter |
| ----- | ----- | ----- |
| **Responsabilitat** | Lògica \+ dades | Presentació visual |
| **Depèn de** | API, Context, Redux, hooks | Únicament props |
| **Estat** | ✅ Gestiona estat | ❌ Sense estat propi |
| **Efectes** | ✅ `useEffect` | ❌ Cap efecte |
| **Retorna** | `<PresentadorComponent props... />` | JSX pur |
| **Testabilitat** | Amb mocks de xarxa | Sense mocks (pur) |
| **Reutilitzable** | ❌ Acoblat a la font de dades | ✅ Molt reutilitzable |
| **Versió moderna** | Custom Hook | Component pla |

