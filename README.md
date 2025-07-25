# BOOK 4 BOOK

**BOOK 4 BOOK** is a modern web application designed to allow users to sign up, log in, browse and manage books, create reading playlists, and exchange books with others in the community.

## Features

- User authentication (Sign Up and Login)
- View a list of available books
- Add new books to the library
- View individual book details
- Create and manage a personal book playlist
- Exchange books with other users
- View and manage book requests
- Splash screen on initial load for better user experience

## Technologies Used

- React.js for building the frontend
- React Router for navigation
- JavaScript, HTML5, and CSS3
- JSON Server for mock backend API

## Folder Structure

src/
├── components/
│ ├── Navbar.jsx
│ ├── SplashScreen.jsx
│ ├── Dashboard.jsx
│ ├── Login.jsx
│ ├── SignUp.jsx
│ ├── AddBook.jsx
│ ├── Requests.jsx
│ ├── BookPage.jsx
│ ├── BookDetails.jsx
│ ├── BookPlaylist.jsx
│ └── ExchangePage.jsx
├── App.jsx
├── App.css
└── index.js

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine

Start the JSON server:
json-server --watch db.json --port 3001
API
This app uses a local JSON server. All data operations (GET, POST, PATCH, DELETE) are performed against the http://localhost:3001/ endpoint.

Contributing
Contributions are welcome. If you would like to improve the app, feel free to fork the repository and submit a pull request.
The work has been perfectly made and designed thanks to the work put in by the collaborators @Abdulkadir Ahmed, @Creekson Joseph and @Pascal Denzel.
License
This project is open-source and available under the MIT License.

Project Status
BOOK 4 BOOK is an academic Phase 2 project and is currently under development. Further improvements and features are planned.
Hope you enjoy using the site.
