## **MongoDB University: Guia de cursos gratuïts**

###### **MongoDB University: Free Courses** [https://learn.mongodb.com/](https://learn.mongodb.com/) Cursos gratuïts en línia de MongoDB University per aprendre NoSQL i MongoDB.

**Què és MongoDB University**

MongoDB University permet descobrir cursos de gestió de bases de dades MongoDB i obtenir certificats professionals. La formació és gratuïta. La plataforma ofereix més de 100 cursos organitzats en **Learning Paths** (itineraris formatius), **cursos independents** i **Learning Bytes** (mòduls curts de 15-30 minuts).

**El Learning Path principal: MongoDB Node.js Developer Path**

El path de Node.js cobreix els fonaments de bases de dades, el model de documents, l'arquitectura de BD distribuïda i com desplegar un clúster MongoDB Atlas. Inclou gestió de bases de dades, col·leccions i documents, modelatge de dades bàsic, connexió amb connection strings, el driver Node.js, pipelines d'agregació, índexs, Atlas Search, transaccions ACID, i MongoDB Compass (la GUI oficial).

Els mòduls del path per ordre:

Mòdul 1: Getting Started with MongoDB Atlas  
  → Crear compte, desplegar primer clúster gratuït  
  → Model de document vs. model relacional  
  → Arquitectura distribuïda de MongoDB

Mòdul 2: MongoDB and the Document Model  
  → Col·leccions, documents, BSON  
  → Diferències amb taules i files SQL

Mòdul 3: MongoDB Data Modeling Intro  
  → Disseny d'esquemes per a documents  
  → Patrons d'embedding vs. referencing

Mòdul 4: Connecting to MongoDB in Node.js  
  → Connection strings i MongoDB Atlas  
  → Driver oficial de Node.js

Mòdul 5: CRUD Operations (Node.js)  
  → insertOne, insertMany  
  → findOne, find, filtres i projeccions  
  → updateOne, updateMany, $set, $push  
  → deleteOne, deleteMany

Mòdul 6: MongoDB Aggregation  
  → Aggregation Pipeline: $match, $group, $sort, $project  
  → Anàlisi i transformació de dades

Mòdul 7: MongoDB Indexes  
  → Single, compound i multikey indexes  
  → Explain plans i optimització de consultes

Mòdul 8: MongoDB Atlas Search  
  → Full-text search integrat  
  → Combinació de BD, motor de cerca i sincronització

Mòdul 9: MongoDB ACID Transactions  
  → Transaccions multi-document  
  → Quan usar-les vs. operacions atòmiques simples

Mòdul 10: MongoDB Compass  
  → GUI oficial per a visualitzar i optimitzar dades

**Els conceptes clau de MongoDB que cobreix el path**

### **El model de document: la diferència fonamental**

| // MongoDB: document JSON amb dades anidades// Tot el que necessites en un sol document (no JOINs){  \_id: ObjectId("507f1f77bcf86cd799439011"),  titol: "MongoDB University",  estudiant: {    nom: "Anna",    email: "anna@e.com"  },  modulsCompletats: \["Atlas", "CRUD", "Agregació"\],  progres: 75,  ultimAcces: ISODate("2025-06-17T10:30:00Z")} |
| :---- |

### **CRUD en MongoDB (Node.js Driver)**

| const { MongoClient } \= require('mongodb');const client \= new MongoClient(process.env.MONGODB\_URI);// CREATEawait db.collection('productes').insertOne({  nom: 'Portàtil', preu: 899, stock: 10});// READ: filtres, projeccionsconst producte \= await db.collection('productes').findOne(  { nom: 'Portàtil' },                  // filtre  { projection: { nom: 1, preu: 1 } }  // projecció: únicament nom i preu);// UPDATE: operadors $set, $inc, $pushawait db.collection('productes').updateOne(  { nom: 'Portàtil' },  { $set: { preu: 799 }, $inc: { stock: \-1 } });// DELETEawait db.collection('productes').deleteOne({ \_id: id }); |
| :---- |

### **L'Aggregation Pipeline: la potència de MongoDB**

Les aggregation pipelines permeten analitzar i resumir dades encadenant stages que filtren, ordenen, agrupen i/o transformen dades.

| // Exemple: total de vendes per categoria en el darrer mesconst resultat \= await db.collection('comandes').aggregate(\[  // Stage 1: filtrar comandes del darrer mes  { $match: {    data: { $gte: new Date('2025-05-01') },    estat: 'completada'  }},  // Stage 2: descompondre l'array de productes  { $unwind: '$productes' },  // Stage 3: agrupar per categoria i sumar el total  { $group: {    \_id: '$productes.categoria',    totalVendes: { $sum: '$productes.preu' },    nombreComandes: { $count: {} }  }},  // Stage 4: ordenar per total descendent  { $sort: { totalVendes: \-1 } },  // Stage 5: projecció final  { $project: {    categoria: '$\_id',    totalVendes: 1,    nombreComandes: 1,    \_id: 0  }}\]).toArray(); |
| :---- |

**Altres cursos destacats del catàleg**

El catàleg de MongoDB University inclou cursos per a múltiples tecnologies: des d'operacions CRUD bàsiques fins a disseny d'esquemes avançat, migració de SQL a MongoDB, optimització de rendiment, i construcció d'aplicacions GenAI amb Atlas Vector Search.

**MongoDB for JavaScript Developers** — En aquest curs interpretes el rol de developer backend per a una aplicació Node.js, on el teu treball és implementar la comunicació de l'aplicació amb MongoDB. Usant el driver Node.js llegiràs i escriuràs dades a la base de dades, usaràs el framework d'agregació, gestionaràs la configuració del client de la base de dades, i crearàs una aplicació robusta gestionant excepcions i timeouts.

**Schema Design Patterns** — Curs de patrons de disseny d'esquemes MongoDB, tècniques d'optimització, i transició des del model relacional al model de documents per al desenvolupament eficient de bases de dades.

**SQL to MongoDB** — Aprèn a transicionar de SQL a MongoDB, cobrint modelatge d'esquemes, codi d'aplicació, i consultes. Adquireix habilitats per a nous projectes o modernitzar projectes existents amb conceptes de bases de dades basades en documents.

**Atlas Vector Search** — Domina Atlas Vector Search de MongoDB per construir aplicacions GenAI potents amb cerca semàntica i implementacions RAG en 8 hores.

## **Per què fer els cursos de MongoDB University**

| Aspecte | Detall |
| ----- | ----- |
| **Cost** | Completament gratuïts |
| **Certificació** | Certificats oficials de MongoDB disponibles |
| **Format** | Vídeos \+ labs pràctics \+ quizzes |
| **Nivell** | Des de zero fins a avançat |
| **Rellevant per a** | Stack MERN, backends Node.js, NoSQL |
| **Concepte central** | Model de document \> taules relacionals per a dades semi-estructurades |
| **Eina cloud** | MongoDB Atlas (free tier per practicar) |

