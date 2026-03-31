import Router from "express"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"
import {isAdmin} from "../middlewares/isAdmin.middleware.js"

import {applyJob,
    appliedJObListByIdAndResponse,
    jobIdWithApplicationResponseByAdmin,
    giveResponseStatusByAdmin
} from "../controllers/application.controllers.js"


const router= Router()

router.route("/apply-application/:id").post(verifyJWT,upload.single("resume"),applyJob)
router.route("/applied-job").get(verifyJWT,appliedJObListByIdAndResponse)
router.route("/response-list-application/:id").get(verifyJWT,isAdmin,jobIdWithApplicationResponseByAdmin)
router.route("/give-respone-application/:id").post(verifyJWT,isAdmin,giveResponseStatusByAdmin)


export default router