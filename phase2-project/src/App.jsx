import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error))
  }, [])

  return (
    <div className="app">
      <h1>Book Library</h1>
      <div className="books-grid">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <img src={book.coverImageUrl} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <div className="book-info">
              <span>Owner: {book.owner}</span>
              <span>Status: {book.status}</span>
              <a href={`mailto:${book.contact}`}>Contact</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
