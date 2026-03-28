import mongoose, { Schema, Types } from "mongoose"

const userSchema= new Schema({
    username:{
        type:String,
        required: true,
        unique: true,
        index:true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
        index:true,
    },
    password:{
        type:String,
        required:true,
    },

    phoneNumber:{
        type:Number,
        required: true,
        unique: true,
    },
    fullName:{
        type:String,
        required: true,
        
    },

    skill:[{
        type:String,
    }],
   avatar:{
    type:String,
   },
   role:{
    type:String,
    enum:["user","admin"]
   },
   refreshToken:{
    type:String,
   } 
},{
    timestamps:true
})


export const User=mongoose.model("User",userSchema)