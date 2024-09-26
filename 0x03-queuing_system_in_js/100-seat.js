#!/usr/bin/node
const redis = require('redis');
const { promisify } = require('util');
const express = require('express');
const kue = require('kue');
const queue = kue.createQueue();

// Redis client setup
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Initialize seats and reservation flag
let reservationEnabled = true;
const initialSeats = 50;

// Set initial seat count in Redis
async function initializeSeats() {
  await setAsync('available_seats', initialSeats);
}
initializeSeats();

// Redis seat operations
async function reserveSeat(seats) {
  await setAsync('available_seats', seats);
}

async function getCurrentAvailableSeats() {
  const seats = await getAsync('available_seats');
  return parseInt(seats);
}

// Express setup
const app = express();
const port = 1245;

// Route to get available seats
app.get('/available_seats', async (req, res) => {
  const seats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: seats });
});

// Route to reserve a seat
app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation are blocked' });
  }

  const job = queue.create('reserve_seat').save((err) => {
    if (!err) {
      return res.json({ status: 'Reservation in process' });
    } else {
      return res.json({ status: 'Reservation failed' });
    }
  });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', (err) => {
    console.log(`Seat reservation job ${job.id} failed: ${err.message}`);
  });
});

// Route to process the queue
app.get('/process', (req, res) => {
  res.json({ status: 'Queue processing' });

  queue.process('reserve_seat', async (job, done) => {
    let availableSeats = await getCurrentAvailableSeats();

    if (availableSeats > 0) {
      availableSeats--;
      await reserveSeat(availableSeats);
      if (availableSeats === 0) {
        reservationEnabled = false;
      }
      done();
    } else {
      done(new Error('Not enough seats available'));
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
