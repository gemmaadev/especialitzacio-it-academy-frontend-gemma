### **Exercici pràctic: Creació i publicació d’un package npm** 

#### Context

En aquest taller aprendràs a crear un package npm que mostri la data i l’hora actual. També aprendràs a publicar aquest package a npm i a utilitzar-lo en un projecte nou. Aquest exercici et permetrà entendre el procés de creació, publicació i ús de packages npm, una habilitat essencial per a desenvolupadors front-end i back-end.

#### Objectius d’aprenentatge

* » Entendre com inicialitzar un projecte npm.  
* » Aprendre a crear un script senzill en Node.js.  
* » Publicar un package a npm.  
* » Utilitzar un package npm publicat en un projecte nou.

#### Passos a seguir

1. Inicialitzar el projecte npm  
   * » Crea un nou directori a la teva carpeta de projectes.  
   * » Dins de la nova carpeta, inicialitza un nou projecte npm  
   * » Completa la informació requerida, com el nom del package (busca un nom que reflexi l'utilitat), la versió (comença amb "0.0.1"), l'autor (teu usuari de npm) i la descripció.  
2. Crear l’script per mostrar la data i l’hora actual  
   * » Crea un fitxer index.js.  
   * » Escriu una funció que imprimeixi la data i l’hora actual a la consola.  
3. Configurar package.json  
   * » Afegeix un camp main al package.json que apunti al fitxer index.js.  
   * » Defineix un script personalitzat per executar el fitxer amb node.  
4. Publicar el package a npm  
   * » Assegura’t que tens un compte a npm i que has iniciat sessió amb npm login.  
   * » Publica el package amb la comanda npm publish.  
5. Utilitzar el package en un projecte nou  
   * » Crea un nou projecte "vanilla" "javascript" amb vite  
   * » Instal·la el package que has creat abans dins d'aquest nou projecte.  
   * » Importa el package al fitxer main.js del projecte.  
   * » Comprova el resultat a la consola del navigador.

