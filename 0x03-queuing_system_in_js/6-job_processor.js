#!/usr/bin/node
import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

// Function to send notifications
const sendNotification = (phoneNumber, message) => {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
};

// Process the jobs from the push_notification_code queue
queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message);
  done(); // Call done to signal that the job is complete
});

// Log when the processor is started
console.log('Job processor started, waiting for jobs...');
