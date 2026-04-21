# **Apunts tema 2: Terminal: ordres bàsiques**

Fonaments de la línia de comandes, gestió de fitxers, permisos i configuració de l'entorn de desenvolupament.

## **1\. Introducció al terminal**

El terminal és l'eina principal de qualsevol desenvolupador web per interactuar amb el sistema operatiu de forma eficient.

* **Shell:** És l'intèrpret de comandes. El programa que rep el que escrius i ho executa (el més comú és Bash o Zsh).  
* **Terminal vs. GUI:** Mentre que la GUI (Interfície Gràfica) és visual i intuïtiva, el terminal permet automatitzar tasques, gestionar servidors remots i executar eines de programació que no tenen botons.

**2\. El sistema de fitxers a Linux**  
A diferència de Windows, a Linux tot penja d'una única arrel.

* **Directori arrel (**/**):** El nivell més alt del sistema.  
* **Ruta absoluta:** El camí complet des de l'arrel (ex: /home/usuari/projecte).  
* **Ruta relativa:** El camí des d'on et trobes ara (ex: ./imatges o ../parent).  
* **Dreceres:** . (directori actual), .. (directori superior), \~ (carpeta personal de l'usuari/home).

**3\. Comandes bàsiques de gestió**

| Comanda | Funció | Exemple |
| :---- | :---- | :---- |
| pwd | Mostra on ets ara (Print Working Directory) | pwd |
| ls | Llista els fitxers i carpetes (ls \-la per veure ocults) | ls \-l |
| cd | Canvia de directori | cd Documents |
| mkdir | Crea una carpeta nova | mkdir nou\_projecte |
| touch | Crea un fitxer buit | touch index.html |
| cp | Copia fitxers o carpetes (-r per carpetes) | cp file.txt copy.txt |
| mv | Mou o canvia el nom d'un fitxer | mv vell.txt nou.txt |
| rm | Elimina fitxers (rm \-rf per carpetes i contingut) | rm fitxer.js |
| cat | Mostra el contingut d'un fitxer pel terminal | cat logs.txt |
| grep | Cerca un text dins d'un fitxer o llista | grep "error" logs.txt |

**4\. Permisos de fitxers**  
Linux és multiusuari i cada fitxer té propietaris i permisos definits en tres grups: **Usuari (u)**, **Grup (g)** i **Altres (o)**.

* **Tipus de permisos**: r (read/lectura), w (write/escriptura), x (execute/execució).  
* Notació Octal: \* 7 (rwx), 6 (rw-), 5 (r-x), 4 (r--).  
  * Exemple: chmod 755 fitxer → L'usuari fa de tot, la resta només llegeix i executa.  
* **Co**mandes:  
  * chmod: Canvia els permisos.  
  * chown: Canvia el propietari del fitxer.

**5\. Manipulació de text i fluxos**  
Pots connectar comandes per fer tasques potents:

* **Redireccions:**  
  * \> : Envia la sortida a un fitxer (sobreescriu).  
  * \>\> : Afegeix la sortida al final d'un fitxer (sense esborrar l'anterior).  
* Pipes (|): Passa el resultat d'una comanda a una altra. (Ex: ls | grep ".js" llista només fitxers JavaScript).  
* Editors: nano (senzill i ràpid) o vim (potent però complex) per editar fitxers sense sortir del terminal.

**6\. Gestió de processos**  
Controla el que l'ordinador està executant:

* **ps / top:** Mostren els processos actius i el consum de recursos (CPU/RAM).  
* **kill**: Atura un procés utilitzant el seu ID (PID). Ex: kill \-9 1234\.  
* Segon pla: Afegeix & al final d'una comanda per seguir usant el terminal mentre s'executa. Ctrl+Z atura un procés i bg el passa a segon pla.

**7\. Variables d'entorn**  
Són valors que configuren el comportament del sistema i les aplicacions.

* **PATH:** La variable més important. Diu al sistema en quines carpetes ha de buscar els programes quan escrius una comanda.  
* **Comandes:**  
  * echo $NOM: Mostra el valor d'una variable.  
  * export NOM="valor": Crea o modifica una variable.  
* Fitxers de configuració: .bashrc o .zshrc. Són fitxers ocults a la teva carpeta personal on guardes configuracions i "àlies" perquè es carreguin cada cop que obres el terminal.

**Tip del terminal:** Per recordar exactament una comanda o si vull saber què fan les meves opcions, escriure man seguit de la comanda (ex: man ls) per llegir el manual oficial.  
