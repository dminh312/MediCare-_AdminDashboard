const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`MediCare Admin Backend is running on http://localhost:${PORT}`);
});
