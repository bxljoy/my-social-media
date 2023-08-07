import express from 'express';
import { verifyToken } from '../controllers/authenticate.js';

const router = express.Router();

router.post('/', verifyToken);

export default router;