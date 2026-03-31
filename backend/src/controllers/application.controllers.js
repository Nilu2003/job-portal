import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { Application } from "../models/application.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Job } from "../models/job.model.js";
import mongoose from "mongoose"

//user
const applyJob = asyncHandler(async (req, res) => {
    const userId = req.user.id
    if (!userId) {
        throw new ApiError(400, "userId not found")
    }
    const jobId = req.params.id

    if (!jobId) {
        throw new ApiError("JobId not found");
    }

    const resumePath = req.file.path

    if (!resumePath) {
        throw new ApiError(400, "job path not found")
    }

    const resume = await uploadOnCloudinary(resumePath)
    console.log(resume);


    if (!resume?.url) {
        throw new ApiError(403, "error to found resume url in cloudinary")
    }





    const application = await Application.create({
        userId,
        jobId,
        resume: resume?.url,

    })

    return res.status(201).json(new ApiResponse(201, application, "Application created sucessfully"))

})


//user
const appliedJObListByIdAndResponse = asyncHandler(async (req, res) => {

    const userId = req.user.id
    if (!userId) {
        throw new ApiError(400, "userid not found in Jwt")
    }

    const application = await Application.aggregate([
        {
            $match:{
                userId:new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup:{
                from:"jobs",
                localField:"jobId",
                foreignField:"_id",
                as:"jobDetails"
            }
        },
        {
            $unwind: "$jobDetails"
        },
        {    
            $project:{
            _id:1,
            title:"$jobDetails.title",
            companyName:"$jobDetails.companyName",
            status:1,
            createdAt:1,
            }
        }
        
    ])

    if (application.length == 0) {
        throw new ApiError(400, "user not apply job or application not found")
    }

    return res.status(202).json(new ApiResponse(202, application, "application fetched sucessucefuully"))
})

const jobIdWithApplicationResponseByAdmin = asyncHandler(async (req, res) => {
    const jobId = req.params.id;

    // console.log(typeof jobId);


    const application = await Application.aggregate([
        {
            $match: {
                jobId: new mongoose.Types.ObjectId(jobId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userDetails"
            }
        },
        {
            $unwind: "$userDetails"
        },
        {
            $project: {
                _id: 1,
                fullName: "$userDetails.fullName",
                email: "$userDetails.email",
                phoneNumber: "$userDetails.phoneNumber",
                resume: 1,
                status: 1,
                createdAt:1
            }
        }
    ])
        
        

       res.status(200).json(new ApiResponse(200,application, "sucessfuly fethched Applications"))

})

//admin
const giveResponseStatusByAdmin = asyncHandler(async (req, res) => {
    const applicationId = req.params.id
    const { status } = req.body
    
    // console.log(status);
    

    if (!status) {
        throw new ApiError(404, "plese give any status")
    }

    const application = await Application.findById(applicationId)

    application.status = status;
    const updatedApplication = await application.save()
    // console.log(application);

    return res.status(200).json(new ApiResponse(200, updatedApplication, "admin give response sucessfully"))
})




export {
    applyJob,
    appliedJObListByIdAndResponse,
    jobIdWithApplicationResponseByAdmin,
    giveResponseStatusByAdmin
}








