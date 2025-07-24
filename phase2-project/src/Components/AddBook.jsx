import React, { useState } from "react";
import bg from "../assets/creative-composition-world-book-day.jpg";
import { API_URL } from "../App";

function AddBook({ onAddBook }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    synopsis: "",
    full_description: "",
    cover_image_url: "",
    contacts: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");

    const newBook = {
      ...formData,
      available: true,
      ownerId: 1, // replace with real user ID later
    };

    try {
      const response = await fetch(`${API_URL}books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) throw new Error("Failed to add book");

      const savedBook = await response.json();
      onAddBook && onAddBook(savedBook);

      setFormData({
        title: "",
        author: "",
        synopsis: "",
        full_description: "",
        cover_image_url: "",
        contacts: "",
      });
      setSuccessMessage("Book added successfully!");
    } catch (error) {
      console.error(error);
      setSuccessMessage("Failed to add book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div
      className="bg-cover bg-center min-h-screen flex justify-center items-center px-4 py-10"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundImage: `
      linear-gradient(
        to bottom right,
        rgba(6, 95, 70, 0.7),
        rgba(0, 0, 0, 0.7),
        rgba(31, 41, 55, 0.7)
      ),
      url('${bg}')
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          color: "white",
        }}
        className="text-white p-10 rounded-xl shadow-xl w-full max-w-4xl backdrop-blur-md border border-white/20"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Add a Book</h2>
        {successMessage && (
          <div className="mb-6 text-center text-green-400 font-semibold">
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side */}
          <div>
            <label htmlFor="title" className="block font-semibold mb-1">
              Book Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Book Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-400 text-black"
            />

            <label htmlFor="author" className="block font-semibold mb-1">
              Author
            </label>
            <input
              type="text"
              name="author"
              id="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-400 text-black"
            />

            <label htmlFor="synopsis" className="block font-semibold mb-1">
              Synopsis
            </label>
            <input
              type="text"
              name="synopsis"
              id="synopsis"
              placeholder="Short summary"
              value={formData.synopsis}
              onChange={handleChange}
              required
              className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-400 text-black"
            />

            <label htmlFor="contacts" className="block font-semibold mb-1">
              Contact Info
            </label>
            <input
              type="text"
              name="contacts"
              id="contacts"
              placeholder="e.g. 192.168.1.1 or phone/email"
              value={formData.contacts}
              onChange={handleChange}
              required
              className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-400 text-black"
            />
          </div>

          {/* Right Side */}
          <div>
            <label
              htmlFor="full_description"
              className="block font-semibold mb-1"
            >
              Full Description
            </label>
            <textarea
              name="full_description"
              id="full_description"
              placeholder="Detailed description"
              value={formData.full_description}
              onChange={handleChange}
              required
              rows={6}
              className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-400 text-black resize-none"
            />

            <label
              htmlFor="cover_image_url"
              className="block font-semibold mb-1"
            >
              Cover Image URL
            </label>
            <input
              type="url"
              name="cover_image_url"
              id="cover_image_url"
              placeholder="https://example.com/image.jpg"
              value={formData.cover_image_url}
              onChange={handleChange}
              required
              className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-400 text-black"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full py-3 rounded-lg bg-emerald-800 hover:bg-emerald-700 font-semibold transition"
        >
          {isSubmitting ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}

export default AddBook;
