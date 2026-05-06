## **Per què TypeScript millora la qualitat del codi respecte a JavaScript pur**

**Què és TypeScript: el punt de partida**

TypeScript és un superset de JavaScript que afegeix tipat estàtic opcional i altres funcionalitats. Qualsevol codi JavaScript vàlid és codi TypeScript vàlid. Això significa dues coses fonamentals: pots migrar un projecte JavaScript existent de manera incremental sense reescriure-ho tot, i tot el que saps de JavaScript funciona directament a TypeScript.

TypeScript va ser creat per Microsoft per adreçar les dificultats de mantenir aplicacions grans escrites en JavaScript. Va ser dissenyat per identificar construccions que probablement causaran errors i proporcionar un mecanisme d'estructuració per a codebases grans.

El flux de treball: escrius TypeScript → el compilador `tsc` el transpila a JavaScript pur → el navegador executa el JavaScript resultant. TypeScript no existeix en temps d'execució: és únicament una capa de validació en temps de desenvolupament.

**El problema fonamental de JavaScript: el tipat dinàmic**

JavaScript és dinàmicament tipat: una variable pot contenir un string, un número, un objecte o qualsevol cosa, i pot canviar de tipus durant l'execució. Aquesta flexibilitat és útil per a projectes petits però es torna problemàtica a mesura que el projecte creix.

| // ❌ JavaScript: el problema de la caixa misteriosalet myVar \= 'Hola';myVar \= 42;           // JavaScript no diu resmyVar \= { nom: 'Anna' }; // tampocmyVar.toUpperCase();  // Error en execució\! Però únicament quan s'executa// ❌ Error clàssic de producciófunction calcularPreu(preu, quantitat) {  return preu \* quantitat;  // Si algú passa "5" en lloc de 5 → resultat incorrecte}calcularPreu("10", 3);  // → 30 (string × number \= ??? en JS ho "fa funcionar") |
| :---- |

Sense declaració explícita de tipus, `myVar` és una caixa misteriosa. El seu propòsit i contingut romanen ambigus sense un examen més profund i pistes de context.

**Benefici 1: Detecció d'errors en compilació, no en producció**

TypeScript afegeix tipus estàtics a la variable `age`, fent que el compilador indiqui immediatament que "Type 'string' is not assignable to type 'number'" — permetent corregir el problema abans que un usuari el trobi en execució.

| // ✅ TypeScript: l'error apareix mentre escrius, no quan un usuari clicafunction calcularPreu(preu: number, quantitat: number): number {  return preu \* quantitat;}calcularPreu("10", 3);// ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'.// L'error apareix IMMEDIATAMENT a l'editor, no en producció |
| :---- |

Atrapar bugs abans que arribin a producció és un avantatge enorme. La comprovació de tipus estàtica marca incompatibilitats de tipus durant la compilació, ajudant a evitar problemes amb variables undefined o estructures de dades inesperades. En codebases grans, els petits errors poden convertir-se en grans problemes, de manera que la detecció primerenca és clau.

**Benefici 2: Autocompletat intel·ligent i IntelliSense**

TypeScript proporciona eines de debugging molt bones com IntelliSense, oferint suggeriments en temps real mentre s'escriu el codi.

| // TypeScript sap exactament quines propietats té l'objecteinterface Usuari {  nom: string;  email: string;  edat: number;}const usuari: Usuari \= { nom: 'Anna', email: 'anna@e.com', edat: 25 };usuari.   // ← en escriure el punt, l'editor mostra: nom, email, edat          //   amb els seus tipus i documentació          //   No cal recordar les propietats ni anar a mirar la definició |
| :---- |

Les IDE realment cobren vida amb TypeScript. Funcionalitats com navegació de codi, autocompletat i refactorització es tornen més potents perquè l'editor coneix els tipus exactes amb els quals treballes. Això potencia la productivitat, especialment quan múltiples developers col·laboren i necessiten que les revisions de codi siguin eficients.

**Benefici 3: Codi auto-documentat**

Les anotacions de tipus fan que el teu codi sigui auto-documentat i més fàcil d'entendre. En JavaScript pur, quan una funció rep un paràmetre `data`, no saps quèés `data` sense llegir tot el codi. En TypeScript, la signatura de la funció ho explica tot:

| // ❌ JavaScript: quèés cada paràmetre? quèretorna?function processarComanda(usuari, productes, opcions) {  // Cal llegir tot el cos per entendre quèfa}// ✅ TypeScript: la signatura ho explica totfunction processarComanda(  usuari: Usuari,  productes: Producte\[\],  opcions: { prioritat: 'normal' | 'express'; notificar: boolean }): Promise\<Comanda\> {  // Qualsevol developer entén quèespera i quèretorna sense llegir el cos} |
| :---- |

**Benefici 4: Refactorització segura**

Els projectes grans sovint requereixen refactorització per millorar la qualitat i mantenibilitat. El sistema de tipus de TypeScript fa la refactorització més segura alertant als developers de problemes potencials quan canvien el codi. Això minimitza el risc de trencar funcionalitat existent.

| // Canvies el nom d'una propietat d'una interface:interface Producte {  // nom → titol (canvi de nom)  titol: string;  // ← canvies aquí  preu: number;}// TypeScript marca IMMEDIATAMENT tots els llocs del projecte// on s'usa "producte.nom" → ara has de canviar-los a "producte.titol"// Sense TypeScript: podries oblidar-ne algun i descobrir-ho en producció |
| :---- |

En JavaScript pur, un canvi de nom en un lloc no avisa dels altres llocs que en depenen. En TypeScript, el compilador et porta de la mà.

**Benefici 5: Col·laboració en equip**

En un entorn d'equip, el tipat estàtic de TypeScript pot fer la col·laboració més fàcil. Els tipus serveixen com a codi auto-documentat, fent més fàcil per als developers entendre quèfa una funció, quins arguments espera i quèretorna. Aquesta claredat pot reduir el temps d'onboarding de nous membres.

**El que TypeScript NO és**

TypeScript no és un llenguatge diferent de JavaScript: és JavaScript amb una capa de validació. No millora el rendiment en temps d'execució (el JavaScript generat és equivalent). No elimina tots els errors (errors de lògica, errors de xarxa i altres segueixen existint). I no és obligatori per a tots els projectes: per a scripts petits i prototips, la sobrecàrrega pot no valer la pena.

La flexibilitat de JavaScript pot accelerar el prototipat. TypeScript pot alentir inicialment en forçar comprovacions de tipus, però estalvia temps a llarg termini reduint errors en execució i millorant el suport d'eines. La petita sobrecàrrega durant el desenvolupament normalment val la pena per la confiança afegida en el codi.

**Quan val la pena adoptar TypeScript**

| Situació | TypeScript | JavaScript |
| ----- | ----- | ----- |
| **Projecte gran amb equip** | ✅ Molt recomanat | ⚠️ Difícil de mantenir |
| **Codebase a llarg termini** | ✅ Inverteix ara, estalvies després | ⚠️ Deute tècnic creixent |
| **Prototip o script petit** | ⚠️ Pot ser excessiu | ✅ Més àgil |
| **Biblioteca pública** | ✅ Els tipus ajuden els usuaris | ⚠️ Sense autocompletat |
| **Equip amb devs júniors** | ✅ El compilador guia | ⚠️ Errors silenciosos |

Airbnb ha migrat la seva codebase a TypeScript per aprofitar el tipat estàtic i millors eines, millorant l'experiència del developer i la qualitat del codi. Empreses com Microsoft, Google i Slack han adoptat TypeScript en projectes de gran escala precisament per la seguretat que aporta.

