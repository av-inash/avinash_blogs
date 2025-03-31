import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
import UserModel from "../models/user.model.js";
import { sendErrorResponse,sendSuccessResponse } from "../responses/response.js";



export const verifyUserToken = async (req, res, next) => {
  try {
    let { accesstoken } = req.headers;
    
    
    if (!accesstoken) return sendErrorResponse(res, [],"Please provide access token",401);
    const tokenResp = await verifyToken({ token: accesstoken, key: process.env.SECRET_KEY })
    req.tokenUser = tokenResp;
  
    const userResp = await UserModel.findOne({email:tokenResp.email})
  
    if (!userResp) {
      return sendErrorResponse(res, [],"User not found", 401);
    }
   
    req.userData = userResp;
  
    next()
  } catch (err) {
  
    return sendErrorResponse(res, [],(err?.message || "Token has been expired"), 401);
  }
};



