**¿Com optimitzar el maneig d'estats de càrrega i error per a una millor experiència d'usuari?**

**Els tres estats obligatoris de qualsevol crida a l'API**

Quan construeixes aplicacions en React, la majoria de components depenen de dades obtingudes d'APIs. Quan fas fetch de dades en React, hi ha tres estats possibles a gestionar: Loading state (l'app espera la resposta de l'API), Success state (les dades han arribat correctament), Error state (alguna cosa ha anat malament).

Com gestiones els estats de càrrega i error impacta directament la fiabilitat i l'experiència d'usuari de l'app. Si els usuaris veuen pantalles en blanc, spinners que no s'aturen mai, o missatges d'error confusos, perdran la confiança ràpidament.

| // El model base: estat discriminat amb TypeScripttype EstatAPI\<T\> \=  | { status: 'inactiu' }  | { status: 'carregant' }  | { status: 'exit'; dades: T }  | { status: 'error'; error: Error; potReintentar: boolean };// En lloc de múltiples booleans independents (antipatró):// ❌ const \[carregant, setCarregant\] \= useState(false);// ❌ const \[error, setError\] \= useState(null);// ❌ const \[dades, setDades\] \= useState(null);// → poden tenir combinacions impossibles (carregant=true i dades=true alhora)// ✅ Un sol estat amb totes les possibilitats:const \[estat, setEstat\] \= useState\<EstatAPI\<Usuari\[\]\>\>({ status: 'inactiu' }); |
| :---- |

**Estat de Càrrega: spinners vs. skeleton loaders**

Skeleton screens proporcionen una alternativa més neta i moderna al mètode tradicional del spinner. Proporcionen una previsualització de baixa fidelitat del contingut que apareixerà un cop les dades es carreguin des d'un endpoint.

Usa skeleton screens en lloc de spinners quan sigui possible per reduir el temps de càrrega percebut.

| // ❌ Spinner genèric: no orienta l'usuari sobre el que carregarà{carregant && \<div className="spinner" /\>}// ✅ Skeleton loader: imita l'estructura real del contingutfunction SkeletonCardUsuari() {  return (    \<div className="card animate-pulse"\>      \<div className="w-12 h-12 bg-gray-200 rounded-full" /\>  {/\* avatar \*/}      \<div className="flex-1 space-y-2"\>        \<div className="h-4 bg-gray-200 rounded w-3/4" /\>      {/\* nom \*/}        \<div className="h-3 bg-gray-200 rounded w-1/2" /\>      {/\* email \*/}      \</div\>    \</div\>  );}function LlistaUsuaris() {  const \[estat, setEstat\] \= useState\<EstatAPI\<Usuari\[\]\>\>({ status: 'carregant' });  if (estat.status \=== 'carregant') {    // 5 placeholders imiten la llista que carregarà    return (      \<div\>        {Array.from({ length: 5 }).map((\_, i) \=\> (          \<SkeletonCardUsuari key={i} /\>        ))}      \</div\>    );  }  if (estat.status \=== 'exit') {    return estat.dades.map(u \=\> \<CardUsuari key={u.id} usuari={u} /\>);  }} |
| :---- |

**Quan usar cada un:**

| Tipus | Quan usar |
| ----- | ----- |
| **Spinner** | Operacions curtes (\<500ms), accions (guardar, eliminar) |
| **Skeleton** | Càrrega inicial de contingut, llistes, targetes |
| **Barra de progrés** | Quan coneixes el progrés real (upload, descàrrega) |
| **Optimistic UI** | Accions que gairebé sempre surten bé (like, toggle) |

**Un Custom Hook per centralitzar la lògica**

Centralitza la gestió d'errors amb custom hooks per evitar repetir lògica en tots els components.

| // hooks/useFetch.tsinterface OpcionsFetch\<T\> {  url: string;  transformador?: (dades: unknown) \=\> T;  executarImmediatament?: boolean;}function useFetch\<T\>({ url, transformador, executarImmediatament \= true }: OpcionsFetch\<T\>) {  const \[estat, setEstat\] \= useState\<EstatAPI\<T\>\>({ status: 'inactiu' });  const executar \= useCallback(async () \=\> {    setEstat({ status: 'carregant' });    try {      const { data } \= await axios.get\<T\>(url);      const dadesProcessades \= transformador ? transformador(data) : data;      setEstat({ status: 'exit', dades: dadesProcessades });    } catch (error) {      const errorProcessat \= error instanceof Error ? error : new Error('Error desconegut');      const esErrorXarxa \= \!axios.isAxiosError(error) || \!error.response;      setEstat({        status: 'error',        error: errorProcessat,        potReintentar: esErrorXarxa // errors de xarxa: sí; 401/403: no té sentit reintentar      });    }  }, \[url\]);  useEffect(() \=\> {    if (executarImmediatament) executar();  }, \[executar, executarImmediatament\]);  return { estat, reintentar: executar };}// Ús al component:function PaginaUsuaris() {  const { estat, reintentar } \= useFetch\<Usuari\[\]\>({ url: '/api/usuaris' });  if (estat.status \=== 'carregant') return \<SkeletonLlista /\>;  if (estat.status \=== 'error') return (    \<MissatgeError      missatge={estat.error.message}      mostrarReintentar={estat.potReintentar}      onReintentar={reintentar}    /\>  );  if (estat.status \=== 'exit') return \<LlistaUsuaris dades={estat.dades} /\>;  return null;} |
| :---- |

**Gestió d'errors: missatges útils per a l'usuari**

Distingeix entre errors de xarxa, errors HTTP, i errors de validació: cada un requereix una UX diferent.

|  // Component de gestió d'errors amb contextinterface PropsError {  error: Error;  potReintentar?: boolean;  onReintentar?: () \=\> void;}function MissatgeError({ error, potReintentar, onReintentar }: PropsError) {  // Traduir el codi d'error en un missatge útil per a l'usuari  const missatgeUsuari \= useMemo(() \=\> {    if (axios.isAxiosError(error)) {      switch (error.response?.status) {        case 400: return 'Les dades enviades no son correctes.';        case 401: return 'La teva sessió ha expirat. Torna a iniciar sessió.';        case 403: return 'No tens permís per accedir a aquest contingut.';        case 404: return 'El contingut que busques no existe.';      case 429: return 'Massa peticions. Espera un moment.';        case 500:        case 502:        case 503: return 'El servidor té problemes. Intenta-ho en uns minuts.';        default: return \`Error inesperat (${error.response?.status}).\`;      }    }    if (\!navigator.onLine) return 'Sense connexió a internet.';    return 'No s\\'ha pogut connectar al servidor.';  }, \[error\]);  return (    \<div className="error-container"\>      \<p\>{missatgeUsuari}\</p\>      {potReintentar && onReintentar && (        \<button onClick={onReintentar}\>          Torna a intentar-ho        \</button\>      )}    \</div\>  );} |
| :---- |

**Error Boundaries: capturar errors de renderitzat**

Els Error Boundaries son components React que capturen errors JavaScript a qualsevol lloc de l'arbre de components fills, els registren, i mostren una UI de fallback en lloc de l'arbre de components que ha fallat. No trenca tota l'arbre de components de l'app i únicament renderitza la UI de fallback quan ocorre un error en un component.

| // ErrorBoundary: captura errors en el renderitzat (no en crides async)class ErrorBoundary extends React.Component  { children: React.ReactNode; fallback?: React.ReactNode },  { hiHaError: boolean; error?: Error }\> {  state \= { hiHaError: false };  static getDerivedStateFromError(error: Error) {    return { hiHaError: true, error };  }  componentDidCatch(error: Error, info: React.ErrorInfo) {    // Enviar l'error al servei de monitoring (Sentry, etc.)    console.error('Error capturat per ErrorBoundary:', error, info);  }  render() {    if (this.state.hiHaError) {      return this.props.fallback ?? (        \<div\>Alguna cosa ha anat malament. Recarrega la pàgina.\</div\>      );    }    return this.props.children;  }}// Ús: envolta seccions independents de l'appfunction App() {  return (    \<ErrorBoundary fallback={\<ErrorGlobal /\>}\>      \<ErrorBoundary fallback={\<ErrorWidget nom="Sidebar" /\>}\>        \<Sidebar /\>      \</ErrorBoundary\>      \<ErrorBoundary fallback={\<ErrorWidget nom="Contingut principal" /\>}\>        \<ContingutPrincipal /\>      \</ErrorBoundary\>    \</ErrorBoundary\>  );} |
| :---- |

**Retry amb Exponential Backoff**

Implementa retry logic amb exponential backoff per a fallades de xarxa transitòries.

| // Reintent automàtic amb espera creixentasync function fetchAmbReintent\<T\>(  url: string,  maxIntentos: number \= 3,  retardBase: number \= 1000): Promise\<T\> {  for (let intent \= 0; intent \<= maxIntentos; intent++) {    try {      const { data } \= await axios.get\<T\>(url);      return data;    } catch (error) {      const esUltimIntent \= intent \=== maxIntentos;      const potReintentar \= axios.isAxiosError(error) &&        (\!error.response || error.response.status \>= 500);      if (esUltimIntent || \!potReintentar) throw error;      // Espera exponencial: 1s, 2s, 4s... \+ jitter aleatori      const espera \= retardBase \* Math.pow(2, intent) \+ Math.random() \* 500;      await new Promise(resolve \=\> setTimeout(resolve, espera));    }  }  throw new Error('Màxim d\\'intents assolit');} |
| :---- |

**Cancel·lar peticions quan el component es desmunta**

Si un component es desmunta abans que el fetch acabi, rebràs un warning. Usa abort signals o flags per evitar-ho.

| // Evitar actualitzar l'estat d'un component desmuntatuseEffect(() \=\> {  const controlador \= new AbortController();  axios.get\<Usuari\[\]\>('/api/usuaris', { signal: controlador.signal })    .then(({ data }) \=\> setUsuaris(data))    .catch(error \=\> {      if (\!axios.isCancel(error)) setError(error);      // Ignorem el CancelledError que ocorre en desmuntar    });  // Cleanup: cancel·la la petició si el component es desmunta  return () \=\> controlador.abort();}, \[\]); |
| :---- |

**Optimistic UI: respondre abans que l'API confirmi**

| // Actualitza la UI immediatament, reverteix si hi ha errorfunction LlistaTaskes() {  const \[tasques, setTaskes\] \= useState\<Tasca\[\]\>(\[\]);  async function marcarCompletada(id: number) {    // 1\. Actualitza immediatament (sensació de rapidesa)    const tasquesAnteriors \= tasques;    setTaskes(prev \=\> prev.map(t \=\>      t.id \=== id ? { ...t, completada: true } : t    ));    try {      // 2\. Confirma amb l'API      await axios.patch(\`/api/tasques/${id}\`, { completada: true });    } catch {      // 3\. Si falla, reverteix al estat anterior      setTaskes(tasquesAnteriors);      mostrarToast('No s\\'ha pogut marcar com a completada', 'error');    }  }} |
| :---- |

**Bones pràctiques de càrrega i error**

| Pràctica | Per què |
| ----- | ----- |
| Estat discriminat (`status` unic) | Evita estats impossibles (carregant \+ error alhora) |
| Skeleton loaders | Millora el "perceived performance" vs. spinners |
| Missatges d'error traduïts | L'usuari entén quèha passat i quèpot fer |
| Error Boundary per seccions | Un error no trenca tota l'app |
| Retry amb exponential backoff | Gestiona errors de xarxa temporals |
| Cancel·lar peticions en unmount | Evita memory leaks i warnings de React |
| Optimistic UI per a accions comunes | Sensació de resposta immediata |
| Custom hook `useFetch` | Lògica centralitzada, no repetida en cada component |

