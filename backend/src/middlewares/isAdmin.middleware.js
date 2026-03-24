import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const isAdmin=asyncHandler(async(req,res,next)=>{
    const profileType=req.user.profileType
    // console.log("type=",profileType);
    

    if(profileType != "admin"){
        throw new ApiError(401,"Acess denided")
    }

    next()
})

