import React, { useEffect, useState } from "react";
import "./SplashScreen.css";

function SplashScreen() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // under 1024px = mobile
    };
    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="splash-screen flex items-center justify-center text-center bg-black text-white px-6">
        <div>
          <h1 className="text-3xl font-bold mb-4 animate-pulse">
            Mobile Version Not Available
          </h1>
          <p className="opacity-80 mb-6">
            BOOK4BOOK is currently optimized for desktop. <br />
            Please switch to a larger screen to continue.
          </p>
          <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center animate-bounce">
            📚
          </div>
        </div>
      </div>
    );
  }

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
