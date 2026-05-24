import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        normalizedName: {
            type: String,
            required: true,
            unique: true
        },
        logo: String,
        website: String,
        location: String,
        industry: String
    },
    { timestamps: true }
);

companySchema.pre("validate", async function () {
    if (this.name) {
        this.normalizedName = this.name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ");
    }
});

const Company = mongoose.model("Company", companySchema);

export default Company;