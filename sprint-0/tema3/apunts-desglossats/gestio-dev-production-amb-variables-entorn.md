**Com es gestionen els diferents entorns (desenvolupament, producció) mitjançant variables d'entorn?**

## **Gestionar entorns amb variables d'entorn**

Quan desenvolupes una aplicació web, no és el mateix executar-la a l'ordinador mentre programes que tenir-la desplegada al servidor real. La URL de l'API serà diferent, pot ser que vulguis activar logs detallats només en desenvolupament, o que la clau d'analytics no hagi de funcionar en local. Les variables d'entorn resolen exactament aquest problema: permeten que el mateix codi es comporti diferent depenent d'on s'executa, sense haver de modificar res manualment.

**Els modes de Vite: desenvolupament i producció**

Per defecte, el servidor de desenvolupament (la comanda `dev`) s'executa en mode desenvolupament, i la comanda de construcció (`build`) s'executa en mode producció. Vite sap en quin mode es troba i carrega automàticament els fitxers `.env` corresponents.

npm run dev    \# mode: development → carrega .env.development  
npm run build  \# mode: production  → carrega .env.production

No has de fer res especial per canviar d'un entorn a l'altre. Simplement la comanda que executes determina quin mode s'activa.

**L'estructura de fitxers `.env`**

Una configuració típica de fitxers `.env` en un projecte Vite és la següent: `.env` per a variables compartides entre tots els entorns, `.env.development` per a variables específiques de desenvolupament, i `.env.production` per a variables específiques de producció.

A la pràctica, un projecte típic quedaria així:

.env                  \# variables comunes (tots els entorns)  
.env.development      \# variables per a quan programes en local  
.env.production       \# variables per al servidor real  
.env.local            \# les teves variables personals (no va a Git)

Un exemple concret de com quedarien els fitxers:

\# .env (comú a tots)  
VITE\_APP\_NAME=La meva App

\# .env.development (en local)  
VITE\_API\_URL=http://localhost:3000/api

\# .env.production (servidor real)  
VITE\_API\_URL=https://api.exemple.com

I al codi JavaScript, sempre accedeixes igual independentment de l'entorn:

const apiUrl \= import.meta.env.VITE\_API\_URL  
// En dev retorna: http://localhost:3000/api  
// En prod retorna: https://api.exemple.com

Un fitxer `.env` específic d'un mode (com `.env.production`) té prioritat sobre el genèric (`.env`). Vite sempre carrega `.env` i `.env.local` a més del fitxer específic del mode actual.

**Variables integrades: saber en quin entorn ets**

Vite proporciona unes variables automàtiques que sempre estan disponibles sense que les hagis de definir:

import.meta.env.MODE  // "development" o "production"  
import.meta.env.DEV   // true si estem en desenvolupament  
import.meta.env.PROD  // true si estem en producció

Això és útil per activar funcionalitats només en un entorn concret:

if (import.meta.env.DEV) {  
  console.log('Estem en desenvolupament, mostrem logs')  
}

if (import.meta.env.PROD) {  
  // activar analytics, per exemple  
}

**Variables en producció: com s'injecten**

En un entorn de producció, normalment les variables d'entorn es defineixen directament al servidor o plataforma d'allotjament. La majoria de plataformes modernes de desplegament ofereixen maneres de definir variables d'entorn a través de les seves interfícies de configuració.

Plataformes com Vercel, Netlify o Railway et permeten afegir les variables d'entorn des del seu panell de control web, sense necessitat de pujar el fitxer `.env` a Git (cosa que mai hauries de fer si conté dades sensibles).

**Bones pràctiques i errors comuns**

El primer i més important: les variables `VITE_*` no haurien de contenir informació sensible com claus d'API. Els valors d'aquestes variables s'inclouen al codi font en el moment de la construcció. Qualsevol persona que inspeccioni el JavaScript de la teva web en producció podrà veure-les. Les claus secretes han d'estar sempre al backend, mai al frontend.

El segon punt clau és el `.gitignore`. Els fitxers `.local` contenen les teves configuracions personals i mai han d'anar a Git:

\# .gitignore  
.env.local  
.env.\*.local

El fitxer `.env` genèric sí que pot anar a Git si només conté valors no sensibles (com el nom de l'app o una URL pública). Una bona pràctica és crear també un `.env.example` amb les claus buides com a documentació per a l'equip:

\# .env.example (va a Git, serveix de plantilla)  
VITE\_API\_URL=  
VITE\_APP\_NAME=

Finalment, recorda que qualsevol canvi als fitxers `.env` requereix reiniciar el servidor de Vite. Assegura't de reiniciar amb `npm run dev` perquè els canvis tinguin efecte.

