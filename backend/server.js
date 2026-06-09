const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- UPDATED CORS CONFIGURATION ---
app.use(cors({
    origin: [
        'http://localhost:5173', // Keeps your local development working perfectly
        'https://your-actual-vercel-url.vercel.app' // REPLACE THIS with your real Vercel link!
    ],
    credentials: true
}));
// ----------------------------------

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB!'))
    .catch((error) => console.error('MongoDB connection failed:', error));

const serviceRoutes = require('./routes/serviceRoutes');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use('/api/services', serviceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.send('Cleaning Service Backend is successfully running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});