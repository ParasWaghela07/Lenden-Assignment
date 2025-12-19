import express from 'express';
import { getUserProfile } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router=express.Router();

router.get('/getProfile',authMiddleware,getUserProfile);
export default router;