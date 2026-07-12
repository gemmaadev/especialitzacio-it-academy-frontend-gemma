## **Diferències entre `onClick={handleClick}` i `onClick={() => handleClick(id)}`**

**La diferència fonamental: referència vs. wrapper**

En JavaScript, aquestes dues formes no son equivalents. La distinció és subtil però crítica per entendre com funciona React.

| // Forma 1: passa la REFERÈNCIA a la funció\<button onClick={handleClick}\>// Forma 2: crea una nova funció anònima que crida handleClick\<button onClick={() \=\> handleClick(id)}\> |
| :---- |

La clau: React espera una **funció** com a valor del prop `onClick`. En la primera forma, passes la funció directament. En la segona, crees una funció anònima que, quan s'executa, crida `handleClick(id)`.

**Quan s'executa cada una**

| // ✅ Forma 1: React recorda la referència i la crida quan l'usuari clica\<button onClick={handleClick}\>// ✅ Forma 2: React crea la funció anònima i la guarda;//            quan l'usuari clica, executa la funció anònima//            que al seu torn crida handleClick(id)\<button onClick={() \=\> handleClick(id)}\>// ❌ ERROR COMÚ: crida immediatament durant el renderitzat\!\<button onClick={handleClick()}\>   // ← els () executen la funció ara\!\<button onClick={handleClick(id)}\> // ← igual, s'executa en render\! |
| :---- |

React comença a renderitzar el component. En trobar `handleClick(q.id)` a l'atribut onClick, l'executa immediatament. 

No espera que ocorri un event de clic. En canvi, `() => handleClick(q.id)` retorna una nova funció que executarà `handleClick(q.id)` quan ocorri el clic.

## **La raó principal per usar la funció anònima: passar arguments**

Si la funció requereix arguments o vols executar múltiples accions dins del clic, has d'embolcallar-la dins d'una funció anònima (arrow function).

| // ✅ Quan no cal arguments → passa la referència directamentfunction LlistaProductes() {  function handleEliminarTots() {    // elimina tots els productes  }  return \<button onClick={handleEliminarTots}\>Eliminar tots\</button\>;}// ✅ Quan cal passar un argument → usa la funció anònimafunction LlistaProductes({ productes }: { productes: Producte\[\] }) {  function handleEliminar(id: string) {    // elimina el producte amb aquest id específic  }  return (    \<ul\>      {productes.map(p \=\> (        \<li key={p.id}\>          {p.nom}          {/\* ← Necessitem passar p.id → funció anònima obligatòria \*/}          \<button onClick={() \=\> handleEliminar(p.id)}\>            Eliminar          \</button\>        \</li\>      ))}    \</ul\>  );} |
| :---- |

**La implicació de rendiment: nova funció en cada render**

Usar una arrow function en el renderitzat crea un nou objecte de funció cada vegada que el component es renderitza, cosa que pot trencar optimitzacions basades en la comparació estricta d'identitat.

| // Cada vegada que el component es renderitza:// Forma 1: sempre la MATEIXA referència de funció\<button onClick={handleClick}\>// handleClick \=== handleClick → React.memo NO re-renderitza innecessàriament// Forma 2: NOVA funció en cada render\<button onClick={() \=\> handleClick(id)}\>// nova funció \!== nova funció → React.memo re-renderitza sempre\! |
| :---- |

Però no cal preocupar-se perquè l'impacte en el rendiment és molt mínim. És molt improbable que els teus usuaris notin cap retard simplement a causa de les arrow functions en el render.

**Quan importa el rendiment: `useCallback`**

El problema de rendiment **sí importa** quan passes el handler a components fills optimitzats amb `React.memo`:

| // Problema: el fill re-renderitza en cada render del parefunction Pare() {  const \[comptador, setComptador\] \= useState(0);  return (    \<\>      \<button onClick={() \=\> setComptador(c \=\> c \+ 1)}\>+1\</button\>      {/\* Cada vegada que comptador canvia, el Pare re-renderitza          → es crea una nova funció () \=\> handleClick(producteId)          → FillOptimitzat re-renderitza innecessàriament \*/}      \<FillOptimitzat onClick={() \=\> handleClick(producteId)} /\>    \</\>  );}// ✅ Solució: useCallback estabilitza la referència de la funciófunction Pare() {  const \[comptador, setComptador\] \= useState(0);  // La funció es crea UNA SOLA VEGADA (o quan canvia producteId)  const handleClickMemoitzat \= useCallback(() \=\> {    handleClick(producteId);  }, \[producteId\]);  // ← dependències  return (    \<\>      \<button onClick={() \=\> setComptador(c \=\> c \+ 1)}\>+1\</button\>      {/\* Ara FillOptimitzat NO re-renderitza quan canvia comptador \*/}      \<FillOptimitzat onClick={handleClickMemoitzat} /\>    \</\>  );}const FillOptimitzat \= React.memo(({ onClick }) \=\> {  console.log('Render del fill');  return \<button onClick={onClick}\>Acció\</button\>;}); |
| :---- |

**Les quatre formes equivalents (i quan usar cada una)**

| // FORMA 1: Referència directa → quan no cal arguments\<button onClick={handleClick}\>// FORMA 2: Arrow function inline → quan cal arguments o lògica extra\<button onClick={() \=\> handleClick(id)}\>\<button onClick={() \=\> { handleClick(id); trackEvent('click'); }}\>// FORMA 3: Funció definida dins del component → llegibilitatfunction Component({ id }) {  function handleClickAmbId() {    handleClick(id);  // ← id disponible per closure  }  return \<button onClick={handleClickAmbId}\>// FORMA 4: useCallback → quan el fill és React.memo o el rendiment importaconst handleClickAmbId \= useCallback(() \=\> {  handleClick(id);}, \[id\]);return \<button onClick={handleClickAmbId}\> |
| :---- |

**El patró alternatiu: `data-*` attributes**

Quan mapees llistes i vols evitar crear funcions anònimes per a cada element, pots usar atributs `data-*`:

| // En lloc de crear N funcions anònimes:{items.map(item \=\> (  \<button onClick={() \=\> handleClick(item.id)}\>  {/\* ← nova funció per item \*/}    {item.nom}  \</button\>))}// Alternativa amb data-attributes: una sola referència de funciófunction handleClick(e: React.MouseEvent\<HTMLButtonElement\>) {  const id \= e.currentTarget.dataset.id;  // ← llegim l'id de l'atribut  // processar id...}{items.map(item \=\> (  \<button    data-id={item.id}        // ← guardem l'id com a atribut    onClick={handleClick}    // ← UNA SOLA referència compartida  \>    {item.nom}  \</button\>))} |
| :---- |

**Resum: quan usar cada forma**

| Situació | Forma recomanada |
| ----- | ----- |
| Handler sense arguments | `onClick={handleClick}` |
| Handler amb arguments | `onClick={() => handleClick(id)}` |
| Múltiples accions al clic | `onClick={() => { acció1(); acció2(); }}` |
| Fill amb `React.memo` | `useCallback` → referència estable |
| Llistes llargues (rendiment crític) | `data-*` attributes \+ referència directa |

  → Sense arguments → referència directa: onClick={handleClick}  
  → Amb arguments   → funció anònima:    onClick={() \=\> handleClick(id)}  
  → La diferència de rendiment és negligible en la majoria de casos  
  → useCallback ÚNICAMENT si el fill usa React.memo i el rendiment importa

