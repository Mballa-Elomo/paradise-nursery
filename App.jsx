import React, { useState } from 'react';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  const [showAbout, setShowAbout] = useState(false);
  const [showShop, setShowShop] = useState(false);

  return (
    <div>
      {/* ===== Navbar ===== */}
      <nav className="navbar">
        <h2>🌿 Paradise Nursery</h2>
        <div>
          <button
            onClick={() => { setShowAbout(false); setShowShop(false); }}
            style={{ marginRight: '16px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1rem' }}
          >
            Home
          </button>
          <button
            onClick={() => { setShowAbout(true); setShowShop(false); }}
            style={{ marginRight: '16px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1rem' }}
          >
            About Us
          </button>
          <span className="cart-icon">🛒 Cart</span>
        </div>
      </nav>

      {/* ===== Landing Page ===== */}
      {!showAbout && !showShop && (
        <div className="landing-page">
          <div className="landing-overlay">
            <h1>Welcome to Paradise Nursery 🌿</h1>
            <p>
              Your one-stop shop for beautiful, high-quality plants. <br />
              Bring nature into your home today!
            </p>
            <button onClick={() => setShowShop(true)}>
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* ===== About Us Page ===== */}
      {showAbout && (
        <div style={{ marginTop: '80px' }}>
          <AboutUs />
        </div>
      )}

      {/* ===== Shop Page (Placeholder) ===== */}
      {showShop && (
        <div style={{ marginTop: '80px', padding: '40px', textAlign: 'center' }}>
          <h2>🌱 Our Plant Collection</h2>
          <p>Coming soon... Browse our amazing plants!</p>
        </div>
      )}
    </div>
  );
}

export default App;
