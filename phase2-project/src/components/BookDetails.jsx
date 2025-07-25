import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './BookDetails.css';

function BookDetails({ books, currentUser }) {
  const { id } = useParams();
  const book = books.find(b => b.id === id);

  if (!book) {
    return <div className="book-details-container">Book not found</div>;
  }

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x600/065f46/ffffff?text=📚+Book+Cover';
  };

  const getBorrowDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    return date.toLocaleDateString();
  };

  const getReturnDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 14) + 1);
    return date.toLocaleDateString();
  };

  const isReadByUser = () => {
    return Math.random() > 0.5;
  };

  return (
    <div className="book-details-container">
      <Link to="/" className="back-button">← Back to Library</Link>
      
      <div className="book-details">
        <div className="book-image-section">
          <img
            src={book.coverImageUrl}
            alt={book.title}
            onError={handleImageError}
            className="detail-book-image"
          />
        </div>

        <div className="book-info-section">
          <h1 className="detail-title">{book.title}</h1>
          <p className="detail-description">{book.description}</p>

          <div className="book-metadata">
            <div className="metadata-item">
              <strong>Owner:</strong> {book.owner}
            </div>

            <div className="metadata-item">
              <strong>Status:</strong>
              <span className={`status-badge ${book.status}`}>
                {book.status === 'available' ? '✅ Available' : '📚 Borrowed'}
              </span>
            </div>

            {book.status === 'borrowed' && (
              <>
                <div className="metadata-item">
                  <strong>Borrowed by:</strong> {book.borrower}
                </div>
                <div className="metadata-item">
                  <strong>Date borrowed:</strong> {getBorrowDate()}
                </div>
                <div className="metadata-item">
                  <strong>Expected return:</strong> {getReturnDate()}
                </div>
              </>
            )}

            <div className="metadata-item">
              <strong>Read by you:</strong>
              <span className={`read-status ${isReadByUser() ? 'read' : 'unread'}`}>
                {isReadByUser() ? '✅ Read' : '📖 Not Read'}
              </span>
            </div>
          </div>

          <div className="action-buttons">
            {book.status === 'available' && book.owner !== currentUser.id && (
              <button className="borrow-button">📚 Borrow Book</button>
            )}
            {book.borrower === currentUser.id && (
              <button className="return-button">↩️ Return Book</button>
            )}
            <button className="mark-read-button">
              {isReadByUser() ? '📖 Mark as Unread' : '✅ Mark as Read'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
