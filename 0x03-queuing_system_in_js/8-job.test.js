#!/usr/bin/node
import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

// Start the test suite
describe('createPushNotificationsJobs', () => {
  
  // Before each test, enter test mode
  beforeEach(() => {
    kue.queue.testMode.enter();
  });

  // After each test, clear the queue and exit test mode
  afterEach(() => {
    kue.queue.testMode.clear();
    kue.queue.testMode.exit();
  });

  // Test case: Should throw an error if jobs is not an array
  it('should display an error message if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs('not an array', kue.queue)).to.throw(Error, 'Jobs is not an array');
  });

  // Test case: Should create jobs and verify queue contents
  it('should create two new jobs in the queue', () => {
    const jobs = [
      { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
      { phoneNumber: '4153518781', message: 'This is the code 5678 to verify your account' }
    ];
    
    createPushNotificationsJobs(jobs, kue.queue);

    // Validate that two jobs have been created in the queue
    expect(kue.queue.testMode.jobs.length).to.equal(2);
    
    // Validate the content of the jobs
    expect(kue.queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(kue.queue.testMode.jobs[0].data).to.deep.equal(jobs[0]);

    expect(kue.queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
    expect(kue.queue.testMode.jobs[1].data).to.deep.equal(jobs[1]);
  });
});
