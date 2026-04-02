import mongoose from "mongoose";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";

//admin
const registerJob = asyncHandler(async (req, res) => {
    const { title, description, companyName, experienceYear, Jobtype, location, position, salary } = req.body
    // console.log(req.body);


    if ([title, description, companyName, Jobtype, location, position, experienceYear, salary].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "please enter all tittle,description,companyName")
    }

    // console.log(req.file);

    if (!req.file) {
        throw new ApiError(400, "plese upload file")
    }
    // console.log(req.file);

    const logoPath = req.file.path


    if (!logoPath) {
        throw new ApiError(402, "logo path are not getting")
    }

    const logo = await uploadOnCloudinary(logoPath);

    if (!logo?.url) {
        throw new ApiError(400, "logo url is not geeting by cloudinary")
    }



    const job = await Job.create({
        title,
        description,
        companyName,
        experienceYear,
        logo: logo.url,
        createdBy: req.user.id,
        Jobtype,
        location,
        position,
        salary,
    })


    return res.status(201).json(new ApiResponse(201, job, "job created sucessfully"))

})

//users
const getAllJob = asyncHandler(async (req, res) => {
    const { keyword, location, type, page = 1,salary } = req.query;

    console.log(req.query);
    

    let query = {};

    // 🔍 Keyword search
    if (keyword) {
        query.$or = [
            { title: { $regex: keyword, $options: "i" } },
            {companyName : { $regex: keyword, $options: "i" } }
        ];
    }

    // 📍 Location
    if (location) {
        query.location = { $regex: location, $options: "i" };
    }

    // 💼 Job Type
    if (type) {
        query.Jobtype = type;
    }


    // 💰 Salary filter (IMPORTANT ✅)
    if (salary) {
        if (salary === "0 - 40k") {
            query.salary = { $lte: 40000 };
        } else if (salary === "42k to 1 lakh") {
            query.salary = { $gte: 42000, $lte: 100000 };
        } else if (salary === "1 lakh to 5 lakh") {
            query.salary = { $gte: 100000, $lte: 500000 };
        }
    }

    // 📄 Pagination
    const limit = 6;
    const skip = (page - 1) * limit;

    const jobs = await Job.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, jobs, "Job fetched successfully")
    );
});

//users
const getJobById = asyncHandler(async (req, res) => {
    const jobId = req.params.id

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        throw new ApiError(400, "inavalid job ID")
    }

    const job = await Job.findById(jobId);

    if (!job) {
        throw new ApiError(404, "job not found")
    }




    return res.status(200).json(
        new ApiResponse(200, job, "get indidividual job fetch sucessfully")
    )
})

//admin
const updateJob = asyncHandler(async (req, res) => {
    const jobId = req.params.id
    const { title, description, companyName, experienceYear, Jobtype, location } = req.body
    if (!title && description && !companyName && !experienceYear && !Jobtype && !location) {
        throw new ApiError(400, "anything is missing")
    }


    const job = await Job.findByIdAndUpdate(
        jobId,
        {
            title,
            description,
            companyName,
            experienceYear,
            Jobtype,
            location
        },
        {
            returnDocument: 'after'
        })



    return res.status(202).json(new ApiResponse(202, job, "job created sucessfully"))



})


//admin
const createdJobList = asyncHandler(async (req, res) => {

    const createdBy = req.user.id
    const jobList = await Job.find({ createdBy })

    if (!jobList || jobList.length === 0) {
        throw new ApiError(404, "No jobs found for this user");
    }

    return res.status(200).json(new ApiResponse(200, jobList, "jobLIST  fetched sucessfully for created admin"))
})

//admin
const deleteJob = asyncHandler(async (req, res) => {
    const jobId = req.params.id

    const job = await Job.findById(jobId)

    if (!job) {
        throw new ApiError(400, "Job is not found")
    }


    if (job.createdBy.toString() !== req.user.id) {
        throw new ApiError(403, "Not authorized to delete this job");
    }

    await job.deleteOne();


    return res.status(203).json(new ApiResponse(203, {}, "job deleted sucessfully"))


})



export {
    registerJob,
    getAllJob,
    getJobById,
    updateJob,
    createdJobList,
    deleteJob
}
