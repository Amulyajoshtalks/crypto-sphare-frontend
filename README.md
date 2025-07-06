# 💹 Cryptocurrency Tracker - Full Stack Application

A full-stack cryptocurrency tracking and conversion application built with **React + Vite** on the frontend and **Express + Node.js** backend acting as a proxy to the CoinMarketCap API.

---

## 🔧 Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, Axios, Framer Motion
- **Backend**: Node.js, Express, Axios, dotenv, CORS
- **API**: CoinMarketCap (via backend proxy)

---

## 🚀 Project Features

- Live listing of top 100 cryptocurrencies
- Real-time currency conversion using CoinMarketCap
- Mobile-first responsive design
- Favorite coin caching via LocalStorage
- Animations for interactive UI
- Clean error handling and retry mechanisms
- Production-ready architecture

---

## 🖥️ Architecture Overview

### ⚙️ Why React + Vite?
- **Fast Development** with Hot Module Replacement
- **Component-Based UI** for modular design
- **Great Performance** using ES modules and efficient builds
- **Scalable & Maintainable** code structure

### 🧱 App Diagram

┌──────────────────────┐ ┌──────────────────────┐
│ CoinMarketCap │ │ Backend │
│ API │◄─────►│ Proxy │
└──────────────────────┘ └──────────────────────┘
▲ ▲
│ │
▼ ▼
┌──────────────────────┐ ┌──────────────────────┐
│ Frontend │ │ LocalStorage │
│ (React with Vite) │───────│ (Favorites Cache) │
└──────────────────────┘ └──────────────────────┘
│
▼
┌──────────────────────┐
│ Browser │
└──────────────────────┘


---

## 📁 Folder Structure

src/
├── assets/            # Static assets
├── components/        # Reusable components
│   ├── common/        # Common UI components
│   ├── converter/     # Converter components
│   └── home/          # Homepage components
├── context/           # Global state management
├── hooks/             # Custom React hooks
├── pages/             # Application pages
├── services/          # API services
├── styles/            # Global styles and animations
├── App.jsx            # Main application component
└── main.jsx           # Application entry point