## **Glossari de termes — Ús d'estils en components React**

**`@apply`** — Directiva de Tailwind CSS que permet extreure un conjunt de classes utilitàries en una classe CSS pròpia. Permet reutilitzar combinacions de classes sense repetir-les al JSX. L'equip de Tailwind desaconsella usar-la excessivament perquè perd els beneficis del utility-first.

**Atomic CSS** — Filosofia d'estilitzat on cada classe CSS té una sola responsabilitat (una propietat, un valor). Tailwind és el representant principal. Avantatge: el bundle CSS final creix molt poc a mesura que el projecte creix, perquè les mateixes classes atòmiques es reutilitzen a tot arreu.

**`aria-*`** — Atributs HTML d'accessibilitat (Accessible Rich Internet Applications). En React s'usen amb la mateixa sintaxi que en HTML. Biblioteques com Radix UI i shadcn/ui els implementen automàticament als seus components. Permeten que els lectors de pantalla entenguin la interfície.

**Base UI** — Biblioteca de components headless de l'equip de MUI. Alternativa a Radix UI amb millor manteniment actiu (full-time engineers), millor TypeScript i suport per a React 19 i RSC. shadcn/ui va afegir Base UI com a capa primitiva opcional el 2025\.

**Bundle Size** — La mida del codi JavaScript que es descarrega al navegador. Les biblioteques d'estilitzat contribueixen diferentment: CSS Modules 0 KB addicionals, Tailwind \~5-15 KB (CSS estàtic), styled-components \~12 KB (JS), MUI \~90-150 KB. Afecta directament el LCP i el TBT de Core Web Vitals.

**`camelCase`** — Convenció d'escriptura que React usa per als noms de propietats CSS en el prop `style`. `font-size` → `fontSize`, `background-color` → `backgroundColor`, `border-radius` → `borderRadius`. Obligatori quan s'usen estils inline en React.

**`className`** — La propietat de React equivalent a l'atribut `class` de HTML. S'usa per assignar classes CSS a elements JSX. `<div class="container">` en HTML → `<div className="container">` en React. React usa `className` per evitar conflictes amb la paraula reservada `class` de JavaScript.

**`clsx` / `classnames`** — Biblioteques auxiliars molt petites per construir strings de `className` condicionalment. `cn('base', { active: isActive, large: size === 'lg' })` → combina classes de manera llegible. shadcn/ui inclou una funció `cn()` que combina `clsx` amb `tailwind-merge`.

**`composes`** — Funcionalitat exclusiva de CSS Modules que permet que una classe hereti els estils d'una altra. `.primary { composes: base; background: blue; }` → el component tindrà tant els estils de `.base` com el `background` propi. Alternativa a la duplicació de codi en CSS Modules.

**Compile-time** — Moment en el qual es processen els estils: durant el procés de build (Vite, Webpack), no al navegador. CSS Modules i Tailwind CSS processen els estils en compile-time → zero overhead al browser. Contraposat al runtime.

**Core Web Vitals** — Mètriques de rendiment de Google que afecten el SEO: LCP (Largest Contentful Paint), INP (Interaction to Next Paint) i CLS (Cumulative Layout Shift). L'elecció d'estilitzat impacta directament LCP i INP: CSS-in-JS sense SSR afecta negativament el LCP.

**Copy-paste (filosofia)** — L'enfocament de shadcn/ui on en lloc d'instal·lar una biblioteca com a dependència npm, copies el codi font del component directament al teu projecte. Avantatge: zero vendor lock-in, control total del codi, no hi ha versions a actualitzar. Desavantatge: has de mantenir el codi tu mateix.

**CSS-in-JS** — Enfocament d'estilitzat on els estils CSS s'escriuen dins de fitxers JavaScript. styled-components i Emotion son les implementacions principals. Avantatges: estils dinàmics basats en props, encapsulament automàtic, theming integrat. Desavantatge principal: genera estils en runtime → overhead de JS, incompatible amb RSC.

**CSS Modules** — Fitxers `.module.css` on tots els noms de classe son encapsulats localment per defecte per el bundler. El selector `.button` es transforma en `ComponentName_button__hash` únic. Zero conflictes de noms, zero overhead de JavaScript, sintaxi CSS estàndard.

**`dangerouslySetInnerHTML`** — Prop de React per inserir HTML cru directament al DOM. Equivalent a `innerHTML`. Perillosa perquè exposa a vulnerabilitats XSS si el contingut no és de confiança. Usar únicament amb contingut sanititzat i de fonts conegudes.

**Dead Code Elimination** — La capacitat d'eliminar automàticament els estils no usats del bundle final. CSS-in-JS ho fa automàticament (si el component s'elimina, els estils desapareixen). Tailwind JIT ho fa amb purgat automàtic. CSS Modules i CSS tradicional requereixen configuració manual.

**Design Tokens** — Variables que representen decisions de disseny (colors, espaiat, tipografia, border-radius...). A Tailwind es defineixen al `tailwind.config.js`. A shadcn/ui s'implementen com a CSS custom properties (variables CSS). Permeten que tot l'equip usi els mateixos valors sense memoritzar-los.

**`dark:` (Tailwind)** — Prefix de Tailwind CSS per aplicar estils en mode fosc. `className="bg-white dark:bg-gray-900"` aplica `bg-white` en mode clar i `bg-gray-900` en mode fosc. shadcn/ui inclou suport de dark mode via CSS variables per defecte.

**Emotion** — Biblioteca CSS-in-JS alternativa a styled-components. Usada per MUI v5+ internament. Pot tenir millor rendiment que styled-components en alguns casos. Comparteix els mateixos inconvenients fonamentals: runtime overhead i incompatibilitat amb RSC.

**Encapsulament** — La propietat que fa que els estils d'un component no afectin altres components. CSS Modules i CSS-in-JS proporcionen encapsulament automàtic. CSS tradicional té scope global (risc de col·lisions). Tailwind té encapsulament implícit perquè les classes son atòmiques.

**FOUC (Flash of Unstyled Content)** — El fenomen on el contingut apareix breument sense estils abans que el JavaScript apliqui els CSS-in-JS. Ocorre quan CSS-in-JS s'usa sense SSR: el JS ha d'executar-se primer per generar els estils. Resolució: SSR amb pre-generació d'estils al servidor.

**Focus Management** — La gestió del focus del teclat en components interactius (modals, dropdowns, tooltips). Crítica per a l'accessibilitat. Implementar-la correctament des de zero és complex (focus trap, restauració del focus al tancar...). Radix UI i shadcn/ui la gestionen automàticament.

**Global Styles** — Estils que s'apliquen a tot el document, no a un component específic. En CSS Modules s'usen amb `:global(.selector)`. A Tailwind amb capes `@layer base`. A styled-components amb `createGlobalStyle`. Usar amb moderació per no perdre l'encapsulament.

**Headless (components)** — Components que proporcionen comportament i accessibilitat però zero estils visuals. Tu defines com es veu. Exemples: Radix UI, Base UI, Headless UI. Avantatge: llibertat total de disseny. Desavantatge: has de dissenyar-ho tot tu. shadcn/ui és Radix (headless) \+ Tailwind (estils).

**Headless UI** — Biblioteca de components headless de l'equip de Tailwind CSS. Enfocada en components comuns (Menu, Dialog, Popover, Tab). \~10 KB gzipat. Excel·lent per a equips que ja usen Tailwind. Segueix WAI-ARIA recomanacions estretament.

**INP (Interaction to Next Paint)** — Mètrica de Core Web Vitals que mesura quant triga la pàgina a respondre a interaccions de l'usuari. CSS-in-JS pot impactar negativament l'INP perquè ha de re-avaluar els estils en cada interacció. Tailwind i CSS Modules no afecten l'INP.

**JIT Mode (Just-In-Time)** — Mode de compilació de Tailwind CSS que genera únicament les classes CSS realment usades al projecte, de manera incremental. Resultat: bundle CSS molt petit (5-15 KB típicament) i suport per a valors arbitraris (`w-[127px]`). Actiu per defecte des de Tailwind CSS v3.

**`keyframes`** — Regles CSS per definir animacions. En styled-components s'usen amb `keyframes` importat. En CSS Modules s'usen normalment. En Tailwind s'usen via la directiva `@keyframes` a la configuració o les classes `animate-*` predefinides.

**LCP (Largest Contentful Paint)** — Mètrica de Core Web Vitals que mesura quant triga a renderitzar-se el contingut principal visible. CSS-in-JS sense SSR afecta negativament el LCP perquè els estils no estan disponibles fins que el JS s'executa. CSS Modules i Tailwind no l'afecten.

**`localhost:5173`** — Port per defecte de Vite en mode desenvolupament. Rellevant perquè Tailwind JIT i CSS Modules funcionen amb hot reload instantani durant el desenvolupament.

**Material UI (MUI)** — La biblioteca de components React més instal·lada (\~5.8M descàrregues setmanals, 93K+ GitHub stars). Implementa Google Material Design. Proporciona 100+ components. Bundle \~90-150 KB. Usa Emotion (CSS-in-JS) internament → incompatible amb RSC sense configuració especial. Ideal per a enterprise i dashboards.

**Media Queries** — Regles CSS per aplicar estils responsius basats en la mida de la pantalla. CSS Modules les suporten completament. Estils inline no les suporten. Tailwind usa prefixes (`sm:`, `md:`, `lg:`, `xl:`) com a alternativa. styled-components les inclou dins del template literal.

**`.module.css`** — Extensió de fitxer que identifica un CSS Module. Vite, Webpack i Create React App detecten automàticament aquesta extensió i processen el fitxer com a module. `import styles from './Button.module.css'` importa un objecte JS amb les classes com a propietats.

**`npx shadcn@latest add`** — Comanda CLI de shadcn/ui per afegir components individuals al projecte. `npx shadcn@latest add button card form input` afegeix els fitxers directament a `src/components/ui/`. Els components son teus un cop afegits.

**`@layer`** — Directiva CSS per organitzar els estils en capes. Tailwind usa tres capes: `base` (resets i estils HTML), `components` (classes de components reutilitzables), `utilities` (les classes utilitàries de Tailwind).

**Radix UI** — Biblioteca de components headless i accessibles (AAA). La base sobre la qual es construeix shadcn/ui. Cada component és un primitiu independent (`@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`...). Adquirida per WorkOS el 2025, amb manteniment més lent. Més de 130M descàrregues mensuals.

**Ratio de Contrast** — El quocient de lluminositat relativa entre el color del text i el color del fons. WCAG 2.1 AA requereix: 4.5:1 per a text normal, 3:1 per a text gran i components UI. Verificable a `webaim.org/resources/contrastchecker/`.

**React Server Components (RSC)** — Components React que s'executen al servidor i envien HTML al client. No poden usar Context, useState ni efectes de navegador. CSS Modules i Tailwind son compatibles. CSS-in-JS basat en Context (styled-components, Emotion) no ho és sense configuració especial.

**Runtime** — Moment en el qual s'executa el codi: al navegador de l'usuari, després de descarregar el JavaScript. CSS-in-JS genera els estils en runtime → overhead, FOUC potencial, incompatibilitat RSC. Contraposat al compile-time.

**`SameSite`** — (No relacionat amb estilitzat, però pot aparèixer en el context de cookies de preferències de tema.)

**Scoping** — La limitació de l'abast d'aplicació dels estils a un element o component específic. CSS tradicional té scope global (risc de col·lisions). CSS Modules i CSS-in-JS fan scoping automàtic per component. Tailwind té scoping implícit per naturalesa atòmica.

**shadcn/ui** — Col·lecció de components React copy-paste construïts sobre Radix UI i estilitzats amb Tailwind CSS. No és una biblioteca npm tradicional: copies el codi font al teu projecte. Full code ownership, zero vendor lock-in, compatible amb RSC, Tailwind-native. Primera opció recomanada per a projectes nous el 2026\.

**`style` prop** — Prop de React per aplicar estils CSS inline com a objecte JavaScript. Les propietats CSS s'escriuen en camelCase. Útil únicament per a valors calculats dinàmicament. No suporta `:hover`, media queries ni pseudo-elements.

**styled-components** — La biblioteca CSS-in-JS més popular. Usa template literals per escriure CSS dins de JS. Genera noms de classe únics automàticament. Suporta theming via `ThemeProvider`. \~12 KB gzipat. Problemàtica amb RSC i \~63% més lenta que Tailwind en tests de renderització.

**`sx` prop (MUI)** — Prop especial de Material UI per aplicar estils directament a components MUI amb accés al sistema de tema. Alternativa als overrides de tema per a estils puntuals. Usa el sistema de CSS-in-JS d'Emotion internament.

**`tailwind.config.js`** — Fitxer de configuració de Tailwind CSS on es defineixen els design tokens del projecte: colors, espaiat, tipografia, border-radius, breakpoints. Actua com a "source of truth" del design system de l'aplicació. shadcn/ui usa variables CSS en lloc de valors hardcodats a la configuració.

**`tailwind-merge`** — Biblioteca que fusiona classes Tailwind sense conflictes. Si tens `bg-blue-500` i afegeixes `bg-red-500`, `twMerge('bg-blue-500', 'bg-red-500')` retorna únicament `bg-red-500` (l'última guanya). shadcn/ui la inclou a la funció `cn()`.

**ThemeProvider** — Component de styled-components (i altres biblioteques CSS-in-JS) que proporciona variables de tema a tots els components fills via React Context. Permet canviar entre temes (clar/fosc) dinàmicament.

**Tree-shaking** — Eliminació automàtica de codi no usat del bundle final. Les biblioteques de components com MUI suporten tree-shaking si s'importen els components individualment: `import Button from '@mui/material/Button'` en lloc de `import { Button } from '@mui/material'`.

**Utility-first CSS** — Filosofia d'estilitzat on es composen classes atòmiques predefinides en lloc d'escriure CSS personalitzat. Tailwind CSS és el representant dominant. Cada classe té una sola responsabilitat: `p-4` → `padding: 1rem`, `text-blue-600` → `color: #2563eb`.

**Variables CSS (Custom Properties)** — Variables natives de CSS definides amb `--nom-variable: valor` i usades amb `var(--nom-variable)`. shadcn/ui les usa extensivament per al theming. Permeten canviar temes sense JavaScript. Compatibles amb totes les solucions d'estilitzat.

**Vendor Lock-in** — La dependència que una biblioteca crea sobre el teu codebase dificultant la migració. styled-components i MUI creen lock-in moderat. shadcn/ui elimina el lock-in perquè el codi és teu. Tailwind crea lock-in amb la seva sintaxi però el CSS subjacent és estàndard.

**WAI-ARIA** — Web Accessibility Initiative \- Accessible Rich Internet Applications. Especificació del W3C que defineix atributs per millorar l'accessibilitat de components web complexos. Radix UI, shadcn/ui i Headless UI implementen WAI-ARIA Authoring Practices de manera automàtica.

**WCAG (Web Content Accessibility Guidelines)** — Estàndards oficials d'accessibilitat web definits pel W3C. Tres nivells: A (mínim), AA (estàndard recomanat), AAA (màxima accessibilitat). El criteri de contrast de colors (1.4.3) és el més directament rellevant per a l'estilitzat: ratio mínim 4.5:1 per a text normal.

**WebAIM Contrast Checker** — Eina online de `webaim.org/resources/contrastchecker/` per verificar el ratio de contrast entre colors. Accepta HEX, RGB i HSL. Indica si la combinació passa els nivells AA i AAA de WCAG. Essencial durant la revisió del disseny.

