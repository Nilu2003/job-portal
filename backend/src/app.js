import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app=express()

app.use(cors({
    origin:"jobportal-p9donko3c-nilu-prustys-projects.vercel.app",
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extends:true}))
app.use(express.static('public'))

app.use(cookieParser())

import userRouter from "./routes/user.routes.js"
import jobRouter from "./routes/job.routes.js"
import applicationRouter from "./routes/application.routes.js"

app.use("/api/v1/users",userRouter)
app.use("/api/v1/jobs",jobRouter)
app.use("/api/v1/applications",applicationRouter)



export {app}



