import { Routes, Route } from "react-router-dom";
import AddBook from "./Components/AddBook";
import Requests from "./Components/Requests";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";

export const API_URL = "http://localhost:3001/";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/addbook" element={<AddBook />} />
      <Route path="/requests" element={<Requests />} />
    </Routes>
  );
}

export default App;
