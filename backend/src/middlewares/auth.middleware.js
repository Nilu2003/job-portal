import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const verifyJWT= asyncHandler(async(req,res,next)=>{
     const token=req.cookies?.accessToken
     if(!token){
        throw new ApiError(401,"unauthorized acess ")
     }
     

    const decode=jwt.verify(token,process.env.ACESS_TOKEN_KEY)
    // console.log("decode-:",decode);
    
    
    if(!decode){
        throw new ApiError(401,"Invalid acess token")
    }

    const user=await User.findById(decode.id)

    if(!user){
        throw new ApiError(401,"user not received")
    }


    req.user=user

    next()
    
})

export {verifyJWT}