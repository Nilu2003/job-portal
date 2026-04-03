import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app=express()

app.use(cors({
    origin:process.env.ORIGIN,
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extended: true }))
app.use(express.static('public'))

app.use(cookieParser())

import userRouter from "./routes/user.routes.js"
import jobRouter from "./routes/job.routes.js"
import applicationRouter from "./routes/application.routes.js"

app.use("/api/v1/users",userRouter)
app.use("/api/v1/jobs",jobRouter)
app.use("/api/v1/applications",applicationRouter)



app.use((err, req, res, next) => {
    console.log("Error middleware triggered:", err.message)

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || []
    })
})



export {app}



