import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import backgroundImage from "../assets/taylor-D9_QOTmbFAg-unsplash.jpg";
import { API_URL } from "../App";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}books`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading books...</p>;
  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

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
        {/* <h1>Dashboard - Your Books</h1> */}
        <div className="card-grid">
          {books.map((book) => (
            <Link key={book.id} to={`/book/${book.id}`} className="book-card">
              <img src={book.cover_image_url} alt={book.title} />
              <h3>{book.title}</h3>
              <p style={{ fontStyle: "italic", fontSize: "0.85rem" }}>
                {book.synopsis}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
