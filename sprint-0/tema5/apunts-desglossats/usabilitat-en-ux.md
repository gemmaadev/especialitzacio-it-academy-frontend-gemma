## **Usabilitat en UX: principis fonamentals**

**Interaction Design Foundation: Usabilitat en UX**  
Recursos i cursos per aprofundir en usabilitat.  
[https://ixdf.org/literature/topics/usability](https://ixdf.org/literature/topics/usability)

**Què és la usabilitat?**

La usabilitat és la mesura de com de fàcil, eficient i satisfactori és usar un producte digital. No és simplement que les coses "funcionin": un producte pot funcionar perfectament des del punt de vista tècnic i alhora ser impossible d'usar per a la majoria de persones. La usabilitat respon a preguntes com: l'usuari sap on ha de clicar? Entén el que el sistema li diu? Pot recuperar-se d'un error sense frustrar-se?

La usabilitat és el cor del disseny UX, la investigació i la interacció persona-ordinador. L'objectiu és assegurar que els llocs web i productes digitals siguin intuïtius, fàcils de navegar i agradables d'operar.

**Les 10 heurístiques de Nielsen: l’estàndard de la indústria**

El 1994, Nielsen va refinar les "10 Heurístiques d'Usabilitat per al Disseny d'Interfícies d'Usuari", un conjunt de principis que s'han convertit en fonamentals per als dissenyadors UX per crear experiències d'usuari agradables i fluides.

Les heurístiques de Nielsen no són directrius rígides, sinó regles generals. El terme "heurística" s'usa per descriure la naturalesa d'aquests principis com a dreceres de disseny. Estan pensades per ser prou àmplies per adaptar-se a situacions variades basant-se en com els usuaris pensen i es comporten típicament.

**1\. Visibilitat de l'estat del sistema**

El sistema sempre ha de mantenir els usuaris informats sobre el que està passant, a través d'un feedback apropiat dins d'un temps raonable. Exemples: una barra de càrrega, un missatge "S'ha guardat correctament", un indicador de pas actual en un formulari de múltiples passos.

**2\. Correspondència entre el sistema i el món real**

El sistema ha de parlar el llenguatge dels usuaris, amb paraules, frases i conceptes familiars per a ells, en lloc de termes orientats al sistema. Seguir les convencions del món real, fent que la informació aparegui en un ordre natural i lògic. Una icona de disquet per "guardar" o una paperera per "eliminar" són exemples clàssics.

**3\. Control i llibertat de l'usuari**

Els usuaris sovint escullen funcions del sistema per error i necessitaran una "sortida d'emergència" clarament marcada per abandonar l'estat no desitjat sense haver de passar per un diàleg extens. Cal suportar desfer i refer. El botó "Desfer" és l'exemple més universal.

**4\. Consistència i estàndards**

Es tracta de mantenir el mateix llenguatge al llarg del sistema per evitar confondre l'usuari. Quan els usuaris interactuen amb un producte, no haurien de tenir dubtes sobre el significat de les paraules, icones o símbols usats. Si un botó blau significa "acció principal" en una pantalla, ha de significar el mateix a totes les pantalles.

**5\. Prevenció d'errors**

Encara millor que els bons missatges d'error és un disseny acurat que prevé que un problema ocorri en primer lloc. Un exemple: deshabilitar el botó "Enviar" fins que tots els camps obligatoris del formulari estiguin omplerts, en lloc d'esperar que l'usuari premi el botó i llavors mostrar errors.

**6\. Reconeixement en lloc de record**

Permet que la gent reconegui informació a la interfície, en lloc de forçar-los a recordar-la. Ofereix ajuda en context, en lloc de donar als usuaris un llarg tutorial per memoritzar. Redueix la informació que els usuaris han de recordar. Un menú desplegable amb les opcions visibles és millor que un camp de text on l'usuari ha de recordar el codi exacte.

**7\. Flexibilitat i eficiència d'ús**

Les dreceres, ocultes als usuaris novells, poden accelerar la interacció per a l'usuari expert de manera que el disseny pugui atendre tant usuaris inexperimentats com experimentats. Permet als usuaris personalitzar les accions freqüents. Dreceres de teclat, gestos ràpids, o configuracions guardades per a usuaris avançats.

**8\. Disseny estètic i minimalista**

Les interfícies no haurien de contenir informació que sigui irrellevant o rarament necessitada. Cada unitat extra d'informació en una interfície competeix amb les unitats rellevants i disminueix la seva visibilitat relativa. Menys elements a la pantalla significa que l'usuari pot centrar-se en el que realment importa.

**9\. Ajudar els usuaris a reconèixer, diagnosticar i recuperar-se dels errors**

Els missatges d'error s'han d'expressar en llenguatge planer (sense codis d'error), indicar precisament el problema i suggerir constructivament una solució. "Error 404" és un missatge d'error dolent. "No hem trobat aquesta pàgina. Torna a l'inici" és un missatge d'error bo.

**10\. Ajuda i documentació**

Tot i que és millor si el sistema es pot usar sense documentació, pot ser necessari proporcionar ajuda. Qualsevol informació d'ajuda hauria de ser fàcil de cercar, centrada en la tasca de l'usuari, llistar passos concrets a seguir, i no ser massa extensa.

**Avaluació heurística: com s'aplica en pràctica**

Aquestes heurístiques actuen com un sistema d'alerta primerenca per als dissenyadors per donar forma als seus UI abans de comprometre's amb proves en solucions de disseny finals costoses. Quan els dissenyadors apliquen aquests principis, sovint poden identificar sistemàticament problemes potencials d'usabilitat d'hora en el procés de disseny UX, cosa que es tradueix en millores més eficients i menys costoses.

El procés d'avaluació heurística és senzill: un o més experts recorren el producte i identifiquen els llocs on es viola algun dels deu principis. Cada problema es documenta, se li assigna una gravetat (de lleu a crític) i es proposen solucions. En els casos on més d'un professional realitza l'avaluació heurística, cada persona ha d'inspeccionar la interfície individualment i sense contacte amb les altres, per obtenir resultats independents i no esbiaixats.

**Per què importa per a un developer**

Com a developer, les heurístiques no són "cosa del dissenyador". Quan implementes una funcionalitat, prens decisions que afecten directament la usabilitat: quin missatge mostres quan hi ha un error, quant temps triga a carregar-se, si el botó de "cancel·lar" és visible o no. En cada revisió de disseny, hi ha un moment on algú diu "crec que els usuaris no farien això". Sense principis per fonamentar la discussió, les decisions acaben sent preferències personals. Els principis donen a l'equip un vocabulari compartit per avaluar les decisions de disseny.

