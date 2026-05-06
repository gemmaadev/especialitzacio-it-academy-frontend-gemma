## **Optimització de càrrega de recursos amb el Panel Network**

**Per què existeix el panel Network**

El panel Network registra totes les peticions de xarxa que fa la pàgina: l'HTML inicial, els fitxers JavaScript, els CSS, les imatges, les fonts, les crides a APIs... Tot queda registrat amb timing detallat. 

S'usa quan cal assegurar-se que els recursos s'estan descarregant o pujant com s'espera, per inspeccionar les propietats d'un recurs individual com les seves capçaleres HTTP, el contingut, la mida, i per analitzar el rendiment de la càrrega de la pàgina.

**Com obrir-lo:** `F12` → pestanya **Network** → recarrega la pàgina per capturar totes les peticions.

**L'estructura del panel: les quatre zones**

* **Barra d'eines superior** — filtres per tipus de recurs, desactivar la caché, throttling de xarxa, preservar el log.  
* **Overview (línia de temps)** — vista comprimida de totes les peticions en el temps. Les línies blava (DOMContentLoaded) i vermella (Load) marquen moments clau del cicle de vida de la pàgina.  
* **Taula de peticions** — cada fila és un recurs carregat. Columnes principals: Name, Status, Type, Initiator, Size, Time i Waterfall.  
* **Panell de detalls** — apareix quan cliques una petició: Headers, Preview, Response, Initiator i Timing.

**El Waterfall: llegir l'història de cada petició**

El waterfall mostra cada part de la petició en un color diferent. Els segments de color codifiquen informació crítica de timing.

La part lleugera de cada barra representa la latència de la petició (temps esperant). La part fosca representa el temps rebent les dades de resposta. 

Per tant, les barres llargues lleugerament (verd/cian) indiquen que el servidor és lent. Les barres llargues fosques (blau) indiquen que el recurs és gran o l'amplada de banda és escassa.

Les fases detallades que veus al Timing de cada petició:

* **Queueing** — la petició está en cua esperant que el navegador tingui un slot disponible. Molt cues indica massa peticions simultànies.  
* **Stalled** — temps que la petició ha esperat bloquejada per qualsevol motiu.  
* **DNS Lookup** — resolució del nom de domini a adreça IP. Únicament apareix en la primera connexió al servidor.  
* **Initial Connection / SSL** — establiment de la connexió TCP \+ handshake TLS. Costós perquè implica múltiples round-trips.  
* **TTFB (Time To First Byte)** — el temps des que el navegador envia la petició fins que rep el primer byte de la resposta. Mesura el temps de resposta del servidor. Si el TTFB és alt, el servidor és el coll d'ampolla.  
* **Content Download** — temps descarregant el cos de la resposta. Valors més grans de l'esperat poden indicar una xarxa lenta o el navegador ocupat amb altra feina.

**Simular xarxes lentes: Throttling**

Pots simular connexions lentes per detectar problemes que únicament apareixen en mòbil o connexions deficients. A la barra d'eines del Network → "No throttling" → selecciona "Slow 3G", "Fast 3G" o crea un perfil personalitzat.

La limitació revela la competència de recursos. Quan l'amplada de banda es fa escassa, la columna Priority es torna crucial. Els navegadors assignen la prioritat **Highest** als recursos que bloquen el renderitzat, **High** a les imatges visibles i **Low** al contingut sota el fold.

**Filtres: trobar el recurs problemàtic**

| Botons de filtre per tipus:  Fetch/XHR → crides a APIs  JS         → fitxers JavaScript  CSS        → fulls d'estil  Img        → imatges  Doc        → document HTML principal  Font       → fonts webFiltre de text (caixa de cerca):  api/usuaris     → peticions que contenen "api/usuaris" a la URL  \-static         → exclou URLs que contenen "static"  status-code:404 → únicament peticions amb codi 404  larger-than:1M  → recursos de més d'1MB |
| :---- |

Mantén Command (Mac) o Control (Windows) i clica múltiples filtres per mostrar diversos tipus simultàniament.

**Les capçaleres: detectar problemes de compressió i caché**

Quan cliques un recurs → pestanya **Headers**, pots veure les capçaleres HTTP de la petició i la resposta.

**Detectar compressió:** comprova si existeix la capçalera `Content-Encoding: gzip` o `Content-Encoding: br`. Si la mida "transferred" és molt similar a la mida "resource" sense comprimir, el servidor no està comprimint. Habilitant Brotli o Gzip es pot reduir la mida un 60-80%.

**Detectar caché configurada:** la capçalera `Cache-Control` indica al navegador quant de temps ha de guardar el recurs. Si no existeix o és `no-cache`, cada recàrrega descarrega el recurs de nou.

| // Capçaleres que volem veure:Content-Encoding: br              ← comprimit amb Brotli ✅Cache-Control: max-age=31536000   ← guardat 1 any ✅ETag: "a3f8c21..."                ← validació de caché ✅// Capçaleres problemàtiques:Content-Encoding: (absent)        ← sense compressió ⚠️Cache-Control: no-store           ← no es guarda mai ⚠️ |
| :---- |

**Detectar el valor del TTFB:** si el segment de "Waiting (TTFB)" és molt llarg, el servidor tarda massa a generar la resposta. Causes possibles: consultes de base de dades lentes, processament costós al backend, servidor sobrecarregat.

**La columna Size: detectar recursos massa grans**

La columna Size mostra dues mides: la mida transferida (comprimida) i la mida real (descomprimida). Una gran diferència entre les dues indica bona compressió. Mides similars suggereixen que hauries d'habilitar compressió gzip o Brotli al servidor.

**Filtrar per mida:**

| larger-than:500k   → recursos de més de 500KBlarger-than:1M     → recursos de més d'1MB |
| :---- |

Els recursos més grans a reduir per ordre d'impacte: imatges no optimitzades, bundles JavaScript sense tree-shaking i fonts web de múltiples formats.

**Patrons problemàtics al Waterfall i com solucionar-los**

* **Cascada d'escales ("staircase pattern")**: les peticions s'inicien de manera seqüencial en lloc de en paral·lel. Indica que un recurs bloqueja el carregament dels següents. Solució: usar `rel="preload"` per a recursos crítics o eliminar dependències seqüencials.  
* **Moltes peticions petites**: centenars de peticions petites creen overhead de connexió. El waterfall mostra molta amplada però poc temps de descàrrega. Solució: combinar arxius CSS/JS, usar sprites d'icones o SVG inline.  
* **Recursos amb molt de Queueing**: el navegador en HTTP/1.1 limita a 6 connexions per domini. Si tens moltes peticions al mateix domini, esperen en cua. Solució: migrar a HTTP/2 que permet múltiples peticions per connexió.  
* **TTFB molt alt (\>500ms)**: el servidor és el coll d'ampolla, no els recursos. Causes: base de dades lenta, servidor sense caché, servidor físicament lluny de l'usuari. Solució: CDN, caché de servidor, optimització de consultes.

**Disable Cache: simular la primera visita**

La caché del navegador pot ocultar problemes reals. Activa "Disable cache" (disponible a la barra d'eines del Network quan DevTools és obert) per forçar que el navegador descarregui tots els recursos de nou, simulant la primera visita d'un usuari nou.

**Quan usar Network vs. Lighthouse**

Si vols saber quina petició específica és lenta i per quèés lenta, usa el Network panel: et dóna control total i dades detallades de cada recurs. Si vols una auditoria automàtica amb recomanacions prioritzades, usa Lighthouse: analitza el rendiment i et diu exactament què has de fer per millorar el LCP, el CLS o el FID.

Si vols millorar el rendiment de la càrrega de pàgina no comencis amb el Network panel. Comença amb Lighthouse perquè et proporciona suggeriments dirigits sobre com millorar la pàgina. Un cop Lighthouse t'ha dit quins recursos optimitzar, el Network és on investigues els detalls.

**El flux d'optimització amb el Network panel**

1\. Obre en mode Incògnit \+ Disable cache \+ Throttling (Slow 3G)  
        ↓  
2\. Recarrega la pàgina i observa:  
   → Quants recursos hi ha? (molts \= problema)  
   → Quins son els més grans? (filtra larger-than:500k)  
   → Hi ha peticions en vermell? (errors)  
        ↓  
3\. Analitza el Waterfall:  
   → Patró en escales? → peticions seqüencials quan podrien ser paral·leles  
   → Molt Queueing? → massa peticions simultànies al mateix domini  
   → TTFB alt? → servidor lent  
   → Content Download llarg? → recurs massa gran o sense compressió  
        ↓  
4\. Clica el recurs sospitós → Headers:  
   → Té Content-Encoding? → si no, afegeix compressió  
   → Té Cache-Control? → si no, configura caché  
        ↓  
5\. Aplica la millora i torna a mesurar

