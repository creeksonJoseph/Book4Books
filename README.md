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

## Getting Started


### Live deployment
You can view the app deployed at:
-[Book-4-Books](https://phase-2-project-group-kappa.vercel.app/)


### Prerequisites

- Node.js and npm installed on your machine

### Setup and Run

1. **Start the JSON Server:**

```bash
json-server --watch db.json --port 3001
```

2. **Start the React Development Server:**

```bash
npm start
```

3. Open your browser and navigate to the app (usually `http://localhost:3000` or as output by your development server).

## API

This app uses a local JSON server. All data operations (GET, POST, PATCH, DELETE) are performed against the `http://localhost:3001/` endpoint.

## How the App Works & How to Use It Efficiently

**BOOK 4 BOOK** provides a seamless book sharing and management experience via the following core workflows:

### 1. User Authentication

- **Sign Up:** New users create an account by providing details via the `SignUp` component.
- **Login:** Existing users authenticate using the `Login` component to access their personalized features.
- The authentication state controls access to app features and personalized data.

### 2. Navigating the App

- Once logged in, users interact with the app's primary sections through the `Navbar` which routes to:
  - **Dashboard:** View your personal book collection and reading playlists.
  - **Book Market:** Browse books offered by the entire community available for exchange.
  - **Requests:** Monitor and manage your incoming and outgoing book exchange requests.
  - **Add Book:** Easily add new books to your personal collection for sharing.

### 3. Managing Your Books

- In the **Dashboard**, view all books you've added.
- Use the **AddBook** component to quickly add new books with relevant details including title, author, genre, and cover image URL.
- Select any book to see extended **BookDetails**, including current status (available, borrowed, requested).
- Edit or delete your books as necessary for up-to-date collection management.

### 4. Creating and Managing Book Playlists

- Use the **BookPlaylist** component to organize books into custom playlists (e.g., “Want to Read”, “Currently Reading”).
- This allows users to track their reading progress and categorize books efficiently.

### 5. Browsing and Requesting Books

- The **Book Market** allows browsing all books marked as available by other users.
- Click on a book to view details and decide whether to request it.
- When requesting a book, a book exchange request is created and submitted to the owner.

### 6. Managing Book Requests and Exchanges

- The **Requests** section shows all the book requests involving you, both sent and received.
- Accept or decline incoming requests with real-time status updates.
- Keep track of completed exchanges and update book statuses accordingly.

### 7. Additional Features

- The **SplashScreen** appears on initial load, providing a smooth and polished user experience.
- Custom styling through `App.css` ensures intuitive and pleasant navigation.

## Contributing

Contributions are welcome. If you would like to improve the app, feel free to fork the repository and submit a pull request.

The work has been perfectly made and designed thanks to the efforts of collaborators 
-@[Abdulkadir Ahmed](https://github.com/medymanno) 
-@[Creekson Joseph](https://github.com/creeksonJoseph)
-@[Pascal Denzel](https://github.com/PASCALD3NZEL)
## NOTE

This is an entire frontend application with just a mock json backend.Backend integration to be done soon.

## License

This project is open-source and available under the MIT License.

## Project Status

**BOOK 4 BOOK** is an academic Phase 2 project currently under development. Further improvements and features are planned. We hope you enjoy using the site!

If you want me to help write any additional documentation (like deployment instructions or contribution guidelines), just let me know!
