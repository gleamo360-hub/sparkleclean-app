const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Using 'role' is more flexible for your customer/store structure
    role: { type: String, default: 'customer' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);