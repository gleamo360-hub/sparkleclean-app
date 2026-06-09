const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { verifyToken } = require('../middleware/authMiddleware');

// POST /api/reviews - Allows a logged-in user to submit a review (Protected)
router.post('/', verifyToken, async(req, res) => {
    try {
        const newReview = new Review({
            customerId: req.user.id, // Automatically pulled from their login ticket
            rating: req.body.rating,
            comment: req.body.comment
        });

        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET /api/reviews - Fetches all reviews to display on the site (Public)
router.get('/', async(req, res) => {
    try {
        // We use .populate() to grab the customer's actual name to show on the website front page
        const reviews = await Review.find().populate('customerId', 'name');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;