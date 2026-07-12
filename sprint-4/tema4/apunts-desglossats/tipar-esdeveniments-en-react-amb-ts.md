**Quins mètodes existeixen per tipar esdeveniments en React amb TypeScript?**

###### **Tipant esdeveniments amb TypeScript** [*https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms\_and\_events/*](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/)  Cheatsheet per tipar formularis i esdeveniments a React amb TypeScript.

**Per què és important tipar els esdeveniments**

TypeScript ens ajuda a detectar errors en temps de compilació. Sense tipar correctament els esdeveniments, perdem el benefici del sistema de tipus: 

no sabem quines propietats té l'event, TypeScript no pot autocompletar, i els errors apareixen en runtime en lloc de compilació.

**Mètode 1: Inferència automàtica (la més senzilla)**

Si el rendiment no és un problema (i normalment no ho és\!), els handlers inline son els més fàcils perquè pots usar la inferència de tipus i el tipat contextual.

| // ✅ TypeScript infereix el tipus automàticament\!// No cal anotar 'event' manualment → TypeScript sap que és MouseEventconst Button \= () \=\> (  \<button    onClick={(event) \=\> {      // event és correctament tipat com MouseEvent\<HTMLButtonElement\>      console.log(event.currentTarget.textContent);    }}  \>    Clic  \</button\>);// Mateix amb onChange d'un input:const Input \= () \=\> (  \<input    onChange={(event) \=\> {      // event és ChangeEvent\<HTMLInputElement\> → inferit automàticament      console.log(event.target.value);    }}  /\>); |
| :---- |

**Mètode 2: Tipar l'event explícitament (handler separat)**

Quan el handler es defineix fora del JSX, TypeScript no pot inferir el tipus automàticament. Cal anotar-lo explícitament.

| // Tipant el paràmetre de l'event: React.TipusEvent\<ElementHTML\>import React from 'react';function FormulariLogin() {  // ← tipus a la DRETA del signe \=  const handleChange \= (e: React.ChangeEvent\<HTMLInputElement\>): void \=\> {    console.log(e.target.value);  };  const handleClick \= (e: React.MouseEvent\<HTMLButtonElement\>): void \=\> {    e.preventDefault();    console.log('Clic\!');  };  const handleSubmit \= (e: React.FormEvent\<HTMLFormElement\>): void \=\> {    e.preventDefault();    // processar el formulari  };  const handleKeyDown \= (e: React.KeyboardEvent\<HTMLInputElement\>): void \=\> {    if (e.key \=== 'Enter') {      console.log('Enter premut\!');    }  };  return (    \<form onSubmit={handleSubmit}\>      \<input onChange={handleChange} onKeyDown={handleKeyDown} /\>      \<button onClick={handleClick}\>Enviar\</button\>    \</form\>  );} |
| :---- |

**Mètode 3: Tipar el Handler com a funció (EventHandler type)**

Una alternativa és aplicar el tipus al handler com a funció, usant els tipus `*EventHandler` que proporciona `@types/react`.

| // Tipant a l'ESQUERRA del signe \= usant EventHandler// → React.ChangeEventHandler\<ElementHTML\>const handleChange: React.ChangeEventHandler\<HTMLInputElement\> \= (e) \=\> {  // TypeScript ja sap que 'e' és ChangeEvent\<HTMLInputElement\>  console.log(e.target.value);};const handleClick: React.MouseEventHandler\<HTMLButtonElement\> \= (e) \=\> {  console.log(e.currentTarget.dataset.id);};const handleSubmit: React.FormEventHandler\<HTMLFormElement\> \= (e) \=\> {  e.preventDefault();}; |
| :---- |

Per què dues maneres de fer el mateix? El primer mètode usa una signatura de mètode inferida. El segon enforça un tipus del delegate proporcionat per `@types/react`. `React.ChangeEventHandler<>` és simplement un tipat "oficial" de `@types/react`.

**La llista completa de tipus d'esdeveniments**

| Tipus d'Event | Descripció | Elements típics |
| ----- | ----- | ----- |
| `MouseEvent` | Interacció amb el ratolí | `button`, `div`, `a` |
| `ChangeEvent` | Canvi de valor | `input`, `select`, `textarea` |
| `KeyboardEvent` | Interacció amb el teclat | `input`, `textarea`, `div` |
| `FocusEvent` | Focus/blur d'element | `input`, `button`, `select` |
| `FormEvent` | Events de formulari (deprecated a v19) | `form` |
| `SubmitEvent` | Enviament de formulari (nou a v19) | `form` |
| `DragEvent` | Drag and drop | qualsevol element arrossegable |
| `PointerEvent` | Ratolí, estilus, touch | qualsevol element |
| `TouchEvent` | Interacció tàctil | qualsevol element |
| `WheelEvent` | Scroll amb la roda del ratolí | `div`, `window` |
| `ClipboardEvent` | Copiar, enganxar, tallar | `input`, `textarea` |
| `AnimationEvent` | Animacions CSS | qualsevol element |
| `TransitionEvent` | Transicions CSS | qualsevol element |
| `SyntheticEvent` | Base de tots (genèric) | qualsevol |

**Els elements HTML: el segon genèric**

Cada tipus d'event accepta un segon genèric: el tipus de l'element HTML al qual va associat. Permet accedir de manera tipada a les propietats específiques de l'element (`value`, `checked`, `files`...).

| // React.ChangeEvent\<HTMLInputElement\>  → input de text// React.ChangeEvent\<HTMLSelectElement\> → select dropdown// React.ChangeEvent\<HTMLTextAreaElement\> → textarea// React.MouseEvent\<HTMLButtonElement\>  → botó// React.MouseEvent\<HTMLDivElement\>     → divfunction FormComplet() {  const handleInputChange \= (e: React.ChangeEvent\<HTMLInputElement\>) \=\> {    const valor \= e.target.value;      // string ✅    const cheked \= e.target.checked;   // boolean ✅ (per checkboxes)    const fitxers \= e.target.files;    // FileList | null ✅ (per file inputs)  };  const handleSelectChange \= (e: React.ChangeEvent\<HTMLSelectElement\>) \=\> {    const opcioSeleccionada \= e.target.value;     // string ✅    const indexSeleccionat \= e.target.selectedIndex; // number ✅  };  const handleMouseEvent \= (e: React.MouseEvent\<HTMLDivElement\>) \=\> {    const x \= e.clientX;   // number ✅    const y \= e.clientY;   // number ✅    const element \= e.currentTarget; // HTMLDivElement ✅  };  return (    \<div onMouseMove={handleMouseEvent}\>      \<input onChange={handleInputChange} /\>      \<select onChange={handleSelectChange}\>        \<option value="a"\>A\</option\>      \</select\>    \</div\>  );} |
| :---- |

**Formularis amb Uncontrolled Components: Type Assertion**

Per accedir als camps d'un formulari no controlat per React, cal usar type assertion per indicar a TypeScript l'estructura del formulari.

| // Tipant onSubmit amb camps personalitzats del formulari\<form  onSubmit={(e: React.SyntheticEvent) \=\> {    e.preventDefault();    // Type assertion per accedir als inputs pel nom    const target \= e.target as typeof e.target & {      email: { value: string };      password: { value: string };      recordar: { checked: boolean };    };    const email \= target.email.value;       // ✅ tipat com string    const password \= target.password.value; // ✅ tipat com string    const recordar \= target.recordar.checked; // ✅ tipat com boolean  }}\>  \<input type="email" name="email" /\>  \<input type="password" name="password" /\>  \<input type="checkbox" name="recordar" /\>  \<button type="submit"\>Accedir\</button\>\</form\> |
| :---- |

**Exemple complet: formulari de cerca tipat**

| import React, { useState } from 'react';interface PropsCerca {  onCercar: (terme: string) \=\> void;}function FormulariCerca({ onCercar }: PropsCerca) {  const \[terme, setTerme\] \= useState\<string\>('');  // Mètode 1: Tipus a la dreta (anotació explícita del paràmetre)  const handleChange \= (e: React.ChangeEvent\<HTMLInputElement\>): void \=\> {    setTerme(e.target.value);  };  // Mètode 2: Tipus a l'esquerra (EventHandler type)  const handleKeyDown: React.KeyboardEventHandler\<HTMLInputElement\> \= (e) \=\> {    if (e.key \=== 'Enter') {      onCercar(terme);    }  };  // Mètode 3: Inline (inferit automàticament per TypeScript)  return (    \<div\>      \<input        value={terme}        onChange={handleChange}        onKeyDown={handleKeyDown}        placeholder="Cerca..."      /\>      \<button        onClick={(e: React.MouseEvent\<HTMLButtonElement\>) \=\> {          // ← inline: TypeScript infereix el tipus del context          onCercar(terme);        }}      \>        Cercar      \</button\>    \</div\>  );} |
| :---- |

**Nota important: FormEvent deprecated a React v19**

A partir de React v19.2.10, `FormEvent` i `FormEventHandler` son deprecated i s'han de substituir per `SubmitEvent` i `SubmitEventHandler`. Els tipus antics seguiran funcionant però generaran un missatge de deprecació.

| // ❌ Deprecated a React v19+const handleSubmit \= (e: React.FormEvent\<HTMLFormElement\>) \=\> { ... }// ✅ Nou a React v19+const handleSubmit \= (e: React.SubmitEvent) \=\> { ... } |
| :---- |

**Resum: quina manera usar**

Handler INLINE (dins del JSX):  
  → TypeScript infereix automàticament → la forma més senzilla  
  → Ideal per a handlers curts i senzills

Handler EXTERN amb anotació a la dreta:  
  (e: React.ChangeEvent\<HTMLInputElement\>) \=\> void  
  → Control explícit del tipus → llegibilitat alta  
  → Ideal per a handlers llargs o reutilitzats

Handler EXTERN amb anotació a l'esquerra:  
  React.ChangeEventHandler\<HTMLInputElement\>  
  → Tipat "oficial" de @types/react → molt concís  
  → Ideal quan vols documentar explícitament el tipus del handler

Tipus genèric quan no en saps quin:  
  React.SyntheticEvent → base de tots els events  
  → Usar únicament quan no importa el tipus específic

