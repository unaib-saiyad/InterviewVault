import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        slug: {
            type: String,
            unique: true
        },

        category: {
            type: String,
            enum: [
                "frontend",
                "backend",
                "fullstack",
                "mobile",
                "devops",
                "data",
                "qa",
                "design"
            ]
        },

        aliases: [String],

        skills: [String]
    },
    { timestamps: true }
);

const Role = mongoose.model("Role", roleSchema);

export default Role;