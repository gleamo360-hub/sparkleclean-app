const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- 1. REGISTRATION ---
router.post('/register', async(req, res) => {
    try {
        const { name, email, password, securityQuestion, securityAnswer } = req.body;

        // SAFETY CHECK: Ensure security fields are provided
        if (!securityQuestion || !securityAnswer) {
            return res.status(400).json({ message: "Security question and answer are required." });
        }

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const hashedAnswer = await bcrypt.hash(securityAnswer, salt);

        user = new User({
            name,
            email,
            password: hashedPassword,
            securityQuestion,
            securityAnswer: hashedAnswer
        });

        await user.save();
        res.status(201).json({ message: "Registration successful!" });

    } catch (err) {
        console.error("Register Error:", err);
        res.status(500).json({ message: err.message });
    }
});

// --- 2. LOGIN ---
router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found!" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: "Invalid credentials!" });

        // Generate token with the role (Perfect!)
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            token,
            user: { id: user._id, name: user.name, role: user.role }
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// --- 3. RECOVER PASSWORD ---
router.post('/recover-password', async(req, res) => {
    try {
        const { email, securityAnswer, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // SAFETY CHECK: Handle old users who don't have a security question set up yet
        if (!user.securityAnswer) {
            return res.status(400).json({
                message: "You haven't set up a security question yet. Please contact the admin to reset your password."
            });
        }

        // VERIFY: Compare plain text answer to hashed answer
        const isMatch = await bcrypt.compare(securityAnswer, user.securityAnswer);
        if (!isMatch) return res.status(400).json({ message: "Incorrect security answer" });

        // UPDATE: Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ message: "Password updated successfully!" });
    } catch (err) {
        console.error("Recover Password Error:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;