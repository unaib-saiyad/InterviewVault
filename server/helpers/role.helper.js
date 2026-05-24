import slugify from "slugify";

import Role from "../models/Role.js";

export const findOrCreateRole = async (roleData) => {

    if (roleData.type === "existing") {
        return roleData._id;
    }

    const normalizedTitle = roleData.title
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");


    let role = await Role.findOne({
        normalizedTitle
    });

    if (!role) {

        role = await Role.create({
            title: roleData.title.trim(),
            normalizedTitle,

            slug: slugify(roleData.title, {
                lower: true,
                strict: true,
                trim: true
            })
        });
    }

    return role._id;
};