import React, { useState } from "react";
import bg from "../assets/creative-composition-world-book-day.jpg";
import { API_URL } from "../App";
import "./AddBook.css";

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
    <div className="add-book-container" style={{ backgroundImage: `url(${bg})` }}>
      <form onSubmit={handleSubmit} className="add-book-form" style={{ backgroundImage: `url(${bg})` }}>
        <h2 className="form-title">Add a Book</h2>
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        <div className="form-grid">
          <div className="form-left">
            <label htmlFor="title" className="form-label">
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
              className="form-input"
            />

            <label htmlFor="author" className="form-label">
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
              className="form-input"
            />

            <label htmlFor="synopsis" className="form-label">
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
              className="form-input"
            />

            <label htmlFor="contacts" className="form-label">
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
              className="form-input"
            />
          </div>

          <div className="form-right">
            <label htmlFor="full_description" className="form-label">
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
              className="form-textarea"
            />

            <label htmlFor="cover_image_url" className="form-label">
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
              className="form-input"
            />
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}

export default AddBook;
