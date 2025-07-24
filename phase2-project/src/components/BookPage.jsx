import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import backgroundImage from "../assets/taylor-D9_QOTmbFAg-unsplash.jpg";
import { API_URL } from "../App";

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch book data");
        return res.json();
      })
      .then((data) => setBook(data))
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
      <div className="book-detail">
        <img
          src={book.cover_image_url}
          alt={book.title}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        />
        <h2>{book.title}</h2>
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        <p>
          <strong>Genre:</strong> {book.genre}
        </p>
        <p>
          <strong>Synopsis:</strong> {book.synopsis}
        </p>
      </div>
    </div>
  );
};

export default BookPage;
