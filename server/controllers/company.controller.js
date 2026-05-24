import Company from "../models/Company.js";

export const createCompany = async (req, res) => {
    try {
        const { name, logo, website, location, industry } = req.body;
        const company = new Company({ name, logo, website, location, industry });
        await company.save();
        res.status(201).json({
            code: 'SUCCESS',
            message: 'Company created successfully',
            data: company
        });
    } catch (error) {
        res.status(400).json({
            code: 'ERROR',
            message: error.message
        });
    }
};

export const searchCompanies = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query || query.length < 2) {
            return res.status(200).json({
                code: 'SUCCESS',
                message: 'Query too short, returning empty results',
                data: []
            });
        }
        const regex = new RegExp(query.toLowerCase().trim().replace(/\s+/g, " "), "i");
        const companies = await Company.find({ normalizedName: regex }).select("_id name logo").limit(10);
        res.json({
            code: 'SUCCESS',
            message: 'Companies found',
            data: companies
        });
    } catch (error) {
        res.status(500).json({
            code: 'ERROR',
            message: error.message
        });
    }
};