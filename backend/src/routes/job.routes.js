import {Router} from "express"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { isAdmin } from "../middlewares/isAdmin.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"
import { getAllJob, registerJob ,getJobById,updateJob,createdJobList ,deleteJob} from "../controllers/job.controllers.js"

const router=Router()

router.route("/registerjob").post(verifyJWT,isAdmin,upload.single('logo'),registerJob)
router.route("/getalljob").get(verifyJWT,getAllJob)
router.route("/getjob/:id").get(verifyJWT,getJobById)
router.route("/updatejob/:id").patch(verifyJWT,isAdmin,updateJob)
router.route("/createdjoblist").get(verifyJWT,isAdmin,createdJobList)
router.route("/deletedjob/:id").delete(verifyJWT,isAdmin,deleteJob)



export default router