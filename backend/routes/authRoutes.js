const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/auth/register - Create a new user (Customer or Store)
router.post('/register', async(req, res) => {
    try {
        // 1. Scramble (hash) the password before saving it
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // 2. Create the new user blueprint
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role || 'customer' // Defaults to customer if left blank
        });

        // 3. Save to MongoDB
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/auth/login - Log an existing user in
router.post('/login', async(req, res) => {
    try {
        // 1. Check if the user exists in the database
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "User not found!" });

        // 2. Check if the password matches the hashed password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ message: "Invalid credentials!" });

        // 3. Create a secure login token (ticket)
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

        // 4. Send the token and user details back to the frontend
        res.status(200).json({ token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;