**¿Com implementar paginació i cerca amb paràmetres de consulta a les APIs?**

 **Com funcionen els query parameters**

Els query parameters son parells clau-valor afegits a la URL després del signe `?`, separats per `&`. Permeten enviar dades addicionals al servidor sense modificar el cos de la petició. Els query parameters permeten filtrar, paginar i cercar dades, i son el mètode estàndard RESTful per passar criteris de consulta a les APIs.

| URL amb query parameters:https://api.exemple.com/productes?page=2\&limit=10\&cerca=portàtil\&categoria=tecnologia\&ordenar=preu\&ordre=ascDescomposició:  page=2          → pàgina actual  limit=10        → elements per pàgina  cerca=portàtil  → filtre de text  categoria=tecnologia → filtre per categoria  ordenar=preu    → camp d'ordenació  ordre=asc       → direcció d'ordenació |
| :---- |

**Enviar params amb Axios: el camp `params`**

La manera més directa d'enviar query params d'Axios és usar l'opció `params` a la configuració de la petició. Axios serialitza automàticament l'objecte params i l'afegeix a la URL.

| // Axios gestiona la serialització automàticamentconst { data } \= await axios.get('/api/productes', {  params: {    page: 2,    limit: 10,    cerca: 'portàtil',    categoria: 'tecnologia',  }  // URL resultant: /api/productes?page=2\&limit=10\&cerca=port%C3%A0til\&categoria=tecnologia  // ← Axios s'encarrega de l'encoding automàticament\!});// ❌ Evitar: interpolació manual (cal gestionar l'encoding manualment)await axios.get(\`/api/productes?page=2\&cerca=${cerca}\`);// Si cerca \= "portàtil barat", la URL queda malformada\! |
| :---- |

**Els tipus TypeScript per a la paginació**

| // Definir els tipus per a les peticions i respostes paginadesinterface ParamsCerca {  pagina: number;  limitPerPagina: number;  cercaText?: string;  categoria?: string;  ordenarPer?: 'nom' | 'preu' | 'data';  ordre?: 'asc' | 'desc';}interface RespostaPaginada\<T\> {  dades: T\[\];  paginacio: {    paginaActual: number;    totalPagines: number;    totalElements: number;    limitPerPagina: number;    tePaginaSeguent: boolean;    tePaginaAnterior: boolean;  };}// Funció tipada per a la cerca paginadaasync function cercarProductes(  params: ParamsCerca): Promise\<RespostaPaginada\<Producte\>\> {  const { data } \= await apiClient.get\<RespostaPaginada\<Producte\>\>(    '/productes',    { params }  );  return data;} |
| :---- |

**Custom Hook: paginació completa**

| // hooks/usePaginacio.tsfunction usePaginacio\<T\>(  urlBase: string,  paramesInicials: Partial\<ParamsCerca\> \= {}) {  const \[dades, setDades\] \= useState\<T\[\]\>(\[\]);  const \[paginacio, setPaginacio\] \= useState({    paginaActual: 1,    totalPagines: 0,    totalElements: 0,    tePaginaSeguent: false,    tePaginaAnterior: false,  });  const \[params, setParams\] \= useState\<ParamsCerca\>({    pagina: 1,    limitPerPagina: 10,    ...paramesInicials,  });  const \[estat, setEstat\] \= useState\<'carregant' | 'exit' | 'error'\>('carregant');  const carregar \= useCallback(async () \=\> {    setEstat('carregant');    try {      const resposta \= await apiClient.get\<RespostaPaginada\<T\>\>(urlBase, {        params: {          page: params.pagina,          limit: params.limitPerPagina,          search: params.cercaText || undefined,  // undefined s'omet del URL          category: params.categoria || undefined,          sort: params.ordenarPer,          order: params.ordre,        }      });      setDades(resposta.data.dades);      setPaginacio(resposta.data.paginacio);      setEstat('exit');    } catch {      setEstat('error');    }  }, \[urlBase, params\]);  useEffect(() \=\> { carregar(); }, \[carregar\]);  return {    dades,    paginacio,    estat,    // Accions de navegació    anarAPagina: (pagina: number) \=\>      setParams(prev \=\> ({ ...prev, pagina })),    paginaSeguent: () \=\>      setParams(prev \=\> ({ ...prev, pagina: prev.pagina \+ 1 })),    paginaAnterior: () \=\>      setParams(prev \=\> ({ ...prev, pagina: Math.max(1, prev.pagina \- 1) })),    // Accions de cerca i filtre    cercar: (text: string) \=\>      setParams(prev \=\> ({ ...prev, cercaText: text, pagina: 1 })),    filtrarPerCategoria: (categoria: string) \=\>      setParams(prev \=\> ({ ...prev, categoria, pagina: 1 })),    canviarOrdenacio: (camp: ParamsCerca\['ordenarPer'\], ordre: ParamsCerca\['ordre'\]) \=\>      setParams(prev \=\> ({ ...prev, ordenarPer: camp, ordre, pagina: 1 })),  };} |
| :---- |

**Debounce a la cerca: evitar massa peticions**

Quan l'usuari escriu en un camp de cerca, no volem enviar una petició per cada tecla. El debounce retarda l'execució fins que l'usuari para d'escriure.

| // hooks/useDebounce.tsfunction useDebounce\<T\>(valor: T, retardMs: number \= 300): T {  const \[valorDebounced, setValorDebounced\] \= useState\<T\>(valor);  useEffect(() \=\> {    const temporitzador \= setTimeout(() \=\> {      setValorDebounced(valor);    }, retardMs);    return () \=\> clearTimeout(temporitzador);  // ← cancel·la si el valor canvia  }, \[valor, retardMs\]);  return valorDebounced;}// Ús en un component de cerca:function CercaProductes() {  const \[textCerca, setTextCerca\] \= useState('');  const textDebounced \= useDebounce(textCerca, 400); // ← espera 400ms  const { dades, cercar } \= usePaginacio\<Producte\>('/productes');  // Únicament cerca quan el text debounced canvia  useEffect(() \=\> {    cercar(textDebounced);  }, \[textDebounced\]);  return (    \<input      value={textCerca}      onChange={e \=\> setTextCerca(e.target.value)}      placeholder="Cerca productes..."    /\>  );} |
| :---- |

**Sincronitzar l'estat amb la URL: `useSearchParams`**

El hook `useSearchParams` s'usa per llegir i modificar la cadena de consulta a la URL per a la ubicació actual. La interfície `URLSearchParams` defineix mètodes utilitaris per treballar amb la cadena de consulta d'una URL.

Guardar l'estat de paginació i cerca a la URL permet compartir l'enllaç i preservar l'estat en recarregar:

| // Paginació sincronitzada amb la URL// URL: /productes?page=3\&cerca=portàtil\&categoria=tecnologiafunction PaginaProductes() {  const \[searchParams, setSearchParams\] \= useSearchParams();  // Llegir l'estat des de la URL  const pagina \= Number(searchParams.get('page')) || 1;  const cerca \= searchParams.get('cerca') || '';  const categoria \= searchParams.get('categoria') || '';  // Actualitzar la URL quan canvien els filtres  const actualitzarFiltres \= (nous: Record\<string, string\>) \=\> {    setSearchParams(prev \=\> {      const nouParams \= new URLSearchParams(prev);      Object.entries(nous).forEach((\[clau, valor\]) \=\> {        if (valor) {          nouParams.set(clau, valor);        } else {          nouParams.delete(clau);  // elimina el param si és buit        }      });      return nouParams;    });  };  return (    \<div\>      \<input        value={cerca}        onChange={e \=\> actualitzarFiltres({ cerca: e.target.value, page: '1' })}        placeholder="Cerca..."      /\>      \<select        value={categoria}        onChange={e \=\> actualitzarFiltres({ categoria: e.target.value, page: '1' })}      \>        \<option value=""\>Totes les categories\</option\>        \<option value="tecnologia"\>Tecnologia\</option\>        \<option value="roba"\>Roba\</option\>      \</select\>    \</div\>  );} |
| :---- |

**Component de paginació complet**

| // components/Paginacio.tsxinterface PropsPaginacio {  paginaActual: number;  totalPagines: number;  onCanviar: (pagina: number) \=\> void;}function Paginacio({ paginaActual, totalPagines, onCanviar }: PropsPaginacio) {  // Generar el rang de pàgines visibles (màx 5\)  const paginaInici \= Math.max(1, paginaActual \- 2);  const paginaFi \= Math.min(totalPagines, paginaInici \+ 4);  const pagines \= Array.from(    { length: paginaFi \- paginaInici \+ 1 },    (\_, i) \=\> paginaInici \+ i  );  return (    \<nav\>      \<button        onClick={() \=\> onCanviar(paginaActual \- 1)}        disabled={paginaActual \<= 1}      \>        ← Anterior      \</button\>      {paginaInici \> 1 && (        \<\>          \<button onClick={() \=\> onCanviar(1)}\>1\</button\>          {paginaInici \> 2 && \<span\>...\</span\>}        \</\>      )}      {pagines.map(num \=\> (        \<button          key={num}          onClick={() \=\> onCanviar(num)}          className={num \=== paginaActual ? 'actiu' : ''}        \>          {num}        \</button\>      ))}      {paginaFi \< totalPagines && (        \<\>          {paginaFi \< totalPagines \- 1 && \<span\>...\</span\>}          \<button onClick={() \=\> onCanviar(totalPagines)}\>{totalPagines}\</button\>        \</\>      )}      \<button        onClick={() \=\> onCanviar(paginaActual \+ 1)}        disabled={paginaActual \>= totalPagines}      \>        Següent →      \</button\>    \</nav\>  );} |
| :---- |

**Infinite Scroll: alternativa a la paginació clàssica**

| // Infinite scroll amb Intersection Observerfunction LlistaInfinita() {  const \[dades, setDades\] \= useState\<Producte\[\]\>(\[\]);  const \[pagina, setPagina\] \= useState(1);  const \[hiHaMes, setHiHaMes\] \= useState(true);  const observadorRef \= useRef\<IntersectionObserver | null\>(null);  // Ref a l'últim element \-- quan entra al viewport, carrega la pàgina següent  const ultimElementRef \= useCallback((node: HTMLDivElement | null) \=\> {    if (observadorRef.current) observadorRef.current.disconnect();    observadorRef.current \= new IntersectionObserver(entrades \=\> {      if (entrades\[0\].isIntersecting && hiHaMes) {        setPagina(prev \=\> prev \+ 1);  // ← carrega la pàgina següent      }    });    if (node) observadorRef.current.observe(node);  }, \[hiHaMes\]);  useEffect(() \=\> {    apiClient.get\<RespostaPaginada\<Producte\>\>('/productes', {      params: { page: pagina, limit: 20 }    }).then(({ data }) \=\> {      setDades(prev \=\> \[...prev, ...data.dades\]);  // ← afegeix, no substitueix      setHiHaMes(data.paginacio.tePaginaSeguent);    });  }, \[pagina\]);  return (    \<div\>      {dades.map((producte, index) \=\> {        const esUltim \= index \=== dades.length \- 1;        return (          \<div key={producte.id} ref={esUltim ? ultimElementRef : null}\>            \<CardProducte producte={producte} /\>          \</div\>        );      })}      {hiHaMes && \<SkeletonCard /\>}    \</div\>  );} |
| :---- |

**Resum: el flux complet de cerca paginada**

| Usuari escriu "portàtil" al camp de cerca        ↓Debounce (400ms): espera que pari d'escriure        ↓setParams({ cercaText: "portàtil", pagina: 1 })        ↓URL s'actualitza: /productes?cerca=portàtil\&page=1        ↓useEffect detecta el canvi → nova petició        ↓GET /api/productes?search=portàtil\&page=1\&limit=10        ↓Servidor retorna:  { dades: \[...10 productes\], paginacio: { total: 47, pagines: 5 } }        ↓Renderitza la llista \+ component Paginacio        ↓Usuari clica "Pàgina 2"        ↓setParams({ pagina: 2 })        ↓GET /api/productes?search=portàtil\&page=2\&limit=10 |
| :---- |

