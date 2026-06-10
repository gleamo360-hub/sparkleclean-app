const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },

    // --- NEW ENTERPRISE SECURITY FIELDS ---
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },

    // We will use these for Password Resets in Phase 2!
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);