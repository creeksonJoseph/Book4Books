import React, { useState } from "react";
import bg from "../assets/creative-composition-world-book-day.jpg";
import LoginRedirect from "./LoginRedirect.jsx";

function Login({ onLogin }) {
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

    // 🔐 Replace this with real login logic
    if (!formData.email || !formData.password) {
      setError("All fields are required");
      setIsLoggingIn(false);
      return;
    }

    try {
      onLogin?.(formData);
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex justify-center items-center px-4 py-10"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-emerald-900 to-black text-white p-10 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Log In</h2>

        {error && (
          <div className="mb-4 text-center text-red-400 font-semibold">
            {error}
          </div>
        )}

        <label className="block font-semibold mb-1">Email</label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-400 text-black"
        />

        <label className="block font-semibold mb-1">Password</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 rounded-lg bg-gray-400 text-black"
        />

        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full py-3 rounded-lg bg-emerald-800 hover:bg-emerald-700 font-semibold transition"
        >
          {isLoggingIn ? "Logging In..." : "Log In"}
        </button>
        <LoginRedirect />
      </form>
    </div>
  );
}

export default Login;
