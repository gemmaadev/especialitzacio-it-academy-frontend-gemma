**Glossari de termes — Tema 1: Introducció a la filosofia de React**

**Composició** — Patró de React per reutilitzar lògica i estructura visual ficant components dins d'altres components, en lloc d'usar herència de classes. `<Card><Button /></Card>`. React el recomana explícitament per sobre de l'herència perquè s'adapta millor a la naturalesa jeràrquica de la UI.

**Component** — Funció (o classe) de JavaScript que rep dades d'entrada (*props*) i retorna una descripció de com s'ha de veure una part de la UI (JSX). És la unitat bàsica de construcció de React; una aplicació sencera és un arbre de components niats.

**Component "gairebé pur"** — Component que sempre renderitza la mateixa sortida pels mateixos valors de props, però que internament produeix un efecte secundari (com una petició de xarxa) aïllat en una crida separada. Categoria intermèdia entre component pur i impur.

**`createElement` (`React.createElement`)** — Funció a la qual JSX es compila per sota. `<MyButton color="blue">Click</MyButton>` esdevé `React.createElement(MyButton, {color: 'blue'}, 'Click')`. El primer argument determina el tipus (string si és minúscula \= HTML natiu; referència a variable si és majúscula \= component).

**Diffing (algorisme de)** — Heurística que utilitza React per comparar dos arbres del DOM virtual amb complexitat O(n), en lloc de l'O(n³) d'un algorisme general de comparació d'arbres. Es basa en dues assumpcions: tipus diferents \= arbres diferents, i la prop `key` indica estabilitat entre renders.

**DOM Virtual** — Abstracció lleugera i en memòria del DOM real que React manté per calcular els canvis mínims necessaris abans de tocar el navegador. Redueix el cost de les operacions de *reflow* i *repaint*, que són cares quan es manipulen directament.

**Double buffering** — Tècnica de Fiber on React manté dos arbres: el *current tree* (el que es veu en pantalla) i el *work-in-progress tree* (on es preparen els canvis). Al final del procés, els punters s'intercanvien, evitant inconsistències visuals.

**Element vs Component** — Un *component* és la definició (la funció); un *element* és el resultat concret de cridar-la amb unes props determinades (`<ProductCard product={cafe} />`). El `ReactElement` és immutable i sense estat; viu al DOM virtual.

**Fiber (React Fiber)** — Reescriptura del reconciler de React (des de la v16) que fa el procés de renderitzat interrompible, pausable i prioritzable, en lloc del model síncron i recursiu de l'algorisme antic (Stack Reconciler).

**Hook** — Funció que comença per `use` (`useState`, `useEffect`...) que permet "connectar-se" a característiques de React (estat, cicle de vida, context) des d'un component funcional, sense necessitat d'una classe. Introduïts a React 16.8.

**Idempotència (funció pura)** — Característica d'una funció pura per la qual no modifica res que existia abans de ser cridada (cap variable externa, cap objecte rebut com a paràmetre). Sense efectes secundaris.

**JSX** — Sintaxi semblant a HTML que s'utilitza dins de JavaScript per descriure la UI de manera declarativa. És sucre sintàctic: es compila a crides de `React.createElement`. Més estricta que l'HTML (cal tancar totes les etiquetes, un sol element arrel).

**`key`** — Prop especial que s'assigna als elements d'una llista renderitzada amb `.map()`. Permet a React identificar quins elements es mantenen estables entre renders, evitant mutacions innecessàries durant la reconciliation. Ha de ser estable i única (mai l'índex de l'array si la llista es reordena).

**Lifting state up** ("elevar l'estat") — Patró pel qual es mou l'estat des de components fills cap al component pare comú més proper, perquè diversos components puguin compartir-lo i actualitzar-se de manera coordinada via *props*.

**Metaframework** — Capa addicional construïda sobre React que afegeix infraestructura que la llibreria no proporciona per si sola: routing, SSR, obtenció de dades, optimitzacions. Exemples: Next.js, React Router v7 (Framework Mode).

**Next.js** — El metaframework de React més adoptat, mantingut per Vercel. Aposta per React Server Components i una integració profunda amb la seva pròpia plataforma de desplegament. Té dos routers: App Router (modern) i Pages Router (original).

**Programació declarativa** — Paradigma on es descriu **què** s'ha de mostrar (en funció de l'estat/props actuals), deixant que el sistema (React) decideixi **com** aconseguir-ho. S'oposa a la programació imperativa, on es donen instruccions pas a pas.

**Programació imperativa** — Paradigma on es descriuen, pas a pas, les ordres exactes per arribar a un resultat (per exemple, manipular el DOM directament: `document.getElementById(...).textContent = ...`).

**Props** — Informació que un component pare passa a un component fill, com a paràmetre de la funció. Flueixen en una sola direcció (de pare a fill). Mai s'han de modificar directament dins del component que les rep.

**Puresa (funció pura)** — Propietat d'una funció (o component) per la qual, donada la mateixa entrada, sempre retorna exactament la mateixa sortida, i no produeix efectes secundaris. React assumeix que tots els components que escrius són funcions pures.

**React Router v7 (Framework Mode)** — Mode d'ús de React Router que ofereix una experiència de framework full-stack complet (routing basat en fitxers, SSR, `loader`/`action`). És l'hereu real del que abans s'anomenava Remix, després que aquest es fusionés amb React Router el 2024\.

**React Server Components (RSC)** — Components que s'executen exclusivament al servidor, mai envien el seu JavaScript al navegador, i poden accedir a bases de dades o APIs directament. Característica central de l'App Router de Next.js.

**Reconciliation** — Algorisme de React per comparar (fer un *diff*) dos arbres del DOM virtual (l'anterior i el nou) i calcular el conjunt mínim d'operacions necessàries per actualitzar el DOM real.

**Regles dels Hooks** — Dues regles obligatòries: (1) només cridar Hooks al nivell superior del component, mai dins de bucles, condicions o funcions niades; (2) només cridar Hooks des de components React o des d'altres Hooks personalitzats. Garanteixen que l'ordre de crida sigui constant entre renders.

**Strict Mode** — Mode de desenvolupament de React que crida la funció de cada component dues vegades per detectar impureses (efectes secundaris amagats al cos del render). No té efecte en producció.

**Testabilitat** — Facilitat amb què es pot escriure un test fiable per a un component. Directament relacionada amb la puresa: un component pur només necessita una entrada coneguda i una sortida esperada, sense mocks de temps, xarxa o estat global.

**useEffect** — Hook que executa codi (efectes secundaris) després del renderitzat, en un moment en què aquests ja estan permesos. Considerat l'últim recurs per gestionar lògica que no pot expressar-se de manera purament declarativa.

**useState** — Hook que permet a un component funcional "recordar" un valor (estat) entre renders i actualitzar-lo, disparant un nou cicle de render quan canvia.

