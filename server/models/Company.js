import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },
    logo: String,
    website: String,
    location: String,
    industry: String
},
{ timestamps: true }
);


const Company = mongoose.model("Company", companySchema);

Company.index({ name: 1 }, { unique: true });

export default Company;