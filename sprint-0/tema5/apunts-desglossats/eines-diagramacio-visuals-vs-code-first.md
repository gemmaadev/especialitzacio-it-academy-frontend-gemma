## **Eines de diagramació: visuals vs. code-first**

**Mermaid.js Live Editor**  
Eina online per crear fluxos i diagrames amb codi.  
[https://mermaid.live/edit](https://mermaid.live/edit)

**Draw.io**  
Plantilles predefinides per UML i ERD.  
[https://app.diagrams.net/](https://app.diagrams.net/)

**Draw.io: Tutorial en 10 minuts**  
Vídeo ràpid per començar a crear diagrames amb Draw.io.  
[https://www.youtube.com/watch?v=z-o1aEBmyTg](https://www.youtube.com/watch?v=z-o1aEBmyTg)

**Mermaid.js \+ VS Code**  
Integració directa. Suport de Mermaid en Markdown directament a VS Code.  
[https://code.visualstudio.com/docs/languages/markdown\#\_mermaid-diagram-support](https://code.visualstudio.com/docs/languages/markdown#_mermaid-diagram-support)

## **Per què importa triar bé l'eina?**

Quan has de crear un diagrama, pots fer-ho de dues maneres: arrossegant i connectant elements visualment (eines visuals), o escrivint text que es converteix en diagrama automàticament (eines code-first). Cap de les dues és millor en absolut: cada una té el seu context ideal, i triar la correcta t'estalvia temps i facilita el manteniment dels diagrames a llarg termini.

**Eines visuals: Draw.io i Lucidchart**

Les eines visuals funcionen com un editor gràfic: arrossegues formes, les connectes amb fletxes i les etiquetes. No cal aprendre cap sintaxi ni codi.

**Draw.io (diagrams.net)** és completament gratuïta i funciona al navegador sense crear compte. Té plantilles predefinides per a fluxos lògics, UML, ERD, sitemaps i molts altres tipus. Es pot integrar amb Google Drive i guardar els diagrames directament com a fitxers `.drawio` al repositori. És l'eina recomanada per a qui comença, per a reunions amb clients, i per a diagrames complexos amb molts elements visuals.

**Lucidchart** és similar però amb més funcionalitats de col·laboració en temps real. Té versió gratuïta limitada i és molt popular en entorns empresarials.

**Quan usar eines visuals:**

* Quan el diagrama és complex i té molts elements difícils d'escriure en text  
* Quan has de presentar-lo a persones no tècniques (clients, dissenyadors, stakeholders)  
* Quan treballes en equip i necessites col·laboració en temps real  
* Quan necessites exportar el resultat com a imatge o PDF  
* Per a fases inicials del projecte on s'estan explorant opcions

**Eines code-first: Mermaid.js**

Les eines code-first generen diagrames automàticament a partir de text. Escrius la descripció del diagrama en una sintaxi senzilla i l'eina el renderitza visualment.

**Mermaid.js** és l'estàndard en el món del desenvolupament web. La seva gran avantatge és que els diagrames són text pla, de manera que van a Git com qualsevol altre fitxer, es poden revisar en Pull Requests i mai queden desactualitzats respecte al codi.

Un exemple de com s'escriu un flux senzill amb Mermaid:

flowchart TD  
    A\[Usuari omple formulari\] \--\> B{Dades vàlides?}  
    B \--\>|Sí| C\[Guardar a la BD\]  
    B \--\>|No| D\[Mostrar error\]  
    C \--\> E\[Redirigir al panell\]

Mermaid suporta molts tipus de diagrames: fluxos (`flowchart`), seqüències (`sequenceDiagram`), ERD (`erDiagram`), sitemaps (`graph`), Gantt i més.

**Mermaid a VS Code:** VS Code suporta Mermaid en fitxers Markdown. Pots crear blocs de codi amb el llenguatge `mermaid` i veure'n la previsualització directament a VS Code amb `Ctrl+Shift+V` o `Ctrl+K V` per veure-la al costat del codi.

**Mermaid a GitHub:** GitHub renderitza automàticament els blocs Mermaid en fitxers `.md`, Issues i Pull Requests. Això significa que els teus diagrames es veuen directament a la web de GitHub sense cap configuració addicional.

**Mermaid Live Editor** (`mermaid.live`) és una eina online on pots escriure i previsualitzar diagrames Mermaid en temps real sense necessitat d'instal·lar res, i exportar el resultat com a imatge.

**Quan usar Mermaid:**

* Quan el diagrama forma part de la documentació tècnica del projecte  
* Quan vols que el diagrama visqui al costat del codi al repositori  
* Quan necessites que el diagrama s'actualitzi fàcilment a mesura que el codi canvia  
* Per a diagrames de seqüència i fluxos entre components  
* Quan treballes en un entorn de developers on tothom entén Markdown

**La combinació ideal per a projectes web**

No és una elecció exclusiva: en un projecte real usaràs les dues. La clau és saber quin moment demana quina eina.

En les **fases inicials** (planificació, reunions amb clients, exploració d'opcions) les eines visuals com Draw.io guanyen perquè permeten crear ràpidament i modificar en temps real sense aprendre sintaxi. En les **fases de desenvolupament** (documentació tècnica, fluxos entre components, diagrames que han de viure al repositori) Mermaid guanya perquè s'integra perfectament amb el codi i el control de versions.

**Resum comparatiu**

|  | Draw.io / Lucidchart | Mermaid.js |
| ----- | ----- | ----- |
| Tipus | Visual (arrossegar i soltar) | Code-first (text → diagrama) |
| Corba d'aprenentatge | Molt baixa | Baixa (sintaxi senzilla) |
| Integració amb Git | Fitxer `.drawio` (binari) | Text pla, fàcil de revisar |
| Ideal per a | Presentacions, clients, complexitat visual | Documentació tècnica, repos |
| Actualització | Manual | Fàcil (editar text) |
| Col·laboració | Temps real (Lucidchart) | Via Pull Request |
| Integració VS Code | No nativa | Sí, suport natiu en Markdown |
| Integració GitHub | No | Sí, renderitza automàticament |
| Cost | Gratuït (Draw.io) | Gratuït i open source |

