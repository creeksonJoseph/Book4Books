import React, { useState } from "react";
import bg from "../assets/creative-composition-world-book-day.jpg";

function AddBook({ onAddBook }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    coverImageUrl: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      ...formData,
      status: "Available",
      ownerId: "user1", // Hardcoded for now
    };
    onAddBook(newBook);
    setFormData({ title: "", author: "", genre: "", coverImageUrl: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className="bg-cover bg-center h-screen w-full flex justify-center items-center min-h-screen"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="add-book-form max-w-md mx-auto mt-10 p-8 rounded-xl shadow-lg bg-gradient-to-br from-emerald-900 to-black"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Add a Book
        </h2>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-400 text-black placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-900"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-400 text-black placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-900"
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-400 text-black placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-900"
        />
        <input
          type="url"
          name="coverImageUrl"
          placeholder="Cover Image URL"
          value={formData.coverImageUrl}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 rounded-lg bg-gray-400 text-black placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-900"
        />
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-emerald-900 text-white font-semibold hover:bg-green-900 transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
