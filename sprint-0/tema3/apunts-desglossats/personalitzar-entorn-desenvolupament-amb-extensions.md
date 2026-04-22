**Com es personalitza l'entorn de desenvolupament amb extensions com ESLint, Prettier o GitLens?**

## **Personalitzar VS Code amb extensions**

VS Code per si sol ja és un editor molt potent, però les extensions el transformen en un entorn professional complet. Instal·lar-les és senzill: obres el panell d'extensions (`Ctrl+Shift+X`), busques el nom i cliques "Install". Les tres extensions que veuràs en pràcticament tots els projectes professionals de JavaScript i TypeScript són ESLint, Prettier i GitLens.

**ESLint: procura la qualitat del codi**

ESLint analitza el teu codi mentre escrius i t'avisa quan fas alguna cosa que podria ser un error o una mala pràctica, **sense executar el codi**. Pensa-hi com un corrector ortogràfic però per a JavaScript: et subratlla els problemes directament a l'editor.

Per exemple, ESLint t'avisarà si has declarat una variable que no uses mai, si has oblidat gestionar un error, o si uses `==` en lloc de `===`. ESLint detecta problemes reals de JavaScript directament a l'editor.

Per configurar-lo al projecte necessites instal·lar el paquet i crear un fitxer de configuració:

npm install \--save-dev eslint

El fitxer `.eslintrc.json` a l'arrel del projecte defineix les regles:

{  
  "extends": \["eslint:recommended"\],  
  "rules": {  
    "no-unused-vars": "error",  
    "no-console": "warn"  
  }  
}

`"error"` atura el procés de construcció si es troba el problema. `"warn"` simplement avisa sense bloquejar.

**Prettier: format automàtic i consistent**

Prettier s'encarrega del format del codi, mentre que ESLint s'encarrega de l'estil i la qualitat. Prettier fa tot automàticament per tu. Quan guardes un fitxer, Prettier l'arregla sol: indentació, cometes, comes finals, longitud de línia... tot consistent i sense que hagis de pensar-hi.

La seva configuració va al fitxer `.prettierrc` a l'arrel:

{  
  "singleQuote": true,  
  "semi": true,  
  "printWidth": 80,  
  "trailingComma": "es5"  
}

Per activar el format automàtic en guardar, afegeixes això a la configuració de VS Code (`.vscode/settings.json`):

{  
  "editor.formatOnSave": true,  
  "editor.defaultFormatter": "esbenp.prettier-vscode"  
}

A partir d'aquí, cada vegada que guardes amb `Ctrl+S`, Prettier formata el fitxer automàticament.

**ESLint i Prettier junts.** Tots dos poden entrar en conflicte perquè ESLint també té algunes regles de format. La solució és instal·lar un paquet que els fa compatibles:

npm install \--save-dev eslint-config-prettier

Mentre Prettier s'encarrega del format del codi, ESLint s'encarrega de l'estil. No cal preocupar-se pels conflictes si s'usa `eslint-config-prettier`, que desactiva les regles d'ESLint que podrien interferir amb Prettier.

**GitLens: entendre el codi i la seva història**

GitLens simplement t'ajuda a entendre millor el codi. Pots veure ràpidament qui, per què i quan va canviar una línia o un bloc de codi, i tornar enrere a la història per entendre com i per què ha evolucionat el codi.

La seva funcionalitat més visible és el **Git Blame en línia**: GitLens afegeix anotacions petites al final de cada línia de codi, mostrant qui va modificar aquella línia per última vegada, quan, i en quin commit. Aquesta funcionalitat dona context instantani sobre la història del codi sense sortir de l'editor.

Quan treballes en un equip o en un projecte que no has creat tu, GitLens és molt valuós perquè et permet entendre decisions del passat: per exemple, veure que una línia estranya va ser afegida en un commit amb el missatge "fix crítico de producción" t'explica per què és com és.

Altres funcionalitats útils de GitLens:

* **File History**: veure tots els canvis que ha tingut un fitxer al llarg del temps  
* **Status bar blame**: al peu de l'editor, mostra qui va tocar la línia on tens el cursor  
* **Commit Graph**: una visualització gràfica de totes les branques i commits del repositori

GitLens és gratuït i no requereix cap configuració inicial: simplement l'instal·les i comença a funcionar.

**El fitxer `.vscode/settings.json`**

Una bona pràctica és incloure al projecte una carpeta `.vscode` amb un fitxer `settings.json` que configuri VS Code per a tothom que treballi en el projecte. Així tots els membres de l'equip tenen el mateix entorn:

{  
  "editor.formatOnSave": true,  
  "editor.defaultFormatter": "esbenp.prettier-vscode",  
  "editor.codeActionsOnSave": {  
    "source.fixAll.eslint": "explicit"  
  }  
}

I amb `extensions.json` pots recomanar les extensions a qui cloni el projecte:

{  
  "recommendations": \[  
    "esbenp.prettier-vscode",  
    "dbaeumer.vscode-eslint",  
    "eamodio.gitlens"  
  \]  
}

Quan algú obri el projecte, VS Code li suggerirà instal·lar aquestes extensions automàticament.

