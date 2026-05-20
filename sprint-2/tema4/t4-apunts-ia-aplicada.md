## **Apunts T4 — IA Aplicada: generació, revisió i optimització de codi**

**1\. Com funcionen els LLM per a generació de codi**

Els **LLM (Large Language Models)** son models de xarxa neuronal basats en l'arquitectura **Transformer** que processen text i codi com a seqüències de tokens. No "entenen" el codi com un programador: aprenen patrons estadístics de milions de repositoris i predeixen el token més probable a continuació.

**L'arquitectura Transformer** va revolucionar el processament de seqüències perquè processa tot el context en paral·lel en lloc de seqüencialment. El mecanisme clau és l'**auto-atenció (self-attention)**: cada token "mira" tots els altres tokens i calcula quins son rellevants per a la predicció del proper. Quan el model veu `function calcular(`, l'auto-atenció relaciona aquest fragment amb les variables declarades anteriorment, els imports del fitxer i el context general.

**El Transfer Learning** permet que un model pre-entrenat en dades massives (GitHub, Stack Overflow, documentació) s'especialitzi per a tasques concretes (generació de codi, detecció de bugs) amb menys dades i cost. La cadena és:

```html
Pre-entrenament (massiu, general)
     ↓ Fine-tuning (específic per tasca)
     ↓ RLHF (feedback humà per millorar utilitat)
     ↓ Instruction Tuning (aprendre a seguir instruccions)
Model final (GitHub Copilot, Claude Code, etc.)
```

**Les limitacions fonamentals:** el model prediu el token estadísticament més probable, no el lògicament correcte. Per això genera code hallucinations: codi que sembla correcte però falla en execució.

**2\. Avantatges i desavantatges en números reals**

Els beneficis son reals però matisats. La investigació de Google (10.000+ developers, 3 mesos) va mesurar una reducció del 6% en temps d'iteració i els developers escriuen \>10% menys caràcters. Un estudi independent va trobar \+21% de velocitat en tasques de codi. El report DORA 2024 associa una adopció del 25% d'IA amb una millora del 3.4% en qualitat de codi.

Els desavantatges son igualment reals. Un 19.7% dels paquets suggerits son fictcis. Les vulnerabilitats CVSS 7.0+ apareixen 2.74x més sovint en codi IA que en codi humà. Un 30.5% del codi generat conté errors. I el temps de revisió de PRs augmenta un 91% quan els equips generen més codi amb IA.

La paradoxa central: el 84% dels developers usen IA, però únicament el 16.3% reporta una millora de productivitat significativa. La diferència la fan els processos i el workflows de l'equip, no únicament l'eina.

**3\. Prompt Engineering: les tècniques essencials**

El **Prompt Engineering** és la disciplina de dissenyar els inputs als models de llenguatge per obtenir sortides de qualitat consistent. La qualitat del prompt és directament proporcional a la qualitat de la resposta.

* **Zero-Shot** — descripció directa sense exemples. Funciona per a tasques simples i clares. Falla en tasques de domini específic.  
* **Few-Shot** — 3-8 exemples d'input/output que calibren el format, l'estil i el comportament esperat del model. Ideal per a sortides molt estructurades (JSON, TypeScript tipat).  
* **Chain-of-Thought (CoT)** — demanar al model que raoni pas a pas: "Analitza pas a pas..." o simplement "Let's think step by step". Millora dràsticament la precisió en tasques complexes o de raonament.  
* **Role Prompting** — assignar un rol expert condiciona tot el vocabulari, el nivell de detall i les prioritats. "Ets un enginyer sènior especialitzat en seguretat TypeScript" és molt diferent de "Escriu codi TypeScript".  
* **Prompt Chaining** — dividir una tasca gran en subtasques seqüencials on la sortida d'un pas és l'entrada del següent. La millor estratègia per a tasques complexes com "refactoritza tota l'arquitectura".

Les regles pràctiques per a codi:

```html
ESPECIFICA → el context tècnic (TypeScript strict, Node 20, Vite)
DESCRIU    → inputs i outputs exactes amb tipus
RESTRINGEIX → "sense dependències externes", "O(n) màxim"
FORMAT     → "amb JSDoc, tests Jest i explicació de les decisions"
VALIDA     → "Explica els edge cases que no gestiones"
```

**4\. Hallucinations: detectar errors del codi generat per IA**

Una **hallucination** en el context del codi és un error semàntic profund que el compilador no detecta i que únicament falla en runtime. Es manifesta de tres maneres:

**API Knowledge Conflicts** — el model inventa mètodes, paràmetres o flags que no existeixen o son d'una versió antiga. `fetch(url, { timeout: 5000 })` és un exemple clàssic: `timeout` no és un paràmetre natiu de `fetch`.

**Package Hallucinations** — el 19.7% dels paquets suggerits son fictcis. El model "inventa" noms de biblioteques plausibles que no existeixen. Si algú publica un paquet maliciós amb aquell nom, el developer l'instal·larà sense sospitar.

**Errors de Lògica Silenciosos** — el codi compila, s'executa i fins i tot retorna dades, però fa una cosa diferent de la desitjada. `!p.actiu` en lloc de `p.actiu`, ordre de sort invertit, condicions mal formulades.

```html
Compilació TypeScript → errors de tipus immediats
          ↓
Linting ESLint → patrons problemàtics
          ↓
Verificació manual d'APIs → documentació oficial
          ↓
Tests unitaris específics → cobreix l'edge case
          ↓
Verificació de paquets → npm info + downloads
          ↓
Code Review humà → lògica de negoci
```

**5\. Les eines d'IA als IDEs**

El mercat s'ha consolidat al voltant de quatre eines principals, cadascuna amb una filosofia diferent:

1. **GitHub Copilot** — el líder del mercat (1.8 milions de developers). Plugin per a VS Code, JetBrains, Xcode, Neovim. Models configurables (GPT-4.1 per defecte, Claude Sonnet/Opus, GPT-5 en tiers superiors). Quatre modes: inline suggestions (Tab), Inline Chat (Cmd+I), Copilot Chat i Agent Mode (autònom multi-fitxer). Pla gratuït: 2.000 completions/mes. Pro: $10/mes.  
2. **Windsurf** — IDE independent basat en Codeium. La seva tecnologia **Cascade** és l'assistent agèntic més potent per preu: entén tot el context del projecte, executa comandes i s'autocorregeix. Suporta MCP per connectar amb Figma, GitHub, PostgreSQL, etc. Free tier generós, Pro $15/mes. Millor relació qualitat-preu.  
3. **Tabnine** — l'única opció viable per a entorns regulated (sanitat, defensa, finances). Suporta desplegament completament **air-gapped**: zero dades surten de l'organització. Certifications SOC 2, GDPR, HIPAA. Menys sofisticat que Copilot o Windsurf en capacitats agèntiques. Enterprise $39/mes.  
4. **OpenAI Codex (agent)** — l'evolució de Codex com a agent autònom. S'assigna a issues de GitHub, clona el repositori, treballa en un sandbox segur durant minuts o hores. Disponible via GitHub Copilot Pro+. La diferència Codex/Copilot: Codex és el model base, Copilot és el producte integrat.

**6\. Seguretat: OWASP Top 10 per a LLM**

L'OWASP ha publicat una llista específica dels deu riscos de seguretat més crítics en aplicacions LLM. Els cinc més rellevants per al codi generat:

* **LLM01 Prompt Injection** — un atacant modifica el context que llegeix l'assistent (fitxers, documentació, comentaris) injectant instruccions malicioses que fan que generi backdoors o vulnerabilitats. Mitigació: separar el contingut extern no confiable.  
* **LLM02 Insecure Output Handling** — usar l'output de la IA directament sense validar: `db.query(codiGenerat)` o `innerHTML = outputIA`. L'output del LLM s'ha de tractar com a input no confiable.  
* **LLM05 Supply Chain** — paquets fictcis que un atacant pot "ocupar" publicant un paquet maliciós amb el nom suggerit. Verificar sempre: `npm info paquet`, downloads, repositori actiu.  
* **LLM06 Sensitive Disclosure** — enviar credencials, tokens o codi propietari al model. El prompt pot quedar als logs del servei d'IA o ser usat en entrenaments futurs.  
* **LLM09 Overreliance** — acceptar el codi generat sense entendre'l. El 70% de les APIs crítiques de seguretat son mal usades en el codi generat per IA. La solució: comprendre el codi que s'accepta, no únicament prémer Tab.

**7\. El Futur: de l'autocompletat a l'agèntic**

El 2026 marca una inflexió: el 92% dels developers dels EUA usen eines d'IA diàriament. L'evolució ha estat:

```html
2021-2023: Completions → suggereix la línia següent
2023-2024: Chat + Edició → descrius, l'IA implementa
2025-2026: Agèntic → l'IA planifica, executa i s'autocorregeix
```

El **Vibe Coding** — on la IA genera, suggereix i refactoritza en temps real — ha emergit com a paradigma dominant. La tendència és cap a equips multi-agent: un agent planificador descompon la tasca, agents especialitzats implementen el backend, el frontend i els tests, i un agent de revisió comprova la seguretat.

El rol del developer evoluciona d'**escriptor** a **orquestrador**: defineix les restriccions, supervisa els agents, valida els resultats i pren les decisions estratègiques. El judici humà segueix sent indispensable: comprensió del problema de negoci, decisions arquitecturals, seguretat, privacitat i responsabilitat sobre el producte.

Les habilitats que guanyen importància: pensament sistèmic, prompt engineering efectiu, revisió crítica de codi IA, i comprensió dels riscos de seguretat.

**Esquema del tema** 

```html
Com funciona?  
  → Transformers \+ Self-Attention \+ Tokens  
  → Pre-entrenament \+ Fine-tuning \+ Transfer Learning  
  → Prediu probabilitats, no "raona"

Avantatges/Desavantatges  
  → \+21-26% productivitat en condicions òptimes  
  → 2.74x més vulnerabilitats sense supervisió  
  → La clau: processos \+ supervisió humana

Prompt Engineering  
  → Zero-shot → Few-shot → CoT → Role → Chaining  
  → Especificitat \+ Context \+ Format \+ Restriccions

Hallucinations  
  → API inexistents, paquets fictcis, lògica incorrecta  
  → Detectar: TypeScript \+ ESLint \+ Tests \+ Revisió humana

Eines IDE  
  → Copilot (ecosistema MS), Windsurf (valor/agèntic)  
  → Tabnine (privacitat), Cursor (projectes grans)

Seguretat OWASP  
  → Prompt Injection, Insecure Output, Supply Chain  
  → Sensitive Disclosure, Overreliance

Futur  
  → De l'autocompletat a l'agèntic  
  → Developer \= Orquestrador \+ Arquitecte \+ Responsable ètic
```
