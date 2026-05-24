import Role from "../models/Role.js";

export const searchRoles = async (req, res) => {
    try {
        const { q } = req.query;
        if(!q || q.trim().length < 2) {
            return res.status(400).json({
                code: "INVALID_QUERY",
                message: "Query parameter 'q' is required and must be at least 2 characters long.",
                data: []
            });
        }

        const normalizedQuery = q.trim().toLowerCase().replace(/\s+/g, " ");

        // Implementation for searching roles
        const roles = await Role.find({
            $or: [
                {
                    normalizedTitle: { $regex: normalizedQuery, $options: "i" }
                },
                {
                    aliases: { $regex: normalizedQuery, $options: "i" }
                }
            ]
        }).select("_id title slug category").limit(10);

        return res.status(200).json({ code: "SUCCESS", message: "Roles found.", data: roles });

    } catch (error) {
        console.error("Error searching roles:", error);
        return res.status(500).json({ 
            code: "INTERNAL_ERROR", 
            message: "An error occurred while searching for roles." 
        });
    }
};