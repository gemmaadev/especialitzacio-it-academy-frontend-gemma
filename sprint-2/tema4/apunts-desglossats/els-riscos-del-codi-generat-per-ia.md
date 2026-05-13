## **Els riscos del codi generat per IA: anàlisi completa**

###### **The Risks of AI-Generated Code** [https://cacm.acm.org/magazines/2023/5/272362-the-risks-of-ai-generated-code/](https://cacm.acm.org/magazines/2023/5/272362-the-risks-of-ai-generated-code/)

Article de Communications of the ACM sobre riscos i limitacions del codi generat amb IA.

**Les tres categories de risc principals (CSET Georgetown)**

En aquest paper s'identifiquen tres categories àmplies de risc associades amb els models de generació de codi d'IA: 1\) models que generen codi insegur, 2\) models que son vulnerables a atac i manipulació, i 3\) impactes de ciberseguretat downstream.

**Categoria 1: El codi generat conté vulnerabilitats**

Hi ha un acord d'alt nivell que els models d'IA no produeixen codi segur i sí introdueixen vulnerabilitats, malgrat les mitigacions. Les vulnerabilitats particulars apareixen més freqüentment i resulten ser més problemàtiques que d'altres.

Les xifres son preocupants:

La recerca independent d'Apiiro va analitzar empreses Fortune 50 i va trobar que les vulnerabilitats CVSS 7.0+ apareixien 2.5x més sovint en codi generat per IA. Al juny de 2025, el codi generat per IA afegia més de 10.000 noves findings de seguretat per mes a través dels repositoris estudiats — un increment de 10× des del desembre de 2024\.

Khoury et al. (2023) van usar ChatGPT per generar 21 programes en cinc llenguatges de programació i van testar per a CWEs, mostrant que únicament cinc de 21 eren inicialment segurs. Únicament després de prompting específic per corregir el codi es van millorar els resultats.

**Les vulnerabilitats més comunes introduïdes per l'IA:**

| SQL Injection:// ❌ L'IA genera sovint:const query \= \`SELECT \* FROM users WHERE id \= ${userId}\`;// ✅ El que hauria de generar:const query \= 'SELECT \* FROM users WHERE id \= ?';db.execute(query, \[userId\]);XSS (Cross-Site Scripting):// ❌ L'IA genera sovint:element.innerHTML \= userInput;  // XSS directa// ✅ El que hauria de generar:element.textContent \= userInput;  // escapa automàticament// o: DOMPurify.sanitize(userInput)Credencials Hardcodades:// ❌ L'IA genera sovint:const API\_KEY \= 'sk-abc123realkey';// ✅ El que hauria de generar:const API\_KEY \= process.env.API\_KEY; |
| :---- |

**Categoria 2: Riscos de propietat intel·lectual i llicències**

Els assistents de codificació poden generar grans fragments de codi open-source llicenciat de manera literal, cosa que porta a la contaminació de propietat intel·lectual en la nova codebase. 

Algunes eines protegeixen contra la reutilització de grans fragments de codi de domini públic, però la IA pot suggerir codi amb copyright o algoritmes propietaris sense aquesta protecció.

Per obtenir suggerències útils, els developers podrien fer prompt a aquestes eines amb codi propietari o lògica confidencial. Aquell input podria ser emmagatzemat o posteriorment usat en l'entrenament del model, potencialment filtrant secrets.

**Preguntes legals obertes:**

Determinar la propietat i els drets de propietat intel·lectual del codi generat per IA pot ser complex, plantejant qüestions legals sobre qui ostenta la responsabilitat del codi.

La solució que implementa GitHub Copilot per mitigar-ho: GitHub Copilot inclou una funcionalitat que cerca a través dels repositoris públics de GitHub codi que coincideixi amb una suggerència de Copilot. 

Si hi ha una coincidència, els usuaris trobaran la seva informació mostrada al log de la consola de Copilot, incloent on va ocórrer la coincidència, les llicències aplicables, i un deep link per aprendre'n més.

**Categoria 3: Atacs adversarials als models**

Els sistemes d'IA generativa tenen vulnerabilitats conegudes a diversos tipus d'atacs adversarials. 

Aquests inclouen atacs de data poisoning, en els quals un atacant contamina les dades d'entrenament d'un model per elicitar un comportament desitjat, i atacs de backdoor, en els quals un atacant intenta produir una sortida específica fent prompt al model amb una frase de trigger predeterminada. 

En el context de la generació de codi, un atac de data poisoning pot semblar un atacant manipulant les dades d'entrenament d'un model per incrementar la probabilitat d'introduir vulnerabilitats.

**El problema del "context rot" i la mantenibilitat**

El context rot empitjora els problemes. A mesura que les codebases assistides per IA creixen, el model perd el fil de les decisions de seguretat preses en components anteriors. 

No pot mantenir un model mental de la postura de seguretat de tot el sistema a través de milers de línies de codi. Això crea inconsistències — l'autenticació gestionada d'una manera en un servei, d'una manera diferent en un altre.

En dependre fortament de les eines d'IA, els developers poden perdre una comprensió profunda del codi, cosa que pot resultar en reptes de mantenibilitat a llarg termini. 

Quan els developers no entenen completament el codi en el qual treballen, hi ha una major possibilitat d'introduir defectes, incloent vulnerabilitats de seguretat, especialment quan es requereixen canvis en el futur.

**El risc de privacitat de dades**

Els assistents de codificació d'IA creen reptes de compliment perquè el codi, les credencials i les dades deixen l'entorn de l'organització quan s'envien als proveïdors de LLM per processar-los. 

Aquí és el problema central: quan enganxes codi a ChatGPT o l'envies a GitHub Copilot, aquell codi es transmet a serveis externs. Si aquell codi conté dades de clients, lògica de negoci, o credencials, has creat un problema de gestió de dades.

**Estratègies de mitigació dels riscos**

La solució no és evitar les eines d'IA sinó usar-les responsablement amb controls de seguretat apropiats. Les organitzacions que aprofiten amb èxit els beneficis de productivitat de la IA mantenint postures de seguretat robustes guanyaran un avantatge competitiu significatiu.

Protocol de mitigació per a equips de desenvolupament:

1\. ESCANEJAT AUTOMÀTIC  
   → Integrar SAST (Static Application Security Testing) al CI/CD  
   → Eines: Semgrep, CodeQL, Snyk, SonarQube  
   → Bloquejar PRs amb vulnerabilitats crítiques

2\. REVISIÓ HUMANA OBLIGATÒRIA  
   → Tot el codi generat per IA passa per code review  
   → Hipervigilància en components crítics (auth, pagaments, dades)

3\. POLÍTICA DE DADES SENSIBLES  
   → Definir quèno s'envia mai al model: credencials, PII, secretes  
   → Usar eines on-premises (Tabnine) per a codebases sensibles

4\. FORMACIÓ DEL EQUIP  
   → Developers han d'entendre el codi que accepten  
   → No "Tab-key dependent": revisar i comprendre, no únicament acceptar

5\. CONTROL DE LLICÈNCIES  
   → Activar la detecció de coincidències de codi a Copilot  
   → Revisar les llicències dels paquets suggerits

**Resum: taula de riscos i mitigacions**

| Risc | Impacte | Mitigació |
| ----- | ----- | ----- |
| **Vulnerabilitats de seguretat** | 2.74x més CVEs en codi IA | SAST automatitzat \+ code review humà |
| **Propietat intel·lectual** | Codi llicenciat copiat verbatim | Activar filtres de Copilot \+ revisar llicències |
| **Filtració de dades** | Secrets enviats al model | Política d'ús: mai enviar credencials/PII |
| **Data Poisoning** | Codi maliciós via entrenament manipulat | Usar models de proveïdors de confiança |
| **Atrofia d'habilitats** | Developers no entenen el codi | Revisar i comprendre, no únicament acceptar |
| **Context Rot** | Inconsistències de seguretat a escala | Arquitectura clara \+ revisió de seguiment |
| **Mantenibilitat** | Codi difícil de mantenir | Refactoritzar i documentar el codi generat |

