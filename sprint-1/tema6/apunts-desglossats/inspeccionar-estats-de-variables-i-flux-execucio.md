## **Inspeccionar estats de variables i flux d'execució en temps real**

**Les cinc maneres d'inspeccionar variables quan estàs pausat**

Quan l'execució es pausa en un breakpoint, DevTools et proporciona múltiples maneres simultànies d'observar l'estat del codi. No cal triar-ne una: pots usar-les totes alhora.

**Manera 1: Valors inline al codi**

Mentre estàs pausat en una línia de codi, DevTools mostra els valors de les variables inline directament al costat de les seves declaracions al codi editor. En un exemple concret, DevTools pausa a la línia 32 i els valors d'`addend1`, `addend2` i `sum` es mostren wrappats en cometes, cosa que indica que són strings. Aquesta és una bona hipòtesi per explicar la causa del bug.

No cal fer cap acció: simplement pausar l'execució i mirar el codi ja et mostra els valors de cada variable directament al costat de on es declaren.

| function calcularTotal(preu, iva) {  // Quan s'executa i es pausa aquí, DevTools mostra:  const base \= preu \* 0.9;      // base: 90    ← valor inline  const impost \= base \* iva;    // impost: 18.9 ← valor inline  return base \+ impost;         // ...} |
| :---- |

**Manera 2: Hover sobre qualsevol variable**

Mentre l'execució és pausada, pots posar el cursor sobre el nom d'una classe o funció per previsualitzar les seves propietats.

Posa el cursor sobre qualsevol variable per veure el seu valor actual.

És la manera més ràpida: simplement poses el ratolí sobre qualsevol nom de variable al codi i apareix un tooltip amb el valor actual. Si és un objecte, es mostra expandible per veure les seves propietats. Especialment útil per inspeccionar objectes complexos sense haver d'anar al panell Scope.

**Manera 3: Panell Scope**

El panell Scope mostra les variables locals i globals definides en aquell punt de l'execució, juntament amb el valor de cada variable. També mostra les variables de closure, quan n'hi ha.

El panell Scope llista les variables per nivell: Local (variables declarades en la funció actual), Closure (variables de funcions envoltants capturades pel closure), Global (variables en el scope global, per exemple `window`).

| Scope panel (quan pausat dins de calcularTotal):  ▼ Local    base: 90    impost: 18.9    iva: 0.21    preu: 100  ▶ Closure  ▶ Global |
| :---- |

**Editar variables directament des del Scope:** Per modificar un valor: localitza la variable a la secció Local del Scope. Posa el cursor sobre el valor (per exemple, `0.1`). Apareix una icona de llapis. Clica el valor, edita'l (per exemple, canvia `0.1` a `0.2` per a un descompte del 20%), i prem Enter. El valor modificat impacta directament en el resultat sense necessitat de canviar el codi.

Això és molt potent: pots provar com es comporta el codi amb valors alternatius sense tocar ni una línia del codi font.

**Manera 4: Console en temps real**

La Console és activa mentre l'execució és pausada. Tens accés complet a totes les variables en scope:

| // Mentre estàs pausat dins d'una funció amb \`usuari\` en scope:\> usuari{ id: 42, nom: 'Anna', rol: 'admin' }\> usuari.rol \=== 'admin'true\> JSON.stringify(usuari, null, 2)'{\\n  "id": 42,\\n  "nom": "Anna",\\n...'// Provar hipòtesis sense reiniciar\> productes.filter(p \=\> p.preu \> 100)\[{...}, {...}\]// Mutar valors per forçar una branca diferent\> usuari.rol \= 'viewer''viewer'// Prem Resume → el codi executarà la branca de 'viewer' |
| :---- |

Pots avaluar l'expressió `parseInt(addend1) + parseInt(addend2)` a la Console mentre estàs pausat perquè `addend1` i `addend2` estan en scope. DevTools avalua l'expressió i imprimeix el resultat, que és el que esperaves. Ja has trobat una solució per al bug.

**Manera 5: Live Expressions**

A la Console, clica la icona d'ull (Create live expression). Introdueix noms de variables o expressions per monitoritzar-les en temps real. S'actualitzen automàticament mentre passes pel codi.

Les Live Expressions són la versió "sempre activa" de les Watch Expressions. S'actualitzen contínuament, fins i tot sense estar pausat en un breakpoint. Perfectes per monitoritzar `document.querySelectorAll('.active').length` o `window.scrollY` mentre interactues amb la pàgina.

**Inspeccionar el flux d'execució**

A més d'inspeccionar variables, pots seguir exactament quin camí pren l'execució.

### **Seguir el flux pas a pas**

Podeu inspeccionar el flux real del programa amb l'execució pas a pas. Un cop pausat en un breakpoint, premeu el botó "Step over" per moure l'execució a la línia següent. Si comproveu el valor de `calcType` al panell Scope, podeu veure que és "type-substract". A partir d'aquí podeu predir que l'execució mourà al `case "type-substract"`. 

Premeu "Step over" una vegada més i, com s'esperava, l'execució es mou a aquell case. D'aquesta manera podeu confirmar si el flux de control funciona com s'espera mirant els valors de les variables.

El truc del "Continue to here": clic dret sobre qualsevol línia → "Continue to here". L'execució reprèn i es pausa en aquella línia sense necessitat de posar un breakpoint. Molt útil per saltar sobre seccions que no t'interessen.

**Restart Frame: reiniciar una funció sense recarregar**

Per observar el comportament d'una funció i tornar a executar-la sense haver de reiniciar tot el flux de debugging, pots reiniciar l'execució d'una sola funció quan aquella funció és pausada. En altres paraules, pots reiniciar el frame de la funció a la pila de crides. Al panell Call Stack, clic dret sobre una funció i selecciona "Restart frame".

Això és ideal quan has vist el bug però vols revisar la funció de nou amb nous ulls, sense recarregar la pàgina sencera.

**Live Edit: corregir codi mentre debugues**

Quan debugues un bug, sovint vols provar alguns canvis al teu JavaScript. No necessites fer els canvis en un editor extern i tornar a carregar la pàgina. Pots editar el teu script directament al DevTools UI. Obre el fitxer al panell Editor del Sources. Fes els canvis. Prem Command+S (Mac) o Ctrl+S (Windows). DevTools injecta el fitxer JavaScript complet al motor JavaScript de Chrome.

**Cas pràctic complet: "el total del carret és incorrecte"**

1\. Posa un breakpoint a la funció calcularTotal()  
         ↓  
2\. Clica "Afegir al carret" a la pàgina  
         ↓  
3\. L'execució es pausa  
         ↓  
4\. Inspecciona inline: veus "preu: '99'" (amb cometes → és un string\!)  
         ↓  
5\. Comprova al Scope panel:  
   Local:  
     producte: {nom: "Portàtil", preu: "99"}  ← string, no número\!  
         ↓  
6\. A la Console proves la hipòtesi:  
   \> typeof producte.preu  
   "string"  
   \> parseInt(producte.preu) \+ 10  
   109  ← funciona correctament  
         ↓  
7\. Watch Expression: afegeix \`typeof producte.preu\`  
   → confirma "string" en cada step  
         ↓  
8\. Trobes l'origen: l'API retorna el preu com a string  
   → Solució: parseFloat(producte.preu) a la funció  
         ↓  
9\. Live Edit: canvies la línia directament a DevTools  
   → Step Through: verifiques que el total és ara correcte  
         ↓  
10\. Apliques el fix al codi font real

**Resum: les eines per a cada situació**

| Necessito... | Eina |
| ----- | ----- |
| Veure el valor d'una variable ràpidament | Hover sobre la variable al codi |
| Veure totes les variables en scope | Panell Scope |
| Monitoritzar una expressió mentre avanço | Watch Expression |
| Monitoritzar en temps real sense pausar | Live Expression a la Console |
| Provar una hipòtesi sense canviar el codi | Console mentre pausat |
| Canviar un valor per provar una branca | Doble clic al Scope o Console |
| Seguir el camí de l'execució | Step Over \+ mirar el codi resaltat |
| Tornar a executar una funció | Restart Frame al Call Stack |
| Provar un fix sense sortir de DevTools | Live Edit \+ Ctrl+S |

