**Com gestionar escenaris complexos com peticions concurrents o seqüencials utilitzant Promise.all i async/await.**

**Async JavaScript**   
Guia pràctica sobre l’evolució del codi asíncron en JS: callbacks, promeses i async/await.   
[https://javascript.info/async](https://javascript.info/async)

**El problema: JavaScript és asíncron i d'un sol fil**

JavaScript executa codi en un sol fil (single-threaded). Les operacions d'E/S com les peticions HTTP no bloquegen el fil principal: el navegador les gestiona en segon pla i avisa quan han acabat. Entendre com coordinar múltiples operacions asíncrones és fonamental per a aplicacions web reals.

**Peticions Seqüencials: await una rere l'altra**

Les peticions seqüencials esperen que una acabi abans de començar la següent. Son necessàries quan el resultat d'una petició és l'input de la següent.

| // SEQÜENCIAL: la segona petició depèn de la primeraasync function carregarPerfil(usuariId: number) {  // 1\. Primer obté l'usuari (500ms)  const usuari \= await axios.get\<Usuari\>(\`/api/usuaris/${usuariId}\`);  // 2\. Amb l'ID del departament de l'usuari, obté el departament (400ms)  const departament \= await axios.get\<Departament\>(    \`/api/departaments/${usuari.data.departamentId}\`  );  // Temps total: 500 \+ 400 \= 900ms (seqüencial\!)  return { usuari: usuari.data, departament: departament.data };} |
| :---- |

⚠️ L'error clàssic: usar `await` en un `forEach` no funciona com s'espera. `forEach` no entén Promises i no espera les operacions asíncrones:

| // ❌ MAL: forEach no espera les Promises → totes s'executen "al mateix temps"// però sense control del resultatconst ids \= \[1, 2, 3\];ids.forEach(async (id) \=\> {  const usuari \= await axios.get(\`/api/usuaris/${id}\`);  console.log(usuari.data); // ordre imprevisible\!});// ✅ CORRECTE per a seqüencial: bucle for...offor (const id of ids) {  const usuari \= await axios.get(\`/api/usuaris/${id}\`);  console.log(usuari.data); // ordre garantit: 1, 2, 3} |
| :---- |

**`Promise.all`: peticions en paral·lel**

`Promise.all` pren un iterable (normalment un array de promises) i retorna una nova promesa. La nova promesa es resol quan totes les promeses llistades s'han resolt, i l'array dels seus resultats es converteix en el seu resultat.

| // PARAL·LEL: les tres peticions s'envien simultàniamentasync function carregarDashboard(usuariId: number) {  const \[perfil, comandes, notificacions\] \= await Promise.all(\[    axios.get\<Perfil\>(\`/api/perfil/${usuariId}\`),       // 300ms    axios.get\<Comanda\[\]\>(\`/api/comandes/${usuariId}\`),  // 500ms    axios.get\<Notif\[\]\>(\`/api/notifs/${usuariId}\`),      // 200ms  \]);  // Temps total: max(300, 500, 200\) \= 500ms (en paral·lel\!)  // En lloc de: 300 \+ 500 \+ 200 \= 1000ms (seqüencial)  return {    perfil: perfil.data,    comandes: comandes.data,    notificacions: notificacions.data  };} |
| :---- |

Nota que l'ordre de l'array de resultats és el mateix que el de les promeses d'origen. Fins i tot si la primera promesa triga més temps a resoldre's, segueix sent la primera a l'array de resultats.

### **El comportament "tot o res" de `Promise.all`**

Si qualsevol de les promeses és rebutjada, la promesa retornada per `Promise.all` rebutja immediatament amb aquell error. En cas d'error, les altres promeses s'ignoren. Si una promesa rebutja, `Promise.all` rebutja immediatament, oblidant completament les altres de la llista.

| // Si la petició de comandes falla → tot el Promise.all fallatry {  const \[perfil, comandes\] \= await Promise.all(\[    axios.get('/api/perfil/1'),    axios.get('/api/comandes/1'),  // ← si falla: tot falla  \]);} catch (error) {  // Gestionem l'error de qualsevol de les dues peticions  console.error('Una de les peticions ha fallat:', error);} |
| :---- |

**`Promise.allSettled`: paral·lel sense "tot o res"**

`Promise.allSettled` simplement espera que totes les promeses s'establissin, independentment del resultat. L'array resultant té: `{status:"fulfilled", value:result}` per a respostes exitoses, i `{status:"rejected", reason:error}` per a errors.

| // Carrega múltiples recursos independents, continua fins i tot si alguns fallenasync function carregarWidget(id: number) {  const resultats \= await Promise.allSettled(\[    axios.get\<Dades\>(\`/api/dades-principals/${id}\`),    axios.get\<Config\>(\`/api/configuracio/${id}\`),      // pot fallar    axios.get\<Stats\>(\`/api/estadistiques/${id}\`),      // pot fallar  \]);  const \[dades, config, stats\] \= resultats;  return {    dades: dades.status \=== 'fulfilled' ? dades.value.data : null,    config: config.status \=== 'fulfilled' ? config.value.data : configPerDefecte,    stats: stats.status \=== 'fulfilled' ? stats.value.data : \[\],    // El widget renderitza amb el que ha pogut obtenir  };} |
| :---- |

**`Promise.race` i `Promise.any`**

`Promise.race` és similar a `Promise.all`, però espera únicament la primera promesa establida i obté el seu resultat (o error). `Promise.any` és similar a `Promise.race`, però espera únicament la primera promesa complerta i obté el seu resultat.

| // Promise.race: implementar timeout amb raceasync function fetchAmbTimeout\<T\>(url: string, limitMs: number): Promise\<T\> {  const peticio \= axios.get\<T\>(url);  const timeout \= new Promise\<never\>((\_, reject) \=\>    setTimeout(() \=\> reject(new Error(\`Timeout de ${limitMs}ms\`)), limitMs)  );  // Guanya el que acabi primer: la petició o el timeout  const { data } \= await Promise.race(\[peticio, timeout\]);  return data;}// Promise.any: intentar múltiples endpoints, usar el primer que funcioniasync function obtenirDadesAmbFallback\<T\>(urls: string\[\]): Promise\<T\> {  const { data } \= await Promise.any(    urls.map(url \=\> axios.get\<T\>(url))  );  return data;  // Si TOTS fallen → AggregateError amb tots els errors} |
| :---- |

**Patrons avançats: combinant seqüencial i paral·lel**

El cas real més freqüent: algunes peticions son paral·leles i d'altres son seqüencials.

| // Exemple: carregar una pàgina de producteasync function carregarPaginaProducte(producteId: number, usuariId: number) {  // FASE 1: dues peticions independents en paral·lel  const \[producte, usuari\] \= await Promise.all(\[    axios.get\<Producte\>(\`/api/productes/${producteId}\`),    axios.get\<Usuari\>(\`/api/usuaris/${usuariId}\`),  \]);  // FASE 2: amb les dades de la fase 1, dues peticions més en paral·lel  const \[ressenyes, recomanats\] \= await Promise.all(\[    axios.get\<Ressanya\[\]\>(      \`/api/ressenyes?producte=${producteId}\&moneda=${usuari.data.moneda}\`    ),    axios.get\<Producte\[\]\>(      \`/api/recomanats?categoria=${producte.data.categoriaId}\&usuari=${usuariId}\`    ),  \]);  return {    producte: producte.data,    usuari: usuari.data,    ressenyes: ressenyes.data,    recomanats: recomanats.data  };  // Temps total: max(T1) \+ max(T2) en lloc de T1+T2+T3+T4} |
| :---- |

**Processar arrays de dades: `map` \+ `Promise.all`**

| // Processar un array d'IDs en paral·lelconst ids \= \[1, 2, 3, 4, 5\];// ✅ Tots en paral·lel: molt ràpidconst usuaris \= await Promise.all(  ids.map(id \=\> axios.get\<Usuari\>(\`/api/usuaris/${id}\`).then(r \=\> r.data)));// ✅ Amb control de concurrència: per no saturar l'API (màx 3 alhora)async function fetchAmbLimitConcurrencia\<T\>(  ids: number\[\],  fetchFn: (id: number) \=\> Promise\<T\>,  mida: number \= 3): Promise\<T\[\]\> {  const resultats: T\[\] \= \[\];  for (let i \= 0; i \< ids.length; i \+= mida) {    const lot \= ids.slice(i, i \+ mida);    const resultatsLot \= await Promise.all(lot.map(fetchFn));    resultats.push(...resultatsLot);  }  return resultats;}// Processa 100 IDs de 3 en 3const dades \= await fetchAmbLimitConcurrencia(ids, id \=\>  axios.get\<Usuari\>(\`/api/usuaris/${id}\`).then(r \=\> r.data)); |
| :---- |

**Quina eina per a cada escenari**

| Escenari | Eina | Raó |
| ----- | ----- | ----- |
| Petició B depèn del resultat de A | `await` seqüencial | B no pot executar-se sense A |
| Peticions independents, totes necessàries | `Promise.all` | Tot o res, màxima velocitat |
| Peticions independents, algunes opcionals | `Promise.allSettled` | Continua fins i tot si alguna falla |
| La més ràpida (inclou errors) | `Promise.race` | Timeout, CDN fallback |
| La primera en tenir èxit | `Promise.any` | Múltiples fonts, usar la primera disponible |
| Array d'IDs, processar en paral·lel | `map` \+ `Promise.all` | N peticions simultànies |
| Array gran, limitar concurrència | Lots \+ `Promise.all` | Evitar saturar l'API |

