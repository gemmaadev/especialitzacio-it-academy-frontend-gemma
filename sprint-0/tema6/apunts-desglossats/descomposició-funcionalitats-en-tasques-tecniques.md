## **Descomposició de funcionalitats en tasques tècniques**

**Per què cal descompondre les històries?**

Una història d'usuari com "Com a usuari, vull iniciar sessió" és clara des del punt de vista del client, però per a un developer és massa abstracta per posar-se a treballar. Cal transformar-la en tasques concretes, assignables i estimables. Dividir les històries d'usuari en parts més petites ajuda l'equip a entendre i centrar-se en tasques específiques. Cada part es converteix en ben definida, fent-la més fàcil de comprendre i executar. Aquesta claredat assegura que l'equip pugui treballar més eficientment, reduint les possibilitats d'errors i mala comunicació.

**La diferència entre història i tasca**

La **història d'usuari** parla des de la perspectiva de l'usuari: *"Com a usuari, vull fer X per tal que Y"*. Descriu el valor que s'ha d'entregar, no com s'implementa.

La **tasca tècnica** parla des de la perspectiva del developer: *"Crear el endpoint POST /auth/login al backend"*. Descriu exactament el que cal fer a nivell tècnic.

Quan l'equip discuteix els requisits i la funcionalitat que requereix cada història d'usuari, és l'oportunitat de posar-se tècnic i creatiu en la implementació. Un cop acordat, aquests requisits s'afegeixen a la història.

**El procés pas a pas**

**Pas 1: Llegir la història i els criteris d'acceptació**

Abans de definir tasques, tothom de l'equip ha d'entendre exactament el que demana la història i quins criteris han de complir-se per considerar-la acabada. Els criteris d'acceptació són el mapa: cada criteri ha de quedar cobert per almenys una tasca.

**Pas 2: Pensar en totes les capes del sistema**

Les tasques s'han de dividir verticalment a través de la pila tecnològica, no horitzontalment. Això vol dir que per a cada funcionalitat has de pensar en totes les capes: frontend, backend, base de dades, tests i documentació.

Les capes habituals d'un projecte web:

* **Frontend** — interfície d'usuari, formularis, validacions visuals, missatges d'error  
* **Backend** — endpoints de l'API, lògica de negoci, validació de dades, autenticació  
* **Base de dades** — creació o modificació de taules, queries, migracions  
* **Tests** — tests unitaris, tests d'integració, tests de rendiment  
* **Documentació** — actualitzar la documentació de l'API, comentaris al codi

**Pas 3: Revisar que els criteris queden coberts**

L'equip mira els criteris d'acceptació i conclou si seran satisfets amb l'execució de totes les tasques definides. Si algun criteri no queda cobert per cap tasca, cal afegir-ne una de nova o ampliar l'abast d'una existent.

**Pas 4: Verificar la Definition of Done**

L'equip repassa la llista d'elements que determinen que una història està acabada, i conclou si cal afegir tasques addicionals per assegurar la completesa de la història. La Definition of Done normalment inclou: codi revisat, tests passant, documentació actualitzada i desplegament a l'entorn de proves.

**Exemple complet: de la història a les tasques**

**Història d'usuari:**

*Com a usuari registrat, vull iniciar sessió amb el meu correu i contrasenya per tal que pugui accedir al meu compte.*

**Criteris d'acceptació:**

* L'usuari pot iniciar sessió amb credencials correctes  
* Si la contrasenya és incorrecta, es mostra un missatge d'error  
* Després de 3 intents fallits, el compte es bloqueja 15 minuts  
* La sessió expira després de 30 minuts d'inactivitat

**Tasques tècniques resultants:**

*Frontend:*

* Crear el formulari de login amb camps de correu i contrasenya  
* Afegir validació del format del correu al client  
* Implementar el missatge d'error per credencials incorrectes  
* Mostrar el missatge de compte bloquejat  
* Gestionar la redirecció al panell personal després del login

*Backend:*

* Crear l'endpoint POST /auth/login  
* Implementar la lògica de verificació de credencials  
* Implementar el comptador d'intents fallits  
* Implementar el bloqueig temporal de compte (15 minuts)  
* Implementar l'expiració de sessió per inactivitat (30 minuts)  
* Generar i retornar el token d'autenticació

*Base de dades:*

* Afegir el camp failed\_attempts a la taula d'usuaris  
* Afegir el camp locked\_until a la taula d'usuaris

*Tests:*

* Escriure tests unitaris per al servei d'autenticació  
* Escriure tests d'integració per a l'endpoint de login  
* Provar el flux de bloqueig de compte

**Tall vertical vs. tall horitzontal**

Des d'un punt de vista d'implementació tècnica, les històries sempre s'han de dividir "verticalment" a través de la pila tecnològica, no horitzontalment. Cada història resultant implementa funcionalitat d'usuari i pot ser desplegada independentment de les altres.

**Tall horitzontal (incorrecte)** — dividir per capes: "Sprint 1: tota la base de dades", "Sprint 2: tot el backend", "Sprint 3: tot el frontend". Problema: no hi ha res funcional fins al final.

**Tall vertical (correcte)** — cada tasca és una rodanxa fina que travessa totes les capes per a una funcionalitat concreta. Al final del sprint tens algo petit però completament funcional i desplegable.

**Com saber si una tasca és prou petita**

Una bona tasca tècnica ha de poder completar-se en un màxim d'un o dos dies de treball. Com a regla general, les històries d'usuari ben dimensionades es poden implementar per un equip en tres dies o menys. Si una tasca sembla que trigarà molt més, és senyal que cal dividir-la en tasques més petites.

Les preguntes per avaluar una tasca:

* Es pot assignar a una sola persona?  
* Es pot completar dins del sprint?  
* Té un resultat clarament verificable?  
* Depèn d'altres tasques que no estan acabades?

**Resum del flux complet**  
Història d'usuari  
       ↓  
Criteris d'acceptació  
       ↓  
Tasques de frontend \+ backend \+ BD \+ tests  
       ↓  
Estimació de cada tasca (hores o story points)  
       ↓  
Assignació a membres de l'equip  
       ↓  
Execució durant el sprint  
       ↓  
Verificació dels criteris d'acceptació  
       ↓  
Definition of Done

