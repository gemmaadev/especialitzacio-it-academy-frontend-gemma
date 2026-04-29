## **Del disseny al codi: el procés pas a pas**

**A Step-By-Step Process for Turning Designs Into Code**  
[https://css-tricks.com/a-step-by-step-process-for-turning-designs-into-code/](https://css-tricks.com/a-step-by-step-process-for-turning-designs-into-code/)  
Metodologia per passar de disseny a codi de manera ordenada.

**Learn How To Make a Website**  
[https://learnfromsteph.dev/](https://learnfromsteph.dev/)  
Recorregut pràctic per crear un lloc web des de zero.

**Per què cal un procés?**

Davant d'un disseny nou, l'impuls natural és obrir l'editor i començar a escriure codi immediatament. Sense tenir alguna manera de predir com abordaràs alguna cosa, és molt difícil estimar quant de temps trigarà o quines preguntes necessites respondre abans de començar. Molts dissenys semblen simples a primera vista, però ràpidament es tornen complexos un cop t'hi endinses.

Seguir un procés d'anàlisi prèvia t'evita promeses excessives, terminis irreals i reescriptures de codi.

**Les 5 passades d'anàlisi**

Abans d'escriure una sola línia de codi, fas cinc passades pel disseny, sempre en el mateix ordre: **de fora cap a dins, de dalt a baix, d'esquerra a dreta**. En cada passada busques únicament un tipus d'informació.

**Passada 1: Patrons de layout**

Identifiques les idees de distribució que es repeteixen. En una pàgina de màrqueting típica veuràs: una capçalera amb navegació horitzontal, una columna de contingut principal, seccions de dues columnes, seccions d'una sola columna centrada i un peu amb tres columnes.

Anota també les teves primeres impressions: el que t'agrada, el que et sembla estrany o inconsistent, i les preguntes que surten. Mai podràs tenir una primera impressió dues vegades, i algunes reaccions inicials importants es poden oblidar si no les anotem ara.

**Passada 2: Patrons d'elements**

Identifiques els elements que es repeteixen amb el mateix estil: estils de botó primari i secundari, estils de títols i subtítols, mides del cos del text, seccions en "mode fosc" on el text és blanc i el fons és fosc, components de targeta, presentació consistent d'imatge i peu de foto.

Cada cosa que veus repetida és un candidat a component reutilitzable.

**Passada 3: Paleta de colors**

Documentes tots els colors del disseny. Algunes eines de disseny et permeten exportar els valors hexadecimals o fins i tot declaracions de variables CSS. Si no tens aquesta opció, agafa els valors manualment i dóna'ls noms significatius, perquè seran la base de tota la feina inicial de CSS.

Durant tot el codi, vols referir-te als colors amb etiquetes com "primary" i "secondary" que puguis reutilitzar. Això facilita ajustar valors en el futur i afegir temes.

**Passada 4: Estructura semàntica**

Aquesta és la passada més important per a l'accessibilitat. Entendre l'estructura t'ajuda a descobrir els patrons que acabaran sent els teus components, i també t'ajuda a entendre la manera en la qual vols que les persones que usen tecnologia d'assistència percebin el contingut. Això guia l'elecció dels elements HTML necessaris per escriure HTML semàntic. L'HTML semàntic parla de la naturalesa i l'estructura del contingut perquè pugui ser percebut correctament pels navegadors. Els navegadors usen el nostre HTML per crear l'arbre d'accessibilitat que la tecnologia d'assistència, com els lectors de pantalla, usa per presentar la pàgina.

El truc és senzill: imagina que has d'explicar la pàgina verbalment per telèfon a algú que no la pot veure. Si pots fer-ho amb claredat, tens l'estructura clara per triar els elements HTML correctes.

Procediment: primer anotes l'estructura de primer nivell (header, main, footer), després vas un nivell més profund per a cada secció, i així successivament.

**Passada 5: Tot la resta**

Quines altres idees conté el disseny? Quines coses criden l'atenció? Quins reptes notes? Busca especialment "feina de cola" amagada: ordenar els estils, gestionar el mòbil, configurar el CMS, afegir proves automàtiques. Documenta les preguntes sobre coses que el disseny no especifica clarament: com funciona exactament aquella animació? Quins estats té aquell formulari?

Una pregunta no resolta descoberta ara, en fase d'anàlisi, triga 5 minuts a resoldre. Descoberta un cop ja has construït la funcionalitat, pot costar hores de refactor.

**Les quatre categories de feina resultants**

Un cop fetes les cinc passades, classifiques cada peça a construir en categories:

Components que ja estan al 100% llestos (no cal temps de dev), components que existeixen però necessiten ajustos (temps de dev predictible), components totalment nous però amb un camí obvi i segur (temps de dev predictible), i components totalment nous que necessiten investigació, o el disseny no és clar, o alguna cosa et genera incertesa i necessites discussions amb els stakeholders. Com abans puguis identificar aquesta darrera categoria, millor. Parla-ho amb qui gestioni el projecte.

**Els avantatges de tenir un procés**

**Descobreixes problemes aviat** — Els dissenys sovint contenen suposicions que poden ser impractiques d'implementar o que contradiuen l'accessibilitat. Identificar-los a l'inici permet resoldre'ls mentre continues construint les parts que ja estan llestes, en lloc de xocar amb ells quan estàs a punt d'implementar-les.

**Pots ser ajudat** — Sense un pla és difícil saber quant has avançat i quan necessites ajuda. Quan tens la feina desglossada en petits blocs, es pot delegar ràpidament sabent que les peces encaixaran al final.

**L'arquitectura de components flueix millor** — Les decisions arquitecturals (nomenar components, decidir on ha de viure cada cosa) només tenen sentit quan mires el quadre complet i penses en totes les maneres que els elements podrien ser usats per visitants i editors de contingut.

**Els estils tenen més sentit** — Pots descobrir quins estils són globals, quins són específics d'una secció i quins són excepcions puntuals, abans d'escriure cap línia de CSS.

**L'accessibilitat comença aviat** — En entendre realment les idees contingudes en el disseny, tindràs més facilitat per triar elements HTML semàntics i trobar patrons accessibles adequats. L'accessibilitat s'integra en la feina diària en lloc de ser una càrrega afegida o una reflexió tardana. La perspectiva passa a ser que un codi frontend d'alta qualitat expressa correctament la naturalesa i l'estructura del seu contingut a tots els usuaris, i l'accessibilitat és com mesurem això.

**Resum del procés**

1\. ANALITZA el disseny (no codis res encara)  
         ↓  
   Passada 1: Patrons de layout  
   Passada 2: Patrons d'elements  
   Passada 3: Paleta de colors  
   Passada 4: Estructura semàntica (HTML)  
   Passada 5: Tot la resta \+ preguntes

         ↓  
2\. CLASSIFICA la feina en categories  
   (llest / necessita ajustos / nou-clar / nou-incert)

         ↓  
3\. ESTIMA el temps per a cada categoria

         ↓  
4\. RESOL els dubtes ABANS de codificar

         ↓  
5\. CODIFICA amb l'arquitectura i l'HTML ja pensats

