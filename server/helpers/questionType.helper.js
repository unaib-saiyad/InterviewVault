import QuestionType from '../models/QuestionType.js';

const QuestionTypeHelper = async (typeData) => {
    if(typeData.type === "existing") {
        return typeData._id;
    }
    const normalizedName = typeData.name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
    const existingType = await QuestionType.findOne({ normalizedName });
    if (existingType) {
        return existingType._id;
    }
    const newType = new QuestionType({
        name: typeData.name.trim(),
        normalizedName
    });
    await newType.save();
    return newType._id;
};

export default QuestionTypeHelper;