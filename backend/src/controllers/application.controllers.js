 import {asyncHandler} from "../utils/asyncHandler.js"
 import {ApiError} from "../utils/ApiError.js"
 import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { Application } from "../models/application.model.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { Job } from "../models/job.model.js";
import mongoose from "mongoose"

//user
const applyJob= asyncHandler(async (req,res) => {
     const userId=req.user.id
     if (!userId){
        throw new ApiError(400,"userId not found")
     }
     const jobId=req.params.id

     if(!jobId){
        throw new ApiError("JobId not found");
     }
     
     const resumePath =req.file.path

     if(!resumePath){
        throw new ApiError(400,"job path not found")
     }
      
     const resume= await uploadOnCloudinary(resumePath)
     console.log(resume);
     

     if(!resume?.url){
        throw new ApiError(403,"error to found resume url in cloudinary")
     }
      
     
    
     

   const application=  await Application.create({
        userId,
        jobId,
        resume : resume?.url,
        
})  

 return res.status(201).json(new ApiResponse(201,application,"Application created sucessfully"))
     
})


//user
const appliedJObListByIdAndResponse =asyncHandler(async (req,res) =>{

    const userId= req.user.id
    if(!userId){
        throw new ApiError(400,"userid not found in Jwt")
    }
   
   const application= await Application.find({userId})
   
   if(application.length == 0){
    throw new ApiError(400,"user not apply job or application not found")
   }

   return res.status(202).json(new  ApiResponse (202,application,"application fetched sucessucefuully"))
})

//admin
const jobWithApplicationResponseByAdmin = asyncHandler(async (req,res) => {

    const jobWithApplication = await Job.aggregate([

        {
            $match:{
                createdBy: new mongoose.Types.ObjectId(req.user.id)
            }
        },

        //  Lookup with pipeline
        {
            $lookup:{
                from: "applications",
                let: { jobId: "$_id" },   // pass job _id  //let jobId=job._id
                pipeline: [

                    // match applications for this job
                    {
                        $match:{
                            $expr:{ $eq:["$jobId","$$jobId"] }   //[application.jobId==job._id]
                        }
                    },

                    //  nested lookup for user
                    {
                        $lookup:{
                            from:"users",
                            localField:"userId",
                            foreignField:"_id",
                            as:"userDetails"
                        }
                    },

                    // convert userDetails array → object
                    {
                        $unwind:"$userDetails"
                    },

                    // optional: select fields
                    {
                        $project:{
                            status:1,
                            resume:1,
                            "userDetails.fullName":1,
                            "userDetails.email":1
                        }
                    }

                ],
                as:"applicationsList"
            }
        },

        // count applications
        {
            $addFields:{
                totalApplications:{ $size:"$applicationsList" }
            }
        },

        // optional clean response
        {
            $project:{
                title:1,
                companyName:1,
                totalApplications:1,
                applicationsList:1
            }
        }

    ])

    return res.status(200).json(
        new ApiResponse(200,jobWithApplication,"application list fetched successfully")
    )
})

//admin
const giveResponseStatusByAdmin=asyncHandler(async(req,res) =>{
       const applicationId=req.params.id
       const {status}=req.body

       if(!status){
        throw new ApiError(404,"plese give any status")
       }

    const application= await Application.findById(applicationId)

    application.status=status;
    const updatedApplication=await application.save()
    // console.log(application);
    
  return res.status(400).json( new ApiResponse(400,updatedApplication,"admin give response sucessfully"))
})




export {applyJob,
    appliedJObListByIdAndResponse,
    jobWithApplicationResponseByAdmin,
    giveResponseStatusByAdmin
}






