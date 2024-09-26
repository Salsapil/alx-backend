#!/usr/bin/node
const kue = require('kue');
const queue = kue.createQueue();

// Blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Function to send notifications
function sendNotification(phoneNumber, message, job, done) {
  // Track the job progress to 0% initially
  job.progress(0, 100);

  // Check if the phone number is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    // Fail the job if phone number is blacklisted
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  // Track the job progress to 50%
  job.progress(50, 100);

  // Log the notification being sent
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Complete the job successfully
  done();
}

// Process the 'push_notification_code_2' queue with concurrency of 2
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;  // Extract phoneNumber and message from job data
  sendNotification(phoneNumber, message, job, done);
});

// Handle job failures and completion
queue.on('job complete', (id) => {
  kue.Job.get(id, (err, job) => {
    if (err) return;
    job.remove((err) => {
      if (err) throw err;
      console.log(`Removed completed job #${job.id}`);
    });
  });
});
