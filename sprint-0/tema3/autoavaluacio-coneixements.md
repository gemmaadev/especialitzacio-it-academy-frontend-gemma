1. **Defineix els següents conceptes i les seves funcionalitats principals:**

   * Node.js

Node.js és un entorn d'execució que permet usar JavaScript fora del navegador, al servidor. Les seves dues característiques clau són que usa el motor V8 de Chrome per executar JavaScript molt ràpidament, i que funciona de manera no bloquejant, és a dir, pot atendre moltes peticions alhora sense esperar que cada una acabi.

* npm (Node Package Manager)

npm és el gestor de paquets oficial de Node.js que s'instal·la automàticament amb ell. Les dues característiques clau són que permet instal·lar llibreries externes amb una sola comanda (npm install), i que gestiona les versions de totes les dependències del projecte.

* package.json (Inclou almenys 2 característiques clau per cada element)

package.json és el fitxer de configuració principal de qualsevol projecte Node.js. Les dues característiques clau són que conté la llista de totes les dependències que necessita el projecte per funcionar, i que permet definir scripts personalitzats com npm run dev o npm run build per automatitzar tasques habituals.

2. **Explica quines ordres de npm són necessàries per:**  
   * Instal·lar dependències regulars  
   * Instal·lar dependències de desenvolupament  
   * Actualitzar totes les dependències (Menciona com es reflecteixen aquestes accions al fitxer package-lock.json)

Per instal·lar una dependència regular que el projecte necessita en producció:

**npm install nom-paquet**

Per instal·lar una dependència de desenvolupament que només es necessita mentre es programa:

**npm install \--save-dev nom-paquet**

Per actualitzar totes les dependències a les versions més recents compatibles.

**npm update**

Cada vegada que s'executa qualsevol d'aquestes comandes, npm actualitza automàticament el fitxer package-lock.json per registrar les versions exactes dels paquets instal·lats o modificats. 

Això garanteix que qualsevol membre de l'equip que faci npm install obtingui exactament les mateixes versions, evitant problemes. 

3. **Què són les variables d'entorn i com es configuren en un projecte amb Vite?**  
   * Descriu el seu propòsit  
   * Indica la convenció de noms que s'ha de seguir  
   * Mostra l'estructura bàsica del fitxer .env

Les variables d'entorn serveixen per guardar valors de configuració fora del codi font, com ara URLs d'APIs o claus de serveis externs, que necessiten ser diferents segons l'entorn on s'executa l'aplicació (desenvolupament o producció). Així no cal modificar el codi cada vegada que es desplegui a un servidor diferent.

La convenció de noms a Vite és que totes les variables que han de ser accessibles al codi del navegador han de començar obligatòriament amb el prefix VITE\_. Les variables sense aquest prefix queden ocultes per seguretat i no arriben al navegador.

Estructura bàsica d'un fitxer .env:  
VITE\_API\_URL=https://api.example.com  
VITE\_APP\_NAME=La meva aplicació  
DB\_PASSWORD=aquestaNOarriba

Les variables VITE\_ s'accedeixen al codi amb import.meta.env.VITE\_API\_URL. DB\_PASSWORD queda oculta.

4. **Com es configura i treballa amb un workspace a Visual Studio Code?**  
   * Detalla els passos per crear-lo  
   * Menciona 2 avantatges d'utilitzar aquesta funcionalitat  
   * Explica com gestionar múltiples carpetes dins d'un mateix workspace

Un workspace de VS Code permet agrupar diverses carpetes en una sola finestra de treball, com si fossin un únic projecte.

**Passos per crear-lo:**

1. Obrir VS Code i anar a File → Add Folder to Workspace  
2. Seleccionar la primera carpeta del projecte  
3. Repetir per afegir més carpetes si cal  
4. Anar a File → Save Workspace As... i desar el fitxer .code-workspace en un lloc accessible

**Dos avantatges:** permet tenir el frontend i el backend oberts simultàniament en una sola finestra sense haver de canviar entre finestres, i permet configurar extensions i settings específics per a tot el workspace de manera centralitzada.

**Gestió de múltiples carpetes:** cada carpeta apareix a la barra lateral de l'explorador amb el seu nom propi. Es pot treballar amb cada una de manera independent: obrir fitxers, usar el terminal integrat apuntant a qualsevol d'elles, i fer commits de Git per separat si cadascuna té el seu repositori.

5. **Quines estratègies utilitzaries per integrar la IA (ex: GitHub Copilot) en el teu procés d'aprenentatge?**  
   * Descriu 3 casos pràctics d'ús (ex: generació de codi, resolució d'errors)  
   * Com equilibraries la dependència de l'IA amb l'aprenentatge autònom?

Primer, per entendre errors: quan apareix un error que no s'entén, es pot enganxar el missatge sencer al chat de Copilot i preguntar "Què significa aquest error i com el soluciono?". Això ajuda a entendre el per què, no només copiar la solució.

Segon, per aprendre codi nou: quan es troba un fragment de codi que no s'entén, es pot seleccionar i demanar "Explica'm línia per línia què fa aquest codi". És una manera molt més activa d'aprendre que llegir documentació passivament.

Tercer, per practicar i comparar: primer intentar fer la funció o component per un mateix, i després demanar-li a la IA com ho faria ella. Comparar les dues solucions permet aprendre alternatives i millors pràctiques.

**Com equilibrar la IA amb l'aprenentatge autònom:** intentar sempre resoldre el problema per un mateix primer, durant uns minuts. Si no es troba la solució, usar la IA per desbloquejar-se, però sempre llegint i entenent el codi generat abans d'acceptar-lo. No s'hauria d'acceptar mai codi que no es sabria explicar amb paraules pròpies. La IA és útil com a eina d'aprenentatge, però els coneixements reals s'adquireixen fent l'esforç d'entendre, no evitant-lo.

