import React from 'react'

function ExchangePage({ books, currentUser }) {
  const borrowedBooks = books.filter(book => book.borrower === currentUser.id)
  const availableBooks = books.filter(book => book.status === 'available')

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/200x300/065f46/ffffff?text=No+Image'
  }

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-green-300 mb-4 animate-pulse">
          🔄 Book Exchange Hub
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-emerald-400 mx-auto rounded-full shadow-lg"></div>
      </div>
    </div>
  )
}

export default ExchangePage
