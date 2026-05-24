import mongoose from "mongoose";
import slugify from "slugify";

const roleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        normalizedTitle: {
            type: String,
            required: true,
            unique: true
        },

        slug: {
            type: String,
            required: true,
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

        aliases: [
            {
                type: String,
                trim: true
            }
        ],

        skills: [
            {
                type: String,
                trim: true
            }
        ]
    },
    { timestamps: true }
);

roleSchema.pre("validate", async function () {

    if (this.title) {
        this.normalizedTitle = this.title
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ");

        this.slug = slugify(this.title, {
            lower: true,
            strict: true,
            trim: true
        });
    }

});

const Role = mongoose.model("Role", roleSchema);

export default Role;