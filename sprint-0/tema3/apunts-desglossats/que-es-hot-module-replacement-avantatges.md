**Què és el Hot Module Replacement (HMR) i quins avantatges ofereix en el desenvolupament?** 

## **Hot Module Replacement (HMR)**

Quan estàs programant i guardes un fitxer, la manera tradicional de veure el canvi és recarregar tota la pàgina del navegador. Funciona, però és lent i té un problema: perds tot el que tenies a la pantalla. Si estaves omplint un formulari, es buida. Si havies navegat fins a una pàgina concreta, tornes a l'inici. HMR resol exactament aquest problema.

**Què és HMR**

HMR permet actualitzar el codi sense haver de recarregar la pàgina. Per exemple, si edites el marcat d'un component o ajustes els estils, els canvis es reflecteixen immediatament al navegador, cosa que permet una iteració de codi més ràpida i una millor experiència de desenvolupament.

En lloc de recarregar-ho tot, HMR actualitza únicament els mòduls que han canviat en l'aplicació en execució. El servidor de desenvolupament aplica el pedaç al navegador, preservant l'estat en temps d'execució quan és possible, de manera que els formularis no es reinicien, el scroll no salta i et quedes a la mateixa ruta.

**Com funciona per dins (sense entrar en detalls tècnics)**

El flux és senzill: guardes un fitxer, l'eina de construcció detecta el canvi, el servidor de desenvolupament envia un missatge al navegador (normalment via WebSocket), el sistema HMR compara els mòduls i reimporta només els que han canviat. L'aplicació s'actualitza sense perdre l'estat.

Quan un fitxer font canvia, Vite identifica els mòduls afectats, propaga el canvi i envia actualitzacions específiques al navegador via WebSocket. El client llavors importa dinàmicament els mòduls actualitzats i executa els handlers corresponents.

**Quins avantatges té en el desenvolupament**

**Velocitat real.** HMR actualitza automàticament l'aplicació amb els últims canvis de codi en temps real, sense haver de recarregar manualment la pàgina. Això no només estalvia temps sinó que manté l'estat de l'aplicació intacte, assegurant una experiència de desenvolupament fluida.

**Estat preservat.** Imagina que estàs ajustant el color d'un botó dins d'un formulari de 5 passos. Sense HMR, cada guardat et tornaria al primer pas. Amb HMR, el formulari segueix on el vas deixar i simplement veus el color actualitzat.

**CSS instantani.** Els canvis d'estils s'apliquen de manera especialment ràpida perquè Vite pot actualitzar el CSS sense tocar res del JavaScript. Veus el canvi de color, mida o espaiat en mil·lisegons.

**Menys interrupcions.** HMR no és només velocitat, és preservar el flux del desenvolupador, aquell ritme ininterromput on les idees avancen més ràpid que els canvis de context. Els components de React mantenen l'estat entre edicions, el CSS s'aplica instantàniament i et mantens enfocat a resoldre problemes, no a esperar recàrregues.

**HMR és només per al desenvolupament**

Un detall important: HMR és una funcionalitat exclusiva del temps de desenvolupament, mai hauria d'arribar a producció. Quan fas `vite build` per construir la versió final del projecte, HMR no hi és. És una eina pensada per fer la teva feina diària de programació més còmoda i ràpida, no un mecanisme que afecti els usuaris finals.

A Vite, HMR ve activat per defecte sense que hagis de configurar res. Simplement arranques el servidor de desenvolupament amb `npm run dev` i automàticament tens tots els avantatges.

