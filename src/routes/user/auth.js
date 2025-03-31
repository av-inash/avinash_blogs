import express from "express"
import * as auth from "../../controllers/user/auth.js"
import { celebrate } from "celebrate";

import { verifyUserToken } from "../../middlewares/authentication.js";
import user from "../../validations/user.validation.js"
// import { uploadUserFile } from "../../utils/aws-s3.js";
const router=express.Router()


// router.route("/uploadFile").post(uploadUserFile, verifyUserToken,auth.uploadUserFile)
router.route("/signup").post(celebrate({body:user.SIGNUP}),auth.signup)
router.route("/login").post(celebrate({body:user.LOGIN}),auth.login);

export default router;
