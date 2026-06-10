const jwt = require('jsonwebtoken');
const User = require('../models/User'); // We need this to check the database

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

// NEW: The Admin Bouncer (with Truth Serum)
const verifyAdmin = async(req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        // Check if the user exists and has the 'store' role
        if (!user || user.role !== 'store') {
            return res.status(403).json({ message: "Access Denied: Admins Only!" });
        }

        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { verifyToken, verifyAdmin };