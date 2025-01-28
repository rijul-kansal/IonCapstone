const express = require('express');
const AuthController = require('./../Controller/Auth');
const JobsController = require('./../Controller/JobsController');
const router = express.Router();

router.route('/getAlUserForParticularJob').get(JobsController.getAlUserForParticularJob);
router.route('/SignUp').post(AuthController.createUser);
router.route('/login').post(AuthController.login);
router.route('/createJob').post(JobsController.createJob);
router.route('/getAllJobs').get(JobsController.getAllJobs);
router.route('/applyForJobs').post(JobsController.applyForJob);
router.route('/archive').post(JobsController.achieve);
router.route('/unArchive').post(JobsController.unAchieve);
router.route('/reject').post(JobsController.rejectedApplication);
router.route('/setTimeSlots').post(JobsController.setFreeTimeSlots);
router.route('/getTimeSlots').get(JobsController.getFreeTimeSlot);
module.exports = router;
