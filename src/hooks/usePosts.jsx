import { useState, useEffect } from 'react';
import axios from 'axios';

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [success, setSuccess] = useState(0);
  const [failed, setFailed] = useState(0);
  const [queueSize, setQueueSize] = useState(0);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/post');
        setPosts(response.data);
        setTotal(response.data.length);
      } catch (error) {
        console.error('Failed to fetch posts');
      }
    };

    fetchPosts();
  }, []);

  const createPost = async (post) => {
    setQueueSize((prev) => prev + 1);
    try {
      console.log('Creating post with data:', post);
      const token = localStorage.getItem('token');
      console.log("token", token);
      
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
      setQueueSize((prev) => prev - 1);
    }
  };

  const resetState = () => {
    setPosts([]);
    setTotal(0);
    setSuccess(0);
    setFailed(0);
    setQueueSize(0);
  };

  const searchPosts = async (query) => {
    try {
      const token = localStorage.getItem('token');
      console.log("token", token);

      const response = await axios.get(`http://localhost:5000/post?query=${query}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to search posts');
    }
  };

  return { posts, total, success, failed, queueSize, createPost, resetState, searchPosts };
};

export default usePosts;
