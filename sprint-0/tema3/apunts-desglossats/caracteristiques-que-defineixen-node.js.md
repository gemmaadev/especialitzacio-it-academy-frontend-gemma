**Quines són les característiques principals que defineixen Node.js com a entorn d'execució?**

###### ***Introduction to Node.js (Oficial)***

[https://nodejs.org/en/learn/getting-started/introduction-to-nodejs](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)  
Presentació de Node.js i del seu ecosistema.

###### ***Comparació de gestors de paquets***

[https://www.cookielab.io/blog/package-managers-comparison-yarn-npm-pnpm](https://www.cookielab.io/blog/package-managers-comparison-yarn-npm-pnpm)  
Comparació entre Yarn, npm i PNPM, amb avantatges i usos.

## **Node.js: característiques principals com a entorn d'execució**

Abans de Node.js, JavaScript només existia dins del navegador. No podies usar-lo per crear un servidor, llegir fitxers del disc o connectar-te a una base de dades. Node.js va canviar això el 2009: va treure JavaScript del navegador i el va portar al servidor.

**Un entorn d'execució, no un llenguatge**

És important entendre que Node.js no és un llenguatge de programació. Node.js és un entorn d'execució de JavaScript de codi obert i multiplataforma. Executa el motor V8 de Google Chrome, però fora del navegador. Pensa-hi així: el navegador és l'entorn on JavaScript viu normalment; Node.js és un altre entorn, però al servidor.

Això significa que amb un sol llenguatge (JavaScript) pots fer tant el codi del frontend (el que veu l'usuari) com el del backend (el servidor). Aquesta és una de les raons principals de la seva popularitat.

**El motor V8: per què és ràpid**

V8 és el motor JavaScript creat per Google Chrome. Node.js va escollir V8 com a motor el 2009, i a mesura que Node.js va créixer en popularitat, V8 es va convertir en el motor que alimenta una quantitat enorme de codi de servidor escrit en JavaScript.

El que fa especial a V8 és que no interpreta el JavaScript línia per línia com un traductor simultani, sinó que el compila directament a codi màquina, que és el que entén el processador. Resultat: execució molt més ràpida.

**Un sol procés per a tot**

Una aplicació Node.js s'executa en un sol procés, sense crear un fil nou per a cada petició. Node.js proporciona un conjunt de primitives d'I/O asíncrones a la seva biblioteca estàndard que eviten que el codi JavaScript es bloquegi.

Quan Node.js fa una operació d'I/O —llegir un fitxer, consultar una base de dades, fer una petició de xarxa— no s'atura a esperar. Continua fent altres coses i, quan arriba la resposta, la processa. Ja en vam veure el detall al tema de l'Event Loop.

**npm: l'ecosistema de paquets**

Node.js ve amb npm, que dona accés a més de dos milions de paquets de codi obert, permetent als desenvolupadors afegir funcionalitats als projectes ràpidament. Necessites enviar correus electrònics? Hi ha un paquet. Autenticació d'usuaris? Hi ha un paquet. Connexió a una base de dades? Hi ha un paquet.

Aquesta riquesa de l'ecosistema és una de les raons per les quals Node.js s'ha convertit en estàndard per al desenvolupament backend amb JavaScript.

**Alternatives a npm: Yarn i pnpm**

npm és el gestor de paquets que ve instal·lat per defecte amb Node.js, però no és l'únic. Van sorgir alternatives per resoldre alguns dels seus problemes.

Yarn va ser creat per Meta i pnpm és el més nou i ràpid dels tres. npm és el més usat per ser el predeterminat, però les instal·lacions seqüencials de paquets augmenten el temps d'instal·lació.

pnpm no descarrega paquets sencers, sinó només les diferències entre versions, i reutilitza paquets entre projectes per estalviar espai en disc. Si en deu projectes uses la mateixa versió d'una llibreria, pnpm la guarda una sola vegada al disc i la comparteix entre tots.

Per a qui comença, **npm** és suficient i és el que trobaràs en la majoria de tutorials. La cosa més important no és quin gestor tries, sinó que siguis consistent i uses el mateix en tots els teus projectes i equip.

