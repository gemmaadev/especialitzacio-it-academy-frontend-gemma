**Com pot Context millorar la reutilització de components?**

**Ús avançat de Context**  
[https://kentcdodds.com/blog/how-to-use-react-context-effectively](https://kentcdodds.com/blog/how-to-use-react-context-effectively)  
Article de Kent C. Dodds amb consells per fer un ús eficient de Context.

**El problema que context resol per a la reutilització**

Sense Context, un component reutilitzable que necessita dades globals ha de rebre-les via props, cosa que l'acobla al component pare i fa difícil reutilitzar-lo en contexts diferents.

| // ❌ Sense Context: el component reutilitzable necessita props excessivesfunction PàginaPerfil({ usuari, tema, idioma, permisos, configuració }) {  // → Per reutilitzar PàginaPerfil en un altre lloc, cal passar 5 props  // → El component pare ha de saber quines dades necessita PàginaPerfil  // → Canviar quines dades necessita → canviar TOTS els pares  return \<ProfilCard usuari={usuari} tema={tema} idioma={idioma} /\>;}// ✅ Amb Context: el component llegeix directament el que necessitafunction PàginaPerfil() {  const { usuari } \= useAuth();     // ← llegeix directament  const { tema } \= useTema();       // ← llegeix directament  const { t } \= useI18n();          // ← llegeix directament  return \<ProfilCard usuari={usuari} tema={tema} t={t} /\>;  // → Reutilitzable en qualsevol lloc sense cap prop addicional  // → El component pare no sap ni li importa quines dades necessita} |
| :---- |

**El patró de Kent C. Dodds: Custom Provider \+ Custom Hook**

Pensa en Context no com a `useContext(SomethingContext)` sinó com a `useSomething()`. Tenir un hook personalitzat té el benefici que pots fer algunes coses addicionals que milloraràn la DX.

El patró recomanat té tres peces: el context (privat), el Provider (públic), i el Custom Hook (públic).

| // src/context/auth.context.tsximport { createContext, useContext, useState, useMemo } from 'react';// 1\. CONTEXT → privat (no s'exporta directament)interface AuthContextType {  usuari: Usuari | null;  login: (credencials: Credencials) \=\> Promise\<void\>;  logout: () \=\> void;  isAdmin: boolean;}const AuthContext \= createContext\<AuthContextType | undefined\>(undefined);//                                                ↑ undefined, NO null// → La verificació al hook detectarà si falta el Provider// 2\. PROVIDER → s'exporta, s'usa a la cima de l'appexport function AuthProvider({ children }: { children: React.ReactNode }) {  const \[usuari, setUsuari\] \= useState\<Usuari | null\>(null);  const login \= async (credencials: Credencials) \=\> {    const u \= await authService.login(credencials);    setUsuari(u);  };  const logout \= () \=\> {    authService.logout();    setUsuari(null);  };  const valor \= useMemo(    () \=\> ({ usuari, login, logout, isAdmin: usuari?.rol \=== 'admin' }),    \[usuari\]  );  return \<AuthContext value={valor}\>{children}\</AuthContext\>;}// 3\. CUSTOM HOOK → s'exporta, es consumeix als componentsexport function useAuth() {  const context \= useContext(AuthContext);  if (context \=== undefined) {    throw new Error('useAuth ha d\\'usar-se dins d\\'un AuthProvider');    //              ↑ Error clar que indica exactament el problema    //              → Fail Fast: errors en development, no en producció  }  return context;} |
| :---- |

**El benefici del Custom Hook: error clar i API neta**

El Custom Hook `useCount` usa `useContext` per obtenir el valor proporcionat del `CountProvider` més proper. Però si no hi ha valor, llancem un missatge d'error útil indicant que el hook no s'usa dins d'un component renderitzat dins d'un `CountProvider`. Això és sens dubte un error, per tant proporcionar el missatge d'error és valuós.

| // ❌ Sense Custom Hook: errors críptics i no orientatiusimport { AuthContext } from './auth.context';function PàginaAdmin() {  const auth \= useContext(AuthContext);  // Si algú oblida el Provider, auth és 'undefined'  // auth.usuari → TypeError: Cannot read properties of undefined  // → Error confús que no indica el problema real}// ✅ Amb Custom Hook: error clar i accionablefunction PàginaAdmin() {  const { usuari, isAdmin } \= useAuth();  // Si algú oblida el Provider:  // → Error: "useAuth ha d'usar-se dins d'un AuthProvider"  // → Immediatament saps exactament quèhas de fer per arreglar-ho} |
| :---- |

**Com Context elimina l'acoblament i millora la reutilització**

| // EXEMPLE COMPLET: Sistema de tema reutilitzable// src/context/tema.context.tsxtype Tema \= 'clar' | 'fosc' | 'sistema';interface TemaContextType {  tema: Tema;  temaAplicat: 'clar' | 'fosc'; // ← el tema real aplicat (si és 'sistema' → detecta)  setTema: (tema: Tema) \=\> void;}const TemaContext \= createContext\<TemaContextType | undefined\>(undefined);export function TemaProvider({ children }: { children: React.ReactNode }) {  const \[tema, setTema\] \= useState\<Tema\>(() \=\>    (localStorage.getItem('tema') as Tema) ?? 'sistema'  );  // Detectar preferència del sistema  const temaAplicat: 'clar' | 'fosc' \= tema \=== 'sistema'    ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'fosc' : 'clar'    : tema;  const handleSetTema \= (noùTema: Tema) \=\> {    setTema(noùTema);    localStorage.setItem('tema', noùTema);  };  const valor \= useMemo(    () \=\> ({ tema, temaAplicat, setTema: handleSetTema }),    \[tema, temaAplicat\]  );  // Aplicar classe al document automàticament  useEffect(() \=\> {    document.documentElement.classList.toggle('dark', temaAplicat \=== 'fosc');  }, \[temaAplicat\]);  return \<TemaContext value={valor}\>{children}\</TemaContext\>;}export function useTema() {  const context \= useContext(TemaContext);  if (context \=== undefined) {    throw new Error('useTema ha d\\'usar-se dins d\\'un TemaProvider');  }  return context;}// ÚS: qualsevol component pot accedir al tema sense cap propfunction BotoTema() {  const { tema, setTema } \= useTema();  return (    \<select value={tema} onChange={e \=\> setTema(e.target.value as Tema)}\>      \<option value="clar"\>Clar\</option\>      \<option value="fosc"\>Fosc\</option\>      \<option value="sistema"\>Sistema\</option\>    \</select\>  );}function Avatar({ src, alt }: { src: string; alt: string }) {  const { temaAplicat } \= useTema();  return (    \<img      src={src} alt={alt}      className={temaAplicat \=== 'fosc' ? 'avatar avatar--fosc' : 'avatar'}    /\>  );}// → BotoTema i Avatar son completament reutilitzables en qualsevol lloc// → Cap prop de tema necessita passar-se des del pare |
| :---- |

**Context per dominis: múltiple contexts per responsabilitats**

Recorda que context no ha de ser global per a tota l'app, sinó que es pot aplicar a una part del teu arbre. Pots (i probablement hauràs de) tenir múltiples contexts separats lògicament en la teva app.

| // Cada context té una responsabilitat clara i una API pròpia// src/context/auth.context.tsx → useAuth()// src/context/tema.context.tsx → useTema()// src/context/carret.context.tsx → useCarret()// src/context/notificacions.context.tsx → useNotificacions()// Components reutilitzables que usen múltiples contextsfunction Header() {  const { usuari, logout } \= useAuth();  const { tema, setTema } \= useTema();  const { itemsCount } \= useCarret();  return (    \<header className={tema}\>      \<Logo /\>      \<nav\>        \<span\>{usuari?.nom}\</span\>        \<IconaCarret count={itemsCount} /\>        \<BotoTema tema={tema} onChange={setTema} /\>        \<button onClick={logout}\>Sortir\</button\>      \</nav\>    \</header\>  );}// → Header és totalment reutilitzable en qualsevol app que tingui els mateixos Providers// → No necessita cap prop: llegeix el que necessita via hooks |
| :---- |

**Context per a una part de l'arbre: no sempre global**

Context no ha de ser global. Pot proporcionar estat a una secció específica de l'aplicació, millorant la reutilització d'aquella secció com a unitat.

| // Context d'àmbit local: únicament per al Wizard de checkoutinterface WizardContextType {  pas: number;  dades: DadesCheckout;  anarAlPas: (pas: number) \=\> void;  actualitzarDades: (dades: Partial\<DadesCheckout\>) \=\> void;}const WizardContext \= createContext\<WizardContextType | undefined\>(undefined);function useWizard() {  const ctx \= useContext(WizardContext);  if (\!ctx) throw new Error('useWizard ha d\\'usar-se dins de CheckoutWizard');  return ctx;}// El Wizard és una unitat reutilitzable i autocontingudafunction CheckoutWizard() {  const \[pas, setPas\] \= useState(0);  const \[dades, setDades\] \= useState\<DadesCheckout\>({});  const valor \= useMemo(() \=\> ({    pas,    dades,    anarAlPas: setPas,    actualitzarDades: (novesDades: Partial\<DadesCheckout\>) \=\>      setDades(prev \=\> ({ ...prev, ...novesDades })),  }), \[pas, dades\]);  return (    \<WizardContext value={valor}\>      \<ProgressBar pas={pas} total={4} /\>      {pas \=== 0 && \<PasDirecció /\>}      {pas \=== 1 && \<PasEnviament /\>}      {pas \=== 2 && \<PasPagament /\>}      {pas \=== 3 && \<PasConfirmació /\>}    \</WizardContext\>  );}// Sub-components que funcionen en qualsevol lloc dins del Wizardfunction PasDirecció() {  const { dades, actualitzarDades, anarAlPas } \= useWizard();  return (    \<form onSubmit={() \=\> anarAlPas(1)}\>      \<input value={dades.carrer || ''} onChange={e \=\> actualitzarDades({ carrer: e.target.value })} /\>      \<button type\="submit"\>Següent\</button\>    \</form\>  );} |
| :---- |

**L'Estructura de fitxers recomanada**

| src/  context/    auth.context.tsx     → AuthProvider \+ useAuth()    tema.context.tsx     → TemaProvider \+ useTema()    carret.context.tsx   → CarretProvider \+ useCarret()    i18n.context.tsx     → I18nProvider \+ useI18n()    index.ts             → exporta tots els hooks i providers  providers/    AppProviders.tsx     → compon tots els providers en un sol component |
| :---- |

| export function AppProviders({ children }: { children: React.ReactNode }) {  return (    \<AuthProvider\>      \<TemaProvider\>        \<I18nProvider\>          \<CarretProvider\>            {children}          \</CarretProvider\>        \</I18nProvider\>      \</TemaProvider\>    \</AuthProvider\>  );}// src/main.tsxReactDOM.createRoot(document.getElementById('root')\!).render(  \<AppProviders\>    \<App /\>  \</AppProviders\>); |
| :---- |

**Com Context millora la reutilització**

1\. ELIMINA PROPS INNECESSÀRIES:  
   Components reutilitzables no necessiten rebre dades globals via props  
   → Pots usar el component en qualsevol lloc sense configuració extra

2\. DESACOBLA COMPONENTS DEL SEU CONTEXT D'ÚS:  
   El component no sap d'on venen les dades, únicament les llegeix  
   → Canviar la font de dades → únicament canvia el Provider

3\. PATRÓ: Context (privat) \+ Provider (públic) \+ Custom Hook (públic)  
   → El Custom Hook encapsula useContext \+ validació \+ error clar  
   → API neta: useAuth(), useTema(), useCarret()

4\. CONTEXT LOCAL per a sub-arbres:  
   Una feature complexa (Wizard, Accordion) pot tenir el seu propi Context  
   → La feature és autocontinguda i reutilitzable com a unitat

5\. FAIL FAST:  
   El Custom Hook lança un error clar si s'usa fora del Provider  
   → "useAuth ha d'usar-se dins d'un AuthProvider" → error accionable

