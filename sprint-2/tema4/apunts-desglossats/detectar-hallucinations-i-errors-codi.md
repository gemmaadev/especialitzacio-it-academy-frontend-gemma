## **Detectar hallucinations i errors en el codi generat per IA**

**Què és una Hallucination en el context del codi**

Les alucinacions en el codi son errors semàntics profunds que només es revelen en temps d'execució, fent-los increïblement costosos de trobar en una aplicació complexa. 

Per exemple, un model pot semblar que entén una biblioteca però inventa de manera confident un nom de paràmetre que es manté semànticament plausible però és facticialment incorrecte.

Un linter, per exemple, no detectarà aquests errors; no és un simple error tipogràfic. En generar un script de pandas, un model pot cridar `pd.read_exel('data.csv')`, que tant inventa un nom de funció com no coincideix amb el tipus de fitxer pretès. 

Aquest error es presenta com un bloc de codi que sembla net, sembla idiomàtic, i fins i tot segueix les convencions de nomenament de variables locals. Però quan s'executa, el programa falla.

**Els tres tipus principals d'errors**

### **Tipus 1: API Knowledge Conflicts**

Les API Knowledge Conflicts impliquen usar una funció obsoleta o un paràmetre inexistent. El model ha après l'API d'una versió antiga i genera codi per a mètodes que ja no existeixen, o usa paràmetres que mai van existir.

| // ❌ Hallucination: mètode inexistentimport { something } from 'some-library';something.parseAsync(data, { strictMode: true });// 'parseAsync' no existeix en aquesta biblioteca → error en runtime// ❌ Hallucination: paràmetre inexistentfetch(url, { credentials: 'same-origin', timeout: 5000 });// 'timeout' no és un paràmetre vàlid de fetch → ignorat silenciosament |
| :---- |

### **Tipus 2: Package Hallucinations**

Un 19.7% dels paquets generats son fictius, suposant una amenaça crítica per a la seguretat del software a través d'atacs de confusió de paquets.

El model recomana biblioteques que no existeixen a npm o que han estat eliminades. Si un actor maliciós publica un paquet amb aquell nom exacte, el developer l'instal·larà pensant que és legítim.

| \# ❌ Hallucination: paquet inexistentnpm install react-validation-helper  \# pot no existir\# ❌ Hallucination: paquet obsoletnpm install request  \# obsolet des de 2020, però el model el segueix suggerint |
| :---- |

### **Tipus 3: Errors de lògica silenciosos**

Els codis al·lucinats poden no diferir del codi normal, i poden compilar-se i executar-se normalment, mentre que la seva lògica d'implementació no satisfà els requisits. Aquests son els més perillosos: el codi funciona però fa una cosa diferent de la desitjada.

| // ❌ Hallucination de lògica: sintàcticament correcte però semànticament incorrecte// Prompt: "Filtra productes actius i ordena per preu descendent"const resultat \= productes  .filter(p \=\> \!p.actiu)    // ← error: deuria ser p.actiu, no \!p.actiu  .sort((a, b) \=\> a.preu \- b.preu);  // ← error: deuria ser b.preu \- a.preu// El codi compila, executa i fins i tot retorna dades// però el resultat és completament incorrecte |
| :---- |

**Estratègies per detectar Hallucinations**

### **Estratègia 1: Verificació d'APIs contra la documentació oficial**

La combinació més efectiva inclou l'augment de recuperació (reducció del 60-80%), la integració d'anàlisi estàtica (89.5% de precisió en enfocaments híbrids), i els pipelines de verificació (millora del 28%)—conjuntament assolint fins a un 96% de reducció d'alucinacions.

En pràctica per als developers: mai confiar en el nom d'un mètode o paràmetre que el model suggereix sense verificar-lo:

| // Flux de verificació d'API:// 1\. El model suggereix: axios.post(url, data, { retry: 3 })// 2\. Comproves la documentació oficial d'axios// 3\. Descobreixes que 'retry' no és un paràmetre natiu d'axios// 4\. Busques la biblioteca correcta: axios-retry |
| :---- |

### **Estratègia 2: Execució i tests automatitzats**

El 29-45% del codi generat per IA conté vulnerabilitats de seguretat. La primera línia de defensa és executar el codi i tenir tests:

| // El model genera una funció de validació:function validarEmail(email: string): boolean {  return email.includes('@');  // ← massa simple, accepta "a@" com vàlid}// ✅ Un test revela la hallucination:describe('validarEmail', () \=\> {  it('rebutja emails sense domini', () \=\> {    expect(validarEmail('anna@')).toBe(false);  // ❌ FALLA → detectat\!  });  it('rebutja emails sense TLD', () \=\> {    expect(validarEmail('anna@domini')).toBe(false);  // ❌ FALLA → detectat\!  });}); |
| :---- |

### **Estratègia 3: Verificació de paquets abans d'instal·lar**

| \# Sempre verifica els paquets que el model suggereix:\# 1\. Comprova que existeix a npmnpm search nom-del-paquetnpm info nom-del-paquet\# 2\. Comprova les descàrregues setmanals (popularitat real)\# → npmjs.com/package/nom-del-paquet\# 3\. Comprova la data de l'última actualitzaciónpm info nom-del-paquet time.modified\# 4\. Comprova el repositori GitHub\# → commits recents? issues oberts? manteniment actiu? |
| :---- |

### **Estratègia 4: Demanar al model que s'auto-verifiqui**

Una tècnica de prompt engineering eficaç és demanar explícitament al model que identifiqui els seus propis punts febles:

| Prompt:"Escriu una funció TypeScript per a \[tasca\].Després de generar el codi:1\. Llista tots els mètodes i APIs que uses i confirma que existeixen2\. Identifica els edge cases que la teva implementació podria no gestionar3\. Indica si hi ha alguna part del codi on no estàs segur de la correcció" |
| :---- |

### **Estratègia 5: Comparar múltiples respostes**

En lloc de confiar en una sola resposta potencialment defectuosa, la self-consistency genera múltiples camins de raonament i llavors selecciona la resposta més consistent d'entre ells.

Pràcticament: demana la mateixa solució a dos models o en dues sessions separades i compara les respostes. Les discrepàncies solen indicar zones d'incertesa.

**Les senyals d'alerta: quan sospitar d'una Hallucination**

Certes situacions augmenten la probabilitat d'alucinació:

* **Biblioteques poc populars o molt recents** — el model té menys dades d'entrenament i alucinació és més probable.  
* **APIs que canvien sovint** — React, Next.js, TypeScript... canvien ràpidament. El model pot estar al corrent d'una versió antiga.  
* **Codi que sembla "massa perfecte"** — si el codi generat és extremadament complex però no té cap comentari, cap cas d'error, i sembla massa net, val la pena verificar-lo.  
* **Combinació de biblioteques poc comunes** — com més específica és la combinació de tecnologies, més probable és que el model inventi comportaments.

**El protocol de verificació pràctic**

Codi generat per IA  
        ↓  
1\. Compilació / TypeScript check  
   → Errors de tipus detectats immediatament ✅  
        ↓  
2\. Linting (ESLint)  
   → Errors d'estil i patrons problemàtics ✅  
        ↓  
3\. Verificació manual d'APIs crítiques  
   → Consultar documentació oficial de cada mètode usat  
        ↓  
4\. Execució dels tests existents  
   → Tests de regressió passen? ✅  
        ↓  
5\. Escriure tests nous per al codi generat  
   → Cobertura de casos feliços i d'error  
        ↓  
6\. Code Review humà  
   → Un company revisa la lògica de negoci  
        ↓  
7\. Verificació de paquets nous  
   → npm info, downloads, repositori actiu

**Els quatre tipus i com detectar-los**

| Tipus d'Error | Exemple | Com Detectar |
| ----- | ----- | ----- |
| **API inexistent** | `lib.methodThatDoesntExist()` | Documentació oficial \+ TypeScript errors |
| **Paquet fictici** | `npm install made-up-package` | `npm info`, npmjs.com |
| **Lògica incorrecta** | Filtre invertit `!p.actiu` | Tests unitaris \+ code review |
| **Vulnerabilitat** | Injecció SQL, secrets exposats | Linters de seguretat, code review |

