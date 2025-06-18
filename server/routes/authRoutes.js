import express from 'express';
import { registerUser, registerNgo,loginUser,loginNgo } from '../controllers/authController.js';

const router = express.Router();

router.post('/register-user', registerUser);
router.post('/register-ngo', registerNgo);
router.post('/login-user', loginUser);
router.post('/login-ngo', loginNgo);


export default router;
