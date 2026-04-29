## **L'atribut `alt` a les imatges**

**Per què és imprescindible el `alt`**

L'atribut `alt` és el text alternatiu d'una imatge. Existeix per a les situacions en les quals la imatge no es pot veure: quan un usuari usa un lector de pantalla per discapacitat visual, quan la imatge no carrega per connexió lenta, o quan un motor de cerca indexa el contingut de la pàgina.

Afegir imatges o gràfics al contingut sense usar atributs alternatius adequats o buits pot ser extremadament frustrant per a les persones amb discapacitat visual que naveguen el lloc amb tecnologies d'assistència. Les alternatives d'imatge afegeixen informació valuosa per als usuaris de lectors de pantalla amb visió reduïda o ceguesa. Les alternatives d'imatge també beneficien persones amb internet lenta o inestable, algunes discapacitats cognitives i també milloren el SEO del lloc web.

La regla fonamental és senzilla: **totes les imatges han de tenir l'atribut `alt`**, sempre. La pregunta és quin valor li dones, i aquí és on entra la distinció entre imatges informatives i decoratives.

**Les dues categories d'imatges**

**Imatge informativa** — transmet informació que no existeix en cap altre lloc de la pàgina. Si la treus, l'usuari perd contingut. Si l'eliminació d'una imatge de la pàgina implica perdre informació, llavors la imatge és informativa i necessita `alt` text.

**Imatge decorativa** — existeix per fer la pàgina visualment més atractiva però no afegeix cap informació nova. Les imatges decoratives no afegeixen informació al contingut d'una pàgina. Per exemple, la informació proporcionada per la imatge ja podria estar donada en el text adjacent, o la imatge podria estar inclosa per fer el lloc web visualment més atractiu.

**Exemple 1: Imatge informativa**

Una imatge que mostra un gràfic de vendes, una foto d'un producte o una captura de pantalla d'un error és informativa. El `alt` ha de descriure el contingut o la funció de la imatge, no la seva aparença.

| \<\!\-- ✅ Correcte: descriu el contingut, no l'aparença \--\>\<img  src\="grafic-vendes-q3.png"  alt\="Gràfic de barres que mostra un increment del 23% en les vendes del Q3 respecte al Q2"/\>\<\!\-- ❌ Incorrecte: descriu l'aparença, no el contingut \--\>\<img  src\="grafic-vendes-q3.png"  alt\="Gràfic de barres de color blau"/\>\<\!\-- ❌ Incorrecte: redundant i innecessari \--\>\<img  src\="grafic-vendes-q3.png"  alt\="Imatge d'un gràfic de vendes"/\> |
| :---- |

Els lectors de pantalla ja anuncien la presència d'una imatge automàticament. Per tant, un text alternatiu "Imatge d'una poma" seria llegit en veu alta com "imatge, Imatge d'una poma". No cal incloure paraules com "imatge", "icona" o "foto" al text alternatiu.

El truc per saber quin `alt` posar: imagina que expliques la pàgina per telèfon a algú que no la pot veure. Quina informació necessita saber sobre aquella imatge per entendre el contingut?

**Exemple 2: Imatge decorativa (alt buit)**

Una imatge decorativa és un fons, una forma geomètrica, una textura o qualsevol element que només serveix per embellir la pàgina. Per a aquests casos, el `alt` ha d'estar buit: `alt=""`.

En els casos d'imatges decoratives, s'ha de proporcionar un text alternatiu nul (buit) (`alt=""`) perquè puguin ser ignorades per les tecnologies d'assistència, com els lectors de pantalla. Els valors de text per a aquest tipus d'imatges afegirien soroll audible a la sortida del lector de pantalla o podrien distreure els usuaris si el tema és diferent al del text adjacent.

| \<\!\-- ✅ Correcte: alt buit, el lector de pantalla l'ignora \--\>\<img  src\="onada-decorativa.svg"  alt\=""/\>\<\!\-- ❌ Incorrecte: falta el atribut alt completament \--\>\<img src\="onada-decorativa.svg" /\>\<\!\-- El lector de pantalla llegirà el nom del fitxer: "onada-decorativa punt svg" \--\>\<\!\-- ❌ Incorrecte: alt amb text quan és decorativa \--\>\<img  src\="onada-decorativa.svg"  alt\="Forma d'onada decorativa"/\>\<\!\-- El lector de pantalla llegirà "Forma d'onada decorativa" innecessàriament \--\> |
| :---- |

Quan un lector de pantalla troba un `alt` nul buit, saltarà completament la imatge, sense anunciar la seva presència. Si no hi ha cap atribut `alt`, el lector de pantalla llegirà el nom del fitxer per la imatge, cosa que pot ser una distracció important per als qui usen tecnologia de lectura de pantalla.

**Un avís important sobre `alt=""`**

Si uses un text alternatiu nul (`alt=""`) per amagar imatges decoratives, assegura't que no hi ha cap espai entre les cometes. Si hi ha un espai, la imatge potser no quedarà efectivament amagada de les tecnologies d'assistència. Per exemple, alguns lectors de pantalla encara anunciaran la presència d'una imatge si hi ha un espai entre les cometes.

| \<\!\-- ✅ Correcte: sense espai \--\>\<img src\="decorativa.png" alt\="" /\>\<\!\-- ❌ Incorrecte: espai entre les cometes \--\>\<img src\="decorativa.png" alt\=" " /\> |
| :---- |

**Opció alternativa: imatges decoratives via CSS**

La manera més neta de gestionar imatges purament decoratives és no posar-les a l'HTML sinó al CSS com a `background-image`. Així no existeixen per als lectors de pantalla i no cal l'atribut `alt`:

| /\* Imatge decorativa via CSS: invisible per als lectors de pantalla \*/.seccio-hero {  background-image: url('fons-abstracte.jpg');  background-size: cover;}\<\!\-- Res d'alt aquí: l'element no té cap imatge per als assistents \--\>\<section class\="seccio-hero"\>  \<h1\>Títol de la pàgina\</h1\>\</section\> |
| :---- |

Les imatges CSS s'haurien d'usar per a imatges decoratives que no necessiten text alternatiu. Les imatges que transmeten contingut no s'haurien de definir generalment en CSS, sinó que haurien d'estar dins del contingut de la pàgina.

**Exemple complet: pàgina amb les dues situacions**

| \<article\>  \<\!\-- Imatge DECORATIVA: fons de l'article, no aporta informació \--\>  \<img src\="textura-paper.png" alt\="" /\>  \<h2\>Com fer la teva primera contribució a Git\</h2\>  \<\!\-- Imatge INFORMATIVA: els passos del diagrama són contingut \--\>  \<img    src\="diagrama-git-flow.png"    alt\="Diagrama que mostra el flux de Git: es crea una branca des de main, es fan commits, s'obre una Pull Request i es fusiona de tornada a main"  /\>  \<p\>El primer pas és crear una branca nova...\</p\>\</article\> |
| :---- |

**La regla d'or per decidir quin `alt` posar**

| Situació | Solució | Exemple |
| ----- | ----- | ----- |
| La imatge transmet informació única | `alt` descriptiu del contingut | `alt="Gràfic d'increment del 23% en vendes Q3"` |
| La imatge és purament decorativa | `alt=""` (buit, sense espai) | `alt=""` |
| La imatge repeteix text adjacent | `alt=""` per evitar redundància | `alt=""` |
| La imatge és un botó o enllaç | `alt` descriu la destinació o funció | `alt="Anar a la pàgina d'inici"` |
| La imatge conté text important | `alt` inclou el text de la imatge | `alt="Oferta: 50% de descompte fins el 30 d'abril"` |

