## **Recursos i testing de custom hooks**

###### **Building Your Own Hooks**

Documentació de React clàssica per aprendre a crear els teus propis hooks.  
[reactjs.org/docs/hooks-custom.html](http://reactjs.org/docs/hooks-custom.html) 

###### **Awesome React Hooks**

Llista col·laborativa amb recursos i exemples de hooks de la comunitat.  
[https://github.com/rehooks/awesome-react-hooks](https://github.com/rehooks/awesome-react-hooks) 

###### **useHooks Collection**

Col·lecció de custom hooks amb exemples pràctics i codi preparat per usar.  
[https://usehooks.com/](https://usehooks.com/) 

###### **Testing Custom Hooks**

Article de Kent C. Dodds amb bones pràctiques per provar custom hooks en React.  
[https://kentcdodds.com/blog/how-to-test-custom-react-hooks](https://kentcdodds.com/blog/how-to-test-custom-react-hooks)

**1\. Building your own hooks: les regles fonamentals**

La documentació clàssica de React estableix les dues regles dels Hooks que s'apliquen als Custom Hooks:

| REGLA 1: Únicament cridar Hooks al nivell superior  → Mai dins de loops, condicions, o funcions aniuades  → Garanteix que l'ordre dels Hooks és el mateix en cada renderREGLA 2: Únicament cridar Hooks des de funcions React  → Des de components funcionals ✅  → Des de Custom Hooks ✅  → Des de funcions JavaScript normals ❌CONVENCIÓ ADDICIONAL: el nom comença per 'use'  → Permet al linter (eslint-plugin-react-hooks) verificar les regles  → Sense el prefix 'use', el linter no pot protegir-te |
| :---- |

| // ✅ CORRECTE: hooks al nivell superiorfunction useExemple(condicio: boolean) {  const \[a, setA\] \= useState(0);   // ← sempre s'executa  const \[b, setB\] \= useState('');  // ← sempre s'executa  // ...}// ❌ INCORRECTE: hook dins d'una condiciófunction useExempleInvalid(condicio: boolean) {  if (condicio) {    const \[a, setA\] \= useState(0); // ← Error\! Ordre canviable  }} |
| :---- |

**2\. Awesome React Hooks: el catàleg de la comunitat**

El repositori `rehooks/awesome-react-hooks` és una llista col·laborativa organitzada per categories. Els hooks més rellevants per categoria:

### **Hooks d'estat i UI**

| // useToggle: boolean amb controls explícitsfunction useToggle(inicial \= false) {  const \[valor, setValor\] \= useState(inicial);  return {    valor,    toggle: () \=\> setValor(v \=\> \!v),    activar: () \=\> setValor(true),    desactivar: () \=\> setValor(false),  };}// useCounter: comptador amb límitsfunction useCounter(inicial \= 0, { min \= \-Infinity, max \= Infinity } \= {}) {  const \[count, setCount\] \= useState(inicial);  return {    count,    increment: () \=\> setCount(c \=\> Math.min(c \+ 1, max)),    decrement: () \=\> setCount(c \=\> Math.max(c \- 1, min)),    reset: () \=\> setCount(inicial),  };}// useList: array amb operacions immutablesfunction useList\<T\>(inicial: T\[\] \= \[\]) {  const \[list, setList\] \= useState(inicial);  return {    list,    push: (item: T) \=\> setList(prev \=\> \[...prev, item\]),    removeAt: (i: number) \=\> setList(prev \=\> prev.filter((\_, idx) \=\> idx \!== i)),    updateAt: (i: number, item: T) \=\>      setList(prev \=\> prev.map((el, idx) \=\> idx \=== i ? item : el)),    clear: () \=\> setList(\[\]),  };} |
| :---- |

### **Hooks del navegador**

| // useCopyToClipboard: copiar text al portapapersfunction useCopyToClipboard() {  const \[copiat, setCopiat\] \= useState(false);  const copy \= useCallback(async (text: string) \=\> {    try {      await navigator.clipboard.writeText(text);      setCopiat(true);      setTimeout(() \=\> setCopiat(false), 2000); // reset després de 2s    } catch {      setCopiat(false);    }  }, \[\]);  return { copy, copiat };}// Ús:function BotoCopiar({ text }: { text: string }) {  const { copy, copiat } \= useCopyToClipboard();  return (    \<button onClick={() \=\> copy(text)}\>      {copiat ? '✅ Copiat\!' : '📋 Copiar'}    \</button\>  );}// useIdle: detectar inactivitat de l'usuarifunction useIdle(tempsMs: number \= 30000): boolean {  const \[isIdle, setIsIdle\] \= useState(false);  useEffect(() \=\> {    let timer: ReturnType\<typeof setTimeout\>;    const reset \= () \=\> {      setIsIdle(false);      clearTimeout(timer);      timer \= setTimeout(() \=\> setIsIdle(true), tempsMs);    };    const events \= \['mousemove', 'keydown', 'click', 'scroll'\];    events.forEach(e \=\> window.addEventListener(e, reset));    reset(); // inicialitzar    return () \=\> {      clearTimeout(timer);      events.forEach(e \=\> window.removeEventListener(e, reset));    };  }, \[tempsMs\]);  return isIdle;} |
| :---- |

**3\. Testing de custom hooks: l'enfocament de Kent C. Dodds**

### **La Filosofia: testar el comportament, no la implementació**

El principi central: els tests de Custom Hooks han de verificar el comportament observable, no els detalls interns (quins useState hi ha, com s'anomena la variable).

INCORRECTE: testar implementació  
  → "El hook crea un useState amb valor 0"  
  → "El hook crida fetch amb aquesta URL"

CORRECTE: testar comportament  
  → "Inicialment el comptador és 0"  
  → "Després d'increment(), el comptador és 1"  
  → "Quan la URL canvia, les dades s'actualitzen"

### **`renderHook`: l'eina principal**

| npm install \--save-dev @testing-library/react @testing-library/user-event |
| :---- |

| // src/hooks/useCounter.test.tsimport { renderHook, act } from '@testing-library/react';import { useCounter } from './useCounter';describe('useCounter', () \=\> {  test('valor inicial per defecte és 0', () \=\> {    const { result } \= renderHook(() \=\> useCounter());    expect(result.current.count).toBe(0);  });  test('valor inicial personalitzat', () \=\> {    const { result } \= renderHook(() \=\> useCounter(10));    expect(result.current.count).toBe(10);  });  test('increment augmenta el valor', () \=\> {    const { result } \= renderHook(() \=\> useCounter(0));    act(() \=\> {      result.current.increment();      // ↑ act(): embolcalla actualitzacions d'estat per a processar-les    });    expect(result.current.count).toBe(1);  });  test('no supera el màxim', () \=\> {    const { result } \= renderHook(() \=\> useCounter(9, { max: 10 }));    act(() \=\> { result.current.increment(); });    act(() \=\> { result.current.increment(); }); // intent de superar el màxim    expect(result.current.count).toBe(10); // ← aturada al màxim  });  test('reset torna al valor inicial', () \=\> {    const { result } \= renderHook(() \=\> useCounter(5));    act(() \=\> { result.current.increment(); });    act(() \=\> { result.current.reset(); });    expect(result.current.count).toBe(5); // ← torna a l'inicial, no a 0  });}); |
| :---- |

### 

### 

### **Testar hooks asíncrons**

| // src/hooks/useFetch.test.tsimport { renderHook, waitFor } from '@testing-library/react';import { useFetch } from './useFetch';// Mock global de fetchglobal.fetch \= vi.fn();describe('useFetch', () \=\> {  beforeEach(() \=\> {    vi.clearAllMocks();  });  test('estat inicial: loading true, dades null', () \=\> {    vi.mocked(fetch).mockImplementation(() \=\> new Promise(() \=\> {})); // pending    const { result } \= renderHook(() \=\> useFetch('/api/test'));    expect(result.current.loading).toBe(true);    expect(result.current.dades).toBeNull();    expect(result.current.error).toBeNull();  });  test('carrega les dades correctament', async () \=\> {    const dadeMock \= \[{ id: 1, nom: 'Producte' }\];    vi.mocked(fetch).mockResolvedValue({      ok: true,      json: async () \=\> dadeMock,    } as Response);    const { result } \= renderHook(() \=\> useFetch('/api/productes'));    // Esperar que loading acabi    await waitFor(() \=\> {      expect(result.current.loading).toBe(false);    });    expect(result.current.dades).toEqual(dadeMock);    expect(result.current.error).toBeNull();  });  test('gestiona errors HTTP', async () \=\> {    vi.mocked(fetch).mockResolvedValue({      ok: false,      status: 404,    } as Response);    const { result } \= renderHook(() \=\> useFetch('/api/inexistent'));    await waitFor(() \=\> expect(result.current.loading).toBe(false));    expect(result.current.error).toBeInstanceOf(Error);    expect(result.current.error?.message).toBe('HTTP 404');    expect(result.current.dades).toBeNull();  });  test('re-fetch quan canvia la URL', async () \=\> {    const dades1 \= \[{ id: 1 }\];    const dades2 \= \[{ id: 2 }\];    vi.mocked(fetch)      .mockResolvedValueOnce({ ok: true, json: async () \=\> dades1 } as Response)      .mockResolvedValueOnce({ ok: true, json: async () \=\> dades2 } as Response);    const { result, rerender } \= renderHook(      ({ url }: { url: string }) \=\> useFetch(url),      { initialProps: { url: '/api/v1' } }    );    await waitFor(() \=\> expect(result.current.loading).toBe(false));    expect(result.current.dades).toEqual(dades1);    // Canviar la URL → el hook hauria de re-fer el fetch    rerender({ url: '/api/v2' });    await waitFor(() \=\> expect(result.current.loading).toBe(false));    expect(result.current.dades).toEqual(dades2);    expect(fetch).toHaveBeenCalledTimes(2);  });}); |
| :---- |

### **Testar hooks amb context**

| // Hooks que depenen de Context necessiten un wrapper Providerimport { renderHook } from '@testing-library/react';import { AuthProvider, useAuth } from './auth.context';test('useAuth retorna l\\'usuari autenticat', async () \=\> {  // Wrapper: proporciona el Context necessari  const wrapper \= ({ children }: { children: React.ReactNode }) \=\> (    \<AuthProvider initialUsuari={{ id: '1', nom: 'Anna' }}\>      {children}    \</AuthProvider\>  );  const { result } \= renderHook(() \=\> useAuth(), { wrapper });  expect(result.current.usuari?.nom).toBe('Anna');  expect(result.current.isAdmin).toBe(false);});test('useAuth llança error fora del Provider', () \=\> {  // Sense wrapper → hauria de llançar l'error de Fail Fast  expect(() \=\> {    renderHook(() \=\> useAuth());  }).toThrow('useAuth ha d\\'usar-se dins d\\'un \<AuthProvider\>');}); |
| :---- |

### **Testar hooks amb events del navegador**

| // src/hooks/useOnlineStatus.test.tsimport { renderHook, act } from '@testing-library/react';import { useOnlineStatus } from './useOnlineStatus';test('detecta quan l\\'usuari es connecta i desconnecta', () \=\> {  const { result } \= renderHook(() \=\> useOnlineStatus());  // Inicialment online  expect(result.current).toBe(true);  // Simular event 'offline'  act(() \=\> {    window.dispatchEvent(new Event('offline'));  });  expect(result.current).toBe(false);  // Simular event 'online'  act(() \=\> {    window.dispatchEvent(new Event('online'));  });  expect(result.current).toBe(true);}); |
| :---- |

**4\. El pattern: Hook \+ test \+ documentació**

L'estructura de fitxers recomanada per a cada Custom Hook:

| src/hooks/  useCounter/    index.ts           ← el hook (exportació per defecte)    useCounter.ts      ← implementació    useCounter.test.ts ← tests    useCounter.md      ← documentació (opcional, per a biblioteques) |
| :---- |

| // useCounter.ts \-- amb JSDoc complet/\*\* \* Gestiona un comptador amb increment, decrement i reset. \* \* @param inicial \- Valor inicial del comptador (per defecte 0\) \* @param opcions.min \- Valor mínim permès \* @param opcions.max \- Valor màxim permès \* \* @example \* const { count, increment, decrement } \= useCounter(0, { max: 10 }); \*/export function useCounter(  inicial \= 0,  { min \= \-Infinity, max \= Infinity }: { min?: number; max?: number } \= {}) {  const \[count, setCount\] \= useState(inicial);  const increment \= useCallback(() \=\> setCount(c \=\> Math.min(c \+ 1, max)), \[max\]);  const decrement \= useCallback(() \=\> setCount(c \=\> Math.max(c \- 1, min)), \[min\]);  const reset \= useCallback(() \=\> setCount(inicial), \[inicial\]);  return { count, increment, decrement, reset };} |
| :---- |

**Resum: flux complet d'un Custom Hook ben fet**

1\. IDENTIFICAR: lògica repetida o complexa al component  
   → "Tinc 3 useState i un useEffect → extraure un hook"

2\. EXTREURE: moure la lògica al hook  
   → Nom descriptiu: use \+ domini  
   → Retorn: objecte si \> 2 valors, array si \= 2

3\. TESTAR: renderHook \+ act \+ waitFor  
   → Comportament inicial  
   → Cada acció possible  
   → Casos d'error  
   → Canvis de props (rerender)

4\. DOCUMENTAR: JSDoc \+ exemple d'ús  
   → @param, @returns, @example  
   → TypeScript complet

5\. REUTILITZAR: el component usa el hook  
   → Component net → únicament JSX  
   → Hook testejable → independentment

