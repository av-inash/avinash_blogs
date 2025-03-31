import express from "express"
import * as blog from "../../controllers/user/blog.js"
import { verifyUserToken } from "../../middlewares/authentication.js"
import { celebrate } from "celebrate"
import user from "../../validations/user.validation.js"
const router =express.Router()


router.route("/createBlog").post(celebrate({body:user.CREATE_BLOG}),verifyUserToken,blog.createBlog)
router.route("/updateBlog").patch(celebrate({body:user.UPDATE_BLOG}),verifyUserToken,blog.updateBlog)
router.route("/delete").delete(verifyUserToken,blog.deleteBlog)
router.route("/getAllBlogs").get(verifyUserToken,blog.getAllBlogs)
router.route("/likeBlog").post(verifyUserToken,blog.likeBlog)
router.route("/addComment").post(celebrate({body:user.CREATE_COMMENT}),verifyUserToken,blog.createComment)
router.route("/replyComment").post(celebrate({body:user.REPLY_COMMENT}),verifyUserToken,blog.replyToComment)
router.route("/likeComment").post(verifyUserToken,blog.likeComment)
router.route("/deleteComment").delete(verifyUserToken,blog.deleteBlog)


export default router;