## **Bones Pràctiques de Treball en Projectes**

###### **Bones pràctiques**

[https://github.com/it-academy-front-end/sprints-refactoring/blob/main/instruccions\_alumnes/bones\_practiques.md](https://github.com/it-academy-front-end/sprints-refactoring/blob/main/instruccions_alumnes/bones_practiques.md)  
Recomanacions i bones pràctiques de treball a projectes.

**Organització del codi i estructura del projecte**

Mantén sempre una estructura de carpetes clara i consistent des del primer dia. En un projecte frontend típic: una carpeta `src` per al codi font, `components` per als components reutilitzables, `assets` per a imatges i fonts, i `styles` per als estils. Un projecte ben organitzat és llegible per qualsevol membre de l'equip sense necessitat d'explicacions.

Evita fitxers molt llargs: si un fitxer supera les 200-300 línies, és un senyal que cal dividir-lo en peces més petites i reutilitzables. Cada fitxer hauria de tenir una sola responsabilitat.

**Noms descriptius: el codi es llegeix més que s'escriu**

Els noms de variables, funcions i fitxers han de ser descriptius i explicar clarament el que contenen o el que fan. `getUserData()` és millor que `getData()`. `isLoggedIn` és millor que `flag`. `calculateTotalPrice()` és millor que `calc()`.

Evita les abreviatures crítiques que no tothom entén. `btn` per `button` és acceptable perquè és universal. `usrDtFtchFn` no ho és. El codi ha d'explicar-se sol, sense necessitat de comentaris que diuen el mateix que el codi.

**Commits: petits, freqüents i descriptius**

Fes commits petits i freqüents, no un gran commit al final del dia amb tot el que has fet. Cada commit ha de representar un canvi coherent i complet. Un commit amb el missatge "afegeix validació del formulari de login" és bo. Un commit amb "canvis" o "arregla coses" és inútil per a tothom.

Segueix la convenció de missatges de commit: usa el prefix `feat:` per a noves funcionalitats, `fix:` per a correccions d'errors, `docs:` per a documentació, `style:` per a canvis de format i `refactor:` per a refactoritzacions.

feat: add login form validation  
fix: correct email format check  
docs: update README with setup instructions

**Branques: una per cada cosa**

Segueix l'estratègia de branques de l'equip. Mai treballis directament a `main`. Crea una branca nova per a cada funcionalitat o correcció, amb un nom descriptiu: `feature/login-form`, `fix/cart-total-calculation`, `docs/update-readme`.

Elimina les branques un cop fusionades. Un repositori ple de branques mortes és difícil de gestionar i confon l'equip.

**Pull Requests: documentades i revisades**

Quan obris una Pull Request, escriu una descripció clara del que has fet, per quèho has fet i com provar-ho. Adjunta captures de pantalla si hi ha canvis visuals. Una PR ben documentada facilita la revisió i redueix les preguntes del revisor.

No enviïs PRs gegants amb centenars de canvis. PRs petites i enfocades s'accepten més ràpidament, es revisen millor i introdueixen menys risc.

**Code Reviews: actitud constructiva**

Quan revisis el codi d'un company, comenta el codi, no la persona. "Potser podríem usar un Map aquí per millorar el rendiment" és constructiu. "Això és ineficient" sense explicació no ho és.

Com a autor de la PR, no prenguis els comentaris de manera personal. Una code review és un procés col·laboratiu per millorar la qualitat del producte, no una avaluació del teu valor com a developer.

**Testing: prova el que programes**

Escriu tests per al codi que fas. Com a mínim, prova els casos principals (camí feliç) i els casos d'error més probables. No cal assolir el 100% de cobertura des del primer dia, però sí tenir una base de tests que doni confiança per modificar el codi sense por de trencar res.

Si trobes un bug, escriu primer un test que el reprodueixi i després corregeix el bug. Així garanteixes que el bug no tornarà.

**Comunicació i documentació**

Si t'encalles en un problema, comunica-ho aviat. No esperis hores intentant resoldre-ho sol si pots demanar ajuda. Una bona regla pràctica: si portes més de 30 minuts encallada en quelcom, demana ajuda.

Documenta les decisions importants. Si l'equip decideix usar una arquitectura concreta o una convenció específica, escriu-la al README o a la wiki del projecte. Les decisions no documentades es perden amb el temps.

**Eines i entorn: consistència en tot l'equip**

Usa les mateixes versions de les eines que l'equip. Documenta la versió de Node.js, les extensions recomanades de VS Code i qualsevol configuració específica al README del projecte.

Configura ESLint i Prettier al projecte i assegura't que tot l'equip els usa. Un codi consistent és molt més fàcil de llegir i mantenir que un codi on cada developer té el seu propi estil.

Afegeix sempre `node_modules/`, `.env.local` i qualsevol fitxer generat automàticament al `.gitignore`. Mai pugis dependències ni secrets al repositori.

**Resum:** 

| Pràctica | Per quèimporta |
| ----- | ----- |
| Commits petits i descriptius | L'historial explica el projecte |
| Una branca per cada canvi | Evita conflictes i facilita les revisions |
| PRs petites i documentades | Es revisen millor i s'accepten més ràpid |
| Noms descriptius al codi | El codi es llegeix més que s'escriu |
| Tests per al codi crític | Confiança per modificar sense trencar |
| Comunicar els bloquejos aviat | El temps de l'equip és valuós |
| ESLint \+ Prettier al projecte | Codi consistent per a tothom |
| `.gitignore` ben configurat | Mai secrets ni binaris al repo |

