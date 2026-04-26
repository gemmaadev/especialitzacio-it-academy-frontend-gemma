## **Criteris d'acceptació i escenaris de prova**

###### **Criteris d'acceptació i escenaris de prova** [*https://www.scrummanager.com/blog/2023/03/criterios-de-aceptacion-definicion-y-ejemplos/*](https://www.scrummanager.com/blog/2023/03/criterios-de-aceptacion-definicion-y-ejemplos/)Explicació de criteris de validació i ús de Gherkin.

**Què són els criteris d'acceptació?**

Els criteris d'acceptació estableixen els requisits que s'han de complir perquè un producte es consideri acabat i llest per atendre les necessitats específiques dels usuaris. Proporcionen un mètode clar per provar i determinar si una història d'usuari està acabada, eliminant qualsevol marge d'incertesa.

Si la història d'usuari descriu el *què* i el *per què*, els criteris d'acceptació descriuen el *com sabem que s'ha fet bé*. Sense ells, "acabat" significa una cosa diferent per al developer, per al dissenyador i per al client. Amb ells, tots treballen cap al mateix objectiu mesurable.

Els criteris d'acceptació milloren el procés de desenvolupament de diverses maneres: donen claredat sobre quins passos i funcionalitats calen, mantenen tots els equips en la mateixa pàgina, proporcionen un mètode clar per provar si la feina és correcta, i ajuden els equips a evitar confusions i completar les tasques més ràpid.

**Per què són importants?**

La investigació mostra que el 56% dels defectes de software s'introdueixen durant les fases de requisits i disseny, cosa que fa que els criteris d'acceptació clars siguin crucials per prevenir problemes costosos en fases posteriors.

Un criteri d'acceptació vague com "ha de ser ràpid" o "ha de ser fàcil d'usar" és inútil perquè no es pot provar. Un criteri concret com "la cerca ha de retornar resultats en menys de 200 mil·lisegons" és perfectament verificable. La diferència entre els dos és la diferència entre un equip que treballa alineat i un que discuteix al final del sprint si la feina "compta" com a feta.

**Dos formats principals**

**Format de llista de condicions** — el més simple. Una llista de condicions que han de complir-se. Ideal per a funcionalitats senzilles:

*Història: Com a usuari, vull crear un compte.*

* El formulari ha de tenir camps per a nom, correu i contrasenya  
* La contrasenya ha de tenir com a mínim 8 caràcters  
* Si el correu ja existeix, s'ha de mostrar un missatge d'error  
* Després del registre, l'usuari rep un correu de confirmació

**Format Gherkin (Given/When/Then)** — el format estàndard per a escenaris de prova. Estructurat, precís i executable per eines de testing automatitzat.

**Gherkin: el llenguatge dels escenaris de prova**

El format Given/When/Then prové del Behavior-Driven Development (BDD), una metodologia àgil que emfatitza la col·laboració entre developers, testers i stakeholders de negoci. BDD usa un llenguatge comú per descriure el comportament del software de manera que tothom comparteixi el mateix enteniment. Al seu nucli hi ha un llenguatge específic anomenat Gherkin, que divideix els requisits de negoci en escenaris escrits en llenguatge natural.

Gherkin usa paraules clau com Given, When, Then, And i But per descriure el comportament d'un sistema d'una manera que pot ser traduïda a tests automatitzats usant eines com Cucumber o SpecFlow.

L'estructura bàsica:

Escenari: \[nom descriptiu de la situació\]  
  DONAT \[context inicial, l'estat del sistema abans de l'acció\]  
  QUAN  \[l'acció que fa l'usuari o el sistema\]  
  LLAVORS \[el resultat esperat que es pot verificar\]

**Les tres paraules clau explicades**

**DONAT (Given)** — estableix el context inicial. Descriu l'estat del sistema i les condicions prèvies abans que passi res. La secció Given configura les dades de prova i l'estat del sistema.

Exemples: "Donat que l'usuari és registrat", "Donat que el carret té 3 productes", "Donat que la sessió ha expirat".

**QUAN (When)** — l'acció que desencadena el flux. La secció When defineix les interaccions de l'usuari.

Exemples: "Quan l'usuari clica el botó Enviar", "Quan introdueix una contrasenya incorrecta", "Quan el temps de sessió supera els 30 minuts".

**LLAVORS (Then)** — el resultat verificable. La secció Then especifica els resultats verificables. Si les condicions d'aquesta clàusula es compleixen, el software funciona correctament; si no, falla.

Exemples: "Llavors es mostra el missatge d'error 'Contrasenya incorrecta'", "Llavors l'usuari és redirigit a la pàgina d'inici".

**Exemple complet: login d'usuari**

*Història d'usuari: Com a usuari registrat, vull iniciar sessió amb el meu correu i contrasenya per tal que pugui accedir al meu compte.*

Escenari: Login correcte  
  DONAT que l'usuari té un compte registrat  
  QUAN introdueix el correu i la contrasenya correctes  
  LLAVORS és redirigit al seu panell personal

Escenari: Contrasenya incorrecta  
  DONAT que l'usuari té un compte registrat  
  QUAN introdueix el correu correcte i la contrasenya incorrecta  
  LLAVORS es mostra el missatge "Contrasenya incorrecta. Torna-ho a intentar"  
  I el formulari es buida

Escenari: Bloqueig per intents fallits  
  DONAT que l'usuari ha fallat la contrasenya 3 vegades  
  QUAN intenta iniciar sessió una quarta vegada  
  LLAVORS el compte es bloqueja temporalment 15 minuts  
  I es mostra el missatge "Compte bloquejat temporalment"

**El camí feliç i els camins alternatius**

Els stakeholders tendeixen naturalment cap al "camí feliç", el que esperen que passi sense considerar els camins menys ideals. L'estructura Given-When-Then facilita repassar els GIVENs i comprovar si hi ha algun camí alternatiu que l'equip ha perdut.

Per a cada funcionalitat, has de definir com a mínim:

**Camí feliç** — tot funciona correctament, l'usuari completa l'acció amb èxit. **Camins alternatius** — situacions d'error, dades invàlides, casos límit, estats buits.

**Criteris d'acceptació vs. Tests d'acceptació**

Els Criteris d'Acceptació especifiquen els requisits funcionals i no funcionals que s'han de complir abans que una història es consideri completada pels stakeholders. Els Tests d'Acceptació confirmen que el producte compleix tots els Criteris d'Acceptació i funciona correctament. Mentre que tots dos mots porten la connotació d'acceptació, difereixen en la definició.

Dit simplement: els **criteris** diuen *el que ha de passar*. Els **tests** verifiquen *que realment passa*.

**Bones pràctiques i errors comuns**

L'error més comú és escriure frases vagues com "ràpid", "fàcil d'usar" o "bona UX". Aquestes paraules fan els criteris d'acceptació no testables i ambigus. La solució és quantificar el rendiment: "la cerca retorna resultats en menys de 200 ms", o definir resultats d'UX: "els usuaris completen el checkout en menys de tres passos sense missatges d'error".

Cada escenari Gherkin hauria de ser autocontingut i executable de manera independent. Evita crear dependències entre escenaris, ja que això fa el testing fràgil i el debugging difícil.

La regla pràctica per a la mida: la majoria de les històries d'usuari efectives tenen entre 1 i 3 criteris d'acceptació. Si te'n surten 4 o més, considera si la història és massa gran i s'hauria de dividir en històries més petites i centrades.

**Resum visual**

| Element | Pregunta que respon | Exemple |
| ----- | ----- | ----- |
| **Història d'usuari** | Qui vol fer què i per què? | "Com a usuari vull iniciar sessió..." |
| **Criteri d'acceptació** | Com sabem que s'ha fet bé? | Llista de condicions verificables |
| **Escenari Gherkin** | Quina situació concreta provem? | Given/When/Then estructurat |
| **DONAT** | Quin és el context inicial? | "Donat que l'usuari té un compte" |
| **QUAN** | Quina és l'acció? | "Quan introdueix la contrasenya" |
| **LLAVORS** | Quin és el resultat esperat? | "Llavors accedeix al panell" |

