import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
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

export const API_URL = "http://localhost:3001/";

function App() {
  const [books, setBooks] = useState([]);
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
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
    }, 3000); // Reduced from 15s to 3s for UX

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
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/book/:id" element={<BookPage />} />
        <Route
          path="/library"
          element={
            <>
              <div className="flex-1 p-8 border-b border-emerald-700">
                <div className="max-w-7xl mx-auto">
                  <BookPlaylist books={books} />
                </div>
              </div>
              <div className="flex-1 p-8">
                <div className="max-w-7xl mx-auto">
                  <ExchangePage books={books} currentUser={currentUser} />
                </div>
              </div>
            </>
          }
        />
        <Route
          path="/bookdetails/:id"
          element={<BookDetails books={books} currentUser={currentUser} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
