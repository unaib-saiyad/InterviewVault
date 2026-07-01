import mongoose from "mongoose";

const questionTopicSchema = new mongoose.Schema(
  {
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

    icon: String,
  },
  { timestamps: true }
);

questionTopicSchema.pre("validate", async function () {
    if (this.name) {
        this.normalizedName = this.name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ");
    }
});

export default mongoose.model(
  "QuestionTopic",
  questionTopicSchema
);