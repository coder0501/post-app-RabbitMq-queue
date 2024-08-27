const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');
const { connectRabbitMQ } = require('./services/rabbitmqService');
const postRoutes = require('./routes/post');
const queueSizeEndpoint = require('./services/queueSizeEndpoint');

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies

/**
 * Connect to MongoDB.
 * Adjust the MongoDB URI as needed for your environment.
 */
mongoose.connect('mongodb://localhost:27017/react-posts')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

/**
 * Connect to RabbitMQ for message queuing.
 * This is used to manage queues for creating and processing posts.
 */
connectRabbitMQ();

/**
 * Define route handlers.
 */
app.use('/auth', authRoutes); // Authentication routes
app.use('/post', postRoutes); // Post management routes
app.use('/api', queueSizeEndpoint); // Queue size endpoint

// Server port configuration
const Port = process.env.PORT || 5001;
app.listen(Port, () => console.log(`Server running on port ${Port}`));
