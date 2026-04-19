import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
}

export const generateRefreshToken = (userId, rememberMe) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: rememberMe? '7d' : '1d' });
}