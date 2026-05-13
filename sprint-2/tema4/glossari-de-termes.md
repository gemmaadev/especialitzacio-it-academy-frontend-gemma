## **Glossari de termes — IA aplicada a la generació optimització de codi**

**Agent Mode** — Mode de funcionament d'una eina d'IA on l'assistent actua de manera autònoma: pren un objectiu d'alt nivell, el divideix en passos, edita fitxers a través del projecte, executa comandes de terminal i s'autocorregeix quan troba errors. Diferent del mode chat on únicament respon preguntes.

**Agentic AI / Codificació Agèntica** — Paradigma on els agents d'IA executen tasques multi-pas durant minuts o hores sense intervenció humana constant. En software development: l'agent s'assigna a una issue, clona el repositori, implementa la solució, executa tests i obre una PR.

**Air-gapped Deployment** — Desplegament d'una eina d'IA completament aïllat de la xarxa externa. Cap dada surt de l'organització. La única opció viable per a sectors regulats (defensa, sanitat, finances). Tabnine és l'eina que ho suporta millor en l'ecosistema de coding assistants.

**Alucinació (Hallucination)** — Error del model on genera codi que sembla correcte sintàcticament però és semànticament incorrecte o completament fictici. Categories principals: API inexistents, paquets fictcis, i errors de lògica silenciosos. El linter no els detecta; únicament fallen en runtime o en els tests.

**API Knowledge Conflict (KCH)** — Tipus d'alucinació on el model usa una API real però inventa paràmetres, mètodes o flags que no existeixen. Exemple: `fetch(url, { timeout: 5000 })` — `timeout` no és un paràmetre natiu de `fetch`. El codi és sintàcticament vàlid però falla en execució.

**Auto-atenció (Self-Attention)** — Mecanisme central de l'arquitectura Transformer. Permet a cada token de la seqüència "veure" i relacionar-se amb tots els altres tokens simultàniament, independentment de la distància. Permet al model entendre que `b` en una funció `(a, b) => a + b` és el segon paràmetre.

**Cascade** — La tecnologia propietària de Windsurf. Un sistema agèntic que entén el context de tot el projecte (historial de comandes, portapapers, accions anteriors), genera codi, arregla errors i anticipa necessitats del developer.

**Chain-of-Thought (CoT)** — Tècnica de prompt engineering que demana al model que raoni pas a pas abans de donar la resposta final. S'activa explícitament ("Analitza pas a pas...") o simplement afegint "Let's think step by step". Millora significativament la precisió en tasques complexes de raonament o depuració.

**Claude Code** — Eina d'Anthropic per a codificació agèntica orientada a la terminal (CLI). Context de 200K tokens que permet entendre codebases senceres. Millor per a raonament complex i refactoritzacions de gran escala.

**Code Churn** — El percentatge de codi que es descarta menys de dues setmanes després de ser escrit. Indicador de qualitat del codi generat per IA: si augmenta, el codi generat requereix moltes revisions abans d'arribar a producció.

**Codex** — Model de generació de codi creat per OpenAI el 2021 basant-se en GPT-3, entrenat específicament en milers de milions de línies de codi de GitHub. Va ser la base original de GitHub Copilot. Evolucionat el 2025-2026 a un agent de software engineering autònom.

**Context Rot** — El fenomen on el rendiment de l'IA es degrada a mesura que la sessió creix: el model s'omple de context irrellevant i comença a prendre pitjors decisions. Afecta tots els coding assistants i és pitjor en projectes grans.

**Copilot Instructions** — Fitxer `.github/copilot-instructions.md` que defineix instruccions permanents per a GitHub Copilot en un projecte: stack tecnològic, convencions de codi, estil preferit. Equival a "explicar al company nou com treballem aquí".

**Data Poisoning** — Atac adversarial on un atacant contamina les dades d'entrenament d'un model per introduir comportaments maliciosos. En generació de codi: manipular repositoris públics perquè el model aprengui a generar vulnerabilitats específiques.

**Decoder-only** — L'arquitectura que usen la majoria de LLM moderns (GPT-4, Claude, Llama, Gemini). Únicament usa la meitat del decoder del Transformer original. Genera tokens de manera seqüencial i autoregresiva, predint cada token a partir de tots els anteriors.

**Embedding** — Representació vectorial d'un token en un espai matemàtic d'alta dimensió. Tokens amb significat similar estan propers en l'espai d'embeddings. Permet al model entendre relacions semàntiques: `suma` i `addició` estan propers.

**Few-Shot Prompting** — Tècnica de prompt engineering que proporciona 3-8 exemples d'input/output al model abans de la tasca real. Calibra el format de sortida, el nivell de detall i el comportament esperat. Especialment útil per a sortides estructurades (JSON, TypeScript tipat) i tasques de domini específic.

**Fine-tuning** — Procés d'especialitzar un model pre-entrenat per a una tasca concreta usant un dataset específic i menor. Exemple: un model de GPT-3 pre-entrenat en text general és fine-tuned en codi de GitHub → Codex. Requereix molt menys dades i computació que l'entrenament des de zero.

**GitHub Copilot** — Eina d'IA per a codificació desenvolupada per GitHub i OpenAI. Plugin disponible per a VS Code, JetBrains, Xcode i Neovim. Integra completions inline, Inline Chat, Copilot Chat i Agent Mode. 1.8 milions de developers de pagament. Líder del mercat per base d'instal·lació.

**GitHub Copilot Workspace** — La visió enterprise de GitHub Copilot com a plataforma multi-agent integrada. Usa el Model Context Protocol (MCP) per extreure dades de Jira, Slack i altres eines i assegurar que el codi generat s'alinea amb el context del projecte actual de l'equip.

**Hallucination** — Veure *Alucinació*.

**Hybrid Semantic ML** — L'arquitectura que descriu Google Research per al seu sistema de code completion: combina un motor semàntic (SE) que entén l'estructura del codi amb un model ML que prediu la continuació probable. El SE verifica la correcció, el ML aporta la intel·ligència contextual.

**In-Context Learning** — Capacitat dels LLM d'aprendre a fer una tasca nova a partir dels exemples dins del prompt, sense actualitzar els pesos del model. La base del few-shot prompting. Emergeix com a propietat dels models prou grans.

**Indirect Prompt Injection** — Variant de Prompt Injection on les instruccions malicioses no venen directament de l'usuari sinó d'una font externa que l'assistent llegeix: documents, fitxers del repositori, webs. Un atacant pot modificar un README per fer que l'assistent generi backdoors.

**Inline Chat** — Mode de GitHub Copilot activat amb Cmd+I (Mac) / Ctrl+I (Win). Obre un prompt de xat directament sobre el codi seleccionat per fer edicions precises i localitzades sense canviar de context.

**Inline Suggestions** — Les suggerències de codi que apareixen automàticament mentre escrius, mostrades com a "ghost text" en gris. S'accepten amb Tab. El mode de funcionament original i més conegut dels coding assistants com Copilot o Tabnine.

**KCH (Knowledge Conflicting Hallucination)** — Categoria d'alucinació on el codi generat contradiu el coneixement factual establert d'un llenguatge de programació o les seves biblioteques. Especialment perillosa perquè és sintàcticament vàlida i escapa als linters.

**LLM (Large Language Model)** — Model de xarxa neuronal de gran escala entrenat en quantitats massives de text. La base de tots els coding assistants moderns. Es caracteritzen per tenir milers de milions de paràmetres i emergir capacitats de raonament i generació no vistes en models menors.

**LLM01 Prompt Injection** — El risc \#1 de l'OWASP per a LLM. Ocorre quan un atacant manipula l'input del model (directament o via contingut extern) per alterar el seu comportament de maneres no previstes. En coding: injectar instruccions malicioses en fitxers que l'assistent llegeix com a context.

**LLM02 Insecure Output Handling** — Risc OWASP: usar l'output del LLM directament en sistemes downstream (base de dades, navegador, comandes del sistema) sense validació. L'output d'un LLM s'ha de tractar sempre com a input d'usuari no confiable.

**LLM09 Overreliance** — Risc OWASP: acceptar les sortides del model sense avaluació crítica. El risc pràctic en coding: un developer que prem Tab sense entendre el codi acceptat pot introduir vulnerabilitats o lògica incorrecta.

**MCP (Model Context Protocol)** — Protocol que permet als coding assistants connectar-se amb serveis externs com Figma, GitHub, PostgreSQL, Slack, etc. Windsurf i GitHub Copilot el suporten. Permet a l'agent accedir a informació en temps real del context real del projecte.

**Meta Prompting** — Tècnica de prompt engineering on en lloc d'exemples específics es proporcionen regles abstractes i estructures lògiques. Millor per a tokens eficients i tasques on els exemples Few-shot podrien introduir biaixos.

**Multi-agent** — Arquitectura on múltiples agents d'IA especialitzats col·laboren en una tasca: un agent planificador descompon la tasca, agents especialitzats implementen backend/frontend/tests, un agent de revisió comprova la seguretat.

**Next Edit Suggestion** — Funcionalitat de GitHub Copilot que prediu el proper canvi lògic que el developer farà (no únicament la línia actual). Si acabes de canviar el nom d'una variable en una línia, Copilot suggereix automàticament canviar-la en les altres línies on apareix.

**OWASP Top 10 per a LLM** — Llista de l'Open Web Application Security Project dels deu riscos de seguretat més crítics específics de les aplicacions basades en LLM. Inclou Prompt Injection, Insecure Output Handling, Training Data Poisoning, Supply Chain Vulnerabilities i Sensitive Information Disclosure, entre d'altres.

**Package Hallucination** — Tipus d'alucinació on el model suggereix instal·lar una biblioteca npm/pip que no existeix. Especialment perillosa: un atacant pot publicar un paquet maliciós amb el nom exacte suggerit. Un 19.7% dels paquets suggerits per LLMs son fictcis.

**Paràmetres del Model** — Els nombres ajustats durant l'entrenament que determinen el comportament del model. Models com GPT-3 tenen 175 mil milions de paràmetres. Com més paràmetres, généralement millor comprensió però més cost computacional.

**Pre-entrenament** — La fase d'entrenament inicial d'un LLM on el model veu quantitats massives de dades (text, codi, documentació) i aprèn a predir el token següent. Molt costós computacionalment. El resultat és un "model base" que necessita fine-tuning per ser útil.

**Prompt** — L'input en llenguatge natural que s'envia a un model d'IA per obtenir una resposta. La qualitat del prompt és directament proporcional a la qualitat de la resposta. Un bon prompt per a codi inclou: context tècnic, inputs/outputs esperats, restriccions i format desitjat.

**Prompt Chaining** — Tècnica de dividir una tasca gran en subtasques seqüencials on la sortida d'un step és l'input del següent. La millor estratègia per a tasques complexes com refactoritzar una arquitectura o implementar una funcionalitat de gran abast.

**Prompt Engineering** — La disciplina de dissenyar i optimitzar els inputs als models d'IA per obtenir sortides de qualitat consistent. Inclou tècniques com Zero-Shot, Few-Shot, Chain-of-Thought, Role Prompting i Prompt Chaining.

**RAG (Retrieval-Augmented Generation)** — Tècnica que combina la generació del LLM amb la recuperació de documents rellevants del projecte en temps real. Permet al model usar informació actualitzada (el codi del projecte, la documentació interna) que no estava en el seu entrenament.

**RLHF (Reinforcement Learning from Human Feedback)** — Tècnica d'entrenament on humans avaluen les sortides del model (quina resposta és millor?) i el model aprèn d'aquest feedback. Permet que Copilot generi codi no únicament correcte sinó útil, segur i ben explicat.

**Role Prompting** — Tècnica de prompt engineering que assigna un rol expert al model: "Ets un enginyer sènior especialitzat en seguretat TypeScript". El rol canvia el vocabulari, el nivell de detall, les prioritats i fins i tot els aspectes que el model considera importants.

**Self-Consistency** — Tècnica avançada que genera múltiples camins de raonament per a un problema i selecciona la resposta més consistent entre tots. Millora la precisió comparada amb un sol camí de CoT. Útil quan el codi generat ha de ser especialment fiable.

**Sensitive Information Disclosure (LLM06)** — Risc OWASP: l'aplicació LLM exposa informació confidencial a través de les seves sortides o el model filtra dades sensibles que formaven part del seu entrenament o context. En coding: enviar credencials o codi propietari al model com a context del prompt.

**Supply Chain Vulnerability (LLM05)** — Risc OWASP: les dependències del model (datasets d'entrenament, models pre-entrenats, biblioteques) poden ser compromeses per atacants, introduint comportaments maliciosos o vulnerabilitats.

**Tabnine** — Coding assistant d'IA creat el 2017\. Es diferencia per la seva orientació a la privacitat i seguretat empresarial: suporta desplegament air-gapped, zero retenció de dades, certificacions SOC 2 / GDPR / HIPAA. L'única opció viable per a sectors amb regulació estricta.

**Token** — La unitat mínima de text que processa el model. Pot ser una paraula, part d'una paraula, o un signe de puntuació. "TypeScript" és aproximadament 2-3 tokens. El límit de tokens d'un model defineix quant context pot processar simultàniament.

**Training Data Poisoning (LLM03)** — Risc OWASP: un atacant contamina les dades d'entrenament del model per induir comportaments maliciosos o biaixos en les sortides. Difícil de detectar i mitigar perquè opera a nivell del model, no de l'aplicació.

**Transfer Learning** — La tècnica de reutilitzar un model pre-entrenat per a una nova tasca relacionada, aplicant fine-tuning amb menys dades. Permet que OpenAI Codex (basat en GPT-3 pre-entrenat en text general) s'especialitzi en codi amb molt menys cost que entrenar des de zero.

**Transformer** — L'arquitectura de xarxa neuronal introduïda al paper "Attention is All You Need" (2017). Base de tots els LLMs moderns. Processa seqüències senceres en paral·lel (no seqüencialment com les RNN), habilitant el mecanisme d'auto-atenció i permetent l'entrenament massiu en GPUs.

**Tree of Thoughts (ToT)** — Tècnica avançada de prompting que generalitza el Chain-of-Thought generant múltiples línies de raonament en paral·lel, amb capacitat de retrocedir i explorar camins alternatius. Útil per avaluar múltiples enfocaments d'implementació.

**Vibe Coding** — Paradigma de programació emergent el 2025 on el developer descriu en llenguatge natural quèvol construir i l'IA genera, suggereix i refactoritza codi en temps real. Nomenat "Paraula de l'Any 2025" per Collins Dictionary. Accelera el development però no elimina la necessitat d'entendre el codi generat.

**Windsurf** — IDE d'IA creat per Codeium. Es posiciona com el primer IDE "agèntic" real, amb la seva tecnologia Cascade que entén tot el context del projecte. Suporta MCP per connectar amb serveis externs. Free tier generós, Pro $15/mes. La millor relació qualitat-preu del mercat el 2025-2026.

**Zero-shot Prompting** — Tècnica de prompting on el model intenta una tasca nova sense exemplars previs. Funciona per a tasques clares on el model té bon coneixement del domini. Falla en tasques de domini molt específic o on el format de sortida ha de ser molt precís.

**Zero-shot CoT** — Variant del Chain-of-Thought on simplement s'afegeix "Let's think step by step" al prompt sense proporcionar exemples de raonament. Activat el 2022 pels investigadors de Google i la Universitat de Tokyo, va democratitzar l'ús del CoT.

