const express = require('express');
const amqplib = require('amqplib');

const router = express.Router();

async function getQueueSize() {
  const connection = await amqplib.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'post_queue';

  const queueInfo = await channel.checkQueue(queue);
  return queueInfo.messageCount;
}

router.get('/queue-size', async (req, res) => {
  try {
    const size = await getQueueSize();
    res.json({ queueSize: size });
  } catch (error) {
    console.error('Error fetching queue size:', error);
    res.status(500).json({ error: 'Failed to fetch queue size' });
  }
});

module.exports = router;
