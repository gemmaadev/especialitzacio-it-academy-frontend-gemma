## **Avantatges de les proves automatitzades**

**Què son les proves automatitzades i per quèexisteixen**

El test-driven development (TDD) és una pràctica de desenvolupament de software on les proves automatitzades es fan servir per guiar el disseny i l'acoblament lliure de dependències. 

Les proves automatitzades son scripts que verifiquen que el codi funciona correctament, executant-se sense intervenció humana. En lloc de provar manualment cada canvi (obrir el navegador, clicar botons, comprovar resultats), un test automatitzat fa la mateixa verificació en mil·lisegons.

La distinció fonamental respecte al testing tradicional: el testing tradicional detecta defectes després que el codi és escrit. TDD prevé defectes assegurant la correctesa del codi abans que el codi de producció existeixi.

**Avantatge 1: Detecció primerenca d'errors**

Les capacitats de detecció primerenca de bugs de TDD permeten identificar i resoldre problemes a la primera oportunitat possible, evitant que els bugs recorrin a la codebase principal.

Aquesta filosofia de prevenció-sobre-detecció redueix el temps de debugging dramàticament. En lloc de descobrir bugs setmanes després de la implementació quan el context es perd, TDD captura els problemes immediatament quan el context és fresc i les correccions son simples.

El cost d'un bug creix exponencialment amb el temps:

| Bug detectat mentre escrius el codi:  5 minuts per corregirBug detectat en code review:           30 minutsBug detectat en staging:               horesBug detectat en producció:             dies \+ impacte als usuaris |
| :---- |

**Avantatge 2: Velocitat de feedback i confiança per refactoritzar**

Amb una suite robusta de casos de test, les modificacions futures del codi son més fàcils, assegurant que les funcionalitats existents no es vegin afectades. Els tests automatitzats proporcionen una xarxa de seguretat que permet als developers refactoritzar i millorar el codi sense por de trencar la funcionalitat existent.

Sense tests, refactoritzar codi existent és arriscat: qualsevol canvi pot trencar quelcom que funcionava i no t'en adones fins que un usuari ho reporta. Amb tests, refactoritzar és segur: executes els tests i saps immediatament si has trencat alguna cosa.

TDD permet als programadors fer canvis o afegir noves funcionalitats amb confiança. Saber que el codi s'està constantment testejant redueix la por de trencar la funcionalitat existent. Aquesta xarxa de seguretat pot encoratjar enfocaments més innovadors i creatius per a la resolució de problemes.

**Avantatge 3: Documentació viva**

Les suites de tests escrites en TDD serveixen com a documentació executable demostrant com els components haurien de comportar-se. A diferència de la documentació escrita que es desactualitza, els tests romanen sincronitzats amb la implementació a través de l'execució contínua.

Un test ben escrit no necessita comentaris addicionals per explicar quèfa una funció. El test diu exactament quins inputs espera i quin output produeix:

| // La documentació tradicional (pot quedar desactualitzada):// "la funció calcularDescompte aplica un 10% per a usuaris premium"// La documentació viva (sempre és veritat si el test passa):describe('calcularDescompte', () \=\> {  it('aplica un 10% de descompte per a usuaris premium', () \=\> {    const resultat \= calcularDescompte(100, { premium: true });    expect(resultat).toBe(90);  });  it('no aplica descompte per a usuaris estàndard', () \=\> {    const resultat \= calcularDescompte(100, { premium: false });    expect(resultat).toBe(100);  });}); |
| :---- |

El procés de TDD resulta naturalment en codi ben documentat, ja que cada test clarifica el propòsit del codi que prova.

**Avantatge 4: Millor disseny del codi**

Escriure tests abans de la implementació força els developers a considerar la testabilitat del disseny d'avançada. 

El codi dissenyat per ser testable exhibeix millors qualitats arquitecturals incloent: baix acoblament entre components, interfícies i contractes clars, adherència al principi de responsabilitat única, i injecció de dependències habilitant l'aïllament de components.

Si un codi és difícil de testar (necessites instanciar 10 objectes per provar una funció), és una senyal que el disseny és dolent. TDD et força a escriure codi modular i amb responsabilitats clares des del principi.

**Avantatge 5: Integració natural amb CI/CD**

Tant TDD com CI/CD prescriuen l'automatització del procés de testing. Quan integres el testing automatitzat de TDD al pipeline CI/CD, el testing es converteix en una part integral del procés de desenvolupament i desplegament, en lloc d'una etapa separada.

Integrar TDD amb eines de CI com Jenkins, CircleCI o GitHub Actions assegura que els tests s'executen automàticament amb cada commit de codi. Usar GitHub Actions per disparar tests en pull requests assegura que únicament el codi completament testejat es fusiona a la branca principal.

**Avantatge 6: Detecció de regressions**

Ja tenir un conjunt de tests que han passat pel procés TDD incrementa la resistència del sistema a les regressions. Si en l'etapa primerenca, el codi en execució fa fallar un altre test, és evidència òbvia de regressió en el codi.

Una regressió és quan un canvi nou trenca alguna cosa que funcionava correctament. Sense tests, les regressions es descobreixen quan els usuaris les reporten. Amb tests, es detecten en el moment en que el developer introdueix el canvi.

**Les limitacions: quan les proves automatitzades no son suficients**

TDD ofereix diversos avantatges, incloent feedback constant i millor qualitat de disseny. No obstant, presenta reptes com ara l'increment en el volum de codi i els esforços de manteniment. Malgrat aquests inconvenients, TDD continua sent un enfocament valuós per al desenvolupament de software d'alta qualitat.

Les proves automatitzades no detecten tot:

* **Bugs de lògica de negoci** quan els requisits estan malament entesos (el test passa perquè prova el comportament erroni especificat)  
* **Problemes d'usabilitat** (la interfície funciona però l'usuari no sap com usar-la)  
* **Bugs de rendiment** sota càrrega real (cal testing de càrrega separat)  
* **Problemes visuals** d'aspecte i disseny

**Resum: per què valen la pena les proves automatitzades**

| Avantatge | Impacte pràctic |
| ----- | ----- |
| **Detecció primerenca** | Un bug ara \= 5 min. El mateix bug en producció \= hores |
| **Velocitat de feedback** | El test falla en mil·lisegons, no quan l'usuari clica |
| **Confiança per refactoritzar** | Canvies el codi intern sense por de trencar res |
| **Documentació viva** | El test explica quèfa el codi, sempre actualitzat |
| **Millor disseny** | El codi testable és codi modular i mantenible |
| **CI/CD fiable** | El pipeline no pot desplegar codi amb tests fallant |
| **Detecció de regressions** | Un canvi nou que trenca quelcom → error immediat |

