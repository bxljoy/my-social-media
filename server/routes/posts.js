import express from "express";
import {
  getPosts,
  getPost,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";
import cookieSecure from "../middleware/cookieSecure.js";

const router = express.Router();

router.get("/search", cookieSecure, getPostsBySearch);
router.get("/", cookieSecure, getPosts);
router.get("/:id", cookieSecure, getPost);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

export default router;
