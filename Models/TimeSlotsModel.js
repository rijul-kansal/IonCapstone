const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true,
  },
  freeSlots: [{
    startTime: {
      type: String, // You can use a more sophisticated Date type or string format
      required: true,
    },
    endTime: {
      type: String, // Same as startTime
      required: true,
    },
  }],
  roundName : {
        type : String
  }
});

const Job = mongoose.model('TimeSlots',timeSlotSchema)
module.exports = Job;