const UserModel = require('../Models/UserModel');
var bcrypt = require('bcryptjs');
const { promisify } = require('util');

// this api will create a new user in database
const createUser = async (req, res) => {
  try {
    const { name, password, email, typeOfUser, mobileNumber } = req.body;
    const result = await UserModel.create({
      name,
      password,
      email,
      typeOfUser,
      mobileNumber,
    });
    const response = {
      status: 'Success',
      data: {
        data: result,
      },
    };
    res.status(201).json(response);
  } catch (err) {
    return res.status(400).json({status:"fail",message:err.message})
  }
};

// login user with email and password and send jwt token
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check given email is there or not if yes then match password else show error
    const user = await UserModel.findOne({ email }).select('+password');
    if (!user || !(await promisify(bcrypt.compare)(password, user.password))) {
      return next(new ErrorClass('Please check your email or password', 404));
    }
    const response = {
      status: 'success',
      data: {
        data: user,
      },
    };
    res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({status:"fail",message:err.message})
  }
};


module.exports = {
  createUser,
  login
};
