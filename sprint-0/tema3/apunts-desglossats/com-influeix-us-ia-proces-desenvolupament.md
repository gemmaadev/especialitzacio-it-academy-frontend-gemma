**Com influeix l'ús d'IA (ex: Copilot) en el procés de desenvolupament de software actual?**

###### ***Best practices with GitHub Copilot***

[https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot](https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot)  
Bones pràctiques per integrar Copilot al teu flux de treball.

###### **Using AI for searching (MDN)**

[https://developer.mozilla.org/en-US/docs/Learn\_web\_development/Getting\_started/Environment\_setup/Browsing\_the\_web\#using\_ai](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Browsing_the_web#using_ai)  
Com aprofitar la IA per documentar-te millor a la web.

## **La IA en el desenvolupament de software actual**

L'ús d'intel·ligència artificial en el desenvolupament de software ha passat de ser una novetat a ser una realitat del dia a dia en molt poc temps. El 82% dels desenvolupadors afirmen usar un assistent de codi IA diàriament o setmanalment, una senyal clara que aquestes eines han passat de l'experimentació a formar part del flux de treball central. No obstant, la realitat és més matisada del que sembla: hi ha avantatges clars, però també limitacions i riscos que cal conèixer.

**Què pot fer la IA per tu com a desenvolupador**

Els avantatges més evidents de la IA en el codi es concentren en tasques concretes i repetitives. GitHub Copilot és un assistent de codi que ajuda a escriure codi més ràpid i amb menys esforç, permetent concentrar més energia en la resolució de problemes i la col·laboració.

Les àrees on la IA realment brilla són: completar codi repetitiu i boilerplate, generar tests unitaris a partir del codi existent, explicar codi aliè o complex, suggerir refactoritzacions, i ajudar a buscar errors. En un experiment controlat, el grup de desenvolupadors amb accés a Copilot va completar una tasca un 55,8% més ràpid que el grup de control. Els desenvolupadors amb menys experiència, els més grans i els que programen més hores al dia van ser els que més se'n van beneficiar.

**Bones pràctiques: com usar-la bé**

Abans de treballar amb Copilot, és important entendre quan l'hauries i no hauries d'usar-lo. No substitueix l'experiència ni les habilitats del desenvolupador. Recorda que tu estàs al càrrec, i Copilot és una eina potent al teu servei.

Les recomanacions clau de la documentació oficial de GitHub són:

**Escriu prompts específics.** Com més concret siguis, millors resultats obtindràs. En lloc de "escriu una funció", millor "escriu una funció que validi un email i retorni true si és vàlid, false si no, sense usar llibreries externes".

**Valida sempre el codi suggerit.** Mentre Copilot és molt potent, és una eina capaç de cometre errors, i sempre has de validar el codi que suggereix. Comprèn el codi suggerit abans d'implementar-lo, i considera no només la funcionalitat i seguretat, sinó també la llegibilitat i mantenibilitat.

**Usa-la per aprendre, no per evitar aprendre.** La IA pot explicar-te per què funciona un fragment de codi, quin és el seu propòsit, o quines alternatives existirien. Això és molt més valuós que simplement acceptar suggeriments sense entendre'ls.

**Les limitacions reals**

La realitat és que la IA no és tan fiable com sembla a primera vista. L'enquesta de Stack Overflow de 2025 va revelar una paradoxa: l'ús d'eines d'IA va augmentar fins al 84% dels desenvolupadors, però la confiança en aquestes eines va caure fins al 29%, una davallada de 11 punts percentuals respecte a 2024\. Com més l'usen, menys s'hi fien.

Una de les limitacions més importants és la **seguretat del codi generat**. Una anàlisi de més de 100 models de llenguatge va revelar que el codi generat per IA conté 2,74 vegades més vulnerabilitats que el codi escrit per humans. La taxa de fallada en els benchmarks de codificació segura és del 45%.

Un altre problema és la **qualitat a llarg termini**. El "code churn" (el percentatge de codi que s'elimina menys de dues setmanes després d'escriure'l) s'ha disparat amb l'ús de la IA. Això suggereix que tot i que les eines d'IA fan escriure codi més ràpid, el resultat pot requerir moltes més revisions abans d'arribar a la qualitat de producció.

**El risc de la dependència excessiva**

La dependència excessiva de la IA és un risc real: els desenvolupadors podrien tornar-se massa dependents dels suggeriments generats, passant per alt les bones pràctiques en favor d'una implementació més ràpida.

La sobredependència de les eines d'IA arriba a crear una generació de desenvolupadors que manca de la consciència fonamental sobre seguretat. Quan la IA s'encarrega dels detalls d'implementació, els desenvolupadors poden perdre la familiaritat amb els patrons de codificació segura i les tècniques de prevenció de vulnerabilitats.

**La perspectiva equilibrada**

La IA és una eina, no un substitut del criteri del desenvolupador. El producte es diu "Copilot" i no "Autopilot": no està pensat per generar codi sense supervisió. Sempre has d'usar Copilot conjuntament amb bones pràctiques de testing, revisió de codi i eines de seguretat, a més del teu propi judici.

Per a qui comença, la IA és especialment útil per superar el bloqueig inicial, entendre codi aliè i aprendre noves APIs. Però és crucial no acceptar el codi cegament: llegeix-lo, entén-lo i verifica que fa el que creus que fa. La millor manera d'usar la IA en el desenvolupament és com un company de parella (*pair programmer*) que saps que de vegades s'equivoca, i la responsabilitat final sempre és teva.

