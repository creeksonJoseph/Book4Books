import React from 'react'

function Navbar({ currentUser, onNavigate, currentPage }) {
  return (
    <nav className="bg-slate-800/90 backdrop-blur-sm border-b border-emerald-500/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
              📚 BookHub
            </h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'home'
                  ? 'bg-emerald-600 text-white'
                  : 'text-emerald-300 hover:text-white hover:bg-emerald-600/50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('exchange')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'exchange'
                  ? 'bg-emerald-600 text-white'
                  : 'text-emerald-300 hover:text-white hover:bg-emerald-600/50'
              }`}
            >
              Exchange
            </button>
            <button
              onClick={() => onNavigate('collection')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'collection'
                  ? 'bg-emerald-600 text-white'
                  : 'text-emerald-300 hover:text-white hover:bg-emerald-600/50'
              }`}
            >
              My Collection
            </button>
            
            <div className="text-emerald-300 text-sm">
              Welcome, {currentUser?.name || 'User'}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
