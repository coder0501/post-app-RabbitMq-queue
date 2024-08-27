const amqplib = require('amqplib');

async function publishMessage(message) {
  const connection = await amqplib.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'postQueue';

  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
  console.log('Message sent:', message);

  await channel.close();
  await connection.close();
}

module.exports = publishMessage;
