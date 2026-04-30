## **Metodologies CSS: BEM, OOCSS i SMACSS**

**Per què calen metodologies CSS?**

Gestionar el CSS a escala és un dels reptes més difícils en el desenvolupament frontend. A mesura que els projectes creixen, el CSS pot tornar-se fràgil, difícil de mantenir i propens a efectes secundaris no desitjats a causa de l'herència excessiva i l'especificitat no controlada.

Els problemes típics sense metodologia: cadenes de selectors profundes (.header .menu ul li a span), especificitat incontrolable que fa impossible sobreescriure estils, CSS mort que ningú s'atreveix a eliminar per por de trencar alguna cosa, i estils que es contaminen entre components. Les metodologies ofereixen regles clares que eviten tots aquests problemes.

**BEM: Block, Element, Modifier**

BEM és una metodologia popular que imposa una convenció de naming estricta per mantenir el CSS mantenible. La convenció de noms recomanada per BEM és block-name\_\_element-name--modifier-name.

En BEM, un **bloc** és l'embolcall exterior d'un component, que representa una part diferenciada de la UI. Un **element** és una part del bloc que no té significat per si sola. Un **modificador** és una variant o estat del bloc o l'element.

| \<\!-- Exemple: component de targeta amb BEM \--\>\<article class="card card--featured"\>  \<img class="card\_\_image" src="foto.jpg" alt="..." /\>  \<div class="card\_\_content"\>    \<h2 class="card\_\_title"\>Títol\</h2\>    \<p class="card\_\_text"\>Descripció...\</p\>    \<a class="card\_\_link card\_\_link--primary" href="\#"\>Llegir més\</a\>  \</div\>\</article\> |
| :---- |

| /\* .card → bloc \*/.card {  border: 1px solid \#e5e7eb;  border-radius: 8px;  overflow: hidden;}/\* .card--featured → modificador del bloc \*/.card--featured {  border-color: \#3B82F6;  box-shadow: 0 4px 6px rgba(0,0,0,0.1);}/\* .card\_\_image → element del bloc \*/.card\_\_image {  width: 100%;  height: 200px;  object\-fit: cover;}/\* .card\_\_link--primary → modificador d'un element \*/.card\_\_link--primary {  color: \#3B82F6;  font-weight: bold;} |
| :---- |

**Per què BEM millora el CSS:**

La convenció de naming de BEM ajuda els autors de CSS a complir el principi OOCSS d'usar una jerarquia de selectors plana composta de selectors de classe d'igual especificitat. També ajuda els autors a evitar selectors descendents profunds.

Amb BEM, cada classe té l'especificitat d'exactament una classe, sigui quina sigui. Mai tens problemes d'especificitat perquè totes les classes pesen el mateix.

**Desavantatges:** els noms de classe poden ser llargs i semblar estranys al principi. L'HTML pot tenir moltes classes.

**OOCSS: Object-Oriented CSS**

OOCSS és una metodologia CSS que promou la modularitat, la reutilització i la separació de responsabilitats. Advoca per tractar les classes CSS com a objectes, encapsulant els seus estils i propietats, i usant-los per compondre interfícies d'usuari. OOCSS opera sobre dues regles principals: separació d'estructura i skin, i separació de contenidor i contingut.

**Principi 1: Separació d'estructura i skin**

L'estructura defineix layout, posicionament i mides (les propietats que no es veuen). El skin defineix l'aparença visual (colors, tipografia, ombres).

| /\* Estructura: layout i mides \*/.box {  display: block;  padding: 1rem;  border-radius: 8px;}/\* Skins: aparença visual separada \*/.box--primary {  background-color: \#3B82F6;  color: white;}.box--secondary {  background-color: \#f3f4f6;  color: \#374151;}.box--danger {  background-color: \#FEE2E2;  color: \#DC2626;} |
| :---- |

Ara pots combinar estructura i skin lliurement: \<div class="box box--primary"\>, \<div class="box box--danger"\>.

**Principi 2: Separació de contenidor i contingut**

Un element no hauria de dependre del seu contenidor per tenir l'estil correcte. Evita selectors com .sidebar .button (l'estil del botó depèn d'on és).

| /\* ❌ OOCSS violació: el botó depèn del contenidor \*/.sidebar .button {  font-size: 0.875rem;}/\* ✅ OOCSS correcte: el botó és independent \*/.button--sm {  font-size: 0.875rem;} |
| :---- |

La part crítica d'OOCSS és el canvi de paradigma, no quina eina o metodologia uses. Aprendre a pensar en components, identificar-los i codificar-los de manera independent millorarà dràsticament la teva feina.

**SMACSS: Scalable and Modular Architecture for CSS**

SMACSS proporciona un enfocament flexible i escalable per organitzar estils en projectes web grans. Està dissenyat per ajudar els developers a gestionar i mantenir el CSS d'una manera modular, millorant tant la reutilització com l'escalabilitat. SMACSS no prescriu convencions de naming estrictes com BEM, sinó que es centra a crear una estructura clara per categoritzar les regles CSS basant-se en el seu propòsit.

SMACSS organitza tot el CSS en cinc categories:

**Base** — estils per defecte per a elements HTML: resets, tipografia global, body, h1-h6, a. Mai uses classes aquí.

| body { font-family: 'Inter', sans-serif; line-height: 1.5; }h1 { font-size: 2rem; }a { color: \#3B82F6; } |
| :---- |

**Layout** — l'estructura de la pàgina: header, footer, sidebar, grid. Les classes de layout usen el prefix l- o layout-.

| .l-header { position: sticky; top: 0; }.l-sidebar { width: 250px; }.l-main { flex: 1; } |
| :---- |

**Module** — components reutilitzables independents: botons, targetes, formularis. La majoria del CSS viu aquí.

| .card { border: 1px solid \#e5e7eb; border-radius: 8px; }.button { padding: 0.5rem 1rem; border-radius: 6px; } |
| :---- |

**State** — estats d'un mòdul o layout. Usen el prefix is- o has-.

| .is-hidden { display: none; }.is-active { background-color: \#3B82F6; }.is-disabled { opacity: 0.5; cursor: not-allowed; }.has-error { border-color: \#DC2626; } |
| :---- |

**Theme** — variacions de colors o estils per a tematització (dark mode, marca alternativa).

| .theme-dark .card { background: \#1f2937; color: \#f9fafb; } |
| :---- |

SMACSS afavoreix la separació de responsabilitats, promovint la reutilització i l'escalabilitat, i ajuda a organitzar codebases grans de manera lògica.

**Comparació de les tres metodologies**

|  | BEM | OOCSS | SMACSS |
| ----- | ----- | ----- | ----- |
| **Enfocament** | Naming de classes | Separació de responsabilitats | Organització per categories |
| **Estructura** | Block\_\_Element--Modifier | Estructura \+ Skin | Base / Layout / Module / State / Theme |
| **Especificitat** | Sempre una classe | Sempre una classe | Variable |
| **Naming** | Molt estricte | Flexible | Semi-estricte (prefixos) |
| **Ideal per a** | Components complexos, equips grans | Màxima reutilització | Projectes grans i escalables |
| **Dificultat** | Mitjana | Baixa (concepte) | Baixa-mitjana |

**Com es complementen**

BEM, SMACSS i OOCSS no són mútuament excloents: comparteixen principis complementaris que ajuden a escriure CSS predictible, mantenible i escalable. Abraçant selectors plans basats en classes, separant responsabilitats i gestionant l'especificitat, el codi frontend romandrà robust fins i tot quan el projecte creixi.

En la pràctica, molts equips combinen les tres: SMACSS per a l'organització dels fitxers i carpetes, OOCSS per al principi de separació estructura/skin, i BEM per a la convenció de naming dels components. El resultat és una arquitectura CSS clara, predictible i fàcil de mantenir per a tothom de l'equip.

**Les regles principals que totes comparteixen**

**Selectores plans** — evita selectors profunds com .nav .list .item .link. Usa classes directes.

**Especificitat baixa i uniforme** — mai uses \#id per a estils. Una classe \= una especificitat. Fàcil de sobreescriure.

**No anidament excessiu** — tant a CSS pur com a SCSS, màxim 2-3 nivells.

**Classes semàntiques** — el nom de la classe ha de comunicar el propòsit, no l'aparença. .button--primary és millor que .button--blue.

**Un component \= un fitxer** — en projectes grans, cada component té el seu propi fitxer CSS/SCSS. Facilita trobar i modificar estils.

