import HttpStatus from "http-status-codes"
import { sendErrorResponse,sendSuccessResponse } from "../../responses/response"
import BlogModel from "../../models/blog.model" 
import *as commonService from"../../common/common.js"

export const createBlog=async(req,res)=>{
    try {
        const author=req.userData._id
        const {title,content}=req.body
        if (!title || !content) {
            return sendErrorResponse(res, [], "Title and content are required", HttpStatus.BAD_REQUEST);
        }
        const profile={
            title,
            content,
            author:author
        }
        const data=await commonService.create(BlogModel,profile)
        if(!data){
            return sendErrorResponse(res,[],"Blog is not created...........",400)
        }
        return sendSuccessResponse(
            res,
            data,
            "Blog created successfully.............",
            201
        )
        
    } catch (error) {
        return sendErrorResponse(res,[],error.message,HttpStatus.INTERNAL_SERVER_ERROR)
        
    }
}

export const updateBlog=async(req,res)=>{
    try {
        const {title,content,blogId}=req.body
        const author=req.userData._id 
        const profile = {
            ...(title && { title }), 
            ...(content && { content }), 
            updatedAt: Date.now(),
        };
        const data=await BlogModel.findOneAndUpdate({_id:blogId,author},profile,{new:true}).lean()
        if(!data){
            return sendErrorResponse(res,[],"unable to update this blog........",400)
        }
        return sendSuccessResponse(res,data,"Blog is updated successfully........",201)
        
    } catch (error) {
        return sendErrorResponse(res,[],error.message,HttpStatus.INTERNAL_SERVER_ERROR)
        
    }
}
export const deleteBlog=async(req,res)=>{
    try {

        const {blogId}=req.query 
        if (!blogId) {
            return sendErrorResponse(res, [], "blogId is required.", HttpStatus.BAD_REQUEST);
        }
        const data=await commonService.deleteById(BlogModel,blogId)
        if(!data){
            return sendErrorResponse(res,[],"blog can not be deleted....",HttpStatus.BAD_REQUEST)
        }
        return sendSuccessResponse(res,data,"blog is deleted successfully.......",HttpStatus.OK)
        
    } catch (error) {
        return sendErrorResponse(res,[],error.message,HttpStatus.INTERNAL_SERVER_ERROR)
        
    }
}
  export const getAllBlogs=async(req,res)=>{
    try {
        const data=await commonService.findAll(BlogModel)
        if(!data || data.length===0){
            return sendSuccessResponse(res,[],"No Blogs is here for now........",HttpStatus.OK)
        }
        return sendSuccessResponse(res,data,"All blogs fetched successfully",HttpStatus.OK)
        
    } catch (error) {
        return sendErrorResponse(res,[],error.message,HttpStatus.INTERNAL_SERVER_ERROR)
        
    }
  }