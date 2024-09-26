#!/usr/bin/node
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

// Create the Kue queue
const queue = kue.createQueue();

// Sample list of jobs
const list = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 5678 to verify your account'
  }
];

// Call the function to create and process jobs
createPushNotificationsJobs(list, queue);
