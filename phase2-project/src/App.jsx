import { useState } from "react";

import AddBook from "./Components/AddBook";
import Requests from "./Components/Requests";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";

export const API_URL = "http://localhost:3001/";

function App() {
  return (
    <>
      <AddBook />
      <Requests />
      <Login />
      <Signup />
    </>
  );
}

export default App;
