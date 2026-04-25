### **Exercici pràctic 2: Botiga online** 

#### Context

La botiga "BotigaTech" ven productes electrònics (mòbils, ordinadors, accessoris) i necessita un sitemap clar per guiar el desenvolupament de la seva aplicació web.

#### Objectius d'aprenentatge

Crear un sitemap estructurat que representi la jerarquia de pàgines i la navegació d’una botiga online fictícia (ex: "BotigaTech").

#### Passos a seguir

1. Configura Draw.io  
   * » Obre [Draw.io](https://app.diagrams.net/) i tria la plantilla "Flowchart" o "Blank Diagram".  
2. Defineix la jerarquia principal  
   * » Crea nodes per a les pàgines principals:  
     * Pàgina d’inici ( /)  
     * Productes ( /productes)  
     * Categories ( /categories)  
     * Cistella ( /cistella)  
     * Compte d’usuari ( /compte)  
     * Contacte ( /contacte)  
3. Afegeix subpàgines  
   * » Sota Productes, inclou:  
     * Detall d’un producte ( /productes/{id}).  
   * » Sota Categories, inclou:  
     * Mòbils ( /categories/mobils), Ordinadors ( /categories/ordinadors), Accessoris ( /categories/accessoris).  
4. Connexions i navegació  
   * » Uneix els nodes amb fletxes per indicar el flux de navegació.  
   * » Exemple: Pàgina d’inici → Productes → Detall del producte.  
5. Elements visuals  
   * » Utilitza icones (Draw.io té una llibreria integrada) per diferenciar tipus de pàgines:  
     * 🛒 per la cistella.  
     * 📱 per categories de mòbils.  
6. Bonus track  
   * » Afegeix notes als nodes per explicar decisions (ex: "La pàgina de contacte inclou formulari i mapa").  
7. Bonus Bonus  
   * » Exporta el sitemap com a XML i penja’l a GitHub amb un fitxer README.md que l’expliqui.  
   * » Crea una versió responsive del sitemap que mostri com s’adaptaria la navegació a mòbil.

