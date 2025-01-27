const mongoose = require('mongoose');



// Define the Job schema
const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    trim: true
  },
  whoWeAre: {
    type: String,
    trim: true
  },
  roleAndResponsibilities: {
    type: [String], // Array of strings
  },
  skillsAndExperience: {
    type: [String] // Array of strings
  },
  academicBackground: {
    type: String,
    trim: true
  },
  contractType: {
    type: String,
    trim: true
  },
  importantNotes: {
    type: [String], // Array of strings
  },
  location: {
    type: [String], // Array of strings
  },
  organization: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  employmentType: {
    type: String,
    trim: true
  },
  workArrangement: {
    type: String,
    trim: true
  }
});
// Create the Job model
const Job = mongoose.model('Job',jobSchema)
module.exports = Job;