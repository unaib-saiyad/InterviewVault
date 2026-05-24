import Source from "../models/Source.js";

export const findOrCreateSource = async (sourceData) => {

    if (!sourceData) {
        return null;
    }

    if (sourceData.type === "existing") {
        return sourceData._id;
    }

    const normalizedName = sourceData.name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

    let source = await Source.findOne({
        normalizedName
    });

    if (!source) {

        source = await Source.create({
            name: sourceData.name.trim(),
            normalizedName
        });
    }

    return source._id;
};