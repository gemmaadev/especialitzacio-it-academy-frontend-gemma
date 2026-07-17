## **Principis SOLID en React**

**Principis SOLID en React**  
[https://konstantinlebedev.com/solid-in-react/](https://konstantinlebedev.com/solid-in-react/)  
Article que mostra com aplicar els principis SOLID al desenvolupament amb React.

SOLID és un acrònim de cinc principis de disseny nascuts del món de la programació orientada a objectes. 

Tot i que React és funcional i no orientat a objectes, els principis son prou abstractes per aplicar-se si ens prenem algunes llibertats d'interpretació. L'objectiu és el mateix: codi més mantenible, menys acoblat, i més reutilitzable.

**S — Single Responsibility Principle (SRP)**

La definició original: "cada classe hauria de tenir únicament una responsabilitat". En React: **cada funció/mòdul/component hauria de fer exactament una cosa**.

| // ❌ MAL: un component que fa massa cosesconst ActiveUsersList \= () \=\> {  const \[users, setUsers\] \= useState(\[\]);  useEffect(() \=\> {    fetch('/api/users').then(r \=\> r.json()).then(setUsers);  }, \[\]);  const weekAgo \= new Date();  weekAgo.setDate(weekAgo.getDate() \- 7);  return (    \<ul\>      {users        .filter(u \=\> \!u.isBanned && u.lastActivityAt \>= weekAgo)        .map(u \=\> (          \<li key={u.id}\>            \<img src={u.avatarUrl} /\>            \<p\>{u.fullName}\</p\>          \</li\>        ))}    \</ul\>  );};// → Fa: fetch de dades, filtratge, renderitzat de llista, renderitzat d'item |
| :---- |

| // ✅ BÉ: responsabilitats separades en peces específiques// 1\. Hook per al fetch (únicament dades brutes)const useUsers \= () \=\> {  const \[users, setUsers\] \= useState\<User\[\]\>(\[\]);  useEffect(() \=\> {    fetch('/api/users').then(r \=\> r.json()).then(setUsers);  }, \[\]);  return { users };};// 2\. Funció utilitària per al filtratge (pura, testejable)const getActiveUsers \= (users: User\[\]) \=\> {  const weekAgo \= new Date();  weekAgo.setDate(weekAgo.getDate() \- 7);  return users.filter(u \=\> \!u.isBanned && u.lastActivityAt \>= weekAgo);};// 3\. Hook per a la lògica compostaconst useActiveUsers \= () \=\> {  const { users } \= useUsers();  const activeUsers \= useMemo(() \=\> getActiveUsers(users), \[users\]);  return { activeUsers };};// 4\. Component per a cada item (únicament renderitza)const UserItem \= ({ user }: { user: User }) \=\> (  \<li\>    \<img src={user.avatarUrl} /\>    \<p\>{user.fullName}\</p\>  \</li\>);// 5\. Component principal (únicament orquestra)const ActiveUsersList \= () \=\> {  const { activeUsers } \= useActiveUsers();  return (    \<ul\>      {activeUsers.map(u \=\> \<UserItem key={u.id} user={u} /\>)}    \</ul\>  );}; |
| :---- |

**Senyals d'alarma:** molts `if` que canvien el comportament, moltes props opcionals on en contextos diferents uses subsets distints → probablement és un component fent massa coses.

**O — Open-Closed Principle (OCP)**

"Les entitats de software haurien d'estar obertes per a l'extensió, però tancades per a la modificació." En React: **un component s'hauria de poder estendre sense modificar el seu codi font original**.

| // ❌ MAL: Header que s'ha de modificar per a cada nova pàginaconst Header \= () \=\> {  const { pathname } \= useRouter();  return (    \<header\>      \<Logo /\>      \<Actions\>        {pathname \=== '/dashboard' && \<Link to="/events/new"\>Crear event\</Link\>}        {pathname \=== '/' && \<Link to="/dashboard"\>Anar al dashboard\</Link\>}        {/\* Cada nova pàgina requereix modificar aquest component\! \*/}      \</Actions\>    \</header\>  );}; |
| :---- |

| // ✅ BÉ: Header extensible via composition (children / render props)const Header \= ({ children }: { children?: React.ReactNode }) \=\> (  \<header\>    \<Logo /\>    \<Actions\>{children}\</Actions\>  \</header\>);// Cada pàgina estén Header sense modificar-loconst HomePage \= () \=\> (  \<\>    \<Header\>      \<Link to="/dashboard"\>Anar al dashboard\</Link\>    \</Header\>    \<OtherHomeStuff /\>  \</\>);const DashboardPage \= () \=\> (  \<\>    \<Header\>      \<Link to="/events/new"\>Crear event\</Link\>    \</Header\>    \<OtherDashboardStuff /\>  \</\>);// → Afegir una nova pàgina → ZERO modificacions a Header |
| :---- |

**L — Liskov Substitution Principle (LSP)**

"Els objectes subtype haurien de ser substituïbles per objectes supertype." En React: **un component derivat hauria de ser intercanviable pel component base sense trencar l'aplicació**.

| // ❌ MAL: CustomInput trenca la interfície d'\<input\>// Redefineixes els props en lloc de reutilitzar-lostype BadProps \= { value: string; onChange: () \=\> void };const CustomInput \= ({ value, onChange }: BadProps) \=\> (  \<input value={value} onChange={onChange} /\>  // → Perdem: placeholder, disabled, type, maxLength...  // → No intercanviable amb \<input\> natiu);// ✅ BÉ: CustomInput hereta tots els props d'\<input\>type Props \= React.InputHTMLAttributes\<HTMLInputElement\>;const CustomInput \= ({ onChange, ...props }: Props) \=\> {  const handleChange \= (e: React.ChangeEvent\<HTMLInputElement\>) \=\> {    // ... lògica addicional    onChange?.(e);  };  return \<input {...props} onChange={handleChange} /\>;  // → Pren i passa TOTS els props → intercanviable amb \<input\>};// Ara pots substituir \<input\> per \<CustomInput\> sense trencar res:\<input type\="email" placeholder="Email" disabled={loading} /\>\<CustomInput type\="email" placeholder="Email" disabled={loading} /\>// → Idèntics des del punt de vista del component pare |
| :---- |

**I — Interface Segregation Principle (ISP)**

"Els clients no haurien de dependre d'interfícies que no usen." En React: **els components no haurien de dependre de props que no usen**.

| // ❌ MAL: Thumbnail depèn de l'objecte Video sencertype Video \= { title: string; duration: number; coverUrl: string };const Thumbnail \= ({ video }: { video: Video }) \=\> (  \<img src={video.coverUrl} /\>  // → Usa ÚNICAMENT coverUrl però exigeix l'objecte Video complet\!);// Problema: no pots usar Thumbnail amb LiveStreamtype LiveStream \= { name: string; previewUrl: string };// → LiveStream no té 'coverUrl' → incompatible\! → component no reutilitzable |
| :---- |

| // ✅ BÉ: Thumbnail depèn únicament del que necessitaconst Thumbnail \= ({ coverUrl }: { coverUrl: string }) \=\> (  \<img src={coverUrl} /\>);// Ara funciona amb qualsevol tipus de media:\<Thumbnail coverUrl={video.coverUrl} /\>         // ← Video\<Thumbnail coverUrl={liveStream.previewUrl} /\>   // ← LiveStream\<Thumbnail coverUrl={podcast.thumbnailUrl} /\>    // ← Podcast// ISP fa els components MOLT més reutilitzables// La regla: passa la dada mínima necessària, no l'objecte complet |
| :---- |

**D — Dependency Inversion Principle (DIP)**

"S'hauria de dependre d'abstraccions, no de concrecions." En React: **un component no hauria de dependre directament d'un altre component o servei concret; ambdós haurien de dependre d'una abstracció**.

| // ❌ MAL: LoginForm acoblat directament al mòdul apiimport api from '\~/common/api';const LoginForm \= () \=\> {  const handleSubmit \= async (e: React.FormEvent) \=\> {    e.preventDefault();    await api.login(email, password); // ← dependència directa\!  };  // → No pots testar LoginForm sense cridar l'API real  // → Canviar d'api a un altre servei requereix modificar el component}; |
| :---- |

| // ✅ BÉ: LoginForm depèn d'una abstracció (callback prop)type Props \= {  onSubmit: (email: string, password: string) \=\> Promise\<void\>;  // ↑ L'abstracció: una funció que rep email i password};const LoginForm \= ({ onSubmit }: Props) \=\> {  const handleSubmit \= async (e: React.FormEvent) \=\> {    e.preventDefault();    await onSubmit(email, password); // ← depèn de l'abstracció, no de l'api  };  return \<form onSubmit={handleSubmit}\>...\</form\>;};// La implementació concreta viu a fora:import api from '\~/common/api';const ConnectedLoginForm \= () \=\> (  \<LoginForm    onSubmit={(email, password) \=\> api.login(email, password)}  /\>);// TEST: LoginForm testejable sense cap servei real\!test('crida onSubmit en enviar', async () \=\> {  const mockSubmit \= vi.fn();  render(\<LoginForm onSubmit={mockSubmit} /\>);  // ... interactuar amb el formulari  expect(mockSubmit).toHaveBeenCalledWith('anna@e.com', 'pass123');}); |
| :---- |

**Resum: SOLID en React**

| Principi | OOP original | En React |
| ----- | ----- | ----- |
| **SRP** | Una classe, una responsabilitat | Un component/hook fa una sola cosa |
| **OCP** | Obert per extensió, tancat per modificació | Extensible via `children`, render props |
| **LSP** | Subtipus substituïble per supertipus | Extends props nadius (`InputHTMLAttributes`) |
| **ISP** | Interfícies mínimes | Props mínimes: no passar objecte sencer |
| **DIP** | Dependre d'abstraccions | Injectar lògica via props/callbacks |

 