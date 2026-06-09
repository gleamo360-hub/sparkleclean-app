const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// GET /api/bookings - Fetch the logged-in customer's bookings
router.get('/', verifyToken, async(req, res) => {
    try {
        const bookings = await Booking.find({ customerId: req.user.id })
            .populate('serviceId', 'serviceName basePrice');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/bookings - Create booking (Fast & Lightweight)
router.post('/', verifyToken, async(req, res) => {
    try {
        // 1. Create the booking blueprint
        const newBooking = new Booking({
            customerId: req.user.id,
            serviceId: req.body.serviceId,
            date: req.body.date,
            address: req.body.address,
            phone: req.body.phone,
            optionalMessage: req.body.optionalMessage
        });

        // 2. Save directly to MongoDB
        const savedBooking = await newBooking.save();

        // 3. Send success response back to React instantly
        res.status(201).json(savedBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET /api/bookings/all - Fetch ALL bookings (ADMIN ONLY)
router.get('/all', verifyToken, verifyAdmin, async(req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('customerId', 'name email') // Gets the customer's real name and email
            .populate('serviceId', 'serviceName') // Gets the service name
            .sort({ createdAt: -1 }); // Puts the newest bookings at the top!

        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;