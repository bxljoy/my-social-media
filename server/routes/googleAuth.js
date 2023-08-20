import express from 'express';
import { verifyIdToken, getTokens, refreshToken, getUserInfo } from '../controllers/authenticate.js';

const router = express.Router();

router.post('/verify-idToken', verifyIdToken);
router.post('/get-token', getTokens);
router.post('/refresh-token', refreshToken);
router.post('/get-userinfo', getUserInfo);

export default router;