**Per què les keys són essencials en el renderitzat de llistes?**

**Renderitzat de Llistes**  
[https://react.dev/learn/rendering-lists](https://react.dev/learn/rendering-lists)  
Guia oficial de React per mostrar col·leccions de dades en forma de llista.

# **1\. Definició**  

Una **key** és un string o un número que identifica de manera única cada element d'un array entre la resta d'elements d'aquell array. Quan renderitzes una llista de components amb `.map()`, cada element generat necessita una `key` perquè React pugui distingir-lo dels seus "germans".

| const listItems \= people.map(person \=\>  \<li key={person.id}\>{person.name}\</li\>); |
| :---- |

Els elements JSX directament dins d'una crida a `map()` sempre necessiten keys\!

## **2\. Per què existeixen / quin problema resolen**

Imagina que els fitxers al teu escriptori no tinguessin noms. En lloc d'això, et refereixes a ells pel seu ordre — el primer fitxer, el segon fitxer, etc. Et podries acostumar, però un cop n'elimines un, es tornaria confús. 

El segon fitxer esdevindria el primer fitxer, el tercer esdevindria el segon, i així successivament.

Els noms de fitxers en una carpeta i les keys JSX en un array serveixen un propòsit similar. 

Ens permeten identificar de manera única un element entre els seus germans.

 Sense aquesta identitat estable, React només té la **posició** de l'element a l'array per identificar-lo — i la posició és fràgil: canvia cada vegada que s'insereix, s'elimina o es reordena alguna cosa.

Aquesta connexió no és casual: és **exactament** el mateix problema que ja vam veure en profunditat al Tema 1 sobre **reconciliation**. 

Allà vam veure com React compara arbres per decidir què actualitzar; aquí veiem la solució pràctica que el desenvolupador ha de proporcionar perquè aquella comparació funcioni bé.

## **3\. Com funcionen per dins: identitat estable davant de canvis de posició**

Les keys diuen a React a quin element de l'array correspon cada component, perquè pugui emparellar-los més endavant. 

Això esdevé important si els elements del teu array es poden moure (per exemple, per ordenació), inserir-se, o eliminar-se. 

Una `key` ben escollida ajuda React a inferir exactament què ha passat, i fer les actualitzacions correctes a l'arbre del DOM.

Un `key` ben escollit proporciona més informació que la posició dins de l'array. Encara que la posició canviï a causa d'una reordenació, la `key` permet a React identificar l'element durant tot el seu cicle de vida.

| // Sense key estable, si reordenes aquesta llista...const items \= \[{ id: 'a', text: 'Primer' }, { id: 'b', text: 'Segon' }\];// ...amb key={item.id}, React SAP que "Primer" i "Segon" són els MATEIXOS// elements, només han canviat de posició \-- només mou el DOM, no el recrea{items.map(item \=\> \<li key={item.id}\>{item.text}\</li\>)} |
| :---- |

## **4\. D'on s'ha de treure la `key`**

Diferents fonts de dades proporcionen diferents fonts de keys: dades d'una base de dades — pots usar les claus/IDs de la base de dades, que són úniques per naturalesa. 

Dades generades localment (per exemple, notes en una app de notes) — usa un comptador incremental, `crypto.randomUUID()`, o un paquet com `uuid` en crear els elements.

| // Bona pràctica: incloure la key a les pròpies dades, NO generar-la al volexport const people \= \[  { id: 0, name: 'Creola Katherine Johnson', profession: 'mathematician' },  { id: 1, name: 'Mario José Molina-Pasquel Henríquez', profession: 'chemist' },\]; |
| :---- |

En lloc de generar les keys "al vol", les hauries d'incloure a les teves dades des d'un bon principi.

## **5\. Les dues regles de les keys**

Les keys han de ser úniques entre germans. Tot i això, està bé usar les mateixes keys per a nodes JSX en arrays diferents.

Les keys no han de canviar, o açò anul·la el seu propòsit\! No les generis mentre renderitzes.

| // ❌ MAI fer açò: genera una key nova a cada render{items.map(item \=\> \<li key={Math.random()}\>{item.text}\</li\>)}// ✅ Key estable, basada en una dada que no canvia{items.map(item \=\> \<li key={item.id}\>{item.text}\</li\>)} |
| :---- |

## **6\. El parany clàssic: usar l'índex de l'array com a `key`**

Aquest és, amb diferència, l'error més comú i el que cal entendre amb més profunditat: pots tenir la temptació d'usar l'índex de l'element a l'array com la seva key. 

De fet, això és el que React usarà si no especifiques cap `key`. Però l'ordre en què renderitzes els elements canviarà al llarg del temps si un element s'insereix, s'elimina, o si l'array es reordena. 

Usar l'índex com a key sovint porta a bugs subtils i confusos.

| // ❌ Perillós si la llista pot reordenar-se, afegir o eliminar elements{items.map((item, index) \=\> \<li key={index}\>{item.text}\</li\>)}// ✅ Estable independentment de l'ordre o de canvis a la llista{items.map(item \=\> \<li key={item.id}\>{item.text}\</li\>)} |
| :---- |

Per què és perillós, en concret: si elimines el primer element d'una llista de tres, l'element que abans tenia índex `1` passa a tenir índex `0`. 

React, creient que la `key` (l'índex) identifica el **mateix** element de sempre, pot reutilitzar incorrectament l'estat intern o el DOM d'un component diferent al que realment hi havia abans en aquella posició — un bug especialment greu si la llista conté inputs de formulari, ja que poden acabar mostrant el valor equivocat.

I igual de perillós: de manera similar, no generis keys al vol, per exemple amb `key={Math.random()}`. 

Això farà que les keys mai coincideixin entre renders, provocant que tots els teus components i el DOM es recreïn cada vegada. 

Això no només és lent, sinó que també farà que es perdi qualsevol input de l'usuari dins dels elements de la llista.

## **7\. Detall important: la `key` no és una prop normal**

Fixa't que els teus components NO rebran `key` com a prop. Només s'utilitza com una pista pel propi React. Si el teu component necessita un ID, l'has de passar com una prop separada:

| // ❌ key NO arriba dins del component com a props.key\<Profile key={id} /\>// ✅ Si el component necessita l'ID, cal passar-lo EXPLÍCITAMENT a més de la key\<Profile key={id} userId={id} /\> |
| :---- |

## **8\. Cas especial: múltiples nodes DOM per element de llista**

Quan cada element de la llista necessita renderitzar més d'un node (no només un `<li>`), cal anar amb compte amb la sintaxi: la sintaxi curta `<>...</>` de Fragment no permet passar-li una key, així que cal agrupar-los en un sol `<div>`, o utilitzar la sintaxi una mica més llarga i explícita `<Fragment>`:

| import { Fragment } from 'react';const listItems \= people.map(person \=\>  \<Fragment key={person.id}\>    \<h1\>{person.name}\</h1\>    \<p\>{person.bio}\</p\>  \</Fragment\>);// Els Fragments desapareixen del DOM, generant una llista plana// de \<h1\>, \<p\>, \<h1\>, \<p\>, etc., sense cap embolcall extra |
| :---- |

## **9\. Avantatges i inconvenients**

**Avantatges (d'usar keys correctament):**

* **Actualitzacions del DOM mínimes i correctes**: React sap exactament quin element s'ha mogut, inserit o eliminat, sense haver de refer res innecessàriament  
* **Preserva l'estat intern dels components** de la llista entre renders (per exemple, el text escrit dins d'un input dins d'un element de llista no es perd en reordenar)  
* **Connecta directament amb el rendiment** de tot el sistema de reconciliation que ja vam veure al Tema 1: una bona `key` és precisament el que permet a l'heurística O(n) funcionar correctament

**Inconvenients / cost si es fan malament:**

* Usar l'índex com a key **pot funcionar bé en llistes estàtiques** que mai canvien d'ordre ni de contingut, però es converteix en una bomba de rellotgeria en el moment que la llista esdevé dinàmica  
* Generar keys aleatòries (`Math.random()`) **destrueix completament** el benefici de la reconciliation, forçant un re-render total cada vegada

## **10\. Errors comuns / mals entesos**

* **Usar l'índex de l'array com a `key` per "estalviar-se" haver de pensar un identificador.** Funciona sense errors visibles a la consola, però introdueix bugs subtils en el moment que la llista canvia d'ordre o de mida.  
* **Generar la `key` dins del mateix `.map()` amb una funció no determinista** (com `Math.random()` o `Date.now()`). Cada render genera una key diferent, així que React mai pot relacionar un element del render anterior amb el del nou, perdent tot l'estat intern.  
* **Pensar que la `key` arriba al component com una prop normal accessible amb `props.key`.** No ho fa; és exclusivament una pista interna per a React. Si cal l'ID dins del component, s'ha de passar com una prop diferent.  
* **Oblidar la `key` en un Fragment quan cada element de llista necessita múltiples nodes.** Cal usar la sintaxi llarga `<Fragment key={...}>`, ja que la sintaxi curta `<>` no accepta atributs.

## **11\. Connexió amb altres conceptes del temari**

* Aquest tema connecta **directament** amb la **reconciliation** del Tema 1: les keys són el mecanisme pràctic que el desenvolupador proporciona perquè l'heurística de diffing O(n) de React funcioni correctament en lloc de degradar-se a mutacions innecessàries  
* Es relaciona amb `map()` i `filter()`: les keys s'assignen exactament al punt on transformes un array de dades en un array d'elements JSX amb `.map()`  
* Connecta amb la **puresa dels components** (Tema 1): mantenir les keys estables i no generar-les "al vol" és coherent amb el principi de determinisme — la mateixa entrada (mateixes dades, mateix `id`) ha de produir sempre la mateixa key  
* Anticipa el **render tree** (pròxima pregunta del Tema 2): les keys són precisament la informació que permet a React mantenir correctament l'estructura de l'arbre de renderitzat quan les llistes que el componen canvien dinàmicament

## 

## 

## **12\. Preguntes de repàs** 

**1\. Per què React necessita una `key` per a cada element d'una llista renderitzada amb `map()`?**

Perquè sense una identitat estable, l'única manera que té React de relacionar un element entre dos renders és la seva posició a l'array. Aquesta posició canvia constantment quan s'insereixen, eliminen o reordenen elements, fent que React no pugui saber amb certesa quin element correspon a quin abans i després del canvi.

**2\. Per què usar l'índex de l'array com a `key` és problemàtic, encara que React no mostri cap error?**

Perquè l'índex no és una identitat real de l'element, és només la seva posició momentània. Si la llista es reordena o s'eliminen/insereixen elements, els índexs es desplacen, i React pot assignar incorrectament l'estat o el DOM d'un element a un altre que ara ocupa la mateixa posició, generant bugs subtils especialment greus en llistes amb inputs.

**3\. Per què no s'han de generar les keys "al vol" amb `Math.random()`?**

Perquè una key generada de manera no determinista canvia a cada render, així que mai coincidirà amb la del render anterior. React interpretarà que cada element és "nou", destruint i recreant tots els components i el DOM corresponent a cada actualització, perdent qualsevol estat o input de l'usuari dins de la llista.

**4\. Pot un component accedir al valor de la seva pròpia `key` mitjançant `props.key`?**

No. La `key` és exclusivament una pista interna que utilitza React per a la reconciliation; mai s'exposa com a prop al component. Si el component necessita aquell identificador per a la seva pròpia lògica, s'ha de passar explícitament com una prop diferent (per exemple, `userId`), a més de la `key`.

**5\. Quina és la font recomanada per obtenir una `key`, segons el tipus de dada?**

Si les dades provenen d'una base de dades, s'ha d'utilitzar l'ID o clau pròpia de la base de dades, que ja és única per naturalesa. Si les dades es generen i persisteixen localment (per exemple, en una app de notes), es recomana un comptador incremental, `crypto.randomUUID()`, o una llibreria com `uuid` en el moment de crear cada element.

 

