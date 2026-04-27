## **Construir un sistema de disseny a Figma i sistemes existents**

**Design Systems for Figma**  
[https://www.designsystemsforfigma.com/?languages=Angular](https://www.designsystemsforfigma.com/?languages=Angular)  
Col·lecció global de Design Systems integrats amb codi per a Figma.

**Build your design system**  
[https://help.figma.com/hc/en-us/articles/14548865734679-Lesson-3-Build-your-design-system](https://help.figma.com/hc/en-us/articles/14548865734679-Lesson-3-Build-your-design-system)  
Lliçó de Figma sobre la construcció de Design Systems.

**Què és una biblioteca a Figma?**

Les biblioteques (libraries) són col·leccions d'estils i components compartits dins d'un equip o organització. Estableixen consistència, agilitzen els fluxos de treball i mantenen els elements actualitzats en tots els dissenys. El procés és: selecciones els estils i components que vols compartir, els publiques com a biblioteca, l'equip hi accedeix per usar estils i components en els seus fitxers, i pots revisar i aplicar actualitzacions.

**Com construir un sistema de disseny a Figma: el procés pas a pas**

### **1\. Estructura la biblioteca**

Hi ha moltes maneres d'estructurar una biblioteca. En Figma, cada biblioteca publicada està vinculada a un fitxer. Pots mantenir-ho tot en un sol fitxer com a font única de veritat, o dividir-ho en fitxers individuals per adaptar-se millor a les necessitats del teu equip.

Per a un equip petit o un projecte nou, un sol fitxer és suficient. Quan el sistema creixi, pots separar-lo en: un fitxer per als estils fundacionals, una biblioteca d'icones dedicada, biblioteques de components separades per a web i mòbil.

Organitza el fitxer en pàgines: una pàgina de benvinguda per introduir el sistema, i pàgines separades per a Foundations, Components i Patterns.

### **2\. Convenció de noms: la clau de tot**

Abans de construir res, cal alinear-se en una convenció de noms. L'equip de Habitz va contactar amb el team d'enginyeria per alinear-se en una convenció comuna per facilitar el pas de disseny a codi. L'equip d'enginyeria ja usava camelCase per als seus elements en codi, de manera que van decidir usar el mateix enfocament per als noms de capes, components i props de components.

Figma usa la **convenció de barres inclinades** per crear jerarquia i grups:

color/primary/500  
typography/title/large  
icon/24/home  
elevation/4

Cada barra crea un nivell d'organització al panell d'assets.

### **3\. Construir les Foundations**

**Espaiat:** L'equip de Habitz usa una versió modificada d'un sistema de graella de 8 punts. Per fer-lo complir, defineixen layout guide styles i configuren el "big nudge" a 8 punts per facilitar l'alineació. Amb Auto Layout, mantenen els elements alineats a la graella de 8 punts assegurant-se que cada propietat és un múltiple de 8\.

**Colors:** Kai organitza els colors en quatre grups funcionals: els colors primaris de la marca amb diverses tintes i tons, una gamma de colors neutres per a elements i accions menys importants, una selecció de colors per definir els hàbits dels usuaris, i uns colors per a funcions específiques com accions destructives i alertes.

**Tipografia:** En Figma, el color d'una capa de text es defineix amb un color style, no amb un text style. Kai consolida qualsevol text diferenciat únicament per color. Identifica set combinacions úniques de propietats de text, les organitza en dos usos principals (title i body) i per mida (base, medium, large, extra large), i usa la convenció de barres per crear grups.

**Elevació (ombres):** Defineixen tres nivells d'elevació (4, 6 i 8 punts) alineats amb el sistema d'espaiat. Per aconseguir l'estil neo-brutalista, configuren el blur a zero i l'opacitat de l'ombra al 100%. Creen un effect style per a cadascun, agrupats sota la carpeta `elevation`.

### **4\. Construir components**

La Habitz equip usa els principis de l'Atomic Design per construir els components des de zero: els àtoms (com icones, inputs o botons) es combinen per formar molècules, que al seu torn formen organismes. Aquesta filosofia modular dona flexibilitat al sistema.

Per a les icones: col·loquen cada icona en un frame de 24x24 alineat a la graella d'icones, amb les dimensions de 16 i 32 per als altres dos tamanys. Amb totes les icones seleccionades, usen "Create multiple components" i apliquen la convenció de noms: `icon/size/name`.

Per als components amb variants: un component com el `dayToggle` necessita dos estats (seleccionat i no seleccionat). Kai crea el component, afegeix una variant usant "Create variant" al panell dret, nomena la propietat `isSelected` amb valors `true` i `false`, i afegeix una text component property anomenada `dayCharacter` per permetre als dissenyadors canviar el text.

### **5\. Patrons: components fixos**

A diferència dels components atòmics que ofereixen flexibilitat, els patrons són components fixos que s'han d'implementar sempre de la mateixa manera. Per exemple, la capçalera de Habitz sempre ha de contenir exactament un avatar, el logo i una icona de notificació en aquest ordre específic, de manera que es tracta com a patró i no com a component flexible.

**Design Systems per a Figma: recursos de la comunitat**

El lloc `designsystemsforfigma.com` recull sistemes de disseny de marques reals disponibles per a Figma, molts d'ells amb el codi corresponent. Alguns destacats:

**Material Design 3 (Google)** — la versió més actualitzada del sistema de disseny de Google. Disponible com a kit de Figma oficial amb tots els components i variables. Ideal per a projectes React amb Material UI.

**Atlassian Design System** — disponible per als equips que construeixen plugins o extensions per a Jira i Confluence. Inclou tota la biblioteca de components ADS en Figma.

**Apple Human Interface Guidelines** — el sistema de disseny per a iOS i macOS. Essencial si estàs dissenyant per a aplicacions de l'ecosistema Apple.

**Carbon (IBM)** — sistema de codi obert d'IBM per a productes empresarials. Molt documentat i amb components React.

**Shopify Polaris** — per a aplicacions i temes de Shopify. Inclou components d'e-commerce molt específics.

**Com usar un sistema de disseny existent a Figma**

El procés per integrar un sistema de disseny extern (com Material UI) al teu flux de Figma:

**Pas 1: Afegir la biblioteca** — a la Figma Community, busca el sistema de disseny que vols usar, duplica el fitxer al teu espai de treball i el publiques com a biblioteca del teu equip.

**Pas 2: Activar la biblioteca** — des de qualsevol fitxer de disseny, vas a Resources → Libraries i actives la biblioteca que has publicat. A partir d'aquí, tots els components apareixen al panell d'Assets.

**Pas 3: Usar els components** — arrossegues els components des del panell d'Assets al canvas. Pots personalitzar les instàncies (canviar text, icones, colors) sense afectar el component principal de la biblioteca.

**Pas 4: Mantenir-te actualitzat** — quan la biblioteca s'actualitza (perquè el sistema de disseny llança noves versions), Figma t'avisa i pots acceptar o rebutjar els canvis component per component.

**Resum: construir vs. usar un sistema existent**

|  | Construir el teu propi | Usar un d'existent |
| ----- | ----- | ----- |
| **Temps inicial** | Molt alt | Baix |
| **Personalització** | Total | Limitada (tematització) |
| **Manteniment** | A càrrec teu | A càrrec del proveïdor |
| **Accessibilitat** | Has de garantir-la tu | Normalment inclosa |
| **Quan té sentit** | Marca molt específica, equip gran | Projectes nous, equips petits |
| **Exemples** | Grans empreses tech | La majoria de projectes |

