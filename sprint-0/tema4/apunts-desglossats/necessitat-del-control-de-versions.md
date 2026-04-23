**Necessitat del control de versions: historial de canvis, col·laboració, resolució de conflictes**

## **Què és el control de versions i per què existeix?**

Imagina que estàs escrivint un treball i cada vegada que fas un canvi important guardes una còpia nova: "treball-v1.docx", "treball-v2.docx", "treball-FINAL.docx", "treball-FINAL-ara-si.docx"... Això és control de versions fet a mà, i és caòtic.

El control de versions és un sistema que fa això automàticament i de manera organitzada. Git guarda l'historial complet de tots els canvis que has fet al codi, qui els ha fet i quan, sense que hagis de gestionar-ho tu manualment.

**L'historial de canvis**

Cada vegada que fas un commit, Git guarda una fotografia del codi en aquell moment. Amb el temps acumules un historial complet que et permet veure exactament com ha evolucionat el projecte des del primer dia.

Això té avantatges molt pràctics. Si en algun moment el codi deixa de funcionar pots revisar l'historial per veure quin canvi ha causat el problema. Si elimines codi per error pots recuperar-lo. Si vols entendre per què una part del codi és com és pots veure quan es va afegir i amb quin missatge de commit. És com tenir una màquina del temps per al teu projecte.

**La col·laboració en equip**

Sense control de versions, col·laborar en el codi és un malson. Si dues persones treballen en els mateixos fitxers, la segona en sobreescriu el treball de la primera quan desa. La solució manual sol ser enviar fitxers per correu o per WhatsApp, cosa que genera confusió i pèrdua de feina.

Git resol aquest problema amb les branques. Cada persona treballa en la seva pròpia branca de manera independent, sense interferir amb la feina dels altres. Quan la feina està llesta, es proposa fusionar-la al codi principal mitjançant una Pull Request, que permet que altres membres de l'equip la revisin abans d'acceptar-la.

Això significa que diverses persones poden modificar el mateix projecte al mateix temps, cadascuna al seu ritme, sense trepitjar-se.

**La resolució de conflictes**

Quan dues persones modifiquen la mateixa línia del mateix fitxer, Git detecta que hi ha una contradicció i genera un **conflicte**. No és un error del sistema: és Git dient-te "aquí hi ha dues versions i no sé quina és la correcta, decideix tu".

Git marca clarament al fitxer quines són les dues versions en conflicte. Tu les mires, tries quina és la bona (o combines les dues), marques el conflicte com a resolt i continues. VS Code té eines visuals que faciliten molt aquest procés mostrant les dues versions una al costat de l'altra amb botons per triar.

Els conflictes sonen intimidants quan comences, però en realitat són el mecanisme que impedeix que el treball d'una persona sobreescrigui el d'una altra sense que ningú se n'adoni.

**Per què és imprescindible en el desenvolupament professional**

En qualsevol empresa de software, el control de versions no és opcional: és la base de tot el flux de treball. Sense ell no hi hauria manera de saber qui ha fet cada canvi, de treballar en equip sense xocar constantment, de revertir errors en producció, ni de mantenir versions estables del producte mentre es desenvolupa la següent.

Git és l'estàndard de la indústria. Aprendre a usar-lo correctament és tan important com aprendre a programar.

