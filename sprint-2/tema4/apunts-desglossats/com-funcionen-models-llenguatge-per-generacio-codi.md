## **Com funcionen els models de llenguatge per a la generació de codi**

**Introducció: els LLM i el codi**

Els LLM son proficients en la generació de codi a partir de prompts en llenguatge natural. 

Exemples inclouen Amazon CodeWhisperer i el Codex d'OpenAI usat a GitHub Copilot, que poden codificar en Python, JavaScript, Ruby i diversos altres llenguatges de programació. 

Altres aplicacions de codificació inclouen crear consultes SQL, escriure comandes de shell i disseny de webs.

La clau per entendre com funcionen és entendre que els models de codi **no "pensen" com un programador**: aprenen patrons estadístics de milions de repositoris de codi i predeixen quina és la continuació més probable d'una seqüència donada.

**El Transformer: l'arquitectura fonamental**

L'arquitectura transformer es refereix a un disseny de xarxa neuronal creat per processar dades seqüencials com text. Els models convencionals tenien dificultats en aprendre les dependències de llarg abast en frases. No obstant, els transformers van canviar el joc introduint el mecanisme d'auto-atenció.

A diferència de les xarxes neuronals recurrents (RNN) anteriors que processaven els inputs de manera seqüencial, els transformers processen seqüències senceres en paral·lel. Això permet als científics de dades usar GPUs per entrenar LLMs basats en transformers, reduint significativament el temps d'entrenament.

### **El mecanisme d'auto-atenció (Self-Attention)**

El mecanisme d'auto-atenció de l'arquitectura transformer mesura la significació de les diferentes paraules en una frase respecte les unes a les altres, independentment de la seva posició. Ajuda a millorar la comprensió contextual, cosa que és útil per generar text coherent i rellevant.

Aplicat al codi: quan el model veu `function calcular(`, l'auto-atenció li permet relacionar-ho amb les variables declarades anteriorment, el nom de la funció, i el context general del fitxer, tot alhora.

### **L'arquitectura moderna: únicament el decoder**

El transformer original tenia una estructura encoder-decoder per a la traducció automàtica. Els LLMs moderns — GPT-4o, Claude, Llama, Gemini, Mistral — tots usen únicament la meitat del decoder amb màscara causal. Sense encoder, sense cross-attention.

**Com processa el codi: tokenització i embeddings**

Aquesta limitació es va superar usant vectors multi-dimensionals, comunament referits com a word embeddings, per representar paraules de manera que paraules amb significats contextuals similars o altres relacions estan properes les unes a les altres en l'espai vectorial. 

Usant word embeddings, els transformers poden pre-processar text com a representacions numèriques a través de l'encoder i entendre el context de paraules i frases amb significats similars.

El procés complet per a la generació de codi:

1\. TOKENITZACIÓ: "const suma \= (a, b) \=\> a \+ b"  
   → \["const", " suma", " \=", " (", "a", ",", " b", ")", "=\>", " a", "+", " b"\]  
     
2\. EMBEDDINGS: cada token → vector numèric de milers de dimensions  
   "const" → \[0.23, \-0.45, 0.87, ...\] (vector en espai semàntic)  
     
3\. SELF-ATTENTION: cada token "mira" tots els altres tokens  
   El token "b" (el de la suma) sap que és el segon paràmetre  
   i que s'usa al cos de la funció  
     
4\. PREDICCIÓ: el model prediu el proper token més probable  
   Donats tots els anteriors → quin token ve ara?

**Aprenentatge per Transferència (Transfer Learning)**

Per exemple, es podria aprofitar un model pre-entrenat entrenat en el llenguatge anglès i després fer fine-tuning en un corpus d'arXiv, resultant en un model basat en ciència/recerca. 

El fine-tuning únicament requerirà una quantitat limitada de dades: el coneixement que el model pre-entrenat ha adquirit es "transfereix", d'aquí el terme transfer learning. El fine-tuning d'un model, per tant, té costos inferiors en temps, dades, finances i medi ambient.

En el context dels models de codi:

**Pre-entrenament** — el model s'entrena en quantitats massives de text i codi de la web (GitHub, Stack Overflow, documentació...). Aprèn sintaxi, patrons, idiomes i conceptes generals de programació.

**Fine-tuning** — el model pre-entrenat s'especialitza per a tasques específiques: generació de codi, completat automàtic, detecció de bugs, traducció entre llenguatges.

Hauríeu de sempre intentar aprofitar un model pre-entrenat — el més proper possible a la tasca que teniu entre mans — i fer fine-tuning. Aquest procés també aconseguirà millors resultats que entrenar des de zero (tret que tingueu moltes dades).

**Els tres tipus d'entrenament dels LLM**

1. ### **Pre-entrenament (Pre-training): aprendre el codi**

El model veu milers de milions de tokens de codi i aprèn a predir el token següent. Si ha vist milions de funcions JavaScript, sap que after `function nom(` generalment ve una llista de paràmetres separats per comes.

2. ### **RLHF: aprendre de feedback humà**

Reinforcement Learning from Human Feedback: humans avaluen les sortides del model (quina resposta és millor?). El model aprèn a generar codi no únicament correcte sinó útil, segur i ben explicat.

3. ### **Instruction Tuning: aprendre a seguir instruccions**

El model s'entrena amb parelles instrucció → resposta per aprendre a entendre i executar tasques descrites en llenguatge natural: "Escriu una funció TypeScript que..." → codi correcte.

**Per què els LLM son bons generant codi**

Inspirats per les capacitats dels transformers en un rang de tasques de llenguatge natural, els models de llenguatge basats en transformers moderns han estat adoptats per a la síntesi de programes tractant els llenguatges de programació de la mateixa manera que els llenguatges naturals.

Els LLM son especialment bons en codi per diverses raons:

* **El codi és altament estructurat** — la sintaxi de JavaScript, Python o TypeScript és molt més consistent i predictible que el llenguatge natural. Aprendre patrons és més fàcil.  
* **Enormes quantitats de dades disponibles** — GitHub conté bilions de línies de codi públic de tots els llenguatges, frameworks i patrons imaginables.  
* **Verificabilitat** — a diferència del text natural, el codi es pot executar i verificar automàticament. Això permet entrenar amb feedback objectiu (el codi compila? els tests passen?).

**Les limitacions dels LLM per a la generació de codi**

Els models de codi generen la continuació estadísticament més probable, no necessàriament la lògicament correcta. Les limitacions principals:

* **Alucinació** — el model pot generar codi que sembla correcte però conté bugs subtils, usa APIs inexistents, o implementa una lògica incorrecta.  
* **Context limitat** — el model únicament "veu" una finestra de context. En projectes grans, no pot entendre tota la codebase alhora.  
* **No raonament real** — el model no "entén" el problema. Reconeix patrons. Per a problemes molt nous o complexos, els patrons apresos poden no ser suficients.

En la tardor de 2024, va emergir un nou enfocament al desenvolupament de LLM amb els "reasoning models". 

Aquests son entrenats per generar anàlisi pas a pas abans de produir respostes finals, habilitant millors resultats en tasques complexes, per exemple en matemàtiques, codificació i lògica.

**El flux complet de la generació de codi**

Tu escrius el prompt:  
"Escriu una funció TypeScript que validi un email"  
         ↓  
Tokenització: el text → seqüència de tokens numèrics  
         ↓  
Embeddings: cada token → vector en espai semàntic  
         ↓  
Transformer blocks (32-126 capes):  
  \- Self-attention: cada token "mira" tots els altres  
  \- Feedforward: incorpora coneixement après en l'entrenament  
         ↓  
Predicció del proper token (softmax):  
  Distribució de probabilitats sobre tots els tokens possibles  
  → tria el més probable (o fa sampling per varietat)  
         ↓  
El token generat s'afegeix al context i es repeteix  
         ↓  
Sortida: "function validarEmail(email: string): boolean {  
  const regex \= /^\[^\\s@\]+@\[^\\s@\]+\\.\[^\\s@\]+$/;  
  return regex.test(email);  
}"

**Conceptes clau**

| Concepte | Què és | Per què importa |
| ----- | ----- | ----- |
| **Transformer** | Arquitectura de xarxa neuronal | Processa tot el context en paral·lel |
| **Self-Attention** | Mecanisme de relació entre tokens | Entén el context del codi |
| **Token** | Unitat mínima de text/codi | El que el model prediu un a un |
| **Embedding** | Vector numèric d'un token | Representa el significat en espai matemàtic |
| **Pre-entrenament** | Entrenament en dades massives | Adquireix coneixement general de codi |
| **Fine-tuning** | Especialització en tasques concretes | Adapta el model per a ús específic |
| **Transfer Learning** | Reutilitzar coneixement pre-entrenat | Menys dades i cost per especialitzar-se |
| **RLHF** | Feedback humà per millorar | El codi generat és útil, no únicament correcte |

