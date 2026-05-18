### **Apunts T5 — Seguretat automatitzada i mètriques de qualitat**

**1\. Per què es necessita la seguretat automatitzada**

El 96% de les aplicacions usen paquets de tercers i el 80% del codi prové de dependències externes. El 84% de les codebases contenen almenys una vulnerabilitat coneguda. 

El problema fonamental és que el codi que escriu l'equip és una fracció mínima del codi que s'executa: instal·lar un paquet npm implica de mitjana \~80 paquets transitius.

Els atacs a la cadena de subministrament han crescut un 650% el 2021, i incidents com el compromís de `debug` i `chalk` el setembre de 2025 —biblioteques amb milers de milions de descàrregues setmanals— demostren que cap dependència és immune. 

La bona notícia: el 96% de les vulnerabilitats conegudes tenen una correcció disponible. La detecció automatitzada converteix un problema complex en una tasca gestionable.

**2\. SAST vs. DAST: les dues cares de la seguretat**

**SAST (Static Application Security Testing)** — analitza el codi font sense executar l'aplicació. Caixa blanca: veu el codi internament.

**DAST (Dynamic Application Security Testing)** — ataca l'aplicació en execució des de fora. Caixa negra: simula un atacant extern.

```html
SAST detecta (sense execució):          DAST detecta (en runtime):
  SQL Injection al codi font              Misconfiguracions de servidor
  Secrets hardcodats                      Headers HTTP de seguretat absents
  XSS en innerHTML                        Vulnerabilitats de sessió
  Criptografia feble (MD5, SHA-1)         Race conditions
  Imports dinàmics insegurs               Business logic vulnerabilities

No detecta:                              No detecta:
  Misconfiguracions de servidor           Vulnerabilitats en codi no assolible
  Runtime vulnerabilities                 Problemes al codi font

Quan s'usa:                              Quan s'usa:
  Cada commit/PR (integrat a l'IDE)        Staging i producció (post-deploy)
  Feedback: minuts                         Feedback: hores
```

La conclusió de la indústria: SAST i DAST no son excloents — cobreixen tipus de vulnerabilitats complementaris en etapes complementàries del SDLC. Calen els dos.

**3\. L'escaneig de dependències: l'SAST de tercers**

Les dependències transitives son el risc invisible: instal·les 1 paquet, obtens \~80. Si qualsevol d'ells té una vulnerabilitat, el teu projecte n'és afectat.

**Les quatre eines principals:**

```bash
# npm audit — integrat, zero configuració
npm audit              # detecta vulnerabilitats
npm audit fix          # corregeix automàticament
npm audit --json       # sortida per a CI/CD

# OWASP Dependency-Check — open source, contra NVD
# Genera informes HTML/XML amb CVEs i puntuació CVSS

# Snyk — servei amb BD pròpia, PRs automàtiques

# Dependabot — integrat a GitHub, PRs automàtiques
```

**Integració al CI/CD: bloquejar deploys amb vulnerabilitats crítiques:**

```yaml
# .github/workflows/security.yml
- run: npm audit --audit-level=high
# Si hi ha vulnerabilitats HIGH o CRITICAL → pipeline falla → no es deploya
```

**4\. L'OWASP Top 10:2025 i la detecció automatitzada**

L'OWASP Top 10 és la referència estàndard dels riscos de seguretat web. La versió 2025 (publicada el 6 de novembre de 2025\) es basa en l'anàlisi de 175.000+ registres CVE.

| \# | Vulnerabilitat | Detecció |
| ----- | ----- | ----- |
| **A01** | Broken Access Control | DAST \+ Code Review |
| **A02** | Security Misconfiguration | DAST headers \+ Trivy |
| **A03** | Supply Chain Failures *(nova)* | npm audit \+ Snyk |
| **A04** | Injection (SQL, Command) | SAST (SonarQube, Semgrep) |
| **A05** | Cryptographic Failures | SAST (MD5, SHA-1 detectats) |
| **A06** | Vulnerable Components | npm audit \+ Dependabot |
| **A07** | Auth Failures | DAST \+ revisió manual |
| **A08** | Integrity Failures | Checksums \+ CI/CD review |
| **A09** | Logging Failures | Revisió manual \+ SonarQube |
| **A10** | Mishandling Exceptions *(nova)* | SAST \+ Code Review |

Les vulnerabilitats més fàcils de detectar automàticament: A03, A04, A05, A06. Les que requereixen sempre revisió humana: A01, A07, A09, A10.

**5\. ESLint Security Plugin: SAST integrat a l'editor**

`eslint-plugin-security` és un plugin SAST per a JavaScript/Node.js que detecta 14 categories de vulnerabilitats mentre escrius codi, com l'ESLint normal però per a seguretat.

```bash
npm install --save-dev eslint-plugin-security
```

```javascript
// eslint.config.js
import security from 'eslint-plugin-security';
export default [security.configs.recommended];
```

Les regles més crítiques:

```javascript
// detect-eval-with-expression → Remote Code Execution
eval(userInput);           // ❌ CRITICAL
const fn = new Function(userInput); // ❌ CRITICAL

// detect-non-literal-fs-filename → Path Traversal
fs.readFile(req.query.file); // ❌ llegeix qualsevol fitxer del sistema

// detect-child-process → Command Injection
exec(`ls -la ${req.body.dir}`); // ❌ "dir" pot ser "; rm -rf /"

// detect-unsafe-regex → ReDoS (bloqueig del servidor)
const regex = /^(a+)+$/;  // ❌ backtracking catastròfic

// detect-object-injection → Prototype Pollution
obj[req.body.key];         // ❌ clau = "__proto__"

// detect-possible-timing-attacks → Timing Attack
if (token == secret) { }   // ❌ usar crypto.timingSafeEqual()

// detect-non-literal-require → càrrega arbitrària de mòduls
require(userInput);        // ❌ carrega qualsevol fitxer del disc
```

**6\. La complexitat ciclomàtica: la mètrica de qualitat fonamental**

La Complexitat Ciclomàtica (CYC), introduïda per McCabe el 1976, mesura el nombre de camins d'execució independents d'una funció. La fórmula pràctica: **CYC \= nombre de decisions \+ 1** (decisions \= `if`, `else if`, `while`, `for`, `case`, `catch`, `?:`, `&&`, `||` en condicionals).

```typescript
function calcularPreu(preu: number, usuari: Usuari, config: Config): number {
  if (!usuari) return 0;              // +1
  if (usuari.premium && preu > 100) { // +1 (if) + 1 (&&)
    return preu * 0.9;
  }
  if (config.oferta) return preu * 0.95; // +1
  return preu;
}
// Decisions: 4 → CYC = 4 + 1 = 5 ← acceptable ✅
```

**La escala de valors (McCabe \+ NIST):**

1-4   ✅ Excel·lent — fàcil de testar, mantenir, entendre  
5-7   ✅ Acceptable — codi moderat, atendre en code review  
8-10  ⚠️ Preocupant — considera refactoritzar (NIST recomana ≤10)  
11-15 🔴 Alt risc — refactoritza aviat  
15-20 🔴🔴 Molt alt — cada canvi és un risc  
\>20   💀 Crític — refactoring urgent obligatori

La connexió directa amb el testing: CYC \= nombre mínim de tests per a cobertura completa. Una funció amb CYC=25 necessita 25 tests per cobrir tots els camins. En la pràctica, no s'escriuen → bugs ocults garantits.

**7\. La complexitat cognitiva: la innovació de SonarQube**

SonarQube va crear la Complexitat Cognitiva perquè la Ciclomàtica no reflecteix bé la dificultat de llegir el codi. Dues funcions poden tenir la mateixa CYC però una ser molt més difícil d'entendre per l'imbricació.

```typescript
// CYC = 4 en tots dos casos. Cognitiva: molt diferent.

// Versió A: cognitiva baixa (fàcil de llegir)
const resultat = a ? 'a' : b ? 'b' : 'c';  // Cognitiva = 2

// Versió B: cognitiva alta (imbricació profunda)
function obtenirResultat() {
  if (a) {                   // +1 cogn
    return 'a';
  } else {                   // +1 cogn (else)
    if (b) {                 // +2 cogn (nesting +1)
      return 'b';
    }
    return 'c';
  }
}  // Cognitiva = 4
```

SonarQube emet un code smell quan la Complexitat Cognitiva supera 15-20.

**8\. El deute tècnic: definició i quantificació**

El deute tècnic és el cost del treball addicional causat per escollir una solució ràpida en lloc de la correcta. Com el deute financer, acumula interessos: com més temps sense adreçar, més car es fa.

**SonarQube el quantifica en temps real:**

```html
Technical Debt Ratio = Cost de remediació / Cost de desenvolupament
                     = Remediació (min) / (0.06 dies × LOC)

Graella SQALE (Maintainability Rating):
  A = 0–5%   ✅ Excel·lent
  B = 6–10%  ✅ Bo
  C = 11–20% ⚠️ Moderat
  D = 21–50% 🔴 Alt
  E = 51%+   💀 Crític
```

SonarQube assigna un temps de remediació a cada code smell detectat i suma tot el projecte. El resultat: "El teu projecte té 14h 30min de deute tècnic, Rating B".

**9\. SonarQube: l'estàndard de mantenibilitat**

SonarQube és la plataforma central que unifica totes les mètriques: seguretat, fiabilitat, mantenibilitat, cobertura i duplicació.

**La filosofia "Clean as You Code"** — el focus és el codi nou (les línies afegides/modificades recentment), no el deute acumulat. Prevé que el deute creixi.

**El Quality Gate "Sonar Way" per defecte:**

```yaml
Sobre el CODI NOU (no l'existent):
  reliability_rating <= A    # 0 nous bugs
  security_rating <= A       # 0 noves vulnerabilitats
  security_hotspots_reviewed >= 100%
  maintainability_rating <= A  # Technical Debt Ratio ≤ 5%
  coverage >= 80%            # configurable
  duplicated_lines_density < 3%  # configurable
```

Si la PR falla el Quality Gate → es bloqueja automàticament al CI/CD.

**10\. El Pipeline complet de seguretat i qualitat**

```html
Developer escriu codi a l'IDE  
        ↓  
ESLint Security Plugin detecta vulnerabilitats en temps real  
(detect-eval, detect-fs, detect-child-process, etc.)  
        ↓  
git push / PR oberta  
        ↓  
CI/CD Pipeline:  
  1\. npm audit → vulnerabilitats a les dependències  
     Si CRITICAL → pipeline falla ❌  
        ↓  
  2\. SAST (SonarQube / Semgrep / ESLint):  
     → Code Smells, complexitat, duplicació, SQL injection...  
     → Quality Gate: ✅ o ❌  
        ↓  
  3\. Tests \+ Cobertura → cobertura ≥ 80%?  
        ↓  
  4\. Build de producció  
        ↓  
Deploy a Staging  
        ↓  
  5\. DAST (OWASP ZAP):  
     → Headers de seguretat, sessions, misconfiguracions  
     → Prova els OWASP Top 10 en runtime  
        ↓  
Deploy a Producció (únicamente si tot ha passat)  
        ↓  
  6\. Monitoratge continu:  
     → Dependabot alerta de nous CVEs  
     → npm audit periòdic
```

**Resum: el mapa complet del tema**

```html
Seguretat de dependències:  
  → 80% del codi és de tercers  
  → npm audit \+ OWASP Dependency-Check \+ Snyk \+ Dependabot

SAST (codi font, sense execució):  
  → SonarQube (regles \+ mètriques integrades)  
  → ESLint Security Plugin (14 regles: eval, fs, regex, etc.)  
  → Moment: cada commit/PR

DAST (aplicació en execució):  
  → OWASP ZAP, Burp Suite  
  → Moment: staging i producció

OWASP Top 10:2025:  
  → A01 Access Control, A02 Misconfiguration, A03 Supply Chain (nova)  
  → A04 Injection, A05 Cryptographic, A06 Outdated Components  
  → A07 Auth, A08 Integrity, A09 Logging, A10 Exceptions (nova)

Mètriques de qualitat:  
  → Complexitat Ciclomàtica: CYC \= decisions \+ 1 (NIST màxim: 10\)  
  → Complexitat Cognitiva: dificultat de lectura (màxim SonarQube: 15-20)  
  → Technical Debt Ratio: remediació/desenvolupament (Rating A \= ≤5%)

SonarQube:  
  → Qualificació A-E per Seguretat, Fiabilitat, Mantenibilitat  
  → Quality Gate: bloqueja PRs que no compleixen els estàndards  
  → Filosofia: "Clean as You Code" → focus en el codi nou
```
