const express = require('express')
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express()
const port = process.env.PORT
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Connect to database
const db = require('./config/db');

// Import middleware
const { authMiddleware } = require('./middleware/authMiddleware');

// Import routers
const userRouter = require('./router/userRouter');
const sweetsRouter = require('./router/sweetsRouter');

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', userRouter);
app.use('/api/sweets', sweetsRouter);

// Test route
app.get('/', authMiddleware, (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
