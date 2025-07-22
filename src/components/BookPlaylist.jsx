import React from "react";

function BookPlaylist({ books }) {
  // Filter books by status
  const readBooks = books.filter(book => book.status === "read");
  const notReadBooks = books.filter(book => book.status === "not-read");

  return (
    <div>
      <h2>Book Playlist</h2>
      
      <h3>Read</h3>
      <div className="book-row">
        {readBooks.length === 0 && <p>No books marked as read yet.</p>}
        {readBooks.map(book => (
          <div key={book.id} className="book-card">
            <img src={book.coverImageUrl} alt={book.title} width={80} />
            <div>
              <strong>{book.title}</strong>
              <p>{book.description}</p>
            </div>
          </div>
        ))}
      </div>

      <h3>Not Read</h3>
      <div className="book-row">
        {notReadBooks.length === 0 && <p>No unread books.</p>}
        {notReadBooks.map(book => (
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

export default BookPlaylist;