import QuestionSubTopic from "../models/QuestionSubTopic.js";

const QuestionSubTopicHelper = async (subTopicData) => {
    if(subTopicData.type === "existing") {
        return subTopicData;
    }
    const normalizedName = subTopicData.name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
    const existingType = await QuestionSubTopic.findOne({ normalizedName });
    if (existingType) {
        return existingType;
    }
    const newType = new QuestionSubTopic({
        name: subTopicData.name.trim(),
        normalizedName
    });
    await newType.save();
    return newType;
};

export default QuestionSubTopicHelper;