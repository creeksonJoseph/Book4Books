import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BookPlaylist from './components/BookPlaylist'
import BookDetails from './components/BookDetails'
import ExchangePage from './components/ExchangePage'
import SplashScreen from './components/SplashScreen'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [showSplash, setShowSplash] = useState(true)
  const currentUser = { id: "user1" }

  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error:', error))
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 35000) // 35 seconds

    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <SplashScreen />
  }

  return (
    <Router>
      <div className="min-h-screen bg-green-900" style={{ 
        backgroundColor: '#14532d', 
        backgroundImage: 'url(/images/library.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100vw',
        margin: 0,
        padding: 0,
        position: 'relative'
      }}>
        {/* Add overlay for better text readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(20, 83, 45, 0.3)',
          zIndex: 1
        }}></div>
        
        {/* Header */}
        <header className="text-center py-8 border-b border-emerald-700 w-full" style={{ position: 'relative', zIndex: 2 }}>
          <div className="px-4">
            <h1 className="text-6xl font-bold text-emerald-100 mb-4 drop-shadow-2xl">
              📖 Book Library
            </h1>
            <p className="text-emerald-300 text-lg">
              Discover, borrow, and share amazing books with your community
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          width: '100%',
          flex: 1,
          position: 'relative',
          zIndex: 2
        }}>
          <Routes>
            <Route path="/" element={
              <>
                <div className="flex-1 p-8 border-b border-emerald-700">
                  <div className="max-w-7xl mx-auto">
                    <BookPlaylist books={books} />
                  </div>
                </div>
                <div className="flex-1 p-8">
                  <div className="max-w-7xl mx-auto">
                    <ExchangePage books={books} currentUser={currentUser} />
                  </div>
                </div>
              </>
            } />
            <Route path="/book/:id" element={<BookDetails books={books} currentUser={currentUser} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
