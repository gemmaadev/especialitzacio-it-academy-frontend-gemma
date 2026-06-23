**Què son les props?**

**React: Components i Props**  
[https://react.dev/learn/your-first-component](https://react.dev/learn/your-first-component)  
Guia oficial per entendre els conceptes bàsics de components i propietats a React.

# **1\. Definició**  

Els components React utilitzen props per comunicar-se entre ells. Cada component pare pot passar informació als seus components fill donant-los props. 

Les props et poden recordar els atributs HTML, però hi pots passar qualsevol valor de JavaScript, incloent objectes, arrays i funcions.

Les props són la informació que passes a una etiqueta JSX. Ja les coneixes, encara que no ho sabessis: className, src, alt, width, i height són algunes de les props que pots passar a un `<img>`:

| function Avatar() {  return (    \<img      className="avatar"      src="https://react.dev/images/docs/scientists/1bX5QH6.jpg"      alt="Lin Lanying"      width={100}      height={100}    /\>  );} |
| :---- |

Les props que pots passar a una etiqueta `<img>` estan predefinides (ReactDOM compleix amb l'estàndard HTML). 

Però pots passar qualsevol prop als teus propis components, com `<Avatar>`, per personalitzar-los.

## **2\. Per què existeixen / quin problema resolen**

Sense props, cada component seria una "caixa tancada" que sempre mostra exactament el mateix. 

Necessitem una manera de **parametritzar** un component: el mateix `Avatar` ha de poder mostrar persones diferents, mides diferents, sense haver d'escriure un component nou per a cada cas.

Aquí la metàfora és directa: considera una funció en qualsevol llenguatge de programació: com passem valors a la funció? Utilitzant paràmetres. 

Les props (propietats) són similars als paràmetres: s'utilitzen per passar dades d'un component a un altre a React.

Aquesta connexió amb les funcions no és casual, és tècnicament exacta: serveixen el mateix rol que els arguments per a les funcions — de fet, les props són l'únic argument del teu component\! Les funcions de component de React accepten un únic argument, un objecte props.

## **3\. Com funcionen per dins: l'objecte props i la destructuració**

Quan escrius `<Avatar person={...} size={100} />`, React internament empaqueta tot això en **un sol objecte** i el passa al component:

| // Sense destructurar: rebent l'objecte props completfunction Avatar(props) {  return \<img src={props.person.imageUrl} width={props.size} /\>;}// Amb destructuració: la forma habitual i recomanadafunction Avatar({ person, size }) {  return \<img src={person.imageUrl} width={size} /\>;} |
| :---- |

Normalment no necessites l'objecte props complet, així que el destructures en props individuals. Aquesta sintaxi s'anomena "destructuració" i és equivalent a llegir propietats des d'un paràmetre de funció.

**Com es passen i com es llegeixen, en codi complet:**

| function Avatar({ person, size }) {  return (    \<img      className="avatar"      src={getImageUrl(person)}      alt={person.name}      width={size}      height={size}    /\>  );}export default function Profile() {  return (    \<Avatar      size={100}      person={{ name: 'Katsuko Saruhashi', imageId: 'YfeOqp2' }}    /\>  );} |
| :---- |

Per passar props, les afegeixes al JSX, exactament igual que ho faries amb atributs HTML. Per llegir props, fas servir la sintaxi de destructuració de la funció.

## **4\. Valors per defecte**

Si vols donar a una prop un valor per defecte al qual recórrer quan no se n'especifica cap, ho pots fer amb la destructuració, posant `=` i el valor per defecte just després del paràmetre:

| function Avatar({ person, size \= 100 }) {  return \<img src={person.imageUrl} width={size} height={size} /\>;} |
| :---- |

Aquí hi ha un detall tècnic important que sovint passa per alt: el valor per defecte només s'utilitza si la prop `size` falta o si passes `size={undefined}`. 

Però si passes `size={null}` o `size={0}`, el valor per defecte NO s'utilitzarà. És un parany típic: posar `0` explícitament **no** activa el valor per defecte, perquè `0` és un valor vàlid, no un valor "absent".

## **5\. El flux de dades: unidireccional, de pare a fill**

Aquí hi ha una característica fonamental que defineix com funcionen les props: les props sempre es mouen de dalt a baix en la jerarquia de components. No podem passar props des d'un component fill cap a un component pare.

| function App() {  return \<Banner name="Anna" /\>; // El pare passa la dada cap AVALL}function Banner({ name }) {  return \<p\>Hola, {name}\</p\>; // El fill només LLEGEIX, mai modifica} |
| :---- |

**Però llavors, com "comunica" un fill al seu pare?** La resposta és enginyosa: React no pot enviar dades cap amunt des d'un component fill al seu component pare, però el component pare pot enviar una funció a un component fill. 

Sabent això, pots enviar una funció que actualitzi l'estat cap al component fill, i un cop aquella funció es crida, el component pare actualitzarà l'estat.

| function App() {  const \[count, setCount\] \= useState(0);  return \<Button onClick={() \=\> setCount(count \+ 1)} /\>; // passa una FUNCIÓ}function Button({ onClick }) {  return \<button onClick={onClick}\>Clica'm\</button\>; // el fill NOMÉS la crida} |
| :---- |

El fill no envia dades cap amunt directament; **envia un senyal** (crida la funció), i és el pare qui decideix què fer-ne.

## **6\. La prop especial `children`**

Hi ha una prop que no es passa explícitament com a atribut, sinó **mitjançant el contingut niat** entre etiquetes d'obertura i tancament: quan nies contingut dins d'una etiqueta JSX, el component pare rebrà aquell contingut en una prop anomenada `children`.

| function Card({ children }) {  return \<div className="card"\>{children}\</div\>;}export default function Profile() {  return (    \<Card\>      \<Avatar size={100} person={{ name: 'Katsuko Saruhashi', imageId: 'YfeOqp2' }} /\>    \</Card\>  );} |
| :---- |

El component `Card` rebrà una prop `children` igual a `<Avatar />` i la renderitzarà dins d'un `div` embolcallador. 

Aquest mecanisme és exactament el que fa possible la **composició** que ja vam veure al Tema 1: `Card` no necessita saber què hi ha a dins, només l'embolcalla.

## 

## 

## **7\. Immutabilitat: les props no es poden modificar**

Aquesta és una regla estricta i directament connectada amb les **funcions pures** que vam veure al Tema 1: les props són immutables — un terme de ciència de la computació que significa "inalterable". 

Quan un component necessita canviar les seves props (per exemple, en resposta a una interacció de l'usuari o noves dades), haurà de "demanar" al seu component pare que li passi props diferents — un objecte nou\! Les seves props antigues quedaran descartades, i eventualment el motor de JavaScript reclamarà la memòria que ocupaven.

No intentis "canviar les props". Quan necessitis respondre a l'input de l'usuari (com canviar el color seleccionat), necessitaràs "establir estat" — és a dir, `useState`, no modificar directament l'objecte de props rebut.

Aquesta regla ve directament del Tema 1: tant si declares un component com a funció o com a classe, mai ha de modificar les seves pròpies props. React és força flexible, però té una regla estricta: tots els components de React han d'actuar com a funcions pures respecte a les seves props.

## **8\. Avantatges i inconvenients**

**Avantatges:**

* **Reutilització real**: el mateix component (`Avatar`, `Button`...) es pot personalitzar infinitament sense duplicar codi  
* **Flux de dades predictible**: com sempre van de pare a fill, és fàcil seguir d'on ve cada dada (connecta amb la **predictibilitat** del Tema 1\)  
* **Compatibilitat amb la puresa**: en ser immutables, encaixen perfectament amb el model de components com a funcions pures  
* **Es pot passar qualsevol tipus de valor**: no només text o números, sinó objectes, arrays i fins i tot funcions (per habilitar la comunicació "cap amunt" indirecta)

**Inconvenients / matisos:**

* **Prop drilling**: en arbres de components profunds, passar una prop a través de molts nivells intermedis que no la necessiten directament pot tornar-se feixuc  
* **El parany del `0` i `null` amb valors per defecte**: cal recordar que només `undefined` (o l'absència de la prop) activa el valor per defecte, no `0` ni `null`  
* **No hi ha comunicació directa fill→pare**: cal el patró indirecte de passar una funció com a prop, que pot no ser intuïtiu per a qui comença

## 

## 

## **9\. Errors comuns / mals entesos**

* **Intentar modificar directament una prop dins del component que la rep.** Trenca la immutabilitat i la puresa; la solució correcta és demanar al pare que passi un valor nou (normalment via estat).  
* **Pensar que es pot passar dades del fill cap al pare directament.** El flux és unidireccional; per "comunicar cap amunt" cal que el pare passi una funció com a prop, que el fill cridi.  
* **Confondre `props.children` amb una prop "normal".** És una prop especial que es genera automàticament a partir del contingut niat entre les etiquetes d'obertura i tancament d'un component, no es declara explícitament com a atribut.  
* **Esperar que `size={0}` o `size={null}` activin el valor per defecte.** Només `undefined` o l'absència total de la prop ho fan.

## **10\. Connexió amb altres conceptes del temari**

* Les props són el mecanisme que fa possible tot el que vam veure sobre **composició** (Tema 1): un component pare passa dades als seus fills exactament igual que un argument a una funció  
* Connecten directament amb les **funcions pures**: la immutabilitat de les props i la regla de no modificar-les és l'aplicació pràctica del principi de puresa als components  
* Es relacionen amb els **Hooks**, en especial `useState`: quan un component "necessita canviar les seves props", el que realment passa és que el component pare gestiona un estat propi i el passa cap avall com a nova prop  
* Anticipa **el tipatge amb TypeScript** (pròxima pregunta del Tema 2): un cop entens què són les props, el pas natural és aprendre a declarar-ne els tipus per evitar errors  
* Connecta amb **render tree** (pregunta posterior): cada vegada que una prop canvia, és el que dispara el cicle de re-render que ja vam veure amb la reconciliation al Tema 1

## **11\. Preguntes de repàs (amb resposta)**

**1\. Quina relació hi ha entre les props i els arguments d'una funció?**

Les props fan exactament el mateix paper que els arguments fan per a les funcions: són la informació d'entrada que personalitza el comportament/sortida d'un component. De fet, tot un component de React accepta un únic argument: un objecte que conté totes les seves props.

**2\. Per què les props es consideren immutables, i què hauries de fer si un component necessita "canviar" una prop?**

Perquè modificar-les directament trencaria el principi de funcions pures que React exigeix als components. Si cal "canviar" una prop, el component ha de demanar-ho al seu pare (típicament mitjançant una funció passada com a prop), que li passarà un objecte de props completament nou amb el valor actualitzat.

**3\. Per què `size={0}` no activa el valor per defecte d'una prop `size = 100`?**

Perquè el valor per defecte només s'aplica quan la prop és `undefined` (o no s'ha passat). `0` és un valor vàlid i diferent d'`undefined`, així que React l'utilitza tal qual, en lloc de recórrer al valor per defecte.

**4\. Com pot un component fill "comunicar" alguna cosa al seu component pare, si les props només viatgen de dalt a baix?**

No ho pot fer directament passant dades cap amunt. La solució és que el pare passi una funció com a prop al fill; quan el fill la crida (per exemple, en resposta a un clic), és el pare qui executa la lògica real (com actualitzar el seu propi estat), no el fill.

**5\. Què és la prop `children` i d'on prové el seu valor?**

És una prop especial que conté automàticament tot el contingut JSX niat entre l'etiqueta d'obertura i de tancament d'un component (`<Card>...</Card>`). No es declara com un atribut explícit; React la genera i la passa automàticament al component, permetent patrons flexibles de composició.

 

