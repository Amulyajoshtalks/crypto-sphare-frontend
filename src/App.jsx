import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CryptoProvider } from './context/CryptoContext';
import HomePage from './pages/HomePage';
import CryptoConverter from './pages/CryptoConverter';
import Header from './components/common/Header';
import './styles/index.css';
import './styles/animations.css';

function App() {
  return (
    <CryptoProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <Header />
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/converter" element={<CryptoConverter />} />
            </Routes>
          </main>
          <footer className="py-4 text-center text-gray-500 text-sm">
            <p>© 2025 CryptoSphere Tracker | Data provided by CoinMarketCap</p>
          </footer>
        </div>
      </Router>
    </CryptoProvider>
  );
}

export default App;