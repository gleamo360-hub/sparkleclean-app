const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- 1. REGISTRATION ---
router.post('/register', async(req, res) => {
    try {
        // 1. Destructure the new fields!
        const { name, email, password, securityQuestion, securityAnswer } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 2. Hash the security answer as well
        const hashedAnswer = await bcrypt.hash(securityAnswer, salt);

        // 3. Create the user with the new fields
        user = new User({
            name,
            email,
            password: hashedPassword,
            securityQuestion,
            securityAnswer: hashedAnswer // Save the hash!
        });

        await user.save();
        res.status(201).json({ message: "Registration successful!" });

    } catch (err) {
        console.error(err); // <-- CHECK YOUR TERMINAL FOR THE REAL ERROR
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

        // Generate token with the role
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            token,
            user: { id: user._id, name: user.name, role: user.role }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/recover-password', async(req, res) => {
    try {
        const { email, securityAnswer, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // VERIFY: Compare plain text answer to hashed answer
        const isMatch = await bcrypt.compare(securityAnswer, user.securityAnswer);
        if (!isMatch) return res.status(400).json({ message: "Incorrect security answer" });

        // UPDATE: Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ message: "Password updated successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;