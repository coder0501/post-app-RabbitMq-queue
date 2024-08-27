const amqp = require('amqplib/callback_api');

let channel;

/** 
 * Connects to RabbitMQ and creates a channel.
 */
const connectRabbitMQ = () => {
  amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, ch) => {
      if (error1) {
        throw error1;
      }
      channel = ch;
      channel.assertQueue('post_queue', { durable: true });
    });
  });
};

/**
 * Adds a Post object to the RabbitMQ queue.
 * @param post - The Post object to be added to the queue.
 */
const addToQueue = (post) => {
  if (channel) {
    channel.sendToQueue('post_queue', Buffer.from(JSON.stringify(post)));
  }
};

module.exports = { connectRabbitMQ, addToQueue };
