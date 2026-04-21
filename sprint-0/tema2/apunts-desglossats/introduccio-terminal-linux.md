**Introducció al terminal Linux: concepte de shell, terminal vs. interfície gràfica (GUI)**

## **1\. Conceptes bàsics**

### **1.1. Què és el Terminal?**

El terminal és una interfície de línia de comandes (CLI) que s'utilitza per enviar comandes a l'ordinador i rebre'n informació. Històricament, en els primers dies de la informàtica, el terminal era un dispositiu físic separat que s'utilitzava per enviar comandes a l'ordinador principal.

Avui dia, el programa de terminal que s'utilitza per executar comandes Bash variarà segons el sistema operatiu de l'ordinador:

* **Mac**: Terminal (natiu, utilitza Bash)  
* **Linux**: Terminal o Terminal Emulator  
* **Windows**: Git Bash (cal instal·lar-lo)

### **1.2. Què és un Shell?**

Shell és el programa principal que els ordinadors utilitzen per rebre codi (comandes) i retornar informació produïda per l'execució d'aquestes comandes (sortida). El shell actua com a intèrpret entre l'usuari i el sistema operatiu.

**Característiques del Shell:**

* Interpreta i executa les comandes introduïdes per l'usuari  
* Proporciona un entorn per executar aquestes comandes  
* Permet l'automatització de tasques mitjançant scripts

### **1.3. Què és Bash?**

Bash (també conegut com "Bourne Again SHell") és una implementació de Shell que permet realitzar moltes tasques de manera eficient. És el shell per defecte en la majoria de distribucions Linux i fins fa poc també ho era en macOS.

**Bash és dues coses alhora:**

1. **Un shell**: La part shell de Bash és responsable d'interpretar i executar comandes introduïdes per l'usuari  
2. **Un llenguatge**: Permet utilitzar sintaxi de programació al voltant de les comandes conegudes

### **1.4. Diferències entre Terminal, Shell i Bash**

El terminal és l'escenari, el shell (Bash) és l'actor que executa comandes en aquest escenari.

**Relació entre conceptes:**

* **Terminal**: La interfície gràfica que mostra el text  
* **Shell**: El programa que s'executa dins del terminal  
* **Bash**: Un tipus específic de shell

Per a molts usuaris nous, no hi ha separació entre el concepte de Bash i el concepte de Linux: és la proverbial pantalla negra amb text verd on s'ha de codificar què ha de fer l'ordinador a continuació.

## **2\. Terminal vs. Interfície Gràfica (GUI)**

### **2.1. Què és una GUI?**

La interfície gràfica d'usuari (GUI) es basa en gràfics i elements visuals, permetent als usuaris interactuar amb el sistema utilitzant un teclat i un ratolí. Les GUIs proporcionen finestres, menús, botons, icones i assistents per facilitar la gestió del sistema.

### **2.2. Comparativa: Terminal (CLI) vs. GUI**

#### **Avantatges del Terminal (CLI)**

**1\. Rendiment i recursos**

* Un ordinador que només utilitza la interfície de línia de comandes no requereix tants recursos del sistema com una GUI  
* La GUI requereix més memòria i potència de processament, fent-la més lenta que la CLI

**2\. Velocitat d'execució**

* Els usuaris de línia de comandes només necessiten un teclat per navegar per la interfície, sovint resultant en un rendiment més ràpid  
* Els programes CLI no necessiten preocupar-se de rastrejar o alterar gràfics

**3\. Automatització**

* És fàcil escriure codi que manipula text, però és molt més difícil escriure codi que manipula GUIs  
* Es poden utilitzar Bash per realitzar operacions en múltiples fitxers ràpidament via línia de comandes


**4\. Control i precisió**

* CLI és adequada per a escenaris on la precisió i l'exactitud són crítiques, com l'administració de servidors, la programació o l'automatització  
* Es dona molt més control sobre l'ordinador a través d'una CLI

**5\. Accés remot**

* Per connectar-se a un sistema remot com un servidor privat virtual (VPS), Linux utilitza un protocol àmpliament conegut anomenat SSH  
* SSH és una manera segura, de confiança i ràpida d'executar comandes al teu escriptori remot

**6\. Estabilitat i consistència**

* Un usuari que va aprendre la línia de comandes de Linux fa 20 anys encara pot utilitzar-la avui sense necessitat d'aprendre més

**7\. Accés anticipat a funcionalitats**

* En diversos projectes de codi obert, els desenvolupadors solen proporcionar primer accés de línia de comandes a les seves aplicacions

#### **Avantatges de la GUI**

**1\. Facilitat d'aprenentatge**

* Per a un nou usuari d'ordinador, trobarà que utilitzar una GUI és més fàcil que una línia de comandes  
* Les característiques clau de la GUI són la intuïció i la simplicitat

**2\. Visualització**

* Millor per a aplicacions que requereixen molt feedback visual (jocs, editors de vídeo/gràfics/so)  
* Una GUI té més colors i és més visualment atractiva

**3\. Multitasca**

* Una GUI ofereix a l'usuari més capacitats amb multitasca que una CLI

**4\. No requereix memorització**

* Els usuaris no han de recordar una comanda específica sinó que interactuen principalment utilitzant el ratolí

#### **Desavantatges del Terminal (CLI)**

* A causa del major grau de memorització i familiaritat necessaris per a l'operació i la navegació, els nous usuaris troben més difícil operar una interfície de línia de comandes que una GUI  
* Una interfície de línia de comandes sovint és bàsica i pot ser més una càrrega per a la visió de l'usuari

#### **Desavantatges de la GUI**

* Requereix més recursos del sistema (memòria RAM, potència de processament)  
* Menys control sobre el sistema  
* Dificultat per automatitzar tasques  
* Les interfícies canvien amb el temps, requerint re-aprenentatge

## **3\. Funcionament del Terminal**

### **3.1. El Prompt**

Quan s'inicia un terminal executant el shell Bash, l'usuari es troba amb un prompt. Un prompt és un símbol, normalment un signe de dòlar ($), que indica que el shell està esperant la teva entrada.

### **3.2. Execució de comandes**

Bash és només una aplicació, i el seu treball principal és executar altres aplicacions (en forma de comandes) que estan instal·lades al mateix sistema.

**Tipus de comandes:**

1. **Comandes externes**: Programes instal·lats al sistema  
2. **Comandes integrades**: Algunes comandes estan integrades a Bash. La majoria de comandes integrades són específiques per a scripts de Bash o configuracions d'entorn de baix nivell

### **3.3. La variable PATH**

Quan el shell busca comandes externes, es basa en la variable del Bourne shell $PATH. $PATH conté una llista de directoris separats per dos punts. Començant pel directori més a l'esquerra i seleccionant directoris en un patró d'esquerra a dreta, es busca cada directori fins que es troba una coincidència.

## **4\. Scripts de Bash**

### **4.1. Què és un script de Bash?**

Un script de Bash és un fitxer que conté una seqüència de comandes que són executades pel programa bash línia per línia.

### 

### 

### **4.2. Característiques dels scripts**

**Shebang:** Els scripts de Bash comencen amb un shebang. Shebang és una combinació de bash \# i bang \!

Exemple:

bash  
**\#\!/bin/bash**

**Extensió de fitxer:** Per convenció de nomenament, els scripts de bash acaben amb .sh. No obstant això, els scripts de bash poden executar-se perfectament sense l'extensió sh.

**Comentaris:** Els comentaris comencen amb un \# en els scripts de bash. Això significa que qualsevol línia que comenci amb un \# és un comentari i serà ignorada per l'intèrpret.

## **5\. Verificació de Bash al sistema**

Per comprovar si hi ha Bash al teu ordinador, pots escriure "bash" al teu terminal obert i prémer la tecla enter.

Per saber quin shell s'està executant:

bash  
echo $0

Per esbrinar si estàs executant un shell Bash, pots utilitzar la comanda echo juntament amb una variable especial que representa el nom del procés que s'està executant actualment.

## **6\. Quan utilitzar Terminal vs. GUI?**

**Utilitza el Terminal quan:**

* Treballis amb servidors remots  
* Necessitis automatitzar tasques repetitives  
* Busquis màxim rendiment i eficiència  
* Gestiones sistemes amb recursos limitats  
* Treballs en administració de sistemes  
* Necessitis control precís sobre el sistema

**Utilitza la GUI quan:**

* Siguis un usuari nou a Linux  
* Treballs amb aplicacions gràfiques (edició d'imatge, vídeo, etc.)  
* Necessitis visualitzar dades de manera intuïtiva  
* Realitzis tasques ocasionals que no requereixin automatització

## **7\. Altres shells disponibles**

Els sistemes Linux i Unix suporten múltiples shells. Tot i que Bash és el més àmpliament utilitzat, altres com Zsh, Fish i Dash també són populars tant per a ús interactiu com per a scripts.

## **Conclusions**

Bash (Bourne Again Shell) és un poderós intèrpret de línia de comandes i llenguatge d'scripts que serveix com a shell per defecte en la majoria de distribucions Linux i macOS. Tot i que la corba d'aprenentatge inicial pot ser més pronunciada que amb una GUI, la línia de comandes de Linux té avantatge quan es tracta de rendiment, control i facilitat d'ús.

La clau està en entendre que tant el terminal com la GUI tenen el seu lloc, i la competència en ambdós farà de tu un usuari de Linux més eficient i versàtil.

