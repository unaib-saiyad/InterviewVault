import express from 'express';
import { registerUser, loginUser, logoutUser, refreshToken } from '../controllers/authController.js';
import { loginValidationRules, signupValidationRules } from '../validators/userValidator.js';
import validate from '../middleware/validate.js';
import { protect } from '../middleware/protect.js';

const router = express.Router();

router.post('/register', signupValidationRules, validate, registerUser);
router.post('/login', loginValidationRules, validate, loginUser);
router.post('/logout', protect, logoutUser);

// refresh token route to issue new access token using refresh token
router.get('/refresh-token', refreshToken);

export default router;
