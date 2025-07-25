// src/components/BookPage.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/taylor-D9_QOTmbFAg-unsplash.jpg";
import { API_URL } from "../App";

const BookPage = ({ currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch book data");
        return res.json();
      })
      .then((data) => setBook(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const handleBorrow = () => {
    if (!currentUser?.id) {
      alert("You must be logged in to borrow a book.");
      return;
    }

    const borrowData = {
      bookId: book.id,
      title: book.title,
      coverImageUrl: book.cover_image_url,
      contact: book.contacts || "N/A",
      status: "pending",
      borrowerId: currentUser.id,
    };

    fetch(`${API_URL}borrowedBooks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(borrowData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to send borrow request");
        return res.json();
      })
      .then(() => {
        alert("Borrow request sent!");
        navigate("/exchange");
      })
      .catch((err) => {
        console.error(err);
        alert("Error sending borrow request.");
      });
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!book) return <p>Loading...</p>;

  return (
    <div
      className="bookpage-background"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(34, 197, 94, 0.7)",
        minHeight: "100vh",
        padding: "40px",
        color: "white",
      }}
    >
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          backgroundColor: "#065f46",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ← Back to Dashboard
      </button>

      <div className="book-detail" style={{ maxWidth: "600px", margin: "auto" }}>
        <img
          src={book.cover_image_url}
          alt={book.title}
          style={{
            width: "100%",
            maxWidth: "300px",
            aspectRatio: "2 / 3",
            objectFit: "cover",
            borderRadius: "8px",
            margin: "0 auto 20px",
            display: "block",
          }}
        />
        <h2>{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Description:</strong> {book.full_description}</p>
        <p><strong>Contact:</strong> {book.contacts || "Not provided"}</p>
        <button
          onClick={handleBorrow}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#047857",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Borrow
        </button>
      </div>
    </div>
  );
};

export default BookPage;

