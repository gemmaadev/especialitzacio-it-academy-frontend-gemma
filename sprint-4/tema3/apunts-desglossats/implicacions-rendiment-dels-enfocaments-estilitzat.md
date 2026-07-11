## **Quines implicacions de rendiment tenen diferents enfocaments d'estilitzat?**

## **El principi fonamental: Compile-time vs. Runtime**

La diferència de rendiment més important no és quines característiques té cada eina, sinó **quan** processa els estils:

| COMPILE-TIME (el compilador fa la feina):  CSS Tradicional   → fitxer .css processat pel browser  CSS Modules       → classe única generada en build  Tailwind CSS      → classes atòmiques generades en buildRUNTIME (el browser/JS fa la feina):  Inline Styles     → objectes JS → style inline al DOM  CSS-in-JS         → JS genera i injecta CSS al runtime  styled-components → parseja i injecta estils mentre s'executa |
| :---- |

**Enfocament 1: Estils Inline — pitjor rendiment possible**

| // ❌ Estils inline: el pitjor dels monsfunction Button({ primary }) {  return (    \<button style={{      backgroundColor: primary ? '\#007bff' : 'white',      color: primary ? 'white' : '\#007bff',      padding: '10px 20px',    }}\>      Clic    \</button\>  );} |
| :---- |

**Problemes de rendiment:**

No pots usar `:hover`, media queries ni pseudo-elements amb estils inline → forces solucions JS addicionals. 

Els estils inline no es poden compartir entre components → duplicació de codi. Cada re-render recrea l'objecte d'estil → pressió addicional al garbage collector. 

El browser no pot optimitzar estils inline com fa amb classes CSS.

**Enfocament 2: CSS-in-JS (styled-components, Emotion) — overhead de runtime**

CSS-in-JS ha d'executar-se en el browser per determinar quins estils aplicar. Això afegeix overhead de JavaScript, incrementa l'INP (Interaction to Next Paint), i és notòriament problemàtic amb React Server Components.

A 100+ components amb estils dinàmics complexos, la generació CSS en runtime apareix als perfils de rendiment.

| Flux d'un component styled-components en producció:1\. Browser descarrega el bundle JS (inclou la lògica dels estils)2\. JS s'executa → styled-components parseja les template literals3\. Es generen noms de classe únics4\. S'injecten etiquetes \<style\> al \<head\> del document5\. El component es renderitza amb les classes generades                                ↑                     TOT això passa en RUNTIME → overhead\! |
| :---- |

En el test de velocitat renderitzant 10.000 items en una llista, styled-components va tardar 148ms. Les CSS frameworks pures com Tailwind van ser aproximadament un 63% més ràpides que styled-components.

**El problema crític de 2025-2026:**

CSS-in-JS que usa React context és fonamentalment incompatible amb React Server Components (RSC). Si uses Next.js App Router, el runtime CSS-in-JS es fa problemàtic.

**Enfocament 3: CSS Modules — rendiment excel·lent**

Com que CSS Modules genera noms de classe estàtics en temps de build, poden ser més performants que solucions dinàmiques com CSS-in-JS. 

Els estils es processen en temps de build, resultant en fitxers CSS més petits i optimitzats. CSS Modules evita la necessitat que JavaScript parsegi i apliqui estils en runtime.

| Flux de CSS Modules en producció:1\. Build time → Webpack/Vite processa els .module.css2\. Genera noms únics: Button\_button\_\_xK9mP3\. Produeix un fitxer .css estàtic               ↓4\. Browser carrega el .css (cacheïble independentment del JS\!)5\. El component renderitza → aplica les classes → ZERO overhead JS |
| :---- |

Avantatges per a Core Web Vitals: el fitxer CSS es pot cachear independentment del JavaScript, el que significa que en visites repetides el CSS carrega instantàniament. 

El LCP (Largest Contentful Paint) no es veu afectat perquè els estils estan disponibles des del primer moment.

**Enfocament 4: Tailwind CSS — el millor rendiment general**

Tailwind és compile-time. Els estils es generen un cop, el CSS no usat es purga, i el runtime és mínim.

Com que cada classe Tailwind mapeja a una sola regla CSS, els browsers apliquen aquests estils molt eficientment sense càlculs de cascade complexos.

| // Tailwind: classes atòmiques → zero overhead runtimefunction Button({ primary }) {  return (    \<button className={\`      px-4 py-2 rounded font-medium transition-colors      ${primary        ? 'bg-blue-600 text-white hover:bg-blue-700'        : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'      }    \`}\>      Clic    \</button\>  );} |
| :---- |

El funcionament del JIT (Just-In-Time):

Tailwind va introduir el mode Just-In-Time, que compila únicament les utilitats usades en el projecte, al moment. Quan uses una nova classe en el teu codi, Tailwind genera el CSS necessari instantàniament.

| Mode JIT de Tailwind:  Escaneja tots els fitxers JSX/HTML → detecta quines classes s'usen  → Genera únicament el CSS necessari → CSS mínim finalResultat típic:  Bootstrap complet: \~200KB CSS  Tailwind sense purge: \~3MB CSS (tot possible)  Tailwind amb JIT: \~5-15KB CSS (únicament l'usat\!) |
| :---- |

El CSS és un 13% més petit amb Tailwind, cosa que confirma que el purgat de classes no usades és efectiu. El JavaScript és lleugerament més gran, donat que tots els noms de classe llargs estan embeds en el fitxer JavaScript.

**La comparativa de rendiment: números reals**

En el test de velocitat renderitzant 10.000 items en una llista React: Tailwind CSS va trigar 85ms. Styled Components va trigar 148ms. En el test, els frameworks CSS purs van ser aproximadament un 63% més ràpids que styled-components.

| TEST: Renderitzar 10.000 components en ReactTailwind CSS:         85ms  ← el més ràpidCSS Modules:          \~90ms ← pràcticament igualstyled-components:   148ms  ← 63% més lent que TailwindEstils inline:       \~180ms ← el més lent (sense compartició) |
| :---- |

**L'impacte a Core Web Vitals (SEO i UX real)**

| LCP (Largest Contentful Paint) → quant triga a veure's el contingut  CSS Modules / Tailwind: ✅ Estils disponibles des del primer byte HTML  CSS-in-JS (sense SSR):  ❌ Estils apareixen DESPRÉS del JS (FOUC\*)  CSS-in-JS (amb SSR):    ✅ Es pre-genera a la resposta del servidorINP (Interaction to Next Paint) → quant triga a respondre a interaccions  Tailwind / CSS Modules: ✅ Cap JS per a estils → INP baix  CSS-in-JS:              ❌ Re-avalua els estils en cada interacció\* FOUC: Flash of Unstyled Content |
| :---- |

**La taula de rendiment per a React 2025-2026**

|  | Inline | CSS Modules | CSS-in-JS | Tailwind |
| ----- | ----- | ----- | ----- | ----- |
| **Quan processa** | Runtime | Build time | Runtime | Build time |
| **Mida bundle CSS** | 0 KB | Petita | En JS | Mínima (JIT) |
| **Overhead JS** | 🔴 Alt | ✅ Cap | 🔴 Alt | ✅ Cap |
| **LCP** | ⚠️ | ✅ Excel·lent | ⚠️ Sense SSR | ✅ Excel·lent |
| **RSC compatible** | ✅ | ✅ | ❌ Context\! | ✅ |
| **Cacheïble** | ❌ | ✅ | ❌ | ✅ |
| **Render 10K items** | \~180ms | \~90ms | \~148ms | \~85ms |

    
Recomanació per a rendiment 2025-2026: 

→ Màxim rendiment: Tailwind CSS (compile-time, atomic, JIT)   
→ Bon rendiment sense canviar workflow: CSS Modules   
→ CSS-in-JS: únicament si els estils dinàmics son MOLT necessaris i sempre amb SSR (Next.js) per evitar FOUC i LCP degradat   
→ Estils inline: evitar per a components recurrents

