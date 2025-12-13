const mongoese = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the Sweet schema
const sweetSchema = new mongoese.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const Sweet = mongoese.model('Sweet', sweetSchema);
module.exports = Sweet;