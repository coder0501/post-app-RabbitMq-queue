import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook for managing posts and related operations.
 * @returns {Object} - Object containing post-related state and functions.
 */
const usePosts = () => {
  // State variables
  const [posts, setPosts] = useState([]); // Stores posts fetched from the server
  const [total, setTotal] = useState(0); // Total number of posts
  const [success, setSuccess] = useState(0); // Number of successful post creations
  const [failed, setFailed] = useState(0); // Number of failed post creations
  const [queueSize, setQueueSize] = useState(0); // Size of the queue

  /**
   * Fetches posts from the server and updates the state.
   */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/post');
        setPosts(response.data);
        setTotal(response.data.length);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  /**
   * Creates a new post and updates the state.
   * @param {Object} post - The post data to be created.
   */
  const createPost = async (post) => {
    setQueueSize((prev) => prev + 1); // Increase queue size
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/post', post, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts((prev) => [...prev, response.data]);
      setSuccess((prev) => prev + 1);
    } catch (error) {
      console.error('Failed to create post:', error);
      setFailed((prev) => prev + 1);
    } finally {
      setQueueSize((prev) => prev - 1); // Decrease queue size
    }
  };

  /**
   * Resets the post-related state.
   */
  const resetState = () => {
    setPosts([]);
    setTotal(0);
    setSuccess(0);
    setFailed(0);
    setQueueSize(0);
  };

  /**
   * Searches for posts based on a query.
   * @param {string} query - The search query.
   */
  const searchPosts = async (query) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/post?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to search posts:', error);
    }
  };

  return { posts, total, success, failed, queueSize, createPost, resetState, searchPosts };
};

export default usePosts;
