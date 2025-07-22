import React from "react";

function ExchangeBook({ books }) {
  // Filter books by status
  const availableBooks = books.filter(book => book.status === "available");
  const borrowedBooks = books.filter(book => book.status === "borrowed");

  return (
    <div>
      <h2>Book Exchange</h2>
      
      <h3>Available</h3>
      <div className="book-row">
        {availableBooks.length === 0 && <p>No books available.</p>}
        {availableBooks.map(book => (
          <div key={book.id} className="book-card">
            <div>
              <strong>{book.title}</strong>
              <p>Owner: {book.owner}</p>
            </div>
          </div>
        ))}
      </div>

      <h3>Borrowed</h3>
      <div className="book-row">
        {borrowedBooks.length === 0 && <p>No books currently borrowed.</p>}
        {borrowedBooks.map(book => (
          <div key={book.id} className="book-card">
            <div>
              <strong>{book.title}</strong>
              <p>Owner: {book.owner}</p>
              <p>Borrowed by: {book.borrower}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExchangeBook;