const mongoose = require('mongoose');
var validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  typeOfUser: {
    type: String,
    enum: {
      values: ['User', 'Recruiter'],
      message: 'Values of Type can be User or Recruiter',
    },
    required: [true, 'Type of user should be there'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    minLength: [8, 'Minimum length of password should be 8 characters'],
    required: [true, 'Password is required'],
    select: false,
  },
  mobileNumber: {
    type: Number,
    validate: {
      validator: function (v) {
        return /^[6-9]\d{9}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'Mobile number is required'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
    index: true,
  },
  screeningFeedback:{
    type:[String],
    default:[null]
  },
  hrFeedback:{
    type:[String],
    default:[null]
  },
  testScore:{
    type:Number,
    default:0
  },
  techFeedback:{
    type:[String],
    default:[null]
  },
  apFeedback:{
    type:[String],
    default:[null]
  }
});

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = parseInt(process.env.SALT, 10) || 10;
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
const model = mongoose.model('User', userSchema);
module.exports = model;
