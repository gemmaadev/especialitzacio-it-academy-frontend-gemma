## **Test-Driven Development: By Example — Kent Beck**

###### **Test-Driven Development: By Example**

[https://www.oreilly.com/library/view/test-driven-development/0321146530/](https://www.oreilly.com/library/view/test-driven-development/0321146530/)  
Llibre clàssic de Kent Beck que introdueix el desenvolupament guiat per tests amb exemples.

**El llibre i el seu context**

Kent Beck va crear el TDD a finals dels 90 com a part de l'Extreme Programming (XP). El seu llibre "Test-Driven Development: By Example" (2002) és el text de referència que va definir la pràctica. 

Simplement, el test-driven development pretén eliminar la por en el desenvolupament d'aplicacions. Mentre que una mica de por és saludable, els subproductes de la por inclouen programadors temptatius, malhumorats i incomunicatius que son incapaços d'absorbir crítica constructiva.

L'objectiu de TDD, tal com ho va articular Ron Jeffries, és: **"Clean code that works."** Codi net que funciona. Les dues paraules importants per separat: "clean" i "works". TDD no garanteix l'una sense l'altra.

**Les dues regles fonamentals de Kent Beck**

Escriu codi nou únicament si un test automatitzat ha fallat. Elimina la duplicació.

Aquestes dues regles impliquen un ordre en les tasques de programació:

Red   → Escriu un petit test que no funciona,  
        i potser ni compila al principi.

Green → Fes que el test funcioni ràpidament,  
        cometent tots els "pecats" necessaris en el procés.

Refactor → Elimina tota la duplicació creada  
           mentre feies passar el test.

Red/Green/Refactor — el mantra TDD.

**L'estructura del llibre: aprendre per exemple**

El llibre segueix dos projectes TDD de principi a fi. La primera part construeix un sistema de diners multi-moneda en Java. La segona part construeix un framework de testing (xUnit) en Python. La tercera part cataloga els patrons TDD i refactoritzacions que han aparegut durant els exemples.

Aprendre per exemple és el mètode del llibre: en lloc d'explicar el TDD en abstracte, Beck mostra cada decisió, cada pas, cada dubte mentre construeix el codi pas a pas.

### **El cicle de la primera part (Money Example)**

El procés es pot resumir en un cicle: afegir ràpidament un test, executar tots els tests i veure com el nou falla, fer un petit canvi, executar tots els tests i veure'ls passar, refactoritzar per eliminar la duplicació.

**Les tècniques per fer passar un test (fase verda)**

Beck descriu diverses estratègies per fer passar ràpidament un test en la fase verda, i la llibertat d'escollir:

**Implementació Falsa (Fake It)** — retorna una constant que coincideix amb l'expectativa del test. La implementació inicial per a un test trencat simplement hauria de retornar una constant que coincideix amb les expectatives del test. Sembla molt important per alguns mantenir la barra verda sense importar el fals que sigui.

| // VERMELL: el test espera 10it('retorna el total del carret', () \=\> {  const carret \= new CarretCompra();  carret.afegir({ preu: 10 });  expect(carret.total()).toBe(10);});// VERD \- Fake It: constant hardcodada (pecant deliberadament)total(): number {  return 10;  // ← "pecat" justificat: el test passa i la barra és verda} |
| :---- |

**Implementació Òbvia** — quan saps exactament quèhas d'escriure, escriu directament la implementació real sense passar per la constant. Quan tot va bé i sé quèhe d'escriure, escric la Implementació Òbvia rere Implementació Òbvia.

**Triangulació** — si no saps com generalitzar, afegeix un segon cas de test que forci la generalització. Beck recomana afegir un altre conjunt d'inputs al test i triangular la implementació real des d'aquells.

| // Primer test: pot ser hardcodeexpect(suma(2, 3)).toBe(5);// Segon test: forces la generalització (ja no pots hardcodar 5\)expect(suma(10, 20)).toBe(30);// Ara sí: has d'implementar la suma real |
| :---- |

**Patrons TDD del llibre: els més importants**

Beck cataloga els patrons que apareixen durant els exemples. Els essencials:

* **Test List (Lista de Tests)** — abans d'escollir quin test escriure, escriu una llista de tots els tests que creus que caldran. Seqüenciar els tests correctament és una habilitat: vols escollir tests que et duguin ràpidament als punts salients del disseny.  
* **Red Bar Patterns** — tècniques per quan el test falla i no saps com avançar. Beck suggereix retrocedir a un test més senzill si el pas és massa gran.  
* **Green Bar Patterns** — les tres estratègies de la fase verda: Fake It, Obvious Implementation i Triangulation.  
* **Testing Patterns** — estratègies per estructurar els tests: Child Test (descompondre un test gran en tests més petits), Mock Object (substituir dependències costoses), Self Shunt (fer que l'objecte sota test sigui el seu propi mock).  
* **Refactoring Patterns** — refactoritzacions que apareixen naturalment durant TDD: Reconcile Differences (unificar dues implementacions similars), Isolate Change (separar el canvi que vols fer), Migrate Data (canviar la representació de les dades gradualment).

**La perspectiva de Beck sobre els tests: pragmatisme**

TDD té una visió pragmàtica del testing. En TDD, els tests son un mitjà per arribar a un fi, i l'fi és codi en el qual tenim gran confiança. Si el nostre coneixement de la implementació ens dona confiança fins i tot sense un test, llavors no escriurem aquell test.

Això és important: Beck no diu que cal testar cada línia de codi mecànicament. Els tests son el vehicle per arribar a codi de qualitat, no el destí en si.

**La connexió amb el disseny: TDD com a eina de disseny**

Un dels insights més profunds del llibre: TDD no és únicament una tècnica de testing, és una tècnica per a totes les activitats del desenvolupament. TDD guia el disseny.

Quan escrius un test primer, estàs prenent decisions de disseny: quina és l'API pública de la classe? Quins inputs accepta? Quins outputs retorna? El test és la primera crida al codi que estàs a punt d'escriure, i et força a pensar en el disseny des del punt de vista del consumidor.

**El diagrama d'influència de Beck:**

| Menys defectes → Menys depuració → Més temps per programar      ↑                                       |      |                                       ↓Tests que passen → Confiança → Menys por → Millor comunicació      ↑                                       |      |                                       ↓  Refactor    ←────────────── Codi net ←──────┘ |
| :---- |

**Les preguntes que respon el llibre**

El llibre respon explícitament preguntes com: Quin gran haurien de ser els passos? Quèno has de testar? Com saps si tens bons tests? Quan hauries d'eliminar tests? Com es relaciona TDD amb els patrons? Per quèfunciona TDD?

La pregunta central sobre la mida dels passos: l'opció és individual i canvia moment a moment. L'important és que l'opció és conscient. Si saps exactament quècal escriure, escriu la implementació òbvia directament. Si no estàs segur, fes passos petits.

**El llegat del llibre: per què és un clàssic**

Kent Beck consistently challenges software engineering dogma. El TDD By Example va canviar la manera com molts developers pensen sobre el seu ofici per tres raons principals: va demostrar que escriure tests primer accelera el desenvolupament en lloc de ralentitzar-lo, va mostrar que els tests no son una xarxa de seguretat afegida al final sinó el motor del disseny, i va establir el cicle Red-Green-Refactor com el ritme natural del bon desenvolupament de software.

La cita que millor captura el seu missatge: "Partly this is because this is how I learn — I find an expert to act like, then gradually figure out what is really going on. I'm certainly not looking for the rules to be followed mechanically." — Kent Beck. TDD no és un conjunt de regles mecàniques: és una manera de pensar.

