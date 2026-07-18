**Quins problemes resol Context que no poden resoldre les props?**

**Documentació Oficial de React Context**  
[https://react.dev/learn/passing-data-deeply-with-context](https://react.dev/learn/passing-data-deeply-with-context)  
Guia oficial per compartir dades entre components sense passar props manualment.

## **El problema: Prop Drilling**

Normalment passes informació d'un component pare a un fill via props. 

Però passar props pot tornar-se verbós i inconvenient quan has de passar-les a través de molts components intermedis, o quan molts components de l'app necessiten la mateixa informació.

PROP DRILLING: passar dades per components que no les necessiten

| App (té: usuari, tema, idioma)  ↓ passa usuari, tema, idioma com a props  Layout (no necessita cap d'elles, però les passa)    ↓ passa usuari, tema, idioma com a props    Sidebar (únicament necessita tema)      ↓ passa usuari, idioma com a props      Nav (únicament necessita idioma)        ↓ passa usuari com a props        UserMenu (finalment usa usuari\!)→ Layout i Nav son "canonades": reben i passen props  sense usar-les → codi verbós, manteniment difícil |
| :---- |

| // ❌ PROP DRILLING: el problema en codifunction App() {  const \[usuari, setUsuari\] \= useState({ nom: 'Anna', rol: 'admin' });  const \[tema, setTema\] \= useState('clar');  return \<Layout usuari={usuari} tema={tema} onCanviarTema={setTema} /\>;}function Layout({ usuari, tema, onCanviarTema }) {  // Layout NO usa 'usuari' directament, únicament el passa avall  return (    \<div className={tema}\>      \<Sidebar tema={tema} onCanviarTema={onCanviarTema} usuari={usuari} /\>      \<Main usuari={usuari} /\>    \</div\>  );}function Sidebar({ tema, onCanviarTema, usuari }) {  // Sidebar usa 'tema', però segueix passant 'usuari' avall  return (    \<nav style={{ background: tema \=== 'clar' ? '\#fff' : '\#222' }}\>      \<button onClick={onCanviarTema}\>Canviar tema\</button\>      \<UserMenu usuari={usuari} /\>  {/\* ← segueix passant 'usuari' \*/}    \</nav\>  );}function UserMenu({ usuari }) {  // Finalment usa 'usuari', 3 nivells avall\!  return \<span\>{usuari.nom}\</span\>;} |
| :---- |

**La solució: Context "teleporta" les dades**

Context permet que un component pare faci disponible alguna informació a qualsevol component en l'arbre per sota d'ell — sense importar la profunditat — sense passar-la explícitament a través de props.

| // ✅ AMB CONTEXT: les dades "teleportan" directament al destí// PAS 1: Crear el contextimport { createContext } from 'react';interface UsuariContextType {  usuari: Usuari;  setUsuari: (u: Usuari) \=\> void;}export const UsuariContext \= createContext\<UsuariContextType | null\>(null);export const TemaContext \= createContext\<'clar' | 'fosc'\>('clar');// PAS 2: Proporcionar el contextfunction App() {  const \[usuari, setUsuari\] \= useState({ nom: 'Anna', rol: 'admin' });  const \[tema, setTema\] \= useState\<'clar' | 'fosc'\>('clar');  return (    \<UsuariContext value={{ usuari, setUsuari }}\>      \<TemaContext value={tema}\>        \<Layout /\>   {/\* ← cap prop\! \*/}      \</TemaContext\>    \</UsuariContext\>  );}// PAS 3: Consumir el context (directament al component que el necessita)function Layout() {  // Layout ja NO rep ni passa props innecessàries  return (    \<div\>      \<Sidebar /\>      \<Main /\>    \</div\>  );}function Sidebar() {  const tema \= useContext(TemaContext); // ← llegeix directament  return (    \<nav style={{ background: tema \=== 'clar' ? '\#fff' : '\#222' }}\>      \<UserMenu /\>   {/\* ← cap prop passada\! \*/}    \</nav\>  );}function UserMenu() {  const { usuari } \= useContext(UsuariContext)\!; // ← llegeix directament  return \<span\>{usuari.nom}\</span\>;} |
| :---- |

**El cas de la documentació oficial: Headings automàtics**

Un exemple elegant de la doc oficial on les props son insuficients i Context és la solució natural:

| // PROBLEMA: cada Heading necessita saber el seu nivell (h1, h2, h3...)// Si hi ha Sections aniuades, el nivell hauria d'augmentar automàticament// → Impossible saber el nivell des del Heading sense context// ❌ SENSE Context: repetitiu i propens a errors\<Section\>  \<Heading level={1}\>Títol principal\</Heading\>  \<Section\>    \<Heading level={2}\>Subtítol\</Heading\>  {/\* ← cal recordar el nivell \*/}    \<Section\>      \<Heading level={3}\>Sub-subtítol\</Heading\>  {/\* ← fàcil equivocar-se \*/}    \</Section\>  \</Section\>\</Section\>// ✅ AMB Context: el nivell s'infereix automàticamentconst LevelContext \= createContext(0);function Section({ children }: { children: React.ReactNode }) {  const level \= useContext(LevelContext);  return (    \<LevelContext value={level \+ 1}\>  {/\* ← cada Section incrementa el nivell \*/}      \<section\>{children}\</section\>    \</LevelContext\>  );}function Heading({ children }: { children: React.ReactNode }) {  const level \= useContext(LevelContext);  // ← sap el seu nivell automàticament  const Tag \= \`h${Math.min(level, 6)}\` as keyof JSX.IntrinsicElements;  return \<Tag\>{children}\</Tag\>;}// Ús net i sense errors de nivell:\<Section\>          {/\* level \= 1 \*/}  \<Heading\>Títol principal\</Heading\>     {/\* → \<h1\> \*/}  \<Section\>        {/\* level \= 2 \*/}    \<Heading\>Subtítol\</Heading\>          {/\* → \<h2\> \*/}    \<Section\>      {/\* level \= 3 \*/}      \<Heading\>Sub-subtítol\</Heading\>    {/\* → \<h3\> \*/}    \</Section\>  \</Section\>\</Section\> |
| :---- |

**Quan Context SÍ és la solució**

La documentació oficial identifica els casos d'ús ideals:

| // 1\. TEMA VISUAL (dark/light mode):\<TemaContext value={tema}\>  \<App /\>\</TemaContext\>// → Tots els components poden llegir el tema sense prop drilling// 2\. COMPTE D'USUARI ACTUAL:\<UsuariContext value={{ usuari, isAdmin }}\>  \<App /\>\</UsuariContext\>// → Qualsevol component pot mostrar/gestionar l'usuari// 3\. ROUTING (React Router l'usa internament):// → useParams(), useLocation() consumeixen context intern de React Router// 4\. GESTIÓ D'ESTAT COMBINADA AMB useReducer:const \[estat, dispatch\] \= useReducer(reducer, estatInicial);\<EstatContext value={{ estat, dispatch }}\>  \<App /\>\</EstatContext\>// → Qualsevol component pot llegir l'estat i enviar accions |
| :---- |

**Quan les props son millor que Context**

Abans d'usar Context, la documentació oficial recomana considerar alternatives. Context pot semblar atractiu, però és bastant fàcil usar-lo en excés. Passar props uns quants nivells avall no vol dir necessàriament que hagis d'usar Context. Si les dades es passen únicament un o dos nivells de profunditat, les props poden ser més clares i explícites.

| // NO cal Context per a 1-2 nivells de profunditat:// → Les props son explícites i fan el flux de dades visible// CONSIDERA Component Composition primer:// En lloc de passar 'usuari' com a prop a través de Layout// passa directament el component que usa 'usuari'// ❌ Prop drilling innecessari:\<Layout usuari={usuari} /\>  // Layout passa usuari → Component → UserMenu// ✅ Component composition (sense Context ni prop drilling\!):\<Layout\>  \<UserMenu usuari={usuari} /\>  {/\* ← UserMenu rep usuari directament del pare que el sap \*/}\</Layout\> |
| :---- |

**Props vs. Context**

| Situació | Solució |
| ----- | ----- |
| **1-2 nivells de profunditat** | Props (més explícites) |
| **Component composition possible** | `children` prop (sense Context) |
| **3+ nivells, molts components** | Context |
| **Molts components distants necessiten les mateixes dades** | Context |
| **El component intermedi no usa les dades** | Context (evita la canonada) |
| **Dades que canvien sovint i molts consumers** | Context \+ optimitzar amb `memo` o múltiples contexts |

La pregunta clau:  
  "Estan els components intermedis usant les dades  
   o simplement passant-les avall?"

  SÍ les usen → Props (flux de dades explícit)  
  NO les usen → Context (els components intermedis no haurien de saber res)

