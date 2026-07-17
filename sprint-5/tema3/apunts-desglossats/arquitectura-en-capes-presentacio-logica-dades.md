## **Quins beneficis ofereix una arquitectura en capes (presentació/lògica/dades)?**

**Les tres capes en el Context de React**

Una de les maneres més comunes de modularitzar un programa ric en informació és separar-lo en tres capes àmplies: presentació (UI), lògica de domini (aka lògica de negoci), i accés a dades. 

El seu avantatge principal és que permet **reduir l'àmbit d'atenció**, permetent pensar en els tres temes de manera relativament independent.

| ┌─────────────────────────────────┐│  CAPA DE PRESENTACIÓ            ││  Components React, JSX, Styles  ││  "Com es veu i com interactua"  │├─────────────────────────────────┤│  CAPA DE LÒGICA                 ││  Custom Hooks, Business Logic   ││  "Quèfa i com ho decideix"      │├─────────────────────────────────┤│  CAPA DE DADES                  ││  API calls, Cache, State Global ││  "D'on venen les dades"         │└─────────────────────────────────┘ |
| :---- |

Les dependències van de dalt cap avall: presentació depèn de lògica, que depèn de dades. La capa superior no sap com funciona la inferior.

**L'estructura de carpetes en capes**

| src/├── components/          ← CAPA PRESENTACIÓ│   ├── ui/              ← components purs reutilitzables│   │   ├── Button.tsx│   │   ├── Card.tsx│   │   └── Spinner.tsx│   └── features/        ← components de feature específics│       ├── ProductCard.tsx│       └── UserAvatar.tsx│├── hooks/               ← CAPA LÒGICA│   ├── useProductes.ts│   ├── useAuth.ts│   └── useCarret.ts│├── services/            ← CAPA DADES│   ├── api/│   │   ├── productes.api.ts│   │   └── usuaris.api.ts│   └── store/│       └── carret.store.ts│└── types/               ← Compartit entre capes    └── index.ts |
| :---- |

**Benefici 1: Reduir l'àmbit d'atenció**

El benefici principal de Fowler: quan treballo en codi de lògica de domini puc ignorar principalment la UI i tractar qualsevol interacció amb fonts de dades com un conjunt abstracte de funcions. 

Quan treballo en la presentació puc enfocar-me en el comportament de la UI, tractant qualsevol dada a mostrar com si aparegués màgicament per crida de funció.

| // CAPA DADES: únicament penses en com obtenir i transformar dades// src/services/api/productes.api.tsexport async function fetchProductes(filtres: Filtres): Promise\<Producte\[\]\> {  const params \= new URLSearchParams({ ...filtres });  const resposta \= await fetch(\`/api/productes?${params}\`);  if (\!resposta.ok) throw new Error('Error carregant productes');  return resposta.json();}// → Quan treballes aquí: penses en URLs, headers, errors HTTP// → NO penses en: spinners, components, JSX// CAPA LÒGICA: únicament penses en quan i com usar les dades// src/hooks/useProductes.tsexport function useProductes(filtres: Filtres) {  const \[productes, setProductes\] \= useState\<Producte\[\]\>(\[\]);  const \[loading, setLoading\] \= useState(true);  const \[error, setError\] \= useState\<Error | null\>(null);  useEffect(() \=\> {    let ignore \= false;    setLoading(true);    fetchProductes(filtres)      .then(data \=\> { if (\!ignore) { setProductes(data); setLoading(false); } })      .catch(err \=\> { if (\!ignore) { setError(err); setLoading(false); } });    return () \=\> { ignore \= true; };  }, \[filtres\]);  return { productes, loading, error };}// → Quan treballes aquí: penses en loading states, errors, dependències// → NO penses en: botons, colors, layout// CAPA PRESENTACIÓ: únicament penses en com mostrar les dades// src/components/features/LlistaProductes.tsxfunction LlistaProductes({ filtres }: { filtres: Filtres }) {  const { productes, loading, error } \= useProductes(filtres);  if (loading) return \<Spinner /\>;  if (error) return \<Error missatge={error.message} /\>;  return (    \<ul\>      {productes.map(p \=\> \<ProductCard key={p.id} producte={p} /\>)}    \</ul\>  );}// → Quan treballes aquí: penses en JSX, layout, estils, UX// → NO penses en: fetch, loading state, errors de xarxa |
| :---- |

**Benefici 2: Substitució d'implementacions**

La separació permet construir múltiples presentacions sobre la mateixa lògica de domini sense duplicar-la. Múltiples presentacions podrien ser pàgines separades en una web app, tenir una web app més apps mòbil natives, o fins i tot una interfície de línia de comandes.

| // La capa de lògica NO canviaconst { productes, loading, error } \= useProductes(filtres);// Múltiples presentacions sobre la mateixa lògica:\<LlistaProductes filtres={filtres} /\>      // ← vista de llista\<GridProductes filtres={filtres} /\>        // ← vista de graella\<TaulaProductes filtres={filtres} /\>       // ← vista de taula\<MapaProductes filtres={filtres} /\>        // ← vista de mapa// La capa de dades NO canvia// Canviar de fetch natiu a TanStack Query: únicament toca la capa de dades// ❌ Implementació manual:export function useProductes(filtres) {  const \[productes, setProductes\] \= useState(\[\]);  useEffect(() \=\> {    fetch('/api/productes').then(r \=\> r.json()).then(setProductes);  }, \[\]);  return { productes };}// ✅ Migrar a TanStack Query: únicament canvia la capa de lògicaexport function useProductes(filtres) {  return useQuery({    queryKey: \['productes', filtres\],    queryFn: () \=\> fetchProductes(filtres),  });}// → Els components de presentació NO canvien absolutament res |
| :---- |

**Benefici 3: Testabilitat per capes**

Les fronteres del mòdul exposen costures que son bona oportunitat per als tests. 

El codi UI és sovint difícil de testar, de manera que és bo posar tanta lògica com sigui possible en una capa de domini que és fàcilment testada sense haver de fer gimnàstica per accedir al programa a través d'una UI.

| // TEST CAPA DADES: pura, sense React// src/services/api/productes.api.test.tstest('fetchProductes retorna els productes filtrats', async () \=\> {  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({    ok: true,    json: async () \=\> \[{ id: '1', nom: 'Producte A' }\]  }));  const resultat \= await fetchProductes({ categoria: 'esport' });  expect(resultat).toHaveLength(1);  expect(resultat\[0\].nom).toBe('Producte A');});// → Zero components, zero DOM, zero render → molt ràpid// TEST CAPA LÒGICA: hook aïllat// src/hooks/useProductes.test.tsimport { renderHook, waitFor } from '@testing-library/react';test('useProductes carrega els productes correctament', async () \=\> {  vi.mocked(fetchProductes).mockResolvedValue(\[    { id: '1', nom: 'Producte A', preu: 10 }  \]);  const { result } \= renderHook(() \=\> useProductes({}));  expect(result.current.loading).toBe(true);  await waitFor(() \=\> expect(result.current.loading).toBe(false));  expect(result.current.productes).toHaveLength(1);});// → Test del hook sense render de component → més senzill que testar la UI// TEST CAPA PRESENTACIÓ: component pur sense xarxa// src/components/features/LlistaProductes.test.tsxtest('mostra els productes quan es carreguen', () \=\> {  vi.mocked(useProductes).mockReturnValue({    productes: \[{ id: '1', nom: 'Producte A', preu: 10 }\],    loading: false,    error: null,  });  render(\<LlistaProductes filtres={{}} /\>);  expect(screen.getByText('Producte A')).toBeVisible();});// → Mock del hook → zero xarxa, zero useEffect → tests trivials |
| :---- |

**Benefici 4: Paral·lelisme en el desenvolupament**

L'arquitectura en capes permet que diverses persones o equips treballin en paral·lel:

Equip A (Disseny/UX):  
  → Treballa en LlistaProductes.tsx usant dades mock  
  → No necessita esperar que el backend estigui llest

Equip B (Frontend/Lògica):  
  → Treballa en useProductes.ts definint l'estructura de dades  
  → No necessita que la UI estigui acabada

Equip C (Backend/API):  
  → Treballa en l'endpoint /api/productes  
  → No necessita saber res de React

→ Cada equip treballa amb un contracte clar (les interfícies TypeScript)  
→ Integration és senzilla perquè les capes ja estan ben definides

**Benefici 5: Reutilització i manteniment**

| // La lògica canvia en UN sol lloc → tots els consumers actualitzats// src/hooks/useProductes.ts// ABANS: paginació manualexport function useProductes(filtres: Filtres) {  const \[productes, setProductes\] \= useState\<Producte\[\]\>(\[\]);  useEffect(() \=\> { /\* fetch simple \*/ }, \[filtres\]);  return { productes };}// DESPRÉS: afegir caché i paginació → ZERO canvis als componentsexport function useProductes(filtres: Filtres) {  return useQuery({    queryKey: \['productes', filtres\],    queryFn: () \=\> fetchProductes(filtres),    staleTime: 5 \* 60 \* 1000,  // ← nou: caché 5 minuts    select: data \=\> data.slice(0, 20), // ← nou: paginació  });}// → LlistaProductes, GridProductes, TaulaProductes → cap canvi necessari |
| :---- |

**Antipatró: barrejar capes**

| // ❌ MAL: tot barrejat en un component (monolítica)function PàginaProductes() {  // Capa dades dins del component:  const \[productes, setProductes\] \= useState(\[\]);  useEffect(() \=\> {    fetch('/api/productes')      .then(r \=\> r.json())      .then(data \=\> setProductes(data.filter(p \=\> p.actiu)));  }, \[\]);  // Capa lògica dins del component:  const productesFiltrats \= productes    .filter(p \=\> p.estoc \> 0)    .sort((a, b) \=\> a.preu \- b.preu);  // Capa presentació dins del component:  return \<ul\>{productesFiltrats.map(p \=\> \<li\>{p.nom}: {p.preu}€\</li\>)}\</ul\>;}// → Impossible testar la UI sense fer fetch real// → Impossible reutilitzar la lògica de filtratge// → Impossible canviar la presentació sense tocar la lògica de dades |
| :---- |

**Resum**

| Benefici | Descripció |
| ----- | ----- |
| **Àmbit d'atenció** | Cada capa té una sola responsabilitat → menys coses a pensar a la vegada |
| **Substitució** | Canviar la implementació d'una capa sense afectar les altres |
| **Testabilitat** | Cada capa es testa de manera independent i aïllada |
| **Paral·lelisme** | Equips independents treballen simultàniament amb contractes clars |
| **Manteniment** | Canvis en un lloc propaguen a tots els consumers automàticament |

La regla pràctica per a React:

  DADES:        services/ i stores/  
                → fetch, transformació, caché, estat global  
  LÒGICA:       hooks/  
                → Custom Hooks, business rules, estat local complex  
  PRESENTACIÓ:  components/  
                → JSX pur, styles, UX

  Les dependències van cap avall:  
    components → hooks → services  
    Presentació → Lògica → Dades  
    Mai al revés (una service mai importa un component)

