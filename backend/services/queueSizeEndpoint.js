const express = require('express');
const amqplib = require('amqplib'); // Library for working with RabbitMQ

const router = express.Router();

/**
 * Retrieves the current size of the RabbitMQ queue.
 * @returns {Promise<number>} The number of messages in the queue.
 */
async function getQueueSize() {
  try {
    // Establish a connection to RabbitMQ server
    const connection = await amqplib.connect('amqp://localhost');
    
    // Create a channel for communication
    const channel = await connection.createChannel();
    
    // Define the name of the queue
    const queue = 'post_queue';
    
    // Check the queue for its current status
    const queueInfo = await channel.checkQueue(queue);
    
    // Close the connection
    await connection.close();
    
    // Return the number of messages in the queue
    return queueInfo.messageCount;
  } catch (error) {
    console.error('Error connecting to RabbitMQ or fetching queue size:', error);
    throw new Error('Failed to fetch queue size');
  }
}

/**
 * Route handler to get the size of the RabbitMQ queue.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Object} JSON response with the current queue size or an error message.
 */
router.get('/queue-size', async (req, res) => {
  try {
    // Fetch the queue size from RabbitMQ
    const size = await getQueueSize();
    
    // Respond with the queue size in JSON format
    res.json({ queueSize: size });
  } catch (error) {
    console.error('Error fetching queue size:', error);
    // Respond with an error message if something goes wrong
    res.status(500).json({ error: 'Failed to fetch queue size' });
  }
});

module.exports = router;
