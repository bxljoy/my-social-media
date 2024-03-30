import express from "express";
import {
  verifyIdToken,
  getTokens,
  refreshToken,
  getUserInfo,
} from "../controllers/authenticate.js";
import cookieSecure from "../middleware/cookieSecure.js";

const router = express.Router();

router.post("/verify-idToken", cookieSecure, verifyIdToken);
router.post("/get-token", cookieSecure, getTokens);
router.post("/refresh-token", cookieSecure, refreshToken);
router.post("/get-userinfo", cookieSecure, getUserInfo);

export default router;
