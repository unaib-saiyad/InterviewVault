import mongoose from "mongoose";

const questionSubTopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  normalizedName: {
    type: String,
    required: true,
    unique: true
  },

  description: String,
},
{ timestamps: true });

questionSubTopicSchema.pre("validate", async function () {
    if (this.name) {
        this.normalizedName = this.name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ");
    }
});

export default mongoose.model(
  "QuestionSubTopic",
  questionSubTopicSchema
);
