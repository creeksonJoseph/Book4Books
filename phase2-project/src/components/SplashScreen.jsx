import React from 'react';
import './SplashScreen.css';

function SplashScreen() {
  return (
    <div className="splash-screen">
      <div className="splash-overlay"></div>
      <div className="splash-content">
        <div className="welcome-text">Welcome to</div>
        <div className="app-name">
          <span className="book-text">BOOK</span>
          <span className="for-text">4</span>
          <span className="book-text">BOOK</span>
        </div>
        <div className="app-subtitle">Your Community Library Exchange</div>
        <div className="loading-animation">
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;