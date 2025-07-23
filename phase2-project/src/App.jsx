import { useState, useEffect } from 'react'
import BookPlaylist from './components/BookPlaylist'
import ExchangePage from './components/ExchangePage'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const currentUser = { id: "user1" }

  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error:', error))
  }, [])

  return (
    <div className="min-h-screen bg-green-900" style={{ 
      backgroundColor: '#14532d', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Header */}
      <header className="text-center py-8 border-b border-emerald-700">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-6xl font-bold text-emerald-100 mb-4 drop-shadow-2xl">
            📖 Book Library
          </h1>
          <p className="text-emerald-300 text-lg">
            Discover, borrow, and share amazing books with your community
          </p>
        </div>
      </header>

      {/* Main Content - Top/Bottom split */}
      <main style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        width: '100%',
        maxWidth: '1200px'
      }}>
        {/* Top Section - Book Playlist */}
        <div className="flex-1 p-8 border-b border-emerald-700">
          <div className="max-w-7xl mx-auto">
            <BookPlaylist books={books} />
          </div>
        </div>

        {/* Bottom Section - Exchange Page */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <ExchangePage books={books} currentUser={currentUser} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
