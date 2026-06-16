import Company from "../models/Company.js";

export const findOrCreateCompany = async (companyData) => {
    if (companyData.type === "existing") {
        return companyData;
    }
    const normalizedName = companyData.name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

    let company = await Company.findOne({
        normalizedName
    });

    if (!company) {

        company = await Company.create({
            name: companyData.name.trim(),
            normalizedName
        });
    }

    return company;
};