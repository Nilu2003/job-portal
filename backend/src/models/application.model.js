import mongoose, { Schema } from "mongoose";

const applicationSchema= new Schema({
    jobId:{
        type:Schema.Types.ObjectId,
        ref:"Job"
    },
    userId:{
       type:Schema.Types.ObjectId,
        ref:"User"
    },
    resume:{
        type:String
    },
    status:{
        type:String,
        enum:["pending","rejected","accepted"],
        default:"pending"
    }
},{
    timestamps:true
})

export const Application = mongoose.model("Application",applicationSchema)