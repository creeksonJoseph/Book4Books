import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <FontAwesomeIcon icon={faBook} className="navbar-icon" />
        <span className="navbar-title">BOOK4BOOKS</span>
      </div>
      <div className="navbar-links">
        <Link to="/my-books">My Books Playlist</Link>
        <Link to="/requests">Request Page</Link>
        <Link to="/exchange">Exchange Page</Link>
        <Link to="/add-book">Add Book Page</Link>
      </div>
    </nav>
  );
}
