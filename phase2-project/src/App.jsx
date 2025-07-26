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
  const currentUser = { id: "user1" };

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;

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
