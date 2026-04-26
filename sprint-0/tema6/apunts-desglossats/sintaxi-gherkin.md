## **Sintaxi Gherkin i el format Given/When/Then**

**Què és Gherkin?**

Gherkin és un llenguatge específic de domini (*domain-specific language*) usat en el Behavior-Driven Development (BDD) per escriure escenaris de prova en text pla i llegible per humans. Segueix una sintaxi estructurada amb paraules clau com Given, When i Then per definir el comportament de l'aplicació de manera clara.

La seva gran aportació és que permet que una mateixa especificació sigui llegida i entesa per tothom: el client que defineix el requisit, el dissenyador que pensa la interfície, el developer que escriu el codi i el tester que verifica que funciona. Tothom llegeix el mateix document i l'entén de la mateixa manera.

Gherkin documenta les funcionalitats del software i els resultats esperats usant un format Given-When-Then. Cada escenari Gherkin proporciona exemples concrets de com hauria de comportar-se l'aplicació sota condicions específiques, de manera que els usuaris no tècnics puguin entendre en què treballen els developers.

**L'estructura d'un fitxer Gherkin**

Els fitxers Gherkin són fitxers de text pla amb l'extensió `.feature`. Cada línia que no és en blanc ha de començar amb una paraula clau Gherkin seguida de qualsevol text.

L'estructura completa d'un fitxer `.feature` és:

**Feature: Feature title**  
  **Optional description of the feature**

  **Background:**  
    **Given \[steps common to all scenarios\]**

  **Scenario: Scenario title**  
    **Given \[initial context\]**  
    **When  \[action\]**  
    **Then  \[expected result\]**

**Les paraules clau principals**

**Feature** — s'usa per agrupar escenaris relacionats. Descriu la funcionalitat d'alt nivell que s'està provant i proporciona el context per als escenaris que conté. Una Feature es pot considerar una història d'usuari o un requisit.

**Scenario** — descriu un comportament específic o situació. Els escenaris són el nucli dels tests Gherkin. Cada escenari representa un camí concret a través de la funcionalitat.

**Given (Donat)** — estableix el context inicial. La paraula clau Given configura el context inicial o les precondicions per a l'escenari. Descriu l'estat del sistema abans que es produeixi l'acció principal.

**When (Quan)** — l'acció que dispara el flux. La paraula clau When especifica l'acció o l'esdeveniment que desencadena l'escenari. Descriu el que fa l'usuari o el que passa al sistema.

**Then (Llavors)** — el resultat verificable. La paraula clau Then declara el resultat esperat de l'escenari. Si les condicions es compleixen, el software funciona correctament; si no, falla.

**And / But (I / Però)** — s'usen per afegir passos addicionals o condicions a l'escenari. Es poden usar en combinació amb Given, When i Then per fer l'escenari més descriptiu. `And` afegeix una condició positiva, `But` introdueix una excepció o condició negativa.

**Exemple complet pas a pas**

Imagina que tens la história: *"Com a usuari registrat, vull iniciar sessió per accedir al meu compte"*.

**Feature: User Login**  
  **As a registered user**  
  **I want to log in**  
  **So that I can access my account**

  **Scenario: Successful login with valid credentials**  
    **Given the user is on the login page**  
    **And has a registered account with email "anna@example.com"**  
    **When they enter the email "anna@example.com" and the correct password**  
    **And click the "Log In" button**  
    **Then they are redirected to their personal dashboard**  
    **And they see the message "Welcome, Anna"**

  **Scenario: Failed login with incorrect password**  
    **Given the user is on the login page**  
    **When they enter the email "anna@example.com" and an incorrect password**  
    **And click the "Log In" button**  
    **Then the error message "Incorrect password" is displayed**  
    **But they are not redirected to any other page**

**Background: evitar repeticions**

El Background s'usa per definir passos comuns a tots els escenaris d'un Feature. Els passos definits al Background s'executen abans de cada escenari. És molt útil quan tots els escenaris d'una funcionalitat comencen des del mateix punt de partida.

**Feature: Shopping Cart Management**

  **Background:**  
    **Given the user is logged in**  
    **And they are on the products page**

  **Scenario: Add a product to the cart**  
    **When they click "Add to Cart" on a product**  
    **Then the product appears in the cart**  
    **And the cart counter increases by 1**

  **Scenario: Remove a product from the cart**  
    **Given the cart contains 2 products**  
    **When they remove one product**  
    **Then the cart shows 1 product**

**Scenario Outline: el mateix escenari amb dades diferents**

El Scenario Outline s'usa per executar el mateix escenari múltiples vegades amb conjunts de dades diferents. Va seguit d'una secció Examples que conté una taula de variables i els seus valors.

 **Scenario Outline: Login with various credentials**  
    **Given the user is on the login page**  
    **When they enter the email "\<email\>" and the password "\<password\>"**  
    **Then they see the message "\<message\>"**

    **Examples:**  
      **| email                | password    | message                  |**  
      **| anna@example.com     | correct123  | Welcome, Anna            |**  
      **| bob@example.com      | wrongpass   | Incorrect password       |**  
      **| unknown@example.com  | anypass     | User not found           |**

Amb el Scenario Outline evites escriure tres escenaris gairebé idèntics: un sol template \+ la taula d'exemples cobreix tots els casos.

**Bones pràctiques de redacció**

Escriu cada pas en tercera persona o des de la perspectiva de l'usuari. Evita el jargon tècnic; qualsevol membre de l'equip hauria de poder llegir el teu test Gherkin BDD i entendre el que passa.

Les regles més importants:

**Una sola acció per pas** — no barregis dues accions en una mateixa línia. Malament: "Quan l'usuari introdueix les dades i clica enviar i espera la resposta". Bé: tres passos separats.

**Concret, no vague** — "Llavors el sistema respon ràpidament" és inútil. "Llavors la resposta arriba en menys de 2 segons" és verificable.

**Usa Background per als passos repetits** — si tots els escenaris comencen amb "Donat que l'usuari ha iniciat sessió", posa-ho al Background.

**Escriu el camí feliç i els camins d'error** — no t'oblidis dels escenaris on les coses van malament. Els errors, les dades invàlides i els casos límit necessiten els seus propis escenaris.

**Gherkin i les eines d'automatització**

Cucumber és una de les eines de testing BDD més àmpliament usades que porta els escenaris definits en Gherkin a la realitat. Els fitxers Feature escrits en Gherkin defineixen el comportament en text pla. Les Step Definitions mapegen cada pas Gherkin a codi d'automatització que executa les accions corresponents.

Això significa que el mateix fitxer `.feature` que llegeix el client per validar els requisits pot ser executat automàticament per verificar que el codi funciona. Els escenaris passen a ser alhora documentació viva i tests automatitzats, dues coses en un.

**Resum de les paraules clau**

| Paraula clau | En català | Propòsit |
| ----- | ----- | ----- |
| `Feature` | Funcionalitat | Agrupa escenaris relacionats |
| `Scenario` | Escenari | Un cas de prova concret |
| `Given` | Donat | Context inicial i precondicions |
| `When` | Quan | Acció que dispara el flux |
| `Then` | Llavors | Resultat esperat verificable |
| `And` | I | Afegeix condicions addicionals |
| `But` | Però | Introdueix una excepció o negació |
| `Background` | Context comú | Passos compartits per tots els escenaris |
| `Scenario Outline` | Esquema d'escenari | El mateix escenari amb dades variables |
| `Examples` | Exemples | Taula de dades per al Scenario Outline |

