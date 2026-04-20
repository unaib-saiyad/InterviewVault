import express from 'express';
import { registerUser, loginUser, logoutUser, refreshToken, verifyEmail, resendVerificationEmail, forgotPassword, resetPassword } from '../controllers/authController.js';
import { emailValidationRules, loginValidationRules, signupValidationRules, passwordResetValidationRules } from '../validators/userValidator.js';
import validate from '../middleware/validate.js';
import { protect } from '../middleware/protect.js';

const router = express.Router();

router.post('/register', signupValidationRules, validate, registerUser);
router.post('/login', loginValidationRules, validate, loginUser);
router.post('/logout', protect, logoutUser);
router.get('/verify-email', verifyEmail);
router.post('/resend-verification-email', emailValidationRules, validate, resendVerificationEmail);
router.post('/forgot-password', emailValidationRules, validate, forgotPassword);
router.post('/reset-password', passwordResetValidationRules, validate, resetPassword);

// refresh token route to issue new access token using refresh token
router.get('/refresh-token', refreshToken);

export default router;
