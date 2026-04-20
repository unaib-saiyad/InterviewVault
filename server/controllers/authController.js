import User from '../models/User.js';
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
import { generateToken } from '../utils/generateCryptoToken.js';
import { sendVerificationEmail, sendPasswordResetEmail } from '../services/email.service.js';

export const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({ 
                code: 'INVALID_INPUT',
                message: 'Please provide all required fields'
            });
        }
        
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ 
                code: 'INVALID_CREDENTIALS',
                message: 'User with this email already exists'
             });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name, email, password: hashedPassword,
            isVerified: false, 
            verificationToken: generateToken(), 
            verificationTokenExpiry: Date.now() + 24 * 60 * 60 * 1000
        });
        await newUser.save();
        
        await sendVerificationEmail(newUser.email, newUser.verificationToken);

        return res.status(201).json({ 
            code: 'SUCCESS',
            message: 'Verification email sent to your email id.'
        });

    }
    catch(error){
        return res.status(500).json({ 
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Internal Server error'
        });
    }
};

export const loginUser = async (req, res) => {
    try{
        const {email, password, rememberMe} = req.body;
        if(!email || !password){
            return res.status(400).json({ 
                code: 'INVALID_INPUT',
                message: 'Please provide all required fields' 
            });
        }
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ 
                code: 'INVALID_CREDENTIALS',
                message: 'Invalid email or password' 
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ 
                code: "INVALID_CREDENTIALS", 
                message: 'Invalid email or password' 
            });
        }
        if(!user.isVerified){
            return res.status(403).json({ 
                code: "EMAIL_NOT_VARIFIED", 
                message: 'Please verify your email before logging in'
             });
        }
        
        const refreshToken = generateRefreshToken(user._id, rememberMe);
        const accessToken = generateAccessToken(user._id);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
        });
        return res.status(200).json({ accessToken, user: { _id: user._id, name: user.name, email: user.email } });

    }
    catch(error){
        return res.status(500).json({
            code: "INTERNAL_SERVER_ERROR",  
            message: 'Internal Server error, please try again later or contact support.'
        });
    }
}

export const logoutUser = async (req, res) => {
    res.clearCookie("refreshToken");
    return res.status(200).json({ 
        code: 'SUCCESS',
        message: 'Logged out successfully'
     });
}

export const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try{
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const userId = decoded.id;
        const newAccessToken = generateAccessToken(userId);
        return res.status(200).json({ accessToken: newAccessToken });
    }
    catch(error){
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export const verifyEmail = async (req, res) => {
    const { token } = req.query;    
    try {
        const user = await User.findOne({ verificationToken: token, verificationTokenExpiry: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ 
                code: 'INVALID_OR_EXPIRED_TOKEN',
                message: 'Invalid or expired verification token' 
            });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;
        user.verificationLastSent = undefined;
        await user.save();
        return res.status(200).json({ 
            code: 'SUCCESS',
            message: 'Email verified successfully'
        });
    } catch (error) {
        return res.status(500).json({ 
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Internal Server error, please try again later or contact support.' 
        });
    }   
}

export const resendVerificationEmail = async (req, res) => {
    const { email } = req.body;
    try{
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                code: 'USER_NOT_FOUND',
                message: 'User not found'
            });
        }
        if(user.isVerified){
            return res.status(400).json({
                code: 'ALREADY_VERIFIED',
                message: 'User already verified, please login.'
            });
        }
        const now = Date.now();
        if(user.verificationLastSent && now-user.verificationLastSent < 60000){
            return res.status(429).json({ 
                code: 'PLEASE_WAIT',
                message: "Please wait for 60 seconds before retrying." 
            })
        }

        user.verificationToken = generateToken();
        user.verificationTokenExpiry = now + 24 * 60 * 60 * 1000;
        user.verificationLastSent = now;
        await user.save();

        await sendVerificationEmail(user.email, user.verificationToken);

        return res.status(200).json({ 
            code: 'SUCCESS',
            message: 'Verification email resent successfully'
        });
    }
    catch(error){
        return res.status(500).json({ 
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Internal Server error, please try again later or contact support.' 
        });
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try{
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                code: 'USER_NOT_FOUND',
                message: 'User not found'
             });
        }
        const resetToken = generateToken();
        user.passwordResetToken = resetToken;
        user.passwordResetTokenExpiry = Date.now() + 60 * 60 * 1000;
        user.verificationLastSent = Date.now();
        await user.save();
        await sendPasswordResetEmail(user.email, resetToken);

        return res.status(200).json({ 
            code: 'SUCCESS',
            message: 'Password reset email sent successfully'
        });
    }
    catch(error){
        return res.status(500).json({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Internal Server error, please try again later or contact support.'
        })
    }
}

export const resetPassword = async (req, res) => {
    const { email, password, token } = req.body;
    try{
        const user = await User.findOne({ passwordResetToken: token, passwordResetTokenExpiry: { $gt: Date.now() } });
        if(!user){
            return res.status(400).json({
                code: 'INVALID_OR_EXPIRED_TOKEN',
                message: 'Invalid or expired password reset token'
            });
        }
        if(!user.email === email){
            return res.status(400).json({
                code: 'INVALID_EMAIL',
                message: 'Invalid email address'
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpiry = undefined;
        user.verificationLastSent = undefined;

        await user.save();
        return res.status(200).json({ 
            code: 'SUCCESS',
            message: 'Password reset successfully'
         });
    }
    catch(error){
        return res.status(500).json({ 
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Internal Server error, please try again later or contact support.'
        });
    }
}