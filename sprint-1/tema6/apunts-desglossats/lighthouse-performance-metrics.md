###### **Lighthouse i Core Web Vitals: mètriques de rendiment web**

###### **Lighthouse Performance Metrics**

[https://web.dev/learn?hl=es-419\#lighthouse](https://web.dev/learn?hl=es-419#lighthouse)  
Documentació oficial per mesurar el rendiment web amb Lighthouse.

**Què és Lighthouse**

Lighthouse és una eina automatitzada de Google integrada a Chrome DevTools que audita pàgines web i genera informes detallats de rendiment, accessibilitat, bones pràctiques i SEO. 

Pots executar-la directament des de DevTools → pestanya Lighthouse, o via PageSpeed Insights (web.dev/measure) que l'executa en remot.

La gran distinció que cal entendre: 

Les dades de laboratori provenen de proves controlades executades en un dispositiu simulat en un entorn fix. Eines com Lighthouse i WebPageTest generen dades de laboratori. 

Les proves de laboratori son repetibles i útils per diagnosticar problemes específics, però no reflecteixen la diversitat d'experiències reals dels usuaris. 

Google usa dades de camp del dataset CrUX per avaluar les Core Web Vitals per als rankings de cerca.

**Les cinc categories d'auditoria**

Lighthouse genera una puntuació de 0 a 100 per a cinc categories:

1. **Performance** — velocitat de càrrega i interactivitat. La categoria més important i la que analitzem en detall.  
2. **Accessibility** — comprova si el lloc és usable per persones amb discapacitats: contrast de colors, etiquetes ARIA, navegació per teclat.  
3. **Best Practices** — bones pràctiques web: HTTPS, imatges amb proporcions correctes, APIs obsoletes.  
4. **SEO** — bàsics de SEO: meta descriptions, títols, estructura d'encapçalaments.  
5. **PWA** — si l'aplicació funciona com a Progressive Web App.

**Les mètriques de Performance: com puntua Lighthouse**

LCP, CLS i TBT representen el 80% de la puntuació. Centra't allà primer.

Les mètriques i el seu pes en la puntuació total:

| Mètrica | Pes | Categoria |
| ----- | ----- | ----- |
| **LCP** (Largest Contentful Paint) | 25% | Càrrega |
| **TBT** (Total Blocking Time) | 30% | Interactivitat |
| **CLS** (Cumulative Layout Shift) | 25% | Estabilitat visual |
| **FCP** (First Contentful Paint) | 10% | Càrrega percebuda |
| **Speed Index** | 10% | Velocitat de renderitzat |

**Les Core Web Vitals: les tres mètriques de Google**

Les Core Web Vitals son: 

* **LCP** (Largest Contentful Paint) mesura el rendiment de càrrega. Per proporcionar una bona experiència d'usuari, el LCP ha de produir-se en els 2.5 primers segons.   
* **INP** (Interaction to Next Paint) mesura la interactivitat. Les pàgines han de tenir un INP de 200 ms o menys.   
* **CLS** (Cumulative Layout Shift) mesura l'estabilitat visual. Les pàgines han de mantenir un CLS de 0.1 o menys.

### **LCP: Largest Contentful Paint**

Mesura el temps que triga el major element (imatge, vídeo o bloc de text) al viewport a fer-se visible. LCP es centra en la càrrega significativa: el punt en el qual els usuaris veuen el contingut principal. Optimitzar imatges, el caching i els temps de resposta del servidor ajuda a aconseguir un millor LCP.

Objectius: ≤2.5s (Bé), 2.5-4s (Necessita millora), \>4s (Dolent).

Causes habituals de LCP alt: TTFB lent (servidor lent o sense CDN), recursos render-blocking, imatge LCP no precarregada.

### **TBT: Total Blocking Time**

TBT mesura el temps total en mil·lisegons entre el FCP i el Time to Interactive on el fil principal és bloquejat per tasques llargues (\>50ms). TBT correlaciona molt bé amb INP, i per tant es considera la millor alternativa quan es testa en un entorn de laboratori on la interacció real d'usuari no és possible.

Pes en Lighthouse: 30% de la puntuació de Performance — la mètrica amb més pes. TBT correlaciona bé amb INP, fent-la la millor mètrica de laboratori per predir la interactivitat en el món real.

### **INP: Interaction to Next Paint**

INP va reemplaçar FID com a Core Web Vital el 12 de març de 2024\. INP és una mètrica purament de camp i no pot ser mesurada per eines de laboratori com Lighthouse perquè requereix input real d'usuari. En Lighthouse, la mètrica Total Blocking Time correlaciona bé amb INP.

### **CLS: Cumulative Layout Shift**

Mesura els desplaçaments visuals inesperats durant el cicle de vida de la pàgina. Quan el contingut es mou mentre la pàgina carrega i l'usuari clica en el lloc equivocat.

Es calcula com: Impact Fraction × Distance Fraction. Un desplaçament que afecta el 50% del viewport que es mou el 25% de l'alçada del viewport \= 0.5 × 0.25 \= 0.125 CLS.

### **FCP: First Contentful Paint**

Mesura el temps des que una pàgina comença a carregar fins que qualsevol part del contingut de la pàgina es renderitza en pantalla. Tenir un FCP ràpid tranquil·litza els usuaris que alguna cosa està passant. Les causes comunes d'un FCP dolent son temps de resposta alts del servidor i recursos render-blocking.

**Com llegir l'informe de Lighthouse**

Lighthouse organitza les trobades en tres seccions:

**Metrics** — les sis mètriques amb els seus valors i puntuació individual.

**Opportunities** — canvis específics que millorarien el rendiment amb l'impacte estimat en segons:

* "Eliminate render-blocking resources" → indica scripts o CSS que bloquen el renderitzat  
* "Properly size images" → imatges massa grans per al seu context  
* "Remove unused JavaScript" → codi mort que augmenta el bundle

**Diagnostics** — informació addicional que no afecta directament la puntuació però ajuda a entendre el comportament:

* "Serve static assets with an efficient cache policy"  
* "Avoid an excessive DOM size"  
* "Minimize main-thread work"

**Lab Data vs. Field Data: la diferència crítica**

Una puntuació perfecta de Lighthouse de 100 no garanteix passar les Core Web Vitals, perquè Lighthouse testa una sola visita simulada. Els teus usuaris reals poden estar en dispositius més lents, xarxes distants, o interactuant amb la pàgina de maneres que Lighthouse no pot replicar.

Per defecte, Lighthouse simula un dispositiu mòbil de gamma mitja en una connexió slow 4G simulada. Això pot trobar problemes que normalment no apareixerien en dispositius d'alta velocitat.

La relació entre eines:

PageSpeed Insights \= Lighthouse (lab data) \+ CrUX (field data)  
          ↓                    ↓  
  Puntua 0-100          Dades reals dels usuaris  
  Simulació             Dades de Chrome UX Report  
  Útil per debugar      Google usa per a rankings

**Com executar Lighthouse**

Opció 1: Chrome DevTools  
  F12 → Lighthouse → selecciona categories → Analyze Page Load

Opció 2: PageSpeed Insights (recomanat)  
  https://pagespeed.web.dev/  
  Entra la URL → obté lab data \+ field data de CrUX

Opció 3: CLI per a CI/CD  
  npm install \-g lighthouse  
  lighthouse https://exemple.com \--output html

**Les optimitzacions més impactants per categoria**

**Per millorar LCP:**

* Precarregar la imatge principal: `<link rel="preload" as="image" href="hero.jpg">`  
* Habilitar compressió Brotli al servidor  
* Usar CDN per reduir el TTFB  
* Eliminar recursos render-blocking

**Per millorar TBT/INP:**

* Dividir tasques llargues en chunks amb `setTimeout`  
* Eliminar JavaScript no usat (PurgeCSS, tree-shaking)  
* Diferir scripts no crítics: `<script defer>` o `<script async>`

**Per millorar CLS:**

* Definir `width` i `height` a totes les imatges per reservar espai  
* No inserir contingut sobre contingut existent (ads, banners)  
* Usar `transform` en lloc de propietats que causen layout

**Per millorar FCP:**

* Inlinear el CSS crític al `<head>`  
* Eliminar recursos render-blocking  
* Reduir el TTFB amb caching del servidor

**El color de la puntuació**

| Puntuació | Color | Interpretació |
| ----- | ----- | ----- |
| 90-100 | 🟢 Verd | Bé |
| 50-89 | 🟠 Taronja | Necessita millora |
| 0-49 | 🔴 Vermell | Dolent |

