# MERN Stack Project: Post Manager Dashboard

Overview
This project is a Post Manager Dashboard application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The application allows users to create, manage, and search for posts. It showcases the integration of both frontend and backend technologies to create a full-fledged web application.

Features
1. Post Creation: Users can create new posts with a title and message.
2. State Management: Track the total number of posts, successful posts, failed posts, and queue size.
3. Search Functionality: Users can search for posts based on keywords.
4. API Integration: The app communicates with a backend API to store and retrieve posts.
5. Authentication: The application uses JWT for secure authentication.
6. Queue Management: Posts are added to a queue before being processed and stored in the database.


Technologies Used
Frontend
React.js: For building the user interface.
TypeScript: Used for type safety and better development experience.
Axios: For making HTTP requests to the backend API.
CSS: For styling the application.

Backend
Node.js: For running the server-side application.
Express.js: For building the RESTful API.
MongoDB: For storing the posts in a database.
JWT (JsonWebToken): For handling authentication.
RabbitMQ: For managing queues of post requests before processing.


Setup Instructions
Prerequisites
Node.js: Ensure you have Node.js installed.
MongoDB: Make sure MongoDB is running on your machine or accessible through the network.
RabbitMQ: Ensure RabbitMQ is installed and running.
![Screenshot 2024-08-27 182539](https://github.com/user-attachments/assets/d891e9c3-2efe-42ba-86a8-b6ce9da3d30d)



Installation
Clone the Repository:


git clone https://github.com/your-username/mern-stack-project.git
cd mern-stack-project
Backend Setup:

Navigate to the backend directory:

cd backend
Install the necessary dependencies:

npm install
Set up environment variables by creating a .env file in the backend directory and adding the following:


PORT=5000
MONGO_URI=your_mongodb_uri
SECRET_KEY=your_jwt_secret_key
Start the backend server:

npm start
Frontend Setup:

Navigate to the frontend directory:


cd frontend
Install the necessary dependencies:


npm install
Start the React development server:


npm start

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
