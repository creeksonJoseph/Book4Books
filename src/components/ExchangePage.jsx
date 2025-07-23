import React from "react";

function ExchangePage({ books, currentUser }) {
  // Books this user borrowed
  const borrowedBooks = books.filter(
    book => book.borrower === currentUser.id && book.status === "borrowed"
  );
  // Books user wants to exchange (owns and marked as "available")
  const availableBooks = books.filter(
    book => book.owner === currentUser.id && book.status === "available"
  );

  return (
    <div>
      <h2>Book Exchange</h2>

      <h3>Books I've Borrowed</h3>
      <div className="book-row">
        {borrowedBooks.length === 0 && <p>You haven't borrowed any books yet.</p>}
        {borrowedBooks.map(book => (
          <div key={book.id} className="book-card">
            <img src={book.coverImageUrl} alt={book.title} width={80} />
            <div>
              <strong>{book.title}</strong> <br/>
              <span>From: {book.owner}</span>
            </div>
          </div>
        ))}
      </div>

      <h3>Books I'm Offering for Exchange</h3>
      <div className="book-row">
        {availableBooks.length === 0 && <p>No books available for exchange.</p>}
        {availableBooks.map(book => (
          <div key={book.id} className="book-card">
            <img src={book.coverImageUrl} alt={book.title} width={80} />
            <div>
              <strong>{book.title}</strong>
              <p>{book.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExchangePage;
