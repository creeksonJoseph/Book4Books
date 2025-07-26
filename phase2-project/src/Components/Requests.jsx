import React, { useEffect, useState } from "react";
import { API_URL } from "../App";
import bg from "../assets/creative-composition-world-book-day.jpg";
import "./Requests.css";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchAllData = async () => {
    try {
      const [booksRes, requestsRes, usersRes] = await Promise.all([
        fetch(`${API_URL}books`).then((res) => res.json()),
        fetch(`${API_URL}requests`).then((res) => res.json()),
        fetch(`${API_URL}users`).then((res) => res.json()),
      ]);
      setBooks(booksRes);
      setRequests(requestsRes);
      setUsers(usersRes);
    } catch (err) {
      console.error("Fetching failed:", err);
    }
  };

  const getUserName = (id) => {
    const user = users.find((u) => String(u.id) === String(id));
    return user?.name || user?.username || `User ${id}`;
  };

  const handleToggle = async (requestId, bookId, currentStatus) => {
    const isAccepting =
      currentStatus === "Pending" || currentStatus === "Declined";
    const newStatus = isAccepting ? "Accepted" : "Declined";
    const bookAvailable = !isAccepting;

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

      // Update local state after success
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: newStatus } : r))
      );
      setBooks((prev) =>
        prev.map((b) =>
          b.id === bookId ? { ...b, available: bookAvailable } : b
        )
      );
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  return (
    <div
      className="requests-container"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h1 className="requests-title">Book Requests</h1>

      {requests.length === 0 ? (
        <p className="no-requests-text">No exchange requests right now.</p>
      ) : (
        <div className="requests-list">
          {requests.map((req) => {
            const book = books.find((b) => String(b.id) === String(req.bookId));
            if (!book) return null;

            return (
              <div key={req.id} className="request-card">
                <p className="request-text">
                  <span className="requester-name">
                    {getUserName(req.requesterId)}
                  </span>{" "}
                  wants to borrow{" "}
                  <span className="book-title">"{book.title}"</span>.
                </p>
                <p className="request-status">Status: {req.status}</p>

                <div className="request-actions">
                  <button
                    className={
                      req.status === "Accepted"
                        ? "decline-button"
                        : "accept-button"
                    }
                    onClick={() => handleToggle(req.id, book.id, req.status)}
                  >
                    {req.status === "Accepted" ? "Decline" : "Accept"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
