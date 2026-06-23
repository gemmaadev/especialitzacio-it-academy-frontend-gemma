**Apunts T2 — Composició de components, JSX i props**

## **1\. El model basat en components en UI complexes**

React permet composar, ordenar i niar components per construir pàgines senceres, no només peces petites. 

La idea de **"components fins al final"** (all the way down) vol dir que des d'un botó fins a una pàgina completa, tot és un component. L'aplicació arrenca des d'un **root component**.

```jsx
function App() { return <HomePage />; } // root component
```

Mai definir un component dins d'un altre: React reinicialitza el seu estat a cada render del pare.

## **2\. Separació de components en arxius**

A mesura que l'app creix, cal moure components a fitxers propis: crear el fitxer → exportar (`export default` o `export` amb nom) → importar al fitxer consumidor.

```jsx
// Gallery.js
export default function Gallery() { ... }
// App.js
import Gallery from './Gallery.js';
```

**Export per defecte**: un sol component per fitxer, es pot importar amb qualsevol nom. 

**Export amb nom**: múltiples exports per fitxer, el nom ha de coincidir exactament i s'importa amb claus `{}`. Beneficis: modularitat, reutilització real, encapsulació, dependències visibles als `import`.

## **3\. JSX vs HTML pur**

JSX existeix perquè, en una web interactiva, la lògica determina el contingut — calia que lògica i marcatge visquessin junts al component, evitant la desincronització del model clàssic HTML/CSS/JS separats.

Tres regles que el diferencien d'HTML: 

**(1)** un sol element arrel (o `<>...</>` Fragment),   
**(2)** tancar totes les etiquetes (`<img />`),   
**(3)** camelCase per a atributs (`className`, `strokeWidth`), excepte `aria-*` i `data-*`.

## **4\. Mostrar informació i JavaScript dins de JSX**

Les claus `{}` "obren una finestra" cap a JavaScript dins del marcatge, permetent incrustar variables, expressions o crides a funcions:

```jsx
const person = { name: 'Anna', theme: { backgroundColor: 'black' } };
return (
  <div style={person.theme}>
    <h1>{person.name}</h1>
  </div>
);
```

Funciona tant dins del text com dins d'atributs (`src={user.imageUrl}`). Només s'hi poden posar **expressions**, no sentències (`if`, `for` no van directament dins de `{}`).

## **5\. Props**

Les props són com els paràmetres d'una funció: l'única manera que té un component pare de comunicar dades a un fill. Flueixen **unidireccionalment** (pare → fill) i són **immutables**.

```jsx
function Avatar({ person, size = 100 }) { // destructuració + valor per defecte
  return <img src={person.imageUrl} width={size} />;
}
```

El valor per defecte només s'aplica si la prop és `undefined`, mai amb `0` o `null` explícits. 

Per "comunicar cap amunt", el pare passa una **funció** com a prop que el fill crida. La prop `children` conté automàticament el contingut niat entre etiquetes.

## **6\. Tipar props amb TypeScript**

```jsx
type AvatarProps = {
  person: { name: string; imageUrl: string };
  size?: number; // opcional
  onClick: () => void;
  children?: React.ReactNode;
};
const Avatar = ({ person, size = 100 }: AvatarProps) => ...
```

`type` recomanat per a props pròpies; `interface` per a APIs públiques de llibreries. `React.`

`ReactNode` (qualsevol cosa renderitzable) vs `React.JSX.Element` (un element concret). 

Evitar `{}`/`Object` com a tipus — signifiquen "qualsevol valor no-nullish", no "objecte buit". `React.FC` ja no és la pràctica recomanada.

## **7\. Renderitzat condicional**

A React no hi ha sintaxi especial per a condicions: s'usen les tècniques normals de JavaScript.

```jsx
{isLoggedIn ? <p>Benvingut!</p> : <Form />}   // ternari
{showWarning && <Warning />}                   // && — compte amb el 0!
```

`{count && <List/>}` mostra literalment `0` si `count` és `0`, perquè `0` és "falsy" però **sí** es renderitza per React. Cal assegurar una expressió estrictament booleana (`count > 0 && ...`).

## **8\. Renderitzar llistes amb `map()` i `filter()`**

```jsx
const actius = productes.filter(p => p.actiu);   // primer filtres
const items = actius.map(p => <li key={p.id}>{p.nom}</li>); // després mapeges a JSX
```

`filter()` selecciona quins elements es mostren; `map()` transforma cada element de dades en un element JSX. Cada element generat dins d'un `.map()` necessita una `key`.

## **9\. Keys en llistes**

La `key` dona identitat estable a cada element, independent de la seva posició. 

Sense ella (o usant l'índex), React pot confondre quin element és quin en reordenar/inserir/eliminar, provocant bugs d'estat (sobretot greu amb inputs). 

Regles: úniques entre germans, mai generades al vol (`Math.random()`). 

La `key` mai arriba com a prop dins del component — si cal l'ID, s'ha de passar a part.

## 

## 

## **10\. Render tree**

Estructura d'arbre que modela la relació pare-fill entre **components** (no HTML) durant un render concret. Pot canviar de forma entre renders (renderitzat condicional). 

Diferencia **components top-level** (a prop de l'arrel, afecten tot el que hi ha a sota) de **leaf** (sense fills, es re-renderitzen sovint). 

Diferent del **dependency tree** (relació entre fitxers/imports, usat pel bundler). L'estat de React està lligat a la **posició a l'arbre**, no només al component.

```html
COMPOSICIÓ, JSX I PROPS
│
├── Components en UI complexes
│   → "fins al final" | root component | mai niar definicions
│
├── Separació en arxius
│   → export default (1/fitxer) vs export amb nom (N/fitxer)
│
├── JSX vs HTML
│   → 1 element arrel | tancar tags | camelCase (className, strokeWidth)
│
├── JS dins de JSX
│   → {} = finestra a JS | expressions, no sentències
│
├── Props
│   → pare→fill, immutables | valor per defecte només si undefined
│   → comunicar amunt = passar una funció | children = contingut niat
│
├── TypeScript
│   → type (props pròpies) vs interface (APIs públiques)
│   → ReactNode (flexible) vs JSX.Element (concret)
│
├── Renderitzat condicional
│   → ternari / && | compte amb el 0 "falsy" que SÍ es renderitza
│
├── Llistes: map() + filter()
│   → filter() selecciona, map() transforma a JSX
│
├── Keys en llistes
│   → identitat estable ≠ posició | mai índex si la llista canvia
│
└── Render Tree
    → component-only | top-level vs leaf | ≠ dependency tree
    → estat lligat a POSICIÓ a l'arbre
```

