const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// GET /api/services - Fetches all services from the database
router.get('/', async(req, res) => {
    try {
        const services = await Service.find();
        res.json(services); // Sends the data back to the frontend
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// // POST /api/services - Adds a new service (PROTECTED: Admin Only)
// router.post('/', verifyStore, async(req, res) => {
//     const newService = new Service({
//         serviceName: req.body.serviceName,
//         description: req.body.description,
//         basePrice: req.body.basePrice,
//         imageUrl: req.body.imageUrl
//     });

//     try {
//         const savedService = await newService.save();
//         res.status(201).json(savedService);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

module.exports = router;