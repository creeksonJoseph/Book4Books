import React from 'react'

function ExchangePage({ books, currentUser }) {
  const borrowedBooks = books.filter(book => book.borrower === currentUser.id)
  const availableBooks = books.filter(book => book.status === 'available')

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/200x300/065f46/ffffff?text=No+Image'
  }

  return (
    <div className="book-playlist">
      <div className="header">
        <h2 className="title">
          🔄 Book Exchange Hub
        </h2>
        <div className="title-underline"></div>
      </div>

      {/* Borrowed Books Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-emerald-300 mb-6 text-center">
          📚 My Borrowed Books ({borrowedBooks.length})
        </h3>
        {borrowedBooks.length > 0 ? (
          <div className="book-grid">
            {borrowedBooks.map(book => (
              <div key={book.id} className="book-card">
                <div className="image-container">
                  <img
                    src={book.coverImageUrl}
                    alt={book.title}
                    onError={handleImageError}
                    className="book-image"
                  />
                  <div className="image-overlay"></div>
                </div>
                <div className="book-info">
                  <h4 className="book-title">{book.title}</h4>
                  <p className="book-author">{book.description}</p>
                  <div className="book-status">
                    <span className="status-badge borrowed">
                      📚 Borrowed
                    </span>
                  </div>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-xs transition-colors mt-2">
                    Return
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-emerald-300 text-lg">No borrowed books yet</p>
        )}
      </div>

      {/* Available Books Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-emerald-300 mb-6 text-center">
          ✅ Available Books ({availableBooks.length})
        </h3>
        <div className="book-grid">
          {availableBooks.map(book => (
            <div key={book.id} className="book-card">
              <div className="image-container">
                <img
                  src={book.coverImageUrl}
                  alt={book.title}
                  onError={handleImageError}
                  className="book-image"
                />
                <div className="image-overlay"></div>
              </div>
              <div className="book-info">
                <h4 className="book-title">{book.title}</h4>
                <p className="book-author">{book.description}</p>
                <div className="book-status">
                  <span className="status-badge available">
                    ✅ Available
                  </span>
                </div>
                {book.owner !== currentUser.id && (
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors mt-2">
                    Borrow
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExchangePage
