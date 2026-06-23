**Quins problemes resol JSX en comparació amb HTML pur?**

**JSX en profunditat**  
Explicació completa sobre JSX i el seu paper dins React.  
[https://react.dev/learn/writing-markup-with-jsx](https://react.dev/learn/writing-markup-with-jsx)

## **1\. Definició**  

JSX és una extensió de sintaxi per a JavaScript que et permet escriure marcatge semblant a HTML dins d'un fitxer JavaScript. 

JSX i React són dues coses separades: sovint s'utilitzen junts, però es poden usar de manera independent l'una de l'altra. 

JSX és una extensió de sintaxi, mentre que React és una llibreria de JavaScript.

És important aclarir d'entrada: JSX **no substitueix** l'HTML perquè sigui millor en abstracte, sinó perquè **resol un problema concret** que apareix quan les interfícies es tornen interactives, com veurem al punt següent.

## **2\. Per què existeix / quin problema resol**

Aquí hi ha la clau real d'aquesta pregunta, i és diferent de tot el que hem vist fins ara sobre JSX (Tema 1): **per què calia trencar la separació clàssica entre HTML, CSS i JS**.

El Web s'ha construït sobre HTML, CSS i JavaScript. Durant molts anys, els desenvolupadors web mantenien el contingut en HTML, el disseny en CSS, i la lògica en JavaScript — sovint en fitxers separats\! 

El contingut es marcava dins de l'HTML mentre que la lògica de la pàgina vivia separada en JavaScript.

Aquest model va funcionar bé mentre les pàgines eren majoritàriament estàtiques. Però: a mesura que el Web es va tornar més interactiu, la lògica va determinar cada vegada més el contingut. 

JavaScript estava al càrrec de l'HTML\! Això és per què, a React, la lògica de renderitzat i el marcatge viuen junts al mateix lloc: els components.

Dit d'una altra manera: el problema que JSX resol és que **HTML pur no té manera d'expressar lògica condicional o dinàmica de manera natural**. 

Si la lògica (JavaScript) ha de decidir constantment què mostra el contingut (HTML), té més sentit que **visquin junts**, en lloc de forçar-los a fitxers separats que cal sincronitzar manualment cada vegada que un canvia.

## **3\. El benefici concret: cohesió i aïllament**

Mantenir junta la lògica de renderitzat d'un botó i el seu marcatge assegura que es mantinguin sincronitzats l'un amb l'altre en cada edició. 

Inversament, detalls que no estan relacionats, com el marcatge d'un botó i el marcatge d'una barra lateral, queden aïllats l'un de l'altre, fent més segur canviar qualsevol dels dos per separat.

Aquesta és la idea central que cal retenir: **JSX no només "es veu com HTML dins de JS" per comoditat estètica**. Resol el problema real de sincronització entre contingut i comportament, agrupant-los al component en lloc de separar-los en fitxers que es poden desincronitzar.

| // JSX: lògica i marcatge VIUEN JUNTS al mateix componentfunction Sidebar({ isLoggedIn }) {  return (    \<div\>      {isLoggedIn ? \<p\>Benvingut/a de nou\!\</p\> : \<Form /\>}    \</div\>  );  // Si canvies la condició isLoggedIn, el marcatge que en depèn  // és JUSTAMENT AQUÍ AL COSTAT, no en un altre fitxer .html separat} |
| :---- |

## **4\. Com funciona per dins: JSX no és HTML, és JavaScript**

Cada component React és una funció de JavaScript que pot contenir marcatge que React renderitza al navegador. 

Els components React utilitzen una extensió de sintaxi anomenada JSX per representar aquest marcatge. JSX s'assembla molt a HTML, però és una mica més estricte i pot mostrar informació dinàmica.

Aquesta diferència de fons ("és JavaScript, no HTML") és precisament l'origen de les tres regles que veiem al punt següent: JSX es transforma en objectes JavaScript normals. No pots retornar dos objectes des d'una funció sense embolicar-los en un array. 

Això explica per què tampoc pots retornar dues etiquetes JSX sense embolicar-les en una altra etiqueta o un Fragment.

## 

## **5\. Les tres regles de JSX (i el problema concret que cadascuna soluciona)**

**Regla 1: Retornar un sol element arrel**

Per retornar múltiples elements des d'un component, has d'embolicar-los amb una sola etiqueta pare:

| // ❌ No funciona: dos elements arrel sense embolicarreturn (  \<h1\>Tasques de Hedy Lamarr\</h1\>  \<ul\>...\</ul\>);// ✅ Amb un \<div\>return (  \<div\>    \<h1\>Tasques de Hedy Lamarr\</h1\>    \<ul\>...\</ul\>  \</div\>);// ✅ Amb un Fragment (sense afegir cap node extra al DOM)return (  \<\>    \<h1\>Tasques de Hedy Lamarr\</h1\>    \<ul\>...\</ul\>  \</\>); |
| :---- |

Aquesta etiqueta buida s'anomena Fragment. Els Fragments et permeten agrupar coses sense deixar cap rastre a l'arbre HTML del navegador — útil quan no vols afegir un `<div>` innecessari només per complir la regla.

**Regla 2: Tancar totes les etiquetes**

JSX requereix que les etiquetes es tanquin explícitament: etiquetes auto-tancades com `<img>` han d'esdevenir `<img />`, i etiquetes embolcalladores com `<li>oranges` s'han d'escriure com `<li>oranges</li>`.

| // HTML vàlid però JSX invàlid:\<img src="..." class\="photo"\>\<li\>Inventar nous semàfors// JSX correcte:\<img src="..." className="photo" /\>\<li\>Inventar nous semàfors\</li\> |
| :---- |

**Regla 3: camelCase per a (gairebé) tot**

JSX es converteix en JavaScript, i els atributs escrits en JSX esdevenen claus d'objectes JavaScript. Però JavaScript té limitacions en els noms de variables: no poden contenir guions ni ser paraules reservades com `class`.

Per aquesta raó, a React, molts atributs HTML i SVG s'escriuen en camelCase. Per exemple, en lloc de `stroke-width` fas servir `strokeWidth`. Com que `class` és una paraula reservada, a React escrius `className` en lloc, anomenat així pel corresponent propietat del DOM.

| // HTML\<div class\="container" stroke-width="2"\>// JSX\<div className="container" strokeWidth="2"\> |
| :---- |

Per raons històriques, els atributs `aria-*` i `data-*` s'escriuen com a l'HTML, amb guions — l'única excepció notable a aquesta regla.

## **6\. Avantatges i inconvenients**

**Avantatges:**

* **Sincronització garantida entre lògica i marcatge**: en viure al mateix lloc, és físicament impossible que es desincronitzin (com sí podia passar amb fitxers HTML/JS separats)  
* **Aïllament de detalls no relacionats**: el marcatge d'un component no interfereix amb el d'un altre, fent més segur modificar-los independentment  
* **Pot mostrar informació dinàmica** de manera natural, cosa que HTML estàtic no pot fer per si sol  
* **Missatges d'error útils**: la majoria del temps, els missatges d'error en pantalla de React t'ajudaran a trobar on està el problema

**Inconvenients / cost a assumir:**

* **Regles més estrictes que l'HTML**: cal aprendre i recordar les tres regles (element arrel únic, tancar totes les etiquetes, camelCase), que no calen en HTML pur  
* **Migrar HTML existent requereix conversió**: convertir tots aquests atributs en marcatge existent pot ser tediós, encara que es recomana utilitzar un convertidor per traduir HTML i SVG existent a JSX  
* **Requereix un pas de compilació** (com ja vam veure al Tema 1): el navegador no entén JSX directament, cal Babel o similar

## **7\. Errors comuns / mals entesos**

* **Copiar i enganxar HTML directament dins d'un component sense adaptar-lo.** Si el copies i l'enganxes tal com és, no funcionarà — cal aplicar les tres regles primer (element arrel, tancar etiquetes, camelCase).  
* **Oblidar tancar etiquetes auto-tancades com `<img>` o `<br>`.** En HTML és opcional; en JSX és obligatori escriure `<img />` i `<br />`.  
* **Usar `class` en lloc de `className`.** És l'error més típic per a qui ve d'HTML pur; com `class` és paraula reservada en JavaScript, React usa `className`.  
* **Pensar que JSX és només "estètica" o preferència de sintaxi.** Com hem vist al punt 3, el motiu real és estructural: agrupar lògica i marcatge evita problemes reals de sincronització en aplicacions interactives.

## **8\. Connexió amb altres conceptes del temari**

* Aquest tema connecta directament amb el que ja vam veure al Tema 1 sobre **JSX → `React.createElement`**: ara entens **per què** calia aquesta traducció (JSX és sucre sintàctic sobre JavaScript), i aquí veus **per què calia JSX en primer lloc** (per unir lògica i marcatge)  
* Es relaciona amb la **programació declarativa**: en unir lògica i marcatge al mateix lloc, JSX fa que sigui natural escriure "si la condició X és certa, mostra Y" sense haver de saltar entre fitxers diferents  
* Anticipa **mostrar informació amb JavaScript dins de JSX** (pròxim objectiu d'aprenentatge del Tema 2): un cop entens per què JSX barreja lògica i marcatge, el pas natural és aprendre a incrustar-hi expressions JavaScript amb claus `{}`  
* Connecta amb la **separació de components en fitxers** (pregunta anterior): encara que cada component visqui al seu propi fitxer, dins d'aquell fitxer la lògica i el marcatge del component **continuen vivint junts** — la separació en fitxers no trenca aquest principi fonamental de JSX

## **9\. Preguntes de repàs**  

**1\. Quin problema concret va portar React a unir lògica i marcatge en un mateix lloc (els components), en lloc de mantenir-los separats com en el model clàssic HTML/JS?**

A mesura que el web es va tornar més interactiu, la lògica de JavaScript va començar a determinar cada vegada més el contingut HTML que es mostrava. Mantenir-los en fitxers separats obligava a sincronitzar-los manualment cada vegada que un canviava, generant un risc constant de desincronització. Unint-los en un component, els canvis es mantenen coherents automàticament.

**2\. Per què un component de React no pot retornar dues etiquetes JSX sense embolicar-les?**

Perquè JSX es transforma per sota en objectes JavaScript normals, i una funció no pot retornar dos objectes sense agrupar-los (per exemple, en un array). Per això cal embolicar múltiples etiquetes JSX en un element pare comú, com un `<div>` o un Fragment (`<>...</>`).

**3\. Què és un Fragment i quan convé utilitzar-lo en lloc d'un `<div>`?**

És una etiqueta buida (`<>...</>`) que permet agrupar múltiples elements JSX sense deixar cap rastre a l'arbre HTML real del navegador. Convé fer-lo servir quan necessites complir la regla de l'element arrel únic, però no vols (o no necessites) afegir un `<div>` extra que alteri l'estructura visual o semàntica de la pàgina.

**4\. Per què a React s'escriu `className` en lloc de `class`?**

Perquè els atributs JSX es converteixen en claus d'objectes JavaScript, i `class` és una paraula reservada del llenguatge que no es pot utilitzar com a nom de propietat en aquest context. React fa servir `className`, que correspon directament a la propietat `className` del DOM real.

**5\. Quina excepció important hi ha a la regla del camelCase en els atributs JSX?**

Els atributs `aria-*` (accessibilitat) i `data-*` (dades personalitzades) es continuen escrivint amb guions, exactament igual que en HTML, per raons històriques, en lloc de convertir-se a camelCase com la resta d'atributs.

 

