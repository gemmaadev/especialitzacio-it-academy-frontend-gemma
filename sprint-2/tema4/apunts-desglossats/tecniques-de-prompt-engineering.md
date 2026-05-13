## **Tècniques de Prompt Engineering per a resultats més precisos**

**Prompt Engineering Guide**  
[https://github.com/dair-ai/Prompt-Engineering-Guide](https://github.com/dair-ai/Prompt-Engineering-Guide)  
Guia completa de tècniques i bones pràctiques per al disseny de prompts efectius en IA.

**Què és el Prompt Engineering**

El prompt engineering és el procés d'estructurar inputs de llenguatge natural (coneguts com a prompts) per produir sortides especificades d'un model d'intel·ligència artificial generativa. Les tècniques efectives de prompt engineering inclouen el few-shot prompting, el chain-of-thought prompting i l'assignació de rols.

La qualitat del prompt és directament proporcional a la qualitat de la resposta. Una enquesta de 2024 del camp va identificar més de 50 tècniques de prompting basades en text, 40 variants multimodals, i un vocabulari de 33 termes usats en la recerca de prompting.

**1\. Zero-Shot Prompting: sense exemples previs**

El zero-shot prompting és una tècnica que usa les capacitats de generalització dels LLMs per intentar noves tasques sense entrenament específic previ ni exemples.

És la forma més simple: simplement descrius la tasca i el model l'intenta resoldre basant-se únicament en el seu entrenament.

| ❌ Zero-shot vague:"Escriu codi"✅ Zero-shot ben formulat:"Escriu una funció TypeScript que rebi un array de nombresi retorni la mitjana aritmètica. La funció ha de gestionararrays buits retornant 0." |
| :---- |

Per a tasques de domini especialitzat poc familiars al model, el rendiment zero-shot és sovint inestable, i els formats de sortida son difícils de controlar amb precisió. Quan el zero-shot no és suficient, cal passar a tècniques més avançades.

**2\. Few-Shot Prompting: aprendre amb exemples**

Proporcionar únicament uns pocs exemples d'input-output (típicament 3-8) en el prompt permet al model "entendre" ràpidament els patrons de la tasca i produir sortides amb format consistent i qualitat estable en nous inputs. 

El valor central del Few-shot resideix en el control del format i la calibració del comportament. A través d'exemples acuradament seleccionats, els developers poden comunicar implícitament al model: l'estructura de sortida esperada, la profunditat i l'estil del raonament, l'ús de terminologia específica del domini, i com gestionar casos límit.

| Prompt Few-Shot per a revisió de codi:"Revisa el codi següent i identifica els problemes. A continuació tens exemples:Exemple 1:Codi: function sum(a, b) { return a \- b; }Problema: L'operador hauria de ser \+ no \-Exemple 2:Codi: const x \= null; x.toString();Problema: Accés a propietat de null causarà TypeErrorAra revisa:Codi: async function loadData() { const data \= fetch('/api/users'); return data.json(); }" |
| :---- |

Usem few-shot prompting per resoldre tasques complexes de domini específic amb inputs variats que necessiten sortides precises. També l'usem quan necessitem sortides estructurades precisament en formats JSON o YAML.

**3\. Chain-of-Thought (CoT): pensar pas a pas**

El chain-of-thought (CoT) prompting és una estratègia que planteja una tasca al model especificant la tasca major com una sèrie de passos discrets per resoldre. Aquesta exposició de passos intermediaris millora la capacitat del model per generar una resposta correcta. El CoT també permet una millor transparència en el procés de resolució de problemes gràcies a l'aclariment dels passos intermediaris.

Simplement afegint les paraules "Let's think step-by-step" també és efectiu, cosa que va permetre que el CoT s'empleés com a tècnica zero-shot.

| ❌ Sense CoT: resultat directe (pot ser incorrecte)"Quants tests necessito per cobrir aquesta funció?function calcularIVA(preu) { return preu \* 0.21 }"✅ Amb CoT: el model raona pas a pas"Analitza pas a pas quants tests necessito per cobrircompletament aquesta funció. Considera: 1\) casos normals,2\) casos límit, 3\) tipus incorrectes. Finalment,proposa cada test amb Jest.function calcularIVA(preu) { return preu \* 0.21 }" |
| :---- |

Les millors pràctiques per al CoT inclouen proporcionar passos lògics clars en el prompt així com uns pocs exemples per guiar el model. Combinar CoT amb few-shot prompting pot ser particularment efectiu per a tasques complexes.

**4\. Role Prompting: assignar un rol específic**

Assignar un rol al model condiciona tota la seva resposta: el vocabulari, el nivell de detall, les prioritats i fins i tot els aspectes que considera importants.

Les tècniques de prompt engineering com zero-shot, few-shot, chain-of-thought, meta, self-consistency i role milloren la precisió de les respostes dels LLM.

| ❌ Sense rol:"Revisa aquest codi TypeScript"✅ Amb rol específic:"Ets un enginyer de software sènior especialitzat enTypeScript i SOLID principles amb 10 anys d'experiència.Revisa el codi següent centrant-te en:1\. Violacions dels principis SOLID2\. Possibles bugs de tipat3\. Problemes de rendimentProposa refactoritzacions concretes amb exemples de codi." |
| :---- |

**5\. Prompt Chaining: dividir tasques complexes**

Per a casos d'ús complexos com ara tasques de raonament multipas, tant el zero-shot prompting com el few-shot prompting poden fallar en produir una resposta apropiada del model. Les tècniques avançades de prompting incloent chain-of-thoughts i tree-of-thoughts poden ser més exitoses en aquests casos.

El Prompt Chaining divideix una tasca gran en subtasques seqüencials on la sortida d'un pas és l'entrada del següent:

| Tasca gran: "Analitza i refactoritza tota l'aplicació"Cadena de prompts:Pas 1 → "Analitza l'arquitectura i identifica les violacions SOLID"  ↓ (sortida: llista de problemes)Pas 2 → "Per a cada problema identificat, proposa una solució concreta"  ↓ (sortida: pla de refactorització)Pas 3 → "Implementa la solució per al problema \#1: \[problema específic\]"  ↓ (sortida: codi refactoritzat)Pas 4 → "Escriu tests unitaris per al codi refactoritzat" |
| :---- |

**6\. Context i especificitat: les bases d'un bon prompt**

Les tècniques anteriors funcionen molt millor quan el prompt és específic i proporciona context suficient. Els elements que cal incloure:

**Context del projecte** — el model no sap en quin projecte treballes:

| ❌ "Escriu un component de login"✅ "Escriu un component React de login amb TypeScript.   El projecte usa React 18, TailwindCSS i Zod per a   la validació. El formulari ha de tenir email i password,   gestionar errors de l'API, i mostrar un loader mentre   es processa." |
| :---- |

**Format de sortida desitjat** — especifica el format exacte que vols:

| "Retorna la resposta en el format següent:1\. Descripció del problema (1-2 frases)2\. Codi corregit (bloc TypeScript)3\. Explicació dels canvis (llista de punts)" |
| :---- |

**Restriccions i limitacions** — delimita el que NO vols:

| "No usis classes. Usa únicament funcions i hooks.No instal·lis noves dependències. Manté la compatibilitatamb Node.js 18." |
| :---- |

**7\. Tree of Thoughts: explorar múltiples camins**

El Tree-of-thought prompting generalitza el chain-of-thought generant múltiples línies de raonament en paral·lel, amb la capacitat de retrocedir o explorar altres camins. Pot usar algorismes de cerca d'arbres com breadth-first, depth-first o beam.

Útil quan hi ha múltiples enfocaments possibles per a un problema de codi i vols que el model els avaluï:

| "Considera tres enfocaments per implementar el cachingen la nostra API:\- Enfocament A: Redis (pros i contres)\- Enfocament B: In-memory Map (pros i contres)\- Enfocament C: Service Worker (pros i contres)Per a cada enfocament, analitza: complexitat, rendiment,escalabilitat i mantenibilitat. Finalment, recomana elmillor per a una API de 1000 req/min amb equip de 3 devs." |
| :---- |

**Les regles pràctiques per a generació de codi**

Aplicades específicament a tasques de programació:

1\. ESPECIFICA EL CONTEXT TÈCNIC  
   "TypeScript strict mode, Node 20, ESM modules"

2\. DESCRIU ELS INPUTS I OUTPUTS EXACTES  
   "Rep: array d'objectes Usuari. Retorna: Map\<id, Usuari\>"

3\. MENCIONA LES RESTRICCIONS  
   "Sense dependències externes. Complexitat O(n)"

4\. DEM ANA EL FORMAT  
   "Amb JSDoc, tests Jest per als casos límit,  
   i explicació de les decisions de disseny"

5\. DEMANA VALIDACIÓ  
   "Explica possibles edge cases i com els gestiones"

**Tècniques per a cada situació**

| Situació | Tècnica recomanada |
| ----- | ----- |
| Tasca simple i clara | Zero-shot ben formulat |
| Format de sortida molt específic | Few-shot amb exemples del format |
| Problema complex multipas | Chain-of-Thought (CoT) |
| Revisió de codi experta | Role Prompting (rol d'expert) |
| Anàlisi arquitectural gran | Prompt Chaining (dividir en passos) |
| Triar entre opcions | Tree of Thoughts |
| Resultats inconsistents | Self-Consistency (múltiples crides) |

