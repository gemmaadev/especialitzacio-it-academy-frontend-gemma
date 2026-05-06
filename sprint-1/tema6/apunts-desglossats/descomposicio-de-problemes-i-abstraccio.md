## **Descomposició de problemes i abstracció per simplificar la resolució de problemes**

**El pensament computacional: la base de la resolució de problemes**

Enfocar els problemes amb estructura en lloc d'endevinalles significa definir el problema clarament, dividir-lo en parts més petites, dissenyar solucions pas a pas i provar els resultats. Aquest procés es recolza en el pensament computacional, el reconeixement de patrons, l'abstracció i el raonament algorítmic.

Hi ha cinc processos cognitius per resoldre problemes de manera eficient i creativa: reformulació del problema (replanteja un problema en un de soluble i familiar), recursió (construeix un sistema incrementalment), descomposició del problema (divideix el problema en unitats manejables), abstracció (modela els aspectes principals de problemes complexos) i testing sistemàtic (pren accions concretes per derivar solucions).

**Descomposició: dividir per vèncer**

La descomposició de problemes és el procés de dividir un problema gran i complex en subproblemes més petits i manejables. Aquesta estratègia fa que les tasques aclaparadores siguin molt més fàcils d'entendre, analitzar i resoldre de manera sistemàtica. La tècnica transforma reptes abstractes i aclaparadors en passos concrets i accionables.

En termes pràctics de debugging: quan l'aplicació falla, no mires el codi sencer d'un cop. Fas exactament el que fa un metge: localitzes el símptoma, identifiques quin sistema pot estar fallant, i vas reduint el focus fins a trobar la causa exacta. Un error a la pantalla de checkout pot venir del frontend, de l'API, de la base de dades o de la lògica de negoci. La descomposició et permet aïllar cada capa.

**El procés pas a pas:**

1\. Entén el problema sencer (què falla? quan? en quines condicions?)  
         ↓  
2\. Identifica els components implicats (frontend? backend? BD? API externa?)  
         ↓  
3\. Divideix en subproblemes (un per component)  
         ↓  
4\. Resol cada subproblema per separat (testeja cada capa)  
         ↓  
5\. Integra les solucions (combina les peces)  
         ↓  
6\. Verifica que el problema original s'ha resolt

**Abstracció: ignorar el que no importa**

L'abstracció significa ignorar els detalls irrellevants per centrar-se en el que importa. Els enginyers usen l'abstracció per crear models de test, preguntant-se: "Quins són els fluxos d'usuari essencials i els estats de dades, i com puc representar-los de manera senzilla per provar-los efectivament?"

L'abstracció és l'element principal que sustenta el pensament computacional, on les persones obtenen informació rellevant (i descarten les dades irrellevants) de sistemes complexos per generar patrons i trobar punts en comú entre representacions diferents. L'abstracció té capes, per tant cal definir cada capa i aclarir les relacions entre elles.

Quan debuges un error `TypeError: Cannot read property 'map' of undefined`, l'abstracció et diu que **no necessites llegir tot el codi de l'aplicació**: únicament has de trobar on s'espera un array i on arriba `undefined` en el seu lloc. Tot el codi que no té res a veure amb aquella variable és irrellevant en aquell moment.

**La combinació en el debugging: un exemple real**

Imagina que un usuari reporta "no puc afegir productes al carret". El problema és vague i complex. Apliquem descomposició i abstracció:

| // El problema: "Afegir al carret no funciona"// ❌ Mal enfocament: llegir tot el codi buscant el bug// ✅ Bon enfocament: descompondre primer// 1\. On falla? Frontend o backend?//    → Obro DevTools → Network → faig clic al botó//    → Veig la petició HTTP → resposta 500//    → El problema és al backend (he aïllat la capa)// 2\. Quina part del backend?//    → Miro els logs del servidor//    → Error: "Cannot read property 'id' of undefined" a line 47 de cart.js//    → He aïllat el fitxer i la línia// 3\. Quèespera el codi i quèrep?//    → La funció espera req.body.productId//    → La petició del frontend no envia el camp (abstracció: el camp és l'únic que importa)// 4\. Solució: afegir productId a la petició del frontend |
| :---- |

Quan un sistema complex falla, la descomposició és clau per trobar l'origen. Corregeix bugs o implementa funcionalitats un mòdul a la vegada. 

En sistemes complicats, múltiples components poden necessitar ser depurats simultàniament. 

Combina tots els components en un sistema complet. Prepara't per identificar nous bugs durant la integració i repetir la descomposició si cal.

**De problema real a passos algorísmics**

El procés de transformar un problema real en passos algorísmics és el punt on la descomposició i l'abstracció es combinen.

**Exemple: el formulari de login no funciona**

Problema real: "El login no funciona"  
         ↓ Reformulació (abstracció)  
"La funció d'autenticació retorna false quan les credencials són correctes"  
         ↓ Descomposició en subproblemes  
1\. El frontend envia les dades correctament?  
     → console.log(formData) → ✅ ok           
2\. La petició HTTP arriba al servidor?         
     → Network tab → ✅ la petició arriba          
3\. El servidor rep les dades correctament?      
     → console.log(req.body) → ✅ ok             
4\. La comparació de contrasenyes funciona?     
     → console.log(bcrypt.compare(pw, hash))    
     → ❌ retorna false                           
     → El hash s'ha generat amb la versió        
     incorrecta de bcrypt                      
         ↓ Solució identificada  
Regenerar el hash amb la versió correcta de bcrypt

**Les quatre regles pràctiques**

* **Regla 1: Mai saltar directament al codi.** Primer entén el problema en paraules. Descriu el que hauria de passar i el que passa. La diferència entre els dos és el bug.  
* **Regla 2: Aïlla abans de solucionar.** Reprodueix el problema en el context més simple possible. Si pots reproduir el bug amb 10 línies en lloc de 1000, el problema és molt més fàcil de veure.  
* **Regla 3: Una variable a la vegada.** Quan proves solucions, canvia únicament una cosa a la vegada. Si canvies dues coses i el bug desapareix, no saps quina l'ha solucionat.  
* **Regla 4: El bug sempre és al codi que has escrit.** La biblioteca de tercers, el framework o el navegador rarament fallen. Si sembla que és culpa seva, primer verifica que estàs usant l'API correctament.

**Resum** 

Problema complex i aclaparador  
          ↓  
DESCOMPOSICIÓ: dividir en parts petites  
  └── Identifica les capes (UI, API, BD)  
  └── Aïlla la capa on falla  
  └── Dins d'aquella capa, aïlla el component  
  └── Dins del component, aïlla la funció  
          ↓  
ABSTRACCIÓ: eliminar el soroll  
  └── Ignora el codi irrellevant  
  └── Centra't únicament en les dades que entren i surten  
  └── Reformula: "Esperava X, he rebut Y"  
          ↓  
ALGORISME: passos per resoldre-ho  
  └── Hipòtesi → Prova → Resultats → Ajusta  
  └── Un canvi a la vegada  
  └── Verifica que la solució no trenca res més

