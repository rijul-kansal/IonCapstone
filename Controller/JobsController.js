const JobModel = require('../Models/JobModel')
const AppliedJobModel = require('./../Models/AppliedJobModel')
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
        const jobId = req.body.jobId

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
module.exports = {
    createJob,
    getAllJobs,
    applyForJob,
    getAlUserForParticularJob
}