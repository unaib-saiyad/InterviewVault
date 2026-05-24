import mongoose from "mongoose";
const sourceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        normalizedName: {
            type: String,
            required: true,
            unique: true
        },
        description: String
    },
    { timestamps: true }
);
sourceSchema.pre("validate", async function () {
    if (this.name) {
        this.normalizedName = this.name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ");
    }
});

const Source = mongoose.model("Source", sourceSchema);

export default Source;