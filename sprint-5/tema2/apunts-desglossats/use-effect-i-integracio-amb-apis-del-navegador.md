## **Com pot l'ús de useEffect simplificar la integració amb APIs del navegador?**

**Documentació Oficial de React useEffect**  
[https://react.dev/reference/react/useEffect](https://react.dev/reference/react/useEffect)  
Guia oficial per entendre i utilitzar el hook `useEffect` a React.

**Guia Completa de useEffect**  
[https://overreacted.io/a-complete-guide-to-useeffect/](https://overreacted.io/a-complete-guide-to-useeffect/)  
Article extens que cobreix en detall com funciona `useEffect` i els seus casos d’ús.

**Cleaning Up useEffect**  
[https://dev.to/edriso/useeffect-cleanup-function-1j8i](https://dev.to/edriso/useeffect-cleanup-function-1j8i)  
Article que explica com netejar correctament efectes i evitar fugues de memòria.

**Using the Effect Hook**  
[https://es.react.dev/reference/react/useEffect](https://es.react.dev/reference/react/useEffect)  
Versió oficial en castellà de la documentació de `useEffect`.

**Fetch Data with Hooks**  
[https://www.robinwieruch.de/react-hooks-fetch-data/](https://www.robinwieruch.de/react-hooks-fetch-data/)  
Article pràctic sobre com fer peticions HTTP amb `useEffect` i React Hooks.

**La Definició: què és `useEffect`**

`useEffect` és un hook de React que permet sincronitzar un component amb un sistema extern. Un "sistema extern" és qualsevol peça de codi que no és controlada per React: timers, event listeners del browser, connexions WebSocket, biblioteques d'animació de tercers, o qualsevol API del navegador.

| // Signatura:useEffect(setup, dependencies?)// setup:        funció amb la lògica de l'efecte → pot retornar un cleanup// dependencies: array de valors reactius que disparen l'efecte quan canvien// retorna:      undefined |
| :---- |

**El cicle de vida de `useEffect`**

React crida les funcions de setup i cleanup sempre que sigui necessari, cosa que pot passar múltiples vegades: el codi de setup s'executa quan el component s'afegeix a la pàgina (munta). Après cada commit on les dependències han canviat: primer s'executa el cleanup amb els valors antics, i després el setup amb els nous valors. El codi de cleanup s'executa una última vegada quan el component s'elimina de la pàgina (desmunta).

Component munta    → setup()  
Dependencies canvien → cleanup(valors antics) → setup(valors nous)  
Component desmunta  → cleanup()

**Cas 1: Event listeners del browser**

Un dels usos més directes: sincronitzar el component amb events del browser que ocorren fora del cicle de React.

| import { useState, useEffect } from 'react';// Seguiment de la mida de la finestrafunction useWindowSize() {  const \[mida, setMida\] \= useState({    amplada: window.innerWidth,    alçada: window.innerHeight,  });  useEffect(() \=\> {    // SETUP: afegir el listener    const handleResize \= () \=\> {      setMida({ amplada: window.innerWidth, alçada: window.innerHeight });    };    window.addEventListener('resize', handleResize);    // CLEANUP: eliminar el listener    return () \=\> window.removeEventListener('resize', handleResize);  }, \[\]); // ← \[\] → s'afegeix únicament en muntar, s'elimina en desmuntar  return mida;}// Seguiment de la posició del ratolífunction usePosicioRatolí() {  const \[posicio, setPosicio\] \= useState({ x: 0, y: 0 });  useEffect(() \=\> {    const handleMove \= (e: MouseEvent) \=\> {      setPosicio({ x: e.clientX, y: e.clientY });    };    window.addEventListener('mousemove', handleMove);    return () \=\> window.removeEventListener('mousemove', handleMove);  }, \[\]);  return posicio;}// Detecció de tecla premudafunction useKeyPress(tecla: string) {  const \[premuda, setPremuda\] \= useState(false);  useEffect(() \=\> {    const handleKeyDown \= (e: KeyboardEvent) \=\> {      if (e.key \=== tecla) setPremuda(true);    };    const handleKeyUp \= (e: KeyboardEvent) \=\> {      if (e.key \=== tecla) setPremuda(false);    };    window.addEventListener('keydown', handleKeyDown);    window.addEventListener('keyup', handleKeyUp);    return () \=\> {      window.removeEventListener('keydown', handleKeyDown);      window.removeEventListener('keyup', handleKeyUp);    };  }, \[tecla\]);  return premuda;} |
| :---- |

**Cas 2: Timers i intervals**

| // Rellotge en temps realfunction Rellotge() {  const \[hora, setHora\] \= useState(new Date());  useEffect(() \=\> {    const id \= setInterval(() \=\> setHora(new Date()), 1000);    return () \=\> clearInterval(id);    // ← cleanup: el interval s'atura quan el component desmunta  }, \[\]);  return \<p\>{hora.toLocaleTimeString()}\</p\>;}// Countdown (amb funció updater per evitar stale closure)function Countdown({ inicial }: { inicial: number }) {  const \[temps, setTemps\] \= useState(inicial);  useEffect(() \=\> {    if (temps \<= 0\) return; // ← sortir si ja ha acabat    const id \= setTimeout(() \=\> {      setTemps(prev \=\> prev \- 1);  // ← funció updater: no necessitem 'temps' a les deps    }, 1000);    return () \=\> clearTimeout(id);  }, \[temps\]); // ← 'temps' és dependència perquè el timeout és per pas  return \<p\>Temps restant: {temps}s\</p\>;} |
| :---- |

**Cas 3: Data Fetching amb APIs externes**

Pots usar un Effect per fer fetch de dades per al teu component. Nota que si uses un framework, usar el mecanisme de data fetching del framework serà molt més eficient que escriure Effects manualment.

| // Patró estàndard amb ignore flag (de la doc oficial de React):function Perfil({ userId }: { userId: string }) {  const \[bio, setBio\] \= useState(null);  const \[loading, setLoading\] \= useState(true);  const \[error, setError\] \= useState\<Error | null\>(null);  useEffect(() \=\> {    let ignore \= false;  // ← flag per evitar race conditions    setBio(null);    setLoading(true);    fetch(\`/api/usuaris/${userId}\`)      .then(r \=\> {        if (\!r.ok) throw new Error('Error carregant el perfil');        return r.json();      })      .then(dades \=\> {        if (\!ignore) {  // ← únicament actualitzar si el component segueix muntat          setBio(dades);          setLoading(false);        }      })      .catch(err \=\> {        if (\!ignore) {          setError(err);          setLoading(false);        }      });    return () \=\> { ignore \= true; }; // ← cleanup: ignora la resposta si les deps canvien  }, \[userId\]); // ← re-executar quan userId canvia  if (loading) return \<Spinner /\>;  if (error) return \<Error missatge={error.message} /\>;  return \<div\>{bio?.nom}\</div\>;} |
| :---- |

Nota la variable `ignore` que s'inicialitza a `false` i es posa a `true` durant el cleanup. Aixo assegura que el codi no pateixi "race conditions": les respostes de xarxa poden arribar en un ordre diferent al que les has enviat.

**Cas 4: Sincronització amb el títol del document**

| // Actualitzar document.title sincronitzat amb l'estat del componentfunction PàginaProducte({ producte }: { producte: Producte }) {  useEffect(() \=\> {    const títolAntic \= document.title;    document.title \= \`${producte.nom} | La Meva Botiga\`;    return () \=\> {      document.title \= títolAntic; // ← restaurar el títol en desmuntar    };  }, \[producte.nom\]);  return \<h1\>{producte.nom}\</h1\>;} |
| :---- |

**Cas 5: APIs d'observació del DOM**

| // IntersectionObserver: detectar quan un element és visiblefunction useEsVisible(ref: React.RefObject\<HTMLElement\>) {  const \[esVisible, setEsVisible\] \= useState(false);  useEffect(() \=\> {    if (\!ref.current) return;    const observer \= new IntersectionObserver(      (\[entry\]) \=\> setEsVisible(entry.isIntersecting),      { threshold: 0.1 }    );    observer.observe(ref.current);    return () \=\> observer.disconnect(); // ← cleanup  }, \[ref\]);  return esVisible;}// ResizeObserver: detectar canvis de mida d'un element específicfunction useElementSize(ref: React.RefObject\<HTMLElement\>) {  const \[mida, setMida\] \= useState({ amplada: 0, alçada: 0 });  useEffect(() \=\> {    if (\!ref.current) return;    const observer \= new ResizeObserver((\[entry\]) \=\> {      setMida({        amplada: entry.contentRect.width,        alçada: entry.contentRect.height,      });    });    observer.observe(ref.current);    return () \=\> observer.disconnect();  }, \[ref\]);  return mida;} |
| :---- |

**Cas 6: Controlar Widgets de tercers (no-React)**

De vegades vols mantenir un sistema extern sincronitzat amb alguna prop o estat del teu component.

Per exemple, si tens un widget de mapa de tercers o un component de reproductor de vídeo escrit sense React, pots usar un Effect per cridar mètodes sobre ell que facin que el seu estat coincideixi amb l'estat actual del teu component React.

| // Sincronitzar un widget de mapa extern amb props de Reactfunction Mapa({ zoomLevel }: { zoomLevel: number }) {  const containerRef \= useRef\<HTMLDivElement\>(null);  const mapRef \= useRef\<MapWidget | null\>(null);  useEffect(() \=\> {    if (mapRef.current \=== null) {      mapRef.current \= new MapWidget(containerRef.current\!);    }    mapRef.current.setZoom(zoomLevel);    // ← Nota: en aquest exemple no cal cleanup perquè    //   MapWidget gestiona únicament el node DOM que li passem  }, \[zoomLevel\]);  return \<div ref={containerRef} style={{ width: 400, height: 300 }} /\>;} |
| :---- |

**Encapsular en Custom Hooks: el patró recomanat**

Els Effects son una "escotilla d'escapament": els uses quan necessites "sortir fora de React" i quan no hi ha una millor solució integrada per al teu cas d'ús. 

Si trobes que sovint necessites escriure Effects manualment, normalment és un signe que necessites extreure alguns Custom Hooks per als comportaments comuns que els teus components necessiten.

| // ✅ Encapsular en Custom Hook: API neta i reutilitzablefunction useOnlineStatus() {  const \[online, setOnline\] \= useState(navigator.onLine);  useEffect(() \=\> {    const handleOnline \= () \=\> setOnline(true);    const handleOffline \= () \=\> setOnline(false);    window.addEventListener('online', handleOnline);    window.addEventListener('offline', handleOffline);    return () \=\> {      window.removeEventListener('online', handleOnline);      window.removeEventListener('offline', handleOffline);    };  }, \[\]);  return online;}// Ús net al component: sense lògica de window.addEventListener visiblefunction Navbar() {  const online \= useOnlineStatus();  return \<div\>{online ? '🟢 Connectat' : '🔴 Sense connexió'}\</div\>;} |
| :---- |

**Les dependencies: la regla fonamental**

Nota que no pots "escollir" les dependències del teu Effect. Cada valor reactiu usat pel codi del teu Effect ha de ser declarat com a dependència. La llista de dependències del teu Effect és determinada pel codi que l'envolta.

| // Els tres comportaments del dependency array:useEffect(() \=\> { /\* s'executa en CADA render \*/ });useEffect(() \=\> { /\* s'executa únicament en MUNTAR \*/ }, \[\]);useEffect(() \=\> { /\* s'executa quan dep1 o dep2 canvien \*/ }, \[dep1, dep2\]);// ❌ Suprimir el linter és quasi sempre un error:useEffect(() \=\> { /\* ... \*/ },  // eslint-ignore-next-line react-hooks/exhaustive-deps  \[\]);// → Quan les dependències no coincideixen amb el codi, hi ha risc alt de bugs.// → En lloc d'ignorar el linter, "demostra" que la dep no és necessària. |
| :---- |

**`useEffect` vs. `useLayoutEffect`**

Si el teu Effect fa alguna cosa visual i veus un parpelleig abans que s'executi, substitueix `useEffect` per `useLayoutEffect`. 

Note que això no hauria de ser necessari per a la gran majoria d'Effects. Únicament ho necessitaràs si és crucial executar el teu Effect ABANS que el browser pinti: per exemple, per mesurar i posicionar un tooltip abans que l'usuari el vegi.

| // useEffect:       s'executa DESPRÉS que el browser pinti → pot parpallejar// useLayoutEffect: s'executa ABANS que el browser pinti → sense parpalleig// ✅ useLayoutEffect per a mesures de DOM que afecten el renderitzat visualfunction Tooltip({ contingut, target }: TooltipProps) {  const ref \= useRef\<HTMLDivElement\>(null);  const \[posicio, setPosicio\] \= useState({ top: 0, left: 0 });  useLayoutEffect(() \=\> {    // Mesurar i posicionar ABANS que l'usuari vegi el tooltip    const rect \= ref.current\!.getBoundingClientRect();    setPosicio({ top: rect.bottom, left: rect.left });  }, \[target\]);  return \<div ref={ref} style={posicio}\>{contingut}\</div\>;} |
| :---- |

**Resum: quan usar `useEffect`**

✅ USAR useEffect per a:  
  Event listeners del browser (resize, keydown, scroll, online/offline)  
  Timers (setInterval, setTimeout)  
  Data fetching directe (sense framework ni TanStack Query)  
  Sincronitzar amb widgets de tercers no-React  
  APIs del DOM (IntersectionObserver, ResizeObserver, MutationObserver)  
  WebSockets i subscripcions externes  
  Sincronitzar document.title, localStorage, sessionStorage

❌ NO usar useEffect per a:  
  Càlculs derivats de props o state → calcular durant el render  
  Event handlers (onClick, onSubmit) → directament als handlers  
  Transformar dades per al renderitzat → useMemo si és costós  
  Actualitzar state basat en un altre state → consolidar l'estat

La regla:  
  "Si no estàs connectant amb cap sistema extern →  
   probablement no necessites un Effect"

