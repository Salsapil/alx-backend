#!/usr/bin/node
import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Event listener for successful connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event listener for connection error
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Set multiple fields in the 'HolbertonSchools' hash
client.hset('HolbertonSchools', 'Portland', 50, redis.print);
client.hset('HolbertonSchools', 'Seattle', 80, redis.print);
client.hset('HolbertonSchools', 'New York', 20, redis.print);
client.hset('HolbertonSchools', 'Bogota', 20, redis.print);
client.hset('HolbertonSchools', 'Cali', 40, redis.print);
client.hset('HolbertonSchools', 'Paris', 2, redis.print);

// Retrieve and display all the fields and values stored in 'HolbertonSchools'
client.hgetall('HolbertonSchools', (err, reply) => {
  if (err) {
    console.log(`Error retrieving data: ${err.message}`);
  } else {
    console.log(reply);
  }
});
