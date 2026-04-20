import { body } from 'express-validator';

export const signupValidationRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit')
]

export const loginValidationRules = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
];

export const emailValidationRules = [
    body('email').isEmail().withMessage('Valid email is required')
];

export const passwordResetValidationRules = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit'),
    body('token').notEmpty().withMessage('Reset token is required')
];