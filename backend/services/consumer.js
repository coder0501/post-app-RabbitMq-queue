const amqplib = require('amqplib');

async function consumeMessages() {
  const connection = await amqplib.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'postQueue';

  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, (msg) => {
    if (msg !== null) {
      console.log('Message received:', msg.content.toString());
      channel.ack(msg);
    }
  });
}

consumeMessages().catch(console.error);
