**Que és Vite i quins tipus d'aplicacions pot generar**

## **Què és Vite**

Vite (paraula francesa que significa "ràpid", es pronuncia "vit") és una eina de construcció (*build tool*) que té com a objectiu proporcionar una experiència de desenvolupament més ràpida i lleugera per a projectes web moderns. Va ser creada per Evan You, el mateix desenvolupador que va crear Vue.js, però des del principi va ser dissenyada per funcionar amb qualsevol framework.

Per entendre per què existeix Vite, cal saber quin problema resol. Les eines anteriors com Webpack havien de processar i combinar (*bundle*) tot el codi del projecte cada vegada que canviaves un fitxer, cosa que en projectes grans podia trigar molts segons. Vite elimina gran part d'aquesta espera aprofitant que els navegadors moderns ja entenen directament els mòduls JavaScript sense necessitat de transformar-los.

**Les dues parts de Vite**

Vite consta de dues parts principals: un servidor de desenvolupament que proporciona millores sobre els mòduls ES natius (incloent un HMR extremadament ràpid), i una comanda de construcció que empaqueta el codi per a producció amb actius estàtics altament optimitzats.

Durant el **desenvolupament**, Vite serveix els fitxers directament al navegador sense processar-ho tot. Quan canvies un fitxer, actualitza únicament aquell mòdul gràcies a l'HMR. El servidor arrenca en mil·lisegons, independentment de la mida del projecte.

Per a **producció**, Vite sí que processa i optimitza tot el codi: el minimitza, l'agrupa eficientment i aplica tècniques com el *tree-shaking* (eliminar el codi que no s'usa) per generar fitxers el més petits possible per als usuaris finals.

Les comandes bàsiques que trobaràs en qualsevol projecte Vite al `package.json` són:

{  
  "scripts": {  
    "dev": "vite",        // arrenca el servidor de desenvolupament  
    "build": "vite build", // genera la versió de producció  
    "preview": "vite preview" // previsualitza la versió de producció  
  }  
}

**Com crear un projecte nou**

Crear un projecte amb Vite és molt senzill. Una sola comanda llança un assistent interactiu:

npm create vite@latest nom-del-meu-projecte

L'assistent et preguntarà quin framework vols usar i si prefereixes JavaScript o TypeScript. Després:

cd nom-del-meu-projecte  
npm install  
npm run dev

I ja tens el servidor funcionant a `http://localhost:5173`.

**Quins tipus d'aplicacions pot generar**

Vite ofereix plantilles oficials per a: `vanilla`, `vanilla-ts`, `vue`, `vue-ts`, `react`, `react-ts`, `preact`, `preact-ts`, `lit`, `lit-ts`, `svelte`, `svelte-ts`, `solid`, `solid-ts`, `qwik` i `qwik-ts`.

En pràctica, els més habituals quan comences són:

**Vanilla JavaScript / TypeScript** — Per a projectes sense cap framework, o per aprendre. Codi JavaScript pur amb tot el suport de Vite però sense cap capa addicional.

**React** — La combinació més popular avui dia. Vite ha substituït Create React App com a manera estàndard d'iniciar projectes React perquè és molt més ràpid i lleuger.

**Vue** — El framework del creador de Vite. Integració perfecta i la millor experiència de desenvolupament dels dos junts.

**Svelte** — Un framework que compila el codi a JavaScript pur, sense runtime. Vite és l'eina recomanada per a projectes Svelte.

Totes les plantilles estan disponibles tant en JavaScript com en TypeScript (les que acaben en `-ts`).

**Vite vs eines anteriors**

Vite és realment ràpid perquè aprofita els mòduls ES natius i no necessita reconstruir tot el bundle quan alguna cosa canvia. Això fa que les actualitzacions de l'HMR siguin consistentment ràpides, independentment de la mida de l'aplicació.

Comparant-lo amb Webpack (l'eina que dominava abans), Vite arrenca el servidor de desenvolupament en menys d'un segon mentre que Webpack podia trigar diverses desenes de segons en projectes grans. Aquesta diferència es nota especialment quan estàs programant activament i guardes fitxers constantment.

