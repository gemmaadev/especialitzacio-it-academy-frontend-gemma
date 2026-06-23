**Per què el model basat en components és eficaç per al desenvolupament d'interfícies?**

**Composition vs Inheritance**   
[https://react.dev/composition-vs-inheritance](https://react.dev/composition-vs-inheritance)  
Guia oficial de React sobre compondre components en lloc d’usar herència. 

**Pure Functions in React**   
[http://dmitripavlutin.com/react-pure-functional-components/](http://dmitripavlutin.com/react-pure-functional-components/)  
Article sobre components funcionals purs i bones pràctiques a React.

## **1\. Definició**  

Un **component** en React és una funció (o classe) de JavaScript que rep dades d'entrada (anomenades *props*) i retorna una descripció de com s'ha de veure una part de la interfície. El **model basat en components** consisteix en construir tota una aplicació trencant-la en peces petites, independents i reutilitzables, en lloc de construir-la com un bloc monolític de codi.

Pensa-ho com peces de Lego: en lloc de tallar i modelar una figura sencera d'una peça, la construeixes ajuntant peces petites que ja saps com funcionen.

| // Un component és, literalment, això: una funció que retorna JSXfunction Button({ text, onClick }) {  return \<button onClick={onClick}\>{text}\</button\>;} |
| :---- |

## **2\. Per què existeix / quin problema resol**

Abans de l'arquitectura basada en components, les interfícies web es construïen sovint com una barreja de HTML, CSS i JavaScript escampats per tot el projecte, amb poca relació estructural entre "què es veu" i "com es comporta". 

Això generava dos problemes greus a mesura que l'aplicació creixia:

* **Codi duplicat**: el mateix botó o formulari es reescrivia diverses vegades en diferents pàgines  
* **Manteniment fràgil**: canviar una part de la interfície podia trencar-ne una altra sense que fos evident per què

React soluciona això proposant que **cada peça de la interfície sigui responsable només d'ella mateixa** (la seva lògica, el seu estat i la seva representació visual), de manera que els canvis queden localitzats i el codi es pugui reutilitzar sense còpia-i-enganxa.

## **3\. Com funciona per dins**

Una aplicació React no és més que un **arbre de components**: un component arrel (normalment `App`) que conté altres components a dins, que al seu torn poden contenir-ne més. 

La informació flueix de dalt a baix mitjançant *props*, i cada component decideix com renderitzar-se basant-se en les dades que rep i en el seu propi estat intern.

| function App() {  return (    \<div\>      \<Header /\>      \<ProductList products={products} /\>      \<Footer /\>    \</div\>  );}function ProductList({ products }) {  return (    \<ul\>      {products.map(p \=\> \<ProductCard key={p.id} product={p} /\>)}    \</ul\>  );}function ProductCard({ product }) {  return (    \<li\>      \<h3\>{product.name}\</h3\>      \<p\>{product.price} €\</p\>    \</li\>  );} |
| :---- |

Aquí veus tres nivells: `App` → `ProductList` → `ProductCard`. 

Cada component té una única responsabilitat clara, i `ProductCard` es pot reutilitzar tantes vegades com calgui sense escriure'l de nou.

## **4\. Avantatges i inconvenients**

**Avantatges:**

* **Reusabilitat**: un cop fet un component, l'uses arreu sense duplicar codi  
* **Modularitat**: cada component s'encarrega d'una sola cosa, fent l'app més estructurada  
* **Escalabilitat**: aplicacions grans s'aconsegueixen ensamblant peces petites, no escrivint-ho tot de cop  
* **Mantenibilitat**: arreglar un error queda localitzat al component afectat, sense risc d'efectes col·laterals incontrolats  
* **Col·laboració**: diferents persones de l'equip poden treballar en components diferents en paral·lel, sense xocar-se

**Inconvenients (i és important conèixer-los):**

* **Gestió de l'estat**: quan molts components necessiten compartir dades, coordinar-ho es pot complicar (per això existeixen Context, Redux, Zustand...)  
* **Comunicació entre components**: passar dades de pares a fills i viceversa pot generar sobrecàrrega si l'arbre és molt profund (el conegut "prop drilling")  
* **Excés de fragmentació**: si divideixes massa, pots acabar amb desenes de components minúsculs que dificulten seguir el flux de l'aplicació

## **5\. Errors comuns / mals entesos**

* **Pensar que "més components petits" és sempre millor.** No ho és: cal trobar l'equilibri. Un component que només té 2 línies de JSX i mai es reutilitza potser no calia separar-lo.  
* **Confondre component amb element.** Un component és la "recepta" (la funció); un element és el resultat concret de cridar-la amb unes props determinades.  
* **No diferenciar entre components de presentació i de contenidor.** És habitual al principi barrejar lògica de negoci (peticions a APIs, gestió d'estat complex) amb lògica purament visual dins del mateix component, fent-lo difícil de testejar i reutilitzar.

## 

## **6\. Connexió amb altres conceptes del temari**

Aquest principi és la base sobre la qual s'aixequen els altres temes que veuràs:

* El **DOM virtual** existeix precisament perquè, en tenir l'app dividida en components que es re-renderitzen sovint, calia una manera eficient d'actualitzar només el que ha canviat  
* El **JSX** és el llenguatge que uses per descriure què retorna cada component  
* Els **Hooks** (`useState`, `useEffect`...) són l'eina que permet a un component tenir memòria pròpia (estat) i reaccionar a canvis, sense necessitat de classes  
* **Composition vs Inheritance**: React reforça explícitament que la manera correcta de reutilitzar lògica entre components és *component·les* (ficar-ne uns dins d'altres), no fer-les herència com en programació orientada a objectes clàssica

## **7\. Preguntes de repàs**

**1\. Quina diferència hi ha entre un "component" i un "element" en React?**

Un component és la *definició* — la funció que descriu com construir una part de la interfície. 

Un element és el *resultat concret* de cridar aquella funció amb unes props determinades. 

Per exemple, `ProductCard` és el component; `<ProductCard product={cafe} />` és un element: una instància concreta amb dades específiques.

**2\. Per què dividir una interfície en components petits millora la mantenibilitat?**

Perquè els canvis queden localitzats. Si hi ha un error al botó de "Comprar", només has de tocar el component `Button` o `BuyButton`, sense risc de trencar res en altres parts de l'app que no tenen relació amb aquell element. 

Com que cada component és responsable només d'ell mateix, arreglar-ne un no genera efectes col·laterals inesperats a la resta del codi.

**3\. Quin és el risc de fragmentar excessivament una aplicació en massa components?**

Es perd la visió de conjunt: si tens 50 components diminuts (un per cada `<span>` o `<div>` amb una mica d'estil), seguir el flux de dades i entendre com es relaciona tot esdevé més difícil que si haguessis agrupat lògica relacionada en menys peces. 

També augmenta el "soroll" de fitxers i imports, i pot complicar la comunicació entre components (més nivells \= més *prop drilling*).

**4\. Com flueix la informació entre components en un arbre de React?**

De dalt a baix (*top-down*), mitjançant *props*. Un component pare passa dades als seus fills com a paràmetres; el fill no pot modificar directament les dades del pare, només pot llegir-les o cridar funcions que el pare li ha passat (per exemple, un `onClick`) per notificar-li que ha passat alguna cosa. 

Aquest flux unidireccional és el que fa l'aplicació predictible: sempre saps d'on ve cada dada.

**5\. Per què React recomana composició en lloc d'herència per reutilitzar codi entre components?**

Perquè la composició (ficar components dins d'altres, com `<Card><Button /></Card>`) és més flexible i s'adapta millor a la naturalesa de la UI, que és essencialment jeràrquica (com el propi HTML: un `<div>` conté un `<p>`, que conté un `<a>`). 

L'herència clàssica de la programació orientada a objectes crea jerarquies rígides difícils de modificar a mesura que l'app creix; la composició permet combinar peces lliurement sense lligar-les a una cadena fixa de "pares i fills" de classes.

