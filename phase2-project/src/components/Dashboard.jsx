import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../App"; // ✅ Ensure API_URL is imported
import "../App.css";
import backgroundImage from "../assets/taylor-D9_QOTmbFAg-unsplash.jpg";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // ✅ Add error state

  useEffect(() => {
    fetch(`${API_URL}books`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch books");
        return res.json();
      })
      .then((data) => {
        const booksData = Array.isArray(data) ? data : data.books || [];
        setBooks(booksData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: "center", color: "white" }}>Loading books...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div
      className="dashboard-background"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <div className="dashboard-container">
        <h1 style={{ color: "white", textAlign: "center", marginBottom: "2rem" }}>
          Book Library
        </h1>

        <div className="card-grid">
          {books.map((book) => (
            <Link key={book.id} to={`/book/${book.id}`} className="book-card">
            <img
              src={book.coverImageUrl || book.cover_image_url || 'https://via.placeholder.com/300x400/065f46/ffffff?text=📚+Book+Cover'}
              alt={book.title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x400/065f46/ffffff?text=📚+Book+Cover';
              }}
            />

              <h3 style={{ color: "white", margin: "1rem 0 0.5rem 0" }}>{book.title}</h3>
              <p style={{ fontStyle: "italic", fontSize: "0.85rem", color: "white" }}>
                {book.synopsis || book.description || 'No description available'}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
