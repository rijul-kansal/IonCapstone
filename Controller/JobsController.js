const JobModel = require('../Models/JobModel')
const AppliedJobModel = require('./../Models/AppliedJobModel')
const Mail = require('./../Utils/NodeMailer')
const Messages = require('./../Utils/Message')
const createJob = async(req,res)=>{
    
    const d = req.body
    const data = await JobModel.create(d);
      const response = {
        status: 'Success',
        data: {
          data,
        },
      };
      res.status(201).json(response);
}
const getAllJobs = async(req,res)=>{

    try{

        const data= await JobModel.find();
        const response = {
            status:"success",
            data:{
                data
            }
        }

        res.status(200).json(response)
    }catch(err){
        res.status(400).json({status:"fail",message:err.message})
    }
    
} 
const applyForJob = async(req,res)=>{
    try{
        const {jobId , userId} = req.body
        const user = await AppliedJobModel.findOne({jobId, userId})
        if(user)
        {
            return res.status(400).json({status:"fail",message:"all ready applied"})
        }
        const data = await AppliedJobModel.create({
            jobId,
            userId
        })
        const response = {
            status:"success",
            data:{
                data
            }
        }
        res.status(200).json(response)
    }catch(err){
        res.status(400).json({status:"fail",message:err.message})
    }
}
const getAlUserForParticularJob = async(req,res)=>{
    try{
        const jobId = req.query.jobId

        const data = await AppliedJobModel.find({jobId}).populate('userId')
        const response = {
            status:"success",
            data:{
                data
            }
        }
        res.status(200).json(response)

    }catch(err){
        res.status(400).json({status:"fail",message:err.message})
    }
}
const achieve = async(req,res)=>{
    try{
        const jobId = req.body.jobId
        const userId = req.body.userId

        const user = await AppliedJobModel.findOne({jobId , userId})

        if(!user)
        {
            return res.status(400).json({status:"fail",message:"user have not applied for this job"})
        }

        user.status = "Archive"
        await user.save()

        const response = {
            status:"success",
            message:"successfully"
        }
        res.status(200).json(response)
    }catch(err){
        res.status(400).json({status:"fail",message:err.message})
    }
}

const unAchieve = async(req,res)=>{
    try{
        const jobId = req.body.jobId
        const userId = req.body.userId

        const user = await AppliedJobModel.findOne({jobId , userId})

        if(!user)
        {
            return res.status(400).json({status:"fail",message:"user have not applied for this job"})
        }

        user.status = "Seen"
        await user.save()

        const response = {
            status:"success",
            message:"successfully"
        }
        res.status(200).json(response)
    }catch(err){
        res.status(400).json({status:"fail",message:err.message})
    }
}

const rejectedApplication = async(req,res)=>{
    try{
        const jobId = req.body.jobId
        const userId = req.body.userId

        const user = await AppliedJobModel.findOne({jobId , userId}).populate('userId')
    
        const job = await JobModel.findOne({_id:jobId})
        if(!user)
        {
            return res.status(400).json({status:"fail",message:"user have not applied for this job"})
        }

        user.status = "Rejected"
        await user.save()
        await Mail.mail(user.userId.email,'Rejection Mail',Messages.generateRejectionEmail("https://career-connect-bkt.s3.ap-south-1.amazonaws.com/download.jpg",user.userId.name,job.jobTitle))
        const response = {
            status:"success",
            message:"successfully"
        }
        res.status(200).json(response)
    }catch(err){
        res.status(400).json({status:"fail",message:err.message})
    }
}
module.exports = {
    createJob,
    getAllJobs,
    applyForJob,
    getAlUserForParticularJob,
    achieve,
    unAchieve,
    rejectedApplication
}