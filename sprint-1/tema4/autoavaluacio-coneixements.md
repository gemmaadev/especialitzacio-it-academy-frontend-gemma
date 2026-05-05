## **Qüestionari d'autoavaluació**

1. **Quina diferència hi ha entre var, let i const? Quan hauries d'utilitzar cadascun?**

**var** és l'antic i té problemes perquè no respecta els blocs de codi. 

**let** s'utilitza quan la variable canviarà de valor, com un comptador. 

**const** s'utilitza quan el valor no canviarà. Jo sempre començo amb const i només canvio a let si veig que necessito reassignar-la.

2. **Com funcionen les funcions fletxa i com gestionen el context de this?**

Les funcions fletxa són una manera més curta d'escriure funcions amb `=>`. 

La seva principal diferència és que no tenen el seu propi `this`, sinó que agafen el `this` del lloc on es defineixen. 

Això és súper útil en callbacks perquè no perds la referència a l'objecte original.

3. **Quins avantatges ofereixen els literals de plantilla en comparació amb la concatenació de cadenes?**

Els template literals amb les backticks `` ` `` permeten posar variables directament dins de la cadena amb `${variable}` sense haver de tallar-la amb `+`. 

També pots escriure text en múltiples línies sense `\n` i fer operacions dins com `${preu * 1.21}`. És molt més net i llegible.

4. **Què és la desestructuració i com pots utilitzar-la per simplificar el teu codi?**

La desestructuració et permet extreure valors d'objectes o arrays directament a variables. 

En lloc d'escriure `const nom = usuari.nom`, pots fer `const { nom, edat } = usuari` i ja tens les dues variables. 

Amb arrays funciona igual: `const [primer, segon] = array`. 

Estalvies moltes línies de codi.

5. **Quines són algunes de les noves APIs introduïdes en ES6 i versions posteriors? Pots donar exemples pràctics d'ús?**

## **APIs de String**

`includes()` \- Comprova si una cadena conté una subcadena.  
`startsWith()` / `endsWith()` \- Comprova si comença o acaba amb una subcadena.  
`repeat()` \- Repeteix una cadena N vegades.  
`padStart()` / `padEnd()` \- Omple una cadena fins a una longitud amb caràcters.

**APIs d'Array**

`find()` \- Retorna el primer element que compleix la condició.  
`findIndex()` \- Retorna l'índex del primer element que compleix la condició.  
`includes()` \- Comprova si un array conté un element.  
`fill()` \- Omple un array amb un valor.  
`Array.from()` \- Converteix objectes array-like en arrays reals.

**APIs d'Object**

`Object.assign()` \- Copia propietats d'objectes (shallow copy).  
`Object.keys()` \- Retorna un array amb les claus.  
`Object.values()` \- Retorna un array amb els valors.  
`Object.entries()` \- Retorna un array de parelles \[clau, valor\].

**Col·leccions noves**

`Map` \- Col·lecció de clau-valor on les claus poden ser de qualsevol tipus.  
`Set` \- Col·lecció de valors únics (sense duplicats).  
`Symbol` \- Tipus primitiu per crear identificadors únics.

**APIs de Promise**

`Promise.any()` \- Retorna la primera que s'accepti.

6. **Què són les promeses i com es relacionen amb async/await?**

Les promeses representen una operació que es completarà en el futur. Tenen tres estats: pending, fulfilled i rejected. 

S'utilitzen amb `.then()` per quan va bé i `.catch()` per errors. 

async/await és una manera més neta d'utilitzar promeses: poses `async` davant de la funció i `await` davant de la promesa per esperar el resultat. 

És com si fossin promeses però amb sintaxi més senzilla, i pots usar try/catch per gestionar errors.

7. **Pots explicar la diferència entre iteradors i generadors? Quan utilitzaries cadascun?**

Els iteradors són objectes que tenen un mètode `next()` que retorna el següent valor d'una seqüència. Els iteradors els utilitzo quan vull controlar exactament com es recorre un objecte personalitzat.

Els generadors són funcions especials (amb `function*`) que poden pausar-se amb `yield` i reprendre després. Els generadors són més fàcils de crear i útils per generar valors "a demanda", com seqüències infinites o Fibonacci. 

# **Autoavaluació S1 Tema 4**

- [x] ~~Conec la diferència entre var, let i const i quan tinc que utilitzar cadascun.~~  
- [x] ~~Conec com funcionen les funcions fletxa i com gestionen el context de this.~~  
- [x] ~~Conec les avantatges dels literals de plantilla en comparació amb la concatenació de cadenes.~~  
- [x] ~~Conec la desestructuració i com pots utilitzar-la per simplificar el codi.~~  
- [x] ~~Conec les noves APIs introduïdes en ES6 i versions posteriors.~~  
- [x] ~~Conec les promeses i com es relacionen amb async/await?.~~  
- [x] ~~Puc explicar la diferència entre iteradors i generadors i quan utilitzar cadascun.~~  
- [ ] Puc explicar les avantatges de la delegació d'esdeveniments sobre l'afegiment individual d'event listeners i...les desavantatges.  
- [ ] Puc separar la lògica de negoci de la renderització.  
- [ ] Puc explicar què són les factory functions i com contribueixin a l'implementació.

