# Sweet Shop Management System

A full-stack web application for managing a sweet shop, built using the MERN stack (MongoDB, Express.js, React, Node.js).

## 🚀 Features

- **User Authentication**: Secure login and registration for users and admins.
- **Product Management**: View available sweets.
- **Dashboard**: User and Admin dashboards for managing the application.
- **Responsive Design**: Built with TailwindCSS for a mobile-friendly interface.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), TailwindCSS, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)

## 📋 Prerequisites

Before running this project, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Sweet_Shop
```

### 2. Backend Setup
Navigate to the backend folder and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=3000
URI_MONGODB=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:
```bash
npm start
```
The server should be running on `http://localhost:3000`.

### 3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## 📂 Project Structure
```
Sweet_Shop/
├── backend/          # Node.js & Express backend
│   ├── config/       # Database configuration
│   ├── middleware/   # Auth middleware
│   ├── router/       # API routes
│   └── server.js     # Entry point
│
└── frontend/         # React frontend
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── App.jsx
    └── package.json
```

## 📜 Scripts

**Backend:**
- `npm start`: Runs the server (using `node server.js`).

**Frontend:**
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint for code quality.

## 🤝 Contributing
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

