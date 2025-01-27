const mongoose = require('mongoose');

// Define the schema
const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Job'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Reference to the User model
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Archive','Seen','Rejected'],
    default: 'Pending'
  }
});

// Create the model
const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
