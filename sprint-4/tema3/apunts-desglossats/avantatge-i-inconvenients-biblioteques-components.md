**Analitza les avantatges i inconvenients de l'utilització de biblioteques de components**

**Les tres filosofies del 2026**

L'elecció arquitectònica més gran quan selecciones una biblioteca de components el 2026 és **headless vs. styled**. Les biblioteques headless van créixer un 70% en adopció el 2025\.

STYLED (MUI, Ant Design, Chakra)  
  → Components ja estilitzats, llests per usar  
  → Menys control visual, menys personalització

HEADLESS (Radix UI, Base UI)  
  → Comportament i accessibilitat sense estils  
  → Tu aportes tot el disseny visual

COPY-PASTE (shadcn/ui)  
  → El codi del component entra al teu projecte  
  → Control total, sense dependència de npm

**Avantatge 1: Velocitat de desenvolupament**

La principal raó per usar una biblioteca de components. Les startups quasi sempre haurien d'usar un framework UI existent. 

Construir components personalitzats des de zero significa gestionar accessibilitat, navegació per teclat, focus management, disseny responsiu i compatibilitat cross-browser manualment, que son mesos de treball que no diferencien el teu producte.

| // Sense biblioteca: implementació manual d'un modal accessible// → gestionar focus trap, ARIA, Escape key, scroll lock...// → hores de feina i molts edge cases// Amb Radix UI Dialog: tot gestionatimport \* as Dialog from '@radix-ui/react-dialog';function ModalExemple() {  return (    \<Dialog.Root\>      \<Dialog.Trigger\>Obre el modal\</Dialog.Trigger\>      \<Dialog.Portal\>        \<Dialog.Overlay /\>        \<Dialog.Content\>          \<Dialog.Title\>Títol\</Dialog.Title\>          \<Dialog.Description\>Descripció\</Dialog.Description\>          \<Dialog.Close\>Tanca\</Dialog.Close\>        \</Dialog.Content\>      \</Dialog.Portal\>    \</Dialog.Root\>    // ← Focus trap, ARIA, Escape key, tot inclòs\!  );} |
| :---- |

**Avantatge 2: Accessibilitat "Gratis"**

Radix pren un enfocament de primitives. Proporciona comportaments de components sense estils i accessibles (diàlegs, popovers, acordions) i deixa l'estilització completament a tu.

Maneguen les parts difícils (accessibilitat, navegació per teclat, atributs ARIA, gestió del focus) i deixen l'estilització completament a tu. Cada component és completament accessible, navegable per teclat, i compatible amb lectors de pantalla.

Sense biblioteca, implementar correctament un Dropdown necessita:  
  ✗ Rols ARIA correctes (role="menu", role="menuitem")  
  ✗ Focus management (primer item en obrir)  
  ✗ Navegació per teclat (↑↓ per navegar, Escape per tancar)  
  ✗ Screen reader announcements  
  ✗ Gestió de portal (renderitzar fora del DOM actual)

Amb Radix DropdownMenu:  
  ✅ Tot inclòs, implementat correctament  
  ✅ Tesejat amb usuaris reals de lectors de pantalla  
  ✅ Segueix WAI-ARIA Authoring Practices

**Avantatge 3: Consistència Visual i de Disseny**

Un sistema de disseny consistent és un dels principals beneficis. Una biblioteca o sistema de disseny enforça patrons UI consistents a tota l'aplicació. 

Seleccionar una biblioteca és un equilibri entre com d'opinada és, quanta propietat del disseny vols, i com d'importants son els bundles petits i el control complet.

**Inconvenient 1: Bundle Size i Rendiment**

Les biblioteques de components grans com Material UI i Ant Design incrementen la mida del teu bundle JavaScript, cosa que pot impactar negativament les mètriques de Core Web Vitals com el Largest Contentful Paint i el Total Blocking Time.

| Mida aproximada de les biblioteques (gzipat):  Headless UI (Tailwind):  \~10 KB  ← mínima  Radix UI (per component): 2-5 KB ← excel·lent  shadcn/ui:               35-50 KB (dashboard típic)  Chakra UI:               \~30 KB  ← moderada  MUI:                     \~90-150 KB ← significativa  Ant Design:              \~80\+ KB ← granEstratègia: tree-shaking  // ✅ Import selectiu (tree-shakeable):  import Button from '@mui/material/Button';  // ❌ Import complet (tot el bundle):  import { Button } from '@mui/material'; |
| :---- |

**Inconvenient 2: Vendor Lock-in i customització limitada**

El problema clàssic de les biblioteques de components amb estils propis:

Escenari: el teu dissenyador vol un component que difereixi  
          del Material Design d'MUI

Amb MUI:  
  → Has de "lluitar" contra els estils per defecte  
  → Override via sx prop, theme overrides, o styled()  
  → Com més personalitzat, menys te n'aprofites de la biblioteca  
  → Migrar a una altra biblioteca \= tocar TOTS els components

Amb shadcn/ui:  
  → El codi del component és TEU (no en node\_modules)  
  → Modifica el que vulguis directament  
  → Zero dependència de versions de la biblioteca

A diferència de les biblioteques UI convencionals que instal·les com a paquets npm, shadcn/ui opera sobre un principi radicalment diferent: la propietat del codi. 

En lloc d'importar components pre-compilats des de node\_modules, copies el codi font real del component directament al teu projecte.

**Inconvenient 3: Incompatibilitat amb React Server Components**

Biblioteques CSS-in-JS que usen React context son fonamentalment incompatibles amb React Server Components (RSC). Si estàs usant Next.js App Router, el runtime CSS-in-JS es fa problemàtic.

Next.js App Router \+ RSC (2024-2026):

| ✅ Compatible:  shadcn/ui    → usa Tailwind (compile-time, cap context)  CSS Modules  → compile-time, cap context  Radix UI     → primitives, client components quan cal❌ Problemàtic:  styled-components → Context API → no funciona en Server Components  Emotion          → Context API → problemes similars  MUI (CSS-in\-JS)  → requereix 'use client' a cada component |
| :---- |

La tendència 2026: les biblioteques migren cap a  
soluciuons compile-time per a compatibilitat RSC

**Inconvenient 4: Design "genèric" i reconeixible**

Com que tants projectes, aplicacions React i plataformes d'IA usen l'estilització per defecte de shadcn/ui, els projectes poden acabar semblant genèrics a menys que inverteixis temps en personalitzar el disseny.

El "shadcn effect" de 2025-2026:  
  → Milers de projectes usen la mateixa aparença per defecte  
  → Fàcilment reconeixible per qualsevol developer  
  → Perd diferenciació de marca

Estratègia per evitar-ho:  
  → Personalitzar les variables CSS de shadcn/ui  
  → Crear un tema propi al tailwind.config.js  
  → Combinar amb il·lustracions i animacions pròpies

**Les biblioteques principals el 2026: comparativa**

Shadcn UI és l'opció principal per a la majoria de nous projectes React el 2026: Tailwind-native, components copy-paste, zero overhead en runtime. 

Radix UI és la millor biblioteca de components headless per a dissenys personalitzats amb accessibilitat AAA. MUI segueix sent l'opció més segura per a apps empresarials que necessiten 100+ components preconstruïts.

| Biblioteca | Filosofia | Mida | Accessibilitat | RSC | Per a |
| ----- | ----- | ----- | ----- | ----- | ----- |
| **shadcn/ui** | Copy-paste \+ Tailwind | \~35-50KB | ✅ (via Radix) | ✅ | La majoria de projectes nous |
| **Radix UI** | Headless primitives | \~2-5KB/comp | ✅ AAA | ✅ | Design systems propis |
| **MUI** | Styled completa | \~90-150KB | ✅ AA | ⚠️ | Enterprise, dashboards |
| **Chakra UI v3** | Utility props | \~30KB | ✅ | ⚠️ | Startups, velocitat |
| **Ant Design** | Styled completa | \~80KB+ | ✅ | ⚠️ | Apps de gestió asiàtiques |
| **Headless UI** | Headless \+ Tailwind | \~10KB | ✅ | ✅ | Equips Tailwind |

**Quan usar i quan evitar les biblioteques**

✅ USAR BIBLIOTECA DE COMPONENTS quan:  
  → MVP o startup que necessita velocitat  
  → Equip petit sense resources per a disseny propi  
  → Accessibilitat és critical i no vols implementar-la manualment  
  → Components complexos (Data Grid, Date Picker, Rich Text Editor)  
  → Admin dashboards i aplicacions internes

❌ EVITAR o MINIMITZAR quan:  
  → La identitat de marca és molt específica i diferent  
  → El rendiment és crític (bundle size importa molt)  
  → Ús extensiu de React Server Components  
  → Vols control total sobre cada píxel  
  → La biblioteca té massa "opinionation" per al teu cas d'ús

🔀 PATRÓ HÍBRID (el més comú en producció 2026):  
  shadcn/ui per a components base (button, input, card...)  
  \+ Tremor per a charts i dashboards  
  \+ MUI Data Grid per a taules complexes  
  \+ Components propis per a les parts úniques del producte

