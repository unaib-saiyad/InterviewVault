import mongoose from "mongoose";
const sourceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: String
    },
    { timestamps: true }
);

const Source = mongoose.model("Source", sourceSchema);

export default Source;