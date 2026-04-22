###### **Gestionar de dependències d'un projecte mitjançant npm**

###### ***npm package manager*** [*https://nodejs.org/learn/getting-started/an-introduction-to-the-npm-package-manager*](https://nodejs.org/learn/getting-started/an-introduction-to-the-npm-package-manager) 

Introducció al gestor de paquets oficial de [Node.js](http://Node.js).

## **Gestionar dependències d'un projecte amb npm**

Quan treballes en un projecte de Node.js, és molt probable que necessitis codi que ja ha escrit algú altre: una llibreria per fer peticions HTTP, un framework per crear un servidor, una eina per formatear dates... npm instal·la, actualitza i gestiona les descàrregues de les dependències del teu projecte. Les dependències són fragments de codi preconstruïts, com llibreries i paquets, que la teva aplicació Node.js necessita per funcionar.

**Iniciar un projecte: `npm init`**

Abans d'instal·lar res, cal crear el fitxer `package.json` que serà el centre de control del projecte. Ho fas amb:

npm init

Això et farà una sèrie de preguntes (nom del projecte, versió, descripció...). Si vols saltar-te totes les preguntes i crear el fitxer amb valors per defecte:

npm init \-y

El resultat és un `package.json` buit, llest per anar afegint dependències.

**Instal·lar paquets: `npm install`**

Pots instal·lar un paquet específic executant `npm install` seguit del nom. Des de npm 5, aquesta comanda afegeix automàticament el paquet a les dependències del `package.json`. També crea la carpeta `node_modules` on es guarda físicament el codi del paquet.

npm install express        \# instal·la Express (framework de servidor)  
npm install lodash         \# instal·la Lodash (utilitats JavaScript)

Si algú et passa un projecte ja fet i vols instal·lar totes les seves dependències d'un cop:

npm install

Això llegeix el `package.json` i ho instal·la tot.

**Dependències de producció vs. de desenvolupament**

No totes les dependències són iguals. Algunes les necessites quan el projecte s'executa en producció (el servidor real). Altres només les necessites mentre programes: eines per fer tests, per detectar errors de codi, etc.

La propietat `devDependencies` permet definir dependències que només s'usen durant la fase de desenvolupament i no es requereixen per a la versió de producció, com ESLint o eines de testing. S'afegeix `--save-dev` o `-D` a la comanda d'instal·lació.

npm install express              \# dependència de producció (dependencies)  
npm install \--save-dev jest      \# dependència de desenvolupament (devDependencies)

Al `package.json` es veurà la diferència clarament:

{  
  "dependencies": {  
    "express": "^4.18.0"  
  },  
  "devDependencies": {  
    "jest": "^29.0.0"  
  }  
}

**Desinstal·lar i actualitzar paquets**

Per eliminar un paquet que ja no necessites:

npm uninstall express

Això esborra el paquet de `node_modules` i el treu automàticament del `package.json`.

Per actualitzar tots els paquets a les seves versions compatibles més recents:

npm update

**Scripts: automatitzar tasques**

Una de les funcionalitats més útils de npm és poder definir scripts propis al `package.json` per automatitzar tasques habituals:

{  
  "scripts": {  
    "start": "node index.js",  
    "dev": "nodemon index.js",  
    "test": "jest"  
  }  
}

I executar-los així:

npm run start    \# executa el servidor  
npm run dev      \# executa en mode desenvolupament  
npm run test     \# executa els tests

**La carpeta `node_modules` i Git**

Un error molt comú quan es comença és pujar `node_modules` a Git. Aquesta carpeta pot arribar a tenir milers de fitxers i centenars de megabytes. No cal pujar-la perquè qualsevol persona pot regenerar-la fent `npm install`. Per evitar-ho, cal crear un fitxer `.gitignore` a l'arrel del projecte amb aquest contingut:

node\_modules/

Així Git ignorarà completament aquesta carpeta.

**Resum de les comandes principals**

| Comanda | Fa... |
| ----- | ----- |
| `npm init -y` | Crea el `package.json` |
| `npm install` | Instal·la totes les dependències del projecte |
| `npm install nom-paquet` | Instal·la un paquet concret |
| `npm install -D nom-paquet` | Instal·la com a dependència de desenvolupament |
| `npm uninstall nom-paquet` | Elimina un paquet |
| `npm update` | Actualitza tots els paquets |
| `npm run nom-script` | Executa un script del `package.json` |

