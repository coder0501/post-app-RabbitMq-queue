// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

/**
 * Login Component
 * 
 * The `Login` component allows users to log into the application by submitting their username and password.
 * It handles the authentication logic by making an API call to the backend and storing the received JWT token in `localStorage`.
 * If the login is successful, the user is redirected to the dashboard. Otherwise, an error message is displayed.
 * 
 * @component
 * @example
 * return (
 *   <Login />
 * )
 * 
 * @returns {JSX.Element} The rendered Login component.
 */
const Login = () => {
  // State variables for username, password, and error handling
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // useNavigate hook to programmatically navigate users after successful login
  const navigate = useNavigate();

  /**
   * Handles the login form submission.
   * 
   * Makes an API request to the backend with the username and password. If the login is successful,
   * stores the JWT token in `localStorage` and navigates to the dashboard. Otherwise, sets an error message.
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   * @async
   */
  const handleLogin = async (e) => {
    e.preventDefault();  // Prevents the default form submission behavior

    try {
      // Make a POST request to the login endpoint with username and password
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });

      // Log the response data for debugging purposes
      console.log(response.data);

      // Store the JWT token in localStorage
      localStorage.setItem('token', response.data.token);

      // Navigate to the dashboard page upon successful login
      navigate('/dashboard');
    } catch (err) {
      // If an error occurs (e.g., invalid credentials), set the error message
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <h2>Login</h2>
        {/* Display the error message if it exists */}
        {error && <p className="error">{error}</p>}
        {/* Login form */}
        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}       
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className='btn'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
