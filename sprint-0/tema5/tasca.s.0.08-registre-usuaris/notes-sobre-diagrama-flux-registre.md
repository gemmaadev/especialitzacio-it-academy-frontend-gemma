## **Decisions de disseny més rellevants**

* He ordenat les validacions en cascada de menor a major cost: primer es valida el format de l'email i la força de la contrasenya al client (sense cap petició al servidor), i només si tot és correcte s'envia la petició. Això evita càrrega innecessària al backend.   
* El cas "email ja existeix" l’he separat en un flux alternatiu propi amb el seu fi independent, perquè ja no és un registre sinó un possible inici de sessió, i barrejar els dos fluxos crearia confusió tant per a l'usuari com per al sistema.

**Com milloraria el flux amb més temps**

* Amb més temps afegiria un node de rate limiting després de "Enviar petició al servidor" per bloquejar intents massius de registre automatitzat.   
* També separaria visualment amb carrils les accions que fa l'usuari, les que fa el client (navegador) i les que fa el servidor, per deixar molt clar on es produeix cada validació.   
* Finalment, afegiria un flux de verificació de l'email, ja que ara mateix el diagrama envia l'email de verificació però no representa què passa si l'usuari no el confirma.

