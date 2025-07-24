import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import BookPage from "./components/BookPage.jsx";



function App() {
  return (
    <Router>
 
      <Routes>
           <Route path="/book/:id" element={<BookPage />} />
     
      </Routes>
    </Router>
  );
}

export default App;
