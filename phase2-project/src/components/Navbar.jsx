import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

function Navbar({ currentUser }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-slate-800/90 backdrop-blur-sm border-b border-emerald-500/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Logo */}
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faBook} className="text-emerald-300 text-2xl" />
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
              Book4Books
            </h1>
          </div>

          {/* Right Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/my-books"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive("/my-books")
                  ? "bg-emerald-600 text-white"
                  : "text-emerald-300 hover:text-white hover:bg-emerald-600/50"
              }`}
            >
              My Books Playlist
            </Link>
            <Link
              to="/requests"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive("/requests")
                  ? "bg-emerald-600 text-white"
                  : "text-emerald-300 hover:text-white hover:bg-emerald-600/50"
              }`}
            >
              Request Page
            </Link>
            <Link
              to="/exchange"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive("/exchange")
                  ? "bg-emerald-600 text-white"
                  : "text-emerald-300 hover:text-white hover:bg-emerald-600/50"
              }`}
            >
              Exchange Page
            </Link>
            <Link
              to="/add-book"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive("/add-book")
                  ? "bg-emerald-600 text-white"
                  : "text-emerald-300 hover:text-white hover:bg-emerald-600/50"
              }`}
            >
              Add Book
            </Link>

            {/* Welcome Text */}
            <div className="text-emerald-300 text-sm">
              Welcome, {currentUser?.name || "User"}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
