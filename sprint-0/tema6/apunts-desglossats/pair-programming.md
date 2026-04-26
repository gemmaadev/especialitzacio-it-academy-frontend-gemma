## **Pair Programming**

**Què és el pair programming?**

El pair programming consisteix en dos programadors que comparteixen una sola estació de treball (una pantalla, un teclat i un ratolí entre la parella). El programador al teclat s'anomena habitualment "driver", i l'altre, també activament involucrat en la tasca però centrat més en la direcció global, s'anomena "navigator". S'espera que els programadors intercanviïn rols cada pocs minuts.

La idea és tenir dues perspectives sobre el codi al mateix temps. El driver pensa en els detalls i les línies de codi concretes. El navigator pensa estratègicament i té la imatge global en ment. La col·laboració entre developers es pot fer en persona o de manera remota.

**El rol del Driver: tàctic i concret**

El driver és la persona al teclat. És responsable d'escriure el codi i centrar-se en la tasca actual. El driver s'ocupa del costat "tàctic" de la codificació: escriure la sintaxi, corregir errors immediats i implementar el pas actual de la solució.

Una bona pràctica fonamental per al driver: el driver ha de pensar en veu alta mentre codifica. Verbalitzant el que estàs fent ("Ara iteraré per aquesta llista i filtraré els valors invàlids..."), mantens el teu company al corrent i l'invites a donar feedback en temps real.

**El rol del Navigator: estratègic i global**

El navigator és el company que revisa cada línia de codi a mesura que s'escriu, proporciona feedback i pensa estratègicament en l'enfocament global. El navigator revisa contínuament el codi que apareix, assenyala possibles problemes o bugs, i considera les implicacions més àmplies. Pot fer preguntes, suggerir enfocaments alternatius o recordar al driver l'objectiu principal ("Aquesta funció gestiona tots els casos límit?").

Com a navigator, evita el mode de pensament "tàctic": deixa els detalls de la codificació al driver. La teva feina és fer un pas enrere i complementar el mode més tàctic del teu company amb un pensament a mig termini. Apunta els propers passos, possibles obstacles i idees en post-its i discuteix-los quan s'acabi l'objectiu actual, per no interrompre el flux del driver.

**Els estils de pair programming**

**Driver-Navigator** — el més comú. Una persona condueix, pren el teclat i codifica, mentre l'altra navega. La feina del navigator és prestar atenció al que fa el driver mantenint la visió global en ment. És molt important que el driver expliqui cada decisió que pren, d'altra manera el navigator podria perdre interès i deixar de prestar atenció.

**Ping-Pong** — en contrast amb el mode driver-navigator, en ping-pong tots dos poden estar conduint en qualsevol moment. Una bona estratègia per a aquest enfocament és que una persona escrigui els tests mentre l'altra intenta fer-los passar. S'han d'intercanviar els rols sovint. Funciona molt bé combinat amb TDD.

**Backseat Navigator** — un enfocament típic quan hi ha un membre nou a l'equip o un company junior. El navigator (normalment el membre més sènior) li diu al driver, que té el teclat, què ha de fer per resoldre un problema amb tots els detalls. El navigator ha de proporcionar coneixements sobre com resoldre el problema però també sobre per quèaquesta és la millor solució.

**Quan canviar de rols?**

Per mantenir els dos participants involucrats i prevenir la fatiga, les parelles típicament intercanvien rols cada 15-30 minuts. No hi ha una regla absoluta sobre cada quan canviar: pot ser cada 15 minuts, cada cop que s'acaba una unitat lògica de treball (un test, una funció), o usant una tècnica com el Pomodoro (25 minuts de feina, 5 de descans).

Intercanviar el teclat i els rols regularment ajuda a mantenir el nivell d'energia, a no aborrir-se i a practicar les dues maneres de pensar.

**Beneficis principals**

**Menys errors al codi** — el pair programming augmenta les hores-persona necessàries per lliurar codi comparat amb programadors treballant individualment. No obstant, el codi resultant té menys defectes.

**Transferència de coneixement** — els developers júniors es beneficien de l'experiència dels seus companys sèniors, mentre que els sèniors poden obtenir perspectives noves i tècniques fresques dels júniors. Això va més enllà de les habilitats tècniques: els developers comparteixen coneixement del domini, tècniques de debugging, consells d'ús d'eines i fins i tot dreceres de teclat.

**Resolució de problemes més ràpida** — una parella aporta perspectives diverses i enfocaments de resolució de problemes. La perspectiva d'alt nivell del navigator combinada amb l'enfocament pràctic del driver sovint porta a solucions que no haurien pensat per separat.

**Propietat col·lectiva del codi** — quan diverses persones han treballat en totes les parts del codebase, ningú és "l'únic que sap" com funciona una part concreta. Si algú marxa del projecte, el coneixement no marxa amb ella.

**Estratègies per aplicar-la correctament**

**Programa en veu alta** — mantén una conversa constant amb el teu company. Explica el que estàs fent i per quèho fas. Sigues obert a suggeriments i comentaris del company.

**Navega, no dictes** — com a navigator no estàs al càrrec del driver. Evita la temptació de dir-li al driver exactament el que ha de fer. Dóna-li al driver l'oportunitat de fer preguntes o demanar ajuda abans de dir-li el que ha de fer.

**Fes descansos regulars** — el pair programming és intens i esgotador. Prendre descansos suficients és clau. Si notes que oblides prendre descansos regulars, programa'ls amb un temporitzador. No facis pair programming més de 6 hores al dia.

**Acorda un objectiu petit cada vegada** — defineix un petit objectiu cada vegada. Pot ser definit per un test unitari, per un missatge de commit, o escrit en un post-it. Apunta els propers passos i idees en post-its i discuteix-los un cop acabat l'objectiu actual.

**Senyals que el pair programming no funciona**

Hi ha indicadors que una parella no funciona bé: el desengament pot manifestar-se com que un membre es retira físicament del teclat, accedeix al correu electrònic o fins i tot s'adorm. El fenomen "Watch the Master" pot aparèixer si un membre és molt més experimentat que l'altre. En aquesta situació, el membre junior pot prendre el rol d'observador, cedint al membre sènior la major part de l'activitat de codificació. Això pot portar fàcilment al desengament.

**Pair programming remot**

Per a equips que treballen a distància, les eines habituals per fer pair programming remot són: **VS Code Live Share** (permet que dos developers editin el mateix codi en temps real, amb cursor compartit), **JetBrains Code With Me** (similar per a entorns JetBrains), i qualsevol combinació de videoconferència \+ compartir pantalla. Si treballes remotament, no et recolzis únicament en la comunicació basada en text. Usa eines d'àudio i vídeo d'alta qualitat per facilitar una millor interacció.

**Resum dels rols**

|  | Driver | Navigator |
| ----- | ----- | ----- |
| Enfocament | Tàctic (detalls, sintaxi) | Estratègic (visió global) |
| Fa... | Escriu el codi | Revisa, suggereix, anticipa |
| Pensa en... | La línia de codi actual | Els propers passos i possibles problemes |
| Ha de... | Parlar en veu alta | Preguntar, no dictar |
| Canvi de rol | Cada 15-30 minuts o quan s'acaba un objectiu |  |

