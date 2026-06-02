# Sapore Mediterraneo - Schnellstart Guide

## 🚀 Schnelle Installation

### 1. Dependencies installieren
```bash
npm install
```

### 2. Entwicklungsserver starten
```bash
npm run dev
```

Die Website ist dann unter `http://localhost:3000` erreichbar.

Für Backend-Anbindung nutzt das Frontend:

```env
REACT_APP_API_URL=http://localhost:4000
```

### 3. Production Build
```bash
npm run build
npm run preview
```

## 📝 Erste Schritte - Anpassungen

### 🎨 Design anpassen
- **Farben ändern**: `tailwind.config.js`
- **Schriftarten**: `index.html` oder `index.css`
- **Responsive Breakpoints**: `tailwind.config.js`

### ✏️ Inhalte bearbeiten
- **Speisekarte**: `src/pages/Speisekarte.jsx`
- **Über uns**: `src/pages/UberUns.jsx`
- **Kontakt**: `src/pages/Kontakt.jsx`
- **Footer**: `src/components/Footer.jsx`

### 🗺️ Google Maps Integration
In `src/pages/Home.jsx` und `src/pages/Kontakt.jsx`:
```tsx
<iframe
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
  // Ersetzen Sie mit Ihrer eigenen Maps URL
/>
```

### 📱 Kontaktformular Backend
Das Kontaktformular in `src/pages/Kontakt.jsx` sendet aktuell nur Client-seitig.  
Für echte E-Mail-Versand:
1. Backend API aufsetzen (Node.js, Python, etc.)
2. Form-Handler in `handleSubmit` Funktion aktualisieren

```tsx
const handleSubmit = async (e) => {
  e.preventDefault()
  // API call hier hinzufügen
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData)
  })
  // ...
}
```

## 🎯 Wichtige Datei-Locations

| Datei | Zweck |
|-------|-------|
| `src/App.jsx` | Haupt-Routing und Struktur |
| `src/components/Navbar.jsx` | Navigation |
| `src/components/Footer.jsx` | Footer mit Links |
| `src/pages/Home.jsx` | Homepage |
| `src/pages/Speisekarte.jsx` | Menu |
| `tailwind.config.js` | Tailwind Konfiguration |
| `index.html` | HTML Entry Point |

## 🔧 Häufige Anpassungen

### Geschäftszeiten ändern
In `src/components/Footer.jsx` und `src/pages/Kontakt.jsx`:
```tsx
<div className="flex gap-2">
  <span className="w-20">Mo - Do:</span>
  <span>11:30 - 22:00</span>  {/* Hier ändern */}
</div>
```

### Telefonnummer aktualisieren
Überall in den Dateien die Nummer +49 8104 8891110 durch Ihre Nummer ersetzen.

### Menü-Items hinzufügen
In `src/pages/Speisekarte.jsx`:
```tsx
{ 
  name: 'Dish Name', 
  desc: 'Description', 
  price: '€ XX,XX' 
}
```

### Farben anpassen
`tailwind.config.js`:
```js
colors: {
  cream: '#F5F1E8',  // Ändern Sie hier
  'olive-dark': '#6B8E23',
  // ...
}
```

## 📊 Dateistruktur

```
webout1/
├── public/              # Statische Assets
├── src/
│   ├── components/      # React Komponenten
│   ├── pages/          # Page Components
│   ├── App.jsx         # Main App
│   ├── main.jsx        # Entry Point
│   └── index.css       # Global Styles
├── package.json        # Dependencies
├── jsconfig.json       # Editor Config pentru JavaScript ESM
├── tailwind.config.js  # Tailwind Config
├── scripts/           # Lokale ESM Build-, Dev- und Preview-Skripte
└── index.html          # HTML Template
```

## 🚀 Deployment

### Hosting-Optionen
- **Vercel** (Empfohlen für React): `npm run build` → Deploy
- **Netlify**: `npm run build` → Drag & Drop `build` folder
- **GitHub Pages**: Mit GitHub Actions
- **AWS**: S3 + CloudFront
- **Traditional Hosting**: Upload `build` Folder via FTP

### Vercel Deployment (Schnell)
```bash
npm install -g vercel
vercel
```

### Netlify Deployment
```bash
npm run build
# Zip und auf netlify.app hochladen
```

## 🐛 Troubleshooting

**Problem**: "npm: command not found"
- **Lösung**: Node.js von nodejs.org installieren

**Problem**: Port 3000 bereits in Verwendung
```bash
$env:PORT=3000; npm run dev
```

**Problem**: Module nicht gefunden
```bash
rm -rf node_modules
npm install
```

## 📞 Support-Kontakt

Email: info@sapore-med.de  
Telefon: +49 8104 8891110  
Adresse: Fichtenstraße 33, 85649 Brunnthal, Germany

---

🇮🇹 **Buon appetito!**
