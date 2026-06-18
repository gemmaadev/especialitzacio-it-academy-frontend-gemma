## **Database Design Basics — Guia de Microsoft**

###### **Database Design Basics** [https://support.microsoft.com/en-US/Access/database-design-basics](https://support.microsoft.com/en-US/Access/database-design-basics) Guia de Microsoft amb conceptes bàsics per dissenyar bases de dades relacionals.

**Per què importa un bon disseny**

Una base de dades correctament dissenyada et proporciona accés a informació actualitzada i precisa. 

Com que un disseny correcte és essencial per assolir els teus objectius, invertir el temps necessari per aprendre els principis d'un bon disseny té sentit. 

Al final, és molt més probable que acabis amb una base de dades que cobreixi les teves necessitats i pugui acomodar canvis fàcilment.

**Els termes bàsics**

Access organitza la informació en **taules**: llistes de files i columnes. Cada fila s'anomena **registre**, i cada columna, un **camp**. 

Un registre és una manera significativa i consistent de combinar informació sobre alguna cosa. Un camp és un sol element d'informació — un tipus d'element que apareix en cada registre. 

Per exemple, en la taula de Productes, cada fila o registre conté informació sobre un producte. Cada columna o camp conté algun tipus d'informació sobre aquell producte, com el seu nom o preu.

**Què és un bon disseny de base de dades**

Certs principis guien el procés de disseny. 

1. El primer principi és que la informació duplicada (també anomenada dades redundants) és dolenta, perquè malbarata espai i incrementa la probabilitat d'errors i inconsistències.   
2. El segon principi és que la correcció i completesa de la informació és important. Si la base de dades conté informació incorrecta, qualsevol informe que extregui informació de la base de dades també contindrà informació incorrecta.

Un bon disseny de base de dades, per tant, és aquell que: divideix la informació en taules basades en temes per reduir les dades redundants, proporciona la informació necessària per unir les taules, ajuda a suportar i assegurar la precisió i integritat de la informació, i acomoda les necessitats de processament de dades i informes.

**El procés de disseny: els 8 passos**

El procés de disseny consisteix en els passos següents:

1. **Determinar el propòsit de la base de dades** — Ajuda a preparar-te per als passos restants.  
2. **Trobar i organitzar la informació requerida** — Recull tots els tipus d'informació que voldràs registrar, com nom de producte i número de comanda.  
3. **Dividir la informació en taules** — Divideix els elements d'informació en entitats o temes principals, com Productes o Comandes. Cada tema es converteix en una taula.  
4. **Convertir elements d'informació en columnes** — Decideix quina informació vols emmagatzemar en cada taula. Cada element es converteix en un camp, i es mostra com a columna.  
5. **Especificar les claus primàries** — Escull la clau primària de cada taula. La clau primària és una columna que s'usa per identificar unívocament cada fila.  
6. **Configurar les relacions entre taules** — Mira cada taula i decideix com les dades d'una taula es relacionen amb les dades d'altres taules.  
7. **Refinar el disseny** — Analitza el disseny per errors. Crea les taules i afegeix uns quants registres de dades de mostra. Comprova si pots obtenir els resultats que vols.  
8. **Aplicar les regles de normalització** — Aplica les regles de normalització de dades per comprovar si les taules estan estructurades correctament.

**Trobar i organitzar la Informació**

Per trobar i organitzar la informació requerida, comença amb la informació existent. Per exemple, podries tenir ordres de compra en un registre o informació de clients en formularis de paper. 

Recull aquells documents i llista cada tipus d'informació mostrada. Si no tens formularis existents, imagina que has de dissenyar un formulari per registrar la informació del client. 

Quina informació posaries al formulari? Identifica i llista cada element.

Tècnica pràctica: llegir els requisits i identificar  
  → Substantius → candidats a ENTITATS (taules)  
  → Adjectius/descripcions → candidats a ATRIBUTS (camps)  
  → Verbs → candidats a RELACIONS (FK o taules intermèdies)

Exemple: "Els clients fan comandes de productes"  
  → clients   → taula clients  
  → comandes  → taula comandes  
  → productes → taula productes  
  → "fan" (1:N)  → client\_id FK a comandes  
  → "de" (N:M)   → taula comanda\_producte

**Configurar les relacions entre taules**

Un cop has dividit la informació en taules i has identificat els camps de clau primària, necessites una manera de dir-li a Access com unir la informació relacionada d'una manera amb significat. Per fer-ho, defineixes relacions entre taules.

Els tres tipus fonamentals de relació que identifica Microsoft:

| \-- Relació 1:1 (un a un): poc freqüent\-- S'usa quan vols separar informació per seguretat o rendimentCREATE TABLE usuaris (id INT PRIMARY KEY, nom VARCHAR(100));CREATE TABLE usuaris\_detall (  usuari\_id INT PRIMARY KEY,  bio TEXT,  FOREIGN KEY (usuari\_id) REFERENCES usuaris(id));\-- Relació 1:N (un a molts): la més freqüent\-- Un client pot tenir moltes comandesCREATE TABLE clients (id INT PRIMARY KEY, nom VARCHAR(100));CREATE TABLE comandes (  id INT PRIMARY KEY,  client\_id INT NOT NULL,  FOREIGN KEY (client\_id) REFERENCES clients(id));\-- Relació N:M (molts a molts): requereix taula intermèdia\-- Una comanda pot tenir molts productes; un producte pot estar a moltes comandesCREATE TABLE comanda\_producte (  comanda\_id  INT NOT NULL,  producte\_id INT NOT NULL,  quantitat   INT NOT NULL DEFAULT 1,  PRIMARY KEY (comanda\_id, producte\_id)); |
| :---- |

**Aplicar les regles de normalització**

Les regles de normalització de dades son aplicades a les taules per comprovar si estan estructurades correctament. Les regles s'anomenen "formes normals".

Microsoft identifica les tres formes normals essencials de la mateixa manera que la literatura clàssica:

| 1FN → Eliminar grups repetitius de les taules individuals      Crear una taula separada per a cada conjunt de dades relacionades      Identificar cada conjunt de dades amb una clau primària2FN → Crear taules separades per a conjunts de valors que s'apliquen      a múltiples registres      Relacionar aquestes taules amb una clau forana3FN → Eliminar camps que no depenen de la clau primària      Camps que depenen d'un altre camp no-clau → taula separada |
| :---- |

**Refinar el disseny: comprovar amb dades reals**

Analitza el disseny per errors. Crea les taules i afegeix uns quants registres de dades de mostra. Comprova si pots obtenir els resultats que vols de les teves taules. Fes ajustos al disseny, si cal.

La manera pràctica de validar el disseny: imagina les consultes que necessitaràs fer i comprova que el disseny les pot respondre:

| \-- Consultes de validació del disseny:\-- "Quines comandes ha fet la Anna?"SELECT c.id, c.total, c.creat\_atFROM comandes cJOIN clients cl ON c.client\_id \= cl.idWHERE cl.nom \= 'Anna';\-- ✅ Funciona → disseny correcte per a aquest requisit\-- "Quins productes s'han venut avui?"SELECT p.nom, SUM(cp.quantitat) AS unitatsFROM comanda\_producte cpJOIN productes p ON cp.producte\_id \= p.idJOIN comandes c ON cp.comanda\_id \= c.idWHERE DATE(c.creat\_at) \= CURDATE()GROUP BY p.id, p.nom;\-- ✅ Funciona → les relacions estan ben configurades\-- "Quants clients no han fet cap comanda?"SELECT cl.nomFROM clients clLEFT JOIN comandes c ON cl.id \= c.client\_idWHERE c.id IS NULL;\-- ✅ Funciona → la relació 1:N permet LEFT JOIN |
| :---- |

**Les regles d'or del disseny (Microsoft)**

Les dues regles fonamentals: la informació duplicada és dolenta (redueix la redundància) i la correcció i completesa de la informació és important (garanteix la integritat).

REGLA 1: Un fet \= un lloc  
  Cada peça d'informació s'emmagatzema en una sola taula  
  Si cal a dos llocs → clau forana, no duplicació

REGLA 2: Cada taula \= un tema  
  La taula clients conté informació de clients  
  La taula comandes conté informació de comandes  
  No barrejar temes en una sola taula

REGLA 3: Cada fila \= una entitat única  
  Cada registre té una clau primària que l'identifica unívocament  
  No pot haver dues files idèntiques

REGLA 4: Cada camp \= un valor atòmic (1FN)  
  Un camp \= un valor (no llistes, no valors múltiples)

REGLA 5: Valida amb dades reals  
  Afegeix dades de mostra i comprova que les consultes funcionen  
  Millor descobrir errors ara que en producció

