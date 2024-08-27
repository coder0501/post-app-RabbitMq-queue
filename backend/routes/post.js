const express = require('express');
const Post = require('../models/Post'); // Import Post model for database operations
const authMiddleware = require('../middleware/auth'); // Middleware for authentication
const { addToQueue } = require('../services/rabbitmqService'); // Function to add posts to RabbitMQ queue

const router = express.Router();

/**
 * Route to create a new post.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Object} JSON response with the created post or error message.
 */
router.post('/', authMiddleware, async (req, res) => {
  console.log("Inside post creation route");

  try {
    const { title, message } = req.body;

    // Validate the request body
    if (!title || !message) {
      console.log('Validation failed: Title and message are required.');
      return res.status(400).json({ error: 'Title and message are required.' });
    }

    // Create a new Post object
    const post = new Post({ title, message });
    console.log('Post object created:', post);

    // Add the post to RabbitMQ queue
    addToQueue(post);

    // Simulate a delay before saving the post
    return new Promise((resolve) => {
      setTimeout(async () => {
        try {
          await post.save();
          console.log('Post saved successfully:', post);
          resolve(res.status(201).json(post));
        } catch (error) {
          console.error('Error saving post:', error);
          resolve(res.status(500).json({ error: 'Failed to save post' }));
        }
      }, 500); // Simulate delay
    });
  } catch (error) {
    console.error('Error in post creation:', error);
    return res.status(500).json({ error: 'Failed to create post' });
  }
});

/**
 * Route to fetch posts with caching.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Object} JSON response with the posts or error message.
 */
let cache = {}; // In-memory cache for posts
router.get('/', async (req, res) => {
  console.log("Inside post fetch route");

  const { query } = req;
  const cacheKey = JSON.stringify(query);
  
  // Check if the result is already in the cache
  if (cache[cacheKey]) {
    return res.json(cache[cacheKey]);
  }

  try {
    const title = query.query; // Extract query parameter
    console.log('Fetching posts with title:', title);
    
    // Fetch posts from the database
    const posts = await Post.find({ title: title });
    console.log('Fetched posts:', posts);

    // Store the result in the cache
    cache[cacheKey] = posts;
    setTimeout(() => {
      delete cache[cacheKey]; // Invalidate cache after 5 minutes
    }, 300000); // 5 minutes

    return res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

module.exports = router;
