## **Glossari de termes — Patrons de disseny i arquitectura en React**

**Abstracció** — En el context de DIP i Custom Hooks, una interfície o contrate que separa el "quèfa" del "com ho fa". En React: una prop de funció (`onSubmit`) és una abstracció que desacobla el component del servei concret (`api.login`). Els Custom Hooks son abstraccions que amaguen complexitat darrere d'una API declarativa.

**Acoblament** — El grau de dependència entre components o mòduls. Un acoblament alt (tight coupling) significa que canviar un component requereix canviar molts altres. L'objectiu dels patrons de disseny és reduir l'acoblament per fer el codi més mantenible i testejable.

**Batching** — Optimització de React que agrupa múltiples `setState`. Rellevant per a l'arquitectura: en la capa de lògica (Custom Hooks), múltiples actualitzacions d'estat en un sol event handler produeixen un sol re-render.

**`children`** — Prop especial de React que accepta qualsevol contingut JSX. El mecanisme principal per implementar el principi Open-Closed: en lloc de passar props per a cada variant possible, es delega el contingut als components consumidors via `children`. Fonamental per als patrons Layout Component i Compound Components.

**`clsx` / `classnames`** — Biblioteques auxiliars per combinar noms de classes CSS de manera robust. Útils per al patró de Merge de ClassName: `cn('btn', primary && 'btn-primary', className)`. shadcn/ui inclou una funció `cn()` que combina `clsx` amb `tailwind-merge`.

**Capa de Dades** — La capa inferior de l'arquitectura en capes. Responsable de: fetch d'API, transformació de dades, caché, i gestió de l'estat global (Redux store). En l'estructura de carpetes: `services/api/` i `services/store/`. Mai importa components de la capa de presentació.

**Capa de Lògica** — La capa intermèdia de l'arquitectura en capes. Conté Custom Hooks, lògica de negoci, i regles de domni. Pont entre presentació i dades. En l'estructura de carpetes: `hooks/`. Depèn de la capa de dades però no de la presentació.

**Capa de Presentació** — La capa superior de l'arquitectura. Conté components React, JSX i estils. Únicament responsable de com es veu i com interactua la UI. En l'estructura de carpetes: `components/`. Depèn de la capa de lògica (via Custom Hooks) però no directament de la capa de dades.

**Compound Components** — Patró on múltiples components treballen junts com una unitat, compartint estat implícitament via Context. L'analogia nativa: `<select>` i `<option>`. Implementat amb `createContext` al component pare i `useContext` als sub-components. Els sub-components s'adjunten com a propietats del component pare: `Tabs.Tab`, `Tabs.Panel`. Usat per Radix UI, shadcn/ui i React Router internament.

**Container Component** — Component responsable de gestionar dades i lògica (fetch, estat, transformacions) i passar el resultat a un Presenter Component via props. "Un container fa fetch de dades i renderitza el sub-component corresponent. Res més." En la versió moderna, és substituït per Custom Hooks.

**Controlled Input** — Patró on el valor d'un input és sempre controlat per l'estat de React (`value={state}` \+ `onChange={setState}`). React és l'única font de veritat. Permet validació en temps real, transformació de valors, i reset programàtic. Contraposat a Uncontrolled Input on el DOM gestiona el seu propi estat.

**Dead Code Elimination** — Eliminació automàtica de codi no usat del bundle. Rellevant per a l'arquitectura: la separació clara en capes facilita identificar quins serveis i hooks no s'usen i eliminar-los.

**Dependency Inversion Principle (DIP)** — El principi SOLID "D". En React: un component no hauria de dependre directament d'un servei concret; la lògica s'injecta via props/callbacks. `<LoginForm onSubmit={fn}>` en lloc de `import api from 'api'` directament al component. Permet testar el component sense el servei real.

**Destructuring Props** — Característica de JavaScript (ES2015) que permet extreure propietats d'objectes directament als paràmetres de la funció. `function Component({ nom, ...restProps })`. Millora la llegibilitat i permet separar les props pròpies del component de les que s'han de passar als elements nadius via spread.

**DIP** — Veure *Dependency Inversion Principle*.

**Encapsulació** — Amagar els detalls d'implementació darrere d'una API pública. En React: un Custom Hook encapsula la complexitat d'un `useEffect` (subscripcions, cleanup, race conditions) i exposa únicament el valor resultant. Els Compound Components encapsulen l'estat compartit darrere d'una API declarativa.

**Feature-Sliced Design** — Arquitectura alternativa a la separació per tipus (components/hooks/services) on el codi s'organitza per funcionalitat: `features/auth/`, `features/carret/`, `features/productes/`. Cada feature conté els seus propis components, hooks i serveis. Recomanada per a aplicacions grans.

**Generics TypeScript (HOC)** — Sintaxi TypeScript per a HOCs type-safe: `function withAuth<P extends object>(Component: React.ComponentType<P>)`. El genèric `P` representa les props del component embolcallat, permetent que el HOC preservi el tipat del component original.

**HOC (Higher-Order Component)** — Una funció que pren un component i retorna un nou component millorat. Convenció de noms: `with` \+ comportament (`withAuth`, `withLoading`). Equivalent en components al que les Higher-Order Functions son en JavaScript. Comparteix lògica entre components al moment de la composició (en el punt d'importació), a diferència dels Custom Hooks que comparteixen lògica en temps d'execució.

**`HTMLAttributes<HTMLInputElement>`** — Tipus de TypeScript (`InputHTMLAttributes<HTMLInputElement>`) que representa tots els atributs nadius d'un element `<input>`. Usar-lo com a base per a les props d'un component Input assegura el compliment del Liskov Substitution Principle: el component és intercanviable amb l'`<input>` nadiu.

**Interface Segregation Principle (ISP)** — El principi SOLID "I". En React: els components no haurien de dependre de props que no usen. `<Thumbnail coverUrl={url}>` en lloc de `<Thumbnail video={video}>` quan `Thumbnail` únicament usa `coverUrl`. Fa els components més reutilitzables perquè poden rebre qualsevol objecte que tingui la propietat necessària.

**ISP** — Veure *Interface Segregation Principle*.

**JSX Spread Attributes** — Sintaxi JSX per passar totes les propietats d'un objecte com a atributs: `<div {...props} />`. Clau per al patró Proxy Component i per al compliment del LSP: permet passar-ho tot al component base sense llistar cada prop individualment. L'ordre importa: les props posteriors sobreescriuen les anteriors.

**Layout Component** — Component que defineix l'estructura i posició visual d'altres components sense saber res del contingut que aculle. Exemples: `<HoritzontalSplit left={...} right={...} />`, `<Grid columns={3}>`. Mai re-renderitza per canvis de contingut; únicament per canvis de la seva pròpia configuració de layout.

**Liskov Substitution Principle (LSP)** — El principi SOLID "L". En React: un component derivat hauria de ser substituïble pel component base. Un `CustomInput` basat en `<input>` hauria d'acceptar tots els mateixos props (`InputHTMLAttributes<HTMLInputElement>`) i ser intercanviable amb `<input>` en qualsevol context.

**LSP** — Veure *Liskov Substitution Principle*.

**`merge className`** — Patró per combinar classes CSS base d'un component amb classes externes passades via prop `className`. Requereix desestructurar `className` i combinar manualment amb les classes base. Solució recomanada: `cn('btn', className)` amb `clsx` o `tailwind-merge`.

**Middleware (Redux)** — Codi que intercepta les accions (actions) de Redux abans que arribin al reducer. Permet gestionar operacions asíncrones (`createAsyncThunk`), logging, i analytics. Una de les raons principals per escollir Redux sobre Context API quan cal gestionar efectes secundaris complexos.

**OCP** — Veure *Open-Closed Principle*.

**Open-Closed Principle (OCP)** — El principi SOLID "O". En React: un component hauria de ser extensible sense modificar el seu codi font original. S'implementa principalment via composició: `<Header>{children}</Header>` permet afegir contingut diferent a cada pàgina sense tocar `Header`. Cada nova pàgina "estén" Header sense modificar-lo.

**Paral·lelisme de Desenvolupament** — Benefici de l'arquitectura en capes: equips independents treballen simultàniament en capes diferents gràcies a contractes clars (interfícies TypeScript). El equip de presentació usa dades mock mentre el backend no está llest.

**Patró de Disseny** — Solució reutilitzable a un problema comú en el disseny de software. En React: Container/Presenter, HOC, Render Props, Compound Components, etc. No son biblioteques ni codi específic, sinó plantilles conceptuals aplicables a problemes recurrents.

**Presenter Component** — Component pur que únicament rep props i retorna JSX. Sense fetch, sense efectes secundaris, sense lògica de negoci. Altament reutilitzable (amb dades reals, mock, Storybook). Testejable sense mocks de xarxa. En la versió moderna, qualsevol component funcional que usa un Custom Hook per obtenir les seves dades.

**Presentation-Domain-Data Layering** — Model arquitectònic de Martin Fowler que separa les aplicacions en tres capes: presentació (UI), domini (lògica de negoci), i dades (accés a dades). El benefici principal és "reduir l'àmbit d'atenció": quan treballes en la presentació pots ignorar com es gestionen les dades.

**Proxy Component** — Component que embolcalla un element HTML natiu per garantir atributs consistents i afegir comportament per defecte. `const Button = (props) => <button type="button" {...props} />`. Aplica el principi DRY: escriu l'atribut `type="button"` una sola vegada i s'aplica a tots els botons de l'aplicació.

**`React.Children.only`** — API de React per garantir que un component rep exactament un component fill. Útil per a components de layout i providers que han de tenir un sol fill directe.

**`React.memo`** — HOC de React que evita re-renders innecessaris comparant les props per referència. El HOC més usat de React. Únicament val la pena quan el component és pur (principi SRP) i les props canvien poc freqüentment.

**Reducer (Redux)** — Funció pura que rep l'estat actual i una acció, i retorna el nou estat. `(state, action) => newState`. Redux Toolkit permet "mutar" l'estat directament (usa Immer internament per convertir-ho a immutable). La unitat de lògica de negoci en Redux.

**Render Prop** — Patró on un component rep una funció com a prop (o `children`) que crida per renderitzar el contingut. La funció rep dades o comportament del component i retorna JSX. Permet màxima flexibilitat de renderitzat: la lògica viu al component, la presentació la controla el consumidor.

**Rest Parameter Syntax** — Sintaxi JavaScript (`...restProps`) per recollir les propietats restants d'un objecte en una nova variable. En React: `function Comp({ prop1, prop2, ...restProps })` → `restProps` conté totes les props no desestructurades, listes per passar via spread al component base.

**Selector (Redux)** — Funció que extreu i transforma dades del store de Redux: `useSelector(state => state.carret.items)`. Permet re-renders quirúrgics: el component únicament es re-renderitza quan el valor retornat pel selector canvia. Un avantatge clau de Redux sobre Context API.

**Separated Presentation** — Terme de Martin Fowler per al patró de separar lògica de presentació de lògica de domini. La base teòrica del patró Container/Presenter en React.

**Single Responsibility Principle (SRP)** — El principi SOLID "S". En React: cada component, hook, o funció hauria de tenir una sola responsabilitat. Senyals que un component viola SRP: molts `if` que canvien el comportament, moltes props opcionals usades en subsets distints en contextos diferents, o un component que fa fetch, filtra, i renderitza alhora.

**Slice (Redux Toolkit)** — Unitat de configuració de Redux Toolkit que combina el nom de l'estat, l'estat inicial, i els reducers en un sol lloc: `createSlice({ name, initialState, reducers })`. Genera automàticament els action creators i els action types. La manera moderna de definir estat en Redux.

**SOLID** — Acrònim de cinc principis de disseny: Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion. Nascuts del món OOP però aplicables a React amb certes adaptacions. L'objectiu comú: minimitzar l'acoblament i maximitzar la cohesió i la reutilització.

**SRP** — Veure *Single Responsibility Principle*.

**State Hoisting (Lifting State Up)** — Patró on l'estat es mou al component pare comú més proper quan múltiples fills necessiten accedir-hi o modificar-lo. El pare posseeix l'estat i el passa als fills via props. Els fills comuniquen canvis via callback props. Fonamental per mantenir components fills com a Presenters purs.

**Store (Redux)** — El contenidor centralitzat de tot l'estat de l'aplicació en Redux. Creat amb `configureStore`. Accessible des de qualsevol component via `useSelector` i `useDispatch`. A diferència de Context API, el store viu fora de React i no causa re-renders globals quan canvia.

**Style Component** — Variant del Proxy Component que centralitza la gestió d'estils. `<PrimaryBtn>` que és un `<Btn primary>` que és un `<button type="button" className="btn btn-primary">`. Permet canviar l'estil d'un nivell sense afectar els altres.

**Tree Shaking** — Eliminació de codi no usat del bundle. L'arquitectura en capes facilita el tree shaking: com que cada capa importa únicament el que necessita, el bundler pot identificar i eliminar codi no referenciat.  
**`useContext`** — Hook de React per consumir un Context. `const valor = useContext(MeuContext)`. Disponible en qualsevol component fill del Provider, independentment de la profunditat. La base del patró Compound Components.

**`useReducer`** — Hook de React per gestionar estat complex seguint el patró reducer. `const [state, dispatch] = useReducer(reducer, initialState)`. Combinat amb Context, ofereix una alternativa lleugera a Redux per a aplicacions de mida mitjana.

**`useSelector`** — Hook de React Redux per llegir dades del store. Accepta una funció selector que rep el store complet i retorna únicament la part necessària. El component únicament es re-renderitza quan el valor retornat canvia. La peça clau del rendiment superior de Redux sobre Context per a actualitzacions freqüents.

**Wrapper Hell** — Anti-patró on la composició de molts HOC crea un arbre de components profundament aniuat i difícil de llegir en React DevTools: `withAuth(withLoading(withLogger(withTheme(Component))))`. Raó principal per migrar de HOC a Custom Hooks quan és possible.  
