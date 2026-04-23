**Protocols per a treball en equip: pull requests, code reviews, forking workflow**

## **Per què calen protocols?**

Quan treballes sola, pots fer el que vulguis al repositori. Però quan hi ha un equip de persones treballant al mateix codi, necessites unes regles que assegurin que ningú trenqui el codi dels altres, que tots els canvis es revisin abans d'acceptar-se i que hi hagi una manera ordenada de contribuir. Aquí és on entren les Pull Requests, les Code Reviews i el Forking Workflow.

**Pull Requests**

Una Pull Request (PR) és una proposta formal de canvis. En lloc de fusionar el teu codi directament a la branca principal, obres una PR que diu "he fet aquests canvis a la meva branca, algú els pot revisar i acceptar?".

El procés és sempre el mateix. Crees una branca nova per la teva feina, fas els canvis i els puges a GitHub, obres una Pull Request des de la web de GitHub descrivint què has fet i per què, i esperes que un company la revisi. Si tot està bé, s'accepta i el codi es fusiona. Si hi ha coses a millorar, es demanen canvis i ho tornes a pujar.

Les PRs tenen diversos avantatges clars. Cap codi arriba a la branca principal sense haver passat per almenys una revisió. Queden registrades a GitHub amb tots els comentaris i decisions, de manera que en el futur es pot veure per què es va fer cada canvi. I permeten que l'equip tingui visibilitat del que tothom està fent.

**Code Reviews**

Una Code Review és la revisió que fa un company de la teva Pull Request abans d'acceptar-la. No és una crítica personal: és un mecanisme de qualitat que beneficia tot l'equip.

La persona que revisa mira diverses coses. Comprova que el codi fa el que diu que fa. Busca possibles errors o casos que no s'han tingut en compte. Verifica que segueix els estàndards i l'estil del projecte. I proposa millores si n'hi ha.

A GitHub, la revisió es fa directament a la Pull Request. El revisor pot deixar comentaris generals o comentaris en línies concretes del codi. El resultat pot ser tres coses: aprovació directa, aprovació amb comentaris menors que no bloquegen, o sol·licitud de canvis que s'han de fer abans de fusionar.

Com a autora de la PR, el teu rol és respondre els comentaris, fer els canvis demanats i explicar les teves decisions si hi ha discrepàncies. Les discussions a les code reviews han de ser tècniques i respectuoses.

**Forking Workflow**

El Forking Workflow és el protocol que s'usa quan vols contribuir a un repositori que no és teu, com un projecte de codi obert. No tens permisos per escriure directament al repositori original, de manera que el procés és lleugerament diferent.

Primer fas un **fork**: una còpia completa del repositori original que queda al teu compte de GitHub. Treballes a la teva còpia amb total llibertat perquè és teva. Fas els canvis, els commits i els puges al teu fork. Quan estàs llesta, obres una Pull Request des del teu fork cap al repositori original. Els mantenidors del projecte original reben la teva proposta, la revisen i decideixen si l'accepten o no.

La diferència clau amb el flux normal és que en el Forking Workflow treballes en un repositori separat del principal, mentre que en el flux d'equip treballes en branques del mateix repositori.

**Com s'encaixa tot**

Els tres mecanismes funcionen junts de manera complementària. El Forking Workflow defineix com es contribueix al repositori. 

Les Pull Requests defineixen com es proposen i documenten els canvis. 

Les Code Reviews defineixen com es validen aquests canvis abans d'acceptar-los. 

Junts formen un sistema que garanteix que cap codi arriba a producció sense haver estat revisat i aprovat, cosa que redueix errors, millora la qualitat i distribueix el coneixement del projecte entre tot l'equip.

