## **Proves de regressió: definició i prevenció**

**Què és una regressió?** 

Les regressions son bugs on components que funcionaven prèviament deixen de funcionar correctament. El que és pitjor que un bug de software? Un bug que torna a aparèixer en el futur després que l'has declarat resolt. Això és sovint el que son les regressions. Son una realitat dolorosa que la majoria d'equips de desenvolupament troben.

En termes pràctics: arregles un bug a la funcionalitat A i, sense voler, trenques la funcionalitat B que fins ara funcionava perfectament. L'aplicació ha "regressionat" a un estat anterior defectuós, però en una part diferent del codi.

El testing de regressió és re-executar tests funcionals i no funcionals per assegurar que el software prèviament desenvolupat i testejat continua funcionant com s'espera després d'un canvi. Si no és així, s'anomena regressió. 

Canvis que poden requerir testing de regressió inclouen correccions de bugs, millores de software, canvis de configuració.

**Per què apareixen les regressions?**

Regressions son una font comú de frustració per a usuaris, developers i managers. Les regressions regulars son sovint un indicador simptomàtic de sistemes fràgils que son poc fiables. 

També son un indicador d'un procés de desenvolupament trencat que és incapaç de verificar els efectes de les suposades correccions.

Les causes principals:

1\. Efecte en cascada: un canvi en el mòdul A afecta el mòdul B  
   que en depèn sense que ningú ho sàpiga explícitament

2\. Codi compartit: modificar una funció utilitària que usen  
   molts components de maneres lleugerament diferents

3\. Actualitzar dependències: actualitzar la versió de React,  
   lodash o qualsevol altra biblioteca pot canviar comportaments

4\. Correccions de bugs que introdueixen nous bugs:  
   solucionar el problema X crea una condició que trenca Y

**Com les proves automatitzades prevenen regressions**

Protegir el teu codebase amb una suite de tests completa és l'única manera fiable de defensar-se contra les regressions.

 Els tests automatitzats et donen confiança que el teu software funciona consistentment, i executar els tests com a part del pipeline de desplegament assegura que els canvis no poden fusionar-se a producció si trencarien codi existent.

El mecanisme és senzill: cada test existent és una "trampa" per a futures regressions. Quan un canvi nou trenca alguna cosa que funcionava, el test falla immediatament i avisa el developer.

| // Exemple real de com un test prevé una regressió// Tenim una funció que calcula el preu finalfunction calcularPreuFinal(preu: number, descompte: number): number {  return preu \- (preu \* descompte / 100);}// Test escrit quan la funció funciona:it('aplica correctament el descompte del 20%', () \=\> {  expect(calcularPreuFinal(100, 20)).toBe(80);});// Mesos després, un developer la refactoritza i introdueix un bug:function calcularPreuFinal(preu: number, descompte: number): number {  return preu \- (descompte / 100);  // ← bug: falta multiplicar per preu}// EL TEST FALLA IMMEDIATAMENT:// ❌ Expected: 80// ❌ Received: 99.8// El developer veu el fallo ABANS de fer el merge// La regressió queda aturada a la PR, no arriba a producció |
| :---- |

**La regla: afegir un test per a cada bug arreglat**

Fins i tot si no tens molts tests encara, és important afegir-ne un cada vegada que arregles un problema. Això ajudarà a prevenir que el problema es repeteixi en el futur.

El flux correcte quan trobes un bug:

| // Bug reportat: "el carret no calcula correctament el total// quan hi ha productes amb descompte"// PAS 1: Escriu el test que reprodueix el bug (FALLA)it('calcula el total correctament amb productes amb descompte', () \=\> {  const productes \= \[    { nom: 'Portàtil', preu: 1000, descompte: 10 },    { nom: 'Ratolí', preu: 50, descompte: 0 },  \];  const total \= calcularTotalCarret(productes);  expect(total).toBe(950);  // ← falla perquè el bug existeix});// PAS 2: Arregla el bug fins que el test passi (VERD)function calcularTotalCarret(productes: Producte\[\]): number {  return productes.reduce((total, p) \=\> {    const preuFinal \= p.preu \* (1 \- p.descompte / 100);    return total \+ preuFinal;  }, 0);}// PAS 3: El test queda a la suite per sempre// → Si algú torna a introduir el bug, el test fallarà immediatament// → La regressió és impossible |
| :---- |

**Prevenció de regressions en el CI/CD pipeline**

Les eines CI/CD permeten als developers integrar els seus canvis en un repositori compartit diverses vegades al dia. Cada integració és automàticament testejada, incloent els tests de regressió, per detectar problemes aviat. 

Si un test falla, el pipeline CI/CD es trenca i els developers son alertats per solucionar el problema immediatament.

| \# .github/workflows/ci.ymlname: Tests de Regressióon:  push:    branches: \[main\]  pull\_request:         \# ← executa en CADA Pull Request    branches: \[main\]jobs:  test:    runs-on: ubuntu-latest    steps:      \- uses: actions/checkout@v4      \- uses: actions/setup-node@v4        with: { node-version: '20', cache: 'npm' }      \- run: npm ci      \- run: npm test   \# ← TOTA la suite de tests\# Si un test de regressió falla:\# ❌ La PR no es pot fusionar\# ❌ El deploy no s'executa\# ✅ El developer veu exactament quin test ha fallat |
| :---- |

**Els diferents nivells de testing de regressió**

Existeixen diversos tipus de testing de regressió: 

**Unit regression testing** retesta una unitat específica de codi (com una funció o mètode) després de modificacions per assegurar que continua funcionant com s'espera. 

**Partial regression testing** prova certes parts del sistema que han canviat, juntament amb components directament relacionats. 

**Complete regression testing** retesta el sistema sencer. Típicament s'usa quan s'ha fet un canvi significatiu al sistema.

En la pràctica, la piràmide de testing gestiona els tres nivells:

Tests unitaris → cobreixen lògica de cada funció  
Tests d'integració → cobreixen la comunicació entre mòduls  
Tests E2E → cobreixen els fluxos crítics de l'usuari

Si qualsevol nivell detecta una regressió → la PR queda bloquejada

**Visual Regression Testing: un cas especial**

Les aplicacions JavaScript sovint tendeixen a ser visuals en naturalesa. Això crea un tipus nou de regressió, on el codi continua funcionant correctament però l'aplicació sembla diferent. 

Les regressions visuals poden ser especialment difícils de detectar quan ocorren sota condicions específiques, com un botó que té una mida incorrecta en pantalles de tablet però únicament quan els seus controls veïns estan desactivats.

**Chromatic** (creat per l'equip de Storybook) detecta regressions visuals automàticament comparant captures de pantalla de cada component entre versions. Si un component canvia visualment sense que ningú ho hagi aprovat explícitament, el test visual falla.

**El cost d'una regressió en producció**

Els bugs descoberts en etapes de producció son els més cars de corregir ja que requereixen debugging a través de múltiples capes del sistema i possiblement redissenyar fluxos de treball.

Regressió detectada per un test unitari: 5 minuts  
Regressió detectada per un company (code review): 30 minuts  
Regressió detectada al staging: 2-4 hores  
Regressió detectada en producció pels usuaris:  
  → Hores o dies de debugging  
  → Impacte en usuaris reals  
  → Possible pèrdua de dades  
  → Dany reputacional

**Les tres regles per prevenir regressions**

* **Regla 1:** Cada bug arreglat ha de tenir un test que el reprodueixi. Escriu el test ABANS d'arreglar el bug.  
* **Regla 2:** Tots els tests existents s'executen en cada Pull Request. Cap canvi arriba a producció sense passar per la suite completa.  
* **Regla 3:** No eliminis tests que fallen per culpa d'un canvi. Si el comportament ha canviat intencionalment, actualitza el test. Si ha canviat accidentalment, arregla el bug.

