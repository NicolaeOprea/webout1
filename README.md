# Sapore Mediterraneo - Modern Restaurant Website

Eine elegante, responsive moderne Website für das italienische Restaurant Sapore Mediterraneo in Brunnthal, Deutschland.

## Features

- ⚡ **React 18** mit JavaScript ESM
- 🎨 **Tailwind CSS** für modernstes Styling
- 📱 **Mobile-first** responsive Design
- ✨ **Framer Motion** für sanfte Animationen
- 🔀 **React Router** für Navigation
- 🎯 **6 Seiten**: Home, Speisekarte, Über uns, Kontakt, Impressum, Datenschutz
- 💅 **Mediterranean Design** mit Creme, Olivgrün und Terrakotta Farben
- 📍 **Google Maps** Integration
- 💬 **Floating Contact Button** mit WhatsApp und Telefon
- ♿ **Barrierefreies Design**
- ⚡ **Performance optimiert** mit lokalem React ESM Build

## Seitenstruktur

### Home (/)
- Hero mit starkem Headline und CTAs
- Intro über authentische italienische Küche
- Featured Specialties Cards
- "Why Choose Us" Section
- Review/Testimonial Section
- Kontakt & Standort mit Google Maps
- CTA Section

### Speisekarte (/speisekarte)
- Komplettes Menü mit Kategorien
- Beschreibungen und Preise
- Allergen-Hinweise
- Kontakt-CTA

### Über uns (/uber-uns)
- Restaurant-Geschichte
- Drei Säulen (Leidenschaft, Gemeinschaft, Tradition)
- Team-Information
- Qualitätsversprechen

### Kontakt (/kontakt)
- Kontaktformular
- Adresse, Telefon, E-Mail, Öffnungszeiten
- Embedded Google Maps
- Quick Action Buttons

### Impressum (/impressum)
- Anbieterinformationen
- Haftungsausschluss
- Urheberrecht
- Links-Haftung

### Datenschutz (/datenschutz)
- DSGVO Datenschutzerklärung
- Rechtsgrundlagen
- Benutzerrechte
- Beschwerdeverfahren

## Installation & Setup

### Voraussetzungen
- Node.js 16+ 
- npm oder yarn

### Installation

```bash
npm install
```

### Entwicklungsserver

```bash
npm run dev
```

Die Website ist dann unter `http://localhost:3000` erreichbar.

### Production Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: JavaScript ESM
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Lokale ESM-Skripte mit esbuild und Tailwind CSS
- **Package Manager**: npm/yarn

## Farben

Das Design folgt einem mediterranen Farbschema:

- **Creme**: `#F5F1E8` - Warm und einladend
- **Olivgrün Dunkel**: `#6B8E23` - Klassisch traditionell
- **Olivgrün**: `#9CAF88` - Regular und leichte Akzente
- **Olivgrün Hell**: `#C4D96F` - Pastell-Highlights
- **Terrakotta**: `#D97760` - Energie und Akzente
- **Terrakotta Hell**: `#E8A89F` - Sanfte Variante
- **Stein**: `#8B8680` - Neutral und stabil
- **Stein Hell**: `#B5B0AB` - Light Backgrounds

## Komponenten-Struktur

```
src/
├── components/
│   ├── Navbar.jsx          - Navigationsleiste mit Mobile Menu
│   ├── Footer.jsx          - Footer mit Kontakt und Links
│   ├── FloatingButton.jsx  - WhatsApp/Telefon Floating Button
│   ├── SpecialtyCard.jsx   - Reusable Card Component
│   └── ReviewCard.jsx      - Reusable Review Component
├── pages/
│   ├── Home.jsx            - Homepage
│   ├── Speisekarte.jsx     - Menu Page
│   ├── UberUns.jsx         - About Page
│   ├── Kontakt.jsx         - Contact Page
│   ├── Impressum.jsx       - Legal Page
│   └── Datenschutz.jsx     - Privacy Page
├── App.jsx                 - Main App mit Routing
├── main.jsx                - Entry Point
└── index.css               - Global Styles

```

## Geschäftsinformationen

**Sapore Mediterraneo**  
Fichtenstraße 33  
85649 Brunnthal, Germany  
📞 +49 8104 8891110  
📧 info@sapore-med.de

**Öffnungszeiten**
- Mo - Do: 11:30 - 22:00
- Fr - Sa: 11:30 - 23:00
- Sonntag: 11:30 - 22:00

## Wichtige Anmerkungen

- ✅ Alle Inhalte sind auf Deutsch und können leicht angepasst werden
- ✅ Realistische Placeholder-Texte generiert
- ✅ Keine erfundenen Behauptungen (Michelin, Awards, etc.)
- ✅ Kontaktformular ist strukturiert (Backend Integration nötig)
- ✅ Vollständig DSGVO konform
- ✅ Mobile-optimiert
- ✅ Schnelle Performance

## Anpassungen

Um die Website anzupassen:

1. **Geschäftsinformationen**: Bearbeiten Sie die Kontaktdaten in `src/pages/Kontakt.jsx` und `src/components/Footer.jsx`
2. **Speisekarte**: Aktualisieren Sie das Menu Array in `src/pages/Speisekarte.jsx`
3. **Texte**: Alle Inhalte können in den jeweiligen `.jsx` Dateien bearbeitet werden
4. **Farben**: Passen Sie die Tailwind Config in `tailwind.config.js` an
5. **Google Maps**: Ersetzen Sie die iFrame-URL mit Ihrer eigenen Maps-Einbettung

## Browser-Kompatibilität

- Chrome/Edge: Latest
- Firefox: Latest
- Safari: Latest
- Mobile: iOS Safari, Chrome Mobile

## Performance

- ⚡ Optimized Bundle Size
- 🖼️ Lazy Loading Images
- 🔄 Smooth Animations mit CSS Transforms
- 📱 Mobile-First Approach
- 🚀 Lokaler React ESM Build für schnelle Entwicklung

## Support

Für Support oder Fragen zum Website-Design kontaktieren Sie:
📧 info@sapore-med.de

---

**Created with ❤️ for Sapore Mediterraneo**
