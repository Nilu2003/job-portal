import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const isAdmin=asyncHandler(async(req,res,next)=>{
    const role=req.user.role
    // console.log("type=",role);
    

    if(role != "admin"){
        throw new ApiError(401,"Acess denided")
    }

    next()
})

