## **Atomic Design: reutilització de components per a l'escalabilitat**

**Què és l'Atomic Design?**

L'Atomic Design és una metodologia per crear interfícies d'usuari (UI) proposada per Brad Frost. Inspirada en conceptes de química, organitza els components de disseny digital de manera modular i escalable. El seu objectiu principal és crear sistemes de disseny consistents, reutilitzables i fàcils de mantenir.

La idea central és senzilla: en lloc de dissenyar pàgines senceres des de zero cada vegada, construeixes una biblioteca de components petits i reutilitzables que combineixes per crear qualsevol interfície. És com construir amb un conjunt de peces LEGO perfectament organitzades: tot encaixa, i cada peça té un rol a jugar.

**Els cinc nivells de l'Atomic Design**

Inspirat en la química, l'Atomic Design de Brad Frost té cinc nivells: Àtoms, Molècules, Organismes, Plantilles i Pàgines. Cada nivell és un bloc de construcció que porta al següent. Comença petit i creix a mesura que avances.

**Nivell 1: Àtoms**

Els àtoms són els blocs de construcció més petits i fonamentals d'un sistema de disseny. Són els elements HTML bàsics com botons, camps de text, etiquetes i icones que serveixen un propòsit singular i no es poden descompondre més.

Exemples concrets d'àtoms: un botó, un camp d'input, una etiqueta de text, una icona de cerca, un color del sistema, una mida de lletra, una animació de hover.

La clau dels àtoms és que siguin **simples, consistents i reutilitzables**. Si canvies un àtom (per exemple, el color d'un botó primari), el canvi es propaga automàticament a tot arreu on s'usa.

**Nivell 2: Molècules**

Un formulari de cerca es pot trobar sovint a la capçalera de moltes webs, i és un exemple perfecte de molècula. Està format per un àtom d'etiqueta, un àtom d'input i un àtom de botó. Quan es combinen, aquests àtoms abstractes adquireixen de cop un propòsit. L'etiqueta defineix l'input. Clicar el botó envia el formulari. El resultat és un component simple, portable i reutilitzable que es pot col·locar a qualsevol lloc on es necessiti funcionalitat de cerca.

Crear components simples ajuda els dissenyadors i developers de UI a adherir-se al principi de responsabilitat única: un component ha de "fer una sola cosa i fer-la bé". Sobrecarregar un patró amb massa complexitat fa el software difícil de gestionar.

**Nivell 3: Organismes**

Els organismes són components de UI relativament complexos compostos per grups de molècules i/o àtoms i/o altres organismes. Aquests organismes formen seccions diferenciades d'una interfície. Una capçalera d'un lloc web, per exemple, és un organisme compost per una molècula de formulari de cerca, un àtom de logo i una molècula de navegació principal. La capçalera forma una secció independent de la interfície, tot i que conté diverses peces més petites amb les seves pròpies propietats i funcionalitat.

Altres exemples d'organismes: una targeta de producte (imatge \+ títol \+ preu \+ botó), un peu de pàgina complet, un formulari de login.

**Nivell 4: Plantilles (Templates)**

Les plantilles representen l'estructura d'una pàgina, organitzant organismes, molècules i àtoms per definir la seva disposició a la interfície. El seu rol és actuar com un marc per mostrar com els components s'interrelacionen en el disseny.

Les plantilles no contenen contingut real: usen text de reemplaçament i imatges de prova. Defineixen la disposició i l'estructura sense les distraccions del contingut final. Aquí és on es pot veure si l'estructura té sentit abans d'omplir-la.

**Nivell 5: Pàgines**

És en l'etapa de pàgina quan podem veure com tots aquells patrons aguanten quan s'aplica contingut real al sistema de disseny. Tot té bon aspecte i funciona com hauria de funcionar? Si la resposta és no, llavors podem tornar enrere i modificar les nostres molècules, organismes i plantilles per atendre millor les necessitats del contingut.

Les pàgines són la prova definitiva del sistema: si un component es trenca amb contingut real, cal tornar enrere i ajustar els nivells inferiors.

**La jerarquia completa visualitzada**  
Àtom: \[Botó\]  \[Input\]  \[Label\]  \[Icona\]  
         ↓        ↓        ↓  
Molècula: \[Label \+ Input \+ Botó \= Formulari de cerca\]  
                     ↓  
Organisme: \[Logo \+ Navegació \+ Formulari de cerca \= Header\]  
                     ↓  
Plantilla: \[Header \+ Hero \+ Grid de productes \+ Footer \= Layout\]  
                     ↓  
Pàgina: \[Layout \+ contingut real \= Pàgina d'inici real\]

**Com ajuda a la reutilització i l'escalabilitat**

Quan pensem en el nostre disseny en termes de blocs de construcció jeràrquics: dissenyem amb intenció (considerem on i com s'usarà cada cosa), creem components reutilitzables (build once, use everywhere), mantenim consistència (una sola font de veritat per a cada patró), i comuniquem clarament (vocabulari compartit per a decisions de disseny).

En pràctica: si tens 50 pàgines que usen el mateix botó primari i decideixes canviar el color, sense Atomic Design hauràs de canviar-lo 50 vegades. Amb Atomic Design, canvies l'àtom de botó una sola vegada i el canvi es propaga a tot arreu automàticament.

És fàcil verificar que qualsevol ajust a un component es trasllada a totes les altres instàncies del lloc, perquè només s'està modificant un sol àtom, molècula o organisme en un moment donat. Els components no desitjats també es poden eliminar fàcilment.

**Atomic Design en el codi: React com a exemple natural**

L'Atomic Design encaixa perfectament amb frameworks com React, on tot es construeix amb components. L'estructura de carpetes típica segueix directament els nivells:

src/  
└── components/  
    ├── atoms/  
    │   ├── Button/  
    │   ├── Input/  
    │   └── Label/  
    ├── molecules/  
    │   ├── SearchForm/  
    │   └── NavItem/  
    ├── organisms/  
    │   ├── Header/  
    │   └── ProductCard/  
    ├── templates/  
    │   └── ProductPageLayout/  
    └── pages/  
        └── HomePage/

**Els noms no importen tant com la mentalitat**

El propi Brad Frost va aclarir que "les etiquetes específiques (àtoms, molècules, organismes, plantilles i pàgines) mai han estat el punt, i no les usem realment en el nostre treball. Però continuen sent útils com a model mental." L'important no és si un component és una molècula o un organisme, sinó crear un sistema que ajudi l'equip a comunicar-se més efectivament i a construir millors interfícies d'usuari.

Els principis que sí que importen sempre: **pensa en components petits i reutilitzables**, **construeix des de baix cap a dalt**, **manté una sola font de veritat** per a cada element visual, i **documenta el sistema** perquè tothom de l'equip pugui usar-lo.

**Resum dels cinc nivells**

| Nivell | Definició | Exemple |
| ----- | ----- | ----- |
| **Àtom** | Element mínim, no es pot dividir més | Botó, input, icona, color |
| **Molècula** | Grup d'àtoms amb un propòsit concret | Formulari de cerca, camp de login |
| **Organisme** | Secció completa formada per molècules | Header, footer, targeta de producte |
| **Plantilla** | Estructura de pàgina sense contingut real | Layout de pàgina de producte |
| **Pàgina** | Plantilla amb contingut real | La pàgina de producte real amb dades |

