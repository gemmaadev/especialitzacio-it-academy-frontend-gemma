## **Accessibilitat web: Guia fonamental**

**Accesibility on the web (MDN)**  
[https://developer.mozilla.org/en-US/docs/Learn\_web\_development/Core/Accessibility](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility)  
Guia MDN per construir webs accessibles per a tothom.

**Resources on Accessibility \- The A11Y Project**  
[https://www.a11yproject.com/resources/](https://www.a11yproject.com/resources/)  
Recull de recursos pràctics per millorar l’accessibilitat web.

**Què és l'accessibilitat i per a qui importa?**

L'accessibilitat web vol dir que els llocs i aplicacions web estan dissenyats i construïts de manera que tothom els pugui usar, incloent persones amb discapacitats visuals, motores, auditives o cognitives. L'accessibilitat és un requisit fonamental de l'enginyeria de software professional. Si la teva aplicació no pot ser usada per algú que navega amb un teclat, que depèn d'un lector de pantalla, o que té visió reduïda, has lliurat un producte trencat.

Les tecnologies d'assistència que cal tenir en compte inclouen lectors de pantalla, teclats alternatius, dispositius d'entrada alternatius, software de reconeixement de veu i amplificadors de pantalla.

**WCAG: els estàndards de referència**

Les **Web Content Accessibility Guidelines (WCAG)** són l'estàndard internacional d'accessibilitat web. S'organitzen en tres nivells:

**Level A** — el mínim absolut. Cobreix les barreres més crítiques.

**Level AA** — el nivell legalment defensable que cobreix la gran majoria de necessitats dels usuaris. Afegeix requisits de contrast de color (4.5:1 per a text normal, 3:1 per a text gran), redimensionament de text fins al 200% sense pèrdua de funcionalitat, accessibilitat de teclat per a tots els elements interactius, i patrons de navegació consistents. Per a la majoria de projectes, el target ha de ser el Level AA.

**Level AAA** — el més exigent. Requereix ràtios de contrast de 7:1 i altres criteris avançats. Rarament assolible en tot un lloc.

**Els quatre principis de WCAG: POUR**

**Perceptible** — la informació ha de poder ser percebuda per tots els sentits. Text alternatiu per a imatges, subtítols per a vídeos, contrast de color adequat.

**Operable** — tota la funcionalitat ha de ser operable. Navegació per teclat completa, temps suficients, sense contingut que pugui causar atacs epilèptics.

**Comprensible** — la informació i el funcionament de la interfície han de ser comprensibles. Llengua clara, comportament predictible, ajuda per als errors.

**Robust** — el contingut ha de poder ser interpretat per la màxima varietat d'agents d'usuari. HTML vàlid i semàntic, compatibilitat amb tecnologies d'assistència.

**HTML Semàntic: la base de tot**

La cosa més impactant que pots fer per a l'accessibilitat és usar els elements HTML correctes. Els elements semàntics porten significat i comportament implícit que les tecnologies d'assistència entenen nativament. Un `<button>` té focus, és activable amb Enter i Space, i és anunciat com a botó pels lectors de pantalla.

Usar elements HTML semàntics com `<nav>`, `<main>`, `<header>`, `<footer>`, `<button>` i `<form>` dona estructura i significat a la pàgina. Proporcionen suport automàtic de teclat sense scripting addicional, millora la interpretació pels lectors de pantalla i millora el SEO.

La regla d'or:

| \<\!-- ❌ Evitar: perd tota l'accessibilitat nativa \--\>\<div class="button" onclick="submit()"\>Enviar\</div\>\<\!-- ✅ Usar: accessibilitat inclosa automàticament \--\>\<button type="submit"\>Enviar\</button\> |
| :---- |

**WAI-ARIA: quan l'HTML no és suficient**

WAI-ARIA (Web Accessibility Initiative — Accessible Rich Internet Applications) adreça les situacions on l'HTML natiu no cobreix les necessitats d'accessibilitat. ARIA proporciona un marc per afegir atributs que identifiquen funcionalitats per a la interacció d'usuari, com es relacionen entre elles i el seu estat actual.

Les quatre àrees principals on ARIA és útil:

Landmarks (regions) per a navegació, widgets per a components d'UI que no existeixen nativament en HTML, live regions per a contingut que s'actualitza dinàmicament, i relacions entre elements que no es poden expressar amb HTML sol.

**La regla número 1 d'ARIA:** Si pots usar un element HTML natiu o atribut amb la semàntica i el comportament que necessites ja integrats, en lloc de reutilitzar un element i afegir un rol, estat o propietat ARIA per fer-lo accessible, llavors fes-ho. ARIA és un suplement, no un substitut de l'HTML correcte.

**Els tres tipus d'atributs ARIA**

**Roles** — defineixen el propòsit d'un element:

| \<\!-- Quan un div fa de botó (evitable sempre que sigui possible) \--\>\<div role="button" tabindex="0"\>Acció\</div\>\<\!-- Landmarks per a regions \--\>\<div role="main"\>Contingut principal\</div\>\<div role="navigation"\>Navegació\</div\>\<div role="search"\>Formulari de cerca\</div\>\<\!-- Widgets complexos \--\>\<ul role="tablist"\>  \<li role="tab" aria-selected="true"\>Pestanya 1\</li\>\</ul\> |
| :---- |

**Propietats** — informació adicional persistent sobre un element:

| \<button aria-label="Tancar diàleg"\>×\</button\>\<nav aria-labelledby="nav-title"\>...\</nav\>\<input aria-required="true" aria-describedby="error-msg" /\> |
| :---- |

**Estats** — informació dinàmica que canvia:

| \<button aria-expanded="false" aria-controls="menu"\>  Obrir menú\</button\>\<div id="menu" hidden\>...\</div\>\<\!-- Quan s'obre: aria-expanded="true" \+ eliminar hidden \--\> |
| :---- |

**Live Regions: actualitzacions dinàmiques**

Els lectors de pantalla tendeixen a tenir dificultats per reportar contingut que canvia constantment. Amb ARIA podem usar `aria-live` per informar els usuaris de lectors de pantalla quan una àrea de contingut s'actualitza dinàmicament, per exemple, quan JavaScript en la pàgina obté nou contingut del servidor i actualitza el DOM.

| \<\!-- Missatges d'error: anunciat immediatament \--\>\<span role="alert" aria-live="assertive"\>  \<\!-- Els errors injectats aquí es llegiran de seguida \--\>\</span\>\<\!-- Notificacions no crítiques: anunciat quan és convenient \--\>\<div aria-live="polite" aria-atomic="true"\>  \<\!-- Per exemple: "S'ha guardat correctament" \--\>\</div\> |
| :---- |

`polite` — anuncia quan l'usuari fa una pausa. `assertive` — anuncia immediatament, interrumpint si cal. Usa `assertive` amb molta moderació, únicament per a errors crítics.

**Navegació per teclat: el test fonamental**

Tota funcionalitat interactiva de la pàgina ha de ser operable amb teclat sol. Abans d'obrir mai un lector de pantalla, desendolla el ratolí i intenta usar l'aplicació. Si no pots completar cada tasca amb Tab, Enter, Space, Escape i les tecles de fletxa, tens un problema.

Les tecles estàndard que cal suportar:

| Tecla | Funció estàndard |
| ----- | ----- |
| `Tab` | Avançar entre elements interactius |
| `Shift + Tab` | Retrocedir entre elements interactius |
| `Enter` | Activar links i botons |
| `Space` | Activar botons, checkboxes |
| `Escape` | Tancar diàlegs i menús |
| Fletxes | Navegar dins de components compostos |

**`tabindex`:**

`tabindex="0"` posa un element en l'ordre natural de tabulació. Usar en elements interactius personalitzats que no reben focus nativament. `tabindex="-1"` elimina un element de l'ordre de tabulació però permet que rebi focus programàticament, útil per a la gestió de focus en modals. Mai usar valors positius de tabindex: creen un ordre de tabulació confús que és quasi impossible de mantenir.

**Gestió del focus: modals i components complexos**

Quan obres un modal, el focus ha de moure's cap a dins del modal. Quan el modal es tanca, el focus ha de tornar a l'element que el va disparar.

| // Obrir modal: moure focusfunction openModal(modal, trigger) {  modal.removeAttribute('hidden');  modal.setAttribute('aria-modal', 'true');  // Mou el focus al primer element focusable del modal  modal.querySelector('button, input, \[tabindex="0"\]').focus();}// Tancar modal: retornar focusfunction closeModal(modal, trigger) {  modal.setAttribute('hidden', '');  trigger.focus();  // retorna al botó que va obrir el modal} |
| :---- |

**Eines per testar l'accessibilitat**

Les eines d'auditoria inclouen Firefox Accessibility Inspector, l'ANDI bookmarklet, Wave i les auditories d'accessibilitat de Google Lighthouse.

**Eines gratuïtes:**

* **Lighthouse** (Chrome DevTools) — auditoria automàtica d'accessibilitat amb puntuació i recomanacions  
* **WAVE** (wave.webaim.org) — extensió que visualitza els errors directament sobre la pàgina  
* **axe DevTools** — extensió que detecta fins al 57% dels problemes WCAG automàticament  
* **Color Contrast Checker** (webaim.org) — comprovació de ràtios de contrast

**Test manual imprescindible:**

Navegar per la pàgina únicament amb el teclat (Tab, Shift+Tab, fletxes) i verificar que tot és accessible. Provar amb un lector de pantalla real: VoiceOver (macOS/iOS) o NVDA (Windows, gratuït).

**Resum** 

Comença amb HTML semàntic. Usa `<button>` per a accions, `<a>` per a navegació, `<input>` per a entrada de dades. ARIA és un suplement, no un substitut de l'HTML correcte. Testa amb el teclat primer. Proporciona indicadors de focus visibles en cada element interactiu. Etiqueta-ho tot. No deshabilitis el zoom.

| Regla | Implementació |
| ----- | ----- |
| HTML semàntic primer | `<button>`, `<nav>`, `<main>`, `<header>`... |
| ARIA només si cal | Quan HTML no té l'element adequat |
| Focus sempre visible | `:focus-visible` amb outline clar |
| Contrast mínim 4.5:1 | Verificar amb eines de contrast |
| Teclat per a tot | Tab, Enter, Space, Escape, fletxes |
| Etiquetes per a tot | `<label>`, `aria-label`, `aria-labelledby` |
| Imatges amb `alt` | Descriptiu si informativa, `alt=""` si decorativa |
| Errors de formulari | `role="alert"` \+ missatge clar |
| Mai eliminar `:focus` | Usar `:focus-visible` com a alternativa |

