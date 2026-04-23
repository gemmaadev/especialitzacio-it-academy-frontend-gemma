**Estratègies de ramificació ( branching strategies): main/dev/feature branches, tags per versions**

## **Per què cal una estratègia de branques?**

Quan treballes sola és fàcil: fas canvis, commits i puja. Però quan hi ha un equip de diverses persones treballant alhora al mateix projecte, necessites unes regles clares: qui pot tocar quina branca, com s'incorporen els canvis i quan es considera que una versió és estable. 

Una estratègia de branques defineix com els desenvolupadors creen, gestionen i fusionen branques per assegurar una col·laboració fluida i un desenvolupament organitzat del codi.

**La branca `main`**

`main` (abans anomenada `master`) és la branca principal del repositori. Conté el codi que **funciona i és estable**. La regla fonamental és: **mai es fa commit directament a `main`**. Tot el que arriba a `main` ha passat per una revisió, s'ha provat i ha estat aprovat.

La branca `main` guarda l'historial oficial de llançaments del projecte. Pensa-hi com el codi que veurien els usuaris finals: ha de funcionar sempre.

**La branca `develop`: on es construeix tot**

La branca `develop` serveix com a branca d'integració per a les funcionalitats. Conté l'historial complet del projecte, mentre que `main` conté només una versió condensada dels llançaments estables.

Les branques de funcionalitats (`feature`) neixen de `develop` i tornen a `develop` un cop acabades. Quan `develop` té prou funcionalitats estables i ben provades, es fa una versió i es fusiona a `main`.

main 	← develop 	← feature/login  
                 		← feature/checkout  
                		 ← feature/perfil-usuari

**Les branques `feature`: una per cada cosa**

La idea central del flux de treball amb feature branches és que tot el desenvolupament de funcionalitats s'ha de fer en una branca dedicada, mai directament a la branca principal. Aquesta encapsulació fa fàcil que múltiples desenvolupadors treballin en funcionalitats concretes sense molestar el codi principal.

Les feature branches han de tenir noms descriptius. Les convencions habituals:

feature/login-usuari  
feature/formulari-contacte  
fix/error-boto-enviament  
hotfix/error-critic-pagament

El flux és sempre el mateix:

**git checkout develop** per anar a develop  
**git checkout \-b feature/nova-func** per crear la teva branca  
\[treballes, fas commits\]  
**git push origin feature/nova-func** per pujar la branca  
\[obres una Pull Request a GitHub\]  
\[es revisa i s'aprova\]  
\[es fusiona a develop\]  
**git branch \-d feature/nova-func** per esborrar la branca local

**Gitflow: l'estratègia clàssica**

Gitflow és un model de branques alternatiu que implica l'ús de feature branches i múltiples branques principals. Comparada amb el desenvolupament basat en un tronc únic, Gitflow té branques més nombroses i de vida més llarga.

L'estructura completa de Gitflow és:

| Branca | Per a què serveix |
| ----- | ----- |
| `main` | Codi en producció, sempre estable |
| `develop` | Integració de totes les funcionalitats |
| `feature/xxx` | Nova funcionalitat concreta |
| `release/x.x` | Preparació d'una versió per a producció |
| `hotfix/xxx` | Correcció urgent d'un error en producció |

Les branques `hotfix` són especials: les branques hotfix s'usen per parxar ràpidament llançaments de producció. Són l'única branca que ha de néixer directament de `main`. Quan la correcció és completa, s'ha de fusionar tant a `main` com a `develop`.

**GitHub Flow: l'estratègia senzilla**

Per a projectes petits o equips que comencen, Gitflow pot ser excessivament complex. GitHub Flow és l'estratègia de branques més simple. Gràcies a la seva simplicitat, permet el lliurament continu i la integració contínua. Funciona molt bé per a equips petits i aplicacions web.

Amb GitHub Flow, l'estructura és molt més senzilla:

main 	← feature/login  
     	← feature/checkout  
     	← fix/error-boto

No hi ha branca `develop`. Les feature branches neixen de `main` i tornen a `main` directament un cop revisades.  .

**Tags: marcar versions importants**

Un **tag** és una etiqueta que poses en un commit concret per marcar que aquella és una versió important del projecte. Com un post-it que diu "aquí va ser la versió 1.0".

És convenient etiquetar tots els commits de la branca `main` amb un número de versió. La convenció estàndard s'anomena **Semantic Versioning** i segueix el format `MAJOR.MINOR.PATCH`:

* `1.0.0` → primera versió estable  
* `1.1.0` → nova funcionalitat afegida  
* `1.1.1` → correcció d'un error petit  
* `2.0.0` → canvi gran que trenca compatibilitat

**git tag v1.0.0** crea un tag al commit actual  
**git tag v1.0.0 abc1234** crea un tag en un commit concret  
**git push origin v1.0.0** puja el tag a GitHub  
**git push origin \--tags** puja tots els tags a GitHub  
**git tag** llista tots els tags

**Resum del flux complet**  
1\. Crees una feature branch des de develop (o main si uses GitHub Flow)  
2\. Treballes i fas commits a la teva branca  
3\. Puges la branca a GitHub  
4\. Obres una Pull Request per fusionar-la  
5\. Un company revisa el codi  
6\. S'aprova i es fusiona a develop/main  
7\. Quan develop és estable, es fusiona a main i s'etiqueta amb un tag (v1.2.0)  
8\. S'esborra la feature branch  
