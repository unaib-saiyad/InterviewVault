import mongoose from "mongoose";
import { type } from "node:os";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
    verificationTokenExpiry: {
        type: Date
    },
    verificationLastSent: {
        type: Date
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;