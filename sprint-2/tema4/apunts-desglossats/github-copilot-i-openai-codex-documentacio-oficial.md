## **GitHub Copilot i OpenAI Codex: Documentació oficial**

###### **GitHub Copilot Documentation**

[https://docs.github.com/en/copilot](https://docs.github.com/en/copilot)  
Documentació oficial de GitHub Copilot per aprendre a configurar i utilitzar l’assistent de codi.

###### **OpenAI Codex Paper** [https://openai.com/index/openai-codex/](https://openai.com/index/openai-codex/)

Article oficial que introdueix OpenAI Codex i les seves aplicacions en programació assistida per IA.

**OpenAI Codex: els orígens i l'evolució**

A l'agost de 2021, OpenAI va introduir Codex, un model de llenguatge especialitzat fine-tuned de GPT-3 per al propòsit de generar, entendre i transformar codi informàtic. Codex va representar un canvi significatiu cap al fine-tuning específic de tasques dels grans models de llenguatge.

El model va ser entrenat en una col·lecció diversa de codi disponible públicament de GitHub, cobrint múltiples llenguatges de programació, frameworks i dominis d'aplicació. 

Quan se li donaven descripcions en llenguatge natural de la funcionalitat desitjada, Codex podia generar implementacions de codi funcionals, i quan se li donava codi, podia explicar-lo, modificar-lo, o traduir-lo entre llenguatges.

Quan GitHub Copilot es va llançar el 2021, estava impulsat per un sol model: Codex, un descendent de GPT-3. En aquell moment, Codex era una revelació. Capaç d'entendre i generar codi en el IDE amb una fluïdesa sorprenent, Codex va ajudar a demostrar que la IA podia ser una eina valuosa per als developers.

**La relació Codex → Copilot: model vs. producte**

La distinció fonamental és: **Codex és el model** (el "cervell"), **Copilot és el producte** (la interfície per als developers).

OpenAI Codex era un model de generació de codi accessible via API, mentre que GitHub Copilot és un assistent IDE completament integrat amb completions inline i xat. En 2025, la majoria de developers usen Copilot en lloc d'una API Codex standalone per al treball diari.

Des de llavors, Copilot ha transicionat lluny de Codex i ara per defecte usa els models frontier més recents, mentre també dóna als developers accés a la seva elecció de models avançats.

**GitHub Copilot: arquitectura i models actuals**

GitHub Copilot està impulsat per models d'IA generativa desenvolupats per GitHub, OpenAI i Microsoft. Ha estat entrenat en text de llenguatge natural i codi font de fonts disponibles públicament, incloent codi en repositoris públics de GitHub.

Intel·ligència de línia base: GitHub Copilot ara per defecte usa GPT-4.1 a través del xat, el mode d'agent i les completions de codi. Optimitzat per a velocitat, raonament i gestió de context, GPT-4.1 suporta més de 30 llenguatges de programació. 

Accés a models frontier: en els tiers Pro+, Business i Enterprise, els developers poden triar entre una àmplia gamma de models avançats via el selector de models, incloent Claude Sonnet 4, Claude Opus 4, GPT-5, o3 i o4-mini.

**Les quatre funcionalitats principals de GitHub Copilot**

### **1\. Inline Suggestions (completions automàtiques)**

Les inline suggestions funcionen automàticament mentre escrius, aprenent dels teus patrons i el context del teu projecte. Son particularment útils per escriure codi boilerplate, estructures HTML i patrons repetitius.

Copilot prediu el teu proper canvi lògic, i pots acceptar suggeriments amb la tecla Tab.

| Funcionament:Escrius → "function calcularTotal(" ← cursorCopilot llegeix: fitxer actual, fitxers oberts, context recentCopilot genera: "(productes: Producte\[\]): number {"Prems Tab → acceptes la suggerènciaCopilot continua generant el cos de la funció |
| :---- |

### **2\. Inline Chat (edicions precises)**

Usa l'inline chat per a edicions dirigides prement Ctrl+I/Cmd+I per obrir un prompt de xat directament a l'editor. Descriu un canvi i Copilot suggereix edicions in-place per refactoritzar mètodes, afegir gestió d'errors, o explicar algoritmes complexos sense deixar l'editor.

| Dreceres clau:Cmd+I (Mac) / Ctrl+I (Win) → obre inline chat sobre el codi seleccionatExemples de prompts inline:  "Afegeix gestió d'errors TypeScript"  "Refactoritza usant el patró Strategy"  "Explica quèfa aquesta funció"  "Genera tests unitaris per a aquest mètode" |
| :---- |

### 

### **3\. Copilot Chat (xat general)**

Inicia una conversa de xat en llenguatge natural per obtenir ajuda amb tasques de codificació. Per exemple, demana que expliqui un bloc de codi o un concepte de programació, refactoritzi un tros de codi, o implementi una nova funcionalitat.

Les instruccions personalitzades per a tot el projecte es defineixen en `.github/copilot-instructions.md`:

| \<\!-- .github/copilot-instructions.md \--\>\# Instruccions per al projecte\#\# Stack tecnològic\- TypeScript strict mode\- React 18 \+ Vite\- Tests amb Vitest \+ React Testing Library\#\# Convencions\- Usa funcions fletxa per a tots els components\- Aplica el patró de Dependency Injection\- Noms en català per a les variables del domini\- Sempre inclou jsdoc per a funcions públiques\#\# Estil de codi\- Funcions menors de 20 línies (Clean Code)\- Un fitxer, una responsabilitat (SRP) |
| :---- |

### **4\. Agent Mode (mode autònom)**

Un agent és un assistent d'IA que treballa de manera autònoma per completar una tasca de codificació. A diferència de la completació de codi tradicional, que suggereix les properes línies, un agent pren un objectiu, el divideix en passos, edita fitxers a través del projecte, executa comandes i s'autocorregeix quan alguna cosa va malament.

En agent mode, Copilot pot iterar sobre el seu propi codi. Això inclou identificar i arreglar errors automàticament, executar comandes de terminal per completar una tasca sol·licitada i resoldre errors de runtime amb capacitats d'auto-healing.

| Exemple d'ús en Agent Mode:Prompt: "Implementa autenticació JWT per a l'API.Inclou: login, register, refresh token, i middleware de protecció.Usa bcrypt per a les contrasenyes i zod per a la validació."Agent:1\. Analitza l'estructura del projecte existent2\. Crea els fitxers necessaris (auth.controller.ts, auth.service.ts, etc.)3\. Implementa cada funcionalitat4\. Actualitza les rutes i el middleware5\. Genera tests per a cada endpoint6\. Auto-corregeix errors de compilació TypeScript |
| :---- |

**Codex com a agent autònom el 2025-2026**

L'agent de codificació OpenAI Codex és disponible en els plans GitHub Copilot Pro, GitHub Copilot Pro+, GitHub Copilot Business i GitHub Copilot Enterprise. L'agent de codificació OpenAI Codex i la integració VS Code OpenAI Codex usen el Codex SDK i poden ser impulsats per la teva subscripció existent de Copilot.

El 2026, OpenAI Codex ha estat reimaginat com un Agent d'Enginyeria de Software especialitzat optimitzat per a tasques de "llarg horitzó", on pot gestionar independentment un repositori en un sandbox segur. 

A diferència d'un plugin estàndard, funciona com a "empleat digital" capaç d'assignar-se a una issue de GitHub, clonar el repositori i iterar a través de refactoritzacions multi-fitxer o migracions complexes sense supervisió humana constant.

**Configuració pràctica de GitHub Copilot**

| \# 1\. Instal·lar l'extensió a VS Code\# Extensions (Ctrl+Shift+X) → "GitHub Copilot" → Install\# 2\. Autenticar amb el compte GitHub\# Sign in with GitHub quan l'extensió ho demani\# 3\. Verificar que funciona\# Obre un fitxer .ts i escriu un comentari → veuràs les suggerències\# Pla gratuït: 2.000 completions/mes \+ 50 missatges de xat\# Pro ($10/mes): completions il·limitades \+ agent mode\# Pro+ ($40/mes): accés als millors models (Claude Opus 4, GPT-5) |
| :---- |

**Resum: Codex vs. Copilot**

|  | OpenAI Codex | GitHub Copilot |
| ----- | ----- | ----- |
| **Tipus** | Model base / Agent autònom | Producte integrat al IDE |
| **Accés** | Via Codex SDK \+ GitHub Copilot | Plugin per a VS Code, JetBrains, etc. |
| **Cas d'ús** | Tasques autònomes de llarg horitzó | Assistència diària en temps real |
| **Context** | Repositori sencer en sandbox | Fitxers oberts \+ context local |
| **Interacció** | S'assigna a issues, treballa autònomament | Inline \+ Chat \+ Agent Mode |
| **Ideal per a** | Migracions, refactorings grans | Codificació diària, boilerplate, tests |

