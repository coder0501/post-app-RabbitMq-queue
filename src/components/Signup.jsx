// src/components/Signup.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

/**
 * Signup component for user registration.
 * @component
 * @returns {JSX.Element} The rendered Signup form.
 */
const Signup = () => {
  // State hooks to manage input values and error messages
  const [username, setUsername] = useState(''); // Stores the username input value
  const [password, setPassword] = useState(''); // Stores the password input value
  const [confirmPassword, setConfirmPassword] = useState(''); // Stores the confirm password input value
  const [error, setError] = useState(''); // Stores error messages
  const navigate = useNavigate(); // Hook to programmatically navigate to different routes

  /**
   * Handles the form submission for user signup.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   * @async
   */
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setError('Passwords do not match.'); // Set error message if passwords do not match
      return;
    }

    try {
      // Send a POST request to the signup endpoint
      await axios.post('http://localhost:5000/auth/signup', {
        username,
        password
      });
      navigate('/login'); // Navigate to the login page on successful signup
    } catch (err) {
      setError('Failed to create an account. Please try again.'); // Set error message on request failure
    }
  };

  return (
    <div className="main-container">
      <div className="signup-container">
        <h2>Signup</h2>
        {error && <p className="error">{error}</p>} {/* Display error message if exists */}
        <form onSubmit={handleSignup}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update username state on input change
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state on input change
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state on input change
              required
            />
          </div>
          <button type="submit" className='btn'>Signup</button> {/* Submit button for the form */}
        </form>
      </div>
    </div>
  );
};

export default Signup;
