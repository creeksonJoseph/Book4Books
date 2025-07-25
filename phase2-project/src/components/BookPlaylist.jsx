import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../App';
import './BookPlaylist.css';

function BookPlaylist({ currentUser = { id: "user1" } }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books from JSON server
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        console.log('Fetching from:', `${API_URL}books`);
        const response = await fetch(`${API_URL}books`);
        console.log('Response status:', response.status);
        if (response.ok) {
          const booksData = await response.json();
          console.log('Books data received:', booksData);
          setBooks(Array.isArray(booksData) ? booksData : []);
        } else {
          setError('Failed to fetch books');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Network error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleImageError = (e) => {
    e.target.src = 'https://picsum.photos/300/400?random=3';
  };

  if (loading) {
    return <div className="book-playlist">Loading books...</div>;
  }

  if (error) {
    return <div className="book-playlist">Error: {error}</div>;
  }

  if (!books || books.length === 0) {
    return (
      <div className="book-playlist">
        <div className="header">
          <h2 className="title">📚 My Book Collection</h2>
          <div className="title-underline"></div>
        </div>
        <p className="no-books-text">No books available</p>
      </div>
    );
  }

  return (
    <div className="book-playlist">
      {/* Header */}
      <div className="header">
        <h2 className="title">
          📚 My Book Collection
        </h2>
        <div className="title-underline"></div>
      </div>

      {/* Book Grid */}
      <div className="book-grid">
        {books.map(book => (
          <div key={book.id} className="book-card-container">
            <Link to={`/book/${book.id}`} className="book-card-link">
              <div className="book-card">
                {/* Book Image */}
                <div className="image-container">
                  <img
                    src={book.coverImageUrl || 'https://via.placeholder.com/300x400/065f46/ffffff?text=Book+Cover'}
                    alt={book.title || 'Book'}
                    onError={handleImageError}
                    className="book-image"
                  />
                  {/* Overlay */}
                  <div className="image-overlay"></div>
                </div>

                {/* Book Info */}
                <div className="book-info">
                  <h4 className="book-title">{book.title || 'Untitled'}</h4>
                  <p className="book-author">{book.description || 'No description'}</p>
                  <div className="book-status">
                    <span className={`status-badge ${book.status || 'available'}`}>
                      {book.status === 'available' ? '✅ Available' : '📚 Borrowed'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookPlaylist;

