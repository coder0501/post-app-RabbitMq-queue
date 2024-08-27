
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');
dotenv.config();
// const connectDB = require('./config/db'); // Assuming this is a default export
const { connectRabbitMQ } = require('./services/rabbitmqService');
const postRoutes = require('./routes/post');
const app = express();
const queueSizeEndpoint = require('./services/queueSizeEndpoint');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/react-posts')
  .then(() => console.log('Connected to mongodb'))
  .catch(err => console.error('Connection fail', err));

// Connect to RabbitMQ
connectRabbitMQ();

app.use('/auth',authRoutes);
app.use('/post',postRoutes);
app.use('/api', queueSizeEndpoint);


const Port = process.env.port || 5001;
app.listen(Port, () => console.log(`Server running on port ${Port}`));

