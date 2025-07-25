import React, { useEffect, useState } from "react";
import { API_URL } from "../App";
import bg from "../assets/creative-composition-world-book-day.jpg";
import "./Requests.css";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    fetchData();
    
    const interval = setInterval(fetchData, 2000);
    
    return () => clearInterval(interval);
  }, []);

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
    <div className="requests-container" style={{ backgroundImage: `url(${bg})` }}>
      <h1 className="requests-title">Book Requests</h1>

      {requests.length === 0 ? (
        <div className="no-requests">
          <p className="no-requests-text">
            No exchange requests at the moment.
          </p>
        </div>
      ) : (
        <div className="requests-list">
          {requests.map((request) => {
            const book = books.find(
              (b) => String(b.id) === String(request.bookId)
            );
            if (!book) return null;

            const requesterName = getUserName(request.requesterId);

            return (
              <div key={request.id} className="request-card">
                <p className="request-text">
                  <span className="requester-name">
                    {requesterName}
                  </span>{" "}
                  wants to borrow{" "}
                  <span className="book-title">"{book.title}"</span>.
                </p>
                <p className="request-status">
                  Status: {request.status}
                </p>

                <div className="request-actions">
                  {(request.status === "Pending" ||
                    request.status === "Declined") && (
                    <button
                      onClick={() =>
                        handleToggleStatus(request.id, book.id, request.status)
                      }
                      className="accept-button"
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
                      className="decline-button"
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
