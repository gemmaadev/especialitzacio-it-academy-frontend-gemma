## **Quan és preferible utilitzar Fetch sobre Axios en termes de lleugeresa i dependències?**

**El canvi de paradigma el 2024-2025**

A partir del 2024, Fetch ha assolit suport natiu a Node.js (v18+), fent-lo una opció viable tant per a aplicacions client com servidor. Això canvia la discussió: Fetch ja no és "únicament per al navegador". És ara una API universal disponible a navegadors, Node.js, Deno, Bun i Edge Computing.

En 2025, Fetch és el nou baseline per defecte, i Axios és l'actualització potent i rica en funcionalitats en la qual optes quan la necessites. El fet que Fetch sigui ara natiu tant als navegadors com a Node.js el converteix en un estàndard universal sense dependències.

**La diferència de mida: 0 KB vs \~13 KB**

Fetch és una API nativa del navegador, la qual cosa la fa més lleugera i eficient. Té una mida de bundle menor (fins i tot amb un polyfill), s'executa directament al navegador o Node.js sense abstraccions addicionals, i suporta streaming de respostes al navegador, a diferència d'Axios.

| Mida del bundle:  Fetch:  0 KB  (ja és al navegador/Node.js, no s'instal·la res)  Axios: \~13 KB  (minificat i gzipat)En un projecte petit:  \- 13 KB pot ser el 10-30% del bundle total de l'aplicació  \- En Edge Functions (Cloudflare Workers, Vercel Edge), els limits de mida son molt estrictes  \- Per a biblioteques npm que publiques: cada KB importanpm install axios  → afegeix la dependència al package.json                   → incrementa el node\_modules                   → incrementa el bundle final                   → més risc de supply chain attacks |
| :---- |

**Quan usar Fetch: els casos concrets**

### **Cas 1: Biblioteques i paquets npm**

Si estàs creant una biblioteca que publiques a npm, Fetch és sempre preferible. Afegir Axios com a dependència força tots els usuaris de la teva biblioteca a instal·lar-la també, incrementant el seu bundle innecessàriament.

| // ✅ Biblioteca lleugera sense dependències externes// package.json → "dependencies": {}  (res\!)export async function obtenirDades\<T\>(url: string): Promise\<T\> {  const resposta \= await fetch(url);  if (\!resposta.ok) throw new Error(\`Error HTTP: ${resposta.status}\`);  return resposta.json() as Promise\<T\>;} |
| :---- |

### **Cas 2: Prototips i scripts simples**

| // ✅ Script ràpid: no cal instal·lar res// Per a una crida puntual, Fetch és perfecte i directeconst { data } \= await fetch('/api/usuaris/1')  .then(r \=\> r.json()); |
| :---- |

### **Cas 3: Edge Computing i serverless**

L'adopció creixent de plataformes Edge Computing afavoreix la Fetch API nativa.

| // Cloudflare Worker / Vercel Edge Function// Entorns molt restringits en mida i dependènciesexport default {  async fetch(request: Request): Promise\<Response\> {    // ✅ Fetch és natiu en tots els runtimes Edge    // ❌ Axios pot no estar disponible o pot ser massa gran    const dades \= await fetch('https://api.externa.com/dades');    return new Response(await dades.text());  }}; |
| :---- |

### **Cas 4: Streaming de respostes**

Fetch suporta streaming natiu, cosa que Axios no pot fer bé. Per a descàrregues grans o respostes SSE (Server-Sent Events):

| // ✅ Streaming natiu amb Fetch: processa les dades mentre arribenasync function descarregarFitxerGran(url: string) {  const resposta \= await fetch(url);  const reader \= resposta.body?.getReader();  while (true) {    const { done, value } \= await reader\!.read();    if (done) break;    // Processa cada chunk mentre arriba, sense esperar el final    processarChunk(value);  }}// Server-Sent Events (SSE) \-- ideal per a IA generativa (streams de text)async function\* llegirSSE(url: string) {  const resposta \= await fetch(url);  const lector \= resposta.body\!.getReader();  const decodificador \= new TextDecoder();  while (true) {    const { done, value } \= await lector.read();    if (done) break;    yield decodificador.decode(value);  }} |
| :---- |

### **Cas 5: Frameworks que ja inclouen les seves pròpies abstraccions**

| // ✅ Next.js 13+: usa fetch natiu amb extensions pròpies// Next.js ha ampliat fetch per suportar caching i revalidacióconst dades \= await fetch('/api/productes', {  next: { revalidate: 60 }  // ← extensió de Next.js sobre fetch natiu});// ✅ TanStack Query \+ Fetch: el data fetching el gestiona React Queryimport { useQuery } from '@tanstack/react-query';const { data } \= useQuery({  queryKey: \['usuaris'\],  queryFn: () \=\> fetch('/api/usuaris').then(r \=\> {    if (\!r.ok) throw new Error('Error');    return r.json();  })});// React Query gestiona el caching, loading i error → Fetch és suficient |
| :---- |

**Fetch amb un wrapper: el millor dels dos mons**

Per a projectes petits o aquells que prioritzen la mida mínima del bundle, Fetch amb un wrapper lleuger sovint és suficient. Representa un "millor dels dos mons" que està guanyant tracció significativa.

| // Un wrapper sobre Fetch que imita l'API d'Axios sense la dependènciaclass HttpClient {  private baseURL: string;  private capçaleresDefecte: Record\<string, string\>;  constructor(baseURL: string) {    this.baseURL \= baseURL;    this.capçaleresDefecte \= {      'Content-Type': 'application/json',      'Accept': 'application/json',    };  }  private async peticio\<T\>(    metode: string,    endpoint: string,    opcions: RequestInit \= {}  ): Promise\<T\> {    const token \= localStorage.getItem('token');    const resposta \= await fetch(\`${this.baseURL}${endpoint}\`, {      method: metode,      ...opcions,      headers: {        ...this.capçaleresDefecte,        ...(token ? { Authorization: \`Bearer ${token}\` } : {}),        ...(opcions.headers as Record\<string, string\> || {}),      },    });    if (\!resposta.ok) {      const errorData \= await resposta.json().catch(() \=\> ({}));      throw Object.assign(new Error(\`HTTP ${resposta.status}\`), {        status: resposta.status,        data: errorData,      });    }    return resposta.json() as Promise\<T\>;  }  get\<T\>(endpoint: string) { return this.peticio\<T\>('GET', endpoint); }  post\<T\>(endpoint: string, body: unknown) {    return this.peticio\<T\>('POST', endpoint, { body: JSON.stringify(body) });  }}// Ús: mateixa DX que Axios, mida de bundle: 0 KB addicionalsconst apiClient \= new HttpClient('https://api.exemple.com');const usuaris \= await apiClient.get\<Usuari\[\]\>('/usuaris'); |
| :---- |

**Les alternatives modernes: `ky` i `ofetch`**

En 2025, val la pena considerar un punt mig: biblioteques com `ky` o `ofetch` (usat per Nuxt 3). Aquestes son biblioteques modernes i lleugeres construïdes directament sobre la Fetch API. L'objectiu és proporcionar una experiència de developer similar a Axios (millors defaults, gestió d'errors, hooks) mantenint la mida del bundle molt petita.

| npm install ky    \# \~4 KB → alternativa lleugera a Axios |
| :---- |

| import ky from 'ky';// API molt similar a Axios però basada en Fetch nativaconst usuaris \= await ky.get('/api/usuaris').json\<Usuari\[\]\>();// Hooks (equivalent als interceptors d'Axios)const apiClient \= ky.create({  prefixUrl: 'https://api.exemple.com',  hooks: {    beforeRequest: \[      request \=\> {        const token \= localStorage.getItem('token');        if (token) request.headers.set('Authorization', \`Bearer ${token}\`);      }    \],    afterResponse: \[      async (request, options, response) \=\> {        if (response.status \=== 401) window.location.href \= '/login';      }    \]  }}); |
| :---- |

**El diagrama de decisió final**

| Nova connexió a l'API necessàri           ↓Es publica com a biblioteca npm?  SÍ → Fetch (zero dependències per als teus usuaris)           ↓Projecte petit / script / prototip?  SÍ → Fetch (simple, natiu, zero instal·lació)           ↓Entorn Edge Computing o serverless restringit?  SÍ → Fetch (natiu en tots els runtimes moderns)           ↓El framework ja gestiona el data fetching (Next.js, Nuxt, React Query)?  SÍ → Fetch (les abstraccions del framework son suficients)           ↓Necessites streaming (SSE, descàrregues grans)?  SÍ → Fetch (streaming natiu)           ↓Aplicació gran amb moltes crides, auth, interceptors, equip?  → Axios (o ky com a alternativa lleugera) |
| :---- |

**Resum: Fetch vs. Axios en 2025-2026**

| Factor | Fetch | Axios |
| ----- | ----- | ----- |
| **Mida** | 0 KB ✅ | \~13 KB |
| **Instal·lació** | No cal ✅ | `npm install axios` |
| **Navegadors moderns** | ✅ Natiu | ✅ |
| **Node.js** | v18+ ✅ | Totes les versions |
| **Edge Computing** | ✅ Ideal | Pot ser massa gran |
| **Biblioteques npm** | ✅ Preferit | Afegeix dependència als usuaris |
| **Streaming** | ✅ Natiu | Limitat |
| **Errors HTTP** | Cal verificar `ok` ⚠️ | Automàtics ✅ |
| **Interceptors** | Manual | ✅ Integrats |
| **Timeout** | Manual | ✅ Una línia |
| **JSON** | Manual | ✅ Automàtic |

