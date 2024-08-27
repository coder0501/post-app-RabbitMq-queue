import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard'; // Create this component later
import './App.css';

/**
 * Main App component for routing and rendering different pages.
 * @returns {JSX.Element} - The rendered App component with routing.
 */
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="home">
            <Signup />
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
