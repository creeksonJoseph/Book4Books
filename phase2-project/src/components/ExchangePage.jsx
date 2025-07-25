
import React, { useState, useEffect } from 'react'
import './ExchangePage.css'
import { API_URL } from '../App'

function ExchangePage({ currentUser }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch books from JSON server instead of props
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${API_URL}books`)
        if (response.ok) {
          const booksData = await response.json()
          setBooks(booksData)
        } else {
          console.error('Failed to fetch books')
        }
      } catch (error) {
        console.error('Error fetching books:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const borrowedBooks = books.filter(book => book.borrower === currentUser.id)
  const availableBooks = books.filter(book => book.status === 'available')

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/200x300/065f46/ffffff?text=Book+Cover';
  }

  const handleBorrow = async (book) => {
    try {
      console.log('Attempting to borrow book:', book.title);
      console.log('Current user:', currentUser);
      console.log('Book owner:', book.owner);
      
      if (book.owner === currentUser.id) {
        alert("You cannot borrow your own book!");
        return;
      }

      const newRequest = {
        id: `req_${Date.now()}`,
        bookId: book.id,
        requesterId: currentUser.id,
        status: "Pending",
        bookTitle: book.title,
        requesterName: "Current User",
        createdAt: new Date().toISOString()
      }

      const response = await fetch(`${API_URL}requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRequest),
      })

      if (response.ok) {
        alert(`Request sent for "${book.title}"! Check the Requests page.`);
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        alert(`Failed to send request. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert(`Network error: ${error.message}. Make sure JSON server is running on port 3001.`);
    }
  }

  const handleReturn = async (book) => {
    try {
      console.log('Attempting to return book:', book.title);
      console.log('Book ID:', book.id);
      console.log('API URL:', `${API_URL}books/${book.id}`);

      if (book.borrower !== currentUser.id) {
        alert("You can only return books you have borrowed!");
        return;
      }

      const updateData = { 
        status: "available",
        borrower: null
      };

      const response = await fetch(`${API_URL}books/${book.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })

      console.log('Response status:', response.status);

      if (response.ok) {
        alert(`"${book.title}" has been returned successfully!`);
        // Refresh books data instead of page reload
        const updatedResponse = await fetch(`${API_URL}books`)
        if (updatedResponse.ok) {
          const updatedBooks = await updatedResponse.json()
          setBooks(updatedBooks)
        }
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        alert(`Failed to return book. Status: ${response.status}. Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert(`Network error: ${error.message}. Make sure JSON server is running on port 3001.`);
    }
  }

  if (loading) {
    return <div className="exchange-page">Loading books...</div>
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

