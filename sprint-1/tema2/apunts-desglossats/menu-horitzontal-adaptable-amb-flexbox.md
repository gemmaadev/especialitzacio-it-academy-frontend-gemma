## **Menú horitzontal adaptable amb flexbox**

**Per què Flexbox per a menús?**

Flexbox és perfecte per a menús de navegació perquè els elements s'organitzen en una sola dimensió (una fila o una columna) i es poden reorientar fàcilment amb una sola propietat CSS. Un menú horitzontal en desktop es converteix en vertical en mòbil canviant únicament `flex-direction`.

**L'HTML: estructura semàntica**

Primer, l'estructura HTML correcta. Un menú de navegació ha d'usar `<nav>` i `<ul>`:

| \<nav\>  \<ul class\="menu"\>    \<li\>\<a href\="/inici"\>Inici\</a\>\</li\>    \<li\>\<a href\="/sobre"\>Sobre nosaltres\</a\>\</li\>    \<li\>\<a href\="/serveis"\>Serveis\</a\>\</li\>    \<li\>\<a href\="/blog"\>Blog\</a\>\</li\>    \<li\>\<a href\="/contacte"\>Contacte\</a\>\</li\>  \</ul\>\</nav\> |
| :---- |

**El CSS: menú horitzontal en desktop**

| /\* Reset bàsic de la llista \*/.menu {  list-style: none;  margin: 0;  padding: 0;  /\* Flexbox: tots els elements en fila \*/  display: flex;  flex-direction: row;       /\* horitzontal (valor per defecte) \*/  align-items: center;       /\* centrats verticalment \*/  gap: 24px;                 /\* espai entre elements \*/  /\* Estils visuals \*/  background-color: \#1e293b;  padding: 16px 24px;}.menu a {  color: white;  text-decoration: none;  font-size: 1rem;  padding: 8px 12px;  border-radius: 6px;  transition: background-color 0.2s;}.menu a:hover {  background-color: \#3b82f6;} |
| :---- |

**La Media Query: convertir en vertical en mòbil**

| /\* En pantalles petites (mòbil) \*/@media (max-width: 768px) {  .menu {    flex-direction: column;   /\* canviem a vertical \*/    align-items: flex-start;  /\* alineat a l'esquerra \*/    gap: 8px;                 /\* menys espai en vertical \*/    padding: 16px;  }  .menu a {    display: block;           /\* ocupa tota l'amplada \*/    width: 100%;  }} |
| :---- |

Amb aquest canvi, `flex-direction: column` és l'única propietat que transforma el menú de horitzontal a vertical. Tot la resta (l'espaiat, l'alineació) s'adapta automàticament.

**`gap`: per què és millor que els marges manuals**

A diferència dels marges que s'apliquen als elements individuals, la propietat `gap` s'aplica directament al contenidor (`display: flex` o `display: grid`) i només afecta l'espai entre els seus fills.

El problema dels marges manuals es veu clarament en un exemple:

| /\* ❌ Manera antiga: marges manuals \*/.menu li {  margin-right: 24px;   /\* funciona... però \*/}/\* El problema: l'últim element també té marge a la dreta \*//\* i el primer element pot tenir marge a l'esquerra indesitjat \*//\* Solució hackish habitual: \*/.menu li:last-child {  margin-right: 0;} |
| :---- |

Quan usem marges per crear espai entre elements, si no anem amb compte, podem acabar amb espai extra abans i després del grup d'elements. Solucionar-ho normalment requereix afegir marges negatius o recórrer a pseudo-selectors per eliminar el marge d'elements específics. Però la propietat `gap` en els mètodes de layout moderns significa que només tens espai entre elements. L'espai extra a l'inici i al final mai és un problema.

| /\* ✅ Manera moderna: gap \*/.menu {  display: flex;  gap: 24px;   /\* espai ENTRE elements, mai a les vores \*/}/\* No cal cap pseudo-selector ni marge negatiu \*/ |
| :---- |

**L'altra gran avantatge de `gap`: s'adapta a `flex-direction`**

`gap` automàticament adapta el seu espaiat depenent de la direcció del flex. Quan `flex-direction` és `row`, el gap s'aplica horitzontalment entre elements. Quan canvies a `flex-direction: column`, el gap s'aplica verticalment entre elements.

Amb marges manuals, hauries de canviar `margin-right` per `margin-bottom` quan passes a vertical. Amb `gap`, simplement canvies `flex-direction` i l'espaiat s'adapta sol:

| /\* Desktop: gap horitzontal automàticament \*/.menu {  display: flex;  flex-direction: row;  gap: 24px;    /\* → espai horitzontal entre elements \*/}/\* Mòbil: gap vertical automàticament, sense tocar gap \*/@media (max-width: 768px) {  .menu {    flex-direction: column;    gap: 8px;   /\* → ara el gap és vertical, sense canviar res més \*/  }} |
| :---- |

**La sintaxi completa de `gap`**

`gap` és una propietat shorthand que combina dos valors: `row-gap` (espai entre files) i `column-gap` (espai entre columnes). Si s'inclou un sol valor, s'usa per a les dues dimensions.

| gap: 24px;           /\* igual en totes direccions \*/gap: 16px 24px;      /\* row-gap: 16px, column-gap: 24px \*/row-gap: 16px;       /\* només files \*/column-gap: 24px;    /\* només columnes \*/ |
| :---- |

**El codi final complet**

| \<nav\>  \<ul class\="menu"\>    \<li\>\<a href\="/inici"\>Inici\</a\>\</li\>    \<li\>\<a href\="/sobre"\>Sobre nosaltres\</a\>\</li\>    \<li\>\<a href\="/serveis"\>Serveis\</a\>\</li\>    \<li\>\<a href\="/contacte"\>Contacte\</a\>\</li\>  \</ul\>\</nav\>/\* Base: desktop \*/.menu {  list-style: none;  margin: 0;  padding: 16px 24px;  display: flex;  flex-direction: row;  align-items: center;  gap: 24px;  background-color: \#1e293b;}.menu a {  color: white;  text-decoration: none;  padding: 8px 12px;  border-radius: 6px;}.menu a:hover {  background-color: \#3b82f6;}/\* Mòbil \*/@media (max-width: 768px) {  .menu {    flex-direction: column;    align-items: stretch;    gap: 8px;    padding: 16px;  }} |
| :---- |

**Resum: `gap` vs. `margin` per a espais entre elements**

|  | `margin` manual | `gap` |
| ----- | ----- | ----- |
| S'aplica a | Cada element fill | El contenidor |
| Espai a les vores | Sí (cal corregir-ho) | No (només entre elements) |
| Canvi de direcció | Cal canviar la propietat | S'adapta automàticament |
| Codi necessari | Més línies \+ pseudo-selectors | Una sola línia |
| Llegibilitat | Baixa | Alta |
| Manteniment | Difícil | Fàcil |

