const express = require('express');
const AuthController = require('./../Controller/Auth');
const JobsController = require('./../Controller/JobsController');
const router = express.Router();

router.route('/SignUp').post(AuthController.createUser);
router.route('/login').post(AuthController.login);
router.route('/createJob').post(JobsController.createJob);
router.route('/getAllJobs').get(JobsController.getAllJobs);
router.route('/applyForJobs').post(JobsController.applyForJob);
router.route('/getAlUserForParticularJob').get(JobsController.getAlUserForParticularJob);
module.exports = router;
