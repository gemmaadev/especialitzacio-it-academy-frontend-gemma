## **Formularis accessibles amb `<fieldset>`, `<section>` i ARIA**

**El problema: per què un formulari pot ser inaccessible**

Un formulari complex pot tenir molts grups de camps relacionats: dades personals, adreça de facturació, mètode de pagament... Visualment es distingeixen per posició i estil, però un lector de pantalla no veu el disseny. Necessita trobar en el codi quins camps pertanyen a quin grup i quin és el propòsit de cadascun.

La regla fonamental d'accessibilitat en formularis és: el agrupament s'ha de fer tant visualment com en el codi, per exemple usant els elements `<fieldset>` i `<legend>` per associar controls de formulari relacionats.

**Les eines disponibles i quan usar cada una**

**`<fieldset>` i `<legend>`** — l'element `<fieldset>` proporciona un contenidor per a controls de formulari relacionats, i l'element `<legend>` actua com a capçalera per identificar el grup. Són la solució nativa de HTML i la més compatible amb tots els lectors de pantalla. Usa `<fieldset>` i `<legend>` per a grups relacionats de controls com botons de ràdio o grups de checkboxes. La `<legend>` proporciona l'etiqueta accessible del grup. No substitueixis aquest patró amb `<div>` i `aria-label` perquè `<fieldset>` i `<legend>` tenen suport universal en lectors de pantalla.

**`aria-labelledby`** — usa `aria-labelledby` quan ja existeix text visible a la pàgina que podria servir com a nom accessible. Patrons comuns inclouen etiquetar seccions amb els seus encapçalaments o etiquetar grups de formulari amb text de llegenda visible. `aria-labelledby` té prioritat sobre `aria-label` i sobre els mecanismes d'etiquetatge nadius.

**`aria-label`** — usa `aria-label` quan no existeix cap nom visible per a l'element que puguis referenciar. Si hi ha text de label visible al DOM i és possible referenciar-lo per a una experiència d'usuari acceptable, prefereix usar `aria-labelledby`.

**`aria-describedby`** — per afegir informació addicional o instruccions a un camp, que el lector de pantalla llegirà després del nom del camp.

**`aria-required`** — indica a les tecnologies d'assistència que un camp és obligatori.

**`role="group"`** — alternativa a `<fieldset>` quan necessites agrupar elements però sense el marcatge visual d'un fieldset. WAI-ARIA proporciona un rol de grup que funciona de manera similar a `fieldset` i `legend`. L'element té `role="group"` per indicar que els elements continguts són membres d'un grup, i l'atribut `aria-labelledby` referencia l'`id` del text que servirà com a etiqueta del grup.

**Regla sobre `aria-labelledby` vs. `aria-label`**

Quan el text de l'etiqueta és visible a la pantalla, hauries d'usar `aria-labelledby` en lloc de `aria-label`. Si un element té tant `aria-labelledby` com `aria-label`, el valor d'`aria-labelledby` s'usarà en el càlcul del text alternatiu.

**L'exemple complet: formulari de checkout**

Un formulari de compra té tres seccions: dades personals, adreça d'enviament i mètode de pagament.

**Justificació de cada element i atribut**

**`<form aria-labelledby="checkout-title">`** — cada element `<form>` que ha de ser exposat com a landmark ha de rebre un nom accessible. Aquest nom permetrà a l'usuari de tecnologia d'assistència entendre ràpidament el propòsit del formulari. Connectem el formulari amb el `<h1>` visible perquè el nom sigui consistent entre usuaris visuals i d'assistència.

**`<section aria-labelledby="...">`** — les seccions separen les àrees temàtiques del formulari. `aria-labelledby` connecta cada secció amb el seu `<h2>` visible, creant landmarks que l'usuari pot navegar ràpidament.

**`<fieldset>` \+ `<legend>`** — obligatoris per a grups de radio buttons i checkboxes. Els grups de botons de ràdio sempre s'han de agrupar usant `<fieldset>`. La llegenda proporciona context que el lector de pantalla llegeix amb cada opció.

**`role="group" + aria-labelledby`** — per al subgrup de dades de targeta, que no és un grup de radio/checkbox sinó de camps de text. `<fieldset>` seria semànticament incorrecte aquí.

**`aria-required="true"`** — informa el lector de pantalla que el camp és obligatori. Es combina amb el `*` visual però aquest s'amaga amb `aria-hidden="true"` per evitar que el lector llegeixi "asterisc".

**`aria-describedby`** — afegeix informació complementària: pistes de format, missatges d'error. Es pot referenciar múltiples IDs separats per espai.

**`role="alert" + aria-live="polite"`** — per als missatges d'error dinàmics. Quan el contingut canvia, el lector de pantalla l'anuncia automàticament sense que l'usuari hagi de navegar fins allà.

**Regles d'or del formulari accessible**

| Regla | Per què importa |
| ----- | ----- |
| Sempre `<label>` associat a cada `<input>` | El lector llegeix el nom del camp en entrar-hi |
| `<fieldset>` \+ `<legend>` per a radio i checkboxes | El grup es llegeix amb cada opció |
| `aria-labelledby` apunta a text visible | Coherència entre usuaris visuals i assistits |
| `aria-required` per a camps obligatoris | Indica l'obligatorietat sense dependre del color |
| `aria-describedby` per a pistes i errors | Informació addicional sense sobrecarregar el label |
| `role="alert"` per a errors dinàmics | S'anuncia automàticament quan apareix |
| Mai `aria-label` si ja hi ha text visible | Usa `aria-labelledby` per evitar duplicitats |

