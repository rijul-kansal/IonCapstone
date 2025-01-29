const JobModel = require('../Models/JobModel')
const AppliedJobModel = require('./../Models/AppliedJobModel')
const TimeSlotModel = require('./../Models/TimeSlotsModel')
const Mail = require('./../Utils/NodeMailer')
const Messages = require('./../Utils/Message')
const App = require('./../app')
const axios = require('axios');
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
        const {jobId , userId , resumeLink } = req.body
        const user = await AppliedJobModel.findOne({jobId, userId})
        // if(user)
        // {
        //     return res.status(400).json({status:"fail",message:"all ready applied"})
        // }

        const job = await JobModel.findOne({_id:jobId})
        let resumeText = await App.extract(resumeLink)
        resumeText=JSON.stringify(resumeText);
        const resumeScore = await getATSScore(resumeText, job.roleAndResponsibilities + job.skillsAndExperience,res,jobId,userId)
    }catch(err){
        res.status(400).json({status:"fail",message:err.message})
    }
}
const getAlUserForParticularJob = async(req,res)=>{
    try{
        const jobId = req.query.jobId

        const data = await AppliedJobModel.find({jobId}).populate('userId');
        let screening = []
        let hr = []
        let test = []
        let tech = []
        let ap = []

        for(item in data)
        {
            const d = data[item]
            if(d.status == "Rejected" || d.status == "Archive") continue

            if(d.screeningStatus == "Pending") 
            {
                screening.push(d)
                continue
            }
            if(d.hrStatus == "Pending") {
                hr.push(d)
                continue
            }
            if(d.testStatus == "Pending") {
                test.push(d)
                continue
            }
            if(d.techStatus == "Pending") {
                tech.push(d)
                continue
            }
            if(d.apStatus == "Pending")
            {
                ap.push(d)
                continue
            }
        }
        const response = {
            status:"success",
            data:{
                screening,
                hr,
                test,
                tech,
                ap,
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
const setFreeTimeSlots = async(req,res)=>{

    const d = req.body

    await TimeSlotModel.create(d)
    res.send("success")
} 
const getFreeTimeSlot = async(req,res)=>{

    try{
        const roundName = req.query.roundName
        const data = await TimeSlotModel.find({roundName}) 

        const response  = {
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

const getATSScore = async(resumeText,jd,res, jobId,userId)=>{
    const apiUrl = "https://78fd-34-172-40-55.ngrok-free.app/predict"; 
    const requestData = {
        features:[resumeText,jd,resumeText]
    }

    // Send POST request
    axios.post(apiUrl, requestData)
        .then(async response => {

            const no = response.data.prediction*100
            const data = await AppliedJobModel.create({
                jobId,
                userId,
                resumeScore:no
            })
            const resp = {
                status:"success",
                data:{
                    data
                }
            }
            res.status(200).json(resp)
            return response.data
        })
        .catch(error => {
            console.error("❌ API Error:", error.response ? error.response.data : error.message);
        });
}

module.exports = {
    createJob,
    getAllJobs,
    applyForJob,
    getAlUserForParticularJob,
    achieve,
    unAchieve,
    rejectedApplication,
    setFreeTimeSlots,
    getFreeTimeSlot
}
