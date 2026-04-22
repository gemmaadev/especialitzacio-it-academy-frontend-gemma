1. Preparació inicial

**cd \~/itacademy-projects-gemma/sprint-1**

» Dins de sprint-1 crea una nou directori un directori nou anomenat projecte-secret.

**mkdir projecte-secret**  
**cd projecte-secret**

» Dins de projecte-secret, crea un fitxer anomenat clau.txt amb el contingut: "Això és una clau secreta\!" (Recorda que el text l'has d'inserir al document mitjançant l'ús de la terminal)

**echo "Això és una clau secreta\!" \> clau.txt**

*   
2. Verificació de permisos actuals

» Executa ls \-l \~/projecte-secret i observa els permisos del fitxer clau.txt (ex: \-rw-r--r--).

**ls \-l \~/itacademy-projects-gemma/sprint-1/projecte-secret**

*   
3. Modificació de permisos

» Canvia els permisos de clau.txt perquè només el propietari pugui llegir-lo i escriure’l

**chmod 600 clau.txt**  
**ls \-l** 

*   
4. Simulació d’accés denegat

» Obre una nova terminal o canvia d’usuari (opcional amb su).

» Intenta llegir el fitxer amb. (Resultat esperat: Permission denied)

**sudo \-u nobody cat \~/itacademy-projects-gemma/sprint-1/projecte-secret/clau.txt**

*   
5. Gestió de permisos per a directoris

» Canvia els permisos del directori projecte-secret perquè només el propietari hi pugui accedir:

**cd ..**  
**chmod 700 projecte-secret**  
**ls \-l**

» Verifica que altres usuaris no puguin veure el contingut del directori.

**sudo \-u nobody ls \~/itacademy-projects-gemma/sprint-1/projecte-secret**  
