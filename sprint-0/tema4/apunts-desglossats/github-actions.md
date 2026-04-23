**GitHub Actions: automatització de tasques (CI/CD), execució de tests, desplegament**

## **Què és GitHub Actions?**

GitHub Actions és com tenir un robot dins de GitHub que s'activa automàticament quan fas alguna cosa al repositori (pujar codi, obrir una Pull Request...) i executa una sèrie de tasques per tu sense que hagis de fer res manualment.

Sense GitHub Actions hauries de fer tu tot a mà cada vegada: instal·lar dependències, passar els tests, desplegar al servidor... Amb GitHub Actions, tot passa sol.

**Què és CI/CD?**

**CI — Integració Contínua** significa que cada vegada que puges codi, s'executen automàticament els tests per comprovar que no has trencat res. L'objectiu és detectar errors el més aviat possible.

**CD — Desplegament Continu** significa que si el codi passa tots els tests, s'envia automàticament al servidor real sense que ningú hagi d'intervenir.

Resumit: **CI** és "comprova que el codi funciona" i **CD** és "si funciona, despega-ho".

**Els quatre conceptes clau**

**Workflow** és el procés automatitzat complet. Es defineix en un fitxer de text (format YAML) que guardes dins del repositori a la carpeta .github/workflows/.

**Event** és l'acció que activa el workflow. Pot ser un push, obrir una Pull Request, un horari programat o fins i tot activar-lo manualment des de la web de GitHub.

**Job** és un conjunt de passos que s'executen en una màquina virtual que GitHub posa a la teva disposició. Un workflow pot tenir múltiples jobs que s'executen en paral·lel o en seqüència.

**Step** és cada tasca individual dins d'un job. Pot ser una comanda de terminal o una action preconstruïda.

**Action** és una peça de codi reutilitzable que algú ja ha creat i pots usar directament, com per exemple una que instal·la Node.js o una que descarrega el codi del repositori.

**Com funciona un workflow típic**

Imagina que fas push a la branca main. GitHub detecta l'event i activa el workflow. Dins del workflow hi ha un job anomenat "tests" que arrenca una màquina virtual amb Ubuntu. Dins d'aquest job hi ha quatre steps: descarregar el codi, instal·lar Node.js, instal·lar les dependències amb npm i finalment executar els tests. Si tots els steps acaben bé, el job es marca com a completat. Si algun step falla, tot s'atura i GitHub t'avisa.

**CI i CD junts**

Un workflow complet sol tenir dos jobs encadenats: primer els tests i després el desplegament. La clau és que el job de desplegament **només s'executa si el job de tests ha passat**. Si els tests fallen, el desplegament no es fa mai. Això és el que fa que CI/CD sigui tan valuable: és impossible desplegar codi trencat per accident.

**On veus els resultats**

A la pestanya **Actions** del teu repositori a GitHub pots veure cada vegada que s'ha executat un workflow, si ha acabat bé (amb una marca verda) o ha fallat (amb una marca vermella), i el log detallat de cada step per saber exactament on ha fallat i per què.

Quan tens un workflow configurat, GitHub mostra directament a cada Pull Request si els tests passen o fallen, i fins i tot pot impedir que es fusioni si hi ha errors.

**On es guarda el workflow**

El fitxer del workflow es guarda dins del repositori a la carpeta .github/workflows/ amb extensió .yml. Això significa que el workflow forma part del codi, va a Git com qualsevol altre fitxer i qualsevol membre de l'equip pot veure'l i modificar-lo.

**Resum del flux complet**

Tu fas push → GitHub detecta l'event → s'activa el workflow → s'executa el job de tests en una màquina virtual → si tot va bé s'executa el job de desplegament → si hi ha errors s'atura i t'avisa.

