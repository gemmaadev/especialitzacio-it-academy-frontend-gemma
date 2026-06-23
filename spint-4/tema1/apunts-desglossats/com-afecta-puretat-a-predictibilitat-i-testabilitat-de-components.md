**Com afecta la puretat a la predictibilitat i testabilitat dels components?** 

## **1\. Definició**  

Aquesta pregunta no introdueix un concepte nou, sinó que **connecta directament** dues conseqüències pràctiques de la puretat que ja hem vist: si un component és pur (mateixa entrada → mateixa sortida, sense efectes secundaris), això té un impacte directe i mesurable sobre dues qualitats clau del codi:

* **Predictibilitat**: poder saber, només mirant les props/estat, què renderitzarà un component, sense sorpreses  
* **Testabilitat**: poder escriure tests senzills i fiables que comprovin aquest comportament

## **2\. Per què la puretat afecta la predictibilitat**

Com ja vam veure, les funcions pures no tenen efectes secundaris i no depenen d'estat global; la seva única font de veritat són els seus paràmetres. Per això són predictibles i determinades.

Pensa-ho en termes pràctics: si un component és pur, **mai necessites més context que les seves props i el seu estat actual** per saber què mostrarà. No has de preguntar-te "quina hora és?", "quin valor té aquesta variable global en aquest moment?", "ha respost ja el servidor?". El resultat és sempre derivable directament de l'entrada.

| // PUR → PREDICTIBLE// Per saber què mostra, només cal mirar les props. Punt.function PriceTag({ price, currency }) {  return \<span\>{price} {currency}\</span\>;}// PriceTag({price: 10, currency: '€'}) SEMPRE mostrarà "10 €"// No importa quan el cridis, quantes vegades, ni en quin ordre// IMPUR → IMPREDICTIBLE// Per saber què mostra, necessites saber l'hora exacta en què s'executafunction PriceTag({ price, currency }) {  const discount \= new Date().getHours() \< 12 ? 0.9 : 1; // depèn de l'hora del rellotge\!  return \<span\>{price \* discount} {currency}\</span\>;}// El mateix component, amb les mateixes props, dona resultats DIFERENTS// depenent de quan es renderitzi |
| :---- |

Aquesta impredictibilitat es multiplica quan els components s'encadenen. 

Si `ComponentA` és impur i `ComponentB` el fa servir, la impuresa "es filtra" cap amunt: ara `ComponentB` tampoc és predictible, encara que el seu propi codi sigui correcte. 

**La impuresa és contagiosa** dins d'un arbre de components.

## **3\. Per què la puretat afecta la testabilitat**

Aquí la connexió és encara més directa, perquè testejar una funció consisteix bàsicament en: *donar-li una entrada coneguda, i comprovar que la sortida és l'esperada*. Això és **literalment la definició** d'una funció pura aplicada a un test.

| // Component PUR: trivial de testejarfunction Greeting({ name }) {  return \<h1\>Hola, {name}\!\</h1\>;}// Test: cap mock, cap setup complex, cap simulació de temps o xarxatest('mostra el nom correctament', () \=\> {  render(\<Greeting name="Marta" /\>);  expect(screen.getByText('Hola, Marta\!')).toBeInTheDocument();});// Aquest test SEMPRE passarà igual, en qualsevol ordre, en qualsevol entorn |
| :---- |

| // Component IMPUR: testejar-lo es complica moltfunction Greeting() {  const hour \= new Date().getHours();  const greeting \= hour \< 12 ? 'Bon dia' : 'Bona tarda';  return \<h1\>{greeting}, convidat\!\</h1\>;}// Test: cal "enganyar" el rellotge del sistema per fer-lo deterministatest('mostra "Bon dia" abans del migdia', () \=\> {  jest.useFakeTimers().setSystemTime(new Date('2026-06-22T09:00:00')); // mock necessari\!  render(\<Greeting /\>);  expect(screen.getByText(/Bon dia/)).toBeInTheDocument();  jest.useRealTimers(); // cal netejar després});// Més codi, més fragilitat, més coses que poden sortir malament |
| :---- |

Amb un component que fa una petició de xarxa (impur per naturalesa), el problema s'agreuja encara més: necessitaràs mocks del `fetch`, simular respostes, gestionar temps d'espera asíncrons... 

tot per testejar quelcom que, si estigués ben dissenyat com a "gairebé pur" (separant l'efecte secundari de la lògica de renderitzat), seria molt més senzill de provar per separat.

## **4\. El patró pràctic: aïllar la impuresa per recuperar testabilitat**

Quan un component **necessita** ser impur (peticions de xarxa, dates, valors aleatoris...), la solució no és "deixar-ho impur i prou", sinó aïllar la part impura i mantenir pura la resta:

| // ❌ Difícil de testejar: lògica de presentació i efecte secundari barrejatsfunction WeatherWidget({ city }) {  const \[temp, setTemp\] \= useState(null);  useEffect(() \=\> {    fetch(\`/api/weather?city=${city}\`)      .then(res \=\> res.json())      .then(data \=\> setTemp(data.temp));  }, \[city\]);  if (temp \=== null) return \<p\>Carregant...\</p\>;  if (temp \> 30) return \<p\>Fa molta calor: {temp}°C\</p\>;  return \<p\>Temperatura normal: {temp}°C\</p\>;}// ✅ Millor: la part PURA (presentació) es separa i es pot testejar solafunction WeatherDisplay({ temp }) {  if (temp \=== null) return \<p\>Carregant...\</p\>;  if (temp \> 30) return \<p\>Fa molta calor: {temp}°C\</p\>;  return \<p\>Temperatura normal: {temp}°C\</p\>;}// Aquest component SÍ és trivial de testejar amb diferents valors de temp,// sense necessitat de mockejar cap petició de xarxafunction WeatherWidget({ city }) {  const \[temp, setTemp\] \= useState(null);  useEffect(() \=\> {    fetch(\`/api/weather?city=${city}\`).then(res \=\> res.json()).then(data \=\> setTemp(data.temp));  }, \[city\]);  return \<WeatherDisplay temp={temp} /\>; // l'efecte secundari queda aïllat aquí} |
| :---- |

Aquest és exactament el concepte de **component "gairebé pur"** que ja vam veure: pots fer que el component renderitzi la mateixa sortida pels mateixos valors de props, aïllant l'efecte secundari en una crida de funció separada. 

El benefici directe és que ara pots testejar `WeatherDisplay` (la part important de lògica visual) de manera ràpida i fiable, i deixar només una capa mínima (`WeatherWidget`) responsable de la part impura.

## **5\. Avantatges i inconvenients d'aquest enfocament**

**Avantatges:**

* **Tests més ràpids**: no calen mocks de xarxa, temporitzadors, ni `async/await` per a la majoria de la lògica  
* **Tests més fiables**: sense dependències de temps d'execució o ordre, els tests no fallen "de vegades sí, de vegades no" (els temibles *flaky tests*)  
* **Depuració més senzilla**: si un component pur mostra quelcom incorrecte, el problema **només pot venir** de les seves props — no cal investigar estat global, temporització, ni respostes de xarxa  
* **Refactorització segura**: pots reorganitzar el codi intern d'un component pur amb confiança, sabent que mentre les props d'entrada i la sortida es mantinguin iguals, res es trencarà

**Inconvenients / matisos:**

* Separar la part pura de la impura **afegeix una capa extra de components** (com a l'exemple `WeatherWidget` \+ `WeatherDisplay`), el que pot semblar sobreenginyeria en casos molt senzills  
* No sempre és evident **on tallar**: decidir quina part és "presentació pura" i quina és "gestió d'efecte" requereix experiència i criteri  
* Testejar la part impura (la petició de xarxa en si) **encara cal fer-ho en algun moment** — l'aïllament no elimina la necessitat de tests d'integració, només en redueix la quantitat necessària

## **6\. Errors comuns / mals entesos**

* **Pensar que "testejable" només vol dir "té tests".** Un component impur també es pot testejar, però el cost (mocks, temps de configuració, fragilitat) és molt més alt. La puretat no fa que el testing sigui *possible*, el fa *barat i fiable*.  
* **Creure que cal eliminar totes les impureses sempre.** Algunes són inevitables (peticions de xarxa, interaccions d'usuari). L'objectiu realista no és "zero impuresa", sinó **minimitzar-la i aïllar-la** en punts concrets i controlats.  
* **Confondre predictibilitat amb simplicitat del codi.** Un component pot tenir lògica condicional complexa i seguir sent perfectament predictible (i testejable), sempre que aquesta lògica depengui només de les seves entrades, no d'estat extern canviant.  
* **No testejar els casos "frontera" perquè "el component és pur, ja funciona".** La puretat garanteix que el mateix input dona el mateix output, però no garanteix que aquell output sigui el *correcte*. Encara cal testejar amb diferents valors d'entrada (incloent casos límit: `null`, llistes buides, valors negatius...).

## **7\. Connexió amb altres conceptes del temari**

* Aquest tema és la **conseqüència pràctica directa** del tema anterior sobre funcions pures: aquí veiem *per què* val la pena l'esforç de mantenir components purs, no només *què* és la puresa  
* Connecta amb el **DOM virtual i la reconciliation**: la predictibilitat dels components purs és precisament el que permet a React confiar que, si les props no han canviat, el resultat tampoc canviarà — la base teòrica de `React.memo`  
* Anticipa els **Hooks**, en especial `useEffect`: aquest hook existeix exactament per resoldre el problema que hem vist aquí — donar un lloc controlat i aïllat als efectes secundaris, perquè la resta del component pugui mantenir-se pur i, per tant, predictible i testejable  
* Es relaciona amb la **composició de components**: dividir `WeatherWidget` en una part pura (`WeatherDisplay`) i una capa que gestiona l'efecte és, en essència, aplicar el principi de composició que ja vam veure (peces petites, cada una amb una responsabilitat clara)

## **8\. Preguntes de repàs** 

**1\. Per què la puresa d'un component el fa predictible?**

Perquè el resultat depèn únicament de les seves props i el seu estat actual, sense influència de factors externs com l'hora, l'estat global o respostes de xarxa. Si coneixes l'entrada, sempre pots saber exactament què es renderitzarà, sense excepcions.

**2\. Per què és més senzill escriure tests per a un component pur que per a un d'impur?**

Perquè testejar consisteix a donar una entrada coneguda i comprovar la sortida esperada — exactament la definició d'una funció pura. Un component impur requereix mocks addicionals (de xarxa, de temps, d'estat global) per fer-lo determinista durant el test, afegint complexitat i fragilitat.

**3\. Què vol dir que "la impuresa és contagiosa" dins d'un arbre de components?**

Que si un component impur és utilitzat per un altre, aquest segon component també esdevé impredictible, encara que el seu propi codi sigui correcte — hereta la impredictibilitat del component del qual depèn.

**4\. Quina estratègia pràctica permet recuperar testabilitat quan un component necessita fer alguna cosa impura, com una petició de xarxa?**

Separar el component en dues capes: una capa pura que només rep dades ja resoltes via props i s'encarrega de la presentació (fàcil de testejar amb diferents valors), i una capa que gestiona l'efecte secundari (la petició en si) i passa el resultat cap avall. Això és el patró de component "gairebé pur".

**5\. La puresa garanteix que el resultat renderitzat sigui correcte?**

No. La puresa només garanteix consistència (mateixa entrada → mateixa sortida), no correcció. Cal seguir testejant amb diversos valors d'entrada, incloent casos límit, per assegurar-se que la lògica produeix el resultat *desitjat*, no només un resultat *consistent*.

 

