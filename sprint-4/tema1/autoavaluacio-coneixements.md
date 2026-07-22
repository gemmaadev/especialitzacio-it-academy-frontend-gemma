# **Autoavaluació S4.React Tema 1**

- [x] ~~Puc explicar les diferències clau entre SPAs i aplicacions multipàgina tradicionals.~~

* **Multipàgina:** Cada vegada que fas clic en un enllaç, el navegador demana una pàgina HTML nova al servidor i la pantalla es posa en blanc un moment per recarregar-ho tot.

* **SPA (Single Page Application):** Es descarrega **un sol HTML inicial**. Quan navegues, JavaScript canvia només la part de la pantalla que cal sense recarregar la pàgina.


- [x] ~~Entenc com la composició de components permet crear interfícies complexes a partir de blocs simples.~~

És com jugar a **Lego**: en lloc de fer un codi gegant, crees peces petites i independents (botons, targetes, menús) i les vas combinant unes dins d'altres per construir interfícies complexes i fàcils de mantenir.

- [x] ~~Sé descriure el flux de renderització de React i el rol del DOM virtual.~~

Quan l'estat d'una aplicació canvia:

1. **Render:** React executa el component i dibuixa el resultat en un **DOM Virtual** (una còpia ràpida en memòria).  
2. **Reconciliation:** Compara el DOM Virtual nou amb l'anterior per trobar què ha canviat.  
3. **Commit:** Aplica **únicament aquests canvis mínims** al DOM real del navegador.

- [x] ~~Puc diferenciar entre enfocaments declaratius i imperatius en el desenvolupament d'interfícies.~~

* **Imperatiu (Ex: JS tradicional):** Li dius a l'ordinador **pas per pas com fer-ho** (*"busca aquest botó, afegeix-li una classe, amaga aquest text..."*).  
* **Declaratiu (Ex: React):** Li dius a l'ordinador **quin resultat vols veure** segons l'estat (*"si `isLoading` és `true`, mostra la roda de càrrega"*) i React s'encarrega dels passos.  
    
- [x] ~~Reconec quan un component és pur i quins beneficis això comporta.~~

Es pur quan el component **NO s'inventa res** ni depèn del "dia o l'hora" que sigui. La seva resposta depèn **únicament** de les dades (`props`) que li passes des de fora. A més, no toca res de fora mentre es dibuixa.

* **Benefici:** És súper predictible, no dona sorpreses ni errors estranys i és molt fàcil de provar (testejar).


- [x] ~~Entenc els problemes que resolen els Hooks i la seva relació amb el cicle de vida dels components.~~

Abans necessitaves "Classes" complexes per tenir estat o controlar quan es muntava un component.

* **Què resolen:** Els Hooks (`useState`, `useEffect`...) permeten utilitzar estat i coordinar el cicle de vida (quan el component neix, s'actualitza o es destrueix) fent servir **funcions simples** i codi molt més reutilitzable.

- [x] ~~Puc identificar els principals metaframeworks de React i els problemes específics que resolen.~~

React només gestiona la part visual. Els metaframeworks (com Next.js o React Router v7) afegeixen la infraestructura que falta per a entorns de producció: **rutes automàtiques, renderitzat al servidor (SSR) per millorar el SEO i eines organitzades per carregar dades**.

- [x] ~~Sé traduir JSX a crides de React.createElement equivalents.~~

JSX és només una manera d'escriure HTML dins de JavaScript. Per sota, React ho converteix a funcions:

**En JSX:** `<button className="blau">Hola</button>`  
**En JS real:** `React.createElement('button', { className: 'blau' }, 'Hola')`

- [x] ~~Entenc com la reconciliació de React optimitza les actualitzacions del DOM.~~

Manipular el DOM del navegador és molt lent. La reconciliació utilitza l'algorisme de **Diffing** (comparació ràpida) i l'ús de la propietat **`key`** a les llistes per saber **exactament quin element ha canviat**, tocant el navegador el mínim indispensable.