## **Chrome DevTools i Firefox DevTools: guia completa**

###### **Chrome DevTools Documentation**

[https://developer.chrome.com/docs/devtools?hl=es-419](https://developer.chrome.com/docs/devtools?hl=es-419)  
Guia oficial de Chrome DevTools per depurar i optimitzar aplicacions web.

###### **Debugging JavaScript in Firefox**

[https://firefox-source-docs.mozilla.org/devtools-user/debugger/](https://firefox-source-docs.mozilla.org/devtools-user/debugger/)  
Documentació per aprendre a depurar JS amb les DevTools de Firefox.

**Obrir DevTools: les dreceres fonamentals**

DevTools és el conjunt d'eines de debugging integrades al navegador. No cal instal·lar res: ja és a dins.

| Chrome i Firefox:  F12                    → obre/tanca DevTools  Ctrl+Shift+I (Win)     → obre/tanca DevTools  Cmd+Option+I (Mac)     → obre/tanca DevTools  Ctrl+Shift+J (Win)     → obre directament a Console  Ctrl+Shift+C           → activa l'inspector d'elements  Clic dret → "Inspect" → obre Elements al node seleccionat  Esc                    → obre/tanca el Drawer (Console ràpida) |
| :---- |

**Els panells principals i per a què serveix cada un**

* **Console** — permet executar codi JavaScript a la pàgina, testejar fragments de codi o debugar el codi.   
* **Sources** — veure i editar JavaScript i CSS. Permet posar breakpoints, avançar pel codi i veure els valors de les variables.   
* **Network** — veure com s'està carregant la pàgina. Permet veure quins recursos s'estan carregant i quant de temps triga cadascun.  
* **Performance** — analitzar el rendiment. Clica "Record" per monitorar el rendiment de l'app, incloent ús de CPU, temps de renderitzat i assignació de memòria.   
* **Application** — gestionar l'estat de l'aplicació: cookies, localStorage, sessionStorage, service workers i cache.

**Elements: inspeccionar i editar el DOM en temps real**

El panell Elements mostra l'HTML renderitzat com a DOM a l'esquerra i els estils aplicats a la dreta. Permet navegar i editar elements i estils, i destaca funcionalitats com els estils calculats i el box model. Permet simular events, afegir classes i emular diferents escenaris de renderitzat.

Les accions principals al panell Elements:

* **Editar HTML en viu** — doble clic sobre qualsevol element o atribut per editar-lo directament. Els canvis es veuen immediatament a la pàgina sense reiniciar.  
* **Editar CSS en viu** — modifica les propietats CSS al panell Styles i veus el resultat a la pàgina en temps real. Ideal per experimentar amb mides, colors i layout sense tocar el fitxer.  
* **Forçar estats CSS** — simula estats com `:hover`, `:focus`, `:active` i `:visited` sense necessitat d'interactuar físicament amb l'element. Útil per debugar estils que únicament apareixen en certs estats.  
* **DOM Breakpoints** — al panell Elements, clic dret sobre qualsevol node DOM → Break on → tria: "Subtree modifications" (s'activa quan s'afegeix o elimina un fill), "Attribute modifications" (quan canvia un atribut), "Node removal" (quan l'element s'elimina). Increïblement útil per debugar "alguna cosa està canviant aquest element i no sé quèés".  
* **Veure Event Listeners** — clica la pestanya "Event Listeners" per veure tots els listeners adjuntats a l'element seleccionat. Permet navegar directament al codi font del listener.

**Console: molt més que console.log**

La Console és un intèrpret JavaScript complet amb accés a tota la pàgina. Pots executar qualsevol codi JavaScript, accedir a variables globals i interactuar amb el DOM directament.

| // Nivells de logconsole.log('informació general');console.warn('⚠️ Advertència');console.error('❌ Error crític');console.info('ℹ️ Informació');// Visualització de dadesconsole.table(usuaris);          // array d'objectes → taula navegableconsole.dir(element);            // propietats d'un element DOMconsole.group('API calls');      // agrupa logs relacionats  console.log('request:', url);  console.log('response:', data);console.groupEnd();// Mesura de tempsconsole.time('operació');calcularCosaLenta();console.timeEnd('operació');     // → "operació: 234ms"// Comprovació ràpidaconsole.assert(valor \> 0, 'Valor ha de ser positiu');  // log únicament si falla |
| :---- |

**El shorthand d'objecte** és la tècnica més útil per a debugging ràpid:

| const { preu, nom, categoria } \= producte;console.log({ preu, nom, categoria });// → { preu: 99, nom: "Portàtil", categoria: "Tecnologia" }// Mostra el nom de cada variable automàticament |
| :---- |

**Filtra per nivell:** a la barra d'eines de la Console, pots filtrar per tipus de missatge (Errors, Warnings, Info) per reduir el soroll quan tens molts logs.

**Sources: debugging avançat**

* **Blackboxing de scripts:** quan treballes amb llibreries de tercers com React o lodash, pots amagar-les del debugging. Clic dret sobre qualsevol frame d'una llibreria → "Add script to ignore list." Després del blackboxing, "Step Into" salta sobre els internals de la biblioteca i el call stack únicament mostra el teu codi.  
* **Workspace: edicions que persisteixen al disc:** Sources → Filesystem → "Add folder to workspace". Ara les edicions a DevTools es guarden al disc, i el navegador reflecteix els canvis sense recarregar. Els canvis al CSS s'apliquen instantàniament.  
* **Source Maps:** si el codi de producció és minificat o transpirat (TypeScript, JSX), DevTools usa els source maps per mostrar el codi original llegible al panell Sources. Pots posar breakpoints al TypeScript original i DevTools et du directament a aquella línia.  
* **Event Listener Breakpoints:** a Sources → panell dret → "Event Listener Breakpoints". Expandeix categories com "Mouse", "Keyboard", "XHR/Fetch" per posar breakpoints a qualsevol tipus d'event. Per exemple, activa XHR/fetch breakpoints → "Request is sent" per pausar a cada crida de xarxa i inspeccionar la petició abans que surti. O activa "click" sota "Mouse" per trobar quin handler s'activa en un clic concret, fins i tot si el click handler s'ha afegit dinàmicament.

**Device Mode: simular dispositius mòbils**

DevTools té un "Device Mode" que permet simular com es veu i es comporta la pàgina a diferents mides de pantalla i resolucions, que és excel·lent per testejar dissenys responsius.

Com activar-lo: `Ctrl+Shift+M` (o la icona de mòbil a la barra d'eines de DevTools). Pots seleccionar dispositius predefinits (iPhone 14, iPad, Pixel 7...) o definir dimensions personalitzades. Simula la ràtio de píxels del dispositiu i les condicions de xarxa mòbil simultàniament.

**Application: estat de l'app i storage**

El panell Application permet inspeccionar i gestionar tot l'emmagatzematge de l'aplicació:

* **Storage** — veure i editar `localStorage`, `sessionStorage` i `IndexedDB` en temps real. Útil per verificar que les dades persistides son correctes o per netejar l'estat per reproduir un bug.  
* **Cookies** — llistar totes les cookies, veure'n els atributs (HttpOnly, Secure, SameSite, expiració) i eliminar-ne individualment.  
* **Service Workers** — gestionar els service workers registrats, forçar actualitzacions i simular offline.  
* **Cache Storage** — veure el contingut de la caché de la Service Worker API.

**Lighthouse: auditoria automàtica**

Lighthouse executa una auditoria completa de la pàgina web, centrant-se en les millors pràctiques d'accessibilitat, SEO i rendiment. Els resultats ofereixen recomanacions accionables sobre com millorar cada una d'aquestes àrees.

Genera una puntuació de 0 a 100 per a cinc categories: Performance, Accessibility, Best Practices, SEO i PWA. Cada categoria llista les incidències trobades i com solucionar-les.

Comença sempre amb Lighthouse per tenir una visió global de les àrees a millorar. Després usa el panell Performance per investigar els colls d'ampolla específics i el Network per analitzar els recursos concrets.

**Firefox DevTools: les diferències principals**

Firefox DevTools ofereix les mateixes funcionalitats bàsiques amb algunes diferències notables:

* **Inspector** (equivalent al Elements de Chrome) — l'editor CSS de Firefox és considerat per molts developers superior al de Chrome per a debugging de CSS Grid i Flexbox: mostra visualment les línies de la graella, les àrees i les traces directament sobre la pàgina.  
* **Debugger** (equivalent al Sources de Chrome) — el debugger de Firefox és funcionalment equivalent. Suporta els mateixos tipus de breakpoints (condicionals, DOM, XHR, event listeners), el Call Stack i el Scope panel. La interfície visual és lleugerament diferent però les capacitats son les mateixes.  
* **CSS Grid Inspector i Flexbox Inspector** — una característica exclusiva de Firefox: en seleccionar un element Grid o Flexbox al Inspector, apareix un overlay visual que mostra les línies, àrees i distribució d'espai directament sobre la pàgina. Chrome ha adoptat una funcionalitat similar posteriorment però Firefox va ser el primer a implementar-ho bé.

**El mapa de panells: quin usar per a cada problema**

| Problema | Panell |
| ----- | ----- |
| L'element no es veu o té l'estil incorrecte | Elements → Styles |
| Un event no s'activa o no funciona | Elements → Event Listeners |
| Error de JavaScript a la consola | Console |
| Bug de lògica (valor incorrecte) | Sources → Breakpoint |
| Una petició falla o torna dades incorrectes | Network |
| La pàgina és lenta | Performance → Flame chart |
| Un recurs triga massa a carregar | Network → Timing |
| La pàgina pesa massa | Network → Size column |
| Memòria que creix sense parar | Memory |
| localStorage o cookies incorrectes | Application |
| Auditoria general de la pàgina | Lighthouse |
| Com es veu en mòbil | Device Mode |

