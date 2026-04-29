## **HTML Semàntic: per què importa més que els `<div>`**

**Semantic HTML5 Elements Explained**  
[https://www.freecodecamp.org/news/semantic-html5-elements/](https://www.freecodecamp.org/news/semantic-html5-elements/)  
Elements semàntics d’HTML5 i per què milloren accessibilitat i SEO.

**El problema del `<div>` per a tot**

Quan internet va créixer i la gent va voler fer webs més boniques, els programadors van començar a usar etiquetes genèriques "no semàntiques" com `<div>`. Sovint donaven a aquests elements un atribut `class` o `id` per descriure el seu propòsit. Per exemple, en lloc de `<header>` s'escrivia `<div class="header">`.

Això funciona visualment, però crea un problema greu: una màquina que llegeix el codi (un lector de pantalla, un motor de cerca) veu una pila de `<div>` tots iguals i no entén quina és la capçalera, quina és la navegació, quin és el contingut principal. És com un document sense títols ni seccions: es pot llegir però costa entendre.

**Què és l'HTML semàntic?**

Els elements HTML semàntics són aquells que descriuen clarament el seu significat d'una manera llegible tant per humans com per màquines. Elements com `<header>`, `<footer>` i `<article>` es consideren semàntics perquè descriuen amb precisió el propòsit de l'element i el tipus de contingut que contenen.

Elements com `<header>`, `<nav>`, `<section>`, `<article>`, `<aside>` i `<footer>` funcionen més o menys com elements `<div>`. Agrupen altres elements en seccions de la pàgina. Però on un `<div>` podria contenir qualsevol tipus d'informació, és fàcil identificar quin tipus d'informació aniria en una regió semàntica `<header>`.

**Els tres beneficis principals**

**Llegibilitat del codi** — és molt més fàcil de llegir. Com a programadora pots estar llegint centenars o milers de línies de codi. Com més fàcil és llegir i entendre el codi, més fàcil es fa la teva feina.

**Accessibilitat** — tens major accessibilitat. No ets l'única que troba els elements semàntics més fàcils d'entendre. Els motors de cerca i les tecnologies d'assistència (com els lectors de pantalla per a usuaris amb discapacitat visual) també poden entendre millor el context i el contingut del teu lloc web, cosa que significa una millor experiència per als teus usuaris.

**Consistència** — els elements semàntics condueixen a codi més consistent. Quan es crea una capçalera amb elements no semàntics, diferents programadors podrien escriure `<div class="header">`, `<div id="header">`, `<div class="head">` o simplement `<div>`. Hi ha tantes maneres de crear un element de capçalera, i totes depenen de la preferència personal del programador. Creant un element semàntic estàndard, és més fàcil per a tothom.

**Com funcionen els lectors de pantalla**

Un lector de pantalla és una tecnologia d'assistència que llegeix en veu alta el contingut d'una pàgina per a persones amb discapacitat visual. Quan el HTML és semàntic, el lector de pantalla pot oferir una navegació molt més útil:

Amb `<div>` per a tot, el lector de pantalla llegeix el contingut d'inici a fi sense poder saltar entre seccions. Amb HTML semàntic, l'usuari pot demanar al lector que llisti totes les regions de la pàgina, saltar directament a la navegació principal (`<nav>`), anar al contingut principal (`<main>`), saltar-se la capçalera (`<header>`) si ja la coneix, o navegar entre articles (`<article>`) sense llegir tot el contingut.

**Els elements semàntics més importants**

**`<header>`** — generalment es troba a la part superior d'un document, una secció o un article i normalment conté el títol principal i algunes eines de navegació i cerca.

\<header\>  
  \<h1\>Nom de l'empresa\</h1\>  
  \<nav\>...\</nav\>  
\</header\>

**`<nav>`** — serveix per a la navegació entre pàgines. Pots tenir qualsevol nombre d'elements `<nav>` en una pàgina. És comú tenir navegació global a la part superior (dins del `<header>`) i navegació local en un sidebar (dins d'un element `<aside>`).

\<nav\>  
  \<ul\>  
    \<li\>\<a href="/inici"\>Inici\</a\>\</li\>  
    \<li\>\<a href="/sobre"\>Sobre nosaltres\</a\>\</li\>  
  \</ul\>  
\</nav\>

**`<section>` i `<article>`** — tots dos s'usen per seccionar contingut. Un `<article>` és per a contingut que es pot distribuir o reutilitzar de manera independent. Una `<section>` és un agrupament temàtic de contingut.

\<section\>  
  \<article\>  
    \<h2\>Notícia 1\</h2\>  
    \<p\>Contingut de la notícia...\</p\>  
  \</article\>  
  \<article\>  
    \<h2\>Notícia 2\</h2\>  
    \<p\>Contingut de la notícia...\</p\>  
  \</article\>  
\</section\>

**`<aside>`** — és per a contingut que no forma part del flux principal del text on apareix, però que hi està relacionat. Pensa en `<aside>` com un sidebar del contingut principal.

**`<footer>`** — generalment es troba a la part inferior d'un document, una secció o un article. Igual que el `<header>`, el contingut és generalment metainformació, com detalls de l'autor, informació legal i/o enllaços a informació relacionada.

**`<main>`** — representa el contingut principal i únic de la pàgina. Només n'hi pot haver un per pàgina. Els lectors de pantalla el usen per saltar directament al contingut rellevant.

**`<figure>` i `<figcaption>`** — `<figure>` serveix per embolcallar el contingut d'una imatge, i `<figcaption>` per afegir-hi un peu de foto.

\<figure\>  
  \<img src="grafic.jpg" alt="Gràfic de vendes" /\>  
  \<figcaption\>Evolució de les vendes al Q3\</figcaption\>  
\</figure\>

**`<time>`** — permet adjuntar una data ISO 8601 inequívoca a una versió llegible per humans d'aquella data. Mentre els humans poden llegir el temps desambiguant pel context, els ordinadors poden llegir la data ISO i interpretar la data, l'hora i el fus horari.

\<time datetime="2025-04-21"\>21 d'abril de 2025\</time\>

**Comparació visual: semàntic vs. no semàntic**  
\<\!-- ❌ No semàntic: tot és un div \--\>  
\<div id="header"\>  
  \<div class="nav"\>...\</div\>  
\</div\>  
\<div class="main"\>  
  \<div class="article"\>...\</div\>  
\</div\>  
\<div id="footer"\>...\</div\>

\<\!-- ✅ Semàntic: el codi s'explica sol \--\>  
\<header\>  
  \<nav\>...\</nav\>  
\</header\>  
\<main\>  
  \<article\>...\</article\>  
\</main\>  
\<footer\>...\</footer\>

**La regla pràctica**

Usa `<div>` únicament quan necessitis un contenidor per a estils o JavaScript i cap element semàntic descriu bé el contingut. Si pots respondre a la pregunta "quin tipus de contingut és?" amb un element HTML específic, usa'l. Si la resposta és "simplement un contenidor sense significat concret", llavors usa `<div>`.

