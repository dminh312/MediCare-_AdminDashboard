const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // allow all origins to connect (or adjust to frontend port)
        methods: ["GET", "POST"]
    }
});

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

// Init chat socket features
const chatController = require('./controllers/chatController');
chatController.initSocket(io);

// Start server
server.listen(PORT, () => {
    console.log(`MediCare Admin Backend is running on http://localhost:${PORT}/api`);
    console.log(`MediCare WebSockets listening`);
});
