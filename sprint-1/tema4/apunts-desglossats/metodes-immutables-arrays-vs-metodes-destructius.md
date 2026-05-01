## **Mètodes immutables d'arrays vs. Mètodes destructius**

**El problema fonamental: els arrays es passen per referència**

Abans d'entendre per què els mètodes immutables són millors, cal entendre per què la mutació és perillosa. En JavaScript, els arrays i objectes **no es copien quan s'assignen**: s'assigna la referència a la mateixa posició de memòria.

Si passes un array a una funció o el comparteixes entre components, les modificacions en un lloc afecten totes les referències a aquell array. La mutació d'arrays pot causar comportament inesperat en les teves aplicacions.

| // El problema de la referènciaconst original \= \['Anna', 'Gemma'\];const copia \= original;     // ← NO és una còpia, apunta al mateix lloccopia.push('Maria');console.log(original);       // \['Anna', 'Gema', 'Maria'\] ← mutat sense voler\!console.log(original \=== copia);  // true \-- és el mateix array |
| :---- |

**Mètodes destructius: modifiquen l'array original**

Els arrays en JavaScript tenen diversos mètodes que muten l'array original: `push`, `pop`, `splice`, `shift`, `unshift`, `reverse` i `sort`. Usar-los sol causar efectes secundaris i bugs difícils de rastrejar.

| const productes \= \['Portàtil', 'Ratolí', 'Teclat'\];// push: afegeix al final (modifica l'original)productes.push('Monitor');console.log(productes);  // \['Portàtil', 'Ratolí', 'Teclat', 'Monitor'\]// splice: elimina o substitueix elements (modifica l'original)productes.splice(1, 1);  // elimina 1 element des de l'índex 1console.log(productes);  // \['Portàtil', 'Teclat', 'Monitor'\]// sort: ordena (modifica l'original\!)const nombres \= \[3, 1, 4, 1, 5\];const ordenats \= nombres.sort();console.log(nombres \=== ordenats);  // true ← el sort MUTA l'original |
| :---- |

**`map()`: transformar sense destruir**

El mètode `map()` crea un nou array poblat amb els resultats de cridar la funció proporcionada sobre cada element de l'array. Deixa l'array original intacte.

| const preus \= \[10, 20, 30, 40\];// ❌ Manera destructivaconst preusIVA \= preus;for (let i \= 0; i \< preusIVA.length; i++) {  preusIVA\[i\] \= preusIVA\[i\] \* 1.21;  // muta l'original}// ✅ Manera immutable amb mapconst preusIVA \= preus.map(preu \=\> preu \* 1.21);console.log(preus);      // \[10, 20, 30, 40\]     ← intacteconsole.log(preusIVA);   // \[12.1, 24.2, 36.3, 48.4\]// Exemple real: actualitzar un camp d'objectesconst usuaris \= \[  { id: 1, nom: 'Anna', actiu: false },  { id: 2, nom: 'Gema', actiu: false },\];// Activar l'usuari amb id 1const usuarisActualitzats \= usuaris.map(usuari \=\>  usuari.id \=== 1    ? { ...usuari, actiu: true }  // nou objecte amb spread    : usuari);console.log(usuaris\[0\].actiu);           // false ← original intacteconsole.log(usuarisActualitzats\[0\].actiu); // true |
| :---- |

**`filter()`: eliminar sense destruir**

`filter()` crea un nou array amb tots els elements que passen el test implementat per la funció proporcionada. Deixa l'array original intacte.

| const tasques \= \[  { id: 1, text: 'Aprendre JS', feta: true },  { id: 2, text: 'Fer exercici', feta: false },  { id: 3, text: 'Llegir', feta: true },\];// ✅ Filtrar les tasques no fetesconst pendents \= tasques.filter(tasca \=\> \!tasca.feta);// \[{ id: 2, text: 'Fer exercici', feta: false }\]// ✅ Eliminar un element per id (alternatiu a splice)const eliminaId \= 2;const senseSegona \= tasques.filter(tasca \=\> tasca.id \!== eliminaId);// \[{ id: 1... }, { id: 3... }\]console.log(tasques.length);      // 3 ← original intacteconsole.log(senseSegona.length);  // 2 |
| :---- |

**`reduce()`: acumular qualsevol resultat**

`reduce()` és el mètode més potent i flexible: pot transformar un array en qualsevol cosa: un número, un objecte, un altre array.

| const comandes \= \[  { producte: 'Portàtil', preu: 999, quantitat: 1 },  { producte: 'Ratolí', preu: 29, quantitat: 2 },  { producte: 'Teclat', preu: 79, quantitat: 1 },\];// Sumar el total de la comandaconst total \= comandes.reduce((acumulador, comanda) \=\> {  return acumulador \+ (comanda.preu \* comanda.quantitat);}, 0);  // ← 0 és el valor inicialconsole.log(total);  // 1136// Agrupar per categoriaconst notes \= \['React', 'JS', 'CSS', 'JS', 'React', 'HTML'\];const comptatge \= notes.reduce((acc, nota) \=\> {  acc\[nota\] \= (acc\[nota\] || 0) \+ 1;  return acc;}, {});console.log(comptatge);  // { React: 2, JS: 2, CSS: 1, HTML: 1 } |
| :---- |

**Spread operator `...`: còpies i combinacions**

L'operador spread proporciona una sintaxi neta per a operacions comunes d'array. L'spread fa una còpia superficial de l'array esparramant-lo en un nou context.

| const original \= \['Anna', 'Gema'\];// ✅ Afegir element al final (alternativa a push)const ambMaria \= \[...original, 'Maria'\];console.log(original);   // \['Anna', 'Gema'\] ← intacteconsole.log(ambMaria);   // \['Anna', 'Gema', 'Maria'\]// ✅ Afegir element al principi (alternativa a unshift)const ambPrimer \= \['Primera', ...original\];// ✅ Combinar arrays (alternativa a concat)const equip1 \= \['Anna', 'Gema'\];const equip2 \= \['Marc', 'Pau'\];const equip \= \[...equip1, ...equip2\];// ✅ Copiar un array (shallow copy)const copia \= \[...original\];console.log(original \=== copia);  // false ← són arrays diferents// ✅ Sort immutable: copia primer, ordena la còpiaconst nombres \= \[3, 1, 4, 1, 5\];const ordenats \= \[...nombres\].sort((a, b) \=\> a \- b);console.log(nombres);   // \[3, 1, 4, 1, 5\] ← intacteconsole.log(ordenats);  // \[1, 1, 3, 4, 5\] |
| :---- |

**Encadenar mètodes: el poder real**

Els mètodes no destructius es poden encadenar directament perquè cada un retorna un nou array.

| const productes \= \[  { nom: 'Portàtil', preu: 1200, enStock: true },  { nom: 'Telèfon', preu: 800, enStock: false },  { nom: 'Tauleta', preu: 600, enStock: true },  { nom: 'Monitor', preu: 350, enStock: true },\];// Trobar els noms dels productes en stock per menys de 1000€const disponiblesAssequibles \= productes  .filter(p \=\> p.enStock)  .filter(p \=\> p.preu \< 1000)  .map(p \=\> p.nom)  .sort();console.log(disponiblesAssequibles);  // \['Monitor', 'Tauleta'\]// L'array original 'productes' no s'ha tocat |
| :---- |

**Per quin motiu importa en React i Redux**

Mutar arrays pot causar comportament inesperat en aplicacions React on les mutacions d'estat impedeixen que els components es re-renderitzin, o en Redux on l'estat ha de ser immutable.

En React, `setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo))` crea un nou array amb l'objecte actualitzat, mentre que `setTodos(todos.filter(todo => todo.id !== id))` filtra l'element sense mutar.

| // En React: per qué la immutabilitat és obligatòriafunction LlistaTasques() {  const \[tasques, setTasques\] \= useState(\[    { id: 1, text: 'Aprendre React', feta: false }  \]);  // ❌ MAL: React no detecta el canvi (mateixa referència)  const marcarFeta \= (id) \=\> {    const t \= tasques.find(t \=\> t.id \=== id);    t.feta \= true;          // muta directament    setTasques(tasques);    // mateixa referència → no re-renderitza\!  };  // ✅ BÉ: nou array → React detecta el canvi i re-renderitza  const marcarFeta \= (id) \=\> {    setTasques(tasques.map(t \=\>      t.id \=== id ? { ...t, feta: true } : t    ));  };  // ✅ BÉ: eliminar sense splice  const eliminar \= (id) \=\> {    setTasques(tasques.filter(t \=\> t.id \!== id));  };} |
| :---- |

**Taula: destructiu vs. immutable**

| Operació | Mètode destructiu | Alternativa immutable |
| ----- | ----- | ----- |
| Afegir al final | `push(elem)` | `[...arr, elem]` |
| Afegir al principi | `unshift(elem)` | `[elem, ...arr]` |
| Eliminar el darrer | `pop()` | `arr.slice(0, -1)` |
| Eliminar el primer | `shift()` | `arr.slice(1)` |
| Eliminar per índex | `splice(i, 1)` | `arr.filter((_, idx) => idx !== i)` |
| Substituir element | `splice(i, 1, nou)` | `arr.map((e, idx) => idx === i ? nou : e)` |
| Combinar arrays | `concat(arr2)` | `[...arr1, ...arr2]` |
| Ordenar | `sort()` | `[...arr].sort()` |
| Invertir | `reverse()` | `[...arr].reverse()` |
| Transformar | `for` \+ mutació | `map(fn)` |
| Filtrar | `for` \+ `splice` | `filter(fn)` |
| Acumular | `for` \+ variable | `reduce(fn, inicial)` |

