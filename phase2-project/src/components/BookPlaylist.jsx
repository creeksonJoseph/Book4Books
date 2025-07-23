import React from 'react';
import './BookPlaylist.css';

function BookPlaylist({ books }) {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x400/065f46/ffffff?text=📚+Book+Cover';
  };

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
          <div key={book.id} className="book-card">
            {/* Book Image */}
            <div className="image-container">
              <img
                src={book.coverImageUrl}
                alt={book.title}
                onError={handleImageError}
                className="book-image"
              />
              {/* Overlay */}
              <div className="image-overlay"></div>
            </div>

            {/* Book Info */}
            <div className="book-info">
              <h4 className="book-title">{book.title}</h4>
              <p className="book-author">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookPlaylist;
