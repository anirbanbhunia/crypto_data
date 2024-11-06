# Crypto Dashboard


https://github.com/user-attachments/assets/3dedbb7f-bd0d-4073-959c-4204e8599b66


This project is a crypto dashboard that provides real-time cryptocurrency information, including prices, percentage changes, and additional statistics across multiple platforms. Built with React for the frontend and Node.js for the backend, this project is optimized with features like dark mode, responsive design, and dynamic updates using APIs.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- Cryptocurrency Overview: Displays prices, buy/sell difference, savings, and platform data.
- Dark/Light Mode Toggle: User-friendly switch for dark/light mode.
- Auto Refresh: Data updates every minute.
- Responsive Design: Optimized for mobile and desktop views.
- Platform Comparison: Compare cryptocurrency data across platforms like WazirX, Bitbns, Colodax, and Zebpay.

## Technologies Used

### Frontend
- React: UI framework.
- Tailwind CSS: Styling.
- React Circular Progressbar: For circular timer display.
- Lucide-React: Icon library.

### Backend
- Node.js: Server-side environment.
- Express: Web framework.
- Axios: For making HTTP requests to crypto APIs.
- MongoDB (optional): For storing data (if persistent storage is needed).

### APIs
- Axios Instance: Configured to fetch crypto data and manage server communications.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/username/crypto_dashboard.git
   cd crypto_dashboard
   ```

2. Install frontend and backend dependencies:
   ```
   # For backend
   cd server
   npm install

   # For frontend
   cd ../client
   npm install
   ```

3. Create environment variables (see [Environment Variables](#environment-variables)).

## Environment Variables

Set up your .env file in the /server directory. Ensure that it is excluded from version control by adding /server/.env to .gitignore.

Example .env:
```
# Server Config
PORT=5000
API_KEY=your_crypto_api_key
DB_URI=your_database_uri_if_needed
```

## Project Structure

```
crypto_dashboard/
├── client/                # Frontend files (React)
│   ├── public/            # Public assets
│   ├── src/               # Source code
│   │   ├── components/    # Reusable components
│   │   ├── Helpers/       # Helper functions
│   │   └── App.js         # Main app component
│   └── .env               # Environment variables for frontend (if needed)
├── server/                # Backend files (Node.js/Express)
│   ├── controllers/       # API controllers
│   ├── routes/            # Express routes
│   ├── .env               # Environment variables for backend
│   └── server.js          # Main server file
├── .gitignore             # Ignored files and folders
└── README.md              # Documentation
```

## Usage

1. Start the Backend Server:
   ```
   cd server
   npm start
   ```

2. Start the Frontend Application:
   ```
   cd client
   npm start
   ```

3. View the Application: Open your browser and go to http://localhost:3000.

## API Endpoints

Below are the endpoints used in the project:

- GET /getdata: Fetches crypto data and statistics for various platforms.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
