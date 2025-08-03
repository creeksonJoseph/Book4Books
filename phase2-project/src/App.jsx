import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import BookPage from "./components/BookPage";
import BookDetails from "./components/BookDetails";
import BookPlaylist from "./components/BookPlaylist";
import ExchangePage from "./components/ExchangePage";
import SplashScreen from "./components/SplashScreen";
import AddBook from "./Components/AddBook";
import Requests from "./Components/Requests";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";

import "./App.css";

export const API_URL = "https://phase-2-project-server-24u0.onrender.com/";

function App() {
  const [books, setBooks] = useState([]);
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // 🔹 Detect mobile

  const currentUser = { id: "user1" };

  // 🔹 Detect small screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize(); // check immediately
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Fetch books
  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }, []);

  // 🔹 Splash screen timeout (desktop only)
  useEffect(() => {
    if (!isMobile) {
      const timer = setTimeout(() => setShowSplash(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  // 🔹 Always show splash screen on mobile
  if (isMobile || showSplash) return <SplashScreen />;

  // 🔹 Show loading screen
  if (isLoading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#14532d",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#6ee7b7",
          fontSize: "1.5rem",
        }}
      >
        Loading your library...
      </div>
    );
  }

  return (
    <>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/book/:id" element={<BookPage />} />
        <Route
          path="/mybooks"
          element={<BookPlaylist currentUser={currentUser} />}
        />
        <Route
          path="/exchange"
          element={<ExchangePage currentUser={currentUser} />}
        />
        <Route
          path="/bookdetails/:id"
          element={<BookDetails books={books} currentUser={currentUser} />}
        />
      </Routes>
    </>
  );
}

export default App;
