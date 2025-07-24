import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Navbar from "./components/Navbar.jsx";


function App() {
  return (
    <Router>
      <Navbar />
     
    </Router>
  );
}

export default App;
