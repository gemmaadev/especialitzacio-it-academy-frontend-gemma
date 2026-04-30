## **Sistemes de disseny i storybook**

**Què és un sistema de disseny?**

A l'arrel, un sistema de disseny és un llenguatge compartit per construir la interfície d'usuari. Cobreix els fonaments com colors, tipografia, espaiat i iconografia, però la clau és que no es tracta únicament de com les coses es veuen. Es tracta de com funcionen, com es construeixen i com pots usar-les en múltiples projectes sense perdre la coherència.

En termes pràctics, un sistema de disseny és un **repositori centralitzat** que conté tres coses: els **design tokens** (les variables de colors, tipografia, espaiat), la **biblioteca de components** (els elements reutilitzables) i la **documentació** (les guies d'ús per a tot l'equip).

**Per què és necessari?**

Sense una font única de veritat, la interfície d'usuari deriva lentament de la intenció original del disseny. Això crea fricció amb els dissenyadors i erosiona la qualitat global del producte. Els developers nous no saben quins components usar ni on trobar-los, de manera que o bé reconstrueixen coses o bé fan un ús incorrecte del que hi ha. No tenir una font única de veritat \= una UI fragmentada i fràgil.

Amb un sistema de disseny, quan tothom hi està alineat: s'estalvia temps (no cal reimplementar el mateix botó en deu projectes), es garanteix consistència visual, i quan un component es corregeix o millora, tots els projectes que l'usen es beneficien automàticament.

**Les tres capes d'un sistema de disseny**

Les peces que específicament cal codificar en un sistema de disseny són: una biblioteca de components, design tokens i un lloc web de documentació. Cal tenir en compte que aquestes tres coses són únicament algunes de les possibles peces que poden conformar el sistema de disseny d'un negoci.

**1\. Design Tokens** — les variables CSS amb nom significatiu (`--color-primary`, `--spacing-md`, `--font-size-lg`). Representen les decisions de disseny més primitives i es distribueixen per tota l'aplicació. Eines com Style Dictionary o Figma Tokens Plugin permeten exportar-los en el format necessari per a cada plataforma (web, iOS, Android).

**2\. Biblioteca de components** — una biblioteca de components consisteix en un conjunt bàsic de components reutilitzables que es poden compartir àmpliament. Els components han de preocupar-se únicament de presentar la UI i no han de contenir cap lògica de negoci. Idealment la biblioteca permet simular tots els estats possibles que un component pot prendre en l'aplicació.

**3\. Documentació** — les guies d'ús, principis d'accessibilitat, exemples de codi i directrius per a contributors. Sense documentació, el sistema de disseny existeix però ningú sap com usar-lo correctament.

**Storybook: el taller del sistema de disseny**

Storybook és un potent entorn de taller de frontend que permet als equips dissenyar, construir i organitzar components de UI (i fins i tot pantalles completes\!) sense ensopegar amb la lògica de negoci i la "plomeria" de l'aplicació.

A Storybook, cada component es desenvolupa en aïllament, assegurant-se que funciona correctament abans d'integrar-lo a l'aplicació més gran. Storybook serveix com a font única de veritat per a tots els components d'un sistema de disseny, ajudant els equips a mantenir la consistència mentre permet un desenvolupament i una iteració ràpids.

**Les Stories: el cor de Storybook**

Les stories capturen els estats "conegudament bons" dels components de UI. Són una manera pragmàtica i reproduïble de mantenir el seguiment dels casos límit de la UI. Storybook les usa per alimentar els tests automatitzats.

Una story és essencialment: "aquí tens el component `Button` en el seu estat `disabled` amb el text `Enviar`". Cada component pot tenir múltiples stories, cadascuna mostrant un estat o variació diferent:

| // Button.stories.tsimport type { Meta, StoryObj } from '@storybook/react';import { Button } from './Button';const meta \= {  component: Button,  title: 'Components/Button',  tags: \['autodocs'\],  // genera documentació automàtica} satisfies Meta\<typeof Button\>;export default meta;type Story \= StoryObj\<typeof meta\>;export const Primary: Story \= {  args: { label: 'Botó primari', variant: 'primary' }};export const Disabled: Story \= {  args: { label: 'Desactivat', disabled: true }};export const Loading: Story \= {  args: { label: 'Carregant...', loading: true }}; |
| :---- |

**Les quatre maneres de documentar amb Storybook**

Teams que ja usen Storybook per construir els components del sistema de disseny escriuen stories per demostrar com s'usa cada component. L'addon Docs usa aquestes stories per auto-generar documentació per a cada component. Hi ha quatre maneres provades que els sistemes de disseny reals usen Storybook per millorar la documentació: l'addon Docs integrat, eines especialitzades com Zeroheight, Supernova o InVision DSM, llocs web personalitzats, i eines de documentació genèriques com Notion o Confluence.

**Addon Docs** — genera automàticament una pàgina de documentació per a cada component a partir de les stories i els tipus TypeScript. Inclou exemples de codi, la taula de props interactiva i les stories renderitzades en viu.

**Controls** — pannell interactiu que permet modificar les props del component en temps real sense tocar codi. Ideal perquè dissenyadors provin variacions.

**Storybook no és únicament per a developers**

Storybook ara juga un paper crític en reduir la bretxa entre disseny i desenvolupament, millorant la col·laboració, testant casos límit i proporcionant una font única de veritat entre equips. I la millor part és que els dissenyadors no necessiten saber programar.

Storybook ajuda els equips a construir un vocabulari compartit entre disseny i enginyeria, donar feedback en temps real durant el desenvolupament de components, i reduir problemes de handoff fent que el component en si mateix sigui l'especificació.

L'addon d'accessibilitat és especialment valuós: mostra automàticament el nivell d'accessibilitat de cada component, quines regles WCAG es violen i quines passen, tot sense sortir de Storybook.

**L'ecosistema d'eines complementàries**

Storybook és l'estàndard de la indústria per a les biblioteques de components. Al seu voltant existeix un ecosistema d'eines complementàries:

**Chromatic** — plataforma de visual testing creada per l'equip de Storybook. Detecta automàticament canvis visuals entre versions comparant captures de pantalla pixel a pixel. Essencial per a equips que volen assegurar que cap canvi de codi trenca l'aparença dels components.

**Style Dictionary** — eina per gestionar i exportar design tokens en múltiples formats (CSS variables, JSON, SASS, iOS, Android). Permet tenir una sola font de tokens que es transforma automàticament al format que necessita cada plataforma.

**Figma \+ Storybook** — la integració story.to.design permet vincular directament els fitxers de Figma o fins i tot incorporar components de tornada a Figma, creant un pont bidireccional entre les eines de disseny i de desenvolupament.

**Zeroheight / Supernova** — eines especialitzades per a la documentació de sistemes de disseny que permeten combinar contingut escrit, design tokens, components de Figma i stories de Storybook en una sola plataforma de documentació.

**Construir vs. Adoptar un sistema existent**

Per als equips que prioritzen el desenvolupament ràpid i la simplicitat, aprofitar un sistema de disseny pre-construït (com Material UI, Atlassian o Carbon d'IBM) i usar Storybook per al desenvolupament interactiu de components és sovint el millor camí. No obstant, per a equips més grans o productes amb branding i necessitats de UI únics, construir un sistema de disseny personalitzat amb Storybook al seu cor assegura consistència, escalabilitat i una experiència d'usuari polida.

La regla pràctica: si el teu producte té una identitat visual molt específica o gestiones múltiples productes o plataformes, val la pena invertir en un sistema de disseny propi. Per a la majoria de projectes, adoptar un sistema existent i personalitzar-lo és molt més eficient.

**Resum: com s'encaixa tot**

Figma (disseny visual)  
       ↓ Tokens exportats  
Style Dictionary (tokens multi-plataforma)  
       ↓ Variables CSS / JSON  
Biblioteca de Components (React \+ TypeScript)  
       ↓ Stories documentades  
Storybook (taller \+ documentació interactiva)  
       ↓ Tests visuals automatitzats  
Chromatic (visual regression testing en CI)  
       ↓ Publicat com a lloc web  
Equip sencer (developers \+ dissenyadors \+ QA \+ PMs)

