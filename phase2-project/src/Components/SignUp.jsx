import React, { useState } from "react";
import bg from "../assets/creative-composition-world-book-day.jpg";
import SignupRedirect from "./SignUpRedirect";

function Signup({ onSignup }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
      // Hook into real API later
      onSignup?.(formData);
    } catch (err) {
      setError("Signup failed. Try again.");
    } finally {
      setIsSubmitting(false);
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
        <h2 className="text-3xl font-bold mb-8 text-center">Sign Up</h2>

        {error && (
          <div className="mb-4 text-center text-red-400 font-semibold">
            {error}
          </div>
        )}

        <label className="block font-semibold mb-1">Username</label>
        <input
          type="text"
          name="username"
          placeholder="yourname"
          value={formData.username}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-400 text-black"
        />

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
          className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-400 text-black"
        />

        <label className="block font-semibold mb-1">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="********"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 rounded-lg bg-gray-400 text-black"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-lg bg-emerald-800 hover:bg-emerald-700 font-semibold transition"
        >
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </button>
        <SignupRedirect />
      </form>
    </div>
  );
}

export default Signup;
