### **Configuració i Testing Bàsic**

Configuraràs un entorn de testing per al projecte de la calculadora de despeses de viatge. Aprendràs a configurar Vitest, escriure proves unitàries i utilitzar mocking.

#### **Objectiu**

* » Configurar Vitest en un projecte TypeScript.  
* » Escriure proves unitàries per a les funcions calculateBudgetStatus i enerateExpenseReport\`.  
* » Utilitzar mocking per simular entrades..  
* » Generar informes de cobertura de codi.

#### **Passos a seguir**

Preparació del repositori:  
Crea una branca nova:   
feature/testing-implementation

1. Instal·lació de dependències:

npm install \--save-dev vitest @vitest/coverage-c8 jsdom

2. Proves unitàries: Escriu les proves unitàries pels següents criteris:  
   * Funcionalitat: Calculadora d'estat de pressupost

Escenari: Les despeses són menys del 80% del pressupost  
    Donat un pressupost de 1000  
    I unes despeses de 700  
    Quan calculo l'estat del pressupost  
    Aleshores el resultat ha de ser "Sota pressupost ✈️"

  Escenari: Les despeses són entre el 80% i el 100% del pressupost  
    Donat un pressupost de 1000  
    I unes despeses de 850  
    Quan calculo l'estat del pressupost  
    Aleshores el resultat ha de ser "Dins pressupost ✅"

  Escenari: Les despeses superen el pressupost  
    Donat un pressupost de 1000  
    I unes despeses de 1200  
    Quan calculo l'estat del pressupost  
    Aleshores el resultat ha de ser "Sobre pressupost ⚠️"

  Escenari: Les despeses són negatives  
    Donat un pressupost de 1000  
    I unes despeses de \-850  
    Quan calculo l'estat del pressupost  
    Aleshores s'hauria de llençar un error amb el missatge "Les despeses no poden ser negatives"  
 

* Funcionalitat: Generació d'informe de despeses

Escenari: Generar un informe correcte de despeses  
  Donades unes despeses \[50, 0, 120, 85\]  
  I un pressupost diari de 100  
  Quan genero l'informe de despeses  
  Aleshores el nombre de dies de viatge ha de ser 4  
  I el nombre de dies amb despesa ha de ser 3  
  I el pressupost diari ha de ser 100  
  I la despesa mitjana diària ha de ser 63.75  
  I ha d'estar per sota del pressupost  
  I la puntuació ha de ser 3  
  I el feedback ha de ser "Excel·lent gestió\!"

Escenari: Les despeses contenen valors no numèrics  
  Donades unes despeses \[50, NaN, 120, 85\]  
  I un pressupost diari de 100  
  Quan genero l'informe de despeses  
  Aleshores s'hauria de llençar un error amb el missatge "Les despeses contenen valors no numèrics"

Escenari: Lleugerament per sobre del pressupost  
  Donades unes despeses \[100, 110, 120, 110\]  
  I un pressupost diari de 100  
  Quan genero l'informe de despeses  
  Aleshores la puntuació ha de ser 2  
  I el feedback ha de ser "Correcte, però ajustat"

Escenari: Molt per sobre del pressupost  
  Donades unes despeses \[150, 140, 130, 140\]  
  I un pressupost diari de 100  
  Quan genero l'informe de despeses  
  Aleshores la puntuació ha de ser 1  
  I el feedback ha de ser "Pot millorar"  
 

3. Utilitzar mocking:

// src/\_\_tests\_\_/exercise.test.ts  
import { calculateExercises } from '../exerciseCalculator';

describe('calculateExercises', () \=\> {  
  test('calcula valors correctes', () \=\> {  
    const result \= calculateExercises(\[3, 0, 2, 4.5, 0, 3, 1\], 2);  
    expect(result).toEqual({  
      periodLength: 7,  
      trainingDays: 5,  
      success: false,  
      rating: 2,  
      ratingDescription: 'no massa malament però es podria millorar',  
      target: 2,  
      average: 1.9285714285714286  
    });  
  });  
});  
 

4. Executar proves i generar cobertura:

npm test

