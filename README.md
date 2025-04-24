📊 Ticker Dashboard
A modern, interactive web application for tracking and visualizing real-time stock ticker data.
Deployed live at 👉 https://tickerdashboard.co.uk

🌟 Live Demo
Experience the app instantly—no download or build steps:

Visit: https://tickerdashboard.co.uk

Browse: Real-time quotes, historical charts, and customizable watchlists

Interact: Filter tickers, adjust date ranges, and explore performance analytics

🚀 Key Features
Live Price Updates
Fetches up-to-the-second stock prices via a secure API.

Interactive Charts
Render dynamic, zoomable time-series charts for any selected symbol.

Custom Watchlists
Save and manage your favorite tickers in persistent user profiles.

User Authentication
Sign up and sign in with Clerk for secure, password-less access.

Responsive Design
Works seamlessly on desktop and mobile browsers.

🛠️ Technology Stack
Frontend:

React (UI components & state management)

TypeScript (type safety & developer tooling)

Vite (fast dev server & optimized production build) 
vitejs

Backend:

Express.js (REST API for mock stock data)

Clerk (authentication & user management)

Persistence:

Firebase (storing user preferences and watchlists)

Deployment:

Netlify / Vercel (static asset hosting)

Custom domain: tickerdashboard.co.uk

📐 Architecture Overview

┌────────────┐       ┌─────────────┐       ┌──────────────┐
│   Browser  │ ⇄ API │ Express.js  │ ⇄ DB  │   Firebase   │
│ (React +   │       │ (Mock Stock │       │ (User data & │
│  Vite)     │       │  Data)      │       │  preferences)│
└────────────┘       └─────────────┘       └──────────────┘
      │
      ▼
┌────────────────────┐
│  Clerk Auth Layer  │
│ (Sign-in / Sign-up)│
└────────────────────┘
