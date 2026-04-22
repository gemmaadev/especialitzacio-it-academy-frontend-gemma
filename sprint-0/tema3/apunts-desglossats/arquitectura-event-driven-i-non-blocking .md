**Com funciona l'arquitectura event-driven i non-blocking I/O en [Node.js](http://Node.js)?**

**Arquitectura event-driven i non-blocking I/O en Node.js**

Abans d'entendre Node.js, cal entendre el problema que resol. Els servidors tradicionals (com Apache) creaven un **fil d'execució** (*thread*) nou per a cada petició d'un usuari. Si 1000 usuaris es connectaven alhora, el servidor necessitava 1000 fils, consumint molta memòria i CPU. Node.js ho resol d'una manera completament diferent.

**Un sol fil per a tot: l'Event Loop**

Node.js funciona amb **un únic fil d'execució** per a totes les peticions. Això sona com una limitació, però és precisament el seu punt fort. El mecanisme que ho fa possible s'anomena **Event Loop** (bucle d'esdeveniments).

Imagina un cambrer en un restaurant. Un cambrer tradicional anava a la cuina, esperava que el plat estigués llest, i només llavors tornava a atendre una altra taula. El cambrer de Node.js, en canvi, anota la comanda, la porta a la cuina, i **immediatament** va a atendre la següent taula sense esperar. Quan la cuina avisa que el plat és llest, torna i el serveix.

L'Event Loop és exactament aquest cambrer: rep peticions, les delega, i segueix atenent sense bloquejar-se.

**Non-blocking I/O: no esperar mai**

*I/O* significa entrada i sortida d'informació: llegir un fitxer, fer una consulta a la base de dades, fer una petició a una API externa... Totes aquestes operacions són lentes comparades amb el processador.

En un sistema **blocking** (bloquejant), el codi s'atura i espera que l'operació acabi:

// Bloqueant: el programa s'atura aquí fins que acaba de llegir  
const dades \= fs.readFileSync('fitxer.txt');  
console.log(dades);  
console.log('Això no s\\'executa fins que el fitxer s\\'ha llegit');

En un sistema **non-blocking** (no bloquejant), el codi continua executant-se i s'avisa quan l'operació ha acabat:

// No bloquejant: el programa continua sense esperar  
fs.readFile('fitxer.txt', (dades) \=\> {  
    console.log(dades); // s'executa quan el fitxer ja s'ha llegit  
});  
console.log('Això s\\'executa IMMEDIATAMENT, sense esperar el fitxer');

**Event-driven: treballar amb esdeveniments**

Node.js és **orientat a esdeveniments**: en lloc d'executar codi de dalt a baix i esperar, el programa reacciona a coses que passen. Un esdeveniment pot ser "l'usuari ha fet una petició", "el fitxer s'ha llegit", "la base de dades ha respost", etc.

Quan un d'aquests esdeveniments passa, Node.js executa la funció associada, anomenada **callback** (o també pot ser una *Promise* o *async/await* en codi modern):

const http \= require('http');

const servidor \= http.createServer((peticio, resposta) \=\> {  
    // Això s'executa cada vegada que arriba una petició (és un event)  
    resposta.end('Hola món\!');  
});

servidor.listen(3000);  
// Node.js segueix en marxa, escoltant events, sense bloquejar-se

**Per què Node.js és ideal per a certes tasques**

Gràcies a aquesta arquitectura, Node.js és molt eficient per a aplicacions que fan moltes operacions d'I/O simultànies: APIs REST, chats en temps real, streaming de dades, etc. En canvi, **no és la millor opció** per a tasques que necessiten molt processament de CPU (càlculs matemàtics complexos, processament d'imatges...), perquè com que té un sol fil, una operació pesada bloquearia tot el sistema.

