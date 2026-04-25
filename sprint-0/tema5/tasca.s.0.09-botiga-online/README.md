# Sitemap Botiga Online BotigaTech

**Descripció**: Sitemap visual de la botiga online fictícia BotigaTech, que ven productes electrònics (mòbils, ordinadors i accessoris). El diagrama representa la jerarquia de pàgines, la navegació entre seccions i les decisions de disseny, creat amb Draw.io.

---

## 🗺 Estructura del Sitemap

### Nivell 0 — Pàgina d'inici
| Pàgina | URL | Contingut |
|---|---|---|
| Pàgina d'inici | `/` | Hero · Productes destacats · Categories · Ofertes |

### Nivell 1 — Seccions principals
| Pàgina | URL | Contingut |
|---|---|---|
| Productes | `/productes` | Llistat productes · Filtres · Cerca |
| Categories | `/categories` | Vista general totes les categories |
| Cistella 🛒 | `/cistella` | Resum · Quantitats · Eliminar · Total |
| Compte d'usuari 🔒 | `/compte` | Login · Registre · Recuperar pwd |
| Contacte | `/contacte` | Formulari · Mapa Google Maps |

### Nivell 2 — Subpàgines
| Pàgina | URL | Contingut |
|---|---|---|
| Detall de producte | `/productes/{id}` | Imatges · Descripció · Preu · Afegir cistella |
| Mòbils 📱 | `/categories/mobils` | Llistat · Filtres |
| Ordinadors 💻 | `/categories/ordinadors` | Llistat · Filtres |
| Accessoris 🎧 | `/categories/accessoris` | Llistat · Filtres |

---

## 🎨 Decisions de disseny

- **Colors diferenciats**: Les pàgines públiques són blaves i el Compte d'usuari és taronja per indicar que és una pàgina privada que requereix autenticació (🔒).
- **Detall de producte**: Només accessible des del llistat de productes (`/productes`), no des del menú principal.
- **Contacte**: Inclou formulari de contacte i mapa de Google Maps integrat.
- **Icones**: Cada node té una icona per facilitar la lectura visual del diagrama.

---

## 🛠 Eines utilitzades

- [Draw.io](https://app.diagrams.net/) — creació del diagrama visual
- XML exportat directament des de Draw.io (fitxer inclòs al repositori)

---

## 📸 Previsualització

![Sitemap BotigaTech](sitemap-biotech.jpg)

> Per obrir el diagrama interactiu, importa el fitxer `sitemap-botigatech.xml` a [Draw.io](https://app.diagrams.net/).

---

## ✍️ Autora

**Gemma Maeso** · Especialització IT Academy Frontend · 2026
