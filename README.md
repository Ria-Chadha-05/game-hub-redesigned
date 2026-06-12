<div align="center">

# 🎮 Game Hub Redesigned

**A modern, dark-themed redesign of my original browser game hub, built with Next.js 15, TypeScript, and a fully component-driven architecture.**

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)

[Overview](#-overview) · [Features](#-features) · [Tech Stack](#-tech-stack) · [Project Structure](#-project-structure) · [Running Locally](#-running-locally) · [Adding a Game](#-adding-a-game) · [Deployment](#-deployment)

**🔗 Live Site:** https://game-hub-redesigned.vercel.app/
</div>


## 📌 Overview

Game Hub Redesigned is an enhanced version of a browser game hub I previously developed. This iteration focuses on improving the overall user experience through a complete UI refresh, refined visual design, smoother interactions, improved responsiveness, and bug fixes across the platform.

The application features four classic browser games — **Tic Tac Toe, Snake, Whack A Mole, and Memory Cards** — all playable instantly with no downloads or sign-ups.

### Improvements Over the Original Version

- Complete UI redesign with a modern dark aesthetic
- Enhanced animations, hover interactions, and transitions
- Improved responsive layouts across devices
- Better visual hierarchy and game discoverability
- Refined component architecture and code organization
- Fixed minor UI and gameplay issues from the previous version
- Improved consistency across all game pages
- Enhanced maintainability for future game additions

The architecture follows a clean **per-route component pattern**: every game lives in its own `app/<game>/` route with a self-contained `components/` folder. Shared UI (header, footer, icons) lives in `src/components/` and is reused across all routes. Adding a new game means adding one new route — nothing else needs to change.

Built for performance, clean dark aesthetics, and easy long-term maintainability.

> **Note:** This repository represents a redesign and refinement of my previously developed Game Hub project. The primary goal of this version was to improve UI/UX, responsiveness, maintainability, and overall user experience while preserving the core gameplay functionality.

---

## ✨ Features

### 🎨 UI & Animations

- Near-black dark theme with per-game accent colours (blue · green · amber · purple)
- Spotlight card hover effect — radial gradient tracks the mouse cursor
- Staggered `slideInBlur` entrance animations on the hero section
- Grid background texture with subtle opacity
- Glassmorphism-style header that transitions on scroll
- Improved spacing, typography, and visual hierarchy

### 🕹 Games

| Game | Highlights |
|--------|------------|
| **Tic Tac Toe** | Two-player, win detection, persistent score across rounds |
| **Snake** | Canvas-rendered, WASD + arrow key support, speed scales with score, pause/resume |
| **Whack A Mole** | 30-second countdown, random mole spawning, hit animation |
| **Memory Cards** | Three difficulty levels (Easy · Medium · Hard), 3D card flip, best score tracking |

### 💾 Persistent Scores

- High scores and best move counts saved to `localStorage`
- Scores persist across page refreshes per game
- Reset buttons available in each game UI

### 📱 Responsive Layout

- Two-column game card grid collapses to single column on mobile
- Fixed header with mobile menu button
- All game boards scale within their containers
- Improved mobile responsiveness compared to the original version

---

## 🛠 Tech Stack

| Layer | Technology |
|---------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 3 + CSS Custom Properties + Keyframes |
| **Icons** | Heroicons v2 (`@heroicons/react`) |
| **Canvas** | Native HTML5 Canvas API (Snake Game) |
| **Storage** | Browser `localStorage` |
| **Deployment** | Vercel |

---

## 🏗 Project Structure

```text
Game Zone/
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── not-found.tsx
    │   ├── homepage/
    │   │   ├── page.tsx
    │   │   └── components/
    │   ├── tic-tac-toe/
    │   ├── snake-game/
    │   ├── memory-cards/
    │   └── whack-a-mole/
    ├── components/
    │   ├── common/
    │   └── ui/
    └── styles/
```

---

## 🚀 Running Locally

### Clone the repository

```bash
git clone https://github.com/<your-username>/game-hub-redesigned.git
cd game-hub-redesigned
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🎮 Adding a Game

The per-route architecture makes extending the platform straightforward.

### Create a route

```text
src/app/<your-game>/
├── page.tsx
└── components/
    ├── YourGame.tsx
    ├── GameBoard.tsx
    ├── GameControls.tsx
    └── GameStats.tsx
```

### Register the route

Add the route to:

- Navigation (`Header.tsx`)
- Homepage game grid (`GameGrid.tsx`)

No other architectural changes are required.

---

## 🌐 Deployment

The application is deployed on **Vercel** with automatic redeployment on every push to the main branch.

### Deploy Your Own Fork

1. Fork the repository
2. Import it into Vercel
3. Vercel automatically detects Next.js
4. Click **Deploy**

### Push Updates

```bash
git add .
git commit -m "your message"
git push
```

Vercel automatically redeploys the latest version.

---

## 🎬 Demo

<p align="center">
  <a href="https://youtu.be/YjoO7ugkWAk">
    <img src="https://img.youtube.com/vi/YjoO7ugkWAk/maxresdefault.jpg" width="800">
  </a>
</p>

---

## ⚠️ Known Limitations

- No multiplayer support
- Scores are stored locally in the browser
- Snake currently relies on keyboard controls
- No cross-device score synchronization

---

## 🔮 Future Improvements

- 📱 Touch/swipe controls for Snake
- 🌐 Online leaderboard integration
- 🤖 AI-powered Tic Tac Toe opponent
- 🌙 Theme switcher (Dark/Light)
- 🔊 Sound effects and game feedback
- 🏆 Achievement system

---

## 👨‍💻 Author

**Ria Chadha**

---
