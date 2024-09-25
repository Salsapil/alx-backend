#!/usr/bin/node
import redis from 'redis';

// Create a Redis client for subscriber
const subscriber = redis.createClient();

// Event listener for successful connection
subscriber.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event listener for connection error
subscriber.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Subscribe to the channel 'holberton school channel'
subscriber.subscribe('holberton school channel');

// When a message is received on the channel
subscriber.on('message', (channel, message) => {
  console.log(message);

  // If message is 'KILL_SERVER', unsubscribe and quit
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe();
    subscriber.quit();
  }
});
