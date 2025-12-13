const mongoese = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const userSchema = new mongoese.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true });


// Pre-save hook to hash password before saving
userSchema.pre('save', async function () {
    // If password is not modified, skip hashing
    if (!this.isModified('password')) { return; }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

    } catch (err) {
        return;
    }
});

// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
    try {
        const isMatch = await bcrypt.compare(enteredPassword, this.password);
        return isMatch;
    } catch (err) {
        throw new Error(err);
    }
};

const User = mongoese.model('User', userSchema);
module.exports = User;