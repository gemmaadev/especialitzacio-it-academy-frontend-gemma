**Quins tipus de variables d'entorn suporta Vite i com es configuren?**

## **Variables d'entorn a Vite**

Vite és l'eina que s'usa per construir i servir projectes moderns de frontend (React, Vue, etc.). Quan treballes amb Vite, sovint necessites guardar valors que canvien depenent de l'entorn: la URL de l'API en desenvolupament és diferent a la de producció, per exemple. Per a això existeixen les variables d'entorn.

**El prefix `VITE_`: la regla més important**

Per evitar filtrar accidentalment variables d'entorn al client, només les variables amb el prefix `VITE_` s'exposen al codi processat per Vite. Això és fonamental: si defineixes una variable sense aquest prefix, Vite la ignorarà i no estarà disponible al teu codi del navegador.

VITE\_API\_URL=https://api.example.com   \#  accessible al codi  
DB\_PASSWORD=secret123                  \# NO accessible (sense prefix)

Té molt de sentit per seguretat: tot el codi del frontend és visible per qui inspeccionem el navegador. Per tant, Vite s'assegura que les variables sensibles (contrasenyes, claus de base de dades) no arribin mai al navegador per error.

**Els fitxers `.env`**

Vite carrega variables d'entorn dels fitxers següents, en funció de l'entorn on s'executa:

.env                  \# carregat sempre  
.env.local            \# carregat sempre, ignorat per Git  
.env.development      \# carregat només en mode desenvolupament  
.env.production       \# carregat només en mode producció

La convenció és crear aquests fitxers a l'arrel del projecte. Per exemple, un `.env` típic:

VITE\_API\_URL=https://api.example.com  
VITE\_APP\_TITLE=La meva app

Quan executes `vite` (mode desenvolupament) es carrega `.env.development`. Quan executes `vite build` (producció) es carrega `.env.production`. Això et permet tenir configuracions completament diferents per a cada entorn sense tocar el codi.

**Com accedir a les variables al codi**

Les variables d'entorn amb prefix `VITE_` s'accedeixen al codi mitjançant `import.meta.env`:

console.log(import.meta.env.VITE\_API\_URL)    // https://api.example.com  
console.log(import.meta.env.VITE\_APP\_TITLE)  // La meva app  
console.log(import.meta.env.DB\_PASSWORD)     // undefined (sense prefix, no accessible)

Vite també ofereix unes variables integrades que sempre estan disponibles sense que les hagis de definir tu:

| Variable | Valor |
| ----- | ----- |
| `import.meta.env.MODE` | `"development"` o `"production"` |
| `import.meta.env.DEV` | `true` si estem en desenvolupament |
| `import.meta.env.PROD` | `true` si estem en producció |

**Els fitxers `.local` i Git**

Els fitxers `.env.*.local` són només locals i poden contenir variables sensibles. Has d'afegir `*.local` al teu `.gitignore` per evitar que es pugin a Git.

La idea és que `.env` (amb valors genèrics o de exemple) sí que va a Git perquè l'equip sàpiga quines variables existeixen, però `.env.local` (amb les teves claus reals) no hi va mai.

\# .gitignore  
.env.local  
.env.\*.local

Les variables `VITE_*` no haurien de contenir informació sensible com claus d'API. Els valors d'aquestes variables s'inclouen al codi font en el moment de la construcció. Qualsevol que obri les eines de desenvolupador del navegador podrà veure-les. Per a secrets reals, sempre cal un servidor backend.

