#!/usr/bin/node
import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

// Create job data
const jobData = {
  phoneNumber: '1234567890',
  message: 'Hello, this is a notification message!',
};

// Create a job in the queue
const job = queue.create('push_notification_code', jobData)
  .save((err) => {
    if (!err) {
      console.log(`Notification job created: ${job.id}`);
    }
  });

// Listen for job completion
job.on('complete', () => {
  console.log('Notification job completed');
});

// Listen for job failure
job.on('failed', (err) => {
  console.log('Notification job failed:', err);
});
