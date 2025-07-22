import { useState } from "react";

import AddBook from "./pages/AddBook";
// import Requests from "./pages/Requests";

export const API_URL = "http://localhost:3001/";

function App() {
  const [count, setCount] = useState(0);

  const books = [
    { id: 1, title: "Atomic Habits" },
    { id: 2, title: "The Alchemist" },
    { id: 3, title: "1984" },
    { id: 4, title: "The Subtle Art of Not Giving a F*ck" },
    { id: 5, title: "Sapiens: A Brief History of Humankind" },
  ];
  const requests = [
    {
      id: 101,
      bookId: 1,
      requesterId: "jane_doe23",
      ownerId: "creeksonjoseph",
      status: "Pending",
    },
    {
      id: 102,
      bookId: 2,
      requesterId: "mike_kenya",
      ownerId: "creeksonjoseph",
      status: "Accepted",
    },
    {
      id: 103,
      bookId: 3,
      requesterId: "zayn_writer",
      ownerId: "creeksonjoseph",
      status: "Declined",
    },
    {
      id: 104,
      bookId: 4,
      requesterId: "linda_reads",
      ownerId: "creeksonjoseph",
      status: "Pending",
    },
    {
      id: 105,
      bookId: 5,
      requesterId: "kevin_254",
      ownerId: "creeksonjoseph",
      status: "Pending",
    },
  ];

  return (
    <>
      <AddBook />
      {/* <Requests requests={requests} books={books} /> */}
    </>
  );
}

export default App;
