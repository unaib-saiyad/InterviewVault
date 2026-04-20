import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const verificationUrl = `${process.env.FRONTEND_URL}/auth/verify-email?token=${token}&email=${email}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify your email',
        html: `<p>Please click the link below to verify your email:</p>
               <a href="${verificationUrl}">${verificationUrl}</a>`
    };
    await transporter.sendMail(mailOptions);
}

export const sendPasswordResetEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}&email=${email}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reset your password',
        html: `<p>Please click the link below to reset your password:</p>
               <a href="${resetUrl}">${resetUrl}</a>
               <br/>
               <span style="color: #666; font-size: 14px;">Note: This link will expire in 1 hour.</span>`
    };
    await transporter.sendMail(mailOptions);
}
