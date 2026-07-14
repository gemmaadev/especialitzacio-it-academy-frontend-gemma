**Com es poden compartir estats a través de la URL amb paràmetres de cerca?**

**El Problema: `useState` no és compartible**

Si uses `useState` per gestionar filtres, cerca o paginació, els usuaris no poden compartir la vista actual, el botó enrere no porta als filtres anteriors, i una recàrrega perd tot l'estat.

| // ❌ AMB useState: estat que desapareixfunction LlistaProductes() {  const \[cerca, setCerca\] \= useState('');  const \[categoria, setCategoria\] \= useState('tots');  const \[pàgina, setPàgina\] \= useState(1);  // PROBLEMES:  // → L'usuari filtra per "sabates" i comparteix la URL → l'amic veu tots els productes  // → L'usuari prem F5 → filtres desapareixen  // → L'usuari prem "enrere" → va a la pàgina anterior (no a la pàgina 2 dels filtres)}// ✅ AMB useSearchParams: URL: /productes?cerca=sabates\&categoria=esport\&pàgina=2// → Compartible ✅  → Persistent en recàrrega ✅  → Enrere funciona ✅ |
| :---- |

La gestió d'estat basada en URL proporciona vistes compartibles (els usuaris poden copiar, compartir i guardar URLs que representen estats específics de l'aplicació) i integració amb l'historial del browser.

**`useSearchParams`: el hook principal**

`useSearchParams` és un hook de React Router que retorna un array de dos elements: l'objecte `URLSearchParams` actual i una funció per actualitzar-los. Es comporta com `useState` però emmagatzema els valors directament a la URL.

| import { useSearchParams } from 'react-router-dom';function Component() {  const \[searchParams, setSearchParams\] \= useSearchParams();  //     ↑ URLSearchParams (lectura)   ↑ funció d'actualització  // LLEGIR paràmetres  const cerca \= searchParams.get('cerca');          // string | null  const pàgina \= searchParams.get('pàgina');        // string | null  const mode \= searchParams.get('mode') ?? 'llista'; // valor per defecte  // ACTUALITZAR paràmetres  setSearchParams({ cerca: 'sabates', pàgina: '1' });  // → URL passa a: ?cerca=sabates\&pàgina=1  // ACTUALITZAR preservant els altres paràmetres:  setSearchParams(prev \=\> {    prev.set('pàgina', '2');   // canvia únicament la pàgina    return prev;  });} |
| :---- |

**Els mètodes de URLSearchParams**

| const \[searchParams, setSearchParams\] \= useSearchParams();// LECTURA:searchParams.get('clau')        // → string | null (primer valor)searchParams.getAll('tag')      // → string\[\] (múltiples valors per la mateixa clau)searchParams.has('clau')        // → booleansearchParams.toString()         // → "cerca=sabates\&pàgina=2"// ESCRIPTURA (sempre via setSearchParams, mai mutar directament):setSearchParams({ cerca: 'text' });          // objecte: substitueix totsetSearchParams(\[\['cerca', 'text'\]\]);        // array de tuplessetSearchParams('?cerca=text');              // stringsetSearchParams(new URLSearchParams(...));   // URLSearchParams// Actualitzar PRESERVANT la resta de params (recomanat):setSearchParams(prev \=\> {  prev.set('cerca', 'nou valor');   // modificar un param  prev.delete('categoria');         // eliminar un param  return prev;}); |
| :---- |

Nota important: `searchParams` és una referència estable, de manera que pots usar-la de manera fiable com a dependència en els hooks `useEffect` de React.

**Cas d'ús 1: Cerca i filtres compartibles**

| import { useSearchParams } from 'react-router-dom';import { useDeferredValue } from 'react';function CatalegProductes() {  const \[searchParams, setSearchParams\] \= useSearchParams();  // Llegir de la URL (amb valors per defecte)  const cerca \= searchParams.get('cerca') || '';  const categoria \= searchParams.get('categoria') || 'tots';  const ordre \= searchParams.get('ordre') || 'rellevancia';  // Debounce per no crear una entrada d'historial per cada lletra  const cercaDeferida \= useDeferredValue(cerca);  const actualitzarCerca \= (valor: string) \=\> {    setSearchParams(prev \=\> {      if (valor) prev.set('cerca', valor);      else prev.delete('cerca');      // netejar si és buit      prev.set('pàgina', '1');        // resetar pàgina en cercar      return prev;    });  };  const actualitzarCategoria \= (valor: string) \=\> {    setSearchParams(prev \=\> {      prev.set('categoria', valor);      prev.set('pàgina', '1');        // resetar pàgina en filtrar      return prev;    });  };  // Els productes es filtren basant-se en la URL (font de veritat)  const productesFiltrats \= useProductes({ cerca: cercaDeferida, categoria });  return (    \<div\>      \<input        value={cerca}        onChange={e \=\> actualitzarCerca(e.target.value)}        placeholder="Cerca productes..."      /\>      \<select value={categoria} onChange={e \=\> actualitzarCategoria(e.target.value)}\>        \<option value="tots"\>Tots\</option\>        \<option value="roba"\>Roba\</option\>        \<option value="esport"\>Esport\</option\>      \</select\>      {productesFiltrats.map(p \=\> \<ProducteCard key={p.id} producte={p} /\>)}      {/\* URL resultant: /productes?cerca=sabates\&categoria=esport\&pàgina=1 \*/}    \</div\>  );} |
| :---- |

**Cas d'Ús 2: Paginació via URL**

| function LlistaPaginada({ dadesPerPàgina \= 10 }) {  const \[searchParams, setSearchParams\] \= useSearchParams();  // Conversió de tipus: els params de la URL son sempre strings\!  const pàginaActual \= Math.max(1, Number(searchParams.get('pàgina') || '1'));  const { dades, totalPàgines } \= useDades({ pàgina: pàginaActual, dadesPerPàgina });  const anarAPàgina \= (novaPàgina: number) \=\> {    setSearchParams(prev \=\> {      prev.set('pàgina', String(novaPàgina));      return prev;    });    window.scrollTo({ top: 0, behavior: 'smooth' });  };  return (    \<div\>      {dades.map(item \=\> \<ItemCard key={item.id} item={item} /\>)}      \<div className="paginació"\>        \<button          onClick={() \=\> anarAPàgina(pàginaActual \- 1)}          disabled={pàginaActual \<= 1}        \>          ← Anterior        \</button\>        \<span\>Pàgina {pàginaActual} de {totalPàgines}\</span\>        \<button          onClick={() \=\> anarAPàgina(pàginaActual \+ 1)}          disabled={pàginaActual \>= totalPàgines}        \>          Següent →        \</button\>      \</div\>      {/\* URLs: /llista?pàgina=1 → /llista?pàgina=2 → enrere → /llista?pàgina=1 ✅ \*/}    \</div\>  );} |
| :---- |

**Cas d'ús 3: Múltiples valors per la mateixa clau**

La URL suporta múltiples valors per a la mateixa clau: `/productes?tag=nike&tag=esport&tag=running`.

| function FiltreEtiquetes() {  const \[searchParams, setSearchParams\] \= useSearchParams();  // getAll → retorna un array de tots els valors per a 'tag'  const etiquetesActives \= searchParams.getAll('tag');  // → \['nike', 'esport', 'running'\]  const toggleEtiqueta \= (etiqueta: string) \=\> {    setSearchParams(prev \=\> {      const etiquetes \= prev.getAll('tag');      if (etiquetes.includes(etiqueta)) {        // Eliminar: reconstruir sense aquesta etiqueta        prev.delete('tag');        etiquetes.filter(e \=\> e \!== etiqueta).forEach(e \=\> prev.append('tag', e));      } else {        // Afegir: append (no substitueix les existents)        prev.append('tag', etiqueta);      }      return prev;    });  };  const ETIQUETES \= \['nike', 'adidas', 'puma', 'esport', 'running', 'casual'\];  return (    \<div\>      {ETIQUETES.map(etiqueta \=\> (        \<button          key={etiqueta}          onClick={() \=\> toggleEtiqueta(etiqueta)}          className={etiquetesActives.includes(etiqueta) ? 'actiu' : ''}        \>          {etiqueta}        \</button\>      ))}      {/\* URL: /productes?tag=nike\&tag=esport \*/}    \</div\>  );} |
| :---- |

**Cas d'ús 4: Tabs sense recàrrega**

| function PàginaProducte() {  const \[searchParams, setSearchParams\] \= useSearchParams();  const tabActiu \= searchParams.get('tab') || 'descripcio';  const TABS \= \[    { id: 'descripcio', label: 'Descripció' },    { id: 'especificacions', label: 'Especificacions' },    { id: 'ressenyes', label: 'Ressenyes' },  \];  return (    \<div\>      \<div role="tablist"\>        {TABS.map(tab \=\> (          \<button            key={tab.id}            role="tab"            aria-selected={tabActiu \=== tab.id}            onClick={() \=\> setSearchParams(              { tab: tab.id },              { replace: true }    // ← replace: no afegir cada tab a l'historial            )}          \>            {tab.label}          \</button\>        ))}      \</div\>      {tabActiu \=== 'descripcio' && \<Descripcio /\>}      {tabActiu \=== 'especificacions' && \<Especificacions /\>}      {tabActiu \=== 'ressenyes' && \<Ressenyes /\>}      {/\* URL: /producte/42?tab=ressenyes → compartible\! \*/}    \</div\>  );} |
| :---- |

**`useParams` vs. `useSearchParams`: la diferència**

useParams → paràmetres de RUTA (part de la URL path)  
  Ruta definida: /productes/:id  
  URL actual:    /productes/42  
  useParams():   { id: '42' }  
  → Identifica un recurs específic (obligatori, part de la ruta)  
  → ❌ No té valor per defecte, ❌ no es pot ometre

useSearchParams → paràmetres de CERCA (query string)  
  URL actual: /productes?categoria=esport\&pàgina=2  
  searchParams.get('categoria')  → 'esport'  
  searchParams.get('pàgina')     → '2'  
  → Descriu l'estat de la UI (opcional, filtre, paginació)  
  → ✅ Pot tenir valor per defecte, ✅ es pot ometre

| // Combinació habitual: useParams \+ useSearchParamsfunction LlistaProductesPerCategoria() {  const { categoriaId } \= useParams();          // /categories/:categoriaId → obligatori  const \[searchParams\] \= useSearchParams();     // ?cerca=text\&pàgina=1 → opcional  const cerca \= searchParams.get('cerca') || '';  const pàgina \= Number(searchParams.get('pàgina') || '1');  // URL: /categories/esport?cerca=sabates\&pàgina=2} |
| :---- |

**Bones pràctiques**

| // 1\. CONVERSIÓ DE TIPUS: els params son sempre strings\!const pàgina \= Number(searchParams.get('pàgina') || '1');const actiu \= searchParams.get('actiu') \=== 'true'; // booleanconst limit \= Math.min(100, Number(searchParams.get('limit') || '10')); // limitar valors// 2\. PRESERVAR ALTRES PARAMS quan actualitzes un:// ❌ MAL: substitueix TOTS els params existentssetSearchParams({ pàgina: '2' });// → Perd 'cerca' i 'categoria' existents\!// ✅ BÉ: actualitzar únicament el param necessarisetSearchParams(prev \=\> { prev.set('pàgina', '2'); return prev; });// 3\. REPLACE per a canvis que no han d'anar a l'historial (tabs, vista)setSearchParams({ tab: 'ressenyes' }, { replace: true });// 4\. DEBOUNCE per a inputs de text (evitar massa entrades a l'historial)// → No crear entrada d'historial per cada lletra escritauseEffect(() \=\> {  const timeout \= setTimeout(() \=\> {    setSearchParams(prev \=\> {      if (textCerca) prev.set('cerca', textCerca);      else prev.delete('cerca');      return prev;    });  }, 300);  return () \=\> clearTimeout(timeout);}, \[textCerca\]);// 5\. NO guardar dades sensibles a la URL (tokens, passwords, dades personals)// La URL és visible i es guarda a l'historial del browser// 6\. CLAUS curtes i descriptives// ✅ ?q=text\&cat=esport\&p=2    (curtes)// ❌ ?searchQuery=text\&selectedCategory=esport\&currentPage=2 (massa llargues) |
| :---- |

**Resum: `useState` vs. `useSearchParams`**

| Aspecte | `useState` | `useSearchParams` |
| ----- | ----- | ----- |
| **On viu** | Memòria JS | URL (`?clau=valor`) |
| **Compartible** | ❌ No | ✅ Sí |
| **Persistent en recàrrega** | ❌ No | ✅ Sí |
| **Botó enrere** | ❌ No afecta | ✅ Navega entre estats |
| **Tipus** | Qualsevol | Strings (cal conversió) |
| **Ideal per a** | UI local (modals, hover) | Filtres, cerca, paginació, tabs |

La regla per decidir:  
  "L'usuari hauria de poder compartir o marcar aquesta vista?"  
    SÍ → useSearchParams (URL com a font de veritat)  
    NO → useState (estat local del component)

Exemples:  
  Filtres de productes → useSearchParams ✅  
  Paginació           → useSearchParams ✅  
  Tab actiu           → useSearchParams ✅ (si compartible)  
  Modal obert/tancat  → useState ✅ (no cal compartir)  
  Text en edició      → useState ✅ (estat transitori)

