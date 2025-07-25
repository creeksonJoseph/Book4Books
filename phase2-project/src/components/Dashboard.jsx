import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import backgroundImage from "../assets/taylor-D9_QOTmbFAg-unsplash.jpg";
import { API_URL } from "../App";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}books`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading books...</p>;

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
        <div className="card-grid">
          {books.map((book) => (
            <Link key={book.id} to={`/book/${book.id}`} className="book-card">
              <img src={book.cover_image_url} alt={book.title} />
              <h3>{book.title}</h3>
              <p style={{ fontStyle: "italic", fontSize: "0.85rem" }}>{book.synopsis}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
