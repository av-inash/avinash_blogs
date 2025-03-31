import HttpStatus from "http-status-codes"
import { sendErrorResponse, sendSuccessResponse } from "../../responses/response"
import UserModel from "../../models/user.model"
import { hashPassword, hashPassword, comparePassword } from "../../utils/password.js"
import { generateJwtToken } from "../../utils/jwt.js"
import * as commonService from "../../common/common"
import { hash } from "bcrypt"


export const signup = async (req, res) => {
    try {

        const { name, email, password, profilePic } = req.body
        let emailInLowerCase = email.toLowerCase();
        let existinguser = await commonService.findwithCondition(UserModel, { email: emailInLowerCase })
        if (existinguser) {
            return sendSuccessResponse(res, [], "user with this email is already exist", HttpStatus.OK)
        }

        const hashPassword = await hashPassword(password)
        const profile = {
            name,
            email: emailInLowerCase,
            password: hashPassword,

            profilePicture: profilePic

        }
        const newuser = await commonService.create(UserModel, profile)
        return sendSuccessResponse(res, newuser, "User registered successfully", 200)

    } catch (error) {
        return sendErrorResponse(res, [], error.message, 500)

    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const emailInLowerCase = email.toLowerCase()
        const user = await commonService.findwithCondition(UserModel, { email: emailInLowerCase })

        if (!user) {
            return sendErrorResponse(res,
                 [], 
                 "Please enter correct credential.......", 
                 HttpStatus.NOT_FOUND
                )
        }

        let validPassword = await comparePassword(password, user.password);
        if (!validPassword) {
            return sendErrorResponse(
                res,
                [],
                "Invalid password",
                HttpStatus.NOT_FOUND
            );
        }
        if (user.isBlocked) {
            return sendErrorResponse(res, [], "Your account has been blocked", 400);
        }
        let genToken = {
            _id: user._id,
            email: user.email,
            name: user.name,
            profilePicture: user.profilePicture

        };

        let accessToken = await generateJwtToken(genToken, "2d").token;
        const updatedUser = await commonService.findOneAndUpdate(UserModel, user._id, { accessToken })

        return sendSuccessResponse(
            res,
            updatedUser,
            "Login successful!",
            HttpStatus.OK
        );

    } catch (error) {
        return sendErrorResponse(res, 
            [],
             error.message,
              HttpStatus.INTERNAL_SERVER_ERROR
            )

    }

}