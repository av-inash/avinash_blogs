import HttpStatus from "http-status-codes"
import { sendErrorResponse,sendSuccessResponse } from "../../responses/response.js"
import BlogModel from "../../models/blog.model.js" 
import *as commonService from"../../common/common.js"
import CommentModel from "../../models/comment.model.js"

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


  export const likeBlog = async (req, res) => {
    try {
        const { blogId } = req.body;
        const userId = req.userData._id; 

       
        if (!blogId) {
            return sendErrorResponse(res, [], "blogId is required.", 400);
        }

       
        const blog = await BlogModel.findById(blogId);
        if (!blog) {
            return sendErrorResponse(res, [], "Blog not found.", 404);
        }

        
        const isLiked = blog.likes.includes(userId);
        if (isLiked) {
            
            blog.likes = blog.likes.filter(id => id.toString() !== userId.toString());
        } else {
          
            blog.likes.push(userId);
        }

        await blog.save();

        return sendSuccessResponse(res, blog, isLiked ? "Blog unliked successfully." : "Blog liked successfully.", 200);

    } catch (error) {
        return sendErrorResponse(res, [], error.message, 500);
    }
};

export const createComment = async (req, res) => {
    try {
        const { blogId, text } = req.body;
        const userId = req.userData._id; 

       
        if (!blogId || !text) {
            return sendErrorResponse(res, [], "blogId and text are required.", 400);
        }

        
        const blog = await BlogModel.findById(blogId);
        if (!blog) {
            return sendErrorResponse(res, [], "Blog not found.", 404);
        }

       
        const newComment = new CommentModel({
            blog: blogId,
            user: userId,
            text
        });

        await newComment.save();

      
        blog.comments.push({ user: userId, text });
        await blog.save();

        return sendSuccessResponse(res, newComment, "Comment added successfully.", 201);

    } catch (error) {
        return sendErrorResponse(res, [], error.message, 500);
    }
};

export const replyToComment = async (req, res) => {
    try {
        const { commentId, text } = req.body;
        const userId = req.userData._id;

        
        if (!commentId || !text) {
            return sendErrorResponse(res, [], "commentId and text are required.", 400);
        }

       
        const parentComment = await CommentModel.findById(commentId);
        if (!parentComment) {
            return sendErrorResponse(res, [], "Parent comment not found.", 404);
        }

        // Create the reply comment
        const newReply = new CommentModel({
            blog: parentComment.blog, 
            user: userId,
            text
        });

        await newReply.save();

        parentComment.replies.push(newReply._id);
        await parentComment.save();

        return sendSuccessResponse(res, newReply, "Reply added successfully.", 201);

    } catch (error) {
        return sendErrorResponse(res, [], error.message, 500);
    }
};


export const likeComment = async (req, res) => {
    try {
        const { commentId } = req.body;
        const userId = req.userData._id;

        if (!commentId) {
            return sendErrorResponse(res, [], "commentId is required.", 400);
        }

        
        const comment = await CommentModel.findById(commentId);
        if (!comment) {
            return sendErrorResponse(res, [], "Comment not found.", 404);
        }

        
        const isLiked = comment.likes.includes(userId);

        if (isLiked) {
            
            comment.likes = comment.likes.filter(id => id.toString() !== userId.toString());
        } else {
            
            comment.likes.push(userId);
        }

        await comment.save();

        return sendSuccessResponse(res, comment, isLiked ? "Comment unliked." : "Comment liked.", 200);
    } catch (error) {
        return sendErrorResponse(res, [], error.message, 500);
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.body;
        const userId = req.userData._id; 

        if (!commentId) {
            return sendErrorResponse(res, [], "commentId is required.", 400);
        }

        
        const comment = await CommentModel.findById(commentId).populate("blog");
        if (!comment) {
            return sendErrorResponse(res, [], "Comment not found.", 404);
        }

       
        const blog = await BlogModel.findById(comment.blog);
        if (!blog) {
            return sendErrorResponse(res, [], "Blog not found.", 404);
        }
        const blogAuthorId = blog.author.toString();

       
        if (comment.user.toString() !== userId.toString() && blogAuthorId !== userId.toString()) {
            return sendErrorResponse(res, [], "You are not authorized to delete this comment.", 403);
        }

      
        await CommentModel.findByIdAndDelete(commentId);

       
        await BlogModel.updateOne({ _id: blog._id }, { $pull: { comments: commentId } });

        return sendSuccessResponse(res, [], "Comment deleted successfully.", 200);
    } catch (error) {
        return sendErrorResponse(res, [], error.message, 500);
    }
};


