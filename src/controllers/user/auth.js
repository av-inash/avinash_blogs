import HttpStatus from "http-status-codes"
import { sendErrorResponse, sendSuccessResponse } from "../../responses/response.js"
import UserModel from "../../models/user.model.js"
import {   hashPassword,comparePassword } from "../../utils/password.js"
import { generateJwtToken } from "../../utils/jwt.js"
import * as commonService from "../../common/common.js"




export const uploadUserFile = async (req, res) => {
    console.log("Uploading file...");
    try {

        if (
            !req.files ||
            !req.files.upload_user_file ||
            req.files.upload_user_file.length === 0
        ) {
            return sendErrorResponse(res, [], "file is required....", 400)
        }
        const uploadUserFile = req.files.upload_user_file[0].location;
        return sendSuccessResponse(res, uploadUserFile, "file uploaded successfully", 200)
    } catch (error) {
        return sendErrorResponse(res, [], error.message, 500)

    }
};

export const signup = async (req, res) => {
    try {

        const { name, email, password, profilePicture } = req.body
        let emailInLowerCase = email.toLowerCase();
        let existinguser = await commonService.findwithCondition(UserModel, { email: emailInLowerCase })
        if (existinguser) {
            return sendSuccessResponse(res, [], "user with this email is already exist", HttpStatus.OK)
        }

        let hashedPassword = await hashPassword(password)
        const profile = {
            name,
            email: emailInLowerCase,
            password: hashedPassword,
            profilePicture

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
                HttpStatus.UNAUTHORIZED
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

        let accessToken = generateJwtToken(genToken, "2d").token;
        
       
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