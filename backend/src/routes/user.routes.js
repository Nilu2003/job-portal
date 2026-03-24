import { Router } from "express";
import {registerUser,LoginUser, logoutUser, getProfile, updateProfile, uploadAvatar} from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(LoginUser)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/getprofile").get(verifyJWT,getProfile)
router.route("/updateprofile").patch(verifyJWT,updateProfile)
router.route("/uploadAvatar").post(verifyJWT,upload.single('avatar'),uploadAvatar)

export default router