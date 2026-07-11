## **Altres recursos: estils en React**

###### **Documentació Oficial de React: Estils i CSS**

[https://react.dev/reference/react-dom/components/common\#applying-css-styles](https://react.dev/reference/react-dom/components/common#applying-css-styles)   
Guia oficial per aplicar estils CSS en components React.

###### **Styling React App**

[https://maxrozen.com/guide-to-styling-react-app](https://maxrozen.com/guide-to-styling-react-app)  
Article amb estratègies i bones pràctiques per donar estils a aplicacions React.

###### **Guia Completa de CSS Modules**

[https://github.com/css-modules/css-modules](https://github.com/css-modules/css-modules)   
Repositori oficial i guia completa per a l’ús de CSS Modules.

###### **Documentació de Tailwind CSS**

[https://tailwindcss.com/docs/installation/using-vite](https://tailwindcss.com/docs/installation/using-vite)   
Guia d’instal·lació i ús del framework d’estils Tailwind CSS.

###### **shadcn/ui amb Vite**

[https://ui.shadcn.com/docs/installation/vite](https://ui.shadcn.com/docs/installation/vite)  
Guia d’instal·lació de la llibreria shadcn/ui en projectes Vite.

###### **styled-components: Documentació Oficial**

[https://styled-components.com/docs](https://styled-components.com/docs)   
Documentació oficial per utilitzar styled-components a React.

###### **Guia d'Accessibilitat Web (WCAG)**

[https://www.w3.org/WAI/standards-guidelines/wcag/](https://www.w3.org/WAI/standards-guidelines/wcag/)   
Estàndards oficials d’accessibilitat web definits per la W3C.

###### **Eina de contrast de color**

[https://webaim.org/resources/contrastchecker/](https://webaim.org/resources/contrastchecker/)   
Eina per comprovar el contrast entre colors segons les WCAG.

**1\. Documentació oficial de React: Com aplicar estils CSS**

En React, especifiques una classe CSS amb `className`. Funciona com l'atribut `class` en HTML. React no prescriu com afegeixes fitxers CSS.

### **`className` i `style`: les dues formes natives de React**

| // className → per a estils estàtics o condicionalment aplicats\<img className="avatar" /\>// style → ÚNICAMENT per a valors dinàmics que depenen de JavaScript\<img  className="avatar"  style={{    width: user.imageSize,   // ← valor dinàmic de JS    height: user.imageSize  }}/\> |
| :---- |

**La regla d'or de la documentació oficial:** Recomanem usar l'atribut `style` únicament quan els estils depenen de variables JavaScript. En altres casos, aplicar classes CSS planes amb `className` és més eficient.

### **Les diferències del `style` en React vs HTML**

Els noms de propietats CSS s'han d'escriure en camelCase, per exemple `fontWeight` en lloc de `font-weight`. 

Pots passar strings o números com a valors. Si passes un número, com `width: 100`, React afegirà automàticament `px` ("píxels") al valor tret que sigui una propietat sense unitat.

| // ✅ Propietats en camelCase\<div style={{  fontSize: 16,          // → "16px" automàticament  fontWeight: 'bold',    // → "bold"  backgroundColor: '\#fff',  borderRadius: 8,       // → "8px"  lineHeight: 1.5,       // → "1.5" (sense unitat, és propietat sense px)  zIndex: 10,            // → "10" (sense unitat)}} /\> |
| :---- |

### **Classes condicionals: el patró `clsx`/`classnames`**

Per aplicar classes CSS condicionalment, has de produir el string `className` tu mateix usant JavaScript. Per a això, pots usar una petita biblioteca auxiliar com `classnames`.

| import cn from 'classnames';// Forma simple\<div className={cn('row', isSelected && 'selected')}\>// Forma amb objecte (més llegible per a múltiples condicions)\<div className={cn('row', {  selected: isSelected,  large: size \=== 'large',  small: size \=== 'small',})}\> |
| :---- |

**2\. Tailwind CSS amb Vite: Instal·lació i Configuració**

### **Instal·lació (Vite \+ React)**

| \# Crear projecte Vite amb Reactnpm create vite@latest el-meu-projecte \-- \--template reactcd el-meu-projectenpm install\# Instal·lar Tailwind CSSnpm install tailwindcss @tailwindcss/vite |
| :---- |

| // vite.config.ts \-- afegir el plugin de Tailwindimport { defineConfig } from 'vite'import react from '@vitejs/plugin-react'import tailwindcss from '@tailwindcss/vite'export default defineConfig({  plugins: \[    react(),    tailwindcss(),  // ← plugin oficial Tailwind per a Vite  \],})/\* src/index.css \-- importar Tailwind \*/@import "tailwindcss"; |
| :---- |

**3\. shadcn/ui amb Vite: Instal·lació**

shadcn/ui no és una biblioteca tradicional que instal·les com a paquet npm. El codi del component entra al teu projecte directament.

| \# Prerequisits: Vite \+ React \+ Tailwind ja configurat\# Inicialitzar shadcn/uinpx shadcn@latest init\# Respons les preguntes de configuració:\# → Which style? New York\# → Base color? Zinc\# → Use CSS variables? Yes\# Afegir components individualmentnpx shadcn@latest add buttonnpx shadcn@latest add cardnpx shadcn@latest add form input label |
| :---- |

| Estructura generada:  src/    components/      ui/        button.tsx    ← el codi és TEU (no en node\_modules\!)        card.tsx        form.tsx    lib/      utils.ts        ← funció cn() per combinar classes |
| :---- |

| // Ús d'un component shadcn/uiimport { Button } from "@/components/ui/button"function App() {  return (    \<Button variant="default"\>Fes clic\</Button\>    \<Button variant="outline"\>Outline\</Button\>    \<Button variant="destructive"\>Eliminar\</Button\>  )} |
| :---- |

**4\. styled-components: Conceptes Fonamentals**

| npm install styled-components |
| :---- |

| import styled from 'styled-components';// Component estilitzat baseconst Button \= styled.button\`  background: \#007bff;  color: white;  padding: 10px 20px;  border: none;  border-radius: 4px;  cursor: pointer;  &:hover { background: \#0056b3; }  &:disabled { opacity: 0.5; }\`;// Estils dinàmics via propsconst Alert \= styled.div\<{ type: 'success' | 'error' | 'warning' }\>\`  padding: 12px 16px;  border-radius: 4px;  background: ${({ type }) \=\> ({    success: '\#d4edda',    error: '\#f8d7da',    warning: '\#fff3cd',  }\[type\])};\`;// Extending: heretar d'un component existentconst BigButton \= styled(Button)\`  font-size: 18px;  padding: 16px 32px;\`;// Theming globalimport { ThemeProvider } from 'styled-components';const tema \= { primary: '\#007bff', secondary: '\#6c757d' };\<ThemeProvider theme={tema}\>  \<App /\>\</ThemeProvider\> |
| :---- |

**5\. WCAG: Accessibilitat i Contrast de Colors**

Les WCAG (Web Content Accessibility Guidelines) son els estàndards oficials d'accessibilitat web de la W3C. En el context de l'estilitzat, el criteri més directament rellevant és el contrast de color.

### **Els nivells WCAG**

Nivell A   → mínim absolut (requisit legal a molts països)  
Nivell AA  → estàndard recomanat per a la majoria d'aplicacions  
Nivell AAA → màxima accessibilitat (no sempre requerit)

### **Requisits de contrast (WCAG 2.1 AA)**

| Text normal (\< 18pt / 14pt bold):  Ratio mínim: 4.5:1Text gran (≥ 18pt / 14pt bold):  Ratio mínim: 3:1Components UI i gràfics (botons, inputs, icones):  Ratio mínim: 3:1 |
| :---- |

### **Eina de contrast: WebAIM Contrast Checker**

L'eina a `webaim.org/resources/contrastchecker/` permet:

* Introduir dos colors (text i fons) en format HEX, RGB o HSL  
* Veure el ratio de contrast calculat  
* Comprovar si passa els nivells AA i AAA

| Exemples de ratios:  Blanc (\#fff) sobre Negre (\#000):    21:1  ✅ AAA  Blanc (\#fff) sobre Blau (\#007bff):  4.5:1 ✅ AA (just al límit)  Gris clar (\#999) sobre Blanc (\#fff): 2.85:1 ❌ Falla AATrampes comunes:  → Text gris sobre fons blanc (molt popular en dissenys moderns)    sovint falla els requisits WCAG  → Els placeholders dels inputs solen tenir contrast insuficient  → Els estats disabled solen ser exempts (WCAG 1.4.3 excepció) |
| :---- |

### **En la pràctica amb Tailwind i shadcn/ui**

| // ❌ Text amb poc contrast (gris clar sobre blanc)\<p className="text-gray-300"\>Text difícil de llegir\</p\>// ✅ Text amb contrast adequat\<p className="text-gray-700"\>Text accessible\</p\>\<p className="text-gray-900"\>Text molt accessible\</p\>// shadcn/ui usa CSS variables per als colors// → tots els components ja estan dissenyats per complir WCAG AA per defecte:root {  \--foreground: 222.2 84% 4.9%;      /\* text principal: contrast alt \*/  \--muted-foreground: 215.4 16.3% 46.9%;  /\* text secundari: \>4.5:1 \*/} |
| :---- |

**Resum: les eines del tema**

| Eina | Per a què serveix | Quant usar |
| ----- | ----- | ----- |
| **`className` \+ CSS** | Estils estàtics, globals | Sempre com a base |
| **`style` inline** | Valors dinàmics JS | Únicament per valors calculats |
| **`clsx`/`classnames`** | Classes condicionals | Sempre que combinis classes |
| **CSS Modules** | Encapsulament sense overhead | Components complexos |
| **Tailwind CSS** | Utilitats ràpides, design system | Projectes nous, equips grans |
| **shadcn/ui** | Components base accessibles | La majoria de projectes nous |
| **styled-components** | Estils molt dinàmics, theming | Quan el CSS-in-JS és necessari |
| **WCAG \+ Contrast Checker** | Verificar accessibilitat | Sempre en revisió de disseny |

