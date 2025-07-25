import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

function Navbar({ currentUser }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/dashboard" className="navbar-logo">
            <FontAwesomeIcon
              icon={faBook}
              className="navbar-icon"
            />
            <h1 className="navbar-title">
              Book4Books
            </h1>
          </Link>

          <div className="navbar-links">
            <Link
              to="/mybooks"
              className={`navbar-link ${isActive("/my-books") ? "active" : ""}`}
            >
              My Books Playlist
            </Link>
            <Link
              to="/requests"
              className={`navbar-link ${isActive("/requests") ? "active" : ""}`}
            >
              Request Page
            </Link>
            <Link
              to="/exchange"
              className={`navbar-link ${isActive("/exchange") ? "active" : ""}`}
            >
              Exchange Page
            </Link>
            <Link
              to="/addbook"
              className={`navbar-link ${isActive("/add-book") ? "active" : ""}`}
            >
              Add Book
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
