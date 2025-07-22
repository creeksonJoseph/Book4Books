import React, { useEffect, useState } from "react";

import { API_URL } from "../App";

function Requests({ requests = [], books = [] }) {
  const [localRequests, setLocalRequests] = useState(requests);

  useEffect(() => {
    setLocalRequests(requests);
  }, [requests]);

  const handleAccept = async (requestId, bookId) => {
    // Update request status
    await fetch(`${API_URL}${requestId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Accepted" }),
    });

    // Update book availability
    await fetch(`${API_URL}books/${bookId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ available: false }),
    });

    // Update local state
    setLocalRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "Accepted" } : req
      )
    );
  };

  const handleDecline = async (requestId) => {
    await fetch(`${API_URL}requests/${requestId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Declined" }),
    });

    setLocalRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "Declined" } : req
      )
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-950 via-black to-gray-900 text-white flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Book Requests</h1>

      {localRequests.length === 0 ? (
        <div className="bg-emerald-950/60 border border-emerald-700 rounded-xl p-8 text-center max-w-md w-full shadow-lg">
          <p className="text-lg text-gray-300">
            No exchange requests at the moment.
          </p>
        </div>
      ) : (
        <div className="w-full max-w-3xl space-y-6">
          {localRequests.map((request) => {
            const book = books.find((b) => b.id === request.bookId);
            if (!book) return null;

            return (
              <div
                key={request.id}
                className="bg-emerald-950/60 rounded-xl p-6 shadow-lg border border-emerald-800"
              >
                <p className="mb-2 text-lg">
                  <span className="font-semibold text-emerald-400">
                    {request.requesterId}
                  </span>{" "}
                  wants to borrow{" "}
                  <span className="font-bold text-white">"{book.title}"</span>.
                </p>
                <p className="mb-4 text-gray-400 italic">
                  Status: {request.status}
                </p>

                {request.status === "Pending" && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleAccept(request.id, book.id)}
                      className="px-4 py-2 rounded-lg bg-green-800 hover:bg-green-600 transition font-semibold"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDecline(request.id)}
                      className="px-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-200 text-black font-semibold transition"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Requests;
