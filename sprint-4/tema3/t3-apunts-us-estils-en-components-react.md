## **Tema 3 — Ús d'estils en components React**

**1\. Les cinc formes d'estilitzar en React**

React no imposa cap enfocament d'estilitzat. Les cinc opcions principals van de menys a més sofisticades:

| Estils Inline      → objectes JS directament a l'elementCSS Tradicional    → fitxers .css globalsCSS Modules        → fitxers .module.css encapsulats per componentCSS-in-JS          → estils escrits en JavaScript (styled-components)Utility-First      → classes atòmiques predefinides (Tailwind CSS) |
| :---- |

La regla d'or de la documentació oficial de React: usa `style` inline únicament quan els estils depenen de variables JavaScript. En altres casos, `className` és més eficient.

**2\. Estils inline i `className`: la base de React**

| // ✅ className per a estils estàtics\<img className="avatar" /\>// ✅ style únicament per a valors dinàmics de JavaScript\<img  className="avatar"  style={{    width: user.imageSize,   // ← valor calculat en JS    height: user.imageSize,    fontSize: 16,            // React afegeix "px" automàticament    fontWeight: 'bold',      // camelCase obligatori  }}/\>// Classes condicionals: usar clsx o classnamesimport cn from 'classnames';\<div className={cn('row', {  selected: isSelected,  large: size \=== 'large',})}\> |
| :---- |

Els problemes dels estils inline: no suporten `:hover`, media queries ni pseudo-elements. No es poden compartir entre components. Cada re-render recrea l'objecte. El pitjor rendiment de totes les opcions.

**3\. CSS Modules: Encapsulament sense overhead**

Un CSS Module és un fitxer `.module.css` on tots els noms de classe son **encapsulats localment per defecte**. El bundler (Vite, Webpack) genera noms únics en temps de build.

| /\* Button.module.css \-- CSS estàndard que ja coneixes \*/.button { background: \#007bff; color: white; padding: 10px 20px; }.primary { composes: button; background: \#0056b3; } |
| :---- |

| // Button.jsximport styles from './Button.module.css';function Button({ primary }) {  return (    \<button className={primary ? styles.primary : styles.button}\>      Clic    \</button\>  );}// El browser veu: Button\_button\_\_xK9mP → zero col·lisions possibles\! |
| :---- |

El mecanisme: tu escrius `.button`, el browser veu `Button_button__xK9mP`. Dos components amb la mateixa classe `.button` generen noms completament diferents. Encapsulament automàtic, zero configuració extra.

**Quan usar CSS Modules:** quan vols encapsulament sense overhead de JS, equips amb fort coneixement CSS, SEO crític, o projectes amb SASS/SCSS existents.

**4\. CSS-in-JS (styled-components): Estils dinàmics**

CSS-in-JS escriu els estils CSS directament en JavaScript. La gran ventaja és que el CSS pot dependre directament de props i estat de React.

| import styled from 'styled-components';// Component baseconst Button \= styled.button\`  background: \#007bff;  color: white;  &:hover { background: \#0056b3; }\`;// Estils dinàmics via props: IMPOSSIBLE amb CSS purconst Alert \= styled.div\`  background: ${({ type }) \=\> ({    success: '\#d4edda',    error: '\#f8d7da',  }\[type\])};\`;// Theming global\<ThemeProvider theme={{ primary: '\#007bff' }}\>  \<App /\>\</ThemeProvider\> |
| :---- |

**El problema crític de 2025-2026:** CSS-in-JS que usa React Context és **fonamentalment incompatible amb React Server Components (RSC)**. Si uses Next.js App Router, el runtime CSS-in-JS es fa problemàtic. Les biblioteques CSS-in-JS son \~63% més lentes que Tailwind en tests de renderització.

**Quan usar CSS-in-JS:** únicament si necessites estils molt dinàmics basats en props/estat i sempre amb SSR configurat per evitar FOUC.

**5\. Tailwind CSS: el millor rendiment el 2026**

Tailwind és un framework utility-first. En lloc d'escriure CSS, composes classes predefinides directament al JSX. Funciona en **compile-time**: el JIT mode genera únicament el CSS usat (\~5-15 KB final vs 3 MB sense purgat).

| function Button({ primary }) {  return (    \<button className={\`      px-4 py-2 rounded font-medium transition-colors      ${primary        ? 'bg-blue-600 text-white hover:bg-blue-700'        : 'bg-white text-blue-600 border border-blue-600'      }    \`}\>      Clic    \</button\>  );} |
| :---- |

**Avantatges:** zero overhead de JS, compatible amb React Server Components, design system enforçat per configuració, el més ràpid en tests de renderització (\~85ms vs \~148ms de styled-components). 

**Desavantatges:** JSX pot ser verbós amb moltes classes, requereix aprendre la convenció de noms.

Com a 2026, Tailwind és l'enfocament dominant: shadcn/ui, la majoria de biblioteques de components i els generadors de codi AI (v0, Bolt, Lovable) l'usen per defecte.

**6\. Implicacions de rendiment: la decisió clau**

La diferència fonamental no és quin aspecte té cada eina sinó **quan** processa els estils:

| COMPILE-TIME → estils processats en BUILD, zero overhead al browser  CSS Modules:    \~90ms  (render 10K items) ✅  Tailwind CSS:   \~85ms  (render 10K items) ✅ el més ràpidRUNTIME → JavaScript ha de generar els estils al browser  Estils inline:  \~180ms (render 10K items) ❌ el més lent  styled-comps:   \~148ms (render 10K items) ❌ 63% més lent que Tailwind |
| :---- |

L'impacte a Core Web Vitals:

| LCP (Largest Contentful Paint):  CSS Modules / Tailwind: ✅ Estils disponibles des del primer byte  CSS-in-JS sense SSR:    ❌ FOUC (Flash of Unstyled Content)RSC (React Server Components, Next.js App Router):  CSS Modules / Tailwind: ✅ Totalment compatibles  styled-components:      ❌ Usa Context → no funciona en Server Components |
| :---- |

**7\. Biblioteques de components: les tres filosofies**

El 2026, l'elecció arquitectònica principal és **headless vs styled**.

**Styled (MUI, Ant Design)** — components ja estilitzats, llests per usar. Velocitat màxima però bundle gran (\~90-150 KB) i personalització limitada. Ideal per a enterprise.

**Headless (Radix UI, Base UI)** — comportament i accessibilitat sense cap estil. Tu aportes tot el disseny. Bundle mínim (2-5 KB per component), accessibilitat AAA garantida. Ideal per a design systems propis.

**Copy-paste (shadcn/ui)** — el codi del component entra al teu projecte directament (no en node\_modules). Control total, zero vendor lock-in, Tailwind-native, compatible amb RSC. La primera opció per a projectes nous el 2026\.

| \# shadcn/ui: instal·lació a Vitenpx shadcn@latest initnpx shadcn@latest add button card form\# → el codi del component ara viu a src/components/ui/ |
| :---- |

Els avantatges de qualsevol biblioteca de components: velocitat de desenvolupament, accessibilitat "gratis" (ARIA, focus management, keyboard navigation), consistència visual. Els inconvenients: bundle size, vendor lock-in, "design genèric" si no es personalitza, incompatibilitat CSS-in-JS amb RSC.

**8\. Accessibilitat i contrast de colors (WCAG)**

Les WCAG defineixen els estàndards d'accessibilitat. El criteri més rellevant per a l'estilitzat és el contrast de colors:

| Text normal (\<18pt): ratio mínim 4.5:1 (AA)Text gran (≥18pt):   ratio mínim 3:1 (AA)Components UI:       ratio mínim 3:1 (AA)❌ Trampes comunes:  Text gris clar sobre blanc → sovint \<4.5:1  Placeholders d'inputs → quasi sempre insuficients  Botons disabled → exempts per WCAG 1.4.3 |
| :---- |

Eina pràctica: `webaim.org/resources/contrastchecker/` per verificar qualsevol combinació de colors. shadcn/ui i Radix UI estan dissenyats per complir WCAG AA per defecte.

**El diagrama de decisió**

El projecte usa RSC / Next.js App Router?  
  SÍ → Descarta CSS-in-JS runtime (styled-comps, Emotion)  
       → Usa Tailwind \+ shadcn/ui o CSS Modules

Necessites estils molt dinàmics (basats en props complexos)?  
  SÍ → CSS-in-JS (però configura SSR obligatòriament)  
  NO → Tailwind o CSS Modules cobriran el 95% dels casos

Necessites components accessibles ràpidament?  
  SÍ → shadcn/ui (Radix \+ Tailwind, copy-paste, zero lock-in)  
       o Radix UI si vols estil propi  
       o MUI si necessites 100+ components (enterprise)

El rendiment és crític?  
  SÍ → Tailwind (compile-time, JIT, atomic CSS)

L'equip ve de CSS tradicional?  
  SÍ → CSS Modules (zero corba d'aprenentatge, sintaxi estàndard)

Projecte nou el 2026?  
  → Tailwind CSS \+ shadcn/ui és l'opció per defecte de l'ecosistema

**Resum: la taula de decisió completa**

|  | Inline | CSS Modules | CSS-in-JS | Tailwind | shadcn/ui |
| ----- | ----- | ----- | ----- | ----- | ----- |
| **Rendiment** | ❌ Pitjor | ✅ Molt bo | ⚠️ Overhead | ✅ Millor | ✅ Molt bo |
| **Encapsulament** | ❌ Cap | ✅ Automàtic | ✅ Automàtic | ⚠️ Manual | ✅ Per component |
| **Estils dinàmics** | ⚠️ Limitat | ⚠️ Limitat | ✅ Natiu | ⚠️ Classes | ✅ Via Tailwind |
| **RSC compatible** | ✅ | ✅ | ❌ | ✅ | ✅ |
| **Accessibilitat** | ❌ Manual | ❌ Manual | ❌ Manual | ❌ Manual | ✅ Integrada |
| **Bundle** | 0 KB | Petit | En JS | \~5-15 KB | \~35-50 KB |
| **Corba aprenentatge** | Cap | Mínima | Moderada | Moderada | Baixa |
| **2026 ecosistema** | ⚠️ | ✅ | ↓ Declining | ✅ Dominant | ✅ Dominant |

