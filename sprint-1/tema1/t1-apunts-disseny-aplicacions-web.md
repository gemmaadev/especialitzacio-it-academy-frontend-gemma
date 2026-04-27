## **Apunts tema 7 — Disseny d'Aplicacions Web**

**1\. Wireframe, mockup i prototip: les tres fases del disseny**

El disseny d'una interfície passa per tres fases progressives, cadascuna amb un propòsit diferent.

El **wireframe** és l'esquelet: una representació de baixa fidelitat en blanc, negre i gris que mostra l'estructura i la disposició dels elements sense cap detall visual. Respon a la pregunta *"on va cada cosa?"*. Es crea en minuts, es pot dibuixar a mà i és la fase ideal per explorar idees, validar fluxos de navegació i obtenir feedback honest sense que el client es distregui amb l'estètica.

El **mockup** és el disseny visual estàtic: alta fidelitat, amb colors reals, tipografia, imatges i branding. Respon a *"com quedarà exactament?"*. No és interactiu però mostra el producte final amb precisió. S'usa per validar decisions visuals amb clients i per lliurar especificacions als developers.

El **prototip** és la simulació interactiva. Pots clicar botons, navegar entre pantalles i provar el flux real. S'usa per fer tests d'usabilitat i validar l'experiència de l'usuari abans d'escriure codi.

**2\. Atomic Design: construir des de baix cap a dalt**

L'Atomic Design és una metodologia creada per Brad Frost que organitza els components d'una interfície en cinc nivells jeràrquics, com si fossin elements químics que es combinen.

Els **àtoms** són els elements més petits que no es poden dividir més: un botó, un input, una icona, un color. Les **molècules** combinen àtoms per crear alguna cosa amb un propòsit concret, com un formulari de cerca (label \+ input \+ botó). Els **organismes** són seccions completes formades per molècules, com una capçalera (logo \+ navegació \+ cerca). Les **plantilles** defineixen l'estructura d'una pàgina sense contingut real. Les **pàgines** són les plantilles amb contingut real.

La seva gran aportació és la reutilització: canvies un àtom una vegada i el canvi es propaga automàticament a totes les molècules, organismes i pàgines que l'usen. Encaixa perfectament amb frameworks com React, on tot es construeix amb components.

**3\. Carta gràfica: les regles visuals de la marca**

La carta gràfica és el manual d'instruccions visual d'una marca. Sense ella, cada persona de l'equip crea materials d'aspecte diferent i la marca perd coherència.

Els elements essencials que defineix: el **logo** (totes les versions, l'espai de protecció i els usos incorrectes), la **paleta de colors** (codis HEX, RGB i CMYK per a cada color, organitzats en primaris, secundaris, neutres i d'estat), la **tipografia** (famílies, mides, pesos i jerarquia H1-H6), la **iconografia** (estil, mida base i regles d'ús), la **graella i l'espaiat** (sistema de columnes i spacing), la **fotografia** (to i estil visual) i el **to de veu** (registre i personalitat de la marca).

Al codi, la carta gràfica es tradueix en **design tokens**: variables CSS que implementen cada decisió de disseny directament al codi.

**4\. Figma: l'eina central del disseny web**

Figma és l'eina de disseny UI/UX més usada en la indústria. Quatre conceptes fonamentals:

**Frames** — el contenidor bàsic de tot disseny a Figma. Equivalent a un `<div>` en HTML. Cada pantalla del disseny és un frame. Prems `F` per crear-ne un i pots seleccionar presets de dispositiu (iPhone, Desktop, etc.).

**Auto Layout** — la versió visual de CSS Flexbox. S'activa amb `Shift + A` i fa que el frame s'adapti automàticament al contingut. Pots configurar la direcció (horitzontal o vertical), el padding, el gap entre elements i el comportament de redimensionament (Fixed, Hug o Fill). La combinació de frames d'Auto Layout niuats permet crear layouts complexos i responsius.

**Components** — elements reutilitzables que s'editen una sola vegada i s'actualitzen a tot arreu. El **component principal** (Main Component) és el mestre i les **instàncies** són les còpies. Usa la convenció de noms amb barres per crear jerarquia: `Button/Primary/Default`.

**Variants** — organitzen tots els estats d'un component en un sol contenidor. Per exemple, un botó pot tenir les propietats Mida (Small/Medium/Large), Estat (Default/Hover/Pressed/Disabled) i Tipus (Primary/Secondary/Ghost). Quan uses el botó, simplement selecciones la combinació de propietats que necessites.

**5\. Prototip Interactiu a Figma**

El prototipat a Figma connecta els frames amb interaccions per simular l'experiència real de l'aplicació. El procés: actives la pestanya "Prototype" (`Shift + E`), selecciones un element clicable (hotspot), arrossegues la connexió al frame de destinació i configures el trigger (On Click, Hover...), l'acció (Navigate To, Open Overlay...) i l'animació (Dissolve, Move In/Out, Smart Animate...).

Smart Animate és la interacció més potent: si dues pantalles consecutives tenen elements amb el mateix nom de capa, Figma anima la transició automàticament creant efectes de moviment fluids. Pots previsualitzar el prototip prement ▶ i compartir-lo via enllaç amb qualsevol persona sense necessitat de compte de Figma.

**6\. Storybook: documentar components**

Storybook és un entorn de desenvolupament aïllat que permet veure, provar i documentar components de manera independent de l'aplicació. No cal arrencar tota l'app per veure un component en un estat concret.

Cada **story** descriu un estat específic d'un component: "aquí tens el botó primari en estat disabled". El fitxer `.stories.tsx` viu al costat del component i Storybook el detecta automàticament. L'addon Controls genera un panell interactiu per modificar les props del component en temps real.

Els beneficis principals: permet el desenvolupament en aïllament (treballes en el component sense context de l'app), genera documentació automàtica a partir de les stories, facilita el testing (les stories es poden reutilitzar amb Jest, Playwright o Chromatic), i és una referència visual per a tothom de l'equip (developers, dissenyadors, QA i product managers).

**7\. Design tokens: la connexió entre disseny i codi**

Els design tokens són variables amb nom significatiu que emmagatzemen decisions de disseny: colors, tipografia, espaiat, ombres, radis... En lloc d'escriure `#3B82F6` directament al CSS, escrius `var(--color-primary)`.

S'organitzen en tres nivells: els **tokens primitius** defineixen tots els valors possibles (`--blue-600: #2563EB`), els **tokens semàntics** donen context d'ús (`--color-primary: var(--blue-600)`) i els **tokens de component** són específics d'un component concret (`--button-background: var(--color-primary)`).

El sistema de colors usa escales de 50 a 900 per a cada color, amb tokens semàntics per propòsit (no per aparença). L'espaiat usa una base de 8px. La tipografia defineix escala, pesos i interlineat. Tots s'implementen com a variables CSS a `:root` i permeten canvis globals en una sola línia, incloent el dark mode.

**8\. Sistemes de disseny existents**

Un sistema de disseny és una col·lecció de components reutilitzables, guies, tokens i documentació per construir productes digitals de manera consistent. Usar-ne un d'existent estalvia mesos de feina però limita la personalització de la marca.

**Material UI (MUI)** — el sistema de Google per a React. Codi obert (MIT), amb més de 2.500 contribuïdors. S'instal·la amb `npm install @mui/material @emotion/react @emotion/styled`. Permet personalitzar completament els colors, la tipografia i l'espaiat via `createTheme`. Ideal per a projectes React de qualsevol mida.

**Atlassian Design System** — el sistema que unifica Jira, Confluence i Trello. Molt complet en components empresarials, documentació extensa i guies de contingut. Ideal per a eines de gestió i col·laboració o per a plugins i extensions dels productes d'Atlassian.

**Finastra** — sistema especialitzat per al sector financer i bancari. Components per a taules de dades complexes, gràfics financers i panells d'informació densa. Accessibilitat molt estricta per complir regulació del sector.

La regla per triar: usa un sistema existent per a la majoria de projectes (és molt més ràpid i ja té accessibilitat garantida). Construeix el teu propi únicament quan la identitat de marca és molt específica o quan els components existents no cobreixen el teu domini.

**9\. Com s'integra tot: el flux de treball**  
1\. Carta gràfica → defineix colors, tipografia i estils visuals  
         ↓  
2\. Design Tokens → translada la carta gràfica a variables CSS  
         ↓  
3\. Atomic Design → organitza els components per nivells  
         ↓  
4\. Figma: Frames \+ Auto Layout \+ Components \+ Variants  
   → construeix el sistema de disseny visual  
         ↓  
5\. Wireframe → estructura i flux (sense estètica)  
   Mockup → disseny visual estàtic (amb estètica)  
   Prototip → interactivitat simulada  
         ↓  
6\. Storybook → documenta els components per al team  
         ↓  
7\. Codi → implementa els tokens i components al projecte

**10\. Taula resum**

| Concepte | Per a què serveix | Eina |
| ----- | ----- | ----- |
| **Wireframe** | Validar estructura i flux | Figma, Balsamiq, paper |
| **Mockup** | Validar estètica i branding | Figma, Adobe XD |
| **Prototip** | Testar experiència interactiva | Figma (Prototype mode) |
| **Atomic Design** | Organitzar components reutilitzables | Figma, React |
| **Carta gràfica** | Definir identitat visual de la marca | Figma, document |
| **Design Tokens** | Connectar disseny i codi | CSS Variables, JSON |
| **Storybook** | Documentar i testar components | Storybook \+ React |
| **Material UI** | Sistema de components React (Google) | npm \+ React |
| **Atlassian DS** | Sistema per a eines empresarials | npm \+ React |

