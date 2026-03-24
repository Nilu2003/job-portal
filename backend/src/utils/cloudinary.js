import { v2 as cloudinary } from 'cloudinary'
import { ApiError } from './ApiError.js';
import fs from "fs"


cloudinary.config({ 
  cloud_name: 'dgsrdumju', 
  api_key: '559494928143258', 
  api_secret: '7BPBsFPWhmyUdSmmG4sNOs2mKG8'
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
