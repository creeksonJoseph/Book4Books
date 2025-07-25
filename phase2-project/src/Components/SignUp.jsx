import React, { useState } from "react";
import bg from "../assets/creative-composition-world-book-day.jpg";
import SignupRedirect from "./SignUpRedirect";
import { API_URL } from "../App";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function Signup({ onSignup }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required");
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) throw new Error("Failed to signup");

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      if (onSignup) onSignup();
      navigate("/Dashboard");
    } catch (err) {
      setError("Signup failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${bg})` }}>
      <form onSubmit={handleSubmit} className="signup-form" style={{ backgroundImage: `url(${bg})` }}>
        <h2 className="signup-title">Sign Up</h2>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <label className="form-label">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="yourname"
          className="form-input"
        />

        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="form-input"
        />

        <label className="form-label">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="********"
          className="form-input"
        />

        <label className="form-label">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="********"
          className="form-input"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </button>

        <SignupRedirect />
      </form>
    </div>
  );
}

export default Signup;
