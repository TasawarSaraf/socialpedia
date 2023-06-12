import express from "express";
import {getFeedPosts, getUserPosts, likePost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

/*READ*/

// grab from the home page
router.get("/", verifyToken, getFeedPosts);
// grab a (specific user) posts
router.get("/:userId/posts", verifyToken, getUserPosts);

/*UPDATE*/

// the only we can change when a post is up is if we like it or not
router.patch(":/id/like", verifyToken, likePost);

export default router;