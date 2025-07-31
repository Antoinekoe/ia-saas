// AI routes configuration
import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  generateArticle,
  generateBlogTitle,
  generateImage,
  removeImageBackground,
} from "../controllers/aiController.js";
import { upload } from "../configs/multer.js";

const aiRouter = express.Router();

// AI generation endpoints - all protected by auth middleware
aiRouter.post("/generate-article", auth, generateArticle); // Generate articles with AI
aiRouter.post("/generate-blog-title", auth, generateBlogTitle); // Generate blog titles
aiRouter.post("/generate-image", auth, generateImage); // Generate images (premium only)
aiRouter.post(
  "/remove-image-background",
  upload.single("image"),
  auth,
  removeImageBackground
); // Generate images (premium only)
aiRouter.post(
  "/remove-image-background",
  upload.single("image"),
  auth,
  removeImageBackground
); // Generate images (premium only)

export default aiRouter;
