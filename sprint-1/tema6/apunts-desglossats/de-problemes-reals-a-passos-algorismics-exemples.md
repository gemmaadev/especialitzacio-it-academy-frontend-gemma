## **De problemes reals a passos algorísmics: exemples pràctics**

**El procés de transformació: la recepta universal**

Al seu nucli, un algorisme és un procediment pas a pas per resoldre un problema. Pensa-hi com una recepta en un llibre de cuina. Igual que segueixes una recepta per fer un pastís, segueixes un algorisme per aconseguir un resultat específic.

La transformació d'un problema real en passos algorísmics sempre segueix la mateixa estructura: entendre el problema en paraules, identificar les entrades i les sortides esperades, definir els passos intermedis, i verificar que el resultat és correcte.

Els blocs de construcció essencials per abordar problemes de manera sistemàtica: dividir un problema gran en parts més petites i manejables és la pedra angular del pensament algorísmic. 

Reconèixer patrons recurrents permet reutilitzar solucions per a problemes similars. L'abstracció implica centrar-se en els aspectes més crítics d'un problema mentre s'ignoren els detalls irrellevants.

**Exemple 1: Buscar un contacte a l'agenda**

**Problema real:** "Necessito trobar el telèfon d'en Marc a l'agenda."

Sense algorisme: busques desordenadament fins que el trobes o et rendeixes. Amb algorisme:

Entrades: nom a buscar ("Marc"), llista de contactes  
Sortida: número de telèfon o missatge "no trobat"

Passos:  
1\. Comença pel primer contacte de la llista  
2\. Compara el nom del contacte actual amb "Marc"  
3\. Si coincideix → retorna el telèfon (FI)  
4\. Si no coincideix → passa al contacte següent  
5\. Si has arribat al final sense trobar-lo → "No trobat" (FI)

En JavaScript:

| function buscarContacte(contactes, nom) {  for (const contacte of contactes) {    if (contacte.nom \=== nom) {      return contacte.telefon;    }  }  return 'No trobat';} |
| :---- |

**Exemple 2: Calcular el preu d'un carret de compra**

**Problema real:** "Mostrar el total del carret aplicant descomptes i IVA."

Desglossat en subproblemes:

Entrades: llista de productes, percentatge de descompte, percentatge d'IVA  
Sortida: preu final

Passos:  
1\. Calcula el subtotal (suma de preu × quantitat de cada producte)  
2\. Si hi ha codi de descompte → aplica el descompte al subtotal  
3\. Calcula l'IVA sobre el subtotal descomptat  
4\. Suma subtotal descomptat \+ IVA \= total final  
5\. Formata el resultat amb dues decimals i el símbol de moneda

| function calcularTotal(productes, descompte \= 0, iva \= 0.21) {  // Pas 1: subtotal  const subtotal \= productes.reduce(    (sum, p) \=\> sum \+ (p.preu \* p.quantitat), 0  );  // Pas 2: descompte  const subtotalDescomptat \= subtotal \* (1 \- descompte);  // Pas 3 i 4: IVA i total  const total \= subtotalDescomptat \* (1 \+ iva);  // Pas 5: format  return \`${total.toFixed(2)}€\`;} |
| :---- |

**Exemple 3: Validar un formulari de registre**

**Problema real:** "El formulari no s'ha d'enviar si hi ha errors."

El problema és vague. L'algorisme el converteix en condicions concretes i verificables:

Entrades: nom, email, password, confirmPassword  
Sortida: llista d'errors (buida si tot és correcte)

Passos per a CADA camp:  
  Nom:  
    1\. Comprovar que no és buit  
    2\. Comprovar que té almenys 2 caràcters

  Email:  
    3\. Comprovar que no és buit  
    4\. Comprovar que conté "@" i "."  
    5\. Comprovar que no existeix ja a la base de dades

  Password:  
    6\. Comprovar que té almenys 8 caràcters  
    7\. Comprovar que conté almenys una majúscula  
    8\. Comprovar que conté almenys un número

  Confirmació:  
    9\. Comprovar que coincideix amb password

Si la llista d'errors és buida → envia el formulari  
Si no → mostra els errors sense enviar

| function validarFormulari({ nom, email, password, confirmPassword }) {  const errors \= \[\];  if (\!nom.trim()) errors.push('El nom és obligatori');  if (nom.length \< 2) errors.push('El nom ha de tenir almenys 2 caràcters');  if (\!email.includes('@')) errors.push('L\\'email no és vàlid');  if (password.length \< 8) errors.push('La contrasenya és massa curta');  if (\!/\[A-Z\]/.test(password)) errors.push('Cal almenys una majúscula');  if (\!/\[0-9\]/.test(password)) errors.push('Cal almenys un número');  if (password \!== confirmPassword) errors.push('Les contrasenyes no coincideixen');  return errors;} |
| :---- |

**Exemple 4: Diagnosticar per què una API retorna dades incorrectes**

**Problema real:** "La llista de productes mostra preus erronis."

Quan es debugga codi, identificar els mòduls individuals i provar-los per separat simplifica enormement el procés.

Entrades: resposta de l'API, preus esperats en base de dades  
Sortida: identificació de l'origen de l'error

**Hipòtesi 1: El problema és al backend (retorna dades incorrectes)?**  
  1\. Fes una petició directa a l'API amb curl o Postman  
  2\. Compara els preus rebuts amb els de la BD  
  3\. SI coincideixen → el backend és correcte  
     SI no coincideixen → el bug és al backend (atura aquí)

**Hipòtesi 2: El problema és al frontend (processa malament les dades)?**  
  4\. console.log(dadesRebudes) just after fetch  
  5\. console.log(dadesProcessades) after any transformation  
  6\. Compara les dues  
  7\. SI difereixen → el bug és en la transformació al frontend  
     SI no difereixen → el bug és en el renderitzat

**Hipòtesi 3: El problema és en el càlcul del preu?**  
  8\. Busca totes les funcions que modifiquen el preu  
  9\. Prova cada una amb valors coneguts  
  10\. Identifica quina retorna un resultat incorrecte

**Exemple 5: Ordenar una llista de resultats per rellevància**

**Problema real:** "Els resultats de la cerca haurien d'aparèixer ordenats per rellevància."

"Rellevància" és un concepte abstracte. L'algorisme el fa concret i mesurable:

Entrades: llista de productes, text de cerca  
Sortida: llista de productes ordenada per puntuació de rellevància

Passos per a CADA producte:  
  1\. Inicia la puntuació a 0  
  2\. Si el nom conté el text de cerca EXACTE → suma 10 punts  
  3\. Si el nom conté el text de cerca (parcial) → suma 5 punts  
  4\. Si la descripció conté el text → suma 2 punts  
  5\. Si la categoria coincideix → suma 3 punts  
  6\. Si el producte és recent (\< 30 dies) → suma 1 punt  
  7\. Afegeix la puntuació al producte

Una vegada puntuats tots:  
  8\. Ordena per puntuació de major a menor  
  9\. Retorna la llista ordenada

| function buscarPerRellevancia(productes, cerca) {  const query \= cerca.toLowerCase();  return productes    .map(producte \=\> {      let puntuacio \= 0;      const nom \= producte.nom.toLowerCase();      if (nom \=== query) puntuacio \+= 10;      else if (nom.includes(query)) puntuacio \+= 5;      if (producte.descripcio?.toLowerCase().includes(query)) puntuacio \+= 2;      if (producte.categoria?.toLowerCase().includes(query)) puntuacio \+= 3;      const diesAntiguetat \= (Date.now() \- new Date(producte.createdAt)) / 86400000;      if (diesAntiguetat \< 30) puntuacio \+= 1;      return { ...producte, puntuacio };    })    .sort((a, b) \=\> b.puntuacio \- a.puntuacio);} |
| :---- |

**El patró comú en tots els exemples**

La lògica de programació representa el marc fonamental que transforma els enfocaments humans de resolució de problemes en instruccions executables per a l'ordinador. 

Al seu nucli, la lògica de programació engloba l'aplicació sistemàtica del raonament lògic, el pensament estructurat i els principis de disseny algorísmic que permeten als developers crear solucions de software funcionals.

Tots els exemples anteriors segueixen el mateix patró:

Problema vague i difús  
       ↓  
Reformulació precisa  
  → "Què entra?" (inputs)  
  → "Què hauria de sortir?" (outputs)  
  → "Quins casos límit existeixen?"  
       ↓  
Descomposició en passos  
  → Cada pas és concret i verificable  
  → Cada pas té una sola responsabilitat  
       ↓  
Implementació  
  → Un pas \= una funció o una línia de codi  
       ↓  
Verificació  
  → Prova amb entrades conegudes  
  → Compara el resultat amb l'esperat  
  → Ajusta si cal

