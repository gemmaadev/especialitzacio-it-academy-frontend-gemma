## **Tècniques per reproduir errors intermitents**

**El problema: errors que apareixen i desapareixen**

Els bugs intermitents apareixen i desapareixen sense un patró clar, fallen aleatòriament o només emergeixen sota plena càrrega. 

**Causes comunes**: race conditions, connexions de xarxa inestables, variabilitat de hardware o camins d'execució no deterministes. Aquests bugs poden conduir a missatges d'error enganyosos, automatització poc fiable o fins i tot problemes de seguretat.

La reproducibilitat d'un defecte influeix significativament en la facilitat amb la qual un developer pot identificar la seva causa arrel. Els defectes esporàdics apareixen de manera intermitent i inconsistent, fent-los particularment difícils de debugar. Sovint requereixen logging extensiu, informes d'usuaris i accions específiques per desencadenar el problema.

El **Heisenbug** és el nom informal per a un bug que desapareix quan intentes observar-lo: afegir un `console.log` o un breakpoint canvia el timing prou com per ocultar el problema. És especialment freqüent en codi asíncron.

**Estratègia 1: Capturar informació quan el bug apareix**

Per debugar errors intermitents, comença implementant logging comprensiu i capturant dades de telemetria detallades cada vegada que el problema ocorre. Documenta l'input, les variables d'entorn i el flux de treball en el moment que el bug es produeix.

El principi fonamental: si el bug és difícil de reproduir, necessites extreure tota la informació possible en el moment en què sí apareix naturalment.

| // Sistema de logging estructurat per capturar context completclass Logger {  static error(missatge, context \= {}) {    const entradaLog \= {      timestamp: new Date().toISOString(),      missatge,      // Context tècnic      url: window.location.href,      userAgent: navigator.userAgent,      // Estat de l'aplicació en el moment de l'error      ...context,      // Stack trace      stack: new Error().stack,    };    console.error('\[ERROR\]', JSON.stringify(entradaLog, null, 2));    // Opcional: enviar al servidor per a anàlisi posterior    // fetch('/api/logs', { method: 'POST', body: JSON.stringify(entradaLog) });  }}// Capturar errors globals no gestionatswindow.addEventListener('error', (event) \=\> {  Logger.error('Error global no capturat', {    missatge: event.message,    fitxer: event.filename,    linia: event.lineno,    columna: event.colno,  });});// Capturar promeses rebutjades no gestionadeswindow.addEventListener('unhandledrejection', (event) \=\> {  Logger.error('Promise rebutjada no gestionada', {    rao: event.reason?.message || String(event.reason),    stack: event.reason?.stack,  });}); |
| :---- |

**Estratègia 2: Crear un entorn controlat que repliqui les condicions**

La millor manera de reproduir un bug intermitent és identificar el conjunt mínim de condicions que consistentment mouen el sistema cap al fallo. Comença recopilant detalls sobre el timing, les dades d'entrada, les accions de l'usuari, les diferències d'entorn, la versió del desplegament i el nivell de concurrència. Un cop veus un patró, intenta aïllar una variable a la vegada per confirmar quin factor està conduint el problema.

Les variables a controlar i variar:

| // 1\. SIMULAR CONNEXIÓ LENTA (race conditions de xarxa)// Chrome DevTools → Network → "Slow 3G"// O via JavaScript:const retardArtificial \= (ms) \=\> new Promise(r \=\> setTimeout(r, ms));async function fetchAmbRetard(url) {  await retardArtificial(2000);  // simula 2s de latència  return fetch(url);}// 2\. SIMULAR MÚLTIPLES PETICIONS SIMULTÀNIES (race conditions)async function provarRaceCondition() {  // Lança 10 peticions alhora per forçar la condició de carrera  const promeses \= Array.from({ length: 10 }, () \=\>    fetch('/api/actualitzar-stock', {      method: 'POST',      body: JSON.stringify({ producteId: 1, quantitat: \-1 })    })  );  const resultats \= await Promise.all(promeses);  console.table(resultats.map(r \=\> ({ status: r.status })));}// 3\. SIMULAR ENTORN DIFERENT (problemes específics de dispositiu)// Chrome DevTools → Device toolbar → triar dispositiu// O via CSS media queries per simular pantalla petita |
| :---- |

**Estratègia 3: Logging estratègic com a "trampa" per al bug**

En lloc d'intentar reproduir el bug manualment, instrumentes el codi per capturar-lo automàticament la propera vegada que aparegui de manera natural:

| // Wrapper de fetch que registra totes les peticions amb context completconst fetchOriginal \= window.fetch;window.fetch \= async function(url, opcions \= {}) {  const idPeticio \= Math.random().toString(36).substr(2, 9);  const inici \= Date.now();  console.log(\`\[Fetch ${idPeticio}\] Inici:\`, url, opcions);  try {    const resposta \= await fetchOriginal(url, opcions);    const durada \= Date.now() \- inici;    console.log(\`\[Fetch ${idPeticio}\] Completat en ${durada}ms:\`, {      status: resposta.status,      ok: resposta.ok,    });    return resposta;  } catch (error) {    const durada \= Date.now() \- inici;    console.error(\`\[Fetch ${idPeticio}\] Error després de ${durada}ms:\`, error);    throw error;  }};// Wrapper per monitoritzar canvis d'estat que poden causar el bugfunction crearProxyMonitoritzat(objecte, nom) {  return new Proxy(objecte, {    set(target, propietat, valor) {      console.log(\`\[Estat "${nom}"\] ${propietat} canvia:\`,        target\[propietat\], '→', valor,        new Error().stack.split('\\n')\[2\]  // des d'on es fa el canvi      );      target\[propietat\] \= valor;      return true;    }  });} |
| :---- |

**Estratègia 4: `git bisect` — trobar el commit que va introduir el bug**

`git bisect` implementa un algorisme de cerca binària per determinar quin commit va introduir un bug concret. Fas una cerca del tipus "busca el llop": el pots veure en un costat d'un bosc i no en l'altre. Divideix el bosc per la meitat, mira en quina meitat és el llop, i repeteix el procés fins que trobes el commit exacte.

| \# 1\. Inici del bisectgit bisect start\# 2\. Marcar l'estat actual com a dolent (el bug existeix)git bisect bad\# 3\. Marcar un commit antic com a bo (el bug no existia)git bisect good v1.2.0\# 4\. Git fa el checkout automàticament del commit del mig\# → Proves si el bug existeix en aquell commit\# 5\. Marques el resultatgit bisect good   \# el bug NO existia aquí → prova el commit posteriorgit bisect bad    \# el bug SÍ existia aquí → prova el commit anterior\# Git repeteix automàticament fins que troba el commit exacte\# "a3f8c21 is the first bad commit"\# 6\. Acabes la sessiógit bisect reset |
| :---- |

Amb 100 commits per revisar, `git bisect` necessita únicament 7 proves per trobar el culpable (log₂ de 100 ≈ 7).

**Estratègia 5: Automatitzar la reproducció**

Usa automatització o simulació per intentar reproduir el bug en un entorn controlat. Els scripts d'automatització de reproducció redueixen el temps de correcció un 45% quan es combinen amb logging detallat i revisió de codi.

| // Script que executa el flux problemàtic moltes vegades fins que fallaasync function reproduirBugIntermitent(cops \= 100) {  let intents \= 0;  let fallos \= 0;  for (let i \= 0; i \< cops; i++) {    intents++;    try {      await fluxProblematic();      console.log(\`Intent ${i \+ 1}/${cops}: ✅ Ok\`);    } catch (error) {      fallos++;      console.error(\`Intent ${i \+ 1}/${cops}: ❌ Error:\`, error.message);      // Captura el context exacte del fallo      console.error('Stack:', error.stack);    }  }  console.log(\`\\nResultat: ${fallos}/${intents} fallos (${(fallos/intents\*100).toFixed(1)}%)\`);}reproduirBugIntermitent(50); |
| :---- |

**Estratègia 6: Les eines del navegador per a race conditions**

* **Throttling de xarxa:** Chrome DevTools → Network → "No throttling" → selecciona "Slow 3G" o "Offline". Reprodueix moltes race conditions que únicament apareixen en connexions lentes.  
* **Breakpoints en XHR/Fetch:** Sources → Event Listener Breakpoints → XHR → "Request is sent". Pausa totes les peticions de xarxa i pots inspeccionar l'estat de l'aplicació en el moment exacte de cada petició.  
* **Performance recording:** Chrome DevTools → Performance → Record → reprodueix el flux. El resultat és una línia de temps completa que mostra exactament l'ordre d'execució, inclòs el codi asíncron.

**El checklist per a bugs intermitents**

El millor enfocament és identificar el conjunt mínim de condicions que consistentment mouen el sistema cap al fallo. Recull detalls sobre timing, dades d'entrada, accions d'usuari, diferències d'entorn, versió del desplegament i nivell de concurrència.

Quan el bug apareix, documenta:

- [ ]   Quina acció exacta l'ha provocat?  
- [ ]   Quines peticions de xarxa estaven en curs?  
- [ ]   Quin era l'estat de l'aplicació (dades carregades? formulari obert?)  
- [ ]   Quin navegador i versió?  
- [ ]   Quina connexió de xarxa (WiFi, 4G, VPN)?  
- [ ]   Quants usuaris simultanis?  
- [ ]   Es va desplegar codi recentment? (→ git bisect)

Per reproduir-ho:

- [ ]   Simula la mateixa connexió de xarxa (throttling)  
- [ ]   Reprodueix les mateixes dades d'entrada  
- [ ]   Automatitza el flux i executa'l 50-100 vegades  
- [ ]   Afegeix logging estructurat als punts sospitosos  
- [ ]   Monitora amb el Proxy pattern els canvis d'estat

