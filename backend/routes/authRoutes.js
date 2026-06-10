const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// --- 1. REGISTRATION (WITH EMAIL VERIFICATION) ---
router.post('/register', async(req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate a secure, random string for the verification link
        const verificationToken = crypto.randomBytes(20).toString('hex');

        user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken
        });

        await user.save();

        // Create the verification URL that points to your React frontend
        const verifyUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

        // The HTML email design
        const message = `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                <h2>Welcome to SparkleClean! ✨</h2>
                <p>We're thrilled to have you. Please verify your email address to get started.</p>
                <a href="${verifyUrl}" style="background-color: #00c6ff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; margin-top: 15px;">Verify My Account</a>
                <p style="margin-top: 20px; font-size: 12px; color: #777;">If the button doesn't work, copy and paste this link: <br> ${verifyUrl}</p>
            </div>
        `;

        try {
            await sendEmail({ email: user.email, subject: 'Verify Your SparkleClean Account', message });
            res.status(201).json({ message: "Registration successful! Please check your email to verify your account." });
        } catch (err) {
            // If the email fails to send, clear the token so they can try again later
            user.verificationToken = undefined;
            await user.save();
            return res.status(500).json({ message: "Email could not be sent. Please try again." });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- 2. VERIFY EMAIL ROUTE (NEW) ---
// This is the endpoint React will hit when the user clicks the link in their email
router.get('/verify/:token', async(req, res) => {
    try {
        const user = await User.findOne({ verificationToken: req.params.token });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired verification token." });
        }

        // Mark them as verified and clear out the token
        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({ message: "Email successfully verified! You can now log in." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- 3. LOGIN (BLOCKS UNVERIFIED USERS) ---
router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // SECURITY CHECK: Is their email verified?
        if (!user.isVerified) {
            return res.status(401).json({ message: "Access Denied: Please check your email and verify your account before logging in." });
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, name: user.name, isAdmin: user.isAdmin } });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- 4. FORGOT PASSWORD (SENDS EMAIL) ---
router.post('/forgot-password', async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "There is no account with that email." });

        // Generate a secure reset token
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Save it to the database, set it to expire in 1 hour
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        // Create the reset URL
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        const message = `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                <h2>Password Reset Request 🔐</h2>
                <p>You requested to reset your SparkleClean password.</p>
                <a href="${resetUrl}" style="background-color: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; margin-top: 15px;">Reset My Password</a>
                <p style="margin-top: 20px; font-size: 12px; color: #777;">If you did not request this, please ignore this email. This link will expire in 10 minutes.</p>
            </div>
        `;

        try {
            await sendEmail({ email: user.email, subject: 'Password Reset Request', message });
            res.status(200).json({ message: "Password reset link sent to your email!" });
        } catch (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return res.status(500).json({ message: "Email could not be sent." });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- 5. RESET PASSWORD (SAVES NEW PASSWORD) ---
router.put('/reset-password/:resetToken', async(req, res) => {
    try {
        // Re-hash the token from the URL to match the one in the database
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

        // Find user by token AND ensure it hasn't expired
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ message: "Invalid or expired reset token." });

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);

        // Clear the reset tokens so they can't be reused
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json({ message: "Password successfully updated! You can now log in." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;