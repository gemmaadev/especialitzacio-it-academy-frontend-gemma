### **Exercici pràctic 1: Maquetació Adaptativa i Accesible \- Implementació Vanilla I**

Reproduiràs el disseny de una pàgina web, que es proponga a l'itinerari, adaptada a diferents amples de pantalles i accesible a personas amb dificultats visuals.

#### Objectiu

* »Practicar CSS Grid per a layouts complexes.  
* »Dominar Flexbox per a alinear contingut dins de cel·les de la graella.  
* »Utilitzar unitats relatives (rem, %) per a mantenir proporcions.  
* »Aplicar accessibilitat bàsica amb etiquetes semàntiques.  
* »Aplicar regles de maquetació mobile-first.  
* »Aplicar bones pràctiques de maquetació.

#### Passos a seguir

1. Preparació del repositori:  
   * »Clona el repositori amb les instruccions:

| $ git clone https://github.com/IT-Academy-BCN/it-sprint1-maquetacio.git$ cd it-sprint1-maquetacio |
| :---- |

   * » Desconnecta el teu repositori del repositori de IT Academy. Utilitza la següent ordre de git:

| $ git remote rm origin |
| :---- |

   * » Connecta el teu repositori amb el teu compte de GitHub:

| $ git remote add origin |
| :---- |

   * » Treballa amb la rama feature/vanilla-implementation  
2. Estructura bàsica  
   * »Crea l'estructura bàsica de l'html (utilitza alguna dreçera de teclat de vscode) i conecta'l amb la fulla de estils. Fes el primer commit (recorda seguir les convencions als commits).  
3. Continua amb la maquetació  
4. Observa el disseny i descompon-lo en blocs visuals:  
   * »Identifica com es distribueixen els elements (alineacions, jerarquia, espais).  
   * »Determina quines parts requereixen una graella fixa i quines poden ser flexibles.  
   * »Segueix els consells de l'article [A Step-By-Step Process for Turning Designs Into Code](https://css-tricks.com/a-step-by-step-process-for-turning-designs-into-code/)  
5. Configuració inicial  
   * »Escull etiquetes semàntiques o genèriques segons el context per definir l'estructura de la pàgina.  
6. Experimenta amb Grid i Flexbox  
   * »Per a la disposició global: Prova diferents enfocaments amb CSS Grid (grid-template-rows/columns, gap).  
   * »Per a components interns:  
     * Quina tècnica (Flexbox o subgrid) permet controlar millor l’espaiat entre línies de text?  
7. Tipografia adaptable  
   * »Simula la font del disseny o utilitza alguna extensió del navegador per capturar la font més propera.  
   * »Ajusta mides de text amb clamp() per a escalat fluid.  
8. Accessibilitat  
   * »Afegeix aria-label al contenidor principal per descriure la pàgina.  
   * »Prova el contrast de color, busca alguna eina per chequear el contrast.  
9. Detecció de errors  
   * »Porta la pàgina a algún validador de codi html com [W3C Validator](https://validator.w3.org/)  
   * »Exporta tu disseny a PDF i compara’l amb la imatge original usant eines com [PerfectPixel](https://www.welldonecode.com/perfectpixel/) per detectar desajustos.  
10. Valora el rendiment de la teva pàgina amb l'eina "Lighthouse" del navigador

