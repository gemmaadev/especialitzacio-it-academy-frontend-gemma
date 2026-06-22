**Per què és absolutament crucial no emmagatzemar contrasenyes en text pla? Explica detalladament el procés de hashing i salting amb bcrypt i per què és considerat un mètode segur.**

**El perill de les contrasenyes en text pla**

La raó \#1: les bases de dades es filtren. Han passat a Adobe (153M usuaris), LinkedIn (117M), Equifax (147M), i moltes més. 

Quan una BD es filtra, si les contrasenyes estan en text pla, totes les comptes de tots els usuaris estan compromeses immediatament i de manera irreversible.

ESCENARI REAL: filtració de BD amb contrasenyes en text pla

| BD filtrada:  | usuari\_id | email           | password        |  |-----------|-----------------|-----------------|  | 1         | anna@gmail.com  | MiContras3nya\!  |  ← visible\!  | 2         | marc@gmail.com  | password123     |  ← visible\!Conseqüències immediates:  → L'atacant pot fer login com qualsevol usuari  → Com el 65% de la gent reutilitza contrasenyes → l'atacant prova    "MiContras3nya\!" a Gmail, Instagram, bancs de l'Anna  → Credential stuffing automatitzat: milers de comptes compromeses  → Cap manera de "des-comprometre" una contrasenya exposada |
| :---- |

**Què és el Hashing: la primera capa de defensa**

La contrasenya en text pla es processa usant una funció criptogràfica complexa que produeix un hash de longitud fixa. Aquest hash és el que s'emmagatzema a la base de dades.

| Hash criptogràfic: funció unidireccional  "MiContras3nya\!" → \[funció hash\] → "1b21hb2hb1u2gu..."                                           ↑                              NO es pot revertir (one-way)PROPIETATS:  → Determinista: el mateix input sempre dona el mateix output  → Unidireccional: impossible obtenir la contrasenya del hash  → Sensible: un canvi mínim → hash completament diferent  → Longitud fixa: independentment de la longitud de la contrasenya |
| :---- |

**El problema dels hash ràpids (MD5, SHA-1, SHA-256)**

Les funcions hash tradicionals (com MD5 o SHA-1) son ràpides. Mentre que la velocitat és beneficiosa en molts escenaris, és perillosa per a l'emmagatzematge de contrasenyes perquè els atacants poden fer brute-force de contrasenyes molt ràpidament.

| MD5("password123") \= "482c811da5d5b4bc6d497ffa98491e38"← Es calcula en nanosegons\!Atac de força bruta amb GPU moderna (RTX 4090):  MD5:    \~200.000 MILIONS de hashes/segon  SHA-1:  \~80.000 MILIONS de hashes/segon  SHA-256: \~20.000 MILIONS de hashes/segon"password123" (8 caràcters, tot minúscules \+ números):  → Espai de cerca: 36^8 \= 2.821.109.907.456 combinacions  → Temps per trencar amb MD5: 2.821.109.907.456 / 200.000.000.000    \= 14 SEGONS\!Conclusió: MD5 i SHA-256 NO son adequats per a contrasenyes. |
| :---- |

**Rainbow Tables: l'atac contra hashes sense salt**

| Rainbow Table: taula precalculada de hash → contrasenya  "password"  → "5f4dcc3b5aa765d61d8327deb882cf99" (MD5)  "123456"    → "e10adc3949ba59abbe56e057f20f883e" (MD5)  "admin"     → "21232f297a57a5a743894a0e4a801fc3" (MD5)  ... milers de milions d'entrades precalculadesAtac:  → BD filtrada té: "e10adc3949ba59abbe56e057f20f883e"  → Cercant a la rainbow table → "123456" en microsegons\!  → L'atacant no necessita calcular res → únicament cercar |
| :---- |

**Salt: la defensa contra Rainbow Tables**

Un salt és un valor aleatori únic i generat aleatòriament que proporciona un nivell addicional de seguretat per a un hash generat. 

Abans que la contrasenya en text pla sigui hasheada, es genera un salt. Llavors, s'afegeix a la contrasenya en text pla, i tot es hasheja junts. 

Això ajuda a protegir contra atacs de rainbow table perquè els atacants no poden endevinar contrasenyes conegudes usant una taula de lookup precalculada de hash-contrasenya.

| SALT: valor aleatori únic per a cada contrasenyaAnna: salt \= "xK9mP2qL" → hash("MiContras3nya\!xK9mP2qL") \= "a3f8..."Marc: salt \= "wR5nB7jH" → hash("MiContras3nya\!wR5nB7jH") \= "d9c2..."Fins i tot si dos usuaris tenen la MATEIXA contrasenya → hashes TOTALMENT DIFERENTS\!BD amb salt:  | email        | password\_hash      | salt       |  |--------------|--------------------|-----------  |  | anna@e.com   | "a3f8d2e1..."      | "xK9mP2qL" |  | marc@e.com   | "d9c2b5f8..."      | "wR5nB7jH" |→ Rainbow tables inútils: caldria precalcular una taula per cada salt possible→ Atac de força bruta → cal calcular hash(candidat \+ salt\_de\_anna) per a cada intent |
| :---- |

**bcrypt: lent per disseny**

bcrypt empra un procés anomenat key stretching per alentir el procés de hashing. El key stretching implica aplicar repetidament una funció hash criptogràfica múltiples vegades. 

Aquesta alentiment deliberat és intencional, ja que dificulta els atacs de força bruta forçant els atacants a gastar significativament més temps i recursos computacionals.

| COST FACTOR (Work Factor):  El factor de cost és un exponent en base 2\.  Cost 12 significa 2^12 \= 4.096 rounds de Blowfish key setup.  | Cost | Temps aproximat (hardware 2025\) | Hashes/segon atacant |  |------|----------------------------------|----------------------|  | 10   | \~60 ms                           | \~17/segon            |  | 11   | \~120 ms                          | \~8/segon             |  | 12   | \~250 ms ← RECOMANACIÓ OWASP      | \~4/segon             |  | 13   | \~500 ms                          | \~2/segon             |  | 14   | \~1000 ms                         | \~1/segon             |Comparació d'atac:  SHA-256 "password123": 20.000.000.000 intents/segon → trencat en nanosegons  bcrypt cost 12:                    4 intents/segon → 800 ANYS per trencar\! |
| :---- |

La recomanació d'OWASP és apuntar a \~250ms per hash en el teu hardware de producció. Cost 12 assoleix aquest objectiu en la majoria d'instàncies cloud el 2024-2026. 

A mesura que el hardware es fa més ràpid, hauríeu d'incrementar el cost factor a intervals regulars.

**L'Estructura d'un Hash bcrypt: tot en 60 caràcters**

Tota la cadena de 60 caràcters és autoverificable. L'emmagatzemes com una sola columna a la teva base de dades. La verificació llegeix la versió, el cost, i el salt d'ella → mai necessites emmagatzemar el salt per separat.

| $2b$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW$2b$    → Versió de bcrypt12      → Cost factor (2^12 \= 4096 rounds)R9h/cIPz0gi.URNNX3kh2O → Salt (22 caràcters, 16 bytes)PST9/PgBkqquzi.Ss7KIUgO2t0jWMUW → Hash resultant (31 caràcters)→ Longitud sempre fixa: 60 caràcters → usar VARCHAR(60) o CHAR(60) a la BD |
| :---- |

**Implementació a NestJS amb bcrypt**

| npm install bcryptnpm install @types/bcrypt \--save-dev |
| :---- |

| // src/auth/auth.service.tsimport \* as bcrypt from 'bcrypt';import { Injectable } from '@nestjs/common';import { InjectModel } from '@nestjs/mongoose';@Injectable()export class AuthService {  private readonly SALT\_ROUNDS \= 12;  // ← cost factor recomanat per OWASP  constructor(    @InjectModel(Usuari.name) private usuariModel: Model\<UsuariDocument\>  ) {}  // REGISTRE: hashear la contrasenya  async registrar(dto: RegistreDto): Promise\<Usuari\> {    // Verificar que l'email no existeix    const existeix \= await this.usuariModel.findOne({ email: dto.email });    if (existeix) throw new ConflictException('Email ja registrat');    // Hashear la contrasenya    // bcrypt.hash genera el salt automàticament i l'embeds al resultat    const passwordHash \= await bcrypt.hash(dto.password, this.SALT\_ROUNDS);    // ← NOTA: bcrypt.hash és asíncron → usa sempre la versió async\!    // La versió síncrona (bcrypt.hashSync) bloqueja l'event loop\!    // Guardar ÚNICAMENT el hash, mai la contrasenya original    const nouUsuari \= await this.usuariModel.create({      nom: dto.nom,      email: dto.email,      password: passwordHash,  // ← el hash, no el text pla    });    return nouUsuari;  }  // LOGIN: comparar contrasenya  async validarUsuari(email: string, password: string): Promise\<Usuari | null\> {    const usuari \= await this.usuariModel.findOne({ email }).select('+password');    // ↑ select('+password') necessari si el camp té select: false al Schema    if (\!usuari) {      // IMPORTANT: no revelar si l'email existeix o no (timing attack)      // Sempre fer la comparació tot i que l'usuari no existeixi      await bcrypt.hash('dummy', this.SALT\_ROUNDS);  // constant-time dummy      return null;    }    // SEMPRE usar bcrypt.compare, mai \=== ni \== directament\!    const coincideix \= await bcrypt.compare(password, usuari.password);    // ↑ bcrypt.compare extreu el salt del hash emmagatzemat    //   i compara en temps constant (protecció contra timing attacks)    if (\!coincideix) return null;    return usuari;  }}// Schema de Mongoose: el password NO s'inclou per defecte a les consultes@Schema()export class Usuari {  @Prop({ required: true })  nom: string;  @Prop({ required: true, unique: true })  email: string;  @Prop({ required: true, select: false })  // ← select: false → no s'exposa per defecte  password: string;  // ← sempre guardar el hash, mai la contrasenya original} |
| :---- |

**El Pepper: capa addicional de seguretat**

Un pepper és una clau secreta barrejada al hash abans de l'emmagatzematge, guardada en memòria de l'aplicació (no a la base de dades). El pepper afegeix defensa en profunditat: si únicament la BD es filtra, l'atacant encara necessita el pepper per verificar intents.

| // Pepper: secret extern a la BDconst PEPPER \= process.env.PASSWORD\_PEPPER;  // ← en variables d'entornasync hashConAmbPepper(password: string): Promise\<string\> {  // Combinar password \+ pepper abans del hash  const passwordAmbPepper \= password \+ PEPPER;  return bcrypt.hash(passwordAmbPepper, this.SALT\_ROUNDS);}async verificarAmbPepper(password: string, hash: string): Promise\<boolean\> {  return bcrypt.compare(password \+ PEPPER, hash);}// → Si la BD es filtra: l'atacant té hashes però NO el pepper// → Sense el pepper: els hashes son inútils |
| :---- |

**El warning dels 72 Bytes**

bcrypt únicament llegeix els primers 72 bytes de l'input. Tot el que passa del byte 72 és ignorat silenciosament. 

Un emoji o un caràcter CJK pot ocupar 3-4 bytes en UTF-8, de manera que una contrasenya que sembla de 30 caràcters podria consumir 90 bytes, i bcrypt descarta silenciosament la cua.

| // Solució: pre-hashear si es permeten frases de pas llarguesimport { createHmac } from 'crypto';async hashPasswordSegur(password: string): Promise\<string\> {  // Pre-hashear amb SHA-256 → sempre 64 bytes → dins el límit de 72  const prehash \= createHmac('sha256', process.env.PEPPER\!)    .update(password)    .digest('base64');  return bcrypt.hash(prehash, this.SALT\_ROUNDS);} |
| :---- |

**Resum: per què bcrypt és segur**

| Característica | MD5/SHA | bcrypt |
| ----- | ----- | ----- |
| **Velocitat** | Molt ràpid (ns) | Lent per disseny (\~250ms) |
| **Salt** | ❌ Manual | ✅ Automàtic i únic per hash |
| **Rainbow tables** | ❌ Vulnerable | ✅ Immune |
| **Força bruta** | ❌ Bilions/segon | ✅ 4 intents/segon (cost 12\) |
| **Adaptatiu** | ❌ Velocitat fixa | ✅ Cost factor increïble amb hardware |
| **Auto-verificable** | ❌ Cal guardar salt apart | ✅ Salt embeds al hash (60 chars) |
| **OWASP recomanat** | ❌ Explícitament desaconsellat | ✅ Cost 12+ |

