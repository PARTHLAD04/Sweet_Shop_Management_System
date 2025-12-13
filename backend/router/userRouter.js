const router = require('express').Router();
const User = require('../models/User');
const { signToken } = require('../middleware/authMiddleware');


// User registration
router.post('/register', async (req, res) => {
    const user = req.body;

    if (!user.username || !user.email || !user.password) {
        return res.status(400).send({ message: 'All fields are required' });
    }
    try {
        const newUser = new User(user);
        const response = await newUser.save();

        const payload = { id: response._id, username: response.username, role: response.role };

        // Generate JWT token
        const token = signToken(payload);
        console.log('Generated Token:', token);

        res.status(201).send({ message: 'User registered successfully', response: response, token: token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send({ message: 'Error registering user', error: error });
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const payload = { id: user._id, username: user.username, role: user.role };
        const token = signToken(payload);
        console.log('Generated Token:', token);
        res.status(200).send({ message: 'Login successful', user: user, token: token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({ message: 'Error during login', error: error });
    }
});

module.exports = router;