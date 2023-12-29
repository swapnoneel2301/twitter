import express from "express";
import { allPosts, createPost } from "../controllers/postControllers.js";

const router = express.Router();

router.get("/", allPosts);
router.post("/", createPost);

export default router;
