**¿Quins models de preu ofereixen Firebase, Supabase i Appwrite? Quins són els seus límits en plans gratuïts?**

**Firebase: pla Spark (gratuït) vs. Blaze (pay-as-you-go)**

Firebase ofereix dos plans: el Spark (gratuït, amb límits fixos) i el Blaze (pay-as-you-go, on pagues per ús). 

La gran diferència respecte a Supabase és el model de facturació: Firebase cobra per operació (lectures, escriptures, eliminacions), cosa que pot generar factures sorpresa en apps amb moltes consultes.

| FIREBASE SPARK (Gratuït):  Firestore:    → 1 GB d'emmagatzematge    → 50.000 lectures/dia    → 20.000 escriptures/dia    → 20.000 eliminacions/dia  Authentication:    → 10.000 MAUs (Monthly Active Users) al mes    → OAuth: gratuït  Cloud Functions:    → 125.000 invocacions/mes    → 40.000 GB-segon de temps de CPU    → 400.000 GB-segon de memòria  Firebase Storage:    → 5 GB d'emmagatzematge    → 1 GB/dia de descàrrega    → 20.000 uploads/dia  Hosting:    → 10 GB d'emmagatzematge    → 360 MB/dia de transferFIREBASE BLAZE (Pay-as-you-go):  → Tots els límits del Spark INCLOSOS \+ pagues el que superes  Firestore:    → $0.06 per 100.000 lectures (sobre el límit gratuït)    → $0.18 per 100.000 escriptures    → $0.02 per 100.000 eliminacions    → $0.18/GB/mes d'emmagatzematge  Authentication:    → MAUs fins a 10.000: gratuït    → 10.001 \- 100.000 MAUs: $0.0055/MAU    → \>100.000 MAUs: $0.0046/MAU  Cloud Functions:    → $0.40 per milió d'invocacions (sobre el límit) |
| :---- |

La diferència fonamental és el model de facturació. Supabase cobra per recursos consumits (mida de BD, emmagatzematge, usuaris actius mensuals). 

Firebase cobra per operacions realitzades (lectures, escriptures, eliminacions, invocacions de funcions). Aquesta distinció té implicacions massives per a la predictibilitat i l'optimització del cost.

**Supabase: Free → Pro → Team → Enterprise**

Supabase ofereix una estructura de preus per instància (no per operació), cosa que el fa molt més predictible que Firebase a escala. El pla Free és generós per a MVPs però els projectes es pausen automàticament.

| SUPABASE FREE (Gratuït):  Base de dades:    → 500 MB d'emmagatzematge PostgreSQL    → Peticions API: il·limitades    → 2 projectes actius màxim    → ⚠️ Projectes pausats automàticament       si no hi ha activitat en 7 dies\!  Authentication:    → 50.000 MAUs al mes    → OAuth providers: il·limitats  Storage:    → 1 GB d'emmagatzematge de fitxers  Ample de banda:    → 5 GB/mes  Edge Functions:    → 500.000 invocacions/mes  Temps real:    → 200 connexions concurrents    → 2 milions de missatges/mes  Limitació important: projectes pausats si inactivitat \> 7 dies  → en producció necessites el Pro com a mínimSUPABASE PRO ($25/mes per projecte):  Base de dades:    → 8 GB d'emmagatzematge    → $0.125/GB addicional  Authentication:    → 100.000 MAUs inclosos    → $0.00325/MAU addicional  Storage:    → 100 GB inclosos    → $0.021/GB addicional  Ample de banda:    → 250 GB/mes inclosos  Edge Functions:    → 2 milions d'invocacions/mes  Temps real:    → 500 connexions concurrents  Extras Pro:    → Point-in-Time Recovery (PITR)    → No pausa per inactivitat    → Backups diarisSUPABASE TEAM ($599/mes):  → Múltiples projectes  → SOC 2 Type 2 compliant  → HIPAA disponible  → Suport prioritariSUPABASE ENTERPRISE: preus personalitzats |
| :---- |

**Appwrite: Free → Pro → Scale → Self-Hosted**

Appwrite té una opció única: el self-hosting completament gratuït i sense límits. El pla cloud és de pagament per projecte (actualitzat setembre 2025).

| APPWRITE CLOUD FREE (Gratuït):  → 2 projectes màxim  → ⚠️ Projectes pausats si inactivitat \> 7 dies (igual que Supabase)  Bases de dades:    → 500.000 lectures/mes    → 250.000 escriptures/mes    → 500 MB d'emmagatzematge  Authentication:    → 75.000 MAUs/mes  Storage:    → 2 GB d'emmagatzematge  Funcions:    → 750.000 execucions/mes    → 512 MB RAM per funció    → 300 segons màxim d'execució  Ample de banda:    → 10 GB/mesAPPWRITE CLOUD PRO ($25/mes per projecte):  (actualitzat setembre 2025\)  → 2 TB d'ample de banda  → 1.750.000 lectures de BD  → 750.000 escriptures de BD  → 150 GB emmagatzematge de fitxers  → 3.500.000 MAUs  → Sense pausa per inactivitatAPPWRITE SELF-HOSTED:  → Completament GRATUÏT  → Sense límits imposats per Appwrite  → Únicament pagues el servidor propi    (DigitalOcean Droplet: \~$12/mes, AWS EC2: \~$10-20/mes)  → Docker Compose: instal·lació en una comanda  → Control total de les dades |
| :---- |

**Comparativa de preus: el cas d'ús real**

Per a aplicacions amb carregues de lectura/escriptura pesades, Supabase pot costar 3-5x menys que Firebase, d'acord amb comparatives de costos independents publicades el 2025 i 2026\.

Escenari: App de contingut (100K MAUs, 50K lectures/dia, 5K escriptures/dia)

| FIREBASE BLAZE:  Lectures/mes: 50.000 × 30 \= 1.500.000    → Gratuït: 50.000/dia \= 1.500.000/mes ← just al límit\!    → Si superes: 1.500.000 × $0.06/100K \= $0.90  Escriptures/mes: 5.000 × 30 \= 150.000    → Gratuït: 20.000/dia \= 600.000/mes ← no supera el límit  Auth: 100.000 MAUs    → $0.0055 × (100.000 \- 10.000) \= $0.0055 × 90.000 \= $495/mes\!  → Total estimat: \~$496/mes (dominat pel cost d'Auth\!)SUPABASE PRO:  → $25/mes base (inclou tot el del Pro)  → 100.000 MAUs inclosos  → Si superes: $0.00325/MAU addicional  → Total estimat: $25-50/mesAPPWRITE CLOUD PRO:  → $25/mes per projecte (3.5M MAUs inclosos\!)  → Total estimat: $25/mesAPPWRITE SELF-HOSTED:  → $12-20/mes (cost del servidor)  → Total estimat: $12-20/mes |
| :---- |

**El problema de la previsibilitat**

| FIREBASE: facturació per operació → IMPREVISIBLE  → Una funció mal escrita que fa moltes lectures pot disparar la factura  → Un moment viral → lectures × 100 → cost × 100  → Un listener en temps real mal configurat \= lectures constantsSUPABASE: facturació per instància → PREDICTIBLE  → $25/mes és $25/mes (+ overages per MAUs o storage)  → Les queries no costen per si mateixes  → Molt més fàcil de pressupostarAPPWRITE CLOUD: facturació per operació → MODERAT  → Similar a Firebase però amb límits generosos al Pro  → Self-hosted elimina tota incertesa de cost |
| :---- |

**Els tres plans gratuïts en una taula**

| Característica | Firebase Spark | Supabase Free | Appwrite Free |
| ----- | ----- | ----- | ----- |
| **BD emmagatzematge** | 1 GB (Firestore) | 500 MB (PostgreSQL) | 500 MB |
| **MAUs** | 10.000 | 50.000 | 75.000 |
| **Lectures/mes** | 50K/dia (1.5M/mes) | Il·limitades | 500.000 |
| **Escriptures/mes** | 20K/dia (600K/mes) | Il·limitades | 250.000 |
| **Storage fitxers** | 5 GB | 1 GB | 2 GB |
| **Ample de banda** | Variable | 5 GB | 10 GB |
| **Funcions** | 125K invocacions | 500K invocacions | 750K execucions |
| **Pausa per inactivitat** | ❌ No | ✅ Sí (7 dies) | ✅ Sí (7 dies) |
| **Projectes** | Il·limitats | 2 màxim | 2 màxim |
| **Self-host gratuït** | ❌ | ✅ | ✅ |
| **Model facturació** | Per operació | Per instància | Per operació/mes |

**Recomanació per cada cas**

| MÀXIM gratuït per a MVP llarg:  → Appwrite Self-Hosted ($12/mes de servidor, sense límits)  → Supabase Free (si toleres la pausa per inactivitat)MILLOR predicció de costos en producció:  → Supabase Pro ($25/mes base, no pagues per consulta)MILLOR ecosistema malgrat cost:  → Firebase Blaze (paga per ús, ideal per a Mobile \+ Google Cloud)MÉS MAUs per preu:  → Appwrite Pro ($25/mes per 3.5M MAUs vs Supabase $25/mes per 100K MAUs) |
| :---- |

