import { Router } from "express";
import auth from "./auth.js";
import  blog from "./blog.js"


const router = Router();
router.use("/auth",auth);
router.use("/blog", blog);

export default router;
