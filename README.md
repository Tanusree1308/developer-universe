# 🌌 Developer Universe

> A cinematic, interactive journey through our Solar System — built with React, Tailwind CSS, and Framer Motion.

**Live Demo:** [developer-universe.onrender.com](https://developer-universe.onrender.com)

---

## ✨ Features

- 🔥 **Animated Sun** — real-time fire particles, solar flares, and corona glow on the intro screen
- 🪐 **8 Full-Screen Planet Sections** — each planet gets its own cinematic scroll section with a unique background
- 🎨 **Changing Backgrounds** — every planet has a distinct dark color theme (deep red for Mars, icy teal for Uranus, navy for Neptune, etc.)
- 💫 **Per-Planet Canvas Effects:**
  - ☄️ Mercury — diagonal meteor showers
  - 🌫️ Venus — swirling sulfuric acid clouds
  - 🌌 Earth — aurora bands + drifting cloud wisps
  - 🌪️ Mars — planet-wide red dust storms
  - ⚡ Jupiter — branching lightning storms
  - 🧊 Saturn — hexagonal ice crystal particles
  - 💎 Uranus — diamond rain (real phenomenon)
  - 💎 Neptune — diamond rain + 2,100 km/h winds
- 🔍 **Planet Search Bar** — search for any planet and jump directly to its section
- 🌠 **Starfield Background** — animated stars, shooting stars, and nebula gradients
- 🖱️ **Custom Cursor** — glowing dot + ring that follows the mouse
- ⏳ **Loading Screen** — animated planet with progress bar
- 📱 **Fully Responsive** — works on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool |
| Tailwind CSS | Styling |
| Framer Motion | Animations & scroll effects |
| Lucide React | Icons |
| HTML5 Canvas | Per-planet particle effects |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Tanusree1308/developer-universe.git

# Navigate into the project
cd developer-universe

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
developer-universe/
├── public/
├── src/
│   ├── components/
│   │   ├── Intro.jsx          # Hero screen with animated Sun + search bar
│   │   ├── PlanetSection.jsx  # All 8 planet full-screen sections
│   │   ├── effects.jsx        # Canvas particle effects per planet
│   │   ├── StarField.jsx      # Animated starfield background
│   │   ├── CursorGlow.jsx     # Custom cursor with glow
│   │   ├── LoadingScreen.jsx  # Animated loading screen
│   │   ├── Navbar.jsx         # Navigation bar
│   │   └── Footer.jsx         # Footer
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🪐 The Planets

| # | Planet | Special Effect | Unique Fact |
|---|--------|---------------|-------------|
| 01 | Mercury | ☄️ Meteor Showers | Hottest days, coldest nights |
| 02 | Venus | 🌫️ Acid Cloud Layers | Rotates backwards |
| 03 | Earth | 🌌 Aurora + Clouds | Only known life in the universe |
| 04 | Mars | 🌪️ Dust Storms | Home to the tallest volcano |
| 05 | Jupiter | ⚡ Lightning Storms | Great Red Spot — 350+ year storm |
| 06 | Saturn | 🧊 Ice Crystals | Rings span 282,000 km |
| 07 | Uranus | 💎 Diamond Rain | Tilted 98° on its axis |
| 08 | Neptune | 💎 Diamond Rain | Winds reach 2,100 km/h |

---

## 🌐 Deployment

This project is deployed on **Render** as a static site.

To deploy your own:

1. Push to GitHub
2. Go to [render.com](https://render.com) → New → Static Site
3. Connect your repo and set:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Deploy

---

## 📄 License

MIT License — feel free to use, modify, and share.

---

<p align="center">Made with ❤️ by <strong>Tanusree</strong> · <a href="https://developer-universe.onrender.com">developer-universe.onrender.com</a></p>
