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

// Function to set a new value for a key in Redis
const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, redis.print); // redis.print will log 'Reply: OK' if successful
};

// Function to display the value of a key in Redis
const displaySchoolValue = (schoolName) => {
  client.get(schoolName, (err, result) => {
    if (err) {
      console.error(`Error retrieving ${schoolName}: ${err.message}`);
    } else {
      console.log(result);
    }
  });
};

// Test the functions
displaySchoolValue('Holberton'); // Retrieve the value of 'Holberton'
setNewSchool('HolbertonSanFrancisco', '100'); // Set a new key-value pair in Redis
displaySchoolValue('HolbertonSanFrancisco'); // Retrieve the value of 'HolbertonSanFrancisco'
