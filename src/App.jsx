
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import BlogList from './components/BlogList';
// import BlogDetail from './components/BlogDetail';   
// import CreateBlog from './components/CreateBlog';
// import EditBlog from './components/EditBlog';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard'; // Create this component later
import './App.css';
// import Task from './components/task';
// import UpdateTask from './components/UpdateTask';
// import DeleteTask from './components/DeleteTask';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="home">
            <Signup />
          </div>    
        } />
        {/* <Route path="/addTask" element={<Task/>}/>
        <Route path="/updateTask/:id" element={<UpdateTask/>}/>
        <Route path="/deleteTask/:id" element={<DeleteTask/>}/>
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;


