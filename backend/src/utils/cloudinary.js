import { v2 as cloudinary } from 'cloudinary'
import { ApiError } from './ApiError.js';
import fs from "fs"
import dotenv from "dotenv"


dotenv.config({
    path: './.env'
})


cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});

const uploadOnCloudinary= async(filePath) =>{
    try {
       if(!filePath){
        return null;
       }
       const response = await cloudinary.uploader.upload(filePath,
        {
            resource_type:"auto"
        })
          fs.unlinkSync(filePath)
         return response
        
    }
    catch(err){
           fs.unlinkSync(filePath)
    }
}

export {uploadOnCloudinary}
