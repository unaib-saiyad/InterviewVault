import User from '../models/User.js';
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';

export const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({name, email, password: hashedPassword});
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });

    }
    catch(error){
        return res.status(500).json({ message: 'Internal Server error' });
    }
};

export const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        const refreshToken = generateRefreshToken(user._id);
        const accessToken = generateAccessToken(user._id);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({ accessToken, user: { _id: user._id, name: user.name, email: user.email } });

    }
    catch(error){
        return res.status(500).json({ message: 'Internal Server error' });
    }
}

export const logoutUser = async (req, res) => {
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: 'Logged out successfully' });
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