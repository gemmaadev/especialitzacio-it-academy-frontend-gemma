**Quins problemes resolen els Custom Hooks que no podien resoldre els HOCs o Render Props?**

HOC i Render Props van ser la solució a la reutilització de lògica en l'era pre-hooks (classe components). 

Per augmentar el DRYness del codebase, sovint s'implementaven molts components wrapper petits i granulars. Però augmentar el nombre de components wrapper incrementava la mida i complexitat mentre podia disminuir la reutilitzabilitat. 

Els hooks van arribar per resoldre tots aquests problemes.

**Problema 1: Wrapper Hell (HOC)**

Els HOCs creen el "wrapper hell" als DevTools: `<WithAuth><WithLoading><WithTheme><WithData><MyComponent /></WithData></WithTheme></WithLoading></WithAuth>`

| // ❌ HOC: cada comportament afegeix un nivell al component treeconst ComponentMillorat \= withAuth(  withLoading(    withTheme(      withData(        withLogger(          MyComponent        )      )    )  ));// React DevTools mostra:// \<WithAuth\>//   \<WithLoading\>//     \<WithTheme\>//       \<WithData\>//         \<WithLogger\>//           \<MyComponent /\>  ← 5 nivells de profunditat\!// ✅ Custom Hooks: zero wrapper components, arbre plafunction MyComponent() {  const { autenticat } \= useAuth();  const { loading } \= useLoading();  const { tema } \= useTheme();  const { dades } \= useData();  useLogger();  // → React DevTools mostra: \<MyComponent /\>  // → Arbre pla, llegible, sense cap wrapper} |
| :---- |

A diferència dels HOC, els custom hooks eliminen la necessitat de components wrapper, resultant en un component tree més pla, una estructura JSX més neta, millor rendiment, i complexitat reduïda.

**Problema 2: Colisió de props (HOC)**

Quan fem `<MyComponent />`, el "MyComponent" és en realitat el wrapper pare del HOC, no el "MyComponent" que hem escrit. El component pare proporciona l'estat reutilitzable via props. Això significa que podríem tenir "colisions de props" entre el que volem passar a MyComponent i el que el HOC vol passar.

| // ❌ HOC: colisió silenciosa de propsfunction withUser(Component) {  return (props) \=\> \<Component {...props} nom="Nom de l'Usuari" /\>;}function withAdmin(Component) {  return (props) \=\> \<Component {...props} nom="Nom de l'Admin" /\>;}// Quin 'nom' guanya? Silenciosament el darrer\!const Enhanced \= withAdmin(withUser(MyComponent));// → nom="Nom de l'Admin" sobreescriu nom="Nom de l'Usuari"// → bug silenciós, difícil de detectar// ✅ Custom Hooks: noms explícits, zero colisiófunction MyComponent() {  const { nom: nomUsuari } \= useUser();    // ← desestructurem amb àlies  const { nom: nomAdmin } \= useAdmin();    // ← nom diferent, zero colisió  // → TypeScript avisa si intentes usar un nom que no existeix} |
| :---- |

**Problema 3: Origen de les dades opac (HOC)**

No és clar d'on venen les props quan usem HOC. Una prop podria venir del component pare directe, d'un HOC, o de múltiples HOCs aniuats. Amb hooks, és clar d'on ve cada valor.

| // ❌ HOC: d'on ve 'usuari'? Impossible saber-ho sense seguir tota la cadenafunction MyComponent({ usuari, tema, dades, isLoading, onAction }) {  // → usuari ve de withAuth?  // → tema ve de withTheme?  // → dades ve de withData?  // → Cal llegir les declaracions dels HOC per entendre-ho  return \<div\>{usuari.nom}\</div\>;}export default withAuth(withTheme(withData(MyComponent)));// ✅ Custom Hooks: l'origen és explícit i traçablefunction MyComponent() {  const { usuari } \= useAuth();      // ← ve d'aquí ✅  const { tema } \= useTheme();       // ← ve d'aquí ✅  const { dades } \= useData();       // ← ve d'aquí ✅  // → Llegint el component, saps exactament d'on ve cada valor} |
| :---- |

**Problema 4: Callback Hell i aniuament (Render Props)**

Els render props no afegeixen capes extra al component tree (a diferència dels HOC), però creen un aniuament de funcions que redueix la llegibilitat quan se'n combinen múltiples.

| // ❌ Render Props: aniuament de callbacks → "callback hell"function MyComponent() {  return (    \<DataFetcher url="/api/usuaris"\>      {({ dades: usuaris, loading }) \=\>        loading ? \<Spinner /\> : (          \<MouseTracker\>            {({ x, y }) \=\> (              \<WindowSizer\>                {({ amplada }) \=\> (                  \<div\>                    {/\* 4 nivells d'aniuament de callbacks\! \*/}                    {usuaris.map(u \=\> \<span key={u.id}\>{u.nom}\</span\>)}                    Ratolí: {x}, {y}                    Amplada: {amplada}                  \</div\>                )}              \</WindowSizer\>            )}          \</MouseTracker\>        )      }    \</DataFetcher\>  );}// ✅ Custom Hooks: lineal i llegiblefunction MyComponent() {  const { dades: usuaris, loading } \= useFetch('/api/usuaris');  const { x, y } \= useMousePosition();  const { amplada } \= useWindowSize();  if (loading) return \<Spinner /\>;  return (    \<div\>      {usuaris.map(u \=\> \<span key={u.id}\>{u.nom}\</span\>)}      Ratolí: {x}, {y}      Amplada: {amplada}    \</div\>  );  // → Completament pla, llegible d'un cop d'ull} |
| :---- |

**Problema 5: TypeScript complex (HOC)**

Els custom hooks donen el millor dels dos mons: lògica compartida sense wrapper de components, i suport TypeScript tan bo com es pot aconseguir.

| // ❌ HOC: generics complexos i difícils de mantenirfunction withAuth\<P extends { usuari: Usuari }\>(  Component: React.ComponentType\<P\>): React.ComponentType\<Omit\<P, 'usuari'\>\> {  return function WithAuth(props: Omit\<P, 'usuari'\>) {    const { usuari } \= useAuthIntern();    return \<Component {...(props as P)} usuari={usuari} /\>;  };}// → El tipat és complex, els errors de TypeScript son confusos// → L'autocomplete als IDEs no funciona sempre bé// ✅ Custom Hook: TypeScript natural i clarfunction useAuth() {  const { usuari } \= useContext(AuthContext);  return { usuari }; // ← ReturnType\<typeof useAuth\> \= { usuari: Usuari | null }}function MyComponent() {  const { usuari } \= useAuth(); // ← TypeScript sap exactament el tipus ✅  return \<div\>{usuari?.nom}\</div\>;} |
| :---- |

**Problema 6: Mètodes estàtics no copiats (HOC)**

Els HOC no copien els mètodes estàtics del component original. `Enhanced.someMethod()` retorna `undefined` → no copiat.

| // ❌ HOC: mètodes estàtics perduts silenciosamentclass MyComponent extends React.Component {  static defaultProps \= { color: 'blue' };  static propTypes \= { /\* ... \*/ };  static nomPàgina \= 'La meva pàgina';  // ↑ TOTS perduts quan s'aplica el HOC\!}const Enhanced \= withAuth(MyComponent);Enhanced.defaultProps;  // → undefined ❌Enhanced.nomPàgina;     // → undefined ❌// → Cal usar 'hoist-non-react-statics' per copiar-los manualment// ✅ Custom Hook: no hi ha components a embolcallar → problema inexistentfunction MyComponent() {  const { autenticat } \= useAuth();  return \<div /\>;}// → Les funcions estàtiques segueixen al component original, sense pèrdua |
| :---- |

**On HOC i Render Props segueixen tenint sentit**

Avui, usa un Custom Hook primer; recorre a HOC i Render Props únicament quan necessitis capacitats que els hooks no cobreixen — com transformar el tree, interceptar refs, o embolcallar sub-trees sencers. 

Els HOC, Render Props, i splits Container/Presentacional apareixen principalment en codi legacy o casos d'ús de nínxol.

| // HOC segueix tenint sentit per a:// 1\. Error Boundaries (no existeix un hook equivalent)class ErrorBoundary extends React.Component { /\* ... \*/ }const withErrorBoundary \= (Component) \=\> (props) \=\>  \<ErrorBoundary\>\<Component {...props} /\>\</ErrorBoundary\>;// 2\. React.memo (el HOC més usat de React)const MemoitzatComponent \= React.memo(Component);// 3\. forwardRef (per passar refs a components de tercers)const RefComponent \= React.forwardRef((props, ref) \=\>  \<Component {...props} innerRef={ref} /\>); |
| :---- |

**Taula comparativa**  

| Problema | HOC | Render Props | Custom Hook |
| ----- | ----- | ----- | ----- |
| **Wrapper Hell** | ❌ Crea N wrappers | ✅ No afegeix | ✅ No afegeix |
| **Colisió de Props** | ❌ Possible | ✅ Impossible | ✅ Impossible |
| **Origen de dades** | ❌ Opac | ✅ Explícit | ✅ Explícit |
| **Aniuament** | ❌ Vertical | ❌ Callback hell | ✅ Lineal |
| **TypeScript** | ❌ Generics complexos | ✅ Acceptable | ✅ Excel·lent |
| **Mètodes estàtics** | ❌ Cal copiar | ✅ No aplica | ✅ No aplica |
| **Llegibilitat** | ❌ Baixa | ⚠️ Moderada | ✅ Alta |
| **Ús 2026** | Casos específics | Casos específics | ✅ Per defecte |

