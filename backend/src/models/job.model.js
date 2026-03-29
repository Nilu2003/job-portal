import mongoose, { Schema } from "mongoose"

const jobSchema=new Schema({
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    companyName:{
        type:String,
        required:true,
    },
    experienceYear:{
        type:String,
        required:true
        
    },
    logo:{
       type:String,
       required:true
    },
    Jobtype:{
        type:String,
        index:true  
    },
    location:{
        type:String,
        required:true
    },
    position:{
        type:String,
    },
    salary:{
        type:String
    }
    




},{
    timestamps:true,
})


export const Job= mongoose.model("Job",jobSchema)