import QuestionTopic from "../models/QuestionTopic.js";

const QuestionTopicHelper = async (topicData) => {
    if(topicData.type === "existing") {
        return topicData;
    }
    const normalizedName = topicData.name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
    const existingType = await QuestionTopic.findOne({ normalizedName });
    if (existingType) {
        return existingType;
    }
    const newType = new QuestionTopic({
        name: topicData.name.trim(),
        normalizedName
    });
    await newType.save();
    return newType;
};

export default QuestionTopicHelper;