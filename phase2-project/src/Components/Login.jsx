import React, { useState } from "react";
import bg from "../assets/creative-composition-world-book-day.jpg";
import LoginRedirect from "./LoginRedirect.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError("");

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      setIsLoggingIn(false);
      return;
    }

    try {
      onLogin?.(formData);
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${bg})` }}>
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Log In</h2>

        {error && <div className="error-message">{error}</div>}

        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
        />

        <label className="form-label">Password</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          value={formData.password}
          onChange={handleChange}
          className="form-input"
        />

        <button type="submit" disabled={isLoggingIn} className="submit-button">
          {isLoggingIn ? "Logging In..." : "Log In"}
        </button>

        <LoginRedirect />
      </form>
    </div>
  );
}

export default Login;
