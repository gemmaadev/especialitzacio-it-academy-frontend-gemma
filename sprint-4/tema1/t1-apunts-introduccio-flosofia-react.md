**Apunts T1 — Introducció a la filosofia de React**

## **1\. El model basat en components**

React trenca la interfície en peces petites, independents i reutilitzables. Un component és una funció JS que rep *props* i retorna JSX. Avantatges: reusabilitat, modularitat, escalabilitat, mantenibilitat (canvis localitzats), col·laboració en equip. Risc: fragmentació excessiva i complexitat en compartir estat entre molts components.

```jsx
function ProductCard({ product }) {
  return <li>{product.name} — {product.price}€</li>;
}
```

React recomana **composició** (ficar components dins d'altres) en lloc d'**herència**, perquè s'adapta millor a la naturalesa jeràrquica de la UI.

## **2\. DOM virtual i reconciliation**

Manipular el DOM real és car (reflow/repaint). El **DOM virtual** és una còpia lleugera en memòria sobre la qual React calcula canvis abans de tocar el navegador.

`ReactElement` (immutable, lleuger) vs `ReactComponent` (amb estat). Quan l'estat canvia → nou element → s'insereix al DOM virtual → **reconciliation** (diff) compara amb la versió anterior → només els canvis mínims s'apliquen al DOM real.

L'algorisme de diffing és O(n), no O(n³), gràcies a dues heurístiques: tipus diferents \= arbres diferents (reconstrucció total); la prop **`key`** indica quins elements es mantenen estables entre renders.

```jsx
{items.map(item => <li key={item.id}>{item.text}</li>)} // key estable, no l'índex
```

**Fiber** (des de React 16\) va fer la reconciliation interrompible i prioritzable: fases de *render* (interrompible) i *commit* (atòmica), amb *double buffering* (current tree vs work-in-progress tree).

## **3\. Declaratiu vs imperatiu**

**Imperatiu**: descrius pas a pas *com* arribar al resultat (manipular el DOM manualment). **Declaratiu**: descrius *què* vols veure; React decideix el com.

```jsx
// Declaratiu: el resultat es deriva de l'estat, no de passos manuals
<button disabled={isLoading}>{isLoading ? 'Carregant...' : 'Comprar'}</button>
```

React no és 100% declaratiu: `useRef` i `useEffect` són punts controlats on s'hi cola lògica imperativa (DOM directe, APIs externes).

## **4\. JSX → `React.createElement`**

JSX és sucre sintàctic. `<MyButton color="blue">Click</MyButton>` compila a `React.createElement(MyButton, {color: 'blue'}, 'Click')`.

Regla clau: **majúscula \= component** (referència a variable), **minúscula \= etiqueta HTML nativa** (string). El contingut entre tags es passa com `props.children`. Compte amb `0`: és "falsy" en JS però **sí** es renderitza per React (`{list.length > 0 && <X/>}`, no `{list.length && <X/>}`).

## **5\. Funcions pures**

Una funció pura: (1) no modifica res extern que existia abans de cridar-la, (2) mateixa entrada → mateixa sortida, sempre. React assumeix que els components són pures.

```jsx
// Pur: depèn només de props
function Greeting({ guestNumber }) { return <h1>Convidat #{guestNumber}</h1>; }
```

Els efectes secundaris (peticions, `Date.now()`, mutacions externes) van en *event handlers* o, com a últim recurs, `useEffect` — mai al cos del render. **Strict Mode** crida cada component dues vegades en dev per detectar impureses.

**Puretat → predictibilitat \+ testabilitat**: si el resultat depèn només de l'entrada, testejar és trivial (sense mocks de temps/xarxa). Components "gairebé purs" aïllen l'efecte secundari (ex. fetch) i deixen la part visual pura i testejable per separat.

## **6\. Hooks i les seves regles**

Funcions que comencen per `use` que connecten un component funcional a estat, cicle de vida, context, etc. React els associa per **ordre de crida**, no per nom — per això:

**Regla 1**: només al nivell superior del component (mai dins `if`, `for`, funcions niades).   
**Regla 2**: només des de components React o altres Hooks personalitzats (mai des de funcions JS normals).

```jsx
// Si cal condicionar, la condició va DINS del Hook:
useEffect(() => { if (name !== '') localStorage.setItem('formData', name); });
```

Linter oficial: `eslint-plugin-react-hooks`. Els Hooks personalitzats (prefix `use`) permeten reutilitzar lògica d'estat sense els patrons antics (HOC, render props).

## **7\. Metaframeworks de React**

React, per si sol, no inclou routing, SSR ni obtenció de dades — els metaframeworks hi afegeixen tota la infraestructura de producció.

* **Next.js** (Vercel): el més complet; App Router amb React Server Components, SSR/SSG/ISR, optimitzacions automàtiques.  
* **React Router v7 (Framework Mode)**: l'hereu real de "Remix" per a projectes React (Remix es va fusionar amb React Router el 2024). Patró `loader`/`action`/component, sense distinció Server/Client Component, progressive enhancement.  
* **TanStack Start**: emergent, encara en RC.

⚠️ *Remix 3* és un projecte separat que abandona React (usa Preact).

```html
FILOSOFIA DE REACT
│
├── Components
│   → peces reutilitzables, composició > herència
│
├── DOM Virtual + Reconciliation
│   → ReactElement (immutable) vs ReactComponent (amb estat)
│   → diff O(n) gràcies a `key` | Fiber: interrompible, per fases
│
├── Declaratiu vs Imperatiu
│   → "què" no "com" | useRef/useEffect = vàlvules d'escapament
│
├── JSX → React.createElement
│   → majúscula=component, minúscula=tag HTML | children=props.children
│
├── Funcions Pures
│   → mateixa entrada→mateixa sortida | sense efectes secundaris al render
│   → puresa → predictibilitat + testabilitat
│
├── Hooks
│   → ordre de crida fix | nivell superior | només des de components/Hooks
│
└── Metaframeworks
    → Next.js (App Router, RSC) | React Router v7 (ex-Remix) | TanStack Start
```

 

