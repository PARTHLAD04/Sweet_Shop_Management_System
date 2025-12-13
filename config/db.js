const mongoese = require('mongoose');

// MongoDB connection URI from environment variables
const dbURI = process.env.URI_MONGODB;

// Connect to MongoDB
mongoese.connect(dbURI);
const db = mongoese.connection;

db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {   
    console.log('Disconnected from MongoDB');
});

module.exports = db;