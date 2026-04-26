## **Històries d'Usuari**

###### **Històries d'usuari** [*https://www.scrummanager.com/files/scrum\_manager\_historias\_usuario.pdf*](https://www.scrummanager.com/files/scrum_manager_historias_usuario.pdf) Document de Scrum Manager amb exemples i introducció.

###### **Tasques a partir d'històries d'usuari**

[https://www.pluralsight.com/resources/blog/guides/break-down-agile-user-stories-into-tasks-and-estimate-level-of-effort?utm\_source=chatgpt.com](https://www.pluralsight.com/resources/blog/guides/break-down-agile-user-stories-into-tasks-and-estimate-level-of-effort?utm_source=chatgpt.com)  
Guia per dividir històries en tasques i estimar esforç.

## **Què és una història d'usuari?**

Una història d'usuari és una descripció curta d'una característica de software escrita des de la perspectiva de l'usuari final. Se centra en el que l'usuari vol aconseguir i el valor que li aporta, en lloc de descriure requeriments tècnics.

Les històries d'usuari no són una llista de funcionalitats tècniques: són la manera que té Agile de posar la persona real al centre de tot el que es construeix. Després de llegir una història d'usuari, l'equip sap per què construeix, què construeix i quin valor crea.

**L'estructura bàsica: Rol \+ Acció \+ Valor**

La plantilla més comú s'anomena "Connextra template" i segueix aquesta estructura: "Com a \[rol\], vull \[funcionalitat\], per tal que \[benefici\]."

Els tres components:

**Rol** — qui és l'usuari. No és genèric: és un perfil concret amb necessitats específiques. "Com a usuari registrat", "com a administrador", "com a client nou".

**Acció** — el que l'usuari vol fer. Descriu el comportament desitjat, no la implementació tècnica. "Vull filtrar els resultats per preu", no "vull un endpoint que accepti paràmetres de filtre".

**Valor** — per què ho necessita, quin benefici obté. Aquesta és la part més important i la que més sovint s'oblida. "Per tal que pugui trobar productes dins del meu pressupost".

Exemples reals:

*"Com a client, vull rebre notificacions de l'estat de la meva comanda per tal que sàpiga quan arribarà el meu paquet."*

*"Com a administrador, vull restablir contrasenyes d'usuaris per tal que els pugui ajudar a recuperar l'accés al compte ràpidament."*

*"Com a gestor de projectes, vull veure la càrrega de treball de l'equip per tal que pugui assignar tasques de manera més efectiva."*

**Les 3 C's: Card, Conversation, Confirmation**

El framework de les 3 C's descriu els tres aspectes essencials de cada història d'usuari: Card (targeta física o digital amb el resum d'una a tres línies de la història), Conversation (diàleg continu entre el product owner, developers, QA i UX per refinar necessitats no declarades i casos límit) i Confirmation (criteris d'acceptació i casos de prova específics que confirmen si l'equip ha entregat el que l'usuari final espera).

La targeta és la representació visible, però la conversa és el veritable valor: la història és una invitació al diàleg, no un contracte tancat.

**Criteris d'acceptació: com se sap quan està acabada?**

Els criteris d'acceptació defineixen les condicions concretes que han de complir-se perquè la història es consideri completada. Es recomana una filosofia de "just enough": les històries d'usuari haurien de tenir just el detall necessari per fluir: una o dues frases més dos a cinc criteris d'acceptació.

Exemple per a la història del login:

*Com a usuari registrat, vull iniciar sessió amb el meu correu i contrasenya per tal que pugui accedir al meu compte.*

Criteris d'acceptació:

* L'usuari pot iniciar sessió amb credencials correctes  
* Si la contrasenya és incorrecta, es mostra un missatge d'error clar  
* Després de 3 intents fallits, el compte es bloqueja temporalment  
* L'usuari pot tancar la sessió en qualsevol moment

**INVEST: les sis qualitats d'una bona història**

Per assegurar que les històries estan ben escrites, els equips àgils segueixen el criteri INVEST: Independent (cada història ha de ser autocontinguda i no dependent d'altres), Negotiable (les històries no són contractes fixes, han d'estar obertes a discussió i refinament), Valuable (cada història ha d'entregar valor a l'usuari final), Estimable (l'equip ha de poder estimar l'esforç necessari), Small (les històries han de ser prou petites per completar-se dins d'un únic sprint) i Testable (han de definir criteris d'acceptació clars que validin la implementació).

**Story Points i estimació**

Els equips àgils usen story points i el "planning poker" per valorar la seva feina. Un story point és un número singular que representa una combinació de qualitats: complexitat, esforç i incertesa. Els story points són relatius, sense connexió a cap unitat de mesura específica. S'aplica una seqüència de Fibonacci modificada (1, 2, 3, 5, 8, 13, 20, 40, 100\) que reflecteix la incertesa inherent en l'estimació.

El planning poker funciona de la manera següent: tothom de l'equip tria en secret el seu número de story points per a una història, els mostren alhora i si hi ha diferències, en debaten fins arribar a un consens. El veritable valor del planning poker és arribar a un acord sobre l'abast de la història. A més, és divertit\!

**De la història a les tasques: com es desglossa**

Una història d'usuari es desglossa en **tasques** concretes que l'equip executa durant el sprint. La diferència és que la història descriu el *què* des del punt de vista de l'usuari, i les tasques descriuen el *com* des del punt de vista tècnic.

Per exemple, de la història "Com a usuari vull iniciar sessió" podrien sortir les tasques:

* Crear el formulari de login al frontend  
* Implementar l'endpoint d'autenticació al backend  
* Connectar el formulari amb l'API  
* Escriure els tests unitaris del servei d'autenticació  
* Gestionar els estats d'error al frontend  
* Implementar el bloqueig de compte per intents fallits

Una vegada que les tasques estan clarament definides, cal decidir quins passos específics cal completar i qui és responsable de cadascun.

**Epics, Històries i Tasques: la jerarquia**

| Nivell | Definició | Exemple |
| ----- | ----- | ----- |
| **Epic** | Funcionalitat gran que agrupa moltes històries | "Sistema d'autenticació d'usuaris" |
| **Història** | Funcionalitat concreta des de la perspectiva de l'usuari | "Com a usuari vull iniciar sessió" |
| **Tasca** | Pas tècnic concret per implementar la història | "Crear endpoint POST /auth/login" |

**Errors comuns a evitar**

Evita la "fatiga de funcionalitats": no converteixis una història d'usuari en una mini-especificació afegint dotzenes de requisits en una sola història. 

Evita el jargon tècnic: no escriguis des de la perspectiva del developer (per exemple, "refactoritzar el servei de pagament"), ja que això oculta el valor de l'usuari. 

Evita criteris oberts: no usies criteris vagues com "funciona en mòbil"; especifica tipus de dispositiu, navegadors i mides de pantalla. 

Evita les històries grans: no expandeixis les històries més del que es pot fer en un sprint.

