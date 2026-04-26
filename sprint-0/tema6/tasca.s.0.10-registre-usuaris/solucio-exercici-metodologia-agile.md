### **Registre d'usuaris \- Planificació del desenvolupament d'una funcionalitat front-end seguint metodologia àgil**

**Història d’usuari:**  
Com a usuari de la botiga online, vull poder registrar-me amb el meu correu electrònic i contrasenya per crear un compte.

**Definir criteris d'acceptació mesurables i verificables (3-5 criteris):**

1. El camp email valida el format en temps real (ha de contenir @ i un domini vàlid com .com)  
2. La contrasenya ha de tenir mínim 8 caràcters, una majúscula, un número i un símbol  
3. Els camps de contrasenya i confirmació han de coincidir abans d'enviar el formulari  
4. Si l'email ja existeix al sistema, es mostra el missatge "Aquest email ja està registrat"  
5. Amb el registre exitós, l'usuari rep un email de verificació i és redirigit a /verifica-correu

**Escenaris de prova amb Gherkin**

Escenari: Registre exitós    
   Donat/**Given** que estic a la pàgina de registre    
   Quan/**When** omplo "email@exemple.com" al camp email    
   I/And escric  "P@ssw0rd" als camps de contrasenya i confirmació    
   I/And clico  "Registrar-me"   
   Llavors/**Then** veig el missatge "Compte creat. Verifica el teu correu electrònic."    
   I/And sóc redirigit a /verifica-correu 

Escenari: Registre amb email ja existent  
  Donat/**Given** que estic a la pàgina de registre  
  Quan/**When** omplo "gemma.maeso41@gmail.com" al camp email  
  I/And escric "P@ssw0rd1" als camps de contrasenya i confirmació  
  I/And clico "Registrar-me"  
  Llavors/**Then** veig el missatge d'error "Aquest email ja està registrat"  
  I/And el formulari no s'envia

Escenari: Contrasenya feble  
  Donat/**Given** que estic a la pàgina de registre  
  Quan/**When** omplo "gemma.maeso41@gmail.com" al camp email  
  I/And escric "1234" als camps de contrasenya i confirmació  
  Llavors/**Then** veig el missatge "La contrasenya ha de tenir mínim 8 caràcters"  
  I/And el botó "Registrar-me" està desactivat  
 

**Desglossament de tasques tècniques front-end específiques:**

**🟢 Must-Have**

* Maquetar formulari de registre amb HTML/CSS (camps email, contrasenya, confirmació i botó)  
* Validació bàsica en enviar: format email, longitud contrasenya, coincidència camps  
* Mostrar missatges d'error i d'èxit

**🟡 Should-Have**

* Validació en temps real mentre l'usuari escriu (errors es mostren mentre l'usuari escriu)  
* Gestió de l'error “email ja existent” rebut del servidor

**🔵 Could-Have**

* Indicador visual de força de la contrasenya (barra de progrés)  
* Mostrar/amagar contrasenya amb icona d'ull 

**🔴 Won't-Have**

* Registre amb Google / Facebook  
* Verificació de telèfon per SMS

**Enllaç al tauler Kanban**  
[https://trello.com/invite/b/69edc409e869de660b2a5520/ATTI14b63f2d33511549d9621da91296738f4E98095C/botigatech](https://trello.com/invite/b/69edc409e869de660b2a5520/ATTI14b63f2d33511549d9621da91296738f4E98095C/botigatech)

**Canvi de contrassenya \- Planificació del desenvolupament d'una funcionalitat front-end seguint metodologia àgil**

**Història d’usuari:**  
Com a usuari registrat, vull poder canviar la meva contrasenya perquè pugui mantenir el meu compte segur.

**Definir criteris d'acceptació mesurables i verificables (3-5 criteris):**

1. L'usuari ha d'introduir la contrasenya actual correcta abans de poder canviar-la.  
2. La nova contrasenya ha de tenir mínim 8 caràcters, una majúscula, un número i un símbol.  
3. Els camps "nova contrasenya" i "confirmació" han de coincidir abans d'enviar el formulari.  
4. Si la contrasenya actual és incorrecta, es mostra el missatge "La contrasenya actual no és correcta".  
5. Quan el canvi és exitós, es mostra el missatge "Contrasenya actualitzada correctament" i es tanca el formulari.

**Escenaris de prova amb Gherkin**

Escenari: Canvi de contrasenya exitós  
  Donat/**Given** que estic a la pàgina del meu compte  
  I/And estic autenticat com a usuari registrat  
  Quan/**When** omplo "P@ssw0rd1" al camp "Contrasenya actual"  
  I/And escric "NovaP@ss2" als camps "Nova contrasenya" i "Confirmació"  
  I/And clico "Canviar contrasenya"  
  Llavors/**Then** veig el missatge "Contrasenya actualitzada correctament"  
  I/And el formulari es tanca

Escenari: Contrasenya actual incorrecta  
  Donat/**Given** que estic a la pàgina del meu compte  
  I/And estic autenticat com a usuari registrat  
  Quan/**When** omplo "contraIncorrecta1\!" al camp "Contrasenya actual"  
  I/And escric "NovaP@ss2" als camps "Nova contrasenya" i "Confirmació"  
  I/And clico "Canviar contrasenya"  
  Llavors/**Then** veig el missatge d'error "La contrasenya actual no és correcta"  
  I el formulari no s'envia

Escenari: Nova contrasenya feble  
  Donat/**Given** que estic a la pàgina del meu compte  
  Quan/**When** omplo "P@ssw0rd1" al camp "Contrasenya actual"  
  I/And escric "1234" als camps "Nova contrasenya" i "Confirmació"  
  Llavors/**Then** veig el missatge "La contrasenya ha de tenir mínim 8 caràcters"  
  I/And el botó "Canviar contrasenya" resta desactivat

**Desglossament de tasques tècniques front-end específiques:**

### **🟢 Must-Have**

* Maquetar formulari de canvi de contrasenya amb HTML/CSS (camps: contrasenya actual, nova contrasenya, confirmació i botó)  
* Validació bàsica en enviar: comprovar que els camps no estan buits i que nova contrasenya i confirmació coincideixen  
* Mostrar missatges d'error i d'èxit

### **🟡 Should-Have**

* Validació en temps real mentre l'usuari escriu  
* Gestió de l'error "contrasenya actual incorrecta" rebut del servidor

### **🔵 Could-Have**

* Indicador visual de força de la nova contrasenya (barra de progrés)  
* Mostrar/amagar contrasenya amb icona d'ull a cada camp

### **🔴 Won't-Have**

* Canvi de contrasenya sense estar autenticat    
* Historial de contrasenyes usades anteriorment

**Enllaç al tauler Kanban**  
[https://trello.com/invite/b/69edcc240d0f3ebd39b26410/ATTIae06a65dc889aeaa9321f63562e680f67283B774/botigatech-canvi-de-contrassenya](https://trello.com/invite/b/69edcc240d0f3ebd39b26410/ATTIae06a65dc889aeaa9321f63562e680f67283B774/botigatech-canvi-de-contrassenya)  
