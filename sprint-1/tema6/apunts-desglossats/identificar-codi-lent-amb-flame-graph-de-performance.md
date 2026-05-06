## **Identificació de codi lent amb el Flame Graph de Performance**

**Què és el panell Performance i per quèexisteix**

L'objectiu de qualsevol optimització de rendiment és fer menys treball. Però per saber quin treball eliminar, primer cal mesurar exactament on es gasta el temps. El panell Performance de Chrome DevTools és l'eina per a aquesta tasca: registra tota l'activitat del navegador (JavaScript, CSS, renderitzat, xarxa) durant un interval de temps i la presenta de manera visual.

El flame graph (o flame chart) és el cor del panell Performance. Mostra l'estat de la pila de crides JavaScript en cada mil·lisegon durant el perfil. Això proporciona una manera de saber precisament quina funció s'estava executant en qualsevol punt durant la gravació, quant de temps va durar i des d'on va ser cridada. Això és útil quan es tracten colls d'ampolla de rendiment: el gràfic permet trobar les funcions responsables perquè es puguin refactoritzar.

**Pas 1: Preparar l'entorn per gravar**

Obre Chrome en **mode Incògnit** per evitar que les extensions interfereixin en les mesures. Obre DevTools (`F12` o `Cmd+Option+I`) → pestanya **Performance**.

**CPU Throttling**: els dispositius mòbils tenen molt menys poder de CPU que els ordinadors d'escriptori. DevTools pot simular com es comporta la pàgina en mòbils. L'opció "4x slowdown" fa que la CPU operi 4 vegades més lenta, exposant els problemes de rendiment que no es veuen en un ordinador potent.

Panell Performance → configuració (⚙️) → CPU: 4x slowdown

**Pas 2: Gravar una sessió**

Clica el botó **Record** (cercle vermell) → realitza l'acció lenta (desplaça, clica el botó problemàtic, navega) → clica **Stop**.

El resultat és un perfil complet de tota l'activitat durant aquell interval.

**Pas 3: Llegir l'overview (la línia de temps superior)**

Quan cap event específic és seleccionat, el panell mostra un resum de l'activitat dividit en categories amb colors:

* **Groc** → JavaScript (Scripting)  
* **Morat** → Layout i Style recalculation  
* **Verd** → Rendering i Painting  
* **Gris** → Tasques del sistema

Si veus molt de groc (JavaScript), el coll d'ampolla és al codi JavaScript. Si veus molt de morat (Layout), el problema és que el codi JavaScript força el navegador a recalcular el layout massa freqüentment.

Les **Long Tasks** (tasques llargues) apareixen marcades en vermell a l'overview. Les tasques de més de 50ms es consideren "llargues" perquè bloquen el fil principal i fan que la interfície sembli lenta o no respongui als inputs de l'usuari.

**Pas 4: Llegir el Flame Graph (el flame chart)**

Expandeix la secció **Main** per veure el flame chart. L'eix horitzontal és el temps. L'eix vertical és la pila de crides.

Cada barra representa una tasca o funció. Una barra **més ampla** significa que aquell event ha tardat més. Quan veus events apilats un sobre l'altre, vol dir que els events superiors han causat els inferiors.

Les funcions cares son **amples**, independentment de la seva posició a la pila. Presta atenció especial a les barres amples en qualsevol posició de la pila.

Main Thread flame chart (eix Y \= pila de crides, eix X \= temps):

| \[────────────── click event ──────────────\]    ← root (event que ho ha disparat)  \[─── handleClick ───────────────────────\]    ← funció cridada    \[─────── renderLlista ───────────────\]     ← funció costosa (barra ample\!)      \[── actualitzarDOM ──\] \[─ reflow ─\]      ← conseqüències |
| :---- |

**Pas 5: Identificar el coll d'ampolla**

Per identificar el coll d'ampolla, busca la tasca llarga i segueix la cadena d'execució fins al fons. Normalment el culpable és la funció situada al final de la cadena (la més profunda).

Procés d'investigació:  
1\. Busca la barra vermella/taronja (Long Task)  
2\. Amplia la zona fent scroll amb el ratolí  
3\. Clica sobre la barra per veure informació  
4\. Segueix la cadena de crides des de dalt fins avall  
5\. Identifica la funció ampla al final de la cadena  
6\. Clica sobre ella → la informació de sota mostra:  
   \- Nom de la funció  
   \- Temps d'execució (Self Time i Total Time)  
   \- Fitxer i línia exacta del codi

Clica l'enllaç a la font per obrir el fitxer exacte al panell Sources, a la línia on la funció és definida.

**Pas 6: Les pestanyes d'anàlisi del panell inferior**

Quan selecciones un node al flame chart, el panell inferior mostra tres vistes complementàries:

**Summary** — resum de l'event seleccionat: temps total, self time, categoria (Scripting, Rendering...) i enllaç directe a la línia del codi.

**Bottom-Up** — les funcions que consumeixen més temps, ordenables per Self Time o Total Time. Al Bottom-Up panel vols buscar funcions que tinguin un alt percentatge de Total Time però que no siguin visibles al coll de la pila del flame graph: significa que consumeixen molt temps tot i no ser funcions d'alt nivell. La cerca de funcions amb Self Time alt ens condueix a les funcions que realment causen el problema.

La diferència entre **Self Time** i **Total Time** és fonamental:

* **Self Time** — el temps que la funció mateixa ha trigat, **sense comptar** les funcions que ha cridat.  
* **Total Time** — el temps total de la funció **incloses** totes les funcions que ha cridat.

Una funció amb Total Time alt però Self Time baix vol dir que és una funció "contenidora" que crida moltes funcions cares. Una funció amb Self Time alt és la que realment fa el treball costós.

**Call Tree** — similar al flame chart però en format d'arbre textual. Mostra quines activitats arrel causen més treball. Expandibles per veure la cadena de crides completa.

**Problemes típics que es detecten al flame graph**

**JavaScript que bloqueja el fil principal** — una funció JavaScript que tarda molt (per exemple, un bucle sobre 10.000 elements sense pausar) apareixerà com una barra molt ample al flame chart. El fil principal no pot processar cap altre event (clics, scrolls) mentre dura.

**Forced Reflow (Layout Thrashing)** — el codi JavaScript llegeix propietats de layout (com `offsetWidth`, `clientHeight`) mentre hi ha canvis pendents del DOM. El navegador ha de recalcular el layout síncronament, cosa que és molt costosa. Apareix com a blocs "Recalculate Style" i "Layout" repetits al flame chart.

| // ❌ Layout Thrashing: llegir i escriure alternativament força múltiples reflowselements.forEach(el \=\> {  const amplada \= el.offsetWidth;   // ← llegeix el layout (força reflow)  el.style.width \= amplada \+ 'px'; // ← escriu al DOM (invalida el layout)});// ✅ Batch: llegir tot, després escriure tot (un sol reflow)const amplades \= elements.map(el \=\> el.offsetWidth);   // ← lleg totselements.forEach((el, i) \=\> el.style.width \= amplades\[i\] \+ 'px'); // ← escriu tots |
| :---- |

**Animacions costoses** — animations que canvien `top`, `left`, `width` o `height` causen reflow en cada frame. Les propietats `transform` i `opacity` no causen reflow i son accelerades per GPU.

**El flux complet d'optimització**

1\. Mesura → grava amb el panell Performance  
        ↓  
2\. Identifica → busca Long Tasks i barres amples al flame chart  
        ↓  
3\. Investiga → clica sobre la barra → veure Summary \+ Bottom-Up  
   → identifica la funció amb Self Time alt  
        ↓  
4\. Navega al codi → clica l'enllaç a la línia del codi  
        ↓  
5\. Optimitza → refactoritza la funció lenta  
        ↓  
6\. Verifica → grava de nou i compara  
   "Mesura → optimitza → mesura" (mai optimitzis sense mesurar)

**El que cal buscar al flame graph**

| Senyal | Significat | Solució |
| ----- | ----- | ----- |
| Barra molt ampla al flame chart | Funció que tarda molt | Optimitzar o dividir en chunks |
| Long Task (\>50ms) marcada en vermell | Bloqueja el fil principal | Dividir amb `setTimeout` o `requestIdleCallback` |
| Molts blocs "Layout" i "Style" alternats | Layout Thrashing | Batch reads \+ batch writes |
| Self Time alt a la funció | Treball real costós | Optimitzar l'algorisme |
| Total Time alt, Self Time baix | Crida moltes funcions cares | Optimitzar les funcions cridades |
| Molts blocs grocs (Scripting) repetits | JavaScript s'executa massa sovint | Throttling, debouncing, memòria cau |

