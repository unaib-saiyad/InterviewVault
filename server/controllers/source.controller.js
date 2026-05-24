import Source from "../models/Source.js";

export const searchSources = async (req, res) => {
    try {
        const { query } = req.query;
        if(!query || query.trim() === "" || query.length < 2) {
            return res.status(400).json({ code: 400, message: "Query must be at least 2 characters long" });
        }

        const normalizedQuery = query.trim().toLowerCase().replace(/\s+/g, " ");
        const sources = await Source.find({ normalizedName: { $regex: normalizedQuery, $options: "i" } }).limit(10);

        res.json({ code: 200, message: "Sources found", data: sources });
    } catch (error) {
        console.error("Error searching sources:", error);
        res.status(500).json({ code: 500, message: "Internal server error" });
    }
};