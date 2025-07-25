
import React from 'react'
import './ExchangePage.css'
import { API_URL } from '../App'

function ExchangePage({ books, currentUser }) {
  const borrowedBooks = books.filter(book => book.borrower === currentUser.id)
  const availableBooks = books.filter(book => book.status === 'available')

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/200x300/065f46/ffffff?text=No+Image'
  }

  const handleBorrow = async (book) => {
    try {
      const newRequest = {
        bookId: book.id,
        requesterId: currentUser.id,
        status: "Pending"
      }

      const response = await fetch(`${API_URL}requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRequest),
      })

      if (response.ok) {
        alert(`Request sent for "${book.title}"!`)
      } else {
        alert("Failed to send request. Please try again.")
      }
    } catch (error) {
      console.error("Error creating request:", error)
      alert("Failed to send request. Please try again.")
    }
  }

  const handleReturn = async (book) => {
    try {
      const response = await fetch(`${API_URL}books/${book.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          status: "available",
          borrower: null
        }),
      })

      if (response.ok) {
        alert(`"${book.title}" has been returned!`)
        window.location.reload()
      } else {
        alert("Failed to return book. Please try again.")
      }
    } catch (error) {
      console.error("Error returning book:", error)
      alert("Failed to return book. Please try again.")
    }
  }

  return (
    <div className="exchange-page">
      <div className="exchange-header">
        <h2 className="exchange-title">
          🔄 Book Exchange Hub
        </h2>
        <div className="title-underline"></div>
      </div>

      <div className="borrowed-section">
        <h3 className="section-title">
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
                  <button 
                    className="return-button"
                    onClick={() => handleReturn(book)}
                  >
                    Return
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-books-text">No borrowed books yet</p>
        )}
      </div>

      <div className="available-section">
        <h3 className="section-title">
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
                  <button 
                    className="borrow-button"
                    onClick={() => handleBorrow(book)}
                  >
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

