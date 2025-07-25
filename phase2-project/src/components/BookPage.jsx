import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css";
import backgroundImage from "../assets/taylor-D9_QOTmbFAg-unsplash.jpg";

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch book data");
        return res.json();
      })
      .then((data) => {
        const booksData = Array.isArray(data) ? data : data.books || [];
        const foundBook = booksData.find(book => book.id === id);
        if (foundBook) {
          setBook(foundBook);
        } else {
          throw new Error("Book not found");
        }
      })
      .catch((err) => setError(err.message));
  }, [id]);

  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  if (!book) return <p style={{ textAlign: "center" }}>Loading book...</p>;

  return (
    <div
      className="bookpage-background"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <Link to="/dashboard" style={{ color: "white", textDecoration: "none", marginBottom: "20px", display: "block" }}>
        ← Back to Dashboard
      </Link>
      <div className="book-detail">
        <img
          src={book.coverImageUrl || book.cover_image_url || 'https://via.placeholder.com/300x400/065f46/ffffff?text=📚+Book+Cover'}
          alt={book.title}
          style={{
            width: "100%",
            maxWidth: "300px",
            height: "auto",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400/065f46/ffffff?text=📚+Book+Cover';
          }}
        />
        <h2 style={{ color: "white" }}>{book.title}</h2>
        <p style={{ color: "white" }}>
          <strong>Author:</strong> {book.author || 'Unknown Author'}
        </p>
        <p style={{ color: "white" }}>
          <strong>Description:</strong> {book.description || book.synopsis || 'No description available'}
        </p>
        <p style={{ color: "white" }}>
          <strong>Status:</strong> {book.status || 'Available'}
        </p>
        {book.genre && (
          <p style={{ color: "white" }}>
            <strong>Genre:</strong> {book.genre}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookPage;
