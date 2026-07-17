### **Compound Components per a UI flexibles**

El patró Compound Components permet crear components que funcionen junts com una unitat, compartint estat implícitament, sense necessitat de passar props manualment entre ells. 

L'analogia clàssica: `<select>` i `<option>` son compound components natius del browser.

| \<\!-- Natiu: select i option treballen junts, option no funciona sola \--\>\<select\>  \<option value="1"\>Opció 1\</option\>  \<option value="2"\>Opció 2\</option\>\</select\> |
| :---- |

| // En React: el mateix patró per a components personalitzats\<Tabs defaultValue="tab1"\>  \<Tabs.List\>    \<Tabs.Tab value="tab1"\>Pestanya 1\</Tabs.Tab\>    \<Tabs.Tab value="tab2"\>Pestanya 2\</Tabs.Tab\>  \</Tabs.List\>  \<Tabs.Panel value="tab1"\>Contingut 1\</Tabs.Panel\>  \<Tabs.Panel value="tab2"\>Contingut 2\</Tabs.Panel\>\</Tabs\> |
| :---- |

**Implementació: Context \+ Sub-components**

L'estat compartit viu al component pare i es distribueix als fills via Context. Cada sub-component el consumeix amb `useContext`.

tsx

| import { createContext, useContext, useState } from 'react';// 1\. Context per compartir l'estat entre sub-componentsinterface TabsContextType {  activeTab: string;  setActiveTab: (value: string) \=\> void;}const TabsContext \= createContext\<TabsContextType | null\>(null);const useTabsContext \= () \=\> {  const ctx \= useContext(TabsContext);  if (\!ctx) throw new Error('useTabsContext ha d\\'usar-se dins de \<Tabs\>');  return ctx;};// 2\. Component pare: gestiona l'estat i proporciona el contextinterface TabsProps {  defaultValue: string;  children: React.ReactNode;}const Tabs \= ({ defaultValue, children }: TabsProps) \=\> {  const \[activeTab, setActiveTab\] \= useState(defaultValue);  return (    \<TabsContext value={{ activeTab, setActiveTab }}\>      \<div className="tabs"\>{children}\</div\>    \</TabsContext\>  );};// 3\. Sub-components: consumeixen el context implícitamentconst TabsList \= ({ children }: { children: React.ReactNode }) \=\> (  \<div role="tablist" className="tabs-list"\>{children}\</div\>);const Tab \= ({ value, children }: { value: string; children: React.ReactNode }) \=\> {  const { activeTab, setActiveTab } \= useTabsContext();  return (    \<button      role="tab"      aria-selected={activeTab \=== value}      onClick={() \=\> setActiveTab(value)}      className={activeTab \=== value ? 'tab active' : 'tab'}    \>      {children}    \</button\>  );};const TabPanel \= ({ value, children }: { value: string; children: React.ReactNode }) \=\> {  const { activeTab } \= useTabsContext();  if (activeTab \!== value) return null;  return (    \<div role="tabpanel" className="tab-panel"\>{children}\</div\>  );};// 4\. Adjuntar sub-components al component pareTabs.List \= TabsList;Tabs.Tab \= Tab;Tabs.Panel \= TabPanel;// 5\. Ús: API neta i flexiblefunction App() {  return (    \<Tabs defaultValue="perfil"\>      \<Tabs.List\>        \<Tabs.Tab value="perfil"\>Perfil\</Tabs.Tab\>        \<Tabs.Tab value="config"\>Configuració\</Tabs.Tab\>        \<Tabs.Tab value="seguretat"\>Seguretat\</Tabs.Tab\>      \</Tabs.List\>      \<Tabs.Panel value="perfil"\>\<FormulariPerfil /\>\</Tabs.Panel\>      \<Tabs.Panel value="config"\>\<FormulariConfig /\>\</Tabs.Panel\>      \<Tabs.Panel value="seguretat"\>\<FormulariSeguretat /\>\</Tabs.Panel\>    \</Tabs\>  );} |
| :---- |

**Per què Compound Components? La flexibilitat de la composició**

El benefici clau: el consumidor controla l'estructura visual sense necessitat de props complexes.

| // ❌ MAL: API rígida amb props\<Tabs  tabs={\[    { value: 'perfil', label: 'Perfil', content: \<FormulariPerfil /\> },    { value: 'config', label: 'Configuració', content: \<FormulariConfig /\> },  \]}  defaultValue="perfil"/\>// → I si vull afegir un badge al tab? Un separator entre tabs?// → Hauríes de modificar el component i afegir props// ✅ BÉ: API flexible via Compound Components\<Tabs defaultValue="perfil"\>  \<Tabs.List\>    \<Tabs.Tab value="perfil"\>      Perfil      \<Badge count={3} /\>   {/\* ← afegir badge sense tocar Tabs \*/}    \</Tabs.Tab\>    \<hr /\>                  {/\* ← separator sense tocar Tabs \*/}    \<Tabs.Tab value="config"\>Configuració\</Tabs.Tab\>  \</Tabs.List\>  \<Tabs.Panel value="perfil"\>\<FormulariPerfil /\>\</Tabs.Panel\>  \<Tabs.Panel value="config"\>\<FormulariConfig /\>\</Tabs.Panel\>\</Tabs\>// → Canviar l'estructura → ZERO modificacions al component Tabs// → Open-Closed Principle aplicat\! |
| :---- |

**Exemple real: Accordion**

| const AccordionContext \= createContext\<{  openItems: Set\<string\>;  toggle: (id: string) \=\> void;} | null\>(null);const Accordion \= ({ children, multiple \= false }: {  children: React.ReactNode;  multiple?: boolean;}) \=\> {  const \[openItems, setOpenItems\] \= useState\<Set\<string\>\>(new Set());  const toggle \= (id: string) \=\> {    setOpenItems(prev \=\> {      const next \= new Set(multiple ? prev : new Set\<string\>());      prev.has(id) ? next.delete(id) : next.add(id);      return next;    });  };  return (    \<AccordionContext value={{ openItems, toggle }}\>      \<div className="accordion"\>{children}\</div\>    \</AccordionContext\>  );};const AccordionItem \= ({ id, title, children }: {  id: string;  title: string;  children: React.ReactNode;}) \=\> {  const { openItems, toggle } \= useContext(AccordionContext)\!;  const isOpen \= openItems.has(id);  return (    \<div className="accordion-item"\>      \<button        aria-expanded={isOpen}        onClick={() \=\> toggle(id)}      \>        {title} {isOpen ? '▲' : '▼'}      \</button\>      {isOpen && \<div className="accordion-content"\>{children}\</div\>}    \</div\>  );};Accordion.Item \= AccordionItem;// Ús:\<Accordion multiple\>  \<Accordion.Item id="faq1" title="Quina és la política de devolucions?"\>    \<p\>30 dies per a devolucions...\</p\>  \</Accordion.Item\>  \<Accordion.Item id="faq2" title="Com puc fer un seguiment del meu pedido?"\>    \<p\>Accedeix al teu compte...\</p\>  \</Accordion.Item\>\</Accordion\> |
| :---- |

**Quan usar Compound Components**

✅ USAR quan:  
  → Components amb múltiples sub-parts relacionades (Tabs, Accordion, Modal, Select)  
  → L'usuari necessita control sobre l'estructura i l'ordre dels sub-components  
  → Vols compartir estat implícitament sense prop drilling  
  → El component ha d'adaptar-se a molts contextos visuals

❌ NO usar quan:  
  → El component és simple i no té sub-parts  
  → La relació entre parts és trivial (una sola prop n'hi ha prou)  
  → L'ordre i l'estructura dels sub-components mai canvia

Exemples a la natura (biblioteques que usen el patró):  
  → Radix UI: \<Dialog.Root\>, \<Dialog.Trigger\>, \<Dialog.Content\>  
  → shadcn/ui: \<Card\>, \<Card.Header\>, \<Card.Content\>, \<Card.Footer\>  
  → React Router: \<Router\>, \<Route\>, \<Link\>

**Altres:** 

**Patrons avançats en React**  
[https://reactpatterns.com](https://reactpatterns.com/)  
Recull de patrons avançats i bones pràctiques per escriure millor codi amb React.