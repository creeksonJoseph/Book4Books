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

      {/* Borrowed Books Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-emerald-300 mb-6 text-center">
          📚 My Borrowed Books ({borrowedBooks.length})
        </h3>
        {borrowedBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {borrowedBooks.map(book => (
              <div key={book.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-emerald-500/30">
                <img
                  src={book.coverImageUrl}
                  alt={book.title}
                  onError={handleImageError}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h4 className="text-lg font-semibold text-white mb-2">{book.title}</h4>
                <p className="text-emerald-200 text-sm mb-3">{book.description}</p>
                <div className="flex justify-between items-center">
                  <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs">
                    📚 Borrowed
                  </span>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-xs transition-colors">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {availableBooks.map(book => (
            <div key={book.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-emerald-500/30">
              <img
                src={book.coverImageUrl}
                alt={book.title}
                onError={handleImageError}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h4 className="text-lg font-semibold text-white mb-2">{book.title}</h4>
              <p className="text-emerald-200 text-sm mb-3">{book.description}</p>
              <div className="flex justify-between items-center">
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                  ✅ Available
                </span>
                {book.owner !== currentUser.id && (
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors">
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
