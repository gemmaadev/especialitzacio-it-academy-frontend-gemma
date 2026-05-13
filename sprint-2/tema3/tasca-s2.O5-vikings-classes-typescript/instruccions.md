### **Vikings**

En aquest exercici hauràs de codificar una batalla entre Vikings i Saxons mitjançant la programació orientada a objectes.

#### **Objectius**

* » Aplicar els conceptes de programació orientada a objectes i herència amb TypeScript.

#### **Passos a seguir**

1. Preparació del repositori:  
* Clona el repositori amb les instruccions

$ git clone https://github.com/IT-Academy-BCN/it-sprint2-vikings.git  
$ cd it-sprint1-maquetacio

* Desconnecta el teu repositori del repositori de IT Academy. Utilitza la següent ordre de git:

$ git remote rm origin 

* Connecta el teu repositori amb el teu compte de GitHub:

$ git remote add origin \<URL-del-teu-repositori\>

2. Preparació de l'entorn de test  
* Instal·la els mòduls amb el comandament 

pnpm install

* Executa els tests amb el comandament

pnpm test

3. Execució dels tests  
* Després de l'execució comprovaràs que surten un munt d'errors per consola del tipus:

FAIL  tests/Soldier.test.ts \[ tests/Soldier.test.ts \]  
    Error: No test found in suite tests/Soldier.test.ts  
     ....

* Obre el fitxer tests/Soldier.test.ts i descomenta la funció test() de la línia 14:

describe("constructor method", function () {

     // test('should receive 2 arguments: health and strength ', ()=\> expect(Soldier.length).toEqual(2));  
  ...  
  });

Ara el test (should receive 2 arguments (health & strength)) està fallant\!\!

4. Escriu el codi  
* Ara has d'escriure el codi correcte al fitxer src/Soldier.ts per passar el test. El codi que trobaràs és el següent:

// Soldier  
export class Soldier {}  
 

* En aquest cas, el test diu que Soldier constructor function should receive 2 arguments (health & strength), així que has d'escriure el codi correcte que passi el test. Implementa la funció constructora de la classe Soldier que rebi dos paràmetres:

// Soldier  
class Soldier{  
  constructor(healthArg, strengthArg) {}  
}

5. Executa tots els tests  
     
* Ara que ja has passat el primer test, descomenta el següent i segueix codificant per passar els tests.  
* Continua fent el mateix amb els fitxers de test dels arxius: 

Viking.ts, Saxon.ts i War.ts.  
