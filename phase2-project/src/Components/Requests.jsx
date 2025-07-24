import React, { useEffect, useState } from "react";
import { API_URL } from "../App";
import bg from "../assets/creative-composition-world-book-day.jpg";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch all data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, requestsRes, usersRes] = await Promise.all([
          fetch(`${API_URL}books`).then((r) => r.json()),
          fetch(`${API_URL}requests`).then((r) => r.json()),
          fetch(`${API_URL}users`).then((r) => r.json()),
        ]);

        setBooks(booksRes);
        setRequests(requestsRes);
        setUsers(usersRes);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);

  // Helper to get user name by ID
  const getUserName = (id) => {
    const user = users.find((u) => String(u.id) === String(id));
    return user ? user.name : `User ${id}`;
  };

  const handleToggleStatus = async (requestId, bookId, currentStatus) => {
    let newStatus;
    let bookAvailable;

    if (currentStatus === "Pending" || currentStatus === "Declined") {
      newStatus = "Accepted";
      bookAvailable = false;
    } else if (currentStatus === "Accepted") {
      newStatus = "Declined";
      bookAvailable = true;
    }

    try {
      await Promise.all([
        fetch(`${API_URL}requests/${requestId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }),
        fetch(`${API_URL}books/${bookId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ available: bookAvailable }),
        }),
      ]);

      // Refresh state
      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId ? { ...req, status: newStatus } : req
        )
      );
      setBooks((prev) =>
        prev.map((book) =>
          book.id === bookId ? { ...book, available: bookAvailable } : book
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center px-4 py-10 relative"
      style={{
        backgroundImage: `
      linear-gradient(
        to bottom right,
        rgba(6, 95, 70, 0.7),
        rgba(0, 0, 0, 0.7),
        rgba(31, 41, 55, 0.7)
      ),
      url('${bg}')
    `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        color: "white",
      }}
    >
      <h1 className="text-4xl font-bold mb-8 text-center">Book Requests</h1>

      {requests.length === 0 ? (
        <div className="bg-emerald-950/60 border border-emerald-700 rounded-xl p-8 text-center max-w-md w-full shadow-lg">
          <p className="text-lg text-gray-300">
            No exchange requests at the moment.
          </p>
        </div>
      ) : (
        <div className="w-full max-w-3xl space-y-6">
          {requests.map((request) => {
            const book = books.find(
              (b) => String(b.id) === String(request.bookId)
            );
            if (!book) return null;

            const requesterName = getUserName(request.requesterId);

            return (
              <div
                key={request.id}
                className="bg-emerald-950/60 rounded-xl p-6 shadow-lg border border-emerald-800"
              >
                <p className="mb-2 text-lg">
                  <span className="font-semibold text-emerald-400">
                    {requesterName}
                  </span>{" "}
                  wants to borrow{" "}
                  <span className="font-bold text-white">"{book.title}"</span>.
                </p>
                <p className="mb-4 text-gray-400 italic">
                  Status: {request.status}
                </p>

                <div className="flex gap-4">
                  {(request.status === "Pending" ||
                    request.status === "Declined") && (
                    <button
                      onClick={() =>
                        handleToggleStatus(request.id, book.id, request.status)
                      }
                      className="px-4 py-2 rounded-lg bg-green-800 hover:bg-green-600 transition font-semibold"
                    >
                      Accept
                    </button>
                  )}
                  {(request.status === "Pending" ||
                    request.status === "Accepted") && (
                    <button
                      onClick={() =>
                        handleToggleStatus(request.id, book.id, request.status)
                      }
                      className="px-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-200 text-black font-semibold transition"
                    >
                      Decline
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Requests;
