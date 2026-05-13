## **Google Research: ML-Enhanced Code Completion i productivitat**

###### 

###### **AI-Assisted Programming: Best Practices** [https://research.google/blog/ml-enhanced-code-completion-improves-developer-productivity/](https://research.google/blog/ml-enhanced-code-completion-improves-developer-productivity/)

Article de Google AI Blog sobre com el ML millora l’autocompletat i les pràctiques de programació.

**L'article de Google Research: el context**

L'article "ML-Enhanced Code Completion Improves Developer Productivity" de Google Research, publicat el juliol de 2022 per Maxim Tabachnyk i Stoyan Nikolov, descriu com Google va combinar ML i motors semàntics (SE) per desenvolupar un nou completat de codi ML semàntic híbrid basat en Transformers, ara disponible per als developers interns de Google.

**L'arquitectura híbrida: ML \+ Motor Semàntic**

Aquesta nova arquitectura ha aprofitat tant un transformer de sistema com un motor semàntic com a solució híbrida. Per a la primera part, un transformer és entrenat basant-se en el repositori de codi. Entrenen un model únic en vuit llenguatges (C++, Java, Python, Go, TypeScript, Proto, Kotlin i Dart).

En la pràctica, els motors semàntics s'executen al núvol, proporcionant serveis de llenguatge (per exemple, completat semàntic, diagnòstics, etc.) amb els quals els developers estan familiaritzats. 

Els SEs es basen en una biblioteca interna que ofereix funcionalitats similars a les del compilador amb latències baixes. A causa de la configuració del disseny, on les peticions es fan en paral·lel i el ML és típicament més ràpid de servir (\~40 ms de mediana), no s'afegeix cap latència als completats.

Les tres maneres de combinar ML i motors semàntics:

1\. Re-ranking: els SEs suggereixen tokens, el ML els reordena  
   per posar els més probables al capdamunt

2\. Completat single i multi-línia: el ML genera, el SE  
   verifica la correcció sintàctica i semàntica

3\. Continuació híbrida: el SE suggereix el primer token,  
   el ML continua la completació de manera coherent

**Els resultats quantitatius: la investigació real de Google**

Es compara el completat de codi ML semàntic híbrid de 10.000+ Googlers (durant tres mesos en vuit llenguatges de programació) amb un grup de control i s'observa una reducció del 6% en el temps d'iteració de codificació (temps entre builds i tests) quan s'exposa al completat ML d'una sola línia. 

Aquests resultats demostren que la combinació de ML i SEs pot millorar la productivitat del developer.

S'observa una millora significativa de qualitat en l'ús real. Per al 28% de les completions acceptades, el rang de la completació és superior degut al boosting, i en un 0.4% dels casos és pitjor. A més, s'observa que els usuaris escriuen \>10% menys caràcters abans d'acceptar una suggerència de completació.

**Comparativa dels resultats d'investigació sobre productivitat**

L'estudi de Google té un resultat titular clar: els developers que usaven eines d'IA van completar tasques un 21% més ràpid que els seus homòlegs sense IA. De mitjana, el grup assistit per IA va acabar en 96 minuts, en comparació amb 114 minuts per al grup de control.

Un altre estudi, que va examinar developers de Microsoft, Accenture i una empresa Fortune 100 anònima, va reportar un increment de productivitat del 26% amb GitHub Copilot. Això suggereix que mentre les eines Gen AI poden millorar significativament la productivitat, la millora depèn del nivell d'experiència dels developers i de l'entorn.

L'estudi METR va testar 16 developers de codi obert experimentats amb 246 tasques reals usant Cursor Pro amb models Claude. Els resultats van desafiar les afirmacions dels proveïdors de guanys de productivitat del 50-100%. Els developers individuals van completar un 21% més de tasques, però el temps de revisió va augmentar un 91% a mesura que els equips generaven un 98% més de pull requests. Els guanys de productivitat van desaparèixer en cues de revisió ampliades.

La paradoxa important: L'enquesta de Stack Overflow 2025 confirma l'adopció massiva: el 84% dels developers estan usant o planegen usar eines d'IA. Però quan se'ls pregunta sobre l'impacte, únicament el 16.3% va reportar que la IA els va fer significativament més productius, mentre que el 41.4% va dir que no va tenir cap efecte o poc efecte.

**Les bones pràctiques que emerge de la investigació**

1. **La combinació híbrida és superior al ML pur:** el motor semàntic verifica la correcció sintàctica mentre el ML aporta la intel·ligència de context. Cap dels dos és òptim per si sol.  
2. **Acceptació vs. percepció:** els números d'acceptació de suggerències no son iguals a productivitat real. Cal mesurar el temps real entre builds i la qualitat del codi final.  
3. **El context del projecte és crític:** a inference time, els models de ML típicament no son conscients de codi fora de la seva finestra d'input, i el codi vist durant l'entrenament pot no tenir les addicions recents necessàries per a completions en repositoris en canvi actiu.  
4. **La latència importa per a l'adopció:** no s'afegeix cap latència als completats és un factor crític d'adopció. Una eina que interrumpe el flux és pitjor que no tenir-ne cap.

**Les limitacions reconegudes per Google**

Això porta a un inconvenient comú del completat de codi impulsat per ML on el model pot suggerir codi que... no és consistent amb el codi recent afegit al repositori. El model no "veu" els canvis fets per l'equip des del seu entrenament o fora de la seva finestra de context.

La qüestió de com el completat de codi impulsat per machine learning impacta en la productivitat del developer, més enllà de la productivitat percebuda i les suggerències acceptades, roman oberta.

**El que la investigació diu en conjunt: síntesi**

| Estudi | Mètode | Resultat |
| ----- | ----- | ----- |
| **Google Research (2022)** | 10k+ devs, 3 mesos, 8 llenguatges | \-6% temps d'iteració, \-10% caràcters escrits |
| **Google RCT (2024)** | 96 devs full-time, tasques enterprise | \+21% velocitat (96 vs 114 min) |
| **GitHub Copilot (MS/Accenture)** | Devs professionals, producció | \+26% productivitat |
| **METR (2025)** | 16 devs open-source, 246 tasques reals | \+21% tasques completades, \+91% temps revisió |
| **Stack Overflow Survey 2025** | 84% adopció | Únicament 16.3% reporta millora significativa |

La conclusió equilibrada: els guanys de productivitat son reals però depenen fortament del tipus de tasca, l'experiència del developer, el context del projecte i com s'integra l'eina en el flux de treball. 

La millora en velocitat d'escriptura de codi pot quedar cancel·lada per l'increment en temps de revisió si no s'estableixen processos adequats.

