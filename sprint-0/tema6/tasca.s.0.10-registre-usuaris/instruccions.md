### **Exercici pràctic 1: Registre d'usuaris** 

#### Context

Treballaràs amb la següent història d'usuari:  
""Com a usuari de la botiga online, vull poder registrar-me amb el meu correu electrònic i contrasenya per crear un compte."\*

#### Objectius d'aprenentatge

Planificar el desenvolupament d'una funcionalitat front-end seguint metodologia àgil: des de la història d'usuari fins al tauler Kanban prioritzat.

#### Passos a seguir

1. Definir Criteris d'Acceptació  
   * » Llista 3-5 condicions mesurables que la funcionalitat ha de complir.  
     Exemple:  
   * » Es validen en temps real que l'email tingui un format vàlid i que las contrasenyes siguin coincidents.  
2. Escenaris de Prova amb Gherkin  
   * » Escriu 2 escenaris en sintaxi Donat/Quan/Llavors per validar els criteris.  
     Exemple:

Escenari: Registre exitós    
   Donat que estic a la pàgina de registre    
   Quan omplo "email@exemple.com" al camp email    
   I escric  "P@ssw0rd" als camps de contrasenya i confirmació    
   I clico  "Registrar-me"   
   Llavors veig el missatge "Compte creat. Verifica el teu correu electrònic."    
   I sóc redirigit a /verifica-correu   

3. Desglossament de Tasques  
   * » Divideix la història en tasques tècniques front-end específiques:  
     Exemple:  
     1. Maquetar formulari de registre amb HTML/CSS (camps, botó, missatges d'error).  
          
4. Organització en Tauler Kanban  
   * » Crea un tauler a Trello amb aquestes columnes:  
     1. Backlog | To Do | Doing | Test | Done  
   * » Afegeix les tasques com a targetes i prioritza amb MoSCoW:  
     1. 🟢 Must-Have: Formulari bàsic funcional \+ validació inicial en enviar.  
     2. 🟡 Should-Have: Validació en temps real (errors es mostren mentre l'usuari escriu).  
     3. 🔵 Could-Have: Indicador de força de la contrasenya (barra de progrés).  
     4. 🔴 Won't-Have: Registre amb xarxes socials (Facebook/Google).  
5. Documentació  
   * » Crea una pàgina a Notion que inclogui:  
     1. Història d'usuari original.  
     2. Criteris d'acceptació i escenaris Gherkin.  
     3. Enllaç al tauler Kanban.  
     4. Captura de pantalla del codi més complex (ex: funció de filtrat).  
          
6. Bonus track: Repeteix l'exercici per la següent història d'usuari:  
   "Com a usuari registrat, vull poder canviar la meva contrasenya perquè pugui mantenir el meu compte segur."

