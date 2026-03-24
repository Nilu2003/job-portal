import mongoose from "mongoose"
import { DB_Name } from "../constant.js";


const connectDB = async() =>{
    try {
       const connectionInstance= await mongoose.connect(`${process.env.URI}/${DB_Name}`)
       console.log(connectionInstance.connections[0].host);
       
    } catch (error) {
        console.log("Database connection error while connect database" ,error);
        
    }
}

export {connectDB}