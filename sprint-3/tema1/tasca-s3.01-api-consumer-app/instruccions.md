### **Consum de dades d'API amb Fetch i Axios**

#### **Objectius d'Aprenentatge**

Al final d'aquesta activitat, hauries de ser capaç de:

* » Configurar un projecte web bàsic (HTML, CSS, JavaScript).  
* » Realitzar peticions HTTP per obtenir dades d'una API externa utilitzant tant Fetch API com la llibreria Axios.  
* » Gestionar els estats de la interfície d'usuari (càrrega, visualització de dades, errors).  
* » Implementar funcionalitats de cerca i paginació per millorar l'experiència d'usuari.  
* » Comparar les diferències pràctiques i avantatges de Fetch versus Axios en un projecte real.

#### **Passos a seguir**

1. Configuració del Projecte  
   * » Crea un nou directori amb el nom api-consumer-app.  
   * » Inicialitza el teu projecte creant els següents fitxers dins del directori api-consumer-app:  
     * index.html  
     * styles.css  
     * main.js  
   * » Instal·la Axios: (tips: Busca al CDN de Axios la forma més senzilla d'incloure-la.)  
2. Estructura Bàsica (index.html)  
   * » Hauràs de crear l'estructura HTML bàsica per a la teva aplicació. Aquesta estructura hauria d'incloure:  
     * Un contenidor principal per a tot el contingut de la pàgina, que encapsuli la teva aplicació.  
     * Una capçalera de la pàgina () que contingui:  
       * Un títol principal () per a la teva aplicació.  
       * Una secció dedicada als controls i la interacció ( o si no és navegació principal) que albergarà:  
         * \- Un selector () amb dues opcions: "Utilitza Fetch" i "Utilitza Axios". Un camp d'entrada de text () amb un placeholder per a la cerca.  
         * \- Un botó () per "Obtenir Dades".  
         * \- La secció principal del contingut () de la teva aplicació, que albergarà:  
         * \- Un element per mostrar l'estat de càrrega ().  
         * \- Un element per mostrar missatges d'error (). Recorda que inicialment ha d'estar ocult.  
         * \- Una secció de resultats (o) on es mostraran les dades obtingudes de l'API.  
         * \- Una secció per a la paginació ( o ) que contindrà els botons per navegar per les pàgines.  
3. Estils Bàsics (styles.css)  
   * » Afegeix estils CSS per donar una aparença professional i funcional a la teva aplicació. Hauries de pensar en:  
     * Estils globals per al body (tipografia, amplada màxima, marges, etc.).  
     * Estils per ocultar elements (.hidden).  
     * Estils per als controls (.controls), incloent flexbox per a l'alineació.  
     * Estils per al contenidor principal (.container).  
     * Estils per l'indicador de càrrega (\#loading) i els missatges d'error (\#error).  
     * Estils per la visualització dels resultats (\#results), utilitzant CSS Grid per a una disposició en columnes adaptable (grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))).  
     * Estils per a les "targetes" individuals de dades (.card), incloent-hi vores, ombres, padding i un efecte de :hover.  
     * Estils per als botons de paginació (.pagination button), incloent l'estat :disabled.  
4. Lògica de l'Aplicació (main.js)  
   * » Aquesta és la part més important de l'activitat. Hauràs d'implementar la lògica JavaScript per fer funcionar la teva aplicació. Utilitzarem l'API de proves   
   * » JSONPlaceholder  per als  posts  ( https://jsonplaceholder.typicode.com/posts ).  
   * » Comença definint les constants, les variables d'estat i obtenint les referències als elements del DOM:

const API\_URL \= 'https://jsonplaceholder.typicode.com/posts';  
let currentPage \= 1;  
const itemsPerPage \= 10; // Quants ítems per pàgina vols mostrar

// Referències als elements del DOM:  
// apiSelector, searchInput, fetchButton, loadingElement, errorElement, resultsContainer, paginationContainer  
// ... (Obtén les referències amb document.getElementById)

// Event Listener per al botó "Obtenir Dades"  
// ... (Afegeix l'event listener al fetchButton per cridar fetchData)

// Funció per mostrar l'indicador de càrrega  
function showLoading() {  
    // ... (Elimina la classe 'hidden' de loadingElement)  
}

// Funció per amagar l'indicador de càrrega  
function hideLoading() {  
   // ... (Afegeix la classe 'hidden' a loadingElement)  
}

// Funció per mostrar missatges d'error  
function showError(message) {  
   // ... (Actualitza el text de errorElement i elimina la classe 'hidden')  
}

// Funció per amagar missatges d'error  
function hideError() {  
    // ... (Afegeix la classe 'hidden' a errorElement)  
}

// Funció principal per obtenir dades (a implementar)  
async function fetchData() {  
    const searchTerm \= /\* ... (Obtén el valor de searchInput) \*/;  
    const useAxios \= /\* ... (Comprova si apiSelector.value és 'axios') \*/;  
      
   showLoading();  
    hideError();  
    // ... (Neteja resultats anteriors i paginació anterior)

    try {  
        if (useAxios) {  
           // ... (Crida la funció per obtenir dades amb Axios)  
        } else {  
           // ... (Crida la funció per obtenir dades amb Fetch)  
        }  
    } catch (error) {  
       // ... (Gestiona errors inesperats si s'escapen de les funcions específiques de Fetch/Axios)  
    } finally {  
        hideLoading();  
    }  
}

// Funció per a la visualització dels resultats i la paginació (a implementar)  
function displayResults(items, totalItems) {  
   // ... (Implementa la lògica per mostrar cada "ítem" com una targeta i per cridar setupPagination)  
}

function setupPagination(totalItems) {  
   // ... (Implementa la lògica per crear els botons de paginació)  
}

// Funció per obtenir dades amb Fetch (a implementar)  
async function fetchDataWithFetch(searchTerm) {  
   // ... (Implementa la petició amb Fetch API)  
}

// Funció per obtenir dades amb Axios (a implementar)  
                                                                                      
async function fetchDataWithAxios(searchTerm) {  
   // ... (Implementa la petició amb Axios)

5.    
6. Tasques a Completar  
   Aquestes són les tasques que has de realitzar per completar l'exercici. Algunes ja tenen una base, mentre que d'altres les hauràs de crear des de zero.

#### **Obligatori**

1. Implementa fetchDataWithFetch(searchTerm):  
   1. » Fes una petició GET a API\_URL utilitzant Fetch API.  
       Algunes pistes:  
      * Per afegir la paginació i la cerca, hauràs d'incloure \_page, \_limit i q (per al terme de cerca) com a paràmetres de query string a l'URL de la petició.  
      * Un cop rebuda la response, recorda comprovar la propietat response.ok. Si és false, llança un nou Error amb un missatge descriptiu (p. ex., "Error HTTP: \[codi d'estat\]").  
      * Per a la paginació, necessitaràs el nombre total d'ítems. JSONPlaceholder retorna aquest valor en un encapçalament HTTP anomenat X-Total-Count. Hauràs d'accedir-hi mitjançant response.headers.get('X-Total-Count').  
   2. » Finalment, crida displayResults passant les dades obtingudes i el totalItems.  
2. Implementa fetchDataWithAxios(searchTerm):  
   1. » Fes una petició GET a API\_URL utilitzant la llibreria Axios.  
   2. » Pista de paràmetres: Axios facilita afegir paràmetres de query string utilitzant l'objecte params en la configuració de la petició. Pensa en \_page, \_limit i q.  
   3. » Pista de gestió d'errors d'Axios: Axios llança errors automàticament per respostes HTTP amb estat d'error. Captura'ls amb try...catch. L'objecte error d'Axios conté informació útil com error.response?.statusText (per al missatge d'error HTTP) o error.message (per a errors de xarxa).  
   4. » Pista d'obtenció de total d'ítems: Amb Axios, els encapçalaments de la resposta es troben a response.headers. El total d'ítems estarà a response.headers\['x-total-count'\].  
   5. » Finalment, crida displayResults passant les dades (response.data) i el totalItems.  
3. Implementa displayResults(items, totalItems):  
   1. » Assegura't de netejar el contingut del resultsContainer abans d'afegir nous elements.  
   2. » Si l'array items està buit, mostra un missatge com "No s'han trobat resultats" dins del resultsContainer.  
   3. » Per a cada item de l'array items, hauràs de crear dinàmicament un element div amb la classe card.  
   4. » Dins de cada card, mostra la informació rellevant de l'ítem (p. ex., title, body, id).  
   5. » Afegeix cada card al resultsContainer.  
   6. » Un cop mostrats tots els resultats, crida setupPagination(totalItems) per generar els botons de paginació.  
4. Implementa setupPagination(totalItems):  
   1. » Neteja el contingut actual del paginationContainer.  
   2. » Pista de càlcul de pàgines: Calcula el nombre total de pàgines (totalPages) dividint totalItems per itemsPerPage i arrodonint cap amunt (utilitza Math.ceil()).  
   3. » Crea un bucle per generar un botó per a cada pàgina (des de 1 fins a totalPages).  
   4. » Cada botó ha de mostrar el seu número de pàgina (textContent).  
   5. » Afegeix un event listener click a cada botó. Quan es cliqui:  
      * Actualitza la variable global currentPage amb el número de pàgina clicat.  
      * Torna a cridar la funció fetchData() per carregar les dades de la nova pàgina.  
   6. » Pista d'estat del botó: Deshabilita el botó que correspon a la currentPage actual per indicar a l'usuari en quina pàgina es troba.  
   7. » Afegeix els botons al paginationContainer.  
        
5. Bonus Tracks (Opcional, per anar més enllà\!)  
   1. Maneig d'errors avançat:  
      * Millora la funció showError per mostrar missatges més descriptius segons els codis d'estat HTTP (p. ex., "404 Not Found: El recurs sol·licitat no existeix").  
      * Detecta i mostra un missatge específic si l'usuari no té connexió a internet.  
   2. Sistema de cache bàsic:  
      * Implementa una lògica senzilla per emmagatzemar les respostes de l'API a la memòria (p. ex., un objecte JavaScript o Map) i evitar fer peticions redundants per a les mateixes dades de pàgina o cerca. Defineix una política d'expiració per a la cache (p. ex., les dades es consideren obsoletes després de X minuts).  
   3. Cancel·lació de peticions:  
      * Investiga i implementa la cancel·lació de peticions. Això és crucial si l'usuari fa una nova cerca abans que l'anterior hagi acabat, evitant condicions de cursa i peticions innecessàries.  
        * Amb Fetch: Utilitza AbortController.  
        * Amb Axios: Utilitza CancelToken (o AbortController des d'Axios v0.22+).  
   4. Suport per a diferents APIs:  
      * Afegeix un selector addicional (o una entrada de text) que permeti a l'usuari triar o introduir una URL d'API diferent per consumir, fent la teva aplicació més genèrica.  
   5. Sistema de reintents:  
      * Implementa una lògica de reintent (amb un delay exponencial) si una petició de xarxa falla. Això pot millorar la robustesa de l'aplicació en entorns amb connexions inestables.

 **Consells i Recursos**

* Utilitza les eines de desenvolupador del navegador (Consola, Pesta de Xarxa) per depurar les teves peticions, veure les respostes de l'API i inspeccionar els encapçalaments.  
* Consulta la documentació oficial:  
  * [MDN Web Docs per a Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)  
  * [Documentació oficial d'Axios](https://axios-http.com/docs/intro)  
* Recorda que JSONPlaceholder és una API de proves i et permetrà simular diferents escenaris (errors, dades buides, etc.) per provar a fons la teva implementació.

