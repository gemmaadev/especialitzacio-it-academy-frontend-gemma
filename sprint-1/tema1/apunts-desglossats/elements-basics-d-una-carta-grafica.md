## **Elements bàsics d'una carta gràfica**

**Què és una carta gràfica?**

Una carta gràfica és un document exhaustiu que formalitza les regles per a l'ús dels elements visuals d'una marca. És essencial per garantir una identitat visual coherent i reconeixible, independentment del suport utilitzat, ja sigui digital o imprès.

En paraules senzilles: és el manual d'instruccions visual d'una marca. Igual que una gramàtica defineix les regles d'un idioma, la carta gràfica defineix les regles visuals: quins colors s'usen, quines tipografies, com es col·loca el logo i com s'organitzen els elements en qualsevol peça de comunicació. Sense ella, cada persona de l'equip podria crear materials d'aspecte diferent i la marca perdria coherència.

## **1\. El logo: la pedra angular**

El logo és l'element principal: la seva estructura, les seves variacions i les versions autoritzades.

El logo no és simplement un arxiu d'imatge: és un sistema. La carta gràfica defineix totes les versions que existeixen: la versió principal en color, la versió en blanc i negre, la versió en negatiu (sobre fons fosc), i la versió simplificada per a espais petits (favicon, icona d'app).

El sistema de logo inclou el logo primari, una versió simplificada per a espais petits, i un icona o favicon funcional. A més, la carta defineix l'**espai de protecció** (la zona lliure al voltant del logo on no pot anar cap altre element) i els usos incorrectes (no estirar, no canviar colors, no rotar).

## **2\. La paleta de colors**

El color és la manera més ràpida amb la qual el cervell processa la identitat de marca. Estudis mostren que el color augmenta el reconeixement de marca fins a un 80%.

La paleta ha d'incloure: 2-3 colors primaris (els colors dominants que defineixen la marca), 2-3 colors secundaris (colors de suport per a varietat i jerarquia), colors neutres (fons, text i elements UI) i un color d'accentuació (un sol color cridaner per a CTAs i destacats). Cada color ha de tenir valors definits per a digital (hex, RGB) i impressió (CMYK, Pantone). No deixar-ho a la interpretació.

En el context web, els codis que cal especificar per a cada color:

* **HEX**: `#FF5733` — per a CSS i disseny web  
* **RGB**: `rgb(255, 87, 51)` — per a pantalles  
* **CMYK**: per a impressió  
* **Pantone**: per a impressió d'alta qualitat

**3\. La tipografia**

La tipografia organitza la informació i dona a la marca la seva "veu" de lectura. Un bon sistema tipogràfic normalment inclou un tipus de lletra primari per a títols, un secundari per al cos del text, i regles clares de jerarquia.

Les teves eleccions tipogràfiques influencien directament la percepció del teu missatge. Una font serif evoca tradició i fiabilitat, mentre que una font sans-serif moderna suggereix innovació i simplicitat. Selecciona una família principal per als teus títols i una família secundària per als teus textos.

La carta defineix per a cada nivell tipogràfic: la família de lletra, la mida, el pes (regular, bold, light), l'interlineat i l'espaiat entre lletres. S'han de triar 2 famílies tipogràfiques com a màxim: una per als títols, una per al cos del text. Provar la llegibilitat en tots els dispositius i establir una escala tipogràfica clara (H1, H2, cos, peu de foto).

**4\. La iconografia i els elements gràfics**

Les icones i els elements gràfics actuen com una abreviació de la personalitat i la funcionalitat de la marca. Un estil d'icones consistent (gruix del traç, radi de cantonada, nivell de detall) ajuda les interfícies i els materials a sentir-se coherents.

Per mantenir la iconografia coherent: definir una graella base (per exemple, 24x24 px) i mantenir-la per a totes les icones. Decidir les regles d'estil: outline vs. sòlid, arrodonit vs. agut, detallat vs. mínim.

A més de les icones, la carta gràfica pot incloure patrons, textures, il·lustracions i formes recurrents que creen un llenguatge visual reconeixible més enllà del logo.

**5\. La graella i l'espaiat**

El layout inclou marges, graelles, espaiat i l'estructura del contingut.

La graella és el sistema invisible que organitza els elements a la pàgina. Per al web, la més habitual és la **graella de 12 columnes**, que permet dividir el contingut en fraccions flexibles (1/2, 1/3, 1/4...). La carta defineix: el número de columnes, l'amplada màxima del contingut, els marges laterals i l'espaiat vertical entre seccions.

Per a materials web, cal respectar l'espai blanc que representa el 30% de la pàgina, evitant sobrecarregar-la. Al web, s'adopten graelles CSS Flexbox o Grid per alinear els blocs.

L'**espai blanc** no és espai buit: és un element de disseny actiu que facilita la lectura, dona respiració al contingut i millora la usabilitat.

**6\. La fotografia i la imatge**

La imatge transforma valors abstractes en històries concretes amb les quals les persones es poden relacionar. Ja sigui fotografia, il·lustració o una barreja, l'estil ha de reflectir el posicionament i el públic objectiu de la marca.

La carta gràfica defineix el to fotogràfic: colors càlids o freds, estil documental o estilitzat, amb persones o sense, escenaris naturals o urbans. Moltes marques especifiquen un estil de tractament de color (filtres, saturació) per mantenir coherència visual en totes les fotografies.

**7\. El to de veu (editorial)**

El to editorial és el llenguatge escrit i la veu usada per comunicar. Tot i que no és un element purament visual, forma part de la carta gràfica perquè el text és inseparable del disseny. Defineix si la marca parla de tu o de vostè, si el to és formal o proper, si usa humor o sobrietat.

**La carta gràfica en el context web i digital**

En el context específic del disseny d'aplicacions web, la carta gràfica es tradueix en **tokens de disseny**: variables que defineixen els valors del sistema i s'implementen directament al codi:

:root {  
  \--color-primary: \#3B82F6;  
  \--color-secondary: \#10B981;  
  \--color-neutral-100: \#F3F4F6;  
  \--font-heading: 'Inter', sans-serif;  
  \--font-body: 'Lato', sans-serif;  
  \--spacing-sm: 8px;  
  \--spacing-md: 16px;  
  \--spacing-lg: 32px;  
  \--border-radius: 8px;  
}

Aquests tokens connecten directament la carta gràfica amb el codi, garantint que el disseny i la implementació sempre estiguin alineats.

**Resum dels elements essencials**

| Element | Defineix... |
| ----- | ----- |
| **Logo** | Versions, espai de protecció, usos incorrectes |
| **Colors** | Paleta primària/secundària/neutrals, codis HEX/RGB/CMYK |
| **Tipografia** | Famílies, mides, pesos, jerarquia (H1-H6, cos, peu) |
| **Iconografia** | Estil, mida base, regles d'ús |
| **Graella i espaiat** | Columnes, marges, espai blanc, spacing system |
| **Fotografia** | Estil, to, tractament de color |
| **Ton de veu** | Registre, persona gramatical, personalitat |

